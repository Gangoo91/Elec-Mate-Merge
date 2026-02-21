import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Scale,
  Lightbulb,
  HelpCircle,
  Target,
  Users,
  Shield,
  BookOpen,
  TrendingUp,
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
    question:
      'In principled negotiation, why is it important to "separate people from the problem"?',
    options: [
      'Because people are never part of the problem on construction sites',
      'Because personal emotions and relationship issues can derail productive discussions about the actual issue',
      'Because you should ignore the other person entirely and focus on your own interests',
      'Because the problem is always more important than the people involved',
    ],
    correctIndex: 1,
    explanation:
      'Separating people from the problem means addressing the substantive issue without letting personal emotions, ego, or relationship tensions interfere. On a construction site, a dispute about a variation price is a commercial problem &mdash; it is not a personal attack. When you separate the two, you can be firm on the issue while remaining respectful to the person, which preserves the working relationship and leads to better outcomes for both parties.',
  },
  {
    question: 'What is a BATNA, and why should you calculate it before entering a negotiation?',
    options: [
      'It is your opening offer, and it sets the tone for the discussion',
      'It is your Best Alternative to a Negotiated Agreement &mdash; the best outcome you can achieve if the negotiation fails',
      'It is the maximum price the other party is willing to pay',
      'It is a technique for ending negotiations quickly when they stall',
    ],
    correctIndex: 1,
    explanation:
      'BATNA stands for Best Alternative to a Negotiated Agreement, a concept developed by Fisher, Ury &amp; Patton at the Harvard Negotiation Project. It is the best outcome you can achieve if the current negotiation fails entirely. Knowing your BATNA gives you real power: if the deal on the table is worse than your BATNA, you can walk away confidently. If your BATNA is weak, you know you need to negotiate harder or improve your alternatives before the meeting.',
  },
  {
    question:
      'A client insists on using the cheapest cable manufacturer to save money (their position). What would a principled negotiator do?',
    options: [
      'Agree immediately to keep the client happy',
      'Refuse outright and insist on the more expensive option',
      'Explore the underlying interest (saving money) and propose options that meet that interest while also meeting quality and compliance requirements',
      'Escalate the disagreement to the project manager without further discussion',
    ],
    correctIndex: 2,
    explanation:
      'Principled negotiation focuses on interests, not positions. The client&rsquo;s position is "use the cheapest cable", but their interest is saving money. By understanding the real interest, you can explore options that save money in other ways &mdash; perhaps a different containment method that reduces labour, or a cable route that uses less material &mdash; while maintaining quality and compliance. This is "inventing options for mutual gain" in action.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Is principled negotiation too soft for the construction industry?',
    answer:
      'Principled negotiation is not soft &mdash; it is strategically firm. Fisher, Ury &amp; Patton specifically designed the approach to be "hard on the problem, soft on the people." You do not concede on substance; you insist on fair outcomes based on objective criteria. The difference is that you achieve firmness without aggression, which preserves working relationships. In construction, where you often work with the same subcontractors, clients, and suppliers across multiple projects, maintaining those relationships has real commercial value. Aggressive negotiators may win a single battle but lose the war when people stop wanting to work with them.',
  },
  {
    question: 'What if the other party does not negotiate in good faith?',
    answer:
      'This is where your BATNA becomes essential. If the other party is bluffing, making threats, or refusing to engage constructively, a strong BATNA gives you the confidence to walk away. You can also use "negotiation jiu-jitsu" &mdash; a technique from Getting to Yes where you redirect positional attacks back to interests. If they say "Take it or leave it," you respond with "Help me understand the reasoning behind that figure &mdash; what criteria are you using?" This forces them to justify their position with objective standards. If they cannot, their position weakens. If they still refuse to engage, your BATNA is your exit strategy.',
  },
  {
    question: 'How do I negotiate with someone who has much more power than me?',
    answer:
      'Power in negotiation comes from alternatives, not from job title or company size. A small subcontractor with a strong BATNA (plenty of other work, specialist skills in demand) is in a stronger position than a large main contractor who needs that specific subcontractor and has no alternative. Before the negotiation, invest your time in strengthening your BATNA &mdash; develop relationships with multiple clients, build specialist skills that are in demand, and maintain a pipeline of work. The stronger your alternatives, the less any single negotiation can pressure you into a bad deal.',
  },
  {
    question: 'Should I reveal my BATNA to the other party?',
    answer:
      'Generally, you should not reveal your specific BATNA unless it is strong and doing so strengthens your position. If you have a genuine alternative &mdash; say another contractor has already offered you the work at a fair rate &mdash; mentioning this can demonstrate that you are not desperate and that your price is market-tested. However, revealing a weak BATNA ("I have no other work lined up") destroys your negotiating position. The principle is: let them know you have alternatives without necessarily revealing the details. Phrases like "I have other options to consider" or "I need to weigh this against my other commitments" communicate strength without showing your hand.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions                                                     */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following is NOT one of Fisher, Ury & Patton's four principles of negotiation?",
    options: [
      'Separate people from the problem',
      'Focus on interests, not positions',
      'Always make the first offer to anchor the discussion',
      'Insist on objective criteria',
    ],
    correctAnswer: 2,
    explanation:
      'The four principles from "Getting to Yes" are: (1) Separate people from the problem, (2) Focus on interests, not positions, (3) Invent options for mutual gain, and (4) Insist on objective criteria. "Always making the first offer" is a tactical technique, not one of the four core principles of principled negotiation.',
  },
  {
    id: 2,
    question: 'What does BATNA stand for?',
    options: [
      'Best Approach to Negotiation Analysis',
      'Best Alternative to a Negotiated Agreement',
      'Basic Agreement Terms for New Arrangements',
      'Bilateral Agreement on Trade Negotiation Aspects',
    ],
    correctAnswer: 1,
    explanation:
      'BATNA stands for Best Alternative to a Negotiated Agreement. It was developed by Roger Fisher, William Ury, and Bruce Patton at the Harvard Negotiation Project. Your BATNA is the best outcome you can achieve if the current negotiation fails entirely &mdash; it is your walk-away option and the source of your real negotiating power.',
  },
  {
    id: 3,
    question:
      'A subcontractor says "I want &pound;45 per point for second fix." This is an example of:',
    options: ['An interest', 'A position', 'A BATNA', 'An objective criterion'],
    correctAnswer: 1,
    explanation:
      'A specific price demand is a position &mdash; it is what the person says they want. The interest behind it might be covering their costs, maintaining their profit margin, or reflecting the complexity of the work. Principled negotiation encourages you to look behind the position to understand the underlying interest, which opens up more creative solutions.',
  },
  {
    id: 4,
    question:
      'Which principle of negotiation involves using industry rates, published price books, or independent benchmarks?',
    options: [
      'Separate people from the problem',
      'Focus on interests, not positions',
      'Invent options for mutual gain',
      'Insist on objective criteria',
    ],
    correctAnswer: 3,
    explanation:
      "Insisting on objective criteria means basing agreements on fair, independent standards rather than pressure, power, or who shouts loudest. In construction, objective criteria include published price books (Spon's, RICS schedules), industry body rates (JIB, ECA), comparable quotes from other suppliers, and independent quantity surveyor valuations.",
  },
  {
    id: 5,
    question:
      'You are negotiating a variation price with a main contractor. Your BATNA is weak (you have no other work lined up). What should you do?',
    options: [
      'Accept whatever they offer since you have no leverage',
      'Bluff about having other work to strengthen your position',
      'Work to strengthen your BATNA before the negotiation by finding alternative work opportunities',
      'Threaten to walk off site if they do not pay your price',
    ],
    correctAnswer: 2,
    explanation:
      'A weak BATNA means you are vulnerable in the negotiation. The correct response is to invest in strengthening your BATNA before the meeting &mdash; reach out to other clients, explore other opportunities, build your pipeline. Fisher, Ury &amp; Patton emphasise that improving your BATNA is one of the most productive things you can do to prepare for a negotiation. Bluffing is risky and unethical; accepting any offer leaves money on the table; threats damage relationships.',
  },
  {
    id: 6,
    question:
      '"What if we adjusted the specification on the containment to save material costs, and used the saving to cover the additional labour on the rewire?" This is an example of:',
    options: [
      'Separating people from the problem',
      'Focusing on interests, not positions',
      'Inventing options for mutual gain',
      'Insisting on objective criteria',
    ],
    correctAnswer: 2,
    explanation:
      'This is inventing options for mutual gain &mdash; finding creative solutions that expand the pie rather than simply dividing it. By looking at the broader picture and trading across different elements of the project, both parties can get more of what they need. This is one of the most powerful techniques in principled negotiation and is especially valuable in construction where multiple cost elements can be traded against each other.',
  },
  {
    id: 7,
    question: 'Why should you never negotiate when you are angry or under extreme time pressure?',
    options: [
      'Because your BATNA automatically becomes weaker when you are emotional',
      'Because anger and pressure push you toward positional bargaining, concessions you will regret, and damaged relationships',
      'Because the other party will always know you are angry and use it against you',
      'Because principled negotiation can only be used in calm, scheduled meetings',
    ],
    correctAnswer: 1,
    explanation:
      'Anger and time pressure trigger the amygdala, overriding your rational prefrontal cortex. This pushes you toward reactive, positional behaviour &mdash; you either concede too quickly to end the discomfort, or you become aggressive and damage the relationship. Fisher, Ury &amp; Patton advise that if emotions are running high, call a break. Step away, calm down, and return to the discussion when you can think clearly.',
  },
  {
    id: 8,
    question:
      'A client wants the cheapest lighting solution possible (their position). You know their underlying interest is reducing energy costs. The best principled negotiation approach is to:',
    options: [
      'Agree to install the cheapest fittings available',
      'Refuse to install cheap fittings and insist on premium products',
      'Present options showing that mid-range LED fittings with lower running costs actually save more money over five years than the cheapest option',
      'Tell the client they are wrong about what they need',
    ],
    correctAnswer: 2,
    explanation:
      'By understanding the client&rsquo;s real interest (reducing costs), you can present options that serve that interest better than their initial position. Mid-range LED fittings with a five-year cost comparison use objective criteria (energy calculations, product data sheets) to demonstrate that the cheapest upfront option is not the cheapest overall. This is principled negotiation in action: focusing on interests, inventing options, and using objective criteria.',
  },
];

