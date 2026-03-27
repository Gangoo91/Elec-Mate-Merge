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
  Clock,
  Search,
  Users,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Landlord Guides', href: '/guides/eicr-for-landlords' },
  { label: 'Landlord Electrical Safety Birmingham', href: '/guides/landlord-electrical-safety-birmingham' },
];

const tocItems = [
  { id: 'regulations-overview', label: 'The 2020 Regulations' },
  { id: 'birmingham-enforcement', label: 'Birmingham Council Enforcement' },
  { id: 'hmo-requirements', label: 'HMO Additional Requirements' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'tenant-rights', label: 'Tenant Rights' },
  { id: 'remedial-timescales', label: 'Remedial Work Timescales' },
  { id: 'finding-inspectors', label: 'Finding Qualified Inspectors' },
  { id: 'eicr-costs', label: 'EICR Costs in Birmingham' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Birmingham to obtain an EICR before a new tenancy begins and at least every five years.',
  'Birmingham City Council is the largest local authority in Europe and has a dedicated private rented sector enforcement team that actively pursues non-compliant landlords with civil penalties of up to £30,000.',
  'Birmingham operates additional HMO licensing in several wards, particularly in areas with high student populations near the University of Birmingham and Aston University.',
  'RCD protection on socket-outlet circuits is required under Regulation 411.3.3 of BS 7671. Many older Birmingham properties, particularly Victorian terraces in inner-city wards, lack RCD protection.',
  'The Distribution Network Operator for Birmingham is Western Power Distribution (now National Grid Electricity Distribution). Inspectors should be familiar with their earthing arrangements.',
];

const faqs = [
  {
    question: 'What are the landlord electrical safety regulations in Birmingham?',
    answer:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require landlords in Birmingham to obtain an EICR before a new tenancy begins and at least every five years. The EICR must be carried out by a qualified person. A copy must be given to tenants within 28 days and to Birmingham City Council within seven days if requested. Non-compliance can result in civil penalties of up to £30,000.',
  },
  {
    question: 'How does Birmingham City Council enforce electrical safety?',
    answer:
      'Birmingham City Council has a dedicated private rented sector enforcement team within its housing standards division. The team investigates tenant complaints, conducts property inspections, and issues civil penalties and remedial notices. Birmingham also operates selective licensing in some areas and additional HMO licensing, both of which require EICR compliance as a licence condition.',
  },
  {
    question: 'How much does an EICR cost in Birmingham?',
    answer:
      'Birmingham EICR costs are close to the national average. A one-bedroom flat typically costs £120 to £200, a two-bedroom terraced house £170 to £280, a three-bedroom semi-detached house £240 to £380, and an HMO £350 to £650 depending on size. City centre apartments may cost slightly more due to access restrictions and parking.',
  },
  {
    question: 'Do I need an EICR for an HMO in Birmingham?',
    answer:
      'Yes. A valid EICR is a mandatory condition of both mandatory and additional HMO licensing in Birmingham. The EICR must cover all fixed electrical installations including fire alarm systems and emergency lighting in communal areas. Some Birmingham HMO licence conditions require EICRs every three years.',
  },
  {
    question: 'What happens if my Birmingham rental fails the EICR?',
    answer:
      'If the EICR is Unsatisfactory (C1 or C2 observations), landlords must complete remedial work within 28 days or sooner if specified. Written confirmation must be provided to the tenant and council. Failure to complete remedial work is a separate breach with its own penalty of up to £30,000.',
  },
  {
    question: 'Can a Birmingham tenant request an electrical safety report?',
    answer:
      'Yes. Tenants have the right to request a copy of the current EICR. If the landlord cannot provide one, the tenant can report this to Birmingham City Council, which can require the landlord to arrange an inspection and complete any remedial work.',
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

const sections = [
  {
    id: 'regulations-overview',
    heading: 'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020',
    content: (
      <>
        <p>
          The 2020 Regulations apply to all private rented properties in Birmingham. Landlords
          must have the electrical installation inspected and tested by a qualified person and
          obtain an EICR before a new tenancy begins and at least every five years. The EICR is
          documented in accordance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (Section 631 covers periodic inspection and testing).
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before new tenancies</strong> — an EICR must be obtained before a new
                tenant moves in. This has applied to all new tenancies since 1 July 2020 and all
                existing tenancies since 1 April 2021.
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
                <strong>Tenant and council copies</strong> — tenants must receive a copy within
                28 days. The council must receive a copy within seven days if requested.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'birmingham-enforcement',
    heading: 'Birmingham City Council Enforcement',
    content: (
      <>
        <p>
          Birmingham City Council is the largest local authority in Europe by population and has
          a substantial private rented sector. The council's housing standards team actively
          enforces the 2020 Regulations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Housing standards team</strong> — Birmingham's dedicated enforcement team
                investigates tenant complaints, conducts proactive inspections in areas of concern,
                and issues civil penalties and remedial notices. The team focuses on areas with
                high concentrations of privately rented properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-enforcement areas</strong> — Selly Oak (student area near the
                University of Birmingham), Sparkbrook, Sparkhill, Small Heath, Lozells, Handsworth,
                and Aston have high concentrations of privately rented properties and see the most
                enforcement activity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Selective and additional licensing</strong> — Birmingham operates selective
                licensing in designated areas and additional HMO licensing. EICR compliance is
                a condition of all licences. Operating without a required licence is a criminal
                offence.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Landlords with properties across the West Midlands should be aware that Birmingham,
          Wolverhampton, Coventry, Sandwell, Dudley, Walsall, and Solihull each have their own
          enforcement teams and policies.
        </p>
      </>
    ),
  },
  {
    id: 'hmo-requirements',
    heading: 'HMO Additional Requirements in Birmingham',
    content: (
      <>
        <p>
          Birmingham has a significant number of HMOs, particularly in the student areas around
          Selly Oak and Edgbaston. HMOs face additional requirements beyond the standard
          regulations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory HMO licensing</strong> — properties with five or more occupants
                in two or more households require a licence. A valid EICR is a condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional licensing</strong> — Birmingham operates additional HMO
                licensing covering smaller HMOs in designated wards. EICR compliance is standard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire safety</strong> — HMO fire alarm systems and emergency lighting form
                part of the fixed electrical installation and must be included in the EICR. RCD
                protection under Regulation 411.3.3 is critical in shared properties.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'penalties',
    heading: 'Penalties for Non-Compliance',
    content: (
      <>
        <p>
          Birmingham City Council can impose civil penalties of up to £30,000 per breach.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Up to £30,000 per breach</strong> — each failure is a separate breach.
                Failing to obtain an EICR, failing to provide it to the tenant, and failing to
                complete remedial work can each attract separate penalties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restrictions</strong> — no valid Section 21 notice can be served
                without providing the EICR to the tenant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rent repayment orders</strong> — tenants in unlicensed HMOs can apply for
                rent repayment orders of up to 12 months' rent.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'tenant-rights',
    heading: 'Tenant Rights',
    content: (
      <>
        <p>
          Tenants in Birmingham have clear rights under the 2020 Regulations.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to a copy of the EICR</strong> — within 28 days of the inspection
                for existing tenants, before moving in for new tenants.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Report non-compliance</strong> — report concerns to Birmingham City
                Council's housing standards team. The council can investigate and take enforcement
                action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Council intervention</strong> — if a landlord fails to act, the council
                can arrange remedial work and recover costs from the landlord.
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
          When C1 or C2 observations are identified (classified under BS 7671 Section 631),
          remedial work must be completed promptly.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>28 days maximum</strong> — or sooner if the inspector specifies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 — immediate action</strong> — danger present observations require
                emergency remedial work, not 28 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common remedial work</strong> — fitting RCD protection (Regulation
                411.3.3), consumer unit replacements, earthing upgrades, and cable replacements
                are the most common items in Birmingham.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-inspectors',
    heading: 'Finding Qualified Inspectors in Birmingham',
    content: (
      <>
        <p>
          Birmingham has a good supply of qualified electricians. Landlords should verify
          registration with a competent person scheme (NICEIC, NAPIT, ELECSA) and check that the
          inspector holds City and Guilds 2391 and a current BS 7671 qualification.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DNO awareness</strong> — the Distribution Network Operator for Birmingham
                is National Grid Electricity Distribution (formerly Western Power Distribution).
                Inspectors should be familiar with their earthing arrangements and the process for
                reporting supply-side defects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local property knowledge</strong> — experience with Birmingham property
                types (Victorian terraces in inner wards, 1930s semis in outer suburbs, modern
                city centre apartments) helps ensure accurate and efficient inspections.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-costs',
    heading: 'EICR Costs in Birmingham (2026 Prices)',
    content: (
      <>
        <p>
          Birmingham EICR costs are close to the national average.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>One-bedroom flat</strong> — £120 to £200.</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Two-bedroom terraced house</strong> — £170 to £280.</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Three-bedroom semi-detached</strong> — £240 to £380.</span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>HMO</strong> — £350 to £650+.</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Landlord EICR Work in Birmingham',
    content: (
      <>
        <p>
          Birmingham's large and growing private rented sector creates consistent demand for EICR
          work. The student rental market around Selly Oak and Edgbaston provides seasonal peaks
          during the summer turnover period.
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
                  to complete reports on site with AI board scanning and instant PDF export.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your landlord EICR business with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

export default function LandlordElectricalSafetyBirminghamPage() {
  return (
    <GuideTemplate
      title="Landlord Electrical Safety Birmingham | EICR Requirements 2026"
      description="Landlord electrical safety requirements in Birmingham. 2020 Regulations, council enforcement, HMO licensing, penalties up to £30,000, tenant rights, and EICR costs for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlord Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Landlord Electrical Safety Birmingham:{' '}
          <span className="text-yellow-400">EICR Requirements 2026</span>
        </>
      }
      heroSubtitle="Everything Birmingham landlords need to know about electrical safety compliance — the 2020 Regulations, council enforcement, HMO licensing, penalties of up to £30,000, and finding qualified inspectors."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Landlord Electrical Safety in Birmingham"
      relatedPages={relatedPages}
      ctaHeading="Complete Landlord EICRs on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
