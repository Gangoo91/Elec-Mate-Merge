import {
  ArrowLeft,
  ClipboardList,
  CheckCircle,
  Search,
  BarChart3,
  Briefcase,
  BookOpen,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'learning-opp',
    question:
      'A domestic rewire project is coming up next week. How many NVQ units could a well-planned domestic rewire potentially provide evidence for?',
    options: [
      '1 unit only — installation',
      '2 units — installation and testing',
      '4 or more units — safe isolation, installation, inspection and testing, health and safety, and documentation',
      'NVQ evidence can only be gathered at college, not on site',
    ],
    correctIndex: 2,
    explanation:
      'A domestic rewire is a rich learning opportunity that can provide evidence for 4 or more NVQ units including safe isolation procedures, installation competence (first fix and second fix), inspection and testing (initial verification), health and safety (risk assessment, PPE, safe working), and documentation (EIC, schedule of test results). The key is planning the evidence capture in advance so that opportunities are not missed.',
  },
  {
    id: 'tna-purpose',
    question:
      'What is the primary purpose of conducting a training needs analysis (TNA) for an apprentice?',
    options: [
      'To justify sending the apprentice on expensive external training courses',
      "To identify the gap between the apprentice's current competence and the competence required by their NVQ and role",
      'To create documentation that satisfies Ofsted inspectors',
      'To benchmark the apprentice against other apprentices in the company',
    ],
    correctIndex: 1,
    explanation:
      "The primary purpose of a TNA is to identify the gap between where the apprentice is now (current competence) and where they need to be (required competence as defined by their NVQ standard, the employer's expectations, and the JIB framework). This gap analysis then drives targeted learning opportunities, ensuring that the mentor focuses development time on the areas that need it most rather than repeating skills the apprentice has already mastered.",
  },
  {
    id: 'productivity-balance',
    question:
      'An employer says there is no time for apprentice learning because the job must be finished by Friday. What is the best response from the mentor?',
    options: [
      'Agree and focus entirely on productivity — learning can wait',
      'Explain that learning is embedded in productive work and show how the apprentice can develop skills while contributing to the job',
      'Tell the employer that apprentices are not supposed to do productive work',
      'Refuse to work on the job until learning time is guaranteed',
    ],
    correctIndex: 1,
    explanation:
      "The best approach is to demonstrate that learning and productivity are not mutually exclusive. With good planning, an apprentice can develop new skills while contributing to the productive output of the job. For example, letting the apprentice wire accessories (learning opportunity) while the mentor runs cables (productive output) means the job progresses while the apprentice develops. The mentor's skill is in identifying these embedded learning opportunities rather than treating learning as something separate from work.",
  },
];

