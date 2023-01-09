import React, { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { useParams } from 'react-router-dom';

export default function DisplayQuestion({ question }) {
  const [currentAnswer, setCurrentAnswer] = useState(null);

  let { language, questionId } = useParams();

  const handleChange = (i) => {
    const quiz = secureLocalStorage.getItem(language);
    quiz.questions[questionId - 1] = i;
    secureLocalStorage.setItem(language, quiz);
    setCurrentAnswer(i);
  };

  useEffect(() => {
    setCurrentAnswer(
      secureLocalStorage.getItem(language).questions[questionId - 1]
    );
  }, [language, questionId]);

  return (
    <div className="container p-5 mt-10 bg-green-100 rounded-lg shadow-lg shadow-green-400">
      <div>
        {question ? (
          <>
            <span>Question {question.id}</span>
            <p>{question.question}</p>
            <ul>
              {question.options.map((option, i) => (
                <div key={i} className="flex p-1 gap-1">
                  <div>
                    <input
                      type="radio"
                      name="options"
                      id={`${i}`}
                      checked={currentAnswer === i}
                      onChange={() => handleChange(i)}
                    />
                  </div>
                  <label htmlFor={`${i}`} className="text-lg">
                    {option}
                  </label>
                </div>
              ))}
            </ul>{' '}
          </>
        ) : (
          'deneme'
        )}
      </div>
    </div>
  );
}
