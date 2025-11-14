
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { allSyllabusContent } from '../syllabus/index';
import type { Question } from '../types';
import Button from './Button';

interface SyllabusModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question | null;
}

interface Message {
    role: 'user' | 'model';
    content: string;
}

const LoadingSpinner = () => (
    <div className="flex items-center space-x-2 text-gray-600">
        <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Gemini đang suy nghĩ để giải thích cho bạn...</span>
    </div>
);


const SyllabusModal: React.FC<SyllabusModalProps> = ({ isOpen, onClose, question }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const conversationEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<Chat | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [followUpInput, setFollowUpInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const relevantSyllabus = useMemo(() => {
    if (!question) return null;
    
    const normalizedCategory = question.category.toLowerCase();
    return allSyllabusContent.find(item => 
      item.title.toLowerCase().includes(normalizedCategory) || 
      normalizedCategory.includes(item.title.toLowerCase())
    ) || null;
  }, [question]);

  const scrollToBottom = () => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);
  
  const initializeChat = useCallback(async () => {
    if (!question) return;

    setIsLoading(true);
    setConversation([]);
    setError(null);
    chatRef.current = null;

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
        });
        chatRef.current = chat;
        
        const correctAnswerText = String(question.answer) === 'true' ? 'Đúng' : String(question.answer) === 'false' ? 'Sai' : question.answer;

        const initialPrompt = `Hãy là một gia sư tin học. Dựa vào **Tài liệu tham khảo** sau đây để giải thích ngắn gọn, súc tích và dễ hiểu tại sao đáp án cho câu hỏi này lại đúng. Tuyệt đối chỉ dùng tài liệu này làm cơ sở, không bịa thêm thông tin.

**Tài liệu tham khảo:**
---
${relevantSyllabus ? relevantSyllabus.content : "Không có tài liệu tham khảo."}
---

**Câu hỏi:** "${question.question}"
**Đáp án đúng:** "${correctAnswerText}"

Bắt đầu giải thích ngay.`;
        
        const response = await chat.sendMessage({ message: initialPrompt });

        setConversation([{ role: 'model', content: response.text }]);

    } catch (e) {
        console.error(e);
        setError('Rất tiếc, đã có lỗi xảy ra khi kết nối với Gemini. Vui lòng thử lại.');
    } finally {
        setIsLoading(false);
    }
  }, [question, relevantSyllabus]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      closeButtonRef.current?.focus();

      if (question) {
        initializeChat();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, question, onClose, initializeChat]);

  const handleFollowUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpInput.trim() || isReplying || isLoading || !chatRef.current) return;

    const userMessage: Message = { role: 'user', content: followUpInput };
    setConversation(prev => [...prev, userMessage]);
    setFollowUpInput('');
    setIsReplying(true);
    setError(null);

    try {
      const response = await chatRef.current.sendMessage({ message: followUpInput });
      const modelMessage: Message = { role: 'model', content: response.text };
      setConversation(prev => [...prev, modelMessage]);
    } catch (e) {
      console.error(e);
      setError('Không thể gửi câu hỏi của bạn. Vui lòng thử lại.');
      setConversation(prev => prev.slice(0, -1)); // Remove user message on failure
    } finally {
      setIsReplying(false);
    }
  };


  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="syllabus-title"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 id="syllabus-title" className="text-2xl font-bold text-gray-800">
            Ôn tập & Giải thích chi tiết
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-3xl font-light"
            aria-label="Đóng"
          >
            &times;
          </button>
        </header>
        <div className="p-6 overflow-y-auto space-y-8">
            {relevantSyllabus && (
              <section aria-labelledby="original-syllabus-section">
                <h3 id="original-syllabus-section" className="text-xl font-semibold text-blue-700 mb-3 border-b-2 border-blue-200 pb-2">
                  Nội dung ôn tập liên quan: {relevantSyllabus.title}
                </h3>
                <pre className="whitespace-pre-wrap font-sans text-base text-gray-700 leading-relaxed bg-slate-50 p-4 rounded-md max-h-48 overflow-y-auto">
                  {relevantSyllabus.content.trim()}
                </pre>
              </section>
            )}

            <section aria-labelledby="gemini-explanation-section">
                <h3 id="gemini-explanation-section" className="text-xl font-semibold text-purple-700 mb-3 border-b-2 border-purple-200 pb-2">
                  Trò chuyện với Gemini
                </h3>
                 <div className="space-y-4 min-h-[100px]">
                    {isLoading && <LoadingSpinner />}
                    {error && !isLoading && conversation.length === 0 && (
                        <div className="text-center">
                             <p className="text-red-600 mb-4">{error}</p>
                             <Button onClick={initializeChat} disabled={isLoading} className="px-4 py-2 text-base">
                                Thử lại
                             </Button>
                        </div>
                    )}
                    
                    {conversation.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-prose p-3 rounded-lg shadow-sm ${msg.role === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-slate-100 text-slate-800'}`}>
                                <pre className="whitespace-pre-wrap font-sans">{msg.content}</pre>
                            </div>
                        </div>
                    ))}
                    <div ref={conversationEndRef} />
                </div>
            </section>
        </div>
        <footer className="p-4 border-t border-gray-200 bg-slate-50 mt-auto">
             {!isLoading && (
                <form onSubmit={handleFollowUpSubmit} className="flex items-center gap-3">
                    <input
                        type="text"
                        value={followUpInput}
                        onChange={(e) => {
                          setFollowUpInput(e.target.value);
                          if(error) setError(null);
                        }}
                        placeholder={conversation.length > 0 ? "Hỏi thêm về câu trả lời này..." : "Chờ giải thích ban đầu để hỏi thêm"}
                        className="flex-grow p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
                        disabled={isReplying || isLoading || conversation.length === 0}
                        aria-label="Đặt câu hỏi thêm"
                    />
                    <Button type="submit" disabled={isReplying || isLoading || !followUpInput.trim()} className="px-5 py-3 text-base">
                        {isReplying ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'Gửi'}
                    </Button>
                </form>
            )}
             {error && <p className="text-red-600 text-sm mt-2 text-center">{error}</p>}
        </footer>
      </div>
    </div>
  );
};

export default SyllabusModal;
