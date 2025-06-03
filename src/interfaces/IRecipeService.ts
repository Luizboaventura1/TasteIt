import Recipe from "./Recipe";

interface IRecipeService {
  addRecipe(recipe: Pick<Recipe, "title" | "description">, image: File | null): Promise<Recipe>;

  deleteRecipe(recipeId: string): Promise<void>;

  updateRecipe(recipeId: string, recipe: Recipe): Promise<Recipe>;

  getRecipeById(recipeId: string): Promise<Recipe>;

  getAllRecipes(): Promise<Recipe[]>;
}

export default IRecipeService;
