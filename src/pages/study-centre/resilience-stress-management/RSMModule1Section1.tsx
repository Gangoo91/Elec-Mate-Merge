import { ArrowLeft, Brain, CheckCircle, AlertTriangle, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'rsm-1-1-selye-gas',
    question:
      "In Hans Selye's General Adaptation Syndrome, what happens during the Exhaustion stage?",
    options: [
      'The body first detects the stressor and triggers the fight-or-flight response',
      'The body adapts to the stressor and appears to cope normally',
      "The body's resources are depleted, resistance drops, and physical or mental breakdown can occur",
      'The brain releases endorphins that create a feeling of euphoria and invincibility',
    ],
    correctIndex: 2,
    explanation:
      "In Selye's General Adaptation Syndrome, the Exhaustion stage occurs when prolonged stress depletes the body's adaptive resources. The person can no longer maintain resistance, and physical or mental breakdown becomes likely. This is the stage most associated with burnout, chronic fatigue, and stress-related illness. In construction, this is the electrician who has been working 60-hour weeks for months and suddenly cannot function.",
  },
  {
    id: 'rsm-1-1-eustress-distress',
    question:
      'An electrician feels a rush of energy and focus as they prepare for their AM2 practical assessment. This is an example of:',
    options: [
      'Distress \u2014 because all stress is harmful to the body',
      'Eustress \u2014 positive stress that enhances performance and motivation',
      'The Exhaustion stage of General Adaptation Syndrome',
      'A maladaptive coping response that should be suppressed',
    ],
    correctIndex: 1,
    explanation:
      "This is eustress \u2014 positive stress. The energy, focus, and heightened alertness the electrician feels before their AM2 assessment is the body's stress response working as intended: sharpening concentration, increasing motivation, and enhancing performance. Eustress is characterised by feeling challenged but capable, excited rather than threatened. The key difference from distress is that the person perceives the stressor as something they can handle and the outcome as potentially positive.",
  },
  {
    id: 'rsm-1-1-lazarus-appraisal',
    question:
      "In Lazarus and Folkman's Transactional Model, what determines whether a person experiences stress?",
    options: [
      'The severity of the stressor alone \u2014 bigger problems always cause more stress',
      "The person's genetic predisposition to anxiety and worry",
      "The interaction between the person's appraisal of the threat and their appraisal of their coping resources",
      'The number of stressors present at any one time, regardless of type',
    ],
    correctIndex: 2,
    explanation:
      'Lazarus and Folkman\'s Transactional Model is fundamentally about appraisal. Stress does not come from the event alone \u2014 it comes from how the person evaluates the event (primary appraisal: "Is this a threat?") and how they evaluate their ability to cope (secondary appraisal: "Do I have the resources to deal with this?"). This is why the same event \u2014 such as a surprise EICR inspection \u2014 can be stressful for one electrician and routine for another. It depends on their appraisal.',
  },
];

