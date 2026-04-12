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
  Building2,
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
  { label: 'EICR Birmingham', href: '/guides/eicr-birmingham' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'birmingham-costs', label: 'EICR Cost in Birmingham' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'hmo-enforcement', label: 'HMO and Article 4 Areas' },
  { id: 'observation-codes', label: 'Observation Codes Explained' },
  { id: 'birmingham-property', label: 'Birmingham Property Challenges' },
  { id: 'what-to-expect', label: 'What to Expect During an EICR' },
  { id: 'how-often', label: 'How Often Is an EICR Needed?' },
  { id: 'find-inspector', label: 'Finding a Qualified Inspector' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "An EICR (Electrical Installation Condition Report) is a formal inspection of a property's fixed electrical installation, documented in accordance with BS 7671:2018+A3:2024 (Section 631). It classifies defects using observation codes (C1, C2, C3, FI) and assesses the installation as Satisfactory or Unsatisfactory.",
  'Birmingham EICR costs are moderate compared to London. Expect £120 to £200 for a two-bedroom flat, £170 to £280 for a three-bedroom semi-detached house, and £250 to £400 for larger properties.',
  'Since 1 April 2021, landlords in England must have a valid EICR for every private rented property, renewed every five years. Birmingham City Council enforces through its Environmental Health and Private Rented Sector teams.',
  'Birmingham has Article 4 directions in areas such as Selly Oak, Edgbaston, and Harborne that restrict HMO conversions. Existing HMOs in these areas require licensing, and a valid EICR is a mandatory licence condition.',
  'Western Power Distribution (now National Grid Electricity Distribution) is the DNO for Birmingham. Supply-side issues in older properties include deteriorated cut-outs and earthing deficiencies.',
];

