import {
  ArrowLeft,
  CheckCircle,
  FileCheck,
  Lightbulb,
  HelpCircle,
  BookOpen,
  Target,
  Users,
  Shield,
  CalendarCheck,
  Phone,
  Heart,
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
    id: 'rsm-5-4-qc1',
    question:
      'What does the "M" in SMART stand for, and why is it important in a resilience action plan?',
    options: [
      'Meaningful — it reminds you why the action matters to you personally',
      'Measurable — it allows you to track whether you are actually doing what you committed to',
      'Motivational — it ensures the goal makes you feel inspired',
      'Manageable — it ensures the goal is not too difficult to achieve',
    ],
    correctIndex: 1,
    explanation:
      'The "M" in SMART stands for Measurable. This is critical in a resilience action plan because vague commitments like "I will take more breaks" are easy to forget or reinterpret. A measurable commitment — "I will take a 15-minute tea break at 9:00 and 14:30 every working day" — is concrete and trackable. At the end of each week, you can honestly assess whether you followed through. Measurement creates accountability.',
  },
  {
    id: 'rsm-5-4-qc2',
    question:
      'Why is it recommended to identify three people in your support network rather than just one?',
    options: [
      'Because three is a lucky number',
      'Because different people serve different support functions — practical, emotional, and professional — and relying on a single person creates an unfair burden',
      'Because you need three witnesses for legal purposes',
      'Because having more contacts looks better on a CV',
    ],
    correctIndex: 1,
    explanation:
      'Having three people in your support network provides resilience through diversity. One person might be excellent for practical support (helping with a job, lending tools), another for emotional support (listening without judgement when you are struggling), and a third for professional support (career advice, technical guidance). Relying on a single person for all your support needs creates an unfair burden on them and leaves you vulnerable if they are unavailable when you need help.',
  },
  {
    id: 'rsm-5-4-qc3',
    question:
      'How often should you review your personal resilience action plan, and what should a review involve?',
    options: [
      'Once a year during your annual appraisal',
      'Only when you feel burnt out',
      'Monthly — a 10-minute self-check reviewing whether you have kept your commitments and whether your early warning signs have been present',
      'Daily — a detailed 30-minute journalling session',
    ],
    correctIndex: 2,
    explanation:
      'A monthly 10-minute self-check is the recommended frequency for reviewing your resilience action plan. This is frequent enough to catch problems early but not so burdensome that it becomes another source of stress. The review should cover: Am I keeping my non-negotiable commitments? Have any of my early warning signs been present? Is my support network still in place? Do I need to adjust anything? This regular reflection turns resilience from a one-off exercise into an ongoing practice.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'What if I create a plan but do not stick to it?',
    answer:
      'This is completely normal and is not a sign of failure. The plan is a living document, not a rigid contract. The purpose of the monthly review is to assess what is working and what is not, and to adjust accordingly. If you committed to a 30-minute walk every evening but find that unrealistic, adjust it to a 15-minute walk three times a week. If you set a 7pm phone-off rule but find that 7:30 works better, change it. The goal is progress, not perfection. The most important thing is that you have a plan and you regularly review it — not that you follow it perfectly every single day. Life on site is unpredictable; your plan should be flexible enough to accommodate that.',
  },
  {
    question:
      'I do not feel comfortable talking to anyone about my mental health. What are my options?',
    answer:
      "You do not have to talk face-to-face if that does not feel right for you. The Lighthouse Club helpline (0345 605 1956) and Samaritans (116 123) are completely anonymous — you do not have to give your name, and nobody will know you called. Many men find it easier to open up by text rather than voice — you can text the Samaritans on 116 123 or use the Shout crisis text service by texting SHOUT to 85258. Online forums and communities like those run by Andy's Man Club also provide a space where you can read other people's experiences before deciding whether to share your own. Writing in a private journal is another option — externalising your thoughts onto paper is itself a powerful coping mechanism, even if nobody else ever reads it.",
  },
  {
    question: 'Should I share my resilience action plan with anyone else?',
    answer:
      'This is entirely your choice, but sharing key elements with a trusted person can significantly increase your accountability and the likelihood of sticking to your commitments. You do not need to share the whole plan. You might tell your partner about your 7pm phone-off rule so they can support (and gently remind) you. You might tell a colleague about your 90-minute break commitment so they can nudge you if you are working through. You might tell a mate about your monthly self-check so they can ask how it is going. Shared commitments are much stronger than private ones because social accountability is one of the most powerful behaviour-change tools available.',
  },
  {
    question: 'This is the final module — what happens now?',
    answer:
      'Completing this course is a significant achievement, but it is the beginning of a practice, not the end of a programme. The resilience skills you have learned across all five modules — understanding stress, managing your thinking, building healthy habits, maintaining financial resilience, recovering properly, and creating an action plan — are lifelong skills that need ongoing practice. Your action plan is the bridge between learning and doing. Review it monthly, adjust it as your circumstances change, and use it as a compass when things get tough. Remember: resilience is not about never struggling — it is about knowing what to do when you do. You now have the knowledge. The rest is practice.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'What does "SMART" stand for in the context of action planning?',
    options: [
      'Simple, Meaningful, Achievable, Relevant, Timely',
      'Specific, Measurable, Achievable, Relevant, Time-bound',
      'Strategic, Motivating, Adaptable, Realistic, Trackable',
      'Structured, Manageable, Actionable, Results-focused, Tested',
    ],
    correctAnswer: 1,
    explanation:
      'SMART stands for Specific (clearly defined), Measurable (you can track whether you are doing it), Achievable (realistically within your capacity), Relevant (connected to your actual resilience needs), and Time-bound (has a defined timeframe or frequency). This framework turns vague intentions into concrete, trackable commitments.',
  },
  {
    id: 2,
    question: 'Why is it important to define "non-negotiables" in your resilience action plan?',
    options: [
      'Because your employer requires it for your performance review',
      'Because having commitments you maintain regardless of workload pressure creates a baseline of self-care that protects against burnout even during the busiest periods',
      'Because it gives you an excuse to leave work early',
      'Non-negotiables are not important — flexibility is more valuable',
    ],
    correctAnswer: 1,
    explanation:
      'Non-negotiables are the resilience practices you commit to maintaining even when everything else is falling away — the busy season, the tight deadline, the difficult project. They form a baseline of self-care that prevents you from sliding into the pattern of sacrificing recovery for work. Without non-negotiables, the first thing to go when workload increases is always self-care, which is exactly when you need it most.',
  },
  {
    id: 3,
    question: 'How many people should be in your personal support network, and why?',
    options: [
      'One — you should have one trusted person you tell everything to',
      'Three — different people serve different support functions (practical, emotional, professional)',
      'Ten — the more people the better',
      'None — resilience means handling everything yourself',
    ],
    correctAnswer: 1,
    explanation:
      'The recommended number is three because different people serve different support functions. One might be great for practical help (lending a hand on a job), another for emotional support (listening when you need to talk), and a third for professional guidance (career advice, technical questions). Having three contacts ensures you are not over-reliant on any single person and provides a safety net if one person is unavailable.',
  },
  {
    id: 4,
    question:
      'What is an "early warning system" in the context of a personal resilience action plan?',
    options: [
      'A fire alarm installed on a construction site',
      'A list of your personal warning signs that indicate you are heading toward burnout, paired with a specific action plan for when you notice them',
      'An app that sends you motivational quotes every morning',
      'A system where your employer monitors your stress levels remotely',
    ],
    correctAnswer: 1,
    explanation:
      'An early warning system is your personalised set of indicators that tell you your resilience is slipping — the signs that are unique to you (e.g., drinking more, sleeping badly, snapping at your partner, losing interest in hobbies). Paired with a specific action plan for when you notice these signs (e.g., book a GP appointment, call a mate, take a day off), it creates a safety mechanism that catches problems before they become crises.',
  },
  {
    id: 5,
    question: 'How often should you review your resilience action plan?',
    options: [
      'Never — once it is written, it should not change',
      'Monthly — a 10-minute self-check to review commitments and assess warning signs',
      'Only when you feel burnt out',
      'Every five years, aligned with your re-certification',
    ],
    correctAnswer: 1,
    explanation:
      'A monthly 10-minute self-check is the recommended review frequency. This is frequent enough to detect early warning signs and course-correct before small problems become large ones, but not so frequent that it becomes burdensome. The review should assess: Am I keeping my non-negotiable commitments? Have any warning signs appeared? Is my support network active? Do I need to adjust anything?',
  },
  {
    id: 6,
    question: 'Which of the following is a SMART resilience commitment?',
    options: [
      '"I will try to be less stressed"',
      '"I will take a 15-minute walk at lunchtime every working day for the next month"',
      '"I will be more resilient"',
      '"I will think about my wellbeing more often"',
    ],
    correctAnswer: 1,
    explanation:
      'A 15-minute walk at lunchtime every working day for the next month is SMART because it is Specific (15-minute walk, at lunchtime), Measurable (you can track whether you did it each day), Achievable (15 minutes is realistic), Relevant (physical activity and fresh air are proven stress reducers), and Time-bound (for the next month, then review).',
  },
  {
    id: 7,
    question:
      'Which organisation provides free, 24/7 support specifically for the construction industry?',
    options: [
      'Alcoholics Anonymous',
      'The Lighthouse Club (0345 605 1956)',
      'The Citizens Advice Bureau',
      'The National Trust',
    ],
    correctAnswer: 1,
    explanation:
      "The Lighthouse Club is the construction industry's dedicated charity for wellbeing support. Their helpline (0345 605 1956) operates 24/7 and provides free, confidential emotional, physical, and financial support specifically for people working in construction and their families.",
  },
  {
    id: 8,
    question: 'What is the purpose of the monthly resilience self-check?',
    options: [
      'To create additional stress by adding another task to your to-do list',
      'To catch early warning signs, review whether commitments are being maintained, and adjust the plan as circumstances change',
      'To prepare a report for your employer',
      'To calculate how many hours of annual leave you have remaining',
    ],
    correctAnswer: 1,
    explanation:
      'The monthly self-check turns resilience from a one-off exercise into an ongoing practice. By regularly reviewing your warning signs, commitments, and support network, you create a continuous feedback loop that catches problems early and allows you to adjust your plan as your work and life circumstances change. It takes 10 minutes and can prevent months of suffering.',
  },
];

