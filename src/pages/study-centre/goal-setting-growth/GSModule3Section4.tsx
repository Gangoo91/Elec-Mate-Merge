import { ArrowLeft, Layers, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (InlineCheck — correctIndex, 0-indexed)      */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'gs-3-4-check1',
    question:
      'James Clear&rsquo;s habit stacking formula states: &ldquo;After [CURRENT HABIT], I will [NEW HABIT].&rdquo; An electrician wants to build the habit of photographing every installation before starting work. Which of the following is the BEST habit stack?',
    options: [
      '&ldquo;I will photograph every installation at some point during the day&rdquo;',
      '&ldquo;After parking my van on site, I will photograph the existing installation before touching anything&rdquo;',
      '&ldquo;I need to remember to take photos &mdash; I will set a reminder on my phone&rdquo;',
      '&ldquo;I will try to photograph installations when I remember to do so&rdquo;',
    ],
    correctIndex: 1,
    explanation:
      'Option B follows the exact habit stacking formula: it identifies a specific current habit (parking the van on site) and attaches the new desired habit (photographing the existing installation) directly to it. The current habit acts as an automatic trigger &mdash; you always park when you arrive, so the cue is reliable and consistent. Option A is vague (&ldquo;at some point&rdquo;) and lacks a specific cue. Option C relies on a phone reminder rather than an existing behavioural anchor, which is less reliable because it can be snoozed or ignored. Option D uses intention language (&ldquo;try&rdquo;, &ldquo;when I remember&rdquo;) rather than linking to a concrete anchor. James Clear emphasises that the power of habit stacking is its specificity: by linking new behaviours to existing ones, you leverage the brain&rsquo;s existing neural pathways rather than trying to create entirely new cues from scratch.',
  },
  {
    id: 'gs-3-4-check2',
    question:
      'Shawn Achor&rsquo;s &ldquo;20-second rule&rdquo; states that reducing the activation energy for a desired behaviour by just 20 seconds dramatically increases the likelihood of doing it. Which of the following is the BEST application of this principle for an electrician who wants to study for 20 minutes each evening?',
    options: [
      'Telling yourself firmly that you will study every evening, no matter what',
      'Leaving your study materials, notebook, and a pen open on the kitchen table so they are ready when you sit down after dinner',
      'Buying a more expensive textbook so you feel obligated to use it',
      'Asking your partner to remind you to study every evening',
    ],
    correctIndex: 1,
    explanation:
      'Option B directly applies the 20-second rule by reducing the activation energy required to start studying. When your materials are already out, open, and visible, the barrier to beginning is almost zero &mdash; you simply sit down and start. Compare this to having to find your textbook, locate your notebook, find a pen, clear space on the table, and open to the right page &mdash; each step adds friction and provides an opportunity to decide &ldquo;I&rsquo;ll do it tomorrow&rdquo;. Shawn Achor&rsquo;s research (published in The Happiness Advantage) showed that even tiny reductions in friction &mdash; as small as 20 seconds &mdash; significantly increase follow-through on desired behaviours. Option A relies on willpower, which is unreliable. Option C uses financial guilt, which is a weak motivator. Option D outsources the cue to another person, which creates dependency and potential conflict.',
  },
  {
    id: 'gs-3-4-check3',
    question:
      'Charles Duhigg defines a &ldquo;keystone habit&rdquo; as a single habit that triggers positive changes across multiple areas of life. For a tradesperson, which of the following is the BEST example of a keystone habit?',
    options: [
      'Buying a new tool every month',
      'Regular physical exercise &mdash; which research shows improves sleep, energy, mood, focus, and decision-making',
      'Watching electrical training videos on social media',
      'Arriving exactly on time for every job',
    ],
    correctIndex: 1,
    explanation:
      'Regular physical exercise is the classic example of a keystone habit identified by Charles Duhigg in The Power of Habit. Research consistently shows that when people start exercising regularly, positive changes cascade into other areas: they sleep better, eat more healthily, feel more energetic, have improved mood and reduced stress, concentrate more effectively, and make better decisions. For tradespeople who do physically demanding work, regular exercise also reduces injury risk, improves recovery, and extends career longevity. Option A (buying tools) is a purchasing habit, not a behavioural keystone. Option C (watching videos) is passive consumption without the cascading benefits of a true keystone habit. Option D (punctuality) is a good professional habit but does not typically trigger the wide-ranging positive changes that define a keystone habit.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      'I&rsquo;ve tried habit stacking before and it didn&rsquo;t work. What am I doing wrong?',
    answer:
      'The most common reason habit stacks fail is that the anchor habit (the existing behaviour you are attaching the new habit to) is not specific or consistent enough. Vague anchors like &ldquo;after I get home from work&rdquo; or &ldquo;in the evening&rdquo; are unreliable because the timing, context, and your mental state vary significantly from day to day. Effective anchors are precise, consistent, and already deeply embedded: &ldquo;after I pour my first cup of coffee&rdquo;, &ldquo;after I lock the van&rdquo;, &ldquo;after I sit down at the kitchen table after dinner&rdquo;. The second common mistake is stacking too many new habits at once. Start with a single stack &mdash; one new behaviour attached to one existing anchor &mdash; and only add additional layers once the first has become automatic (typically 2&ndash;4 weeks). The third mistake is making the new habit too large. BJ Fogg recommends making it &ldquo;tiny&rdquo; &mdash; so small it takes less than 30 seconds. Once the tiny version is automatic, you can gradually expand it.',
  },
  {
    question: 'How do I design my van for better habits and productivity?',
    answer:
      'Your van is your mobile workshop, and its design directly affects your daily habits and efficiency. Apply the environment design principles from this section. First, make cues for good habits obvious: keep your PPE in a highly visible spot near the door so you see it immediately when you open up; store your testing instruments in a dedicated, easy-to-access location so there is zero friction when you need them; keep your certificate and documentation folder (or tablet) in the cab where you can grab it easily. Second, remove cues for bad habits: if you tend to snack on unhealthy food, don&rsquo;t keep it in the van. Third, use the 20-second rule: anything you need frequently should be accessible within seconds; anything you want to avoid should require effort to reach. Fourth, use visual cues: a laminated checklist on the dashboard (&ldquo;PPE, photos, test, certify, photos&rdquo;) serves as a habit prompt. Many successful electricians also keep a &ldquo;grab bag&rdquo; of essential tools and consumables for the most common tasks, pre-packed and ready to go, reducing decision fatigue and setup time.',
  },
  {
    question: 'What is the difference between a habit stack and a routine?',
    answer:
      'A routine is a sequence of behaviours you perform regularly, but it may or may not be triggered by a specific cue &mdash; you might simply do it at a certain time of day or because you remember. A habit stack is a specific technique where each behaviour in the sequence is explicitly triggered by the completion of the previous one: &ldquo;After I do X, I will do Y. After I do Y, I will do Z.&rdquo; The distinction matters because habit stacks leverage the brain&rsquo;s existing &ldquo;completion signal&rdquo; &mdash; the neurological signal that fires when you finish an action &mdash; as the cue for the next action. This creates a chain of automatic behaviours that is far more reliable than a time-based or memory-based routine. Over time, a well-designed habit stack becomes a routine, but it started with explicit, intentional linking of each step to the previous one. For tradespeople, the practical difference is this: a morning routine might be &ldquo;I do these five things in the morning&rdquo;; a morning habit stack is &ldquo;After I pour my coffee, I review today&rsquo;s schedule. After I review the schedule, I check my materials list. After I check materials, I load the van.&rdquo; The chain is self-cueing.',
  },
  {
    question: 'Can environment design help me break bad habits as well as build good ones?',
    answer:
      'Absolutely &mdash; and in fact, environment design is one of the most powerful tools for breaking unwanted habits. James Clear frames this as inverting the laws of behaviour change: to break a bad habit, make the cue invisible, the behaviour unattractive, the process difficult, and the reward unsatisfying. For example, if you habitually check social media when you should be studying, remove social media apps from your phone&rsquo;s home screen (make the cue invisible), use app-blocking software during study time (make the process difficult), and keep your study materials out and open (make the alternative behaviour easier). If you tend to eat unhealthy food on site, stop buying it for your van (remove the cue from your environment) and pre-pack healthy alternatives (make the desired behaviour easier). If you procrastinate on paperwork, set up a dedicated workspace with all forms and tools ready (reduce friction for the desired behaviour) and block distracting websites on your laptop. The key insight is that willpower is unreliable &mdash; but environment design works consistently because it changes the default options available to you.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'James Clear&rsquo;s habit stacking formula is based on a psychological principle called &ldquo;implementation intention&rdquo;, first researched by Peter Gollwitzer. What is the core mechanism that makes implementation intentions effective?',
    options: [
      'They increase motivation by making goals feel more exciting',
      'They create a specific if-then plan that pre-loads a decision, reducing reliance on willpower and memory',
      'They require a written contract that creates social accountability',
      'They work by making the habit itself more enjoyable through positive association',
    ],
    correctAnswer: 1,
    explanation:
      'Implementation intentions work by creating a specific if-then plan (&ldquo;If situation X occurs, I will perform behaviour Y&rdquo;) that pre-loads the decision about when, where, and how to act. Peter Gollwitzer&rsquo;s research at New York University demonstrated that when people form implementation intentions, they are significantly more likely to follow through on their goals because the decision has already been made in advance &mdash; the situation itself becomes the trigger, bypassing the need for conscious deliberation, motivation, or willpower in the moment. James Clear adapted this principle into the habit stacking formula by using an existing habit as the &ldquo;if&rdquo; condition: &ldquo;After [CURRENT HABIT], I will [NEW HABIT]&rdquo;. This is more reliable than time-based intentions (&ldquo;At 7am, I will...&rdquo;) because existing habits are deeply encoded neurological patterns that fire automatically, providing a consistent and reliable cue.',
  },
  {
    id: 2,
    question:
      'BJ Fogg&rsquo;s Tiny Habits method recommends starting new habits at an extremely small scale. If an electrician wants to build a daily study habit, what would Fogg recommend as the initial &ldquo;tiny&rdquo; version?',
    options: [
      'Study for one full hour every evening without fail',
      'Read the entire chapter of BS 7671 relevant to tomorrow&rsquo;s work',
      'Open your study book and read just one paragraph &mdash; then celebrate',
      'Watch a 30-minute training video every evening after dinner',
    ],
    correctAnswer: 2,
    explanation:
      'BJ Fogg, founder of the Behaviour Design Lab at Stanford University, developed the Tiny Habits method based on the principle that behaviour happens when three elements converge: Motivation, Ability, and a Prompt (his Behaviour Model: B = MAP). The key insight is that by making the habit tiny (extremely easy), you remove the need for high motivation. Reading one paragraph is so small that it requires almost no willpower or motivation &mdash; anyone can do it, even on their worst day. The &ldquo;celebrate&rdquo; step is critical: Fogg&rsquo;s research shows that positive emotion (even a brief internal &ldquo;yes!&rdquo;) immediately after the behaviour is what wires the habit into the brain. Once the tiny version is automatic, natural expansion occurs &mdash; you find yourself reading two paragraphs, then a page, then ten minutes, then twenty. The habit grows organically because the neural pathway has been established. Starting with an hour (Option A) or thirty minutes (Option D) requires high motivation, which is unreliable.',
  },
  {
    id: 3,
    question:
      'An electrician creates the following habit stack for arriving on site: &ldquo;After parking the van &rarr; put on PPE &rarr; photograph the existing installation &rarr; brief the customer on today&rsquo;s work.&rdquo; After two weeks, the electrician finds that they consistently put on PPE but skip the photograph and customer brief. According to habit stacking principles, what is the MOST likely cause?',
    options: [
      'The electrician lacks motivation to take photographs',
      'The stack is too long &mdash; the chain breaks because the later items are not yet automated and require conscious effort',
      'Photographing installations is not a useful habit for electricians',
      'The stack should be performed in a different order',
    ],
    correctAnswer: 1,
    explanation:
      'When a habit stack breaks partway through, the most common cause is that the chain is too long for the current stage of habit formation. The first link in the chain (PPE after parking) was likely already semi-automatic, so it stuck easily. But the subsequent links (photograph, then brief) were entirely new behaviours that had not yet been automated. Each new link in a stack requires conscious effort until it becomes habitual, and conscious effort is limited &mdash; especially at the start of a busy workday. The solution is to build the stack incrementally: first, establish &ldquo;after parking &rarr; PPE&rdquo; until it is completely automatic (which it already is). Then add only the photograph: &ldquo;after putting on PPE &rarr; photograph installation&rdquo;. Once that is automatic (2&ndash;4 weeks), add the customer brief. James Clear recommends never adding more than one new behaviour to a stack at a time.',
  },
  {
    id: 4,
    question:
      'Shawn Achor&rsquo;s &ldquo;20-second rule&rdquo; is based on reducing activation energy for desired behaviours. Which of the following scenarios BEST demonstrates this principle for an electrician who wants to complete certificates immediately after each job?',
    options: [
      'Setting a phone alarm that says &ldquo;Complete certificate now&rdquo; at the end of each job',
      'Promising the customer that the certificate will be emailed within 24 hours',
      'Keeping the certification app open on a tablet that is always in the van cab, with the customer&rsquo;s details pre-loaded from the job booking',
      'Writing &ldquo;COMPLETE CERTIFICATES&rdquo; in large letters on a sticky note on the dashboard',
    ],
    correctAnswer: 2,
    explanation:
      'Option C best demonstrates the 20-second rule because it reduces the activation energy to near zero: the app is already open, the device is immediately accessible (in the cab, not buried in a toolbox), and the customer details are pre-loaded. The electrician simply picks up the tablet and starts filling in the certificate. Every step that has been eliminated &mdash; finding the device, opening the app, searching for the customer, entering basic details &mdash; is a friction point that could derail the behaviour. Shawn Achor&rsquo;s research showed that even tiny amounts of friction (as small as 20 seconds) can be enough to prevent a behaviour from occurring, because in that moment of friction, the brain has time to generate reasons not to do it (&ldquo;I&rsquo;ll do it later&rdquo;, &ldquo;I need to get to the next job&rdquo;). By pre-loading the environment, you bypass this decision point entirely.',
  },
  {
    id: 5,
    question:
      'Charles Duhigg describes &ldquo;keystone habits&rdquo; as habits that trigger a cascade of positive changes across multiple areas. Research consistently identifies regular exercise as a keystone habit. Why does exercise trigger changes in seemingly unrelated areas such as productivity, eating, and financial discipline?',
    options: [
      'Exercise is so time-consuming that it forces people to be more organised with the rest of their day',
      'Exercise releases endorphins that make people permanently happier, which automatically improves all other behaviours',
      'Exercise builds self-regulatory capacity (willpower), creates a sense of identity shift (&ldquo;I am someone who takes care of myself&rdquo;), and the discipline transfers to other domains',
      'Exercise is only a keystone habit for people who are naturally athletic and disciplined',
    ],
    correctAnswer: 2,
    explanation:
      'Duhigg&rsquo;s analysis of keystone habits, drawing on research from multiple studies, identifies several mechanisms by which exercise triggers cascading positive changes. First, exercise strengthens self-regulatory capacity &mdash; the ability to override impulses and maintain focus &mdash; which transfers to other domains such as work discipline, dietary choices, and financial decisions. Second, regular exercise creates an identity shift: the person begins to see themselves as &ldquo;someone who exercises&rdquo;, which is part of a broader identity of &ldquo;someone who takes care of themselves&rdquo; and &ldquo;someone who follows through on commitments&rdquo;. This identity shift makes it feel incongruent to eat poorly, procrastinate, or neglect other responsibilities. Third, the structure and routine of regular exercise provides a framework that organises other behaviours around it. For tradespeople, exercise also improves the physical capacity needed for demanding manual work, reduces injury risk, and improves sleep quality &mdash; all of which enhance job performance.',
  },
  {
    id: 6,
    question:
      'James Clear describes &ldquo;environment design&rdquo; as one of the most effective strategies for behaviour change. His first law of behaviour change is &ldquo;Make it obvious&rdquo;. Which of the following BEST applies this principle to an electrician&rsquo;s work environment?',
    options: [
      'Telling yourself every morning that you will be more organised today',
      'Placing a laminated daily checklist on the van dashboard (PPE &rarr; photos &rarr; test &rarr; certify &rarr; photos &rarr; update records) so the sequence is visually prominent every time you enter the van',
      'Relying on memory to recall the correct sequence of tasks for each job',
      'Asking your supervisor to check your work at the end of each day',
    ],
    correctAnswer: 1,
    explanation:
      'Option B directly applies Clear&rsquo;s first law (&ldquo;Make it obvious&rdquo;) by placing a visual cue in a location you cannot miss &mdash; the van dashboard, which is directly in your line of sight every time you enter the vehicle. The checklist serves as an environmental cue that prompts the desired sequence of behaviours without requiring you to remember them. This is far more reliable than memory (Option C) or self-talk (Option A), both of which fail under pressure, fatigue, or distraction &mdash; all common on busy job sites. Clear emphasises that the most effective cues are visual, prominent, and positioned at the point of decision. A dashboard checklist meets all three criteria. Over time, the behaviours on the checklist become automatic habits, but the visual cue continues to serve as a safety net against omission, particularly when you are tired or rushing between jobs.',
  },
  {
    id: 7,
    question:
      'Context-dependent memory research shows that people tend to behave differently in different environments. An electrician who studies effectively at the library but cannot focus at home is experiencing:',
    options: [
      'A character flaw indicating lack of discipline',
      'Context-dependent behaviour &mdash; the library environment contains cues for focus and study, while the home environment contains cues for relaxation and leisure',
      'Evidence that they should only study at the library and never attempt to study at home',
      'A sign that their home environment is too comfortable for productive work',
    ],
    correctAnswer: 1,
    explanation:
      'Context-dependent behaviour is a well-established psychological phenomenon. Research by Godden and Baddeley (1975) and many subsequent studies have shown that memory, mood, and behaviour are strongly influenced by the environment in which they occur. Each environment contains a unique set of cues &mdash; visual, auditory, spatial, social &mdash; that activate particular mental states and behavioural patterns. The library contains cues associated with concentration, quiet work, and academic effort. The home contains cues associated with relaxation, entertainment, and domestic activities. When the electrician enters each environment, the associated mental state and behavioural patterns are automatically activated. The solution is not to avoid studying at home (Option C) but to design a specific area at home that contains study cues: a dedicated desk, study materials visible and ready, the chair positioned facing away from the television, and leisure distractions removed. Over time, this area develops its own context-dependent associations with focused study.',
  },
  {
    id: 8,
    question:
      'The &ldquo;compound effect&rdquo; of small daily habits suggests that 20 minutes of study per day for one year totals approximately 120 hours of learning. Over a 10-year career, this compounds to approximately 1,200 hours. According to expertise research, what is the significance of this number?',
    options: [
      'It is too few hours to make any meaningful difference to skill level',
      'It represents roughly half the &ldquo;10,000-hour rule&rdquo; threshold, but even 1,200 hours of deliberate practice produces significant expertise gains in a specific domain',
      'It exactly matches the required CPD hours for maintaining an ECS card over 10 years',
      'It is the minimum number of hours required to qualify as an electrician in the UK',
    ],
    correctAnswer: 1,
    explanation:
      'While Anders Ericsson&rsquo;s research (often simplified as the &ldquo;10,000-hour rule&rdquo; by Malcolm Gladwell) suggests that world-class expertise in complex domains may require approximately 10,000 hours of deliberate practice, Ericsson&rsquo;s own work makes clear that significant expertise gains occur well before that threshold. Research shows that the learning curve is steepest in the early and middle stages &mdash; the first 100, 500, and 1,000 hours of deliberate practice in a specific domain produce substantial improvements in competence. An electrician who studies for 20 minutes per day over 10 years accumulates approximately 1,200 hours of additional learning beyond their day-to-day work. This is a transformative amount of knowledge when applied to a specific area: inspection and testing, design, a particular technology such as EV charging or renewable energy, or business management. The key word is &ldquo;deliberate&rdquo; &mdash; passive reading or unfocused study counts for far less than targeted, effortful practice with feedback. The compound effect demonstrates that small, consistent daily habits produce extraordinary results over time &mdash; far more than sporadic bursts of intensive study.',
  },
];

