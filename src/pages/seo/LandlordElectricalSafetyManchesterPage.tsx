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

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Landlord Guides', href: '/guides/eicr-for-landlords' },
  {
    label: 'Landlord Electrical Safety Manchester',
    href: '/guides/landlord-electrical-safety-manchester',
  },
];

const tocItems = [
  { id: 'regulations-overview', label: 'The 2020 Regulations' },
  { id: 'manchester-enforcement', label: 'Manchester Council Enforcement' },
  { id: 'hmo-requirements', label: 'HMO Additional Requirements' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'tenant-rights', label: 'Tenant Rights' },
  { id: 'remedial-timescales', label: 'Remedial Work Timescales' },
  { id: 'finding-inspectors', label: 'Finding Qualified Inspectors' },
  { id: 'eicr-costs', label: 'EICR Costs in Manchester' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Manchester to obtain an EICR before a new tenancy begins and at least every five years.',
  'Manchester City Council operates one of the largest selective licensing schemes in England, covering significant areas of the city. A valid EICR is a mandatory condition of the property licence.',
  'HMOs are heavily concentrated in areas around the universities (Fallowfield, Withington, Rusholme) and face additional licensing requirements including more frequent EICRs.',
  'Civil penalties of up to £30,000 per breach can be imposed by Manchester City Council for non-compliance with the electrical safety regulations.',
  'RCD protection on socket-outlet circuits is required under Regulation 411.3.3 of BS 7671. Older terraced properties in Manchester frequently lack RCD protection, resulting in C2 observations on the EICR.',
];

const faqs = [
  {
    question: 'What are the landlord electrical safety regulations in Manchester?',
    answer:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply to all private rented properties in Manchester. Landlords must obtain an EICR before a new tenancy begins and at least every five years. The EICR must be carried out by a qualified person registered with a competent person scheme. A copy must be given to tenants within 28 days and to Manchester City Council within seven days if requested. Non-compliance can result in civil penalties of up to £30,000.',
  },
  {
    question: 'Does Manchester have selective licensing for rental properties?',
    answer:
      'Yes. Manchester City Council operates a selective licensing scheme covering large areas of the city. Properties in designated areas require a property licence, and a valid EICR is a mandatory condition. Operating without a licence is a criminal offence with an unlimited fine. Landlords should check the council website to determine whether their property falls within a designated area.',
  },
  {
    question: 'How much does an EICR cost in Manchester?',
    answer:
      'Manchester EICR costs are broadly in line with the national average. A one-bedroom flat typically costs £120 to £200, a two-bedroom terraced house £180 to £300, a three-bedroom semi-detached house £250 to £400, and an HMO £350 to £700 depending on size and the number of consumer units. Prices in the city centre may be slightly higher due to parking and access difficulties.',
  },
  {
    question: 'What happens if my Manchester rental property gets an unsatisfactory EICR?',
    answer:
      'If the EICR contains C1 or C2 observations, the overall assessment will be Unsatisfactory. Under the 2020 Regulations, landlords must complete remedial work within 28 days or sooner if the inspector specifies. Written confirmation must be provided to the tenant and to Manchester City Council if requested. Failure to complete remedial work is a separate breach attracting penalties of up to £30,000.',
  },
  {
    question: 'Do I need an EICR for a student HMO in Manchester?',
    answer:
      'Yes. Student HMOs in Manchester require a valid EICR as a condition of both mandatory and additional HMO licensing. Many student HMOs in Fallowfield, Withington, and Rusholme are older terraced properties with aged wiring. The EICR must cover all fixed electrical installations including fire alarm systems and emergency lighting in communal areas. Some HMO licence conditions require EICRs every three years.',
  },
  {
    question: 'Can a Manchester tenant request an electrical safety check?',
    answer:
      'Yes. Tenants can request a copy of the current EICR from their landlord. If the landlord cannot provide one, the tenant can report this to Manchester City Council, which can require the landlord to arrange an inspection. If the landlord fails to comply, the council can arrange the work and recover costs from the landlord.',
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
          apply to all private rented properties in Manchester. These regulations require landlords
          to have the electrical installation inspected and tested by a qualified person and obtain
          an Electrical Installation Condition Report (EICR) before a new tenancy begins and at
          least every five years thereafter.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory EICR</strong> — the EICR is documented in accordance with{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>{' '}
                (Section 631 covers periodic inspection and testing). The inspector assesses the
                condition of the fixed electrical installation and classifies any defects using the
                C1, C2, C3, and FI code system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant notification</strong> — a copy of the EICR must be provided to
                existing tenants within 28 days and to new tenants before they move in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Council supply</strong> — the EICR must be supplied to Manchester City
                Council within seven days if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial work</strong> — if C1 or C2 observations are found, the landlord
                must complete remedial work within 28 days or sooner if the inspector specifies.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'manchester-enforcement',
    heading: 'Manchester City Council Enforcement',
    content: (
      <>
        <p>
          Manchester City Council is one of the more proactive local authorities in England when it
          comes to private rented sector enforcement. The council operates dedicated teams that
          investigate complaints, conduct property inspections, and take action against
          non-compliant landlords.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Selective licensing</strong> — Manchester City Council operates one of the
                largest selective licensing schemes in England. Properties in designated areas
                require a property licence, and EICR compliance is a mandatory condition. The scheme
                targets areas with high concentrations of privately rented properties and poor
                housing conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Active enforcement areas</strong> — Moss Side, Rusholme, Fallowfield,
                Levenshulme, Gorton, and parts of Longsight and Hulme have high concentrations of
                privately rented properties and see the most enforcement activity. The university
                corridor (Fallowfield, Withington) has a particularly high density of student HMOs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Civil penalties</strong> — Manchester City Council has imposed civil
                penalties on landlords who fail to comply with the electrical safety regulations.
                Penalties are determined on a case-by-case basis up to the maximum of £30,000 per
                breach.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Landlords with properties in the Greater Manchester area should note that each of the ten
          metropolitan boroughs (Manchester, Salford, Trafford, Stockport, Tameside, Oldham,
          Rochdale, Bury, Bolton, and Wigan) has its own enforcement team and policies.
        </p>
      </>
    ),
  },
  {
    id: 'hmo-requirements',
    heading: 'HMO Additional Requirements in Manchester',
    content: (
      <>
        <p>
          Manchester has a large student population and a significant number of HMOs, particularly
          around the University of Manchester and Manchester Metropolitan University campuses. HMOs
          face additional requirements beyond the standard 2020 Regulations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory HMO licensing</strong> — properties with five or more occupants
                forming two or more households must be licensed. A valid EICR covering all fixed
                electrical installations, fire alarm systems, and emergency lighting is a licence
                condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional licensing</strong> — Manchester City Council operates additional
                HMO licensing in designated areas, covering smaller HMOs. EICR compliance is a
                standard condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student accommodation</strong> — purpose-built student accommodation (PBSA)
                is typically managed by professional operators with their own compliance programmes.
                However, converted terraced houses used as student HMOs in Fallowfield and
                Withington are the responsibility of the individual landlord and require full EICR
                compliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — Regulation 411.3.3 of BS 7671 requires RCD
                protection on socket-outlet circuits rated up to 32A. In HMOs where multiple
                households share circuits, adequate RCD protection is critical. Many older
                Manchester HMOs require consumer unit upgrades to meet this requirement.
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
          Manchester City Council can impose civil penalties of up to £30,000 per breach of the 2020
          Regulations. Each failure to comply is a separate breach.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Up to £30,000 per breach</strong> — failing to obtain an EICR, failing to
                provide it to the tenant, failing to supply it to the council, and failing to
                complete remedial work are each separate breaches with separate potential penalties.
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
                <strong>Licensing offences</strong> — in selective licensing areas, operating
                without a licence (which requires EICR compliance) is a criminal offence with an
                unlimited fine. Tenants can also apply for rent repayment orders of up to 12 months'
                rent.
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
          Tenants in Manchester have specific rights under the 2020 Regulations regarding electrical
          safety in their rented property.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to a copy of the EICR</strong> — existing tenants must receive a copy
                within 28 days of the inspection. New tenants must receive a copy before moving in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Report non-compliance</strong> — tenants can report concerns to Manchester
                City Council's private rented sector team. The council can investigate and take
                enforcement action including requiring the landlord to obtain an EICR and complete
                remedial work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Council intervention</strong> — if a landlord fails to comply with a
                remedial notice, Manchester City Council can arrange for the work to be carried out
                and recover costs from the landlord.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Retaliatory eviction protection</strong> — landlords cannot serve a valid
                Section 21 notice without providing the EICR. The Deregulation Act 2015 provides
                additional protection against retaliatory eviction.
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
          When an EICR identifies C1 or C2 observations, landlords must act within strict
          timescales.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>28 days maximum</strong> — remedial work must be completed within 28 days of
                the EICR or sooner if the inspector specifies. The clock starts from the date of the
                inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 — immediate</strong> — C1 (danger present) observations may require
                immediate disconnection. Do not wait the full 28 days for C1 findings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written confirmation</strong> — a qualified person must confirm the remedial
                work in writing. This must be provided to the tenant and to the council within 28
                days of completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common Manchester remedial work</strong> — fitting RCD protection
                (Regulation 411.3.3), replacing aged consumer units in Victorian and Edwardian
                terraces, upgrading earthing and bonding, and replacing deteriorated cables are the
                most common remedial items in Manchester.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-inspectors',
    heading: 'Finding Qualified Inspectors in Manchester',
    content: (
      <>
        <p>
          Manchester has a good supply of qualified electricians experienced in periodic inspection
          and testing. Landlords should verify qualifications and registration before commissioning
          an EICR.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — search the NICEIC, NAPIT, or ELECSA
                registers for Manchester-based inspectors. Registration provides assurance of
                qualifications, insurance, and regular assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required qualifications</strong> — City and Guilds 2391 (Inspection and
                Testing) plus a current BS 7671 qualification (C&G 2382 18th Edition). Experience
                with Manchester property types (Victorian terraces, back-to-backs, HMOs) is
                valuable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity North West</strong> — the Distribution Network Operator for
                Manchester is Electricity North West (ENW). Inspectors should be familiar with ENW
                supply arrangements, earthing provisions, and the process for reporting supply-side
                defects.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-costs',
    heading: 'EICR Costs in Manchester (2026 Prices)',
    content: (
      <>
        <p>
          Manchester EICR costs are broadly in line with the national average, though city centre
          properties may attract a premium due to parking and access difficulties.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £120 to £200.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom terraced house</strong> — £180 to £300. Manchester has a large
                stock of Victorian and Edwardian terraces that may take longer to inspect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom semi-detached</strong> — £250 to £400.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO</strong> — £350 to £700+. Multiple consumer units, fire alarm systems,
                and emergency lighting increase cost. Student HMOs in Fallowfield often have complex
                electrical layouts.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Landlord EICR Work in Manchester',
    content: (
      <>
        <p>
          Manchester's large private rented sector and active selective licensing scheme create
          strong demand for EICR work. The student rental market around the universities provides
          consistent annual demand as landlords prepare properties between academic years.
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
                  to complete reports on your phone while still on site. AI board scanning, voice
                  test entry, and instant PDF export eliminate evening paperwork.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your landlord EICR business with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LandlordElectricalSafetyManchesterPage() {
  return (
    <GuideTemplate
      title="Landlord Electrical Safety Manchester | EICR Requirements 2026"
      description="Landlord electrical safety requirements in Manchester. 2020 Regulations, selective licensing, HMO requirements, penalties up to £30,000, tenant rights, and EICR costs for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlord Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Landlord Electrical Safety Manchester:{' '}
          <span className="text-yellow-400">EICR Requirements 2026</span>
        </>
      }
      heroSubtitle="Everything Manchester landlords need to know about electrical safety compliance — the 2020 Regulations, selective licensing, HMO requirements, penalties of up to £30,000, and finding qualified inspectors."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Landlord Electrical Safety in Manchester"
      relatedPages={relatedPages}
      ctaHeading="Complete Landlord EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
