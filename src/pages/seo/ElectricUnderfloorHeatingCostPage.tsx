import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Thermometer,
  Zap,
  ShieldCheck,
  Calculator,
  FileCheck2,
  Wrench,
  Cable,
  ClipboardCheck,
  Gauge,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Electric Underfloor Heating Cost', href: '/guides/electric-underfloor-heating-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'mat-vs-loose', label: 'Mat vs Loose Element Systems' },
  { id: 'installation-cost', label: 'Installation Costs' },
  { id: 'running-costs', label: 'Running Costs' },
  { id: 'thermostat', label: 'Thermostats and Controls' },
  { id: 'electrical-requirements', label: 'Electrical Requirements' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Electric underfloor heating comes in two main forms: heating mats (thin pre-spaced element woven into a mesh mat, for regular-shaped rooms) and loose element (single cable that is spaced by the installer, for irregular rooms or under large tile formats).',
  'Installation costs typically range from £800 to £2,500 per room, depending on floor area, system type, floor construction, and whether a new dedicated circuit is required from the consumer unit.',
  'Running costs depend on the floor area heated, the insulation standard of the floor construction, and the tariff rate. A 10m² bathroom with 150W per m² element running 2 hours per day costs approximately 30p to 50p per day at typical electricity rates.',
  'Every electric underfloor heating installation requires a dedicated circuit from the consumer unit with appropriate cable sizing and RCD protection, and must be notified under Part P of the Building Regulations.',
  'A floor sensor (thermistor) embedded in the floor screed or tile adhesive, connected to the thermostat, prevents the element overheating and is a requirement of most manufacturers for warranty validity.',
];

