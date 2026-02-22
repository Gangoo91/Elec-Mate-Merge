import { ArrowLeft, AlertTriangle, CheckCircle } from 'lucide-react';
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
    id: 'cr-1-3-check1',
    question:
      'An electrician completes a consumer unit change for a domestic client. The agreed price was £1,800. The client pays £1,200 and says "that is what I think the job is worth." Under the Late Payment of Commercial Debts (Interest) Act 1998, which of the following is TRUE?',
    options: [
      'The Act only applies to commercial contracts between businesses, not domestic clients',
      'The electrician can charge statutory interest on the outstanding £600 at 8% above the Bank of England base rate',
      'The Act requires the electrician to go to court before any interest can be charged',
      'The client can decide what a job is worth after it is completed',
    ],
    correctIndex: 0,
    explanation:
      "The Late Payment of Commercial Debts (Interest) Act 1998 specifically applies to commercial contracts — transactions between businesses or between a business and a public authority. It does not apply to contracts with domestic consumers. For domestic clients, the electrician's recourse for non-payment is through the County Court (small claims track for amounts under £10,000) or through the Consumer Rights Act 2015 if the dispute is about service quality. However, if the electrician was working as a subcontractor to another business (such as a building company), the Act would apply and they could charge statutory interest at 8% above the Bank of England base rate on the outstanding amount.",
  },
  {
    id: 'cr-1-3-check2',
    question:
      'A client asks an electrician to add four additional light points during a kitchen rewire, saying "while you are here, it won\'t take long." The electrician\'s original quote did not include these points. What is the most likely outcome if the electrician agrees without discussing additional cost?',
    options: [
      'The client will appreciate the extra work and pay more without being asked',
      'The electrician will complete the work faster because they are already on site',
      'An expectation gap will develop — the electrician will expect additional payment, the client will expect it to be included, and conflict will arise at invoicing stage',
      'The additional work will have no financial impact because the materials cost is minimal',
    ],
    correctIndex: 2,
    explanation:
      'This is one of the most predictable and preventable conflict triggers in domestic electrical work. When additional work is agreed without a clear cost discussion, both parties leave the conversation with different assumptions. The electrician assumes the client understands that extra work means extra cost. The client assumes that because the electrician agreed without mentioning cost, it must be included. This expectation gap remains invisible until the invoice arrives — at which point both parties feel wronged. The electrician feels the client is trying to avoid paying for additional work. The client feels the electrician is adding unexpected charges. The preventive action is simple: acknowledge the request, explain that it is outside the original scope, provide a cost before proceeding, and confirm the agreement in writing (even a text message is sufficient).',
  },
  {
    id: 'cr-1-3-check3',
    question:
      'An electrician arrives on a commercial site to begin second fix but discovers that the plasterer has not finished and the walls are still wet. The site manager says "just work around it." This is an example of which conflict trigger?',
    options: [
      'Money dispute — the electrician is not being paid enough',
      'Quality dispute — the plastering is substandard',
      'Programme and timing conflict — other trades are not ready, preventing the electrician from completing their work as scheduled',
      'Territory conflict — the plasterer is deliberately blocking the electrician',
    ],
    correctIndex: 2,
    explanation:
      'This is a classic programme and timing conflict. The electrician cannot complete their second fix to the required standard on wet plaster — accessories will not seat properly, there is a risk of moisture ingress into back boxes, and the finish will be compromised. The instruction to "just work around it" places the electrician in a difficult position: comply and risk a substandard installation, or refuse and risk being seen as uncooperative. The root cause is almost always a programme that was unrealistic from the outset, combined with a failure to coordinate trade sequences properly. The professional response is to document the situation (photographs, email to the site manager confirming the issue and the instruction received), explain the technical risks clearly, and propose a revised sequence that allows both trades to complete their work properly.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: 'What should I do if a client refuses to pay for completed work?',
    answer:
      'Start with a professional conversation to understand the reason for non-payment. Is it a cash flow issue, a dispute about quality, or simply an attempt to avoid paying? If the client has a genuine complaint, address it. If they acknowledge the work is satisfactory but will not pay, follow a clear escalation path: send a formal letter before action (giving 14 days to pay), then use the small claims track at the County Court for amounts under £10,000. For commercial clients (businesses), you can also charge statutory interest under the Late Payment of Commercial Debts (Interest) Act 1998. The most important preventive measure is having clear written terms agreed before work starts, including payment schedule, payment method, and what happens if payment is late.',
  },
  {
    question: 'How do I handle "while you are here" requests without upsetting the client?',
    answer:
      'The key is to be warm in tone but clear in substance. When a client asks for additional work, respond positively: "That is a great idea — I can definitely do that." Then immediately follow with the cost conversation: "That would be outside the original quote, so let me work out a price for you." Most clients accept this without any friction — they understand that additional work costs additional money. The clients who object are the ones who were hoping to get free work, and those are exactly the expectations you need to correct early. Always confirm additional work and its cost in writing (a text message is fine) before starting.',
  },
  {
    question: "Are programme conflicts always the main contractor's fault?",
    answer:
      'No. Programme conflicts in construction are systemic rather than individual. They arise from a combination of factors: unrealistic initial programming (often driven by client pressure to start early), poor coordination between trades, inadequate allowance for delays and weather, and a culture of optimism bias in planning. Main contractors bear significant responsibility for programme management, but subcontractors also contribute when they overcommit, fail to communicate delays, or do not flag problems early enough. The most effective approach is to treat programme management as a shared responsibility: communicate proactively, flag potential issues before they become actual issues, and document everything.',
  },
  {
    question: 'What legal protections do subcontractor electricians have in payment disputes?',
    answer:
      'The Housing Grants, Construction and Regeneration Act 1996 (commonly known as the Construction Act) provides several important protections for subcontractors. These include the right to stage payments (for contracts lasting more than 45 days), the right to suspend work for non-payment (after giving proper notice), and the right to adjudication (a fast-track dispute resolution process). The Late Payment of Commercial Debts (Interest) Act 1998 allows you to charge statutory interest on overdue commercial invoices. The key requirement is that these rights apply to construction contracts — so having a written contract (even a simple one) is essential. Without a written contract, proving your terms becomes significantly harder.',
  },
];

