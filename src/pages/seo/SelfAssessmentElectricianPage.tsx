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
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Finance Guides', href: '/guides/electrician-finance' },
  { label: 'Self-Assessment for Electricians', href: '/self-assessment-electrician' },
];

const tocItems = [
  { id: 'what-to-include', label: 'What to Include on Your Return' },
  { id: 'allowable-expenses', label: 'Allowable Expenses for Electricians' },
  { id: 'deadlines-penalties', label: 'Deadlines and Penalties' },
  { id: 'payments-on-account', label: 'Payments on Account' },
  { id: 'accounting-software', label: 'Using Accounting Software' },
  { id: 'when-to-hire-accountant', label: 'When to Hire an Accountant' },
  { id: 'for-electricians', label: 'Managing Records with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The self-assessment tax return deadline is 31 January following the end of the tax year (5 April). For the 2025/26 tax year, the deadline is 31 January 2027. File online — the paper deadline is 31 October.',
  'All self-employed income must be declared, including cash jobs. HMRC has significant powers to investigate undisclosed income, including access to bank records and industry benchmarking.',
  'Electricians can claim a wide range of allowable expenses including tools, van costs, PPE, training, professional subscriptions (ECS card, NICEIC, NAPIT), accountant fees, and a proportion of home office costs.',
  'Late filing attracts an immediate £100 penalty. Additional penalties apply for returns more than 3 months late (£10 per day), and tax unpaid after 30 days attracts a 5% surcharge.',
  "If your tax bill is over £1,000, HMRC will require payments on account — advance payments towards next year's bill due 31 January and 31 July. Many electricians are caught off guard by this.",
];

const faqs = [
  {
    question: 'What income do I need to declare on my self-assessment return?',
    answer:
      'You must declare all income on your self-assessment return, including all self-employed electrical work income (including cash payments), any PAYE employment income (even if already taxed at source), income from renting out property, dividends if you operate through a limited company, bank interest, and any other untaxed income. The most common mistake electricians make is failing to declare cash jobs. HMRC cross-references bank records, CIS returns submitted by contractors, and industry benchmarks to detect undisclosed income.',
  },
  {
    question: 'What expenses can I claim as a self-employed electrician?',
    answer:
      'You can claim any expense that is wholly and exclusively for business purposes. For electricians, this includes: tools and test equipment (or the annual investment allowance for capital equipment); van running costs (fuel, insurance, servicing, repairs, road tax, and MOT) — or a flat mileage rate of 45p per mile for the first 10,000 miles, then 25p; PPE, safety equipment, and workwear; trade materials used in jobs; professional subscriptions such as NICEIC, NAPIT, ECS card, and JIB membership; training costs directly related to your trade; accountant and bookkeeping fees; phone costs (business proportion); and a proportion of home costs if you work from home.',
  },
  {
    question: 'What is the 31 January deadline for self-assessment?',
    answer:
      'The 31 January deadline is the online self-assessment filing deadline and the deadline to pay any tax owed for the previous tax year (which ended 5 April). For example, for the 2025/26 tax year (6 April 2025 to 5 April 2026), the online filing and payment deadline is 31 January 2027. The paper filing deadline is 31 October — three months earlier. Missing the 31 January deadline results in an immediate £100 penalty, even if you owe no tax or pay the bill on time.',
  },
  {
    question: 'What are payments on account and how do they affect electricians?',
    answer:
      "Payments on account are advance payments towards next year's tax bill required by HMRC when your tax bill exceeds £1,000. Each payment is 50% of your previous year's tax bill. The first payment on account is due on 31 January (at the same time as your previous year's tax bill), and the second is due on 31 July. This means that in your first year of significant self-employment income, you may face a bill of 150% of your expected tax in January — 100% for last year plus 50% advance for this year. Electricians who are not aware of this often face a cash flow shock.",
  },
  {
    question: 'Should I use the trading allowance or claim actual expenses?',
    answer:
      'The £1,000 trading allowance means you can receive up to £1,000 of self-employed income without needing to declare it or pay tax on it. However, if you claim the trading allowance you cannot also claim business expenses — it is one or the other. As most electricians have actual expenses far exceeding £1,000 (van costs alone typically exceed this), you will almost always be better off claiming your actual allowable expenses rather than using the trading allowance. Speak to an accountant if you are close to the threshold.',
  },
  {
    question: 'Can I claim my tools and equipment on self-assessment?',
    answer:
      'Yes. Tools and test equipment purchased wholly for business use are allowable capital expenditure. Under the Annual Investment Allowance (AIA), you can deduct the full cost of most plant and machinery (including tools and test equipment) from your profits in the year of purchase, up to the AIA limit (currently £1,000,000). Smaller items such as hand tools, multimeters, and drill bits can often be claimed as revenue expenditure (day-to-day running costs) rather than capital expenditure. Keep all receipts — HMRC can request evidence of any expense claimed.',
  },
  {
    question: 'When should I hire an accountant for my self-assessment?',
    answer:
      'Hiring an accountant is worth considering if you have a turnover of £30,000 or more, are working under CIS and need to reconcile deductions suffered, are registered for VAT, employ any staff, or find the self-assessment process confusing. A good accountant will typically save more in tax than their fee costs, by ensuring you claim all allowable expenses, correctly handle capital allowances, and structure your income efficiently. Accountant fees are themselves an allowable expense — you can claim them back on your return.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/utr-number-electrician',
    title: 'UTR Number for Electricians',
    description: 'How to get your Unique Taxpayer Reference and register for self-assessment.',
    icon: FileText,
    category: 'Finance Guide',
  },
  {
    href: '/cis-guide-electrician',
    title: 'CIS Guide for Electricians',
    description:
      'How the Construction Industry Scheme works, deduction rates, and monthly returns.',
    icon: ClipboardCheck,
    category: 'Finance Guide',
  },
  {
    href: '/vat-for-electricians',
    title: 'VAT for Electricians',
    description: 'When to register for VAT, the flat rate scheme, and domestic reverse charge.',
    icon: PoundSterling,
    category: 'Finance Guide',
  },
  {
    href: '/electrician-mortgage',
    title: 'Electrician Mortgage Guide',
    description: 'How to get a mortgage as a self-employed electrician — SA302 and lenders.',
    icon: Building2,
    category: 'Finance Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Create professional quotes and invoices on your phone in minutes.',
    icon: Zap,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-to-include',
    heading: 'What to Include on Your Self-Assessment Return',
    content: (
      <>
        <p>
          A self-assessment tax return requires you to report your total income from all sources for
          the tax year (6 April to 5 April). For electricians, this typically means completing the
          SA100 main return plus the SA103S (short) or SA103F (full) supplementary pages for
          self-employment income.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>All self-employed income</strong> — every payment you receive for electrical
                work, regardless of whether it was paid by bank transfer, cash, or cheque. There is
                no minimum below which you can ignore income (other than the trading allowance,
                which affects whether you need to file at all, not what to declare once you do
                file).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>CIS deductions suffered</strong> — if contractors have deducted CIS tax from
                your payments, you must enter the gross amount (before deduction) as income and
                declare the deductions separately. HMRC will then credit the deductions against your
                tax bill. Your contractors should provide you with monthly CIS deduction statements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employment income</strong> — if you also had PAYE employment during the
                year, declare the gross income and tax paid as shown on your P60 or P45.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Other income</strong> — rental income, dividends, bank interest over £500
                (basic rate taxpayers), and any other untaxed income must also be declared.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <p className="text-white text-sm">
            <strong>Disclaimer:</strong> This guide provides general information about
            self-assessment for electricians. Tax law is subject to change and your individual
            circumstances may differ significantly. Always consult a qualified accountant or tax
            adviser before completing your self-assessment return.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'allowable-expenses',
    heading: 'Allowable Expenses for Electricians',
    content: (
      <>
        <p>
          Allowable expenses reduce your taxable profit, directly reducing your tax and National
          Insurance bill. Electricians typically have a wide range of legitimate business expenses.
          The golden rule is that expenses must be wholly and exclusively for business purposes.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tools and equipment</strong> — hand tools, power tools, test instruments
                (multimeters, RCD testers, loop impedance testers), ladders, work bags, and
                replacement parts for equipment. Capital equipment can be claimed via the Annual
                Investment Allowance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Van and vehicle costs</strong> — fuel, insurance, road tax, MOT, servicing,
                repairs, and HP or lease payments. Alternatively, use HMRC's approved mileage rate
                of 45p per mile for the first 10,000 business miles per year, then 25p per mile. Do
                not mix the two methods within a single vehicle.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PPE and workwear</strong> — protective boots, hard hats, gloves, hi-vis
                vests, overalls, and any clothing required for safety. Note: ordinary clothing that
                you could wear outside work is not allowable, even if you only wear it for work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Training and CPD</strong> — training courses directly related to your
                electrical work, such as 18th Edition update training, inspection and testing
                qualifications, PAT testing courses, solar PV and EV charging courses, and first aid
                refreshers for site work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional subscriptions</strong> — NICEIC, NAPIT, or ELECSA registration
                fees, ECS card, JIB membership, CHAS registration, trade union membership (if
                relevant), and professional indemnity or public liability insurance premiums.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Accountant and bookkeeping fees</strong> — the cost of your accountant
                preparing your self-assessment return, bookkeeping software subscriptions, and any
                other professional financial advice costs are allowable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Phone and internet</strong> — the business proportion of your mobile phone
                bill and broadband costs. If you use your phone 70% for business, claim 70% of the
                cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Home office costs</strong> — if you do administrative work at home (quoting,
                invoicing, record keeping), you can claim a proportion of household costs (heating,
                electricity, broadband) using either the simplified flat rate (£10 to £26 per month
                depending on hours worked) or an actual cost calculation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Keep all receipts and bank statements. HMRC can open an enquiry into any return up to four
          years after filing (or longer if they suspect fraud), and you must be able to substantiate
          every expense claimed.
        </p>
      </>
    ),
  },
  {
    id: 'deadlines-penalties',
    heading: 'Self-Assessment Deadlines and Penalties',
    content: (
      <>
        <p>
          Missing HMRC deadlines results in automatic financial penalties. The self-assessment
          system has several important dates each year.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>5 October — registration deadline</strong> — you must register for
                self-assessment by 5 October following the end of your first year of
                self-employment. Miss this and HMRC can charge a penalty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>31 October — paper return deadline</strong> — if you file a paper return, it
                must reach HMRC by 31 October following the end of the tax year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>31 January — online filing and payment deadline</strong> — the most
                important date. File your online return and pay all tax owed by midnight on 31
                January. Missing this date triggers an automatic £100 penalty, even if no tax is
                owed and even if the return is only one day late.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Further late filing penalties</strong> — if the return is more than 3 months
                late, HMRC charges £10 per day (up to 90 days, maximum £900). After 6 months, a
                further 5% of the tax owed (or £300, whichever is greater) is added. After 12
                months, a further 5% surcharge applies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Late payment surcharges</strong> — tax unpaid after 30 days past the
                deadline attracts a 5% surcharge on the outstanding amount. Further surcharges apply
                at 6 months and 12 months.
              </span>
            </li>
          </ul>
        </div>
        <p>
          File early to avoid penalties. There is no benefit to waiting until January — filing in
          April, May, or June for the previous tax year gives you time to query anything with your
          accountant and spread the financial impact of any tax bill.
        </p>
      </>
    ),
  },
  {
    id: 'payments-on-account',
    heading: 'Payments on Account: The Catch Many Electricians Miss',
    content: (
      <>
        <p>
          Payments on account are advance payments towards next year's tax bill. HMRC requires them
          when your annual tax and Class 4 NIC bill exceeds £1,000. They catch many self-employed
          electricians off guard in their first year of significant income.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How they work</strong> — each payment on account is 50% of your previous
                year's tax bill. Two payments are required: one on 31 January (alongside your
                previous year's payment) and one on 31 July.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The January shock</strong> — in your first year of paying payments on
                account, you pay your full previous year's tax bill plus 50% advance all on 31
                January. If your tax bill is £5,000, you pay £7,500 in January (£5,000 for last year
                + £2,500 first payment on account).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reducing payments on account</strong> — if you know your income will be
                lower this year, you can apply to reduce your payments on account via your HMRC
                online account. However, if you underestimate and your actual bill is higher, HMRC
                charges interest on the shortfall.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The best approach is to set aside a consistent proportion of your income (typically 25 to
          30% for most electricians, accounting for income tax and both classes of NIC) into a
          separate savings account throughout the year. This removes the cash flow shock from both
          the January payment and the July payment on account.
        </p>
      </>
    ),
  },
  {
    id: 'accounting-software',
    heading: 'Using Accounting Software as an Electrician',
    content: (
      <>
        <p>
          HMRC's Making Tax Digital (MTD) initiative is progressively requiring self-employed
          individuals to keep digital records and submit quarterly updates directly to HMRC. MTD for
          Income Tax Self-Assessment (MTD for ITSA) will apply to self-employed individuals with
          income over £50,000 from April 2026, and those with income over £30,000 from April 2027.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Popular options for electricians</strong> — QuickBooks Self-Employed,
                FreeAgent, Xero, and Sage are all MTD-compatible. Many are cloud-based with mobile
                apps that let you photograph and categorise receipts on site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bank feeds</strong> — most accounting software can connect directly to your
                business bank account and automatically import transactions, reducing manual data
                entry significantly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mileage tracking</strong> — apps such as MileIQ or built-in mileage tracking
                in some accounting tools automatically log business journeys. This is useful
                evidence if HMRC ever queries your vehicle expense claims.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'when-to-hire-accountant',
    heading: 'When to Hire an Accountant as an Electrician',
    content: (
      <>
        <p>
          Many electricians handle their own self-assessment return when starting out, especially if
          their income is straightforward. However, there are clear situations where the cost of an
          accountant is easily justified.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Turnover above £30,000</strong> — at this level, the tax savings from
                correctly claiming all allowable expenses and capital allowances typically exceed
                accountant fees. The typical cost for an accountant to prepare an electrician's
                self-assessment return is £300 to £600 per year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>CIS deductions to reconcile</strong> — if multiple contractors have deducted
                CIS tax, reconciling the deductions against your income and ensuring the correct
                amounts are credited is time-consuming and error-prone without professional help.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>VAT registration</strong> — once you register for VAT, the quarterly returns
                and reclaim process add significant complexity. Most VAT-registered electricians use
                an accountant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Considering incorporation</strong> — if you are thinking about operating
                through a limited company, an accountant can model the tax difference and advise on
                the right structure for your income level.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Look for an accountant who is qualified (ACCA, ICAEW, or CIMA), experienced with sole
          traders in the trades, and ideally familiar with CIS. Accountant fees paid for preparing
          your self-assessment return are themselves an allowable business expense.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'Keeping Records Throughout the Year with Elec-Mate',
    content: (
      <>
        <p>
          The key to a straightforward self-assessment return is keeping accurate records throughout
          the tax year. Invoicing and income records are the foundation — knowing exactly what you
          earned and when makes the income section of your return straightforward.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Complete Invoice Records Automatically
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Use{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate's quoting and invoicing tools
                  </SEOInternalLink>{' '}
                  to generate professional invoices for every job. Every invoice is stored with
                  date, amount, and client — a complete income record that takes minutes to hand
                  over to your accountant at self-assessment time.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Never Miss a Deductible Expense</h4>
                <p className="text-white text-sm leading-relaxed">
                  Record material costs and job expenses as you go. Keeping a running total of
                  expenses throughout the year means no scrambling to find receipts in January, and
                  you are far less likely to miss legitimate deductions.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your electrical business finances with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for professional quoting, invoicing, and job records. Give your accountant a clean income record at self-assessment time. 7-day free trial."
          icon={FileText}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SelfAssessmentElectricianPage() {
  return (
    <GuideTemplate
      title="Self-Assessment Tax Return for Electricians UK | Complete Guide"
      description="Complete guide to self-assessment tax returns for UK electricians — what to include, allowable expenses (tools, van, PPE, training, subscriptions), the 31 January deadline, late filing penalties, payments on account, and when to hire an accountant."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Finance Guide"
      badgeIcon={FileText}
      heroTitle={
        <>
          Self-Assessment Tax Return for Electricians:{' '}
          <span className="text-yellow-400">Complete UK Guide</span>
        </>
      }
      heroSubtitle="Everything self-employed electricians need to know about filing a self-assessment tax return — what income to declare, every allowable expense you can claim, the 31 January deadline, late filing penalties, payments on account, and when to hire an accountant."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Self-Assessment for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Keep Your Income Records Organised All Year"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for professional invoicing and job records. Hand your accountant a complete income record at self-assessment time — no scrambling in January. 7-day free trial."
    />
  );
}
