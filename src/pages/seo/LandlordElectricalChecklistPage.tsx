import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Home,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Clock,
  Flame,
  Cable,
  GraduationCap,
  ClipboardCheck,
  FileText,
  Users,
  BookOpen,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Safety', href: '/guides/electrical-safety-tips' },
  { label: 'Landlord Electrical Checklist', href: '/guides/landlord-electrical-safety-checklist' },
];

const tocItems = [
  { id: 'overview', label: 'Landlord Electrical Safety Overview' },
  { id: 'five-year-eicr', label: '5-Year EICR Requirement' },
  { id: 'smoke-alarms', label: 'Smoke Alarms (2022 Regulations)' },
  { id: 'co-alarms', label: 'Carbon Monoxide Alarms' },
  { id: 'pat-testing', label: 'PAT Testing for Landlords' },
  { id: 'record-keeping', label: 'Record Keeping and Compliance' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require landlords to have the electrical installation inspected and tested at least every 5 years by a qualified person, and to provide the EICR to tenants within 28 days of the inspection.',
  'Since October 2022, the Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022 require at least one smoke alarm on each storey with a habitable room, and a carbon monoxide alarm in any room with a fixed combustion appliance (excluding gas cookers). Alarms must be tested at the start of each new tenancy.',
  'While PAT testing is not a specific legal requirement for landlords, the Electrical Equipment (Safety) Regulations 2016 and the general duty of care under the Landlord and Tenant Act 1985 mean landlords should ensure all electrical appliances they supply are safe.',
  'Landlords must keep records of all EICRs, remedial works, alarm testing, and PAT testing (where applicable) for at least the period between inspections. These records must be provided to tenants and to the local authority on request.',
  'Local authorities can issue improvement notices and, for non-compliance with the 2020 electrical safety regulations, impose financial penalties of up to £30,000 per offence.',
];

const faqs = [
  {
    question: 'How often do landlords need an EICR?',
    answer:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require an EICR at least every 5 years. However, the previous EICR may recommend a shorter interval — for example, 3 years for an HMO (House in Multiple Occupation) or where the installation condition requires more frequent monitoring. The 5-year interval is a maximum, not a target. If the installation is old, in poor condition, or has known issues, more frequent inspection may be appropriate. The EICR must be carried out by a person who is qualified and competent — typically a registered electrician with an appropriate competent person scheme (NICEIC, NAPIT, ELECSA, or equivalent).',
  },
  {
    question: 'What happens if the EICR identifies faults?',
    answer:
      'If the EICR identifies any C1 (danger present) or C2 (potentially dangerous) observations, the landlord must carry out the necessary remedial work within 28 days (or sooner if specified in the report). The completed remedial work must be confirmed by a qualified electrician, who issues an updated EICR or a separate certificate confirming the work has been done. The landlord must supply a copy of the updated report to the tenant and the local authority (if requested) within 28 days of the work being completed. C3 (improvement recommended) observations do not require mandatory action but represent good practice.',
  },
  {
    question: 'Do landlords need smoke alarms on every floor?',
    answer:
      'Yes. Since October 2022, the Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022 require at least one smoke alarm on each storey of the property that contains a habitable room. This applies to all rented properties in England. The alarms can be battery-powered — there is no requirement for mains-wired alarms under these regulations (although mains-wired alarms with battery backup are recommended as best practice). The landlord must test the alarms at the start of each new tenancy to confirm they are in working order. The tenant is then responsible for ongoing testing and battery replacement during the tenancy.',
  },
  {
    question: 'When are carbon monoxide alarms required?',
    answer:
      'Since October 2022, a carbon monoxide alarm must be installed in any room that has a fixed combustion appliance — this includes gas boilers, gas fires, wood-burning stoves, open fires, and oil-fired boilers. Gas cookers are excluded from this requirement. The alarm must be located in the same room as the appliance, positioned according to the manufacturer instructions (typically at ceiling level or high on a wall). The landlord must test carbon monoxide alarms at the start of each new tenancy.',
  },
  {
    question: 'Do landlords need to PAT test appliances?',
    answer:
      'There is no specific legal requirement for landlords to carry out formal PAT testing. However, the Electrical Equipment (Safety) Regulations 2016 require that all electrical equipment made available for use is safe. The Landlord and Tenant Act 1985 also places a general duty on landlords to keep the property in good repair, including electrical systems. In practice, if a landlord supplies electrical appliances (cooker, washing machine, fridge, etc.), they should be visually inspected and ideally PAT tested at regular intervals — typically annually for items in rented properties that experience heavy use and tenant turnover. Records of inspections and tests should be kept as evidence of compliance.',
  },
  {
    question: 'What records should landlords keep?',
    answer:
      'Landlords should maintain: the current EICR and all previous EICRs for the property, records of any remedial work carried out following an EICR (including the electrician certificates), records of smoke alarm and carbon monoxide alarm installation and testing, PAT testing records (if appliances are supplied), gas safety certificates (separate requirement under gas safety regulations), and any correspondence with tenants or the local authority regarding electrical safety. These records should be kept for at least 5 years (the interval between EICRs). For HMOs, the licensing authority may require specific record-keeping formats.',
  },
  {
    question: 'What are the penalties for non-compliance?',
    answer:
      'The 2020 electrical safety regulations give local authorities the power to: issue remedial notices requiring landlords to carry out repairs, arrange remedial work themselves and recover the costs from the landlord (if the landlord fails to act within the required timeframe), and impose financial penalties of up to £30,000 per offence. For the smoke and carbon monoxide alarm regulations, the penalty for non-compliance is up to £5,000. Repeated non-compliance can result in banning orders preventing the landlord from letting properties. In the most serious cases, criminal prosecution is possible under the Housing Act 2004.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Detailed guide to landlord EICR requirements and the inspection process.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/smoke-alarm-regs-2022',
    title: 'Smoke Alarm Regulations 2022',
    description: 'Full guide to the 2022 smoke and carbon monoxide alarm regulations.',
    icon: Flame,
    category: 'Guide',
  },
  {
    href: '/guides/hmo-electrical-requirements',
    title: 'HMO Electrical Requirements',
    description: 'Additional electrical safety requirements for Houses in Multiple Occupation.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICR reports on your phone for landlord inspections.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/pat-testing-guide',
    title: 'PAT Testing Guide',
    description: 'Complete guide to portable appliance testing.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 with structured training modules.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Landlord Electrical Safety: A Complete Checklist',
    content: (
      <>
        <p>
          Landlords in England have specific legal obligations for electrical safety in rented
          properties. Since July 2020, the Electrical Safety Standards in the Private Rented Sector
          (England) Regulations 2020 have required landlords to ensure their electrical
          installations are inspected and tested at least every 5 years.
        </p>
        <p>
          Combined with the Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022, the
          Landlord and Tenant Act 1985, and general health and safety duties, landlords must
          maintain a comprehensive approach to electrical safety. Failure to comply can result in
          financial penalties of up to £30,000 per offence.
        </p>
        <p>
          This guide provides a clear checklist of landlord electrical safety obligations: the
          5-year EICR requirement, smoke and CO alarm rules, PAT testing guidance, record-keeping
          requirements, and the penalties for non-compliance.
        </p>
      </>
    ),
  },
  {
    id: 'five-year-eicr',
    heading: '5-Year EICR Requirement',
    content: (
      <>
        <p>
          The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
          require landlords to:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspect every 5 years</strong> — have the electrical installation inspected
                and tested by a qualified person at intervals of no more than 5 years (or more
                frequently if the previous EICR recommends it).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide to tenants within 28 days</strong> — supply a copy of the EICR to
                existing tenants within 28 days of the inspection, and to new tenants before they
                occupy the property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remediate within 28 days</strong> — if the EICR identifies C1 or C2
                observations, carry out remedial work within 28 days (or sooner if specified).
                Provide written confirmation of completion to the tenant and local authority.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide to the local authority on request</strong> — supply a copy of the
                EICR to the local housing authority within 7 days of a request.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The EICR must be carried out by a person who is qualified and competent. In practice, this
          means a registered electrician who is a member of a competent person scheme such as{' '}
          <SEOInternalLink href="/guides/niceic-registration">NICEIC</SEOInternalLink>,{' '}
          <SEOInternalLink href="/guides/napit-registration">NAPIT</SEOInternalLink>, or ELECSA.
        </p>
      </>
    ),
  },
  {
    id: 'smoke-alarms',
    heading: 'Smoke Alarms (2022 Regulations)',
    content: (
      <>
        <p>
          Since October 2022, the Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022
          require:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>At least one smoke alarm on each storey</strong> — every storey that
                contains a habitable room must have at least one smoke alarm. A "habitable room"
                includes bedrooms, living rooms, kitchens, and studies — essentially any room used
                for living, sleeping, or cooking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test at start of each tenancy</strong> — the landlord must check that each
                alarm is in working order on the day a new tenancy begins. After that, the tenant is
                responsible for ongoing testing and battery replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery or mains powered</strong> — there is no requirement for mains-wired
                alarms under these regulations, but mains-wired alarms with battery backup are
                recommended as they are more reliable and eliminate the risk of flat batteries.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <p className="text-white text-sm leading-relaxed">
              <strong>Best practice:</strong> While the regulations allow battery-only alarms,
              electricians should recommend mains-wired, interlinked smoke alarms with battery
              backup. These are more reliable, activate all alarms when one detects smoke, and meet
              the higher standards expected for HMOs and new-build properties.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'co-alarms',
    heading: 'Carbon Monoxide Alarms',
    content: (
      <>
        <p>The same 2022 regulations require carbon monoxide alarms in specific locations:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required in rooms with fixed combustion appliances</strong> — this includes
                gas boilers, gas fires, wood-burning stoves, open fires, and oil-fired boilers. Gas
                cookers are excluded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Positioned correctly</strong> — follow the manufacturer instructions.
                Typically at ceiling level or high on a wall, at least 1m away from the combustion
                appliance, and in a location where the alarm can be heard from bedrooms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tested at each tenancy start</strong> — same obligation as smoke alarms. The
                landlord must confirm the CO alarm is working at the start of each new tenancy.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pat-testing',
    heading: 'PAT Testing for Landlords',
    content: (
      <>
        <p>
          While there is no specific legal requirement for landlords to carry out formal PAT
          (Portable Appliance Testing), the duty of care is clear:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord-supplied appliances</strong> — if you provide appliances as part of
                the tenancy (cooker, washing machine, fridge-freezer, microwave, kettle), you have a
                duty to ensure they are safe. Annual visual inspection and PAT testing is the
                recommended approach.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Furnished properties</strong> — furnished lets with multiple appliances
                (lamps, heaters, extension leads) have a higher risk and PAT testing is strongly
                recommended annually.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMOs</strong> — for licensed HMOs, the licensing conditions may include a
                requirement for PAT testing of landlord-supplied appliances. Check with your local
                authority for specific HMO licensing conditions.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'record-keeping',
    heading: 'Record Keeping and Compliance',
    content: (
      <>
        <p>
          Good record keeping is essential for demonstrating compliance and protecting yourself
          against enforcement action or litigation:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Current and previous EICR reports (keep for at least 10 years)</span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Certificates for remedial work carried out following EICR observations</span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Records of smoke alarm and CO alarm installation and testing dates</span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>PAT testing records (if appliances are supplied)</span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Copies of EICR and certificates supplied to tenants (with dates)</span>
            </li>
            <li className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Correspondence with tenants about electrical safety issues</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'penalties',
    heading: 'Penalties for Non-Compliance',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR non-compliance</strong> — local authorities can issue remedial notices,
                arrange repairs at the landlord's cost, and impose financial penalties of up to
                £30,000 per offence under the 2020 regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smoke/CO alarm non-compliance</strong> — failure to comply with the 2022
                alarm regulations can result in a penalty charge of up to £5,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Banning orders</strong> — repeated non-compliance can result in a banning
                order under the Housing and Planning Act 2016, preventing the landlord from letting
                properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Criminal prosecution</strong> — in the most serious cases, landlords can
                face criminal prosecution under the Housing Act 2004 for failures that create a
                serious risk to tenants.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Landlord Safety Services',
    content: (
      <>
        <p>
          Landlord electrical safety is a reliable, recurring revenue stream. Properties need an
          EICR every 5 years, alarm testing at every tenancy change, and remedial work when faults
          are found.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EICR on Your Phone</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete landlord{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink> on site
                  with Elec-Mate. AI board scanning, voice test entry, and instant PDF export. Send
                  the report to the landlord before you leave the property.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <BookOpen className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quoting and Invoicing</h4>
                <p className="text-white text-sm leading-relaxed">
                  Quote remedial work on site using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Landlords want a clear, itemised price for repairs — provide it before you
                  leave.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Build a landlord client base"
          description="Elec-Mate gives you EICR certificates, quoting, and invoicing on your phone. Professional reports that landlords trust. 7-day free trial."
          icon={Home}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LandlordElectricalChecklistPage() {
  return (
    <GuideTemplate
      title="Landlord Electrical Safety Checklist | UK Legal Requirements"
      description="Complete landlord electrical safety checklist for UK rental properties. 5-year EICR requirement, smoke alarm regulations 2022, carbon monoxide alarms, PAT testing, record keeping, and penalties for non-compliance."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Compliance Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          Landlord Electrical Safety Checklist:{' '}
          <span className="text-yellow-400">UK Legal Requirements for Rented Properties</span>
        </>
      }
      heroSubtitle="Every landlord in England must comply with electrical safety regulations. This checklist covers the 5-year EICR, smoke alarm and CO alarm requirements, PAT testing, record keeping, and the penalties for non-compliance."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Landlord Electrical Safety"
      relatedPages={relatedPages}
      ctaHeading="Professional EICR Reports for Landlords"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for landlord EICR reports, quoting, and invoicing. Complete on-site, send instantly. 7-day free trial, cancel anytime."
    />
  );
}
