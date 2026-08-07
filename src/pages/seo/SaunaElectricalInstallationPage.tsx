import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Thermometer,
  ShieldCheck,
  FileCheck2,
  Calculator,
  Zap,
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Shared class strings
// -------------------------------------------------------------------

/** Tables: edge-to-edge on phones, inset from sm:. Scrolls inside itself. */
const tableWrapCn =
  '-mx-4 my-5 overflow-x-auto rounded-none border-y border-white/[0.14] bg-white/[0.04] ' +
  'sm:mx-0 sm:rounded-2xl sm:border-x';

const tableCn = 'w-full min-w-[560px] text-sm text-white';

const cardCn =
  '-mx-4 my-5 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] ' +
  'to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Sauna Electrical Installation', href: '/guides/sauna-electrical-installation' },
];

const tocItems = [
  { id: 'overview', label: 'The Numbers, Up Front' },
  { id: 'heater-sizing', label: 'Heater Sizing and Supply' },
  { id: 'special-location', label: 'Section 703 Zones and Rules' },
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
  'Domestic sauna heaters typically draw 4.5kW to 9kW, needing a dedicated 20A to 40A radial circuit. Larger commercial units may require a three-phase supply.',
  'BS 7671 Section 703 (rooms and cabins containing sauna heaters) applies to cabins erected on site and to the room the heater is installed in — in which case the whole room is the sauna (Reg 703.1). It does not apply to prefabricated cabins complying with a relevant equipment standard.',
  'Three zones are defined by Regs 703.32.1 to 703.32.3. Zone 1 is the heater volume out to 0.5 m from the heater surface, Zone 2 is outside Zone 1 up to 1.0 m above the floor, and Zone 3 is outside Zone 1 above 1.0 m to the cold side of the ceiling and wall insulation.',
  'Zone 3 equipment must withstand a minimum of 125°C and cable insulation and sheaths a minimum of 170°C (Reg 703.512.2). Silicone rubber cable rated 170°C to 180°C is the usual choice; standard 70°C PVC twin-and-earth and 90°C XLPE do not meet it.',
  'Additional protection by 30mA RCD is required for all circuits of the sauna (Reg 703.411.3.3), with one exception: RCD protection need not be provided for the sauna heater itself unless the manufacturer recommends it.',
  'An Electrical Installation Certificate (EIC) must be issued, and a new circuit is notifiable building work under Part P in England and Wales.',
];

