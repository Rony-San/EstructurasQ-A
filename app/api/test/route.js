import Question from "@models/question";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    // Use $sample to get 5 random questions
    const randomQuestions = await Question.aggregate([
      { $sample: { size: 5 } },
    ]);

    console.log("Estas son las preguntas aleatorias: ", randomQuestions);

    return new Response(JSON.stringify(randomQuestions), { status: 200 });
  } catch (error) {
    console.error("Fallo al traer preguntas aleatorias: ", error);
    return new Response("Fallo al traer preguntas aleatorias", { status: 500 });
  }
};
