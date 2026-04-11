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
  { label: 'EICR Manchester', href: '/guides/eicr-manchester' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'manchester-costs', label: 'EICR Cost in Manchester' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'selective-licensing', label: 'Selective Licensing Areas' },
  { id: 'observation-codes', label: 'Observation Codes Explained' },
  { id: 'terraced-houses', label: 'Terraced House Challenges' },
  { id: 'what-to-expect', label: 'What to Expect During an EICR' },
  { id: 'how-often', label: 'How Often Is an EICR Needed?' },
  { id: 'find-inspector', label: 'Finding a Qualified Inspector' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "An EICR (Electrical Installation Condition Report) is a formal inspection of a property's fixed wiring, documented in accordance with BS 7671:2018+A3:2024 (Section 631). It assesses whether the installation is safe and identifies any defects using observation codes (C1, C2, C3, FI).",
  'Manchester EICR costs are competitive compared to London. Expect £120 to £200 for a two-bedroom flat, £180 to £300 for a three-bedroom terraced house, and £250 to £400 for a four-bedroom detached house.',
  'Since 1 April 2021, landlords in England must have a valid EICR for every private rented property, renewed at least every five years. Manchester City Council enforces this through its Private Rented Sector team with fines of up to £30,000.',
  'Selective licensing schemes in Manchester (including parts of Moss Side, Rusholme, Fallowfield, and Old Moat) require landlords to hold a property licence with a valid EICR as a condition.',
  'Manchester has a high proportion of Victorian and Edwardian terraced houses with common inspection challenges including shared neutral cables between properties, aged rewirable fuse boards, and Electricity North West supply-side issues.',
];

