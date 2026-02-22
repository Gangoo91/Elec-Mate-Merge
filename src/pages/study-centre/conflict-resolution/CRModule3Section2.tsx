import {
  ArrowLeft,
  ArrowRight,
  Expand,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  FileText,
  MessageSquare,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'cr-3-2-check1',
    question: 'What is the single most important element of a variation order?',
    options: [
      'The original quote reference number',
      'A written description of what changed, why, the cost implication, and client confirmation',
      'A verbal agreement witnessed by a third party',
      'A photograph of the additional work required',
    ],
    correctIndex: 1,
    explanation:
      'The most important element of a variation order is a written record that includes what changed from the original scope, why the change is needed, the cost implication (additional charge or credit), and written confirmation from the client that they agree to the change and the associated cost. This protects both parties. Verbal agreements, even witnessed ones, are difficult to prove. Photographs can support a variation order but are not sufficient on their own. The written confirmation can be as simple as a text message or email reply saying "Yes, go ahead" in response to a clearly worded description of the extra work and cost.',
  },
  {
    id: 'cr-3-2-check2',
    question:
      'Under the Consumer Rights Act 2015, if no price was agreed for additional work, what is the consumer required to pay?',
    options: [
      'Nothing, because no price was agreed',
      'Whatever the tradesperson decides to charge',
      'A "reasonable price" for the work done',
      'The average market rate as determined by a trade association',
    ],
    correctIndex: 2,
    explanation:
      'Under the Consumer Rights Act 2015 (Section 51), where no price has been agreed for a service, the consumer is required to pay a "reasonable price". What constitutes reasonable is determined by what other competent tradespeople in the area would charge for the same work. This provision protects tradespeople who have done additional work in good faith, but proving what is "reasonable" is always easier when you have a written quote. This is precisely why getting written confirmation of variation costs before doing the work is so important — it removes any ambiguity about what constitutes a reasonable price.',
  },
  {
    id: 'cr-3-2-check3',
    question:
      'A client says "while you\'re here, can you just move that socket?" — what is the best response?',
    options: [
      'Do it for free to keep the client happy',
      'Refuse outright and explain it is not in the contract',
      'Acknowledge positively, explain it is outside the original scope, provide a cost, and get written confirmation',
      'Add it to the invoice at the end without discussing it with the client first',
    ],
    correctIndex: 2,
    explanation:
      'The best response is to acknowledge the request positively ("That is a great idea"), explain that it is outside the original scope of work, provide a clear cost for the additional work, and get written confirmation before proceeding. This approach is professional, transparent, and protects both parties. Doing it for free sets a precedent and devalues your time. Refusing outright damages the relationship. Adding it to the invoice without discussion creates a surprise charge that will almost certainly lead to a dispute. The key is to be helpful and willing, while also being clear that additional work has additional cost.',
  },
];

