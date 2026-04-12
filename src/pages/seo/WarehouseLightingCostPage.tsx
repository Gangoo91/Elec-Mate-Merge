import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Calculator,
  Lightbulb,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Wrench,
  Building2,
  Gauge,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Warehouse Lighting Cost', href: '/guides/warehouse-lighting-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Warehouse Lighting Overview' },
  { id: 'high-bay', label: 'High Bay LED Fittings and Costs' },
  { id: 'lux-levels', label: 'Lux Levels and Lighting Design' },
  { id: 'emergency-lighting', label: 'Emergency Lighting Requirements' },
  { id: 'controls', label: 'Lighting Controls and Energy Savings' },
  { id: 'cost-per-fitting', label: 'Total Cost Per Fitting Installed' },
  { id: 'regulations', label: 'Regulations and Standards' },
  { id: 'for-electricians', label: 'For Electricians: Quoting Warehouse Lighting' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Warehouse LED high bay lighting costs £15 to £40 per fitting installed in 2026, depending on wattage, optical performance, mounting height, and control integration.',
  'The number of fittings depends on the required lux level: 100 lux for general storage, 150 lux for packing areas, 200 lux for inspection and quality areas, and 300 to 500 lux for detailed assembly work.',
  'Emergency lighting to BS 5266-1 is required in all warehouse premises. Self-contained emergency fittings or central battery systems add £3 to £8 per square metre.',
  'Lighting controls — daylight harvesting, occupancy sensing, and zonal dimming — can reduce warehouse lighting energy consumption by 40% to 60% and typically pay back within 2 to 3 years.',
  'A typical 1,000m² warehouse with 8-metre mounting height requires 20 to 30 high bay LED fittings for 150 lux, costing £8,000 to £15,000 fully installed including wiring, controls, and commissioning.',
];

