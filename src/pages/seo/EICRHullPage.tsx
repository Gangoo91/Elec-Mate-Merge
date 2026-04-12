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
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EICR Guides', href: '/guides/eicr-for-landlords' },
  { label: 'EICR Hull', href: '/eicr-hull' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'legal-requirements', label: 'Legal Requirements in Hull' },
  { id: 'hull-enforcement', label: 'Hull City Council Enforcement' },
  { id: 'eicr-costs-hull', label: 'EICR Costs in Hull' },
  { id: 'inspection-frequency', label: 'How Often Is an EICR Required?' },
  { id: 'common-findings', label: 'Common EICR Findings in Hull' },
  { id: 'finding-electrician', label: 'Finding a Qualified Electrician in Hull' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all Hull private landlords to obtain a valid EICR before a new tenancy and at least every five years thereafter.',
  'Hull City Council (Kingston upon Hull City Council) enforces the 2020 Regulations and can impose civil penalties of up to £30,000 per breach on non-compliant landlords.',
  'EICR costs in Hull are typically £150 to £300 for a two-bedroom property — lower than major cities such as London, reflecting the East Yorkshire labour market.',
  'Landlords must complete any remedial work identified by a C1 or C2 observation within 28 days of the EICR. Failure to do so is a separate breach and can attract its own penalty.',
  'Homeowners in Hull are not legally required to obtain an EICR, but it is strongly recommended before purchasing a property or when rewiring work is planned.',
];

