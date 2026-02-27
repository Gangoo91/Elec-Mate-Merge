import {
  ArrowLeft,
  Flame,
  CheckCircle,
  BookOpen,
  Lightbulb,
  Target,
  Users,
  Shield,
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
      'An apprentice takes great pride in producing neat, compliant work and feels satisfied when they solve a complex fault independently. According to Self-Determination Theory, which type of motivation is this?',
    options: [
      'Extrinsic motivation driven by external rewards',
      'Intrinsic motivation driven by competence and autonomy',
      'Amotivation caused by lack of external incentives',
      'Conditional motivation dependent on praise',
    ],
    correctIndex: 1,
    explanation:
      'Self-Determination Theory (Deci & Ryan, 1985) identifies three innate psychological needs: autonomy, competence, and relatedness. When a learner feels satisfaction from solving problems independently and producing quality work, they are experiencing intrinsic motivation driven by feelings of competence and autonomy.',
  },
  {
    id: 2,
    question:
      'A mature apprentice who left school at 16 with no qualifications avoids written tasks and becomes defensive when asked to complete paperwork. Which barrier to learning is most likely at play?',
    options: [
      'Time pressure from long working hours',
      'Negative previous learning experiences and possible literacy difficulties',
      'Lack of interest in the trade',
      'Physical fatigue from manual labour',
    ],
    correctIndex: 1,
    explanation:
      'Adults who had negative experiences at school \u2014 including undiagnosed learning difficulties such as dyslexia \u2014 often develop avoidance behaviours around written work. Defensiveness is a common protective response. A good mentor recognises this as a barrier, not a lack of ability, and finds alternative ways to assess understanding.',
  },
  {
    id: 3,
    question:
      'Under the Health and Safety at Work etc. Act 1974, section 2(2)(c), employers have a legal duty to provide which of the following?',
    options: [
      'Free college education for all employees',
      'Annual performance reviews for all staff',
      'Such information, instruction, training and supervision as is necessary to ensure health and safety',
      'Formal mentoring relationships for every apprentice',
    ],
    correctIndex: 2,
    explanation:
      'Section 2(2)(c) of the Health and Safety at Work etc. Act 1974 places a duty on employers to provide information, instruction, training, and supervision necessary to ensure the health and safety of employees. This is a legal obligation, not optional \u2014 making training a fundamental workplace requirement.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      'Is it my responsibility as a mentor to diagnose learning difficulties like dyslexia?',
    answer:
      'No. You are not expected to diagnose conditions such as dyslexia, dyscalculia, or ADHD. However, you should be aware of the signs (difficulty with reading, number transposition, poor concentration) and be prepared to adapt your teaching methods. If you suspect a learning difficulty, recommend the learner speaks to their college or training provider, who can arrange formal assessment and support. Your role is to be supportive and flexible, not to be a diagnostician.',
  },
  {
    question:
      'How do I motivate an apprentice who says they "hate theory" and only want to do practical work?',
    answer:
      'This is extremely common in construction. The key is to connect theory to practice \u2014 never teach theory in isolation. Instead of saying "today we are going to study protection," say "this circuit keeps tripping. Let\u2019s work out why by understanding how the protective device actually works." Use real faults, real circuits, and real problems as the entry point. Also consider that "hating theory" may mask literacy difficulties or negative school experiences \u2014 approach with empathy, not frustration.',
  },
  {
    question: 'What legal obligations do I have as a mentor regarding training?',
    answer:
      'As a mentor, you are contributing to your employer\u2019s legal duty under HSWA 1974 s.2(2)(c) to provide training necessary for health and safety. CDM 2015 Regulation 13 requires workers to have sufficient skills, knowledge, training, and experience. MHSWR 1999 Regulation 13 requires employers to ensure adequate health and safety training. While these duties fall on the employer, as a mentor you are the person delivering that training on the ground.',
  },
  {
    question: 'How do I handle training when my apprentice is exhausted after a long shift?',
    answer:
      'Fatigue is a real barrier \u2014 do not try to teach complex theory after a 10-hour physical shift. Instead, use short, focused sessions (10\u201315 minutes), visual demonstrations rather than reading, and practical tasks where possible. Schedule theory discussions for the start of the day when energy is highest. If fatigue is persistent, speak to the employer about protected learning time. Remember that a tired learner is not a lazy learner.',
  },
];

