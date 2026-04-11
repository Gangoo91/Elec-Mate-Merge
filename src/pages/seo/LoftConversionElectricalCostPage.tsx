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
  Lightbulb,
  Plug,
  Cable,
  ClipboardCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Loft Conversion Electrical Cost', href: '/guides/loft-conversion-electrical-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'typical-costs', label: 'Typical Costs' },
  { id: 'consumer-unit', label: 'Consumer Unit Upgrade' },
  { id: 'circuits', label: 'Circuits Required' },
  { id: 'cable-routes', label: 'Cable Routes by Loft Type' },
  { id: 'fire-detection', label: 'Fire Detection and Emergency Lighting' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A loft conversion electrical package typically costs £1,800 to £5,000, depending on loft type, consumer unit upgrade, and the number and type of new circuits.',
  'A consumer unit upgrade is frequently required because the existing board lacks sufficient spare ways to accommodate new loft circuits, particularly when adding heating, lighting, and socket circuits simultaneously.',
  'A mains-powered, battery-backed smoke alarm must be installed on the new loft landing, interlinked with existing house alarms, as part of the fire safety requirements for the escape route.',
  'Cable routing varies significantly by loft type: a dormer loft with stud walls is straightforward; a hip-to-gable or mansard loft may require long cable runs hidden in new structural timbers.',
  'All new loft circuits must be notified under Part P of the Building Regulations, either through a competent person scheme or via a building notice to local authority Building Control.',
];