const faqs = [
  {
    question: 'What size circuit does a sauna heater need?',
    answer:
      'Domestic sauna heaters range from 4.5kW to 9kW. A 4.5kW heater draws approximately 20A and needs a 20A circuit with 4.0mm² cable. A 6kW heater draws approximately 26A and needs a 32A circuit with 6.0mm² cable. An 8kW heater draws approximately 35A and a 9kW heater approximately 39A, so both need a 40A circuit with 10.0mm² cable — a 32A device would sit below the design current and breach the Ib ≤ In ≤ Iz coordination rule of Regulation 433.1.1. Always check the manufacturer data plate: the rated current is the definitive figure, not a calculation from kW. The circuit must be a dedicated radial circuit from the consumer unit, and cable size must be confirmed against the installation method, grouping, ambient temperature and run length.',
  },
  {
    question: 'What type of cable can be used inside a sauna?',
    answer:
      'Regulation 703.512.2 requires that in Zone 3 the insulation and sheaths of cables withstand a minimum temperature of 170°C. Regulation 703.52 adds that where a wiring system is on the warm side of the thermal insulation in Zone 1 or Zone 3 it shall be heat-resisting, and that metallic sheaths and metallic conduits shall not be accessible in normal use. Standard PVC twin-and-earth (6242Y) is rated for a maximum conductor temperature of 70°C and XLPE for 90°C, so neither satisfies the 170°C figure. Silicone rubber insulated cable rated 170°C to 180°C is the standard choice. BS 7671 also states a preference: the wiring system should preferably be installed outside the zones altogether, on the cold side of the thermal insulation.',
  },
  {
    question: 'What are the BS 7671 Section 703 zones for a sauna?',
    answer:
      'Regulations 703.32.1 to 703.32.3 define three zones (see also Figure 703). Zone 1 is the volume containing the sauna heater, limited by the floor, the cold side of the ceiling thermal insulation and a vertical surface circumscribing the heater 0.5 m from its surface — if the heater is closer than 0.5 m to a wall, Zone 1 is limited by the cold side of that wall insulation. Zone 2 is the volume outside Zone 1, limited by the floor, the cold side of the wall insulation and a horizontal surface 1.0 m above the floor. Zone 3 is the volume outside Zone 1, limited by the cold side of the ceiling and wall insulation and a horizontal surface 1.0 m above the floor. Regulation 703.512.2 then sets what may go where: in Zone 1 only the sauna heater and equipment belonging to it; in Zone 2 no special heat-resistance requirement; in Zone 3 equipment must withstand a minimum of 125°C and cable insulation and sheaths a minimum of 170°C.',
  },
  {
    question: 'Does a sauna need RCD protection?',
    answer:
      'Yes. Regulation 703.411.3.3 requires additional protection for all circuits of the sauna by one or more RCDs having the characteristics specified in Regulation 415.1.1 — that is, a rated residual operating current not exceeding 30mA. There is one exception written into the same regulation: RCD protection need not be provided for the sauna heater unless such protection is recommended by the manufacturer. Always check the manufacturer documentation, because where the manufacturer recommends it, it is then required. An RCBO on a dedicated way is the usual approach, as it combines overcurrent and residual current protection without taking other circuits out when it operates.',
  },
  {
    question: 'Can I install a sauna in a bathroom?',
    answer:
      'Regulation 703.1 settles this directly: where facilities such as showers are installed, the requirements of Section 701 also apply alongside Section 703. It also states that where the sauna heater is installed in a room, the whole room is considered as the sauna. So both sets of zones have to be satisfied at once — the Section 703 zones for the sauna and the Section 701 zones for the bath or shower. In practice that governs where the control gear can go, because Regulation 703.537.5 already places switchgear and controlgear for lighting outside the sauna room or cabin, and the Section 701 zones then constrain where outside it may sit. Plan this at survey stage rather than on the day.',
  },
  {
    question: 'How much does a sauna electrical installation cost?',
    answer:
      'A typical domestic sauna electrical installation costs between £400 and £850. A straightforward installation with a short cable run (under 10 metres), 32A circuit, and RCBO typically costs £400 to £550. Longer cable runs, larger circuits (40A), and installations requiring heat-resistant cable through walls or ceilings will be at the higher end (£600 to £850). These prices include materials (cable, RCBO, connection unit, heat-resistant cable, fireproof junction box), labour (half a day to a full day), testing, and the EIC certificate. They do not include the sauna heater, sauna cabin, or any building work. Price each job to its own conditions.',
  },
  {
    question: 'Does a sauna need a dedicated isolator?',
    answer:
      'Every circuit must be provided with a means of isolation for all live conductors (Regulation 462.2), so the sauna circuit needs one. Where it goes is set by Regulation 703.537.5: switchgear and controlgear that forms part of the sauna heater equipment, or of other fixed equipment installed in Zone 2, may be installed within the sauna room or cabin in accordance with the manufacturer instructions. Other switchgear and controlgear — for lighting, for example — shall be placed outside the sauna room or cabin. In practice the isolator and the sauna control unit are almost always mounted outside the room in a normal temperature environment, which is simpler to justify and easier to reach. Label it clearly.',
  },
  {
    question: 'Can I use a plug-in sauna heater?',
    answer:
      'Some small sauna heaters (typically under 3kW) are supplied with a 13A plug. Regulation 703.537.5 states that socket-outlets shall not be installed within the location containing the sauna heater, so the socket has to be outside that location and the flex run in to the heater. The circuit still falls under Regulation 703.411.3.3, so 30mA RCD protection applies. Most domestic sauna heaters at 4.5kW and above must be hardwired to a dedicated circuit: the connection is made at a fixed connection unit or terminal block, with heat-resistant cable running from there through the wall into the sauna and up to the heater.',
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
    href: '/inspection-testing-course',
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
    heading: 'The Section 703 Numbers, Up Front',
    content: (
      <>
        <p>
          These are the figures you are most likely to be looking for. Everything below is taken
          from Section 703 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>
          , which covers rooms and cabins containing sauna heaters.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <tbody className="divide-y divide-white/10">
              <tr>
                <th scope="row" className="px-4 py-3 text-left align-top font-semibold">
                  Zone 1 extent
                </th>
                <td className="px-4 py-3 align-top">
                  Heater volume, out to <strong>0.5 m</strong> from the heater surface
                </td>
                <td className="px-4 py-3 align-top whitespace-nowrap">Reg 703.32.1</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 text-left align-top font-semibold">
                  Zone 2 / Zone 3 split
                </th>
                <td className="px-4 py-3 align-top">
                  Horizontal surface <strong>1.0 m</strong> above the floor
                </td>
                <td className="px-4 py-3 align-top whitespace-nowrap">Regs 703.32.2 / .3</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 text-left align-top font-semibold">
                  Zone 3 equipment
                </th>
                <td className="px-4 py-3 align-top">
                  Withstand a minimum of <strong>125°C</strong>
                </td>
                <td className="px-4 py-3 align-top whitespace-nowrap">Reg 703.512.2</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 text-left align-top font-semibold">
                  Zone 3 cable
                </th>
                <td className="px-4 py-3 align-top">
                  Insulation and sheaths withstand a minimum of{' '}
                  <strong className="text-elec-yellow">170°C</strong>
                </td>
                <td className="px-4 py-3 align-top whitespace-nowrap">Reg 703.512.2</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 text-left align-top font-semibold">
                  Degree of protection
                </th>
                <td className="px-4 py-3 align-top">
                  At least <strong>IPX4</strong>; at least <strong>IPX5</strong> where cleaning by
                  water jets may reasonably be expected
                </td>
                <td className="px-4 py-3 align-top whitespace-nowrap">Reg 703.512.2</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 text-left align-top font-semibold">
                  RCD
                </th>
                <td className="px-4 py-3 align-top">
                  <strong className="text-elec-yellow">30mA</strong> additional protection for all
                  circuits of the sauna; heater exempt unless the manufacturer recommends it
                </td>
                <td className="px-4 py-3 align-top whitespace-nowrap">Reg 703.411.3.3</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 text-left align-top font-semibold">
                  Socket-outlets
                </th>
                <td className="px-4 py-3 align-top">
                  Shall not be installed within the location containing the sauna heater
                </td>
                <td className="px-4 py-3 align-top whitespace-nowrap">Reg 703.537.5</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 text-left align-top font-semibold">
                  Heating appliance
                </th>
                <td className="px-4 py-3 align-top">
                  Shall comply with BS EN 60335-2-53 and be installed to the manufacturer
                  instructions
                </td>
                <td className="px-4 py-3 align-top whitespace-nowrap">Reg 703.55</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="mb-2 mt-6 text-base font-semibold text-white">
          When Section 703 applies — and when it does not
        </h3>
        <p>
          Regulation 703.1 sets the scope. The section applies to sauna cabins erected on site, and
          to the room in which the sauna heater or heating appliances are installed — in that case{' '}
          <strong>the whole room is considered as the sauna</strong>, not just the cabin. It does{' '}
          <strong>not</strong> apply to prefabricated sauna cabins complying with a relevant
          equipment standard, though you still have to establish that the cabin actually meets one
          before relying on that. Where facilities such as showers are installed, Section 701 applies
          as well.
        </p>
        <p>
          The environment is what sets sauna work apart. Rooms routinely run at 80°C to 100°C, well
          above the 70°C maximum conductor temperature of standard PVC-insulated cable, and BS 7671
          responds with explicit heat-resistance figures rather than general wording. Getting the
          cable type wrong inside a sauna is a genuine fire risk.
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
          Sauna heater selection is based on the volume of the sauna room. Manufacturers generally
          work to around 1kW per cubic metre of sauna space, adjusted for insulation quality and
          glazing. The circuit ratings below follow the overload coordination rule of Regulation
          433.1.1 — design current Ib ≤ device rating In ≤ cable capacity Iz.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
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
                <td className="px-4 py-3 font-semibold">4.5kW</td>
                <td className="px-4 py-3">~20A</td>
                <td className="px-4 py-3">20A radial</td>
                <td className="px-4 py-3">4.0mm²</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Medium (5 to 8m³)</td>
                <td className="px-4 py-3 font-semibold">6kW</td>
                <td className="px-4 py-3">~26A</td>
                <td className="px-4 py-3">32A radial</td>
                <td className="px-4 py-3">6.0mm²</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Large (8 to 12m³)</td>
                <td className="px-4 py-3 font-semibold">8kW to 9kW</td>
                <td className="px-4 py-3">~35 to 39A</td>
                <td className="px-4 py-3">40A radial</td>
                <td className="px-4 py-3">10.0mm²</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Commercial (12m³+)</td>
                <td className="px-4 py-3 font-semibold">12kW to 18kW+</td>
                <td className="px-4 py-3">Per data plate</td>
                <td className="px-4 py-3" colSpan={2}>
                  Three-phase supply — consult manufacturer
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={cardCn}>
          <h3 className="mb-2 text-base font-semibold text-white">
            Size from the data plate, not from kW
          </h3>
          <p className="text-sm leading-relaxed text-white">
            The rated current on the manufacturer plate is the definitive figure. The single-phase
            currents above are a guide only (kW ÷ 230V) and the cable sizes assume a favourable
            installation method. Size the cable and protective device to the actual conditions with
            the{' '}
            <SEOInternalLink href="/tools/cable-sizing-calculator">
              cable sizing calculator
            </SEOInternalLink>{' '}
            so that grouping, ambient temperature, thermal insulation and run length are all applied
            before you commit to a size.
          </p>
        </div>
        <p>
          Check maximum demand before quoting. A 9kW heater on a property with a 60A main fuse and
          existing loads of 40A at peak times may need a supply upgrade, and that is a conversation
          to have at survey stage rather than on the day of the install.
        </p>
      </>
    ),
  },
  {
    id: 'special-location',
    heading: 'Section 703 Zones and Rules',
    content: (
      <>
        <p>
          Regulation 703.32 requires that the zones of Regulations 703.32.1 to 703.32.3 are taken
          into account, and refers to Figure 703 for the dimensions. Equipment selection then turns
          on which zone the item sits in, under Regulation 703.512.2.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
            <thead>
              <tr className="bg-white/[0.06] text-left">
                <th className="px-4 py-3 font-semibold">Zone</th>
                <th className="px-4 py-3 font-semibold">Extent</th>
                <th className="px-4 py-3 font-semibold">What may be installed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="px-4 py-3 align-top font-semibold whitespace-nowrap">
                  Zone 1
                  <span className="block text-xs font-normal text-white">Reg 703.32.1</span>
                </td>
                <td className="px-4 py-3 align-top">
                  The volume containing the heater, limited by the floor, the cold side of the
                  ceiling thermal insulation and a vertical surface circumscribing the heater 0.5 m
                  from its surface. If the heater is closer than 0.5 m to a wall, the cold side of
                  that wall insulation is the limit instead.
                </td>
                <td className="px-4 py-3 align-top">
                  Only the sauna heater and equipment belonging to the sauna heater.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top font-semibold whitespace-nowrap">
                  Zone 2
                  <span className="block text-xs font-normal text-white">Reg 703.32.2</span>
                </td>
                <td className="px-4 py-3 align-top">
                  Outside Zone 1, limited by the floor, the cold side of the wall thermal insulation
                  and a horizontal surface 1.0 m above the floor.
                </td>
                <td className="px-4 py-3 align-top">
                  No special requirement concerning heat-resistance of equipment. Switchgear forming
                  part of the heater, or of other fixed equipment installed here, may stay inside the
                  cabin per the manufacturer instructions (Reg 703.537.5).
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top font-semibold whitespace-nowrap">
                  Zone 3
                  <span className="block text-xs font-normal text-white">Reg 703.32.3</span>
                </td>
                <td className="px-4 py-3 align-top">
                  Outside Zone 1, limited by the cold side of the ceiling and wall thermal insulation
                  and a horizontal surface 1.0 m above the floor.
                </td>
                <td className="px-4 py-3 align-top">
                  Equipment must withstand a minimum of 125°C; cable insulation and sheaths a minimum
                  of 170°C.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-white">
          Note the wording used throughout: boundaries are the <strong>cold side</strong> of the
          thermal insulation, not the visible internal lining. Where insulation sits behind timber
          cladding, an accessory that looks recessed in the lining may still be inside the zone.
        </p>

        <h3 className="mb-2 mt-6 text-base font-semibold text-white">The rest of Section 703</h3>
        <div className={cardCn}>
          <dl className="space-y-4 text-white">
            <div>
              <dt className="font-semibold">Degree of protection — Reg 703.512.2</dt>
              <dd className="mt-1 text-sm leading-relaxed">
                Equipment shall have a degree of protection of at least IPX4. Where cleaning by use
                of water jets may reasonably be expected, at least IPX5.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Wiring systems — Reg 703.52</dt>
              <dd className="mt-1 text-sm leading-relaxed">
                The wiring system should preferably be installed outside the zones, on the cold side
                of the thermal insulation. Where it is on the warm side of the thermal insulation in
                Zone 1 or Zone 3 it shall be heat-resisting. Metallic sheaths and metallic conduits
                shall not be accessible in normal use.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Switchgear and socket-outlets — Reg 703.537.5</dt>
              <dd className="mt-1 text-sm leading-relaxed">
                Switchgear and controlgear forming part of the sauna heater equipment, or of other
                fixed equipment installed in Zone 2, may be installed within the sauna room or cabin
                in accordance with the manufacturer instructions. Other switchgear and controlgear,
                for example for lighting, shall be placed outside the room or cabin. Socket-outlets
                shall not be installed within the location containing the sauna heater.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Protective measures ruled out — Regs 703.410.3.5/.3.6</dt>
              <dd className="mt-1 text-sm leading-relaxed">
                Obstacles and placing out of reach (Section 417) shall not be used. Non-conducting
                location (Reg 418.1) and earth-free local equipotential bonding (Reg 418.2) shall not
                be used.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">SELV and PELV — Regs 703.414.3 and 703.414.4.5</dt>
              <dd className="mt-1 text-sm leading-relaxed">
                Regulation 703.414.3 was introduced at A4:2026: where SELV or PELV is used in Zones
                1, 2 and/or 3, a source described in Regulation 414.3(d) shall not be used. Whatever
                the nominal voltage, basic protection shall be provided by basic insulation complying
                with Regulation 416.1 or by barriers or enclosures complying with Regulation 416.2.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Heating appliances — Reg 703.55</dt>
              <dd className="mt-1 text-sm leading-relaxed">
                Sauna heating appliances shall comply with BS EN 60335-2-53 and be installed in
                accordance with the manufacturer instructions.
              </dd>
            </div>
          </dl>
        </div>
        <p className="text-sm text-white">
          Section 703 contains no supplementary bonding requirement of its own. Where simultaneously
          accessible extraneous-conductive-parts are present — a metal bench frame or metallic door
          fittings that could introduce a potential — supplementary protective equipotential bonding
          is assessed under Regulation 415.2 in the normal way.
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
          This is the single most important decision on a sauna job. Regulation 703.512.2 puts a hard
          number on it: in Zone 3, the insulation and sheaths of cables shall withstand a minimum
          temperature of <strong>170°C</strong>. Regulation 703.52 then requires that any wiring on
          the warm side of the thermal insulation in Zone 1 or Zone 3 is heat-resisting.
        </p>
        <div className={tableWrapCn}>
          <table className={tableCn}>
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
                  Does not meet the 170°C Zone 3 figure. Use only outside the sauna, up to the
                  transition junction box.
                </td>
              </tr>
              <tr className="bg-amber-900/20">
                <td className="px-4 py-3 align-top">XLPE</td>
                <td className="px-4 py-3 align-top font-semibold">90°C</td>
                <td className="px-4 py-3 align-top">
                  Does not meet the 170°C Zone 3 figure either. Zone 2 carries no special
                  heat-resistance requirement, so XLPE can be used there, but not in Zone 1 or Zone 3.
                </td>
              </tr>
              <tr className="bg-green-900/20">
                <td className="px-4 py-3 align-top">Silicone rubber</td>
                <td className="px-4 py-3 align-top font-semibold">170°C to 180°C</td>
                <td className="px-4 py-3 align-top">
                  Meets the 170°C Zone 3 requirement. The standard choice throughout the sauna room,
                  including the heater connection.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Silicone rubber is available in single-core for conduit or trunking and in multi-core, and
          it must be supported with heat-resistant fixings — standard plastic clips will soften and
          drop the cable. Most electricians run silicone throughout the sauna room rather than
          switching cable type at a zone boundary that is defined by the position of insulation you
          cannot see once the cladding is on.
        </p>

        <h3 className="mb-2 mt-6 text-base font-semibold text-white">Where the cable changes</h3>
        <p>
          Outside the sauna room, from the consumer unit to the wall penetration, standard PVC cable
          is in a normal temperature environment and is fine. Make the transition to heat-resistant
          cable in a junction box outside the room. Better still, follow the preference stated in
          Regulation 703.52 and keep the wiring system outside the zones altogether, on the cold side
          of the thermal insulation, where the temperature question does not arise.
        </p>
      </>
    ),
  },
  {
    id: 'installation-steps',
    heading: 'Step-by-Step Installation',
    content: (
      <div className={cardCn}>
        <ol className="list-inside list-decimal space-y-4 text-white">
          <li>
            <strong>Survey</strong> — heater data plate rating, sauna room dimensions, where the
            thermal insulation actually sits, cable route, consumer unit spare capacity, maximum
            demand and earthing arrangement.
          </li>
          <li>
            <strong>Install the protective device</strong> — an RCBO on a dedicated way, rated to the
            data plate current per Reg 433.1.1. Label it "Sauna Heater".
          </li>
          <li>
            <strong>Run cable to the sauna room</strong> — standard PVC cable from the consumer unit
            to a junction box or connection unit outside the sauna room wall.
          </li>
          <li>
            <strong>Transition to heat-resistant cable</strong> — connect to silicone rubber cable at
            the junction box, route through the wall and up to the heater position, and fix with
            heat-resistant supports. Metallic sheaths and conduits must not be accessible in normal
            use (Reg 703.52).
          </li>
          <li>
            <strong>Connect the heater</strong> — terminate at the heater terminal block per the
            manufacturer instructions and observe the stated clearances to combustible materials.
          </li>
          <li>
            <strong>Install sauna lighting, if required</strong> — luminaires rated for sauna use, at
            least IPX4 (IPX5 where water jets may reasonably be expected). Nothing but the heater and
            equipment belonging to it may go in Zone 1, and in Zone 3 the luminaire must withstand a
            minimum of 125°C. The switch goes outside the room (Reg 703.537.5).
          </li>
          <li>
            <strong>Install the control unit and isolation</strong> — every circuit needs a means of
            isolation for all live conductors (Reg 462.2). Mount the control unit and isolator
            outside the sauna room in a normal temperature environment unless the switchgear forms
            part of the heater equipment and the manufacturer instructions place it inside.
          </li>
          <li>
            <strong>Bond where required</strong> — assess simultaneously accessible
            extraneous-conductive-parts against Regulation 415.2 and provide supplementary bonding
            where it is called for.
          </li>
          <li>
            <strong>Test and certify</strong> — complete initial verification, issue an EIC, and
            notify the work under Part P.
          </li>
        </ol>
      </div>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection',
    content: (
      <>
        <p>
          Regulation 703.411.3.3 requires additional protection for all circuits of the sauna by one
          or more RCDs having the characteristics specified in Regulation 415.1.1 — RCDs with a rated
          residual operating current not exceeding 30mA. The combination of high temperature and
          moisture, particularly in a combined sauna and shower room, is exactly the scenario that
          regulation exists for.
        </p>

        <h3 className="mb-2 mt-6 text-base font-semibold text-white">The heater exception</h3>
        <p>
          The same regulation carries one exception: RCD protection need not be provided for the
          sauna heater unless such protection is recommended by the manufacturer. That makes the
          manufacturer documentation part of the design decision, not an afterthought — where the
          manufacturer recommends RCD protection for the heater, Regulation 703.411.3.3 makes it a
          requirement. Record which way you went and why, because the next person inspecting it will
          ask.
        </p>

        <h3 className="mb-2 mt-6 text-base font-semibold text-white">Choosing the RCD type</h3>
        <p>
          Regulation 531.3.3 is explicit: an RCD Type AC shall only be used to serve fixed equipment
          where it is known that the load current contains no DC components. A sauna controller with
          electronics in it does not satisfy that test, so Type A — which trips on alternating
          sinusoidal residual current and on residual pulsating direct current — is the appropriate
          minimum for a controlled heater. An RCBO on a dedicated way is the usual arrangement, as it
          keeps the rest of the installation up if the sauna circuit operates.
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
          Initial verification follows Chapter 64 of BS 7671:2018+A4:2026. Two points are worth
          flagging on a sauna in particular: the insulation resistance sequence changed at A4, and
          the RCD test is a single test at IΔn.
        </p>
        <div className={cardCn}>
          <dl className="space-y-4 text-white">
            <div>
              <dt className="font-semibold">Continuity of protective conductors</dt>
              <dd className="mt-1 text-sm leading-relaxed">
                Including any supplementary bonding installed under Regulation 415.2.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Insulation resistance — Reg 643.3</dt>
              <dd className="mt-1 text-sm leading-relaxed">
                A sauna heater is connected equipment likely to influence the result or be damaged,
                so Regulation 643.3.3 applies as a two-stage sequence. Test at the Table 64 voltage
                before the heater is connected — 500V DC and not less than 1 MΩ for a 230V circuit.
                Then, following connection of the equipment, apply a test at{' '}
                <strong>250V DC</strong> between live conductors and the protective conductor, with a
                minimum value of <strong>1 MΩ</strong>.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Polarity — Reg 643.6</dt>
              <dd className="mt-1 text-sm leading-relaxed">
                Verified at all termination points, including the heater terminal block.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Earth fault loop impedance</dt>
              <dd className="mt-1 text-sm leading-relaxed">
                Zs within the limit for the protective device and the disconnection time that applies
                to the circuit under Regulation 411.3.2.2.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">RCD verification — Reg 643.8</dt>
              <dd className="mt-1 text-sm leading-relaxed">
                Effectiveness is verified with suitable test equipment to BS EN 61557-6. Regardless of
                RCD type, effectiveness is deemed verified where the device disconnects within{' '}
                <strong>300ms</strong> maximum for a general non-delay type, on an alternating
                current test at the rated residual operating current (IΔn).
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Functional testing</dt>
              <dd className="mt-1 text-sm leading-relaxed">
                Heater operation, thermostat cut-off, timer operation, and isolation.
              </dd>
            </div>
          </dl>
        </div>
        <p>
          An{' '}
          <SEOInternalLink href="/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          must be issued, with Section 703 referenced in the remarks and departures recorded if there
          are any. Installing the new circuit is notifiable building work under Part P in England and
          Wales, so notify it through your scheme or to building control.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Realistic Pricing for Sauna Electrical Installation (2026)',
    content: (
      <>
        <div className={tableWrapCn}>
          <table className={tableCn}>
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
                <td className="px-4 py-3 align-top font-semibold whitespace-nowrap">£400 to £550</td>
                <td className="px-4 py-3 align-top">
                  20A circuit, RCBO, standard + silicone cable, testing, EIC
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top">Medium sauna (6kW), medium run</td>
                <td className="px-4 py-3 align-top font-semibold whitespace-nowrap">£550 to £700</td>
                <td className="px-4 py-3 align-top">
                  32A circuit, longer cable run, heat-resistant cable and fixings
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top">Large sauna (8 to 9kW), long run</td>
                <td className="px-4 py-3 align-top font-semibold whitespace-nowrap">£650 to £850</td>
                <td className="px-4 py-3 align-top">40A circuit, 10.0mm² cable, more labour</td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top">Sauna lighting circuit (add-on)</td>
                <td className="px-4 py-3 align-top font-semibold whitespace-nowrap">
                  + £150 to £300
                </td>
                <td className="px-4 py-3 align-top">Heat-resistant luminaires and silicone cable</td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top">Consumer unit upgrade (add-on)</td>
                <td className="px-4 py-3 align-top font-semibold whitespace-nowrap">
                  + £350 to £600
                </td>
                <td className="px-4 py-3 align-top">If no spare ways are available</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          These are indicative market figures for guidance, not a quote — price each job to its own
          conditions. They include materials, labour of half a day to a full day, testing and the
          EIC, and exclude the sauna heater, the cabin, and any building work.
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
          Sauna work is specialist and prices accordingly. The differentiator is knowing Section 703
          well enough to answer the customer's questions on the spot, and turning up with the right
          materials.
        </p>
        <div className={cardCn}>
          <h3 className="mb-2 text-base font-semibold text-white">Stock silicone cable</h3>
          <p className="text-sm leading-relaxed text-white">
            Keep a reel of silicone rubber cable and heat-resistant fixings in the van if you are
            marketing sauna installations. Neither is a standard stock item at most wholesalers and
            both may need ordering, so having them ready is the difference between one visit and two.
          </p>
        </div>
        <div className={cardCn}>
          <h3 className="mb-2 text-base font-semibold text-white">Quote the specialist materials</h3>
          <p className="text-sm leading-relaxed text-white">
            Use the{' '}
            <SEOInternalLink href="/electrical-quoting-app">quoting app</SEOInternalLink> to itemise
            the heat-resistant cable, silicone fixings, fireproof junction box and sauna-rated
            luminaires. They cost considerably more than the standard equivalents, and a quote built
            from a domestic radial template will not cover them.
          </p>
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
      title="Sauna Electrical Requirements UK: 170°C Cable"
      description="Zone 3 cable must withstand 170°C, equipment 125°C, with 30mA RCD on all sauna circuits (Reg 703.411.3.3). Heaters 4.5-9kW need a 20A to 40A radial."
      datePublished="2026-03-27"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Thermometer}
      heroTitle={
        <>
          Sauna Electrical Installation:{' '}
          <span className="text-elec-yellow">BS 7671 Section 703 Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="A sauna is a special location under BS 7671 Section 703. Three zones, a 170°C cable figure in Zone 3, IPX4 as a minimum, 30mA RCD on all circuits, and a dedicated radial sized to the heater data plate. Every figure on this page is cited to its regulation."
      answerBox={{
        question: 'What are the electrical requirements for a sauna installation in the UK?',
        answer:
          'A sauna is a special location under BS 7671 Section 703. It needs a dedicated radial circuit sized to the heater data plate (typically 20A to 40A), 30mA RCD additional protection on all circuits of the sauna (Reg 703.411.3.3), and equipment to at least IPX4. In Zone 3, equipment must withstand 125°C and cable insulation and sheaths 170°C (Reg 703.512.2) — silicone rubber cable, not 70°C PVC. An EIC must be issued and the new circuit notified under Part P.',
        detail:
          'Socket-outlets shall not be installed within the location containing the sauna heater, and switchgear for lighting shall be placed outside the sauna room or cabin (Reg 703.537.5). Section 703 does not apply to prefabricated cabins complying with a relevant equipment standard (Reg 703.1).',
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