const faqs = [
  {
    question: 'How do I handle scope creep on a fixed-price contract?',
    answer:
      'Fixed-price contracts are particularly vulnerable to scope creep because the client may assume that any work "related" to the job is included in the fixed price. The solution is clarity at the quoting stage. Your quote should clearly define what is included and, just as importantly, what is excluded. For example, a consumer unit upgrade quote might state: "Includes replacement of consumer unit, reconnection of existing circuits, testing and certification. Does not include: remedial work to existing wiring, additional circuits, alterations to cable routes, or making good." When a "while you\'re here" request comes in, you can refer back to the quote and say, "That is outside the scope of the fixed price — let me price it up as an addition for you." This is not being difficult; it is being professional and transparent.',
  },
  {
    question: 'What if the client refuses to pay for a variation they verbally agreed to?',
    answer:
      'This is precisely why written confirmation is so important. If you have a text message, email, or signed variation order showing the client agreed to the additional work and cost, your position is strong. If the agreement was purely verbal, your position is weaker but not hopeless. Under the Consumer Rights Act 2015, you are entitled to a reasonable price for work done. If you can demonstrate that the additional work was requested, that you explained it would be extra, and that the client allowed you to proceed, you have a reasonable basis for the charge. Keep records of any witnesses to the verbal conversation, and follow up any verbal agreement with a confirmation text or email as soon as possible. Going forward, make it a rule: no written confirmation, no additional work.',
  },
  {
    question: 'Is it unprofessional to charge for small additional tasks?',
    answer:
      'No. In fact, giving away your time and expertise for free is unprofessional because it devalues your trade and creates unrealistic expectations. Every task, no matter how small, involves your time, your skill, your tools, your liability, and your certification responsibility. A client would not expect a solicitor to handle an extra legal query for free, or an accountant to file additional forms without charge. The key is how you communicate it. Saying "That will be an extra £40 because it was not in the original quote" sounds transactional and awkward. Saying "Happy to do that for you — it is an extra £40 because it is outside the original scope, but it makes sense to do it while I am here" sounds helpful, professional, and reasonable. It is the same information delivered with a different tone.',
  },
  {
    question: 'How do I price a variation on the spot when the client is standing right there?',
    answer:
      'This is one of the most common challenges electricians face with scope creep. The client asks for something extra while you are on site, and they expect an immediate answer. If you know the price, give it: "That would be an additional £X for the materials and labour." If you are not sure, it is perfectly acceptable to say, "I will need to have a look at what is involved and get back to you with a price — I do not want to guess and get it wrong." This buys you time to calculate properly. Never guess a price under pressure, because underquoting means you absorb the cost, and overquoting means the client feels overcharged. A quick text or email later that day with a firm price is far better than a wrong price given on the spot.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is scope creep?',
    options: [
      'A deliberate strategy by clients to get free work',
      'The gradual expansion of work beyond the original agreement, often through small incremental requests',
      'A contractual term that allows the client to add work at no extra cost',
      'The process of a project taking longer than the estimated timeline',
    ],
    correctAnswer: 1,
    explanation:
      'Scope creep is the gradual expansion of work beyond the original agreement, typically through small, individually trivial requests that collectively amount to significant additional unpaid labour. It is usually not a deliberate strategy — it happens because of unclear original scope, genuine misunderstandings, or the "while you\'re here" syndrome where clients assume that small extras are included. Recognising scope creep as it happens is the first step to managing it effectively.',
  },
  {
    id: 2,
    question: 'Which of the following is NOT a common reason why scope creep happens?',
    options: [
      'Unclear original scope of work',
      'Verbal agreements instead of written ones',
      'The tradesperson deliberately over-quoting to absorb extras',
      "The tradesperson's desire to please the client and avoid confrontation",
    ],
    correctAnswer: 2,
    explanation:
      "Deliberately over-quoting to absorb extras is not a common cause of scope creep — in fact, most tradespeople under-quote if anything. The common causes of scope creep include unclear original scope, verbal agreements that are open to interpretation, the tradesperson's desire to please the client and maintain a good relationship, fear of confrontation or appearing difficult, and genuine misunderstandings about what was included. All of these can be addressed through clear written scope, written variation orders, and confident communication about additional costs.",
  },
  {
    id: 3,
    question: 'What are the four steps of the variation conversation framework?',
    options: [
      'Refuse, explain, negotiate, compromise',
      'Acknowledge positively, explain outside scope, provide cost, get written confirmation',
      'Accept the request, do the work, add it to the invoice, hope the client pays',
      'Escalate to a manager, document the request, seek legal advice, send a formal letter',
    ],
    correctAnswer: 1,
    explanation:
      "The four steps are: (1) Acknowledge positively — validate the client's request and show willingness; (2) Explain outside scope — clearly state that the request falls outside the original agreement; (3) Provide cost — give a clear price for the additional work; (4) Get written confirmation — secure agreement in writing before proceeding. This framework works because it maintains the relationship (the client feels heard and respected) while protecting your interests (the additional cost is agreed before work begins).",
  },
  {
    id: 4,
    question: 'Under the Consumer Rights Act 2015, what standard must services be provided to?',
    options: [
      'The highest standard available in the industry',
      'The standard specified in the contract and no higher',
      'Reasonable care and skill',
      'Whatever standard the consumer considers acceptable',
    ],
    correctAnswer: 2,
    explanation:
      'Under the Consumer Rights Act 2015 (Section 49), services must be provided with "reasonable care and skill". This is an objective standard — it means the level of care and skill that a reasonably competent tradesperson in that field would apply. It does not mean perfection, nor does it mean the absolute best in the industry. It means competent, professional workmanship. For electricians, this standard also intersects with the requirements of BS 7671 (the IET Wiring Regulations), meaning that work must at minimum comply with the relevant regulations and standards.',
  },
  {
    id: 5,
    question: 'What is the "sunk cost trap" in the context of scope creep?',
    options: [
      'The cost of materials that have already been installed and cannot be returned',
      'The tendency to continue doing unpaid extra work because you have already started, rather than stopping and having the cost conversation',
      'The tax deduction available for materials wasted during a job',
      'The penalty clause in a contract for work not completed',
    ],
    correctAnswer: 1,
    explanation:
      'The sunk cost trap in scope creep context is the tendency to keep doing unpaid extra work because you have already started, rather than stopping and having the cost conversation. The reasoning goes: "I have already spent 30 minutes on this extra, so I might as well finish it." But this logic is flawed, because the time already spent is gone regardless — the relevant question is whether you should invest more unpaid time going forward. The solution is to pause as soon as you realise the work is outside scope, have the conversation, and get agreement before continuing.',
  },
  {
    id: 6,
    question: 'Which phrase best handles a "while you\'re here" request?',
    options: [
      '"That is not in my contract, so I cannot do it."',
      '"That is a great idea — let me price that up for you as an extra."',
      '"I suppose I could do it, but it will take longer."',
      '"You will have to book another visit for that."',
    ],
    correctAnswer: 1,
    explanation:
      'The phrase "That is a great idea — let me price that up for you as an extra" is the most effective because it does three things simultaneously: it validates the client\'s request (making them feel heard), it signals that the work is additional (outside the original scope), and it transitions naturally into a cost conversation. The other options are either too blunt (damaging the relationship), too vague (leaving the cost ambiguous), or unnecessarily inconvenient (requiring a separate visit when the work could be done now at an agreed price).',
  },
  {
    id: 7,
    question:
      'A client verbally agreed to a £300 variation but now refuses to pay, claiming they never agreed. You have no written confirmation. What is your legal position?',
    options: [
      'You have no legal standing whatsoever without written proof',
      'You can claim a reasonable price under the Consumer Rights Act 2015, but proving the agreement is more difficult without written evidence',
      'Verbal contracts are automatically void under UK law',
      'The client must pay because all verbal agreements are legally binding and enforceable',
    ],
    correctAnswer: 1,
    explanation:
      'Without written confirmation, your position is weaker but not hopeless. Verbal contracts are legally binding in the UK (they are not automatically void), but they are significantly harder to prove. Under the Consumer Rights Act 2015, you are entitled to a reasonable price for work done. If you can demonstrate that the work was requested, that you communicated it would be extra, and that the client allowed you to proceed, you have a reasonable basis for the charge. However, this situation perfectly illustrates why written confirmation is essential — it removes the "I never agreed to that" defence entirely.',
  },
  {
    id: 8,
    question:
      'An electrician quoted £2,500 for a kitchen rewire. During the job, the client makes five separate "while you\'re here" requests, each worth approximately £80-£150. The electrician does them all without discussing price or getting written confirmation. What is the most likely outcome?',
    options: [
      'The client will happily pay the additional £500+ when they see it on the invoice',
      'A dispute over the final invoice, with the client arguing the extras were included in the original price',
      'The electrician can claim the full amount under the Late Payment Act',
      'The client is legally obligated to pay because the work has been completed',
    ],
    correctAnswer: 1,
    explanation:
      'The most likely outcome is a dispute. The client will see a final invoice significantly higher than the quoted price and argue that the additional work was included. Without written variation orders, the electrician has no documentary evidence that the extras were agreed at an additional cost. This is the classic scope creep trap: five individually small requests, each seeming too minor to "make a fuss about", collectively amounting to a significant additional charge that the client was not expecting. The lesson is clear: every variation, no matter how small, needs a cost conversation and written confirmation before the work is done.',
  },
];

