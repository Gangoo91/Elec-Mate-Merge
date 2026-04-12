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
  { label: 'EICR Bath', href: '/guides/eicr-bath' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'bath-costs', label: 'EICR Cost in Bath' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'local-housing', label: 'Bath Housing Stock' },
  { id: 'observation-codes', label: 'Observation Codes Explained' },
  { id: 'what-to-expect', label: 'What to Expect During an EICR' },
  { id: 'how-often', label: 'How Often Is an EICR Needed?' },
  { id: 'find-inspector', label: 'Finding a Qualified Inspector' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "An EICR (Electrical Installation Condition Report) is a formal inspection of a property's fixed electrical installation, carried out in accordance with BS 7671:2018+A3:2024 (Section 631). It produces a detailed condition assessment with C1, C2, C3 and FI observation codes.",
  'Bath EICR costs are above the South West average due to high property values and a concentration of complex Georgian buildings. Expect to pay between £130 and £240 for a two-bedroom flat and £200 to £350 for a three-bedroom house.',
  'Landlords in England must obtain a valid EICR before a new tenancy begins and renew it every five years. Bath & North East Somerset Council enforces these requirements and can fine non-compliant landlords up to £30,000 per breach.',
  'Bath is a UNESCO World Heritage Site with an exceptionally high concentration of Georgian listed buildings. Most of the city centre housing stock dates from 1750 to 1840 and requires careful EICR inspection. Remedial work in listed properties may need listed building consent.',
  'The University of Bath and Bath Spa University generate significant HMO demand. Bath & North East Somerset Council operates mandatory HMO licensing and has an active private sector housing enforcement team.',
];

