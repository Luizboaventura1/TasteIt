"use client";

import Dropdown from "@/components/ui/Dropdown";
import FormErrorMessage from "@/components/ui/FormErrorMessage";
import Loading from "@/components/ui/Loading";
import MinimalistInput from "@/components/ui/MinimalistInput";
import PrimaryButton from "@/components/ui/PrimaryButton";
import RichTextEditor from "@/components/ui/RichTextEditor";
import SecondaryText from "@/components/ui/SecondaryText";
import RecipeCategory from "@/enums/RecipeCategory";
import type Recipe from "@/interfaces/Recipe";
import recipeSchema, { RecipeFormInputs } from "@/schemas/recipeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CloseIcon from "../../icons/CloseIcon";
import PrimaryText from "../../ui/PrimaryText";
import { QueryClient, useMutation } from "@tanstack/react-query";
import RecipeService from "@/services/recipeService";
import AuthService from "@/services/authService";
import QUERY_KEYS from "@/constants/queryKeys";

interface RecipeFormModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  initialData?: Recipe;
  closeModal: () => void;
}

const categoryOptions = Object.entries(RecipeCategory).map(([key, value]) => ({
  value: key,
  label: value,
}));

export default function RecipeFormModal({
  isOpen,
  closeModal,
  mode,
  initialData,
}: RecipeFormModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [displayImage, setDisplayImage] = useState<string | null>(initialData?.imageUrl ?? null); // To show a preview of the selected image
  const [isLoading, setIsLoading] = useState(false);

  const recipeService = new RecipeService(new AuthService());
  const queryClient = new QueryClient();

  const createRecipeMutation = useMutation({
    mutationFn: async (recipe: Recipe) => {
      return await recipeService.addRecipe(
        { title: recipe.title, description: recipe.description, category: recipe.category },
        recipe.imageUrl as unknown as File
      );
    },
  });

  const editRecipeMutation = useMutation({
    mutationFn: async (recipe: Recipe) => {
      return await recipeService.updateRecipe(recipe.id, recipe);
    },
  });

  const { control, handleSubmit } = useForm<RecipeFormInputs>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      category: initialData?.category ?? "",
      imageFile: initialData?.imageUrl ?? "",
    },
  });

  const handleRecipeData = async ({
    title,
    description,
    category,
    imageFile,
  }: RecipeFormInputs) => {
    setIsLoading(true);

    const newRecipeData = {
      title,
      description,
      category: category,
      imageUrl: imageFile,
    } as Recipe;

    const onSuccess = () => {
      setIsLoading(false);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_RECIPES] });
      closeModal();
    };

    switch (mode) {
      case "create":
        createRecipeMutation.mutate(newRecipeData, { onSuccess });
        break;
      case "edit":
        editRecipeMutation.mutate(newRecipeData, { onSuccess });
        break;
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldOnChange: (...event: unknown[]) => void
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);
      setDisplayImage(imageURL);
      fieldOnChange(file);
    } else {
      setDisplayImage(null);
      fieldOnChange(null);
    }
  };

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleClickMain = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  if (!isOpen) return null;

  return (
    <div
      onClick={() => closeModal()}
      className="flex justify-center items-center fixed z-50 top-0 left-0 w-full h-screen px-4 bg-black/60"
    >
      <main
        onClick={handleClickMain}
        className="relative w-full max-w-xl lg:max-w-2xl bg-light py-4 px-6 rounded-xl max-h-[90vh] overflow-x-auto"
      >
        <nav className="flex items-center justify-between gap-4 mb-4">
          <PrimaryText>Criar nova receita</PrimaryText>
          <button
            className="cursor-pointer hover:bg-muted/40 rounded-full transition-colors duration-200 p-3"
            onClick={() => closeModal()}
          >
            <CloseIcon size="sm" color="dark" />
          </button>
        </nav>

        <header className="grid gap-4 grid-cols-1 sm:grid-cols-[auto_1fr] w-full mb-5">
          <div className="flex justify-center sm:justify-start">
            {displayImage ? (
              <div className="w-[250px] h-[167px]">
                <Image
                  src={displayImage}
                  alt="Pré-visualização"
                  className="object-cover w-full h-full rounded-xl"
                  width={250}
                  height={150}
                />
              </div>
            ) : (
              <div className="flex justify-center items-center w-[250px] h-[167px] rounded-xl border border-muted p-3">
                <p className="font-medium text-dark/80 text-nowrap">Sem imagem</p>
              </div>
            )}
          </div>

          <div className="w-full">
            <PrimaryText size="sm">Escolha uma imagem para a receita</PrimaryText>
            <SecondaryText size="sm">
              Dimensões recomendadas: <span className="font-medium">600x400 px</span>
            </SecondaryText>
            <Controller
              control={control}
              name="imageFile"
              render={({ field, fieldState }) => (
                <>
                  <button
                    className="font-medium px-4 py-2 rounded-full text-sm hover:bg-muted/20 border border-muted text-dark mt-4 cursor-pointer transition-colors duration-200"
                    onClick={handleDivClick}
                    type="button"
                  >
                    Selecionar imagem
                  </button>
                  <input
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(e, field.onChange)}
                    className="hidden"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                  />
                  {fieldState?.error?.message && (
                    <FormErrorMessage message={fieldState.error.message} />
                  )}
                </>
              )}
            />
          </div>
        </header>

        <div className="space-y-2 mb-3">
          <Controller
            control={control}
            name="title"
            render={({ field, fieldState }) => (
              <>
                <MinimalistInput
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Qual o nome da sua receita?"
                />
                {fieldState?.error?.message && (
                  <FormErrorMessage message={fieldState.error.message} />
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="category"
            render={({ field, fieldState }) => (
              <>
                <Dropdown
                  placeholder="Selecionar categoria"
                  options={categoryOptions}
                  value={field.value}
                  onChange={field.onChange}
                />
                {fieldState?.error?.message && (
                  <FormErrorMessage message={fieldState.error.message} />
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field, fieldState }) => (
              <>
                <RichTextEditor content={field.value} onChange={field.onChange} />
                {fieldState?.error?.message && (
                  <FormErrorMessage message={fieldState.error.message} />
                )}
              </>
            )}
          />
        </div>

        <footer className="flex items-center gap-3 justify-end">
          <button
            onClick={() => closeModal()}
            className="text-dark hover:text-dark/80 cursor-pointer transition-colors duration-200"
          >
            Cancelar
          </button>
          <PrimaryButton onClick={handleSubmit(handleRecipeData)} size="sm">
            {mode === "edit" ? "Salvar alterações" : "Enviar receita"}
          </PrimaryButton>
        </footer>
      </main>

      <Loading isLoading={isLoading} />
    </div>
  );
}
