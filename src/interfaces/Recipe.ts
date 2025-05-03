import RecipeCategory from "@/enums/RecipeCategory"

interface Recipe {
	id: string,
  userId: string,
	imageUrl: string,
	author: string,
	title: string,
	description: string,
	category: RecipeCategory,
	createAt: Date
}

export default Recipe