import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Calculator,
  Receipt,
  TrendingUp,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Scale,
  Clock,
  Send,
  Ban,
  BarChart3,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/going-self-employed-electrician' },
  { label: 'Debt Recovery', href: '/guides/debt-recovery-electricians' },
];

const tocItems = [
  { id: 'prevention', label: 'Prevention: Getting It Right Upfront' },
  { id: 'payment-terms', label: 'Payment Terms That Work' },
  { id: 'chasing-payment', label: 'Chasing Late Payment' },
  { id: 'late-payment-interest', label: 'Late Payment Interest' },
  { id: 'letter-before-action', label: 'Letter Before Action' },
  { id: 'small-claims', label: 'Small Claims Court' },
  { id: 'statutory-demand', label: 'Statutory Demand' },
  { id: 'credit-control', label: 'Credit Control Best Practice' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Prevention is better than recovery — clear payment terms, written quotes, and invoicing on completion drastically reduce the chance of non-payment.',
  'Under the Late Payment of Commercial Debts Act 1998, you can charge interest at 8% above the Bank of England base rate on overdue invoices from business customers, plus a fixed compensation amount.',
  'A formal Letter Before Action gives the debtor 14 days to pay and signals that you are serious about legal proceedings. Most disputes are resolved at this stage.',
  'Small Claims Court (for debts up to £10,000) is straightforward, low-cost (£35 to £455 court fee), and does not require a solicitor. You can file online.',
  'Elec-Mate invoicing app lets you create and send professional invoices on site, track payment status, and send automated payment reminders — reducing late payment by getting invoices out immediately.',
];

const faqs = [
  {
    question: 'Can I charge interest on late payments?',
    answer:
      'Yes, if the debt is a commercial debt (business-to-business). Under the Late Payment of Commercial Debts (Interest) Act 1998, you can charge interest at 8% above the Bank of England base rate on invoices that are not paid by the agreed payment date. You can also claim a fixed compensation amount: £40 for debts up to £999.99, £70 for debts of £1,000 to £9,999.99, and £100 for debts of £10,000 or more. You can also claim reasonable recovery costs on top. For domestic customers (consumers), the position is different — you can only charge interest if the contract explicitly includes a late payment interest clause. Even without a contractual clause, you can claim statutory interest in court at 8% above base rate. To protect yourself, include a clear late payment clause in your terms and conditions and on every invoice.',
  },
  {
    question: 'How do I take someone to Small Claims Court?',
    answer:
      'Small Claims Court handles claims up to £10,000 in England and Wales. The process is: 1) Send a Letter Before Action giving the debtor 14 days to pay. 2) If they do not pay, file a claim online at Money Claims Online (MCOL) or by paper form N1. The court fee is based on the claim value: £35 for claims up to £300, £50 for £300 to £500, £70 for £500 to £1,000, £105 for £1,000 to £1,500, £185 for £1,500 to £3,000, £310 for £3,000 to £5,000, and £455 for £5,000 to £10,000. 3) The defendant has 14 days to respond. They can admit the claim, defend it, or file a counterclaim. 4) If they do not respond, you can request a default judgement. 5) If they defend, the case goes to a small claims hearing — an informal process where you present your evidence (invoices, contracts, photos, messages). You do not need a solicitor. 6) If you win, the court issues a judgement for the amount owed plus court fees and interest.',
  },
  {
    question: 'What is a Letter Before Action?',
    answer:
      'A Letter Before Action (LBA), also called a letter of claim, is a formal letter sent to the debtor stating the amount owed, the basis of the debt (reference to the invoice, contract, or agreement), a deadline to pay (usually 14 days), and a clear statement that if payment is not received by the deadline, you will issue court proceedings without further notice. The LBA is a required step before filing a court claim — the court expects you to have attempted to resolve the matter before involving them. In practice, a well-written LBA resolves most payment disputes because it demonstrates you are serious and prepared to take legal action. The debtor also knows that a court judgement will appear on their credit record. Send the LBA by recorded delivery or email with read receipt so you can prove it was delivered.',
  },
  {
    question: 'What happens if the customer disputes the work?',
    answer:
      'If the customer refuses to pay because they claim the work is defective or incomplete, the situation is more complex. Document everything: take photographs of the completed work, keep copies of all correspondence, and retain any test results or certificates. If the dispute is genuine (you made an error), the professional approach is to rectify the defect and then invoice for the agreed amount. If the dispute is not genuine (the customer is using a fabricated complaint to avoid payment), gather your evidence and proceed with the Letter Before Action and Small Claims Court if necessary. Having thorough documentation — photographs, signed completion forms, test results, and certificates issued through Elec-Mate — significantly strengthens your position. In court, the judge will look at the evidence: what was agreed, what was delivered, and whether the work meets the relevant standards (BS 7671).',
  },
  {
    question: 'Should I ask for a deposit before starting work?',
    answer:
      'Yes, for larger jobs. Asking for a deposit is standard practice and protects you from non-payment. For domestic work, a typical deposit is 25% to 50% of the total quote, payable before work starts. This covers your initial material costs and demonstrates the customer commitment. For very large jobs (full rewires, commercial projects), you can structure staged payments: 25% deposit, 25% at first fix, 25% at second fix, and 25% on completion and sign-off. Include the deposit requirement clearly in your written quote. For smaller jobs (under £200), a deposit is usually unnecessary — but invoice immediately on completion. For commercial and subcontract work, payment terms are often dictated by the contract (14, 30, or 60 days) — but you can negotiate a deposit or staged payments for larger packages of work.',
  },
  {
    question: 'Can I refuse to issue certificates until I am paid?',
    answer:
      'This is a grey area. Under BS 7671 and the Building Regulations, electrical certificates (EICs, Minor Works Certificates) must be issued to the person ordering the work. Withholding a certificate to force payment could be seen as a breach of your regulatory obligations and could cause problems with your competent person scheme. However, you are under no obligation to issue certificates for work you have not been fully paid for if the customer is in breach of the contract by non-payment. In practice, the safest approach is: issue the certificate (fulfilling your regulatory duty), invoice for the full amount, and pursue the debt through normal channels. If you withhold the certificate and the customer complains to your scheme provider, you could face disciplinary action. The better approach is to prevent the problem: take a deposit, invoice on completion, and have clear payment terms.',
  },
  {
    question: 'What is a statutory demand?',
    answer:
      'A statutory demand is a formal demand for payment of a debt of £5,000 or more (for individuals) or £750 or more (for companies). It is served on the debtor and gives them 21 days to pay, come to a payment arrangement, or apply to the court to have the demand set aside. If the debtor does not respond within 21 days, you can petition for their bankruptcy (individual) or winding up (company). This is a serious step and should only be used when other recovery methods have failed. A statutory demand does not require a court judgement — you can serve one based on an undisputed debt. The cost of the statutory demand itself is minimal (it is just a form), but if you proceed to a bankruptcy or winding-up petition, the court fees and legal costs increase significantly. Many debts are paid immediately after a statutory demand is served because the debtor wants to avoid insolvency proceedings.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/going-self-employed-electrician',
    title: 'Going Self-Employed',
    description:
      'Set up your business right from the start — including payment terms and credit control.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-tax-guide-uk',
    title: 'Electrician Tax Guide UK',
    description:
      'Bad debts are an allowable expense for tax purposes. Full guide to electrician tax.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/hourly-rate-calculator-electrician',
    title: 'Hourly Rate Calculator',
    description:
      'Price your work correctly so customers see the value — reducing disputes and late payment.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/cis-for-electricians',
    title: 'CIS for Electricians',
    description: 'CIS payment terms, deduction statements, and getting paid on subcontract work.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-insurance-uk',
    title: 'Electrician Insurance UK',
    description: 'Legal expenses cover can help with debt recovery costs. Full insurance guide.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/invoice-generator',
    title: 'Invoice App',
    description:
      'Create and send professional invoices on site. Track payment status and send automated reminders.',
    icon: Receipt,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'prevention',
    heading: 'Prevention: The Best Debt Recovery Strategy',
    content: (
      <>
        <p>
          The best approach to debt recovery is to avoid bad debts in the first place. Most
          non-payment issues are preventable with clear communication, written agreements, and
          prompt invoicing.
        </p>
        <p>
          Every electrician has a horror story: a customer who vanishes after the work is done, a
          builder who keeps promising "next week," or a landlord who disputes the bill months later.
          These situations are stressful, time-consuming, and expensive. But in most cases, they
          could have been avoided with better systems upfront.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Always provide a written quote.</strong> A verbal agreement is hard to
                enforce. A written quote — even a simple one sent by email or WhatsApp — documents
                what was agreed, the price, and the payment terms. Elec-Mate's{' '}
                <SEOInternalLink href="/tools/quote-generator">quoting app</SEOInternalLink>{' '}
                generates professional quotes from your phone in minutes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get written acceptance.</strong> Before starting work, get the customer to
                accept the quote — by email, text, or signature. This creates a binding contract.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Take a deposit on larger jobs.</strong> A 25% to 50% deposit for jobs over
                £500 covers your initial costs and demonstrates customer commitment. Customers who
                refuse to pay a deposit are a red flag.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Invoice immediately on completion.</strong> Do not wait days or weeks. Send
                the invoice before you leave the property. The longer you wait, the less urgency the
                customer feels to pay.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Invoice on site — before you leave the driveway"
          description="Elec-Mate lets you create and send professional invoices from your phone the moment the job is complete. Track payment status and send automated reminders. Get paid faster by invoicing faster."
          icon={Send}
        />
      </>
    ),
  },
  {
    id: 'payment-terms',
    heading: 'Payment Terms That Protect You',
    content: (
      <>
        <p>
          Your payment terms should be clearly stated on every quote and every invoice. Vague or
          absent payment terms make it harder to chase late payment and weaken your position if you
          need to take legal action.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic customers:</strong> Payment on completion is the standard for
                domestic electrical work. State clearly: "Payment due on completion of work." For
                larger domestic jobs, consider staged payments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial customers:</strong> 14-day or 30-day payment terms are common.
                State clearly: "Payment due within 14 days of invoice date." Be cautious with 60-day
                or 90-day terms — they strain your cash flow.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Subcontract/CIS work:</strong> Payment terms are often set by the main
                contractor — typically 14 to 30 days after you submit an application for payment.
                Read the contract carefully. Some contracts require you to submit payment
                applications on specific dates.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Include a late payment clause on every invoice: "Interest will be charged at 8% above the
          Bank of England base rate on invoices not paid by the due date, in accordance with the
          Late Payment of Commercial Debts (Interest) Act 1998." This puts the customer on notice
          and gives you a legal basis for charging interest.
        </p>
        <p>
          Also consider offering a small discount for prompt payment — for example, 2% discount for
          payment within 7 days. This incentivises early payment without costing you much, and
          regular customers who always pay quickly appreciate it.
        </p>
      </>
    ),
  },
  {
    id: 'chasing-payment',
    heading: 'Chasing Late Payment: The Escalation Process',
    content: (
      <>
        <p>
          When an invoice goes overdue, follow a structured escalation process. Stay professional,
          keep records of every communication, and escalate steadily.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Day 1 to 3 Overdue: Friendly Reminder</h4>
                <p className="text-white text-sm leading-relaxed">
                  Send a polite reminder by text or email: "Hi [Name], just a reminder that invoice
                  #[number] for £[amount] was due on [date]. Could you arrange payment at your
                  convenience? Happy to answer any questions." Most late payments are resolved at
                  this stage — people forget, they have been busy, the invoice got lost.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Day 7 to 14 Overdue: Firm Follow-Up</h4>
                <p className="text-white text-sm leading-relaxed">
                  Send a firmer reminder by email: "Invoice #[number] for £[amount] is now [X] days
                  overdue. Please arrange payment within 7 days. If there is an issue with the
                  invoice or the work, please let me know so we can resolve it." Try calling the
                  customer directly — a phone call is harder to ignore than an email.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Day 14 to 28 Overdue: Final Warning</h4>
                <p className="text-white text-sm leading-relaxed">
                  Send a final warning by email and recorded post: "This is a final reminder for
                  invoice #[number] for £[amount], now [X] days overdue. If payment is not received
                  within 7 days, I will have no option but to pursue the matter through formal debt
                  recovery procedures, which may include court action and interest charges." This is
                  the last step before the Letter Before Action.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Keep a copy of every message, email, and letter. If the matter goes to court, you will
          need to demonstrate that you made reasonable efforts to resolve the matter before filing a
          claim.
        </p>
      </>
    ),
  },
  {
    id: 'late-payment-interest',
    heading: 'Late Payment Interest: Your Legal Right',
    content: (
      <>
        <p>
          The Late Payment of Commercial Debts (Interest) Act 1998 gives you the legal right to
          charge interest on overdue invoices from business customers — even if your contract does
          not mention it.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Interest rate:</strong> 8% above the Bank of England base rate (currently
                4.5%, so the statutory interest rate is 12.5%). Interest accrues daily from the day
                after the payment deadline.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fixed compensation:</strong> £40 for debts up to £999.99, £70 for debts of
                £1,000 to £9,999.99, £100 for debts of £10,000 or more. This is payable on top of
                the interest.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reasonable recovery costs:</strong> You can also claim the reasonable costs
                of recovering the debt — for example, the cost of sending recorded delivery letters.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Example: A contractor owes you £3,000 on a 30-day invoice. They pay 60 days late. The
          interest calculation: £3,000 x 12.5% / 365 x 60 = £61.64 in interest, plus £70 fixed
          compensation = £131.64 on top of the original £3,000.
        </p>
        <p>
          For domestic customers, statutory interest does not apply automatically — but you can
          include a late payment interest clause in your terms and conditions. If you go to court,
          you can ask the court to award interest at 8% above base rate regardless.
        </p>
        <p>
          In practice, quoting the Act and adding the interest calculation to your chasing
          correspondence often motivates payment. Most businesses do not want to pay interest and
          compensation on top of the original debt.
        </p>
      </>
    ),
  },
  {
    id: 'letter-before-action',
    heading: 'Letter Before Action: The Final Step Before Court',
    content: (
      <>
        <p>
          A Letter Before Action (LBA) is a formal, final demand for payment that warns the debtor
          you will issue court proceedings if they do not pay within a specified period (usually 14
          days). It is a required step before filing a court claim — the court expects you to have
          tried to resolve the matter before involving them.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <p className="text-white font-bold mb-4">Your Letter Before Action should include:</p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Your full name and business details</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>The debtor's full name and address</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>The amount owed, including any interest and compensation</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>A summary of the debt (invoice number, date, work completed)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>A deadline to pay (14 days from the date of the letter)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                A statement that if payment is not received by the deadline, you will issue court
                proceedings without further notice
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                A reference to the Late Payment of Commercial Debts Act 1998 (if applicable)
              </span>
            </li>
          </ul>
        </div>
        <p>
          Send the LBA by recorded delivery and by email. Keep proof of postage and the email
          delivery receipt. The LBA resolves most outstanding debts — because the debtor knows you
          are serious and that a County Court Judgement (CCJ) will appear on their credit record if
          they ignore it.
        </p>
      </>
    ),
  },
  {
    id: 'small-claims',
    heading: 'Small Claims Court: How It Works',
    content: (
      <>
        <p>
          If the Letter Before Action does not produce payment, the next step is Small Claims Court.
          For debts up to £10,000 in England and Wales, the small claims track is straightforward,
          relatively cheap, and does not require a solicitor.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1: File online.</strong> Go to Money Claims Online (MCOL) at
                moneyclaims.service.gov.uk and file your claim. You will need the debtor's full name
                and address, the amount owed, and a brief description of the claim. Court fees: £35
                (up to £300), £50 (£300 to £500), £70 (£500 to £1,000), £105 (£1,000 to £1,500),
                £185 (£1,500 to £3,000), £310 (£3,000 to £5,000), £455 (£5,000 to £10,000).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2: Defendant responds.</strong> The defendant has 14 days to respond.
                They can: admit the claim and offer to pay (in full or by instalments), defend the
                claim (dispute it), file a counterclaim, or not respond at all.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3: Default judgement or hearing.</strong> If they do not respond, you
                apply for a default judgement — the court orders them to pay without a hearing. If
                they defend, the case goes to a small claims hearing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4: Small claims hearing.</strong> An informal hearing before a district
                judge. You present your evidence (invoices, quotes, photos, messages, certificates).
                The judge asks questions, hears both sides, and makes a decision. You do not need a
                solicitor. The hearing typically lasts 1 to 2 hours.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you win, the court orders the defendant to pay the amount owed plus court fees and
          interest. A County Court Judgement (CCJ) is recorded against the debtor's credit file for
          6 years — which can affect their ability to get mortgages, loans, and credit cards. Most
          debtors pay promptly after a CCJ is issued.
        </p>
        <p>
          Having good documentation is critical. Keep every{' '}
          <SEOInternalLink href="/tools/invoice-generator">invoice</SEOInternalLink>, quote, email,
          text message, photograph, and certificate related to the job. Elec-Mate stores all of
          these digitally, giving you an airtight evidence trail if you need to go to court.
        </p>
      </>
    ),
  },
  {
    id: 'statutory-demand',
    heading: 'Statutory Demand: The Nuclear Option',
    content: (
      <>
        <p>
          For debts of £5,000 or more (individuals) or £750 or more (companies), a statutory demand
          is a powerful debt recovery tool. It is the formal step before insolvency proceedings —
          and it gets attention.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>What it is:</strong> A formal written demand requiring the debtor to pay a
                specified debt within 21 days. If they do not pay, you can petition for their
                bankruptcy (individual) or winding up (company).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>The 21-day deadline:</strong> The debtor has 21 days from the date of
                service to pay the debt in full, come to a reasonable payment arrangement, or apply
                to the court to have the demand set aside (on grounds that the debt is disputed or
                there is a cross-claim).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cost:</strong> The statutory demand itself is a form — there is no court fee
                to serve it. However, if you proceed to a bankruptcy or winding-up petition, the
                court fee is significant (£990 for bankruptcy, £1,600+ for winding up) and you may
                need legal advice.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A statutory demand should only be used for undisputed debts where the debtor has the
          ability to pay but is refusing to do so. If the debt is genuinely disputed, the court may
          set aside the demand and you could be ordered to pay the debtor's costs. Use it as a last
          resort after the Letter Before Action and Small Claims Court have been exhausted — or when
          the debt is large enough that the costs are justified.
        </p>
        <p>
          In practice, many debts are paid within days of a statutory demand being served. The
          prospect of insolvency proceedings focuses the mind.
        </p>
      </>
    ),
  },
  {
    id: 'credit-control',
    heading: 'Credit Control Best Practice for Electricians',
    content: (
      <>
        <p>
          Good credit control is not about being aggressive — it is about having systems that make
          late payment less likely and recovery easy when it happens. Here are the practices that
          the best-run electrical businesses follow:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written quotes with clear payment terms.</strong> Every job should start
                with a written quote that states the price, what is included, and when payment is
                due. Use Elec-Mate's{' '}
                <SEOInternalLink href="/tools/quote-generator">quoting app</SEOInternalLink> to
                generate professional quotes in minutes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Invoice immediately on completion.</strong> Do not wait until the weekend to
                do your invoicing. Send invoices from site, before you leave, using{' '}
                <SEOInternalLink href="/tools/invoice-generator">
                  Elec-Mate's invoice app
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Offer multiple payment methods.</strong> Bank transfer, card payment, and
                cash. The easier you make it to pay, the faster you get paid. Consider a card reader
                for on-site payments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Review your aged debtors weekly.</strong> Check which invoices are overdue
                and follow up immediately. Do not let debts age — the older a debt gets, the harder
                it is to collect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Ban className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Blacklist persistent non-payers.</strong> If a customer has a history of
                late payment, require payment upfront for future work — or stop working for them
                entirely. Your time is better spent on customers who pay on time.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate's{' '}
          <SEOInternalLink href="/tools/expense-tracker">business analytics</SEOInternalLink> show
          you your average payment collection time, outstanding invoices, and cash flow forecast.
          Use this data to identify problem customers early and adjust your credit control
          accordingly.
        </p>
        <SEOAppBridge
          title="Get paid faster with professional invoicing and payment tracking"
          description="Elec-Mate lets you create and send professional invoices from your phone, track payment status in real time, and send automated reminders for overdue invoices. Stop chasing — start getting paid. 7-day free trial."
          icon={BarChart3}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function DebtRecoveryElectricianPage() {
  return (
    <GuideTemplate
      title="Debt Recovery for Electricians | Getting Paid UK Guide"
      description="Complete guide to debt recovery for UK electricians. Covers payment terms, late payment interest under the 1998 Act, Letter Before Action, Small Claims Court, statutory demand, and credit control best practice."
      datePublished="2026-01-25"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Getting Paid"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Debt Recovery for Electricians:{' '}
          <span className="text-yellow-400">Getting Paid What You Are Owed</span>
        </>
      }
      heroSubtitle="Non-payment is one of the biggest frustrations for self-employed electricians. This guide covers everything — from prevention and payment terms to late payment interest, Letter Before Action, Small Claims Court, and statutory demand. Practical, step-by-step advice for getting your money."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Debt Recovery for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Send Professional Invoices and Get Paid Faster"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to send professional invoices on site, track payments in real time, and manage cash flow. Stop losing money to late payment. 7-day free trial, cancel anytime."
    />
  );
}
