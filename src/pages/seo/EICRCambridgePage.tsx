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
  Scale,
  Zap,
  Search,
  Clock,
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EICR Guides', href: '/guides/eicr-for-landlords' },
  { label: 'EICR Cambridge', href: '/guides/eicr-cambridge' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'cambridge-costs', label: 'EICR Cost in Cambridge' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'local-housing', label: 'Cambridge Housing Stock' },
  { id: 'observation-codes', label: 'Observation Codes Explained' },
  { id: 'what-to-expect', label: 'What to Expect During an EICR' },
  { id: 'how-often', label: 'How Often Is an EICR Needed?' },
  { id: 'find-inspector', label: 'Finding a Qualified Inspector' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "An EICR (Electrical Installation Condition Report) is a formal inspection of a property's fixed electrical installation, carried out in accordance with BS 7671:2018+A3:2024 (Section 631). It produces a condition assessment using C1, C2, C3 and FI observation codes.",
  'Cambridge EICR costs are above the national average, driven by high property values, strong demand, and elevated local labour rates. Expect to pay between £140 and £250 for a two-bedroom flat and £200 to £360 for a three-bedroom house.',
  'Landlords in England must obtain a valid EICR before a new tenancy and renew it every five years. South Cambridgeshire District Council and Cambridge City Council enforce these requirements with fines of up to £30,000 for non-compliance.',
  'Cambridge has a very large private rented sector driven by the University of Cambridge, Anglia Ruskin University, and the booming technology sector. HMO density is among the highest in England outside London.',
  "Cambridge's housing stock includes Victorian and Edwardian terraced properties near the city centre, inter-war suburbs, and 1960s–1980s estates. Converted Victorian terraces converted into student flats are a major source of EICR demand and commonly return C2 findings.",
];

