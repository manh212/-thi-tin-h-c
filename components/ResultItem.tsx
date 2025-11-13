
import React, { useState } from 'react';
import type { Question } from '../types';

interface ResultItemProps {
  question: Question;
  userAnswer: string | string[];
  index: number;
  onViewInSyllabus: (syllabusId: string) => void;
}

const ResultItem: React.FC<ResultItemProps> = ({ question, userAnswer, index, onViewInSyllabus }) => {
  const [isOpen, setIsOpen] = useState(false);

  const correctAnswer = question.answer;
  const isCorrect = Array.isArray(correctAnswer) 
    ? JSON.stringify(userAnswer) === JSON.stringify(correctAnswer)
    : (userAnswer as string)?.toLowerCase() === String(correctAnswer).toLowerCase();
  
  const formatAnswerForDisplay = (answer: string | string[] | boolean | undefined) => {
    if (answer === undefined || answer === null) return <em>Chưa trả lời</em>;
    if (Array.isArray(answer)) return <ol className="list-decimal list-inside ml-2">{answer.map((item, i) => <li key={i}>{item}</li>)}</ol>;
    if (question.type === 'tf') return String(answer).toLowerCase() === 'true' ? 'Đúng' : 'Sai';
    return String(answer);
  }

  const displayUserAnswer = formatAnswerForDisplay(userAnswer);
  const displayCorrectAnswer = formatAnswerForDisplay(correctAnswer);

  const CorrectIcon = () => (<svg className="h-6 w-6 text-green-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
  const IncorrectIcon = () => (<svg className="h-6 w-6 text-red-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
  const ChevronIcon = () => (<svg className={`h-5 w-5 text-slate-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>);

  return (
    <div className={`border rounded-lg shadow-sm transition-colors ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-4 text-left space-x-4" aria-expanded={isOpen} aria-controls={`result-details-${index}`}>
        <div className="flex items-start space-x-3">
          {isCorrect ? <CorrectIcon /> : <IncorrectIcon />}
          <span className="flex-1 font-semibold text-slate-800"><span className="sr-only">{isCorrect ? 'Câu trả lời đúng.' : 'Câu trả lời sai.'}</span>{`${index + 1}. ${question.question}`}</span>
        </div>
        <ChevronIcon />
      </button>

      {isOpen && (
        <div id={`result-details-${index}`} className="px-4 pb-4 pt-2" role="region">
           <div className={`mt-2 pt-3 border-t ${isCorrect ? 'border-green-200' : 'border-red-200'} space-y-4`}>
              
              {/* --- User's Answer --- */}
              <div className="space-y-1">
                <p><strong>Câu trả lời của bạn:</strong></p> 
                <div className={`p-3 rounded-md text-sm ${isCorrect ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`}>{displayUserAnswer}</div>
              </div>

              {/* --- Correct Answer (if incorrect) --- */}
              {!isCorrect && (
                <div className="space-y-1">
                  <p><strong>Đáp án đúng:</strong></p>
                  <div className="p-3 rounded-md text-sm bg-green-100 text-green-900">{displayCorrectAnswer}</div>
                </div>
              )}

              {/* --- Explanation and Syllabus Link --- */}
              {(question.explanation || question.syllabusId) && (
                  <div className="pt-3 mt-2 border-t border-slate-300">
                    <div className="flex justify-between items-start gap-4">
                      {question.explanation && (
                         <div className="flex-grow text-slate-700">
                           <strong className="font-semibold">Giải thích:</strong>
                           <p className="mt-1 text-sm">{question.explanation}</p>
                         </div>
                      )}
                      {question.syllabusId && (
                        <button 
                            onClick={() => onViewInSyllabus(question.syllabusId)} 
                            className="flex-shrink-0 self-center px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors whitespace-nowrap"
                        >
                            Xem chi tiết từ đề cương
                        </button>
                      )}
                    </div>
                  </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
};

export default ResultItem;
