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
  { label: 'EICR Guides', href: '/tools/eicr-certificate' },
  { label: 'EICR Cheltenham', href: '/eicr-cheltenham' },
];

const tocItems = [
  { id: 'what-is-eicr', label: 'What Is an EICR?' },
  { id: 'cheltenham-regulations', label: 'Cheltenham Regulations' },
  { id: 'landlord-duties', label: 'Landlord Duties' },
  { id: 'common-findings', label: 'Common Findings in Cheltenham' },
  { id: 'regency-properties', label: 'Regency & Period Property Challenges' },
  { id: 'costs', label: 'EICR Costs in Cheltenham' },
  { id: 'finding-electrician', label: 'Finding a Qualified Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 require all private landlords in Cheltenham to hold a valid EICR and renew it at least every five years.',
  'Cheltenham Borough Council enforces the 2020 Regulations and can issue civil penalties of up to £30,000 per breach for non-compliant landlords.',
  'Cheltenham has a high concentration of Regency and Victorian period properties across Montpellier, Pittville, and the Promenade area — their original electrical installations present specific inspection challenges including degraded fabric-covered wiring and complex earthing arrangements.',
  'C1 (danger present) and C2 (potentially dangerous) observations under BS 7671 Section 631 result in an Unsatisfactory EICR, requiring all remedial work within 28 days.',
  'Cheltenham EICR prices are broadly in line with the South West and Gloucestershire average, typically £130 to £220 for a two-bedroom property.',
];

const faqs = [
  {
    question: 'Is an EICR legally required in Cheltenham?',
    answer:
      'Yes. The Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 apply to all private rented properties in Cheltenham. Landlords must obtain an EICR before each new tenancy and renew it at least every five years. Cheltenham Borough Council enforces these regulations and can impose civil penalties of up to £30,000 per breach.',
  },
  {
    question: 'How much does an EICR cost in Cheltenham?',
    answer:
      'Cheltenham EICR prices are typically £110 to £180 for a one-bedroom flat, £130 to £220 for a two-bedroom property, £200 to £350 for a three-bedroom house, and £300 to £500 for larger or HMO properties. Period properties in Montpellier, Pittville, and the Bath Road corridor may cost more due to complex or multi-circuit installations. Cheltenham prices are broadly in line with the wider Gloucestershire and South West average.',
  },
  {
    question: 'What are the most common EICR failures in Cheltenham?',
    answer:
      "In Cheltenham's period property stock the most common C2 findings are: absent RCD protection on socket-outlet circuits (Regulation 411.3.3 of BS 7671), inadequate or missing main protective bonding (Regulation 544.1), degraded or fabric-covered wiring in converted Regency properties, and non-compliant consumer unit enclosures. Converted flats in large Regency terraces often have complex shared consumer unit arrangements that require careful inspection.",
  },
  {
    question: 'How long does an EICR take in Cheltenham?',
    answer:
      'A standard domestic EICR in Cheltenham takes two to four hours for a typical flat or terraced house. Larger detached properties in Charlton Kings or Leckhampton may take four to six hours. Period properties converted into flats can require additional time where installation boundaries are unclear or shared consumer units need to be identified. The inspector must complete insulation resistance, continuity, and earth fault loop impedance tests on every circuit.',
  },
  {
    question: 'Do Cheltenham HMOs require an EICR?',
    answer:
      'Yes. A valid EICR is a mandatory condition of HMO licensing in Cheltenham. Cheltenham Borough Council operates mandatory licensing for larger HMOs. Student areas around the University of Gloucestershire campus and Swindon Road have a concentration of HMO properties. The EICR must cover all fixed electrical installations including communal areas, fire alarm systems, and emergency lighting.',
  },
  {
    question: 'Are period properties in Cheltenham harder to pass an EICR?',
    answer:
      'Not necessarily harder to pass, but they are more likely to contain older wiring and equipment that generates observations. Regency and Victorian properties may have installation elements dating from the 1950s or earlier, including rubber-sheathed or lead-sheathed cabling, original bakelite accessories, and absence of earthing on older circuits. These are often C2 findings. The EICR assesses the installation against the current edition of BS 7671 and documents any deviations — this is more common in period properties.',
  },
  {
    question: 'What qualifications must a Cheltenham EICR inspector hold?',
    answer:
      'The inspector must be a qualified and competent person — in practice, registered with NICEIC, NAPIT, ELECSA, or an equivalent competent person scheme, and holding City and Guilds 2391 (Inspection and Testing) or equivalent plus a current BS 7671 18th Edition qualification (C&G 2382). Experience with Gloucestershire period property types, particularly converted Regency and Victorian terraces, is especially useful.',
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
          bonding, sockets, light fittings, and all fixed electrical equipment against the
          requirements of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (the 18th Edition IET Wiring Regulations), the national standard for electrical
          installations in the UK.
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
                <strong>Unsatisfactory</strong> — C1 (danger present) or C2 (potentially dangerous)
                observations have been found. The landlord must arrange all remedial work within 28
                days. The property cannot be let under a new tenancy without evidence that remedial
                work is underway or complete.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The EICR replaced the older Periodic Inspection Report (PIR) format and follows the
          requirements set out in BS 7671 Section 631. It is the document required by both the 2020
          private rented sector regulations and by HMO licensing schemes operated by Cheltenham
          Borough Council.
        </p>
      </>
    ),
  },
  {
    id: 'cheltenham-regulations',
    heading: 'EICR Regulations in Cheltenham',
    content: (
      <>
        <p>
          Cheltenham is an English borough and is subject to the Electrical Safety Standards in the
          Private Rented Sector (England) Regulations 2020. Cheltenham Borough Council is the local
          housing authority responsible for enforcement across the borough, which covers the town
          and surrounding areas including Charlton Kings, Leckhampton, Prestbury, and Pitville.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Who must comply</strong> — all private landlords letting under assured
                shorthold tenancies, assured tenancies, or regulated tenancies within the Cheltenham
                Borough Council area. Social housing has separate obligations. Live-in landlord
                arrangements are excluded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection frequency</strong> — before each new tenancy and at least every
                five years. The inspector may recommend a shorter re-inspection interval on the EICR
                itself, particularly for older period property installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Document distribution</strong> — copies must be provided to existing tenants
                within 28 days, to new tenants before they take up occupation, and to Cheltenham
                Borough Council within seven days if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Civil penalties</strong> — Cheltenham Borough Council can impose fines of up
                to £30,000 per breach. Each individual failure to comply is a separate breach and
                can attract its own penalty.
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
          Cheltenham landlords have clear legal obligations under the 2020 Regulations. Compliance
          is straightforward for landlords who plan ahead and maintain a relationship with a
          qualified local electrician.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Obtain a valid EICR</strong> from a qualified and competent person before
                each new tenancy begins. Ensure the existing EICR does not expire during the
                tenancy. Retain copies of all previous EICRs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribute the EICR</strong> — to existing tenants within 28 days of the
                inspection, to new tenants before they occupy the property, and to Cheltenham
                Borough Council within seven days if requested.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complete all remedial work within 28 days</strong> where the EICR is
                Unsatisfactory. C1 (danger present) findings require urgent action. All work must be
                carried out by a competent electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Provide written confirmation of completion</strong> — once remedial work is
                done, obtain written confirmation and distribute to the tenant and council within 28
                days of completion.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Cheltenham landlords who have not provided the EICR to their tenant cannot serve a valid
          Section 21 (no-fault eviction) notice. This creates a practical compliance incentive
          alongside the risk of financial penalties.
        </p>
      </>
    ),
  },
  {
    id: 'common-findings',
    heading: 'Common EICR Findings in Cheltenham Properties',
    content: (
      <>
        <p>
          Cheltenham's mixed housing stock — ranging from Regency townhouses and Victorian terraces
          to 1930s semi-detached properties and post-war council-built estates — generates a diverse
          range of EICR findings. The most frequent Unsatisfactory observations in the local area
          are as follows.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Absent RCD protection</strong> — Regulation 411.3.3 of BS 7671 requires 30mA
                RCD protection on all socket-outlet circuits up to 32A. Consumer units replaced
                without RCD-protected ways are common in properties across St Paul's, Springbank,
                and Hesters Way. This is typically coded C2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inadequate main protective bonding</strong> — Regulation 544.1 requires
                bonding conductors connecting gas, water, and other extraneous conductive parts to
                the main earthing terminal. This is frequently absent or undersized in older
                Cheltenham properties, resulting in a C2 observation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Degraded insulation resistance</strong> — insulation resistance testing (per
                BS 7671 Section 612) on circuits with aged PVC, rubber-sheathed, or fabric-covered
                wiring frequently reveals values below the 1MΩ minimum threshold, indicating
                insulation breakdown and risk of shock or fire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-compliant consumer units</strong> — consumer units in combustible
                plastic enclosures not meeting the requirements incorporated into BS 7671:2018 are
                commonly found in properties where piecemeal replacements were made before 2016.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'regency-properties',
    heading: 'Regency and Period Property Challenges in Cheltenham',
    content: (
      <>
        <p>
          Cheltenham is nationally recognised for its concentration of Regency and Georgian
          architecture, particularly in the Montpellier, Pittville, and Lansdown areas. These grand
          period properties — many now subdivided into flats or converted to HMOs — present specific
          electrical inspection challenges not found in more modern housing stock.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Layered installation histories</strong> — a Regency townhouse converted into
                flats may contain wiring from three or four different eras, each partially
                overlapping. The inspector must trace circuit boundaries carefully and document
                where complete rewiring cannot be confirmed. FI (Further Investigation) codes are
                common in these properties.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shared electrical infrastructure</strong> — many converted Cheltenham
                properties have shared consumer units, shared supply intake arrangements, or shared
                metering. Establishing what forms part of each dwelling's fixed installation — and
                therefore what the landlord must include in the EICR — requires inspector experience
                and judgement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservation area restrictions</strong> — properties in Cheltenham's
                conservation areas may have restrictions on visible external cable runs or
                alteration of original fabric. Electricians should factor this into remedial work
                planning and discuss any constraints with the landlord and the local authority
                before proceeding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Higher inspection time and cost</strong> — the additional complexity of
                period property inspections means that EICRs for Cheltenham Regency properties
                typically take longer and cost more than equivalent modern properties. Landlords
                should budget accordingly and avoid choosing inspectors based purely on lowest
                price.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'EICR Costs in Cheltenham (2026 Prices)',
    content: (
      <>
        <p>
          Cheltenham EICR prices reflect Gloucestershire and South West labour rates, which are
          broadly moderate — higher than the Midlands and North, but significantly lower than
          London. Period and converted properties command a premium due to increased inspection
          complexity.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat (modern)</strong> — £110 to £180. Typically 3 to 5 circuits
                with a single consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom property</strong> — £130 to £220. The most common property type
                in Cheltenham's private rented sector.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom house</strong> — £200 to £350. Victorian and Edwardian
                properties in Leckhampton and Charlton Kings may command the higher end of this
                range due to installation complexity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regency / converted / HMO property</strong> — £300 to £600 or more. Multiple
                consumer units, shared installation boundaries, fire alarm systems, and emergency
                lighting all increase inspection scope and cost.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices cover the inspection and report only. Any remedial work is quoted and charged
          separately. Some Cheltenham electricians offer combined inspection and remedial packages
          for landlords with portfolios of properties.
        </p>
      </>
    ),
  },
  {
    id: 'finding-electrician',
    heading: 'Finding a Qualified Electrician in Cheltenham',
    content: (
      <>
        <p>
          Cheltenham has a good range of NICEIC, NAPIT, and ELECSA-registered electricians.
          Landlords of period properties should specifically look for experience with converted and
          older buildings, as these present inspection challenges not covered by standard domestic
          training alone.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Search official registers</strong> — use the NICEIC, NAPIT, or ELECSA online
                registers to find registered electricians in Cheltenham and the Cotswolds area.
                Registration confirms qualifications, insurance, and regular quality assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Required qualifications</strong> — City and Guilds 2391 (Inspection and
                Testing) or equivalent, plus a current BS 7671 18th Edition qualification (C&G
                2382). Experience with converted period properties is particularly valuable in
                Cheltenham.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Calibrated test equipment</strong> — insulation resistance, earth fault loop
                impedance, and RCD testing require calibrated multifunction testers. Ask when the
                electrician's instruments were last calibrated.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional indemnity insurance</strong> — always verify the electrician
                holds professional indemnity insurance. This is a condition of competent person
                scheme membership and is especially important for complex period property
                inspections.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Building an EICR Business in Cheltenham',
    content: (
      <>
        <p>
          Cheltenham's buoyant private rented sector — driven by GCHQ employment, the annual
          festival economy, and the University of Gloucestershire — creates consistent demand for
          landlord EICRs. Electricians who develop expertise in period property inspections can
          command premium rates and build a loyal client base among Cheltenham's portfolio
          landlords.
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
                  eliminate evening paperwork — particularly valuable on complex period property
                  inspections that already take longer than average.
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
                  When C1 or C2 observations are found, raise a remedial quote on the day using the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Cheltenham landlords must complete remedial work within 28 days — quoting on the
                  inspection day gives you the best chance of winning the contract.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Win more EICR work across Cheltenham with Elec-Mate"
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

export default function EICRCheltenhamPage() {
  return (
    <GuideTemplate
      title="EICR Cheltenham | Electrical Inspection Cheltenham"
      description="EICR Cheltenham — landlord regulations, inspection costs, common findings in period and Regency properties, qualified electrician requirements, and enforcement by Cheltenham Borough Council. 2026 guide."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EICR Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          EICR Cheltenham:{' '}
          <span className="text-yellow-400">Electrical Inspection & Landlord Compliance</span>
        </>
      }
      heroSubtitle="Everything landlords and electricians need to know about Electrical Installation Condition Reports in Cheltenham — legal requirements under the 2020 Regulations, costs, special considerations for Regency and period properties, and how to find a qualified inspector."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About EICRs in Cheltenham"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs On Your Phone — Any Location in Cheltenham"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EICR completion with AI board scanning, voice test entry, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
