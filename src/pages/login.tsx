import RecipeService from "../services/recipeService";
import AuthService from "../services/authService";
import RecipeCategory from "@/enums/RecipeCategory";
import { useRef, useState } from "react";

export default function Login() {
  const imageRef = useRef(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const recipeService = new RecipeService(new AuthService());

  const addRecipe = async () => {
    if (!imageFile) {
      console.log("Selecione uma imagem para a receita.");
      return;
    }
    await recipeService
      .addRecipe({ title: "Farofa preta", description: "Donuts processo" , category: RecipeCategory.BAKERY}, imageFile)
      .then(() => {
        console.log("Receita adicionada com sucesso!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button
        onClick={addRecipe}
        className="py-2 px-5 my-10 rounded-full text-white font-bold bg-blue-500"
      >
        Adicionar receita
      </button>
      <br />
      <input
        ref={imageRef}
        onChange={handleImageChange}
        type="file"
        name=""
        id=""
        className="bg-zinc-600 rounded-full py-2 px-5 text-white font-medium"
      />
      {imageFile && <p>Arquivo selecionado: {imageFile.name}</p>} {/* Exemplo de uso do estado */}
    </div>
  );
}
