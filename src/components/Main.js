import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { languages } from '../data/questions';

export default function Main() {
  const [language, setLanguage] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  let questionsLength = languages[language]?.length;

  const handleStart = () => {
    if (username && language) {
      secureLocalStorage.setItem(language, {
        username,
        questions: new Array(questionsLength),
      });
      navigate(`/quiz/${language}/1`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h1 className="text-5xl text-red-500">Quiz Application</h1>

      <ol className="text-gray-700 opacity-60 mt-5">
        <li>You will be asked 10 questions one after another.</li>
        <li>You can change your answers before the quiz finish.</li>
        <li>The result will be declared at the end of the quiz.</li>
      </ol>

      <p className="mt-5 font-semibold">
        Enter your username and select the quiz category below.
      </p>

      <form id="form" className="mt-6">
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          placeholder="Username*"
          className="border p-2 rounded-lg bg-blue-200 focus:outline-none"
        />
      </form>

      <div className="flex text-2xl gap-5 mt-8">
        <div className="flex flex-col border border-indigo-200 p-4 rounded-lg text-indigo-600 bg-indigo-200">
          <input
            type="radio"
            name="categories"
            id="english"
            value={language}
            onChange={() => setLanguage('english')}
          />
          <label htmlFor="english">English Quiz</label>
        </div>
        <div className="flex flex-col border border-red-200 p-4 rounded-lg text-red-600 bg-red-200">
          <input
            type="radio"
            name="categories"
            id="spanish"
            value={language}
            onChange={() => setLanguage('spanish')}
          />
          <label htmlFor="spanish">Spanish Quiz</label>
        </div>
      </div>

      <button
        className="p-2 rounded-lg text-white bg-slate-800 mt-5 hover:bg-white hover:text-slate-800"
        onClick={handleStart}
      >
        Start the Quiz
      </button>
    </div>
  );
}
