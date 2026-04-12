import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  PoundSterling,
  Home,
  ClipboardCheck,
  Building2,
  Zap,
  Search,
  Clock,
  Scale,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EICR Guides', href: '/tools/eicr-certificate' },
  { label: 'EICR Northampton', href: '/eicr-northampton' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'legal-requirements', label: 'Legal Requirements in England' },
  { id: 'northampton-property', label: 'Northampton Property & Wiring' },
  { id: 'eicr-process', label: 'The EICR Process' },
  { id: 'observation-codes', label: 'Observation Codes' },
  { id: 'costs', label: 'EICR Costs in Northampton' },
  { id: 'finding-inspector', label: 'Finding a Qualified Inspector' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Northampton to obtain a valid EICR before a new tenancy begins and at least every five years thereafter.',
  'West Northamptonshire Council is the local housing authority responsible for enforcing the 2020 Regulations in Northampton. Non-compliant landlords face civil penalties of up to £30,000 per breach.',
  'EICR costs in Northampton typically range from £95 to £185 for a one-bedroom flat and £160 to £300 for a three-bedroom house, reflecting East Midlands labour rates that are competitive compared with London and the South East.',
  'Northampton has a significant stock of Victorian and inter-war terraced housing — particularly in areas like Semilong, Spring Boroughs, and Abington — where the absence of RCD protection and degraded wiring are frequent EICR findings.',
  'An EICR must be carried out by a qualified and competent person — in practice someone registered with NICEIC, NAPIT, or ELECSA and holding City and Guilds 2391 or equivalent inspection and testing qualifications.',
];

