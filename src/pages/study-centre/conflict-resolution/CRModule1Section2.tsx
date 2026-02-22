import { ArrowLeft, LayoutGrid, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (InlineCheck — correctIndex, 0-indexed)      */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'cr-1-2-check1',
    question:
      'A main contractor tells a subcontractor electrician that they must work overtime this weekend with no additional pay, or they will not be invited back. The electrician knows they are contractually entitled to overtime rates. Which TKI style is the most appropriate response?',
    options: [
      'Avoiding — ignore the request and hope it goes away',
      'Accommodating — agree to the overtime to maintain the relationship',
      'Competing — firmly assert the contractual right to overtime rates, presenting the contract terms clearly',
      'Compromising — offer to work one day at standard rates and one day at overtime rates',
    ],
    correctIndex: 2,
    explanation:
      "When there is a clear contractual right at stake and the other party is attempting to override it through pressure, competing (asserting your position firmly) is the appropriate style. This is not about being aggressive — it is about standing firm on a legitimate entitlement. The electrician should present the contract terms calmly and professionally, making it clear that they are willing to work overtime but only on the agreed terms. Avoiding would allow the exploitation to continue. Accommodating would set a precedent for future unreasonable demands. Compromising would still involve surrendering a legitimate entitlement. Competing protects the electrician's rights whilst keeping the communication professional.",
  },
  {
    id: 'cr-1-2-check2',
    question:
      'Two electricians on a commercial site disagree about whether to use MICC or SWA cable for a fire alarm circuit. Both approaches are compliant with BS 5839-1 but have different cost and installation implications. Which TKI style would produce the best outcome?',
    options: [
      'Competing — the senior electrician should impose their preference',
      'Collaborating — both should discuss the technical merits, cost implications, and client requirements to find the optimal solution',
      'Avoiding — let the project manager decide',
      'Accommodating — the less experienced electrician should defer automatically',
    ],
    correctIndex: 1,
    explanation:
      "Collaborating is the optimal style here because both options are technically valid, and the best solution depends on factors that require discussion: cost, installation time, maintenance access, client preference, and building-specific requirements. By collaborating, both electricians bring their knowledge and experience to bear on the decision, and the outcome is likely to be better than either individual's initial preference. Competing would waste the knowledge of whichever electrician is overruled. Avoiding abddicates professional responsibility. Accommodating wastes the less experienced electrician's perspective, which may include valid observations about installation practicalities.",
  },
  {
    id: 'cr-1-2-check3',
    question:
      'A domestic client wants their kitchen rewired by Friday because they are having guests, but the electrician knows the job realistically needs until Monday. The relationship is good, and the client is a regular source of referrals. What is the best TKI approach?',
    options: [
      "Competing — refuse and insist on Monday regardless of the client's wishes",
      'Accommodating — rush the job and cut corners to meet Friday',
      'Compromising — propose completing the essential circuits (cooker, sockets, lighting) by Friday and finishing the remaining work on Monday',
      'Avoiding — do not discuss the timeline and hope the client does not notice the overrun',
    ],
    correctIndex: 2,
    explanation:
      "Compromising is the best approach in this scenario because both parties have legitimate concerns, and a partial solution exists that addresses the most important needs of both. The client's core need is a functional kitchen by Friday (not necessarily a fully completed rewire), and the electrician's core need is sufficient time to do the work safely and to standard. By completing the essential circuits by Friday and scheduling the remaining work for Monday, the client has a working kitchen for their guests, and the electrician does not compromise on quality or safety. This is a pragmatic, real-world application of the compromising style that preserves the relationship whilst being honest about what is achievable.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Is there a "best" conflict style?',
    answer:
      'No. This is one of the most important insights from the Thomas-Kilmann model. Each of the five styles has situations where it is the most effective approach and situations where it is counterproductive. Collaborating is often presented as the ideal, but it is time-consuming and inappropriate when speed is critical, the issue is trivial, or one party is acting in bad faith. The skill is not in defaulting to one style but in reading the situation accurately and choosing the style that will produce the best outcome in that specific context. A skilled conflict handler has access to all five styles and deploys them deliberately.',
  },
  {
    question: 'What is the difference between compromising and collaborating?',
    answer:
      'Compromising involves both parties giving up something to reach a middle ground — it is about splitting the difference. Collaborating involves both parties working together to find a solution that fully satisfies everyone — it is about expanding the options. For example, if two trades need the same workspace at the same time, a compromise might be splitting the day (mornings for one, afternoons for the other). A collaborative solution might involve redesigning the work sequence so both can work simultaneously in different areas, or finding an alternative approach that eliminates the scheduling conflict entirely. Compromising is faster; collaborating often produces better outcomes but takes more time and effort.',
  },
  {
    question: 'How do I know which style to use?',
    answer:
      'Consider four factors: how important the issue is to you (your assertiveness need), how important the relationship is to you (your cooperativeness need), how much time you have, and whether the other party is acting in good faith. If the issue is critical and the relationship is secondary, competing may be appropriate. If the relationship is critical and the issue is minor, accommodating may be best. If both are important and you have time, collaborate. If both matter but time is short, compromise. If neither is important, avoiding may be fine. The key is making a conscious choice rather than defaulting to your habitual style regardless of the situation.',
  },
  {
    question: 'Can I change my default conflict style?',
    answer:
      'Yes, but it takes deliberate practice. Your default style is a habit formed over years of experience, personality, and cultural conditioning. Most people have one or two styles they use automatically and one or two they rarely access. The first step is awareness — understanding which style you default to and recognising when you are doing it. The second step is experimentation — deliberately choosing a different style in low-stakes situations to build comfort. The third step is reflection — reviewing how the alternative style worked and what you learned. Over time, you expand your repertoire so that you can access all five styles and choose deliberately rather than reacting habitually.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'The Thomas-Kilmann Conflict Mode Instrument (TKI) maps conflict behaviour on two axes. These axes are:',
    options: [
      'Aggression and passivity',
      'Assertiveness and cooperativeness',
      'Introversion and extraversion',
      'Logic and emotion',
    ],
    correctAnswer: 1,
    explanation:
      "The TKI, developed by Kenneth Thomas and Ralph Kilmann in 1974, maps conflict behaviour on two dimensions: assertiveness (the degree to which you try to satisfy your own concerns) and cooperativeness (the degree to which you try to satisfy the other person's concerns). These two dimensions create five distinct conflict-handling modes: competing (high assertiveness, low cooperativeness), collaborating (high both), compromising (moderate both), avoiding (low both), and accommodating (low assertiveness, high cooperativeness). The model is descriptive, not prescriptive — it does not say which style is best, only that different situations call for different approaches.",
  },
  {
    id: 2,
    question: 'The "competing" conflict style is characterised by:',
    options: [
      'High cooperativeness and low assertiveness',
      'Low assertiveness and low cooperativeness',
      "High assertiveness and low cooperativeness — pursuing your own concerns at the other person's expense",
      'Moderate assertiveness and moderate cooperativeness',
    ],
    correctAnswer: 2,
    explanation:
      "Competing sits in the high assertiveness, low cooperativeness quadrant of the TKI model. A person using the competing style pursues their own concerns at the potential expense of the other person's. This style uses whatever power is available — positional authority, expertise, contractual rights, or force of argument — to win. It is appropriate when quick, decisive action is needed (safety issues), when you are confident you are right on an important issue, or when you need to protect yourself from exploitation. It is inappropriate when the relationship matters more than the outcome, when you might be wrong, or when you need the other person's future cooperation.",
  },
  {
    id: 3,
    question:
      'A site manager asks an electrician to relocate a distribution board that has already been installed and tested. The electrician believes the current position complies with regulations and the approved drawings. The most collaborative response would be:',
    options: [
      'Refuse outright and cite the approved drawings',
      'Relocate the board immediately without question',
      'Ask the site manager to explain the reason for the change, discuss the implications (time, cost, compliance), and explore whether there is a solution that addresses their concern without a full relocation',
      'Agree to relocate but submit a formal complaint afterwards',
    ],
    correctAnswer: 2,
    explanation:
      "Collaborating means seeking to understand the other person's underlying concern and then working together to find a solution that satisfies both parties. By asking why the relocation is needed, the electrician may discover that the concern is about access, aesthetics, or a design change — and there may be a solution that addresses that concern without the full cost and delay of relocation. Perhaps the board can be screened, the door swing changed, or the layout adjusted. Refusing outright (competing) wins the battle but damages the relationship. Relocating without question (accommodating) absorbs unnecessary cost. Agreeing then complaining (passive-aggressive) is the worst option.",
  },
  {
    id: 4,
    question:
      'Which TKI style involves moderate assertiveness and moderate cooperativeness — "splitting the difference"?',
    options: ['Collaborating', 'Competing', 'Compromising', 'Avoiding'],
    correctAnswer: 2,
    explanation:
      'Compromising sits at the centre of the TKI model — moderate assertiveness, moderate cooperativeness. Both parties give up something to reach an acceptable middle ground. The advantage of compromising is speed and pragmatism: it produces a workable solution quickly. The disadvantage is that neither party is fully satisfied, and the solution may not be optimal. In construction, compromising is particularly useful for scheduling disputes (splitting available time), minor cost disagreements (meeting in the middle on a variation price), and non-critical technical decisions where either option is acceptable. It is less appropriate for safety issues, contractual rights, or situations where a creative solution exists that would satisfy both parties fully.',
  },
  {
    id: 5,
    question:
      'An apprentice electrician notices that a qualified colleague has made an error in a consumer unit installation. The apprentice is reluctant to speak up because of the seniority difference. They decide to say nothing. Which TKI style is the apprentice using?',
    options: [
      'Accommodating',
      'Compromising',
      'Avoiding — they are sidestepping the conflict by not raising the issue at all',
      'Competing',
    ],
    correctAnswer: 2,
    explanation:
      'The apprentice is using the avoiding style — low assertiveness (not pursuing their concern) and low cooperativeness (not helping the colleague correct the error). Avoiding means withdrawing from the conflict situation entirely. In this case, avoiding is clearly inappropriate because there is a potential safety issue at stake. The error in the consumer unit could have serious consequences. The apprentice\'s reluctance is understandable — challenging a more senior colleague feels risky — but the correct approach would be to raise the concern, perhaps framed as a question ("I noticed this — could you help me understand?") rather than a direct challenge. This is an example of why understanding your default style matters: if your default is avoiding, you need to recognise situations where it is dangerous.',
  },
  {
    id: 6,
    question: 'The "accommodating" conflict style is most appropriate when:',
    options: [
      'You are certain you are right and the issue is critical',
      'The issue matters more to the other person than to you, preserving the relationship is important, and you recognise that you may be wrong or the issue is minor',
      'Both parties have equal stakes and neither will budge',
      'You want to avoid dealing with the situation entirely',
    ],
    correctAnswer: 1,
    explanation:
      "Accommodating — low assertiveness, high cooperativeness — involves yielding to the other person's position. It is appropriate when the issue matters more to them than to you, when preserving the relationship is your priority, when you recognise that you are wrong or the evidence supports their position, or when the issue is so minor that asserting yourself would create unnecessary friction. For example, if a client wants a socket 50mm higher than you suggested, and both positions are compliant, accommodating is sensible — the client lives with the result. However, accommodating is inappropriate when the issue involves safety, legal compliance, or significant financial impact, because yielding in those situations creates real risk.",
  },
  {
    id: 7,
    question:
      'An electrician uses the competing style in every dispute — with clients, contractors, suppliers, and colleagues. The most likely long-term consequence is:',
    options: [
      'They will earn a reputation as a strong, respected professional',
      'They will win every dispute and maximise their income',
      'They will damage relationships, lose repeat business, and find themselves excluded from projects because other people avoid working with them',
      'They will be promoted to management due to their decisiveness',
    ],
    correctAnswer: 2,
    explanation:
      "Using any single conflict style exclusively creates predictable problems, and competing is particularly damaging when overused. While competing may win individual disputes, the cumulative effect is relationship damage. Clients stop recommending. Contractors stop inviting. Colleagues stop cooperating. Suppliers stop prioritising. In construction, where work flows through relationships and reputation, an electrician who is known as combative and unwilling to compromise will gradually find themselves excluded — not because they were wrong on any individual issue, but because nobody wants to work with someone who treats every interaction as a battle to be won. The TKI model's key insight is that flexibility across all five styles is the mark of a skilled conflict handler.",
  },
  {
    id: 8,
    question: 'According to the TKI model, the key skill in conflict management is:',
    options: [
      'Always choosing the collaborating style because it produces the best outcomes',
      'Avoiding conflict whenever possible to maintain harmony',
      'Winning every argument through superior knowledge and assertiveness',
      'Being able to diagnose the situation accurately and choose the most appropriate conflict style from all five options',
    ],
    correctAnswer: 3,
    explanation:
      'The fundamental insight of the TKI model is that no single conflict style is universally superior. Each of the five styles has situations where it is the most effective approach. The key skill is situational awareness — reading the context (importance of the issue, importance of the relationship, time available, power dynamics) and selecting the style that will produce the best outcome in that specific situation. This requires having all five styles in your repertoire and being able to deploy them deliberately rather than defaulting to your habitual pattern. A skilled conflict handler might compete on a safety issue, collaborate on a design problem, compromise on a scheduling dispute, accommodate on a minor client preference, and avoid a trivial argument — all in the same week.',
  },
];

