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
  { label: 'EICR Leeds', href: '/guides/eicr-leeds' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'leeds-costs', label: 'EICR Cost in Leeds' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'student-hmos', label: 'Student HMOs in Leeds' },
  { id: 'observation-codes', label: 'Observation Codes Explained' },
  { id: 'back-to-backs', label: 'Back-to-Back Terraces' },
  { id: 'what-to-expect', label: 'What to Expect During an EICR' },
  { id: 'how-often', label: 'How Often Is an EICR Needed?' },
  { id: 'find-inspector', label: 'Finding a Qualified Inspector' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "An EICR (Electrical Installation Condition Report) is a formal inspection of a property's fixed electrical installation, documented per BS 7671:2018+A3:2024 (Section 631). It classifies defects as C1 (danger present), C2 (potentially dangerous), C3 (improvement recommended), or FI (further investigation).",
  'Leeds EICR costs are competitive. Expect £110 to £190 for a two-bedroom flat, £160 to £270 for a three-bedroom terraced house, and £230 to £380 for a four-bedroom detached house.',
  'Since 1 April 2021, landlords in England must have a valid EICR renewed at least every five years. Leeds City Council enforces through its Private Rented Sector team and can impose fines of up to £30,000.',
  'Leeds has a large student housing market centred on Headingley, Hyde Park, Woodhouse, and Burley. Student HMOs require HMO licensing with a valid EICR as a mandatory condition.',
  'Leeds has a unique housing type — back-to-back terraced houses — which present specific EICR challenges including shared walls on three sides, limited cable routes, and aged wiring in confined spaces. Northern Powergrid is the DNO for Leeds.',
];

