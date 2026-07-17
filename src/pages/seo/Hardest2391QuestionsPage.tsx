import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { Target, ClipboardCheck, Activity, Gauge, GraduationCap } from 'lucide-react';

// -------------------------------------------------------------------
// The fail-rate data comes from seo_mock_question_stats — aggregated,
// anonymous results from real timed attempts at our free 2391 mock exam.
// Refresh the percentages periodically from the table (times_wrong /
// times_shown per question_id, exam_slug='2391-inspection-testing').
// Data snapshot: 2026-07-17.
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Exam Guides', href: '/guides/2391-exam-tips' },
  { label: 'Hardest 2391 Questions', href: '/guides/hardest-2391-exam-questions' },
];

const tocItems = [
  { id: 'the-data', label: 'Where This Data Comes From' },
  { id: 'the-questions', label: 'The 10 Hardest Questions' },
  { id: 'patterns', label: 'The Patterns Behind the Failures' },
  { id: 'prepare', label: 'How to Prepare' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'This list is built from real data: aggregated results from hundreds of timed attempts at our free 2391 mock exam, not from guesswork about what "should" be hard.',
  'The hardest question in the bank is failed by 86% of candidates — it asks why an insulation resistance reading rises during the test.',
  'Two topics dominate the failure list: insulation resistance behaviour (why readings change) and earth fault loop impedance corrections (the temperature factors).',
  'The common thread is understanding versus memorising: candidates know the test procedures but stumble on questions about why readings behave the way they do.',
  'Every question below appears in our free 300-question 2391 mock exam, where you get instant marking and explanations on every answer.',
];

const faqs = [
  {
    question: 'What is the hardest topic on the 2391 exam?',
    answer:
      'Based on aggregated results from our free 2391 mock exam, the questions candidates fail most cluster in two topics: insulation resistance behaviour (why readings rise during a test, how temperature affects them, why a whole installation reads lower than its individual circuits) and earth fault loop impedance corrections (the temperature correction factors and why measured Zs differs from calculated Zs). Both share a theme — they test understanding of what the readings mean, not just how to perform the test.',
  },
  {
    question: 'What pass rate do people get on 2391 mock exams?',
    answer:
      'On our free 2391 mock exam — 30 questions drawn from a 300-question bank, 90-minute timer, 70% pass mark — around five in six attempts pass, with an average score just under 80%. That is higher than real-exam pass rates, as you would expect from practice conditions, but the per-question data shows exactly where the marks are lost: the ten questions on this page are failed by 65% to 86% of the people who see them.',
  },
  {
    question: 'Is the 2391 exam multiple choice?',
    answer:
      'The C&G 2391-52 (and the split 2391-50 and 2391-51 units) assess through a combination that includes online multiple-choice knowledge assessments alongside practical assessment — the written scenario papers of older versions have gone. That makes multiple-choice practice under time pressure directly relevant preparation, which is why our mock exam mirrors that format: 30 questions, timed, with instant marking and explanations.',
  },
  {
    question: 'How should I revise the topics I keep failing?',
    answer:
      'Attack the why, not the procedure. For each topic you drop marks on, be able to explain what the reading physically represents and what makes it move — for example, why insulation resistance rises as dielectric absorption settles, or why a measured Zs on a cold circuit reads lower than the corrected design value. Our mock exam shows a per-topic score breakdown after every attempt, so retake it until your weakest topic is consistently above the pass mark rather than averaging your way past it.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/mock-exams/2391-inspection-testing',
    title: 'Free 2391 Mock Exam',
    description: 'The 300-question bank these statistics come from — timed, marked, explained.',
    icon: ClipboardCheck,
    category: 'Mock Exams',
  },
  {
    href: '/mock-exams/2391-51-periodic-inspection',
    title: '2391-51 Periodic Inspection Mock',
    description: 'Sitting the periodic unit? The bank filtered to the 2391-51 syllabus.',
    icon: Target,
    category: 'Mock Exams',
  },
  {
    href: '/guides/2391-exam-tips',
    title: '2391 Exam Tips',
    description: 'Structure, timings and revision strategy for the whole qualification.',
    icon: GraduationCap,
    category: 'Exam Guides',
  },
  {
    href: '/guides/earth-fault-loop-impedance-calculation',
    title: 'Earth Fault Loop Impedance Calculation',
    description: 'The Zs formula, temperature correction and worked examples — the #2 fail topic.',
    icon: Activity,
    category: 'Guides',
  },
  {
    href: '/guides/insulation-resistance-testing-bs7671',
    title: 'Insulation Resistance Testing',
    description: 'Test voltages, minimum values and reading behaviour — the #1 fail topic.',
    icon: Gauge,
    category: 'Guides',
  },
];

interface HardQuestion {
  rank: number;
  failPct: number;
  topic: string;
  question: string;
  answer: string;
  why: string;
}

const HARD_QUESTIONS: HardQuestion[] = [
  {
    rank: 1,
    failPct: 86,
    topic: 'Insulation Resistance',
    question: 'What might cause an insulation resistance reading to gradually increase during testing?',
    answer: 'Absorption of current by the insulation (polarisation)',
    why: 'When the test voltage is first applied, the dielectric draws a charging and polarisation current. As the insulation polarises, that current falls away — so the displayed resistance climbs. Most candidates pick options suggesting a fault or instrument error, but a gradually rising reading is normal behaviour on sound insulation, especially on long cable runs.',
  },
  {
    rank: 2,
    failPct: 76,
    topic: 'Earth Fault Loop Impedance',
    question: 'What correction factor should be applied to measured Zs values?',
    answer: 'Multiply by 1.2 for thermoplastic (1.04 for thermosetting)',
    why: 'Conductors are tested cold but operate hot, and resistance rises with temperature. To compare a cold site reading against the maximum values (which assume operating temperature), the measured value is corrected upward — 1.2 for 70°C thermoplastic insulation. Candidates muddle this with the alternative "0.8 rule" applied to the tabulated limit; both express the same physics from opposite ends.',
  },
  {
    rank: 3,
    failPct: 74,
    topic: 'Earth Fault Loop Impedance',
    question: 'What is the typical maximum Ze for a TT system?',
    answer: '21 Ω',
    why: 'TN values (0.35 Ω and 0.8 Ω) are drilled into everyone; the TT figure is not. 21 Ω is the conventional maximum for a stable TT earth electrode — and the reason TT protection leans on RCDs rather than overcurrent devices for shock protection.',
  },
  {
    rank: 4,
    failPct: 74,
    topic: 'Bonding & Continuity',
    question: 'What is the minimum CSA for supplementary bonding conductors?',
    answer: '4 mm² (where not mechanically protected)',
    why: 'Supplementary bonding sizing has two tiers — 2.5 mm² is acceptable with mechanical protection, 4 mm² without. Candidates who memorise a single number get caught whichever way the question is framed. The full sizing logic is in Section 544.',
  },
  {
    rank: 5,
    failPct: 71,
    topic: 'RCD Testing',
    question: 'What is the maximum permissible standing earth leakage for a 30 mA RCD protected circuit?',
    answer: '10 mA — one third of the rated residual current',
    why: 'The rule of thumb is that standing (protective conductor) leakage should not exceed one third of IΔn to avoid nuisance tripping — 10 mA on a 30 mA device. Candidates guess at half (15 mA) or the full rating; the one-third convention is the one guidance uses.',
  },
  {
    rank: 6,
    failPct: 70,
    topic: 'Insulation Resistance',
    question: 'What effect does temperature have on insulation resistance readings?',
    answer: 'Higher temperatures typically result in lower readings',
    why: 'Insulation resistance falls as temperature rises — roughly halving for every 10°C in many materials. It is the mirror image of conductor resistance (which rises with temperature), and that inversion is exactly the trap the wrong options exploit.',
  },
  {
    rank: 7,
    failPct: 70,
    topic: 'Periodic Inspection',
    question: 'What is the recommended inspection interval for cinemas?',
    answer: '1 year',
    why: 'Places of public entertainment carry short recommended intervals — one year for cinemas — because of occupancy risk. Candidates who only remember "10 years domestic, 5 years commercial" lose this mark; the special-premises table is worth a dedicated revision pass.',
  },
  {
    rank: 8,
    failPct: 70,
    topic: 'Insulation Resistance',
    question: 'When testing a complete installation, what is the likely reading if all circuits pass individually?',
    answer: 'Lower than the individual readings, due to parallel paths',
    why: 'Insulation resistances in parallel combine like resistors in parallel — the whole-installation reading is always lower than the best individual circuit. A 200 MΩ circuit and a 100 MΩ circuit together read about 67 MΩ. Candidates expecting the "sum" or the lowest single value miss it.',
  },
  {
    rank: 9,
    failPct: 67,
    topic: 'Safe Isolation & Instruments',
    question: 'What is the recommended minimum CAT rating for test equipment used on LV installations?',
    answer: 'CAT III',
    why: 'Overvoltage category ratings describe where an instrument can safely be used. Fixed LV installation work calls for CAT III as the minimum (CAT IV at the origin/supply side). CAT II instruments belong on plug-connected equipment, not distribution boards.',
  },
  {
    rank: 10,
    failPct: 65,
    topic: 'Earth Fault Loop Impedance',
    question: 'What causes the difference between measured Zs and calculated Zs values?',
    answer: 'Temperature — conductors are cooler when tested than the values assume',
    why: 'Calculated Zs (Ze + R1+R2 corrected to operating temperature) will typically exceed a live measured Zs on a cold circuit — and parallel earth paths through bonding can pull the measured figure lower still. Understanding which direction the difference runs, and why, is what the question is really testing.',
  },
];

const sections = [
  {
    id: 'the-data',
    heading: 'Where This Data Comes From',
    content: (
      <>
        <p>
          Most "hardest exam questions" articles are guesswork. This one is not: it is built from
          the aggregated, anonymous results of <strong>hundreds of real timed attempts</strong> at
          our{' '}
          <SEOInternalLink href="/mock-exams/2391-inspection-testing">
            free 2391 mock exam
          </SEOInternalLink>{' '}
          — a 300-question bank covering the full inspection and testing syllabus. Every time
          someone submits an attempt, each question's shown-and-answered record updates. The ten
          below are the questions with the highest failure rates among those shown at least
          fifteen times (snapshot: July 2026).
        </p>
        <p>
          The average attempt scores just under 80% and about five in six attempts pass — which
          makes these outliers interesting. These are the questions that people{' '}
          <em>who mostly know the material</em> still get wrong.
        </p>
      </>
    ),
  },
  {
    id: 'the-questions',
    heading: 'The 10 Hardest Questions (With Real Fail Rates)',
    content: (
      <>
        <div className="space-y-4 my-4">
          {HARD_QUESTIONS.map((q) => (
            <div
              key={q.rank}
              className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 sm:p-6"
            >
              <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
                  #{q.rank} · {q.topic}
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-[12px] font-bold text-red-300 tabular-nums">
                  {q.failPct}% get this wrong
                </span>
              </div>
              <p className="text-white font-semibold text-[15px] leading-snug">{q.question}</p>
              <p className="mt-3 text-[14px] text-emerald-300">
                <span className="font-semibold">Answer:</span> {q.answer}
              </p>
              <p className="mt-2 text-[13.5px] text-white/70 leading-relaxed">
                <span className="font-semibold text-white/85">Why people miss it:</span> {q.why}
              </p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'patterns',
    heading: 'The Patterns Behind the Failures',
    content: (
      <>
        <p>Line the ten up and two patterns account for most of them:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white text-[14px]">
            <li>
              • <strong>Reading behaviour, not procedure.</strong> Seven of the ten ask what a
              reading means or why it moves — rising IR during a test, temperature effects,
              parallel paths, measured-vs-calculated Zs. Candidates learn the test sequence
              thoroughly and the physics behind the numbers thinly.
            </li>
            <li>
              • <strong>The unfashionable numbers.</strong> The other three are specific values
              that sit outside the famous ones — TT's 21 Ω, the one-third leakage convention, the
              special-premises inspection intervals. The famous figures (0.35, 0.8, 1.0 MΩ) are
              safe; the marks hide in the second tier.
            </li>
          </ul>
        </div>
        <p>
          If that first pattern describes you, the highest-value revision is not more questions —
          it is the underlying guides:{' '}
          <SEOInternalLink href="/guides/insulation-resistance-testing-bs7671">
            insulation resistance testing
          </SEOInternalLink>{' '}
          and{' '}
          <SEOInternalLink href="/guides/earth-fault-loop-impedance-calculation">
            earth fault loop impedance calculation
          </SEOInternalLink>{' '}
          cover the two topics that dominate this list.
        </p>
      </>
    ),
  },
  {
    id: 'prepare',
    heading: 'How to Prepare',
    content: (
      <>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-2.5 text-white text-[14px]">
            <li>
              1. Take the{' '}
              <SEOInternalLink href="/mock-exams/2391-inspection-testing">
                free 2391 mock exam
              </SEOInternalLink>{' '}
              cold — 30 questions, 90 minutes, no revision first. The per-topic breakdown at the
              end is your real starting map.
            </li>
            <li>
              2. For each weak topic, revise the <em>why</em> — then retake. Fresh questions are
              drawn from the bank every attempt, so a retake is a genuine re-test, not recall.
            </li>
            <li>
              3. Sitting a split unit? Use the{' '}
              <SEOInternalLink href="/mock-exams/2391-51-periodic-inspection">
                2391-51 periodic inspection mock
              </SEOInternalLink>{' '}
              or the{' '}
              <SEOInternalLink href="/mock-exams/2391-50-initial-verification">
                2391-50 initial verification mock
              </SEOInternalLink>{' '}
              — the same bank, filtered to each syllabus.
            </li>
            <li>
              4. Keep going until your weakest topic clears 70% on its own — averaging your way
              to a pass leaves exactly the gaps this page documents.
            </li>
          </ul>
        </div>
      </>
    ),
  },
];

export default function Hardest2391QuestionsPage() {
  return (
    <GuideTemplate
      title="The 10 Hardest 2391 Exam Questions (Real Data)"
      description="Built from hundreds of real mock exam attempts: the 2391 questions with 65–86% fail rates, the correct answers, and why so many candidates miss them."
      datePublished="2026-07-17"
      dateModified="2026-07-17"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Real Exam Data"
      badgeIcon={Target}
      heroTitle={
        <>
          The 10 Hardest 2391 Questions —{' '}
          <span className="text-yellow-400">According to Real Data</span>
        </>
      }
      heroSubtitle="Aggregated results from hundreds of timed attempts at our free 2391 mock exam reveal exactly which questions candidates fail — from an 86%-fail insulation resistance question down. Each one below comes with the answer and, more usefully, why people miss it."
      answerBox={{
        question: 'What are the hardest questions on the 2391 exam?',
        answer:
          'Based on real results from hundreds of mock exam attempts, the hardest 2391 questions cluster in insulation resistance behaviour (why readings rise during testing — 86% fail rate; temperature effects; parallel paths) and earth fault loop impedance corrections (temperature factors, TT maximum Ze of 21 Ω, measured vs calculated Zs). The pattern: candidates know test procedures but stumble on why readings behave as they do.',
      }}
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Hardest 2391 Questions: FAQ"
      relatedPages={relatedPages}
    />
  );
}
