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
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Landlord Guides', href: '/guides/eicr-for-landlords' },
  {
    label: 'Landlord Electrical Safety Sheffield',
    href: '/guides/landlord-electrical-safety-sheffield',
  },
];

const tocItems = [
  { id: 'regulations-overview', label: 'The 2020 Regulations' },
  { id: 'sheffield-enforcement', label: 'Sheffield Council Enforcement' },
  { id: 'hmo-requirements', label: 'HMO Requirements in Sheffield' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'tenant-rights', label: 'Tenant Rights' },
  { id: 'remedial-timescales', label: 'Remedial Work Timescales' },
  { id: 'finding-inspectors', label: 'Finding Qualified Inspectors' },
  { id: 'eicr-costs', label: 'EICR Costs in Sheffield' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Sheffield to obtain an EICR before a new tenancy begins and at least every five years thereafter.',
  'Sheffield City Council enforces these regulations with civil penalties of up to £30,000 per breach. Sheffield has a large student rental sector and operates HMO licensing across the city.',
  'HMOs in Sheffield face additional requirements — a valid EICR is a mandatory condition of both mandatory and additional HMO licensing schemes operated by Sheffield City Council.',
  'If the EICR identifies C1 or C2 observations (classified under BS 7671 Section 631), landlords must complete remedial work within 28 days or sooner if specified by the inspector.',
  'Sheffield has a large stock of Victorian and Edwardian terraced housing in areas such as Broomhall, Nether Edge, and Walkley — many with ageing electrical installations where absence of RCD protection is a common C2 finding.',
];

const faqs = [
  {
    question: 'What are the landlord electrical safety regulations in Sheffield?',
    answer:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply to all private rented properties in Sheffield. Landlords must obtain an EICR before a new tenancy begins and at least every five years. A copy must be given to tenants within 28 days and to Sheffield City Council within seven days if requested. The council can impose civil penalties of up to £30,000 per breach.',
  },
  {
    question: 'How active is Sheffield City Council in enforcing electrical safety?',
    answer:
      'Sheffield City Council has an active private rented sector enforcement team and operates both mandatory and additional HMO licensing. The large student population in areas such as Broomhall, Crookes, and Ecclesall Road drives significant demand for HMO licensing compliance. The council investigates tenant complaints and can take enforcement action including civil penalties and remedial notices.',
  },
  {
    question: 'What happens if my Sheffield rental property fails the EICR?',
    answer:
      'An EICR is Unsatisfactory if it contains C1 (danger present) or C2 (potentially dangerous) observations. Under the 2020 Regulations, landlords must complete all remedial work within 28 days or sooner if the inspector specifies. A qualified electrician must confirm the work in writing. Failure to complete remedial work is a separate breach attracting its own penalty of up to £30,000.',
  },
  {
    question: 'Do I need an EICR for my Sheffield HMO?',
    answer:
      'Yes. A valid EICR is a mandatory condition of HMO licensing in Sheffield. Mandatory licensing applies to properties with five or more occupants in two or more households. Sheffield City Council also operates additional HMO licensing covering smaller HMOs, particularly in areas popular with students. The EICR must cover all fixed electrical installations including communal areas, fire alarm systems, and emergency lighting.',
  },
  {
    question: 'How much does a landlord EICR cost in Sheffield?',
    answer:
      'Sheffield EICR costs are competitive compared to London and the South East. A one-bedroom flat typically costs £110 to £200. A two-bedroom flat costs £160 to £290. A three-bedroom house runs from £230 to £400. HMOs cost £330 to £650 or more. These prices cover inspection and report only — remedial work is quoted separately.',
  },
  {
    question: 'Can a Sheffield tenant request an electrical safety check?',
    answer:
      "Yes. Tenants have the right to request a copy of the current EICR. If the landlord cannot provide one, the tenant can report to Sheffield City Council's environmental health or private rented sector team. The council can require the landlord to arrange an inspection and can arrange the work itself if the landlord fails to comply with a remedial notice, recovering costs from the landlord.",
  },
  {
    question: 'What qualifications must an EICR inspector have in Sheffield?',
    answer:
      'The inspector must be qualified and competent — in practice, registered with NICEIC, NAPIT, or ELECSA, and holding City and Guilds 2391 (Inspection and Testing) and a current BS 7671 qualification (C&G 2382 18th Edition). Professional indemnity insurance is also required.',
  },
  {
    question: 'What is Regulation 411.3.3 and why does it matter for Sheffield landlords?',
    answer:
      'Regulation 411.3.3 of BS 7671 requires RCD protection with a rated residual operating current not exceeding 30 mA for socket-outlet circuits rated up to 32 A. Many older Sheffield rental properties — particularly in terraced housing across Broomhall, Walkley, and Hillsborough — lack adequate RCD protection. Absence of RCD protection is recorded as a C2 observation, rendering the EICR Unsatisfactory and requiring the landlord to carry out remedial work, typically by upgrading the consumer unit.',
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
    id: 'regulations-overview',
    heading:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020',
    content: (
      <>
        <p>
          The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
          are the primary legislation governing landlord electrical safety in Sheffield. These
          regulations came into force on 1 June 2020 for new tenancies and 1 April 2021 for all
          existing tenancies. Every private landlord in Sheffield must comply.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory EICR</strong> — landlords must obtain an Electrical Installation
                Condition Report before a new tenancy begins and at least every five years. The EICR
                is documented in accordance with{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>{' '}
                (Section 631 covers periodic inspection and testing).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant notification</strong> — a copy of the EICR must be provided to
                existing tenants within 28 days of the inspection. New tenants must receive a copy
                before they move in. Prospective tenants can request a copy within 28 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local authority supply</strong> — the landlord must supply a copy of the
                EICR to Sheffield City Council within seven days if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualified person</strong> — the EICR must be carried out by a qualified and
                competent person, in practice meaning registration with NICEIC, NAPIT, ELECSA, or
                equivalent.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'sheffield-enforcement',
    heading: 'Sheffield City Council Enforcement',
    content: (
      <>
        <p>
          Sheffield City Council is the local housing authority responsible for enforcing the 2020
          Regulations in Sheffield. The council has a large private rented sector to oversee —
          driven in part by the student population of the University of Sheffield and Sheffield
          Hallam University.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Private rented sector team</strong> — Sheffield City Council's environmental
                health and private rented sector team investigates complaints about property
                conditions including electrical safety. The team can request the EICR from a
                landlord and take enforcement action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing enforcement</strong> — Sheffield actively enforces HMO
                licensing requirements. EICR compliance is a mandatory licence condition. The
                council investigates unlicensed HMOs and non-compliant licence holders.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Civil penalties</strong> — Sheffield City Council can impose civil penalties
                of up to £30,000 per breach under the 2020 Regulations. Each separate failure — not
                obtaining an EICR, not providing it to the tenant, not completing remedial work —
                constitutes a separate breach.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial action power</strong> — if a landlord fails to comply with a
                remedial notice, the council can arrange for the work to be carried out and recover
                costs from the landlord.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'hmo-requirements',
    heading: 'HMO Requirements in Sheffield',
    content: (
      <>
        <p>
          Sheffield has a significant HMO sector, particularly in the student-dominated
          neighbourhoods of Broomhall, Crookes, Nether Edge, and the Ecclesall Road corridor.
          Sheffield City Council operates mandatory and additional HMO licensing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory HMO licensing</strong> — applies to properties with five or more
                occupants forming two or more households. A valid EICR is a mandatory licence
                condition. The EICR must cover all fixed electrical installations including communal
                areas, fire alarm systems, and emergency lighting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional licensing</strong> — Sheffield City Council operates additional
                HMO licensing covering smaller HMOs in specified areas. Check the council's website
                for the current additional licensing areas. EICR compliance is a condition of
                additional licences.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire safety requirements</strong> — HMO fire alarm systems and emergency
                lighting are part of the fixed electrical installation inspected during an EICR. The
                grade and category of fire alarm required depends on the size and layout of the HMO.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unlicensed HMO consequences</strong> — operating an unlicensed HMO in
                Sheffield is a criminal offence and can result in prosecution, an unlimited fine,
                and civil penalties under the 2020 Regulations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'penalties',
    heading: 'Penalties for Non-Compliance in Sheffield',
    content: (
      <>
        <p>
          Sheffield City Council can impose civil penalties of up to £30,000 per breach under the
          2020 Regulations.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Up to £30,000 per breach</strong> — failing to obtain an EICR, failing to
                provide it to the tenant, failing to supply it to the council, and failing to
                complete remedial work are each separate breaches.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restrictions</strong> — landlords cannot serve a valid Section 21
                notice without providing the tenant with a copy of the current EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licence implications</strong> — failure to comply with EICR requirements
                can result in licence refusal or revocation, making it unlawful to continue
                operating the HMO.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rent repayment orders</strong> — where a landlord commits certain housing
                offences (such as operating an unlicensed HMO), tenants can apply to the First-tier
                Tribunal (Property Chamber) for a rent repayment order of up to 12 months' rent.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'tenant-rights',
    heading: 'Tenant Rights Under the Regulations',
    content: (
      <>
        <p>Sheffield tenants have specific rights under the 2020 Regulations.</p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to a copy of the EICR</strong> — existing tenants must receive a copy
                within 28 days. New tenants must receive a copy before moving in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to report non-compliance</strong> — tenants can report to Sheffield
                City Council's environmental health team if the landlord has not obtained an EICR or
                completed required remedial work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to safe electrics</strong> — if the EICR identifies C1 or C2
                observations, the landlord must arrange remedial work promptly. The council can
                arrange the work and recover costs from the landlord if needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protection from retaliatory eviction</strong> — landlords cannot serve a
                valid Section 21 notice without providing the EICR. The Deregulation Act 2015 also
                protects tenants who raise legitimate complaints about property conditions.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'remedial-timescales',
    heading: 'Remedial Work Timescales',
    content: (
      <>
        <p>
          When an EICR identifies C1 or C2 observations, Sheffield landlords must complete remedial
          work within the timescales set by the 2020 Regulations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>28 days maximum</strong> — all remedial work must be completed within 28
                days of the EICR, unless the inspector specifies a shorter timescale. The clock
                starts from the date of the inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 observations — immediate action</strong> — C1 (danger present)
                observations require immediate action. Do not wait the full 28 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written confirmation required</strong> — once remedial work is complete, a
                qualified person must confirm the work in writing. This must be provided to the
                tenant and to the council within 28 days of the work being completed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common Sheffield remedial work</strong> — fitting RCD protection (Regulation
                411.3.3), replacing plastic consumer units with metal enclosures (Regulation
                421.1.201), upgrading earthing and bonding, and replacing deteriorated wiring in
                Victorian and Edwardian terraces.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-inspectors',
    heading: 'Finding Qualified Inspectors in Sheffield',
    content: (
      <>
        <p>
          Sheffield has a good supply of qualified electricians for landlord EICR work. Verify
          registration and qualifications before commissioning an inspection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC, NAPIT, or ELECSA registration</strong> — search the scheme's online
                register for Sheffield-based inspectors. Scheme membership provides assurance of
                qualifications, insurance, and regular assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required qualifications</strong> — City and Guilds 2391 (Inspection and
                Testing), a current BS 7671 qualification (C&G 2382 18th Edition), and experience
                with Sheffield's Victorian and Edwardian housing stock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional indemnity insurance</strong> — verify that the inspector
                carries appropriate professional indemnity insurance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Avoid unusually cheap quotes</strong> — a thorough EICR for a Sheffield
                two-bedroom terraced house requires 2 to 4 hours and calibrated equipment. Prices
                substantially below £110 for a one-bedroom flat may indicate inadequate testing.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-costs',
    heading: 'EICR Costs in Sheffield (2026 Prices)',
    content: (
      <>
        <p>
          Sheffield EICR costs are competitive, reflecting Yorkshire labour rates that are generally
          lower than London and the South East.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £110 to £200. Typically 3 to 5 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat or small terraced house</strong> — £160 to £290. Usually 5
                to 8 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £230 to £400. Victorian terraces in Broomhall
                and Walkley may take longer due to complex layouts and aged wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO</strong> — £330 to £650+. Multiple consumer units, fire alarm systems,
                and emergency lighting increase the inspection scope.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover inspection and report only. Some Sheffield electricians offer combined
          EICR and remedial packages for landlords managing multiple properties.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Landlord EICR Work in Sheffield',
    content: (
      <>
        <p>
          Sheffield's large student rental sector and active HMO licensing regime create consistent
          demand for landlord EICRs. Electricians who build relationships with student letting
          agents and property management companies in Sheffield can develop a reliable recurring
          income stream from landlord compliance work.
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
                  to complete the report on your phone while still on site. AI board scanning, voice
                  test entry, and instant PDF export mean no evening paperwork.
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
                  When C1 or C2 observations are found, quote the remedial work immediately using
                  the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Sheffield landlords must act within 28 days — quote on the day to win the work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your landlord EICR business in Sheffield with Elec-Mate"
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

export default function LandlordElectricalSafetySheffieldPage() {
  return (
    <GuideTemplate
      title="Landlord Electrical Safety Sheffield | EICR Requirements 2026"
      description="Landlord electrical safety requirements in Sheffield. 2020 Regulations explained, Sheffield City Council enforcement, HMO requirements, penalties up to £30,000, tenant rights, remedial timescales, and EICR costs for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlord Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Landlord Electrical Safety Sheffield:{' '}
          <span className="text-yellow-400">EICR Requirements 2026</span>
        </>
      }
      heroSubtitle="Everything Sheffield landlords need to know about electrical safety compliance — the 2020 Regulations, council enforcement, HMO requirements, penalties of up to £30,000, tenant rights, and remedial work timescales."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Landlord Electrical Safety in Sheffield"
      relatedPages={relatedPages}
      ctaHeading="Complete Landlord EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
