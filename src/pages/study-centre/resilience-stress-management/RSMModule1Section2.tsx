import { ArrowLeft, TrendingUp, CheckCircle, AlertTriangle, Activity, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'rsm-1-2-yerkes-dodson',
    question:
      'The Yerkes-Dodson Law describes the relationship between arousal (stress) and performance as:',
    options: [
      'A straight line \u2014 more stress always means worse performance',
      'An inverted-U \u2014 performance improves with moderate stress but declines when stress is too high or too low',
      'A flat line \u2014 stress has no measurable effect on performance',
      'An exponential curve \u2014 performance increases continuously as stress increases',
    ],
    correctIndex: 1,
    explanation:
      'The Yerkes-Dodson Law (1908) describes an inverted-U (bell curve) relationship between arousal/stress and performance. At low levels of arousal, performance is poor (boredom, lack of focus). As arousal increases to a moderate level, performance improves and reaches an optimal peak. Beyond this point, further increases in arousal cause performance to decline (anxiety, mistakes, breakdown). The key insight is that some stress is necessary for good performance, but too much is destructive.',
  },
  {
    id: 'rsm-1-2-optimal-zone',
    question:
      'An electrician is working on a routine socket installation in an empty property. They feel bored and unfocused, and they accidentally wire a socket with reversed polarity. Which part of the stress-performance curve does this scenario illustrate?',
    options: [
      'The right side \u2014 excessive stress causing mistakes',
      'The peak \u2014 optimal performance under ideal conditions',
      'The left side \u2014 under-stimulation leading to complacency and errors',
      'None \u2014 wiring errors are caused by lack of training, not stress levels',
    ],
    correctIndex: 2,
    explanation:
      'This is a classic example of the left side of the inverted-U curve. The work is so routine and understimulating that the electrician\'s arousal level is too low. Without enough challenge or engagement, concentration drops, the mind wanders, and careless errors occur. This is sometimes called "boredom-induced error" and it is a genuine safety risk in construction. The fix is not to add stress, but to add engagement \u2014 through variety, self-set challenges, quality checks, or simply being mindful of the risks of complacency.',
  },
  {
    id: 'rsm-1-2-individual-diff',
    question:
      'Why do different people reach their optimal stress-performance peak at different levels of stress?',
    options: [
      'Because some people are naturally lazy and need more pressure to perform',
      'Because individual differences in experience, personality, skill level, and resilience shift the position and shape of the curve',
      'Because the Yerkes-Dodson Law only applies to laboratory settings, not real-world work',
      'Because stress is entirely determined by genetics and cannot be influenced by training or experience',
    ],
    correctIndex: 1,
    explanation:
      "Individual differences are central to the stress-performance relationship. Factors including experience level, training, personality traits (such as trait anxiety and conscientiousness), physical fitness, social support, self-confidence, and current life circumstances all influence where a person's optimal point sits on the curve. An experienced electrician with 20 years on site will have a higher optimal point for complex tasks than a first-year apprentice \u2014 they can handle more pressure before performance declines. This is why one-size-fits-all approaches to workload management do not work.",
  },
];

