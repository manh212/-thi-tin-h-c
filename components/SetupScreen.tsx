import React, { useState, useMemo, useEffect } from 'react';
import type { QuizSettings, Question } from '../types';
import { CATEGORIES, SUBCATEGORIES, questionBank } from '../constants';
import Button from './Button';
import { getIncorrectQuestionCount, generateSmartReviewQuiz } from '../incorrectQuestionsManager';

interface SetupScreenProps {
  onStartQuiz: (settings: QuizSettings) => void;
  onViewHistory: () => void;
  onStartIncorrectQuiz: (questions: Question[]) => void;
  onViewDeCuong: () => void;
  onViewPhimTat: () => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStartQuiz, onViewHistory, onStartIncorrectQuiz, onViewDeCuong, onViewPhimTat }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [numQuestions, setNumQuestions] = useState(20);
  const [mode, setMode] = useState<'practice' | 'exam'>('practice');
  const [skillType, setSkillType] = useState<'all' | 'theory' | 'practice'>('all');
  const [incorrectCount, setIncorrectCount] = useState(0);

  useEffect(() => {
    setIncorrectCount(getIncorrectQuestionCount());
  }, []);

  const handleCategoryChange = (category: string) => {
    const isSelected = selectedCategories.includes(category);
    if (isSelected) {
      setSelectedCategories(prev => prev.filter(c => c !== category));
      // Deselect all subcategories of this category
      setSelectedSubCategories(prev => prev.filter(sc => !SUBCATEGORIES[category].includes(sc)));
    } else {
      setSelectedCategories(prev => [...prev, category]);
    }
  };

  const handleSubCategoryChange = (subCategory: string) => {
    setSelectedSubCategories(prev =>
      prev.includes(subCategory)
        ? prev.filter(sc => sc !== subCategory)
        : [...prev, subCategory]
    );
  };

  const maxQuestions = useMemo(() => {
    let availableQuestions = questionBank;
    if (selectedCategories.length > 0) {
        availableQuestions = availableQuestions.filter(q => selectedCategories.includes(q.category));
    }
    if (selectedSubCategories.length > 0) {
        availableQuestions = availableQuestions.filter(q => selectedSubCategories.includes(q.subCategory));
    }
    if (skillType !== 'all') {
        availableQuestions = availableQuestions.filter(q => q.skillType === skillType);
    }
    return availableQuestions.length;
  }, [selectedCategories, selectedSubCategories, skillType]);

  const handleStart = () => {
    const finalNumQuestions = Math.min(numQuestions, maxQuestions);
    if (finalNumQuestions === 0) {
      alert("Không có câu hỏi nào cho các chủ đề đã chọn. Vui lòng chọn lại.");
      return;
    }
    onStartQuiz({ categories: selectedCategories, subCategories: selectedSubCategories, numQuestions: finalNumQuestions, mode, skillType });
  };
  
  const handleStartSmartReview = async () => {
      const smartQuizQuestions = await generateSmartReviewQuiz();
      onStartIncorrectQuiz(smartQuizQuestions);
  };

  return (
    <div className="space-y-8">
       <div>
        <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 mb-4">Công Cụ Hữu Ích</h2>
         <div className="flex flex-wrap gap-4">
            <Button onClick={onViewDeCuong} variant="secondary">📚 Đề Cương Ôn Tập</Button>
            <Button onClick={onViewPhimTat} variant="secondary">⌨️ Tra Cứu Phím Tắt</Button>
         </div>
       </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 mb-4">Bước 1: Tùy Chỉnh Bài Làm</h2>
        <div className="space-y-6">
            <fieldset>
                 <legend className="text-lg font-medium text-slate-700 mb-2">Chế độ làm bài</legend>
                 <div className="flex gap-4">
                     <label className="flex items-center p-3 w-1/2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-blue-100 hover:border-blue-300 transition-colors has-[:checked]:bg-blue-100 has-[:checked]:border-blue-400">
                         <input type="radio" name="mode" value="practice" checked={mode === 'practice'} onChange={() => setMode('practice')} className="h-5 w-5 text-blue-600 focus:ring-blue-500"/>
                         <div className="ml-3">
                             <span className="font-semibold text-slate-800">Luyện Tập</span>
                             <p className="text-sm text-slate-600">Phản hồi ngay sau mỗi câu.</p>
                         </div>
                     </label>
                     <label className="flex items-center p-3 w-1/2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-blue-100 hover:border-blue-300 transition-colors has-[:checked]:bg-blue-100 has-[:checked]:border-blue-400">
                         <input type="radio" name="mode" value="exam" checked={mode === 'exam'} onChange={() => setMode('exam')} className="h-5 w-5 text-blue-600 focus:ring-blue-500"/>
                          <div className="ml-3">
                             <span className="font-semibold text-slate-800">Thi Thử</span>
                             <p className="text-sm text-slate-600">Xem kết quả khi hoàn thành.</p>
                         </div>
                     </label>
                 </div>
            </fieldset>
            <fieldset>
                 <legend className="text-lg font-medium text-slate-700 mb-2">Loại câu hỏi</legend>
                 <div className="flex flex-wrap gap-4">
                     <label className="flex items-center p-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-blue-100 has-[:checked]:bg-blue-100 has-[:checked]:border-blue-400"><input type="radio" name="skillType" value="all" checked={skillType === 'all'} onChange={() => setSkillType('all')} className="h-4 w-4 text-blue-600 focus:ring-blue-500 mr-2"/> Tất cả</label>
                     <label className="flex items-center p-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-blue-100 has-[:checked]:bg-blue-100 has-[:checked]:border-blue-400"><input type="radio" name="skillType" value="theory" checked={skillType === 'theory'} onChange={() => setSkillType('theory')} className="h-4 w-4 text-blue-600 focus:ring-blue-500 mr-2"/> Lý thuyết</label>
                     <label className="flex items-center p-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-blue-100 has-[:checked]:bg-blue-100 has-[:checked]:border-blue-400"><input type="radio" name="skillType" value="practice" checked={skillType === 'practice'} onChange={() => setSkillType('practice')} className="h-4 w-4 text-blue-600 focus:ring-blue-500 mr-2"/> Thực hành</label>
                 </div>
            </fieldset>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 mb-4">Bước 2: Chọn Chủ Đề Ôn Tập</h2>
        <fieldset>
          <legend className="text-slate-600 mb-4">Chọn chủ đề lớn, sau đó chọn mục con nếu muốn. Để trống để chọn tất cả.</legend>
          <div className="space-y-4">
            {CATEGORIES.map(category => (
              <div key={category} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <label className="flex items-center cursor-pointer font-semibold text-slate-800">
                  <input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => handleCategoryChange(category)} className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
                  <span className="ml-3">{category}</span>
                </label>
                {selectedCategories.includes(category) && SUBCATEGORIES[category].length > 1 && (
                    <div className="mt-3 ml-4 pl-4 border-l-2 border-slate-300 space-y-2">
                        {SUBCATEGORIES[category].map(subCategory => (
                             <label key={subCategory} className="flex items-center cursor-pointer text-sm text-slate-700">
                                <input type="checkbox" value={subCategory} checked={selectedSubCategories.includes(subCategory)} onChange={() => handleSubCategoryChange(subCategory)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"/>
                                <span className="ml-2">{subCategory}</span>
                             </label>
                        ))}
                    </div>
                )}
              </div>
            ))}
          </div>
        </fieldset>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-700 border-b-2 border-blue-500 pb-2 mb-4">Bước 3: Chọn Số Lượng Câu Hỏi</h2>
        <div className="max-w-xs">
          <label htmlFor="num-questions" className="block text-slate-600 mb-2">
            Nhập số câu hỏi (tối đa: {maxQuestions}):
          </label>
          <input type="number" id="num-questions" value={numQuestions} min="1" max={maxQuestions} onChange={(e) => setNumQuestions(Math.max(1, Math.min(maxQuestions, parseInt(e.target.value, 10) || 1)))} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
        </div>
      </div>

      <div className="text-center pt-4 flex flex-col sm:flex-row justify-center items-center gap-4 flex-wrap">
        <Button onClick={handleStart} disabled={maxQuestions === 0}>
          Bắt Đầu
        </Button>
        <Button onClick={handleStartSmartReview} disabled={incorrectCount === 0} variant="danger">
            Ôn tập thông minh ({incorrectCount} câu sai)
        </Button>
        <Button onClick={onViewHistory} variant="secondary">
          Lịch Sử
        </Button>
      </div>
    </div>
  );
};

export default SetupScreen;
