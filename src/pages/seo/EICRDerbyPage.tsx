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
  Search,
  Clock,
  Zap,
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EICR Guides', href: '/guides/eicr-for-landlords' },
  { label: 'EICR Derby', href: '/eicr-derby' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'legal-requirements', label: 'Legal Requirements in Derby' },
  { id: 'derby-enforcement', label: 'Derby City Council Enforcement' },
  { id: 'eicr-costs-derby', label: 'EICR Costs in Derby' },
  { id: 'hmo-requirements', label: 'HMO Requirements in Derby' },
  { id: 'inspection-frequency', label: 'EICR Frequency' },
  { id: 'common-findings', label: 'Common EICR Findings in Derby' },
  { id: 'finding-electrician', label: 'Finding a Qualified Electrician in Derby' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Derby to obtain a valid EICR before every new tenancy and at least every five years.',
  'Derby City Council enforces the 2020 Regulations and can impose civil penalties of up to £30,000 per breach on non-compliant landlords.',
  'EICR costs in Derby typically range from £150 to £280 for a standard two-bedroom property, reflecting East Midlands labour rates.',
  'Derby has a significant stock of inter-war and post-war housing, as well as older terraced properties in inner-city areas, all of which frequently generate EICR findings around consumer units and wiring condition.',
  'Landlords must complete all remedial work identified by C1 or C2 observations within 28 days of the EICR. Failure is a separate breach and can attract an additional penalty of up to £30,000.',
];

