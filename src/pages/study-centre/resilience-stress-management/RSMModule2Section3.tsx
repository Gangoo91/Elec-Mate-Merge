import { ArrowLeft, ShieldCheck, CheckCircle, AlertTriangle, Heart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'seven-abilities',
    question:
      'Reivich and Shatte (2002) identified seven resilience abilities. Which of the following is one of them?',
    options: [
      'Physical strength and endurance',
      'Self-efficacy — belief in your ability to manage situations effectively',
      'Financial wealth and material security',
      'Avoidance of all stressful situations',
    ],
    correctIndex: 1,
    explanation:
      'Self-efficacy — the belief in your own ability to manage situations and achieve goals — is one of the seven resilience abilities identified by Reivich and Shatte. The full list is: emotion regulation, impulse control, causal analysis, self-efficacy, realistic optimism, empathy, and reaching out. Each can be developed through deliberate practice.',
  },
  {
    id: 'protective-factors',
    question: 'Which of the following is a protective factor for resilience?',
    options: [
      'Working alone without relying on anyone else',
      'Avoiding all situations that might cause stress',
      'Strong social connections with trusted people',
      'Suppressing negative emotions to maintain a positive appearance',
    ],
    correctIndex: 2,
    explanation:
      'Strong social connections are consistently identified as one of the most powerful protective factors for resilience. Having trusted people you can turn to during difficulty provides emotional support, practical help, and perspective. Working alone and suppressing emotions are actually risk factors that undermine resilience.',
  },
  {
    id: 'bucket-metaphor',
    question: 'In the resilience bucket metaphor, what do protective factors represent?',
    options: [
      'The holes that let stress drain out of the bucket',
      'The water that fills the bucket to the brim',
      'The tap that refills the bucket when it gets low',
      'The material the bucket is made from',
    ],
    correctIndex: 2,
    explanation:
      'In the resilience bucket metaphor, stressors are the holes or drain that empty the bucket (depleting your resilience reserves). Protective factors are the tap that refills it — things like social connections, physical health, financial stability, and coping skills that replenish your capacity to handle adversity. The goal is to keep the bucket fuller than it is empty by maximising your protective factors while managing your stressors.',
  },
];

