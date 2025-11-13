import { getRawHistory } from './historyManager';
import { analyzeWeaknesses } from './analysisManager';
import { questionBank } from './constants';
import type { Question } from './types';

const INCORRECT_QUESTIONS_KEY = 'incorrectQuestionIds';

export const getIncorrectQuestionIds = (): number[] => {
  try {
    const ids = localStorage.getItem(INCORRECT_QUESTIONS_KEY);
    return ids ? JSON.parse(ids) : [];
  } catch (error) {
    console.error('Error reading incorrect questions from localStorage:', error);
    return [];
  }
};

export const addIncorrectQuestionIds = (idsToAdd: number[]): void => {
  try {
    const currentIds = getIncorrectQuestionIds();
    const idSet = new Set([...currentIds, ...idsToAdd]);
    const updatedIds = Array.from(idSet);
    localStorage.setItem(INCORRECT_QUESTIONS_KEY, JSON.stringify(updatedIds));
  } catch (error) {
    console.error('Error adding incorrect questions to localStorage:', error);
  }
};

export const removeCorrectlyAnsweredIds = (idsToRemove: number[]): void => {
  try {
    const currentIds = getIncorrectQuestionIds();
    const updatedIds = currentIds.filter(id => !idsToRemove.includes(id));
    localStorage.setItem(INCORRECT_QUESTIONS_KEY, JSON.stringify(updatedIds));
  } catch (error) {
    console.error('Error removing questions from localStorage:', error);
  }
};

export const getIncorrectQuestionCount = (): number => {
    return getIncorrectQuestionIds().length;
}

export const generateSmartReviewQuiz = async (numQuestions = 20): Promise<Question[]> => {
    const incorrectIds = getIncorrectQuestionIds();
    const history = getRawHistory();
    const weaknesses = analyzeWeaknesses(history);

    const incorrectQuestions = questionBank.filter(q => incorrectIds.includes(q.id));
    
    let weakSpotQuestions: Question[] = [];
    if (weaknesses.length > 0) {
        // Get questions from the top 3 weakest subcategories, excluding ones already in the incorrect list
        const weakestSubCategories = weaknesses.slice(0, 3).map(w => w.subCategory);
        weakSpotQuestions = questionBank.filter(q => 
            weakestSubCategories.includes(q.subCategory) && !incorrectIds.includes(q.id)
        );
    }
    
    // Prioritize incorrect questions, then add questions from weak spots
    const combinedPool = [...incorrectQuestions, ...weakSpotQuestions];
    
    // Remove duplicates
    const uniquePool = Array.from(new Set(combinedPool.map(q => q.id)))
                            .map(id => combinedPool.find(q => q.id === id)!);

    // Shuffle and slice
    const shuffled = uniquePool.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
};
