import BusinessTemplate from '@/pages/seo/templates/BusinessTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Calculator,
  PoundSterling,
  TrendingUp,
  Target,
  BarChart3,
  ShieldCheck,
  Clock,
  Briefcase,
  Receipt,
  AlertTriangle,
  Wrench,
  Scale,
} from 'lucide-react';

const PAGE_PATH = '/tools/break-even-calculator';

export default function BreakEvenCalculatorPage() {
  return (
    <BusinessTemplate
      title="Break-Even Calculator for Electricians"
      description="Calculate your break-even point — how many billable hours or jobs you need each month to cover all your costs. Understand fixed vs variable costs, margin of safety, and how pricing decisions affect your break-even point."
      datePublished="2025-09-01"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Business Tools', href: '/tools' },
        { label: 'Break-Even Calculator', href: PAGE_PATH },
      ]}
      tocItems={[
        { id: 'what-is-break-even', label: 'What Is Break-Even?' },
        { id: 'fixed-vs-variable', label: 'Fixed vs Variable Costs' },
        { id: 'calculating-break-even', label: 'Calculating Your Break-Even Point' },
        { id: 'margin-of-safety', label: 'Margin of Safety' },
        { id: 'pricing-impact', label: 'How Pricing Affects Break-Even' },
        { id: 'monthly-targets', label: 'Setting Monthly Revenue Targets' },
        { id: 'features', label: 'Elec-Mate Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Business Calculators"
      badgeIcon={Target}
      heroTitle={
        <>
          Break-Even Calculator
          <span className="block text-yellow-400 mt-1">For UK Electricians</span>
        </>
      }
      heroSubtitle="Your break-even point is the minimum revenue you need to cover all your business costs — before you make a single pound of profit. Know this number and you can price with confidence, set meaningful targets, and understand exactly how pricing decisions affect your bottom line. Most sole trader electricians have never calculated it."
      readingTime={9}
      stats={[
        { value: '£2,800', label: 'Average monthly break-even for a sole trader electrician' },
        { value: '12-15', label: 'Typical number of billable days needed to break even per month' },
        { value: '34%', label: 'Of electricians do not know their break-even point' },
        { value: '£10+', label: 'Extra profit per hour when you price above break-even' },
      ]}
      keyTakeaways={[
        'Your break-even point is the revenue level where total income equals total costs — below it you make a loss, above it you make profit.',
        'Fixed costs (van, insurance, certification) must be paid regardless of how many jobs you do — they set the floor for your break-even point.',
        'Variable costs (fuel, materials, consumables) increase with each job but also generate revenue — the contribution margin is what covers your fixed costs.',
        'Raising your day rate by just £20 can reduce your break-even point by 2 to 3 billable days per month and add £4,000 to £6,000 per year in profit.',
        'Elec-Mate calculates your break-even point automatically from your tracked costs and shows how pricing changes affect it in real time.',
      ]}
      sections={[
        {
          id: 'what-is-break-even',
          heading: 'What Is the Break-Even Point and Why Does It Matter?',
          content: (
            <>
              <p>
                Your break-even point is the exact amount of revenue at which your total income
                equals your total costs. Below this point, your business is losing money. Above it,
                every additional pound is profit. It is the most fundamental number in your business
                finances, and knowing it transforms how you think about pricing, workload, and
                growth.
              </p>
              <p>
                Consider a sole trader electrician with total monthly costs of £2,800 (including
                van, insurance, tools, fuel, certification, phone, and a reasonable salary for
                himself). If he charges £300 per day and works 22 days per month, his revenue is
                £6,600 — well above break-even. But if work drops to 8 days per month (£2,400
                revenue), he is losing £400 per month. Knowing that 10 billable days is his
                break-even point allows him to make informed decisions: can he afford to take a week
                off? Should he accept a lower-margin job to fill a gap? How much does he need to
                earn in a busy month to compensate for a quiet one?
              </p>
              <p>
                Without knowing your break-even point, you are guessing. And guessing leads to
                either working too hard for too little or turning down work you can actually afford
                to take. Elec-Mate's{' '}
                <SEOInternalLink href="/tools/business-cost-calculator">
                  business cost calculator
                </SEOInternalLink>{' '}
                captures every overhead, and the break-even calculator converts those costs into a
                clear target number.
              </p>
            </>
          ),
          appBridge: {
            title: 'Calculate Your Break-Even Point Now',
            description:
              'Enter your fixed costs, variable costs, and day rate. Elec-Mate instantly calculates how many billable days per month you need to break even — and how much profit each additional day generates.',
            icon: Target,
          },
        },
        {
          id: 'fixed-vs-variable',
          heading: 'Fixed vs Variable Costs: Understanding the Difference',
          content: (
            <>
              <p>
                Breaking your costs into fixed and variable categories is essential for accurate
                break-even analysis. The distinction determines how your costs behave as your
                workload changes.
              </p>
              <p>
                <strong className="text-yellow-400">Fixed costs</strong> stay the same regardless of
                how many jobs you do. Even in a month with zero work, these costs must be paid. For
                a sole trader electrician, typical fixed costs include:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <ul className="space-y-2 text-white">
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>Van lease or finance: £250 to £400 per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>Van insurance: £100 to £210 per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>Public liability insurance: £20 to £45 per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>Certification body fees (NICEIC/NAPIT): £35 to £70 per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>Phone contract: £20 to £50 per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>Software subscriptions: £10 to £30 per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                    <span>Accountancy fees: £25 to £100 per month</span>
                  </li>
                </ul>
              </div>
              <p>
                <strong className="text-yellow-400">Variable costs</strong> change with your
                workload. The more jobs you do, the higher these costs. Typical variable costs
                include fuel (£10 to £30 per job depending on distance), consumables (drill bits,
                fixings, tape, cable ties — £5 to £20 per job), and materials purchased for specific
                jobs (variable but passed on to the client in most pricing models).
              </p>
              <p>
                The{' '}
                <SEOInternalLink href="/tools/hourly-rate-calculator">
                  hourly rate calculator
                </SEOInternalLink>{' '}
                uses this fixed/variable split to calculate the overhead component that must be
                included in every hour you bill.
              </p>
            </>
          ),
        },
        {
          id: 'calculating-break-even',
          heading: 'How to Calculate Your Break-Even Point',
          content: (
            <>
              <p>
                The break-even formula is straightforward: Break-Even Revenue = Fixed Costs /
                Contribution Margin Ratio. The contribution margin is the amount of each pound of
                revenue that is left after paying variable costs.
              </p>
              <p>
                <strong className="text-yellow-400">Step 1: Total your monthly fixed costs.</strong>{' '}
                Using the example above, a sole trader might have fixed costs of £1,200 per month
                (excluding their own salary) or £2,800 per month (including a modest salary of
                £1,600 after tax).
              </p>
              <p>
                <strong className="text-yellow-400">
                  Step 2: Calculate your contribution margin.
                </strong>{' '}
                If you charge £300 per day and your variable costs per day are approximately £30
                (fuel and consumables), your contribution margin is £270 per day. In percentage
                terms, that is 90% (£270 / £300).
              </p>
              <p>
                <strong className="text-yellow-400">Step 3: Calculate break-even.</strong> Monthly
                fixed costs of £2,800 / contribution margin of £270 per day = 10.4 billable days per
                month. Round up to 11 days. This means you need 11 billable days per month to cover
                all your costs including your salary. Every day beyond 11 is pure profit at your
                contribution margin rate.
              </p>
              <p>
                <strong className="text-yellow-400">The profit zone:</strong> If you work 20
                billable days per month, you have 9 days above break-even. At £270 contribution
                margin per day, that is £2,430 per month in profit — on top of your salary. This is
                why knowing your break-even point is so powerful: it shows you exactly how much
                profit each additional day of work generates.
              </p>
            </>
          ),
        },
        {
          id: 'margin-of-safety',
          heading: 'Margin of Safety: How Protected Is Your Business?',
          content: (
            <>
              <p>
                The margin of safety is the difference between your actual revenue and your
                break-even revenue, expressed as a percentage. It tells you how much your workload
                can drop before you start losing money.
              </p>
              <p>
                Using the example above: if your break-even is £2,800 per month and your actual
                revenue is typically £6,000, your margin of safety is (£6,000 - £2,800) / £6,000 =
                53%. This means your revenue could fall by 53% before you start making a loss. That
                is a healthy buffer.
              </p>
              <p>
                <strong className="text-yellow-400">Below 20% margin of safety:</strong> Your
                business is vulnerable. A few cancelled jobs, a week of illness, or a quiet patch
                could push you below break-even. Focus on building your client base, increasing your{' '}
                <SEOInternalLink href="/tools/pricing-strategy-electrician">prices</SEOInternalLink>
                , or reducing fixed costs.
              </p>
              <p>
                <strong className="text-yellow-400">20% to 40% margin of safety:</strong> Reasonable
                but not comfortable. You can absorb normal fluctuations but a prolonged quiet period
                would be concerning. This is typical for electricians in their first two years of
                business.
              </p>
              <p>
                <strong className="text-yellow-400">Above 40% margin of safety:</strong> Healthy
                position. Your business can withstand significant revenue drops without making a
                loss. You have room to invest in growth, take holidays, and absorb unexpected costs
                without financial stress.
              </p>
              <p>
                Elec-Mate calculates your margin of safety automatically from your revenue and cost
                data, updating in real time as you complete jobs and log expenses.
              </p>
            </>
          ),
        },
        {
          id: 'pricing-impact',
          heading: 'How Pricing Decisions Affect Your Break-Even Point',
          content: (
            <>
              <p>
                Small changes in your pricing have a disproportionate effect on your break-even
                point and profitability. This is because pricing changes affect only revenue, not
                fixed costs — so every pound of price increase goes directly to your contribution
                margin.
              </p>
              <p>
                <strong className="text-yellow-400">Example: £20 day rate increase.</strong>{' '}
                Increasing your day rate from £300 to £320 raises your contribution margin from £270
                to £290. Your break-even point drops from 10.4 days to 9.7 days — nearly a full day
                less per month. Over a year, this adds £4,400 in profit (220 working days x £20).
                The price increase is 6.7%, but the profit increase is significantly higher because
                your fixed costs do not change.
              </p>
              <p>
                <strong className="text-yellow-400">Example: £20 day rate decrease.</strong>{' '}
                Reducing your rate from £300 to £280 drops your contribution margin to £250 and
                pushes your break-even from 10.4 to 11.2 days. You now need an extra day per month
                just to break even. Over a year, you lose £4,400 in profit. This is why competing on
                price is so dangerous — a small reduction in rates requires a significant increase
                in volume to maintain the same profit.
              </p>
              <p>
                Use the{' '}
                <SEOInternalLink href="/tools/minimum-charge-calculator">
                  minimum charge calculator
                </SEOInternalLink>{' '}
                to ensure you never price a job below your cost floor, and the{' '}
                <SEOInternalLink href="/tools/hourly-rate-calculator">
                  hourly rate calculator
                </SEOInternalLink>{' '}
                to set rates that guarantee profitability on every billable hour.
              </p>
            </>
          ),
          appBridge: {
            title: 'Model Your Break-Even Scenarios',
            description:
              'Elec-Mate lets you adjust your day rate, fixed costs, and variable costs to see how each change affects your break-even point and annual profit. Make pricing decisions with data.',
            icon: TrendingUp,
          },
        },
        {
          id: 'monthly-targets',
          heading: 'Setting Monthly Revenue Targets',
          content: (
            <>
              <p>
                Your break-even point gives you a minimum target, but you should also set a profit
                target. The approach is simple: decide how much profit you want to make per month,
                add it to your break-even revenue, and convert the total into a target number of
                billable days or jobs.
              </p>
              <p>
                <strong className="text-yellow-400">Example:</strong> Break-even revenue of £2,800
                per month plus a profit target of £2,000 per month = total revenue target of £4,800.
                At £300 per day, that is 16 billable days per month. This is your working target —
                16 days of billable work out of approximately 22 working days, giving you a
                utilisation rate of 73% (which is in the healthy range).
              </p>
              <p>
                Set your targets in Elec-Mate's{' '}
                <SEOInternalLink href="/tools/business-analytics-electrician">
                  business analytics dashboard
                </SEOInternalLink>{' '}
                and track your progress through the month. The dashboard shows your actual revenue
                against target, projected month-end position based on confirmed bookings, and how
                many more billable days you need to hit your target.
              </p>
              <p>
                This target-based approach transforms your business from reactive (accepting
                whatever work comes in and hoping it is enough) to proactive (knowing exactly how
                much work you need and actively pursuing it when you are below target).
              </p>
            </>
          ),
        },
      ]}
      features={[
        {
          icon: Target,
          title: 'Break-Even Calculator',
          description:
            'Calculate your break-even point in billable hours, days, or monthly revenue. Updated automatically as your costs change.',
        },
        {
          icon: Scale,
          title: 'Margin of Safety Tracker',
          description:
            'See how far your revenue is above break-even — the bigger the margin, the more resilient your business.',
        },
        {
          icon: TrendingUp,
          title: 'Pricing Scenario Modelling',
          description:
            'Adjust your day rate, hourly rate, or fixed prices and instantly see the impact on your break-even point and annual profit.',
        },
        {
          icon: BarChart3,
          title: 'Monthly Target Dashboard',
          description:
            'Set revenue and profit targets, track progress through the month, and see projected month-end position.',
        },
        {
          icon: Calculator,
          title: 'Cost Classification',
          description:
            'Automatically categorise expenses as fixed or variable. Get an accurate picture of your cost structure.',
        },
        {
          icon: PoundSterling,
          title: 'Contribution Margin Analysis',
          description:
            'See exactly how much profit each billable day or hour contributes after variable costs are covered.',
        },
      ]}
      featuresHeading="How Elec-Mate Calculates Your Break-Even"
      featuresSubheading="Built for UK electricians. Accurate, visual, and actionable — know your numbers, price with confidence."
      faqs={[
        {
          question: 'What is a typical break-even point for a sole trader electrician?',
          answer:
            'A typical sole trader electrician with monthly fixed costs of £1,000 to £1,500 (excluding their own salary) breaks even at approximately 4 to 6 billable days per month. Including a reasonable salary of £2,000 to £2,500 per month, the break-even rises to 10 to 14 billable days. The exact figure depends on your specific fixed costs, day rate, and variable costs per job. Elec-Mate calculates your personal break-even from your actual tracked costs.',
        },
        {
          question: 'How does break-even differ from profitability?',
          answer:
            'Break-even is the point where your revenue exactly equals your total costs — you are not making a profit, but you are not making a loss either. Profitability starts above the break-even point. Every pound of revenue above your break-even contributes directly to profit (minus variable costs). A business can be at break-even but not profitable, which is why you should set revenue targets above break-even, not at it. The margin of safety tells you how far above break-even you are operating.',
        },
        {
          question: 'Should I include my own salary in the break-even calculation?',
          answer:
            'Yes. If you do not include your own salary (or drawings) as a cost, your break-even figure is misleadingly low. It would tell you how many days you need to work to cover your business expenses — but not to pay yourself. Include a realistic salary that reflects what you need to live on. If your personal living costs require £2,000 per month after tax, include that as a fixed cost. This gives you a break-even figure that represents genuine sustainability, not just covering your van and insurance.',
        },
        {
          question: 'How often should I recalculate my break-even point?',
          answer:
            'Recalculate whenever your costs or pricing change significantly. Key triggers include: changing your day rate, renewing your van lease or insurance, adding or removing a subscription, hiring or releasing a subcontractor, or making a large capital purchase. At minimum, review quarterly. Elec-Mate recalculates automatically as you log expenses and update your pricing, so your break-even figure is always current.',
        },
        {
          question: 'What is the contribution margin and why does it matter?',
          answer:
            'The contribution margin is the amount of revenue that remains after deducting variable costs. It represents how much each unit of work (day, hour, or job) contributes towards covering your fixed costs and generating profit. For example, if you charge £300 per day and your variable costs are £30, your contribution margin is £270 (90%). Higher contribution margins mean you reach break-even faster and each additional day of work generates more profit. To improve your contribution margin, either increase your prices or reduce your variable costs per job.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/business-cost-calculator',
          title: 'Business Cost Calculator',
          description:
            'Calculate the true running costs of your electrical business — every overhead captured.',
          icon: Calculator,
          category: 'Business Calculators',
        },
        {
          href: '/tools/pricing-strategy-electrician',
          title: 'Pricing Strategy for Electricians',
          description:
            'Fixed price vs day rate vs hourly — choose the right pricing model for every job type.',
          icon: PoundSterling,
          category: 'Business Tools',
        },
        {
          href: '/tools/hourly-rate-calculator',
          title: 'Hourly Rate Calculator',
          description:
            'Calculate your true hourly rate including all overheads, tax, and profit margin.',
          icon: Clock,
          category: 'Business Calculators',
        },
        {
          href: '/tools/minimum-charge-calculator',
          title: 'Minimum Charge Calculator',
          description:
            'Calculate your minimum job charge to ensure every callout covers your costs.',
          icon: Target,
          category: 'Business Calculators',
        },
        {
          href: '/tools/job-profitability-calculator',
          title: 'Job Profitability Calculator',
          description:
            'Calculate the true profit on every electrical job including all hidden costs.',
          icon: TrendingUp,
          category: 'Business Calculators',
        },
        {
          href: '/tools/business-analytics-electrician',
          title: 'Business Analytics Dashboard',
          description:
            'Track revenue, profitability, and KPIs across your entire electrical business.',
          icon: BarChart3,
          category: 'Business Tools',
        },
      ]}
      ctaHeading="Know Your Break-Even, Price with Confidence"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to calculate break-even, set targets, and price every job for profit. 7-day free trial, cancel anytime."
      extraSchemas={[
        {
          '@type': 'SoftwareApplication',
          name: 'Elec-Mate Break-Even Calculator',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web, iOS, Android',
          description:
            'Calculate the break-even point for your electrical business. Fixed vs variable costs, margin of safety, and pricing impact analysis.',
          url: 'https://elec-mate.com/tools/break-even-calculator',
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
