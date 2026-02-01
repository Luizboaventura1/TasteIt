import RecipeStatus from "@/enums/RecipeStatus";
import IAuthService from "@/interfaces/IAuthService";
import IRecipeService from "@/interfaces/IRecipeService";
import Recipe from "@/interfaces/Recipe";
import { firestore, storage } from "@/lib/firebase/firebase.config";
import { User } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

class RecipeService implements IRecipeService {
  constructor(private authService: IAuthService) {}

  private validateRecipeInput(recipe: Pick<Recipe, "title" | "description" | "category">) {
    if (!recipe.title || !recipe.title.trim()) {
      throw new Error("Título da receita é obrigatório.");
    }
    if (!recipe.description || !recipe.description.trim()) {
      throw new Error("Descrição da receita é obrigatória.");
    }
    if (!recipe.category) {
      throw new Error("Categoria da receita é obrigatória.");
    }
  }

  private validateImage(image: File) {
    if (!image.type.startsWith("image/")) {
      throw new Error("Arquivo inválido. Envie uma imagem.");
    }
    if (image.size > MAX_IMAGE_SIZE_BYTES) {
      throw new Error("Imagem muito grande. Tamanho máximo: 5MB.");
    }
  }

  async addRecipe(
    recipe: Pick<Recipe, "title" | "description" | "category">,
    image: File | null,
  ): Promise<Recipe> {
    this.validateRecipeInput(recipe);

    if (!image) {
      throw new Error("Selecione uma imagem para a receita.");
    }

    this.validateImage(image);

    const newRecipeRef = doc(collection(firestore, "recipes"));
    const storageRef = ref(storage, `recipesImages/${newRecipeRef.id}`);

    try {
      const userGoogleData = this.authService.getCurrentUser();

      if (!userGoogleData) {
        throw new Error("Usuário não autenticado. Faça login novamente.");
      }

      const userName = (userGoogleData as User).displayName || "";

      await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);

      const recipeData: Recipe = {
        id: newRecipeRef.id,
        userId: (userGoogleData as User).uid,
        imageUrl: downloadURL,
        author: userName,
        status: RecipeStatus.PENDING,
        title: recipe.title,
        description: recipe.description,
        category: recipe.category,
        createdAt: new Date(),
      };

      try {
        await setDoc(newRecipeRef, recipeData);
      } catch (setDocError) {
        // Se não conseguir persistir no Firestore, remover o arquivo enviado para evitar orfãos
        try {
          await deleteObject(storageRef);
        } catch {
          // swallow: se a limpeza falhar, preferimos reportar o erro original de persistência
        }
        throw setDocError;
      }

      return recipeData;
    } catch (error: Error | unknown) {
      let errorMessage = "Erro inesperado ao adicionar receita. Por favor, tente novamente.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      throw new Error(errorMessage);
    }
  }

  async deleteRecipe(recipeId: string): Promise<void> {
    const recipeRef = doc(firestore, "recipes", recipeId);
    const imageRef = ref(storage, `recipesImages/${recipeId}`);

    let imageError: Error | null = null;
    let docError: Error | null = null;

    try {
      await deleteObject(imageRef);
    } catch (err) {
      imageError = err instanceof Error ? err : new Error("Erro ao deletar imagem da storage.");
    }

    try {
      await deleteDoc(recipeRef);
    } catch (err) {
      docError = err instanceof Error ? err : new Error("Erro ao deletar receita do Firestore.");
    }

    if (imageError && docError) {
      throw new Error(
        `Falha ao deletar imagem e documento: ${imageError.message}; ${docError.message}`,
      );
    }

    if (imageError) {
      throw new Error(
        `Receita deletada do banco, porém falha ao deletar imagem: ${imageError.message}`,
      );
    }

    if (docError) {
      throw new Error(
        `Imagem deletada, porém falha ao deletar receita do banco: ${docError.message}`,
      );
    }

    return;
  }

  private static isFile = (value: unknown): value is File => {
    return typeof value === "object" && value !== null && "name" in value && "size" in value;
  };

  async updateRecipe(recipeId: string, recipe: Recipe): Promise<Recipe> {
    try {
      const recipeRef = doc(firestore, "recipes", recipeId);

      // Fetch existing recipe to preserve image if not provided
      const existingDoc = await getDoc(recipeRef);
      if (!existingDoc.exists()) {
        throw new Error("Receita não encontrada.");
      }

      const existingRecipe = existingDoc.data() as Recipe;

      // Determine final image URL: if caller provided a File, upload it;
      // if provided a string URL, use it; otherwise keep existing.
      let finalImageUrl: string | undefined;

      if (RecipeService.isFile(recipe.imageUrl)) {
        // validate and upload new image, overwrite storage at same path
        this.validateImage(recipe.imageUrl as File);
        const storageRef = ref(storage, `recipesImages/${recipeId}`);
        await uploadBytes(storageRef, recipe.imageUrl as File);
        finalImageUrl = await getDownloadURL(storageRef);
      } else if (typeof recipe.imageUrl === "string" && recipe.imageUrl.trim() !== "") {
        finalImageUrl = recipe.imageUrl;
      } else {
        finalImageUrl = existingRecipe.imageUrl;
      }

      const updateData: Omit<Recipe, "id" | "createdAt" | "author" | "userId"> = {
        title: recipe.title,
        description: recipe.description,
        imageUrl: finalImageUrl,
        status: RecipeStatus.PENDING,
        category: recipe.category,
      };

      await updateDoc(recipeRef, updateData);

      return {
        id: recipeId,
        ...updateData,
      } as Recipe;
    } catch (error: Error | unknown) {
      let errorMessage = "Erro inesperado ao atualizar receita.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      throw new Error(errorMessage);
    }
  }

  async getRecipeById(recipeId: string): Promise<Recipe> {
    try {
      const recipeRef = doc(firestore, "recipes", recipeId);
      const docSnap = await getDoc(recipeRef);

      if (!docSnap.exists()) {
        throw new Error("Receita não encontrada.");
      }

      const recipeData = docSnap.data() as Recipe;

      return recipeData;
    } catch (error: Error | unknown) {
      let errorMessage = "Erro inesperado ao buscar receita.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  }

  async getAllUserRecipes(userId: string): Promise<Recipe[]> {
    try {
      const recipesRef = collection(firestore, "recipes");

      const q = query(recipesRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      const userRecipes: Recipe[] = [];
      querySnapshot.forEach((doc) => {
        userRecipes.push(doc.data() as Recipe);
      });

      return userRecipes;
    } catch (error: Error | unknown) {
      let errorMessage = "Erro inesperado ao listar receitas do usuário.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  }

  async getAllRecipes(): Promise<Recipe[]> {
    try {
      const recipesRef = collection(firestore, "recipes");
      const q = query(recipesRef);
      const querySnapshot = await getDocs(q);

      const recipes: Recipe[] = [];
      querySnapshot.forEach((doc) => {
        recipes.push(doc.data() as Recipe);
      });

      return recipes;
    } catch (error: Error | unknown) {
      let errorMessage = "Erro inesperado ao listar receitas.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  }
}

export default RecipeService;
