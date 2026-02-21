import { ArrowLeft, Layers, CheckCircle, BookOpen, Lightbulb, Target, Users } from 'lucide-react';
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
      'A Stage 1 apprentice can wire a lighting circuit with constant supervision but cannot do it independently. According to Vygotsky, this task sits in which zone?',
    options: [
      'The zone of what the learner can do alone',
      'The Zone of Proximal Development',
      'The zone of what the learner cannot yet do',
      'The zone of mastery',
    ],
    correctIndex: 1,
    explanation:
      'If the apprentice can complete the task with help but not alone, it sits squarely in the Zone of Proximal Development (ZPD). This is exactly where mentoring adds the most value \u2014 the gap between independent capability and potential capability with support.',
  },
  {
    id: 2,
    question:
      'Wood, Bruner and Ross identified six functions of scaffolding. Which function involves simplifying a task by reducing the number of steps the learner has to manage at once?',
    options: [
      'Recruitment',
      'Reduction in degrees of freedom',
      'Direction maintenance',
      'Frustration control',
    ],
    correctIndex: 1,
    explanation:
      'Reduction in degrees of freedom means breaking a complex task into manageable parts. Instead of asking an apprentice to install a complete consumer unit, you might first ask them to terminate just the protective conductors while you handle the rest. This reduces the number of variables they must manage simultaneously.',
  },
  {
    id: 3,
    question:
      'In Hersey and Blanchard\u2019s Situational Leadership model, which leadership style is most appropriate for a learner at Readiness Level R3 (able but unwilling or insecure)?',
    options: [
      'S1: Telling (high task, low relationship)',
      'S2: Selling (high task, high relationship)',
      'S3: Participating (low task, high relationship)',
      'S4: Delegating (low task, low relationship)',
    ],
    correctIndex: 2,
    explanation:
      'An R3 learner has the skills but lacks confidence or willingness. They need support and encouragement rather than direction. S3 (Participating) involves sharing decision-making, listening, and providing reassurance \u2014 reducing task direction while maintaining a supportive relationship.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Did Vygotsky invent scaffolding?',
    answer:
      'No. Vygotsky (1896\u20131934) developed the concept of the Zone of Proximal Development. The term "scaffolding" was coined by Wood, Bruner, and Ross in 1976 to describe the practical support strategies that help a learner work within their ZPD. Vygotsky died before the scaffolding metaphor was created, but his work on the ZPD inspired it.',
  },
  {
    question: 'How do I know when to remove scaffolding?',
    answer:
      'Watch for signs of growing independence: the learner completes tasks without prompting, asks fewer procedural questions, starts anticipating next steps, and self-corrects errors. Use a gradual approach \u2014 step back slightly and observe whether they maintain quality and safety. If they struggle, step back in temporarily. Fading scaffolding too quickly causes frustration; keeping it too long creates dependency.',
  },
  {
    question: 'Is Situational Leadership the same as the ZPD?',
    answer:
      'They are different frameworks that complement each other. The ZPD (Vygotsky) describes the gap between what a learner can do alone and what they can do with help. Situational Leadership (Hersey & Blanchard, 1969) describes how a leader should adapt their style based on the follower\u2019s readiness level. When mapped together, they provide a powerful framework: assess where the learner is in the ZPD, then select the appropriate leadership style to match.',
  },
  {
    question: 'What if the apprentice resists having scaffolding removed?',
    answer:
      'Some learners become comfortable with high levels of support and resist working independently. This is normal. Address it by discussing their progress openly, setting clear expectations for independence, and using incremental steps. Instead of suddenly withdrawing all support, try: "I\u2019m going to let you start this circuit while I work on the distribution board. I\u2019ll check in after 20 minutes." Gradual withdrawal builds confidence without feeling like abandonment.',
  },
];

