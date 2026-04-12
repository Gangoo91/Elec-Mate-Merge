import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Calculator,
  Zap,
  Wrench,
  FileCheck2,
  PoundSterling,
  Home,
  Clock,
  Lightbulb,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Bungalow Rewire Cost', href: '/guides/bungalow-rewire-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Why Rewire a Bungalow?' },
  { id: 'cost-breakdown', label: 'Cost Breakdown by Size' },
  { id: 'what-is-included', label: 'What Is Included' },
  { id: 'labour-costs', label: 'Labour and Timescales' },
  { id: 'bungalow-advantages', label: 'Bungalow-Specific Advantages' },
  { id: 'factors', label: 'Factors Affecting Price' },
  { id: 'regulations', label: 'Regulations and Certification' },
  { id: 'for-electricians', label: 'For Electricians: Quoting Bungalow Rewires' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A bungalow rewire in the UK typically costs between £3,000 and £6,000 depending on the size, number of rooms, and complexity of the installation.',
  'Bungalows are often easier and quicker to rewire than two-storey houses because all cable runs are accessible from the loft void above, eliminating the need to lift first-floor floorboards.',
  'A two-bedroom bungalow rewire averages £3,000 to £4,200; a three-bedroom bungalow £3,800 to £5,200; and a large four-bedroom bungalow £4,500 to £6,000.',
  'Regulation 411.3.3 of BS 7671 requires 30mA RCD protection on all socket outlet circuits up to 32A, bathroom circuits, and circuits supplying equipment outdoors.',
  'Many bungalows are occupied by older residents and may have very old wiring (1960s or 1970s) — rubber-sheathed cables, rewirable fuses, and no RCD protection are common findings.',
];