const faqs = [
  {
    question: 'How much does loft conversion electrical work cost?',
    answer:
      'For a standard loft conversion to a single bedroom with en-suite, the electrical package typically costs £1,800 to £3,500. This includes new circuits for lighting, sockets, and heating from the existing or upgraded consumer unit; smoke alarm installation; testing and certification; and Part P notification. Costs rise to £3,500 to £5,000 where a consumer unit upgrade is required, where the loft has a large floor area (over 25m²), or where additional circuits are needed for a home office setup, en-suite extraction, or electric underfloor heating. A double loft conversion or a full mansard may cost £4,000 to £7,000 for the electrical package.',
  },
  {
    question: 'Does a loft conversion require a consumer unit upgrade?',
    answer:
      'Often yes. A loft conversion typically adds 2 to 4 new circuits (lighting, sockets, heating, extractor fan) to the consumer unit. If the existing board is full or lacks RCD protection on the relevant circuits, an upgrade is required. Pre-18th edition consumer units without whole-board RCD protection are common in properties built before 2008, and adding new loft circuits to such a board without upgrading is not best practice. A new 18th edition consumer unit (typically 18-way split-load with dual RCD or RCBO protection) costs £400 to £800 to supply and install and provides the correct protection for all new circuits.',
  },
  {
    question: 'What smoke detection is required in a loft conversion?',
    answer:
      'Building Regulations Part B requires that a loft conversion includes mains-powered, battery-backed smoke alarms in the new room and on the landing of each floor below the loft, interlinked so that all alarms sound together. The system must meet Grade D of BS 5839-6 as a minimum. For a loft that forms the top storey of a two-storey house, this means: one smoke alarm in the new loft room (or on the loft landing), one on the first floor landing, and one on the ground floor hall — all interlinked. Electricians should note that the smoke alarm wiring forms part of the notifiable electrical works and is included in the EIC.',
  },
  {
    question: 'How does the loft type affect cable routing?',
    answer:
      'Cable routing complexity varies significantly by loft conversion type. A dormer loft conversion has new stud walls and a flat ceiling section where cables can be run in standard positions within the wall and ceiling cavities — straightforward first-fix work similar to a ground floor extension. A roof light (Velux) loft conversion retains the original roof slope and requires cables to be run along the rafters to lighting positions, which may require surface mounting or careful concealment. A hip-to-gable conversion adds new gable walls, and cables can be routed through the new structure during the building work. A mansard conversion is essentially a new floor added to the building, with the most flexibility for cable routing during construction. In all cases, cables in ceiling and wall voids must be installed in safe zones (within 150mm of a corner or behind a wall face to BS 7671 requirements) or protected by mechanical protection.',
  },
  {
    question: 'Is emergency lighting required in a loft conversion?',
    answer:
      'For a domestic loft conversion used as a bedroom or home office, emergency lighting is not required by BS 5266 — that standard applies to commercial and public buildings. However, the Building Regulations fire safety requirements (Part B) do require that the escape route from the loft is adequately protected. This is typically achieved through smoke detection on each floor landing, fire doors on rooms opening onto the escape stair, and adequate borrowed light from windows or skylights. For a loft used as a commercial space (home studio, consulting room), emergency lighting may be required under BS 5266 — check with the Building Control officer.',
  },
  {
    question: 'What electrical certificates are required for a loft conversion?',
    answer:
      'An Electrical Installation Certificate (EIC) must be issued for all new circuits in the loft conversion. The EIC covers all new wiring, the smoke alarm circuit, and any consumer unit modification. If the consumer unit is upgraded, the upgrade is also covered by the EIC. The EIC is the Part P compliance document — it is submitted to the competent person scheme (NICEIC, NAPIT, or similar) who then issue the Part P certificate to the homeowner. The homeowner must keep the EIC and Part P certificate with the property documentation.',
  },
  {
    question: 'Can loft conversion circuits be run from the existing house circuits?',
    answer:
      'In very limited circumstances, extending an existing lighting or socket circuit to supply the loft is acceptable — but it is rarely the correct approach. The voltage drop on a long run from the ground floor consumer unit to the loft may be excessive on 1.0mm or 1.5mm cable. Additionally, adding loft load to an existing circuit reduces the discrimination (fault protection) and makes fault-finding harder. New dedicated circuits from the consumer unit, correctly sized for the full run length with acceptable voltage drop, are the professional standard and make the EIC much simpler to complete.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for long vertical runs from consumer unit to loft, including voltage drop check.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for loft conversion circuits on site.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Price loft conversion electrical packages with consumer unit upgrade options.',
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
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Check voltage drop on long vertical cable runs from consumer unit to loft level.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/guides/house-extension-electrical-cost',
    title: 'House Extension Electrical Cost',
    description: 'Guide to first and second fix electrical costs for house extensions.',
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
    heading: 'Loft Conversion Electrical Work: What Is Involved',
    content: (
      <>
        <p>
          A loft conversion is one of the most cost-effective ways to add floor area to a house. The
          electrical work is a substantial part of the project cost and must be planned carefully
          alongside the structural and building fabric works. Getting the electrical first fix right
          during the build phase avoids expensive remedial work once the plasterboard is up.
        </p>
        <p>
          The electrical package for a loft conversion typically includes new circuits from the
          consumer unit (or from a new upgraded consumer unit), first-fix cable installation in the
          new stud walls and ceiling, second-fix installation of accessories, smoke alarm
          installation, testing and certification under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          , and Part P notification.
        </p>
        <p>
          This guide covers typical costs, consumer unit requirements, the circuits needed, cable
          routing challenges by loft type, fire detection, and how to quote and certify loft
          conversion electrical work professionally.
        </p>
      </>
    ),
  },
  {
    id: 'typical-costs',
    heading: 'Typical Costs for Loft Conversion Electrical Work',
    content: (
      <>
        <p>
          Costs vary significantly by loft type, floor area, and whether a consumer unit upgrade is
          required. Typical ranges for a single-room loft conversion:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Basic dormer (existing consumer unit with spare capacity)</strong> — £1,800
                to £2,800. Lighting, sockets, smoke alarms, testing, and Part P notification for a
                straightforward dormer with standard stud wall construction.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard loft with consumer unit upgrade</strong> — £2,800 to £4,000. All of
                the above plus a new 18th edition split-load consumer unit, additional circuits for
                en-suite extraction and underfloor heating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large or complex loft (hip-to-gable, mansard, or double loft)</strong> —
                £3,500 to £5,000+. Longer cable runs, more circuits, potentially a sub-consumer unit
                in the loft, underfloor heating across a larger area, and data/TV circuits for a
                home office.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Price your loft conversion electrical package accurately"
          description="Elec-Mate's quoting app helps UK electricians price loft conversion electrical packages with itemised materials, consumer unit options, and Part P notification costs. Professional PDF quotes from your phone."
          icon={Home}
        />
      </>
    ),
  },
  {
    id: 'consumer-unit',
    heading: 'Consumer Unit: Upgrade Considerations',
    content: (
      <>
        <p>
          The consumer unit is the first thing to assess on a loft conversion survey. The questions
          to answer are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How many spare ways are available?</strong> — A loft conversion typically
                requires 2 to 4 new circuit breakers. If the board is full or has only 1 spare way,
                an upgrade or busbar extension is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Is RCD protection present?</strong> — All circuits in a loft conversion
                (which is a new floor of the dwelling) must have 30mA RCD protection. If the
                existing board has no RCD or uses a single RCD covering all circuits, adding RCBOs
                for new circuits is acceptable as an interim measure, but a full upgrade is
                recommended.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Is the board a metal-clad consumer unit?</strong> — The 18th edition of BS
                7671 requires consumer units in domestic premises to be of non-combustible
                construction. If the existing board is a plastic consumer unit (which does not meet
                this requirement), a new metal-clad unit should be installed as part of any consumer
                unit work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A new 18th edition split-load metal consumer unit with dual RCD protection (or individual
          RCBOs) costs £400 to £800 to supply and install (materials and labour). Quote it as a
          separate line item so the homeowner understands the value.
        </p>
      </>
    ),
  },
  {
    id: 'circuits',
    heading: 'Circuits Required in a Loft Conversion',
    content: (
      <>
        <p>
          A typical single-bedroom loft conversion requires the following circuits as a minimum:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <Lightbulb className="w-6 h-6 text-yellow-400 mb-3" />
            <h3 className="font-bold text-white text-base mb-2">Lighting</h3>
            <p className="text-white text-sm leading-relaxed">
              Dedicated lighting circuit for loft room and landing. 1.0mm or 1.5mm twin and earth.
              Consider LED downlights with dimmable driver for master bedroom lofts.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <Plug className="w-6 h-6 text-blue-400 mb-3" />
            <h3 className="font-bold text-white text-base mb-2">Sockets</h3>
            <p className="text-white text-sm leading-relaxed">
              Ring final or 20A radial socket circuit. Minimum 4 double sockets in the main room.
              Additional USB combination sockets at bedside positions if used as a bedroom.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <Zap className="w-6 h-6 text-red-400 mb-3" />
            <h3 className="font-bold text-white text-base mb-2">Heating</h3>
            <p className="text-white text-sm leading-relaxed">
              Dedicated circuit for electric underfloor heating mat or panel heater. Size for total
              load plus 20% margin. Smart thermostat with floor sensor recommended.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <Cable className="w-6 h-6 text-green-400 mb-3" />
            <h3 className="font-bold text-white text-base mb-2">En-suite (if applicable)</h3>
            <p className="text-white text-sm leading-relaxed">
              Extractor fan spur, shaver socket, bathroom lighting (IP44 minimum in Zone 2), and
              supplementary bonding if metallic waste and supply pipework is present.
            </p>
          </div>
        </div>
        <p>
          The smoke alarm circuit (mains-powered, interlinked) is a critical addition that must be
          included in every loft conversion quote and EIC.
        </p>
      </>
    ),
  },
  {
    id: 'cable-routes',
    heading: 'Cable Routes by Loft Conversion Type',
    content: (
      <>
        <p>
          The type of loft conversion determines how cables are routed from the consumer unit to the
          new floor. This affects labour time significantly:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dormer loft</strong> — new stud walls and flat-ceiling section allow
                standard first-fix cable installation in wall and ceiling cavities. Cables drop
                vertically through the original ceiling into the floor below, then vertically
                through the house to the consumer unit. Total run from consumer unit to loft: 12 to
                20m depending on house height.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Roof light (Velux) loft</strong> — cables must follow the existing rafter
                slope and the new floor joists. No new stud walls for concealment — cables run in
                the ceiling void above the insulation, or in conduit surface-mounted on the slope.
                More challenging first-fix but structurally simpler.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hip-to-gable loft</strong> — the new gable wall provides a useful cable
                chase for the vertical run from the consumer unit. Coordinate with the builder to
                include conduit drops in the new blockwork before rendering.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mansard loft</strong> — essentially a new floor with near-vertical walls.
                Most flexibility for cable routing. Co-ordinate with the structural engineer on the
                positions of structural steels before planning cable routes.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Use the{' '}
          <SEOInternalLink href="/tools/voltage-drop-calculator">
            voltage drop calculator
          </SEOInternalLink>{' '}
          to verify that the cable run from the consumer unit to the loft lighting and socket
          circuits does not exceed the 3% voltage drop limit for final circuits.
        </p>
      </>
    ),
  },
  {
    id: 'fire-detection',
    heading: 'Fire Detection and Smoke Alarms',
    content: (
      <>
        <p>
          Fire safety is a critical element of loft conversion Building Regulations approval. The
          requirements are:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Interlinked mains smoke alarms</strong> — required on every floor of the
                escape route, including the new loft landing. All alarms must be interlinked so that
                when one activates, all sound simultaneously. Grade D, LD2 to BS 5839-6.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heat alarm in kitchen</strong> — if the escape route passes through or
                adjacent to the kitchen, a heat alarm (rather than a smoke alarm) should be
                installed to avoid false alarms from cooking. Interlink with the smoke alarm system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wiring the interlink</strong> — wireless interlink (radio-linked alarms) is
                acceptable and avoids the need to run an interlink cable between alarms on different
                floors. Wired interlink requires a 3-core cable between alarm positions.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The smoke alarm circuit must be included in the EIC. Use a dedicated 6A or 10A MCB for the
          smoke alarm circuit, wired from the consumer unit on a 1.0mm or 1.5mm twin and earth
          cable. Do not wire smoke alarms as spurs from lighting circuits.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Winning Loft Conversion Work',
    content: (
      <>
        <p>
          Loft conversions are high-value projects for electricians: the electrical package is
          typically one of the larger sub-contract elements, and builders value reliable,
          professional electrical contractors who can co-ordinate with the build programme. Key
          differentiators:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">First-Fix Programme</h4>
                <p className="text-white text-sm leading-relaxed">
                  Provide the builder with a written first-fix programme — which circuits you will
                  install in which sequence. Builders love sub-contractors who make their lives
                  easier. Use the Elec-Mate quoting app to generate a materials list for the
                  first-fix package.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Complete Paperwork on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink>{' '}
                  after testing and submit to your competent person scheme before leaving site. The
                  homeowner and builder both need the Part P certificate to sign off the Building
                  Regulations application — delays cost them money and damage your reputation.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing and Voltage Drop</h4>
                <p className="text-white text-sm leading-relaxed">
                  Long vertical cable runs to the loft can have significant voltage drop. Use the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  on the survey to specify the correct cable size — upgrading from 2.5mm to 4mm on a
                  long socket circuit run is a common requirement on loft conversions.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote, cable-size, and certify loft conversion electrical work"
          description="Join 1,000+ UK electricians using Elec-Mate for professional quoting, cable sizing, and on-site EIC certificates for loft conversion projects. 7-day free trial."
          icon={Home}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LoftConversionElectricalCostPage() {
  return (
    <GuideTemplate
      title="Loft Conversion Electrical Cost UK | Circuits, Costs & Part P"
      description="How much does loft conversion electrical work cost in the UK? Typical costs £1,800–£5,000. Covers required circuits, consumer unit upgrades, cable routing by loft type, fire detection, and Part P notification."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={Home}
      heroTitle={
        <>
          Loft Conversion Electrical Cost:{' '}
          <span className="text-yellow-400">Circuits, Costs and Part P</span>
        </>
      }
      heroSubtitle="A loft conversion electrical package typically costs £1,800 to £5,000. This guide covers required circuits, consumer unit upgrade considerations, cable routing by loft type, smoke alarm requirements, and Part P notification."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Loft Conversion Electrical Work"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify Loft Conversion Electrical Work on Your Phone"
      ctaSubheading="Elec-Mate gives UK electricians professional quoting, cable sizing, and on-site EIC certification for loft conversion projects. 7-day free trial, cancel anytime."
    />
  );
}
