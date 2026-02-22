import {
  ArrowLeft,
  Building2,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  FileText,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'cr-4-2-check1',
    question:
      'A main contractor deducts £2,000 from your payment for "making good" work they claim was defective, but they gave you no prior notice of the deduction. Is this lawful?',
    options: [
      'Yes — the MC can deduct whatever they want as they control payment',
      'No — the Construction Act requires a valid pay-less notice before any deduction from the notified sum',
      'Yes — contra charges do not require any notice',
      'No — but only if the amount exceeds £5,000',
    ],
    correctIndex: 1,
    explanation:
      'Under the Housing Grants, Construction and Regeneration Act 1996 (as amended 2011), the paying party must issue a valid pay-less notice before deducting any amount from the notified sum. A pay-less notice must state the amount the paying party considers due and the basis on which it is calculated. Without a valid pay-less notice, the full notified sum is payable. A contra charge deducted without proper notice is not lawful, regardless of the amount involved or whether the MC believes the work was genuinely defective.',
  },
  {
    id: 'cr-4-2-check2',
    question:
      'The main contractor changes the programme, pushing your second fix start date back by three weeks. They expect you to absorb the cost. What should you do first?',
    options: [
      'Accept the change without question to maintain the relationship',
      'Refuse to return to site until they compensate you',
      'Document the change, calculate the impact on your costs, and write formally to the MC notifying them of the delay and your intention to claim additional costs',
      'Post about it on social media to warn other subcontractors',
    ],
    correctIndex: 2,
    explanation:
      'Documentation is your most important tool when the programme changes. Write formally to the main contractor confirming the programme change (with dates), stating the impact on your planned resources and costs, and notifying them that you will be submitting a claim for the additional costs arising from the delay. This creates a contemporaneous written record that is essential if the dispute escalates to adjudication. Simply accepting the cost sets a precedent, refusing to work damages the relationship needlessly, and social media complaints are unprofessional and potentially defamatory.',
  },
  {
    id: 'cr-4-2-check3',
    question:
      'What is the correct escalation sequence when a dispute with a main contractor cannot be resolved at site level?',
    options: [
      'Site manager → solicitor → court',
      'Site-level discussion → written correspondence to contracts manager → senior management → adjudication',
      'Union representative → employment tribunal → court',
      "Email to MC's managing director → refusal to work → adjudication",
    ],
    correctIndex: 1,
    explanation:
      "The correct escalation sequence starts at site level with direct discussion between you (or your foreman) and the MC's site manager. If this fails, the next step is formal written correspondence to the MC's contracts manager, setting out the facts, your position, and what resolution you are seeking. If the contracts manager cannot resolve it, escalation to senior management on both sides is the next step. Only when all commercial negotiation has failed should you consider statutory adjudication under the Construction Act. Each step is more formal, more costly and more relationship-damaging than the last — exhaust the informal options before moving to formal processes.",
  },
];

