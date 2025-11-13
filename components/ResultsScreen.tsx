import React, { useMemo, useEffect, useRef, useState } from 'react';
import type { Question, QuizResult } from '../types';
import Button from './Button';
import ResultItem from './ResultItem';
import { saveResult, getHistory, calculateHighScore } from '../historyManager';
import { addIncorrectQuestionIds, removeCorrectlyAnsweredIds } from '../incorrectQuestionsManager';

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

  const { score, percentage, incorrectAnswerIndices, correctAnswerIndices } = useMemo(() => {
    let currentScore = 0;
    const incorrectIndices: number[] = [];
    const correctIndices: number[] = [];
    questions.forEach((q, index) => {
      const correctAnswer = String(q.answer).toLowerCase();
      const userAnswer = (userAnswers[index] || '').toLowerCase();
      if (userAnswer === correctAnswer) {
        currentScore++;
        correctIndices.push(index);
      } else {
        incorrectIndices.push(index);
      }
    });
    const currentPercentage = questions.length > 0 ? (currentScore / questions.length) * 100 : 0;
    return { 
      score: currentScore, 
      percentage: currentPercentage, 
      incorrectAnswerIndices: incorrectIndices,
      correctAnswerIndices: correctIndices,
    };
  }, [questions, userAnswers]);

  const categoryStats = useMemo(() => {
    const stats: Record<string, { correct: number; total: number }> = {};
    questions.forEach((q, index) => {
        if (!stats[q.category]) {
            stats[q.category] = { correct: 0, total: 0 };
        }
        stats[q.category].total++;
        if (correctAnswerIndices.includes(index)) {
            stats[q.category].correct++;
        }
    });
    return stats;
  }, [questions, correctAnswerIndices]);

  useEffect(() => {
    if (questions.length > 0) {
      // Save overall result for history
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
      
      // Update incorrect questions list
      const incorrectQuestionIds = incorrectAnswerIndices.map(i => questions[i].id);
      addIncorrectQuestionIds(incorrectQuestionIds);
      
      // Remove questions that were answered correctly from the incorrect list
      const correctQuestionIds = correctAnswerIndices.map(i => questions[i].id);
      removeCorrectlyAnsweredIds(correctQuestionIds);
    }
  }, [score, percentage, totalTime, questions, incorrectAnswerIndices, correctAnswerIndices]);
  
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

       <section aria-labelledby="category-stats-heading" className="p-6 border-2 rounded-lg bg-blue-50 border-blue-200">
        <h3 id="category-stats-heading" className="text-xl font-semibold text-gray-700 mb-4">Thống Kê Theo Chủ Đề</h3>
        <ul className="space-y-2">
            {/* Fix: Use Object.keys to iterate and ensure stats object is correctly typed. */}
            {Object.keys(categoryStats).map((category) => {
                const stats = categoryStats[category];
                return (
                    <li key={category} className="text-left">
                        <p className="font-semibold text-slate-800">{category}</p>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <span>{stats.correct} / {stats.total} đúng</span>
                          <div className="w-full bg-slate-200 rounded-full h-2.5">
                              <div 
                                  className="bg-blue-600 h-2.5 rounded-full" 
                                  style={{ width: `${(stats.correct / stats.total) * 100}%` }}
                                  aria-valuenow={(stats.correct / stats.total) * 100}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                  aria-label={`Tỷ lệ đúng cho ${category}: ${(stats.correct / stats.total) * 100}%`}
                              ></div>
                          </div>
                        </div>
                    </li>
                );
            })}
        </ul>
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
              key={questions[index].id}
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