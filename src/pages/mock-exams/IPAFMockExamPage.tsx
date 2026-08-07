/**
 * IPAFMockExamPage — public MEWP theory mock exam.
 *
 * ⚠️ HISTORY, so this does not regress: this page used to serve
 * `ipafQuestionBank`, which is mobile access TOWER content — its categories are
 * Tower Types, Assembly, Inspection, Hazards and Legislation, and 145 of its
 * 200 questions use tower/scaffold wording. Exactly four mentioned MEWPs. IPAF
 * is powered access; towers are PASMA. Meanwhile the page copy promised
 * "categories 1a/1b/3a/3b, harness and lanyard use, exclusion zones, emergency
 * lowering" — none of which that bank tests.
 *
 * The result was the worst numbers of any exam on the site: 34.4% of answers
 * wrong and a 47% pass rate, against a ~23% site average. People were failing
 * because they were being asked about the wrong equipment.
 *
 * The fix was not to write a new bank. A proper 200-question MEWP bank already
 * existed at `@/data/general-upskilling/mewpMockExamData` — 150 MEWP-worded
 * questions across Legislation & Types, Safe Operation, Risk Assessment,
 * Inspections & Setup, Emergency & Rescue and Safety & Best Practice — but it
 * was only wired into the signed-in study centre and had never been surfaced
 * publicly. Classic "exists but unwired".
 *
 * `ipafQuestionBank` is now orphaned from this page. It is good tower content
 * in the wrong place: consider merging it into the PASMA bank rather than
 * deleting it.
 *
 * NOTE ON SCOPE: this tests the law, planning, stability, fall protection,
 * entrapment and rescue framework for MEWP work — grounded in HSE GEIS6, LOLER
 * 1998, PUWER 1998 and WAHR 2005. It is NOT IPAF's own operator syllabus
 * (their commercial material) and is not a substitute for accredited operator
 * training. The intro says so.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { mewpQuestionBank } from '@/data/general-upskilling/mewpMockExamData';

export default function IPAFMockExamPage() {
  return (
    <PublicMockExamPage
      title={`IPAF Mock Test 2026: Free MEWP Theory Practice`}
      description={`Free MEWP theory mock test: 25 questions from a 200-Q bank. Work at height law, machine selection, ground conditions, harness use, entrapment and rescue. 30-min timer.`}
      slug="ipaf"
      heading={`IPAF Mock Test — Free MEWP Theory Practice`}
      intro={`Free mock test for MEWP operators preparing for IPAF theory assessment. 25 questions drawn from a 200-question bank covering the Work at Height Regulations 2005, LOLER and PUWER duties, selecting the right machine, ground conditions and stability, wind limits, harness and work restraint in boom-type platforms, overhead hazards and entrapment, thorough examination, and emergency lowering and rescue planning. Grounded in HSE guidance. This covers the theory framework rather than machine-specific operating procedures, and is not a substitute for accredited operator training.`}
      questionBank={
        mewpQuestionBank as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={30}
      timeLimitMinutes={35}
      passThreshold={70}
      breadcrumbLabel="IPAF MEWP theory"
    />
  );
}
