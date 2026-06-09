import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  Sun,
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  Calculator,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/home-office-electrical-guide' },
  { label: 'Solar PV System Sizing', href: '/solar-pv-system-sizing' },
];

const tocItems = [
  { id: 'sizing-principles', label: 'Solar PV Sizing Principles' },
  { id: 'kwp-calculation', label: 'kWp Calculation Methods' },
  { id: 'orientation-tilt', label: 'Orientation and Tilt Factors' },
  { id: 'mcs-g98-g99', label: 'MCS Standards and G98/G99 Thresholds' },
  { id: 'bs7671-712', label: 'BS 7671 Section 712' },
  { id: 'battery-storage', label: 'Battery Storage Integration' },
  { id: 'dno-export', label: 'DNO Connection and Export Limiting' },
  { id: 'faq', label: 'FAQ' },
];

const keyTakeaways = [
  "System size in kilowatt-peak (kWp) is determined by the available roof area, the household's annual electricity consumption, and the orientation and tilt of the roof surface. A typical UK 3-bed home uses 3,100 kWh per year and is well served by a 3.5kWp to 4kWp system.",
  'MCS (Microgeneration Certification Scheme) accreditation is required for solar PV installations where customers wish to access the Smart Export Guarantee (SEG) or claim compliance with MCS standards. Without MCS, the installation cannot be formally certified to the scheme.',
  'Systems up to 3.68kW single-phase (16A per phase) can be notified to the DNO under the simplified G98 procedure after installation. Larger systems require a G99 application with prior DNO approval — which must be obtained before installation begins.',
  'BS 7671:2018+A4:2026 Section 712 covers photovoltaic power supply systems and applies to all solar PV electrical installations. Key requirements include DC isolators at the array and inverter, protection against reverse current, and appropriate labelling throughout the installation.',
  'SAP (Standard Assessment Procedure) calculations are used for new-build solar PV sizing under Building Regulations Part L. For retrofit installations, energy monitoring data or EPC assessments provide the consumption baseline for sizing calculations.',
  'Battery storage integration requires careful consideration of protection coordination, particularly where export limiting is applied. The PV side is assessed under BS 7671 Section 712, while energy storage falls under the prosumer installation requirements of Section 826, together with the relevant product standards.',
];

