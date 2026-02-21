import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Scale,
  FileCheck,
  ClipboardList,
  Layers,
  BookOpen,
  HelpCircle,
  Target,
  Lightbulb,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (placed between content sections)            */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    question:
      'An assessor watches a learner install a consumer unit, then checks the work against the NVQ criteria. Which VACSR principle is this primarily testing?',
    options: ['Authentic', 'Valid', 'Sufficient', 'Reliable'],
    correctIndex: 1,
    explanation:
      'This is primarily testing validity. The assessment method (practical observation of a real consumer unit installation) directly measures what it claims to measure — the learner\u2019s ability to install a consumer unit competently and safely.',
  },
  {
    question:
      'A tutor gives an apprentice a mock practical test halfway through their first fix training and uses the results to adjust the next two weeks of teaching. Is this formative or summative assessment?',
    options: [
      'Summative — because it involves a practical test',
      'Formative — because it is used to shape ongoing learning',
      'Neither — it is diagnostic assessment only',
      'Both formative and summative simultaneously',
    ],
    correctIndex: 1,
    explanation:
      'This is formative assessment — "assessment for learning". The purpose is developmental: the tutor uses the results to adjust future teaching and close gaps. Even though it involves a practical test, the intent determines whether assessment is formative or summative.',
  },
  {
    question:
      'An assessor records a learner as a "fail" on their observation sheet. What is wrong with this language in competence-based assessment?',
    options: [
      'Nothing — "fail" is standard assessment terminology',
      'It should say "distinction" instead',
      'Competence-based assessment uses "not yet competent", never "fail"',
      'The word "fail" can only be used in written tests',
    ],
    correctIndex: 2,
    explanation:
      'In competence-based assessment, the correct terms are "competent" or "not yet competent". The term "fail" implies a permanent judgement of the person, whereas "not yet competent" focuses on the evidence presented on this occasion and leaves the door open for the learner to demonstrate competence in the future.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'What is the difference between validity and reliability in assessment?',
    answer:
      'Validity asks: "Does this assessment measure what it claims to measure?" If you want to assess whether someone can wire a consumer unit, watching them do it is valid; giving them a written test about wiring theory is less valid for that specific purpose. Reliability asks: "Would a different assessor, assessing the same learner on the same occasion, reach the same judgement?" If only one particular assessor would pass this learner, the assessment lacks reliability. Both are essential — an assessment can be reliable but not valid (consistently measuring the wrong thing), or valid but not reliable (measuring the right thing but inconsistently).',
  },
  {
    question: 'Can I use simulation instead of real workplace observation?',
    answer:
      'Simulation can be used when workplace observation is not practicable — for example, assessing emergency procedures, fault-finding on expensive equipment, or scenarios that cannot be safely staged on a live site. However, simulation should supplement real observation, not replace it entirely. The AM2 assessment, for instance, uses a controlled workshop environment that simulates realistic conditions. When using simulation, ensure it mirrors real conditions as closely as possible and clearly document why simulation was necessary rather than workplace observation.',
  },
  {
    question: 'How many pieces of evidence are enough for "sufficient" evidence?',
    answer:
      'There is no fixed number. "Sufficient" means there is enough evidence to demonstrate consistent competence across the full range of the assessment criteria. A single observation might be sufficient for a straightforward task, while a complex unit might require multiple observations across different contexts, supported by oral questioning and professional discussion. The key question is: "Am I confident, based on this evidence, that this learner can perform this task competently every time, not just on a good day?" If you are not confident, you need more evidence.',
  },
  {
    question: 'Why do we say "not yet competent" instead of "fail"?',
    answer:
      'Competence-based assessment operates on a fundamentally different philosophy from traditional pass/fail testing. A learner who has not yet demonstrated competence has not "failed" as a person — they simply have not presented sufficient evidence against the standard on this particular occasion. The language "not yet competent" is future-focused: it implies that competence is achievable and that the learner will have further opportunities to demonstrate it. This approach maintains motivation, reduces anxiety, and reflects the reality that people develop competence at different rates. It also shifts the focus from the person to the evidence, which is fairer and more objective.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'What does the "V" in VACSR stand for?',
    options: ['Varied', 'Valid', 'Verbal', 'Voluntary'],
    correctAnswer: 1,
    explanation:
      'V stands for Valid — the assessment must measure what it claims to measure. If you are assessing practical wiring competence, the assessment method must involve practical wiring, not just a written test about wiring theory.',
  },
  {
    id: 2,
    question:
      'An assessor checks that a portfolio contains the learner\u2019s own work, not someone else\u2019s. Which VACSR principle is the assessor applying?',
    options: ['Valid', 'Authentic', 'Current', 'Sufficient'],
    correctAnswer: 1,
    explanation:
      'The assessor is checking authenticity — ensuring the evidence genuinely belongs to and was produced by the learner. Authenticity prevents plagiarism and ensures the learner can personally demonstrate the competence claimed.',
  },
  {
    id: 3,
    question: 'Which of the following best describes formative assessment?',
    options: [
      'A final examination at the end of a course',
      'Ongoing assessment used to identify gaps and shape future learning',
      'A one-off judgement of overall competence',
      'An assessment that results in a formal certificate',
    ],
    correctAnswer: 1,
    explanation:
      'Formative assessment is ongoing, developmental assessment — "assessment for learning". Its purpose is to identify strengths and gaps during the learning process so that teaching and learning can be adjusted. It does not result in a final grade or certificate.',
  },
  {
    id: 4,
    question:
      'The AM2 practical assessment at the end of an electrical apprenticeship is an example of:',
    options: [
      'Formative assessment',
      'Diagnostic assessment',
      'Summative assessment',
      'Peer assessment',
    ],
    correctAnswer: 2,
    explanation:
      'The AM2 is summative assessment — "assessment of learning". It takes place at the end of the apprenticeship, makes a judgement about whether the learner has achieved the required standard, and results in a formal outcome (competent or not yet competent).',
  },
  {
    id: 5,
    question:
      'Which assessment method is most valid for assessing whether a learner can safely isolate a supply?',
    options: [
      'A written multiple-choice test',
      'A professional discussion',
      'Direct observation of the learner performing safe isolation',
      'A portfolio of written evidence',
    ],
    correctAnswer: 2,
    explanation:
      'Direct observation is the most valid method because it directly measures what it claims to assess — the learner\u2019s ability to perform safe isolation in practice. Written tests and discussions can assess underpinning knowledge but cannot confirm practical competence.',
  },
  {
    id: 6,
    question:
      'Two assessors independently observe the same learner performing the same task and both reach the same judgement. This demonstrates:',
    options: ['Validity', 'Authenticity', 'Sufficiency', 'Reliability'],
    correctAnswer: 3,
    explanation:
      'This demonstrates reliability — the consistency of the assessment judgement. When different assessors reach the same conclusion about the same performance, the assessment process is reliable and not dependent on the subjective preferences of one individual assessor.',
  },
  {
    id: 7,
    question:
      'In competence-based assessment, the correct term for a learner who has not met the required standard is:',
    options: ['Failed', 'Referred', 'Not yet competent', 'Below average'],
    correctAnswer: 2,
    explanation:
      'Competence-based assessment uses "not yet competent" rather than "fail". This language is future-focused, non-judgemental about the person, and recognises that the learner has not demonstrated sufficient evidence on this occasion but may do so in the future.',
  },
  {
    id: 8,
    question:
      'An assessor plans to assess a learner\u2019s ability to install a ring final circuit. The assessment plan should include:',
    options: [
      'Only the date and time of the assessment',
      'What will be assessed, when, how, and what evidence will be collected',
      'Only the NVQ unit number',
      'A prediction of whether the learner will pass',
    ],
    correctAnswer: 1,
    explanation:
      'A thorough assessment plan covers what is being assessed (the specific criteria), when and where the assessment will take place, which methods will be used (observation, questioning, etc.), and what evidence will be collected. This ensures both the assessor and learner are prepared and that the assessment is fair and transparent.',
  },
];

