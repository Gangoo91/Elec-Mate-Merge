import {
  ArrowLeft,
  Crosshair,
  CheckCircle,
  HelpCircle,
  Target,
  Heart,
  AlertTriangle,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'coping-origin',
    question:
      'Who developed the foundational theory of the two fundamental coping strategies (problem-focused and emotion-focused)?',
    options: [
      'Aaron Beck (1976)',
      'Daniel Goleman (1995)',
      'Richard Lazarus and Susan Folkman (1984)',
      'Jon Kabat-Zinn (1990)',
    ],
    correctIndex: 2,
    explanation:
      'Richard Lazarus and Susan Folkman published their foundational theory of stress and coping in 1984 in their book Stress, Appraisal, and Coping. They proposed that people respond to stress through two fundamental categories of coping: problem-focused coping (taking direct action to address the source of stress) and emotion-focused coping (managing the emotional response to stress). Their model remains one of the most influential frameworks in stress psychology.',
  },
  {
    id: 'when-to-use',
    question: 'According to Lazarus and Folkman, when is problem-focused coping most appropriate?',
    options: [
      'When the situation is entirely outside your control',
      'When the situation is controllable — you can take direct action to change it',
      'When you are feeling strong emotions',
      'When other people are involved in the problem',
    ],
    correctIndex: 1,
    explanation:
      'Problem-focused coping is most appropriate when the source of stress is controllable — when you can take practical, direct action to change or improve the situation. If you are overloaded with work, you can take action: hire a mate, decline a job, improve your scheduling, or delegate tasks. These are all problem-focused strategies because they address the source of the stress directly. When the situation is uncontrollable, emotion-focused coping is more appropriate because there is no direct action that can change the situation.',
  },
  {
    id: 'avoidant-coping',
    question: 'Which of the following is an example of avoidant coping?',
    options: [
      'Speaking to a colleague about a stressful situation for support',
      'Creating a detailed plan to manage a heavy workload',
      'Drinking heavily after work to avoid thinking about job stress',
      'Reframing a setback as a learning opportunity',
    ],
    correctIndex: 2,
    explanation:
      'Drinking heavily to avoid thinking about stress is a classic example of avoidant coping — using a behaviour to escape from or numb the emotional response to stress rather than addressing either the source of stress (problem-focused) or the emotional response itself (emotion-focused). Avoidant coping provides temporary relief but always makes the underlying problem worse. Other examples include denial, withdrawal from relationships, overwork as distraction, excessive social media use, and substance misuse.',
  },
];

