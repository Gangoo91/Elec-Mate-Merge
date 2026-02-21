import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ClipboardList,
  Lightbulb,
  HelpCircle,
  Target,
  Users,
  Calendar,
  BookOpen,
  Zap,
  Star,
  RefreshCw,
  Award,
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
      "In Boyatzis's Intentional Change Theory, what is the second of the five discoveries?",
    options: [
      'The ideal self — who do I want to be?',
      'The real self — who am I right now?',
      'The learning agenda — how do I get from here to there?',
      'Experimentation and practice — trying new behaviours',
    ],
    correctIndex: 1,
    explanation:
      "The five discoveries in Boyatzis's Intentional Change Theory are: (1) the ideal self — your vision of who you want to become, (2) the real self — an honest assessment of who you are right now, including strengths and gaps, (3) the learning agenda — a plan for bridging the gap, (4) experimentation and practice — trying new behaviours in safe settings, and (5) trusting relationships — the supportive people who help you sustain change.",
  },
  {
    question: 'Which of the following is a well-formed SMART goal for developing self-regulation?',
    options: [
      'I will try to be calmer at work',
      'I will use the STOP technique at least once per week when I feel frustrated, for the next 8 weeks, and log each use in my phone',
      'I will never get angry again',
      'I will read a book about emotional intelligence sometime this year',
    ],
    correctIndex: 1,
    explanation:
      'A SMART goal is Specific (the STOP technique), Measurable (at least once per week, logged), Achievable (once per week is realistic), Relevant (self-regulation is the target domain), and Time-bound (8 weeks). "Try to be calmer" is too vague. "Never get angry" is unrealistic. "Read a book sometime" lacks specificity and a deadline.',
  },
  {
    question:
      'In Kolb\'s experiential learning cycle, which stage comes AFTER "concrete experience"?',
    options: [
      'Active experimentation',
      'Abstract conceptualisation',
      'Reflective observation',
      'Planning',
    ],
    correctIndex: 2,
    explanation:
      "Kolb's four-stage cycle runs: (1) concrete experience — something happens, (2) reflective observation — you reflect on what happened and how you felt, (3) abstract conceptualisation — you draw conclusions and connect it to theory, (4) active experimentation — you try a new approach based on what you learned. The cycle then repeats.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'How long does it take to see real results from EI development?',
    answer:
      'Research suggests that noticeable behavioural changes can begin within 30 days of consistent, deliberate practice. However, deeper neurological changes — the kind that make new behaviours automatic rather than effortful — typically take 60 to 90 days. This is why the 90-day plan in this section is structured in three phases. The first 30 days build awareness (you start noticing your emotions and patterns). The next 30 days build regulation skills (you start responding differently). The final 30 days build social competence (you start applying EI in relationships and leadership). The important thing is consistency — practising a little every day is far more effective than occasional intensive effort.',
  },
  {
    question: 'How do I track my EI progress when emotions are hard to measure?',
    answer:
      'While you cannot put a precise number on emotional intelligence the way you can measure a cable run, there are several practical ways to track progress. First, use the weekly reflection prompts in the 90-day plan — written reflections over time reveal patterns and growth that you would not otherwise notice. Second, ask for feedback from trusted colleagues or your EI buddy — other people often notice changes in your behaviour before you do. Third, track specific behavioural metrics: How many times this week did I use the STOP technique? Did I practise active listening in the toolbox talk? Did I use the DESC model in a difficult conversation? Fourth, notice the outcomes: Are your relationships improving? Are you handling pressure better? Are you communicating more effectively? These are all evidence of EI growth.',
  },
  {
    question: 'Can I mention EI development in job interviews?',
    answer:
      'Absolutely, and it can be a significant differentiator. Most candidates in construction interviews focus exclusively on technical qualifications and experience. Mentioning emotional intelligence development demonstrates self-awareness, commitment to professional growth, and the soft skills that employers increasingly value. Frame it in concrete, practical terms: "I have been working on developing my communication and leadership skills through a structured emotional intelligence programme. One technique I have found particularly useful is the DESC model for having difficult conversations — I used it recently when I needed to address a subcontractor\'s timekeeping." This shows the interviewer that you have practical, applicable skills, not just theoretical knowledge.',
  },
  {
    question: 'What if my workplace does not value emotional intelligence?',
    answer:
      'You can develop and benefit from EI regardless of your workplace culture. In fact, being the person with the highest EI in an emotionally unintelligent environment gives you a significant advantage — you can read situations others miss, navigate conflicts others cannot, and build relationships that others struggle with. Over time, your emotionally intelligent behaviour will influence those around you. People respond to someone who listens well, communicates clearly, stays calm under pressure, and treats others with respect — even if they have never heard the term "emotional intelligence". You do not need organisational buy-in to develop your own EI. You just need the commitment to practise.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: "In Boyatzis's Intentional Change Theory, the five discoveries begin with:",
    options: [
      'Identifying your weaknesses',
      'Finding a mentor',
      'The ideal self — your vision of who you want to become',
      'Setting SMART goals',
    ],
    correctAnswer: 2,
    explanation:
      'Intentional Change Theory begins with the ideal self — a compelling personal vision of who you want to become. This vision creates the emotional energy and motivation needed to sustain change through the difficult practice phases that follow. Without a clear picture of the ideal self, change efforts lack direction and tend to fizzle.',
  },
  {
    id: 2,
    question: 'What does the "M" in SMART goals stand for?',
    options: ['Meaningful', 'Motivational', 'Measurable', 'Managed'],
    correctAnswer: 2,
    explanation:
      'SMART stands for Specific, Measurable, Achievable, Relevant, and Time-bound. The "Measurable" component is critical because it provides a way to track progress and know when you have achieved the goal. "Be better at listening" is not measurable. "Practise active listening in every toolbox talk for the next month" is.',
  },
  {
    id: 3,
    question: 'An EI buddy system works because:',
    options: [
      'It creates competition between partners',
      'It provides external accountability and honest feedback that self-assessment alone cannot',
      'It transfers responsibility for your development to someone else',
      'It replaces the need for self-reflection',
    ],
    correctAnswer: 1,
    explanation:
      'The EI buddy system works because it provides two things that self-development alone cannot: external accountability (knowing someone will ask you about your progress keeps you on track) and honest feedback (other people can observe changes in your behaviour that you cannot see yourself). It complements rather than replaces self-reflection.',
  },
  {
    id: 4,
    question: 'In the 90-day EI development plan, what is the focus of Days 1-30?',
    options: [
      'Empathy and social skills',
      'Leadership style flexing',
      'Self-awareness — check-ins, trigger mapping, body scanning',
      'Conflict management and de-escalation',
    ],
    correctAnswer: 2,
    explanation:
      'The first 30 days focus on self-awareness because it is the foundation of all other EI competencies. You cannot regulate emotions you do not recognise, empathise with others when you are blind to your own feelings, or lead with EI if you do not understand your own emotional patterns. Daily check-ins, trigger mapping, and body scanning build the awareness baseline.',
  },
  {
    id: 5,
    question: "Kolb's experiential learning cycle consists of which four stages?",
    options: [
      'Plan, do, check, act',
      'Concrete experience, reflective observation, abstract conceptualisation, active experimentation',
      'Awareness, understanding, application, evaluation',
      'Listen, process, respond, review',
    ],
    correctAnswer: 1,
    explanation:
      "Kolb's (1984) experiential learning cycle has four stages: concrete experience (something happens), reflective observation (you reflect on it), abstract conceptualisation (you draw conclusions and connect to theory), and active experimentation (you try a new approach). EI development follows this cycle — you experience an emotional situation, reflect on it, connect it to what you have learned, and try a different response next time.",
  },
  {
    id: 6,
    question: 'How does EI development support other professional qualifications like NVQ or ILM?',
    options: [
      'It does not — EI and technical qualifications are completely separate',
      'It replaces the need for technical qualifications',
      'It develops the communication, teamwork, and self-management skills that NVQ and ILM assessors look for alongside technical competence',
      'It is only relevant to leadership qualifications, not technical ones',
    ],
    correctAnswer: 2,
    explanation:
      'NVQ, ILM, and other professional qualifications increasingly assess behavioural and interpersonal competencies alongside technical skills. Communication, teamwork, problem-solving, and self-management — all EI competencies — are embedded in the assessment criteria. Developing your EI directly supports your ability to demonstrate these competencies in portfolios, observations, and professional discussions.',
  },
  {
    id: 7,
    question:
      'The fifth discovery in Intentional Change Theory is "trusting relationships". Why is this considered essential for sustained change?',
    options: [
      'Because you need someone to do the work for you',
      'Because change is difficult to sustain alone — supportive relationships provide accountability, feedback, encouragement, and a safe space to practise',
      'Because you cannot learn anything without a formal teacher',
      'Because trusting relationships are the goal, not the means',
    ],
    correctAnswer: 1,
    explanation:
      'Boyatzis found that sustainable change almost never happens in isolation. Trusting relationships provide the social support that keeps you going when motivation dips, the honest feedback that helps you see your blind spots, the encouragement that sustains your effort, and the safe environment to practise new behaviours without fear of judgement.',
  },
  {
    id: 8,
    question: 'What is the single most important principle for EI development?',
    options: [
      'Reading as many books as possible about emotional intelligence',
      'Waiting until you feel ready before starting',
      'Starting with consistent, small daily practices rather than waiting for perfection',
      'Focusing only on your weaknesses and ignoring your strengths',
    ],
    correctAnswer: 2,
    explanation:
      'The most important principle in EI development is to start — now, imperfectly, and consistently. Small daily practices (a 2-minute check-in, one use of the STOP technique, one active listening exercise) compound over time into significant change. Waiting for the perfect time, the perfect plan, or the perfect motivation means never starting. Progress, not perfection, is the goal.',
  },
];