export default function RSMModule5Section4() {
  useSEO({
    title: 'Your Personal Resilience Action Plan | RSM Module 5.4',
    description:
      'Building your personal resilience action plan with SMART goals, non-negotiable practices, support networks, early warning systems, and monthly self-checks for construction workers.',
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
            <Link to="../rsm-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <FileCheck className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Your Personal Resilience Action Plan
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Bringing together everything you have learned across all five modules into a practical,
            personal plan that sticks
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>SMART commitments:</strong> Three specific, measurable resilience actions
              </li>
              <li>
                <strong>Non-negotiables:</strong> Three practices you maintain regardless of
                workload
              </li>
              <li>
                <strong>Support network:</strong> Three people you can turn to for different types
                of help
              </li>
              <li>
                <strong>Monthly review:</strong> A 10-minute self-check to keep the plan alive
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Knowledge is not enough:</strong> Knowing about resilience without a plan is
                like having tools without a job
              </li>
              <li>
                <strong>Prevention:</strong> A plan catches problems before they become crises
              </li>
              <li>
                <strong>Longevity:</strong> The electricians who thrive over decades are those who
                manage themselves deliberately
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Create three SMART resilience commitments tailored to your personal circumstances',
              'Identify three non-negotiable practices that form your resilience baseline',
              'Build a three-person support network covering practical, emotional, and professional needs',
              'Define your personal early warning signs and create a response plan',
              'Schedule and conduct a monthly 10-minute resilience self-check',
              'Access the full range of support services available to UK construction workers',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Bringing It All Together */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Bringing It All Together
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Over the course of this module and the four that preceded it, you have built a
                comprehensive understanding of resilience and stress management in the construction
                context. You have learned about the physiology of stress &mdash; how cortisol and
                adrenaline affect your body and brain. You have explored cognitive techniques for
                managing unhelpful thinking patterns. You have examined the practical building
                blocks of resilience &mdash; sleep, exercise, nutrition, financial management, and
                social connection. You have studied how to recover properly and how to switch off
                after work. And you have learned to recognise the warning signs of burnout before it
                becomes a crisis.
              </p>

              <p>
                But knowledge alone is not enough. Knowing that you should take breaks every 90
                minutes does not mean you will actually do it. Understanding the
                performance-recovery cycle does not automatically change your behaviour on site.
                Recognising the warning signs of burnout is useless if you do not have a plan for
                what to do when you notice them. The gap between knowing and doing is where most
                good intentions die.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Purpose of a Personal Action Plan
                  </p>
                </div>
                <p className="text-sm text-white">
                  A personal resilience action plan bridges the gap between knowledge and behaviour.
                  It takes the general principles you have learned and translates them into
                  specific, concrete commitments that are tailored to your personal circumstances,
                  your working patterns, and your individual vulnerabilities. It is not a tick-box
                  exercise or a form to be filed and forgotten. It is a living document &mdash; a
                  set of commitments that you review regularly, adjust as your circumstances change,
                  and use as a compass when things get tough.
                </p>
              </div>

              <p>
                Think of it this way: the previous four modules gave you the tools. This section
                helps you decide which tools to pick up, how to use them, and how to make sure they
                stay in your toolkit rather than gathering dust in the bottom of the van.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: SMART Action Planning */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            SMART Action Planning: Three Specific Commitments
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The SMART framework is one of the most effective tools for turning intentions into
                actions. Each commitment you make should be:
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-1">S &mdash; Specific</p>
                  <p className="text-xs text-white">
                    Clearly defined &mdash; exactly what, where, when, and how. Not &ldquo;take more
                    breaks&rdquo; but &ldquo;take a 15-minute tea break at 9:00 and 14:30.&rdquo;
                  </p>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-1">M &mdash; Measurable</p>
                  <p className="text-xs text-white">
                    Trackable &mdash; you can objectively assess whether you did it or not. Not
                    &ldquo;exercise more&rdquo; but &ldquo;walk for 20 minutes at lunchtime, Monday
                    to Friday.&rdquo;
                  </p>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-1">A &mdash; Achievable</p>
                  <p className="text-xs text-white">
                    Realistic given your current circumstances. Not &ldquo;meditate for an hour
                    every morning&rdquo; if you have three kids and a 6am start, but &ldquo;three
                    deep breaths before starting the van.&rdquo;
                  </p>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-1">R &mdash; Relevant</p>
                  <p className="text-xs text-white">
                    Connected to your actual resilience needs. If your main vulnerability is poor
                    sleep, your commitment should address sleep, not something unrelated.
                  </p>
                </div>
                <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg sm:col-span-2 lg:col-span-1">
                  <p className="text-sm font-medium text-rose-400 mb-1">T &mdash; Time-bound</p>
                  <p className="text-xs text-white">
                    Has a defined timeframe. &ldquo;For the next four weeks, then review.&rdquo;
                    This prevents commitments from becoming vague, open-ended obligations.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Example: A Sparky&rsquo;s Three SMART Commitments
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-xs font-medium text-rose-400 mb-1">Commitment 1: Recovery</p>
                    <p className="text-sm text-white">
                      &ldquo;I will take a 15-minute tea break at 9:00 and a 15-minute tea break at
                      14:30 every working day for the next four weeks. I will leave my phone in the
                      van during these breaks and step outside for fresh air.&rdquo;
                    </p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-xs font-medium text-rose-400 mb-1">
                      Commitment 2: Switching Off
                    </p>
                    <p className="text-sm text-white">
                      &ldquo;I will put my work phone in the kitchen drawer at 7pm every evening and
                      not take it out until 7am the next morning. I will set up a WhatsApp Business
                      auto-reply for out-of-hours messages. Starting this week, reviewed after four
                      weeks.&rdquo;
                    </p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-xs font-medium text-rose-400 mb-1">
                      Commitment 3: Social Connection
                    </p>
                    <p className="text-sm text-white">
                      &ldquo;I will phone my mate Dave every Friday lunchtime for a 10-minute
                      catch-up. I will join the local five-a-side football group on Wednesday
                      evenings. Starting next week, reviewed after four weeks.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Notice that each commitment is specific enough to be actionable, measurable enough
                to be tracked, achievable within a normal working life, relevant to a genuine
                resilience need, and time-bound with a review date. These are not vague aspirations
                &mdash; they are concrete behavioural commitments that can be assessed at the end of
                each week.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Non-Negotiables and Support Network */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Non-Negotiables and Your Support Network
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Non-negotiables are the resilience practices that you commit to maintaining{' '}
                <strong>regardless of workload, deadline pressure, or how busy the diary is</strong>
                . They are the absolute baseline &mdash; the things that keep you functioning even
                when everything else falls away. The reason they matter is that during the busiest,
                most stressful periods (which is precisely when you need resilience most), self-care
                is always the first thing to be sacrificed. Non-negotiables prevent this by creating
                boundaries that you do not cross.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Example Non-Negotiables for an Electrician
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">1.</strong> &ldquo;No work calls or messages
                      after 7pm. No exceptions. If it is genuinely urgent, they will call 999, not
                      me.&rdquo;
                    </p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">2.</strong> &ldquo;I walk for at least 20
                      minutes every day, even if it is just around the block after work. Rain or
                      shine.&rdquo;
                    </p>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">3.</strong> &ldquo;Sundays are completely
                      free. No quoting, no admin, no site visits. Sunday is for family and
                      rest.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The power of non-negotiables is in their simplicity and absoluteness. They are not
                goals to aim for &mdash; they are lines you do not cross. When you have a clear
                non-negotiable, decision fatigue disappears: you do not have to debate with yourself
                every evening about whether to check the work phone. The decision has already been
                made.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Building Your Three-Person Support Network
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Resilience is not a solo endeavour. Having people you can turn to when things get
                  tough is one of the most powerful protective factors against stress and burnout.
                  Identify three people who serve different support functions:
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">1. Practical Support</p>
                    <p className="text-sm text-white">
                      Someone who can help with the practical demands of work and life. A colleague
                      who can cover for you, a mate who can lend a hand on a job, a family member
                      who can help with childcare. This person helps reduce the <em>load</em> when
                      it gets too heavy.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">2. Emotional Support</p>
                    <p className="text-sm text-white">
                      Someone you can be honest with about how you are feeling. A partner, a close
                      friend, a sibling &mdash; someone who will listen without judgement and
                      without immediately trying to fix the problem. This person helps you{' '}
                      <em>process</em> the emotional weight of difficult situations.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">3. Professional Support</p>
                    <p className="text-sm text-white">
                      Someone who understands the trade and can provide guidance on work-related
                      challenges. A mentor, a former tutor, an experienced colleague, or a trade
                      association contact. This person helps you <em>navigate</em> the professional
                      aspects of stress &mdash; career decisions, difficult clients, workplace
                      disputes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Construction Example:</strong> An electrician
                  identified his three-person support network: his wife (emotional support &mdash;
                  she listens when he needs to vent and gently tells him when he is overdoing it),
                  his mate Chris who runs a plumbing firm (practical support &mdash; they lend each
                  other labourers when one of them is short-staffed), and his old college tutor who
                  is now a senior inspector (professional support &mdash; he calls him when he has a
                  tricky technical question or a difficult client situation). Having these three
                  people identified and active means he never feels completely alone with a problem.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Early Warning System */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Your Early Warning System
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Everyone has their own unique set of warning signs that indicate their resilience is
                slipping. These are the early indicators &mdash; the amber lights before the red
                &mdash; that tell you something needs to change before you reach a crisis point. The
                challenge is that in the middle of a demanding period, these signs are easy to miss
                or dismiss. That is why they need to be written down in advance, when you have the
                clarity to recognise them.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Common Early Warning Signs</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Review this list and identify which signs are personally relevant to you. Everyone
                  is different &mdash; your warning signs might be different from your
                  colleague&rsquo;s.
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    'Sleep disruption — difficulty falling asleep, waking at 3am, waking exhausted',
                    'Increased alcohol consumption — needing a drink to wind down every evening',
                    'Irritability — snapping at your partner, kids, or colleagues over small things',
                    'Loss of interest in hobbies — cannot be bothered with things you normally enjoy',
                    'Physical symptoms — persistent headache, back pain, stomach problems',
                    'Social withdrawal — avoiding mates, eating lunch alone, declining invitations',
                    'Cutting corners at work — doing the minimum rather than your usual standard',
                    'Dreading work — Sunday evening dread that intensifies on Monday morning',
                  ].map((sign, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>{sign}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p>
                Once you have identified your personal warning signs, pair each one with a specific
                action. This creates an <strong>if-then plan</strong> that removes the need for
                decision-making at a time when your decision-making capacity is already compromised.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Example If-Then Plans</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">If</strong> I notice I am drinking more than
                      two nights in a row, <strong className="text-white">then</strong> I will call
                      my mate Dave and arrange to do something active instead
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">If</strong> my sleep is disrupted for more than
                      five consecutive nights, <strong className="text-white">then</strong> I will
                      book a GP appointment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">If</strong> I am snapping at my partner more
                      than once a week, <strong className="text-white">then</strong> I will review
                      my working hours and take a day off within the next week
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">If</strong> I notice I am cutting corners on
                      installations, <strong className="text-white">then</strong> I will stop, take
                      a break, and honestly assess whether I am fit to be doing safety-critical work
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Monthly Self-Check */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            The Monthly Resilience Self-Check
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A plan that is written and never reviewed is a plan that will be forgotten. The
                monthly resilience self-check is the mechanism that keeps your action plan alive and
                relevant. It takes 10 minutes, once a month &mdash; ideally on the same date each
                month so it becomes a habit. Set a calendar reminder.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CalendarCheck className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Monthly Self-Check Template</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      1. Commitments Review (3 minutes)
                    </p>
                    <p className="text-sm text-white">
                      Look at your three SMART commitments. For each one, honestly answer: Did I
                      keep this commitment this month? If yes, well done &mdash; carry on. If no,
                      why not? Was it unrealistic? Did circumstances change? Do I need to adjust it?
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      2. Warning Signs Check (3 minutes)
                    </p>
                    <p className="text-sm text-white">
                      Review your list of personal warning signs. Have any of them been present this
                      month? If yes, which ones, and what action did you take? If the action was not
                      enough, escalate &mdash; talk to someone, book a GP appointment, or take time
                      off.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      3. Support Network Check (2 minutes)
                    </p>
                    <p className="text-sm text-white">
                      Have you been in contact with your three support people this month? If not,
                      reach out. Relationships need maintenance &mdash; you cannot call someone for
                      support after six months of silence and expect the same quality of connection.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">4. Adjustment (2 minutes)</p>
                    <p className="text-sm text-white">
                      Based on the review, do you need to change anything? Adjust a commitment? Add
                      a new warning sign? Change a support person? Update the plan and move on.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Construction Example:</strong> An electrician
                  sets the 1st of every month as his self-check date. He sits in the van for 10
                  minutes before starting work, pulls out his notepad, and runs through the four
                  questions. In January, he notices he has not spoken to his mate Chris in three
                  weeks and his sleep has been disrupted for the last 10 days. He texts Chris to
                  arrange a coffee, and books a GP appointment for the following week. Without the
                  self-check, he would have dismissed both things as &ldquo;nothing really&rdquo;
                  and carried on until they became bigger problems.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Signposting Recap and Key Takeaways */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Support Services and Key Takeaways
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                No resilience action plan is complete without knowing where to turn when your own
                strategies are not enough. The following organisations provide free, confidential
                support specifically for people in the UK construction industry and beyond. Save
                these numbers in your phone &mdash; not just for yourself, but so you can pass them
                on to a colleague who might need them.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Signposting: Where to Get Help
                  </p>
                </div>
                <ul className="text-sm text-white space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Lighthouse Club</strong> &mdash; 0345 605 1956
                      (24/7). The construction industry&rsquo;s dedicated wellbeing charity. Free,
                      confidential emotional, physical, and financial support for construction
                      workers and their families.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Mates in Mind</strong> &mdash; matesinmind.org.
                      A construction charity focused on improving mental health awareness and
                      providing support across the sector. Training, resources, and signposting.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Samaritans</strong> &mdash; 116 123 (free,
                      24/7). Available for anyone struggling to cope. You do not have to be suicidal
                      to call &mdash; they support anyone who is finding things difficult.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">
                        CALM (Campaign Against Living Miserably)
                      </strong>{' '}
                      &mdash; 0800 58 58 58 (5pm to midnight). Specifically for men experiencing
                      emotional distress or crisis.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Andy&rsquo;s Man Club</strong> &mdash;
                      andysmanclub.co.uk. Free, weekly peer-support groups for men across the UK.
                      Monday evenings, 7pm. No referral, no registration &mdash; just turn up.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Your GP</strong> &mdash; The first port of call
                      for persistent symptoms. Can assess mental health, provide sick notes,
                      prescribe medication, and refer for counselling or CBT.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Construction Industry Helpline</strong> &mdash;
                      0345 605 1956. Operated by the Lighthouse Club. Financial advice, counselling
                      referrals, and emergency grants for construction workers in crisis.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Takeaway</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>SMART commitments</strong> turn good intentions into concrete,
                      trackable actions that actually get done.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Non-negotiables</strong> create a resilience baseline that holds even
                      during the busiest periods.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>A three-person support network</strong> ensures you have practical,
                      emotional, and professional support available when you need it.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Your early warning system</strong> catches problems before they become
                      crises &mdash; but only if the warning signs are written down in advance.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>The monthly self-check</strong> keeps the plan alive and turns
                      resilience from a one-off exercise into a lifelong practice.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Final Thought</p>
                </div>
                <p className="text-sm text-white">
                  Resilience is not about never struggling. It is about knowing what to do when you
                  do. You now have the knowledge, the tools, and the plan. The electricians who
                  thrive in this industry over decades are not the toughest or the hardest-working.
                  They are the ones who manage themselves as deliberately as they manage their
                  installations &mdash; with care, with planning, and with the understanding that
                  prevention is always better than repair. Look after yourself the way you look
                  after your work. You are worth the investment.
                </p>
              </div>
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
            <Link to="../rsm-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-6">
              Next: Mock Exam
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
