import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Plug,
  Home,
  Zap,
  Car,
  Lightbulb,
  TreePine,
  Calculator,
  FileCheck2,
  ShieldCheck,
  Receipt,
  ClipboardCheck,
  GraduationCap,
  Brain,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/starting-electrical-business-uk' },
  { label: 'Pricing Guide', href: '/guides/electrical-work-pricing-guide' },
];

const tocItems = [
  { id: 'overview', label: 'Pricing Overview' },
  { id: 'socket-installation', label: 'Socket Installation' },
  { id: 'consumer-unit-change', label: 'Consumer Unit Change' },
  { id: 'full-rewire', label: 'Full House Rewire' },
  { id: 'ev-charger', label: 'EV Charger Installation' },
  { id: 'lighting', label: 'Lighting Installation' },
  { id: 'garden-electrics', label: 'Garden and Outdoor Electrics' },
  { id: 'other-common-jobs', label: 'Other Common Jobs' },
  { id: 'pricing-factors', label: 'What Affects the Price' },
  { id: 'for-electricians', label: 'For Electricians: How to Price Jobs' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Socket installation costs between £80 and £200 per socket depending on whether it is a new circuit or an addition to an existing ring.',
  'A consumer unit upgrade (fuse box change) typically costs £500 to £900 including materials, labour, and the required Electrical Installation Certificate.',
  'A full house rewire costs £3,000 to £6,000 for a 3-bedroom house, plus making good (plastering and decorating) which can add 30 to 50 percent on top.',
  'EV charger installation ranges from £800 to £1,500 including the charger unit, cabling, earthing, and the required notification to Building Control.',
  'Elec-Mate helps electricians price jobs accurately with its AI-powered cost engineer, which calculates materials, labour, margin, and generates professional quotes on site.',
];

const faqs = [
  {
    question: 'How much does it cost to add a new socket in the UK?',
    answer:
      'Adding a single new socket to an existing ring circuit typically costs between £80 and £150. This includes the socket, back box, cable, and labour. If the socket requires a new radial circuit from the consumer unit (for example, in a kitchen for an appliance above 13A, or in an extension), expect to pay £150 to £250 as a new circuit breaker, cable run, and Minor Works Certificate or EIC are required. Double sockets cost roughly the same as single sockets to install — the additional cost of the faceplate is minimal. If the electrician needs to chase cables into walls and make good afterwards, add £50 to £100 for plastering. USB sockets with integrated chargers are slightly more expensive for the faceplate (typically £10 to £20 more than a standard socket) but the installation cost is the same. Outdoor sockets require IP-rated fittings and RCD protection, adding £30 to £50 to the materials cost.',
  },
  {
    question: 'How much does a full house rewire cost in 2026?',
    answer:
      'A full rewire for a typical 3-bedroom semi-detached house in the UK costs between £3,000 and £6,000 for the electrical work alone. This includes stripping out all existing wiring, installing new cables, a new consumer unit, new sockets, switches, and light fittings, and all testing and certification. The price varies significantly based on the size of the property, the number of circuits, accessibility (solid walls vs stud walls, floor void access), and your location (London and the South East are typically 20 to 30 percent more expensive than the North). The figure does not include making good — plastering, painting, and decorating after the rewire — which can add 30 to 50 percent to the total cost. A 2-bedroom flat might cost £2,000 to £3,500 for the electrical work, while a 4 or 5-bedroom detached house could be £5,000 to £10,000 or more. Always get at least three quotes and make sure each quote specifies exactly what is included.',
  },
  {
    question: 'How much does an EV charger installation cost?',
    answer:
      'EV charger installation in the UK typically costs between £800 and £1,500 as a complete package including the charger unit, installation, cabling, earthing, and Building Control notification. The charger unit itself (a 7kW Type 2 tethered or untethered unit from brands like Ohme, Easee, Zappi, or Pod Point) costs £300 to £700 depending on the model and features. Installation labour is typically £300 to £600, covering the cable run from the consumer unit to the charge point location, a dedicated circuit with appropriate MCB or RCBO, earthing to BS 7671 requirements, and the electrical certification. If your consumer unit does not have a spare way or needs upgrading, add £300 to £500. Long cable runs (more than 15 metres) or complex routing through multiple walls can increase the cost. The OZEV (Office for Zero Emission Vehicles) grant for landlords and tenants can provide up to £350 towards the installation cost, though the homeowner grant scheme ended in March 2024.',
  },
  {
    question: 'Should I get multiple quotes for electrical work?',
    answer:
      'Yes, always get at least three quotes for any significant electrical work. This allows you to compare not just prices but also what each electrician includes in their quote. A good quote should itemise materials, labour, and certification costs separately. It should specify the scope of work clearly — for example, "supply and install 8 new double sockets on 2 new radial circuits" rather than just "install sockets." Check that the quote includes all testing, certification (EIC or Minor Works Certificate), and Building Control notification where required. Be wary of quotes that are significantly cheaper than the others — the electrician may be cutting corners, using cheaper materials, or not including certification. Equally, the most expensive quote is not automatically the best. Ask each electrician about their qualifications, scheme registration (NICEIC, NAPIT, ELECSA), and insurance. Request references from recent similar jobs.',
  },
  {
    question: 'Do electricians charge VAT on domestic work?',
    answer:
      'Whether an electrician charges VAT depends on their business turnover. In the UK, businesses with annual taxable turnover below £90,000 (the 2024/25 threshold) are not required to register for VAT and do not charge it. Many sole-trader electricians fall below this threshold and their prices are VAT-free. Larger electrical firms and electricians with higher turnover will be VAT-registered and must charge VAT at 20 percent on top of their quoted price. When comparing quotes, check whether the price includes or excludes VAT. A quote of £500 plus VAT is actually £600 — which may be more expensive than a non-VAT-registered electrician quoting £550 all-inclusive. For new build properties, electrical work may qualify for zero-rated VAT. For renovation work on properties that have been empty for more than 2 years, a reduced 5 percent VAT rate may apply. Your electrician or their accountant should advise on the applicable rate.',
  },
  {
    question: 'What is included in the price of a consumer unit upgrade?',
    answer:
      'A consumer unit upgrade (fuse box change) typically includes: the consumer unit itself (a metal enclosure meeting BS EN 61439-3 and the amendment 3 requirements of BS 7671), all MCBs and RCBOs rated to match the existing circuits, main switch, connection to existing meter tails, re-termination of all existing circuits into the new board, full testing (including continuity, insulation resistance, polarity, earth fault loop impedance, prospective fault current, and RCD testing), an Electrical Installation Certificate (EIC), and notification to Building Control through the electrician competent person scheme. The total typically ranges from £500 to £900 depending on the number of circuits, the type of board (split-load vs fully RCBO-populated), and your location. It does not usually include remedial work on existing circuits — if the electrician discovers faults during testing, these will be priced separately.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/how-to-price-electrical-jobs',
    title: 'How to Price Electrical Jobs',
    description:
      'Detailed guide for electricians on calculating labour rates, materials markup, overhead, and profit margins.',
    icon: Calculator,
    category: 'Business',
  },
  {
    href: '/guides/consumer-unit-change-cost-uk',
    title: 'Consumer Unit Change Cost',
    description:
      'Detailed breakdown of consumer unit replacement costs, board types, and what the price should include.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/house-rewire-guide',
    title: 'House Rewire Guide',
    description:
      'Complete guide to full and partial rewires, including when a rewire is needed and what to expect.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/ev-charger-installation-guide',
    title: 'EV Charger Installation',
    description:
      'Full guide to EV charger installation including regulations, cable sizing, earthing, and certification.',
    icon: Car,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-find-electrician-uk',
    title: 'Finding a Good Electrician',
    description:
      'What to check, questions to ask, and red flags to watch for when hiring an electrician in the UK.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/starting-electrical-business-uk',
    title: 'Starting an Electrical Business',
    description:
      'Complete guide to setting up as a self-employed electrician, from scheme registration to pricing strategy.',
    icon: GraduationCap,
    category: 'Business',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Electrical Work Pricing: What Should You Pay in 2026?',
    content: (
      <>
        <p>
          Whether you are a homeowner planning electrical work or an electrician setting your rates,
          understanding what electrical jobs cost in the UK in 2026 is essential. Prices have risen
          steadily over the past few years due to increased material costs (copper cable prices have
          risen significantly since 2022), higher certification requirements under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          , and growing demand for EV charger installations and smart home systems.
        </p>
        <p>
          This guide provides realistic price ranges for the most common electrical jobs in the UK.
          All prices are based on 2026 market rates and assume a qualified, scheme-registered
          electrician. Prices include materials, labour, testing, and certification unless stated
          otherwise. Regional variations apply — London and the South East are typically 20 to 30
          percent above the national average, while the North of England, Wales, and Scotland tend
          to be at or slightly below it.
        </p>
        <p>
          For electricians, this guide also explains how to price jobs profitably using the
          Elec-Mate{' '}
          <SEOInternalLink href="/guides/how-to-price-electrical-jobs">
            AI cost engineer
          </SEOInternalLink>
          , which calculates materials, labour, overhead, and margin automatically.
        </p>
      </>
    ),
  },
  {
    id: 'socket-installation',
    heading: 'Socket Installation Costs',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Add socket to existing ring circuit:</strong> £80 to £150 per socket. This
                is a spur off an existing ring, using a fused connection unit or direct spur. A
                Minor Works Certificate is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New socket on a new radial circuit:</strong> £150 to £250 per socket. A new
                circuit from the consumer unit, requiring a spare MCB way, full cable run, testing,
                and an EIC or Minor Works Certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outdoor waterproof socket:</strong> £150 to £250. Requires an IP66-rated
                socket, RCD protection, and weather-resistant cabling. Building Control notification
                may apply if it is a new circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replace existing socket faceplate:</strong> £40 to £80 per socket. A
                straightforward swap of the faceplate (single to double, standard to USB) with no
                cable changes.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If the electrician needs to chase cables into solid walls (brick or block), add £50 to
          £100 per socket for the additional labour and making good. Surface-mounted cable in
          trunking is quicker and cheaper but less aesthetically pleasing.
        </p>
      </>
    ),
  },
  {
    id: 'consumer-unit-change',
    heading: 'Consumer Unit Change (Fuse Box Upgrade)',
    content: (
      <>
        <p>
          A{' '}
          <SEOInternalLink href="/guides/consumer-unit-change-cost-uk">
            consumer unit upgrade
          </SEOInternalLink>{' '}
          is one of the most commonly quoted electrical jobs. Older properties with rewirable fuse
          boxes, plastic consumer units, or boards without RCD protection need upgrading to meet
          current regulations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Split-load consumer unit (dual RCD):</strong> £500 to £700. A metal consumer
                unit with two RCDs protecting separate banks of MCBs. Cost-effective but a single
                RCD trip can affect multiple circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fully RCBO-populated consumer unit:</strong> £700 to £900. Each circuit has
                its own RCBO, providing both overcurrent and earth leakage protection independently.
                A fault on one circuit does not affect any other. This is the recommended option.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit with AFDD protection:</strong> £900 to £1,300. Includes Arc
                Fault Detection Devices as recommended by{' '}
                <SEOInternalLink href="/guides/afdd-guide-bs7671">
                  BS 7671 regulation 421.1.7
                </SEOInternalLink>
                . AFDDs detect dangerous arc faults that MCBs and RCDs cannot.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All consumer unit replacements require an Electrical Installation Certificate (EIC) and
          notification to Building Control — either directly or through the electrician's competent
          person scheme (NICEIC, NAPIT, or ELECSA). The price above should include testing,
          certification, and notification.
        </p>
      </>
    ),
  },
  {
    id: 'full-rewire',
    heading: 'Full House Rewire Costs',
    content: (
      <>
        <p>
          A full <SEOInternalLink href="/guides/house-rewire-guide">house rewire</SEOInternalLink>{' '}
          is the most disruptive and expensive common electrical job. It involves stripping out all
          existing wiring and replacing it with new cables, a new consumer unit, and all new
          accessories.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1-bedroom flat:</strong> £2,000 to £3,500. Typically 4 to 6 circuits.
                Usually completed in 2 to 3 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2-bedroom house:</strong> £2,500 to £4,500. Typically 6 to 10 circuits.
                Usually completed in 3 to 4 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3-bedroom semi-detached:</strong> £3,000 to £6,000. Typically 8 to 14
                circuits. Usually completed in 4 to 6 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4-5 bedroom detached:</strong> £5,000 to £10,000. Typically 12 to 20+
                circuits. Usually completed in 5 to 8 days.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices are for the electrical work only. Making good (plastering, filling, painting)
          can add 30 to 50 percent to the total cost. Some electricians will arrange the making good
          for you; others leave it to the homeowner. Discuss this before work starts.
        </p>
        <SEOAppBridge
          title="Price rewires accurately with the AI cost engineer"
          description="Elec-Mate's AI cost engineer calculates materials, cable quantities, labour hours, and profit margin for any rewire. Generate a professional, itemised quote on site in minutes — not hours at your desk."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'ev-charger',
    heading: 'EV Charger Installation Costs',
    content: (
      <>
        <p>
          EV charger installation is one of the fastest-growing areas of domestic electrical work.
          Most home installations use a 7kW single-phase charger on a dedicated circuit from the
          consumer unit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>7kW home charger (supply and install):</strong> £800 to £1,500. Includes the
                charger unit, dedicated 32A circuit, cable run to the charge point, earthing to{' '}
                <SEOInternalLink href="/guides/ev-charger-installation-guide">
                  BS 7671 requirements
                </SEOInternalLink>
                , and Building Control notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>22kW three-phase charger:</strong> £1,500 to £3,000. Requires a three-phase
                supply (not available in most domestic properties). Common for commercial
                installations and rapid charging.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit upgrade (if needed):</strong> Add £500 to £900. If the
                existing consumer unit does not have a spare way or is too old to accept a new
                circuit safely, an upgrade is required.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Factors that increase the cost include long cable runs (more than 15 metres), routing
          through multiple walls, the need for SWA (Steel Wire Armoured) cable for external runs,
          and earthing upgrades. Always check that the electrician holds the{' '}
          <SEOInternalLink href="/guides/ev-charger-installation-guide">
            relevant EV charger installation qualification
          </SEOInternalLink>{' '}
          and is registered with a competent person scheme.
        </p>
      </>
    ),
  },
  {
    id: 'lighting',
    heading: 'Lighting Installation Costs',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Replace light fitting (like-for-like):</strong> £40 to £80 per fitting.
                Swapping an existing ceiling rose or light fitting for a new one with no wiring
                changes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Install downlights (per room):</strong> £200 to £500 per room. Includes 4 to
                8 LED downlights, cabling, and a compatible dimmer switch. Fire-rated downlights are
                required in most domestic situations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outdoor security lighting:</strong> £100 to £250 per light. Includes a
                PIR-activated LED floodlight or wall light, cabling, and a suitable connection
                (fused spur or dedicated circuit depending on load).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>LED strip lighting (kitchen or bathroom):</strong> £150 to £400.
                Under-cabinet LED strips, driver, dimmer, and cabling. Bathroom lighting must comply
                with IP ratings for the relevant zone.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When adding new lighting circuits (for example, converting a room from a single pendant to
          multiple downlights on a new circuit), the work is notifiable under Part P of the Building
          Regulations if it involves a new circuit in a kitchen, bathroom, or outdoors. The
          electrician must issue the appropriate certificate and notify Building Control.
        </p>
      </>
    ),
  },
  {
    id: 'garden-electrics',
    heading: 'Garden and Outdoor Electrics',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TreePine className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Garden lighting circuit:</strong> £300 to £700. Includes SWA cable, posts or
                spike lights, a transformer for low-voltage systems, and connection to the consumer
                unit with RCD protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TreePine className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outdoor socket (waterproof):</strong> £150 to £250. IP66-rated socket on a
                dedicated RCD-protected circuit. Essential for garden tools, pressure washers, and
                hot tubs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TreePine className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Garage or shed supply:</strong> £400 to £800. Includes an SWA cable run from
                the house, a small consumer unit in the outbuilding, lighting, and socket circuits.
                The outbuilding needs its own earth electrode or connection to the main earthing
                system depending on the supply arrangement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TreePine className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hot tub supply:</strong> £300 to £600. Requires a dedicated circuit (usually
                32A or 40A depending on the tub), an RCD, and an isolator switch within sight of the
                tub. SWA cable for outdoor runs.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All outdoor electrical work is notifiable under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations-explained">
            Part P of the Building Regulations
          </SEOInternalLink>
          . This means the electrician must be registered with a competent person scheme to
          self-certify the work, or the work must be inspected by Building Control. Always check
          that the electrician can issue the necessary certification.
        </p>
      </>
    ),
  },
  {
    id: 'other-common-jobs',
    heading: 'Other Common Electrical Jobs and Costs',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR (Electrical Installation Condition Report):</strong> £120 to £350
                depending on property size.{' '}
                <SEOInternalLink href="/guides/eicr-cost-uk">
                  Required every 5 years for rented properties
                </SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smoke and heat alarm installation:</strong> £50 to £100 per alarm for
                mains-wired, interlinked alarms. Required in all rented properties under the Smoke
                and Carbon Monoxide Alarm (Amendment) Regulations 2022.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cooker circuit installation:</strong> £200 to £400. A dedicated 32A or 40A
                circuit with appropriate cable size, a cooker switch (with or without socket), and
                an EIC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shower circuit installation:</strong> £250 to £500. Electric showers
                typically require a dedicated 40A or 45A circuit depending on the kW rating. Cable
                sizing must account for the continuous load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault finding (diagnostic callout):</strong> £80 to £150 per hour. Tracing
                and diagnosing electrical faults — tripping circuits, intermittent problems, power
                loss. The first hour typically covers diagnosis; remedial work is priced separately.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pricing-factors',
    heading: 'What Affects the Price of Electrical Work',
    content: (
      <>
        <p>Understanding why prices vary helps you evaluate quotes fairly. The main factors are:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Location.</strong> London and the South East are 20 to 30 percent more
                expensive than the national average. This reflects higher overheads, travel costs,
                and demand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Property type and access.</strong> Solid-walled Victorian and Edwardian
                properties are harder to cable than modern stud-wall construction. Limited floor
                void access and high ceilings add time and cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Materials quality.</strong> Branded consumer units (Hager, Schneider) cost
                more than budget boards but offer better reliability and warranty. Cable prices
                fluctuate with copper commodity prices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification requirements.</strong> Work that requires Building Control
                notification (new circuits in kitchens, bathrooms, outdoors) adds certification
                costs and administrative time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Making good.</strong> Whether the price includes plastering, filling, and
                decorating after cable installation varies between electricians. Always confirm.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Price Jobs Accurately with Elec-Mate',
    content: (
      <>
        <p>
          Pricing electrical work is one of the hardest parts of running an electrical business.
          Price too high and you lose the job. Price too low and you lose money. The Elec-Mate AI
          cost engineer takes the guesswork out of pricing by calculating every element:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Materials Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Enter the job scope and Elec-Mate calculates exact material quantities — cable
                  lengths, consumer unit, MCBs, accessories, fixings — all priced at current trade
                  rates with your preferred suppliers.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Receipt className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Quote Generator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Generate a professional, itemised quote that you can send to the customer by email
                  or WhatsApp directly from the app. No going home to type it up. No spreadsheet. No
                  guessing.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Stop guessing, start pricing accurately"
          description="Elec-Mate's AI cost engineer calculates materials, labour, overhead, and margin for any electrical job. Generate professional quotes on site in minutes. 7-day free trial."
          icon={PoundSterling}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalWorkPricingPage() {
  return (
    <GuideTemplate
      title="Electrical Work Pricing Guide | Jobs & Costs UK 2026"
      description="Complete guide to UK electrical work prices in 2026. Socket installation, consumer unit change, full rewire, EV charger, lighting, garden electrics — all with realistic price ranges and what affects the cost."
      datePublished="2026-01-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Pricing Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Electrical Work Pricing:{' '}
          <span className="text-yellow-400">What Every Job Costs in 2026</span>
        </>
      }
      heroSubtitle="From a single socket to a full house rewire, this guide covers what every common electrical job costs in the UK in 2026. Realistic price ranges based on current market rates, with a breakdown of what is included and what affects the price."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Work Pricing"
      relatedPages={relatedPages}
      ctaHeading="Price Every Job Accurately with Elec-Mate"
      ctaSubheading="AI-powered cost engineer calculates materials, labour, and margin for any electrical job. Generate professional quotes on site. 7-day free trial, cancel anytime."
    />
  );
}
