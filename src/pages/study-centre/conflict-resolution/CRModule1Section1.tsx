import { ArrowLeft, HelpCircle, CheckCircle } from 'lucide-react';
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
    id: 'cr-1-1-check1',
    question:
      'A plumber and an electrician on a domestic refurbishment disagree about the routing of a hot water pipe that conflicts with a cable run. Neither will budge, the job stalls for a day, and the client threatens to withhold payment. Is this constructive or destructive conflict?',
    options: [
      'Constructive — the disagreement shows they both care about doing a good job',
      'Destructive — it has stalled progress, damaged the client relationship, and neither party has offered a solution',
      'Neither — it is simply a technical disagreement with no emotional component',
      'It depends entirely on who is right about the routing',
    ],
    correctIndex: 1,
    explanation:
      'This is destructive conflict because it has produced tangible negative outcomes: the job has stalled, the client is dissatisfied, and neither party has moved towards a resolution. The original disagreement about routing may have been legitimate and could have been constructive if handled differently — for example, by jointly reviewing the plans, consulting the architect, or finding an alternative route that accommodates both services. The key distinction is not whether the disagreement exists but what happens because of it. Constructive conflict leads to better solutions; destructive conflict leads to damage.',
  },
  {
    id: 'cr-1-1-check2',
    question:
      'According to ACAS research, approximately how many working days are lost to workplace conflict in the UK each year?',
    options: [
      '5 million working days',
      '12 million working days',
      '28.5 million working days',
      '50 million working days',
    ],
    correctIndex: 2,
    explanation:
      'ACAS (the Advisory, Conciliation and Arbitration Service) estimates that 28.5 million working days are lost per year due to workplace conflict in the UK. This figure encompasses time lost to sickness absence triggered by stress from unresolved conflict, reduced productivity from disengaged employees, and management time spent dealing with disputes. The CIPD further estimates that the average cost per employee affected by conflict is between £1,000 and £3,000. These are not abstract statistics — they translate directly into lost revenue, delayed projects, and damaged working relationships on construction sites.',
  },
  {
    id: 'cr-1-1-check3',
    question:
      'An electrician discovers that a client has been consistently late paying invoices. Rather than raising the issue, they decide to "just get on with it" and hope the problem resolves itself. Which of the following best describes why this approach typically fails?',
    options: [
      'Late payment is illegal, so the electrician should simply stop working immediately',
      'Avoiding the conversation allows resentment to build, the payment pattern continues, and the electrician eventually loses the client in a worse way than if they had addressed it early',
      'The electrician should add a surcharge without discussing it',
      'Conflict avoidance is always the best strategy with paying clients',
    ],
    correctIndex: 1,
    explanation:
      'Conflict avoidance with payment issues almost always makes the problem worse, not better. When the electrician avoids raising the issue, several things happen simultaneously: the client receives an implicit message that late payment is acceptable, the electrician accumulates resentment that affects the quality of the working relationship, and the financial impact compounds over time. Eventually, the electrician either loses the client explosively (after a final straw moment) or walks away feeling bitter. Had the conversation happened early — framed professionally as a discussion about payment terms — the outcome would almost certainly have been better: either the client adjusts their behaviour, or the electrician learns that this is not a client worth retaining.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'Is all conflict bad?',
    answer:
      'No. Conflict is a natural and often necessary part of working relationships. Constructive conflict — where disagreements lead to better solutions, clearer expectations, and stronger working practices — is actively beneficial. The problem is not conflict itself but unresolved, poorly managed, or escalated conflict. ACAS distinguishes between healthy disagreement (which drives improvement) and harmful conflict (which damages relationships and productivity). The goal is not to eliminate all conflict but to handle it skilfully so that it produces positive rather than negative outcomes.',
  },
  {
    question: 'Why is conflict particularly common in construction?',
    answer:
      'Construction involves multiple trades working in close physical proximity under time pressure, often with competing priorities, unclear scopes, and financial stakes. The industry has a culture that values toughness and directness, which can tip into aggression. Payment terms are frequently disputed, programmes are often unrealistic, and the power imbalance between main contractors and subcontractors creates structural tension. Additionally, many tradespeople are self-employed and lack the formal conflict resolution mechanisms (HR departments, mediation services) available in larger organisations. All of these factors make conflict more likely and harder to resolve.',
  },
  {
    question: 'What does ACAS actually do?',
    answer:
      'ACAS (Advisory, Conciliation and Arbitration Service) is a UK public body funded by the Department for Business and Trade. It provides free, impartial advice on workplace relationships and employment law. ACAS offers conciliation services for employment tribunal disputes, mediation for workplace conflicts, training on conflict management, and publishes extensive guidance on handling difficult workplace situations. Their helpline (0300 123 1100) is available to both employers and employees. For tradespeople, ACAS guidance is particularly relevant when disputes involve employment relationships, subcontractor arrangements, or discrimination.',
  },
  {
    question: 'How do I know if I am avoiding conflict or genuinely choosing not to engage?',
    answer:
      "The distinction lies in whether the decision is conscious and strategic or driven by discomfort. If you have assessed the situation, considered the potential outcomes, and deliberately decided that this particular issue is not worth pursuing — that is a strategic choice. If you are not raising the issue because you feel uncomfortable, fear the other person's reaction, or hope the problem will go away on its own — that is avoidance. A useful test: does the issue keep coming back to your mind? Do you feel resentment building? Do you find yourself complaining about the person to others instead of addressing them directly? If the answer to any of these is yes, you are likely avoiding rather than choosing.",
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question: 'According to ACAS, conflict in the workplace is best defined as:',
    options: [
      'Any situation where two people dislike each other',
      'A disagreement or clash between individuals or groups with differing needs, goals, or values',
      'A formal grievance submitted through HR',
      'Physical confrontation between colleagues',
    ],
    correctAnswer: 1,
    explanation:
      'ACAS defines conflict broadly as a disagreement or clash between individuals or groups with differing needs, goals, or values. This definition is deliberately wide — it encompasses everything from a quiet disagreement about how a task should be done to a full-blown dispute over payment. The key elements are difference (in needs, goals, or values) and tension (the disagreement creates friction). It does not require personal animosity, formal processes, or physical confrontation. Understanding this broad definition is important because it helps you recognise conflict early, before it escalates.',
  },
  {
    id: 2,
    question: 'Which of the following is the best example of constructive conflict?',
    options: [
      'Two electricians argue about the best cable route, refuse to speak to each other, and the project manager has to intervene',
      'Two electricians disagree about the best cable route, discuss the pros and cons of each option, and agree on a route that satisfies both building regulations and practical access requirements',
      'Two electricians disagree about the best cable route, and one gives in immediately to avoid an argument',
      'Two electricians disagree about the best cable route, and the site manager makes the decision without consulting either',
    ],
    correctAnswer: 1,
    explanation:
      'Option B is constructive conflict because the disagreement leads to a better outcome than either party would have reached alone. The process involves discussing pros and cons, considering multiple perspectives (regulations and practical access), and reaching a mutually acceptable solution. Option A is destructive (communication breaks down, third-party intervention required). Option C is accommodating (one party surrenders without the issue being properly explored). Option D bypasses the conflict entirely without resolution. Constructive conflict requires engagement, dialogue, and a willingness to find solutions.',
  },
  {
    id: 3,
    question: 'ACAS research estimates that UK workplace conflict costs approximately:',
    options: [
      '5 million working days and £500 per employee per year',
      '28.5 million working days per year, with an average cost of £1,000–£3,000 per affected employee',
      '100 million working days and £10,000 per employee per year',
      'There is no reliable data on the cost of workplace conflict',
    ],
    correctAnswer: 1,
    explanation:
      'ACAS estimates 28.5 million working days lost per year due to workplace conflict. The CIPD (Chartered Institute of Personnel and Development) further quantifies the cost at £1,000–£3,000 per affected employee. These costs include sickness absence, reduced productivity, management time spent on disputes, legal costs, and staff turnover. For a small electrical firm with 5 employees, even one unresolved conflict could cost £5,000–£15,000 in direct and indirect costs. These figures demonstrate why conflict resolution skills are not just "soft skills" but have a direct financial impact.',
  },
  {
    id: 4,
    question:
      'An electrician finishes a rewire and the client complains about the position of a socket outlet. The electrician knows the position was agreed in writing before work started. The most likely underlying cause of this conflict is:',
    options: [
      'The client is deliberately trying to avoid paying',
      'The electrician installed the socket in the wrong position',
      "A mismatch between the client's expectations (what they imagined) and the agreed specification (what was documented)",
      'Socket positions are never discussed before work starts',
    ],
    correctAnswer: 2,
    explanation:
      'Most client disputes about completed work stem from a gap between expectation and reality. The client may have agreed to a socket position on a drawing but visualised it differently in their mind. When they see the finished result, it does not match their mental image — even though it matches the written agreement. This is not dishonesty; it is a genuine mismatch between imagination and reality. Understanding this helps the electrician respond with empathy rather than defensiveness. The preventive measure is to use visual aids, mark positions on walls before first fix, and confirm with the client in person — not just on paper.',
  },
  {
    id: 5,
    question:
      'Which of the following best describes why many tradespeople avoid raising conflicts with clients?',
    options: [
      'Tradespeople are naturally conflict-averse personalities',
      'A combination of fear of losing the client, concern about reputation damage through reviews, the "just get on with it" trade culture, and discomfort with confrontation',
      'There is no financial incentive to resolve conflicts',
      'Clients are always right, so there is nothing to raise',
    ],
    correctAnswer: 1,
    explanation:
      'Tradespeople avoid conflict for multiple interconnected reasons. Fear of losing a client (and future referrals) is significant, especially for sole traders who rely heavily on word-of-mouth. The threat of negative online reviews adds a modern pressure that did not exist a generation ago. The construction industry culture of "just get on with it" normalises absorbing problems rather than addressing them. And many tradespeople simply have not been trained in how to have difficult conversations professionally. The irony is that avoiding conflict almost always creates worse outcomes than addressing it early and professionally.',
  },
  {
    id: 6,
    question: 'The concept of "conflict as information" means:',
    options: [
      'You should keep detailed written records of every disagreement',
      'Every conflict reveals useful data — about unmet needs, unclear expectations, misaligned values, or systemic problems — that can be used to improve working practices',
      'Information should never be shared during a conflict',
      'Conflicts only arise when people have insufficient information',
    ],
    correctAnswer: 1,
    explanation:
      'Viewing conflict as information is a fundamental shift in perspective. Instead of seeing conflict as a problem to be eliminated, you see it as a signal to be decoded. A payment dispute might reveal that your payment terms are unclear. A scope disagreement might reveal that your quotation process needs more detail. A clash with another trade might reveal that the programme is unrealistic. In each case, the conflict is telling you something useful — something you can act on to prevent similar problems in the future. This does not make the conflict pleasant, but it makes it productive.',
  },
  {
    id: 7,
    question:
      'A client asks an electrician to add three extra double sockets "while you are here" on a fixed-price job. The electrician agrees without discussing additional cost. This scenario is most likely to lead to conflict because:',
    options: [
      'Adding extra sockets is a breach of building regulations',
      'The electrician has created an unspoken expectation gap — they will feel resentful about unpaid work, while the client believes the additions were included',
      'Fixed-price contracts always lead to disputes',
      'The client was testing the electrician to see if they could be taken advantage of',
    ],
    correctAnswer: 1,
    explanation:
      'This is a classic "expectation gap" conflict that is extremely common in domestic electrical work. By agreeing without discussing cost, the electrician has created two problems: they will feel resentment about doing unpaid work (a need that was not communicated), and the client now believes that additional requests are included in the price (an expectation that was not corrected). The conflict may not surface immediately, but it will emerge — either through the electrician\'s reduced enthusiasm for the job, a future refusal that seems inconsistent, or a final invoice that includes charges the client did not expect. The solution is simple but requires confidence: acknowledge the request, explain that it is outside the original scope, and provide a cost for the additional work before proceeding.',
  },
  {
    id: 8,
    question: 'Which of the following statements about conflict in construction is FALSE?',
    options: [
      'Constructive conflict can lead to better technical solutions and clearer working practices',
      'Avoiding conflict always produces better outcomes than addressing it directly',
      'Unresolved conflict often escalates over time, becoming harder and more expensive to resolve',
      'Conflict can be caused by unclear expectations, financial pressure, or mismatched values',
    ],
    correctAnswer: 1,
    explanation:
      'The statement "avoiding conflict always produces better outcomes than addressing it directly" is false. While there are situations where choosing not to engage is a valid strategic decision (the issue is genuinely trivial, the relationship is temporary, or the timing is wrong), habitual avoidance almost always makes things worse. Unresolved issues fester, resentment accumulates, patterns of poor behaviour become entrenched, and the eventual confrontation — which usually happens at the worst possible moment — is far more intense than an early, calm conversation would have been. ACAS research consistently shows that early, informal resolution produces better outcomes than avoidance or escalation.',
  },
];

