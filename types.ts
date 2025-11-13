export interface Question {
  id: number;
  category: string;
  type: 'mcq' | 'tf';
  question: string;
  options?: string[];
  answer: string | boolean;
  explanation?: string;
}

export interface QuizSettings {
  categories: string[];
  numQuestions: number;
  mode: 'practice' | 'exam';
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  totalTime: number;
  timestamp: number;
}

export interface AggregatedHistory {
    batches: {
        timestamp: number;
        averagePercentage: number;
        totalQuizzes: number;
        highScore: number;
    }[];
}