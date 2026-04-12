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
  { label: 'EICR Belfast', href: '/guides/eicr-belfast' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'belfast-costs', label: 'EICR Cost in Belfast' },
  { id: 'legal-requirements', label: 'Legal Requirements (Northern Ireland)' },
  { id: 'local-housing', label: 'Belfast Housing Stock' },
  { id: 'observation-codes', label: 'Observation Codes Explained' },
  { id: 'what-to-expect', label: 'What to Expect During an EICR' },
  { id: 'how-often', label: 'How Often Is an EICR Needed?' },
  { id: 'find-inspector', label: 'Finding a Qualified Inspector' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  "An EICR (Electrical Installation Condition Report) is a formal inspection of a property's fixed electrical installation, carried out in accordance with BS 7671:2018+A3:2024 (Section 631). Belfast electricians use the same technical standard as the rest of the UK.",
  'Belfast EICR costs are among the most affordable in the UK. Expect to pay between £90 and £180 for a two-bedroom flat and £140 to £260 for a three-bedroom house.',
  'Northern Ireland has its own legislative framework. EICR requirements for private landlords in Northern Ireland are enforced under the Housing (Amendment) Act (Northern Ireland) 2022, which introduced mandatory electrical safety checks similar to those in England.',
  'Belfast has a significant proportion of Victorian and inter-war terraced housing, as well as 1960s and 1970s social housing that has been privatised or transferred to housing associations. Both housing types commonly produce C2 EICR findings.',
  'The Northern Ireland Housing Executive (NIHE) and district councils share enforcement responsibilities. Landlords who rent privately in Belfast must comply with the Private Tenancies Act (Northern Ireland) 2022 requirements on electrical safety.',
];