const faqs = [
  {
    question: 'What if I am not sure whether a situation is controllable or not?',
    answer:
      'This is a very common challenge, and the answer is to break the situation down into its component parts. Most stressful situations have both controllable and uncontrollable elements. For example, a cancelled contract is uncontrollable (you cannot force the client to reinstate it), but your response to it contains many controllable elements: you can update your schedule, contact other clients, adjust your finances, and plan your next steps. The strategy is to apply problem-focused coping to the controllable elements and emotion-focused coping to the uncontrollable ones. Ask yourself: "What aspects of this can I influence or change, and what aspects are genuinely outside my control?" Then match your coping strategy accordingly.',
  },
  {
    question: 'Is emotion-focused coping a sign of weakness?',
    answer:
      'Absolutely not. Emotion-focused coping is not about being weak or passive — it is about being strategic. When you cannot change the situation (the contract is cancelled, the weather has stopped work, the regulation has changed), spending energy on problem-focused strategies that cannot work is itself a waste. Emotion-focused coping in these situations — accepting reality, reframing the situation, seeking social support, practising relaxation — is the intelligent, efficient response. It preserves your energy and mental health for the things you can actually influence. Research by Lazarus and Folkman showed that people who flexibly match their coping strategy to the controllability of the situation have better mental health outcomes than those who rigidly apply the same strategy to every problem.',
  },
  {
    question: 'How do I stop myself from falling into avoidant coping patterns?',
    answer:
      'Awareness is the first and most important step. Most avoidant coping happens automatically — you reach for the drink, scroll through your phone, or throw yourself into overwork without consciously deciding to do so. Once you become aware that a behaviour is serving as avoidance rather than genuine coping, you have a choice point. Ask yourself: "Am I doing this because it helps, or because it numbs?" If the answer is numbing, pause and choose a genuine coping strategy instead. Problem-focused if the situation is controllable (make a plan, take action); emotion-focused if it is not (talk to someone, practise a breathing technique, reframe). Over time, this conscious pause becomes habitual, and the automatic pull towards avoidance weakens.',
  },
  {
    question: 'Can I use both problem-focused and emotion-focused coping for the same situation?',
    answer:
      'Yes, and this is often the most effective approach. Most real-world stressful situations benefit from both. For example, if you are overloaded with work (a controllable stressor), you might use problem-focused coping to address the practical issue (rearrange your schedule, decline a job, hire a mate) while simultaneously using emotion-focused coping to manage the anxiety and exhaustion that have already built up (practise mindfulness, talk to a partner, do a breathing exercise before sleep). The two strategies are not alternatives — they are complementary tools that address different aspects of the same stressful experience.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'According to Lazarus and Folkman (1984), what are the two fundamental categories of coping?',
    options: [
      'Active coping and passive coping',
      'Problem-focused coping and emotion-focused coping',
      'Cognitive coping and behavioural coping',
      'Individual coping and social coping',
    ],
    correctAnswer: 1,
    explanation:
      'Lazarus and Folkman identified two fundamental categories: problem-focused coping (taking direct action to address the source of stress) and emotion-focused coping (managing the emotional response to stress). While subsequent researchers have identified additional categories and sub-types, these two remain the foundational framework for understanding how people respond to stress.',
  },
  {
    id: 2,
    question: 'Which of the following is an example of problem-focused coping?',
    options: [
      'Accepting that a cancelled contract cannot be reversed',
      'Practising box breathing to manage anxiety',
      'Creating a detailed schedule to manage a heavy workload',
      'Talking to a friend about your feelings after a stressful day',
    ],
    correctAnswer: 2,
    explanation:
      'Creating a detailed schedule to manage a heavy workload is problem-focused coping because it takes direct, practical action to address the source of stress (the workload). It changes the situation itself rather than managing the emotional response to it. The other options are all forms of emotion-focused coping: acceptance, breathing techniques, and social support manage the emotional response rather than changing the situation.',
  },
  {
    id: 3,
    question: 'When is emotion-focused coping the most appropriate strategy?',
    options: [
      'When you are feeling happy and relaxed',
      'When the situation is controllable and you can take direct action',
      'When the situation is uncontrollable — you cannot change it, only manage your response',
      'When other people are responsible for the problem',
    ],
    correctAnswer: 2,
    explanation:
      'Emotion-focused coping is most appropriate when the source of stress is uncontrollable — when there is nothing you can do to change the situation itself. A cancelled contract, a regulatory change, weather delays, or the loss of a colleague are all situations where direct action to change the outcome is not possible. In these cases, the intelligent strategy is to manage your emotional response: accept the reality, reframe the situation, seek support, and practise relaxation techniques.',
  },
  {
    id: 4,
    question:
      'An electrician has been told that a major contract has been cancelled with no notice. Which combination of coping strategies is most appropriate?',
    options: [
      'Only problem-focused: immediately start looking for new work and ignore the emotional impact',
      'Only emotion-focused: accept the situation and wait for something to change',
      'Avoidant: go to the pub and try not to think about it',
      'Emotion-focused for the uncontrollable element (the cancellation), problem-focused for the controllable elements (next steps, finances, scheduling)',
    ],
    correctAnswer: 3,
    explanation:
      'The most effective approach combines both strategies. The cancellation itself is uncontrollable (you cannot force the client to reinstate the contract), so emotion-focused coping is appropriate for that element: acceptance, reframing, talking to peers. However, there are many controllable elements in the situation: adjusting your schedule, contacting other clients, reviewing finances, and planning next steps. Problem-focused coping is appropriate for these. Using both strategies together addresses the full range of the stressful experience.',
  },
  {
    id: 5,
    question: 'Which of the following is NOT a form of avoidant coping?',
    options: [
      'Drinking heavily after work to forget about stress',
      'Denial — pretending the problem does not exist',
      'Seeking social support by talking to a trusted colleague about the problem',
      'Withdrawal — isolating yourself from friends and family',
    ],
    correctAnswer: 2,
    explanation:
      'Seeking social support is a form of emotion-focused coping, not avoidant coping. When you talk to a trusted colleague about a problem, you are actively processing the emotional response (expressing it, gaining perspective, receiving validation) rather than avoiding it. Avoidant coping involves escaping from the stress without processing it: drinking to numb, denying the problem exists, or withdrawing from the people who could help.',
  },
  {
    id: 6,
    question:
      'What is the key characteristic that distinguishes avoidant coping from emotion-focused coping?',
    options: [
      'Avoidant coping involves other people; emotion-focused coping is done alone',
      'Avoidant coping escapes from the emotional response without processing it; emotion-focused coping actively manages and processes the emotional response',
      'Avoidant coping is faster; emotion-focused coping takes more time',
      'There is no meaningful difference — they are the same thing',
    ],
    correctAnswer: 1,
    explanation:
      'The critical distinction is processing versus escaping. Emotion-focused coping actively engages with the emotional response: you acknowledge it (acceptance), explore it (reframing), share it (social support), or regulate it (relaxation). Avoidant coping attempts to escape from the emotional response altogether: numbing it with alcohol, denying it exists, or distracting yourself from it through overwork or withdrawal. The emotion-focused approach processes the emotion; the avoidant approach buries it, where it accumulates and eventually causes greater harm.',
  },
  {
    id: 7,
    question:
      'An electrician is struggling with an unreasonable workload. Which problem-focused coping strategies would be most appropriate?',
    options: [
      'Accepting that the workload is what it is and practising mindfulness',
      'Planning and scheduling to prioritise tasks, declining lower-priority jobs, and hiring additional help',
      'Drinking more coffee to work longer hours and pushing through without breaks',
      'Talking to a partner about feeling overwhelmed and practising breathing exercises',
    ],
    correctAnswer: 1,
    explanation:
      'Planning, prioritising, declining jobs, and hiring help are all problem-focused strategies because they directly address the source of the stress (the excessive workload). They change the situation itself rather than managing the emotional response to it. The first and fourth options are emotion-focused (appropriate as complementary strategies but not sufficient alone when the situation is controllable). The third option (more coffee, longer hours) is avoidant coping disguised as productivity — it postpones the problem while increasing physical and mental strain.',
  },
  {
    id: 8,
    question:
      "According to Lazarus and Folkman's research, which approach to coping is associated with the best mental health outcomes?",
    options: [
      'Always using problem-focused coping regardless of the situation',
      'Always using emotion-focused coping regardless of the situation',
      'Flexible coping — matching the strategy to the controllability of the situation',
      'Avoidant coping — removing yourself from stressful situations entirely',
    ],
    correctAnswer: 2,
    explanation:
      "Lazarus and Folkman's research showed that the people with the best mental health outcomes are those who flexibly match their coping strategy to the demands of the situation. They use problem-focused coping when the situation is controllable and emotion-focused coping when it is not. Rigidly applying the same strategy regardless of context — whether that is always trying to solve problems or always managing emotions — leads to poorer outcomes because the strategy does not fit the situation. Coping flexibility is a key component of psychological resilience.",
  },
];

