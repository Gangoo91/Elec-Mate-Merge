import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Lightbulb,
  HelpCircle,
  Target,
  Users,
  BookOpen,
  Flame,
  TrendingUp,
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
      'According to Self-Determination Theory, which three psychological needs must be met for a person to be intrinsically motivated?',
    options: [
      'Money, status, and recognition',
      'Autonomy, competence, and relatedness',
      'Safety, comfort, and certainty',
      'Challenge, competition, and reward',
    ],
    correctIndex: 1,
    explanation:
      "Deci and Ryan's Self-Determination Theory (1985) identifies three innate psychological needs that drive intrinsic motivation: autonomy (feeling you have choice and control), competence (feeling you are capable and improving), and relatedness (feeling connected to others and that you belong). When all three are met, people are naturally motivated to learn and grow without needing external rewards or threats.",
  },
  {
    question:
      'A mentor says to an apprentice: "You are just not a maths person — some people have it and some do not." According to Carol Dweck, this statement reflects which type of mindset?',
    options: [
      'Growth mindset — it is accepting the reality of their abilities',
      'Fixed mindset — it treats ability as innate and unchangeable',
      'Neutral mindset — it is neither helpful nor harmful',
      'Realistic mindset — it is based on objective assessment',
    ],
    correctIndex: 1,
    explanation:
      'This is a classic fixed mindset statement. It treats mathematical ability as an innate, unchangeable trait — you either "have it" or you do not. Dweck\'s research shows that ability in almost every domain is developed through effort, practice, and effective strategies, not predetermined at birth. A growth mindset response would be: "You are finding the maths challenging right now, but that is completely normal. Let us try a different approach and build it up step by step."',
  },
  {
    question:
      "An apprentice is bored during first fix because the work feels too easy and repetitive. According to Csikszentmihalyi's flow theory, what should the mentor do?",
    options: [
      'Tell them that boredom is part of the job and they need to accept it',
      'Increase the challenge level to better match their growing skill — perhaps adding time targets or more complex layouts',
      'Move them straight to second fix even though they have not completed first fix competencies',
      'Reduce the amount of first fix work they have to do',
    ],
    correctIndex: 1,
    explanation:
      "Flow theory states that engagement (flow) occurs when the challenge level is well matched to the person's skill level. If skill is high but challenge is low, the result is boredom. The solution is to increase the challenge to match the growing skill — for example, setting time targets for first fix, introducing more complex layouts, or asking the apprentice to plan the cable routes independently. Skipping to second fix bypasses essential competencies, while simply accepting boredom guarantees disengagement.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'What if an apprentice is motivated by money and nothing else?',
    answer:
      "Financial motivation is not inherently bad — it is honest and understandable, especially for young people managing their first bills. The issue arises when money is the only motivation, because extrinsic rewards alone are not sustainable. Research consistently shows that once basic financial needs are met, additional money has diminishing returns on motivation. The mentor's role is not to eliminate the financial motivation but to supplement it with intrinsic motivators: pride in craftsmanship, the satisfaction of a circuit that tests first time, the respect of peers, and the sense of identity that comes from being a skilled electrician. These last long after the novelty of the pay packet wears off.",
  },
  {
    question: 'How do I keep an apprentice motivated during the boring parts of the job?',
    answer:
      'Every trade has repetitive, unglamorous work — containment runs, cable pulls, back-box installations. These are not inherently motivating. The key is context: help the apprentice understand how the "boring" task fits into the bigger picture. "These cable routes might feel tedious, but the quality of your first fix determines how smooth your second fix will be — and second fix is where the installation comes to life." You can also increase engagement by adding challenge (time targets, quality competitions), by connecting the task to their qualification progress, or by using the time for conversation and knowledge transfer. Some of the best mentoring conversations happen during repetitive work.',
  },
  {
    question: 'Is it wrong to use competition between apprentices as a motivator?',
    answer:
      'Healthy competition can be motivating for some people, but it must be handled carefully. Competition works well when it is focused on effort and improvement rather than just outcomes, when it is voluntary, and when it does not create a "winner and loser" dynamic that damages confidence. Comparing apprentices against each other ("Why can\'t you be more like Jamie?") is always destructive. Comparing an apprentice against their own previous performance ("Look how much faster and neater your terminations are compared to three months ago") is always constructive. If you use competition, make it collaborative: teams competing to complete a task, or individual apprentices competing to beat their own personal best.',
  },
  {
    question:
      'My apprentice was motivated at the start but has hit a plateau. How do I reignite their drive?',
    answer:
      'Motivational plateaus are completely normal and happen in every apprenticeship, usually around the 12-18 month mark when the novelty has worn off but competence is still developing. The key is to acknowledge the plateau honestly: "It is normal to feel like you are not making progress right now. You are actually learning a lot, but it does not always feel that way in the middle." Then create visible evidence of progress — show them photographs of their early work compared to their current work, review their skills log, or set a specific short-term goal that they can achieve quickly to rebuild momentum. Sometimes a change of environment helps: a different site, a different type of work, or exposure to a specialist area they have not experienced yet.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'Which psychologist developed Self-Determination Theory, identifying autonomy, competence, and relatedness as the three basic psychological needs?',
    options: [
      'Carol Dweck',
      'Mihaly Csikszentmihalyi',
      'Edward Deci and Richard Ryan',
      'Abraham Maslow',
    ],
    correctAnswer: 2,
    explanation:
      "Self-Determination Theory was developed by Edward Deci and Richard Ryan, first published in 1985. Their research demonstrated that intrinsic motivation is sustained when three basic psychological needs are satisfied: autonomy (feeling in control of one's own behaviour), competence (feeling effective and capable), and relatedness (feeling connected to others).",
  },
  {
    id: 2,
    question:
      'A mentor lets an apprentice choose which room to wire first. Which psychological need from Self-Determination Theory does this primarily support?',
    options: [
      'Competence — it makes them feel more skilled',
      'Relatedness — it connects them to the team',
      'Autonomy — it gives them a sense of choice and control',
      'Safety — it reduces the risk of making mistakes',
    ],
    correctAnswer: 2,
    explanation:
      'Offering choices, even small ones, primarily supports the need for autonomy. When an apprentice feels they have some control over their work — even something as simple as choosing which room to start with — they are more engaged and motivated than when every decision is made for them. Autonomy does not mean no supervision; it means appropriate agency within defined boundaries.',
  },
  {
    id: 3,
    question:
      "According to Carol Dweck's research, what is the most important difference between a fixed mindset and a growth mindset?",
    options: [
      'Fixed mindset people are less intelligent than growth mindset people',
      'Fixed mindset believes ability is innate; growth mindset believes ability is developed through effort and practice',
      'Growth mindset means always being positive; fixed mindset means being realistic',
      'Fixed mindset is better for physical trades; growth mindset is better for academic subjects',
    ],
    correctAnswer: 1,
    explanation:
      'Dweck\'s core finding is that people with a fixed mindset believe abilities are innate and unchangeable ("you either have it or you do not"), while people with a growth mindset believe abilities are developed through effort, practice, and effective strategies. This is not about intelligence — it is about the belief system that shapes how you respond to challenges, setbacks, and the effort required to improve.',
  },
  {
    id: 4,
    question:
      'A mentor responds to an apprentice\'s mistake by saying: "That did not work, but I can see you put real effort into it. Let us look at what happened and figure out a different approach." This response cultivates:',
    options: [
      'Learned helplessness — the apprentice will expect the mentor to always rescue them',
      'A fixed mindset — it focuses on what went wrong',
      'A growth mindset — it normalises failure as part of learning and focuses on effort and strategy',
      'Complacency — the apprentice will not try harder if mistakes are treated kindly',
    ],
    correctAnswer: 2,
    explanation:
      'This response cultivates a growth mindset by doing three things: acknowledging the effort (not just the outcome), normalising the mistake as part of the learning process (not as evidence of inability), and redirecting toward strategy ("let us figure out a different approach"). This teaches the apprentice that mistakes are information, not verdicts, and that improvement comes from adjusting strategies, not from having innate talent.',
  },
  {
    id: 5,
    question:
      "In Csikszentmihalyi's flow model, what happens when a task is too easy for the person's skill level?",
    options: [
      'They enter a flow state',
      'They become anxious',
      'They become bored and disengaged',
      'They become more motivated to work harder',
    ],
    correctAnswer: 2,
    explanation:
      "When skill level is high but the challenge is low, the result is boredom and disengagement. Flow — the state of complete absorption and optimal performance — only occurs when challenge and skill are well matched. This is why repetitive tasks that were once challenging become tedious as the apprentice's skill grows: the challenge has not kept pace with their development, and the mentor needs to increase complexity to maintain engagement.",
  },
  {
    id: 6,
    question: 'Which of the following is the best example of intrinsic motivation?',
    options: [
      'Working hard to earn a bonus at the end of the month',
      'Staying late to finish a consumer unit because the apprentice wants it to be perfect',
      'Completing college work to avoid being told off by the tutor',
      'Keeping the site tidy because the site manager is doing an inspection',
    ],
    correctAnswer: 1,
    explanation:
      'Intrinsic motivation comes from within — it is driven by personal satisfaction, interest, or the inherent enjoyment of the activity itself. Wanting a consumer unit to be perfect is intrinsic: the reward is the satisfaction of excellent work. Earning a bonus, avoiding punishment, and impressing an inspector are all extrinsic motivators — the drive comes from an external consequence, not from the activity itself. Both types have a role, but intrinsic motivation is more sustainable.',
  },
  {
    id: 7,
    question:
      "A mentor celebrates an apprentice's first independent consumer unit installation in front of the whole team. This primarily supports which motivational need?",
    options: [
      'Autonomy — it gives them more independence',
      'Competence and relatedness — it affirms their ability and connects them to the team',
      'Extrinsic reward — it is the same as giving them a bonus',
      'Competition — it motivates other apprentices to catch up',
    ],
    correctAnswer: 1,
    explanation:
      'Public recognition of an achievement supports both competence (the apprentice feels their growing ability is recognised and valued) and relatedness (they feel part of the team, respected by their peers). This is different from extrinsic reward because the recognition is social and relational, not transactional. The apprentice does not just feel rewarded — they feel seen, valued, and connected.',
  },
  {
    id: 8,
    question:
      'An apprentice says: "I will never be able to do Zs testing — I am rubbish at maths." What is the most effective mentor response?',
    options: [
      '"Some people just are not maths people. Focus on what you are good at."',
      '"You need to try harder. There is no excuse for not being able to do basic calculations."',
      '"You are finding Zs calculations difficult right now, but we can break it down step by step. Let us start with the formula and practise until it clicks."',
      '"Do not worry about the maths — the testers do the calculations for you."',
    ],
    correctAnswer: 2,
    explanation:
      'This response models a growth mindset. It reframes the difficulty as temporary and specific ("finding Zs calculations difficult right now") rather than permanent and global ("rubbish at maths"). It offers a concrete strategy (break it down, start with the formula, practise), and it conveys confidence that the apprentice can improve. The other responses either reinforce a fixed mindset, dismiss the difficulty, or create pressure without support.',
  },
];

