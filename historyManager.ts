import type { QuizResult, AggregatedHistory } from './types';

const HISTORY_KEY = 'quizHistory';
const AGGREGATED_HISTORY_KEY = 'aggregatedQuizHistory';
const HISTORY_LIMIT = 10;

export const getHistory = (): QuizResult[] => {
  try {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error reading history from localStorage:', error);
    return [];
  }
};

export const getAggregatedHistory = (): AggregatedHistory => {
    try {
        const history = localStorage.getItem(AGGREGATED_HISTORY_KEY);
        return history ? JSON.parse(history) : { batches: [] };
    } catch (error) {
        console.error('Error reading aggregated history from localStorage:', error);
        return { batches: [] };
    }
}

export const saveResult = (result: QuizResult): void => {
  try {
    let history = getHistory();
    history.push(result);

    if (history.length >= HISTORY_LIMIT) {
        const currentAggregatedHistory = getAggregatedHistory();
        const batchToAggregate = history.slice(0, HISTORY_LIMIT);

        const totalPercentage = batchToAggregate.reduce((acc, res) => acc + res.percentage, 0);
        const averagePercentage = totalPercentage / batchToAggregate.length;
        const highScore = Math.max(...batchToAggregate.map(res => res.percentage));

        const newBatch = {
            timestamp: Date.now(),
            averagePercentage: parseFloat(averagePercentage.toFixed(1)),
            totalQuizzes: batchToAggregate.length,
            highScore: parseFloat(highScore.toFixed(1))
        };
        
        currentAggregatedHistory.batches.push(newBatch);
        localStorage.setItem(AGGREGATED_HISTORY_KEY, JSON.stringify(currentAggregatedHistory));
        
        history = []; 
    }
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

  } catch (error) {
    console.error('Error saving history to localStorage:', error);
  }
};

export const calculateHighScore = (history: QuizResult[]) => {
    if (history.length === 0) {
        return { highScore: 0, count: 0 };
    }
    const highScore = Math.max(...history.map(r => r.percentage));
    const count = history.filter(r => r.percentage === highScore).length;
    return { highScore, count };
}