export default function EIModule5Section4() {
  useSEO({
    title: 'Your EI Development Plan | EI Module 5.4',
    description:
      'Intentional Change Theory, SMART goals for each EI domain, accountability structures, 90-day development plan, integrating EI into CPD, and course summary.',
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
            <Link to="../ei-module-5">
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
            <ClipboardList className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Your EI Development Plan
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Translating everything you have learned into a concrete, actionable plan for lifelong
            emotional intelligence growth
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Intentional Change:</strong> Boyatzis&rsquo;s five discoveries for lasting
                behavioural change
              </li>
              <li>
                <strong>SMART goals:</strong> Specific, measurable goals for each of the five EI
                domains
              </li>
              <li>
                <strong>Accountability:</strong> EI buddy system, mentor check-ins, and self-reviews
              </li>
              <li>
                <strong>90-day plan:</strong> A phased template taking you from awareness to
                application
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Knowledge is not enough:</strong> Understanding EI without practising it
                changes nothing
              </li>
              <li>
                <strong>Habit formation:</strong> Consistent practice over 90 days creates lasting
                neural pathways
              </li>
              <li>
                <strong>Career impact:</strong> A structured EI plan demonstrates professional
                growth to employers
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain Boyatzis's Intentional Change Theory and its five discoveries",
              'Write a SMART goal for each of the five EI domains',
              'Describe at least three accountability structures for EI development',
              'Create a phased 90-day development plan with weekly milestones',
              "Integrate EI development into your CPD record using Kolb's cycle",
              'Summarise the key frameworks and takeaways from all five modules',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Intentional Change Theory */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            Intentional Change Theory
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Richard Boyatzis, a professor at Case Western Reserve University and co-author of{' '}
                <em>Primal Leadership</em> with Goleman, spent decades researching how people
                actually change their behaviour in lasting ways. His conclusion was that sustainable
                change does not happen through willpower, forcing yourself, or gritting your teeth.
                It happens through a process he called{' '}
                <strong>Intentional Change Theory (ICT)</strong>, which involves five sequential
                discoveries.
              </p>

              <p>
                ICT is grounded in neuroscience. Each discovery activates different brain networks
                &mdash; the positive emotional attractor (PEA) for vision and motivation, and the
                negative emotional attractor (NEA) for honest self-assessment. Effective change
                requires both, but it must <strong>start with the positive vision</strong> (the
                ideal self) to create the emotional energy needed to sustain the difficult work of
                change.
              </p>

              <div className="space-y-4">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm font-medium text-rose-400">Discovery 1: The Ideal Self</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    <strong>Who do I want to be?</strong> This is your personal vision &mdash; not
                    who others want you to be, but who you genuinely aspire to become. In EI terms,
                    this might be: &ldquo;I want to be the kind of electrician who stays calm under
                    pressure, communicates clearly, and is someone people trust and want to work
                    with.&rdquo;
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Key principle:</strong> The ideal self must
                      be genuinely yours, not imposed by others. Change driven by external pressure
                      (&ldquo;my boss says I need to be calmer&rdquo;) rarely lasts. Change driven
                      by internal vision (&ldquo;I want to be someone who handles pressure
                      well&rdquo;) is sustainable.
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm font-medium text-rose-400">Discovery 2: The Real Self</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    <strong>Who am I right now?</strong> An honest assessment of your current EI
                    strengths and gaps. This requires the self-awareness you developed in Module 2
                    &mdash; and it takes courage. The real self includes both your strengths (which
                    you build on) and your gaps (which you develop).
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Key principle:</strong> Start with
                      strengths. Boyatzis emphasises that spending too much time on weaknesses
                      activates the negative emotional attractor and can be demoralising.
                      Acknowledge your strengths first, then identify the gaps you want to address.
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Discovery 3: The Learning Agenda
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    <strong>How do I get from here to there?</strong> A concrete plan for bridging
                    the gap between your real self and your ideal self. This is where SMART goals,
                    the 90-day plan, and specific EI techniques come together. The learning agenda
                    is not a rigid curriculum &mdash; it is a flexible roadmap that you adjust as
                    you learn and grow.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Discovery 4: Experimentation and Practice
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    <strong>Trying new behaviours.</strong> This is where you put theory into
                    practice. You try the STOP technique when frustrated. You use the DESC model in
                    a difficult conversation. You practise active listening in a toolbox talk. Not
                    every attempt will succeed &mdash; and that is expected. The point is to
                    experiment, reflect, and iterate.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Discovery 5: Trusting Relationships
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    <strong>Supportive relationships that sustain change.</strong> Sustainable
                    change rarely happens in isolation. You need people who support your growth,
                    give honest feedback, hold you accountable, and create a safe space for you to
                    practise new behaviours without judgement.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Mapping the Five Discoveries
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  A qualified electrician wants to become a better communicator and eventually move
                  into a supervisory role. Here is how they might map the five discoveries:
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Ideal self:</strong> &ldquo;I want to be
                    someone who communicates clearly, handles conflict well, and is trusted to lead
                    a team.&rdquo;
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Real self:</strong> &ldquo;I am technically
                    strong and reliable, but I tend to avoid difficult conversations and lose my
                    temper when things go wrong.&rdquo;
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Learning agenda:</strong> &ldquo;Focus on
                    self-regulation (STOP technique, breathing exercises) and assertive
                    communication (DESC model) over the next 90 days.&rdquo;
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Experimentation:</strong> &ldquo;Use the STOP
                    technique at least once a week. Use DESC the next time I need to raise an issue
                    with the subcontractor. Practise active listening in toolbox talks.&rdquo;
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Trusting relationships:</strong>{' '}
                    &ldquo;Partner with my colleague Dave as an EI buddy. Check in weekly. Ask my
                    foreman for honest feedback on my communication.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: SMART Goals for Each EI Domain */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            SMART Goals for Each EI Domain
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Vague intentions like &ldquo;I want to be more emotionally intelligent&rdquo; do not
                produce change. Specific, measurable, achievable, relevant, time-bound goals do. For
                each of Goleman&rsquo;s five EI domains, here is an example of a well-formed SMART
                goal that you can adapt to your own situation.
              </p>

              <div className="space-y-4">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm font-medium text-rose-400">Self-Awareness</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    <strong>Goal:</strong> &ldquo;I will do a 2-minute emotional check-in every
                    morning before starting work for the next 30 days, asking myself: What am I
                    feeling? Where do I feel it in my body? What triggered it?&rdquo;
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">S:</strong> 2-minute check-in with three
                      specific questions | <strong className="text-rose-400">M:</strong> Daily,
                      tracked on phone | <strong className="text-rose-400">A:</strong> 2 minutes is
                      realistic | <strong className="text-rose-400">R:</strong> Builds foundational
                      awareness | <strong className="text-rose-400">T:</strong> 30 days
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm font-medium text-rose-400">Self-Regulation</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    <strong>Goal:</strong> &ldquo;I will use the STOP technique (Stop, Take a
                    breath, Observe, Proceed) at least once per week when I feel frustrated, for the
                    next 8 weeks, and log each use in a note on my phone.&rdquo;
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">S:</strong> STOP technique in frustrating
                      moments | <strong className="text-rose-400">M:</strong> Once per week, logged
                      | <strong className="text-rose-400">A:</strong> Once per week is manageable |{' '}
                      <strong className="text-rose-400">R:</strong> Directly targets regulation |{' '}
                      <strong className="text-rose-400">T:</strong> 8 weeks
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm font-medium text-rose-400">Motivation</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    <strong>Goal:</strong> &ldquo;I will identify one thing I am proud of or
                    grateful for each Friday for the next 3 months, and write it down in a dedicated
                    note.&rdquo;
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">S:</strong> One pride/gratitude item per
                      week | <strong className="text-rose-400">M:</strong> Written down, reviewable
                      | <strong className="text-rose-400">A:</strong> Once per week is easy |{' '}
                      <strong className="text-rose-400">R:</strong> Builds optimism and intrinsic
                      motivation | <strong className="text-rose-400">T:</strong> 3 months
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-sm font-medium text-rose-400">Empathy</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    <strong>Goal:</strong> &ldquo;I will practise active listening in every toolbox
                    talk for the next month &mdash; maintaining eye contact, not interrupting, and
                    asking at least one follow-up question.&rdquo;
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">S:</strong> Active listening with specific
                      behaviours | <strong className="text-rose-400">M:</strong> Every toolbox talk,
                      one question per talk | <strong className="text-rose-400">A:</strong>{' '}
                      Realistic within existing meetings |{' '}
                      <strong className="text-rose-400">R:</strong> Directly builds empathy |{' '}
                      <strong className="text-rose-400">T:</strong> 1 month
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <p className="text-sm font-medium text-rose-400">Social Skills</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    <strong>Goal:</strong> &ldquo;I will use the DESC model in my next difficult
                    conversation, preparing the four steps in advance on my phone, and reflect on
                    how it went afterwards.&rdquo;
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">S:</strong> DESC model, prepared in advance
                      | <strong className="text-rose-400">M:</strong> One conversation, with
                      post-use reflection | <strong className="text-rose-400">A:</strong> One
                      conversation is achievable | <strong className="text-rose-400">R:</strong>{' '}
                      Directly applies social skills | <strong className="text-rose-400">T:</strong>{' '}
                      Next difficult conversation
                    </p>
                  </div>
                </div>
              </div>

              <p>
                You do not need to work on all five domains simultaneously. Pick one or two that
                feel most relevant to your current situation and focus there. Once those become
                habitual, move on to the next. Progress, not perfection, is the goal.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Accountability Structures */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Accountability Structures
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Research on behaviour change consistently shows that accountability multiplies your
                chances of success. A study by the American Society of Training and Development
                found that you have a 65% chance of completing a goal if you commit to someone else,
                and a 95% chance if you have a specific accountability appointment with that person.
                Without accountability, the figure drops to around 10%.
              </p>

              <p>
                In EI development, accountability is particularly important because emotional habits
                are deeply ingrained. You are not just learning a new skill &mdash; you are rewiring
                neural pathways that have been strengthening for years. External support makes the
                difference between temporary motivation and lasting change.
              </p>

              <div className="space-y-4">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">The EI Buddy System</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Partner with a trusted colleague who is also interested in developing their
                    emotional intelligence. This does not need to be formal or complicated. The key
                    elements are:
                  </p>
                  <ul className="text-sm text-white space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong>Weekly check-in:</strong> A 5-10 minute conversation (in person, by
                        phone, or even WhatsApp) where you each share what you practised that week,
                        what went well, and what you want to focus on next week.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong>Honest feedback:</strong> Give each other permission to point out
                        patterns you notice. &ldquo;I noticed you shut down a bit in that meeting
                        when the PM challenged your schedule &mdash; have you thought about how to
                        respond differently next time?&rdquo;
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>
                        <strong>No judgement:</strong> The buddy relationship must be
                        psychologically safe. Both parties need to feel comfortable being honest
                        about struggles and setbacks without fear of ridicule.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Mentor Check-Ins</p>
                  </div>
                  <p className="text-sm text-white">
                    If you have a mentor &mdash; whether formal or informal &mdash; include EI in
                    your conversations. Ask them about their own experience with managing emotions,
                    handling conflict, and communicating effectively. Most experienced professionals
                    have hard-won wisdom about emotional intelligence even if they never use the
                    term. A monthly check-in where you discuss your EI development alongside your
                    technical progression provides valuable perspective and encouragement.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">Self-Assessment Reviews</p>
                  </div>
                  <p className="text-sm text-white">
                    Schedule a monthly self-assessment where you honestly evaluate your progress
                    against your SMART goals. Ask yourself: What did I practise this month? What
                    went well? What was difficult? What do I want to focus on next month? Writing
                    these reflections down creates a record of your journey that you can look back
                    on to see how far you have come &mdash; which is enormously motivating,
                    especially during periods when progress feels slow.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Two Electricians as EI Buddies
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Sarah and James are both qualified electricians on the same project. They both
                  completed this EI course and decided to buddy up. Their arrangement:
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Every Friday lunchtime, they grab a tea and spend 10 minutes reviewing the
                      week
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Sarah is working on self-regulation &mdash; she tends to snap when under
                      pressure. James gives her a subtle signal (tapping his hard hat) when he
                      notices her tension rising
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      James is working on empathy &mdash; he tends to focus on tasks and overlook
                      how people are feeling. Sarah reminds him to check in with the apprentices
                      each morning
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      After a month, both report noticeable improvements. The foreman comments that
                      the team atmosphere has improved
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: The 90-Day Development Plan */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            The 90-Day Development Plan
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The 90-day plan is structured in three phases, each building on the previous one.
                The phases follow the natural progression of EI development: you must first become
                aware of your emotions before you can regulate them, and you must be able to manage
                yourself before you can effectively manage your interactions with others.
              </p>

              <div className="space-y-4">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Phase 1: Foundation (Days 1&ndash;30) &mdash; Self-Awareness Focus
                    </p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    The goal of Phase 1 is to build a solid baseline of emotional awareness. You are
                    training yourself to notice your emotions as they occur, recognise your physical
                    signals, and identify your triggers.
                  </p>
                  <div className="space-y-2">
                    <div className="bg-white/5 border border-white/10 p-2 rounded">
                      <p className="text-xs text-white">
                        <strong className="text-rose-400">Daily:</strong> 2-minute morning emotional
                        check-in (What am I feeling? Where in my body? Why?)
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2 rounded">
                      <p className="text-xs text-white">
                        <strong className="text-rose-400">Weekly:</strong> Map one emotional trigger
                        (situation, emotion, physical signal, behavioural response)
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2 rounded">
                      <p className="text-xs text-white">
                        <strong className="text-rose-400">By Day 30:</strong> You should have a
                        trigger map with at least four entries and a growing emotional vocabulary
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-white mt-3">
                    <strong>Weekly reflection prompt:</strong> &ldquo;What did I notice about my
                    emotions this week that I would have missed a month ago?&rdquo;
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Phase 2: Practice (Days 31&ndash;60) &mdash; Self-Regulation + Motivation
                    </p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Building on your new awareness, Phase 2 focuses on developing your ability to
                    manage your emotional responses and maintain motivation.
                  </p>
                  <div className="space-y-2">
                    <div className="bg-white/5 border border-white/10 p-2 rounded">
                      <p className="text-xs text-white">
                        <strong className="text-rose-400">Daily:</strong> Continue morning check-ins
                        + add one intentional breathing exercise when you notice tension
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2 rounded">
                      <p className="text-xs text-white">
                        <strong className="text-rose-400">Weekly:</strong> Use the STOP technique at
                        least once in a frustrating situation. Log the outcome. Identify one thing
                        you are proud of on Friday.
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2 rounded">
                      <p className="text-xs text-white">
                        <strong className="text-rose-400">By Day 60:</strong> You should notice that
                        the gap between trigger and response is growing &mdash; you are reacting
                        less and responding more
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-white mt-3">
                    <strong>Weekly reflection prompt:</strong> &ldquo;What situation would I have
                    reacted to differently a month ago? What did I do instead?&rdquo;
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Phase 3: Application (Days 61&ndash;90) &mdash; Empathy + Social Skills
                    </p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    With a solid foundation of self-awareness and self-regulation, Phase 3 extends
                    your EI outward to your relationships and interactions with others.
                  </p>
                  <div className="space-y-2">
                    <div className="bg-white/5 border border-white/10 p-2 rounded">
                      <p className="text-xs text-white">
                        <strong className="text-rose-400">Daily:</strong> Practise active listening
                        in at least one conversation per day (full attention, no interrupting, one
                        follow-up question)
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2 rounded">
                      <p className="text-xs text-white">
                        <strong className="text-rose-400">Weekly:</strong> Use the DESC model for
                        any difficult conversation. Try at least one leadership style you do not
                        normally use. Check in on a colleague who seems to be having a tough time.
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2 rounded">
                      <p className="text-xs text-white">
                        <strong className="text-rose-400">By Day 90:</strong> You should notice
                        improvements in your relationships, communication effectiveness, and ability
                        to influence outcomes
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-white mt-3">
                    <strong>Weekly reflection prompt:</strong> &ldquo;How did my EI skills affect my
                    interactions with others this week? What would I do differently?&rdquo;
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Measuring Progress</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Behavioural metrics:</strong> How often did I use the STOP technique?
                      Did I complete my daily check-in? How many times did I practise active
                      listening?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Outcome indicators:</strong> Are my relationships improving? Am I
                      handling pressure better? Are difficult conversations going more smoothly?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Feedback from others:</strong> Ask your EI buddy, mentor, or trusted
                      colleague: &ldquo;Have you noticed any changes in how I communicate or handle
                      situations?&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Reflection journal:</strong> Re-read your weekly reflections at the
                      end of 90 days. The growth visible in your own writing is often the most
                      powerful evidence of progress.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Integrating EI into Your CPD */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Integrating EI into Your CPD
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Emotional intelligence development is a legitimate and increasingly valued area of
                continuing professional development (CPD). The competencies you develop through EI
                training &mdash; communication, teamwork, leadership, self-management, and conflict
                resolution &mdash; are embedded in the assessment criteria of professional
                qualifications including NVQ, ILM, SSSTS, and SMSTS.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    How EI Supports Professional Qualifications
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">NVQ Level 3 (Electrotechnical):</strong>{' '}
                      Requires evidence of communication with clients, working as part of a team,
                      and managing your own work. All are EI competencies.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">
                        ILM (Institute of Leadership & Management):
                      </strong>{' '}
                      Leadership and management qualifications explicitly assess self-awareness,
                      emotional awareness, communication effectiveness, and the ability to motivate
                      and develop others.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">SSSTS / SMSTS:</strong> Site supervisors and
                      managers need to understand team dynamics, communicate effectively, manage
                      conflict, and create a positive safety culture. All EI competencies.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                To record EI development in your CPD log, use{' '}
                <strong>Kolb&rsquo;s experiential learning cycle</strong> (1984) as a framework.
                David Kolb, a professor at Case Western Reserve University, proposed that effective
                learning happens in a four-stage cycle:
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-1">1. Concrete Experience</p>
                  <p className="text-sm text-white">
                    Something happens. For example: &ldquo;A subcontractor challenged my programme
                    in front of the whole team and I felt my temper rising.&rdquo;
                  </p>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-1">
                    2. Reflective Observation
                  </p>
                  <p className="text-sm text-white">
                    You reflect on what happened. &ldquo;I noticed my jaw tightening and my voice
                    getting louder. I was about to snap back defensively.&rdquo;
                  </p>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-1">
                    3. Abstract Conceptualisation
                  </p>
                  <p className="text-sm text-white">
                    You connect it to theory. &ldquo;This was an amygdala hijack. The STOP technique
                    from Module 3 is designed for exactly this situation.&rdquo;
                  </p>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-1">
                    4. Active Experimentation
                  </p>
                  <p className="text-sm text-white">
                    You try a new approach. &ldquo;Next time, I will pause, take a breath, and
                    respond calmly using the DESC model rather than reacting defensively.&rdquo;
                  </p>
                </div>
              </div>

              <p>
                Recording EI development in this structured way demonstrates to employers,
                assessors, and professional bodies that you are engaged in meaningful, reflective
                professional growth &mdash; not just ticking CPD boxes.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Course Summary and Next Steps */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Course Summary and Next Steps
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                You have now completed all five modules of this emotional intelligence course. Let
                us take a moment to reflect on the journey you have been on and the frameworks you
                now have at your disposal.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Your Journey Across Five Modules
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Understanding Emotional Intelligence
                      </p>
                      <p className="text-sm text-white">
                        Salovey &amp; Mayer&rsquo;s definition, Goleman&rsquo;s five-domain model,
                        Bar-On&rsquo;s EQ-i, the four-branch model, EI vs IQ research, the
                        neuroscience of emotions, and why EI matters in construction.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Self-Awareness</p>
                      <p className="text-sm text-white">
                        Goleman&rsquo;s self-awareness competencies, emotional granularity, Johari
                        Window, body-emotion mapping, trigger identification, emotional vocabulary,
                        and &ldquo;name it to tame it&rdquo;.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Self-Regulation</p>
                      <p className="text-sm text-white">
                        The amygdala hijack, the STOP technique, cognitive reappraisal, breathing
                        techniques, accountability and integrity, and managing emotions on site.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Motivation &amp; Empathy</p>
                      <p className="text-sm text-white">
                        Intrinsic vs extrinsic motivation, Daniel Pink&rsquo;s Drive model,
                        Seligman&rsquo;s learned optimism, the three types of empathy, active
                        listening, perspective-taking, and cultural sensitivity.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Social Skills &amp; Applying EI
                      </p>
                      <p className="text-sm text-white">
                        Assertive communication, the DESC model, Cialdini&rsquo;s principles of
                        influence, Thomas-Kilmann conflict modes, psychological safety,
                        Goleman&rsquo;s six leadership styles, servant leadership, and your personal
                        EI development plan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Most Important Takeaway</p>
                </div>
                <p className="text-sm text-white">
                  Emotional intelligence is not a destination &mdash; it is a lifelong journey of
                  growth. You will never &ldquo;finish&rdquo; developing your EI, just as you will
                  never finish learning about electrical installations. There will always be new
                  situations that challenge you, new relationships that test you, and new
                  opportunities to grow. The difference now is that you have the frameworks,
                  techniques, and self-awareness to navigate these challenges deliberately rather
                  than reactively.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Start Now, Start Small</p>
                </div>
                <p className="text-sm text-white mb-3">
                  The most important thing is to <strong>start</strong>. Not to start perfectly, not
                  to start with a comprehensive plan, not to start when conditions are ideal. Start
                  now, with one small practice:
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Do your first emotional check-in tomorrow morning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Use the STOP technique the next time you feel frustrated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Really listen to someone in your next conversation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Ask a colleague to be your EI buddy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>Pick one SMART goal and commit to it for 30 days</span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  Small, consistent actions compound into significant change. Every emotionally
                  intelligent response you choose is a step forward. Every difficult conversation
                  you handle well is a victory. Every time you notice your emotions before they
                  control you, your neural pathways strengthen.
                </p>
              </div>

              <p>
                When you are ready, take the mock exam to test your knowledge across all five
                modules. The mock exam will help you consolidate your learning and identify any
                areas you might want to revisit. Good luck &mdash; and thank you for investing in
                your emotional intelligence. The construction industry needs more emotionally
                intelligent professionals, and you are now one of them.
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
        <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-6">
              Take the Mock Exam
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
