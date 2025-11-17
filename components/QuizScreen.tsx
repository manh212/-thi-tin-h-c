
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import type { Question } from '../types';
import Button from './Button';
import SyllabusModal from './SyllabusModal';
import { playAudioFromBase64 } from '../utils/audio';
import { correctSoundBase64, incorrectSoundBase64 } from '../assets/sounds';

interface QuizScreenProps {
  questions: Question[];
  onFinish: (userAnswers: Record<number, string>, time: number) => void;
  apiKey: string | null;
}

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

const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onFinish, apiKey }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [time, setTime] = useState(0);
  const [isSyllabusOpen, setIsSyllabusOpen] = useState(false);
  const [questionForSyllabus, setQuestionForSyllabus] = useState<Question | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    headingRef.current?.focus();
  }, [currentIndex]);
  
  const shuffledOptions = useMemo(() => {
    const currentQuestion = questions[currentIndex];
    if (currentQuestion.type === 'mcq' && currentQuestion.options) {
      return [...currentQuestion.options].sort(() => 0.5 - Math.random());
    }
    return [];
  }, [currentIndex, questions]);

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answer);
    setUserAnswers(prev => ({ ...prev, [currentIndex]: answer }));
    setShowFeedback(true);

    const currentQuestion = questions[currentIndex];
    const isCorrect = answer.toLowerCase() === String(currentQuestion.answer).toLowerCase();

    // Construct feedback text for screen reader
    let feedback = '';
    const correctAnswerText = String(currentQuestion.answer) === 'true' ? 'Đúng' : String(currentQuestion.answer) === 'false' ? 'Sai' : currentQuestion.answer;
    
    if (isCorrect) {
      feedback = 'Chính xác!';
      if (currentQuestion.explanation) {
        feedback += ` Giải thích: ${currentQuestion.explanation}`;
      }
      playAudioFromBase64(correctSoundBase64);
    } else {
      feedback = `Không chính xác. Đáp án đúng là: ${correctAnswerText}.`;
      if (currentQuestion.explanation) {
        feedback += ` Giải thích: ${currentQuestion.explanation}`;
      }
      playAudioFromBase64(incorrectSoundBase64);
    }
    
    if (alertRef.current) {
      alertRef.current.textContent = feedback;
    }
  };

  const handleNextQuestion = () => {
    // Clear the alert content immediately before navigating
    if (alertRef.current) {
      alertRef.current.textContent = '';
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      onFinish(userAnswers, time);
    }
  };

  const handleOpenSyllabus = () => {
    setQuestionForSyllabus(questions[currentIndex]);
    setIsSyllabusOpen(true);
  };
  
  const handleCloseSyllabus = useCallback(() => {
    setIsSyllabusOpen(false);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const formatAriaTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const parts = [];
    if (minutes > 0) {
      parts.push(`${minutes} phút`);
    }
    if (seconds > 0 || minutes === 0) {
      parts.push(`${seconds} giây`);
    }
    return parts.join(' ');
  };

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedAnswer?.toLowerCase() === String(currentQuestion.answer).toLowerCase();
  
  const renderOptions = () => {
    const options = currentQuestion.type === 'tf' 
      ? [{label: 'Đúng', value: 'true'}, {label: 'Sai', value: 'false'}]
      : shuffledOptions.map(opt => ({label: opt, value: opt}));

    return options.map(opt => {
      const isSelected = selectedAnswer === opt.value;
      const isTheCorrectAnswer = opt.value.toLowerCase() === String(currentQuestion.answer).toLowerCase();
      
      let buttonClass = 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700';
      if (showFeedback) {
        if (isTheCorrectAnswer) {
          buttonClass = 'bg-green-100 border-green-500 text-green-800 ring-2 ring-green-500';
        } else if (isSelected && !isTheCorrectAnswer) {
          buttonClass = 'bg-red-100 border-red-500 text-red-800 ring-2 ring-red-500';
        } else {
            buttonClass = 'bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed';
        }
      }

      return (
        <button
          key={opt.value}
          onClick={() => handleAnswerSelect(opt.value)}
          disabled={showFeedback}
          className={`w-full text-left p-4 rounded-lg border shadow-sm transition-all duration-200 ${buttonClass}`}
        >
          {opt.label}
        </button>
      );
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Luyện tập</h2>
        <div 
          className="text-lg font-mono bg-slate-200 text-slate-800 px-3 py-1 rounded-md" 
          aria-label={`Thời gian đã trôi qua: ${formatAriaTime(time)}`}
          role="timer"
        >
          {formatTime(time)}
        </div>
      </div>
      
      {/* Visually hidden alert for screen reader announcements. This container is always in the DOM for reliability. */}
      <div ref={alertRef} role="alert" className="sr-only"></div>

      <div role="group" aria-labelledby="question-heading" className="p-5 border border-slate-200 rounded-lg bg-white shadow-sm">
        <h3 id="question-heading" ref={headingRef} tabIndex={-1} className="font-semibold text-xl text-slate-800 mb-4 focus:outline-none">
          Câu hỏi {currentIndex + 1} / {questions.length}: {currentQuestion.question}
        </h3>

        {showFeedback && (
            <div className={`mb-6 p-4 border rounded-lg ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-start space-x-3">
                {isCorrect ? <CorrectIcon /> : <IncorrectIcon />}
                <div>
                  <h3 className={`text-lg font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? 'Chính xác!' : 'Không chính xác'}
                  </h3>
                   {!isCorrect && (
                    <p className="text-sm text-slate-700 mt-2">
                      <strong>Đáp án đúng:</strong> <span className="font-semibold">{String(currentQuestion.answer) === 'true' ? 'Đúng' : String(currentQuestion.answer) === 'false' ? 'Sai' : currentQuestion.answer}</span>
                    </p>
                   )}
                  {currentQuestion.explanation && (
                     <p className="text-sm text-slate-700 mt-2">
                       <strong>Giải thích:</strong> {currentQuestion.explanation}
                     </p>
                  )}
                </div>
              </div>
            </div>
        )}

        <div className="space-y-3">
          {renderOptions()}
        </div>
      </div>

      <div className="text-center mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
        <Button onClick={handleNextQuestion} disabled={!showFeedback}>
          {currentIndex < questions.length - 1 ? 'Câu hỏi tiếp theo' : 'Hoàn thành'}
        </Button>
        {showFeedback && (
          <button 
            onClick={handleOpenSyllabus}
            className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            disabled={!apiKey}
          >
            {apiKey ? 'Xem giải thích chi tiết & Ôn tập' : 'Cần API Key để xem giải thích'}
          </button>
        )}
      </div>

      <SyllabusModal 
        isOpen={isSyllabusOpen} 
        onClose={handleCloseSyllabus} 
        question={questionForSyllabus}
        apiKey={apiKey}
        userAnswer={selectedAnswer}
      />
    </div>
  );
};

export default QuizScreen;
