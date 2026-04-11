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
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'EICR Guides', href: '/guides/eicr-explained' },
  { label: 'EICR Swansea', href: '/eicr-swansea' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'wales-regulations', label: 'EICR Regulations in Wales' },
  { id: 'welsh-government-enforcement', label: 'Welsh Government Enforcement' },
  { id: 'landlord-duties', label: 'Landlord Duties in Swansea' },
  { id: 'common-findings', label: 'Common Findings in Swansea' },
  { id: 'costs', label: 'EICR Costs in Swansea' },
  { id: 'finding-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Electrical installation safety regulations in Wales are enforced under the Renting Homes (Wales) Act 2016, which requires landlords to ensure electrical installations are safe and to obtain an Electrical Installation Condition Report (EICR) at least every five years.',
  'The Welsh Government and Swansea Council enforce landlord electrical safety obligations. The Renting Homes (Wales) Act 2016 imposes fit-for-human-habitation duties on occupation contracts, with electrical safety as a core component.',
  'BS 7671 — the technical standard for electrical installations — is identical across England and Wales. The same inspection and testing requirements, observation codes, and remedial timescales apply to Swansea properties as to English ones.',
  'C1 (danger present) and C2 (potentially dangerous) observations under BS 7671 Section 631 require urgent remedial action and result in an Unsatisfactory EICR.',
  'Swansea has a significant private rented sector driven by Swansea University student demand, with a mix of Victorian terraces in Uplands and Brynmill and more modern properties in Sketty and Sketty Park.',
];