export default function CRModule1Section2() {
  useSEO({
    title: 'The Five Conflict Styles | Conflict Resolution Module 1.2',
    description:
      'Thomas-Kilmann Conflict Mode Instrument: competing, collaborating, compromising, avoiding, and accommodating — when to use each style in construction.',
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
            <Link to="../cr-module-1">
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
            <LayoutGrid className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The Five Conflict Styles
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            The Thomas-Kilmann Conflict Mode Instrument: competing, collaborating, compromising,
            avoiding, and accommodating &mdash; and when to use each one
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>TKI model</strong> (1974) maps conflict behaviour on assertiveness &times;
                cooperativeness
              </li>
              <li>
                <strong>Five styles:</strong> competing, collaborating, compromising, avoiding,
                accommodating
              </li>
              <li>
                <strong>No single style</strong> is always right &mdash; the skill is choosing
                appropriately
              </li>
              <li>
                <strong>Most people</strong> default to one or two styles regardless of context
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Self-awareness:</strong> Understanding your default style helps you
                recognise habitual patterns
              </li>
              <li>
                <strong>Flexibility:</strong> Different situations require different approaches
                &mdash; one size does not fit all
              </li>
              <li>
                <strong>Better outcomes:</strong> Choosing the right style produces better results
                than reacting on autopilot
              </li>
              <li>
                <strong>Construction relevance:</strong> Tradespeople face all five scenarios
                regularly
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Describe the two axes of the Thomas-Kilmann model: assertiveness and cooperativeness',
              'Name and explain the five conflict-handling modes with construction-specific examples',
              'Identify when each conflict style is the most appropriate response to a given situation',
              'Recognise the risks of overusing any single conflict style',
              'Assess your own default conflict style and its strengths and limitations',
              'Choose a conflict style deliberately based on situational factors rather than habit',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Thomas-Kilmann Model */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            The Thomas-Kilmann Model
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                In 1974, organisational psychologists <strong>Kenneth Thomas</strong> and{' '}
                <strong>Ralph Kilmann</strong> published the Thomas-Kilmann Conflict Mode Instrument
                (TKI), which has since become the world&rsquo;s most widely used framework for
                understanding how people handle conflict. The model has been translated into more
                than 20 languages and administered to millions of people worldwide. Its enduring
                popularity is due to its simplicity, accuracy, and practical applicability.
              </p>

              <p>
                The TKI model is built on a simple insight: when you are in a conflict situation,
                your behaviour can be described along two independent dimensions.{' '}
                <strong>Assertiveness</strong> is the degree to which you try to satisfy your own
                concerns &mdash; your needs, goals, and interests. <strong>Cooperativeness</strong>{' '}
                is the degree to which you try to satisfy the other person&rsquo;s concerns. These
                two dimensions create a grid, and the five conflict-handling modes are defined by
                their position on that grid.
              </p>

              <p>
                The power of this model lies in its non-judgemental framing. Thomas and Kilmann
                explicitly stated that no single conflict mode is inherently better or worse than
                any other. Each mode has situations where it is the most effective response. The
                problem is not in having a particular style &mdash; it is in using the same style in
                every situation regardless of context. A person who always competes will damage
                relationships. A person who always avoids will allow problems to fester. A person
                who always accommodates will be exploited. The most effective conflict handlers are
                those who can access all five modes and choose deliberately based on the situation.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Five TKI Conflict-Handling Modes
                </p>
                <ul className="text-base text-white space-y-3">
                  <li>
                    <strong>Competing</strong> &mdash; High assertiveness, low cooperativeness.
                    &ldquo;My way.&rdquo; You pursue your concerns at the other person&rsquo;s
                    expense.
                  </li>
                  <li>
                    <strong>Collaborating</strong> &mdash; High assertiveness, high cooperativeness.
                    &ldquo;Let&rsquo;s find a solution that works for both of us.&rdquo; You work
                    together to find a mutually satisfying outcome.
                  </li>
                  <li>
                    <strong>Compromising</strong> &mdash; Moderate assertiveness, moderate
                    cooperativeness. &ldquo;Let&rsquo;s split the difference.&rdquo; Both parties
                    give up something to reach middle ground.
                  </li>
                  <li>
                    <strong>Avoiding</strong> &mdash; Low assertiveness, low cooperativeness.
                    &ldquo;I&rsquo;ll deal with it later.&rdquo; You sidestep or withdraw from the
                    conflict.
                  </li>
                  <li>
                    <strong>Accommodating</strong> &mdash; Low assertiveness, high cooperativeness.
                    &ldquo;Have it your way.&rdquo; You yield to the other person&rsquo;s concerns
                    at the expense of your own.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Competing & Collaborating */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Competing and Collaborating
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Competing</strong> sits in the high assertiveness, low cooperativeness
                corner of the TKI grid. When you compete, you pursue your own concerns firmly and
                decisively, using whatever legitimate power is available to you &mdash; expertise,
                contractual rights, positional authority, or strength of argument. The competing
                style is sometimes described as &ldquo;my way&rdquo; &mdash; you believe your
                position is correct and you defend it vigorously.
              </p>

              <p>
                In construction, competing is appropriate in specific situations. When safety is at
                stake, there is no room for compromise or accommodation. An electrician who
                discovers that a circuit is not properly protected must assert the requirement for
                correction, regardless of the cost or inconvenience. When contractual rights are
                being violated &mdash; for example, a main contractor withholding legitimate
                retention or refusing to pay for approved variations &mdash; competing protects your
                financial interests. When you have specialist expertise that the other party lacks,
                competing ensures that technical standards are maintained.
              </p>

              <p>
                <strong>Collaborating</strong> sits in the opposite corner: high assertiveness and
                high cooperativeness. When you collaborate, you work with the other person to find a
                solution that fully satisfies both sets of concerns. Unlike compromising (where both
                parties give something up), collaborating aims to expand the options so that nobody
                has to sacrifice. This requires more time, more creativity, and more trust than any
                other mode.
              </p>

              <p>
                In construction, collaborating is ideal for complex technical decisions where
                multiple perspectives improve the outcome. When an architect, electrician, and
                mechanical engineer collaborate on the services design for a building, the result is
                typically superior to anything any single discipline would produce alone. Each
                brings specialist knowledge that the others lack. Collaborating is also valuable in
                long-term working relationships where both parties benefit from investing in a
                mutually satisfying outcome &mdash; for example, an electrician and a regular client
                agreeing on a maintenance contract structure that works for both of them.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  When to Compete vs When to Collaborate
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Compete</strong> when: safety is at risk, contractual rights are being
                      violated, you are certain you are right on a critical issue, or you need to
                      protect yourself from exploitation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Collaborate</strong> when: the issue is complex and benefits from
                      multiple perspectives, the relationship is long-term, both parties have
                      legitimate concerns, and you have time to explore options together
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Compromising */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Compromising &mdash; The Middle Ground
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Compromising</strong> sits at the centre of the TKI grid: moderate
                assertiveness, moderate cooperativeness. When you compromise, both parties give up
                something in order to reach an acceptable middle ground. Neither party gets
                everything they want, but both get enough to move forward. The compromising style is
                often described as &ldquo;splitting the difference&rdquo; &mdash; and in many
                everyday construction situations, it is the most pragmatic and time-efficient
                approach.
              </p>

              <p>
                The great strength of compromising is speed and pragmatism. In construction, where
                delays cost money and decisions often need to be made quickly, compromising allows
                disputes to be resolved without the extended process that collaboration requires.
                When two trades both need access to the same area and neither can wait, compromising
                (half the day each) gets work moving again immediately. When a client and
                electrician disagree on the cost of a variation by &pound;200, meeting in the middle
                at &pound;100 may be more cost-effective for both parties than spending 3 hours
                debating the precise value of the work.
              </p>

              <p>
                The limitation of compromising is that neither party is fully satisfied, and the
                solution may not be optimal. Splitting a day between two trades may seem fair, but
                it means neither trade has a full working day, which can reduce productivity. A
                compromise on price may leave the electrician feeling underpaid and the client
                feeling overcharged. There is also a risk that habitual compromising becomes a path
                of least resistance &mdash; you split everything down the middle rather than putting
                in the effort to find a genuinely good solution. Compromising works best when the
                issue is moderately important, time is limited, and both parties have reasonable
                positions.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Construction Examples of Effective Compromising
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Scheduling:</strong> Two trades need the same workspace. Rather than
                      one waiting entirely for the other, they agree on a morning/afternoon split.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Pricing:</strong> A variation is quoted at &pound;800. The client
                      believes it should be &pound;600. They agree on &pound;700 to keep the project
                      moving.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Specification:</strong> A client wants premium light fittings that
                      exceed the budget. They compromise by using premium fittings in the main
                      living areas and standard fittings in utility spaces.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Avoiding & Accommodating */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Avoiding and Accommodating
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Avoiding</strong> sits in the low assertiveness, low cooperativeness corner.
                When you avoid, you sidestep the conflict entirely &mdash; you do not pursue your
                own concerns and you do not address the other person&rsquo;s. You withdraw,
                postpone, or simply pretend the issue does not exist. The avoiding style is often
                described as &ldquo;I&rsquo;ll deal with it later&rdquo; &mdash; but
                &ldquo;later&rdquo; often never comes.
              </p>

              <p>
                Avoiding is appropriate in specific circumstances: when the issue is genuinely
                trivial and not worth the energy of engagement, when emotions are running too high
                for a productive conversation (cooling off is wise), when you need more information
                before you can respond properly, or when someone else is better positioned to handle
                the conflict. An electrician who overhears two labourers bickering about whose turn
                it is to make tea is right to avoid that conflict. An electrician who decides to
                wait until Monday to discuss a payment issue (rather than raising it on a Friday
                afternoon when both parties are tired) is making a strategic choice.
              </p>

              <p>
                <strong>Accommodating</strong> sits in the low assertiveness, high cooperativeness
                corner. When you accommodate, you yield to the other person&rsquo;s position. You
                put their concerns above your own. The accommodating style is sometimes described as
                &ldquo;have it your way&rdquo; &mdash; you concede, whether because the issue
                matters more to them, you recognise that you are wrong, or you want to preserve the
                relationship.
              </p>

              <p>
                Accommodating is appropriate when the issue genuinely matters more to the other
                person than to you, when you recognise that your position is weaker than theirs,
                when preserving the relationship is more important than winning the point, or when
                the issue is minor enough that asserting yourself would create unnecessary friction.
                A domestic electrician who agrees to a client&rsquo;s preference for socket height
                (when both positions are compliant) is accommodating sensibly &mdash; the client has
                to live with the result, the electrician does not. However, accommodating is
                dangerous when overused: if you always yield, you teach other people that your
                boundaries can be pushed, and you accumulate resentment that eventually surfaces
                destructively.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  Warning: The Dangers of Overuse
                </p>
                <p className="text-base text-white leading-relaxed">
                  <strong>
                    Habitual avoiders allow problems to grow until they become crises. Habitual
                    accommodators teach other people that their boundaries can be pushed
                    indefinitely.
                  </strong>
                </p>
                <p className="text-sm text-white mt-3">
                  Both styles have legitimate uses, but defaulting to either one in every situation
                  is a recipe for exploitation, resentment, and eventual explosive confrontation.
                  The key question is: am I choosing this style deliberately, or am I defaulting to
                  it because I am uncomfortable with the alternatives?
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: No Single Style Is Always Right */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            No Single Style Is Always Right
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The most important lesson from the TKI model is that effectiveness in conflict is
                not about having the &ldquo;right&rdquo; style &mdash; it is about having access to
                all five styles and the judgement to choose appropriately. Most people develop a
                default style early in life through a combination of personality, family dynamics,
                and cultural conditioning, and then use that style in almost every conflict
                situation they encounter. This is like a carpenter who uses a hammer for everything
                &mdash; including tasks that need a screwdriver or a saw.
              </p>

              <p>
                Consider a single week in the life of a self-employed electrician. On Monday, they
                discover a dangerous installation left by a previous electrician and must assert
                (compete) that it be corrected before they continue work. On Tuesday, they
                collaborate with a kitchen fitter on the sequencing of a kitchen installation,
                producing a plan that works for both trades. On Wednesday, they compromise with a
                client on the position of an outside light &mdash; neither the client&rsquo;s
                preferred position nor the electrician&rsquo;s is ideal, but the agreed position is
                acceptable to both. On Thursday, they accommodate a regular client&rsquo;s request
                to reschedule an appointment, because the relationship matters and the rescheduling
                is a minor inconvenience. On Friday, they avoid engaging with an argumentative
                supplier who is having a bad day, because the issue is trivial and not worth the
                energy.
              </p>

              <p>
                In each of these situations, the electrician used a different conflict style &mdash;
                and in each case, the chosen style was appropriate for the context. This is what
                skilled conflict management looks like in practice. It is not about being tough, or
                being nice, or being clever. It is about reading the situation and choosing the
                response that will produce the best outcome for that specific set of circumstances.
                Developing this flexibility is one of the core objectives of this course.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Construction Scenario Matching
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Safety violation found &rarr; Compete.</strong> Non-negotiable. Assert
                      the requirement clearly and firmly.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Complex design decision &rarr; Collaborate.</strong> Multiple
                      perspectives produce a better solution.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Minor cost dispute &rarr; Compromise.</strong> Speed and pragmatism
                      outweigh perfection.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>
                        Client preference on a non-critical detail &rarr; Accommodate.
                      </strong>{' '}
                      The client lives with the result; you do not.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Trivial dispute that will resolve itself &rarr; Avoid.</strong>{' '}
                      Conserve your energy for conflicts that matter.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has introduced the Thomas-Kilmann Conflict Mode Instrument and its five
                conflict-handling styles. The key points to carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The TKI model</strong> (Thomas &amp; Kilmann, 1974) maps conflict
                    behaviour on two dimensions: assertiveness and cooperativeness.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Five modes exist:</strong> competing, collaborating, compromising,
                    avoiding, and accommodating. Each has situations where it is the best approach.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Most people default</strong> to one or two styles and overuse them
                    regardless of context. This leads to predictable problems.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The key skill</strong> is situational flexibility: reading the context
                    and choosing the style that will produce the best outcome in that specific
                    situation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Construction demands all five styles.</strong> Safety issues require
                    competing. Design decisions benefit from collaborating. Scheduling requires
                    compromising. Minor preferences call for accommodating. Trivial disputes warrant
                    avoiding.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Your default style is not fixed.</strong> With awareness and practice,
                    you can expand your repertoire to include all five modes.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 3, we will examine the
                  most common conflict triggers in construction &mdash; money disputes, scope
                  disagreements, programme clashes, quality disputes, and power imbalances &mdash;
                  and explore why each one is so prevalent in the industry.
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
            <Link to="../cr-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-1-section-3">
              Next: Common Conflict Triggers in Construction
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
