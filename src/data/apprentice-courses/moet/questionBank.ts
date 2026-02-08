// MOET Question Bank - Combines all question parts
// Level 3 ST1426 - Maintenance & Operations Engineering Technician
// Electrical Engineering Maintenance Technician Pathway
// Exports combined bank and random selection function

import { questionsPart1 } from './questions-part1';
import { questionsPart2 } from './questions-part2';
import { questionsPart3 } from './questions-part3';
import { questionsPart4 } from './questions-part4';
import type { StandardMockQuestion, DifficultyDistribution } from '@/types/standardMockExam';
import { DEFAULT_DIFFICULTY_DISTRIBUTION } from '@/types/standardMockExam';

// Combine all question parts into single bank
export const moetQuestionBank: StandardMockQuestion[] = [
  ...questionsPart1,
  ...questionsPart2,
  ...questionsPart3,
  ...questionsPart4
];

/**
 * Fisher-Yates shuffle algorithm
 */
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get random questions from the bank with balanced difficulty distribution
 * @param count Number of questions to return
 * @param distribution Optional difficulty distribution (defaults to 35% basic, 45% intermediate, 20% advanced)
 */
export function getRandomQuestions(
  count: number,
  distribution: DifficultyDistribution = DEFAULT_DIFFICULTY_DISTRIBUTION
): StandardMockQuestion[] {
  // Group questions by difficulty
  const basicQuestions = moetQuestionBank.filter(q => q.difficulty === 'basic');
  const intermediateQuestions = moetQuestionBank.filter(q => q.difficulty === 'intermediate');
  const advancedQuestions = moetQuestionBank.filter(q => q.difficulty === 'advanced');

  // Calculate target counts for each difficulty
  const basicCount = Math.round(count * distribution.basic);
  const advancedCount = Math.round(count * distribution.advanced);
  const intermediateCount = count - basicCount - advancedCount;

  // Shuffle each group and take the required number
  const selectedBasic = shuffle(basicQuestions).slice(0, basicCount);
  const selectedIntermediate = shuffle(intermediateQuestions).slice(0, intermediateCount);
  const selectedAdvanced = shuffle(advancedQuestions).slice(0, advancedCount);

  // Combine and shuffle final selection
  const combined = [...selectedBasic, ...selectedIntermediate, ...selectedAdvanced];

  // If we don't have enough questions in some categories, fill from others
  if (combined.length < count) {
    const remaining = shuffle(moetQuestionBank.filter(q => !combined.includes(q)));
    combined.push(...remaining.slice(0, count - combined.length));
  }

  return shuffle(combined);
}
