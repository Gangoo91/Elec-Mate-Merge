import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ClipboardCheck,
  PoundSterling,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  ShieldCheck,
  Zap,
  Calendar,
  Flame,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Commercial Electrical', href: '/electrical-design-guide' },
  { label: 'Electrical Maintenance Contracts', href: '/electrical-maintenance-contract' },
];

const tocItems = [
  { id: 'types', label: 'PPM vs Reactive Maintenance' },
  { id: 'ppm-schedule', label: 'PPM Schedule: What Needs Testing and When' },
  { id: 'fixed-wire-testing', label: 'Fixed Wire Testing (EICR)' },
  { id: 'pat-testing', label: 'Portable Appliance Testing (PAT)' },
  { id: 'emergency-lighting', label: 'Emergency Lighting Tests (BS 5266)' },
  { id: 'fire-alarm', label: 'Fire Alarm Tests (BS 5839)' },
  { id: 'contract-content', label: 'What to Include in a Contract' },
  { id: 'pricing', label: 'Pricing (£500–£5,000/Year)' },
  { id: 'for-electricians', label: 'For Electricians: Managing Maintenance Contracts' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Electrical maintenance contracts for commercial properties fall into two categories: planned preventative maintenance (PPM), which follows a schedule to prevent failures, and reactive maintenance, which responds to faults as they occur. Most contracts combine both.',
  'A comprehensive PPM schedule for a commercial property includes fixed wire testing (EICR), portable appliance testing (PAT), emergency lighting tests (monthly, 6-monthly, and annual as required by BS 5266), and fire alarm tests (weekly call point test, monthly functional test, 6-monthly and annual tests as required by BS 5839).',
  'EICRs for commercial premises should be conducted every five years for most occupancies, though some higher-risk environments require more frequent inspection. BS 7671 recommends the frequency based on installation type and usage.',
  'Annual maintenance contract pricing for commercial properties typically ranges from £500 to £1,500 per year for small offices and retail units, £1,500 to £3,500 for medium commercial buildings, and £3,500 to £5,000+ for larger premises with complex electrical systems, emergency lighting, and fire alarm infrastructure.',
  'A well-written electrical maintenance contract protects both the contractor and the client. It should define the scope of work, frequency of visits, response times for reactive callouts, documentation and certification requirements, price adjustment mechanisms, and termination terms.',
];

const faqs = [
  {
    question: 'What is the difference between PPM and reactive electrical maintenance?',
    answer:
      'Planned preventative maintenance (PPM) involves scheduled visits to inspect, test, and service electrical systems before faults develop. It reduces the risk of unexpected failures, extends equipment life, and maintains legal compliance. Reactive maintenance addresses faults as they occur — responding to reported issues, circuit failures, equipment breakdowns, and emergencies. Most commercial electrical maintenance contracts combine a PPM element (regular scheduled visits and testing) with a reactive element (emergency callout provision). PPM-only contracts without any reactive provision leave the client exposed during unexpected failures.',
  },
  {
    question: 'How often should a commercial EICR be carried out?',
    answer:
      'The frequency of EICRs for commercial premises depends on the type of installation and occupancy. As a general guide: offices and retail — every five years; industrial premises — every three years; educational premises — every five years; places of public entertainment — every three years; residential accommodation managed by a landlord — every five years (legally required for rented residential property). BS 7671 does not prescribe fixed frequencies but recommends frequencies based on installation type in its inspection and testing sections. The previous EICR and its findings should inform the recommended interval for the next inspection.',
  },
  {
    question: 'Is PAT testing a legal requirement for commercial premises?',
    answer:
      'Portable Appliance Testing (PAT) is not mandated by a specific law requiring testing at defined intervals. The legal requirement comes from the Health and Safety at Work Act 1974 and the Electricity at Work Regulations 1989, which require employers to maintain electrical equipment in a safe condition. PAT testing is one way of demonstrating that this duty is being met, but it is not the only way. The frequency of PAT testing depends on the type of equipment, the environment in which it is used, and the results of previous tests. High-risk environments (construction sites, catering kitchens) require more frequent testing than low-risk office environments.',
  },
  {
    question: 'What emergency lighting tests are required by BS 5266?',
    answer:
      'BS 5266-1 (the UK code of practice for emergency lighting) specifies a hierarchy of tests. Monthly: a brief functional test of each emergency luminaire and exit sign — press and hold the test key for the duration specified by the manufacturer (typically 30 seconds to 1 minute) and confirm all luminaires illuminate. Six-monthly: a one-hour discharge test to verify that luminaires maintain output for one hour on battery. Annual: a three-hour full rated duration test (or the full rated duration specified for the luminaire) to verify the battery can sustain the luminaire for its full rated duration. All test results must be recorded in a log book and kept for inspection.',
  },
  {
    question: 'What fire alarm tests are required by BS 5839?',
    answer:
      'BS 5839-1 (the UK standard for fire detection and alarm systems in buildings) specifies: weekly — a test of each manual call point in rotation (not all at once) to verify the alarm signal is generated; monthly — a full test of the system including all detectors tested in rotation, battery check, and panel inspection; six-monthly — a formal inspection by a competent person covering all detectors, call points, sounders, control panel, and standby power supply; annual — a comprehensive inspection and test by a specialist firm, including detector sensitivity testing. Records of all tests must be maintained.',
  },
  {
    question: 'What should be included in an electrical maintenance contract?',
    answer:
      'A comprehensive electrical maintenance contract should include: scope of works (which systems are covered and which are excluded), scheduled visit frequency and what is done on each visit, documentation requirements (test results, certificates, defect reports), reactive callout provision (response times, hourly rates for callouts, emergency rates), materials provision (who supplies materials and at what cost), price adjustment mechanism (annual RPI increase, etc.), termination provisions, and liability limitations. Contracts should also specify which BS/IEC standards the work will be conducted to, including BS 7671 for fixed electrical installations, BS 5266 for emergency lighting, and BS 5839 for fire alarm systems.',
  },
  {
    question:
      'Can one electrical contractor manage all compliance testing for a commercial building?',
    answer:
      'Yes — a competent electrical contractor registered with NICEIC or NAPIT can carry out fixed wire testing (EICR), portable appliance testing (PAT), and emergency lighting testing under a single contract. Fire alarm testing requires a specialist fire alarm company registered with the National Security Inspectorate (NSI) or BAFE for Category I systems. For smaller fire alarm systems (Category M, manual only), a competent electrical contractor may carry out testing, but for automatic detection systems (Category L or P), a specialist is strongly recommended. Combining all compliance testing under one contractor simplifies administration and provides a single point of contact for the client.',
  },
  {
    question: 'How much does an electrical maintenance contract cost per year?',
    answer:
      'Annual maintenance contract costs vary significantly depending on the property size, the systems covered, and the frequency of visits. Indicative 2026 pricing: small office or retail unit (up to 500m²) — £500 to £1,500/year; medium commercial building (500m² to 2,000m²) — £1,500 to £3,500/year; large commercial premises (2,000m²+) with emergency lighting, fire alarm, and complex distribution — £3,500 to £5,000+ per year. These figures typically cover the PPM element — reactive callouts are usually charged additionally at the agreed callout rate.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/emergency-lighting-cost',
    title: 'Emergency Lighting Installation Cost',
    description:
      'Costs for emergency lighting installation, testing, and certification in commercial premises.',
    icon: Zap,
    category: 'Cost Guide',
  },
  {
    href: '/electrician-hourly-rate',
    title: 'Electrician Hourly Rate Guide 2026',
    description:
      'Regional rates, callout charges, emergency premiums, and how to price electrical jobs.',
    icon: PoundSterling,
    category: 'Business Guide',
  },
  {
    href: '/electrical-contractor-insurance',
    title: 'Electrical Contractor Insurance',
    description:
      "Public liability, employer's liability, professional indemnity, and tool insurance for contractors.",
    icon: ShieldCheck,
    category: 'Business Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'types',
    heading: 'Planned Preventative Maintenance vs Reactive Maintenance',
    content: (
      <>
        <p>
          Electrical maintenance for commercial properties falls into two categories: planned
          preventative maintenance (PPM) and reactive maintenance. Understanding the difference is
          essential for designing a maintenance contract that meets the client&apos;s operational
          needs and legal obligations.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Planned preventative maintenance (PPM)</strong> — scheduled visits at fixed
                intervals to inspect, test, and service electrical systems before faults develop.
                Includes fixed wire testing (EICR), portable appliance testing (PAT), emergency
                lighting tests, fire alarm tests, and general inspection of switchgear, distribution
                boards, and earthing. PPM reduces unplanned downtime and maintains legal compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reactive maintenance</strong> — responding to reported faults, circuit
                failures, equipment failures, and electrical emergencies. Reactive works cannot
                always be predicted or prevented by PPM alone. A maintenance contract should define
                the response times for different levels of urgency: emergency (e.g., loss of power
                to critical systems — 2-hour response), urgent (e.g., circuit failure — next working
                day), and routine (e.g., a faulty socket — within 5 working days).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Combined contracts</strong> — most commercial clients benefit from a
                contract that includes both PPM and reactive provision. PPM is typically priced as a
                fixed annual fee; reactive callouts are charged at an agreed labour rate (typically
                the contractor&apos;s standard or discounted rate for contract clients) plus
                materials.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ppm-schedule',
    heading: 'PPM Schedule: What Needs Testing and When',
    content: (
      <>
        <p>
          A comprehensive PPM schedule for a typical commercial property includes multiple types of
          inspection and testing, each with its own frequency. The following schedule reflects best
          practice for a medium-sized commercial building.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Weekly</strong> — fire alarm call point test (rotate through call points one
                per week); visual check of emergency exit signs and luminaires. These are typically
                carried out by the building&apos;s own staff, not the maintenance contractor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monthly</strong> — emergency lighting functional test (brief duration, all
                luminaires); fire alarm monthly test and inspection; visual inspection of
                distribution boards (door seals, cable entry, labelling, no evidence of
                overheating).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Six-monthly</strong> — emergency lighting one-hour discharge test; fire
                alarm six-monthly inspection (all detectors tested in rotation, panel inspection,
                battery check); portable appliance testing for high-risk equipment (construction,
                catering, portable power tools).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annually</strong> — emergency lighting full rated duration test (three hours
                for most systems under BS 5266); fire alarm annual inspection and test; portable
                appliance testing for standard office equipment; general electrical installation
                inspection; RCD testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Every 3–5 years</strong> — full EICR (fixed wire test) of the electrical
                installation. Frequency depends on occupancy type and previous EICR findings.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'fixed-wire-testing',
    heading: 'Fixed Wire Testing (EICR) for Commercial Properties',
    content: (
      <>
        <p>
          The Electrical Installation Condition Report (EICR) is the formal document recording the
          findings of a periodic inspection and test of the fixed electrical installation. It is the
          cornerstone of any commercial electrical maintenance programme.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What is included in a commercial EICR</strong> — inspection of the main
                earthing and bonding, consumer units and distribution boards, wiring systems
                (condition, containment, fixings), electrical accessories and fittings, switchgear
                and controls, and testing of earth fault loop impedance, insulation resistance, RCD
                operation, polarity, and continuity. A schedule of test results is completed for
                every circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recommended frequency</strong> — offices: every five years; industrial:
                every three years; educational: every five years; catering: every one to three
                years; licensed premises: every five years; medical locations: every one to five
                years depending on location type. Higher-risk or older installations should be
                inspected more frequently.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outcome: Satisfactory or Unsatisfactory</strong> — an EICR is classified as
                Satisfactory or Unsatisfactory. C1 (immediate danger) and C2 (potentially dangerous)
                observations result in an Unsatisfactory report. C3 (improvement recommended)
                observations result in a Satisfactory report but indicate remedial works that should
                be considered. Use the{' '}
                <SEOInternalLink href="/tools/eicr-certificate">Elec-Mate EICR app</SEOInternalLink>{' '}
                to complete and issue commercial EICRs on site.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pat-testing',
    heading: 'Portable Appliance Testing (PAT) in Commercial Properties',
    content: (
      <>
        <p>
          PAT testing verifies that portable electrical appliances are safe for use. It is a key
          component of any commercial electrical maintenance programme and is required to
          demonstrate compliance with the Electricity at Work Regulations 1989.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What PAT testing involves</strong> — visual inspection of the appliance,
                plug, and cable; earth continuity test (class I appliances); insulation resistance
                test; and sometimes a substitute leakage test. Results are recorded on labels
                applied to the appliance and in a test register.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test frequency by environment</strong> — construction sites and catering:
                every 3 months; industrial: annually; offices (portable appliances): every 2 to 4
                years; offices (IT equipment, low use): every 4 years or less. The IET Code of
                Practice for In-Service Inspection and Testing of Electrical Equipment provides
                recommended intervals for each equipment type and environment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation</strong> — a PAT test register recording each appliance, its
                test results, the date of test, and the retest date. Failed appliances must be
                removed from service immediately and either repaired and retested or destroyed. The
                register must be maintained and available for inspection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting Tests Under BS 5266',
    content: (
      <>
        <p>
          Emergency lighting is a life-safety system. Its maintenance is governed by BS 5266-1,
          which specifies a clear hierarchy of tests that must be carried out and recorded. These
          tests are a standard component of any commercial electrical maintenance contract.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monthly functional test</strong> — simulate failure of the normal supply and
                verify each emergency luminaire and exit sign illuminates. Duration is the brief
                period recommended by the manufacturer (typically 30 seconds to 1 minute). Record
                which luminaires were tested and any failures. Restore normal supply and check
                luminaires recharge.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Six-monthly one-hour discharge test</strong> — simulate failure of normal
                supply and maintain discharge for one hour. Verify all luminaires maintain output
                throughout. Record results. Allow full battery recharge before restoring normal
                operation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual full rated duration test</strong> — simulate failure and maintain for
                the full rated duration of the luminaires (typically three hours for maintained
                systems). All luminaires must maintain required light output throughout. Any failing
                luminaires must be replaced before the installation is returned to service.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Log book requirement</strong> — BS 5266-1 requires a log book recording all
                tests, any luminaire failures, remedial works, and the date of each test. The log
                book must be kept on site and presented to the responsible person (building owner or
                manager) and inspectors on request.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Record emergency lighting tests with Elec-Mate"
          description="Use Elec-Mate to record emergency lighting test results, generate compliant certificates, and maintain a digital log for each commercial property. Join 1,000+ UK electrical contractors."
          icon={Zap}
        />
      </>
    ),
  },
  {
    id: 'fire-alarm',
    heading: 'Fire Alarm Tests Under BS 5839',
    content: (
      <>
        <p>
          Fire alarm system testing is governed by BS 5839-1 (fire detection and fire alarm systems
          in buildings). Electrical contractors who include fire alarm testing in their maintenance
          contracts must understand the requirements of this standard.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Weekly call point test</strong> — test one manual call point per week,
                rotating through all call points over the cycle. The alarm signal must be generated
                at the control panel. This is typically carried out by building staff and recorded
                in the fire alarm log book.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monthly inspection</strong> — a more thorough check of the control panel,
                battery levels, and system indicators. Testing of remaining call points not tested
                in weekly rotation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Six-monthly inspection</strong> — inspection and test by a competent person:
                all detectors tested, all call points tested, sounders checked, panel inspection,
                standby battery test, and check of all linked systems (door holders, ventilation
                shutdown, etc.). Record all findings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual inspection</strong> — comprehensive inspection by a specialist. For
                Category L (automatic detection) systems, this should be carried out by a firm
                registered with NSI or BAFE. Includes detector sensitivity testing, full system
                function test, and a detailed inspection report.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'contract-content',
    heading: 'What to Include in an Electrical Maintenance Contract',
    content: (
      <>
        <p>
          A well-drafted maintenance contract protects both the contractor and the client. It
          defines expectations, prevents disputes, and ensures legal compliance is maintained
          throughout the contract term.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scope of works</strong> — a precise description of which systems, areas, and
                equipment are covered. Explicitly state any exclusions (e.g., specialist equipment,
                tenant areas, roof plant). Ambiguity in scope is the most common source of contract
                disputes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visit schedule</strong> — dates or frequency of scheduled PPM visits, what
                is carried out on each visit, and who the contractor will liaise with on site.
                Include provisions for rescheduling and notice periods for access.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation requirements</strong> — what reports, certificates, and
                records will be provided after each visit. Specify formats (PDF, original paper
                certificates), timescales for delivery (e.g., within 5 working days), and who
                retains originals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reactive callout provision</strong> — response time tiers (emergency,
                urgent, routine), hours of cover (standard hours only, or 24/7), hourly rate for
                reactive callouts, call-out charge, and materials charging mechanism.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Price and payment terms</strong> — annual PPM fee, payment schedule
                (monthly, quarterly, or annual in advance), price review mechanism (e.g., annual RPI
                increase capped at 5%), and invoicing terms for reactive works.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Termination provisions</strong> — notice period (typically 3 months),
                termination for cause, and what happens to outstanding scheduled visits or active
                reactive works at termination.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Electrical Maintenance Contract Pricing (£500–£5,000+ per Year)',
    content: (
      <>
        <p>
          Pricing an electrical maintenance contract requires understanding both the direct costs of
          the work and the overhead and margin required for the contract to be commercially viable.
          The following ranges are indicative for 2026.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small office or retail unit (up to 500m²)</strong> — £500 to £1,500 per
                year. Annual EICR (every 5 years, amortised), annual PAT, monthly emergency lighting
                test, and quarterly fire alarm test. Reactive callout rate typically £65 to £85/hr.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium commercial building (500m² to 2,000m²)</strong> — £1,500 to £3,500
                per year. Multiple distribution boards, larger emergency lighting installation, fire
                alarm system, more extensive PAT requirements, and more frequent EICR cycle.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large commercial premises (2,000m²+)</strong> — £3,500 to £5,000+ per year.
                Complex HV/LV distribution, generator systems, UPS, large emergency lighting and
                fire alarm installations, and more frequent inspection requirements. Some large
                premises justify higher annual costs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reactive callout charges</strong> — typically charged separately. Contract
                clients often receive a discounted rate (10 to 20 per cent below standard) as an
                incentive for the contract. Emergency callouts outside standard hours are charged at
                the agreed out-of-hours rate.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Managing Maintenance Contracts Efficiently',
    content: (
      <>
        <p>
          Maintenance contracts are a reliable source of recurring revenue for electrical
          businesses. Managing them efficiently — with good documentation, scheduled reminders, and
          professional certificates — protects both the business and the client.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certify Every Maintenance Visit</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every maintenance visit should produce a certificate or inspection report. EICRs,
                  minor works certificates, and PAT test registers are all evidence of compliance.
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete and issue certificates on the day of the visit. Never leave a site
                  without documentation.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Invoice Contracts and Reactive Works Clearly
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Maintenance contracts often involve separate invoices for the annual fee and for
                  reactive callout works. Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting and invoicing app
                  </SEOInternalLink>{' '}
                  to issue professional invoices for both elements, with clear itemisation that
                  satisfies commercial clients&apos; accounts payable requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage maintenance contracts with Elec-Mate"
          description="Join 1,000+ UK electrical contractors using Elec-Mate for EICR certificates, quoting, invoicing, and job management. Streamline your maintenance contract workflow. 7-day free trial."
          icon={Zap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalMaintenanceContractPage() {
  return (
    <GuideTemplate
      title="Electrical Maintenance Contract UK | PPM, EICR, Emergency Lighting and Fire Alarm Guide 2026"
      description="Complete guide to electrical maintenance contracts for commercial properties. Planned preventative maintenance (PPM) vs reactive, PPM schedules, EICR frequency, PAT testing, emergency lighting tests (BS 5266), fire alarm tests (BS 5839), what to include in a contract, and 2026 pricing (£500–£5,000/year)."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Commercial Guide"
      badgeIcon={ClipboardCheck}
      heroTitle={
        <>
          Electrical Maintenance Contracts:{' '}
          <span className="text-yellow-400">PPM, Testing Schedules and 2026 Pricing Guide</span>
        </>
      }
      heroSubtitle="A well-structured electrical maintenance contract protects your commercial client and ensures legal compliance across their electrical installation, emergency lighting, and fire alarm systems. This guide covers the difference between planned preventative maintenance (PPM) and reactive maintenance, what testing is required and how often (EICR, PAT, BS 5266, BS 5839), what to include in a contract, and 2026 pricing from £500 to £5,000 per year."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Maintenance Contracts"
      relatedPages={relatedPages}
      ctaHeading="Manage Your Maintenance Contracts with Elec-Mate"
      ctaSubheading="Join 1,000+ UK electrical contractors using Elec-Mate for EICR certificates, PAT records, professional invoicing, and job management. 7-day free trial."
    />
  );
}
