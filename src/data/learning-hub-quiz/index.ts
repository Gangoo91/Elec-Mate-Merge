import { QuizQuestion } from '@/types/quiz';
import { visualInspectionQuestions } from './visualInspectionQuestions';
import { continuityTestingQuestions } from './continuityTestingQuestions';
import { insulationResistanceQuestions } from './insulationResistanceQuestions';
import { polarityTestingQuestions } from './polarityTestingQuestions';
import { earthFaultLoopQuestions } from './earthFaultLoopQuestions';
import { rcdTestingQuestions } from './rcdTestingQuestions';
import { prospectiveFaultQuestions } from './prospectiveFaultQuestions';
import { functionalTestingQuestions } from './functionalTestingQuestions';

// Export all question banks
export {
  visualInspectionQuestions,
  continuityTestingQuestions,
  insulationResistanceQuestions,
  polarityTestingQuestions,
  earthFaultLoopQuestions,
  rcdTestingQuestions,
  prospectiveFaultQuestions,
  functionalTestingQuestions
};

// Map assessment IDs to their question banks
const questionBankMap: Record<string, QuizQuestion[]> = {
  'visual-inspection': visualInspectionQuestions,
  'continuity-testing': continuityTestingQuestions,
  'insulation-resistance': insulationResistanceQuestions,
  'polarity-testing': polarityTestingQuestions,
  'earth-fault-loop': earthFaultLoopQuestions,
  'rcd-testing': rcdTestingQuestions,
  'prospective-fault': prospectiveFaultQuestions,
  'functional-testing': functionalTestingQuestions
};

/**
 * Get questions for a specific assessment by its ID
 */
export const getQuestionsByAssessmentId = (assessmentId: string): QuizQuestion[] => {
  return questionBankMap[assessmentId] || [];
};

/**
 * Get all available question banks
 */
export const getAllQuestionBanks = (): Record<string, QuizQuestion[]> => {
  return { ...questionBankMap };
};

/**
 * Get the total number of questions available for an assessment
 */
export const getQuestionCountByAssessmentId = (assessmentId: string): number => {
  return (questionBankMap[assessmentId] || []).length;
};

/**
 * Get a random selection of questions for an assessment
 */
export const getRandomQuestions = (assessmentId: string, count: number = 20): QuizQuestion[] => {
  const questions = questionBankMap[assessmentId] || [];
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

/**
 * Get questions filtered by difficulty
 */
export const getQuestionsByDifficulty = (
  assessmentId: string,
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
): QuizQuestion[] => {
  const questions = questionBankMap[assessmentId] || [];
  return questions.filter(q => q.difficulty === difficulty);
};
