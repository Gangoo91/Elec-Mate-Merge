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
  { label: 'EICR Guides', href: '/guides/eicr-explained' },
  { label: 'EICR Reading', href: '/eicr-reading' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'legal-requirements', label: 'Legal Requirements in England' },
  { id: 'reading-property', label: 'Reading Property & Wiring' },
  { id: 'eicr-process', label: 'The EICR Process' },
  { id: 'observation-codes', label: 'Observation Codes' },
  { id: 'costs', label: 'EICR Costs in Reading' },
  { id: 'finding-inspector', label: 'Finding a Qualified Inspector' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Reading to obtain a valid EICR before a new tenancy begins and at least every five years thereafter.',
  'Reading Borough Council is the local housing authority responsible for enforcing the 2020 Regulations. Non-compliant landlords face civil penalties of up to £30,000 per breach.',
  'EICR costs in Reading typically range from £120 to £240 for a one-bedroom flat and £200 to £370 for a three-bedroom house, reflecting Thames Valley labour rates that are significantly higher than the Midlands but lower than central London.',
  'Reading has a substantial stock of Victorian and Edwardian terraced housing — particularly in areas such as Oxford Road, Whitley, and Newtown — where degraded rubber wiring and the absence of RCD protection are frequent EICR findings.',
  'Reading Borough Council operates mandatory HMO licensing and a selective licensing scheme across certain areas of the borough. A valid EICR is a mandatory condition of all HMO licences, and non-compliance can result in licence revocation and civil penalties.',
];

