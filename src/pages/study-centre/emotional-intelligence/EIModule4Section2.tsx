import {
  ArrowLeft,
  Sun,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  Shield,
  RefreshCw,
  AlertTriangle,
  TrendingUp,
  Layers,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'optimism-3ps',
    question:
      'In Seligman\u2019s model, a pessimist explains bad events as permanent, pervasive and personal. How does an optimist explain bad events?',
    options: [
      'Permanent, specific, external',
      'Temporary, specific, external',
      'Temporary, pervasive, personal',
      'Permanent, pervasive, external',
    ],
    correctIndex: 1,
    explanation:
      'Optimists explain bad events as temporary (\u201cit will pass\u201d), specific (\u201cit\u2019s just this one situation\u201d), and external (\u201ccircumstances contributed\u201d). This explanatory style prevents setbacks from becoming catastrophic and maintains motivation.',
  },
  {
    id: 'optimism-abcde',
    question: 'In the ABCDE model, what does the "D" stand for?',
    options: ['Decision', 'Deliberation', 'Disputation', 'Determination'],
    correctIndex: 2,
    explanation:
      'The D stands for Disputation \u2014 actively challenging and arguing against your negative beliefs. This is the crucial step where you treat your pessimistic thoughts as hypotheses to be tested rather than facts to be accepted. Disputation transforms the ABCDE model from a passive observation tool into an active coping strategy.',
  },
  {
    id: 'optimism-stockdale',
    question: 'The Stockdale Paradox describes the balance between:',
    options: [
      'Working hard and resting properly',
      'Confronting brutal facts while maintaining unwavering faith',
      'Being optimistic in public and realistic in private',
      'Focusing on strengths while ignoring weaknesses',
    ],
    correctIndex: 1,
    explanation:
      'Named after Admiral James Stockdale, the Stockdale Paradox describes the discipline of confronting the most brutal facts of your current reality while simultaneously maintaining absolute faith that you will prevail in the end. It is the essence of realistic optimism \u2014 acknowledging how bad things are without losing confidence that they will get better.',
  },
];

