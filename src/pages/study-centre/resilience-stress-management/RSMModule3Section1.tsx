import {
  ArrowLeft,
  Flower2,
  CheckCircle,
  HelpCircle,
  Brain,
  Heart,
  BookOpen,
  AlertTriangle,
  Leaf,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'mbsr-origin',
    question:
      'Who developed the Mindfulness-Based Stress Reduction (MBSR) programme, and at which institution?',
    options: [
      'Aaron Beck at the University of Pennsylvania',
      'Jon Kabat-Zinn at the University of Massachusetts Medical Center',
      'Daniel Goleman at Harvard University',
      'Martin Seligman at the University of Pennsylvania',
    ],
    correctIndex: 1,
    explanation:
      'Jon Kabat-Zinn developed MBSR in 1979 at the University of Massachusetts Medical Center. He created the programme to help patients with chronic pain and stress-related conditions, drawing on Buddhist meditation practices but framing them in a secular, evidence-based clinical context. The programme was formally published in his 1990 book Full Catastrophe Living.',
  },
  {
    id: 'mindfulness-definition',
    question: 'According to Kabat-Zinn, which of the following best describes what mindfulness IS?',
    options: [
      'Clearing your mind of all thoughts and achieving a blank mental state',
      'A religious or spiritual practice rooted in Buddhism',
      'Paying attention, on purpose, to the present moment, without judgement',
      'Ignoring problems and focusing only on positive experiences',
    ],
    correctIndex: 2,
    explanation:
      'Kabat-Zinn defines mindfulness as "paying attention, on purpose, in the present moment, and non-judgementally." This definition has three critical components: intentional attention (on purpose), present-moment focus (not ruminating about the past or worrying about the future), and a non-judgemental attitude (observing without labelling experiences as good or bad). It is not about clearing the mind, ignoring problems, or religious practice.',
  },
  {
    id: 'mbsr-evidence',
    question:
      'Which of the following statements about the evidence base for mindfulness is accurate?',
    options: [
      'Mindfulness has no recognised clinical evidence and is considered alternative medicine',
      'NICE recommends mindfulness-based cognitive therapy for recurrent depression, and research shows mindfulness reduces cortisol levels',
      'Mindfulness is only effective for physical health conditions, not mental health',
      'The NHS does not recognise mindfulness as a valid therapeutic approach',
    ],
    correctIndex: 1,
    explanation:
      'The National Institute for Health and Care Excellence (NICE) recommends mindfulness-based cognitive therapy (MBCT) as a treatment for recurrent depression. Research has consistently shown that regular mindfulness practice reduces cortisol (the primary stress hormone), improves immune function, reduces blood pressure, and decreases symptoms of anxiety and depression. The NHS offers mindfulness-based programmes through IAPT services.',
  },
];

