import { ArrowLeft, Brain, CheckCircle, BookOpen, Lightbulb, Target, Users } from 'lucide-react';
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
      'A mature career-changer from plumbing joins your team as an electrical apprentice. According to Knowles, which principle should most influence how you induct them?',
    options: [
      'Internal motivation — they are already self-driven',
      'Experience as a resource — draw on their existing trade knowledge',
      'Need to know why — explain the purpose of each task',
      'Problem-centred orientation — only teach through fault-finding',
    ],
    correctIndex: 1,
    explanation:
      'Knowles\u2019 principle of "experience as a resource" tells us that adult learners bring a wealth of prior knowledge. A career-changer from plumbing already understands pipe runs, building fabric, and site procedures. A good mentor connects new electrical concepts to what they already know rather than starting from scratch.',
  },
  {
    id: 2,
    question:
      'Which level of Bloom\u2019s Taxonomy is an apprentice demonstrating when they correctly identify the purpose of an RCD from a list of protective devices?',
    options: ['Remember', 'Understand', 'Apply', 'Analyse'],
    correctIndex: 0,
    explanation:
      'Identifying or recognising a fact from a list is a recall task, which sits at the "Remember" level of Bloom\u2019s Taxonomy. If the apprentice could explain why an RCD is needed in their own words, that would be "Understand".',
  },
  {
    id: 3,
    question:
      'Your apprentice can recite the disconnection times from BS 7671 Table 41.1 but cannot select the correct protective device for a given circuit. At which Bloom\u2019s level are they stuck?',
    options: [
      'Remember — they can recall but not yet understand',
      'Understand — they grasp the theory but cannot apply it',
      'Apply — they can use it in familiar situations only',
      'Analyse — they cannot break a problem into parts',
    ],
    correctIndex: 1,
    explanation:
      'The apprentice can recall the data (Remember) and may understand the concept, but they cannot yet Apply it to a real scenario. The gap is between Understand and Apply — they need guided practice selecting devices for specific circuits to bridge that gap.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Do I need to memorise all six of Knowles\u2019 principles for the exam?',
    answer:
      'Yes. You should be able to name all six principles and give a brief construction-related example for each. They appear frequently in exam questions and are fundamental to the rest of the course.',
  },
  {
    question: 'Is Bloom\u2019s Taxonomy the original 1956 version or the revised 2001 version?',
    answer:
      'The ILM syllabus and most modern training frameworks use the revised taxonomy by Anderson and Krathwohl (2001), which changed the categories from nouns to verbs and swapped the top two levels. "Create" is now at the top, above "Evaluate". This course uses the revised version throughout.',
  },
  {
    question: 'How does andragogy differ from pedagogy in a practical mentoring context?',
    answer:
      'Pedagogy assumes the teacher directs all learning and the learner is dependent. Andragogy assumes the learner is self-directing, brings relevant experience, and wants to understand why they are learning something. In practice, this means a mentor should involve the learner in planning, connect new content to what they already know, and explain the purpose behind every task.',
  },
  {
    question: 'Can I use pedagogical approaches with adult learners in some situations?',
    answer:
      'Yes. When an adult learner encounters completely new material with no prior frame of reference — for example, a career-changer learning about three-phase theory for the first time — a more teacher-directed approach may be appropriate initially. The key is to transition toward andragogical methods as the learner builds confidence and foundational knowledge.',
  },
];

