import {
  ArrowLeft,
  FileText,
  CheckCircle,
  Camera,
  AlertTriangle,
  Eye,
  BookOpen,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'evidence-types',
    question:
      'Which type of NVQ evidence is considered the strongest because it involves the assessor directly observing the apprentice performing the task?',
    options: [
      'Witness testimony written by the mentor',
      'Direct observation by the NVQ assessor',
      'A reflective account written by the apprentice',
      'Photographs of completed work',
    ],
    correctIndex: 1,
    explanation:
      'Direct observation by the NVQ assessor is the strongest form of evidence because it is first-hand verification of competence. The assessor witnesses the apprentice performing the task in real time, which provides valid, authentic, and current evidence that cannot be fabricated. Other evidence types are valuable but are considered supplementary to direct observation.',
  },
  {
    id: 'vacsr-current',
    question:
      'In the VACSR evidence quality framework, what does the "C" (Current) criterion mean?',
    options: [
      'The evidence must relate to the current version of BS 7671',
      "The evidence must be recent enough to reflect the apprentice's current level of competence",
      'The evidence must be collected during the current academic year only',
      'The evidence must show work on current (live) electrical circuits',
    ],
    correctIndex: 1,
    explanation:
      'The "C" in VACSR stands for Current, meaning the evidence must be recent enough to demonstrate the apprentice\'s current level of competence. Evidence from two years ago may not reflect what the apprentice can do today. Generally, evidence should be from within the last 12 months to be considered current, though this may vary depending on the awarding body.',
  },
  {
    id: 'portfolio-mistake',
    question:
      'An apprentice submits 20 photographs of identical twin socket installations as evidence for their NVQ portfolio. What is the main problem with this evidence?',
    options: [
      'Photographs are not accepted as NVQ evidence',
      'The evidence lacks range — it shows repetition of the same task rather than breadth of competence',
      'The apprentice should have submitted 30 photographs instead',
      'Socket installations are too simple to count as evidence',
    ],
    correctIndex: 1,
    explanation:
      'The main problem is lack of range. While the 20 photographs prove the apprentice can install twin sockets, they do not demonstrate breadth of competence across different types of work. The NVQ requires evidence of competence across a range of activities, environments, and complexity levels. The portfolio should include diverse evidence — different circuits, different environments (domestic, commercial), different types of accessories and containment.',
  },
];