export default function CCModule5Section1() {
  useSEO({
    title: 'Principled Negotiation | CC Module 5.1',
    description:
      "Fisher, Ury & Patton's principled negotiation framework, BATNA, and construction-specific negotiation strategies for electricians and contractors.",
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
            <Link to="../cc-module-5">
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
            <Scale className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 5 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Principled Negotiation
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Fisher, Ury &amp; Patton&rsquo;s framework for reaching fair agreements without
            positional bargaining &mdash; applied to construction
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Framework:</strong> Fisher, Ury &amp; Patton&rsquo;s <em>Getting to Yes</em>{' '}
                (Harvard Negotiation Project)
              </li>
              <li>
                <strong>4 Principles:</strong> People, interests, options, criteria
              </li>
              <li>
                <strong>BATNA:</strong> Your walk-away power &mdash; the best alternative if talks
                fail
              </li>
              <li>
                <strong>Application:</strong> Price negotiations, scope changes, subcontractor rates
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Reality:</strong> Electricians negotiate daily &mdash; prices, timelines,
                scope, access
              </li>
              <li>
                <strong>Problem:</strong> Positional bargaining damages relationships and leaves
                value on the table
              </li>
              <li>
                <strong>Solution:</strong> Principled negotiation finds agreements that satisfy both
                parties&rsquo; real needs
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the four principles of principled negotiation from "Getting to Yes"',
              'Distinguish between positions and interests in a construction negotiation',
              'Calculate your BATNA before entering any negotiation',
              'Apply the "invent options for mutual gain" principle to variation pricing',
              'Use objective criteria to justify pricing and technical decisions',
              'Recognise and respond to positional bargaining tactics from the other party',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Why Negotiation Matters in Construction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            Why Negotiation Matters in Construction
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Negotiation is not something that only happens in boardrooms between directors and
                quantity surveyors. If you work in the electrical industry, you negotiate every
                single day &mdash; even if you have never thought of it in those terms. Every time
                you discuss a price with a client, agree a timeline with a main contractor, debate a
                scope change with a project manager, or work out access arrangements with another
                trade, you are negotiating.
              </p>

              <p>
                The problem is that most people in construction default to{' '}
                <strong>positional bargaining</strong> &mdash; each side takes a position, argues
                for it, and makes concessions reluctantly. The client says &ldquo;&pound;30 per
                point.&rdquo; You say &ldquo;&pound;50 per point.&rdquo; You haggle in the middle
                and settle on &pound;40, with neither party particularly satisfied. This approach
                has three fundamental problems:
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Three Problems with Positional Bargaining
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      1. It produces unwise agreements
                    </p>
                    <p className="text-sm text-white">
                      When negotiators lock into positions, they become more concerned with saving
                      face than finding the best solution. The final number is often arbitrary
                      &mdash; a compromise between two positions rather than a figure based on
                      actual costs, market rates, or project value.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">2. It is inefficient</p>
                    <p className="text-sm text-white">
                      Positional bargaining involves bluffing, posturing, and incremental
                      concessions. Each side starts extreme, edges toward the middle, and wastes
                      time that could be spent on productive work. On a construction site where time
                      is money, this inefficiency is costly.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      3. It damages relationships
                    </p>
                    <p className="text-sm text-white">
                      Positional bargaining is inherently adversarial. Each concession feels like a
                      loss. Over time, it creates resentment, erodes trust, and makes future
                      negotiations harder. In construction, where you often work with the same
                      people across multiple projects, damaged relationships have a long-term cost.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                In 1981, Roger Fisher, William Ury, and Bruce Patton of the Harvard Negotiation
                Project published <em>Getting to Yes: Negotiating Agreement Without Giving In</em>,
                which proposed a fundamentally different approach. They called it{' '}
                <strong>principled negotiation</strong> &mdash; a method that focuses on the merits
                of the issue rather than the stubbornness of the parties. It is built on four core
                principles that apply to every negotiation, from a multimillion-pound construction
                contract to agreeing subcontractor day rates.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: The Four Principles */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            The Four Principles of Principled Negotiation
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Fisher, Ury &amp; Patton&rsquo;s framework is elegantly simple: four principles that
                transform how you approach any negotiation. Each principle addresses a different
                aspect of the process, and together they create a method that is hard on the problem
                but soft on the people.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Separate People from the Problem
                    </p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Every negotiation involves two elements: the relationship between the people and
                    the substance of the issue. Problems arise when these get tangled together. A
                    disagreement about a variation price becomes a personal attack. Criticism of
                    work quality becomes an insult to professional pride.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">Construction Example</p>
                    <p className="text-xs text-white">
                      A main contractor queries your daywork charges. Instead of thinking
                      &ldquo;They don&rsquo;t trust me&rdquo; or &ldquo;They&rsquo;re trying to rip
                      me off,&rdquo; separate the relationship from the issue: the contractor has a
                      legitimate interest in understanding costs, and you have a legitimate interest
                      in being paid fairly. Address the costs objectively while maintaining a
                      respectful professional relationship.
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Focus on Interests, Not Positions
                    </p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    A position is what someone says they want. An interest is why they want it.
                    Positions are rigid and create deadlock. Interests are flexible and create
                    possibilities. Behind every position lies a deeper interest that can usually be
                    satisfied in multiple ways.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">Construction Example</p>
                    <p className="text-xs text-white">
                      A client&rsquo;s position: &ldquo;I want the cheapest consumer unit
                      available.&rdquo; Their interest: controlling budget. Your response: &ldquo;I
                      understand budget is important. The cheapest CU lacks surge protection, which
                      could cost thousands if lightning damages your equipment. This mid-range unit
                      adds &pound;80 but protects &pound;15,000 of electronics. Shall I show you the
                      comparison?&rdquo;
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Invent Options for Mutual Gain
                    </p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    Most negotiators see a fixed pie to be divided: every pound you gain is a pound
                    they lose. Principled negotiation challenges this assumption. By understanding
                    both parties&rsquo; interests, you can often find creative solutions that expand
                    the pie &mdash; giving both sides more of what they actually need.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">Construction Example</p>
                    <p className="text-xs text-white">
                      A scope change has increased your costs by &pound;3,000. The main contractor
                      says they cannot increase the variation budget. Instead of deadlocking on
                      &pound;3,000, you propose: &ldquo;What if we use a different containment
                      method that saves &pound;1,200 on materials, and you provide a labourer for
                      two days to assist with the additional cable pulls? That covers the gap
                      without increasing your budget.&rdquo;
                    </p>
                  </div>
                </div>

                <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-sm font-medium text-rose-400">
                      Insist on Objective Criteria
                    </p>
                  </div>
                  <p className="text-sm text-white mb-3">
                    When interests conflict, base the outcome on fair, independent standards rather
                    than who is more stubborn, powerful, or aggressive. Objective criteria remove
                    the battle of wills and replace it with a rational discussion about what is
                    fair.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-xs font-medium text-rose-400 mb-1">Construction Example</p>
                    <p className="text-xs text-white">
                      A client disputes your labour rate. Rather than arguing, you reference
                      objective criteria: &ldquo;The JIB National Working Rule Agreement sets the
                      qualified electrician rate at &pound;X per hour. My rate includes overheads
                      and profit as per standard industry practice. Here is the Spon&rsquo;s
                      Electrical Price Book reference for this type of work.&rdquo; Facts and
                      standards carry more weight than volume and bluster.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Insight:</strong> The four principles work
                  together as a system. Separating people from the problem creates space for
                  rational discussion. Focusing on interests rather than positions reveals what both
                  parties actually need. Inventing options creates possibilities for mutual gain.
                  And insisting on objective criteria ensures the outcome is fair and defensible.
                  Master all four and you will negotiate more effectively than people with decades
                  more experience who rely on positional bargaining.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: BATNA — Your Source of Negotiating Power */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            BATNA &mdash; Your Source of Negotiating Power
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most important concepts in <em>Getting to Yes</em> is the{' '}
                <strong>BATNA</strong> &mdash; your{' '}
                <strong>Best Alternative to a Negotiated Agreement</strong>. Developed by Fisher,
                Ury &amp; Patton at the Harvard Negotiation Project, your BATNA is the best outcome
                you can achieve if the current negotiation fails entirely. It is not your bottom
                line or your walk-away number &mdash; it is your actual best alternative.
              </p>

              <p>
                Your BATNA is the source of your real negotiating power. It determines how much
                pressure you can withstand, how firm you can be, and whether you should accept or
                reject a proposed deal. A negotiator with a strong BATNA can afford to be patient
                and principled. A negotiator with a weak BATNA is vulnerable to pressure.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    How to Calculate Your BATNA &mdash; Practical Scenario
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  <strong>Scenario:</strong> You are an electrical subcontractor negotiating a
                  second-fix price with a main contractor for a 50-flat residential block. They want
                  &pound;35 per point. You believe the work is worth &pound;45 per point. Before
                  walking into that meeting, you need to know your BATNA.
                </p>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-rose-400 mb-1">
                      Step 1: List Your Alternatives
                    </p>
                    <ul className="text-xs text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          Alternative A: Another main contractor has offered you a school project at
                          &pound;42 per point, starting in 6 weeks
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          Alternative B: You have domestic rewires in your pipeline worth
                          &pound;3,500 each, giving you &pound;7,000 over the same period
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          Alternative C: Do nothing &mdash; your team has no other work lined up and
                          you pay them regardless
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-rose-400 mb-1">
                      Step 2: Evaluate Each Alternative Realistically
                    </p>
                    <ul className="text-xs text-white space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          Alternative A is real but starts in 6 weeks &mdash; you have a gap to fill
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          Alternative B covers 3 weeks but not the full team &mdash; partial
                          coverage
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                        <span>
                          Alternative C costs you &pound;4,000 per week in wages for idle workers
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-rose-400 mb-1">
                      Step 3: Identify Your Best Alternative
                    </p>
                    <p className="text-xs text-white">
                      Your BATNA is Alternative A (the school project at &pound;42/point) combined
                      with the domestic rewires to fill the 6-week gap. This means the residential
                      block deal only makes sense if it is better than this combined alternative.
                      You now know that &pound;35/point is well below your BATNA, so you can
                      negotiate firmly. Anything above &pound;42/point is better than your BATNA
                      &mdash; but you should still push for the full value of &pound;45 using
                      objective criteria.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Strengthening Your BATNA</p>
                </div>
                <p className="text-sm text-white mb-3">
                  Fisher, Ury &amp; Patton emphasise that one of the most productive things you can
                  do before any negotiation is to <strong>improve your BATNA</strong>. In
                  construction, this means:
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Maintain a healthy pipeline:</strong> Always have multiple enquiries
                      and opportunities in play. The contractor who depends on a single client for
                      all their work has the weakest possible BATNA.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Build specialist skills:</strong> If you are the only contractor in
                      the area who can install EV charging infrastructure or data centre power
                      systems, your BATNA is always strong because demand exceeds supply.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Develop relationships with multiple clients:</strong> Diversification
                      means no single negotiation is make-or-break.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Know the market:</strong> Understanding current day rates, point
                      prices, and market demand gives you confidence that your pricing is
                      defensible.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Equally important: <strong>think about the other party&rsquo;s BATNA</strong>. If
                the main contractor has five electrical subcontractors queuing up for the work, your
                power is limited. If you are the only subcontractor available at short notice on a
                project that is already behind programme, their BATNA is weak and your leverage is
                significant. Understanding both BATNAs gives you a realistic picture of the
                negotiation landscape.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Applying the Four Principles in Construction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Applying the Four Principles in Construction
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The four principles are not abstract theory &mdash; they apply directly to the
                negotiations you face every day in the electrical industry. Here are three common
                construction negotiation scenarios and how principled negotiation transforms the
                approach.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Scenario 1: Price Negotiation with a Main Contractor
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  A main contractor wants to negotiate your price down by 15% on a commercial
                  fit-out. They say &ldquo;Your price is too high &mdash; we need you to sharpen
                  your pencil.&rdquo;
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Separate people from the problem:</strong>{' '}
                    &ldquo;I value working with you and want to find a solution. Let&rsquo;s look at
                    the numbers together rather than the headline figure.&rdquo;
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Focus on interests:</strong> Their interest is
                    meeting their budget. Your interest is covering your costs and making a fair
                    profit. These are not incompatible &mdash; but a blanket 15% cut does not
                    address either interest intelligently.
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Invent options:</strong> &ldquo;What if we use
                    a different luminaire that saves &pound;4,000 on materials? Or phase the
                    installation differently to reduce prelim costs? I can also value-engineer the
                    containment route to save labour.&rdquo;
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Objective criteria:</strong> &ldquo;My labour
                    rates are based on JIB national working rules. My material prices are live
                    wholesale quotes. Here is the breakdown &mdash; you can see where every pound
                    goes.&rdquo;
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Scenario 2: Scope Change Discussion
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  The architect has changed the lighting layout for the third time. The main
                  contractor wants you to absorb the additional work without a variation.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Separate people from the problem:</strong>{' '}
                    &ldquo;I understand design changes happen &mdash; that&rsquo;s the nature of
                    construction. Let&rsquo;s focus on the impact and how we handle it
                    fairly.&rdquo;
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Focus on interests:</strong> They want to
                    avoid cost overruns. You want to be paid for additional work. You both want the
                    project to stay on programme.
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Invent options:</strong> &ldquo;The change
                    adds 40 hours of labour and &pound;2,200 in materials. What if I absorb the
                    labour on the condition that you provide free access to the MEWP for the
                    duration, and we agree the materials as a variation?&rdquo;
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Objective criteria:</strong> &ldquo;Here is
                    the original drawing and the revised drawing. I have marked up the additional
                    points, cables, and containment. The Spon&rsquo;s rate for this type of
                    alteration work is &pound;X per point.&rdquo;
                  </p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Scenario 3: Subcontractor Rate Negotiation
                  </p>
                </div>
                <p className="text-sm text-white mb-3">
                  You are hiring a subcontract electrician and they want &pound;280 per day. Your
                  budget allows &pound;240 per day.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Separate people from the problem:</strong>{' '}
                    &ldquo;I want to work with you because your work quality is excellent.
                    Let&rsquo;s see if we can make the numbers work.&rdquo;
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Focus on interests:</strong> They want fair
                    pay for skilled work. You want quality work within budget. You both want a
                    long-term working relationship.
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Invent options:</strong> &ldquo;What if I
                    offer &pound;250 per day but guarantee you 12 weeks of continuous work? Or
                    &pound;240 per day with a &pound;500 bonus if we finish on programme? I can also
                    cover your parking and provide all power tools.&rdquo;
                  </p>
                  <p className="text-sm text-white">
                    <strong className="text-rose-400">Objective criteria:</strong> &ldquo;The
                    current JIB rate for an approved electrician is &pound;X per hour. At 8 hours,
                    that is &pound;Y per day before overheads. My offer of &pound;250 is above the
                    JIB minimum and competitive for the area.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Common Mistakes and How to Avoid Them */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Common Mistakes and How to Avoid Them
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Even when you understand the theory, certain habits and pressures can pull you back
                into positional bargaining. Here are the most common mistakes and how to guard
                against them.
              </p>

              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Mistake 1: Negotiating Without Preparation
                  </p>
                  <p className="text-sm text-white">
                    Walking into a negotiation without calculating your BATNA, understanding the
                    other party&rsquo;s interests, or preparing objective criteria is the single
                    most common failure. Preparation is where 80% of negotiation success happens.
                    Spend at least as much time preparing for the meeting as you expect the meeting
                    to last. Know your numbers, know your alternatives, and know what the other side
                    likely needs.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Mistake 2: Negotiating Under Emotional Pressure
                  </p>
                  <p className="text-sm text-white">
                    Anger, frustration, and desperation are the enemies of principled negotiation.
                    If you are emotionally charged, you will revert to positional behaviour &mdash;
                    either caving in to end the discomfort or becoming aggressive and damaging the
                    relationship. If emotions are running high, Fisher, Ury &amp; Patton advise
                    calling a break: &ldquo;I want to give this the thought it deserves &mdash; can
                    we pick this up tomorrow morning?&rdquo;
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Mistake 3: Accepting a Deal Worse Than Your BATNA
                  </p>
                  <p className="text-sm text-white">
                    No deal is better than a bad deal. If the terms on the table are worse than your
                    best alternative, walk away. This requires discipline &mdash; the sunk-cost
                    fallacy (&ldquo;We&rsquo;ve already spent so much time on this&rdquo;) and
                    social pressure (&ldquo;Everyone else has agreed&rdquo;) can push you toward
                    accepting unfavourable terms. Always test any proposed agreement against your
                    BATNA before saying yes.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">
                    Mistake 4: Treating Negotiation as a One-Off Event
                  </p>
                  <p className="text-sm text-white">
                    In construction, you will work with the same clients, contractors, and
                    subcontractors repeatedly. Every negotiation is part of an ongoing relationship.
                    A &ldquo;win&rdquo; that damages trust will cost you far more in the long run
                    than a fair deal that both parties feel good about. Principled negotiation
                    builds reputations: you become known as someone who is firm, fair, and creative
                    &mdash; which makes future negotiations easier.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Key Takeaways */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Key Takeaways
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Principled negotiation is one of the most valuable professional skills you can
                develop. It applies to every negotiation you will ever have &mdash; from agreeing
                subcontractor rates to negotiating variation prices, from discussing scope changes
                to resolving disputes. The four principles from Fisher, Ury &amp; Patton&rsquo;s{' '}
                <em>Getting to Yes</em> provide a framework that is both intellectually rigorous and
                practically powerful.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Takeaways</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Separate people from the problem:</strong> Address the issue without
                      making it personal. Be firm on substance, respectful to the person.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Focus on interests, not positions:</strong> Ask &ldquo;why?&rdquo;
                      behind every demand. Positions create deadlock; interests create
                      possibilities.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Invent options for mutual gain:</strong> Look for creative trades,
                      value engineering, and solutions that expand the pie rather than simply
                      dividing it.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Insist on objective criteria:</strong> Use JIB rates, Spon&rsquo;s
                      Price Book, comparable quotes, and independent benchmarks to anchor
                      discussions in fact.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Know your BATNA:</strong> Calculate your best alternative before every
                      negotiation. Never accept a deal worse than your BATNA. Invest in
                      strengthening your alternatives.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                In the next section, we will explore assertive communication and the DESC model
                &mdash; the tools that allow you to express your negotiating position clearly,
                directly, and professionally, even when the conversation becomes difficult.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <div className="flex items-start gap-2 mb-1">
                  <HelpCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <h3 className="text-sm font-medium text-white">{faq.question}</h3>
                </div>
                <p className="text-sm text-white leading-relaxed pl-6">{faq.answer}</p>
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
            <Link to="../cc-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cc-module-5-section-2">
              Assertive Communication &amp; The DESC Model
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
