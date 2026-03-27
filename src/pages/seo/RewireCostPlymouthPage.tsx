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
  { label: 'Rewire Cost Plymouth', href: '/rewire-cost-plymouth' },
];

const tocItems = [
  { id: 'rewire-costs-plymouth', label: 'Rewire Costs in Plymouth' },
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
  'A full house rewire in Plymouth typically costs £2,200 to £5,500 depending on property size. Devon labour rates are among the more affordable in England.',
  'All rewiring work must comply with BS 7671:2018+A3:2024 and be notified under Part P of the Building Regulations 2010.',
  'NICEIC and NAPIT registered contractors can self-certify rewiring work in Plymouth — they notify Plymouth City Council building control on your behalf.',
  'Plymouth has a significant stock of post-war housing built under Plymouth\'s post-Blitz reconstruction programme. Some of this housing may retain original 1950s wiring requiring a full rewire or significant remedial work.',
  'Victorian and Edwardian properties in Mutley, Lipson, and Greenbank may retain rubber-insulated wiring that is a C1 (danger present) finding under BS 7671.',
  'On completion, your electrician must issue an Electrical Installation Certificate (EIC) — a legal document required for property sales in Plymouth and Devon.',
];

const faqs = [
  {
    question: 'How much does it cost to rewire a house in Plymouth?',
    answer:
      'A full rewire in Plymouth typically costs £1,800 to £2,800 for a one-bedroom flat, £2,200 to £3,500 for a two-bedroom terrace, £3,000 to £4,500 for a three-bedroom semi-detached, and £4,000 to £5,500 for a four-bedroom detached. Plymouth and Devon labour rates are among the more affordable in England, typically 15 to 25 per cent below the national average. These prices include materials, labour, and the Electrical Installation Certificate.',
  },
  {
    question: 'How long does a rewire take in Plymouth?',
    answer:
      'A two-bedroom terrace in Plymouth typically takes 2 to 3 days. A three-bedroom semi-detached — common in areas such as Plympton, Plymstock, and Honicknowle — takes 3 to 5 days. Larger detached properties take 5 to 7 days. Victorian and Edwardian properties in Mutley, Lipson, and Stoke with solid walls may take an additional day or two compared with cavity wall construction.',
  },
  {
    question: 'Does rewiring in Plymouth need Part P notification?',
    answer:
      'Yes. A full rewire is notifiable work under Part P of the Building Regulations 2010. NICEIC, NAPIT, and ELECSA registered electricians can self-certify the work and notify Plymouth City Council building control on your behalf. If the electrician is not scheme registered, the work must be notified to the council\'s building control department before it begins.',
  },
  {
    question: 'What are the signs that a Plymouth property needs rewiring?',
    answer:
      'Key signs include rubber-insulated or fabric-braided cables (pre-1960s), a rewirable fuse box with ceramic fuse holders, absence of RCD protection on socket circuits, single-core aluminium wiring (1960s–70s), and persistent circuit tripping or fuse failure. Plymouth\'s large stock of post-war reconstruction housing from the 1950s means some properties may retain original wiring that is now 70 years old and requires assessment.',
  },
  {
    question: 'What certificate should I receive after a rewire in Plymouth?',
    answer:
      'On completion you should receive an Electrical Installation Certificate (EIC) signed by the electrician, including schedules of inspections and test results for all circuits. If the work was self-certified under Part P, you also receive a Building Regulations Compliance Certificate. Both documents are required when you sell the property and should be kept safely with your deeds.',
  },
  {
    question: 'Can I remain in my house during a rewire in Plymouth?',
    answer:
      'It is possible but significantly disruptive. There will be extended periods without electricity, lifted floorboards, and dust and debris throughout the property. Many Plymouth homeowners choose to stay elsewhere for the duration, particularly for larger properties. Your electrician should agree a daily programme of works and confirm the expected power-off hours before starting.',
  },
  {
    question: 'How do I find a qualified rewire electrician in Plymouth?',
    answer:
      'Use the NICEIC or NAPIT online registers to find currently registered contractors in Plymouth and the wider Devon area. Both registers confirm qualifications, insurance, and annual technical assessment. Obtain at least three detailed written quotes, check Google and Checkatrade reviews, and confirm the contractor will provide an EIC and handle Part P notification.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/house-rewire-cost',
    title: 'House Rewire Cost Guide',
    description: 'National rewire cost guide covering all property sizes, what\'s included, and how to compare quotes.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/rewire-cost-exeter',
    title: 'Rewire Cost Exeter',
    description: 'House rewire costs in Exeter and Devon with local contractor guidance.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description: 'What Part P means for homeowners and electricians — notifiable work, self-certification, and compliance.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'Electrical Installation Certificate App',
    description: 'Issue EICs on your phone. Auto-populated test schedules, instant PDF, and Part P ready.',
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
    id: 'rewire-costs-plymouth',
    heading: 'House Rewire Costs in Plymouth (2025 Prices)',
    content: (
      <>
        <p>
          Plymouth offers some of the most affordable rewire prices of any major English city.
          Devon labour rates are typically 15 to 25 per cent below the national average, and
          significantly below South East England prices. Material costs are consistent across the UK.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>One-bedroom flat</strong> — £1,800 to £2,500. Common in city centre
                conversions, waterfront developments in the Barbican, and purpose-built blocks
                across Plymouth.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom terraced house</strong> — £2,200 to £3,500. Found throughout
                Mutley, Lipson, St Judes, and Keyham. Typically 8 to 12 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom semi-detached</strong> — £3,000 to £4,500. Very common
                across Plymouth's post-war estates in Plymstock, Plympton, Honicknowle, and
                Whitleigh. Typically 12 to 16 circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom detached</strong> — £4,000 to £5,500. Larger properties
                in Mannamead, Hartley, and Derriford.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian and Edwardian properties</strong> — add 20 to 30 per cent for
                pre-1940 properties in Mutley, Stoke, and Greenbank with solid granite or brick
                walls.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices include stripping out existing wiring, installing new PVC twin-and-earth
          cables, fitting a modern consumer unit with RCD protection, installing new accessories,
          and issuing the Electrical Installation Certificate. Redecoration and plastering are
          quoted separately.
        </p>
      </>
    ),
  },
  {
    id: 'signs-you-need-rewire',
    heading: 'Signs Your Plymouth Property Needs a Rewire',
    content: (
      <>
        <p>
          Plymouth's housing stock includes a unique mix of Victorian and Edwardian properties,
          post-war reconstruction housing from the 1950s, and more recent suburban development.
          Properties dating from before 1970 in particular should be assessed by a qualified
          electrician. Watch out for these indicators.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rubber-insulated or fabric-braided cables</strong> — pre-1960s wiring
                with deteriorated rubber insulation. This is a C1 (danger present) observation
                on an EICR requiring immediate remedial action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Original 1950s post-war wiring</strong> — Plymouth's reconstruction
                properties often contain original rubber-insulated wiring that is now 70 years
                old and past its safe service life.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rewirable fuse box</strong> — ceramic fuse holders with fuse wire, common
                in Plymouth's older housing stock. No RCD protection and limited overcurrent
                protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection</strong> — absence of residual current device protection
                on socket circuits is a C2 (potentially dangerous) finding under BS 7671 Regulation
                411.3.3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unsatisfactory EICR</strong> — C1 or C2 observations that cannot be
                resolved economically through targeted repairs indicate a full rewire is needed.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you are buying a property in Plymouth or planning major renovation work, commission a{' '}
          <SEOInternalLink href="/guides/eicr-for-landlords">
            periodic inspection and EICR
          </SEOInternalLink>{' '}
          before exchanging contracts or beginning work.
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
          A full rewire replaces all fixed electrical wiring throughout the property. Understanding
          the process helps Plymouth homeowners plan effectively and set realistic expectations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>First fix</strong> — removal of existing wiring, routing new cables through
                floors, walls, and ceiling voids, and installing back boxes and containment. Involves
                lifted floorboards and chased or surface-run cable routes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Second fix</strong> — fitting the consumer unit, connecting all circuits,
                installing sockets, switches, and light fittings. Power is restored at the end
                of this stage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing and inspection</strong> — comprehensive circuit testing to BS 7671
                Chapter 64 including insulation resistance, earth continuity, and RCD testing. All
                results recorded on test schedules.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification and notification</strong> — EIC issued and Part P notification
                submitted to Plymouth City Council building control or via the competent person
                scheme.
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
          Rewire duration in Plymouth depends on property size and construction. The city's mix of
          post-war semi-detached houses and Victorian terraces means timescales vary.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom terrace</strong> — 2 to 3 days. Plymouth terraces with timber
                floors and accessible ceiling voids are generally straightforward to rewire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom semi-detached</strong> — 3 to 5 days. Post-war semi-detached
                houses in Plympton and Plymstock are typically straightforward.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom detached</strong> — 5 to 7 days. Larger properties with more
                circuits and complex layouts.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Victorian granite-built properties</strong> — add 1 to 3 days. Mutley,
                Stoke, and Greenbank properties built from Dartmoor granite are particularly
                challenging for cable chasing and often require surface-run conduit.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The property will be without mains power during working hours. Plan for this disruption
          before work begins, particularly if you have medical equipment, pets, or vulnerable
          household members.
        </p>
      </>
    ),
  },
  {
    id: 'part-p-compliance',
    heading: 'Part P Compliance in Plymouth',
    content: (
      <>
        <p>
          Part P of the Building Regulations 2010 applies throughout England including Plymouth.
          A full rewire is notifiable work and must comply with BS 7671:2018+A3:2024.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-certification</strong> — NICEIC, NAPIT, and ELECSA registered
                electricians can self-certify rewiring work in Plymouth and Devon. They notify
                Plymouth City Council building control on your behalf and you receive a compliance
                certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building control route</strong> — if the electrician is not scheme
                registered, notify Plymouth City Council building control before work begins.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>EIC mandatory</strong> — an Electrical Installation Certificate must be
                issued on completion. This is required for property sales and should be stored
                with your property deeds.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'choosing-contractor',
    heading: 'Choosing a Rewire Contractor in Plymouth',
    content: (
      <>
        <p>
          Plymouth has a range of qualified electrical contractors serving the city and the wider
          South Hams and West Devon areas. Follow these steps to find a reliable electrician.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC or NAPIT registration</strong> — confirm current registration status
                using the online registers. Registration confirms qualifications, insurance, and
                annual technical assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three written quotes</strong> — each should itemise circuits, consumer unit
                specification, accessories, EIC, and Part P notification. Compare like for like.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verify insurance</strong> — public liability insurance of at least £1 million
                is required. Scheme members maintain this as a condition of registration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local reviews</strong> — check Google and Checkatrade for recent Plymouth
                rewire reviews. Ask for references from the contractor if you require additional
                assurance.
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
          After your Plymouth rewire, keep the following documents safely with your property deeds.
          They are required for property sales and future periodic inspections.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate (EIC)</strong> — primary BS 7671
                compliance document including signed schedules of inspections and test results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations Compliance Certificate</strong> — confirms Part P
                compliance, issued by Plymouth City Council or the competent person scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workmanship guarantee</strong> — confirm scope and duration in your contract
                before work begins. Reputable Devon contractors typically offer 1 to 5 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Next inspection date</strong> — owner-occupied properties: EICR in 10 years.
                Rental properties: EICR every 5 years under the Electrical Safety Standards in the
                Private Rented Sector (England) Regulations 2020.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Rewire Work in Plymouth and Devon',
    content: (
      <>
        <p>
          Plymouth and Devon offer consistent demand for domestic rewiring, particularly from the
          city's large stock of post-war and Victorian properties. Fast, professional certification
          and competitive quoting are key to winning work in this market.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete EICs On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Elec-Mate EIC app
                  </SEOInternalLink>{' '}
                  to complete your Electrical Installation Certificate on your phone before leaving
                  the property. Auto-populated test schedules and instant PDF export mean customers
                  receive their certificate the same day.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Win More Devon Rewires</h4>
                <p className="text-white text-sm leading-relaxed">
                  Generate professional rewire quotes in minutes with the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  . Clear, itemised quotes that include Part P notification give Plymouth homeowners
                  confidence to commit.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your Plymouth rewire business with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EIC completion, professional quoting, and job management. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function RewireCostPlymouthPage() {
  return (
    <GuideTemplate
      title="House Rewire Cost Plymouth 2025 | Rewire Prices Devon"
      description="House rewire costs in Plymouth for 2025. Prices for all property sizes, Part P compliance, NICEIC and NAPIT contractors, signs your Devon property needs rewiring, timescales, and certification explained."
      datePublished="2025-01-01"
      dateModified="2025-06-01"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Rewire Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          House Rewire Cost Plymouth:{' '}
          <span className="text-yellow-400">2025 Prices & Devon Guide</span>
        </>
      }
      heroSubtitle="Everything you need to know about house rewire costs in Plymouth and Devon — property size price breakdowns, Part P compliance, finding NICEIC and NAPIT registered contractors, signs your property needs rewiring, and the certification you should receive."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About House Rewiring in Plymouth"
      relatedPages={relatedPages}
      ctaHeading="Issue Electrical Installation Certificates on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EIC completion, auto-populated test schedules, and instant PDF export. 7-day free trial, cancel anytime."
    />
  );
}
