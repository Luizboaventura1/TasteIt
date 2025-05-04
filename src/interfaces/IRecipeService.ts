import Recipe from "./Recipe";

interface IRecipeService {
  addRecipe(
    recipe: Pick<Recipe, "title" | "description">,
    image: File | null
  ): Promise<void | Error>;

  deleteRecipe(recipeId: string): Promise<void | Error>;

  updateRecipe(recipeId: string, recipe: Recipe): Promise<Recipe | Error>;

  getRecipeById(recipeId: string): Promise<Recipe | Error>;

  getAllRecipes(): Promise<Recipe[] | Error>;
}

export default IRecipeService;
