import {
  ArrowLeft,
  ClipboardList,
  CheckCircle,
  AlertTriangle,
  Activity,
  FileText,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'stress-triggers',
    question: 'Why is identifying your personal stress triggers important for building resilience?',
    options: [
      'So you can avoid every situation that causes stress and live a completely stress-free life',
      'So you can recognise early warning signs and intervene before stress escalates to crisis point',
      'So you can blame external factors for all your stress instead of taking responsibility',
      'So you can prove to others that your job is more stressful than theirs',
    ],
    correctIndex: 1,
    explanation:
      'Identifying personal stress triggers is not about avoidance — it is about early recognition and intervention. When you know what your specific triggers are, you can spot the early warning signs of stress building up and take action (such as using a coping strategy, seeking support, or adjusting your schedule) before the stress escalates to a point where it overwhelms your coping capacity. Prevention and early intervention are always more effective than crisis management.',
  },
  {
    id: 'stress-diary',
    question: 'What is the primary purpose of keeping a stress diary for two weeks?',
    options: [
      'To create a legal record in case you need to make a workplace complaint',
      'To identify patterns in your stress triggers, reactions, and coping responses over time',
      'To prove to your GP that you are genuinely stressed so they will prescribe medication',
      'To compare your stress levels with colleagues and determine who has the hardest job',
    ],
    correctIndex: 1,
    explanation:
      'A stress diary is a self-awareness tool. By recording stress events, your emotional and physical reactions, and the coping strategies you used over a two-week period, you can identify patterns that are invisible in the moment. You might discover that your stress peaks at specific times, is triggered by specific types of work, or is worsened by specific behaviours (such as skipping meals or checking emails late at night). These patterns become the basis for targeted resilience-building strategies.',
  },
  {
    id: 'energy-audit',
    question: 'An energy audit involves identifying which of the following?',
    options: [
      'The electrical energy consumption of your workplace',
      'Activities, people, and situations that drain your energy vs those that energise you',
      'How many hours of sleep you need based on your age and weight',
      'The number of calories you should consume to maintain peak physical performance',
    ],
    correctIndex: 1,
    explanation:
      'An energy audit is a personal assessment tool where you identify the activities, people, and situations that drain your energy versus those that restore or boost it. By mapping your energy drains and sources, you can make informed decisions about how to structure your day, which activities to prioritise, and where to set boundaries. This directly supports resilience by ensuring you are not constantly running on empty.',
  },
];

