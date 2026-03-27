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
  { label: 'EICR Southampton', href: '/guides/eicr-southampton' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'southampton-costs', label: 'EICR Cost in Southampton' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'local-housing', label: 'Southampton Housing Stock' },
  { id: 'observation-codes', label: 'Observation Codes Explained' },
  { id: 'what-to-expect', label: 'What to Expect During an EICR' },
  { id: 'how-often', label: 'How Often Is an EICR Needed?' },
  { id: 'find-inspector', label: 'Finding a Qualified Inspector' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An EICR (Electrical Installation Condition Report) is a formal inspection of a property\'s fixed electrical installation, carried out in accordance with BS 7671:2018+A3:2024 (Section 631). It produces a detailed condition assessment using C1, C2, C3 and FI observation codes.',
  'Southampton EICR costs are broadly in line with the South of England average. Expect to pay between £120 and £220 for a two-bedroom flat and £180 to £320 for a three-bedroom house.',
  'Landlords in England must obtain a valid EICR before a new tenancy begins and renew it at least every five years. Southampton City Council enforces these requirements and can issue fines of up to £30,000 for non-compliance.',
  'Southampton has a significant proportion of inter-war and post-war housing rebuilt after extensive wartime bomb damage. Many properties also include 1960s and 1970s wiring that is approaching the end of its safe service life and commonly returns C2 observations.',
  'The University of Southampton and Solent University create a large student HMO market. HMO landlords face additional EICR obligations and should ensure compliance across all licensed properties.',
];

