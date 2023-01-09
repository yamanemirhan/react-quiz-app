import React from 'react';
import Question from './Question';
import { useParams, useNavigate } from 'react-router-dom';
import { languages } from '../data/questions';

export default function Quiz() {
  let { language, questionId } = useParams();
  const navigate = useNavigate();
  let question = languages[language][questionId - 1];

  function handleNext() {
    if (languages[language].length !== Number(questionId)) {
      navigate(`/quiz/${language}/${Number(questionId) + 1}`);
    } else {
      navigate(`/quiz/${language}/result`);
    }
  }
  function handlePrev() {
    if (Number(questionId) > 1) {
      navigate(`/quiz/${language}/${Number(questionId) - 1}`);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h1 className="text-5xl text-purple-600">
        {language.toUpperCase()} QUIZ
      </h1>

      {/*Display Questions */}
      <Question question={question} />

      <div className="container flex justify-between mt-5">
        <button
          onClick={handlePrev}
          className="border border-yellow-400 px-5 rounded-sm bg-yellow-400 hover:text-white hover:bg-yellow-400"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="border px-5 rounded-sm bg-green-400 border-green-400 hover:text-white hover:bg-green-400"
        >
          {languages[language].length !== Number(questionId)
            ? 'Next'
            : 'Finish'}
        </button>
      </div>
    </div>
  );
}
