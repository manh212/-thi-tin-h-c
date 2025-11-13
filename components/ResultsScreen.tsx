
import React, { useMemo, useEffect, useRef, useState } from 'react';
import type { Question, QuizResult } from '../types';
import Button from './Button';
import ResultItem from './ResultItem';
import { saveResult, getHistory, calculateHighScore } from '../historyManager';

interface ResultsScreenProps {
  questions: Question[];
  userAnswers: Record<number, string>;
  totalTime: number;
  onRestart: () => void;
  onViewHistory: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ questions, userAnswers, totalTime, onRestart, onViewHistory }) => {
  const mainHeadingRef = useRef<HTMLHeadingElement>(null);
  const [showOnlyIncorrect, setShowOnlyIncorrect] = useState(false);
  const [highScoreInfo, setHighScoreInfo] = useState({ highScore: 0, count: 0, historyLength: 0 });

  useEffect(() => {
    mainHeadingRef.current?.focus();
  }, []);

  const { score, percentage, incorrectAnswerIndices } = useMemo(() => {
    let currentScore = 0;
    const incorrectIndices: number[] = [];
    questions.forEach((q, index) => {
      const correctAnswer = String(q.answer).toLowerCase();
      const userAnswer = (userAnswers[index] || '').toLowerCase();
      if (userAnswer === correctAnswer) {
        currentScore++;
      } else {
        incorrectIndices.push(index);
      }
    });
    const currentPercentage = questions.length > 0 ? (currentScore / questions.length) * 100 : 0;
    return { score: currentScore, percentage: currentPercentage, incorrectAnswerIndices: incorrectIndices };
  }, [questions, userAnswers]);

  useEffect(() => {
    if (questions.length > 0) {
      const newResult: QuizResult = {
        score,
        totalQuestions: questions.length,
        percentage: parseFloat(percentage.toFixed(1)),
        totalTime,
        timestamp: Date.now(),
      };
      
      saveResult(newResult);
      
      const updatedHistory = getHistory();
      const { highScore, count } = calculateHighScore(updatedHistory);
      setHighScoreInfo({ highScore, count, historyLength: updatedHistory.length });
    }
  }, [score, percentage, totalTime, questions.length]);
  
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const getAssessment = () => {
    if (percentage >= 90) return 'Xuất sắc!';
    if (percentage >= 75) return 'Rất tốt!';
    if (percentage >= 50) return 'Khá, cần ôn tập thêm!';
    return 'Cần cố gắng nhiều hơn.';
  };
  
  const questionsToDisplayIndices = showOnlyIncorrect ? incorrectAnswerIndices : questions.map((_, i) => i);

  return (
    <div className="space-y-8">
      <h2 ref={mainHeadingRef} tabIndex={-1} className="text-center text-3xl font-bold text-gray-800 focus:outline-none">Kết Quả Luyện Tập</h2>
      
      <section aria-labelledby="summary-heading" className="text-center p-6 border-2 rounded-lg bg-slate-50 border-slate-200">
        <h3 id="summary-heading" className="text-xl font-semibold text-gray-700 mb-2">Tổng kết</h3>
        <p className="text-lg"><strong>Số câu đúng:</strong> {score} / {questions.length}</p>
        <p className="text-lg"><strong>Tỷ lệ đúng:</strong> {percentage.toFixed(1)}%</p>
        <p className="text-lg"><strong>Tổng thời gian:</strong> {formatTime(totalTime)}</p>
        <p className="text-lg mt-2 font-medium text-blue-600"><strong>Đánh giá:</strong> {getAssessment()}</p>
      </section>

      <section aria-labelledby="highscore-heading" className="text-center p-6 border-2 rounded-lg bg-yellow-50 border-yellow-200">
        <h3 id="highscore-heading" className="text-xl font-semibold text-gray-700 mb-2">Thành Tích Chuỗi Này</h3>
        <p className="text-lg"><strong>Điểm cao nhất:</strong> {highScoreInfo.highScore.toFixed(1)}%</p>
        {highScoreInfo.highScore > 0 && (
          <p className="text-lg"><strong>Số lần đạt được:</strong> {highScoreInfo.count}</p>
        )}
        <p className="text-sm text-slate-600 mt-2">
            Bài làm hiện tại: {highScoreInfo.historyLength} / 10.
            <br />
            Lịch sử sẽ được tổng kết và làm mới sau mỗi 10 lần làm bài.
        </p>
      </section>

      <section aria-labelledby="review-heading">
        <div className="flex justify-between items-center border-b-2 border-blue-500 pb-2 mb-4">
            <h3 id="review-heading" className="text-2xl font-semibold text-gray-700">
              Xem Lại Câu Trả Lời
            </h3>
            {incorrectAnswerIndices.length > 0 && (
              <button
                onClick={() => setShowOnlyIncorrect(prev => !prev)}
                aria-pressed={showOnlyIncorrect}
                className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                {showOnlyIncorrect ? 'Hiển thị tất cả' : `Chỉ xem ${incorrectAnswerIndices.length} câu sai`}
              </button>
            )}
        </div>
        <div className="space-y-4">
          {questionsToDisplayIndices.map(index => (
            <ResultItem
              key={index}
              question={questions[index]}
              userAnswer={userAnswers[index]}
              index={index}
            />
          ))}
        </div>
      </section>

      <div className="text-center pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
        <Button onClick={onRestart} variant="primary">
          Luyện Tập Lại
        </Button>
        <Button onClick={onViewHistory} variant="secondary">
          Xem Lịch Sử Tổng Hợp
        </Button>
      </div>
    </div>
  );
};

export default ResultsScreen;
