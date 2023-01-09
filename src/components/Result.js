import React, { useEffect, useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { Link, useParams } from 'react-router-dom';
import { languages } from '../data/questions';

export default function Result() {
  const [countCorrect, setCountCorrect] = useState(0);
  const [countEmpty, setCountEmpty] = useState(0);

  let { language } = useParams();

  const username = secureLocalStorage.getItem(language).username;
  const answers = secureLocalStorage.getItem(language).questions;
  const correctAnswers = languages[language];

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      if (answers[i] === correctAnswers[i].correctOption) {
        setCountCorrect((p) => p + 1);
      }
      if (answers[i] == null) {
        setCountEmpty((p) => p + 1);
      }
    }
  }, [answers, correctAnswers]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen bg-cyan-900">
        <div className="flex flex-col items-center p-5 w-4/6 h-4/12 bg-slate-400 rounded-3xl">
          <h2 className="border w-1/2 flex justify-center py-2 px-3 rounded-md text-lg  bg-yellow-300 mb-2">
            Results
          </h2>
          <h3 className="font-bold text-lg text-violet-700 mt-1">{username}</h3>
          <table className="border-collapse bg-red-50 border w-4/6 border-slate-500 mt-4 font-bold">
            <thead>
              <tr className="text-center">
                <th className="border p-1 border-slate-600 text-green-500">
                  Correct
                </th>
                <th className="border p-1 border-slate-600 text-red-500">
                  Wrong
                </th>
                <th className="border p-1 border-slate-600 text-blue-500">
                  Unmarked
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="border border-slate-600 text-green-500">
                  {countCorrect}
                </td>
                <td className="border border-slate-600 text-red-500">
                  {10 - (countCorrect + countEmpty)}
                </td>
                <td className="border border-slate-600 text-blue-500">
                  {countEmpty}
                </td>
              </tr>
            </tbody>
          </table>
          <Link
            to={'/'}
            className="p-2 rounded-lg text-white bg-slate-800 mt-5 hover:bg-white hover:text-slate-800"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
