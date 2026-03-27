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
  'System size in kilowatt-peak (kWp) is determined by the available roof area, the household\'s annual electricity consumption, and the orientation and tilt of the roof surface. A typical UK 3-bed home uses 3,100 kWh per year and is well served by a 3.5kWp to 4kWp system.',
  'MCS (Microgeneration Certification Scheme) accreditation is required for solar PV installations where customers wish to access the Smart Export Guarantee (SEG) or claim compliance with MCS standards. Without MCS, the installation cannot be formally certified to the scheme.',
  'Systems up to 3.68kW single-phase (16A per phase) can be notified to the DNO under the simplified G98 procedure after installation. Larger systems require a G99 application with prior DNO approval — which must be obtained before installation begins.',
  'BS 7671:2018+A3:2024 Section 712 covers photovoltaic power supply systems and applies to all solar PV electrical installations. Key requirements include DC isolators at the array and inverter, protection against reverse current, and appropriate labelling throughout the installation.',
  'SAP (Standard Assessment Procedure) calculations are used for new-build solar PV sizing under Building Regulations Part L. For retrofit installations, energy monitoring data or EPC assessments provide the consumption baseline for sizing calculations.',
  'Battery storage integration requires careful consideration of protection coordination, particularly where export limiting is applied. The combined inverter-battery system must be assessed under BS 7671 Section 712 and the relevant product standards.',
];

const faqs = [
  {
    question: 'How do I calculate the right solar PV system size for a UK home?',
    answer:
      "The standard approach to solar PV sizing for UK homes uses three inputs: annual electricity consumption (from bills or EPC), available roof area, and roof orientation and tilt. A rule of thumb is 1kWp of solar PV generates approximately 850 to 1,100 kWh per year in the UK, depending on location and orientation. For a home using 3,100 kWh per year, a 3.5kWp to 4kWp system will generate roughly 80% to 110% of annual consumption (accounting for self-consumption rates of around 40% to 50% without battery storage). Each 1kWp of standard monocrystalline panels requires approximately 5 to 6 square metres of unshaded roof area. MCS-certified installers use MCS 001 (Product Certification) and the MCS Planning Standards to produce formally compliant sizing calculations.",
  },
  {
    question: 'What is the difference between G98 and G99 for solar PV installations?',
    answer:
      "G98 and G99 are DNO connection engineering recommendations for generating systems connected to the low voltage (LV) distribution network. G98 applies to systems up to 3.68kW single-phase (or 11.04kW three-phase) — these can be connected and then notified to the DNO within 28 days of commissioning without prior approval. G99 applies to systems larger than these thresholds and requires a formal application to the DNO before installation. The DNO has up to 45 working days to assess a standard G99 application for a residential system, and 90 days for more complex assessments. Failing to apply under G99 before installing an oversized system can result in the DNO requiring the system to be disconnected.",
  },
  {
    question: 'What does BS 7671 Section 712 require for solar PV installations?',
    answer:
      "BS 7671:2018+A3:2024 Section 712 (Photovoltaic Power Supply Systems) sets out the specific requirements for solar PV electrical installations. Key requirements include: a DC isolator must be installed at the array and at the inverter (Regulation 712.537.2); protection against reverse current where required by the array design (Regulation 712.443); suitable protection against overvoltage on both the DC and AC sides; the installation must include appropriate labelling at every point where live parts could be accessed, warning of the dual-supply nature of PV systems (Regulation 712.514); and all cables used on the DC side must be rated for DC use and for the maximum open-circuit voltage of the array (Regulation 712.522). The protective earth continuity of the mounting structure must also be verified.",
  },
  {
    question: 'How does battery storage affect the electrical installation requirements?',
    answer:
      "Battery storage adds complexity to solar PV electrical installations in several areas. Protection coordination: the battery management system (BMS) and inverter-charger must be assessed together to ensure fault current protection operates correctly under both import and export conditions. BS 7671 Regulation 712.560 requires that energy storage systems comply with the relevant product standard (typically BS EN IEC 62619 for lithium-ion batteries). Export limiting: where a DNO requires export limiting as a condition of G99 approval, the inverter must have an active export limiter with current transformer (CT) monitoring at the grid connection point. Fire safety: battery storage systems must be positioned in accordance with manufacturer requirements and relevant fire safety guidance — lithium-ion batteries must not be installed in habitable rooms without appropriate fire protection.",
  },
  {
    question: 'Do I need MCS accreditation to install solar PV in the UK?',
    answer:
      "MCS accreditation is not legally required to install solar PV in the UK — Part P and G98/G99 compliance are the statutory requirements. However, MCS accreditation is required for customers to access the Smart Export Guarantee (SEG), which allows them to receive payment for electricity exported to the grid. Without MCS accreditation, the installer cannot certify the installation to MCS standards, and the customer cannot apply to an SEG licensed electricity supplier for export payments. For most residential customers, the ability to earn SEG income is a significant factor in the return on investment calculation, so in practice most reputable solar PV installers hold MCS accreditation.",
  },
  {
    question: 'What are the DNO export limiting requirements for solar PV?',
    answer:
      "Export limiting (also called active network management or ANM) may be required by the DNO as a condition of G99 approval where the local network does not have sufficient export capacity for the full output of the proposed system. In an export-limited installation, the inverter is fitted with a current transformer at the grid connection point that monitors export and throttles inverter output to stay within the approved export limit (often 3.68kW single-phase or a site-specific limit). Export limiting must be implemented using a DNO-approved method — some DNOs specify particular inverter brands or communication protocols. Export-limited systems must be re-notified to the DNO if the export limit changes, and the limitation must be clearly documented in the G99 agreement.",
  },
  {
    question: 'What orientation and tilt angles give the best solar PV output in the UK?',
    answer:
      "In the UK, south-facing roofs at a tilt angle of 35 to 40 degrees give the maximum annual output — typically 950 to 1,100 kWh per kWp depending on location (higher in the South West and lower in Scotland). East-west split systems (two arrays facing east and west at around 20 to 30 degrees) can increase self-consumption by spreading generation across the morning and afternoon, typically achieving 80% to 85% of the yield of an equivalent south-facing system. North-facing roofs are generally not viable — output is typically 50% to 60% of a south-facing installation. Shading is the most significant yield reduction factor: even partial shading on one module in a string can significantly reduce whole-string output unless the system uses module-level power electronics (microinverters or DC optimisers).",
  },
];