/* ------------------------------------------------------------------ */
/*  End-of-section quiz                                                */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'How many principles of andragogy did Malcolm Knowles identify?',
    options: ['Four', 'Five', 'Six', 'Seven'],
    correctAnswer: 2,
    explanation:
      'Knowles identified six principles: need to know why, experience as a resource, self-concept (self-direction), readiness to learn, problem-centred orientation, and internal motivation.',
  },
  {
    id: 2,
    question:
      'Which Knowles principle is demonstrated when a mentor explains why safe isolation matters before teaching the procedure?',
    options: [
      'Self-concept',
      'Need to know why',
      'Readiness to learn',
      'Problem-centred orientation',
    ],
    correctAnswer: 1,
    explanation:
      'Adults need to understand why they are learning something before they engage with it. Explaining the purpose of safe isolation — preventing fatal electric shock — satisfies the "need to know why" principle.',
  },
  {
    id: 3,
    question: 'In Bloom\u2019s revised taxonomy, which level sits at the top?',
    options: ['Evaluate', 'Create', 'Analyse', 'Apply'],
    correctAnswer: 1,
    explanation:
      'In the revised taxonomy (Anderson & Krathwohl, 2001), the order from bottom to top is: Remember, Understand, Apply, Analyse, Evaluate, Create. "Create" replaced "Synthesis" at the top.',
  },
  {
    id: 4,
    question:
      'An apprentice designs a distribution board layout for a new domestic installation. Which Bloom\u2019s level are they working at?',
    options: ['Apply', 'Analyse', 'Evaluate', 'Create'],
    correctAnswer: 3,
    explanation:
      'Designing a new distribution board layout requires the learner to synthesise their knowledge of circuit protection, cable sizing, and regulations into an original design. This is the "Create" level.',
  },
  {
    id: 5,
    question: 'What is the key difference between pedagogy and andragogy?',
    options: [
      'Pedagogy is for groups; andragogy is one-to-one',
      'Pedagogy is teacher-directed; andragogy is learner-centred',
      'Pedagogy uses written resources; andragogy uses practical tasks',
      'Pedagogy is for trade skills; andragogy is for academic study',
    ],
    correctAnswer: 1,
    explanation:
      'The fundamental difference is direction of control. Pedagogy places the teacher in charge of what, when, and how learning happens. Andragogy recognises the adult learner as self-directing, with the mentor acting as a facilitator rather than an instructor.',
  },
  {
    id: 6,
    question:
      'A second-year apprentice is about to sit their AM2 practical assessment. According to Knowles, what makes them "ready to learn" about consumer unit installation?',
    options: [
      'Their college has scheduled the topic this term',
      'Their employer requires it for company policy',
      'They face a real-life task that demands the skill immediately',
      'The apprenticeship framework lists it as a learning outcome',
    ],
    correctAnswer: 2,
    explanation:
      'Knowles\u2019 "readiness to learn" principle states that adults become ready to learn when they face a real-life situation that requires the knowledge. The imminent AM2 assessment creates genuine readiness because the apprentice will need to demonstrate the skill.',
  },
  {
    id: 7,
    question:
      'Which Bloom\u2019s level requires a learner to break information into component parts and examine relationships?',
    options: ['Understand', 'Apply', 'Analyse', 'Evaluate'],
    correctAnswer: 2,
    explanation:
      'Analyse requires breaking information into parts, finding patterns, and identifying relationships. For example, examining a fault and determining which part of the circuit is causing the problem.',
  },
  {
    id: 8,
    question:
      'A mentor asks their apprentice: "Can you explain in your own words why we use an RCD on socket circuits?" Which Bloom\u2019s level is the mentor targeting?',
    options: ['Remember', 'Understand', 'Apply', 'Evaluate'],
    correctAnswer: 1,
    explanation:
      '"Explain in your own words" is a classic Understand-level question. The learner must demonstrate comprehension by paraphrasing rather than simply recalling a memorised definition.',
  },
];

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
export default function MDModule1Section1() {
  useSEO({
    title: 'Adult Learning Theory | Module 1 Section 1 | Mentoring & Developing Others',
    description:
      'Knowles\u2019 six principles of andragogy, pedagogy vs andragogy, and Bloom\u2019s Taxonomy applied to UK construction and electrical training.',
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
                <Brain className="h-6 w-6 text-rose-400" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                <span className="text-rose-400 text-xs font-semibold">MODULE 1</span>
                <span className="text-white text-xs">&middot;</span>
                <span className="text-white text-xs">SECTION 1</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Adult Learning Theory
            </h1>
            <p className="text-white text-sm sm:text-base leading-relaxed">
              How adults learn differently from children &mdash; and why it matters every time you
              mentor, coach, or train someone on site.
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
                Malcolm Knowles identified six principles that explain how adults learn differently
                from children. Bloom&rsquo;s Taxonomy gives you a ladder of thinking skills &mdash;
                from basic recall to creative design &mdash; so you can pitch your mentoring at the
                right level. Together, these frameworks stop you treating experienced workers like
                school pupils.
              </p>
            </div>
            <div className="rounded-xl bg-rose-500/5 border-l-2 border-rose-500/50 p-4">
              <h2 className="text-rose-400 font-semibold text-sm mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Why It Matters
              </h2>
              <p className="text-white text-sm leading-relaxed">
                Construction workers who feel patronised or bored will switch off. When you
                understand how adults learn, you can explain wiring regulations in a way that
                sticks, design toolbox talks that engage, and support apprentices who have different
                levels of experience. This section gives you the theory that underpins everything
                else in this course.
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
                'State all six of Knowles\u2019 principles of andragogy and give a construction-related example for each',
                'Explain the key differences between pedagogy and andragogy',
                'List the six levels of Bloom\u2019s revised taxonomy in order',
                'Map Bloom\u2019s levels to typical construction training activities',
                'Identify which Bloom\u2019s level a given learning activity targets',
                'Apply adult learning principles when planning a mentoring session',
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
          {/*  SECTION 01 — Knowles' Six Principles of Andragogy               */}
          {/* ================================================================ */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-rose-400 text-xs font-bold tracking-widest">01</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Knowles&rsquo; Six Principles of Andragogy
              </h2>
            </div>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              Malcolm Knowles introduced the term <strong className="text-white">andragogy</strong>{' '}
              in the 1970s to describe the art and science of helping adults learn. While pedagogy
              assumes a teacher-directed model suited to children, andragogy recognises that adults
              are fundamentally different learners. Knowles argued that adults bring life
              experience, have specific reasons for learning, and need to feel in control of the
              process.
            </p>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              His work identified six core principles that shape how adults engage with new
              knowledge and skills. As a mentor in the electrical industry, understanding these
              principles is essential &mdash; they explain why some training sessions land
              brilliantly and others fall flat.
            </p>

            {/* Rose framework box — all 6 principles */}
            <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-5 space-y-4">
              <h3 className="text-rose-400 font-semibold text-sm flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Knowles&rsquo; Six Principles of Andragogy
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">1. Need to Know Why</h4>
                  <p className="text-white text-sm leading-relaxed">
                    Adults need to understand <em>why</em> they are learning something before they
                    engage with it. A child may accept &ldquo;because the teacher says so&rdquo;
                    &mdash; an adult will not. Before teaching safe isolation, explain that it
                    prevents fatal electric shock. Before covering Regulation 411.3.3, explain what
                    happens when automatic disconnection fails.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">
                    2. Experience as a Resource
                  </h4>
                  <p className="text-white text-sm leading-relaxed">
                    Adults bring a lifetime of experience that shapes how they interpret new
                    information. A mature career-changer from plumbing already understands building
                    fabric, pipe runs, and working on occupied sites. A good mentor uses that
                    existing knowledge as a foundation: &ldquo;You know how water flows through a
                    pipe system &mdash; electrical current flows through conductors in a similar
                    way.&rdquo; Ignoring prior experience makes the learner feel undervalued and
                    wastes time re-teaching things they already know.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">
                    3. Self-Concept (Self-Direction)
                  </h4>
                  <p className="text-white text-sm leading-relaxed">
                    Adults see themselves as responsible, self-directing individuals. They resist
                    being told what to do without explanation. This does not mean you should never
                    instruct directly &mdash; it means you should involve the learner in decisions
                    about their learning wherever possible. Ask what they want to work on, give
                    choices about how to practise, and explain your reasoning when you direct them.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">4. Readiness to Learn</h4>
                  <p className="text-white text-sm leading-relaxed">
                    Adults become ready to learn when they face a real-life situation that demands
                    the knowledge. A second-year apprentice about to sit the AM2 practical
                    assessment is intensely ready to learn consumer unit installation. The same
                    apprentice may show little interest in three-phase theory if they are not yet
                    working on commercial sites. Timing matters &mdash; teach what is needed, when
                    it is needed.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">
                    5. Problem-Centred Orientation
                  </h4>
                  <p className="text-white text-sm leading-relaxed">
                    Adults prefer learning that is organised around real problems rather than
                    abstract subjects. Instead of teaching &ldquo;Chapter 41 of BS 7671&rdquo; as a
                    topic, frame it as: &ldquo;How do we make sure a fault on this socket circuit
                    disconnects fast enough to prevent someone getting a fatal shock?&rdquo; The
                    regulation becomes the answer to a real problem, not a list of numbers to
                    memorise.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">6. Internal Motivation</h4>
                  <p className="text-white text-sm leading-relaxed">
                    While external motivators matter (pay rises, qualifications, keeping a job),
                    adults are most powerfully driven by internal factors: job satisfaction,
                    self-esteem, professional pride, and quality of life. A skilled electrician who
                    takes pride in neat, compliant work is internally motivated. Your role as a
                    mentor is to nurture that internal drive rather than relying solely on rewards
                    and threats.
                  </p>
                </div>
              </div>
            </div>

            {/* Construction example */}
            <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-400" />
                Construction Example: Teaching Earth Fault Loop Impedance
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Imagine you are mentoring a third-year apprentice who needs to understand earth
                fault loop impedance (Zs) testing. Here is how each Knowles principle applies:
              </p>
              <ul className="space-y-2 text-white text-sm leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold flex-shrink-0">1.</span>
                  <span>
                    <strong className="text-white">Need to know why:</strong> &ldquo;If Zs is too
                    high, the protective device will not disconnect fast enough during a fault, and
                    someone could receive a fatal shock.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold flex-shrink-0">2.</span>
                  <span>
                    <strong className="text-white">Experience:</strong> &ldquo;You have already
                    measured continuity of protective conductors &mdash; Zs builds on that same
                    loop, just from the supply side.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold flex-shrink-0">3.</span>
                  <span>
                    <strong className="text-white">Self-direction:</strong> Let them choose which
                    circuit to test first, and ask them to predict what the reading should be before
                    they measure it.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold flex-shrink-0">4.</span>
                  <span>
                    <strong className="text-white">Readiness:</strong> They are about to do their
                    first EICR &mdash; Zs testing is immediately relevant.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold flex-shrink-0">5.</span>
                  <span>
                    <strong className="text-white">Problem-centred:</strong> &ldquo;This socket has
                    a Zs of 1.8 ohms on a B32 breaker. Is it safe? What would you do?&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold flex-shrink-0">6.</span>
                  <span>
                    <strong className="text-white">Internal motivation:</strong> Connect it to
                    professional pride: &ldquo;When you can read and interpret these values, you are
                    working at the level of a competent electrician, not just following
                    instructions.&rdquo;
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-400" />
                Construction Example: The Career-Changer from Plumbing
              </h3>
              <p className="text-white text-sm leading-relaxed">
                A 35-year-old plumber retraining as an electrician arrives on your site. Applying
                Knowles&rsquo; principles means you would:
              </p>
              <ul className="space-y-2 text-white text-sm leading-relaxed list-disc list-inside">
                <li>
                  Acknowledge their existing trade knowledge &mdash; they understand building
                  construction, customer interaction, tool safety, and working in occupied
                  properties (experience as a resource)
                </li>
                <li>
                  Explain clearly why electrical theory matters even though they are an experienced
                  tradesperson (need to know why)
                </li>
                <li>
                  Let them take ownership of learning tasks where possible rather than directing
                  every step (self-concept)
                </li>
                <li>
                  Focus early training on tasks they will face in their first few weeks on site
                  rather than following a textbook chapter order (readiness and problem-centred)
                </li>
                <li>
                  Build on their internal motivation &mdash; they chose to retrain and have invested
                  time and money in doing so (internal motivation)
                </li>
              </ul>
            </div>
          </section>

          {/* ── InlineCheck #1 ────────────────────────────────────── */}
          <InlineCheck
            id="md-m1-s1-check-1"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* ================================================================ */}
          {/*  SECTION 02 — Pedagogy vs Andragogy                              */}
          {/* ================================================================ */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-rose-400 text-xs font-bold tracking-widest">02</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Pedagogy vs Andragogy</h2>
            </div>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              The word <strong className="text-white">pedagogy</strong> comes from the Greek
              <em> paid</em> (child) and <em>agogos</em> (leader). It literally means &ldquo;leading
              children.&rdquo; <strong className="text-white">Andragogy</strong> comes from{' '}
              <em>aner</em> (adult) and <em>agogos</em> &mdash; &ldquo;leading adults.&rdquo; The
              distinction matters because the assumptions behind each approach are fundamentally
              different.
            </p>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              In a pedagogical model, the teacher decides what is taught, when, and how. The learner
              is passive and dependent. In an andragogical model, the mentor facilitates learning,
              and the adult learner takes increasing responsibility for their own development. This
              does not mean pedagogy is &ldquo;bad&rdquo; &mdash; it is appropriate for young
              children and for situations where adults have no prior knowledge at all. But
              defaulting to pedagogy with experienced adults is a common mistake that kills
              engagement.
            </p>

            {/* Comparison grid */}
            <div className="rounded-xl bg-white/5 border border-white/10 p-5">
              <h3 className="text-white font-semibold text-sm mb-4">
                Pedagogy vs Andragogy: Key Differences
              </h3>
              <div className="space-y-0">
                {/* Header row */}
                <div className="grid grid-cols-3 gap-3 py-3 border-b border-white/10">
                  <span className="text-rose-400 text-xs font-bold">ASPECT</span>
                  <span className="text-rose-400 text-xs font-bold">PEDAGOGY</span>
                  <span className="text-rose-400 text-xs font-bold">ANDRAGOGY</span>
                </div>
                {[
                  {
                    aspect: 'Role of learner',
                    pedagogy: 'Dependent on the teacher',
                    andragogy: 'Self-directing, takes responsibility',
                  },
                  {
                    aspect: 'Prior experience',
                    pedagogy: 'Limited; not a major resource',
                    andragogy: 'Rich resource to build upon',
                  },
                  {
                    aspect: 'Readiness to learn',
                    pedagogy: 'Determined by age/curriculum',
                    andragogy: 'Driven by real-life needs',
                  },
                  {
                    aspect: 'Orientation',
                    pedagogy: 'Subject-centred',
                    andragogy: 'Problem-centred',
                  },
                  {
                    aspect: 'Motivation',
                    pedagogy: 'Mostly external (grades, rules)',
                    andragogy: 'Mostly internal (pride, purpose)',
                  },
                  {
                    aspect: 'Planning',
                    pedagogy: 'Teacher plans everything',
                    andragogy: 'Collaborative; learner involved',
                  },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-3 gap-3 py-3 border-b border-white/5">
                    <span className="text-white text-sm font-medium">{row.aspect}</span>
                    <span className="text-white text-sm">{row.pedagogy}</span>
                    <span className="text-white text-sm">{row.andragogy}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              <strong className="text-white">Why adults resist being treated like children:</strong>{' '}
              When you stand at the front of a toolbox talk and read bullet points from a slide
              while experienced electricians sit silently, you are using pedagogy. The workers feel
              patronised because you are ignoring their experience and treating them as empty
              vessels to be filled. Compare this with starting the same talk by asking: &ldquo;Has
              anyone here come across this situation on site? What did you do?&rdquo; Now you are
              using andragogy &mdash; valuing their experience, involving them, and building from
              what they know.
            </p>

            <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-400" />
                Construction Example: Explaining BS 7671 Regulation Relevance
              </h3>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Pedagogical approach:</strong> &ldquo;Open your copy
                of BS 7671 to Regulation 411.3.3. This regulation states that the maximum
                disconnection time for a 230 V final circuit not exceeding 32 A is 0.4 seconds.
                Please make a note of this.&rdquo;
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Andragogical approach:</strong> &ldquo;Imagine a
                child touches a faulty socket on a ring final circuit. How long do you think they
                could survive the shock before serious injury? The answer is fractions of a second.
                That is why Regulation 411.3.3 requires disconnection within 0.4 seconds. Let us
                talk about what controls that disconnection time and what happens if it is too
                slow.&rdquo;
              </p>
              <p className="text-white text-sm leading-relaxed">
                The content is identical. The approach is completely different. The andragogical
                version connects to a real problem, explains why the regulation exists, and engages
                the learner emotionally. It is far more likely to be remembered.
              </p>
            </div>
          </section>

          {/* ================================================================ */}
          {/*  SECTION 03 — Bloom's Taxonomy                                   */}
          {/* ================================================================ */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-rose-400 text-xs font-bold tracking-widest">03</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Bloom&rsquo;s Taxonomy</h2>
            </div>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              Benjamin Bloom published his taxonomy of educational objectives in 1956. The framework
              was revised by Anderson and Krathwohl in 2001, updating the categories from nouns to
              verbs and reordering the top two levels. The revised taxonomy provides a hierarchy of
              six cognitive levels, from simple recall to complex creation. Each level builds on the
              ones below it.
            </p>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              As a mentor, Bloom&rsquo;s Taxonomy helps you pitch your teaching at the right level.
              There is no point asking an apprentice to evaluate a protection scheme if they cannot
              yet remember the basic disconnection times. Equally, there is no point drilling recall
              facts into an experienced electrician who needs to analyse a complex fault.
            </p>

            {/* Rose framework box — Bloom's 6 levels */}
            <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-5 space-y-4">
              <h3 className="text-rose-400 font-semibold text-sm flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Bloom&rsquo;s Revised Taxonomy (Anderson &amp; Krathwohl, 2001)
              </h3>

              <div className="space-y-3">
                {[
                  {
                    level: '1. Remember',
                    desc: 'Recall facts, terms, and basic concepts. Recognise, list, state, identify.',
                    example:
                      'State the maximum disconnection time for a 32 A final circuit at 230 V.',
                  },
                  {
                    level: '2. Understand',
                    desc: 'Explain ideas or concepts in your own words. Describe, summarise, paraphrase.',
                    example:
                      'Explain why the disconnection time for socket circuits is shorter than for fixed equipment.',
                  },
                  {
                    level: '3. Apply',
                    desc: 'Use information in a new situation. Calculate, demonstrate, solve, use.',
                    example:
                      'Use the maximum Zs tables to determine whether a measured Zs value is acceptable for a given circuit.',
                  },
                  {
                    level: '4. Analyse',
                    desc: 'Break information into parts, find patterns and relationships. Compare, contrast, examine.',
                    example:
                      'Examine a set of test results and identify which circuits have Zs values approaching the maximum permitted.',
                  },
                  {
                    level: '5. Evaluate',
                    desc: 'Justify a decision or course of action. Judge, assess, critique, recommend.',
                    example:
                      'Assess whether a distribution board with marginal Zs values is safe to energise or requires remedial work.',
                  },
                  {
                    level: '6. Create',
                    desc: 'Produce new or original work. Design, construct, develop, formulate.',
                    example:
                      'Design a distribution board layout for a new domestic installation, selecting appropriate protective devices to achieve compliant disconnection times.',
                  },
                ].map((item, i) => (
                  <div key={i} className="rounded-lg bg-white/5 p-3">
                    <h4 className="text-white font-semibold text-sm mb-1">{item.level}</h4>
                    <p className="text-white text-sm leading-relaxed mb-1">{item.desc}</p>
                    <p className="text-white text-xs leading-relaxed">
                      <strong className="text-rose-400">Construction example:</strong>{' '}
                      {item.example}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              <strong className="text-white">Mapping to construction training:</strong> Most
              college-based electrical training focuses heavily on the lower levels (Remember and
              Understand). Apprentices learn definitions and can explain concepts in written exams.
              The gap often appears at the Apply level &mdash; they know the theory but cannot use
              it on a real installation. This is precisely where mentoring on site adds the most
              value. A mentor bridges the gap between classroom theory and workplace application.
            </p>

            {/* Full worked example: Zs at every Bloom level */}
            <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-400" />
                Worked Example: Earth Fault Loop Impedance at Every Bloom Level
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Here is how you could teach earth fault loop impedance (Zs) by progressively moving
                up Bloom&rsquo;s levels:
              </p>
              <ul className="space-y-2 text-white text-sm leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold flex-shrink-0">Remember:</span>
                  <span>
                    &ldquo;What is the maximum Zs for a B32 circuit breaker at 230 V?&rdquo; (Recall
                    from Table 41.3 of BS 7671)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold flex-shrink-0">Understand:</span>
                  <span>
                    &ldquo;Explain in your own words what happens if Zs is too high.&rdquo;
                    (Demonstrate comprehension of the earth fault loop concept)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold flex-shrink-0">Apply:</span>
                  <span>
                    &ldquo;Measure Zs on this ring final circuit and tell me whether the value is
                    acceptable.&rdquo; (Use knowledge in a real scenario)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold flex-shrink-0">Analyse:</span>
                  <span>
                    &ldquo;These test results show Zs readings across 12 circuits. Which ones are
                    concerning, and why?&rdquo; (Break down data, identify patterns)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold flex-shrink-0">Evaluate:</span>
                  <span>
                    &ldquo;The Zs on circuit 7 is 1.4 ohms against a maximum of 1.44 ohms. It passes
                    today, but should we flag it? What is your professional judgement?&rdquo; (Make
                    and justify a decision)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold flex-shrink-0">Create:</span>
                  <span>
                    &ldquo;Design the earthing and bonding arrangement for this new installation to
                    achieve compliant Zs values on all circuits.&rdquo; (Produce an original design
                    using all prior knowledge)
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* ── InlineCheck #2 ────────────────────────────────────── */}
          <InlineCheck
            id="md-m1-s1-check-2"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* ================================================================ */}
          {/*  SECTION 04 — Applying Adult Learning to Construction Mentoring   */}
          {/* ================================================================ */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-rose-400 text-xs font-bold tracking-widest">04</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Applying Adult Learning to Construction Mentoring
              </h2>
            </div>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              Theory only matters if you can use it. This section brings together Knowles and Bloom
              into practical strategies you can apply on site every day. These are not abstract
              ideas &mdash; they are specific actions that will make your mentoring more effective.
            </p>

            <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-rose-400" />
                Strategy 1: Always Start with &ldquo;Why&rdquo;
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Before any training session, toolbox talk, or on-the-job instruction, answer the
                learner&rsquo;s unspoken question: &ldquo;Why do I need to know this?&rdquo; Connect
                every piece of learning to a real outcome &mdash; safety, compliance, efficiency, or
                professional development. If you cannot explain why it matters, reconsider whether
                it needs to be taught right now.
              </p>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-rose-400" />
                Strategy 2: Find Out What They Already Know
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Before teaching anything new, ask questions to establish the learner&rsquo;s current
                level. This serves two purposes: it respects their experience (Knowles&rsquo;
                principle 2) and it tells you which Bloom&rsquo;s level to start at. An apprentice
                who can remember the regulation but cannot apply it needs practice, not more theory.
                An experienced electrician who already applies the knowledge confidently might
                benefit from analysis or evaluation tasks.
              </p>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-rose-400" />
                Strategy 3: Use Real Problems, Not Abstract Topics
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Frame learning around problems the learner will actually face. Instead of
                &ldquo;Today we are covering earthing arrangements,&rdquo; try &ldquo;The house we
                are working on has a TT supply. What does that mean for our protective devices, and
                why might we need an RCD on every circuit?&rdquo; Problem-centred learning is more
                engaging, more memorable, and more immediately useful.
              </p>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-rose-400" />
                Strategy 4: Progress Up Bloom&rsquo;s Ladder
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Do not keep learners at the Remember level if they are ready for more. Use
                questioning to move them up the taxonomy: &ldquo;Can you tell me the maximum
                Zs?&rdquo; (Remember) &rarr; &ldquo;Why is it that value?&rdquo; (Understand) &rarr;
                &ldquo;Measure this circuit and tell me if it passes&rdquo; (Apply) &rarr;
                &ldquo;Look at all these results &mdash; which circuits worry you?&rdquo; (Analyse)
                &rarr; &ldquo;What would you recommend we do about them?&rdquo; (Evaluate).
              </p>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-rose-400" />
                Strategy 5: Involve the Learner in Planning
              </h3>
              <p className="text-white text-sm leading-relaxed">
                At the start of each week or phase of work, ask the learner what they want to focus
                on. This respects their self-concept (Knowles&rsquo; principle 3) and increases
                motivation. You may need to guide their choices &mdash; &ldquo;I think we should
                also cover testing this week because you have your assessment next month&rdquo;
                &mdash; but the act of involving them transforms the dynamic from instruction to
                collaboration.
              </p>
            </div>

            {/* Key takeaway box */}
            <div className="rounded-xl bg-elec-yellow/10 border border-elec-yellow/30 p-5">
              <h3 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-elec-yellow" />
                Key Takeaway
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Effective mentoring is not about what you know &mdash; it is about how well you help
                someone else learn. Knowles tells you <em>how</em> to engage an adult learner. Bloom
                tells you <em>what level</em> to pitch your teaching at. Together, they give you a
                framework for every mentoring interaction: start with why, build on experience, use
                real problems, and progressively challenge the learner to think at higher levels.
              </p>
            </div>
          </section>

          {/* ── InlineCheck #3 ────────────────────────────────────── */}
          <InlineCheck
            id="md-m1-s1-check-3"
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
          <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

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
              <Link to="../md-module-1-section-2">
                Next: Kolb&rsquo;s Experiential Learning Cycle
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}