const faqs = [
  {
    question:
      'What if I score low on most of the seven resilience abilities? Does that mean I have no resilience?',
    answer:
      "No. Everyone has some level of every resilience ability — you are not starting from zero. What Reivich and Shatte's framework provides is a diagnostic tool, not a judgement. If you identify abilities where you are weaker, those become your training priorities. Most people have a mix of strengths and development areas. The important thing is self-awareness: once you know which abilities need work, you can target your efforts effectively. It is similar to identifying areas for improvement in an electrical skills audit — the audit itself is not the problem, it is the starting point for improvement.",
  },
  {
    question:
      'How do I build protective factors if I work alone on domestic jobs most of the time?',
    answer:
      'Isolation is a genuine challenge for many electricians, particularly sole traders working on domestic installations. Practical strategies include: joining a professional body or local trade group (such as NAPIT, NICEIC, or a local electrical contractor association) that holds regular meetings or social events; using online communities and forums for electricians to maintain connection with peers; scheduling regular social contact outside of work (even a weekly phone call with a mate in the trade counts); working on larger jobs or subcontracting occasionally to maintain workplace relationships; and investing in your physical health through regular exercise, which doubles as both a protective factor and a social opportunity. The key is to be deliberate about building connection — it will not happen passively when you work alone.',
  },
  {
    question: 'My biggest risk factor is debt. How does that connect to resilience?',
    answer:
      'Financial stress is one of the most potent risk factors for reduced resilience. Debt creates a constant background level of anxiety that depletes your resilience reserves — meaning you have less capacity to cope with additional stressors when they arise. It also limits your options (you cannot afford to turn down poor work, take time off when unwell, or invest in training), creating a cycle where financial stress leads to decisions that generate more stress. Building financial resilience through even small steps — such as setting up a modest emergency fund, getting advice from a debt charity like StepChange, or reviewing your pricing to ensure you are charging fairly — directly strengthens your overall resilience. Financial wellbeing and mental wellbeing are deeply interconnected.',
  },
  {
    question:
      'Can protective factors compensate for risk factors, or do I need to eliminate all risk factors?',
    answer:
      'Protective factors can absolutely compensate for risk factors — you do not need to eliminate every source of stress in your life (which would be impossible anyway). The resilience bucket metaphor illustrates this clearly: if your bucket has some holes (risk factors draining it), you can keep the bucket full by ensuring the tap (protective factors filling it) flows faster than the drain. In practice, this means that an electrician who has financial stress (a risk factor) but also has strong friendships, good physical health, and effective problem-solving skills (protective factors) may be more resilient overall than someone with no financial stress but who is isolated, physically unwell, and tends to avoid problems.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'How many resilience abilities did Reivich and Shatte (2002) identify?',
    options: ['Three', 'Five', 'Seven', 'Ten'],
    correctAnswer: 2,
    explanation:
      'Reivich and Shatte identified seven resilience abilities: emotion regulation, impulse control, causal analysis, self-efficacy, realistic optimism, empathy, and reaching out. Each of these can be assessed and deliberately developed through practice and training.',
  },
  {
    id: 2,
    question:
      'Which of the following is the best definition of "emotion regulation" as a resilience ability?',
    options: [
      'Never showing any emotion in professional settings',
      'The ability to manage your emotional responses so they are proportionate and do not overwhelm you',
      'Suppressing all negative emotions and only expressing positive ones',
      "Controlling other people's emotional reactions to prevent conflict",
    ],
    correctAnswer: 1,
    explanation:
      'Emotion regulation is the ability to manage your emotional responses so they are appropriate to the situation and do not overwhelm your capacity to think and act effectively. It does NOT mean suppressing emotions — it means experiencing them without being controlled by them. An electrician with good emotion regulation might feel frustrated by a difficult client but manage that frustration without it affecting their work quality or professional behaviour.',
  },
  {
    id: 3,
    question: 'What does "causal analysis" mean in the context of resilience?',
    options: [
      'Blaming other people for everything that goes wrong',
      'The ability to accurately identify the causes of problems without over-simplifying',
      'Ignoring the causes of problems and focusing only on solutions',
      "Analysing the causes of other people's problems while ignoring your own",
    ],
    correctAnswer: 1,
    explanation:
      'Causal analysis is the ability to accurately identify the real causes of problems without oversimplifying, overgeneralising, or automatically blaming yourself or others. Good causal analysis leads to more effective problem-solving because you are addressing the actual causes rather than surface symptoms or incorrect assumptions.',
  },
  {
    id: 4,
    question: 'Which of the following is a risk factor that depletes resilience?',
    options: [
      'Having a trusted group of friends and colleagues',
      'Regular physical exercise and adequate sleep',
      'Social isolation and working alone without meaningful connection',
      'Having a clear sense of purpose in your work',
    ],
    correctAnswer: 2,
    explanation:
      'Social isolation is a significant risk factor for reduced resilience. When you lack meaningful connections with others, you miss out on emotional support, practical help, different perspectives, and the sense of belonging that helps buffer against stress. The other options are all protective factors that strengthen resilience.',
  },
  {
    id: 5,
    question:
      'In the resilience bucket metaphor, what happens when stressors exceed protective factors?',
    options: [
      'The bucket becomes stronger and more durable',
      'The bucket empties — your resilience reserves are depleted and you become vulnerable to breakdown',
      'The bucket overflows, which is a sign of excessive resilience',
      'Nothing happens — the bucket remains unchanged regardless of stressors',
    ],
    correctAnswer: 1,
    explanation:
      'When stressors (the drain) exceed protective factors (the tap), the bucket empties. This represents depleted resilience reserves — a state where you are more vulnerable to mental health difficulties, burnout, and breakdown. The goal is to keep the bucket at least partially full by maintaining and strengthening your protective factors while managing your stressors.',
  },
  {
    id: 6,
    question:
      'Why is "reaching out" considered a resilience ability rather than a sign of weakness?',
    options: [
      'Because asking for help means you can delegate your problems to someone else',
      'Because reaching out requires self-awareness, courage, and the ability to use social resources effectively',
      'Because reaching out is only done by people who have been formally diagnosed with mental health conditions',
      'Because reaching out is the same as complaining, which relieves stress',
    ],
    correctAnswer: 1,
    explanation:
      'Reaching out is classified as a resilience ability because it requires multiple strengths: the self-awareness to recognise when you need help, the courage to ask for it (especially in cultures where this is stigmatised), and the interpersonal skills to use social resources effectively. Far from being a sign of weakness, it is one of the most important resilience skills you can develop.',
  },
  {
    id: 7,
    question:
      'An electrician who has a strong mate network, good physical health, and solid problem-solving skills but is under financial pressure from late-paying clients. According to the resilience model, this person:',
    options: [
      'Has zero resilience because they have a risk factor',
      'Is fully resilient because their protective factors outnumber their risk factors',
      'Has resilience that is being partially depleted by a risk factor but supported by multiple protective factors',
      'Should ignore the financial pressure because their other factors compensate for it',
    ],
    correctAnswer: 2,
    explanation:
      'Resilience is a balance between protective factors and risk factors. This electrician has strong protective factors (social connections, health, problem-solving) that help buffer the impact of their risk factor (financial pressure). They are not immune to stress, but they have resources to draw upon. The financial pressure should still be addressed — protective factors compensate but do not eliminate the need to manage stressors.',
  },
  {
    id: 8,
    question: 'Which statement about protective factors and risk factors is most accurate?',
    options: [
      'Protective factors are fixed at birth and cannot be developed',
      'Risk factors are always permanent and cannot be reduced',
      'Both protective factors and risk factors can change over time, and individuals can actively strengthen protective factors',
      'You need to eliminate all risk factors before protective factors have any effect',
    ],
    correctAnswer: 2,
    explanation:
      'Both protective factors and risk factors are dynamic — they change over time in response to circumstances, choices, and deliberate effort. You can actively strengthen your protective factors (by building social connections, improving physical health, developing coping skills) and reduce some risk factors (by addressing debt, reducing isolation, seeking help for substance misuse). You do not need to eliminate all risk factors first — building protective factors in parallel is both valid and effective.',
  },
];