const faqs = [
  {
    question: 'Are EICRs legally required in Swansea?',
    answer:
      'Yes. Landlords in Swansea are required under the Renting Homes (Wales) Act 2016 to ensure that electrical installations in their properties are in a safe condition. The Act imposes a duty to carry out an EICR before the start of an occupation contract and at five-yearly intervals thereafter. Swansea Council and the Welsh Government enforce these requirements. The technical standard for the inspection is BS 7671, which is the same in Wales as in England.',
  },
  {
    question: 'How does Wales differ from England on EICR requirements?',
    answer:
      'The technical requirements for the EICR inspection and the observation code system (C1, C2, C3, FI under BS 7671) are identical in Wales and England. The key difference is the legislative framework. In Wales, landlord electrical safety obligations derive from the Renting Homes (Wales) Act 2016 rather than the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. Welsh landlords must also be registered with Rent Smart Wales, and registration conditions include compliance with electrical safety obligations.',
  },
  {
    question: 'How much does an EICR cost in Swansea?',
    answer:
      'Swansea EICR prices are typically £100 to £160 for a one-bedroom flat, £130 to £200 for a two-bedroom property, £180 to £300 for a three-bedroom house, and £280 to £480 for larger or HMO properties. Prices in Swansea are broadly in line with South Wales generally and significantly lower than London and the South East. Student houses near Swansea University in Uplands and Brynmill are among the most frequently inspected property types.',
  },
  {
    question: 'What are the most common EICR failures in Swansea?',
    answer:
      'The most frequent C2 findings in Swansea properties are: absent RCD protection on socket-outlet circuits (Regulation 411.3.3 of BS 7671), missing or inadequate main protective bonding to gas and water services (Regulation 544.1), degraded wiring insulation in Victorian and Edwardian properties in Uplands and St Thomas, and non-compliant consumer unit enclosures. Student HMO properties near the university are often found to have overloaded circuits and inadequate fire alarm installations.',
  },
  {
    question: 'What is Rent Smart Wales and how does it relate to EICRs?',
    answer:
      "Rent Smart Wales is the Welsh Government's landlord registration and licensing scheme. All landlords renting property in Wales must register with Rent Smart Wales, and those who manage their own properties must also hold a licence. Compliance with electrical safety obligations — including maintaining a valid EICR — is a condition of registration and licensing. Rent Smart Wales can investigate complaints from tenants and refer cases to Swansea Council's enforcement teams where landlords fail to comply.",
  },
  {
    question: 'Do Swansea student HMOs need an EICR?',
    answer:
      'Yes. HMOs in Swansea require a valid EICR as a condition of both mandatory HMO licensing and Rent Smart Wales licence conditions. Swansea has a large student HMO sector, particularly in the Uplands, Brynmill, and Sketty areas adjacent to Swansea University and Swansea University Bay Campus. HMO EICRs must cover all fixed electrical installations including fire alarm systems and emergency lighting. Some licence conditions specify a three-year inspection interval rather than five years.',
  },
  {
    question: 'Who can carry out an EICR in Swansea?',
    answer:
      "The inspector must be a qualified and competent person — in practice, someone registered with NICEIC, NAPIT, ELECSA, or an equivalent competent person scheme, and holding City and Guilds 2391 (Inspection and Testing) or equivalent plus a current BS 7671 18th Edition qualification (C&G 2382). These requirements are the same in Wales as in England. Always verify registration on the scheme's public register before commissioning.",
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
    title: 'EICR Observation Codes Explained',
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
    id: 'what-is-eicr',
    heading: 'What Is an Electrical Installation Condition Report?',
    content: (
      <>
        <p>
          An Electrical Installation Condition Report (EICR) is a formal document produced by a
          qualified electrician following a thorough inspection and test of a property's fixed
          electrical installation. The inspection assesses wiring, consumer units, earthing,
          bonding, sockets, switches, light fittings, and all fixed electrical equipment against the
          requirements of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (the 18th Edition IET Wiring Regulations). BS 7671 is the national standard adopted across
          the United Kingdom, including Wales.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Satisfactory</strong> — the electrical installation is in an acceptable
                condition for continued safe use. No urgent remedial action is required. A
                recommended re-inspection date is recorded on the report (typically five years for
                rented residential properties).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unsatisfactory</strong> — C1 (danger present) or C2 (potentially dangerous)
                observations have been found. Landlords must arrange all remedial work urgently.
                Occupation contracts in Wales impose a duty to keep the installation in a safe
                condition, so an Unsatisfactory EICR demands immediate action.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The EICR supersedes the older Periodic Inspection Report (PIR) format and is carried out
          in accordance with BS 7671 Section 631. It is the document required by both Welsh landlord
          legislation and by HMO licensing conditions in Swansea.
        </p>
      </>
    ),
  },
  {
    id: 'wales-regulations',
    heading: 'EICR Regulations in Wales — The Renting Homes (Wales) Act 2016',
    content: (
      <>
        <p>
          Wales has its own legislative framework governing landlord electrical safety, which
          differs from the English regulations whilst achieving the same fundamental outcome. The
          primary piece of legislation is the Renting Homes (Wales) Act 2016, which came fully into
          force on 1 December 2022 and replaced most of the previous tenancy law in Wales.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Occupation contracts</strong> — the Act replaces assured shorthold tenancy
                agreements with occupation contracts. All occupation contracts in Wales include a
                mandatory term that the property must be fit for human habitation throughout the
                contract period.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical safety obligation</strong> — Welsh landlords must ensure
                electrical installations are in a safe condition and obtain an EICR before the start
                of the occupation contract and at intervals of no more than five years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provision to occupiers</strong> — a copy of the EICR must be provided to the
                contract holder before they occupy the property and at any time on request.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Technical standard</strong> — the inspection must be carried out to BS 7671,
                which is identical in Wales and England. The same observation codes, testing
                methods, and documentation requirements apply.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'welsh-government-enforcement',
    heading: 'Welsh Government Enforcement in Swansea',
    content: (
      <>
        <p>
          Enforcement of landlord electrical safety in Swansea operates through two complementary
          channels: Swansea Council (the local housing authority) and Rent Smart Wales (the Welsh
          Government's national landlord registration scheme). Both have enforcement powers that can
          significantly affect a landlord's ability to operate.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Swansea Council</strong> — can investigate complaints from tenants and
                occupiers about the condition of rented properties, including electrical safety. The
                council has powers to require works and to take direct action where a landlord fails
                to comply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rent Smart Wales</strong> — the Welsh Government's landlord registration and
                licensing body. All landlords must register; those who self-manage must hold a
                licence. Failure to comply with electrical safety obligations can result in licence
                refusal or revocation, preventing the landlord from legally renting property in
                Wales.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contract holder remedies</strong> — under the Renting Homes (Wales) Act
                2016, contract holders (tenants) can seek remedies through the courts where the
                property is not in a fit condition, including where electrical safety obligations
                have not been met.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No Section 21 equivalent in Wales</strong> — the Renting Homes (Wales) Act
                2016 reformed possession law in Wales. Landlords who are not compliant with their
                obligations — including electrical safety — may be unable to seek possession through
                a no-fault notice-only route.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'landlord-duties',
    heading: 'Landlord Duties in Swansea Under Welsh Law',
    content: (
      <>
        <p>
          Swansea landlords operating under the Renting Homes (Wales) Act 2016 have clear electrical
          safety obligations. These are broadly similar to English requirements but operate under
          Welsh-specific legislation and enforcement mechanisms.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Register with Rent Smart Wales</strong> — all Swansea landlords must be
                registered. Self-managing landlords must also hold a Rent Smart Wales licence.
                Electrical safety compliance is a condition of registration and licensing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Obtain an EICR before the occupation contract begins</strong> and renew it
                at intervals of no more than five years. Retain copies of all previous EICRs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide a copy to the contract holder</strong> before they occupy the
                property and at any time on request. The EICR must be provided in Welsh or English
                according to the occupier's preference where practicable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complete remedial work promptly</strong> where the EICR is Unsatisfactory.
                Landlords should aim to complete all C1 and C2 remedial work within 28 days (or
                immediately for C1 danger-present items), consistent with the approach taken in
                England.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-findings',
    heading: 'Common EICR Findings in Swansea Properties',
    content: (
      <>
        <p>
          Swansea's housing stock ranges from Victorian terraces in Uplands, St Thomas, and
          Sandfields to post-war social housing in Blaenymaes and Portmead, and newer developments
          in Sketty and Gowerton. The private rented sector is heavily influenced by Swansea
          University, creating a high density of student lets. The following are the most frequent
          findings in local EICRs.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Absent RCD protection</strong> — Regulation 411.3.3 of BS 7671 requires 30mA
                RCD protection on all socket-outlet circuits rated up to 32A. Student let properties
                in Uplands and Brynmill frequently have consumer units without RCD-protected ways,
                resulting in C2 observations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing or inadequate protective bonding</strong> — Regulation 544.1
                requires main protective bonding conductors to connect gas and water services to the
                main earthing terminal. This is frequently absent or undersized in older Swansea
                terraces, resulting in C2 observations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Deteriorated wiring insulation</strong> — Victorian and Edwardian properties
                in Uplands and the Sandfields frequently contain aged rubber-sheathed or
                fabric-covered wiring. Insulation resistance testing (per BS 7671 Section 612)
                reveals insulation breakdown, recorded as C1 or C2 depending on the severity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overloaded circuits in student HMOs</strong> — the high number of occupants
                in student HMOs creates significant electrical load. Overloaded circuits, undersized
                protective conductors, and inadequate fire alarm coverage are common findings in the
                Swansea student rental market.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'EICR Costs in Swansea (2026 Prices)',
    content: (
      <>
        <p>
          Swansea EICR prices reflect South Wales labour rates, which are broadly lower than those
          in England's South East but comparable to other Welsh cities and the Midlands. The large
          student HMO market creates price competition among local electricians for inspection work.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £100 to £160. Typically 3 to 5 circuits.
                Inspection usually completed in two to three hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom property</strong> — £130 to £200. Common student let size.
                Victorian terraces in Uplands and Brynmill may take longer than modern properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £180 to £300. The most common student HMO
                size in Swansea. Properties with original pre-1960s wiring require more thorough
                testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO / large property</strong> — £280 to £480 or more. Multiple consumer
                units, fire alarm systems, emergency lighting, and increased number of circuits all
                extend inspection scope and cost.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices are for the inspection and report only. Any remedial work identified during
          the EICR is quoted and charged separately. Some Swansea electricians offer a package rate
          for landlords with multiple properties, particularly those with portfolios of student lets
          that require annual or biennial reinspection.
        </p>
      </>
    ),
  },
  {
    id: 'finding-electrician',
    heading: 'Finding a Qualified Electrician in Swansea',
    content: (
      <>
        <p>
          The same competence requirements that apply in England apply in Wales. The EICR must be
          carried out by a qualified and competent person — an unqualified inspector's report has no
          legal standing under Welsh landlord legislation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Search official scheme registers</strong> — use the NICEIC, NAPIT, or ELECSA
                online registers to find registered electricians operating in Swansea and the
                surrounding area. Registration confirms qualifications, insurance, and ongoing
                quality assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required qualifications</strong> — City and Guilds 2391 (Inspection and
                Testing) or equivalent Level 3 Award, plus a current BS 7671 18th Edition
                qualification (C&G 2382). Experience with older South Wales terraced property types
                is valuable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMO inspection experience</strong> — given Swansea's large student HMO
                market, look for electricians with experience of HMO-specific inspection
                requirements including fire alarm systems, emergency lighting, and complex
                multi-circuit consumer unit arrangements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional indemnity insurance</strong> — always confirm the electrician
                carries professional indemnity insurance. This is a condition of competent person
                scheme membership and protects both parties in the event of an error on the report.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Building an EICR Business in Swansea',
    content: (
      <>
        <p>
          Swansea's private rented sector — driven by Swansea University and the University of Wales
          Trinity Saint David, as well as growing professional rental demand — provides consistent,
          recurring work for electricians specialising in inspection and testing. The Welsh
          Government's Rent Smart Wales registration requirements mean that Swansea landlords face
          regulatory pressure to maintain compliance, creating reliable demand for EICR services.
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
                  to complete and sign off the full condition report on your phone while still in
                  the property. AI board scanning, voice-entry test results, and instant PDF export
                  eliminate evening admin — allowing you to complete more inspections each day
                  across Swansea's student letting areas.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Convert Findings to Quotes Immediately
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  When C1 or C2 observations are found, raise a remedial work quote on the day using
                  the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Swansea landlords must act promptly under the Renting Homes (Wales) Act 2016 —
                  quoting on inspection day maximises your chance of winning the remedial work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Win more EICR work across Swansea with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. Complete more inspections per day and convert findings to remedial quotes on the spot. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EICRSwanseaPage() {
  return (
    <GuideTemplate
      title="EICR Swansea | Electrical Installation Condition Report Swansea"
      description="EICR Swansea — Welsh landlord regulations under the Renting Homes (Wales) Act 2016, Rent Smart Wales requirements, inspection costs, common findings in student lets and older terraces, and how to find a qualified electrician in Swansea. 2026 guide."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          EICR Swansea:{' '}
          <span className="text-yellow-400">Electrical Inspection & Welsh Landlord Compliance</span>
        </>
      }
      heroSubtitle="Everything landlords and electricians need to know about Electrical Installation Condition Reports in Swansea — Welsh Government requirements under the Renting Homes (Wales) Act 2016, Rent Smart Wales obligations, inspection costs, common findings in student lets and period properties, and how to find a qualified inspector."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Swansea"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs On Your Phone — Any Location in Swansea"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