/* ------------------------------------------------------------------ */
/*  Learning outcomes                                                  */
/* ------------------------------------------------------------------ */
const outcomes = [
  'Explain the five VACSR principles and why each is essential for fair, reliable assessment',
  'Distinguish between formative and summative assessment and give a construction example of each',
  'Compare at least four assessment methods, identifying the strengths and limitations of each',
  'Use competence-based language correctly, including the term "not yet competent"',
  'Create a structured assessment plan for a practical electrical task',
  'Apply VACSR principles to evaluate whether a piece of evidence meets assessment requirements',
];

/* ================================================================== */
/*  COMPONENT                                                          */
/* ================================================================== */
export default function MDModule4Section1() {
  useSEO({
    title: 'Principles of Assessment | Module 4: Assessment & Evaluation',
    description:
      'VACSR principles, formative vs summative assessment, assessment types and methods, competence-based language, and assessment planning for electrical mentors.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* ── Sticky Header ─────────────────────────────────────────── */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../md-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Assessment &amp; Evaluation
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Article Body ──────────────────────────────────────────── */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* ── Page Title ──────────────────────────────────────────── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Scale className="h-7 w-7 text-rose-400" />
          </div>
          <div className="flex justify-center mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-xs font-semibold">
                MODULE 4 &middot; SECTION 1
              </span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Principles of Assessment
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the core principles that underpin fair, valid, and reliable assessment is
            essential for anyone who assesses learner competence in the electrical trade.
          </p>
        </header>

        {/* ── Quick Summary Boxes ─────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Five VACSR principles ensure assessment is Valid, Authentic, Current, Sufficient,
                  and Reliable
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Formative assessment develops competence; summative assessment confirms it
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Multiple assessment methods exist &mdash; the right one depends on what you are
                  assessing
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Always use &ldquo;not yet competent&rdquo;, never &ldquo;fail&rdquo; in
                  competence-based assessment
                </span>
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Poor assessment can sign off someone as competent when they are not &mdash; a
                  direct safety risk
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Unfair assessment damages learner motivation and trust in the mentoring
                  relationship
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Robust assessment protects both the learner and the assessor if decisions are
                  challenged
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Awarding bodies and IQA processes require assessors to demonstrate understanding
                  of these principles
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Learning Outcomes ────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {outcomes.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/*  SECTION 01 — VACSR: The Five Principles of Assessment       */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">01</span>
            </div>
            <h2 className="text-xl font-semibold text-white">
              VACSR &mdash; The Five Principles of Assessment
            </h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Every assessment decision you make as a mentor or assessor must stand up to scrutiny.
              Whether you are observing an apprentice performing safe isolation, reviewing a
              portfolio of evidence, or asking questions during a professional discussion, five
              fundamental principles govern whether that assessment is fit for purpose. These
              principles are commonly known by the acronym <strong>VACSR</strong>: Valid, Authentic,
              Current, Sufficient, and Reliable. Together, they form the foundation of quality
              assurance in competence-based assessment.
            </p>

            <p className="text-white text-base leading-relaxed">
              Understanding VACSR is not optional for assessors &mdash; it is a professional
              requirement. Awarding bodies such as City &amp; Guilds and EAL expect all assessors to
              demonstrate a working knowledge of these principles, and internal quality assurance
              processes will check that your assessment decisions are consistent with them. More
              importantly, applying VACSR correctly protects both the learner (who deserves a fair
              assessment) and the public (who rely on the competence of qualified electricians).
            </p>

            {/* VACSR Framework Box */}
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">The Five VACSR Principles</p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Valid</p>
                  <p className="text-white text-xs leading-relaxed">
                    Does the assessment measure what it claims to measure? If you are assessing
                    whether someone can install a consumer unit, you need to watch them install a
                    consumer unit &mdash; not simply ask them to describe the process in writing.
                    The assessment method must be appropriate for the skill or knowledge being
                    assessed.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Authentic</p>
                  <p className="text-white text-xs leading-relaxed">
                    Is the evidence genuinely the learner&rsquo;s own work? Authenticity means you
                    can confirm that the learner personally produced the evidence. This includes
                    checking that portfolio photographs match diary entries, that written work is in
                    the learner&rsquo;s own words, and that observed performance was not coached or
                    prompted beyond normal instruction.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Current</p>
                  <p className="text-white text-xs leading-relaxed">
                    Is the evidence recent enough to demonstrate current competence? Regulations,
                    methods, and best practices change over time. Evidence from three years ago may
                    no longer reflect current standards. For practical skills, currency is
                    particularly important &mdash; someone who demonstrated competence two years ago
                    may have lost that skill through lack of practice.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Sufficient</p>
                  <p className="text-white text-xs leading-relaxed">
                    Is there enough evidence to meet the full requirements of the assessment
                    criteria? Sufficiency means covering all the criteria, not just some of them. A
                    single observation of one ring final circuit installation may not be sufficient
                    if the criteria require evidence of competence across multiple circuit types and
                    contexts.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Reliable</p>
                  <p className="text-white text-xs leading-relaxed">
                    Would a different assessor, assessing the same learner on the same occasion,
                    reach the same judgement? Reliability means the outcome does not depend on which
                    assessor happens to conduct the assessment. This is achieved through clear
                    criteria, standardised assessment methods, and regular standardisation between
                    assessors.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Scale className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  VACSR in Construction: Practical Examples
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Consider an NVQ assessor visiting a site to assess an apprentice&rsquo;s competence
                in installing a consumer unit. The assessor applies VACSR as follows:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Valid:</strong> The assessor observes the apprentice physically
                    installing the consumer unit, rather than simply asking them to describe the
                    process. The method matches the competence being assessed.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Authentic:</strong> The assessor verifies the apprentice is working
                    independently, not being guided step-by-step by their supervisor. The
                    photographs in the portfolio correspond to the work the assessor observed on
                    site.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Current:</strong> The installation follows the current edition of BS
                    7671 (18th Edition with Amendment 2), and the observation was conducted within
                    the last three months.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Sufficient:</strong> The assessor supplements the observation with oral
                    questioning to cover underpinning knowledge that cannot be inferred from
                    observation alone (e.g. &ldquo;Why did you select a Type 2 SPD for this
                    installation?&rdquo;).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Reliable:</strong> The assessor uses the same assessment criteria and
                    recording template that all assessors in the centre use, and has attended the
                    most recent standardisation meeting.
                  </span>
                </li>
              </ul>
            </div>

            <p className="text-white text-base leading-relaxed">
              When any one of the five VACSR principles is missing, the quality of the assessment is
              compromised. An assessment that is valid, authentic, current, and sufficient but not
              reliable means different assessors would reach different conclusions about the same
              learner &mdash; which is fundamentally unfair. An assessment that is reliable but not
              valid means assessors consistently agree, but they are measuring the wrong thing. All
              five principles must be present for an assessment to be fit for purpose.
            </p>
          </div>
        </section>

        {/* ── Inline Check 1 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 02 — Formative vs Summative Assessment              */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">02</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Formative vs Summative Assessment</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Assessment serves two fundamentally different purposes, and understanding the
              distinction between them is essential for every mentor and assessor. These two
              purposes are captured in the terms <strong>formative assessment</strong> and{' '}
              <strong>summative assessment</strong>. Getting confused between them is one of the
              most common mistakes new assessors make, and it leads to poor assessment practice,
              anxious learners, and missed development opportunities.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Formative Assessment: Assessment for Learning
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Formative assessment is ongoing, developmental assessment that takes place{' '}
                <em>during</em> the learning process. Its purpose is not to make a final judgement
                about competence, but to identify what the learner can already do, where the gaps
                are, and what needs to happen next. It is sometimes described as &ldquo;assessment
                for learning&rdquo; because its primary function is to shape and improve the
                learning experience.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                In the electrical trade, formative assessment happens every day on site. When a
                supervisor watches an apprentice performing their first fix and says, &ldquo;Your
                cable runs are neat, but you need to leave more slack at the back boxes for
                termination,&rdquo; that is formative assessment. The supervisor has observed the
                work, identified a strength and a gap, and provided immediate feedback that the
                apprentice can act on.
              </p>
              <p className="text-white text-sm leading-relaxed">
                Key characteristics of formative assessment include: it is ongoing and continuous
                rather than a single event; it provides specific, actionable feedback; it focuses on
                development rather than judgement; it is low-stakes (the learner is not at risk of
                &ldquo;failing&rdquo;); and it directly informs what the mentor or tutor does next
                in the learning programme.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileCheck className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Summative Assessment: Assessment of Learning
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Summative assessment takes place at the end of a learning period or programme. Its
                purpose is to make a formal judgement about whether the learner has achieved the
                required standard. It is &ldquo;assessment of learning&rdquo; &mdash; a
                retrospective confirmation of what has been learned and whether it meets the
                benchmark.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                The AM2 assessment is the most obvious summative assessment in the electrical
                apprenticeship. It takes place at the end of the training programme, under
                controlled conditions, and results in a formal outcome: the learner is either judged
                competent to the required standard or not yet competent. Other examples include
                final NVQ observation assessments, end-of-unit written tests, and professional
                discussion assessments that confirm underpinning knowledge.
              </p>
              <p className="text-white text-sm leading-relaxed">
                Key characteristics of summative assessment include: it occurs at a defined end
                point; it results in a formal judgement (competent or not yet competent); it is
                high-stakes; it measures achievement against a fixed standard; and it provides
                evidence for certification or qualification.
              </p>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-2">Construction Example</p>
              <p className="text-white text-sm leading-relaxed mb-3">
                Think of learning to drive. Every driving lesson is formative assessment &mdash;
                your instructor observes your driving, identifies what you are doing well and what
                needs work, and adjusts the next lesson accordingly. The driving test is summative
                assessment &mdash; it happens at the end, makes a formal judgement, and results in
                either a pass or a fail.
              </p>
              <p className="text-white text-sm leading-relaxed">
                In the electrical trade, watching an apprentice during first fix and coaching them
                through cable routing is formative. The AM2 practical test at the end of their
                apprenticeship is summative. Both are essential: formative assessment{' '}
                <em>builds</em> competence; summative assessment <em>confirms</em> it. Skipping
                formative assessment and jumping straight to summative assessment is like never
                having a driving lesson but turning up for the test.
              </p>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-elec-yellow text-sm font-semibold mb-2">Remember</p>
                  <p className="text-white text-sm leading-relaxed">
                    The purpose of the assessment determines whether it is formative or summative,
                    not the method used. A practical observation can be either formative (used to
                    give developmental feedback) or summative (used to make a final competence
                    judgement). The key question is: &ldquo;Am I using this assessment to develop
                    the learner, or to judge them?&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Inline Check 2 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 03 — Assessment Types and Methods                   */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">03</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Assessment Types and Methods</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Assessors have a range of methods available to them, and choosing the right method for
              the right purpose is a critical skill. No single method is perfect for every situation
              &mdash; each has strengths and limitations, and effective assessment usually combines
              multiple methods to build a complete picture of the learner&rsquo;s competence.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardList className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Assessment Methods: Strengths and Limitations
                </h3>
              </div>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Observation</p>
                  <p className="text-white text-xs leading-relaxed mb-1">
                    <strong>Strengths:</strong> Directly measures practical competence in real or
                    realistic conditions. Highly valid for hands-on skills. Allows the assessor to
                    see safe working practices, tool selection, and time management in action.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Limitations:</strong> Time-intensive for both assessor and learner. The
                    learner may perform differently under observation (the &ldquo;Hawthorne
                    effect&rdquo;). Cannot assess underpinning knowledge that is not visible in the
                    performance.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Oral Questioning</p>
                  <p className="text-white text-xs leading-relaxed mb-1">
                    <strong>Strengths:</strong> Flexible and responsive &mdash; the assessor can
                    probe deeper based on the learner&rsquo;s answers. Assesses underpinning
                    knowledge and understanding. Can be combined with observation to explore the
                    reasoning behind practical decisions.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Limitations:</strong> Relies on the learner&rsquo;s verbal confidence,
                    which may not reflect their actual competence. Can be affected by language
                    barriers, anxiety, or neurodiversity. Must be recorded accurately to serve as
                    evidence.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Written Test</p>
                  <p className="text-white text-xs leading-relaxed mb-1">
                    <strong>Strengths:</strong> Efficient for assessing knowledge across a large
                    number of learners simultaneously. Provides standardised, easily comparable
                    results. Good for assessing recall of regulations, theory, and procedures.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Limitations:</strong> Cannot assess practical competence directly.
                    Learners with dyslexia or limited literacy may be disadvantaged. Tests can
                    assess recall without testing genuine understanding or application.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Simulation</p>
                  <p className="text-white text-xs leading-relaxed mb-1">
                    <strong>Strengths:</strong> Allows assessment of tasks that are too dangerous,
                    rare, or expensive to assess in the real workplace (e.g. emergency procedures,
                    fault scenarios). Provides a controlled environment for consistent assessment.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Limitations:</strong> May not fully replicate real workplace conditions.
                    Learners may behave differently in a simulated environment compared to a live
                    site. Should supplement, not replace, real workplace observation where
                    practicable.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Professional Discussion</p>
                  <p className="text-white text-xs leading-relaxed mb-1">
                    <strong>Strengths:</strong> Allows in-depth exploration of the learner&rsquo;s
                    understanding, reasoning, and reflective practice. More natural and less
                    stressful than formal questioning. Particularly effective for assessing
                    higher-order thinking.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Limitations:</strong> Requires skilled facilitation to ensure all
                    criteria are covered. Can be difficult to standardise across assessors. Must be
                    recorded (usually audio) to provide verifiable evidence.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Portfolio of Evidence</p>
                  <p className="text-white text-xs leading-relaxed mb-1">
                    <strong>Strengths:</strong> Gathers evidence from multiple sources over time,
                    building a comprehensive picture of competence. Allows the learner to
                    demonstrate competence across different contexts and tasks. Promotes reflective
                    practice.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong>Limitations:</strong> Authenticity can be difficult to verify without
                    supplementary observation or questioning. Can become a &ldquo;box-ticking&rdquo;
                    exercise if not managed well. Quality of evidence is more important than
                    quantity.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Choosing the Right Method in Construction
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                In the electrical trade, the most common and most valid assessment method for
                practical competence is direct observation. When you want to know whether an
                apprentice can install a ring final circuit safely and correctly, the most valid
                approach is to watch them do it. However, observation alone may not be sufficient
                &mdash; you might also need oral questioning to assess the underpinning knowledge
                (e.g. &ldquo;Why is the CPC connected at every point in the ring?&rdquo;) and
                portfolio evidence to demonstrate competence across different circuit types.
              </p>
              <p className="text-white text-sm leading-relaxed">
                Professional discussion is particularly valuable for assessing knowledge that is
                difficult to observe directly &mdash; for example, a learner&rsquo;s understanding
                of why certain design decisions are made, their awareness of relevant regulations,
                or their ability to reflect on what they would do differently next time. The key
                principle is to match the method to what you are assessing: practical skills need
                practical methods; knowledge and understanding need questioning and discussion.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04 — Assessment Planning & Competence-Based Language */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">04</span>
            </div>
            <h2 className="text-xl font-semibold text-white">
              Assessment Planning and Competence-Based Language
            </h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Effective assessment does not happen by accident. It requires deliberate planning:
              what will be assessed, when, how, and what evidence will be collected. An assessment
              plan ensures that both the assessor and the learner know exactly what is expected,
              reduces anxiety, and provides a transparent record that can be reviewed by internal
              quality assurance.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">Elements of an Assessment Plan</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                A well-structured assessment plan for a practical electrical task should include:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>What:</strong> The specific NVQ unit, learning outcomes, and assessment
                    criteria to be assessed. Be specific &mdash; &ldquo;Unit 304, LO2,
                    AC2.1&ndash;2.5&rdquo; is better than &ldquo;installation work&rdquo;.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>When:</strong> The date, time, and expected duration. Both the assessor
                    and the learner need to be available and prepared. Allow enough time for the
                    task to be completed without rushing.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Where:</strong> The site or workshop location. Consider whether the
                    environment is suitable for the assessment and whether health and safety
                    requirements are met.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>How:</strong> The assessment methods to be used (observation, oral
                    questioning, professional discussion, portfolio review) and how evidence will be
                    recorded (written notes, photographs, audio recording).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Special requirements:</strong> Any reasonable adjustments for the
                    learner, additional support needed, or specific resources required (tools,
                    materials, access to circuits).
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Construction Example: Consumer Unit Assessment Plan
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                An assessor planning to observe an apprentice installing a consumer unit might
                structure their plan as follows: The assessment will cover Unit 304 (Installation of
                wiring systems), learning outcomes 1 and 2, on Tuesday at 09:00 at the domestic new
                build on Maple Drive. The assessment will use direct observation of the full
                installation process (approximately 3 hours), supplemented by oral questioning
                during natural breaks in the work to assess underpinning knowledge of circuit
                protection selection, IP ratings, and BS 7671 requirements.
              </p>
              <p className="text-white text-sm leading-relaxed">
                Evidence will be recorded using the standard observation recording template, with
                photographs of key stages (cable entries, busbar connections, labelling). The
                apprentice has been briefed on the assessment criteria and understands what will be
                observed. No reasonable adjustments are required on this occasion. The assessor will
                provide formative feedback at the end of the observation, followed by a formal
                assessment decision within 48 hours.
              </p>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-elec-yellow text-sm font-semibold mb-2">Key Definition</p>
                  <p className="text-white text-sm leading-relaxed">
                    <strong>&ldquo;Not yet competent&rdquo;</strong> means the learner has not
                    demonstrated sufficient evidence against the standard on this occasion. It is
                    not a judgement of the person. It does not mean the learner is incapable &mdash;
                    it means they have not yet provided enough evidence to satisfy the assessor that
                    they can consistently perform to the required standard. The correct terms in
                    competence-based assessment are always &ldquo;competent&rdquo; or &ldquo;not yet
                    competent&rdquo; &mdash; never &ldquo;pass&rdquo; or &ldquo;fail&rdquo;.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">Why Language Matters</h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                The shift from &ldquo;pass/fail&rdquo; to &ldquo;competent/not yet competent&rdquo;
                is not merely cosmetic &mdash; it reflects a fundamentally different philosophy.
                Traditional pass/fail assessment measures performance against a percentage threshold
                (e.g. 70% to pass). Competence-based assessment measures performance against a
                standard &mdash; can this person do this task to the required level, consistently
                and safely?
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                The word &ldquo;fail&rdquo; carries a heavy emotional weight. It implies a permanent
                verdict on the person: &ldquo;you are a failure.&rdquo; The phrase &ldquo;not yet
                competent&rdquo; is future-focused: it says &ldquo;you have not demonstrated this
                yet, but you can, and here is what you need to do next.&rdquo; This distinction has
                a direct impact on learner motivation, self-confidence, and willingness to engage
                with the assessment process.
              </p>
              <p className="text-white text-sm leading-relaxed">
                As a mentor or assessor, you must model this language consistently. If you say
                &ldquo;you failed your observation&rdquo; to an apprentice, you have undermined the
                entire competence-based approach. If you say &ldquo;you are not yet competent
                against criteria 2.3 and 2.4 &mdash; here is what we need to work on before your
                next assessment opportunity,&rdquo; you have maintained the learner&rsquo;s dignity
                while being clear about what needs to improve.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 3 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ── FAQs ────────────────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <HelpCircle className="h-5 w-5 text-rose-400" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
                <h3 className="text-sm font-medium text-rose-400 mb-2">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Quiz ────────────────────────────────────────────────── */}
        <Quiz questions={quizQuestions} />

        {/* ── Bottom Navigation ───────────────────────────────────── */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/5">
          <Button
            variant="ghost"
            asChild
            className="text-white hover:text-white hover:bg-white/5 touch-manipulation min-h-[44px]"
          >
            <Link to="../md-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
          <Button
            asChild
            className="bg-rose-500 hover:bg-rose-500/90 text-white touch-manipulation min-h-[44px]"
          >
            <Link to="../md-module-4-section-2">
              Observation &amp; Questioning Skills
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
