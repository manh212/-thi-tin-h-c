import type { QuizResult, Question } from './types';
import { questionBank } from './constants';

interface SubCategoryStat {
    subCategory: string;
    correct: number;
    total: number;
    correctPercentage: number;
}

export const analyzeWeaknesses = (history: QuizResult[]): SubCategoryStat[] => {
    if (!history || history.length === 0) {
        return [];
    }

    const stats: Record<string, { correct: number; total: number }> = {};

    history.forEach(result => {
        result.questionIds.forEach((qId, index) => {
            const question = questionBank.find(q => q.id === qId);
            if (!question) return;

            const subCategory = question.subCategory;
            if (!stats[subCategory]) {
                stats[subCategory] = { correct: 0, total: 0 };
            }

            stats[subCategory].total++;
            
            const userAnswer = result.userAnswers[index];
            const correctAnswer = question.answer;

            let isMatch = false;
            if(Array.isArray(correctAnswer)) {
                isMatch = JSON.stringify(correctAnswer) === JSON.stringify(userAnswer);
            } else {
                isMatch = (userAnswer as string)?.toLowerCase() === String(correctAnswer).toLowerCase();
            }

            if (isMatch) {
                stats[subCategory].correct++;
            }
        });
    });

    const analysisResult: SubCategoryStat[] = Object.entries(stats).map(([subCategory, data]) => ({
        subCategory,
        ...data,
        correctPercentage: data.total > 0 ? (data.correct / data.total) * 100 : 0,
    }));
    
    // Sort by lowest percentage, then by most questions answered
    analysisResult.sort((a, b) => {
        if (a.correctPercentage < b.correctPercentage) return -1;
        if (a.correctPercentage > b.correctPercentage) return 1;
        if (a.total > b.total) return -1;
        if (a.total < b.total) return 1;
        return 0;
    });

    return analysisResult;
};