export default function RSMModule2Section3() {
  useSEO({
    title: 'Resilience Factors & Protective Resources | RSM Module 2.3',
    description:
      "Learn about Reivich and Shatte's seven resilience abilities, protective factors, risk factors, and the resilience bucket metaphor — with practical construction industry examples.",
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
          <ShieldCheck className="h-10 w-10 text-rose-400 mx-auto mb-4" />
          <span className="inline-block bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 3
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Resilience Factors &amp; Protective Resources
          </h1>
          <p className="text-white max-w-xl mx-auto">
            The seven resilience abilities, protective and risk factors, and the resilience bucket
            metaphor &mdash; with real examples from the electrical trade
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
                    <strong className="text-white">7 abilities:</strong> Emotion regulation, impulse
                    control, causal analysis, self-efficacy, realistic optimism, empathy, reaching
                    out.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Protective factors:</strong> Social connections,
                    sense of purpose, problem-solving, physical health, financial stability.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Risk factors:</strong> Isolation, poor health,
                    substance misuse, debt, relationship breakdown, previous trauma.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Bucket metaphor:</strong> Stressors drain your
                    bucket; protective factors refill it.
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
                    <strong className="text-white">Diagnosis:</strong> Understanding your specific
                    protective and risk factors tells you exactly where to focus your efforts.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Balance:</strong> Resilience is the balance
                    between what drains you and what sustains you &mdash; both can be managed.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Action:</strong> Each ability and each protective
                    factor is a concrete target for improvement.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Trade-specific:</strong> Sparky-specific examples
                    make these concepts directly applicable to your working life.
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
              <span>Name and describe Reivich and Shatte&rsquo;s seven resilience abilities</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>Identify at least six protective factors that strengthen resilience</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>Identify at least six risk factors that deplete resilience</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>Explain the resilience bucket metaphor and how it applies to daily life</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>Assess your own balance of protective and risk factors honestly</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Describe how protective and risk factors present differently for electricians
                compared to other professions
              </span>
            </li>
          </ul>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Seven Resilience Abilities */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Seven Resilience Abilities
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                Psychologists Karen Reivich and Andrew Shatte, in their 2002 book{' '}
                <em>The Resilience Factor</em>, identified seven distinct abilities that together
                form the foundation of resilience. These are not abstract personality traits &mdash;
                they are specific, trainable skills that anyone can develop with practice.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <ShieldCheck className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Seven Resilience Abilities
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">1. Emotion Regulation</h4>
                    <p className="text-white text-sm">
                      The ability to manage your emotional responses so they are proportionate to
                      the situation and do not overwhelm your capacity to think and act. This is not
                      about suppressing emotions &mdash; it is about experiencing them without being
                      controlled by them.
                    </p>
                    <p className="text-white text-sm mt-1">
                      <strong className="text-white">Trade example:</strong> Staying calm and
                      professional when a client unfairly blames you for a delay caused by the
                      builder.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">2. Impulse Control</h4>
                    <p className="text-white text-sm">
                      The ability to resist the urge to act on your first emotional reaction and
                      instead respond thoughtfully. Closely linked to emotion regulation, but
                      specifically about the gap between feeling and action.
                    </p>
                    <p className="text-white text-sm mt-1">
                      <strong className="text-white">Trade example:</strong> Resisting the urge to
                      walk off a job when a main contractor speaks to you disrespectfully, and
                      instead addressing it calmly.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">3. Causal Analysis</h4>
                    <p className="text-white text-sm">
                      The ability to accurately identify the real causes of problems without
                      oversimplifying, overgeneralising, or defaulting to self-blame. Good causal
                      analysis leads to more effective problem-solving.
                    </p>
                    <p className="text-white text-sm mt-1">
                      <strong className="text-white">Trade example:</strong> Analysing why an EICR
                      took twice as long as quoted, identifying that the property had undocumented
                      alterations, rather than concluding &ldquo;I&rsquo;m too slow.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">4. Self-Efficacy</h4>
                    <p className="text-white text-sm">
                      The belief in your own ability to solve problems and manage situations
                      effectively. Self-efficacy is built through mastery experiences &mdash; each
                      time you successfully handle a challenge, your self-efficacy increases.
                    </p>
                    <p className="text-white text-sm mt-1">
                      <strong className="text-white">Trade example:</strong> Confidence in your
                      ability to diagnose a complex fault because you have successfully diagnosed
                      similar faults before.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">5. Realistic Optimism</h4>
                    <p className="text-white text-sm">
                      The ability to maintain a positive outlook that is grounded in reality. This
                      is not blind optimism (&ldquo;everything will be fine&rdquo;) but a belief
                      that positive outcomes are achievable through effort and good judgement.
                    </p>
                    <p className="text-white text-sm mt-1">
                      <strong className="text-white">Trade example:</strong> Believing you can build
                      a successful business while also acknowledging that it will require hard work,
                      financial planning, and continuous learning.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">6. Empathy</h4>
                    <p className="text-white text-sm">
                      The ability to understand and share the feelings of others. Empathy
                      strengthens relationships, improves communication, and helps you build the
                      social connections that are vital for resilience.
                    </p>
                    <p className="text-white text-sm mt-1">
                      <strong className="text-white">Trade example:</strong> Recognising that a
                      colleague who is unusually snappy might be struggling with something rather
                      than just being difficult.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">7. Reaching Out</h4>
                    <p className="text-white text-sm">
                      The willingness and ability to seek help, support, and new experiences. This
                      includes asking for practical help, emotional support, mentoring, and taking
                      on new challenges that stretch your capabilities.
                    </p>
                    <p className="text-white text-sm mt-1">
                      <strong className="text-white">Trade example:</strong> Asking a more
                      experienced electrician for advice on a complex installation you have not
                      encountered before, rather than bluffing through it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Protective Factors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Protective Factors
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                Protective factors are the resources, relationships, and personal qualities that
                buffer you against the negative effects of stress and adversity. They do not prevent
                stressful events from happening, but they increase your capacity to cope with them
                when they do.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <Heart className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Key Protective Factors
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Strong social connections</strong> &mdash;
                      trusted friends, family, colleagues, or mentors you can talk to honestly. This
                      is consistently identified as the single most powerful protective factor.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Sense of purpose</strong> &mdash; feeling that
                      your work and life have meaning. For electricians, this might include pride in
                      your craft, keeping people safe, or providing for your family.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Problem-solving skills</strong> &mdash; the
                      ability to identify solutions and take practical action. Electricians
                      generally have strong technical problem-solving skills that can be applied to
                      personal challenges too.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Self-awareness</strong> &mdash; understanding
                      your own emotional states, triggers, and patterns. Knowing yourself well
                      allows you to intervene early before stress escalates.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Physical health</strong> &mdash; regular
                      exercise, adequate sleep, and good nutrition. Physical and mental health are
                      deeply interconnected &mdash; poor physical health directly undermines
                      resilience.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Financial stability</strong> &mdash; even a
                      modest emergency fund reduces background financial anxiety and gives you
                      options when things go wrong.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Construction Example: The Power of a Mate Network
                </p>
                <p className="text-base text-white leading-relaxed">
                  Consider two electricians facing the same stressor &mdash; a major contract
                  falling through. The first has a strong mate network: three or four trusted
                  colleagues in the trade who share leads, lend tools, and check in on each other
                  regularly. Within a week, one of them has put work their way. The second
                  electrician works entirely alone, has no trade contacts, and has no one to talk to
                  about the situation. Same stressor, vastly different outcomes &mdash; not because
                  of different levels of skill, but because of different protective factors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03: Risk Factors */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Risk Factors
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                Risk factors are the circumstances, experiences, and behaviours that deplete your
                resilience reserves and make you more vulnerable to the negative effects of stress.
                Having risk factors does not mean you lack resilience &mdash; it means you are
                working with a harder hand and may need to be more deliberate about building
                protective factors.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <AlertTriangle className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Common Risk Factors
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Social isolation</strong> &mdash; working
                      alone, living alone, lack of meaningful social connections. Particularly
                      common among sole-trader electricians working on domestic jobs.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Poor physical health</strong> &mdash; chronic
                      pain, lack of exercise, poor diet, inadequate sleep. Physical demands of the
                      trade can lead to musculoskeletal problems that erode resilience over time.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Substance misuse</strong> &mdash; using
                      alcohol, drugs, or excessive caffeine to cope with stress. This creates a
                      cycle where the coping mechanism itself becomes a source of additional
                      problems.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Debt and financial pressure</strong> &mdash;
                      outstanding debts, living payday to payday, no financial buffer for
                      emergencies. Extremely common in construction due to late payments and
                      contract gaps.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Relationship breakdown</strong> &mdash;
                      separation, divorce, family conflict. The long hours and physical demands of
                      construction work can put significant strain on personal relationships.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Previous trauma</strong> &mdash; unresolved
                      experiences from the past that continue to affect your emotional wellbeing and
                      ability to cope with new stressors.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">Risk Factor Accumulation</h3>
                </div>
                <p className="text-white text-sm">
                  Risk factors rarely appear in isolation. Financial pressure can lead to
                  relationship strain, which leads to isolation, which leads to substance misuse as
                  a coping mechanism, which leads to poorer physical health, which leads to reduced
                  ability to work, which worsens financial pressure. This cascading effect is why
                  early intervention matters so much. Addressing even one risk factor &mdash; before
                  the cascade starts &mdash; can prevent the others from developing.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Construction Example: Financial Buffer vs Payday to Payday
                </p>
                <p className="text-base text-white leading-relaxed">
                  Consider two electricians who both lose the same contract. One has three
                  months&rsquo; expenses saved as an emergency fund. They feel stressed but not
                  panicked &mdash; they have time to find the right next opportunity without
                  accepting any work out of desperation. The other electrician lives payday to
                  payday with an overdraft and a credit card close to its limit. The same event
                  triggers a financial crisis &mdash; they cannot pay their mortgage next month,
                  cannot afford fuel for the van, and feel trapped. Same stressor, completely
                  different impact &mdash; determined entirely by one protective factor.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: The Resilience Bucket Metaphor */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            The Resilience Bucket Metaphor
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                One of the most useful ways to think about resilience is the{' '}
                <strong>bucket metaphor</strong>. Imagine your resilience as water in a bucket.
                Stressors are the holes or drain that let water out. Protective factors are the tap
                that refills it. Your overall resilience at any given moment depends on the balance
                between what is draining the bucket and what is filling it.
              </p>

              <div className="bg-white/5 border border-rose-400/30 p-4 sm:p-6 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-4 text-center text-sm uppercase tracking-wider">
                  The Resilience Bucket
                </h3>
                <div className="grid sm:grid-cols-3 gap-4 text-center">
                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4">
                    <p className="text-rose-400 font-bold text-lg mb-2">Drains</p>
                    <p className="text-white text-xs">
                      Work stress, financial pressure, isolation, poor sleep, conflict, health
                      problems, substance misuse
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/20 rounded-lg p-4">
                    <p className="text-white font-bold text-lg mb-2">Your Bucket</p>
                    <p className="text-white text-xs">
                      Current resilience level &mdash; fluctuates daily based on the balance between
                      drains and fills
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <p className="text-green-400 font-bold text-lg mb-2">Fills</p>
                    <p className="text-white text-xs">
                      Social connection, exercise, good sleep, sense of purpose, hobbies, financial
                      stability, self-care
                    </p>
                  </div>
                </div>
                <p className="text-white text-xs text-center mt-4 italic">
                  When the bucket is full, you handle stress well. When it empties, you become
                  vulnerable to burnout and breakdown.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Key Point</p>
                <p className="text-base text-white leading-relaxed">
                  The bucket metaphor explains why the same event can feel manageable one week and
                  overwhelming the next. If your bucket is nearly full (you are well-rested,
                  socially connected, financially stable, and physically healthy), a stressful event
                  drains some water but leaves plenty in reserve. If your bucket is already nearly
                  empty (you are sleep-deprived, isolated, and under financial pressure), the same
                  event can empty it completely. This is why self-care is not selfish &mdash; it is
                  strategic resilience maintenance.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-2">
                  <Users className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Daily Bucket Management
                </h3>
                <p className="text-white text-sm mb-3">
                  The practical application of the bucket metaphor is simple: monitor your bucket
                  level and take action before it gets too low. Ask yourself regularly:
                </p>
                <ul className="text-white text-sm space-y-1.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>How full does my bucket feel right now? (Rate it 1-10)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>What is currently draining it the most?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>What could I do today to refill it, even a little?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>Am I neglecting any of my protective factors?</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Key Takeaways */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Key Takeaways
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="space-y-3 text-white">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  Resilience consists of <strong>seven specific, trainable abilities</strong> that
                  you can assess and deliberately develop
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Protective factors</strong> (social connections, purpose, health,
                  financial stability) act as a buffer against stress
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Risk factors</strong> (isolation, debt, poor health, substance misuse)
                  deplete your resilience reserves
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  The <strong>resilience bucket</strong> metaphor: stressors drain it, protective
                  factors refill it &mdash; the balance determines your capacity to cope
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  Protective factors can <strong>compensate for risk factors</strong> &mdash; you do
                  not need to eliminate every stressor
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Self-care is strategic</strong>, not selfish &mdash; maintaining your
                  protective factors is resilience maintenance
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
          <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />
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
            <Link to="../rsm-module-2-section-4">
              Next: Self-Assessment
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
