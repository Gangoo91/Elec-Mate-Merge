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
  { label: 'EICR Harrogate', href: '/eicr-harrogate' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'harrogate-regulations', label: 'Harrogate Regulations' },
  { id: 'landlord-duties', label: 'Landlord Duties' },
  { id: 'common-findings', label: 'Common Findings in Harrogate' },
  { id: 'victorian-property', label: 'Victorian & Period Property Challenges' },
  { id: 'costs', label: 'EICR Costs in Harrogate' },
  { id: 'finding-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Harrogate to hold a valid EICR and renew it at least every five years.',
  'North Yorkshire Council (formerly Harrogate Borough Council) is the local housing authority responsible for enforcement and can issue civil penalties of up to £30,000 per breach.',
  'Harrogate has a significant proportion of Victorian and Edwardian period properties — particularly in the Duchy, Starbeck, and town centre areas — where older wiring installations present recurring EICR findings including absent RCD protection and deteriorated insulation.',
  'C1 (danger present) and C2 (potentially dangerous) observations under BS 7671 Section 631 render an EICR Unsatisfactory, requiring all remedial work to be completed within 28 days.',
  'Harrogate EICR prices reflect North Yorkshire labour rates and are broadly in line with the Yorkshire and Humber average — typically £120 to £210 for a two-bedroom property.',
];

