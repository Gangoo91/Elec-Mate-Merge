import { ArrowLeft, Atom, CheckCircle, Lightbulb, Brain, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'neuroplasticity-def',
    question: 'What does neuroplasticity mean in the context of resilience?',
    options: [
      'The brain is fixed after childhood and cannot form new neural pathways',
      'The brain physically rewires itself in response to repeated behaviour and experience',
      'Neuroplasticity only applies to learning academic subjects, not emotional skills',
      'The brain becomes less flexible and adaptable as you practise new behaviours',
    ],
    correctIndex: 1,
    explanation:
      "Neuroplasticity refers to the brain's ability to physically reorganise itself by forming new neural connections throughout life. When you repeatedly practise resilient behaviours — such as reframing negative thoughts, seeking support, or maintaining perspective — you strengthen the neural pathways associated with those behaviours. Over time, resilient responses become more automatic and require less conscious effort.",
  },
  {
    id: 'growth-mindset',
    question: "Which statement best reflects a growth mindset according to Carol Dweck's research?",
    options: [
      '"I\'m just not good at inspection and testing — it\'s not my thing"',
      '"I can\'t do this yet, but I\'m getting better with each attempt"',
      '"Some people are naturally talented at this and I\'m not one of them"',
      '"I should be able to do this perfectly on the first attempt"',
    ],
    correctIndex: 1,
    explanation:
      'The word "yet" is the hallmark of a growth mindset. Dweck\'s research shows that people with a growth mindset believe abilities can be developed through effort and learning. The statement "I can\'t do this yet" acknowledges the current difficulty while maintaining the belief that improvement is possible through practice — a core component of resilience.',
  },
  {
    id: 'three-ps',
    question: 'In the 3 Ps framework (Sandberg and Grant), what does "Permanence" refer to?',
    options: [
      'The belief that the negative event was caused entirely by your personal failings',
      'The belief that the negative event will affect every area of your life',
      'The belief that the negative effects of the event will last forever',
      'The belief that you cannot learn anything from the negative experience',
    ],
    correctIndex: 2,
    explanation:
      'Permanence is the belief that the negative effects of an adverse event will last forever — that things will never get better. This is one of the three cognitive traps identified by Sandberg and Grant that undermine resilience. The other two are Personalisation (believing it is entirely your fault) and Pervasiveness (believing it will affect every area of your life). Recognising these patterns helps you challenge unhelpful thinking.',
  },
];

