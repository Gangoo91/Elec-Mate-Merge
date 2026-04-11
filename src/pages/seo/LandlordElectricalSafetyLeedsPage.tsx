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
  { label: 'Landlord Electrical Safety Leeds', href: '/guides/landlord-electrical-safety-leeds' },
];

const tocItems = [
  { id: 'regulations-overview', label: 'The 2020 Regulations' },
  { id: 'leeds-enforcement', label: 'Leeds Council Enforcement' },
  { id: 'hmo-requirements', label: 'HMO Additional Requirements' },
  { id: 'penalties', label: 'Penalties for Non-Compliance' },
  { id: 'tenant-rights', label: 'Tenant Rights' },
  { id: 'remedial-timescales', label: 'Remedial Work Timescales' },
  { id: 'finding-inspectors', label: 'Finding Qualified Inspectors' },
  { id: 'eicr-costs', label: 'EICR Costs in Leeds' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Leeds to obtain an EICR before a new tenancy begins and at least every five years.',
  'Leeds City Council operates selective licensing in designated areas and has a dedicated private rented sector team that investigates complaints and issues civil penalties of up to £30,000.',
  'Leeds has a large student rental market concentrated around Headingley, Hyde Park, and Woodhouse, with significant numbers of HMOs requiring additional licensing and EICR compliance.',
  'RCD protection on socket-outlet circuits is required under Regulation 411.3.3 of BS 7671. Back-to-back terraces in inner Leeds frequently lack RCD protection, resulting in C2 observations.',
  'The Distribution Network Operator for Leeds is Northern Powergrid. Inspectors should be familiar with their earthing provisions and supply arrangements.',
];

const faqs = [
  {
    question: 'What are the landlord electrical safety regulations in Leeds?',
    answer:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply to all private rented properties in Leeds. Landlords must obtain an EICR before a new tenancy and at least every five years. A copy must be given to tenants within 28 days and to Leeds City Council within seven days if requested. Non-compliance can result in civil penalties of up to £30,000 per breach.',
  },
  {
    question: 'Does Leeds have selective licensing?',
    answer:
      'Yes. Leeds City Council operates selective licensing in designated areas targeting neighbourhoods with high concentrations of privately rented properties and poor housing conditions. A valid EICR is a mandatory condition of the property licence. Landlords should check the council website to determine if their property is in a designated area.',
  },
  {
    question: 'How much does an EICR cost in Leeds?',
    answer:
      'Leeds EICR costs are slightly below the national average. A one-bedroom flat typically costs £110 to £190, a two-bedroom terraced house £160 to £270, a three-bedroom semi £230 to £370, and an HMO £320 to £650. Student HMOs in Headingley with multiple consumer units cost more.',
  },
  {
    question: 'Do I need an EICR for a student HMO in Leeds?',
    answer:
      'Yes. Student HMOs in Leeds require a valid EICR as a condition of HMO licensing. Many student properties in Headingley, Hyde Park, and Woodhouse are older terraced houses with aged wiring. The EICR must cover fire alarm systems and emergency lighting in communal areas. RCD protection under Regulation 411.3.3 is essential.',
  },
  {
    question: 'What happens if my Leeds rental property fails the EICR?',
    answer:
      'If the EICR is Unsatisfactory (C1 or C2 observations), landlords must complete remedial work within 28 days or sooner if specified. Written confirmation must be provided to the tenant and council. Failure to act is a separate breach with its own penalty.',
  },
  {
    question: 'Can a Leeds tenant request an electrical safety check?',
    answer:
      'Yes. Tenants can request a copy of the EICR from their landlord. If the landlord cannot provide one, the tenant can report this to Leeds City Council, which can require the landlord to arrange an inspection and take enforcement action if necessary.',
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

const sections = [
  {
    id: 'regulations-overview',
    heading:
      'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020',
    content: (
      <>
        <p>
          The 2020 Regulations apply to all private rented properties in Leeds. Landlords must
          obtain an EICR documented in accordance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (Section 631) before a new tenancy begins and at least every five years.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory EICR</strong> — required before new tenancies and every five years
                for existing tenancies. Applied to all tenancies from 1 April 2021.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant copies</strong> — existing tenants within 28 days, new tenants before
                moving in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Council copies</strong> — within seven days if requested by Leeds City
                Council.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial work</strong> — C1 or C2 observations must be remedied within 28
                days or sooner if specified.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'leeds-enforcement',
    heading: 'Leeds City Council Enforcement',
    content: (
      <>
        <p>
          Leeds City Council has a dedicated private rented sector team within its housing standards
          service. The council takes a proactive approach to enforcement, particularly in areas with
          high concentrations of privately rented properties.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Selective licensing</strong> — Leeds operates selective licensing in
                designated areas. A valid EICR is a mandatory licence condition. Areas include parts
                of Harehills, Beeston, and Holbeck where the private rented sector is substantial.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student areas</strong> — Headingley, Hyde Park, Woodhouse, and Burley have
                high concentrations of student HMOs. Leeds City Council actively enforces HMO
                licensing and electrical safety compliance in these areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complaint investigation</strong> — the council investigates tenant
                complaints and can require landlords to obtain an EICR and complete remedial work.
                Failure to comply results in civil penalties.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'hmo-requirements',
    heading: 'HMO Additional Requirements in Leeds',
    content: (
      <>
        <p>
          Leeds has a large student population supporting a substantial HMO market. The student
          areas of Headingley, Hyde Park, and Woodhouse contain hundreds of HMOs, many in converted
          Victorian and Edwardian terraced houses.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory HMO licensing</strong> — properties with five or more occupants in
                two or more households. Valid EICR is a licence condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Back-to-back terraces</strong> — Leeds has a unique stock of back-to-back
                terraced houses, many converted into HMOs. These properties often have limited
                access for inspection, older wiring, and inadequate earthing. FI (Further
                Investigation) observations are common where wiring is concealed and inaccessible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire safety</strong> — HMO fire alarm and emergency lighting systems must be
                tested as part of the EICR. RCD protection (Regulation 411.3.3) is particularly
                important in shared properties.
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
        <p>Leeds City Council can impose civil penalties of up to £30,000 per breach.</p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Up to £30,000 per breach</strong> — each failure is separate. Multiple
                penalties can be imposed for the same property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restrictions</strong> — no valid Section 21 notice without
                providing the EICR.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Licensing offences</strong> — operating an unlicensed HMO or property in a
                selective licensing area is a criminal offence with an unlimited fine.
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
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Right to a copy of the EICR</strong> — within 28 days for existing tenants,
                before moving in for new tenants.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Report non-compliance</strong> — contact Leeds City Council's housing
                standards team. The council can investigate and take action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Council can arrange work</strong> — if the landlord fails to comply, the
                council can arrange remedial work and recover costs.
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
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>28 days maximum</strong> — from the date of the EICR, or sooner if the
                inspector specifies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 — immediate</strong> — danger present observations require emergency
                remedial action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Common remedial work in Leeds</strong> — RCD protection (Regulation
                411.3.3), consumer unit replacements, earthing upgrades on older terraces, and
                rewiring of deteriorated cables.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-inspectors',
    heading: 'Finding Qualified Inspectors in Leeds',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person schemes</strong> — search NICEIC, NAPIT, or ELECSA
                registers for Leeds-based inspectors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Qualifications</strong> — City and Guilds 2391 plus current BS 7671 (C&G
                2382 18th Edition).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Northern Powergrid</strong> — the DNO for Leeds. Inspectors should be
                familiar with their earthing provisions and the process for reporting supply-side
                issues.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr-costs',
    heading: 'EICR Costs in Leeds (2026 Prices)',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £110 to £190.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom terraced house</strong> — £160 to £270.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom semi-detached</strong> — £230 to £370.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO</strong> — £320 to £650+.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Landlord EICR Work in Leeds',
    content: (
      <>
        <p>
          Leeds has a strong private rented sector with particular demand during the student
          turnover period in summer. Electricians who build relationships with letting agents in the
          Headingley and Hyde Park areas can secure consistent EICR work.
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
                  for on-site completion with AI board scanning and instant PDF export.
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

export default function LandlordElectricalSafetyLeedsPage() {
  return (
    <GuideTemplate
      title="Landlord Electrical Safety Leeds | EICR Requirements 2026"
      description="Landlord electrical safety requirements in Leeds. 2020 Regulations, council enforcement, selective licensing, HMO requirements, penalties up to £30,000, and EICR costs for 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Landlord Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          Landlord Electrical Safety Leeds:{' '}
          <span className="text-yellow-400">EICR Requirements 2026</span>
        </>
      }
      heroSubtitle="Everything Leeds landlords need to know about electrical safety compliance — the 2020 Regulations, council enforcement, HMO licensing, penalties of up to £30,000, and finding qualified inspectors."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Landlord Electrical Safety in Leeds"
      relatedPages={relatedPages}
      ctaHeading="Complete Landlord EICRs on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
