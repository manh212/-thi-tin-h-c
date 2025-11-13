
import React, { useState, useMemo } from 'react';
import type { QuizSettings } from '../types';
import { CATEGORIES, questionBank } from '../constants';
import Button from './Button';

interface SetupScreenProps {
  onStartQuiz: (settings: QuizSettings) => void;
  onViewHistory: () => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStartQuiz, onViewHistory }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [numQuestions, setNumQuestions] = useState(20);

  const maxQuestions = useMemo(() => {
    if (selectedCategories.length === 0) {
      return questionBank.length;
    }
    return questionBank.filter(q => selectedCategories.includes(q.category)).length;
  }, [selectedCategories]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleStart = () => {
    const finalNumQuestions = Math.min(numQuestions, maxQuestions);
    if (finalNumQuestions === 0) {
      alert("Không có câu hỏi nào cho các chủ đề đã chọn. Vui lòng chọn lại.");
      return;
    }
    onStartQuiz({ categories: selectedCategories, numQuestions: finalNumQuestions });
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 mb-4">Bước 1: Chọn Chủ Đề Ôn Tập</h2>
        <fieldset>
          <legend className="text-slate-600 mb-4">Chọn một hoặc nhiều chủ đề. Để trống để chọn tất cả.</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map(category => (
              <label key={category} className="flex items-center p-3 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-blue-100 hover:border-blue-300 transition-colors has-[:checked]:bg-blue-100 has-[:checked]:border-blue-400">
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 text-slate-700">{category}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 mb-4">Bước 2: Chọn Số Lượng Câu Hỏi</h2>
        <div className="max-w-xs">
          <label htmlFor="num-questions" className="block text-slate-600 mb-2">
            Nhập số câu hỏi bạn muốn làm (tối đa: {maxQuestions}):
          </label>
          <input
            type="number"
            id="num-questions"
            value={numQuestions}
            min="1"
            max={maxQuestions}
            onChange={(e) => setNumQuestions(Math.max(1, Math.min(maxQuestions, parseInt(e.target.value, 10) || 1)))}
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="text-center pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
        <Button onClick={handleStart} disabled={maxQuestions === 0}>
          Bắt Đầu Luyện Tập
        </Button>
        <Button onClick={onViewHistory} variant="secondary">
          Xem Lịch Sử Tổng Hợp
        </Button>
      </div>
    </div>
  );
};

export default SetupScreen;
