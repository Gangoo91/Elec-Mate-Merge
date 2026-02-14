import BusinessTemplate from '@/pages/seo/templates/BusinessTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Calendar,
  Briefcase,
  MapPin,
  Bell,
  RotateCcw,
  Users,
  Clock,
  Navigation,
  PoundSterling,
  TrendingUp,
  BarChart3,
  Receipt,
  FileText,
  Zap,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Business Tools', href: '/tools' },
  { label: 'Schedule Manager', href: '/tools/schedule-manager-electrician' },
];

const tocItems = [
  { id: 'why-scheduling-matters', label: 'Why Scheduling Matters' },
  { id: 'calendar-view', label: 'Calendar View' },
  { id: 'customer-notifications', label: 'Customer Notifications' },
  { id: 'route-planning', label: 'Route Planning' },
  { id: 'recurring-jobs', label: 'Recurring Jobs' },
  { id: 'team-scheduling', label: 'Team Scheduling' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Professional scheduling reduces no-shows, prevents double-bookings, and ensures clients receive confirmation and reminder messages automatically.',
  'Route planning between jobs can save 30-60 minutes per day in travel time -- that is 2-5 additional billable hours per week.',
  'Automated customer notifications (booking confirmation, day-before reminder, on-the-way message) dramatically reduce missed appointments and improve your professional reputation.',
  'Recurring job scheduling for maintenance contracts, EICRs, and emergency lighting tests ensures you never forget a repeat client and builds reliable recurring revenue.',
  'Calendar sync with Google Calendar and Apple Calendar means your work schedule is always accessible, even when you are not in the Elec-Mate app.',
];

const stats = [
  { value: '45 min', label: 'Average daily travel time saved with route planning' },
  { value: '92%', label: 'Reduction in missed appointments with reminders' },
  { value: '5+ hrs', label: 'Extra billable hours per week' },
  { value: 'GBP 0', label: 'Cost of double-bookings' },
];

const faqs = [
  {
    question: 'How does the scheduling calendar work?',
    answer:
      "Elec-Mate's scheduling calendar displays your jobs in a clear daily, weekly, or monthly view. Each job shows the client name, address, job type, estimated duration, and any notes. Jobs are colour-coded by status (confirmed, provisional, in progress, completed) and by job type (installation, testing, maintenance, emergency). You can drag and drop jobs to reschedule them, and the system automatically sends updated notifications to the affected clients. The calendar syncs with Google Calendar and Apple Calendar so your schedule is accessible from any device. For teams, the calendar shows all operatives side-by-side, making it easy to see availability and allocate work efficiently.",
  },
  {
    question: 'What customer notifications does Elec-Mate send?',
    answer:
      'Elec-Mate sends automated notifications at key points in the job lifecycle. When you book a job, the client receives a confirmation email or SMS with the date, time, your name, and what to expect. The day before the appointment, a reminder is sent automatically (this alone dramatically reduces no-shows and "I forgot you were coming" situations). On the morning of the job, you can send an "on the way" message with your estimated arrival time. After the job, a follow-up message can be sent with the certificate, invoice, and a request for a review. All messages are branded with your business name and can be customised. You control which notifications are enabled and their timing.',
  },
  {
    question: 'How does route planning save time?',
    answer:
      "If you have multiple jobs in a day, the order in which you visit them matters. Visiting sites in a random order can add 30 to 60 minutes of unnecessary driving. Elec-Mate's route optimisation looks at your scheduled jobs for the day and suggests the most efficient order, minimising total travel time and distance. It accounts for appointment time windows (if a client has specified a morning or afternoon slot), estimated job durations, and your starting location. For electricians covering a wide geographic area, the time saved compounds over weeks and months. Five hours of saved travel per week is five additional hours you can bill to clients -- at a typical hourly rate, that is GBP 150 to GBP 250 per week of additional revenue.",
  },
  {
    question: 'Can I set up recurring jobs automatically?',
    answer:
      'Yes. Recurring jobs are a significant source of reliable revenue for electricians, and Elec-Mate makes them easy to manage. Common recurring electrical jobs include quarterly emergency lighting tests (required by BS 5266), annual fire alarm servicing, EICR inspections every 5 years for rental properties, annual PAT testing for commercial clients, and periodic maintenance visits for commercial installations. You set up the recurring schedule once -- specifying the frequency, the client, the site, the job type, and the estimated duration -- and the jobs appear automatically in your calendar at the correct intervals. Reminders are sent to both you and the client ahead of each visit. The system also tracks completion status so you can see which recurring jobs are upcoming, due, or overdue.',
  },
  {
    question: 'Does the schedule integrate with quoting and invoicing?',
    answer:
      'Yes, the entire workflow is connected. When a client accepts a quote, you can schedule the job directly from the quote screen -- the job details, client information, and scope of work carry forward automatically. When the job is completed and marked as done in the scheduler, you can convert the quote to an invoice with a single tap. The completion date is recorded, the certificate reference can be attached, and the invoice is ready to send. This eliminates duplicate data entry and ensures nothing falls through the cracks between quoting, scheduling, doing the work, and getting paid.',
  },
  {
    question: 'How does Elec-Mate prevent double-booking?',
    answer:
      'Elec-Mate checks for scheduling conflicts whenever you add or move a job. If you try to schedule a job that overlaps with an existing booking for the same operative, the system warns you and asks you to confirm or choose a different time. For teams, each operative has their own calendar lane, so you can see at a glance who has availability. The system also accounts for travel time between jobs based on the site locations, so it will flag if two jobs are back-to-back but 45 minutes apart by road. This prevents the common problem of booking two afternoon jobs in different parts of the city with no travel buffer between them.',
  },
  {
    question: 'Can clients book appointments directly?',
    answer:
      'Elec-Mate supports online booking links that you can add to your website, Google Business Profile, or social media. Clients see your available time slots (you control which days and times are bookable, and how far in advance), select a slot, enter their details, and describe the work needed. The booking appears in your calendar as a provisional appointment that you can confirm, reschedule, or decline. This is particularly useful for domestic electricians who receive many enquiries outside working hours -- clients can book while you are on site without you needing to answer the phone.',
  },
];

const features = [
  {
    icon: Calendar,
    title: 'Visual Calendar',
    description:
      'Day, week, and month views with colour-coded jobs. Drag-and-drop rescheduling. Syncs with Google Calendar and Apple Calendar.',
  },
  {
    icon: Bell,
    title: 'Customer Notifications',
    description:
      'Automatic booking confirmations, day-before reminders, and on-the-way messages. Branded with your business name. Email and SMS.',
  },
  {
    icon: Navigation,
    title: 'Route Optimisation',
    description:
      'Plan the most efficient route between jobs each day. Save 30-60 minutes of driving. More billable hours, less fuel.',
  },
  {
    icon: RotateCcw,
    title: 'Recurring Jobs',
    description:
      'Set up emergency lighting tests, EICRs, PAT testing, and maintenance schedules once. Jobs appear automatically at the right intervals.',
  },
  {
    icon: Users,
    title: 'Team Scheduling',
    description:
      'See all operatives side by side. Allocate jobs based on availability, qualifications, and location. Real-time updates across all devices.',
  },
  {
    icon: Clock,
    title: 'Online Booking',
    description:
      'Clients book available slots through a link on your website or Google profile. Provisional bookings appear in your calendar for confirmation.',
  },
];

const sections = [
  {
    id: 'why-scheduling-matters',
    heading: 'Why Professional Scheduling Matters for Electricians',
    content: (
      <>
        <p>
          Your schedule is your most valuable asset. Every hour of the working day is either
          billable (generating revenue) or non-billable (costing you money). The difference between
          a well-organised electrician and a disorganised one is not skill -- it is scheduling. The
          organised electrician fits 3 productive jobs into a day with minimal travel between them.
          The disorganised one completes 2 jobs but drives twice as far, arrives late to the second
          because the first overran, and forgets to send the client a reminder so they are not in
          when they arrive.
        </p>
        <p>
          <strong className="text-yellow-400">The financial impact is significant.</strong> If
          better scheduling gives you just one additional billable hour per day, that is 5 hours per
          week, approximately 230 hours per year. At a modest charge rate of GBP 45 per hour, that
          is GBP 10,350 per year of additional revenue -- from the same number of working days,
          simply by managing your time more effectively.
        </p>
        <p>
          Professional scheduling also affects your reputation. Clients notice when you confirm
          appointments promptly, send reminders, arrive on time, and communicate proactively about
          delays. These behaviours generate reviews, referrals, and repeat business. They also
          reduce no-shows and wasted visits -- a problem that costs the average UK tradesperson 2-3
          hours per week in missed appointments.
        </p>
        <p>
          Elec-Mate's Schedule Manager is designed for the specific needs of UK electricians. It
          integrates with the{' '}
          <SEOInternalLink href="/tools/electrical-quoting-app">quoting system</SEOInternalLink>,{' '}
          <SEOInternalLink href="/tools/electrician-invoice-app">invoicing</SEOInternalLink>,{' '}
          <SEOInternalLink href="/tools/staff-management-electrician">
            staff management
          </SEOInternalLink>
          , and certification tools -- creating a seamless workflow from enquiry through to payment.
        </p>
      </>
    ),
  },
  {
    id: 'calendar-view',
    heading: 'Calendar View and Job Management',
    content: (
      <>
        <p>
          The calendar is the heart of the Schedule Manager. It displays your jobs in the view that
          suits you best -- daily for detailed planning, weekly for an overview of the coming week,
          or monthly for spotting patterns and gaps in your workload.
        </p>
        <p>
          Each job block shows the essential information at a glance: client name, site address, job
          type (installation, testing, maintenance, emergency), estimated duration, and status
          (confirmed, provisional, in progress, completed). Tap any job to see the full details
          including scope of works, client contact information, access notes, and any linked quotes
          or certificates.
        </p>
        <p>
          <strong className="text-yellow-400">Colour coding</strong> makes the calendar scannable.
          Installations might be blue, testing jobs amber, maintenance green, and emergencies red.
          You can customise the colours to match your own categorisation. Jobs change colour as they
          progress through their lifecycle -- provisional bookings are lighter, confirmed jobs are
          solid, and completed jobs are greyed out.
        </p>
        <p>
          <strong className="text-yellow-400">Drag-and-drop rescheduling</strong> makes it easy to
          move jobs when plans change. Drag a job from Tuesday to Thursday, and Elec-Mate
          automatically sends the client an updated notification with the new date and time. If you
          are managing a team, you can drag a job from one operative's calendar to another's to
          reallocate work.
        </p>
        <p>
          The calendar syncs with Google Calendar and Apple Calendar bi-directionally. Personal
          appointments you add in Google Calendar appear as blocked time in Elec-Mate, and Elec-Mate
          jobs appear in your Google Calendar. This ensures you always have a complete view of your
          commitments in whichever app you prefer.
        </p>
      </>
    ),
  },
  {
    id: 'customer-notifications',
    heading: 'Automated Customer Notifications',
    content: (
      <>
        <p>
          Communication is what separates professional electricians from the rest. Clients
          consistently cite responsiveness and communication as the most important factor in
          choosing a tradesperson -- even more important than price. Elec-Mate automates the routine
          communications so you can focus on the work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Notification Timeline</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Booking confirmation:</strong> Sent immediately when you schedule a job.
                Includes the date, time, your business name, and what the client should expect or
                prepare.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Day-before reminder:</strong> Sent automatically at a time you choose (e.g.
                6pm the evening before). This single message reduces no-shows by up to 90%.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>On-the-way notification:</strong> Tap a button when you leave for the job,
                and the client receives a message with your estimated arrival time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Job completed follow-up:</strong> Sent after you mark the job as complete.
                Can include the certificate, the invoice, and a link to leave a review.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All messages are branded with your business name and contact details. You can customise
          the wording and enable or disable each notification type. Messages can be sent via email,
          SMS, or both. The client sees a professional, polished communication -- not a generic
          automated message.
        </p>
      </>
    ),
    appBridge: {
      title: 'Automated Customer Communications',
      description:
        'Booking confirmations, reminders, and follow-ups sent automatically. Your clients feel looked after, and you never have to remember to send a text message again.',
      icon: Bell,
    },
  },
  {
    id: 'route-planning',
    heading: 'Route Planning and Travel Optimisation',
    content: (
      <>
        <p>
          For electricians with multiple jobs in a day, the order in which you visit sites has a
          significant impact on travel time and fuel costs. Visiting three sites in the wrong order
          might add 25 miles and 45 minutes of driving compared to the optimal route. Over a working
          year, that compounds into hundreds of hours and thousands of miles of unnecessary travel.
        </p>
        <p>
          Elec-Mate's route optimisation takes your scheduled jobs for the day, your starting
          location, and any time constraints (morning slots, afternoon appointments, fixed times),
          and calculates the most efficient visiting order. The optimised route is displayed on a
          map with turn-by-turn directions available through Google Maps or Apple Maps.
        </p>
        <p>
          <strong className="text-yellow-400">The savings are measurable.</strong> If route planning
          saves you 30 minutes of driving per day, that is 2.5 hours per week -- time you can spend
          on an additional job. It also reduces fuel consumption (typically GBP 15-GBP 25 per week
          in savings) and vehicle wear. For electricians who{' '}
          <SEOInternalLink href="/tools/expenses-manager-electrician">
            track mileage
          </SEOInternalLink>{' '}
          for tax purposes, fewer business miles also means a smaller mileage claim, but the time
          saved more than compensates for this.
        </p>
        <p>
          Route planning is particularly valuable for electricians who cover a wide area -- those
          working across multiple towns, cities, or counties. It is also essential for teams, where
          multiple operatives are visiting different sites and you need to minimise total fleet
          travel.
        </p>
      </>
    ),
  },
  {
    id: 'recurring-jobs',
    heading: 'Recurring Job Scheduling',
    content: (
      <>
        <p>
          Recurring maintenance work is the most valuable revenue stream for an electrical
          contractor. It is predictable, requires minimal marketing effort, and builds long-term
          client relationships. The challenge is managing the scheduling -- remembering when each
          client is due, booking the visits in advance, and ensuring nothing is missed.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
          <h3 className="font-bold text-white text-lg mb-4">Common Recurring Electrical Jobs</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <RotateCcw className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Emergency lighting tests:</strong> Monthly functional tests (BS 5266-1) and
                annual 3-hour duration tests. Typically for commercial clients, schools, care homes,
                and landlords.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <RotateCcw className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>Fire alarm servicing:</strong> Quarterly inspections and annual servicing
                (BS 5839-1). Includes testing all call points, detectors, sounders, and the control
                panel.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <RotateCcw className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>EICR inspections:</strong> Every 5 years for rental properties (legal
                requirement), every 5 years for domestic owner-occupied, every 3-5 years for
                commercial.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <RotateCcw className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span className="flex-1 text-left">
                <strong>PAT testing:</strong> Annual or more frequent depending on the environment
                and equipment type. Offices, workshops, construction sites, and public venues.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate lets you set up each recurring schedule once. Specify the client, site, job
          type, frequency, and estimated duration. Jobs appear automatically in your calendar at the
          correct intervals, with reminders sent to you and the client. When a recurring job is
          completed, the next occurrence is automatically scheduled. If you manage a portfolio of
          rental properties for a letting agent, this feature alone can save hours of scheduling
          admin each month.
        </p>
      </>
    ),
  },
  {
    id: 'team-scheduling',
    heading: 'Team Scheduling and Coordination',
    content: (
      <>
        <p>
          For electrical contractors with a team, scheduling complexity increases exponentially.
          With one person, you have one calendar. With five people, you have five calendars that
          must be coordinated to ensure coverage, prevent clashes, and match qualifications to job
          requirements.
        </p>
        <p>
          Elec-Mate's team scheduling view shows all operatives in parallel columns (or swimlanes in
          weekly view). You can see at a glance who is free, who is on site, and who is booked for
          the rest of the week. When allocating a new job, filter by qualification (only show
          operatives with <SEOInternalLink href="/courses/city-guilds-2391">2391</SEOInternalLink>{' '}
          if the job requires inspection and testing) and by location (show operatives nearest to
          the job site).
        </p>
        <p>
          <strong className="text-yellow-400">Real-time updates</strong> ensure everyone sees the
          current schedule. If a job overruns and you need to push back subsequent appointments,
          update the schedule and all affected operatives and clients are notified automatically. If
          an emergency call comes in, you can see who has a gap in their afternoon and allocate the
          job immediately.
        </p>
        <p>
          The team schedule integrates with the{' '}
          <SEOInternalLink href="/tools/staff-management-electrician">
            staff management
          </SEOInternalLink>{' '}
          tools, so holiday bookings automatically block time in the schedule, and time tracking
          feeds into the schedule to show actual job durations versus estimated durations. Over
          time, this data improves your duration estimates and helps you schedule more accurately.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/tools/staff-management-electrician',
    title: 'Staff Management',
    description:
      'Time tracking, skills matrix, holiday management, and compliance tracking for teams.',
    icon: Users,
    category: 'Business Tool',
  },
  {
    href: '/tools/expenses-manager-electrician',
    title: 'Expenses Manager',
    description: 'Track mileage, materials, tools, and fuel with HMRC-compliant categories.',
    icon: Receipt,
    category: 'Business Tool',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Quoting App',
    description: 'AI-powered cost estimation and professional PDF quotes for electrical work.',
    icon: FileText,
    category: 'Business Tool',
  },
  {
    href: '/tools/electrician-invoice-app',
    title: 'Invoice App',
    description: 'Digital invoicing with Stripe payments and automatic payment reminders.',
    icon: Receipt,
    category: 'Business Tool',
  },
  {
    href: '/tools/cash-flow-planner',
    title: 'Cash Flow Planner',
    description: 'Forecast your cash position and plan around income and expense timing.',
    icon: TrendingUp,
    category: 'Business Tool',
  },
  {
    href: '/tools/job-profitability-calculator',
    title: 'Job Profitability Calculator',
    description: 'Calculate true profit margins including labour, materials, and overheads.',
    icon: BarChart3,
    category: 'Business Tool',
  },
];

export default function ScheduleManagerPage() {
  return (
    <BusinessTemplate
      title="Schedule Manager for Electricians | Job Booking"
      description="Schedule manager built for UK electricians. Calendar view, job booking, customer notifications, route planning, recurring jobs, and team scheduling. Never double-book or miss an appointment again."
      datePublished="2025-06-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Tools"
      badgeIcon={Calendar}
      heroTitle={
        <>
          Schedule Manager <span className="text-yellow-400">for UK Electricians</span>
        </>
      }
      heroSubtitle="Calendar view, job booking, customer notifications, route planning, and recurring job scheduling. Manage your diary professionally and never miss, double-book, or waste time on travel again."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      stats={stats}
      sections={sections}
      features={features}
      featuresHeading="Schedule Manager Features"
      featuresSubheading="Everything you need to manage your time professionally and maximise your billable hours."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Job Scheduling"
      relatedPages={relatedPages}
      ctaHeading="Take Control of Your Schedule"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to schedule jobs, optimise routes, and communicate professionally with clients. 7-day free trial, cancel anytime."
      pagePath="/tools/schedule-manager-electrician"
    />
  );
}
