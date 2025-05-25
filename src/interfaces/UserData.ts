import Recipe from "./Recipe";

interface UserData {
  id: string;
  email: string | null;
  name: string | null;
  photoURL: string | null;
  instagramLink: string | null;
  favoriteRecipes: Recipe[] | null;
}

export default UserData;