const faqs = [
  {
    question: 'How much does an EICR cost in Birmingham?',
    answer:
      'Birmingham EICR prices are moderate. A one-bedroom flat typically costs £100 to £160. A two-bedroom flat costs £120 to £200. A three-bedroom semi-detached house costs £170 to £280. A four-bedroom detached house costs £250 to £400. HMOs with multiple consumer units cost £300 to £600+. Prices vary slightly between city centre and suburban areas.',
  },
  {
    question: 'Is an EICR legally required for landlords in Birmingham?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply to all private rented properties in England, including Birmingham. Landlords must have a valid EICR renewed at least every five years. Birmingham City Council can impose civil penalties of up to £30,000 per breach for non-compliance.',
  },
  {
    question: 'What are the Article 4 HMO areas in Birmingham?',
    answer:
      'Birmingham City Council has Article 4 directions in place in Selly Oak, Edgbaston, Harborne, and parts of Erdington. These require planning permission for the change of use from a dwelling (C3) to a small HMO (C4). Existing HMOs in these areas must be licensed, and a valid EICR is a condition of the licence. The Article 4 areas primarily target streets with high concentrations of student housing near the University of Birmingham and Aston University.',
  },
  {
    question: 'What happens if my Birmingham property fails an EICR?',
    answer:
      "If the EICR is Unsatisfactory (C1 or C2 observations present), the landlord must complete remedial work within 28 days or sooner if specified by the inspector. Written confirmation of completed remedial work must be provided to the tenant and to Birmingham City Council if requested. The council can arrange for remedial work to be carried out at the landlord's expense if the landlord fails to act.",
  },
  {
    question: 'Who is the electricity supplier for Birmingham?',
    answer:
      'National Grid Electricity Distribution (formerly Western Power Distribution) is the Distribution Network Operator (DNO) for the Birmingham area. They maintain the network infrastructure including cables, substations, and service connections. If the EICR inspector identifies supply-side issues (deteriorated cut-out, damaged service cable, earth provision problems), these must be reported to National Grid. The inspector cannot work on DNO equipment.',
  },
  {
    question: 'How long does an EICR take for a Birmingham semi-detached house?',
    answer:
      'A typical three-bedroom semi-detached house with 8 to 12 circuits takes 2.5 to 3.5 hours. Properties with older wiring, multiple extensions, or conservatories may take longer. The inspector needs access to all rooms, the consumer unit, meter position, loft space, garage, and any outbuildings. The power will be off for 30 to 60 minutes during dead testing.',
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
          devices, earthing, bonding, sockets, switches, and all fixed electrical equipment.
        </p>
        <p>
          The report is documented in accordance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (Section 631), which specifies that an EICR must be used for periodic inspection of
          existing installations. The inspector carries out a visual inspection and a programme of
          testing, recording results on Schedules of Circuit Details and Test Results. Each
          observation is classified using codes (C1, C2, C3, FI) that indicate severity.
        </p>
        <p>
          The overall installation is assessed as either Satisfactory or Unsatisfactory. An
          Unsatisfactory result means one or more C1 (danger present) or C2 (potentially dangerous)
          observations were found.
        </p>
      </>
    ),
  },
  {
    id: 'birmingham-costs',
    heading: 'EICR Cost in Birmingham (2026 Prices)',
    content: (
      <>
        <p>
          Birmingham EICR prices are moderate — lower than London and the South East but comparable
          to other major cities in the Midlands. Below are typical 2026 prices:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Studio / one-bedroom flat</strong> — £100 to £160. Quick inspection with 3
                to 5 circuits. Common in city centre developments and converted houses.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat or terraced house</strong> — £120 to £200. The most common
                property type for EICR work in Birmingham.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom semi-detached</strong> — £170 to £280. Birmingham has large
                numbers of 1930s semi-detached houses in suburbs like Hall Green, Acocks Green, and
                Kings Heath with 8 to 12 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom+ detached house</strong> — £250 to £400+. Properties with
                extensions, conservatories, or detached garages with separate supplies increase the
                scope.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO (House in Multiple Occupation)</strong> — £300 to £600+. Student HMOs in
                Selly Oak and Edgbaston are common. Multiple consumer units, fire alarm systems, and
                emergency lighting are all within scope.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Prices include the inspection, testing, and report. Remedial work is quoted separately.
          Landlords with multiple properties can often negotiate portfolio rates with local
          electricians.
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
          apply to all private rented properties in England, including Birmingham. The key
          requirements are:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory EICR</strong> — every private rented property must have a valid
                EICR, carried out by a qualified person and renewed at least every five years. BS
                7671 requires periodic inspection regimes to confirm installations remain safe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before new tenancies</strong> — the EICR must be obtained before a new
                tenant moves in. A copy must be provided to the tenant within 28 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial work</strong> — C1 or C2 observations must be remediated within 28
                days (or sooner if the inspector specifies). Regulation 132.13 requires a periodic
                inspection report for rented properties with detailed circuit-level findings and
                remedial action schedules.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Penalties</strong> — Birmingham City Council can impose civil penalties of
                up to £30,000 per breach. The council has an active Private Rented Sector
                enforcement team that investigates complaints and carries out proactive inspections.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Birmingham City Council also has powers under the Housing Act 2004 to serve Improvement
          Notices where electrical hazards are identified. Non-compliance with an Improvement Notice
          is a criminal offence.
        </p>
      </>
    ),
  },
  {
    id: 'hmo-enforcement',
    heading: 'HMO Licensing and Article 4 Areas in Birmingham',
    content: (
      <>
        <p>
          Birmingham has a significant HMO (House in Multiple Occupation) sector, particularly
          around its two universities. The council uses multiple tools to regulate HMOs:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory HMO licensing</strong> — properties with five or more occupants
                forming two or more households require a mandatory HMO licence. A valid EICR is a
                condition of the licence. Birmingham has a large number of licensed HMOs in areas
                such as Selly Oak, Edgbaston, Handsworth, and Sparkbrook.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Article 4 directions</strong> — Birmingham City Council has Article 4
                directions in Selly Oak, Edgbaston, Harborne, and parts of Erdington. These remove
                permitted development rights for converting a dwelling (C3 use class) to a small HMO
                (C4 use class), requiring planning permission instead. Existing HMOs in Article 4
                areas must comply with all licensing conditions including a valid EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AFDD requirements in HMOs</strong> — Regulation 710.415.2 of BS 7671
                addresses AFDD (Arc Fault Detection Device) requirements in HMOs with multiple
                consumer units, requiring clear labelling, circuit schedules, and fire safety
                documentation for each dwelling unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Proactive enforcement</strong> — Birmingham City Council conducts proactive
                inspections of suspected unlicensed HMOs, particularly during the student letting
                season (August to October). Landlords found operating without a licence face
                prosecution and Rent Repayment Orders.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Landlords with HMOs in Birmingham should ensure both the EICR and the fire alarm system
          certification are current. Fire alarm and emergency lighting form part of the EICR scope
          in HMOs.
        </p>
      </>
    ),
  },
  {
    id: 'observation-codes',
    heading: 'EICR Observation Codes Explained',
    content: (
      <>
        <p>
          Each defect found during an EICR is classified using one of four observation codes as
          defined in the model forms accompanying{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">BS 7671</SEOInternalLink>
          :
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C1 — Danger Present</h3>
            <p className="text-white text-sm leading-relaxed">
              Risk of injury exists. Immediate action is required. The inspector may disconnect the
              circuit on the spot. Common C1 findings in Birmingham include exposed live conductors,
              missing consumer unit covers, and severely damaged cables in loft spaces.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C2 — Potentially Dangerous</h3>
            <p className="text-white text-sm leading-relaxed">
              Could become dangerous. Urgent remedial action is needed. Common C2 observations
              include lack of RCD protection on socket circuits (BS 7671 Section 411), absent main
              bonding, and overloaded circuits in older properties with rewirable fuse boards.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C3 — Improvement Recommended</h3>
            <p className="text-white text-sm leading-relaxed">
              Not dangerous but improvement would enhance safety. Does not make the EICR
              Unsatisfactory. Examples include older accessories in working condition and absence of
              supplementary bonding where not required by current regulations.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">FI — Further Investigation</h3>
            <p className="text-white text-sm leading-relaxed">
              Cannot fully assess and further investigation is needed. Common in Birmingham
              properties with extensions where wiring is concealed behind plasterboard, under
              conservatory floors, or in cavity walls.
            </p>
          </div>
        </div>
        <p>
          The EICR is <strong>Unsatisfactory</strong> if any C1 or C2 observations are recorded. C3
          and FI observations alone do not trigger an Unsatisfactory result.
        </p>
      </>
    ),
  },
  {
    id: 'birmingham-property',
    heading: 'Birmingham Property Challenges for EICR Inspectors',
    content: (
      <>
        <p>Birmingham's housing stock presents several common challenges for EICR inspectors:</p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>1930s semi-detached houses</strong> — Birmingham has vast numbers of
                inter-war semis, many of which have been rewired at least once but may still have
                original wiring in parts of the installation (typically in the loft or under the
                ground floor). Mixed vintages of wiring within the same property are common.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multiple extensions</strong> — Birmingham properties frequently have rear
                extensions, conservatories, loft conversions, and garage conversions. Each extension
                may have been wired at a different time, potentially by different installers, with
                different cable types and installation methods. The inspector must trace and test
                each addition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Converted HMOs</strong> — properties converted from family homes to HMOs may
                have had consumer units added in individual rooms, with cables run through floors
                and walls in ways that do not comply with current regulations. Fire separation
                between units may have been compromised by cable penetrations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>National Grid Electricity Distribution</strong> — formerly Western Power
                Distribution (WPD), this is the DNO for Birmingham. Common supply-side findings
                include aged service cut-outs, deteriorated earthing provision, and PME terminations
                requiring verification. Supply-side issues must be reported to the DNO — the
                inspector cannot work on this equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter position access</strong> — in some older Birmingham properties and
                flats, the electricity meter is in a shared cupboard or external meter box. The
                inspector needs access to verify the earthing arrangement and test the supply-side
                earth (Ze). Coordinating access with multiple tenants or the managing agent can add
                time.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians quoting EICRs in Birmingham should account for the property age and any
          visible extensions. A 1930s semi with a rear extension and loft conversion may need 30 to
          60 minutes more than a similar-sized modern build.
        </p>
      </>
    ),
  },
  {
    id: 'what-to-expect',
    heading: 'What to Expect During an EICR',
    content: (
      <>
        <p>
          The EICR process includes a visual inspection and a programme of electrical testing. The
          inspector needs access to every room, the consumer unit, meter position, loft (if
          accessible), garage, and any outbuildings. The power will be off for part of the testing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection</strong> — examination of the consumer unit, protective
                devices, cable condition, sockets, light fittings, switches, earthing and bonding
                connections, and all accessible wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dead testing</strong> — supply isolated: continuity of protective
                conductors, ring final circuit continuity, insulation resistance (500V DC, minimum 1
                megohm).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Live testing</strong> — supply restored: earth fault loop impedance (Ze and
                Zs), prospective fault current, RCD operation times, polarity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Report</strong> — completed EICR with Schedules of Circuit Details and Test
                Results as required by Section 631, including observations, codes, overall
                assessment, and recommended next inspection date.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Prepare by clearing access to the consumer unit and meter, removing items from in front of
          sockets, and ensuring all rooms are accessible. If the property is tenanted, arrange
          access in advance.
        </p>
      </>
    ),
  },
  {
    id: 'how-often',
    heading: 'How Often Is an EICR Needed?',
    content: (
      <>
        <p>BS 7671 requires periodic inspection at intervals suited to the property type:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Private rented (England)</strong> — at least every 5 years (legal
                requirement).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Owner-occupied domestic</strong> — every 10 years recommended, or every 5
                years for older properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial premises</strong> — every 5 years (3 years for higher-risk
                environments).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Change of occupancy</strong> — recommended when a property changes tenant.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The inspector may recommend a shorter interval if the installation condition warrants it.
        </p>
      </>
    ),
  },
  {
    id: 'find-inspector',
    heading: 'Finding a Qualified EICR Inspector in Birmingham',
    content: (
      <>
        <p>
          For landlord compliance, the EICR must be carried out by a qualified and competent person,
          ideally registered with a competent person scheme:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — NICEIC, NAPIT, ELECSA, and STROMA all
                maintain searchable registers of qualified electricians. Search for Birmingham-based
                inspectors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications</strong> — C&G 2391 (Inspection and Testing) or C&G
                2394/2395, plus a current BS 7671 qualification (C&G 2382).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local knowledge</strong> — an inspector experienced with Birmingham property
                types (1930s semis, converted HMOs, Victorian terraces) will work more efficiently
                and produce more accurate reports.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Be wary of extremely cheap EICR offers. A compliant EICR for a three-bedroom house takes
          at least 2.5 hours of on-site work plus report completion time.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in Birmingham',
    content: (
      <>
        <p>
          Birmingham is the UK's second largest city with a massive private rented sector. The
          combination of mandatory EICRs, HMO licensing, and Article 4 enforcement creates strong
          and consistent demand for qualified inspectors.
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
                  to complete reports on your phone on site. AI board scanning, voice test entry,
                  and instant PDF export. Send the report to the landlord before you leave.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Remedial Work Immediately</h4>
                <p className="text-white text-sm leading-relaxed">
                  When C1 or C2 observations are found, quote the remedial work on the spot with the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Landlords must act within 28 days — deliver the quote on the day of the EICR to
                  win the job.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete EICRs faster with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRBirminghamPage() {
  return (
    <GuideTemplate
      title="EICR Birmingham | Electrical Safety Report Cost 2026"
      description="EICR costs in Birmingham for 2026. Landlord legal requirements, Article 4 HMO areas, council enforcement, observation codes explained, and how to find a qualified inspector. Prices from £100 for a flat to £400+ for a house."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR Birmingham:{' '}
          <span className="text-yellow-400">Electrical Safety Report Cost 2026</span>
        </>
      }
      heroSubtitle="Complete guide to EICRs in Birmingham — costs by property type, landlord legal requirements, Article 4 HMO areas, council enforcement, observation codes, and finding a qualified inspector."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Birmingham"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone — Faster Than Paper"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
