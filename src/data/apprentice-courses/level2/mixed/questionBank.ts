// Level 2 Mixed Question Bank - 400 Questions from All Modules
// Comprehensive question bank covering all Level 2 electrical installation modules

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  topic: string;
  module: string;
}

// Import questions from all existing modules
import { module1Questions } from '../module1/questionBank';
import { module2QuestionBank } from '../module2/questionBank';
import { module3QuestionBank } from '../module3/questionBank';
import { module4QuestionBank } from '../module4/questionBank';
import { module5QuestionBank } from '../module5/questionBank';
import { module6QuestionBank } from '../module6/questionBank';
import { module7QuestionBank } from '../module7/questionBank';

// Transform Module 1 questions to match the standard interface
const transformModule1Questions = (questions: typeof module1Questions): Question[] => {
  return questions.slice(0, 55).map((q, index) => ({
    id: index + 1,
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation || "Answer explanation available in course materials.",
    section: "1.0",
    difficulty: index < 22 ? 'basic' as const : index < 44 ? 'intermediate' as const : 'advanced' as const,
    topic: "Health and Safety",
    module: "Module 1"
  }));
};

// Transform Module 6 questions to match the standard interface
const transformModule6Questions = (questions: typeof module6QuestionBank): Question[] => {
  return questions.slice(0, 60).map((q, index) => ({
    id: index + 55 + 1,
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation || "Answer explanation available in course materials.",
    section: q.section || "6.0",
    difficulty: q.difficulty,
    topic: q.topic || "Testing & Certification",
    module: "Module 6"
  }));
};

// Select questions from each module
const selectedModule1Questions = transformModule1Questions(module1Questions);
const selectedModule2Questions = module2QuestionBank.slice(0, 55).map((q, index) => ({
  ...q,
  id: index + 115 + 1,
  module: "Module 2"
}));
const selectedModule3Questions = module3QuestionBank.slice(0, 55).map((q, index) => ({
  ...q,
  id: index + 170 + 1,
  module: "Module 3"
}));
const selectedModule4Questions = module4QuestionBank.slice(0, 55).map((q, index) => ({
  ...q,
  id: index + 225 + 1,
  module: "Module 4"
}));
const selectedModule5Questions = module5QuestionBank.slice(0, 55).map((q, index) => ({
  ...q,
  id: index + 280 + 1,
  module: "Module 5"
}));
const selectedModule6Questions = transformModule6Questions(module6QuestionBank);
const selectedModule7Questions = module7QuestionBank.slice(0, 55).map((q, index) => ({
  ...q,
  id: index + 340 + 1,
  module: "Module 7"
}));

// Combine all questions into mixed bank
export const mixedQuestionBank: Question[] = [
  ...selectedModule1Questions,    // 55 questions (IDs 1-55)
  ...selectedModule2Questions,    // 55 questions (IDs 116-170) 
  ...selectedModule3Questions,    // 55 questions (IDs 171-225)
  ...selectedModule4Questions,    // 55 questions (IDs 226-280)
  ...selectedModule5Questions,    // 55 questions (IDs 281-335)
  ...selectedModule6Questions,    // 60 questions (IDs 56-115)
  ...selectedModule7Questions,    // 55 questions (IDs 341-395)
];

// Question selection function with difficulty weighting
export const getRandomQuestions = (
  count: number = 30,
  weights?: { basic: number, intermediate: number, advanced: number }
): Question[] => {
  const defaultWeights = { basic: 40, intermediate: 45, advanced: 15 };
  const finalWeights = weights || defaultWeights;
  
  const basicQuestions = mixedQuestionBank.filter(q => q.difficulty === 'basic');
  const intermediateQuestions = mixedQuestionBank.filter(q => q.difficulty === 'intermediate');
  const advancedQuestions = mixedQuestionBank.filter(q => q.difficulty === 'advanced');
  
  const basicCount = Math.round((finalWeights.basic / 100) * count);
  const intermediateCount = Math.round((finalWeights.intermediate / 100) * count);
  const advancedCount = count - basicCount - intermediateCount;
  
  const selectedQuestions: Question[] = [];
  
  // Select basic questions
  const shuffledBasic = [...basicQuestions].sort(() => Math.random() - 0.5);
  selectedQuestions.push(...shuffledBasic.slice(0, basicCount));
  
  // Select intermediate questions
  const shuffledIntermediate = [...intermediateQuestions].sort(() => Math.random() - 0.5);
  selectedQuestions.push(...shuffledIntermediate.slice(0, intermediateCount));
  
  // Select advanced questions
  const shuffledAdvanced = [...advancedQuestions].sort(() => Math.random() - 0.5);
  selectedQuestions.push(...shuffledAdvanced.slice(0, advancedCount));
  
  // Shuffle final selection and renumber
  return selectedQuestions
    .sort(() => Math.random() - 0.5)
    .map((q, index) => ({ ...q, id: index + 1 }));
};

// Validation function
export const validateQuestionBank = (): void => {
  const totalQuestions = mixedQuestionBank.length;
  const moduleDistribution = mixedQuestionBank.reduce((acc, question) => {
    acc[question.module] = (acc[question.module] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const difficultyDistribution = mixedQuestionBank.reduce((acc, question) => {
    acc[question.difficulty] = (acc[question.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  console.log("Mixed Question Bank Validation:");
  console.log(`Total Questions: ${totalQuestions}`);
  console.log("Module Distribution:", moduleDistribution);
  console.log("Difficulty Distribution:", difficultyDistribution);
  
  const basicPercentage = (difficultyDistribution['basic'] || 0) / totalQuestions * 100;
  const intermediatePercentage = (difficultyDistribution['intermediate'] || 0) / totalQuestions * 100;
  const advancedPercentage = (difficultyDistribution['advanced'] || 0) / totalQuestions * 100;
  
  console.log(`Difficulty Percentages: Basic ${basicPercentage.toFixed(1)}%, Intermediate ${intermediatePercentage.toFixed(1)}%, Advanced ${advancedPercentage.toFixed(1)}%`);
};

export default mixedQuestionBank;