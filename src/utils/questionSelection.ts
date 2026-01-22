/**
 * Question Selection Utility
 *
 * Provides functions for selecting questions with difficulty distribution
 * and category balancing for mock exams.
 */

import {
  StandardMockQuestion,
  DifficultyDistribution,
  DEFAULT_DIFFICULTY_DISTRIBUTION
} from '@/types/standardMockExam';

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Gets questions filtered by difficulty level
 */
function getQuestionsByDifficulty(
  questions: StandardMockQuestion[],
  difficulty: 'basic' | 'intermediate' | 'advanced'
): StandardMockQuestion[] {
  return questions.filter(q => q.difficulty === difficulty);
}

/**
 * Gets questions filtered by category
 */
function getQuestionsByCategory(
  questions: StandardMockQuestion[],
  category: string
): StandardMockQuestion[] {
  return questions.filter(q => q.category === category);
}

/**
 * Selects random questions with difficulty distribution weighting.
 *
 * Default distribution: 35% basic, 45% intermediate, 20% advanced
 *
 * @param questions - Full question bank
 * @param count - Number of questions to select
 * @param distribution - Difficulty distribution weights (must sum to 1.0)
 * @returns Array of randomly selected questions with weighted difficulty
 */
export function getRandomQuestionsByDifficulty(
  questions: StandardMockQuestion[],
  count: number,
  distribution: DifficultyDistribution = DEFAULT_DIFFICULTY_DISTRIBUTION
): StandardMockQuestion[] {
  // Get questions by difficulty
  const basicQuestions = shuffleArray(getQuestionsByDifficulty(questions, 'basic'));
  const intermediateQuestions = shuffleArray(getQuestionsByDifficulty(questions, 'intermediate'));
  const advancedQuestions = shuffleArray(getQuestionsByDifficulty(questions, 'advanced'));

  // Calculate target counts for each difficulty
  const basicCount = Math.round(count * distribution.basic);
  const intermediateCount = Math.round(count * distribution.intermediate);
  const advancedCount = Math.max(0, count - basicCount - intermediateCount);

  // Select questions from each difficulty pool
  const selectedBasic = basicQuestions.slice(0, basicCount);
  const selectedIntermediate = intermediateQuestions.slice(0, intermediateCount);
  const selectedAdvanced = advancedQuestions.slice(0, advancedCount);

  // Combine and handle any shortfall
  let combined = [...selectedBasic, ...selectedIntermediate, ...selectedAdvanced];

  // If we don't have enough questions, fill from remaining
  if (combined.length < count) {
    const selectedIds = new Set(combined.map(q => q.id));
    const remaining = shuffleArray(questions.filter(q => !selectedIds.has(q.id)));
    combined = [...combined, ...remaining.slice(0, count - combined.length)];
  }

  // Shuffle the final selection so difficulties are mixed
  return shuffleArray(combined).slice(0, count);
}

/**
 * Selects random questions with both difficulty and category balancing.
 *
 * Ensures questions are distributed across categories while respecting
 * difficulty distribution within each category.
 *
 * @param questions - Full question bank
 * @param count - Number of questions to select
 * @param categories - List of categories to include
 * @param distribution - Difficulty distribution weights
 * @returns Array of randomly selected questions balanced by category and difficulty
 */
export function getRandomQuestionsBalanced(
  questions: StandardMockQuestion[],
  count: number,
  categories: string[],
  distribution: DifficultyDistribution = DEFAULT_DIFFICULTY_DISTRIBUTION
): StandardMockQuestion[] {
  // Calculate questions per category
  const basePerCategory = Math.floor(count / categories.length);
  const remainder = count % categories.length;

  const selectedQuestions: StandardMockQuestion[] = [];

  categories.forEach((category, index) => {
    const categoryQuestions = getQuestionsByCategory(questions, category);
    const targetCount = basePerCategory + (index < remainder ? 1 : 0);

    if (categoryQuestions.length === 0) return;

    // Apply difficulty weighting within each category
    const basicCount = Math.round(targetCount * distribution.basic);
    const intermediateCount = Math.round(targetCount * distribution.intermediate);
    const advancedCount = Math.max(0, targetCount - basicCount - intermediateCount);

    const basicPool = shuffleArray(getQuestionsByDifficulty(categoryQuestions, 'basic'));
    const intermediatePool = shuffleArray(getQuestionsByDifficulty(categoryQuestions, 'intermediate'));
    const advancedPool = shuffleArray(getQuestionsByDifficulty(categoryQuestions, 'advanced'));

    // Select from each difficulty pool
    const selected = [
      ...basicPool.slice(0, basicCount),
      ...intermediatePool.slice(0, intermediateCount),
      ...advancedPool.slice(0, advancedCount)
    ];

    // If we couldn't fill the target, grab any remaining questions from the category
    if (selected.length < targetCount) {
      const selectedIds = new Set(selected.map(q => q.id));
      const remaining = shuffleArray(categoryQuestions.filter(q => !selectedIds.has(q.id)));
      selected.push(...remaining.slice(0, targetCount - selected.length));
    }

    selectedQuestions.push(...selected);
  });

  // If we still don't have enough, fill from any remaining
  if (selectedQuestions.length < count) {
    const selectedIds = new Set(selectedQuestions.map(q => q.id));
    const remaining = shuffleArray(questions.filter(q => !selectedIds.has(q.id)));
    selectedQuestions.push(...remaining.slice(0, count - selectedQuestions.length));
  }

  // Shuffle the final selection
  return shuffleArray(selectedQuestions).slice(0, count);
}

/**
 * Simple random question selection without difficulty weighting.
 * For question banks that don't have difficulty metadata yet.
 *
 * @param questions - Full question bank
 * @param count - Number of questions to select
 * @returns Array of randomly selected questions
 */
export function getRandomQuestions<T extends { id: number }>(
  questions: T[],
  count: number
): T[] {
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, Math.min(count, questions.length));
}

/**
 * Gets unique categories from a question bank
 */
export function getCategories(questions: StandardMockQuestion[]): string[] {
  return [...new Set(questions.map(q => q.category))];
}

/**
 * Gets question count statistics by difficulty
 */
export function getDifficultyStats(questions: StandardMockQuestion[]): {
  basic: number;
  intermediate: number;
  advanced: number;
  total: number;
} {
  return {
    basic: questions.filter(q => q.difficulty === 'basic').length,
    intermediate: questions.filter(q => q.difficulty === 'intermediate').length,
    advanced: questions.filter(q => q.difficulty === 'advanced').length,
    total: questions.length
  };
}
