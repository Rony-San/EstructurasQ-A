import Question from "@models/question";
import { connectToDB } from "@utils/database";

export const dynamic = "force-dynamic";
export const GET = async (request) => {
  try {
    await connectToDB();

    const questions = await Question.find({}).populate("creator");

    return new Response(JSON.stringify(questions), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all questions", { status: 500 });
  }
};
