import {
  ArrowLeft,
  HelpCircle,
  CheckCircle,
  MessageCircle,
  Search,
  Target,
  Filter,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quiz questions (8)                                                 */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'A client says they want &ldquo;better lighting&rdquo; in their kitchen. Which type of question would best uncover what they actually need?',
    options: [
      'A closed question: &ldquo;Do you want spotlights?&rdquo;',
      'An open question: &ldquo;Can you describe how you use the kitchen and what you find lacking with the current lighting?&rdquo;',
      'A leading question: &ldquo;You probably want LED downlights, don\u2019t you?&rdquo;',
      'A yes/no question: &ldquo;Is the current lighting too dim?&rdquo;',
    ],
    correctAnswer: 1,
    explanation:
      'An open question invites the client to explain their needs in their own words, giving you much richer information than a closed or leading question. You can then follow up with probing and clarifying questions to refine the specification.',
  },
  {
    id: 2,
    question:
      'What is the primary risk of using leading questions during a safety incident investigation?',
    options: [
      'They take too long to answer',
      'They may bias the witness and contaminate the evidence',
      'They are too technical for most people to understand',
      'They always produce incorrect answers',
    ],
    correctAnswer: 1,
    explanation:
      'Leading questions suggest the answer within the question itself (e.g. &ldquo;You did isolate the supply before starting work, didn\u2019t you?&rdquo;). In an investigation, this can cause the witness to agree with your assumption rather than giving their genuine recollection, which contaminates the evidence and may obscure the true root cause.',
  },
  {
    id: 3,
    question: 'In the funnel technique, what is the correct sequence of questioning?',
    options: [
      'Specific \u2192 broad \u2192 clarifying',
      'Closed \u2192 open \u2192 leading',
      'Broad open questions \u2192 probing questions \u2192 narrow specific questions',
      'Leading \u2192 probing \u2192 open',
    ],
    correctAnswer: 2,
    explanation:
      'The funnel technique starts with broad, open questions to establish the general picture, then uses probing questions to explore areas of interest in more depth, and finishes with narrow, specific questions to confirm details and gain precision. This mirrors how a funnel narrows from wide to narrow.',
  },
  {
    id: 4,
    question:
      'During fault diagnosis, an apprentice asks: &ldquo;Is there power at the socket?&rdquo; What type of question is this?',
    options: ['Open question', 'Probing question', 'Closed question', 'Socratic question'],
    correctAnswer: 2,
    explanation:
      'This is a closed question because it can be answered with a simple &ldquo;yes&rdquo; or &ldquo;no&rdquo;. Closed questions are useful during fault diagnosis for quickly confirming or eliminating possibilities in a logical sequence. However, they should be combined with open and probing questions to build a full understanding of the fault.',
  },
  {
    id: 5,
    question: 'Which of the following is the best example of a clarifying question?',
    options: [
      '&ldquo;Why did you do it that way?&rdquo;',
      '&ldquo;When you say the lights flicker, do you mean all of them or just the ones on the dimmer circuit?&rdquo;',
      '&ldquo;Don\u2019t you think you should have checked first?&rdquo;',
      '&ldquo;What happened next?&rdquo;',
    ],
    correctAnswer: 1,
    explanation:
      'A clarifying question seeks to remove ambiguity by asking the person to be more precise about what they have already said. &ldquo;When you say the lights flicker, do you mean all of them or just the ones on the dimmer circuit?&rdquo; directly targets the vague term &ldquo;flicker&rdquo; and asks for specificity without leading or judging.',
  },
  {
    id: 6,
    question: 'What is the purpose of Socratic questioning in an electrical training context?',
    options: [
      'To test whether the apprentice has memorised BS 7671 regulation numbers',
      'To guide the learner to discover the answer themselves through a logical chain of questions',
      'To ask as many questions as possible in a short time',
      'To catch the apprentice out and highlight their mistakes',
    ],
    correctAnswer: 1,
    explanation:
      'Socratic questioning uses a chain of carefully structured questions to guide the learner toward the answer through their own reasoning, rather than simply telling them. This builds deeper understanding and develops critical thinking skills. It is not about catching people out \u2014 it is about supporting genuine learning.',
  },
  {
    id: 7,
    question:
      'You are investigating why an RCD tripped during a periodic inspection. Which opening question would give you the most useful information?',
    options: [
      '&ldquo;Did someone press the test button?&rdquo;',
      '&ldquo;Talk me through exactly what was happening on site when the RCD tripped.&rdquo;',
      '&ldquo;Was it a 30 mA or 100 mA device?&rdquo;',
      '&ldquo;It was probably a faulty appliance, wasn\u2019t it?&rdquo;',
    ],
    correctAnswer: 1,
    explanation:
      'Starting with a broad, open question (&ldquo;Talk me through exactly what was happening\u2026&rdquo;) allows the person to describe the full context without being steered toward a particular answer. You can then follow up with specific closed and probing questions to narrow down the cause. Starting with a closed or leading question risks missing important contextual information.',
  },
  {
    id: 8,
    question: 'A probing question is best described as one that:',
    options: [
      'Can be answered with yes or no',
      'Suggests the correct answer within the question',
      'Digs deeper into a topic already raised, seeking more detail or reasoning',
      'Changes the subject to a new area of enquiry',
    ],
    correctAnswer: 2,
    explanation:
      'Probing questions build on information already provided. They dig deeper into a specific area to uncover more detail, reasoning, or evidence. Examples include &ldquo;Can you tell me more about that?&rdquo;, &ldquo;What made you decide to do it that way?&rdquo;, and &ldquo;What happened immediately before that?&rdquo;',
  },
];