const faqs = [
  {
    question: 'Do I need to sit cross-legged on the floor to practise mindfulness?',
    answer:
      'No. You can practise mindfulness in any position: sitting in your van, standing at a workbench, lying down during a break, or even walking between areas on site. The posture is far less important than the quality of attention. The only requirement is that you are in a position where you can pay deliberate attention to the present moment. Many construction workers find that practising during their commute, lunch break, or while waiting for materials is the most practical approach. There is no need for special equipment, clothing, or environments.',
  },
  {
    question: 'Is mindfulness a religious practice?',
    answer:
      'While mindfulness has roots in Buddhist meditation traditions, MBSR as developed by Kabat-Zinn is entirely secular and evidence-based. It is a clinical programme backed by thousands of peer-reviewed studies and is recommended by the NHS and NICE. You do not need to adopt any spiritual beliefs, subscribe to any philosophy, or change your worldview to benefit from mindfulness. Think of it like stretching: yoga has spiritual roots, but you can stretch your muscles without any spiritual component. Similarly, you can train your attention and awareness without any religious context.',
  },
  {
    question: 'How long do I need to practise before I notice any benefits?',
    answer:
      'Research suggests that noticeable changes in stress levels, focus, and emotional regulation can occur within two to four weeks of regular practice, with as little as ten minutes per day. However, even a single three-minute breathing space can produce immediate, measurable reductions in stress. The formal eight-week MBSR programme recommends forty-five minutes of daily practice, but studies have shown that even shorter regular practice produces significant benefits. The key is consistency rather than duration: ten minutes every day is more effective than an hour once a week.',
  },
  {
    question:
      'Can mindfulness help with the physical symptoms of stress, not just the mental ones?',
    answer:
      'Yes, and this is one of the strongest areas of evidence. Research has demonstrated that regular mindfulness practice reduces cortisol levels (the primary stress hormone), lowers blood pressure, improves heart rate variability (a key marker of cardiovascular health), strengthens immune function, reduces chronic inflammation, and improves sleep quality. These are not subjective reports; they are measurable physiological changes confirmed by controlled clinical trials. For electricians who experience physical stress symptoms such as tension headaches, muscle tightness, elevated blood pressure, or disrupted sleep, mindfulness offers a direct physiological intervention.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'In what year did Jon Kabat-Zinn first develop the MBSR programme?',
    options: ['1965', '1979', '1990', '2003'],
    correctAnswer: 1,
    explanation:
      'Kabat-Zinn founded the Stress Reduction Clinic at the University of Massachusetts Medical Center in 1979, where he began developing what would become the MBSR programme. His foundational book, Full Catastrophe Living, was published in 1990, which is sometimes confused with the start date. However, the programme itself was developed and first delivered in 1979.',
  },
  {
    id: 2,
    question:
      "Which of the following is NOT one of Kabat-Zinn's core mindfulness practices in MBSR?",
    options: [
      'Body scan meditation',
      'Sitting meditation',
      'Transcendental mantras',
      'Mindful movement',
    ],
    correctAnswer: 2,
    explanation:
      'Transcendental mantras are part of Transcendental Meditation (TM), not MBSR. The core practices of the MBSR programme are: the body scan, sitting meditation, mindful movement (gentle yoga-based stretching), and the three-minute breathing space. MBSR does not use mantras, chanting, or any specific spiritual or religious techniques.',
  },
  {
    id: 3,
    question: 'What does the "non-judgemental" component of mindfulness mean in practice?',
    options: [
      'You should approve of everything that happens to you',
      'You observe thoughts and sensations without labelling them as good or bad',
      'You should avoid making any decisions while practising mindfulness',
      'You must not criticise other people during mindfulness sessions',
    ],
    correctAnswer: 1,
    explanation:
      'Non-judgemental awareness means observing your thoughts, feelings, and sensations as they arise without automatically categorising them as good or bad, right or wrong. You simply notice what is present in your experience. This does not mean you approve of everything or stop making decisions; it means you create a space between the experience and your reaction to it, which gives you more choice in how you respond.',
  },
  {
    id: 4,
    question:
      'Which UK health body recommends mindfulness-based cognitive therapy (MBCT) for recurrent depression?',
    options: [
      'The Health and Safety Executive (HSE)',
      'The British Medical Association (BMA)',
      'The National Institute for Health and Care Excellence (NICE)',
      'The General Medical Council (GMC)',
    ],
    correctAnswer: 2,
    explanation:
      'NICE (the National Institute for Health and Care Excellence) recommends MBCT as a treatment for people who have experienced three or more episodes of depression. This recommendation is based on robust clinical evidence showing that MBCT reduces the risk of relapse by approximately 40-50% compared to usual care. The NHS offers MBCT through its IAPT (Improving Access to Psychological Therapies) services.',
  },
  {
    id: 5,
    question: 'What is the three-minute breathing space designed to do?',
    options: [
      'Replace longer meditation sessions entirely',
      'Provide a brief but structured mindfulness practice that can be used throughout the day to reconnect with the present moment',
      'Reduce blood pressure permanently after a single use',
      'Help you fall asleep quickly at night',
    ],
    correctAnswer: 1,
    explanation:
      'The three-minute breathing space is a brief, structured practice designed to be used throughout the day as a "mini meditation." It has three phases: awareness (noticing what is present), gathering (focusing on the breath), and expanding (broadening awareness to the whole body). It is not a replacement for longer practice but a practical tool for pausing, reconnecting with the present, and breaking the cycle of automatic stress reactions during a busy working day.',
  },
  {
    id: 6,
    question:
      'What physiological effect does regular mindfulness practice have on cortisol levels?',
    options: [
      'It has no measurable effect on cortisol',
      'It increases cortisol to improve alertness',
      'It reduces cortisol, the primary stress hormone',
      'It only affects cortisol during the meditation session itself',
    ],
    correctAnswer: 2,
    explanation:
      'Multiple controlled studies have demonstrated that regular mindfulness practice reduces baseline cortisol levels. Cortisol is the primary stress hormone, produced by the adrenal glands as part of the fight-or-flight response. Chronically elevated cortisol contributes to high blood pressure, weakened immune function, weight gain, and cognitive impairment. Regular mindfulness practice reduces cortisol both during practice and at baseline, meaning the benefits extend beyond the meditation session itself.',
  },
  {
    id: 7,
    question:
      'An electrician is about to carry out a complex consumer unit change. Based on MBSR principles, which technique would be most appropriate to use immediately before starting?',
    options: [
      'A forty-five minute sitting meditation',
      'A three-minute breathing space to centre attention and bring awareness to the present task',
      'A full body scan lasting twenty minutes',
      'Mindful movement exercises for ten minutes',
    ],
    correctAnswer: 1,
    explanation:
      'The three-minute breathing space is specifically designed for use during the working day when longer practices are impractical. Before a complex task like a consumer unit change, a three-minute breathing space allows you to pause, gather your attention, and bring full present-moment awareness to the task at hand. This reduces the likelihood of errors caused by distraction, rumination, or stress. A forty-five minute meditation or twenty-minute body scan would be impractical before a specific task.',
  },
  {
    id: 8,
    question: 'Which of the following statements about mindfulness is FALSE?',
    options: [
      'Mindfulness involves paying deliberate attention to the present moment',
      'Mindfulness requires you to clear your mind completely of all thoughts',
      'Mindfulness can improve immune function and reduce blood pressure',
      'Mindfulness is recommended by NICE for certain mental health conditions',
    ],
    correctAnswer: 1,
    explanation:
      'The statement that mindfulness requires you to clear your mind completely is false. This is one of the most common misconceptions about mindfulness. Mindfulness does not involve achieving a blank mental state. Instead, it involves noticing thoughts as they arise, observing them without judgement, and gently returning attention to the present moment. Having thoughts during mindfulness practice is completely normal and expected; the skill is in how you relate to those thoughts, not in eliminating them.',
  },
];

