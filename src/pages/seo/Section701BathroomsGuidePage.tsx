import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShowerHead,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Zap,
  Droplets,
  Cable,
  GraduationCap,
  ClipboardCheck,
  Info,
  Calculator,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'Section 701 Bathrooms', href: '/guides/section-701-bathrooms-complete-guide' },
];

const tocItems = [
  { id: 'overview', label: 'Section 701 Overview' },
  { id: 'zones', label: 'Zone Definitions (0, 1, 2, Outside Zones)' },
  { id: 'ip-ratings', label: 'IP Rating Requirements per Zone' },
  { id: 'bonding', label: 'Supplementary Bonding (701.415.2)' },
  { id: 'rcd-protection', label: 'RCD Protection Requirements' },
  { id: 'selv', label: 'SELV and Reduced Voltage' },
  { id: 'switching', label: 'Switching Devices and Accessories' },
  { id: 'socket-outlets', label: 'Socket Outlets in Bathrooms' },
  { id: 'electric-showers', label: 'Electric Shower Circuits' },
  { id: 'testing', label: 'Testing and Certification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Section 701 of BS 7671:2018+A3:2024 defines four zones in bathrooms (Zone 0, Zone 1, Zone 2, and outside zones) with specific equipment and IP rating requirements for each.',
  'Supplementary bonding may be omitted under Regulation 701.415.2 if all circuits in the bathroom are RCD-protected (not exceeding 30mA) and the main protective bonding complies with Section 411.',
  'All circuits in a bathroom must be protected by a 30mA RCD per Regulation 701.411.3.3, regardless of earthing system.',
  'Only SELV at a nominal voltage not exceeding 12V AC rms or 30V ripple-free DC is permitted in Zone 0, with the safety source installed outside Zones 0, 1, and 2.',
  'Equipment in Zone 1 must have a minimum rating of IPX4; equipment in Zone 0 must be rated at least IPX7.',
];

const faqs = [
  {
    question: 'Do I still need supplementary bonding in a bathroom?',
    answer:
      'Under Regulation 701.415.2, supplementary bonding in the bathroom can be omitted if ALL of the following conditions are met: (1) all final circuits serving the location comply with the requirements for automatic disconnection per Regulation 411.3.3, (2) all final circuits are protected by a 30mA RCD, and (3) the main protective bonding conductors comply with Regulation 544.1.1. If any of these conditions is not satisfied, supplementary bonding must be installed connecting all extraneous-conductive-parts (pipework, towel rails, baths, etc.) and all exposed-conductive-parts within the bathroom. In practice, most modern installations meet the exemption criteria, but you must verify before omitting the bonds.',
  },
  {
    question: 'What IP rating is required for a light fitting in Zone 1?',
    answer:
      'Equipment installed in Zone 1 must have a minimum IP rating of IPX4 (protection against splashing water from any direction). Where water jets are used for cleaning (such as in commercial or public bathrooms), the minimum rating increases to IPX5. In Zone 0, the minimum is IPX7 (protection against temporary immersion). In Zone 2, the minimum is IPX4. Outside the zones, normal IP ratings apply — though IPX1 (protection against vertically falling drops) is sensible in any bathroom environment due to condensation.',
  },
  {
    question: 'Can I install a socket outlet in a bathroom?',
    answer:
      'Socket outlets must not be installed in Zones 0, 1, or 2. Outside the zones (more than 0.6m from the boundary of Zone 2), a socket outlet may be installed provided it is protected by a 30mA RCD and is at least 3m from the boundary of Zone 1 (per Regulation 701.512.3). Shaver supply units conforming to BS EN 61558-2-5 (incorporating an isolating transformer) may be installed in Zone 2 or outside the zones. In practice, most domestic bathrooms are too small to accommodate a socket outlet outside the zones, which is why shaver sockets are the standard approach.',
  },
  {
    question: 'What are the zone dimensions in a bathroom with a shower but no bath?',
    answer:
      'For a shower without a tray (such as a wet room or walk-in shower), Zone 1 is the volume directly above the shower head outlet up to 2.25m from the floor. The horizontal extent of Zone 1 is 1.2m from the fixed water outlet (the shower head bracket or riser rail). Zone 0 is the interior of the shower tray or, where there is no tray, the floor area up to 0.1m above the floor within the 1.2m horizontal extent. Zone 2 extends 0.6m horizontally beyond Zone 1, from floor to 2.25m. Above 2.25m is outside the zones. These dimensions are defined in BS 7671 Figure 701.1.',
  },
  {
    question: 'Is a pull-cord switch required in a bathroom, or can I use a plate switch?',
    answer:
      'Regulation 701.512.3 states that switchgear and accessories must not be installed in Zones 0 or 1 (except for switches forming an integral part of fixed equipment suitable for that zone). In Zone 2, only switches that are part of fixed current-using equipment suitable for use in that zone may be installed. Outside the zones, plate switches and other accessories are permitted. A ceiling-mounted pull-cord switch is acceptable in Zones 1 and 2 because the cord is an insulating medium and the switch mechanism is mounted on the ceiling outside the zones. In practice, most bathroom light switches in domestic properties are either pull-cord types inside the bathroom or plate switches outside the door.',
  },
  {
    question: 'Does the 30mA RCD rule apply to lighting circuits in bathrooms?',
    answer:
      'Yes. Regulation 701.411.3.3 requires that all circuits serving the bathroom location are protected by a 30mA RCD. This includes lighting circuits, shower circuits, heated towel rail circuits, underfloor heating circuits, and any other circuit that serves the bathroom. There are no exemptions based on circuit type. If a lighting circuit serves both a bathroom and other rooms, the entire circuit must be RCD-protected because part of it is within the bathroom location.',
  },
  {
    question: 'Can an electric towel rail be installed in Zone 2?',
    answer:
      'An electric towel rail can be installed in Zone 2 provided it has a minimum IP rating of IPX4, is of Class I construction (earthed) or Class II (double-insulated), is permanently connected (not via a plug and socket), and the circuit is protected by a 30mA RCD. The towel rail must be fixed — a freestanding portable heater must not be used in Zones 0, 1, or 2. The connection should be made via a fused connection unit (typically 3A fuse) installed outside the zones or in Zone 2 if the FCU is suitable for that zone.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/bonding-in-bathrooms',
    title: 'Bonding in Bathrooms',
    description: 'Detailed guide to supplementary bonding in bathrooms and when it can be omitted.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete Electrical Installation Condition Reports with bathroom-specific observations.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/ip-rating-guide',
    title: 'IP Rating Guide',
    description: 'Understand IP codes for selecting equipment in wet locations.',
    icon: Droplets,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-types-explained',
    title: 'RCD Types Explained',
    description: 'Type AC, A, B, and F RCDs — which to use and why.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/electric-shower-installation',
    title: 'Electric Shower Installation',
    description: 'Cable sizing, MCB selection, and bonding for electric shower circuits.',
    icon: ShowerHead,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 with structured modules covering special locations.',
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
    heading: 'Section 701: Bathrooms and Special Locations',
    content: (
      <>
        <p>
          Section 701 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          covers the particular requirements for locations containing a bath or shower. It is one of
          the most frequently examined and most commonly encountered special locations in domestic
          electrical work.
        </p>
        <p>
          The underlying principle is straightforward: a person in contact with water has
          significantly reduced body resistance, making them more vulnerable to electric shock. BS
          7671 addresses this by defining zones of increasing risk around baths and showers, then
          restricting what equipment and wiring may be installed in each zone.
        </p>
        <p>
          Section 701 applies to bathrooms, shower rooms, and any other room or area containing a
          fixed bath, shower, or shower basin. It does not apply to emergency equipment (such as
          emergency lighting) where the risk of electric shock is outweighed by the need for safety
          provisions, provided such equipment is suitable for the conditions.
        </p>
        <p>
          This guide covers zone definitions, IP rating requirements, supplementary bonding under
          Regulation 701.415.2, RCD protection, SELV, switching devices, socket outlets, and
          electric shower circuits.
        </p>
      </>
    ),
  },
  {
    id: 'zones',
    heading: 'Zone Definitions: Zone 0, Zone 1, Zone 2, and Outside Zones',
    content: (
      <>
        <p>
          BS 7671 defines four zones in a bathroom or shower room. The zones are measured from the
          bath, shower tray, or (for showers without a tray) the fixed water outlet. Zone dimensions
          are specified in Figures 701.1 to 701.3 of BS 7671.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Zone 0</h3>
            <p className="text-white text-sm leading-relaxed">
              The interior of the bath or shower tray. For showers without a tray, Zone 0 is the
              area of the floor up to 0.1m above the floor level, within the horizontal extent of
              Zone 1. Only SELV at a maximum of 12V AC rms or 30V ripple-free DC is permitted. The
              safety source must be outside Zones 0, 1, and 2. Equipment must be rated at least
              IPX7.
            </p>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Zone 1</h3>
            <p className="text-white text-sm leading-relaxed">
              Above the bath or shower tray up to 2.25m from the finished floor level. Horizontally,
              it extends to the vertical plane at the outer edge of the bath or shower tray, or 1.2m
              from the fixed water outlet for showers without trays. Equipment must be at least
              IPX4. Only fixed current-using equipment suitable for the zone is permitted. SELV up
              to 25V AC or 60V DC is allowed with the source outside Zones 0, 1, and 2.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Zone 2</h3>
            <p className="text-white text-sm leading-relaxed">
              Extends 0.6m horizontally beyond Zone 1, from the finished floor level up to 2.25m.
              Equipment must be rated at least IPX4. Fixed current-using equipment, luminaires, and
              shaver supply units (BS EN 61558-2-5) are permitted. Switches are only permitted if
              they form part of fixed current-using equipment suitable for the zone.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Outside Zones</h3>
            <p className="text-white text-sm leading-relaxed">
              Beyond Zone 2 and above 2.25m from the finished floor level. Normal installation rules
              apply, subject to the general requirement that all bathroom circuits are 30mA
              RCD-protected. Socket outlets may be installed here if at least 3m from the boundary
              of Zone 1. Switchgear, accessories, and general equipment are permitted.
            </p>
          </div>
        </div>
        <p>
          The ceiling above Zone 1 is classified as outside the zones (provided it is above 2.25m
          from the floor). A luminaire installed on the ceiling directly above a bath is outside the
          zones — but must still be at least IPX4 if it is within Zone 2 of a shower head.
        </p>
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Rating Requirements per Zone',
    content: (
      <>
        <p>
          IP (Ingress Protection) ratings define the degree of protection equipment provides against
          solid objects and water. In bathroom zones, the minimum IP rating requirements are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 0 — IPX7 minimum</strong>: protection against temporary immersion in
                water (up to 1m depth for 30 minutes). Only SELV equipment rated IPX7 or higher may
                be installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 1 — IPX4 minimum</strong>: protection against splashing water from any
                direction. Where water jets are used for cleaning purposes, IPX5 is required
                (protection against low-pressure water jets).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 2 — IPX4 minimum</strong>: same as Zone 1. Again, IPX5 where water jets
                are used for cleaning. In most domestic bathrooms, IPX4 is sufficient.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outside zones</strong>: no specific IP requirement from Section 701, though
                good practice dictates at least IPX1 in any room subject to steam and condensation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The IP rating must be maintained after installation — this means cable entries, mounting
          screws, and enclosure seals must all be intact. A luminaire rated IPX4 at the factory
          loses its rating if the installer drills an unsealed cable entry.
        </p>
      </>
    ),
  },
  {
    id: 'bonding',
    heading: 'Supplementary Bonding: Regulation 701.415.2',
    content: (
      <>
        <p>
          Supplementary equipotential bonding in bathrooms has been one of the most debated topics
          in the 18th Edition. Regulation 701.415.2 allows supplementary bonding to be omitted if
          specific conditions are met.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">
            Conditions for Omitting Supplementary Bonding (701.415.2)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                All final circuits serving the location comply with the requirements for automatic
                disconnection according to Regulation 411.3.3 (fault protection by automatic
                disconnection of supply).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                All final circuits of the location are additionally protected by an RCD with a rated
                residual operating current not exceeding 30mA.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                All extraneous-conductive-parts of the location are effectively connected to the
                protective equipotential bonding according to Regulation 411.3.1.2 — meaning the
                main protective bonding is in place and compliant.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If supplementary bonding is required (because the above conditions are not met), it must
          connect together the terminals of the protective conductors of each circuit supplying the
          location and all extraneous-conductive-parts within the location. This includes metal
          pipework (hot, cold, gas, central heating), metal baths, metal waste pipes, structural
          steelwork, and any other metallic part that could introduce a potential.
        </p>
        <p>
          The minimum cross-sectional area of a supplementary bonding conductor is 4mm² if
          mechanically protected or 2.5mm² if not mechanically protected but connected between two
          extraneous-conductive-parts (Regulation 544.2.1). Always verify the main bonding and earth
          fault loop impedance before deciding to omit supplementary bonding.
        </p>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection Requirements',
    content: (
      <>
        <p>
          Regulation 701.411.3.3 requires that all circuits serving the bathroom location are
          protected by an RCD with a rated residual operating current (I&#916;n) not exceeding 30mA.
          This applies to every circuit type — lighting, power, shower, heated towel rail,
          underfloor heating, extractor fan, and any other circuit serving the bathroom.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type AC, A, or F RCD?</strong> — for most bathroom circuits, a Type AC or
                Type A RCD is suitable. If the circuit supplies equipment with electronic controls
                that may produce DC residual currents (such as some modern shower units with
                electronic switching), a Type A RCD may be required. The general requirement for
                Type A is found in Regulation 531.3.3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shared circuits</strong> — if a lighting circuit serves both a bathroom and
                other rooms, the entire circuit must be 30mA RCD-protected. This is why many modern
                consumer units use RCBOs on bathroom lighting circuits, to avoid nuisance tripping
                affecting other rooms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional protection</strong> — the 30mA RCD provides additional protection
                against direct contact and is not a substitute for basic protection (insulation) or
                fault protection (automatic disconnection within the required time).
              </span>
            </li>
          </ul>
        </div>
        <p>
          In a modern dual-RCD or RCBO consumer unit, most circuits are already 30mA RCD-protected.
          On older installations with a main switch only, upgrading the consumer unit may be the
          most practical way to achieve compliance.
        </p>
      </>
    ),
  },
  {
    id: 'selv',
    heading: 'SELV (Separated Extra-Low Voltage)',
    content: (
      <>
        <p>
          SELV (Separated Extra-Low Voltage) is a protective measure permitted in all bathroom zones
          and is the only electrical supply permitted in Zone 0. The requirements are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 0</strong>: SELV not exceeding 12V AC rms or 30V ripple-free DC. The
                safety source (transformer) must be installed outside Zones 0, 1, and 2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 1</strong>: SELV not exceeding 25V AC rms or 60V ripple-free DC. The
                safety source must be installed outside Zones 0, 1, and 2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zones 2 and outside</strong>: SELV up to 50V AC or 120V DC is permitted as
                per the general SELV requirements of Section 414.
              </span>
            </li>
          </ul>
        </div>
        <p>
          SELV circuits must have protective separation from all other circuits, achieved through a
          safety isolating transformer conforming to BS EN 61558-2-6 or equivalent source of safety
          supply. Live parts of SELV circuits in Zones 0 and 1 must not be accessible — even at
          extra-low voltage.
        </p>
      </>
    ),
  },
  {
    id: 'switching',
    heading: 'Switching Devices and Accessories',
    content: (
      <>
        <p>
          Regulation 701.512.3 restricts the installation of switchgear and accessories in bathroom
          zones:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zones 0 and 1</strong>: no switchgear or accessories, except switches
                forming an integral part of fixed current-using equipment suitable for use in that
                zone, and SELV controls not exceeding 12V AC/30V DC (Zone 0) or 25V AC/60V DC (Zone
                1).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 2</strong>: switches forming part of fixed current-using equipment
                suitable for the zone are permitted. Shaver supply units (BS EN 61558-2-5) are
                permitted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outside zones</strong>: all switchgear and accessories permitted (subject to
                normal rules). Pull-cord switches are commonly used at ceiling level, with the
                switch mechanism outside the zones and the insulating cord hanging into the room.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Ceiling-mounted pull-cord switches are the standard solution for bathroom lighting in
          domestic properties. The switch mechanism is at ceiling level (outside the zones) and the
          cord is an insulating medium.
        </p>
      </>
    ),
  },
  {
    id: 'socket-outlets',
    heading: 'Socket Outlets in Bathrooms',
    content: (
      <>
        <p>
          Socket outlets are not permitted in Zones 0, 1, or 2. Outside the zones, a socket outlet
          may be installed provided it meets the distance requirement of Regulation 701.512.3 — at
          least 3m measured horizontally from the boundary of Zone 1.
        </p>
        <p>
          In most domestic bathrooms, this 3m distance cannot be achieved, so socket outlets are not
          installed. The exceptions are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Shaver supply units</strong>: units conforming to BS EN 61558-2-5
                (incorporating an isolating transformer) may be installed in Zone 2 or outside the
                zones. These are not socket outlets — they provide galvanic isolation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SELV socket outlets</strong>: socket outlets supplied by SELV may be
                installed in Zone 2 or outside the zones, provided the voltage does not exceed the
                limits for that zone.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Large hotel bathrooms and en-suites in large houses may have sufficient distance from Zone
          1 to accommodate a socket outlet. Always measure carefully and document the measurement on
          the certificate.
        </p>
      </>
    ),
  },
  {
    id: 'electric-showers',
    heading: 'Electric Shower Circuits',
    content: (
      <>
        <p>
          Electric showers are one of the highest-demand fixed appliances in a domestic
          installation, typically drawing 40A to 50A at 230V (9.5kW to 11kW). The circuit must
          comply with both the general requirements of BS 7671 and the specific requirements of
          Section 701.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit</strong>: an electric shower must be on its own dedicated
                circuit from the consumer unit. Typical sizes are 40A MCB with 10mm² cable or 45A/
                50A MCB with 10mm² or 16mm² cable, depending on shower rating and cable run length.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong>: mandatory 30mA RCD protection per Regulation
                701.411.3.3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local isolation</strong>: a 45A or 50A double-pole isolator switch should be
                installed outside the zones (or outside the bathroom), accessible to the user.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable routing</strong>: the cable within the bathroom should ideally be
                routed outside the zones or, if crossing zones, should be of sufficient IP rating or
                enclosed in trunking with appropriate IP rating.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Size shower cables accurately"
          description="Use Elec-Mate's cable sizing calculator to determine the correct cable size for electric shower circuits, accounting for installation method, grouping, and voltage drop."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'testing',
    heading: 'Testing and Certification',
    content: (
      <>
        <p>
          Bathroom installations require the same testing as any other circuit, plus particular
          attention to:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Continuity of supplementary bonding conductors (if installed) — R1+R2 between
                bonding connections must be low enough to satisfy the touch voltage requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                RCD testing — 30mA RCDs on all bathroom circuits must trip within the required
                times. Test at x1 and x5 rated residual current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Insulation resistance — 500V DC test, minimum 1 megohm. Pay attention to moisture in
                bathroom environments; test when the room is dry.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Verification of IP ratings — inspect all equipment in zones to confirm the IP rating
                is appropriate and has not been compromised during installation.
              </span>
            </li>
          </ul>
        </div>
        <p>
          An <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink> or{' '}
          <SEOInternalLink href="/tools/minor-works-certificate">
            Minor Works Certificate
          </SEOInternalLink>{' '}
          must be issued. On EICRs, common observations include missing supplementary bonding (where
          required), incorrect IP ratings, socket outlets within zones, and absent or non-functional
          RCD protection.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Bathroom Work Essentials',
    content: (
      <>
        <p>
          Bathroom electrical work is Part P notifiable (unless a like-for-like replacement of
          accessories on the same circuit). Every new circuit, new shower installation, or consumer
          unit change affecting bathroom circuits requires either self-certification through a
          competent person scheme or Building Control notification.
        </p>
        <p>Common pitfalls on bathroom installations include:</p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">IP Rating Compromised During Install</h4>
                <p className="text-white text-sm leading-relaxed">
                  Drilling cable entries into IPX4 fittings without resealing. Using non-rated
                  connectors inside zone-rated enclosures. Always use manufacturer-supplied grommets
                  and seals.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Zone Miscalculation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Measuring zones from the wrong reference point. For a bath, Zone 1 is measured
                  from the outer edge of the bath rim. For a shower without a tray, it is 1.2m from
                  the fixed water outlet.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete bathroom certificates on site"
          description="Elec-Mate's digital certificates include bathroom-specific fields and zone diagrams. Complete your EIC or Minor Works on your phone immediately after testing."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function Section701BathroomsGuidePage() {
  return (
    <GuideTemplate
      title="Section 701 Bathrooms | BS 7671 Bathroom Regulations Guide"
      description="Complete guide to Section 701 of BS 7671 — bathroom zones 0, 1, 2, IP ratings, supplementary bonding (701.415.2), RCD protection, SELV, and electric shower circuits for UK electricians."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulation Guide"
      badgeIcon={ShowerHead}
      heroTitle={
        <>
          Section 701 Bathrooms:{' '}
          <span className="text-yellow-400">Complete BS 7671 Bathroom Zones Guide</span>
        </>
      }
      heroSubtitle="Everything you need to know about bathroom electrical installations under BS 7671. Zone definitions, IP ratings, supplementary bonding under Regulation 701.415.2, RCD protection, SELV, switching, socket outlets, and electric shower circuits."
      readingTime={18}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Section 701 Bathroom Regulations"
      relatedPages={relatedPages}
      ctaHeading="Certify Bathroom Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for digital EIC and Minor Works certificates with bathroom zone diagrams and supplementary bonding records. 7-day free trial."
    />
  );
}