const faqs = [
  {
    question: 'Can my brain really change in response to how I think?',
    answer:
      'Yes. Neuroplasticity is one of the most well-established findings in modern neuroscience. Brain imaging studies have shown that repeated mental practices — including cognitive reframing, mindfulness meditation, and deliberate optimism — produce measurable structural changes in the brain. For example, London taxi drivers who memorise complex street layouts have been shown to have a larger hippocampus (the brain region involved in spatial memory) compared to the general population. Similarly, practising resilient thinking patterns physically strengthens the neural pathways associated with adaptive responses to stress. The brain you have today is not the brain you are stuck with forever.',
  },
  {
    question: 'What is the difference between a growth mindset and just being positive?',
    answer:
      'A growth mindset is fundamentally different from simple positivity. Positivity says "everything will be fine" regardless of evidence. A growth mindset says "this is difficult, and I can improve through effort and learning." A growth mindset acknowledges the current reality — including failures and setbacks — but interprets them as opportunities for development rather than evidence of permanent inability. Crucially, a growth mindset does not guarantee success; it guarantees that you will learn something from every experience, whether the outcome is positive or negative. This is why it is so closely linked to resilience.',
  },
  {
    question:
      'Is post-traumatic growth the same as saying "what doesn\'t kill you makes you stronger"?',
    answer:
      'Not exactly. The saying "what doesn\'t kill you makes you stronger" implies that growth is automatic — that adversity inevitably leads to strength. Post-traumatic growth research by Tedeschi and Calhoun shows that growth is possible but not inevitable. It requires specific conditions: cognitive processing of the experience, social support, time for reflection, and willingness to re-examine your beliefs and assumptions. Some people do experience profound positive change after adversity, but others may need professional support to process their experience. The growth is real, but it is not guaranteed or effortless.',
  },
  {
    question: "How do I challenge my own thinking patterns when I'm under stress?",
    answer:
      'The 3 Ps framework (Personalisation, Pervasiveness, Permanence) provides a practical structure. When something goes wrong, ask yourself three questions: (1) Am I taking all the blame personally when other factors contributed? (2) Am I assuming this will affect every area of my life when it is actually limited to one specific situation? (3) Am I believing this will last forever when it is actually temporary? Simply asking these questions creates a pause between the stressful event and your emotional response, giving your rational brain time to override the initial panic reaction. With practice, this becomes more automatic.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is neuroplasticity?',
    options: [
      'A theory that the brain stops developing after age 25',
      "The brain's ability to physically rewire and form new neural connections throughout life",
      'A type of surgical procedure to repair brain damage',
      'A psychological theory that has been largely disproved by modern research',
    ],
    correctAnswer: 1,
    explanation:
      "Neuroplasticity is the brain's ability to reorganise itself by forming new neural connections throughout life. This is the biological mechanism that makes resilience trainable — when you repeatedly practise resilient behaviours, you physically strengthen the brain pathways associated with those responses.",
  },
  {
    id: 2,
    question: 'According to Carol Dweck (2006), what is a growth mindset?',
    options: [
      'The belief that intelligence and abilities are fixed at birth and cannot be changed',
      'The belief that you should always focus on your strengths and ignore your weaknesses',
      'The belief that abilities can be developed through dedication, effort, and learning',
      'The belief that positive thinking alone is sufficient to overcome any obstacle',
    ],
    correctAnswer: 2,
    explanation:
      "Dweck's growth mindset is the belief that your fundamental abilities can be developed through effort, good strategies, and input from others. This contrasts with a fixed mindset, which assumes abilities are innate and unchangeable. Growth mindset is a core component of resilience because it determines how you interpret setbacks — as learning opportunities or as evidence of permanent failure.",
  },
  {
    id: 3,
    question:
      'Tedeschi and Calhoun (2004) identified five domains of post-traumatic growth. Which of the following is one of those domains?',
    options: [
      'Decreased empathy for others who have not experienced trauma',
      'Greater appreciation for life and changed priorities',
      'Reduced willingness to try new things',
      'Permanent avoidance of all situations that remind you of the trauma',
    ],
    correctAnswer: 1,
    explanation:
      'The five domains of post-traumatic growth identified by Tedeschi and Calhoun are: (1) greater appreciation for life, (2) improved relationships, (3) increased personal strength, (4) recognition of new possibilities, and (5) spiritual or existential change. These represent genuine positive changes that can emerge from processing adversity, not merely "getting over it."',
  },
  {
    id: 4,
    question: 'In Seligman\'s Learned Optimism model, what is "explanatory style"?',
    options: [
      'The way you explain technical concepts to clients',
      'The habitual way you explain the causes of events to yourself',
      'A formal psychological assessment administered by a therapist',
      'The way you write reports and documentation at work',
    ],
    correctAnswer: 1,
    explanation:
      'Explanatory style is the habitual way you explain the causes of events — good and bad — to yourself. Seligman identified three dimensions: permanent vs temporary, pervasive vs specific, and personal vs external. A pessimistic explanatory style sees bad events as permanent, pervasive, and personal. An optimistic style sees them as temporary, specific, and influenced by external factors. Your explanatory style directly affects your resilience.',
  },
  {
    id: 5,
    question: 'What are the 3 Ps identified by Sandberg and Grant?',
    options: [
      'Positivity, Persistence, and Patience',
      'Personalisation, Pervasiveness, and Permanence',
      'Preparation, Practice, and Performance',
      'Perception, Processing, and Prevention',
    ],
    correctAnswer: 1,
    explanation:
      'The 3 Ps — Personalisation, Pervasiveness, and Permanence — are three cognitive traps that undermine resilience. Personalisation is blaming yourself entirely. Pervasiveness is believing the problem will affect every area of your life. Permanence is believing the negative effects will last forever. Recognising when you are falling into one of these traps allows you to challenge the thought and respond more adaptively.',
  },
  {
    id: 6,
    question:
      'An apprentice who has a fixed mindset about testing and inspection is most likely to say:',
    options: [
      '"Testing is challenging but I\'m improving each time I practise"',
      '"I need to ask my supervisor to show me that technique again"',
      '"I\'m just not a testing person — some people have a natural talent for it and I don\'t"',
      '"I made mistakes on that dead test but now I know what to work on"',
    ],
    correctAnswer: 2,
    explanation:
      'A fixed mindset interprets difficulty as evidence of permanent inability ("I\'m just not a testing person"). The other options all reflect growth mindset thinking — seeing challenges as opportunities for improvement, seeking help, and treating mistakes as learning data. Recognising fixed mindset statements in your own thinking is the first step toward shifting to a growth mindset.',
  },
  {
    id: 7,
    question:
      'A sparky who had their tools stolen from their van could demonstrate "bouncing forward" by:',
    options: [
      'Giving up electrical work and retraining in a different trade',
      'Replacing the stolen tools with identical ones and carrying on as before',
      'Using the insurance payout to upgrade to better tools and improving their van security to prevent future theft',
      'Refusing to work until the tools are recovered by the police',
    ],
    correctAnswer: 2,
    explanation:
      'Bouncing forward means using adversity as a catalyst for improvement rather than merely returning to your previous state. By upgrading their tools and improving van security, the electrician ends up in a better position than before the theft. Option B (replacing with identical tools) would be bouncing back, which is also resilient but does not involve the growth element.',
  },
  {
    id: 8,
    question:
      'Which of the following is NOT one of the five domains of post-traumatic growth identified by Tedeschi and Calhoun?',
    options: [
      'Greater appreciation for life',
      'Improved relationships with others',
      'Elimination of all negative emotions permanently',
      'Recognition of new possibilities and paths',
    ],
    correctAnswer: 2,
    explanation:
      'Post-traumatic growth does NOT mean the elimination of all negative emotions. People who experience post-traumatic growth may still feel sadness, anxiety, or distress about their experience. Growth and distress can coexist. The five actual domains are: greater appreciation for life, improved relationships, increased personal strength, recognition of new possibilities, and spiritual or existential change.',
  },
];