const faqs = [
  {
    question: 'Is an EICR legally required in Harrogate?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply to all private rented properties in Harrogate. Landlords must obtain an EICR before each new tenancy and renew it at least every five years. North Yorkshire Council (which now covers the former Harrogate Borough Council area) enforces these regulations and can issue civil penalties of up to £30,000 per breach.',
  },
  {
    question: 'How much does an EICR cost in Harrogate?',
    answer:
      'Harrogate EICR prices are typically £110 to £170 for a one-bedroom flat, £120 to £210 for a two-bedroom property, £190 to £320 for a three-bedroom house, and £300 to £500 for larger or HMO properties. Period properties in the Duchy, Valley Gardens, and Starbeck areas may command the higher end of these ranges due to the complexity of their electrical installations. Harrogate prices are broadly in line with the wider Yorkshire and Humber region.',
  },
  {
    question: 'What are the most common EICR failures in Harrogate?',
    answer:
      'The most common C2 findings in Harrogate properties are: absent RCD protection on socket-outlet circuits (Regulation 411.3.3 of BS 7671), missing or inadequate main protective bonding to gas and water services (Regulation 544.1), deteriorated wiring insulation in Victorian and Edwardian properties across the Duchy and town centre, and consumer units in combustible plastic enclosures not meeting the requirements of BS 7671:2018. Properties without a full rewire since the 1970s are particularly likely to generate Unsatisfactory findings.',
  },
  {
    question: 'How long does an EICR take in Harrogate?',
    answer:
      'A typical domestic EICR in Harrogate takes two to four hours for a standard property. Period properties and larger detached houses in Pannal, Starbeck, and the Duchy area may take four to six hours depending on the size and complexity of the installation. The inspector must carry out insulation resistance tests, continuity tests, and earth fault loop impedance tests on every circuit, as well as testing all RCDs and MCBs in the consumer unit.',
  },
  {
    question: 'Do Harrogate HMOs need an EICR?',
    answer:
      'Yes. A valid EICR is a mandatory condition of HMO licensing in Harrogate. North Yorkshire Council operates mandatory licensing for larger HMOs. The EICR must cover all fixed electrical installations including communal areas, fire alarm systems, and emergency lighting. Harrogate has HMO properties in the town centre and student areas near Harrogate College. Some licence conditions specify an inspection interval shorter than five years.',
  },
  {
    question: 'What happened to Harrogate Borough Council?',
    answer:
      'Harrogate Borough Council was abolished on 1 April 2023 as part of local government reorganisation in North Yorkshire. Its functions, including housing enforcement and landlord regulation, transferred to the new North Yorkshire Council. Landlords in the Harrogate area should direct all EICR compliance queries to North Yorkshire Council, which continues to enforce the 2020 Regulations across the former Harrogate Borough Council area.',
  },
  {
    question: 'Who can carry out an EICR in Harrogate?',
    answer:
      'The inspector must be a qualified and competent person — in practice, someone registered with NICEIC, NAPIT, ELECSA, or an equivalent competent person scheme, and holding City and Guilds 2391 (Inspection and Testing) or equivalent plus a current BS 7671 18th Edition qualification (C&G 2382). Experience with Yorkshire period property types, particularly Victorian and Edwardian terraces and larger detached houses, is especially useful in Harrogate.',
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
          electrical installation. The inspection assesses all wiring, consumer units, earthing and
          bonding, sockets, switches, light fittings, and fixed electrical equipment against the
          requirements of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (the 18th Edition IET Wiring Regulations), the national standard for electrical
          installations throughout the United Kingdom.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Satisfactory</strong> — the installation is in an acceptable condition for
                continued safe use. No urgent remedial action is required. A recommended
                re-inspection date is recorded (typically five years for rented residential
                properties).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unsatisfactory</strong> — the inspection has found C1 (danger present) or C2
                (potentially dangerous) observations. Landlords must arrange all remedial work
                within 28 days. The property cannot continue under a new tenancy without evidence
                that remedial work is underway or complete.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The EICR replaced the older Periodic Inspection Report (PIR) format and is carried out in
          accordance with BS 7671 Section 631. It is the document required by the 2020 private
          rented sector regulations and by HMO licensing conditions administered by North Yorkshire
          Council across the former Harrogate Borough Council area.
        </p>
      </>
    ),
  },
  {
    id: 'harrogate-regulations',
    heading: 'EICR Regulations in Harrogate',
    content: (
      <>
        <p>
          Harrogate is within the North Yorkshire Council area (following the local government
          reorganisation of April 2023) and is subject to the Electrical Safety Standards in the
          Private Rented Sector (England) Regulations 2020. North Yorkshire Council is the local
          housing authority responsible for enforcement across the former Harrogate Borough, which
          covers Harrogate town, Knaresborough, Ripon, Boroughbridge, and surrounding rural areas.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who must comply</strong> — all private landlords letting under assured
                shorthold tenancies, assured tenancies, or regulated tenancies within the Harrogate
                area. Social housing has separate obligations. Live-in landlord arrangements are
                excluded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection frequency</strong> — before each new tenancy begins and at least
                every five years. The inspector may recommend an earlier re-inspection date on the
                EICR itself, particularly for older period property installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Document distribution</strong> — copies must be provided to existing tenants
                within 28 days, to new tenants before they occupy the property, and to North
                Yorkshire Council within seven days if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Civil penalties</strong> — North Yorkshire Council can impose fines of up to
                £30,000 per breach. Each individual failure to comply is a separate breach carrying
                its own potential penalty.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'landlord-duties',
    heading: 'Landlord Duties Under the 2020 Regulations',
    content: (
      <>
        <p>
          Harrogate landlords have clear legal obligations under the 2020 Regulations. Compliance is
          straightforward for landlords who plan ahead and maintain a relationship with a qualified
          local electrician.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commission a valid EICR</strong> from a qualified and competent person.
                Arrange the inspection before each new tenancy begins and well before an existing
                EICR expires. Retain copies of all previous EICRs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribute the EICR</strong> — to existing tenants within 28 days of the
                inspection, to new tenants before they take up occupation, and to North Yorkshire
                Council within seven days if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complete all remedial work within 28 days</strong> where the EICR is
                Unsatisfactory. C1 (danger present) findings require immediate action. All remedial
                work must be carried out by a competent electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Obtain and distribute written confirmation</strong> of completed remedial
                work to the tenant and council within 28 days of the work being finished.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Harrogate landlords who have not provided the EICR to their tenant cannot serve a valid
          Section 21 (no-fault eviction) notice — an important practical consequence beyond the risk
          of civil penalties.
        </p>
      </>
    ),
  },
  {
    id: 'common-findings',
    heading: 'Common EICR Findings in Harrogate Properties',
    content: (
      <>
        <p>
          Harrogate's housing stock is characterised by its attractive Victorian and Edwardian
          period properties, particularly in the Duchy Estate, Valley Gardens area, and Starbeck.
          Many of these properties retain original or partially updated electrical installations.
          The following are the most frequent findings in local EICRs.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Absent RCD protection</strong> — Regulation 411.3.3 of BS 7671 requires 30mA
                RCD protection on all socket-outlet circuits rated up to 32A. Consumer units that
                have been replaced without RCD-protected ways are common across Harrogate's older
                housing stock. This is typically coded C2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing or inadequate main protective bonding</strong> — Regulation 544.1
                requires main protective bonding conductors connecting gas, water, and other
                extraneous conductive parts to the main earthing terminal. This is frequently absent
                or undersized in older Harrogate period properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Deteriorated wiring insulation</strong> — insulation resistance testing (per
                BS 7671 Section 612) on circuits with aged rubber-sheathed or early PVC cabling
                frequently reveals insulation breakdown. Values below 1MΩ indicate degraded
                insulation and an elevated risk of shock or fire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-compliant consumer units</strong> — consumer units in combustible
                plastic enclosures that do not meet the requirements now incorporated in BS
                7671:2018 are commonly found in properties where partial updates were made between
                2000 and 2015. These are recorded as C2.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'victorian-property',
    heading: 'Victorian and Period Property Challenges in Harrogate',
    content: (
      <>
        <p>
          Harrogate is well known for its elegant Victorian spa town architecture. The Duchy Estate,
          with its distinctive terracotta-brick semi-detached and detached villas, and the rows of
          Edwardian terraces in Starbeck and Low Harrogate represent some of Yorkshire's finest
          period housing. These properties, while architecturally desirable, present specific
          electrical inspection challenges.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multiple rewiring generations</strong> — a large Victorian villa may have
                been rewired in the 1960s, had extensions added in the 1990s, and undergone
                piecemeal consumer unit replacement in the 2010s. Each phase uses different cable
                types and standards. Establishing what is in place requires patient tracing and
                documentation by the inspector.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Difficult cable access</strong> — Victorian properties often have solid
                walls, original lath-and-plaster finishes, and complex roof voids. Testing circuits
                and tracing cables without damaging period fabric requires experience and time.
                Inspectors should allow additional time for Harrogate period properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservation area considerations</strong> — many of Harrogate's period
                properties are within designated conservation areas. Remedial work, including new
                cable runs and consumer unit replacement, must be carried out in a manner that does
                not affect the character of the property or require listed building consent where
                applicable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Higher inspection cost</strong> — the additional time required to inspect
                complex period property installations means that EICRs for Harrogate Victorian and
                Edwardian properties typically cost more than equivalent modern properties.
                Landlords should not choose inspectors based purely on lowest price.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'EICR Costs in Harrogate (2026 Prices)',
    content: (
      <>
        <p>
          Harrogate EICR prices reflect North Yorkshire and Yorkshire and Humber labour rates, which
          are broadly moderate — lower than London and the South East but slightly higher than some
          northern cities. The premium Harrogate property market means some electricians charge
          towards the higher end of regional rates.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat (modern)</strong> — £110 to £170. Typically 3 to 5 circuits
                with a single consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom property</strong> — £120 to £210. The most common private rented
                sector property type in Harrogate. Period properties command the higher end of this
                range.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £190 to £320. Duchy Estate and Starbeck
                Victorian properties frequently take longer due to installation complexity and may
                cost towards the top of this range.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large detached / HMO</strong> — £300 to £500 or more. Multiple consumer
                units, fire alarm systems, emergency lighting, and extended inspection times for
                large period properties all increase cost.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices are for the inspection and report only. Remedial work identified by the EICR
          — consumer unit replacement, RCD installation, rewiring of circuits — is quoted and
          charged separately. Some Harrogate electricians offer a package rate for landlords with
          multiple properties in their local portfolio.
        </p>
      </>
    ),
  },
  {
    id: 'finding-electrician',
    heading: 'Finding a Qualified Electrician in Harrogate',
    content: (
      <>
        <p>
          The 2020 Regulations require that EICRs are carried out by a qualified and competent
          person. An EICR from an unqualified inspector has no legal standing and will not satisfy
          the landlord regulations or HMO licensing conditions in the Harrogate area.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Search official scheme registers</strong> — use the NICEIC, NAPIT, or ELECSA
                online registers to find registered electricians in Harrogate and the wider North
                Yorkshire area. Registration confirms qualifications, professional indemnity
                insurance, and regular quality assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required qualifications</strong> — City and Guilds 2391 (Inspection and
                Testing) or the equivalent Level 3 Award in Inspection and Testing, plus a current
                BS 7671 18th Edition qualification (C&G 2382). Experience with Yorkshire period
                property types — particularly Victorian and Edwardian villas and terraces — is
                especially valuable in Harrogate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Calibrated test instruments</strong> — insulation resistance, earth fault
                loop impedance, and RCD testing require calibrated multifunction testers. Ask when
                the electrician's equipment was last calibrated. Reputable inspectors will have
                current calibration certificates available on request.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Period property experience</strong> — for Duchy Estate and Starbeck period
                properties, look for electricians who have specific experience with Victorian and
                Edwardian installations. These properties present challenges not encountered in
                standard modern domestic work, including complex cable tracing and assessment of
                multiple-era installations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Building an EICR Business in Harrogate',
    content: (
      <>
        <p>
          Harrogate's combination of a significant private rented sector, a large proportion of
          period properties requiring more complex inspection work, and a relatively affluent local
          economy creates excellent conditions for electricians who specialise in inspection and
          testing. Landlords owning multiple period properties across the Duchy and Starbeck areas
          often prefer to consolidate their EICR work with a single trusted electrician who
          understands the specific challenges of the local housing stock.
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
                  eliminate evening admin — particularly valuable on the longer, more complex
                  Harrogate period property inspections that already take more time.
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
                  When C1 or C2 observations are found, raise a remedial work quote on the day using
                  the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Harrogate landlords must act within 28 days — quoting on the day of the
                  inspection gives you the best chance of winning the remedial contract, which in
                  period properties is often substantial.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Win more EICR work across Harrogate with Elec-Mate"
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

export default function EICRHarogatePage() {
  return (
    <GuideTemplate
      title="EICR Harrogate | Electrical Installation Condition Report Harrogate"
      description="EICR Harrogate — landlord regulations under the 2020 Regulations, North Yorkshire Council enforcement, inspection costs, common findings in Victorian and period properties, and how to find a qualified electrician in Harrogate. 2026 guide."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          EICR Harrogate:{' '}
          <span className="text-yellow-400">Electrical Inspection & Landlord Compliance</span>
        </>
      }
      heroSubtitle="Everything landlords and electricians need to know about Electrical Installation Condition Reports in Harrogate — legal requirements under the 2020 Regulations, North Yorkshire Council enforcement, costs, special considerations for Duchy Estate and Starbeck period properties, and how to find a qualified inspector."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Harrogate"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs On Your Phone — Any Location in Harrogate"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
