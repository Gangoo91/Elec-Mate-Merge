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

const breadcrumbs = [
  { label: 'EICR Guides', href: '/guides/eicr-for-landlords' },
  { label: 'EICR Nottingham', href: '/guides/eicr-nottingham' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'nottingham-costs', label: 'EICR Cost in Nottingham' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'observation-codes', label: 'Observation Codes Explained' },
  { id: 'nottingham-properties', label: 'Nottingham Property Challenges' },
  { id: 'landlord-obligations', label: 'Landlord Obligations' },
  { id: 'what-to-expect', label: 'What to Expect During an EICR' },
  { id: 'how-often', label: 'How Often Is an EICR Needed?' },
  { id: 'find-inspector', label: 'Finding a Qualified Inspector' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "An EICR (Electrical Installation Condition Report) is a formal inspection of a property's fixed electrical installation, documented in accordance with BS 7671:2018+A3:2024 (Section 631). It records the condition of wiring, consumer units, earthing, bonding and protective devices using observation codes (C1, C2, C3, FI).",
  'Nottingham EICR costs are close to the national average. Expect to pay between £150 and £280 for a two-bedroom terraced house and £250 to £400 for a three-bedroom semi-detached property.',
  'Since 1 April 2021, landlords in England must obtain an EICR before a new tenancy begins and at least every five years. Nottingham City Council enforces the regulations and can impose fines of up to £30,000 per breach.',
  'Nottingham operates one of the most extensive selective licensing schemes in England, covering large parts of the city. A valid EICR is a condition of the property licence, and the council actively enforces compliance.',
  'Western Power Distribution (now National Grid Electricity Distribution) is the DNO for Nottingham. Supply-side issues such as deteriorated cut-outs and ageing TN-C-S earthing arrangements are common findings in older properties.',
];

const faqs = [
  {
    question: 'How much does an EICR cost in Nottingham?',
    answer:
      'EICR costs in Nottingham are close to the national average. A one-bedroom flat typically costs £120 to £200. A two-bedroom terraced house costs £150 to £280. A three-bedroom semi-detached costs £250 to £400. Larger properties with multiple consumer units cost more. Nottingham prices are competitive due to a healthy supply of qualified inspectors in the area.',
  },
  {
    question: 'Is an EICR a legal requirement for landlords in Nottingham?',
    answer:
      'Yes. Since 1 April 2021, the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require landlords to obtain an EICR before the start of a new tenancy and at least every five years thereafter. Nottingham also operates a selective licensing scheme, which makes a valid EICR a condition of the property licence. Failure to comply with either the national regulations or the licensing conditions can result in significant penalties.',
  },
  {
    question: 'What is Nottingham selective licensing and how does it affect EICRs?',
    answer:
      'Nottingham City Council operates a selective licensing scheme covering large areas of the city. Landlords in designated areas must obtain a property licence, and a valid EICR is one of the licence conditions. The council checks EICR compliance during licence applications and renewals, and can take enforcement action (including prosecution or civil penalties) if the EICR is missing, expired, or shows unresolved C1/C2 observations.',
  },
  {
    question: 'What happens if my Nottingham property fails an EICR?',
    answer:
      'An EICR does not technically pass or fail. It is assessed as either Satisfactory or Unsatisfactory. If the report is Unsatisfactory (meaning C1 or C2 observations are present), the landlord must arrange for remedial work within 28 days (or sooner if the inspector recommends it). The remedial work must be carried out by a qualified electrician, and the original inspector (or another qualified person) must confirm the work has been completed.',
  },
  {
    question: 'Who is the DNO for Nottingham?',
    answer:
      'National Grid Electricity Distribution (formerly Western Power Distribution) is the Distribution Network Operator for Nottingham. They are responsible for the electricity supply up to and including the cut-out (service fuse). If the EICR inspector identifies supply-side issues, the property owner will need to contact the DNO to arrange remedial work on their equipment.',
  },
  {
    question: 'How long does an EICR take in Nottingham?',
    answer:
      'The duration depends on property size and number of circuits. A one-bedroom flat typically takes 2 to 3 hours. A three-bedroom house with 10 to 15 circuits takes 3 to 4 hours. Older terraced houses in areas like Sneinton, Hyson Green, and Radford often take longer due to aged wiring and complex layouts from HMO conversions.',
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

const sections = [
  {
    id: 'what-is-eicr',
    heading: 'What Is an EICR?',
    content: (
      <>
        <p>
          An EICR (Electrical Installation Condition Report) is a formal inspection and test of a
          property's fixed electrical installation. It assesses the condition of the wiring,
          consumer unit, protective devices, earthing and bonding, sockets, switches, and all fixed
          electrical equipment.
        </p>
        <p>
          The EICR is documented in accordance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (Section 631), which requires that an Electrical Installation Condition Report is used for
          periodic inspection and testing of existing installations — not an Electrical Installation
          Certificate, which is for new work only.
        </p>
        <p>
          The inspector carries out a detailed visual inspection followed by a programme of testing
          (insulation resistance, earth fault loop impedance, RCD operation times, continuity of
          protective conductors). The results are recorded on Schedules of Circuit Details and Test
          Results. Each observation is classified using a code system (C1, C2, C3, FI) that
          indicates the severity and urgency of any defects found.
        </p>
        <p>
          The overall condition of the installation is assessed as either Satisfactory or
          Unsatisfactory. An Unsatisfactory result means the installation has one or more C1 (danger
          present) or C2 (potentially dangerous) observations that require remedial work.
        </p>
      </>
    ),
  },
  {
    id: 'nottingham-costs',
    heading: 'EICR Cost in Nottingham (2026 Prices)',
    content: (
      <>
        <p>
          Nottingham EICR costs are close to the national average. The city has a competitive market
          for inspection work, with a good supply of qualified electricians. Below are typical 2026
          prices:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Studio / one-bedroom flat</strong> — £120 to £200. Typically 3 to 5
                circuits, single consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom terraced house</strong> — £150 to £280. Common in areas such as
                Sneinton, Hyson Green and Lenton. Usually 5 to 8 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom semi-detached</strong> — £250 to £400. Expect 8 to 15
                circuits. Properties in West Bridgford and Beeston are generally newer and quicker
                to inspect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom+ detached</strong> — £350 to £550+. Larger properties may have
                multiple consumer units or outbuildings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO (House in Multiple Occupation)</strong> — £350 to £700+. Nottingham has
                a large student rental market near the two universities, and many HMOs require EICRs
                covering multiple consumer units and fire alarm systems.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices are for the inspection and report only. Remedial work identified during the
          EICR is quoted and charged separately.
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
          introduced mandatory electrical safety checks for private rented properties in England.
          Nottingham falls under these regulations, with additional requirements from the city's
          selective licensing scheme:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before a new tenancy</strong> — the landlord must ensure the electrical
                installation is inspected and tested by a qualified person, and obtain an EICR,
                before a new tenant moves in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Every five years</strong> — the EICR must be renewed at least every five
                years, or sooner if the inspector recommends a shorter interval.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Selective licensing</strong> — Nottingham operates one of the largest
                selective licensing schemes in England. A valid EICR is a condition of the property
                licence in designated areas. The council checks compliance during applications and
                inspections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial work</strong> — if the EICR identifies C1 or C2 observations, the
                landlord must complete remedial work within 28 days (or sooner if the inspector
                specifies a shorter timeframe).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Penalties</strong> — Nottingham City Council can impose civil penalties of
                up to £30,000 per breach of the electrical safety regulations, plus separate
                penalties for licensing breaches.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Landlords with properties in Nottingham's selective licensing areas face a double
          compliance requirement: the national electrical safety regulations and the local licensing
          conditions. An expired or missing EICR can result in enforcement action under both
          regimes.
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
          Every observation recorded on an EICR is classified using one of four codes. Understanding
          these codes is essential for landlords, tenants and electricians. The codes are defined in{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            BS 7671 and the associated model forms
          </SEOInternalLink>
          :
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C1 — Danger Present</h3>
            <p className="text-white text-sm leading-relaxed">
              Risk of injury exists. Immediate remedial action is required. The inspector may
              recommend disconnecting the dangerous circuit on the spot. Examples include exposed
              live conductors, missing consumer unit covers, and severely damaged wiring.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C2 — Potentially Dangerous</h3>
            <p className="text-white text-sm leading-relaxed">
              Could become dangerous. Urgent remedial action is required. Common C2 findings in
              Nottingham include absent or inadequate earthing, lack of RCD protection on socket
              circuits, overloaded circuits, and deteriorated cable insulation.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C3 — Improvement Recommended</h3>
            <p className="text-white text-sm leading-relaxed">
              Not immediately dangerous but improvement would enhance safety. C3 observations do not
              make the EICR Unsatisfactory. Common examples include older but functional accessories
              and lack of supplementary bonding where not required by current regulations.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">FI — Further Investigation</h3>
            <p className="text-white text-sm leading-relaxed">
              The inspector could not fully assess a part of the installation and further
              investigation is needed. Common in older Nottingham terraces where wiring is concealed
              in plaster or under floorboards that cannot be lifted during the inspection.
            </p>
          </div>
        </div>
        <p>
          An EICR is assessed as <strong>Unsatisfactory</strong> if it contains any C1 or C2
          observations. C3 and FI observations alone do not make the report Unsatisfactory, but FI
          items should be investigated to confirm the installation is safe.
        </p>
      </>
    ),
  },
  {
    id: 'nottingham-properties',
    heading: 'Nottingham Property Challenges',
    content: (
      <>
        <p>
          Nottingham's housing stock presents specific challenges for EICR inspectors. The city has
          a significant proportion of Victorian and Edwardian terraces, post-war council estates,
          and a large student rental sector:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian terraces (Sneinton, Hyson Green, Radford)</strong> — many
                properties retain original or early-replacement wiring. Rubber-insulated cables,
                absent CPCs, and rewirable fuses are common findings. Earthing may rely on water or
                gas pipes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student HMOs (Lenton, Dunkirk, Beeston)</strong> — Nottingham has two large
                universities, generating high demand for shared housing. HMO conversions often have
                extended wiring, additional circuits, and fire alarm systems that increase EICR
                complexity. Many lack adequate RCD protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Post-war estates (St Ann's, Bulwell, Bestwood)</strong> — ex-council
                properties often have 1970s or 1980s wiring with original consumer units and
                rewirable fuses. These frequently lack RCD protection on socket circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>DNO supply issues</strong> — National Grid Electricity Distribution
                (formerly Western Power Distribution) is the DNO for Nottingham. Older properties
                may have deteriorated service cut-outs and TN-C-S earthing that requires careful
                assessment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians should allow extra time for Victorian terraces and HMO conversions. A
          two-bedroom Victorian terrace in Hyson Green may take 3 to 4 hours compared to 2 hours for
          a modern flat in the city centre.
        </p>
      </>
    ),
  },
  {
    id: 'landlord-obligations',
    heading: 'Landlord Obligations in Nottingham',
    content: (
      <>
        <p>
          Nottingham landlords face some of the strictest enforcement in England due to the
          combination of national electrical safety regulations and local selective licensing:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Obtain an EICR</strong> — before the start of every new tenancy and at least
                every five years. The report must be carried out by a qualified person registered
                with a competent person scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Selective licensing</strong> — if the property is in a designated area, a
                valid EICR must be submitted as part of the licence application. The council checks
                compliance at application and during inspections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide copies</strong> — a copy of the EICR must be given to existing
                tenants within 28 days, to new tenants before they move in, and to the council
                within seven days of a request.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complete remedial work</strong> — any C1 or C2 observations must be
                addressed within 28 days. Confirmation of completion must be obtained from a
                qualified person.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Nottingham City Council has been one of the most proactive councils in England for
          enforcement. Civil penalties of up to £30,000 per breach can be imposed for non-compliance
          with the electrical safety regulations, with additional penalties for licensing breaches.
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
          The EICR process involves both a visual inspection and a programme of testing. The
          inspector needs access to all parts of the property including every room, the consumer
          unit, the meter cupboard, loft space (if accessible), and any outbuildings. The power will
          need to be switched off for parts of the testing — typically 30 to 60 minutes.
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
                <strong>Dead testing</strong> — with the supply isolated, the inspector tests
                continuity of protective conductors, continuity of ring final circuit conductors,
                and insulation resistance (at 500V DC, minimum 1 megohm required).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Live testing</strong> — with the supply restored, the inspector tests earth
                fault loop impedance (Ze and Zs values), prospective fault current (PFC), RCD
                operation times, and polarity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Report completion</strong> — the inspector completes the EICR including
                Schedules of Circuit Details and Test Results (as required by Section 631). The
                report includes observations with classification codes, an overall assessment, and a
                recommended date for the next inspection.
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
          The required frequency of EICRs depends on the property type and use. BS 7671 Section 621
          establishes that installations must be periodically inspected at intervals suited to the
          property type:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Private rented property (England)</strong> — at least every 5 years (legal
                requirement under the 2020 Regulations).
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
                environments).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Change of occupancy</strong> — a new EICR is recommended (and required for
                rented properties) whenever a property changes occupant.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'find-inspector',
    heading: 'Finding a Qualified EICR Inspector in Nottingham',
    content: (
      <>
        <p>
          For landlord compliance, the EICR must be carried out by a qualified and competent person
          registered with a competent person scheme.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — NICEIC, NAPIT, ELECSA, and other
                approved bodies maintain registers of qualified electricians. NAPIT is headquartered
                in nearby Mansfield, and many Nottingham electricians are NAPIT-registered.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications</strong> — the inspector should hold City & Guilds 2391
                (Inspection and Testing) or equivalent, plus a current BS 7671 qualification (C&G
                2382 18th Edition).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance</strong> — check that the inspector carries professional indemnity
                insurance. Reputable electricians registered with competent person schemes are
                required to maintain adequate insurance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in Nottingham',
    content: (
      <>
        <p>
          Nottingham offers strong demand for EICR work. The selective licensing scheme means
          landlords are actively seeking inspections, and the large student HMO market creates
          consistent year-round demand.
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
                  to complete the report on your phone while still on site. AI board scanning, voice
                  entry, and instant PDF export mean no evening paperwork.
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
                  When the EICR identifies C1 or C2 observations, quote the remedial work
                  immediately using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Landlords must act within 28 days — deliver the quote on the day to win the
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

export default function EICRNottinghamPage() {
  return (
    <GuideTemplate
      title="EICR Nottingham | Electrical Safety Certificate Cost 2026"
      description="EICR costs in Nottingham for 2026. Selective licensing requirements, landlord obligations, observation codes explained, and how to find a qualified inspector. Prices from £120 for a flat to £400+ for a house."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR Nottingham:{' '}
          <span className="text-yellow-400">Electrical Safety Certificate Cost 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about EICRs in Nottingham — costs by property type, selective licensing requirements, landlord obligations, observation codes, and how to find a qualified inspector."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Nottingham"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone — Faster Than Paper"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