/* ------------------------------------------------------------------ */
/*  Quick-check questions (3) — placed after sections 2, 4, 6         */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'question-types-check',
    question:
      'A colleague tells you a circuit &ldquo;keeps tripping.&rdquo; You want to understand more. Which question type should you use first, and why?',
    options: [
      'A closed question to quickly confirm which circuit it is',
      'An open question to let them describe the full situation in their own words before narrowing down',
      'A leading question to suggest the most likely cause',
      'A clarifying question to check what &ldquo;tripping&rdquo; means',
    ],
    correctIndex: 1,
    explanation:
      'Starting with an open question (e.g. &ldquo;Tell me exactly what happens when it trips &mdash; what were you doing, which appliances were on?&rdquo;) allows the colleague to share the full context. You can then use probing and closed questions to narrow down the cause. Starting too narrow risks missing important details.',
  },
  {
    id: 'funnel-technique-check',
    question:
      'You are using the funnel technique to establish a client\u2019s requirements for a new consumer unit. You have asked a broad opening question and received a general answer. What should your next question do?',
    options: [
      'Immediately ask for the exact number of ways required',
      'Probe deeper into one aspect of their answer to uncover more detail',
      'Ask a completely unrelated question about their budget',
      'Repeat the same question in different words',
    ],
    correctIndex: 1,
    explanation:
      'The funnel technique moves from broad to specific in stages. After the initial open question, you should probe deeper into what they have already told you (e.g. &ldquo;You mentioned wanting separate circuits for the kitchen \u2014 can you tell me more about how the kitchen is used?&rdquo;). Jumping straight to a very specific question skips the middle of the funnel and may miss important requirements.',
  },
  {
    id: 'socratic-questioning-check',
    question:
      'An apprentice has wired a ring final circuit but cannot explain why the CPC must be continuous. Using the Socratic method, which response is most appropriate?',
    options: [
      '&ldquo;The CPC must be continuous because Regulation 543.1.1 requires it. Remember that for the exam.&rdquo;',
      '&ldquo;What is the purpose of the CPC? If it were broken at any point, what would happen during a fault?&rdquo;',
      '&ldquo;You should know this by now. Go and read the regs.&rdquo;',
      '&ldquo;Don\u2019t worry about why \u2014 just make sure you connect it properly.&rdquo;',
    ],
    correctIndex: 1,
    explanation:
      'The Socratic method guides the learner to the answer through their own reasoning. By asking &ldquo;What is the purpose of the CPC?&rdquo; and &ldquo;What would happen if it were broken?&rdquo;, you help the apprentice work through the logic themselves: the CPC provides a low-impedance path for fault current, and a break would leave metalwork live during a fault. This produces deeper, longer-lasting understanding than simply stating the regulation.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQs (4)                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Is it ever acceptable to use leading questions?',
    answer:
      'Leading questions should generally be avoided, especially in investigations and client consultations, because they bias the response. However, in very limited circumstances they can be used deliberately \u2014 for example, in a training context where you want to guide a learner toward a known correct answer (&ldquo;Given that the earth fault loop impedance exceeds the maximum Zs, what action should we take?&rdquo;). Even then, you should be aware that you are leading and ensure the learner genuinely understands the reasoning, not just agreeing with your prompt.',
  },
  {
    question:
      'How do I avoid asking too many questions and making the other person feel interrogated?',
    answer:
      'Balance your questions with active listening, acknowledgement, and summary. After each answer, pause and reflect back what you have heard (&ldquo;So the issue started after the new appliance was connected \u2014 is that right?&rdquo;). Explain why you are asking (&ldquo;I need to understand the sequence of events so I can find the fault safely&rdquo;). Use a conversational tone rather than a rapid-fire checklist approach. People are much more willing to share information when they feel heard and understand the purpose of your questions.',
  },
  {
    question: 'What is the difference between a probing question and a clarifying question?',
    answer:
      'A probing question digs deeper into a topic to uncover more detail or reasoning (&ldquo;Can you tell me more about what happened before the RCD tripped?&rdquo;). A clarifying question seeks to remove ambiguity from something already said (&ldquo;When you say it &lsquo;sparked,&rsquo; do you mean you saw an arc at the terminal or a flash from behind the socket plate?&rdquo;). Probing expands the information; clarifying sharpens it. Both are essential, and you will often use them together in the same conversation.',
  },
  {
    question: 'How can I use effective questioning to improve safety on site?',
    answer:
      'Effective questioning is one of the most powerful safety tools available. Use open questions during toolbox talks to check genuine understanding rather than just compliance (&ldquo;What are the specific risks on this job and how are we controlling them?&rdquo; rather than &ldquo;Have you read the risk assessment?&rdquo;). During safety walks, ask probing questions to understand why people are working a certain way (&ldquo;What made you decide to use that access method?&rdquo;). After near-miss incidents, use the funnel technique to build a full picture before drawing conclusions. Questions that make people think about safety are far more effective than instructions that people passively receive.',
  },
];

