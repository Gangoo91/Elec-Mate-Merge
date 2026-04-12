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
  Thermometer,
  Home,
  Flame,
  SquareStack,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  {
    label: 'Underfloor Heating Electrical Cost',
    href: '/guides/underfloor-heating-electrical-cost',
  },
];

const tocItems = [
  { id: 'overview', label: 'Electric Underfloor Heating Overview' },
  { id: 'mat-cable-costs', label: 'Heating Mat and Cable Costs' },
  { id: 'thermostat', label: 'Thermostat and Controller Costs' },
  { id: 'circuit-requirements', label: 'Dedicated Circuit Requirements' },
  { id: 'insulation', label: 'Insulation and Floor Build-Up' },
  { id: 'running-costs', label: 'Running Costs Per Room' },
  { id: 'wet-vs-electric', label: 'Wet vs Electric Comparison' },
  { id: 'installation-costs', label: 'Total Installation Costs' },
  { id: 'for-electricians', label: 'For Electricians: Quoting UFH Work' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Electric underfloor heating mats and cables cost £30 to £60 per square metre for materials, with total installed costs of £60 to £120 per square metre including the thermostat, dedicated circuit, and labour.',
  'A dedicated radial circuit from the consumer unit is required for each UFH zone — typically a 16A or 20A circuit protected by an RCBO. Under BS 7671 Regulation 411.3.3, RCD protection with a rated residual operating current not exceeding 30 mA is required.',
  'Thermostats range from basic manual units at £50 to £80, through programmable models at £80 to £150, to smart WiFi thermostats at £150 to £200. The thermostat is critical for energy efficiency and comfort.',
  'Insulation boards beneath the heating element are essential for efficiency — without them, up to 50% of the heat can be lost downwards. Budget £8 to £15 per square metre for insulation boards.',
  'Running costs for electric UFH are approximately £0.15 to £0.25 per square metre per hour at 2026 electricity rates. A well-insulated bathroom (4 m²) costs roughly £0.60 to £1.00 per hour to heat.',
];

const faqs = [
  {
    question: 'How much does electric underfloor heating cost to install in 2026?',
    answer:
      'The total installed cost for electric underfloor heating in 2026 is approximately £60 to £120 per square metre, covering the heating mat or cable (£30 to £60/m²), insulation boards (£8 to £15/m²), thermostat (£50 to £200), dedicated circuit from the consumer unit (£150 to £300), and installation labour (£150 to £400 per room depending on size). A typical bathroom (4 m²) costs £500 to £900 total. A kitchen or living room (15 to 20 m²) costs £1,500 to £3,000.',
  },
  {
    question: 'Does electric underfloor heating need its own circuit?',
    answer:
      'Yes. Electric underfloor heating must be supplied by a dedicated radial circuit from the consumer unit, protected by an appropriately rated RCBO. A typical bathroom UFH system (600W) requires a 6A or 10A circuit. A larger room (2,000W to 3,000W) requires a 16A or 20A circuit. Under BS 7671 Regulation 411.3.3, RCD protection not exceeding 30 mA is required. The circuit must be correctly sized for the heating load using the cable sizing methods in Appendix 4 of BS 7671.',
  },
  {
    question: 'Is electric underfloor heating expensive to run?',
    answer:
      'Electric underfloor heating costs approximately £0.15 to £0.25 per square metre per hour at 2026 electricity rates (approximately 25p to 30p per kWh). A typical bathroom (4 m²) costs £0.60 to £1.00 per hour. However, UFH is typically thermostat-controlled and only runs intermittently to maintain temperature — a well-insulated room might cycle on for 15 to 20 minutes per hour once up to temperature. With a programmable thermostat, monthly running costs for a bathroom are typically £15 to £30.',
  },
  {
    question: 'What is the difference between heating mats and loose cable?',
    answer:
      'Heating mats are pre-spaced cables fixed to a fibreglass mesh, designed for quick installation in regularly shaped rooms. You simply roll out the mat, cut and turn where needed, and tile directly over it. Loose cable (also called heating cable or wire) is installed by hand in a serpentine pattern using fixing strips, giving more flexibility for irregular room shapes, around obstacles, and in areas where the heating density needs to vary. Mats are faster to install; loose cable is more versatile.',
  },
  {
    question: 'Can I install electric underfloor heating under any floor type?',
    answer:
      "Electric underfloor heating can be installed under most floor types including ceramic and porcelain tiles, natural stone, vinyl, laminate, and engineered wood. Tiles and stone are the best conductors and provide the most efficient heat transfer. Thick carpet and underlay act as insulators and significantly reduce efficiency — electric UFH is generally not recommended under carpet thicker than 1.5 tog. Always check the UFH manufacturer's guidance for maximum floor covering thermal resistance.",
  },
  {
    question: 'Is electric underfloor heating notifiable under Part P?',
    answer:
      'Adding a new dedicated circuit from the consumer unit for underfloor heating is notifiable work under Part P of the Building Regulations if the consumer unit is in a domestic dwelling. The electrical connection must be carried out by an electrician registered with a competent person scheme (NICEIC, NAPIT, ELECSA) who can self-certify the work. The heating mat or cable itself can be laid by anyone, but the electrical connection must be completed by a competent person.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Cost',
    description: 'If a new circuit is needed, you may need spare ways — see consumer unit pricing.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/rewire-cost-uk',
    title: 'Rewire Cost UK 2026',
    description: 'Full house rewire costs — UFH circuits are often added during a rewire project.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Issue Electrical Installation Certificates for new UFH circuits on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote underfloor heating installations with itemised materials and labour costs.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/air-source-heat-pump-electrical',
    title: 'Air Source Heat Pump Electrical',
    description:
      'Heat pump electrical requirements — often installed alongside UFH for maximum efficiency.',
    icon: Thermometer,
    category: 'Guide',
  },
  {
    href: '/guides/solar-panel-installation-electrical-cost',
    title: 'Solar Panel Electrical Cost',
    description: 'Solar PV can offset the running costs of electric underfloor heating systems.',
    icon: Zap,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Electric Underfloor Heating Overview',
    content: (
      <>
        <p>
          Electric underfloor heating (UFH) is one of the fastest-growing segments of domestic
          electrical work in the UK. It provides comfortable, even heat distribution across the
          floor surface, eliminates the need for radiators, and is particularly popular in
          bathrooms, kitchens, and extensions where warm floors are highly valued.
        </p>
        <p>
          For electricians, UFH work combines product supply, electrical installation, and often
          coordination with tilers and floor layers. It is a profitable add-on service that
          generates repeat work — once a customer has UFH in one room, they frequently want it in
          others.
        </p>
        <p>
          This guide covers the electrical costs of installing electric underfloor heating in 2026,
          including heating mats and cables, thermostats, dedicated circuits, insulation, and the
          factors that affect the total price.
        </p>
      </>
    ),
  },
  {
    id: 'mat-cable-costs',
    heading: 'Heating Mat and Cable Costs',
    content: (
      <>
        <p>
          The heating element is the core component of any electric UFH system. There are two main
          types: pre-formed heating mats and loose heating cable.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Heating Element Costs (Trade Prices)
          </h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard heating mat (150W/m²)</strong> — £30 to £45 per square metre trade.
                Pre-spaced cable on fibreglass mesh for quick installation in regularly shaped
                rooms. Available in standard sizes from 1 m² to 20 m². The most common choice for
                bathrooms, en-suites, and kitchens.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-output heating mat (200W/m²)</strong> — £40 to £55 per square metre
                trade. Higher wattage for rooms with greater heat loss, such as conservatories,
                ground-floor extensions over uninsulated concrete, and rooms with large glazed
                areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loose heating cable</strong> — £25 to £40 per square metre trade (cable
                only, plus £10 to £15 for fixing strips). More versatile for irregular room shapes
                and varying heat density. Requires more installation time but offers greater
                flexibility.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ultra-thin foil mat</strong> — £40 to £60 per square metre trade. Only 1.8mm
                thick, designed for installation under laminate and engineered wood without raising
                the floor level. Lower output (typically 140W/m²) but minimal floor build-up.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When selecting the heating element, calculate the heated area — not the total room area.
          Exclude areas under fixed furniture, bath panels, kitchen units, and sanitary ware. A
          typical bathroom has a heated area of 60% to 70% of the total floor area.
        </p>
      </>
    ),
  },
  {
    id: 'thermostat',
    heading: 'Thermostat and Controller Costs',
    content: (
      <>
        <p>
          The thermostat is critical for both comfort and energy efficiency. A good thermostat
          maintains the desired temperature without overheating and can reduce running costs by 20%
          to 40% compared with a simple on/off switch.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Thermostat Options</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Basic manual thermostat</strong> — £50 to £80. Simple dial or digital
                thermostat with floor sensor. Maintains a set temperature but no scheduling
                capability. Suitable for rooms used at irregular times.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Programmable thermostat</strong> — £80 to £150. 7-day programming with
                multiple time/temperature zones per day. Floor and air temperature sensors. The
                standard choice for most installations — set the heating to come on before the room
                is used and switch off when not needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart WiFi thermostat</strong> — £150 to £200. App-controlled with
                geofencing, learning algorithms, and integration with smart home systems (Alexa,
                Google Home). Offers the best energy efficiency through adaptive scheduling and
                remote control.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All thermostats require a floor sensor probe embedded in the screed or adhesive alongside
          the heating cable. The sensor probe is typically supplied with the thermostat. It must be
          installed in a conduit so it can be replaced without lifting the floor if it fails.
        </p>
      </>
    ),
  },
  {
    id: 'circuit-requirements',
    heading: 'Dedicated Circuit Requirements',
    content: (
      <>
        <p>
          Electric underfloor heating must be supplied by a dedicated radial circuit from the
          consumer unit. This is an essential part of the electrical installation and represents a
          significant portion of the electrician's work and cost.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit sizing</strong> — size the circuit for the total heating load. A
                bathroom mat (4 m² at 150W/m² = 600W, 2.6A) needs a 6A or 10A circuit. A kitchen (12
                m² at 150W/m² = 1,800W, 7.8A) needs a 10A or 16A circuit. A large living room (20 m²
                at 200W/m² = 4,000W, 17.4A) needs a 20A circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — under BS 7671 Regulation 411.3.3, RCD protection
                with a rated residual operating current not exceeding 30 mA is required. An RCBO at
                the consumer unit provides both overcurrent and earth leakage protection for the
                dedicated UFH circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable and containment</strong> — 2.5mm² twin and earth for circuits up to
                20A (typical). The cable runs from the consumer unit to a fused connection unit or
                the thermostat location. Cost for cable, containment, and back box: £50 to £150
                depending on distance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New circuit cost</strong> — £150 to £300 for the dedicated circuit including
                the RCBO (£35 to £55), cable, containment, and connection. If the consumer unit has
                no spare ways, a board upgrade may be needed — see our{' '}
                <SEOInternalLink href="/guides/consumer-unit-replacement-cost">
                  consumer unit replacement cost guide
                </SEOInternalLink>
                .
              </span>
            </li>
          </ul>
        </div>
        <p>
          The electrical connection to the heating mat or cable is made via the thermostat, which
          acts as the switching device. The cold tail (connection cable) from the heating element
          runs back to the thermostat location, along with the floor sensor probe in its conduit.
        </p>
      </>
    ),
  },
  {
    id: 'insulation',
    heading: 'Insulation and Floor Build-Up',
    content: (
      <>
        <p>
          Insulation boards beneath the heating element are essential for efficiency. Without
          insulation, a significant proportion of the heat radiates downwards into the subfloor
          rather than upwards into the room, wasting energy and increasing running costs.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <SquareStack className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation boards</strong> — £8 to £15 per square metre. Typically 6mm to
                10mm thick XPS (extruded polystyrene) or similar rigid insulation. Tile backer
                boards with built-in insulation serve a dual purpose and cost £10 to £20 per square
                metre.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <SquareStack className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Screed vs direct-to-tile</strong> — heating mats can be installed directly
                in tile adhesive (direct-to-tile method) for minimal floor build-up (3 to 5mm
                total). Alternatively, a self-levelling compound or screed (15 to 30mm) encapsulates
                the heating element and provides better heat distribution and thermal mass, but
                raises the floor level more. Screed costs £10 to £20 per square metre.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <SquareStack className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total floor build-up</strong> — direct-to-tile with insulation: 10 to 15mm.
                With screed and insulation: 25 to 45mm. Consider the impact on door clearances, step
                heights, and transitions to adjacent rooms. The floor build-up is a key factor in
                renovation projects.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'running-costs',
    heading: 'Running Costs Per Room',
    content: (
      <>
        <p>
          Understanding running costs is essential for advising customers and managing expectations.
          Electric underfloor heating is not cheap to run, but with proper insulation and thermostat
          control, costs can be kept reasonable.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Estimated Running Costs (2026 Electricity Rates)
          </h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bathroom (4 m² heated area, 150W/m²)</strong> — 600W load. Cost per hour at
                full output: approximately £0.17. With thermostat cycling (typically 30% to 50% duty
                cycle once warm): £0.05 to £0.09 per hour. Monthly cost (4 hours per day): £6 to
                £11.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kitchen (10 m² heated area, 150W/m²)</strong> — 1,500W load. Cost per hour
                at full output: approximately £0.42. With thermostat cycling: £0.13 to £0.21 per
                hour. Monthly cost (6 hours per day): £24 to £38.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Living room (18 m² heated area, 200W/m²)</strong> — 3,600W load. Cost per
                hour at full output: approximately £1.01. With thermostat cycling: £0.30 to £0.50
                per hour. Monthly cost (8 hours per day): £72 to £120.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These estimates assume an electricity rate of approximately 28p per kWh. Actual costs
          depend on room insulation, desired temperature, external temperature, floor covering
          thermal resistance, and thermostat programming. Electric UFH is most cost-effective in
          small, well-insulated rooms (bathrooms, en-suites) used for short periods. For larger
          rooms used as primary heating, a wet UFH system connected to a heat pump is typically more
          economical to run.
        </p>
      </>
    ),
  },
  {
    id: 'wet-vs-electric',
    heading: 'Wet vs Electric Comparison for Electricians',
    content: (
      <>
        <p>
          Electricians are frequently asked to advise on wet versus electric underfloor heating.
          Understanding the pros and cons of each system helps you give informed recommendations and
          upsell the appropriate solution.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Electric UFH</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Lower installation cost (£60 to £120/m²)</li>
              <li>Thinner floor build-up (10 to 15mm)</li>
              <li>Faster to install (hours, not days)</li>
              <li>No plumbing required — electrician-only job</li>
              <li>Ideal for single rooms, renovations, retrofits</li>
              <li>Higher running cost (electricity rates)</li>
              <li>Best suited to smaller rooms (bathrooms, kitchens)</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Wet (Hydronic) UFH</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Higher installation cost (£80 to £160/m²)</li>
              <li>Thicker floor build-up (50 to 75mm with screed)</li>
              <li>Longer installation (days to weeks)</li>
              <li>Requires plumber and electrician</li>
              <li>Ideal for new builds and whole-house heating</li>
              <li>Lower running cost (especially with heat pump)</li>
              <li>Best suited to larger areas and primary heating</li>
            </ul>
          </div>
        </div>
        <p>
          For electricians, electric UFH is the more accessible market — it does not require
          plumbing skills or coordination with other trades. Focus on bathrooms, kitchens,
          conservatories, and extensions where electric UFH is the most practical and cost-effective
          solution.
        </p>
      </>
    ),
  },
  {
    id: 'installation-costs',
    heading: 'Total Installation Costs by Room',
    content: (
      <>
        <p>
          Here are realistic total costs for electric underfloor heating installations in 2026,
          covering all materials, the dedicated circuit, and labour.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bathroom (4 m² heated area)</strong> — £500 to £900 total. Heating mat: £120
                to £180. Insulation: £35 to £60. Thermostat: £80 to £150. Dedicated circuit: £150 to
                £250. Labour: £150 to £300.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Kitchen (10 m² heated area)</strong> — £1,100 to £1,800 total. Heating mat:
                £300 to £450. Insulation: £80 to £150. Thermostat: £80 to £150. Dedicated circuit:
                £150 to £300. Labour: £250 to £400. Self-levelling compound (optional): £100 to
                £200.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Living room (18 m² heated area)</strong> — £1,800 to £3,000 total. Heating
                element (cable or mat): £540 to £1,080. Insulation: £145 to £270. Thermostat: £100
                to £200. Dedicated circuit: £200 to £300. Labour: £350 to £500. Self-levelling
                compound: £180 to £360.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservatory or extension (15 m² heated area)</strong> — £1,500 to £2,500
                total. High-output mat (200W/m²): £600 to £825. Insulation: £120 to £225.
                Thermostat: £100 to £200. Dedicated circuit: £200 to £300. Labour: £300 to £450.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Quote underfloor heating installations accurately"
          description="Elec-Mate's quoting app lets you itemise mats, thermostats, circuits, and labour with real trade pricing. AI cost engineering checks your prices against current data."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting UFH Work',
    content: (
      <>
        <p>
          Electric underfloor heating is an excellent add-on service that generates good margins and
          repeat business. Here are tips for quoting UFH work effectively:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Supply and Install Packages</h4>
                <p className="text-white text-sm leading-relaxed">
                  Offer complete supply-and-install packages rather than just the electrical
                  connection. Source the heating mats, thermostat, and insulation at trade prices
                  and mark them up. This increases the job value significantly and gives the
                  customer a single point of contact for the entire installation.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Insulation Resistance Testing</h4>
                <p className="text-white text-sm leading-relaxed">
                  Always test the heating mat or cable insulation resistance before, during, and
                  after installation. Test before laying (to confirm it arrived undamaged), after
                  laying but before tiling (to catch any damage during installation), and after
                  tiling (final test). Record all readings on the{' '}
                  <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink>. A damaged
                  heating element discovered after tiling means the entire floor must be lifted.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Coordinate with Tilers</h4>
                <p className="text-white text-sm leading-relaxed">
                  UFH installation typically happens between the electrician and the tiler. Lay the
                  mat, make your connections, test, and hand over to the tiler. If the customer has
                  their own tiler, provide clear instructions about not cutting or damaging the
                  heating cables. Consider attending site when the tiler starts to supervise the
                  first few tiles over the mat.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify UFH installations faster"
          description="Join 1,000+ UK electricians using Elec-Mate for quoting, cable sizing, and on-site EIC certification. Everything you need for underfloor heating work. 7-day free trial."
          icon={Wrench}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function UnderfloorHeatingElectricalCostPage() {
  return (
    <GuideTemplate
      title="Underfloor Heating Electrical Cost UK 2026 | Price Guide"
      description="How much does electric underfloor heating cost in 2026? Complete UK price guide covering heating mats, cables, thermostats, dedicated circuits, insulation, running costs, and wet vs electric comparison. Real trade pricing for electricians."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Underfloor Heating Electrical Cost:{' '}
          <span className="text-yellow-400">UK Price Guide 2026</span>
        </>
      }
      heroSubtitle="How much does electric underfloor heating cost to install? This guide covers heating mat and cable costs, thermostats, dedicated circuit requirements, insulation, running costs, and the wet vs electric debate — practical pricing for electricians and homeowners alike."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Underfloor Heating Electrical Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Underfloor Heating with Real Trade Pricing"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for quoting with live trade prices, on-site EIC certificates, and AI-powered cost engineering. 7-day free trial, cancel anytime."
    />
  );
}
