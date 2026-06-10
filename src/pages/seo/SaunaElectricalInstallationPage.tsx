import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Thermometer,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  Cable,
  GraduationCap,
  ClipboardCheck,
  Flame,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Sauna Electrical Installation', href: '/guides/sauna-electrical-installation' },
];

const tocItems = [
  { id: 'overview', label: 'Sauna Electrical Overview' },
  { id: 'heater-sizing', label: 'Heater Sizing and Supply' },
  { id: 'special-location', label: 'Special Location Requirements' },
  { id: 'cable-temperature', label: 'Cable and Temperature Ratings' },
  { id: 'installation-steps', label: 'Step-by-Step Installation' },
  { id: 'rcd-protection', label: 'RCD Protection' },
  { id: 'testing-certification', label: 'Testing and Certification' },
  { id: 'costs', label: 'Realistic Pricing' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Sauna heaters typically draw 4.5kW to 9kW for domestic units, requiring a dedicated 20A to 40A radial circuit. Larger commercial saunas may require three-phase supplies up to 18kW or more.',
  'BS 7671 Section 703 (rooms and cabins containing sauna heaters) applies. The sauna interior is divided into three zones under Regs 703.32.1 to 703.32.3: Zone 1 (the heater volume, bounded by a vertical surface 0.5 m from the heater surface — Reg 703.32.1), Zone 2 (outside Zone 1, from floor to 1.0 m above floor — Reg 703.32.2), and Zone 3 (outside Zone 1, above 1.0 m to the cold side of the ceiling insulation — Reg 703.32.3). Strict limits govern what equipment may be installed in each zone.',
  'All wiring within the sauna room must use heat-resistant cable rated for the temperatures encountered. Standard PVC-insulated cable (rated 70°C) must not be used inside the sauna — use silicone rubber or XLPE cable rated to at least 170°C.',
  'RCD protection for sauna circuits is governed by BS 7671 Regulation 703.411.3.3 (the sauna-specific Part 7 rule). All sauna circuits require additional protection by 30mA RCD(s). Note the manufacturer exception: RCD protection need not be provided for the sauna heater itself unless the heater manufacturer recommends it.',
  'An Electrical Installation Certificate (EIC) must be issued, and the work must be notified under Part P as it involves a special location.',
];

const faqs = [
  {
    question: 'What size circuit does a sauna heater need?',
    answer:
      'Domestic sauna heaters range from 4.5kW to 9kW. A 4.5kW heater draws approximately 20A and needs a 20A circuit with 4.0mm² cable. A 6kW heater draws approximately 26A and needs a 32A circuit with 6.0mm² cable. A 9kW heater draws approximately 39A and needs a 40A circuit with 10.0mm² cable. Always check the manufacturer data plate — the rated current is the definitive figure, not a calculation from kW. The circuit must be a dedicated radial circuit from the consumer unit. Never share a sauna heater circuit with other loads.',
  },
  {
    question: 'What type of cable can be used inside a sauna?',
    answer:
      'Standard PVC-insulated cable (6242Y twin-and-earth) is rated for a maximum conductor temperature of 70°C. Inside a sauna, ambient temperatures can reach 100°C to 120°C in the upper zones. PVC cable would soften, degrade, and eventually fail. All wiring within the sauna room must use heat-resistant cable — silicone rubber insulated cable rated to 170°C or 180°C is the standard choice. XLPE (cross-linked polyethylene) cable rated to 90°C can be used in the lower zones where temperatures remain below 90°C but is not suitable for the upper zones or near the heater.',
  },
  {
    question: 'What are the BS 7671 Section 703 zones for a sauna?',
    answer:
      'BS 7671 Section 703 defines three zones within the sauna room (Regs 703.32.1 to 703.32.3). Zone 1 (Reg 703.32.1) is the volume containing the sauna heater, bounded by the floor, the cold side of the ceiling insulation, and a vertical surface circumscribing the heater at a distance of 0.5 m from the heater surface — only the heater and equipment belonging to the sauna heater are permitted here (Reg 703.512.2). Zone 2 (Reg 703.32.2) is the volume outside Zone 1, from the floor up to a horizontal surface 1.0 m above the floor — BS 7671 states there is no special heat-resistance requirement for equipment in Zone 2. Zone 3 (Reg 703.32.3) is the volume outside Zone 1, above 1.0 m to the cold side of the ceiling and wall insulation — here equipment must withstand a minimum of 125°C and cable insulation and sheaths a minimum of 170°C (Reg 703.512.2). Socket outlets must not be installed in the location containing the sauna heater (Reg 703.537.5), and switchgear for lighting must be placed outside the sauna room.',
  },
  {
    question: 'Does a sauna need RCD protection?',
    answer:
      'Yes, for all sauna circuits. BS 7671 Regulation 703.411.3.3 (the sauna-specific Part 7 regulation) requires additional protection for all circuits of the sauna by one or more RCDs having the characteristics specified in Regulation 415.1.1 (30mA). There is an important exception for the heater itself: RCD protection need not be provided for the sauna heater unless such protection is recommended by the heater manufacturer. In practice always check the manufacturer documentation — if the manufacturer recommends RCD protection for the heater, it is then mandatory. An RCBO on the dedicated way at the consumer unit is the standard approach for the sauna circuits — it combines overcurrent protection and earth fault protection without affecting other circuits if it trips.',
  },
  {
    question: 'Can I install a sauna in a bathroom?',
    answer:
      'A sauna cabin can be installed within a room that also contains a bath or shower, but the installation must comply with both BS 7671 Section 701 (bathrooms) and Section 703 (saunas). The sauna cabin itself creates its own zoning (Section 703 zones), but the wider room zones from Section 701 also apply to any equipment outside the sauna cabin. In practice, this means the sauna cabin must be positioned to avoid conflicts between the two sets of zones — the sauna control unit, for example, must be outside the sauna room but also outside Zone 1 of the bathroom. Careful planning at the survey stage avoids problems.',
  },
  {
    question: 'How much does a sauna electrical installation cost?',
    answer:
      'A typical domestic sauna electrical installation costs between £400 and £850. A straightforward installation with a short cable run (under 10 metres), 32A circuit, and RCBO typically costs £400 to £550. Longer cable runs, larger circuits (40A), and installations requiring heat-resistant cable through walls or ceilings will be at the higher end (£600 to £850). These prices include materials (cable, RCBO, connection unit, heat-resistant cable, fireproof junction box), labour (half a day to a full day), testing, and the EIC certificate. They do not include the sauna heater, sauna cabin, or any building work.',
  },
  {
    question: 'Does a sauna need a dedicated isolator?',
    answer:
      'Yes. A dedicated isolator or fused connection unit must be installed outside the sauna room to allow the heater to be isolated for maintenance. The isolator must be accessible and clearly labelled. Many sauna heaters include a control unit that incorporates an isolator function — check the manufacturer documentation. If the control unit does not provide full isolation, install a separate double-pole isolator outside the sauna room.',
  },
  {
    question: 'Can I use a plug-in sauna heater?',
    answer:
      'Some small sauna heaters (typically under 3kW) are sold with a 13A plug for connection to a standard socket outlet. These are at the limit of a 13A circuit and must only be used on a dedicated socket with RCD protection. However, most domestic sauna heaters (4.5kW and above) must be hardwired to a dedicated circuit. The heater connection is typically made at a fixed connection unit or terminal block outside the sauna room, with heat-resistant cable running from there through the wall into the sauna and up to the heater.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for sauna heater circuits with voltage drop and derating calculations.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Verify voltage drop on cable runs to sauna installations.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/guides/hot-tub-electrical-connection',
    title: 'Hot Tub Electrical Connection',
    description:
      'Related special location installation with dedicated circuits and RCD protection.',
    icon: Thermometer,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for sauna installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bathroom-electrical-regulations',
    title: 'Bathroom Electrical Regulations',
    description:
      'Zoning requirements for bathrooms — relevant if a sauna cabin is installed in a bathroom.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 covering testing of special location installations.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Sauna Electrical Installation: What Every Electrician Needs to Know',
    content: (
      <>
        <p>
          Domestic sauna installations have become increasingly popular in the UK. Whether it is a
          purpose-built sauna room, a barrel sauna in the garden, or a sauna cabin within a
          bathroom, the electrical installation requires careful attention to heat resistance,
          zoning, and safety.
        </p>
        <p>
          Sauna electrical work falls under{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>{' '}
          Section 703 (rooms and cabins containing sauna heaters). This section imposes specific
          requirements on wiring methods, cable types, equipment zoning, and protective measures
          that go beyond a standard domestic circuit.
        </p>
        <p>
          The most critical difference from standard installations is the temperature environment.
          Sauna rooms routinely reach 80°C to 100°C — well above the maximum operating temperature
          of standard PVC-insulated cable. Using the wrong cable type inside a sauna is a genuine
          fire risk.
        </p>
      </>
    ),
  },
  {
    id: 'heater-sizing',
    heading: 'Heater Sizing and Supply Requirements',
    content: (
      <>
        <p>
          Sauna heater selection is based on the volume of the sauna room. The general rule is 1kW
          per cubic metre of sauna space, with adjustments for insulation quality and glazing:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-white/[0.06] text-left">
                <th className="px-4 py-3 font-semibold">Sauna size</th>
                <th className="px-4 py-3 font-semibold">Heater</th>
                <th className="px-4 py-3 font-semibold">Approx. current</th>
                <th className="px-4 py-3 font-semibold">Circuit</th>
                <th className="px-4 py-3 font-semibold">Cable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="px-4 py-3">Small (3 to 5m³)</td>
                <td className="px-4 py-3 font-semibold text-yellow-300">4.5kW</td>
                <td className="px-4 py-3">~20A</td>
                <td className="px-4 py-3">20A radial</td>
                <td className="px-4 py-3">4.0mm²</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Medium (5 to 8m³)</td>
                <td className="px-4 py-3 font-semibold text-yellow-300">6kW to 8kW</td>
                <td className="px-4 py-3">~26 to 35A</td>
                <td className="px-4 py-3">32A radial</td>
                <td className="px-4 py-3">6.0mm²</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Large (8 to 12m³)</td>
                <td className="px-4 py-3 font-semibold text-yellow-300">9kW</td>
                <td className="px-4 py-3">~39A</td>
                <td className="px-4 py-3">40A radial</td>
                <td className="px-4 py-3">10.0mm²</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Commercial (12m³+)</td>
                <td className="px-4 py-3 font-semibold text-yellow-300">12kW to 18kW+</td>
                <td className="px-4 py-3">Per data plate</td>
                <td className="px-4 py-3" colSpan={2}>
                  Three-phase supply — consult manufacturer
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <p className="text-white text-sm leading-relaxed">
            <strong>Always size from the data plate, not from kW.</strong> The rated current on the
            manufacturer plate is the definitive figure — single-phase current shown above is a
            guide only (kW ÷ 230V). Size the cable and protective device to the actual installation
            conditions using the{' '}
            <SEOInternalLink href="/tools/cable-sizing-calculator">
              cable sizing calculator
            </SEOInternalLink>{' '}
            so that grouping, ambient temperature and run length derating are applied correctly.
          </p>
        </div>
        <p>
          Verify the existing supply has sufficient spare capacity for the heater. A 9kW heater on a
          property with a 60A main fuse and existing loads of 40A during peak times may require a
          supply upgrade. Check maximum demand before committing to the installation.
        </p>
      </>
    ),
  },
  {
    id: 'special-location',
    heading: 'Special Location Requirements: BS 7671 Section 703',
    content: (
      <>
        <p>
          BS 7671 Section 703 defines the requirements for rooms and cabins containing sauna
          heaters. Equipment selection turns on which of the three zones (Regs 703.32.1 to
          703.32.3) it sits in. The zone definitions and the heat-resistance rules from Reg
          703.512.2 are summarised below.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-white/[0.06] text-left">
                <th className="px-4 py-3 font-semibold">Zone</th>
                <th className="px-4 py-3 font-semibold">Extent</th>
                <th className="px-4 py-3 font-semibold">What may be installed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr className="bg-red-900/20">
                <td className="px-4 py-3 align-top font-semibold whitespace-nowrap">
                  Zone 1
                  <span className="block text-xs font-normal text-white/60">Reg 703.32.1</span>
                </td>
                <td className="px-4 py-3 align-top">
                  Volume containing the heater, bounded by the floor, the cold side of the ceiling
                  insulation and a vertical surface 0.5 m from the heater surface (or the cold side
                  of a wall if the heater sits closer than 0.5 m).
                </td>
                <td className="px-4 py-3 align-top">
                  Only the sauna heater and equipment belonging to the sauna heater
                  (Reg 703.512.2).
                </td>
              </tr>
              <tr className="bg-amber-900/20">
                <td className="px-4 py-3 align-top font-semibold whitespace-nowrap">
                  Zone 2
                  <span className="block text-xs font-normal text-white/60">Reg 703.32.2</span>
                </td>
                <td className="px-4 py-3 align-top">
                  Outside Zone 1, from the floor up to a horizontal surface 1.0 m above the floor,
                  bounded laterally by the cold side of the wall insulation.
                </td>
                <td className="px-4 py-3 align-top">
                  No special requirement concerning heat-resistance of equipment (Reg 703.512.2).
                  Switchgear forming part of the heater or other fixed equipment may sit here per
                  the manufacturer (Reg 703.537.5).
                </td>
              </tr>
              <tr className="bg-orange-900/20">
                <td className="px-4 py-3 align-top font-semibold whitespace-nowrap">
                  Zone 3
                  <span className="block text-xs font-normal text-white/60">Reg 703.32.3</span>
                </td>
                <td className="px-4 py-3 align-top">
                  Outside Zone 1, above 1.0 m from the floor to the cold side of the ceiling and
                  wall insulation.
                </td>
                <td className="px-4 py-3 align-top">
                  Equipment must withstand a minimum of 125°C; cable insulation and sheaths a
                  minimum of 170°C (Reg 703.512.2).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum IP rating (Reg 703.512.2)</strong> — equipment in the sauna shall
                have a degree of protection of at least IPX4. Where cleaning by water jets may
                reasonably be expected, at least IPX5 is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wiring (Reg 703.52)</strong> — the wiring system should preferably be
                installed outside the zones, on the cold side of the thermal insulation. Where it is
                on the warm side of the thermal insulation in Zone 1 or Zone 3 it shall be
                heat-resisting, and metallic sheaths and metallic conduits shall not be accessible
                in normal use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No socket outlets (Reg 703.537.5)</strong> — socket outlets shall not be
                installed within the location containing the sauna heater. Switchgear and
                controlgear for lighting shall be placed outside the sauna room or cabin.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protective measures not permitted</strong> — obstacles and placing out of
                reach (Reg 703.410.3.5) and non-conducting location / earth-free local bonding (Reg
                703.410.3.6) shall not be used in a sauna.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>SELV/PELV (Reg 703.414.3, A4:2026)</strong> — where SELV or PELV is used in
                Zones 1, 2 and/or 3, a source as described in Regulation 414.3(d) shall not be used.
                SELV is commonly used for sauna luminaires as an alternative protective measure, and
                any such installation must comply with Reg 703.414.3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sauna heating appliances (Reg 703.55)</strong> — must comply with BS EN
                60335-2-53 and be installed in accordance with the manufacturer's instructions.
              </span>
            </li>
          </ul>
        </div>
        <p className="text-white/70 text-sm">
          The earlier guidance that supplementary equipotential bonding may be needed for accessible
          extraneous-conductive-parts (metal bench frames, metallic door fittings) still holds where
          such parts could introduce a potential — assess each installation on its merits and bond
          where required.
        </p>
      </>
    ),
  },
  {
    id: 'cable-temperature',
    heading: 'Cable Types and Temperature Ratings',
    content: (
      <>
        <p>
          This is the single most important aspect of sauna electrical installation. Standard PVC
          cable will fail in a sauna environment. The cable types suitable for sauna installations
          are:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">
              Silicone Rubber Cable (170°C to 180°C)
            </h3>
            <p className="text-white text-sm leading-relaxed">
              The standard choice for wiring inside the sauna room, including the heater connection.
              Silicone rubber insulation withstands the high temperatures in Zone 1 and Zone 2.
              Available in single-core (for use in conduit or trunking) or multi-core. Must be
              supported with heat-resistant fixings — standard plastic cable clips will melt.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">XLPE Cable (90°C)</h3>
            <p className="text-white text-sm leading-relaxed">
              Cross-linked polyethylene insulation is rated to 90°C conductor temperature. It can be
              used in the lower zones of the sauna where ambient temperatures remain below 80°C, but
              it is not suitable for the upper zones or near the heater. In practice, most
              electricians use silicone rubber throughout the sauna room for simplicity and safety.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-white/[0.06] text-left">
                <th className="px-4 py-3 font-semibold">Cable / insulation</th>
                <th className="px-4 py-3 font-semibold">Max conductor temp</th>
                <th className="px-4 py-3 font-semibold">Use in a sauna</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr className="bg-red-900/20">
                <td className="px-4 py-3 align-top">PVC twin-and-earth (6242Y)</td>
                <td className="px-4 py-3 align-top font-semibold">70°C</td>
                <td className="px-4 py-3 align-top">
                  Not inside the sauna. Acceptable only outside the room, up to the transition
                  junction box.
                </td>
              </tr>
              <tr className="bg-amber-900/20">
                <td className="px-4 py-3 align-top">XLPE</td>
                <td className="px-4 py-3 align-top font-semibold">90°C</td>
                <td className="px-4 py-3 align-top">
                  Lower zones only, where ambient stays well below the rating. Not for Zone 3 or near
                  the heater.
                </td>
              </tr>
              <tr className="bg-green-900/20">
                <td className="px-4 py-3 align-top">Silicone rubber</td>
                <td className="px-4 py-3 align-top font-semibold">170°C to 180°C</td>
                <td className="px-4 py-3 align-top">
                  Standard choice inside the sauna, including the heater connection. Meets the
                  170°C cable requirement for Zone 3 (Reg 703.512.2).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Outside the sauna room (from the consumer unit to the wall penetration), standard PVC
          cable is acceptable as it is in a normal temperature environment. The transition from
          standard cable to heat-resistant cable should be made in a junction box outside the sauna
          room.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <p className="text-white text-sm leading-relaxed">
            <strong>Regulatory basis — Reg 703.52:</strong> Where a wiring system is installed on
            the warm side of thermal insulation in Zone 1 or Zone 3, it shall be heat-resisting.
            Metallic sheaths and metallic conduits shall not be accessible in normal use in those
            zones. Where practicable, wiring should be installed on the cold side of the thermal
            insulation (outside the zones). This is the explicit BS 7671:2018+A4:2026 requirement
            underpinning the choice of silicone rubber or equivalent heat-resistant cable inside the
            sauna room.
          </p>
        </div>
      </>
    ),
  },
  {
    id: 'installation-steps',
    heading: 'Step-by-Step Installation',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Survey</strong> — check heater kW rating, sauna room dimensions, cable route,
              consumer unit spare capacity, and earthing arrangement.
            </li>
            <li>
              <strong>Install RCBO</strong> — fit an appropriately rated RCBO on a dedicated way at
              the consumer unit. Label as "Sauna Heater".
            </li>
            <li>
              <strong>Run cable to sauna room</strong> — standard PVC cable from the consumer unit
              to a junction box or connection unit outside the sauna room wall.
            </li>
            <li>
              <strong>Transition to heat-resistant cable</strong> — at the junction box, connect to
              silicone rubber cable. Route through the wall into the sauna room and up to the heater
              position. Use heat-resistant fixings inside the sauna.
            </li>
            <li>
              <strong>Connect the heater</strong> — terminate at the heater terminal block per the
              manufacturer instructions. Ensure minimum clearances to combustible materials.
            </li>
            <li>
              <strong>Install sauna lighting (if required)</strong> — use luminaires rated for
              sauna use. BS 7671 requires at least IPX4 (IPX5 where water jets are expected, Reg
              703.512.2); in Zone 3 the equipment must withstand a minimum of 125°C. Wire in
              silicone rubber cable.
            </li>
            <li>
              <strong>Install control unit</strong> — mount the sauna control unit outside the sauna
              room in a normal temperature environment.
            </li>
            <li>
              <strong>Supplementary bonding</strong> — bond any accessible
              extraneous-conductive-parts within the sauna room.
            </li>
            <li>
              <strong>Test and certify</strong> — complete all initial verification tests and issue
              an EIC. Notify under Part P.
            </li>
          </ol>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection',
    content: (
      <>
        <p>
          BS 7671 Regulation 703.411.3.3 (the sauna-specific Part 7 rule) requires additional
          protection for all circuits of the sauna by one or more RCDs having the characteristics of
          Regulation 415.1.1 (30mA). The combination of high temperatures and moisture —
          particularly in combined sauna/steam rooms — makes RCD protection essential.
        </p>
        <p>
          There is a specific exception for the sauna heater: RCD protection need not be provided
          for the sauna heater itself unless the heater manufacturer recommends it. Always check the
          manufacturer documentation before deciding whether to apply RCD protection to the heater
          circuit. If the manufacturer recommends it, RCD protection becomes mandatory for the
          heater.
        </p>
        <p>
          An RCBO on the dedicated way at the consumer unit is the standard approach for sauna
          circuits. Type A is preferred over Type AC as sauna heater controllers may include
          electronic components that produce DC fault components.
        </p>
      </>
    ),
  },
  {
    id: 'testing-certification',
    heading: 'Testing and Certification',
    content: (
      <>
        <p>
          The completed installation must be tested in accordance with BS 7671 Chapter 64 (Initial
          Verification, BS 7671:2018+A4:2026):
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Continuity of protective conductors including supplementary bonding</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Insulation resistance — 500V DC, minimum 1 megohm (disconnect the heater before
                testing)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Polarity verification at all termination points</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Earth fault loop impedance (Zs) within limits for the protective device</span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                RCD operation — for a general (non-delay) type RCD, effectiveness is deemed
                verified where it disconnects within 300ms maximum at its rated residual operating
                current (IΔn)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Functional testing — verify heater operation, thermostat cut-off, and timer
                operation
              </span>
            </li>
          </ul>
        </div>
        <p>
          An{' '}
          <SEOInternalLink href="/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          must be issued. The remarks should reference BS 7671 Section 703. The work must be
          notified under Part P of the Building Regulations as it involves a special location.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Realistic Pricing for Sauna Electrical Installation (2026)',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-white/[0.06] text-left">
                <th className="px-4 py-3 font-semibold">Scope</th>
                <th className="px-4 py-3 font-semibold">Indicative price</th>
                <th className="px-4 py-3 font-semibold">What it covers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="px-4 py-3 align-top">Small sauna (4.5kW), short run</td>
                <td className="px-4 py-3 align-top font-semibold text-green-300 whitespace-nowrap">
                  £400 to £550
                </td>
                <td className="px-4 py-3 align-top">
                  20A circuit, RCBO, standard + silicone cable, testing, EIC
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top">Medium sauna (6 to 8kW), medium run</td>
                <td className="px-4 py-3 align-top font-semibold text-green-300 whitespace-nowrap">
                  £550 to £700
                </td>
                <td className="px-4 py-3 align-top">
                  32A circuit, longer cable run, heat-resistant cable and fixings
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top">Large sauna (9kW), long run</td>
                <td className="px-4 py-3 align-top font-semibold text-green-300 whitespace-nowrap">
                  £650 to £850
                </td>
                <td className="px-4 py-3 align-top">40A circuit, 10.0mm² cable, more labour</td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top">Sauna lighting circuit (add-on)</td>
                <td className="px-4 py-3 align-top font-semibold text-green-300 whitespace-nowrap">
                  + £150 to £300
                </td>
                <td className="px-4 py-3 align-top">Heat-resistant luminaires and silicone cable</td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top">Consumer unit upgrade (add-on)</td>
                <td className="px-4 py-3 align-top font-semibold text-green-300 whitespace-nowrap">
                  + £350 to £600
                </td>
                <td className="px-4 py-3 align-top">If no spare ways are available</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          These are indicative market figures for guidance, not a quote — price each job to its
          conditions. They include materials, labour (half a day to a full day), testing, and the
          EIC certificate, and exclude the sauna heater, sauna cabin, and any building work.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Sauna Installation Tips',
    content: (
      <>
        <p>
          Sauna installations are specialist work that commands premium pricing. The key
          differentiator is knowing the Section 703 requirements and using the correct
          heat-resistant materials.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Thermometer className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Stock Silicone Cable</h4>
                <p className="text-white text-sm leading-relaxed">
                  Keep a reel of silicone rubber cable in the van if you are marketing sauna
                  installations. It is not a standard stock item at most wholesalers and may need to
                  be ordered. Having it ready saves a return visit.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote with Specialist Materials</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">quoting app</SEOInternalLink> to
                  itemise the heat-resistant cable, silicone fixings, fireproof junction box, and
                  specialist luminaires. These cost more than standard materials — make sure the
                  quote reflects this.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify sauna electrical installations"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certification. 7-day free trial."
          icon={Thermometer}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SaunaElectricalInstallationPage() {
  return (
    <GuideTemplate
      title="Sauna Electrical Installation | Special Location Guide UK"
      description="Complete guide to sauna electrical installation in the UK. Dedicated supply, BS 7671 Section 703 requirements, heat-resistant cable, temperature zones…"
      datePublished="2026-03-27"
      dateModified="2026-06-10"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Thermometer}
      heroTitle={
        <>
          Sauna Electrical Installation:{' '}
          <span className="text-yellow-400">Special Location Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="Saunas are special locations under BS 7671 Section 703. Heat-resistant cable, temperature zones, dedicated circuits, and correct zoning are essential. This guide covers everything from heater sizing to testing and certification."
      answerBox={{
        question: 'What are the electrical requirements for a sauna installation in the UK?',
        answer:
          'A sauna is a special location under BS 7671 Section 703. It needs a dedicated radial circuit sized to the heater (typically 20A to 40A), heat-resistant cable inside the room (silicone rubber rated 170°C to 180°C), and 30mA RCD protection on all circuits under Reg 703.411.3.3. Equipment must meet the zone rules of Regs 703.32.1 to 703.32.3. An EIC must be issued and the work notified under Part P.',
        detail:
          'No socket outlets are permitted in the location containing the sauna heater (Reg 703.537.5), and switchgear for lighting must be placed outside the sauna room.',
      }}
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Sauna Electrical Installation"
      relatedPages={relatedPages}
      ctaHeading="Size Cables and Certify Sauna Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certificates for special location work. 7-day free trial, cancel anytime."
    />
  );
}
