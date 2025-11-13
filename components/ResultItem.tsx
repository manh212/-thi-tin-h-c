import React, { useState } from 'react';
import type { Question } from '../types';

interface ResultItemProps {
  question: Question;
  userAnswer: string;
  index: number;
}

const ResultItem: React.FC<ResultItemProps> = ({ question, userAnswer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const correctAnswer = String(question.answer);
  const isCorrect = userAnswer?.toLowerCase() === correctAnswer.toLowerCase();
  
  const displayUserAnswer = userAnswer ? (question.type === 'tf' ? (userAnswer.toLowerCase() === 'true' ? 'Đúng' : 'Sai') : userAnswer) : <em>Chưa trả lời</em>;
  const displayCorrectAnswer = question.type === 'tf' ? (correctAnswer.toLowerCase() === 'true' ? 'Đúng' : 'Sai') : correctAnswer;


  const CorrectIcon = () => (
    <svg className="h-6 w-6 text-green-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const IncorrectIcon = () => (
    <svg className="h-6 w-6 text-red-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
  
  const ChevronIcon = () => (
     <svg className={`h-5 w-5 text-slate-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
  );

  return (
    <div className={`border rounded-lg shadow-sm transition-colors ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left space-x-4"
        aria-expanded={isOpen}
        aria-controls={`result-details-${index}`}
      >
        <div className="flex items-start space-x-3">
          {isCorrect ? <CorrectIcon /> : <IncorrectIcon />}
          <span className="flex-1 font-semibold text-slate-800">
             <span className="sr-only">{isCorrect ? 'Câu trả lời đúng.' : 'Câu trả lời sai.'}</span>
            {`${index + 1}. ${question.question}`}
            </span>
        </div>
        <ChevronIcon />
      </button>

      {isOpen && (
        <div id={`result-details-${index}`} className="px-4 pb-4 pt-2" role="region">
           <div className={`mt-2 pt-3 border-t ${isCorrect ? 'border-green-200' : 'border-red-200'} space-y-3`}>
              <p>
                <strong>Câu trả lời của bạn:</strong> 
                <span className={`font-medium ml-2 px-2 py-1 rounded-md ${isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {displayUserAnswer}
                </span>
              </p>
              {!isCorrect && (
                <p>
                  <strong>Đáp án đúng:</strong>
                  <span className="font-semibold ml-2 px-2 py-1 rounded-md bg-green-200 text-green-800">
                    {displayCorrectAnswer}
                  </span>
                </p>
              )}
              {question.explanation && (
                  <p className="text-slate-700 pt-3 mt-2 border-t border-slate-300">
                      <strong className="font-semibold">Giải thích:</strong> {question.explanation}
                  </p>
              )}
           </div>
        </div>
      )}
    </div>
  );
};

export default ResultItem;