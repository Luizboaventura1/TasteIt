import UserData from "@/interfaces/UserData";
import Recipe from "@/interfaces/Recipe";

type StoreUser = UserData & { recipes: Recipe[] };

export default StoreUser;