const faqs = [
  {
    question: 'Is an EICR required for rental properties in Derby?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply throughout England, including Derby. Private landlords must ensure the electrical installation is inspected and tested by a qualified person at intervals of no more than five years and before each new tenancy. A copy of the EICR must be provided to tenants within 28 days of the inspection and to Derby City Council within seven days if requested.',
  },
  {
    question: 'How much does an EICR cost in Derby?',
    answer:
      'EICR costs in Derby typically range from £150 to £190 for a one-bedroom flat, £175 to £260 for a two-bedroom property, £210 to £300 for a three-bedroom house, and £300 to £500 for larger properties or HMOs. East Midlands labour rates are moderate, sitting between the lower North of England rates and the higher London and South East rates. Always obtain quotes from NICEIC or NAPIT registered electricians.',
  },
  {
    question: 'What happens if my Derby rental property fails the EICR?',
    answer:
      'If the EICR contains C1 or C2 observations, it is classified as Unsatisfactory. The landlord must arrange and complete all required remedial work within 28 days of the inspection, or sooner if the report specifies. Written confirmation of the completed work must be provided to the tenant and to Derby City Council. Failing to complete remedial work within the required timescale is itself a separate breach of the regulations and can attract a further civil penalty.',
  },
  {
    question: 'Can Derby City Council fine me for not having an EICR?',
    answer:
      'Yes. Derby City Council, as the local housing authority, can impose civil financial penalties of up to £30,000 per breach of the 2020 Regulations. Each separate failure constitutes its own breach. A landlord who has never obtained an EICR and then ignores a remedial notice could face multiple separate penalties. The council can also arrange for work to be carried out and recover costs from the landlord.',
  },
  {
    question: 'How long is an EICR valid in Derby?',
    answer:
      'For standard private rental properties, an EICR is valid for five years or until the inspector recommends an earlier re-inspection. A new EICR is required when a new tenancy begins if the current report has expired. HMO licensed properties may have shorter intervals stipulated in their licence conditions. Check your specific licence conditions with Derby City Council.',
  },
  {
    question: 'Do I need an EICR for an HMO in Derby?',
    answer:
      'Yes. HMOs with five or more occupants in two or more households require a mandatory HMO licence from Derby City Council, for which a valid EICR is a mandatory condition. Smaller HMOs may also be subject to additional licensing in some areas of Derby. Operating an unlicensed HMO is a criminal offence that can result in prosecution, unlimited fines, and banning orders.',
  },
  {
    question: 'What qualifications should an EICR electrician have in Derby?',
    answer:
      'The inspector must be a qualified and competent person. For landlord compliance, this means registration with a competent person scheme such as NICEIC, NAPIT, or ELECSA. The inspector should hold City and Guilds 2391 (Inspection and Testing) or equivalent, and a current 18th Edition BS 7671 qualification (C&G 2382). Verify registration on the NICEIC or NAPIT websites before booking.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Complete guide to landlord EICR requirements, compliance deadlines, and penalties across England.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what landlords must do.',
    icon: ClipboardCheck,
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
          An Electrical Installation Condition Report (EICR) is a formal document produced by a
          qualified electrician following a thorough inspection and electrical testing of the fixed
          installation in a property. The inspection covers the consumer unit, all wiring, circuits,
          sockets, switches, light fittings, earthing arrangements, and bonding conductors. It is
          carried out in accordance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671 18th Edition
          </SEOInternalLink>
          , the national standard for electrical installations.
        </p>
        <p>
          Observations identified during the inspection are assigned classification codes based on
          their severity:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 — Danger present:</strong> Immediate risk of injury. The inspector may
                recommend that the affected circuit is isolated. Emergency remedial action is
                required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — Potentially dangerous:</strong> Not immediately dangerous but urgent
                remedial action is required. Landlords must complete rectification within 28 days
                under the 2020 Regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>C3 — Improvement recommended:</strong> Below current standards but not
                classified as dangerous. No mandatory action under the regulations, but prudent to
                address when possible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>FI — Further investigation:</strong> An issue exists that cannot be fully
                assessed without additional investigation. This should be arranged promptly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          An EICR is Satisfactory if it contains no C1 or C2 observations. An EICR with any C1 or C2
          is Unsatisfactory, and landlords must complete remedial work before they are legally
          compliant. Once remedial work is complete, written confirmation must be provided to the
          tenant and to Derby City Council.
        </p>
      </>
    ),
  },
  {
    id: 'legal-requirements',
    heading: 'Legal Requirements for EICR in Derby',
    content: (
      <>
        <p>
          The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
          are the primary legislation governing landlord electrical safety obligations in Derby.
          They came into force on 1 June 2020 for new tenancies and 1 April 2021 for all existing
          tenancies. Every private landlord in Derby must comply.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before a new tenancy:</strong> A valid EICR must be provided to new tenants
                before they take occupation of the property. If no valid EICR exists, one must be
                obtained before the tenancy begins.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Existing tenants:</strong> A copy of the EICR must be provided to existing
                tenants within 28 days of the inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Five-year maximum:</strong> The electrical installation must be inspected at
                intervals of no more than five years, or sooner if the inspector recommends a
                shorter period.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Council requests:</strong> Derby City Council can request a copy of the EICR
                and the landlord must provide it within seven days.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The regulations apply to assured shorthold tenancies, assured tenancies, and regulated
          tenancies. Owner-occupied properties, social housing, and lodger arrangements where the
          landlord resides in the property are outside the scope of the regulations.
        </p>
      </>
    ),
  },
  {
    id: 'derby-enforcement',
    heading: 'Derby City Council Enforcement',
    content: (
      <>
        <p>
          Derby City Council is the local housing authority responsible for enforcing the 2020
          Regulations in Derby. The council's housing enforcement team investigates tenant
          complaints about electrical safety in private rented properties and can take action
          against non-compliant landlords. Derby has a significant private rented sector,
          particularly in inner-city areas such as Normanton, Pear Tree, and Arboretum, as well as
          student areas around the University of Derby.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Civil penalties up to £30,000:</strong> Each breach of the regulations
                attracts a separate civil penalty. Derby City Council can impose these penalties and
                escalate enforcement through the tribunal system if necessary.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial notices:</strong> Where a landlord fails to complete required
                remedial work, the council can serve a remedial notice. If the notice is not
                complied with, the council can arrange for the work to be done and recover costs
                from the landlord.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing:</strong> Derby City Council enforces mandatory HMO licensing
                for larger HMOs. A valid EICR is a mandatory condition of every HMO licence.
                Operating without a licence is a criminal offence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restriction:</strong> A Derby landlord who has not provided the
                current EICR to their tenant cannot serve a valid Section 21 notice for possession.
                This can prevent a landlord recovering their property until they achieve compliance.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Landlords with properties in Normanton, Pear Tree, and Arboretum — areas of Derby with
          high concentrations of privately rented homes — should be aware that these areas attract
          particular attention from the council's housing enforcement team.
        </p>
      </>
    ),
  },
  {
    id: 'eicr-costs-derby',
    heading: 'EICR Costs in Derby (2026 Prices)',
    content: (
      <>
        <p>
          Derby benefits from East Midlands labour rates, which are moderate compared to London but
          reflective of a major regional city. Costs vary based on property size and age, the number
          of circuits, and the electrician's qualifications and scheme membership.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £150 to £190. Typical for purpose-built flats or
                converted properties in Derby city centre.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom property</strong> — £175 to £260. Inter-war and post-war semis
                in areas such as Allestree, Mickleover, or Chaddesden typically fall here. Older
                terraces in Normanton or Pear Tree may be at the higher end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £210 to £300. Larger semi-detached or
                detached properties in Littleover or Mackworth typically fall in this range.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO or large property</strong> — £300 to £500+. Student HMOs near the
                University of Derby with multiple consumer units, fire alarm systems, and extensive
                circuits attract higher prices due to increased inspection scope.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover the inspection and the EICR report only. Remedial work identified
          during the inspection is quoted and charged separately. Obtaining quotes from two or three
          NICEIC or NAPIT registered electricians is recommended to ensure competitive pricing and
          to verify qualifications.
        </p>
      </>
    ),
  },
  {
    id: 'hmo-requirements',
    heading: 'HMO Requirements in Derby',
    content: (
      <>
        <p>
          Derby has a growing HMO market driven in part by the University of Derby, which has
          campuses in the city centre and at Markeaton Street. HMO landlords face additional
          electrical safety obligations beyond the standard 2020 Regulations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory HMO licensing:</strong> Properties with five or more occupants in
                two or more households require a mandatory HMO licence from Derby City Council. A
                valid EICR is a mandatory condition of the licence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm systems:</strong> HMOs in Derby require interlinked fire
                detection systems. The fire alarm installation forms part of the fixed electrical
                installation and is inspected and tested as part of the EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting:</strong> Some larger HMOs in Derby require emergency
                lighting as a licence condition. This also forms part of the EICR inspection scope.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unlicensed HMOs:</strong> Operating an unlicensed HMO in Derby is a criminal
                offence carrying an unlimited fine, a potential banning order, and exposure to Rent
                Repayment Orders from tenants.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Derby landlords with student HMOs should also be aware that the University of Derby
          operates an accreditation scheme for student accommodation. EICR compliance is typically a
          requirement of accreditation.
        </p>
      </>
    ),
  },
  {
    id: 'inspection-frequency',
    heading: 'How Often Is an EICR Required in Derby?',
    content: (
      <>
        <p>
          The frequency of EICR inspections depends on the type of property and occupancy
          circumstances.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard rental properties:</strong> At least every five years under the
                2020 Regulations. A new inspection is required when a new tenancy begins if the
                current EICR has expired.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensed properties:</strong> The interval is set in the licence
                conditions. Check your specific licence for the required frequency.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Owner-occupied homes:</strong> No legal requirement, but the IET recommends
                inspection every ten years. An EICR is strongly recommended before purchasing an
                older Derby property or following any flood or fire event.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspector-recommended shorter interval:</strong> If the EICR report
                recommends re-inspection before the five-year standard, the landlord should follow
                this recommendation to maintain compliance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-findings',
    heading: 'Common EICR Findings in Derby Properties',
    content: (
      <>
        <p>
          Derby's housing stock includes a mix of Victorian terraced properties in inner-city areas,
          inter-war semis in suburbs such as Allestree and Littleover, and post-war local authority
          housing that has since entered the private rented sector. Each property type produces
          characteristic EICR findings.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer units without RCD protection:</strong> Rewirable fuse boards and
                early MCB boards without RCD protection are found throughout Derby's older private
                rented stock. Absence of RCD protection on socket circuits is the most common C2
                finding and requires consumer unit replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Deteriorated wiring:</strong> Pre-1965 rubber-insulated wiring with perished
                insulation is found in Derby's Victorian terraces and older semis. Cracked or
                brittle insulation attracts C2 or C1 observation codes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing main bonding:</strong> Inadequate or absent main protective bonding
                to gas and water pipes is a common finding in Derby's inter-war and post-war
                properties, typically coded C2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overloaded or improperly extended circuits:</strong> In HMOs and converted
                properties, circuits are sometimes extended by unqualified persons beyond their
                designed capacity. Signs of overloading attract C1 or C2 observations and require
                immediate remedial attention.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-electrician',
    heading: 'Finding a Qualified Electrician in Derby',
    content: (
      <>
        <p>
          Derby has a good supply of qualified electricians capable of carrying out EICRs. Always
          verify qualifications and scheme registration before commissioning an inspection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use official registers:</strong> Search the NICEIC, NAPIT, or ELECSA
                registers by postcode to find Derby-based approved contractors. Registration with a
                competent person scheme is the primary quality assurance for EICR work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify inspection qualifications:</strong> The inspector should hold City
                and Guilds 2391 (Inspection and Testing) or an equivalent qualification, plus a
                current 18th Edition BS 7671 certificate (C&G 2382). Not all electricians hold
                inspection and testing qualifications — check before booking.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Obtain multiple quotes:</strong> Two or three quotes allow you to compare
                pricing and the inspector's approach. Be cautious of very low prices — a proper EICR
                on a Derby terrace takes at least two hours and requires calibrated test
                instruments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance:</strong> Confirm that the electrician carries professional
                indemnity insurance. This is required for competent person scheme membership and
                protects both parties if an error is made in the report.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in Derby',
    content: (
      <>
        <p>
          Derby's private rented sector — spanning student accommodation near the University of
          Derby, inner-city terraced housing in Normanton and Pear Tree, and suburban rentals
          throughout the city — generates consistent demand for EICR inspections and associated
          remedial work. Electricians who invest in inspection and testing qualifications can build
          a reliable income stream from Derby's landlord compliance market.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EICRs On Site in Derby</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete the full inspection report on your phone while still on site. AI board
                  scanning, voice test entry, and instant PDF export mean you can hand the landlord
                  a professional, compliant report before leaving the property — no evening admin.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Win the Consumer Unit Upgrade</h4>
                <p className="text-white text-sm leading-relaxed">
                  Consumer unit replacements are one of the most common remedial jobs following
                  EICRs in Derby's older housing. Quote immediately using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  while the landlord is still on-site and focused on the 28-day deadline. The
                  electrician who quotes at the EICR wins the remedial work in the vast majority of
                  cases.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your EICR business in Derby with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate to complete EICRs on site, scan boards with AI, and export instant PDFs. Complete more inspections per day and win the remedial work. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRDerbyPage() {
  return (
    <GuideTemplate
      title="EICR Derby | Electrical Installation Condition Report Derby"
      description="EICR requirements for Derby landlords and homeowners. Legal obligations under the 2020 Regulations, Derby City Council enforcement, costs £150–300, HMO requirements, common findings in Derby's housing stock, and finding qualified electricians in Derby."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          EICR Derby:{' '}
          <span className="text-yellow-400">Electrical Installation Condition Report</span>
        </>
      }
      heroSubtitle="Everything Derby landlords and homeowners need to know about EICR — legal requirements under the 2020 Regulations, Derby City Council enforcement, inspection costs, HMO obligations, common findings in Derby's housing stock, and how to find a qualified electrician."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICR in Derby"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs On Site — Anywhere in the East Midlands"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
