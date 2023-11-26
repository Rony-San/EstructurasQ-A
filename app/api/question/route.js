import Question from "@models/question";
import { connectToDB } from "@utils/database";
export const dynamic = "force-dynamic";
export const GET = async (request) => {
  try {
    await connectToDB();
    const questionId = "655e6f5ce34ff3a7710a0b99";
    // const questionId = "655e6f5ce34ff3a7710a0b99";
    const questions = await Question.find().populate("creator");
    console.log("esta es la pregunta" + questions);
    return new Response(JSON.stringify(questions), { status: 200 });
  } catch (error) {
    return new Response("fallo al traer todas las questions", { status: 500 });
  }
};
