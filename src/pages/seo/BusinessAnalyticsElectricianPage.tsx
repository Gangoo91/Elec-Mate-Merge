import BusinessTemplate from '@/pages/seo/templates/BusinessTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  BarChart3,
  PoundSterling,
  TrendingUp,
  Calculator,
  Receipt,
  Briefcase,
  Users,
  Target,
  LineChart,
  PieChart,
  Activity,
  Clock,
} from 'lucide-react';

const PAGE_PATH = '/tools/business-analytics-electrician';

export default function BusinessAnalyticsElectricianPage() {
  return (
    <BusinessTemplate
      title="Business Analytics for Electricians | Dashboard"
      description="Track revenue, job profitability, customer trends, and cash flow with analytics built for UK electricians. Real-time dashboards, KPIs, and actionable insights to grow your electrical business."
      datePublished="2025-08-10"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Business Tools', href: '/tools' },
        { label: 'Business Analytics', href: PAGE_PATH },
      ]}
      tocItems={[
        { id: 'why-analytics', label: 'Why Track Business Analytics' },
        { id: 'revenue-tracking', label: 'Revenue Tracking' },
        { id: 'job-profitability', label: 'Job Profitability Analysis' },
        { id: 'customer-analysis', label: 'Customer Analysis' },
        { id: 'cash-flow-forecasting', label: 'Cash Flow Forecasting' },
        { id: 'kpis', label: 'KPIs Every Electrician Should Track' },
        { id: 'features', label: 'Elec-Mate Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Business Intelligence"
      badgeIcon={BarChart3}
      heroTitle={
        <>
          Business Analytics
          <span className="block text-yellow-400 mt-1">Dashboard for Electricians</span>
        </>
      }
      heroSubtitle="Stop running your electrical business blind. Elec-Mate's analytics dashboard gives you real-time visibility of revenue, profitability, customer trends, and cash flow — so every business decision is backed by data, not guesswork."
      readingTime={10}
      stats={[
        { value: '23%', label: 'Average revenue increase with data-driven decisions' },
        { value: '12', label: 'Key performance indicators tracked automatically' },
        { value: '£3,200', label: 'Average hidden profit found per year' },
        { value: '14', label: 'Business calculators in Elec-Mate' },
      ]}
      keyTakeaways={[
        'Most electricians make business decisions based on instinct rather than data — analytics changes the game by showing exactly what works and what does not.',
        'Revenue tracking by job type, client type, and time period reveals which work is genuinely most profitable and where to focus your marketing.',
        'Customer analysis shows which clients generate repeat work, pay promptly, and refer new customers — so you know who to prioritise.',
        'Cash flow forecasting turns reactive panic into proactive planning, letting you spot shortfalls weeks before they become crises.',
        'Tracking just 5 KPIs (revenue, profit margin, quote win rate, average job value, and debtor days) gives you 80% of the insight you need.',
      ]}
      sections={[
        {
          id: 'why-analytics',
          heading: 'Why Electricians Need Business Analytics',
          content: (
            <>
              <p>
                Most electricians run their business on instinct. They know they are "busy" but do
                not know their exact revenue this month. They feel like certain jobs "pay well" but
                have never calculated the actual profit margin. They think their pricing is "about
                right" but have no data to confirm it. This works when business is good — but when
                things tighten, instinct is not enough.
              </p>
              <p>
                <strong className="text-yellow-400">Analytics gives you certainty.</strong> Instead
                of guessing, you can see precisely: how much revenue you are generating per week,
                month, and quarter; which job types produce the highest profit margins; which
                clients generate the most value (including repeat work and referrals); where your
                cash flow gaps are going to appear; and whether your business is growing, stable, or
                declining.
              </p>
              <p>
                Elec-Mate's analytics dashboard is not a generic business tool retrofitted for
                trades — it is built specifically for UK electricians. It understands the structure
                of electrical work, integrates with your quotes, invoices, expenses, and
                certificates, and presents insights in clear, actionable formats. Use the{' '}
                <SEOInternalLink href="/tools/business-cost-calculator">
                  business cost calculator
                </SEOInternalLink>{' '}
                to set your cost baselines, and analytics will track performance against them
                automatically.
              </p>
            </>
          ),
          appBridge: {
            title: 'See Your Business Clearly for the First Time',
            description:
              "Elec-Mate's analytics dashboard pulls data from your quotes, invoices, expenses, and jobs to give you a real-time picture of your business performance. No manual data entry.",
            icon: BarChart3,
          },
        },
        {
          id: 'revenue-tracking',
          heading: 'Revenue Tracking — Know Your Numbers',
          content: (
            <>
              <p>
                Revenue tracking means knowing exactly how much money is coming into your business,
                when it arrives, and where it comes from. This sounds basic, but many sole trader
                electricians only find out their annual revenue when their accountant prepares their
                tax return — months after the year has ended.
              </p>
              <p>
                <strong className="text-yellow-400">Revenue by job type:</strong> Breaking down
                revenue by job type (rewires, board changes, additional circuits, testing, EV
                chargers, commercial work) reveals which types of work generate the most income.
                This is not the same as profitability (a job type can generate high revenue but low
                profit) — but it shows where your business focus currently is and whether it matches
                your strategy.
              </p>
              <p>
                <strong className="text-yellow-400">Revenue by time period:</strong> Weekly,
                monthly, and quarterly revenue tracking reveals seasonal patterns. Most UK
                electrical businesses see peaks in spring and autumn with quieter periods in summer
                and around Christmas. Understanding your seasonal pattern lets you plan marketing,
                staffing, and cash reserves accordingly.
              </p>
              <p>
                <strong className="text-yellow-400">Revenue by source:</strong> Where does your work
                come from? Word of mouth, Google, social media, directory listings, main
                contractors, estate agents? Tracking revenue by source tells you which marketing
                channels deliver the best return — and which you can stop wasting money on. The{' '}
                <SEOInternalLink href="/tools/customer-management-electrician">
                  customer management tool
                </SEOInternalLink>{' '}
                tracks referral sources for every client.
              </p>
            </>
          ),
        },
        {
          id: 'job-profitability',
          heading: 'Job Profitability Analysis',
          content: (
            <>
              <p>
                Revenue tells you how much money comes in. Profitability tells you how much you
                keep. A job that generates £5,000 of revenue sounds great — but if it cost you
                £4,500 in materials, labour, and overheads, the profit is only £500 and your margin
                is just 10%.
              </p>
              <p>
                <strong className="text-yellow-400">Profit by job type:</strong> Elec-Mate's
                analytics break down profit margins by job type. You might discover that EICR
                inspections at £180 each have a 65% margin (£117 profit in 2 hours = £58.50/hour),
                while full rewires at £5,000 have a 15% margin (£750 profit in 40 hours =
                £18.75/hour). This data transforms your marketing strategy — you would focus on
                winning more of the high-profit-per-hour work.
              </p>
              <p>
                <strong className="text-yellow-400">Actual vs quoted:</strong> Comparing what you
                quoted against what the job actually cost reveals whether your estimating is
                accurate. Consistent underquoting on a specific job type means you need to adjust
                your pricing template. Consistent overquoting means you are pricing yourself out of
                work unnecessarily. Use the{' '}
                <SEOInternalLink href="/tools/job-profitability-calculator">
                  job profitability calculator
                </SEOInternalLink>{' '}
                for individual job analysis and the analytics dashboard for trends across all jobs.
              </p>
              <p>
                <strong className="text-yellow-400">Profit per hour worked:</strong> This is the
                single most important metric for any electrician. It accounts for all time invested
                in a job — not just hours on site, but travel, procurement, admin, testing, and
                certification time. The{' '}
                <SEOInternalLink href="/tools/pricing-strategy-electrician">
                  pricing strategy tool
                </SEOInternalLink>{' '}
                helps you set prices that deliver your target profit per hour.
              </p>
            </>
          ),
        },
        {
          id: 'customer-analysis',
          heading: 'Customer Analysis — Find Your Best Clients',
          content: (
            <>
              <p>
                Not all clients are created equal. Some pay promptly, accept your quotes without
                haggling, recommend you to friends, and call you back for future work. Others pay
                late, push for discounts, complain about everything, and never call again. Customer
                analysis helps you identify and focus on the good ones.
              </p>
              <p>
                <strong className="text-yellow-400">Client lifetime value:</strong> Instead of
                looking at each job in isolation, analytics tracks the total revenue and profit from
                each client over time. A landlord who gives you 4 EICR inspections per year at £180
                each is worth £720/year — or £3,600 over 5 years. A one-off domestic rewire at
                £5,000 looks bigger, but the landlord is more valuable long-term (and pays within 7
                days).
              </p>
              <p>
                <strong className="text-yellow-400">Payment behaviour:</strong> Analytics tracks how
                quickly each client pays. If a commercial client consistently takes 60 days when
                your terms say 30, you can see the cash flow impact and decide whether to tighten
                terms, add a late payment charge, or stop working for them. The{' '}
                <SEOInternalLink href="/tools/cash-flow-planner">cash flow planner</SEOInternalLink>{' '}
                factors in each client's payment history when forecasting.
              </p>
              <p>
                <strong className="text-yellow-400">Referral tracking:</strong> Knowing which
                clients refer new work lets you nurture those relationships. A simple thank-you
                message after a referral costs nothing but builds loyalty. Elec-Mate tracks referral
                chains so you can see the total value generated by each referrer.
              </p>
            </>
          ),
        },
        {
          id: 'cash-flow-forecasting',
          heading: 'Cash Flow Forecasting with Analytics',
          content: (
            <>
              <p>
                Cash flow forecasting combines your historical data (payment patterns, seasonal
                trends, expense timing) with your current pipeline (accepted quotes, jobs in
                progress, outstanding invoices) to predict your bank balance for the next 3 to 6
                months. This turns reactive cash management ("I have run out of money") into
                proactive planning ("I can see a gap in March and need to act now").
              </p>
              <p>
                <strong className="text-yellow-400">Predictive cash position:</strong> Based on your
                historical payment collection patterns, Elec-Mate predicts when outstanding invoices
                will actually be paid (not when they are due, but when they are likely to arrive
                based on each client's track record). Combined with your scheduled expenses, this
                gives an accurate week-by-week cash forecast.
              </p>
              <p>
                <strong className="text-yellow-400">Scenario planning:</strong> What happens if that
                large commercial job gets delayed by 2 weeks? What if a key client pays 30 days
                late? What if material costs increase by 10%? Analytics lets you model scenarios so
                you can prepare contingency plans before problems materialise.
              </p>
              <p>
                The detailed{' '}
                <SEOInternalLink href="/tools/cash-flow-planner">cash flow planner</SEOInternalLink>{' '}
                provides the granular, week-by-week forecast, while the analytics dashboard shows
                the higher-level trends and patterns.
              </p>
            </>
          ),
          appBridge: {
            title: 'Predict Your Cash Position Months Ahead',
            description:
              'Elec-Mate combines your pipeline, invoice data, and expense schedules to forecast cash flow automatically. Spot gaps early and take action before they become crises.',
            icon: LineChart,
          },
        },
        {
          id: 'kpis',
          heading: 'KPIs Every Electrician Should Track',
          content: (
            <>
              <p>
                Key Performance Indicators (KPIs) are the vital signs of your business. You do not
                need to track dozens of metrics — focus on these five and you will have a clear
                picture of your business health:
              </p>
              <p>
                <strong className="text-yellow-400">1. Monthly revenue:</strong> How much money came
                in this month? Track against the same month last year and against your target. A
                consistent upward trend means growth; a decline means something needs attention.
              </p>
              <p>
                <strong className="text-yellow-400">2. Gross profit margin:</strong> What percentage
                of your revenue is profit after deducting direct costs (materials, labour,
                subcontractors)? Target 25% to 40% depending on your job mix. Below 20% means your
                pricing needs attention.
              </p>
              <p>
                <strong className="text-yellow-400">3. Quote win rate:</strong> What percentage of
                quotes you send are accepted? A healthy win rate is 40% to 60%. Below 30% suggests
                your pricing is too high or your quotes are not compelling enough. Above 70%
                suggests you may be undercharging. The{' '}
                <SEOInternalLink href="/tools/best-quoting-app">quoting app</SEOInternalLink> tracks
                this automatically.
              </p>
              <p>
                <strong className="text-yellow-400">4. Average job value:</strong> What is the
                average value of each job you complete? Tracking this over time shows whether you
                are moving towards higher-value work or getting stuck in small jobs that consume
                your time.
              </p>
              <p>
                <strong className="text-yellow-400">5. Debtor days:</strong> How many days on
                average does it take your clients to pay? Lower is better. If debtor days are
                creeping up, you need to tighten payment terms or chase invoices more aggressively.
                The{' '}
                <SEOInternalLink href="/tools/electrician-invoice-app">invoice app</SEOInternalLink>{' '}
                sends automatic payment reminders to reduce debtor days.
              </p>
            </>
          ),
        },
      ]}
      features={[
        {
          icon: LineChart,
          title: 'Revenue Dashboard',
          description:
            'Track revenue by week, month, quarter, and year. Break down by job type, client type, and source. Compare against targets and previous periods.',
        },
        {
          icon: PieChart,
          title: 'Profitability Breakdown',
          description:
            'See profit margins by job type, client, and time period. Identify your most profitable work and focus your efforts there.',
        },
        {
          icon: Users,
          title: 'Client Analytics',
          description:
            'Track client lifetime value, payment behaviour, repeat work rate, and referral history. Know who your best clients are.',
        },
        {
          icon: Activity,
          title: 'Cash Flow Forecast',
          description:
            'Predict your cash position for the next 3 to 6 months based on your pipeline, invoices, and historical payment patterns.',
        },
        {
          icon: Target,
          title: 'KPI Scorecards',
          description:
            'Monitor your 5 key business metrics at a glance. Set targets, track progress, and get alerted when metrics drop below threshold.',
        },
        {
          icon: Clock,
          title: 'Time Analysis',
          description:
            'Track how you spend your time — billable work, travel, admin, quoting, procurement. Find hours to reclaim and increase billable efficiency.',
        },
      ]}
      featuresHeading="Elec-Mate Business Analytics Features"
      featuresSubheading="Purpose-built analytics for UK electrical businesses. Every metric that matters, automatically tracked and beautifully presented."
      faqs={[
        {
          question: 'Do I need business analytics as a sole trader electrician?',
          answer:
            'Absolutely. Sole traders arguably need analytics more than larger businesses because every decision has a direct impact on your income. Without analytics, you are guessing — which clients are most valuable, which job types are most profitable, whether your pricing is right, and whether your business is growing or shrinking. Even tracking just 3 metrics (monthly revenue, profit margin, and debtor days) gives you far more control over your business than most electricians have. Elec-Mate makes analytics effortless by pulling data from your existing quotes, invoices, and expenses — no extra data entry required.',
        },
        {
          question: 'What is the most important metric for an electrical business?',
          answer:
            'Profit per hour worked. This single metric tells you more about your business than any other number. It accounts for everything — the price you charged, the cost of materials, the time you invested (including travel, admin, and snagging), and your overhead allocation. Two jobs can have the same profit in pounds but wildly different profits per hour. A £300 profit job that took 5 hours (£60/hour) is better business than a £500 profit job that took 20 hours (£25/hour). Track this for every job and you will quickly see which work to pursue and which to avoid.',
        },
        {
          question: 'How often should I check my business analytics?',
          answer:
            'Review your key metrics (revenue, profit margin, debtor days) weekly — it takes less than 5 minutes if you are using Elec-Mate because the data is always up to date. Do a deeper monthly review looking at profitability by job type, client analysis, and cash flow forecast. Do a comprehensive quarterly review including year-on-year comparisons, pricing review, and strategic planning. The weekly check catches problems early; the monthly review informs tactical decisions; the quarterly review drives strategic direction.',
        },
        {
          question: 'Can analytics help me win more work?',
          answer:
            'Yes, in several ways. Quote win rate analysis shows you which types of quotes are most likely to be accepted and which pricing approaches work best. Client analysis reveals which referral sources generate the most work, so you can invest more in those channels. Revenue trend analysis shows seasonal patterns, letting you plan marketing campaigns ahead of quiet periods. And by understanding your true costs and margins, you can price more competitively on high-volume work while maintaining margins — winning more jobs without sacrificing profit.',
        },
        {
          question: 'How does Elec-Mate analytics work if I am already using accounting software?',
          answer:
            'Elec-Mate analytics complement your accounting software rather than replacing it. Your accountant uses accounting software (Xero, QuickBooks, FreeAgent) for tax returns, year-end accounts, and statutory compliance. Elec-Mate provides real-time operational analytics that help you make day-to-day business decisions — which jobs to quote on, how to price, which clients to prioritise, and where to focus your marketing. The data comes from your quotes, invoices, and expenses within Elec-Mate, so there is no duplicate data entry. You can export financial summaries for your accountant at any time.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/job-profitability-calculator',
          title: 'Job Profitability Calculator',
          description:
            'Calculate the true profit on every job with full cost breakdown and margin analysis.',
          icon: Calculator,
          category: 'Business Calculators',
        },
        {
          href: '/tools/cash-flow-planner',
          title: 'Cash Flow Planner',
          description: 'Detailed week-by-week cash flow forecasting for your electrical business.',
          icon: Briefcase,
          category: 'Business Calculators',
        },
        {
          href: '/tools/pricing-strategy-electrician',
          title: 'Pricing Strategy',
          description: 'Use analytics data to set prices that win work and deliver target margins.',
          icon: PoundSterling,
          category: 'Business Strategy',
        },
        {
          href: '/tools/customer-management-electrician',
          title: 'Customer Management CRM',
          description:
            'Track client relationships, job history, and referral sources in one place.',
          icon: Users,
          category: 'Business Tools',
        },
        {
          href: '/tools/business-cost-calculator',
          title: 'Business Cost Calculator',
          description:
            'Set accurate cost baselines for your analytics by calculating every overhead category.',
          icon: Calculator,
          category: 'Business Calculators',
        },
        {
          href: '/tools/project-management-electrician',
          title: 'Project Management',
          description:
            'Track job progress, schedules, and resource allocation alongside your analytics.',
          icon: Target,
          category: 'Business Tools',
        },
      ]}
      ctaHeading="Run Your Business on Data, Not Guesswork"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate's analytics to track revenue, margins, and KPIs. Make smarter decisions with real-time business intelligence. 7-day free trial, cancel anytime."
      extraSchemas={[
        {
          '@type': 'SoftwareApplication',
          name: 'Elec-Mate Business Analytics Dashboard',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web, iOS, Android',
          description:
            'Real-time business analytics for UK electricians. Track revenue, job profitability, customer trends, cash flow, and KPIs — all in one dashboard built for the electrical trade.',
          url: 'https://elec-mate.com/tools/business-analytics-electrician',
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