const faqs = [
  {
    question: 'Can a main contractor withhold all my payment because of a small defect?',
    answer:
      'No. Under the Construction Act 1996 (as amended 2011), the paying party can only withhold payment to the extent covered by a valid pay-less notice. The pay-less notice must state the amount considered due and the basis for calculating it. This means the MC cannot withhold your entire payment because of a minor defect — they can only withhold an amount that is proportionate to the cost of rectifying the defect, and only if they have issued a valid pay-less notice within the required timeframe. If the MC withholds an amount that is grossly disproportionate to the alleged defect, you have strong grounds for adjudication. For example, if your application is for £15,000 and the defect would cost £500 to rectify, withholding the full £15,000 would not be supported by any adjudicator.',
  },
  {
    question: 'What is the difference between a payment notice and a pay-less notice?',
    answer:
      'A payment notice is issued by the paying party (usually the MC) within 5 days of the due date, stating the amount they consider due and the basis on which it has been calculated. This is the "here is what we think you are owed" notice. A pay-less notice is issued later (at least 7 days before the final date for payment) and states a lower amount than the payment notice, together with the basis for the reduction. This is the "we are going to pay you less than the notified amount, and here is why" notice. If the MC fails to issue either notice, the amount stated in your payment application becomes the notified sum and must be paid in full. The timing and content requirements for both notices are strict — failure to comply with them gives you powerful rights.',
  },
  {
    question: 'Should I continue working if the MC has not paid my last application?',
    answer:
      "This depends on whether the MC has followed the correct payment notice procedure. If the MC has issued a valid payment notice or pay-less notice and you disagree with the amount, you should continue working while disputing the sum through correspondence and, if necessary, adjudication. However, if the MC has failed to pay the notified sum by the final date for payment and has not issued a valid pay-less notice, you have the right to suspend performance under Section 112 of the Construction Act. You must give at least 7 days' written notice of your intention to suspend. Suspension is a serious step that should not be taken lightly — it will almost certainly damage the commercial relationship — but it is a legitimate legal right designed to protect subcontractors from non-payment.",
  },
  {
    question: 'How do I protect myself from unfair contra charges?',
    answer:
      'The best protection against unfair contra charges is contemporaneous documentation. Keep a daily site diary recording what work was done, where, by whom, and any issues encountered. Photograph completed work before leaving an area. Keep copies of all instructions (written and verbal — confirm verbal instructions by email afterwards). When you receive a contra charge, respond promptly in writing, challenging any charge you believe is unfair and providing your evidence. Never ignore a contra charge or accept it without scrutiny. Check your subcontract agreement for the specific procedure the MC must follow when issuing contra charges — many contracts require prior written notice and an opportunity to rectify before a deduction can be made. If the contra charge procedure was not followed, you have grounds to dispute the deduction.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Why is there typically a power imbalance between main contractors and subcontractors?',
    options: [
      'Because main contractors are always larger companies',
      'Because main contractors control payment, programme and access — the three things subcontractors depend on',
      'Because subcontractors are less qualified than main contractors',
      'Because the law gives main contractors more rights than subcontractors',
    ],
    correctAnswer: 1,
    explanation:
      'The power imbalance exists because main contractors control the three things every subcontractor depends on: payment (they decide how much and when you get paid), programme (they set and change the schedule), and access (they control when and where you can work on site). This structural imbalance means that even legitimate disputes can feel risky for subcontractors, because challenging the MC might affect future payments, programme allocations or the commercial relationship. The Construction Act was specifically designed to address this imbalance.',
  },
  {
    id: 2,
    question:
      'Under the Construction Act 1996 (as amended), what is the maximum period allowed for interim payments?',
    options: ['14 days', '21 days', '30 days', '60 days'],
    correctAnswer: 2,
    explanation:
      'The Construction Act requires that construction contracts provide for interim payments at intervals of no more than 30 days. This means you are entitled to submit payment applications at least monthly. If your contract does not specify a payment interval, or specifies an interval longer than 30 days, the Scheme for Construction Contracts 1998 implies a 30-day interval. This provision ensures that subcontractors receive regular cash flow rather than having to wait until the end of the project for payment.',
  },
  {
    id: 3,
    question: 'What is a "pay when paid" clause, and is it enforceable?',
    options: [
      'A clause requiring the MC to pay you when they receive payment from the client — it is fully enforceable',
      'A clause requiring payment within 30 days — it is enforceable',
      'A clause making your payment conditional on the MC being paid by the client — it is banned by the Construction Act except in cases of upstream insolvency',
      'A clause requiring you to pay the MC before they pay you — it is not enforceable',
    ],
    correctAnswer: 2,
    explanation:
      'A "pay when paid" clause makes the subcontractor\'s right to payment conditional on the main contractor receiving payment from the client (or from a party further up the payment chain). Section 113 of the Construction Act 1996 renders these clauses ineffective, with one narrow exception: the MC can rely on a "pay when paid" clause if the party from whom payment is due has become insolvent. This provision was a landmark protection for subcontractors, ending the historic practice of MCs delaying payment to subcontractors indefinitely by claiming they had not been paid themselves.',
  },
  {
    id: 4,
    question:
      'A main contractor issues a contra charge for "cleaning up after your trade." You believe the mess was not yours. What is the most effective first step?',
    options: [
      'Refuse to pay and hope they drop it',
      'Accept the charge to avoid conflict',
      "Respond in writing within the contractual timeframe, challenging the charge with evidence and requesting the MC's evidence",
      'Deduct the same amount from your next application as a counter-claim',
    ],
    correctAnswer: 2,
    explanation:
      "The most effective response to an unfair contra charge is a prompt, written challenge within the timeframe specified in your subcontract agreement. Your response should state that you dispute the charge, explain why (with evidence such as photographs showing your area was left clean, or records showing the mess was from another trade), and request the MC's evidence supporting the charge. Many contra charges are speculative — MCs issue them knowing that many subcontractors will simply accept them rather than challenge them. A well-evidenced, professionally written challenge will often result in the charge being withdrawn or significantly reduced.",
  },
  {
    id: 5,
    question:
      'The MC pushes your second fix start date back by two weeks due to programme changes. Which of the following costs might you be entitled to claim?',
    options: [
      'Only the cost of additional materials',
      'Standing time for labour, additional preliminaries, loss of productivity, and any additional mobilisation costs',
      'Only the cost of additional labour hours',
      'You are never entitled to additional costs when the programme changes',
    ],
    correctAnswer: 1,
    explanation:
      "When the MC changes the programme and causes delay to your work, you may be entitled to claim a range of additional costs including: standing time for labour you had booked but could not deploy, additional preliminary costs (welfare, supervision, plant hire for the extended period), loss of productivity caused by working in different conditions or sequences than planned, and additional mobilisation/demobilisation costs if you have to leave and return to site. The key to a successful claim is contemporaneous documentation — you need to demonstrate that the costs were caused by the MC's programme change, not by your own inefficiency.",
  },
  {
    id: 6,
    question:
      'What does the Construction Act say about "pay when certified" clauses in construction contracts?',
    options: [
      'They are fully enforceable because certification is an independent process',
      'They are treated the same as "pay when paid" clauses and are banned',
      'They are enforceable but only if the certifier is independent',
      'The Construction Act does not address certification',
    ],
    correctAnswer: 1,
    explanation:
      'The Construction Act treats "pay when certified" clauses the same as "pay when paid" clauses — both are rendered ineffective by Section 113. The logic is the same: a subcontractor\'s right to payment should not be conditional on an event that is outside their control, whether that event is the MC receiving payment from the client or a certifier issuing a certificate. The subcontractor is entitled to payment based on the construction contract\'s own payment provisions, regardless of what has or has not been certified further up the chain.',
  },
  {
    id: 7,
    question: 'When should you consider walking away from a main contractor relationship?',
    options: [
      'After the first disagreement about payment',
      'Never — maintaining the relationship is always more important than payment',
      'When the pattern of behaviour shows systematic late payment, unfair contra charges, programme abuse, or refusal to follow contractual payment procedures',
      'Only when instructed by a solicitor',
    ],
    correctAnswer: 2,
    explanation:
      'Walking away from an MC relationship is a legitimate business decision when the pattern of behaviour demonstrates a systematic disregard for fair commercial practice. Individual disputes are normal and should be resolved through the escalation process. But when you see a consistent pattern — payments always late, contra charges always excessive, programme always changed at your expense, payment notices never compliant — you are dealing with a company that treats subcontractor abuse as a business model. Continuing to work for such a company is rarely commercially viable, and the stress and financial damage of doing so far outweigh the short-term income.',
  },
  {
    id: 8,
    question:
      'What is the most important single action you can take to protect yourself in MC disputes?',
    options: [
      'Hire an expensive solicitor at the start of every project',
      'Maintain thorough, contemporaneous written records of everything — instructions, changes, delays, payments, conversations',
      'Only work for main contractors you know personally',
      'Include penalty clauses in your subcontract agreement',
    ],
    correctAnswer: 1,
    explanation:
      'Contemporaneous written records are the single most powerful tool you have in any commercial dispute. "Contemporaneous" means created at or near the time of the event, not reconstructed from memory weeks or months later. A site diary entry written on the day, a confirmation email sent within hours of a verbal instruction, photographs taken at the time of a programme change — these carry far more weight than recollections produced months later for an adjudication. An adjudicator or judge will almost always prefer a contemporaneous record over later testimony, because records created in the moment are not influenced by hindsight or self-interest.',
  },
];

