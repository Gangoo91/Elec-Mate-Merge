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
  { id: 'registration-threshold', label: 'VAT Registration Threshold (£90,000)' },
  { id: 'voluntary-registration', label: 'Voluntary VAT Registration' },
  { id: 'scheme-comparison', label: 'VAT Schemes at a Glance' },
  { id: 'flat-rate-scheme', label: 'Flat Rate Scheme (9.5% / 14.5%)' },
  { id: 'cash-accounting', label: 'Cash Accounting Scheme' },
  { id: 'materials-vs-labour', label: 'VAT on Materials vs Labour' },
  { id: 'domestic-reverse-charge', label: 'Domestic Reverse Charge (VAT RCM)' },
  { id: 'quarterly-returns', label: 'Quarterly VAT Returns' },
  { id: 'for-electricians', label: 'Managing VAT with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'You must register for VAT when your taxable turnover exceeds £90,000 in any rolling 12-month period (the threshold rose from £85,000 to £90,000 on 1 April 2024). You have 30 days to notify HMRC once you know you will exceed the threshold.',
  'The VAT Flat Rate Scheme lets electricians pay a fixed percentage of their gross (VAT-inclusive) turnover to HMRC. Most electricians who supply materials fall under "General building or construction services" at 9.5%; labour-only electricians (materials under 10% of turnover) use 14.5%. The scheme simplifies VAT accounting and can save money for businesses with low input VAT.',
  'The Domestic Reverse Charge (DRC) applies to electrical installation services supplied between VAT-registered CIS businesses. Under DRC, the customer (contractor) accounts for the VAT rather than the supplier (subcontractor). This fundamentally changes how you invoice CIS clients.',
  'VAT on materials purchased for resale to customers can be reclaimed in full as input tax. VAT on tools, equipment, and business overheads can also be reclaimed, subject to normal input tax rules.',
  'Making Tax Digital for VAT requires all VAT-registered businesses to keep digital records and submit returns using MTD-compatible software. Paper VAT returns are no longer accepted.',
];

