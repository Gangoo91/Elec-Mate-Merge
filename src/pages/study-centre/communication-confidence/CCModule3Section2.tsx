import { ArrowLeft, HeartPulse, CheckCircle, Brain, Wind, Users, HardHat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'cc-cbt-restructuring',
    question:
      'A colleague thinks &ldquo;Everyone will laugh at me if I speak up in the progress meeting.&rdquo; Using cognitive restructuring, which is the best reframed thought?',
    options: [
      'I should never speak in meetings because people might judge me',
      'Most people are focused on the agenda, not judging me &mdash; sharing useful information helps the team',
      'I will just avoid meetings altogether to stay safe',
      'If they laugh, I will never speak again',
    ],
    correctIndex: 1,
    explanation:
      'Cognitive restructuring involves identifying the unhelpful thought, examining the evidence for and against it, and replacing it with a more balanced, realistic alternative. Most colleagues at a progress meeting are focused on the work, not on judging someone who contributes. The reframed thought acknowledges reality without catastrophising.',
  },
  {
    id: 'cc-box-breathing',
    question: 'What is the correct sequence for box breathing?',
    options: [
      'Breathe in for 2 seconds, hold for 6 seconds, breathe out for 2 seconds',
      'Breathe in for 4 seconds, hold for 4 seconds, breathe out for 4 seconds, hold for 4 seconds',
      'Breathe in for 7 seconds, hold for 4 seconds, breathe out for 8 seconds',
      'Breathe rapidly for 10 seconds, then hold for 10 seconds',
    ],
    correctIndex: 1,
    explanation:
      'Box breathing (also called square breathing or 4-4-4-4 breathing) uses equal intervals: inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds. This activates the parasympathetic nervous system and reduces the physiological symptoms of anxiety.',
  },
  {
    id: 'cc-exposure-ladder',
    question:
      'In systematic desensitisation, why do you start with low-anxiety situations before progressing to higher-anxiety ones?',
    options: [
      'Because high-anxiety situations are always dangerous',
      'Because starting small builds confidence and tolerance gradually, making each next step feel achievable',
      'Because you should only ever practise in low-anxiety situations',
      'Because systematic desensitisation only works for mild anxiety',
    ],
    correctIndex: 1,
    explanation:
      'Systematic desensitisation works on the principle of graduated exposure. Starting with situations that provoke mild anxiety allows you to build coping skills and confidence. Each successful experience reduces the anxiety response at that level, making the next step up feel more manageable. This creates a positive reinforcement cycle.',
  },
];

