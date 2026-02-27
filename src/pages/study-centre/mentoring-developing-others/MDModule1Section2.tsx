import {
  ArrowLeft,
  RotateCcw,
  CheckCircle,
  BookOpen,
  Lightbulb,
  Target,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (inline)                                     */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 1,
    question:
      'An apprentice wires a ring final circuit for the first time (Concrete Experience) and then moves straight to wiring another ring final without any discussion. Which stage of Kolb\u2019s cycle have they skipped?',
    options: [
      'Abstract Conceptualisation',
      'Active Experimentation',
      'Reflective Observation',
      'Concrete Experience',
    ],
    correctIndex: 2,
    explanation:
      'They have skipped Reflective Observation. Without pausing to reflect on what went well, what went wrong, and why, the apprentice is likely to repeat the same mistakes. Kolb\u2019s cycle requires reflection after experience before moving to conceptualisation and experimentation.',
  },
  {
    id: 2,
    question:
      'According to Honey and Mumford, a learner who prefers to watch demonstrations, take notes, and think carefully before acting is most likely which learning style?',
    options: ['Activist', 'Reflector', 'Theorist', 'Pragmatist'],
    correctIndex: 1,
    explanation:
      'A Reflector prefers to stand back, observe, and think things through before committing to action. They like to gather data, watch demonstrations, and consider all angles. Rushing them into action before they are ready can cause anxiety and reduce learning.',
  },
  {
    id: 3,
    question:
      'You are designing a training session on consumer unit installation. Which sequence correctly follows Kolb\u2019s full cycle?',
    options: [
      'Read BS 7671 \u2192 watch a demo \u2192 attempt the task \u2192 discuss what happened',
      'Watch a demo \u2192 discuss what you observed \u2192 read the regulations \u2192 attempt it yourself',
      'Attempt the task \u2192 read BS 7671 \u2192 watch a demo \u2192 discuss what happened',
      'Discuss the theory \u2192 attempt the task \u2192 watch a demo \u2192 read BS 7671',
    ],
    correctIndex: 1,
    explanation:
      'Kolb\u2019s cycle starts with Concrete Experience (watching a demo), then Reflective Observation (discussing what you observed), then Abstract Conceptualisation (reading the regulations to understand the theory), then Active Experimentation (attempting it yourself). Option B follows this sequence correctly.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Must the cycle always start with Concrete Experience?',
    answer:
      'No. While Kolb presented the cycle starting with Concrete Experience, a learner can enter at any point. A Theorist might start by reading the theory (Abstract Conceptualisation) before trying a practical task. The critical point is that all four stages must be completed for deep learning to occur, regardless of where the learner enters the cycle.',
  },
  {
    question: 'Are Honey and Mumford\u2019s styles the same as Kolb\u2019s?',
    answer:
      'They are closely related but not identical. Kolb identified four learning styles (Diverging, Assimilating, Converging, Accommodating) based on the axes of his cycle. Honey and Mumford (1986) simplified these into Activist, Reflector, Theorist, and Pragmatist, which map directly to Kolb\u2019s four cycle stages. The Honey and Mumford model is more commonly used in UK vocational training because the language is more accessible.',
  },
  {
    question: 'How do I use learning styles without stereotyping learners?',
    answer:
      'Learning style preferences are tendencies, not fixed categories. Most people have a blend of preferences, and these can change depending on the subject and context. Use style awareness to vary your teaching methods so that you cover all four stages, rather than to label individuals. A well-designed session that includes experience, reflection, theory, and practice will work for all styles.',
  },
  {
    question: 'What happens if I skip a stage of the cycle?',
    answer:
      'Skipping any stage leads to incomplete learning. Without experience, learning is purely theoretical. Without reflection, mistakes are repeated. Without conceptualisation, the learner cannot generalise to new situations. Without experimentation, the learner cannot test and refine their understanding. The most common skip in construction is reflection \u2014 supervisors often rush apprentices from one task to the next without debriefing.',
  },
];

