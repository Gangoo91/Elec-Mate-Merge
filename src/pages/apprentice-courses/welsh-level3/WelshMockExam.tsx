/**
 * Welsh Level 3 — Module 9, the final paper.
 *
 * Runs on `StandardMockExam`, which is the same ExamStartPanel →
 * ExamQuestionPanel → ExamResultsPanel → ExamReviewPanel sequence the Level 2
 * and Level 3 papers use directly, with the resume, attempt history,
 * per-question failure rates, telemetry and drill-missed behaviour already
 * wired in. The Level 2 and 3 papers predate the wrapper and each carry their
 * own copy of that logic; there is no reason to add a third.
 *
 * There is no landing page in front of it — those papers open straight onto
 * the start panel, which already states the paper's shape, and this one does
 * the same.
 *
 * `StandardMockExam` shuffles the options at render, which is why no
 * explanation in the bank refers to an answer by its position. Results group
 * by `category`, which on this bank is the module the question came from, so
 * a weak result names the module to go back to.
 */

import { StandardMockExam } from '@/components/shared/StandardMockExam';
import {
  getRandomWelshLevel3Questions,
  welshLevel3MockExamConfig,
  welshLevel3QuestionBank,
} from '@/data/study-centre/welshLevel3MockExamData';
import useSEO from '@/hooks/useSEO';

export default function WelshMockExam() {
  useSEO({
    title: 'Final paper | Module 9 | Welsh Level 3 | Elec-Mate',
    description:
      'Sixty questions across all eight modules of Welsh Level 3 Electrotechnical Installation, drawn from a bank of 400.',
    noindex: true,
  });

  return (
    <StandardMockExam
      config={welshLevel3MockExamConfig}
      questionBank={welshLevel3QuestionBank}
      getRandomQuestions={getRandomWelshLevel3Questions}
    />
  );
}