const faqs = [
  {
    question: 'What if I identify my stress triggers but cannot change or avoid them?',
    answer:
      'Most stress triggers in the electrical trade cannot be eliminated entirely — difficult clients, financial uncertainty, and paperwork demands are inherent features of the job. The goal of identifying triggers is not necessarily to remove them, but to prepare for them. When you know a specific type of work triggers your stress response (such as EICR paperwork), you can plan for it: schedule it when your energy is highest, break it into smaller chunks, build in rewards, ask for help with the parts you find most difficult, or use specific coping techniques before and during the task. Anticipation and preparation are far more effective than being blindsided repeatedly by the same triggers.',
  },
  {
    question: 'How long should I keep a stress diary?',
    answer:
      'A minimum of two weeks is recommended to capture enough data to identify patterns. Ideally, the diary should cover at least one full work cycle — including both busy and quiet periods. Some people find it helpful to keep a diary for a full month. The key is consistency: recording entries at the same time each day (many people find end-of-day works best) and being honest about what you experienced. After the initial monitoring period, you do not need to continue indefinitely — review the patterns, develop your strategies, and then check in with another short diary period every few months to see if your patterns have changed.',
  },
  {
    question: 'I hold tension in my shoulders and neck. Is that really connected to stress?',
    answer:
      "Yes, very directly. The body's stress response (fight-or-flight) involves tensing muscles in preparation for physical action. When stress is chronic — as it often is in demanding jobs — this muscle tension becomes habitual and you may not even notice it until it causes pain. Common areas include the neck, shoulders, jaw (many people clench or grind their teeth without realising), lower back, and hands. For electricians, these areas are particularly vulnerable because the physical demands of the work (overhead work, confined spaces, repetitive hand movements) compound the stress-related tension. Body awareness — deliberately scanning for tension and releasing it — is a simple but effective resilience technique.",
  },
  {
    question: 'What if my honest resilience assessment reveals that I am struggling significantly?',
    answer:
      'If your self-assessment reveals that you are struggling more than you expected, that is actually a positive outcome — it means you now have the self-awareness to take action. Struggling is not a sign of failure; it is a sign that your current stressors are exceeding your current coping resources. Practical next steps include: talking to someone you trust about how you are feeling, contacting your GP if your mental health is significantly affected, calling the Samaritans (116 123) if you are in crisis, contacting the Construction Industry Helpline (0345 605 1956) for industry-specific support, or reviewing the protective factors from Section 3 and identifying which ones you can strengthen. Recognising that you need support is itself a resilience skill — it is the "reaching out" ability identified by Reivich and Shatte.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is a stress trigger?',
    options: [
      'A rare, catastrophic event that causes permanent psychological damage',
      'A specific situation, person, task, or thought that consistently activates your stress response',
      'A medical condition that makes you more susceptible to stress than the average person',
      'A workplace hazard that should be reported under RIDDOR',
    ],
    correctAnswer: 1,
    explanation:
      'A stress trigger is any specific situation, person, task, thought, or condition that consistently activates your stress response. Triggers are personal — what is stressful for one person may not be stressful for another. Common triggers for electricians include specific types of paperwork, certain client personalities, financial uncertainty, time pressure, and particular types of work environments.',
  },
  {
    id: 2,
    question: 'A stress diary should record which of the following for each entry?',
    options: [
      'Only the stressful event itself, with no personal detail',
      'The event, your emotional and physical reaction, the coping strategy you used, and its effectiveness',
      'A detailed complaint about the person or situation that caused the stress',
      'Only events with a stress rating of 8 or above on a 10-point scale',
    ],
    correctAnswer: 1,
    explanation:
      'An effective stress diary records the event (what happened), your emotional and physical reaction (what you felt), the coping strategy you used (what you did), and how effective it was (did it help?). This comprehensive approach allows you to identify not just your triggers but also your typical reactions and which coping strategies work best for different types of stress.',
  },
  {
    id: 3,
    question: 'Why is body awareness important for resilience?',
    options: [
      'Because physical fitness is the only factor that determines resilience',
      'Because the body stores stress physically, and recognising physical tension allows you to intervene early',
      'Because you need to maintain a specific body weight to be resilient',
      'Because body awareness is required for the AM2 practical assessment',
    ],
    correctAnswer: 1,
    explanation:
      'The body and mind are interconnected — chronic stress manifests physically through muscle tension, headaches, digestive issues, elevated heart rate, and other symptoms. By developing body awareness (learning to notice where you hold tension), you gain an early warning system for stress. Physical symptoms often appear before you consciously recognise that you are stressed, making them valuable signals for early intervention.',
  },
  {
    id: 4,
    question: 'An energy audit is a tool for identifying:',
    options: [
      'How many hours you should work per week based on your age',
      'Activities, people, and situations that drain your energy versus those that energise you',
      'The electrical energy rating of your workplace tools and equipment',
      'How much caffeine you should consume to maintain alertness throughout the working day',
    ],
    correctAnswer: 1,
    explanation:
      'An energy audit maps the activities, people, and situations in your life according to whether they drain or restore your energy. This information allows you to make strategic decisions about your daily schedule, boundary-setting, and priorities. For example, if paperwork drains you but hands-on installation energises you, you might schedule paperwork first thing in the morning when your energy is freshest, rather than leaving it until the end of the day when you are already depleted.',
  },
  {
    id: 5,
    question:
      'An electrician notices they feel most stressed when completing EICR paperwork. Which self-assessment strategy would be most useful?',
    options: [
      'Avoiding all EICR work entirely and only accepting new installation jobs',
      'Recording specific aspects of EICR paperwork that cause stress, when the stress peaks, and which strategies help manage it',
      'Completing all EICR paperwork as quickly as possible without breaks to minimise exposure to the stressor',
      'Asking a colleague to complete all EICR paperwork on their behalf permanently',
    ],
    correctAnswer: 1,
    explanation:
      'The most effective approach is to analyse the trigger in detail. Not all aspects of EICR paperwork may be equally stressful — perhaps the observations coding causes anxiety, or the limitation recording feels overwhelming. By identifying the specific sub-triggers and experimenting with different coping strategies, the electrician can develop targeted approaches rather than avoidance (which is not sustainable in a real career).',
  },
  {
    id: 6,
    question: 'Where do most people hold physical tension when they are stressed?',
    options: [
      'Only in the hands and fingers',
      'Neck, shoulders, jaw, and lower back',
      'Only in the legs and feet',
      'Stress does not cause physical tension — it is purely psychological',
    ],
    correctAnswer: 1,
    explanation:
      'The most common areas for stress-related muscle tension are the neck, shoulders, jaw (including teeth clenching and grinding), and lower back. For electricians, these areas are particularly vulnerable because the physical demands of the trade — overhead work, confined spaces, repetitive hand movements, carrying heavy equipment — compound the stress-related tension. Regular body scanning for tension is a simple but effective resilience practice.',
  },
  {
    id: 7,
    question: 'What is a personal resilience baseline?',
    options: [
      'A medical diagnosis of your current stress levels provided by a GP',
      'An honest self-assessment of your current resilience level — your typical stress responses, coping capacity, and available resources',
      'A legal requirement under the Health and Safety at Work Act 1974',
      'A score on a standardised psychological test that can only be administered by a clinical psychologist',
    ],
    correctAnswer: 1,
    explanation:
      'A personal resilience baseline is your honest self-assessment of where you currently stand in terms of resilience. It includes your typical stress responses, your current coping capacity, your protective factors and risk factors, your known triggers, and your overall sense of how well you are managing. This baseline is not a judgement — it is a starting point for improvement. You can revisit it periodically to measure your progress.',
  },
  {
    id: 8,
    question:
      'An electrician realises through self-assessment that their biggest stressor is financial uncertainty. What is the most resilient response?',
    options: [
      'Accept that financial uncertainty is part of the trade and try not to think about it',
      'Use the self-awareness to take practical steps: build an emergency fund, review pricing, diversify income streams, and seek financial advice',
      'Leave the electrical trade for a more stable job',
      'Take on as much work as possible regardless of price to maximise short-term income',
    ],
    correctAnswer: 1,
    explanation:
      'The most resilient response uses self-awareness as a springboard for practical action. Rather than avoidance (not thinking about it), escape (leaving the trade), or unsustainable overwork (accepting any job at any price), the electrician takes targeted steps to address the root cause of their stress. Building an emergency fund, reviewing pricing to ensure fair rates, diversifying income, and seeking professional financial advice are all concrete actions that reduce the stressor over time.',
  },
];

