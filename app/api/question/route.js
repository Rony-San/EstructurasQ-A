import Question from "@models/question";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const questions = await Question.find({}).populate("creator");
    console.log("esta es la pregunta" + questions);
    return new Response(JSON.stringify(questions), {
      status: 200,
      headers: {
        "Cache-Control": "no-store, must-revalidate",
      },
    });
  } catch (error) {
    return new Response("fallo al traer todas las questions", { status: 500 });
  }
};