const faqs = [
  {
    question:
      'How many pieces of evidence does an apprentice typically need for a complete NVQ portfolio?',
    answer:
      'There is no fixed number of evidence pieces required. The portfolio needs sufficient evidence to demonstrate competence across all the units and assessment criteria in the qualification. Quality matters more than quantity. A well-written witness testimony that covers multiple assessment criteria is worth more than dozens of photographs that only show finished work without context. The NVQ assessor will guide the apprentice on whether their evidence is sufficient, but as a general guide, each unit typically requires 3-5 pieces of robust evidence covering the full range of assessment criteria within that unit.',
  },
  {
    question: 'Can evidence from college workshops be used in the NVQ portfolio?',
    answer:
      'Yes, evidence from college workshops can be used, but it should not form the majority of the portfolio. The NVQ is a work-based qualification, so assessors expect to see primarily work-based evidence from real site installations. College workshop evidence is useful for supplementing areas where the apprentice has not had the opportunity to demonstrate a particular skill on site — for example, if their employer does not do commercial three-phase work, a college workshop exercise could provide evidence for that unit. However, the assessor will want to see that the majority of evidence comes from genuine work-based activity.',
  },
  {
    question: 'What makes a good witness testimony versus a poor one?',
    answer:
      'A good witness testimony is specific, detailed, and references the assessment criteria it is covering. It describes what the apprentice did, how they did it, the standard they achieved, and any relevant decisions they made. For example: "On 15th March 2025, I observed Jordan carry out safe isolation of a single-phase consumer unit in accordance with GS 38 guidance, using a proving unit before and after testing. Jordan correctly identified and locked off the supply, tested for dead, and applied warning notices before commencing work on the installation." A poor witness testimony is vague and generic: "Jordan did some electrical work today and it was fine." The poor version tells the assessor nothing about what was actually done or to what standard.',
  },
  {
    question: 'Who can write witness testimonies for an NVQ portfolio?',
    answer:
      'Witness testimonies can be written by anyone who directly observed the work being performed and is competent to judge the standard of that work. In practice, this is most commonly the site mentor, a qualified electrician supervising the apprentice, or the employer. The witness must sign and date the testimony and include their name, job title, and relationship to the apprentice. Witness testimonies from people who did not actually observe the work are invalid and could jeopardise the entire portfolio if discovered during verification. The NVQ assessor may contact witnesses to verify testimonies, so only include genuine observations.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Which of the following is NOT a recognised type of NVQ evidence?',
    options: [
      'Direct observation by the NVQ assessor',
      'Witness testimony from the site mentor',
      'Social media posts showing the apprentice at work',
      'Professional discussion between the apprentice and assessor',
    ],
    correctAnswer: 2,
    explanation:
      'Social media posts are not recognised as formal NVQ evidence. Recognised evidence types include direct observation, witness testimony, professional discussion, work products, photographs with context, and reflective accounts. All evidence must meet the VACSR quality criteria to be accepted.',
  },
  {
    id: 2,
    question: 'What does the "V" in the VACSR evidence quality framework stand for?',
    options: [
      'Verified — the evidence has been checked by the assessor',
      'Valid — the evidence is relevant to the assessment criteria being claimed',
      'Visual — the evidence includes photographs or video',
      'Voluntary — the evidence was produced without prompting',
    ],
    correctAnswer: 1,
    explanation:
      'The "V" stands for Valid, meaning the evidence must be relevant to the specific assessment criteria being claimed. Evidence that demonstrates excellent competence but does not relate to the unit being assessed is not valid for that unit. The mentor should help the apprentice map each piece of evidence to the correct assessment criteria.',
  },
  {
    id: 3,
    question: 'What does the "A" in VACSR stand for?',
    options: [
      'Accurate — the evidence must be factually correct',
      'Approved — the evidence must be pre-approved by the assessor',
      "Authentic — the evidence must be the apprentice's own work",
      'Assessed — the evidence must have been formally graded',
    ],
    correctAnswer: 2,
    explanation:
      'The "A" stands for Authentic, meaning the evidence must genuinely be the apprentice\'s own work. The apprentice must have personally performed the task or produced the work product. Evidence that was produced by someone else, even if the apprentice was present, is not authentic. Authenticity is verified through cross-referencing with witness testimonies, professional discussions, and assessor observations.',
  },
  {
    id: 4,
    question:
      'A mentor spots an opportunity for NVQ evidence during a domestic consumer unit change. What should they do?',
    options: [
      'Wait until the job is finished and then write a brief note about it',
      'Brief the apprentice before starting, identify which NVQ units apply, capture evidence during the work, and write a detailed witness testimony afterwards',
      'Tell the apprentice to take a photograph of the finished consumer unit',
      'Let the NVQ assessor decide whether it counts as evidence',
    ],
    correctAnswer: 1,
    explanation:
      'The best approach is proactive: brief the apprentice before starting (so they know which competencies they are demonstrating), identify the relevant NVQ units and assessment criteria, capture evidence during the work (photographs at key stages, not just the finished product), and write a detailed witness testimony afterwards that references specific assessment criteria. This planned approach produces much higher quality evidence than retrospective note-taking.',
  },
  {
    id: 5,
    question: 'Which of the following best describes the "S" (Sufficient) criterion in VACSR?',
    options: [
      'There is enough evidence to fully demonstrate competence across all the assessment criteria for the unit',
      'The evidence is at least 10 pages long',
      'The apprentice has submitted at least 5 pieces of evidence per unit',
      'The evidence has been collected over a sufficient period of time (minimum 6 months)',
    ],
    correctAnswer: 0,
    explanation:
      'Sufficient means there is enough evidence to fully demonstrate competence across all the assessment criteria for the unit being claimed. This is about coverage, not volume. One comprehensive witness testimony that covers multiple criteria may be more sufficient than ten photographs that only show finished work without demonstrating process or decision-making.',
  },
  {
    id: 6,
    question: 'Why is a reflective account valuable as NVQ evidence?',
    options: [
      'It is the easiest type of evidence to produce and requires the least effort',
      "It demonstrates the apprentice's ability to evaluate their own performance, identify learning, and apply knowledge",
      'It counts for double marks compared to other evidence types',
      'It replaces the need for witness testimony from the mentor',
    ],
    correctAnswer: 1,
    explanation:
      'A reflective account demonstrates higher-order thinking — the apprentice is not just describing what they did, but evaluating how well they did it, what they learned, what they would do differently, and how the experience connects to their wider learning. This demonstrates understanding and self-awareness, which are key competencies in themselves. Reflective accounts complement (but do not replace) other evidence types.',
  },
  {
    id: 7,
    question:
      'What is the biggest risk of leaving NVQ portfolio building until the final year of the apprenticeship?',
    options: [
      'The college may charge an additional fee for late submission',
      'Critical evidence opportunities from earlier stages will have been missed and cannot be recreated',
      'The apprentice will have forgotten how to write English',
      'The NVQ assessor will refuse to assess a late portfolio',
    ],
    correctAnswer: 1,
    explanation:
      'The biggest risk is that evidence opportunities from earlier stages — particularly Stage 1 foundation work and Stage 2 development work — will have been missed entirely. You cannot retrospectively create evidence for work that was done two years ago without a witness testimony or photographs. Portfolio building should start from day one and continue throughout the apprenticeship, with the mentor actively identifying and capturing evidence opportunities at every stage.',
  },
  {
    id: 8,
    question:
      'A witness testimony states: "The apprentice did some wiring today and it was OK." Why is this inadequate?',
    options: [
      'It is too short — witness testimonies must be at least one page long',
      'It does not specify what the apprentice actually did, to what standard, in what context, or reference any assessment criteria',
      'Only the NVQ assessor can write witness testimonies',
      'It should have been written by the apprentice, not the mentor',
    ],
    correctAnswer: 1,
    explanation:
      'This testimony is inadequate because it is vague and non-specific. It does not describe what type of wiring was done, what techniques were used, what standard was achieved, what decisions the apprentice made, or which assessment criteria the evidence relates to. A good witness testimony is specific, detailed, and references the relevant NVQ unit and assessment criteria so the assessor can directly map the evidence to the qualification requirements.',
  },
];

