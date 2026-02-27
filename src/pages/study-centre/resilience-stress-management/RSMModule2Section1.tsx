import { ArrowLeft, RefreshCw, CheckCircle, AlertTriangle, Lightbulb, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'resilience-definition',
    question: 'According to the APA, resilience is best described as which of the following?',
    options: [
      'A personality trait that some people are born with and others are not',
      'The process of adapting well in the face of adversity, trauma, or significant sources of stress',
      'The ability to avoid stressful situations entirely through careful planning',
      'A measure of physical toughness and endurance under pressure',
    ],
    correctIndex: 1,
    explanation:
      'The American Psychological Association defines resilience as "the process of adapting well in the face of adversity, trauma, tragedy, threats, or significant sources of stress." This definition is important because it frames resilience as a process — something you do — rather than a fixed quality you either have or lack.',
  },
  {
    id: 'bouncing-forward',
    question:
      'What is the key difference between "bouncing back" and "bouncing forward" in resilience?',
    options: [
      'Bouncing back is faster while bouncing forward takes longer',
      'Bouncing back means returning to your previous state, while bouncing forward means growing beyond it',
      'Bouncing forward only applies to physical recovery from injury',
      'There is no meaningful difference — they are interchangeable terms',
    ],
    correctIndex: 1,
    explanation:
      'Bouncing back means returning to your baseline — the state you were in before the adversity. Bouncing forward, linked to post-traumatic growth, means emerging from adversity stronger, wiser, or more capable than before. Both are valid forms of resilience, but bouncing forward recognises that difficult experiences can sometimes be catalysts for positive change.',
  },
  {
    id: 'resilience-myth',
    question: 'Which of the following is a common myth about resilience?',
    options: [
      'Resilience can be developed and strengthened over time',
      'Resilient people still experience stress, pain, and difficulty',
      'Truly resilient people never need help from others',
      'Asking for support is a sign of good coping behaviour',
    ],
    correctIndex: 2,
    explanation:
      'One of the most damaging myths about resilience is that truly resilient people cope entirely on their own and never need help. In reality, one of the strongest predictors of resilience is having a solid support network. Reaching out for help when you need it is a sign of self-awareness and strength, not weakness.',
  },
];

