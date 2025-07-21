interface UserData {
  id: string;
  email: string | null;
  name: string | null;
  photoURL: string | null;
  instagramLink: string | null;
  favoriteRecipes: string[] | null;
}

export default UserData;
