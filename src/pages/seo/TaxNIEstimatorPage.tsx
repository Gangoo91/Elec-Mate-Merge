import BusinessTemplate from '@/pages/seo/templates/BusinessTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Calculator,
  PoundSterling,
  Receipt,
  Calendar,
  ShieldCheck,
  TrendingUp,
  FileText,
  Briefcase,
  AlertTriangle,
  Clock,
  BarChart3,
  Target,
} from 'lucide-react';

const PAGE_PATH = '/tools/tax-ni-estimator';

export default function TaxNIEstimatorPage() {
  return (
    <BusinessTemplate
      title="Tax & NI Estimator for Electricians"
      description="Estimate your income tax and National Insurance as a self-employed electrician in the UK. Class 2 and Class 4 NI, tax bands for 2025/26, quarterly payments on account, and allowable expenses — all calculated automatically."
      datePublished="2025-09-01"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Business Tools', href: '/tools' },
        { label: 'Tax & NI Estimator', href: PAGE_PATH },
      ]}
      tocItems={[
        { id: 'why-estimate-tax', label: 'Why Estimate Your Tax' },
        { id: 'income-tax-bands', label: 'Income Tax Bands 2025/26' },
        { id: 'national-insurance', label: 'Class 2 and Class 4 NI' },
        { id: 'payments-on-account', label: 'Payments on Account' },
        { id: 'allowable-expenses', label: 'Allowable Expenses' },
        { id: 'quarterly-planning', label: 'Quarterly Tax Planning' },
        { id: 'features', label: 'Elec-Mate Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Business Calculators"
      badgeIcon={Calculator}
      heroTitle={
        <>
          Tax &amp; NI Estimator
          <span className="block text-yellow-400 mt-1">For Self-Employed Electricians</span>
        </>
      }
      heroSubtitle="Every self-employed electrician dreads the January tax bill. The Tax and NI Estimator removes the surprise by calculating your estimated income tax and National Insurance throughout the year. Know what you owe before HMRC asks for it, set aside the right amount each month, and never be caught short by a payment on account."
      readingTime={10}
      stats={[
        {
          value: '£8,400',
          label: 'Average tax bill for a sole trader electrician earning £45,000',
        },
        { value: '31 Jan', label: 'Self-assessment deadline — late filing means a £100 fine' },
        { value: '29%', label: 'Effective tax rate for a typical self-employed electrician' },
        { value: '£1,000', label: 'Trading allowance — tax-free if total income is below this' },
      ]}
      keyTakeaways={[
        'Self-employed electricians pay income tax and two classes of National Insurance: Class 2 (flat rate) and Class 4 (percentage of profits).',
        'For 2025/26, the personal allowance is £12,570, the basic rate is 20% on income from £12,571 to £50,270, and the higher rate is 40% above that.',
        "Payments on account mean your second year of self-employment hits hard — you pay your actual tax bill plus 50% of next year's estimated bill in January and July.",
        'Tracking allowable expenses throughout the year reduces your taxable profit and your tax bill. Every £100 of missed expenses costs you £29 to £42 in unnecessary tax.',
        'Elec-Mate estimates your tax and NI in real time as you log income and expenses, so you always know how much to set aside.',
      ]}
      sections={[
        {
          id: 'why-estimate-tax',
          heading: 'Why Every Self-Employed Electrician Must Estimate Their Tax',
          content: (
            <>
              <p>
                When you work for an employer, tax and NI are deducted at source through PAYE. You
                never see the money, so you never miss it. When you are self-employed, the full
                amount hits your bank account and it is your responsibility to set aside enough to
                cover your tax bill. Most new self-employed electricians underestimate how much they
                will owe, and the January tax bill comes as a shock.
              </p>
              <p>
                The problem is compounded by payments on account. From your second year of
                self-employment onwards, HMRC requires you to make advance payments towards next
                year's tax bill. This means in January of your second year, you pay your entire
                first year's tax bill plus 50% of HMRC's estimate for the following year. A sole
                trader electrician earning £45,000 profit could face a January bill of over £12,000
                — the actual tax owed plus the first payment on account.
              </p>
              <p>
                The solution is simple: estimate your tax throughout the year and set aside the
                right amount each month. Elec-Mate's Tax and NI Estimator does this automatically.
                As you log income through the{' '}
                <SEOInternalLink href="/tools/electrician-invoice-app">
                  invoice tool
                </SEOInternalLink>{' '}
                and expenses through the expense tracker, the estimator recalculates your projected
                tax liability in real time. You always know how much you need to save, and there are
                no surprises in January.
              </p>
            </>
          ),
          appBridge: {
            title: 'Know Your Tax Bill Before HMRC Does',
            description:
              'Elec-Mate estimates your income tax and NI in real time as you log income and expenses. Set aside the right amount every month — no January surprises.',
            icon: Calculator,
          },
        },
        {
          id: 'income-tax-bands',
          heading: 'Income Tax Bands for 2025/26',
          content: (
            <>
              <p>
                Understanding how income tax works is essential for pricing your work correctly. You
                do not pay tax on your total turnover — you pay tax on your taxable profit, which is
                your income minus your allowable business expenses. The tax is then calculated in
                bands:
              </p>
              <p>
                <strong className="text-yellow-400">Personal allowance: £12,570.</strong> The first
                £12,570 of your taxable profit is tax-free. This allowance reduces by £1 for every
                £2 you earn above £100,000, disappearing entirely at £125,140.
              </p>
              <p>
                <strong className="text-yellow-400">Basic rate: 20% on £12,571 to £50,270.</strong>{' '}
                Most sole trader electricians fall within this band. On a taxable profit of £40,000,
                you would pay 20% on £27,430 (the amount above the personal allowance) = £5,486 in
                income tax.
              </p>
              <p>
                <strong className="text-yellow-400">
                  Higher rate: 40% on £50,271 to £125,140.
                </strong>{' '}
                If your taxable profit exceeds £50,270, the excess is taxed at 40%. This is
                important for electricians earning strong profits or those with income from multiple
                sources — a combination of self-employment and rental income, for example.
              </p>
              <p>
                <strong className="text-yellow-400">Additional rate: 45% above £125,140.</strong>{' '}
                Unlikely for most sole trader electricians, but relevant for those running larger
                businesses or with significant additional income.
              </p>
              <p>
                Use Elec-Mate's{' '}
                <SEOInternalLink href="/tools/electrician-tax-guide">tax guide</SEOInternalLink> for
                detailed guidance on all aspects of tax as a self-employed electrician, including
                how to register for self-assessment, what records to keep, and when to consider
                incorporating as a limited company.
              </p>
            </>
          ),
        },
        {
          id: 'national-insurance',
          heading: 'National Insurance: Class 2 and Class 4 Contributions',
          content: (
            <>
              <p>
                As a self-employed electrician, you pay two classes of National Insurance on top of
                your income tax. These fund your state pension entitlement and access to certain
                benefits.
              </p>
              <p>
                <strong className="text-yellow-400">Class 2 NI:</strong> A flat-rate weekly
                contribution of £3.45 per week (2025/26 rate), payable if your profits exceed the
                Small Profits Threshold of £6,725. This costs approximately £179.40 per year. Class
                2 NI counts towards your qualifying years for the state pension — you need 35
                qualifying years for the full new state pension.
              </p>
              <p>
                <strong className="text-yellow-400">Class 4 NI:</strong> A percentage-based
                contribution on your profits. For 2025/26, you pay 6% on profits between £12,570 and
                £50,270, and 2% on profits above £50,270. On a taxable profit of £40,000, your Class
                4 NI would be: 6% x £27,430 = £1,645.80. Class 4 NI does not count towards your
                state pension — it is effectively an additional tax on self-employed profits.
              </p>
              <p>
                <strong className="text-yellow-400">Total NI example:</strong> On a profit of
                £40,000, your total NI bill would be approximately £179.40 (Class 2) + £1,645.80
                (Class 4) = £1,825.20. Combined with your income tax of £5,486, your total tax and
                NI bill is £7,311.20 — an effective rate of approximately 18.3% on your total
                profit, or about 26.7% on the amount above your personal allowance.
              </p>
              <p>
                For electricians working under the{' '}
                <SEOInternalLink href="/tools/cis-for-electricians">
                  Construction Industry Scheme (CIS)
                </SEOInternalLink>
                , tax is deducted at source by the contractor at 20% (or 30% if you are not
                registered). CIS deductions count towards your income tax bill but not your NI,
                which you still pay separately through self-assessment.
              </p>
            </>
          ),
        },
        {
          id: 'payments-on-account',
          heading: 'Payments on Account: The Hidden Cash Flow Trap',
          content: (
            <>
              <p>
                Payments on account are advance payments towards your next year's tax bill. HMRC
                requires them from your second year of self-employment onwards, and they are the
                single biggest cause of cash flow problems for self-employed electricians.
              </p>
              <p>
                <strong className="text-yellow-400">How they work:</strong> HMRC assumes your next
                year's tax bill will be the same as this year's. They require you to pay 50% of the
                estimated bill in advance, split across two dates: 31 January (alongside your actual
                tax bill for the previous year) and 31 July. A balancing payment or refund is then
                made the following January when your actual figures are known.
              </p>
              <p>
                <strong className="text-yellow-400">The January shock:</strong> In January of your
                second year, you pay three things simultaneously: (1) the full tax and NI bill for
                your first year of self-employment, (2) the first payment on account for your second
                year (50% of last year's bill), and (3) any balancing payment from the previous
                year. For an electrician with a £7,000 tax bill, the January payment could be £7,000
                + £3,500 = £10,500.
              </p>
              <p>
                <strong className="text-yellow-400">Reducing payments on account:</strong> If you
                expect your income to be lower next year (for example, if you are taking time off
                for training or personal reasons), you can apply to reduce your payments on account.
                But if you underestimate and your actual bill is higher, HMRC charges interest on
                the difference.
              </p>
              <p>
                Elec-Mate's Tax and NI Estimator accounts for payments on account automatically,
                showing you the exact amounts due on each payment date. Use the{' '}
                <SEOInternalLink href="/tools/cash-flow-planner">cash flow planner</SEOInternalLink>{' '}
                to ensure you have sufficient funds available on 31 January and 31 July.
              </p>
            </>
          ),
          appBridge: {
            title: 'Never Be Caught Short by Payments on Account',
            description:
              'Elec-Mate calculates your payments on account alongside your main tax bill and shows exactly when each payment is due. Set up monthly savings transfers automatically.',
            icon: Calendar,
          },
        },
        {
          id: 'allowable-expenses',
          heading: 'Allowable Expenses That Reduce Your Tax Bill',
          content: (
            <>
              <p>
                Every legitimate business expense reduces your taxable profit, which reduces your
                tax and NI bill. For a basic-rate taxpayer, every £100 of expenses saves you
                approximately £29 in tax and NI (20% income tax + 6% Class 4 NI + approximately 3%
                effective Class 2). For a higher-rate taxpayer, the saving is approximately £42 per
                £100.
              </p>
              <p>
                <strong className="text-yellow-400">Commonly claimed expenses:</strong> Van running
                costs (fuel, insurance, road tax, servicing, repairs), tools and equipment, test
                instrument calibration, public liability insurance, professional indemnity
                insurance, certification body fees (NICEIC, NAPIT, ELECSA), accountancy fees, phone
                contract, software subscriptions (including Elec-Mate), workwear and PPE, training
                courses, and materials purchased for jobs.
              </p>
              <p>
                <strong className="text-yellow-400">Commonly missed expenses:</strong> Use of home
                as office (£6 per week simplified claim or actual costs with calculation),
                professional subscriptions (IET membership), trade publications, parking and tolls,
                bank charges on business accounts, and small items of equipment under the Annual
                Investment Allowance threshold.
              </p>
              <p>
                <strong className="text-yellow-400">Capital allowances:</strong> Larger purchases
                (vans, expensive test equipment, power tools) are claimed through capital allowances
                rather than as direct expenses. The Annual Investment Allowance (AIA) allows you to
                deduct the full cost of qualifying capital expenditure up to £1 million in the year
                of purchase. For most electricians, this means van purchases, MFTs, and expensive
                power tools can be fully deducted in the year you buy them.
              </p>
              <p>
                Track every expense in Elec-Mate's expense tracker and use the{' '}
                <SEOInternalLink href="/tools/business-cost-calculator">
                  business cost calculator
                </SEOInternalLink>{' '}
                to ensure you are not missing any allowable deductions. The{' '}
                <SEOInternalLink href="/tools/vat-scheme-comparison">
                  VAT scheme comparison
                </SEOInternalLink>{' '}
                tool helps you understand how expenses interact with your VAT position.
              </p>
            </>
          ),
        },
        {
          id: 'quarterly-planning',
          heading: 'Quarterly Tax Planning: Setting Aside the Right Amount',
          content: (
            <>
              <p>
                The most effective way to manage your tax liability is to set aside money throughout
                the year rather than scrambling in January. Here is a practical system used by many
                successful self-employed electricians:
              </p>
              <p>
                <strong className="text-yellow-400">Open a separate savings account.</strong> Every
                time a client payment hits your business account, immediately transfer a percentage
                to your tax savings account. For a basic-rate taxpayer, 25% to 30% of your profit
                (not turnover) is a good starting point. For a higher-rate taxpayer, 35% to 40%.
              </p>
              <p>
                <strong className="text-yellow-400">Review quarterly.</strong> Every three months,
                compare your actual income and expenses against your projections. Use Elec-Mate's
                Tax and NI Estimator to recalculate your projected year-end liability. If you are
                ahead of projection, increase your monthly transfer. If you are behind, you may be
                able to reduce it.
              </p>
              <p>
                <strong className="text-yellow-400">Plan for big expenses.</strong> If you know you
                have a large expense coming (van purchase, test equipment, training course), time it
                strategically. Buying in March (before the tax year ends on 5 April) means you can
                claim the expense against the current year's profits. Buying in April pushes it into
                the next tax year.
              </p>
              <p>
                Elec-Mate integrates income tracking, expense tracking, and tax estimation into a
                single dashboard. As you invoice clients and log expenses, your estimated tax
                liability updates automatically. The{' '}
                <SEOInternalLink href="/tools/business-analytics-electrician">
                  business analytics dashboard
                </SEOInternalLink>{' '}
                shows your quarterly trends and highlights any areas of concern.
              </p>
            </>
          ),
        },
      ]}
      features={[
        {
          icon: Calculator,
          title: 'Real-Time Tax Estimation',
          description:
            'As you log income and expenses, the estimator recalculates your projected income tax, Class 2 NI, and Class 4 NI bill for the current tax year.',
        },
        {
          icon: Calendar,
          title: 'Payment Date Reminders',
          description:
            'Shows exact amounts due on 31 January and 31 July, including payments on account. Never miss a deadline or be surprised by the amount.',
        },
        {
          icon: Receipt,
          title: 'Expense Impact Calculator',
          description:
            'See exactly how much tax each expense saves you. Log a £200 training course and instantly see it reduces your tax by £58 (basic rate).',
        },
        {
          icon: TrendingUp,
          title: 'Year-on-Year Comparison',
          description:
            'Compare your tax position against previous years. Spot trends in income, expenses, and effective tax rates.',
        },
        {
          icon: PoundSterling,
          title: 'Monthly Savings Calculator',
          description:
            'Calculates the exact amount you should transfer to your tax savings account each month to cover your projected liability.',
        },
        {
          icon: ShieldCheck,
          title: 'CIS Deduction Tracker',
          description:
            'If you work under CIS, track deductions made by contractors and see how they offset against your self-assessment liability.',
        },
      ]}
      featuresHeading="How Elec-Mate Estimates Your Tax and NI"
      featuresSubheading="Built for self-employed UK electricians. Accurate, up-to-date, and integrated with your income and expense tracking."
      faqs={[
        {
          question: 'How much tax does a self-employed electrician pay?',
          answer:
            'It depends on your taxable profit (income minus allowable expenses). For 2025/26, a sole trader electrician with a taxable profit of £35,000 would pay approximately £4,486 in income tax (20% on £22,430 above the personal allowance), £1,345.80 in Class 4 NI (6% on the same amount), and £179.40 in Class 2 NI — a total of approximately £6,011. The effective tax rate is 17.2% of total profit. At £50,000 profit, the total would be approximately £10,285 (effective rate of 20.6%). These figures assume you claim all allowable expenses.',
        },
        {
          question: 'What is the difference between Class 2 and Class 4 National Insurance?',
          answer:
            'Class 2 NI is a flat-rate weekly contribution (£3.45 per week in 2025/26, totalling approximately £179.40 per year) that counts towards your state pension qualifying years. You need 35 qualifying years for the full new state pension. Class 4 NI is a percentage of your profits — 6% on profits between £12,570 and £50,270, and 2% on profits above that. Class 4 does not count towards your state pension and is effectively an additional tax on self-employed income. Both are paid through your self-assessment tax return.',
        },
        {
          question: 'When do I need to pay my tax bill?',
          answer:
            'Key dates for self-assessment are: 5 October — register for self-assessment if you are newly self-employed; 31 October — paper tax return deadline; 31 January — online tax return deadline AND payment of your tax bill AND first payment on account for the following year; 31 July — second payment on account. Missing the 31 January filing deadline results in an automatic £100 penalty, even if you owe no tax. Missing the payment deadline results in interest charges on the outstanding amount.',
        },
        {
          question: 'What expenses can a self-employed electrician claim?',
          answer:
            'You can claim any expense that is "wholly and exclusively" for business purposes. Common claims for electricians include: van costs (fuel, insurance, road tax, MOT, servicing, finance interest), tools and equipment (hand tools, power tools, test instruments), calibration costs, materials for jobs, insurance (public liability, professional indemnity), certification body fees (NICEIC, NAPIT, ELECSA), training and CPD courses, accountancy fees, phone contract (business percentage), software subscriptions, workwear and PPE, parking and tolls, and use of home as office.',
        },
        {
          question: 'Should I become a limited company to save tax?',
          answer:
            'It depends on your profit level and personal circumstances. As a rough guide, incorporation starts to become tax-efficient when your profits consistently exceed £40,000 to £50,000 per year. Below this, the additional costs of running a limited company (accountancy, Companies House filing, payroll administration) and the loss of simplicity often outweigh the tax savings. Above this level, taking a combination of salary and dividends can reduce your overall tax and NI bill. However, there are many factors beyond tax — including mortgage applications, IR35 risk, and administrative burden. Consult an accountant who specialises in construction trades before making this decision.',
        },
        {
          question: 'How do payments on account work?',
          answer:
            "Payments on account are advance payments towards your next year's tax bill. HMRC assumes your next year's bill will be the same as the current year's. You pay 50% of the estimated amount on 31 January (alongside your actual bill for the previous year) and another 50% on 31 July. A balancing payment or refund is made the following January when actual figures are available. This means your second January as self-employed is particularly expensive — you pay the full bill for year one plus 50% of the estimated bill for year two. Elec-Mate calculates these amounts automatically and reminds you before each payment date.",
        },
      ]}
      relatedPages={[
        {
          href: '/tools/electrician-tax-guide',
          title: 'Electrician Tax Guide',
          description:
            'Complete guide to tax for self-employed electricians — self-assessment, expenses, and tax planning.',
          icon: FileText,
          category: 'Business Guides',
        },
        {
          href: '/tools/cis-for-electricians',
          title: 'CIS for Electricians',
          description:
            'Construction Industry Scheme explained — registration, deductions, and how CIS affects your tax return.',
          icon: Receipt,
          category: 'Business Guides',
        },
        {
          href: '/tools/vat-scheme-comparison',
          title: 'VAT Scheme Comparison',
          description:
            'Compare flat rate, standard rate, and cash accounting VAT schemes for electrical businesses.',
          icon: Calculator,
          category: 'Business Tools',
        },
        {
          href: '/tools/going-self-employed-electrician',
          title: 'Going Self-Employed',
          description:
            'Complete guide to becoming a self-employed electrician — registration, insurance, and first steps.',
          icon: Briefcase,
          category: 'Business Guides',
        },
        {
          href: '/tools/business-cost-calculator',
          title: 'Business Cost Calculator',
          description:
            'Calculate the true running costs of your electrical business — van, tools, insurance, and all overheads.',
          icon: PoundSterling,
          category: 'Business Calculators',
        },
        {
          href: '/tools/cash-flow-planner',
          title: 'Cash Flow Planner',
          description:
            'Forecast your cash position and plan for tax payments, VAT, and business expenses.',
          icon: TrendingUp,
          category: 'Business Calculators',
        },
      ]}
      ctaHeading="Estimate Your Tax Bill Accurately"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to track income, log expenses, and estimate tax in real time. No January surprises. 7-day free trial, cancel anytime."
      extraSchemas={[
        {
          '@type': 'SoftwareApplication',
          name: 'Elec-Mate Tax & NI Estimator',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web, iOS, Android',
          description:
            'Estimate income tax and National Insurance for self-employed electricians. Real-time calculation, payment date reminders, and expense impact tracking.',
          url: 'https://elec-mate.com/tools/tax-ni-estimator',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'GBP',
            description: '7-day free trial, then from £9.99/month',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '430',
            bestRating: '5',
          },
        },
      ]}
      pagePath={PAGE_PATH}
    />
  );
}
