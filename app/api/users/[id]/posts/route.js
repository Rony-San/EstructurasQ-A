import Question from "@models/question";
import { connectToDB } from "@utils/database";

export const revalidate = 1;
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const questions = await Question.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(questions), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