const faqs = [
  {
    question: 'How much does an EICR cost in Southampton?',
    answer:
      'EICR prices in Southampton are broadly in line with the South of England average. A one-bedroom flat typically costs £100 to £180. A two-bedroom flat costs £120 to £220. A three-bedroom house costs £180 to £320. Larger properties or HMOs with multiple consumer units cost more. Prices vary between individual electricians, so it is worth obtaining two or three quotes. Avoid unusually cheap quotes — a thorough EICR on a two-bedroom flat takes at least two to three hours and requires calibrated test instruments.',
  },
  {
    question: 'Is an EICR a legal requirement for landlords in Southampton?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Southampton to obtain an EICR before a new tenancy begins and at least every five years thereafter. The EICR must be carried out by a qualified and competent person registered with a competent person scheme such as NICEIC, NAPIT, or ELECSA. A copy must be provided to tenants within 28 days and to Southampton City Council within seven days if requested. Fines of up to £30,000 per breach can be issued for non-compliance.',
  },
  {
    question: 'What are the most common EICR findings in Southampton properties?',
    answer:
      'Southampton has a high proportion of post-war rebuilds and 1960s to 1970s properties. Common EICR findings include lack of RCD protection on socket circuits (a C2 observation under Regulation 411.3.3), deteriorated rubber or PVC insulation on older wiring, inadequate earthing and bonding in properties that have not been updated since original installation, overloaded circuits due to modern appliance loads, and missing or damaged consumer unit covers. Victorian terraced properties near the city centre may also have older wiring types requiring replacement.',
  },
  {
    question: 'How long does an EICR take in Southampton?',
    answer:
      'The duration depends on property size and the number of circuits. A one-bedroom flat typically takes two to three hours. A three-bedroom house takes three to four hours. Southampton HMOs with multiple consumer units and fire alarm systems can take a full day. Properties with 1960s or 1970s wiring may take longer because circuit identification is often poor and the inspector needs to trace cables carefully. Ensure the inspector has access to all rooms, the consumer unit, and the meter position.',
  },
  {
    question: 'Do HMOs in Southampton need an EICR?',
    answer:
      'Yes. All HMOs in Southampton that require a licence under the Housing Act 2004 must have a valid EICR as a condition of their licence. Southampton City Council operates mandatory HMO licensing for properties with five or more occupants forming two or more households. Many student houses near the universities fall into this category. The EICR must be Satisfactory and copies must be provided to all tenants and to the council. HMOs with fire alarm systems and emergency lighting have a broader inspection scope.',
  },
  {
    question: 'Can I use an EICR from a previous landlord in Southampton?',
    answer:
      'You can use an existing EICR if it was carried out by a qualified and competent person, it is not more than five years old, and it is Satisfactory. However, if you are taking on a new tenancy you must provide a copy of the EICR to the new tenant before they move in. If the existing report is Unsatisfactory or contains outstanding C1 or C2 observations with remedial work not yet completed, you must arrange for that work to be done before the new tenancy begins and obtain a new or updated EICR.',
  },
  {
    question: 'Who qualifies as a competent person to carry out an EICR in Southampton?',
    answer:
      'A competent person for EICR purposes is someone with the appropriate qualifications, experience, and access to calibrated test instruments. For landlord compliance, the inspector should be registered with NICEIC, NAPIT, ELECSA, STROMA, or another approved competent person scheme. They should hold City & Guilds 2391 (Inspection and Testing) or the equivalent 2394/2395 split qualification, plus a current 18th Edition (C&G 2382) qualification. Southampton City Council accepts reports from registered competent persons as evidence of compliance.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Complete guide to landlord EICR requirements, compliance deadlines, and penalties.',
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
    description: 'Study for C&G 2391 with structured training modules covering periodic inspection.',
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
          devices, earthing and bonding, socket outlets, switches, and all fixed electrical
          equipment.
        </p>
        <p>
          The report is produced in accordance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (Section 631), which specifies that an Electrical Installation Condition Report must be
          used for periodic inspection and testing of existing installations. It is not a pass or
          fail — it is a detailed condition assessment using a standardised observation code system.
        </p>
        <p>
          The inspector carries out a visual inspection followed by a programme of testing:
          insulation resistance, earth fault loop impedance, RCD operation times, and continuity of
          protective conductors. Every observation is recorded on Schedules of Circuit Details and
          Test Results, which form part of the completed report.
        </p>
        <p>
          The overall assessment is either Satisfactory or Unsatisfactory. An Unsatisfactory result
          means one or more C1 (danger present) or C2 (potentially dangerous) observations are
          present and remedial work is required.
        </p>
      </>
    ),
  },
  {
    id: 'southampton-costs',
    heading: 'EICR Cost in Southampton (2026 Prices)',
    content: (
      <>
        <p>
          Southampton EICR prices are broadly in line with the South of England average and
          somewhat lower than London rates. Prices vary depending on the size of the property,
          the number of circuits, and the condition of the installation. Below are typical 2026
          prices for Southampton EICRs:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Studio / one-bedroom flat</strong> — £100 to £180. Typically 3 to 5
                circuits, single consumer unit. Common in the city centre and student areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat</strong> — £120 to £220. Usually 5 to 8 circuits.
                Purpose-built blocks from the post-war period are common in Southampton.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £180 to £320. Expect 8 to 15 circuits.
                1960s and 1970s semi-detached properties often have wiring requiring attention.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom+ house</strong> — £280 to £450+. Larger properties or those
                with multiple consumer units or outbuildings cost more to inspect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO (House in Multiple Occupation)</strong> — £350 to £650+. Student
                HMOs near the universities have multiple consumer units, fire alarm systems, and
                emergency lighting that all form part of the inspection scope.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices are for the inspection and report only. Any remedial work identified is
          quoted and charged separately. Some electricians offer combined EICR and remedial packages
          for landlords with multiple properties.
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
          apply to all private rented properties in Southampton. The key requirements are:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before a new tenancy</strong> — landlords must obtain an EICR before a
                new tenant moves in. This applies to all new tenancies from 1 July 2020 and all
                existing tenancies from 1 April 2021.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Every five years</strong> — the EICR must be renewed at least every five
                years, or sooner if the inspector recommends a shorter interval. BS 7671 Regulation
                134.2 requires periodic inspection regimes to confirm installations remain safe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant notification</strong> — a copy of the EICR must be provided to the
                tenant within 28 days of the inspection. New tenants must receive a copy before
                they move in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial work</strong> — C1 or C2 observations must be remedied within
                28 days (or sooner if specified by the inspector). Written confirmation of
                completion must be provided to the tenant and, if requested, to Southampton City
                Council.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Penalties</strong> — Southampton City Council can impose civil penalties
                of up to £30,000 per breach. The council actively enforces compliance, particularly
                for HMO landlords.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The regulations cover all private rented properties including Houses in Multiple
          Occupation. Social housing providers and owner-occupiers are not covered by these specific
          regulations, but periodic inspection is recommended as best practice.
        </p>
      </>
    ),
  },
  {
    id: 'local-housing',
    heading: 'Southampton Housing Stock and Common EICR Findings',
    content: (
      <>
        <p>
          Southampton's housing stock is distinctive due to the city's history of heavy wartime
          bomb damage. Much of the inner city was rebuilt in the late 1940s, 1950s, and 1960s,
          resulting in a high proportion of post-war and mid-century properties. This shapes the
          common findings during EICRs in Southampton:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ageing 1960s and 1970s wiring</strong> — many Southampton properties have
                PVC-insulated wiring installed during the 1960s and 1970s. This wiring is reaching
                the end of its design life. Degraded insulation, brittle sheathing, and overloaded
                circuits are common C2 findings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Absent RCD protection</strong> — Regulation 411.3.3 of BS 7671 requires
                RCD protection for socket outlet circuits not exceeding 20A. Older consumer units
                without RCD protection are a very common C2 finding across Southampton's post-war
                housing stock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inadequate earthing and bonding</strong> — many post-war properties were
                wired with inadequate protective conductors. Missing or undersized main protective
                bonding conductors to gas and water services are a frequent finding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student HMO condition</strong> — Southampton's large student population
                creates high demand for HMO accommodation. Frequent changes of tenancy and high
                occupancy levels accelerate wear on electrical accessories, and additions made by
                multiple occupants can create unsafe conditions.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Victorian terraced properties in the Shirley, Freemantle, and Bevois Valley areas that
          survived the wartime bombing may have older wiring requiring a full rewire. Electricians
          should allow additional time when quoting EICRs in these areas.
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
          Every observation recorded on an EICR is classified using one of four codes defined in{' '}
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
              recommend disconnecting the circuit or installation. Examples include exposed live
              conductors, severely damaged cables, and missing consumer unit covers.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C2 — Potentially Dangerous</h3>
            <p className="text-white text-sm leading-relaxed">
              Could become dangerous. Urgent remedial action required. The most common C2 finding
              in Southampton is absence of RCD protection on socket circuits (Regulation 411.3.3),
              followed by inadequate earthing and deteriorated cable insulation.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C3 — Improvement Recommended</h3>
            <p className="text-white text-sm leading-relaxed">
              Not immediately dangerous but improvement would enhance safety. C3 observations alone
              do not make the EICR Unsatisfactory. Examples include older but functional accessories
              and lack of supplementary bonding in bathrooms.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">FI — Further Investigation</h3>
            <p className="text-white text-sm leading-relaxed">
              The inspector could not fully assess a part of the installation. This is common in
              Southampton properties where cables are concealed under solid floors or behind
              fixed kitchen units.
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
    id: 'what-to-expect',
    heading: 'What to Expect During an EICR',
    content: (
      <>
        <p>
          The EICR process involves a visual inspection followed by a programme of testing. The
          inspector needs access to all rooms, the consumer unit, the meter, loft space if
          accessible, and any outbuildings. Power will be isolated for a period during dead testing
          — typically 30 to 60 minutes.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection</strong> — consumer unit, protective devices, cable
                condition, socket outlets, light fittings, switches, earthing and bonding
                connections, and all accessible wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dead testing</strong> — with supply isolated: continuity of protective
                conductors, continuity of ring final circuit conductors, and insulation resistance
                (minimum 1 megohm at 500V DC).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Live testing</strong> — with supply restored: earth fault loop impedance
                (Ze and Zs), prospective fault current, RCD operation times, and polarity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Report completion</strong> — the inspector completes the EICR including
                Schedules of Circuit Details and Test Results as required by Section 631. The
                report includes observation codes, an overall assessment, and a recommended date
                for the next inspection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Ensure clear access to the consumer unit and meter position before the inspector arrives.
          Tenants should be informed in advance that power will be off for a period during the
          inspection.
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
          The required frequency of periodic inspection depends on property type and use. BS 7671
          Section 621 establishes that installations must be inspected at intervals appropriate
          to the type of installation and its use:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Private rented property (England)</strong> — at least every 5 years
                (legal requirement under the 2020 Regulations).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Owner-occupied domestic</strong> — every 10 years is recommended best
                practice. Properties over 25 years old should be inspected every 5 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO</strong> — every 5 years as a minimum. Southampton City Council may
                require a shorter interval as a condition of the HMO licence for properties with
                older wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Change of occupancy</strong> — a new EICR is recommended whenever a
                property changes occupant, even if the previous EICR has not expired. This is a
                legal requirement for rented properties.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The inspector may recommend a shorter interval than the standard maximum if the
          installation is in poor condition. A Southampton property with multiple C3 observations
          may have a recommended next inspection of 3 years rather than 5.
        </p>
      </>
    ),
  },
  {
    id: 'find-inspector',
    heading: 'Finding a Qualified EICR Inspector in Southampton',
    content: (
      <>
        <p>
          For landlord compliance, the EICR must be carried out by a qualified and competent person.
          In practice this means using an electrician registered with an approved competent person
          scheme.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — NICEIC, NAPIT, ELECSA, and STROMA
                maintain online registers. Search for Southampton-based inspectors to find
                qualified local electricians accepted by Southampton City Council.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications</strong> — the inspector should hold City & Guilds 2391
                (Inspection and Testing) or the 2394/2395 combination, plus a current 18th Edition
                (C&G 2382) qualification. Experience with the local housing stock is an advantage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance</strong> — the inspector should carry professional indemnity
                insurance. Electricians registered with competent person schemes are required to
                maintain adequate insurance cover.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Be cautious of unusually low quotes. A thorough EICR on a two-bedroom Southampton flat
          takes at least two to three hours and requires calibrated test instruments. Prices
          significantly below the typical range may indicate an inadequate inspection.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in Southampton',
    content: (
      <>
        <p>
          Southampton's large private rented sector, driven by two universities and a busy port
          economy, creates consistent demand for EICR work. The city's high proportion of post-war
          and 1960s properties means that many EICRs will identify remedial work, creating
          follow-on revenue opportunities for thorough inspectors.
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
                  to complete the report on your phone while still on site. AI board scanning reads
                  the consumer unit schedule, voice entry records test results hands-free, and
                  instant PDF export sends the report to the landlord before you leave.
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
                  . Southampton landlords are legally obligated to act within 28 days — the
                  electrician who delivers the quote on the day wins the remedial work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete EICRs faster with Elec-Mate"
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

export default function EICRSouthamptonPage() {
  return (
    <GuideTemplate
      title="EICR Southampton | Electrical Safety Certificate Cost 2026"
      description="EICR costs in Southampton for 2026. Landlord legal requirements, Southampton City Council enforcement, post-war housing stock findings, observation codes explained, and how to find a qualified inspector. Prices from £100 for a flat."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR Southampton:{' '}
          <span className="text-yellow-400">Electrical Safety Certificate Cost 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about EICRs in Southampton — costs by property type, landlord legal requirements, council enforcement, post-war housing stock findings, observation codes, and how to find a qualified inspector."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Southampton"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone — Faster Than Paper"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
