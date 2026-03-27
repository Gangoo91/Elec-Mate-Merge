import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  Thermometer,
  PoundSterling,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  ClipboardCheck,
  ShieldCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/home-office-electrical-guide' },
  { label: 'Electric Boiler Installation', href: '/electric-boiler-installation' },
];

const tocItems = [
  { id: 'types', label: 'Types of Electric Boiler' },
  { id: 'sizing', label: 'Sizing — kW Calculation' },
  { id: 'wiring', label: 'Wiring Requirements (BS 7671)' },
  { id: 'part-p', label: 'Part P Notification' },
  { id: 'costs', label: 'Typical Installation Costs' },
  { id: 'vs-gas', label: 'Electric vs Gas Boiler' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Electric boilers require a dedicated radial circuit — typically 10mm\u00b2 twin and earth cable protected by a 45A double-pole MCB for boilers up to 9.6kW. Larger boilers (12kW to 15kW) may require 16mm\u00b2 cable on a 63A circuit. Always size the circuit from first principles using BS 7671 Chapter 43.',
  'The boiler kW output must be sized to meet the calculated heat loss of the property. A rough rule for well-insulated UK homes is 1kW per 10m\u00b2 of floor space, but a proper heat loss calculation per BS EN 12831 is required for accurate sizing.',
  'Electric boiler installation in a dwelling that involves a new circuit is notifiable work under Part P of the Building Regulations in England. A registered competent person (NICEIC, NAPIT, ELECSA) can self-certify and notify building control.',
  'Electric boilers cost between \u00a31,500 and \u00a35,000 to supply and install depending on the boiler type and output. Running costs are higher than gas in pence-per-kWh terms, but the lower installation cost and zero maintenance make them attractive for off-gas properties.',
  'Flow boilers (also called electric combi or combination boilers) provide both central heating and hot water on demand. Heat battery systems store energy in a ceramic core during cheap-rate periods, offering Economy 7-compatible operation.',
];

const faqs = [
  {
    question: 'Can an electric boiler replace a gas boiler directly?',
    answer:
      'Yes, in most cases an electric boiler can replace a gas boiler using the existing radiator and pipework. Electric boilers deliver hot water at similar flow temperatures to gas boilers (typically 55\u00b0C to 75\u00b0C), so existing radiators sized for a gas system are usually appropriate. The key difference is the electrical supply: the boiler requires a dedicated high-current circuit rather than a standard 13A socket. The gas supply pipe must be capped by a Gas Safe registered engineer. The electrical installation must be certificated and notified under Part P.',
  },
  {
    question: 'What size circuit does an electric boiler need?',
    answer:
      'The circuit size depends on the boiler output rating. For a 6kW boiler (26A), a 6mm\u00b2 cable on a 32A double-pole MCB is appropriate. For a 9kW boiler (39A), 10mm\u00b2 cable on a 45A MCB is standard. For a 12kW boiler (52A), 10mm\u00b2 on a 63A MCB should be checked for volt drop, or 16mm\u00b2 used. Always account for the installation method (clipped direct, in conduit, in insulation), grouping, and volt drop requirements of BS 7671. The circuit must terminate at a double-pole isolator adjacent to the boiler.',
  },
  {
    question: 'Does an electric boiler need a separate consumer unit?',
    answer:
      'A separate consumer unit is not a regulatory requirement, but may be practical if the existing consumer unit does not have sufficient ways or spare capacity. The boiler circuit needs a dedicated double-pole MCB (not shared with any other circuit). Where the existing board is an older rewirable fuse board or lacks RCD protection, upgrading to a modern split-load or RCBO consumer unit is strongly recommended before adding a high-current boiler circuit.',
  },
  {
    question: 'What is a heat battery electric boiler?',
    answer:
      'A heat battery (also called a thermal store or electric thermal storage boiler) stores heat in a high-density ceramic core, charged using cheap-rate electricity during Economy 7 off-peak periods. The stored heat is then used to provide central heating and domestic hot water throughout the day without drawing electricity at the high day rate. Examples include the Sunamp UniQ and Tepeo ZEB. They are particularly suited to homes switching from night storage heating where Economy 7 wiring already exists.',
  },
  {
    question: 'How do I calculate the right kW output for an electric boiler?',
    answer:
      'The correct method is a room-by-room heat loss calculation per BS EN 12831, which accounts for the building fabric U-values, infiltration, ventilation, and design temperatures. As a quick rule of thumb for a well-insulated UK property: allow approximately 1kW per 10m\u00b2 of heated floor area. A 3-bedroom semi-detached house of around 90m\u00b2 would therefore require approximately a 9kW boiler. Older, poorly insulated properties may need 1.5kW to 2kW per 10m\u00b2. Always err on the side of slightly oversized for comfort, but oversizing significantly increases electricity demand.',
  },
  {
    question: 'Is an electric boiler cheaper to run than gas?',
    answer:
      'No — at current UK energy prices, electricity costs approximately 3 to 4 times more per kWh than natural gas. A gas boiler at 90% efficiency costs roughly \u00a30.06 to \u00a30.07 per kWh of useful heat. An electric boiler at 100% efficiency costs approximately \u00a30.24 to \u00a30.28 per kWh of useful heat (at April 2024 price cap rates). However, electric boilers have lower installation costs, zero servicing costs, no combustion risk, and no carbon monoxide hazard. For off-gas properties (no gas grid connection), the alternative is often LPG or oil, which are similarly expensive. Pairing with a solar PV system can significantly reduce running costs.',
  },
  {
    question: 'Do electric boilers require annual servicing?',
    answer:
      'Electric boilers have far fewer moving parts than gas boilers and do not require an annual Gas Safe service. However, manufacturers typically recommend an annual check by a qualified electrician: inspecting the immersion element(s), anode condition, thermostat operation, pressure relief valve, and electrical connections. The electrical installation should also be checked periodically. An EICR on the supply circuit is recommended every 5 years or on change of occupancy.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/night-storage-heater-replacement',
    title: 'Night Storage Heater Replacement',
    description: 'Replacing old storage heaters with modern electric heating alternatives.',
    icon: Thermometer,
    category: 'Guide',
  },
  {
    href: '/fused-spur-installation-guide',
    title: 'Fused Spur Installation Guide',
    description: 'Installing fused connection units for fixed appliances.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord EICR obligations for rented properties.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'C1, C2, C3 and FI observation codes explained.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Generate compliant Electrical Installation Certificates on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'types',
    heading: 'Types of Electric Boiler',
    content: (
      <>
        <p>
          Electric boilers are available in several configurations, each suited to different
          property types and heating requirements. Understanding the differences helps electricians
          specify the right product and size the electrical supply correctly.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Flow Boilers (Electric Combi)</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Heat water as it flows through the boiler on demand — no stored hot water
                cylinder required. Available in outputs from 4kW to 14.4kW. Suitable for
                smaller properties with lower hot water demand. Examples: Comet, Heatrae Sadia
                Electromax, EHC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Direct replacement for a gas combi boiler. No cold water storage tank required.
                Requires a dedicated high-current circuit from the consumer unit.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Electric System Boilers (with Cylinder)</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Heat water in a separate hot water cylinder via a primary circuit. Suitable for
                larger properties with high hot water demand or multiple bathrooms. Output
                typically 6kW to 14.4kW. The cylinder may have its own immersion element as
                a backup.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Works well where a hot water cylinder already exists (replacing gas system boiler).
                Requires both a boiler circuit and a separate cylinder immersion circuit.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Heat Battery Systems</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Store thermal energy in a high-density ceramic core during off-peak periods
                (Economy 7 or Octopus Go tariffs). Release stored heat for both space heating
                and domestic hot water throughout the day. Sunamp UniQ and Tepeo ZEB are
                leading UK products.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Can significantly reduce running costs versus a standard flow boiler by using
                cheap-rate electricity. Require Economy 7 or time-of-use tariff to maximise
                savings. Physical footprint is compact relative to stored capacity.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'sizing',
    heading: 'Sizing an Electric Boiler — kW Calculation',
    content: (
      <>
        <p>
          Correct sizing is critical for both comfort and efficiency. An undersized electric
          boiler will fail to maintain design temperatures during cold weather. An oversized
          boiler wastes capital and may draw more current than the electrical installation
          can support.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Quick Reference Sizing Guide</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>1-bedroom flat (50m\u00b2):</strong> 4kW to 6kW boiler
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>2-bedroom house (70m\u00b2):</strong> 6kW to 9kW boiler
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>3-bedroom semi-detached (90m\u00b2):</strong> 9kW to 12kW boiler
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>4-bedroom detached (120m\u00b2):</strong> 12kW to 14.4kW boiler
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Older/poorly insulated property:</strong> add 30 to 50% to above figures
              </span>
            </li>
          </ul>
        </div>
        <p>
          These figures are indicative only. The correct approach is a full heat loss calculation
          per BS EN 12831 for the specific property, accounting for wall U-values, window area,
          floor and roof insulation, and local design temperature (typically -3\u00b0C for most of
          England, colder for Scotland and upland areas).
        </p>
        <p>
          For properties with existing radiators sized for a gas boiler running at 70\u00b0C flow
          temperature, the radiator system should cope well with an electric boiler. If upgrading
          to a heat pump at a later date, radiators sized for 55\u00b0C or lower may be needed.
        </p>
      </>
    ),
  },
  {
    id: 'wiring',
    heading: 'Wiring Requirements Under BS 7671',
    content: (
      <>
        <p>
          Electric boiler installation is one of the more demanding domestic electrical jobs in
          terms of current-carrying requirements. The dedicated radial circuit must be sized
          correctly and installed in accordance with BS 7671:2018+A3:2024.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Circuit Specifications by Boiler Output</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4kW to 6kW (17A to 26A):</strong> 6mm\u00b2 T&amp;E, 32A DP MCB
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6kW to 9.6kW (26A to 42A):</strong> 10mm\u00b2 T&amp;E, 45A DP MCB
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>9.6kW to 12kW (42A to 52A):</strong> 10mm\u00b2 T&amp;E on 63A MCB (check
                volt drop) or 16mm\u00b2 T&amp;E on 63A MCB
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>12kW to 15kW (52A to 65A):</strong> 16mm\u00b2 T&amp;E, 63A DP MCB
              </span>
            </li>
          </ul>
          <p className="text-sm text-white mt-4 opacity-80">
            Above figures assume installation method C (clipped direct, single circuit, no
            grouping derating) at an ambient temperature of 30\u00b0C. Adjust for actual
            installation conditions per BS 7671 Appendix 4.
          </p>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Double-pole isolation</strong> — Regulation 537.2.1 requires a means of
                isolation for each item of fixed equipment. For electric boilers, a lockable
                double-pole isolator switch adjacent to the boiler (typically within 2m) is
                standard practice. The isolator must interrupt both live and neutral conductors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — Regulation 411.3.3 requires 30mA RCD protection
                for circuits supplying fixed equipment in domestic premises. The boiler circuit
                MCB should be in a dual-RCD or RCBO consumer unit, or have a separate 30mA
                RCD upstream.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Volt drop check</strong> — for long cable runs from consumer unit to
                boiler (over 15m at high current), check that volt drop does not exceed 3% for
                lighting circuits or 5% for other circuits (BS 7671 Appendix 12). Use 16mm\u00b2
                cable on longer runs if 10mm\u00b2 gives excessive volt drop.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth bonding</strong> — confirm main protective bonding is in place for
                water and gas services per Regulation 411.3.1.2. Supplementary bonding within
                the airing cupboard or boiler room is not routinely required in modern
                installations meeting the main bonding requirement.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'part-p',
    heading: 'Part P Notification Requirements',
    content: (
      <>
        <p>
          The installation of an electric boiler in a dwelling involves adding a new circuit and
          is therefore notifiable work under Part P of the Building Regulations in England. The
          same principle applies in Wales. Scotland uses a different system (Building Standards)
          and Northern Ireland has its own regulations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Registered competent person:</strong> NICEIC, NAPIT, ELECSA, or other
                approved scheme members can self-certify and notify building control automatically.
                The homeowner receives a Building Regulations compliance certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-registered electrician:</strong> must notify the local authority
                building control (LABC) before starting work and pay the applicable inspection
                fee. Building control will inspect on completion and issue a compliance
                certificate if satisfactory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate:</strong> an EIC must be issued
                for any new circuit. Use the{' '}
                <SEOAppBridge href="/tools/eic-certificate" label="Elec-Mate EIC Certificate tool" />{' '}
                to generate a compliant certificate on-site.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Failure to notify can result in difficulty selling the property, as solicitors routinely
          request evidence of Part P compliance for electrical work done since 2005. A retrospective
          inspection can be arranged but costs more than the original notification.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Electric Boiler Installation Costs',
    content: (
      <>
        <p>
          Installation costs depend on the boiler output, type, distance from the consumer unit,
          whether an existing cylinder is being retained or replaced, and whether the consumer
          unit needs upgrading.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric flow boiler (6kW to 9kW), supply and fit:</strong> \u00a31,500 to \u00a32,800
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric flow boiler (12kW to 15kW), supply and fit:</strong> \u00a32,200 to \u00a34,000
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heat battery system (e.g. Tepeo ZEB):</strong> \u00a33,500 to \u00a35,500
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit upgrade (if required):</strong> \u00a3500 to \u00a31,200 additional
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>New 10mm\u00b2 or 16mm\u00b2 radial circuit (up to 15m):</strong> \u00a3250 to \u00a3600 additional
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gas pipe capping by Gas Safe engineer:</strong> \u00a380 to \u00a3200 (separate
                contractor, required when removing a gas boiler)
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'vs-gas',
    heading: 'Electric Boiler vs Gas Boiler',
    content: (
      <>
        <p>
          The choice between electric and gas is not always straightforward. Electric boilers
          have advantages that are often overlooked when comparing headline fuel costs.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Advantages of Electric Boilers</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>100% efficient — all electrical energy converted to heat, no flue losses</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>No annual Gas Safe service required — lower ongoing maintenance cost</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>No combustion products — zero carbon monoxide risk</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>No flue required — more flexible positioning within the property</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>Lower installation cost versus gas for off-gas properties</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>Grid electricity is increasingly low-carbon as renewable generation grows</span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Disadvantages</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>Higher fuel cost — electricity is 3 to 4x more expensive per kWh than gas at current prices</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>Limited maximum output — most electric boilers top out at 14.4kW versus gas boilers at 35kW+</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>May require significant electrical supply upgrades (consumer unit, meter capacity, DNO consent)</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians — Electric Boiler Installation Paperwork',
    content: (
      <>
        <p>
          Every electric boiler installation in a dwelling requires an Electrical Installation
          Certificate. Where the consumer unit is also upgraded, this must be included in the
          scope of the EIC. Elec-Mate provides all the certification tools needed for boiler
          installation jobs.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/tools/eic-certificate" label="Electrical Installation Certificate" />{' '}
                — generate compliant EICs for new boiler circuits with BS 7671 test results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/tools/eicr-certificate" label="EICR Certificate" />{' '}
                — inspect and report on the existing installation before adding the boiler circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOInternalLink href="/guides/eicr-observation-codes-explained" label="EICR observation codes" />{' '}
                — understand what to record when the existing installation has deficiencies.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricBoilerInstallationPage() {
  return (
    <GuideTemplate
      title="Electric Boiler Installation — Complete UK Guide 2024"
      description="Complete guide to installing an electric boiler in the UK: types, sizing (kW calculation), wiring requirements under BS 7671, Part P notification, costs (\u00a31,500\u2013\u00a35,000), and comparison with gas boilers."
      datePublished="2024-06-01"
      dateModified="2024-11-01"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Thermometer}
      heroTitle={
        <>
          Electric Boiler Installation{' '}
          <span className="text-yellow-400">— Complete UK Guide</span>
        </>
      }
      heroSubtitle="Everything you need to know about installing an electric boiler: types, correct sizing, BS 7671 circuit requirements, Part P notification, and realistic costs for UK properties."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Electric Boiler Installation — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Certificate electric boiler installations with Elec-Mate"
      ctaSubheading="Generate compliant EICs and EICRs on your phone. Start your free 7-day trial today."
    />
  );
}
