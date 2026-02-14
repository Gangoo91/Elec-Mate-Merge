import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileText,
  PoundSterling,
  Calculator,
  Receipt,
  TrendingUp,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ClipboardCheck,
  BarChart3,
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/going-self-employed-electrician' },
  { label: 'CIS Guide', href: '/guides/cis-for-electricians' },
];

const tocItems = [
  { id: 'what-is-cis', label: 'What Is CIS?' },
  { id: 'registration', label: 'Registration' },
  { id: 'deduction-rates', label: 'Deduction Rates' },
  { id: 'gross-payment-status', label: 'Gross Payment Status' },
  { id: 'monthly-returns', label: 'Monthly Returns' },
  { id: 'drc-vat', label: 'Domestic Reverse Charge VAT' },
  { id: 'materials-deduction', label: 'Materials and Deductions' },
  { id: 'cis-and-self-assessment', label: 'CIS and Self-Assessment' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'CIS applies to all construction work — including electrical installations, rewires, consumer unit upgrades, and fire alarm systems — when the work is done for a contractor.',
  'You must register as a CIS subcontractor with HMRC to get the 20% deduction rate. Without registration, contractors must deduct 30% from your labour payments.',
  'CIS deductions are advance payments towards your Income Tax — not an additional tax. They are credited against your Self-Assessment bill, and you may receive a refund.',
  'Gross payment status (0% deduction) is available if you meet HMRC turnover and compliance criteria — meaning you keep 100% of your payments.',
  'Elec-Mate tracks every CIS payment, deduction statement, and invoice so you have a complete audit trail when filing your Self-Assessment return.',
];

const faqs = [
  {
    question: 'Does CIS apply to electrical work?',
    answer:
      'Yes. The Construction Industry Scheme covers a wide range of construction operations, and electrical work falls squarely within it. This includes new electrical installations, rewires, consumer unit upgrades, distribution board work, fire alarm installations, data cabling, EV charger installations, solar PV wiring, and testing and inspection where it is part of a larger construction project. The CIS applies when an electrician works as a subcontractor for a contractor — not when working directly for a homeowner or end client. If you do a rewire for a homeowner, CIS does not apply. If you do a rewire as a subcontractor for a building company, CIS applies. The key distinction is the relationship: contractor to subcontractor triggers CIS; direct work for an end client does not.',
  },
  {
    question: 'How do I register for CIS?',
    answer:
      'You can register as a CIS subcontractor online through the HMRC website or by calling the CIS helpline on 0300 200 3210. You will need your National Insurance number and your Unique Taxpayer Reference (UTR). If you do not yet have a UTR, you must register for Self-Assessment first — the UTR is typically issued within 10 working days. Once registered for CIS, your details are added to the HMRC verification system. When a contractor verifies you before making a payment, HMRC will confirm your registered status and the applicable deduction rate (20%). Registration is free and takes about 15 minutes online. There is no reason not to register — the alternative is a 30% deduction rate, which costs you significantly more in cash flow terms.',
  },
  {
    question: 'What is the difference between 20% and 30% CIS deduction?',
    answer:
      'The 20% rate applies to subcontractors who are registered with HMRC for CIS. The 30% rate applies to subcontractors who are not registered. The deduction is taken from the labour element of your payment only — materials are excluded if they are separately itemised on the invoice. The contractor pays the deducted amount to HMRC on your behalf. Both rates are advance payments towards your Income Tax and National Insurance, not additional taxes. However, the 30% rate significantly impacts your cash flow — on a £1,000 labour payment, you would receive £700 instead of £800. Over a year with £50,000 of CIS labour income, that is a £5,000 difference in cash flow. Register with HMRC to ensure you are on the 20% rate.',
  },
  {
    question: 'Can I get CIS deductions refunded?',
    answer:
      'Yes. CIS deductions are credited against your Income Tax and National Insurance liability when you file your Self-Assessment tax return. If the total CIS deductions for the year exceed your actual tax bill (which is common for electricians with significant allowable expenses), you will receive a refund from HMRC. The refund is typically processed within 4 to 8 weeks of filing your return. To claim the credit, you must declare the gross CIS income and the total deductions on your Self-Assessment return. You will need the CIS payment and deduction statements from every contractor you worked for during the year. If a contractor has not provided a statement, contact them and request it — without it, you cannot claim the deduction credit, and you will effectively lose that money.',
  },
  {
    question: 'What is the Domestic Reverse Charge for VAT?',
    answer:
      'The VAT Domestic Reverse Charge (DRC) for construction services was introduced on 1 March 2021. It changes how VAT is handled between VAT-registered businesses in the CIS chain. Under the DRC, if you (as a subcontractor) supply CIS-regulated services to a VAT-registered contractor, you do not charge VAT on your invoice. Instead, the contractor accounts for the VAT themselves under the reverse charge mechanism. Your invoice must state that the DRC applies and show the VAT amount that would have been charged. The DRC does not apply to end users (the person who ultimately uses the building) or to non-VAT-registered businesses. If you are not VAT registered, the DRC does not affect you. If you are VAT registered and supply services to a VAT-registered contractor within CIS, you must apply the DRC. The purpose is to combat VAT fraud in the construction supply chain.',
  },
  {
    question: 'Do I need to issue CIS invoices differently?',
    answer:
      'Yes. When invoicing a CIS contractor, your invoice should clearly separate labour and materials. The CIS deduction applies only to the labour element — materials are excluded if they are itemised separately. Your invoice should show: the gross labour amount, the CIS deduction amount (20% or 30% of labour), the net amount payable, and the materials cost (listed separately). If the DRC applies, the invoice must also state that the reverse charge applies and show the VAT amount. Many electricians make the mistake of lumping labour and materials together on a single line — this means the contractor must apply the CIS deduction to the entire amount, including materials, which costs you more. Always separate labour and materials on CIS invoices.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrician-tax-guide-uk',
    title: 'Electrician Tax Guide UK',
    description:
      'Complete tax guide covering self-assessment, allowable expenses, mileage, tools, and record keeping.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/hourly-rate-calculator-electrician',
    title: 'Hourly Rate Calculator',
    description:
      'Calculate your true hourly rate including overheads, profit margin, and non-billable hours.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/going-self-employed-electrician',
    title: 'Going Self-Employed',
    description:
      'Everything you need to know about setting up as a self-employed electrician in the UK.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/debt-recovery-electricians',
    title: 'Debt Recovery for Electricians',
    description:
      'Getting paid on time — payment terms, late payment interest, and small claims court process.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-insurance-uk',
    title: 'Electrician Insurance UK',
    description:
      'Public liability, professional indemnity, employers liability, and tools cover explained.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/invoice-generator',
    title: 'Invoice App',
    description:
      'Create professional CIS invoices with correct labour and materials split. Send from your phone.',
    icon: Receipt,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-cis',
    heading: 'What Is CIS and Why Does It Affect Electricians?',
    content: (
      <>
        <p>
          The Construction Industry Scheme (CIS) is an HMRC scheme that requires contractors to
          deduct tax at source from payments made to subcontractors for construction work. The
          deducted amount is paid to HMRC and counts as an advance payment towards the
          subcontractor's Income Tax and National Insurance.
        </p>
        <p>
          CIS was introduced to tackle tax evasion in the construction industry, where
          subcontracting chains and cash-in-hand payments historically made it easy for income to go
          unreported. The scheme ensures that tax is collected at the point of payment rather than
          relying on the subcontractor to declare it later.
        </p>
        <p>
          For electricians, CIS applies whenever you work as a subcontractor for a CIS-registered
          contractor. This includes electrical installations, rewires, consumer unit upgrades,
          distribution board work, testing and inspection (when part of a construction project),
          fire alarm systems, data cabling, EV charger installations, and solar PV wiring. If you
          work directly for a homeowner or end client, CIS does not apply — it only covers the
          contractor-to-subcontractor relationship.
        </p>
        <p>
          Many electricians work in both worlds: direct domestic work for homeowners (no CIS) and
          subcontract work for builders, main contractors, or other electrical firms (CIS applies).
          Understanding how CIS works is essential for managing your cash flow and filing your{' '}
          <SEOInternalLink href="/guides/electrician-tax-guide-uk">
            Self-Assessment tax return
          </SEOInternalLink>{' '}
          correctly.
        </p>
      </>
    ),
  },
  {
    id: 'registration',
    heading: 'Registering for CIS: Subcontractor and Contractor',
    content: (
      <>
        <p>
          There are two types of CIS registration: subcontractor and contractor. Most electricians
          register as subcontractors, but if you engage other electricians to work for you, you may
          also need to register as a contractor.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Subcontractor Registration</h3>
            <p className="text-white text-sm leading-relaxed">
              Register online at HMRC or call the CIS helpline. You need your National Insurance
              number and UTR (Unique Taxpayer Reference). If you do not have a UTR, register for
              Self-Assessment first. Once registered, contractors who verify you through HMRC will
              see your 20% deduction rate. Registration is free and typically takes 15 minutes
              online. You will receive written confirmation from HMRC within 2 weeks.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Contractor Registration</h3>
            <p className="text-white text-sm leading-relaxed">
              You must register as a CIS contractor if you pay subcontractors more than £1 million
              per year for construction work, or if your average annual spend on construction
              operations exceeds £1 million over the previous 3 years. Even below this threshold, if
              construction is part of your business activity, you may need to register. As a CIS
              contractor, you must verify each subcontractor with HMRC before making payments, apply
              the correct deduction rate, and file monthly CIS returns.
            </p>
          </div>
        </div>
        <p>
          The verification process is straightforward. Before paying a subcontractor for the first
          time, the contractor contacts HMRC (online or by phone) with the subcontractor's name and
          UTR. HMRC confirms whether the subcontractor is registered and the applicable deduction
          rate (0%, 20%, or 30%). This verification must be done before each new subcontractor
          relationship and refreshed periodically.
        </p>
      </>
    ),
  },
  {
    id: 'deduction-rates',
    heading: 'CIS Deduction Rates: 0%, 20%, or 30%',
    content: (
      <>
        <p>
          The CIS deduction rate depends on your registration status with HMRC. Understanding these
          rates and their impact on your cash flow is critical.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>0% — Gross payment status:</strong> No deductions taken. You receive 100% of
                your payment and pay tax through Self-Assessment. Available if you meet HMRC
                criteria: minimum £30,000 annual turnover (excluding materials and VAT), a clean
                compliance record (tax returns filed on time, no outstanding tax debts), and a
                history of CIS compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>20% — Standard registered rate:</strong> The contractor deducts 20% from the
                labour element of your payment and pays it to HMRC. This is the default rate for
                registered subcontractors. On a £1,000 labour payment, you receive £800. The £200 is
                credited against your tax bill.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>30% — Unregistered rate:</strong> If you are not registered for CIS, the
                contractor must deduct 30%. On a £1,000 labour payment, you receive only £700. There
                is no legitimate reason to remain unregistered — it costs you cash flow for no
                benefit.
              </span>
            </li>
          </ul>
        </div>
        <p>Let us put this in real terms. If you earn £60,000 in CIS labour income over a year:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>At 30% (unregistered): £18,000 deducted, you receive £42,000</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>At 20% (registered): £12,000 deducted, you receive £48,000</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>At 0% (gross): £0 deducted, you receive £60,000</span>
            </li>
          </ul>
        </div>
        <p>
          The deductions are not lost — they are credited against your tax bill. But the cash flow
          difference is significant. Register for CIS at minimum, and work towards gross payment
          status if you qualify.
        </p>
      </>
    ),
  },
  {
    id: 'gross-payment-status',
    heading: 'Gross Payment Status: Getting Paid 100%',
    content: (
      <>
        <p>
          Gross payment status is the gold standard for CIS subcontractors. No deductions are taken
          from your payments — you receive 100% and pay your tax through Self-Assessment as normal.
          To qualify, you must meet three criteria:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Turnover test:</strong> Your annual turnover from construction work
                (excluding materials and VAT) must be at least £30,000. For partnerships, each
                partner must individually meet this threshold.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Compliance test:</strong> You must have filed all Self-Assessment tax
                returns on time, have no outstanding tax debts, and have met all CIS obligations.
                Even one late tax return can disqualify you.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Business test:</strong> You must be running a genuine business in the UK —
                with a business bank account, providing construction services, and not just working
                for one contractor (which could indicate disguised employment).
              </span>
            </li>
          </ul>
        </div>
        <p>
          Apply for gross payment status through HMRC's online CIS service or by calling the CIS
          helpline. HMRC will review your compliance history and, if approved, update your status.
          Contractors who verify you will then see the 0% deduction rate.
        </p>
        <p>
          Important: HMRC reviews gross payment status annually. If you fail a compliance check (for
          example, by filing a late tax return), your gross status can be revoked and you will
          revert to the 20% rate. Maintain your compliance record to keep gross payment status.
        </p>
      </>
    ),
  },
  {
    id: 'monthly-returns',
    heading: 'Monthly CIS Returns: Contractor Obligations',
    content: (
      <>
        <p>
          If you are registered as a CIS contractor (because you pay subcontractors for construction
          work), you must file monthly CIS returns with HMRC. These are due by the 19th of every
          month for the previous tax month (6th to 5th).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What to include:</strong> The return must list every subcontractor you paid
                during the tax month, the gross amount of each payment, the amount of CIS deductions
                taken, and the materials cost (if applicable). You must also declare whether you
                made no payments in a particular month (a nil return).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How to file:</strong> Monthly returns can be filed online through HMRC's CIS
                online service or through commercial payroll/accounting software. Paper returns are
                no longer accepted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Penalties for late filing:</strong> £100 per month for each month the return
                is late, for each 50 subcontractors (or part thereof). So a contractor with 3
                subcontractors faces a £100 penalty for each late month. After 12 months, HMRC may
                estimate the amount due and charge interest.
              </span>
            </li>
          </ul>
        </div>
        <p>
          You must also provide each subcontractor with a CIS payment and deduction statement within
          14 days of the end of each tax month. This statement confirms the gross amount paid, the
          deduction taken, and the net amount received. The subcontractor needs these statements to
          complete their Self-Assessment return.
        </p>
        <SEOAppBridge
          title="Keep every CIS statement and deduction in one place"
          description="Elec-Mate tracks every invoice, CIS payment, and deduction automatically. When your accountant needs the records for Self-Assessment, export everything in one tap. No chasing contractors for missing statements."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'drc-vat',
    heading: 'Domestic Reverse Charge VAT: How It Affects CIS Invoices',
    content: (
      <>
        <p>
          The VAT Domestic Reverse Charge (DRC) for construction services came into effect on 1
          March 2021. It fundamentally changes how VAT works between VAT-registered businesses in
          the CIS chain — and if you get it wrong, HMRC can issue penalties.
        </p>
        <p>
          Under the DRC, when you (as a VAT-registered subcontractor) supply CIS-regulated services
          to a VAT-registered contractor, you do not charge VAT on your invoice. Instead, the
          contractor accounts for the VAT themselves through the reverse charge mechanism. The
          invoice must clearly state that the DRC applies.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DRC applies when:</strong> Both you and the contractor are VAT registered,
                the work is CIS-regulated construction services, and the contractor is not an "end
                user" (the person who ultimately uses the building for their own purposes).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DRC does not apply when:</strong> You supply services directly to a
                homeowner or end user, either party is not VAT registered, or the work is not
                CIS-regulated (for example, professional services like design or consulting).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Invoice requirements:</strong> Your invoice must show the net amount, the
                VAT rate that would have applied (usually 20%), the VAT amount (for reference), and
                a statement such as "Customer to account for the reverse charge on this supply at
                the rate of 20%." You must not include the VAT in the total payable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The DRC has a significant cash flow impact. Previously, you would charge 20% VAT and
          receive it from the contractor, then pay it to HMRC on your VAT return. Now, under the
          DRC, you do not receive the VAT at all — meaning your cash receipts are 20% lower. You can
          still reclaim VAT on your business purchases through your VAT return, which may result in
          a VAT repayment position rather than a payment.
        </p>
        <p>
          If you use the{' '}
          <SEOInternalLink href="/guides/electrician-tax-guide-uk">
            Flat Rate Scheme
          </SEOInternalLink>
          , be aware that DRC supplies are excluded from the flat rate calculation. You account for
          them under normal VAT rules alongside your flat-rate supplies.
        </p>
      </>
    ),
  },
  {
    id: 'materials-deduction',
    heading: 'Materials: How to Keep Them Out of CIS Deductions',
    content: (
      <>
        <p>
          CIS deductions apply to the labour element of your payment — not to materials. If you
          supply materials as part of a job, the cost of those materials should be excluded from the
          CIS deduction calculation. However, this only works if you separate labour and materials
          on your invoice.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Always itemise materials separately.</strong> Your invoice should have
                separate lines for labour and materials. For example: "Labour for consumer unit
                upgrade: £400" and "Materials (consumer unit, MCBs, cable): £350." The CIS deduction
                applies only to the £400 labour element.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not lump everything together.</strong> If your invoice simply says
                "Consumer unit upgrade: £750," the contractor may apply the CIS deduction to the
                entire £750 — costing you an additional deduction on materials that should have been
                excluded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Keep receipts for materials.</strong> If HMRC queries the materials
                allocation, you need to prove the cost. Wholesale receipts, merchant invoices, and
                online order confirmations all serve as evidence.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate's <SEOInternalLink href="/tools/invoice-generator">invoice app</SEOInternalLink>{' '}
          separates labour and materials automatically when you create CIS invoices. This ensures
          the correct deduction is applied and you do not overpay.
        </p>
      </>
    ),
  },
  {
    id: 'cis-and-self-assessment',
    heading: 'CIS and Self-Assessment: Claiming Your Deductions Back',
    content: (
      <>
        <p>
          When you file your Self-Assessment tax return, CIS deductions are offset against your
          Income Tax and National Insurance liability. If the deductions exceed your liability, HMRC
          will issue a refund.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Receipt className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Step 1: Gather Your CIS Statements</h4>
                <p className="text-white text-sm leading-relaxed">
                  Collect every CIS payment and deduction statement from every contractor you worked
                  for during the tax year. Each statement shows the gross amount, the deduction
                  taken, and the net amount paid. You need these to complete the CIS section of your
                  Self-Assessment return.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Step 2: Complete the CIS Section</h4>
                <p className="text-white text-sm leading-relaxed">
                  On your Self-Assessment return, declare the total gross CIS income (before
                  deductions) and the total CIS deductions taken. This appears in the
                  self-employment section. Your accountant or tax software will use these figures to
                  calculate whether you owe additional tax or are due a refund.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Step 3: Claim Your Refund</h4>
                <p className="text-white text-sm leading-relaxed">
                  If your CIS deductions exceed your tax liability (common when you have significant
                  expenses), HMRC will refund the difference. File your return as early as possible
                  — the refund is typically processed within 4 to 8 weeks. Some electricians receive
                  CIS refunds of £2,000 to £5,000 per year.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Track every CIS payment and deduction automatically"
          description="Elec-Mate records every CIS invoice and payment. Export your complete CIS income and deduction summary for your accountant in one tap — no chasing contractors for missing statements."
          icon={BarChart3}
        />
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common CIS Mistakes Electricians Make',
    content: (
      <>
        <p>
          CIS is not complicated, but electricians regularly make mistakes that cost them money.
          Here are the most common errors and how to avoid them:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not registering for CIS.</strong> You stay on the 30% rate instead of 20%.
                On £60,000 of CIS income, that is an extra £6,000 held by HMRC for the year. Free
                money locked up. Register immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not separating labour and materials on invoices.</strong> If materials are
                not itemised, the contractor deducts CIS on the full amount including materials.
                This over-deduction reduces your cash flow unnecessarily.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not keeping CIS payment statements.</strong> Without the statements, you
                cannot claim the CIS deduction credit on your tax return. Chase every contractor for
                their statements — or you lose the money.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Applying DRC incorrectly.</strong> Charging VAT when the DRC should apply
                (or vice versa) creates incorrect VAT returns and potential penalties. Confirm the
                VAT status of every contractor you work for.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not applying for gross payment status.</strong> If you meet the criteria,
                gross status gives you 100% of your payments immediately. Many qualifying
                electricians simply never apply because they do not know it exists.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The simplest way to avoid these mistakes is to use proper invoicing software that handles
          CIS formatting automatically, keep digital records of every payment and deduction, and
          review your CIS position with your accountant at least quarterly. Elec-Mate's{' '}
          <SEOInternalLink href="/tools/invoice-generator">invoice app</SEOInternalLink> handles the
          labour/materials split, CIS formatting, and DRC notation automatically — so you get it
          right every time.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CISForElectriciansPage() {
  return (
    <GuideTemplate
      title="CIS for Electricians | Construction Industry Scheme Guide"
      description="Complete guide to CIS for UK electricians. Covers registration, gross payment status, 20% and 30% deduction rates, monthly returns, Domestic Reverse Charge VAT, and how to claim CIS refunds."
      datePublished="2026-01-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="CIS Guide"
      badgeIcon={Building2}
      heroTitle={
        <>
          CIS for Electricians:{' '}
          <span className="text-yellow-400">The Construction Industry Scheme Explained</span>
        </>
      }
      heroSubtitle="If you work as a subcontractor for any contractor, CIS affects your pay. Understand the deduction rates, how to register, how to get gross payment status, and how to claim your deductions back on your tax return. This guide covers everything UK electricians need to know about CIS."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About CIS for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Get Your CIS Invoicing Right Every Time"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to create professional CIS invoices with correct labour and materials split, track deductions, and export everything for Self-Assessment. 7-day free trial, cancel anytime."
    />
  );
}
