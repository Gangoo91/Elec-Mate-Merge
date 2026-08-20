import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import { Droplets, ShieldCheck, FileCheck2, ClipboardCheck, FileText, Calculator } from 'lucide-react';

// -------------------------------------------------------------------
// Shared surface classes — edge-to-edge on phones, inset from sm: up
// -------------------------------------------------------------------

const CARD =
  '-mx-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';

const TABLE_WRAP = `${CARD} overflow-x-auto`;
const TABLE = 'w-full min-w-[520px] text-left text-sm text-white';
const TH = 'border-b border-white/20 py-3 pr-4 align-bottom font-semibold text-white';
const TD = 'py-3 pr-4 align-top text-white';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Bathroom Electrical Zones', href: '/guides/bathroom-electrical-zones-bs7671' },
];

const tocItems = [
  { id: 'at-a-glance', label: 'Every Zone at a Glance' },
  { id: 'zones', label: 'How the Zone Boundaries Are Measured' },
  { id: 'zone-0', label: 'Zone 0 — Inside the Bath or Shower Basin' },
  { id: 'zone-1', label: 'Zone 1 — Around the Bath or Shower' },
  { id: 'zone-2', label: 'Zone 2 — The 0.60 m Strip Beyond' },
  { id: 'rcd-bonding', label: 'RCD Protection and Supplementary Bonding' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Zone 0 is the interior of the bath tub or shower basin. Minimum IPX7, and current-using equipment must be fixed, permanently connected and SELV at no more than 12 V AC RMS or 30 V ripple-free DC with the safety source outside zones 0, 1 and 2 (Regs 701.512.2 and 701.55).',
  'Zone 1 and Zone 2 both require a minimum of IPX4 (Reg 701.512.2). Equipment exposed to water jets — for example for cleaning purposes — needs at least IPX5.',
  'Both zones rise to the higher of 2.25 m above finished floor level or the plane of the highest fixed shower head or water outlet (Regs 701.32.3 and 701.32.4). Zone 2 is the 0.60 m strip beyond the Zone 1 boundary.',
  'For a shower without a basin there is no Zone 2 — Zone 1 is instead extended to 1.20 m from the centre point of the fixed water outlet (Reg 701.32.3(b)(ii)).',
  'Zone 1 permits only fixed, permanently connected whirlpool units, electric showers, shower pumps, SELV/PELV equipment up to 25 V AC RMS or 60 V ripple-free DC, ventilation equipment, towel rails, water heating appliances and luminaires (Reg 701.55).',
  'Socket-outlets are prohibited within 2.50 m horizontally of the Zone 1 boundary, except SELV socket-outlets to Section 414 and shaver supply units to BS EN 61558-2-5 (Reg 701.512.3).',
  'Reg 701.411.3.3 requires 30 mA RCD additional protection for low voltage circuits serving the location and for circuits merely passing through zones 1 and/or 2 — not only for circuits feeding equipment inside the zones.',
  'Supplementary bonding (Reg 701.415.2) may be omitted only where the building has a protective equipotential bonding system to Reg 411.3.1.2 and conditions (d), (e) and (f) of 701.415.2 are all met.',
];

const faqs = [
  {
    question: 'What is the zone classification in a bathroom under BS 7671?',
    answer:
      'BS 7671 Section 701 defines three zones. Zone 0 is the interior of the bath tub or shower basin. Zone 1 is the volume around the bath or shower, bounded laterally by the vertical surface circumscribing the bath tub or shower basin, and vertically by finished floor level up to the higher of 2.25 m or the plane of the highest fixed shower head or water outlet. Zone 2 is the 0.60 m strip beyond the Zone 1 boundary, over the same height. For a shower without a basin there is no Zone 2 — Zone 1 is extended to 1.20 m from the centre point of the fixed water outlet instead (Regs 701.32.2 to 701.32.4).',
  },
  {
    question: 'What IP rating is required in each bathroom zone?',
    answer:
      'Regulation 701.512.2 requires at least IPX7 in Zone 0 and at least IPX4 in zones 1 and 2. Equipment exposed to water jets, for example for cleaning purposes, must be at least IPX5. The requirement does not apply to shaver supply units complying with BS EN 61558-2-5 installed in Zone 2 and located where direct spray from showers is unlikely. Outside the zones, Section 701 sets no minimum IP rating, although IPX4 fittings are common practice in bathrooms. IP codes are defined in BS EN 60529: the first digit covers solid objects, the second covers water.',
  },
  {
    question: 'Can a light switch be installed in a bathroom?',
    answer:
      'Regulation 701.512.3 prohibits switchgear and accessories in Zone 0. In Zone 1 the only switches permitted are those of SELV circuits at no more than 12 V AC RMS or 30 V ripple-free DC, with the safety source outside zones 0, 1 and 2. In Zone 2, switchgear and accessories incorporating switches are prohibited apart from SELV switches and socket-outlets and shaver supply units to BS EN 61558-2-5. Two exclusions matter in practice: the regulation does not apply to switches and controls incorporated in fixed current-using equipment suitable for that zone, nor to the insulating pull cords of cord-operated switches. That is why a ceiling-mounted pull-cord switch with its body outside the zones, or a wall switch on the landing side of the door, is the usual solution.',
  },
  {
    question: 'Where can a shaver socket be installed in a bathroom?',
    answer:
      'Shaver supply units conforming to BS EN 61558-2-5 are permitted in Zone 2 and outside the zones, and they are one of the two exceptions to the 2.50 m socket-outlet prohibition in Reg 701.512.3 (the other being SELV socket-outlets to Section 414). They must not be installed in Zone 0 or Zone 1. Under Reg 701.512.2 a shaver supply unit to BS EN 61558-2-5 installed in Zone 2 need not meet the IPX4 requirement provided it is located where direct spray from showers is unlikely; where direct spray is possible, IPX4 applies.',
  },
  {
    question: 'What electrical equipment is allowed in Zone 0?',
    answer:
      'Regulation 701.55 permits current-using equipment in Zone 0 only where all three conditions are met: the equipment complies with the relevant standard and is suitable for that zone according to the manufacturer’s instructions for use and mounting; it is fixed and permanently connected; and it is protected by SELV at a nominal voltage not exceeding 12 V AC RMS or 30 V ripple-free DC with the safety source installed outside zones 0, 1 and 2. It must also be at least IPX7 (Reg 701.512.2). Reg 701.512.3 prohibits switchgear and accessories in Zone 0 entirely. In practice this limits Zone 0 to purpose-made products such as in-bath LED lighting.',
  },
  {
    question: 'Is RCD protection required for all bathroom circuits?',
    answer:
      'Regulation 701.411.3.3 requires additional protection by one or more RCDs with the characteristics specified in Reg 415.1.1 — that is, a rated residual operating current not exceeding 30 mA — for low voltage circuits serving the location, and for low voltage circuits passing through zones 1 and/or 2 even where they do not serve the location. So a cable simply running through Zone 2 on its way elsewhere needs RCD protection too. In practice this is achieved with an RCBO per circuit or by taking the bathroom circuits from an RCD-protected way in the consumer unit. A separate requirement, Reg 411.3.4, calls for 30 mA RCD additional protection for AC final circuits supplying luminaires within domestic premises generally.',
  },
  {
    question: 'What are the rules for underfloor heating in a bathroom?',
    answer:
      'Regulation 701.753 requires that only heating cables to the relevant product standards, or thin sheet flexible heating elements to the relevant equipment standard, are used — and they must have a metal sheath, a metal enclosure or a fine mesh metallic grid. That sheath, enclosure or grid must be connected to the protective conductor of the supply circuit, unless the protective measure SELV is provided for the floor heating system. Protection by electrical separation must not be used for electric floor heating. The circuit also needs 30 mA RCD additional protection under Reg 701.411.3.3, and any thermostat or switch must satisfy the zone rules for wherever it is mounted.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/bathroom-electrical-regulations',
    title: 'Bathroom Electrical Regulations',
    description:
      'Full BS 7671 Section 701 guide including supplementary bonding and RCD requirements.',
    icon: Droplets,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Issue Electrical Installation Certificates for bathroom work on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/minor-works-certificate',
    title: 'Minor Works Certificate',
    description: 'For additions to existing bathroom circuits — issue on site instantly.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/guides/part-p-building-regulations-electrical',
    title: 'Part P Building Regulations',
    description: 'All bathroom work (except like-for-like) is notifiable under Part P.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size shower and bathroom circuit cables correctly.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/electrical-safety-checks-new-home',
    title: 'Electrical Safety Checks for a New Home',
    description: 'What to check in bathrooms when assessing an existing electrical installation.',
    icon: FileText,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'at-a-glance',
    heading: 'Every Bathroom Zone at a Glance',
    content: (
      <>
        <p>
          BS 7671 Section 701 applies to locations containing a fixed bath (bath tub) or shower and
          to the surrounding zones. It does not apply to emergency facilities such as emergency
          showers used in industrial areas or laboratories (Reg 701.1). The table below is the whole
          zone system on one screen; the sections that follow give the detail behind each row.
        </p>
        <div className={TABLE_WRAP}>
          <table className={TABLE}>
            <caption className="sr-only">
              BS 7671 Section 701 bathroom zones: extent, minimum IP rating and permitted equipment
            </caption>
            <thead>
              <tr>
                <th className={TH} scope="col">
                  Zone
                </th>
                <th className={TH} scope="col">
                  Extent
                </th>
                <th className={TH} scope="col">
                  Minimum IP
                </th>
                <th className={`${TH} pr-0`} scope="col">
                  Headline restriction
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <th className={`${TD} font-semibold`} scope="row">
                  Zone 0
                </th>
                <td className={TD}>Interior of the bath tub or shower basin</td>
                <td className={TD}>IPX7</td>
                <td className={`${TD} pr-0`}>
                  Fixed, permanently connected SELV equipment only — 12 V AC RMS / 30 V ripple-free
                  DC. No switchgear or accessories.
                </td>
              </tr>
              <tr>
                <th className={`${TD} font-semibold`} scope="row">
                  Zone 1
                </th>
                <td className={TD}>
                  Vertical surface circumscribing the bath or basin, floor up to the higher of 2.25 m
                  or the highest fixed shower head
                </td>
                <td className={TD}>IPX4</td>
                <td className={`${TD} pr-0`}>
                  Only the fixed equipment listed in Reg 701.55. Switches only on SELV circuits at
                  12 V AC RMS / 30 V ripple-free DC.
                </td>
              </tr>
              <tr>
                <th className={`${TD} font-semibold`} scope="row">
                  Zone 2
                </th>
                <td className={TD}>0.60 m beyond the Zone 1 boundary, over the same height</td>
                <td className={TD}>IPX4</td>
                <td className={`${TD} pr-0`}>
                  No switchgear, accessories incorporating switches or socket-outlets, except SELV
                  and shaver supply units to BS EN 61558-2-5.
                </td>
              </tr>
              <tr>
                <th className={`${TD} font-semibold`} scope="row">
                  Outside the zones
                </th>
                <td className={TD}>Beyond Zone 2, or above the zone height</td>
                <td className={TD}>None stated</td>
                <td className={`${TD} pr-0`}>
                  Socket-outlets still prohibited within 2.50 m horizontally of the Zone 1 boundary
                  (Reg 701.512.3).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Two rules cut across every zone. Regulation 701.512.2 raises the minimum to{' '}
          <strong>IPX5</strong> for equipment exposed to water jets, for example for cleaning
          purposes. And Regulation 701.411.3.3 requires 30 mA RCD additional protection for low
          voltage circuits serving the location as well as circuits that merely pass through zones 1
          and/or 2.
        </p>
        <p>
          Section 701 also rules out three protective measures outright: obstacles and placing out of
          reach (Reg 701.410.3.5), and non-conducting location and earth-free local equipotential
          bonding (Reg 701.410.3.6). Protection by electrical separation is allowed, but only for a
          circuit supplying one item of current-using equipment or one single socket-outlet (Reg
          701.413).
        </p>
      </>
    ),
  },
  {
    id: 'zones',
    heading: 'How the Zone Boundaries Are Measured',
    content: (
      <>
        <p>
          Zone dimensions are measured from the interior of the bath tub or shower basin outwards,
          and from finished floor level upwards. Get the boundary wrong and every equipment decision
          downstream of it is wrong too, so it is worth measuring rather than eyeballing.
        </p>
        {/* grounded: printed BS 7671:2018+A4:2026 — 701.32.2 zone 0; 701.32.3 zone 1 (2.25 m or highest fixed shower head, whichever is higher; 1.20 m for showers without a basin); 701.32.4 zone 2 (0.60 m from the zone 1 border, no zone 2 where there is no basin). */}
        <figure className={CARD}>
          <figcaption className="mb-1 text-base font-bold text-white">
            Bathroom zones — cross-section
          </figcaption>
          <p className="mb-4 text-xs text-white">
            Vertical limits measured from finished floor level (BS 7671 Regs 701.32.2 to 701.32.4)
          </p>
          <svg
            viewBox="0 0 360 250"
            role="img"
            aria-label="Cross-section of BS 7671 bathroom electrical zones: Zone 0 is the interior of the bath tub, Zone 1 is the area around and above the bath up to 2.25 metres from finished floor level, and Zone 2 extends a further 0.6 metres beyond the Zone 1 boundary."
            className="h-auto w-full"
          >
            {/* Zone 1 column */}
            <rect x="20" y="50" width="130" height="170" fill="#f9731626" />
            {/* Zone 2 strip */}
            <rect x="150" y="50" width="70" height="170" fill="#eab30826" />
            {/* 2.25 m line */}
            <line
              x1="20"
              y1="50"
              x2="300"
              y2="50"
              stroke="#ffffff"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text x="304" y="54" fill="#ffffff" fontSize="11">
              2.25 m
            </text>
            {/* floor + wall */}
            <line x1="20" y1="220" x2="345" y2="220" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="20" y1="50" x2="20" y2="220" stroke="#ffffff" strokeWidth="1.5" />
            {/* bath tub with Zone 0 interior */}
            <path
              d="M30 180 q0 32 26 32 h60 q26 0 26 -32 z"
              fill="#ef444459"
              stroke="#ef4444"
              strokeWidth="1.5"
            />
            <text x="60" y="205" fill="#ffffff" fontSize="11" fontWeight="bold">
              Zone 0
            </text>
            {/* zone labels */}
            <text x="58" y="100" fill="#ffffff" fontSize="13" fontWeight="bold">
              Zone 1
            </text>
            <text x="160" y="100" fill="#ffffff" fontSize="13" fontWeight="bold">
              Zone 2
            </text>
            <text x="244" y="100" fill="#ffffff" fontSize="12">
              Outside
            </text>
            <text x="244" y="116" fill="#ffffff" fontSize="12">
              the zones
            </text>
            {/* 0.6 m bracket under zone 2 */}
            <line x1="150" y1="230" x2="220" y2="230" stroke="#eab308" strokeWidth="1.5" />
            <line x1="150" y1="226" x2="150" y2="234" stroke="#eab308" strokeWidth="1.5" />
            <line x1="220" y1="226" x2="220" y2="234" stroke="#eab308" strokeWidth="1.5" />
            <text x="167" y="245" fill="#eab308" fontSize="11">
              0.6 m
            </text>
          </svg>
          <p className="mt-3 text-xs text-white">
            Schematic only. Where the highest fixed shower head or water outlet sits above 2.25 m,
            that higher plane becomes the top of zones 1 and 2.
          </p>
        </figure>

        <h3 className="pt-2 text-[15px] font-semibold tracking-tight text-white">
          The vertical limit is not always 2.25 m
        </h3>
        <p>
          Regulations 701.32.3(a) and 701.32.4(a) both set the top of the zone at the finished floor
          level up to the horizontal plane corresponding to the highest fixed shower head or water
          outlet, <strong>or</strong> the plane 2.25 m above finished floor level — whichever is
          higher. A drencher head at 2.4 m therefore lifts the top of Zone 1 and Zone 2 to 2.4 m, and
          a fitting that would have been outside the zones is now inside them.
        </p>

        <h3 className="pt-2 text-[15px] font-semibold tracking-tight text-white">
          Showers without a basin behave differently
        </h3>
        <p>
          Where a shower has no basin, Zone 1 is bounded laterally by the vertical surface 1.20 m
          from the centre point of the fixed water outlet on the wall or ceiling (Reg
          701.32.3(b)(ii)), and <strong>there is no Zone 2</strong> — the enlarged Zone 1 replaces it
          (Reg 701.32.4). Zone 0 in that arrangement is 0.10 m high with the same horizontal extent
          as Zone 1 (Reg 701.32.2). The 1.20 m figure does not apply to a bath or a shower tray; for
          those, Zone 1 is bounded by the vertical surface circumscribing the bath tub or basin.
        </p>

        <h3 className="pt-2 text-[15px] font-semibold tracking-tight text-white">
          Under the bath is Zone 1 — usually
        </h3>
        <p>
          The space under the bath tub or shower basin is Zone 1. If that space is only accessible
          with a tool, it is considered to be outside the zones (Reg 701.32.3). A screwed or clipped
          bath panel that comes away by hand does not buy you the exemption.
        </p>

        <h3 className="pt-2 text-[15px] font-semibold tracking-tight text-white">
          Walls, ceilings and partitions
        </h3>
        <p>
          Ceilings, walls, doors, floors and fixed partitions may be taken into account where they
          effectively limit the extent of the location and its zones. Where a fixed partition is
          smaller than the relevant zone — Reg 701.32.1 gives the example of a partition lower than
          2.25 m — the minimum distance in the horizontal and vertical directions must be taken into
          account, so the zone is measured around the partition rather than stopping at it. For
          equipment set into a wall or ceiling that limits a zone but forms part of that surface, the
          requirements for the zone apply.
        </p>
      </>
    ),
  },
  {
    id: 'zone-0',
    heading: 'Zone 0: Inside the Bath or Shower Basin',
    content: (
      <>
        <p>
          Zone 0 is the interior of the bath tub or shower basin (Reg 701.32.2) — the space the water
          occupies and where a person is in direct contact with it. It carries the tightest
          requirements in the whole of Section 701.
        </p>
        <div className={CARD}>
          <h3 className="text-[15px] font-semibold tracking-tight text-white">
            Reg 701.55 — all three conditions must be met
          </h3>
          <ul className="mt-3 space-y-2 text-white">
            <li>
              (a) The equipment complies with the relevant standard and is suitable for use in Zone 0
              according to the manufacturer&rsquo;s instructions for use and mounting.
            </li>
            <li>(b) The equipment is fixed and permanently connected.</li>
            <li>
              (c) The equipment is protected by SELV at a nominal voltage not exceeding{' '}
              <strong>12 V AC RMS or 30 V ripple-free DC</strong>, with the safety source installed
              outside zones 0, 1 and 2.
            </li>
          </ul>
          <div className="mt-5 border-t border-white/[0.1] pt-4">
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              Plus, from elsewhere in Section 701
            </h3>
            <ul className="mt-3 space-y-2 text-white">
              <li>Minimum degree of protection IPX7 (Reg 701.512.2).</li>
              <li>Switchgear and accessories must not be installed at all (Reg 701.512.3).</li>
              <li>
                Where SELV or PELV is used, basic protection must be provided by basic insulation to
                Reg 416.1 or by barriers or enclosures to Reg 416.2, whatever the nominal voltage
                (Reg 701.414.4.5). The low-voltage exemptions that apply elsewhere do not apply here.
              </li>
              <li>
                The SELV or PELV source described in Reg 414.3(d) must not be used in zones 0, 1 or 2
                (Reg 701.414.3).
              </li>
            </ul>
          </div>
        </div>
        <p>
          In domestic practice Zone 0 is rarely a design problem, because very little is ever
          installed inside a bath or shower basin. The main Zone 0 product is purpose-made in-bath
          LED lighting. A fitting inside a shower enclosure but above the tray is in Zone 1, not Zone
          0 — check which one you are actually in before selecting the product.
        </p>
      </>
    ),
  },
  {
    id: 'zone-1',
    heading: 'Zone 1: Around the Bath or Shower',
    content: (
      <>
        <p>
          Zone 1 is bounded laterally by the vertical surface circumscribing the bath tub or shower
          basin, and vertically by finished floor level up to the higher of 2.25 m or the plane of
          the highest fixed shower head or water outlet (Reg 701.32.3). It excludes Zone 0. Minimum
          degree of protection is IPX4 (Reg 701.512.2).
        </p>
        <p>
          Regulation 701.55 gives a closed list. Only the following fixed and permanently connected
          current-using equipment may be installed in Zone 1, and only where it is suitable for Zone
          1 according to the manufacturer&rsquo;s instructions.
        </p>
        <div className={TABLE_WRAP}>
          <table className={TABLE}>
            <caption className="sr-only">
              Current-using equipment permitted in bathroom Zone 1 under BS 7671 Reg 701.55
            </caption>
            <thead>
              <tr>
                <th className={TH} scope="col">
                  Reg 701.55
                </th>
                <th className={TH} scope="col">
                  Permitted in Zone 1
                </th>
                <th className={`${TH} pr-0`} scope="col">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className={TD}>(d)</td>
                <td className={TD}>Whirlpool units</td>
                <td className={`${TD} pr-0`}>Fixed and permanently connected</td>
              </tr>
              <tr>
                <td className={TD}>(e)</td>
                <td className={TD}>Electric showers</td>
                <td className={`${TD} pr-0`}>Fixed and permanently connected</td>
              </tr>
              <tr>
                <td className={TD}>(f)</td>
                <td className={TD}>Shower pumps</td>
                <td className={`${TD} pr-0`}>Fixed and permanently connected</td>
              </tr>
              <tr>
                <td className={TD}>(g)</td>
                <td className={TD}>SELV or PELV equipment</td>
                <td className={`${TD} pr-0`}>
                  Not exceeding 25 V AC RMS or 60 V ripple-free DC, safety source outside zones 0, 1
                  and 2
                </td>
              </tr>
              <tr>
                <td className={TD}>(h)</td>
                <td className={TD}>Ventilation equipment</td>
                <td className={`${TD} pr-0`}>Extract fans rated for the zone</td>
              </tr>
              <tr>
                <td className={TD}>(i)</td>
                <td className={TD}>Towel rails</td>
                <td className={`${TD} pr-0`}>Expressly permitted in Zone 1</td>
              </tr>
              <tr>
                <td className={TD}>(j)</td>
                <td className={TD}>Water heating appliances</td>
                <td className={`${TD} pr-0`}>Fixed and permanently connected</td>
              </tr>
              <tr>
                <td className={TD}>(k)</td>
                <td className={TD}>Luminaires</td>
                <td className={`${TD} pr-0`}>IPX4 minimum; IP65 downlighters are common practice</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Anything not on that list has no place in Zone 1. Note in particular that the SELV/PELV
          limit for <em>current-using equipment</em> in Zone 1 is 25 V AC RMS or 60 V ripple-free DC,
          which is a different figure from the 12 V AC RMS / 30 V ripple-free DC limit that applies
          to Zone 0 equipment and to Zone 1 switches.
        </p>
        <div className={CARD}>
          <h3 className="text-[15px] font-semibold tracking-tight text-white">
            Switchgear and accessories in Zone 1 (Reg 701.512.3)
          </h3>
          <p className="mt-3 text-white">
            Only switches of SELV circuits at a nominal voltage not exceeding 12 V AC RMS or 30 V
            ripple-free DC may be installed, with the safety source outside zones 0, 1 and 2. Every
            other switch, accessory and socket-outlet is prohibited.
          </p>
          <p className="mt-3 text-white">
            Two exclusions sit outside that prohibition entirely: switches and controls incorporated
            in fixed current-using equipment suitable for use in that zone, and the insulating pull
            cords of cord-operated switches. The pull cord of a ceiling switch may therefore hang
            into Zone 1 — it is the switch body that has to be sited acceptably.
          </p>
        </div>
        <p>
          A ceiling above 2.25 m puts recessed downlighters outside the zones, but only if no fixed
          shower head or water outlet sits higher than they do. Where the ceiling is at or below the
          zone height, a luminaire directly over the bath is in Zone 1 and must be at least IPX4.
        </p>
      </>
    ),
  },
  {
    id: 'zone-2',
    heading: 'Zone 2: The 0.60 m Strip Beyond',
    content: (
      <>
        <p>
          Zone 2 is bounded by the vertical surface at the Zone 1 boundary and the parallel vertical
          surface 0.60 m from it, over the same height as Zone 1 (Reg 701.32.4). In a typical
          bathroom that strip takes in the washbasin, the mirror and often the towel rail. Minimum
          degree of protection is IPX4 (Reg 701.512.2). Remember that a shower without a basin has no
          Zone 2 at all.
        </p>
        <p>
          Regulation 701.55 restricts current-using equipment in zones 0 and 1 only, so in Zone 2 any
          equipment suitable for the location may be used provided it meets the IP requirement.
          Switchgear and accessories are where Zone 2 bites.
        </p>
        <div className={CARD}>
          <h3 className="text-[15px] font-semibold tracking-tight text-white">
            Reg 701.512.3 — switchgear, accessories and socket-outlets
          </h3>
          <p className="mt-3 text-white">
            Switchgear, accessories incorporating switches and socket-outlets must not be installed
            in Zone 2, with two exceptions:
          </p>
          <ul className="mt-3 space-y-2 text-white">
            <li>
              (a) switches and socket-outlets of SELV circuits, the safety source being installed
              outside zones 0, 1 and 2;
            </li>
            <li>(b) shaver supply units complying with BS EN 61558-2-5.</li>
          </ul>
          <div className="mt-5 border-t border-white/[0.1] pt-4">
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              The 2.50 m rule reaches past Zone 2
            </h3>
            <p className="mt-3 text-white">
              Except for SELV socket-outlets complying with Section 414 and shaver supply units
              complying with BS EN 61558-2-5, socket-outlets are prohibited within{' '}
              <strong>2.50 m horizontally</strong> of the boundary of Zone 1. That distance is
              measured from the Zone 1 boundary, not from Zone 2, and it applies irrespective of
              mounting height — so in most bathrooms a 13 A socket is non-compliant anywhere in the
              room.
            </p>
          </div>
          <div className="mt-5 border-t border-white/[0.1] pt-4">
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              The shaver socket IP exception
            </h3>
            <p className="mt-3 text-white">
              Regulation 701.512.2 states that the IPX4 requirement does not apply to shaver supply
              units complying with BS EN 61558-2-5 installed in Zone 2 and located where direct spray
              from showers is unlikely. Where direct spray is possible, IPX4 still applies.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-bonding',
    heading: 'RCD Protection and Supplementary Bonding',
    content: (
      <>
        <h3 className="text-[15px] font-semibold tracking-tight text-white">
          Reg 701.411.3.3 — additional protection by RCDs
        </h3>
        <p>
          Additional protection by one or more RCDs having the characteristics specified in Reg
          415.1.1 — a rated residual operating current not exceeding 30 mA — must be provided for low
          voltage circuits:
        </p>
        <div className={CARD}>
          <ul className="space-y-2 text-white">
            <li>(a) serving the location; and</li>
            <li>(b) passing through zones 1 and/or 2 not serving the location.</li>
          </ul>
          <p className="mt-3 text-white">
            Limb (b) is the one that gets missed. A circuit that merely runs through Zone 1 or Zone 2
            on its way to a bedroom needs 30 mA RCD protection even though nothing in the bathroom is
            fed from it. The regulation&rsquo;s note points to Regs 314.1(d) and 531.3.2 on avoiding
            unwanted tripping — the practical answer is usually an RCBO per circuit rather than
            everything on one RCD.
          </p>
        </div>
        <p>
          A separate and wider requirement sits in Chapter 41: Regulation 411.3.4 requires additional
          protection by a 30 mA RCD for AC final circuits supplying luminaires within domestic
          (household) premises. It is not a Section 701 measure and it is not limited to bathrooms —
          but when you add a bathroom light to an existing lighting circuit, both requirements have to
          be satisfied.
        </p>

        <h3 className="pt-2 text-[15px] font-semibold tracking-tight text-white">
          Reg 701.415.2 — supplementary protective equipotential bonding
        </h3>
        <p>
          Local supplementary bonding to Reg 415.2 must connect together the terminals of the
          protective conductor of each circuit supplying Class I <em>and</em> Class II equipment to
          the accessible extraneous-conductive-parts within the room, including:
        </p>
        <div className={CARD}>
          <ul className="space-y-2 text-white">
            <li>(a) metallic pipes supplying services and metallic waste pipes, for example water and gas;</li>
            <li>(b) metallic central heating pipes and air conditioning systems;</li>
            <li>
              (c) accessible metallic structural parts of the building. Metallic door architraves,
              window frames and similar parts are not extraneous-conductive-parts unless they are
              connected to metallic structural parts of the building.
            </li>
          </ul>
          <p className="mt-3 text-white">
            The bonding may be installed inside or outside the room, preferably close to the point at
            which the extraneous-conductive-parts enter it.
          </p>
        </div>
        <p>
          Supplementary bonding may be omitted <strong>only</strong> where the location is in a
          building with a protective equipotential bonding system in accordance with Reg 411.3.1.2{' '}
          <strong>and</strong> all three of these conditions are met: (d) all final circuits of the
          location comply with the requirements for automatic disconnection according to Reg 411.3.2;
          (e) all final circuits of the location have additional protection by means of an RCD in
          accordance with Reg 415.1.1; and (f) all extraneous-conductive-parts of the location are
          effectively connected to the protective equipotential bonding according to Reg 411.3.1.2.
          Where main protective bonding is missing or unproven, supplementary bonding cannot be
          omitted however good the RCD protection is. Reg 415.2.2 gives the test used to assess
          condition (f) where necessary.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Mistakes in Bathroom Electrical Installations',
    content: (
      <>
        <p>
          Bathrooms are among the most frequently coded areas on an EICR. These are the errors that
          come up again and again.
        </p>
        <div className={CARD}>
          <ul className="space-y-4 text-white">
            <li>
              <strong>Assuming the zone stops at 2.25 m.</strong> Where the highest fixed shower head
              or water outlet is above 2.25 m, that plane becomes the top of zones 1 and 2 (Regs
              701.32.3 and 701.32.4). Drencher heads on a raised arm routinely pull ceiling fittings
              back into Zone 1.
            </li>
            <li>
              <strong>Light fittings with no IP marking in Zone 1 or 2.</strong> If the luminaire does
              not declare an IP rating it cannot be shown to meet the IPX4 minimum of Reg 701.512.2,
              so it is not suitable for either zone.
            </li>
            <li>
              <strong>Shaver socket in Zone 1.</strong> Shaver supply units to BS EN 61558-2-5 are
              permitted in Zone 2 and outside the zones, never in Zone 0 or Zone 1 (Reg 701.512.3).
            </li>
            <li>
              <strong>Missing RCD protection on a circuit that only passes through.</strong> Reg
              701.411.3.3(b) catches cables routed through zones 1 and 2 that serve rooms elsewhere.
              These are easy to overlook because nothing in the bathroom is fed from them.
            </li>
            <li>
              <strong>13 A socket inside the 2.50 m exclusion.</strong> Reg 701.512.3 prohibits
              socket-outlets within 2.50 m horizontally of the Zone 1 boundary, except SELV
              socket-outlets to Section 414 and shaver supply units to BS EN 61558-2-5. In a large
              bathroom a socket beyond 2.50 m is compliant; in most it is not.
            </li>
            <li>
              <strong>Treating a glass screen as the end of the zone.</strong> Reg 701.32.1 allows
              fixed partitions to be taken into account only where they effectively limit the zone.
              Where a partition is smaller than the zone — the standard&rsquo;s example is one lower
              than 2.25 m — the minimum distance in the horizontal and vertical directions must be
              taken into account, so the zone is measured around it.
            </li>
            <li>
              <strong>Under-bath equipment written off as outside the zones.</strong> The space under
              the bath tub or shower basin is Zone 1 unless it is accessible only with a tool (Reg
              701.32.3). A hand-removable bath panel does not qualify.
            </li>
            <li>
              <strong>Floor heating with no earthed metallic screen.</strong> Reg 701.753 requires a
              metal sheath, metal enclosure or fine mesh metallic grid connected to the protective
              conductor of the supply circuit, unless SELV is used for the heating system. It is a
              requirement, not a recommendation.
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Bathroom Work in Practice',
    content: (
      <>
        <p>
          The first job on any bathroom is to establish the zone boundaries for that specific room —
          measure to the highest fixed water outlet, decide whether there is a basin, and only then
          choose equipment. Small bathrooms often sit entirely inside the 2.50 m socket exclusion;
          larger ones have real space outside the zones.
        </p>
        <div className="space-y-4">
          <div className={CARD}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              Certificate on site, before you leave
            </h3>
            <p className="mt-2 text-white">
              Issue your{' '}
              <SEOInternalLink href="/eic-certificate">
                Electrical Installation Certificate
              </SEOInternalLink>{' '}
              or a{' '}
              <SEOInternalLink href="/minor-works-certificate">
                Minor Works Certificate
              </SEOInternalLink>{' '}
              from your phone. Bathroom work in dwellings is notifiable under Part P except for
              like-for-like replacement, so the paperwork has to follow the job.
            </p>
          </div>
          <div className={CARD}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              Sizing the shower circuit
            </h3>
            <p className="mt-2 text-white">
              Use the{' '}
              <SEOInternalLink href="/tools/cable-sizing-calculator">
                cable sizing calculator
              </SEOInternalLink>{' '}
              to size electric shower and towel rail circuits against the actual installation method,
              grouping and ambient temperature rather than a rule of thumb.
            </p>
          </div>
          <div className={CARD}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              Two RCD requirements, not one
            </h3>
            <p className="mt-2 text-white">
              Reg 701.411.3.3 covers circuits serving the location and circuits passing through zones
              1 and 2. Reg 411.3.4 separately requires 30 mA RCD additional protection for AC final
              circuits supplying luminaires within domestic premises. A consumer unit with an
              unprotected lighting way will not satisfy either once a bathroom light is added to it.
            </p>
          </div>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function BathroomZoneElectricalPage() {
  return (
    <GuideTemplate
      title="Bathroom Zones BS 7671: Zone 1 2.25 m, IPX4"
      description="Zone 0 inside the bath: IPX7, SELV. Zone 1 to 2.25 m or highest shower head: IPX4. Zone 2 a further 0.60 m: IPX4. 30 mA RCD required on bathroom circuits."
      datePublished="2026-03-27"
      dateModified="2026-08-07"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="BS 7671 Guide"
      badgeIcon={Droplets}
      heroTitle={
        <>
          Bathroom Electrical Zones:{' '}
          <span className="text-elec-yellow">BS 7671 Section 701 Zone Guide</span>
        </>
      }
      heroSubtitle="Zone 0 is the interior of the bath tub or shower basin. Zone 1 runs to the higher of 2.25 m or the highest fixed shower head. Zone 2 is the 0.60 m strip beyond it. This guide gives the boundaries, the IP ratings, the equipment permitted in each zone and the regulation numbers behind them."
      readingTime={12}
      answerBox={{
        question: 'What are the bathroom zones in BS 7671?',
        answer:
          'Zone 0 is the interior of the bath tub or shower basin and needs IPX7 with SELV at no more than 12 V AC RMS or 30 V ripple-free DC. Zone 1 surrounds the bath or basin up to the higher of 2.25 m or the highest fixed shower head. Zone 2 is the 0.60 m strip beyond it. Both need IPX4.',
        detail:
          'Section 701 also requires 30 mA RCD additional protection for low voltage circuits serving the location and for circuits passing through zones 1 and 2 (Reg 701.411.3.3), and prohibits socket-outlets within 2.50 m horizontally of the Zone 1 boundary apart from SELV socket-outlets and shaver supply units to BS EN 61558-2-5 (Reg 701.512.3).',
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Bathroom Electrical Zones"
      relatedPages={relatedPages}
      ctaHeading="Issue Bathroom Electrical Certificates On Site"
      ctaSubheading="Elec-Mate lets you complete EICs and Minor Works Certificates for bathroom electrical work on your phone. All Part P notifiable — get the certificate done on site before you leave. 7-day free trial."
    />
  );
}