const faqs = [
  {
    question: 'How do I calculate the right solar PV system size for a UK home?',
    answer:
      'The standard approach to solar PV sizing for UK homes uses three inputs: annual electricity consumption (from bills or EPC), available roof area, and roof orientation and tilt. A rule of thumb is 1kWp of solar PV generates approximately 850 to 1,100 kWh per year in the UK, depending on location and orientation. For a home using 3,100 kWh per year, a 3.5kWp to 4kWp system will generate roughly 80% to 110% of annual consumption (accounting for self-consumption rates of around 40% to 50% without battery storage). Each 1kWp of standard monocrystalline panels requires approximately 5 to 6 square metres of unshaded roof area. MCS-certified installers use MCS 001 (Product Certification) and the MCS Planning Standards to produce formally compliant sizing calculations.',
  },
  {
    question: 'What is the difference between G98 and G99 for solar PV installations?',
    answer:
      'G98 and G99 are DNO connection engineering recommendations for generating systems connected to the low voltage (LV) distribution network. G98 applies to systems up to 3.68kW single-phase (or 11.04kW three-phase) — these can be connected and then notified to the DNO within 28 days of commissioning without prior approval. G99 applies to systems larger than these thresholds and requires a formal application to the DNO before installation. The DNO has up to 45 working days to assess a standard G99 application for a residential system, and 90 days for more complex assessments. Failing to apply under G99 before installing an oversized system can result in the DNO requiring the system to be disconnected.',
  },
  {
    question: 'What does BS 7671 Section 712 require for solar PV installations?',
    answer:
      'BS 7671:2018+A4:2026 Section 712 (Solar photovoltaic (PV) power supply systems) sets out the specific requirements for solar PV electrical installations. Key requirements include isolation on both the AC and DC sides (Regulation 712.537.2); overvoltage protection and surge protective device selection on the DC side (Regulation 712.534); identification and warning notices indicating the presence of a PV system and that DC parts can remain live after isolation (Regulation 712.514); DC cables selected to minimise earth-fault and short-circuit risk, using H1Z2Z2-K cable to BS EN 50618 or equivalent (Regulation 712.521.101); and equipotential bonding of the PV mounting structure where required (Regulation 712.542.101). Note that the former Regulation 712.443 was deleted by A4:2026.',
  },
  {
    question: 'How does battery storage affect the electrical installation requirements?',
    answer:
      'Battery storage adds complexity to solar PV electrical installations in several areas. Protection coordination: the battery management system (BMS) and inverter-charger must be assessed together to ensure fault current protection operates correctly under both import and export conditions. Energy storage forms part of a prosumer\'s electrical installation, which BS 7671:2018+A4:2026 addresses in Section 826, and the equipment must comply with its relevant product standard. Export limiting: where a DNO requires export limiting as a condition of G99 approval, the inverter must have an active export limiter with current transformer (CT) monitoring at the grid connection point. Fire safety: battery storage systems must be positioned in accordance with manufacturer requirements and relevant fire safety guidance — lithium-ion batteries should not be installed in habitable rooms without appropriate fire protection.',
  },
  {
    question: 'Do I need MCS accreditation to install solar PV in the UK?',
    answer:
      'MCS accreditation is not legally required to install solar PV in the UK — Part P and G98/G99 compliance are the statutory requirements. However, MCS accreditation is required for customers to access the Smart Export Guarantee (SEG), which allows them to receive payment for electricity exported to the grid. Without MCS accreditation, the installer cannot certify the installation to MCS standards, and the customer cannot apply to an SEG licensed electricity supplier for export payments. For most residential customers, the ability to earn SEG income is a significant factor in the return on investment calculation, so in practice most reputable solar PV installers hold MCS accreditation.',
  },
  {
    question: 'What are the DNO export limiting requirements for solar PV?',
    answer:
      'Export limiting (also called active network management or ANM) may be required by the DNO as a condition of G99 approval where the local network does not have sufficient export capacity for the full output of the proposed system. In an export-limited installation, the inverter is fitted with a current transformer at the grid connection point that monitors export and throttles inverter output to stay within the approved export limit (often 3.68kW single-phase or a site-specific limit). Export limiting must be implemented using a DNO-approved method — some DNOs specify particular inverter brands or communication protocols. Export-limited systems must be re-notified to the DNO if the export limit changes, and the limitation must be clearly documented in the G99 agreement.',
  },
  {
    question: 'What orientation and tilt angles give the best solar PV output in the UK?',
    answer:
      'In the UK, south-facing roofs at a tilt angle of 35 to 40 degrees give the maximum annual output — typically 950 to 1,100 kWh per kWp depending on location (higher in the South West and lower in Scotland). East-west split systems (two arrays facing east and west at around 20 to 30 degrees) can increase self-consumption by spreading generation across the morning and afternoon, typically achieving 80% to 85% of the yield of an equivalent south-facing system. North-facing roofs are generally not viable — output is typically 50% to 60% of a south-facing installation. Shading is the most significant yield reduction factor: even partial shading on one module in a string can significantly reduce whole-string output unless the system uses module-level power electronics (microinverters or DC optimisers).',
  },
];

const answerBox = {
  question: 'What size solar PV system do I need for a UK home?',
  answer:
    'Match system size to your annual electricity use, roof area and orientation. A typical UK home uses about 3,100 kWh per year and suits a 3.5–4 kWp system, since each 1 kWp generates roughly 850–1,100 kWh annually. Systems up to 3.68 kW single-phase can be notified to the DNO under G98; larger systems need prior G99 approval. Each panel needs around 1.7–2.0 m² of unshaded roof.',
};

