import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Scale,
  HelpCircle,
  Shield,
  Target,
  XCircle,
  ThumbsUp,
  Repeat,
  MessageCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

/* ------------------------------------------------------------------ */
/*  Quick-check questions (placed between content sections)            */
/* ------------------------------------------------------------------ */
const quickCheckQuestions = [
  {
    id: 'cr-2-4-check1',
    question:
      'What are the four points on the assertiveness spectrum, in order from least to most forceful?',
    options: [
      'Aggressive, assertive, passive, passive-aggressive',
      'Passive, passive-aggressive, assertive, aggressive',
      'Assertive, passive, aggressive, passive-aggressive',
      'Passive-aggressive, passive, aggressive, assertive',
    ],
    correctIndex: 1,
    explanation:
      "The assertiveness spectrum runs from passive (not expressing your needs, putting others' needs above your own) through passive-aggressive (expressing needs indirectly through sarcasm, avoidance, or sabotage) to assertive (expressing needs directly, honestly, and respectfully) to aggressive (expressing needs at the expense of others, through domination, intimidation, or attack). Assertiveness sits between the two ineffective extremes and is the only sustainable approach to conflict resolution in professional settings.",
  },
  {
    id: 'cr-2-4-check2',
    question: "In William Ury's Positive No, what do the three stages — Yes, No, Yes — represent?",
    options: [
      'Yes to compromise, No to conflict, Yes to peace',
      'Yes to your underlying interest, No as your clear boundary, Yes to an alternative that respects both parties',
      "Yes to the other person's request, No to your own needs, Yes to accepting the outcome",
      'Yes to meeting, No to the agenda, Yes to a follow-up',
    ],
    correctIndex: 1,
    explanation:
      'Ury\'s Positive No has three stages. The first Yes affirms your underlying interest or value — the reason you are saying no ("I value this client relationship and I want to continue working with you"). The No is a clear, firm statement of your boundary ("However, I\'m not able to do this additional work for free"). The second Yes offers an alternative that respects both parties\' needs ("What I can do is provide a costed option so you can decide whether to proceed"). This structure allows you to set boundaries without damaging relationships.',
  },
  {
    id: 'cr-2-4-check3',
    question: 'What is the key difference between an I-statement and a You-statement in conflict?',
    options: [
      'I-statements are longer; You-statements are shorter',
      "I-statements describe your experience and feelings; You-statements make claims about the other person's character or intent",
      'You-statements are always aggressive; I-statements are always passive',
      'There is no meaningful difference — they are just different grammar',
    ],
    correctIndex: 1,
    explanation:
      'I-statements ("I feel frustrated when invoices are late because I need reliable cash flow") describe your own experience, feelings, and needs without making claims about the other person\'s character, intent, or behaviour patterns. You-statements ("You never pay on time — you don\'t respect my business") make claims about the other person, which triggers defensiveness. The shift from You to I is not just grammatical — it fundamentally changes the dynamic of the conversation from accusation to shared problem-solving.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question:
      'I worry that being assertive will be seen as aggressive. How do I find the right balance?',
    answer:
      "This is one of the most common concerns, and it is particularly prevalent in the construction industry where direct communication is normal but the line between directness and aggression can be blurry. The key differentiator is respect. Assertiveness respects both your own needs and the other person's; aggression prioritises your needs at the expense of theirs. Practically, this means: state your position clearly (assertive) without attacking their character (aggressive). Express your feelings honestly (assertive) without blaming them for those feelings (aggressive). Make requests directly (assertive) without threatening consequences for refusal (aggressive). If you are genuinely respectful while being direct, most people will recognise the difference.",
  },
  {
    question: 'What if the broken record technique just makes the other person angrier?',
    answer:
      'The broken record technique works best when your repeated statement is calm, respectful, and acknowledges the other person\'s position each time. Simply repeating "I need payment by Friday" like a robot will escalate tension. Instead, vary the acknowledgement while keeping the core message consistent: "I understand you are dealing with cash flow pressures, and I need payment by Friday." "I hear that you are waiting on your own client to pay, and I still need payment by Friday." Each repetition shows you are listening while maintaining your position. If the person becomes genuinely aggressive despite your calm persistence, it is appropriate to suggest resuming the conversation when things have cooled down.',
  },
  {
    question:
      'Can I be assertive with someone who has authority over me, like a site manager or main contractor?',
    answer:
      'Absolutely, and in fact it is more important in these situations because the power imbalance makes it easier to default to passivity. Assertiveness with authority figures requires you to be respectful of their role while being honest about your needs. Instead of "You\'re wrong about that timeline," try: "I want to make sure we meet the deadline, and I need to flag that the material delivery issue means the current timeline isn\'t achievable. Can we look at this together?" You are not challenging their authority — you are providing them with information they need to make good decisions. Most competent managers actually prefer assertive team members because passive ones give them incomplete information and aggressive ones create dysfunction.',
  },
  {
    question: 'How do I handle someone who is consistently passive-aggressive on site?',
    answer:
      "Passive-aggressive behaviour (sarcasm, silent treatment, deliberate delays, backhanded compliments) is one of the hardest conflict styles to address because the person can always deny hostile intent. The most effective approach is to address the behaviour directly but without accusation. Name what you observe: \"I've noticed that the last three tasks I've asked for have been delayed until the last possible moment. I'm not sure what's going on, but I'd like to understand if there's an issue we need to discuss.\" This gives the person an opening to express their underlying concern (which is driving the passive-aggression) without forcing them to admit to deliberate sabotage. If the behaviour continues after a direct conversation, document it and involve a supervisor — passive-aggression that affects project delivery is a performance issue, not just a personality quirk.",
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'Which point on the assertiveness spectrum involves expressing your needs indirectly through sarcasm, avoidance, or subtle sabotage?',
    options: ['Passive', 'Passive-aggressive', 'Assertive', 'Aggressive'],
    correctAnswer: 1,
    explanation:
      'Passive-aggressive behaviour involves indirect expression of hostility or unmet needs. Rather than addressing a concern directly (assertive) or openly attacking (aggressive), the passive-aggressive person uses indirect tactics: sarcasm, the silent treatment, deliberate delays, "forgetting" commitments, backhanded compliments, or withholding cooperation. On construction sites, this might look like a tradesperson who agrees to a timeline but consistently delivers just late enough to cause problems, or someone who says "Fine, whatever you want" in a tone that clearly communicates resentment.',
  },
  {
    id: 2,
    question: 'According to the assertiveness formula, what are the four components?',
    options: [
      'When, I think, because, I demand',
      'You, always, never, should',
      'When [situation], I feel [feeling], because [reason], I would like [request]',
      'First, then, next, finally',
    ],
    correctAnswer: 2,
    explanation:
      'The assertiveness formula structures your message into four clear components: "When [specific situation]" describes the observable trigger without generalisation. "I feel [genuine feeling]" owns your emotional response. "Because [reason]" explains why this matters to you. "I would like [specific request]" offers a clear path forward. For example: "When invoices are paid more than 30 days late, I feel anxious because I need reliable cash flow to cover my material costs. I would like us to agree on 14-day payment terms." This formula is assertive because it is honest, specific, and respectful — it describes your experience without attacking the other person.',
  },
  {
    id: 3,
    question: 'Why does passive behaviour often lead to worse outcomes than assertive behaviour?',
    options: [
      'Because passive people are always wrong about the issues they raise',
      'Because suppressing your own needs leads to resentment, exploitation, and eventually explosive outbursts that damage relationships more than honest assertiveness would have',
      'Because passive people talk too much and waste time',
      'Because passivity is respected in the construction industry and assertiveness is not',
    ],
    correctAnswer: 1,
    explanation:
      "Passive behaviour — consistently putting others' needs above your own, avoiding conflict, and suppressing your real opinions — leads to several negative outcomes. First, resentment builds over time because your needs are chronically unmet. Second, others learn that your boundaries are soft, which can lead to exploitation (being given the worst tasks, not being paid fairly, having your work disrespected). Third, the suppressed frustration eventually erupts in an disproportionate outburst that damages the very relationships you were trying to protect. Assertiveness, by contrast, addresses issues early and honestly, preventing the accumulation of resentment.",
  },
  {
    id: 4,
    question: 'Who developed the Positive No concept?',
    options: ['Marshall Rosenberg', 'Stephen Covey', 'William Ury', 'Kerry Patterson'],
    correctAnswer: 2,
    explanation:
      'William Ury, co-author of "Getting to Yes" (1981) and author of "The Power of a Positive No" (2007), developed the Yes-No-Yes framework for saying no without damaging relationships. Ury argued that most people either say yes when they want to say no (accommodating, which breeds resentment) or say no in a way that damages the relationship (rejecting, which breeds hostility). The Positive No offers a third path: affirm your interest, state your boundary, and propose an alternative.',
  },
  {
    id: 5,
    question:
      'A client asks you to do additional work for free. Using the Positive No, which response is correct?',
    options: [
      '"No, absolutely not. That\'s taking the mick."',
      '"Well... I suppose I could squeeze it in."',
      '"I value our working relationship and I want to continue delivering quality work for you. However, this additional work falls outside the original scope and I\'m not able to include it for free. What I can do is provide a costed option for the extra work so you can decide whether to proceed."',
      '"I\'ll think about it" (with no intention of following up)',
    ],
    correctAnswer: 2,
    explanation:
      'The third option demonstrates a complete Positive No. The first Yes affirms the interest ("I value our working relationship and want to continue delivering quality work"). The No states a clear boundary ("This falls outside scope and I\'m not able to include it for free"). The second Yes offers an alternative ("I can provide a costed option so you can decide"). The first option is aggressive (attacking), the second is passive (accommodating against your own interests), and the fourth is passive-aggressive (avoiding rather than addressing). The Positive No is the only response that protects both the relationship and your boundary.',
  },
  {
    id: 6,
    question: 'What is the "broken record" technique?',
    options: [
      'Playing annoying music until the other person gives in',
      "Calmly and respectfully repeating your core message or position without being drawn into side arguments, while acknowledging the other person's points",
      'Refusing to listen to anything the other person says',
      'Recording conversations and playing them back as evidence',
    ],
    correctAnswer: 1,
    explanation:
      "The broken record technique involves calmly repeating your key message or boundary while acknowledging the other person's responses, without being drawn into tangential arguments or manipulative diversions. It is particularly effective when someone is trying to wear down your resolve through persistence, emotional pressure, or shifting the goalposts. The technique works because it demonstrates consistency and resolve without escalation. Each repetition should acknowledge what the other person has said (showing you are listening) while returning to your core point (showing you are firm).",
  },
  {
    id: 7,
    question: 'Which of the following is an I-statement rather than a You-statement?',
    options: [
      '"You never listen to what I say."',
      '"You always leave your mess for me to clean up."',
      '"I feel frustrated when the work area is left untidy because it slows down my progress the next morning."',
      '"You obviously don\'t care about keeping a clean site."',
    ],
    correctAnswer: 2,
    explanation:
      'The third option is a genuine I-statement: it describes the speaker\'s feeling (frustrated), identifies the specific trigger (untidy work area), and explains the impact (slows down progress). It does not make any claims about the other person\'s character, intent, or behaviour patterns. The other three options are You-statements that attack character ("never listen," "always leave your mess," "obviously don\'t care"). You-statements trigger defensiveness because they feel like an attack on who the person is, whereas I-statements invite dialogue because they describe the speaker\'s experience.',
  },
  {
    id: 8,
    question:
      'Why is aggressive communication ineffective for long-term conflict resolution, even when it produces short-term compliance?',
    options: [
      'Because aggression is illegal in all circumstances',
      'Because aggressive communication is always quiet and therefore unnoticed',
      'Because aggression may produce compliance through fear, but it destroys trust, damages relationships, breeds resentment, and often leads to passive-aggressive retaliation',
      'Because aggressive people always lose arguments',
    ],
    correctAnswer: 2,
    explanation:
      'Aggressive communication can produce short-term compliance — people may do what you demand because they want to avoid further conflict. But the long-term costs are severe: trust is destroyed (people do not feel safe sharing information with you), relationships are damaged (people avoid working with you when they have a choice), resentment accumulates (compliance becomes minimal and grudging), and passive-aggressive retaliation often follows (deliberate delays, withheld cooperation, gossip). Assertive communication achieves the same outcomes — getting your needs met — without these costs, because it earns willing cooperation rather than coerced compliance.',
  },
];