export default function CRModule4Section2() {
  useSEO({
    title: 'Main Contractor & Commercial Conflicts | Conflict Resolution Module 4.2',
    description:
      'Payment disputes, programme changes, contra charges, Construction Act payment terms, and escalation strategies for electrical subcontractors.',
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
            <Link to="../cr-module-4">
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
            <Building2 className="h-7 w-7 text-rose-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 mb-3 mx-auto">
            <span className="text-rose-400 text-xs font-semibold">MODULE 4 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Main Contractor &amp; Commercial Conflicts
          </h1>
          <p className="text-white text-sm sm:text-base max-w-2xl mx-auto">
            Understanding the power imbalance, payment disputes, contra charges, programme
            disruption and the professional escalation process
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Power imbalance:</strong> MCs control payment, programme and access
              </li>
              <li>
                <strong>Payment:</strong> Construction Act requires maximum 30-day intervals and
                bans &ldquo;pay when paid&rdquo;
              </li>
              <li>
                <strong>Contra charges:</strong> Must follow contractual procedure and can always be
                challenged
              </li>
              <li>
                <strong>Documentation:</strong> Written records are your strongest protection in
                every dispute
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-rose-500/5 border-l-2 border-rose-500/50">
            <p className="text-rose-400 text-base font-medium mb-2">Why It Matters</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Cash flow:</strong> Late or disputed payments can threaten your business
                survival
              </li>
              <li>
                <strong>Legal rights:</strong> The Construction Act gives you powerful protections
                most subcontractors do not use
              </li>
              <li>
                <strong>Programme costs:</strong> MC programme changes can cost you thousands if not
                documented and claimed
              </li>
              <li>
                <strong>Career growth:</strong> Understanding commercial disputes is essential for
                anyone running their own business
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Explain the structural power imbalance between main contractors and subcontractors and its impact on dispute resolution',
              'Identify the key payment provisions of the Construction Act 1996 (as amended 2011) that protect subcontractors',
              'Recognise and challenge unfair contra charges using evidence-based written responses',
              'Document programme disruption and calculate the types of additional costs you may be entitled to claim',
              'Apply the correct escalation sequence from site-level discussion through to adjudication',
              'Determine when a main contractor relationship has become commercially unviable and make the decision to walk away',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Power Imbalance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">01</span>
            The Power Imbalance
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The relationship between a main contractor and an electrical subcontractor is
                inherently unequal. The main contractor holds the contract with the client, controls
                the project programme, manages access to the site, and &mdash; most importantly
                &mdash; controls the payment process. As a subcontractor, your entire ability to
                work, earn and sustain your business depends on decisions made by the main
                contractor. This structural power imbalance shapes every commercial dispute between
                MCs and subcontractors, and understanding it is essential for managing these
                conflicts effectively.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Three Pillars of MC Power</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Payment Control</p>
                    <p className="text-xs text-white">
                      The MC determines the payment application process, valuates your work, issues
                      (or fails to issue) payment notices, and controls when money actually reaches
                      your bank account. Late payment, under-valuation and disputed applications are
                      the most common weapons in an MC&rsquo;s commercial arsenal. Many
                      subcontractors tolerate unfair treatment because they fear that challenging
                      the MC will result in even slower payment on future applications.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Programme Control</p>
                    <p className="text-xs text-white">
                      The MC sets the programme and can change it, sometimes with minimal notice.
                      When the programme changes, you may have to rearrange labour, extend your site
                      presence, or work in a different sequence than planned &mdash; all of which
                      cost money. MCs routinely expect subcontractors to absorb these costs, even
                      when the programme change was entirely the MC&rsquo;s doing.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">Access Control</p>
                    <p className="text-xs text-white">
                      The MC controls when and where you can work on site. They can restrict your
                      working hours, limit your access to certain areas, and prioritise other
                      trades&rsquo; access over yours. When your access is restricted, your
                      productivity drops and your costs rise &mdash; but the MC rarely compensates
                      you for the impact.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The most common disputes between MCs and electrical subcontractors revolve around
                payment timing and amounts, disputed work quality, programme changes that increase
                subcontractor costs, contra charges for alleged defects or cleaning, and the MC
                failing to provide the conditions necessary for the subcontractor to work
                efficiently. Each of these disputes plays out within the context of the power
                imbalance &mdash; the MC holds the leverage, and the subcontractor must navigate
                carefully to protect their rights without destroying the commercial relationship.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Important context:</strong> The Construction Act
                  1996 (as amended by the Local Democracy, Economic Development and Construction Act
                  2009) was specifically designed to address this power imbalance. It gives
                  subcontractors powerful statutory rights that cannot be contracted out of &mdash;
                  including the right to interim payments, the right to adjudication, and the right
                  to suspend work for non-payment. Most subcontractors who are treated unfairly by
                  MCs are not aware of these rights or do not understand how to exercise them.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Payment Terms & The Construction Act */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">02</span>
            Payment Terms &amp; the Construction Act
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Housing Grants, Construction and Regeneration Act 1996 (commonly known as the
                Construction Act) is the single most important piece of legislation for any
                subcontractor involved in commercial disputes. It was introduced because of
                widespread abuse of subcontractors by main contractors &mdash; late payments, unfair
                deductions, and "pay when paid" clauses that left subcontractors waiting months or
                even years for money they had earned. The Act created a statutory framework that
                guarantees certain minimum rights for every party to a construction contract.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    Key Payment Provisions of the Construction Act
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">
                      Interim Payments (Section 109)
                    </p>
                    <p className="text-xs text-white">
                      Every construction contract must provide a mechanism for interim (stage)
                      payments. The payment interval must not exceed 30 days. This means you are
                      entitled to submit monthly applications for payment as a minimum. If your
                      contract does not comply, the Scheme for Construction Contracts 1998 implies
                      compliant terms automatically.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">
                      Payment Notices (Section 110A)
                    </p>
                    <p className="text-xs text-white">
                      The paying party must issue a payment notice within 5 days of each due date,
                      stating the amount considered due and the basis on which it was calculated. If
                      no payment notice is issued, the amount stated in your payment application
                      becomes the &ldquo;notified sum&rdquo; and must be paid in full.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">
                      Pay-Less Notices (Section 111)
                    </p>
                    <p className="text-xs text-white">
                      If the paying party intends to pay less than the notified sum, they must issue
                      a pay-less notice at least 7 days before the final date for payment. The
                      pay-less notice must state the amount considered due and the basis for the
                      calculation. Without a valid pay-less notice, the full notified sum must be
                      paid.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded">
                    <p className="text-sm font-medium text-white mb-1">
                      Ban on &ldquo;Pay When Paid&rdquo; (Section 113)
                    </p>
                    <p className="text-xs text-white">
                      Clauses that make your payment conditional on the MC receiving payment from
                      the client are ineffective, except in cases of upstream insolvency. This means
                      the MC cannot refuse to pay you because the client has not paid them.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                These provisions are not optional &mdash; they are mandatory minimum rights that
                apply to every construction contract, regardless of what the contract says. If your
                subcontract agreement contains terms that are less favourable than the Construction
                Act, the Act&rsquo;s provisions override the contract. This is a powerful
                protection, but it only works if you know about it and are prepared to enforce it.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Contra Charges */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">03</span>
            Contra Charges
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A contra charge is a deduction made by the main contractor from a
                subcontractor&rsquo;s payment for alleged costs the MC has incurred as a result of
                the subcontractor&rsquo;s actions or failures. Common contra charges include
                cleaning up after your trade, making good alleged defects, providing labour or
                materials that the MC claims you should have provided, and back charges for damage
                to other trades&rsquo; work. Some contra charges are legitimate &mdash; if you
                genuinely left a mess or your work was genuinely defective, the MC is entitled to
                recover reasonable costs. But many contra charges are speculative, inflated, or
                entirely fabricated.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    How to Challenge a Contra Charge
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Check the Procedure</p>
                      <p className="text-xs text-white mt-1">
                        Review your subcontract agreement for the specific contra charge procedure.
                        Most contracts require the MC to give prior written notice, allow you an
                        opportunity to rectify, and provide evidence of the costs incurred. If any
                        of these steps were missed, the contra charge may be procedurally invalid.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Request Evidence</p>
                      <p className="text-xs text-white mt-1">
                        Ask the MC to provide photographs, timesheets, material invoices and a
                        breakdown of the costs they are claiming. Many speculative contra charges
                        collapse when evidence is requested because there is none. The burden of
                        proof lies with the party making the deduction.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Provide Your Evidence</p>
                      <p className="text-xs text-white mt-1">
                        Counter the contra charge with your own evidence: photographs showing your
                        area was left clean, records showing the alleged defect was actually caused
                        by another trade, or evidence that the MC did not give you the required
                        notice or opportunity to rectify.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Respond in Writing</p>
                      <p className="text-xs text-white mt-1">
                        Always respond to contra charges in writing, within the contractual
                        timeframe. Your response should be factual, professional and specific. State
                        which charges you accept (if any), which you dispute, and the evidence
                        supporting your position. Never ignore a contra charge &mdash; silence is
                        often treated as acceptance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The reality of the construction industry is that some main contractors use contra
                charges as a systematic tool to reduce their costs at subcontractors&rsquo; expense.
                They issue speculative charges knowing that many subcontractors will accept them
                without challenge, either because they do not understand their rights or because
                they fear retaliation. If you develop a reputation for challenging contra charges
                professionally and with evidence, you will find that the number of speculative
                charges you receive drops dramatically. MCs target the subcontractors who accept
                quietly, not the ones who push back with documentation.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Programme Disruption */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">04</span>
            Programme Disruption
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Programme disruption is one of the most financially damaging disputes a
                subcontractor can face, yet it is also one of the least well-managed. When a main
                contractor changes the programme, pushes back your start date, restricts your
                access, or requires you to work in a different sequence than planned, the costs to
                your business can be substantial: labour standing time, additional mobilisation,
                extended preliminaries, loss of productivity, and the opportunity cost of not being
                able to deploy your team on another project. Despite these very real costs, many
                subcontractors simply absorb them, either because they do not realise they have a
                right to claim or because they are afraid that claiming will damage the commercial
                relationship.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">
                    The Professional Approach to Programme Changes
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Document the Change</p>
                      <p className="text-xs text-white mt-1">
                        Record the original programme dates and the revised dates. Save copies of
                        both the original and revised programmes. Note how and when you were
                        informed of the change. If the notification was verbal, confirm it in
                        writing by email immediately.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Calculate the Impact</p>
                      <p className="text-xs text-white mt-1">
                        Work out the additional costs you will incur as a result of the change:
                        labour standing time, additional travel, extended site welfare, plant hire
                        for the additional period, loss of planned productivity. Keep detailed
                        records of actual costs incurred.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Notify Formally</p>
                      <p className="text-xs text-white mt-1">
                        Write to the MC confirming the programme change, stating the impact on your
                        works, and notifying them of your intention to claim additional costs. Do
                        this as soon as the change is known &mdash; retrospective claims are much
                        harder to sustain than contemporaneous notifications.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Submit the Claim</p>
                      <p className="text-xs text-white mt-1">
                        Prepare a detailed claim with supporting evidence: the original programme,
                        the revised programme, your notification letter, and a breakdown of the
                        additional costs with supporting timesheets, invoices and calculations.
                        Submit this with your next payment application or as a standalone claim,
                        depending on your contract terms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The key principle is that documentation must be contemporaneous &mdash; created at
                or near the time of the event, not reconstructed weeks later. A programme change
                recorded in your site diary on the day it happened, confirmed by email within hours,
                and supported by a formal notification letter sent within days, creates a powerful
                evidence trail. A claim prepared from memory three months after the event is easily
                challenged and much less likely to succeed.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Escalation and Walking Away */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">05</span>
            Escalation &amp; Walking Away
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                When a dispute with a main contractor cannot be resolved through normal commercial
                discussion, a structured escalation process is essential. Jumping straight to formal
                legal processes is expensive, slow and almost always unnecessary. Equally, accepting
                unfair treatment indefinitely damages your business and sets a precedent that
                encourages further abuse. The correct approach is a stepped escalation that gives
                the MC every reasonable opportunity to resolve the dispute before formal processes
                begin.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">The Escalation Ladder</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Site-Level Discussion</p>
                      <p className="text-xs text-white mt-1">
                        Direct conversation between your foreman or site manager and the MC&rsquo;s
                        site team. Most disputes are resolved here. Keep a written record of what
                        was discussed and agreed.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Written Correspondence</p>
                      <p className="text-xs text-white mt-1">
                        Formal letter or email to the MC&rsquo;s contracts manager, setting out the
                        facts, your position, and the resolution you are seeking. This creates a
                        formal written record and signals that you are taking the matter seriously.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Senior Management</p>
                      <p className="text-xs text-white mt-1">
                        If the contracts manager cannot resolve the dispute, escalate to senior
                        management on both sides. A meeting between directors or business owners
                        often breaks deadlocks because they have a broader view of the commercial
                        relationship.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex-shrink-0">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Statutory Adjudication</p>
                      <p className="text-xs text-white mt-1">
                        If all commercial negotiation has failed, you have the right to refer the
                        dispute to adjudication under the Construction Act. This is covered in
                        detail in Section 3 of this module.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Sometimes the right decision is to walk away. If a main contractor demonstrates a
                consistent pattern of late payment, unfair contra charges, programme abuse and
                disregard for contractual procedures, continuing to work for them is rarely
                commercially viable. The stress, the cash flow damage, and the opportunity cost of
                chasing money you have already earned far outweigh the income from the project.
                Walking away is not failure &mdash; it is a legitimate business decision that
                protects your financial and mental health.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-rose-400">Recognising the Signs:</strong> Red flags that
                  suggest a toxic MC relationship include payments consistently late beyond the
                  contractual final date, payment notices that never match your application,
                  speculative contra charges on every valuation, programme changes without
                  notification, verbal instructions that are later denied, and a dismissive attitude
                  towards your contractual rights. One or two of these may be isolated incidents. A
                  consistent pattern across multiple payment cycles is a systematic approach to
                  subcontractor management that will not improve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Section Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-rose-400 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-rose-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The relationship between main contractors and subcontractors is defined by a
                structural power imbalance that shapes every commercial dispute. Main contractors
                control payment, programme and access &mdash; the three things every subcontractor
                depends on. The Construction Act was designed to address this imbalance by giving
                subcontractors statutory rights to interim payments, payment notices, and protection
                from &ldquo;pay when paid&rdquo; clauses. Your strongest weapon in any MC dispute is
                thorough, contemporaneous documentation.
              </p>

              <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-rose-400" />
                  <p className="text-sm font-medium text-rose-400">Key Principles</p>
                </div>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Know your rights:</strong> The Construction Act provides powerful
                      protections &mdash; but only if you understand and enforce them
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Challenge contra charges:</strong> Never accept a deduction without
                      scrutiny &mdash; request evidence and respond in writing
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Document programme changes:</strong> Record, notify and claim &mdash;
                      do not absorb costs caused by the MC
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Escalate professionally:</strong> Site level, written correspondence,
                      senior management, adjudication &mdash; in that order
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Know when to walk away:</strong> A pattern of systematic abuse is a
                      business model, not a series of mistakes
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Coming Next: The Construction Act &amp; Your Rights
                </p>
                <p className="text-sm text-white">
                  Section 3 takes a deep dive into the Construction Act itself &mdash; your right to
                  adjudication, payment notice timelines, pay-less notice requirements, and the
                  powerful right to suspend performance for non-payment. If you are ever going to
                  exercise your statutory rights, you need to understand exactly how they work.
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
            <Link to="../cr-module-4-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Disputes with Other Trades
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-rose-500 text-white hover:bg-rose-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../cr-module-4-section-3">
              The Construction Act &amp; Your Rights
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