const relatedPages: RelatedPage[] = [
  {
    href: '/solar-pv-system-design',
    title: 'Solar PV System Design',
    description: 'String design, inverter sizing, string voltage limits, and DC array layout.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/solar-pv-certificate',
    title: 'Solar PV Certificates',
    description: 'EIC and MCS handover documentation required for a compliant PV installation.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/solar-pv-maintenance',
    title: 'Solar PV Maintenance',
    description: 'Inspection, testing, and periodic maintenance for PV arrays and inverters.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/electrical-load-calculation',
    title: 'Electrical Load Calculation',
    description: 'How to calculate electrical load for domestic and commercial premises.',
    icon: Calculator,
    category: 'Guide',
  },
  {
    href: '/cable-management-systems',
    title: 'Cable Management Systems',
    description: 'Conduit, trunking, cable tray, and basket tray — fill ratios and BS standards.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: FileCheck2,
    category: 'Guide',
  },
];

const sections = [
  {
    id: 'sizing-principles',
    heading: 'Solar PV Sizing Principles for UK Homes',
    content: (
      <>
        <p>
          Sizing a solar PV system correctly is the single most important design decision in a
          domestic solar installation. An undersized system leaves energy potential on the table; an
          oversized system generates electricity that cannot be consumed or exported within
          permitted limits. The goal is to match system output to the household's self-consumption
          pattern and DNO export constraints.
        </p>
        <p>
          The unit of solar PV capacity is the kilowatt-peak (kWp) — the power output of the array
          under Standard Test Conditions (STC: 1,000 W/m² irradiance, 25°C cell temperature, 1.5 air
          mass spectrum). In real UK conditions, the array output is always lower than kWp due to
          irradiance, temperature, and angle effects.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual yield estimate:</strong> South-facing, 35° tilt, south England —
                approximately 950 to 1,100 kWh per kWp per year. Scotland — approximately 750 to 900
                kWh per kWp per year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical UK home consumption:</strong> 3,100 kWh per year (Ofgem typical
                domestic consumption values 2024). High-consumption homes (electric heating, EV
                charging) may use 5,000 to 10,000+ kWh per year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-consumption rate:</strong> Without battery storage, typically 25% to
                40% of solar generation is self-consumed. With battery storage, this rises to 60% to
                80% depending on battery capacity and household demand profile.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'kwp-calculation',
    heading: 'kWp Calculation Methods',
    content: (
      <>
        <p>
          MCS-certified solar PV installers use formal design tools — including the MCS Planning
          Standards methodology and tools such as PVGIS (Photovoltaic Geographic Information System)
          — to produce accurate yield estimates and system sizing calculations. The following
          simplified approach is useful for initial assessments; once the capacity is fixed, the{' '}
          <SEOInternalLink href="/solar-pv-system-design" label="solar PV system design guide" />{' '}
          covers string layout, inverter sizing, and DC voltage limits.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Step-by-Step Sizing Method</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1 — Establish annual consumption:</strong> Obtain annual kWh
                consumption from electricity bills or EPC. Use Ofgem typical values if bills are
                unavailable (3,100 kWh for medium household).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2 — Calculate target generation:</strong> For a self-consumption
                optimised system, target generation of 100% to 130% of annual consumption (excess is
                exported via SEG). For a net-zero target, account for EV charging and heat pump
                loads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3 — Estimate kWp required:</strong> Divide target annual generation
                (kWh) by estimated specific yield (kWh/kWp/year from PVGIS for the specific
                location, orientation, and tilt). Round up to the nearest whole module count.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4 — Check roof area:</strong> Each 400Wp panel occupies approximately
                1.7m² to 2.0m². Multiply panel count by panel area and add 15% for spacing, verge
                margins, and ridge clearance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 5 — Check G98/G99 threshold:</strong> If the resulting kWp exceeds
                3.68kW single-phase, a G99 application is required before installation can proceed.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'orientation-tilt',
    heading: 'Orientation and Tilt Factors',
    content: (
      <>
        <p>
          The orientation (azimuth) and tilt (inclination) of a solar array have a significant
          effect on annual energy yield. The PVGIS tool, maintained by the European Commission's
          Joint Research Centre, provides location-specific yield estimates for any combination of
          tilt and orientation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <h3 className="text-lg font-semibold text-white px-5 pt-5 pb-1">
            Orientation Yield Factors (South England Reference)
          </h3>
          <p className="text-white/50 text-xs px-5 pb-3">
            Indicative relative annual yield versus an optimal south-facing array. Use PVGIS for the
            specific site, location and tilt.
          </p>
          <div className="grid grid-cols-[1fr_auto] text-sm divide-y divide-white/10 border-t border-white/10">
            <div className="px-5 py-3 text-white/50 text-xs uppercase tracking-wide">Orientation &amp; tilt</div>
            <div className="px-5 py-3 text-white/50 text-xs uppercase tracking-wide text-right">Relative yield</div>

            <div className="px-5 py-3 text-white bg-green-900/20">South (180°), 35–40° tilt</div>
            <div className="px-5 py-3 text-green-300 font-semibold text-right bg-green-900/20">100%</div>

            <div className="px-5 py-3 text-white">South-East / South-West (135° / 225°), 35° tilt</div>
            <div className="px-5 py-3 text-white font-semibold text-right">~95%</div>

            <div className="px-5 py-3 text-white">East / West (90° / 270°), 25–30° tilt</div>
            <div className="px-5 py-3 text-white font-semibold text-right">~80–85%</div>

            <div className="px-5 py-3 text-white">Flat roof, ballasted at 10–15° tilt</div>
            <div className="px-5 py-3 text-white font-semibold text-right">~87%</div>

            <div className="px-5 py-3 text-white">North-East / North-West, any tilt</div>
            <div className="px-5 py-3 text-amber-300 font-semibold text-right">~65–70%</div>

            <div className="px-5 py-3 text-white bg-red-900/20">North (0°), any tilt — marginal</div>
            <div className="px-5 py-3 text-red-300 font-semibold text-right bg-red-900/20">~50–60%</div>
          </div>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shading:</strong> Even partial shading on a single cell in a string can
                reduce the output of all modules in that string. Always carry out a shading analysis
                using a solar pathfinder, SunEye tool, or PVGIS shading assessment before finalising
                the design. Consider microinverters or DC optimisers for shaded installations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'mcs-g98-g99',
    heading: 'MCS Standards and G98/G99 Notification Thresholds',
    content: (
      <>
        <p>
          Two separate certification and notification frameworks apply to residential solar PV
          installations in the UK: MCS (Microgeneration Certification Scheme) for quality and SEG
          eligibility, and G98/G99 for DNO connection requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">MCS Requirements</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                MCS 001 — Solar PV product certification standard (modules and inverters must be
                certified to the relevant IEC standards and registered on MCS)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                MCS 005 — Installer certification standard. The installation company must hold MCS
                005 certification for solar PV to issue an MCS certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                MCS certificate required for Smart Export Guarantee (SEG) application — without it
                the customer cannot receive SEG export payments.
              </span>
            </li>
          </ul>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-900/20 border border-green-700/40 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-green-300" />
              <h3 className="text-lg font-semibold text-white m-0">G98 — notify after install</h3>
            </div>
            <dl className="space-y-2 text-sm m-0">
              <div className="flex justify-between gap-4">
                <dt className="text-white/60">Single-phase</dt>
                <dd className="text-white font-semibold text-right m-0">Up to 3.68 kW (16 A)</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-white/60">Three-phase</dt>
                <dd className="text-white font-semibold text-right m-0">Up to 11.04 kW (16 A/phase)</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-white/60">Approval</dt>
                <dd className="text-white font-semibold text-right m-0">Notify DNO within 28 days of commissioning</dd>
              </div>
            </dl>
          </div>
          <div className="rounded-2xl bg-blue-900/30 border border-blue-700/40 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-blue-300" />
              <h3 className="text-lg font-semibold text-white m-0">G99 — apply before install</h3>
            </div>
            <dl className="space-y-2 text-sm m-0">
              <div className="flex justify-between gap-4">
                <dt className="text-white/60">Applies to</dt>
                <dd className="text-white font-semibold text-right m-0">Any system above the G98 thresholds</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-white/60">Standard assessment</dt>
                <dd className="text-white font-semibold text-right m-0">Up to 45 working days (residential)</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-white/60">Complex sites</dt>
                <dd className="text-white font-semibold text-right m-0">Up to 90 working days</dd>
              </div>
            </dl>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'bs7671-712',
    heading: 'BS 7671 Section 712 — Photovoltaic Systems',
    content: (
      <>
        <p>
          Section 712 of BS 7671:2018+A4:2026 sets out the specific additional requirements for
          photovoltaic power supply systems. These requirements supplement the general requirements
          of BS 7671 and apply to all solar PV electrical installations, regardless of system size.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="grid grid-cols-[auto_1fr] divide-y divide-white/10">
            <div className="contents text-xs uppercase tracking-wide text-white/50">
              <div className="px-4 py-3 font-semibold border-b border-white/10">Regulation</div>
              <div className="px-4 py-3 font-semibold border-b border-white/10">Requirement</div>
            </div>
            <div className="px-4 py-4 font-mono text-yellow-400 text-sm whitespace-nowrap">712.537.2</div>
            <div className="px-4 py-4 text-white text-sm">
              <strong className="block text-white">Isolation and switching</strong>
              Means of isolation must be provided on both the AC and DC sides. Devices without DC
              breaking capacity (such as fuse carriers and SPD carriages) that could open a DC circuit
              must be secured against inadvertent operation, for example by a lockable enclosure or
              padlocking (Regulation 712.537.2.2.104).
            </div>
            <div className="px-4 py-4 font-mono text-yellow-400 text-sm whitespace-nowrap">712.534</div>
            <div className="px-4 py-4 text-white text-sm">
              <strong className="block text-white">Overvoltage protection (SPDs)</strong>
              Surge protective devices on the DC side must comply with BS EN 61643-31. SPDs are
              generally Type 2 with a minimum nominal discharge current of 5 kA; Type 1 SPDs apply
              where lightning separation distance cannot be maintained per BS EN 62305-3.
            </div>
            <div className="px-4 py-4 font-mono text-yellow-400 text-sm whitespace-nowrap">712.514</div>
            <div className="px-4 py-4 text-white text-sm">
              <strong className="block text-white">Identification and notices</strong>
              An instruction notice indicating the presence of a PV system must be fixed at the origin,
              the metering position and the consumer unit (712.514.101). Each DC access point needs a
              warning that live parts can remain energised after isolation (712.514.102), and every
              inverter must be labelled to isolate both AC and DC before servicing (712.514.103).
            </div>
            <div className="px-4 py-4 font-mono text-yellow-400 text-sm whitespace-nowrap">712.521.101</div>
            <div className="px-4 py-4 text-white text-sm">
              <strong className="block text-white">DC wiring system</strong>
              DC cables must be selected and erected to minimise earth-fault and short-circuit risk,
              using single-core non-metallic-sheathed cable such as H1Z2Z2-K to BS EN 50618, or
              insulated conductors in individually insulated conduit or trunking. Cables must not be
              placed directly on the roof surface.
            </div>
            <div className="px-4 py-4 font-mono text-yellow-400 text-sm whitespace-nowrap">712.533.101</div>
            <div className="px-4 py-4 text-white text-sm">
              <strong className="block text-white">DC overcurrent protection</strong>
              DC-side overcurrent protective devices must be gPV fuses to BS EN 60269-6 or
              circuit-breakers to BS EN 60947-2 / BS EN 60898-2 / BS IEC 60898-3, and must be
              bidirectional with a breaking capacity at least equal to the array short-circuit current.
            </div>
            <div className="px-4 py-4 font-mono text-yellow-400 text-sm whitespace-nowrap">712.542.101</div>
            <div className="px-4 py-4 text-white text-sm">
              <strong className="block text-white">Equipotential bonding of PV structures</strong>
              Where bonding is needed to prevent electrostatic charge accumulation, the metallic
              support structures and cable management must be bonded; functional bonding conductors
              must be at least 4 mm² copper equivalent (712.542.3.101).
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <p className="text-white text-sm m-0">
              <strong>A4:2026 change:</strong> the former Regulation 712.443 was deleted by
              BS 7671:2018+A4:2026. Always cite the current numbering — DC-side overvoltage and SPD
              requirements now sit under Regulation 712.534. Outdoor PV enclosures must achieve at
              least IP44 to BS EN 60529 and IK07 to BS EN 62262 (Regulation 712.512.102).
            </p>
          </div>
        </div>
        <p>
          See the{' '}
          <SEOInternalLink
            href="/guides/eicr-observation-codes-explained"
            label="EICR observation codes guide"
          />{' '}
          for how non-compliance with Section 712 requirements is typically graded on electrical
          inspection reports.
        </p>
      </>
    ),
  },
  {
    id: 'battery-storage',
    heading: 'Battery Storage Integration',
    content: (
      <>
        <p>
          Battery storage is increasingly standard in new solar PV installations, and a growing
          number of existing systems are being retrofitted with battery storage. Integrating battery
          storage introduces additional electrical design and safety considerations under BS 7671
          and the relevant product standards.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-white font-semibold mb-1">Standards and product compliance</h4>
                <p className="text-white/80 text-sm m-0">
                  Battery storage forms part of a prosumer&apos;s electrical installation, addressed
                  in BS 7671:2018+A4:2026 Section 826. The battery system must comply with its
                  relevant product standard, and the combined inverter-battery system must satisfy the
                  PV requirements of Section 712.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-white font-semibold mb-1">AC-coupled vs DC-coupled</h4>
                <p className="text-white/80 text-sm m-0">
                  AC-coupled batteries have their own inverter-charger and are simpler to retrofit.
                  DC-coupled batteries connect to the PV inverter&apos;s DC bus and are more efficient
                  but need a compatible inverter/battery pairing. Both require G98/G99 assessment as a
                  combined system.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 sm:col-span-2">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-white font-semibold mb-1">Fire safety and siting</h4>
                <p className="text-white/80 text-sm m-0">
                  Lithium-ion battery systems should not be installed in habitable rooms without fire
                  separation meeting the manufacturer&apos;s requirements. Enclosures should vent
                  thermal runaway to outside where practicable. Manufacturer installation instructions
                  must be followed and taken into account as part of equipment selection and erection
                  under BS 7671.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'dno-export',
    heading: 'DNO Connection Requirements and Export Limiting',
    content: (
      <>
        <p>
          All solar PV systems in Great Britain must be registered with the relevant DNO under G98
          or G99. Some DNOs impose export limiting as a condition of G99 approval where the local
          network has insufficient export headroom.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Export limit setting:</strong> Where a DNO requires export limiting, the
                approved export limit (in kW or A) is specified in the G99 agreement. The inverter
                must be configured with the export limiter active, with a current transformer (CT)
                clamp on the grid supply cable, before commissioning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zero export (export prevention):</strong> Some DNOs or property types
                (leasehold, shared supplies) require zero export — the system is configured to
                prevent any export to the grid. This significantly reduces self-consumption rate and
                requires careful sizing to avoid wasted generation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation:</strong> The G99 agreement (or G98 notification confirmation)
                must be retained with the installation documentation and provided to the customer
                alongside the EIC. Use{' '}
                <SEOAppBridge href="/tools/eicr-certificate" label="Elec-Mate" /> to manage EIC
                certificates for solar PV installations.
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

export default function SolarPVSystemSizingPage() {
  return (
    <GuideTemplate
      title="Solar PV System Sizing — UK Guide | kWp Calculation & G98/G99"
      description="How to size a solar PV system for UK homes: kWp calculation methods, orientation and tilt factors, MCS standards, G98/G99 DNO notification thresholds, and BS 7671 Section 712 requirements."
      datePublished="2024-06-01"
      dateModified="2026-06-09"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Solar PV Guide"
      badgeIcon={Sun}
      heroTitle={
        <>
          Solar PV System Sizing <span className="text-yellow-400">— UK Electrician Guide</span>
        </>
      }
      heroSubtitle="A complete guide to sizing solar PV systems for UK homes: kWp calculations, orientation and tilt factors, MCS standards, G98/G99 DNO notification thresholds, BS 7671 Section 712 requirements, and battery storage integration."
      readingTime={10}
      answerBox={answerBox}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Solar PV System Sizing — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Issue EIC certificates for solar PV installations with Elec-Mate"
      ctaSubheading="Generate compliant Electrical Installation Certificates for solar PV on your phone. Start your free 7-day trial."
    />
  );
}
