import React, { useState, useCallback, useEffect } from 'react';
import { questionBank } from './constants';
import type { Question, QuizSettings } from './types';
import SetupScreen from './components/SetupScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import HistoryScreen from './components/HistoryScreen';
import WelcomeModal from './components/WelcomeModal';
import { getIncorrectQuestionIds } from './incorrectQuestionsManager';

type AppState = 'setup' | 'quiz' | 'results' | 'history';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('setup');
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [totalTime, setTotalTime] = useState(0);
  const [quizMode, setQuizMode] = useState<'practice' | 'exam'>('practice');
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    if (!hasVisited) {
      setShowWelcomeModal(true);
    }
  }, []);

  const handleCloseWelcomeModal = () => {
    localStorage.setItem('hasVisitedBefore', 'true');
    setShowWelcomeModal(false);
  };

  const handleStartQuiz = useCallback((settings: QuizSettings) => {
    let filteredQuestions = questionBank;
    if (settings.categories.length > 0) {
      filteredQuestions = questionBank.filter(q => settings.categories.includes(q.category));
    }

    const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, settings.numQuestions);

    if (selectedQuestions.length === 0) {
      alert('Không có câu hỏi nào phù hợp với lựa chọn của bạn. Vui lòng thử lại.');
      return;
    }
    
    setQuizQuestions(selectedQuestions);
    setQuizMode(settings.mode);
    setAppState('quiz');
  }, []);

  const handleStartIncorrectQuiz = useCallback(() => {
    const incorrectIds = getIncorrectQuestionIds();
    if (incorrectIds.length === 0) {
      alert('Tuyệt vời! Bạn không có câu hỏi nào trả lời sai cần ôn tập.');
      return;
    }
    const incorrectQuestions = questionBank.filter(q => incorrectIds.includes(q.id));
    const shuffled = incorrectQuestions.sort(() => 0.5 - Math.random());

    setQuizQuestions(shuffled);
    setQuizMode('practice'); // Always practice mode for incorrect questions
    setAppState('quiz');
  }, []);

  const handleFinishQuiz = useCallback((finalAnswers: Record<number, string>, time: number) => {
    setUserAnswers(finalAnswers);
    setTotalTime(time);
    setAppState('results');
  }, []);
  
  const handleRestart = useCallback(() => {
    setQuizQuestions([]);
    setUserAnswers({});
    setTotalTime(0);
    setAppState('setup');
  }, []);

  const handleViewHistory = useCallback(() => {
    setAppState('history');
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex items-center justify-center p-4">
      {showWelcomeModal && <WelcomeModal onClose={handleCloseWelcomeModal} />}
      <main className="container mx-auto max-w-4xl w-full bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600">Trình Luyện Thi Tin Học Toàn Diện</h1>
          <p className="text-slate-600 mt-2">Luyện tập từng câu hỏi với phản hồi và giải thích chi tiết.</p>
        </header>

        {appState === 'setup' && <SetupScreen onStartQuiz={handleStartQuiz} onViewHistory={handleViewHistory} onStartIncorrectQuiz={handleStartIncorrectQuiz} />}
        {appState === 'quiz' && <QuizScreen questions={quizQuestions} onFinish={handleFinishQuiz} mode={quizMode} />}
        {appState === 'results' && <ResultsScreen questions={quizQuestions} userAnswers={userAnswers} totalTime={totalTime} onRestart={handleRestart} onViewHistory={handleViewHistory} />}
        {appState === 'history' && <HistoryScreen onBack={handleRestart} />}
      </main>
    </div>
  );
};

export default App;