const faqs = [
  {
    question: 'How much does an EICR cost in Manchester?',
    answer:
      'Manchester EICR prices are lower than London but vary by property size. A one-bedroom flat typically costs £100 to £170. A two-bedroom flat or terraced house costs £120 to £200. A three-bedroom terraced house costs £180 to £300. Larger properties or HMOs with multiple consumer units cost more. Prices in the city centre may be slightly higher than suburban areas due to parking and access constraints.',
  },
  {
    question: 'Is an EICR a legal requirement for landlords in Manchester?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply across all of England, including Manchester. Every private rented property must have a valid EICR, renewed at least every five years. Manchester City Council actively enforces these regulations and can impose civil penalties of up to £30,000 per breach. Properties in selective licensing areas face additional scrutiny.',
  },
  {
    question: 'What areas of Manchester have selective licensing?',
    answer:
      'Manchester City Council has designated selective licensing areas in parts of Moss Side, Rusholme, Fallowfield, and Old Moat. Landlords with properties in these areas must obtain a selective licence, and a valid EICR is a mandatory condition of the licence. Operating without a licence is a criminal offence and a civil penalty offence. Salford City Council also operates selective licensing across large parts of the city, which affects landlords with properties near the Manchester-Salford boundary.',
  },
  {
    question: 'What happens if my Manchester property fails an EICR?',
    answer:
      'An EICR is assessed as Satisfactory or Unsatisfactory. If it is Unsatisfactory (C1 or C2 observations present), the landlord must arrange remedial work within 28 days (or sooner if the inspector specifies). The remedial work must be carried out by a qualified electrician and confirmed in writing. Manchester City Council can request copies of the EICR and confirmation of completed remedial work. Failure to act within the required timeframe is a breach of the regulations.',
  },
  {
    question: 'How long does an EICR take for a Manchester terraced house?',
    answer:
      'A typical two-bedroom terraced house with 6 to 10 circuits takes 2 to 3 hours. A three-bedroom terraced house takes 3 to 4 hours. Victorian terraces with original or partially replaced wiring take longer because of concealed cable routes, lack of circuit identification, and the need to test shared neutral cables where mid-terrace properties share a supply. The inspector needs access to all rooms, the consumer unit, the meter cupboard, and the cellar or understairs area.',
  },
  {
    question: 'Who is the electricity supplier for Manchester?',
    answer:
      'Electricity North West (ENW) is the Distribution Network Operator (DNO) for the Manchester area. They own and maintain the electricity network infrastructure including the cables, substations, and service connections to properties. If the EICR inspector identifies issues with the supply-side equipment (such as a deteriorated cut-out, damaged service cable, or earth provision problems), these must be reported to ENW. The inspector cannot work on DNO equipment. ENW typically responds to supply-side faults within a few days.',
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
          An EICR (Electrical Installation Condition Report) is a detailed inspection and test of a
          property's fixed electrical installation. It covers the wiring, consumer unit, protective
          devices, earthing, bonding, sockets, switches, and all fixed electrical equipment.
        </p>
        <p>
          The report is documented in accordance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (Section 631), which specifies that an Electrical Installation Condition Report must be
          used for periodic inspection and testing of existing installations. Each defect is
          classified using observation codes (C1, C2, C3, FI) and the overall installation is
          assessed as Satisfactory or Unsatisfactory.
        </p>
        <p>
          The inspector carries out a visual inspection followed by testing including insulation
          resistance, earth fault loop impedance, RCD operation, and continuity of protective
          conductors. Results are recorded on Schedules of Circuit Details and Test Results that
          form part of the formal report.
        </p>
      </>
    ),
  },
  {
    id: 'manchester-costs',
    heading: 'EICR Cost in Manchester (2026 Prices)',
    content: (
      <>
        <p>
          Manchester EICR prices are competitive compared to London and the South East. Labour rates
          in the North West are generally lower, and travel time between appointments is shorter.
          Below are typical 2026 prices:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Studio / one-bedroom flat</strong> — £100 to £170. Quick to inspect with 3
                to 5 circuits and a single consumer unit. Common in city centre apartment blocks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat or terraced house</strong> — £120 to £200. The most common
                EICR in Manchester. Purpose-built flats are quicker; older terraces take longer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom terraced house</strong> — £180 to £300. Typical 8 to 12
                circuits. Victorian terraces in Fallowfield, Withington, and Didsbury may require
                additional time due to older wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom+ detached house</strong> — £250 to £400+. Larger properties
                with multiple consumer units, garages, or outbuildings increase the scope.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO (House in Multiple Occupation)</strong> — £300 to £600+. Student HMOs in
                Fallowfield and Rusholme are common. Multiple consumer units, fire alarm systems,
                and emergency lighting all form part of the scope.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Prices include the inspection, testing, and report. Remedial work is quoted and charged
          separately. Many Manchester electricians offer a combined EICR and remedial package for
          landlords with multiple properties.
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
          apply to all private rented properties in England, including Manchester. The key
          requirements are:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory EICR</strong> — landlords must have a valid EICR for every private
                rented property. The EICR must be carried out by a qualified person and renewed at
                least every five years. BS 7671 Section 6 requires periodic inspection regimes to
                confirm installations remain safe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before new tenancies</strong> — the EICR must be obtained before a new
                tenant moves in. A copy must be provided to the tenant within 28 days of the
                inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial work within 28 days</strong> — if C1 or C2 observations are
                identified, remedial work must be completed within 28 days (or sooner if the
                inspector specifies). Written confirmation must be provided to the tenant and the
                local authority if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fines up to £30,000</strong> — Manchester City Council can impose civil
                penalties for non-compliance. Multiple breaches (for example, multiple properties
                without valid EICRs) can result in multiple fines.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Regulation 132.13 of BS 7671 specifically addresses the requirement to issue a periodic
          inspection report (EICR) for rented properties with detailed circuit-level findings,
          remedial action schedules, and priority ratings.
        </p>
      </>
    ),
  },
  {
    id: 'selective-licensing',
    heading: 'Selective Licensing Areas in Manchester',
    content: (
      <>
        <p>
          Selective licensing is a scheme that requires landlords in designated areas to obtain a
          property licence before renting out their property. Manchester City Council has operated
          selective licensing in areas with high concentrations of private rented housing and
          associated issues:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Designated areas</strong> — Moss Side, Rusholme, Fallowfield, Old Moat, and
                parts of Levenshulme have been included in selective licensing designations. The
                specific boundaries change when schemes are renewed, so landlords must check the
                current designation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR as a licence condition</strong> — a valid EICR is a mandatory condition
                of the selective licence. Landlords must provide a copy of the EICR with their
                licence application and ensure it remains valid throughout the licence period.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Salford</strong> — neighbouring Salford City Council operates selective
                licensing across large parts of its area. Landlords with properties near the
                Manchester-Salford boundary should check which authority their property falls under
                and whether selective licensing applies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student HMOs</strong> — the Fallowfield and Withington areas have a very
                high concentration of student HMOs. These require both HMO licensing and a valid
                EICR. Manchester City Council actively enforces against unlicensed HMOs in these
                areas, particularly during the student letting season.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Operating a rented property without a required licence is a criminal offence. A landlord
          who rents without a licence cannot use the Section 21 no-fault eviction process and may
          have to repay up to 12 months of rent to tenants through a Rent Repayment Order.
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
          Every defect or concern noted during an EICR is classified using one of four observation
          codes. These are defined in the model forms accompanying{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">BS 7671</SEOInternalLink>
          :
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C1 — Danger Present</h3>
            <p className="text-white text-sm leading-relaxed">
              Risk of injury exists. Immediate action is required. The inspector may disconnect the
              dangerous circuit on the spot. In Manchester terraces, common C1 findings include
              exposed live conductors behind damaged sockets and live parts accessible in obsolete
              fuse boards.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C2 — Potentially Dangerous</h3>
            <p className="text-white text-sm leading-relaxed">
              Could become dangerous. Urgent remedial action is required. Common C2 observations in
              Manchester include lack of RCD protection on socket circuits, absent or defective
              earthing, and obsolete rewirable fuse boards with incorrect fuse ratings.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C3 — Improvement Recommended</h3>
            <p className="text-white text-sm leading-relaxed">
              Not dangerous but improvement would enhance safety. Does not make the EICR
              Unsatisfactory. Examples include absence of supplementary bonding where not required
              by current regulations, and older but functional accessories.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">FI — Further Investigation</h3>
            <p className="text-white text-sm leading-relaxed">
              Cannot fully assess and further investigation is needed. Common in Manchester terraces
              where wiring runs through party walls, under suspended floors, or behind built-in
              cupboards that cannot be accessed during the inspection.
            </p>
          </div>
        </div>
        <p>
          The EICR is assessed as <strong>Unsatisfactory</strong> if any C1 or C2 observations are
          present. C3 and FI observations alone do not trigger an Unsatisfactory result, but FI
          items should be followed up to confirm safety.
        </p>
      </>
    ),
  },
  {
    id: 'terraced-houses',
    heading: 'Terraced House Inspection Challenges in Manchester',
    content: (
      <>
        <p>
          Manchester's housing stock includes a very high proportion of Victorian and Edwardian
          terraced houses, particularly in inner suburbs. These properties present specific
          challenges during an EICR:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shared neutral cables</strong> — in some older mid-terrace properties, the
                neutral conductor may be shared between adjacent houses. This is a legacy of older
                installation practices and can cause neutral overloading, voltage imbalances, and
                difficulty isolating individual properties safely for testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cellar installations</strong> — many Manchester terraces have cellars that
                have been converted or partially finished. Electrical installations in cellars may
                have inadequate IP rating for the damp conditions, lack RCD protection, or use
                cables unsuitable for the environment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuse boards</strong> — a significant number of Manchester terraces
                still have rewirable fuse boards (BS 3036 fuses). While not automatically a C2, a
                rewirable fuse board without RCD protection on socket circuits is a C2 under current
                assessment criteria.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity North West supply issues</strong> — Electricity North West (ENW)
                is the DNO for the Manchester region. Common supply-side findings include
                deteriorated cut-outs, corroded earth terminals, and looped service cables in
                terraces where the supply runs along the row from a single point. Supply-side issues
                must be reported to ENW.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable routes through party walls</strong> — in terraced houses, cables
                sometimes cross party walls between properties. This makes it difficult to trace
                circuits and may result in FI observations where the inspector cannot confirm the
                cable route without destructive investigation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians quoting EICRs for Manchester terraced houses should allow 30 to 60 minutes
          additional time compared to modern properties of the same size. The presence of a cellar,
          shared supply, or rewirable fuse board adds complexity to both the inspection and the
          report.
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
          The EICR involves a visual inspection and a programme of electrical testing. The inspector
          needs access to every room, the consumer unit, the meter cupboard, cellar (if present),
          and any outbuildings. The power will be switched off for some of the testing — typically
          30 to 60 minutes.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection</strong> — the inspector examines the consumer unit,
                protective devices, cable condition, socket outlets, light fittings, switches,
                earthing and bonding connections, and the condition of all accessible wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dead testing</strong> — with the supply isolated: continuity of protective
                conductors, ring final circuit continuity, and insulation resistance (500V DC,
                minimum 1 megohm required).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Live testing</strong> — with the supply restored: earth fault loop impedance
                (Ze and Zs), prospective fault current, RCD operation times, and polarity
                verification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Report completion</strong> — the inspector completes the EICR with Schedules
                of Circuit Details and Test Results as required by Section 631. The report includes
                observations, classification codes, an overall assessment, and a recommended date
                for the next periodic inspection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Prepare by ensuring clear access to the consumer unit and meter, removing items stored in
          front of electrical equipment, and making all rooms accessible. If the property has
          tenants, arrange a convenient time and ensure they are aware the power will be off for
          part of the visit.
        </p>
      </>
    ),
  },
  {
    id: 'how-often',
    heading: 'How Often Is an EICR Needed?',
    content: (
      <>
        <p>
          The frequency depends on property type. BS 7671 Section 6 establishes that installations
          must be periodically inspected at intervals suited to the property type and its use:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Private rented (England)</strong> — at least every 5 years (legal
                requirement). Manchester City Council enforces this actively.
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
                <strong>Commercial premises</strong> — every 5 years (or 3 years for higher-risk
                environments such as industrial units or workshops).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Change of occupancy</strong> — recommended whenever a property changes
                tenant, even if the previous EICR is still in date.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The inspector may recommend a shorter interval if the installation is in poor condition.
          Victorian terraces with multiple C3 observations or properties with older wiring may
          receive a recommended next inspection of 3 years.
        </p>
      </>
    ),
  },
  {
    id: 'find-inspector',
    heading: 'Finding a Qualified EICR Inspector in Manchester',
    content: (
      <>
        <p>
          For landlord compliance, the EICR must be carried out by a qualified and competent person.
          The safest approach is to use an inspector registered with a competent person scheme:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — NICEIC, NAPIT, ELECSA, and STROMA
                maintain registers of qualified electricians. Search for Manchester-based inspectors
                on their websites.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications</strong> — look for C&G 2391 (Inspection and Testing) or C&G
                2394/2395, plus a current BS 7671 qualification (C&G 2382 18th Edition).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local experience</strong> — an inspector familiar with Manchester property
                types (terraces, HMOs, converted mills) will be more efficient and accurate than one
                unfamiliar with the local housing stock.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Avoid very low-priced EICR offers. A thorough EICR for a three-bedroom terraced house
          takes at least 3 hours. An inspector offering to do it in one hour for £80 is unlikely to
          be carrying out a compliant inspection.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in Manchester',
    content: (
      <>
        <p>
          Manchester and the surrounding Greater Manchester area offer strong demand for EICR work.
          The large private rented sector, student housing market, and selective licensing schemes
          create consistent work for qualified inspectors.
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
                  to complete reports on your phone on site. AI board scanning reads the consumer
                  unit schedule, voice entry records test results, and instant PDF export sends the
                  report to the landlord before you leave. Fit more EICRs into your day.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Win the Remedial Work</h4>
                <p className="text-white text-sm leading-relaxed">
                  When C1 or C2 observations are found, quote the remedial work on the spot using
                  the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Landlords must act within 28 days — the electrician who provides the quote
                  immediately is most likely to get the job.
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

export default function EICRManchesterPage() {
  return (
    <GuideTemplate
      title="EICR Manchester | Electrical Inspection Cost 2026"
      description="EICR costs in Manchester for 2026. Landlord legal requirements, selective licensing areas, terraced house inspection challenges, observation codes, and how to find a qualified inspector. Prices from £100 for a flat to £400+ for a house."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR Manchester: <span className="text-yellow-400">Electrical Inspection Cost 2026</span>
        </>
      }
      heroSubtitle="Complete guide to EICRs in Manchester — costs by property type, landlord legal requirements, selective licensing areas, terraced house challenges, observation codes, and how to find a qualified inspector."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Manchester"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone — Faster Than Paper"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