const faqs = [
  {
    question: 'Is all stress bad for you?',
    answer:
      'No. This is one of the most common misconceptions about stress. Hans Selye himself distinguished between eustress (positive stress) and distress (negative stress). Eustress is the energy and focus you feel when you are challenged but believe you can succeed \u2014 the buzz before an AM2 assessment, the motivation to finish a rewire before the client returns, the alertness that keeps you safe when working on a live board. Without any stress at all, you would be lethargic, unfocused, and unmotivated. The goal is not to eliminate stress \u2014 it is to manage it so that you experience more eustress and less distress.',
  },
  {
    question: 'What is the difference between acute stress and chronic stress?',
    answer:
      "Acute stress is short-term and specific \u2014 it is triggered by a particular event and subsides once the event passes. Examples include the jolt of alarm when a cable sparks, the pressure of a tight deadline for a specific job, or the nerves before a competency assessment. Your body activates the stress response, you deal with the situation, and then you recover. Chronic stress is long-term and persistent \u2014 it does not go away. Examples include ongoing financial insecurity from self-employment, months of excessive overtime, constant worry about job security, or a persistently difficult relationship with a site manager. Chronic stress is far more damaging because the body never gets a chance to recover, leading to the Exhaustion stage of Selye's GAS model.",
  },
  {
    question: 'Why do different people react differently to the same stressor?',
    answer:
      "Lazarus and Folkman's Transactional Model explains this. Stress is not determined by the event alone \u2014 it is determined by the interaction between the event and the person's appraisal of it. Two electricians can face the same situation (for example, a surprise visit from the building inspector) and have completely different stress responses. One might feel calm and confident because they know their work is to standard and they have experience dealing with inspectors (positive appraisal of coping resources). The other might panic because they are unsure about their work quality and have never dealt with an inspector alone (negative appraisal of coping resources). Factors that influence appraisal include experience, training, self-confidence, past successes and failures, social support, and current mental state.",
  },
  {
    question: 'Can stress actually make you ill?',
    answer:
      "Yes. Prolonged chronic stress has well-documented physical health consequences. When the stress response is activated continuously, elevated cortisol levels suppress the immune system, increase blood pressure, and disrupt digestion. Research links chronic stress to cardiovascular disease, weakened immune function, digestive disorders (such as irritable bowel syndrome), chronic pain conditions, sleep disorders, and mental health conditions including anxiety and depression. In Selye's model, this corresponds to the Exhaustion stage. The body simply cannot sustain the heightened stress response indefinitely. This is why managing stress is not a luxury or a sign of weakness \u2014 it is a genuine health necessity, especially in a physically demanding industry like construction.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Hans Selye's General Adaptation Syndrome describes stress as a three-stage process. What is the correct order of these stages?",
    options: [
      'Resistance, Alarm, Exhaustion',
      'Alarm, Resistance, Exhaustion',
      'Exhaustion, Alarm, Resistance',
      'Alarm, Exhaustion, Resistance',
    ],
    correctAnswer: 1,
    explanation:
      "Selye's GAS model describes three stages in order: (1) Alarm \u2014 the body detects the stressor and activates the fight-or-flight response; (2) Resistance \u2014 the body adapts and attempts to cope with the ongoing stressor; (3) Exhaustion \u2014 the body's resources are depleted, resistance collapses, and physical or mental breakdown can occur. Understanding this sequence helps you recognise when you or a colleague might be moving from coping (Resistance) to struggling (Exhaustion).",
  },
  {
    id: 2,
    question: 'Which of the following is an example of eustress in a construction context?',
    options: [
      'An apprentice feeling sick with worry for weeks about failing their end-of-year assessment',
      'An electrician feeling energised and focused while racing to finish a rewire before the plasterers arrive',
      'A site manager unable to sleep because of ongoing disputes with a difficult client',
      'A self-employed sparky constantly worrying about where the next job will come from',
    ],
    correctAnswer: 1,
    explanation:
      'Eustress is positive, motivating stress that enhances performance. The electrician feeling energised and focused to meet a short-term, manageable deadline is experiencing eustress \u2014 the challenge is clear, the timeframe is finite, and the person feels capable of meeting it. The other options describe distress: prolonged worry, sleep disruption, and chronic anxiety \u2014 all characterised by feeling overwhelmed rather than challenged.',
  },
  {
    id: 3,
    question:
      "In Lazarus and Folkman's Transactional Model, what happens during primary appraisal?",
    options: [
      'The person evaluates whether they have the resources to cope with the stressor',
      'The person evaluates whether the event is irrelevant, benign-positive, or stressful (threat, challenge, or harm/loss)',
      'The person chooses a coping strategy such as problem-focused or emotion-focused coping',
      'The body automatically releases cortisol and adrenaline into the bloodstream',
    ],
    correctAnswer: 1,
    explanation:
      'In the Transactional Model, primary appraisal is the first evaluation: "What does this event mean for me?" The person assesses whether the event is irrelevant (no personal significance), benign-positive (beneficial), or stressful (a threat, a challenge, or a harm/loss). Only if the event is appraised as stressful does the person proceed to secondary appraisal, where they evaluate their coping resources. This two-stage appraisal process explains why the same event can provoke different stress responses in different people.',
  },
  {
    id: 4,
    question:
      'During the fight-or-flight response, which hormone is primarily responsible for the immediate surge of energy and alertness?',
    options: ['Melatonin', 'Serotonin', 'Adrenaline (epinephrine)', 'Oxytocin'],
    correctAnswer: 2,
    explanation:
      'Adrenaline (also called epinephrine) is the hormone primarily responsible for the immediate fight-or-flight response. Released by the adrenal glands, it increases heart rate, blood pressure, and energy supplies within seconds. Cortisol, often called the "stress hormone," plays a longer-term role in maintaining the stress response. Melatonin regulates sleep, serotonin affects mood, and oxytocin is associated with social bonding.',
  },
  {
    id: 5,
    question:
      'An experienced electrician has just failed an EICR on a property they inspected, and the client is furious. According to Lazarus and Folkman, their stress level will depend MOST on:',
    options: [
      'How loud the client shouts at them',
      'Whether their van is parked nearby for a quick escape',
      'Their appraisal of the threat and their perceived ability to cope with the situation',
      'The exact number of defects identified in the EICR report',
    ],
    correctAnswer: 2,
    explanation:
      'According to the Transactional Model, stress is determined by the interaction between how the person appraises the event (primary appraisal: "How serious is this threat to me?") and how they appraise their coping resources (secondary appraisal: "Can I handle this?"). An electrician who has dealt with difficult clients before and knows they can explain the findings calmly will experience less stress than one who is new to this situation and doubts their ability to manage the confrontation. The objective details matter less than the subjective appraisal.',
  },
  {
    id: 6,
    question: 'The "freeze" response in the fight-flight-freeze model is characterised by:',
    options: [
      'Feeling energised and ready to confront the threat head-on',
      'Running away from the threat as quickly as possible',
      'Becoming immobilised, unable to make decisions or take action, feeling "stuck"',
      'Feeling calm, relaxed, and indifferent to the threat',
    ],
    correctAnswer: 2,
    explanation:
      'The freeze response is the third option in the fight-flight-freeze model. When neither fighting nor fleeing seems possible or appropriate, the nervous system can trigger a freeze response: the person becomes immobilised, mentally "stuck," unable to make decisions or take action. On a construction site, this might look like an apprentice who freezes when they accidentally cause a short circuit, standing motionless instead of acting. Understanding the freeze response is important because people in this state are not being lazy or incompetent \u2014 their nervous system has temporarily overwhelmed their capacity to respond.',
  },
  {
    id: 7,
    question:
      'Which stage of Selye\'s General Adaptation Syndrome most closely corresponds to "burnout" in a construction worker?',
    options: [
      'The Alarm stage',
      'The Resistance stage',
      'The Exhaustion stage',
      "None \u2014 burnout is unrelated to Selye's model",
    ],
    correctAnswer: 2,
    explanation:
      "Burnout most closely corresponds to the Exhaustion stage. After prolonged stress during the Resistance stage (where the person appears to be coping), the body's adaptive resources become depleted. The person can no longer maintain their resistance to the stressor, leading to physical exhaustion, emotional depletion, reduced professional efficacy, and health breakdown \u2014 all hallmarks of burnout. This is why recognising the signs of chronic stress early (during Resistance) is so important: intervention at that point can prevent the progression to Exhaustion and burnout.",
  },
  {
    id: 8,
    question: 'Which of the following statements about stress is MOST accurate?',
    options: [
      'Stress is always harmful and should be avoided completely',
      'Stress is a purely psychological phenomenon with no physical effects',
      'Stress is a natural physiological and psychological response that can be positive (eustress) or negative (distress) depending on context and appraisal',
      'Stress only affects people who are mentally weak or emotionally fragile',
    ],
    correctAnswer: 2,
    explanation:
      'Stress is a natural, universal human response involving both physiological changes (hormone release, increased heart rate, muscle tension) and psychological processes (appraisal, coping). It can be positive (eustress) when it enhances performance and motivation, or negative (distress) when it overwhelms coping resources. It is not always harmful, not purely psychological, and not a sign of weakness. Understanding stress accurately is the first step towards managing it effectively.',
  },
];

