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
  Calculator,
  Receipt,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Finance Guides', href: '/guides/electrician-finance' },
  { label: 'VAT for Electricians', href: '/vat-for-electricians' },
];

const tocItems = [
  { id: 'registration-threshold', label: 'VAT Registration Threshold (£85,000)' },
  { id: 'voluntary-registration', label: 'Voluntary VAT Registration' },
  { id: 'flat-rate-scheme', label: 'Flat Rate Scheme (9.5%)' },
  { id: 'cash-accounting', label: 'Cash Accounting Scheme' },
  { id: 'materials-vs-labour', label: 'VAT on Materials vs Labour' },
  { id: 'domestic-reverse-charge', label: 'Domestic Reverse Charge (VAT RCM)' },
  { id: 'quarterly-returns', label: 'Quarterly VAT Returns' },
  { id: 'for-electricians', label: 'Managing VAT with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'You must register for VAT when your taxable turnover exceeds £85,000 in any rolling 12-month period. You have 30 days to notify HMRC once you know you will exceed the threshold.',
  'The VAT Flat Rate Scheme allows electricians to pay a fixed percentage of their gross (VAT-inclusive) turnover to HMRC, currently 9.5% for electrical installation. This simplifies VAT accounting and can save money for businesses with low input VAT.',
  'The Domestic Reverse Charge (DRC) applies to electrical installation services supplied between VAT-registered CIS businesses. Under DRC, the customer (contractor) accounts for the VAT rather than the supplier (subcontractor). This fundamentally changes how you invoice CIS clients.',
  'VAT on materials purchased for resale to customers can be reclaimed in full as input tax. VAT on tools, equipment, and business overheads can also be reclaimed, subject to normal input tax rules.',
  'Making Tax Digital for VAT requires all VAT-registered businesses to keep digital records and submit returns using MTD-compatible software. Paper VAT returns are no longer accepted.',
];

const faqs = [
  {
    question: 'When do I have to register for VAT as an electrician?',
    answer:
      'You must register for VAT when your taxable turnover in any rolling 12-month period exceeds £85,000. "Taxable turnover" includes all sales of goods and services subject to VAT — for electricians, this is essentially all income from electrical work and materials (both standard-rated at 20% and zero-rated supplies such as new build residential work). Once you know your taxable turnover will exceed £85,000, you have 30 days to notify HMRC. You must then charge VAT on all applicable supplies from your registration date. Failure to register on time results in penalties and you become liable for the VAT you should have charged, whether or not you collected it from customers.',
  },
  {
    question: 'Should I register for VAT voluntarily before I hit £85,000?',
    answer:
      'Voluntary VAT registration can be beneficial if your customers are mostly VAT-registered businesses (such as main contractors), as they can reclaim the VAT you charge. This means VAT is neutral for your commercial customers, and you can reclaim all input VAT on your purchases — tools, materials, van, accountant fees. Voluntary registration is generally not beneficial if your customers are mainly domestic householders, as they cannot reclaim VAT and your prices effectively increase by 20%. Speak to an accountant before deciding.',
  },
  {
    question: 'What is the VAT Flat Rate Scheme for electricians?',
    answer:
      'The Flat Rate Scheme (FRS) allows eligible businesses with taxable turnover under £150,000 to pay a fixed percentage of their gross VAT-inclusive turnover to HMRC, rather than calculating input and output VAT on every transaction. The flat rate for "electrical installation" is 9.5%. This means you charge your customer 20% VAT, but only pay 9.5% of the gross (VAT-inclusive) amount to HMRC, keeping the difference. On a £1,000 net invoice, you charge £1,200 gross, pay £114 to HMRC (9.5% of £1,200), and keep £86 more than under standard VAT accounting. The scheme simplifies administration but you cannot reclaim input VAT on purchases individually — except for certain capital assets over £2,000.',
  },
  {
    question: 'What is the Domestic Reverse Charge and does it affect me?',
    answer:
      'The Domestic Reverse Charge (DRC) — also called the VAT reverse charge mechanism (RCM) — applies to supplies of specified construction services (including electrical installation) between VAT-registered businesses working under CIS. Under DRC, instead of the subcontractor charging VAT on their invoice, the contractor (customer) accounts for the VAT directly to HMRC. If DRC applies, you issue your invoice showing the net amount and a note stating "Reverse charge applies — customer to account for VAT at 20%". You do not charge VAT and do not receive any VAT from the contractor. DRC does not apply to supplies to end users (non-CIS customers) or to supplies between connected companies.',
  },
  {
    question: 'Can I reclaim VAT on materials I buy for a job?',
    answer:
      'Yes. If you are VAT-registered on the standard scheme, you can reclaim input VAT on all materials purchased for use in your business, including cable, consumer units, accessories, and other installation materials. You can also reclaim VAT on tools, test equipment, your van (if it is not available for private use), PPE, accountant fees, and other business costs. You cannot reclaim VAT on client entertainment or items used personally. Keep all VAT receipts and invoices — HMRC can request them during a VAT inspection.',
  },
  {
    question: 'Is there VAT on labour for electrical work?',
    answer:
      'Labour charges for electrical work are generally subject to VAT at the standard rate of 20%. However, there are exceptions: new build residential construction (including electrical first and second fix) is zero-rated, meaning you charge 0% VAT rather than 20%. Conversions of non-residential buildings to residential use may also qualify for the reduced rate of 5% in some circumstances. The rules around VAT on construction work are complex, and whether zero-rating applies depends on the nature of the project and your customer. Seek specialist advice if you regularly work on new build projects.',
  },
  {
    question: 'What are quarterly VAT returns and when are they due?',
    answer:
      'Most VAT-registered electricians submit quarterly VAT returns to HMRC, covering three-month accounting periods. The return and payment are due one month and seven days after the end of the VAT quarter (for direct debit users, HMRC collects payment three days later). For example, if your VAT quarter ends 31 March, the return and payment are due by 7 May. You can choose monthly VAT returns if you regularly receive VAT refunds (useful if you buy significant materials). All returns must be submitted using Making Tax Digital-compatible software — HMRC no longer accepts paper returns.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/cis-guide-electrician',
    title: 'CIS Guide for Electricians',
    description:
      'How CIS works, deduction rates, and the link between CIS and VAT domestic reverse charge.',
    icon: ClipboardCheck,
    category: 'Finance Guide',
  },
  {
    href: '/self-assessment-electrician',
    title: 'Self-Assessment for Electricians',
    description: 'Complete guide to self-assessment tax returns, expenses, and deadlines.',
    icon: FileText,
    category: 'Finance Guide',
  },
  {
    href: '/utr-number-electrician',
    title: 'UTR Number for Electricians',
    description: 'How to get your UTR and register for self-assessment with HMRC.',
    icon: Receipt,
    category: 'Finance Guide',
  },
  {
    href: '/electrical-business-valuation',
    title: 'Electrical Business Valuation',
    description: 'How much is your electrical business worth? Valuation methods explained.',
    icon: Building2,
    category: 'Finance Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Create VAT-compliant invoices with correct DRC wording on your phone.',
    icon: Zap,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'registration-threshold',
    heading: 'VAT Registration Threshold: The £85,000 Rule',
    content: (
      <>
        <p>
          VAT registration is mandatory once your taxable turnover exceeds £85,000 in any rolling
          12-month period. This is not a calendar year limit — HMRC looks at any 12-month window
          ending on any given day. Once you realise your turnover will exceed £85,000, you have 30
          days to register.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>What counts towards the threshold</strong> — all taxable supplies, including
                standard-rated (20%) work, zero-rated work (such as new build residential), and
                reduced-rate work. Exempt supplies and income outside the scope of VAT do not count.
                For most electricians, nearly all income is taxable and counts towards the
                threshold.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monitor monthly</strong> — check your rolling 12-month turnover at the end
                of each month. Many electricians approach the threshold gradually and miss the point
                at which they were required to register, leading to retrospective VAT liability and
                penalties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Penalties for late registration</strong> — if you fail to register on time,
                HMRC will assess the VAT you should have charged on all supplies made since your
                registration date. You cannot retrospectively charge this VAT to customers, so the
                liability comes out of your own income.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <p className="text-white text-sm">
            <strong>Disclaimer:</strong> VAT rules are complex and subject to change. The
            information in this guide is general in nature. Always consult a qualified accountant or
            VAT specialist for advice tailored to your business.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'voluntary-registration',
    heading: 'Voluntary VAT Registration: Is It Worth It?',
    content: (
      <>
        <p>
          You can register for VAT voluntarily at any time, even if your turnover is below £85,000.
          Whether this is beneficial depends on who your customers are.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Benefits — mainly commercial customers</strong> — if your clients are
                businesses or contractors who can reclaim VAT, charging VAT has no net cost to them.
                You benefit from reclaiming input VAT on all your purchases, which can be a
                significant saving on materials and tools.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Downsides — mainly domestic customers</strong> — domestic householders
                cannot reclaim VAT. If you register voluntarily, your prices effectively increase by
                20% unless you absorb the VAT yourself. This makes you less competitive on domestic
                work below the threshold.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Administration burden</strong> — VAT registration brings quarterly return
                obligations, the requirement to keep digital records under Making Tax Digital, and
                ongoing compliance. This administration cost must be weighed against the financial
                benefit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'flat-rate-scheme',
    heading: 'The VAT Flat Rate Scheme for Electrical Installation (9.5%)',
    content: (
      <>
        <p>
          The Flat Rate Scheme (FRS) is available to VAT-registered businesses with taxable turnover
          under £150,000. It simplifies VAT by replacing standard VAT accounting with a single
          percentage applied to gross turnover. The flat rate for electrical installation work is
          9.5%.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How it works</strong> — you still charge your customer 20% VAT on your
                invoice. But instead of calculating output VAT minus input VAT, you simply pay 9.5%
                of your gross (VAT-inclusive) turnover to HMRC. The difference between the 20% you
                charge and the 9.5% you pay is your flat rate profit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Example</strong> — on a £1,000 net invoice, you charge £1,200 (including 20%
                VAT). Under FRS, you pay 9.5% of £1,200 = £114 to HMRC, keeping £86 more than the
                VAT you collected. Over a year, this can be a meaningful additional income.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>First year discount</strong> — in your first year of VAT registration, HMRC
                offers a 1% discount on the flat rate. Electricians in their first year pay 8.5%
                instead of 9.5%.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Limited cost trader rules</strong> — if your spend on goods (not services)
                is less than 2% of your gross turnover, you are classified as a "limited cost
                trader" and must use a flat rate of 16.5% instead of 9.5%. This significantly
                reduces the FRS benefit and means most material-heavy electrical jobs still benefit,
                but check with an accountant.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The FRS cannot be used alongside the Domestic Reverse Charge. If DRC applies to most of
          your supplies (because you primarily work as a CIS subcontractor for VAT-registered
          contractors), the FRS may not be suitable.
        </p>
      </>
    ),
  },
  {
    id: 'cash-accounting',
    heading: 'Cash Accounting Scheme',
    content: (
      <>
        <p>
          The Cash Accounting Scheme is available to businesses with annual taxable turnover up to
          £1.35 million. Under this scheme, you account for VAT on the basis of cash received and
          paid, rather than invoice date.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cash flow benefit</strong> — you only pay VAT to HMRC when your customer
                pays you, not when you raise the invoice. For electricians with slow-paying
                commercial clients, this can significantly ease cash flow.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Automatic bad debt relief</strong> — if a customer does not pay, you never
                pay the VAT to HMRC in the first place. Under standard VAT accounting, you must
                claim bad debt relief separately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Input VAT</strong> — under cash accounting, you also only reclaim input VAT
                when you pay your suppliers. This partially offsets the output VAT benefit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'materials-vs-labour',
    heading: 'VAT on Materials vs Labour for Electricians',
    content: (
      <>
        <p>
          Understanding how VAT applies differently to materials and labour is important for correct
          invoicing and for maximising your input VAT reclaims.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Receipt className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Labour — standard rated at 20%</strong> — charges for your time and skill
                are standard-rated in most circumstances. You charge 20% VAT on your labour element.
                Exceptions include new build residential work (zero-rated) and certain reduced-rate
                energy-saving works.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Receipt className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Materials — standard rated at 20%</strong> — materials sold as part of an
                electrical installation are generally standard-rated. Materials themselves (consumer
                units, cables, accessories) carry 20% VAT when you buy them, which you can reclaim.
                You then charge 20% on the materials to your customer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Receipt className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New build residential — zero-rated</strong> — electrical installation work
                carried out as part of the construction of a new residential dwelling is zero-rated.
                You charge 0% VAT to the main contractor or developer. You can still reclaim input
                VAT on materials and costs related to the zero-rated work.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'domestic-reverse-charge',
    heading: 'Domestic Reverse Charge (VAT RCM) for CIS Electricians',
    content: (
      <>
        <p>
          The Domestic Reverse Charge (DRC) is one of the most significant VAT changes to affect
          electricians in recent years. It came into force in March 2021 and affects all
          VAT-registered CIS subcontractors supplying services to VAT-registered CIS contractors.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>How DRC changes your invoice</strong> — instead of charging VAT on your CIS
                invoice, you show the net amount and include a note: "Domestic reverse charge
                applies. Customer to account for VAT to HMRC at the standard rate of 20%." The
                contractor (your customer) then accounts for the VAT themselves.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cash flow impact</strong> — under DRC, you do not collect VAT from your CIS
                contractor clients. This means the VAT element of your invoice never passes through
                your business. However, you still reclaim input VAT on your purchases. This can
                create a persistent VAT repayment position, which means HMRC owes you money each
                quarter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>When DRC does NOT apply</strong> — DRC does not apply when supplying to an
                end user (a business that uses the building for its own purposes rather than selling
                it on), when the supplier and customer are in the same VAT group, or when the
                customer is not VAT-registered or not working under CIS.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Repayment returns</strong> — if DRC applies to most of your supplies, you
                will likely be in a VAT repayment position. Consider switching to monthly VAT
                returns to reclaim input VAT more frequently and improve cash flow.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The DRC rules are complex and the consequences of getting them wrong — either charging VAT
          when DRC applies, or failing to apply DRC when it should be used — can result in
          penalties. Many electricians consult an accountant specifically about DRC when they first
          encounter it.
        </p>
      </>
    ),
  },
  {
    id: 'quarterly-returns',
    heading: 'Quarterly VAT Returns and Making Tax Digital',
    content: (
      <>
        <p>
          All VAT-registered electricians must comply with Making Tax Digital (MTD) for VAT. This
          means keeping digital records and submitting VAT returns using MTD-compatible software.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Quarterly deadline — one month and seven days</strong> — for most
                electricians, VAT returns and payment are due one month and seven days after the end
                of the VAT quarter. For example, a quarter ending 31 March has a deadline of 7 May.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MTD-compatible software required</strong> — you must use software such as
                QuickBooks, Xero, FreeAgent, or Sage to keep your VAT records and submit returns.
                Paper returns are not accepted. Spreadsheets must use bridging software to connect
                to HMRC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monthly returns option</strong> — if you regularly have more input VAT than
                output VAT (common for electricians working under DRC), you can opt for monthly
                returns. HMRC will then repay any overpaid VAT monthly rather than quarterly,
                improving cash flow.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'Managing VAT Invoicing with Elec-Mate',
    content: (
      <>
        <p>
          Correct VAT invoicing is a legal requirement. A valid VAT invoice must include your VAT
          registration number, the date, a description of services, the net amount, the VAT rate,
          the VAT amount, and the gross total. For DRC supplies, the invoice must also include the
          DRC notation.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Receipt className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">VAT-Compliant Invoices on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate's invoicing tool
                  </SEOInternalLink>{' '}
                  to create professional, VAT-compliant invoices in seconds on your phone. Include
                  your VAT number, correctly separate labour and materials, and send professional
                  PDFs to clients before you leave site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Complete Income Records for Your Accountant
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Every invoice raised in Elec-Mate is stored with the full breakdown of net
                  amounts, VAT, and gross totals. Hand your accountant a complete record at quarter
                  end — no manual reconciliation required.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Professional VAT invoicing for electricians — Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for professional invoicing. VAT-compliant invoices with correct labour/materials splits, sent from your phone in seconds. 7-day free trial."
          icon={Receipt}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function VATForElectriciansPage() {
  return (
    <GuideTemplate
      title="VAT for Electricians UK | When to Register & VAT Schemes Guide"
      description="Complete VAT guide for UK electricians — the £85,000 registration threshold, voluntary registration, flat rate scheme (9.5%), cash accounting, VAT on materials vs labour, and the domestic reverse charge (VAT RCM) for CIS subcontractors."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Finance Guide"
      badgeIcon={Receipt}
      heroTitle={
        <>
          VAT for Electricians UK:{' '}
          <span className="text-yellow-400">Registration, Schemes & Reverse Charge</span>
        </>
      }
      heroSubtitle="Everything UK electricians need to know about VAT — when mandatory registration kicks in at £85,000, the benefits of voluntary registration, the 9.5% flat rate scheme, the cash accounting scheme, VAT on materials vs labour, and the domestic reverse charge for CIS subcontractors."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About VAT for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Professional VAT Invoicing on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for VAT-compliant invoicing. Correctly separated labour and materials, sent as professional PDFs from your phone. 7-day free trial, cancel anytime."
    />
  );
}