const faqs = [
  {
    question: 'What if the employer only does one type of work (e.g. domestic only)?',
    answer:
      "This is a common challenge. The NVQ requires evidence from a range of environments and work types, so a purely domestic employer may not provide sufficient range. The mentor should discuss this with the employer and training provider early in the apprenticeship. Options include arranging short placements with other companies (with the employer's agreement), taking on occasional commercial or industrial subcontract work, using college workshop sessions for specialist activities, and attending manufacturer training days. The JIB and some training providers have brokered placement schemes specifically to address this issue. The key is to identify the gap early and plan for it, rather than discovering in the final year that the apprentice has no commercial experience.",
  },
  {
    question: 'How do I create a task-to-NVQ mapping matrix?',
    answer:
      "Start with a list of the common job types your company undertakes (e.g. domestic rewire, consumer unit change, commercial first fix, fire alarm installation). For each job type, identify which NVQ units and assessment criteria could be evidenced. Cross-reference this with the apprentice's current NVQ progress to identify which units still need evidence. This creates a matrix where you can match upcoming jobs to outstanding NVQ requirements. Keep the matrix simple — a spreadsheet or even a handwritten table works fine. Update it after each evidence capture session. Share it with the NVQ assessor at progress reviews so everyone is aligned on what evidence is still needed.",
  },
  {
    question: "How often should I review the apprentice's training needs?",
    answer:
      'A formal training needs analysis should be conducted at least every 3 months, aligned with NVQ progress reviews and JIB apprenticeship milestones. However, informal assessment should be continuous — every time you observe the apprentice working, you are gathering data on their current competence level. After each significant piece of work, ask yourself: "What did this reveal about their strengths and gaps?" Record your observations and use them to update the development plan. If you notice a sudden decline in performance or a persistent weakness in a specific area, do not wait for the next formal review — address it immediately.',
  },
  {
    question:
      'How do I handle the conflict between getting the job done and letting the apprentice learn?',
    answer:
      "This is the fundamental tension of mentoring an apprentice on a live construction site. The key is to plan ahead. At the start of each week, look at the upcoming work and identify which tasks the apprentice can lead on (learning opportunities) and which tasks require the mentor to take the lead (productivity priority). On time-critical days, the apprentice can still learn by observing and assisting — but on less pressured days, give them the lead and accept that the job may take slightly longer. Communicate openly with the employer about this balance. Most employers understand that investing time in the apprentice's development now pays dividends in productivity later. A well-trained apprentice becomes a productive team member much faster than one who was never given the chance to learn.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the most effective way to identify learning opportunities on a construction site?',
    options: [
      'Wait for the college to tell you what the apprentice needs to learn',
      "Review upcoming jobs against the apprentice's NVQ requirements and plan evidence capture in advance",
      'Let the apprentice choose which tasks they want to learn',
      'Focus only on tasks that are quick and easy to teach',
    ],
    correctAnswer: 1,
    explanation:
      "The most effective approach is proactive planning: review the upcoming workload, cross-reference it with the apprentice's NVQ requirements and current competence gaps, and plan which tasks can serve as learning and evidence opportunities. This ensures that learning is deliberate and targeted rather than accidental.",
  },
  {
    id: 2,
    question:
      'A domestic rewire project can potentially provide NVQ evidence for how many different units?',
    options: [
      '1 unit only — it is just installation work',
      '2 units — installation and testing',
      '4 or more units — including safe isolation, installation, I&T, health and safety, and documentation',
      'Domestic work cannot be used for NVQ evidence',
    ],
    correctAnswer: 2,
    explanation:
      "A well-planned domestic rewire can provide evidence for 4 or more NVQ units: safe isolation procedures, installation competence (first fix and second fix across multiple circuit types), inspection and testing (initial verification), health and safety compliance, and documentation (EIC, schedule of test results). The richness of the evidence depends on the mentor's ability to identify and capture opportunities throughout the job.",
  },
  {
    id: 3,
    question: 'What is a task-to-NVQ mapping matrix used for?',
    options: [
      "To track the apprentice's attendance at college",
      'To match job activities to NVQ units and assessment criteria so that evidence opportunities can be planned',
      "To calculate the apprentice's wages based on tasks completed",
      "To compare the apprentice's performance against industry benchmarks",
    ],
    correctAnswer: 1,
    explanation:
      'A task-to-NVQ mapping matrix cross-references the types of work the company undertakes with the NVQ units and assessment criteria that each job type can evidence. This allows the mentor to match upcoming jobs to outstanding NVQ requirements, ensuring that evidence opportunities are not missed and that the portfolio is built systematically across all required units.',
  },
  {
    id: 4,
    question: 'What is the primary purpose of a training needs analysis (TNA)?',
    options: [
      'To identify the gap between current competence and required competence and plan targeted development',
      "To create a paper trail that satisfies the training provider's auditors",
      'To rank apprentices in order of ability within the company',
      'To determine whether the apprentice should be dismissed',
    ],
    correctAnswer: 0,
    explanation:
      "A TNA identifies the gap between the apprentice's current competence level and the competence required by their NVQ standard, the employer's expectations, and the JIB framework. This gap analysis then informs the development plan, ensuring that learning opportunities are focused on the areas that need the most attention.",
  },
  {
    id: 5,
    question: 'How often should a formal training needs analysis be reviewed?',
    options: [
      'Once at the start of the apprenticeship and then never again',
      'Only when the NVQ assessor asks for one',
      'At least every 3 months, aligned with progress reviews and JIB milestones',
      'Every day before starting work',
    ],
    correctAnswer: 2,
    explanation:
      "A formal TNA should be reviewed at least every 3 months, aligned with NVQ progress reviews and JIB apprenticeship stage milestones. This ensures the development plan stays current and responsive to the apprentice's changing needs. Informal assessment should be continuous, with the mentor noting observations during daily work.",
  },
  {
    id: 6,
    question:
      'Which of the following is the best example of embedding learning within productive work?',
    options: [
      'Telling the apprentice to watch a training video during lunch break',
      "Having the apprentice wire the accessories on a domestic job while the mentor runs cables, then reviewing the apprentice's work together",
      'Sending the apprentice to a separate room to practice terminations on scrap cable',
      'Having the apprentice sweep up and tidy the van while the mentor does the electrical work',
    ],
    correctAnswer: 1,
    explanation:
      'Embedding learning within productive work means the apprentice develops skills while contributing to the job output. Having the apprentice wire accessories (a learning opportunity) while the mentor runs cables (maintaining productivity) allows both to happen simultaneously. The review afterwards reinforces learning and provides feedback.',
  },
  {
    id: 7,
    question: 'What is the purpose of a logbook sign-off process?',
    options: [
      'To prove the apprentice turned up for work each day',
      "To record and verify the apprentice's competence development, track progress against the training plan, and provide evidence of structured learning",
      'To calculate overtime payments for the apprentice',
      'To replace the need for NVQ portfolio evidence',
    ],
    correctAnswer: 1,
    explanation:
      "The logbook sign-off process records and verifies the apprentice's competence development over time. The mentor signs off tasks and competencies as the apprentice demonstrates them, creating a progressive record of development. This supports the NVQ portfolio (but does not replace it), provides evidence for progress reviews, and helps identify areas where the apprentice is progressing well or needs additional support.",
  },
  {
    id: 8,
    question:
      'An apprentice has strong domestic installation skills but no commercial experience. What should the mentor do?',
    options: [
      'Accept that the portfolio will only contain domestic evidence and hope the assessor does not notice',
      'Proactively arrange commercial experience through placements, subcontract work, or college workshops to ensure the portfolio demonstrates range',
      'Ask the apprentice to write fictional accounts of commercial work they have not done',
      'Wait until a commercial job comes along naturally — it will happen eventually',
    ],
    correctAnswer: 1,
    explanation:
      'The mentor should proactively address the gap by arranging commercial experience through legitimate means: short placements with other companies, involvement in commercial subcontract work, manufacturer training days, or college workshop sessions. The NVQ requires evidence of range across different environments, so the mentor must plan for this rather than hoping it happens by chance. Fabricating evidence is never acceptable and would invalidate the entire portfolio.',
  },
];