const faqs = [
  {
    question: 'How much does an EICR cost in Leeds?',
    answer:
      'Leeds EICR prices are competitive. A one-bedroom flat costs £90 to £150. A two-bedroom flat or terraced house costs £110 to £190. A three-bedroom terraced house costs £160 to £270. A four-bedroom detached house costs £230 to £380. Student HMOs with multiple consumer units cost £280 to £550+. Prices are generally lower than London and slightly below the national average.',
  },
  {
    question: 'Is an EICR legally required for landlords in Leeds?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply to all private rented properties in England, including Leeds. Landlords must have a valid EICR renewed at least every five years. Leeds City Council can impose civil penalties of up to £30,000 per breach.',
  },
  {
    question: 'What are back-to-back terraced houses and why do they affect EICRs?',
    answer:
      'Back-to-back houses are a type of terraced house where the rear wall is shared with another row of houses behind. This means the house has party walls on three sides (both sides and the rear), with windows and a front door on one side only. Leeds has more surviving back-to-back houses than any other UK city. For EICRs, this creates challenges: cable routes are extremely limited, access to wiring behind walls is restricted, ventilation for electrical equipment is poor, and original wiring may be very difficult to trace or replace. Inspectors often record FI observations in back-to-backs where cables cannot be accessed.',
  },
  {
    question: 'What happens if my Leeds property fails an EICR?',
    answer:
      "If the EICR is Unsatisfactory (C1 or C2 observations), the landlord must complete remedial work within 28 days or sooner if the inspector specifies. Written confirmation must be provided to the tenant and Leeds City Council if requested. The council can arrange remedial work at the landlord's expense if the landlord fails to act.",
  },
  {
    question: 'Who is the electricity supplier for Leeds?',
    answer:
      'Northern Powergrid is the Distribution Network Operator (DNO) for the Leeds area. They maintain the electricity network including cables, substations, and service connections. If the EICR inspector finds supply-side issues (deteriorated cut-out, damaged service cable, earth provision problems), these must be reported to Northern Powergrid. The inspector cannot work on DNO-owned equipment.',
  },
  {
    question: 'Do student HMOs in Leeds need an EICR?',
    answer:
      'Yes. Student HMOs in Leeds require both HMO licensing (mandatory for five or more occupants forming two or more households, and additional licensing may apply to smaller HMOs) and a valid EICR. The EICR is a mandatory condition of the HMO licence. Leeds City Council actively inspects HMOs in student areas — Headingley, Hyde Park, Woodhouse, and Burley — particularly during the September letting season.',
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
          property's fixed electrical installation. It covers wiring, consumer unit, protective
          devices, earthing, bonding, sockets, switches, and all fixed electrical equipment.
        </p>
        <p>
          The report is documented in accordance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (Section 631), which requires an EICR for periodic inspection of existing installations.
          The inspector carries out a visual inspection and programme of testing, classifying each
          observation using codes (C1, C2, C3, FI). The overall installation is assessed as
          Satisfactory or Unsatisfactory.
        </p>
      </>
    ),
  },
  {
    id: 'leeds-costs',
    heading: 'EICR Cost in Leeds (2026 Prices)',
    content: (
      <>
        <p>
          Leeds EICR prices are competitive, reflecting lower labour rates than London and the South
          East. Below are typical 2026 prices:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Studio / one-bedroom flat</strong> — £90 to £150. Common in Leeds city
                centre apartment developments and converted terraces.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat or terraced house</strong> — £110 to £190. The most common
                property type for EICR work in Leeds.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom terraced house</strong> — £160 to £270. Through-terraces in
                Headingley and Hyde Park are quicker than back-to-back terraces.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom+ detached house</strong> — £230 to £380+. Larger properties in
                suburbs like Roundhay, Alwoodley, and Horsforth.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student HMO</strong> — £280 to £550+. Multiple consumer units, fire alarm
                systems, and emergency lighting. High demand in September when the academic year
                starts.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Prices cover the inspection, testing, and report only. Remedial work is quoted separately.
          Electricians offering EICR services to landlords with multiple properties in the Leeds
          student areas can build consistent workflow through portfolio arrangements.
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
          require all private rented properties in England to have a valid EICR. The key
          requirements are:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory EICR</strong> — every private rented property must have a valid
                EICR, renewed at least every five years. Regulation 134.2 of BS 7671 requires
                periodic inspection to confirm installations remain safe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before new tenancies</strong> — the EICR must be obtained before a new
                tenant moves in. A copy must be given to the tenant within 28 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial work</strong> — C1 or C2 observations must be remediated within 28
                days (or sooner if specified). Regulation 132.13 requires detailed circuit-level
                findings and remedial action schedules in the report.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fines up to £30,000</strong> — Leeds City Council can impose civil penalties
                for non-compliance. The council has increased enforcement activity in recent years,
                particularly in areas with high concentrations of HMOs.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'student-hmos',
    heading: 'Student HMOs in Leeds',
    content: (
      <>
        <p>
          Leeds has two major universities (University of Leeds and Leeds Beckett University) and a
          large student population creating significant demand for HMO accommodation. The main
          student housing areas are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Headingley and Hyde Park</strong> — the traditional student heartlands with
                dense concentrations of terraced houses converted to HMOs. Many of these properties
                were built in the Victorian and Edwardian periods and have been adapted multiple
                times.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Woodhouse and Burley</strong> — close to both university campuses with a mix
                of terraces and back-to-back houses. Many properties have had consumer units added
                for individual rooms or bedsits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Licensing requirements</strong> — mandatory HMO licensing applies to
                properties with five or more occupants forming two or more households. Leeds City
                Council also operates additional licensing in some areas. A valid EICR is a
                mandatory condition of all HMO licences.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire safety</strong> — HMOs require fire alarm systems and emergency
                lighting, which are included in the EICR scope. Regulation 710.415.2 of BS 7671
                addresses requirements for HMOs including AFDD considerations, clear labelling, and
                fire safety documentation for each dwelling unit.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The student letting cycle in Leeds creates seasonal demand peaks. Landlords typically
          arrange EICRs and remedial work between May and August, before the September intake. EICR
          demand in these areas drops during term time when access to occupied properties is more
          difficult.
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
          Each defect is classified using one of four codes defined in the model forms accompanying{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">BS 7671</SEOInternalLink>
          :
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C1 — Danger Present</h3>
            <p className="text-white text-sm leading-relaxed">
              Risk of injury exists. Immediate action required. The inspector may disconnect the
              dangerous circuit. In Leeds back-to-backs, common C1 findings include exposed live
              conductors in damp cellars and severely degraded cable insulation.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C2 — Potentially Dangerous</h3>
            <p className="text-white text-sm leading-relaxed">
              Could become dangerous. Urgent action needed. Common C2 findings include lack of RCD
              protection on socket circuits, absent main bonding, and obsolete rewirable fuse boards
              without protective devices.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C3 — Improvement Recommended</h3>
            <p className="text-white text-sm leading-relaxed">
              Not dangerous but improvement would enhance safety. Does not make the EICR
              Unsatisfactory. Examples: older accessories in working condition, absence of
              supplementary bonding where not required.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">FI — Further Investigation</h3>
            <p className="text-white text-sm leading-relaxed">
              Cannot fully assess. Common in back-to-back terraces where wiring is concealed in
              shared party walls on three sides and cannot be accessed without destructive
              investigation.
            </p>
          </div>
        </div>
        <p>
          The EICR is <strong>Unsatisfactory</strong> if any C1 or C2 observations are present.
        </p>
      </>
    ),
  },
  {
    id: 'back-to-backs',
    heading: 'Back-to-Back Terraces: Unique Leeds EICR Challenges',
    content: (
      <>
        <p>
          Leeds has more surviving back-to-back terraced houses than any other city in the UK. These
          properties, built primarily in the Victorian era, share party walls on three sides (both
          sides and the rear), with only the front wall having windows and a door. This creates
          unique challenges for EICR inspectors:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Limited cable routes</strong> — with three shared walls, cable routes are
                severely restricted. Wiring must run along the front wall, through floors, or in
                surface-mounted conduit or trunking. Original concealed cables may follow
                unpredictable routes through the limited available wall space.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inaccessible wiring</strong> — the three shared party walls mean that much
                of the wiring is entirely inaccessible without removing plaster. Inspectors
                frequently record FI (Further Investigation) observations where cable condition
                cannot be assessed visually.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Damp and cellar issues</strong> — many Leeds back-to-backs have cellars that
                suffer from damp due to the lack of through-ventilation. Electrical installations in
                these cellars may have inadequate IP rating, corroded accessories, and deteriorated
                cable insulation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shared supplies and earthing</strong> — some back-to-back properties share
                service cables or have earthing arrangements that run through adjoining properties.
                The inspector must carefully verify the earthing arrangement and ensure the property
                has an independent protective earth connection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Northern Powergrid supply</strong> — Northern Powergrid is the DNO for
                Leeds. Older back-to-back properties may have deteriorated service cut-outs, aged
                service cables, and inadequate earthing provision. Supply-side issues must be
                reported to Northern Powergrid for assessment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians should allow 30 to 60 minutes extra when quoting EICRs for back-to-back
          terraces compared to through-terraces of the same size. The limited access and higher
          likelihood of FI observations means the report takes longer to complete accurately.
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
          The EICR involves a visual inspection and electrical testing. The inspector needs access
          to every room, the consumer unit, meter position, cellar (if present), and any
          outbuildings. The power will be off for 30 to 60 minutes during dead testing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection</strong> — consumer unit, protective devices, cable
                condition, sockets, lights, switches, earthing and bonding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dead testing</strong> — continuity of protective conductors, ring final
                circuit continuity, insulation resistance (500V DC, minimum 1 megohm).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Live testing</strong> — earth fault loop impedance (Ze, Zs), prospective
                fault current, RCD operation times, polarity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Report</strong> — EICR with Schedules of Circuit Details and Test Results
                per Section 631, observations with codes, overall assessment, and recommended next
                inspection date.
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
        <p>
          BS 7671 Section 6 requires periodic inspection at intervals suited to the property type:
        </p>
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
                <strong>Owner-occupied</strong> — every 10 years recommended, or 5 years for older
                properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial</strong> — every 5 years (3 years for higher-risk).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Change of occupancy</strong> — recommended at each change of tenant.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Back-to-back terraces with multiple FI observations may receive a recommended next
          inspection of 3 years rather than the standard 5.
        </p>
      </>
    ),
  },
  {
    id: 'find-inspector',
    heading: 'Finding a Qualified EICR Inspector in Leeds',
    content: (
      <>
        <p>
          For landlord compliance, the EICR must be carried out by a qualified and competent person:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — NICEIC, NAPIT, ELECSA, and STROMA
                maintain registers of qualified electricians. Search for Leeds-based inspectors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications</strong> — C&G 2391 (Inspection and Testing) or C&G
                2394/2395, plus current BS 7671 (C&G 2382).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local experience</strong> — an inspector familiar with Leeds property types,
                especially back-to-back terraces and student HMOs, will be more efficient and
                accurate.
              </span>
            </li>
          </ul>
        </div>
        <p>
          As with all cities, be cautious of very low prices. A proper EICR takes time, calibrated
          instruments, and expertise.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in Leeds',
    content: (
      <>
        <p>
          Leeds offers strong EICR demand driven by the student housing market, mandatory landlord
          compliance, and the city's large private rented sector. Electricians specialising in EICR
          work in the Headingley and Hyde Park areas can build a consistent year-round workflow.
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
                  to complete reports on your phone while on site. AI board scanning, voice test
                  entry, and instant PDF export. Finish the report before you leave the property.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Remedial Work on the Spot</h4>
                <p className="text-white text-sm leading-relaxed">
                  When C1 or C2 observations are found, quote immediately with the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Landlords have 28 days to act — the electrician who quotes on the day wins the
                  work.
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

export default function EICRLeedsPage() {
  return (
    <GuideTemplate
      title="EICR Leeds | Electrical Inspection Certificate 2026"
      description="EICR costs in Leeds for 2026. Landlord legal requirements, student HMO licensing, back-to-back terrace challenges, observation codes, and how to find a qualified inspector. Prices from £90 for a flat to £380+ for a house."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR Leeds:{' '}
          <span className="text-yellow-400">Electrical Inspection Certificate 2026</span>
        </>
      }
      heroSubtitle="Complete guide to EICRs in Leeds — costs by property type, landlord legal requirements, student HMO licensing, back-to-back terrace challenges, and finding a qualified inspector."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Leeds"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone — Faster Than Paper"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
