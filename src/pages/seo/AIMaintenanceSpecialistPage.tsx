import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Brain,
  Zap,
  Wrench,
  Calendar,
  FileText,
  ShieldCheck,
  AlertTriangle,
  Activity,
  Bot,
  ClipboardCheck,
  GraduationCap,
  Search,
  TrendingUp,
  Clock,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'AI Tools', href: '/tools/ai-electrician-tools' },
  { label: 'AI Maintenance Specialist', href: '/tools/ai-maintenance-specialist' },
];

const tocItems = [
  { id: 'what-is-maintenance', label: 'What Is AI Maintenance?' },
  { id: 'scheduling', label: 'Maintenance Scheduling' },
  { id: 'fault-prediction', label: 'Fault Prediction' },
  { id: 'condition-monitoring', label: 'Condition Monitoring' },
  { id: 'compliance-tracking', label: 'Compliance & Record Keeping' },
  { id: 'how-to', label: 'How to Use It' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Generate maintenance schedules tailored to specific installations — the AI accounts for equipment type, age, environment, and usage patterns to set appropriate intervals.',
  'Fault prediction analyses historical test data and environmental conditions to identify circuits and equipment likely to develop problems before they fail.',
  'Condition monitoring guidance tells you what to measure, when to measure it, and what the readings mean for the remaining service life of each component.',
  'All maintenance recommendations reference the relevant BS 7671 regulations, IET guidance, and manufacturer specifications.',
  'Built specifically for UK electrical installations — covers planned preventive maintenance (PPM) schedules for domestic, commercial, and industrial systems.',
];

const faqs = [
  {
    question: 'What does the AI Maintenance Specialist do?',
    answer:
      'The AI Maintenance Specialist helps electricians plan, schedule, and execute maintenance programmes for electrical installations. You describe the installation — its age, equipment types, environment, and usage — and the AI generates a tailored maintenance schedule with specific tasks, intervals, and procedures for each component. It also analyses historical test data to predict which circuits or equipment are likely to develop faults, allowing you to address problems proactively rather than reactively. The tool produces professional maintenance reports, tracks compliance with statutory testing requirements, and maintains a complete history of all maintenance activities for each installation.',
  },
  {
    question: 'How does the AI determine maintenance intervals?',
    answer:
      'Maintenance intervals are determined by considering multiple factors: the type of equipment (a distribution board in a clean office environment has different maintenance needs from one in a dusty factory), the age of the installation (older installations typically require more frequent inspection), the environmental conditions (corrosive atmospheres, high humidity, extreme temperatures, and vibration all accelerate deterioration), the criticality of the installation (a hospital or data centre requires tighter maintenance schedules than a residential property), and the manufacturer recommendations for each specific item of equipment. The AI cross-references all these factors against the guidance in BS 7671, IET publications, and industry best practice to generate intervals that are neither too frequent (wasting time and money) nor too infrequent (risking failure).',
  },
  {
    question: 'Can the AI predict electrical faults before they happen?',
    answer:
      'The AI uses trend analysis on historical test data to identify deterioration patterns that indicate impending failure. For example, if insulation resistance readings on a particular circuit have been declining steadily over successive periodic inspections — perhaps from 200 megohms three years ago to 50 megohms last year to 15 megohms now — the AI identifies this trend and predicts that the insulation will reach an unsatisfactory level before the next scheduled inspection. It then recommends bringing forward the investigation or replacement of the affected cable. Similarly, rising earth fault loop impedance values, increasing RCD trip times, or thermographic evidence of developing hotspots at connections can all be identified as precursors to failure. This predictive capability helps you move from reactive maintenance (fixing things when they break) to proactive maintenance (preventing failures before they cause disruption).',
  },
  {
    question: 'Does the AI cover statutory testing requirements?',
    answer:
      'Yes. The AI tracks all statutory and regulatory testing requirements applicable to the installation. For commercial properties, this includes the periodic inspection intervals recommended by BS 7671 Table 3A (5 years for commercial installations, 1 year for swimming pools and construction sites, etc.), emergency lighting testing requirements under BS 5266 (monthly functional tests, annual full-duration tests), fire alarm testing under BS 5839 (weekly, monthly, quarterly, and annual tests), and RCD testing requirements for landlords under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. The AI maintains a compliance calendar showing when each test is due and alerts you in advance so nothing is missed.',
  },
  {
    question: 'Can I use this for commercial maintenance contracts?',
    answer:
      'Yes, the AI Maintenance Specialist is designed to support commercial maintenance contracts. You can set up multiple sites, each with its own installation profile and maintenance schedule. The AI generates task lists for each site visit, tracks completion of all scheduled maintenance activities, produces professional maintenance reports for the client, and maintains the historical records needed to demonstrate due diligence. For facilities management companies and electrical contractors with multiple maintenance contracts, this provides a centralised system for managing all your PPM obligations across all your sites. The maintenance reports are branded with your company details and formatted for client presentation.',
  },
  {
    question: 'How does condition monitoring guidance work?',
    answer:
      'The AI provides specific condition monitoring procedures for each type of equipment in the installation. For example, for a distribution board, the condition monitoring guidance covers: thermographic survey procedures (what to look for, acceptable temperature rises, comparison criteria), connection torque verification (which connections to check, the correct torque values for each terminal type), protective device operation testing (trip time verification for MCBs and RCDs, mechanical operation of switches), busbar inspection (visual checks for discolouration, pitting, or tracking), and enclosure integrity (IP rating verification, cable entry seal condition, ventilation adequacy). Each monitoring procedure includes the measurement to take, the acceptable range, the action threshold (the reading at which intervention is needed), and the critical threshold (the reading at which immediate action is required).',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/ai-commissioning-specialist',
    title: 'AI Commissioning Specialist',
    description:
      'Generate commissioning checklists and functional test guidance for new installations and alterations.',
    icon: ClipboardCheck,
    category: 'Tool',
  },
  {
    href: '/tools/ai-fault-diagnosis',
    title: 'AI Fault Diagnosis',
    description:
      'Diagnose electrical faults by describing symptoms in plain English. Ranked probable causes with test sequences.',
    icon: Search,
    category: 'Tool',
  },
  {
    href: '/tools/ai-report-writer',
    title: 'AI Report Writer',
    description:
      'Generate professional inspection reports, condition reports, and maintenance summaries for clients.',
    icon: FileText,
    category: 'Tool',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate',
    description:
      'Complete Electrical Installation Condition Reports digitally with auto-populated schedules.',
    icon: ClipboardCheck,
    category: 'Tool',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete guide to the 18th Edition of the IET Wiring Regulations including Amendment 3:2024.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for C&G 2391 with structured training covering all testing procedures and periodic inspection.',
    icon: GraduationCap,
    category: 'Training',
  },
];

const features = [
  {
    icon: Calendar,
    title: 'Intelligent Scheduling',
    description:
      'Maintenance intervals tailored to each installation based on equipment type, age, environment, usage, and criticality. No more one-size-fits-all schedules.',
  },
  {
    icon: TrendingUp,
    title: 'Fault Prediction',
    description:
      'Trend analysis on historical test data identifies deteriorating circuits and equipment before they fail. Move from reactive to proactive maintenance.',
  },
  {
    icon: Activity,
    title: 'Condition Monitoring',
    description:
      'Specific monitoring procedures for every equipment type with acceptable ranges, action thresholds, and critical thresholds for each measurement.',
  },
  {
    icon: ShieldCheck,
    title: 'Compliance Tracking',
    description:
      'Track all statutory and regulatory testing requirements. Automatic alerts when periodic inspections, emergency lighting tests, and fire alarm tests are due.',
  },
  {
    icon: FileText,
    title: 'Professional Reports',
    description:
      'Generate branded maintenance reports for clients showing completed work, test results, identified issues, and upcoming scheduled maintenance.',
  },
  {
    icon: Bot,
    title: 'Conversational Guidance',
    description:
      'Ask the AI about specific maintenance scenarios, unusual readings, or equipment-specific procedures. Get immediate, contextual answers from a specialist agent.',
  },
];

const howToSteps = [
  {
    name: 'Describe the installation',
    text: 'Enter the installation details — property type, equipment types and ages, earthing system, environmental conditions, and any previous test history you have available.',
  },
  {
    name: 'Review the maintenance schedule',
    text: 'The AI generates a tailored maintenance schedule with specific tasks, intervals, and procedures for each component in the installation.',
  },
  {
    name: 'Follow the monitoring procedures',
    text: 'On each maintenance visit, follow the condition monitoring procedures provided by the AI. Record your measurements and observations.',
  },
  {
    name: 'Review trend analysis',
    text: 'After multiple visits, the AI analyses trends in your recorded data to identify deterioration patterns and predict upcoming issues.',
  },
  {
    name: 'Generate maintenance reports',
    text: 'Produce professional maintenance reports for your clients showing completed work, results, and recommendations. Export as PDF with your branding.',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-maintenance',
    heading: 'What Is the AI Maintenance Specialist?',
    content: (
      <>
        <p>
          The AI Maintenance Specialist is one of eight specialist Elec-AI agents built into the
          Elec-Mate platform. It helps electricians plan and execute maintenance programmes for
          electrical installations of all sizes, from domestic periodic inspections through to
          comprehensive planned preventive maintenance (PPM) contracts for commercial and industrial
          facilities.
        </p>
        <p>
          Effective maintenance extends the life of electrical installations, prevents unexpected
          failures, and ensures ongoing compliance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink> and
          other applicable standards. But creating effective maintenance schedules requires
          understanding the specific needs of each installation — a newly installed distribution
          board in a clean, dry office has very different maintenance requirements from a
          20-year-old board in a humid industrial environment. The AI Maintenance Specialist
          considers all these factors automatically.
        </p>
        <p>
          The agent integrates with other Elec-Mate tools. Test results from{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR inspections</SEOInternalLink> feed
          into the maintenance history, allowing the AI to track trends over time. The{' '}
          <SEOInternalLink href="/tools/ai-fault-diagnosis">Fault Diagnosis agent</SEOInternalLink>{' '}
          can be invoked directly from a maintenance visit when unexpected readings are found. And
          the <SEOInternalLink href="/tools/ai-report-writer">Report Writer</SEOInternalLink>{' '}
          produces professional maintenance reports from the data you collect during each visit.
        </p>
      </>
    ),
  },
  {
    id: 'scheduling',
    heading: 'Intelligent Maintenance Scheduling',
    content: (
      <>
        <p>
          The AI generates maintenance schedules that are tailored to the specific installation
          rather than applying generic intervals. It considers the type of equipment installed, its
          age and condition, the environmental conditions it operates in, how heavily it is used,
          and how critical the installation is to the building's operation.
        </p>
        <p>
          For domestic installations, the AI follows the recommended periodic inspection intervals
          from BS 7671 Table 3A — typically 10 years for a domestic dwelling, 5 years for a rented
          property (or as required by the landlord electrical safety regulations). Within these
          intervals, it schedules interim checks where appropriate — for example, annual RCD testing
          by the householder, or five-yearly smoke and heat detector battery replacement.
        </p>
        <p>
          For commercial and industrial installations, the scheduling is more granular. Distribution
          boards may require annual thermographic surveys, quarterly RCD operation tests, and
          monthly visual inspections. Emergency lighting requires monthly functional tests and
          annual full-duration tests under{' '}
          <SEOInternalLink href="/tools/emergency-lighting-certificate">BS 5266</SEOInternalLink>.
          Fire alarm systems require weekly, monthly, quarterly, and annual tests under BS 5839. The
          AI collates all these requirements into a single maintenance calendar with clear task
          lists for each scheduled visit.
        </p>
        <SEOAppBridge
          title="Generate a maintenance schedule now"
          description="Describe the installation, and the AI produces a tailored maintenance schedule with specific tasks and intervals. Perfect for setting up new PPM contracts."
          icon={Calendar}
        />
      </>
    ),
  },
  {
    id: 'fault-prediction',
    heading: 'Fault Prediction Through Trend Analysis',
    content: (
      <>
        <p>
          The most valuable capability of the AI Maintenance Specialist is its ability to identify
          developing problems before they cause failures. It does this by analysing trends in
          historical test data — looking for gradual deterioration that might not be obvious from
          any single set of readings but becomes clear when viewed over time.
        </p>
        <p>
          Insulation resistance is a prime example. A circuit with an insulation resistance of 200
          megohms is well within the acceptable range (minimum 1 megohm for circuits up to 500V per
          BS 7671). But if that same circuit measured 500 megohms three years ago and 350 megohms
          last year, the downward trend suggests the insulation is deteriorating. The AI projects
          this trend forward and estimates when the insulation resistance will reach the minimum
          acceptable value, allowing you to schedule cable replacement before it becomes an
          emergency.
        </p>
        <p>
          Similar trend analysis applies to earth fault loop impedance values (which increase as
          connections deteriorate), RCD trip times (which lengthen as the device ages), and
          thermographic data (where rising temperatures at connections indicate increasing
          resistance). The AI flags any measurement that shows a deteriorating trend and recommends
          the appropriate investigation or remedial action.
        </p>
        <p>
          For commercial maintenance contracts, this predictive capability is particularly valuable.
          It allows you to present the client with evidence-based recommendations for planned
          investment in their installation, rather than waiting for failures to occur and dealing
          with the disruption and emergency call-out costs that follow. The{' '}
          <SEOInternalLink href="/tools/ai-report-writer">AI Report Writer</SEOInternalLink> can
          present these findings in a clear, non-technical format that building managers and
          facilities directors can understand.
        </p>
      </>
    ),
  },
  {
    id: 'condition-monitoring',
    heading: 'Condition Monitoring Guidance',
    content: (
      <>
        <p>
          Condition monitoring is the systematic measurement and recording of key parameters that
          indicate the health of electrical equipment. The AI Maintenance Specialist provides
          specific monitoring procedures for every type of equipment, ensuring that you measure the
          right things at the right intervals with the right instruments.
        </p>
        <p>
          For distribution boards, the monitoring procedures cover thermographic surveying
          (measuring connection temperatures under load to identify high-resistance joints),
          connection torque verification (checking that terminal connections remain at the correct
          tightness — they can loosen over time due to thermal cycling), protective device operation
          testing (verifying that MCBs and RCDs still trip within their specified parameters), and
          enclosure integrity checks (confirming that IP ratings, cable entry seals, and ventilation
          remain adequate).
        </p>
        <p>
          For cable installations, the monitoring covers insulation resistance measurement at
          regular intervals (to track deterioration over the cable's service life), visual
          inspection for physical damage or environmental degradation, and verification that cable
          supports and fixings remain secure. For equipment such as transformers, motors, and UPS
          systems, the AI provides manufacturer-specific monitoring procedures drawn from industry
          technical data.
        </p>
        <p>
          Each monitoring procedure includes four values: the nominal reading (what you would expect
          from new equipment), the acceptable range (readings that indicate satisfactory condition),
          the action threshold (the point at which further investigation or planned replacement
          should be scheduled), and the critical threshold (the point at which immediate remedial
          action is required). This structured approach removes the guesswork from interpreting
          condition monitoring data.
        </p>
      </>
    ),
  },
  {
    id: 'compliance-tracking',
    heading: 'Compliance Tracking and Record Keeping',
    content: (
      <>
        <p>
          Maintaining compliance with statutory testing requirements is a significant administrative
          burden for electricians managing maintenance contracts. The AI Maintenance Specialist
          automates this by tracking all applicable testing requirements and alerting you when tests
          are due.
        </p>
        <p>
          For each installation, the AI identifies the applicable statutory and regulatory
          requirements based on the property type and use. These include{' '}
          <SEOInternalLink href="/tools/eicr-certificate">periodic inspection</SEOInternalLink>{' '}
          intervals under BS 7671, emergency lighting testing under BS 5266, fire alarm testing
          under BS 5839, portable appliance testing requirements, lightning protection system
          inspection under BS EN 62305, and landlord electrical safety obligations under the
          Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020.
        </p>
        <p>
          The compliance calendar shows all upcoming test dates, colour-coded by urgency (green for
          tests due in the next quarter, amber for tests due in the next month, red for overdue
          tests). The AI sends automated reminders to ensure nothing is missed. For each scheduled
          test, it provides the scope of work, the applicable standard, and the documentation
          required.
        </p>
        <p>
          All maintenance records are stored securely and can be retrieved for audit purposes. This
          is particularly important for commercial clients who need to demonstrate compliance to
          insurers, health and safety inspectors, or certification bodies. The{' '}
          <SEOInternalLink href="/tools/ai-cost-engineer">AI Cost Engineer</SEOInternalLink> can
          produce cost estimates for any remedial work identified during maintenance visits,
          streamlining the process from identification to quotation to completion.
        </p>
        <SEOAppBridge
          title="Track compliance across all your sites"
          description="Set up your maintenance contracts in Elec-Mate and never miss a statutory test again. Automatic scheduling, reminders, and professional reporting for every site."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function AIMaintenanceSpecialistPage() {
  return (
    <ToolTemplate
      title="AI Maintenance Specialist | Electrical Systems"
      description="Plan and execute electrical maintenance programmes with AI tailored for UK installations. Intelligent scheduling, fault prediction, condition monitoring, and compliance tracking to BS 7671:2018+A3:2024."
      datePublished="2025-08-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="AI Maintenance Agent"
      badgeIcon={Brain}
      heroTitle={
        <>
          AI Maintenance Specialist:{' '}
          <span className="text-yellow-400">Predict Faults Before They Happen</span>
        </>
      }
      heroSubtitle="Generate tailored maintenance schedules, predict developing faults through trend analysis, and track compliance across all your installations — all aligned with BS 7671:2018+A3:2024 and UK statutory testing requirements."
      heroFeaturePills={[
        { icon: Calendar, label: 'Smart Scheduling' },
        { icon: TrendingUp, label: 'Fault Prediction' },
        { icon: Activity, label: 'Condition Monitoring' },
        { icon: ShieldCheck, label: 'Compliance Tracking' },
      ]}
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      features={features}
      featuresHeading="AI Maintenance Features"
      featuresSubheading="Purpose-built for UK electricians. Every feature helps you deliver professional, proactive maintenance services."
      howToSteps={howToSteps}
      howToHeading="How to Use the AI Maintenance Specialist"
      howToDescription="Five steps from installation assessment to professional maintenance reporting."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About AI Maintenance"
      relatedPages={relatedPages}
      ctaHeading="Deliver Proactive Maintenance with AI"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate's AI Maintenance Specialist. Intelligent scheduling, fault prediction, and compliance tracking. 7-day free trial, cancel anytime."
      toolPath="/tools/ai-maintenance-specialist"
    />
  );
}