export default function MDModule3Section3() {
  useSEO({
    title: 'Planning Learning Opportunities on Site | Mentoring Module 3.3',
    description:
      'Identifying learning opportunities within normal work, matching tasks to NVQ units, training needs analysis, and balancing productivity with apprentice development.',
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
            <ClipboardList className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Planning Learning Opportunities on Site
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            How to identify, plan, and deliver structured learning opportunities within the daily
            reality of a working construction site
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Every job:</strong> A potential learning opportunity if planned properly
              </li>
              <li>
                <strong>Matrix:</strong> Map job tasks to NVQ units for systematic coverage
              </li>
              <li>
                <strong>TNA:</strong> Identify the gap between current and required competence
              </li>
              <li>
                <strong>Balance:</strong> Embed learning within productive work, not instead of it
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">For Mentors</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Plan ahead:</strong> Review next week&rsquo;s jobs for evidence
                opportunities
              </li>
              <li>
                <strong>Track gaps:</strong> Know which NVQ units still need evidence
              </li>
              <li>
                <strong>Logbooks:</strong> Sign off competencies progressively through the
                apprenticeship
              </li>
              <li>
                <strong>Communicate:</strong> Explain the learning-productivity balance to employers
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Identify learning opportunities within normal day-to-day work activities on a construction site',
              'Create a mapping matrix that matches job tasks to NVQ units and assessment criteria',
              'Conduct a training needs analysis to identify gaps between current and required competence',
              'Apply structured assessment tools to evaluate apprentice progress against the development plan',
              'Balance employer productivity needs with apprentice development requirements effectively',
              'Maintain accurate training records, logbooks, and progress reviews that demonstrate structured learning',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Identifying Learning Opportunities Within Normal Work */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Identifying Learning Opportunities Within Normal Work
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The best learning happens <strong>within real work</strong>, not separate from it.
                Every job an apprentice works on contains multiple learning opportunities &mdash;
                the mentor&rsquo;s skill is in recognising these opportunities and structuring them
                deliberately rather than leaving learning to chance.
              </p>

              <p>
                Too often, apprentices spend months on site without anyone explicitly identifying
                what they should be learning from each task. They absorb some skills through
                osmosis, but the learning is unstructured, inconsistent, and full of gaps. A mentor
                who <strong>plans learning opportunities</strong> transforms every job into a
                development exercise.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-3">
                  Example: A Domestic Rewire Covering 4+ NVQ Units
                </p>
                <p className="text-sm text-white mb-3">
                  A single domestic rewire project can provide structured learning across the
                  following areas:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Safe Isolation</p>
                    <p className="text-sm text-white">
                      Proving dead at the existing consumer unit, lock-off procedures, use of
                      voltage indicators and proving units. Direct evidence for the safe isolation
                      NVQ unit.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">First Fix Installation</p>
                    <p className="text-sm text-white">
                      Cable routing, containment selection, drilling through joists within safe zone
                      limits, back box installation, cable management. Evidence for installation
                      units.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Second Fix &amp; Consumer Unit</p>
                    <p className="text-sm text-white">
                      Terminating accessories, wiring the consumer unit, circuit identification and
                      labelling. Further evidence for installation competence across a range of
                      circuit types.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Inspection &amp; Testing</p>
                    <p className="text-sm text-white">
                      Initial verification of the completed installation. Continuity, insulation
                      resistance, polarity, earth fault loop impedance, RCD testing. Recording
                      results on the schedule of test results.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Commercial Jobs for Three-Phase Experience
                  </p>
                </div>
                <p className="text-sm text-white">
                  If your company undertakes commercial work, these jobs provide invaluable learning
                  opportunities that domestic work cannot. A commercial fit-out might cover
                  three-phase distribution, submain cabling, containment systems (trunking, basket,
                  conduit), emergency lighting, fire alarm interfaces, and building management
                  system connections. Even if the apprentice is not yet competent to carry out the
                  work independently, observing and assisting on commercial installations provides
                  evidence for the range requirements of the NVQ and broadens their understanding
                  beyond domestic work.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Key Point</p>
                <p className="text-sm text-white">
                  Learning opportunities do not need to be large or separate from normal work. Even
                  a simple task like replacing a socket outlet can be a learning opportunity if the
                  mentor asks: &ldquo;Why is this socket on an RCD? What regulation requires it?
                  What would you check before re-energising?&rdquo; The questions transform a
                  mundane task into a learning exercise.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Matching Job Tasks to NVQ Units and College Modules */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Matching Job Tasks to NVQ Units and College Modules
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>task-to-NVQ mapping matrix</strong> is the mentor&rsquo;s most powerful
                planning tool. It cross-references the types of work the company undertakes with the
                NVQ units and assessment criteria that each job type can evidence. This allows the
                mentor to plan evidence capture systematically rather than hoping that the right
                opportunities come along.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Search className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Creating Your Matrix</p>
                </div>
                <div className="text-sm text-white space-y-2">
                  <p>
                    <strong>Step 1:</strong> List all common job types your company undertakes
                    (domestic rewire, consumer unit change, commercial first fix, fire alarm
                    install, periodic inspection, etc.)
                  </p>
                  <p>
                    <strong>Step 2:</strong> For each job type, identify which NVQ units and
                    assessment criteria could be evidenced. Use the NVQ assessment plan as your
                    reference.
                  </p>
                  <p>
                    <strong>Step 3:</strong> Cross-reference this with the apprentice&rsquo;s
                    current portfolio to identify which units still need evidence.
                  </p>
                  <p>
                    <strong>Step 4:</strong> When assigning work for the coming week, prioritise
                    jobs that can fill portfolio gaps where possible.
                  </p>
                  <p>
                    <strong>Step 5:</strong> Update the matrix after each evidence capture session.
                    Share progress at NVQ review meetings.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-2">Example Matrix Entries</p>
                <div className="overflow-x-auto">
                  <div className="space-y-2 text-sm text-white min-w-0">
                    <div className="bg-white/5 border border-white/10 p-2 rounded">
                      <strong>Domestic rewire</strong> &rarr; Safe isolation, Installation (first
                      fix, second fix), I&amp;T (initial verification), H&amp;S, Documentation (EIC)
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2 rounded">
                      <strong>Consumer unit change</strong> &rarr; Safe isolation, Installation
                      (terminations, labelling), I&amp;T, Documentation (Minor Works)
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2 rounded">
                      <strong>Commercial first fix</strong> &rarr; Installation (containment, cable
                      management), H&amp;S (working at height, manual handling), Drawing
                      interpretation
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2 rounded">
                      <strong>Periodic inspection</strong> &rarr; I&amp;T (full range of tests),
                      Documentation (EICR), Fault diagnosis, Regulation knowledge
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The matrix also helps identify <strong>gaps in the company&rsquo;s workload</strong>
                . If your company does no commercial work, the matrix will clearly show which NVQ
                units cannot be evidenced through normal work. This early identification allows the
                mentor to plan alternative evidence sources (placements, college workshops, etc.)
                rather than discovering the gap at the end of the apprenticeship.
              </p>

              <p>
                Aligning site work with <strong>college modules</strong> adds another layer of
                effectiveness. If the apprentice is studying circuit design theory at college this
                term, assign them tasks on site that involve reading circuit drawings, calculating
                cable sizes, or discussing protection device selection. This reinforces the college
                learning with practical application and helps the apprentice see the relevance of
                what they are studying.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Training Needs Analysis */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Training Needs Analysis
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A training needs analysis (TNA) is the <strong>structured process</strong> of
                identifying the gap between an apprentice&rsquo;s current level of competence and
                the level required by their NVQ standard, the employer&rsquo;s expectations, and the
                JIB framework. It answers the fundamental question:{' '}
                <strong>
                  &ldquo;What does this apprentice need to learn next, and how will we teach
                  it?&rdquo;
                </strong>
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The TNA Process</p>
                </div>
                <div className="text-sm text-white space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">1. Define Required Competence</p>
                    <p className="text-sm text-white">
                      What should the apprentice be able to do at this stage of their development?
                      Use the JIB stage descriptors, NVQ assessment criteria, and college module
                      learning outcomes as benchmarks. Be specific &mdash; &ldquo;can install
                      circuits&rdquo; is too vague. &ldquo;Can correctly wire a ring final circuit
                      in T&amp;E, including terminations at the consumer unit, junction boxes, and
                      socket outlets, to BS 7671 requirements&rdquo; is specific.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">2. Assess Current Competence</p>
                    <p className="text-sm text-white">
                      What can the apprentice actually do right now? Use a combination of direct
                      observation, questioning, practical assessment tasks, review of previous work,
                      and discussion with the apprentice. Be honest &mdash; over-estimating current
                      competence leads to inappropriate task assignment and potential safety risks.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">3. Identify the Gap</p>
                    <p className="text-sm text-white">
                      The difference between required and current competence is the training need.
                      Prioritise gaps based on urgency (safety-critical skills first), relevance
                      (skills needed for current work), and NVQ requirements (units with approaching
                      assessment deadlines).
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">4. Plan Development Activities</p>
                    <p className="text-sm text-white">
                      For each identified gap, plan specific learning activities: supervised
                      practice on site, college workshop sessions, online learning, mentoring
                      discussions, manufacturer training, or observation of experienced
                      electricians. Set timescales and review dates.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-2">
                  Structured Assessment Tools
                </p>
                <p className="text-sm text-white mb-3">
                  Use a simple competence grid to track progress across key skill areas:
                </p>
                <div className="text-sm text-white space-y-2">
                  <p>
                    <strong>Level 1 &mdash; Awareness:</strong> The apprentice understands the
                    concept but has not yet performed the task
                  </p>
                  <p>
                    <strong>Level 2 &mdash; Assisted:</strong> The apprentice can perform the task
                    with direct guidance and supervision
                  </p>
                  <p>
                    <strong>Level 3 &mdash; Supervised:</strong> The apprentice can perform the task
                    independently but requires checking afterwards
                  </p>
                  <p>
                    <strong>Level 4 &mdash; Competent:</strong> The apprentice can consistently
                    perform the task to the required standard without supervision
                  </p>
                </div>
              </div>

              <p>
                Rate the apprentice against each key skill area using this scale. This gives you a
                visual map of their strengths and weaknesses, making it easy to identify where to
                focus development effort. Update the competence grid at least quarterly.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Balancing Productivity With Learning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Balancing Productivity With Learning
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This is the{' '}
                <strong>fundamental tension of mentoring on a live construction site</strong>. The
                employer needs jobs completed on time and to budget. The apprentice needs time and
                space to learn, make mistakes, and develop. The mentor must navigate this tension
                every day, finding ways to serve both needs without sacrificing either.
              </p>

              <p>
                The key insight is that{' '}
                <strong>learning and productivity are not mutually exclusive</strong>. With good
                planning, an apprentice can develop new skills while contributing to the productive
                output of a job. The mentor&rsquo;s skill is in structuring the work so that
                learning happens within productive activity, not instead of it.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Practical Strategies for Balance
                  </p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Split the task:</strong> On a domestic job, the mentor runs cables
                      (maintaining pace) while the apprentice wires accessories (developing skills).
                      Both tasks progress the job while the apprentice learns.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Time-box learning:</strong> Allocate the first hour of the day to
                      structured learning (e.g. the apprentice leads on a task with support) and the
                      rest of the day to productive work. This gives a predictable balance.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Use quieter periods:</strong> When waiting for materials, during
                      snagging, or at the end of a job phase, use the downtime for learning
                      discussions, I&amp;T practice, or portfolio review.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Delegate progressively:</strong> As the apprentice&rsquo;s competence
                      increases, delegate more complex tasks to them. This frees the mentor for
                      other work while giving the apprentice increasing responsibility.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Recording and Tracking: Logbooks and Training Records
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Accurate recording of learning activities serves multiple purposes: it provides
                  evidence for the 20% off-the-job training requirement, it supports the NVQ
                  portfolio, and it creates a clear record of the apprentice&rsquo;s development
                  over time. The key records to maintain are:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Training logbook:</strong> Day-to-day record of work activities,
                      learning undertaken, and competencies demonstrated. Signed by both the
                      apprentice and the mentor.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Off-the-job training log:</strong> Hours spent on qualifying
                      activities, cross-referenced with the 20% requirement.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Progress reviews:</strong> Regular (at least quarterly) formal reviews
                      with the apprentice, employer, and training provider. Documented with agreed
                      actions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Competence sign-off:</strong> The mentor signs off specific
                      competencies as the apprentice demonstrates them, creating a progressive
                      record of capability.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-500 mb-2">
                  The Logbook Sign-Off Process
                </p>
                <p className="text-sm text-white">
                  At the end of each week, review the logbook with the apprentice. Discuss what they
                  worked on, what they learned, what they found difficult, and what they would like
                  to do next. Sign off the entries. This weekly discipline takes 15 minutes but
                  creates a comprehensive record over time and gives the apprentice a regular
                  opportunity to reflect on their development. Do not let logbook entries pile up
                  &mdash; retrospective completion is always lower quality than real-time recording.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Remember</p>
                <p className="text-sm text-white">
                  An employer who invests in apprentice development gets a more competent, more
                  motivated, and more loyal team member in return. Frame learning not as a cost or a
                  distraction, but as an investment that pays dividends. A Stage 3 apprentice who
                  has been well-developed can handle significant independent work, freeing the
                  mentor for more complex tasks. A poorly developed Stage 3 apprentice is still a
                  liability who requires constant supervision.
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../md-module-3-section-4">
              Next: Managing Apprentice Wellbeing &amp; Pastoral Care
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
