import {
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Target,
  Layers,
  Compass,
  Lightbulb,
  ArrowUpDown,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'kubler-ross-stages',
    question: 'What are the five stages of the Kubler-Ross Change Curve, in order?',
    options: [
      'Anger, denial, bargaining, acceptance, depression',
      'Denial, anger, bargaining, depression, acceptance',
      'Shock, frustration, negotiation, sadness, resolution',
      'Resistance, resentment, compromise, withdrawal, adaptation',
    ],
    correctIndex: 1,
    explanation:
      "The five stages of the Kubler-Ross Change Curve are: Denial ('This cannot be happening'), Anger ('Why is this happening to me?'), Bargaining ('Maybe if I do X, things will go back to how they were'), Depression ('I cannot cope with this'), and Acceptance ('This is the new reality; how do I move forward?'). People do not always move through these stages linearly, and they may revisit stages multiple times.",
  },
  {
    id: 'psychological-flexibility',
    question:
      "According to Steven Hayes's concept of psychological flexibility, what are the three core capacities?",
    options: [
      'Thinking positively, avoiding conflict, and staying busy',
      'Being present (mindful awareness), opening up (accepting difficult thoughts and feelings), and doing what matters (acting on values)',
      'Controlling emotions, planning ahead, and seeking social support',
      'Positive self-talk, goal setting, and stress avoidance',
    ],
    correctIndex: 1,
    explanation:
      'Steven Hayes defines psychological flexibility through three interconnected capacities: being present (engaging with the current moment rather than dwelling on the past or worrying about the future), opening up (making room for difficult thoughts and feelings rather than fighting them), and doing what matters (identifying your values and taking committed action aligned with them, even when it is uncomfortable).',
  },
  {
    id: 'circle-of-influence',
    question:
      "In Stephen Covey's Circle of Influence model, what is the recommended approach for highly effective people?",
    options: [
      'Focus the majority of your energy on things you cannot control, because they are the most important',
      'Ignore everything outside your direct control and only focus on yourself',
      'Focus your energy on your Circle of Influence (what you can affect) rather than your Circle of Concern (what worries you but you cannot control)',
      'Try to expand your Circle of Concern so you worry about more things',
    ],
    correctIndex: 2,
    explanation:
      "Covey's key insight is that highly effective people focus their energy proactively on their Circle of Influence — the things they can actually affect through their actions, attitudes, and decisions. This has a compound effect: by focusing on what you can control, your Circle of Influence gradually expands. People who focus on their Circle of Concern (things they worry about but cannot control) experience frustration, helplessness, and shrinking influence.",
  },
];

