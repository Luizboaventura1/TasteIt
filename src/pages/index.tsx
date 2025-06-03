import RecipeCategory from "@/enums/RecipeCategory";
import { AppDispatch, RootState } from "@/store";
import { addRecipe } from "@/store/User/thunks/addRecipe";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { loginWithGoogle } from "@/store/User/thunks/loginWithGoogle";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useSelector((state: RootState) => state.user).user;

  const handleAddRecipe = () => {
    const recipe = {
      title: "Bolo de limão",
      description: "Sem descrição",
      category: RecipeCategory.BAKERY,
    };
    const file = fileInputRef.current?.files?.[0] ?? null;
    dispatch(addRecipe({ data: recipe, imageFile: file })).then(() => console.log(user));
  };

  return (
    <div>
      <h1>Home page</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 font-medium text-neutral-100 p-3 rounded-lg m-12 cursor-pointer"
        onClick={handleAddRecipe}
      >
        Add recipe
      </button>
      <input ref={fileInputRef} type="file" />

      <button onClick={() => dispatch(loginWithGoogle())}>Login</button>
      <div className="text-center m-24">{user?.email}</div>
    </div>
  );
}
