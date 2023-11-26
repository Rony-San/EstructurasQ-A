"use client";
import Feed from "@components/Feed";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Estructura de Datos <br className="max-md:hidden " />
        <span className="orange_gradient text-center">
          {" "}
          Preguntas de estudio
        </span>
      </h1>
      <p className="desc text-center">
        {" "}
        Crea y busca preguntas relacionadas con los temas de estructuras de
        datos. Estas te ayudarán a mejorar tu conocimiento sobre la materia y a
        estar preparado para las próximas evaluaciones.
        {router.push("/principal")}
      </p>
      <Feed />
    </section>
  );
};

export default Home;
