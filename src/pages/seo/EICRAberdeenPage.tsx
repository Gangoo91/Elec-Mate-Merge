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
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EICR Guides', href: '/guides/eicr-explained' },
  { label: 'EICR Aberdeen', href: '/eicr-aberdeen' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'legal-requirements', label: 'Legal Requirements in Scotland' },
  { id: 'aberdeen-property', label: 'Aberdeen Property & Wiring' },
  { id: 'eicr-process', label: 'The EICR Process' },
  { id: 'observation-codes', label: 'Observation Codes Explained' },
  { id: 'costs', label: 'EICR Costs in Aberdeen' },
  { id: 'finding-inspector', label: 'Finding a Qualified Inspector' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Private landlords in Scotland must have a valid Electrical Installation Condition Report (EICR) — required under the Housing (Scotland) Act 2006 and the Repairing Standard — with inspections carried out at least every five years.',
  'Aberdeen has a significant stock of pre-1950s granite-built tenements and Victorian terraces. These properties frequently contain rubber-insulated or lead-sheathed cables which degrade with age and are a common source of C1 and C2 observations.',
  'EICR costs in Aberdeen typically range from £100 to £200 for a one-bedroom flat and £180 to £350 for a three-bedroom house, reflecting lower labour rates than London but similar equipment costs.',
  'An EICR must be carried out by a qualified and competent person, in practice someone registered with NICEIC, NAPIT, or ELECSA, holding City and Guilds 2391 (Inspection and Testing) and a current BS 7671 qualification.',
  'The absence of RCD protection on socket-outlet circuits (required under Regulation 411.3.3 of BS 7671) is one of the most frequent C2 findings in Aberdeen rental properties, often necessitating a consumer unit upgrade.',
];