export default function CRModule1Section1() {
  useSEO({
    title: 'What Conflict Actually Is | Conflict Resolution Module 1.1',
    description:
      'Constructive vs destructive conflict, the cost of unresolved conflict, why tradespeople avoid it, and conflict as information.',
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
            <HelpCircle className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            What Conflict Actually Is
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Constructive vs destructive conflict, the cost of unresolved conflict, why tradespeople
            avoid it, and conflict as information
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Conflict</strong> is a disagreement between people with differing needs,
                goals, or values &mdash; not inherently negative
              </li>
              <li>
                <strong>Constructive conflict</strong> leads to better solutions; destructive
                conflict damages relationships
              </li>
              <li>
                <strong>28.5 million</strong> working days lost per year to conflict in the UK
                (ACAS)
              </li>
              <li>
                <strong>Key insight:</strong> Every conflict contains useful information about unmet
                needs and unclear expectations
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Financial:</strong> Unresolved conflict costs
                &pound;1,000&ndash;&pound;3,000 per affected employee (CIPD)
              </li>
              <li>
                <strong>Relationships:</strong> Poorly handled disputes destroy client trust,
                referrals, and working partnerships
              </li>
              <li>
                <strong>Wellbeing:</strong> Chronic unresolved conflict is a leading cause of work
                stress and sickness absence
              </li>
              <li>
                <strong>Reputation:</strong> One badly handled dispute can undo years of positive
                word-of-mouth
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Define conflict using the ACAS framework and explain why it is not inherently negative',
              'Distinguish between constructive conflict and destructive conflict with construction-specific examples',
              'Quantify the cost of unresolved conflict using ACAS and CIPD research data',
              'Identify the cultural and psychological reasons why tradespeople commonly avoid conflict',
              'Explain the concept of "conflict as information" and apply it to real trade scenarios',
              'Recognise the early warning signs that a disagreement is becoming destructive',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Defining Conflict */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Defining Conflict &mdash; What It Actually Means
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Conflict is one of the most misunderstood words in the English language. For many
                people &mdash; particularly those working in hands-on industries like construction
                &mdash; the word immediately conjures images of arguments, raised voices, and
                damaged relationships. But the reality is far more nuanced than that. At its core,
                conflict is simply a disagreement or clash between individuals or groups who have
                differing needs, goals, or values. It does not require shouting. It does not require
                animosity. It does not even require the other person to know you disagree.
              </p>

              <p>
                The Advisory, Conciliation and Arbitration Service (ACAS), the UK&rsquo;s leading
                authority on workplace relationships, defines workplace conflict as occurring when
                individuals or groups disagree about ideas, interests, principles, or actions. This
                definition is deliberately broad because conflict takes many forms: a quiet
                disagreement about how to route a cable, a simmering tension about who should use
                the site welfare facilities first, a financial dispute about payment terms, or a
                full-blown argument about workmanship quality. All of these are conflict, even
                though they look and feel very different.
              </p>

              <p>
                Understanding this broad definition matters because it helps you recognise conflict
                early. Many tradespeople only identify conflict when it reaches the shouting stage
                &mdash; by which point it is far harder to resolve. If you can recognise the quiet
                disagreement, the uncomfortable silence, or the evasive email as early-stage
                conflict, you have a much better chance of addressing it before it escalates. The
                skill is not in avoiding conflict altogether (which is impossible in any working
                relationship) but in catching it early and handling it well.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">ACAS Definition</p>
                <p className="text-base text-white leading-relaxed">
                  <strong>
                    &ldquo;Conflict occurs when individuals or groups disagree about ideas,
                    interests, principles, and actions. Differences of opinion or perspective are a
                    normal and healthy part of working life. However, when those differences are not
                    managed well, they can escalate into damaging conflict.&rdquo;
                  </strong>
                </p>
                <p className="text-sm text-white mt-2">
                  &mdash; ACAS, <em>Managing Conflict in the Workplace</em>
                </p>
                <p className="text-sm text-white mt-3">
                  <strong>The implication:</strong> Conflict is not the problem &mdash; poor
                  management of conflict is the problem. The same disagreement can be constructive
                  or destructive depending entirely on how the people involved choose to handle it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Constructive vs Destructive Conflict */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Constructive vs Destructive Conflict
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Not all conflict is equal. The most important distinction in conflict resolution is
                between <strong>constructive conflict</strong> and{' '}
                <strong>destructive conflict</strong>. Constructive conflict occurs when a
                disagreement leads to a better outcome &mdash; a better technical solution, a
                clearer specification, a more realistic programme, or a stronger working
                relationship. Destructive conflict occurs when a disagreement causes damage &mdash;
                to relationships, productivity, morale, finances, or reputation.
              </p>

              <p>
                Constructive conflict has several defining characteristics. The people involved
                focus on the issue rather than attacking each other personally. They listen to
                understand, not just to respond. They are willing to consider that the other person
                might have a valid point. And they aim for a solution that addresses the underlying
                problem rather than simply winning the argument. In construction, constructive
                conflict happens every day: two electricians debate the best way to achieve
                discrimination on a distribution board and arrive at a solution that is better than
                either original idea. A project manager challenges a programme that is unrealistic,
                and the revised programme reflects reality. A client questions a design choice, and
                the resulting discussion produces a better specification.
              </p>

              <p>
                Destructive conflict, by contrast, has very different characteristics. The people
                involved attack each other rather than the issue. They stop listening. They become
                entrenched in their positions. The disagreement spreads to other people who were not
                originally involved. Work quality declines as people stop cooperating. In
                construction, destructive conflict is equally common: an electrician and a plumber
                stop communicating after a routing dispute, leading to clashes during second fix. A
                subcontractor and main contractor stop cooperating over a variation dispute, and the
                project suffers. A client and an electrician fall out over a snagging list, and the
                client leaves negative reviews online.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Construction Examples: The Same Disagreement, Two Outcomes
                </p>
                <p className="text-sm text-white leading-relaxed mb-3">
                  <strong>Scenario:</strong> An electrician and a heating engineer disagree about
                  who should run their services through a floor void first.
                </p>
                <p className="text-sm text-white leading-relaxed mb-2">
                  <strong>Constructive outcome:</strong> They discuss their respective space
                  requirements, review the drawings together, and agree a sequencing plan that
                  accommodates both services with adequate clearances. Both trades complete their
                  work efficiently, and the project stays on programme.
                </p>
                <p className="text-sm text-white leading-relaxed">
                  <strong>Destructive outcome:</strong> Neither will give way. The heating engineer
                  runs their pipes first without coordination. The electrician then finds
                  insufficient space for cable trays and has to re-route at additional cost. The
                  project is delayed by two days. Both trades blame each other to the main
                  contractor. The working relationship is damaged for the remainder of the project.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Cost of Unresolved Conflict */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            The Cost of Unresolved Conflict
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Conflict that is not resolved does not simply go away &mdash; it accumulates cost.
                ACAS research estimates that <strong>28.5 million working days</strong> are lost per
                year in the UK due to workplace conflict. The CIPD (Chartered Institute of Personnel
                and Development) puts the average cost at{' '}
                <strong>&pound;1,000 to &pound;3,000 per affected employee</strong>, factoring in
                sickness absence, reduced productivity, management time, and staff turnover. A 2021
                ACAS/YouGov survey found that nearly half of all employees had experienced some form
                of conflict at work in the previous year.
              </p>

              <p>
                For the construction industry, these costs are amplified by several factors. First,
                construction work is interdependent &mdash; when one trade stops cooperating, it
                affects every other trade on the programme. A dispute between an electrician and a
                plasterer that delays second fix does not just cost those two individuals time; it
                delays the decorator, the floorer, and potentially the handover. Second,
                construction operates on tight margins, so even small delays translate into
                significant financial losses. Third, the industry relies heavily on relationships
                and reputation &mdash; a single badly handled conflict can lose a subcontractor
                their place on a contractor&rsquo;s approved list, costing them years of future
                work.
              </p>

              <p>
                For self-employed electricians, the costs are personal and immediate. A dispute with
                a client that results in non-payment for a &pound;3,000 consumer unit installation
                is not just an administrative inconvenience &mdash; it is money out of the
                electrician&rsquo;s pocket. A fall-out with a contractor that results in being
                removed from their subcontractor list means the loss of a steady income stream. A
                negative Google review from a poorly handled complaint can reduce enquiries for
                months. The financial case for developing conflict resolution skills is
                overwhelming.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  The Hidden Costs of Unresolved Conflict in Construction
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Direct financial loss:</strong> Non-payment, disputed variations,
                      rework costs, legal fees, and tribunal claims
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Productivity loss:</strong> Reduced cooperation between trades,
                      deliberate slow-working, refusal to go the extra mile
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Reputation damage:</strong> Negative online reviews, loss of
                      referrals, removal from approved contractor lists
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Health and wellbeing:</strong> Stress-related sickness absence,
                      anxiety about returning to a hostile site, burnout
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Opportunity cost:</strong> Time and energy spent on disputes is time
                      and energy not spent on productive work, business development, or training
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Why Tradespeople Avoid Conflict */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Why Tradespeople Avoid Conflict
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Despite working in an industry where disagreements are frequent and stakes are high,
                many tradespeople habitually avoid addressing conflict directly. This avoidance is
                not random &mdash; it is driven by a predictable set of fears and cultural norms
                that are deeply embedded in the construction industry. Understanding these drivers
                is the first step towards overcoming them.
              </p>

              <p>
                <strong>Fear of losing the client</strong> is the most commonly cited reason for
                avoidance, particularly among self-employed electricians. When your income depends
                entirely on client relationships and referrals, the prospect of a difficult
                conversation feels genuinely risky. What if the client takes offence and goes to
                another electrician? What if they leave a bad review? What if they tell their
                friends? These fears are understandable but largely unfounded: research consistently
                shows that clients respect professionals who raise issues early and professionally,
                and that unaddressed problems almost always cause more damage than honest
                conversations.
              </p>

              <p>
                <strong>The &ldquo;just get on with it&rdquo; culture</strong> in construction
                normalises absorbing problems rather than raising them. From apprenticeship onwards,
                tradespeople are socialised into a culture that values toughness, stoicism, and
                getting the job done without complaint. Raising a concern can be perceived as being
                difficult, weak, or a troublemaker. This cultural pressure is powerful and affects
                even experienced professionals who know, rationally, that raising the issue would
                produce a better outcome.
              </p>

              <p>
                <strong>Discomfort with confrontation</strong> is another significant factor. Many
                people simply have not been taught how to have difficult conversations
                professionally. Their only models for conflict are aggressive confrontation (which
                they want to avoid) or passive acceptance (which they default to). The idea that you
                can raise a difficult issue calmly, firmly, and respectfully &mdash; without either
                shouting or backing down &mdash; is unfamiliar. This is a skill gap, not a
                personality flaw, and it can be addressed through learning and practice.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">The Avoidance Paradox</p>
                <p className="text-base text-white leading-relaxed">
                  <strong>
                    Tradespeople avoid conflict to protect their relationships, reputation, and
                    income. But avoidance consistently produces the exact outcomes they are trying
                    to prevent: damaged relationships, reputation harm, and financial loss.
                  </strong>
                </p>
                <p className="text-sm text-white mt-3">
                  The electrician who does not raise a payment issue ends up resenting the client,
                  reducing their effort, and eventually losing the relationship anyway. The
                  subcontractor who does not challenge an unrealistic programme ends up failing to
                  deliver, damaging their reputation. The pattern is consistent: avoidance feels
                  safe in the moment but creates worse outcomes in the long run.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Conflict as Information */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Conflict as Information
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                One of the most transformative shifts in thinking about conflict is moving from
                seeing it as a problem to be eliminated to seeing it as{' '}
                <strong>information to be decoded</strong>. Every conflict, without exception,
                contains data. It tells you something about unmet needs, unclear expectations,
                misaligned values, or systemic problems in how work is being organised. If you can
                read that data, you can use it not just to resolve the immediate dispute but to
                prevent similar conflicts in the future.
              </p>

              <p>
                Consider a common construction scenario: a client complains about the position of
                light switches after the first fix is complete. On the surface, this is a dispute
                about a technical detail. But the information embedded in the conflict might
                include: the client&rsquo;s expectations were not adequately captured during the
                quotation stage (a process issue); the client did not fully understand the drawings
                they approved (a communication issue); the electrician assumed &ldquo;standard
                height&rdquo; without confirming the client&rsquo;s preference (an assumption
                issue); or the client changed their mind after seeing the work in progress (a change
                management issue). Each of these root causes points to a different preventive
                action.
              </p>

              <p>
                This approach transforms how you respond to conflict. Instead of becoming defensive
                (&ldquo;I followed the drawings, it&rsquo;s not my fault&rdquo;) or immediately
                accommodating (&ldquo;Fine, I&rsquo;ll move them all, no charge&rdquo;), you become
                curious. You ask: what is this conflict telling me? What need was not met? What
                expectation was not aligned? What could I do differently next time to prevent this?
                This curiosity does not mean you accept blame or absorb unfair costs &mdash; it
                means you extract value from every dispute, even the ones that are not your fault.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Reading the Information in Common Construction Conflicts
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Repeated payment disputes</strong> &rarr; Your payment terms are
                      unclear, or you are not setting expectations at the quotation stage
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Scope creep arguments</strong> &rarr; Your quotations do not specify
                      clearly enough what is and is not included
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Clashes with other trades</strong> &rarr; The programme is
                      unrealistic, or there is no coordination mechanism between services
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Client dissatisfaction with finished work</strong> &rarr; There is a
                      gap between what was agreed and what the client imagined, suggesting a need
                      for better visual communication during the design stage
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Construction Example: The Same Problem, Two Responses
                </p>
                <p className="text-sm text-white leading-relaxed mb-2">
                  <strong>Avoidance response:</strong> An electrician notices that a third of their
                  clients query the invoice after completion. They grumble about it to other
                  tradespeople, absorb the stress, and occasionally reduce invoices to avoid
                  confrontation. The pattern continues indefinitely.
                </p>
                <p className="text-sm text-white leading-relaxed">
                  <strong>Information response:</strong> The same electrician notices the same
                  pattern and asks: what is this telling me? They review the queries and discover
                  that most relate to additional work that was agreed verbally but not documented.
                  They update their quotation template to include a clear variation procedure, start
                  confirming additional work in writing before proceeding, and the invoice queries
                  drop to near zero within two months.
                </p>
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
                This section has established the foundational understanding of what conflict is, why
                it matters, and how to start thinking about it differently. The key points to carry
                forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Conflict is a disagreement, not a fight.</strong> ACAS defines it as a
                    clash between individuals with differing needs, goals, or values. It is a
                    natural and inevitable part of working life.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Constructive conflict improves outcomes.</strong> When handled well,
                    disagreements lead to better technical solutions, clearer expectations, and
                    stronger working relationships.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Unresolved conflict is expensive.</strong> ACAS estimates 28.5 million
                    working days lost per year. The CIPD puts the cost at
                    &pound;1,000&ndash;&pound;3,000 per affected employee.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Avoidance makes things worse.</strong> Tradespeople avoid conflict to
                    protect relationships, but avoidance consistently produces the exact outcomes
                    they fear: damaged relationships and financial loss.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Conflict is information.</strong> Every dispute reveals data about unmet
                    needs, unclear expectations, or systemic problems. Extracting that data prevents
                    future conflicts.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>The goal is not to eliminate conflict</strong> but to develop the skills
                    to handle it constructively so that it produces positive rather than negative
                    outcomes.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 2, we will explore the
                  Thomas-Kilmann Conflict Mode Instrument &mdash; a framework that identifies five
                  distinct styles of handling conflict. You will learn what your default style is,
                  when each style is appropriate, and how to choose the right approach for different
                  situations.
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
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../cr-module-1-section-2">
              Next: The Five Conflict Styles
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
