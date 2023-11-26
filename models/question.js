import { Schema, model, models } from "mongoose";

const QuestionSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  questionLine: {
    type: String,
    required: [true, "La pregunta es requerida"],
  },
  tag: {
    type: String,
    required: [true, "El tag es requerido"],
  },
  option: [
    {
      optionText: {
        type: String,
        required: [true, "El texto de la opción es requerido"],
      },
      isCorrect: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Question = models.Question || model("Question", QuestionSchema);

export default Question;
