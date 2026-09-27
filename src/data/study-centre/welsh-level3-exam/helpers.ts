/**
 * Shared shape for the Welsh Level 3 final paper.
 *
 * One bank file per module, each exporting an array built with `bank()`. The
 * category is the module title, so a learner's result breaks down by the part
 * of the course it came from and points them back at the right module rather
 * than at "revise everything".
 *
 * Writing rules, enforced by scripts/check-welsh-exam-quality.py:
 *   · four options, all the same shape and roughly the same length — a
 *     conspicuously long or short option is a free mark
 *   · every distractor is a real confusion: a neighbouring value, the other
 *     side of a pair people mix up, or the answer to the adjacent question.
 *     Never a throwaway and never an absurdity
 *   · the explanation says why the wrong options are wrong, and names them by
 *     their CONTENT, never by position. StandardMockExam shuffles the options
 *     at render (shuffleAllQuestionOptions), so "the last option" in an
 *     explanation is wrong for three learners in four
 *   · the difficulty mix leaves room for the selector, which draws roughly
 *     35% basic, 45% intermediate and 20% advanced from each category
 *   · nothing is asserted that the course does not teach and the sources do
 *     not support — every regulation number traces to the RAG extract
 */

import type { StandardMockQuestion } from '@/types/standardMockExam';

/** A question as written in a bank file — the category is added by `bank()`. */
export type WelshExamQuestion = Omit<StandardMockQuestion, 'category'>;

/** Stamps every question in a module's bank with that module's category. */
export const bank = (
  category: string,
  questions: WelshExamQuestion[]
): StandardMockQuestion[] => questions.map((q) => ({ ...q, category }));
