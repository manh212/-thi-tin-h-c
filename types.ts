
export interface Question {
  category: string;
  type: 'mcq' | 'tf';
  question: string;
  options?: string[];
  answer: string | boolean;
  explanation?: string;
  syllabusRef?: string;
}

export interface QuizSettings {
  categories: string[];
  numQuestions: number;
}