const faqs = [
  {
    question: 'Is speaking anxiety a sign of weakness or incompetence?',
    answer:
      'Absolutely not. Research consistently shows that approximately 75% of people experience some degree of speaking anxiety. It is one of the most common fears in the general population. Many highly competent professionals &mdash; including senior engineers, project managers, and trade leaders &mdash; experience nervousness before speaking. The difference between someone who appears confident and someone who does not is rarely the absence of anxiety; it is the presence of coping strategies. Anxiety is a normal physiological response, and learning to manage it is a skill like any other.',
  },
  {
    question: 'How long does it take to overcome speaking anxiety?',
    answer:
      'There is no fixed timeline &mdash; it depends on the severity of your anxiety, how consistently you practise, and which strategies work best for you. Many people notice meaningful improvement within 4&ndash;8 weeks of regular, deliberate exposure (such as volunteering to speak in small meetings once per week). Cognitive restructuring techniques can produce noticeable shifts in thinking patterns within 2&ndash;3 weeks of daily practice. However, it is important to set realistic expectations: the goal is not to eliminate all nervousness (some adrenaline actually improves performance) but to manage it so it does not prevent you from speaking when you need to.',
  },
  {
    question: 'What if I freeze or go blank mid-sentence in front of colleagues?',
    answer:
      'Freezing is a common anxiety response and it feels far worse to you than it looks to others. If it happens, pause and take a slow breath (this feels like an eternity to you but looks natural to the audience). You can say &ldquo;Let me just check my notes&rdquo; or &ldquo;I want to make sure I get this right&rdquo; &mdash; these are normal professional phrases that buy you time. Having brief written notes or bullet points in front of you is not a weakness; it is what experienced speakers do. With practice, freezing episodes become less frequent and shorter.',
  },
  {
    question: 'Are power poses and body language techniques actually supported by evidence?',
    answer:
      'This is an area where the science has evolved. Amy Cuddy&rsquo;s original 2010 research claimed that adopting expansive postures (&ldquo;power poses&rdquo;) for two minutes changed hormone levels (increasing testosterone, decreasing cortisol). Several replication studies failed to reproduce these hormonal findings, and the hormonal claims are now considered unsupported. However, subsequent research &mdash; including Cuddy&rsquo;s own updated work &mdash; has found more modest but consistent effects: adopting open, expansive postures before a stressful situation can improve subjective feelings of confidence and reduce self-reported anxiety. The &ldquo;presence&rdquo; framing (feeling more grounded and self-assured) appears to have support, even if the hormonal mechanism does not. In practice, standing tall and open before your toolbox talk is unlikely to change your hormones, but it may genuinely help you feel more composed.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Approximately what percentage of the population experiences some degree of fear about public speaking?',
    options: ['25%', '50%', '75%', '95%'],
    correctAnswer: 2,
    explanation:
      'Research consistently shows that approximately 75% of people experience glossophobia (fear of public speaking) to some degree. It is one of the most commonly reported fears, often ranking above fear of heights, spiders, and even death in surveys.',
  },
  {
    id: 2,
    question:
      'In cognitive behavioural therapy (CBT), what is the process of identifying and challenging unhelpful thoughts called?',
    options: [
      'Systematic desensitisation',
      'Cognitive restructuring',
      'Exposure therapy',
      'Mindfulness meditation',
    ],
    correctAnswer: 1,
    explanation:
      'Cognitive restructuring is the CBT technique of identifying automatic negative thoughts, examining the evidence for and against them, and replacing them with more balanced, realistic alternatives. It targets the thinking patterns that fuel anxiety rather than the anxiety itself.',
  },
  {
    id: 3,
    question: 'Which breathing technique uses a 4-4-4-4 pattern of inhale, hold, exhale, hold?',
    options: [
      'Diaphragmatic breathing',
      'The physiological sigh',
      'Box breathing',
      'Alternate nostril breathing',
    ],
    correctAnswer: 2,
    explanation:
      'Box breathing (also called square breathing or tactical breathing) uses four equal phases of 4 seconds each: inhale for 4, hold for 4, exhale for 4, hold for 4. It is used by military personnel, first responders, and athletes to manage acute stress and anxiety.',
  },
  {
    id: 4,
    question: 'What is the physiological sigh?',
    options: [
      'A single long exhale lasting 10 seconds',
      'A double inhale through the nose followed by a long exhale through the mouth',
      'Breathing rapidly for 30 seconds to increase oxygen',
      'Holding your breath for as long as possible',
    ],
    correctAnswer: 1,
    explanation:
      'The physiological sigh consists of a double inhale through the nose (a normal inhale followed immediately by a shorter, sharper &ldquo;top-up&rdquo; inhale) and then a long, slow exhale through the mouth. Research by Andrew Huberman at Stanford has shown this to be one of the fastest ways to reduce physiological arousal in real time.',
  },
  {
    id: 5,
    question:
      'In systematic desensitisation, what is the correct approach to building an exposure ladder?',
    options: [
      'Start with the most frightening situation to get it over with quickly',
      'Only practise situations you are already comfortable with',
      'Start with low-anxiety situations and gradually progress to higher-anxiety ones as confidence builds',
      'Skip straight to public speaking in front of large groups',
    ],
    correctAnswer: 2,
    explanation:
      'Systematic desensitisation uses graduated exposure &mdash; starting with situations that provoke mild anxiety and progressively working up to more challenging ones. Each successful experience at one level builds the confidence and coping capacity needed for the next. Jumping to the most frightening situation first (flooding) can be counterproductive and reinforce avoidance.',
  },
  {
    id: 6,
    question:
      'What is the current scientific consensus on Amy Cuddy&rsquo;s &ldquo;power pose&rdquo; research?',
    options: [
      'The hormonal findings have been fully replicated and are considered established science',
      'The original hormonal claims have not been reliably replicated, but the &ldquo;presence&rdquo; framing (feeling more confident and composed) has some support',
      'The entire body of research has been completely discredited with no useful findings',
      'Power poses have been proven to double testosterone levels in all studies',
    ],
    correctAnswer: 1,
    explanation:
      'The original 2010 claims about hormonal changes (increased testosterone, decreased cortisol) from power posing have not been reliably replicated and are considered unsupported. However, more recent research has found that adopting open, expansive postures can improve subjective feelings of confidence and reduce self-reported anxiety. The &ldquo;presence&rdquo; framing &mdash; feeling more grounded and self-assured &mdash; has more support than the hormonal mechanism.',
  },
  {
    id: 7,
    question:
      'An apprentice electrician needs to deliver their first toolbox talk on cable management. Which approach best applies the principles from this section?',
    options: [
      'Avoid preparing and just wing it to seem natural',
      'Prepare bullet-point notes, practise with a trusted colleague first, use box breathing beforehand, and remind yourself that colleagues want useful information not a performance',
      'Memorise a script word-for-word and refuse to take questions',
      'Ask someone else to deliver it because anxiety means you cannot do it',
    ],
    correctAnswer: 1,
    explanation:
      'This approach combines multiple evidence-based strategies: preparation (reduces uncertainty), graduated exposure (practising with one person first), physiological regulation (box breathing), and cognitive restructuring (reframing from &ldquo;performance&rdquo; to &ldquo;sharing useful information&rdquo;). Together, these make the task manageable and build confidence for future talks.',
  },
  {
    id: 8,
    question:
      'A worker notices unsafe practice on site but feels too anxious to speak up. What is the most appropriate response?',
    options: [
      'Stay silent to avoid conflict &mdash; someone else will report it',
      'Recognise the anxiety as normal, use a brief breathing technique to settle nerves, and report the concern using the site&rsquo;s reporting procedure or speak to their supervisor directly',
      'Shout across the site to draw attention to the problem',
      'Wait until the next formal meeting to raise it, even if there is immediate risk',
    ],
    correctAnswer: 1,
    explanation:
      'Safety communication is a legal and moral obligation under the Health and Safety at Work etc. Act 1974. The anxiety about speaking up is normal and understandable, but the techniques in this section &mdash; breathing regulation, cognitive reframing, and using established procedures &mdash; help you act despite the anxiety. Unsafe practice that poses immediate risk must be reported promptly, not left for a future meeting.',
  },
];

