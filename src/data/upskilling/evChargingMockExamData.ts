import { evChargingQuestions } from './evChargingQuestions';
import { QuizQuestion } from '@/types/quiz';

export const getRandomEVChargingMockExamQuestions = (count: number = 30): QuizQuestion[] => {
  // Shuffle and select random questions from the full bank
  const shuffled = [...evChargingQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const evChargingMockExamConfig = {
  totalQuestions: 30,
  timeLimit: 45, // minutes in seconds
  passingScore: 60, // percentage
  questionBankSize: 300,
  modules: [
    { id: 1, name: 'Introduction to EV Charging' },
    { id: 2, name: 'EVSE Types & Standards' },
    { id: 3, name: 'Electrical Design & Installation' },
    { id: 4, name: 'Earthing & Protection' },
    { id: 5, name: 'Smart Charging & Load Management' },
    { id: 6, name: 'Testing & Commissioning' },
    { id: 7, name: 'OZEV Grants & Compliance' }
  ]
};