export default function CRModule3Section2() {
  useSEO({
    title: 'Scope Creep & Variation Conversations | Conflict Resolution Module 3.2',
    description:
      'Understanding scope creep, the "while you\'re here" syndrome, variation orders, having the cost conversation, and the Consumer Rights Act 2015.',
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
            <Link to="../cr-module-3">
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
            <Expand className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 3 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Scope Creep &amp; Variation Conversations
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Recognising the &ldquo;while you&rsquo;re here&rdquo; syndrome, using variation orders,
            having the cost conversation with confidence, and your rights under the Consumer Rights
            Act 2015
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Problem:</strong> Scope creep is the #1 source of client disputes in the
                trades
              </li>
              <li>
                <strong>Solution:</strong> Variation orders with written confirmation before extra
                work
              </li>
              <li>
                <strong>Law:</strong> Consumer Rights Act 2015 entitles you to a &ldquo;reasonable
                price&rdquo;
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Income:</strong> Unmanaged scope creep costs electricians thousands per year
              </li>
              <li>
                <strong>Relationships:</strong> Clear variation processes prevent invoice shock
                disputes
              </li>
              <li>
                <strong>Professionalism:</strong> Confident cost conversations build client trust
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Define scope creep and explain why it is the leading source of client disputes in the electrical trade',
              'Identify the five most common causes of scope creep and how to prevent each one',
              'Create a variation order that documents changes, costs, and client confirmation',
              'Apply the four-step variation conversation framework in real-time client interactions',
              'Use effective scripts and phrases for handling "while you\'re here" requests',
              'Explain the Consumer Rights Act 2015 provisions relevant to pricing disputes and reasonable charges',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Scope Creep Is */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            What Scope Creep Is
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Scope creep is the gradual, often unnoticed expansion of work beyond the original
                agreement. It is the single most common source of disputes between electricians and
                their clients, and it affects tradespeople of all experience levels. The term
                &ldquo;creep&rdquo; is deliberate &mdash; it does not usually happen in one large,
                obvious demand. It creeps in through a series of small, individually reasonable
                requests that collectively amount to hours of additional unpaid labour.
              </p>

              <p>
                The classic manifestation is the{' '}
                <strong>&ldquo;while you&rsquo;re here&rdquo; syndrome</strong>. You are midway
                through a job &mdash; perhaps installing new lighting in a kitchen &mdash; and the
                client says, &ldquo;While you&rsquo;re here, could you just move that socket?&rdquo;
                Then, &ldquo;Oh, and could you have a look at the light in the hallway?&rdquo; Then,
                &ldquo;The outside light has not been working for months &mdash; could you sort that
                while you&rsquo;re here too?&rdquo; Each request takes 15 to 45 minutes. Each seems
                too small to &ldquo;make a fuss about.&rdquo; But by the end of the day, you have
                done two to three hours of additional work for free.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Core Principle:</strong> Scope creep is not
                  usually malicious. Most clients genuinely do not understand the boundaries of what
                  they have paid for. They see an electrician in their house and naturally think of
                  other electrical issues they want addressed. The problem is not the client asking
                  &mdash; the problem is the electrician not having a confident, professional
                  process for handling the request.
                </p>
              </div>

              <p>
                The financial impact of unmanaged scope creep is significant. Consider an
                electrician who averages three &ldquo;while you&rsquo;re here&rdquo; requests per
                week, each taking 30 minutes. That is 1.5 hours of unpaid work per week, 6 hours per
                month, and approximately 72 hours per year. At a modest charge rate of £45 per hour,
                that is <strong>£3,240 per year in lost income</strong>. For many sole traders, that
                represents a significant portion of their annual profit. And this does not account
                for the additional materials, the wear on tools, or the extension to the day that
                delays the start of the next job.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">The Hidden Cost</p>
                </div>
                <p className="text-sm text-white">
                  Beyond the direct financial loss, scope creep creates a secondary problem: when
                  you eventually do try to charge for additional work (perhaps on a larger extra),
                  the client is surprised and resistant because you have established a pattern of
                  doing extras for free. They think, &ldquo;You did the other things without
                  charging &mdash; why is this one different?&rdquo; By failing to charge for small
                  extras, you inadvertently train the client to expect free extras, making it harder
                  to charge for larger ones later.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Why It Happens */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            Why It Happens
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding why scope creep happens is the first step to preventing it. There are
                five primary causes, and most scope creep incidents involve a combination of two or
                more.
              </p>

              <div className="space-y-3">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <p className="text-sm font-medium text-rose-400">Unclear Original Scope</p>
                  </div>
                  <p className="text-sm text-white">
                    If the original quote or agreement does not clearly define what is included and
                    what is excluded, both parties will have different assumptions about the
                    boundaries of the job. A quote that says &ldquo;rewire kitchen&rdquo; is open to
                    interpretation. Does that include the utility room? The pantry? The cooker
                    circuit that runs from the kitchen to the garage consumer unit? A clear,
                    detailed scope prevents these ambiguities. The more specific the quote, the less
                    room there is for scope creep. Exclusion clauses (&ldquo;Does not
                    include...&rdquo;) are as important as inclusion clauses.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <p className="text-sm font-medium text-rose-400">Verbal Agreements</p>
                  </div>
                  <p className="text-sm text-white">
                    Verbal agreements are fertile ground for scope creep because each party
                    remembers a different version of what was discussed. The electrician thinks they
                    agreed to install six downlights. The client thinks they agreed to install
                    &ldquo;the lighting&rdquo;, which in their mind includes the under-cabinet
                    lights, the pendant over the island, and the outside lights. Without a written
                    record, both genuinely believe they are right. The solution is to put everything
                    in writing, even for small jobs. A text message confirming &ldquo;To confirm: 6
                    x downlights in kitchen ceiling, £X all in&rdquo; takes 30 seconds and prevents
                    hours of dispute.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <p className="text-sm font-medium text-rose-400">Desire to Please</p>
                  </div>
                  <p className="text-sm text-white">
                    Many tradespeople are natural people-pleasers. They want the client to be happy,
                    they want a five-star review, and they want to be seen as helpful and
                    accommodating. This is a positive trait in many ways, but it becomes a liability
                    when it prevents you from having honest conversations about cost. Saying
                    &ldquo;yes&rdquo; to every request might make the client happy in the short
                    term, but it makes you resentful (because you are working for free) and
                    ultimately leads to a larger dispute when the client expects the same level of
                    free extras from every tradesperson they hire in future.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <p className="text-sm font-medium text-rose-400">Fear of Confrontation</p>
                  </div>
                  <p className="text-sm text-white">
                    Closely related to the desire to please is the fear of confrontation. Many
                    electricians would rather do 30 minutes of free work than have a 30-second
                    conversation about cost. The conversation feels awkward, especially when you are
                    standing in someone&rsquo;s kitchen and they are offering you a cup of tea. But
                    here is the reality: a 30-second professional conversation about an extra charge
                    is not a confrontation. It is a normal business interaction that the client
                    expects. It only feels confrontational because you have not practised it and do
                    not have a confident script for it. That is exactly what we will cover in the
                    next section.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      5
                    </span>
                    <p className="text-sm font-medium text-rose-400">Genuine Misunderstanding</p>
                  </div>
                  <p className="text-sm text-white">
                    Sometimes scope creep is genuinely nobody&rsquo;s fault. The client does not
                    understand electrical work well enough to know where one job ends and another
                    begins. They think that because you are &ldquo;doing the electrics,&rdquo;
                    everything electrical is included. This is not unreasonable from a lay
                    person&rsquo;s perspective &mdash; they would not know that rewiring a kitchen
                    is a completely different job from fixing a faulty outside light. This is why
                    education at the quoting stage is so important. Taking two minutes to explain
                    what the quote covers and what it does not prevents hours of confusion later.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: The Variation Order */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            The Variation Order
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A <strong>variation order</strong> is a documented change to the original scope of
                work. In large commercial construction projects, variation orders (also called
                change orders or VOs) are a standard, formal part of contract management. Every
                change to the original specification is documented, costed, and approved before the
                work is carried out. There is no reason why the same principle should not apply to
                domestic electrical work, even if the format is simpler.
              </p>

              <p>
                A variation order does not need to be a formal printed document. For a domestic
                electrician, it can be as simple as a text message or email that includes four key
                elements: what has changed from the original scope, why the change is needed, the
                cost implication (the additional charge), and the client&rsquo;s confirmation that
                they agree. A text message that says &ldquo;Hi [Name], the additional socket you
                requested in the hallway is outside the original quote. The cost for this addition
                is £X including materials. Please confirm you are happy to proceed and I will do it
                today&rdquo; followed by the client&rsquo;s reply of &ldquo;Yes, go ahead&rdquo; is
                a perfectly valid variation order.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Four-Step Variation Conversation
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Acknowledge Positively</p>
                      <p className="text-sm text-white">
                        Validate the client&rsquo;s request. Show that you are willing and helpful.
                        &ldquo;That is a great idea&rdquo; or &ldquo;That makes a lot of
                        sense&rdquo; or &ldquo;Happy to help with that.&rdquo; This sets a positive
                        tone and prevents the client from feeling rejected.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Explain Outside Scope</p>
                      <p className="text-sm text-white">
                        Clearly but gently state that the request falls outside the original
                        agreement. &ldquo;That was not included in the original quote&rdquo; or
                        &ldquo;That is outside the scope we agreed.&rdquo; This is factual, not
                        personal. You are not saying no &mdash; you are saying it is extra.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Provide Cost</p>
                      <p className="text-sm text-white">
                        Give a clear price for the additional work. &ldquo;It would be an additional
                        £X for materials and labour.&rdquo; If you need time to calculate, say so:
                        &ldquo;Let me have a look at what is involved and I will text you a price
                        this afternoon.&rdquo;
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/30 text-white text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Get Written Confirmation</p>
                      <p className="text-sm text-white">
                        Before starting the additional work, get confirmation in writing. A simple
                        text reply of &ldquo;Yes, go ahead&rdquo; is sufficient. This protects both
                        you and the client. If there is ever a dispute about whether the extra was
                        agreed, you have evidence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The entire conversation takes less than a minute. With practice, it becomes
                completely natural and does not feel awkward at all. The key mindset shift is
                understanding that you are not being difficult by having this conversation &mdash;
                you are being professional. The client would not expect their solicitor, their
                accountant, or their plumber to do extra work for free. They do not expect it from
                you either, as long as you communicate it clearly and confidently.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Scripts and Phrases That Work */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Scripts and Phrases That Work
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Having the right words ready is half the battle. Most electricians who struggle with
                scope creep do not lack the willingness to charge &mdash; they lack the words to do
                it smoothly. The following scripts have been tested by working tradespeople and work
                consistently because they are positive, professional, and direct without being
                aggressive.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Proven Phrases for Handling Extras
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">For a straightforward extra:</strong>{' '}
                      &ldquo;That is a great idea &mdash; let me price that up for you as an
                      extra.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">For a quick, priced extra:</strong>{' '}
                      &ldquo;Happy to do that &mdash; it will be an additional £X because it was not
                      in the original quote.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">When you need time to price:</strong>{' '}
                      &ldquo;Good shout &mdash; let me have a proper look at what is involved and I
                      will send you a price this afternoon. I would rather give you an accurate
                      figure than guess.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">When the request is larger:</strong>{' '}
                      &ldquo;That is definitely worth doing, but it is a separate piece of work from
                      what we agreed. Let me write up a quick quote for it and we can decide whether
                      to do it now or schedule it separately.&rdquo;
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm text-white">
                      <strong className="text-rose-400">
                        When pushing back on &ldquo;can you just&rdquo;:
                      </strong>{' '}
                      &ldquo;I know it looks like a quick job, but it actually involves [explain
                      what is needed]. It will be £X &mdash; still makes sense to do it while I am
                      here if you would like to go ahead?&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Notice that every script shares common features: they start with a positive
                acknowledgement, they explain why it is an extra, they provide or promise a price,
                and they offer a path forward. None of them use the word &ldquo;no.&rdquo; You are
                not refusing to do the work &mdash; you are agreeing to do it at a fair price. That
                is a fundamentally different conversation.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">The Sunk Cost Trap</p>
                </div>
                <p className="text-sm text-white">
                  One of the biggest mental traps in scope creep is the sunk cost fallacy. You start
                  doing a small extra without thinking about it, and by the time you realise it is
                  taking longer than expected, you think, &ldquo;Well, I have already spent 20
                  minutes on this, so I might as well finish it.&rdquo; But the 20 minutes already
                  spent are gone regardless &mdash; the relevant question is whether you should
                  spend another 20 minutes for free. The answer is almost always no. It is perfectly
                  acceptable to pause partway through, explain to the client that the task is larger
                  than you initially thought, and discuss the cost before continuing. The longer you
                  wait, the harder the conversation becomes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Consumer Rights Act 2015 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Consumer Rights Act 2015
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Consumer Rights Act 2015</strong> (CRA 2015) is the key piece of UK
                legislation governing the supply of services to consumers, and it contains several
                provisions directly relevant to scope creep and pricing disputes. Understanding
                these provisions strengthens your position when dealing with clients who dispute
                charges for additional work.
              </p>

              <p>
                <strong>Section 49</strong> of the CRA 2015 states that every contract for the
                supply of a service includes an implied term that the service will be performed with{' '}
                <strong>reasonable care and skill</strong>. This is an objective standard &mdash; it
                means the level of competence that a reasonably qualified electrician would
                demonstrate. This protects the consumer by ensuring a minimum quality standard, but
                it also protects you by establishing that the standard is &ldquo;reasonable,&rdquo;
                not perfection.
              </p>

              <p>
                <strong>Section 51</strong> is particularly relevant to scope creep. It states that
                where no price has been agreed for a service (or part of a service), the consumer
                must pay a <strong>&ldquo;reasonable price&rdquo;</strong>. This means that if you
                do additional work at a client&rsquo;s request without agreeing a specific price,
                you are entitled to charge what other competent electricians in the area would
                charge for the same work. This provision protects tradespeople who have done
                additional work in good faith, even without a formal price agreement.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Key Point:</strong> While Section 51 gives you a
                  safety net, it is always better to agree a price before doing additional work.
                  &ldquo;Reasonable price&rdquo; is subjective, and disputes about what constitutes
                  reasonable are exactly the kind of arguments that end up in court. A written
                  variation order with an agreed price removes all ambiguity. Use Section 51 as your
                  fallback, not your primary strategy.
                </p>
              </div>

              <p>
                <strong>Section 50</strong> states that anything you say or write that the consumer
                relies on when deciding to use your service becomes a term of the contract. This
                means your quote is a contractual document. If your quote says the job is £2,500 and
                includes six downlights, you cannot add an extra for seven downlights without a
                variation agreement. Equally, the client cannot claim that you verbally promised to
                include the hallway lights when your written quote clearly states &ldquo;kitchen
                only.&rdquo; This is why written quotes with clear scope definitions are so powerful
                &mdash; they become the terms of the contract.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-white">Construction Application</p>
                </div>
                <p className="text-sm text-white">
                  In practice, the CRA 2015 means that your detailed written quote is your best
                  protection against scope creep disputes. A quote that clearly states what is
                  included, what is excluded, and the price for the specified scope is a legally
                  binding document that both parties can refer to. When a client requests additional
                  work, the variation conversation is anchored to this document: &ldquo;The original
                  quote was for X. You are now asking for Y, which is additional. The cost for Y is
                  Z.&rdquo; If the client agrees (ideally in writing), you have a new contractual
                  term covering the additional work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 06: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Summary:</strong> Scope creep is the most common
                  source of client disputes in the electrical trade, but it is entirely manageable
                  with clear scope definitions, a confident variation conversation, and written
                  confirmation before additional work begins. The four-step framework &mdash;
                  acknowledge, explain, price, confirm &mdash; works in every situation and becomes
                  natural with practice.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Core Concepts to Remember</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Scope creep</strong> &mdash; gradual expansion of work beyond the
                      original agreement, typically through small incremental requests
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Prevention</strong> &mdash; clear written scope, explicit exclusions,
                      and education at the quoting stage
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Variation orders</strong> &mdash; document what changed, why, the
                      cost, and get written client confirmation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>The four-step conversation</strong> &mdash; acknowledge positively,
                      explain outside scope, provide cost, get written confirmation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Consumer Rights Act 2015</strong> &mdash; Section 49 (reasonable care
                      and skill), Section 50 (written statements become terms), Section 51
                      (reasonable price where none agreed)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>The sunk cost trap</strong> &mdash; do not keep doing unpaid work just
                      because you have already started; pause and have the conversation
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                In the next section, we will cover complaint handling and service recovery &mdash;
                including the service recovery paradox, the HEARD framework, and how to distinguish
                legitimate complaints from attempts to avoid payment.
              </p>
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
        <Quiz title="Section 2 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-3-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-3-section-3">
              Next Section
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
