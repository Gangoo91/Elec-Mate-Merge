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

const answerBox = {
  question: 'How much does industrial electrical installation cost in the UK?',
  answer:
    'UK industrial electrical installation costs typically run £18–£65/m² depending on load density and motor control. A 1,000m² light industrial unit is around £18,000–£40,000; a 3,000m² medium manufacturing facility £100,000–£290,000; and a large 10,000m²+ plant with full motor control centre and HV substation £500,000–£2,000,000+. These are indicative market rates, not a quote.',
  detail:
    'Motor control centres and variable speed drives are the single largest cost element in most manufacturing facilities. Always obtain a detailed tender against drawings and an equipment schedule before contract.',
};

const keyTakeaways = [
  'Industrial electrical installation costs in the UK range from £15,000 for a small light industrial unit to £100,000+ for a large manufacturing facility, with per square metre rates typically £18–£65/m² depending on load density and motor control requirements.',
  'Most industrial premises require a 3-phase 400V supply from the DNO. Substations are required for larger sites; a 500kVA substation typically costs £40,000–£80,000 including civils, transformer, and HV switchgear.',
  'Motor control centres (MCCs) are the primary cost driver in manufacturing facilities. A fully-specified MCC with variable speed drives (VSDs) for 20 motors can cost £80,000–£200,000 for the panel and drives alone.',
  'Cable containment systems — cable tray, cable ladder, and conduit — form a significant portion of a typical industrial electrical budget. Heavy-duty cable ladder for main distribution runs at high level costs £40–£120 per metre installed.',
  'Industrial premises with flammable atmospheres (paint spraying, flour milling, petrochemical) require ATEX/UKCA-marked electrical equipment in designated zones, adding a significant cost premium to fittings in those areas.',
  'Under the Electricity at Work Regulations 1989 (EAWR), industrial employers must have formal arrangements for maintenance and interim routine checks in addition to the periodic EICR — a written maintenance plan with interim checks is a legal requirement, not optional (GN3 Reg 3.5).',
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
      'Almost all industrial premises require a 3-phase 400V supply. Single-phase is insufficient once you have overhead cranes, large compressors, CNC machinery, or multiple welding points running simultaneously. A DNO application for a 3-phase service must be submitted early in the project — lead times for a new connection vary by DNO and network capacity; always confirm timescales directly with your regional DNO at the earliest opportunity, as delays can affect the construction programme significantly. For sites over approximately 1MVA, a private HV (high voltage) substation is more cost-effective than a large LV supply from the DNO.',
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
      'Industrial electrical installations must comply with BS 7671:2018+A4:2026 (the IET Wiring Regulations). Additional standards apply by sector: BS EN 60204-1 (Safety of machinery — electrical equipment of machines) governs machine wiring; BS EN 61439 (Low-voltage switchgear and controlgear assemblies) covers MCCs and distribution boards; ATEX/UKCA Directive (2014/34/EU, retained as UK law) applies where flammable atmospheres exist; BS EN IEC 60079 series covers explosion-protected electrical apparatus. All new industrial installations require an Electrical Installation Certificate (EIC) issued following initial verification — this obligation flows from BS 7671 Part 6 and GN3 Reg 1.3, which require the EIC (together with Schedules of Circuit Details and Test Results) to be handed to the person ordering the work. Note: Building Regulations Part P applies to dwellings only and does not govern industrial or commercial electrical work.',
  },
  {
    question: 'How often does a factory or industrial unit need an EICR?',
    answer:
      'BS 7671 Reg 652.1 does not prescribe a single fixed interval for industrial EICRs. The frequency must be determined by the responsible person having regard to: (1) the type of installation and equipment present; (2) external influences such as corrosion, vibration, and chemical exposure; (3) the use and operation of the installation (continuous 24/7 operation is an adverse factor); and (4) the frequency and quality of maintenance. GN3 Reg 3.4 confirms that where practical experience shows a heavy-industrial installation deteriorates faster than anticipated, the dutyholder may judge a shorter interval appropriate. In practice, many industrial operators commission EICRs every three years for demanding environments and every five years for light industrial or storage premises. On change of occupancy, a new periodic inspection is also strongly recommended. EICRs for industrial premises are complex and must cover all distribution boards, MCCs, and motor control panels. An EICR for a medium manufacturing facility typically costs £1,500–£5,000.',
  },
  {
    question: 'What is an ATEX zone and what does it mean for electrical costs?',
    answer:
      'ATEX (Atmosphères Explosibles) zones are areas where flammable gases, vapours, mists, or dusts may be present in quantities sufficient to create an explosive atmosphere. UK law (DSEAR — Dangerous Substances and Explosive Atmospheres Regulations 2002) requires employers to classify these zones and use appropriately rated electrical equipment. ATEX/UKCA-marked light fittings, switches, sockets, and motors carry a significant cost premium over standard equivalents because of specialist construction and third-party certification requirements. Zone 1 (flammable gas likely in normal operation) and Zone 21 (combustible dust likely) require the highest rated equipment. A spray booth, flour mill, or solvent-handling area is typically Zone 1 or Zone 2.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/factory-electrical-installation',
    title: 'Factory Electrical Installation Guide',
    description:
      'Distribution design, motor control, machine wiring, and commissioning for manufacturing.',
    icon: Factory,
    category: 'Guide',
  },
  {
    href: '/guides/three-phase-installation-cost',
    title: '3-Phase Installation Cost',
    description:
      'Three-phase supply upgrades, switchboards, and distribution cost guide for UK premises.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/warehouse-electrical-installation',
    title: 'Warehouse Electrical Installation',
    description:
      'High-bay lighting, distribution, and EV/forklift charging for logistics and storage sites.',
    icon: Building2,
    category: 'Guide',
  },
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
    href: '/eic-certificate',
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
        <p className="text-sm text-white/50 mb-3">
          Written by a UK registered electrician. Verified against BS&nbsp;7671:2018+A4:2026 and IET
          Guidance Note 3 (9th&nbsp;Ed, 2022).
        </p>
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
                <SEOInternalLink href="/guides/bs-5266-emergency-lighting-standard">
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
        <div className="overflow-x-auto my-4 rounded-2xl border border-white/10">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-white/[0.08] text-left">
                <th className="px-4 py-3 font-semibold">Premises type</th>
                <th className="px-4 py-3 font-semibold">Rate (£/m²)</th>
                <th className="px-4 py-3 font-semibold">Example size</th>
                <th className="px-4 py-3 font-semibold">Example total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr className="bg-white/[0.02]">
                <td className="px-4 py-3">Light industrial / storage</td>
                <td className="px-4 py-3">£18–£30</td>
                <td className="px-4 py-3">1,000 m²</td>
                <td className="px-4 py-3">£18,000–£30,000</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Medium manufacturing</td>
                <td className="px-4 py-3">£30–£50</td>
                <td className="px-4 py-3">2,000 m²</td>
                <td className="px-4 py-3">£60,000–£100,000</td>
              </tr>
              <tr className="bg-white/[0.02]">
                <td className="px-4 py-3">Heavy manufacturing / food processing</td>
                <td className="px-4 py-3">£45–£65</td>
                <td className="px-4 py-3">5,000 m²</td>
                <td className="px-4 py-3">£225,000–£325,000</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Specialist / hazardous area (ATEX zones)</td>
                <td className="px-4 py-3">£65–£120+</td>
                <td className="px-4 py-3">1,000 m² ATEX area</td>
                <td className="px-4 py-3">£65,000–£120,000+</td>
              </tr>
            </tbody>
          </table>
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
          Almost all industrial premises take a 3-phase 400V supply — see{' '}
          <SEOInternalLink href="/guides/single-phase-vs-three-phase">
            single-phase vs three-phase
          </SEOInternalLink>{' '}
          for why single-phase is rarely sufficient. Getting the distribution architecture right at
          the design stage avoids costly alterations as production capacity grows.
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
        <div className="overflow-x-auto my-4 rounded-2xl border border-white/10">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-white/[0.08] text-left">
                <th className="px-4 py-3 font-semibold">Control method</th>
                <th className="px-4 py-3 font-semibold">Indicative cost</th>
                <th className="px-4 py-3 font-semibold">Best for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr className="bg-white/[0.02]">
                <td className="px-4 py-3">
                  <strong>Direct On Line (DOL) starter</strong>
                  <span className="block text-white/60 text-xs mt-0.5">
                    Contactor + thermal overload, motors below ~4kW (sometimes to 7.5kW)
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">£200–£600</td>
                <td className="px-4 py-3">Pumps, fans, conveyors where full-speed inrush is acceptable</td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <strong>Soft starter</strong>
                  <span className="block text-white/60 text-xs mt-0.5">
                    Reduces starting inrush; no steady-state energy saving (15kW unit)
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">£400–£900</td>
                <td className="px-4 py-3">Pumps, compressors, conveyors where starting torque is non-critical</td>
              </tr>
              <tr className="bg-white/[0.02]">
                <td className="px-4 py-3">
                  <strong>Variable Speed Drive (VSD / inverter)</strong>
                  <span className="block text-white/60 text-xs mt-0.5">
                    Varies motor speed to the process; 30–60% saving on fans/pumps (15kW drive)
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">£800–£2,000</td>
                <td className="px-4 py-3">Fan and pump loads; payback of 1–4 years is common</td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <strong>Motor Control Centre (MCC)</strong>
                  <span className="block text-white/60 text-xs mt-0.5">
                    Complete assembly housing starters/VSDs for ~20 motors with PLC interface
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">£80,000–£200,000</td>
                <td className="px-4 py-3">Central control of many motors; add £15,000–£40,000 install &amp; commissioning</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-white/60">
          Figures are indicative market guidance for the equipment only, not a quote. For balanced
          three-phase board and motor circuit design, see our{' '}
          <SEOInternalLink href="/guides/three-phase-installation">
            three-phase installation guide
          </SEOInternalLink>
          .
        </p>
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
        <div className="overflow-x-auto my-4 rounded-2xl border border-white/10">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-white/[0.08] text-left">
                <th className="px-4 py-3 font-semibold">Containment type</th>
                <th className="px-4 py-3 font-semibold">Typical size</th>
                <th className="px-4 py-3 font-semibold">Installed cost</th>
                <th className="px-4 py-3 font-semibold">Primary use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr className="bg-white/[0.02]">
                <td className="px-4 py-3"><strong>Heavy cable ladder</strong></td>
                <td className="px-4 py-3 whitespace-nowrap">300–600mm wide, 50mm deep</td>
                <td className="px-4 py-3 whitespace-nowrap">£40–£120/m</td>
                <td className="px-4 py-3">Main HV/LV distribution at high level</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><strong>Medium cable tray</strong></td>
                <td className="px-4 py-3 whitespace-nowrap">150–300mm wide, perforated</td>
                <td className="px-4 py-3 whitespace-nowrap">£20–£55/m</td>
                <td className="px-4 py-3">Sub-distribution, motor feeders, control cabling</td>
              </tr>
              <tr className="bg-white/[0.02]">
                <td className="px-4 py-3"><strong>Steel conduit</strong></td>
                <td className="px-4 py-3 whitespace-nowrap">20–32mm heavy gauge</td>
                <td className="px-4 py-3 whitespace-nowrap">£12–£30/m</td>
                <td className="px-4 py-3">Machine final circuits, areas of mechanical damage</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-white/60 mb-4">
          Bends, tees, and reducers add £80–£300 each depending on size. Ex-rated (explosion-proof)
          conduit is required in ATEX zones — see the hazardous-area section below.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="flex items-start gap-3 text-white">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
            <span>
              <strong>Armoured cable (SWA)</strong> — used for runs across vehicle traffic areas,
              into pits and trenches, or where the cable must resist mechanical damage without being
              enclosed in conduit. Sizes from 2.5mm² 3-core (small motor finals) to 185mm² 4-core
              (large distribution). Budget an additional 30–50% for armoured cable versus the
              equivalent unarmoured cable in containment.
            </span>
          </div>
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
        <div className="overflow-x-auto my-4 rounded-2xl border border-red-500/20">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-red-500/15 text-left">
                <th className="px-4 py-3 font-semibold">Hazard</th>
                <th className="px-4 py-3 font-semibold">Zone</th>
                <th className="px-4 py-3 font-semibold">Likelihood of explosive atmosphere</th>
                <th className="px-4 py-3 font-semibold">Typical UK examples</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-500/15">
              <tr className="bg-red-500/[0.06]">
                <td className="px-4 py-3" rowSpan={3}><strong>Gas / vapour / mist</strong></td>
                <td className="px-4 py-3 whitespace-nowrap">Zone 0</td>
                <td className="px-4 py-3">Present continuously or for long periods</td>
                <td className="px-4 py-3">Inside tanks and vessels (relatively rare)</td>
              </tr>
              <tr className="bg-red-500/[0.06]">
                <td className="px-4 py-3 whitespace-nowrap">Zone 1</td>
                <td className="px-4 py-3">Likely in normal operation</td>
                <td className="px-4 py-3">Spray booths, solvent handling areas</td>
              </tr>
              <tr className="bg-red-500/[0.06]">
                <td className="px-4 py-3 whitespace-nowrap">Zone 2</td>
                <td className="px-4 py-3">Unlikely, and only briefly if it occurs</td>
                <td className="px-4 py-3">Areas around flanges and pumps</td>
              </tr>
              <tr>
                <td className="px-4 py-3" rowSpan={3}><strong>Combustible dust</strong></td>
                <td className="px-4 py-3 whitespace-nowrap">Zone 20</td>
                <td className="px-4 py-3">Present continuously or for long periods</td>
                <td className="px-4 py-3">Inside dust-handling plant</td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap">Zone 21</td>
                <td className="px-4 py-3">Likely in normal operation</td>
                <td className="px-4 py-3">Flour mills, grain stores</td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap">Zone 22</td>
                <td className="px-4 py-3">Unlikely, and only briefly if it occurs</td>
                <td className="px-4 py-3">Areas adjacent to dusty processes</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-white/60 mb-4">
          Zone 1 and Zone 21 are the most common in UK industrial premises. Equipment selection,
          erection, and inspection of installations in these areas are governed by the BS EN IEC
          60079 series.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>ATEX-rated equipment cost premium</strong> — ATEX/UKCA-certified light
                fittings, switches, junction boxes, motors, and sensors carry a significant price
                premium over standard equivalents due to specialist construction and certification.
                As a guide: a standard industrial LED floodlight costs £80–£150; an ATEX Zone 1
                equivalent typically costs £200–£450.
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
        <div className="overflow-x-auto my-4 rounded-2xl border border-white/10">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-white/[0.08] text-left">
                <th className="px-4 py-3 font-semibold">Element</th>
                <th className="px-4 py-3 font-semibold">Indicative cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr className="bg-white/[0.02]">
                <td className="px-4 py-3">Main LV switchboard (400–800A TPN)</td>
                <td className="px-4 py-3 whitespace-nowrap">£8,000–£25,000</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Sub-distribution boards and 3-phase distribution</td>
                <td className="px-4 py-3 whitespace-nowrap">£15,000–£40,000</td>
              </tr>
              <tr className="bg-white/[0.02]">
                <td className="px-4 py-3">Motor control centre (10–20 motors, DOL/VSD mix)</td>
                <td className="px-4 py-3 whitespace-nowrap">£30,000–£120,000</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Cable containment (ladder, tray, conduit)</td>
                <td className="px-4 py-3 whitespace-nowrap">£18,000–£55,000</td>
              </tr>
              <tr className="bg-white/[0.02]">
                <td className="px-4 py-3">Lighting and general power</td>
                <td className="px-4 py-3 whitespace-nowrap">£12,000–£30,000</td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  Emergency lighting (
                  <SEOInternalLink href="/guides/bs-5266-emergency-lighting-standard">
                    BS 5266-1
                  </SEOInternalLink>
                  )
                </td>
                <td className="px-4 py-3 whitespace-nowrap">£4,000–£10,000</td>
              </tr>
              <tr className="bg-white/[0.02]">
                <td className="px-4 py-3">Fire alarm system</td>
                <td className="px-4 py-3 whitespace-nowrap">£4,000–£12,000</td>
              </tr>
              <tr className="bg-yellow-900/30 border-t border-yellow-700/40 font-semibold">
                <td className="px-4 py-3">Total — 3,000m² medium manufacturing facility</td>
                <td className="px-4 py-3 whitespace-nowrap text-yellow-400">£100,000–£290,000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <p className="text-xs uppercase tracking-wide text-white/50 mb-1">
              Light industrial unit (1,000m²)
            </p>
            <p className="text-lg font-bold text-white">£15,000–£40,000</p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <p className="text-xs uppercase tracking-wide text-white/50 mb-1">
              Heavy manufacturing / food processing (10,000m²+)
            </p>
            <p className="text-lg font-bold text-white">£500,000–£2,000,000+</p>
          </div>
        </div>
        <p className="text-sm text-white/60">
          All figures are indicative market guidance for estimating, not a quote. They exclude VAT
          and DNO/substation connection charges.
        </p>
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
                <strong>Inspection interval — BS 7671 Reg 652.1</strong> — there is no single
                prescribed interval. BS 7671 Reg 652.1 requires the responsible person to determine
                the frequency having regard to four factors: (1) the type of installation and
                equipment present; (2) external influences to which the installation is subjected
                (corrosion, vibration, temperature extremes, chemical attack); (3) the use and
                operation of the installation — continuous 24/7 operation is an adverse factor; and
                (4) the frequency and quality of maintenance. In practice, GN3 Reg 3.4 confirms that
                where an installation in heavy industrial use deteriorates faster than anticipated,
                the dutyholder should shorten the interval accordingly. A guide: light industrial
                storage — five years; demanding manufacturing or food processing — three years.
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
                <strong>Interim routine checks — a legal requirement</strong> — GN3 Reg 3.5 is
                explicit: interim routine checks shall be provided for industrial electrical
                installations as part of the formal arrangements required by the Electricity at Work
                Regulations 1989 (EAWR), in addition to the periodic EICR. A written maintenance
                plan with scheduled interim checks must be in place and demonstrable to the HSE.
                This is not optional — it is a duty under EAWR for all commercial and industrial
                employers.
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
                  <SEOInternalLink href="/electrical-quoting-app">
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
      title="Industrial Electrical Installation Cost UK 2025 | Factory"
      description="Industrial electrical installation costs UK 2025. Per square metre estimates, 3-phase distribution, motor control centres, cable containment systems…"
      datePublished="2025-01-01"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Industrial Cost Guide"
      badgeIcon={Factory}
      answerBox={answerBox}
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
