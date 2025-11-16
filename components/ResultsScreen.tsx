
import React, { useMemo, useEffect, useRef, useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import type { Question } from '../types';
import Button from './Button';
import ResultItem from './ResultItem';

interface ResultsScreenProps {
  questions: Question[];
  userAnswers: Record<number, string>;
  totalTime: number;
  onRestart: () => void;
  apiKey: string | null;
}

const LoadingSpinner = () => (
    <div className="flex flex-col items-center space-y-2 text-gray-600">
        <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-lg">AI đang phân tích bài làm của bạn...</span>
        <span className="text-sm text-slate-500">Việc này có thể mất một vài giây.</span>
    </div>
);

const ResultsScreen: React.FC<ResultsScreenProps> = ({ questions, userAnswers, totalTime, onRestart, apiKey }) => {
  const mainHeadingRef = useRef<HTMLHeadingElement>(null);
  const [showOnlyIncorrect, setShowOnlyIncorrect] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [aiAssessment, setAiAssessment] = useState('');
  const [error, setError] = useState<string | null>(null);

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
  
  const handleGetAIAssessment = useCallback(async () => {
    if (!apiKey) {
        setError('Cần có API Key để sử dụng tính năng này.');
        return;
    }
    
    setIsLoading(true);
    setError(null);
    setAiAssessment('');

    const quizData = questions.map((q, index) => ({
        question: q.question,
        category: q.category,
        user_answer: userAnswers[index] || "Chưa trả lời",
        correct_answer: String(q.answer),
        explanation: q.explanation || "Không có giải thích."
    }));

    const prompt = `Bạn là một người thầy giáo tin học uyên thâm, tận tâm và giàu kinh nghiệm. Nhiệm vụ của bạn là phân tích kết quả bài làm của một học viên và đưa ra những nhận xét, lời khuyên chi tiết, mang tính xây dựng.

Hãy dựa vào toàn bộ dữ liệu bài làm dưới đây (định dạng JSON):
${JSON.stringify({
    total_questions: questions.length,
    correct_answers: score,
    percentage: percentage.toFixed(1),
    results: quizData
}, null, 2)}

Dựa trên dữ liệu trên, hãy thực hiện các yêu cầu sau:
1.  **Đánh giá tổng quan:** Bắt đầu bằng một đoạn nhận xét chung về kết quả bài làm. Hãy nhìn vào tỷ lệ câu đúng, các chủ đề học viên làm sai và đưa ra nhận định về điểm mạnh, điểm yếu chính của họ.
2.  **Phân tích các câu sai:**
    *   Đi vào chi tiết TỪNG CÂU TRẢ LỜI SAI.
    *   Với mỗi câu sai, hãy giải thích tại sao đáp án của học viên chưa chính xác và tại sao đáp án đúng lại là lựa chọn tốt nhất. Hãy giải thích sâu hơn, có thể liên hệ kiến thức một cách hệ thống thay vì chỉ lặp lại phần giải thích có sẵn.
3.  **Đưa ra lời khuyên chiến lược:** Dựa trên những điểm yếu đã phân tích, hãy gợi ý cho học viên một kế hoạch ôn tập cụ thể. Ví dụ: "Bạn có vẻ chưa vững về các phím tắt trong Excel, hãy tập trung ôn luyện phần đó" hoặc "Để hiểu rõ hơn về tính năng bảng biểu trong Word, bạn nên thực hành tạo và chỉnh sửa một bảng biểu thực tế."
4.  **Kết luận và động viên:** Kết thúc bài đánh giá bằng một lời động viên chân thành, khích lệ học viên tiếp tục cố gắng.

**QUAN TRỌNG:**
-   Hãy sử dụng giọng văn của một người thầy: gần gũi, rõ ràng, mang tính định hướng và động viên, không quá máy móc.
-   Sử dụng Markdown để định dạng câu trả lời cho dễ đọc, bao gồm tiêu đề, danh sách (gạch đầu dòng), và in đậm các thuật ngữ quan trọng.`;

    try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        setAiAssessment(response.text);
    } catch (e) {
        console.error(e);
        setError('Đã có lỗi xảy ra khi nhận đánh giá từ AI. Vui lòng kiểm tra lại API Key và thử lại.');
    } finally {
        setIsLoading(false);
    }
  }, [apiKey, questions, userAnswers, score, percentage]);

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
        <div className="mt-6">
            <Button onClick={handleGetAIAssessment} disabled={!apiKey || isLoading}>
                {isLoading ? 'Đang xử lý...' : 'Nhận Đánh Giá từ AI'}
            </Button>
            {!apiKey && <p className="text-sm text-red-600 mt-2">Cần API Key để sử dụng tính năng này.</p>}
        </div>
      </section>

      {(isLoading || error || aiAssessment) && (
        <section aria-labelledby="ai-assessment-heading" className="p-6 border rounded-lg bg-purple-50 border-purple-200">
          <h3 id="ai-assessment-heading" className="text-2xl font-semibold text-purple-800 mb-4 text-center">
              Phân Tích Chuyên Sâu từ AI
          </h3>
          {isLoading && <LoadingSpinner />}
          {error && <p className="text-red-600 text-center">{error}</p>}
          {aiAssessment && (
             <div className="prose prose-slate max-w-none">
                 <pre className="whitespace-pre-wrap font-sans text-base text-gray-800 leading-relaxed bg-white p-4 rounded-md overflow-x-auto">{aiAssessment}</pre>
             </div>
          )}
        </section>
      )}

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

      <div className="text-center pt-4">
        <Button onClick={onRestart} variant="primary">
          Luyện Tập Lại
        </Button>
      </div>
    </div>
  );
};

export default ResultsScreen;