const faqs = [
  {
    question: 'I hate change. Does that mean I have low emotional intelligence?',
    answer:
      'No. Disliking change is a completely normal human response — our brains are wired to prefer predictability because it is safer from an evolutionary perspective. Having low adaptability is not the same as hating change. Adaptability means being able to function effectively through change even when you find it uncomfortable. You can dislike a regulation amendment, a new site team, or a scope change and still adapt to it professionally. The goal is not to enjoy change but to manage your response to it constructively. The fact that you are reading this section suggests you are already more adaptable than you think.',
  },
  {
    question: 'How do I stay positive when everything keeps changing?',
    answer:
      "The goal is not forced positivity — that is toxic optimism, and it is as harmful as suppression. The goal is realistic optimism: acknowledging that the change is difficult while maintaining confidence that you can navigate it. Carol Dweck's growth mindset research shows that the most resilient people are not those who deny difficulty but those who see difficulty as a challenge to be met rather than a threat to be avoided. Focus on what you can control (your response, your effort, your attitude), accept what you cannot (the fact that the change is happening), and take it one step at a time.",
  },
  {
    question: 'What if my employer keeps making changes that genuinely make things worse?',
    answer:
      'Adaptability does not mean accepting everything uncritically. If changes are genuinely harmful — to safety, quality, or working conditions — you have a professional responsibility to raise your concerns through appropriate channels. The emotionally intelligent approach is to distinguish between changes that are merely uncomfortable (which require adaptation) and changes that are genuinely problematic (which require assertive communication). Raise concerns factually, propose alternatives constructively, and document your communications. If the situation does not improve, you may need to consider whether the organisation aligns with your professional values. Adaptability includes knowing when to adapt and when to advocate.',
  },
  {
    question: 'How can I help my team adapt to change when they are resistant?',
    answer:
      'Start by acknowledging their feelings — resistance to change is normal and dismissing it only increases it. Use the Kubler-Ross model to understand where people are in the change curve and meet them there. Someone in the denial stage needs different support from someone in the depression stage. Communicate the reasons for the change clearly and honestly, even if the reasons are difficult. Involve people in planning where possible — people support what they help create. Focus on the controllables and break the change into manageable steps. Most importantly, model adaptability yourself: if your team sees you handling change with composure and pragmatism, they are far more likely to do the same.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which stage of the Kubler-Ross Change Curve typically involves the person trying to negotiate a return to the old way of doing things?',
    options: ['Denial', 'Anger', 'Bargaining', 'Depression'],
    correctAnswer: 2,
    explanation:
      "Bargaining is the stage where people attempt to negotiate, compromise, or find workarounds to avoid fully accepting the change. In a workplace context, this might sound like: 'Can we just keep doing it the old way for this project?' or 'What if we only implement part of the change?' While bargaining can sometimes lead to genuine improvements, it often represents resistance to the reality that the old way is no longer available.",
  },
  {
    id: 2,
    question: "What does Steven Hayes mean by 'psychological flexibility'?",
    options: [
      'The ability to change your personality depending on the situation',
      'Being so open-minded that you agree with everything',
      'The ability to be present, open to difficult experiences, and act in accordance with your values',
      'The capacity to avoid all stressful situations through careful planning',
    ],
    correctAnswer: 2,
    explanation:
      'Psychological flexibility, as defined by Steven Hayes in Acceptance and Commitment Therapy (ACT), is the ability to be in contact with the present moment (mindfulness), open up to difficult thoughts and feelings without being controlled by them (acceptance), and take committed action aligned with your values even when it is uncomfortable (values-based action). It is not about being agreeable or avoiding stress — it is about being effective in the presence of difficulty.',
  },
  {
    id: 3,
    question:
      "According to Carol Dweck's growth mindset research, how do growth-minded people interpret setbacks?",
    options: [
      'As evidence that they are not talented enough',
      'As temporary challenges that provide information and opportunities to learn',
      'As reasons to switch to an easier task',
      'As signs that they should ask someone else to take over',
    ],
    correctAnswer: 1,
    explanation:
      "Dweck's research at Stanford consistently shows that growth-minded individuals interpret setbacks as temporary, informative, and solvable. They see failure not as a reflection of their fixed ability but as a data point that helps them adjust their approach. The key phrase is 'not yet' — they have not mastered it yet, which implies that mastery is possible with continued effort and learning. This contrasts with a fixed mindset, which interprets the same setback as proof of permanent limitation.",
  },
  {
    id: 4,
    question:
      "In Covey's model, what happens to people who focus predominantly on their Circle of Concern rather than their Circle of Influence?",
    options: [
      'They become more influential because they understand the bigger picture',
      'They experience frustration, helplessness, and their Circle of Influence shrinks',
      'They become better leaders because they worry about everything',
      'Nothing changes — both approaches produce the same results',
    ],
    correctAnswer: 1,
    explanation:
      'Covey observed that people who focus their energy on their Circle of Concern — things they worry about but cannot directly affect — experience increasing frustration, helplessness, and anxiety. Their reactive energy produces no results, which leads to learned helplessness. Over time, their Circle of Influence actually shrinks because they are not investing in the things they can affect. Conversely, people who focus proactively on their Circle of Influence see it gradually expand.',
  },
  {
    id: 5,
    question:
      'An electrical contractor learns that BS 7671 has been amended, requiring changes to installation practices they have used for years. Which response demonstrates the highest adaptability?',
    options: [
      'Ignoring the amendment and continuing with established practices until forced to change',
      'Complaining that the regulations change too frequently and that the old way was perfectly safe',
      'Acknowledging the disruption, studying the amendment, identifying the specific changes required, and updating their practices proactively',
      'Waiting for a colleague to explain the changes rather than reading the amendment themselves',
    ],
    correctAnswer: 2,
    explanation:
      'The most adaptable response combines acknowledgement (recognising the disruption), proactive learning (studying the amendment), practical analysis (identifying specific changes), and committed action (updating practices). This does not require enjoying the change or pretending it is convenient — it requires engaging with it constructively rather than resisting or avoiding it. Proactive adaptation also provides a competitive advantage because early adopters are better positioned in the market.',
  },
  {
    id: 6,
    question:
      "What is the core difference between Carol Dweck's 'fixed mindset' and 'growth mindset' when applied to change?",
    options: [
      'Fixed mindset sees change as an opportunity; growth mindset sees it as a threat',
      'Growth mindset believes abilities can be developed through effort; fixed mindset believes abilities are innate and unchangeable',
      'Fixed mindset is more realistic; growth mindset is unrealistically optimistic',
      'There is no practical difference in how they handle workplace change',
    ],
    correctAnswer: 1,
    explanation:
      'The fundamental distinction is about beliefs regarding the malleability of ability. Growth mindset individuals believe their abilities can be developed through effort, learning, and persistence — so change represents an opportunity to grow. Fixed mindset individuals believe their abilities are innate and largely unchangeable — so change represents a threat because it might expose limitations. Importantly, growth mindset is not naive optimism; it acknowledges difficulty but maintains that effort and strategy lead to improvement.',
  },
  {
    id: 7,
    question:
      'Which of the following is an example of focusing on your Circle of Influence during a site disruption?',
    options: [
      'Complaining about the weather that has delayed the project',
      'Worrying about whether the client will reduce the contract value',
      'Reorganising your team to maximise productivity in the areas that are still accessible',
      'Blaming the project manager for not planning for the disruption',
    ],
    correctAnswer: 2,
    explanation:
      "Reorganising your team to work productively in available areas is a proactive, Circle of Influence action — you are taking direct control of something you can affect. Complaining about weather, worrying about client decisions, and blaming the project manager are all Circle of Concern activities: they consume energy without producing results. The weather is uncontrollable, the client's decision is outside your direct influence, and blame is retrospective rather than constructive.",
  },
  {
    id: 8,
    question: 'When breaking change into manageable steps, what is the recommended first action?',
    options: [
      'Immediately implement the biggest change to get it over with',
      'Wait until someone tells you exactly what to do',
      'Identify the specific impacts on your work, separate facts from assumptions, and determine your first small actionable step',
      'Delegate all change-related tasks to junior members of the team',
    ],
    correctAnswer: 2,
    explanation:
      'Breaking change into manageable steps begins with clarity: understanding exactly what has changed, separating facts from assumptions or fears, and identifying the first small, concrete step you can take. This prevents overwhelm (trying to change everything at once), avoidance (waiting for instructions), and abdication (delegating responsibility). The first step should be small enough that it feels achievable but meaningful enough that it creates momentum.',
  },
];

