import RecipeStatus from "@/enums/RecipeStatus";
import Recipe from "@/interfaces/Recipe";
import { firestore } from "@/lib/firebase/firebase.config";
import { collection, getDocs, query, where, updateDoc } from "firebase/firestore";

class RecipeModerationService {
  async getPendingRecipes(): Promise<Recipe[]> {
    try {
      const recipesRef = collection(firestore, "recipes");
      const q = query(recipesRef, where("status", "==", RecipeStatus.PENDING));
      const querySnapshot = await getDocs(q);
      const pendingRecipes: Recipe[] = [];

      querySnapshot.forEach((doc) => {
        pendingRecipes.push(doc.data() as Recipe);
      });

      return pendingRecipes;
    } catch (error: Error | unknown) {
      let errorMessage = "Erro inesperado ao listar receitas pendentes.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      throw new Error(errorMessage);
    }
  }

  async getRejectedRecipes(): Promise<Recipe[]> {
    try {
      const recipesRef = collection(firestore, "recipes");
      const q = query(recipesRef, where("status", "==", RecipeStatus.REJECTED));
      const querySnapshot = await getDocs(q);
      const rejectedRecipes: Recipe[] = [];

      querySnapshot.forEach((doc) => {
        rejectedRecipes.push(doc.data() as Recipe);
      });

      return rejectedRecipes;
    } catch (error: Error | unknown) {
      let errorMessage = "Erro inesperado ao listar receitas rejeitadas.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      throw new Error(errorMessage);
    }
  }

  async changeRecipeStatus(recipeId: string, newStatus: RecipeStatus): Promise<void> {
    const recipesRef = collection(firestore, "recipes");
    const q = query(recipesRef, where("id", "==", recipeId));
    const querySnapshot = await getDocs(q);
    const recipeDoc = querySnapshot.docs[0];

    try {
      if (recipeDoc) {
        await updateDoc(recipeDoc.ref, { status: newStatus });
      } else {
        throw new Error("Receita não encontrada.");
      }
    } catch (error: Error | unknown) {
      let errorMessage = "Erro inesperado ao alterar status da receita.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      throw new Error(errorMessage);
    }
  }
}

const recipeModerationService = new RecipeModerationService();
export default recipeModerationService;