const faqs = [
  {
    question:
      'Is optimism just about thinking positive thoughts? That feels dishonest on a bad day.',
    answer:
      'No. Seligman\u2019s learned optimism is fundamentally different from \u201cjust think positive.\u201d It is about how you explain events to yourself \u2014 your explanatory style. When something goes wrong, a pessimist tells themselves it is permanent (\u201calways\u201d), pervasive (\u201ceverything\u201d) and personal (\u201cmy fault\u201d). An optimist tells themselves it is temporary (\u201cthis time\u201d), specific (\u201cjust this situation\u201d) and considers external factors (\u201cthe circumstances\u201d). This is not about pretending things are fine when they are not \u2014 it is about interpreting setbacks accurately rather than catastrophically. In fact, research shows that optimists are often more accurate in their assessments than pessimists, who tend to exaggerate the permanence and scope of problems.',
  },
  {
    question: 'Can too much optimism be dangerous, especially in a safety-critical trade?',
    answer:
      'Yes, and this is why we distinguish between realistic optimism and blind optimism (or toxic positivity). Blind optimism ignores risks, dismisses concerns and can lead to unsafe decisions \u2014 \u201cshe\u2019ll be right\u201d is dangerous thinking on a construction site. Realistic optimism, as described by the Stockdale Paradox, confronts the brutal facts (this circuit is faulty, this site has hazards, this timeline is unrealistic) while maintaining confidence that you can deal with them effectively. In electrical work, this means being rigorously honest about risks and problems while maintaining the belief and determination to resolve them safely. The ABCDE model helps with this: you dispute unrealistic beliefs, not realistic ones.',
  },
  {
    question:
      'How long does it take to change from a pessimistic to an optimistic explanatory style?',
    answer:
      'Seligman\u2019s research shows that explanatory style can be meaningfully shifted within weeks of consistent practice, though deeper, lasting change typically takes several months. The ABCDE model is designed as a daily practice tool \u2014 you use it whenever you notice pessimistic thinking, and over time the disputation step becomes automatic. Most people notice a shift in their default thinking patterns within four to eight weeks of regular use. It is similar to any skill development: the more you practise disputation, the more natural it becomes. That said, if you have a deeply entrenched pessimistic style, particularly one reinforced by depression or anxiety, professional support from a cognitive behavioural therapist can accelerate the process significantly.',
  },
  {
    question:
      'I know someone who had a tough upbringing and seems permanently pessimistic. Can they change?',
    answer:
      'Yes. This was one of Seligman\u2019s most important findings. He began his career studying learned helplessness \u2014 the phenomenon where repeated exposure to uncontrollable negative events teaches people (and animals) to give up. But he then discovered that helplessness can be \u201cunlearned\u201d through systematic training. Early life experiences certainly shape your default explanatory style, and people who experienced chronic adversity, criticism or instability as children are more likely to develop pessimistic patterns. However, neuroplasticity research confirms that the brain can form new patterns at any age. The ABCDE model and cognitive behavioural techniques are specifically designed to rewire these patterns. Change is harder when the patterns are deeper, but it is absolutely possible. Reivich and Shatt\u00e9\u2019s resilience training programmes have demonstrated this in diverse populations, including military personnel and inner-city youth.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Martin Seligman\u2019s early research focused on which phenomenon?',
    options: [
      'Emotional intelligence',
      'Learned helplessness',
      'Flow states',
      'Self-determination',
    ],
    correctAnswer: 1,
    explanation:
      'Seligman began his career studying learned helplessness \u2014 the phenomenon where exposure to uncontrollable negative events leads to passive acceptance and giving up. This research eventually led him to study the opposite: learned optimism, and how people can be trained to develop more adaptive explanatory styles.',
  },
  {
    id: 2,
    question:
      'A pessimist who loses a contract says: \u201cI always lose. I\u2019m terrible at everything. It\u2019s all my fault.\u201d Which of the three Ps does this demonstrate?',
    options: [
      'Only permanence',
      'Only personalisation',
      'All three: permanence, pervasiveness, personalisation',
      'Permanence and pervasiveness only',
    ],
    correctAnswer: 2,
    explanation:
      '\u201cI always lose\u201d is permanence (treating it as ongoing). \u201cI\u2019m terrible at everything\u201d is pervasiveness (extending it to all areas). \u201cIt\u2019s all my fault\u201d is personalisation (taking full internal blame). This response demonstrates all three pessimistic explanatory patterns working together to create a devastating interpretation of a single event.',
  },
  {
    id: 3,
    question: 'In the ABCDE model, what is the correct sequence?',
    options: [
      'Adversity, Behaviour, Consequences, Disputation, Evaluation',
      'Adversity, Beliefs, Consequences, Disputation, Energisation',
      'Assessment, Beliefs, Coping, Disputation, Energisation',
      'Adversity, Beliefs, Change, Decision, Evaluation',
    ],
    correctAnswer: 1,
    explanation:
      'The correct sequence is Adversity (the event), Beliefs (your automatic interpretation), Consequences (the emotional and behavioural results of those beliefs), Disputation (challenging those beliefs), and Energisation (the improved emotional and behavioural state that follows successful disputation).',
  },
  {
    id: 4,
    question: 'What is toxic positivity?',
    options: [
      'Being optimistic about genuinely positive situations',
      'Dismissing real problems by insisting everything is fine',
      'Having too much energy and enthusiasm at work',
      'Being positive in a way that inspires others',
    ],
    correctAnswer: 1,
    explanation:
      'Toxic positivity is the excessive and ineffective overgeneralisation of a happy, optimistic state that results in the denial, minimisation and invalidation of genuine human emotional experience. It dismisses real problems with phrases like \u201cjust stay positive\u201d or \u201cit could be worse\u201d, which prevents people from processing their actual feelings and addressing real issues.',
  },
  {
    id: 5,
    question:
      'The Stockdale Paradox is named after Admiral James Stockdale. What was his key insight?',
    options: [
      'Optimism is always better than pessimism',
      'You must confront brutal facts while maintaining faith you will prevail',
      'Pessimists survive difficult situations better than optimists',
      'Hope is more important than action',
    ],
    correctAnswer: 1,
    explanation:
      'Stockdale, a prisoner of war for over seven years in Vietnam, observed that the prisoners who did not survive were the blind optimists who kept setting specific dates for release and were crushed each time. The survivors were those who accepted the brutal reality of their situation while maintaining absolute faith that they would prevail in the end \u2014 without setting unrealistic timelines.',
  },
  {
    id: 6,
    question: 'According to Seligman\u2019s MetLife study, optimistic salespeople:',
    options: [
      'Performed the same as pessimistic salespeople',
      'Outsold pessimistic salespeople by 37% and were less likely to quit',
      'Were less reliable but more creative',
      'Sold more initially but burned out faster',
    ],
    correctAnswer: 1,
    explanation:
      'In one of the most cited studies in positive psychology, Seligman tested the explanatory styles of MetLife insurance salespeople and found that optimists outsold pessimists by 37%. More importantly, pessimists were twice as likely to quit in their first year. This study was pivotal in demonstrating the real-world performance impact of explanatory style.',
  },
  {
    id: 7,
    question:
      'Reivich and Shatt\u00e9 identified seven pillars of resilience. Resilience is best understood as:',
    options: [
      'A fixed personality trait you are born with',
      'The absence of stress and adversity',
      'A skill that can be developed through deliberate practice',
      'Something that only certain cultures value',
    ],
    correctAnswer: 2,
    explanation:
      'Resilience is a skill, not a fixed trait. Research by Reivich, Shatt\u00e9, and others consistently shows that resilience can be developed through training and practice. The seven pillars provide a framework for understanding which specific abilities contribute to resilience and how each can be strengthened. This is empowering because it means that regardless of your current resilience level, you can improve.',
  },
  {
    id: 8,
    question:
      'An electrician fails an inspection and thinks: \u201cThis job was unusually complex and the new regulation caught me out. I\u2019ll study the update and get it right on the re-inspection.\u201d This explanatory style is:',
    options: [
      'Pessimistic \u2014 they are making excuses',
      'Optimistic \u2014 temporary, specific, and includes external factors',
      'Unrealistic \u2014 they should blame themselves more',
      'Neither optimistic nor pessimistic',
    ],
    correctAnswer: 1,
    explanation:
      'This is a textbook optimistic explanatory style: the failure is treated as temporary (\u201cthis time\u201d, not \u201calways\u201d), specific (\u201cthis particular regulation\u201d, not \u201cI\u2019m a terrible electrician\u201d), and includes external factors (\u201cthe new regulation\u201d rather than \u201cI\u2019m incompetent\u201d). Crucially, it also includes a constructive action plan, which is a hallmark of optimistic thinking.',
  },
];

