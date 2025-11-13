import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { Question } from '../types';
import Button from './Button';

interface QuizScreenProps {
  questions: Question[];
  onFinish: (userAnswers: Record<number, string | string[]>, time: number) => void;
  mode: 'practice' | 'exam';
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

const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onFinish, mode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [sequenceAnswer, setSequenceAnswer] = useState<string[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string | string[]>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackForSR, setFeedbackForSR] = useState('');
  const [time, setTime] = useState(0);
  const headingRef = useRef<HTMLLegendElement>(null);
  
  const isPracticeMode = mode === 'practice';
  const currentQuestion = questions[currentIndex];

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
    if (currentQuestion.type === 'mcq' && currentQuestion.options) {
      return [...currentQuestion.options].sort(() => 0.5 - Math.random());
    }
    if (currentQuestion.type === 'sequencing' && currentQuestion.options) {
      return [...currentQuestion.options].sort(() => 0.5 - Math.random());
    }
    return [];
  }, [currentIndex, questions, currentQuestion]);

  const processAndShowFeedback = (answer: string | string[]) => {
    let isCorrectLocal = false;
    if (Array.isArray(answer)) {
        isCorrectLocal = JSON.stringify(answer) === JSON.stringify(currentQuestion.answer);
    } else {
        isCorrectLocal = answer.toLowerCase() === String(currentQuestion.answer).toLowerCase();
    }
    
    let feedback = isCorrectLocal ? 'Chính xác!' : 'Không chính xác.';
    const correctAnswerText = Array.isArray(currentQuestion.answer) 
        ? currentQuestion.answer.map((a, i) => `${i+1}. ${a}`).join(' ') 
        : String(currentQuestion.answer) === 'true' ? 'Đúng' : String(currentQuestion.answer) === 'false' ? 'Sai' : currentQuestion.answer;

    if (!isCorrectLocal) {
      feedback += ` Đáp án đúng là: ${correctAnswerText}.`;
    }
    if (currentQuestion.explanation) {
      feedback += ` Giải thích: ${currentQuestion.explanation}`;
    }
    setFeedbackForSR(feedback);
  };

  const handleMCQAnswer = (answer: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    const newAnswers = { ...userAnswers, [currentIndex]: answer };
    setUserAnswers(newAnswers);
    if (isPracticeMode) {
      setShowFeedback(true);
      processAndShowFeedback(answer);
    }
  };

  const handleSequenceChange = (option: string) => {
    if (showFeedback) return;
    setSequenceAnswer(prev => {
        const newSequence = prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option];
        setUserAnswers({ ...userAnswers, [currentIndex]: newSequence });
        return newSequence;
    });
  };
  
  const handleNextQuestion = () => {
    if (isPracticeMode && currentQuestion.type === 'sequencing' && !showFeedback) {
      setShowFeedback(true);
      processAndShowFeedback(sequenceAnswer);
      return;
    }
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setSequenceAnswer([]);
      setShowFeedback(false);
      setFeedbackForSR('');
    } else {
      onFinish(userAnswers, time);
    }
  };
  
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const isCorrect = useMemo(() => {
    if (!showFeedback) return false;
    const userAnswer = userAnswers[currentIndex];
    if (Array.isArray(userAnswer)) {
      return JSON.stringify(userAnswer) === JSON.stringify(currentQuestion.answer);
    }
    return userAnswer?.toString().toLowerCase() === String(currentQuestion.answer).toLowerCase();
  }, [showFeedback, userAnswers, currentIndex, currentQuestion]);

  const renderOptions = () => {
    if (currentQuestion.type === 'sequencing') {
      return shuffledOptions.map((opt, idx) => {
        const isChecked = sequenceAnswer.includes(opt);
        const sequenceIndex = sequenceAnswer.indexOf(opt);
        return (
          <label key={idx} className={`flex items-center p-4 rounded-lg border shadow-sm transition-all duration-200 cursor-pointer ${showFeedback ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : 'bg-white hover:bg-slate-100 border-slate-300'}`}>
            <input type="checkbox" checked={isChecked} onChange={() => handleSequenceChange(opt)} disabled={showFeedback} className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
            <span className="ml-3 flex-1">{opt}</span>
            {isChecked && <span className="font-bold text-lg text-blue-600 bg-blue-100 rounded-full h-8 w-8 flex items-center justify-center">{sequenceIndex + 1}</span>}
          </label>
        );
      });
    }

    const options = currentQuestion.type === 'tf' 
      ? [{label: 'Đúng', value: 'true'}, {label: 'Sai', value: 'false'}]
      : shuffledOptions.map(opt => ({label: opt, value: opt}));

    return options.map(opt => {
      const isSelected = selectedAnswer === opt.value;
      const isTheCorrectAnswer = opt.value.toLowerCase() === String(currentQuestion.answer).toLowerCase();
      
      let buttonClass = 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700';
      if (showFeedback && isPracticeMode) {
        if (isTheCorrectAnswer) buttonClass = 'bg-green-100 border-green-500 text-green-800 ring-2 ring-green-500';
        else if (isSelected && !isTheCorrectAnswer) buttonClass = 'bg-red-100 border-red-500 text-red-800 ring-2 ring-red-500';
        else buttonClass = 'bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed';
      } else if (!isPracticeMode && isSelected) {
          buttonClass = 'bg-blue-100 border-blue-400 text-blue-800 ring-2 ring-blue-500';
      }

      return <button key={opt.value} onClick={() => handleMCQAnswer(opt.value)} disabled={showFeedback} className={`w-full text-left p-4 rounded-lg border shadow-sm transition-all duration-200 ${buttonClass}`}>{opt.label}</button>;
    });
  };

  const showNextButton = 
    (!isPracticeMode && (selectedAnswer !== null || sequenceAnswer.length > 0)) ||
    (isPracticeMode && showFeedback) ||
    (isPracticeMode && currentQuestion.type === 'sequencing' && sequenceAnswer.length > 0 && !showFeedback);

  return (
    <div>
      <div className="sr-only" aria-live="assertive" aria-atomic="true">{feedbackForSR}</div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">{isPracticeMode ? 'Luyện tập' : 'Thi thử'}</h2>
        <div className="text-lg font-mono bg-slate-200 text-slate-800 px-3 py-1 rounded-md" role="timer">{formatTime(time)}</div>
      </div>
      
      {(isPracticeMode && showFeedback) && (
        <div className={`mb-6 p-4 border rounded-lg ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`} role="alert">
          <div className="flex items-start space-x-3">
            {isCorrect ? <CorrectIcon /> : <IncorrectIcon />}
            <div>
              <h3 className={`text-lg font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>{isCorrect ? 'Chính xác!' : 'Không chính xác'}</h3>
               {!isCorrect && <p className="text-sm text-slate-700 mt-2"><strong>Đáp án đúng:</strong> <span className="font-semibold">{Array.isArray(currentQuestion.answer) ? currentQuestion.answer.map((a,i) => `(${i+1}) ${a}`).join('; ') : String(currentQuestion.answer) === 'true' ? 'Đúng' : String(currentQuestion.answer) === 'false' ? 'Sai' : currentQuestion.answer}</span></p>}
               {currentQuestion.explanation && <p className="text-sm text-slate-700 mt-2"><strong>Giải thích:</strong> {currentQuestion.explanation}</p>}
            </div>
          </div>
        </div>
      )}

      <fieldset className="p-5 border border-slate-200 rounded-lg bg-white shadow-sm">
        <legend ref={headingRef} tabIndex={-1} className="font-semibold text-xl text-slate-800 mb-4 focus:outline-none">Câu hỏi {currentIndex + 1} / {questions.length}: {currentQuestion.question}</legend>
        {currentQuestion.type === 'sequencing' && <p className="text-sm text-slate-600 mb-4">Chọn các bước theo đúng thứ tự. Số thứ tự sẽ hiện bên cạnh khi bạn chọn.</p>}
        <div className="space-y-3">{renderOptions()}</div>
      </fieldset>

      {showNextButton && (
        <div className="text-center mt-8">
          <Button onClick={handleNextQuestion}>
            {currentQuestion.type === 'sequencing' && isPracticeMode && !showFeedback ? 'Kiểm tra đáp án' : currentIndex < questions.length - 1 ? 'Câu hỏi tiếp theo' : 'Hoàn thành'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizScreen;
