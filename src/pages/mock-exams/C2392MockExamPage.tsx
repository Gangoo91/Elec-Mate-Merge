/**
 * C2392MockExamPage — public mock exam page for C&G 2392 (Fundamental
 * Inspection, Testing and Initial Verification).
 *
 * Built for the "fundamental inspection and testing mock exam" query cluster,
 * which ranked ~position 6 with no dedicated lander. Reuses the shared
 * initial-verification bank — the 2392 sits a level below the 2391-50 but
 * examines the same domain, so the same periodic-only exclusions apply.
 * Copy deliberately makes NO claims about the real 2392 paper's format
 * (question count, duration, pass mark) — the site holds no grounded source
 * for those; do not add them from memory.
 */
import { PublicMockExamPage } from '@/components/seo/PublicMockExamPage';
import { initialVerificationBank } from '@/data/upskilling/initialVerificationBank';

export default function C2392MockExamPage() {
  return (
    <PublicMockExamPage
      title={`2392 Mock Exam: Fundamental Inspection & Testing`}
      description={`Free C&G 2392 mock exam — fundamental inspection, testing and initial verification. 30 timed questions with answers explained. No sign-up.`}
      slug="2392-fundamental-inspection-testing"
      heading={`C&G 2392 Mock Exam — Fundamental Inspection & Testing`}
      intro={`Free mock exam for the City & Guilds 2392 (Fundamental Inspection, Testing and Initial Verification). 30 questions drawn from a ${initialVerificationBank.length}-question bank covering the fundamentals the qualification examines: safe isolation, the dead test sequence in order, continuity of protective conductors, insulation resistance, polarity, earth fault loop impedance, RCD testing, and certification. Every question comes with a worked explanation. Moving on to the full inspection and testing qualification afterwards? Practise with our 2391-50 initial verification and 2391-51 periodic inspection mock exams.`}
      extraFaqs={[
        {
          q: 'What is the difference between the 2392 and the 2391?',
          a: 'The 2392 is the fundamental, entry-level inspection and testing qualification — it covers initial verification of new work you or your team have just installed. The 2391 series goes further: 2391-50 covers initial verification in more depth, 2391-51 adds periodic inspection and condition reporting on existing installations, and 2391-52 combines both. Many electricians sit the 2392 first as the stepping stone.',
        },
        {
          q: 'Which topics should I focus on for fundamental inspection and testing?',
          a: 'The dead test sequence in the correct order is the core of it: safe isolation, continuity of protective conductors, ring final circuit continuity, insulation resistance, then polarity — followed by the live tests: earth fault loop impedance, prospective fault current and RCD operation. The explanations on every question in this mock walk through the why, not just the answer.',
        },
      ]}
      questionBank={
        initialVerificationBank as unknown as Parameters<typeof PublicMockExamPage>[0]['questionBank']
      }
      questionsPerExam={30}
      timeLimitMinutes={60}
      passThreshold={70}
      breadcrumbLabel="2392 Fundamental I&T"
    />
  );
}