const faqs = [
  {
    question: 'Is an EICR required for rented properties in Northampton?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Northampton to have the electrical installation inspected and tested by a qualified person and to obtain an EICR before a new tenancy begins and at least every five years. A copy must be provided to tenants within 28 days of the inspection and to West Northamptonshire Council within seven days if requested. Failure to comply can result in civil penalties of up to £30,000 per breach.',
  },
  {
    question: 'How much does an EICR cost in Northampton?',
    answer:
      'EICR costs in Northampton reflect East Midlands labour rates, which are generally lower than London but broadly in line with the national average outside the South East. A one-bedroom flat typically costs £95 to £185, a two-bedroom property £140 to £250, and a three-bedroom house £160 to £300. Older Victorian terraced properties will be at the higher end due to the additional time required for a thorough inspection. These prices cover the inspection and report only; remedial work is quoted separately.',
  },
  {
    question: 'What are common EICR findings in Northampton properties?',
    answer:
      "Northampton's older housing stock — particularly in Semilong, Spring Boroughs, and Abington — frequently presents rubber-insulated or early PVC wiring, the absence of RCD protection on socket-outlet circuits (a C2 observation under BS 7671 Regulation 411.3.3), inadequate earthing and bonding, and dated rewirable fuse boards. Properties in older areas of the town may also show evidence of unpermitted DIY electrical work.",
  },
  {
    question: 'How long does an EICR take in Northampton?',
    answer:
      'A one or two-bedroom Northampton flat typically takes two to three hours. A three-bedroom house takes three to five hours. Older Victorian terraced properties with multiple circuits, outdated wiring, or poor circuit documentation may take longer. The inspector will need access to all rooms, the consumer unit, and the loft (if applicable).',
  },
  {
    question: 'What happens if a Northampton rental property fails the EICR?',
    answer:
      'An EICR containing C1 (danger present) or C2 (potentially dangerous) observations is classified as Unsatisfactory. Under the 2020 Regulations, landlords must complete all remedial work within 28 days of the inspection date, or sooner if the inspector specifies. Written confirmation from a qualified electrician must be obtained once the work is complete and provided to the tenant and to West Northamptonshire Council within 28 days.',
  },
  {
    question: 'Does Northampton have an HMO licensing requirement?',
    answer:
      'Yes. Mandatory HMO licensing applies to properties in Northampton with five or more occupants forming two or more households. A valid EICR is a standard condition of any HMO licence. West Northamptonshire Council has the power to refuse or revoke an HMO licence for non-compliance with electrical safety requirements. Some parts of Northampton may also be subject to additional or selective licensing; check with the council for the current position.',
  },
  {
    question: 'What qualifications should an EICR inspector in Northampton have?',
    answer:
      'The inspector should hold City and Guilds 2391 (Inspection and Testing of Electrical Installations) or the equivalent C&G 2395 qualification, plus a current BS 7671 18th Edition qualification (C&G 2382). Registration with NICEIC, NAPIT, or ELECSA provides independent assurance of qualifications, insurance, and regular technical assessment. Always verify registration before booking.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Explained',
    description:
      'Complete guide to Electrical Installation Condition Reports — what inspectors check, what the codes mean, and what happens next.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Full landlord EICR guide covering the 2020 Regulations, compliance deadlines, penalties, and managing multiple properties.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description:
      'What C1, C2, C3 and FI codes mean, what action is required, and real-world examples.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete EICRs on your phone with AI board scanning, voice test entry, and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-eicr',
    heading: 'What Is an Electrical Installation Condition Report?',
    content: (
      <>
        <p>
          An Electrical Installation Condition Report (EICR) is a formal assessment of the safety
          and condition of a fixed electrical installation in an existing building. It combines
          visual inspection with a series of electrical tests carried out using calibrated
          instruments, resulting in a written report that classifies the installation as
          Satisfactory or Unsatisfactory.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>What is covered</strong> — the fixed electrical installation: consumer unit,
                wiring, socket outlets, switches, light fittings, earthing and bonding conductors,
                and the incoming supply arrangements. Portable appliances are not included (these
                are covered by PAT testing).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing</strong> — results are recorded in the{' '}
                <SEOInternalLink href="/tools/eicr-certificate">
                  Schedule of Test Results
                </SEOInternalLink>
                . Tests include earth continuity, insulation resistance, polarity, earth fault loop
                impedance, and RCD operating time, all carried out with calibrated instruments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standards basis</strong> — EICRs are carried out in accordance with{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024 (the IET Wiring Regulations, 18th Edition)
                </SEOInternalLink>
                . The inspection scope, testing methodology, and observation coding system are
                defined within BS 7671 and its associated guidance notes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Report outcome</strong> — the EICR states Satisfactory or Unsatisfactory,
                lists all observations with their code classifications, and recommends the date of
                the next inspection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'legal-requirements',
    heading: 'Legal Requirements for EICRs in Northampton',
    content: (
      <>
        <p>
          Northampton landlords are subject to the English regulatory framework for electrical
          safety in the private rented sector. These are the key obligations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  Electrical Safety Standards in the Private Rented Sector (England) Regulations
                  2020
                </strong>{' '}
                — every private landlord must obtain an EICR before a new tenancy begins and at
                least every five years. The EICR must be provided to tenants within 28 days of the
                inspection and to West Northamptonshire Council within seven days if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Civil penalties</strong> — West Northamptonshire Council can impose civil
                penalties of up to £30,000 per breach. Each separate failure constitutes a separate
                breach and can attract its own penalty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial work</strong> — where the EICR is Unsatisfactory, all C1 and C2
                observations must be remedied within 28 days. Written confirmation from a qualified
                electrician must be provided to the tenant and to the council on request.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restrictions</strong> — landlords cannot serve a valid Section 21
                (no-fault eviction) notice where they have not provided the tenant with a copy of
                the current EICR.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Owner-occupiers in Northampton are not legally required to obtain an EICR, but BS 7671
          recommends periodic inspection at maximum ten-year intervals (or five years for older
          properties) or on change of occupancy.
        </p>
      </>
    ),
  },
  {
    id: 'northampton-property',
    heading: 'Northampton Property Stock and Electrical Wiring',
    content: (
      <>
        <p>
          Northampton's housing stock includes Victorian and Edwardian terraced housing, inter-war
          semi-detached properties, post-war estates, and newer developments associated with the
          town's historic growth as a planned expansion town. Each era presents different electrical
          inspection challenges.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian and Edwardian terraces</strong> — areas including Semilong, Spring
                Boroughs, Abington, and parts of Far Cotton contain Victorian and Edwardian terraced
                housing. Many retain original rubber-insulated wiring or early PVC cables. Degraded
                rubber insulation is a C2 observation requiring urgent remedial action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inter-war and post-war housing</strong> — Northampton's inter-war and
                post-war estates were largely built between 1930 and 1970. Many have been partially
                or fully rewired at some stage, but some retain original or outdated wiring. Absence
                of RCD protection is common in this housing era.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection</strong> — properties wired or last rewired before
                approximately 1995 frequently lack RCD protection on socket-outlet circuits. BS 7671
                Regulation 411.3.3 requires 30mA RCD protection. Absence is coded C2, making the
                EICR Unsatisfactory and typically requiring a consumer unit upgrade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Expansion town development</strong> — Northampton expanded significantly in
                the 1960s to 1980s under the new town designation. Properties from this period are
                generally better wired than Victorian stock but may still lack modern RCD protection
                and may have ageing PVC cabling approaching the end of its design life.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-process',
    heading: 'The EICR Process in Northampton',
    content: (
      <>
        <p>
          Understanding what happens during an EICR helps both property owners and tenants prepare
          and know what to expect.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Preparation</strong> — all rooms, the consumer unit, and the loft hatch must
                be accessible. Tenants should be informed that brief power interruptions may occur
                during circuit testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection</strong> — the inspector examines all accessible parts of
                the fixed installation: wiring, accessories, the consumer unit, and earthing and
                bonding arrangements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical testing</strong> — circuits are tested in turn using calibrated
                instruments. Results are recorded in the Schedule of Test Results. Each circuit may
                be briefly de-energised during testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Report completion</strong> — the EICR is ideally completed on site and
                provided to the landlord before the inspector leaves. For a one or two-bedroom
                Northampton flat allow two to three hours; for a three-bedroom house allow three to
                five hours.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'observation-codes',
    heading: 'EICR Observation Codes',
    content: (
      <>
        <p>
          All findings from an EICR are classified using the four-code system defined in BS 7671 and
          its guidance notes. The codes determine whether the EICR is Satisfactory or Unsatisfactory
          and what action the landlord must take.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 — Danger present</strong> — immediate risk of injury. Requires immediate
                remedial action, possibly including disconnection of the affected circuit. Always
                makes the EICR Unsatisfactory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — Potentially dangerous</strong> — urgent action required. Not an
                immediate risk but potentially dangerous. Always makes the EICR Unsatisfactory.
                Common in Northampton: absence of RCD protection, degraded rubber wiring, inadequate
                bonding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>C3 — Improvement recommended</strong> — does not fully meet current
                standards but is not unsafe. Does not make the EICR Unsatisfactory on its own.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-white mt-0.5 shrink-0" />
              <span>
                <strong>FI — Further investigation required</strong> — a potential issue cannot be
                assessed without further investigation. Makes the EICR Unsatisfactory until
                resolved.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For a full explanation with real-world examples, see the{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            EICR Observation Codes guide
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'EICR Costs in Northampton (2026 Prices)',
    content: (
      <>
        <p>
          Northampton EICR prices reflect East Midlands labour rates, which are competitive compared
          with London and the South East but broadly in line with the national average for similar
          towns.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £95 to £185. Modern purpose-built flats are
                faster to inspect than older conversions or Victorian properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom property</strong> — £140 to £250. Victorian terraced properties
                in Semilong or Abington may be at the higher end due to aged wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £160 to £300. Older properties with
                rubber-insulated cables or multiple subboards will cost more to inspect thoroughly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO or larger property</strong> — £280 to £550+. Fire alarm systems,
                emergency lighting, and multiple consumer units increase the inspection scope and
                duration.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Consumer unit upgrades — the most common remedial requirement from Northampton EICRs —
          typically cost £380 to £650 including materials and labour. Some local electricians offer
          a combined EICR and consumer unit upgrade package at a reduced overall price.
        </p>
      </>
    ),
  },
  {
    id: 'finding-inspector',
    heading: 'Finding a Qualified EICR Inspector in Northampton',
    content: (
      <>
        <p>
          Northampton has a reasonable number of qualified electricians, but inspection and testing
          requires specific qualifications that not every contractor holds. These steps will help
          you find a competent EICR inspector.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme membership</strong> — use the NICEIC, NAPIT, or
                ELECSA online registers to find Northampton-based electricians with inspection and
                testing qualifications. Membership confirms qualifications, insurance, and ongoing
                technical assessment by the scheme body.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify qualifications</strong> — the inspector should hold City and Guilds
                2391 or C&G 2395 (Inspection and Testing) and a current BS 7671 18th Edition
                qualification (C&G 2382). Ask to see their scheme membership card or certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Experience with local property types</strong> — prefer inspectors with
                experience of Northampton's Victorian and inter-war housing stock. Familiarity with
                rubber-insulated wiring and older consumer unit types reduces the risk of
                misdiagnosis or missed defects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Avoid suspiciously cheap quotes</strong> — a thorough EICR for a Northampton
                three-bedroom house takes three to five hours and requires expensive calibrated
                equipment. Quotes significantly below the market rate may indicate an inadequate
                inspection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in Northampton',
    content: (
      <>
        <p>
          Northampton's growing population, significant private rented sector, and diverse housing
          stock create solid demand for EICR work. Building a reputation for reliable, thorough
          inspection work can generate significant repeat business from landlords and letting agents
          managing multiple properties across the town.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EICRs On Site in Northampton</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete reports on your phone while still at the Northampton property. AI
                  board scanning, voice test entry, and instant PDF export mean landlords receive
                  the completed report before you leave the site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Win Northampton Remedial Work</h4>
                <p className="text-white text-sm leading-relaxed">
                  When you identify C1 or C2 observations, quote the remedial work immediately using
                  the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . Northampton landlords must act within 28 days — the electrician who quotes on
                  the day of the EICR consistently wins the follow-on job.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Northampton EICR business with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. Complete more EICRs per day and win the remedial work. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRNorthamptonPage() {
  return (
    <GuideTemplate
      title="EICR Northampton | Electrical Inspection Northampton"
      description="EICR Northampton — costs, legal requirements, and what to expect from an Electrical Installation Condition Report in Northampton. Guide for landlords, homeowners, and electricians covering the 2020 Regulations, Victorian wiring, and 2026 pricing."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          EICR Northampton:{' '}
          <span className="text-yellow-400">Electrical Inspection Guide 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about Electrical Installation Condition Reports in Northampton — legal requirements under the 2020 Regulations, Victorian and inter-war property wiring, costs, finding qualified inspectors, and guidance for electricians."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Northampton"
      relatedPages={relatedPages}
      ctaHeading="Complete Northampton EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
