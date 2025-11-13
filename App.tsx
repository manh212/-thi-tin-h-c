
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { questionBank } from './constants';
import type { Question, QuizSettings, SyllabusContent } from './types';
import SetupScreen from './components/SetupScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import HistoryScreen from './components/HistoryScreen';
import WelcomeModal from './components/WelcomeModal';
import DeCuongScreen from './components/DeCuongScreen';
import PhimTatScreen from './components/PhimTatScreen';
import { SYLLABUS_CONTENT } from './syllabus';

// --- Helper Component: Syllabus Detail Modal ---

interface SyllabusDetailModalProps {
  syllabusId: string;
  onClose: () => void;
}

const findSyllabusItem = (id: string, items: SyllabusContent[]): SyllabusContent | null => {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findSyllabusItem(id, item.children);
      if (found) return found;
    }
  }
  return null;
};

const SyllabusDetailModal: React.FC<SyllabusDetailModalProps> = ({ syllabusId, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const item = findSyllabusItem(syllabusId, SYLLABUS_CONTENT);

  useEffect(() => {
    const closeButton = modalRef.current?.querySelector('button');
    closeButton?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="syllabus-modal-title">
      <div ref={modalRef} className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 sm:p-8 text-left animate-fade-in-up max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h2 id="syllabus-modal-title" className="text-2xl font-bold text-blue-600">Chi tiết từ Đề cương</h2>
          <button onClick={onClose} className="p-1 rounded-full text-slate-500 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" aria-label="Đóng">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="overflow-y-auto pr-4 -mr-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
          {item.content ? (
            <div className="text-slate-700 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: item.content }} />
          ) : (
            <p className="text-slate-500 italic">Mục này không có nội dung chi tiết, vui lòng xem các mục con.</p>
          )}
        </div>
      </div>
      <style>{`@keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } } .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }`}</style>
    </div>
  );
};

// --- Main App Component ---

type AppState = 'setup' | 'quiz' | 'results' | 'history' | 'decuong' | 'phimtat';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('setup');
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string | string[]>>({});
  const [totalTime, setTotalTime] = useState(0);
  const [quizMode, setQuizMode] = useState<'practice' | 'exam'>('practice');
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [syllabusScrollTarget, setSyllabusScrollTarget] = useState<string | null>(null);
  const [syllabusDetailId, setSyllabusDetailId] = useState<string | null>(null);

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
    setSyllabusDetailId(syllabusId);
  }, []);
  const handleCloseSyllabusDetail = useCallback(() => {
    setSyllabusDetailId(null);
  }, []);

  const renderContent = () => {
    switch(appState) {
      case 'setup':
        return <SetupScreen onStartQuiz={handleStartQuiz} onViewHistory={handleViewHistory} onStartIncorrectQuiz={handleStartIncorrectQuiz} onViewDeCuong={handleViewDeCuong} onViewPhimTat={handleViewPhimTat} />;
      case 'quiz':
        return <QuizScreen questions={quizQuestions} onFinish={handleFinishQuiz} mode={quizMode} onViewInSyllabus={handleViewInSyllabus} />;
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
      {syllabusDetailId && <SyllabusDetailModal syllabusId={syllabusDetailId} onClose={handleCloseSyllabusDetail} />}
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