/* ------------------------------------------------------------------ */
/*  End-of-section quiz                                                */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'Who developed the concept of the Zone of Proximal Development?',
    options: ['Wood, Bruner and Ross', 'Hersey and Blanchard', 'Lev Vygotsky', 'Malcolm Knowles'],
    correctAnswer: 2,
    explanation:
      'The Zone of Proximal Development was developed by Lev Vygotsky, a Russian psychologist, as part of his social constructivist theory of learning. He described it as the distance between what a learner can do independently and what they can do with guidance.',
  },
  {
    id: 2,
    question: 'Who coined the term "scaffolding" in education?',
    options: [
      'Lev Vygotsky in the 1930s',
      'Wood, Bruner and Ross in 1976',
      'Hersey and Blanchard in 1969',
      'David Kolb in 1984',
    ],
    correctAnswer: 1,
    explanation:
      'Wood, Bruner, and Ross introduced the scaffolding metaphor in their 1976 paper "The Role of Tutoring in Problem Solving." While inspired by Vygotsky\u2019s ZPD, the scaffolding concept was developed after Vygotsky\u2019s death.',
  },
  {
    id: 3,
    question: 'How many functions of scaffolding did Wood, Bruner and Ross identify?',
    options: ['Four', 'Five', 'Six', 'Seven'],
    correctAnswer: 2,
    explanation:
      'Wood, Bruner and Ross identified six functions: recruitment, reduction in degrees of freedom, direction maintenance, marking critical features, frustration control, and demonstration.',
  },
  {
    id: 4,
    question:
      'A mentor breaks a consumer unit installation into smaller sub-tasks so the apprentice only focuses on one part at a time. Which scaffolding function is this?',
    options: [
      'Recruitment',
      'Reduction in degrees of freedom',
      'Direction maintenance',
      'Marking critical features',
    ],
    correctAnswer: 1,
    explanation:
      'Reduction in degrees of freedom involves simplifying a task by reducing the number of actions or decisions the learner must manage simultaneously. Breaking a complex installation into sub-tasks is a classic example.',
  },
  {
    id: 5,
    question: 'In Situational Leadership, what does Readiness Level R1 describe?',
    options: [
      'Able and willing \u2014 competent and confident',
      'Able but unwilling \u2014 competent but insecure',
      'Unable but willing \u2014 motivated but lacking skill',
      'Unable and unwilling \u2014 neither competent nor motivated',
    ],
    correctAnswer: 3,
    explanation:
      'R1 describes a learner who is unable and unwilling (or insecure). They lack both the skill and the confidence or motivation. This requires an S1 (Telling) leadership style with high task direction and close supervision.',
  },
  {
    id: 6,
    question:
      'Which Situational Leadership style involves high task direction AND high relationship support?',
    options: ['S1: Telling', 'S2: Selling', 'S3: Participating', 'S4: Delegating'],
    correctAnswer: 1,
    explanation:
      'S2 (Selling) combines high task direction with high relationship support. The leader explains decisions, provides opportunity for clarification, and maintains a supportive relationship. This is appropriate for R2 learners who are unable but willing.',
  },
  {
    id: 7,
    question: 'What does "fading" mean in the context of scaffolding?',
    options: [
      'Reducing the difficulty of the task over time',
      'Gradually removing support as the learner gains competence',
      'Moving the learner to a different mentor',
      'Decreasing the learner\u2019s workload during training',
    ],
    correctAnswer: 1,
    explanation:
      'Fading is the systematic, gradual withdrawal of scaffolding support as the learner demonstrates growing competence. The goal is to move the learner from supported performance to independent mastery without removing support too quickly or too slowly.',
  },
  {
    id: 8,
    question:
      'A newly qualified electrician can complete most tasks independently but still asks for advice on unfamiliar situations. Which Situational Leadership style is most appropriate?',
    options: ['S1: Telling', 'S2: Selling', 'S3: Participating', 'S4: Delegating'],
    correctAnswer: 2,
    explanation:
      'This describes an R3 learner \u2014 able but sometimes unsure. S3 (Participating) is appropriate: the mentor provides support and encouragement through shared decision-making rather than directing the task. The emphasis is on relationship support, not task direction.',
  },
];

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
export default function MDModule1Section3() {
  useSEO({
    title:
      'Scaffolding & the Zone of Proximal Development | Module 1 Section 3 | Mentoring & Developing Others',
    description:
      'Vygotsky\u2019s ZPD, Wood, Bruner and Ross scaffolding, Situational Leadership, and fading \u2014 applied to UK construction and electrical training.',
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
              className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
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
                <Layers className="h-6 w-6 text-rose-400" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                <span className="text-rose-400 text-xs font-semibold">MODULE 1</span>
                <span className="text-white text-xs">&middot;</span>
                <span className="text-white text-xs">SECTION 3</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Scaffolding &amp; the Zone of Proximal Development
            </h1>
            <p className="text-white text-sm sm:text-base leading-relaxed">
              How to provide exactly the right amount of support &mdash; enough to enable learning,
              not so much that it prevents independence.
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
                Vygotsky&rsquo;s Zone of Proximal Development (ZPD) describes the gap between what a
                learner can do alone and what they can achieve with guidance. Wood, Bruner and Ross
                (1976) called the support you provide within this zone &ldquo;scaffolding.&rdquo;
                Hersey and Blanchard&rsquo;s Situational Leadership model tells you which leadership
                style to use at each stage. Together, these frameworks help you calibrate your
                mentoring precisely.
              </p>
            </div>
            <div className="rounded-xl bg-rose-500/5 border-l-2 border-rose-500/50 p-4">
              <h2 className="text-rose-400 font-semibold text-sm mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Why It Matters
              </h2>
              <p className="text-white text-sm leading-relaxed">
                Too much support creates dependent workers who never learn to work alone. Too little
                support causes frustration, errors, and safety risks. The ZPD and scaffolding give
                you a framework to pitch your mentoring at exactly the right level &mdash;
                challenging enough to develop competence, supported enough to prevent failure.
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
                'Explain Vygotsky\u2019s Zone of Proximal Development and its three zones',
                'Describe the six functions of scaffolding identified by Wood, Bruner and Ross (1976)',
                'Map Situational Leadership styles (S1\u2013S4) to learner readiness levels (R1\u2013R4)',
                'Explain the concept of fading and why it is essential for developing independence',
                'Apply scaffolding techniques to a construction mentoring scenario',
                'Identify when a learner is ready for reduced support',
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
          {/*  SECTION 01 — Vygotsky's Zone of Proximal Development            */}
          {/* ================================================================ */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-rose-400 text-xs font-bold tracking-widest">01</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Vygotsky&rsquo;s Zone of Proximal Development
              </h2>
            </div>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              Lev Vygotsky (1896&ndash;1934) was a Russian psychologist who argued that learning is
              fundamentally a social process. His most influential concept, the Zone of Proximal
              Development (ZPD), describes the space between what a learner can do independently and
              what they can achieve with the guidance of a more knowledgeable other &mdash; such as
              a mentor.
            </p>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              Vygotsky divided a learner&rsquo;s capability into three zones:
            </p>

            {/* Three zones */}
            <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-5 space-y-4">
              <h3 className="text-rose-400 font-semibold text-sm flex items-center gap-2">
                <Layers className="w-4 h-4" />
                The Three Zones
              </h3>

              <div className="space-y-3">
                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    Zone 1: What the Learner Can Do Alone
                  </h4>
                  <p className="text-white text-sm leading-relaxed">
                    Tasks and knowledge the learner has already mastered. They can complete these
                    independently, consistently, and safely. There is no development value in
                    repeating tasks at this level unless the goal is to build speed or refine
                    quality.
                  </p>
                  <p className="text-white text-xs leading-relaxed mt-2">
                    <strong className="text-rose-400">Construction example:</strong> A third-year
                    apprentice who can independently wire a lighting circuit with loop-in
                    connections, test it, and certify it correctly every time.
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 p-4 border border-rose-500/20">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    Zone 2: The Zone of Proximal Development (ZPD)
                  </h4>
                  <p className="text-white text-sm leading-relaxed">
                    Tasks the learner can complete with guidance, support, or collaboration but
                    cannot yet do independently.{' '}
                    <strong className="text-white">
                      This is where mentoring has the greatest impact.
                    </strong>{' '}
                    The learner is stretched beyond their current ability but not so far that the
                    task is impossible. The mentor provides just enough support to bridge the gap.
                  </p>
                  <p className="text-white text-xs leading-relaxed mt-2">
                    <strong className="text-rose-400">Construction example:</strong> The same
                    apprentice attempting a consumer unit change for the first time. They understand
                    circuits and connections but have never managed the sequencing, safe isolation
                    of a live board, or the certification requirements for a full installation. With
                    your guidance, they can do it. Without you, they cannot &mdash; yet.
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    Zone 3: What the Learner Cannot Yet Do
                  </h4>
                  <p className="text-white text-sm leading-relaxed">
                    Tasks that are currently beyond the learner even with support. The prerequisite
                    knowledge or skills are not yet in place. Attempting tasks in this zone leads to
                    frustration, failure, and potential safety risks.
                  </p>
                  <p className="text-white text-xs leading-relaxed mt-2">
                    <strong className="text-rose-400">Construction example:</strong> Asking a Stage
                    1 apprentice in their first month to design a three-phase distribution system
                    for a commercial building. They lack the foundational knowledge of protection,
                    cable sizing, and load balancing needed to even begin.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              <strong className="text-white">
                The mentor&rsquo;s primary job is to identify the ZPD and work within it.
              </strong>{' '}
              If you set tasks that are too easy (Zone 1), the learner is bored and unchallenged. If
              you set tasks that are too hard (Zone 3), they are overwhelmed and may develop a fear
              of failure. The ZPD is the sweet spot where learning happens most effectively.
            </p>

            <div className="rounded-xl bg-elec-yellow/10 border border-elec-yellow/30 p-5">
              <h3 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-elec-yellow" />
                Remember
              </h3>
              <p className="text-white text-sm leading-relaxed">
                The ZPD is not fixed &mdash; it moves as the learner develops. What was in the ZPD
                last month may now be in Zone 1 (mastered). What was in Zone 3 (impossible) may now
                be in the ZPD (achievable with help). A good mentor continuously reassesses where
                the learner is and adjusts the challenge accordingly.
              </p>
            </div>
          </section>

          {/* ── InlineCheck #1 ────────────────────────────────────── */}
          <InlineCheck
            id="md-m1-s3-check-1"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* ================================================================ */}
          {/*  SECTION 02 — Wood, Bruner & Ross: Six Functions of Scaffolding  */}
          {/* ================================================================ */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-rose-400 text-xs font-bold tracking-widest">02</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Wood, Bruner &amp; Ross: Six Functions of Scaffolding
              </h2>
            </div>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              In 1976, David Wood, Jerome Bruner, and Gail Ross published a landmark paper titled
              &ldquo;The Role of Tutoring in Problem Solving.&rdquo; They used the metaphor of{' '}
              <strong className="text-white">scaffolding</strong> to describe how a more
              knowledgeable person supports a learner working within their ZPD &mdash; just as
              physical scaffolding supports a building during construction, then is removed once the
              structure can stand on its own.
            </p>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              Wood, Bruner and Ross identified six specific functions that scaffolding serves.
              Understanding these functions gives you a precise vocabulary for describing what you
              do when you mentor someone:
            </p>

            {/* Rose framework box — 6 functions */}
            <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-5 space-y-4">
              <h3 className="text-rose-400 font-semibold text-sm flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Six Functions of Scaffolding (Wood, Bruner &amp; Ross, 1976)
              </h3>

              <div className="space-y-3">
                <div className="rounded-lg bg-white/5 p-3">
                  <h4 className="text-white font-semibold text-sm mb-1">1. Recruitment</h4>
                  <p className="text-white text-sm leading-relaxed">
                    Engaging the learner&rsquo;s interest in the task and getting their commitment
                    to attempt it. The learner must want to try before scaffolding can begin.
                  </p>
                  <p className="text-white text-xs leading-relaxed mt-1">
                    <strong className="text-rose-400">On site:</strong> &ldquo;Today you are going
                    to wire your first consumer unit. This is a big step &mdash; it is one of the
                    most important skills you will learn as an electrician. I will be right here the
                    whole time.&rdquo;
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 p-3">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    2. Reduction in Degrees of Freedom
                  </h4>
                  <p className="text-white text-sm leading-relaxed">
                    Simplifying the task by reducing the number of actions or decisions the learner
                    must handle simultaneously. Break the complex task into manageable sub-tasks.
                  </p>
                  <p className="text-white text-xs leading-relaxed mt-1">
                    <strong className="text-rose-400">On site:</strong> Instead of asking the
                    apprentice to do the entire consumer unit change, start with: &ldquo;First, let
                    us just focus on the safe isolation procedure. I will handle everything else for
                    now.&rdquo;
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 p-3">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    3. Direction Maintenance
                  </h4>
                  <p className="text-white text-sm leading-relaxed">
                    Keeping the learner focused on the goal and motivated to continue. Prevent them
                    from drifting off-task, getting distracted, or giving up when it gets difficult.
                  </p>
                  <p className="text-white text-xs leading-relaxed mt-1">
                    <strong className="text-rose-400">On site:</strong> &ldquo;You are doing really
                    well. Let us keep going &mdash; the next step is connecting the main switch.
                    Take a breath and tell me what goes where.&rdquo;
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 p-3">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    4. Marking Critical Features
                  </h4>
                  <p className="text-white text-sm leading-relaxed">
                    Drawing the learner&rsquo;s attention to the most important aspects of the task
                    &mdash; the things that really matter for safety, quality, or compliance.
                    Highlighting what to focus on and what can be addressed later.
                  </p>
                  <p className="text-white text-xs leading-relaxed mt-1">
                    <strong className="text-rose-400">On site:</strong> &ldquo;The critical thing
                    here is the torque on these connections. A loose connection in a consumer unit
                    can cause a fire. Let me show you how to use the torque screwdriver and what the
                    manufacturer specifies.&rdquo;
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 p-3">
                  <h4 className="text-white font-semibold text-sm mb-1">5. Frustration Control</h4>
                  <p className="text-white text-sm leading-relaxed">
                    Managing the learner&rsquo;s emotional state when things go wrong. Reducing
                    stress, normalising mistakes, and maintaining confidence. This is especially
                    important in construction, where errors can feel high-stakes.
                  </p>
                  <p className="text-white text-xs leading-relaxed mt-1">
                    <strong className="text-rose-400">On site:</strong> &ldquo;Do not worry about
                    that &mdash; everyone gets the neutral and earth mixed up the first time. It is
                    exactly why we check everything before we energise. Let us fix it together and
                    then you will remember for next time.&rdquo;
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 p-3">
                  <h4 className="text-white font-semibold text-sm mb-1">6. Demonstration</h4>
                  <p className="text-white text-sm leading-relaxed">
                    Modelling the correct approach. Showing the learner how to do something, often
                    with an idealised or slowed-down version that makes the key steps visible. Not
                    just doing it in front of them, but narrating your process.
                  </p>
                  <p className="text-white text-xs leading-relaxed mt-1">
                    <strong className="text-rose-400">On site:</strong> &ldquo;Watch how I strip
                    this cable. I am holding the knife at this angle to score the outer sheath
                    without cutting into the inner insulation. See how I pull rather than
                    cut?&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── InlineCheck #2 ────────────────────────────────────── */}
          <InlineCheck
            id="md-m1-s3-check-2"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* ================================================================ */}
          {/*  SECTION 03 — Situational Leadership Mapped to the ZPD           */}
          {/* ================================================================ */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-rose-400 text-xs font-bold tracking-widest">03</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Situational Leadership Mapped to the ZPD
              </h2>
            </div>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              Hersey and Blanchard&rsquo;s Situational Leadership model (1969) argues that there is
              no single &ldquo;best&rdquo; leadership style. Instead, effective leaders adapt their
              approach based on the follower&rsquo;s readiness level. When mapped to the ZPD, this
              gives mentors a practical guide for adjusting their support as a learner develops.
            </p>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              The model defines four leadership styles (S1&ndash;S4) matched to four readiness
              levels (R1&ndash;R4). Each style balances two dimensions: task direction (telling
              people what to do) and relationship support (encouragement, listening, facilitation).
            </p>

            {/* Rose framework box — S1-S4 */}
            <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-5 space-y-4">
              <h3 className="text-rose-400 font-semibold text-sm flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Situational Leadership Styles Mapped to Learner Readiness
              </h3>

              <div className="space-y-3">
                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    R1 &rarr; S1: Telling (High Task, Low Relationship)
                  </h4>
                  <p className="text-white text-sm leading-relaxed mb-2">
                    <strong className="text-white">Learner:</strong> Unable and unwilling/insecure.
                    New to the task, lacks both skill and confidence.
                  </p>
                  <p className="text-white text-sm leading-relaxed mb-2">
                    <strong className="text-white">Mentor approach:</strong> Provide clear, specific
                    instructions. Demonstrate step by step. Closely supervise. Make decisions for
                    the learner.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong className="text-rose-400">On site:</strong> A Stage 1 apprentice on
                    their first day. You demonstrate safe isolation, explain each step, and
                    supervise every action. &ldquo;Connect the green-and-yellow conductor to this
                    terminal. Now tighten to 2.5 Nm.&rdquo;
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    R2 &rarr; S2: Selling (High Task, High Relationship)
                  </h4>
                  <p className="text-white text-sm leading-relaxed mb-2">
                    <strong className="text-white">Learner:</strong> Unable but willing. Motivated
                    and enthusiastic but still lacking competence.
                  </p>
                  <p className="text-white text-sm leading-relaxed mb-2">
                    <strong className="text-white">Mentor approach:</strong> Still provide
                    direction, but also explain the reasoning. Answer questions, build
                    understanding. The learner does more of the work but with close guidance and
                    explanation.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong className="text-rose-400">On site:</strong> A second-year apprentice
                    assisting with a consumer unit change. You explain <em>why</em> each connection
                    is made, let them do the work under supervision, and check their understanding:
                    &ldquo;Why do we connect the protective conductor first?&rdquo;
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    R3 &rarr; S3: Participating (Low Task, High Relationship)
                  </h4>
                  <p className="text-white text-sm leading-relaxed mb-2">
                    <strong className="text-white">Learner:</strong> Able but unwilling/insecure.
                    Has the skills but lacks confidence or motivation.
                  </p>
                  <p className="text-white text-sm leading-relaxed mb-2">
                    <strong className="text-white">Mentor approach:</strong> Reduce task direction.
                    Focus on encouragement, shared decision-making, and building confidence. Listen
                    to concerns and provide reassurance.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong className="text-rose-400">On site:</strong> A newly qualified
                    electrician who can do a consumer unit change but is nervous about doing it
                    unsupervised for the first time. &ldquo;You know how to do this &mdash; you have
                    done it with me several times. I will be in the next room. Talk me through your
                    plan before you start, and call me if you hit anything unexpected.&rdquo;
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    R4 &rarr; S4: Delegating (Low Task, Low Relationship)
                  </h4>
                  <p className="text-white text-sm leading-relaxed mb-2">
                    <strong className="text-white">Learner:</strong> Able and willing. Competent and
                    confident. Ready for full independence.
                  </p>
                  <p className="text-white text-sm leading-relaxed mb-2">
                    <strong className="text-white">Mentor approach:</strong> Step back. Delegate the
                    task fully. Monitor outcomes rather than process. Available if needed but not
                    hovering.
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    <strong className="text-rose-400">On site:</strong> An experienced electrician
                    who consistently delivers compliant consumer unit changes. &ldquo;The CU change
                    at number 14 is yours. Send me photos of the completed work and the test results
                    when you are done.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-400" />
                Construction Example: Consumer Unit Change &mdash; From Demonstrate to Independent
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Here is how a mentor might progress an apprentice through a consumer unit change
                using the ZPD and Situational Leadership:
              </p>
              <ul className="space-y-2 text-white text-sm leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold flex-shrink-0">Week 1 (R1/S1):</span>
                  <span>
                    <strong className="text-white">Demonstrate.</strong> You perform the entire
                    consumer unit change while the apprentice observes. You narrate each step,
                    explain the safety critical points, and answer questions.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold flex-shrink-0">Week 4 (R2/S2):</span>
                  <span>
                    <strong className="text-white">Assist.</strong> The apprentice does the physical
                    work while you guide each step. You explain the reasoning, check their work at
                    each stage, and correct errors immediately.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold flex-shrink-0">Week 8 (R3/S3):</span>
                  <span>
                    <strong className="text-white">Lead.</strong> The apprentice plans and executes
                    the consumer unit change with minimal guidance. You are present but intervene
                    only when asked or when safety is at risk. You debrief afterwards.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold flex-shrink-0">Week 12 (R4/S4):</span>
                  <span>
                    <strong className="text-white">Independent.</strong> The apprentice completes
                    consumer unit changes without direct supervision. You review completed work and
                    test results, providing feedback on quality and compliance.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* ── InlineCheck #3 ────────────────────────────────────── */}
          <InlineCheck
            id="md-m1-s3-check-3"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* ================================================================ */}
          {/*  SECTION 04 — Fading: Removing Scaffolding Systematically        */}
          {/* ================================================================ */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-rose-400 text-xs font-bold tracking-widest">04</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Fading: Removing Scaffolding Systematically
              </h2>
            </div>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              Just as physical scaffolding on a building site is removed once the structure can
              support itself, educational scaffolding must be gradually withdrawn as the learner
              gains competence. This process is called{' '}
              <strong className="text-white">fading</strong>. The goal is to move the learner from
              supported performance to independent mastery.
            </p>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              Fading is a deliberate, planned process &mdash; not an abrupt withdrawal of support.
              Remove scaffolding too quickly and the learner fails and loses confidence. Keep it too
              long and the learner becomes dependent, never developing the ability to work alone.
            </p>

            <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-4">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-rose-400" />
                Signs the Learner Is Ready for Reduced Support
              </h3>
              <ul className="space-y-2 text-white text-sm leading-relaxed list-disc list-inside">
                <li>They complete tasks without prompting or reminders</li>
                <li>
                  They ask fewer procedural questions (&ldquo;What do I do next?&rdquo;) and more
                  conceptual ones (&ldquo;Why do we do it this way?&rdquo;)
                </li>
                <li>They anticipate the next step before you tell them</li>
                <li>They self-correct errors rather than waiting for you to identify them</li>
                <li>They start helping or explaining to other learners</li>
                <li>They express confidence: &ldquo;I think I can do this one on my own&rdquo;</li>
                <li>Quality and safety standards are consistently met without reminders</li>
              </ul>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-400" />
                Practical Fading Techniques
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Here are concrete ways to gradually reduce scaffolding on site:
              </p>
              <ul className="space-y-2 text-white text-sm leading-relaxed list-disc list-inside">
                <li>
                  <strong className="text-white">Increase physical distance:</strong> Instead of
                  standing next to the apprentice, work in the same room. Then the same floor. Then
                  the same building. Eventually, a different site.
                </li>
                <li>
                  <strong className="text-white">Reduce check-in frequency:</strong> Move from
                  checking every connection to checking every circuit to checking the completed
                  installation.
                </li>
                <li>
                  <strong className="text-white">Switch from instruction to questioning:</strong>
                  Instead of &ldquo;Connect the CPC first,&rdquo; ask &ldquo;What should you connect
                  first, and why?&rdquo;
                </li>
                <li>
                  <strong className="text-white">Delay your response:</strong> When they ask a
                  question, pause before answering: &ldquo;What do you think?&rdquo; Let them work
                  through the answer themselves before confirming or correcting.
                </li>
                <li>
                  <strong className="text-white">Assign responsibility:</strong> Give them ownership
                  of a task from start to finish, including planning, execution, testing, and
                  documentation.
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-400" />
                Construction Example: From Stage 1 to Newly Qualified
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Consider the journey of an apprentice from their first day to achieving their AM2
                and JIB Gold Card:
              </p>
              <ul className="space-y-2 text-white text-sm leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold flex-shrink-0">Year 1:</span>
                  <span>
                    Constant supervision. The mentor demonstrates every new task, guides every step,
                    and checks all work. The apprentice is in Zone 3 for most tasks and the ZPD for
                    basic ones (cable stripping, first-fix containment, basic wiring).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold flex-shrink-0">Year 2:</span>
                  <span>
                    Increasing independence on familiar tasks. The mentor steps back on lighting and
                    socket circuits (now Zone 1) and provides scaffolding for more complex tasks
                    like distribution board work and testing (now in the ZPD).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold flex-shrink-0">Year 3:</span>
                  <span>
                    The apprentice handles most domestic tasks independently. The mentor focuses
                    scaffolding on complex scenarios: fault-finding, commercial work, EICR
                    inspections. Regular debrief conversations replace constant supervision.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold flex-shrink-0">Year 4:</span>
                  <span>
                    The apprentice works independently on most tasks. The mentor is available for
                    consultation but no longer supervises directly. The relationship shifts from
                    teacher-student to collegial support. The apprentice passes the AM2 and
                    qualifies.
                  </span>
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
                The ultimate goal of scaffolding is to make yourself unnecessary. A successful
                mentor produces independent, competent electricians who no longer need constant
                support. The ZPD tells you where to focus. Scaffolding tells you what support to
                provide. Situational Leadership tells you what style to use. Fading tells you when
                and how to step back. Together, these frameworks form a complete model for
                developing a learner from novice to expert.
              </p>
            </div>
          </section>

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
          <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

          {/* ================================================================ */}
          {/*  Bottom Navigation                                               */}
          {/* ================================================================ */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
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
              <Link to="../md-module-1-section-4">
                Next: Motivation &amp; Barriers to Learning
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}
