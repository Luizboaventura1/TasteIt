import GoogleUserData from "./GoogleUserData";
import Recipe from "./Recipe";

interface FirestoreUserData extends GoogleUserData {
  instagramLink: string;
  favoriteRecipes: Recipe[];
}

export default FirestoreUserData;