/* ------------------------------------------------------------------ */
/*  Learning outcomes                                                  */
/* ------------------------------------------------------------------ */
const outcomes = [
  'Define each point on the assertiveness spectrum: passive, passive-aggressive, assertive, and aggressive',
  'Explain why passive and passive-aggressive styles fail in professional relationships',
  'Apply the assertiveness formula to express needs clearly, directly, and respectfully',
  'Use the Positive No (Yes-No-Yes) to set boundaries without damaging relationships',
  'Distinguish between I-statements and You-statements and understand their different effects',
  'Apply the broken record technique to maintain your position under pressure without escalating',
];

/* ================================================================== */
/*  COMPONENT                                                          */
/* ================================================================== */
export default function CRModule2Section4() {
  useSEO({
    title: 'Assertiveness vs Aggression | Conflict Resolution Module 2.4',
    description:
      'The assertiveness spectrum, the Positive No, broken record technique, I-statements vs You-statements, and assertiveness in construction.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* ── Sticky Header ─────────────────────────────────────────── */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Article Body ──────────────────────────────────────────── */}
      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* ── Page Title ──────────────────────────────────────────── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-400/20 border border-rose-500/30 mb-4">
            <Scale className="h-7 w-7 text-rose-400" />
          </div>
          <div className="flex justify-center mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-xs font-semibold">
                MODULE 2 &middot; SECTION 4
              </span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Assertiveness vs Aggression
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the spectrum from passive to aggressive, and learning to occupy the
            assertive middle ground &mdash; where you express your needs without trampling on anyone
            else&rsquo;s.
          </p>
        </header>

        {/* ── Quick Summary Boxes ─────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  The spectrum runs: passive &rarr; passive-aggressive &rarr; assertive &rarr;
                  aggressive
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Assertiveness is the only style that respects both your needs and the other
                  person&rsquo;s
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  The Positive No (Yes-No-Yes) lets you set boundaries without damaging
                  relationships
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  I-statements describe your experience; You-statements trigger defensiveness
                </span>
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Passive electricians get exploited; aggressive ones burn relationships and lose
                  repeat work
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Construction culture often rewards aggression in the short term but punishes it in
                  the long term
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  Assertiveness is a learnable skill, not a personality trait &mdash; anyone can
                  develop it
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                <span>
                  The techniques in this section are immediately applicable to pricing
                  conversations, scope disputes, and boundary-setting
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Learning Outcomes ────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {outcomes.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ============================================================ */}
        {/*  SECTION 01 — The Assertiveness Spectrum                     */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">01</span>
            </div>
            <h2 className="text-xl font-semibold text-white">The Assertiveness Spectrum</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Communication styles in conflict exist on a spectrum with four key positions: passive,
              passive-aggressive, assertive, and aggressive. Most people have a default position
              that they revert to under pressure, and many people swing between extremes &mdash;
              being passive until the resentment builds to a breaking point, then erupting into
              aggression. Understanding where you sit on this spectrum, and where you tend to go
              under stress, is the first step towards developing consistent assertiveness.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">Passive</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                A passive person consistently puts others&rsquo; needs above their own. They avoid
                conflict at all costs, agree to things they do not want to do, and suppress their
                real opinions. They might think, &ldquo;It&rsquo;s not worth the hassle,&rdquo; or
                &ldquo;I&rsquo;ll just do what they want for a quiet life.&rdquo; On a construction
                site, the passive electrician does not chase late invoices, accepts unreasonable
                deadlines without pushing back, and lets other trades walk over their work without
                complaint.
              </p>
              <p className="text-white text-sm leading-relaxed">
                The consequence of passivity is not peace &mdash; it is resentment. Every time you
                suppress your own needs, a small deposit of frustration goes into an internal
                account. Over time, that account accumulates until it overflows in an outburst that
                is disproportionate to the triggering event. The client who has been politely
                accepting substandard communication for months finally snaps over a minor issue. The
                electrician who has been absorbing extra work without payment eventually refuses a
                reasonable request in a way that confuses everyone. The explosion damages the
                relationship far more than honest assertiveness would have.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">Passive-Aggressive</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                A passive-aggressive person avoids direct confrontation but expresses their
                hostility or dissatisfaction through indirect means: sarcasm, the silent treatment,
                deliberate delays, &ldquo;forgetting&rdquo; commitments, backhanded compliments, or
                subtle sabotage. The hallmark of passive-aggression is deniability &mdash; the
                person can always claim they did not mean anything by it.
              </p>
              <p className="text-white text-sm leading-relaxed">
                On construction sites, passive-aggressive behaviour is remarkably common. It might
                look like: a tradesperson who agrees to coordinate but consistently
                &ldquo;forgets&rdquo; to leave access for the electrician; a site manager who says
                &ldquo;Fine, do it your way&rdquo; in a tone that clearly communicates disapproval;
                or a colleague who makes sarcastic comments about your work in front of others but
                claims they were &ldquo;only joking&rdquo; when challenged. Passive-aggression is
                corrosive because it poisons working relationships without ever giving anyone a
                clear issue to address.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <ThumbsUp className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">Assertive</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                An assertive person expresses their needs, feelings, and opinions clearly, directly,
                and respectfully. They stand up for their own rights without violating the rights of
                others. They can say no without guilt, make requests without demanding, and disagree
                without attacking. Assertiveness is not about winning &mdash; it is about being
                honest and direct while maintaining respect for the other person.
              </p>
              <p className="text-white text-sm leading-relaxed">
                On a construction site, the assertive electrician chases late invoices promptly and
                professionally, pushes back on unreasonable deadlines with clear reasons, raises
                coordination issues directly with the relevant trade, and sets boundaries on scope
                creep without apologising for having boundaries. They are respected because people
                know where they stand, and they are trusted because they are honest rather than
                compliant.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">Aggressive</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                An aggressive person expresses their needs at the expense of others. They dominate
                conversations, use intimidation (raised voice, physical posturing, threats), make
                personal attacks, and show contempt for those they perceive as weaker. The
                aggressive person&rsquo;s goal is to win, not to resolve &mdash; and they define
                winning as the other person losing.
              </p>
              <p className="text-white text-sm leading-relaxed">
                On construction sites, aggression often masquerades as &ldquo;strong
                management&rdquo; or &ldquo;not taking any rubbish.&rdquo; But aggressive
                communication, while it may produce short-term compliance through fear, destroys
                trust and damages relationships over time. People stop sharing information with
                aggressive colleagues (because it gets used as a weapon), they do the minimum
                required (because effort is never appreciated), and they leave the working
                relationship as soon as a better option appears. Aggression is the most expensive
                communication style in the long run.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 02 — Why Passive and Passive-Aggressive Fail        */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">02</span>
            </div>
            <h2 className="text-xl font-semibold text-white">
              Why Passive and Passive-Aggressive Fail
            </h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Many people default to passivity because they believe it keeps the peace. In the
              construction industry, where relationships and repeat work are essential, the fear of
              upsetting a client or a main contractor can be paralysing. But passivity does not keep
              the peace &mdash; it merely delays and amplifies the conflict. The issues that are not
              addressed assertively in week one become the crises that explode in month three.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                The Hidden Costs of Passivity
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                <strong>Resentment accumulates.</strong> Every time you say yes when you mean no,
                every time you accept unfair treatment without comment, a little more resentment is
                stored. This resentment leaks out in subtle ways &mdash; lower quality work, less
                willingness to go the extra mile, reduced enthusiasm &mdash; and eventually erupts
                in an outburst that seems disproportionate to the immediate trigger but is actually
                the release of months of accumulated frustration.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                <strong>Others learn your boundaries are soft.</strong> When you consistently fail
                to enforce your boundaries, people &mdash; often unconsciously &mdash; push them
                further. The client who asked for one small favour for free asks for another, then
                another. The main contractor who delayed payment by a week delays by two, then
                three. Not because they are deliberately exploiting you, but because your passivity
                has communicated that these boundary violations are acceptable.
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong>Your own wellbeing suffers.</strong> Research consistently shows that people
                who suppress their needs and avoid conflict experience higher levels of stress,
                anxiety, and burnout. The energy required to suppress your true feelings is
                significant, and it drains the psychological resources you need for your actual
                work.
              </p>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-2">
                Why Passive-Aggression Is Especially Destructive
              </p>
              <p className="text-white text-sm leading-relaxed">
                Passive-aggressive behaviour is arguably worse than either pure passivity or open
                aggression, because it combines the relationship damage of aggression with the
                deniability that makes it nearly impossible to address directly. When someone is
                openly aggressive, at least the conflict is visible and can be confronted. When
                someone is passive-aggressive, they create a fog of hostility that erodes team
                cohesion without ever providing a clear target. Sarcasm, the silent treatment,
                deliberate delays, and backhanded compliments are all forms of aggression that hide
                behind a veneer of innocence. On construction sites, where coordination between
                trades is essential, passive-aggressive behaviour can cause real project-level
                damage while the perpetrator maintains plausible deniability.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 1 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ============================================================ */}
        {/*  SECTION 03 — The Assertive Sweet Spot                       */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">03</span>
            </div>
            <h2 className="text-xl font-semibold text-white">The Assertive Sweet Spot</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Assertiveness sits between passivity and aggression, and it is the only communication
              style that respects both your own needs and the other person&rsquo;s. An assertive
              person does not suppress their feelings (passive), express them indirectly
              (passive-aggressive), or express them at the other person&rsquo;s expense
              (aggressive). They express their feelings, needs, and boundaries directly, honestly,
              and respectfully. This is harder than any of the alternatives &mdash; which is why
              assertiveness is a skill that requires practice, not a personality trait you either
              have or you do not.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">The Assertiveness Formula</p>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white text-base font-medium mb-3">
                  &ldquo;When [situation], I feel [feeling], because [reason]. I would like
                  [request].&rdquo;
                </p>
                <div className="space-y-2">
                  <p className="text-white text-sm leading-relaxed">
                    <strong>When [situation]:</strong> Describe the specific, observable trigger
                    without generalisation or judgement. &ldquo;When invoices are paid more than 30
                    days after the due date...&rdquo;
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    <strong>I feel [feeling]:</strong> Name your genuine emotional response.
                    &ldquo;...I feel anxious...&rdquo;
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    <strong>Because [reason]:</strong> Explain why this matters to you.
                    &ldquo;...because I need reliable cash flow to cover my material costs and pay
                    my team.&rdquo;
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    <strong>I would like [request]:</strong> Make a specific, actionable request.
                    &ldquo;I would like us to agree on 14-day payment terms going forward.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">
                The Same Message in Four Styles
              </h3>
              <p className="text-white text-sm leading-relaxed mb-3">
                To illustrate the difference between the four communication styles, consider the
                same situation expressed in each:
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Passive:</p>
                  <p className="text-white text-xs leading-relaxed italic">
                    &ldquo;Don&rsquo;t worry about the invoice... whenever you get round to it is
                    fine.&rdquo; (Suppresses the real need, communicates that late payment is
                    acceptable.)
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Passive-aggressive:</p>
                  <p className="text-white text-xs leading-relaxed italic">
                    &ldquo;No rush on the payment &mdash; it&rsquo;s not like I have bills to pay or
                    anything.&rdquo; (Expresses frustration through sarcasm while denying any
                    genuine grievance.)
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Assertive:</p>
                  <p className="text-white text-xs leading-relaxed italic">
                    &ldquo;When invoices are paid more than 30 days late, I feel anxious because I
                    need reliable cash flow to cover my costs. I&rsquo;d like us to agree on 14-day
                    payment terms.&rdquo; (Direct, honest, respectful.)
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">Aggressive:</p>
                  <p className="text-white text-xs leading-relaxed italic">
                    &ldquo;You owe me money and I&rsquo;m sick of chasing you. Pay up by Friday or
                    I&rsquo;m walking off the job.&rdquo; (Threatens, attacks, demands.)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Inline Check 2 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ============================================================ */}
        {/*  SECTION 04 — The Positive No                                */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">04</span>
            </div>
            <h2 className="text-xl font-semibold text-white">The Positive No</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              William Ury, co-author of <em>Getting to Yes</em> (1981) and author of{' '}
              <em>The Power of a Positive No</em> (2007), identified one of the most common dilemmas
              in professional life: how to say no without damaging the relationship. Most people
              either accommodate (say yes when they want to say no, to preserve the relationship) or
              attack (say no in a way that damages the relationship). Ury proposed a third option:
              the Positive No.
            </p>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-3">
                The Positive No: Yes &mdash; No &mdash; Yes
              </p>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">
                    First Yes &mdash; Affirm Your Interest
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    Start by affirming the underlying interest or value that is driving your no.
                    This is not a yes to the request &mdash; it is a yes to the relationship, the
                    principle, or the goal. &ldquo;I value the working relationship we have, and I
                    want to continue delivering quality work for you.&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">
                    No &mdash; State Your Boundary
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    State your no clearly and without apology. &ldquo;However, this additional work
                    falls outside the agreed scope, and I am not able to include it for free.&rdquo;
                    The no should be firm but not hostile. You are stating a boundary, not making an
                    attack.
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white text-sm font-medium mb-1">
                    Second Yes &mdash; Offer an Alternative
                  </p>
                  <p className="text-white text-xs leading-relaxed">
                    End with a constructive alternative that respects both your boundary and the
                    other person&rsquo;s need. &ldquo;What I can do is provide a costed option for
                    the additional work so you can decide whether to go ahead.&rdquo; This shows
                    that you are not simply rejecting them &mdash; you are looking for a way forward
                    that works for both of you.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">
                  Construction Example: Client Asking for Free Additional Work
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                A homeowner on a domestic rewire says: &ldquo;While you&rsquo;re here, could you
                also run a new circuit to the garden shed? It shouldn&rsquo;t take long.&rdquo;
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                <strong>Passive response:</strong> &ldquo;Er... I suppose I could fit it in.&rdquo;
                (You do the work for free, resent it, and your profit margin shrinks.)
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                <strong>Aggressive response:</strong> &ldquo;No chance &mdash; that&rsquo;s not in
                the quote and I&rsquo;m not doing it for nothing.&rdquo; (You protect your margin
                but damage the relationship.)
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong>Positive No:</strong> &ldquo;I appreciate you thinking of that while
                we&rsquo;re here &mdash; it makes sense to do it at the same time (first Yes). A
                garden circuit is a separate piece of work with its own materials and labour costs,
                so I wouldn&rsquo;t be able to include it in the current price (No). What I can do
                is measure up and give you a quick quote for it today, and if you want to go ahead,
                we can fit it in before we finish (second Yes).&rdquo; This response protects your
                commercial boundary while maintaining the relationship and offering a constructive
                path forward.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SECTION 05 — I-Statements and the Broken Record             */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">05</span>
            </div>
            <h2 className="text-xl font-semibold text-white">I-Statements and the Broken Record</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <p className="text-white text-base leading-relaxed">
              Two practical techniques underpin everyday assertiveness: I-statements and the broken
              record. Both are simple in concept but transformative in practice. They give you
              concrete tools for expressing your position clearly and maintaining it under pressure,
              without escalating into aggression.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">I-Statements vs You-Statements</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                An <strong>I-statement</strong> describes your own experience: &ldquo;I need the
                payment by Friday.&rdquo; &ldquo;I feel frustrated when materials are not available
                on site.&rdquo; &ldquo;I am concerned about the timeline.&rdquo; I-statements are
                assertive because they express your needs honestly without making claims about the
                other person&rsquo;s character, intent, or behaviour.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                A <strong>You-statement</strong> makes claims about the other person: &ldquo;You
                always pay late.&rdquo; &ldquo;You never organise the materials properly.&rdquo;
                &ldquo;You don&rsquo;t care about deadlines.&rdquo; You-statements are perceived as
                attacks because they label the other person&rsquo;s character or behaviour pattern.
                The natural response to a You-statement is defensiveness: &ldquo;That is not
                true!&rdquo; &mdash; and now you are arguing about the accuracy of the label rather
                than addressing the actual issue.
              </p>
              <p className="text-white text-sm leading-relaxed">
                The shift from You to I is not just grammatical &mdash; it changes the entire
                dynamic of the conversation. I-statements invite dialogue (&ldquo;Tell me more about
                why you need payment by Friday&rdquo;). You-statements provoke defence (&ldquo;I do
                NOT always pay late!&rdquo;). When you describe your own experience, the other
                person cannot argue with it &mdash; it is your experience. When you make claims
                about their character, they will argue, because you are telling them who they are.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Repeat className="h-5 w-5 text-rose-400" />
                <h3 className="text-base font-medium text-white">The Broken Record Technique</h3>
              </div>
              <p className="text-white text-sm leading-relaxed mb-3">
                The broken record technique is a method of maintaining your position calmly and
                consistently under pressure. It involves repeating your key message or boundary
                while acknowledging the other person&rsquo;s points, without being drawn into side
                arguments, emotional manipulation, or shifting goalposts.
              </p>
              <p className="text-white text-sm leading-relaxed mb-3">
                The technique is especially useful when someone is trying to wear down your resolve
                through persistence, emotional pressure, or by introducing tangential issues. Each
                time you repeat your message, you vary the acknowledgement (showing you are
                listening) while keeping the core position consistent (showing you are firm).
              </p>
              <p className="text-white text-sm leading-relaxed">
                <strong>Example:</strong> A main contractor is pushing you to start work before
                first fix is ready. <em>First time:</em> &ldquo;I understand the pressure
                you&rsquo;re under, and I need the first fix to be completed before I can start
                safely.&rdquo; <em>Second time:</em> &ldquo;I hear that the client is pushing for an
                earlier start, and I still need the first fix done before I begin.&rdquo;
                <em> Third time:</em> &ldquo;I appreciate you trying to find a way forward, and my
                position has not changed &mdash; I need first fix completed before I can
                start.&rdquo; Each repetition acknowledges the other person&rsquo;s concern while
                firmly maintaining your boundary.
              </p>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <p className="text-rose-400 text-sm font-semibold mb-2">When to Use Each Technique</p>
              <p className="text-white text-sm leading-relaxed">
                I-statements work best at the start of a conversation, when you are expressing your
                concern and opening dialogue. The broken record works best during a conversation,
                when the other person is pushing back and you need to maintain your position without
                escalating. The two techniques complement each other: I-statements set the
                respectful tone, and the broken record maintains your boundary within that tone.
                Together, they allow you to be both empathetic and firm &mdash; the hallmark of true
                assertiveness.
              </p>
            </div>
          </div>
        </section>

        {/* ── Inline Check 3 ──────────────────────────────────────── */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ============================================================ */}
        {/*  SECTION 06 — Section Summary                                */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <span className="text-rose-400 text-sm font-bold">06</span>
            </div>
            <h2 className="text-xl font-semibold text-white">Section Summary</h2>
          </div>

          <div className="space-y-6 pl-4 border-l-2 border-rose-500/50">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">What We Covered</h3>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The assertiveness spectrum</strong> &mdash; passive (suppressing needs),
                    passive-aggressive (expressing needs indirectly), assertive (expressing needs
                    directly and respectfully), and aggressive (expressing needs at others&rsquo;
                    expense).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Why passivity fails</strong> &mdash; resentment accumulates, others
                    learn your boundaries are soft, and eventual outbursts damage relationships more
                    than honest assertiveness would have.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The assertiveness formula</strong> &mdash; &ldquo;When [situation], I
                    feel [feeling], because [reason]. I would like [request].&rdquo;
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The Positive No</strong> &mdash; William Ury&rsquo;s Yes-No-Yes
                    framework for setting boundaries while preserving relationships.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>I-statements vs You-statements</strong> &mdash; describing your
                    experience rather than making claims about the other person&rsquo;s character.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The broken record technique</strong> &mdash; calmly and consistently
                    repeating your position while acknowledging the other person&rsquo;s points.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-5">
              <div className="flex items-start gap-3">
                <Scale className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-rose-400 text-sm font-semibold mb-2">Key Takeaway</p>
                  <p className="text-white text-base leading-relaxed">
                    Assertiveness is not a personality trait &mdash; it is a learnable skill. Using
                    the assertiveness formula, the Positive No, I-statements, and the broken record
                    technique, you can express your needs clearly and directly without damaging
                    relationships. The goal is not to win every conversation but to be honest about
                    your needs while remaining respectful of others &mdash; and to do so
                    consistently, not just when you feel confident.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-base font-medium text-white mb-3">Practical Next Steps</h3>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>This week:</strong> identify where on the assertiveness spectrum you
                    typically sit under pressure. Are you passive? Passive-aggressive? Aggressive?
                    Notice your default without judging it.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>This fortnight:</strong> practise the assertiveness formula in one real
                    conversation. Start with a low-stakes situation to build confidence.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-rose-400/60 mt-2.5 flex-shrink-0" />
                  <span>
                    <strong>This month:</strong> prepare a Positive No for the next time a client or
                    contractor asks you to work beyond the agreed scope. Write it out in advance so
                    you have the words ready when the moment comes.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── FAQs ────────────────────────────────────────────────── */}
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

        {/* ── Quiz ────────────────────────────────────────────────── */}
        <Quiz questions={quizQuestions} />

        {/* ── Bottom Navigation ───────────────────────────────────── */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/5">
          <Button
            variant="ghost"
            asChild
            className="text-white hover:text-white hover:bg-white/5 touch-manipulation min-h-[44px]"
          >
            <Link to="../cr-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
          <Button
            asChild
            className="bg-rose-500 hover:bg-rose-500/90 text-white touch-manipulation min-h-[44px]"
          >
            <Link to="../cr-module-3">
              Next: Module 3
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
