import { connectToDB } from "@utils/database";
import Question from "@models/question";

export const revalidate = 1;
export const POST = async (req) => {
  const { userId, questionLine, tag, option } = await req.json();

  try {
    await connectToDB();

    const newQuestion = new Question({
      creator: userId,
      questionLine,
      tag,
      option,
    });

    await newQuestion.save();

    return new Response(JSON.stringify(newQuestion), { status: 201 });
  } catch (error) {
    return new Response("Se fallo a la hora de crear la pregunta", {
      status: 201,
    });
  }
};
