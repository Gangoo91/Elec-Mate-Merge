import BusinessTemplate from '@/pages/seo/templates/BusinessTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Users,
  Calendar,
  TrendingUp,
  Clock,
  BarChart3,
  Target,
  Calculator,
  Briefcase,
  PoundSterling,
  ClipboardCheck,
  Wrench,
  GraduationCap,
} from 'lucide-react';

const PAGE_PATH = '/tools/capacity-planning-calculator';

export default function CapacityPlanningCalculatorPage() {
  return (
    <BusinessTemplate
      title="Capacity Planning Calculator for Electricians"
      description="Plan your workforce capacity, schedule jobs efficiently, and maximise utilisation rates. Know exactly how many jobs you can take, when to hire, and how to grow your electrical business without overcommitting."
      datePublished="2025-09-01"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Business Tools', href: '/tools' },
        { label: 'Capacity Planning Calculator', href: PAGE_PATH },
      ]}
      tocItems={[
        { id: 'why-capacity-planning', label: 'Why Capacity Planning Matters' },
        { id: 'calculating-capacity', label: 'Calculating Your Capacity' },
        { id: 'utilisation-rates', label: 'Understanding Utilisation Rates' },
        { id: 'job-scheduling', label: 'Job Scheduling and Allocation' },
        { id: 'when-to-hire', label: 'When to Hire or Subcontract' },
        { id: 'growth-planning', label: 'Planning for Growth' },
        { id: 'features', label: 'Elec-Mate Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Business Calculators"
      badgeIcon={Users}
      heroTitle={
        <>
          Capacity Planning Calculator
          <span className="block text-yellow-400 mt-1">For UK Electricians</span>
        </>
      }
      heroSubtitle="The difference between a profitable electrical business and an overworked, underpaid one is capacity planning. Know how many billable hours you have available, how many jobs you can realistically take each week, when to say no, and when it is time to grow. Elec-Mate's capacity planning tools give you the data to make these decisions with confidence."
      readingTime={10}
      stats={[
        { value: '1,500', label: 'Average billable hours per year for a sole trader sparky' },
        { value: '65-75%', label: 'Target utilisation rate for a healthy electrical business' },
        { value: '22%', label: 'Of electricians regularly overcommit and miss deadlines' },
        { value: '£15,000+', label: 'Revenue lost per year from poor scheduling and gaps' },
      ]}
      keyTakeaways={[
        'A sole trader electrician has approximately 1,400 to 1,600 billable hours per year after deducting holidays, sick days, training, admin, and travel time.',
        'Your utilisation rate — the percentage of available hours spent on billable work — is the single most important metric for business profitability.',
        'Overcommitting leads to rushed work, missed deadlines, and customer complaints. Undercommitting means lost revenue and idle time.',
        'The right time to hire an employee or subcontractor is when your utilisation rate consistently exceeds 85% for three or more months.',
        'Elec-Mate tracks your job schedule, calculates your utilisation rate in real time, and alerts you when you are approaching capacity limits.',
      ]}
      sections={[
        {
          id: 'why-capacity-planning',
          heading: 'Why Capacity Planning Matters for Electricians',
          content: (
            <>
              <p>
                Most sole trader and small electrical businesses do not plan their capacity — they
                simply say yes to every job that comes in and hope they can fit it all in. The
                result is predictable: some weeks are impossibly busy, with jobs running over,
                customers chasing completion dates, and evenings spent doing paperwork. Other weeks
                are quiet, with gaps in the schedule and no revenue coming in.
              </p>
              <p>
                Capacity planning solves this by giving you a clear picture of how much work you can
                realistically handle. It starts with a simple calculation: how many productive,
                billable hours do you actually have available in a week, a month, or a year? Then it
                compares that against the work you have committed to. When your committed hours
                approach your available hours, you know you are at capacity and need to either
                decline work, subcontract, or extend timelines.
              </p>
              <p>
                For electrical businesses with employees or regular subcontractors, capacity
                planning becomes even more critical. You need to allocate the right people to the
                right jobs based on skills, qualifications, and availability. A{' '}
                <SEOInternalLink href="/tools/staff-management-electrician">
                  staff management system
                </SEOInternalLink>{' '}
                that tracks individual capacity alongside job requirements prevents the common
                problem of double-booking your team or leaving skilled electricians on jobs that do
                not require their qualifications.
              </p>
            </>
          ),
          appBridge: {
            title: 'See Your Real Capacity Right Now',
            description:
              'Elec-Mate calculates your available billable hours, tracks committed jobs, and shows your utilisation rate in real time. Know exactly how much work you can take on.',
            icon: Users,
          },
        },
        {
          id: 'calculating-capacity',
          heading: 'Calculating Your True Billable Capacity',
          content: (
            <>
              <p>
                Your billable capacity is not simply "8 hours a day, 5 days a week." There are
                significant deductions that most electricians do not account for. Here is a
                realistic calculation for a sole trader:
              </p>
              <p>
                <strong className="text-yellow-400">Starting point:</strong> 52 weeks x 5 days x 8
                hours = 2,080 total hours per year.
              </p>
              <p>
                <strong className="text-yellow-400">Deduct holidays:</strong> 28 days minimum
                (statutory entitlement including bank holidays) = 224 hours. Many electricians take
                fewer holidays than this, but you should budget for at least 28 days to avoid
                burnout.
              </p>
              <p>
                <strong className="text-yellow-400">Deduct sick days:</strong> Budget 5 to 8 days
                per year = 40 to 64 hours. Even if you rarely get ill, one bout of flu or a minor
                injury can wipe out a week.
              </p>
              <p>
                <strong className="text-yellow-400">Deduct training:</strong> 3 to 5 days per year
                for CPD, update courses, and new qualifications = 24 to 40 hours. Use Elec-Mate's{' '}
                <SEOInternalLink href="/tools/cpd-for-electricians">CPD tracker</SEOInternalLink> to
                log these hours automatically.
              </p>
              <p>
                <strong className="text-yellow-400">Deduct admin time:</strong> Quoting, invoicing,
                accounting, phone calls, and emails consume 3 to 5 hours per week = 156 to 260 hours
                per year.
              </p>
              <p>
                <strong className="text-yellow-400">Deduct travel time:</strong> 1 to 2 hours per
                day in non-billable travel = 250 to 500 hours per year.
              </p>
              <p>
                <strong className="text-yellow-400">Result:</strong> After all deductions, a typical
                sole trader has 1,350 to 1,600 billable hours per year — roughly 27 to 32 billable
                hours per week. That is your real capacity. Every job you quote and schedule must
                fit within these hours.
              </p>
            </>
          ),
        },
        {
          id: 'utilisation-rates',
          heading: 'Understanding and Improving Utilisation Rates',
          content: (
            <>
              <p>
                Your utilisation rate is the percentage of your available billable hours that you
                actually spend on billable work. It is calculated as: (hours billed to clients /
                total available billable hours) x 100.
              </p>
              <p>
                <strong className="text-yellow-400">Below 55%:</strong> You have too much idle time.
                Your marketing is not generating enough leads, you are declining too much work, or
                your pricing is putting clients off. Focus on lead generation and review your{' '}
                <SEOInternalLink href="/tools/pricing-strategy-electrician">
                  pricing strategy
                </SEOInternalLink>
                .
              </p>
              <p>
                <strong className="text-yellow-400">55% to 65%:</strong> Below target but
                sustainable. You have room to take on more work without overcommitting. This is
                common for electricians in their first year of business or those who have recently
                moved to a new area.
              </p>
              <p>
                <strong className="text-yellow-400">65% to 75%:</strong> The sweet spot. You are
                busy enough to be profitable but have enough buffer to handle overruns, urgent
                callouts, and quote requests without disrupting existing commitments.
              </p>
              <p>
                <strong className="text-yellow-400">75% to 85%:</strong> Very busy. You need to be
                disciplined about scheduling and may need to extend lead times for new work. Good
                for profitability but leaves little room for problems.
              </p>
              <p>
                <strong className="text-yellow-400">Above 85%:</strong> Danger zone. You are
                overcommitted. Jobs will overrun, quality may suffer, and you risk burning out. This
                is the signal to either raise prices (to reduce demand), hire help, or subcontract
                overflow work. Elec-Mate's{' '}
                <SEOInternalLink href="/tools/business-analytics-electrician">
                  business analytics dashboard
                </SEOInternalLink>{' '}
                tracks your utilisation rate weekly and alerts you when you exceed your target
                threshold.
              </p>
            </>
          ),
        },
        {
          id: 'job-scheduling',
          heading: 'Job Scheduling and Resource Allocation',
          content: (
            <>
              <p>
                Effective job scheduling goes beyond putting dates in a diary. It requires
                understanding how long each job type actually takes (not how long you hope it will
                take), building in realistic buffer time for overruns and unexpected issues, and
                sequencing jobs to minimise travel and maximise productive time on site.
              </p>
              <p>
                <strong className="text-yellow-400">Job duration estimation:</strong> Track how long
                each type of job actually takes you. A consumer unit change might be quoted at 4
                hours but consistently takes 5.5 hours when you include preparation, testing,
                labelling, and paperwork. Over time, your actual duration data replaces your
                estimates, making your scheduling more accurate and your quotes more profitable.
              </p>
              <p>
                <strong className="text-yellow-400">Geographic clustering:</strong> Group jobs by
                location to minimise travel time. If you have three jobs in the same area of town,
                schedule them on consecutive days rather than alternating with jobs across town. The
                30 to 45 minutes saved on each journey adds up to 1 to 2 extra billable hours per
                day.
              </p>
              <p>
                <strong className="text-yellow-400">Buffer time:</strong> Schedule 80% of your
                available time, not 100%. The remaining 20% absorbs overruns, urgent callouts, quote
                visits, and unexpected issues without displacing your committed work. If the buffer
                is not needed, you can fill it with smaller jobs or administrative tasks.
              </p>
              <p>
                Elec-Mate's{' '}
                <SEOInternalLink href="/tools/schedule-manager-electrician">
                  schedule manager
                </SEOInternalLink>{' '}
                provides a visual calendar view of your job commitments, colour-coded by job type
                and status, with drag-and-drop rescheduling and automatic conflict detection.
              </p>
            </>
          ),
          appBridge: {
            title: 'Schedule Jobs with Confidence',
            description:
              "Elec-Mate's schedule manager shows your capacity in real time, detects conflicts, and helps you allocate jobs to maximise billable hours and minimise travel.",
            icon: Calendar,
          },
        },
        {
          id: 'when-to-hire',
          heading: 'When to Hire an Employee or Subcontract',
          content: (
            <>
              <p>
                The decision to take on an employee or use subcontractors is one of the biggest in
                any electrical business. Hire too early and you have someone on the payroll without
                enough work to justify their cost. Hire too late and you lose jobs, miss deadlines,
                and burn out trying to do everything yourself.
              </p>
              <p>
                <strong className="text-yellow-400">Signals that you need help:</strong> Your
                utilisation rate has exceeded 85% for three consecutive months. You are regularly
                declining work or pushing start dates back by more than two weeks. You are working
                evenings and weekends on admin tasks. Your job satisfaction is declining because you
                are always rushing.
              </p>
              <p>
                <strong className="text-yellow-400">Subcontracting vs employing:</strong>{' '}
                Subcontracting is lower risk — you only pay for work done, there are no employer NI
                contributions, no holiday pay, and no employment obligations. But it is more
                expensive per hour and you have less control over quality and availability.
                Employing someone is a bigger commitment but gives you a dedicated resource at a
                lower hourly cost. Use the{' '}
                <SEOInternalLink href="/tools/staff-cost-calculator">
                  staff cost calculator
                </SEOInternalLink>{' '}
                to compare the true cost of each option.
              </p>
              <p>
                <strong className="text-yellow-400">Financial readiness:</strong> Before hiring, you
                need consistent revenue to cover the new person's cost even during quiet periods. As
                a rule of thumb, you should be able to cover three months of their salary from your
                cash reserves. Use the{' '}
                <SEOInternalLink href="/tools/cash-flow-planner">cash flow planner</SEOInternalLink>{' '}
                to model the financial impact of hiring before you commit.
              </p>
            </>
          ),
        },
        {
          id: 'growth-planning',
          heading: 'Planning for Growth: From Sole Trader to Employer',
          content: (
            <>
              <p>
                Growing an electrical business from a sole trader to a small team requires planning
                across multiple dimensions: workload capacity, financial resources, management
                skills, and operational systems.
              </p>
              <p>
                <strong className="text-yellow-400">Revenue targets:</strong> Before adding staff,
                calculate the additional revenue you need to cover their cost and still increase
                your profit. If an employee costs £35,000 to £45,000 per year fully loaded (salary,
                employer NI, pension, holiday pay, tools, van), you need to generate that much
                additional revenue — plus profit margin — to justify the hire.
              </p>
              <p>
                <strong className="text-yellow-400">Systems and processes:</strong> A sole trader
                can run their business from their head — they know every job, every customer, every
                deadline. Once you have staff, you need systems: job management, scheduling, quality
                control, and communication. Elec-Mate provides all of these in a single platform,
                making the transition from sole trader to employer significantly smoother.
              </p>
              <p>
                <strong className="text-yellow-400">Apprentices:</strong> Taking on an apprentice is
                often the first step in growing a team. The initial cost is lower (apprentice wages
                are below fully qualified rates), the Apprenticeship Levy may cover training costs,
                and you get to train someone to your standards. See the{' '}
                <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
                  apprenticeship employer guide
                </SEOInternalLink>{' '}
                for the full picture, including funding, off-the-job training requirements, and
                employer responsibilities.
              </p>
              <p>
                <strong className="text-yellow-400">Stage planning:</strong> Most successful
                electrical businesses grow in stages. Stage one: maximise your own capacity (target
                75% utilisation). Stage two: add a subcontractor for overflow work. Stage three:
                hire your first employee or apprentice. Stage four: build a team. Each stage
                requires different skills, systems, and financial planning — Elec-Mate's{' '}
                <SEOInternalLink href="/tools/business-analytics-electrician">
                  business analytics
                </SEOInternalLink>{' '}
                help you know when you are ready for the next stage.
              </p>
            </>
          ),
        },
      ]}
      features={[
        {
          icon: Users,
          title: 'Team Capacity Dashboard',
          description:
            "See everyone's availability at a glance — billable hours remaining, committed jobs, and utilisation rate for each team member.",
        },
        {
          icon: Calendar,
          title: 'Visual Schedule Manager',
          description:
            'Drag-and-drop job scheduling with conflict detection, geographic clustering, and automatic buffer time allocation.',
        },
        {
          icon: TrendingUp,
          title: 'Utilisation Rate Tracking',
          description:
            'Real-time utilisation rate calculation with weekly trends, target thresholds, and alerts when you are approaching capacity limits.',
        },
        {
          icon: Clock,
          title: 'Job Duration Analytics',
          description:
            'Track actual vs estimated job durations to improve future scheduling accuracy and identify where time is being lost.',
        },
        {
          icon: BarChart3,
          title: 'Growth Readiness Score',
          description:
            'Data-driven assessment of whether your business is ready to hire, based on utilisation, revenue consistency, and cash reserves.',
        },
        {
          icon: Target,
          title: 'Revenue Forecasting',
          description:
            'Project future revenue based on scheduled jobs, average job values, and historical conversion rates from quotes to confirmed work.',
        },
      ]}
      featuresHeading="How Elec-Mate Manages Your Capacity"
      featuresSubheading="Purpose-built for UK electrical businesses. Know your capacity, schedule with confidence, and grow at the right time."
      faqs={[
        {
          question: 'How many billable hours should a sole trader electrician target per week?',
          answer:
            'A realistic target is 27 to 32 billable hours per week for a sole trader. This accounts for the fact that a significant portion of your working week is consumed by non-billable activities: travel (1 to 2 hours per day), admin and quoting (3 to 5 hours per week), phone calls and emails (30 to 60 minutes per day), and materials purchasing. Many electricians assume they can bill 40 hours per week, but this is unrealistic and leads to overcommitting. Elec-Mate calculates your personal billable capacity based on your actual working patterns.',
        },
        {
          question: 'What is a good utilisation rate for an electrical business?',
          answer:
            'The target utilisation rate for a healthy electrical business is 65% to 75%. This means 65% to 75% of your available billable hours are spent on paying client work. Below 55% indicates you need more work or better lead generation. Above 85% means you are overcommitted and at risk of quality problems, missed deadlines, and burnout. The sweet spot of 65% to 75% provides strong profitability while leaving enough buffer for overruns, urgent work, and business development activities like quoting and networking.',
        },
        {
          question: 'How do I know when to hire my first employee?',
          answer:
            "The key indicators are: your utilisation rate has exceeded 85% for three or more consecutive months, you are regularly declining profitable work, your lead time for new jobs exceeds 3 weeks, and you have sufficient cash reserves to cover at least 3 months of an employee's cost. You also need consistent revenue — hiring during a single busy period and then having no work for the new person is a costly mistake. Use Elec-Mate's business analytics to track these indicators over time and make the decision based on data, not gut feeling.",
        },
        {
          question: 'Should I subcontract or employ someone?',
          answer:
            'Subcontracting is lower risk and more flexible — you only pay for work done, there are no ongoing employment obligations, and you can scale up or down as needed. However, subcontractors typically cost £200 to £300 per day (more for specialist work), you have less control over quality and scheduling, and they may not be available when you need them. Employing someone costs less per hour (typically £15 to £25 per hour fully loaded for a qualified electrician) but comes with employer NI, pension auto-enrolment, holiday pay, sick pay, training obligations, and employment law requirements. The staff cost calculator in Elec-Mate helps you compare the true cost of each option.',
        },
        {
          question: 'How do I handle seasonality in workload?',
          answer:
            'Most UK electrical businesses experience seasonal patterns — busier in autumn and winter (lighting work, heating season, Christmas preparation) and sometimes quieter in summer. Capacity planning accounts for this by tracking your historical workload patterns and adjusting your target utilisation rate by season. In busy months, you might target 75% to 80% utilisation. In quiet months, 55% to 65% might be realistic. The key is to avoid making hiring decisions based on a single busy month and to build a cash reserve during peak periods to cover quieter months.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/project-management-electrician',
          title: 'Project Management for Electricians',
          description:
            'Track jobs from quote to completion with milestones, schedules, and progress tracking.',
          icon: ClipboardCheck,
          category: 'Business Tools',
        },
        {
          href: '/tools/staff-management-electrician',
          title: 'Staff Management',
          description:
            'Manage your team — skills, availability, job allocation, and performance tracking.',
          icon: Users,
          category: 'Business Tools',
        },
        {
          href: '/tools/schedule-manager-electrician',
          title: 'Schedule Manager',
          description:
            'Visual calendar scheduling with conflict detection and drag-and-drop rescheduling.',
          icon: Calendar,
          category: 'Business Tools',
        },
        {
          href: '/tools/business-analytics-electrician',
          title: 'Business Analytics Dashboard',
          description:
            'Track revenue, utilisation, profitability, and growth metrics across your electrical business.',
          icon: BarChart3,
          category: 'Business Tools',
        },
        {
          href: '/tools/staff-cost-calculator',
          title: 'Staff Cost Calculator',
          description:
            'Calculate the true cost of employing an electrician — salary, NI, pension, holiday pay, and more.',
          icon: PoundSterling,
          category: 'Business Calculators',
        },
        {
          href: '/guides/starting-electrical-business',
          title: 'Starting an Electrical Business',
          description: 'Complete guide to setting up as a self-employed electrician in the UK.',
          icon: Briefcase,
          category: 'Business Guides',
        },
      ]}
      ctaHeading="Plan Your Capacity, Grow with Confidence"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to track utilisation, schedule jobs, and make data-driven growth decisions. 7-day free trial, cancel anytime."
      extraSchemas={[
        {
          '@type': 'SoftwareApplication',
          name: 'Elec-Mate Capacity Planning Calculator',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web, iOS, Android',
          description:
            'Plan workforce capacity, track utilisation rates, and schedule jobs efficiently for your electrical business.',
          url: 'https://elec-mate.com/tools/capacity-planning-calculator',
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
