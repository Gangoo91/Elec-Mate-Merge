import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Eye,
  Search,
  Brain,
  FileText,
  Shield,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  ClipboardList,
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
      'Before observing an apprentice perform a ring final continuity test, the assessor should first:',
    options: [
      'Start the stopwatch immediately',
      'Brief the learner on what will be observed and which criteria are being assessed',
      'Tell the learner the correct answers in advance',
      'Ask the learner to explain the theory of continuity testing before touching any equipment',
    ],
    correctIndex: 1,
    explanation:
      'The briefing stage is essential in structured observation. The learner should understand what will be observed, which assessment criteria apply, and how the observation will be recorded. This reduces anxiety and ensures the assessment is transparent and fair. It does not mean giving the learner the answers — it means setting clear expectations.',
  },
  {
    question:
      'Using Bloom\u2019s Taxonomy, the question "Why do we test continuity of the circuit protective conductor?" is at which level?',
    options: ['Remember', 'Understand', 'Apply', 'Analyse'],
    correctIndex: 1,
    explanation:
      'Asking "Why" requires the learner to explain the purpose or reasoning behind a procedure, which is at the Understand level of Bloom\u2019s Taxonomy. Remember-level questions would ask "What" (recall facts), while Apply-level questions would ask the learner to demonstrate the procedure.',
  },
  {
    question:
      'An assessor has known an apprentice for three years and considers them hardworking and reliable. During an observation, the assessor notices a minor error but overlooks it because "they always do it right normally". Which type of bias is this?',
    options: ['Recency effect', 'Confirmation bias', 'Halo effect', 'Anchoring bias'],
    correctIndex: 2,
    explanation:
      'This is the halo effect — the assessor\u2019s positive overall impression of the learner (hardworking, reliable) has caused them to overlook a specific error. The assessor is allowing their general favourable view to influence their judgement on a particular observation, which compromises the reliability of the assessment.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How do I observe without making the learner nervous?',
    answer:
      'Normalise observation by doing it regularly, not just for formal assessments. If the learner is only observed when it "counts", they will feel like they are under a spotlight. Build observation into everyday mentoring so it becomes routine. During formal observations, position yourself where you can see the work clearly without hovering over the learner\u2019s shoulder. Explain that you are there to see what they can do, not to catch them out. A brief, friendly briefing before you begin ("I\u2019m going to watch you carry out this continuity test — just work as you normally would") sets the right tone.',
  },
  {
    question: 'What if I cannot see everything during an observation?',
    answer:
      'It is not always possible to observe every step of a task — for example, you might miss a moment because you were recording evidence, or the learner may have completed a step before you arrived. If this happens, use oral questioning to fill the gap: "I noticed you had already connected the CPC when I looked over — can you talk me through how you made that connection?" Record what you observed directly and what you confirmed through questioning, and be honest in your documentation about which was which. Never claim to have observed something you did not see.',
  },
  {
    question: 'Should I ask questions during the observation or wait until afterwards?',
    answer:
      'Both approaches have value, and the best practice is usually a combination. During the observation, you can ask brief, non-disruptive questions at natural pauses in the work — for example, when the learner has finished one stage and is about to begin the next. These questions should be short and specific: "What reading are you expecting?" or "Why did you select that instrument?" Save longer, more reflective questions for after the observation, when the learner can give them proper attention without being distracted from their work. Never interrupt a safety-critical procedure with a question.',
  },
  {
    question: 'How can I be sure my assessment is free from bias?',
    answer:
      'You cannot eliminate bias entirely — it is a feature of human cognition, not a personal failing. What you can do is minimise its impact. Use standardised recording templates so you are assessing against criteria, not gut feeling. Participate in standardisation meetings where assessors compare judgements. Ask yourself regularly: "Would I make this same judgement if this were a different learner?" If you notice yourself thinking "they always get it right" or "they never listen", those are red flags for bias. Document your observations factually ("the learner connected the CPC at all points in the ring") rather than subjectively ("the learner did a good job").',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'What is the correct order of stages in a structured observation?',
    options: [
      'Observe, record, brief, feedback',
      'Brief, observe, record, feedback',
      'Record, observe, brief, feedback',
      'Feedback, brief, observe, record',
    ],
    correctAnswer: 1,
    explanation:
      'The correct sequence is: brief the learner (explain what will be observed and the criteria), observe the task, record the evidence, and then provide feedback. Briefing must come first to ensure transparency and reduce anxiety.',
  },
  {
    id: 2,
    question: 'Which of the following is a Remember-level question on Bloom\u2019s Taxonomy?',
    options: [
      '"Why do we perform an earth fault loop impedance test?"',
      '"What instrument is used to measure insulation resistance?"',
      '"Show me how you would connect the leads for a continuity test"',
      '"What could cause an unexpectedly high reading?"',
    ],
    correctAnswer: 1,
    explanation:
      'Remember-level questions ask learners to recall facts: "What is...?", "Name the...", "List the...". Asking what instrument is used requires simple recall of factual knowledge. The other options test understanding (why), application (show me), and analysis (what could cause).',
  },
  {
    id: 3,
    question: 'During an observation, the assessor should record:',
    options: [
      'Only the things the learner did wrong',
      'A general impression of how the observation went',
      'Factual, detailed descriptions of what was observed, linked to assessment criteria',
      'The assessor\u2019s personal feelings about the learner\u2019s performance',
    ],
    correctAnswer: 2,
    explanation:
      'Observation records must be factual, detailed, and linked to specific assessment criteria. Statements like "the learner correctly identified and isolated the circuit using the safe isolation procedure" are evidence-based. Subjective impressions or recording only errors do not provide valid assessment evidence.',
  },
  {
    id: 4,
    question: 'The halo effect in assessment occurs when:',
    options: [
      'An assessor is unfairly harsh on every learner they assess',
      'An assessor\u2019s positive overall impression of a learner causes them to overlook specific errors',
      'An assessor only remembers the most recent performance',
      'An assessor gives higher marks to learners they have not met before',
    ],
    correctAnswer: 1,
    explanation:
      'The halo effect occurs when a general positive impression of a learner (e.g. they are hardworking, likeable, or have a good track record) influences the assessor to rate specific aspects of their performance more favourably than the evidence warrants. It is one of the most common forms of assessor bias.',
  },
  {
    id: 5,
    question:
      '"Analyse why the insulation resistance reading might be lower than expected" is at which level of Bloom\u2019s Taxonomy?',
    options: ['Remember', 'Understand', 'Apply', 'Analyse'],
    correctAnswer: 3,
    explanation:
      'Analyse-level questions require learners to break down information, examine relationships, and determine causes. Asking a learner to analyse why a reading might be lower than expected requires them to consider multiple possible causes, evaluate the evidence, and draw conclusions — all hallmarks of analytical thinking.',
  },
  {
    id: 6,
    question:
      'Which of the following is an example of judgemental (rather than factual) language in an observation record?',
    options: [
      '"The learner isolated the supply using the correct safe isolation procedure"',
      '"The learner selected a Fluke 1664FC multifunction tester"',
      '"The learner did a really good job overall"',
      '"The learner obtained an insulation resistance reading of 245 M\u03A9"',
    ],
    correctAnswer: 2,
    explanation:
      '"Did a really good job overall" is subjective and judgemental — it expresses an opinion rather than describing observable evidence. The other options describe specific, observable actions or results that can be verified. Observation records should use factual language that another assessor could understand and agree with.',
  },
  {
    id: 7,
    question: 'The recency effect in assessment means:',
    options: [
      'The assessor gives more weight to the learner\u2019s most recent performance than to their earlier work',
      'The assessor only assesses using recent regulations',
      'The learner\u2019s evidence must be current',
      'The assessor has recently completed their own training',
    ],
    correctAnswer: 0,
    explanation:
      'The recency effect is a cognitive bias where the most recent information has a disproportionate influence on judgement. In assessment, this means an assessor might give too much weight to how the learner performed in the last few minutes of an observation, overlooking errors or strengths from earlier in the task.',
  },
  {
    id: 8,
    question:
      'When observing an apprentice, the assessor should look for all of the following EXCEPT:',
    options: [
      'Technical competence in performing the task',
      'Safe working practices and use of PPE',
      'The speed at which the apprentice completes the task compared to a qualified electrician',
      'Correct selection and use of tools and instruments',
    ],
    correctAnswer: 2,
    explanation:
      'While time management is relevant, comparing an apprentice\u2019s speed directly to a qualified electrician is unfair and inappropriate. Apprentices are still developing their competence and will naturally work more slowly. The focus should be on whether they perform the task correctly and safely, not on whether they match an experienced professional\u2019s pace.',
  },
];

