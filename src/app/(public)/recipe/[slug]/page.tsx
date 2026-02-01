"use client";

import RecipeFormModal from "@/components/features/RecipeFormModal";
import EditIcon from "@/components/icons/EditIcon";
import BackButton from "@/components/ui/BackButton";
import Loading from "@/components/ui/Loading";
import PrimaryButton from "@/components/ui/PrimaryButton";
import PrimaryText from "@/components/ui/PrimaryText";
import RichTextEditor from "@/components/ui/RichTextEditor";
import Skeleton from "@/components/ui/Skeleton";
import QUERY_KEYS from "@/constants/queryKeys";
import RecipeStatus from "@/enums/RecipeStatus";
import useModal from "@/hooks/useModal";
import AuthService from "@/services/authService";
import RecipeService from "@/services/recipeService";
import { useQuery } from "@tanstack/react-query";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Recipe() {
  const params = useParams();
  const recipeId = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const authService = new AuthService();
  const recipeService = new RecipeService(authService);
  const [userId, setUserId] = useState<string | null>(null);
  const addRecipeModal = useModal();

  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
    });

    return () => unsubscribe();
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.RECIPE(recipeId!)],
    queryFn: async () => {
      return await recipeService.getRecipeById(recipeId!);
    },
    enabled: !!recipeId,
  });

  if (isLoading) {
    return <Loading isLoading={isLoading} isTransparentBg={false} />;
  } else if (!data || (userId !== data?.userId && data.status !== RecipeStatus.APPROVED)) {
    return (
      <div className="mx-auto px-4 min-h-screen flex justify-center items-center">
        <main className="text-center space-y-4">
          <PrimaryText>Receita não encontrada</PrimaryText>
          <PrimaryButton size="sm" onClick={() => router.push("/")}>
            Voltar para a página inicial
          </PrimaryButton>
        </main>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 min-h-screen">
      <nav className="flex flex-col-reverse md:flex-row justify-between gap-4 mt-24">
        <section className="space-y-4">
          <PrimaryText size="lg">{data.title}</PrimaryText>

          <div className="max-w-[600px] w-full aspect-[3/2] mx-auto overflow-hidden rounded-2xl">
            {data ? (
              <Image
                className="object-cover w-full h-full"
                src={data.imageUrl}
                alt="Img"
                width={600}
                height={400}
              />
            ) : (
              <Skeleton className="h-full w-[600px] rounded-xl" />
            )}
          </div>

          {data ? (
            <cite className="text-sm text-dark/80 hover:text-dark border-b-2 border-transparent hover:border-dark">
              <Link href={`/profile/${data?.userId}`}>Feito por {data?.author}</Link>
            </cite>
          ) : (
            <Skeleton className="h-5 w-36" />
          )}
        </section>

        <section className="flex justify-end items-start">
          <BackButton>Voltar</BackButton>
        </section>
      </nav>

      <section className="flex justify-between items-center mt-20 mb-12">
        <PrimaryText size="lg">Descrição da receita</PrimaryText>
        {data && userId === data?.userId && (
          <PrimaryButton onClick={addRecipeModal.open} size="sm">
            <EditIcon /> Editar
          </PrimaryButton>
        )}
      </section>

      {data ? (
        <RichTextEditor showToolbar={false} content={data.description} editable={false} />
      ) : (
        <div className="space-y-2">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-5 w-1/3" />
        </div>
      )}

      <RecipeFormModal
        initialData={data}
        isOpen={addRecipeModal.isOpen}
        closeModal={addRecipeModal.close}
        mode="edit"
      />
    </div>
  );
}