export default function RSMModule3Section4() {
  useSEO({
    title: 'Problem-Focused vs Emotion-Focused Coping | RSM Module 3.4',
    description:
      "Lazarus and Folkman's two fundamental coping strategies, when to use which, avoidant coping, and construction-specific examples.",
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
            <Link to="../rsm-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Crosshair className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Problem-Focused vs Emotion-Focused Coping
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the two fundamental coping strategies, knowing when to use each one, and
            recognising avoidant coping patterns that make things worse
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Theory:</strong> Lazarus &amp; Folkman (1984) identified two fundamental
                coping strategies
              </li>
              <li>
                <strong>Rule:</strong> Controllable &rarr; problem-focused; Uncontrollable &rarr;
                emotion-focused
              </li>
              <li>
                <strong>Warning:</strong> Avoidant coping (alcohol, denial, withdrawal) always makes
                things worse
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Efficiency:</strong> Matching the right strategy to the situation saves
                energy and reduces stress
              </li>
              <li>
                <strong>Flexibility:</strong> The best copers adapt their strategy to the demands of
                each situation
              </li>
              <li>
                <strong>Prevention:</strong> Recognising avoidant patterns early prevents escalation
                to burnout, addiction, or crisis
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain Lazarus and Folkman's two fundamental coping strategies and their theoretical basis",
              'Identify the key characteristics of problem-focused coping with construction-specific examples',
              'Identify the key characteristics of emotion-focused coping with construction-specific examples',
              'Apply the controllability principle to determine which strategy is most appropriate for a given situation',
              'Recognise four common forms of avoidant coping and explain why they are harmful',
              'Demonstrate coping flexibility by combining both strategies for a complex real-world scenario',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Lazarus and Folkman's Coping Theory */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Lazarus and Folkman&rsquo;s Coping Theory
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 1984, psychologists <strong>Richard Lazarus</strong> and{' '}
                <strong>Susan Folkman</strong> published <em>Stress, Appraisal, and Coping</em>,
                which became one of the most influential works in the history of stress psychology.
                Their central insight was that coping with stress is not a single behaviour but a{' '}
                <strong>process</strong> that involves two distinct types of strategy, each
                appropriate for different types of stressor.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The Core Insight:</strong> Not all stress is the
                  same. Some stressors can be changed through direct action (controllable); others
                  cannot (uncontrollable). The most effective copers are those who accurately assess
                  the controllability of a situation and match their coping strategy accordingly.
                  Trying to solve a problem you cannot control wastes energy and increases
                  frustration. Trying to accept a problem you <em>can</em> control wastes an
                  opportunity to improve your situation.
                </p>
              </div>

              <p>
                Lazarus and Folkman proposed that when we encounter a stressful situation, we go
                through two appraisal processes. <strong>Primary appraisal</strong> evaluates the
                significance of the event: &ldquo;Is this a threat, a challenge, or
                irrelevant?&rdquo; <strong>Secondary appraisal</strong> evaluates your coping
                resources: &ldquo;What can I do about this? Do I have the skills, resources, and
                options to handle it?&rdquo; The interaction between these two appraisals determines
                which coping strategy you deploy.
              </p>

              <p>
                Their research identified two fundamental categories of coping:{' '}
                <strong>problem-focused coping</strong> (taking direct action to change the
                stressful situation) and <strong>emotion-focused coping</strong> (managing the
                emotional response when the situation cannot be changed). Both are legitimate,
                healthy strategies when applied to the right type of stressor. The problems arise
                when people rigidly apply one strategy regardless of context, or when they resort to
                avoidant coping instead of either genuine strategy.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">The Controllability Principle</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-medium text-rose-400 mb-1">Controllable Situation</p>
                    <p className="text-xs text-white">
                      You can take direct action to change it.
                      <br />
                      <strong>Use:</strong> Problem-focused coping
                      <br />
                      <strong>Example:</strong> Overloaded with work &rarr; reorganise schedule,
                      decline a job, hire help
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-medium text-rose-400 mb-1">
                      Uncontrollable Situation
                    </p>
                    <p className="text-xs text-white">
                      You cannot change the situation itself.
                      <br />
                      <strong>Use:</strong> Emotion-focused coping
                      <br />
                      <strong>Example:</strong> Contract cancelled &rarr; accept, reframe, seek
                      support, plan next steps
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Problem-Focused Coping */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Problem-Focused Coping
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Problem-focused coping involves taking <strong>direct action</strong> to address the
                source of stress. It is about changing the situation itself, rather than changing
                how you feel about it. This is the strategy to use when the stressor is controllable
                &mdash; when there are practical steps you can take to reduce or eliminate the
                problem.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Key Problem-Focused Strategies
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Planning</p>
                      <p className="text-sm text-white">
                        Developing a strategy to address the problem. Breaking a large, overwhelming
                        problem into smaller, manageable steps. Creating timelines, setting
                        priorities, and allocating resources. Planning transforms a vague,
                        anxiety-producing situation into a concrete, actionable sequence of tasks.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Information Seeking</p>
                      <p className="text-sm text-white">
                        Gathering the knowledge, data, or expertise needed to solve the problem.
                        This might mean researching a regulation, consulting a more experienced
                        colleague, reading a guidance note, or attending training. Information
                        seeking reduces stress by replacing uncertainty with knowledge and
                        competence.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Skill Development</p>
                      <p className="text-sm text-white">
                        If the stressor is caused by a skill gap, the direct solution is to develop
                        the skill. This might mean taking a course, practising a technique,
                        shadowing a more experienced electrician, or working through practice
                        scenarios. Skill development addresses the root cause of stress rather than
                        managing the symptoms.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Assertiveness</p>
                      <p className="text-sm text-white">
                        Communicating your needs, boundaries, and concerns clearly and directly.
                        This might mean saying no to unreasonable demands, negotiating better terms,
                        raising safety concerns, or setting boundaries with difficult clients.
                        Assertiveness is problem-focused because it directly addresses the
                        interpersonal source of stress rather than silently enduring it.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">
                    Construction Example: Problem-Focused Coping for Workload
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  You are a self-employed electrician and you have taken on too much work. You are
                  working six days a week, starting early and finishing late. Your stress levels are
                  climbing, your sleep is suffering, and your family is complaining that they never
                  see you. This is a <strong>controllable stressor</strong> &mdash; you can take
                  direct action to change it.
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Planning:</strong> Review all current jobs, prioritise by deadline and
                      profitability, create a realistic schedule that includes rest days
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Assertiveness:</strong> Decline or postpone the two lowest-priority
                      jobs. Communicate honestly with clients: &ldquo;I want to give your job my
                      full attention, so I would prefer to start in three weeks rather than rush it
                      now&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Resource seeking:</strong> Hire a mate or subcontract specific tasks
                      to another trusted electrician
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Skill development:</strong> Learn better scheduling and job-costing
                      techniques to prevent future overcommitment
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Emotion-Focused Coping */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Emotion-Focused Coping
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Emotion-focused coping involves managing your <strong>emotional response</strong> to
                a stressful situation, rather than trying to change the situation itself. This is
                the strategy to use when the stressor is uncontrollable &mdash; when there is
                nothing you can do to change the situation and your only option is to manage how you
                respond to it.
              </p>

              <p>
                Emotion-focused coping is often misunderstood as &ldquo;giving up&rdquo; or
                &ldquo;being weak.&rdquo; In reality, it is a sophisticated and often courageous
                response that requires genuine self-awareness and emotional skill. Accepting what
                you cannot change, reframing a loss as a learning opportunity, and reaching out for
                support all take more emotional intelligence than simply raging against a situation
                you cannot control.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Key Emotion-Focused Strategies
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Acceptance</p>
                      <p className="text-sm text-white">
                        Acknowledging the reality of the situation without fighting against it.
                        Acceptance does not mean approval &mdash; it means recognising that the
                        situation <em>is what it is</em> and that expending energy resisting an
                        unchangeable reality only adds to your suffering. Acceptance frees up the
                        mental and emotional energy that was being consumed by resistance and
                        redirects it towards constructive forward movement.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Cognitive Reframing</p>
                      <p className="text-sm text-white">
                        Changing the meaning you assign to the situation. This is the cognitive
                        strategy covered in Section 3 &mdash; finding a balanced, accurate
                        interpretation that reduces the emotional impact without denying the
                        difficulty. Reframing a cancelled contract as &ldquo;an unexpected
                        opportunity to take on different work&rdquo; does not erase the
                        disappointment, but it reduces the emotional intensity and opens up
                        constructive thinking about next steps.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Social Support</p>
                      <p className="text-sm text-white">
                        Talking to someone you trust about what you are going through. This is one
                        of the most powerful emotion-focused strategies because it provides multiple
                        benefits simultaneously: emotional expression (getting it off your chest),
                        perspective (hearing another viewpoint), validation (knowing you are not
                        alone), and sometimes practical advice. Social support can come from a
                        partner, friend, colleague, mentor, or professional counsellor.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Relaxation and Mindfulness</p>
                      <p className="text-sm text-white">
                        Using techniques such as breathing exercises, body scans, mindfulness
                        meditation, and progressive muscle relaxation to reduce the physiological
                        stress response. These techniques (covered in Sections 1 and 2 of this
                        module) directly counteract the fight-or-flight activation that accompanies
                        stress, giving you a physical tool for managing your emotional state.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">
                    Construction Example: Emotion-Focused Coping for a Cancelled Contract
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  A major domestic rewire contract worth several thousand pounds is cancelled at the
                  last minute because the homeowner has decided not to proceed. You have already
                  turned down other work to accommodate this job. This is an{' '}
                  <strong>uncontrollable stressor</strong> &mdash; you cannot force the homeowner to
                  proceed.
                </p>
                <ul className="text-sm text-white space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Acceptance:</strong> &ldquo;The contract is cancelled. I cannot change
                      that. Fighting against the reality will only make me more stressed.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Reframing:</strong> &ldquo;This is frustrating, but it has also freed
                      up my schedule. I now have capacity to take on work I would otherwise have had
                      to turn down. I can use this time for professional development or to catch up
                      on admin.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Social support:</strong> Phone a fellow electrician or a trusted
                      friend and talk about the frustration. Sometimes just expressing it to someone
                      who understands the industry is enough to take the edge off.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Relaxation:</strong> Use a breathing technique to manage the immediate
                      frustration, then do something restorative in the evening rather than dwelling
                      on the loss.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: When to Use Which */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            When to Use Which
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The single most important skill in stress management is{' '}
                <strong>coping flexibility</strong> &mdash; the ability to accurately assess a
                situation and deploy the right strategy. Lazarus and Folkman&rsquo;s research
                consistently showed that people who flexibly match their coping strategy to the
                controllability of the situation have better mental health outcomes, lower stress
                levels, and greater resilience than those who rigidly apply the same strategy
                regardless of context.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Decision Framework</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-white mb-1">
                      Step 1: Assess controllability
                    </p>
                    <p className="text-xs text-white">
                      Ask: &ldquo;Can I take direct action to change this situation?&rdquo; If yes,
                      the situation (or that element of it) is controllable. If no, it is
                      uncontrollable.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-white mb-1">
                      Step 2: Match strategy to controllability
                    </p>
                    <p className="text-xs text-white">
                      Controllable elements &rarr; problem-focused (plan, act, learn, communicate).
                      Uncontrollable elements &rarr; emotion-focused (accept, reframe, seek support,
                      relax).
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-white mb-1">
                      Step 3: Combine strategies for complex situations
                    </p>
                    <p className="text-xs text-white">
                      Most real-world situations have both controllable and uncontrollable elements.
                      Apply problem-focused coping to the parts you can change and emotion-focused
                      coping to the parts you cannot. This combined approach is the hallmark of
                      effective coping.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Mismatches (and Their Consequences)
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-400 mb-1">
                      Problem-Focused on Uncontrollable Situations
                    </p>
                    <p className="text-xs text-white">
                      Trying to &ldquo;fix&rdquo; something you cannot change. Leads to frustration,
                      exhaustion, and a sense of helplessness. Example: endlessly trying to convince
                      a client who has definitively cancelled to change their mind, rather than
                      accepting the cancellation and moving on.
                    </p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-400 mb-1">
                      Emotion-Focused on Controllable Situations
                    </p>
                    <p className="text-xs text-white">
                      Accepting and managing feelings about a situation you could actually change.
                      Leads to passivity and missed opportunities. Example: practising mindfulness
                      about your overwhelming workload instead of declining a job or hiring help
                      &mdash; the workload remains unchanged while you become progressively more
                      exhausted.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Avoidant Coping — What NOT to Do */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Avoidant Coping &mdash; What NOT to Do
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                There is a third category of coping that Lazarus and Folkman identified &mdash; and
                it is the one that causes the most damage. <strong>Avoidant coping</strong> is
                neither problem-focused nor emotion-focused. It is an attempt to escape from the
                stress altogether, without addressing either the source or the emotional response.
                Avoidant coping provides temporary relief but <em>always</em> makes the underlying
                problem worse.
              </p>

              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-3">
                  Common Forms of Avoidant Coping
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/30 text-white text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Alcohol and Substance Misuse</p>
                      <p className="text-sm text-white">
                        Using alcohol, drugs, or other substances to numb or escape from stress.
                        This is one of the most common and most dangerous forms of avoidant coping
                        in the construction industry. Research by the Chartered Institute of
                        Building found that construction workers are significantly more likely to
                        use alcohol as a coping mechanism than the general population. The temporary
                        relief is real, but the long-term consequences &mdash; impaired physical
                        health, damaged relationships, increased anxiety and depression, financial
                        problems, and safety risks on site &mdash; far outweigh any short-term
                        benefit.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/30 text-white text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Denial</p>
                      <p className="text-sm text-white">
                        Refusing to acknowledge that a problem exists. Denial is not the same as
                        acceptance (which acknowledges the problem but chooses not to fight it);
                        denial pretends the problem is not there at all. An electrician in denial
                        about their excessive workload might say &ldquo;I am fine, I can handle
                        it&rdquo; while their health, relationships, and quality of work are all
                        deteriorating. Denial postpones the reckoning but does not prevent it.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/30 text-white text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Withdrawal</p>
                      <p className="text-sm text-white">
                        Isolating yourself from the people and activities that could help.
                        Withdrawal is particularly common in men and particularly dangerous in
                        construction, where the combination of long working hours, physical
                        exhaustion, and cultural norms around &ldquo;toughness&rdquo; can make it
                        feel easier to withdraw than to reach out. Withdrawal removes you from the
                        social support networks that are essential for managing stress and increases
                        the risk of depression and suicidal ideation.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-red-500/30 text-white text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Overwork</p>
                      <p className="text-sm text-white">
                        Using excessive work as a distraction from other stressors. This is an
                        insidious form of avoidant coping because it is often praised in the
                        construction industry (&ldquo;fair play, he is always grafting&rdquo;). But
                        when overwork is driven by avoidance rather than genuine necessity or
                        ambition, it is harmful: it prevents you from addressing the real source of
                        stress, damages your health and relationships, and eventually leads to
                        burnout. The key question is: &ldquo;Am I working because I want to, or
                        because I am afraid of what I will think and feel if I stop?&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Construction Industry Context
                  </p>
                </div>
                <p className="text-sm text-white">
                  The construction industry has some of the highest rates of mental health
                  difficulties, substance misuse, and suicide of any sector in the UK. While the
                  causes are complex and multifaceted, avoidant coping is a significant contributing
                  factor. The industry culture has historically rewarded toughness, self-reliance,
                  and &ldquo;getting on with it&rdquo; &mdash; which often translates into
                  suppressing emotions, avoiding difficult conversations, and using alcohol to
                  unwind. Recognising avoidant coping in yourself and in others is not just an
                  academic exercise; it is a potentially life-saving skill.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Putting It All Together */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Putting It All Together
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The most effective approach to stress is not choosing one strategy over another
                &mdash; it is developing the <strong>flexibility</strong> to combine strategies
                based on the demands of each specific situation. Let us look at how this works in
                practice with a comprehensive construction scenario.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Comprehensive Example: Managing a Business Setback
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  <strong>Scenario:</strong> You are a self-employed electrician. Your biggest
                  client (40% of your revenue) has just informed you that they are switching to a
                  different contractor from next month. You are also mid-way through a complex
                  commercial job that is causing you stress, and your partner has been asking for
                  more time together.
                </p>

                <p className="text-xs font-medium text-rose-400 mb-2">
                  Uncontrollable Elements (Emotion-Focused)
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      The client&rsquo;s decision to switch &mdash; <strong>Accept</strong> the
                      reality rather than wasting energy trying to change their mind
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      The loss of income &mdash; <strong>Reframe</strong> as a prompt to diversify
                      your client base (a healthier long-term position)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      The emotional impact &mdash; <strong>Talk</strong> to a trusted colleague or
                      friend. Use breathing techniques to manage the acute anxiety
                    </span>
                  </li>
                </ul>

                <p className="text-xs font-medium text-rose-400 mt-4 mb-2">
                  Controllable Elements (Problem-Focused)
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Future revenue &mdash; <strong>Plan</strong> a client acquisition strategy:
                      contact previous clients, update your online presence, network with other
                      trades
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      The current commercial job &mdash; <strong>Information seek</strong> for
                      specific challenges, break it into manageable stages, ask for help where
                      needed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Relationship with partner &mdash; <strong>Assertiveness</strong>: have an
                      honest conversation about the current pressures and agree on specific time
                      together
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      Finances &mdash; <strong>Plan</strong> a revised budget for the transition
                      period, reduce non-essential spending, build an emergency fund
                    </span>
                  </li>
                </ul>
              </div>

              {/* Key Takeaways */}
              <div className="border-l-2 border-green-500/50 pl-4 mt-8">
                <p className="text-sm font-medium text-white mb-3">Key Takeaways</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Lazarus and Folkman identified two fundamental coping strategies:
                      problem-focused (direct action) and emotion-focused (managing the emotional
                      response)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      The controllability principle: use problem-focused for controllable stressors
                      and emotion-focused for uncontrollable ones
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Problem-focused strategies include planning, information seeking, skill
                      development, and assertiveness
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Emotion-focused strategies include acceptance, reframing, social support, and
                      relaxation techniques
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Avoidant coping (alcohol, denial, withdrawal, overwork) provides temporary
                      relief but always makes the underlying problem worse
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Coping flexibility &mdash; matching your strategy to the controllability of
                      the situation &mdash; is the hallmark of effective stress management
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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
            <Link to="../rsm-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-4">
              Next: Module 4
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
