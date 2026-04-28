/**
 * Module 7 · Section 3 · Subsection 3 — Pricing + invoicing
 * Maps to C&G 2365-03 / Unit 308 / LO1 — supplementary depth
 *   Extends LO1 with apprentice-relevant career pathway material on running
 *   the financial side of an electrical business.
 *
 * Labour rates by region, materials markup, prompt-payment legislation, the
 * Late Payment of Commercial Debts (Interest) Act 1998, day-rate vs
 * fixed-price pricing models, invoice structure, payment terms, retention
 * money on commercial work, and the practical mechanics of getting paid.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Pricing + invoicing | Level 3 Module 7.3.3 | Elec-Mate';
const DESCRIPTION =
  'Labour rates by region, materials markup, prompt-payment legislation (Late Payment of Commercial Debts Act 1998), pricing models, invoice structure, retention money. The practical mechanics of getting paid.';

const checks = [
  {
    id: 'mod7-s3-sub3-day-rate',
    question: "What's a typical day rate for a self-employed UK electrician?",
    options: [
      "£10/day.",
      "Varies hugely by region and work type. Domestic London / South East: £250-400/day. Domestic North/Midlands: £200-300/day. Commercial sub-contracted: £180-280/day. Specialist (CompEx, BAFE, rail PTS): £350-700+/day. Self-employed day rates need to cover all overheads — insurance, scheme membership, vehicle, holidays, sick pay, pension. Effective hourly equivalent typically 50-70% of headline day rate after overheads.",
      "£10,000/day.",
      "Always £100/day.",
    ],
    correctIndex: 1,
    explanation:
      "Day rates are the starting point but headline figures hide the reality. After insurance (£1,500-2,500/year), scheme membership (£700-1,500/year), vehicle running costs (£3,000-5,000/year), CPD, accountant, equipment, plus the days you can't work (holidays, sick, weather, between jobs), the effective hourly take-home is typically 50-70% of the headline day rate divided by 8 hours. Plan with that reality in mind.",
  },
  {
    id: 'mod7-s3-sub3-late-payment',
    question:
      "What's the Late Payment of Commercial Debts (Interest) Act 1998 and how does it help?",
    options: [
      "Doesn't exist.",
      "UK statute giving businesses the right to charge statutory interest plus debt recovery costs on overdue commercial debts. Statutory interest rate: Bank of England base rate + 8% (so currently around 13-14%). Plus a flat fee per invoice (£40 for invoices under £1,000, £70 for £1,000-9,999, £100 for £10,000+). The right is automatic — you don't have to specify it in your contract — and applies to all UK commercial transactions.",
      "Only for foreign trade.",
      "Just a guideline.",
    ],
    correctIndex: 1,
    explanation:
      "The 1998 Act is your statutory protection against late payers. Right to interest applies automatically from 30 days after invoice (default) or whatever your contract specifies. Many small firms don't claim because they fear damaging the relationship — but the right is real and enforceable. For chronic late payers, claiming the interest plus debt recovery cost is often the trigger that gets the invoice paid. Use the Act; don't suffer in silence.",
  },
  {
    id: 'mod7-s3-sub3-retention',
    question:
      "What's 'retention money' on commercial work?",
    options: [
      "A bonus.",
      "Retention is the percentage of contract value (typically 3-5%) that the main contractor (or client) holds back from payments until the end of the contract — released in two halves: 50% at practical completion, 50% after the defects liability period (typically 12 months). It's an industry-standard mechanism for the customer's protection against post-completion defects but it ties up significant cash for the sub-contractor.",
      "Doesn't exist.",
      "Only for retainer fees.",
    ],
    correctIndex: 1,
    explanation:
      "Retention is a real cash flow issue for sub-contractors on commercial work. On a £100k contract with 5% retention, the sub-contractor sees £5k held back — £2,500 released at practical completion, £2,500 released 12 months later. Many sub-contractors lose retention money entirely if the main contractor goes insolvent before release. Some use retention bonds (insurance-backed) to release retention at completion; check the contract terms.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's a typical materials markup for an electrical firm?",
    options: [
      "0%.",
      "Most electrical firms apply 15-30% markup on materials — covers handling, ordering admin, storage, working capital tied up in stock, and the value-added service of selecting the right materials. Some firms quote materials at trade price + markup; others at retail price (which already builds in markup vs trade price). Always be transparent with customers about which model you're using; they understand markup as the standard model.",
      "1000%.",
      "Always exactly 50%.",
    ],
    correctAnswer: 1,
    explanation:
      "Materials markup is standard practice and customers expect it. The 15-30% range covers the legitimate costs of handling and the working capital tied up. Some firms publish a transparent quote ('materials at trade + 20%, labour at £X/hr') which builds trust. Others quote a fixed price that bundles materials + labour + markup — also common and easier for the customer to compare against quotes from other firms.",
  },
  {
    id: 2,
    question: "What's the difference between day-rate and fixed-price pricing?",
    options: [
      "Same thing.",
      "Day-rate: customer pays an agreed daily (or hourly) rate for time spent plus materials at agreed markup. Risk on time-overrun sits with the customer. Fixed-price: you quote a single all-in price for the defined scope. Risk on time-overrun sits with you. Customers typically prefer fixed-price (predictable budget); contractors typically prefer day-rate (no overrun risk). Practical compromise: fixed-price for well-defined scopes, day-rate for variable or fault-finding work.",
      "Day-rate is illegal.",
      "Fixed-price is illegal.",
    ],
    correctAnswer: 1,
    explanation:
      "The pricing model decision shapes who carries the risk. Day-rate suits unpredictable work (fault-finding, EICR remedials, complex retrofit) where time can't be estimated accurately. Fixed-price suits well-defined scopes (consumer unit replacement, kitchen circuits, full rewire) where time is predictable. Many electricians use both — fixed for new install, day-rate for remedial / fault.",
  },
  {
    id: 3,
    question: "What payment terms should a small electrical firm use for commercial work?",
    options: [
      "60 days.",
      "Net 30 (payment within 30 days of invoice) is the standard UK commercial default — backed by the Late Payment of Commercial Debts Act. For domestic work, 7-14 days or 'on completion' is more common. Some sub-contracts on commercial work specify Net 60 or Net 90, which strains cash flow — push back on long terms during contract negotiation. Always state payment terms clearly on the invoice.",
      "1 day.",
      "10 years.",
    ],
    correctAnswer: 1,
    explanation:
      "Net 30 is the default but sub-contractors often face longer terms imposed by main contractors. Negotiate at contract stage — once the contract is signed, the terms are fixed. For domestic customers, payment on completion (or part-payment progress) is standard and easier on cash flow than Net 30. Always send the invoice promptly after work completion; delays in invoicing cause delays in payment.",
  },
  {
    id: 4,
    question: "What's a 'pay when paid' clause and is it enforceable?",
    options: [
      "Always enforceable.",
      "A 'pay when paid' clause says the main contractor only pays the sub-contractor when the main contractor has been paid by the client. These clauses are largely UNENFORCEABLE in UK construction contracts under the Housing Grants, Construction and Regeneration Act 1996 ('the Construction Act'), except in cases of upstream insolvency. So most 'pay when paid' clauses you see in sub-contracts can be challenged.",
      "Never enforceable.",
      "Only Scottish.",
    ],
    correctAnswer: 1,
    explanation:
      "The Construction Act 1996 (and the Local Democracy Economic Development and Construction Act 2009 amendment) was specifically passed to outlaw 'pay when paid' arrangements that left sub-contractors unpaid when main contractors had cash flow problems. The Act covers most UK construction contracts. If your sub-contract has a 'pay when paid' clause, get legal advice before accepting the term — it may not be enforceable.",
  },
  {
    id: 5,
    question: "What's the typical structure of a self-employed electrician's invoice?",
    options: [
      "Just a number.",
      "Header (your business name, address, VAT number if registered, contact details), customer details (name, address), invoice number (sequential), invoice date and payment due date, work description (line items: labour days/hours, materials line items, any extras), subtotal, VAT (if applicable, 20%), total, payment terms (e.g. 'Net 30'), payment methods (BACS details, cheque). Invoices over £250 must include a statement of how to complain (Consumer Rights Act 2015 for domestic).",
      "Just a price.",
      "Just an email.",
    ],
    correctAnswer: 1,
    explanation:
      "Invoice format matters for both speed of payment and dispute defence. A clear, professional invoice gets paid faster than a scrappy one. Sequential invoice numbering is required for VAT registration and HMRC scrutiny. Always state payment terms and the due date explicitly — you can't claim late payment interest if the customer doesn't know when payment was due.",
  },
  {
    id: 6,
    question: "What's a 'pro forma' invoice?",
    options: [
      "Same as a normal invoice.",
      "A pro forma is a quote-style document that looks like an invoice but doesn't trigger a tax point — typically used for upfront payment requests before work begins (e.g. materials deposit). Once the customer pays the pro forma, you issue the actual VAT invoice. Useful for cash-flow management on jobs where you need materials money upfront. Doesn't count toward turnover until converted to a real invoice.",
      "Just for foreign trade.",
      "Only for materials.",
    ],
    correctAnswer: 1,
    explanation:
      "Pro forma is the standard mechanism for requesting upfront payment without triggering VAT and accounting treatment too early. Common on jobs with significant materials cost — you ask for 50% upfront via pro forma, customer pays, you order materials, then issue real VAT invoice on completion. Manages cash flow on materials-heavy jobs.",
  },
  {
    id: 7,
    question: "How long must you keep invoices and receipts for HMRC?",
    options: [
      "1 year.",
      "Sole trader: 5 years from the 31 January Self Assessment deadline for that tax year — so effectively 5 years and 10 months from the end of the tax year. Ltd company: 6 years from the end of the company's accounting period. VAT registered: 6 years for VAT records. Practical advice: keep all records 7+ years. Cloud accounting (Xero, QuickBooks, FreeAgent) makes this easier — records stored indefinitely.",
      "Forever.",
      "1 month.",
    ],
    correctAnswer: 1,
    explanation:
      "Record retention is a legal requirement, not optional. HMRC can investigate up to 6 years back as standard, longer in cases of suspected fraud. Cloud accounting platforms make record-keeping easier — every invoice, receipt and bank transaction stored automatically with audit trail. Plan systems for retention from day one; trying to reconstruct records during an HMRC enquiry is hugely painful.",
  },
  {
    id: 8,
    question: "What's the benefit of using cloud accounting software (Xero, QuickBooks, FreeAgent)?",
    options: [
      "Just marketing.",
      "Automated bank feed (transactions imported from your bank), invoice generation and tracking (sent invoices visible, paid status tracked), VAT return preparation (Making Tax Digital compliant), expense tracking with photo receipts, integration with payroll for staff/apprentices, real-time profit and loss view. Cost £15-30/month for sole trader; saves hours of manual bookkeeping each month.",
      "Cheaper than paper.",
      "Only for big firms.",
    ],
    correctAnswer: 1,
    explanation:
      "Cloud accounting is now the standard for any business above hobby scale — Making Tax Digital (MTD) requires digital VAT records and quarterly VAT returns done through MTD-compatible software. Xero and QuickBooks dominate the UK small-business market; FreeAgent is bundled free with NatWest, RBS and Mettle business banking. The £15-30/month cost is trivial compared to the time saved.",
  },
];

const faqs = [
  {
    question: "How do I price my first quote?",
    answer:
      "Day rate or fixed price. Day rate: estimate days needed (be realistic; add 20% buffer for unexpected); multiply by your day rate. Fixed price: estimate days × day rate + materials × 1.2 markup + contingency 10%. Compare against the customer's budget if disclosed. Round to a sensible figure (e.g. £1,250 not £1,247.50). Send a written quote with payment terms and validity period (e.g. 'this quote valid 30 days').",
  },
  {
    question: "What if a customer disputes the invoice?",
    answer:
      "First, talk — most disputes resolve through conversation. If you can't agree, refer to the Consumer Rights Act 2015 (domestic) or your contract terms (commercial). For domestic disputes, RECC / HIES (if you're MCS-registered) or your CPS scheme's complaints process can help. For commercial disputes, the Construction Act 1996 provides adjudication mechanisms. Last resort: county court small claims (£10k limit, online process).",
  },
  {
    question: "Should I take card payments?",
    answer:
      "Increasingly yes — many customers expect it. Card processing fees typically 1.5-2.5% per transaction. SumUp, Square, iZettle offer simple readers (£20-30 hardware) with per-transaction fees. Stripe and GoCardless offer payment links for invoices. The fee is offset by faster payment (instant vs Net 30) and reduced bad debt. Customers paying by card means you've been paid before they've left your premises.",
  },
  {
    question: "What if the customer can't pay the full invoice on completion?",
    answer:
      "Discuss payment plan options openly — most customers prefer to agree a plan than feel pushed into Court. Payment plan in writing (email is fine), with specific dates and amounts. Make clear that interest under the Late Payment Act applies if instalments are missed. If discussion fails, the small claims court route (£10k limit, online application) is the practical enforcement mechanism for unpaid domestic invoices.",
  },
  {
    question: "How do I handle deposits?",
    answer:
      "For domestic work: typically 25-50% deposit on materials-heavy jobs (rewires, EV chargers, PV); none for short labour-only jobs. For MCS-registered work: deposit must be protected under RECC / HIES rules (insurance-backed deposit protection; some schemes provide it). For commercial work: deposit terms set in the contract; smaller commercial typically no deposit, larger commercial sometimes 10-20% mobilisation payment.",
  },
  {
    question: "Should I quote VAT inclusive or exclusive?",
    answer:
      "Domestic customers: quote VAT-inclusive (the figure they pay). They don't reclaim VAT and care about the cash figure. Commercial customers: quote VAT-exclusive (they reclaim VAT so the ex-VAT figure is what affects their decision). Always make clear which one you're quoting; ambiguity causes disputes. If you're not VAT-registered (under £90k turnover) state 'no VAT applies' on the invoice.",
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module7-section3')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 7 · Section 3 · Subsection 3"
            title="Pricing + invoicing"
            description="Labour rates by region, materials markup, prompt-payment legislation, day-rate vs fixed-price, invoice structure, retention money, getting paid."
            tone="emerald"
          />

          <TLDR
            points={[
              "Day rates vary by region and specialism — £200-400/day standard install; £350-700+/day specialist (CompEx, rail, BAFE).",
              "Materials markup typically 15-30% — covers handling, ordering, working capital, value-added service of selecting right materials.",
              "Late Payment of Commercial Debts (Interest) Act 1998 — automatic right to charge BoE base + 8% interest plus debt recovery cost on overdue commercial invoices.",
              "Net 30 is the standard UK commercial payment term; domestic typically 7-14 days or on completion. State terms clearly on every invoice.",
              "Retention money (3-5% on commercial contracts) ties up cash for 12+ months; consider retention bonds for cash flow.",
              "MTD-compliant cloud accounting (Xero, QuickBooks, FreeAgent) £15-30/month; keep records 6+ years for HMRC.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Supplementary content — extends LO1 with apprentice-relevant career pathway material on running an electrical business financially.",
              "State typical UK day rates by region and specialism for self-employed electricians.",
              "Identify materials markup as standard practice and the typical 15-30% range.",
              "Distinguish between day-rate and fixed-price pricing models and when each fits.",
              "State the protections under the Late Payment of Commercial Debts (Interest) Act 1998 — statutory interest plus debt recovery cost.",
              "Explain retention money on commercial contracts and the cash flow implications.",
              "Identify MTD-compliant cloud accounting as the standard operating mode for small electrical firms.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Day rates and materials</ContentEyebrow>

          <ConceptBlock
            title="UK day rates by region and specialism"
            plainEnglish="Self-employed electrician day rates vary hugely by region (London / South East premium), specialism (CompEx, rail, BAFE all command premium) and customer type (commercial sub-contracted typically lower than domestic). Headline day rates need to cover all overheads (insurance, scheme membership, vehicle, holidays, sick pay, pension) — effective hourly take-home is typically 50-70% of headline rate."
            onSite="Plan day rates with overheads in mind. A £300/day rate × 200 working days/year = £60,000 gross — but after £15,000 of overheads (insurance £2,000, scheme £1,500, vehicle £4,000, accountant £1,500, equipment £2,000, CPD £1,000, contingency £3,000) the effective gross is £45,000. After income tax + NI for sole trader, take-home around £35,000. Real take-home is materially less than headline rates suggest."
          >
            <p>
              Indicative 2024 UK self-employed electrician day rates:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Domestic London / South East</strong> &mdash; &pound;250-400/day.
              </li>
              <li>
                <strong>Domestic Midlands / North</strong> &mdash; &pound;200-300/day.
              </li>
              <li>
                <strong>Commercial sub-contracted</strong> &mdash; &pound;180-280/day (lower
                because main contractors compress sub rates).
              </li>
              <li>
                <strong>EICR / specialist testing</strong> &mdash; &pound;220-320/day plus
                certificate fee per property.
              </li>
              <li>
                <strong>BAFE fire alarm</strong> &mdash; &pound;240-340/day.
              </li>
              <li>
                <strong>Rail PTS-required</strong> &mdash; &pound;350-500+/day.
              </li>
              <li>
                <strong>CompEx hazardous areas</strong> &mdash; &pound;350-700+/day.
              </li>
              <li>
                <strong>Offshore</strong> &mdash; &pound;400-800+/day on rotation.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Materials markup — standard practice, 15-30% typical"
            plainEnglish="Most electrical firms apply markup on materials between trade price (what you pay at the wholesaler) and the customer price. Typical markup 15-30%. The markup covers ordering admin, transportation, storage, working capital tied up in stock, and the value of selecting the right materials. Customers expect markup as standard practice — being transparent about it builds trust."
            onSite="Two pricing models: (1) Quote materials at retail or trade-plus-markup with markup disclosed (transparent); (2) Quote a single all-in fixed price that bundles materials, labour and markup (opaque but easier to compare). Both are common. Domestic customers typically prefer fixed-price quotes; commercial customers often prefer transparent breakdown."
          >
            <p>
              Typical materials sources and markup approach:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Wholesaler trade price</strong> &mdash; Edmundson Electrical, City
                Electrical Factors, YESSS Electrical, Rexel. Trade discount typically 30-50%
                off list price for established account.
              </li>
              <li>
                <strong>Markup applied</strong> &mdash; typically 15-30% on top of trade
                price. Higher markup on small-value items (admin overhead higher pro-rata);
                lower markup on big-value items (competition tighter).
              </li>
              <li>
                <strong>Customer price</strong> &mdash; trade price + markup. Often this
                equates to broadly the wholesaler&apos;s list price.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Getting paid — the legal framework</ContentEyebrow>

          <ConceptBlock
            title="Late Payment of Commercial Debts Act 1998 — statutory protection"
            plainEnglish="The Late Payment of Commercial Debts (Interest) Act 1998 gives UK businesses an automatic statutory right to charge interest on overdue commercial debts. Statutory interest rate: Bank of England base rate + 8% (currently around 13-14%). Plus a flat fee per invoice for debt recovery costs (£40 for invoices under £1,000, £70 for £1,000-9,999, £100 for £10,000+). The right applies automatically — no contract clause needed."
            onSite="Many small firms don't claim because they fear damaging the customer relationship. But the right is real and enforceable. For chronic late payers, signalling the intention to charge interest plus debt recovery cost is often the trigger that gets the invoice paid. Use it for serious cases; it's there for a reason."
          >
            <p>
              How to invoke the Act in practice:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Send original invoice with clear payment terms (Net 30 typical).
              </li>
              <li>
                If unpaid at due date, send a polite reminder.
              </li>
              <li>
                If still unpaid after a reasonable period (typically 30 more days), send a
                Statutory Demand citing the Late Payment Act &mdash; quoting the interest
                rate and the debt recovery fee.
              </li>
              <li>
                If still unpaid, escalate to small claims (under &pound;10k) or to a debt
                recovery agency.
              </li>
              <li>
                Keep all correspondence in writing &mdash; email is fine for evidence.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Retention money on commercial contracts"
            plainEnglish="Retention is the percentage of contract value (typically 3-5%) that the main contractor or client holds back from each payment until the end of the contract. Released in two halves: 50% at practical completion, 50% after the defects liability period (typically 12 months). Industry-standard mechanism for the customer's protection against post-completion defects but it ties up significant cash for the sub-contractor."
            onSite="On a £100k contract with 5% retention, the sub sees £5k held back — £2,500 released at practical completion, £2,500 released 12 months later. Some sub-contractors use retention bonds (insurance-backed) to release retention at completion in exchange for a small fee. Others lose retention entirely if the main contractor goes insolvent before release. Check the specific retention terms in every commercial sub-contract."
          >
            <p>
              Retention practical considerations:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Always clarify retention percentage and release schedule at contract stage.</li>
              <li>Track retention separately in your accounts as a debtor at risk.</li>
              <li>
                Diary the release dates and chase &mdash; main contractors don&apos;t
                automatically release.
              </li>
              <li>
                Consider retention bonds (insurance-backed, modest cost) to release
                retention at completion.
              </li>
              <li>
                Walk away from contracts with excessive retention (above 5%) or excessively
                long release periods (above 12 months DLP).
              </li>
              <li>
                Consider main contractor financial standing &mdash; retention you never see
                is lost margin.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Invoicing and accounting</ContentEyebrow>

          <ConceptBlock
            title="MTD-compliant cloud accounting — the modern standard"
            plainEnglish="Making Tax Digital (MTD) is HMRC's policy of requiring digital records and digital VAT returns for VAT-registered businesses (extending to other taxes). MTD requires VAT records to be kept digitally and VAT returns submitted through MTD-compatible software. Cloud accounting platforms (Xero, QuickBooks, FreeAgent) are the standard solutions — automated bank feed, invoicing, expense tracking, MTD VAT returns, real-time profit and loss view."
            onSite="For any electrical firm above hobby scale, cloud accounting is the practical standard. Cost £15-30/month — trivial compared to the time saved on manual bookkeeping and the audit trail it provides for HMRC. FreeAgent is bundled free with NatWest, RBS and Mettle business banking accounts. Xero and QuickBooks dominate the wider UK small-business market with extensive accountant integrations."
          >
            <p>
              Standard invoice elements (UK):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Your business name, address, contact details, VAT number (if registered).</li>
              <li>Customer name and address.</li>
              <li>Sequential invoice number.</li>
              <li>Invoice date and due date.</li>
              <li>Description of work / line items.</li>
              <li>Subtotal, VAT (if applicable, 20%), total.</li>
              <li>Payment terms (e.g. &quot;Net 30 days&quot;).</li>
              <li>Payment methods (BACS / bank details, cheque, card link).</li>
              <li>Statement of how to complain (Consumer Rights Act 2015 for domestic).</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Late Payment of Commercial Debts (Interest) Act 1998 (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The Act establishes an implied term in commercial contracts that any debt
                  not paid within the contractual or statutory period carries:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    Statutory interest at 8% above the Bank of England base rate.
                  </li>
                  <li>
                    A fixed sum for debt recovery costs (currently &pound;40 for invoices
                    under &pound;1,000, &pound;70 for &pound;1,000-9,999, &pound;100 for
                    &pound;10,000+).
                  </li>
                  <li>
                    Reasonable additional costs of recovering the debt where the fixed sum
                    is insufficient.
                  </li>
                </ul>
                <p className="mt-2">
                  Default payment period is 30 days unless the contract specifies otherwise
                  (and the contract period must be no longer than 60 days unless &quot;not
                  grossly unfair to the supplier&quot;).
                </p>
              </>
            }
            meaning={
              <>
                The Act is your statutory protection against late payers. The right is
                automatic &mdash; you don&apos;t have to specify it in the contract or the
                invoice. For chronic late payers, signalling the intention to invoke the
                Act often triggers payment. Don&apos;t hesitate to use it &mdash; this is
                what it&apos;s for.
              </>
            }
            cite="Source: Late Payment of Commercial Debts (Interest) Act 1998 (c.20) — paraphrased from legislation.gov.uk."
          />

          <RegsCallout
            source="Housing Grants, Construction and Regeneration Act 1996 — 'the Construction Act' (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The Construction Act 1996 (as amended by the Local Democracy Economic
                  Development and Construction Act 2009) governs payment in construction
                  contracts. Headline provisions:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    Right to interim payments (regular stage payments throughout the
                    contract).
                  </li>
                  <li>
                    Right to a clear payment notice and pay-less notice procedure.
                  </li>
                  <li>
                    Prohibition on most &quot;pay when paid&quot; clauses (except in cases
                    of upstream insolvency).
                  </li>
                  <li>
                    Right to refer disputes to adjudication (a fast-track dispute resolution
                    process).
                  </li>
                  <li>
                    Right to suspend performance for non-payment.
                  </li>
                </ul>
              </>
            }
            meaning={
              <>
                The Construction Act gives sub-contractors meaningful payment protections
                against main contractors. &quot;Pay when paid&quot; clauses you see in
                sub-contracts are mostly unenforceable. The right to adjudication (28-day
                dispute resolution) is a powerful tool for chasing payment without the cost
                and delay of court action. Get familiar with the Act if you&apos;re
                sub-contracting on UK construction.
              </>
            }
            cite="Source: Housing Grants, Construction and Regeneration Act 1996 (c.53) and Local Democracy Economic Development and Construction Act 2009 (c.20) — paraphrased from legislation.gov.uk."
          />

          <RegsCallout
            source="Consumer Rights Act 2015 — services contracts (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The Consumer Rights Act 2015 governs domestic / consumer contracts for
                  services:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>
                    Service must be performed with reasonable care and skill (s.49).
                  </li>
                  <li>
                    Service must be performed within a reasonable time if no time agreed
                    (s.52).
                  </li>
                  <li>
                    Reasonable price if no price agreed (s.51).
                  </li>
                  <li>
                    Consumer entitled to repeat performance, price reduction or refund if
                    service falls below standard (s.55-56).
                  </li>
                </ul>
              </>
            }
            meaning={
              <>
                Domestic customers are protected by the Consumer Rights Act 2015. Your work
                must be done with reasonable care and skill; if it isn&apos;t, the customer
                can require you to put it right (or get a price reduction / refund). State
                clear quotes and timeframes upfront. Document the work properly. The Act
                doesn&apos;t prevent customers from making frivolous claims but it gives them
                real rights when work falls short.
              </>
            }
            cite="Source: Consumer Rights Act 2015 (c.15), Part 1 Chapter 4 (Services) — paraphrased from legislation.gov.uk."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Quoting day rate without accounting for unbillable days"
            whatHappens={
              <>
                Newly self-employed electrician quotes &pound;250/day to customers based on
                expected take-home target. Year 1 actual: 200 billable days (after holidays,
                sick, weather, between jobs). Headline gross &pound;50k. After overheads
                (&pound;15k), tax (&pound;9k) actual take-home &pound;26k &mdash; below the
                target. Frustrated, increases day rate next year, loses customers to cheaper
                competitors, ends up under-earning even more.
              </>
            }
            doInstead={
              <>
                Plan day rates from desired take-home backwards. Decide target take-home
                (say &pound;35k). Add tax burden (~&pound;13k). Add overheads
                (&pound;15-20k). That gives required gross &pound;63-68k. Divide by realistic
                billable days (180-200). That gives day rate &pound;320-380. If the market
                won&apos;t bear that, you need either to specialise (premium rate) or cut
                overheads (sole trader vs Ltd, comparison shop insurance, etc.). Don&apos;t
                under-price out of fear.
              </>
            }
          />

          <Scenario
            title="Commercial main contractor 60 days late on a £8,000 invoice — what's the play?"
            situation={
              <>
                You sub-contracted electrical work on a small office fit-out. Total
                &pound;8,000 invoice issued 30 September with Net 30 terms. Today is 30
                November &mdash; 60 days overdue. Three reminder emails ignored. Main
                contractor is well-known regional firm, not a small one-man band.
                You&apos;re carrying the cash flow strain; rent is due.
              </>
            }
            whatToDo={
              <>
                <strong>Step 1 &mdash; phone, don&apos;t just email</strong>. Email is easy
                to ignore. Phone the main contractor&apos;s accounts payable directly. Get a
                specific person on the line. Ask for a specific date the payment will be
                made. Take their name and email a follow-up to confirm.
                <br /><br />
                <strong>Step 2 &mdash; if the call doesn&apos;t produce a date, send a
                Statutory Demand</strong>. Cite the Late Payment of Commercial Debts Act
                1998. Quote the statutory interest rate (BoE base + 8%, currently
                ~13-14%) and the debt recovery fee (&pound;100 for invoice over
                &pound;10k; &pound;70 for &pound;1k-9,999). Set a 7-day deadline.
                <br /><br />
                <strong>Step 3 &mdash; consider the Construction Act adjudication route</strong>.
                If the work was construction-sector (which fit-out is), the Construction
                Act 1996 gives you the right to refer the dispute to adjudication &mdash;
                a 28-day fast-track dispute resolution. Adjudicator decision is binding
                pending court resolution. Quick and cheap (typically &pound;500-2,000 in
                fees).
                <br /><br />
                <strong>Step 4 &mdash; small claims as backup</strong>. For undisputed
                debts under &pound;10k, the small claims court process is online, cheap
                (around &pound;400 issue fee for &pound;5k-10k claims) and quick.
                Issue the claim through Money Claim Online (mcol.gov.uk).
                <br /><br />
                <strong>Step 5 &mdash; learn the lesson for next time</strong>. Sub-contract
                terms with this main contractor probably specify Net 30 but don&apos;t
                signal what happens if they don&apos;t pay. For future contracts with this
                firm: shorter terms (Net 14), staged payments rather than all-on-completion,
                or simply don&apos;t take their work. Your time and capital are valuable.
              </>
            }
            whyItMatters={
              <>
                Late payment is one of the biggest threats to small electrical firms. It
                ties up cash that pays for materials, wages and your living expenses. The
                statutory protections exist for a reason &mdash; use them. Most main
                contractors hate the bad PR of formal disputes and pay quickly when chased
                properly. The cost of inaction (you carrying the loan against your business)
                is bigger than the cost of action (a few hours chasing properly).
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Pricing structures and the cash-flow reality</ContentEyebrow>

          <ConceptBlock
            title="The three pricing models — fixed, day-rate, T&M and when each works"
            plainEnglish="Electrical pricing typically uses one of three models. Fixed price (lump sum) — most common for domestic and small commercial — total quoted up-front, customer pays the same regardless of actual hours; risk and reward sit with the contractor. Day rate (or hourly rate) — most common for maintenance, fault-finding, additions to existing installs — customer pays for actual time worked plus materials; risk sits with customer. T&M (Time and Materials) — common on uncertain-scope work — customer pays time at agreed rate + materials at cost or with markup; risk sits with customer. Pick the model that matches the certainty of scope."
            onSite="Common mistake: pricing uncertain-scope work as fixed-price, then losing money when the scope expands. If a domestic rewire job has unknown access challenges, quote on a day rate or T&M basis with a written ceiling cap. If a customer demands fixed price on uncertain scope, build a contingency (typically 10-25%) into the quote and document assumptions clearly. The clearer your assumptions in writing, the easier the variation conversation when the unexpected hits. Day rate work is generally lower-stress but lower-margin; fixed price is higher-stress but higher upside if you estimate accurately."
          >
            <p>
              When to use each pricing model:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fixed price</strong> &mdash; well-defined scope (consumer unit change, EV charger install, EICR).
              </li>
              <li>
                <strong>Day rate</strong> &mdash; maintenance, fault-finding, additions, unscoped urgent work.
              </li>
              <li>
                <strong>T&amp;M with ceiling</strong> &mdash; scope uncertain but customer wants budget cap.
              </li>
              <li>
                <strong>Schedule of rates</strong> &mdash; framework contracts, maintenance contracts.
              </li>
              <li>
                <strong>Per-point pricing</strong> &mdash; commercial fit-out (price per socket, per light fitting).
              </li>
              <li>
                <strong>Cost-plus</strong> &mdash; rare in electrical; specialist or government work.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Materials markup — the rules of thumb and where they break"
            plainEnglish="Standard materials markup in UK electrical work runs 15-30% on top of trade purchase price for small items, 10-20% for larger items, near-cost for high-value branded items where the customer can price-check easily online. Wholesale buying matters — Edmundson, Newey & Eyre (Rexel), CEF, City Electrical Factors all run trade accounts with discounts of 30-60% off list. The retail price the customer sees on Amazon or Screwfix isn't the trade price — passing trade price + 20% markup to the customer still saves them money vs DIY-buying retail and pays you fair margin."
            onSite="Practical materials pricing: maintain trade accounts with at least two wholesalers for backup and competitive pricing; track common items' trade prices in a spreadsheet so you can quote quickly; build the markup into your hourly rate's 'true cost' calculation; never quote materials at cost-only on a fixed-price job (you absorb price risk and have no margin for waste/error). On larger jobs the customer may ask for an itemised quote — provide quantities and unit rates, but don't reveal trade discount. Many electricians use a flat 20% markup as standard with judgement-based exceptions (high-value branded items, scarce items)."
          >
            <p>
              Materials markup principles:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Standard markup</strong> &mdash; 15&ndash;30% on trade price for small items.
              </li>
              <li>
                <strong>Larger items</strong> &mdash; 10&ndash;20% (consumer units, large cable runs).
              </li>
              <li>
                <strong>Branded high-value</strong> &mdash; near-cost where customer can price-check (e.g. Tesla Powerwall, specific PV panels).
              </li>
              <li>
                <strong>Trade accounts</strong> &mdash; Edmundson, Newey &amp; Eyre, CEF, City Electrical Factors.
              </li>
              <li>
                <strong>Trade discount</strong> &mdash; typically 30&ndash;60% off list price; varies by account size.
              </li>
              <li>
                <strong>Waste allowance</strong> &mdash; build 5&ndash;10% materials waste into estimate.
              </li>
              <li>
                <strong>Cash-flow buffer</strong> &mdash; materials paid up-front, paid back via customer invoice 30+ days later.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Retention money — the construction-industry cash trap"
            plainEnglish="On commercial construction projects the main contractor typically holds 'retention money' — usually 5% of each interim payment — to cover the risk of defects appearing post-completion. Half is released at practical completion, half at the end of the defects liability period (typically 12 months post-PC). This is a substantial sum — £5k retention on a £100k project — held for 12+ months without interest. As an electrical sub-contractor you carry this cash flow. The Construction Act 1996 (Housing Grants, Construction and Regeneration Act 1996, as amended) regulates payment terms but doesn't ban retention."
            onSite="Build retention into your cash-flow model from day one — never assume the headline contract value is what hits your bank account. Track retention separately on every contract. Chase release at practical completion proactively (it's not automatic). Chase the second half release at end of DLP — many main contractors hope you forget. Contracts under JCT or NEC standard forms have specific retention release procedures. The Government has been consulting on retention reform (potential ban or trust accounts) for several years — check current position. The Aldous Bill push for retention reform continues to be active in Parliament."
          >
            <p>
              Retention money mechanics:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Typical rate</strong> &mdash; 5% of each interim payment, sometimes 3% on large contracts.
              </li>
              <li>
                <strong>First half release</strong> &mdash; at Practical Completion (PC).
              </li>
              <li>
                <strong>Second half release</strong> &mdash; at end of Defects Liability Period (typically 12 months post-PC).
              </li>
              <li>
                <strong>Cash-flow impact</strong> &mdash; substantial &mdash; 5% of project value held interest-free.
              </li>
              <li>
                <strong>Chase proactively</strong> &mdash; both halves; not automatic.
              </li>
              <li>
                <strong>Construction Act 1996</strong> &mdash; payment regulation framework; doesn't ban retention.
              </li>
              <li>
                <strong>Aldous Bill</strong> &mdash; ongoing parliamentary push for retention reform.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Late Payment of Commercial Debts Regulations 2013 + Late Payment of Commercial Debts (Interest) Act 1998"
            clause={
              <>
                <p className="mb-2">
                  Where a commercial debt remains unpaid past the contractual payment date (or 30 days from the
                  invoice date if no contract terms), the creditor (you) is entitled to:
                </p>
                <ul className="space-y-1 list-disc pl-5 text-[14px]">
                  <li>Statutory interest at Bank of England base rate + 8% per annum.</li>
                  <li>A fixed compensation sum based on debt size: £40 for debts under £1,000, £70 for £1,000–£9,999, £100 for £10,000+.</li>
                  <li>Reasonable debt recovery costs over and above the fixed compensation.</li>
                  <li>The right to enforce these statutory entitlements without separate court action — they apply by operation of law.</li>
                </ul>
              </>
            }
            meaning={
              <>
                The Late Payment regime is one of the strongest tools available to a small electrical contractor
                against late-paying commercial customers. Most small businesses never invoke it &mdash; either
                because they don't know it exists, or they fear damaging the customer relationship. In practice,
                politely citing the statutory entitlement on a reminder invoice often triggers payment within days.
                The fixed compensation sum (£40&ndash;£100 per overdue invoice) plus interest at base rate + 8%
                accumulates rapidly on a chunky retention or final-account payment. Don't be shy &mdash; this is
                Parliament's gift to small businesses.
              </>
            }
            cite="Source: Late Payment of Commercial Debts (Interest) Act 1998 + Late Payment of Commercial Debts Regulations 2013 — paraphrased from legislation.gov.uk."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "UK day rates vary by region (London/SE premium) and specialism (CompEx, rail, BAFE all command premium). £200-400/day standard install; £350-700+/day specialist.",
              "Real take-home is 50-70% of headline day rate after overheads (insurance, scheme membership, vehicle, holidays, sick pay, pension).",
              "Materials markup typically 15-30% — covers ordering admin, transport, working capital, value of selecting right materials. Standard practice.",
              "Late Payment of Commercial Debts (Interest) Act 1998 gives automatic right to BoE base + 8% interest plus debt recovery cost on overdue commercial invoices.",
              "Net 30 is standard UK commercial; domestic typically 7-14 days or on completion. State clear payment terms on every invoice.",
              "Construction Act 1996 prohibits most 'pay when paid' clauses and gives right to 28-day adjudication for payment disputes.",
              "Retention money (3-5% on commercial contracts) ties up cash for 12+ months; consider retention bonds for cash flow.",
              "MTD-compliant cloud accounting (Xero, QuickBooks, FreeAgent) £15-30/month is the standard for any electrical firm above hobby scale.",
              "Consumer Rights Act 2015 protects domestic customers — work must be performed with reasonable care and skill; clear quotes and timeframes upfront.",
              "Keep records 6+ years for HMRC; cloud accounting makes this automatic.",
            ]}
          />

          <Quiz title="Pricing + invoicing — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section3-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.2 Insurance stack
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section3-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.4 Customer-facing
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
