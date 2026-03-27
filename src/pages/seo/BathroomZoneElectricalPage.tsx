import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Droplets,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  ClipboardCheck,
  Zap,
  FileText,
  Calculator,
  XCircle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Bathroom Electrical Zones', href: '/guides/bathroom-electrical-zones-bs7671' },
];

const tocItems = [
  { id: 'overview', label: 'BS 7671 Section 701 Overview' },
  { id: 'zones', label: 'Bathroom Zones Explained' },
  { id: 'ip-ratings', label: 'IP Ratings Per Zone' },
  { id: 'zone-0', label: 'Zone 0 — Inside the Bath or Shower' },
  { id: 'zone-1', label: 'Zone 1 — Above the Bath or Shower Tray' },
  { id: 'zone-2', label: 'Zone 2 — Outside Zone 1' },
  { id: 'outside-zones', label: 'Outside the Zones' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671 Section 701 defines three zones in bathrooms and shower rooms (Zone 0, Zone 1, Zone 2) based on proximity to water — each with specific IP rating requirements and restrictions on equipment permitted.',
  'Zone 0 (inside the bath or shower tray) requires IPX7 rated equipment and only SELV at a maximum of 12V AC is permitted. No switches or socket outlets are allowed.',
  'Zone 1 (above the bath or shower tray up to 2.25m) requires IPX4 minimum. No switches are permitted; SELV equipment rated IPX4 is acceptable.',
  'Zone 2 (extending 0.6m beyond Zone 1 boundary) requires IPX4 minimum. Shaver sockets to BS EN 61558-2-5 are permitted.',
  'RCD protection (30mA) is mandatory for all circuits in bathroom zones under Regulation 701.411.3.3 of BS 7671.',
];

const faqs = [
  {
    question: 'What is the zone classification in a bathroom under BS 7671?',
    answer:
      'BS 7671 Section 701 defines three zones. Zone 0 is the interior of the bath or shower tray — the space occupied by the water. Zone 1 extends above the bath or shower tray up to a height of 2.25m from the finished floor level. If the shower has a fixed head, Zone 1 extends 1.2m horizontally from the shower head. Zone 2 extends a further 0.6m horizontally from the boundary of Zone 1 and from the floor to 2.25m. These zones exist to limit the risk of electric shock in areas where water is present, which significantly increases the risk of a fatal shock from even a low-voltage fault.',
  },
  {
    question: 'What IP rating is required in each bathroom zone?',
    answer:
      'Zone 0 requires IPX7 (protection against immersion in water). Zone 1 requires IPX4 (protection against water splashing from any direction). Zone 2 also requires IPX4. Outside the zones, no specific IP rating is mandated by BS 7671, but manufacturers typically recommend IPX4 or IPX4 rated fittings in bathrooms generally for good practice. IP ratings are defined in BS EN 60529. The first digit of the IP code indicates protection against solid particles; the second digit indicates protection against water.',
  },
  {
    question: 'Can a light switch be installed in a bathroom?',
    answer:
      'Standard mains-voltage switches must not be installed in Zone 0, Zone 1, or Zone 2. Outside the zones (typically beyond the 0.6m boundary from Zone 1), a standard switch can be installed if there is no risk of water ingress from splashing. In practice, most bathrooms are small enough that the entire room falls within Zone 2, which means standard switches are not permitted inside the room. The preferred solution is a pull-cord switch mounted above Zone 1 (above 2.25m from the floor), or a switch mounted outside the bathroom on the wall adjacent to the door. Alternatively, remote-control or sensor-activated lighting can be used without any switch in the bathroom itself.',
  },
  {
    question: 'Where can a shaver socket be installed in a bathroom?',
    answer:
      'Shaver sockets conforming to BS EN 61558-2-5 (which include an isolating transformer) are permitted in Zone 2 and outside the zones. They must not be installed in Zone 0 or Zone 1. In practice, the shaver socket is typically mounted on the bathroom wall at mirror height, which is usually within Zone 2 (within 0.6m of the bath or shower) or outside the zones (more than 0.6m from the bath). The shaver socket must be IP44 rated if it is within Zone 2. Standard 13A socket outlets are not permitted in bathrooms under any circumstances (except in rooms containing only a toilet and basin with no bath or shower, where a socket can be installed outside the zones).',
  },
  {
    question: 'What electrical equipment is allowed in Zone 0?',
    answer:
      'Zone 0 is the most restrictive zone. Only equipment specifically designed for use in Zone 0 and rated IPX7 or better is permitted. The equipment must be SELV (Safety Extra-Low Voltage) at a maximum of 12V AC or 30V DC. In practice, this limits Zone 0 to purpose-made bath lighting fixtures (usually LED strips designed for in-bath use) and similar specialist products. The SELV supply must be provided by a safety isolating transformer sited outside the zones. No switches, socket outlets, or standard lighting fittings are permitted in Zone 0.',
  },
  {
    question: 'Is RCD protection required for all bathroom circuits?',
    answer:
      'Yes. Regulation 701.411.3.3 of BS 7671 requires that all circuits supplying equipment in the bathroom zones must be protected by a residual current device (RCD) with a rated residual operating current not exceeding 30mA. This applies to lighting circuits, shower circuits, towel rail circuits, extractor fan circuits, and any other circuit that supplies equipment in Zone 0, Zone 1, or Zone 2. In practice, RCD protection of 30mA for all bathroom circuits is achieved by connecting them to an RCD-protected way in the consumer unit (or a dual RCD consumer unit), or by using RCBOs for each circuit.',
  },
  {
    question: 'What are the rules for underfloor heating in a bathroom?',
    answer:
      'Electric underfloor heating in a bathroom is permitted, subject to the zone requirements and RCD protection. The heating mat or cable must be installed under the floor covering; it is therefore not exposed to water directly. If the underfloor heating is within Zone 0 (under the bath — unusual in UK practice), it would need to comply with Zone 0 restrictions. Underfloor heating under the bathroom floor area outside Zone 0 is treated as Zone 1 or Zone 2 depending on its position. The thermostat and any switches must comply with the zone restrictions for the location where they are installed. The circuit must be RCD protected at 30mA. An earth mat (metallic screening) under the heating element is recommended to provide additional protection.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/bathroom-electrical-regulations',
    title: 'Bathroom Electrical Regulations',
    description: 'Full BS 7671 Section 701 guide including supplementary bonding and RCD requirements.',
    icon: Droplets,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Issue Electrical Installation Certificates for bathroom work on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/minor-works-certificate',
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
    id: 'overview',
    heading: 'BS 7671 Section 701: Locations Containing a Bath or Shower',
    content: (
      <>
        <p>
          BS 7671 Section 701 is the specific part of the IET Wiring Regulations that covers
          electrical installations in rooms containing a bath or shower. It is one of the most
          commonly encountered Special Location requirements for domestic electricians, since
          bathrooms and shower rooms are present in virtually every dwelling.
        </p>
        <p>
          Section 701 is more restrictive than the general installation requirements because water
          and electricity are a dangerous combination. The presence of water dramatically reduces
          the body's resistance to electric shock, meaning that voltages and fault currents that
          would not be lethal in a dry environment can cause a fatal shock in a bathroom. The
          zone system provides a structured, risk-based approach to managing this danger.
        </p>
        <p>
          All electrical work in bathrooms and shower rooms in dwellings is notifiable under Part P
          of the Building Regulations (except like-for-like replacement of accessories on existing
          circuits). Electricians carrying out bathroom electrical work must be registered with an
          approved competent person scheme to self-certify, or building control must be notified.
        </p>
        <p>
          Section 701 also has specific requirements for supplementary protective equipotential
          bonding, RCD protection, and the prohibited types of equipment — all of which are covered
          in this guide.
        </p>
      </>
    ),
  },
  {
    id: 'zones',
    heading: 'The Bathroom Zone System',
    content: (
      <>
        <p>
          Section 701 of BS 7671 defines zones based on the physical proximity to the bath or
          shower. The zone dimensions are measured from the interior of the bath or shower tray
          outwards, and from the finished floor level upwards. The zones determine what equipment
          is permitted and what IP rating is required.
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-xl mb-2 flex items-center gap-2">
              <span className="bg-red-500 text-white text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center shrink-0">0</span>
              Zone 0
            </h3>
            <p className="text-white text-sm leading-relaxed">
              The interior of the bath or shower tray. The space occupied by the water. Extends
              from the bottom of the bath to the overflow or top of the tray.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-xl mb-2 flex items-center gap-2">
              <span className="bg-orange-500 text-white text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center shrink-0">1</span>
              Zone 1
            </h3>
            <p className="text-white text-sm leading-relaxed">
              The area directly above the bath or shower tray, up to 2.25m from the finished floor
              level. For fixed shower heads, extends 1.2m horizontally from the head.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-xl mb-2 flex items-center gap-2">
              <span className="bg-yellow-500 text-black text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center shrink-0">2</span>
              Zone 2
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Extends a further 0.6m horizontally from the boundary of Zone 1, from the floor
              up to 2.25m. The area typically containing the washbasin and towel rail.
            </p>
          </div>
        </div>
        <p>
          Outside the zones, normal electrical installation rules apply, subject to the RCD
          protection requirement for circuits that supply equipment within the zones. In very small
          bathrooms, the entire floor area may fall within Zone 2, leaving no space that is outside
          the zones entirely.
        </p>
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Ratings Required Per Zone',
    content: (
      <>
        <p>
          The IP (Ingress Protection) rating system, defined in BS EN 60529, uses two digits to
          indicate the level of protection against solid particles (first digit) and against water
          (second digit). In bathrooms, the water ingress protection (second digit) is the critical
          value.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 overflow-x-auto">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 pr-4 font-semibold">Zone</th>
                <th className="text-left py-3 pr-4 font-semibold">Minimum IP Rating</th>
                <th className="text-left py-3 font-semibold">What This Means</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="py-3 pr-4 font-semibold text-red-400">Zone 0</td>
                <td className="py-3 pr-4">IPX7</td>
                <td className="py-3">Protected against immersion in water up to 1 metre depth for 30 minutes</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold text-orange-400">Zone 1</td>
                <td className="py-3 pr-4">IPX4</td>
                <td className="py-3">Protected against water splashing from any direction</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold text-yellow-400">Zone 2</td>
                <td className="py-3 pr-4">IPX4</td>
                <td className="py-3">Protected against water splashing from any direction</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold text-green-400">Outside Zones</td>
                <td className="py-3 pr-4">No minimum</td>
                <td className="py-3">Standard equipment permitted; IPX4 recommended in practice</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The IP rating must be marked on the luminaire or equipment. If a light fitting does not
          display an IP rating, it is not suitable for use within the zones. Common IP-rated
          bathroom luminaires display IP44 or IP65 ratings — both of which meet the Zone 1 and
          Zone 2 requirement of IPX4.
        </p>
      </>
    ),
  },
  {
    id: 'zone-0',
    heading: 'Zone 0: Inside the Bath or Shower Tray',
    content: (
      <>
        <p>
          Zone 0 is the most restrictive zone. It encompasses the interior of the bath or shower
          tray — the space where the bather or person showering is in direct contact with water.
          The electrical risk here is the highest.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <h3 className="font-semibold text-white text-base mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-red-400" />
            Zone 0 Requirements
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>Equipment must be rated <strong>IPX7 minimum</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>Only <strong>SELV (Safety Extra-Low Voltage)</strong> equipment permitted — maximum 12V AC or 30V DC</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>SELV transformer must be located outside the zones</span>
            </li>
          </ul>
          <h3 className="font-semibold text-white text-base mt-6 mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-400" />
            Not Permitted in Zone 0
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Socket outlets of any type</span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Switches or other switching devices</span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Mains voltage equipment</span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Equipment not rated for Zone 0 use (even if IP-rated)</span>
            </li>
          </ul>
        </div>
        <p>
          In domestic practice, Zone 0 is rarely encountered as a design challenge because very
          few products are installed inside the bath or shower tray. The main Zone 0 product is
          specialist in-bath LED lighting, which is purpose-designed for this application. If a
          homeowner requests lighting inside a shower enclosure, the fitting must be rated for
          Zone 0 if it is positioned inside the shower tray, or Zone 1 if it is above the tray
          but within the shower enclosure.
        </p>
      </>
    ),
  },
  {
    id: 'zone-1',
    heading: 'Zone 1: Above the Bath or Shower Tray',
    content: (
      <>
        <p>
          Zone 1 extends upward from the bath or shower tray to a height of 2.25m above the
          finished floor level. For showers with a fixed shower head, Zone 1 extends 1.2m
          horizontally from the shower head position in all directions (or to the wall of the
          shower enclosure if smaller). Zone 1 represents the area where water spray from the
          shower or splashing from the bath is likely.
        </p>
        <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-6 my-4">
          <h3 className="font-semibold text-white text-base mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-orange-400" />
            Zone 1 Requirements
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>Equipment must be rated <strong>IPX4 minimum</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>SELV equipment rated IPX4 is permitted</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Electric shower units are permitted in Zone 1 — they are specifically designed for
                this location and must be IPX4 rated
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>IPX4 rated luminaires are permitted</span>
            </li>
          </ul>
          <h3 className="font-semibold text-white text-base mt-6 mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-400" />
            Not Permitted in Zone 1
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Socket outlets (any type)</span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Switches (including pull-cords at or below 2.25m)</span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Consumer units or distribution boards</span>
            </li>
          </ul>
        </div>
        <p>
          The ceiling of a bathroom is usually above 2.25m, which means that recessed ceiling
          luminaires directly above the bath or shower are technically in Zone 1 (assuming the
          ceiling is at 2.25m or below). These must be IPX4 rated minimum. Many bathroom recessed
          LED downlighters are rated IP65, which exceeds the Zone 1 requirement.
        </p>
      </>
    ),
  },
  {
    id: 'zone-2',
    heading: 'Zone 2: The Wider Bathroom Area',
    content: (
      <>
        <p>
          Zone 2 extends 0.6m horizontally beyond the boundary of Zone 1 and from the floor up
          to 2.25m. In a typical bathroom, Zone 2 covers the area immediately adjacent to the
          bath or shower — where the washbasin, towel rail, and mirror are typically located.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h3 className="font-semibold text-white text-base mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-yellow-400" />
            Zone 2 Requirements and Permissions
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>Equipment must be rated <strong>IPX4 minimum</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shaver socket outlets</strong> to BS EN 61558-2-5 are permitted in Zone 2.
                These incorporate an isolating transformer and are specifically designed for
                bathroom use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>IPX4 rated luminaires, towel rails, and fan units are permitted</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                Mains voltage equipment (such as electric towel rails and heated mirror demister
                pads) is permitted, provided it is suitable for bathroom use and IPX4 rated
              </span>
            </li>
          </ul>
          <h3 className="font-semibold text-white text-base mt-6 mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-400" />
            Not Permitted in Zone 2
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Standard 13A socket outlets</span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Standard light switches</span>
            </li>
            <li className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Equipment not rated for use in wet or damp locations</span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'outside-zones',
    heading: 'Outside the Zones',
    content: (
      <>
        <p>
          The area outside Zone 2 is beyond 0.6m horizontally from the Zone 1 boundary and above
          2.25m from the floor. In this area, standard electrical installation rules apply.
          However, there are important caveats:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection still required</strong> — Regulation 701.411.3.3 requires
                that all circuits supplying equipment in Zone 0, 1, or 2 are RCD protected at
                30mA, regardless of where the supply cable runs. A lighting circuit that also
                supplies a bathroom luminaire must be RCD protected even if the consumer unit is
                remote from the bathroom.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switches and sockets permitted outside zones</strong> — a standard mains
                switch can be installed outside the zones in a bathroom (where space permits). In
                small bathrooms, the entire floor area is within Zone 2, so a mains switch can
                only be placed at the door on the outside of the room, or as a pull-cord above
                2.25m.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supplementary bonding</strong> — BS 7671 Regulation 701.415.2 states that
                supplementary protective equipotential bonding is not required where all circuits
                are RCD protected at 30mA and the installation is in accordance with BS 7671.
                In most modern bathrooms, supplementary bonding is therefore not required if the
                circuits are correctly RCD protected.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Mistakes in Bathroom Electrical Installations',
    content: (
      <>
        <p>
          Bathroom electrical work is one of the most commonly failed areas on EICRs. These are the
          most frequent mistakes encountered:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Towel rail positioned in wrong zone</strong> — an electric towel rail
                installed within Zone 1 (within the horizontal footprint of the bath or shower,
                above the tray) is a common error. Towel rails should be in Zone 2 or outside the
                zones.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Light fittings without IP rating in Zone 1 or 2</strong> — recessed
                downlighters that are not IP rated installed directly above a bath. Without an
                IP rating the fitting is not suitable for Zone 1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shaver socket in Zone 1</strong> — shaver sockets are only permitted in
                Zone 2 or outside the zones. Installing one within Zone 1 (within the footprint
                of the bath) is non-compliant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No RCD protection on lighting circuit</strong> — bathroom lighting
                circuits without RCD protection. This is a very common C2 or C1 deficiency on
                older installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard socket outlets in bathrooms</strong> — fitting a 13A socket
                outlet inside a bathroom is not permitted. Only shaver sockets to BS EN 61558-2-5
                are allowed, and only in Zone 2 or outside the zones.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Complete bathroom EICs with zone compliance built in"
          description="Elec-Mate's EIC Certificate app includes Section 701 zone guidance. AI board scanning, voice test entry, and instant PDF — issue the bathroom electrical certificate on site before you leave."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Bathroom Electrical Work in Practice',
    content: (
      <>
        <p>
          Bathroom electrical work requires careful zone assessment before any work is planned or
          quoted. The first step on any bathroom job is to establish the zone boundaries for the
          specific room layout. Small bathrooms are often entirely within Zone 2; larger bathrooms
          may have significant areas outside the zones.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC Certificate App</h4>
                <p className="text-white text-sm leading-relaxed">
                  Issue your{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificate
                  </SEOInternalLink>{' '}
                  on site after every bathroom installation. All bathroom work (except like-for-like)
                  is Part P notifiable and requires an EIC or MEIWC.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing for Bathroom Circuits</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/cable-sizing-calculator">
                    cable sizing calculator
                  </SEOInternalLink>{' '}
                  to correctly size shower circuits (typically 6mm to 10mm depending on the
                  shower rating) and towel rail circuits.
                </p>
              </div>
            </div>
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
      title="Bathroom Electrical Zones BS 7671 | Zone 0, 1, 2 IP Ratings Guide"
      description="Complete guide to bathroom electrical zones under BS 7671 Section 701. Zone 0, 1, and 2 boundaries, IP ratings required (IPX7, IPX4, IPX4), what is permitted in each zone, shaver socket placement, switch positions, and common installation mistakes."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="BS 7671 Guide"
      badgeIcon={Droplets}
      heroTitle={
        <>
          Bathroom Electrical Zones:{' '}
          <span className="text-yellow-400">BS 7671 Section 701 Zone Guide</span>
        </>
      }
      heroSubtitle="BS 7671 Section 701 defines three zones in bathrooms based on proximity to water. Each zone has specific IP rating requirements and restrictions on the equipment permitted. This guide covers Zone 0, 1, and 2 in detail — boundaries, IP ratings, permitted equipment, and common mistakes."
      readingTime={12}
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
