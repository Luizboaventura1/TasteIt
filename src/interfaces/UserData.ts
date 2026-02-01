import Roles from "@/enums/Roles";

interface UserData {
  id: string;
  email: string | null;
  name: string | null;
  photoURL: string | null;
  role: Roles;
  instagramLink: string | null;
  favoriteRecipes: string[] | null;
}

export default UserData;
