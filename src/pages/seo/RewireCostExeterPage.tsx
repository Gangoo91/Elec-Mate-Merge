import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Home,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Zap,
  ClipboardCheck,
  FileCheck2,
  Search,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Rewire Cost Guides', href: '/guides/house-rewire-cost' },
  { label: 'Rewire Cost Exeter', href: '/rewire-cost-exeter' },
];

const tocItems = [
  { id: 'rewire-costs-exeter', label: 'Rewire Costs in Exeter' },
  { id: 'signs-you-need-rewire', label: 'Signs You Need a Rewire' },
  { id: 'what-rewire-involves', label: 'What a Rewire Involves' },
  { id: 'timescales-disruption', label: 'Timescales and Disruption' },
  { id: 'part-p-compliance', label: 'Part P Compliance' },
  { id: 'choosing-contractor', label: 'Choosing a Contractor' },
  { id: 'guarantees-certification', label: 'Guarantees and Certification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A full house rewire in Exeter typically costs £2,300 to £5,800 depending on property size. Devon labour rates make Exeter one of the more affordable cities in England for rewiring work.',
  'All rewiring work must comply with BS 7671:2018+A3:2024 and be notified under Part P of the Building Regulations 2010.',
  'NICEIC and NAPIT registered contractors can self-certify rewiring work in Exeter — they notify Exeter City Council building control on your behalf.',
  "Exeter has significant Georgian, Victorian, and Edwardian housing stock in areas such as St Leonards, St David's, and Heavitree that may retain rubber-insulated wiring requiring a full rewire.",
  'Student rental properties near the University of Exeter in Heavitree, St James, and Polsloe should have current EICRs and may have wiring issues from heavy multi-occupancy use.',
  'On completion of a rewire in Exeter, your electrician must issue an Electrical Installation Certificate (EIC) — a legal requirement under BS 7671 and essential for property sales.',
];

const faqs = [
  {
    question: 'How much does it cost to rewire a house in Exeter?',
    answer:
      'A full rewire in Exeter typically costs £1,900 to £2,800 for a one-bedroom flat, £2,300 to £3,600 for a two-bedroom terrace, £3,200 to £4,800 for a three-bedroom semi-detached, and £4,200 to £5,800 for a four-bedroom detached. Devon labour rates are among the more affordable in England, typically 15 to 20 per cent below the national average. Prices include materials, labour, and the Electrical Installation Certificate.',
  },
  {
    question: 'How long does a house rewire take in Exeter?',
    answer:
      "A two-bedroom terrace in Exeter typically takes 2 to 3 days. Three-bedroom semi-detached properties common in Heavitree, Pinhoe, and Wonford take 3 to 5 days. Larger four-bedroom detached properties take 5 to 7 days. Georgian and Victorian properties in St Leonards and St David's with solid stone or brick walls may take an additional 1 to 3 days due to the complexity of cable routing.",
  },
  {
    question: 'Does rewiring in Exeter need Part P notification?',
    answer:
      "Yes. A full rewire is notifiable work under Part P of the Building Regulations 2010. NICEIC, NAPIT, and ELECSA registered electricians can self-certify rewiring work in Exeter and notify Exeter City Council building control on your behalf. If the electrician is not scheme registered, you must apply to the council's building control department before work begins.",
  },
  {
    question: 'What certificate should I receive after a rewire in Exeter?',
    answer:
      'On completion you should receive an Electrical Installation Certificate (EIC) signed by the electrician, including schedules of inspections and test results for all circuits. If the work was self-certified under Part P, you also receive a Building Regulations Compliance Certificate. Solicitors will request both documents when you sell the property — keep them safely with your deeds.',
  },
  {
    question: 'Do Exeter student rental properties need rewiring?',
    answer:
      'Student rental properties in Exeter — particularly those near the university in Heavitree, St James, and Polsloe — must comply with the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020. This requires a valid EICR every five years. Heavy multi-occupancy use accelerates wiring wear, and older properties in these areas often have wiring that fails periodic inspection. A rewire may be required if the EICR identifies C1 or C2 observations.',
  },
  {
    question: 'Is it worth rewiring before selling a house in Exeter?',
    answer:
      "If an EICR reveals C1 or C2 observations, buyers' solicitors and mortgage lenders will typically require these to be resolved before exchange of contracts. Rewiring before marketing can prevent delays and price reductions at the negotiation stage. An updated installation also typically adds more value than the cost of the rewire in the current Devon property market. Always get a survey and quotes before deciding.",
  },
  {
    question: 'How do I find a qualified rewire electrician in Exeter?',
    answer:
      'Use the NICEIC or NAPIT online registers to find registered contractors in Exeter and the wider Devon area. Both registers confirm current qualifications, insurance, and annual technical assessment. Obtain at least three written quotes, check Google and Checkatrade reviews, and confirm the contractor will provide an EIC and manage Part P notification on your behalf.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/house-rewire-cost',
    title: 'House Rewire Cost Guide',
    description:
      "National rewire cost guide covering all property sizes, what's included, and how to compare quotes.",
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/rewire-cost-plymouth',
    title: 'Rewire Cost Plymouth',
    description: 'House rewire costs in Plymouth and Devon with local contractor guidance.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'What Part P means for homeowners and electricians — notifiable work, self-certification, and compliance.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'Electrical Installation Certificate App',
    description:
      'Issue EICs on your phone. Auto-populated test schedules, instant PDF, and Part P ready.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes',
    description: 'Understand C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'rewire-costs-exeter',
    heading: 'House Rewire Costs in Exeter (2025 Prices)',
    content: (
      <>
        <p>
          Exeter rewire costs are among the more affordable for a county town in England, reflecting
          Devon's lower labour rates compared with the South East. The city's diverse housing stock
          — from Georgian townhouses in the Cathedral Quarter to 1960s estates in Pinhoe — means
          costs vary with construction type as well as property size.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £1,900 to £2,700. Purpose-built blocks and
                converted Victorian houses near the university and city centre.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom terraced house</strong> — £2,300 to £3,600. Victorian and
                Edwardian terraces common in St Thomas, Heavitree, Polsloe, and Mount Pleasant.
                Typically 8 to 12 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom semi-detached</strong> — £3,200 to £4,800. Common across
                Exeter's suburbs including Heavitree, Wonford, Pinhoe, and Alphington. Typically 12
                to 16 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom detached</strong> — £4,200 to £5,800. Larger properties in St
                Leonards, Topsham, and Cranbrook.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Georgian and Victorian stone-built properties</strong> — add 25 to 40 per
                cent for older properties in the Cathedral Quarter, St David's, and St Leonards
                where solid stone walls require surface-run conduit.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices include stripping existing wiring, installing new PVC twin-and-earth cables,
          fitting a modern consumer unit with RCD protection, installing new accessories, and
          issuing the Electrical Installation Certificate. Redecoration and plastering are separate
          costs.
        </p>
      </>
    ),
  },
  {
    id: 'signs-you-need-rewire',
    heading: 'Signs Your Exeter Property Needs a Rewire',
    content: (
      <>
        <p>
          Exeter's rich architectural heritage means many properties date from before 1940, and some
          retain original or interwar wiring. Even properties from the 1950s and 1960s may have
          wiring at or approaching the end of its safe service life.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rubber-insulated or fabric-braided cables</strong> — pre-1960s rubber
                insulation that degrades and exposes live conductors. Recorded as C1 (danger
                present) on an EICR, requiring immediate remedial action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuse box</strong> — ceramic fuse holders with fuse wire indicate a
                pre-1970s installation with no modern protection. Common in Exeter's older terrace
                stock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection</strong> — a consumer unit without RCD protection on
                socket circuits is a C2 (potentially dangerous) finding under BS 7671 Regulation
                411.3.3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Student rental wear and damage</strong> — heavy multi-occupancy use in
                student properties near the university can accelerate socket and accessory damage. A
                periodic inspection can reveal whether a rewire is needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unsatisfactory EICR</strong> — C1 or C2 observations that cannot be resolved
                economically through targeted repairs indicate a full rewire is likely the best
                investment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Commission a{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">
            periodic inspection and EICR
          </SEOInternalLink>{' '}
          before purchasing an older Exeter property or undertaking major renovation work.
        </p>
      </>
    ),
  },
  {
    id: 'what-rewire-involves',
    heading: 'What a Full House Rewire Involves',
    content: (
      <>
        <p>
          A full rewire replaces all fixed electrical wiring from the incoming mains connection
          throughout the property. The process follows the same sequence in Exeter as anywhere in
          the UK.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>First fix</strong> — removal of existing wiring, routing new cables through
                floors, walls, and ceiling voids, installing back boxes and containment. The most
                disruptive stage. In Exeter's stone-built properties this often means surface-run
                conduit rather than chased cables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Second fix</strong> — fitting the consumer unit, connecting circuits,
                installing sockets, switches, and light fittings. Power is restored at the end of
                this stage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing and inspection</strong> — all circuits tested to BS 7671 Chapter 64.
                Results recorded on test schedules forming part of the Electrical Installation
                Certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification and notification</strong> — EIC issued and Part P notification
                submitted to Exeter City Council or via the competent person scheme.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'timescales-disruption',
    heading: 'Timescales and Disruption',
    content: (
      <>
        <p>
          Rewire duration in Exeter depends on property size and whether the walls are solid or
          cavity construction. Many of the city's most desirable properties are in solid-wall
          Victorian and Georgian buildings that take longer to rewire.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom terrace</strong> — 2 to 3 days. Victorian terraces in Heavitree
                and St Thomas with accessible timber floors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom semi-detached</strong> — 3 to 5 days. Standard duration for
                post-war and 1960s semi-detached properties across Exeter's suburbs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom detached</strong> — 5 to 7 days. Larger properties with more
                circuits and longer cable runs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Georgian and Victorian solid-wall properties</strong> — add 2 to 4 days.
                Properties in St Leonards, the Cathedral Quarter, and St David's often require
                surface-run conduit and careful cable planning through solid stone or brick walls.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The property will be without mains power during working hours. Plan for this disruption
          before the rewire begins, particularly if medical equipment is in use or vulnerable
          occupants are present.
        </p>
      </>
    ),
  },
  {
    id: 'part-p-compliance',
    heading: 'Part P Compliance in Exeter',
    content: (
      <>
        <p>
          Part P of the Building Regulations 2010 applies across England including Exeter. A full
          rewire is notifiable work and must comply with BS 7671:2018+A3:2024.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-certification</strong> — NICEIC, NAPIT, and ELECSA registered
                electricians can self-certify rewiring work throughout Devon. They notify Exeter
                City Council building control on your behalf and issue a compliance certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building control route</strong> — for non-scheme electricians, notify Exeter
                City Council building control before work begins. An inspector may check the
                installation before issuing a completion notice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC mandatory</strong> — an Electrical Installation Certificate must be
                provided on completion. This is a legal requirement and is essential for property
                sales and remortgaging.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'choosing-contractor',
    heading: 'Choosing a Rewire Contractor in Exeter',
    content: (
      <>
        <p>
          Exeter and East Devon have a good range of qualified electrical contractors. Follow these
          steps to find a reliable, competent electrician for your rewire.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC or NAPIT registration</strong> — confirm current registration using
                the online registers. Verify the scope covers domestic rewiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three written quotes</strong> — itemised quotes covering circuits, consumer
                unit specification, accessories, EIC, and Part P notification. Compare on a like for
                like basis.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check insurance</strong> — public liability insurance of at least £1 million
                is required. All NICEIC and NAPIT members maintain this as a condition of
                registration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local reviews</strong> — check Google and Checkatrade for recent Exeter
                rewire reviews. Experience with the city's older housing stock, particularly
                solid-wall properties, is a useful indicator of competence.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'guarantees-certification',
    heading: 'Guarantees and Certification',
    content: (
      <>
        <p>
          After your Exeter rewire, the following documentation should be stored safely with your
          property deeds.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate (EIC)</strong> — BS 7671 compliance
                document including signed schedules of inspections and test results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations Compliance Certificate</strong> — confirms Part P
                compliance, issued by Exeter City Council or the competent person scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workmanship guarantee</strong> — typically 1 to 5 years from reputable Devon
                contractors. Confirm scope and duration before work begins.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Next inspection</strong> — owner-occupied: EICR in 10 years. Rental: EICR
                every 5 years under the Electrical Safety Standards in the Private Rented Sector
                (England) Regulations 2020.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Rewire Work in Exeter and Devon',
    content: (
      <>
        <p>
          Exeter's student rental market and older housing stock create consistent demand for
          rewiring and periodic inspection work. Electricians who complete professional
          certification efficiently and quote competitively build strong local reputations.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue EICs On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/eic-certificate">Elec-Mate EIC app</SEOInternalLink>{' '}
                  to complete your Electrical Installation Certificate on your phone before leaving
                  the property. No paperwork in the evening — the customer receives their
                  certificate the same day.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Win More Exeter Rewires</h4>
                <p className="text-white text-sm leading-relaxed">
                  Generate professional rewire quotes in minutes with the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . Win more work with clear, itemised quotes that give Exeter homeowners and
                  landlords confidence to proceed.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Exeter rewire business with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for on-site EIC completion, professional quoting, and job management. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function RewireCostExeterPage() {
  return (
    <GuideTemplate
      title="House Rewire Cost Exeter 2025 | Rewire Devon"
      description="House rewire costs in Exeter for 2025. Prices for all property sizes, Part P compliance, NICEIC and NAPIT contractors, signs your Exeter property needs rewiring, timescales, and certification explained."
      datePublished="2025-01-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Rewire Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          House Rewire Cost Exeter:{' '}
          <span className="text-yellow-400">2025 Prices & Devon Guide</span>
        </>
      }
      heroSubtitle="Everything you need to know about house rewire costs in Exeter and Devon — property size price breakdowns, Part P compliance, finding NICEIC and NAPIT registered contractors, signs your property needs rewiring, and the certification you should receive."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About House Rewiring in Exeter"
      relatedPages={relatedPages}
      ctaHeading="Issue Electrical Installation Certificates on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site EIC completion, auto-populated test schedules, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