/* ------------------------------------------------------------------ */
/*  Quiz questions (Quiz — correctAnswer, 0-indexed)                   */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following is the single most common trigger for conflict between electricians and domestic clients?',
    options: [
      'Technical disagreements about cable sizing',
      'Money — disputes about price, payment timing, variation costs, and what is included in the quote',
      'Personality clashes between the electrician and client',
      'Disagreements about the colour of accessories',
    ],
    correctAnswer: 1,
    explanation:
      'Money is consistently the most common trigger for conflict in domestic electrical work. This encompasses a wide range of disputes: disagreements about the quoted price versus the final invoice, late payment or non-payment, the cost of additional work ("while you are here" requests), disputes about what was and was not included in the original quotation, and retention holdbacks on larger projects. Money disputes are particularly volatile because they combine financial stakes (which affect livelihoods) with emotional elements (feeling undervalued, exploited, or cheated). The vast majority of money disputes can be prevented by clear, detailed quotations that specify exactly what is included, explicit payment terms agreed in advance, and immediate written confirmation of any variations.',
  },
  {
    id: 2,
    question: 'The Late Payment of Commercial Debts (Interest) Act 1998 allows:',
    options: [
      'Any person to charge interest on any late payment regardless of the type of contract',
      'Businesses to charge statutory interest on overdue commercial debts at 8% above the Bank of England base rate',
      'Domestic clients to withhold payment if they are dissatisfied with the work',
      'Main contractors to delay subcontractor payments by up to 120 days',
    ],
    correctAnswer: 1,
    explanation:
      'The Late Payment of Commercial Debts (Interest) Act 1998 gives businesses the statutory right to charge interest on overdue commercial debts. The interest rate is 8% above the Bank of England base rate. Crucially, this Act applies only to commercial contracts — business-to-business or business-to-public authority transactions. It does not apply to contracts with domestic consumers. For electricians, this means the Act protects them when working as subcontractors to other businesses (building companies, main contractors, facilities management companies) but not when working directly for domestic clients. The Act also allows the creditor to claim reasonable debt recovery costs.',
  },
  {
    id: 3,
    question:
      'A domestic client says "while you are here, can you add a few extra sockets?" The electrician agrees without discussing cost. At invoicing, the client disputes the additional charges. This conflict was most likely caused by:',
    options: [
      'The client deliberately trying to get free work',
      'The electrician charging too much for the additional work',
      'A scope expectation gap — the additional work was agreed verbally without explicit cost confirmation, creating different assumptions in each party',
      'The Consumer Rights Act 2015 requiring all additional work to be free of charge',
    ],
    correctAnswer: 2,
    explanation:
      'This is a textbook scope expectation gap. When additional work is agreed without an explicit cost discussion, both parties leave the conversation with different assumptions. The electrician assumes the client understands that extra work means extra cost — this seems obvious to the electrician, who knows the value of their time and materials. The client assumes that because the electrician agreed without mentioning cost, it must be included in the original price — this seems equally obvious to the client, who did not hear any mention of additional charges. Neither party is acting in bad faith; they simply have different assumptions. The solution is always to make the cost conversation explicit before starting any additional work, ideally confirmed in writing.',
  },
  {
    id: 4,
    question:
      'Under the Consumer Rights Act 2015, when an electrician provides a service to a domestic client, the service must be:',
    options: [
      'Free of charge if the client is dissatisfied',
      'Completed within 24 hours regardless of complexity',
      'Performed with reasonable care and skill, within a reasonable time (if no time is agreed), and for a reasonable price (if no price is agreed)',
      'Guaranteed for 10 years',
    ],
    correctAnswer: 2,
    explanation:
      'The Consumer Rights Act 2015 replaced the Supply of Goods and Services Act 1982 for most consumer contracts. Under the Act, services supplied to consumers must be performed with reasonable care and skill, completed within a reasonable time (if no specific time was agreed), and provided at a reasonable price (if no specific price was agreed). These are implied terms that apply automatically to every consumer service contract. For electricians, this means that if a dispute arises about quality, timing, or price, the court will assess whether the service met the standard of "reasonable care and skill" — which in practice means the standard expected of a competent electrician following current regulations and good practice.',
  },
  {
    id: 5,
    question:
      'An electrician is working as a subcontractor on a commercial project. The main contractor has not paid the last two invoices (total value £8,000). Under the Housing Grants, Construction and Regeneration Act 1996 (the Construction Act), the electrician has the right to:',
    options: [
      'Leave the site immediately without notice',
      "Suspend work after giving at least 7 days' written notice specifying the grounds for suspension",
      "Seize the main contractor's equipment as security",
      'Refuse to work on any future project for the same contractor',
    ],
    correctAnswer: 1,
    explanation:
      "The Construction Act (as amended by the Local Democracy, Economic Development and Construction Act 2009) gives subcontractors the right to suspend performance for non-payment. However, this right is not immediate — the subcontractor must first give at least 7 days' written notice of their intention to suspend, clearly stating the grounds for suspension. During any period of legitimate suspension, the subcontractor is entitled to an extension of time and cannot be penalised for the delay. This right is a significant protection for subcontractors, but it must be exercised correctly — suspending without proper notice could constitute a breach of contract by the subcontractor.",
  },
  {
    id: 6,
    question:
      'Which of the following is an example of a "territory and respect" conflict on a construction site?',
    options: [
      'Two electricians debating the correct cable size for a circuit',
      'A plumber running pipes through an area that damages completed electrical work, without coordinating in advance',
      'A project manager scheduling a progress meeting',
      'An architect issuing a revised drawing',
    ],
    correctAnswer: 1,
    explanation:
      "Territory and respect conflicts arise when one trade damages, disrupts, or disregards another trade's work. The plumber running pipes through an area with completed electrical work — without coordinating in advance — is a classic example. The damage is both practical (the electrical work needs to be repaired) and emotional (the electrician feels their work is not respected or valued). These conflicts are particularly intense because they combine financial cost (rework) with personal pride (workmanship). The preventive measure is coordination between trades before work begins in shared areas — checking who has services in the area, agreeing routes, and communicating timing. The root cause is almost always a lack of coordination rather than deliberate disrespect.",
  },
  {
    id: 7,
    question:
      'Communication failures are a common conflict trigger in construction. Which of the following is the BEST example of a communication failure leading to conflict?',
    options: [
      'A client sending a clear email confirming their requirements before work starts',
      'An electrician and client agreeing changes verbally on site with no written confirmation, leading to disputes about what was actually agreed',
      'A project manager distributing meeting minutes after a coordination meeting',
      'An electrician providing a detailed written quotation before starting work',
    ],
    correctAnswer: 1,
    explanation:
      'Verbal-only agreements are one of the most common and most preventable sources of conflict in construction. When changes or additional work are agreed verbally on site, both parties leave the conversation with their own understanding of what was said — and those understandings frequently differ. Without written confirmation, there is no evidence to resolve the dispute when it surfaces weeks later at invoicing stage. The other options (clear emails, meeting minutes, written quotations) are all examples of good communication practice that prevents conflict. The fix is straightforward: always confirm agreements in writing, even informally (a text message or email is sufficient). The habit of writing things down prevents the majority of communication-based disputes.',
  },
  {
    id: 8,
    question:
      'Power imbalances between main contractors and subcontractors are a significant conflict trigger because:',
    options: [
      'Main contractors are always wrong in disputes with subcontractors',
      'Subcontractors have more legal protections than main contractors',
      "The subcontractor's dependence on the main contractor for future work creates pressure to accept unfair treatment rather than risk the relationship",
      'Power imbalances only exist in the construction industry',
    ],
    correctAnswer: 2,
    explanation:
      "Power imbalances are a structural feature of the construction industry's subcontracting model. Main contractors control access to projects, future work, and often payment. This creates a dynamic where subcontractors may accept unfair terms, absorb disputed costs, or tolerate poor treatment because they fear losing access to future work if they push back. This is not about individual bad behaviour (though that exists) — it is about a structural power dynamic that makes conflict resolution inherently unequal. Understanding this dynamic is important because it affects how subcontractors approach disputes: they may need to balance asserting their rights with preserving the commercial relationship. The Construction Act provides some protection (payment rights, adjudication), but the power imbalance remains a significant factor in how conflicts develop and resolve.",
  },
];

