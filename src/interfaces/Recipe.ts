import RecipeCategory from "@/enums/RecipeCategory"
import RecipeStatus from "@/enums/RecipeStatus"

interface Recipe {
	id: string,
  userId: string,
	imageUrl: string,
	author: string,
	title: string,
	status: RecipeStatus,
	description: string,
	category: RecipeCategory,
	createdAt: Date | string
}

export default Recipe