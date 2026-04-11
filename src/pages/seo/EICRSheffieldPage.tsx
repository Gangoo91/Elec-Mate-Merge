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
  { label: 'EICR Sheffield', href: '/guides/eicr-sheffield' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'sheffield-costs', label: 'EICR Cost in Sheffield' },
  { id: 'legal-requirements', label: 'Legal Requirements' },
  { id: 'observation-codes', label: 'Observation Codes Explained' },
  { id: 'sheffield-properties', label: 'Sheffield Property Challenges' },
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
  'Sheffield EICR costs are below the national average. Expect to pay between £150 and £280 for a two-bedroom terraced house and £250 to £400 for a three-bedroom semi-detached property.',
  'Since 1 April 2021, landlords in England must obtain an EICR before a new tenancy begins and at least every five years. Sheffield City Council enforces the regulations and can impose fines of up to £30,000 per breach.',
  'Sheffield has a large stock of Victorian and Edwardian terraced housing, particularly in areas such as Sharrow, Walkley, Crookes and Heeley. These properties frequently present aged wiring, absent earthing and lack of RCD protection.',
  'Northern Powergrid is the Distribution Network Operator (DNO) for Sheffield. Supply-side issues such as deteriorated cut-outs, TN-C-S (PME) earthing and looped services in older terraces are common findings during EICRs.',
];

