import { QuizQuestion } from '@/types/quiz';
import { StandardMockQuestion, DifficultyLevel } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

// Categories based on BMS course modules
export const bmsCategories = [
  'BMS Fundamentals',
  'Hardware & Wiring',
  'HVAC Integration',
  'Lighting & Access Control',
  'Communication Protocols',
  'Advanced Features',
  'Commissioning & Handover'
];

// Configuration for BMS mock exam
export const bmsMockExamConfig = {
  examId: 'bms',
  examTitle: 'Building Management Systems Mock Examination',
  totalQuestions: 30,
  timeLimit: 2700, // 45 minutes
  passThreshold: 60,
  exitPath: '/electrician/upskilling/bms-course',
  categories: bmsCategories
};

// Import BMS quiz data files that use the standard QuizQuestion interface
import { bmsModule4Section5QuizData } from './bmsModule4Section5QuizData';
import { bmsModule2Section1QuizData } from './bmsModule2Section1QuizData';
import { bmsModule5Section4QuizData } from './bmsModule5Section4QuizData';
import { bmsModule4Section1QuizData } from './bmsModule4Section1QuizData';
import { bmsModule6Section1QuizData } from './bmsModule6Section1QuizData';
import { bmsModule3Section2QuizData } from './bmsModule3Section2QuizData';
import { bmsModule1Section3QuizData } from './bmsModule1Section3QuizData';
import { bmsModule5Section5QuizData } from './bmsModule5Section5QuizData';
import { bmsModule1Section1QuizData } from './bmsModule1Section1QuizData';
import { bmsModule2Section5QuizData } from './bmsModule2Section5QuizData';
import { bmsModule3Section1QuizData } from './bmsModule3Section1QuizData';
import { bmsModule1Section5QuizData } from './bmsModule1Section5QuizData';
import { bmsModule2Section3QuizData } from './bmsModule2Section3QuizData';
import { bmsModule2Section2QuizData } from './bmsModule2Section2QuizData';
import { bmsDashboardsQuizData } from './bmsDashboardsQuizData';
import { bmsModule4Section2QuizData } from './bmsModule4Section2QuizData';

// Additional BMS quiz files to expand the question bank (compatible interface only)
import { bmsModule7Section3Quiz } from './bmsModule7Section3Quiz';
import { bmsModule7Section4Quiz } from './bmsModule7Section4Quiz';
import { bmsModule6Section6Quiz } from './bmsModule6Section6Quiz';
import { bmsModule7Section2Quiz } from './bmsModule7Section2Quiz';
import { bmsModule7Section5Quiz } from './bmsModule7Section5Quiz';
import { bmsModule6Section2Quiz } from './bmsModule6Section2Quiz';
import { bmsModule7Section1Quiz } from './bmsModule7Section1Quiz';
import { bmsModule6Section3Quiz } from './bmsModule6Section3Quiz';
import { bmsModule6Section5Quiz } from './bmsModule6Section5Quiz';

// Combine all BMS quiz questions into one comprehensive bank
const allBMSQuestions: QuizQuestion[] = [
  // Module 1 - BMS Fundamentals
  ...bmsModule1Section1QuizData,
  ...bmsModule1Section3QuizData,
  ...bmsModule1Section5QuizData,
  
  // Module 2 - Hardware & Wiring
  ...bmsModule2Section1QuizData,
  ...bmsModule2Section2QuizData,
  ...bmsModule2Section3QuizData,
  ...bmsModule2Section5QuizData,
  
  // Module 3 - HVAC Integration & Control
  ...bmsModule3Section1QuizData,
  ...bmsModule3Section2QuizData,
  
  // Module 4 - Lighting & Access Control
  ...bmsModule4Section1QuizData,
  ...bmsModule4Section2QuizData,
  ...bmsModule4Section5QuizData,
  
  // Module 5 - Communication Protocols
  ...bmsModule5Section4QuizData,
  ...bmsModule5Section5QuizData,
  
  // Module 6 - Advanced BMS Features
  ...bmsModule6Section1QuizData,
  ...bmsModule6Section2Quiz,
  ...bmsModule6Section3Quiz,
  ...bmsModule6Section5Quiz,
  ...bmsModule6Section6Quiz,
  
  // Module 7 - Commissioning & Handover
  ...bmsModule7Section1Quiz,
  ...bmsModule7Section2Quiz,
  ...bmsModule7Section3Quiz,
  ...bmsModule7Section4Quiz,
  ...bmsModule7Section5Quiz,
  
  // Dashboards & System Management
  ...bmsDashboardsQuizData
];

// Reassign unique IDs to avoid conflicts
const bmsQuestionBank: QuizQuestion[] = allBMSQuestions.map((question, index) => ({
  ...question,
  id: index + 1
}));

// Helper function to determine difficulty based on question characteristics
const getBMSDifficulty = (question: QuizQuestion): DifficultyLevel => {
  const q = question.question.toLowerCase();
  // Basic: definitions, "what is", terminology, basic concepts
  if (q.includes('what is') || q.includes('what does') || q.includes('stand for') ||
      q.includes('purpose of') || q.includes('primary') || q.includes('main function') ||
      q.includes('define') || q.includes('meaning of')) {
    return 'basic';
  }
  // Advanced: troubleshooting, calculations, complex integration, advanced protocols
  if (q.includes('calculat') || q.includes('formula') || q.includes('troubleshoot') ||
      q.includes('fault find') || q.includes('pid') || q.includes('integration') ||
      q.includes('protocol') || q.includes('bacnet') || q.includes('modbus')) {
    return 'advanced';
  }
  // Intermediate: procedures, configuration, wiring, commissioning
  return 'intermediate';
};

// Helper function to get category based on question source module
const getBMSCategory = (index: number, total: number): string => {
  // Distribute evenly across categories based on index
  const categoryIndex = Math.min(Math.floor((index / total) * bmsCategories.length), bmsCategories.length - 1);
  return bmsCategories[categoryIndex];
};

// Convert to StandardMockQuestion format
export const bmsStandardQuestionBank: StandardMockQuestion[] = bmsQuestionBank.map((q, index) => ({
  id: q.id,
  question: q.question,
  options: q.options,
  correctAnswer: q.correctAnswer,
  explanation: q.explanation,
  section: getBMSCategory(index, bmsQuestionBank.length),
  difficulty: getBMSDifficulty(q),
  topic: getBMSCategory(index, bmsQuestionBank.length),
  category: getBMSCategory(index, bmsQuestionBank.length)
}));

/**
 * Get a random selection of BMS mock exam questions (new format with difficulty distribution)
 * @param numQuestions Number of questions to return (default: 30)
 * @returns Array of randomly selected StandardMockQuestion
 */
export const getRandomBMSMockExamQuestions = (numQuestions: number = 30): StandardMockQuestion[] => {
  return getRandomQuestionsBalanced(
    bmsStandardQuestionBank,
    numQuestions,
    bmsCategories,
    { basic: 0.35, intermediate: 0.45, advanced: 0.2 }
  );
};

export { bmsQuestionBank };