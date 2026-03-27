import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Calculator,
  UtensilsCrossed,
  Zap,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Wrench,
  Building2,
  Fan,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Restaurant Kitchen Electrical Cost', href: '/guides/restaurant-kitchen-electrical-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Restaurant Kitchen Electrical Overview' },
  { id: 'three-phase', label: '3-Phase Supply and Distribution' },
  { id: 'extraction', label: 'Extraction Interlock and Gas Safety' },
  { id: 'ip-ratings', label: 'IP Ratings for Commercial Kitchens' },
  { id: 'emergency-stop', label: 'Emergency Stop and Isolation' },
  { id: 'cost-breakdown', label: 'Cost Breakdown' },
  { id: 'regulations', label: 'Regulations and Standards' },
  { id: 'for-electricians', label: 'For Electricians: Quoting Kitchen Electrical' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Restaurant kitchen electrical installation costs £5,000 to £15,000 in 2026 depending on kitchen size, equipment specification, whether a 3-phase supply upgrade is needed, and the extent of extraction and ventilation interlock wiring.',
  'Most commercial kitchens require a 3-phase supply to power large equipment such as combi ovens, commercial dishwashers, and walk-in refrigeration. A 3-phase supply upgrade from the DNO costs £1,500 to £5,000 in addition to the internal wiring.',
  'Extraction interlock systems — which prevent gas cooking appliances from operating unless the extraction system is running — are a legal requirement under the Gas Safety (Installation and Use) Regulations 1998 and IGEM/UP/19.',
  'All socket outlets and equipment connections in a commercial kitchen must be appropriately rated for the environment. IP44 minimum is required in wet areas, with IP65 recommended near wash-down zones.',
  'An emergency stop button (large red mushroom-head type) must be provided to isolate the gas supply and extraction system in an emergency, typically positioned near the kitchen exit.',
];