const faqs = [
  {
    question: 'How much does warehouse LED lighting cost per fitting installed in 2026?',
    answer:
      'Warehouse LED high bay lighting costs £15 to £40 per fitting installed in 2026. A basic 100W LED high bay with chain suspension costs £15 to £22 installed. A 200W high bay with integrated sensor, DALI dimming, and specific optics for narrow aisle racking costs £28 to £40 installed. These prices include the fitting, cable from the distribution point, suspension or bracket mounting, connection, and basic commissioning. They do not include the distribution wiring from the board to the lighting circuit junction points.',
  },
  {
    question: 'How many high bay lights do I need for a warehouse?',
    answer:
      'The number of high bay fittings depends on the warehouse dimensions, mounting height, and the required lux level. As a rough guide for a standard warehouse with 8-metre mounting height: a 200W high bay typically illuminates 40 to 50 square metres to 150 lux. A 1,000m² warehouse therefore needs approximately 20 to 25 fittings at 150 lux. A proper lighting design calculation (using software such as DIALux or Relux) is essential for accurate fitting quantities and positioning.',
  },
  {
    question: 'What lux level is required in a warehouse?',
    answer:
      'Lux levels for warehouses are specified in BS EN 12464-1. General storage areas require 100 lux minimum. Packing, sorting, and dispatch areas require 150 lux. Inspection and quality control areas require 200 to 300 lux. Fine assembly or reading areas require 300 to 500 lux. Loading bays require 150 lux. The required lux level determines the number of fittings, their wattage, and the overall cost of the installation.',
  },
  {
    question: 'Do warehouses need emergency lighting?',
    answer:
      'Yes. Emergency lighting is required in all workplaces under the Regulatory Reform (Fire Safety) Order 2005 and must comply with BS 5266-1. In warehouses, emergency lighting must illuminate escape routes (minimum 1 lux on the centre line), exit signs, changes of direction, stairways, and areas of high risk (e.g. racking aisles where being stranded in darkness could be dangerous). Self-contained emergency luminaires are the most common choice for warehouses, with 3-hour duration being standard.',
  },
  {
    question: 'What lighting controls should be used in a warehouse?',
    answer:
      'Effective warehouse lighting controls include occupancy sensing (PIR or microwave sensors that switch off or dim lights in unoccupied zones), daylight harvesting (photocells that reduce artificial light output when natural daylight is sufficient), zonal control (grouping lights into zones that can be independently controlled), and time scheduling (automatic on/off at shift times). DALI-controlled high bay fittings provide the most flexibility. Controls typically add £3 to £8 per fitting but reduce energy consumption by 40% to 60%.',
  },
  {
    question: 'How much does it cost to replace old warehouse lighting with LED?',
    answer:
      'Replacing existing HID (metal halide or SON) high bay fittings with LED equivalents costs £20 to £35 per fitting where the existing wiring and suspension points can be reused. If new wiring is required, add £8 to £15 per fitting for cable runs. For a 1,000m² warehouse replacing 25 old fittings, the total cost is typically £800 to £1,200 for fittings only, or £1,500 to £2,500 including new wiring. The energy saving is typically 50% to 70%, with payback in 1 to 3 years depending on usage hours.',
  },
  {
    question: 'What is the lifespan of warehouse LED high bay lights?',
    answer:
      'Quality LED high bay fittings have a rated lifespan of 50,000 to 100,000 hours. In a warehouse operating 12 hours per day, 5 days per week, a 50,000-hour fitting lasts approximately 16 years. Higher-specification fittings rated at 100,000 hours can last 30+ years at the same usage. The driver (power supply) is typically the component that fails first — choose fittings with replaceable drivers to extend the useful life of the fitting.',
  },
  {
    question: 'Do I need a lighting design for warehouse lighting?',
    answer:
      'A proper lighting design calculation is strongly recommended for any warehouse lighting project. The design should be carried out using industry-standard software (DIALux or Relux) and should demonstrate compliance with BS EN 12464-1 for the specified activities. The design determines the number of fittings, their positioning, mounting height, and optical characteristics. Many LED manufacturers offer free lighting design services. As an electrician, having a verified lighting design protects you from disputes about inadequate light levels after installation.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/commercial-rewire-cost',
    title: 'Commercial Rewire Cost',
    description: 'Full commercial rewire costs including lighting as part of a larger project.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/car-park-lighting-cost',
    title: 'Car Park Lighting Cost',
    description: 'External lighting costs for car parks and loading areas.',
    icon: Lightbulb,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Complete Electrical Installation Certificates for commercial lighting projects.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote warehouse lighting with itemised fitting schedules and installation rates.',
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
    heading: 'Warehouse Lighting Overview',
    content: (
      <>
        <p>
          Warehouse lighting is one of the most significant electrical costs in industrial premises.
          The shift from traditional HID (metal halide and SON) fittings to LED high bays has
          transformed the economics of warehouse lighting — reducing energy consumption by 50% to
          70% and dramatically improving light quality and controllability.
        </p>
        <p>
          Whether you are a warehouse operator planning a lighting upgrade, a facilities manager
          comparing quotations, or an electrical contractor pricing a warehouse lighting project,
          this guide provides realistic per-fitting costs and practical guidance based on current UK
          market rates.
        </p>
      </>
    ),
  },
  {
    id: 'high-bay',
    heading: 'High Bay LED Fittings and Costs',
    content: (
      <>
        <p>
          LED high bay fittings have replaced metal halide and SON fittings in almost all new
          warehouse lighting projects. They offer superior light output per watt, instant start,
          excellent dimming capability, and lifespans of 50,000 to 100,000 hours.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">LED High Bay Fitting Costs (2026)</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>100W LED high bay</strong> — £60 to £90 supply price. 14,000 to 16,000
                lumens. Suitable for mounting heights of 4 to 6 metres. Covers approximately 25 to
                35m² at 150 lux. Installation cost: £15 to £22 per fitting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>150W LED high bay</strong> — £80 to £130 supply price. 21,000 to 24,000
                lumens. Suitable for 6 to 8 metre mounting heights. Covers approximately 35 to 45m²
                at 150 lux. Installation cost: £20 to £30 per fitting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>200W LED high bay</strong> — £120 to £180 supply price. 28,000 to 32,000
                lumens. Suitable for 8 to 12 metre mounting heights. Covers approximately 40 to 50m²
                at 150 lux. Installation cost: £25 to £35 per fitting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>240W+ LED high bay</strong> — £160 to £250 supply price. 34,000 to 40,000+
                lumens. For mounting heights above 12 metres or high lux level requirements.
                Installation cost: £30 to £40 per fitting.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Installation costs include mounting (chain suspension, bracket, or direct fix), connection
          to the lighting circuit, and basic commissioning. They do not include the distribution
          wiring from the board to the circuit junction points.
        </p>
      </>
    ),
  },
  {
    id: 'lux-levels',
    heading: 'Lux Levels and Lighting Design',
    content: (
      <>
        <p>
          The required lux level determines the number and specification of fittings needed. Lux
          levels for workplaces are specified in BS EN 12464-1:2021.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Required Lux Levels by Area</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>General storage — 100 lux</strong> — Racked storage with fork-lift
                operation. Lower fittings density, wider spacing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Packing and dispatch — 150 lux</strong> — The most common requirement for
                general warehouse operations including picking, packing, and dispatch.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection and quality — 200 to 300 lux</strong> — Areas where visual
                inspection of products or documents is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Assembly and detailed work — 300 to 500 lux</strong> — Production areas
                within warehouses where detailed manual work is carried out.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loading bays — 150 lux</strong> — External and internal loading areas where
                vehicles are loaded and unloaded.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A professional lighting design using DIALux or Relux software should be produced for every
          warehouse lighting project. This ensures compliance with BS EN 12464-1 and prevents
          disputes about light levels after installation.
        </p>
      </>
    ),
  },
  {
    id: 'emergency-lighting',
    heading: 'Emergency Lighting Requirements',
    content: (
      <>
        <p>
          Emergency lighting is a legal requirement in all warehouse premises under the Regulatory
          Reform (Fire Safety) Order 2005. The system must comply with BS 5266-1 and be designed to
          illuminate escape routes and high-risk areas in the event of a mains power failure.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Self-Contained Emergency</h3>
            <p className="text-white text-sm leading-relaxed">
              Self-contained emergency luminaires with integral batteries are the most common choice
              for warehouses. LED self-contained emergency fittings cost £30 to £80 each installed.
              High bay emergency fittings for mounting heights above 6 metres cost £80 to £150 each.
              3-hour duration is standard for most premises.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Central Battery Systems</h3>
            <p className="text-white text-sm leading-relaxed">
              Central battery systems supply emergency power to dedicated emergency luminaires or
              conversion kits built into standard fittings. Costs £5,000 to £15,000 for a typical
              warehouse system. More expensive to install but easier to maintain and test. The
              battery life is longer and more predictable than individual batteries.
            </p>
          </div>
        </div>
        <p>
          Emergency lighting in warehouses costs approximately £3 to £8 per square metre depending
          on the system type and the complexity of the escape routes. A 1,000m² warehouse typically
          requires 15 to 25 emergency luminaires plus illuminated exit signs.
        </p>
      </>
    ),
  },
  {
    id: 'controls',
    heading: 'Lighting Controls and Energy Savings',
    content: (
      <>
        <p>
          Lighting controls are essential for reducing energy consumption in warehouses. A
          well-designed control system can reduce lighting energy costs by 40% to 60%.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Occupancy sensing</strong> — Microwave or PIR sensors that dim or switch off
                lights in unoccupied zones. Particularly effective in racking aisles where
                individual aisles are only accessed intermittently. Savings: 20% to 40%.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Daylight harvesting</strong> — Photocells that reduce artificial light
                output when natural daylight through rooflights or translucent panels is sufficient.
                Effective in warehouses with good natural light. Savings: 15% to 30%.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DALI dimming</strong> — Digital Addressable Lighting Interface allows
                individual fitting control, zoning, and scene setting. Adds £5 to £10 per fitting
                but provides the maximum flexibility and energy savings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Time scheduling</strong> — Automatic on/off at shift times, reduced output
                during breaks, and overnight security lighting levels. Simple to implement with a
                time clock or BMS integration.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cost-per-fitting',
    heading: 'Total Cost Per Fitting Installed',
    content: (
      <>
        <p>
          Here is a summary of realistic total costs per fitting installed, including the fitting,
          wiring, mounting, controls, and commissioning.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Basic high bay (no controls): £15 to £22/fitting</strong> — 100W fitting,
                chain suspension, connection to existing wiring point. Suitable for simple storage
                areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mid-range high bay with sensor: £22 to £32/fitting</strong> — 150 to 200W
                fitting with integrated occupancy sensor, DALI dimmable. Includes new wiring from
                distribution point.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-spec high bay with full controls: £32 to £40/fitting</strong> — 200W+
                fitting with DALI dimming, daylight harvesting, occupancy sensing, and wireless
                commissioning. Includes containment, wiring, and full commissioning.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Quote warehouse lighting projects accurately"
          description="Elec-Mate's quoting app handles fitting schedules, per-fitting installation rates, and control system costing. AI cost engineering validates your prices against current market data."
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
        <p>Warehouse lighting installations must comply with several standards and regulations:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671:2018+A3:2024</strong> — The wiring regulations covering the
                electrical installation. RCD protection is required for lighting circuits in certain
                circumstances per Regulation 411.3.3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS EN 12464-1:2021</strong> — Lighting of indoor work places. Specifies
                minimum lux levels, uniformity ratios, and glare ratings for different work
                activities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 5266-1</strong> — Emergency lighting. Specifies minimum illumination on
                escape routes, duration, and testing requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electricity at Work Regulations 1989</strong> — Requires all electrical
                systems to be maintained in a safe condition.
              </span>
            </li>
          </ul>
        </div>
        <p>
          An Electrical Installation Certificate (EIC) must be issued for new lighting
          installations. Emergency lighting requires a separate commissioning certificate and an
          ongoing test log to BS 5266-1.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Warehouse Lighting',
    content: (
      <>
        <p>
          Warehouse lighting projects are profitable work that showcases your ability to deliver
          energy-efficient commercial installations. Here are tips for quoting these projects:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Get a Lighting Design First</h4>
                <p className="text-white text-sm leading-relaxed">
                  Always base your quote on a proper lighting design calculation. Most LED
                  manufacturers (Thorlux, Tamlite, Philips) offer free lighting design services. The
                  design gives you exact fitting quantities and positions, eliminating guesswork
                  from your quote.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Sell the Energy Savings</h4>
                <p className="text-white text-sm leading-relaxed">
                  Calculate the energy saving and payback period for the client. A warehouse
                  replacing 25 x 400W metal halide fittings with 25 x 150W LED high bays saves
                  approximately 6,250W — at 12 hours/day, 260 days/year, that is roughly 19,500 kWh
                  per year or £5,850 at 30p/kWh. Present this in your quote.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Access Equipment</h4>
                <p className="text-white text-sm leading-relaxed">
                  Factor in access equipment costs. Warehouse high bay installation typically
                  requires a MEWP (mobile elevating work platform) at £150 to £300 per day hire.
                  IPAF certification is required for operators. Include this in your quote as a
                  separate line item.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote warehouse lighting with fitting schedules"
          description="Elec-Mate's quoting app handles per-fitting pricing, access equipment, controls, and emergency lighting as separate line items. Professional PDF quotes with energy saving calculations."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function WarehouseLightingCostPage() {
  return (
    <GuideTemplate
      title="Warehouse Lighting Cost 2026 | LED High Bay UK Price Guide"
      description="How much does warehouse LED lighting cost in 2026? UK guide covering high bay LED fittings at £15-40 per fitting installed, lux levels, emergency lighting, controls, and energy savings."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Warehouse Lighting Cost:{' '}
          <span className="text-yellow-400">LED High Bay UK Guide 2026</span>
        </>
      }
      heroSubtitle="What does warehouse LED lighting cost? This guide covers high bay LED fittings at £15 to £40 per fitting installed, lux level requirements, emergency lighting, lighting controls, and realistic project costs for electricians and facilities managers."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Warehouse Lighting Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Warehouse Lighting with Per-Fitting Pricing"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for commercial lighting quotes with fitting schedules, energy saving calculations, and professional PDF output. 7-day free trial."
    />
  );
}
