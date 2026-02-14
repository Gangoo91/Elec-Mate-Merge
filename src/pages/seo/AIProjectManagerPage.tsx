import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Brain,
  Zap,
  ClipboardCheck,
  FileText,
  ShieldCheck,
  ListChecks,
  Bot,
  Calendar,
  Users,
  Package,
  GanttChart,
  Clock,
  GraduationCap,
  Wrench,
  Search,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'AI Tools', href: '/tools/ai-electrician-tools' },
  { label: 'AI Project Manager', href: '/tools/ai-project-manager' },
];

const tocItems = [
  { id: 'what-is-project-manager', label: 'What Is AI Project Manager?' },
  { id: 'scheduling', label: 'Project Scheduling' },
  { id: 'resource-allocation', label: 'Resource Allocation' },
  { id: 'material-estimation', label: 'Material Estimation' },
  { id: 'timeline-management', label: 'Timeline Management' },
  { id: 'how-to', label: 'How to Use It' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Describe any electrical project in plain English and get a complete project plan with tasks, durations, dependencies, and milestones.',
  'Resource allocation tells you how many electricians are needed at each stage, what skill levels are required, and when specialist subcontractors need to be on site.',
  'Material estimation produces a complete bill of quantities with lead times, so you can order materials in advance and avoid project delays.',
  'Timeline management tracks progress against plan, identifies slippage early, and suggests recovery actions to keep the project on schedule.',
  'Built specifically for UK electrical projects — understands Building Regulations Part P notifications, DNO application timelines, and NICEIC sign-off requirements.',
];

const faqs = [
  {
    question: 'What kind of electrical projects can the AI manage?',
    answer:
      'The AI Project Manager handles electrical projects of all sizes, from domestic rewires and consumer unit upgrades through to commercial fit-outs and industrial installations. For domestic work, it plans the sequence of first fix, second fix, testing, and certification, accounting for coordination with other trades (plasterers, decorators, kitchen fitters). For commercial projects, it manages multi-phase installations with multiple teams, specialist subcontractor coordination, client milestone reporting, and regulatory compliance milestones. It also handles specific project types such as EV charger fleet installations, solar PV array installations, data centre builds, and new-build housing developments where multiple plots need sequential electrical installations.',
  },
  {
    question: 'How does the AI create project schedules?',
    answer:
      'You describe the project scope in plain English — for example, "complete rewire of a four-bedroom detached house, customer living in during the work, one electrician plus a mate available, all rooms need rewiring including the kitchen and bathrooms, adding EV charger to the garage." The AI breaks this down into individual tasks (survey, first fix room by room, consumer unit installation, second fix, testing, certification, snagging), assigns realistic durations based on benchmarks from thousands of completed UK electrical jobs, identifies task dependencies (second fix cannot start until plastering is complete in each room), and produces a project schedule with start and finish dates for each task. If you specify availability constraints (for example, no work on Wednesdays), the AI adjusts the schedule accordingly.',
  },
  {
    question: 'Does the AI handle material ordering and lead times?',
    answer:
      'Yes. The AI generates a complete bill of quantities for the project and identifies items with significant lead times. Standard materials like cable, accessories, and consumer units are typically available next day from wholesalers. But specialist items — such as specific distribution boards, specialist RCDs (Type B for EV chargers or PV), made-to-order switchgear, or particular colours and finishes of accessories — may have lead times of days to weeks. The AI flags these items and schedules them for early ordering so they arrive before they are needed on site. It also coordinates material deliveries with the project schedule, so materials arrive just in time rather than cluttering up the site or the customer house for weeks before they are needed.',
  },
  {
    question: 'Can the AI coordinate with other trades?',
    answer:
      'Yes. Electrical projects rarely happen in isolation — they must be coordinated with other trades on site. The AI Project Manager understands the typical construction sequence and identifies where electrical work interfaces with other trades. For a rewire, this means scheduling first fix cabling before the plasterer arrives, ensuring second fix does not clash with the decorator, and coordinating the kitchen and bathroom electrical work with the respective fitters. For a new-build, it schedules containment installation in the correct sequence with the building structure, cable installation after plastering but before decoration, and testing and commissioning before handover. You can add other trade milestones to the project and the AI adjusts the electrical schedule to fit.',
  },
  {
    question: 'Does the AI track project progress and identify delays?',
    answer:
      'Yes. As you complete tasks and mark them as finished in the app, the AI compares actual progress against the planned schedule. It identifies tasks that are behind schedule and calculates the impact on downstream tasks — if the first fix in the kitchen took a day longer than planned, the AI shows you how this affects the rest of the project and whether the overall completion date is at risk. When slippage is detected, the AI suggests recovery options: working additional hours, deploying an additional electrician, resequencing tasks to overlap non-dependent work, or discussing a revised completion date with the client. This real-time tracking gives you early warning of problems rather than discovering at the end that the project is overrunning.',
  },
  {
    question: 'Can I use this for quoting and proposals?',
    answer:
      'Yes. The project plan produced by the AI serves as the foundation for a professional project proposal. It shows the client the planned sequence of work, the key milestones, the duration, and the resource requirements. Combined with the material and labour costs from the AI Cost Engineer, you can produce a comprehensive proposal document that demonstrates your professionalism and gives the client confidence in your ability to deliver the project on time and on budget. The proposal can be exported as a branded PDF with your company details, or shared via a link that the client can view on any device.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/ai-cost-engineer',
    title: 'AI Cost Engineer',
    description:
      'Get accurate job cost estimates with itemised materials, labour rates, and regional pricing for UK electrical work.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/tools/ai-circuit-designer',
    title: 'AI Circuit Designer',
    description:
      'Design complete electrical circuits with automatic cable sizing, protection device selection, and voltage drop verification.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/tools/ai-commissioning-specialist',
    title: 'AI Commissioning Specialist',
    description:
      'Generate commissioning checklists and functional test guidance for the testing phase of your project.',
    icon: ClipboardCheck,
    category: 'Tool',
  },
  {
    href: '/tools/rams-generator',
    title: 'RAMS Generator',
    description:
      'Generate site-specific risk assessments and method statements for your project before work begins.',
    icon: ShieldCheck,
    category: 'Tool',
  },
  {
    href: '/tools/ai-report-writer',
    title: 'AI Report Writer',
    description:
      'Generate professional project reports, progress updates, and completion summaries for your clients.',
    icon: FileText,
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
];

const features = [
  {
    icon: GanttChart,
    title: 'Smart Project Scheduling',
    description:
      'Automatic task breakdown with realistic durations, dependencies, and milestones. Based on benchmarks from thousands of completed UK electrical projects.',
  },
  {
    icon: Users,
    title: 'Resource Allocation',
    description:
      'Know exactly how many electricians are needed at each stage, what skill levels are required, and when specialist subcontractors need to be on site.',
  },
  {
    icon: Package,
    title: 'Material Estimation',
    description:
      'Complete bill of quantities with lead time identification. Long-lead items flagged for early ordering so they arrive before they are needed.',
  },
  {
    icon: Clock,
    title: 'Progress Tracking',
    description:
      'Track actual progress against plan. Early warning of slippage with recovery suggestions to keep your project on schedule.',
  },
  {
    icon: Calendar,
    title: 'Trade Coordination',
    description:
      'Plan electrical work around other trades. First fix before plastering, second fix before decoration, testing before handover — all sequenced automatically.',
  },
  {
    icon: Bot,
    title: 'AI Planning Assistant',
    description:
      'Ask the AI about scheduling conflicts, resource constraints, or alternative approaches. Get immediate, project-specific answers.',
  },
];

const howToSteps = [
  {
    name: 'Describe the project scope',
    text: 'Enter a plain-English description of the project — the type of work, the property, the resources available, and any constraints such as working hours or access restrictions.',
  },
  {
    name: 'Review the project plan',
    text: 'The AI generates a complete project plan with tasks, durations, dependencies, milestones, and resource requirements. Review and adjust as needed.',
  },
  {
    name: 'Order materials on schedule',
    text: 'Use the generated bill of quantities and lead time information to order materials so they arrive just in time. Long-lead items are flagged for early ordering.',
  },
  {
    name: 'Track progress on site',
    text: 'Mark tasks as complete as you work through the project. The AI tracks actual progress against plan and alerts you to any slippage.',
  },
  {
    name: 'Report to the client',
    text: 'Generate professional progress reports showing completed work, upcoming milestones, and any issues. Share with the client as a PDF or via a link.',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-project-manager',
    heading: 'What Is the AI Project Manager for Electricians?',
    content: (
      <>
        <p>
          The AI Project Manager is one of eight specialist Elec-AI agents built into the Elec-Mate
          platform. It is designed to help electricians plan, schedule, and manage electrical
          projects of all sizes — from a two-day domestic rewire to a multi-week commercial
          installation requiring multiple teams and specialist subcontractors.
        </p>
        <p>
          Most electricians are excellent at the technical work but find project management
          challenging. Estimating how long tasks will take, coordinating with other trades, managing
          material deliveries, and keeping the client informed all require time and organisational
          skill that takes away from productive installation work. The AI Project Manager handles
          the planning and administration so you can focus on the electrical work itself.
        </p>
        <p>
          You describe the project in plain English — the same way you would explain it to another
          electrician — and the AI produces a complete project plan. This includes a task-by-task
          breakdown with realistic durations, resource requirements for each phase, a material list
          with ordering timelines, coordination milestones for other trades, and regulatory
          milestones such as{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P building control notifications
          </SEOInternalLink>{' '}
          and DNO applications where applicable.
        </p>
        <p>
          The AI Project Manager integrates with other Elec-Mate tools. The{' '}
          <SEOInternalLink href="/tools/ai-cost-engineer">AI Cost Engineer</SEOInternalLink> can
          price the project plan to produce an accurate quotation. The{' '}
          <SEOInternalLink href="/tools/ai-circuit-designer">Circuit Designer</SEOInternalLink> can
          feed circuit specifications into the material list. And the{' '}
          <SEOInternalLink href="/tools/rams-generator">RAMS Generator</SEOInternalLink> produces
          the health and safety documentation you need before starting work.
        </p>
      </>
    ),
  },
  {
    id: 'scheduling',
    heading: 'Project Scheduling for Electrical Work',
    content: (
      <>
        <p>
          The AI breaks down any electrical project into individual tasks, assigns realistic
          durations, identifies dependencies between tasks, and produces a schedule that shows when
          each task should start and finish. The task durations are based on labour timing
          benchmarks from thousands of completed UK electrical projects, adjusted for the specific
          complexity and conditions of your project.
        </p>
        <p>
          For a domestic rewire, the AI typically generates tasks including: initial survey and
          planning, consumer unit position preparation, first fix cabling (broken down room by room
          to allow progressive completion for occupied properties), containment installation where
          required, consumer unit installation and wiring, coordination break for plastering, second
          fix accessories (again room by room), testing and commissioning, snagging and defects
          correction, certification and paperwork, and client handover. Each task has a duration, a
          predecessor (the task that must be completed before this one can start), and a resource
          requirement (how many electricians are needed).
        </p>
        <p>
          For commercial projects, the scheduling is more complex. The AI handles multi-team
          coordination (separate teams for containment installation, cable pulling, and
          termination), specialist subcontractor scheduling (fire alarm, data cabling, BMS, access
          control), phased handover (completing sections of the building while work continues in
          others), and commissioning sequences that may span multiple days or weeks.
        </p>
        <SEOAppBridge
          title="Plan your next project in minutes"
          description="Describe the project scope, and the AI produces a complete schedule with tasks, durations, dependencies, and milestones. No project management experience needed."
          icon={GanttChart}
        />
      </>
    ),
  },
  {
    id: 'resource-allocation',
    heading: 'Resource Allocation and Team Planning',
    content: (
      <>
        <p>
          The AI Project Manager tells you exactly what resources you need at each stage of the
          project. This includes the number of electricians required, the skill levels needed (an
          approved electrician for testing and certification, an electrician's mate for cable
          pulling and containment), and when specialist subcontractors need to be on site.
        </p>
        <p>
          For a solo electrician with a mate, the AI optimises the schedule around two-person
          availability. Tasks that require two people (lifting heavy distribution boards, pulling
          long cable runs, working at height) are grouped together. Tasks that can be done by one
          person (termination, labelling, paperwork) are scheduled for times when the mate is not
          available or can be working on preparation tasks elsewhere.
        </p>
        <p>
          For larger contractors, the AI handles multi-team scheduling across concurrent projects.
          If you have four electricians and three current projects, the AI allocates resources
          across all projects to meet all deadlines, flagging conflicts where two projects need the
          same person at the same time. It also identifies the critical resource constraints — the
          tasks that can only be done by a specific person (for example, only the approved
          electrician can sign off the{' '}
          <SEOInternalLink href="/tools/eicr-certificate">certification</SEOInternalLink>) — and
          schedules these to avoid bottlenecks.
        </p>
        <p>
          The AI also considers skill requirements for specialist work. EV charger installations may
          require an installer with the{' '}
          <SEOInternalLink href="/training/ev-charger-installation">
            EV charger training qualification
          </SEOInternalLink>
          . Solar PV work requires MCS-qualified personnel. The AI flags these requirements in the
          resource plan so you can ensure the right people are available when needed.
        </p>
      </>
    ),
  },
  {
    id: 'material-estimation',
    heading: 'Material Estimation and Ordering',
    content: (
      <>
        <p>
          The AI generates a complete bill of quantities for the project, broken down by work phase
          so you know what materials are needed at each stage. This is not a generic list — it is
          specific to the circuits you are installing, the cable routes you are using, and the
          accessories and equipment specified in the design.
        </p>
        <p>
          Each item in the bill of quantities includes the product description, the quantity
          required (with appropriate waste allowances — typically 10 to 15 per cent for cable,
          depending on the complexity of the routing), and the estimated lead time from major UK
          wholesalers. The AI identifies items with long lead times — specialist distribution
          boards, made-to-order switchgear, particular finishes of accessories, Type B RCDs for EV
          charger installations — and flags them for early ordering.
        </p>
        <p>
          The material schedule is coordinated with the project timeline. Rather than ordering
          everything at the start of the project (which ties up cash and creates storage problems on
          site), the AI schedules material deliveries to arrive shortly before they are needed.
          First fix materials (cable, containment, back boxes) arrive at the start. The consumer
          unit and protective devices arrive before the wiring-up phase. Second fix accessories
          arrive before second fix begins.
        </p>
        <p>
          The material list integrates with the{' '}
          <SEOInternalLink href="/tools/ai-cost-engineer">AI Cost Engineer</SEOInternalLink> to
          produce accurate cost projections. And as prices change or you find better deals from
          alternative suppliers, you can update the costs and the AI recalculates the project budget
          automatically.
        </p>
      </>
    ),
  },
  {
    id: 'timeline-management',
    heading: 'Timeline Management and Progress Tracking',
    content: (
      <>
        <p>
          Once the project is underway, the AI tracks your actual progress against the planned
          schedule. As you complete tasks and mark them as finished, the AI updates the project
          timeline and recalculates the expected completion date. If you are ahead of schedule, it
          shows the potential for early completion. If you are behind, it identifies the impact on
          downstream tasks and the overall project deadline.
        </p>
        <p>
          When delays occur — and they always do, whether due to additional work discovered on site,
          material delivery problems, coordination issues with other trades, or simply tasks that
          take longer than expected — the AI suggests recovery options. These might include:
          resequencing tasks to work on non-critical items while waiting for a critical path
          dependency to clear, deploying additional resource for a specific phase, extending working
          hours for a limited period, or negotiating a revised completion date with the client.
        </p>
        <p>
          The AI also generates progress reports for clients. These show the work completed to date,
          the current status of the project against the planned timeline, any issues or variations
          that have arisen, upcoming milestones, and the expected completion date. These reports are
          professional, branded with your company details, and can be shared as a PDF or via a link.
          Regular client reporting builds trust and reduces the "when will it be done?" phone calls
          that interrupt productive work on site.
        </p>
        <p>
          For projects that require Building Regulations Part P notification, the AI tracks the
          notification timeline and reminds you when notifications need to be submitted. Similarly,
          for projects requiring DNO applications (new supplies, supply upgrades, generation
          connections under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">G98/G99</SEOInternalLink>
          ), the AI includes the application timeline in the project schedule so you do not discover
          at the end that you should have applied for the connection months ago.
        </p>
        <SEOAppBridge
          title="Track every project from start to finish"
          description="Real-time progress tracking against plan, early warning of delays, and professional client reporting. Keep every project on time and on budget."
          icon={Clock}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function AIProjectManagerPage() {
  return (
    <ToolTemplate
      title="AI Project Manager for Electricians | Planning Tool"
      description="Plan and manage electrical projects with AI tailored for UK work. Smart scheduling, resource allocation, material estimation, and timeline tracking. Part of 8 specialist Elec-AI agents."
      datePublished="2025-08-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="AI Project Agent"
      badgeIcon={Brain}
      heroTitle={
        <>
          AI Project Manager:{' '}
          <span className="text-yellow-400">Plan, Schedule, and Deliver On Time</span>
        </>
      }
      heroSubtitle="Describe any electrical project in plain English and get a complete project plan with task breakdowns, resource allocation, material lists with lead times, and progress tracking — all built specifically for UK electrical contractors."
      heroFeaturePills={[
        { icon: GanttChart, label: 'Smart Scheduling' },
        { icon: Users, label: 'Resource Planning' },
        { icon: Package, label: 'Material Lists' },
        { icon: Clock, label: 'Progress Tracking' },
      ]}
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      features={features}
      featuresHeading="AI Project Management Features"
      featuresSubheading="Purpose-built for UK electricians. Every feature helps you deliver projects on time, on budget, and to specification."
      howToSteps={howToSteps}
      howToHeading="How to Use the AI Project Manager"
      howToDescription="Five steps from project description to delivery and client handover."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About AI Project Management"
      relatedPages={relatedPages}
      ctaHeading="Deliver Every Project On Time"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate's AI Project Manager. Smart scheduling, resource planning, and progress tracking. 7-day free trial, cancel anytime."
      toolPath="/tools/ai-project-manager"
    />
  );
}