const faqs = [
  {
    question: 'Do I need an EICR as a landlord in Hull?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply throughout England, including Hull. Every private landlord must have the electrical installation inspected and tested by a qualified person and obtain an Electrical Installation Condition Report before a new tenancy begins and at least every five years. A copy must be provided to tenants within 28 days of the inspection and to Hull City Council within seven days if requested.',
  },
  {
    question: 'How much does an EICR cost in Hull?',
    answer:
      'In Hull, a typical EICR costs £150 to £200 for a one-bedroom flat, £180 to £260 for a two-bedroom property, £220 to £300 for a three-bedroom house, and £300 to £500 for larger properties or HMOs. These prices are considerably lower than in London or major cities, reflecting East Yorkshire labour rates. Always obtain at least two or three quotes from NICEIC or NAPIT registered electricians.',
  },
  {
    question: 'How often does an EICR need to be done in Hull?',
    answer:
      'For rental properties, an EICR is required at least every five years, or sooner if the inspector recommends it or if a new tenancy begins after the existing report expires. For HMOs in Hull, the frequency may be every three years depending on the HMO licence conditions set by Hull City Council. Homeowners are not legally required to obtain periodic EICRs, but the IET recommends inspection every ten years for owner-occupied properties.',
  },
  {
    question: 'What happens if my Hull rental property fails the EICR?',
    answer:
      'An EICR is classified as Unsatisfactory if it contains C1 (danger present) or C2 (potentially dangerous) observations. Under the 2020 Regulations, landlords must arrange and complete all remedial work within 28 days of the inspection, or sooner if the report specifies. Written confirmation of completed work must be provided to the tenant and to Hull City Council. Failure to complete remedial work within the required timescale is a separate breach of the regulations.',
  },
  {
    question: 'Can Hull City Council fine me for not having an EICR?',
    answer:
      'Yes. Hull City Council, as the local housing authority, has the power to impose civil financial penalties of up to £30,000 per breach of the 2020 Regulations. Each failure — not obtaining an EICR, not providing it to the tenant, not supplying it to the council on request, and not completing remedial work — constitutes a separate breach and can attract its own penalty.',
  },
  {
    question: 'Do I need an EICR to buy or sell a house in Hull?',
    answer:
      'There is no legal requirement for an EICR when buying or selling a residential property in Hull. However, many buyers and their solicitors now request one as part of the conveyancing process, particularly for older properties. Obtaining an EICR before listing a Hull property for sale can speed up the process and identify issues before they become deal-breakers.',
  },
  {
    question: 'What qualifications should an EICR inspector have in Hull?',
    answer:
      'The inspector must be a qualified and competent person. For landlord EICR compliance, this means registration with a competent person scheme such as NICEIC, NAPIT, or ELECSA. The inspector should hold City and Guilds 2391 (Inspection and Testing) or equivalent, plus a current 18th Edition BS 7671 qualification (C&G 2382). You can verify NICEIC or NAPIT registration on their respective websites before booking.',
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
    description:
      'Understand C1, C2, C3 and FI codes — what they mean and what action landlords must take.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-fail-rented-property',
    title: 'EICR Fail — Rented Property',
    description:
      'What to do when a rented property receives an unsatisfactory EICR and how to meet the 28-day deadline.',
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
    heading: 'What Is an EICR?',
    content: (
      <>
        <p>
          An Electrical Installation Condition Report (EICR) is a formal document produced by a
          qualified electrician following a thorough inspection and testing of the fixed electrical
          installation in a property. This covers the consumer unit (fuse box), wiring, sockets,
          light fittings, earthing, bonding, and all associated fixed equipment.
        </p>
        <p>
          The EICR is carried out in accordance with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671 18th Edition
          </SEOInternalLink>{' '}
          (Requirements for Electrical Installations), which is the national standard that sets out
          the rules for safe electrical installation design, erection, and verification. During the
          inspection, the electrician tests all circuits, checks for deterioration, and records any
          deviations from the current standard.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>C1 — Danger present:</strong> Risk of injury. Immediate remedial action
                required. The inspector may recommend isolation of the affected circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>C2 — Potentially dangerous:</strong> Urgent remedial action required.
                Landlords must arrange rectification within 28 days under the 2020 Regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>C3 — Improvement recommended:</strong> Not classified as dangerous but does
                not meet current standards. No mandatory action, but prudent to address.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>FI — Further investigation required:</strong> An issue has been identified
                but cannot be fully assessed without further investigation. Landlords should arrange
                the additional investigation promptly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          An EICR is classified as Satisfactory if it contains no C1 or C2 observations. An
          Unsatisfactory EICR must be followed by remedial work before the landlord is compliant
          with the 2020 Regulations.
        </p>
      </>
    ),
  },
  {
    id: 'legal-requirements',
    heading: 'Legal Requirements for EICR in Hull',
    content: (
      <>
        <p>
          The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020
          apply to all private rented properties in Hull and across England. The regulations require
          landlords to ensure that the electrical installation in their rental property is inspected
          and tested at intervals of no more than five years.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before a new tenancy:</strong> Landlords must obtain a valid EICR and
                provide a copy to the new tenant before they occupy the property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Existing tenants:</strong> A copy of the EICR must be provided to existing
                tenants within 28 days of the inspection being carried out.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Council requests:</strong> If Hull City Council requests a copy of the EICR,
                the landlord must supply it within seven days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Prospective tenants:</strong> Anyone who requests a copy of the EICR before
                taking on a tenancy must receive it within 28 days of their request.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These regulations cover assured shorthold tenancies and assured tenancies. They do not
          apply to social housing, owner-occupied properties, or properties where the landlord also
          lives. Lodger arrangements where the landlord is resident are also excluded.
        </p>
      </>
    ),
  },
  {
    id: 'hull-enforcement',
    heading: 'Hull City Council Enforcement',
    content: (
      <>
        <p>
          Kingston upon Hull City Council is the local housing authority responsible for enforcing
          the 2020 Regulations in Hull. The council's private sector housing team handles complaints
          about rented property conditions, including electrical safety. Hull has a significant
          private rented sector, particularly in the HU1 to HU9 postcode areas near the city centre
          and university, where enforcement activity is concentrated.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Civil penalties:</strong> Hull City Council can impose financial penalties
                of up to £30,000 per breach. Failing to obtain an EICR, failing to provide it to
                tenants, and failing to complete remedial work each constitute separate breaches.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Remedial notices:</strong> Where a landlord fails to comply, the council can
                serve a remedial notice requiring the work to be done. If the landlord ignores the
                notice, the council can arrange for work to be carried out and recover the costs
                from the landlord.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO licensing:</strong> Hull operates HMO licensing for properties with five
                or more occupants. A valid EICR is a mandatory licence condition. Operating an
                unlicensed HMO is a criminal offence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Section 21 restriction:</strong> Landlords cannot serve a valid Section 21
                notice without having provided the tenant with a copy of the current EICR. This is a
                critical practical consequence for Hull landlords seeking possession.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Landlords with student lets around the University of Hull (HU6 area) should be
          particularly aware that student tenants may be advised by the university or their
          accommodation services to check that their landlord holds a valid EICR.
        </p>
      </>
    ),
  },
  {
    id: 'eicr-costs-hull',
    heading: 'EICR Costs in Hull (2026 Prices)',
    content: (
      <>
        <p>
          Hull benefits from lower labour costs compared to larger cities, making EICR inspections
          more affordable than in London or Manchester. However, prices vary depending on the size
          of the property, the age and complexity of the installation, and the electrician's
          experience and registration.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £150 to £200. Typically 3 to 5 circuits with a
                modern consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom property</strong> — £180 to £260. The most common rental type in
                Hull. Victorian terraced houses in areas like Newland or Anlaby Road may be towards
                the higher end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £220 to £300. Older properties in east Hull
                or Hessle Road areas with original wiring may take longer to inspect.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom or HMO</strong> — £300 to £500+. Multiple consumer units, fire
                alarm circuits, and additional circuits increase inspection time.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover the inspection and the EICR report. Any remedial work identified during
          the inspection is quoted and charged separately. It is worth noting that the cost of
          compliance is small compared to the maximum £30,000 penalty for non-compliance.
        </p>
      </>
    ),
  },
  {
    id: 'inspection-frequency',
    heading: 'How Often Is an EICR Required in Hull?',
    content: (
      <>
        <p>
          The inspection frequency depends on the type of property and the use to which it is put.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Private rental properties</strong> — at least every five years under the
                2020 Regulations, or at the start of a new tenancy if the existing report is more
                than five years old.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMOs</strong> — Hull City Council HMO licence conditions typically require
                inspection every five years, but landlords should check their specific licence
                conditions as some older licences stipulate three years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Owner-occupied homes</strong> — no legal requirement, but the IET recommends
                inspection every ten years. Always recommended before purchasing an older property
                or after flood damage (Hull has experienced significant flooding and flood-damaged
                wiring can be hazardous).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>After major works:</strong> If significant electrical work has been carried
                out on the property, a new EICR or an Electrical Installation Certificate (EIC)
                should be obtained to confirm the installation is safe and compliant.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-findings',
    heading: 'Common EICR Findings in Hull Properties',
    content: (
      <>
        <p>
          Hull has a significant stock of older housing, with many properties built in the Victorian
          and Edwardian eras as well as post-war social housing that was subsequently sold under
          Right to Buy schemes. This housing stock presents particular challenges in electrical
          inspections.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Absence of RCD protection:</strong> Older consumer units in Hull properties
                often lack RCD protection on socket circuits, which is required under BS 7671 18th
                Edition. This is a very common C2 finding requiring consumer unit replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Old wiring systems:</strong> Properties with rubber-insulated wiring
                (pre-1960s), aluminium wiring (1960s–1970s), or unsheathed fabric-insulated cables
                are frequently found in older Hull housing stock and typically attract C2 or even C1
                classifications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inadequate earthing and bonding:</strong> Missing or undersized main
                protective bonding conductors to gas and water pipes are a common finding in older
                terraced properties throughout Hull.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Flood damage:</strong> Hull has experienced serious flooding events.
                Properties that have been flooded may have residual moisture damage in consumer
                units, cables, and accessories that is not immediately visible but poses a
                significant risk.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'finding-electrician',
    heading: 'Finding a Qualified Electrician in Hull',
    content: (
      <>
        <p>
          Hull has a healthy market of qualified electricians capable of carrying out EICRs. When
          commissioning an EICR, always verify the electrician's qualifications and scheme
          registration before booking.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use the online registers:</strong> Search the NICEIC, NAPIT, or ELECSA
                registers by postcode to find Hull-based approved contractors. Registration provides
                assurance of qualifications, insurance, and regular assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check qualifications:</strong> The inspector should hold City and Guilds
                2391 (Inspection and Testing) or the equivalent IET qualification, plus a current
                18th Edition BS 7671 certificate (C&G 2382).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Get multiple quotes:</strong> Obtain two or three quotes for any EICR work.
                Be cautious of prices significantly below the range above — a thorough EICR on a
                Hull terrace takes at least two hours and requires calibrated test equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check insurance:</strong> Professional indemnity insurance is a requirement
                of competent person scheme membership and protects both parties if an error is made
                on the report.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: EICR Work in Hull',
    content: (
      <>
        <p>
          Hull's large private rented sector and significant stock of older housing creates
          consistent demand for EICR work. Electricians who build expertise in inspection and
          testing can develop a reliable income stream from landlord EICR contracts, HMO inspection
          work, and associated remedial upgrades.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EICRs On Site in Hull</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate EICR app
                  </SEOInternalLink>{' '}
                  to complete the full report on your phone while still on site. AI board scanning,
                  voice test entry, and instant PDF export mean you can hand the report to the
                  landlord before leaving the property.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Remedial Work Immediately</h4>
                <p className="text-white text-sm leading-relaxed">
                  When you find C1 or C2 observations — common in Hull's older housing stock — quote
                  the remedial work on site using the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Landlords facing the 28-day deadline almost always accept the quote from the
                  electrician who did the EICR.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your EICR business in Hull with Elec-Mate"
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

export default function EICRHullPage() {
  return (
    <GuideTemplate
      title="EICR Certificate Hull | Electrical Installation Condition Report"
      description="EICR requirements for Hull landlords and homeowners. Learn about legal obligations under the 2020 Regulations, Hull City Council enforcement, EICR costs £150–300, 5-year inspection periods, and finding qualified electricians in Hull."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          EICR Certificate Hull:{' '}
          <span className="text-yellow-400">Electrical Inspection Condition Report</span>
        </>
      }
      heroSubtitle="Everything Hull landlords and homeowners need to know about EICR requirements — legal obligations under the 2020 Regulations, Hull City Council enforcement, inspection costs, common findings in Hull's older housing stock, and how to find a qualified electrician."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICR in Hull"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs on Your Phone — Anywhere in Hull"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
