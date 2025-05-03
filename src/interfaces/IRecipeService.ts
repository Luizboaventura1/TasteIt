import Recipe from "./Recipe";

interface IRecipeService {
  addRecipe(
    recipe: Pick<Recipe, "title" | "description">,
    image: File | null
  ): Promise<void | string>;

  deleteRecipe(recipeId: string): Promise<void | string>;

  updateRecipe(recipeId: string, recipe: Recipe): Promise<Recipe | string>;

  getRecipeById(recipeId: string): Promise<Recipe | string>;

  getAllRecipes(): Promise<Recipe[] | string>;
}

export default IRecipeService;
