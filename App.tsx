import React, { useState, useCallback, useEffect } from 'react';
import { questionBank } from './constants';
import type { Question, QuizSettings } from './types';
import SetupScreen from './components/SetupScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import HistoryScreen from './components/HistoryScreen';
import WelcomeModal from './components/WelcomeModal';
import DeCuongScreen from './components/DeCuongScreen';
import PhimTatScreen from './components/PhimTatScreen';
import { getIncorrectQuestionIds } from './incorrectQuestionsManager';
import { SYLLABUS_CONTENT } from './syllabus';

type AppState = 'setup' | 'quiz' | 'results' | 'history' | 'decuong' | 'phimtat';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('setup');
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string | string[]>>({});
  const [totalTime, setTotalTime] = useState(0);
  const [quizMode, setQuizMode] = useState<'practice' | 'exam'>('practice');
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [syllabusScrollTarget, setSyllabusScrollTarget] = useState<string | null>(null);

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
      filteredQuestions = filteredQuestions.filter(q => settings.categories.includes(q.category));
    }
    if (settings.subCategories.length > 0) {
      filteredQuestions = filteredQuestions.filter(q => settings.subCategories.includes(q.subCategory));
    }
    if (settings.skillType !== 'all') {
      filteredQuestions = filteredQuestions.filter(q => q.skillType === settings.skillType);
    }

    const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, settings.numQuestions);

    if (selectedQuestions.length === 0) {
      alert('Không có câu hỏi nào phù hợp với lựa chọn của bạn. Vui lòng thử lại.');
      return;
    }
    
    setQuizQuestions(selectedQuestions);
    setUserAnswers({});
    setTotalTime(0);
    setQuizMode(settings.mode);
    setAppState('quiz');
  }, []);

  const handleStartIncorrectQuiz = useCallback((questions: Question[]) => {
    if (questions.length === 0) {
      alert('Tuyệt vời! Bạn không có câu hỏi nào trả lời sai cần ôn tập.');
      return;
    }
    setQuizQuestions(questions);
    setUserAnswers({});
    setTotalTime(0);
    setQuizMode('practice'); // Always practice mode for incorrect questions
    setAppState('quiz');
  }, []);

  const handleFinishQuiz = useCallback((finalAnswers: Record<number, string | string[]>, time: number) => {
    setUserAnswers(finalAnswers);
    setTotalTime(time);
    setAppState('results');
  }, []);
  
  const handleGoToSetup = useCallback(() => {
    setQuizQuestions([]);
    setUserAnswers({});
    setTotalTime(0);
    setAppState('setup');
  }, []);

  const handleViewHistory = useCallback(() => setAppState('history'), []);
  const handleViewDeCuong = useCallback(() => {
    setSyllabusScrollTarget(null);
    setAppState('decuong');
  }, []);
  const handleViewPhimTat = useCallback(() => setAppState('phimtat'), []);
  const handleViewInSyllabus = useCallback((syllabusId: string) => {
    setSyllabusScrollTarget(syllabusId);
    setAppState('decuong');
  }, []);

  const renderContent = () => {
    switch(appState) {
      case 'setup':
        return <SetupScreen onStartQuiz={handleStartQuiz} onViewHistory={handleViewHistory} onStartIncorrectQuiz={handleStartIncorrectQuiz} onViewDeCuong={handleViewDeCuong} onViewPhimTat={handleViewPhimTat} />;
      case 'quiz':
        return <QuizScreen questions={quizQuestions} onFinish={handleFinishQuiz} mode={quizMode} />;
      case 'results':
        return <ResultsScreen questions={quizQuestions} userAnswers={userAnswers} totalTime={totalTime} onRestart={handleGoToSetup} onViewHistory={handleViewHistory} onViewInSyllabus={handleViewInSyllabus} />;
      case 'history':
        return <HistoryScreen onBack={handleGoToSetup} />;
      case 'decuong':
        return <DeCuongScreen syllabus={SYLLABUS_CONTENT} scrollToId={syllabusScrollTarget} />;
       case 'phimtat':
        return <PhimTatScreen onBack={handleGoToSetup} />;
      default:
        return <SetupScreen onStartQuiz={handleStartQuiz} onViewHistory={handleViewHistory} onStartIncorrectQuiz={handleStartIncorrectQuiz} onViewDeCuong={handleViewDeCuong} onViewPhimTat={handleViewPhimTat} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex items-center justify-center p-4">
      {showWelcomeModal && <WelcomeModal onClose={handleCloseWelcomeModal} />}
      <main className="container mx-auto max-w-4xl w-full bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        <header className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600">Trình Luyện Thi Tin Học Toàn Diện</h1>
          {appState === 'setup' && <p className="text-slate-600 mt-2">Công cụ đắc lực giúp bạn chinh phục kỳ thi tin học.</p>}
        </header>
        
        {appState !== 'setup' && (
             <nav className="mb-6 pb-4 border-b border-slate-200">
                <ul className="flex flex-wrap justify-center gap-2 sm:gap-4">
                    <li><button onClick={handleGoToSetup} className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors">Trang Chủ</button></li>
                    <li><button onClick={handleViewDeCuong} className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors">Đề Cương Ôn Tập</button></li>
                    <li><button onClick={handleViewPhimTat} className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors">Tra Cứu Phím Tắt</button></li>
                    <li><button onClick={handleViewHistory} className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors">Lịch Sử</button></li>
                </ul>
            </nav>
        )}

        {renderContent()}
      </main>
    </div>
  );
};

export default App;
