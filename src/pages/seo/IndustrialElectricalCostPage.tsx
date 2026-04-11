import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  PoundSterling,
  Zap,
  AlertTriangle,
  FileCheck2,
  Building2,
  ShieldCheck,
  ClipboardCheck,
  Factory,
  Settings,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Commercial Electrical', href: '/guides/commercial-electrical-installation-cost' },
  { label: 'Industrial Electrical Cost', href: '/industrial-electrical-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Industrial Electrical Overview' },
  { id: 'per-sqm', label: 'Per Square Metre Estimates' },
  { id: 'three-phase', label: '3-Phase Distribution' },
  { id: 'motor-control', label: 'Motor Control & Starters' },
  { id: 'cable-containment', label: 'Cable Containment Systems' },
  { id: 'hazardous-areas', label: 'Hazardous Area Installations' },
  { id: 'cost-breakdown', label: 'Cost Breakdown 2025' },
  { id: 'eicr', label: 'EICR & Compliance' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Industrial electrical installation costs in the UK range from £15,000 for a small light industrial unit to £100,000+ for a large manufacturing facility, with per square metre rates typically £18–£65/m² depending on load density and motor control requirements.',
  'Most industrial premises require a 3-phase 400V supply from the DNO. Substations are required for larger sites; a 500kVA substation typically costs £40,000–£80,000 including civils, transformer, and HV switchgear.',
  'Motor control centres (MCCs) are the primary cost driver in manufacturing facilities. A fully-specified MCC with variable speed drives (VSDs) for 20 motors can cost £80,000–£200,000 for the panel and drives alone.',
  'Cable containment systems — cable tray, cable ladder, and conduit — account for 15–25% of a typical industrial electrical budget. Heavy-duty cable ladder for main distribution runs at high level costs £40–£120 per metre installed.',
  'Industrial premises with flammable atmospheres (paint spraying, flour milling, petrochemical) require ATEX/UKCA-marked electrical equipment in designated zones, adding 50–150% to the cost of fittings in those areas.',
];