const faqs = [
  {
    question: 'Is an EICR legally required for rented properties in Reading?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Reading to have the electrical installation inspected and tested by a qualified person and to obtain an EICR before a new tenancy begins and at least every five years. A copy must be provided to tenants within 28 days of the inspection and to Reading Borough Council within seven days if requested. Failure to comply can result in civil penalties of up to £30,000 per breach.',
  },
  {
    question: 'How much does an EICR cost in Reading?',
    answer:
      'Reading EICR costs reflect Thames Valley labour rates, which are among the higher rates outside London. A one-bedroom flat typically costs £120 to £240, a two-bedroom property £170 to £310, and a three-bedroom house £200 to £370. Victorian properties in areas like Oxford Road and Whitley may cost more due to aged wiring. These prices cover the inspection and report only; remedial work is quoted and charged separately.',
  },
  {
    question: 'What are common EICR findings in Reading properties?',
    answer:
      "Reading's Victorian and Edwardian terraced housing stock in areas such as Oxford Road, Whitley, and Newtown frequently presents degraded rubber-insulated wiring, the absence of RCD protection on socket-outlet circuits (a C2 observation under BS 7671 Regulation 411.3.3), inadequate earthing and bonding, and dated consumer units. Student and professional HMOs near the University of Reading can present overloaded circuits and inadequate fire alarm integration.",
  },
  {
    question: 'Does Reading Borough Council enforce EICR requirements?',
    answer:
      "Yes. Reading Borough Council's housing enforcement team enforces the 2020 Regulations. The council operates mandatory HMO licensing across the borough and selective licensing in designated areas. EICR compliance is a standard condition of all licences. The council investigates tenant complaints and conducts proactive inspections. Non-compliance can result in civil penalties of up to £30,000 per breach and HMO licence refusal or revocation.",
  },
  {
    question: 'How long does an EICR take in Reading?',
    answer:
      'A one or two-bedroom Reading flat typically takes two to three hours. A three-bedroom house takes three to five hours. Older Victorian properties in Oxford Road or Whitley with degraded wiring or complex circuit layouts may take longer. The inspector needs access to all rooms, the consumer unit, and the loft (if applicable). Properties that have had extensive unpermitted DIY electrical work may also take longer to assess.',
  },
  {
    question: 'Do Reading HMOs have additional EICR requirements?',
    answer:
      "Yes. Mandatory HMO licensing in Reading applies to properties with five or more occupants forming two or more households. A valid EICR is a mandatory condition of all HMO licences. Reading Borough Council may also specify inspection intervals shorter than five years for certain HMOs, and the inspection scope must include fire alarm systems and emergency lighting where present. Failure to maintain a valid EICR can result in licence refusal or revocation.",
  },
  {
    question: 'What happens if my Reading rental property fails the EICR?',
    answer:
      'An EICR containing C1 (danger present) or C2 (potentially dangerous) observations is classified as Unsatisfactory. Under the 2020 Regulations, landlords must complete all remedial work within 28 days of the inspection date, or sooner if the inspector specifies. Written confirmation from a qualified electrician must be obtained once the work is complete and provided to the tenant and to Reading Borough Council within 28 days.',
  },
  {
    question: 'What qualifications should a Reading EICR inspector have?',
    answer:
      'The inspector should hold City and Guilds 2391 (Inspection and Testing of Electrical Installations) or the equivalent C&G 2395 qualification, plus a current BS 7671 18th Edition qualification (C&G 2382). Registration with NICEIC, NAPIT, or ELECSA provides independent assurance of qualifications, ongoing technical assessment, and insurance. Always verify scheme registration before commissioning an EICR in Reading.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-explained',
    title: 'EICR Explained',
    description: 'Complete guide to Electrical Installation Condition Reports — what inspectors check, what the codes mean, and what happens next.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Full landlord EICR guide covering the 2020 Regulations, compliance deadlines, penalties, and managing multiple properties.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description: 'What C1, C2, C3 and FI codes mean, what action is required, and real-world examples.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning, voice test entry, and instant PDF export.',
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
          and condition of the fixed electrical installation in an existing building. Conducted by
          a qualified and competent electrician, it combines visual inspection with a structured
          programme of electrical tests using calibrated instruments, resulting in a report that
          classifies the installation as Satisfactory or Unsatisfactory.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>What is inspected</strong> — the fixed electrical installation: consumer
                unit, wiring, socket outlets, switches, light fittings, earthing and main bonding
                conductors. Does not include portable appliances (which are covered by PAT testing).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing</strong> — the inspector uses calibrated instruments to carry
                out tests including earth continuity, insulation resistance, polarity, earth fault
                loop impedance, and RCD operating time. Results are recorded in the{' '}
                <SEOInternalLink href="/tools/eicr-certificate">
                  Schedule of Test Results
                </SEOInternalLink>
                , which forms part of the completed EICR document.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standards</strong> — carried out in accordance with{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024 (the IET Wiring Regulations, 18th Edition)
                </SEOInternalLink>
                . The inspection scope, testing methodology, report format, and coding system are
                defined within BS 7671 and its associated guidance notes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outcome</strong> — the EICR states Satisfactory or Unsatisfactory, lists
                all observations with code classifications, and recommends the next inspection date.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'legal-requirements',
    heading: 'Legal Requirements for EICRs in Reading',
    content: (
      <>
        <p>
          Reading landlords are subject to the English regulatory framework for electrical safety
          in the private rented sector. The primary legislation is the Electrical Safety Standards
          in the Private Rented Sector (England) Regulations 2020.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory EICR</strong> — every private landlord must obtain an EICR
                before a new tenancy begins and at least every five years. The EICR must be
                provided to tenants within 28 days and to Reading Borough Council within seven
                days if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Civil penalties</strong> — Reading Borough Council can impose civil
                penalties of up to £30,000 per breach. Each separate failure (not obtaining
                an EICR, not providing it to the tenant, not completing remedial work) constitutes
                a separate breach and can attract its own penalty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing</strong> — Reading Borough Council operates mandatory HMO
                licensing and selective licensing in certain areas. A valid EICR is a mandatory
                condition of all HMO licences. Non-compliance can result in licence refusal or
                revocation as well as civil penalties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restrictions</strong> — landlords cannot serve a valid Section 21
                (no-fault eviction) notice where they have not provided the tenant with a copy of
                the current EICR. This is a significant practical restriction for Reading landlords
                seeking possession of their property.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'reading-property',
    heading: 'Reading Property Stock and Electrical Wiring',
    content: (
      <>
        <p>
          Reading has a diverse housing stock that reflects both its Victorian commercial heritage
          and its 20th century growth as a major employment centre. The private rented sector is
          substantial and includes properties across a wide range of ages and conditions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian and Edwardian terraces</strong> — areas including Oxford Road,
                Whitley, Newtown, and Caversham contain large numbers of Victorian and Edwardian
                terraced houses. Many retain rubber-insulated wiring that degrades with age,
                becoming brittle and presenting serious insulation failure risk. This is the most
                common source of C1 and C2 observations in Reading's older rental properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Absence of RCD protection</strong> — properties wired or last rewired
                before approximately 1995 frequently lack RCD protection on socket-outlet circuits.
                BS 7671 Regulation 411.3.3 requires 30mA RCD protection. Absence is coded C2,
                making the EICR Unsatisfactory and typically requiring a full consumer unit upgrade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student and professional HMOs</strong> — Reading's proximity to the
                University of Reading and its major tech employers creates high demand for HMO
                accommodation. Converted Victorian terraces used as HMOs frequently present
                inadequate earthing, overloaded circuits, and insufficient fire alarm integration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Modern flat developments</strong> — Reading's town centre regeneration
                has produced a significant number of modern flat developments. These are generally
                well wired but older examples from the 1990s and early 2000s may have partial RCD
                coverage only and will benefit from periodic inspection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-process',
    heading: 'The EICR Process in Reading',
    content: (
      <>
        <p>
          Knowing what to expect during an EICR helps property owners and tenants prepare and
          minimises disruption on inspection day.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Preparation</strong> — ensure all rooms, the consumer unit location,
                the loft hatch, and any outbuildings are accessible. Notify tenants in advance
                that there may be brief power interruptions during circuit testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection</strong> — the inspector examines all accessible parts
                of the fixed installation: wiring, accessories, the consumer unit, earthing and
                bonding conductors, and any external or garden installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical testing</strong> — each circuit is tested in turn using
                calibrated instruments. Results are recorded in the Schedule of Test Results.
                The inspector may briefly de-energise circuits during testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical duration</strong> — a one or two-bedroom Reading flat: two to
                three hours. A three-bedroom house: three to five hours. An HMO with multiple
                consumer units and fire alarm systems: four to seven hours or more.
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
          All findings from an EICR inspection are recorded using the standard four-code
          classification system defined in BS 7671 and its associated guidance notes. The codes
          determine whether the EICR is Satisfactory or Unsatisfactory and what action is required.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 — Danger present</strong> — immediate risk of injury. Requires
                immediate remedial action, possibly including disconnection of the affected
                circuit. Always makes the EICR Unsatisfactory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — Potentially dangerous</strong> — urgent remedial action required.
                Not an immediate risk but potentially dangerous. Always makes the EICR
                Unsatisfactory. Common in Reading: absence of RCD protection, degraded rubber
                wiring, inadequate earthing or bonding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>C3 — Improvement recommended</strong> — does not fully meet current
                standards but is not a safety hazard. Does not make the EICR Unsatisfactory
                on its own.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-white mt-0.5 shrink-0" />
              <span>
                <strong>FI — Further investigation required</strong> — a potential issue cannot
                be properly assessed without further investigation. Makes the EICR Unsatisfactory
                until the investigation is completed.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For a detailed explanation of all four codes with real-world examples, see the{' '}
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
    heading: 'EICR Costs in Reading (2026 Prices)',
    content: (
      <>
        <p>
          Reading EICR costs reflect Thames Valley labour rates, which are among the higher rates
          outside of London. Reading sits firmly in the commuter belt and rates are typically 15
          to 25 per cent higher than the Midlands average.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £120 to £240. Modern purpose-built flats
                near the town centre are typically faster to inspect than older Victorian
                conversions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom property</strong> — £170 to £310. Victorian terraces in
                Oxford Road and Whitley may be at the higher end due to aged wiring and more
                complex circuit layouts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £200 to £370. Properties with rubber-
                insulated wiring or multiple subboards require more inspection time and cost more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO (4+ bedrooms)</strong> — £350 to £700+. Fire alarm systems,
                emergency lighting, multiple consumer units, and communal areas significantly
                increase the inspection scope and duration.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Consumer unit upgrades — the most common remedial requirement from Reading EICRs —
          typically cost £450 to £750 including materials and labour. Some Reading electricians
          offer combined EICR and consumer unit upgrade packages at a reduced overall price.
        </p>
      </>
    ),
  },
  {
    id: 'finding-inspector',
    heading: 'Finding a Qualified EICR Inspector in Reading',
    content: (
      <>
        <p>
          Reading has good access to qualified electricians given its size and the density of the
          Thames Valley electrical contracting market. These steps will help you find a properly
          qualified EICR inspector.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme membership</strong> — use the NICEIC, NAPIT,
                or ELECSA online registers to find Reading-based electricians with inspection
                and testing qualifications. Registration confirms qualifications, insurance,
                and ongoing technical assessment by the scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify qualifications</strong> — the inspector should hold City and
                Guilds 2391 or C&G 2395 (Inspection and Testing) and a current BS 7671 18th
                Edition qualification (C&G 2382). Ask to see their scheme membership card or
                certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO inspection experience</strong> — for Reading HMOs, prefer inspectors
                with experience of HMO inspections including fire alarm system assessment and
                emergency lighting, which form part of the fixed electrical installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Obtain multiple quotes</strong> — two or three quotes from registered
                electricians provide a clear picture of the Reading market rate and help identify
                quotes that are either unrealistically cheap (suggesting inadequate inspection)
                or inflated.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in Reading',
    content: (
      <>
        <p>
          Reading's large and growing private rented sector — driven by its major tech employers,
          proximity to London, and the University of Reading — creates consistent and well-paid
          demand for EICR work. Thames Valley electricians who build a reputation for thorough,
          reliable inspection work can develop strong relationships with letting agents and
          landlords managing multiple Reading properties.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete Reading EICRs On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete reports on your phone while still at the Reading property. AI board
                  scanning, voice test entry, and instant PDF export mean landlords and letting
                  agents receive the completed report before you leave the site — an important
                  differentiator in a competitive market where professional landlords expect rapid
                  turnaround.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Reading Remedial Work Immediately</h4>
                <p className="text-white text-sm leading-relaxed">
                  When C1 or C2 observations are identified, quote the remedial work on the day
                  using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . Reading landlords must complete remedial work within 28 days — the electrician
                  who quotes on the day of the EICR consistently wins the follow-on job.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Reading EICR business with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. Complete more EICRs per day and win the remedial work. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRReadingPage() {
  return (
    <GuideTemplate
      title="EICR Reading | Electrical Inspection Reading"
      description="EICR Reading — costs, legal requirements, and what to expect from an Electrical Installation Condition Report in Reading. Guide for landlords, homeowners, and electricians covering the 2020 Regulations, Victorian wiring, HMO requirements, and 2026 pricing."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          EICR Reading:{' '}
          <span className="text-yellow-400">Electrical Inspection Guide 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about Electrical Installation Condition Reports in Reading — legal requirements under the 2020 Regulations, HMO licensing, Victorian and Edwardian property wiring, Thames Valley costs, and finding qualified inspectors."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Reading"
      relatedPages={relatedPages}
      ctaHeading="Complete Reading EICRs on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