const faqs = [
  {
    question: 'How much does an EICR cost in Bath?',
    answer:
      "Bath EICR prices are above the South West average due to the city's high property values and the complexity of the Georgian housing stock. A one-bedroom flat typically costs £110 to £200. A two-bedroom flat costs £130 to £240. A three-bedroom house costs £200 to £350. Georgian townhouses in the city centre, Bathwick, and Widcombe areas take longer to inspect than modern properties and may attract premium rates. Obtain at least two or three quotes and be cautious of prices significantly below these ranges.",
  },
  {
    question: 'Is an EICR a legal requirement for Bath landlords?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Bath and North East Somerset to obtain an EICR before a new tenancy begins and to renew it at least every five years. The inspector must be registered with an approved competent person scheme. Copies must be provided to tenants within 28 days and to Bath & North East Somerset Council within seven days if requested. Fines of up to £30,000 per breach apply.',
  },
  {
    question: 'What are the most common EICR findings in Bath properties?',
    answer:
      "Bath's housing stock is dominated by Georgian and Victorian properties. Common EICR findings include absent RCD protection on socket circuits (a C2 finding under Regulation 411.3.3 of BS 7671), rubber-insulated or early PVC cables in properties not rewired since the mid-20th century, inadequate earthing and bonding, and concealed wiring in original stone-mullion and lath-and-plaster walls that cannot be traced without destructive investigation. FI (Further Investigation) observations are particularly common in Bath due to the restricted access to concealed cables in listed buildings.",
  },
  {
    question: "Do Bath's listed buildings need an EICR?",
    answer:
      "Yes — the obligation to obtain an EICR applies regardless of listed building status. The vast majority of Bath city centre properties are Grade I or Grade II listed. Where the EICR identifies remedial work, listed building consent may be required before the work can proceed, particularly if it involves chasing into historic stonework or disturbing original plasterwork. Bath & North East Somerset Council's conservation team should be consulted before planning remedial electrical work in listed properties. In practice, much remedial work can be completed without affecting historic fabric.",
  },
  {
    question: 'How long does an EICR take in Bath?',
    answer:
      "A one-bedroom flat typically takes two to three hours. A three-bedroom house takes three to four hours. Georgian townhouses in Bath's city centre and conservation area frequently take four to five hours or more because cable routes are unpredictable, circuit documentation is poor, and access to concealed wiring is restricted by the original stone construction. Lath-and-plaster ceilings and timber-framed internal partitions add further complexity. Allow additional time and budget for Bath city centre properties compared to modern properties of the same size.",
  },
  {
    question: 'Does Bath & North East Somerset Council enforce EICR requirements?',
    answer:
      'Yes. Bath & North East Somerset Council has a Private Sector Housing team that enforces electrical safety standards. The council operates mandatory HMO licensing and EICR compliance is a condition of all HMO licences. The council investigates complaints from tenants and conducts proactive enforcement activity. Non-compliant landlords risk civil penalties of up to £30,000 per breach and HMO licence refusal or revocation.',
  },
  {
    question:
      'Can an electrician complete an EICR in a Bath Georgian townhouse without damaging the property?',
    answer:
      "Yes. An EICR is primarily a visual inspection and non-destructive test of accessible parts of the installation. The inspector tests at accessible points such as consumer units, socket outlets, and light fittings, and records FI observations where cables cannot be accessed. The inspector does not need to open up walls or lift floors to carry out an EICR — although the presence of inaccessible concealed wiring will be noted and may require further investigation as a separate exercise if a defect is suspected. Qualified electricians experienced in Bath's historic buildings will understand how to work sensitively within the constraints of listed buildings.",
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
          (Section 631). It is a detailed condition assessment using standardised C1, C2, C3, and FI
          observation codes. The overall assessment is either Satisfactory or Unsatisfactory.
        </p>
        <p>
          In Bath, EICRs are particularly important given the age and complexity of the housing
          stock. The city's Georgian buildings — many of which still contain electrical
          installations from the mid-20th century or earlier — require thorough inspection by
          experienced qualified electricians.
        </p>
      </>
    ),
  },
  {
    id: 'bath-costs',
    heading: 'EICR Cost in Bath (2026 Prices)',
    content: (
      <>
        <p>
          Bath EICR prices are above the South West regional average due to the city's high property
          values and the complexity of inspecting Georgian and Victorian buildings. Below are
          typical 2026 prices:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Studio / one-bedroom flat</strong> — £110 to £200. Many flats in Bath are
                Georgian or Victorian conversions with complex wiring layouts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat</strong> — £130 to £240. Georgian terrace conversions in
                Lansdown, Bathwick, and the city centre take significantly longer than modern flats.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £200 to £350. Victorian terraced houses in
                Oldfield Park, Twerton, and Walcot are common in Bath's private rented sector.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom+ house / HMO</strong> — £320 to £600+. Georgian townhouses
                converted into student lets are particularly complex and time-consuming to inspect.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover the inspection and report only. Remedial work is quoted separately.
          Listed building properties in the city centre may attract additional charges for the extra
          care required.
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
          apply to all private rented properties in Bath and North East Somerset:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before a new tenancy</strong> — landlords must obtain an EICR before a new
                tenant moves in. This has applied to all new tenancies from 1 July 2020 and all
                existing tenancies from 1 April 2021.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Every five years</strong> — the EICR must be renewed at least every five
                years or sooner if the inspector recommends it. BS 7671 Regulation 134.2 requires
                periodic inspection regimes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant notification</strong> — a copy must be provided to tenants within 28
                days. New tenants must receive a copy before moving in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial work</strong> — C1 or C2 observations must be remedied within 28
                days. In Bath listed buildings, consent may be needed first — landlords should
                factor this into their timeline.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Penalties</strong> — Bath & North East Somerset Council can issue civil
                penalties of up to £30,000 per breach and may revoke HMO licences.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'local-housing',
    heading: 'Bath Housing Stock and Common EICR Findings',
    content: (
      <>
        <p>
          Bath is unique in England for the density and quality of its Georgian architecture. The
          city centre is a UNESCO World Heritage Site and contains some of England's finest examples
          of 18th-century domestic architecture. This creates distinctive and demanding EICR
          challenges:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Early and mid-20th century wiring in Georgian buildings</strong> — many Bath
                city centre properties were first wired in the 1930s to 1950s. Rubber- insulated and
                lead-sheathed cables from this period are frequently encountered and are classified
                as C1 or C2 depending on their condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Absent RCD protection</strong> — Regulation 411.3.3 of BS 7671 requires RCD
                protection on socket circuits not exceeding 20A. This is the most common C2 finding
                in Bath's pre-1990s rented properties, including the majority of Georgian and
                Victorian conversions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Concealed wiring in original construction</strong> — Georgian buildings in
                Bath use original Bath stone construction with lath-and-plaster internal walls.
                Cables concealed within this original fabric cannot be easily accessed or traced,
                leading to FI observations that require further investigation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing deficiencies in divided Georgian properties</strong> — large
                Georgian townhouses divided into flats commonly have inadequate earthing
                arrangements: shared earth conductors, undersized main bonding conductors, and
                absent bonding to gas and water services. These are common C2 findings.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians working in central Bath should allow extra time for every EICR and develop
          familiarity with the constraints and requirements of working in the World Heritage Site.
          Experience liaising with Bath & North East Somerset Council's conservation team is a
          significant advantage.
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
              Risk of injury exists. Immediate remedial action required. In Bath, this most commonly
              relates to crumbling rubber-insulated cables from 1930s or 1940s wiring or exposed
              live conductors in poorly maintained properties.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C2 — Potentially Dangerous</h3>
            <p className="text-white text-sm leading-relaxed">
              Could become dangerous. Urgent remedial action required. Absent RCD protection
              (Regulation 411.3.3) and inadequate earthing are the most frequent C2 findings in
              Bath's private rented sector.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C3 — Improvement Recommended</h3>
            <p className="text-white text-sm leading-relaxed">
              Not immediately dangerous. C3 alone does not make the EICR Unsatisfactory. Common in
              Bath properties where older accessories are still functional but dated.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">FI — Further Investigation</h3>
            <p className="text-white text-sm leading-relaxed">
              Particularly common in Bath's Georgian buildings where original stone construction and
              lath-and-plaster walls conceal wiring that cannot be safely accessed during the
              inspection without specialist consent.
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
                <strong>Live testing</strong> — earth fault loop impedance, prospective fault
                current, RCD operation times, and polarity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Report completion</strong> — the inspector completes the EICR including
                Schedules of Circuit Details and Test Results as required by Section 631, with
                observation codes and an overall Satisfactory or Unsatisfactory assessment.
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
                <strong>Owner-occupied domestic</strong> — every 10 years recommended. Given Bath's
                stock of very old properties, the 5-year interval is recommended for anything over
                25 years old — which covers almost all of the city centre.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO</strong> — every 5 years minimum under Bath & North East Somerset
                Council HMO licensing conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Change of tenancy</strong> — a new EICR is required before a new tenant
                moves into any privately rented Bath property, even if the current EICR has not
                expired.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'find-inspector',
    heading: 'Finding a Qualified EICR Inspector in Bath',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — search NICEIC, NAPIT, or ELECSA
                registers for Bath-based inspectors accepted by Bath & North East Somerset Council.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications</strong> — City & Guilds 2391 or the 2394/2395 combination,
                plus a current 18th Edition (C&G 2382) qualification. Experience with Georgian and
                Victorian listed buildings is a significant advantage in Bath.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed building experience</strong> — choose an inspector who understands
                the constraints of the Bath World Heritage Site and can advise on remedial options
                that respect the historic character of Georgian properties.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in Bath',
    content: (
      <>
        <p>
          Bath's concentration of Georgian and Victorian properties, large student population, and
          active private rented sector create consistent demand for EICR work. The complexity of the
          housing stock and the high proportion of older wiring mean that EICRs frequently identify
          remedial work, making Bath a commercially rewarding market for experienced inspectors.
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
                  to complete reports on your phone while still on site. AI board scanning, voice
                  test entry, and instant PDF export mean the landlord has the report before you
                  leave.
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
                  . Bath landlords face a 28-day deadline — quoting immediately gives you the best
                  chance of winning the follow-on work.
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

export default function EICRBathPage() {
  return (
    <GuideTemplate
      title="EICR Bath | Electrical Safety Certificate Cost 2026"
      description="EICR costs in Bath for 2026. Landlord legal requirements, Bath & North East Somerset Council enforcement, Georgian listed building challenges, observation codes, and how to find a qualified inspector. Prices from £110 for a flat."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR Bath:{' '}
          <span className="text-yellow-400">Electrical Safety Certificate Cost 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about EICRs in Bath — costs by property type, landlord legal requirements, council enforcement, Georgian and Victorian housing stock challenges, observation codes, and how to find a qualified inspector."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Bath"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone — Faster Than Paper"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
