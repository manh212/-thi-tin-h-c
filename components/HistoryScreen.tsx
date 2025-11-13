import React, { useState, useEffect, useRef, useMemo } from 'react';
import { getAggregatedHistory, getRawHistory } from '../historyManager';
import { analyzeWeaknesses } from '../analysisManager';
import type { AggregatedHistory, QuizResult } from '../types';
import Button from './Button';

interface HistoryScreenProps {
  onBack: () => void;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ onBack }) => {
    const [aggregatedHistory, setAggregatedHistory] = useState<AggregatedHistory>({ batches: [] });
    const [rawHistory, setRawHistory] = useState<QuizResult[]>([]);
    const mainHeadingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        setAggregatedHistory(getAggregatedHistory());
        setRawHistory(getRawHistory());
        mainHeadingRef.current?.focus();
    }, []);

    const weaknessAnalysis = useMemo(() => {
        if (rawHistory.length === 0) return null;
        return analyzeWeaknesses(rawHistory);
    }, [rawHistory]);

    return (
        <div className="space-y-8">
            <header className="text-center">
                <h2 ref={mainHeadingRef} tabIndex={-1} className="text-3xl font-bold text-gray-800 focus:outline-none">Lịch Sử Tổng Hợp</h2>
                <p className="text-slate-600 mt-2">Tổng kết kết quả và phân tích điểm yếu qua các bài làm.</p>
            </header>

            {weaknessAnalysis && weaknessAnalysis.length > 0 && (
                 <section aria-labelledby="weakness-heading" className="p-6 border-2 rounded-lg bg-red-50 border-red-200">
                    <h3 id="weakness-heading" className="text-xl font-semibold text-gray-700 mb-4">Phân Tích Điểm Yếu</h3>
                    <p className="text-slate-700 mb-2">Dựa trên toàn bộ lịch sử làm bài, đây là những chủ đề bạn cần ôn tập kỹ hơn:</p>
                    <ul className="list-disc list-inside space-y-1 text-red-800 font-medium">
                       {weaknessAnalysis.slice(0, 3).map(item => (
                           <li key={item.subCategory}>
                               {item.subCategory} <span className="font-normal text-slate-600">({item.correctPercentage.toFixed(1)}% đúng)</span>
                           </li>
                       ))}
                    </ul>
                </section>
            )}

            {aggregatedHistory.batches.length === 0 ? (
                <p className="text-center text-slate-500 text-lg">Chưa có chuỗi bài làm nào được hoàn thành để tổng kết.</p>
            ) : (
                <div className="space-y-4">
                    {aggregatedHistory.batches.slice().reverse().map((batch, index) => (
                        <div key={batch.timestamp} className="p-4 border rounded-lg bg-slate-50 border-slate-200">
                             <h3 className="font-semibold text-lg text-blue-700">Chuỗi #{aggregatedHistory.batches.length - index}</h3>
                             <p className="text-sm text-slate-500 mb-2">Hoàn thành vào: {new Date(batch.timestamp).toLocaleString('vi-VN')}</p>
                             <ul className="list-disc list-inside text-slate-700">
                                <li><strong>Điểm trung bình:</strong> {batch.averagePercentage}%</li>
                                <li><strong>Điểm cao nhất đạt được:</strong> {batch.highScore}%</li>
                                <li><strong>Số bài đã làm:</strong> {batch.totalQuizzes}</li>
                             </ul>
                        </div>
                    ))}
                </div>
            )}

            <div className="text-center pt-4">
                <Button onClick={onBack} variant="primary">
                  Quay Lại
                </Button>
            </div>
        </div>
    );
};

export default HistoryScreen;
