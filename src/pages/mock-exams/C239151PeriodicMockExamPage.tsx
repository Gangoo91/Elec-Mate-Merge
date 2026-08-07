/**
 * C239151PeriodicMockExamPage — public mock exam page for C&G 2391-51.
 * Reuses the shared inspection & testing bank, excluding the
 * initial-verification-only questions so every draw fits the
 * periodic inspection syllabus.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { inspectionTestingQuestionBank } from '@/data/upskilling/inspectionTestingMockExamData';

/** Questions specific to initial verification (EIC, new installations) — out of scope for 2391-51. */
// Questions that belong to INITIAL VERIFICATION only, so they are removed from
// the periodic paper. Extended 2026-08-07 with ids 327-334 and 336, the new
// EIC / Appendix 6 / scope questions. Note 335 is deliberately NOT here: the
// Reg 643.3 250 V DC recording requirement applies to both papers.
const INITIAL_VERIFICATION_ONLY_IDS = new Set([178, 204, 267, 291, 327, 328, 329, 330, 331, 332, 333, 334, 336, 337, 338, 346]);

const periodicQuestionBank = inspectionTestingQuestionBank.filter(
  (q) => !INITIAL_VERIFICATION_ONLY_IDS.has(q.id)
);

export default function C239151PeriodicMockExamPage() {
  return (
    <PublicMockExamPage
      title={`Free 2391-51 Mock Exam 2026 — Periodic Inspection & Testing`}
      description={`Free City & Guilds 2391-51 mock test: 30 questions, 90-min timer. Periodic inspection, EICR observations + C1/C2/C3/FI coding, sampling, GN3 test sequence.`}
      slug="2391-51-periodic-inspection"
      heading={`C&G 2391-51 Mock Exam — Periodic Inspection & Testing`}
      intro={`Free City & Guilds 2391-51 Periodic Inspection & Testing mock exam. 30 questions drawn from a ${periodicQuestionBank.length}-question bank covering periodic inspection and condition reporting to BS 7671: EICR observations and classification codes (C1/C2/C3/FI), extent and limitations, sampling, the GN3 test sequence, continuity, insulation resistance, polarity, earth fault loop impedance and RCD testing. Sitting the combined 2391-52 instead? Use our 2391 Inspection & Testing mock exam, which also covers initial verification.`}
      // Periodic inspection only — purpose, the EICR, and observation coding.
      sampleQuestionIds={[1, 3, 7]}
      questionBank={
        periodicQuestionBank as unknown as Parameters<
          typeof PublicMockExamPage
        >[0]['questionBank']
      }
      questionsPerExam={30}
      timeLimitMinutes={90}
      passThreshold={70}
      breadcrumbLabel="2391-51 Periodic Inspection"
    />
  );
}