/* ------------------------------------------------------------------ */
/*  End-of-section quiz                                                */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'In which year did David Kolb publish his experiential learning cycle?',
    options: ['1976', '1984', '1986', '1992'],
    correctAnswer: 1,
    explanation:
      'Kolb published his experiential learning theory in 1984 in the book "Experiential Learning: Experience as the Source of Learning and Development."',
  },
  {
    id: 2,
    question: 'What are the four stages of Kolb\u2019s cycle in the correct order?',
    options: [
      'Plan, Do, Check, Act',
      'Concrete Experience, Reflective Observation, Abstract Conceptualisation, Active Experimentation',
      'Experience, Theory, Practice, Review',
      'Watch, Think, Read, Do',
    ],
    correctAnswer: 1,
    explanation:
      'The correct order is: Concrete Experience (doing or observing), Reflective Observation (reviewing what happened), Abstract Conceptualisation (understanding the theory), Active Experimentation (trying it out in a new way).',
  },
  {
    id: 3,
    question:
      'Which Honey and Mumford learning style corresponds to Kolb\u2019s Concrete Experience stage?',
    options: ['Reflector', 'Theorist', 'Pragmatist', 'Activist'],
    correctAnswer: 3,
    explanation:
      'Activists thrive on new experiences. They prefer to dive in and learn by doing, which aligns with Kolb\u2019s Concrete Experience stage.',
  },
  {
    id: 4,
    question:
      'An apprentice who likes to read the Wiring Regulations before attempting any practical work is showing a preference for which Honey and Mumford style?',
    options: ['Activist', 'Reflector', 'Theorist', 'Pragmatist'],
    correctAnswer: 2,
    explanation:
      'Theorists want to understand the underlying principles, models, and concepts before they act. Reading BS 7671 to understand the rules before attempting practical work is classic Theorist behaviour.',
  },
  {
    id: 5,
    question:
      'After an apprentice completes a first-fix wiring task, the mentor asks: "What went well? What would you change next time?" Which Kolb stage is the mentor facilitating?',
    options: [
      'Concrete Experience',
      'Reflective Observation',
      'Abstract Conceptualisation',
      'Active Experimentation',
    ],
    correctAnswer: 1,
    explanation:
      'These questions prompt the learner to reflect on their experience. Reflective Observation involves reviewing what happened, considering what worked and what did not, and thinking about why.',
  },
  {
    id: 6,
    question: 'A Pragmatist learner is most likely to ask which of the following questions?',
    options: [
      '"What does the regulation say about this?"',
      '"Can I watch you do it first?"',
      '"How can I use this on my next job?"',
      '"What if we tried a completely different approach?"',
    ],
    correctAnswer: 2,
    explanation:
      'Pragmatists are focused on practical application. They want to know how theory translates into real-world action and are always looking for techniques they can use immediately on site.',
  },
  {
    id: 7,
    question:
      'Which is the most commonly skipped stage of Kolb\u2019s cycle in construction mentoring?',
    options: [
      'Concrete Experience',
      'Reflective Observation',
      'Abstract Conceptualisation',
      'Active Experimentation',
    ],
    correctAnswer: 1,
    explanation:
      'Reflective Observation is most commonly skipped. The pressure of site deadlines means apprentices are often moved from one task to the next without a debrief. A good mentor builds in time for reflection, even if it is just five minutes at the end of a task.',
  },
  {
    id: 8,
    question:
      'According to Kolb, what is the consequence of learning only through Abstract Conceptualisation without Concrete Experience?',
    options: [
      'The learner becomes a strong theorist who can advise others',
      'The learner understands the principles but cannot apply them in practice',
      'The learner develops excellent analytical skills',
      'The learner will eventually gain experience through observation',
    ],
    correctAnswer: 1,
    explanation:
      'Learning without experience is purely theoretical. The learner may be able to recite regulations and principles but will struggle to apply them on a real installation. This is a common problem for college-trained apprentices who have not yet had sufficient site experience.',
  },
];

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
export default function MDModule1Section2() {
  useSEO({
    title:
      'Kolb\u2019s Experiential Learning Cycle | Module 1 Section 2 | Mentoring & Developing Others',
    description:
      'Kolb\u2019s four-stage experiential learning cycle, Honey and Mumford learning styles, and how to design complete learning experiences in UK construction training.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* ── Sticky header ─────────────────────────────────────────── */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-8 lg:px-12 py-2">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="lg"
              className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../md-module-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* ── Page body ─────────────────────────────────────────────── */}
      <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* ── Header ────────────────────────────────────────────── */}
          <header>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <RotateCcw className="h-6 w-6 text-rose-400" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                <span className="text-rose-400 text-xs font-semibold">MODULE 1</span>
                <span className="text-white text-xs">&middot;</span>
                <span className="text-white text-xs">SECTION 2</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Kolb&rsquo;s Experiential Learning Cycle
            </h1>
            <p className="text-white text-sm sm:text-base leading-relaxed">
              Why experience alone does not equal learning &mdash; and how a four-stage cycle turns
              every job on site into a structured development opportunity.
            </p>
          </header>

          {/* ── In 30 Seconds / Why It Matters ────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-rose-500/5 border-l-2 border-rose-500/50 p-4">
              <h2 className="text-rose-400 font-semibold text-sm mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                In 30 Seconds
              </h2>
              <p className="text-white text-sm leading-relaxed">
                David Kolb (1984) argued that learning requires four stages: having an experience,
                reflecting on it, understanding the theory behind it, and then experimenting with
                what you have learned. Skip any stage and learning is incomplete. Honey and Mumford
                (1986) mapped four learning styles to these stages, helping mentors understand why
                different learners engage differently with the same material.
              </p>
            </div>
            <div className="rounded-xl bg-rose-500/5 border-l-2 border-rose-500/50 p-4">
              <h2 className="text-rose-400 font-semibold text-sm mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Why It Matters
              </h2>
              <p className="text-white text-sm leading-relaxed">
                In construction, we often assume that doing the work is enough. &ldquo;Time
                served&rdquo; is treated as evidence of competence. But an apprentice who wires 50
                ring finals without ever reflecting, understanding the regulations, or experimenting
                with improvements has not truly learned &mdash; they have just repeated.
                Kolb&rsquo;s cycle gives you a structure to turn routine work into genuine
                development.
              </p>
            </div>
          </div>

          {/* ── Learning Outcomes ──────────────────────────────────── */}
          <div className="rounded-xl bg-white/5 border border-white/10 p-5">
            <h2 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-rose-400" />
              Learning Outcomes
            </h2>
            <p className="text-white text-sm mb-4">
              By the end of this section you will be able to:
            </p>
            <ul className="space-y-3">
              {[
                'Describe all four stages of Kolb\u2019s experiential learning cycle',
                'Explain why skipping any stage leads to incomplete learning',
                'Name and describe the four Honey and Mumford learning styles',
                'Match each learning style to its corresponding Kolb stage',
                'Design a training activity that completes the full cycle',
                'Identify a learner\u2019s preferred style and adapt your mentoring accordingly',
              ].map((outcome, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-sm leading-relaxed">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          <hr className="border-white/10" />

          {/* ================================================================ */}
          {/*  SECTION 01 — The Four Stages of Kolb's Cycle                    */}
          {/* ================================================================ */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-rose-400 text-xs font-bold tracking-widest">01</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                The Four Stages of Kolb&rsquo;s Cycle
              </h2>
            </div>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              David Kolb published his experiential learning theory in 1984. His central argument
              was simple but powerful:{' '}
              <strong className="text-white">experience alone does not produce learning.</strong>{' '}
              Learning only happens when experience is combined with reflection, conceptualisation,
              and experimentation in a continuous cycle.
            </p>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              The cycle has four stages, and each stage feeds into the next. A learner can enter the
              cycle at any point, but all four stages must be completed for genuine learning to take
              place. Here are the four stages explained with construction examples:
            </p>

            {/* Rose framework box — 4 stages */}
            <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-5 space-y-4">
              <h3 className="text-rose-400 font-semibold text-sm flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Kolb&rsquo;s Four Stages of Experiential Learning (1984)
              </h3>

              <div className="space-y-4">
                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="text-white font-semibold text-sm mb-2">
                    Stage 1: Concrete Experience (CE)
                  </h4>
                  <p className="text-white text-sm leading-relaxed mb-2">
                    The learner has a direct, hands-on experience. This could be doing a task for
                    the first time, observing a demonstration, or encountering a problem on site.
                    The experience must be tangible and meaningful &mdash; not just reading about
                    something.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong className="text-rose-400">Construction example:</strong> An apprentice
                    wires a ring final circuit for the first time under supervision. They physically
                    handle the cable, make connections, and see the circuit take shape.
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="text-white font-semibold text-sm mb-2">
                    Stage 2: Reflective Observation (RO)
                  </h4>
                  <p className="text-white text-sm leading-relaxed mb-2">
                    The learner steps back and reviews what happened. They think about what went
                    well, what went wrong, what was difficult, and what was surprising. This is
                    where the mentor&rsquo;s role is critical &mdash; asking the right questions to
                    guide reflection.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong className="text-rose-400">Construction example:</strong> After
                    completing the first fix, the mentor debriefs: &ldquo;How did that feel? Where
                    did you get stuck? Why do you think the cable kept twisting at that corner? What
                    would you do differently?&rdquo;
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="text-white font-semibold text-sm mb-2">
                    Stage 3: Abstract Conceptualisation (AC)
                  </h4>
                  <p className="text-white text-sm leading-relaxed mb-2">
                    The learner connects their experience to theory, principles, or rules. They move
                    from &ldquo;what happened&rdquo; to &ldquo;why it happened&rdquo; and
                    &ldquo;what the rules say.&rdquo; This is where regulations,
                    manufacturers&rsquo; guidance, and technical principles are introduced &mdash;
                    grounded in the learner&rsquo;s own experience.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong className="text-rose-400">Construction example:</strong> The mentor
                    explains BS 7671 Regulation 433.1 on conductor sizing: &ldquo;The reason we use
                    2.5 mm&sup2; cable for ring finals is because the regulation requires the
                    conductor to carry the design current without exceeding its current-carrying
                    capacity. Let us look at Table 4D5A to see how the values work.&rdquo;
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="text-white font-semibold text-sm mb-2">
                    Stage 4: Active Experimentation (AE)
                  </h4>
                  <p className="text-white text-sm leading-relaxed mb-2">
                    The learner applies what they have learned in a new context. They try the task
                    again, this time using insights from reflection and theory to improve. This
                    generates a new Concrete Experience, and the cycle begins again.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong className="text-rose-400">Construction example:</strong> The apprentice
                    attempts the next ring final circuit independently, applying the cable routing
                    techniques discussed during reflection and the conductor sizing principles from
                    BS 7671. The mentor observes but intervenes less.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              <strong className="text-white">The cycle is continuous.</strong> Each time the learner
              completes the four stages, they return to Concrete Experience with a deeper level of
              understanding. The first ring final might take an hour with constant guidance. By the
              tenth, the apprentice works independently and confidently. But this progression only
              happens if all four stages are completed each time &mdash; not if the apprentice
              simply repeats the same task mechanically.
            </p>
          </section>

          {/* ── InlineCheck #1 ────────────────────────────────────── */}
          <InlineCheck
            id="md-m1-s2-check-1"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* ================================================================ */}
          {/*  SECTION 02 — Honey & Mumford Learning Styles                    */}
          {/* ================================================================ */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-rose-400 text-xs font-bold tracking-widest">02</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Honey &amp; Mumford Learning Styles
              </h2>
            </div>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              Peter Honey and Alan Mumford (1986) built on Kolb&rsquo;s work by identifying four
              learning styles that correspond to the four stages of the cycle. While most people use
              all four styles to some degree, individuals tend to have one or two preferences that
              influence how they engage with learning. Understanding these preferences helps you
              adapt your mentoring approach.
            </p>

            {/* Rose framework box — 4 styles */}
            <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-5 space-y-4">
              <h3 className="text-rose-400 font-semibold text-sm flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Honey &amp; Mumford&rsquo;s Four Learning Styles (1986)
              </h3>

              <div className="space-y-4">
                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    Activist (maps to Concrete Experience)
                  </h4>
                  <p className="text-white text-sm leading-relaxed mb-2">
                    Activists learn by doing. They enjoy new experiences, are open-minded, and tend
                    to dive in without much preparation. They get bored by long explanations and
                    want to get their hands on things immediately. On site, the Activist apprentice
                    wants to pick up the cable and start wiring before you have finished explaining
                    the circuit diagram.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong className="text-rose-400">Mentoring tip:</strong> Give them hands-on
                    tasks quickly, but build in structured reflection afterwards so they actually
                    learn from the experience rather than just racing through it.
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    Reflector (maps to Reflective Observation)
                  </h4>
                  <p className="text-white text-sm leading-relaxed mb-2">
                    Reflectors prefer to stand back and observe before acting. They like to watch
                    demonstrations, gather information, and think carefully before committing. They
                    can appear slow or hesitant, but they are processing deeply. On site, the
                    Reflector wants to watch you do the task first and ask questions before they
                    attempt it themselves.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong className="text-rose-400">Mentoring tip:</strong> Give them time to
                    observe and think. Do not rush them into action. Provide demonstrations and
                    allow questions. But set a clear point where they must attempt the task &mdash;
                    otherwise they may never feel &ldquo;ready enough.&rdquo;
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    Theorist (maps to Abstract Conceptualisation)
                  </h4>
                  <p className="text-white text-sm leading-relaxed mb-2">
                    Theorists want to understand the underlying principles, models, and logic. They
                    like structured information, clear explanations, and evidence-based reasoning.
                    They are uncomfortable with ambiguity and subjectivity. On site, the Theorist
                    apprentice wants to read BS 7671 and understand the regulation before they start
                    the practical work.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong className="text-rose-400">Mentoring tip:</strong> Provide the
                    &ldquo;why&rdquo; and the theory early. Reference regulations and
                    manufacturers&rsquo; instructions. But ensure they get enough practical
                    experience &mdash; understanding the theory is not the same as being able to do
                    the work.
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    Pragmatist (maps to Active Experimentation)
                  </h4>
                  <p className="text-white text-sm leading-relaxed mb-2">
                    Pragmatists want to know how to apply learning in practice. They are interested
                    in techniques, tips, and practical outcomes. They get frustrated by theory that
                    does not seem relevant and always ask &ldquo;How can I use this?&rdquo; On site,
                    the Pragmatist wants to try things out, experiment with different approaches,
                    and find the most efficient method.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong className="text-rose-400">Mentoring tip:</strong> Connect every piece of
                    theory to a practical application. Show them how the regulation affects what
                    they do on site. Give them opportunities to experiment and find their own
                    methods (within safety and compliance boundaries).
                  </p>
                </div>
              </div>
            </div>

            {/* Style mapping table */}
            <div className="rounded-xl bg-white/5 border border-white/10 p-5">
              <h3 className="text-white font-semibold text-sm mb-4">
                Mapping Styles to Kolb&rsquo;s Stages
              </h3>
              <div className="space-y-0">
                <div className="grid grid-cols-3 gap-3 py-3 border-b border-white/10">
                  <span className="text-rose-400 text-xs font-bold">KOLB STAGE</span>
                  <span className="text-rose-400 text-xs font-bold">H&amp;M STYLE</span>
                  <span className="text-rose-400 text-xs font-bold">PREFERS TO...</span>
                </div>
                {[
                  {
                    stage: 'Concrete Experience',
                    style: 'Activist',
                    prefers: 'Dive in and learn by doing',
                  },
                  {
                    stage: 'Reflective Observation',
                    style: 'Reflector',
                    prefers: 'Watch, think, and analyse before acting',
                  },
                  {
                    stage: 'Abstract Conceptualisation',
                    style: 'Theorist',
                    prefers: 'Understand the theory and logic first',
                  },
                  {
                    stage: 'Active Experimentation',
                    style: 'Pragmatist',
                    prefers: 'Apply knowledge to practical situations',
                  },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-3 gap-3 py-3 border-b border-white/5">
                    <span className="text-white text-sm">{row.stage}</span>
                    <span className="text-white text-sm font-medium">{row.style}</span>
                    <span className="text-white text-sm">{row.prefers}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-400" />
                Recognising Styles on Site
              </h3>
              <p className="text-white text-sm leading-relaxed">
                You do not need a formal questionnaire to identify learning style preferences. Watch
                how your apprentice naturally approaches new tasks:
              </p>
              <ul className="space-y-2 text-white text-sm leading-relaxed list-disc list-inside">
                <li>
                  <strong className="text-white">Activist signs:</strong> Eager to start, impatient
                  with instructions, enthusiastic about new tasks, may rush and make avoidable
                  errors
                </li>
                <li>
                  <strong className="text-white">Reflector signs:</strong> Watches carefully, asks
                  lots of questions before starting, takes thorough notes, may appear hesitant or
                  slow
                </li>
                <li>
                  <strong className="text-white">Theorist signs:</strong> Asks &ldquo;why?&rdquo;
                  frequently, wants to see the regulation or manufacturer&rsquo;s data, prefers
                  structured explanations, uncomfortable with &ldquo;just do it this way&rdquo;
                </li>
                <li>
                  <strong className="text-white">Pragmatist signs:</strong> Asks &ldquo;how does
                  this apply to the job?&rdquo;, experiments with different methods, focuses on
                  efficiency and practical outcomes, impatient with theory that seems irrelevant
                </li>
              </ul>
            </div>
          </section>

          {/* ── InlineCheck #2 ────────────────────────────────────── */}
          <InlineCheck
            id="md-m1-s2-check-2"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* ================================================================ */}
          {/*  SECTION 03 — Why Skipping Stages Leads to Incomplete Learning   */}
          {/* ================================================================ */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-rose-400 text-xs font-bold tracking-widest">03</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Why Skipping Stages Leads to Incomplete Learning
              </h2>
            </div>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              The most common mistake in construction training is treating experience as sufficient
              on its own. &ldquo;He has been wiring for two years, so he must know what he is
              doing.&rdquo; But if those two years involved repeating the same tasks without
              reflection, theory, or experimentation, the apprentice may have one year&rsquo;s
              experience repeated twice rather than two years of genuine development.
            </p>

            <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-4">
              <h3 className="text-white font-semibold text-sm">
                What Happens When You Skip Each Stage
              </h3>

              <div className="space-y-3">
                <div className="rounded-lg bg-rose-500/5 border border-rose-500/20 p-3">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    Without Concrete Experience
                  </h4>
                  <p className="text-white text-sm leading-relaxed">
                    Learning is purely theoretical. The learner can discuss cable sizing in a
                    classroom but freezes when handed a drum of cable and told to wire a consumer
                    unit. College students who have never been on site often fall into this gap.
                  </p>
                </div>

                <div className="rounded-lg bg-rose-500/5 border border-rose-500/20 p-3">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    Without Reflective Observation
                  </h4>
                  <p className="text-white text-sm leading-relaxed">
                    The learner repeats mistakes because they never stop to examine what went wrong.
                    This is the most common gap in construction. The site is busy, deadlines press,
                    and the apprentice moves straight from one task to the next without debriefing.
                    Bad habits become embedded.
                  </p>
                </div>

                <div className="rounded-lg bg-rose-500/5 border border-rose-500/20 p-3">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    Without Abstract Conceptualisation
                  </h4>
                  <p className="text-white text-sm leading-relaxed">
                    The learner can do a task in a familiar context but cannot adapt when conditions
                    change. They wire ring finals perfectly in new-build houses but are lost when
                    faced with a TT supply or an existing installation with aluminium conductors.
                    Without understanding the underlying principles, they cannot generalise.
                  </p>
                </div>

                <div className="rounded-lg bg-rose-500/5 border border-rose-500/20 p-3">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    Without Active Experimentation
                  </h4>
                  <p className="text-white text-sm leading-relaxed">
                    The learner understands what to do but never tests their knowledge in a new
                    situation. They can describe the correct procedure but lack the confidence to
                    attempt it independently. This creates permanently dependent workers who always
                    need supervision.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-elec-yellow/10 border border-elec-yellow/30 p-5">
              <h3 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-elec-yellow" />
                Key Point
              </h3>
              <p className="text-white text-sm leading-relaxed">
                A &ldquo;time-served&rdquo; electrician with 20 years of experience but no
                reflection or continuing development may be less competent than a newly qualified
                electrician who has systematically worked through all four stages of Kolb&rsquo;s
                cycle. Experience is necessary but not sufficient &mdash; it must be processed
                through the full cycle to become genuine learning.
              </p>
            </div>
          </section>

          {/* ================================================================ */}
          {/*  SECTION 04 — Designing Activities That Complete the Full Cycle   */}
          {/* ================================================================ */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-rose-400 text-xs font-bold tracking-widest">04</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Designing Activities That Complete the Full Cycle
              </h2>
            </div>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              As a mentor, your job is to ensure that every significant learning experience includes
              all four stages of Kolb&rsquo;s cycle. This does not mean every task needs a formal
              training plan &mdash; it means building brief moments of reflection, theory, and
              experimentation into the natural flow of work.
            </p>

            {/* Full worked example: ring final circuit */}
            <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-5 space-y-4">
              <h3 className="text-rose-400 font-semibold text-sm flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Worked Example: Wiring a Ring Final Circuit Through the Full Cycle
              </h3>

              <div className="space-y-3">
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">
                    Stage 1: Concrete Experience
                  </h4>
                  <p className="text-white text-sm leading-relaxed">
                    The apprentice wires a ring final circuit under your supervision. They handle
                    the cable, make connections at each socket outlet, and connect both legs at the
                    consumer unit. You guide them through any difficulties but let them do the
                    physical work.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">
                    Stage 2: Reflective Observation
                  </h4>
                  <p className="text-white text-sm leading-relaxed">
                    At the end of the task (or during a natural break), you debrief: &ldquo;How did
                    that go? Where did you find it most difficult? Why do you think the connections
                    at socket 4 took longer? What would you do differently next time?&rdquo; Give
                    the apprentice time to think and respond &mdash; do not answer your own
                    questions.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">
                    Stage 3: Abstract Conceptualisation
                  </h4>
                  <p className="text-white text-sm leading-relaxed">
                    Connect the experience to theory: &ldquo;The reason we use 2.5 mm&sup2; twin and
                    earth is BS 7671 Regulation 433.1 &mdash; the conductor must carry the design
                    current. In a ring, the current splits, so each leg carries roughly half. Let us
                    look at the current-carrying capacity tables to see how this works.&rdquo;
                    Reference the regulation, explain the principle, and show how it relates to what
                    they just did.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">
                    Stage 4: Active Experimentation
                  </h4>
                  <p className="text-white text-sm leading-relaxed">
                    The apprentice attempts the next ring final circuit independently, applying the
                    improvements identified during reflection and the principles from the theory
                    discussion. You observe from a distance, only stepping in if there is a safety
                    concern or they ask for help.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-400" />
                Adapting for Different Learning Styles
              </h3>
              <p className="text-white text-sm leading-relaxed">
                When designing a learning activity, consider how to cater for all four styles:
              </p>
              <ul className="space-y-2 text-white text-sm leading-relaxed list-disc list-inside">
                <li>
                  <strong className="text-white">For Activists:</strong> Let them get hands-on
                  quickly. Do not front-load too much theory. But build in reflection afterwards
                  &mdash; they will resist this, so make it structured and brief.
                </li>
                <li>
                  <strong className="text-white">For Reflectors:</strong> Provide a demonstration
                  first. Allow them to observe and ask questions. Give them time to process before
                  attempting the task. Do not rush them into action.
                </li>
                <li>
                  <strong className="text-white">For Theorists:</strong> Start with the regulation
                  or principle. Explain the logic behind the procedure. Provide references they can
                  read later. But ensure they get practical experience &mdash; understanding theory
                  is not the same as competence.
                </li>
                <li>
                  <strong className="text-white">For Pragmatists:</strong> Show them the practical
                  outcome immediately. Explain how the theory applies to what they do on site. Give
                  them freedom to experiment with methods (within safety limits). They will engage
                  most when they can see direct relevance.
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-rose-400" />
                Quick Reflection Techniques for Busy Sites
              </h3>
              <p className="text-white text-sm leading-relaxed">
                You do not need a formal classroom setting to complete the cycle. Here are practical
                ways to build reflection into a busy workday:
              </p>
              <ul className="space-y-2 text-white text-sm leading-relaxed list-disc list-inside">
                <li>
                  <strong className="text-white">Tea break debrief:</strong> Use a five-minute
                  conversation over a cup of tea to ask &ldquo;What did you learn from that
                  task?&rdquo; and &ldquo;What would you do differently?&rdquo;
                </li>
                <li>
                  <strong className="text-white">Van ride review:</strong> On the drive to the next
                  job, discuss what went well and what to improve. This is a natural, informal
                  setting that does not feel like a formal training session.
                </li>
                <li>
                  <strong className="text-white">End-of-day question:</strong> Before you pack up,
                  ask one question: &ldquo;What is the most important thing you learned
                  today?&rdquo; This takes 60 seconds and forces reflection.
                </li>
                <li>
                  <strong className="text-white">Photo review:</strong> Ask the apprentice to
                  photograph their work before and after. Reviewing the photos together prompts
                  reflection on quality, neatness, and compliance.
                </li>
              </ul>
            </div>

            {/* Key takeaway */}
            <div className="rounded-xl bg-elec-yellow/10 border border-elec-yellow/30 p-5">
              <h3 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-elec-yellow" />
                Key Takeaway
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Kolb&rsquo;s cycle is not a theoretical model to memorise &mdash; it is a practical
                tool you use every day. Every task on site is an opportunity for learning if you add
                reflection, theory, and experimentation. The difference between an apprentice who
                &ldquo;does four years&rdquo; and one who &ldquo;learns for four years&rdquo; is
                whether a mentor guided them through the full cycle.
              </p>
            </div>
          </section>

          {/* ── InlineCheck #3 ────────────────────────────────────── */}
          <InlineCheck
            id="md-m1-s2-check-3"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* ================================================================ */}
          {/*  FAQ                                                              */}
          {/* ================================================================ */}
          <section className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-rose-400" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-5">
                  <h3 className="text-white font-semibold text-sm mb-2">{faq.question}</h3>
                  <p className="text-white text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ================================================================ */}
          {/*  End-of-section Quiz                                             */}
          {/* ================================================================ */}
          <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

          {/* ================================================================ */}
          {/*  Bottom Navigation                                               */}
          {/* ================================================================ */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../md-module-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Module
              </Link>
            </Button>
            <Button
              size="lg"
              className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../md-module-1-section-3">
                Next: Scaffolding &amp; the Zone of Proximal Development
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}
