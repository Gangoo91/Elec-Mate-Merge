import BusinessTemplate from '@/pages/seo/templates/BusinessTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Calendar,
  PoundSterling,
  TrendingUp,
  Calculator,
  BarChart3,
  Receipt,
  Briefcase,
  Users,
  Target,
  ClipboardList,
  Package,
  Bell,
  Clock,
  Wrench,
} from 'lucide-react';

const PAGE_PATH = '/tools/project-management-electrician';

export default function ProjectManagementElectricianPage() {
  return (
    <BusinessTemplate
      title="Project Management for Electrical Contractors"
      description="Manage electrical projects efficiently with job scheduling, staff allocation, material tracking, progress monitoring, and client updates. Purpose-built project management for UK electricians."
      datePublished="2025-09-01"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Business Tools', href: '/tools' },
        { label: 'Project Management', href: PAGE_PATH },
      ]}
      tocItems={[
        { id: 'why-project-management', label: 'Why Project Management Matters' },
        { id: 'job-scheduling', label: 'Job Scheduling' },
        { id: 'staff-allocation', label: 'Staff Allocation' },
        { id: 'material-tracking', label: 'Material Tracking' },
        { id: 'progress-monitoring', label: 'Progress Monitoring' },
        { id: 'client-communication', label: 'Client Communication' },
        { id: 'features', label: 'Elec-Mate Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Project Management"
      badgeIcon={Calendar}
      heroTitle={
        <>
          Project Management
          <span className="block text-yellow-400 mt-1">For Electrical Contractors</span>
        </>
      }
      heroSubtitle="Juggling multiple jobs, coordinating staff, tracking materials, and keeping clients informed — all from your phone. Elec-Mate's project management tools are built for how electricians actually work, replacing spreadsheets, whiteboards, and memory with a system that keeps everything on track."
      readingTime={9}
      stats={[
        { value: '35%', label: 'Less time spent on scheduling and coordination' },
        { value: '4.2hrs', label: 'Average weekly admin time saved per electrician' },
        { value: '18%', label: 'Fewer material re-orders with proper tracking' },
        { value: '14', label: 'Business calculators in Elec-Mate' },
      ]}
      keyTakeaways={[
        'Job scheduling on your phone means you always know what is happening today, this week, and next month — no more missed appointments or double bookings.',
        'Staff allocation tools show who is available, who is assigned, and where the resource gaps are before they become problems.',
        'Material tracking prevents the two most expensive mistakes: running out of stock on site and over-ordering materials you do not need.',
        'Progress monitoring lets you spot slipping jobs early so you can intervene before a one-day delay becomes a week-long disaster.',
        'Automated client updates build trust and reduce the number of "when will you be finished?" phone calls interrupting your work.',
      ]}
      sections={[
        {
          id: 'why-project-management',
          heading: 'Why Electricians Need Project Management Tools',
          content: (
            <>
              <p>
                As your electrical business grows beyond a single operative doing one job at a time,
                the complexity of managing your workload increases exponentially. Two operatives
                running two jobs simultaneously means coordinating 4 schedules, tracking materials
                for both jobs, managing client expectations on both sites, and ensuring quality and
                compliance across everything. Without a system, things fall through the cracks — and
                in electrical work, that can mean failed inspections, unhappy clients, and costly
                return visits.
              </p>
              <p>
                <strong className="text-yellow-400">The cost of poor project management:</strong> A
                missed material delivery delays a job by a day, costing you a day's revenue (£250 to
                £350) plus the client relationship damage. A double-booked operative means one
                client gets let down. A job that overruns because nobody spotted the delay early
                eats into the next job's time and cascades through your schedule. These are not rare
                events — they happen weekly in businesses that rely on memory, text messages, and
                whiteboards.
              </p>
              <p>
                Elec-Mate's project management tools bring structure without bureaucracy. They are
                designed for electricians, not office managers — quick to use on a phone, visual
                rather than text-heavy, and integrated with your{' '}
                <SEOInternalLink href="/tools/business-analytics-electrician">
                  analytics dashboard
                </SEOInternalLink>{' '}
                so every job feeds into your business performance data.
              </p>
            </>
          ),
        },
        {
          id: 'job-scheduling',
          heading: 'Job Scheduling — Know What Is Happening When',
          content: (
            <>
              <p>
                Effective job scheduling means more than a list of appointments. It means knowing
                how long each job will take, which operative is assigned, what materials are needed,
                whether there are dependencies between jobs, and how much buffer you have for
                overruns.
              </p>
              <p>
                <strong className="text-yellow-400">Calendar view:</strong> See all your jobs on a
                day, week, or month view. Colour-coded by job type or status (quoted, confirmed, in
                progress, complete). Drag and drop to reschedule. Tap a job to see full details
                including address, scope, materials, and contact information.
              </p>
              <p>
                <strong className="text-yellow-400">Time estimation:</strong> Based on your
                historical data (tracked through the{' '}
                <SEOInternalLink href="/tools/job-profitability-calculator">
                  job profitability calculator
                </SEOInternalLink>
                ), Elec-Mate can suggest realistic durations for common job types. A consumer unit
                upgrade that typically takes you 4.5 hours should not be scheduled into a 3-hour
                slot, and a 2-hour EICR should not block out a full day.
              </p>
              <p>
                <strong className="text-yellow-400">Travel time:</strong> The scheduler accounts for
                travel between jobs. Two jobs on opposite sides of town with only 30 minutes between
                them is a recipe for lateness and stress. The scheduler flags unrealistic gaps and
                suggests reordering to minimise travel.
              </p>
              <p>
                <strong className="text-yellow-400">Recurring work:</strong> Set up recurring jobs
                for regular clients — monthly emergency lighting tests, annual EICR inspections,
                quarterly PAT testing rounds. These populate your calendar automatically so you
                never forget a regular booking.
              </p>
            </>
          ),
          appBridge: {
            title: 'Schedule Jobs from Your Phone in Seconds',
            description:
              "Elec-Mate's mobile-first scheduler lets you add, move, and manage jobs with a few taps. Calendar sync, travel time estimates, and automatic reminders keep everything on track.",
            icon: Calendar,
          },
        },
        {
          id: 'staff-allocation',
          heading: 'Staff Allocation and Resource Planning',
          content: (
            <>
              <p>
                If you employ or subcontract other electricians, staff allocation is one of the
                biggest challenges in managing your business. You need to match the right operative
                to the right job based on their qualifications, experience, location, and
                availability — while keeping everyone productively busy without overloading anyone.
              </p>
              <p>
                <strong className="text-yellow-400">Skills matrix:</strong> Not all electricians are
                interchangeable. One might have EV charger qualifications, another might specialise
                in fire alarm systems, and your apprentice can only work under supervision.
                Elec-Mate tracks qualifications and skills for each team member so you can see at a
                glance who is qualified for each job.
              </p>
              <p>
                <strong className="text-yellow-400">Availability view:</strong> See who is available
                on any given day. Track holidays, training days, sick days, and existing
                commitments. Spot gaps in coverage before they become problems — if both your EV
                charger-qualified sparks are on holiday the same week and you have an EV install
                booked, you need to know now, not the night before.
              </p>
              <p>
                <strong className="text-yellow-400">Utilisation tracking:</strong> Monitor how much
                of each operative's time is billable versus non-billable. Low utilisation means
                either insufficient work (a sales problem) or too much downtime between jobs (a
                scheduling problem). Use the{' '}
                <SEOInternalLink href="/tools/business-analytics-electrician">
                  analytics dashboard
                </SEOInternalLink>{' '}
                to track utilisation trends over time.
              </p>
            </>
          ),
        },
        {
          id: 'material-tracking',
          heading: 'Material Tracking — Stop Wasting Money and Time',
          content: (
            <>
              <p>
                Material management is where many electrical businesses leak money. Over-ordering
                means stock sitting in your van losing value. Under-ordering means emergency trips
                to the wholesaler that waste 1 to 2 hours per visit. Ordering the wrong items means
                returns, delays, and frustrated clients.
              </p>
              <p>
                <strong className="text-yellow-400">Material lists per job:</strong> When you create
                a quote in Elec-Mate, the material list is saved. When the quote is accepted, the
                materials move to a procurement list. You can see all materials needed across all
                upcoming jobs, consolidated into a single order for your wholesaler — reducing
                delivery charges and ensuring you have everything before you start.
              </p>
              <p>
                <strong className="text-yellow-400">Stock awareness:</strong> Track what you carry
                in your van as standard stock (common accessories, cable, fixings) versus
                job-specific materials that need ordering. When standard stock runs low, Elec-Mate
                flags it so you can reorder before you run out on site.
              </p>
              <p>
                <strong className="text-yellow-400">Cost tracking:</strong> Every material purchase
                is logged against a job, feeding into the{' '}
                <SEOInternalLink href="/tools/job-profitability-calculator">
                  profitability calculator
                </SEOInternalLink>{' '}
                automatically. You can compare actual material costs against your quote to see
                whether your material estimates are accurate. The{' '}
                <SEOInternalLink href="/tools/business-cost-calculator">
                  business cost calculator
                </SEOInternalLink>{' '}
                uses this data to refine your overhead calculations.
              </p>
            </>
          ),
        },
        {
          id: 'progress-monitoring',
          heading: 'Progress Monitoring — Catch Problems Early',
          content: (
            <>
              <p>
                The earlier you spot a problem, the cheaper it is to fix. A job that is one day
                behind schedule on day 2 is easy to recover — you can work slightly longer, add
                resource, or adjust the client's expectations. A job that is three days behind
                schedule on day 8 is a crisis — it is eating into the next job, the client is
                unhappy, and recovery options are limited and expensive.
              </p>
              <p>
                <strong className="text-yellow-400">Status tracking:</strong> Each job moves through
                stages: quoted, accepted, materials ordered, in progress (first fix, second fix,
                testing), complete, invoiced, paid. A quick glance at your dashboard shows the
                status of every active job. Jobs that have been "in progress" longer than the
                scheduled duration are automatically flagged.
              </p>
              <p>
                <strong className="text-yellow-400">Photo progress logs:</strong> Take photos
                directly within Elec-Mate as work progresses. These serve multiple purposes:
                evidence for your certification records, client updates showing progress, dispute
                resolution if issues arise later, and training material for apprentices. Photos are
                automatically tagged with the job, date, and location.
              </p>
              <p>
                <strong className="text-yellow-400">Checklists:</strong> Create checklists for each
                job type — first fix items, second fix items, testing requirements, handover
                documentation. Operatives tick off items as they complete them, giving you
                visibility of progress without needing to visit every site.
              </p>
            </>
          ),
        },
        {
          id: 'client-communication',
          heading: 'Client Communication and Updates',
          content: (
            <>
              <p>
                Clients hate uncertainty. "When will you start?", "How long will it take?", "Is
                everything going to plan?" — these are the questions that generate phone calls
                interrupting your work on site. Proactive communication eliminates most of these
                calls and dramatically improves client satisfaction.
              </p>
              <p>
                <strong className="text-yellow-400">Automated notifications:</strong> Elec-Mate can
                send automatic updates to clients at key stages — quote accepted confirmation, job
                scheduled confirmation (with date and estimated duration), "on my way" notification
                on the morning of the job, job completed notification, and invoice sent. Each
                message is professional, branded, and sent without you lifting a finger.
              </p>
              <p>
                <strong className="text-yellow-400">Progress sharing:</strong> For longer jobs
                (rewires, commercial fit-outs), share progress photos with the client through
                Elec-Mate. This builds trust, reduces anxiety, and creates a record that the client
                can refer to. It also demonstrates professionalism that sets you apart from
                competitors who disappear for a week and then turn up with a bill.
              </p>
              <p>
                <strong className="text-yellow-400">Post-completion follow-up:</strong> After the
                job, Elec-Mate can send an automatic follow-up asking for feedback and inviting a
                Google review. Positive reviews drive new business. The{' '}
                <SEOInternalLink href="/tools/customer-management-electrician">
                  customer management tool
                </SEOInternalLink>{' '}
                stores all communication history so you have a complete record for every client.
              </p>
            </>
          ),
          appBridge: {
            title: 'Keep Clients Informed Without Extra Work',
            description:
              'Automated scheduling confirmations, progress updates, and completion notifications — Elec-Mate handles client communication so you can focus on the work itself.',
            icon: Bell,
          },
        },
      ]}
      features={[
        {
          icon: Calendar,
          title: 'Visual Job Scheduler',
          description:
            'Day, week, and month calendar views. Drag-and-drop rescheduling. Travel time gaps. Colour-coded by status. Works beautifully on mobile.',
        },
        {
          icon: Users,
          title: 'Team Management',
          description:
            'Track staff availability, qualifications, and utilisation. Assign the right operative to the right job. Manage holidays and training days.',
        },
        {
          icon: Package,
          title: 'Material Procurement',
          description:
            'Consolidated material lists across all upcoming jobs. Order once, receive once. Track stock levels and costs per job.',
        },
        {
          icon: ClipboardList,
          title: 'Progress Checklists',
          description:
            'Stage-based checklists for every job type. Track progress remotely. Photo logging with automatic tagging.',
        },
        {
          icon: Bell,
          title: 'Automated Client Updates',
          description:
            'Scheduling confirmations, arrival notifications, completion alerts, and follow-up messages — all sent automatically.',
        },
        {
          icon: Target,
          title: 'Programme Overview',
          description:
            'See all active jobs, their status, and progress at a glance. Flag overdue items. Track against scheduled completion dates.',
        },
      ]}
      featuresHeading="Elec-Mate Project Management Features"
      featuresSubheading="Everything you need to manage jobs, staff, materials, and clients — built for electricians, not office managers."
      faqs={[
        {
          question: 'Is project management software worth it for a sole trader?',
          answer:
            'Yes, even as a sole trader, project management tools save you time and prevent costly mistakes. Scheduling tools prevent double bookings and help you plan efficient routes between jobs. Material tracking prevents emergency wholesaler trips that waste 1 to 2 hours. Progress tracking helps you identify when jobs are overrunning so you can adjust. And automated client communication saves you time on phone calls and text messages. The time saved (typically 3 to 5 hours per week) easily justifies the cost, and the improved client experience leads to more referrals and repeat work.',
        },
        {
          question: 'How do I schedule multiple jobs efficiently?',
          answer:
            "The key to efficient multi-job scheduling is grouping jobs by geography (minimise travel time), allowing realistic buffers between jobs (travel time plus a contingency for overruns), and scheduling the most complex or time-critical jobs first in the day when you are freshest. Avoid scheduling more than 3 separate site visits in a day unless they are all in the same area — the travel time between jobs adds up quickly. Elec-Mate's scheduler shows travel estimates between jobs and flags unrealistic schedules before they cause problems.",
        },
        {
          question: 'What is the best way to track materials across multiple jobs?',
          answer:
            'The best approach is to create a material list at the quoting stage, convert it to a procurement list when the quote is accepted, and consolidate materials across all upcoming jobs into a single order where possible. This reduces delivery charges, ensures you have everything before starting, and makes it easy to track costs against each job. Elec-Mate links material lists to quotes, converts them to orders when accepted, and logs actual costs against each job for profitability analysis.',
        },
        {
          question: 'How do I manage an apprentice alongside my own workload?',
          answer:
            "Managing an apprentice requires balancing their learning needs with your productivity. Schedule them alongside you on jobs where they can learn and contribute, but allow extra time (typically 20% to 30% longer than you would take alone) for the teaching component. Use Elec-Mate's skills matrix to track their competencies and assign tasks appropriate to their level. Log their hours separately from yours in the profitability calculator so you can see the true cost of carrying an apprentice — and the growing value they provide as they become more capable.",
        },
        {
          question: 'How do I handle job overruns without upsetting clients?',
          answer:
            "The key is early communication. As soon as you identify that a job will overrun (unexpected problems, additional work discovered, material delays), inform the client immediately — explain the reason, the impact on timeline, and any cost implications. Most clients are understanding if you communicate proactively. What upsets clients is silence — turning up late, overrunning without explanation, or presenting a surprise bill. Elec-Mate's progress tracking helps you identify overruns early, and the client notification system makes it easy to send professional updates.",
        },
        {
          question: 'Can I use Elec-Mate for both domestic and commercial project management?',
          answer:
            'Yes. Elec-Mate handles both domestic and commercial work. For domestic jobs, the focus is typically on scheduling, material ordering, and client communication. For commercial projects, the tools extend to multi-operative scheduling, longer-duration programme management, staged invoicing, progress reporting to main contractors, and compliance documentation. The same core tools work for both — the difference is in scale and complexity. Whether you are managing a single consumer unit change or a multi-week commercial fit-out, Elec-Mate keeps everything organised.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/customer-management-electrician',
          title: 'Customer Management CRM',
          description:
            'Track client relationships, communication history, and repeat work alongside your projects.',
          icon: Users,
          category: 'Business Tools',
        },
        {
          href: '/tools/business-analytics-electrician',
          title: 'Business Analytics Dashboard',
          description:
            'Track project performance, utilisation rates, and job profitability trends.',
          icon: BarChart3,
          category: 'Business Tools',
        },
        {
          href: '/tools/job-profitability-calculator',
          title: 'Job Profitability Calculator',
          description:
            'Track actual costs against quoted prices for every project to improve future estimating.',
          icon: Calculator,
          category: 'Business Calculators',
        },
        {
          href: '/tools/business-cost-calculator',
          title: 'Business Cost Calculator',
          description:
            'Understand your true overhead costs to price projects accurately from the start.',
          icon: PoundSterling,
          category: 'Business Calculators',
        },
        {
          href: '/tools/cash-flow-planner',
          title: 'Cash Flow Planner',
          description:
            'Forecast cash flow based on project timelines, staged payments, and expense schedules.',
          icon: Briefcase,
          category: 'Business Calculators',
        },
        {
          href: '/tools/pricing-strategy-electrician',
          title: 'Pricing Strategy',
          description: 'Price projects correctly using fixed price, day rate, or hourly models.',
          icon: TrendingUp,
          category: 'Business Strategy',
        },
      ]}
      ctaHeading="Manage Every Job Like a Professional"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to schedule jobs, track materials, manage staff, and keep clients happy. 7-day free trial, cancel anytime."
      extraSchemas={[
        {
          '@type': 'SoftwareApplication',
          name: 'Elec-Mate Project Management for Electricians',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web, iOS, Android',
          description:
            'Project management tools for UK electrical contractors. Job scheduling, staff allocation, material tracking, progress monitoring, and client communication in one mobile-first app.',
          url: 'https://elec-mate.com/tools/project-management-electrician',
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