export default function MDModule3Section2() {
  useSEO({
    title: 'NVQ Evidence & Portfolio Building | Mentoring Module 3.2',
    description:
      'Types of NVQ evidence, VACSR quality principles, generating evidence opportunities on site, common portfolio mistakes, and writing effective witness testimony.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../md-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <FileText className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            NVQ Evidence &amp; Portfolio Building
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            How to generate, capture, and present high-quality NVQ evidence that demonstrates
            genuine competence across the full range of electrical work
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Evidence types:</strong> Observation, testimony, discussion, products,
                photos
              </li>
              <li>
                <strong>Quality:</strong> VACSR &mdash; Valid, Authentic, Current, Sufficient,
                Reliable
              </li>
              <li>
                <strong>Timing:</strong> Build the portfolio from day one, not the final year
              </li>
              <li>
                <strong>Common mistakes:</strong> Repetitive evidence, poor testimony, no range
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">For Mentors</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Spot opportunities:</strong> Every job is potential NVQ evidence
              </li>
              <li>
                <strong>Write well:</strong> Detailed, specific witness testimonies
              </li>
              <li>
                <strong>Map evidence:</strong> Link each piece to NVQ units and criteria
              </li>
              <li>
                <strong>Check range:</strong> Ensure diversity of environments and tasks
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Identify the six main types of NVQ evidence and explain the strengths and limitations of each',
              'Apply the VACSR quality framework to evaluate whether evidence meets the required standard',
              'Proactively identify and generate evidence opportunities within normal work activities',
              'Write detailed, specific witness testimonies that reference NVQ assessment criteria',
              'Recognise common portfolio mistakes including lack of range, repetitive evidence, and poor testimony quality',
              'Plan a portfolio-building strategy that starts from day one and ensures coverage across all required units',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Types of Evidence */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Types of Evidence
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                NVQ portfolios accept several types of evidence, each with different strengths. A
                well-built portfolio uses a <strong>combination of evidence types</strong> to
                provide a comprehensive picture of the apprentice&rsquo;s competence. Relying on a
                single type of evidence &mdash; such as photographs alone &mdash; will never produce
                a portfolio that meets the required standard.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-3">
                  The Six Main Evidence Types
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Eye className="h-4 w-4 text-rose-400" />
                      <p className="text-white font-medium">Direct Observation</p>
                    </div>
                    <p className="text-sm text-white">
                      The NVQ assessor directly watches the apprentice performing a task. The
                      strongest form of evidence &mdash; first-hand verification of competence.
                      Cannot be fabricated.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="h-4 w-4 text-rose-400" />
                      <p className="text-white font-medium">Witness Testimony</p>
                    </div>
                    <p className="text-sm text-white">
                      A written statement from someone who observed the apprentice working (usually
                      the mentor). Must be detailed, specific, signed, and dated. References
                      assessment criteria.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="h-4 w-4 text-rose-400" />
                      <p className="text-white font-medium">Professional Discussion</p>
                    </div>
                    <p className="text-sm text-white">
                      A structured conversation between the apprentice and assessor, exploring the
                      apprentice&rsquo;s knowledge and understanding. Particularly useful for
                      assessing underpinning knowledge that cannot be observed directly.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="h-4 w-4 text-rose-400" />
                      <p className="text-white font-medium">Work Products</p>
                    </div>
                    <p className="text-sm text-white">
                      Physical outputs of the apprentice&rsquo;s work &mdash; completed test
                      certificates, drawings, risk assessments, method statements, or other
                      documentation produced as part of real work.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Camera className="h-4 w-4 text-rose-400" />
                      <p className="text-white font-medium">Photographs</p>
                    </div>
                    <p className="text-sm text-white">
                      Visual records of completed work. Most useful when annotated with descriptions
                      of what was done, when, and by whom. Photographs alone (without context) are
                      weak evidence.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="h-4 w-4 text-rose-400" />
                      <p className="text-white font-medium">Reflective Accounts</p>
                    </div>
                    <p className="text-sm text-white">
                      Written by the apprentice, describing what they did, why they made certain
                      decisions, what they learned, and what they would do differently. Demonstrates
                      self-awareness and deeper understanding.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The <strong>mentor&rsquo;s primary contribution</strong> to the portfolio is through
                witness testimonies. As the person who observes the apprentice&rsquo;s day-to-day
                work, the mentor is uniquely placed to provide detailed accounts of the
                apprentice&rsquo;s competence across a wide range of activities. A well-written
                witness testimony from a competent mentor carries significant weight with the NVQ
                assessor.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Remember</p>
                <p className="text-sm text-white">
                  Evidence is not the same as proof of attendance. A photograph of a finished
                  consumer unit proves the consumer unit exists &mdash; it does not prove the
                  apprentice wired it, that they did it safely, or that they understood why they
                  made specific decisions. <strong>Context is everything.</strong> Pair photographs
                  with witness testimonies that describe the process, decisions, and competence
                  demonstrated.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: SMART Evidence & VACSR Principles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            VACSR Evidence Quality Principles
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every piece of NVQ evidence must meet the <strong>VACSR quality criteria</strong>.
                This framework ensures that evidence is robust enough to withstand internal and
                external verification. The mentor should use VACSR as a mental checklist when
                generating or reviewing evidence.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-3">The Five VACSR Criteria</p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">V &mdash; Valid</p>
                    <p className="text-sm text-white">
                      The evidence must be relevant to the assessment criteria being claimed. A
                      brilliant piece of evidence about cable containment is not valid if it is
                      being used to claim competence in inspection and testing. The mentor should
                      help the apprentice map each piece of evidence to the correct NVQ unit and
                      criteria.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">A &mdash; Authentic</p>
                    <p className="text-sm text-white">
                      The evidence must genuinely be the apprentice&rsquo;s own work. If the mentor
                      completed the terminations while the apprentice watched, that is not authentic
                      evidence of the apprentice&rsquo;s competence. Authenticity is verified
                      through cross-referencing with observations, testimonies, and professional
                      discussions.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">C &mdash; Current</p>
                    <p className="text-sm text-white">
                      The evidence must be recent enough to reflect the apprentice&rsquo;s current
                      competence. Evidence from two years ago may not represent what the apprentice
                      can do today. As a general guide, evidence should be from within the last 12
                      months. This is why portfolio building must be ongoing, not left to the end.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">S &mdash; Sufficient</p>
                    <p className="text-sm text-white">
                      There must be enough evidence to fully cover all the assessment criteria for
                      the unit being claimed. A single photograph is rarely sufficient on its own.
                      Sufficiency is about coverage, not volume &mdash; one detailed witness
                      testimony may cover multiple criteria more effectively than ten brief notes.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">R &mdash; Reliable</p>
                    <p className="text-sm text-white">
                      The evidence must be trustworthy and consistent. If a witness testimony
                      describes excellent performance but photographs show poor workmanship, the
                      evidence is not reliable. Reliability is strengthened when multiple evidence
                      types corroborate each other.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Safe Isolation
                  </p>
                </div>
                <p className="text-sm text-white">
                  Your apprentice carries out a safe isolation procedure on a single-phase consumer
                  unit before commencing work. To generate VACSR-compliant evidence, you would:
                </p>
                <ul className="text-sm text-white space-y-1 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Valid:</strong> Map it to the safe isolation unit in the NVQ
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Authentic:</strong> The apprentice personally performed every step
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Current:</strong> It happened today, reflecting current competence
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Sufficient:</strong> Your witness testimony covers all criteria in the
                      unit
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Reliable:</strong> Photograph of lock-off corroborates the testimony
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Generating & Validating Evidence Opportunities */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Generating &amp; Validating Evidence Opportunities
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The mentor&rsquo;s ability to <strong>spot evidence opportunities</strong> within
                normal day-to-day work is one of the most valuable contributions they make to the
                apprentice&rsquo;s portfolio. Every job the apprentice works on is potential
                evidence &mdash; the mentor&rsquo;s job is to identify which NVQ units and criteria
                can be evidenced, brief the apprentice beforehand, and capture the evidence during
                and after the work.
              </p>

              <p>
                This requires the mentor to be <strong>familiar with the NVQ unit structure</strong>
                . You do not need to memorise every assessment criterion, but you should have a
                working knowledge of the main units and the types of evidence that each one
                requires. Keep a copy of the NVQ assessment plan accessible and refer to it
                regularly when planning work for your apprentice.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Example: Consumer Unit Installation as Evidence
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  A single consumer unit change can generate evidence for multiple NVQ units:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Safe isolation:</strong> Proving dead, lock-off, warning notices
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Installation competence:</strong> Terminations, circuit
                      identification, labelling
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Inspection and testing:</strong> Initial verification, recording
                      results
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Health and safety:</strong> PPE, risk assessment, safe working
                      practices
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Documentation:</strong> Electrical installation certificate, test
                      results
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The key is to <strong>plan evidence capture in advance</strong>, not try to
                reconstruct it afterwards. Before starting a job, ask yourself: &ldquo;Which NVQ
                units could this job provide evidence for? What do I need to observe, photograph, or
                document?&rdquo; Brief the apprentice so they understand the dual purpose of the
                work &mdash; completing the job and generating quality evidence.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-2">
                  The Evidence Capture Process
                </p>
                <div className="text-sm text-white space-y-2">
                  <p>
                    <strong>1. Before the job:</strong> Identify NVQ units and criteria that apply.
                    Brief the apprentice on what you will be observing and why.
                  </p>
                  <p>
                    <strong>2. During the job:</strong> Observe the apprentice performing key tasks.
                    Take photographs at critical stages (not just the finished product). Note
                    specific decisions the apprentice made and why.
                  </p>
                  <p>
                    <strong>3. After the job:</strong> Write a detailed witness testimony while the
                    work is fresh. Have the apprentice write a reflective account. Collect any work
                    products (test certificates, drawings). File everything against the correct NVQ
                    unit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Common Portfolio Mistakes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Common Portfolio Mistakes
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Having reviewed hundreds of NVQ portfolios over the years, assessors consistently
                identify the same recurring problems. Understanding these common mistakes allows the
                mentor to <strong>prevent them before they happen</strong>, rather than requiring
                expensive and time-consuming remediation work at the end of the apprenticeship.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Five Most Common Mistakes</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">1. Insufficient Evidence</p>
                    <p className="text-sm text-white">
                      Not enough evidence to cover all the assessment criteria for a unit. Typically
                      caused by leaving portfolio building too late or not understanding how many
                      criteria each unit contains. The mentor should regularly review the portfolio
                      against the assessment plan to identify gaps early.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">
                      2. Repetitive Evidence &mdash; Lacks Range
                    </p>
                    <p className="text-sm text-white">
                      The classic example: 20 identical photographs of twin socket installations.
                      This proves the apprentice can install sockets, but it does not demonstrate
                      range. The NVQ requires evidence from different environments (domestic,
                      commercial, industrial), different types of work (installation, maintenance,
                      fault-finding), and different levels of complexity. Variety is essential.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">3. Missing Range of Environments</p>
                    <p className="text-sm text-white">
                      If the employer only works on domestic properties, the portfolio may have no
                      commercial or industrial evidence. The mentor should actively seek
                      opportunities for the apprentice to gain experience in different environments,
                      even if this means arranging short placements with other teams or companies.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">
                      4. Poorly Written Witness Testimony
                    </p>
                    <p className="text-sm text-white">
                      Vague, generic statements that tell the assessor nothing specific. &ldquo;The
                      apprentice did some wiring and it was fine&rdquo; is worthless. Witness
                      testimonies must describe what was done, how it was done, to what standard, in
                      what context, and reference the assessment criteria being claimed.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">5. Photographs Without Context</p>
                    <p className="text-sm text-white">
                      A photograph of a finished consumer unit proves the consumer unit exists. It
                      does not prove who wired it, when, to what standard, or what decisions were
                      made. Always annotate photographs with a description, date, location, and the
                      name of the apprentice who performed the work. Pair photographs with witness
                      testimonies for maximum evidence value.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-2">
                  Writing Effective Witness Testimony
                </p>
                <p className="text-sm text-white mb-3">
                  A good witness testimony follows a consistent structure:
                </p>
                <div className="text-sm text-white space-y-2">
                  <p>
                    <strong>1. Context:</strong> Date, location, type of installation, NVQ unit
                    being evidenced
                  </p>
                  <p>
                    <strong>2. Description:</strong> What the apprentice specifically did, step by
                    step, including any decisions they made and why
                  </p>
                  <p>
                    <strong>3. Standard:</strong> The quality of the work, compliance with
                    regulations, safety practices observed
                  </p>
                  <p>
                    <strong>4. Assessment criteria:</strong> Which specific criteria this evidence
                    covers (reference the unit number and criteria)
                  </p>
                  <p>
                    <strong>5. Signature:</strong> Witness name, job title, qualifications, date,
                    and signature
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Example: Good vs Poor Testimony
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-red-400 mb-1">Poor Testimony</p>
                    <p className="text-sm text-white italic">
                      &ldquo;Jordan did some wiring today on a house job. The work was OK and looked
                      neat. Signed: Dave Smith, Electrician.&rdquo;
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
                    <p className="text-sm font-medium text-green-400 mb-1">Good Testimony</p>
                    <p className="text-sm text-white italic">
                      &ldquo;On 15th March 2025, at 42 Elm Street, I observed Jordan carry out the
                      first fix wiring of a kitchen ring final circuit using 2.5mm&sup2; T&amp;E to
                      BS 7671 requirements. Jordan correctly calculated the cable route to avoid
                      safe zones, drilled through joists within the permitted limits, and made neat,
                      secure fixings at 300mm centres. Jordan identified the need for RCD protection
                      and discussed the circuit design with me before commencing. The work was
                      completed to a professional standard with good attention to conductor
                      identification and cable management. This evidence covers NVQ Unit 305
                      criteria 2.1, 2.3, and 3.1. Signed: Dave Smith, Approved Electrician, JIB
                      Grade AE. Date: 15/03/2025.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Key Point</p>
                <p className="text-sm text-white">
                  The difference between a portfolio that passes and one that requires rework is
                  almost always the <strong>quality of the witness testimonies</strong>. As a
                  mentor, your testimonies are the single most impactful contribution you make to
                  the apprentice&rsquo;s portfolio. Invest the time to write them properly. Five
                  minutes of detailed writing today saves hours of remediation work later.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../md-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../md-module-3-section-3">
              Next: Planning Learning Opportunities on Site
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
