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

class RecipeService implements IRecipeService {
  constructor(private authService: IAuthService) {}

  async addRecipe(
    recipe: Pick<Recipe, "title" | "description" | "category">,
    image: File | null
  ): Promise<Recipe> {
    const newRecipeRef = doc(collection(firestore, "recipes"));
    const storageRef = ref(storage, `recipesImages/${newRecipeRef.id}`);

    try {
      const userGoogleData = this.authService.getCurrentUser();

      if (!userGoogleData || userGoogleData instanceof Error) {
        throw new Error("Usuário não autenticado. Faça login novamente.");
      }

      if (!image) {
        throw new Error("Selecione uma imagem para a receita.");
      }

      const userName = (userGoogleData as User)?.displayName || "";

      await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);

      const recipeData: Recipe = {
        id: newRecipeRef.id,
        userId: (userGoogleData as User).uid,
        imageUrl: downloadURL,
        author: userName,
        title: recipe.title,
        description: recipe.description,
        category: recipe.category,
        createdAt: new Date(),
      };

      await setDoc(newRecipeRef, recipeData);

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
    try {
      const recipeRef = doc(firestore, "recipes", recipeId);
      await deleteDoc(recipeRef);

      const imageRef = ref(storage, `recipesImages/${recipeId}`);
      await deleteObject(imageRef);

      return;
    } catch (error: Error | unknown) {
      let errorMessage = "Erro inesperado ao deletar receita.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  }

  async updateRecipe(recipeId: string, recipe: Recipe): Promise<Recipe> {
    try {
      const recipeRef = doc(firestore, "recipes", recipeId);

      const updateData = {
        title: recipe.title,
        description: recipe.description,
        imageUrl: recipe.imageUrl,
        author: recipe.author,
        userId: recipe.userId,
        createdAt: recipe.createdAt,
        category: recipe.category,
      };

      await updateDoc(recipeRef, updateData);

      return {
        id: recipeId,
        ...updateData,
      };
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
