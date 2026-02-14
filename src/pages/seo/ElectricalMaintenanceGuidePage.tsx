import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Wrench,
  Calendar,
  ClipboardCheck,
  ShieldCheck,
  Clock,
  FileCheck2,
  AlertTriangle,
  Building,
  GraduationCap,
  Calculator,
  Settings,
  CheckCircle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Electrical Maintenance', href: '/guides/electrical-maintenance-guide' },
];

const tocItems = [
  { id: 'what-is-maintenance', label: 'What Is Electrical Maintenance?' },
  { id: 'ppm-vs-reactive', label: 'PPM vs Reactive Maintenance' },
  { id: 'maintenance-schedule', label: 'Maintenance Schedules' },
  { id: 'testing-intervals', label: 'Testing Intervals' },
  { id: 'documentation', label: 'Documentation Requirements' },
  { id: 'compliance', label: 'Compliance and Legal Duties' },
  { id: 'common-tasks', label: 'Common Maintenance Tasks' },
  { id: 'winning-contracts', label: 'Winning Maintenance Contracts' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Planned Preventive Maintenance (PPM) reduces breakdowns, extends equipment life, and demonstrates compliance with the Electricity at Work Regulations 1989.',
  'BS 7671 and GN3 (Guidance Note 3) recommend specific testing intervals depending on the installation type — typically 1 year for commercial, 5 years for domestic, and up to 3 months for construction sites.',
  'Proper documentation of all maintenance activities — including test results, remedial actions, and dates — is essential for compliance and provides legal protection in the event of an incident.',
  'Reactive (breakdown) maintenance costs 3 to 5 times more than planned maintenance when you include emergency call-out charges, downtime, and expedited parts.',
  'Elec-Mate helps electricians manage maintenance contracts with digital certificates, job scheduling, and professional reporting — all from your phone.',
];

const faqs = [
  {
    question: 'What is the difference between PPM and reactive maintenance?',
    answer:
      'Planned Preventive Maintenance (PPM) is scheduled maintenance carried out at regular intervals to prevent failures before they occur. It includes routine inspections, testing, cleaning, and component replacement based on manufacturer recommendations and regulatory requirements. Reactive maintenance — also called breakdown or corrective maintenance — is unplanned work carried out in response to a failure or fault. PPM is proactive: you replace the contactor before it fails. Reactive is responsive: you replace the contactor after it has failed and the production line has stopped. Most effective maintenance programmes combine both: PPM to minimise failures, with reactive capability to handle the unexpected.',
  },
  {
    question: 'How often should electrical installations be inspected?',
    answer:
      'BS 7671 Table 3A of GN3 (Guidance Note 3: Inspection and Testing) recommends maximum intervals between periodic inspections depending on the installation type. Domestic properties: every 5 years (or on change of occupancy). Commercial properties: every 5 years (or as recommended by the previous inspector). Industrial installations: every 3 years. Places of public entertainment, theatres, and cinemas: annually. Construction site installations: every 3 months. Agricultural and horticultural premises: every 3 years. Caravan parks: annually. Swimming pools: annually. These are maximum recommended intervals — the inspector may recommend shorter intervals based on the condition of the installation, its age, and the environment.',
  },
  {
    question: 'What does the Electricity at Work Regulations 1989 require?',
    answer:
      'The Electricity at Work Regulations 1989 (EAWR) impose duties on employers, employees, and self-employed persons to prevent danger from electrical systems. Regulation 4(2) is the key maintenance regulation: "As may be necessary to prevent danger, all systems shall be maintained so as to prevent, so far as is reasonably practicable, such danger." This means electrical installations must be maintained in a safe condition. The EAWR do not specify exact intervals or methods — that is left to guidance documents like BS 7671, GN3, and the HSE publication HSR25. However, failure to maintain electrical systems that results in injury can lead to prosecution under the EAWR, with unlimited fines and up to 2 years imprisonment.',
  },
  {
    question: 'What documentation should be kept for electrical maintenance?',
    answer:
      'You should maintain a comprehensive record of all electrical maintenance activities. This includes: EICR reports (periodic inspection), EIC and Minor Works certificates for any new or modified circuits, test results from scheduled testing, maintenance log entries for each visit (date, work done, next scheduled date), remedial action records (defects found, action taken, date completed), equipment manuals and manufacturer maintenance schedules, risk assessments and method statements for the maintenance work itself, and a register of all fixed electrical equipment. These records should be kept for the life of the installation and be readily available for inspection by the HSE, local authority, or building owner. Digital record-keeping is accepted and preferred — it is easier to search, share, and back up.',
  },
  {
    question: 'Can I carry out electrical maintenance myself as a building owner?',
    answer:
      'Some basic maintenance tasks — such as visual inspections, replacing lamps, and checking for visible damage — can be carried out by a competent person who is not necessarily a qualified electrician. However, any work that involves testing, opening distribution boards, working on fixed wiring, or modifying circuits must be carried out by a qualified electrician. Under the Electricity at Work Regulations 1989, anyone carrying out electrical work must be competent to do so. If you are not a qualified electrician, you should appoint one to carry out periodic inspections, testing, and any remedial or repair work. For commercial and industrial premises, it is standard practice to have a maintenance contract with an electrical contractor.',
  },
  {
    question: 'How does Elec-Mate help with maintenance contracts?',
    answer:
      'Elec-Mate provides tools that make managing electrical maintenance work more efficient. You can complete EICR, EIC, and Minor Works certificates digitally on site, with AI-powered features like board scanning and voice test entry. The app generates professional PDF reports that you can send to building owners or facilities managers by email or WhatsApp directly from your phone. For electricians managing multiple maintenance contracts, this means less desk time, faster turnaround on reports, and a professional image that helps retain clients. The quoting and invoicing features also help price maintenance work accurately and get paid faster.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone. AI board scanner, voice test entry, and professional PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/hse-inspections-electrical',
    title: 'HSE Inspections for Electricians',
    description:
      'What HSE inspectors look for and how to prepare for an electrical safety inspection.',
    icon: ShieldCheck,
    category: 'Safety',
  },
  {
    href: '/guides/rams-template-electricians',
    title: 'RAMS Template for Electricians',
    description: 'Risk assessment and method statement guidance for electrical maintenance work.',
    icon: ClipboardCheck,
    category: 'Safety',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence Guide',
    description: 'The correct order of tests for periodic inspection under BS 7671.',
    icon: Calculator,
    category: 'Guide',
  },
  {
    href: '/guides/school-electrical-inspection',
    title: 'School Electrical Inspection',
    description: 'EICR, emergency lighting, fire alarm, and PAT testing requirements for schools.',
    icon: Building,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description: 'Study for C&G 2391 with structured training courses on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-maintenance',
    heading: 'What Is Electrical Maintenance?',
    content: (
      <>
        <p>
          Electrical maintenance is the ongoing process of inspecting, testing, servicing, and
          repairing the fixed electrical installation and associated equipment in a building to
          ensure it remains safe and functional. It covers everything from the incoming supply and
          distribution boards to the final circuits, accessories, and fixed equipment.
        </p>
        <p>
          Under the{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            IET Wiring Regulations (BS 7671)
          </SEOInternalLink>
          , every electrical installation must be maintained to prevent danger. The Electricity at
          Work Regulations 1989 reinforce this as a legal duty on employers and duty holders. For
          commercial and industrial premises, electrical maintenance is not optional — it is a
          fundamental part of the building's safety management.
        </p>
        <p>
          Effective maintenance combines regular inspections, periodic testing, scheduled component
          replacement, and responsive repair when things go wrong. The goal is to prevent electrical
          faults from causing fires, electric shock, or equipment damage — and to demonstrate
          compliance with legal requirements.
        </p>
      </>
    ),
  },
  {
    id: 'ppm-vs-reactive',
    heading: 'PPM vs Reactive Maintenance: Getting the Balance Right',
    content: (
      <>
        <p>
          Every maintenance programme falls somewhere on a spectrum between fully planned (PPM) and
          fully reactive (fix it when it breaks). The most effective approach combines both, with a
          heavy emphasis on planned work.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              Planned Preventive Maintenance (PPM)
            </h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Scheduled at regular intervals</li>
              <li>Prevents failures before they occur</li>
              <li>Extends equipment lifespan</li>
              <li>Predictable costs and budgeting</li>
              <li>Demonstrates regulatory compliance</li>
              <li>Reduces emergency call-outs</li>
              <li>Lower total cost over the installation life</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Reactive (Breakdown) Maintenance</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Unplanned — happens when something fails</li>
              <li>Emergency call-out charges apply</li>
              <li>Downtime while waiting for repair</li>
              <li>Expedited parts cost more</li>
              <li>No compliance evidence until a problem occurs</li>
              <li>Risk of cascading failures</li>
              <li>3 to 5 times more expensive overall</li>
            </ul>
          </div>
        </div>
        <p>
          The industry benchmark is an 80/20 split: 80% planned, 20% reactive. In practice, many
          buildings operate closer to 50/50 — and some rely almost entirely on reactive maintenance,
          which is both more expensive and less safe. As an electrician, helping your clients
          understand the cost benefit of PPM is part of the value you provide.
        </p>
      </>
    ),
  },
  {
    id: 'maintenance-schedule',
    heading: 'Building a Maintenance Schedule',
    content: (
      <>
        <p>
          A good electrical maintenance schedule is based on the type of installation, the
          environment, the age and condition of the equipment, and the manufacturer's
          recommendations. Here is a practical framework.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monthly:</strong> Visual inspections of distribution boards (signs of
                overheating, loose connections, tripped devices), check emergency lighting
                operation, test fire alarm systems, inspect external lighting and signage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Quarterly:</strong> Full functional test of emergency lighting (3-hour
                duration test annually, brief functional test quarterly), RCD test button operation,
                thermographic survey of main distribution equipment in high-load environments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Six-monthly:</strong> PAT testing of portable appliances in high-risk
                environments (construction, workshops), check and clean ventilation on electrical
                equipment, inspect cable containment for damage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annually:</strong> Full emergency lighting duration test and certificate,
                fire alarm system maintenance and certificate, PAT testing for office equipment,
                review of maintenance records and schedule.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Every 3 to 5 years:</strong> Full periodic inspection and testing (
                <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink>) of the fixed
                installation, as recommended by GN3 Table 3A.
              </span>
            </li>
          </ul>
        </div>
        <p>
          This schedule should be tailored to each building. A modern office with new wiring needs
          less frequent attention than an ageing industrial unit with 30-year-old distribution
          equipment. The initial EICR is the best starting point — it tells you the condition of the
          installation and where to focus your maintenance effort.
        </p>
      </>
    ),
  },
  {
    id: 'testing-intervals',
    heading: 'Testing Intervals: What BS 7671 and GN3 Recommend',
    content: (
      <>
        <p>
          The recommended maximum intervals between periodic inspections are set out in Table 3A of
          GN3 (Guidance Note 3: Inspection and Testing, published by the IET). These are not legally
          mandated intervals, but they represent best practice and are the standard used by
          competent person schemes, insurers, and the HSE.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic premises:</strong> Every 10 years (or on change of occupancy). For
                rented properties, every 5 years under the 2020 Regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial offices and shops:</strong> Every 5 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Industrial installations:</strong> Every 3 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Educational establishments (schools, colleges):</strong> Every 5 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hospitals and medical locations:</strong> Every 5 years (with more frequent
                testing of critical circuits).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Places of public entertainment:</strong> Annually.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Construction site installations:</strong> Every 3 months.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The previous inspector's recommendation takes precedence over the general guidance. If the
          EICR recommends a 3-year interval for a commercial property due to the condition of the
          installation, that shorter interval should be followed.
        </p>
        <SEOAppBridge
          title="Complete EICR certificates on site"
          description="Elec-Mate lets you complete the full EICR digitally — board scan, test results, observations, and professional PDF export. Send the report to the building owner before you leave. No desk time, no paperwork backlog."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'documentation',
    heading: 'Documentation Requirements',
    content: (
      <>
        <p>
          Good documentation is the backbone of any maintenance programme. It demonstrates
          compliance, provides an audit trail, and protects you and your client in the event of an
          incident or HSE investigation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR reports</strong> — the periodic inspection record for the fixed
                installation. Must be completed to the BS 7671 model form and signed by a qualified
                inspector.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC and Minor Works certificates</strong> — issued for any new work,
                alterations, or additions to the installation during maintenance visits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maintenance log</strong> — a chronological record of every maintenance
                visit, including the date, work carried out, findings, and the name of the
                electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting test records</strong> — monthly functional tests and
                annual duration tests, with results recorded and any failures actioned.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm maintenance records</strong> — quarterly servicing and annual
                maintenance certificates as required by BS 5839-1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>PAT testing records</strong> — register of portable appliances, test
                results, and pass/fail status.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Digital records are not only acceptable — they are preferable. They are easier to search,
          share, and back up than paper records. When an HSE inspector asks to see your maintenance
          history, being able to pull up a complete digital record on your phone is far more
          impressive than rummaging through a filing cabinet.
        </p>
      </>
    ),
  },
  {
    id: 'compliance',
    heading: 'Compliance and Legal Duties',
    content: (
      <>
        <p>
          The legal framework for electrical maintenance in the UK is built on several overlapping
          pieces of legislation. Understanding these helps you advise clients and protects both you
          and them.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity at Work Regulations 1989</strong> — the primary legislation.
                Regulation 4(2) requires that electrical systems are maintained to prevent danger.
                Applies to all workplaces.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and Safety at Work Act 1974</strong> — the overarching duty on
                employers to ensure the health and safety of employees and others who may be
                affected. Electrical maintenance is part of this general duty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 (IET Wiring Regulations)</strong> — the technical standard for
                electrical installations. Chapter 62 covers periodic inspection and testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  Electrical Safety Standards in the Private Rented Sector (England) Regulations
                  2020
                </strong>{' '}
                — requires{' '}
                <SEOInternalLink href="/guides/eicr-for-landlords">
                  EICRs for landlords
                </SEOInternalLink>{' '}
                at least every 5 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulatory Reform (Fire Safety) Order 2005</strong> — the responsible person
                must maintain electrical systems as part of fire risk management, including
                emergency lighting and fire alarm systems.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Non-compliance can result in HSE enforcement action (improvement notices, prohibition
          notices, prosecution), civil liability if someone is injured, and insurance claims being
          denied. Proper maintenance and documentation are your best defence.
        </p>
      </>
    ),
  },
  {
    id: 'common-tasks',
    heading: 'Common Electrical Maintenance Tasks',
    content: (
      <>
        <p>
          Day-to-day electrical maintenance covers a wide range of tasks. Here are the most common
          activities that form the core of a typical maintenance contract.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribution board inspection</strong> — check for signs of overheating,
                verify connections are tight, confirm labelling is accurate, check RCD operation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermographic survey</strong> — use thermal imaging to identify hot spots on
                connections, busbars, and cables that indicate loose connections or overloading.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting testing</strong> — monthly functional tests (brief
                operation on battery) and annual 3-hour duration tests as required by BS 5266-1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm servicing</strong> — quarterly inspections and testing as
                required by BS 5839-1, including detector cleaning, battery checks, and zone
                testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lamp and fitting replacement</strong> — replacing failed lamps, repairing
                damaged fittings, upgrading to LED where practical.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing and bonding checks</strong> — visual inspection and testing of main
                and supplementary bonding, earth continuity, and electrode condition.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Each of these tasks should be recorded in the maintenance log with the date, findings,
          action taken, and the name of the person carrying out the work. This creates the
          compliance audit trail that the building owner needs.
        </p>
      </>
    ),
  },
  {
    id: 'winning-contracts',
    heading: 'Winning and Retaining Maintenance Contracts',
    content: (
      <>
        <p>
          Maintenance contracts are the most valuable type of work for an electrical contractor.
          They provide recurring income, predictable scheduling, and a built-in pipeline of remedial
          and upgrade work. Here is how to win and keep them.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional reporting.</strong> Building owners and facilities managers
                judge your competence by the quality of your reports. A well-structured EICR, clear
                maintenance logs, and professional PDF certificates create confidence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Clear pricing.</strong> Quote a fixed annual price for PPM visits with
                clearly defined scope. Price reactive call-outs separately with transparent hourly
                rates and materials mark-up. Avoid vague "all-inclusive" contracts that erode your
                margin.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Proactive communication.</strong> Send reminders before scheduled visits,
                provide summary reports after each visit, and flag upcoming requirements (EICR due,
                emergency lighting test needed) before the client has to ask.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Compliance expertise.</strong> Building owners want an electrician who
                understands the regulatory landscape and keeps them compliant. Knowing the relevant
                regulations and being able to explain them clearly is a competitive advantage.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Impress clients with professional digital reports"
          description="Elec-Mate generates professional PDF certificates and reports that you can send to building owners and facilities managers instantly. Board scan, test results, observations, and a polished layout that builds client confidence."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalMaintenanceGuidePage() {
  return (
    <GuideTemplate
      title="Electrical Maintenance Guide | Planned & Reactive UK"
      description="Complete guide to electrical maintenance in the UK. PPM vs reactive maintenance, testing intervals from BS 7671 and GN3, documentation requirements, compliance with Electricity at Work Regulations 1989, and how to win maintenance contracts."
      datePublished="2025-04-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Maintenance Guide"
      badgeIcon={Wrench}
      heroTitle={
        <>
          Electrical Maintenance:{' '}
          <span className="text-yellow-400">Planned, Reactive, and Everything Between</span>
        </>
      }
      heroSubtitle="Effective electrical maintenance prevents failures, demonstrates compliance, and saves money. This guide covers PPM vs reactive approaches, BS 7671 testing intervals, documentation requirements, and how to build a profitable maintenance business."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Maintenance"
      relatedPages={relatedPages}
      ctaHeading="Manage Maintenance Work From Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for digital certificates, professional reporting, and efficient job management. 7-day free trial, cancel anytime."
    />
  );
}
