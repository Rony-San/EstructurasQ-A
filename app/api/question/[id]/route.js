import Question from "@models/question";
import { connectToDB } from "@utils/database";
export const dynamic = "force-dynamic";
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const question = await Question.findById(params.id).populate("creator");
    if (!question) return new Response("question Not Found", { status: 404 });

    return new Response(JSON.stringify(question), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { questionLine, option, tag } = await request.json();

  try {
    await connectToDB();

    // Find the existing question by ID
    const existingQuestion = await Question.findById(params.id);

    if (!existingQuestion) {
      return new Response("Question not found", { status: 404 });
    }

    // Update the Question with new data
    existingQuestion.questionLine = questionLine;
    existingQuestion.option = option;
    existingQuestion.tag = tag;

    await existingQuestion.save();

    return new Response("Successfully updated the Prompts", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Prompt", { status: 500 });
  }
};
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    await Question.findByIdAndDelete(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 401 });
  }
};
