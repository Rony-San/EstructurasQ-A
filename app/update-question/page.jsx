"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const Updatequestion = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const questionId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);

  const [option, setOption] = useState([]);
  const [question, setQuestion] = useState({
    questionLine: "",
    option: [{ optionText: "", isCorrect: false }],
    tag: "",
  });
  console.log(question);
  console.log(question.option);
  useEffect(() => {
    const getquestionDetails = async () => {
      const response = await fetch(`/api/question/${questionId}`);
      const data = await response.json();

      setQuestion({
        questionLine: data.questionLine,
        option: data.option,
        tag: data.tag,
      });
    };

    if (questionId) getquestionDetails();
  }, [questionId]);

  const updatequestion = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!questionId) return alert("Missing questionId!");

    try {
      const response = await fetch(`/api/question/${questionId}`, {
        method: "PATCH",
        body: JSON.stringify({
          questionLine: question.questionLine,
          option: question.option,
          tag: question.tag,
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
      type="Editar"
      question={question}
      setQuestion={setQuestion}
      option={option}
      setOption={setOption}
      submitting={submitting}
      handleSubmit={updatequestion}
    />
  );
};

export default Updatequestion;