const faqs = [
  {
    question: 'Does the Yerkes-Dodson Law mean I should try to stay stressed?',
    answer:
      'No. The Yerkes-Dodson Law means you should aim for the right level of arousal for the task at hand \u2014 not too little and not too much. For simple, repetitive tasks, a higher level of arousal may be tolerable or even helpful. For complex tasks requiring fine motor skills or careful judgement (such as testing a three-phase distribution board or writing an EICR report), you need a calmer, more focused state. The practical lesson is not to seek stress, but to recognise when you are under-stimulated (and at risk of complacency errors) or over-stimulated (and at risk of anxiety-driven mistakes) and to take action to adjust your state.',
  },
  {
    question: 'How can I tell if I am in my optimal zone?',
    answer:
      'When you are in your optimal zone, you typically experience a state of alert focus \u2014 sometimes described as being "in the zone" or "in flow." You feel challenged but not overwhelmed. Time seems to pass quickly because you are fully engaged. Your concentration is sharp, your decision-making is clear, and you feel a sense of purpose and competence. You are aware of risks without being paralysed by them. If you notice that you are bored, distracted, and going through the motions, you are probably on the left side of the curve. If you feel anxious, rushed, overwhelmed, or unable to think clearly, you are probably on the right side.',
  },
  {
    question: 'Can my position on the curve change throughout the day?',
    answer:
      'Absolutely. Your position on the stress-performance curve is dynamic \u2014 it shifts throughout the day, week, and project lifecycle. You might start the morning in your optimal zone, become over-aroused after a confrontation with a client at 10am, recover to optimal during a satisfying afternoon task, and slip into under-arousal during a tedious paperwork session at 4pm. External factors (caffeine, sleep quality, news from home, site conditions), internal factors (hunger, fatigue, mood), and task demands all shift your position. The skill is in recognising these shifts and adjusting \u2014 taking a break when you are over-aroused, adding challenge when you are under-stimulated.',
  },
  {
    question: 'Does task complexity affect the curve?',
    answer:
      'Yes \u2014 this is one of the most important refinements of the Yerkes-Dodson Law. For simple, well-practised tasks (such as running cables through a pre-chased wall), a higher level of arousal can actually improve performance \u2014 the energy and urgency help you work faster without significantly increasing error risk. For complex tasks requiring precision, judgement, and concentration (such as designing a three-phase distribution board, interpreting fault-finding results, or writing a detailed EICR report), even moderate over-arousal can cause errors. The optimal arousal level shifts to the left for complex tasks. This has direct practical implications: if you are about to do complex, safety-critical work, you need to manage your stress levels carefully. If you are doing simple repetitive work, moderate pressure can help maintain focus.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'The Yerkes-Dodson Law (1908) describes the relationship between stress and performance as:',
    options: [
      'Linear \u2014 performance increases directly with stress',
      'Inverse \u2014 performance decreases directly with stress',
      'An inverted-U \u2014 performance peaks at moderate stress and declines at low or high stress',
      'Random \u2014 there is no predictable relationship between stress and performance',
    ],
    correctAnswer: 2,
    explanation:
      'The Yerkes-Dodson Law describes an inverted-U (bell curve) relationship. Performance is poor at very low arousal (under-stimulation, boredom) and very high arousal (anxiety, overwhelm). It peaks at a moderate level of arousal where the person is alert, engaged, and focused but not overwhelmed. This principle has been one of the most replicated findings in psychology over the past century.',
  },
  {
    id: 2,
    question: 'On the left side of the stress-performance curve, performance is poor because:',
    options: [
      'The person is too anxious and making mistakes due to pressure',
      'The person is under-stimulated, leading to boredom, poor focus, and complacency',
      "The person has reached the Exhaustion stage of Selye's GAS model",
      'The person is experiencing a freeze response and cannot take action',
    ],
    correctAnswer: 1,
    explanation:
      'The left side of the inverted-U represents under-arousal. With too little stimulation, the person lacks motivation, focus, and engagement. They may feel bored, lethargic, or "going through the motions." In this state, complacency errors are common \u2014 the kind of careless mistakes that happen when attention drifts. This is a significant safety risk in construction, particularly during repetitive tasks.',
  },
  {
    id: 3,
    question:
      'An electrician is juggling three jobs simultaneously, receiving angry phone calls from two clients, and has just learned that materials for tomorrow have not been delivered. Their work quality has dropped sharply. They are on which part of the curve?',
    options: [
      'The left side \u2014 under-stimulation',
      'The peak \u2014 optimal zone',
      'The right side \u2014 over-arousal, with performance declining due to excessive stress',
      'Off the curve entirely \u2014 this scenario is not covered by the Yerkes-Dodson model',
    ],
    correctAnswer: 2,
    explanation:
      'This electrician is clearly on the right side of the curve. The demands (three simultaneous jobs, angry clients, material shortages) have pushed their arousal level beyond the optimal zone. When over-aroused, cognitive function narrows \u2014 the person struggles to prioritise, makes hasty decisions, becomes reactive rather than proactive, and the quality of their work suffers. The more stressors pile up, the further right they move on the curve.',
  },
  {
    id: 4,
    question:
      'According to the Yerkes-Dodson Law, the optimal arousal level for a complex task (such as fault-finding on a three-phase system) compared to a simple task (such as a routine socket installation) is:',
    options: [
      'Higher \u2014 complex tasks need more stress to drive performance',
      'The same \u2014 optimal arousal does not change based on task complexity',
      'Lower \u2014 complex tasks require a calmer, more focused state with less arousal',
      'Irrelevant \u2014 task complexity has no relationship with the stress-performance curve',
    ],
    correctAnswer: 2,
    explanation:
      'One of the most important refinements of the Yerkes-Dodson Law is that optimal arousal level varies with task complexity. For simple, well-practised tasks, a higher level of arousal can be tolerated or even beneficial. For complex tasks requiring precision, judgement, and cognitive flexibility, the optimal arousal level is lower. Too much stress during complex work narrows attention, impairs working memory, and increases errors \u2014 which in electrical work can be dangerous.',
  },
  {
    id: 5,
    question:
      'Which of the following is a key characteristic of being in the "optimal zone" of the stress-performance curve?',
    options: [
      'Feeling completely relaxed with no sense of urgency or challenge',
      'Feeling anxious and jittery, with a rapid heartbeat and racing thoughts',
      'Feeling alert, focused, and engaged \u2014 challenged but not overwhelmed',
      'Feeling numb and detached, as though operating on autopilot',
    ],
    correctAnswer: 2,
    explanation:
      'The optimal zone is characterised by alert engagement. The person feels challenged enough to be focused and motivated, but not so stressed that their thinking is impaired. Concentration is sharp, decision-making is clear, and there is a sense of flow \u2014 time passes quickly because the person is fully absorbed in the task. This state is sometimes called "flow" (Csikszentmihalyi, 1990) and it corresponds to the peak of the Yerkes-Dodson inverted-U.',
  },
  {
    id: 6,
    question:
      'An apprentice doing repetitive cable runs for the third day in a row is making careless mistakes. The BEST explanation from the stress-performance curve model is:',
    options: [
      'The apprentice is not competent enough for the task and needs retraining',
      'The apprentice is on the left side of the curve \u2014 under-stimulated and losing focus due to monotony',
      'The apprentice is on the right side of the curve \u2014 overwhelmed by the difficulty of the work',
      'The Yerkes-Dodson Law does not apply to apprentices, only to experienced electricians',
    ],
    correctAnswer: 1,
    explanation:
      "Repetitive, monotonous work with no variation or challenge creates under-arousal \u2014 the left side of the curve. The apprentice's attention drifts because there is not enough stimulation to maintain focus. This is not a competency issue but a stimulation issue. Practical solutions include introducing variety (rotating tasks), setting quality challenges, increasing responsibility, or simply being aware that prolonged repetitive work increases complacency risk and scheduling more frequent checks.",
  },
  {
    id: 7,
    question: 'Individual differences in the stress-performance curve mean that:',
    options: [
      'The Yerkes-Dodson Law is not scientifically valid because results vary between people',
      'Different people reach their optimal performance at different stress levels, influenced by factors such as experience, personality, and current wellbeing',
      'Only certain personality types experience the inverted-U relationship',
      'Individual differences are irrelevant \u2014 everyone has the same stress threshold',
    ],
    correctAnswer: 1,
    explanation:
      "Individual differences are a fundamental aspect of the stress-performance relationship. Factors including experience level, training, personality traits, physical fitness, social support, resilience, and current life circumstances all shift the position and shape of each person's curve. A 20-year veteran will typically handle more pressure before performance drops than a first-year apprentice. Understanding these differences is critical for supervisors and team leaders: assigning the right level of challenge to each person is key to getting the best from the team.",
  },
  {
    id: 8,
    question:
      'A site supervisor notices that one electrician performs best under tight deadlines while another does their best work when given ample time. This illustrates:',
    options: [
      'That one electrician is lazy and needs pressure to work hard',
      'That the Yerkes-Dodson Law is wrong because it should predict the same response for everyone',
      'Individual differences in optimal arousal levels \u2014 both are performing well, just at different points on their personal curves',
      'That neither electrician is professional \u2014 both should perform consistently regardless of conditions',
    ],
    correctAnswer: 2,
    explanation:
      'This is a perfect illustration of individual differences in optimal arousal. The first electrician has a higher optimal arousal point \u2014 they need more stimulation (pressure, urgency) to reach peak performance. The second has a lower optimal point \u2014 they perform best in calmer, less pressured conditions. Neither approach is superior. An effective supervisor recognises these differences and, where possible, assigns work and deadlines accordingly. Forcing everyone into the same working conditions ignores the reality of human variation.',
  },
];

