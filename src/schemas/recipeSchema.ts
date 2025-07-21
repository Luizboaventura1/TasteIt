import * as z from "zod";

const recipeSchema = z.object({
  title: z
    .string()
    .min(10, "O título da receita deve ter no mínimo 10 caracteres.")
    .max(60, "O título da receita deve ter no máximo 60 caracteres.")
    .trim(),
  description: z
    .string()
    .min(50, "A descrição da receita deve ter no mínimo 50 caracteres.")
    .max(2000, "A descrição da receita deve ter no máximo 2000 caracteres.")
    .trim(),
  category: z.string().min(1, "Selecione uma categoria para a receita."),
  imageFile: z
    .instanceof(File, { message: "O arquivo da imagem deve ser um arquivo válido." })
    .nullable()
    .refine((file) => file !== null, "Por favor, selecione uma imagem para a receita."),
});

export default recipeSchema;

export type RecipeFormInputs = z.infer<typeof recipeSchema>;
