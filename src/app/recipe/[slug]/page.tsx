import PrimaryText from "@/components/ui/PrimaryText";
import SecondaryText from "@/components/ui/SecondaryText";
import Image from "next/image";

export default function Recipe() {
  return (
    <div className="container mx-auto px-4">
      <nav className="flex justify-between gap-4 mt-24">
        <section className="flex gap-4">
          <Image
            className="w-36 h-36 rounded-2xl"
            src="https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg"
            alt="Img"
            width={200}
            height={200}
          />
          <div className="grid grid-rows-[auto,1fr] max-w-lg">
            <header>
              <PrimaryText size="lg">Cupcake com cereja</PrimaryText>
              <SecondaryText size="sm" className="mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores unde, similique
                molestias quo perferendis quod?
              </SecondaryText>
            </header>

            <footer className="flex items-end justify-between gap-2">
              <cite className="text-sm text-dark/80">Feito por Luiz Henrique</cite>
              <span>+</span>
            </footer>
          </div>
        </section>

        <section className="text-end">Voltar</section>
      </nav>

      <section className="flex justify-between items-center mt-20 mb-12">
        <PrimaryText size="lg">Descrição da receita</PrimaryText>
        <button>Editar</button>
      </section>

      <section>
        <PrimaryText>Ingredientes</PrimaryText>
        <SecondaryText className="py-6">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, earum consequatur velit
          quis suscipit dignissimos cum eligendi id reiciendis nulla fugit sed. Temporibus dolorum
          corporis deserunt exercitationem doloremque illo. Repudiandae?
        </SecondaryText>

        <PrimaryText>Modo de preparo</PrimaryText>
        <SecondaryText className="py-6">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, earum consequatur velit
          quis suscipit dignissimos cum eligendi id reiciendis nulla fugit sed. Temporibus dolorum
          corporis deserunt exercitationem doloremque illo. Repudiandae?
        </SecondaryText>
      </section>
    </div>
  );
}