const faqs = [
  {
    question: 'How much does an EICR cost in Sheffield?',
    answer:
      'EICR costs in Sheffield are generally lower than the national average. A one-bedroom flat typically costs £120 to £200. A two-bedroom terraced house costs £150 to £280. A three-bedroom semi-detached costs £250 to £400. Larger properties with multiple consumer units cost more. Sheffield prices reflect lower labour rates and easier parking compared to major cities like London or Manchester.',
  },
  {
    question: 'Is an EICR a legal requirement for landlords in Sheffield?',
    answer:
      'Yes. Since 1 April 2021, the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require landlords to obtain an EICR before the start of a new tenancy and at least every five years thereafter. The EICR must be carried out by a qualified person registered with a competent person scheme such as NICEIC, NAPIT, or ELECSA. A copy must be provided to tenants within 28 days and to Sheffield City Council within seven days if requested. Failure to comply can result in a civil penalty of up to £30,000 per breach.',
  },
  {
    question: 'What happens if my Sheffield property fails an EICR?',
    answer:
      'An EICR does not technically pass or fail. It is assessed as either Satisfactory or Unsatisfactory. If the report is Unsatisfactory (meaning C1 or C2 observations are present), the landlord must arrange for remedial work within 28 days (or sooner if the inspector recommends it). The remedial work must be carried out by a qualified electrician, and the original inspector (or another qualified person) must confirm the work has been completed and update the EICR accordingly.',
  },
  {
    question: 'How long does an EICR take in Sheffield?',
    answer:
      'The duration depends on the property size and the number of circuits. A one-bedroom flat with a single consumer unit typically takes 2 to 3 hours. A three-bedroom house with 10 to 15 circuits takes 3 to 4 hours. Older terraced houses in areas like Sharrow and Walkley often take longer because of concealed wiring, lack of circuit identification, and the need to trace cables through plaster walls.',
  },
  {
    question: 'Who is the DNO for Sheffield?',
    answer:
      'Northern Powergrid is the Distribution Network Operator for Sheffield. They are responsible for the electricity supply up to and including the cut-out (service fuse). If the EICR inspector identifies supply-side issues such as a deteriorated cut-out, absent earth terminal, or inadequate main fuse rating, the landlord or property owner will need to contact Northern Powergrid to arrange remedial work on their equipment.',
  },
  {
    question: 'Do I need an EICR for a Sheffield property I own and live in?',
    answer:
      'There is no legal requirement for owner-occupiers to obtain an EICR. However, it is strongly recommended every 10 years (or every 5 years for properties over 25 years old) as best practice under BS 7671 Regulation 134.2. If you are selling the property, an EICR is not legally required but mortgage lenders and conveyancers increasingly request one.',
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
          Results, which form part of the report. Each observation is classified using a code system
          (C1, C2, C3, FI) that indicates the severity and urgency of any defects found.
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
    id: 'sheffield-costs',
    heading: 'EICR Cost in Sheffield (2026 Prices)',
    content: (
      <>
        <p>
          Sheffield EICR costs are generally lower than the national average, reflecting lower
          electrician labour rates and easier access and parking compared to larger cities. Below
          are typical 2026 prices for Sheffield EICRs:
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
                Sharrow, Heeley and Crookes. Usually 5 to 8 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom semi-detached</strong> — £250 to £400. Expect 8 to 15
                circuits. Older properties in Walkley and Nether Edge often take longer due to aged
                wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom+ detached</strong> — £350 to £550+. Larger properties may have
                multiple consumer units or outbuildings that increase the scope of inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO (House in Multiple Occupation)</strong> — £350 to £700+. Sheffield has a
                large student rental market near the universities, and many HMOs require EICRs with
                multiple consumer units and fire alarm systems within scope.
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
          Sheffield falls under these regulations. The key legal requirements are:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before a new tenancy</strong> — the landlord must ensure the electrical
                installation is inspected and tested by a qualified person, and obtain an EICR,
                before a new tenant moves in. This applies to all new tenancies from 1 July 2020 and
                all existing tenancies from 1 April 2021.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Every five years</strong> — the EICR must be renewed at least every five
                years, or sooner if the inspector recommends a shorter interval. BS 7671 Regulation
                134.2 requires periodic inspection regimes that confirm installations remain safe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant notification</strong> — a copy of the EICR must be provided to the
                tenant within 28 days of the inspection. New tenants must receive a copy before they
                move in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial work</strong> — if the EICR identifies C1 or C2 observations, the
                landlord must complete remedial work within 28 days (or sooner if the inspector
                specifies a shorter timeframe). Written confirmation of completion must be provided
                to the tenant and the local authority if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Penalties</strong> — Sheffield City Council can impose civil penalties of up
                to £30,000 per breach. The council has powers to arrange remedial work itself and
                recover costs from the landlord if necessary.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The regulations apply to all private rented properties in England, including Houses in
          Multiple Occupation (HMOs). Sheffield's large student rental market means the council is
          particularly active in enforcing HMO standards, including electrical safety.
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
              recommend disconnecting the dangerous circuit or installation on the spot. Examples
              include exposed live conductors, missing consumer unit covers, and severely damaged
              wiring.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C2 — Potentially Dangerous</h3>
            <p className="text-white text-sm leading-relaxed">
              Could become dangerous. Urgent remedial action is required. Common C2 findings in
              Sheffield include absent or inadequate earthing, lack of RCD protection on socket
              circuits, overloaded circuits, and deteriorated cable insulation in older terraced
              properties.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C3 — Improvement Recommended</h3>
            <p className="text-white text-sm leading-relaxed">
              Not immediately dangerous but improvement would enhance safety. C3 observations do not
              make the EICR Unsatisfactory. Common examples include lack of supplementary bonding in
              bathrooms (where not required by current regulations) and older but functional
              accessories.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">FI — Further Investigation</h3>
            <p className="text-white text-sm leading-relaxed">
              The inspector could not fully assess a part of the installation and further
              investigation is needed. This is common in older Sheffield terraces where wiring is
              concealed in plaster or under floorboards that cannot be lifted during the inspection.
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
    id: 'sheffield-properties',
    heading: 'Sheffield Property Challenges',
    content: (
      <>
        <p>
          Sheffield's housing stock presents specific challenges for EICR inspectors. The city has a
          mix of Victorian terraces, post-war council housing, 1960s–70s estates, and modern
          developments, each with distinct electrical characteristics:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian terraces (Sharrow, Walkley, Crookes)</strong> — many of these
                properties still have original or early-replacement wiring. Rubber-insulated cables,
                absent CPCs (circuit protective conductors), and rewirable fuses are common
                findings. Earthing may rely on water pipes, which is no longer acceptable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Post-war council stock (Manor, Gleadless, Parson Cross)</strong> — many
                ex-council properties were rewired in the 1970s or 1980s with PVC cables but retain
                original consumer units with rewirable fuses. These often lack RCD protection
                entirely — a C2 observation under BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student HMOs</strong> — Sheffield has two large universities, creating high
                demand for shared student housing. HMO conversions in areas like Broomhill,
                Crookesmoor, and Ecclesall Road often have extended wiring, additional circuits, and
                fire alarm systems that increase the complexity of the EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Northern Powergrid supply issues</strong> — Northern Powergrid is the DNO
                for Sheffield. Older properties may have deteriorated service cut-outs, looped
                services between terraced houses, and TN-C-S (PME) supplies that require careful
                assessment of earthing arrangements.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians working in Sheffield should allow extra time when quoting EICRs for Victorian
          terraces and HMO conversions. A two-bedroom Victorian terrace may take 3 to 4 hours
          compared to 2 hours for a modern-build flat.
        </p>
      </>
    ),
  },
  {
    id: 'landlord-obligations',
    heading: 'Landlord Obligations in Sheffield',
    content: (
      <>
        <p>
          Sheffield landlords have specific obligations under the Electrical Safety Standards in the
          Private Rented Sector (England) Regulations 2020. Sheffield City Council is the enforcing
          authority:
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
                <strong>Provide copies</strong> — a copy of the EICR must be given to existing
                tenants within 28 days, to new tenants before they move in, and to Sheffield City
                Council within seven days of a request.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complete remedial work</strong> — any C1 or C2 observations must be
                addressed within 28 days (or sooner if the inspector specifies). Confirmation of
                completion must be obtained from a qualified person.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing</strong> — Sheffield operates mandatory and additional HMO
                licensing schemes. A valid EICR is a condition of any HMO licence. The council
                actively inspects licensed HMOs and checks electrical safety compliance.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Sheffield City Council can impose civil penalties of up to £30,000 per breach. The council
          also has powers to carry out remedial work in default and recover the costs from the
          landlord. Keeping a valid EICR is essential for compliance and for protecting tenants.
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
          need to be switched off for parts of the testing — typically 30 to 60 minutes for a
          standard property.
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
        <p>
          Tenants and landlords should prepare by ensuring clear access to the consumer unit and
          meter, removing items stored in front of electrical equipment, and making all rooms
          accessible.
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
                <strong>Owner-occupied domestic</strong> — every 10 years is the recommended
                interval as best practice. Properties over 25 years old or with known wiring issues
                should be inspected every 5 years.
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
                rented properties) whenever a property changes occupant, even if the previous EICR
                has not expired.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The inspector may recommend a shorter interval than the standard maximum if the
          installation is in poor condition. For example, a Victorian Sheffield terrace with
          multiple C3 observations may have a recommended next inspection of 3 years rather than the
          standard 5 years.
        </p>
      </>
    ),
  },
  {
    id: 'find-inspector',
    heading: 'Finding a Qualified EICR Inspector in Sheffield',
    content: (
      <>
        <p>
          For landlord compliance, the EICR must be carried out by a person who is qualified and
          competent. The regulations specify that the inspector should be a member of a competent
          person scheme or a person who the landlord can demonstrate is qualified and competent.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — NICEIC, NAPIT, ELECSA, STROMA, and other
                approved bodies maintain registers of qualified electricians. NAPIT is headquartered
                near Sheffield (in Mansfield), and many Sheffield electricians are NAPIT-registered.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications</strong> — the inspector should hold City & Guilds 2391
                (Inspection and Testing) or City & Guilds 2395 (Initial Verification and
                Certification), or the combined 2394/2395 qualification. They should also hold a
                current BS 7671 qualification (C&G 2382 18th Edition).
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
        <p>
          Be cautious of extremely low-priced EICR offers. An EICR for a two-bedroom terraced house
          that is priced below £120 may indicate a rushed inspection, inadequate testing, or an
          unqualified inspector. A thorough EICR takes time and requires expensive calibrated test
          instruments.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in Sheffield',
    content: (
      <>
        <p>
          Sheffield offers strong demand for EICR work, driven by a large private rented sector, two
          major universities generating student HMO demand, and a high proportion of older housing
          stock requiring regular inspection.
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
                  to complete the report on your phone while you are still on site. AI board
                  scanning reads the consumer unit schedule, voice entry records test results
                  hands-free, and instant PDF export sends the report to the landlord before you
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
                  When the EICR identifies C1 or C2 observations, quote the remedial work
                  immediately using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Landlords are legally obligated to act within 28 days — the electrician who
                  delivers the quote on the day of the EICR is most likely to win the remedial work.
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

export default function EICRSheffieldPage() {
  return (
    <GuideTemplate
      title="EICR Sheffield | Electrical Safety Certificate Cost 2026"
      description="EICR costs in Sheffield for 2026. Landlord legal requirements, Sheffield property challenges, observation codes explained, and how to find a qualified inspector. Prices from £120 for a flat to £400+ for a house."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR Sheffield:{' '}
          <span className="text-yellow-400">Electrical Safety Certificate Cost 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about EICRs in Sheffield — costs by property type, landlord legal requirements, Northern Powergrid supply issues, observation codes, and how to find a qualified inspector."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Sheffield"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone — Faster Than Paper"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
