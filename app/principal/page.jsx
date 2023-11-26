"use client";
import React from "react";
import Feed from "@components/Feed";
const page = () => {
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
        estar preparado para las próximas evaluaciones. diferente
      </p>
      <Feed />
    </section>
  );
};

export default page;
