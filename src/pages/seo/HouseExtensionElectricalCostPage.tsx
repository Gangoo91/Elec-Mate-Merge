import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Home,
  Zap,
  AlertTriangle,
  ClipboardCheck,
  FileCheck2,
  Building2,
  Wrench,
  ShieldCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Cost Guides', href: '/guides/electrical-cost-guides' },
  { label: 'House Extension Electrical Cost', href: '/house-extension-electrical-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'single-storey-costs', label: 'Single-Storey Extension Costs' },
  { id: 'double-storey-costs', label: 'Double-Storey Extension Costs' },
  { id: 'consumer-unit-upgrade', label: 'Consumer Unit Upgrade' },
  { id: 'part-p-building-regs', label: 'Part P & Building Regulations' },
  { id: 'what-affects-cost', label: 'What Affects the Cost' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A single-storey house extension typically costs £800 to £2,500 for the electrical installation, covering lighting circuits, power circuits, and first-fix wiring through to second-fix and testing.',
  'A double-storey extension electrical installation typically costs £1,500 to £4,000, reflecting the additional circuits, cable runs, and labour required.',
  'If the existing consumer unit is full or outdated, an upgrade to a modern 18th Edition compliant consumer unit adds £400 to £700 to the project total.',
  'All notifiable electrical work in a house extension must comply with Part P of the Building Regulations. A registered competent person scheme electrician self-certifies the work — no separate building control application is required.',
  'The complexity of the extension design, the number of sockets and lighting points, underfloor heating, and the distance from the existing consumer unit all significantly affect the final cost.',
];

const faqs = [
  {
    question: 'How much does the electrical work cost for a house extension?',
    answer:
      'A single-storey house extension electrical installation typically costs £800 to £2,500. A double-storey extension costs £1,500 to £4,000. These prices cover first-fix wiring, second-fix installation of sockets, switches, and light fittings, testing, certification, and Part P notification. The exact cost depends on the size of the extension, the number of circuits, and whether a consumer unit upgrade is needed.',
  },
  {
    question: 'Do I need to upgrade my consumer unit for a house extension?',
    answer:
      'Not necessarily, but it is common. If the existing consumer unit is full (no spare ways available), is an older split-load board, or does not comply with current BS 7671 requirements (for example, it lacks RCD protection on all circuits), the electrician will recommend an upgrade. A new consumer unit costs £400 to £700 fitted. In many cases, the upgrade is the right time to bring the whole installation up to current standards.',
  },
  {
    question: 'Does house extension electrical work need Building Regulations approval?',
    answer:
      'Yes. Electrical work in a house extension is notifiable under Part P of the Building Regulations (England and Wales). If your electrician is registered with a competent person scheme such as NICEIC, NAPIT, or ELECSA, they can self-certify the work and notify building control on your behalf at no extra cost — you receive a Building Regulations Compliance Certificate. If the electrician is not registered, a separate application to building control is required, which adds cost and time.',
  },
  {
    question: 'What electrical work is included in a typical house extension quote?',
    answer:
      'A typical quote covers: first-fix wiring (laying cables before plastering), supply and installation of consumer unit ways or a new board, second-fix installation of sockets, switches, and light fittings, connection to existing circuits or new dedicated circuits, testing and inspection to BS 7671, an Electrical Installation Certificate (EIC), and Part P notification. Extras such as underfloor heating controls, bathroom extraction fans, outdoor sockets, and data points are usually priced separately.',
  },
  {
    question: 'How many sockets should a house extension have?',
    answer:
      'Building Regulations do not specify a minimum number of sockets, but the IET Wiring Regulations (BS 7671) recommend sufficient socket outlets to avoid the use of adaptors and extension leads. For a kitchen extension, current guidance (IET On-Site Guide) suggests a minimum of six double sockets in the kitchen area alone. For a living room or dining extension, four to six double sockets is typical. More is always better — retrofitting additional sockets after plastering is expensive.',
  },
  {
    question: 'Can I do the electrical work myself in my house extension?',
    answer:
      'Householders can carry out some notifiable electrical work themselves, but they must notify building control and arrange for an inspection and test by a qualified person before the work is covered. In practice, self-completion of extension wiring is rare — the work is complex, the materials cost is modest relative to labour, and errors can cause dangerous faults. Hiring a Part P registered electrician is strongly recommended.',
  },
  {
    question: 'How long does electrical work take in a house extension?',
    answer:
      'First-fix wiring for a single-storey extension typically takes one to two days. Second-fix (fitting sockets, switches, and light fittings once plastering is complete) takes a further half day to one day. Testing and certification adds a few hours. Total electrician time for a standard single-storey extension is typically two to three days spread across the build programme. A double-storey extension may require three to five days in total.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/loft-conversion-electrical-cost',
    title: 'Loft Conversion Electrical Cost',
    description: 'Typical costs for loft conversion electrical installations, consumer unit considerations, and Part P requirements.',
    icon: Home,
    category: 'Cost Guide',
  },
  {
    href: '/garage-electrical-cost',
    title: 'Garage Electrical Installation Cost',
    description: 'Detached and integral garage wiring costs, armoured cable, and EV charger add-ons.',
    icon: Building2,
    category: 'Cost Guide',
  },
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Cost',
    description: 'Full breakdown of consumer unit upgrade costs, fuseboard types, and what is included.',
    icon: Zap,
    category: 'Cost Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Create professional extension electrical quotes in minutes with Elec-Mate.',
    icon: FileCheck2,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'House Extension Electrical Installation — What to Expect',
    content: (
      <>
        <p>
          Adding an extension to your home is one of the most significant investments a homeowner
          can make. Electrical installation is a critical part of the build and must be planned
          from the start — not bolted on as an afterthought. The cost varies considerably depending
          on the size of the extension, the number of circuits required, and whether work is needed
          to the existing installation.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single-storey extension</strong> — £800 to £2,500 for a complete electrical
                installation. Covers first-fix and second-fix wiring, sockets, lighting, and
                certification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Double-storey extension</strong> — £1,500 to £4,000. Greater cable
                quantities, more circuits, and more complex routing through floors and ceilings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit upgrade (if required)</strong> — £400 to £700 extra. Often
                needed when the existing board is full or does not meet current{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>{' '}
                requirements.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All electrical work in a house extension is notifiable under Part P of the Building
          Regulations. Using a registered competent person scheme electrician means they self-certify
          the work — you receive a compliance certificate without a separate building control
          application.
        </p>
      </>
    ),
  },
  {
    id: 'single-storey-costs',
    heading: 'Single-Storey Extension Electrical Costs',
    content: (
      <>
        <p>
          A single-storey rear or side extension is the most common type in the UK. The electrical
          installation typically involves one or two new lighting circuits and one or two new ring
          main or radial power circuits, teed off the existing installation at the consumer unit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small kitchen extension (up to 20m²)</strong> — £800 to £1,400. Typically
                one lighting circuit, one ring main, and an oven/hob spur. Additional sockets and
                extraction fan included.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open-plan kitchen-diner (20–40m²)</strong> — £1,200 to £2,000. More socket
                outlets required, bi-fold door low-voltage lighting, underfloor heating connections,
                and USB outlets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large open-plan extension (over 40m²)</strong> — £1,800 to £2,500. Multiple
                circuits, feature lighting zones, smart switch wiring, data points, and a security
                alarm zone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Orangery or glazed extension</strong> — add £300 to £600 for additional
                weatherproof exterior socket outlets, step lighting, and roof light controls.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These prices assume the consumer unit has spare ways available and that cable runs from
          the board to the extension are straightforward. Difficult routing through existing
          structure or over long distances adds cost.
        </p>
      </>
    ),
  },
  {
    id: 'double-storey-costs',
    heading: 'Double-Storey Extension Electrical Costs',
    content: (
      <>
        <p>
          A double-storey extension adds a ground floor room and a first floor room — most commonly
          a kitchen or living room below and a bedroom or bathroom above. The electrical installation
          is proportionally more complex, with circuits serving both floors and bathroom requirements
          adding to the scope.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard double-storey extension</strong> — £1,500 to £2,500. Two floors,
                two lighting circuits, two power circuits, plus bathroom zone compliance (Regulation
                701 of BS 7671 — no socket outlets within 3 metres of the bath or shower).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>With en-suite bathroom</strong> — £2,000 to £3,200. En-suite requires
                shaver socket (IP44 rated), bathroom extraction fan with overrun timer, and
                electric towel rail connection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large double-storey extension with multiple rooms</strong> — £2,500 to
                £4,000. Multiple bedrooms, bathrooms, home office circuits, data cabling, and
                integrated smart home wiring.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Bathroom zones under BS 7671 Regulation 701 require careful planning. Zone 1 (inside
          the bath or shower tray) and Zone 2 (within 0.6 metres of the bath or shower) restrict
          what electrical equipment can be installed and require appropriate IP ratings.
        </p>
      </>
    ),
  },
  {
    id: 'consumer-unit-upgrade',
    heading: 'Consumer Unit Upgrade — When Is It Needed?',
    content: (
      <>
        <p>
          A house extension often requires one or more new circuits to be added to the existing
          consumer unit. If the board is full, too old, or does not comply with current regulations,
          an upgrade is the correct approach.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No spare ways</strong> — if all MCB slots are occupied, a new or larger
                consumer unit is required. Cost: £400 to £700 fitted, including a new 18th Edition
                compliant unit with dual RCD or RCBO protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Old fuseboard</strong> — rewirable fuse boards or early MCB boards without
                RCD protection are technically non-compliant. An extension is a good trigger to
                upgrade the whole board to current standards at the same time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection</strong> — Regulation 411.3.3 of BS 7671 requires 30mA
                RCD protection on all socket circuits rated up to 32A. Older boards without RCDs
                will require either RCBO protection on each circuit or a full upgrade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Steel enclosure requirement</strong> — since Amendment 3 to BS 7671
                (January 2019), new and replacement consumer units in domestic premises must have
                a non-combustible (steel) enclosure. Plastic consumer units installed before this
                date remain legal but cannot be replaced like-for-like with plastic.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'part-p-building-regs',
    heading: 'Part P of the Building Regulations',
    content: (
      <>
        <p>
          Part P of the Building Regulations (England and Wales) covers the design, installation,
          inspection, testing, and certification of electrical installations in dwellings. All
          work on a house extension falls within the scope of Part P and is notifiable.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person self-certification</strong> — electricians registered with
                NICEIC, NAPIT, ELECSA, or another government-approved scheme can self-certify
                their work under Part P. They notify building control, and you receive a Building
                Regulations Compliance Certificate within 30 days. No extra fee to you.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate (EIC)</strong> — on completion, the
                electrician must issue an{' '}
                <SEOInternalLink href="/tools/eic-certificate">
                  Electrical Installation Certificate
                </SEOInternalLink>{' '}
                documenting the design, construction, and test results of the new installation.
                Keep this document — it will be requested by solicitors when you sell the property.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building control route</strong> — if the electrician is not Part P
                registered, you can apply to building control directly. A building control
                inspector will visit to check the work. This route is slower and more expensive
                and is rarely necessary if you hire a registered electrician.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Failure to comply with Part P can create problems when selling your home. Solicitors
          routinely request Part P certificates or building control sign-off for extension work
          carried out after 2005 when the regulations came into force.
        </p>
      </>
    ),
  },
  {
    id: 'what-affects-cost',
    heading: 'What Affects the Cost of House Extension Electrical Work?',
    content: (
      <>
        <p>
          Extension electrical costs are rarely a fixed price — the following factors all affect
          what you will pay.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Number of circuits</strong> — each new circuit (lighting, sockets, oven,
                hob, underfloor heating, EV charger) adds to the cost. A simple kitchen extension
                may need three circuits; a large open-plan extension with home cinema might need
                ten or more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distance from consumer unit</strong> — the further the extension from the
                main board, the more cable is required. Long cable runs also affect volt drop
                calculations (Regulation 525 of BS 7671) which may require a larger cable size.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specification level</strong> — basic white plastic sockets and switches
                cost far less than flat plate brushed steel or smart home controls. Wiring for
                smart home systems (Lutron, KNX, Loxone) adds significant cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underfloor heating</strong> — electric underfloor heating requires a
                dedicated circuit and thermostat. Wet underfloor heating requires only a boiler
                connection but may still need a dedicated electrical circuit for the pump and
                controls.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Region</strong> — London and the South East attract labour rates 20 to 40
                per cent higher than the Midlands and North. Rural areas may also attract travel
                time charges.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting and Winning Extension Electrical Work',
    content: (
      <>
        <p>
          House extension electrical work is one of the most profitable sectors for self-employed
          electricians and small electrical contractors. Jobs are typically multi-day, require
          multiple visits (first fix, second fix, testing), and often lead to additional works such
          as consumer unit upgrades and EV charger installations.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Issue the EIC on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Elec-Mate EIC app
                  </SEOInternalLink>{' '}
                  to complete and issue the Electrical Installation Certificate while still on site.
                  The customer gets their document immediately, and you avoid evening paperwork.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Additional Works</h4>
                <p className="text-white text-sm leading-relaxed">
                  At the first-fix stage, you can see exactly what the consumer unit situation is.
                  Quote the upgrade immediately using the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  — customers almost always accept when the need is clearly explained on site.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Win more extension electrical work with Elec-Mate"
          description="Create professional extension electrical quotes, issue EICs on site, and track multi-stage jobs across first fix, second fix, and testing. Join 430+ UK electricians. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HouseExtensionElectricalCostPage() {
  return (
    <GuideTemplate
      title="House Extension Electrical Cost UK 2025 | Extension Wiring Prices"
      description="House extension electrical installation costs in the UK for 2025. Single-storey extension £800–£2,500, double-storey £1,500–£4,000, consumer unit upgrade £400–£700. Part P, Building Regulations, and what affects the price."
      datePublished="2025-01-01"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          House Extension Electrical Cost UK 2025:{' '}
          <span className="text-yellow-400">Extension Wiring Prices</span>
        </>
      }
      heroSubtitle="Detailed breakdown of house extension electrical installation costs in the UK for 2025 — single-storey from £800, double-storey from £1,500, consumer unit upgrades, Part P compliance, and all the factors that affect your final price."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About House Extension Electrical Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Your Extension Electrical Work in Minutes"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to create professional electrical quotes, issue EICs on site, and manage multi-stage extension jobs. 7-day free trial, cancel anytime."
    />
  );
}
