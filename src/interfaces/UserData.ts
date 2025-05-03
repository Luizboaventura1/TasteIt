import Recipe from "./Recipe";

interface UserData {
  id: string;
  email: string;
  name: string | null;
  photoURL: string | null;
  instagramLink: string;
  favoriteRecipes: Recipe[];
}

export default UserData;
