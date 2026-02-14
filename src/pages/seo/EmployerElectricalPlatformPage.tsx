import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Building,
  Users,
  GraduationCap,
  FileCheck2,
  BarChart3,
  Shield,
  ClipboardCheck,
  UserCheck,
  TrendingUp,
  Camera,
  WifiOff,
  Calculator,
  Smartphone,
  BookOpen,
} from 'lucide-react';

export default function EmployerElectricalPlatformPage() {
  return (
    <ToolTemplate
      title="Employer Platform for Electrical Companies | Dashboard"
      description="Elec-Mate's employer platform for electrical companies. 5 employer hubs — apprentice tracking, staff management, certificate oversight, compliance monitoring, and business analytics. Real-time dashboards, progress tracking, and team management tools for electrical contractors."
      datePublished="2026-01-18"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'Employer Platform', href: '/tools/employer-electrical-platform' },
      ]}
      tocItems={[
        { id: 'overview', label: 'Platform Overview' },
        { id: 'apprentice-tracking', label: 'Apprentice Tracking' },
        { id: 'staff-management', label: 'Staff Management' },
        { id: 'certificate-oversight', label: 'Certificate Oversight' },
        { id: 'compliance-monitoring', label: 'Compliance Monitoring' },
        { id: 'business-analytics', label: 'Business Analytics' },
        { id: 'how-to', label: 'Getting Started' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Employer Dashboard"
      badgeIcon={Building}
      heroTitle={
        <>
          <span className="text-yellow-400">Employer Platform</span> for Electrical Companies
        </>
      }
      heroSubtitle="5 employer hubs in one dashboard. Track apprentice progress, manage staff qualifications, oversee certificate production, monitor compliance, and analyse business performance. Built for electrical contractors who need visibility across their entire operation — from apprentice portfolios to completed EICRs."
      heroFeaturePills={[
        { icon: Users, label: 'Team Management' },
        { icon: GraduationCap, label: 'Apprentice Tracking' },
        { icon: FileCheck2, label: 'Certificate Oversight' },
        { icon: BarChart3, label: 'Business Analytics' },
      ]}
      readingTime={11}
      keyTakeaways={[
        'The employer platform provides 5 dedicated hubs: apprentice tracking, staff management, certificate oversight, compliance monitoring, and business analytics.',
        'Apprentice tracking shows real-time progress through training modules, off-the-job hours logged, portfolio evidence uploaded, and EPA readiness indicators.',
        'Certificate oversight gives managers visibility into all certificates produced by the team — EICR, EIC, Minor Works, and more — with status tracking and quality review.',
        'Compliance monitoring tracks staff qualifications, scheme registrations, card renewals, and mandatory training expiry dates with automated alerts.',
        'Business analytics provides dashboards for job volumes, certificate output rates, revenue tracking, and team productivity metrics.',
      ]}
      sections={[
        {
          id: 'overview',
          heading: 'One Dashboard for Your Entire Electrical Business',
          content: (
            <>
              <p>
                Running an electrical contracting business means managing multiple moving parts:
                apprentices progressing through training, qualified electricians producing
                certificates, compliance deadlines approaching, and business targets to hit. The
                Elec-Mate employer platform brings all of this into a single dashboard.
              </p>
              <p>
                The platform is designed for electrical company owners, managers, and supervisors
                who need oversight without micromanagement. You see real-time data on team
                performance, apprentice progress, and certificate production — and you receive
                automated alerts when compliance deadlines approach or when something needs your
                attention.
              </p>
              <p>
                Every team member uses the same Elec-Mate app for their daily work —{' '}
                <SEOInternalLink href="/tools/digital-certificates-app">
                  completing certificates
                </SEOInternalLink>
                ,{' '}
                <SEOInternalLink href="/tools/electrical-testing-calculators">
                  using calculators
                </SEOInternalLink>
                , and{' '}
                <SEOInternalLink href="/tools/study-centre-online-courses">
                  studying courses
                </SEOInternalLink>
                . The employer platform aggregates this activity into management views, giving you
                the visibility you need without adding admin burden to your team.
              </p>
            </>
          ),
          appBridge: {
            title: 'Manage Your Electrical Team from One Dashboard',
            description:
              'Apprentice tracking, staff management, certificate oversight, compliance monitoring, and business analytics. 7-day free trial for employers.',
            icon: Building,
          },
        },
        {
          id: 'apprentice-tracking',
          heading: 'Apprentice Tracking Hub',
          content: (
            <>
              <p>
                The apprentice tracking hub gives employers and training managers complete
                visibility into apprentice progress. Every apprentice on your team has a detailed
                profile showing:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Course progress</span> — which training
                  modules each apprentice has completed, is currently studying, and has yet to
                  start. Progress percentages for each module and overall programme completion.
                </li>
                <li>
                  <span className="font-semibold text-white">Off-the-job training hours</span> —
                  logged hours against the 20% off-the-job requirement. Automatic calculation of
                  whether each apprentice is on track, ahead, or behind on their hours.
                </li>
                <li>
                  <span className="font-semibold text-white">Portfolio evidence</span> — uploaded
                  photos, written reflections, and skills sign-offs. See which portfolio sections
                  are complete and which need attention before EPA.
                </li>
                <li>
                  <span className="font-semibold text-white">Quiz and assessment results</span> —
                  scores on knowledge checks, mock exams, and practice tests. Identify areas where
                  apprentices need additional support.
                </li>
                <li>
                  <span className="font-semibold text-white">EPA readiness</span> — an overall
                  readiness indicator showing whether each apprentice is prepared for their
                  End-Point Assessment. Based on portfolio completion, knowledge scores, and
                  practical skills sign-offs.
                </li>
              </ul>
              <p>
                For companies with multiple apprentices at different stages, this hub replaces
                spreadsheets, email check-ins, and guesswork with real-time data. You know exactly
                where each apprentice stands without having to ask them. For more on apprentice
                training, see our{' '}
                <SEOInternalLink href="/guides/apprentice-training">
                  apprentice training guide
                </SEOInternalLink>{' '}
                and{' '}
                <SEOInternalLink href="/guides/epa-preparation">
                  EPA preparation guide
                </SEOInternalLink>
                .
              </p>
            </>
          ),
        },
        {
          id: 'staff-management',
          heading: 'Staff Management Hub',
          content: (
            <>
              <p>
                The staff management hub tracks your qualified electricians' profiles,
                qualifications, and activity:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Qualification records</span> — City and
                  Guilds certificates, 18th Edition, 2391 Inspection and Testing, AM2, and other
                  qualifications with completion dates and renewal reminders.
                </li>
                <li>
                  <span className="font-semibold text-white">Scheme registrations</span> — NICEIC,
                  NAPIT, ELECSA, and other competent person scheme memberships with registration
                  numbers and renewal dates.
                </li>
                <li>
                  <span className="font-semibold text-white">Card tracking</span> — ECS/JIB card
                  types, expiry dates, and renewal reminders. Know when each team member's card
                  needs renewing before it expires.
                </li>
                <li>
                  <span className="font-semibold text-white">CPD records</span> — continuing
                  professional development activities logged against scheme requirements. Track
                  whether each electrician is meeting their CPD obligations.
                </li>
                <li>
                  <span className="font-semibold text-white">Activity overview</span> — certificates
                  produced, jobs completed, and training courses finished by each team member. See
                  who is active and who might need support.
                </li>
              </ul>
              <p>
                Automated alerts notify you 90, 60, and 30 days before any qualification, scheme
                registration, or card expires. This prevents the compliance gaps that can lead to
                scheme sanctions or insurance invalidation.
              </p>
            </>
          ),
        },
        {
          id: 'certificate-oversight',
          heading: 'Certificate Oversight Hub',
          content: (
            <>
              <p>
                The certificate oversight hub gives managers visibility into every certificate
                produced by the team:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All certificates across all 8 types in one searchable list</li>
                <li>Status tracking — draft, in progress, completed, delivered, and archived</li>
                <li>
                  Quality review — managers can review certificates before they are sent to clients
                </li>
                <li>Client details and property addresses for each certificate</li>
                <li>PDF access — download any certificate PDF from the dashboard</li>
                <li>Team attribution — see which electrician completed each certificate</li>
              </ul>
              <p>
                For companies that submit certificates to scheme providers, the oversight hub
                provides a central repository where all certificates are accessible. Managers can
                review the quality of work, check that test results are sensible, and ensure
                observations are correctly classified before submission.
              </p>
              <p>
                The hub also helps with client queries. When a landlord calls asking about an EICR
                completed six months ago, you can find it instantly by property address, client
                name, or date — without asking the electrician who did the job to dig through their
                phone.
              </p>
            </>
          ),
          appBridge: {
            title: 'Oversee Every Certificate Your Team Produces',
            description:
              'Review, approve, and track all certificates from one dashboard. Search by property, client, date, or electrician. Quality control before submission to scheme providers.',
            icon: ClipboardCheck,
          },
        },
        {
          id: 'compliance-monitoring',
          heading: 'Compliance Monitoring Hub',
          content: (
            <>
              <p>
                Compliance is the foundation of any reputable electrical contracting business. The
                compliance monitoring hub tracks every time-sensitive obligation:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Scheme registration renewal dates (NICEIC, NAPIT, ELECSA)</li>
                <li>ECS/JIB card expiry dates for all team members</li>
                <li>Qualification renewal requirements</li>
                <li>Insurance policy renewal dates</li>
                <li>Mandatory training expiry (health and safety, asbestos awareness, etc.)</li>
                <li>CPD hours tracking against scheme requirements</li>
              </ul>
              <p>
                The hub uses a traffic light system: green means compliant with plenty of time,
                amber means approaching a deadline, and red means action is needed urgently.
                Automated email and push notification alerts ensure nothing falls through the
                cracks.
              </p>
              <p>
                For{' '}
                <SEOInternalLink href="/guides/niceic-registration">
                  NICEIC-registered
                </SEOInternalLink>{' '}
                companies, maintaining compliance is critical. A lapsed card or expired
                qualification can lead to scheme audit failures, which in turn can affect your
                ability to self-certify work under Part P. The compliance hub prevents these issues
                by giving you advance warning of every upcoming deadline.
              </p>
            </>
          ),
        },
        {
          id: 'business-analytics',
          heading: 'Business Analytics Hub',
          content: (
            <>
              <p>
                The business analytics hub provides data-driven insights into your electrical
                contracting operation:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Certificate output</span> — total
                  certificates produced per week, month, and quarter. Breakdown by certificate type
                  and by team member. Trend analysis showing whether output is increasing or
                  decreasing.
                </li>
                <li>
                  <span className="font-semibold text-white">Team productivity</span> — average
                  certificate completion time, jobs per day, and utilisation rates. Identify
                  bottlenecks and opportunities to improve efficiency.
                </li>
                <li>
                  <span className="font-semibold text-white">Training engagement</span> — which
                  courses are being completed, average quiz scores, and training hours per team
                  member. Ensure your team is developing their skills.
                </li>
                <li>
                  <span className="font-semibold text-white">Apprentice benchmarks</span> — compare
                  apprentice progress against programme milestones. Identify those who are excelling
                  and those who need additional support.
                </li>
              </ul>
              <p>
                These analytics help you make informed decisions about staffing, training
                investment, and business development. Rather than relying on gut feel, you have data
                to support your strategy. The dashboard exports to PDF for use in business reviews
                and scheme assessments.
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Create your employer account',
          text: 'Sign up as an employer and set up your company profile with business details, scheme registrations, and insurance information.',
        },
        {
          name: 'Invite your team',
          text: 'Send invitations to your electricians and apprentices via email. They join your company on Elec-Mate and their activity feeds into your dashboard automatically.',
        },
        {
          name: 'Set up compliance tracking',
          text: 'Enter qualification details, card expiry dates, and scheme registration renewals for each team member. Automated alerts activate immediately.',
        },
        {
          name: 'Monitor from the dashboard',
          text: 'Access all 5 hubs from your employer dashboard — apprentice tracking, staff management, certificates, compliance, and analytics. Data updates in real time.',
        },
      ]}
      howToHeading="Getting Started as an Employer"
      howToDescription="Four steps from sign-up to full team visibility."
      features={[
        {
          icon: GraduationCap,
          title: 'Apprentice Tracking',
          description:
            'Course progress, off-the-job hours, portfolio evidence, quiz scores, and EPA readiness. Real-time visibility into every apprentice.',
        },
        {
          icon: Users,
          title: 'Staff Management',
          description:
            'Qualifications, scheme registrations, card tracking, CPD records, and activity overview for all team members.',
        },
        {
          icon: FileCheck2,
          title: 'Certificate Oversight',
          description:
            'Review, approve, and track all certificates across 8 types. Search by property, client, date, or electrician.',
        },
        {
          icon: Shield,
          title: 'Compliance Monitoring',
          description:
            'Track every deadline — scheme renewals, card expiry, insurance, mandatory training. Automated alerts at 90, 60, and 30 days.',
        },
        {
          icon: BarChart3,
          title: 'Business Analytics',
          description:
            'Certificate output, team productivity, training engagement, and apprentice benchmarks. Data-driven decisions.',
        },
        {
          icon: UserCheck,
          title: 'Team Invitations',
          description:
            'Invite electricians and apprentices via email. They join your company and their activity feeds into your dashboard automatically.',
        },
      ]}
      featuresHeading="Employer Platform Features"
      featuresSubheading="5 hubs that give electrical company owners and managers complete visibility across their operation."
      faqs={[
        {
          question: 'What is the Elec-Mate employer platform?',
          answer:
            'The employer platform is a management dashboard for electrical contracting companies. It provides 5 hubs — apprentice tracking, staff management, certificate oversight, compliance monitoring, and business analytics — giving owners and managers visibility into their entire operation. Team members use the same Elec-Mate app for their daily work, and their activity feeds into the employer dashboard automatically.',
        },
        {
          question: 'How does apprentice tracking work?',
          answer:
            'The apprentice tracking hub shows real-time progress for each apprentice on your team. You can see which training modules they have completed, off-the-job hours logged, portfolio evidence uploaded, quiz scores, and an overall EPA readiness indicator. The data updates automatically as apprentices study courses, complete assessments, and upload evidence through the Elec-Mate app.',
        },
        {
          question: 'Can managers review certificates before they are sent to clients?',
          answer:
            'Yes. The certificate oversight hub lets managers review any certificate produced by the team before it is finalised and sent. You can check test results, verify observations are correctly classified, and ensure the certificate meets quality standards. This is particularly valuable for companies submitting certificates to scheme providers like NICEIC or NAPIT.',
        },
        {
          question: 'How do compliance alerts work?',
          answer:
            'The compliance monitoring hub tracks every time-sensitive obligation — scheme registrations, ECS/JIB card expiry dates, qualification renewals, insurance policies, and mandatory training. Automated alerts are sent via email and push notification at 90, 60, and 30 days before any deadline. A traffic light system (green, amber, red) gives you an at-a-glance view of your team compliance status.',
        },
        {
          question: 'How many team members can I add to the employer platform?',
          answer:
            'There is no limit on the number of team members. You can invite as many electricians and apprentices as you need. Each team member gets their own Elec-Mate account with full access to certificates, calculators, and training courses. Their activity automatically feeds into your employer dashboard.',
        },
        {
          question: 'Does the employer platform cost extra?',
          answer:
            'The employer platform is included in Elec-Mate business plans. Each team member needs their own subscription (from £4.99/month each). The employer dashboard and management features are included at no additional cost. Volume discounts are available for larger teams. Contact us for enterprise pricing with 10 or more users.',
        },
        {
          question: 'Can I export analytics and reports?',
          answer:
            'Yes. All dashboard views and analytics can be exported as PDF reports. These are useful for business reviews, scheme assessments, and demonstrating compliance to auditors. Certificate records can also be exported for submission to scheme providers or for inclusion in company quality management documentation.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/digital-certificates-app',
          title: 'Digital Certificates App',
          description:
            'All 8 certificate types used by your team — EICR, EIC, Minor Works, and more.',
          icon: FileCheck2,
          category: 'Certificates',
        },
        {
          href: '/tools/study-centre-online-courses',
          title: 'Study Centre Online Courses',
          description:
            '46+ courses for apprentices and qualified electricians. Progress feeds into employer dashboard.',
          icon: GraduationCap,
          category: 'Training',
        },
        {
          href: '/tools/board-scanner',
          title: 'AI Board Scanner',
          description:
            'Photograph consumer units and auto-fill certificate schedules. Used by your team on site.',
          icon: Camera,
          category: 'AI Tools',
        },
        {
          href: '/tools/offline-electrical-app',
          title: 'Offline Electrical App',
          description:
            'Your team can work without signal. Data syncs to the cloud and your dashboard when online.',
          icon: WifiOff,
          category: 'Tools',
        },
        {
          href: '/tools/electrician-app-iphone',
          title: 'Electrician App for iPhone',
          description:
            'Native iOS app your team uses daily — certificates, calculators, training, and AI tools.',
          icon: Smartphone,
          category: 'Tools',
        },
        {
          href: '/tools/electrical-testing-calculators',
          title: 'Electrical Calculators',
          description:
            '70+ BS 7671 calculators available to your entire team — cable sizing, voltage drop, and more.',
          icon: Calculator,
          category: 'Tools',
        },
      ]}
      ctaHeading="Set up your employer dashboard — free for 7 days"
      ctaSubheading="Apprentice tracking, staff management, certificate oversight, compliance monitoring, and business analytics. Invite your team and get full visibility from day one."
      toolPath="/tools/employer-electrical-platform"
    />
  );
}