const relatedPages: RelatedPage[] = [
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
  {
    href: '/electrician-oxfordshire',
    title: 'Electricians in Oxfordshire',
    description: 'Find qualified electricians across Oxford, Abingdon, and the Harwell energy hub.',
    icon: Zap,
    category: 'Location',
  },
  {
    href: '/electrician-berkshire',
    title: 'Electricians in Berkshire',
    description: 'Find qualified electricians across Reading, Slough, Windsor, and Bracknell.',
    icon: Zap,
    category: 'Location',
  },
];

const sections = [
  {
    id: 'sizing-principles',
    heading: 'Solar PV Sizing Principles for UK Homes',
    content: (
      <>
        <p>
          Sizing a solar PV system correctly is the single most important design decision
          in a domestic solar installation. An undersized system leaves energy potential
          on the table; an oversized system generates electricity that cannot be consumed
          or exported within permitted limits. The goal is to match system output to the
          household's self-consumption pattern and DNO export constraints.
        </p>
        <p>
          The unit of solar PV capacity is the kilowatt-peak (kWp) — the power output
          of the array under Standard Test Conditions (STC: 1,000 W/m² irradiance, 25°C
          cell temperature, 1.5 air mass spectrum). In real UK conditions, the array output
          is always lower than kWp due to irradiance, temperature, and angle effects.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual yield estimate:</strong> South-facing, 35° tilt, south England
                — approximately 950 to 1,100 kWh per kWp per year. Scotland — approximately
                750 to 900 kWh per kWp per year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical UK home consumption:</strong> 3,100 kWh per year (Ofgem typical
                domestic consumption values 2024). High-consumption homes (electric heating,
                EV charging) may use 5,000 to 10,000+ kWh per year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-consumption rate:</strong> Without battery storage, typically
                25% to 40% of solar generation is self-consumed. With battery storage, this
                rises to 60% to 80% depending on battery capacity and household demand profile.
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
          MCS-certified solar PV installers use formal design tools — including the MCS
          Planning Standards methodology and tools such as PVGIS (Photovoltaic Geographic
          Information System) — to produce accurate yield estimates and system sizing
          calculations. The following simplified approach is useful for initial assessments.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Step-by-Step Sizing Method</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 1 — Establish annual consumption:</strong> Obtain annual kWh
                consumption from electricity bills or EPC. Use Ofgem typical values if
                bills are unavailable (3,100 kWh for medium household).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 2 — Calculate target generation:</strong> For a self-consumption
                optimised system, target generation of 100% to 130% of annual consumption
                (excess is exported via SEG). For a net-zero target, account for EV charging
                and heat pump loads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 3 — Estimate kWp required:</strong> Divide target annual
                generation (kWh) by estimated specific yield (kWh/kWp/year from PVGIS for
                the specific location, orientation, and tilt). Round up to the nearest
                whole module count.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 4 — Check roof area:</strong> Each 400Wp panel occupies
                approximately 1.7m² to 2.0m². Multiply panel count by panel area and
                add 15% for spacing, verge margins, and ridge clearance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Step 5 — Check G98/G99 threshold:</strong> If the resulting kWp
                exceeds 3.68kW single-phase, a G99 application is required before
                installation can proceed.
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
          The orientation (azimuth) and tilt (inclination) of a solar array have a
          significant effect on annual energy yield. The PVGIS tool, maintained by the
          European Commission's Joint Research Centre, provides location-specific yield
          estimates for any combination of tilt and orientation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Orientation Yield Factors (South England Reference)</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>South (180°), 35–40° tilt:</strong> 100% — reference yield ~1,000 kWh/kWp/year</span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>South-East or South-West (135° or 225°), 35° tilt:</strong> ~95%</span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>East or West (90° or 270°), 25–30° tilt:</strong> ~80–85%</span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>North-East or North-West, any tilt:</strong> ~65–70%</span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>North (0°), any tilt:</strong> ~50–60% — marginal viability</span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Flat roof (0° tilt):</strong> ~87% of south-facing inclined — use ballasted frames at 10–15° for maintenance access</span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shading:</strong> Even partial shading on a single cell in a string
                can reduce the output of all modules in that string. Always carry out a
                shading analysis using a solar pathfinder, SunEye tool, or PVGIS shading
                assessment before finalising the design. Consider microinverters or DC
                optimisers for shaded installations.
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
          Two separate certification and notification frameworks apply to residential
          solar PV installations in the UK: MCS (Microgeneration Certification Scheme)
          for quality and SEG eligibility, and G98/G99 for DNO connection requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">MCS Requirements</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                MCS 001 — Solar PV product certification standard (modules and inverters
                must be certified to the relevant IEC standards and registered on MCS)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                MCS 005 — Installer certification standard. The installation company must
                hold MCS 005 certification for solar PV to issue an MCS certificate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                MCS certificate required for Smart Export Guarantee (SEG) application —
                without it the customer cannot receive SEG export payments.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">G98 vs G99 Thresholds</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98 (notification after installation):</strong> Single-phase up to
                3.68kW (16A); three-phase up to 11.04kW (16A per phase). Notify DNO within
                28 days of commissioning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G99 (prior application required):</strong> Any system above the G98
                thresholds. Apply to DNO before installation. Assessment period: 45 working
                days (standard residential), 90 days (complex sites).
              </span>
            </li>
          </ul>
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
          Section 712 of BS 7671:2018+A3:2024 sets out the specific additional requirements
          for photovoltaic power supply systems. These requirements supplement the general
          requirements of BS 7671 and apply to all solar PV electrical installations,
          regardless of system size.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 712.411.3.1 — Isolation:</strong> A DC isolator must be
                provided at the array and at the inverter input, rated for the maximum
                open-circuit voltage of the array and the maximum short-circuit current.
                DC isolators must be suitable for DC switching duty — AC isolators must
                not be used.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 712.443 — Overvoltage protection:</strong> Surge protection
                devices (SPDs) are required on the DC side where the risk of overvoltage
                from lightning is assessed as significant (typically where the DC cable run
                is long or external).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 712.514 — Labelling:</strong> Warning labels must be
                placed at every accessible point warning that the installation contains
                live parts that may remain live when isolated from the AC supply. Labels
                must comply with BS EN ISO 7010 and be positioned at the inverter, consumer
                unit, and at the array junction boxes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 712.522 — DC cable selection:</strong> DC cables must
                be rated for DC use, have a voltage rating not less than the maximum
                open-circuit voltage of the array at minimum temperature, and be of a
                type listed in Appendix 4 as appropriate for the installation method.
                PV-specific cable (H1Z2Z2-K or equivalent) is required for exposed roof
                cable runs.
              </span>
            </li>
          </ul>
        </div>
        <p>
          See the{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained" label="EICR observation codes guide" />{' '}
          for how non-compliance with Section 712 requirements is typically graded on
          electrical inspection reports.
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
          Battery storage is increasingly standard in new solar PV installations, and
          a growing number of existing systems are being retrofitted with battery storage.
          Integrating battery storage introduces additional electrical design and safety
          considerations under BS 7671 and the relevant product standards.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS EN IEC 62619:</strong> Safety requirements for secondary lithium
                cells and batteries for use in stationary applications. BS 7671 Regulation
                712.560 requires compliance with the relevant product standard for energy
                storage equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AC-coupled vs DC-coupled:</strong> AC-coupled systems (battery
                with its own inverter-charger) are simpler to retrofit to existing PV
                systems. DC-coupled systems (battery connected to the DC bus of the
                PV inverter) are more efficient but require a compatible inverter/battery
                combination. Both require G98/G99 assessment as a combined system.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire safety:</strong> Lithium-ion battery systems must not be
                installed in habitable rooms without fire separation meeting the
                manufacturer's requirements. Battery enclosures should have thermal
                runaway venting to the outside where practicable. Follow manufacturer
                installation instructions strictly — these form part of the compliance
                basis for BS 7671 Regulation 132.16.
              </span>
            </li>
          </ul>
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
          All solar PV systems in Great Britain must be registered with the relevant DNO
          under G98 or G99. Some DNOs impose export limiting as a condition of G99 approval
          where the local network has insufficient export headroom.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Export limit setting:</strong> Where a DNO requires export limiting,
                the approved export limit (in kW or A) is specified in the G99 agreement.
                The inverter must be configured with the export limiter active, with a
                current transformer (CT) clamp on the grid supply cable, before commissioning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zero export (export prevention):</strong> Some DNOs or property
                types (leasehold, shared supplies) require zero export — the system is
                configured to prevent any export to the grid. This significantly reduces
                self-consumption rate and requires careful sizing to avoid wasted generation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Documentation:</strong> The G99 agreement (or G98 notification
                confirmation) must be retained with the installation documentation and
                provided to the customer alongside the EIC. Use{' '}
                <SEOAppBridge href="/tools/eicr-certificate" label="Elec-Mate" /> to
                manage EIC certificates for solar PV installations.
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
      title="Solar PV System Sizing — UK Guide 2024 | kWp Calculation, MCS, G98/G99, BS 7671 Section 712"
      description="How to size a solar PV system for UK homes: kWp calculation methods, orientation and tilt factors, MCS standards, G98/G99 DNO notification thresholds, BS 7671 Section 712 requirements, battery storage integration, and export limiting."
      datePublished="2024-06-01"
      dateModified="2024-11-01"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Solar PV Guide"
      badgeIcon={Sun}
      heroTitle={
        <>
          Solar PV System Sizing{' '}
          <span className="text-yellow-400">— UK Electrician Guide</span>
        </>
      }
      heroSubtitle="A complete guide to sizing solar PV systems for UK homes: kWp calculations, orientation and tilt factors, MCS standards, G98/G99 DNO notification thresholds, BS 7671 Section 712 requirements, and battery storage integration."
      readingTime={10}
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
