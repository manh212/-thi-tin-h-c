
import React, { useState, useEffect, useRef } from 'react';
import { getAggregatedHistory } from '../historyManager';
import type { AggregatedHistory } from '../types';
import Button from './Button';

interface HistoryScreenProps {
  onBack: () => void;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ onBack }) => {
    const [history, setHistory] = useState<AggregatedHistory>({ batches: [] });
    const mainHeadingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        setHistory(getAggregatedHistory());
        mainHeadingRef.current?.focus();
    }, []);

    return (
        <div className="space-y-8">
            <header className="text-center">
                <h2 ref={mainHeadingRef} tabIndex={-1} className="text-3xl font-bold text-gray-800 focus:outline-none">Lịch Sử Tổng Hợp</h2>
                <p className="text-slate-600 mt-2">Tổng kết kết quả của các chuỗi 10 bài làm.</p>
            </header>

            {history.batches.length === 0 ? (
                <p className="text-center text-slate-500 text-lg">Chưa có chuỗi bài làm nào được hoàn thành.</p>
            ) : (
                <div className="space-y-4">
                    {history.batches.slice().reverse().map((batch, index) => (
                        <div key={batch.timestamp} className="p-4 border rounded-lg bg-slate-50 border-slate-200">
                             <h3 className="font-semibold text-lg text-blue-700">Chuỗi #{history.batches.length - index}</h3>
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
