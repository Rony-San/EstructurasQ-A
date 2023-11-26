"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Test = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  // Usa useRouter para obtener el objeto router

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/test");
      const questionsData = await response.json();
      setQuestions(questionsData);
      setAnswers(Array(questionsData.length).fill(null));
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAnswerSelect = (index, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[index] = optionIndex;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    const totalQuestions = questions.length;

    if (totalQuestions === 0) {
      return 0; // Avoid division by zero
    }

    const correctAnswers = questions.reduce((acc, question, index) => {
      const selectedOptionIndex = answers[index];
      const correctOptionIndex = question.option.findIndex(
        (opt) => opt.isCorrect
      );

      return acc + (selectedOptionIndex === correctOptionIndex ? 1 : 0);
    }, 0);

    const percentageCorrect = (correctAnswers / totalQuestions) * 100;

    // Map the percentage to a score between 0 and 5
    const score = (percentageCorrect / 100) * 5;

    return score;
  };
  const finishExam = () => {
    const score = calculateScore();
    alert(`Tu calificación es: ${score}`);
    // Obtén el objeto router

    // Redirige a la página principal "/"
  };

  return (
    <div>
      <h1 className="head_text text-left mb-10">
        <span className="blue_gradient ">Quiz </span>
      </h1>
      {questions.map((question, index) => (
        <div className="mb-5" key={question._id}>
          <p className="font-inter text-sm text-cyan-900 font-bold mt-2 mb-1">
            {question.questionLine}
          </p>
          <ul>
            {question.option.map((opt, optIndex) => (
              <li key={opt._id}>
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    checked={answers[index] === optIndex}
                    onChange={() => handleAnswerSelect(index, optIndex)}
                  />
                  {opt.optionText}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button className="black_btn mt-5 mb-5" onClick={finishExam}>
        Terminar Examen
      </button>
    </div>
  );
};

export default Test;
