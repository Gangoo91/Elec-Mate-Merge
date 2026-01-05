import { QuizQuestion } from '@/types/quiz';

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

/**
 * Get a random selection of BMS mock exam questions
 * @param count Number of questions to return (default: 30)
 * @returns Array of randomly selected quiz questions
 */
export const getRandomBMSMockExamQuestions = (count: number = 30): QuizQuestion[] => {
  const shuffled = [...bmsQuestionBank].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export { bmsQuestionBank };