export default function GSModule3Section4() {
  useSEO({
    title: 'Habit Stacking & Environment Design | Goal Setting & Growth Module 3.4',
    description:
      'James Clear&rsquo;s habit stacking, BJ Fogg&rsquo;s Tiny Habits, environment design principles, keystone habits, the 20-second rule, and the compound effect of small daily habits for electricians.',
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
            <Link to="../gs-module-3">
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
            <Layers className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Habit Stacking &amp; Environment Design
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            James Clear&rsquo;s habit stacking formula, BJ Fogg&rsquo;s anchor moments, environment
            design principles, keystone habits, and the compound effect of small daily habits
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Habit stacking:</strong> &ldquo;After [CURRENT HABIT], I will [NEW
                HABIT]&rdquo; &mdash; James Clear&rsquo;s formula for building new behaviours
              </li>
              <li>
                <strong>Environment design:</strong> Make cues of good habits obvious, remove cues
                of bad habits from your surroundings
              </li>
              <li>
                <strong>20-second rule:</strong> Reduce the friction for desired behaviours by even
                20 seconds to dramatically increase follow-through
              </li>
              <li>
                <strong>Keystone habits:</strong> Single habits that trigger positive changes across
                multiple areas of life
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Removes willpower dependency:</strong> Habit stacks and environment design
                automate good behaviour without relying on motivation
              </li>
              <li>
                <strong>Trade-specific application:</strong> Your van, workshop, and home office can
                be designed to make professional habits automatic
              </li>
              <li>
                <strong>Compound effect:</strong> 20 minutes of daily improvement compounds to over
                1,200 hours across a decade
              </li>
              <li>
                <strong>Consistency over intensity:</strong> Small daily habits outperform
                occasional bursts of effort every time
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Explain James Clear&rsquo;s habit stacking formula and design effective stacks for trade-specific routines',
              'Describe BJ Fogg&rsquo;s Tiny Habits method and the role of anchor moments in behaviour change',
              'Apply Shawn Achor&rsquo;s 20-second rule to reduce activation energy for desired professional behaviours',
              'Identify and cultivate keystone habits that trigger positive cascading changes across multiple life domains',
              'Design your physical and digital environments to support productive habits and eliminate friction',
              'Calculate the compound effect of small daily habits over 1, 5, and 10 years to understand long-term impact',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: James Clear's Habit Stacking Formula */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            James Clear&rsquo;s Habit Stacking Formula
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In Atomic Habits (2018), James Clear introduced the concept of{' '}
                <strong>habit stacking</strong> as one of the most reliable strategies for building
                new habits. The formula is deceptively simple:{' '}
                <strong>&ldquo;After [CURRENT HABIT], I will [NEW HABIT].&rdquo;</strong> This
                single sentence leverages a powerful psychological mechanism: by linking a new
                behaviour to an existing one, you use the neural pathways that already fire
                automatically as a trigger for the behaviour you want to develop. You are not
                creating a cue from scratch &mdash; you are hijacking one that your brain already
                processes without conscious effort.
              </p>

              <p>
                The concept builds on research into <strong>implementation intentions</strong>,
                pioneered by psychologist Peter Gollwitzer at New York University.
                Gollwitzer&rsquo;s studies found that people who specify when and where they will
                perform a new behaviour are significantly more likely to follow through than those
                who simply intend to do it. A meta-analysis of 94 studies found that implementation
                intentions had a medium-to-large effect on goal attainment across a wide range of
                domains. Clear&rsquo;s innovation was to replace the &ldquo;when and where&rdquo;
                with an existing habit, making the cue even more reliable because it is already a
                deeply embedded behaviour pattern.
              </p>

              <p>
                The reason habit stacking works so well is rooted in neuroscience. When you perform
                an action repeatedly, the neurons involved in that action form strong synaptic
                connections. Over time, these connections become so efficient that the behaviour
                becomes automatic &mdash; you do it without thinking. This is why you can drive a
                familiar route while holding a conversation, or make a cup of tea without
                consciously planning each step. Each completed action sends a{' '}
                <strong>completion signal</strong> &mdash; a neurological &ldquo;done&rdquo; marker
                that your brain registers. Habit stacking uses this completion signal as the trigger
                for the next behaviour, creating a chain of actions that flows naturally from one to
                the next.
              </p>

              <p>
                The key to effective habit stacking is choosing the right anchor. The existing habit
                must be:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Highly consistent:</strong> You do it every day (or every workday)
                    without fail. Brushing your teeth, making coffee, parking the van, locking up at
                    the end of the day &mdash; these are reliable anchors because they happen
                    automatically.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Specific and observable:</strong> &ldquo;After I pour my first cup of
                    coffee&rdquo; is specific. &ldquo;After I wake up&rdquo; is too vague because
                    there is no clear moment of completion &mdash; you might lie in bed for five
                    minutes or rush to the bathroom.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Contextually appropriate:</strong> The anchor and the new habit should
                    belong in the same context. &ldquo;After parking the van, I will review
                    today&rsquo;s schedule&rdquo; works because both relate to the start-of-job
                    context. &ldquo;After parking the van, I will meditate for ten minutes&rdquo; is
                    contextually mismatched and unlikely to stick.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Matched in frequency:</strong> If you want to build a daily habit,
                    attach it to a daily anchor. If you want a weekly habit, attach it to a weekly
                    anchor (such as &ldquo;After I finish my last job on Friday&rdquo;).
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Habit Stacking Formula in Practice
                </p>
                <p className="text-base text-white leading-relaxed">
                  <strong>Formula:</strong> &ldquo;After [CURRENT HABIT], I will [NEW HABIT].&rdquo;
                </p>
                <p className="text-base text-white leading-relaxed mt-2">
                  <strong>Example 1:</strong> &ldquo;After I pour my morning coffee, I will open my
                  job scheduling app and review today&rsquo;s appointments.&rdquo;
                </p>
                <p className="text-base text-white leading-relaxed mt-1">
                  <strong>Example 2:</strong> &ldquo;After I lock the van at the end of the day, I
                  will spend two minutes updating my job records for that day.&rdquo;
                </p>
                <p className="text-base text-white leading-relaxed mt-1">
                  <strong>Example 3:</strong> &ldquo;After I complete a test on an installation, I
                  will immediately photograph the results and begin the certificate.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: BJ Fogg's Anchor Moments */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            BJ Fogg&rsquo;s Anchor Moments &amp; Tiny Habits
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                BJ Fogg, founder of the Behaviour Design Lab at Stanford University, developed the{' '}
                <strong>Tiny Habits</strong> method through decades of research into human behaviour
                change. His approach complements James Clear&rsquo;s habit stacking by adding a
                critical insight: the new habit must start <strong>tiny</strong> &mdash; so small
                that it requires almost no motivation, willpower, or time. Fogg defines a tiny habit
                as a behaviour that takes less than 30 seconds and can be done even on your worst
                day, when you are exhausted, stressed, or unmotivated.
              </p>

              <p>
                Fogg&rsquo;s <strong>Behaviour Model</strong> states that behaviour occurs when
                three elements converge simultaneously: <strong>Motivation</strong> (your desire to
                do the behaviour), <strong>Ability</strong> (how easy the behaviour is to perform),
                and a <strong>Prompt</strong> (a cue that triggers the behaviour). The formula is{' '}
                <strong>B = MAP</strong>. When motivation is low (which it often is after a long day
                on site), the behaviour must be extremely easy (high ability) and the prompt must be
                reliable and automatic. This is where anchor moments come in.
              </p>

              <p>
                An <strong>anchor moment</strong> is an existing behaviour that is already firmly
                established in your routine and serves as the prompt for the new tiny habit. Fogg
                uses the phrase &ldquo;After I [ANCHOR], I will [TINY HABIT]&rdquo; &mdash; the same
                structure as Clear&rsquo;s habit stacking, but with the explicit instruction to make
                the new behaviour as small as possible. The reasoning is neurological: tiny
                behaviours are easy to start, and starting is the hardest part. Once you start, you
                often continue naturally. But even if you only do the tiny version, the habit is
                being encoded in your brain through repetition.
              </p>

              <p>
                A critical element of Fogg&rsquo;s method that is often overlooked is the{' '}
                <strong>celebration</strong>. Immediately after performing the tiny habit, you
                create a brief moment of positive emotion &mdash; a mental &ldquo;Yes!&rdquo;, a
                fist pump, a smile, or whatever genuine positive feeling you can generate. This is
                not motivational fluff; it is neurologically essential. Positive emotion triggers
                the release of dopamine, which strengthens the neural pathway associated with the
                behaviour, making it more likely to be repeated. Fogg calls this &ldquo;Shine&rdquo;
                &mdash; the feeling of success that wires the habit into your brain.
              </p>

              <p>
                For electricians and tradespeople, anchor moments are abundant in the workday
                because trade work is highly structured and repetitive. You always park the van. You
                always put on PPE. You always unpack tools. You always complete testing. You always
                lock up. Each of these is a potential anchor for a new productive habit.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Tiny Habit Examples for Electricians
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>After I put on my PPE</strong>, I will take one photograph of the
                      existing installation (tiny version of a full photo documentation habit)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>After I sit down for dinner</strong>, I will open my study book to the
                      bookmarked page (tiny version of a 20-minute study session)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>After I complete a test</strong>, I will open the certification app on
                      my tablet (tiny version of completing the certificate immediately)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>After I lock the van at the end of the day</strong>, I will write one
                      sentence about what I learned today (tiny version of a reflective journal)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Complete Trade Day Habit Stack Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Complete Trade Day Habit Stack Examples
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The real power of habit stacking becomes apparent when you design complete sequences
                for the natural phases of your working day. Each phase &mdash; morning, arrival on
                site, end of job, and evening &mdash; has its own set of existing anchors that can
                support new professional habits. The following examples demonstrate how to build
                comprehensive habit stacks for a typical electrician&rsquo;s day. Remember: build
                these incrementally, adding one new link at a time, not all at once.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg mb-4">
                <p className="text-sm font-medium text-rose-400 mb-3">Morning Habit Stack</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>After making coffee</strong> &rarr; review today&rsquo;s job schedule
                      on your phone or tablet (2 minutes)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>After reviewing the schedule</strong> &rarr; check the materials list
                      for today&rsquo;s jobs and confirm everything is in the van (3 minutes)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>After checking materials</strong> &rarr; send a brief confirmation
                      message to today&rsquo;s first customer with estimated arrival time (1 minute)
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  <strong>Total added time:</strong> 6 minutes. <strong>Impact:</strong> You arrive
                  prepared, the customer is informed, and you avoid the stress of realising you are
                  missing materials when you are already on site.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-4">
                <p className="text-sm font-medium text-white mb-3">Arriving on Site Habit Stack</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>After parking the van</strong> &rarr; put on your PPE before doing
                      anything else
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>After putting on PPE</strong> &rarr; photograph the existing
                      installation from multiple angles before touching anything
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>After photographing</strong> &rarr; brief the customer on what you
                      will be doing today, what areas you need access to, and what disruption to
                      expect
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  <strong>Total added time:</strong> 5 minutes. <strong>Impact:</strong> You have
                  photographic evidence of the pre-existing condition (protecting you from
                  disputes), the customer knows what to expect (reducing interruptions), and you are
                  properly protected from the moment you step out of the van.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg mb-4">
                <p className="text-sm font-medium text-rose-400 mb-3">End of Job Habit Stack</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>After completing final testing</strong> &rarr; begin filling in the
                      certificate or minor works notice immediately while the test results are in
                      front of you
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>After completing the certificate</strong> &rarr; photograph the
                      finished installation from the same angles as the &ldquo;before&rdquo; photos
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>After photographing</strong> &rarr; update your job records (time
                      spent, materials used, any observations or follow-up needed)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>After updating records</strong> &rarr; walk the customer through the
                      work, show them the certificate, and answer any questions
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  <strong>Total added time:</strong> 10&ndash;15 minutes. <strong>Impact:</strong>{' '}
                  Certificates are completed on the day (not weeks later), you have comprehensive
                  photographic records, your admin is up to date, and the customer feels informed
                  and valued &mdash; leading to reviews, recommendations, and repeat business.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Evening Habit Stack</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>After finishing dinner</strong> &rarr; sit down at your study space
                      and open your study materials (already laid out from the previous evening)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>After 20 minutes of study</strong> &rarr; review tomorrow&rsquo;s
                      schedule and make a brief plan for the next day
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>After reviewing tomorrow&rsquo;s schedule</strong> &rarr; lay out your
                      study materials for the next evening (reducing friction for the following day)
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  <strong>Total added time:</strong> 25&ndash;30 minutes. <strong>Impact:</strong>{' '}
                  You accumulate 120+ hours of study per year, you are always prepared for
                  tomorrow&rsquo;s work, and the act of preparing study materials the night before
                  reduces the friction for studying the next evening &mdash; creating a
                  self-reinforcing cycle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Environment Design Principles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Environment Design Principles
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In Chapter 6 of Atomic Habits, James Clear makes a powerful argument: the most
                effective way to change your behaviour is not to change yourself but to change your
                environment. He writes: &ldquo;People often choose products not because of what they
                are, but because of where they are.&rdquo; The same principle applies to habits.
                People do not make choices in a vacuum &mdash; they make choices within an
                environment that contains cues, triggers, and default options that strongly
                influence behaviour.
              </p>

              <p>
                Clear identifies two fundamental environment design principles for building good
                habits:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    <strong>Make cues of good habits obvious in your environment.</strong> If you
                    want to study, leave your textbook open on the table. If you want to drink more
                    water, keep a water bottle visible on your dashboard. If you want to photograph
                    installations, keep your phone camera on the home screen with a shortcut. The
                    more visible the cue, the more likely you are to act on it.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                  <span>
                    <strong>Remove cues of bad habits from your environment.</strong> If you want to
                    stop scrolling social media during study time, remove the apps from your home
                    screen or use an app blocker. If you want to stop eating unhealthy snacks in the
                    van, stop buying them. If you want to stop procrastinating on certificates, set
                    up your certification app to open automatically after testing. Out of sight, out
                    of mind &mdash; and out of environment, out of behaviour.
                  </span>
                </li>
              </ul>

              <p>
                The power of environment design lies in the fact that it works{' '}
                <strong>without willpower</strong>. You do not need motivation, discipline, or
                self-control when your environment makes the desired behaviour the easiest option
                and the undesired behaviour the hardest option. Research by Wendy Wood at the
                University of Southern California found that approximately 43% of daily behaviours
                are performed habitually &mdash; automatically, in response to environmental cues
                rather than conscious decisions. By redesigning your environment, you are
                reprogramming these automatic behaviours.
              </p>

              <p>
                For electricians, environment design applies to three key spaces:{' '}
                <strong>your van</strong> (your mobile workshop and the environment you spend the
                most time in), <strong>your home office or study space</strong> (where professional
                development and admin happen), and <strong>your digital environment</strong> (phone,
                tablet, and laptop).
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg mb-4">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Designing Your Van for Success
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Keep PPE in a highly visible, easy-to-access spot near the rear doors so it is
                      the first thing you see when you open the van
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Store testing instruments in a dedicated case at the front of the van &mdash;
                      never buried under other equipment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Place a laminated daily checklist on the dashboard: PPE &rarr; photos &rarr;
                      brief customer &rarr; work &rarr; test &rarr; certify &rarr; photos &rarr;
                      update records
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Keep your certification tablet or phone mount in the cab with the app ready to
                      go &mdash; reducing the friction for immediate certificate completion
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Use labelled racking and organisation systems so every tool has a designated
                      home &mdash; this reduces setup time and eliminates the frustration of
                      searching for items
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Designing Your Home Study Space for Success
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Designate a specific area &mdash; even a corner of a room &mdash; as your
                      study space. Over time, your brain will associate this space with focused work
                      (context-dependent behaviour).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Leave your study materials open on the desk at the end of each session so they
                      are ready for the next day (applying the 20-second rule)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Position the study space facing away from the television and other
                      distractions &mdash; remove cues for leisure behaviours from your field of
                      vision
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Keep a glass of water, a notebook, and a pen at the study space permanently
                      &mdash; every item that is already in place is one less excuse to delay
                      starting
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: The 20-Second Rule */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            The 20-Second Rule in Practice
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Shawn Achor, positive psychology researcher and author of The Happiness Advantage
                (2010), discovered a remarkably simple principle that has profound implications for
                habit formation: the <strong>20-second rule</strong>. Through his research at
                Harvard University and subsequent consulting work, Achor found that reducing the
                activation energy required to start a desired behaviour by as little as 20 seconds
                dramatically increased the likelihood of performing that behaviour consistently. The
                reverse is also true: adding just 20 seconds of friction to an undesired behaviour
                dramatically decreases the likelihood of performing it.
              </p>

              <p>
                The term &ldquo;activation energy&rdquo; comes from chemistry, where it refers to
                the minimum energy required to start a chemical reaction. Achor applies it to human
                behaviour: every action has an activation energy &mdash; the effort required to
                initiate it. For behaviours we want to perform (studying, exercising, completing
                certificates promptly), we should reduce the activation energy as much as possible.
                For behaviours we want to avoid (scrolling social media, procrastinating on admin,
                eating unhealthy food), we should increase the activation energy.
              </p>

              <p>
                Achor famously demonstrated this in his own life. He wanted to practise guitar every
                day but kept failing because the guitar was stored in a cupboard in the next room.
                Each evening, the 20-second walk to the cupboard, retrieving the guitar, and
                returning to his chair was just enough friction for his brain to choose the
                television instead. His solution: he placed the guitar on a stand in the middle of
                his living room, directly in front of his usual seat. The guitar was now within
                arm&rsquo;s reach &mdash; zero activation energy. He practised consistently for the
                next 21 days and beyond. Conversely, he wanted to watch less television, so he
                removed the batteries from the remote and placed them in a drawer in another room.
                The 20-second walk to get the batteries was enough friction to break the automatic
                habit of switching on the television.
              </p>

              <p>
                For electricians and tradespeople, the 20-second rule has immediate practical
                applications:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Want to complete certificates on the day?</strong> Keep the
                    certification app open on a tablet mounted in your van cab. Pre-load the
                    customer details from your job booking. The moment you finish testing, the
                    certificate is ready to fill in with zero setup time.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Want to photograph every installation?</strong> Set your phone camera to
                    be accessible from the lock screen with a single swipe. Create a dedicated
                    &ldquo;Site Photos&rdquo; album. The fewer taps between you and the photo, the
                    more likely you are to take it.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Want to study for 20 minutes each evening?</strong> Leave your study
                    materials open on the table with a bookmark at the exact page where you left
                    off. The pen should be on the notebook. The chair should be pulled out. Every
                    barrier you remove increases the probability of starting.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Want to stop scrolling social media?</strong> Move social media apps to
                    the third page of your phone, inside a folder. Better yet, log out of them so
                    each access requires typing a password. Add 20 seconds of friction and the
                    automatic reach for the app loses its power.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Want to exercise before work?</strong> Pack your gym bag the night
                    before and place it by the front door. Lay out your workout clothes on the chair
                    next to your bed. The path from bed to gym should be frictionless.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Core Principle</p>
                <p className="text-base text-white leading-relaxed">
                  Willpower is a limited, unreliable resource &mdash; especially at the end of a
                  physically demanding workday. The 20-second rule works because it bypasses
                  willpower entirely. Instead of relying on motivation to start a behaviour, you
                  redesign your environment so that the desired behaviour requires the least effort
                  and the undesired behaviour requires the most. Your future self does not need to
                  be more disciplined &mdash; they just need a better-designed environment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Visual Cues and Reminders */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Visual Cues &amp; Reminders
          </h2>
          <div className="border-l-2 border-orange-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Visual cues are among the most powerful environmental triggers for habit
                maintenance. The human visual system is remarkably efficient at detecting and
                processing visual information, and the brain is wired to respond to things it can
                see far more reliably than things it has to remember. This is why the phrase
                &ldquo;out of sight, out of mind&rdquo; is not just a saying &mdash; it is a
                neurological fact. Objects and information that are visually prominent in your
                environment act as automatic prompts for associated behaviours.
              </p>

              <p>
                For electricians and tradespeople, visual cues can be strategically placed across
                your working and living environments to support professional habits:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Wall calendars with habit tracking:</strong> A physical calendar on the
                    wall (kitchen, workshop, or home office) where you mark each day you complete a
                    key habit (studying, exercising, completing certificates on time). Jerry
                    Seinfeld famously used this method &mdash; he called it &ldquo;don&rsquo;t break
                    the chain&rdquo;. The visual chain of marked days creates motivation to maintain
                    the streak.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Laminated checklists:</strong> A checklist on the van dashboard, on the
                    inside of a toolbox lid, or on the wall of your workshop. Each time you glance
                    at it, it prompts the associated behaviours. Over time, the checklist becomes
                    unnecessary because the habits have been internalised &mdash; but it serves as a
                    safety net against the &ldquo;I forgot&rdquo; failure mode.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Tool and equipment labels:</strong> Labelling storage locations, cable
                    drums, and test equipment bags ensures everything returns to its correct
                    location and reduces setup time on every job. Labels are visual cues for
                    organisational habits.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Phone wallpaper:</strong> Set your phone lock screen to display your
                    current goal, a motivational reminder, or a visual representation of your
                    progress. Every time you unlock your phone (which research suggests averages
                    80&ndash;100 times per day), you see the cue. Some electricians use their phone
                    wallpaper to display their current study target, their annual income goal, or a
                    simple reminder like &ldquo;20 minutes of study tonight&rdquo;.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Progress boards:</strong> A whiteboard or corkboard in your home office
                    displaying your qualifications roadmap, current course progress, upcoming exam
                    dates, and career goals. Seeing your progress and your targets daily keeps them
                    at the front of your mind.
                  </span>
                </li>
              </ul>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  The Science Behind Visual Cues
                </p>
                <p className="text-sm text-white leading-relaxed">
                  Research on environmental priming shows that visual cues in your surroundings
                  activate associated mental concepts without conscious awareness. A study by Bargh,
                  Chen, and Burrows (1996) demonstrated that subtle environmental cues significantly
                  influenced behaviour even when participants were unaware of the cues. For habit
                  formation, this means that strategically placed visual reminders do not just
                  remind you consciously &mdash; they prime your brain to activate the mental
                  patterns associated with the desired behaviour, making it more likely to occur
                  even when you are not deliberately thinking about it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 07: Keystone Habits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">07</span>
            Keystone Habits &mdash; One Habit That Changes Everything
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In The Power of Habit (2012), Charles Duhigg introduced the concept of{' '}
                <strong>keystone habits</strong> &mdash; habits that, when established, trigger a
                cascade of positive changes across multiple areas of life. A keystone habit is not
                necessarily the most important habit, but it is the one that creates the conditions
                for other good habits to flourish. Duhigg draws the analogy from architecture: a
                keystone is the central stone at the top of an arch that holds all the other stones
                in place. Remove the keystone and the entire structure collapses. Establish the
                keystone and the structure supports itself.
              </p>

              <p>
                Research has identified several habits that consistently function as keystones
                across populations. For tradespeople and electricians, three keystone habits are
                particularly powerful:
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg mb-4">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Keystone Habit 1: Regular Physical Exercise
                </p>
                <p className="text-base text-white leading-relaxed">
                  Exercise is the most extensively researched keystone habit. Studies consistently
                  show that when people start exercising regularly, they also: sleep better, eat
                  more healthily, have more energy, experience improved mood and reduced anxiety,
                  concentrate more effectively, make better financial decisions, and are more
                  productive at work. For tradespeople who do physically demanding work, regular
                  exercise (particularly strength training and stretching) also reduces injury risk,
                  improves recovery, extends career longevity, and reduces the chronic pain that
                  forces many electricians out of hands-on work in their 40s and 50s. The cascading
                  effects of exercise on energy, mood, and cognitive function make it the single
                  most impactful habit a tradesperson can establish.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-4">
                <p className="text-sm font-medium text-white mb-2">
                  Keystone Habit 2: A Structured Morning Routine
                </p>
                <p className="text-base text-white leading-relaxed">
                  A consistent morning routine sets the tone for the entire day. Research by Hal
                  Elrod (The Miracle Morning) and others shows that people who start their day with
                  a structured sequence of intentional behaviours &mdash; rather than reactive
                  scrolling, rushing, and chaos &mdash; experience greater focus, productivity, and
                  emotional resilience throughout the day. For electricians, a morning routine might
                  include: waking at a consistent time, brief exercise or stretching, a proper
                  breakfast, reviewing the day&rsquo;s schedule, checking materials, and mentally
                  preparing for the day. The routine does not need to be long or elaborate &mdash;
                  even 20 minutes of structured activity before leaving for work creates a sense of
                  control and intentionality that carries through the working day. The key is
                  consistency: the routine becomes automatic, freeing mental energy for the
                  decisions and challenges that matter.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Keystone Habit 3: Weekly Planning
                </p>
                <p className="text-base text-white leading-relaxed">
                  Spending 15&ndash;30 minutes at the end of each week reviewing the past week and
                  planning the next one is a keystone habit that improves time management, financial
                  awareness, professional development, and stress reduction. During the weekly
                  review, you assess: What jobs did I complete? What went well? What could have gone
                  better? What do I need to follow up on? What are my priorities for next week? Am I
                  on track with my study goals, my fitness goals, my financial targets? Stephen
                  Covey (The 7 Habits of Highly Effective People) identified weekly planning as the
                  optimal planning horizon &mdash; daily planning is too reactive, monthly planning
                  is too distant. A weekly review creates awareness of where your time and energy
                  are actually going, which naturally leads to better decisions about where they
                  should go.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 08: Context-Dependent Habits */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">08</span>
            Context-Dependent Habits &amp; Workspace Design
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most powerful findings in behavioural psychology is that habits are not
                just linked to time or intention &mdash; they are linked to <strong>context</strong>
                . The environment you are in activates specific mental models, emotional states, and
                behavioural patterns. This is why you feel focused in a library, relaxed on a sofa,
                and alert on a busy construction site. Each environment contains a unique set of
                cues that your brain has learned to associate with particular behaviours.
              </p>

              <p>
                This principle was first demonstrated in research by Godden and Baddeley (1975), who
                found that scuba divers who learned information underwater recalled it better
                underwater, while information learned on land was recalled better on land. The
                principle extends far beyond memory to encompass mood, motivation, and habitual
                behaviour. Wendy Wood&rsquo;s research at USC found that when people change their
                environment (moving house, starting a new job, travelling), their habits are
                disrupted because the cues that triggered those habits are no longer present. This
                is both a challenge (good habits can be lost during transitions) and an opportunity
                (bad habits can be broken by changing environments).
              </p>

              <p>
                For electricians, context-dependent behaviour has direct implications for
                productivity and professional development. If you always watch television on the
                sofa in the evening, the sofa has become a cue for passive entertainment &mdash;
                trying to study on that same sofa is fighting against the deeply encoded
                association. The solution is to create a separate context for study: a different
                chair, a different location, a different set of environmental cues. Over time, that
                new context develops its own associations with focused, productive work.
              </p>

              <p>
                The concept of &ldquo;one space, one use&rdquo; is a practical application of this
                principle. As much as possible, designate specific spaces for specific activities:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Study desk:</strong> Used only for studying and professional
                    development. Not for browsing the internet, watching videos, or managing
                    personal admin. When you sit at this desk, your brain should automatically shift
                    into study mode.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Van cab:</strong> The space where you handle job-related admin
                    (scheduling, customer communications, certificate completion). The van cab
                    should be set up with the tools and devices you need for this work.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Sofa or living room:</strong> For relaxation and leisure. Do not try to
                    study here. Do not feel guilty about relaxing here. This space has a purpose,
                    and that purpose is recovery.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong>Bed:</strong> For sleep only. Research on sleep hygiene consistently
                    shows that using the bed for work, study, or screen time weakens the
                    brain&rsquo;s association between bed and sleep, leading to poorer sleep
                    quality.
                  </span>
                </li>
              </ul>

              <p>
                When you respect the &ldquo;one space, one use&rdquo; principle, transitions between
                activities become easier because the environment itself signals the expected
                behaviour. Moving from the sofa to the study desk is a physical cue that activates
                your &ldquo;study mode&rdquo; neural patterns. Over time, simply sitting at the
                study desk will trigger the focused, productive mental state &mdash; the environment
                does the work that willpower once had to do.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Designing Your Workspace for Professional Growth
                </p>
                <p className="text-sm text-white leading-relaxed">
                  Your workspace &mdash; whether it is a corner of the kitchen, a spare bedroom, or
                  a garden office &mdash; should be designed with intention. Remove everything that
                  does not support focused work: no television in view, no unrelated clutter, no
                  gaming consoles within arm&rsquo;s reach. Add everything that supports your
                  professional goals: your current study materials, your qualifications roadmap, a
                  whiteboard for planning, reference books (BS 7671, GN3, OSG), and a comfortable
                  chair that encourages alert posture rather than lounging. The investment in
                  creating a dedicated workspace pays for itself many times over through improved
                  focus, faster learning, and consistent professional development.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 09: Digital Environment Design */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">09</span>
            Digital Environment Design
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Your digital environment &mdash; your phone, tablet, and laptop &mdash; is now as
                influential as your physical environment, if not more so. The average person in the
                UK spends over 3 hours per day on their smartphone, and much of that time is driven
                by environmental cues: app notifications, home screen arrangement, and default
                settings that are designed by technology companies to capture your attention. If you
                do not intentionally design your digital environment, it will be designed for you
                &mdash; by companies whose goal is to maximise the time you spend on their
                platforms, not to support your professional development.
              </p>

              <p>
                Applying environment design principles to your digital life involves the same two
                strategies: make cues for desired digital behaviours obvious, and remove cues for
                undesired digital behaviours.
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    <strong>Phone home screen:</strong> Place your most productive apps on the home
                    screen &mdash; your scheduling app, your certification app, your study app, your
                    calculator. Move social media, news, and entertainment apps to the second or
                    third page, or inside folders. The home screen is the digital equivalent of
                    &ldquo;what you see when you walk in the room&rdquo;.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    <strong>Notification management:</strong> Turn off all non-essential
                    notifications. Every notification is an interruption that pulls your attention
                    away from what you are doing. Keep notifications on for messages from customers,
                    your boss, and your family. Turn them off for social media, news, games, and
                    promotional emails. Research shows that a single notification can disrupt focus
                    for up to 23 minutes (Gloria Mark, University of California, Irvine).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    <strong>App arrangement by purpose:</strong> Group your apps into categories:
                    Work (scheduling, certificates, calculations, customer management), Learning
                    (study apps, regulation references, training videos), and Leisure (social media,
                    games, entertainment). This makes it conscious when you are shifting from a
                    productive app to a leisure app.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    <strong>Screen time and app limits:</strong> Use your phone&rsquo;s built-in
                    screen time tools (iOS Screen Time or Android Digital Wellbeing) to set daily
                    limits on social media and entertainment apps. When you hit the limit, the app
                    locks &mdash; adding friction to continued use. Most people are shocked when
                    they first check their screen time data.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    <strong>Do Not Disturb schedules:</strong> Set your phone to Do Not Disturb
                    during study time and during the first and last 30 minutes of your workday. This
                    creates a distraction-free zone that supports focused work.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                  <span>
                    <strong>Email batching:</strong> Check email at set times (e.g., morning,
                    lunchtime, end of day) rather than continuously. Turn off email push
                    notifications. Most emails do not require an immediate response, and constant
                    email checking fragments your attention.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Attention Economy and Your Career
                </p>
                <p className="text-base text-white leading-relaxed">
                  Technology companies employ thousands of engineers and psychologists specifically
                  to make their products as addictive as possible. Social media feeds, notification
                  systems, and algorithmic recommendations are all designed to capture and hold your
                  attention. Every hour you spend scrolling is an hour not spent studying, building
                  your business, developing a new skill, or resting. Designing your digital
                  environment is not about rejecting technology &mdash; it is about being
                  intentional about which technology serves your goals and which technology serves
                  someone else&rsquo;s. An electrician who reclaims even one hour per day from
                  unproductive screen time gains 365 hours per year &mdash; the equivalent of more
                  than 9 working weeks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: The Compound Effect */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">10</span>
            The Compound Effect of Small Daily Habits
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most powerful ideas in James Clear&rsquo;s Atomic Habits is the concept
                of <strong>compound growth applied to habits</strong>. Clear argues that if you can
                get just 1% better at something each day, the compound effect over a year is
                extraordinary: 1.01 raised to the power of 365 equals 37.78. You are not just 365%
                better &mdash; you are nearly 38 times better. Conversely, if you get 1% worse each
                day (through neglect, complacency, or bad habits), 0.99 raised to the power of 365
                equals 0.03 &mdash; you decline to nearly zero. The maths makes the case powerfully:
                small daily improvements compound into massive long-term results, and small daily
                deteriorations compound into significant decline.
              </p>

              <p>
                This is not just theoretical. Consider the concrete numbers for an electrician who
                commits to 20 minutes of professional development per day:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg mb-4">
                <p className="text-sm font-medium text-white mb-3">
                  The Compound Effect: 20 Minutes Per Day
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>1 month:</strong> 10 hours of study &mdash; enough to complete a short
                      online CPD course or work through a significant section of BS 7671
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>6 months:</strong> 60 hours &mdash; enough to thoroughly study for and
                      pass the 2391 Inspection &amp; Testing qualification
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>1 year:</strong> 120 hours &mdash; equivalent to 15 full working days
                      of concentrated study. That is enough to add a major qualification or develop
                      a new specialisation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>5 years:</strong> 600 hours &mdash; equivalent to 75 working days. A
                      tradesperson with 600 hours of deliberate study has developed deep expertise
                      in their chosen area.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>10 years:</strong> 1,200 hours &mdash; equivalent to 150 working days
                      or more than 7 full months of concentrated learning. This is a
                      career-transforming amount of knowledge, accumulated 20 minutes at a time.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The compound effect also applies to other habits. An electrician who photographs
                every installation accumulates thousands of reference images over a career. An
                electrician who completes certificates on the day never has a backlog and builds a
                reputation for professionalism. An electrician who does a 10-minute weekly review
                develops strategic clarity that most competitors lack. An electrician who exercises
                regularly maintains physical capability and avoids the injuries and chronic pain
                that end many trade careers prematurely.
              </p>

              <p>
                The critical insight is that the compound effect is{' '}
                <strong>invisible in the short term</strong>. On any given day, 20 minutes of study
                seems insignificant. Skipping it seems harmless. The difference between doing it and
                not doing it is invisible today, this week, or even this month. But over years, the
                gap between the electrician who does it consistently and the one who does not
                becomes vast &mdash; in knowledge, qualifications, earning potential, career
                options, and professional reputation. This is what James Clear calls the
                &ldquo;valley of disappointment&rdquo; &mdash; the period where you are putting in
                effort but cannot yet see results. Most people give up in this valley. Those who
                persist through it experience the exponential growth that compound habits produce.
              </p>

              <p>
                Darren Hardy, author of The Compound Effect (2010), summarises the principle: the
                compound effect is the principle of reaping huge rewards from a series of small,
                smart choices, made consistently over time. It is not sexy. It is not dramatic.
                There is no single moment of transformation. But it is the most reliable path to
                extraordinary results in any domain &mdash; including the electrical trades.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Practical Application: Your Personal Compound Effect Calculator
                </p>
                <p className="text-base text-white leading-relaxed">
                  Choose one small daily habit you want to compound. Calculate what that habit
                  produces over 1, 5, and 10 years. For example: &ldquo;If I save &pound;5 per day
                  from unnecessary spending, that is &pound;1,825 per year, &pound;9,125 over 5
                  years, and &pound;18,250 over 10 years &mdash; without interest.&rdquo; Or:
                  &ldquo;If I read 10 pages of a technical book per day, that is approximately 12
                  books per year, 60 books over 5 years, and 120 books over 10 years &mdash; a level
                  of knowledge that places you in the top fraction of your profession.&rdquo; The
                  compound effect transforms abstract intentions into concrete, measurable outcomes
                  that motivate consistent action.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 11: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">11</span>
            Section Summary &amp; Module 3 Conclusion
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has covered the most practical and immediately applicable strategies in
                the entire Goal Setting &amp; Growth course. Habit stacking, environment design, the
                20-second rule, keystone habits, and the compound effect are not abstract theories
                &mdash; they are tools you can implement today. The key points to carry forward:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Habit stacking</strong> uses the formula &ldquo;After [CURRENT HABIT], I
                    will [NEW HABIT]&rdquo; to attach new behaviours to existing neural pathways,
                    making them far more likely to stick.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>BJ Fogg&rsquo;s Tiny Habits</strong> method starts new behaviours at an
                    extremely small scale (less than 30 seconds) and uses positive emotion
                    (celebration) to wire the habit into the brain.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Environment design</strong> makes cues for good habits obvious and
                    removes cues for bad habits, allowing behaviour change to happen without relying
                    on willpower.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The 20-second rule</strong> shows that reducing friction for desired
                    behaviours by as little as 20 seconds dramatically increases follow-through.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Keystone habits</strong> (exercise, morning routines, weekly planning)
                    trigger positive cascading changes across multiple life domains.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Context-dependent behaviour</strong> means your environment shapes your
                    habits. Designate specific spaces for specific activities to leverage this
                    principle.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The compound effect</strong> of small daily habits produces
                    extraordinary results over time: 20 minutes per day equals 1,200 hours over 10
                    years.
                  </span>
                </li>
              </ul>

              <p className="font-semibold text-white">Module 3 Complete Summary:</p>

              <p>
                This module has provided the complete science and practice of habit formation for
                electricians. You now understand that habits are automatic behaviours governed by
                the habit loop (cue, routine, reward), that it takes an average of 66 days for a
                behaviour to become automatic, and that willpower is unreliable and should be
                replaced by systems design. You know how to apply the Four Laws of Behaviour Change
                (make it obvious, attractive, easy, satisfying) to build good habits and invert them
                (invisible, unattractive, difficult, unsatisfying) to break bad ones.
              </p>

              <p>
                You have specific professional habits for morning routines, tool management, safety,
                admin, CPD, and health. You know how to stack habits into complete daily routines,
                design your environment to support good behaviour, and leverage keystone habits that
                create cascading improvements. Most importantly, you understand that sustainable
                behaviour change is not about motivation or willpower &mdash; it is about designing
                systems that make good behaviours inevitable and bad behaviours difficult.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next Module:</strong> In Module 4, we will shift
                  focus to Tracking Progress &amp; Continuous Improvement. We will explore how to
                  measure habit consistency, track professional development over time, use data to
                  refine your approach, and build systems for continuous improvement that keep your
                  career trajectory moving upwards throughout your working life.
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
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
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
            <Link to="../gs-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../gs-module-4">
              Next Module: Tracking Progress &amp; Continuous Improvement
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
