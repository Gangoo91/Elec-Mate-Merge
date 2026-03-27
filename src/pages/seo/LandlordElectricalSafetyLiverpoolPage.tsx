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
  { label: 'Landlord Electrical Safety Liverpool', href: '/guides/landlord-electrical-safety-liverpool' },
];

const tocItems = [
  { id: 'regulations-overview', label: 'The 2020 Regulations' },
  { id: 'liverpool-enforcement', label: 'Liverpool Council Enforcement' },
  { id: 'hmo-requirements', label: 'HMO Requirements in Liverpool' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'tenant-rights', label: 'Tenant Rights' },
  { id: 'remedial-timescales', label: 'Remedial Work Timescales' },
  { id: 'finding-inspectors', label: 'Finding Qualified Inspectors' },
  { id: 'eicr-costs', label: 'EICR Costs in Liverpool' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Liverpool to obtain an EICR before a new tenancy begins and at least every five years thereafter.',
  'Liverpool City Council enforces these regulations with civil penalties of up to £30,000 per breach. Liverpool has a substantial private rented sector and a proactive enforcement approach, particularly through selective and HMO licensing schemes.',
  'HMOs in Liverpool face additional requirements — a valid EICR is a mandatory condition of both mandatory and additional HMO licensing operated by Liverpool City Council.',
  'If the EICR identifies C1 or C2 observations (classified under BS 7671 Section 631), landlords must complete remedial work within 28 days or sooner if specified by the inspector.',
  'Liverpool has a large stock of pre-war terraced housing in areas such as Toxteth, Kensington, and Wavertree — many with ageing electrical installations that frequently generate C2 observations including absence of RCD protection.',
];

const faqs = [
  {
    question: 'What are the landlord electrical safety regulations in Liverpool?',
    answer:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply to all private rented properties in Liverpool. Landlords must obtain an EICR before a new tenancy begins and at least every five years. A copy must be given to tenants within 28 days and to Liverpool City Council within seven days if requested. The council can impose civil penalties of up to £30,000 per breach for non-compliance.',
  },
  {
    question: 'How active is Liverpool City Council in enforcing electrical safety?',
    answer:
      'Liverpool City Council has a large private rented sector enforcement team and has been proactive in using selective licensing to drive compliance. Liverpool operates selective licensing schemes across significant parts of the city. EICR compliance is a condition of selective licences and HMO licences. The council investigates complaints from tenants and can take enforcement action including issuing civil penalties and remedial notices.',
  },
  {
    question: 'What happens if my Liverpool rental property fails the EICR?',
    answer:
      'An EICR is Unsatisfactory if it contains C1 (danger present) or C2 (potentially dangerous) observations. Under the 2020 Regulations, landlords must complete all remedial work within 28 days or sooner if the inspector specifies. The electrician must confirm the work in writing. Failure to complete remedial work is a separate breach attracting its own penalty of up to £30,000.',
  },
  {
    question: 'Do I need an EICR for my Liverpool HMO?',
    answer:
      'Yes. A valid EICR is a mandatory condition of HMO licensing in Liverpool. Mandatory licensing applies to properties with five or more occupants in two or more households. Liverpool City Council also operates additional HMO licensing. The EICR must cover all fixed electrical installations including communal areas, fire alarm systems, and emergency lighting.',
  },
  {
    question: 'Does Liverpool City Council operate selective licensing?',
    answer:
      'Yes. Liverpool operates selective licensing schemes across several areas of the city, requiring landlords to hold a property licence. EICR compliance is a standard condition of selective licences. Landlords should check whether their specific postcode falls within a current selective licensing area, as these schemes expand over time. Non-compliance with licence conditions can result in licence revocation.',
  },
  {
    question: 'How much does a landlord EICR cost in Liverpool?',
    answer:
      'Liverpool EICR costs are competitive compared to southern English cities. A one-bedroom flat typically costs £120 to £200. A two-bedroom flat costs £170 to £300. A three-bedroom house runs from £240 to £420. HMOs cost £350 to £700 or more. These prices cover inspection and report only — remedial work is quoted separately.',
  },
  {
    question: 'Can a Liverpool tenant request an electrical safety check?',
    answer:
      'Yes. Tenants have the right to request a copy of the current EICR. If the landlord cannot provide one, the tenant can report to Liverpool City Council\'s environmental health or private rented sector team. The council can require the landlord to arrange an inspection and, if the landlord fails to comply with a remedial notice, can arrange the work and recover costs from the landlord.',
  },
  {
    question: 'What qualifications must an EICR inspector have in Liverpool?',
    answer:
      'The inspector must be qualified and competent — in practice, registered with NICEIC, NAPIT, or ELECSA, and holding City and Guilds 2391 (Inspection and Testing) and a current BS 7671 qualification (C&G 2382 18th Edition). Professional indemnity insurance is required.',
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
    heading: 'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020',
    content: (
      <>
        <p>
          The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
          are the primary legislation governing landlord electrical safety in Liverpool. These
          regulations came into force on 1 June 2020 for new tenancies and 1 April 2021 for all
          existing tenancies. Every private landlord in Liverpool must comply.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory EICR</strong> — landlords must obtain an Electrical Installation
                Condition Report before a new tenancy begins and at least every five years. The
                EICR is documented in accordance with{' '}
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
                EICR to Liverpool City Council within seven days if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualified person</strong> — the EICR must be carried out by a qualified
                and competent person, in practice meaning registration with NICEIC, NAPIT, ELECSA,
                or equivalent.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'liverpool-enforcement',
    heading: 'Liverpool City Council Enforcement',
    content: (
      <>
        <p>
          Liverpool City Council is the local housing authority responsible for enforcing the 2020
          Regulations. Liverpool has one of England's largest private rented sectors proportionally
          and operates an active enforcement regime.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Selective licensing</strong> — Liverpool City Council operates selective
                licensing schemes covering significant parts of the city including areas of
                Toxteth, Kensington, Anfield, and Wavertree. In these areas, landlords must hold
                a property licence and EICR compliance is a standard licence condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Enforcement team</strong> — Liverpool City Council's private rented sector
                team investigates complaints and takes enforcement action including issuing
                improvement notices, remedial notices, and civil penalties. The team works
                proactively in areas with high concentrations of private rented property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial action power</strong> — if a landlord fails to comply with a
                remedial notice, the council can arrange for the work to be carried out and
                recover costs from the landlord. This power is used alongside civil penalties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restrictions</strong> — landlords cannot serve a valid
                Section 21 (no-fault eviction) notice without providing the tenant with a copy
                of the current EICR. Non-compliance can prevent landlords from regaining
                possession of their properties.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'hmo-requirements',
    heading: 'HMO Requirements in Liverpool',
    content: (
      <>
        <p>
          Liverpool has a significant HMO sector driven by students at the University of Liverpool,
          Liverpool John Moores University, and Liverpool Hope University. Liverpool City Council
          operates both mandatory and additional HMO licensing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory HMO licensing</strong> — applies to properties with five or
                more occupants forming two or more households. A valid EICR is a mandatory licence
                condition. The EICR must cover all fixed electrical installations including
                communal areas and fire safety systems.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional licensing</strong> — Liverpool City Council operates additional
                HMO licensing covering smaller HMOs. EICR compliance is a condition of these
                licences. Check the council's website for the current additional licensing area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection frequency</strong> — Liverpool HMO licence conditions may
                require more frequent EICRs than the standard five years. Check your specific
                licence conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unlicensed HMO consequences</strong> — operating an unlicensed HMO in
                Liverpool is a criminal offence and can result in prosecution, an unlimited fine,
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
    heading: 'Penalties for Non-Compliance in Liverpool',
    content: (
      <>
        <p>
          Liverpool City Council can impose civil penalties of up to £30,000 per breach under the
          2020 Regulations.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Up to £30,000 per breach</strong> — failing to obtain an EICR, failing
                to provide it to the tenant, failing to supply it to the council on request, and
                failing to complete remedial work are each separate breaches.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restrictions</strong> — landlords cannot serve a valid
                Section 21 notice without providing the tenant with a copy of the current EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Selective licence implications</strong> — non-compliance with EICR
                requirements can result in licence revocation, making it unlawful to continue
                letting the property in a selective licensing area.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rent repayment orders</strong> — where a landlord commits certain housing
                offences (such as operating an unlicensed HMO), tenants can apply to the
                First-tier Tribunal (Property Chamber) for a rent repayment order of up to
                12 months' rent.
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
        <p>
          Liverpool tenants have specific rights under the 2020 Regulations.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to a copy of the EICR</strong> — existing tenants must receive a
                copy within 28 days. New tenants must receive a copy before moving in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to report non-compliance</strong> — tenants can report to Liverpool
                City Council's environmental health or private rented sector team if the landlord
                has not obtained an EICR or completed required remedial work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to safe electrics</strong> — if the EICR identifies C1 or C2
                observations, the landlord must arrange remedial work promptly. The council can
                arrange the work and recover costs from the landlord if the landlord fails to act.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protection from retaliatory eviction</strong> — landlords cannot serve a
                valid Section 21 notice without the EICR. The Deregulation Act 2015 also protects
                tenants who raise legitimate complaints about property conditions.
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
          When an EICR identifies C1 or C2 observations (classified under BS 7671 Section 631),
          Liverpool landlords must complete remedial work within the timescales set by the 2020
          Regulations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>28 days maximum</strong> — all remedial work must be completed within
                28 days of the EICR, unless the inspector specifies a shorter timescale. The
                28-day clock starts from the date of the inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 observations — immediate action</strong> — C1 (danger present)
                observations require immediate action. The inspector may recommend disconnecting
                the affected circuit. Landlords should not wait the full 28 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written confirmation required</strong> — once remedial work is complete,
                a qualified person must confirm the work in writing. This must be provided to the
                tenant and to the council within 28 days of the work being completed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common Liverpool remedial work</strong> — typical remedial work in
                Liverpool includes fitting RCD protection (Regulation 411.3.3), replacing plastic
                consumer units with metal enclosures, upgrading earthing and bonding, and replacing
                deteriorated cables in pre-war terraced housing.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-inspectors',
    heading: 'Finding Qualified Inspectors in Liverpool',
    content: (
      <>
        <p>
          Liverpool has a large pool of qualified electricians for landlord EICR work. Verify
          qualifications and scheme registration before commissioning an inspection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC, NAPIT, or ELECSA registration</strong> — search the scheme's
                online register for Liverpool-based inspectors. Scheme membership assures
                qualifications, insurance, and regular assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required qualifications</strong> — City and Guilds 2391 (Inspection and
                Testing), a current BS 7671 qualification (C&G 2382 18th Edition), and experience
                with Liverpool's pre-war terraced housing stock.
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
                <strong>Avoid unusually cheap quotes</strong> — a thorough EICR for a Liverpool
                two-bedroom house requires 2 to 4 hours and calibrated test equipment. Prices
                substantially below £120 for a one-bedroom property may indicate inadequate
                testing.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-costs',
    heading: 'EICR Costs in Liverpool (2026 Prices)',
    content: (
      <>
        <p>
          Liverpool EICR costs are competitive compared to southern English cities, reflecting
          the city's lower labour rates.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £120 to £200. Typically 3 to 5 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom flat or small terraced house</strong> — £170 to £300.
                Usually 5 to 8 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £240 to £420. Pre-war terraces may take
                longer due to aged wiring and complex layouts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO</strong> — £350 to £700+. Multiple consumer units, fire alarm systems,
                and emergency lighting increase the inspection scope.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover inspection and report only. Some Liverpool electricians offer combined
          EICR and remedial packages for landlords with multiple properties.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Landlord EICR Work in Liverpool',
    content: (
      <>
        <p>
          Liverpool's large private rented sector — with a high concentration of HMOs near the
          universities and selective licensing across inner-city neighbourhoods — creates consistent
          demand for landlord EICRs. Electricians who establish relationships with Liverpool
          letting agents and property managers can build a strong pipeline of recurring work.
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
                  to complete the report on your phone while still on site. AI board scanning,
                  voice test entry, and instant PDF export mean no evening paperwork.
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
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Liverpool landlords must act within 28 days — quote on the day to win the work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your landlord EICR business in Liverpool with Elec-Mate"
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

export default function LandlordElectricalSafetyLiverpoolPage() {
  return (
    <GuideTemplate
      title="Landlord Electrical Safety Liverpool | EICR Requirements 2026"
      description="Landlord electrical safety requirements in Liverpool. 2020 Regulations explained, Liverpool City Council enforcement and selective licensing, HMO requirements, penalties up to £30,000, tenant rights, and EICR costs for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlord Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Landlord Electrical Safety Liverpool:{' '}
          <span className="text-yellow-400">EICR Requirements 2026</span>
        </>
      }
      heroSubtitle="Everything Liverpool landlords need to know about electrical safety compliance — the 2020 Regulations, council enforcement and selective licensing, HMO requirements, penalties of up to £30,000, tenant rights, and remedial work timescales."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Landlord Electrical Safety in Liverpool"
      relatedPages={relatedPages}
      ctaHeading="Complete Landlord EICRs on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
