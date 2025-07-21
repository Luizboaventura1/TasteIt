"use client";

import Dropdown from "@/components/ui/Dropdown";
import FormErrorMessage from "@/components/ui/FormErrorMessage";
import MinimalistInput from "@/components/ui/MinimalistInput";
import PrimaryButton from "@/components/ui/PrimaryButton";
import RichTextEditor from "@/components/ui/RichTextEditor";
import SecondaryText from "@/components/ui/SecondaryText";
import RecipeCategory from "@/enums/RecipeCategory";
import recipeSchema, { RecipeFormInputs } from "@/schemas/recipeSchema";
import { AppDispatch } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import CloseIcon from "../../icons/CloseIcon";
import PrimaryText from "../../ui/PrimaryText";
import { addRecipe } from "@/store/User/thunks/addRecipe";
import Loading from "@/components/ui/Loading";

interface AddRecipeModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const categoryOptions = Object.entries(RecipeCategory).map(([key, value]) => ({
  value: key,
  label: value,
}));

export default function AddRecipeModal({ isOpen, closeModal }: AddRecipeModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [displayImage, setDisplayImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { control, handleSubmit } = useForm<RecipeFormInputs>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      imageFile: null,
    },
  });

  const handleAddRecipe = async ({ title, description, category, imageFile }: RecipeFormInputs) => {
    setIsLoading(true);

    await dispatch(
      addRecipe({
        data: {
          title: title,
          description: description,
          category: category as RecipeCategory,
        },
        imageFile: imageFile as File,
      })
    ).finally(() => {
      closeModal();
      setIsLoading(false);
    });
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

        <header className="grid gap-4 grid-cols-1 sm:grid-cols-[1fr_auto] w-full mb-5">
          <div className="flex justify-center sm:justify-start">
            {displayImage ? (
              <div className="w-36 h-36">
                <Image
                  src={displayImage}
                  alt="Pré-visualização"
                  className="object-cover w-full h-full rounded-xl"
                  width={300}
                  height={300}
                />
              </div>
            ) : (
              <div className="flex justify-center items-center w-36 h-36 rounded-xl border border-muted p-3">
                <p className="font-medium text-dark/80 text-nowrap">Sem imagem</p>
              </div>
            )}
          </div>

          <div className="w-full">
            <PrimaryText size="sm">Escolha uma imagem para a receita</PrimaryText>
            <SecondaryText size="sm">
              Coloque uma imagem, assim, terá mais chances das pessoas verem sua receita
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
          <PrimaryButton onClick={handleSubmit(handleAddRecipe)} size="sm">
            Adicionar
          </PrimaryButton>
        </footer>
      </main>

      <Loading isLoading={isLoading} />
    </div>
  );
}
