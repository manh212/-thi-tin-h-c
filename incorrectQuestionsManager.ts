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