const faqs = [
  {
    question: 'How much does an EICR cost in Belfast?',
    answer:
      'Belfast EICR prices are among the most competitive in the UK. A one-bedroom flat typically costs £80 to £160. A two-bedroom flat costs £90 to £180. A three-bedroom house costs £140 to £260. Larger properties or HMOs with multiple consumer units cost more. Prices vary between electricians, so it is worth obtaining two or three quotes. As with any professional inspection, very low quotes may indicate a rushed or incomplete inspection — a thorough EICR on a two-bedroom Belfast flat takes at least two to three hours.',
  },
  {
    question: 'Is an EICR a legal requirement for landlords in Belfast?',
    answer:
      'Yes. The Housing (Amendment) Act (Northern Ireland) 2022 introduced mandatory electrical safety requirements for private landlords in Northern Ireland that are broadly similar to the 2020 Regulations that apply in England. Private landlords in Belfast must obtain an EICR by a qualified and competent person and must ensure the installation is safe and in proper working order. The Private Tenancies Act (Northern Ireland) 2022 sets out landlord obligations, and Belfast City Council and the Northern Ireland Housing Executive have enforcement powers.',
  },
  {
    question: 'Is the EICR legal framework different in Belfast compared to England?',
    answer:
      'Yes. Northern Ireland has devolved housing legislation. The Housing (Amendment) Act (Northern Ireland) 2022 and the Private Tenancies Act (Northern Ireland) 2022 set out electrical safety requirements for Northern Ireland, rather than the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 which apply in England. However, the technical standard used for the EICR itself — BS 7671 — is the same across the UK. An EICR produced in Belfast uses the same forms, observation codes, and test methods as one produced in London or Manchester.',
  },
  {
    question: 'What are the most common EICR findings in Belfast properties?',
    answer:
      "Common findings in Belfast reflect the city's Victorian, inter-war, and post-war housing stock. Absent RCD protection on socket circuits is a very common C2 finding under BS 7671. Older wiring types (rubber-insulated cables, aluminium wiring in some 1960s and 1970s properties) are frequently identified. Inadequate earthing and bonding, overloaded circuits, and deteriorated cable insulation are also common. Properties in the Markets, Lower Falls, and East Belfast areas with original 1950s or 1960s wiring frequently require rewiring following an EICR.",
  },
  {
    question: 'How long does an EICR take in Belfast?',
    answer:
      'A one-bedroom flat typically takes two to three hours. A three-bedroom terraced house takes three to four hours. Larger properties or those with multiple consumer units, outbuildings, or complex older wiring take longer. Belfast terraced houses with original wiring from the 1950s or 1960s may take four hours or more because circuit identification is often poor. Ensure the inspector has unobstructed access to all rooms, the consumer unit, and the meter position before they arrive.',
  },
  {
    question: 'Who can carry out an EICR in Belfast?',
    answer:
      'An EICR must be carried out by a qualified and competent person. In Northern Ireland, the inspector should hold appropriate electrical qualifications such as City & Guilds 2391 (Inspection and Testing) and the 18th Edition (BS 7671) qualification. Membership of a competent person scheme (NICEIC, NAPIT, ELECSA, or the equivalent NICEIC NI register) provides landlords with a straightforward way to demonstrate they have used a qualified inspector. The Northern Ireland Housing Executive and district councils accept reports from registered competent persons.',
  },
  {
    question: 'What happens if a Belfast rental property has an Unsatisfactory EICR?',
    answer:
      'If the EICR is Unsatisfactory due to C1 or C2 observations, the landlord must arrange for remedial work to be completed promptly. In Northern Ireland, the Private Tenancies Act (Northern Ireland) 2022 requires landlords to ensure electrical installations are safe. Failure to address identified hazards can result in enforcement action by Belfast City Council or the Northern Ireland Housing Executive, including improvement notices and financial penalties. The landlord must obtain written confirmation that the remedial work has been completed and should retain this alongside the EICR.',
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
          (Section 631), which applies across the entire United Kingdom including Northern Ireland.
          The technical standard, test methods, and observation codes are identical whether the
          inspection takes place in Belfast, London, or anywhere else in the UK.
        </p>
        <p>
          The inspector conducts a visual inspection followed by a programme of testing. Results are
          recorded on Schedules of Circuit Details and Test Results. Each observation is classified
          as C1, C2, C3, or FI depending on its severity. The overall assessment is either
          Satisfactory or Unsatisfactory.
        </p>
      </>
    ),
  },
  {
    id: 'belfast-costs',
    heading: 'EICR Cost in Belfast (2026 Prices)',
    content: (
      <>
        <p>
          Belfast EICR prices are among the most competitive in the UK, reflecting lower labour
          rates and operating costs compared to major English cities. Below are typical 2026 prices
          for Belfast EICRs:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Studio / one-bedroom flat</strong> — £80 to £160. Common in the city centre,
                Titanic Quarter, and student areas near Queen's University.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat</strong> — £90 to £180. Purpose-built flats and converted
                Victorian terraces both common in South and East Belfast.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £140 to £260. Victorian and inter-war
                terraced houses in inner Belfast areas frequently have older wiring requiring
                attention.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom+ house</strong> — £220 to £380+. Larger properties or those
                with multiple consumer units or outbuildings cost more to inspect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO</strong> — £280 to £550+. The student HMO market near Queen's University
                and Ulster University's Belfast campus is significant. HMOs have a broader
                inspection scope.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices are for the inspection and report only. Remedial work is quoted and charged
          separately. Some Belfast electricians offer combined EICR and remedial packages for
          portfolio landlords.
        </p>
      </>
    ),
  },
  {
    id: 'legal-requirements',
    heading: 'Legal Requirements for EICRs in Northern Ireland',
    content: (
      <>
        <p>
          Northern Ireland has its own devolved housing legislation that sets out electrical safety
          requirements for private landlords. The key legislation is the Housing (Amendment) Act
          (Northern Ireland) 2022 and the Private Tenancies Act (Northern Ireland) 2022, which
          together introduced mandatory electrical safety requirements broadly similar to those in
          England:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical safety obligation</strong> — private landlords in Northern
                Ireland must ensure that the electrical installation in the rented property is in a
                reasonable state of repair and in proper working order. The Housing (Amendment) Act
                (Northern Ireland) 2022 strengthened these requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR requirement</strong> — landlords must obtain an EICR from a qualified
                person and must provide a copy to tenants. The recommended maximum interval for
                periodic inspection of rented properties is five years, aligned with BS 7671
                Regulation 134.2 guidance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Enforcement bodies</strong> — Belfast City Council and the Northern Ireland
                Housing Executive (NIHE) share responsibility for enforcing landlord compliance in
                Belfast. The NIHE also administers the private tenancy registration scheme which
                landlords must use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial work</strong> — where an EICR identifies C1 or C2 observations, the
                landlord must arrange for remedial work to be completed promptly and retain
                documentary evidence that the work has been done.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Note: the legislative framework in Northern Ireland differs from England. Landlords
          managing properties in both jurisdictions should be aware of the different legislative
          requirements that apply to each.
        </p>
      </>
    ),
  },
  {
    id: 'local-housing',
    heading: 'Belfast Housing Stock and Common EICR Findings',
    content: (
      <>
        <p>
          Belfast's housing stock includes Victorian and Edwardian terraced housing in the inner
          city, inter-war semi-detached properties in the suburbs, and substantial amounts of 1950s
          and 1960s social housing that has been transferred to the private sector or housing
          associations. These property types each have characteristic EICR findings:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Absent RCD protection</strong> — BS 7671 requires 30 mA RCD protection on
                socket circuits and concealed cables. This is the most common C2 finding in
                Belfast's older housing stock. Many properties still have consumer units installed
                in the 1980s or early 1990s without RCD protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Aluminium wiring in 1960s and 1970s properties</strong> — some post-war
                Belfast properties were wired with aluminium conductors. Aluminium wiring is
                compatible with modern accessories only when appropriate connectors are used.
                Incorrect connections at socket outlets and switches are a safety concern.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rubber-insulated cables</strong> — Victorian and inter-war properties with
                original wiring may still have rubber-insulated cables. The rubber insulation
                degrades over decades and may crumble when disturbed, creating a C1 or C2 hazard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inadequate earthing and bonding</strong> — properties that have not been
                updated since original installation often have undersized protective conductors or
                absent main protective bonding to gas and water services. This is a common C2
                finding in Belfast terraced houses.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians working in inner Belfast areas such as the Markets, Lower Falls, Shankill,
          East Belfast, and North Belfast should expect a higher proportion of older wiring and
          allow additional inspection time accordingly.
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
          . These codes apply throughout the UK including Northern Ireland:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C1 — Danger Present</h3>
            <p className="text-white text-sm leading-relaxed">
              Risk of injury exists. Immediate remedial action is required. The inspector may
              recommend disconnecting the dangerous circuit. Examples include exposed live
              conductors, crumbling rubber-insulated cables, and missing consumer unit covers.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C2 — Potentially Dangerous</h3>
            <p className="text-white text-sm leading-relaxed">
              Could become dangerous. Urgent remedial action required. In Belfast properties the
              most common C2 findings are absent RCD protection (BS 7671 Section 411), inadequate
              earthing, and deteriorated wiring insulation.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C3 — Improvement Recommended</h3>
            <p className="text-white text-sm leading-relaxed">
              Not immediately dangerous. C3 observations do not make the EICR Unsatisfactory. Common
              examples include older but functional socket outlets and outdated consumer units that
              are still operating correctly.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">FI — Further Investigation</h3>
            <p className="text-white text-sm leading-relaxed">
              The inspector could not fully assess a part of the installation. Common in Belfast
              properties where cables run beneath solid concrete floors or behind fixed kitchen and
              bathroom fittings.
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
          The EICR process involves a visual inspection followed by a programme of testing. The
          inspector needs access to all rooms, the consumer unit, the meter, and any outbuildings.
          Power will be isolated during dead testing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection</strong> — consumer unit, protective devices, cable
                condition, socket outlets, light fittings, switches, and earthing and bonding
                connections.
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
                <strong>Private rented property (Northern Ireland)</strong> — the Housing
                (Amendment) Act (Northern Ireland) 2022 requires landlords to ensure the
                installation is safe. A maximum five-year interval for EICRs aligns with BS 7671
                Regulation 134.2 guidance.
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
                <strong>HMO</strong> — every 5 years as a minimum under HMO licensing conditions.
                The NIHE or district council may specify a shorter interval for properties with
                older wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Change of tenancy</strong> — a new EICR is recommended when a property
                changes occupant, to confirm the installation is safe for the incoming tenant.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'find-inspector',
    heading: 'Finding a Qualified EICR Inspector in Belfast',
    content: (
      <>
        <p>
          For landlord compliance, the EICR must be carried out by a qualified and competent person.
          In Belfast, as in the rest of the UK, using an inspector registered with a competent
          person scheme is the most straightforward way to demonstrate qualification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — NICEIC, NAPIT, and ELECSA operate
                registers covering Northern Ireland. NICEIC also has a dedicated Northern Ireland
                register. Search for Belfast-based inspectors accepted by the NIHE and Belfast City
                Council.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications</strong> — City & Guilds 2391 (Inspection and Testing) or the
                2394/2395 combination, plus a current 18th Edition (C&G 2382) qualification.
                Experience with Belfast's older housing stock is an advantage.
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
    heading: 'For Electricians: EICR Work in Belfast',
    content: (
      <>
        <p>
          Belfast's growing private rented sector, expanding student population, and significant
          proportion of older housing create consistent demand for EICR work. The high proportion of
          properties with ageing wiring means that EICRs frequently lead to remedial work
          opportunities.
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
                  consumer unit, voice entry records test results hands-free, and instant PDF export
                  delivers the report to landlords before you leave.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Remedial Work on the Day</h4>
                <p className="text-white text-sm leading-relaxed">
                  When the EICR identifies C1 or C2 observations, quote the remedial work
                  immediately using the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Belfast landlords need to act promptly — the electrician who delivers the quote
                  on the day of the EICR is most likely to win the follow-on work.
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

export default function EICRBelfastPage() {
  return (
    <GuideTemplate
      title="EICR Belfast | Electrical Safety Certificate Cost 2026"
      description="EICR costs in Belfast for 2026. Northern Ireland landlord legal requirements under the Housing (Amendment) Act (NI) 2022, Belfast housing stock findings, observation codes, and how to find a qualified inspector. Prices from £80 for a flat."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={FileCheck2}
      heroTitle={
        <>
          EICR Belfast:{' '}
          <span className="text-yellow-400">Electrical Safety Certificate Cost 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about EICRs in Belfast — costs by property type, Northern Ireland landlord legal requirements, enforcement, local housing stock findings, observation codes, and how to find a qualified inspector."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Belfast"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone — Faster Than Paper"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