export default function CRModule1Section3() {
  useSEO({
    title: 'Common Conflict Triggers in Construction | Conflict Resolution Module 1.3',
    description:
      'Money disputes, scope disagreements, programme clashes, quality disputes, territory, power imbalances, and communication failures in construction.',
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
            <AlertTriangle className="h-7 w-7 text-rose-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 1 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Common Conflict Triggers in Construction
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Money disputes, scope disagreements, programme clashes, quality disputes, territory,
            power imbalances, and communication failures
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Money</strong> is the single most common trigger &mdash; non-payment, late
                payment, variation costs, and price disputes
              </li>
              <li>
                <strong>Scope creep</strong> and &ldquo;while you are here&rdquo; requests cause
                predictable expectation gaps
              </li>
              <li>
                <strong>Programme clashes</strong> arise from unrealistic scheduling and poor trade
                coordination
              </li>
              <li>
                <strong>Communication failures</strong> and power imbalances amplify every other
                trigger
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Prevention:</strong> Recognising triggers allows you to prevent conflicts
                before they start
              </li>
              <li>
                <strong>Legal context:</strong> Key legislation protects both clients and
                tradespeople
              </li>
              <li>
                <strong>Industry-specific:</strong> Construction has unique structural features that
                make certain conflicts predictable
              </li>
              <li>
                <strong>Actionable:</strong> Most triggers can be mitigated through better processes
                and communication
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Identify the six most common categories of conflict trigger in construction work',
              'Explain how money disputes arise and reference relevant legislation (Late Payment Act 1998, Construction Act 1996)',
              'Describe the "scope creep" dynamic and its link to expectation gaps in domestic electrical work',
              'Recognise programme and timing conflicts and explain why they are systemic rather than individual',
              'Analyse territory, respect, and quality disputes specific to multi-trade construction environments',
              'Explain how communication failures and power imbalances amplify other conflict triggers',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Money Disputes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">01</span>
            Money Disputes
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Money is the single most common and most emotionally charged trigger for conflict in
                construction. This encompasses a broad spectrum of disputes: non-payment (the client
                does not pay at all), late payment (the client pays but weeks or months after the
                agreed date), price disputes (the client challenges the final invoice), variation
                costs (disagreements about additional work charges), and retention (holding back a
                percentage of the contract sum). Each of these triggers combines financial stakes
                with emotional intensity, making money disputes particularly volatile and difficult
                to resolve.
              </p>

              <p>
                For self-employed electricians, money disputes are existential rather than
                administrative. A &pound;3,000 consumer unit installation that goes unpaid is not a
                line item on a corporate balance sheet &mdash; it is a mortgage payment, a week of
                wasted labour, and a direct hit to personal income. This personal financial exposure
                makes tradespeople simultaneously more vulnerable to the impact of non-payment and
                more reluctant to pursue it (because pursuing payment risks losing the client and
                future referrals). The result is a paradox: the people who can least afford
                non-payment are often the least willing to confront it.
              </p>

              <p>
                The legislative framework provides some protection. The{' '}
                <strong>Late Payment of Commercial Debts (Interest) Act 1998</strong> gives
                businesses the right to charge interest on overdue commercial invoices at 8% above
                the Bank of England base rate, plus reasonable recovery costs. However, this Act
                applies only to business-to-business contracts &mdash; it does not cover domestic
                clients. The{' '}
                <strong>
                  Housing Grants, Construction and Regeneration Act 1996 (the Construction Act)
                </strong>{' '}
                provides subcontractors with rights to stage payments, payment notices, and the
                right to suspend work for non-payment after giving 7 days&rsquo; written notice. For
                domestic clients, the <strong>Consumer Rights Act 2015</strong> establishes that
                services must be performed with reasonable care and skill, which sets the standard
                for quality disputes.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Money Dispute Scenarios
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Non-payment:</strong> Work completed, client refuses to pay. Often
                      triggered by a genuine complaint but sometimes by a client who never intended
                      to pay the full amount.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Late payment:</strong> Client acknowledges the debt but does not pay
                      on time. Causes cash flow problems and forces the electrician to chase payment
                      (time that could be spent earning).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Variation disputes:</strong> Additional work was carried out during
                      the project. The electrician charges for it; the client says it was included
                      in the original price. Almost always preventable by confirming variations in
                      writing before starting.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Retention:</strong> Main contractor withholds 5&ndash;10% of the
                      contract sum against defects. Release of retention can be delayed
                      indefinitely, tying up significant sums.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Scope and Specification Disputes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">02</span>
            Scope and Specification Disputes
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Scope disputes &mdash; disagreements about what is and is not included in the agreed
                work &mdash; are the second most common trigger for conflict in domestic electrical
                work. The classic manifestation is the &ldquo;while you are here&rdquo; request: a
                client asks the electrician to add extra sockets, move a light fitting, or install
                an additional circuit during a job, treating it as a minor addition rather than
                additional chargeable work. When the electrician agrees without explicitly
                discussing cost, an expectation gap is created that will almost certainly surface as
                a dispute at invoicing stage.
              </p>

              <p>
                The root cause of scope disputes is almost always a lack of clarity in the original
                quotation. A quotation that says &ldquo;rewire kitchen &mdash; &pound;3,500&rdquo;
                without specifying the number of socket outlets, lighting points, switching
                arrangements, and accessories is an invitation for disagreement. The client imagines
                one scope; the electrician delivers another. Neither is being dishonest &mdash; they
                simply had different assumptions about what &ldquo;rewire kitchen&rdquo; means. A
                detailed quotation that lists every circuit, every accessory, and every exclusion
                prevents this ambiguity.
              </p>

              <p>
                The <strong>Consumer Rights Act 2015</strong> is relevant here because it
                establishes that services supplied to consumers must be performed with reasonable
                care and skill, within a reasonable time (if no specific time is agreed), and for a
                reasonable price (if no specific price is agreed). If a dispute about scope reaches
                court, the judge will consider what a reasonable person would have understood to be
                included, which is why clear, written quotations are so important &mdash; they
                remove the need for judicial interpretation by making the scope explicit from the
                outset.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Preventing Scope Disputes: The Clear Quotation Checklist
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>List every deliverable</strong> &mdash; number of circuits, socket
                      outlets, light points, switching arrangements, and accessories
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>State what is excluded</strong> &mdash; making good, decoration,
                      asbestos removal, moving furniture, and any works by others
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Include a variation clause</strong> &mdash; &ldquo;Any additional work
                      requested will be confirmed in writing with a cost before proceeding&rdquo;
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Specify payment terms</strong> &mdash; when payment is due, what
                      method, and any deposit requirements
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Programme and Timing Conflicts */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">03</span>
            Programme and Timing Conflicts
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Programme conflicts &mdash; disputes about scheduling, sequencing, and timing of
                work &mdash; are endemic in construction. They arise when the programme is
                unrealistic, when trades are not ready for the work they are supposed to be doing,
                when access is denied or delayed, or when decisions from the client or design team
                arrive late. For electricians, programme conflicts are particularly frustrating
                because electrical work depends heavily on other trades being complete before it can
                proceed. You cannot second-fix on wet plaster. You cannot install accessories on
                unpainted surfaces. You cannot commission a system when other trades are still
                working in the distribution board area.
              </p>

              <p>
                The fundamental cause of most programme conflicts is optimism bias at the planning
                stage. Programmes are often written to reflect the best-case scenario rather than
                the realistic average. They assume that every trade will start and finish on time,
                that no materials will be delayed, that no design changes will occur, and that
                weather will not be a factor. In reality, none of these assumptions holds
                consistently. The result is a programme that falls behind almost immediately, with
                each trade blaming the one before it for the cumulative delay.
              </p>

              <p>
                For electricians, the practical impact is significant. Being told to &ldquo;just
                work around it&rdquo; when preceding trades are not complete is one of the most
                common and most frustrating experiences on commercial sites. The electrician knows
                that working on wet plaster or in an incomplete area will result in a substandard
                finish that they will be held accountable for later. But refusing to start risks
                being labelled as uncooperative. This is a genuine dilemma that requires clear
                communication: documenting the condition of the work area, explaining the technical
                risks, and proposing a revised sequence that allows the work to be done properly.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Common Programme Conflict Scenarios
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Preceding trades not complete:</strong> Electrician arrives for second
                      fix but plaster is still wet, ceilings are not finished, or floors are not
                      laid
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Access denied:</strong> Areas that were supposed to be available are
                      still occupied by other trades or locked by the client
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Late decisions:</strong> Client has not chosen light fittings,
                      architect has not issued final drawings, building control query remains
                      unanswered
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Compressed programme:</strong> Project is behind schedule and all
                      remaining trades are pressured to complete in an unrealistically short window
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Quality, Territory, and Respect */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">04</span>
            Quality, Territory, and Respect
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Quality disputes arise when the client, main contractor, or another tradesperson
                challenges the standard of an electrician&rsquo;s work. These disputes are
                particularly personal because they strike at professional identity and pride.
                Telling an electrician that their workmanship is substandard is not just a technical
                criticism &mdash; it is a challenge to their competence, their training, and their
                reputation. This makes quality disputes some of the most emotionally intense
                conflicts in construction.
              </p>

              <p>
                Some quality disputes are legitimate: work that genuinely does not meet the required
                standard needs to be corrected, and a professional response is to acknowledge the
                issue and put it right. But many quality disputes are actually expectation disputes
                in disguise. A client who expects every cable to be perfectly invisible is
                expressing an expectation that may be unrealistic given the building construction. A
                snagging list that includes items like &ldquo;socket not exactly level&rdquo; when
                it is within 2mm of perfect is applying a standard that is more stringent than any
                regulation requires. Understanding whether a quality complaint reflects a genuine
                defect or an unrealistic expectation is essential for responding appropriately.
              </p>

              <p>
                Territory conflicts are unique to multi-trade environments. They occur when one
                trade encroaches on another&rsquo;s work area, damages completed work, or
                disrespects the effort that has gone into an installation. A plumber who drills
                through a completed first fix without checking for cables is committing both a
                safety violation and a territory violation. A decorator who paints over smoke
                detectors is damaging an installation that was complete and tested. These incidents
                trigger intense emotional responses because they combine financial cost (rework)
                with personal affront (disrespect for professional workmanship).
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Respect-Related Conflict Triggers
                </p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Dismissive attitudes:</strong> Site managers, clients, or other trades
                      treating electrical work as less important or less skilled than other
                      disciplines
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Damage to completed work:</strong> Other trades damaging first fix
                      wiring, scratching accessories, or working carelessly around electrical
                      installations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Unreasonable snagging:</strong> Snagging lists that apply standards
                      beyond what is reasonable or required by regulation, creating a perception of
                      fault-finding
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400 flex-shrink-0" />
                    <span>
                      <strong>Credit not given:</strong> Completing complex work that is then
                      attributed to the contractor or project manager rather than the electrician
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Communication Failures and Power Imbalances */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-500/80 text-sm font-normal">05</span>
            Communication Failures and Power Imbalances
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Communication failures are the accelerant that turns minor disagreements into major
                conflicts. They are rarely the root cause of a dispute but they amplify every other
                trigger dramatically. A money dispute that could be resolved in a 5-minute
                conversation becomes a months-long standoff when neither party communicates clearly.
                A scope disagreement that could be prevented by a single email becomes a bitter
                argument at invoicing stage because nothing was written down. A programme conflict
                that could be managed through early warning becomes a crisis because nobody flagged
                the problem until it was too late.
              </p>

              <p>
                The most common communication failures in construction are: relying entirely on
                verbal agreements without written confirmation, making assumptions about what the
                other person knows or intends, failing to communicate bad news early (hoping the
                problem will resolve itself), and &ldquo;ghosting&rdquo; &mdash; simply stopping
                responding to messages rather than having an uncomfortable conversation. Each of
                these patterns is understandable but destructive. Verbal agreements create
                expectation gaps. Assumptions create misunderstandings. Delayed bad news creates
                crises. Ghosting destroys trust.
              </p>

              <p>
                Power imbalances add another layer of complexity. In construction, power is
                distributed unevenly: main contractors have power over subcontractors (through
                control of future work and payment), clients have power over sole traders (through
                the ability to withhold payment, leave reviews, and choose alternatives), and
                experienced tradespeople have power over apprentices (through seniority and
                expertise). When power imbalances exist, the less powerful party is often reluctant
                to raise issues, challenge decisions, or assert their rights &mdash; because doing
                so feels risky. This reluctance allows problems to persist and grow, making the
                eventual conflict worse than it would have been if addressed early.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-rose-400 mb-2">
                  The Communication Chain Reaction
                </p>
                <p className="text-base text-white leading-relaxed">
                  <strong>
                    A minor issue that is not communicated becomes a moderate problem. A moderate
                    problem that is still not communicated becomes a serious dispute. A serious
                    dispute that is still not communicated becomes a relationship-ending crisis.
                  </strong>
                </p>
                <p className="text-sm text-white mt-3">
                  At every stage in this chain, early communication would have reduced the severity
                  of the outcome. The lesson is simple but powerful: communicate early, communicate
                  honestly, and communicate in writing. The temporary discomfort of raising an issue
                  is always less than the eventual cost of ignoring it.
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
                This section has identified the most common conflict triggers in construction and
                examined why each one is so prevalent. The key points to carry forward are:
              </p>

              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Money disputes</strong> are the most common trigger, encompassing
                    non-payment, late payment, variation costs, and retention. Legislation provides
                    some protection (Late Payment Act, Construction Act, Consumer Rights Act).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Scope disputes</strong> arise from unclear quotations and verbal-only
                    agreements about additional work. Clear, detailed quotations with variation
                    clauses prevent most scope conflicts.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Programme conflicts</strong> are systemic rather than individual,
                    arising from unrealistic planning and poor trade coordination.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Quality and territory disputes</strong> are intensely personal because
                    they challenge professional identity and pride in workmanship.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Communication failures</strong> amplify every other trigger. Writing
                    things down, communicating early, and avoiding ghosting prevent escalation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Power imbalances</strong> between main contractors and subcontractors
                    create structural pressure that makes conflict resolution inherently unequal.
                  </span>
                </li>
              </ul>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Next:</strong> In Section 4, we will turn inward
                  and explore your personal default response to conflict &mdash; the fight, flight,
                  or freeze response, the ladder of inference, cognitive distortions, and how to
                  create space between stimulus and response.
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

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
            <Link to="../cr-module-1-section-4">
              Next: Understanding Your Default Response
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
