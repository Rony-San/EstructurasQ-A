import React, { useState } from "react";
import Link from "next/link";

const Form = ({
  type,
  question,
  option,
  setQuestion,
  handleSubmit,
  setOption,
  submitting,
}) => {
  console.log("antes de los cambios");
  console.log(question);
  console.log(question.option);
  console.log(option);

  const handleAddInput = () => {
    const updatedOption = [...option, { optionText: "", isCorrect: false }];
    setOption(updatedOption);
    setQuestion({ ...question, option: updatedOption });
  };
  const handleAditionalOptions = (index, field, value) => {
    const updatedOption = [...question.option];
    updatedOption[index][field] = value;
    setOption(updatedOption);
    setQuestion({ ...question, option: updatedOption });
  };

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text_left">
        <span className="blue_gradient">{type} Pregunta</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} preguntas sobre la materia 'Estructura de Datos'. Estas preguntas
        se mostrarán en la pagina principal de la materia para que los
        compañeros también puedan estudiarlas.
      </p>
      <div className="flex w-full mb-5">
        <form
          onSubmit={handleSubmit}
          className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              {" "}
              Cancel Escribe tu pregunta aquí
            </span>
            <input
              value={question.questionLine}
              onChange={(e) =>
                setQuestion({ ...question, questionLine: e.target.value })
              }
              placeholder="Escribe aquí."
              required
              className="form_input "
            />
          </label>
          {console.log("está es mi opcion")}
          {console.log(option)}
          {question.option.map((additionalOption, index) => (
            <div key={index} className="flex items-center">
              <label className="w-96">
                <span className="font-satoshi font-semibold text-base text-gray-700">
                  {" "}
                  Opción {index + 1}
                </span>
                <textarea
                  value={additionalOption.optionText}
                  onChange={(e) =>
                    handleAditionalOptions(index, "optionText", e.target.value)
                  }
                  placeholder="Escribe aquí."
                  required
                  className="form_input resize-y h-12"
                />
              </label>
              <label className="ml-4">
                <input
                  type="checkbox"
                  checked={additionalOption.isCorrect}
                  onChange={() =>
                    handleAditionalOptions(
                      index,
                      "isCorrect",
                      !additionalOption.isCorrect
                    )
                  }
                />
                <span className="font-satoshi font-semibold text-base text-gray-700">
                  {" "}
                  Correcta
                </span>
              </label>
            </div>
          ))}
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              {" "}
              Tag{" "}
              <span className="font-normal">
                {" "}
                #Arboles, #MetodosDeOrdenamiento, #Hashing "{" "}
              </span>
            </span>
            <input
              value={question.tag}
              onChange={(e) =>
                setQuestion({ ...question, tag: e.target.value })
              }
              type="text"
              placeholder="Escribe aquí."
              required
              className="form_input "
            />
          </label>
          <div className="flex-end mx-3 mb-5 gap-4">
            <button
              onClick={handleAddInput}
              className=" items-center justify-center text-sm bg-primary-orange rounded-full text-white w-8 h-8 lg:hidden md:hidden block shadow-lg hover:bg-sky-900">
              +
            </button>
            <Link href="/" className="text-gray-500 text-sm">
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white shadow-lg hover:bg-sky-900">
              {submitting ? `${type}ing...` : type}
            </button>
          </div>
        </form>

        <button
          onClick={handleAddInput}
          className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white w-20 h-14 mt-10 ml-10 sm:block hidden shadow-lg hover:bg-sky-900">
          Añadir opción
        </button>
      </div>
    </section>
  );
};

export default Form;