export default function EIModule3Section3() {
  useSEO({
    title: 'Adaptability & Handling Change | EI Module 3.3',
    description:
      "Kubler-Ross Change Curve, psychological flexibility, Carol Dweck's growth mindset, Stephen Covey's Circle of Influence, and practical change management for construction professionals.",
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
            <Link to="../ei-module-3">
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
            <RefreshCw className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Adaptability &amp; Handling Change
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding how people experience change, building psychological flexibility, and
            developing the growth mindset that allows you to thrive in an industry where nothing
            stays the same
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Model:</strong> Kubler-Ross Change Curve explains how people move through
                change
              </li>
              <li>
                <strong>Mindset:</strong> Dweck&rsquo;s growth mindset turns change from threat to
                opportunity
              </li>
              <li>
                <strong>Focus:</strong> Covey&rsquo;s Circle of Influence &mdash; control what you
                can, accept what you cannot
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Industry reality:</strong> Construction changes daily &mdash; regulations,
                sites, teams, scopes
              </li>
              <li>
                <strong>Career:</strong> Adaptable professionals progress; rigid ones get left
                behind
              </li>
              <li>
                <strong>Wellbeing:</strong> Resistance to change increases stress; adaptability
                reduces it
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Describe the five stages of the Kubler-Ross Change Curve and identify which stage you or colleagues may be experiencing',
              "Explain Steven Hayes's concept of psychological flexibility and its three core capacities",
              "Apply Carol Dweck's growth mindset principles to workplace change and professional development",
              "Use Stephen Covey's Circle of Influence to focus energy on controllable factors during change",
              'Break large-scale change into manageable, actionable steps using practical frameworks',
              'Identify construction-specific change scenarios and develop adaptable responses to each',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Kubler-Ross Change Curve */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            The Kubler-Ross Change Curve
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 1969, psychiatrist <strong>Elisabeth Kubler-Ross</strong> published{' '}
                <em>On Death and Dying</em>, in which she described five emotional stages that
                people commonly experience when facing loss. While her original model was developed
                in the context of terminal illness and bereavement, it has since been widely adapted
                for understanding how people respond to any significant change &mdash; including
                workplace change, organisational restructuring, and industry disruption.
              </p>

              <p>
                The <strong>Change Curve</strong> (adapted for workplace contexts) describes the
                emotional journey people typically experience when confronted with change. It is
                important to understand that this is a descriptive model, not a prescriptive one
                &mdash; not everyone experiences all stages, the stages do not always occur in
                order, and people may move back and forth between stages. However, the model
                provides a useful framework for understanding your own reactions and those of your
                colleagues.
              </p>

              <div className="space-y-3">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm font-medium text-rose-400">Denial</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    <em>
                      &ldquo;This is not really happening&rdquo; / &ldquo;It will not affect
                      me&rdquo; / &ldquo;They will change their minds&rdquo;
                    </em>
                  </p>
                  <p className="text-sm text-white mb-2">
                    Denial is a protective mechanism. When change is announced, the initial response
                    is often to minimise its significance or assume it will not happen. This is the
                    brain&rsquo;s way of buying time before it has to process the full implications.
                    Denial can look like carrying on as normal, not engaging with new information,
                    or dismissing the change as temporary.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> A new regulation amendment
                      is announced. &ldquo;They say this every few years. Nothing really changes. I
                      will keep doing it the way I always have.&rdquo;
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm font-medium text-rose-400">Anger</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    <em>
                      &ldquo;Why is this happening?&rdquo; / &ldquo;This is not fair&rdquo; /
                      &ldquo;Who decided this?&rdquo;
                    </em>
                  </p>
                  <p className="text-sm text-white mb-2">
                    As the reality of the change begins to penetrate, denial gives way to
                    frustration and anger. This anger may be directed at the people perceived to be
                    responsible for the change (management, regulators, clients), at the situation
                    itself, or at anyone who appears to be accepting the change too readily. Anger
                    is a natural response to the loss of control and predictability.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> &ldquo;These pen-pushers
                      have never done a day&rsquo;s real work. They keep changing the rules and
                      making our lives harder. It is ridiculous.&rdquo;
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm font-medium text-rose-400">Bargaining</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    <em>
                      &ldquo;Can we compromise?&rdquo; / &ldquo;What if we do it partially?&rdquo; /
                      &ldquo;Let me just finish this project the old way&rdquo;
                    </em>
                  </p>
                  <p className="text-sm text-white mb-2">
                    Bargaining represents an attempt to negotiate a way to avoid the full impact of
                    the change. People look for workarounds, exceptions, or partial implementations.
                    While some bargaining can lead to genuine improvements in how change is
                    implemented, it often reflects a deeper reluctance to let go of the familiar.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> &ldquo;Can we use the old
                      method on domestic work and only apply the new requirements on commercial
                      jobs?&rdquo;
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-sm font-medium text-rose-400">Depression</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    <em>
                      &ldquo;I cannot cope with this&rdquo; / &ldquo;What is the point?&rdquo; /
                      &ldquo;Everything is changing and I feel overwhelmed&rdquo;
                    </em>
                  </p>
                  <p className="text-sm text-white mb-2">
                    When bargaining fails and the reality of the change becomes unavoidable, people
                    often experience a period of low mood, demotivation, and withdrawal. This is the
                    emotional low point of the change curve. It is characterised by reduced
                    productivity, disengagement, and sometimes a sense of helplessness. While
                    uncomfortable, this stage is often a necessary transition point &mdash; the
                    letting go of the old before the acceptance of the new.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> &ldquo;I have been doing
                      this for twenty years and now I have to relearn everything. Maybe it is time
                      to pack it in.&rdquo;
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <p className="text-sm font-medium text-rose-400">Acceptance</p>
                  </div>
                  <p className="text-sm text-white mb-2">
                    <em>
                      &ldquo;This is the new reality. How do I move forward?&rdquo; / &ldquo;Let me
                      learn what I need to know&rdquo;
                    </em>
                  </p>
                  <p className="text-sm text-white mb-2">
                    Acceptance does not mean liking the change or believing it was the right
                    decision. It means acknowledging that the change has happened and redirecting
                    your energy from resistance to adaptation. This is where productivity begins to
                    recover and new possibilities start to emerge. People in the acceptance stage
                    are proactive, solution-focused, and willing to engage with the new reality.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-2 rounded">
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">On site:</strong> &ldquo;Right, the new
                      requirements are here to stay. I need to understand exactly what has changed,
                      update my practices, and make sure I am ahead of this rather than behind
                      it.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">
                    Why Understanding the Change Curve Matters
                  </p>
                </div>
                <p className="text-sm text-white">
                  Knowing the Change Curve gives you two powerful advantages. First, when you
                  recognise which stage you are in, you can normalise your experience (&ldquo;I am
                  in the anger stage &mdash; this is a normal part of processing change, and it will
                  pass&rdquo;). Second, when you recognise which stage a colleague is in, you can
                  respond with appropriate empathy rather than frustration (&ldquo;They are in
                  denial right now &mdash; pushing harder will not help; they need time to process
                  before they can engage&rdquo;).
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Psychological Flexibility */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            Psychological Flexibility
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Steven Hayes</strong>, the founder of Acceptance and Commitment Therapy
                (ACT), defines psychological flexibility as{' '}
                <em>
                  &ldquo;the ability to contact the present moment more fully as a conscious human
                  being, and to change or persist in behaviour when doing so serves valued
                  ends&rdquo;
                </em>
                . In simpler terms, it is the ability to be aware of what is happening now, accept
                difficult thoughts and feelings without being controlled by them, and take action
                that aligns with what matters to you &mdash; even when that action is uncomfortable.
              </p>

              <p>
                Psychological flexibility is increasingly recognised as one of the single best
                predictors of mental health, workplace performance, and effective adaptation to
                change. Hayes&rsquo;s research, spanning over 40 years and more than 1,000 published
                studies, demonstrates that people with high psychological flexibility experience
                less stress, greater job satisfaction, and better outcomes during periods of change.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Compass className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Three Core Capacities</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Be Present (Mindful Awareness)
                      </p>
                      <p className="text-sm text-white">
                        Engage with the current moment rather than getting lost in worries about the
                        future or regrets about the past. During change, our minds naturally pull us
                        into catastrophic future thinking (&ldquo;What if this goes wrong?&rdquo;)
                        or nostalgic past dwelling (&ldquo;Things were so much better
                        before&rdquo;). Being present means noticing these patterns and gently
                        redirecting your attention to what is actually happening right now, in this
                        moment.
                      </p>
                      <p className="text-xs text-white mt-1">
                        <strong className="text-rose-400">On site:</strong> Instead of worrying
                        about all the changes coming next month, focus on what you are doing right
                        now. What does <em>today</em> require? What is the next task in front of
                        you?
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Open Up (Acceptance)</p>
                      <p className="text-sm text-white">
                        Make room for difficult thoughts and feelings rather than fighting or
                        suppressing them. This does not mean approving of or resigning to the
                        situation &mdash; it means acknowledging reality as it is. When change
                        happens, you will feel frustrated, anxious, uncertain, or resistant. Rather
                        than fighting these feelings (which increases suffering) or acting on them
                        impulsively (which creates problems), you allow them to be present while
                        choosing your actions consciously.
                      </p>
                      <p className="text-xs text-white mt-1">
                        <strong className="text-rose-400">On site:</strong> &ldquo;I am feeling
                        frustrated about this scope change, and that is completely understandable.
                        The frustration does not have to control what I do next.&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Do What Matters (Values-Based Action)
                      </p>
                      <p className="text-sm text-white">
                        Identify what truly matters to you and take committed action aligned with
                        those values, even when it is uncomfortable. Values are not goals to be
                        achieved; they are directions to be followed. During change, values provide
                        an anchor &mdash; when everything external is shifting, your internal
                        compass remains stable.
                      </p>
                      <p className="text-xs text-white mt-1">
                        <strong className="text-rose-400">On site:</strong> Your value is
                        professional excellence. Even though you dislike the new process, you commit
                        to learning it thoroughly because doing excellent work matters to you
                        regardless of the circumstances.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The beauty of psychological flexibility is that it does not require you to feel
                positive about change. You can dislike a change, feel frustrated by it, and even
                believe it was the wrong decision &mdash; and still adapt effectively. Flexibility
                is about <em>what you do</em>, not <em>how you feel</em>. It uncouples your actions
                from your emotions, allowing you to function effectively even when you are
                emotionally uncomfortable.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Growth Mindset Applied to Change */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Growth Mindset Applied to Change
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Stanford psychologist <strong>Carol Dweck</strong> spent decades researching why
                some people thrive in the face of challenge and change while others collapse. Her
                findings, published in her landmark book{' '}
                <em>Mindset: The New Psychology of Success</em> (2006), identify two fundamentally
                different belief systems about human ability:
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                  <p className="text-xs font-medium text-red-400 mb-2">Fixed Mindset</p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Abilities are innate and largely unchangeable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Change is a threat that might expose limitations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Failure proves you are not good enough</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Effort is a sign that you lack talent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
                      <span>Avoids challenges to protect self-image</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                  <p className="text-xs font-medium text-green-400 mb-2">Growth Mindset</p>
                  <ul className="text-sm text-white space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Abilities can be developed through effort and learning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Change is an opportunity to grow and develop</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Failure provides information and learning opportunities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Effort is the path to mastery</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                      <span>Embraces challenges as development opportunities</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">The &ldquo;Not Yet&rdquo; Mindset:</strong> One
                  of Dweck&rsquo;s most powerful concepts is the addition of two simple words:
                  &ldquo;not yet&rdquo;. Instead of &ldquo;I cannot do smart home
                  installations&rdquo;, say &ldquo;I cannot do smart home installations <em>yet</em>
                  &rdquo;. Instead of &ldquo;I do not understand the new regulations&rdquo;, say
                  &ldquo;I do not understand them <em>yet</em>&rdquo;. These two words transform a
                  statement of permanent limitation into a statement of current position on a
                  learning journey. They acknowledge reality while keeping the door open for
                  development.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">
                    Construction Example: Smart Home Technology
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  A qualified electrician with 20 years of experience is asked to install a smart
                  home system for the first time. How the two mindsets respond:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-400 mb-1">Fixed Mindset Response</p>
                    <p className="text-sm text-white">
                      &ldquo;I am not a tech person. This smart home stuff is for younger
                      electricians. I will stick to what I know.&rdquo;
                    </p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-green-400 mb-1">
                      Growth Mindset Response
                    </p>
                    <p className="text-sm text-white">
                      &ldquo;I do not know this system yet, but I have learned every other system I
                      use now. I will study the documentation, do the manufacturer&rsquo;s training,
                      and practise on a demo board. In six months I will be competent.&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Dweck&rsquo;s research shows that mindset is not a fixed characteristic &mdash; it
                is a pattern of thinking that can be deliberately shifted. You can move from fixed
                to growth mindset by catching fixed-mindset thoughts when they arise (&ldquo;I
                cannot do this&rdquo;) and consciously reframing them (&ldquo;I cannot do this yet,
                but I can learn&rdquo;). Over time, the growth mindset becomes your default
                response, and change becomes significantly less threatening.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Focus on Controllables */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Focus on Controllables
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Stephen Covey</strong>, in his seminal book{' '}
                <em>The 7 Habits of Highly Effective People</em> (1989), introduced the concept of
                the Circle of Concern and the Circle of Influence. This model is one of the most
                practical tools available for managing your response to change, particularly in
                situations where you have limited control over the change itself.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Two Circles</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-2">Circle of Concern</p>
                    <p className="text-xs text-white mb-2">
                      Everything you worry about but cannot directly control: the economy, other
                      people&rsquo;s behaviour, regulation changes, the weather, political
                      decisions, what other trades are doing on site, whether the client will change
                      the scope again.
                    </p>
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Effect of focusing here:</strong>{' '}
                      Frustration, helplessness, reactive energy, shrinking influence.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-2">Circle of Influence</p>
                    <p className="text-xs text-white mb-2">
                      Everything you can directly affect through your actions, decisions, and
                      attitude: your response, your effort, your skill development, your
                      communication, your team&rsquo;s morale, your own preparation, your
                      professional standards.
                    </p>
                    <p className="text-xs text-white">
                      <strong className="text-rose-400">Effect of focusing here:</strong> Agency,
                      effectiveness, proactive energy, expanding influence.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Covey&rsquo;s key insight is that highly effective people focus the vast majority of
                their energy on their Circle of Influence &mdash; the things they can actually
                affect. This is not about ignoring problems or pretending that external factors do
                not matter. It is about directing your finite energy towards actions that will
                actually produce results, rather than burning it on complaints and worries that
                change nothing.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowUpDown className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">
                    Construction Example: A Major Scope Change
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  Halfway through a commercial fit-out, the client requests significant design
                  changes that will require substantial rework. Here is how to apply the Circle of
                  Influence:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-red-400 mb-1">
                      Circle of Concern (Cannot Control)
                    </p>
                    <ul className="text-xs text-white space-y-1">
                      <li>The client&rsquo;s decision to change the design</li>
                      <li>The architect&rsquo;s revised drawings</li>
                      <li>The main contractor&rsquo;s revised programme</li>
                      <li>Whether other trades are equally affected</li>
                      <li>The overall project budget</li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                    <p className="text-xs font-medium text-green-400 mb-1">
                      Circle of Influence (Can Control)
                    </p>
                    <ul className="text-xs text-white space-y-1">
                      <li>Your response to the change (calm, professional)</li>
                      <li>Clear communication of the cost and time impact</li>
                      <li>A revised programme for your team</li>
                      <li>Documenting the variation for commercial purposes</li>
                      <li>Your team&rsquo;s morale and attitude</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                The compound effect of consistently focusing on your Circle of Influence is that it
                actually expands over time. As you demonstrate competence, reliability, and
                proactive problem-solving, people give you more authority and involve you earlier in
                decision-making. Your influence grows because you have proven you use it
                effectively. Conversely, people who spend their energy complaining about their
                Circle of Concern find that their influence shrinks &mdash; they are seen as
                negative, reactive, and unproductive, so they are consulted less and included less.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Breaking Change into Steps */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Breaking Change into Steps
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most common reasons people resist change is not the change itself but the
                <strong> overwhelm</strong> that comes from seeing the full scope of what needs to
                happen. When confronted with a major change &mdash; a new regulation, a new site
                team, a completely different type of work &mdash; the natural response is to look at
                the entire mountain and feel paralysed. The solution is to break the mountain into
                steps.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Five-Step Change Breakdown
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Clarify What Has Actually Changed
                      </p>
                      <p className="text-sm text-white">
                        Separate facts from assumptions and fears. What specifically is different?
                        Often, the change feels bigger than it actually is because anxiety inflates
                        it. Get the actual information before you start planning.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Identify the Specific Impacts on Your Work
                      </p>
                      <p className="text-sm text-white">
                        How does this change affect what you do day to day? Not everything will
                        change. Identify exactly which aspects of your work are affected and which
                        remain the same. This reduces overwhelm by narrowing the scope.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Determine Your First Small Step
                      </p>
                      <p className="text-sm text-white">
                        What is one small, concrete action you can take today or this week? It does
                        not need to solve the whole problem &mdash; it just needs to create
                        momentum. Action reduces anxiety; inaction increases it.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Identify Resources and Support
                      </p>
                      <p className="text-sm text-white">
                        Who can help? What training is available? Is there documentation? Who has
                        already navigated this change and can share their experience? You do not
                        need to do this alone.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Review and Adjust as You Go</p>
                      <p className="text-sm text-white">
                        Change is not a single event &mdash; it is a process. Check in regularly
                        with yourself and your team. What is working? What needs adjusting?
                        Adaptability is iterative, not once-and-done.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Construction-Specific Change Scenarios
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-medium text-rose-400 mb-1">BS 7671 Amendment</p>
                    <p className="text-sm text-white">
                      <strong>Step 1:</strong> Download and read the amendment commentary.{' '}
                      <strong>Step 2:</strong> Identify which changes affect your typical work.{' '}
                      <strong>Step 3:</strong> Update your standard installation practices for the
                      specific changes. <strong>Step 4:</strong> Attend a training course or CPD
                      session. <strong>Step 5:</strong> Review your first few installations under
                      the new requirements.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-medium text-rose-400 mb-1">New Site Team</p>
                    <p className="text-sm text-white">
                      <strong>Step 1:</strong> Learn the names and roles of the key people.{' '}
                      <strong>Step 2:</strong> Understand the site rules and reporting structure.{' '}
                      <strong>Step 3:</strong> Introduce yourself and establish communication
                      channels. <strong>Step 4:</strong> Observe the team dynamics before trying to
                      influence them. <strong>Step 5:</strong> Build one relationship at a time.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-medium text-rose-400 mb-1">Smart Home Technology</p>
                    <p className="text-sm text-white">
                      <strong>Step 1:</strong> Choose one system to learn first.{' '}
                      <strong>Step 2:</strong> Complete the manufacturer&rsquo;s online training.{' '}
                      <strong>Step 3:</strong> Set up a demo board or test installation.{' '}
                      <strong>Step 4:</strong> Shadow someone experienced on a live installation.{' '}
                      <strong>Step 5:</strong> Complete your first solo installation with backup
                      support available.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Building Adaptability as a Strength */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Building Adaptability as a Strength
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Summary:</strong> The construction workers who
                  thrive are not those who never face change &mdash; they are those who have
                  developed the capacity to navigate change effectively. Adaptability is not a
                  personality trait you either have or do not have. It is a skill that can be built
                  through understanding (the Change Curve), flexibility (psychological flexibility),
                  mindset (growth mindset), focus (Circle of Influence), and action (breaking change
                  into steps).
                </p>
              </div>

              <p>
                Let us consolidate the key frameworks from this section into an integrated approach
                for handling any change you encounter in your work:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Your Adaptability Toolkit</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Kubler-Ross Change Curve:</strong> Recognise which stage you are in
                      and normalise the experience. All stages are temporary.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Psychological Flexibility:</strong> Be present, open up to difficult
                      feelings, and do what matters according to your values.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Growth Mindset:</strong> Add &ldquo;not yet&rdquo; to your internal
                      narrative. See change as development, not threat.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Circle of Influence:</strong> Focus your energy on what you can
                      control. Let go of what you cannot.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Step-by-Step Approach:</strong> Break overwhelming change into
                      manageable actions. Start with one small step.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Model Adaptability:</strong> Your team, apprentices, and colleagues
                      take their cues from you. When you handle change well, you give them
                      permission to do the same.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                In the next and final section of Module 3, we will explore accountability and
                trustworthiness &mdash; the self-regulation competencies that determine whether
                people trust you, rely on you, and want to work with you. These are the qualities
                that turn a competent electrician into a respected professional.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">A Final Thought on Adaptability:</strong> The UK
                  electrical industry is entering a period of unprecedented change: smart home
                  technology, electric vehicle charging, battery storage, solar PV integration,
                  smart meters, and evolving regulatory frameworks. The electricians who embrace
                  these changes early &mdash; who see them as opportunities rather than threats
                  &mdash; will be the ones who build the most successful, sustainable careers. The
                  ones who resist will find themselves increasingly left behind. Adaptability is not
                  just an emotional intelligence competency; it is a business strategy.
                </p>
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ei-module-3-section-4">
              Next Section
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
