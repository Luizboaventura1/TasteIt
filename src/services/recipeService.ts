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
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

class RecipeService implements IRecipeService {
  constructor(private authService: IAuthService) {}

  async addRecipe(
    recipe: Pick<Recipe, "title" | "description" | "category">,
    image: File | null
  ): Promise<string | void> {
    const newRecipeRef = doc(collection(firestore, "recipes"));
    const storageRef = ref(storage, `recipesImages/${newRecipeRef.id}`);

    try {
      const userGoogleData: User = this.authService.getUserData() as User;

      if (!userGoogleData || userGoogleData instanceof Error) {
        throw new Error("Usuário não autenticado. Faça login novamente.");
      }

      if (!image) {
        throw new Error("Selecione uma imagem para a receita.");
      }

      const userName = userGoogleData?.displayName || "";

      await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);

      const recipeData: Recipe = {
        id: newRecipeRef.id,
        userId: userGoogleData.uid,
        imageUrl: downloadURL,
        author: userName,
        title: recipe.title,
        description: recipe.description,
        category: recipe.category,
        createAt: new Date(),
      };

      await setDoc(newRecipeRef, recipeData);
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        return error.message;
      }
      return "Erro inesperado ao adicionar receita. Por favor, tente novamente.";
    }
  }

  async deleteRecipe(recipeId: string): Promise<void | string> {
    try {
      const recipeRef = doc(firestore, "recipes", recipeId);

      await deleteDoc(recipeRef);

      const imageRef = ref(storage, `recipesImages/${recipeId}`);
      await deleteObject(imageRef);
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        return error.message;
      }
      return "Erro inesperado ao deletar receita.";
    }
  }

  async updateRecipe(recipeId: string, recipe: Recipe): Promise<Recipe | string> {
    try {
      const recipeRef = doc(firestore, "recipes", recipeId);

      const updateData = {
        title: recipe.title,
        description: recipe.description,
        imageUrl: recipe.imageUrl,
        author: recipe.author,
        userId: recipe.userId,
        createAt: recipe.createAt,
        category: recipe.category,
      };

      await updateDoc(recipeRef, updateData);

      return {
        id: recipeId,
        ...updateData,
      };
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        return error.message;
      }
      return "Erro inesperado ao atualizar receita.";
    }
  }

  async getRecipeById(recipeId: string): Promise<Recipe | string> {
    try {
      const recipeRef = doc(firestore, "recipes", recipeId);
      const docSnap = await getDoc(recipeRef);

      if (!docSnap.exists()) {
        return "Receita não encontrada.";
      }

      const recipeData = docSnap.data() as Recipe;
      return recipeData;
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        return error.message;
      }
      return "Erro inesperado ao buscar receita.";
    }
  }

  async getAllRecipes(): Promise<Recipe[] | string> {
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
      if (error instanceof Error) {
        return error.message;
      }
      return "Erro inesperado ao listar receitas.";
    }
  }
}

export default RecipeService;
