import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Home,
  Zap,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Wrench,
  Plug,
  Cable,
  ClipboardCheck,
  Lightbulb,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'House Extension Electrical Cost', href: '/guides/house-extension-electrical-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'typical-costs', label: 'Typical Costs' },
  { id: 'first-fix', label: 'First Fix' },
  { id: 'second-fix', label: 'Second Fix and Testing' },
  { id: 'new-vs-extend', label: 'New Circuits vs Extending Existing' },
  { id: 'building-regs', label: 'Building Regulations' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A house extension electrical package typically costs £1,200 to £4,000, depending on the floor area, number of circuits, and whether a consumer unit upgrade is required.',
  'Electrical work is split into two phases: first fix (conduit, back boxes, and cables installed before plastering) and second fix (faceplates, testing, and certification after decoration).',
  'New circuits from the consumer unit are almost always preferable to extending existing ring finals — they provide better fault discrimination, cleaner documentation, and avoid overloading existing circuits.',
  'All new circuits in a house extension must be notified under Part P of the Building Regulations, either through a competent person scheme or via a building notice to local authority Building Control.',
  'Extensions that include a kitchen or utility room add significant cost: dedicated circuits for cooker, dishwasher, washing machine, and fridge/freezer are all required.',
];

const faqs = [
  {
    question: 'How much does house extension electrical work cost?',
    answer:
      'For a small single-storey rear extension (up to 15m²), the electrical package typically costs £1,200 to £2,000. This covers first-fix cable installation, a socket circuit, lighting circuit, and second-fix installation, testing, and Part P notification. A medium extension (15 to 30m²) costs £2,000 to £3,200, and a larger extension (30m²+) or one that includes a kitchen or utility room costs £3,000 to £4,000 or more. A consumer unit upgrade (if required) adds £400 to £800 to the package. The main cost drivers are floor area, number of circuits, whether a kitchen is included, and the distance from the consumer unit.',
  },
  {
    question: 'What is the difference between first fix and second fix electrical work?',
    answer:
      'First fix is all the electrical work carried out before plastering: installing back boxes (flush or surface), running cables through the walls, ceiling, and floor, and installing conduit where cables cannot be concealed in the structure. First-fix cables are left with tails for connection at second fix. Second fix is carried out after the plastering and decoration is complete: fitting faceplates (sockets, switches, light fittings), connecting back boxes, and carrying out the full test and inspection of all circuits. The split allows the builder to manage the programme — electricians go in twice rather than interrupting the build.',
  },
  {
    question: 'Should I use new circuits or extend existing circuits for a house extension?',
    answer:
      'New dedicated circuits from the consumer unit are almost always the correct choice for a house extension. Extending an existing ring final to supply a new room is technically permissible if the extended circuit still complies with BS 7671 (maximum ring floor area of 100m², maximum circuit current within the MCB rating after the extension). However, the practical arguments for new circuits are strong: the existing circuit load is not increased, fault discrimination is better, the EIC is simpler and cleaner, and the homeowner has dedicated circuit protection for the new rooms. Extending the existing lighting circuit to supply a single light in a small extension is acceptable and cost-effective — but new socket circuits are strongly recommended for any extension of meaningful size.',
  },
  {
    question: 'Does a house extension require Part P notification?',
    answer:
      'Yes. New circuits in a house extension are notifiable under Part P of the Building Regulations. This covers all new wiring from the consumer unit to the extension, whether the work is done in the original house fabric or in the new extension structure. The simplest route is to use an electrician registered with a competent person scheme (NICEIC, NAPIT, ELECSA) who can self-certify and issue the Part P certificate. If the electrician is not registered, a building notice must be submitted to the local authority before the electrical work begins.',
  },
  {
    question: 'Does a house extension need a consumer unit upgrade?',
    answer:
      'Not always. If the existing consumer unit has sufficient spare ways and is an 18th edition-compliant unit with RCD protection, the new extension circuits can be added without upgrading the board. If the board is full, is a pre-18th edition unit without RCD protection, or is a plastic consumer unit (which does not comply with the current non-combustible enclosure requirement), an upgrade is required. A new 18th edition metal consumer unit costs £400 to £800 to supply and install and is usually worth including in the extension quote as it upgrades the whole house protection.',
  },
  {
    question: 'What circuits are typically required in a house extension?',
    answer:
      'The circuits required depend on how the extension is used. A rear living room or dining room extension typically requires: a lighting circuit (or extension of the existing house lighting circuit), a ring final or radial socket circuit, and possibly a spur for a wall-mounted TV or electric fireplace. An open-plan kitchen-diner extension requires: dedicated circuits for a cooker or hob (6mm or 10mm cable on a 32A or 45A circuit), dishwasher, washing machine, a refrigeration spur, a ring final socket circuit for countertop appliances and sockets, an extractor fan spur, and lighting. An orangery or garden room extension with underfloor heating adds a dedicated heating circuit to the list.',
  },
  {
    question: 'How is voltage drop affected by long cable runs to a rear extension?',
    answer:
      'Long cable runs from a consumer unit at the front of a house to a rear extension can exceed the 3% voltage drop limit for final circuits if undersized cable is used. For a 20m run of 2.5mm twin and earth on a 32A socket circuit, the voltage drop is approximately 2.9V (1.3%) — within limit. However, if the same cable runs 30m or more, the voltage drop may become marginal, and uprating to 4.0mm is recommended. The voltage drop calculator should always be used on extension surveys where the cable run from the consumer unit to the furthest outlet in the extension exceeds 15m.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for extension circuits including long runs to rear and side extensions.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Check voltage drop on long cable runs from front-of-house consumer unit to rear extension.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates for extension circuits on site.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Price house extension electrical packages with first fix, second fix, and Part P notification.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/guides/garage-conversion-electrical-cost',
    title: 'Garage Conversion Electrical Cost',
    description: 'Similar guide for garage to habitable room conversion electrical work.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/loft-conversion-electrical-cost',
    title: 'Loft Conversion Electrical Cost',
    description: 'Electrical cost guide for loft conversions including consumer unit upgrades.',
    icon: Cable,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'House Extension Electrical Work: What Is Involved',
    content: (
      <>
        <p>
          A house extension — whether a single-storey rear addition, a side return, an orangery, or a
          two-storey extension — requires new electrical work that must be integrated with the existing
          installation and comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          and Part P of the Building Regulations.
        </p>
        <p>
          The electrical package is divided into first fix (pre-plaster) and second fix (post-plaster),
          with testing and certification carried out at second fix. The scope varies significantly based
          on the use of the extension: a simple living room extension has much simpler electrical
          requirements than an open-plan kitchen-diner extension.
        </p>
        <p>
          This guide covers typical costs, the first and second fix stages, when to use new circuits
          versus extending existing circuits, Building Regulations requirements, and how to quote
          extension electrical work professionally.
        </p>
      </>
    ),
  },
  {
    id: 'typical-costs',
    heading: 'Typical Costs for House Extension Electrical Work',
    content: (
      <>
        <p>
          Costs vary with floor area, room type, and number of circuits. Typical ranges:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small extension — living room or utility (up to 15m²)</strong> — £1,200 to
                £2,000. Lighting circuit, socket circuit, first-fix and second-fix labour, testing,
                and Part P notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium extension — open-plan living (15–30m²)</strong> — £2,000 to £3,000.
                Multiple circuits, potentially underfloor heating or bi-fold door lighting, more
                complex cable routing through existing structure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large extension — kitchen-diner or two-storey (30m²+)</strong> — £2,800 to
                £4,000+. Dedicated kitchen circuits (cooker, dishwasher, washing machine, fridge),
                lighting, sockets, extractor fan, potentially consumer unit upgrade.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Price house extension electrical packages accurately"
          description="Use Elec-Mate's quoting app to price extension electrical work with itemised first-fix and second-fix labour, materials by circuit, and Part P notification. Professional PDF quotes from your phone on the survey."
          icon={Home}
        />
      </>
    ),
  },
  {
    id: 'first-fix',
    heading: 'First Fix: Cables, Back Boxes, and Conduit',
    content: (
      <>
        <p>
          First fix is all electrical work carried out before the plasterer. The objective is to
          install all cables, conduit, and back boxes in their final positions so that nothing needs to
          be disturbed after plastering. Key first-fix tasks for an extension:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable routes from consumer unit</strong> — run new circuit cables from the
                consumer unit to the extension. Route through the original house structure (typically
                beneath floorboards on the ground floor, or through the loft on upper floors) before
                entering the extension. Protect cables where they pass through the wall at the
                boundary between original house and extension with a fire-stopping sleeve.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Back boxes</strong> — install flush metal back boxes in blockwork or timber
                stud walls before plasterboarding. Mark out socket, switch, and light switch
                positions with the architect/homeowner before fixing. Standard mounting heights:
                sockets at 450mm from finished floor level, switches at 1050mm.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ceiling cables</strong> — for downlight installations, run cables in the
                ceiling void above the plasterboard, dropping down at each downlight position. Mark
                out downlight positions before boarding. Pre-install downlight fire hoods in the
                ceiling void if the extension has insulation above.
              </span>
            </li>
          </ul>
        </div>
        <p>
          First fix is ideally carried out in one visit, co-ordinated with the builder. Returning
          multiple times for small first-fix elements is inefficient — agree the programme with the
          builder before pricing.
        </p>
      </>
    ),
  },
  {
    id: 'second-fix',
    heading: 'Second Fix: Faceplates, Testing, and Certification',
    content: (
      <>
        <p>
          Second fix is carried out after plastering and decoration. The cables that were left tailed
          at first fix are now connected and all accessories fitted. The second-fix sequence is:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Fit socket faceplates, switch plates, and connect wiring to terminals
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Install light fittings or downlights; connect to ceiling roses or junction boxes
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Connect circuit cables at the consumer unit and fit MCBs or RCBOs
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Test all new circuits: continuity of CPCs, insulation resistance (500V DC, minimum
                1 megohm), polarity, earth fault loop impedance, and RCD operation
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Complete and issue the{' '}
                <SEOInternalLink href="/tools/eic-certificate">
                  Electrical Installation Certificate
                </SEOInternalLink>{' '}
                and submit to the competent person scheme for Part P certification
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'new-vs-extend',
    heading: 'New Circuits vs Extending Existing Circuits',
    content: (
      <>
        <p>
          One of the most common decisions in extension electrical work is whether to run new circuits
          from the consumer unit or to extend existing circuits. The answer is nearly always: new
          circuits.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-2">Extending Existing Circuits</h3>
            <p className="text-white text-sm leading-relaxed">
              Technically permissible if the extended ring still complies (area under 100m², load
              within MCB rating, voltage drop within limits). However: the existing circuit is
              made more complex, fault-finding is harder, the EIC must reference the existing
              installation condition, and overloading risk increases if the extension adds
              significant load. Not recommended for kitchen or heating circuits.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-2">New Circuits (Recommended)</h3>
            <p className="text-white text-sm leading-relaxed">
              New circuits from the consumer unit provide clean fault discrimination, correct voltage
              drop design, and a simple EIC covering only the new work. The homeowner gets properly
              protected dedicated circuits, the documentation is straightforward, and the installation
              is future-proof. The extra cable cost is modest compared to the benefits.
            </p>
          </div>
        </div>
        <p>
          The exception where extending is acceptable: a single light point added to the existing
          house lighting circuit to illuminate a small lean-to or porch. In this case, extending the
          lighting circuit with a spur is cost-effective and appropriate.
        </p>
      </>
    ),
  },
  {
    id: 'building-regs',
    heading: 'Building Regulations: Part P Notification',
    content: (
      <>
        <p>
          All new circuits in a house extension are notifiable under Part P of the Building
          Regulations. The requirements:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme (preferred route)</strong> — NICEIC, NAPIT, or
                ELECSA-registered electricians can self-certify the work. The scheme issues the Part P
                certificate directly. No building notice required; the scheme notifies the local
                authority on behalf of the electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building notice (alternative route)</strong> — the homeowner or contractor
                submits a building notice to local authority Building Control before work begins.
                A Building Control officer inspects the completed work. Slower and more expensive
                than using a competent person scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation for sale</strong> — the Part P certificate must be provided
                to the homeowner and is required for the property sale conveyancing process. Without
                it, the extension electrical work is flagged as non-compliant by the buyer's
                solicitor. Electricians who do not issue Part P certificates create problems for
                their customers.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Winning Extension Electrical Work',
    content: (
      <>
        <p>
          House extensions are a reliable source of electrical work. Builders need a reliable
          electrical sub-contractor who understands the build programme and can hit first-fix and
          second-fix dates. Winning repeat business from builders is more valuable than winning
          individual homeowner quotes.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Survey Before Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Always visit the site before submitting a quote. Assess the consumer unit, the
                  cable route from the board to the extension, the floor construction, and the
                  builder's programme. A quote based on a visit wins more often than a quote based
                  on a phone conversation.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Check Voltage Drop on Survey</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  on the survey to check that the cable size is appropriate for the cable run length.
                  Specifying 4mm cable on a long socket circuit run during the quote avoids a
                  materials change once work has started.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify house extension electrical work on your phone"
          description="Join 430+ UK electricians using Elec-Mate for professional quoting, cable sizing, and on-site EIC certification for house extension projects. 7-day free trial."
          icon={Home}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ExtensionElectricalCostPage() {
  return (
    <GuideTemplate
      title="House Extension Electrical Cost UK | First Fix, Second Fix & Part P"
      description="How much does house extension electrical work cost in the UK? Typical costs £1,200–£4,000. Covers first fix, second fix, new circuits vs extending existing, consumer unit upgrades, and Part P Building Regulations."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          House Extension Electrical Cost:{' '}
          <span className="text-yellow-400">First Fix, Second Fix and Part P</span>
        </>
      }
      heroSubtitle="A house extension electrical package typically costs £1,200 to £4,000. This guide covers first and second fix stages, when to use new circuits versus extending existing rings, consumer unit considerations, and Part P notification."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About House Extension Electrical Work"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify Extension Electrical Work on Your Phone"
      ctaSubheading="Elec-Mate gives UK electricians professional quoting, cable sizing, and on-site EIC certification for house extension projects. 7-day free trial, cancel anytime."
    />
  );
}