const faqs = [
  {
    question: 'How much does an EICR cost in Cambridge?',
    answer:
      'EICR prices in Cambridge are above the national average, reflecting high demand, elevated local wages, and the complexity of the housing stock. A one-bedroom flat typically costs £120 to £210. A two-bedroom flat costs £140 to £250. A three-bedroom house costs £200 to £360. Student HMOs with multiple consumer units cost significantly more. Cambridge city centre properties with Victorian wiring may cost more than modern out-of-town properties. Always obtain two or three quotes and be cautious of unusually low prices.',
  },
  {
    question: 'Is an EICR a legal requirement for Cambridge landlords?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Cambridge to obtain an EICR before a new tenancy begins and to renew it at least every five years. The EICR must be carried out by a qualified person registered with a competent person scheme. Copies must be provided to tenants within 28 days and to Cambridge City Council or South Cambridgeshire District Council within seven days if requested. Fines of up to £30,000 per breach apply.',
  },
  {
    question: 'What are the most common EICR findings in Cambridge properties?',
    answer:
      "Cambridge's Victorian terraced properties near the city centre commonly produce C2 findings for absent RCD protection on socket circuits (Regulation 411.3.3) and inadequate earthing and bonding. Rubber-insulated cables in unmodernised properties are a C1 or C2 concern. Student HMOs in converted Victorian terraces frequently have wiring from multiple eras, poor circuit identification, and consumer units that are inadequate for the number of occupants. 1960s to 1980s properties on estates such as King's Hedges and Abbey may have ageing PVC wiring approaching the end of its serviceable life.",
  },
  {
    question: 'How long does an EICR take in Cambridge?',
    answer:
      'A one-bedroom flat typically takes two to three hours. A three-bedroom house takes three to four hours. Victorian terraced houses converted into student HMOs may take four to five hours or more due to multiple consumer units, complex wiring from different eras, and the need to test fire alarm and emergency lighting circuits. Ensure the inspector has clear access to all rooms, the consumer unit, the meter position, and any loft spaces.',
  },
  {
    question: 'Does Cambridge City Council actively enforce EICR requirements?',
    answer:
      'Yes. Cambridge City Council and South Cambridgeshire District Council both enforce the Electrical Safety Standards Regulations in their respective areas. Cambridge City Council has a dedicated Housing Standards team that investigates tenant complaints, conducts inspections, and issues civil penalties for non-compliance. The council operates mandatory HMO licensing across the city, and EICR compliance is a condition of all HMO licences. Non-compliant landlords risk fines of up to £30,000 per breach and licence revocation.',
  },
  {
    question: 'Do University of Cambridge college properties need an EICR?',
    answer:
      'University-owned accommodation is generally exempt from the private rented sector regulations that apply to commercial landlords. However, many Cambridge colleges and the university also let accommodation to staff and non-student tenants which may fall within the regulations. Private landlords who sublet or rent properties near the university do not benefit from any exemption. College-owned properties let commercially must comply with the same EICR requirements as any other private landlord.',
  },
  {
    question: 'What happens if a Cambridge rental property has an Unsatisfactory EICR?',
    answer:
      'The landlord must arrange for remedial work to be completed within 28 days of receiving the EICR, or sooner if the inspector specifies. The work must be carried out by a qualified electrician, and written confirmation that the defects have been remedied must be provided to the tenant and to Cambridge City Council if requested. If C1 (immediate danger) observations are present, the affected circuit or installation may need to be isolated immediately and the remedial work completed before the tenant can safely use the installation.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-cost-uk',
    title: 'EICR Cost UK',
    description: 'National EICR pricing guide with breakdowns by property type and region.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-fail-rented-property',
    title: 'EICR Fail — Rented Property',
    description: 'What to do when a rented property receives an unsatisfactory EICR.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description:
      'Study for C&G 2391 with structured training modules covering periodic inspection.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-eicr',
    heading: 'What Is an EICR?',
    content: (
      <>
        <p>
          An EICR (Electrical Installation Condition Report) is a formal inspection and test of a
          property's fixed electrical installation. It covers the wiring, consumer unit, protective
          devices, earthing and bonding, socket outlets, light fittings, and all fixed electrical
          equipment.
        </p>
        <p>
          The report is produced in accordance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (Section 631), which specifies that an Electrical Installation Condition Report must be
          used for periodic inspection of existing installations. It is a detailed condition
          assessment — not a simple pass or fail — using standardised C1, C2, C3, and FI observation
          codes.
        </p>
        <p>
          The inspector conducts a visual inspection followed by a programme of electrical tests.
          Results are recorded on Schedules of Circuit Details and Test Results. The overall
          assessment is either Satisfactory or Unsatisfactory.
        </p>
      </>
    ),
  },
  {
    id: 'cambridge-costs',
    heading: 'EICR Cost in Cambridge (2026 Prices)',
    content: (
      <>
        <p>
          Cambridge EICR prices are above the national average, reflecting the city's high property
          values, strong demand, and the prevalence of older properties requiring more time to
          inspect. Below are typical 2026 prices:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Studio / one-bedroom flat</strong> — £120 to £210. Very common in the city
                centre and student areas near the colleges.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat</strong> — £140 to £250. Victorian and Edwardian
                conversions take longer to inspect than modern purpose-built flats.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £200 to £360. Victorian terraced houses in
                Romsey, Coleridge, and Petersfield are common in the private rented sector.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom+ house</strong> — £300 to £500+. Larger properties or
                multi-unit HMOs with complex wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO</strong> — £380 to £700+. Cambridge's extremely high HMO density means
                strong demand. HMOs have a broader inspection scope including fire alarm and
                emergency lighting systems.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover the inspection and report only. Remedial work is quoted and charged
          separately. Some Cambridge electricians offer combined EICR and remedial packages for
          portfolio landlords.
        </p>
      </>
    ),
  },
  {
    id: 'legal-requirements',
    heading: 'Legal Requirements for EICRs in England',
    content: (
      <>
        <p>
          The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
          apply to all private rented properties in Cambridge and South Cambridgeshire. The key
          requirements are:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before a new tenancy</strong> — landlords must obtain an EICR before a new
                tenant moves in. This applies to all new tenancies from 1 July 2020 and all existing
                tenancies from 1 April 2021.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Every five years</strong> — the EICR must be renewed at least every five
                years, or sooner if recommended by the inspector. BS 7671 Regulation 134.2 requires
                periodic inspection regimes to confirm installations remain safe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant notification</strong> — a copy of the EICR must be provided to the
                tenant within 28 days. New tenants must receive a copy before they move in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial work</strong> — C1 or C2 observations must be remedied within 28
                days. Written confirmation must be provided to the tenant and to the council if
                requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Penalties</strong> — Cambridge City Council and South Cambridgeshire
                District Council can impose civil penalties of up to £30,000 per breach and may
                revoke HMO licences for persistent non-compliance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'local-housing',
    heading: 'Cambridge Housing Stock and Common EICR Findings',
    content: (
      <>
        <p>
          Cambridge's housing stock reflects the city's long history and rapid growth as a
          technology hub. The private rented sector is dominated by Victorian and Edwardian terraced
          houses converted into flats and HMOs, with newer stock on expanding suburban estates to
          the north and south of the city:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Absent RCD protection in Victorian terraces</strong> — Regulation 411.3.3 of
                BS 7671 requires RCD protection on socket circuits not exceeding 20A. This is the
                most common C2 finding in Cambridge's large stock of Victorian terraced properties,
                many of which still have consumer units installed before RCD protection became
                standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multi-era wiring in student HMOs</strong> — Victorian terraces converted
                into student houses have wiring from multiple periods. Original rubber-insulated
                cables are sometimes present alongside later PVC additions, with poor circuit
                documentation. Identifying safe sample sizes for inspection is a skilled task.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inadequate earthing in conversions</strong> — Victorian houses converted
                into multiple flats often have shared or inadequate earthing arrangements,
                undersized protective conductors, and absent main protective bonding to gas and
                water services. These are common C2 findings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ageing 1960s–1980s estate wiring</strong> — properties on King's Hedges,
                Abbey, Cherry Hinton, and other estates may have PVC wiring approaching the end of
                its serviceable life. Brittle insulation and overloaded circuits are common findings
                in these properties.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'observation-codes',
    heading: 'EICR Observation Codes Explained',
    content: (
      <>
        <p>
          Every observation on an EICR is classified using one of four codes defined in{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            BS 7671 and the associated model forms
          </SEOInternalLink>
          :
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C1 — Danger Present</h3>
            <p className="text-white text-sm leading-relaxed">
              Risk of injury exists. Immediate remedial action required. The inspector may recommend
              disconnecting the circuit. Common in Cambridge properties with crumbling
              rubber-insulated cables or exposed live conductors.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C2 — Potentially Dangerous</h3>
            <p className="text-white text-sm leading-relaxed">
              Could become dangerous. Urgent remedial action required. Absent RCD protection
              (Regulation 411.3.3) is the most common C2 finding in Cambridge, followed by
              inadequate earthing and deteriorated wiring insulation.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C3 — Improvement Recommended</h3>
            <p className="text-white text-sm leading-relaxed">
              Not immediately dangerous. C3 alone does not make the EICR Unsatisfactory. Common
              examples include older but functional accessories and socket outlets in Victorian
              properties.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">FI — Further Investigation</h3>
            <p className="text-white text-sm leading-relaxed">
              The inspector could not fully assess a part of the installation. Common in Cambridge
              HMOs where cables run beneath solid floors or behind fixed kitchen units and bathroom
              fittings.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'what-to-expect',
    heading: 'What to Expect During an EICR',
    content: (
      <>
        <p>
          The EICR involves a visual inspection followed by a programme of testing. The inspector
          needs access to all rooms, the consumer unit, the meter, and any outbuildings. Power will
          be isolated during dead testing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection</strong> — consumer unit, protective devices, cable
                condition, socket outlets, light fittings, switches, and earthing and bonding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dead testing</strong> — continuity of protective conductors, ring final
                circuit continuity, and insulation resistance (minimum 1 megohm at 500V DC).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Live testing</strong> — earth fault loop impedance (Ze and Zs), prospective
                fault current, RCD operation times, and polarity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Report completion</strong> — the inspector completes the EICR including
                Schedules of Circuit Details and Test Results as required by Section 631, with
                observation codes and an overall assessment.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'how-often',
    heading: 'How Often Is an EICR Needed?',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Private rented property</strong> — at least every 5 years (legal requirement
                under the 2020 Regulations).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Owner-occupied domestic</strong> — every 10 years recommended. Properties
                over 25 years old should be inspected every 5 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO</strong> — every 5 years minimum under Cambridge City Council HMO
                licensing conditions. A shorter interval may be required for properties with older
                wiring or high occupancy.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Change of tenancy</strong> — a new EICR is required before a new tenant
                moves into any privately rented property, even if the previous EICR has not expired.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'find-inspector',
    heading: 'Finding a Qualified EICR Inspector in Cambridge',
    content: (
      <>
        <p>
          For landlord compliance, the EICR must be carried out by a qualified and competent person
          registered with an approved competent person scheme.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — search the NICEIC, NAPIT, or ELECSA
                registers for Cambridge-based inspectors accepted by Cambridge City Council and
                South Cambridgeshire District Council.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications</strong> — City & Guilds 2391 (Inspection and Testing) or the
                2394/2395 combination, plus a current 18th Edition (C&G 2382) qualification.
                Experience with Victorian terraced properties and student HMOs is an advantage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance</strong> — the inspector should carry professional indemnity
                insurance. Scheme-registered electricians are required to maintain adequate cover.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in Cambridge',
    content: (
      <>
        <p>
          Cambridge's enormous private rented sector, driven by two universities and a growing
          technology industry workforce, creates very strong and consistent demand for EICR work.
          The high proportion of Victorian terraced HMOs means that EICRs frequently identify
          substantial remedial work, making Cambridge a commercially attractive market for thorough
          inspectors.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EICRs on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete reports on your phone while still on site. AI board scanning reads the
                  consumer unit, voice entry records test results, and instant PDF export delivers
                  the report before you leave.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Remedial Work Instantly</h4>
                <p className="text-white text-sm leading-relaxed">
                  When the EICR identifies C1 or C2 observations, quote the remedial work on the day
                  using the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Cambridge landlords must act within 28 days — quoting on the day of the EICR is
                  the most effective way to win the follow-on work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete EICRs faster with Elec-Mate"
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

export default function EICRCambridgePage() {
  return (
    <GuideTemplate
      title="EICR Cambridge | Electrical Safety Certificate Cost 2026"
      description="EICR costs in Cambridge for 2026. Landlord legal requirements, Cambridge City Council enforcement, Victorian terraced HMO findings, observation codes, and how to find a qualified inspector. Prices from £120 for a flat."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR Cambridge:{' '}
          <span className="text-yellow-400">Electrical Safety Certificate Cost 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about EICRs in Cambridge — costs by property type, landlord legal requirements, council enforcement, Victorian and HMO housing stock findings, observation codes, and how to find a qualified inspector."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Cambridge"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone — Faster Than Paper"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