/* ------------------------------------------------------------------ */
/*  Border colours for alternating sections                            */
/* ------------------------------------------------------------------ */
const borderColours = [
  'border-rose-500/50', // 01
  'border-blue-500/50', // 02
  'border-green-500/50', // 03
  'border-purple-500/50', // 04
  'border-cyan-500/50', // 05
  'border-amber-500/50', // 06
];

const numColours = [
  'text-rose-400/80',
  'text-blue-400/80',
  'text-green-400/80',
  'text-purple-400/80',
  'text-cyan-400/80',
  'text-amber-400/80',
];

const headingColours = [
  'text-rose-300',
  'text-blue-300',
  'text-green-300',
  'text-purple-300',
  'text-cyan-300',
  'text-amber-300',
];

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
const CCModule2Section3 = () => {
  useSEO({
    title: 'Asking Effective Questions | Communication & Confidence Module 2 Section 3',
    description:
      'Question types (open, closed, probing, leading, clarifying), funnel technique, Socratic questioning, and construction-specific examples for fault diagnosis, client requirements, and safety investigations.',
  });

  return (
    <div className="bg-[#1a1a1a] overflow-x-hidden">
      {/* -- Header ------------------------------------------------- */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* -- Main Content ------------------------------------------- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 mb-4">
            <HelpCircle className="h-8 w-8 text-rose-400" />
          </div>
          <div>
            <span className="inline-block bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
              MODULE 2 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Asking Effective Questions
          </h1>
          <p className="text-white max-w-xl mx-auto">
            How to use different question types strategically to gather accurate information,
            diagnose faults, understand client needs, and investigate safety incidents
          </p>
        </div>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4 text-center">
            <MessageCircle className="h-6 w-6 text-rose-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold text-sm mb-1">Five Question Types</h3>
            <p className="text-white text-xs">
              Open, closed, probing, leading, and clarifying &mdash; each serves a different purpose
              in professional communication
            </p>
          </div>
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4 text-center">
            <Filter className="h-6 w-6 text-rose-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold text-sm mb-1">Funnel Technique</h3>
            <p className="text-white text-xs">
              Start broad and progressively narrow your questions to move from a general picture to
              precise, actionable detail
            </p>
          </div>
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4 text-center">
            <Search className="h-6 w-6 text-rose-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold text-sm mb-1">Construction Context</h3>
            <p className="text-white text-xs">
              Fault diagnosis, client consultations, safety investigations, and apprentice mentoring
              all demand skilled questioning
            </p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 border border-rose-500/30 rounded-lg p-4 sm:p-6 mb-10">
          <h2 className="text-lg font-semibold text-rose-300 mb-3 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Learning Outcomes
          </h2>
          <p className="text-white text-sm mb-3">By the end of this section you will be able to:</p>
          <ul className="space-y-2 text-sm text-white">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
              <span>
                Identify and explain the five main question types: open, closed, probing, leading,
                and clarifying
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
              <span>Apply the funnel technique to move from broad enquiry to specific detail</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
              <span>
                Use Socratic questioning to guide learners toward answers through their own
                reasoning
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
              <span>Construct effective questions for fault diagnosis scenarios</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
              <span>
                Gather accurate client requirements using structured questioning sequences
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
              <span>
                Conduct a safety incident investigation using non-leading, evidence-preserving
                questions
              </span>
            </li>
          </ul>
        </div>

        {/* -------------------------------------------------------- */}
        {/* SECTION 01 — The Five Question Types                      */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className={`border-l-2 ${borderColours[0]} pl-4 sm:pl-6`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`${numColours[0]} text-sm font-normal`}>01</span>
              The Five Question Types
            </h2>

            <div className="space-y-4 text-white">
              <p>
                Every conversation you have on site &mdash; whether with a client, a colleague, an
                apprentice, or a health and safety inspector &mdash; depends on the quality of the
                questions you ask. Understanding the different types of question and when to use
                each one is a fundamental professional skill.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    type: 'Open Questions',
                    colour: 'green',
                    borderClass: 'border-green-400/30',
                    bgClass: 'bg-green-400/10',
                    textClass: 'text-green-300',
                    purpose:
                      'Encourage a detailed, free-form response. Cannot be answered with yes or no.',
                    example:
                      '&ldquo;Can you describe exactly what happened when the circuit tripped?&rdquo;',
                    when: 'Starting a conversation, gathering initial information, understanding a situation.',
                  },
                  {
                    type: 'Closed Questions',
                    colour: 'blue',
                    borderClass: 'border-blue-400/30',
                    bgClass: 'bg-blue-400/10',
                    textClass: 'text-blue-300',
                    purpose: 'Require a specific, short answer (yes/no, a number, a name).',
                    example: '&ldquo;Is the supply single-phase or three-phase?&rdquo;',
                    when: 'Confirming facts, narrowing down options, checking understanding.',
                  },
                  {
                    type: 'Probing Questions',
                    colour: 'purple',
                    borderClass: 'border-purple-400/30',
                    bgClass: 'bg-purple-400/10',
                    textClass: 'text-purple-300',
                    purpose:
                      'Dig deeper into something already mentioned, seeking more detail or reasoning.',
                    example:
                      '&ldquo;You mentioned it only happens in the evening &mdash; can you tell me more about what appliances are typically in use at that time?&rdquo;',
                    when: 'Following up on an answer, exploring root causes, building a fuller picture.',
                  },
                  {
                    type: 'Leading Questions',
                    colour: 'red',
                    borderClass: 'border-red-400/30',
                    bgClass: 'bg-red-400/10',
                    textClass: 'text-red-300',
                    purpose:
                      'Suggest the expected answer within the question itself. Generally to be avoided.',
                    example:
                      '&ldquo;You did check the isolation before starting work, didn&rsquo;t you?&rdquo;',
                    when: 'Rarely appropriate. Risk of biasing responses, especially in investigations.',
                  },
                  {
                    type: 'Clarifying Questions',
                    colour: 'cyan',
                    borderClass: 'border-cyan-400/30',
                    bgClass: 'bg-cyan-400/10',
                    textClass: 'text-cyan-300',
                    purpose:
                      'Remove ambiguity by asking someone to be more specific about what they have already said.',
                    example:
                      '&ldquo;When you say it &lsquo;sparked,&rsquo; do you mean you saw an arc at the terminal or a flash from behind the socket plate?&rdquo;',
                    when: 'Whenever a term or description is vague, could be interpreted in multiple ways, or is critical to safety.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`${item.bgClass} border ${item.borderClass} rounded-lg p-4 ${idx === 4 ? 'sm:col-span-2' : ''}`}
                  >
                    <h3 className={`${item.textClass} font-semibold mb-2`}>{item.type}</h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-white">
                        <strong>Purpose:</strong> {item.purpose}
                      </p>
                      <p
                        className="text-white"
                        dangerouslySetInnerHTML={{
                          __html: `<strong>Example:</strong> ${item.example}`,
                        }}
                      />
                      <p className="text-white">
                        <strong>When to use:</strong> {item.when}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-rose-400">Key Point</h3>
                <p className="text-white text-sm">
                  No single question type is &ldquo;best.&rdquo; Skilled communicators switch
                  fluidly between types depending on what information they need, who they are
                  talking to, and the context of the conversation. The goal is always to{' '}
                  <strong>gather accurate, complete information</strong> while maintaining a
                  positive working relationship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* SECTION 02 — The Funnel Technique                         */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className={`border-l-2 ${borderColours[1]} pl-4 sm:pl-6`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`${numColours[1]} text-sm font-normal`}>02</span>
              The Funnel Technique
            </h2>

            <div className="space-y-4 text-white">
              <p>
                The funnel technique is a structured approach to questioning that starts with broad,
                open questions and progressively narrows toward specific, closed questions. It
                mirrors the shape of a funnel &mdash; wide at the top, narrow at the bottom &mdash;
                and is one of the most effective frameworks for gathering information in any
                professional context.
              </p>

              {/* Funnel visual */}
              <div className="bg-white/5 border border-blue-400/30 rounded-lg p-4 sm:p-6">
                <h3 className={`${headingColours[1]} font-semibold mb-4 flex items-center gap-2`}>
                  <Filter className="h-5 w-5" />
                  Funnel Technique &mdash; Stage by Stage
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      stage: 1,
                      label: 'Broad Open Questions',
                      width: 'w-full',
                      bgClass: 'bg-blue-500/20 border-blue-400/40',
                      detail: 'Establish the general picture. Let the other person talk freely.',
                      example: '&ldquo;Tell me about the electrical work you need doing.&rdquo;',
                    },
                    {
                      stage: 2,
                      label: 'Probing Questions',
                      width: 'w-5/6 mx-auto',
                      bgClass: 'bg-blue-500/15 border-blue-400/30',
                      detail:
                        'Explore areas of interest in more depth. Follow up on what they have said.',
                      example:
                        '&ldquo;You mentioned the kitchen &mdash; can you tell me more about how you use that space?&rdquo;',
                    },
                    {
                      stage: 3,
                      label: 'Clarifying Questions',
                      width: 'w-4/6 mx-auto',
                      bgClass: 'bg-blue-500/10 border-blue-400/20',
                      detail: 'Remove ambiguity. Sharpen vague or unclear responses.',
                      example:
                        '&ldquo;When you say &lsquo;more sockets,&rsquo; do you mean double or single, and roughly how many?&rdquo;',
                    },
                    {
                      stage: 4,
                      label: 'Specific Closed Questions',
                      width: 'w-3/6 mx-auto',
                      bgClass: 'bg-blue-500/5 border-blue-400/15',
                      detail: 'Confirm precise details. Lock down the specification.',
                      example:
                        '&ldquo;So that\u2019s six double sockets on a dedicated ring, all in white, with USB charging on the two by the worktop?&rdquo;',
                    },
                  ].map((s) => (
                    <div
                      key={s.stage}
                      className={`${s.width} border ${s.bgClass} rounded-lg p-4 transition-all`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500/30 border border-blue-400/50 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-300 text-sm font-bold">{s.stage}</span>
                        </div>
                        <span className="font-semibold text-blue-300">{s.label}</span>
                      </div>
                      <p className="text-white text-sm mb-1">{s.detail}</p>
                      <p
                        className="text-white text-xs italic"
                        dangerouslySetInnerHTML={{ __html: s.example }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className={`${headingColours[1]} font-medium mb-2`}>Why the Funnel Works</h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span>
                      <strong>Avoids premature assumptions:</strong> By starting broad, you hear the
                      full context before forming conclusions
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span>
                      <strong>Builds rapport:</strong> People feel heard when you let them explain
                      in their own words before drilling into specifics
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span>
                      <strong>Reduces errors:</strong> Progressively narrowing questions catches
                      misunderstandings early, before they become costly specification errors
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                    <span>
                      <strong>Professional structure:</strong> Gives your consultation a clear,
                      logical flow that clients and colleagues find reassuring
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* -------------------------------------------------------- */}
        {/* SECTION 03 — Socratic Questioning                         */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className={`border-l-2 ${borderColours[2]} pl-4 sm:pl-6`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`${numColours[2]} text-sm font-normal`}>03</span>
              Socratic Questioning
            </h2>

            <div className="space-y-4 text-white">
              <p>
                Socratic questioning is a method of teaching and coaching that uses a carefully
                structured chain of questions to guide the learner toward discovering the answer
                through their own reasoning. Named after the ancient Greek philosopher Socrates, it
                is widely used in education, mentoring, and professional development &mdash; and it
                is particularly powerful in trades training.
              </p>

              <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                <h3 className={`${headingColours[2]} font-medium mb-3`}>
                  The Six Categories of Socratic Questions
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      category: 'Questions of clarification',
                      example: '&ldquo;What exactly do you mean by that?&rdquo;',
                      purpose: 'Ensure the learner\u2019s statement is clear and precise.',
                    },
                    {
                      category: 'Questions that probe assumptions',
                      example:
                        '&ldquo;What are you assuming about the load on that circuit?&rdquo;',
                      purpose: 'Challenge underlying beliefs that may not have been examined.',
                    },
                    {
                      category: 'Questions that probe reasoning',
                      example: '&ldquo;What evidence led you to that conclusion?&rdquo;',
                      purpose: 'Explore the logic behind the learner\u2019s thinking.',
                    },
                    {
                      category: 'Questions about viewpoints',
                      example:
                        '&ldquo;How might a building inspector view this differently?&rdquo;',
                      purpose: 'Encourage considering alternative perspectives.',
                    },
                    {
                      category: 'Questions that probe implications',
                      example:
                        '&ldquo;If we use that cable size, what happens to the voltage drop over a 30 m run?&rdquo;',
                      purpose: 'Explore the consequences and knock-on effects of a decision.',
                    },
                    {
                      category: 'Questions about the question',
                      example:
                        '&ldquo;Why do you think I\u2019m asking you about earth fault loop impedance here?&rdquo;',
                      purpose:
                        'Develop metacognition &mdash; awareness of one\u2019s own thinking process.',
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <h4 className="text-green-300 font-semibold text-sm mb-1">{item.category}</h4>
                      <p
                        className="text-white text-xs mb-1"
                        dangerouslySetInnerHTML={{ __html: `<em>${item.example}</em>` }}
                      />
                      <p className="text-white text-xs">{item.purpose}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Worked example */}
              <div className="bg-white/5 border border-green-400/30 p-4 rounded-lg">
                <h3 className="text-green-300 font-semibold mb-3">
                  Worked Example: Mentoring an Apprentice on Cable Selection
                </h3>
                <div className="space-y-3 text-sm">
                  {[
                    {
                      speaker: 'Mentor',
                      text: '&ldquo;You\u2019ve selected 2.5 mm&sup2; T&amp;E for this radial circuit. Can you talk me through why?&rdquo;',
                    },
                    {
                      speaker: 'Apprentice',
                      text: '&ldquo;Because it\u2019s a 20 A circuit and 2.5 mm&sup2; can carry 20 A.&rdquo;',
                    },
                    {
                      speaker: 'Mentor',
                      text: '&ldquo;What factors other than current-carrying capacity should you consider when selecting a cable?&rdquo;',
                    },
                    {
                      speaker: 'Apprentice',
                      text: '&ldquo;Umm\u2026 voltage drop? And the installation method?&rdquo;',
                    },
                    {
                      speaker: 'Mentor',
                      text: '&ldquo;Good. This cable runs 25 metres through thermal insulation. What effect does thermal insulation have on the cable\u2019s current rating?&rdquo;',
                    },
                    {
                      speaker: 'Apprentice',
                      text: '&ldquo;It reduces it because the heat can\u2019t dissipate. So I might need to go up to 4 mm&sup2;.&rdquo;',
                    },
                    {
                      speaker: 'Mentor',
                      text: '&ldquo;Exactly. What would happen if we left it at 2.5 mm&sup2; in that environment?&rdquo;',
                    },
                    {
                      speaker: 'Apprentice',
                      text: '&ldquo;The cable could overheat\u2026 the insulation could degrade\u2026 fire risk.&rdquo;',
                    },
                  ].map((line, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span
                        className={`text-xs font-mono mt-0.5 flex-shrink-0 w-16 text-right ${
                          line.speaker === 'Mentor' ? 'text-green-400' : 'text-blue-400'
                        }`}
                      >
                        {line.speaker}
                      </span>
                      <p
                        className="text-white flex-1"
                        dangerouslySetInnerHTML={{ __html: line.text }}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-white text-sm mt-3 italic">
                  Notice how the mentor never gave the answer directly. Each question built on the
                  apprentice&rsquo;s previous response and guided them toward the correct conclusion
                  through their own reasoning.
                </p>
              </div>

              <div className="bg-white/5 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-rose-400">Key Point</h3>
                <p className="text-white text-sm">
                  Socratic questioning is <strong>not about catching people out</strong>. It is
                  about creating a safe space where learners can think out loud, make connections,
                  and develop genuine understanding. If the apprentice gets stuck, guide them with a
                  simpler question rather than giving the answer. The goal is that they remember the
                  reasoning, not just the conclusion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* SECTION 04 — Construction Example: Fault Diagnosis         */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className={`border-l-2 ${borderColours[3]} pl-4 sm:pl-6`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`${numColours[3]} text-sm font-normal`}>04</span>
              Construction Example: Fault Diagnosis
            </h2>

            <div className="space-y-4 text-white">
              <p>
                Fault diagnosis is one of the most question-intensive tasks an electrician performs.
                The quality of your questions directly determines how quickly and accurately you
                identify the fault &mdash; and whether you do so safely.
              </p>

              <div className="bg-white/5 border border-purple-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[3]} font-medium mb-3`}>
                  Questioning Sequence for Fault Diagnosis
                </h3>
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-400/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-300 text-xs font-mono font-bold">1</span>
                    </div>
                    <div>
                      <strong>Open:</strong> &ldquo;Tell me exactly what happened &mdash; what did
                      you notice and when did it start?&rdquo;
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-400/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-300 text-xs font-mono font-bold">2</span>
                    </div>
                    <div>
                      <strong>Probing:</strong> &ldquo;You said it only happens in the evening. What
                      appliances are typically running at that time?&rdquo;
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-400/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-300 text-xs font-mono font-bold">3</span>
                    </div>
                    <div>
                      <strong>Clarifying:</strong> &ldquo;When you say it &lsquo;trips,&rsquo; which
                      device are you referring to &mdash; the MCB, the RCD, or the main
                      switch?&rdquo;
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-400/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-300 text-xs font-mono font-bold">4</span>
                    </div>
                    <div>
                      <strong>Closed:</strong> &ldquo;Has anything been changed recently &mdash; new
                      appliances, building work, or alterations to the wiring?&rdquo;
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-400/20 border border-purple-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-300 text-xs font-mono font-bold">5</span>
                    </div>
                    <div>
                      <strong>Confirming:</strong> &ldquo;So to summarise &mdash; the 30 mA RCD on
                      the kitchen circuit trips when the dishwasher and the oven are both running,
                      and this started about two weeks ago. Is that correct?&rdquo;
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-purple-300 font-medium mb-2">
                  Common Pitfalls in Fault Diagnosis Questioning
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <span>
                      <strong>Jumping to conclusions:</strong> Asking &ldquo;Is it the
                      dishwasher?&rdquo; before hearing the full picture steers you toward a single
                      hypothesis and may cause you to miss the actual fault
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <span>
                      <strong>Using technical jargon:</strong> Asking a homeowner about &ldquo;Zs
                      values&rdquo; or &ldquo;insulation resistance&rdquo; will not help. Use plain
                      language and translate their answers into technical terms yourself
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <span>
                      <strong>Not listening to the answer:</strong> Ask the question, then genuinely
                      listen. Do not plan your next question while they are still speaking
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* -------------------------------------------------------- */}
        {/* SECTION 05 — Construction Example: Client Requirements     */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className={`border-l-2 ${borderColours[4]} pl-4 sm:pl-6`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`${numColours[4]} text-sm font-normal`}>05</span>
              Construction Example: Client Requirements
            </h2>

            <div className="space-y-4 text-white">
              <p>
                Getting client requirements right is critical. Misunderstood requirements lead to
                rework, disputes, and wasted materials. The funnel technique is particularly
                effective here &mdash; but the key skill is asking questions that the client can
                actually answer, then translating their responses into a technical specification
                yourself.
              </p>

              <div className="bg-white/5 border border-cyan-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[4]} font-medium mb-3`}>
                  Kitchen Rewire &mdash; Client Consultation Example
                </h3>
                <div className="space-y-3 text-sm">
                  {[
                    {
                      type: 'Open',
                      question:
                        '&ldquo;What are you hoping to achieve with the electrical work in the kitchen?&rdquo;',
                      rationale:
                        'Lets the client express their vision before you impose technical constraints.',
                    },
                    {
                      type: 'Probing',
                      question:
                        '&ldquo;You mentioned wanting island lighting. Can you tell me more about how you envision the island being used?&rdquo;',
                      rationale:
                        'Helps determine whether they need task lighting, feature lighting, or both.',
                    },
                    {
                      type: 'Clarifying',
                      question:
                        '&ldquo;When you say &lsquo;smart controls,&rsquo; do you mean voice-activated, app-controlled, or automated scenes?&rdquo;',
                      rationale:
                        'Removes ambiguity &mdash; each option has different wiring and product implications.',
                    },
                    {
                      type: 'Closed',
                      question:
                        '&ldquo;Will there be a built-in hob, a separate oven, or a range cooker?&rdquo;',
                      rationale:
                        'Each has different supply requirements. This is a factual question with a limited set of answers.',
                    },
                    {
                      type: 'Confirming',
                      question:
                        '&ldquo;So to confirm: six double sockets on the worktop run, a dedicated 32 A supply for the oven, two USB-A/C doubles by the breakfast bar, and all switch plates in brushed chrome?&rdquo;',
                      rationale: 'Summarises and locks down the specification before you quote.',
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">
                          {item.type}
                        </span>
                      </div>
                      <p
                        className="text-white mb-1"
                        dangerouslySetInnerHTML={{ __html: item.question }}
                      />
                      <p className="text-white text-xs italic">{item.rationale}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-rose-500/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-rose-400">Pro Tip</h3>
                <p className="text-white text-sm">
                  Always confirm the specification back to the client in writing &mdash; whether by
                  email, a formal quotation, or a scope of works document. This protects both
                  parties and gives the client a final opportunity to correct any misunderstandings
                  before work begins. The questions you asked during the consultation form the
                  foundation of this document.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* SECTION 06 — Construction Example: Safety Investigation    */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <div className={`border-l-2 ${borderColours[5]} pl-4 sm:pl-6`}>
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`${numColours[5]} text-sm font-normal`}>06</span>
              Construction Example: Safety Incident Investigation
            </h2>

            <div className="space-y-4 text-white">
              <p>
                When a safety incident or near miss occurs on site, the quality of your questioning
                determines whether you identify the true root cause or merely confirm your existing
                assumptions. Poor questioning &mdash; especially leading questions &mdash; can
                contaminate witness accounts and result in the real cause being missed.
              </p>

              <div className="bg-white/5 border border-amber-400/30 p-4 rounded-lg">
                <h3 className={`${headingColours[5]} font-medium mb-3`}>
                  Principles of Investigation Questioning
                </h3>
                <ul className="text-white space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 text-xs font-mono font-bold">1</span>
                    </div>
                    <div>
                      <strong>Start open, stay neutral:</strong> &ldquo;In your own words, tell me
                      everything that happened from the moment you arrived on site this
                      morning.&rdquo;
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 text-xs font-mono font-bold">2</span>
                    </div>
                    <div>
                      <strong>Never lead:</strong> Ask &ldquo;What PPE were you wearing?&rdquo;
                      &mdash; not &ldquo;You were wearing your gloves, weren&rsquo;t you?&rdquo;
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 text-xs font-mono font-bold">3</span>
                    </div>
                    <div>
                      <strong>Separate fact from opinion:</strong> &ldquo;What did you actually
                      see?&rdquo; is different from &ldquo;What do you think happened?&rdquo; Gather
                      facts first, then ask for their interpretation
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 text-xs font-mono font-bold">4</span>
                    </div>
                    <div>
                      <strong>Use the &ldquo;5 Whys&rdquo; technique:</strong> After establishing
                      what happened, repeatedly ask &ldquo;Why?&rdquo; to drill down from the
                      surface cause to the root cause. Typically five iterations will reach the
                      systemic issue
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-300 text-xs font-mono font-bold">5</span>
                    </div>
                    <div>
                      <strong>Ask one question at a time:</strong> Compound questions (&ldquo;Were
                      you wearing PPE and had you read the method statement and was the area
                      cordoned off?&rdquo;) are confusing and often only the last part gets answered
                    </div>
                  </li>
                </ul>
              </div>

              {/* 5 Whys example */}
              <div className="bg-white/5 border border-amber-500/30 p-4 rounded-lg">
                <h3 className="text-amber-300 font-semibold mb-3">
                  &ldquo;5 Whys&rdquo; Example: Electric Shock Near Miss
                </h3>
                <div className="space-y-2 text-sm">
                  {[
                    {
                      why: '1',
                      q: 'Why did the operative receive a shock?',
                      a: 'Because the circuit was still live when they started work.',
                    },
                    {
                      why: '2',
                      q: 'Why was the circuit still live?',
                      a: 'Because the isolation was not carried out before work began.',
                    },
                    {
                      why: '3',
                      q: 'Why was the isolation not carried out?',
                      a: 'Because the operative assumed the previous shift had isolated it.',
                    },
                    {
                      why: '4',
                      q: 'Why did they assume it had been isolated?',
                      a: 'Because there was no formal isolation procedure requiring personal verification.',
                    },
                    {
                      why: '5',
                      q: 'Why was there no formal isolation procedure?',
                      a: 'Because the site safety management system did not include a permit-to-work for electrical isolation.',
                    },
                  ].map((item) => (
                    <div
                      key={item.why}
                      className="bg-white/5 border border-white/10 rounded-lg p-3"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-amber-400 font-mono text-xs mt-0.5 flex-shrink-0 w-12">
                          Why {item.why}
                        </span>
                        <div>
                          <p className="text-white font-medium">{item.q}</p>
                          <p className="text-white text-xs mt-1 italic">{item.a}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-white text-sm mt-3">
                  <strong>Root cause identified:</strong> The systemic failure was the absence of a
                  permit-to-work system for electrical isolation, not the individual
                  operative&rsquo;s assumption. This distinction is critical &mdash; fixing the
                  system prevents recurrence; blaming the individual does not.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Target className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Critical Rule</h3>
                </div>
                <p className="text-white text-sm">
                  Never use leading questions during a safety investigation. Leading questions bias
                  witness accounts, can result in false confirmation of unsafe assumptions, and may
                  undermine any subsequent enforcement action by the HSE. Always ask{' '}
                  <strong>open, neutral questions</strong> and let the evidence guide your
                  conclusions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* InlineCheck after Section 06 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* -------------------------------------------------------- */}
        {/* FAQs                                                      */}
        {/* -------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-rose-400/80 text-sm font-normal">07</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-white text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/* Quiz                                                      */}
        {/* -------------------------------------------------------- */}
        <div className="mt-12">
          <Quiz title="Asking Effective Questions Quiz" questions={quizQuestions} />
        </div>

        {/* -------------------------------------------------------- */}
        {/* Navigation                                                */}
        {/* -------------------------------------------------------- */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[44px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[44px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-2-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default CCModule2Section3;