export default function RSMModule3Section1() {
  useSEO({
    title: 'Mindfulness-Based Stress Reduction | RSM Module 3.1',
    description:
      "Kabat-Zinn's MBSR programme, what mindfulness is and is not, the NHS evidence base, core practices, and construction-specific applications.",
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
            <Flower2 className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Mindfulness-Based Stress Reduction
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            The science behind mindfulness, its evidence base, core practices, and how electricians
            can apply MBSR techniques on site and in daily life
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Origin:</strong> Kabat-Zinn developed MBSR in 1979 at the University of
                Massachusetts
              </li>
              <li>
                <strong>Definition:</strong> Paying attention, on purpose, to the present moment,
                without judgement
              </li>
              <li>
                <strong>Evidence:</strong> NHS-recommended, NICE-approved, reduces cortisol and
                improves immune function
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Focus:</strong> Mindfulness directly improves concentration during complex
                electrical tasks
              </li>
              <li>
                <strong>Stress:</strong> Regular practice measurably reduces the physiological
                effects of chronic stress
              </li>
              <li>
                <strong>Safety:</strong> Present-moment awareness reduces errors caused by
                distraction and rumination
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Describe the origins of MBSR and explain how Kabat-Zinn adapted meditation for clinical use',
              "Define mindfulness using Kabat-Zinn's three-part definition and distinguish it from common misconceptions",
              'Summarise the evidence base for mindfulness, including NICE recommendations and physiological research',
              'Outline the structure of the eight-week MBSR programme and its four core practices',
              'Explain the three-minute breathing space technique and its three stages',
              'Apply mindfulness principles to construction-specific scenarios including complex tasks, testing, and break times',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Origins of MBSR */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Origins of MBSR
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mindfulness-Based Stress Reduction (MBSR) was developed in 1979 by{' '}
                <strong>Jon Kabat-Zinn</strong> at the Stress Reduction Clinic, University of
                Massachusetts Medical Center. Kabat-Zinn, a molecular biologist with a background in
                Zen Buddhism and yoga, recognised that the attentional training techniques used in
                contemplative traditions could be extracted from their religious context and applied
                in a clinical, evidence-based setting to help patients with chronic pain, anxiety,
                and stress-related conditions.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Historical Context:</strong> In the late 1970s,
                  the medical establishment had limited options for patients whose chronic pain and
                  stress conditions did not respond well to conventional treatment. Kabat-Zinn saw
                  an opportunity to bridge Eastern contemplative practices and Western clinical
                  medicine. His genius was not inventing mindfulness &mdash; it has been practised
                  for over 2,500 years &mdash; but making it accessible, secular, and measurable.
                </p>
              </div>

              <p>
                The programme he created was originally called the Stress Reduction and Relaxation
                Programme. It was designed as an eight-week group course that taught participants
                structured meditation and awareness practices. His foundational book,{' '}
                <em>Full Catastrophe Living</em>, was published in 1990 and laid out the theoretical
                and practical framework for MBSR in detail.
              </p>

              <p>
                Since its founding, MBSR has become one of the most studied psychological
                interventions in history. Over 30,000 people have completed the programme at the
                UMass Medical Center alone, and it is now offered in hospitals, clinics, workplaces,
                prisons, schools, and military settings across more than 30 countries. The evidence
                base has grown from a handful of early studies to thousands of peer-reviewed
                publications, making mindfulness one of the most robustly supported
                stress-management techniques available today.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">
                    Why This Matters for Electricians
                  </p>
                </div>
                <p className="text-sm text-white">
                  You do not need to become a meditation expert. The reason we cover the origins of
                  MBSR is so you understand that mindfulness is not a fad, a trend, or a vague
                  wellness concept. It is a clinically developed, rigorously tested programme with
                  nearly fifty years of evidence behind it. When you practise a three-minute
                  breathing space before a complex consumer unit change, you are using a technique
                  that has been validated by thousands of clinical studies and recommended by the
                  NHS.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: What Mindfulness IS */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            What Mindfulness IS
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Kabat-Zinn defines mindfulness as{' '}
                <strong>
                  &ldquo;paying attention, on purpose, in the present moment, and
                  non-judgementally.&rdquo;
                </strong>{' '}
                This definition is deceptively simple but contains three critical components that
                are worth unpacking individually.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Paying Attention On Purpose (Intentionality)
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    Most of the time, our attention wanders without our deliberate control. We think
                    about yesterday, worry about tomorrow, replay conversations, and mentally
                    rehearse scenarios &mdash; all while supposedly doing something else.
                    Mindfulness involves making a deliberate, conscious decision to direct your
                    attention to a specific focus. It is the difference between absent-mindedly
                    wiring a socket while thinking about your mortgage and consciously choosing to
                    give your full attention to the task in front of you. The &ldquo;on
                    purpose&rdquo; element transforms attention from something that happens{' '}
                    <em>to</em> you into something you actively <em>choose</em>.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      In the Present Moment (Temporal Focus)
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    Research by psychologists Matthew Killingsworth and Daniel Gilbert at Harvard
                    (2010) found that people spend approximately 47% of their waking hours thinking
                    about something other than what they are currently doing &mdash; and that this
                    mind-wandering is a significant cause of unhappiness. Mindfulness trains you to
                    anchor your attention in the present moment: what you can see, hear, touch, and
                    feel right now. This does not mean you never plan or reflect; it means that when
                    you are doing something, you give it your full attention rather than operating
                    on autopilot while your mind is elsewhere.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Without Judgement (Non-Reactivity)
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    The non-judgemental component is perhaps the most challenging and the most
                    transformative. Normally, we automatically judge our experiences: this is good,
                    that is bad, I should not be feeling this, why am I thinking about that.
                    Mindfulness involves observing your thoughts, feelings, and sensations as they
                    arise without immediately categorising them. A thought is just a thought. A
                    sensation is just a sensation. A feeling is just a feeling. By creating this
                    observational distance, you gain the space to choose your response rather than
                    reacting automatically. This is particularly powerful in stressful situations
                    where automatic reactions often make things worse.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Flower2 className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Mindful Attention During Testing
                  </p>
                </div>
                <p className="text-sm text-white">
                  You are carrying out insulation resistance testing on a complex commercial
                  installation. Instead of running the tests mechanically while thinking about your
                  next job, you deliberately choose to bring your full attention to the task:
                  noticing the meter readings, feeling the test leads in your hands, hearing the
                  click of connections, observing the values without immediately reacting with
                  frustration if a reading is unexpected. This quality of attention makes you more
                  likely to notice anomalies, less likely to make recording errors, and better
                  equipped to interpret unusual results accurately. It is not mystical &mdash; it is
                  simply the difference between doing the job on autopilot and doing it with full,
                  deliberate attention.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: What Mindfulness is NOT */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            What Mindfulness is NOT
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mindfulness carries a lot of misconceptions, particularly in industries like
                construction where it can be dismissed as &ldquo;hippy stuff&rdquo; or &ldquo;not
                for us.&rdquo; Understanding what mindfulness is <em>not</em> is just as important
                as understanding what it is, because these misconceptions are often the biggest
                barrier to people trying it.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Misconception 1: Clearing Your Mind
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    This is the single most common misconception about mindfulness. People try it,
                    find that their mind is full of thoughts, conclude that they &ldquo;cannot do
                    it,&rdquo; and give up. But mindfulness has never been about achieving a blank
                    mental state. Your mind produces thoughts &mdash; that is what it does.
                    Mindfulness is about changing your <em>relationship</em> to those thoughts:
                    noticing them, observing them without getting carried away by them, and gently
                    returning your attention to the present. Every time you notice your mind has
                    wandered and bring it back, that <em>is</em> the practice. The wandering is not
                    failure; the noticing is success.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Misconception 2: Religious Practice
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    While mindfulness has roots in Buddhist contemplative traditions, MBSR is a
                    secular, clinical programme. It requires no spiritual beliefs, no religious
                    affiliation, and no philosophical commitments. It is recommended by the NHS and
                    NICE, taught in hospitals and military settings, and backed by neuroscience
                    research. You do not need to believe in anything to benefit from training your
                    attention. The same attentional skills that Buddhist monks developed over
                    centuries are now taught in boardrooms, barracks, and operating theatres &mdash;
                    entirely without religious context.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Misconception 3: Ignoring Problems
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    Mindfulness does not mean accepting everything passively or pretending problems
                    do not exist. In fact, the opposite is true: mindfulness helps you see problems
                    more clearly because you are no longer clouded by automatic emotional reactions.
                    A mindful electrician who receives a complaint about their work does not ignore
                    it or suppress their reaction &mdash; they observe their initial emotional
                    response (perhaps defensiveness or frustration), allow it to pass, and then
                    engage with the complaint from a place of clarity rather than reactivity.
                    Mindfulness improves problem-solving; it does not replace it.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-rose-400" />
                    <p className="text-sm font-medium text-rose-400">
                      Misconception 4: Being Passive
                    </p>
                  </div>
                  <p className="text-sm text-white">
                    Some people worry that mindfulness will make them &ldquo;soft&rdquo; or less
                    driven. Research shows the opposite: mindful individuals are typically more
                    productive, make better decisions, and respond more effectively under pressure.
                    Mindfulness does not remove your drive or ambition; it removes the unnecessary
                    stress, rumination, and emotional reactivity that waste your energy and impair
                    your performance. The most elite military units in the world train in
                    mindfulness &mdash; not because they want to be passive, but because
                    present-moment awareness under pressure is a tactical advantage.
                  </p>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Bottom Line:</strong> Mindfulness is not about
                  clearing your mind, becoming religious, ignoring problems, or being passive. It is
                  a practical, evidence-based skill for training your attention, managing stress,
                  and improving your capacity to respond effectively under pressure. It is cognitive
                  fitness for your brain, just as physical exercise is fitness for your body.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: The Evidence Base */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            The Evidence Base
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most important things about mindfulness is that it is not just a nice
                idea &mdash; it is one of the most thoroughly researched psychological interventions
                in existence. The evidence base spans neuroscience, immunology, endocrinology,
                psychology, and clinical medicine.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Research Findings</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>NICE Recommendation:</strong> The National Institute for Health and
                      Care Excellence recommends mindfulness-based cognitive therapy (MBCT) for
                      people who have experienced three or more episodes of depression, based on
                      evidence that it reduces relapse rates by 40-50%
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>NHS Availability:</strong> The NHS offers mindfulness-based programmes
                      through IAPT (Improving Access to Psychological Therapies) services across
                      England
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Cortisol Reduction:</strong> Multiple studies confirm that regular
                      mindfulness practice reduces cortisol (the primary stress hormone), both
                      during practice and at baseline resting levels
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Immune Function:</strong> Davidson et al. (2003) at the University of
                      Wisconsin found that an eight-week mindfulness programme produced measurable
                      improvements in immune function, including increased antibody production in
                      response to flu vaccination
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Brain Structure:</strong> Lazar et al. (2005) at Harvard demonstrated
                      that regular meditators had increased cortical thickness in brain regions
                      associated with attention, sensory processing, and interoception (awareness of
                      internal body states)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Blood Pressure:</strong> A meta-analysis by Gotink et al. (2015) found
                      that mindfulness-based interventions significantly reduced blood pressure in
                      both hypertensive and normotensive participants
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The evidence is not limited to laboratory settings. Workplace studies have
                consistently shown that mindfulness training improves concentration, reduces
                absenteeism, improves interpersonal relationships, and reduces the physiological
                markers of occupational stress. A study by Hoge et al. (2013) found that mindfulness
                meditation reduced stress reactivity in people with generalised anxiety disorder,
                while Creswell et al. (2014) demonstrated that mindfulness reduced inflammatory
                biomarkers associated with chronic stress.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">
                    What This Means in Practical Terms
                  </p>
                </div>
                <p className="text-sm text-white">
                  If you practise mindfulness regularly &mdash; even ten minutes a day &mdash; the
                  research suggests you will experience lower stress hormone levels, better immune
                  function, reduced blood pressure, improved concentration, better emotional
                  regulation, and structural changes in the brain regions responsible for attention
                  and self-awareness. These are not subjective opinions; they are measurable,
                  reproducible physiological changes confirmed by controlled clinical trials
                  published in peer-reviewed journals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: The Eight-Week MBSR Programme */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            The Eight-Week MBSR Programme
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The standard MBSR programme runs for eight weeks and consists of weekly group
                sessions (typically 2.5 hours each) plus daily home practice (45 minutes
                recommended). There is also a full-day silent retreat between weeks six and seven.
                The programme teaches four core practices that form the foundation of mindfulness
                training.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm font-medium text-rose-400">Body Scan Meditation</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    A systematic practice of directing attention through each part of the body, from
                    the feet to the top of the head. You notice sensations &mdash; warmth, tingling,
                    tension, numbness, pain &mdash; without trying to change them. The body scan
                    develops interoceptive awareness (the ability to sense your internal physical
                    state) and teaches you to observe sensations without reactivity. Typically
                    practised lying down for 30-45 minutes in the formal programme, though shorter
                    versions (10-15 minutes) are also effective.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> A ten-minute body scan
                      during your lunch break helps you notice where you are holding physical
                      tension (shoulders, jaw, lower back) and release it before the afternoon
                      shift. This is particularly valuable for electricians who work in physically
                      demanding positions &mdash; overhead work, crawling in confined spaces, or
                      standing on ladders for extended periods.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm font-medium text-rose-400">Sitting Meditation</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    The practice of sitting in a stable, comfortable position and focusing attention
                    on a chosen anchor &mdash; usually the breath. When your mind wanders (which it
                    will, repeatedly), you gently notice that it has wandered and bring attention
                    back to the breath. This is the core practice that develops the
                    &ldquo;attentional muscle&rdquo; &mdash; the ability to sustain focus, notice
                    when focus has been lost, and redirect it. Over time, the object of attention
                    expands to include sounds, body sensations, thoughts, and emotions &mdash;
                    always with the same quality of non-judgemental observation.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> Even five minutes of
                      sitting meditation in the van before starting work can improve your focus and
                      reduce the residual stress from a difficult commute or a bad morning at home.
                      You do not need a meditation cushion &mdash; the driver&rsquo;s seat works
                      perfectly well.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm font-medium text-rose-400">Mindful Movement</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    Gentle, yoga-based stretching and movement practised with full awareness of the
                    body. Unlike conventional exercise where the goal is physical performance,
                    mindful movement focuses on the quality of attention you bring to each movement.
                    You notice how your body feels as it moves, where the edges of comfort are, and
                    how your relationship with physical sensation changes when you observe it
                    without judgement. This practice is particularly relevant for people in physical
                    occupations because it develops awareness of the body during movement &mdash;
                    helping to prevent injury and recognise early signs of strain.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> Bringing mindful awareness
                      to physical tasks &mdash; noticing how your body feels while lifting,
                      climbing, reaching, or kneeling &mdash; helps you work within your physical
                      limits and recognise when you need to adjust your position or take a break
                      before strain becomes injury.
                    </p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Three-Minute Breathing Space
                    </p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    A brief, structured practice designed to be used throughout the day as a
                    &ldquo;mini meditation.&rdquo; It has three distinct phases, each lasting
                    approximately one minute:
                    <strong> Awareness</strong> (acknowledging what is present in your experience
                    right now),
                    <strong> Gathering</strong> (focusing attention narrowly on the breath), and
                    <strong> Expanding</strong> (broadening awareness to the whole body and the
                    surrounding environment). This is the most practical technique for working life
                    because it can be used anywhere, at any time, without anyone knowing you are
                    doing it.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> Before starting a complex
                      consumer unit change, use a three-minute breathing space to transition from
                      whatever you were previously doing (driving, talking, stressing about
                      invoices) into a state of focused, present-moment attention. This brief reset
                      significantly reduces the likelihood of errors caused by carrying mental
                      baggage from previous activities into a task that demands your full
                      concentration.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    You Do Not Need to Complete the Full Programme
                  </p>
                </div>
                <p className="text-sm text-white">
                  The formal eight-week MBSR programme is the gold standard, but research shows that
                  even shorter regular practice produces significant benefits. Many of the
                  techniques &mdash; particularly the three-minute breathing space and informal
                  mindfulness practices &mdash; can be integrated into your working day immediately
                  without any formal training. The goal of this section is not to turn you into a
                  meditation practitioner; it is to give you practical, evidence-based tools that
                  you can use right away to manage stress, improve focus, and enhance your
                  professional performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Construction-Specific Applications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Construction-Specific Applications
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mindfulness is not something that only works in quiet rooms with scented candles.
                Its greatest value is in real-world, high-pressure environments &mdash; exactly the
                kind of environments electricians work in every day. Here are specific ways to apply
                mindfulness principles during a typical working day.
              </p>

              <div className="space-y-3">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-2">
                    Three-Minute Breathing Space Before Complex Tasks
                  </p>
                  <p className="text-sm text-white">
                    Before starting a consumer unit change, a fault-finding investigation, or any
                    task that demands high levels of concentration, take three minutes in the van or
                    a quiet corner.
                    <strong> Minute one:</strong> Notice what you are currently thinking and feeling
                    (perhaps stress from the previous job, worry about the schedule, frustration
                    with traffic).
                    <strong> Minute two:</strong> Focus your attention narrowly on your breath,
                    feeling the air enter and leave your nostrils.
                    <strong> Minute three:</strong> Expand your awareness to your whole body, the
                    space around you, and the task ahead. You are now present, focused, and ready to
                    give the complex task your full attention.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-2">
                    Body Scan During Lunch Break
                  </p>
                  <p className="text-sm text-white">
                    Spend ten minutes during your lunch break doing a quick body scan. Sit
                    comfortably (in the van, on a bench, wherever is practical) and systematically
                    move your attention through your body from your feet to the top of your head.
                    Notice where you are holding tension: tight shoulders from overhead work, aching
                    lower back from bending, clenched jaw from stress. Simply noticing and breathing
                    into these areas of tension can produce measurable relaxation. This practice
                    also helps you identify when physical strain is building up before it becomes an
                    injury.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-rose-400 mb-2">
                    Mindful Attention During Testing
                  </p>
                  <p className="text-sm text-white">
                    When carrying out testing &mdash; whether it is insulation resistance,
                    continuity, earth fault loop impedance, or RCD testing &mdash; practise bringing
                    your full, deliberate attention to the task. Notice the meter readings without
                    rushing. Feel the test leads making contact. Listen to the instrument. Observe
                    the values without immediately reacting. This quality of attention reduces
                    errors, improves accuracy, and helps you notice anomalies that might be missed
                    if you were operating on autopilot. Testing is inherently a mindfulness activity
                    if you approach it with the right quality of attention.
                  </p>
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="border-l-2 border-green-500/50 pl-4 mt-8">
                <p className="text-sm font-medium text-white mb-3">Key Takeaways</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      MBSR was developed by Kabat-Zinn in 1979 and has nearly fifty years of
                      clinical evidence
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Mindfulness is paying attention, on purpose, to the present moment, without
                      judgement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      It is NOT clearing your mind, religious practice, ignoring problems, or being
                      passive
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      NICE recommends MBCT for recurrent depression; research confirms cortisol
                      reduction and immune improvement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Core practices &mdash; body scan, sitting meditation, mindful movement, and
                      the three-minute breathing space &mdash; can all be adapted for the
                      construction environment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      Even brief, regular practice (ten minutes daily) produces measurable
                      physiological and psychological benefits
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../rsm-module-3-section-2">
              Next: Practical Mindfulness Techniques
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