const faqs = [
  {
    question: 'How much does an industrial electrical installation cost in the UK?',
    answer:
      'Industrial electrical installation costs vary enormously depending on the type of manufacturing, installed load, and motor control requirements. A basic light industrial unit (1,000m², simple lighting, power, and three-phase supply): £15,000–£40,000. A medium-sized food production factory (3,000m², 3-phase distribution, motor control, emergency lighting, CCTV): £80,000–£200,000. A large automotive or heavy manufacturing plant (10,000m²+, full MCC, HV substation, explosion-protected areas): £500,000–£2,000,000+. Per square metre guide rates: light industrial £18–£35/m²; medium manufacturing £35–£65/m².',
  },
  {
    question: 'Does an industrial unit need a 3-phase electrical supply?',
    answer:
      'Almost all industrial premises require a 3-phase 400V supply. Single-phase is insufficient once you have overhead cranes, large compressors, CNC machinery, or multiple welding points running simultaneously. A DNO application for a 3-phase service must be submitted early in the project — lead times are typically 8–24 weeks for a new connection, longer if a substation is required. For sites over approximately 1MVA, a private HV (high voltage) substation is more cost-effective than a large LV supply from the DNO.',
  },
  {
    question: 'What is a motor control centre (MCC) and how much does one cost?',
    answer:
      'A Motor Control Centre (MCC) is a switchboard assembly housing starters, contactors, overload protection, and control equipment for multiple motor circuits in a single enclosure. MCCs are used in factories wherever several motors are controlled from a central point — conveyor systems, pump stations, HVAC plant, production line drives. A basic DOL (Direct On Line) starter MCC for 10 motors: £15,000–£35,000. A fully-specified MCC with variable speed drives (VSDs) for energy efficiency on 20 motors: £80,000–£200,000. These costs cover the panel only; cabling, installation, and commissioning are additional.',
  },
  {
    question: 'What cable containment system is used in industrial buildings?',
    answer:
      'Industrial electrical installations use a hierarchy of cable containment. Main HV and LV distribution runs use heavy-duty cable ladder (300–600mm wide, 50–100mm deep) mounted at high level. Secondary distribution uses cable tray (150–300mm wide). Final circuits run in steel conduit (25–32mm) or armoured cable (SWA) in hazardous areas. Cable management accessories (bends, tees, supports) add 20–40% to the cost of the containment itself. Installed cost: heavy cable ladder £40–£120/m; medium cable tray £20–£55/m; 25mm steel conduit £12–£25/m.',
  },
  {
    question: 'What electrical standards apply to industrial installations?',
    answer:
      'Industrial electrical installations must comply with BS 7671:2018+A3:2024 (the IET Wiring Regulations). Additional standards apply by sector: BS EN 60204-1 (Safety of machinery — electrical equipment of machines) governs machine wiring; BS EN 61439 (Low-voltage switchgear and controlgear assemblies) covers MCCs and distribution boards; ATEX/UKCA Directive (2014/34/EU, retained as UK law) applies where flammable atmospheres exist; BS EN IEC 60079 series covers explosion-protected electrical apparatus. All new industrial installations require an Electrical Installation Certificate (EIC) under the Building Regulations.',
  },
  {
    question: 'How often does a factory or industrial unit need an EICR?',
    answer:
      'The recommended EICR interval for industrial premises under BS 7671 is five years or on change of occupancy. However, many industrial operators schedule EICRs every 3 years given the high-consequence nature of industrial electrical faults and the ongoing wear imposed by frequent load switching, vibration, and harsh environments. EICRs for industrial premises are complex and must include all distribution boards, MCCs, and motor control panels. An EICR for a medium manufacturing facility typically costs £1,500–£5,000.',
  },
  {
    question: 'What is an ATEX zone and what does it mean for electrical costs?',
    answer:
      'ATEX (Atmosphères Explosibles) zones are areas where flammable gases, vapours, mists, or dusts may be present in quantities sufficient to create an explosive atmosphere. UK law (DSEAR — Dangerous Substances and Explosive Atmospheres Regulations 2002) requires employers to classify these zones and use appropriately rated electrical equipment. ATEX/UKCA-marked light fittings, switches, sockets, and motors cost 50–150% more than standard equivalents. Zone 1 (flammable gas likely in normal operation) and Zone 21 (combustible dust likely) require the highest rated equipment. A spray booth, flour mill, or solvent-handling area is typically Zone 1 or Zone 2.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/restaurant-electrical-cost',
    title: 'Restaurant Electrical Installation Cost',
    description:
      'Commercial kitchen electrical, 3-phase supply, gas interlocks, and emergency lighting costs.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/hospital-electrical-cost',
    title: 'Hospital Electrical Installation Cost',
    description: 'HTM 06-01 compliance, medical grade supply, UPS, and essential services.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/commercial-electrical-installation-cost',
    title: 'Commercial Electrical Installation Cost',
    description: 'Complete UK commercial electrical cost guide for all building types.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete commercial and industrial EICRs on your phone with AI board scanning.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/tools/eic-certificate',
    title: 'Electrical Installation Certificate App',
    description: 'Complete EICs on site with instant PDF export — no evening admin.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Industrial Electrical Installation: Scope and Key Systems',
    content: (
      <>
        <p>
          Industrial electrical installations are fundamentally different from commercial premises
          in scale, complexity, and the standards that apply. The primary cost drivers are the
          installed electrical load (dominated by motor-driven plant), the distribution architecture
          (often requiring a dedicated HV substation for larger sites), and the motor control
          infrastructure (motor control centres, variable speed drives, PLCs).
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>HV/LV distribution</strong> — incoming supply, substation or DNO connection,
                main LV switchboard, power factor correction, sub-distribution boards, and busbar
                trunking systems for high-density machine areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Motor control</strong> — direct-on-line starters, soft starters, variable
                speed drives, motor control centres, and PLC-based control panels. Often the single
                largest cost element in a manufacturing facility.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable containment</strong> — cable ladder and tray main routes, steel
                conduit for machine final circuits, armoured cable in vehicle traffic areas, and
                floor-mounted cable management in production areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Life-safety and welfare</strong> — emergency lighting to{' '}
                <SEOInternalLink href="/guides/emergency-lighting-bs5266">
                  BS 5266-1
                </SEOInternalLink>
                , fire alarm, machine safety guarding interlocks, and welfare facilities (lighting,
                power, and hot water in toilets and canteen areas).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'per-sqm',
    heading: 'Per Square Metre Cost Estimates for Industrial Electrical',
    content: (
      <>
        <p>
          Industrial electrical costs are best understood on a per square metre basis, as the
          building footprint gives a reasonable first approximation of the infrastructure required
          before detailed equipment loads are established.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Light industrial / storage (low load density)</strong> — £18–£30/m².
                Lighting, basic 3-phase socket outlets, small compressor and forklift charging
                circuits. A 1,000m² light industrial unit: £18,000–£30,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium manufacturing (moderate motor load)</strong> — £30–£50/m². 3-phase
                distribution, 5–15 motor-driven machines, compressed air ring, emergency lighting. A
                2,000m² light engineering factory: £60,000–£100,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heavy manufacturing / food processing (high motor load)</strong> —
                £45–£65/m². Full MCC, VSD drives, extensive motor control, 3-phase busbar trunking,
                substation. A 5,000m² food factory: £225,000–£325,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specialist / hazardous area (ATEX zones)</strong> — £65–£120/m² or higher in
                ATEX zones. Paint finishing, petrochemical, pharmaceutical, or grain handling where
                explosion-protected equipment is required throughout.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These are guide rates for estimating purposes. A detailed tender from a qualified
          industrial electrician based on drawings and equipment schedules is always required before
          contract. Per-metre rates exclude the HV substation where required.
        </p>
      </>
    ),
  },
  {
    id: 'three-phase',
    heading: '3-Phase Distribution in Industrial Buildings',
    content: (
      <>
        <p>
          The 3-phase distribution system is the backbone of an industrial electrical installation.
          Getting the distribution architecture right at the design stage avoids costly alterations
          as production capacity grows.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main LV switchboard</strong> — the main LV switchboard receives the incoming
                supply from the DNO or substation and distributes to sub-boards or busbar trunking.
                For a medium industrial site, a 400A–800A TPN main switchboard costs £8,000–£25,000
                including MCCB main incomer, metering, and outgoing ways.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Busbar trunking systems</strong> — for production areas with high plug-in
                load density (overhead cranes, welding positions, machine tool rows), busbar
                trunking (sandwich busbar) allows tap-off boxes to be inserted at any point. Cost:
                £120–£300/m for a 400A busbar system, installed. Tap-off boxes: £300–£800 each
                depending on current rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power factor correction</strong> — industrial sites with large induction
                motor loads often have poor power factor (PF), resulting in reactive power charges
                from the DNO. Automatic power factor correction (APFC) panels improve PF to 0.95+
                and reduce energy bills. Cost: £5,000–£20,000 depending on kVAr rating. Payback:
                typically 2–5 years.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HV substation</strong> — sites with a maximum demand above approximately
                800kVA are typically served by a privately-owned HV/LV substation. A 500kVA package
                substation (transformer, HV switchgear, LV switchboard, civils): £40,000–£80,000. A
                1,000kVA or larger installation: £70,000–£150,000+.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'motor-control',
    heading: 'Motor Control Centres and Variable Speed Drives',
    content: (
      <>
        <p>
          In a manufacturing facility, motor control equipment is frequently the single highest cost
          element of the electrical installation, often exceeding the distribution and containment
          costs combined. Understanding the different control options and their costs is essential
          for accurate budgeting.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Direct On Line (DOL) starters</strong> — the simplest and lowest-cost method
                for motors below 4kW (sometimes up to 7.5kW). A DOL starter with contactor and
                thermal overload in a panel: £200–£600. Suitable for pumps, fans, and conveyors
                where full-speed starting current is acceptable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Soft starters</strong> — reduce inrush current on starting. Cost for a 15kW
                soft starter unit: £400–£900. Suitable for pumps, compressors, and conveyors where
                starting torque is not critical. Do not provide energy savings in steady-state
                running.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Variable Speed Drives (VSDs/inverters)</strong> — vary the motor speed to
                match the process requirement. Provide 30–60% energy savings on fan and pump
                applications. Cost for a 15kW VSD: £800–£2,000 for the drive unit. Significant
                energy savings mean payback periods of 1–4 years are common for pumps and fans.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Motor Control Centre (MCC)</strong> — a complete MCC housing starters or
                VSDs for 20 motors, with PLC control interface: £80,000–£200,000 for the panel
                assembly, drives, and associated control equipment. Installation and commissioning:
                £15,000–£40,000 additional.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cable-containment',
    heading: 'Cable Containment Systems for Industrial Buildings',
    content: (
      <>
        <p>
          Cable containment in industrial buildings serves both a protective and an organisational
          function. Heavy-gauge steel cable ladder supports main distribution cables at high level;
          perforated cable tray handles secondary distribution; steel conduit protects final circuit
          cables in areas subject to mechanical damage, vehicle traffic, or chemical attack.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heavy cable ladder (main distribution)</strong> — 300–600mm wide, 50mm deep
                galvanised steel cable ladder for main HV and LV distribution cables. Installed cost
                including supports and fixings: £40–£120/m. Bends, tees, and reducers: £80–£300 each
                depending on size.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium cable tray (secondary distribution)</strong> — 150–300mm wide
                perforated tray for sub-distribution and machine cables. Installed: £20–£55/m.
                Widely used for lighting circuit cables, motor feeder cables, and control cabling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Steel conduit (machine final circuits)</strong> — 20–32mm heavy gauge
                galvanised steel conduit for machine final circuits, safety circuits, and areas
                subject to mechanical damage. Installed: £12–£30/m. Explosion-proof steel conduit
                (to BS EN 60423) required in ATEX zones.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Armoured cable (SWA)</strong> — used for runs across vehicle traffic areas,
                into pits and trenches, or where the cable must resist mechanical damage without
                being enclosed in conduit. Sizes from 2.5mm² 3-core (small motor finals) to 185mm²
                4-core (large distribution). Budget an additional 30–50% for armoured cable versus
                equivalent unarmoured cable in containment.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'hazardous-areas',
    heading: 'Hazardous Area (ATEX/UKCA) Electrical Installations',
    content: (
      <>
        <p>
          Industrial premises where flammable gases, vapours, or dusts may be present require
          electrical equipment certified for use in explosive atmospheres. The UK Dangerous
          Substances and Explosive Atmospheres Regulations 2002 (DSEAR) require employers to
          classify hazardous zones and use equipment with the appropriate ATEX/UKCA marking.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone classification</strong> — Zone 0/1/2 (flammable gas/vapour), Zone
                20/21/22 (combustible dust). Zone 1 and 21 are the most common in UK industrial
                premises (spray booths, flour mills, grain stores, solvent storage areas). Zone 0 is
                relatively rare (inside tanks and vessels).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>ATEX-rated equipment cost premium</strong> — ATEX/UKCA-certified light
                fittings, switches, junction boxes, motors, and sensors cost 50–150% more than
                standard equivalents. A standard industrial LED floodlight: £80–£150. ATEX Zone 1
                equivalent: £200–£450.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation requirements</strong> — wiring in Zone 1 must use Ex-rated
                cable glands, conduit, and junction boxes. All equipment must be installed by a
                competent person with specific ATEX training. Post-installation inspection to BS EN
                IEC 60079-17 is required.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cost-breakdown',
    heading: 'Industrial Electrical Installation Cost Breakdown 2025',
    content: (
      <>
        <p>
          Costs below are for a representative medium manufacturing facility of approximately
          3,000m² with moderate motor loads. Labour and materials, excluding VAT and DNO/substation
          connection charges.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Main LV switchboard (400–800A TPN)</strong> — £8,000–£25,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sub-distribution boards and 3-phase distribution</strong> — £15,000–£40,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Motor control centre (10–20 motors, DOL/VSD mix)</strong> —
                £30,000–£120,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable containment (ladder, tray, conduit)</strong> — £18,000–£55,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting and general power</strong> — £12,000–£30,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Emergency lighting (BS 5266-1)</strong> — £4,000–£10,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm system</strong> — £4,000–£12,000.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total — 3,000m² medium manufacturing facility</strong> —{' '}
                <strong>£100,000–£290,000</strong>. Light industrial unit (1,000m²):
                £15,000–£40,000. Heavy manufacturing or food processing (10,000m²+):
                £500,000–£2,000,000+.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'eicr',
    heading: 'EICR and Compliance for Industrial Premises',
    content: (
      <>
        <p>
          Industrial EICRs are among the most technically demanding periodic inspections in the
          electrical sector. Distribution boards, MCCs, motor starters, VSD panels, and emergency
          systems must all be inspected and tested, often without shutting down production.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recommended interval</strong> — five years maximum; three years in harsh
                environments (chemical exposure, high vibration, frequent switching) or as
                recommended by the inspector based on the previous report findings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Production shutdown planning</strong> — a full EICR requires isolation and
                testing of each circuit. This is typically planned during planned maintenance
                shutdowns, annual leave periods, or overnight working to minimise production impact.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employer's liability implications</strong> — under the Electricity at Work
                Regulations 1989 (EAW), employers have a duty to ensure electrical systems are
                maintained in a safe condition. An EICR provides documentary evidence of this duty
                being discharged. In the event of an electrical incident, absence of an EICR is a
                significant adverse factor in any HSE investigation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR cost for industrial premises</strong> — small factory: £600–£1,500.
                Medium factory (3,000m², multiple boards): £1,500–£4,000. Large plant with MCC and
                HV substation: £4,000–£12,000+.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Industrial Electrical Contracts',
    content: (
      <>
        <p>
          Industrial electrical work demands a higher level of technical knowledge than domestic or
          light commercial work — 3-phase distribution design, motor control, ATEX regulations, and
          BS EN 60204-1 machine safety wiring. Electricians who develop these skills command higher
          day rates and access a client base that provides long-term maintenance and project
          contracts.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote and Certificate Industrial Work</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to produce detailed itemised quotes for industrial projects. Issue{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink> for
                  multi-board factory inspections and track each board separately.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage industrial electrical contracts with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate for industrial project quoting, multi-board EICR completion, and EIC certification. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function IndustrialElectricalCostPage() {
  return (
    <GuideTemplate
      title="Industrial Electrical Installation Cost UK 2025 | Factory Wiring Costs"
      description="Industrial electrical installation costs UK 2025. Per square metre estimates, 3-phase distribution, motor control centres, cable containment systems, ATEX hazardous areas. Typical manufacturing unit £15,000–£100,000+."
      datePublished="2025-01-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Industrial Cost Guide"
      badgeIcon={Factory}
      heroTitle={
        <>
          Industrial Electrical Installation Cost UK 2025:{' '}
          <span className="text-yellow-400">Factory Wiring Cost Guide</span>
        </>
      }
      heroSubtitle="Complete cost guide for UK industrial and factory electrical installations. Per square metre estimates (£18–£65/m²), 3-phase distribution, motor control centres, VSD drives, cable containment systems, ATEX hazardous areas, and compliance. Manufacturing unit £15,000–£100,000+."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions: Industrial Electrical Installation Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote and Certificate Industrial Electrical Projects"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for industrial project quoting, multi-board EICR completion, and EIC certification. 7-day free trial, cancel anytime."
    />
  );
}