const faqs = [
  {
    question: 'What is the difference between a heating mat and a loose element system?',
    answer:
      'A heating mat is a pre-spaced heating element fixed to a fibreglass mesh. The element spacing is factory-set (typically 50mm or 75mm centres) and the mat is laid directly onto the subfloor before tiling or in a thin-set adhesive bed. Mats are ideal for straightforward rectangular rooms, are quick to install, and are available in standard sizes that are easy to order and handle. A loose element system uses a single cable that the installer spaces manually using fixing clips or a plastic track fixed to the subfloor. This allows the cable spacing to be adjusted for irregular rooms, rooms with obstacles (toilet pedestals, bath panels, island units), or to vary the output across different zones within the room. Loose element systems take longer to install but provide more flexibility. Both types produce the same heat output per metre of element for a given wattage.',
  },
  {
    question: 'How much does electric underfloor heating installation cost per room?',
    answer:
      'For a standard bathroom (6 to 8m², heating mat, new thermostat, dedicated circuit from an adjacent consumer unit), the installed cost is typically £800 to £1,400 including the mat, thermostat, floor sensor, electrical circuit, testing, and Part P notification. For a larger room (kitchen or living room, 15 to 25m², loose element system with full floor coverage), the installed cost is typically £1,500 to £2,500. Costs are higher where the consumer unit is remote (long cable run from the board), where the floor requires preparation (self-levelling compound before tiling), or where an underfloor heating thermostat with WiFi/smart home integration is specified.',
  },
  {
    question: 'How much does electric underfloor heating cost to run?',
    answer:
      'Running costs depend on the floor area, element wattage, insulation standard, and tariff rate. The typical element output is 100 to 200W per m² — 150W per m² is the most common for tiled bathroom floors. A 10m² bathroom with a 150W per m² element has a total load of 1.5kW. If the system runs for 2 hours per day (controlled by a thermostat with a schedule), the daily energy consumption is 3kWh. At an electricity rate of 25p per kWh (typical 2026 rate), this costs 75p per day or approximately £22 per month. For a larger living room (20m² at 100W per m², 4 hours per day), the monthly cost is approximately £60 to £80. In well-insulated rooms with a correctly sized element, the thermostat cycles the system so that the actual on-time is lower than the programmed window.',
  },
  {
    question: 'Does electric underfloor heating need a dedicated circuit?',
    answer:
      'Yes. Every electric underfloor heating installation must have a dedicated circuit from the consumer unit. The circuit must be correctly sized for the total element load plus a 20% design margin, protected by an MCB or RCBO of the appropriate rating, and have 30mA RCD protection. Running the underfloor heating as a spur from the socket circuit or the lighting circuit is not acceptable — the load can easily exceed the ring circuit capacity and the fault protection may not be appropriate for a fixed heating appliance. The dedicated circuit typically uses 2.5mm twin and earth cable on a 16A or 20A RCBO, depending on the total element wattage.',
  },
  {
    question: 'What is a floor sensor and why is it needed?',
    answer:
      'A floor sensor (also called a floor thermistor or NTC sensor) is a small probe embedded in the floor construction adjacent to the heating element. It measures the floor surface temperature and sends this reading to the thermostat. The thermostat uses the floor sensor signal (either alone, or in combination with an air temperature sensor) to control the element. The floor sensor prevents the element from overheating — if the room thermostat is set high and the floor is heavily insulated (by a rug or furniture placed on top), without a floor sensor the element could reach temperatures that damage the tile adhesive, the element itself, or the floor covering above. Most manufacturers specify that a floor sensor must be installed for the product warranty to be valid. The sensor probe is typically embedded in the tile adhesive or in a protective conduit at installation time.',
  },
  {
    question: 'Is electric underfloor heating subject to Part P Building Regulations?',
    answer:
      'Yes. An electric underfloor heating installation is a new fixed electrical installation in a domestic dwelling and is notifiable under Part P of the Building Regulations. The electrical circuit (from the consumer unit to the thermostat and element) must be tested and an Electrical Installation Certificate issued. The EIC is submitted to the competent person scheme (NICEIC, NAPIT, ELECSA) for the Part P certificate to be issued. The homeowner needs the Part P certificate for property sale purposes — installations without a Part P certificate are flagged as non-compliant during conveyancing.',
  },
  {
    question: 'Can electric underfloor heating be used under laminate or engineered wood?',
    answer:
      'Yes, but with important restrictions. The floor covering manufacturer must approve the use of electric underfloor heating under their product, and the maximum floor surface temperature must not exceed the manufacturer specification (typically 27°C for wood and laminate floors). The element must be a low-wattage system (typically 80 to 100W per m² rather than 150 to 200W per m² for tiles) to avoid overheating the wood. A dual-sensor thermostat (air sensor and floor sensor) is mandatory for wood and laminate installations so that both the air temperature and the floor temperature are monitored. Most heating mat and loose element manufacturers offer specific products approved for use under wood and laminate.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size the dedicated circuit cable for electric underfloor heating installations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for underfloor heating circuits on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Quote underfloor heating installations with element, thermostat, circuit, and Part P costs.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/guides/garage-conversion-electrical-cost',
    title: 'Garage Conversion Electrical Cost',
    description: 'UFH is a popular heating choice for converted garages — see the full cost guide.',
    icon: Thermometer,
    category: 'Guide',
  },
  {
    href: '/guides/loft-conversion-electrical-cost',
    title: 'Loft Conversion Electrical Cost',
    description: 'UFH considerations for loft conversion heating circuits.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description:
      'Check voltage drop on long circuit runs from consumer unit to underfloor heating thermostats.',
    icon: Zap,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Electric Underfloor Heating: Types, Costs and Installation',
    content: (
      <>
        <p>
          Electric underfloor heating (UFH) is one of the most popular upgrades in UK bathroom and
          kitchen renovations. The heat is radiated evenly from the floor surface, creating comfort
          without visible radiators or ducting, and the system is entirely controlled by a
          thermostat — often with smart home integration.
        </p>
        <p>
          The electrician's role in a UFH installation covers the dedicated circuit from the
          consumer unit to the thermostat position, connection of the thermostat and floor sensor,
          testing of the element continuity and insulation resistance before and after tiling, and
          the full electrical test and certification after installation. Part P notification is
          required.
        </p>
        <p>
          This guide covers the two main system types (mat and loose element), installation and
          running costs, thermostat and control options, the electrical circuit requirements, and
          how to quote and certify UFH installations efficiently.
        </p>
      </>
    ),
  },
  {
    id: 'mat-vs-loose',
    heading: 'Heating Mat vs Loose Element: Which to Specify',
    content: (
      <>
        <p>
          The choice between a heating mat and a loose element system depends primarily on the room
          geometry and the floor covering:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <Thermometer className="w-6 h-6 text-yellow-400 mb-3" />
            <h3 className="font-bold text-white text-base mb-2">Heating Mat</h3>
            <p className="text-white text-sm leading-relaxed">
              Pre-spaced element on fibreglass mesh. Available in standard widths (0.5m) and
              lengths. Quick to install — unroll and lay in thinset adhesive before tiling. Best for
              regular rectangular rooms. Cannot cut the element — the mat can be cut and folded to
              navigate obstacles but the cable itself must not be cut.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <Cable className="w-6 h-6 text-blue-400 mb-3" />
            <h3 className="font-bold text-white text-base mb-2">Loose Element</h3>
            <p className="text-white text-sm leading-relaxed">
              Single cable spaced manually with fixing clips or a track. Spacing can be varied
              across the room (wider spacing under fixed furniture, closer under open floor areas).
              Ideal for L-shaped rooms, rooms with multiple obstacles, or where the tile format
              requires a specific spacing. Takes longer to install but provides maximum flexibility.
            </p>
          </div>
        </div>
        <p>
          Both systems produce the same heat output per unit area for a given wattage. The output is
          specified in W/m² and the total element wattage is determined by the floor area to be
          heated multiplied by the specified output. A 10m² bathroom at 150W/m² requires a 1,500W
          element.
        </p>
      </>
    ),
  },
  {
    id: 'installation-cost',
    heading: 'Installation Costs by Room Type',
    content: (
      <>
        <p>
          Indicative installed costs for electric underfloor heating (element, thermostat, floor
          sensor, dedicated circuit, testing, and Part P notification):
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small bathroom (4–8m², mat system)</strong> — £800 to £1,200. Includes a
                150W/m² heating mat, programmable thermostat with floor sensor, dedicated circuit
                from adjacent consumer unit, testing, and Part P.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kitchen or utility room (10–15m², mat or loose element)</strong> — £1,200 to
                £1,800. Larger element area, longer circuit run from consumer unit, WiFi thermostat.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Living room or open-plan area (15–30m², loose element)</strong> — £1,800 to
                £2,500. Full room coverage, loose element for layout flexibility, smart thermostat
                with multi-zone capability, longer cable run from consumer unit.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Price underfloor heating installations accurately"
          description="Use Elec-Mate's quoting app to price UFH installations with element area, thermostat, circuit, and Part P notification as separate line items. Professional PDF quotes from your phone."
          icon={Thermometer}
        />
      </>
    ),
  },
  {
    id: 'running-costs',
    heading: 'Running Cost Calculations',
    content: (
      <>
        <p>
          Running cost calculations help homeowners make informed decisions and help electricians
          specify the correct element wattage. The key inputs:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Element wattage</strong> — total floor area (m²) × element output (W/m²).
                Typical values: 100 to 150W/m² for tiles (primary heat source), 80 to 100W/m² for
                supplementary comfort heating under wood or laminate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Daily run time</strong> — controlled by the thermostat schedule. In a
                well-insulated floor, the thermostat cycles the element on and off to maintain the
                set temperature, so actual energy consumption is less than the element wattage ×
                scheduled hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity tariff</strong> — at a standard rate of 25p per kWh, a 1.5kW
                bathroom element running an average of 1.5 hours per day consumes 2.25kWh and costs
                approximately 56p per day or £17 per month. On an off-peak tariff (if the system can
                charge a thermal mass floor overnight), running costs are lower.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A correctly specified and controlled UFH system in a bathroom with proper floor insulation
          beneath the element (50mm PIR between joists or under screed) is significantly cheaper to
          run than one with no sub-floor insulation, where much of the heat is lost downwards.
        </p>
      </>
    ),
  },
  {
    id: 'thermostat',
    heading: 'Thermostats and Controls',
    content: (
      <>
        <p>
          The thermostat is a critical component of an electric UFH system. Specifying the right
          thermostat improves comfort, reduces energy waste, and avoids element damage:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Programmable thermostat (standard)</strong> — 7-day programme with multiple
                on/off periods per day. Air sensor in the thermostat body. Suitable for bathrooms
                and utility rooms where the primary control requirement is a timed morning warm-up.
                Examples: Heatmat, Devi, Warmup 4iE. Cost: £60 to £120.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart thermostat with WiFi (recommended)</strong> — app control, geofencing,
                energy monitoring, and compatibility with Alexa/Google Home. The Warmup 4iE and
                Heatmat TouchStat are popular choices. Cost: £120 to £200. Provides energy data that
                demonstrates the system is running efficiently.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dual-sensor thermostat (mandatory for wood and laminate)</strong> — monitors
                both air temperature (via sensor in thermostat body) and floor temperature (via
                floor sensor). If the floor temperature reaches the maximum set point (typically
                27°C for wood), the thermostat limits further heating regardless of the air sensor
                reading. Prevents element overheating and floor covering damage.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'electrical-requirements',
    heading: 'Electrical Circuit Requirements',
    content: (
      <>
        <p>
          The electrical circuit for an electric UFH system must comply with BS 7671 and the
          thermostat and element manufacturer's requirements. Key points:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit</strong> — a dedicated circuit from the consumer unit is
                required. Do not connect UFH as a spur from a socket circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable sizing</strong> — 2.5mm twin and earth is appropriate for most
                domestic UFH circuits (up to 3kW element). For larger systems (3kW to 4kW), 4mm
                cable may be required depending on the circuit length. Use the{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  cable sizing calculator
                </SEOInternalLink>{' '}
                to confirm.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — 30mA RCD protection is required for all circuits
                supplying electric heating in a domestic dwelling. An RCBO (combining the MCB and
                RCD in one device) is the preferred solution for a dedicated UFH circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Element testing</strong> — test the element continuity (resistance check
                against manufacturer datasheet) and insulation resistance (500V DC, minimum 1
                megohm) before tiling and again after tiling is complete. Record both sets of
                results on the EIC. If the post-tile insulation resistance is significantly lower,
                the element may have been damaged during tiling.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The floor sensor probe must be installed in the tile adhesive (or in a protective conduit
          laid in the adhesive) at the same time as the heating element. Do not tile over the
          thermostat cold-tail connection point — this must remain accessible.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: UFH as a Revenue Stream',
    content: (
      <>
        <p>
          Electric underfloor heating is excellent recurring work — bathroom renovations happen
          regularly, and a satisfied customer will recommend you to neighbours. Key points for
          building UFH as a revenue stream:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Test Before and After Tiling</h4>
                <p className="text-white text-sm leading-relaxed">
                  Always test element continuity and insulation resistance before the tiler starts
                  and again after tiling is complete. If the resistance drops after tiling, the
                  element has been damaged — catching this before the EIC is issued protects you and
                  the customer. Record both sets of results on the certificate.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Include Part P in the Quote</h4>
                <p className="text-white text-sm leading-relaxed">
                  Always include Part P notification as a line item. Homeowners are often unaware
                  that UFH is notifiable under Building Regulations — making this explicit in the
                  quote demonstrates professionalism and ensures the customer has the correct
                  documentation for their property records.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify UFH installations on your phone"
          description="Join 1,000+ UK electricians using Elec-Mate for underfloor heating installation quotes, element testing records, and EIC certification. Complete the certificate on site and issue the PDF immediately. 7-day free trial."
          icon={Thermometer}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricUnderfloorHeatingCostPage() {
  return (
    <GuideTemplate
      title="Electric Underfloor Heating Cost UK | Installation, Running Costs and Circuits"
      description="Complete guide to electric underfloor heating installation cost in the UK. Mat vs loose element systems, installation costs £800–£2,500 per room, running cost calculations, thermostat options, and Part P electrical requirements."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={Thermometer}
      heroTitle={
        <>
          Electric Underfloor Heating Cost:{' '}
          <span className="text-yellow-400">Installation, Running Costs and Circuits</span>
        </>
      }
      heroSubtitle="Electric underfloor heating installation typically costs £800 to £2,500 per room. This guide covers mat vs loose element systems, installation costs, running cost calculations, thermostat controls, and the electrical circuit requirements including Part P notification."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electric Underfloor Heating"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certify UFH Installations on Your Phone"
      ctaSubheading="Elec-Mate gives UK electricians professional quoting, element test recording, and EIC certification for underfloor heating installations. 7-day free trial, cancel anytime."
    />
  );
}