const faqs = [
  {
    question: 'Is resilience something you are born with or something you learn?',
    answer:
      'Resilience is primarily a learned and developed skill, not a fixed personality trait. Research by Connor and Davidson (2003) demonstrated that resilience can be measured and — crucially — improved through deliberate practice and targeted interventions. While some individuals may have temperamental advantages (such as a naturally calm disposition), everyone can build resilience through strategies like strengthening social connections, developing problem-solving skills, maintaining physical health, and practising cognitive reframing. Think of resilience like fitness: some people have a genetic head start, but everyone benefits from training.',
  },
  {
    question: 'Does being resilient mean I should never feel stressed or upset?',
    answer:
      'Absolutely not. Resilience does not mean the absence of distress. Resilient people still experience stress, grief, anxiety, frustration, and all other normal human emotions. What distinguishes resilient individuals is how they respond to these emotions over time — they process their feelings rather than suppressing them, they seek support when needed, and they gradually adapt to their new circumstances. Expecting yourself never to feel stressed is not resilience — it is emotional suppression, which is actively harmful to mental health.',
  },
  {
    question: 'How is resilience different in construction compared to an office environment?',
    answer:
      'The core principles of resilience are the same across all industries, but the stressors and context differ significantly. In construction, workers face physical demands, outdoor weather exposure, job insecurity between contracts, isolation on remote sites, long commutes, a culture that can discourage emotional openness, and higher rates of substance misuse and suicide compared to other sectors. Resilience in construction therefore often requires specific strategies around managing physical fatigue, building connections in transient work environments, navigating financial uncertainty, and challenging the outdated belief that "real men don\'t talk about feelings." The construction industry has among the highest suicide rates of any sector in the UK, making resilience skills genuinely life-saving.',
  },
  {
    question: 'Can one setback destroy your resilience permanently?',
    answer:
      'No. While a major setback can temporarily deplete your resilience reserves, it cannot destroy your capacity for resilience permanently. The research on post-traumatic growth (Tedeschi and Calhoun, 2004) shows that many people who experience significant adversity actually develop greater resilience as a result. However, recovery is not automatic — it requires support, time, and often deliberate effort. If you feel overwhelmed by a setback and cannot see a way forward, that is a sign you need additional support, not a sign that you are broken. Speaking to a GP, a counsellor, or a trusted colleague is always a valid step.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does the APA definition of resilience emphasise?',
    options: [
      'That resilience is a rare genetic trait found in a small percentage of the population',
      'That resilience is the process of adapting well in the face of adversity and stress',
      'That resilience means avoiding all stressful situations through careful planning',
      'That resilience requires professional psychological training to develop',
    ],
    correctAnswer: 1,
    explanation:
      'The APA defines resilience as "the process of adapting well in the face of adversity, trauma, tragedy, threats, or significant sources of stress." The key word is process — resilience is something you do, not something you are.',
  },
  {
    id: 2,
    question:
      'Connor and Davidson (2003) made an important contribution to resilience research. What was their key finding?',
    options: [
      'That resilience is entirely determined by childhood experiences',
      'That resilience can be measured and is a learnable, developable skill',
      'That only people who have experienced trauma can be truly resilient',
      'That resilience decreases consistently with age',
    ],
    correctAnswer: 1,
    explanation:
      'Connor and Davidson developed the Connor-Davidson Resilience Scale (CD-RISC) and demonstrated that resilience is a measurable construct that can be developed and improved through targeted interventions. This was significant because it moved resilience from an abstract personality trait to a concrete, trainable skill.',
  },
  {
    id: 3,
    question: 'The rubber ball analogy for resilience describes which concept?',
    options: [
      'Resilience means becoming hard and inflexible so that nothing affects you',
      'Resilience means absorbing pressure and then returning to your original shape — or an improved one',
      'Resilience means deflecting all stress away from you onto other people',
      'Resilience means staying in the same position regardless of what happens around you',
    ],
    correctAnswer: 1,
    explanation:
      'The rubber ball analogy illustrates that resilient people absorb the impact of adversity (they do feel the pressure) but then return to their original form — or potentially an improved form (bouncing forward). Unlike a glass ball that shatters or a clay ball that deforms permanently, the rubber ball recovers.',
  },
  {
    id: 4,
    question: 'Which of the following is a myth about resilience?',
    options: [
      'Resilience can be strengthened through deliberate practice',
      'Resilient people still experience distress and difficult emotions',
      'Tough people do not get stressed — stress is a sign of weakness',
      'Social support is one of the strongest predictors of resilience',
    ],
    correctAnswer: 2,
    explanation:
      'The idea that "tough people don\'t get stressed" is one of the most harmful myths about resilience, and it is especially prevalent in construction culture. Everyone experiences stress — it is a normal physiological response. What matters is how you manage and recover from stress, not whether you feel it in the first place.',
  },
  {
    id: 5,
    question:
      'An electrician fails the AM2 assessment but uses the experience to identify weak areas, seeks additional training, and passes on the second attempt with stronger skills. This is an example of:',
    options: [
      'Avoidance coping — pretending the failure did not happen',
      'Bouncing back — returning to the previous baseline',
      'Bouncing forward — growing beyond the previous baseline through adversity',
      'Learned helplessness — accepting that failure is inevitable',
    ],
    correctAnswer: 2,
    explanation:
      'This is an example of bouncing forward (post-traumatic growth). The apprentice did not merely return to their previous level of competence — they used the failure as a catalyst to become more skilled and capable than they were before. The adversity of failing actually led to a better outcome than if they had passed first time without addressing their weak areas.',
  },
  {
    id: 6,
    question:
      'Why is the myth "asking for help is a sign of weakness" particularly dangerous in the construction industry?',
    options: [
      'Because construction workers rarely have access to support services',
      'Because construction has the highest suicide rate of any UK employment sector, and this myth discourages help-seeking',
      'Because construction workers are trained to solve problems independently at all times',
      'Because asking for help slows down project timelines',
    ],
    correctAnswer: 1,
    explanation:
      'The construction industry has among the highest suicide rates of any sector in the UK, with male construction workers being approximately three times more likely to die by suicide than the male national average. The myth that asking for help is weakness directly discourages workers from seeking the support they need, contributing to this tragic statistic.',
  },
  {
    id: 7,
    question: 'What is the key difference between resilience and simply "toughing it out"?',
    options: [
      'There is no difference — they describe the same behaviour',
      'Resilience involves processing emotions and adapting, while toughing it out involves suppressing emotions and enduring',
      'Toughing it out is more effective than resilience for short-term stress',
      'Resilience only works for minor stressors while toughing it out is needed for major crises',
    ],
    correctAnswer: 1,
    explanation:
      'Resilience is an active, adaptive process that involves acknowledging emotions, seeking support when needed, problem-solving, and adjusting your approach. "Toughing it out" typically involves emotional suppression, refusing to seek help, and simply enduring pain without processing it. While toughing it out might work briefly, it leads to burnout, mental health decline, and reduced performance over time. Resilience is sustainable; toughing it out is not.',
  },
  {
    id: 8,
    question: 'Which statement about resilience is most accurate?',
    options: [
      'Resilience is a fixed personality trait — you either have it or you do not',
      'Resilience only matters during major life crises, not everyday work stress',
      'Resilience is a dynamic process that can be developed and that applies to both major adversity and daily challenges',
      'Resilience means returning to exactly the same state you were in before the stressful event',
    ],
    correctAnswer: 2,
    explanation:
      'Resilience is a dynamic process — not a fixed trait — that can be developed through deliberate practice. It applies equally to major life crises and the cumulative effect of everyday work stressors. And resilience does not always mean returning to the same state; sometimes it means bouncing forward to a stronger position.',
  },
];

