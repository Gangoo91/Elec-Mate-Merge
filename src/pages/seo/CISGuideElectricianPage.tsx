import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileText,
  AlertTriangle,
  PoundSterling,
  Clock,
  ShieldCheck,
  ClipboardCheck,
  Zap,
  Building2,
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Finance Guides', href: '/guides/electrician-finance' },
  { label: 'CIS Guide for Electricians', href: '/cis-guide-electrician' },
];

const tocItems = [
  { id: 'what-is-cis', label: 'What Is the Construction Industry Scheme?' },
  { id: 'deduction-rates', label: 'CIS Deduction Rates (20% and 30%)' },
  { id: 'registering-cis', label: 'Registering for CIS' },
  { id: 'gross-payment-status', label: 'Gross Payment Status' },
  { id: 'monthly-returns', label: 'CIS Monthly Returns for Contractors' },
  { id: 'reclaiming-deductions', label: 'Reclaiming CIS Deductions' },
  { id: 'record-keeping', label: 'Record Keeping Requirements' },
  { id: 'for-electricians', label: 'Managing CIS with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Construction Industry Scheme (CIS) requires contractors to deduct tax from payments to subcontractors and pay it directly to HMRC. It applies to electrical installation work on construction projects.',
  'Electricians registered with HMRC for CIS receive a 20% deduction on labour payments. Unregistered electricians are deducted at 30%. Registering before starting work is financially essential.',
  'CIS deductions are not a final tax payment — they are advance payments offset against your annual self-assessment tax bill. If deductions exceed your tax liability, HMRC refunds the difference.',
  'If you engage your own subcontractors (electricians or labourers) on CIS jobs, you are also a contractor. You must register as a contractor, verify your subcontractors, and submit monthly CIS returns to HMRC by the 19th of each month.',
  'Gross payment status allows qualifying electricians to receive full payment without any CIS deduction. To qualify, you must have a clean compliance record and annual turnover of at least £30,000 (net of materials).',
];

const faqs = [
  {
    question: 'Does CIS apply to electricians?',
    answer:
      'Yes. CIS applies to all construction work carried out in the UK, and electrical installation work on construction projects is specifically within scope. If you are paid by a contractor to carry out electrical work on a construction project — whether new build, renovation, commercial fit-out, or infrastructure — the contractor must deduct CIS tax from your labour payments unless you have gross payment status. CIS does not typically apply to repair and maintenance work in domestic properties where the customer is the end occupier.',
  },
  {
    question: 'What is the difference between the 20% and 30% CIS deduction?',
    answer:
      'The 20% standard deduction applies to electricians who are registered with HMRC for CIS. When a contractor verifies your UTR with HMRC and you appear on the CIS register, they deduct 20% from the labour element of your invoice (not materials) and pay it to HMRC. The 30% higher deduction applies to unregistered subcontractors — those who either have not registered with HMRC or whose details could not be verified. The extra 10% deduction can have a significant impact on cash flow, making registration and obtaining a UTR financially important.',
  },
  {
    question: 'How do I register as a CIS subcontractor?',
    answer:
      'CIS subcontractor registration is part of registering for self-assessment. When you register online via gov.uk/register-for-self-assessment using the CWF1 form for self-employment, HMRC adds you to the CIS register. You can also call the CIS Helpline on 0300 200 3210 to register specifically for CIS. You will need your UTR number, National Insurance number, and business details. Registration is free. Once registered, provide your UTR to contractors before work starts so they can verify you at the correct deduction rate.',
  },
  {
    question: 'What payments does CIS apply to on an electrician invoice?',
    answer:
      'CIS deductions apply to the labour element of your invoice only — not to materials. If your invoice includes £800 labour and £200 materials, the contractor deducts CIS on £800 only. You should invoice labour and materials as separate line items to make this clear. If you cannot separate them, the contractor may deduct CIS on the entire invoice amount. VAT is excluded from CIS calculations — CIS is applied to the net amount before VAT.',
  },
  {
    question: 'What is gross payment status and how do I qualify?',
    answer:
      'Gross payment status means HMRC has authorised contractors to pay you without making any CIS deduction. You receive your full invoice amount and settle your tax bill directly via self-assessment. To qualify, you must: have a UTR and be registered for CIS; have a net annual turnover from construction of at least £30,000 (or £100,000 for partnerships and companies); have filed all tax returns and paid all taxes on time for the previous 12 months; and have no outstanding HMRC debts. HMRC reviews gross payment status annually and can withdraw it if your compliance record deteriorates.',
  },
  {
    question: 'Do I need to submit CIS monthly returns?',
    answer:
      'Monthly CIS returns are only required if you are a contractor — that is, if you pay other subcontractors to carry out construction work on your behalf. As a pure subcontractor, you do not submit monthly returns; instead, your contractor does. However, many electricians act as both subcontractors (working for main contractors) and contractors (engaging their own labourers or subbies). If you are in this position, you must register as a contractor and submit monthly returns. The monthly return deadline is the 19th of each month following the payment month.',
  },
  {
    question: 'How do I reclaim CIS deductions from HMRC?',
    answer:
      'CIS deductions you have suffered are offset against your income tax and Class 4 NIC bill in your annual self-assessment return. Declare the gross (pre-deduction) income and enter the total CIS deductions suffered in the CIS box on your self-assessment return. HMRC will deduct these from your tax liability. If your total CIS deductions for the year exceed your total tax bill (which can happen if you had a quieter year or high expenses), HMRC will issue a refund. To claim this refund promptly, file your return as early as possible after 6 April.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/utr-number-electrician',
    title: 'UTR Number for Electricians',
    description: 'How to get your UTR and register for self-assessment with HMRC.',
    icon: FileText,
    category: 'Finance Guide',
  },
  {
    href: '/self-assessment-electrician',
    title: 'Self-Assessment for Electricians',
    description: 'Complete guide to filing your tax return, allowable expenses, and deadlines.',
    icon: ClipboardCheck,
    category: 'Finance Guide',
  },
  {
    href: '/vat-for-electricians',
    title: 'VAT for Electricians',
    description: 'VAT registration, flat rate scheme, and the domestic reverse charge for CIS.',
    icon: PoundSterling,
    category: 'Finance Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Professional invoices with labour and materials clearly separated for CIS.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/electrical-business-valuation',
    title: 'Electrical Business Valuation',
    description: 'How much is your electrical business worth? Valuation methods explained.',
    icon: Building2,
    category: 'Finance Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-cis',
    heading: 'What Is the Construction Industry Scheme?',
    content: (
      <>
        <p>
          The Construction Industry Scheme (CIS) is an HMRC tax scheme that affects contractors and
          subcontractors working in the UK construction industry. Under CIS, contractors are
          required to withhold a proportion of each payment made to subcontractors and pay it
          directly to HMRC as an advance payment of the subcontractor's tax and National Insurance
          contributions.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who is a contractor under CIS?</strong> — any business that pays
                subcontractors for construction work. This includes main contractors on large
                projects, housebuilders, local authorities, and any electrician who pays their own
                subbies or labourers on CIS projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who is a subcontractor under CIS?</strong> — any individual or business that
                is paid by a contractor to carry out construction work. Most self-employed
                electricians working on new builds, commercial projects, or infrastructure projects
                are CIS subcontractors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>What work is in scope?</strong> — electrical installation work on
                construction projects including new builds, commercial fit-outs, industrial
                installations, and major renovations. Repair and maintenance work on domestic
                properties (where the end customer is the householder) is generally outside CIS.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Purpose of CIS</strong> — CIS was introduced to reduce tax evasion in the
                construction industry. By requiring contractors to withhold tax at source, HMRC
                ensures advance payment of tax from workers who might otherwise not file returns.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <p className="text-white text-sm">
            <strong>Disclaimer:</strong> This guide provides general information about CIS. The
            rules are complex, and your specific circumstances — particularly whether you are
            classified as a contractor, subcontractor, or both — determine your exact obligations.
            Always consult a qualified accountant for advice tailored to your situation.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'deduction-rates',
    heading: 'CIS Deduction Rates: 20% and 30% Explained',
    content: (
      <>
        <p>
          There are three possible CIS deduction rates. The rate applied depends on your
          registration status and whether the contractor can verify you with HMRC before payment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>0% — Gross payment status</strong> — the contractor pays the full invoice
                amount with no deduction. Only available to electricians who have been granted gross
                payment status by HMRC. See the Gross Payment Status section below.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>20% — Standard rate (registered subcontractor)</strong> — if you are
                registered with HMRC for CIS and the contractor can verify your UTR, they deduct 20%
                from the labour element of your payment. On a £1,000 labour invoice, the contractor
                pays you £800 and £200 goes to HMRC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>30% — Higher rate (unregistered subcontractor)</strong> — if HMRC cannot
                verify you (because you are not registered or provided incorrect details), the
                contractor must deduct 30%. On the same £1,000 labour invoice, you would receive
                only £700. On a busy month of CIS work, this difference in cash flow can be
                substantial.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Remember: CIS deductions apply only to the labour element of your invoice, not to
          materials. Always invoice labour and materials as separate line items to ensure the
          correct deduction is made and to protect your cash flow.
        </p>
      </>
    ),
  },
  {
    id: 'registering-cis',
    heading: 'Registering for CIS as an Electrician',
    content: (
      <>
        <p>
          Registering for CIS as a subcontractor is straightforward and free. Here is what you need
          to do before starting work on your first CIS job.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get your UTR first</strong> — you cannot register for CIS without a Unique
                Taxpayer Reference. If you do not have one, register for self-assessment first. See
                our{' '}
                <SEOInternalLink href="/utr-number-electrician">
                  UTR number guide for electricians
                </SEOInternalLink>{' '}
                for full instructions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Register online or by phone</strong> — log in to your HMRC online account
                and register for CIS, or call the CIS Helpline on 0300 200 3210. Registration adds
                you to the CIS subcontractor register.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide your UTR to contractors</strong> — before your first payment, give
                your UTR and National Insurance number to the contractor. They must verify you with
                HMRC — this is usually done online and takes minutes. The contractor should give you
                a verification number as confirmation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Request monthly deduction statements</strong> — after each payment, your
                contractor must provide a CIS deduction statement showing the gross amount paid, the
                CIS deduction made, and the net amount paid to you. Keep these statements — you need
                them to complete your self-assessment return.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'gross-payment-status',
    heading: 'Gross Payment Status: Getting Paid Without CIS Deductions',
    content: (
      <>
        <p>
          Gross payment status is the most favourable CIS position for an electrician. If granted,
          contractors pay you the full invoice amount with no deduction. You pay all your tax
          directly to HMRC via self-assessment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Turnover test</strong> — for a sole trader, your annual net turnover from
                construction work (excluding materials) must be at least £30,000. For partnerships
                and limited companies the threshold is higher.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Compliance test</strong> — you must have filed all required tax returns on
                time, paid all tax and NIC on time, and have no outstanding HMRC debts for the
                previous 12 months. A single late payment or missed return can prevent you from
                qualifying.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual review</strong> — HMRC reviews gross payment status annually. If your
                compliance deteriorates, they can withdraw it. This means you must maintain clean
                compliance permanently to keep the benefit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cash flow benefit</strong> — gross payment status significantly improves
                cash flow because you receive your full invoice immediately rather than waiting for
                HMRC to refund deductions at year end.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'monthly-returns',
    heading: 'CIS Monthly Returns: Your Obligation as a Contractor',
    content: (
      <>
        <p>
          If you engage your own subcontractors on CIS projects — whether electricians, labourers,
          or other trades — you are acting as a contractor. This brings additional monthly
          obligations to HMRC.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify before paying</strong> — before making the first payment to any
                subcontractor, you must verify them with HMRC using their UTR and NI number. HMRC's
                verification service is online and takes seconds. Verification tells you what
                deduction rate to apply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monthly return deadline — 19th of each month</strong> — you must submit a
                CIS monthly return to HMRC by the 19th of the month following the payment month. The
                return lists all subcontractor payments, verification numbers, deductions made, and
                materials costs. File online via your HMRC business account.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nil returns</strong> — if you had no subcontractor payments in a month, you
                must still file a nil return by the 19th. Failure to file (even a nil return)
                attracts automatic penalties starting at £100.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pay the deductions over</strong> — the CIS deductions you have made must be
                paid to HMRC by the 22nd of the month (online) or the 19th (by post). These
                deductions are not your money to hold — late payment attracts interest.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'reclaiming-deductions',
    heading: 'Reclaiming CIS Deductions Suffered',
    content: (
      <>
        <p>
          CIS deductions withheld by your contractors are advance payments of your tax. At year end,
          they are offset against your total tax liability via your self-assessment return. If your
          deductions exceed your tax bill, HMRC refunds the excess.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Declare gross income</strong> — on your self-assessment return, declare the
                gross amount of CIS income (before deductions) as your trading income. Do not
                declare the net amounts received.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Enter total CIS deductions</strong> — there is a specific box on the
                self-employment pages of the self-assessment return for CIS deductions suffered.
                Enter the total from your monthly deduction statements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>File early for faster refunds</strong> — if you are due a refund (common for
                electricians with high expenses or lower income years), file your return as soon as
                possible after 6 April. HMRC typically processes refunds within 4 to 6 weeks of
                receiving a complete return.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'record-keeping',
    heading: 'CIS Record Keeping Requirements',
    content: (
      <>
        <p>
          HMRC requires contractors and subcontractors to keep CIS records for a minimum of three
          years. For subcontractors, this means keeping all CIS deduction statements received from
          contractors.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Subcontractor records</strong> — keep all monthly CIS deduction statements
                from contractors, your invoices (showing gross amount, materials, and labour split),
                and bank statements showing net payments received.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contractor records</strong> — if you are also a contractor, keep
                subcontractor verification records, all monthly CIS returns submitted, evidence of
                payments made, and copies of deduction statements issued.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum three years</strong> — HMRC can open a compliance check into CIS
                returns up to three years after filing. Keep all records for at least three years,
                and longer if there has been any dispute or query with HMRC.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'Managing CIS Invoicing with Elec-Mate',
    content: (
      <>
        <p>
          Correct invoicing is central to CIS compliance. Separating labour and materials on every
          invoice ensures contractors deduct CIS on the right amount and protects your cash flow.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">CIS-Ready Invoices on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate's invoicing tool
                  </SEOInternalLink>{' '}
                  to create professional invoices with labour and materials as separate line items.
                  This ensures your contractor applies CIS deductions only to labour — protecting
                  your cash flow on every job.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Complete Income Records for Self-Assessment
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Every invoice you raise in Elec-Mate is stored with date, amount, and client. At
                  self-assessment time, hand your accountant a complete record of gross income
                  alongside your CIS deduction statements — no spreadsheets needed.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional CIS invoicing with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for professional invoicing. Create CIS-compliant invoices with labour and materials clearly separated — on your phone, in seconds. 7-day free trial."
          icon={FileText}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CISGuideElectricianPage() {
  return (
    <GuideTemplate
      title="Construction Industry Scheme (CIS) Guide for Electricians UK"
      description="Complete CIS guide for UK electricians — how CIS works, 20% vs 30% deduction rates, registering as a subcontractor, gross payment status, submitting monthly CIS returns as a contractor, and reclaiming CIS deductions on your self-assessment return."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Finance Guide"
      badgeIcon={ClipboardCheck}
      heroTitle={
        <>
          Construction Industry Scheme (CIS) Guide:{' '}
          <span className="text-yellow-400">For UK Electricians</span>
        </>
      }
      heroSubtitle="Everything UK electricians need to know about CIS — how the scheme works, the 20% and 30% deduction rates, registering as a subcontractor, gross payment status, monthly contractor returns, and how to reclaim CIS deductions on your annual self-assessment return."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About CIS for Electricians"
      relatedPages={relatedPages}
      ctaHeading="CIS-Compliant Invoicing on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for professional invoicing with labour and materials clearly separated for CIS. Create invoices in seconds on site. 7-day free trial, cancel anytime."
    />
  );
}
