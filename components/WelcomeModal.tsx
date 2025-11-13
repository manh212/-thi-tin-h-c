import React, { useEffect, useRef } from 'react';
import Button from './Button';

interface WelcomeModalProps {
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const focusableElement = modalRef.current?.querySelector('button');
    focusableElement?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 text-center animate-fade-in-up"
      >
        <h2 id="welcome-modal-title" className="text-3xl font-bold text-blue-600 mb-4">
          Chào mừng bạn!
        </h2>
        <p className="text-slate-600 mb-6 text-lg leading-relaxed">
          Đây là <strong>Trình Luyện Thi Tin Học Toàn Diện</strong>, công cụ được thiết kế để giúp bạn chinh phục kỳ thi sắp tới một cách tự tin nhất.
        </p>
        <p className="text-slate-600 mb-6">
          Với ngân hàng câu hỏi phong phú, các chế độ luyện tập đa dạng và thống kê chi tiết, bạn có thể dễ dàng xác định điểm mạnh, điểm yếu và theo dõi sự tiến bộ của mình.
        </p>
        <p className="text-slate-700 font-semibold mb-8 text-lg bg-blue-50 p-3 rounded-lg border border-blue-200">
          Ứng dụng này được phát triển với tất cả tâm huyết bởi <span className="text-blue-700">Mạnh</span>.
        </p>
        <Button onClick={onClose}>
          Bắt đầu ôn luyện!
        </Button>
      </div>
      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default WelcomeModal;
