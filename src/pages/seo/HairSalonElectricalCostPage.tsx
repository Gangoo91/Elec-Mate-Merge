import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Calculator,
  Scissors,
  Zap,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Wrench,
  Building2,
  Lightbulb,
  Droplets,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Hair Salon Electrical Cost', href: '/guides/hair-salon-electrical-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Hair Salon Electrical Overview' },
  { id: 'styling-stations', label: 'Styling Station Outlet Requirements' },
  { id: 'wash-stations', label: 'Wash Station Wiring and IP Ratings' },
  { id: 'reception-lighting', label: 'Reception and Salon Lighting' },
  { id: 'cost-breakdown', label: 'Cost Breakdown by Salon Size' },
  { id: 'regulations', label: 'Regulations and Standards' },
  { id: 'for-electricians', label: 'For Electricians: Quoting Salon Work' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Hair salon electrical installation costs £3,000 to £10,000 in 2026 depending on salon size, number of styling and wash stations, lighting specification, and whether a supply upgrade is needed.',
  'Each styling station requires a minimum of 2 double socket outlets for hair dryers, straighteners, and clippers — plus dedicated circuits for high-wattage equipment such as hood dryers (2 to 3kW each).',
  'Wash station areas require IP44 rated accessories and careful cable routing. RCD protection per Regulation 411.3.3 of BS 7671 is essential for all circuits in areas where water is present.',
  'Salon lighting is critical to the business — clients need to see accurate colour rendering. LED fittings with CRI 90+ and 4000K to 5000K colour temperature are recommended for styling areas.',
  'Reception and retail display lighting creates the first impression. Feature lighting, track lighting, and illuminated display shelving typically add £1,000 to £3,000 to the electrical installation.',
];