export default function RSMModule2Section4() {
  useSEO({
    title: 'Self-Assessment & Knowing Your Triggers | RSM Module 2.4',
    description:
      'Identify your personal stress triggers, learn to use a stress diary, develop body awareness, conduct an energy audit, and establish your personal resilience baseline.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="min-h-[44px] text-white hover:text-white active:text-white p-0 -ml-1 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Centred Header */}
        <div className="mb-12 text-center">
          <ClipboardList className="h-10 w-10 text-rose-400 mx-auto mb-4" />
          <span className="inline-block bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 4
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Self-Assessment &amp; Knowing Your Triggers
          </h1>
          <p className="text-white max-w-xl mx-auto">
            Identifying personal stress triggers, using stress diaries, body awareness, energy
            audits, and establishing your resilience baseline
          </p>
        </div>

        {/* Quick Summary */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-rose-500/80 text-sm font-normal">00</span>
            Quick Summary
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-rose-500/10 border-l-2 border-l-rose-500/50 border border-rose-500/30">
              <p className="font-semibold text-base text-rose-400 mb-2">In 30 Seconds</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Know your triggers:</strong> Specific situations,
                    tasks, and people that consistently activate your stress response.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Stress diary:</strong> Record events, reactions,
                    and coping strategies for two weeks to spot patterns.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Body awareness:</strong> Learn where you hold
                    tension &mdash; neck, shoulders, jaw, lower back.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Energy audit:</strong> Map what drains you vs
                    what energises you to make better daily choices.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Baseline:</strong> Honestly assess where you
                    stand right now &mdash; the starting point for improvement.
                  </span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-rose-500/10 border-l-2 border-l-rose-500/50 border border-rose-500/30">
              <p className="font-semibold text-base text-rose-400 mb-2">Why It Matters</p>
              <ul className="text-base text-white space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Self-awareness first:</strong> You cannot build
                    resilience effectively without understanding your starting point.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Early warning:</strong> Knowing your triggers and
                    physical signs lets you intervene before stress becomes overwhelming.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Targeted action:</strong> Generic resilience
                    advice is less effective than strategies tailored to your specific patterns.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Progress tracking:</strong> A baseline lets you
                    measure improvement over time, which itself builds motivation.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-rose-500/80 text-sm font-normal">&nbsp;</span>
            Learning Outcomes
          </h2>
          <p className="text-white mb-4">By the end of this section, you will be able to:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Identify your personal stress triggers and explain why they affect you specifically
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Design and use a stress diary to record events, reactions, and coping strategies
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>Practise body scanning to identify where you hold physical tension</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>Conduct a personal energy audit to map your drains and sources of energy</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Establish a personal resilience baseline as a starting point for improvement
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Apply self-assessment techniques to construction-specific stressors and scenarios
              </span>
            </li>
          </ul>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Identifying Personal Stress Triggers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Identifying Personal Stress Triggers
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                A <strong>stress trigger</strong> is any specific situation, person, task, thought,
                or condition that consistently activates your stress response. Triggers are personal
                &mdash; what causes significant stress for one person may barely register for
                another. Understanding your own specific triggers is the foundation of effective
                resilience building, because it allows you to anticipate, prepare for, and manage
                your stress before it escalates.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <ClipboardList className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Common Stress Triggers for Electricians
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Paperwork and administration</strong> &mdash;
                      EICRs, certification, invoicing, tax returns. Many electricians find the
                      administrative side of the job significantly more stressful than the physical
                      work.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Difficult clients</strong> &mdash; unreasonable
                      expectations, scope creep, disputes over pricing, clients who stand over you
                      while you work, non-payment.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Financial uncertainty</strong> &mdash; gaps
                      between contracts, late payments, unexpected costs (van repairs, tool
                      replacement, insurance renewals), self-employed tax bills.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Time pressure</strong> &mdash; tight deadlines,
                      multiple jobs overlapping, being expected to work faster than is safe or
                      practical.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Assessments and qualifications</strong> &mdash;
                      AM2, City &amp; Guilds exams, CPD requirements, registration renewals.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Working conditions</strong> &mdash; confined
                      spaces, extreme temperatures, noisy environments, working at height, long
                      commutes.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Key Point</p>
                <p className="text-base text-white leading-relaxed">
                  Your triggers are not the same as everyone else&rsquo;s. One sparky might find
                  EICR paperwork deeply stressful but handle difficult clients calmly. Another might
                  breeze through paperwork but become intensely anxious about financial uncertainty.
                  A third might be comfortable with both but struggle significantly with the
                  isolation of working alone.{' '}
                  <strong>There is no hierarchy of &ldquo;valid&rdquo; triggers</strong> &mdash;
                  whatever consistently activates your stress response is a real trigger that
                  deserves attention.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: The Stress Diary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The Stress Diary
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                A stress diary is one of the most practical self-assessment tools available. By
                recording your stress experiences over a <strong>minimum of two weeks</strong>, you
                build a picture of your personal stress patterns that is impossible to see in the
                moment. Most people are surprised by what their diary reveals &mdash; the actual
                triggers are often different from what they expected.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <FileText className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  What to Record Each Day
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">1. The Event</h4>
                    <p className="text-white text-sm">
                      What happened? Describe the specific situation, task, or interaction that
                      triggered your stress response. Be concrete: &ldquo;Client called at 7pm
                      complaining about socket placement&rdquo; rather than &ldquo;bad day.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">2. Your Reaction</h4>
                    <p className="text-white text-sm">
                      How did you feel emotionally (anxious, angry, frustrated, overwhelmed,
                      helpless)? How did your body respond (tense shoulders, racing heart, headache,
                      stomach churning, jaw clenching)? Rate the intensity on a 1&ndash;10 scale.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">3. Your Coping Response</h4>
                    <p className="text-white text-sm">
                      What did you do in response? Did you talk to someone, take a break, exercise,
                      have a drink, argue back, withdraw, distract yourself? Be honest &mdash; the
                      diary is for your eyes only.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">4. Effectiveness</h4>
                    <p className="text-white text-sm">
                      Did your coping strategy actually help? Rate it 1&ndash;10. Some strategies
                      that feel good in the moment (such as having several pints) may score low on
                      actual effectiveness the next morning.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Practical Tip</p>
                <p className="text-base text-white leading-relaxed">
                  Keep your stress diary in whatever format works for you &mdash; a notes app on
                  your phone, a small notebook in your van, or even voice memos recorded on your
                  drive home. The method matters less than the consistency. Spend five minutes at
                  the end of each day recording the day&rsquo;s entries. After two weeks, review the
                  entire diary and look for patterns: Are certain days worse? Certain types of work?
                  Certain clients? Certain times of day?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Body Awareness */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Body Awareness: Where You Hold Tension
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                Your body is often the first indicator that stress is building &mdash; before you
                consciously recognise it mentally. Learning to tune into your body&rsquo;s signals
                gives you an <strong>early warning system</strong> for stress that allows you to
                intervene before it escalates.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <Activity className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Common Tension Zones
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Neck and shoulders</strong> &mdash; the most
                      common area for stress-related tension. Often worsened in electricians by
                      overhead work and carrying heavy toolbags.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Jaw</strong> &mdash; many people clench their
                      jaw or grind their teeth (bruxism) without realising. This can cause
                      headaches, tooth damage, and facial pain.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Lower back</strong> &mdash; stress-related
                      tension compounds the physical strain of bending, lifting, and working in
                      awkward positions common in electrical work.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Hands and forearms</strong> &mdash;
                      stress-related gripping (holding tools tighter than necessary) combined with
                      repetitive strain from wiring and termination work.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Stomach and gut</strong> &mdash; the gut-brain
                      connection means stress frequently manifests as nausea, appetite changes,
                      digestive issues, or a &ldquo;knot in the stomach&rdquo; feeling.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Quick Body Scan Technique</p>
                <p className="text-base text-white leading-relaxed">
                  Try this right now. Close your eyes for 30 seconds. Starting from the top of your
                  head, slowly scan down through your body: forehead, jaw, neck, shoulders, upper
                  back, arms, hands, chest, stomach, lower back, hips, legs, feet. Notice where you
                  feel tightness, pain, or discomfort. Those are your tension zones. Once you
                  identify them, you can consciously relax those areas throughout the day &mdash;
                  drop your shoulders, unclench your jaw, release your grip. This takes seconds but
                  can significantly reduce accumulated physical tension.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Energy Audit */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Energy Audit: What Drains vs What Energises You
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                An energy audit is a simple but powerful self-assessment tool. By mapping the
                activities, people, and situations in your life according to whether they drain or
                restore your energy, you gain practical insight into how to structure your days for
                maximum resilience.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">How to Conduct an Energy Audit</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">Step 1: List Your Activities</h4>
                    <p className="text-white text-sm">
                      Write down everything you do in a typical week &mdash; work tasks, commuting,
                      socialising, exercising, cooking, watching television, admin, hobbies, chores,
                      shopping, and anything else that takes up your time.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">Step 2: Rate Each Activity</h4>
                    <p className="text-white text-sm">
                      For each activity, rate it from &minus;5 (severely draining) to +5 (highly
                      energising). Be honest. Some activities that you feel you &ldquo;should&rdquo;
                      enjoy may actually drain you, and some tasks you dread may turn out to be less
                      draining than expected.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">Step 3: Analyse the Balance</h4>
                    <p className="text-white text-sm">
                      Look at the overall balance. If your week is dominated by draining activities
                      with few energising ones, your resilience bucket is being emptied faster than
                      it is being filled. Use this information to make strategic adjustments:
                      schedule draining tasks when your energy is highest, follow them with
                      energising activities, and protect time for the things that restore you.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-rose-400/30 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3 text-center text-sm uppercase tracking-wider">
                  Example Energy Audit for an Electrician
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <p className="text-red-400 font-semibold text-sm mb-2">Energy Drains</p>
                    <ul className="text-white text-sm space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>EICR paperwork (&minus;4)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Chasing late payments (&minus;5)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Long commute (&minus;3)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Difficult client discussions (&minus;3)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Tax return preparation (&minus;4)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <p className="text-green-400 font-semibold text-sm mb-2">Energy Sources</p>
                    <ul className="text-white text-sm space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Hands-on installation work (+4)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Completing a job and seeing the result (+5)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Chatting with mates on a commercial job (+3)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Exercise after work (+4)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Learning something new (CPD course) (+3)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Personal Resilience Baseline */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Personal Resilience Baseline
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                A personal resilience baseline is your honest assessment of where you stand right
                now. It is not a test with a pass or fail &mdash; it is a snapshot that gives you a
                starting point for growth. Think of it like taking a &ldquo;before&rdquo; photo at
                the start of a fitness programme. You can revisit your baseline periodically to
                track your progress.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">Baseline Assessment Questions</h3>
                <p className="text-white text-sm mb-3">
                  Answer each honestly, rating yourself 1 (strongly disagree) to 10 (strongly
                  agree):
                </p>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Emotional awareness:</strong> I can usually
                      identify and name what I am feeling when I am stressed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Support network:</strong> I have people I can
                      talk to honestly when things are difficult.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Problem-solving:</strong> When I face a
                      setback, I usually look for practical solutions rather than dwelling on the
                      problem.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Physical health:</strong> I regularly exercise,
                      get adequate sleep, and eat reasonably well.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Financial buffer:</strong> I have some
                      financial reserve that would cover unexpected expenses or a gap in work.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Perspective:</strong> I can usually see
                      setbacks as temporary and specific rather than permanent and all-encompassing.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Help-seeking:</strong> I am willing to ask for
                      help when I need it, without feeling ashamed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Recovery:</strong> After a stressful period, I
                      generally recover within a reasonable time rather than staying stuck in
                      distress.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Key Point</p>
                <p className="text-base text-white leading-relaxed">
                  Your baseline is not a competition. There is no &ldquo;good&rdquo; or
                  &ldquo;bad&rdquo; score &mdash; only an honest starting point. Most people have a
                  mix of higher and lower scores. The areas where you score lowest are your priority
                  targets for resilience building. The areas where you score highest are your
                  existing strengths that you should protect and maintain.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">If You Are Struggling Now</h3>
                </div>
                <p className="text-white text-sm">
                  If completing this baseline assessment makes you realise you are currently
                  struggling significantly, please take action. You do not need to wait until you
                  have completed this course. Speak to someone you trust, contact your GP, or call
                  one of these confidential helplines:{' '}
                  <strong className="text-white">Samaritans: 116 123</strong> (free, 24/7),{' '}
                  <strong className="text-white">
                    Construction Industry Helpline: 0345 605 1956
                  </strong>
                  , <strong className="text-white">Mates in Mind: matesinmind.org</strong>. Reaching
                  out is a resilience skill, not a sign of weakness.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Key Takeaways */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Key Takeaways
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="space-y-3 text-white">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Stress triggers are personal</strong> &mdash; identify yours specifically
                  rather than assuming they are the same as everyone else&rsquo;s
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  A <strong>two-week stress diary</strong> reveals patterns that are invisible in
                  the moment &mdash; triggers, reactions, and which coping strategies actually work
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  Your <strong>body often signals stress before your mind does</strong> &mdash;
                  learn where you hold tension and check in regularly
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  An <strong>energy audit</strong> helps you structure your day strategically
                  &mdash; schedule draining tasks when energy is high, protect time for energising
                  activities
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  Your <strong>resilience baseline</strong> is a starting point, not a judgement
                  &mdash; revisit it periodically to track your progress
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  If self-assessment reveals you are struggling,{' '}
                  <strong>reaching out for support is the most resilient thing you can do</strong>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-rose-500/80 text-sm font-normal">&nbsp;</span>
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

        {/* Quiz Section */}
        <div className="mt-12">
          <Quiz title="Section 4 Knowledge Check" questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-3">
              Next: Module 3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
