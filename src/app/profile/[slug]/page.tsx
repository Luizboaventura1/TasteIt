"use client";

import UserIcon from "@/assets/images/user-icon.svg";
import AddRecipeModal from "@/components/features/AddRecipeModal.tsx";
import PlusIcon from "@/components/icons/PlusIcon";
import DefaultFooter from "@/components/layouts/DefaultFooter";
import BackButton from "@/components/ui/BackButton";
import PrimaryButton from "@/components/ui/PrimaryButton";
import PrimaryText from "@/components/ui/PrimaryText";
import RecipeCard from "@/components/ui/RecipeCard";
import SecondaryText from "@/components/ui/SecondaryText";
import Skeleton from "@/components/ui/Skeleton";
import DatabaseService from "@/services/databaseService";
import { RootState } from "@/store";
import StoreUser from "@/store/User/types/StoreUser";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getFirstAndLastName from "@/utils/getFirstAndLastName";

export default function Profile() {
  const loggedUserData = useSelector((state: RootState) => state.user).user;
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
  const [profileUserData, setProfileUserData] = useState<StoreUser | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [errorFetchingProfile, setErrorFetchingProfile] = useState<string | null>(null);

  const params = useParams();
  const profileUserId = Array.isArray(params.slug) ? params.slug[0] : params.slug ?? "";
  const databaseService = new DatabaseService();

  useEffect(() => {
    if (!profileUserId.length) {
      setIsLoadingProfile(false);
      return;
    }

    setIsLoadingProfile(true);
    setErrorFetchingProfile(null);

    if (loggedUserData?.id === profileUserId) {
      setProfileUserData(loggedUserData);
      setIsLoadingProfile(false);
    } else {
      databaseService
        .getUserDataById(profileUserId)
        .then((user) => {
          if (user) {
            setProfileUserData(user as StoreUser);
          } else {
            setProfileUserData(null);
            setErrorFetchingProfile("Usuário não encontrado.");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar dados do usuário:", error.message);
          setErrorFetchingProfile("Erro ao carregar o perfil. Tente novamente.");
          setProfileUserData(null);
        })
        .finally(() => {
          setIsLoadingProfile(false);
        });
    }
  }, [profileUserId, loggedUserData]);

  const isOwnProfile = loggedUserData?.id === profileUserId;
  const hasUserRecipes = profileUserData?.recipes && profileUserData.recipes.length > 0;

  return (
    <>
      <section className="container mx-auto px-4 pt-12 md:pt-16 min-h-screen pb-10">
        <nav className="flex justify-end pb-8">
          <BackButton>Voltar</BackButton>
        </nav>

        <main className="w-full max-w-xl mx-auto space-y-4">
          <header className="flex justify-center">
            {isLoadingProfile ? (
              <Skeleton className="w-24 h-24 rounded-full" />
            ) : profileUserData ? (
              <>
                {profileUserData?.photoURL ? (
                  <Image
                    className="w-24 h-24 border border-muted rounded-full"
                    src={profileUserData.photoURL}
                    alt="Foto de perfil do usuário"
                    width={200}
                    height={200}
                    priority
                  />
                ) : (
                  <Image
                    className="w-24 h-24"
                    src={UserIcon}
                    alt="Ícone de usuário padrão"
                    width={200}
                    height={200}
                    priority
                  />
                )}
              </>
            ) : (
              <Image
                className="w-24 h-24"
                src={UserIcon}
                alt="Ícone de usuário padrão - perfil não encontrado"
                width={200}
                height={200}
                priority
              />
            )}
          </header>

          <section className="flex justify-center">
            {isLoadingProfile ? (
              <div className="space-y-2">
                <Skeleton className="w-28 h-4" />
                <Skeleton className="w-16 h-4" />
              </div>
            ) : profileUserData ? (
              <PrimaryText>{getFirstAndLastName(profileUserData?.name)}</PrimaryText>
            ) : (
              <PrimaryText>Perfil não disponível</PrimaryText>
            )}
          </section>

          <section className="my-8">
            <div className="flex justify-between items-center gap-4">
              <PrimaryText size="lg">Receitas</PrimaryText>
              {isOwnProfile && (
                <PrimaryButton onClick={() => setShowAddRecipeModal(true)} size="sm">
                  <PlusIcon size="sm" />
                  Criar receita
                </PrimaryButton>
              )}
            </div>
            <div className="bg-muted h-[1px] mt-2"></div>
          </section>

          {isLoadingProfile ? (
            <>
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-3/4 h-4" />
            </>
          ) : errorFetchingProfile ? (
            <div className="text-center">
              <SecondaryText>{errorFetchingProfile}</SecondaryText>
            </div>
          ) : profileUserData ? (
            hasUserRecipes ? (
              profileUserData.recipes!.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  title={recipe.title}
                  image={recipe.imageUrl}
                  author={recipe.author}
                  authorId={recipe.userId}
                />
              ))
            ) : (
              <div className="text-center">
                <SecondaryText>Nenhuma receita criada</SecondaryText>
              </div>
            )
          ) : (
            <div className="text-center">
              <SecondaryText>Não foi possível encontrar este perfil.</SecondaryText>
            </div>
          )}
        </main>
      </section>

      <DefaultFooter />

      <AddRecipeModal closeModal={() => setShowAddRecipeModal(false)} isOpen={showAddRecipeModal} />
    </>
  );
}