export default function RSMModule1Section2() {
  useSEO({
    title: 'The Stress-Performance Curve | Resilience & Stress Management Module 1.2',
    description:
      'Learn the Yerkes-Dodson Law, the inverted-U relationship between stress and performance, and how to find your optimal zone as a construction worker.',
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
            <TrendingUp className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The Stress-Performance Curve
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            How stress affects your performance, why too little is as dangerous as too much, and how
            to find your optimal zone
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Yerkes-Dodson Law:</strong> Stress and performance follow an inverted-U
                curve
              </li>
              <li>
                <strong>Too little stress:</strong> Boredom, complacency, careless errors
              </li>
              <li>
                <strong>Optimal zone:</strong> Alert, focused, engaged, performing at your best
              </li>
              <li>
                <strong>Too much stress:</strong> Anxiety, mistakes, fatigue, breakdown
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Safety:</strong> Both under-arousal and over-arousal cause on-site mistakes
              </li>
              <li>
                <strong>Quality:</strong> Optimal stress produces the best installation work
              </li>
              <li>
                <strong>Self-awareness:</strong> Knowing where you are on the curve lets you adjust
              </li>
              <li>
                <strong>Team leadership:</strong> Matching challenge to capability improves outcomes
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Describe the Yerkes-Dodson Law and the inverted-U relationship between stress and performance',
              'Explain the characteristics of under-arousal, optimal arousal, and over-arousal',
              'Recognise the signs that you are on the left, peak, or right side of the curve',
              'Understand how task complexity shifts the optimal arousal point',
              'Apply the stress-performance curve to real construction scenarios',
              'Recognise individual differences in optimal arousal levels',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Yerkes-Dodson Law */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Yerkes-Dodson Law (1908)
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 1908, psychologists <strong>Robert Yerkes</strong> and{' '}
                <strong>John Dodson</strong> published research that would become one of the most
                enduring principles in psychology. Working with mice in a discrimination learning
                task, they discovered that performance improved with increasing physiological
                arousal &mdash; but only up to a point. Beyond that point, further increases in
                arousal caused performance to decline.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Core Principle</p>
                <p className="text-base text-white leading-relaxed">
                  <strong>
                    &ldquo;Performance increases with physiological or mental arousal, but only to a
                    point. When arousal becomes too high, performance decreases.&rdquo;
                  </strong>
                </p>
                <p className="text-sm text-white mt-2">
                  This creates an <strong className="text-white">inverted-U</strong> (bell curve)
                  when plotted on a graph, with arousal/stress on the horizontal axis and
                  performance on the vertical axis. The peak of the curve is the{' '}
                  <strong className="text-white">optimal zone</strong>.
                </p>
              </div>

              <p>
                Although derived from animal research over a century ago, the Yerkes-Dodson Law has
                been extensively validated in human performance studies across sports, medicine,
                aviation, military operations, and &mdash; crucially for us &mdash; high-risk manual
                work. The principle is intuitive once you understand it: think about the last time
                you were bored at work and made a careless mistake, or the last time you were so
                stressed that your hands were shaking and your brain felt foggy. Both represent
                opposite sides of the same curve.
              </p>

              <p>
                For electricians and construction workers, this is not abstract theory &mdash; it
                has direct, daily relevance. Your ability to work safely, accurately, and
                efficiently is directly influenced by your arousal level. Too little, and you are at
                risk of complacency. Too much, and you are at risk of anxiety-driven errors.
                Understanding where you are on this curve at any given moment is a fundamental
                professional skill.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: The Left Side — Under-Arousal */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            The Left Side &mdash; Under-Arousal
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The left side of the inverted-U represents <strong>under-arousal</strong> &mdash;
                too little stress or stimulation. This might seem like a good thing (&ldquo;less
                stress is better, right?&rdquo;), but the Yerkes-Dodson Law shows that it is
                actually a performance and safety risk.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Characteristics of Under-Arousal
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Boredom</strong> &mdash; the work feels
                      monotonous, repetitive, and unstimulating. There is no sense of challenge or
                      purpose.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Complacency</strong> &mdash; the person assumes
                      everything is fine because they have done this task hundreds of times before.
                      They stop checking, stop thinking critically, stop anticipating problems.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Poor focus</strong> &mdash; the mind wanders.
                      Daydreaming, thinking about the weekend, mentally &ldquo;checking out&rdquo;
                      while the hands keep working on autopilot.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Careless errors</strong> &mdash; reversed
                      polarity, missed connections, wrong cable sizes, skipped tests. Not because
                      the person lacks skill, but because their attention was not engaged.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Low motivation</strong> &mdash; &ldquo;going
                      through the motions&rdquo; without care or pride in the work.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Construction Example</p>
                </div>
                <p className="text-sm text-white">
                  An experienced electrician on the third consecutive day of installing identical
                  socket outlets in a large new-build development. The work is well within their
                  skill level, there is no time pressure, and every room is the same. By
                  mid-afternoon, they are operating on autopilot. They wire two double sockets with
                  the line and neutral reversed. The error is caught during testing &mdash; but{' '}
                  <strong className="text-white">
                    the root cause was not incompetence; it was under-stimulation
                  </strong>
                  . The work was too easy and too repetitive to hold their attention.
                </p>
              </div>

              <p>
                Under-arousal is an underappreciated risk in construction. The industry tends to
                focus on the dangers of too much stress, but the Yerkes-Dodson Law reminds us that
                too little can be equally problematic. Repetitive tasks, easy work, quiet sites, and
                low-demand periods all create conditions for complacency errors. Being aware of this
                risk is the first step to managing it.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Peak — Optimal Zone */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            The Peak &mdash; The Optimal Zone
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The peak of the inverted-U is where you want to spend as much of your working day as
                possible. This is the <strong>optimal zone</strong> &mdash; the sweet spot where
                arousal is sufficient to maintain focus, energy, and engagement, but not so high
                that it impairs thinking or causes anxiety.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">
                    Characteristics of the Optimal Zone
                  </p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Alert and focused</strong> &mdash; your
                      concentration is sharp and sustained. You notice details, anticipate problems,
                      and respond effectively to changes.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Engaged and motivated</strong> &mdash; you feel
                      a sense of purpose in the work. It matters to you. You take pride in doing it
                      well.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Challenged but capable</strong> &mdash; the
                      work stretches you slightly beyond your comfort zone, but you feel confident
                      you can meet the challenge with your current skills and resources.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Clear thinking</strong> &mdash; decision-making
                      is effective. You can weigh options, prioritise, and solve problems without
                      feeling paralysed or rushed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Flow state</strong> &mdash; psychologist Mihaly
                      Csikszentmihalyi described &ldquo;flow&rdquo; as a state of complete
                      absorption in a task. Time seems to pass quickly. You are fully present.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Construction Example</p>
                <p className="text-sm text-white">
                  An electrician preparing for their AM2 practical assessment. They are nervous
                  &mdash; the assessment matters and the standard is high. But they have prepared
                  well, they know the content, and they feel ready. The nerves sharpen their focus
                  rather than clouding it. During the practical, they work carefully, methodically,
                  and with total concentration. They check their work as they go. They finish with
                  time to spare and feel a genuine sense of satisfaction.{' '}
                  <strong className="text-white">
                    This is the optimal zone: the stress is real, but it is working for them, not
                    against them.
                  </strong>
                </p>
              </div>

              <p>
                Reaching the optimal zone is not about eliminating stress &mdash; it is about
                calibrating it. Some people naturally operate close to the peak and can handle
                significant pressure without performance declining. Others reach their peak at lower
                levels of arousal and need calmer conditions to do their best work. Neither is right
                or wrong &mdash; they are simply different. The skill is in knowing where{' '}
                <em>your</em> peak is and what conditions help you reach it.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: The Right Side — Over-Arousal */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            The Right Side &mdash; Over-Arousal
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The right side of the curve is where most people think of when they hear the word
                &ldquo;stress&rdquo;. This is <strong>over-arousal</strong> &mdash; when the demands
                placed on you exceed your perceived ability to cope, and performance begins to
                deteriorate.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Characteristics of Over-Arousal
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Anxiety</strong> &mdash; a persistent sense of
                      dread or worry that goes beyond the specific task. Racing thoughts, difficulty
                      switching off, feeling &ldquo;wired&rdquo; even during rest.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Cognitive narrowing</strong> &mdash; the brain
                      enters &ldquo;tunnel vision&rdquo; mode, focusing on the most immediate threat
                      and losing the ability to see the bigger picture, consider alternatives, or
                      think creatively.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Mistakes and errors</strong> &mdash; hurrying,
                      cutting corners, skipping safety checks, making impulsive decisions. The very
                      things that under-arousal causes through inattention, over-arousal causes
                      through haste and panic.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Physical symptoms</strong> &mdash; shaking
                      hands, tense muscles, rapid breathing, headaches, nausea. These are the
                      fight-flight-freeze response from Section 1 being activated.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Fatigue and breakdown</strong> &mdash; if
                      over-arousal persists, the body moves towards Selye&rsquo;s Exhaustion stage.
                      Energy is depleted, resilience collapses, and the person is at risk of
                      burnout, physical illness, or mental health crisis.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Construction Example</p>
                </div>
                <p className="text-sm text-white">
                  A self-employed electrician is juggling three active jobs. Job 1 has a furious
                  client demanding they come back to fix a snag list. Job 2 has a main contractor
                  threatening back-charges for delays. Job 3 has materials that have not been
                  delivered and a site that is not ready. Their phone is ringing constantly. They
                  have not had a full day off in three weeks. They are rushing between sites, making
                  hasty decisions, and their quality of work has dropped. Last week, they forgot to
                  isolate before working on a live board &mdash; something they have{' '}
                  <strong className="text-white">never</strong> done in 15 years.{' '}
                  <strong className="text-white">
                    They are deep on the right side of the curve, and the consequences could be
                    fatal.
                  </strong>
                </p>
              </div>

              <p>
                Over-arousal is where most stress-related incidents on construction sites originate.
                When people are rushed, overloaded, and anxious, they make the kind of mistakes that
                in an electrical context can kill. Understanding that these errors are{' '}
                <strong>predictable consequences of over-arousal</strong> &mdash; not character
                flaws &mdash; is important. It means we can prevent them by managing workload,
                building recovery time, and creating conditions where people can operate closer to
                their optimal zone.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05: Individual Differences and Task Complexity */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Individual Differences &amp; Task Complexity
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Yerkes-Dodson inverted-U is a general principle, but the exact shape and
                position of the curve varies between individuals and between tasks. Two important
                refinements make this model more useful in practice.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Individual Differences</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Everyone&rsquo;s curve is slightly different. The factors that influence where
                  your optimal zone sits include:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Experience and skill level</strong> &mdash; a
                      seasoned electrician with 20 years on site can typically handle more pressure
                      before performance drops. Their extensive experience provides a larger
                      repertoire of coping strategies and a stronger sense of &ldquo;I have dealt
                      with this before.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Personality traits</strong> &mdash; people
                      higher in trait anxiety tend to have lower optimal arousal points (they
                      perform best in calmer conditions). People higher in extraversion tend to seek
                      more stimulation and may perform better under moderate pressure.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Current wellbeing</strong> &mdash; if you are
                      well-rested, physically healthy, and in a good mental state, your curve shifts
                      right (you can handle more pressure). If you are sleep-deprived, unwell, or
                      already stressed by personal problems, your curve shifts left (you reach
                      over-arousal much sooner).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Social support</strong> &mdash; having a
                      supportive team, a good relationship with your supervisor, and people you can
                      talk to all increase your capacity to handle stress. Social isolation narrows
                      the curve and brings the tipping point closer.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Task Complexity</p>
                <p className="text-sm text-white mb-3">
                  Yerkes and Dodson also found that the optimal arousal level varies with the
                  difficulty of the task. This refinement is critical for construction work:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white font-semibold text-sm mb-2">
                      Simple / Well-Practised Tasks
                    </p>
                    <p className="text-sm text-white mb-2">
                      Optimal arousal is <strong className="text-white">higher</strong>. More
                      pressure can be tolerated without significant performance decline.
                    </p>
                    <p className="text-sm text-white">
                      Examples: running cables in pre-chased walls, installing back boxes, fitting
                      accessories, labelling circuits.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white font-semibold text-sm mb-2">
                      Complex / Unfamiliar Tasks
                    </p>
                    <p className="text-sm text-white mb-2">
                      Optimal arousal is <strong className="text-white">lower</strong>. Even
                      moderate stress can impair performance on tasks requiring fine judgement,
                      precision, or creative problem-solving.
                    </p>
                    <p className="text-sm text-white">
                      Examples: fault-finding on a three-phase system, designing a complex
                      distribution board, writing an EICR report, interpreting test results.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Practical Implication</p>
                <p className="text-sm text-white">
                  If you are about to do complex, safety-critical work &mdash; testing a
                  distribution board, fault-finding, writing a report &mdash; you need to actively
                  manage your stress levels downward. Take a break first. Have a cup of tea. Ensure
                  you will not be interrupted. Remove distractions. Give yourself time and space to
                  think clearly. Conversely, if you are doing simple, repetitive work and you notice
                  your attention drifting, you may need to{' '}
                  <strong className="text-white">add</strong> some challenge: set yourself a quality
                  target, rotate tasks, or simply remind yourself of the risks of complacency.
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
                The stress-performance curve is one of the most practical tools for understanding
                how stress affects your work. The key points to take forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">The Yerkes-Dodson Law</strong> describes an
                    inverted-U relationship between arousal and performance. Too little or too much
                    stress both impair performance.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Under-arousal</strong> causes boredom,
                    complacency, poor focus, and careless errors. It is an underappreciated safety
                    risk in construction.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">The optimal zone</strong> is characterised by
                    alert focus, clear thinking, engagement, and a sense of being challenged but
                    capable.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Over-arousal</strong> causes anxiety, cognitive
                    narrowing, hasty decisions, physical symptoms, and dangerous mistakes. This is
                    where most stress-related incidents originate.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Task complexity matters:</strong> Complex tasks
                    need lower arousal; simple tasks can tolerate higher arousal. Plan your stress
                    management around the demands of the task.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Individual differences are real:</strong>{' '}
                    Experience, personality, wellbeing, and social support all shift where your
                    optimal zone sits. Know yourself and know your team.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 3, we will look at
                  stress specifically in the construction industry &mdash; the statistics, the
                  common stressors, the legal framework, and the cultural factors that make
                  construction workers particularly vulnerable to stress-related harm.
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
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../rsm-module-1-section-3">
              Next: Stress in the Construction Industry
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