/* ------------------------------------------------------------------ */
/*  Learning outcomes                                                  */
/* ------------------------------------------------------------------ */
const outcomes = [
  'Plan and conduct a structured observation following the brief\u2013observe\u2013record\u2013feedback sequence',
  'Identify what to look for during observation: technical competence, safe working, tool selection, regulation compliance',
  'Construct assessment questions at multiple levels of Bloom\u2019s Taxonomy',
  'Record observation evidence using factual, criterion-referenced language',
  'Recognise the four main types of assessor bias and their impact on assessment reliability',
  'Apply strategies to minimise bias and maintain objectivity in assessment decisions',
];

/* ================================================================== */
/*  COMPONENT                                                          */
/* ================================================================== */
export default function MDModule4Section2() {
  useSEO({
    title: 'Observation & Questioning Skills for Assessment | Module 4: Assessment & Evaluation',
    description:
      'Structured observation, Bloom\u2019s Taxonomy questioning, recording evidence, and assessor bias awareness for electrical mentors and assessors.',
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
            <Eye className="h-7 w-7 text-rose-400" />
          </div>
          <div className="flex justify-center mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-xs font-semibold">
                MODULE 4 &middot; SECTION 2
              </span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Observation &amp; Questioning Skills for Assessment
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            How to observe learners systematically, ask questions that probe understanding at
            different levels, record evidence accurately, and maintain objectivity throughout the
            assessment process.
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
                  Structured observation follows four stages: brief, observe, record, feedback
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Bloom&rsquo;s Taxonomy provides six levels of questioning from recall to
                  evaluation
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Observation records must be factual and criterion-referenced, not subjective
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Four types of assessor bias can compromise reliability: halo, recency, personal
                  relationship, and confirmation
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
                  Skilled observation is the most valid way to assess practical competence in the
                  electrical trade
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Good questioning separates learners who can do a task from those who understand
                  why
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Poor observation records cannot be used as assessment evidence and may not survive
                  IQA scrutiny
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>Unrecognised bias leads to inconsistent, unfair assessment decisions</span>
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
        {/*  SECTION 01 — Structured Observation                         */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">01</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Structured Observation</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Observation is the most valid assessment method for practical electrical work, but
              simply &ldquo;watching someone work&rdquo; is not the same as conducting a structured
              observation. Without a clear structure, observation becomes informal, inconsistent,
              and difficult to defend if challenged. A structured observation follows four stages:
              <strong> planning and briefing, observing, recording,</strong> and
              <strong> giving feedback</strong>.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Search className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">Stage 1: Planning and Briefing</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Before the observation begins, the assessor must plan what will be observed and
                brief the learner. Planning includes reviewing the relevant assessment criteria,
                preparing the recording template, and confirming that the workplace conditions are
                suitable. The learner should know in advance which criteria will be assessed, how
                the observation will be conducted, and approximately how long it will take.
              </p>
              <p className="text-white text-sm leading-relaxed">
                The briefing should be brief, friendly, and reassuring. Explain what you will be
                looking for, where you will position yourself, and that you may ask some questions
                during natural breaks in the work. Emphasise that this is an opportunity for the
                learner to demonstrate what they can do, not a test designed to catch them out. A
                good briefing significantly reduces learner anxiety and leads to a more
                representative performance.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">Stage 2: Observing</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                During the observation, position yourself where you can see the work clearly without
                being intrusive. The goal is to see the learner working as naturally as possible.
                Avoid hovering over their shoulder or standing so close that they feel watched and
                pressured. At the same time, you must be close enough to observe the detail of their
                work &mdash; tool selection, connection techniques, safe working practices.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                What should you look for? In the electrical trade, key observation points include:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Technical competence:</strong> Is the learner performing the task
                    correctly? Are connections secure? Are cable routes neat and compliant?
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Safe working:</strong> Is the learner following safe isolation
                    procedures? Are they wearing appropriate PPE? Are they aware of hazards in the
                    working area?
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Correct tools and instruments:</strong> Has the learner selected the
                    appropriate tools for the task? Are they using instruments correctly and reading
                    results accurately?
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Regulation compliance:</strong> Does the installation comply with BS
                    7671 and relevant building regulations? Is the learner following manufacturer
                    instructions?
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Time management:</strong> Is the learner working at a reasonable pace?
                    Are they planning their work logically, or jumping between tasks inefficiently?
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-2">
                Construction Example: Ring Final Continuity Test Observation Plan
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                An assessor plans to observe an apprentice performing continuity testing on a ring
                final circuit. The observation plan includes: checking the learner selects the
                correct instrument (low-resistance ohmmeter); confirming they perform the three-step
                test (end-to-end on L, N, and CPC, then cross-connect and measure at each point);
                observing whether they record results accurately; and noting whether they compare
                readings against expected values. The assessor prepares questions to ask at natural
                pauses: &ldquo;What is the maximum acceptable reading for R1 + R2 on this
                circuit?&rdquo; and &ldquo;What would you do if you got an unexpectedly high reading
                at one of the sockets?&rdquo;
              </p>
              <p className="text-white text-sm leading-relaxed">
                The assessor positions themselves where they can see the instrument display and the
                learner&rsquo;s connections, without crowding the working area. Notes are made on
                the observation recording template in real time, with each observation linked to the
                relevant assessment criterion.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Stages 3 and 4: Recording and Feedback
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                Recording should happen as close to real time as possible. Do not rely on memory
                &mdash; note key observations immediately, using the recording template. After the
                observation, provide feedback to the learner. Start with what they did well, then
                address any areas for development. This feedback structure is explored in detail in
                Section 4 of this module (Giving Assessment Decisions).
              </p>
              <p className="text-white text-sm leading-relaxed">
                The observation record is a formal assessment document that must be accurate,
                factual, and linked to criteria. It may be reviewed by the internal quality assurer,
                the awarding body, or the learner themselves. It must be clear enough that another
                assessor reading it would understand what was observed and how the assessment
                judgement was reached.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 1 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 02 — Bloom's Taxonomy Questioning                   */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">02</span>
            </div>
            <h2 className="text-xl font-semibold text-white">
              Bloom&rsquo;s Taxonomy Questioning During Observation
            </h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Observation tells you what a learner can <em>do</em>, but it does not always tell you
              whether they understand <em>why</em> they are doing it. A learner might follow a
              procedure perfectly because they have memorised the steps, without understanding the
              underlying principles. Questioning during and after observation allows you to probe
              the depth of a learner&rsquo;s understanding, and Bloom&rsquo;s Taxonomy (1956,
              revised by Anderson and Krathwohl in 2001) provides a framework for asking questions
              at progressively higher levels of cognitive demand.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">
                Bloom&rsquo;s Taxonomy Levels Mapped to Assessment Questions
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Level 1: Remember</p>
                  <p className="text-white text-xs leading-relaxed mb-1">
                    Recall facts, terms, procedures. The learner retrieves information from memory.
                  </p>
                  <p className="text-white text-xs leading-relaxed italic">
                    Example: &ldquo;What instrument is used to measure insulation resistance?&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Level 2: Understand</p>
                  <p className="text-white text-xs leading-relaxed mb-1">
                    Explain, describe, summarise. The learner demonstrates comprehension of the
                    concept.
                  </p>
                  <p className="text-white text-xs leading-relaxed italic">
                    Example: &ldquo;Why do we test continuity of the circuit protective
                    conductor?&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Level 3: Apply</p>
                  <p className="text-white text-xs leading-relaxed mb-1">
                    Use knowledge in a practical situation. The learner demonstrates the skill in
                    action.
                  </p>
                  <p className="text-white text-xs leading-relaxed italic">
                    Example: &ldquo;Show me how you connect the leads for a continuity test on this
                    circuit.&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Level 4: Analyse</p>
                  <p className="text-white text-xs leading-relaxed mb-1">
                    Break down information, examine causes, compare. The learner investigates and
                    reasons.
                  </p>
                  <p className="text-white text-xs leading-relaxed italic">
                    Example: &ldquo;What could cause this unexpectedly high reading?&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Level 5: Evaluate</p>
                  <p className="text-white text-xs leading-relaxed mb-1">
                    Make judgements, justify decisions. The learner assesses and defends a
                    conclusion.
                  </p>
                  <p className="text-white text-xs leading-relaxed italic">
                    Example: &ldquo;Is this reading acceptable? How do you know?&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Level 6: Create</p>
                  <p className="text-white text-xs leading-relaxed mb-1">
                    Design, plan, propose. The learner generates new solutions or approaches.
                  </p>
                  <p className="text-white text-xs leading-relaxed italic">
                    Example: &ldquo;How would you design the testing sequence for a more complex
                    distribution board with multiple sub-circuits?&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Using Bloom&rsquo;s Taxonomy in Practice
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                You do not need to ask questions at every level during every observation. The key
                principle is to vary your questioning so that you do not only ask Remember-level
                questions (which test recall but not understanding) and so that you stretch the
                learner&rsquo;s thinking appropriately. A good rule of thumb is to start with a
                Remember or Understand question to establish the baseline, then move up to Apply or
                Analyse to probe deeper understanding.
              </p>
              <p className="text-white text-sm leading-relaxed">
                For apprentices early in their training, you might focus on Remember and Understand
                questions, with some Apply. For more experienced learners nearing the end of their
                apprenticeship, you should be asking at the Analyse and Evaluate levels regularly.
                The ability to analyse why something is done a certain way, and to evaluate whether
                a result is acceptable, demonstrates genuine competence rather than rote learning.
              </p>
            </div>

            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-elec-yellow text-sm font-semibold mb-2">Remember</p>
                  <p className="text-white text-sm leading-relaxed">
                    The goal of questioning during observation is to assess understanding, not to
                    interrogate or catch the learner out. Frame questions conversationally:
                    &ldquo;Talk me through what you are doing here&rdquo; is less threatening than
                    &ldquo;Explain the theory behind this procedure.&rdquo; The learner should feel
                    they are having a professional discussion, not sitting an oral examination.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Inline Check 2 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 03 — Recording Observation Evidence                 */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">03</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Recording Observation Evidence</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              An observation is only as good as the record it produces. Without accurate, detailed,
              criterion-referenced documentation, even the most carefully conducted observation
              cannot serve as valid assessment evidence. The observation record must be clear enough
              that another assessor, reading it without having been present, could understand
              exactly what was observed and how the assessment judgement was reached.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <ClipboardList className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  What Makes a Good Observation Record
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                A high-quality observation record has several characteristics:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Factual, not subjective:</strong> Describe what you saw, not what you
                    thought about it. &ldquo;The learner connected the CPC at all points in the
                    ring&rdquo; is factual. &ldquo;The learner did a good job&rdquo; is subjective.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Criterion-referenced:</strong> Link each observation to the specific
                    assessment criterion it relates to. This makes it clear which criteria have been
                    met and which have not.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Detailed enough to be verifiable:</strong> Another assessor reading your
                    record should be able to understand what happened. &ldquo;The learner obtained
                    an insulation resistance reading of 245 M&Omega; between live conductors and
                    earth on circuit 3&rdquo; is verifiable. &ldquo;Readings were fine&rdquo; is
                    not.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Recorded in real time:</strong> Write notes during the observation, not
                    from memory hours later. Memory is unreliable, and details fade quickly. Use
                    shorthand if necessary and expand your notes immediately after the observation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>Includes questioning evidence:</strong> Record the questions you asked
                    and summarise the learner&rsquo;s responses. This supplements the observation
                    evidence and demonstrates that underpinning knowledge was assessed.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Factual vs Judgemental Language
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                One of the most common mistakes in observation recording is using judgemental
                language instead of factual descriptions. Judgemental language expresses an opinion
                (&ldquo;good work&rdquo;, &ldquo;poor technique&rdquo;, &ldquo;excellent
                understanding&rdquo;) rather than describing what was actually observed. This
                matters because opinions are not evidence &mdash; another assessor might have a
                different opinion about what constitutes &ldquo;good&rdquo; or &ldquo;poor&rdquo;
                work.
              </p>
              <div className="bg-white/5 rounded-lg p-3 mb-3">
                <p className="text-white text-sm font-medium mb-2">Judgemental (avoid):</p>
                <ul className="text-white text-xs space-y-1">
                  <li>
                    &ldquo;The learner did a good job on the consumer unit installation&rdquo;
                  </li>
                  <li>&ldquo;Cable management was poor&rdquo;</li>
                  <li>
                    &ldquo;The learner showed excellent knowledge of testing procedures&rdquo;
                  </li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-white text-sm font-medium mb-2">Factual (use):</p>
                <ul className="text-white text-xs space-y-1">
                  <li>
                    &ldquo;The learner correctly terminated all circuits in the consumer unit,
                    secured cables using appropriate fixings at 150mm intervals, and labelled each
                    circuit accurately&rdquo;
                  </li>
                  <li>
                    &ldquo;Two cables were not adequately supported within 300mm of the enclosure,
                    contrary to the manufacturer&rsquo;s installation instructions&rdquo;
                  </li>
                  <li>
                    &ldquo;When asked to explain the purpose of insulation resistance testing, the
                    learner correctly identified that it checks the integrity of insulation between
                    live conductors and earth, and stated the minimum acceptable reading of 1
                    M&Omega; for a 230V circuit&rdquo;
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Tips for Accurate Recording During Live Observation
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                Recording evidence while simultaneously observing can be challenging. Here are some
                practical strategies:
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    Use a pre-prepared template with the assessment criteria already listed &mdash;
                    you just need to tick and annotate, rather than writing everything from scratch
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    Develop a shorthand system for common observations (e.g. &ldquo;SI&rdquo; for
                    safe isolation completed, &ldquo;PPE&rdquo; for PPE worn correctly) and expand
                    these after the observation
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    Take photographs at key stages as supplementary evidence &mdash; these are
                    valuable records that complement your written notes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    Use natural pauses in the work (e.g. when the learner is gathering tools or
                    materials) to catch up on your notes
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 04 — Assessor Bias                                  */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">04</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Assessor Bias</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Bias is a natural feature of human cognition, not a character flaw. Every assessor is
              susceptible to it, regardless of experience or good intentions. The danger lies not in
              having biases &mdash; that is unavoidable &mdash; but in being unaware of them. An
              assessor who does not recognise their own biases will make inconsistent judgements,
              which undermines the reliability and fairness of the entire assessment process.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">The Halo Effect</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                The halo effect occurs when a positive overall impression of a learner causes the
                assessor to rate specific aspects of their performance more favourably than the
                evidence warrants. If you have always found a particular apprentice to be
                hardworking, polite, and enthusiastic, you may unconsciously overlook minor errors
                or give them the benefit of the doubt in borderline situations.
              </p>
              <p className="text-white text-sm leading-relaxed">
                The opposite is the <strong>horn effect</strong> &mdash; a negative overall
                impression leading to harsher judgements. If a learner has previously been late,
                disorganised, or difficult to work with, you might unconsciously look for faults in
                their practical work that you would overlook in a more &ldquo;likeable&rdquo;
                learner.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">The Recency Effect</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                The recency effect means giving disproportionate weight to the most recent part of
                an observation. If an apprentice makes a mistake in the first ten minutes but
                performs excellently for the remaining two hours, the recency effect might cause the
                assessor to focus on the excellent later performance and minimise the early error.
                Conversely, if the apprentice performs well throughout but makes a minor error in
                the final minutes, the recency effect might cause the assessor to judge the entire
                observation more harshly. The solution is to record evidence throughout the
                observation, not just at the end, so that your final judgement reflects the whole
                performance.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">Personal Relationship Bias</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                In the electrical trade, assessors often know the learners they are assessing
                &mdash; they may work with them daily, have mentored them for months or years, or
                have a social relationship outside work. This familiarity can create bias in both
                directions: being too lenient (because you do not want to disappoint someone you
                like) or too harsh (because you hold them to a higher standard than you would a
                stranger). The key mitigation is to assess against the criteria, not against your
                relationship with the person. Ask yourself: &ldquo;If a learner I had never met
                before performed exactly like this, what would my judgement be?&rdquo;
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Search className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">Confirmation Bias</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Confirmation bias means seeking or noticing evidence that confirms what you already
                believe, while ignoring or downplaying evidence that contradicts it. If you go into
                an observation expecting the learner to struggle, you will notice every hesitation
                and error while overlooking their strengths. If you expect them to do well, you will
                notice competent performance and explain away any mistakes as &ldquo;just a
                one-off.&rdquo; Confirmation bias is particularly dangerous because it feels like
                objective assessment &mdash; you genuinely believe you are seeing the evidence
                clearly, when in fact your brain is filtering it through your pre-existing
                expectations.
              </p>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-2">
                Construction Example: Avoiding the Halo Effect
              </p>
              <p className="text-white text-sm leading-relaxed">
                You are assessing an apprentice you have mentored for two years. You know them well
                &mdash; they are punctual, polite, enthusiastic, and everyone on site speaks highly
                of them. During the observation, they forget to prove dead before working on a
                circuit. This is a serious safety error. The halo effect tempts you to think:
                &ldquo;They always do it right normally &mdash; they just forgot because they were
                nervous being observed.&rdquo; But the assessment criteria do not have a
                &ldquo;normally does it right&rdquo; exception. On this occasion, the learner did
                not demonstrate safe isolation. Your assessment must reflect what you observed
                today, not what you believe they can usually do. The correct outcome is &ldquo;not
                yet competent&rdquo; on the relevant criterion, with clear feedback on what needs to
                happen before the next assessment opportunity.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                Strategies for Maintaining Objectivity
              </h3>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>Always assess against written criteria, not general impressions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>Record evidence throughout the observation, not just at the end</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    Attend standardisation meetings regularly to calibrate your judgements with
                    other assessors
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    Ask yourself: &ldquo;Would I make the same judgement if this were a different
                    learner?&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    Use factual, descriptive language in your records rather than emotive or
                    subjective terms
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    Welcome IQA scrutiny as a safeguard, not a threat &mdash; it protects you as
                    much as the learner
                  </span>
                </li>
              </ul>
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
            <Link to="../md-module-4-section-3">
              Kirkpatrick&rsquo;s Four Levels
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
