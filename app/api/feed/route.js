import Question from "@models/question";
import { connectToDB, disconnectFromDB } from "@utils/database";

export const GET = async (request) => {
  try {
    // Conéctate a la base de datos
    await connectToDB();

    // Realiza la consulta de preguntas y popula el campo "creator"
    const questions = await Question.find().populate("creator");

    // Desconéctate de la base de datos después de realizar la consulta
    // await disconnectFromDB();

    // Log para verificar las preguntas obtenidas
    console.log("Estas son las preguntas:", questions);

    // Devuelve la respuesta al cliente
    return new Response(JSON.stringify(questions), {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    // Manejo de errores en caso de fallo
    console.error("Error al traer todas las preguntas:", error);

    // Devuelve una respuesta de error al cliente
    return new Response("Fallo al traer todas las preguntas", { status: 500 });
  }
};