export default function RSMModule2Section2() {
  useSEO({
    title: 'The Science of Resilience | RSM Module 2.2',
    description:
      'Explore the neuroscience behind resilience including neuroplasticity, growth mindset, post-traumatic growth, learned optimism, and the 3 Ps framework for challenging unhelpful thinking.',
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
          <Atom className="h-10 w-10 text-rose-400 mx-auto mb-4" />
          <span className="inline-block bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
            MODULE 2 &middot; SECTION 2
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            The Science of Resilience
          </h1>
          <p className="text-white max-w-xl mx-auto">
            Neuroplasticity, growth mindset, post-traumatic growth, learned optimism, and the
            cognitive traps that undermine resilience
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
                    <strong className="text-white">Neuroplasticity:</strong> Your brain physically
                    rewires when you practise new behaviours &mdash; resilience gets easier.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Growth mindset:</strong> &ldquo;I can&rsquo;t do
                    this <em>yet</em>&rdquo; vs &ldquo;I&rsquo;ll never be able to do this.&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Post-traumatic growth:</strong> Adversity can
                    lead to genuine positive change across five life domains.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Learned optimism:</strong> Your explanatory style
                    determines how you interpret good and bad events.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">The 3 Ps:</strong> Personalisation,
                    Pervasiveness, and Permanence &mdash; three traps to avoid.
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
                    <strong className="text-white">Evidence-based:</strong> These are not opinions
                    &mdash; they are findings from decades of rigorous scientific research.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Practical tools:</strong> Understanding the
                    science gives you specific strategies to build resilience deliberately.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Mindset shift:</strong> Knowing your brain can
                    change makes you more willing to invest effort in building resilience.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Trade application:</strong> Every concept maps
                    directly onto real situations electricians face on site.
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
                Explain how neuroplasticity provides the biological basis for building resilience
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Compare fixed mindset and growth mindset and describe how each affects resilience
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Describe the five domains of post-traumatic growth identified by Tedeschi and
                Calhoun
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Explain Seligman&rsquo;s concept of explanatory style and its three dimensions
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Use the 3 Ps framework (Personalisation, Pervasiveness, Permanence) to challenge
                unhelpful thinking
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <span>
                Apply these scientific concepts to practical construction and electrical trade
                scenarios
              </span>
            </li>
          </ul>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Neuroplasticity */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Neuroplasticity: Your Brain Can Rewire
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                For most of the 20th century, scientists believed the adult brain was essentially
                fixed &mdash; that after a certain age, you could not form new neural connections or
                change the way your brain was wired. This belief has been comprehensively
                overturned. Modern neuroscience has demonstrated beyond doubt that the brain retains{' '}
                <strong>neuroplasticity</strong> throughout life &mdash; the ability to physically
                reorganise itself by forming new neural connections in response to experience,
                learning, and repeated behaviour.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Key Point</p>
                <p className="text-base text-white leading-relaxed">
                  Neuroplasticity is the biological mechanism that makes resilience trainable. When
                  you repeatedly practise resilient responses &mdash; such as reframing setbacks as
                  learning opportunities, seeking support when stressed, or maintaining perspective
                  during difficulty &mdash; you physically{' '}
                  <strong>strengthen the neural pathways</strong> associated with those responses.
                  Over time, resilient thinking becomes more automatic and requires less conscious
                  effort.
                </p>
              </div>

              <p>
                Think of it like a path through a field. The first time you walk across an uncut
                field, it is difficult &mdash; the grass is high and there is no clear route. But if
                you walk the same route every day, a visible path forms. The more you use it, the
                clearer and easier it becomes. Neural pathways work the same way: the more you use
                them, the stronger they become. This is why practice matters &mdash; resilience is
                not about having a single insight, but about repeatedly choosing adaptive responses
                until they become habitual.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-2">
                  <Brain className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Neuroplasticity in Everyday Life
                </h3>
                <p className="text-white text-sm">
                  You have already experienced neuroplasticity, even if you did not know the term.
                  Learning to drive a car, mastering cable termination techniques, or remembering
                  the colour codes for wiring &mdash; all of these involved creating and
                  strengthening neural pathways through repeated practice. At first they required
                  intense concentration; now they feel automatic. Building resilience works on
                  exactly the same principle. The strategies may feel awkward and effortful at
                  first, but with consistent practice, they become second nature.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Growth Mindset */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Growth Mindset (Dweck, 2006)
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                Stanford psychologist <strong>Carol Dweck</strong> spent decades researching how
                people&rsquo;s beliefs about their own abilities affect their behaviour and
                outcomes. Her findings, published in <em>Mindset: The New Psychology of Success</em>{' '}
                (2006), identified two fundamentally different ways of thinking about ability:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <Lightbulb className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Fixed Mindset vs Growth Mindset
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-red-400/20 p-3 rounded-lg">
                    <h4 className="text-red-400 font-medium mb-2">Fixed Mindset</h4>
                    <ul className="text-white text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>&ldquo;I&rsquo;m just not good at maths&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Avoids challenges to prevent failure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>
                          Sees effort as pointless &mdash; &ldquo;if I were talented, I
                          wouldn&rsquo;t need to try&rdquo;
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Gives up easily when things get difficult</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                        <span>Treats criticism as a personal attack</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-green-400/20 p-3 rounded-lg">
                    <h4 className="text-green-400 font-medium mb-2">Growth Mindset</h4>
                    <ul className="text-white text-sm space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>&ldquo;I can improve my maths with practice&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Embraces challenges as opportunities to learn</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Sees effort as the path to mastery</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Persists through difficulty</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                        <span>Uses criticism as useful feedback for improvement</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Construction Example: Testing &amp; Inspection
                </p>
                <p className="text-base text-white leading-relaxed">
                  An apprentice with a <strong>fixed mindset</strong> about testing and inspection
                  might say: &ldquo;I&rsquo;m rubbish at dead testing &mdash; I just don&rsquo;t
                  have a feel for the equipment. Some people are naturally good at it and I&rsquo;m
                  not.&rdquo; This belief leads them to avoid practising, dread assessments, and
                  interpret mistakes as proof of permanent inability. An apprentice with a{' '}
                  <strong>growth mindset</strong> might say: &ldquo;Dead testing is tricky, but each
                  time I practise I get more confident with the instrument. I made errors on the
                  continuity test last time, so I&rsquo;ll ask my supervisor to watch me and give
                  feedback.&rdquo; Same challenge, completely different response &mdash; and
                  completely different outcome.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Post-Traumatic Growth */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Post-Traumatic Growth (Tedeschi &amp; Calhoun, 2004)
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                While most people are familiar with post-traumatic stress disorder (PTSD), fewer
                know about its counterpart: <strong>post-traumatic growth (PTG)</strong>.
                Researchers Richard Tedeschi and Lawrence Calhoun formally identified this
                phenomenon in 2004, documenting the ways in which people can experience genuine
                positive psychological change as a result of struggling with highly challenging life
                circumstances.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  <TrendingUp className="h-4 w-4 inline-block mr-2 -mt-0.5" />
                  Five Domains of Post-Traumatic Growth
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">
                      1. Greater Appreciation for Life
                    </h4>
                    <p className="text-white text-sm">
                      Priorities shift toward what truly matters. Small pleasures become more
                      valued. People report a deeper sense of gratitude for everyday experiences
                      they previously took for granted.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">2. Improved Relationships</h4>
                    <p className="text-white text-sm">
                      Adversity often strengthens bonds with the people who supported you through
                      it. People report feeling closer to friends and family, more empathetic toward
                      others, and more willing to be vulnerable.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">
                      3. Increased Personal Strength
                    </h4>
                    <p className="text-white text-sm">
                      Having survived adversity, people often discover they are stronger than they
                      believed. The experience provides evidence that they can handle difficult
                      situations, increasing confidence in their ability to cope with future
                      challenges.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">
                      4. Recognition of New Possibilities
                    </h4>
                    <p className="text-white text-sm">
                      Adversity can open doors that would otherwise have remained closed. People
                      discover new career paths, new interests, new relationships, or new roles
                      (such as mentoring others who face similar challenges).
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">
                      5. Spiritual or Existential Change
                    </h4>
                    <p className="text-white text-sm">
                      People often engage more deeply with questions of meaning, purpose, and
                      values. This does not necessarily mean religious change &mdash; it can simply
                      mean a deeper engagement with what gives your life meaning.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Important Caveat</p>
                <p className="text-base text-white leading-relaxed">
                  Post-traumatic growth is <strong>possible</strong> but not{' '}
                  <strong>inevitable</strong>. It is not about glorifying suffering or claiming that
                  adversity is somehow &ldquo;good for you.&rdquo; Many people need professional
                  support to process traumatic experiences, and some may develop PTSD rather than
                  PTG. The point is that growth <em>can</em> emerge from adversity when the right
                  conditions are present: social support, time for reflection, and willingness to
                  re-examine your assumptions about the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Learned Optimism */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Learned Optimism (Seligman)
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                Martin Seligman, often called the father of positive psychology, developed the
                concept of <strong>learned optimism</strong> as the counterpoint to his earlier
                research on learned helplessness. The core insight is that the way you{' '}
                <strong>explain events to yourself</strong> &mdash; your{' '}
                <strong>explanatory style</strong> &mdash; has a profound effect on your resilience,
                mental health, and even physical health.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">
                  Three Dimensions of Explanatory Style
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">Permanent vs Temporary</h4>
                    <p className="text-white text-sm">
                      <strong className="text-white">Pessimistic:</strong> &ldquo;I always mess
                      things up&rdquo; (permanent).{' '}
                      <strong className="text-white">Optimistic:</strong> &ldquo;I made a mistake
                      today&rdquo; (temporary). A pessimistic style treats bad events as permanent
                      and unchangeable. An optimistic style treats them as temporary and
                      situation-specific.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">Pervasive vs Specific</h4>
                    <p className="text-white text-sm">
                      <strong className="text-white">Pessimistic:</strong> &ldquo;Everything in my
                      life is going wrong&rdquo; (pervasive).{' '}
                      <strong className="text-white">Optimistic:</strong> &ldquo;This particular
                      project has been difficult&rdquo; (specific). A pessimistic style generalises
                      bad events across all areas of life. An optimistic style contains them to the
                      specific situation.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">Personal vs External</h4>
                    <p className="text-white text-sm">
                      <strong className="text-white">Pessimistic:</strong> &ldquo;It&rsquo;s all my
                      fault&rdquo; (entirely personal).{' '}
                      <strong className="text-white">Optimistic:</strong> &ldquo;Several factors
                      contributed to this outcome&rdquo; (balanced). A pessimistic style takes all
                      the blame personally. An optimistic style recognises that outcomes usually
                      result from a combination of personal actions and external circumstances.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">Key Point</p>
                <p className="text-base text-white leading-relaxed">
                  Seligman&rsquo;s crucial finding was that explanatory style is{' '}
                  <strong>learned</strong>, not innate. If you have developed a pessimistic
                  explanatory style, you can learn a more optimistic one through deliberate
                  practice. This does not mean deluding yourself or ignoring genuine problems
                  &mdash; it means interpreting events more accurately, without the automatic
                  distortions that pessimistic thinking introduces.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: The 3 Ps */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            The 3 Ps (Sandberg &amp; Grant)
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="space-y-4 text-white">
              <p>
                Building on Seligman&rsquo;s work, <strong>Sheryl Sandberg and Adam Grant</strong>{' '}
                popularised the &ldquo;3 Ps&rdquo; framework in their book{' '}
                <em>Option B: Facing Adversity, Building Resilience, and Finding Joy</em>. The 3 Ps
                are three cognitive traps that people commonly fall into after a negative event, and
                recognising them is one of the most practical tools for building resilience.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h3 className="text-rose-400 font-medium mb-3">The Three Cognitive Traps</h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">
                      1. Personalisation &mdash; &ldquo;It&rsquo;s all my fault&rdquo;
                    </h4>
                    <p className="text-white text-sm">
                      The tendency to blame yourself entirely for a negative outcome, ignoring the
                      role of external factors, other people, and circumstances beyond your control.
                    </p>
                    <p className="text-white text-sm mt-2">
                      <strong className="text-white">Construction example:</strong> &ldquo;I lost
                      that contract because I&rsquo;m not good enough&rdquo; &mdash; ignoring the
                      fact that the client went with the cheapest quote and your price was fair.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">
                      2. Pervasiveness &mdash; &ldquo;Everything is ruined&rdquo;
                    </h4>
                    <p className="text-white text-sm">
                      The tendency to believe that the negative event will affect every area of your
                      life, rather than being contained to one specific area.
                    </p>
                    <p className="text-white text-sm mt-2">
                      <strong className="text-white">Construction example:</strong> &ldquo;I failed
                      that inspection and now my whole career is a disaster&rdquo; &mdash; when in
                      reality, one failed inspection does not define your overall competence.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-rose-400/20 p-3 rounded-lg">
                    <h4 className="text-rose-300 font-medium mb-1">
                      3. Permanence &mdash; &ldquo;It will never get better&rdquo;
                    </h4>
                    <p className="text-white text-sm">
                      The tendency to believe that the negative effects of the event will last
                      forever, that things will never improve, and that you are permanently damaged
                      by the experience.
                    </p>
                    <p className="text-white text-sm mt-2">
                      <strong className="text-white">Construction example:</strong>{' '}
                      &ldquo;I&rsquo;ll never find another decent contract again&rdquo; &mdash; when
                      the construction market fluctuates and opportunities regularly emerge.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Construction Example: Using the 3 Ps
                </p>
                <p className="text-base text-white leading-relaxed">
                  A sparky who had their tools stolen from their van might initially think:
                  &ldquo;I&rsquo;m so stupid for not getting better locks&rdquo; (personalisation),
                  &ldquo;Nothing ever goes right for me&rdquo; (pervasiveness), &ldquo;I&rsquo;ll
                  never be able to afford to replace everything&rdquo; (permanence). Using the 3 Ps
                  framework, they can challenge each thought: &ldquo;Thieves target vans &mdash;
                  this was not my fault&rdquo;, &ldquo;This affects my work equipment but the rest
                  of my life is fine&rdquo;, &ldquo;Insurance will cover most of it and I can use
                  this as an opportunity to upgrade my kit.&rdquo; Same event, completely different
                  emotional impact.
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
                  <strong>Neuroplasticity</strong> means your brain can physically rewire &mdash;
                  resilience gets easier with practice
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  A <strong>growth mindset</strong> treats setbacks as learning opportunities, not
                  evidence of permanent inability
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Post-traumatic growth</strong> is possible but not automatic &mdash; it
                  requires support, reflection, and time
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  Your <strong>explanatory style</strong> determines whether you see setbacks as
                  permanent/pervasive/personal or temporary/specific/situational
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  The <strong>3 Ps</strong> (Personalisation, Pervasiveness, Permanence) are
                  cognitive traps you can learn to recognise and challenge
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  Every one of these concepts applies directly to{' '}
                  <strong>real situations in the electrical trade</strong>
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
          <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />
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
            <Link to="../rsm-module-2-section-3">
              Next: Resilience Factors
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
