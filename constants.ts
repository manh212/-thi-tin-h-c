import type { Question } from './types';
import { screenReaderQuestions } from './data/screenReader';
import { audioProcessingQuestions } from './data/audioProcessing';
import { conversionQuestions } from './data/conversion';
import { windowsQuestions } from './data/windows';
import { wordQuestions } from './data/word';
import { excelQuestions } from './data/excel';
import { internetQuestions } from './data/internet';
import { movieMakerQuestions } from './data/movieMaker';
import { touchscreenPhoneQuestions } from './data/touchscreenPhone';
import { situationalQuestions } from './data/situational';
import { webAccessibilityQuestions } from './data/webAccessibility';

export const questionBank: Question[] = [
    ...screenReaderQuestions,
    ...audioProcessingQuestions,
    ...conversionQuestions,
    ...windowsQuestions,
    ...wordQuestions,
    ...excelQuestions,
    ...internetQuestions,
    ...movieMakerQuestions,
    ...touchscreenPhoneQuestions,
    ...situationalQuestions,
    ...webAccessibilityQuestions,
];

export const CATEGORIES = [...new Set(questionBank.map(q => q.category))];