export default function RSMModule2Section1() {
  useSEO({
    title: 'What Is Resilience? | RSM Module 2.1',
    description:
      'Understand the APA definition of resilience, why resilience is a learnable skill, the difference between bouncing back and bouncing forward, and common resilience myths in the construction industry.',
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
          <RefreshCw className="h-10 w-10 text-rose-400 mx-auto mb-4" />
          <span className="inline-block bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">What Is Resilience?</h1>
          <p className="text-white max-w-xl mx-auto">
            Understanding the true meaning of resilience, why it is a learnable skill, and debunking
            the myths that stop people from building it
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
                    <strong className="text-white">Definition:</strong> Resilience is the process of
                    adapting well in the face of adversity and stress.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Not about toughness:</strong> Resilience is NOT
                    about never struggling &mdash; it is about recovering and adapting.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Learnable:</strong> Research proves resilience is
                    a measurable, trainable skill &mdash; not a fixed trait.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Bounce forward:</strong> You can emerge from
                    setbacks stronger than before (post-traumatic growth).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Myths matter:</strong> Believing &ldquo;tough
                    people don&rsquo;t get stressed&rdquo; is dangerous and wrong.
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
                    <strong className="text-white">Construction reality:</strong> The trade involves
                    job insecurity, physical demands, financial pressure, and isolation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Suicide rates:</strong> Male construction workers
                    are three times more likely to die by suicide than the national average.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Preventable:</strong> Building resilience skills
                    is one of the most effective ways to protect your mental health.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Career longevity:</strong> Resilient electricians
                    sustain longer, healthier careers in the trade.
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
                Define resilience using the APA definition and explain why it is framed as a process
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Explain why resilience is a learnable skill, citing Connor and Davidson&rsquo;s
                research
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Distinguish between bouncing back and bouncing forward (post-traumatic growth)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>Identify and challenge at least three common myths about resilience</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Apply the concept of resilience to real-world construction and electrical scenarios
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Explain why resilience matters specifically in the construction industry given its
                mental health statistics
              </span>
            </li>
          </ul>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Defining Resilience */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Defining Resilience
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                The American Psychological Association (APA) defines resilience as{' '}
                <strong>
                  &ldquo;the process of adapting well in the face of adversity, trauma, tragedy,
                  threats, or significant sources of stress.&rdquo;
                </strong>{' '}
                This definition is carefully worded. Notice it says <em>process</em>, not{' '}
                <em>personality</em>. Resilience is something you <strong>do</strong>, not something
                you <strong>are</strong>.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Key Point</p>
                <p className="text-base text-white leading-relaxed">
                  Resilience is NOT about never struggling. It is not the absence of difficulty,
                  pain, or emotional distress. It is about how you respond to those experiences over
                  time &mdash; your capacity to recover, adapt, and continue moving forward even
                  when things are genuinely hard.
                </p>
              </div>

              <p>
                This distinction matters enormously in practice. If you believe resilience is a
                personality trait &mdash; something you either have or you don&rsquo;t &mdash; then
                you are stuck with whatever level you currently have. But if resilience is a
                process, it can be learned, practised, and strengthened, just like any other skill.
                And the research is clear: it can.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <Brain className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  What Resilience Looks Like in Practice
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Acknowledging difficulty</strong> &mdash;
                      recognising when a situation is stressful rather than pretending everything is
                      fine
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Seeking support</strong> &mdash; talking to
                      mates, family, or professionals when you need help
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Problem-solving</strong> &mdash; actively
                      looking for solutions rather than dwelling on the problem
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Maintaining perspective</strong> &mdash;
                      recognising that setbacks are temporary and do not define your entire future
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Taking care of yourself</strong> &mdash;
                      maintaining physical health, sleep, and basic routines during tough times
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Resilience as a Learnable Skill */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Resilience as a Learnable Skill
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                For decades, researchers debated whether resilience was a fixed personality trait or
                a developable skill. The question was settled decisively by{' '}
                <strong>Connor and Davidson (2003)</strong>, who created the Connor-Davidson
                Resilience Scale (CD-RISC) &mdash; a validated psychometric tool that measures
                resilience across five factors: personal competence, trust in one&rsquo;s instincts,
                positive acceptance of change, sense of control, and spiritual influences.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Key Point</p>
                <p className="text-base text-white leading-relaxed">
                  Connor and Davidson&rsquo;s research demonstrated two critical findings: first,
                  that resilience can be reliably <strong>measured</strong>; and second, that
                  resilience scores <strong>improve</strong> following targeted interventions. This
                  means resilience is not fixed at birth &mdash; it is a skill you can actively
                  build and strengthen throughout your life.
                </p>
              </div>

              <p>
                This has profound implications. If resilience is learnable, then no one is
                permanently stuck with low resilience. It also means that resilience training is not
                a luxury or a &ldquo;nice to have&rdquo; &mdash; it is a practical investment in
                your mental health and your career. Just as you would train to improve your testing
                and inspection skills, you can train to improve your ability to handle adversity.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-2">
                  The Resilience-as-Fitness Analogy
                </h3>
                <p className="text-white text-sm">
                  Think of resilience like physical fitness. Some people are naturally more
                  athletic, but <strong className="text-white">everyone</strong> benefits from
                  regular exercise. A person who has never trained can become significantly fitter
                  through consistent effort. A fit person who stops training will gradually lose
                  fitness. Resilience works the same way &mdash; it requires ongoing practice, not a
                  one-off effort. And just as fitness protects you from physical illness, resilience
                  protects you from the worst effects of psychological stress.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Bouncing Back vs Bouncing Forward */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Bouncing Back vs Bouncing Forward
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                The most common metaphor for resilience is the <strong>rubber ball</strong>. Drop a
                rubber ball and it bounces back. Drop a glass ball and it shatters. Drop a clay ball
                and it deforms permanently. The rubber ball represents resilience &mdash; the
                ability to absorb impact and recover your shape.
              </p>

              <p>
                But modern resilience research goes further. <strong>Bouncing back</strong> means
                returning to your previous baseline &mdash; the state you were in before the
                adversity. <strong>Bouncing forward</strong> means emerging from adversity in a
                stronger, wiser, or more capable state than before. This concept is rooted in the
                research on <strong>post-traumatic growth</strong>, first formally described by
                Tedeschi and Calhoun (2004).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <Lightbulb className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Two Forms of Resilient Recovery
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-2">Bouncing Back</h4>
                    <ul className="text-white text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Returning to your previous level of functioning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Recovering your normal routine and wellbeing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Example: losing a contract and finding similar work</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-2">Bouncing Forward</h4>
                    <ul className="text-white text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Growing beyond your previous level of functioning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Developing new strengths, perspectives, or capabilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          Example: losing a contract and pivoting to a more profitable niche
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Construction Example: Bouncing Forward
                </p>
                <p className="text-base text-white leading-relaxed">
                  Consider an electrician who lost a major domestic contract when a property
                  developer went bust. Rather than simply seeking the same type of work, they used
                  the downtime to gain EV chargepoint installation qualifications (City &amp; Guilds
                  2919). Within six months they had pivoted to a growing market with higher margins
                  and less competition. The setback became the catalyst for a career improvement
                  they might never have pursued otherwise. That is bouncing forward.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Construction Example: Bouncing Back
                </p>
                <p className="text-base text-white leading-relaxed">
                  An apprentice electrician failed their AM2 practical assessment on their first
                  attempt. The experience was demoralising &mdash; they had invested months of
                  preparation and felt they had let down their employer. But rather than giving up,
                  they analysed the assessment report, identified the specific areas where they lost
                  marks (termination quality and safe isolation procedure), practised those skills
                  intensively, and passed on their second attempt with higher marks. They used
                  adversity as specific, actionable feedback to strengthen their weakest areas.
                </p>
              </div>

              <p>
                Both bouncing back and bouncing forward are valid forms of resilience. Not every
                setback needs to transform into a life-changing growth experience. Sometimes simply
                recovering your stability and carrying on is exactly the right response. The
                important thing is that you <em>do</em> recover, rather than remaining stuck in
                distress.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Common Myths About Resilience */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Common Myths About Resilience
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                Several persistent myths about resilience are especially prevalent in construction
                culture. These myths are not just inaccurate &mdash; they are actively harmful,
                because they prevent people from seeking help and developing genuine resilience
                skills.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <AlertTriangle className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Myth vs Reality
                </h3>
                <div className="space-y-4">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-red-400 font-medium mb-1">
                      Myth: &ldquo;Tough people don&rsquo;t get stressed&rdquo;
                    </h4>
                    <p className="text-white text-sm">
                      <strong className="text-white">Reality:</strong> Everyone experiences stress
                      &mdash; it is a fundamental biological response to perceived threats. The
                      difference between resilient and non-resilient people is not whether they feel
                      stress, but how they manage it. Suppressing stress does not make it go away;
                      it drives it underground where it manifests as physical illness, insomnia,
                      irritability, substance misuse, or eventual breakdown.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-red-400 font-medium mb-1">
                      Myth: &ldquo;Asking for help is a sign of weakness&rdquo;
                    </h4>
                    <p className="text-white text-sm">
                      <strong className="text-white">Reality:</strong> Reaching out for support is
                      one of the strongest predictors of resilience, according to virtually every
                      major research study on the topic. It takes self-awareness to recognise when
                      you need help and courage to ask for it. In the construction industry, where
                      male suicide rates are approximately three times the national average, this
                      myth is literally life-threatening.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-red-400 font-medium mb-1">
                      Myth: &ldquo;Resilience means coping alone&rdquo;
                    </h4>
                    <p className="text-white text-sm">
                      <strong className="text-white">Reality:</strong> True resilience involves
                      knowing when to lean on others. Social connection is consistently identified
                      as one of the most powerful protective factors against mental health decline.
                      The lone wolf approach to coping is not resilience &mdash; it is isolation,
                      and isolation is a significant risk factor for depression, anxiety, and
                      suicide.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-red-400 font-medium mb-1">
                      Myth: &ldquo;You either have resilience or you don&rsquo;t&rdquo;
                    </h4>
                    <p className="text-white text-sm">
                      <strong className="text-white">Reality:</strong> As Connor and Davidson
                      demonstrated, resilience is measurable and improvable. It is not a binary
                      on/off switch. Your resilience level fluctuates based on your current
                      circumstances, health, sleep, social support, and the coping strategies you
                      employ. Everyone starts from a different baseline, but everyone can build
                      upward from wherever they are.
                    </p>
                  </div>

                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-red-400 font-medium mb-1">
                      Myth: &ldquo;Resilient people are always positive and optimistic&rdquo;
                    </h4>
                    <p className="text-white text-sm">
                      <strong className="text-white">Reality:</strong> Resilience is not about
                      forced positivity or toxic optimism. Resilient people experience the full
                      range of human emotions, including anger, sadness, frustration, and fear. What
                      makes them resilient is their ability to process these emotions productively
                      and eventually move forward &mdash; not their ability to plaster on a smile
                      and pretend everything is fine.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="font-semibold text-red-300">
                    Why These Myths Are Dangerous in Construction
                  </h3>
                </div>
                <p className="text-white text-sm">
                  The construction industry has a deeply embedded culture of stoicism. While there
                  is nothing wrong with being tough and determined, the line between healthy
                  stoicism and harmful emotional suppression is frequently crossed. When workers
                  believe these myths, they avoid seeking help, isolate themselves during difficult
                  periods, and push through deteriorating mental health until a crisis point is
                  reached. The statistics are devastating: male construction workers in the UK are
                  approximately{' '}
                  <strong className="text-white">three times more likely to die by suicide</strong>{' '}
                  than the male national average. Challenging these myths is not academic &mdash; it
                  is a matter of saving lives.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Resilience in the Electrical Trade */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Resilience in the Electrical Trade
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                Electricians and electrical apprentices face specific stressors that make resilience
                particularly important. Understanding these stressors is the first step toward
                building the resilience skills needed to manage them effectively.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  Common Stressors in the Electrical Trade
                </h3>
                <ul className="text-white space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Job insecurity</strong> &mdash; contract-based
                      work, gaps between projects, uncertainty about the next job
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Financial pressure</strong> &mdash; late
                      payments from contractors, tool replacement costs, van expenses, self-employed
                      tax management
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Physical demands</strong> &mdash; working in
                      confined spaces, lifting, working at height, exposure to weather on site
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Assessment pressure</strong> &mdash; AM2
                      practical, City &amp; Guilds exams, continuous professional development
                      requirements
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Difficult clients</strong> &mdash; unreasonable
                      expectations, late changes, non-payment, disputes over quality
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Isolation</strong> &mdash; working alone on
                      domestic jobs, remote site locations, long commutes separating you from family
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Key Point</p>
                <p className="text-base text-white leading-relaxed">
                  None of these stressors are unusual or signs that you are in the wrong career.
                  They are <strong>normal features</strong> of working in the electrical trade. The
                  goal is not to eliminate them (most are outside your control), but to build the
                  resilience skills that allow you to manage them without them overwhelming your
                  mental health and wellbeing.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

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
                  Resilience is a <strong>process of adapting</strong> to adversity, not the absence
                  of difficulty
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  Research confirms resilience is <strong>measurable and learnable</strong> &mdash;
                  it is not a fixed personality trait
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  You can <strong>bounce back</strong> (return to baseline) or{' '}
                  <strong>bounce forward</strong> (grow beyond baseline) &mdash; both are valid
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  Common myths like &ldquo;tough people don&rsquo;t get stressed&rdquo; and
                  &ldquo;asking for help is weakness&rdquo; are{' '}
                  <strong>dangerous and incorrect</strong>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  Electricians face <strong>specific stressors</strong> that make resilience skills
                  particularly important for career longevity and wellbeing
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  Building resilience is not a luxury &mdash; in an industry with the highest
                  suicide rates, it is a <strong>life-saving investment</strong>
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
          <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />
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
            <Link to="../rsm-module-2-section-2">
              Next: The Science of Resilience
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
