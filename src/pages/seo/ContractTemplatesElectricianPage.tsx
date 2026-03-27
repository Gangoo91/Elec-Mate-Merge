import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileText,
  PoundSterling,
  ClipboardList,
  AlertTriangle,
  ShieldCheck,
  CheckCircle,
  Scale,
  Users,
  Building2,
  Clock,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business Guides', href: '/guides/business' },
  { label: 'Contract Templates for Electricians', href: '/contract-templates-electrician' },
];

const tocItems = [
  { id: 'why-contracts-matter', label: 'Why Written Contracts Matter' },
  { id: 'consumer-contracts-regs', label: 'Consumer Contracts Regulations 2013' },
  { id: 'contract-essentials', label: 'Essential Contract Terms' },
  { id: 'payment-schedules', label: 'Payment Schedules' },
  { id: 'variation-orders', label: 'Variation Orders' },
  { id: 'defects-liability', label: 'Defects Liability Period' },
  { id: 'retention', label: 'Retention' },
  { id: 'dispute-resolution', label: 'Dispute Resolution' },
  { id: 'for-electricians', label: 'Contract Tools for Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 require you to provide domestic customers with specific pre-contract information and a 14-day cancellation right for off-premises contracts. Failing to provide this information can render the contract unenforceable.',
  'A customer contract should clearly state what work is included, what is excluded, the total price, how variations will be charged, and when payment is due. Disputes arising from contracts are almost always about scope, price, or payment terms that were not clearly stated upfront.',
  'Variation orders must be agreed in writing before additional work is carried out. A signed variation order is the only reliable protection against a customer refusing to pay for work that was agreed verbally but not included in the original contract.',
  'A defects liability period (typically 12 months) is the period during which you remain responsible for rectifying defects in your workmanship at no charge to the customer. After this period, remedial work can be charged at your normal rate.',
  'For commercial subcontract work, retention (typically 3 to 5 per cent of contract value) is held by the main contractor until practical completion (50 per cent released) and end of the defects liability period (balance released). Track your retention carefully — it is a significant sum across multiple contracts.',
];

const faqs = [
  {
    question: 'Do I need a written contract for electrical work?',
    answer:
      'There is no absolute legal requirement to have a written contract for electrical work, but the practical and legal case for one is overwhelming. A written contract: forms clear evidence of what was agreed; protects you if the customer disputes the price or scope; satisfies your obligations under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 (which require written pre-contract information for domestic customers); and gives you a basis to pursue payment through the courts if necessary. For domestic work, a professional written quote accepted by the customer is your contract. For commercial work, a formal written subcontract is essential.',
  },
  {
    question: 'What is the Consumer Contracts Regulations 2013 cancellation right?',
    answer:
      'The Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 give domestic (consumer) customers a 14-day right to cancel contracts entered into off-premises — which includes any contract signed at the customer\'s property. You must give the customer written notice of this right before the contract is concluded. If the customer asks you to start work within the 14-day period and then cancels, they must pay for work completed up to the point of cancellation. If you fail to inform the customer of their cancellation right, the cancellation period extends to 12 months — meaning the customer can cancel and demand a full refund for up to a year after the contract was made.',
  },
  {
    question: 'How long should a defects liability period be for electrical work?',
    answer:
      'For domestic work, a defects liability period of 12 months is standard and is the period recommended by Which? Trusted Traders and most trade bodies. During this period, you must rectify genuine defects in your workmanship at no additional charge. Note that a defect is a fault arising from poor workmanship or materials supplied by you — it does not cover damage caused by the customer or fair wear and tear. For commercial subcontract work, defects liability periods of 12 to 24 months are typical depending on the project type, and they run from the date of practical completion.',
  },
  {
    question: 'What should my payment terms say?',
    answer:
      'Your payment terms should state: when payment is due (e.g. "payment is due on practical completion" or "within 7 days of invoice"); how payment should be made (bank transfer preferred); what happens if payment is late (interest under the Late Payment of Commercial Debts (Interest) Act 1998 at 8 per cent above base rate for commercial contracts; your own stated rate for domestic customers); the deposit amount and when it is due; and for larger jobs, the stage payment milestones and amounts. For commercial subcontract work, payment terms are governed partly by the Housing Grants, Construction and Regeneration Act 1996 which sets minimum standards for payment timing that cannot be contracted out of.',
  },
  {
    question: 'Can I charge for a variation without the customer signing anything?',
    answer:
      'Technically you can carry out a variation based on a verbal instruction and then invoice for it, but recovering payment for uninstructed variations is very difficult without written evidence. The customer can simply deny that they asked for the additional work, and without written evidence you are in a "your word against theirs" situation. The correct process is: identify the additional work scope; issue a written variation order detailing the additional scope and price; get the customer\'s written acceptance (email confirmation is sufficient) before carrying out the work; and then include the variation in your final invoice.',
  },
  {
    question: 'What is retention in an electrical contract?',
    answer:
      'Retention is a percentage of each payment (typically 3 to 5 per cent) that the paying party withholds until the end of the defects liability period as security against incomplete or defective work. In domestic work, retention is uncommon — most homeowners pay in full on completion. In commercial subcontract work, retention is standard. Half of the retained amount is released at practical completion and the balance at the end of the defects liability period. Track your retention carefully across all contracts — it can represent a significant sum in aggregate. Note that there are ongoing legislative proposals (Retention Deposit Scheme) to reform how retention is held.',
  },
  {
    question: 'What dispute resolution options do I have if a customer refuses to pay?',
    answer:
      'For domestic customers, options include: formal letter before action (7 days notice of court proceedings); small claims court (claims up to £10,000 in England and Wales, online application via Gov.uk, court fee from £35); or a mediation service such as CEDR or Ombudsman Services. For commercial contracts, the Housing Grants, Construction and Regeneration Act 1996 gives you the right to adjudication at any time — an adjudicator\'s decision is binding within 28 days and enforceable through the courts. Adjudication is considerably faster than litigation and is the preferred route for commercial payment disputes.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/quote-writing-guide',
    title: 'Quote Writing Guide',
    description: 'Professional quote structure and pricing strategy for electrical work.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/subcontracting-guide',
    title: 'Subcontracting Guide',
    description: 'Finding main contractors and protecting your payment rights as a subcontractor.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/tender-writing-electrician',
    title: 'Tender Writing Guide',
    description: 'How to price and write winning commercial electrical tenders.',
    icon: ClipboardList,
    category: 'Guide',
  },
  {
    href: '/health-safety-audit-electrician',
    title: 'H&S Audit Guide',
    description: 'CDM 2015, RAMS, CHAS, and health and safety documentation.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/electrical-framework-contracts',
    title: 'Framework Contracts',
    description: 'Getting on local authority and housing association approved contractor lists.',
    icon: Building2,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-contracts-matter',
    heading: 'Why Written Contracts Matter for Electricians',
    content: (
      <>
        <p>
          Most disputes between electricians and customers arise from ambiguity about what was
          agreed — the scope of work, the price, who was responsible for making good, or when
          payment was due. A clear written contract, accepted before work begins, eliminates
          the vast majority of these disputes before they can arise.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Legal clarity</strong> — a signed written contract is the strongest
                evidence in any dispute. Without one, the case often comes down to your word
                against the customer's, and judges in the small claims court are reluctant to
                make findings of fact against customers when the contractor did not put the
                agreement in writing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional credibility</strong> — customers who receive a professional
                written contract perceive the contractor as more competent and trustworthy.
                A typed contract with clear terms is one of the most cost-effective ways to
                differentiate yourself from informal tradespeople.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulatory compliance</strong> — the Consumer Contracts (Information,
                Cancellation and Additional Charges) Regulations 2013 require specific
                pre-contract information to be provided to domestic customers. A written
                contract is the natural vehicle for providing this information.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For domestic work, your professional quote accepted by the customer is your contract.
          For commercial subcontract work, a formal written subcontract agreement is essential —
          see the{' '}
          <SEOInternalLink href="/subcontracting-guide">
            subcontracting guide
          </SEOInternalLink>{' '}
          for what subcontract agreements should include.
        </p>
      </>
    ),
  },
  {
    id: 'consumer-contracts-regs',
    heading: 'Consumer Contracts Regulations 2013 — Your Obligations',
    content: (
      <>
        <p>
          The Consumer Contracts (Information, Cancellation and Additional Charges) Regulations
          2013 are the primary legislation governing contracts between electricians and domestic
          customers. They were passed to implement the EU Consumer Rights Directive and remain
          in force in the UK after Brexit.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pre-contract information</strong> — before any contract is concluded you
                must provide the customer with: your identity and business address; a description
                of the services; the total price (or how it will be calculated if not known);
                the arrangements for payment; how long the contract will last; the customer's
                cancellation rights; and the existence of your workmanship guarantee.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>14-day cancellation right</strong> — for off-premises contracts (signed
                at the customer's property), the customer has 14 days to cancel without penalty.
                You must give written notice of this right. If you fail to do so, the
                cancellation period extends to 12 months.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Starting work in the cancellation period</strong> — if the customer
                asks you to start work within the 14-day period, they must give express written
                consent. If they then cancel, they must pay for work done up to the point of
                cancellation. Without written consent, you may not be able to charge for work
                started during the cancellation period.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional charges</strong> — you cannot add charges not disclosed
                before the contract was made. Any additional charges — for access equipment,
                parking, making good — must be disclosed in the pre-contract information if
                they are foreseeable.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'contract-essentials',
    heading: 'Essential Terms in Every Electrical Customer Contract',
    content: (
      <>
        <p>
          A domestic electrical customer contract should be clear enough that any reasonable
          person can understand what has been agreed without legal training. These are the
          essential terms that every contract must include.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Parties</strong> — your full company or trading name, address, and
                company/sole trader registration details. Customer's full name and the property
                address where the work will be carried out.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scope of works</strong> — a detailed description of what is included.
                The more specific, the better. Reference to drawings or specifications if
                applicable. Cross-reference your quote document if it contains the detail.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Exclusions</strong> — what is explicitly not included: making good,
                asbestos removal, third-party connections, planning permissions, Building
                Regulations application fees (separate from your notification fee), furniture
                moving.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Price and payment terms</strong> — the contract sum, VAT treatment,
                deposit amount, stage payment schedule (if applicable), and final payment date.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Programme</strong> — anticipated start date, duration, and any key
                milestones. Include a statement that the programme may be affected by unforeseen
                site conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification</strong> — confirm the electrical certificates you will
                provide on completion (Electrical Installation Certificate, Building Regulations
                compliance notification under Part P).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Guarantee</strong> — the duration and scope of your workmanship
                guarantee. Distinguish between workmanship (your responsibility) and product
                failure (manufacturer's warranty).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cancellation rights</strong> — the customer's statutory 14-day
                cancellation right (Consumer Contracts Regulations 2013) and what happens if
                they exercise it after work has begun.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'payment-schedules',
    heading: 'Payment Schedules for Electrical Work',
    content: (
      <>
        <p>
          A payment schedule sets out how and when the customer will pay throughout the project.
          For domestic work, a staged payment schedule protects your cashflow and reduces the
          risk of non-payment at the end of a project.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small domestic jobs (under £1,000)</strong> — full payment on completion.
                A deposit is not usually expected by customers on small jobs, and requesting one
                can seem unusual. Invoice promptly on completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium domestic jobs (£1,000 to £5,000)</strong> — 25 to 30 per cent
                deposit on acceptance, balance on practical completion. For jobs lasting more
                than one week, consider a mid-project payment at a defined milestone (e.g.
                completion of first fix).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Larger domestic jobs (rewires, extensions)</strong> — 30 per cent deposit,
                30 per cent at first fix, 30 per cent at second fix, 10 per cent on practical
                completion and handover of certificates. This structure reflects the actual cost
                profile of electrical installation work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial subcontract work</strong> — the Housing Grants, Construction
                and Regeneration Act 1996 requires interim payments at intervals of not less than
                28 days. Your payment application must be submitted in accordance with the
                subcontract programme. See the{' '}
                <SEOInternalLink href="/subcontracting-guide">
                  subcontracting guide
                </SEOInternalLink>{' '}
                for your full payment rights.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'variation-orders',
    heading: 'Variation Orders — Protecting Your Revenue',
    content: (
      <>
        <p>
          Variations (changes to the original agreed scope) are the most common source of
          revenue loss for electricians who do not use written variation orders. Customers
          frequently request additional work verbally during a job, and then refuse to pay
          for it at the end because "it was just a small extra".
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The variation order process</strong> — when additional work is requested:
                (1) pause and agree the scope of the additional work; (2) issue a written
                variation order with the scope and price; (3) get customer acceptance in writing
                before starting; (4) carry out the work; (5) include the variation on the invoice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Email is sufficient</strong> — a variation order does not need to be a
                formal document. An email from you describing the additional scope and price,
                followed by a reply from the customer accepting it, is a binding variation. Screenshot
                or save all such exchanges.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What your terms should say</strong> — your standard terms should include
                a clause stating that any additional work outside the agreed scope will be
                charged at your stated day rate plus materials, and that no additional work will
                be carried out without a signed or email-confirmed variation order.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardList className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unforeseen conditions</strong> — distinguish between variations requested
                by the customer and additional costs arising from unforeseen conditions (concealed
                wiring in worse condition than visible inspection suggested, asbestos, hidden
                structural elements). Unforeseen conditions are not variations — they are a
                change in contract price that should be addressed through your assumptions clause.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'defects-liability',
    heading: 'Defects Liability Period',
    content: (
      <>
        <p>
          A defects liability period (DLP) is the period after practical completion during which
          you remain responsible for rectifying genuine defects in your workmanship at no charge
          to the customer. It is distinct from a manufacturer's product warranty.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard DLP — 12 months</strong> — for domestic electrical work, 12
                months is the standard and the period recommended by NICEIC, NAPIT, and most
                consumer protection organisations. State the DLP clearly in your contract:
                "Elec-Mate provides a 12-month guarantee against defects in workmanship from
                the date of practical completion."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What constitutes a defect</strong> — a defect is a fault arising from
                poor workmanship, incorrectly specified materials (where you chose the
                specification), or materials supplied by you that are not fit for purpose.
                It does not include: fair wear and tear; damage caused by the customer or
                third parties; faults in materials supplied by the customer; or faults in
                existing electrical installations that were not part of your scope.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Manufacturer's warranty</strong> — electrical products (consumer units,
                luminaires, sockets) carry their own manufacturer's warranties, typically 2 to
                5 years. Product failure within the manufacturer's warranty period is a claim
                against the manufacturer, not necessarily against you (unless you supplied the
                product and made the selection).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'retention',
    heading: 'Retention in Commercial Electrical Contracts',
    content: (
      <>
        <p>
          Retention is a common feature of commercial subcontract electrical work. Understanding
          how retention works, how it is released, and how to track it across multiple contracts
          is essential for cashflow management.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical retention rates</strong> — 3 to 5 per cent of the gross value
                of each interim payment application. The retention is deducted from each payment
                and held by the main contractor. On a £200,000 electrical subcontract at 5 per
                cent retention, £10,000 is held.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Release</strong> — half the retention (e.g. £5,000) is typically released
                at practical completion of your section. The balance (e.g. £5,000) is released
                at the end of the defects liability period, usually 12 months after practical
                completion. Chase retention release actively — main contractors do not always
                release retention without prompting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retention reform</strong> — there are ongoing proposals for a Retention
                Deposit Scheme in the UK construction industry that would require retention to be
                held in a protected account rather than by the main contractor. Monitor industry
                developments — this would significantly reduce the risk of losing retention
                through main contractor insolvency.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dispute-resolution',
    heading: 'Dispute Resolution for Electrical Contractors',
    content: (
      <>
        <p>
          Despite the best contracts, disputes sometimes arise. Knowing your options — and
          using the least costly and most appropriate one — is essential for any electrical
          business.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Letter before action</strong> — always the first step. A formal letter
                stating the amount owed, the basis of the claim, and that you will take court
                action within 14 days if unpaid. Many disputes resolve at this stage without
                further action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small claims court</strong> — for domestic disputes up to £10,000
                (England and Wales). Online application via Gov.uk Money Claim Online. Court
                fees from £35 to £455 depending on claim value. No legal representation
                required. Usually resolved within 6 to 12 months.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Adjudication</strong> — for commercial subcontract disputes under the
                Housing Grants, Construction and Regeneration Act 1996. An adjudicator's decision
                is usually reached within 28 days of referral and is immediately enforceable.
                The fastest and most cost-effective route for commercial payment disputes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mediation</strong> — a voluntary process where both parties attempt to
                reach agreement with the assistance of a neutral mediator. Courts actively
                encourage mediation before litigation. Services include CEDR, the Civil
                Mediation Council, and sector-specific mediators.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'Contract and Documentation Tools for Electricians',
    content: (
      <>
        <p>
          The most effective contracts for electricians are those that are used consistently —
          the same professional template on every job. Elec-Mate provides the tools to build
          and manage your customer documentation efficiently.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Quotes as Contracts</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to generate professional quotes that double as customer contracts, including
                  payment terms, exclusions, and guarantee statements. Export to PDF and email
                  direct from site. See the{' '}
                  <SEOInternalLink href="/quote-writing-guide">
                    quote writing guide
                  </SEOInternalLink>{' '}
                  for what to include.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">RAMS and H&S Documentation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete your H&amp;S documentation alongside your customer contracts using
                  the Elec-Mate RAMS generator. Keep your H&amp;S policy, risk assessments, and
                  method statements current and professional. See the{' '}
                  <SEOInternalLink href="/health-safety-audit-electrician">
                    H&amp;S audit guide
                  </SEOInternalLink>{' '}
                  for full details.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage customer contracts and documentation with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for professional quoting, RAMS generation, invoice management, and AI business support. Build better customer relationships with professional documentation. 7-day free trial."
          icon={ClipboardList}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ContractTemplatesElectricianPage() {
  return (
    <GuideTemplate
      title="Electrical Contractor Contract Templates UK | Customer Contracts"
      description="What to include in a domestic customer contract for electrical work — Consumer Contracts Regulations 2013, payment schedules, variation orders, defects liability periods, retention, and dispute resolution for UK electrical contractors."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={Scale}
      heroTitle={
        <>
          Electrical Contractor Contracts:{' '}
          <span className="text-yellow-400">What to Include and Why</span>
        </>
      }
      heroSubtitle="What to include in domestic customer contracts for electrical work — Consumer Contracts Regulations 2013, payment schedules, variation orders, defects liability periods, retention, and dispute resolution. Protect your business with professional documentation."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Contractor Contracts"
      relatedPages={relatedPages}
      ctaHeading="Build Professional Customer Contracts with Elec-Mate"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for professional quoting, contracts, and business management. 7-day free trial, cancel anytime."
    />
  );
}