/* ------------------------------------------------------------------ */
/*  End-of-section quiz                                                */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'Which psychologists developed Self-Determination Theory?',
    options: [
      'Honey and Mumford',
      'Hersey and Blanchard',
      'Deci and Ryan',
      'Wood, Bruner and Ross',
    ],
    correctAnswer: 2,
    explanation:
      'Self-Determination Theory was developed by Edward Deci and Richard Ryan in 1985. It identifies three innate psychological needs: autonomy, competence, and relatedness.',
  },
  {
    id: 2,
    question:
      'According to Self-Determination Theory, which three needs must be met for intrinsic motivation?',
    options: [
      'Safety, belonging, and esteem',
      'Autonomy, competence, and relatedness',
      'Knowledge, understanding, and application',
      'Experience, reflection, and experimentation',
    ],
    correctAnswer: 1,
    explanation:
      'The three innate psychological needs in Self-Determination Theory are autonomy (feeling in control of your actions), competence (feeling capable and effective), and relatedness (feeling connected to others).',
  },
  {
    id: 3,
    question:
      'In Maslow\u2019s hierarchy, which need must be satisfied before a learner can focus on self-actualisation?',
    options: [
      'Physiological needs only',
      'Safety needs only',
      'All lower-level needs (physiological, safety, belonging, esteem)',
      'Belonging needs only',
    ],
    correctAnswer: 2,
    explanation:
      'Maslow\u2019s hierarchy proposes that needs must be met in order: physiological, safety, belonging, esteem, and then self-actualisation. A learner who is hungry, cold, feeling unsafe, or excluded cannot focus on higher-level growth.',
  },
  {
    id: 4,
    question: 'Which of the following is an example of a fixed mindset statement?',
    options: [
      '"I haven\u2019t mastered this yet, but I\u2019m getting closer"',
      '"I\u2019m just not good at maths \u2014 I never have been"',
      '"That was hard, but I learned a lot from the mistakes"',
      '"Let me try a different approach"',
    ],
    correctAnswer: 1,
    explanation:
      'A fixed mindset (Dweck, 2006) believes that abilities are innate and unchangeable. "I\u2019m just not good at maths" treats ability as a permanent trait rather than a skill that can be developed. A growth mindset would say "I find maths difficult, but I can improve with practice."',
  },
  {
    id: 5,
    question:
      'Under which regulation does CDM 2015 require construction workers to have sufficient skills, knowledge, training, and experience?',
    options: ['Regulation 4', 'Regulation 8', 'Regulation 13', 'Regulation 15'],
    correctAnswer: 2,
    explanation:
      'CDM 2015 Regulation 13 deals with duties of workers and states that workers must have sufficient skills, knowledge, training, and experience, or be in the process of obtaining them under supervision.',
  },
  {
    id: 6,
    question:
      'An apprentice is unmotivated by classroom theory but becomes fully engaged when fault-finding on a live installation. What does this suggest about their motivation?',
    options: [
      'They are lazy and need more discipline',
      'They are intrinsically motivated by practical, problem-centred tasks',
      'They have a learning difficulty that prevents engagement with theory',
      'They should be removed from the training programme',
    ],
    correctAnswer: 1,
    explanation:
      'This is a classic example of intrinsic motivation activated by problem-centred, practical learning (Knowles\u2019 andragogy principle). The apprentice is not unmotivated \u2014 they are motivated by different types of activity. A good mentor uses practical tasks as the entry point and connects theory to those real experiences.',
  },
  {
    id: 7,
    question: 'Which of the following is NOT a common barrier to learning in construction?',
    options: [
      'Negative previous school experiences',
      'Physical fatigue from manual labour',
      'Machismo culture that stigmatises asking for help',
      'Excessive access to training resources',
    ],
    correctAnswer: 3,
    explanation:
      'Common barriers in construction include negative school experiences, fatigue, machismo culture, literacy difficulties, time pressure, dyslexia, and fear of failure. Excessive access to resources is not typically a barrier \u2014 in fact, lack of access to resources is more common.',
  },
  {
    id: 8,
    question:
      'Section 2(2)(c) of the Health and Safety at Work etc. Act 1974 requires employers to provide:',
    options: [
      'Personal protective equipment only',
      'Risk assessments for all tasks',
      'Information, instruction, training, and supervision for health and safety',
      'Formal qualifications for all workers',
    ],
    correctAnswer: 2,
    explanation:
      'HSWA 1974 s.2(2)(c) specifically requires employers to provide "such information, instruction, training and supervision as is necessary to ensure, so far as is reasonably practicable, the health and safety at work of employees." This is the legal foundation for workplace training obligations.',
  },
];

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
export default function MDModule1Section4() {
  useSEO({
    title: 'Motivation & Barriers to Learning | Module 1 Section 4 | Mentoring & Developing Others',
    description:
      'Intrinsic and extrinsic motivation, Self-Determination Theory, growth mindset, common barriers to learning in construction, and the legal duty to train.',
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
                <Flame className="h-6 w-6 text-rose-400" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                <span className="text-rose-400 text-xs font-semibold">MODULE 1</span>
                <span className="text-white text-xs">&middot;</span>
                <span className="text-white text-xs">SECTION 4</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Motivation &amp; Barriers to Learning
            </h1>
            <p className="text-white text-sm sm:text-base leading-relaxed">
              What drives people to learn, what stops them, and what the law requires &mdash; the
              human factors that make or break every mentoring relationship.
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
                Motivation comes from within (intrinsic) or from external factors (extrinsic).
                Self-Determination Theory identifies three needs &mdash; autonomy, competence, and
                relatedness &mdash; that fuel intrinsic motivation. Growth mindset (Dweck) shows
                that believing abilities can develop is essential for learning. Construction
                presents unique barriers including fatigue, literacy difficulties, and machismo
                culture. Employers have a legal duty to train under HSWA 1974, CDM 2015, and MHSWR
                1999.
              </p>
            </div>
            <div className="rounded-xl bg-rose-500/5 border-l-2 border-rose-500/50 p-4">
              <h2 className="text-rose-400 font-semibold text-sm mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Why It Matters
              </h2>
              <p className="text-white text-sm leading-relaxed">
                You can have perfect knowledge of Kolb, Bloom, and scaffolding, but if your
                apprentice is unmotivated, exhausted, or frightened of failure, none of it works.
                Understanding motivation and barriers is the difference between a mentor who blames
                the learner (&ldquo;They just do not care&rdquo;) and one who solves the problem
                (&ldquo;What is getting in the way, and how can I help?&rdquo;).
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
                'Distinguish between intrinsic and extrinsic motivation with construction examples',
                'Explain Self-Determination Theory and its three core needs (Deci & Ryan, 1985)',
                'Apply Maslow\u2019s hierarchy of needs to a learner\u2019s readiness to engage',
                'Describe fixed and growth mindsets (Dweck, 2006) and their impact on learning',
                'Identify at least six common barriers to learning in the construction industry',
                'Cite the legal duty to train under HSWA 1974, CDM 2015, and MHSWR 1999',
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
          {/*  SECTION 01 — Intrinsic vs Extrinsic Motivation & SDT            */}
          {/* ================================================================ */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-rose-400 text-xs font-bold tracking-widest">01</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Intrinsic vs Extrinsic Motivation &amp; Self-Determination Theory
              </h2>
            </div>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              Motivation is the engine of learning. Without it, even the best-designed training
              programme fails. Understanding what drives your learners &mdash; and what does not
              &mdash; is essential for effective mentoring.
            </p>

            <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
              <h3 className="text-white font-semibold text-sm">Intrinsic Motivation</h3>
              <p className="text-white text-sm leading-relaxed">
                Intrinsic motivation comes from within. The learner engages because the activity
                itself is satisfying, interesting, or meaningful. An electrician who takes pride in
                producing neat, compliant work is intrinsically motivated. An apprentice who gets a
                buzz from solving a fault is intrinsically motivated. The reward is the work itself,
                not an external prize.
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Construction examples:</strong> Satisfaction from a
                perfectly terminated distribution board. The intellectual challenge of diagnosing an
                intermittent fault. Pride in passing the AM2 assessment. The desire to be recognised
                as a skilled professional by peers.
              </p>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
              <h3 className="text-white font-semibold text-sm">Extrinsic Motivation</h3>
              <p className="text-white text-sm leading-relaxed">
                Extrinsic motivation comes from external factors: pay, qualifications, avoiding
                punishment, or gaining approval. While extrinsic motivators work in the short term,
                they do not sustain long-term engagement. An apprentice who only studies to pass the
                exam will stop learning the moment the exam is over.
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Construction examples:</strong> Working toward a pay
                rise on qualification. Studying because college attendance is mandatory. Completing
                a task to avoid being told off. Seeking the employer&rsquo;s approval for a
                permanent contract.
              </p>
            </div>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              <strong className="text-white">The mentor&rsquo;s role</strong> is to nurture
              intrinsic motivation while acknowledging that extrinsic factors also play a part. You
              cannot control pay or qualifications, but you can create conditions that foster
              internal drive.
            </p>

            {/* SDT Framework box */}
            <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-5 space-y-4">
              <h3 className="text-rose-400 font-semibold text-sm flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Self-Determination Theory (Deci &amp; Ryan, 1985)
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Edward Deci and Richard Ryan argued that intrinsic motivation flourishes when three
                innate psychological needs are met:
              </p>

              <div className="space-y-3">
                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="text-white font-semibold text-sm mb-1">1. Autonomy</h4>
                  <p className="text-white text-sm leading-relaxed">
                    The need to feel in control of your own actions and choices. Adults who feel
                    micromanaged or patronised lose motivation. In mentoring, this means giving the
                    learner choices: which task to tackle first, how to approach a problem, when to
                    take a break for study.
                  </p>
                  <p className="text-white text-xs leading-relaxed mt-1">
                    <strong className="text-rose-400">On site:</strong> &ldquo;We have two circuits
                    to wire today. Which one do you want to start with?&rdquo; This simple choice
                    increases autonomy and ownership.
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="text-white font-semibold text-sm mb-1">2. Competence</h4>
                  <p className="text-white text-sm leading-relaxed">
                    The need to feel capable and effective. Learners who constantly fail lose
                    motivation. Those who are never challenged become complacent. Competence is
                    built by setting tasks at the right level (the ZPD) and providing feedback that
                    highlights progress.
                  </p>
                  <p className="text-white text-xs leading-relaxed mt-1">
                    <strong className="text-rose-400">On site:</strong> &ldquo;Compare this ring
                    final to the first one you did three months ago. Look at how much neater your
                    connections are and how much faster you are working. That is real
                    progress.&rdquo;
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="text-white font-semibold text-sm mb-1">3. Relatedness</h4>
                  <p className="text-white text-sm leading-relaxed">
                    The need to feel connected to others and to belong. Learners who feel isolated,
                    excluded, or unsupported will disengage. In construction, this means being
                    accepted as part of the team, not treated as &ldquo;just the apprentice.&rdquo;
                  </p>
                  <p className="text-white text-xs leading-relaxed mt-1">
                    <strong className="text-rose-400">On site:</strong> Include the apprentice in
                    team discussions, tea breaks, and decision-making. Introduce them to clients as
                    &ldquo;my colleague&rdquo; rather than &ldquo;the apprentice.&rdquo; Make them
                    feel part of the team.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── InlineCheck #1 ────────────────────────────────────── */}
          <InlineCheck
            id="md-m1-s4-check-1"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* ================================================================ */}
          {/*  SECTION 02 — Maslow's Hierarchy & Growth Mindset                */}
          {/* ================================================================ */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-rose-400 text-xs font-bold tracking-widest">02</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Maslow&rsquo;s Hierarchy &amp; Growth Mindset
              </h2>
            </div>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              Two further frameworks help explain why some learners engage while others do not:
              Maslow&rsquo;s hierarchy of needs and Dweck&rsquo;s concept of fixed versus growth
              mindset.
            </p>

            <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-5 space-y-4">
              <h3 className="text-rose-400 font-semibold text-sm flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Maslow&rsquo;s Hierarchy of Needs Applied to Learner Motivation
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Abraham Maslow proposed that human needs exist in a hierarchy. Lower-level needs
                must be satisfied before higher-level needs can be addressed. For mentors, this
                means that a learner whose basic needs are unmet will be unable to focus on
                development:
              </p>

              <div className="space-y-2">
                {[
                  {
                    level: '5. Self-Actualisation',
                    desc: 'Achieving full potential, creativity, professional mastery',
                    site: 'Designing installations, mentoring others, continuous improvement',
                  },
                  {
                    level: '4. Esteem',
                    desc: 'Recognition, respect, self-confidence, achievement',
                    site: 'Being trusted with responsibility, receiving positive feedback, qualifying',
                  },
                  {
                    level: '3. Belonging',
                    desc: 'Friendship, teamwork, acceptance, feeling part of a group',
                    site: 'Being accepted by the team, included in decisions, not bullied or excluded',
                  },
                  {
                    level: '2. Safety',
                    desc: 'Physical safety, job security, financial stability',
                    site: 'Safe working conditions, secure employment, fair pay, not being exploited',
                  },
                  {
                    level: '1. Physiological',
                    desc: 'Food, water, warmth, rest, shelter',
                    site: 'Adequate breaks, access to food and water, not working in extreme cold without protection',
                  },
                ].map((item, i) => (
                  <div key={i} className="rounded-lg bg-white/5 p-3">
                    <h4 className="text-white font-semibold text-sm mb-1">{item.level}</h4>
                    <p className="text-white text-sm leading-relaxed">{item.desc}</p>
                    <p className="text-white text-xs leading-relaxed mt-1">
                      <strong className="text-rose-400">On site:</strong> {item.site}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Practical implication:</strong> An apprentice who is
                worried about losing their job (safety need unmet) will not engage with learning
                about circuit design (self-actualisation). An apprentice who is being bullied by
                other trades (belonging need unmet) will not take risks or ask questions. Address
                the lower-level needs first.
              </p>
            </div>

            {/* Growth Mindset */}
            <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-rose-400" />
                Growth Mindset vs Fixed Mindset (Dweck, 2006)
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Carol Dweck&rsquo;s research (2006) identified two fundamental beliefs about
                ability:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <div className="rounded-lg bg-rose-500/5 border border-rose-500/20 p-3">
                  <h4 className="text-white font-semibold text-sm mb-1">Fixed Mindset</h4>
                  <p className="text-white text-sm leading-relaxed">
                    &ldquo;I am either good at something or I am not. Intelligence and talent are
                    fixed traits.&rdquo; People with a fixed mindset avoid challenges, give up
                    easily, see effort as pointless, ignore useful criticism, and feel threatened by
                    others&rsquo; success.
                  </p>
                  <p className="text-white text-xs leading-relaxed mt-2">
                    <strong className="text-rose-400">On site:</strong> &ldquo;I am just not a maths
                    person. I will never understand cable calculations.&rdquo;
                  </p>
                </div>
                <div className="rounded-lg bg-green-500/5 border border-green-500/20 p-3">
                  <h4 className="text-white font-semibold text-sm mb-1">Growth Mindset</h4>
                  <p className="text-white text-sm leading-relaxed">
                    &ldquo;I can develop my abilities through effort, good strategies, and help from
                    others.&rdquo; People with a growth mindset embrace challenges, persist through
                    setbacks, see effort as the path to mastery, learn from criticism, and are
                    inspired by others&rsquo; success.
                  </p>
                  <p className="text-white text-xs leading-relaxed mt-2">
                    <strong className="text-rose-400">On site:</strong> &ldquo;I find cable
                    calculations difficult, but I am getting better with practice. Can you show me
                    another example?&rdquo;
                  </p>
                </div>
              </div>
              <p className="text-white text-sm leading-relaxed mt-3">
                <strong className="text-white">How mentors foster growth mindset:</strong> Praise
                effort and strategy, not innate talent. Say &ldquo;You worked really hard on that
                and it shows&rdquo; rather than &ldquo;You are a natural.&rdquo; Normalise mistakes
                as part of learning. Use the word &ldquo;yet&rdquo;: &ldquo;You have not mastered
                this <em>yet</em>.&rdquo; Share your own learning struggles to model that even
                experienced electricians continue to develop.
              </p>
            </div>
          </section>

          {/* ================================================================ */}
          {/*  SECTION 03 — Common Barriers in Construction                    */}
          {/* ================================================================ */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-rose-400 text-xs font-bold tracking-widest">03</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Common Barriers to Learning in Construction
              </h2>
            </div>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              Construction presents unique barriers to learning that do not exist in classroom or
              office environments. A good mentor recognises these barriers and works to remove or
              reduce them rather than blaming the learner.
            </p>

            <div className="space-y-4">
              <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
                <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-rose-400" />
                  Negative Previous Learning Experiences
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Many construction workers left school with few or no qualifications. Some were
                  told they were &ldquo;not academic&rdquo; or &ldquo;thick.&rdquo; These
                  experiences create deep-seated anxiety about formal learning, written tasks, and
                  assessment. An adult who was humiliated at school will resist any situation that
                  feels like school.
                </p>
                <p className="text-white text-sm leading-relaxed">
                  <strong className="text-white">Strategy:</strong> Make learning feel as different
                  from school as possible. Use practical demonstrations, on-the-job instruction, and
                  verbal assessment. Never put someone on the spot in front of others. Build trust
                  gradually before introducing written or formal tasks.
                </p>
              </div>

              <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
                <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-rose-400" />
                  Literacy Difficulties and Dyslexia
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  An estimated 10&ndash;15% of the UK population has some degree of dyslexia. In
                  construction, the rate may be higher because people with literacy difficulties are
                  more likely to choose practical trades over academic careers. Dyslexia does not
                  affect intelligence &mdash; some of the most skilled electricians struggle with
                  reading and writing.
                </p>
                <p className="text-white text-sm leading-relaxed">
                  <strong className="text-white">Strategy:</strong> Use verbal instruction and
                  demonstration rather than written handouts. Allow extra time for paperwork. Offer
                  to read questions aloud during assessments. Use diagrams, photos, and colour
                  coding. Never assume someone who avoids paperwork is lazy &mdash; they may be
                  hiding a literacy difficulty.
                </p>
              </div>

              <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
                <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-rose-400" />
                  Time Pressure and Fatigue
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Construction workers regularly work 10&ndash;12 hour days, often in physically
                  demanding conditions. Asking someone to engage with complex theory after a long
                  shift is unrealistic. Time pressure from site deadlines means learning is often
                  squeezed out by production demands.
                </p>
                <p className="text-white text-sm leading-relaxed">
                  <strong className="text-white">Strategy:</strong> Use short, focused learning
                  sessions (10&ndash;15 minutes). Integrate learning into work tasks rather than
                  adding it on top. Schedule theory conversations for the start of the day, not the
                  end. Advocate for protected learning time with the employer. Remember that a tired
                  learner is not a lazy learner.
                </p>
              </div>

              <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
                <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-rose-400" />
                  Machismo Culture
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Construction has a deeply embedded culture where asking for help can be seen as
                  weakness. Admitting you do not understand something, expressing uncertainty, or
                  asking a &ldquo;stupid question&rdquo; risks ridicule. This culture prevents
                  learners from seeking the support they need and encourages bluffing rather than
                  genuine learning.
                </p>
                <p className="text-white text-sm leading-relaxed">
                  <strong className="text-white">Strategy:</strong> Model vulnerability yourself:
                  &ldquo;I did not know this when I started either.&rdquo; Create a safe space for
                  questions. Never ridicule or embarrass a learner. Normalise not knowing:
                  &ldquo;Not knowing is the starting point of learning, not something to be ashamed
                  of.&rdquo; Challenge banter that mocks learning.
                </p>
              </div>

              <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
                <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-rose-400" />
                  Fear of Failure and Assessment Anxiety
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Many adults carry deep anxiety about being assessed or tested, especially if they
                  failed exams at school. This anxiety can paralyse learning &mdash; the learner
                  avoids situations where they might fail rather than risking exposure. In
                  construction, this manifests as avoiding new tasks, sticking to what they know,
                  and refusing to take on additional responsibility.
                </p>
                <p className="text-white text-sm leading-relaxed">
                  <strong className="text-white">Strategy:</strong> Separate learning from formal
                  assessment. Use low-stakes checks (the InlineCheck components in this course are
                  an example). Praise effort and progress. Frame mistakes as learning opportunities.
                  Build confidence gradually through small successes before introducing formal
                  assessment.
                </p>
              </div>

              <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
                <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-rose-400" />
                  Language and Cultural Barriers
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Construction sites are diverse. Workers whose first language is not English may
                  struggle with technical vocabulary, written regulations, and verbal instructions
                  given quickly. Cultural differences can also affect learning styles and
                  expectations about the mentor-learner relationship.
                </p>
                <p className="text-white text-sm leading-relaxed">
                  <strong className="text-white">Strategy:</strong> Speak clearly and avoid jargon
                  where possible. Use visual demonstrations and diagrams. Check understanding by
                  asking the learner to explain back rather than just asking &ldquo;Do you
                  understand?&rdquo; Be patient with pace and allow extra processing time.
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-400" />
                Construction Example: The Mature Apprentice Who Left School at 16
              </h3>
              <p className="text-white text-sm leading-relaxed">
                A 38-year-old mature apprentice who left school at 16 with no GCSEs has been working
                as a labourer for 20 years. He chose to retrain as an electrician. He is practically
                skilled, quick to learn hands-on tasks, and respected by the team. But he avoids all
                written work, gets defensive when asked to complete a logbook, and becomes visibly
                anxious before college exams.
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Barriers at play:</strong> Negative previous learning
                experiences, possible undiagnosed dyslexia, fear of failure, and the machismo
                pressure of not wanting to appear &ldquo;thick&rdquo; in front of younger
                apprentices.
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Mentor approach:</strong> Build on his practical
                strengths. Use verbal questioning to assess understanding instead of written tests.
                Offer to help with logbook entries privately. Suggest a dyslexia screening through
                the college (many offer this free). Normalise the difficulty: &ldquo;Loads of good
                electricians find the paperwork harder than the work. It does not mean you are not
                smart enough &mdash; it just means we need to find the approach that works for
                you.&rdquo;
              </p>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-400" />
                Construction Example: Teaching After a 10-Hour Shift
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Your apprentice has been on site since 6:30 am. It is now 4:30 pm, and you want to
                cover some theory on protective device coordination. They are physically exhausted,
                hungry, and thinking about getting home.
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">What not to do:</strong> Pull out BS 7671, sit them
                down, and lecture for 30 minutes. This will achieve nothing except resentment.
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">What to do instead:</strong> Keep it to five minutes.
                Point to the distribution board you have been working on: &ldquo;Quick question
                before we pack up. Why did I choose a B32 MCB for that ring final instead of a B40?
                Think about it tonight and tell me in the morning.&rdquo; This plants a seed,
                respects their fatigue, and creates a moment of reflection that carries into the
                next day.
              </p>
            </div>
          </section>

          {/* ── InlineCheck #2 ────────────────────────────────────── */}
          <InlineCheck
            id="md-m1-s4-check-2"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* ================================================================ */}
          {/*  SECTION 04 — The Legal Duty to Train                            */}
          {/* ================================================================ */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-rose-400 text-xs font-bold tracking-widest">04</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">The Legal Duty to Train</h2>
            </div>

            <p className="text-white text-sm sm:text-base leading-relaxed">
              Training in construction is not optional &mdash; it is a legal requirement. Three key
              pieces of legislation establish the duty to train, and as a mentor you are the person
              who often delivers that obligation on the ground.
            </p>

            <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-5 space-y-4">
              <h3 className="text-rose-400 font-semibold text-sm flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Key Legal Requirements
              </h3>

              <div className="space-y-3">
                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    Health and Safety at Work etc. Act 1974 &mdash; Section 2(2)(c)
                  </h4>
                  <p className="text-white text-sm leading-relaxed">
                    Employers must provide &ldquo;such information, instruction, training and
                    supervision as is necessary to ensure, so far as is reasonably practicable, the
                    health and safety at work of his employees.&rdquo;
                  </p>
                  <p className="text-white text-sm leading-relaxed mt-2">
                    This is the foundational duty. It applies to all employers, all workers, and all
                    workplaces. &ldquo;Training&rdquo; here includes not just formal courses but
                    on-the-job instruction &mdash; exactly what a mentor provides.
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    Construction (Design and Management) Regulations 2015 &mdash; Regulation 13
                  </h4>
                  <p className="text-white text-sm leading-relaxed">
                    CDM 2015 Regulation 13 addresses duties relating to construction workers. It
                    requires that construction workers have the appropriate skills, knowledge,
                    training, and experience to carry out their work safely, or that they are in the
                    process of obtaining them under the supervision of a competent person.
                  </p>
                  <p className="text-white text-sm leading-relaxed mt-2">
                    This regulation explicitly recognises the role of supervised training on site.
                    An apprentice working under a mentor meets this requirement. An unqualified
                    worker operating without supervision does not.
                  </p>
                </div>

                <div className="rounded-lg bg-white/5 p-4">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    Management of Health and Safety at Work Regulations 1999 &mdash; Regulation 13
                  </h4>
                  <p className="text-white text-sm leading-relaxed">
                    MHSWR 1999 Regulation 13 requires employers to ensure that every employee
                    receives adequate health and safety training. This includes training on
                    recruitment, when exposed to new or changed risks, and when moving to a new role
                    or responsibility.
                  </p>
                  <p className="text-white text-sm leading-relaxed mt-2">
                    This regulation reinforces that training must be ongoing, not a one-off event at
                    induction. Every time a worker faces new tasks, equipment, or risks, additional
                    training is required.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-elec-yellow/10 border border-elec-yellow/30 p-5">
              <h3 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-elec-yellow" />
                Key Takeaway
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Training is not a favour or a luxury &mdash; it is a legal obligation. Employers who
                fail to train expose themselves to prosecution under the Health and Safety at Work
                etc. Act 1974. As a mentor, you are the front line of that obligation. When you
                mentor an apprentice, you are not just being a good colleague &mdash; you are
                helping your employer fulfil a statutory duty. Understanding this gives weight to
                your role and provides leverage when advocating for protected training time.
              </p>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-400" />
                Construction Example: The Apprentice Unmotivated by Theory
              </h3>
              <p className="text-white text-sm leading-relaxed">
                A second-year apprentice says: &ldquo;I do not see the point of all this theory. I
                just want to wire things.&rdquo; They are practically capable but disengage
                completely during any discussion of regulations or principles.
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Understanding the motivation:</strong> They are
                intrinsically motivated by practical work (competence) but see theory as irrelevant
                (autonomy is undermined &mdash; they feel forced to do something pointless). Their
                readiness to learn theory is low because they do not see an immediate need for it
                (Knowles&rsquo; readiness principle).
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong className="text-white">Mentor approach:</strong> Connect every piece of
                theory to a practical outcome. Do not teach &ldquo;regulation 411.3.3&rdquo; &mdash;
                teach &ldquo;why your circuit has to disconnect in 0.4 seconds when someone touches
                a faulty socket.&rdquo; Use fault-finding as the entry point for theory: &ldquo;This
                RCD keeps tripping. Let us use the regulations to work out why.&rdquo; Over time,
                the apprentice learns that theory is not a separate subject &mdash; it is the manual
                for the work they love.
              </p>
            </div>
          </section>

          {/* ── InlineCheck #3 ────────────────────────────────────── */}
          <InlineCheck
            id="md-m1-s4-check-3"
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
          <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

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
              <Link to="../md-module-2">
                Next: The Mentor&rsquo;s Toolkit
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}