export default function MDModule5Section2() {
  useSEO({
    title: 'Maintaining Motivation & Engagement | MD Module 5.2',
    description:
      'Self-Determination Theory, growth mindset, flow states, recognition, and connecting daily work to long-term goals — keeping apprentices motivated throughout their training.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../md-module-5">
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
            <Sparkles className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Maintaining Motivation &amp; Engagement
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            The psychology of motivation and practical strategies for keeping learners engaged,
            growing, and connected to their long-term goals
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Self-Determination Theory:</strong> Autonomy, competence, and relatedness
                drive intrinsic motivation
              </li>
              <li>
                <strong>Growth mindset:</strong> &ldquo;I cannot do this yet&rdquo; beats &ldquo;I
                will never be able to do this&rdquo;
              </li>
              <li>
                <strong>Flow:</strong> Match challenge to skill level &mdash; too easy means
                boredom, too hard means anxiety
              </li>
              <li>
                <strong>Recognition:</strong> Celebrate small wins and connect daily work to
                long-term goals
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Retention:</strong> Motivated apprentices complete their training &mdash;
                disengaged ones drop out
              </li>
              <li>
                <strong>Quality:</strong> Intrinsically motivated people produce better work than
                those just going through the motions
              </li>
              <li>
                <strong>Your role:</strong> Motivation is not permanent &mdash; it needs constant
                feeding, and that is the mentor&rsquo;s job
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain Deci and Ryan's Self-Determination Theory and its three core needs",
              'Apply autonomy, competence, and relatedness strategies in a mentoring context',
              'Describe the difference between fixed and growth mindsets and their impact on learning',
              "Use Csikszentmihalyi's flow model to match challenge to skill level",
              'Distinguish between intrinsic and extrinsic motivation with construction examples',
              'Design recognition and celebration strategies that sustain long-term engagement',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Self-Determination Theory */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            Self-Determination Theory in Practice
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Self-Determination Theory (SDT), developed by Edward Deci and Richard Ryan in 1985,
                is one of the most widely researched and practically useful theories of human
                motivation. At its core, SDT says that people are naturally inclined to grow, learn,
                and develop &mdash; but only when three basic psychological needs are met. When
                these needs are frustrated, motivation withers, engagement drops, and people go
                through the motions without genuine investment.
              </p>

              <p>
                For mentors, this is enormously practical. Instead of asking &ldquo;How do I make
                this apprentice more motivated?&rdquo; (which implies motivation is something you do
                to someone), ask &ldquo;Which of the three needs am I not meeting?&rdquo; This
                shifts your approach from external pressure to internal cultivation &mdash; which is
                far more effective and sustainable.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  The Three Basic Psychological Needs
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      A
                    </span>
                    <div>
                      <p className="text-sm font-medium text-rose-400">Autonomy</p>
                      <p className="text-sm text-white">
                        The need to feel that you have choice and control over your own actions.
                        Autonomy does not mean doing whatever you want &mdash; it means having
                        appropriate agency within defined boundaries. When people feel controlled,
                        directed, and micro-managed, their intrinsic motivation drops sharply.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      C
                    </span>
                    <div>
                      <p className="text-sm font-medium text-rose-400">Competence</p>
                      <p className="text-sm text-white">
                        The need to feel capable, effective, and improving. When people experience
                        mastery &mdash; the sense that they are getting better at something &mdash;
                        they are naturally motivated to continue. When they feel stuck, incompetent,
                        or that they are not making progress, motivation fades.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      R
                    </span>
                    <div>
                      <p className="text-sm font-medium text-rose-400">Relatedness</p>
                      <p className="text-sm text-white">
                        The need to feel connected to others, to belong, and to be valued by the
                        group. In a trade environment, relatedness means feeling like part of the
                        team &mdash; not just the apprentice who carries things, but a genuine
                        member of the electrical team whose contribution matters.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Let us look at how each of these needs plays out in a practical mentoring context on
                a construction site:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Autonomy in Practice</p>
                </div>
                <p className="text-sm text-white mb-3">
                  <strong>Let the apprentice choose which room to wire first.</strong> This seems
                  trivially small, but it is surprisingly powerful. When a mentor says &ldquo;We
                  need to do rooms 4, 5, and 6 today &mdash; which one do you want to start
                  with?&rdquo;, they are giving the apprentice a sense of ownership over the work
                  sequence. The outcome is the same (all three rooms get done), but the apprentice
                  feels they have agency rather than just following orders.
                </p>
                <p className="text-sm text-white">
                  Other autonomy strategies: let them choose their own tools within the approved
                  set, let them plan the cable route before you check it, let them decide the order
                  of operations within a task. Gradually increase the scope of their decisions as
                  their competence grows.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Competence in Practice</p>
                </div>
                <p className="text-sm text-white mb-3">
                  <strong>Celebrate the first independent consumer unit.</strong> The day an
                  apprentice installs, terminates, and tests a consumer unit entirely on their own
                  for the first time is a milestone. Mark it. Photograph it. Tell them it looks
                  professional. Share it with the team: &ldquo;Aisha just installed her first CU
                  solo and it tested first time &mdash; not bad at all.&rdquo; This moment of
                  recognised competence fuels motivation for weeks.
                </p>
                <p className="text-sm text-white">
                  Other competence strategies: keep a visible skills log that shows progress, set
                  achievable short-term goals, compare their current work to their earlier work to
                  show improvement, and make sure the difficulty of tasks matches their growing
                  ability.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Relatedness in Practice</p>
                </div>
                <p className="text-sm text-white mb-3">
                  <strong>Include the apprentice in team decisions.</strong> When you are planning
                  the day&rsquo;s work, ask the apprentice for their input: &ldquo;We need to decide
                  whether to do the containment first or the cable pulls. What do you think makes
                  more sense?&rdquo; Even if you already know the answer, inviting their opinion
                  signals that they are part of the team, not just an observer.
                </p>
                <p className="text-sm text-white">
                  Other relatedness strategies: introduce them to other trades by name, include them
                  in tea breaks and site conversations, ask them to explain a task to a newer
                  apprentice, and make sure they feel personally known and valued rather than
                  interchangeable.
                </p>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Remember:</strong> When motivation drops, the
                  first diagnostic question should be: &ldquo;Which of the three SDT needs is being
                  frustrated?&rdquo; Is the apprentice feeling micro-managed (autonomy)? Are they
                  stuck on tasks that are too easy or too hard (competence)? Do they feel like an
                  outsider on the team (relatedness)? The answer tells you exactly where to
                  intervene.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Growth Mindset */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            Growth Mindset (Dweck 2006)
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Carol Dweck, a professor of psychology at Stanford University, spent decades
                researching why some people thrive when they encounter difficulty while others give
                up. Her findings, published in <em>Mindset: The New Psychology of Success</em>{' '}
                (2006), identified two fundamentally different belief systems about ability and
                intelligence.
              </p>

              <p>
                A <strong>fixed mindset</strong> believes that abilities are innate and largely
                unchangeable. You are either &ldquo;a maths person&rdquo; or you are not. You are
                either &ldquo;good with your hands&rdquo; or you are not. Failure is evidence of
                permanent limitation. People with a fixed mindset tend to avoid challenges (because
                failure would confirm their inadequacy), give up quickly when things get hard, and
                feel threatened by the success of others.
              </p>

              <p>
                A <strong>growth mindset</strong> believes that abilities are developed through
                effort, practice, and effective strategies. The brain is like a muscle that grows
                with use. Failure is not evidence of inability &mdash; it is information about what
                needs to change. People with a growth mindset embrace challenges, persist through
                difficulty, and are inspired by the success of others because it shows what is
                possible.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Fixed Mindset vs Growth Mindset
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-white mb-2">Fixed Mindset</p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>&ldquo;I am rubbish at maths&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>&ldquo;I will never understand Zs calculations&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Avoids challenging tasks to avoid failure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Gives up when the task gets hard</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Takes feedback as personal criticism</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-rose-400 mb-2">Growth Mindset</p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>&ldquo;I cannot do this yet&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>&ldquo;I need a different approach to Zs&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Sees challenges as opportunities to improve</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Persists and tries new strategies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Uses feedback to guide improvement</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                The critical insight for mentors is this:{' '}
                <strong>
                  you cultivate mindset through your language and your response to mistakes
                </strong>
                . Every time you respond to an apprentice&rsquo;s mistake or struggle, you are
                either reinforcing a fixed mindset or building a growth mindset. The words you
                choose matter enormously.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Language That Builds Growth Mindset
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Instead of:</strong> &ldquo;You are just not a
                    practical person.&rdquo;
                    <br />
                    <strong className="text-rose-400">Say:</strong> &ldquo;Your hand skills are
                    developing. Let us practise this termination technique until it feels
                    natural.&rdquo;
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Instead of:</strong> &ldquo;That was
                    wrong.&rdquo;
                    <br />
                    <strong className="text-rose-400">Say:</strong> &ldquo;That did not quite work.
                    What do you think happened, and what would you try differently?&rdquo;
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Instead of:</strong> &ldquo;You are a natural
                    at this.&rdquo;
                    <br />
                    <strong className="text-rose-400">Say:</strong> &ldquo;You have clearly put a
                    lot of practice into your terminations &mdash; it shows.&rdquo;
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Instead of:</strong> &ldquo;Some people just
                    cannot do theory.&rdquo;
                    <br />
                    <strong className="text-rose-400">Say:</strong> &ldquo;Theory takes time to
                    click. Let us try a different way of looking at it.&rdquo;
                  </p>
                </div>
              </div>

              <p>
                Notice the pattern: growth mindset language focuses on{' '}
                <strong>effort, strategy, and process</strong> rather than innate ability. It treats
                difficulty as temporary and solvable rather than permanent and defining. And
                critically, it praises effort and approach rather than talent &mdash; because
                praising talent (&ldquo;you are a natural&rdquo;) inadvertently creates a fixed
                mindset where the apprentice becomes afraid to take on challenges in case they fail
                and lose their &ldquo;natural&rdquo; status.
              </p>

              <p>
                The single most powerful word in a growth mindset mentor&rsquo;s vocabulary is{' '}
                <strong>&ldquo;yet.&rdquo;</strong> When an apprentice says &ldquo;I cannot do
                three-phase calculations,&rdquo; adding &ldquo;yet&rdquo; transforms the statement
                from a permanent verdict to a temporary position on a journey. &ldquo;You cannot do
                three-phase calculations <em>yet</em>. That is completely normal at this stage. Let
                us build it up.&rdquo;
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Flow */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Flow (Csikszentmihalyi 1990)
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mihaly Csikszentmihalyi (pronounced &ldquo;cheek-sent-me-high&rdquo;), a
                Hungarian-American psychologist, spent decades studying what makes people genuinely
                happy and fully engaged. His research, published in{' '}
                <em>Flow: The Psychology of Optimal Experience</em> (1990), identified a mental
                state he called <strong>flow</strong> &mdash; a state of complete absorption in an
                activity where time seems to disappear, self-consciousness fades, and performance
                peaks.
              </p>

              <p>
                You have almost certainly experienced flow yourself, even if you did not know the
                name for it. It is that feeling when you are deep into a complex installation and
                two hours pass like twenty minutes. You are completely focused, every decision flows
                naturally, and the work feels effortless despite being objectively demanding. That
                is flow &mdash; and it is one of the most satisfying human experiences.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  The Flow Model: Challenge vs Skill
                </p>
                <p className="text-sm text-white mb-3">
                  Flow occurs when the challenge level of a task is well matched to the
                  person&rsquo;s skill level. When this balance is disrupted, you get one of two
                  negative states:
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg text-center">
                    <p className="text-xs font-medium text-blue-400 mb-1">
                      High Challenge + Low Skill
                    </p>
                    <p className="text-sm font-bold text-white">Anxiety</p>
                    <p className="text-xs text-white mt-1">Overwhelmed, stressed, may shut down</p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg text-center">
                    <p className="text-xs font-medium text-rose-400 mb-1">
                      Matched Challenge + Skill
                    </p>
                    <p className="text-sm font-bold text-rose-400">Flow</p>
                    <p className="text-xs text-white mt-1">Absorbed, focused, performing at best</p>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg text-center">
                    <p className="text-xs font-medium text-amber-400 mb-1">
                      Low Challenge + High Skill
                    </p>
                    <p className="text-sm font-bold text-white">Boredom</p>
                    <p className="text-xs text-white mt-1">Disengaged, going through motions</p>
                  </div>
                </div>
              </div>

              <p>
                For mentors, the flow model provides a practical diagnostic tool. If your apprentice
                seems anxious and overwhelmed, the challenge is too high for their current skill
                level &mdash; you need to scaffold, simplify, or break the task down. If they seem
                bored and disengaged, their skill has outgrown the challenge &mdash; you need to
                increase complexity, add time targets, or introduce new elements.
              </p>

              <p>
                The sweet spot &mdash; flow &mdash; is where the magic happens. It is where learning
                is fastest, engagement is highest, and satisfaction is greatest. But it is not a
                fixed point: as skill increases, challenge must increase to match. What was
                flow-inducing three months ago may now be boring. The mentor&rsquo;s job is to
                continuously calibrate the challenge-skill balance for each individual learner.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Gradually Increasing Complexity
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Consider how a mentor might structure an apprentice&rsquo;s progression through
                  first fix wiring:
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-white text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm text-white">
                      <strong>Week 1-2:</strong> Simple lighting circuit in one room under close
                      supervision. Challenge is high relative to skill &mdash; apprentice is focused
                      and slightly anxious. Mentor is present throughout.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-white text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm text-white">
                      <strong>Week 3-4:</strong> Same circuit type in multiple rooms. Skill is
                      growing and the task is becoming familiar &mdash; approaching the flow zone.
                      Mentor checks in periodically.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-white text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm text-white">
                      <strong>Week 5-6:</strong> If the mentor keeps them on the same task, skill
                      surpasses challenge &mdash; boredom sets in. Time to add complexity: two-way
                      switching, radial circuits, or planning the cable routes independently.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-white text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-sm text-white">
                      <strong>Week 7+:</strong> Intermediate switching, multi-point radials, or a
                      complete flat with lighting, power, and data. Each step raises the challenge
                      to match the growing skill, keeping the apprentice in or near the flow zone.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Practical Tip:</strong> When repetitive work
                  is unavoidable (and it often is in construction), you can shift the flow balance
                  by adding challenge dimensions that go beyond the physical task. Ask the
                  apprentice to estimate how long the task will take, then compare against actual
                  time. Ask them to plan the most efficient cable route. Ask them to identify
                  potential snags before starting. These cognitive challenges keep the brain engaged
                  even when the hands are doing familiar work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Recognition, Celebration & Long-Term Goals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Recognition, Celebration &amp; Connecting to Long-Term Goals
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Motivation research consistently shows that <strong>recognition</strong> &mdash;
                being seen, appreciated, and acknowledged for your work &mdash; is one of the most
                powerful and underused motivational tools available to mentors. It costs nothing,
                takes seconds, and has an outsized impact on engagement and commitment. Yet many
                mentors, particularly in the construction industry where the culture tends toward
                understatement, rarely give explicit recognition.
              </p>

              <p>
                There is a crucial distinction between <strong>intrinsic motivation</strong> and{' '}
                <strong>extrinsic motivation</strong>, and understanding this distinction changes
                how you use recognition effectively.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Flame className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-white">Intrinsic Motivation</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Driven by internal satisfaction: pride in craftsmanship, the pleasure of solving
                    a problem, the identity of being a skilled electrician.
                  </p>
                  <ul className="text-sm text-white space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>More sustainable over time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Produces higher quality work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Does not depend on external rewards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>Grows stronger with competence</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-white" />
                    <p className="text-sm font-medium text-white">Extrinsic Motivation</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Driven by external outcomes: pay, bonuses, avoiding punishment, impressing a
                    manager, passing an exam.
                  </p>
                  <ul className="text-sm text-white space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Effective for short-term compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Diminishing returns over time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Can undermine intrinsic motivation if overused</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>Stops working when the reward is removed</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                The best mentors cultivate intrinsic motivation while using extrinsic motivation
                strategically. They do this through three primary mechanisms:{' '}
                <strong>celebrating small wins</strong>,{' '}
                <strong>providing recognition in front of peers</strong>, and{' '}
                <strong>connecting daily work to long-term goals</strong>.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Celebrating Small Wins</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Do not wait for major milestones to recognise progress. The small wins along the
                  way are what keep momentum going through the long months of an apprenticeship.
                  Examples:
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>First neat cable termination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>First circuit that tests correctly on the first attempt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>First time they identify a fault independently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>First time they plan a cable route without help</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>First college assignment that passes first time</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Recognition in Front of Peers</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Public recognition has a multiplied impact compared to private praise. When a
                  mentor acknowledges an apprentice&rsquo;s achievement in front of the team, it
                  simultaneously:
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Reinforces the apprentice&rsquo;s sense of competence (SDT need)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Strengthens their sense of belonging to the team (relatedness need)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Creates a positive social norm that effort and quality are valued</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Motivates other team members through social proof</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Connecting Daily Work to Long-Term Goals
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Apprentices can lose sight of why the daily grind matters. A mentor who regularly
                  connects today&rsquo;s task to the bigger picture keeps motivation alive:
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">To the qualification:</strong> &ldquo;This
                    containment work is exactly what you will need for your AM2 assessment. Every
                    room you do here is practice for the real thing.&rdquo;
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">To the career:</strong> &ldquo;Once you are
                    qualified, you could go anywhere with this. Domestic, commercial, industrial,
                    renewable energy &mdash; the world opens up. Everything you are building now is
                    the foundation.&rdquo;
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">To identity:</strong> &ldquo;You are becoming
                    an electrician. Not many people can do what we do. Every day on site, you are
                    building the skills that make you part of this trade.&rdquo;
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Insight:</strong> The most powerful
                  recognition is specific, timely, and genuine. &ldquo;Good job&rdquo; is nice but
                  forgettable. &ldquo;That SWA termination is really neat &mdash; the gland is
                  tight, the armour is dressed properly, and your earth continuity is spot on. That
                  is proper professional work.&rdquo; That is unforgettable. Be specific about what
                  they did well, why it matters, and what it says about their development.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Key Takeaways */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Key Takeaways
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Motivation is not a fixed trait that some people have and others lack. It is a
                dynamic state that is influenced by the environment, the relationships, and the
                conditions that a mentor creates. Understanding the psychology behind motivation
                &mdash; SDT, growth mindset, and flow &mdash; gives you practical tools to diagnose
                motivational problems and design targeted interventions.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Takeaways</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Self-Determination Theory:</strong> Satisfy autonomy, competence, and
                      relatedness to unlock intrinsic motivation. When engagement drops, check which
                      need is being frustrated.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Growth mindset:</strong> Your language shapes your apprentice&rsquo;s
                      beliefs about their own ability. Focus on effort, strategy, and process. Add
                      &ldquo;yet&rdquo; to every &ldquo;I cannot.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Flow:</strong> Match challenge to skill level. Increase complexity as
                      competence grows. Boredom means the challenge is too low; anxiety means it is
                      too high.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Recognition:</strong> Be specific, timely, and genuine. Celebrate
                      small wins. Connect daily tasks to long-term goals and professional identity.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Intrinsic over extrinsic:</strong> Cultivate internal drive (pride,
                      mastery, identity) rather than relying on external rewards and punishments.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                In the next section, we will explore diversity, inclusion, and cross-cultural
                mentoring &mdash; ensuring that your mentoring practice is equitable and effective
                for every learner, regardless of their background, characteristics, or
                circumstances.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <div className="flex items-start gap-2 mb-1">
                  <HelpCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <h3 className="text-sm font-medium text-white">{faq.question}</h3>
                </div>
                <p className="text-sm text-white leading-relaxed pl-6">{faq.answer}</p>
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
            <Link to="../md-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../md-module-5-section-3">
              Diversity, Inclusion &amp; Cross-Cultural Mentoring
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