const faqs = [
  {
    question: 'How much does it cost to rewire a two-bedroom bungalow in 2026?',
    answer:
      'A two-bedroom bungalow rewire in 2026 typically costs between £3,000 and £4,200. This includes a new consumer unit with RCBOs and SPD, new lighting and power circuits throughout, kitchen and bathroom circuits, smoke and heat detection, bonding, full testing to BS 7671, and an Electrical Installation Certificate. The exact price depends on the number of socket outlets and light points, the condition of the existing installation, and regional labour rates.',
  },
  {
    question: 'Is a bungalow cheaper to rewire than a house?',
    answer:
      'Generally yes, when comparing like-for-like room counts. A bungalow is typically cheaper to rewire than a two-storey house with the same number of bedrooms because all cable runs can be made from the loft void above. There are no first-floor floorboards to lift, no cables to run between storeys, and the electrician can work from a single level. This saves significant labour time. However, a large four-bedroom bungalow may cost more than a small two-bedroom house simply due to the greater number of circuits and longer cable runs.',
  },
  {
    question: 'How long does a bungalow rewire take?',
    answer:
      'A two-bedroom bungalow typically takes 4 to 6 days for first fix and second fix combined. A three-bedroom bungalow takes 5 to 8 days. A large four-bedroom bungalow with extensive outbuildings or a detached garage may take 7 to 10 days. The single-storey layout and loft access generally make bungalow rewires faster than equivalent-sized houses.',
  },
  {
    question: 'Can I live in the bungalow during a rewire?',
    answer:
      'Yes, it is possible to stay in the bungalow during a rewire, though there will be disruption. The electrician can maintain temporary power to areas not being worked on. The first fix phase is the most disruptive — walls may need channelling, and there will be dust and noise. If you can stay elsewhere for the first fix phase (3 to 5 days), the work will proceed faster. Many bungalow residents are elderly, so the electrician should plan the work to minimise disruption and maintain access to essential facilities.',
  },
  {
    question: 'Do bungalows often need rewiring?',
    answer:
      'Many bungalows in the UK were built in the 1950s, 1960s, and 1970s and have never been rewired. These properties commonly have rubber or PVC-sheathed cables that have deteriorated, rewirable fuse boards with no RCD protection, and inadequate earthing arrangements. If your bungalow has not been rewired in 30+ years, or if an EICR has identified serious deficiencies, a rewire is strongly recommended.',
  },
  {
    question: 'What about the garage and outbuildings?',
    answer:
      'Many bungalows have attached or detached garages, sheds, or workshops with their own electrical supply. Rewiring these is additional work. A garage supply typically costs £300 to £800 depending on whether a new SWA (steel wire armoured) cable needs to be run underground from the consumer unit. Each outbuilding circuit needs its own RCD protection and may require a small distribution board.',
  },
  {
    question: 'Will I need to redecorate after a bungalow rewire?',
    answer:
      'Some redecoration is usually needed, but bungalows with loft access require less channelling than houses. Many cable runs can be made through the loft void and dropped down to accessories, reducing the amount of wall chasing. Budget approximately £800 to £2,000 for plastering and redecoration after a bungalow rewire, depending on the extent of surface work required.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/rewire-cost-uk',
    title: 'Full House Rewire Cost UK',
    description: 'Complete guide to house rewire costs for all property types.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/flat-rewire-cost',
    title: 'Flat Rewire Cost UK',
    description: 'Flat-specific rewire costs for comparison.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Cost',
    description: 'Detailed consumer unit cost breakdown — always included in a rewire.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete EICs for bungalow rewires on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Rewire a Bungalow?',
    content: (
      <>
        <p>
          A bungalow rewire replaces all electrical wiring, accessories, and the consumer unit with
          a modern installation compliant with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          . Many bungalows in the UK were built in the post-war period and have original wiring that
          is now 50 to 70 years old — well beyond its serviceable life.
        </p>
        <p>
          Common issues found in older bungalows include rubber-sheathed or lead-sheathed cables
          with degraded insulation, rewirable fuse boards with no RCD protection, inadequate
          earthing (particularly TT systems with old earth rods), and insufficient socket outlets
          leading to overloaded extension leads. An{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> on a 1960s
          bungalow commonly returns multiple C2 (potentially dangerous) observations.
        </p>
        <p>
          The good news is that bungalows are typically easier to rewire than two-storey houses. The
          single-storey layout means all rooms are accessible from the loft void, making cable runs
          straightforward and reducing the amount of disruptive wall chasing.
        </p>
      </>
    ),
  },
  {
    id: 'cost-breakdown',
    heading: 'Cost Breakdown by Size',
    content: (
      <>
        <p>
          Here are realistic 2026 costs for bungalow rewires, including all materials, labour,
          testing, Part P notification, and the EIC.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two-bedroom bungalow</strong> — £3,000 to £4,200 total. Typically 8 to 10
                circuits. Materials: £800 to £1,200. Labour: £1,800 to £2,600 (4 to 6 days).
                Certification: £50 to £80.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-bedroom bungalow</strong> — £3,800 to £5,200 total. Typically 10 to 14
                circuits. Materials: £1,000 to £1,500. Labour: £2,400 to £3,200 (5 to 8 days).
                Certification: £50 to £80.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Four-bedroom bungalow</strong> — £4,500 to £6,000 total. Typically 12 to 16
                circuits. Materials: £1,200 to £1,800. Labour: £2,800 to £3,700 (7 to 10 days).
                Certification: £50 to £80.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Add £300 to £800 for rewiring a detached garage or workshop, and £800 to £2,000 for
          plastering and redecoration.
        </p>
      </>
    ),
  },
  {
    id: 'what-is-included',
    heading: 'What Is Included in a Bungalow Rewire',
    content: (
      <>
        <p>A full bungalow rewire includes:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New consumer unit</strong> — metal enclosure with RCBOs, SPD, and main
                switch. Typically 10 to 14-way for a bungalow.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power circuits</strong> — ring final circuits to downstairs socket outlets.
                Dedicated radials for kitchen appliances if needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting circuits</strong> — new circuits throughout with modern cable.
                Opportunity to add additional light points or downlights.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuits</strong> — cooker, shower, immersion heater, and any
                high-power appliances on individual circuits with appropriate protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>External lighting and garage supply</strong> — outside lights, garden
                supply, and garage or workshop circuits as required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smoke and heat detection</strong> — hardwired interlinked detectors in
                hallways, bedrooms, and kitchen as required by Building Regulations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing, certification, and Part P notification</strong> — full EIC and
                Building Regulations compliance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'labour-costs',
    heading: 'Labour and Timescales',
    content: (
      <>
        <p>
          Bungalow rewires benefit from the single-storey layout. All cable runs can be made through
          the loft void and dropped down through the ceiling to wall-mounted accessories. This
          significantly reduces the need for wall chasing compared to a two-storey house.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>First fix (cable installation)</strong> — 3 to 6 days depending on bungalow
                size. Most cable runs via the loft void, with minimal wall chasing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Second fix (termination and testing)</strong> — 1 to 3 days. Installing
                accessories, connecting the consumer unit, and testing every circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrician day rate</strong> — £250 to £400 depending on region. Most
                bungalow rewires are quoted as a fixed price.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bungalow-advantages',
    heading: 'Bungalow-Specific Advantages for Rewiring',
    content: (
      <>
        <p>
          Bungalows have several characteristics that make them generally easier and cheaper to
          rewire per room than two-storey houses:
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loft access</strong> — all rooms have a ceiling with loft void above,
                allowing cables to be run freely without lifting floorboards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>No inter-floor cable routes</strong> — there are no cables to run between
                ground and first floors, eliminating one of the most time-consuming aspects of house
                rewires.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reduced wall chasing</strong> — cables can drop from the loft to accessories
                with only short vertical chases in the wall, reducing disruption and redecoration
                costs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single consumer unit location</strong> — no need for sub-distribution boards
                on upper floors, keeping the installation simple and cost-effective.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'factors',
    heading: 'Factors Affecting Price',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loft insulation</strong> — thick loft insulation can slow cable runs and
                requires careful routing to maintain fire safety. Cables must not be buried in
                thermal insulation without appropriate derating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing arrangement</strong> — many older bungalows have TT earthing with
                an earth rod. If the earth electrode resistance is too high, a new earth rod or
                upgrade may be needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outbuildings</strong> — a detached garage, workshop, or garden office
                requiring a new SWA supply adds £300 to £800 per outbuilding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional circuits</strong> — EV charger, solar PV, underfloor heating, or
                electric cooking appliances each require dedicated circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Location</strong> — regional labour rate variation of 15% to 30% between
                London/South East and northern England.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Regulations and Certification',
    content: (
      <>
        <p>
          A bungalow rewire is notifiable under Part P of the Building Regulations. The electrician
          must be registered with a competent person scheme (NICEIC, NAPIT, ELECSA) to self-certify
          the work.
        </p>
        <p>
          Key requirements under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          include: Regulation 411.3.3 requiring 30mA RCD protection on socket circuits up to 32A,
          bathroom circuits, and outdoor circuits; Regulation 421.1.201 requiring a non-combustible
          consumer unit enclosure; and Regulation 443.4 requiring a risk assessment for SPD
          installation (almost always resulting in SPD being fitted).
        </p>
        <p>
          An Electrical Installation Certificate (EIC) must be issued upon completion, covering the
          design, construction, inspection, and testing of the entire new installation.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Bungalow Rewires',
    content: (
      <>
        <p>
          Bungalow rewires are among the most straightforward domestic rewire jobs. The loft access
          and single-storey layout make them quicker and more predictable than house rewires.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Loft Survey Is Key</h4>
                <p className="text-white text-sm leading-relaxed">
                  Always inspect the loft during your survey. Check headroom, insulation depth,
                  existing cable routes, and the condition of any existing wiring. Good loft access
                  makes the job profitable; poor access (low headroom, no boarding) slows you down.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certify on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink>{' '}
                  on your phone using Elec-Mate. Voice-entry for test results and PDF export before
                  you leave. Quote and invoice with the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote bungalow rewires accurately"
          description="Elec-Mate's quoting and certification tools help you price and certify bungalow rewires efficiently. 7-day free trial."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BungalowRewireCostPage() {
  return (
    <GuideTemplate
      title="Bungalow Rewire Cost 2026 | UK Price Guide"
      description="How much does it cost to rewire a bungalow in 2026? Complete UK price guide for two, three, and four-bedroom bungalow rewires. Covers materials, labour, timescales, and why bungalows are easier to rewire than houses."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Bungalow Rewire Cost: <span className="text-yellow-400">UK Price Guide 2026</span>
        </>
      }
      heroSubtitle="How much does it cost to rewire a bungalow? Bungalows are typically easier and cheaper to rewire than two-storey houses thanks to full loft access. This guide covers realistic 2026 pricing, what is included, and the factors that affect your quote."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Bungalow Rewire Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Bungalow Rewires with Real Trade Pricing"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for itemised quoting, on-site EIC certificates, and AI cost engineering. 7-day free trial, cancel anytime."
    />
  );
}