export default function RSMModule1Section1() {
  useSEO({
    title: 'What Is Stress? | Resilience & Stress Management Module 1.1',
    description:
      "Understand the science of stress: Selye's General Adaptation Syndrome, eustress vs distress, Lazarus & Folkman's Transactional Model, and the fight-flight-freeze response in construction contexts.",
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
            <Link to="../rsm-module-1">
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
            <Brain className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            What Is Stress?
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            The science behind stress, how your body responds to pressure, and why the same event
            can feel thrilling for one person and terrifying for another
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Stress:</strong> A natural physiological and psychological response to
                perceived demands
              </li>
              <li>
                <strong>Eustress:</strong> Positive stress that sharpens focus and boosts
                performance
              </li>
              <li>
                <strong>Distress:</strong> Negative stress that overwhelms coping resources
              </li>
              <li>
                <strong>Key insight:</strong> Stress is not the event &mdash; it is your appraisal
                of the event
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Safety:</strong> Stress impairs concentration and causes mistakes on site
              </li>
              <li>
                <strong>Health:</strong> Chronic stress damages the body and mind over time
              </li>
              <li>
                <strong>Performance:</strong> Understanding stress helps you harness it, not fear it
              </li>
              <li>
                <strong>Colleagues:</strong> Recognising stress in others could save a life
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Describe Selye's General Adaptation Syndrome and its three stages",
              'Distinguish between eustress (positive stress) and distress (negative stress)',
              "Explain Lazarus and Folkman's Transactional Model of stress appraisal",
              'Describe the fight-flight-freeze response and its physiological basis',
              'Apply stress theory to real construction scenarios and examples',
              'Recognise why the same event can produce different stress responses in different people',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Defining Stress */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Defining Stress &mdash; More Than Just &ldquo;Feeling Pressured&rdquo;
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Stress is one of the most misunderstood words in everyday language. People use it to
                describe everything from mild annoyance to crippling anxiety, which makes it
                difficult to talk about precisely. In this course, we need a clear, working
                definition.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Working Definition</p>
                <p className="text-base text-white leading-relaxed">
                  <strong>
                    &ldquo;Stress is the body&rsquo;s non-specific response to any demand placed
                    upon it.&rdquo;
                  </strong>
                </p>
                <p className="text-sm text-white mt-2">
                  &mdash; Hans Selye (1956), the &ldquo;father of stress research&rdquo;
                </p>
              </div>

              <p>
                This definition is important because it highlights two key points. First, stress is
                a <strong>response</strong> &mdash; it is what happens inside you, not the external
                event itself. The traffic jam, the angry client, the failed test result &mdash;
                these are <strong>stressors</strong> (the triggers). Stress is your body&rsquo;s
                reaction to those triggers. Second, the response is <strong>non-specific</strong>{' '}
                &mdash; meaning your body reacts in broadly the same way regardless of whether the
                stressor is physical (lifting heavy cable drums all day), psychological (worrying
                about a competency assessment), or social (conflict with a colleague on site).
              </p>

              <p>
                For electricians and construction workers, this distinction matters. The body does
                not distinguish between the physical stress of working overhead in a ceiling void
                for hours and the psychological stress of worrying about whether an EICR will pass.
                Both activate the same stress response system, and both deplete the same
                physiological resources. This is why a person who is under <em>psychological</em>{' '}
                stress often feels physically exhausted, and why someone under <em>physical</em>{' '}
                stress often feels mentally drained.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Key Terms</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Stressor</strong> &mdash; the external event or
                      demand that triggers the stress response. Examples: a tight deadline, a
                      confrontation with a site manager, working at height, financial uncertainty.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Stress response</strong> &mdash; the
                      body&rsquo;s physiological and psychological reaction to the stressor. This
                      includes hormone release, increased heart rate, muscle tension, and changes in
                      thinking and emotion.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Strain</strong> &mdash; the cumulative negative
                      effect of prolonged or excessive stress on the body and mind. Think of strain
                      as the damage that occurs when stress is not managed effectively over time.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Selye's General Adaptation Syndrome */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Selye&rsquo;s General Adaptation Syndrome (1956)
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Hungarian-Canadian endocrinologist <strong>Hans Selye</strong> was the first
                scientist to describe the body&rsquo;s systematic response to sustained stress. His{' '}
                <strong>General Adaptation Syndrome (GAS)</strong> model, published in 1956, remains
                one of the most influential frameworks in stress science. It describes how the body
                responds to any prolonged stressor through three predictable stages.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">The Three Stages of GAS</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white font-medium mb-1">Stage 1: Alarm</p>
                    <p className="text-sm text-white">
                      The body detects the stressor and immediately activates the{' '}
                      <strong className="text-white">fight-or-flight response</strong>. The
                      sympathetic nervous system triggers the release of adrenaline and cortisol.
                      Heart rate increases, blood pressure rises, muscles tense, breathing quickens,
                      and non-essential functions (digestion, immune response) are temporarily
                      suppressed. The body is preparing for immediate action. On a construction
                      site, this is the jolt you feel when a cable unexpectedly sparks, when you
                      hear a shout of &ldquo;STOP!&rdquo; from a colleague, or when you realise the
                      isolation has failed.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white font-medium mb-1">Stage 2: Resistance</p>
                    <p className="text-sm text-white">
                      If the stressor persists, the body attempts to adapt. The initial alarm
                      response subsides, and the body enters a prolonged state of heightened
                      readiness. Cortisol levels remain elevated to maintain energy, and the body
                      appears to be coping. Externally, the person may seem fine &mdash; they are
                      still functioning, still working, still meeting deadlines. But internally,
                      resources are being consumed at an unsustainable rate. Think of the
                      electrician who has been working 12-hour days for six weeks straight: they are
                      still getting the work done, but they are running on reserves. They may not
                      even realise how depleted they are becoming.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white font-medium mb-1">Stage 3: Exhaustion</p>
                    <p className="text-sm text-white">
                      If the stressor continues beyond the body&rsquo;s capacity to adapt,
                      exhaustion sets in. The body&rsquo;s adaptive resources are depleted.
                      Resistance collapses. The immune system weakens, making the person vulnerable
                      to illness. Mental health deteriorates &mdash; anxiety, depression, and
                      emotional breakdown become likely. Physical symptoms such as chronic fatigue,
                      persistent headaches, digestive problems, and cardiovascular strain emerge.
                      This is the stage associated with{' '}
                      <strong className="text-white">burnout</strong>. The electrician who was
                      coping in Stage 2 now cannot get out of bed, calls in sick repeatedly, makes
                      dangerous mistakes on site, or simply walks off the job.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Construction Application</p>
                </div>
                <p className="text-sm text-white">
                  The critical insight from Selye&rsquo;s model is that{' '}
                  <strong className="text-white">Stage 2 (Resistance) is deceptive</strong>. The
                  person appears to be coping, so neither they nor their colleagues raise concerns.
                  In construction culture, where &ldquo;getting on with it&rdquo; is valued, people
                  can remain in the Resistance stage for months or even years before collapsing into
                  Exhaustion. Early intervention &mdash; recognising the signs before Exhaustion
                  &mdash; is essential.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Eustress vs Distress */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Eustress vs Distress &mdash; The Two Faces of Stress
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Selye also made another crucial contribution: he recognised that not all stress is
                harmful. He coined two terms that distinguish between the constructive and
                destructive forms of the stress response:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                    <p className="text-green-400 font-semibold text-sm mb-2">
                      Eustress (Positive Stress)
                    </p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Feels exciting and energising rather than threatening</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Sharpens focus, concentration, and reaction time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Boosts motivation and a sense of achievement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Is typically short-term and linked to a specific challenge</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>The person feels challenged but capable of succeeding</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                    <p className="text-red-400 font-semibold text-sm mb-2">
                      Distress (Negative Stress)
                    </p>
                    <ul className="text-sm text-white space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Feels overwhelming, threatening, and uncontrollable</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Impairs concentration, decision-making, and judgement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Drains energy and motivation over time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Can be short-term (acute) or long-term (chronic)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>The person feels overwhelmed and unable to cope</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Construction Examples</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Eustress:</strong> Deadline pressure on a
                      rewire. The plasterers are coming on Thursday, and you need to finish first
                      fix by Wednesday. The pressure is real, but it is finite, manageable, and
                      motivating. You feel focused and energised. You work efficiently because the
                      deadline gives your effort a clear purpose and endpoint.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Eustress:</strong> Preparing for the AM2
                      practical assessment. You feel nervous but excited. The challenge is
                      significant but you have been training for it. The stress sharpens your focus
                      during revision and practice.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Distress:</strong> Chronic worry about EICR
                      results. You have three EICRs to complete this week and you are constantly
                      second-guessing your findings. The worry follows you home. You lie awake at
                      night thinking about whether you missed something. The stress is no longer
                      motivating &mdash; it is paralysing.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Distress:</strong> Months of financial
                      uncertainty as a self-employed electrician. You do not know where next
                      month&rsquo;s work is coming from. You cannot plan, cannot relax, cannot
                      switch off. The stress is chronic, uncontrollable, and eroding your health.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The boundary between eustress and distress is not fixed &mdash; it depends on the
                individual and the context. The same stressor can be eustress for one person and
                distress for another. A surprise visit from a building inspector might be eustress
                for an experienced electrician who is confident in their work (a welcome opportunity
                to demonstrate quality) and distress for someone who is unsure about their
                installation standards (a threat they feel unable to handle). This is where Lazarus
                and Folkman&rsquo;s model becomes critical.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Lazarus & Folkman's Transactional Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Lazarus &amp; Folkman&rsquo;s Transactional Model (1984)
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                While Selye focused on the body&rsquo;s physical response to stress, American
                psychologists <strong>Richard Lazarus</strong> and <strong>Susan Folkman</strong>{' '}
                focused on the <em>psychological</em> process. Their{' '}
                <strong>Transactional Model of Stress and Coping</strong> (1984) is arguably the
                most important framework for understanding why people respond to stress differently.
              </p>

              <p>
                The central idea is revolutionary in its simplicity:{' '}
                <strong>
                  stress does not come from the event itself &mdash; it comes from the
                  person&rsquo;s appraisal of the event
                </strong>
                . The same situation can be stressful or non-stressful depending on how the
                individual evaluates it. This evaluation happens through a two-stage appraisal
                process.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The Two-Stage Appraisal Process
                </p>
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white font-medium mb-1">
                      Primary Appraisal: &ldquo;What does this mean for me?&rdquo;
                    </p>
                    <p className="text-sm text-white">
                      The person evaluates the event and categorises it as one of three things:{' '}
                      <strong className="text-white">irrelevant</strong> (this has nothing to do
                      with me), <strong className="text-white">benign-positive</strong> (this is
                      good news), or <strong className="text-white">stressful</strong>. If appraised
                      as stressful, it is further categorised as a{' '}
                      <strong className="text-white">threat</strong> (potential for harm), a{' '}
                      <strong className="text-white">challenge</strong> (potential for growth or
                      gain), or a <strong className="text-white">harm/loss</strong> (damage has
                      already occurred). Note that a &ldquo;challenge&rdquo; appraisal is where
                      eustress comes from &mdash; the person sees the stressor as an opportunity
                      rather than a threat.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white font-medium mb-1">
                      Secondary Appraisal: &ldquo;Can I cope with this?&rdquo;
                    </p>
                    <p className="text-sm text-white">
                      If the event is appraised as stressful, the person then evaluates their{' '}
                      <strong className="text-white">coping resources</strong>: Do I have the
                      skills, knowledge, experience, support, time, and energy to deal with this? If
                      the answer is yes, the stress is manageable &mdash; the person feels
                      challenged but capable. If the answer is no &mdash; if the perceived demands
                      exceed the perceived resources &mdash; distress occurs. The person feels
                      overwhelmed, anxious, and out of control.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Construction Scenario</p>
                <p className="text-sm text-white">
                  Imagine two electricians receive the same news: their company has been awarded a
                  complex hospital rewire project starting next month.{' '}
                  <strong className="text-white">Electrician A</strong> has 15 years&rsquo;
                  experience, has worked on hospital projects before, and has a trusted team around
                  them. Primary appraisal: &ldquo;This is a big challenge, but a great
                  opportunity.&rdquo; Secondary appraisal: &ldquo;I have the skills and support to
                  handle this.&rdquo; Result:{' '}
                  <strong className="text-white">eustress &mdash; excitement and motivation</strong>
                  . <strong className="text-white">Electrician B</strong> has three years&rsquo;
                  experience, has never worked on a hospital project, and will be the sole
                  electrician on site. Primary appraisal: &ldquo;This is way beyond my experience
                  &mdash; this is a threat to my reputation and career.&rdquo; Secondary appraisal:
                  &ldquo;I do not have the knowledge or support to cope with this.&rdquo; Result:{' '}
                  <strong className="text-white">distress &mdash; anxiety and dread</strong>.
                </p>
              </div>

              <p>
                The power of this model is that it identifies specific points where intervention can
                help. You can reduce stress by changing the <strong>primary appraisal</strong>{' '}
                (helping someone reframe a threat as a challenge) or by strengthening the{' '}
                <strong>secondary appraisal</strong> (building skills, providing support, increasing
                resources). Training, mentoring, experience, and social support all shift the
                appraisal balance. This is why a supportive site culture is not just &ldquo;nice to
                have&rdquo; &mdash; it directly reduces stress by strengthening people&rsquo;s
                perceived coping resources.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Fight-Flight-Freeze */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            The Fight-Flight-Freeze Response
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>fight-or-flight response</strong> was first described by American
                physiologist <strong>Walter Cannon</strong> in 1932, and has since been expanded to
                include a third option: <strong>freeze</strong>. This response is the body&rsquo;s
                emergency action system &mdash; an automatic, involuntary reaction that prepares you
                to deal with an immediate threat. It is controlled by the{' '}
                <strong>sympathetic nervous system</strong> and involves a rapid cascade of
                physiological changes.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">What Happens in Your Body</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Adrenal glands</strong> release{' '}
                      <strong className="text-white">adrenaline</strong> (epinephrine) for immediate
                      energy and alertness, and <strong className="text-white">cortisol</strong> for
                      sustained energy and immune suppression
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Heart rate increases</strong> to pump more
                      blood to muscles. Blood pressure rises. You may feel your heart pounding.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Breathing quickens</strong> to increase oxygen
                      intake. You may feel short of breath or as though you cannot get enough air.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Muscles tense</strong> in preparation for
                      action. You may notice tension in your shoulders, neck, jaw, or fists.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Digestion shuts down</strong> &mdash; energy is
                      redirected from the digestive system to muscles. This causes the
                      &ldquo;butterflies&rdquo; or nausea you feel when stressed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Pupils dilate</strong> to take in more light
                      and improve peripheral vision.{' '}
                      <strong className="text-white">Hearing sharpens</strong>. Senses become
                      hyper-alert.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Blood clotting factors increase</strong> in
                      case of injury.{' '}
                      <strong className="text-white">Pain sensitivity decreases</strong>
                      &mdash; you may not notice an injury until the crisis has passed.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">The Three Responses</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Fight</p>
                    <p className="text-sm text-white">
                      Confront the threat head-on. Energy surges into aggressive or assertive
                      action. On site: an electrician who snaps at a site manager over unreasonable
                      demands, or who pushes back forcefully when asked to cut corners on safety.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Flight</p>
                    <p className="text-sm text-white">
                      Escape the threat. The urge to remove yourself from the situation. On site: an
                      apprentice who avoids a difficult task by always finding other things to do,
                      or an electrician who calls in sick on the day of a difficult client meeting.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-white font-medium mb-1">Freeze</p>
                    <p className="text-sm text-white">
                      Become immobilised. Unable to act or make decisions. On site: a worker who
                      witnesses an accident and stands motionless, unable to respond. Or an
                      electrician who discovers a serious fault and cannot decide what to do next.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Problem with Chronic Activation
                  </p>
                </div>
                <p className="text-sm text-white">
                  The fight-flight-freeze response evolved for acute, short-term threats &mdash; a
                  predator attack, a falling tree, a sudden danger. It is designed to activate
                  quickly, deal with the threat, and then switch off so the body can recover. The
                  problem in modern construction work is that many stressors are{' '}
                  <strong className="text-white">chronic</strong>: ongoing financial worry,
                  persistent job insecurity, continuous deadline pressure, long-term conflict with a
                  colleague. The stress response activates but never fully switches off.{' '}
                  <strong className="text-white">
                    Cortisol levels remain elevated, the body stays in a state of heightened alert,
                    and over time this causes genuine physical and mental damage
                  </strong>{' '}
                  &mdash; suppressed immunity, cardiovascular strain, digestive problems, anxiety,
                  and depression.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has established the scientific foundation for understanding stress. The
                key points to carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Stress is a response, not an event.</strong> The
                    stressor is the trigger; stress is what happens inside you. This distinction
                    matters because it means you can change your stress response even when you
                    cannot change the stressor.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Selye&rsquo;s GAS model</strong> shows that
                    prolonged stress progresses through Alarm, Resistance, and Exhaustion. The
                    Resistance stage is deceptive &mdash; people appear to cope while resources
                    deplete. Early intervention prevents Exhaustion.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Eustress vs distress:</strong> Not all stress is
                    bad. Eustress enhances performance and motivation; distress overwhelms and
                    damages. The goal is not zero stress &mdash; it is the right kind of stress.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Lazarus and Folkman&rsquo;s model</strong>{' '}
                    explains why stress is personal. Appraisal of the threat and appraisal of coping
                    resources determine the stress experience. This means we can reduce stress by
                    changing appraisals or building resources.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Fight-flight-freeze</strong> is the body&rsquo;s
                    emergency system. It is vital for acute threats but damaging when chronically
                    activated by ongoing stressors.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Construction workers</strong> face both acute
                    stressors (safety hazards, client confrontations) and chronic stressors
                    (financial insecurity, excessive hours, job instability). Understanding how
                    stress works is the first step to managing it.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 2, we will explore the
                  Stress-Performance Curve &mdash; the relationship between stress levels and
                  performance. You will learn about the Yerkes-Dodson Law, find your optimal zone,
                  and understand what happens when stress tips from helpful to harmful.
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../rsm-module-1-section-2">
              Next: The Stress-Performance Curve
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
