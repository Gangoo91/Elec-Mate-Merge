import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { QuizQuestion } from '@/types/quiz';

interface QuizQuestionsParams {
  category?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  module?: string;
  course?: string;
  count?: number;
  randomize?: boolean;
  enabled?: boolean;
}

interface DbQuizQuestion {
  id: string;
  question_id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  category: string;
  difficulty: string;
  regulation: string | null;
  image_url: string | null;
  module: string | null;
  course: string;
  is_active: boolean;
}

/**
 * Hook to fetch quiz questions from Supabase with lazy loading
 * Replaces static imports from quizQuestions.ts for better performance
 */
export const useQuizQuestions = ({
  category,
  difficulty,
  module,
  course = 'inspection-testing',
  count = 30,
  randomize = true,
  enabled = true
}: QuizQuestionsParams = {}) => {
  return useQuery({
    queryKey: ['quiz-questions', { category, difficulty, module, course, count, randomize }],
    queryFn: async (): Promise<QuizQuestion[]> => {
      let query = supabase
        .from('quiz_questions')
        .select('*')
        .eq('is_active', true)
        .eq('course', course);

      if (category) {
        query = query.eq('category', category);
      }
      if (difficulty) {
        query = query.eq('difficulty', difficulty);
      }
      if (module) {
        query = query.eq('module', module);
      }

      // For randomization, we fetch more than needed and shuffle client-side
      // since Supabase doesn't support random() ordering directly via JS client
      const fetchLimit = randomize ? Math.min(count * 3, 200) : count;
      query = query.limit(fetchLimit);

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching quiz questions:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        return [];
      }

      // Map database format to QuizQuestion interface
      let questions: QuizQuestion[] = (data as DbQuizQuestion[]).map(q => ({
        id: q.question_id,
        question: q.question,
        options: q.options,
        correctAnswer: q.correct_answer,
        explanation: q.explanation,
        category: q.category,
        difficulty: q.difficulty as 'Beginner' | 'Intermediate' | 'Advanced',
        regulation: q.regulation || undefined,
        imageUrl: q.image_url || undefined
      }));

      // Shuffle and limit if randomize is enabled
      if (randomize) {
        questions = questions.sort(() => Math.random() - 0.5).slice(0, count);
      }

      return questions;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes cache
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled
  });
};

/**
 * Hook to fetch quiz questions by multiple categories
 */
export const useQuizQuestionsByCategories = (
  categories: string[],
  options: Omit<QuizQuestionsParams, 'category'> = {}
) => {
  const { course = 'inspection-testing', count = 30, randomize = true, enabled = true } = options;

  return useQuery({
    queryKey: ['quiz-questions-multi', { categories, course, count, randomize }],
    queryFn: async (): Promise<QuizQuestion[]> => {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('is_active', true)
        .eq('course', course)
        .in('category', categories)
        .limit(count * 2);

      if (error) {
        console.error('Error fetching quiz questions:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        return [];
      }

      let questions: QuizQuestion[] = (data as DbQuizQuestion[]).map(q => ({
        id: q.question_id,
        question: q.question,
        options: q.options,
        correctAnswer: q.correct_answer,
        explanation: q.explanation,
        category: q.category,
        difficulty: q.difficulty as 'Beginner' | 'Intermediate' | 'Advanced',
        regulation: q.regulation || undefined,
        imageUrl: q.image_url || undefined
      }));

      if (randomize) {
        questions = questions.sort(() => Math.random() - 0.5).slice(0, count);
      }

      return questions;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled
  });
};

/**
 * Get available categories from the database
 */
export const useQuizCategories = (course: string = 'inspection-testing') => {
  return useQuery({
    queryKey: ['quiz-categories', course],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('category')
        .eq('is_active', true)
        .eq('course', course);

      if (error) throw error;

      // Get unique categories
      const categories = [...new Set(data?.map(q => q.category) || [])];
      return categories.sort();
    },
    staleTime: 30 * 60 * 1000, // 30 minutes - categories don't change often
  });
};
