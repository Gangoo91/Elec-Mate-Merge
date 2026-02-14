import BusinessTemplate from '@/pages/seo/templates/BusinessTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Users,
  Briefcase,
  Clock,
  CalendarDays,
  ShieldCheck,
  ClipboardCheck,
  GraduationCap,
  BarChart3,
  PoundSterling,
  TrendingUp,
  FileText,
  Receipt,
  Zap,
  Award,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Business Tools', href: '/tools' },
  { label: 'Staff Management', href: '/tools/staff-management-electrician' },
];

const tocItems = [
  { id: 'why-staff-management', label: 'Why Staff Management Matters' },
  { id: 'time-tracking', label: 'Time Tracking' },
  { id: 'job-allocation', label: 'Job Allocation' },
  { id: 'skills-matrix', label: 'Skills Matrix' },
  { id: 'holiday-management', label: 'Holiday Management' },
  { id: 'compliance-tracking', label: 'Compliance Tracking' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Managing staff with spreadsheets, WhatsApp groups, and memory is a recipe for missed jobs, compliance failures, and payroll errors -- purpose-built tools pay for themselves immediately.',
  'Time tracking that links hours to specific jobs lets you calculate true labour costs per job, feeding directly into profitability analysis and more accurate future quoting.',
  "A skills matrix showing each operative's qualifications, card expiry dates, and competencies ensures you always send the right person to the right job.",
  'Automated compliance tracking for ECS cards, 18th Edition certificates, and calibration dates prevents the costly mistake of sending someone to site with expired credentials.',
  'Holiday management prevents scheduling clashes and ensures you never accidentally book a job when your only qualified tester is on annual leave.',
];

const stats = [
  { value: '3.5 hrs', label: 'Average weekly admin time saved per team' },
  { value: '100%', label: 'Compliance visibility across all staff' },
  { value: 'GBP 0', label: 'Cost of missed compliance fines' },
  { value: 'Live', label: 'Real-time job allocation dashboard' },
];

const faqs = [
  {
    question: 'How does time tracking work for electricians on site?',
    answer:
      'Elec-Mate\'s time tracking is designed for electricians working on multiple sites throughout the day. Each operative logs their time against specific jobs using the app on their phone. They tap "Start" when they arrive on site and "Stop" when they leave, with the option to add notes about the work carried out. Travel time can be tracked separately so you can see the true time cost of each job including transit. The hours are automatically totalled for each job, each operative, and each week, feeding directly into payroll calculations and job profitability reports. Supervisors and business owners can see real-time status -- who is on which site, how long they have been there, and what jobs are in progress.',
  },
  {
    question: 'Can I track qualifications and card expiry dates?',
    answer:
      'Yes. The skills matrix stores every qualification, certification, and card for each team member. This includes ECS/CSCS cards (with expiry dates), 18th Edition certificates, C&G 2391, AM2, first aid certificates, PASMA, IPAF, asbestos awareness, and any manufacturer-specific training. When a qualification is approaching its expiry date, Elec-Mate sends automatic reminders -- 90 days, 60 days, 30 days, and 14 days before expiry. This prevents the scenario where an operative arrives on a commercial site and is turned away because their ECS card has expired. You can also filter your team by qualification when allocating jobs -- for example, show only operatives who hold the 2391 and are qualified to carry out inspection and testing.',
  },
  {
    question: 'How does job allocation work?',
    answer:
      'Job allocation in Elec-Mate shows you a calendar view of all your operatives and their scheduled work. When a new job comes in, you can see at a glance who is available, who has the right qualifications, and who is closest to the job location. Assign the job to an operative with a tap, and they receive a notification on their phone with the job details, client information, site address, and any special requirements. If a job overruns or a new urgent call comes in, you can reassign work in real time. The calendar syncs across all devices, so everyone always sees the current schedule. You can also set up recurring jobs -- for example, quarterly emergency lighting tests for a commercial client -- and they appear automatically in the schedule.',
  },
  {
    question: 'What about holiday management and scheduling conflicts?',
    answer:
      'Elec-Mate includes a holiday management system where staff submit holiday requests through the app. You approve or decline requests based on workload and coverage. Approved holidays are automatically blocked out in the job allocation calendar, so you cannot accidentally schedule work for someone who is on leave. The system also shows you a team-wide holiday view so you can see when multiple people are off at the same time and plan accordingly. Bank holidays are pre-populated and can be customised. If you need to calculate holiday entitlement (28 days statutory minimum for full-time employees, pro-rated for part-time), the system tracks remaining allowance for each staff member.',
  },
  {
    question: 'How does Elec-Mate help with CIS and payroll?',
    answer:
      "Time tracking data from Elec-Mate feeds directly into your payroll process. For employed staff, the weekly or monthly hours are totalled and can be exported to your payroll software or accountant. For CIS subcontractors, the system tracks the gross payment, applies the appropriate CIS deduction rate (20% for verified subcontractors, 30% for unverified), and generates CIS payment and deduction statements. These records are essential for HMRC compliance and for your subcontractors' Self Assessment returns. All CIS deduction data can be exported for your accountant or synced to Xero and QuickBooks.",
  },
  {
    question: 'Is this suitable for small teams of 2-3 electricians?',
    answer:
      "Absolutely. Elec-Mate's staff management tools scale from a sole trader with one apprentice to a company with 20+ operatives. For small teams, the main benefits are job scheduling (knowing who is where and when), compliance tracking (ensuring everyone's qualifications are current), and time tracking for accurate job costing. You do not need to use every feature -- start with the basics and add complexity as your team grows. Many Elec-Mate users started as sole traders and have grown their teams using the platform, adding staff management features as they took on employees and subcontractors.",
  },
  {
    question: 'Can staff see their own schedules and submit timesheets?',
    answer:
      'Yes. Each team member has their own Elec-Mate login and can see their assigned jobs, schedule, and upcoming work. They can submit time entries against each job, log expenses (with receipt photos), and view their holiday balance. Supervisors and business owners have a higher-level view showing all staff, all jobs, and all time entries. There is no need for separate apps or paper timesheets -- everything is captured digitally, in real time, on the same platform used for certificates, calculators, and AI tools.',
  },
];

const features = [
  {
    icon: Clock,
    title: 'Live Time Tracking',
    description:
      'Operatives log hours against specific jobs from their phones. Travel and on-site time tracked separately. Weekly totals calculated automatically for payroll.',
  },
  {
    icon: CalendarDays,
    title: 'Job Allocation Calendar',
    description:
      'Visual calendar showing all operatives and their scheduled work. Assign jobs based on availability, qualifications, and location. Drag-and-drop rescheduling.',
  },
  {
    icon: GraduationCap,
    title: 'Skills Matrix',
    description:
      'Track every qualification, certification, and card for each team member. Filter by competency when allocating jobs. Automatic expiry reminders.',
  },
  {
    icon: CalendarDays,
    title: 'Holiday Management',
    description:
      'Staff submit holiday requests via the app. Approve or decline based on workload. Holidays blocked in the job calendar automatically.',
  },
  {
    icon: ShieldCheck,
    title: 'Compliance Dashboard',
    description:
      'See at a glance which credentials are current, expiring, or expired. ECS cards, 18th Edition, first aid, PASMA, IPAF -- all tracked in one place.',
  },
  {
    icon: BarChart3,
    title: 'Labour Cost Reports',
    description:
      'See total labour hours and costs per job, per operative, and per week. Feed directly into profitability calculations and payroll.',
  },
];

const sections = [
  {
    id: 'why-staff-management',
    heading: 'Why Staff Management Matters for Electrical Contractors',
    content: (
      <>
        <p>
          Running an electrical business with a team is fundamentally different from working as a
          sole trader. As soon as you employ one person -- an apprentice, an improver, or a
          subcontractor -- you take on new responsibilities: scheduling their work, tracking their
          hours, ensuring their qualifications are current, managing their holidays, and calculating
          their pay. Most electrical contractors manage these tasks with a combination of
          spreadsheets, WhatsApp messages, paper timesheets, and memory. It works, just about, until
          it does not.
        </p>
        <p>
          <strong className="text-yellow-400">The failure modes are predictable:</strong> an
          operative turns up at a commercial site with an expired ECS card and is refused entry. A
          job is scheduled for a day when the only qualified tester is on holiday. Timesheets are
          submitted late, inaccurately, or not at all, leading to payroll disputes. Travel time is
          not tracked, so labour costs on distant jobs are underestimated. New jobs come in but you
          cannot see who is available without calling everyone individually.
        </p>
        <p>
          Each of these problems costs you money -- either directly (paying operatives for time not
          recorded against a job) or through lost productivity (time spent on phone calls,
          spreadsheet updates, and manual scheduling). For a team of 3-5 electricians, the
          administrative overhead of managing staff manually can easily consume 3-5 hours per week
          of the business owner's time.
        </p>
        <p>
          Elec-Mate's staff management tools are designed specifically for electrical contractors.
          They integrate with the{' '}
          <SEOInternalLink href="/tools/job-profitability-calculator">
            job profitability calculator
          </SEOInternalLink>
          , the{' '}
          <SEOInternalLink href="/tools/schedule-manager-electrician">
            schedule manager
          </SEOInternalLink>
          , and the{' '}
          <SEOInternalLink href="/tools/expenses-manager-electrician">
            expenses manager
          </SEOInternalLink>{' '}
          so that time tracking, job costing, and expense allocation all flow together seamlessly.
        </p>
      </>
    ),
  },
  {
    id: 'time-tracking',
    heading: 'Time Tracking for Electrical Teams',
    content: (
      <>
        <p>
          Accurate time tracking serves two critical purposes: it ensures your payroll is correct,
          and it shows you the true labour cost of each job. Without it, you are guessing -- and
          guessing consistently leads to underpricing.
        </p>
        <p>
          Elec-Mate's time tracker works on each operative's phone. When they arrive on site, they
          open the app, select the job, and tap "Start". When they leave, they tap "Stop". Travel
          time is tracked separately -- they can log the journey from the previous site or from
          home. At the end of the week, the system automatically totals hours by job, by operative,
          and by type (on-site labour, travel, testing, certification admin).
        </p>
        <p>
          <strong className="text-yellow-400">For job costing,</strong> this data is invaluable. If
          you quoted a consumer unit upgrade at 6 hours of labour but the time tracker shows 9 hours
          (including travel and certification), you know your quoting needs adjustment. Over time,
          you build a dataset of actual labour times for different job types, which feeds into the{' '}
          <SEOInternalLink href="/tools/electrical-quoting-app">AI quoting tool</SEOInternalLink> to
          improve future estimates.
        </p>
        <p>
          <strong className="text-yellow-400">For payroll,</strong> the weekly time report can be
          exported directly to your payroll software or sent to your accountant. No more deciphering
          handwritten timesheets or arguing about hours worked. For{' '}
          <SEOInternalLink href="/guides/going-self-employed-electrician">
            CIS subcontractors
          </SEOInternalLink>
          , the system calculates the gross payment based on agreed day rates and hours worked,
          applies the CIS deduction, and generates the required payment and deduction statement.
        </p>
        <SEOAppBridge
          title="Live Time Tracking"
          description="Your team logs hours against specific jobs from their phones. See who is on which site in real time. Weekly time reports exported for payroll with a single tap. No more paper timesheets."
          icon={Clock}
        />
      </>
    ),
  },
  {
    id: 'job-allocation',
    heading: 'Job Allocation and Scheduling',
    content: (
      <>
        <p>
          Job allocation is about putting the right person on the right job at the right time. For a
          sole trader, this is simple -- you do everything. For a team, it requires coordination.
        </p>
        <p>
          Elec-Mate's job allocation calendar shows all your operatives in a visual timeline. Each
          person's scheduled jobs are displayed as colour-coded blocks, making it easy to spot gaps,
          clashes, and opportunities. When a new job comes in, you can see at a glance who has
          availability in the required time window.
        </p>
        <p>
          <strong className="text-yellow-400">Qualification filtering</strong> is a key feature. If
          a job requires inspection and testing, you can filter to show only operatives who hold the
          C&G 2391 or 2394/95. If a job is on a commercial site that requires PASMA or IPAF
          certification, you can filter for that. This prevents the expensive mistake of sending
          someone who does not have the right credentials.
        </p>
        <p>
          When you assign a job, the operative receives a notification on their phone with the full
          details: client name and contact number, site address (with a map link), scope of works,
          any special requirements (parking, access arrangements, site induction), and the estimated
          duration. They can confirm acceptance, request a change, or flag a conflict. The job
          appears in their personal schedule alongside all their other allocated work.
        </p>
        <p>
          For{' '}
          <SEOInternalLink href="/tools/schedule-manager-electrician">
            recurring jobs
          </SEOInternalLink>{' '}
          -- quarterly emergency lighting tests, annual EICR inspections for a portfolio of rental
          properties, monthly PAT testing for a commercial client -- you set up the schedule once
          and the jobs appear automatically at the correct intervals, allocated to the designated
          operative.
        </p>
      </>
    ),
  },
  {
    id: 'skills-matrix',
    heading: 'Skills Matrix and Competency Tracking',
    content: (
      <>
        <p>
          In the electrical industry, competency is not just a nice-to-have -- it is a legal
          requirement. The Electricity at Work Regulations 1989 require that persons working on
          electrical systems are competent to do so. BS 7671 defines competence for different types
          of work. And commercial clients, principal contractors, and certification bodies all
          require evidence of qualifications.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">What the Skills Matrix Tracks</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>ECS/CSCS cards:</strong> Card type (Apprentice, Installation Electrician,
                Approved Electrician, Technician), expiry date, and JIB grading.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Core qualifications:</strong> 18th Edition (BS 7671), C&G 2391/2394/2395,
                AM2, Level 3 NVQ, and any additional endorsements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Health and safety:</strong> First aid at work, asbestos awareness, manual
                handling, working at height, PASMA, IPAF.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Manufacturer training:</strong> EV charger installation (specific
                manufacturers), fire alarm systems, access control, data cabling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Test equipment calibration:</strong> Calibration dates and due dates for
                each operative's instruments.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When any credential is within 90 days of expiry, automatic reminders are sent to both the
          operative and the business owner. This gives adequate time to book training or renewal
          courses. For <SEOInternalLink href="/courses/18th-edition">18th Edition</SEOInternalLink>{' '}
          updates and ECS card renewals, early booking is essential as popular courses fill up
          quickly.
        </p>
      </>
    ),
  },
  {
    id: 'holiday-management',
    heading: 'Holiday Management for Electrical Teams',
    content: (
      <>
        <p>
          Managing holidays manually is a common source of scheduling disasters. An operative
          requests a week off by text message, you agree verbally, and three weeks later you
          schedule a job for that week because you forgot. The client is expecting you, the
          operative is on a beach, and you look unprofessional.
        </p>
        <p>
          Elec-Mate's holiday management system prevents this. Staff submit holiday requests through
          the app, specifying the dates and type (annual leave, bank holiday, unpaid leave, training
          day). The request appears in your approval queue. You can see the team calendar to check
          coverage before approving. Once approved, the dates are blocked in the job allocation
          calendar, making it impossible to schedule work for that person during their absence.
        </p>
        <p>
          <strong className="text-yellow-400">Holiday entitlement tracking</strong> ensures you know
          how many days each person has remaining. The statutory minimum is 28 days per year for
          full-time employees (including bank holidays), pro-rated for part-time staff. Some
          employers offer more. The system tracks the entitlement, the days taken, the days booked
          but not yet taken, and the remaining balance. At year-end, you can see at a glance whether
          anyone has unused days that need to be carried over or lost.
        </p>
        <p>
          For businesses that close during Christmas or other periods, you can pre-block company
          shutdown dates that apply to all staff, automatically deducted from their entitlement.
        </p>
      </>
    ),
  },
  {
    id: 'compliance-tracking',
    heading: 'Compliance Tracking and Audit Readiness',
    content: (
      <>
        <p>
          Electrical contractors face compliance requirements from multiple directions: HMRC for tax
          and CIS, HSE for health and safety, your competent person scheme (NICEIC, NAPIT, ELECSA)
          for technical standards, and commercial clients and principal contractors for site access
          credentials.
        </p>
        <p>
          <strong className="text-yellow-400">The cost of non-compliance is high.</strong> An
          operative arriving at a commercial site with an expired ECS card means a wasted trip
          (travel time, fuel, and the opportunity cost of the job not being done). A health and
          safety inspection finding expired first aid certificates can result in enforcement action.
          A competent person scheme audit finding inadequate records can lead to additional
          inspections, conditions, or ultimately loss of scheme membership.
        </p>
        <p>
          Elec-Mate's compliance dashboard shows you, at a glance, the status of every credential
          for every team member. Green means current with more than 90 days remaining. Amber means
          expiring within 90 days. Red means expired. You can drill down into any person to see
          their full qualification profile, or view a specific qualification across the whole team
          to see who needs renewal.
        </p>
        <p>
          When your competent person scheme assessor visits, or a principal contractor requests
          proof of qualifications for site access, you can produce the information in seconds. No
          more rummaging through filing cabinets for photocopied cards or calling operatives to ask
          them to send photos of their certificates.
        </p>
        <SEOAppBridge
          title="Compliance Dashboard"
          description="See the compliance status of every team member at a glance. Automatic reminders before credentials expire. Generate qualification reports for scheme assessors and principal contractors in seconds."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/tools/schedule-manager-electrician',
    title: 'Schedule Manager',
    description: 'Job booking, calendar view, customer notifications, and route planning.',
    icon: CalendarDays,
    category: 'Business Tool',
  },
  {
    href: '/tools/expenses-manager-electrician',
    title: 'Expenses Manager',
    description:
      'Track mileage, materials, tools, and fuel. HMRC-compliant categories and receipt capture.',
    icon: Receipt,
    category: 'Business Tool',
  },
  {
    href: '/tools/job-profitability-calculator',
    title: 'Job Profitability Calculator',
    description:
      'Calculate true profit margins on every job including all labour and overhead costs.',
    icon: BarChart3,
    category: 'Business Tool',
  },
  {
    href: '/tools/cash-flow-planner',
    title: 'Cash Flow Planner',
    description:
      'Forecast cash position, track invoices, and spot shortfalls before they become crises.',
    icon: TrendingUp,
    category: 'Business Tool',
  },
  {
    href: '/guides/starting-electrical-business',
    title: 'Starting an Electrical Business',
    description: 'From sole trader to employer -- setting up and growing your electrical business.',
    icon: Briefcase,
    category: 'Business Guide',
  },
  {
    href: '/guides/how-to-price-electrical-jobs',
    title: 'How to Price Electrical Jobs',
    description:
      'Pricing methodology covering materials, labour rates, overheads, and profit margin.',
    icon: PoundSterling,
    category: 'Business Guide',
  },
];

export default function StaffManagementToolPage() {
  return (
    <BusinessTemplate
      title="Staff Management for Electrical Contractors"
      description="Staff management tools built for electrical contractors. Time tracking, job allocation, skills matrix, holiday management, and compliance tracking. Manage your team from one platform."
      datePublished="2025-06-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Tools"
      badgeIcon={Users}
      heroTitle={
        <>
          Staff Management <span className="text-yellow-400">for Electrical Contractors</span>
        </>
      }
      heroSubtitle="Time tracking, job allocation, skills matrix, holiday management, and compliance tracking -- all in one platform built for electrical teams. Stop managing your staff with spreadsheets and WhatsApp."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      stats={stats}
      sections={sections}
      features={features}
      featuresHeading="Staff Management Features"
      featuresSubheading="Purpose-built for electrical contractors managing teams of 2 to 50+ operatives."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Staff Management"
      relatedPages={relatedPages}
      ctaHeading="Manage Your Team Professionally"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to manage staff, track compliance, and allocate jobs. 7-day free trial, cancel anytime."
      pagePath="/tools/staff-management-electrician"
    />
  );
}
