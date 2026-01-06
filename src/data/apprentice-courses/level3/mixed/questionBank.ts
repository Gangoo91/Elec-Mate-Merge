// Level 3 Mixed Question Bank - Combined from All Modules
// Combines questions from all 7 modules for comprehensive practice

import { Question as Module1Question, module1Questions } from '../module1/questionBank';
import { Question as Module2Question, module2Questions } from '../module2/questionBank';
import { Question as Module3Question, module3Questions } from '../module3/questionBank';
import { Question as Module4Question, module4Questions } from '../module4/questionBank';
import { Question as Module5Question, module5Questions } from '../module5/questionBank';
import { Question as Module6Question, module6Questions } from '../module6/questionBank';
import { Question as Module7Question, module7Questions } from '../module7/questionBank';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section?: string;
  difficulty?: 'basic' | 'intermediate' | 'advanced';
  module?: string;
}

// Add module identifier to each question
const addModuleTag = (questions: any[], moduleTag: string): Question[] => {
  return questions.map(q => ({
    ...q,
    module: moduleTag
  }));
};

// Combine all module questions with module identifiers
const module1WithTag = addModuleTag(module1Questions, 'Module 1: Health & Safety');
const module2WithTag = addModuleTag(module2Questions, 'Module 2: Environmental Technologies');
const module3WithTag = addModuleTag(module3Questions, 'Module 3: Electrical Science');
const module4WithTag = addModuleTag(module4Questions, 'Module 4: Fault Diagnosis');
const module5WithTag = addModuleTag(module5Questions, 'Module 5: Inspection & Testing');
const module6WithTag = addModuleTag(module6Questions, 'Module 6: Systems Design');
const module7WithTag = addModuleTag(module7Questions, 'Module 7: Career Development');

// Combined question bank with unique IDs
export const mixedQuestions: Question[] = [
  ...module1WithTag.map((q, i) => ({ ...q, id: i + 1 })),
  ...module2WithTag.map((q, i) => ({ ...q, id: i + 201 })),
  ...module3WithTag.map((q, i) => ({ ...q, id: i + 401 })),
  ...module4WithTag.map((q, i) => ({ ...q, id: i + 601 })),
  ...module5WithTag.map((q, i) => ({ ...q, id: i + 801 })),
  ...module6WithTag.map((q, i) => ({ ...q, id: i + 1001 })),
  ...module7WithTag.map((q, i) => ({ ...q, id: i + 1201 }))
];

// Total: 1,400 questions from all 7 modules

// Helper function to get random questions for mock exams
// Ensures balanced distribution across modules
export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...mixedQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Helper function to get balanced random questions (equal from each module)
export const getBalancedRandomQuestions = (count: number): Question[] => {
  const questionsPerModule = Math.floor(count / 7);
  const remainder = count % 7;

  const selected: Question[] = [];

  // Get questions from each module
  const modules = [
    module1WithTag,
    module2WithTag,
    module3WithTag,
    module4WithTag,
    module5WithTag,
    module6WithTag,
    module7WithTag
  ];

  modules.forEach((moduleQuestions, index) => {
    const shuffled = [...moduleQuestions].sort(() => Math.random() - 0.5);
    // Add extra question from first few modules to handle remainder
    const numToSelect = questionsPerModule + (index < remainder ? 1 : 0);
    selected.push(...shuffled.slice(0, numToSelect));
  });

  // Shuffle the final selection
  return selected.sort(() => Math.random() - 0.5);
};

// Helper function to get questions by module
export const getQuestionsByModule = (moduleName: string): Question[] => {
  return mixedQuestions.filter(q => q.module === moduleName);
};

// Helper function to get questions by difficulty across all modules
export const getQuestionsByDifficulty = (difficulty: 'basic' | 'intermediate' | 'advanced'): Question[] => {
  return mixedQuestions.filter(q => q.difficulty === difficulty);
};

// Helper function to get random questions with minimum from each difficulty level
export const getDifficultyBalancedQuestions = (count: number): Question[] => {
  // Aim for approximately: 30% basic, 50% intermediate, 20% advanced
  const basicCount = Math.floor(count * 0.3);
  const intermediateCount = Math.floor(count * 0.5);
  const advancedCount = count - basicCount - intermediateCount;

  const basicQuestions = mixedQuestions.filter(q => q.difficulty === 'basic');
  const intermediateQuestions = mixedQuestions.filter(q => q.difficulty === 'intermediate');
  const advancedQuestions = mixedQuestions.filter(q => q.difficulty === 'advanced');

  const selected: Question[] = [
    ...basicQuestions.sort(() => Math.random() - 0.5).slice(0, basicCount),
    ...intermediateQuestions.sort(() => Math.random() - 0.5).slice(0, intermediateCount),
    ...advancedQuestions.sort(() => Math.random() - 0.5).slice(0, advancedCount)
  ];

  // Shuffle the final selection
  return selected.sort(() => Math.random() - 0.5);
};

// Get statistics about the question bank
export const getQuestionBankStats = () => {
  const stats = {
    total: mixedQuestions.length,
    byModule: {
      'Module 1: Health & Safety': module1Questions.length,
      'Module 2: Environmental Technologies': module2Questions.length,
      'Module 3: Electrical Science': module3Questions.length,
      'Module 4: Fault Diagnosis': module4Questions.length,
      'Module 5: Inspection & Testing': module5Questions.length,
      'Module 6: Systems Design': module6Questions.length,
      'Module 7: Career Development': module7Questions.length
    },
    byDifficulty: {
      basic: mixedQuestions.filter(q => q.difficulty === 'basic').length,
      intermediate: mixedQuestions.filter(q => q.difficulty === 'intermediate').length,
      advanced: mixedQuestions.filter(q => q.difficulty === 'advanced').length
    }
  };
  return stats;
};

export default mixedQuestions;
