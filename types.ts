export interface Question {
  id: number;
  category: string;
  subCategory: string;
  skillType: 'theory' | 'practice';
  syllabusId: string;
  type: 'mcq' | 'tf' | 'sequencing';
  question: string;
  options?: string[];
  answer: string | boolean | string[];
  explanation?: string;
}

export interface QuizSettings {
  categories: string[];
  subCategories: string[];
  numQuestions: number;
  mode: 'practice' | 'exam';
  skillType: 'all' | 'theory' | 'practice';
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  totalTime: number;
  timestamp: number;
  questionIds: number[];
  userAnswers: Record<number, string | string[]>;
}

export interface AggregatedHistory {
    batches: {
        timestamp: number;
        averagePercentage: number;
        totalQuizzes: number;
        highScore: number;
    }[];
}

export interface SyllabusContent {
    id: string;
    level: number;
    title: string;
    content?: string;
    children?: SyllabusContent[];
}

export interface Hotkey {
    app: string;
    keys: string;
    description: string;
}