export default function EIModule4Section2() {
  useSEO({
    title: 'Optimism & Resilience | EI Module 4.2',
    description:
      "Seligman's learned optimism, the three Ps, the ABCDE model, pessimistic vs optimistic explanatory styles, realistic optimism, building resilience through deliberate practice.",
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
            <Link to="../ei-module-4">
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
            <Sun className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Optimism &amp; Resilience
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            How to interpret setbacks in ways that sustain motivation, and how to build the
            resilience to bounce back stronger
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Seligman:</strong> Optimism is a learnable explanatory style, not a
                personality trait
              </li>
              <li>
                <strong>The 3 Ps:</strong> Permanence, pervasiveness, personalisation determine how
                you interpret events
              </li>
              <li>
                <strong>ABCDE:</strong> A practical daily tool for disputing pessimistic beliefs
              </li>
              <li>
                <strong>Resilience:</strong> A skill built through practice, not a fixed trait
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Career survival:</strong> Construction is full of setbacks &mdash; how you
                explain them determines whether you grow or give up
              </li>
              <li>
                <strong>Performance:</strong> Seligman&rsquo;s MetLife study showed optimists
                outsold pessimists by 37%
              </li>
              <li>
                <strong>Health:</strong> Optimism is linked to better physical and mental health
                outcomes
              </li>
              <li>
                <strong>Leadership:</strong> Resilient leaders build resilient teams
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain Seligman\u2019s journey from learned helplessness to learned optimism',
              'Apply the three Ps (permanence, pervasiveness, personalisation) to real scenarios',
              'Walk through the ABCDE model step by step with a construction example',
              'Distinguish between realistic optimism and toxic positivity',
              'Describe the Stockdale Paradox and its relevance to construction work',
              'Identify the seven pillars of resilience and how to develop them',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Seligman's Learned Optimism */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            Seligman&rsquo;s Learned Optimism
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Martin Seligman</strong> is one of the most influential psychologists of the
                twentieth and twenty-first centuries. He is the founder of positive psychology and a
                former president of the American Psychological Association. But his journey to
                optimism began in a surprising place: studying helplessness.
              </p>

              <p>
                In the 1960s, Seligman conducted a series of experiments that led to the discovery
                of <strong>learned helplessness</strong>. He found that when animals (and later,
                humans) were repeatedly exposed to negative events they could not control, they
                eventually stopped trying to escape &mdash; even when escape became possible. They
                had <em>learned</em> to be helpless. They gave up.
              </p>

              <p>
                This finding had profound implications. It helped explain depression, chronic
                underperformance, and the kind of passive resignation that Seligman saw in people
                across all walks of life. But it also raised a critical question: if helplessness
                can be <em>learned</em>, can it be <em>unlearned</em>? Can people be trained to be
                more resilient, more persistent, more optimistic?
              </p>

              <p>
                The answer, Seligman discovered, was yes. Through decades of research published in
                his landmark 1990 book <em>Learned Optimism</em>, Seligman showed that the key
                difference between people who give up and people who persist lies in their{' '}
                <strong>explanatory style</strong> &mdash; the habitual way they explain why events
                happen to them.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-3">
                  The Three Ps: How You Explain Events
                </p>
                <p className="text-sm text-white mb-3">
                  Seligman identified three dimensions that determine whether your explanatory style
                  is optimistic or pessimistic. He called them the <strong>three Ps</strong>:
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-rose-400 mb-1">
                      1. Permanence: Temporary vs Permanent
                    </p>
                    <p className="text-sm text-white mb-2">
                      When something bad happens, do you see it as temporary or permanent?
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-red-500/10 border border-red-500/20 p-2 rounded">
                        <p className="text-xs font-medium text-red-400 mb-1">Pessimist</p>
                        <p className="text-xs text-white">
                          &ldquo;I <strong>always</strong> fail inspections.&rdquo;
                        </p>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/20 p-2 rounded">
                        <p className="text-xs font-medium text-green-400 mb-1">Optimist</p>
                        <p className="text-xs text-white">
                          &ldquo;I failed <strong>this</strong> inspection.&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-rose-400 mb-1">
                      2. Pervasiveness: Specific vs Universal
                    </p>
                    <p className="text-sm text-white mb-2">
                      Do you see the setback as confined to one area, or do you let it contaminate
                      everything?
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-red-500/10 border border-red-500/20 p-2 rounded">
                        <p className="text-xs font-medium text-red-400 mb-1">Pessimist</p>
                        <p className="text-xs text-white">
                          &ldquo;I am terrible at <strong>everything</strong>.&rdquo;
                        </p>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/20 p-2 rounded">
                        <p className="text-xs font-medium text-green-400 mb-1">Optimist</p>
                        <p className="text-xs text-white">
                          &ldquo;I need to improve my knowledge of{' '}
                          <strong>this specific regulation</strong>.&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-rose-400 mb-1">
                      3. Personalisation: External vs Internal
                    </p>
                    <p className="text-sm text-white mb-2">
                      Do you automatically blame yourself entirely, or do you consider external
                      factors?
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-red-500/10 border border-red-500/20 p-2 rounded">
                        <p className="text-xs font-medium text-red-400 mb-1">Pessimist</p>
                        <p className="text-xs text-white">
                          &ldquo;It is entirely <strong>my fault</strong>. I am incompetent.&rdquo;
                        </p>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/20 p-2 rounded">
                        <p className="text-xs font-medium text-green-400 mb-1">Optimist</p>
                        <p className="text-xs text-white">
                          &ldquo;The new amendment changed the requirements, and I had not updated
                          my knowledge yet.&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Losing a Contract
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-400 mb-2">
                      Pessimistic Interpretation
                    </p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>&ldquo;I always lose contracts.&rdquo; (Permanent)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          &ldquo;I am not cut out for running a business.&rdquo; (Pervasive)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>&ldquo;It is all my fault.&rdquo; (Personal)</span>
                      </li>
                    </ul>
                    <p className="text-xs text-white mt-2">
                      <strong>Result:</strong> Demoralisation, reduced effort on next quote,
                      self-doubt spiral
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-green-400 mb-2">
                      Optimistic Interpretation
                    </p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>&ldquo;This one did not work out.&rdquo; (Temporary)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>&ldquo;My quoting process needs refining.&rdquo; (Specific)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          &ldquo;They went with the cheaper option &mdash; I will adjust my
                          approach.&rdquo; (External factor considered)
                        </span>
                      </li>
                    </ul>
                    <p className="text-xs text-white mt-2">
                      <strong>Result:</strong> Learning, improved quoting, maintained confidence
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The critical insight is that both interpretations are of the{' '}
                <strong>same event</strong>. The event itself does not determine how you feel or
                what you do next &mdash; your <strong>explanation</strong> of the event does. And
                explanatory style, unlike the events themselves, is something you can change.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: The ABCDE Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            The ABCDE Model
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Seligman developed the <strong>ABCDE model</strong> as a practical, everyday tool
                for shifting from pessimistic to optimistic explanatory style. It builds on Albert
                Ellis&rsquo;s earlier ABC model from Rational Emotive Behaviour Therapy and adds two
                crucial steps &mdash; Disputation and Energisation &mdash; that transform it from an
                observation tool into an active coping strategy.
              </p>

              <div className="space-y-3">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/30 text-rose-400 text-sm font-bold flex-shrink-0">
                      A
                    </span>
                    <p className="text-sm font-medium text-rose-400">Adversity</p>
                  </div>
                  <p className="text-sm text-white">
                    The triggering event. Something goes wrong. This is the objective, factual
                    description of what happened &mdash; stripped of interpretation or judgement.
                    Just the facts.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/30 text-rose-400 text-sm font-bold flex-shrink-0">
                      B
                    </span>
                    <p className="text-sm font-medium text-rose-400">Beliefs</p>
                  </div>
                  <p className="text-sm text-white">
                    Your automatic interpretation of the event. These are the thoughts that flash
                    through your mind immediately after the adversity &mdash; often so fast that you
                    do not even notice them consciously. Pessimistic beliefs tend to be permanent,
                    pervasive and personal. They often feel like facts but are actually
                    interpretations.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/30 text-rose-400 text-sm font-bold flex-shrink-0">
                      C
                    </span>
                    <p className="text-sm font-medium text-rose-400">Consequences</p>
                  </div>
                  <p className="text-sm text-white">
                    The emotional and behavioural results of your beliefs &mdash; not of the event
                    itself. This is a crucial distinction: the consequences follow from the beliefs,
                    not directly from the adversity. Different beliefs about the same event produce
                    different consequences.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/30 text-rose-400 text-sm font-bold flex-shrink-0">
                      D
                    </span>
                    <p className="text-sm font-medium text-rose-400">Disputation</p>
                  </div>
                  <p className="text-sm text-white">
                    The active step. You challenge your pessimistic beliefs by looking for evidence
                    against them, generating alternative explanations, considering the realistic
                    implications, and evaluating the usefulness of the belief. You treat your
                    negative thought as a hypothesis to be tested, not a fact to be accepted.
                  </p>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/30 text-rose-400 text-sm font-bold flex-shrink-0">
                      E
                    </span>
                    <p className="text-sm font-medium text-rose-400">Energisation</p>
                  </div>
                  <p className="text-sm text-white">
                    The result of successful disputation. When you successfully challenge a
                    pessimistic belief, you feel a shift in energy &mdash; from defeated and passive
                    to engaged and purposeful. Energisation is not about forcing positivity; it is
                    the natural emotional consequence of seeing the situation more accurately.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    ABCDE in Action: Failing a Certification Exam
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      A
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Adversity</p>
                      <p className="text-sm text-white">
                        You fail your 18th Edition exam by three marks.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      B
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Beliefs (automatic)</p>
                      <p className="text-sm text-white">
                        &ldquo;I am too thick for this. I will never pass. Everyone else found it
                        easy. I should not have bothered.&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      C
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Consequences</p>
                      <p className="text-sm text-white">
                        Shame, avoidance (do not want to tell anyone), temptation to give up, loss
                        of motivation to study, low mood for days.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      D
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Disputation</p>
                      <p className="text-sm text-white">
                        <strong>Evidence:</strong> I missed by only three marks &mdash; that is
                        close, not a catastrophe. The national pass rate for first attempts is
                        around 60%, so failing is common. <strong>Alternative:</strong> I did not
                        study the earthing arrangements section thoroughly enough, which is a
                        specific gap, not a general inability. <strong>Usefulness:</strong> Calling
                        myself &ldquo;too thick&rdquo; makes me want to give up, which helps nobody.
                        Identifying the specific gaps gives me a study plan.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      E
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Energisation</p>
                      <p className="text-sm text-white">
                        Relief, renewed determination. You book the resit, create a focused study
                        plan for the weak areas, and ask a colleague who passed to explain the
                        earthing section. The shame transforms into purposeful action.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The ABCDE model is designed to be used in real time, whenever you notice pessimistic
                thinking. With practice, the disputation step becomes increasingly automatic &mdash;
                you catch the pessimistic thought faster and challenge it more effectively. It is
                essentially cognitive behavioural therapy in miniature, and it is one of the most
                evidence-based tools for shifting explanatory style from pessimistic to optimistic.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Four Disputation Strategies:</strong> When
                  challenging a pessimistic belief, use these four approaches: (1){' '}
                  <strong>Evidence</strong> &mdash; what facts support or contradict this belief?
                  (2) <strong>Alternatives</strong> &mdash; what other explanations are possible?
                  (3) <strong>Implications</strong> &mdash; even if the belief is partly true, what
                  are the realistic consequences? (4) <strong>Usefulness</strong> &mdash; is this
                  belief helping me or holding me back?
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Pessimistic vs Optimistic Explanatory Styles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Pessimistic vs Optimistic Explanatory Styles
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                To fully understand the impact of explanatory style, it helps to see the two styles
                side by side across different dimensions. The table below summarises how pessimists
                and optimists interpret events differently &mdash; and importantly, how their
                interpretations affect behaviour and outcomes.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg overflow-x-auto">
                <p className="text-sm font-medium text-white mb-3">Explanatory Style Comparison</p>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-white/5 p-2 rounded font-medium text-rose-400">
                      Dimension
                    </div>
                    <div className="bg-red-500/10 p-2 rounded font-medium text-red-400">
                      Pessimistic Style
                    </div>
                    <div className="bg-green-500/10 p-2 rounded font-medium text-green-400">
                      Optimistic Style
                    </div>
                  </div>
                  {[
                    {
                      dim: 'Bad events: Permanence',
                      pess: '"This will last forever"',
                      opt: '"This is temporary"',
                    },
                    {
                      dim: 'Bad events: Pervasiveness',
                      pess: '"This ruins everything"',
                      opt: '"This is specific to this situation"',
                    },
                    {
                      dim: 'Bad events: Personalisation',
                      pess: '"It is entirely my fault"',
                      opt: '"Circumstances contributed"',
                    },
                    {
                      dim: 'Good events: Permanence',
                      pess: '"It was just luck"',
                      opt: '"I earned this through effort"',
                    },
                    {
                      dim: 'Good events: Pervasiveness',
                      pess: '"Only in this one area"',
                      opt: '"I am generally capable"',
                    },
                    {
                      dim: 'Good events: Personalisation',
                      pess: '"Others made it happen"',
                      opt: '"I contributed to this success"',
                    },
                    {
                      dim: 'Response to setback',
                      pess: 'Give up, withdraw, avoid',
                      opt: 'Learn, adapt, try again',
                    },
                    {
                      dim: 'Long-term trajectory',
                      pess: 'Declining performance',
                      opt: 'Improving performance',
                    },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-white/5 p-2 rounded text-white">{row.dim}</div>
                      <div className="bg-red-500/10 p-2 rounded text-white">{row.pess}</div>
                      <div className="bg-green-500/10 p-2 rounded text-white">{row.opt}</div>
                    </div>
                  ))}
                </div>
              </div>

              <p>
                Notice an important pattern: optimists and pessimists <strong>reverse</strong> their
                explanatory style for good events versus bad events. The pessimist treats bad events
                as permanent, pervasive and personal but treats good events as temporary, specific
                and external. The optimist does the opposite. This asymmetry is one of the most
                powerful findings in Seligman&rsquo;s research, because it means pessimists
                experience a double disadvantage: they magnify their failures and minimise their
                successes.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Seligman&rsquo;s MetLife Study
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  One of the most compelling demonstrations of explanatory style&rsquo;s impact came
                  from Seligman&rsquo;s study of MetLife insurance salespeople. Insurance sales has
                  one of the highest rejection rates of any profession &mdash; salespeople hear
                  &ldquo;no&rdquo; far more often than &ldquo;yes.&rdquo; Seligman hypothesised that
                  explanatory style would predict who thrived and who quit.
                </p>
                <div className="space-y-2">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">Finding 1:</strong> Salespeople with
                      optimistic explanatory styles outsold those with pessimistic styles by{' '}
                      <strong>37%</strong> in their first two years.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">Finding 2:</strong> Pessimistic salespeople
                      were <strong>twice as likely to quit</strong> in their first year.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">Finding 3:</strong> When MetLife hired
                      people based on optimism scores (even those who failed the standard aptitude
                      test), these &ldquo;optimistic rejects&rdquo; outsold the pessimistic
                      top-scorers by <strong>21%</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Same Project Going Wrong: Two Interpretations
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  A major commercial fit-out is running two weeks behind schedule due to design
                  changes and material delays. Two electricians on the same project interpret the
                  situation completely differently:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-400 mb-2">
                      Electrician A (Pessimistic)
                    </p>
                    <p className="text-sm text-white">
                      &ldquo;This always happens. Every project I work on ends up a disaster. The
                      management on this job is useless and there is nothing I can do about it. I
                      just want it over.&rdquo;
                    </p>
                    <p className="text-xs text-white mt-2">
                      <strong>Behaviour:</strong> Does the minimum, counts down the days,
                      disengaged, negative atmosphere spreads to team.
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-green-400 mb-2">
                      Electrician B (Optimistic)
                    </p>
                    <p className="text-sm text-white">
                      &ldquo;This project has had more than its fair share of problems, but
                      we&rsquo;ve dealt with worse. The design changes were not ideal, but
                      we&rsquo;ve adapted. If we reorganise the schedule, we can claw back some
                      time.&rdquo;
                    </p>
                    <p className="text-xs text-white mt-2">
                      <strong>Behaviour:</strong> Suggests solutions, maintains effort, lifts team
                      morale, adapts to changes.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Research has also linked optimistic explanatory style to better{' '}
                <strong>physical health</strong> (stronger immune function, lower cardiovascular
                risk), better <strong>mental health</strong> (lower rates of depression and
                anxiety), and stronger <strong>relationships</strong> (optimists are more pleasant
                to work with, handle conflict better, and maintain closer social connections). The
                benefits of learning to think optimistically extend far beyond the workplace.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Realistic Optimism vs Toxic Positivity */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Realistic Optimism vs Toxic Positivity
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                There is a critical distinction between the kind of optimism Seligman advocates and
                the hollow, dismissive positivity that has become common in popular culture. Getting
                this distinction wrong can be harmful &mdash; particularly in a safety-critical
                industry like construction.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Toxic Positivity vs Realistic Optimism
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-400 mb-2">Toxic Positivity</p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Dismisses real problems: &ldquo;Just stay positive!&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          Invalidates genuine emotions: &ldquo;You should not feel that way&rdquo;
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Ignores risks and dangers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          Shames people for struggling: &ldquo;Others have it worse&rdquo;
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Prevents problem-solving by denying problems exist</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-green-400 mb-2">Realistic Optimism</p>
                    <ul className="text-sm text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Acknowledges problems fully and honestly</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Validates emotions: &ldquo;This is genuinely difficult&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Confronts risks and takes them seriously</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Maintains confidence: &ldquo;We can handle this&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>Drives problem-solving by believing solutions exist</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                The distinction is captured perfectly by the <strong>Stockdale Paradox</strong>,
                described by Jim Collins in <em>Good to Great</em>. It is named after Admiral James
                Stockdale, the highest-ranking American military officer imprisoned in the
                &ldquo;Hanoi Hilton&rdquo; during the Vietnam War. Stockdale was tortured repeatedly
                over more than seven years of captivity. Yet he survived.
              </p>

              <p>
                When Collins asked Stockdale who did <em>not</em> survive, his answer was
                surprising:
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Admiral Stockdale:</strong>{' '}
                  <em>
                    &ldquo;The optimists. Oh, they were the ones who said, &lsquo;We&rsquo;re going
                    to be out by Christmas.&rsquo; And Christmas would come, and Christmas would go.
                    Then they&rsquo;d say, &lsquo;We&rsquo;re going to be out by Easter.&rsquo; And
                    Easter would come, and Easter would go. And then Thanksgiving, and then it would
                    be Christmas again. And they died of a broken heart.&rdquo;
                  </em>
                </p>
              </div>

              <p>
                Stockdale himself survived because he held two things simultaneously:{' '}
                <strong>absolute faith</strong> that he would prevail in the end, AND{' '}
                <strong>unflinching confrontation</strong> of the brutal facts of his present
                reality. This is the Stockdale Paradox: you must never confuse faith that you will
                prevail with the discipline to confront the most brutal facts of your current
                situation, whatever they may be.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Example: Project Behind Schedule
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded">
                    <p className="text-xs font-medium text-red-400 mb-1">Toxic Positivity</p>
                    <p className="text-sm text-white">
                      &ldquo;It will be fine! We will catch up somehow. Stop worrying about it.
                      Everything always works out in the end.&rdquo; (Ignores the problem, no action
                      plan, makes others feel their concerns are invalid.)
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded">
                    <p className="text-xs font-medium text-green-400 mb-1">Realistic Optimism</p>
                    <p className="text-sm text-white">
                      &ldquo;We are two weeks behind, and that is a real problem. Here is what went
                      wrong, here is what we can control, and here is my plan to recover as much
                      time as possible. It will be tough, but I believe we can bring it in within a
                      week of the original date if we prioritise correctly.&rdquo; (Acknowledges
                      reality, takes ownership, provides a concrete plan, maintains confidence.)
                    </p>
                  </div>
                </div>
              </div>

              <p>
                In construction, toxic positivity is not just unhelpful &mdash; it can be{' '}
                <strong>dangerous</strong>. Dismissing a genuine safety concern with &ldquo;it will
                be fine&rdquo; is toxic positivity. Ignoring an unrealistic deadline with &ldquo;we
                will manage somehow&rdquo; leads to corner-cutting, fatigue and accidents. Realistic
                optimism, by contrast, takes the concern seriously, believes a solution exists, and
                works to find it.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05: Building Resilience */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Building Resilience
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Resilience is not a personality trait you are born with &mdash; it is a{' '}
                <strong>skill</strong> that can be developed through deliberate practice. This is
                one of the most important and well-supported findings in modern psychology.
                Researchers <strong>Karen Reivich</strong> and <strong>Andrew Shatt&eacute;</strong>{' '}
                (authors of <em>The Resilience Factor</em>) have demonstrated through rigorous
                studies that resilience can be trained in diverse populations, from schoolchildren
                to military personnel to corporate executives.
              </p>

              <p>
                Resilience does not mean never falling down. It means{' '}
                <strong>getting back up</strong> &mdash; and doing so in a way that leaves you
                stronger and wiser than before. The connection between optimism and resilience is
                direct: an optimistic explanatory style provides the mental framework that makes
                bouncing back possible. If you believe setbacks are permanent, pervasive and
                personal, getting back up feels pointless. If you believe they are temporary,
                specific and partially external, recovery becomes not just possible but logical.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Seven Pillars of Resilience (Reivich &amp; Shatt&eacute;)
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      title: 'Emotion Regulation',
                      desc: 'The ability to stay calm under pressure and manage your emotional reactions. This connects directly to Module 3 (Self-Regulation). Resilient people can experience strong emotions without being controlled by them.',
                    },
                    {
                      title: 'Impulse Control',
                      desc: 'The ability to tolerate ambiguity and resist the urge for quick fixes. Resilient people think before they act, particularly when stressed. They resist the temptation to make rash decisions under pressure.',
                    },
                    {
                      title: 'Causal Analysis',
                      desc: 'The ability to accurately identify the causes of problems. This is where optimistic explanatory style is crucial \u2014 resilient people analyse causes accurately rather than catastrophising or over-personalising.',
                    },
                    {
                      title: 'Self-Efficacy',
                      desc: 'The belief that you can solve problems and succeed. Self-efficacy is not arrogance \u2014 it is a realistic confidence in your ability to handle challenges, built from past experiences of overcoming difficulty.',
                    },
                    {
                      title: 'Realistic Optimism',
                      desc: 'The ability to stay positive whilst remaining realistic about the situation. This is the Stockdale Paradox in action: confronting brutal facts while maintaining faith that you will prevail.',
                    },
                    {
                      title: 'Empathy',
                      desc: 'The ability to read the emotions and needs of others. Empathetic people build stronger support networks, which are a critical resource during adversity. We explore empathy in depth in Sections 3 and 4.',
                    },
                    {
                      title: 'Reaching Out',
                      desc: 'The willingness to take on new challenges and connect with others. Resilient people do not retreat into isolation when things go wrong \u2014 they reach out for support and continue to take calculated risks.',
                    },
                  ].map((pillar, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-3 rounded">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-sm font-medium text-white">{pillar.title}</p>
                      </div>
                      <p className="text-sm text-white pl-8">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Construction Examples: Resilience in Action
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Bouncing Back After a Failed Inspection
                      </p>
                      <p className="text-sm text-white">
                        A failed EICR inspection feels like a personal blow. The resilient
                        electrician analyses what went wrong (causal analysis), manages the
                        frustration (emotion regulation), avoids lashing out at the inspector
                        (impulse control), believes they can fix it (self-efficacy), sees it as a
                        specific learning opportunity (realistic optimism), understands the
                        client&rsquo;s frustration (empathy), and asks a colleague for advice on the
                        specific issue (reaching out).
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Recovering from a Business Setback
                      </p>
                      <p className="text-sm text-white">
                        A self-employed electrician loses their biggest client and faces a cash-flow
                        crisis. Resilience here means: managing the panic (emotion regulation), not
                        making desperate decisions (impulse control), understanding why the client
                        left (causal analysis), believing the business can recover (self-efficacy),
                        seeing it as a painful but temporary setback (realistic optimism),
                        maintaining existing client relationships (empathy), and actively seeking
                        new work rather than withdrawing (reaching out).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The practical message is that resilience is not about being tough, stoic, or
                emotionless. It is about having a set of specific psychological skills that enable
                you to process adversity effectively and recover constructively. Every one of the
                seven pillars can be practised and strengthened, and the more you use them, the more
                resilient you become.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 06: Key Takeaways */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Key Takeaways
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Optimism is not about being blindly positive &mdash; it is a{' '}
                <strong>learnable skill</strong> that changes how you interpret events, how you
                respond to setbacks, and ultimately how your career and life unfold. Resilience
                grows with practice, and every time you use the ABCDE model to dispute a pessimistic
                thought, you are building the neural pathways that make optimistic thinking more
                natural.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Summary of Key Principles</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Seligman:</strong> Optimism is an explanatory style, not a personality
                      trait &mdash; and it can be changed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>The 3 Ps:</strong> Pessimists explain bad events as permanent,
                      pervasive and personal; optimists see them as temporary, specific and partly
                      external
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>ABCDE:</strong> A daily practice tool &mdash; Adversity, Beliefs,
                      Consequences, Disputation, Energisation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Stockdale Paradox:</strong> Confront brutal facts AND maintain
                      unwavering faith
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Resilience:</strong> Seven pillars, all developable through deliberate
                      practice
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <RefreshCw className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">
                    Coming Next: Understanding Empathy
                  </p>
                </div>
                <p className="text-sm text-white">
                  In Section 3, we shift from motivation (internal drive) to empathy (understanding
                  others). You will explore Goleman&rsquo;s empathy competencies, the three types of
                  empathy, Brene Brown&rsquo;s powerful distinction between empathy and sympathy,
                  and why empathy is one of the most important safety tools on a construction site.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-rose-400" />
            Frequently Asked Questions
          </h2>
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
            <Link to="../ei-module-4-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Internal Motivation &amp; Drive
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-4-section-3">
              Understanding Empathy
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
