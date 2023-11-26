"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { FormEventHandler } from "react";
import Form from "@components/Form";

const CreateQuestion = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);

  const [option, setOption] = useState([]);
  const [question, setQuestion] = useState({
    questionLine: "",
    tag: "",
    option: [{ optionText: "", isCorrect: false }],
  });

  const createQuestion = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("api/question/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          questionLine: question.questionLine,
          tag: question.tag,
          option: question.option,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Crear"
      question={question}
      setQuestion={setQuestion}
      option={option}
      setOption={setOption}
      submitting={submitting}
      handleSubmit={createQuestion}></Form>
  );
};

export default CreateQuestion;
