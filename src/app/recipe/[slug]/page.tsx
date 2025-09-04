"use client";

import BackButton from "@/components/ui/BackButton";
import PrimaryText from "@/components/ui/PrimaryText";
import SecondaryText from "@/components/ui/SecondaryText";
import AuthService from "@/services/authService";
import RecipeService from "@/services/recipeService";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Recipe() {
  const params = useParams();
  const recipeId = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const authService = new AuthService();
  const recipeService = new RecipeService(authService);

  return (
    <div className="container mx-auto px-4 min-h-screen">
      <nav className="flex flex-col-reverse md:flex-row justify-between gap-4 mt-24">
        <section className="flex flex-col items-center md:items-start md:flex-row gap-4 text-center md:text-start">
          <Image
            className="w-36 h-36 rounded-2xl mx-auto md:mx-0"
            src="https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg"
            alt="Img"
            width={200}
            height={200}
          />
          <div className="max-w-lg">
            <PrimaryText size="lg">Cupcake com cereja</PrimaryText>

            <cite className="text-sm text-dark/80">Feito por Luiz Henrique</cite>
          </div>
        </section>

        <section className="flex justify-end items-start">
          <BackButton>Voltar</BackButton>
        </section>
      </nav>

      <section className="flex justify-between items-center mt-20 mb-12">
        <PrimaryText size="lg">Descrição da receita</PrimaryText>
        <button>Editar</button>
      </section>
    </div>
  );
}