const faqs = [
  {
    question: 'How much does hair salon electrical installation cost in 2026?',
    answer:
      'Hair salon electrical installation costs £3,000 to £10,000 in 2026. A small 3-chair salon with basic lighting and standard outlets costs £3,000 to £5,000. A medium 6 to 8-chair salon with feature lighting, dedicated wash station wiring, reception lighting, and outdoor signage costs £5,000 to £7,500. A large 10+ chair salon with premium lighting design, multiple wash stations, separate colour processing room, and retail display lighting costs £7,500 to £10,000 or more.',
  },
  {
    question: 'How many socket outlets does a styling station need?',
    answer:
      'Each styling station needs a minimum of 2 double socket outlets (4 sockets total), positioned at counter height (approximately 1,000mm from floor level). This allows simultaneous use of a hair dryer (1.8 to 2.2kW), straighteners or curling tongs, clippers, and a phone charger. Sockets should be positioned to avoid trailing cables across the working area. Consider adding a USB charging point for client phone charging at each station — it is a small cost that improves client experience.',
  },
  {
    question: 'What IP rating is needed near wash basins in a hair salon?',
    answer:
      "Electrical accessories within 600mm of a wash basin in a hair salon should be IP44 rated minimum (protection against splashing water from any direction). Socket outlets should not be positioned directly above or within arm's reach of the wash basin. Light fittings directly above wash stations should be IP44 rated. The zones around wash basins in hair salons are not as strictly defined as bathrooms in BS 7671, but the principle of protection against water ingress applies. RCD protection per Regulation 411.3.3 is mandatory for all circuits serving the wash area.",
  },
  {
    question: 'What lighting is best for a hair salon?',
    answer:
      'Hair salon lighting should provide high colour rendering (CRI 90+) to allow accurate perception of hair colour. A colour temperature of 4000K to 5000K (neutral to cool white) is preferred for styling areas — warm white (3000K) distorts colour perception. LED downlights or surface-mounted LED panels at 300 to 500 lux are standard for styling areas. Illuminated mirror surrounds provide shadow-free face lighting for each station. Dimming capability allows the salon to adjust the mood for evening appointments.',
  },
  {
    question: 'Do hair salons need emergency lighting?',
    answer:
      'Yes. Hair salons are commercial premises that require emergency lighting under the Regulatory Reform (Fire Safety) Order 2005. Self-contained LED emergency fittings with 3-hour duration should illuminate escape routes and exit signs. The emergency lighting should activate automatically on mains failure to allow clients and staff to evacuate safely. A typical small salon needs 3 to 5 emergency fittings plus illuminated exit signs — approximately £400 to £800 installed.',
  },
  {
    question: 'Can a hair salon run on a single-phase supply?',
    answer:
      'Most hair salons can operate on a single-phase supply. The total connected load for a typical 6-chair salon with lighting, sockets, water heater, and hood dryers is approximately 15 to 25kW. With diversity applied, the maximum demand is usually under 40A to 60A, which a 100A single-phase supply can accommodate. However, if the salon has electric water heating (instantaneous shower-type heaters for wash basins can draw 7 to 10kW each), air conditioning, or multiple high-wattage hood dryers operating simultaneously, a supply upgrade or 3-phase supply may be needed.',
  },
  {
    question: 'What electrical work is needed for salon signage?',
    answer:
      'Illuminated salon signage requires a dedicated circuit from the distribution board, typically a 6A or 10A radial circuit. External illuminated signs need IP65 rated connections and must comply with local planning regulations regarding illuminated signage. LED sign lighting has largely replaced neon — a standard illuminated fascia sign draws 100 to 300W. Budget £300 to £600 for the electrical supply to the sign (excluding the sign itself). The circuit should include a time clock or photocell for automatic switching.',
  },
  {
    question: 'How long does a hair salon electrical fit-out take?',
    answer:
      'A hair salon electrical fit-out typically takes 3 to 7 days depending on size. First fix (cable runs, back boxes, containment) takes 1 to 3 days. Second fix (accessories, light fittings, consumer unit, testing) takes 2 to 4 days. The electrical work must be coordinated with the salon fit-out company, plumber, and decorator. Testing and certification add half a day. If a supply upgrade is needed, allow 4 to 8 weeks for the DNO application.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/commercial-rewire-cost',
    title: 'Commercial Rewire Cost',
    description: 'Full commercial electrical installation costs per square metre.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Cost',
    description: 'Distribution board costs for commercial installations.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates for salon fit-outs.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote salon electrical work with station-by-station pricing.',
    icon: Calculator,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Hair Salon Electrical Overview',
    content: (
      <>
        <p>
          Hair salon electrical installation combines high-density power outlets at styling
          stations, water-adjacent wiring at wash stations, carefully designed lighting for colour
          accuracy, and feature lighting that creates the salon's atmosphere. It is detailed,
          specification-driven work that rewards careful planning.
        </p>
        <p>
          For salon owners, the electrical installation is one of the most important elements of the
          fit-out — poor lighting loses clients, insufficient sockets frustrate stylists, and
          unreliable power disrupts business. For electricians, salon fit-outs are regular,
          well-paid commercial work with repeat business potential from salon chains and
          refurbishments.
        </p>
      </>
    ),
  },
  {
    id: 'styling-stations',
    heading: 'Styling Station Outlet Requirements',
    content: (
      <>
        <p>
          Each styling station is a self-contained work position that requires adequate power
          outlets for the tools used by the stylist. Getting the outlet provision right at the
          design stage prevents expensive additions after the fit-out is complete.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Per-Station Electrical Requirements</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket outlets</strong> — Minimum 2 double sockets (4 outlets) per station
                at counter height (1,000mm). Position to avoid cable drape across the client. Cost:
                £30 to £50 per double socket installed including cable run.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>USB charging points</strong> — 1 USB-A/USB-C socket per station for client
                phone charging. Can be integrated into the socket outlet or a separate unit. Cost:
                £15 to £30 per point.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hood dryer connections</strong> — Free-standing hood dryers draw 2 to 3kW
                and should be on dedicated radial circuits. A 20A radial circuit can serve 2 to 3
                hood dryers. Cost: £80 to £150 per connection point.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mirror lighting</strong> — Illuminated mirror surrounds or vanity lighting
                strips provide shadow-free face lighting. LED strip (CRI 90+, 4000K to 5000K): £40
                to £100 per station including driver and wiring.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Total electrical cost per styling station: £150 to £350 depending on specification. For a
          6-chair salon, station wiring costs approximately £900 to £2,100.
        </p>
      </>
    ),
  },
  {
    id: 'wash-stations',
    heading: 'Wash Station Wiring and IP Ratings',
    content: (
      <>
        <p>
          Wash stations present the main water-related electrical safety challenge in a hair salon.
          Water from backwash basins, spray, and general splashing means that electrical accessories
          in this area require appropriate IP ratings and RCD protection.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Wash Area Electrical Requirements</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP44 minimum</strong> — All socket outlets and switches within 600mm of a
                wash basin must be IP44 rated. Position sockets away from the direct splash zone.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — All circuits serving the wash area must have 30mA
                RCD protection per Regulation 411.3.3 of BS 7671. Use individual RCBOs for wash area
                circuits to avoid nuisance tripping affecting other salon circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Water heater connection</strong> — Instantaneous electric water heaters (7
                to 10kW) require a dedicated circuit with an isolator. If the salon uses a stored
                hot water system, a dedicated 3kW immersion circuit is needed. The water heater type
                significantly affects the electrical load calculation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'reception-lighting',
    heading: 'Reception and Salon Lighting',
    content: (
      <>
        <p>
          Lighting is arguably the most important element of a hair salon's electrical installation.
          It affects the client's experience, the stylist's ability to work accurately, and the
          overall atmosphere of the business.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Styling Area Lighting</h3>
            <p className="text-white text-sm leading-relaxed">
              LED downlights or surface-mounted panels, CRI 90+ minimum, 4000K to 5000K colour
              temperature, 300 to 500 lux at styling height. Dimmable for mood adjustment. Cost: £40
              to £80 per downlight installed, or £80 to £150 per panel. A 6-chair salon typically
              needs 12 to 18 downlights in the styling area.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Reception and Display</h3>
            <p className="text-white text-sm leading-relaxed">
              Feature pendant lights, track lighting for retail product displays, illuminated
              shelving, and accent lighting create the salon's identity. Warmer colour temperature
              (3000K) works well in reception areas. Budget £1,000 to £3,000 for reception and
              retail lighting including track systems and display illumination.
            </p>
          </div>
        </div>
        <p>
          Total lighting cost for a 6-chair salon: £2,000 to £5,000 depending on specification.
          Premium salons may spend more on designer fittings and custom lighting schemes.
        </p>
      </>
    ),
  },
  {
    id: 'cost-breakdown',
    heading: 'Cost Breakdown by Salon Size',
    content: (
      <>
        <p>Here are realistic total electrical installation costs for hair salons in 2026:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small salon, 3 chairs (£3,000 to £5,000)</strong> — Consumer unit, 6 to 8
                double sockets at stations, 2 to 4 general sockets, basic LED downlight lighting,
                wash station wiring with IP44 accessories, emergency lighting, signage circuit. 3 to
                4 days installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium salon, 6 to 8 chairs (£5,000 to £7,500)</strong> — Consumer unit with
                RCBOs and SPD, 12 to 16 double sockets at stations, hood dryer circuits, feature
                reception lighting, wash station IP44 wiring, mirror lighting, emergency lighting,
                signage circuit, extractor fan. 4 to 6 days installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large salon, 10+ chairs (£7,500 to £10,000+)</strong> — Full distribution
                with sub-board, 20+ double sockets at stations, multiple hood dryer circuits,
                premium lighting design with dimming, colour processing room wiring, multiple wash
                stations, retail display lighting, air conditioning supply, comprehensive emergency
                lighting. 1 to 2 weeks installation.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Quote salon electrical fit-outs accurately"
          description="Elec-Mate's quoting app handles per-station pricing, lighting schedules, and IP-rated accessory costing. Professional PDF quotes that impress salon owners."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Regulations and Standards',
    content: (
      <>
        <p>
          Hair salon electrical installations must comply with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>
          . Key regulatory considerations include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection (Regulation 411.3.3)</strong> — All socket outlets up to 32A
                require 30mA RCD protection. This is particularly important in the wash area where
                water and electricity are in close proximity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP ratings near water</strong> — Accessories near wash basins must be
                appropriately IP rated. Whilst the salon wash area is not classified as a bathroom
                under Section 701 of BS 7671, the general principles of water protection apply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting (BS 5266-1)</strong> — Required in all commercial
                premises to illuminate escape routes in the event of mains failure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P notification</strong> — Does not apply to commercial premises.
                However, the installation must comply with the Building Regulations and an EIC must
                be issued.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Salon Work',
    content: (
      <>
        <p>
          Hair salon fit-outs are regular commercial work with good margins and repeat business
          potential. Here are tips for quoting salon electrical projects:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Scissors className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Work from the Salon Layout</h4>
                <p className="text-white text-sm leading-relaxed">
                  Get the salon floor plan showing every styling station, wash station, reception
                  desk, and back-of-house area. Price per station plus common areas. Use Elec-Mate's{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to build the quote station by station.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Advise on Lighting Specification</h4>
                <p className="text-white text-sm leading-relaxed">
                  Many salon owners do not understand the importance of CRI and colour temperature
                  for hair colour work. Advise them on CRI 90+ fittings and demonstrate the
                  difference. This adds value to your quote and justifies premium lighting costs.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Offer Maintenance Packages</h4>
                <p className="text-white text-sm leading-relaxed">
                  Hair salons need regular EICR inspections and emergency lighting testing. Offer an
                  annual maintenance package when quoting the fit-out — this builds an ongoing
                  revenue stream and a long-term client relationship.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote salon fit-outs station by station"
          description="Elec-Mate's quoting app handles per-station pricing, lighting schedules, and IP-rated accessories. AI cost engineering checks your rates against current market data."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HairSalonElectricalCostPage() {
  return (
    <GuideTemplate
      title="Hair Salon Electrical Cost 2026 | UK Salon Fit-Out Guide"
      description="How much does hair salon electrical installation cost in 2026? UK guide covering styling station wiring, wash station IP ratings, salon lighting, and realistic costs from £3,000 to £10,000."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Hair Salon Electrical Cost:{' '}
          <span className="text-yellow-400">UK Salon Fit-Out Guide 2026</span>
        </>
      }
      heroSubtitle="What does hair salon electrical installation cost? This guide covers styling station outlets, wash station wiring with IP ratings, salon lighting for colour accuracy, and realistic pricing from £3,000 to £10,000 — for salon owners and electrical contractors."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Hair Salon Electrical Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Hair Salon Fit-Outs with Per-Station Pricing"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for salon quoting with station-by-station pricing, lighting specifications, and professional PDF output. 7-day free trial."
    />
  );
}