const faqs = [
  {
    question: 'Is an EICR a legal requirement in Aberdeen?',
    answer:
      'Yes. Under the Housing (Scotland) Act 2006 and the associated Repairing Standard, private landlords in Scotland are legally required to ensure electrical installations are in a reasonable state of repair and safe. This is enforced through the requirement for a valid EICR carried out at least every five years. The Scottish Government strengthened these obligations and landlords who do not comply risk enforcement action from the local Housing and Property Chamber.',
  },
  {
    question: 'How much does an EICR cost in Aberdeen?',
    answer:
      'EICR costs in Aberdeen are generally lower than the UK average for major cities. Expect to pay approximately £100 to £200 for a one-bedroom flat, £150 to £280 for a two-bedroom property, and £180 to £350 for a three-bedroom house. Larger houses with multiple circuits or properties with aged wiring (common in Aberdeen\'s granite tenements) may cost more. These prices cover the inspection and report only; any remedial work is quoted separately.',
  },
  {
    question: 'How long does an EICR take in Aberdeen?',
    answer:
      'A typical EICR for a one or two-bedroom Aberdeen flat takes two to three hours. A three-bedroom house takes three to five hours. Older properties with rubber-insulated wiring or non-standard installations may take longer as the inspector must exercise more care. The inspector will need access to all rooms, the consumer unit (fuse board), and any outbuildings.',
  },
  {
    question: 'What happens if my Aberdeen property fails the EICR?',
    answer:
      'An EICR is classified as Unsatisfactory if it contains C1 (danger present) or C2 (potentially dangerous) observations. In Scotland, landlords must complete all remedial work within 28 days of the inspection date, or sooner if the inspector specifies. A follow-up inspection or written confirmation from a qualified electrician is required to confirm the remedial work has been carried out satisfactorily.',
  },
  {
    question: 'Can I use any electrician for an EICR in Aberdeen?',
    answer:
      'Not all electricians are equally qualified to carry out EICRs. The inspector should hold a current City and Guilds 2391 qualification (or equivalent) in Inspection and Testing, as well as an up-to-date BS 7671 qualification (C&G 2382 18th Edition). Registration with a competent person scheme such as NICEIC, NAPIT, or ELECSA provides assurance of qualifications, insurance, and regular assessment. Always verify registration before commissioning an EICR.',
  },
  {
    question: 'What are common EICR findings in Aberdeen properties?',
    answer:
      'Aberdeen\'s older housing stock — particularly granite tenements built before 1960 — frequently presents rubber-insulated cables (which perish and crack with age), the absence of RCD protection on socket-outlet circuits, inadequate earthing and bonding, overloaded consumer units, and deteriorated or non-standard wiring from DIY modifications. These are all recorded as C1 or C2 observations and must be rectified before the installation can be classed as Satisfactory.',
  },
  {
    question: 'How often should an EICR be carried out in Aberdeen?',
    answer:
      'For private rented properties in Aberdeen, the maximum inspection interval is five years. For domestic owner-occupied properties, BS 7671 recommends periodic inspection at a maximum of ten years or on change of occupancy. Many electricians recommend shorter intervals for older properties. Commercial and industrial properties have different recommended intervals depending on the type of installation and environment.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-explained',
    title: 'EICR Explained',
    description: 'A complete guide to Electrical Installation Condition Reports — what they are, what inspectors check, and what the codes mean.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord EICR obligations, compliance deadlines, penalties, and how to manage multiple properties efficiently.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description: 'Understand C1, C2, C3 and FI codes — what they mean, what action is required, and common examples.',
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
          An Electrical Installation Condition Report (EICR) — sometimes called a periodic inspection
          report — is a formal assessment of the safety and condition of an electrical installation
          in an existing building. Unlike a new installation certificate, an EICR evaluates a
          fixed electrical installation that has been in service for some time, assessing whether
          it remains safe and compliant with current standards.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection</strong> — the inspector examines all accessible parts
                of the fixed installation: consumer unit, wiring, sockets, switches, light fittings,
                bonding, and earthing arrangements. They check for damage, deterioration, and
                non-compliant work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing</strong> — the inspector carries out a series of electrical tests
                on circuits and equipment using calibrated instruments. Tests include earth
                continuity, insulation resistance, polarity, earth fault loop impedance, and
                RCD operation. Results are recorded in the{' '}
                <SEOInternalLink href="/tools/eicr-certificate">
                  Schedule of Test Results
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overall assessment</strong> — the installation is classified as either
                Satisfactory or Unsatisfactory. An Unsatisfactory result means the installation
                contains C1 or C2 coded observations that must be rectified before the installation
                can be regarded as safe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standards basis</strong> — EICRs are carried out in accordance with{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>{' '}
                (the IET Wiring Regulations, 18th Edition). The inspection form and coding system
                are defined in the guidance notes accompanying BS 7671.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The completed EICR document lists all observations with their classification codes,
          records all test results, and states an overall assessment and recommended date for
          the next inspection.
        </p>
      </>
    ),
  },
  {
    id: 'legal-requirements',
    heading: 'Legal Requirements for EICRs in Scotland',
    content: (
      <>
        <p>
          Scotland has its own legislative framework for electrical safety in the private rented
          sector, separate from the English regulations. Aberdeen landlords must comply with
          Scottish law.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Housing (Scotland) Act 2006 — Repairing Standard</strong> — private
                landlords in Scotland must ensure that the electrical installation and any
                electrical fixtures, fittings, and appliances provided under the tenancy are in
                a reasonable state of repair and in proper working order. A valid EICR (maximum
                five years old) is the accepted means of demonstrating compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Private Housing (Tenancies) (Scotland) Act 2016</strong> — further
                strengthened tenant rights and landlord obligations. A landlord cannot lawfully
                let a property that does not meet the Repairing Standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord registration</strong> — all private landlords in Aberdeen must
                be registered with Aberdeen City Council. The council can take action — including
                revoking registration — against landlords who fail to maintain their properties
                to the required standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Housing and Property Chamber</strong> — tenants in Scotland can apply
                to the First-tier Tribunal (Housing and Property Chamber) if a landlord fails
                to comply with the Repairing Standard. The tribunal can order the landlord to
                carry out the necessary work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Owner-occupiers in Aberdeen are not legally required to obtain an EICR, but BS 7671
          recommends periodic inspection every ten years or on change of occupancy. Given
          Aberdeen's older housing stock, more frequent inspection is advisable.
        </p>
      </>
    ),
  },
  {
    id: 'aberdeen-property',
    heading: 'Aberdeen Property Stock and Electrical Wiring Considerations',
    content: (
      <>
        <p>
          Aberdeen has a distinctive built environment. The city's historic granite tenements,
          Victorian terraced villas, and inter-war semi-detached houses make up a significant
          proportion of the private rented sector. Electricians carrying out EICRs in Aberdeen
          must be familiar with the wiring challenges these property types present.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Granite tenements (pre-1960)</strong> — Aberdeen's iconic granite
                tenements often retain original rubber-insulated wiring, sometimes with a vulcanised
                rubber or lead sheath. Rubber insulation perishes over time, becoming brittle and
                cracking, which significantly increases the risk of insulation failure and fire.
                Such wiring is invariably recorded as a C2 or C1 observation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Aluminium wiring (1960s–1970s)</strong> — some Aberdeen properties built
                or rewired during the 1960s and 1970s have aluminium conductors. Aluminium wiring
                is prone to oxidation at connections, causing overheating. Inspectors will
                look for signs of overheating at all termination points.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Absence of RCD protection</strong> — properties wired before the widespread
                adoption of RCDs (roughly pre-1990s) frequently lack RCD protection on socket-outlet
                circuits. Under Regulation 411.3.3 of BS 7671, RCD protection with a rated operating
                current not exceeding 30mA is required. Absence is coded C2, making the EICR
                Unsatisfactory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Modern oil industry housing</strong> — Aberdeen's connection to the North
                Sea oil industry brought significant new housing development from the 1970s onwards.
                These properties are generally better wired but may still lack modern RCD protection
                if they have not been updated.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Electricians in Aberdeen should factor additional time into EICR bookings for older
          properties. Careful testing is essential — rubber-insulated cables require lower test
          voltages during insulation resistance testing to avoid damaging already-degraded insulation.
        </p>
      </>
    ),
  },
  {
    id: 'eicr-process',
    heading: 'The EICR Process: What to Expect',
    content: (
      <>
        <p>
          Understanding the EICR process helps both property owners and tenants prepare for the
          inspection and understand the outcome.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Preparation</strong> — ensure all rooms are accessible, including loft
                hatches if the inspector needs to check wiring in the roof space. The consumer
                unit must be accessible throughout the inspection. Tenants should be informed
                in advance that the power may be briefly interrupted during testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection</strong> — the inspector examines all accessible
                wiring, accessories (sockets, switches, light fittings), the consumer unit,
                main earthing terminal, bonding conductors to gas and water services, and
                any external installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing</strong> — circuits are tested individually. The inspector
                will typically de-energise circuits one at a time to carry out tests. Test
                results are recorded in the Schedule of Test Results, which forms part of the
                completed EICR document.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Report and handover</strong> — the inspector completes the EICR on
                site (or shortly afterwards) and provides it to the client. The report states
                an overall outcome (Satisfactory or Unsatisfactory), all observations with
                codes, and a recommended date for the next inspection.
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
          Every defect, non-compliance, or area requiring further investigation found during an
          EICR is assigned a code. The coding system is defined in BS 7671 and its associated
          guidance notes.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 — Danger present</strong> — a risk of injury exists. C1 observations
                require immediate remedial action. The inspector may recommend immediate
                disconnection. An EICR containing a C1 observation is automatically Unsatisfactory.
                Examples include exposed live conductors, missing earthing, or severely damaged
                cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — Potentially dangerous</strong> — urgent remedial action required.
                The installation is potentially dangerous but does not present an immediate risk.
                C2 observations make the EICR Unsatisfactory. Examples include absence of RCD
                protection, deteriorated rubber insulation, and inadequate bonding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>C3 — Improvement recommended</strong> — the installation does not meet
                current standards but is not unsafe. C3 observations do not make the EICR
                Unsatisfactory. They represent best practice improvements rather than safety
                defects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-white mt-0.5 shrink-0" />
              <span>
                <strong>FI — Further investigation required</strong> — the inspector cannot
                assess this aspect without further investigation. The EICR is Unsatisfactory
                until the investigation is completed.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For a full explanation of observation codes and common examples, see the{' '}
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
    heading: 'EICR Costs in Aberdeen (2026 Prices)',
    content: (
      <>
        <p>
          Aberdeen EICR prices are broadly in line with the Scottish average, reflecting
          competitive local labour rates. Prices are generally lower than London and the
          South East of England.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £100 to £200. Typically 3 to 5 circuits.
                Purpose-built flats are generally faster to inspect than tenement conversions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom property</strong> — £150 to £280. Allows for 5 to 8 circuits
                and some additional complexity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £180 to £350. Older granite properties
                with degraded wiring or multiple sub-boards will be at the higher end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO or larger property</strong> — £300 to £600+. Multiple consumer
                units, fire alarm systems, and a higher circuit count increase the scope and cost.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices are for the inspection and report only. Remedial work identified during
          the EICR — such as a consumer unit upgrade to provide RCD protection — is quoted
          and charged separately. A consumer unit replacement in Aberdeen typically costs
          £400 to £700 including all materials.
        </p>
      </>
    ),
  },
  {
    id: 'finding-inspector',
    heading: 'Finding a Qualified EICR Inspector in Aberdeen',
    content: (
      <>
        <p>
          Aberdeen has a healthy pool of qualified electricians, though inspection and testing
          work requires specific qualifications that not every electrician holds.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use a competent person scheme member</strong> — search the NICEIC,
                NAPIT, or ELECSA registers for electricians based in or covering Aberdeen.
                Registration confirms qualifications, insurance, and regular technical assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify inspection qualifications</strong> — the inspector should hold
                City and Guilds 2391 (Inspection and Testing of Electrical Installations) or
                the equivalent C&G 2395 qualification, and a current BS 7671 qualification
                (C&G 2382 18th Edition). Ask for evidence of these qualifications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Experience with older properties</strong> — given Aberdeen's housing
                stock, prefer electricians with experience of pre-1960s wiring and the
                challenges of granite tenement properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Avoid very cheap quotes</strong> — an EICR for a three-bedroom Aberdeen
                house quoted at under £120 should raise questions about thoroughness. A proper
                EICR takes three to five hours and requires expensive calibrated instruments.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Completing EICRs in Aberdeen',
    content: (
      <>
        <p>
          Aberdeen's private rented sector — boosted historically by the oil industry — creates
          steady demand for landlord EICRs. Electricians who build a reputation for thorough,
          reliable EICR work can develop a sustainable income stream from inspection and testing
          alongside installation work.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EICRs On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to fill in the report on your phone while still at the Aberdeen property.
                  AI board scanning, voice test entry, and instant PDF export eliminate
                  evening paperwork. Send the completed report to the landlord before you
                  leave the site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote the Remedial Work On the Day</h4>
                <p className="text-white text-sm leading-relaxed">
                  When C1 or C2 observations are identified in Aberdeen properties, quote the
                  remedial work immediately using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Scottish landlords must act within 28 days — the electrician who quotes
                  on the day of the EICR wins the work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Aberdeen EICR business with Elec-Mate"
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

export default function EICRAberdeenPage() {
  return (
    <GuideTemplate
      title="EICR Aberdeen | Electrical Installation Condition Report Aberdeen"
      description="EICR Aberdeen — costs, legal requirements, and what to expect from an Electrical Installation Condition Report in Aberdeen. Guidance for landlords, homeowners, and electricians covering Scottish regulations, granite tenement wiring, and 2026 pricing."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          EICR Aberdeen:{' '}
          <span className="text-yellow-400">Electrical Inspection Guide 2026</span>
        </>
      }
      heroSubtitle="Everything you need to know about Electrical Installation Condition Reports in Aberdeen — legal requirements under Scottish law, costs, what inspectors look for in Aberdeen's granite tenements, finding qualified inspectors, and guidance for electricians."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Aberdeen"
      relatedPages={relatedPages}
      ctaHeading="Complete Aberdeen EICRs on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