export default function CCModule3Section2() {
  useSEO({
    title: 'Overcoming Speaking Anxiety | Communication & Confidence Module 3.2',
    description:
      'Evidence-based strategies for managing speaking anxiety including CBT cognitive restructuring, systematic desensitisation, box breathing, and graduated exposure for electricians and construction professionals.',
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
            <Link to="../cc-module-3">
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
            <HeartPulse className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Overcoming Speaking Anxiety
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Evidence-based strategies for managing glossophobia, from cognitive restructuring and
            breathing techniques to graduated exposure in construction settings
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>75% of people</strong> fear public speaking &mdash; you are not alone
              </li>
              <li>
                <strong>CBT restructuring:</strong> Challenge unhelpful thoughts with evidence
              </li>
              <li>
                <strong>Box breathing (4-4-4-4):</strong> Fastest way to calm your nervous system
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Exposure ladder:</strong> Start small (1-to-1), build to toolbox talks
              </li>
              <li>
                <strong>Preparation beats talent:</strong> Bullet points, not memorised scripts
              </li>
              <li>
                <strong>Safety duty:</strong> Anxiety must not prevent reporting unsafe practice
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the prevalence of glossophobia and why it is a normal physiological response, not a character flaw',
              'Apply cognitive restructuring to identify and challenge unhelpful thoughts about speaking',
              'Construct a personal exposure ladder using systematic desensitisation principles',
              'Demonstrate box breathing and the physiological sigh as acute anxiety management tools',
              'Critically evaluate the evidence base for body language and presence research, including its limitations',
              'Apply speaking anxiety strategies to construction scenarios including toolbox talks, progress meetings, and safety reporting',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Understanding Speaking Anxiety */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            Understanding Speaking Anxiety
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Glossophobia &mdash; the fear of speaking in front of others &mdash; is one of the
                most common anxieties in the human population. Research consistently shows that
                approximately <strong>75% of people</strong> experience some degree of speaking
                anxiety. In surveys, fear of public speaking regularly ranks above fear of heights,
                spiders, and even death. This is not an exaggeration for comedic effect; it reflects
                a genuine and deeply rooted human response.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Why Does This Happen?</strong> Speaking anxiety
                  is rooted in our evolutionary wiring. For our ancestors, being judged negatively
                  by the group could mean social exclusion &mdash; which in a survival context was
                  potentially fatal. The amygdala (your brain&rsquo;s threat-detection centre)
                  triggers a fight-or-flight response when it perceives social evaluation: increased
                  heart rate, shallow breathing, sweating, dry mouth, shaking, and the urge to flee.
                  These are <strong>normal physiological responses</strong>, not signs of weakness.
                </p>
              </div>

              <p>
                In the construction and electrical trades, speaking anxiety can have real
                consequences beyond personal discomfort. It can prevent apprentices from asking
                questions during inductions, stop workers from raising safety concerns, make toolbox
                talks feel impossible, and hold back career progression. Understanding that speaking
                anxiety is common, normal, and manageable is the first step toward overcoming it.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Physical Symptoms of Speaking Anxiety
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    'Rapid heartbeat (palpitations)',
                    'Shallow, fast breathing',
                    'Sweating (especially palms and forehead)',
                    'Dry mouth and tight throat',
                    'Shaking hands or trembling voice',
                    'Nausea or &ldquo;butterflies&rdquo; in the stomach',
                    'Mental blanking or difficulty finding words',
                    'Blushing or feeling hot',
                  ].map((symptom, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-white">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                      <span dangerouslySetInnerHTML={{ __html: symptom }} />
                    </div>
                  ))}
                </div>
              </div>

              <p>
                Every one of these symptoms is a normal adrenaline response. They feel overwhelming
                to you, but research shows that audiences consistently rate speakers as{' '}
                <strong>far less nervous</strong> than the speakers rate themselves. This gap
                between how anxious you feel and how anxious you appear is called the{' '}
                <strong>illusion of transparency</strong> &mdash; and it is consistently overstated
                by anxious speakers.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: Cognitive Restructuring (CBT) */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            <Brain className="h-5 w-5 text-rose-400" />
            Cognitive Restructuring
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Cognitive Behavioural Therapy (CBT) is one of the most thoroughly researched and
                evidence-based approaches to managing anxiety. At its core is the principle that{' '}
                <strong>thoughts drive feelings, and feelings drive behaviours</strong>. If you can
                change the thought, you can change the feeling and the behaviour that follows.
              </p>

              <p>
                <strong>Cognitive restructuring</strong> is the specific CBT technique of
                identifying automatic negative thoughts (ANTs), examining the evidence for and
                against them, and replacing them with more balanced, realistic alternatives. It does
                not involve &ldquo;positive thinking&rdquo; or pretending everything is fine &mdash;
                it involves <em>accurate</em> thinking.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  The Three-Step Restructuring Process
                </p>
                <ul className="text-sm text-white space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>1. Catch the thought:</strong> Notice the automatic thought when it
                      appears. Write it down exactly as it occurs to you. Example: &ldquo;Everyone
                      will think I&rsquo;m stupid if I ask a question in this meeting.&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>2. Challenge the thought:</strong> Ask yourself &mdash; what is the
                      actual evidence? Has anyone actually laughed at you for asking a question
                      before? Have you seen others ask questions in meetings without being
                      ridiculed? Would you think a colleague was stupid for asking a genuine
                      question?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>3. Replace the thought:</strong> Substitute the unhelpful thought with
                      a balanced alternative. Example: &ldquo;Asking a genuine question shows
                      I&rsquo;m engaged. Most people appreciate someone who clarifies things rather
                      than guessing.&rdquo;
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Unhelpful Thought Patterns in Construction Settings
                </p>
                <div className="space-y-3">
                  <div className="border-b border-white/5 pb-3">
                    <p className="text-sm text-rose-400 font-medium mb-1">Catastrophising</p>
                    <p className="text-sm text-white">
                      &ldquo;If I mess up this toolbox talk, everyone will lose respect for me and
                      I&rsquo;ll never be taken seriously again.&rdquo;
                    </p>
                    <p className="text-sm text-white mt-1">
                      <strong>Reframe:</strong> &ldquo;One imperfect talk will not define how
                      colleagues see me. Everyone has off days. The content matters more than the
                      delivery.&rdquo;
                    </p>
                  </div>
                  <div className="border-b border-white/5 pb-3">
                    <p className="text-sm text-rose-400 font-medium mb-1">Mind Reading</p>
                    <p className="text-sm text-white">
                      &ldquo;They&rsquo;re all thinking I don&rsquo;t know what I&rsquo;m talking
                      about.&rdquo;
                    </p>
                    <p className="text-sm text-white mt-1">
                      <strong>Reframe:</strong> &ldquo;I cannot know what others are thinking. Most
                      people in a meeting are thinking about their own tasks, not judging the
                      speaker.&rdquo;
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-rose-400 font-medium mb-1">
                      All-or-Nothing Thinking
                    </p>
                    <p className="text-sm text-white">
                      &ldquo;If I can&rsquo;t deliver this perfectly, there&rsquo;s no point
                      trying.&rdquo;
                    </p>
                    <p className="text-sm text-white mt-1">
                      <strong>Reframe:</strong> &ldquo;An imperfect attempt where I share useful
                      information is infinitely more valuable than staying silent. Good enough is
                      good enough.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Cognitive restructuring is a skill that improves with practice. Many people find it
                helpful to keep a brief written log for the first few weeks &mdash; writing down the
                unhelpful thought, the evidence against it, and the reframed thought. Over time, the
                reframing process becomes more automatic.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Systematic Desensitisation & Exposure */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            <Users className="h-5 w-5 text-rose-400" />
            Systematic Desensitisation &amp; Graduated Exposure
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Systematic desensitisation</strong> is a behavioural therapy technique
                developed by Joseph Wolpe in the 1950s. The principle is straightforward: you cannot
                be relaxed and anxious at the same time. By pairing gradual exposure to feared
                situations with relaxation techniques, you progressively reduce the anxiety response
                at each level before moving to the next.
              </p>

              <p>
                In practical terms, this means building an <strong>exposure ladder</strong> &mdash;
                a ranked list of speaking situations from least to most anxiety-provoking &mdash;
                and working your way up one rung at a time. You only move to the next rung when the
                current one no longer produces significant anxiety.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  Example Exposure Ladder for a Construction Worker
                </p>
                <div className="space-y-2">
                  {[
                    {
                      level: '1 (Low)',
                      desc: 'Practise speaking points aloud alone in your van or at home',
                    },
                    {
                      level: '2',
                      desc: 'Explain a technical point to one trusted colleague during a tea break',
                    },
                    {
                      level: '3',
                      desc: 'Ask a question during a small team briefing (5&ndash;6 people)',
                    },
                    {
                      level: '4',
                      desc: 'Contribute a comment or update during a progress meeting',
                    },
                    {
                      level: '5',
                      desc: 'Deliver a short (2&ndash;3 minute) toolbox talk to your immediate team',
                    },
                    {
                      level: '6',
                      desc: 'Present a safety observation or near-miss report at a site meeting',
                    },
                    {
                      level: '7',
                      desc: 'Deliver a full toolbox talk to a mixed group of trades (10&ndash;15 people)',
                    },
                    {
                      level: '8 (High)',
                      desc: 'Speak up to challenge unsafe practice in front of a group, including senior staff',
                    },
                  ].map((rung, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <span className="text-rose-400 font-mono font-medium whitespace-nowrap min-w-[70px]">
                        {rung.level}
                      </span>
                      <span
                        className="text-white"
                        dangerouslySetInnerHTML={{ __html: rung.desc }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <p>
                The <strong>Toastmasters International Pathways</strong> programme uses a similar
                graduated exposure approach in a structured club environment. Members progress from
                short &ldquo;ice-breaker&rdquo; speeches (4&ndash;6 minutes, about themselves)
                through increasingly challenging formats: impromptu speaking (Table Topics),
                persuasive speeches, technical presentations, and eventually mentoring others. The
                key insight from Toastmasters is that regular, low-stakes practice in a supportive
                environment builds confidence far faster than occasional high-stakes situations.
                While joining a Toastmasters club is one option, the same principle can be applied
                on site by volunteering for small speaking opportunities regularly.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Practical Tips for Climbing Your Ladder
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Stay at each rung until the anxiety drops</strong> &mdash; repeat the
                      same level 2&ndash;3 times before moving up. You should feel noticeably less
                      anxious each time
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Use relaxation at each step</strong> &mdash; practise box breathing
                      (covered in the next section) before and during each exposure
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Celebrate progress, not perfection</strong> &mdash; the goal is
                      participation, not flawless delivery. Speaking imperfectly is always better
                      than not speaking at all
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>If you slip back a rung, that is normal</strong> &mdash; anxiety is
                      not a straight line. A bad day does not erase previous progress. Drop back one
                      level and rebuild
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Breathing & Physiological Techniques */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            <Wind className="h-5 w-5 text-rose-400" />
            Breathing &amp; Physiological Regulation
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When anxiety triggers the fight-or-flight response, your breathing becomes shallow
                and rapid, your heart rate increases, and your body floods with adrenaline and
                cortisol. These physiological changes <em>cause</em> many of the symptoms you
                experience &mdash; shaking, dry mouth, mental blanking, and the feeling of panic.
                The good news is that you can directly interrupt this cycle through deliberate
                breathing techniques.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">Box Breathing (4-4-4-4)</p>
                <p className="text-sm text-white mb-3">
                  Box breathing (also called square breathing or tactical breathing) is used by
                  military special forces, emergency responders, and elite athletes to manage acute
                  stress. It activates the parasympathetic nervous system (&ldquo;rest and
                  digest&rdquo;) and directly counteracts the fight-or-flight response.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { step: 'Inhale', time: '4 seconds', note: 'Slowly through your nose' },
                    { step: 'Hold', time: '4 seconds', note: 'Lungs full, stay relaxed' },
                    { step: 'Exhale', time: '4 seconds', note: 'Slowly through your mouth' },
                    { step: 'Hold', time: '4 seconds', note: 'Lungs empty, stay calm' },
                  ].map((phase, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/10 p-3 rounded-lg text-center"
                    >
                      <p className="text-rose-400 font-semibold text-sm">{phase.step}</p>
                      <p className="text-white font-bold text-lg">{phase.time}</p>
                      <p className="text-white text-xs mt-1">{phase.note}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-white mt-3">
                  Repeat for 3&ndash;5 cycles. You can do this discreetly &mdash; in the van before
                  a meeting, in the corridor before a toolbox talk, or even while standing at the
                  back of a room before you need to speak. Nobody will notice.
                </p>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">The Physiological Sigh</p>
                <p className="text-sm text-white mb-3">
                  Research by Andrew Huberman at Stanford University has identified the
                  <strong> physiological sigh</strong> as one of the fastest methods for reducing
                  acute physiological arousal in real time &mdash; potentially within a single
                  breath cycle.
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Step 1:</strong> Take a normal inhale through your nose
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Step 2:</strong> Immediately follow with a second, shorter, sharper
                      inhale through your nose (a &ldquo;top-up&rdquo; breath that reinflates
                      collapsed alveoli in the lungs)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Step 3:</strong> Follow with a long, slow exhale through your mouth
                      &mdash; make the exhale significantly longer than the two inhales combined
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-white mt-3">
                  This technique is particularly useful because it can be done in a single breath
                  &mdash; you do not need multiple cycles. It works by maximising the surface area
                  of your lungs (reinflating collapsed air sacs) and then extending the exhale,
                  which directly activates the parasympathetic nervous system via the vagus nerve.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">When to Use Each Technique</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Box breathing:</strong> Best used 2&ndash;5 minutes before a speaking
                      situation (in the van, in the corridor, in the toilet). The multiple cycles
                      provide a deeper calming effect
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Physiological sigh:</strong> Best used in the moment &mdash; just
                      before you stand up to speak, or even mid-sentence if you feel anxiety
                      spiking. A single cycle takes only a few seconds and is virtually invisible to
                      others
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Presence & Body Language Research */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Presence, Posture &amp; the Replication Debate
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 2010, social psychologist Amy Cuddy and colleagues published research claiming
                that holding &ldquo;power poses&rdquo; (open, expansive body postures) for just two
                minutes produced measurable hormonal changes &mdash; specifically, increased
                testosterone and decreased cortisol &mdash; making people feel more powerful and
                perform better under stress. The associated TED Talk became one of the most-watched
                in history, and the concept entered mainstream culture.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Replication Debate &mdash; What the Evidence Actually Shows
                </p>
                <p className="text-sm text-white mb-3">
                  While the original hormonal findings have been debated in replication studies
                  &mdash; with several independent teams failing to reproduce the testosterone and
                  cortisol changes &mdash; the picture is more nuanced than &ldquo;power poses
                  don&rsquo;t work.&rdquo; Here is what the current evidence suggests:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Not supported:</strong> The claim that holding a pose for two minutes
                      changes your hormone levels (testosterone up, cortisol down). Multiple
                      replication attempts have failed to reproduce these findings reliably. One of
                      the original co-authors (Dana Carney) publicly distanced herself from the
                      hormonal claims in 2016
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Partially supported:</strong> Adopting open, expansive postures before
                      a stressful situation does appear to improve subjective feelings of confidence
                      and reduce self-reported anxiety. Cuddy&rsquo;s updated research and book{' '}
                      <em>Presence</em> (2015) shifted the framing from hormones to the experience
                      of feeling &ldquo;present&rdquo; &mdash; grounded, composed, and connected to
                      your own competence
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Practical takeaway:</strong> Standing or sitting in an open, upright
                      posture before a speaking situation is unlikely to change your hormones, but
                      it may genuinely help you <em>feel</em> more composed and confident. This is a
                      modest but potentially useful effect &mdash; not a magic bullet
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Practical Body Language for Construction Settings
                </p>
                <p className="text-sm text-white mb-3">
                  Regardless of the debate about hormones, there are well-established principles
                  about how body language affects both how you are perceived and how you feel:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Stand upright with shoulders back</strong> &mdash; not rigidly, but
                      comfortably open. Avoid crossing your arms or hunching forward, as these
                      closed postures signal (and can reinforce) anxiety
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Plant your feet</strong> &mdash; standing with your weight evenly
                      distributed (roughly shoulder-width apart) gives you a physical sense of
                      stability. Avoid pacing or shifting weight, which signals nervous energy
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Use natural hand gestures</strong> &mdash; let your hands move
                      naturally rather than gripping them together, stuffing them in pockets, or
                      fidgeting with tools. Open palms signal honesty and confidence
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Make eye contact</strong> &mdash; not a fixed stare, but brief,
                      natural eye contact with different people in the group. This creates
                      connection and makes you appear confident even if you do not feel it
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                The broader lesson from the power pose debate is an important one for critical
                thinking: popular science claims should be evaluated on the strength of replicated
                evidence, not the popularity of a TED Talk. In this case, the more modest
                &ldquo;presence&rdquo; framing appears to have genuine practical value, even though
                the headline-grabbing hormonal claims did not hold up.
              </p>
            </div>
          </div>
        </section>

        {/* Section 06: Construction Applications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            <HardHat className="h-5 w-5 text-rose-400" />
            Construction &amp; Electrical Applications
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The strategies covered in this section are not abstract psychology &mdash; they have
                direct, practical applications in the construction and electrical trades. Here are
                the three most common scenarios where speaking anxiety affects workers on site,
                along with specific guidance for each.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Scenario 1: Your First Toolbox Talk
                </p>
                <p className="text-sm text-white mb-3">
                  Toolbox talks are short (typically 5&ndash;15 minute) safety briefings delivered
                  to a group of workers before or during a task. As an apprentice or newly qualified
                  electrician, you may be asked to deliver one. This is often the first
                  &ldquo;public speaking&rdquo; experience in a construction career.
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Prepare bullet-point notes</strong> &mdash; do not memorise a script
                      (you will freeze if you forget a line) but do not wing it either. 3&ndash;5
                      bullet points on a card or phone give you a safety net
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Practise once with a trusted colleague</strong> &mdash; this is rung
                      2&ndash;3 on your exposure ladder. A single rehearsal dramatically reduces
                      anxiety
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Use box breathing (4-4-4-4) for 2 minutes before</strong> &mdash; do
                      this in the van or the welfare cabin
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Reframe: information sharing, not a performance</strong> &mdash; your
                      colleagues want to know the safety information. They are not judging your
                      public speaking ability. Focus on delivering useful content, not on being
                      polished
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Scenario 2: Speaking in Progress Meetings
                </p>
                <p className="text-sm text-white mb-3">
                  Progress meetings bring together multiple trades, site managers, and sometimes
                  clients. Being asked &ldquo;How&rsquo;s the first fix going?&rdquo; or &ldquo;Any
                  issues from electrical?&rdquo; can trigger anxiety, especially in front of senior
                  staff.
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Prepare a 30-second update in advance</strong> &mdash; note down what
                      you have completed, what you are working on now, and any blockers. Having this
                      ready removes the fear of being caught off guard
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Use the physiological sigh</strong> just before your turn to speak
                      &mdash; a single double-inhale and long exhale takes 3&ndash;4 seconds and is
                      invisible to others
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Speak to facts, not feelings</strong> &mdash; &ldquo;First fix is 80%
                      complete in Block A, on track for Friday. Waiting on containment brackets from
                      the supplier.&rdquo; Factual updates are easy to deliver and hard to get wrong
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Scenario 3: Questioning Unsafe Practice
                </p>
                <p className="text-sm text-white mb-3">
                  This is perhaps the most important application of everything in this section.
                  Under the Health and Safety at Work etc. Act 1974, every worker has both a right
                  and a duty to raise safety concerns. Speaking anxiety must not prevent you from
                  doing so &mdash; it is a legal obligation and could save a life.
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Acknowledge the anxiety, then act anyway</strong> &mdash; bravery is
                      not the absence of fear; it is acting despite it. Use a quick physiological
                      sigh to settle your nerves
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Use factual, non-confrontational language</strong> &mdash;
                      &ldquo;I&rsquo;ve noticed the scaffold isn&rsquo;t tagged. Can we check that
                      before anyone goes up?&rdquo; Focus on the hazard, not the person
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Know your routes</strong> &mdash; if speaking directly to the person
                      feels too difficult, use the site&rsquo;s near-miss reporting system, speak to
                      your supervisor, or use a safety observation card. The important thing is that
                      the concern is raised, by whatever route
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Reframe: you are helping, not criticising</strong> &mdash; reporting a
                      hazard protects the person doing the unsafe work as much as anyone else. You
                      are not getting someone in trouble; you are potentially preventing an injury
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Remember:</strong> Every experienced site
                  manager, supervisor, and trade leader was once an apprentice who felt nervous
                  about speaking up. The techniques in this section &mdash; cognitive restructuring,
                  graduated exposure, breathing regulation, and deliberate preparation &mdash; are
                  the same tools used by professionals at every level. The difference between
                  confident speakers and anxious ones is rarely natural talent; it is practice and
                  preparation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p
                  className="text-sm text-white leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
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
            <Link to="../cc-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-3-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