const faqs = [
  {
    question: 'How much does restaurant kitchen electrical installation cost in 2026?',
    answer:
      'Restaurant kitchen electrical installation costs £5,000 to £15,000 in 2026. A small cafe kitchen with single-phase equipment and basic extraction costs £5,000 to £7,000. A medium restaurant kitchen with 3-phase supply, combi oven, commercial dishwasher, extraction interlock, and emergency stop costs £8,000 to £12,000. A large restaurant or hotel kitchen with multiple cooking stations, walk-in cold rooms, extensive extraction, and full BMS integration costs £12,000 to £15,000 or more.',
  },
  {
    question: 'Does a restaurant kitchen need 3-phase power?',
    answer:
      'Most restaurant kitchens need 3-phase power. Large commercial combi ovens draw 15 to 30kW, commercial dishwashers draw 10 to 20kW, and walk-in cold rooms can draw 3 to 8kW. When the total connected load exceeds approximately 15kW (the practical limit of a 63A single-phase supply), 3-phase is required. Even smaller kitchens benefit from 3-phase for better load balancing and the ability to accommodate future equipment upgrades. Check the equipment specification before confirming whether single-phase or 3-phase is needed.',
  },
  {
    question: 'What is an extraction interlock system?',
    answer:
      'An extraction interlock system ensures that gas cooking appliances cannot operate unless the kitchen extraction system is running. This is a critical safety measure to prevent carbon monoxide build-up. The interlock monitors the extraction fan operation (typically via a current sensor or air pressure switch) and controls the gas solenoid valve. If the extraction fails, the gas supply is automatically shut off. Installation of the interlock system costs £800 to £2,000 depending on the number of gas appliances and the complexity of the extraction system.',
  },
  {
    question: 'What IP rating is needed for commercial kitchen electrical equipment?',
    answer:
      'Commercial kitchen electrical equipment should be rated to IP44 minimum in general kitchen areas (protection against splashing water from any direction). In areas subject to direct water jets during wash-down, IP65 is recommended (protection against low-pressure water jets from any direction). Socket outlets near sinks or wash-down areas should be IP44 or higher with spring-loaded covers. Light fittings above cooking and preparation areas should be IP44 minimum with shatter-proof diffusers. Equipment connections behind cooking ranges typically use IP44 or IP55 rated isolators.',
  },
  {
    question: 'Do restaurant kitchens need emergency lighting?',
    answer:
      'Yes. Emergency lighting is required in commercial kitchens under the Regulatory Reform (Fire Safety) Order 2005. The kitchen is a high-risk area (hot surfaces, sharp equipment, open flames) where sudden darkness could cause serious injury. Self-contained LED emergency fittings with 3-hour duration should be provided at a density sufficient to achieve minimum 1 lux on escape routes and 15 lux in high-risk task areas. Illuminated emergency exit signs must be provided at all kitchen exits.',
  },
  {
    question: 'What emergency stop provisions are needed in a restaurant kitchen?',
    answer:
      'An emergency stop button (large red mushroom-head type on a yellow background) should be positioned near the main kitchen exit, accessible to anyone leaving the kitchen in an emergency. When activated, it should isolate the gas solenoid valve (shutting off gas to all cooking appliances) and can also stop the extraction system. Some installations include a separate emergency electrical isolation button that disconnects all kitchen equipment except lighting and emergency lighting. The emergency stop must be clearly labelled and staff must be trained in its use.',
  },
  {
    question: 'How long does a restaurant kitchen electrical installation take?',
    answer:
      'A restaurant kitchen electrical installation typically takes 1 to 3 weeks depending on the scope. First fix (containment, cable runs, back boxes) takes 3 to 5 days. Equipment connections, extraction interlock wiring, and second fix take 3 to 5 days. Testing, commissioning, and certification take 1 to 2 days. If a 3-phase supply upgrade is required, allow an additional 8 to 12 weeks for the DNO application and installation. The electrical work must be coordinated with the kitchen fit-out company, plumber, gas engineer, and ventilation contractor.',
  },
  {
    question: 'Can I use standard domestic socket outlets in a commercial kitchen?',
    answer:
      'No. Standard domestic socket outlets (BS 1363) rated IP20 are not suitable for commercial kitchen environments where water, steam, and grease are present. Use IP44 rated socket outlets with spring-loaded covers in general kitchen areas. In wet zones near sinks and wash-down areas, use IP65 rated outlets. All socket outlets must have RCD protection per Regulation 411.3.3 of BS 7671. Consider using industrial-type sockets (BS EN 60309, blue 240V or red 415V) for larger equipment connections.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/commercial-rewire-cost',
    title: 'Commercial Rewire Cost',
    description: 'Full commercial electrical installation costs including restaurant fit-outs.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Cost',
    description: 'Distribution board costs for commercial and domestic installations.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates for commercial kitchen installations.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote restaurant electrical work with equipment schedules and itemised pricing.',
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
    heading: 'Restaurant Kitchen Electrical Overview',
    content: (
      <>
        <p>
          Restaurant kitchen electrical installation is specialist commercial work that combines
          high-power equipment connections, safety-critical interlock systems, environmental
          protection requirements, and coordination with multiple trades. It is some of the most
          demanding and well-paid work an electrical contractor can undertake.
        </p>
        <p>
          The electrical installation must support heavy-duty cooking equipment (often 3-phase),
          commercial refrigeration, extraction and ventilation systems, lighting suitable for
          food preparation, and emergency provisions — all in a hot, wet, greasy environment
          that demands robust IP-rated equipment and containment.
        </p>
      </>
    ),
  },
  {
    id: 'three-phase',
    heading: '3-Phase Supply and Distribution',
    content: (
      <>
        <p>
          Most restaurant kitchens require a 3-phase electrical supply. The combined load of
          commercial cooking equipment, dishwashers, and refrigeration typically exceeds the
          capacity of a single-phase supply.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Typical Equipment Loads</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Combi oven (6 to 20 tray)</strong> — 10 to 30kW, 3-phase. The single
                largest electrical load in most commercial kitchens. Requires a dedicated circuit
                with an isolator adjacent to the appliance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial dishwasher</strong> — 8 to 20kW, typically 3-phase for
                pass-through and conveyor types. Single-phase under-counter dishwashers draw
                3 to 6kW.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Walk-in cold room</strong> — 2 to 8kW depending on size and temperature.
                Dedicated circuit with isolator. Compressor starting current can be 3 to 5 times
                the running current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extraction fan motor</strong> — 1.5 to 7.5kW depending on kitchen size.
                Often 3-phase for larger systems. Must be interlocked with the gas supply.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A 3-phase TPN distribution board with MCCB incomer costs £2,000 to £4,000 installed
          for a typical restaurant kitchen. If the premises does not have an existing 3-phase
          supply, a DNO application and upgrade costs £1,500 to £5,000 additional.
        </p>
      </>
    ),
  },
  {
    id: 'extraction',
    heading: 'Extraction Interlock and Gas Safety',
    content: (
      <>
        <p>
          The extraction interlock system is one of the most critical safety elements in a
          commercial kitchen. It ensures that gas cooking appliances cannot operate unless the
          extraction ventilation is running — preventing potentially fatal carbon monoxide
          build-up.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Interlock System Requirements</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gas solenoid valve</strong> — Installed on the gas supply pipe, controlled
                by the interlock system. Normally closed (fail-safe). Supply and install: £200 to
                £400 (by a Gas Safe registered engineer, with electrical connection by the
                electrician).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Current sensor or air pressure switch</strong> — Monitors that the
                extraction fan is running. A current sensor on the fan motor supply is the most
                common method. Air pressure switches across the duct are an alternative. Supply
                and install: £100 to £250.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Interlock control panel</strong> — Links the extraction monitoring to the
                gas solenoid valve. Provides status indication and fault alarm. Supply and
                install: £300 to £800.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency gas shut-off button</strong> — Red mushroom-head on yellow
                background, positioned near the kitchen exit. Supply and install: £80 to £150.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Total extraction interlock system cost: £800 to £2,000 depending on the number of gas
          appliances and the complexity of the extraction system. This is a legal requirement
          under the Gas Safety (Installation and Use) Regulations 1998 and IGEM/UP/19.
        </p>
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Ratings for Commercial Kitchens',
    content: (
      <>
        <p>
          Commercial kitchens are hostile environments for electrical equipment. Steam, water
          splash, grease, and regular wash-down mean that all electrical accessories and
          connections must be appropriately IP rated.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">General Kitchen Areas (IP44)</h3>
            <p className="text-white text-sm leading-relaxed">
              IP44 provides protection against splashing water from any direction and solid
              objects over 1mm. Suitable for general cooking areas, preparation surfaces, and
              serving areas. IP44 socket outlets with spring-loaded covers: £15 to £30 each.
              IP44 isolators for equipment connections: £20 to £45 each.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Wash-Down Zones (IP65)</h3>
            <p className="text-white text-sm leading-relaxed">
              IP65 provides protection against low-pressure water jets from any direction.
              Required near pot wash areas, dishwasher stations, and areas subject to
              floor-level wash-down. IP65 socket outlets: £25 to £50 each. IP65 light
              fittings: £40 to £80 each. IP65 junction boxes: £15 to £30 each.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'emergency-stop',
    heading: 'Emergency Stop and Isolation',
    content: (
      <>
        <p>
          Emergency stop and isolation provisions are critical safety requirements in commercial
          kitchens. Every piece of fixed equipment must have a local means of isolation, and the
          kitchen must have an emergency shut-off for gas and (optionally) electrical equipment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local isolators</strong> — Every fixed appliance requires a local isolator
                within 1 metre, clearly labelled. Rotary isolators (IP44 or IP65) cost £25 to £50
                each installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency gas shut-off</strong> — Large red mushroom-head button near the
                main exit. Activates the gas solenoid valve to shut off gas to all appliances.
                Cost: £80 to £150 installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency electrical isolation</strong> — Optional but recommended. A
                separate emergency button that disconnects all kitchen power circuits except
                lighting and emergency lighting. Cost: £150 to £300 installed.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cost-breakdown',
    heading: 'Cost Breakdown',
    content: (
      <>
        <p>
          Here is a realistic cost breakdown for restaurant kitchen electrical installation in 2026:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small cafe kitchen (£5,000 to £7,000)</strong> — Single-phase supply,
                4 to 6 equipment connections, basic extraction interlock, IP44 accessories,
                emergency lighting, 8 to 10 socket outlets. 3 to 5 days installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium restaurant kitchen (£8,000 to £12,000)</strong> — 3-phase supply,
                8 to 12 equipment connections including combi oven and dishwasher, full extraction
                interlock, IP44/IP65 accessories, emergency stop, emergency lighting, 15 to 20
                socket outlets. 1 to 2 weeks installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large commercial kitchen (£12,000 to £15,000+)</strong> — 3-phase supply
                with multiple sub-boards, 15+ equipment connections, walk-in cold rooms, extensive
                extraction interlock with multiple zones, full IP65 throughout, BMS integration,
                comprehensive emergency provisions. 2 to 3 weeks installation.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Quote restaurant kitchen electrical accurately"
          description="Elec-Mate's quoting app handles equipment schedules, interlock systems, IP-rated accessories, and commercial distribution. AI cost engineering validates your prices."
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
          Restaurant kitchen electrical installations must comply with several regulations and
          standards:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671:2018+A3:2024</strong> — The wiring regulations. RCD protection
                per Regulation 411.3.3 applies to all socket outlets up to 32A. Equipment
                connections must comply with the appropriate sections for the environment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gas Safety (Installation and Use) Regulations 1998</strong> — Requires
                extraction interlock for gas cooking appliances in commercial kitchens. The
                gas work must be done by a Gas Safe registered engineer; the electrical
                interlock wiring is the electrician's responsibility.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IGEM/UP/19</strong> — Design and application of interlock devices and
                associated systems for gas supply to commercial catering establishments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulatory Reform (Fire Safety) Order 2005</strong> — Requires emergency
                lighting and fire alarm provisions in commercial kitchen premises.
              </span>
            </li>
          </ul>
        </div>
        <p>
          An Electrical Installation Certificate (EIC) must be issued for the complete kitchen
          electrical installation. The extraction interlock system should be commissioned and
          a separate commissioning certificate provided.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Kitchen Electrical',
    content: (
      <>
        <p>
          Restaurant kitchen electrical work is specialist, high-value work. Here are practical
          tips for quoting these projects:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <UtensilsCrossed className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Get the Equipment Schedule Early</h4>
                <p className="text-white text-sm leading-relaxed">
                  Request the full kitchen equipment schedule from the kitchen design company
                  before quoting. You need the kW rating, voltage (single or 3-phase), and
                  connection type for every piece of fixed equipment. Do not guess — the
                  difference between a 10kW and a 30kW combi oven is significant.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Fan className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Coordinate with the Gas Engineer</h4>
                <p className="text-white text-sm leading-relaxed">
                  The extraction interlock requires close coordination between the electrician,
                  the gas engineer, and the ventilation contractor. Agree responsibilities
                  clearly before starting. The electrician typically provides the interlock
                  panel, wiring, and gas solenoid connection. The gas engineer commissions
                  the gas side.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Document Everything</h4>
                <p className="text-white text-sm leading-relaxed">
                  Commercial kitchen installations are subject to Environmental Health inspection.
                  Complete the{' '}
                  <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink> thoroughly,
                  photograph interlock wiring and emergency stop positions, and provide a clear
                  hand-over document to the client. This protects you and demonstrates
                  professionalism.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote commercial kitchen electrical projects"
          description="Elec-Mate's quoting app handles equipment schedules, interlock systems, IP-rated accessories, and 3-phase distribution for restaurant fit-outs. Professional PDF quotes."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function RestaurantKitchenElectricalCostPage() {
  return (
    <GuideTemplate
      title="Restaurant Kitchen Electrical Cost 2026 | UK Commercial Kitchen Guide"
      description="How much does restaurant kitchen electrical installation cost in 2026? UK guide covering 3-phase supply, extraction interlock, IP ratings, emergency stop, and realistic costs from £5,000 to £15,000."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Restaurant Kitchen Electrical Cost:{' '}
          <span className="text-yellow-400">UK Commercial Guide 2026</span>
        </>
      }
      heroSubtitle="What does restaurant kitchen electrical installation cost? This guide covers 3-phase supply, extraction interlock systems, IP ratings, emergency stop provisions, and realistic pricing from £5,000 to £15,000 — for restaurant owners and electrical contractors."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Restaurant Kitchen Electrical Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Restaurant Kitchen Electrical with Equipment Schedules"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for commercial kitchen quoting with equipment schedules, interlock costing, and professional PDF output. 7-day free trial."
    />
  );
}