const faqs = [
  {
    question: 'When do I have to register for VAT as an electrician?',
    answer:
      'You must register for VAT when your taxable turnover in any rolling 12-month period exceeds £90,000 (this threshold rose from £85,000 on 1 April 2024). "Taxable turnover" includes all sales of goods and services subject to VAT — for electricians, this is essentially all income from electrical work and materials (both standard-rated at 20% and zero-rated supplies such as new build residential work). Once you know your taxable turnover will exceed £90,000, you have 30 days to notify HMRC. You must then charge VAT on all applicable supplies from your registration date. Failure to register on time results in penalties and you become liable for the VAT you should have charged, whether or not you collected it from customers.',
  },
  {
    question: 'Should I register for VAT voluntarily before I hit £90,000?',
    answer:
      'Voluntary VAT registration can be beneficial if your customers are mostly VAT-registered businesses (such as main contractors), as they can reclaim the VAT you charge. This means VAT is neutral for your commercial customers, and you can reclaim all input VAT on your purchases — tools, materials, van, accountant fees. You can register voluntarily at any turnover below the £90,000 threshold. Voluntary registration is generally not beneficial if your customers are mainly domestic householders, as they cannot reclaim VAT and your prices effectively increase by 20%. Speak to an accountant before deciding.',
  },
  {
    question: 'What is the VAT Flat Rate Scheme for electricians?',
    answer:
      'The Flat Rate Scheme (FRS) allows eligible businesses with taxable turnover under £150,000 (excluding VAT) to pay a fixed percentage of their gross VAT-inclusive turnover to HMRC, rather than calculating input and output VAT on every transaction. There is no single "electrical" sector — HMRC classifies electricians by how much material they supply. Electricians who supply materials worth 10% or more of turnover use "General building or construction services" at 9.5%; labour-only electricians (materials under 10% of turnover) use "Labour-only building or construction services" at 14.5%. At 9.5% you charge your customer 20% VAT but only pay 9.5% of the gross (VAT-inclusive) amount to HMRC, keeping the difference. On a £1,000 net invoice, you charge £1,200 gross, pay £114 to HMRC (9.5% of £1,200), and keep £86 more than under standard accounting. The scheme simplifies administration but you cannot reclaim input VAT on purchases individually — except for certain capital assets over £2,000.',
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
    heading: 'VAT Registration Threshold: The £90,000 Rule',
    content: (
      <>
        <p>
          VAT registration is mandatory once your taxable turnover exceeds £90,000 in any rolling
          12-month period. The threshold rose from £85,000 to £90,000 on 1 April 2024 and has stayed
          at £90,000 since. This is not a calendar year limit — HMRC looks at any 12-month window
          ending on any given day. Once you realise your turnover will exceed £90,000, you have 30
          days to register.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-white/[0.06] text-left">
                <th className="px-4 py-3 font-semibold">VAT threshold (current)</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold hidden sm:table-cell">What it means</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="px-4 py-3 font-medium">Compulsory registration</td>
                <td className="px-4 py-3 text-yellow-400 font-bold whitespace-nowrap">£90,000</td>
                <td className="px-4 py-3 text-white/80 hidden sm:table-cell">
                  Rolling 12-month taxable turnover — register within 30 days of going over
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Deregistration</td>
                <td className="px-4 py-3 text-blue-300 font-bold whitespace-nowrap">£88,000</td>
                <td className="px-4 py-3 text-white/80 hidden sm:table-cell">
                  You can apply to cancel registration if turnover falls below this
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Flat Rate Scheme — join limit</td>
                <td className="px-4 py-3 text-blue-300 font-bold whitespace-nowrap">£150,000</td>
                <td className="px-4 py-3 text-white/80 hidden sm:table-cell">
                  Excluding VAT, in the next 12 months
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Cash Accounting Scheme — join limit</td>
                <td className="px-4 py-3 text-blue-300 font-bold whitespace-nowrap">£1.35m</td>
                <td className="px-4 py-3 text-white/80 hidden sm:table-cell">
                  Estimated taxable turnover in the next 12 months
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
                penalties. There is also a forward-look test: if you expect to go over £90,000 in the
                next 30 days alone, you must register immediately.
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
          You can register for VAT voluntarily at any time, even if your turnover is below £90,000.
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
    id: 'scheme-comparison',
    heading: 'VAT Schemes at a Glance',
    content: (
      <>
        <p>
          Once you are VAT-registered, you account for VAT on the standard (accruals) basis by
          default — but several optional schemes can simplify admin or improve cash flow. The right
          choice depends on who your customers are and how much you spend on materials. Here is how
          the main schemes compare for a typical electrician.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-white/[0.06] text-left">
                <th className="px-4 py-3 font-semibold">Scheme</th>
                <th className="px-4 py-3 font-semibold">Turnover limit</th>
                <th className="px-4 py-3 font-semibold hidden sm:table-cell">Best for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="px-4 py-3 font-medium">Standard (accruals)</td>
                <td className="px-4 py-3 text-white/80 whitespace-nowrap">No limit</td>
                <td className="px-4 py-3 text-white/80 hidden sm:table-cell">
                  Material-heavy work; reclaiming all input VAT on every purchase
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Flat Rate Scheme</td>
                <td className="px-4 py-3 text-white/80 whitespace-nowrap">Under £150,000</td>
                <td className="px-4 py-3 text-white/80 hidden sm:table-cell">
                  Lower-cost / labour-led work; simpler admin, pay a fixed % of gross turnover
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Cash Accounting</td>
                <td className="px-4 py-3 text-white/80 whitespace-nowrap">Up to £1.35m</td>
                <td className="px-4 py-3 text-white/80 hidden sm:table-cell">
                  Slow-paying commercial clients; pay VAT only when you are paid
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Annual Accounting</td>
                <td className="px-4 py-3 text-white/80 whitespace-nowrap">Up to £1.35m</td>
                <td className="px-4 py-3 text-white/80 hidden sm:table-cell">
                  Steady turnover; one return a year with interim instalments
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-white/80 text-sm">
          Schemes can sometimes be combined (for example Cash Accounting with Annual Accounting), but
          the Flat Rate Scheme cannot be used together with the Domestic Reverse Charge. See the{' '}
          <SEOInternalLink href="/cis-guide-electrician">CIS guide</SEOInternalLink> for how the
          reverse charge interacts with subcontractor work.
        </p>
      </>
    ),
  },
  {
    id: 'flat-rate-scheme',
    heading: 'The VAT Flat Rate Scheme for Electricians (9.5% / 14.5%)',
    content: (
      <>
        <p>
          The Flat Rate Scheme (FRS) is available to VAT-registered businesses with taxable turnover
          under £150,000 (excluding VAT). It simplifies VAT by replacing standard VAT accounting with
          a single percentage applied to gross turnover. There is no dedicated "electrical" trade
          sector — HMRC classifies electricians by how much material they supply, so your flat rate
          is either 9.5% or 14.5%.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-white/[0.06] text-left">
                <th className="px-4 py-3 font-semibold">HMRC trade sector</th>
                <th className="px-4 py-3 font-semibold">Flat rate</th>
                <th className="px-4 py-3 font-semibold hidden sm:table-cell">Applies when</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="px-4 py-3 font-medium">General building or construction services</td>
                <td className="px-4 py-3 text-yellow-400 font-bold whitespace-nowrap">9.5%</td>
                <td className="px-4 py-3 text-white/80 hidden sm:table-cell">
                  Materials you supply are 10% or more of your turnover (most electricians)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Labour-only building or construction services</td>
                <td className="px-4 py-3 text-blue-300 font-bold whitespace-nowrap">14.5%</td>
                <td className="px-4 py-3 text-white/80 hidden sm:table-cell">
                  Materials you supply are less than 10% of your turnover
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Limited cost trader</td>
                <td className="px-4 py-3 text-red-400 font-bold whitespace-nowrap">16.5%</td>
                <td className="px-4 py-3 text-white/80 hidden sm:table-cell">
                  Spend on goods is under 2% of turnover (or under £1,000 a year) — overrides the above
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How it works</strong> — you still charge your customer 20% VAT on your
                invoice. But instead of calculating output VAT minus input VAT, you simply pay your
                flat rate (9.5% for most electricians) of your gross (VAT-inclusive) turnover to
                HMRC. The difference between the 20% you charge and the flat rate you pay is your
                flat rate profit.
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
                applies a 1% discount to your flat rate. An electrician on the 9.5% rate pays 8.5% in
                year one; one on 14.5% pays 13.5%.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Limited cost trader rules</strong> — if your spend on relevant goods (not
                services) is less than 2% of your gross turnover, or less than £1,000 a year, you
                are a "limited cost trader" and must use 16.5% regardless of trade sector. This
                almost wipes out the FRS benefit, so it mainly catches labour-only electricians who
                buy very little material. Material-heavy installers usually stay well clear of it —
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
          invoicing and for maximising your input VAT reclaims. The VAT rate is driven by the type
          of work, not by whether the line is labour or materials.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-white/[0.06] text-left">
                <th className="px-4 py-3 font-semibold">Type of work</th>
                <th className="px-4 py-3 font-semibold">VAT rate</th>
                <th className="px-4 py-3 font-semibold hidden sm:table-cell">Typical electrical example</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="px-4 py-3 font-medium">Most repair, rewire and maintenance work</td>
                <td className="px-4 py-3 text-yellow-400 font-bold whitespace-nowrap">20%</td>
                <td className="px-4 py-3 text-white/80 hidden sm:table-cell">
                  Consumer unit change, fault finding, EICR remedials, commercial fit-out
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">New build residential construction</td>
                <td className="px-4 py-3 text-green-400 font-bold whitespace-nowrap">0%</td>
                <td className="px-4 py-3 text-white/80 hidden sm:table-cell">
                  First and second fix on a new dwelling for the developer
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Qualifying conversions / renovations</td>
                <td className="px-4 py-3 text-blue-300 font-bold whitespace-nowrap">5%</td>
                <td className="px-4 py-3 text-white/80 hidden sm:table-cell">
                  Non-residential to residential conversion; some empty-home renovations
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Qualifying energy-saving materials</td>
                <td className="px-4 py-3 text-green-400 font-bold whitespace-nowrap">0%</td>
                <td className="px-4 py-3 text-white/80 hidden sm:table-cell">
                  Certain installs in residential property (currently 0% in GB to 31 Mar 2027)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-white/80 text-sm">
          Zero-rating and the reduced rate only apply in specific, evidenced circumstances. Get the
          conditions wrong and HMRC can recover the under-charged VAT from you, so confirm
          eligibility before quoting any job at less than 20%.
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
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" /> Reverse charge applies
            </h4>
            <ul className="space-y-2 text-sm text-white/90 list-disc pl-5">
              <li>Both you and your customer are VAT-registered</li>
              <li>The work falls within CIS</li>
              <li>Your customer is not an end user or intermediary</li>
              <li>The supply is standard or reduced rated (not zero-rated)</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-400 shrink-0" /> Charge VAT as normal
            </h4>
            <ul className="space-y-2 text-sm text-white/90 list-disc pl-5">
              <li>Customer is an end user (uses the building themselves)</li>
              <li>Customer is not VAT-registered or not in CIS</li>
              <li>You are working direct for a domestic householder</li>
              <li>Supplier and customer are in the same VAT group</li>
            </ul>
          </div>
        </div>
        <p>
          The DRC rules are complex and the consequences of getting them wrong — either charging VAT
          when DRC applies, or failing to apply DRC when it should be used — can result in
          penalties. See our{' '}
          <SEOInternalLink href="/cis-guide-electrician">
            CIS guide for electricians
          </SEOInternalLink>{' '}
          for how CIS deductions and the reverse charge fit together. Many electricians consult an
          accountant specifically about DRC when they first encounter it.
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
          description="Join 1,000+ UK electricians using Elec-Mate for professional invoicing. VAT-compliant invoices with correct labour/materials splits…"
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
      title="VAT for Electricians UK | When to Register & VAT Schemes"
      description="Complete VAT guide for UK electricians — the £90,000 registration threshold, voluntary registration, flat rate scheme (9.5% / 14.5%), cash accounting, domestic reverse charge and MTD obligations."
      datePublished="2026-03-27"
      dateModified="2026-06-10"
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
      heroSubtitle="Everything UK electricians need to know about VAT — when mandatory registration kicks in at £90,000, the benefits of voluntary registration, the 9.5% / 14.5% flat rate scheme, the cash accounting scheme, VAT on materials vs labour, and the domestic reverse charge for CIS subcontractors."
      answerBox={{
        question: 'When do electricians have to register for VAT in the UK?',
        answer:
          'UK electricians must register for VAT when taxable turnover exceeds £90,000 in any rolling 12-month period (the threshold rose from £85,000 on 1 April 2024), with 30 days to notify HMRC. Once registered, the Flat Rate Scheme — 9.5% for most electricians who supply materials, 14.5% if labour-only — can simplify accounting and improve margins.',
        detail:
          'CIS subcontractors supplying VAT-registered contractors must also apply the Domestic Reverse Charge — the contractor accounts for the VAT rather than the electrician.',
      }}
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
