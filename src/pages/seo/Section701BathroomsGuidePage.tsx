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
  'Section 701 of BS 7671:2018+A4:2026 defines four zones in bathrooms (Zone 0, Zone 1, Zone 2, and outside zones) with specific equipment and IP rating requirements for each.',
  'Supplementary bonding may be omitted under Regulation 701.415.2 only where all final circuits comply with automatic disconnection (411.3.2), all have 30mA RCD additional protection (415.1.1), and all extraneous-conductive-parts are connected to the protective equipotential bonding (411.3.1.2).',
  'All low voltage circuits serving the location — and any passing through Zones 1 or 2 — must have 30mA RCD additional protection per Regulation 701.411.3.3, regardless of earthing system.',
  'Only SELV at a nominal voltage not exceeding 12V AC rms or 30V ripple-free DC is permitted in Zone 0, with the safety source installed outside Zones 0, 1, and 2.',
  'Equipment in Zone 1 must have a minimum rating of IPX4; equipment in Zone 0 must be rated at least IPX7.',
];

const faqs = [
  {
    question: 'Do I still need supplementary bonding in a bathroom?',
    answer:
      'Under Regulation 701.415.2, supplementary protective equipotential bonding can be omitted only where the location is in a building with a protective equipotential bonding system to Regulation 411.3.1.2 AND all of the following are met: (1) all final circuits of the location comply with automatic disconnection per Regulation 411.3.2; (2) all final circuits have additional protection by a 30mA RCD per Regulation 415.1.1; and (3) all extraneous-conductive-parts of the location are effectively connected to the protective equipotential bonding per Regulation 411.3.1.2. If any condition is not satisfied, supplementary bonding must connect together the protective conductor terminals of each circuit and the accessible extraneous-conductive-parts (water and gas pipes, central heating pipes, accessible metallic structural parts) within the room. In practice most modern installations meet the exemption criteria, but you must verify before omitting the bonds.',
  },
  {
    question: 'What IP rating is required for a light fitting in Zone 1?',
    answer:
      'Equipment installed in Zone 1 must have a minimum IP rating of IPX4 (protection against splashing water from any direction). Where water jets are used for cleaning (such as in commercial or public bathrooms), the minimum rating increases to IPX5. In Zone 0, the minimum is IPX7 (protection against temporary immersion). In Zone 2, the minimum is IPX4. Outside the zones, normal IP ratings apply — though IPX1 (protection against vertically falling drops) is sensible in any bathroom environment due to condensation.',
  },
  {
    question: 'Can I install a socket outlet in a bathroom?',
    answer:
      'Regulation 701.512.3 prohibits socket-outlets within a distance of 2.5m measured horizontally from the boundary of Zone 1 (and they are not permitted in Zones 0, 1 or 2). Beyond that 2.5m line, a socket-outlet may be installed provided it has 30mA RCD additional protection. Two exceptions apply within Zone 2 or outside the zones: shaver supply units conforming to BS EN 61558-2-5 (which incorporate an isolating transformer) and SELV socket-outlets complying with Section 414. In practice, most domestic bathrooms are too small to achieve the 2.5m clearance, which is why shaver sockets are the standard approach.',
  },
  {
    question: 'What are the zone dimensions in a bathroom with a shower but no bath?',
    answer:
      'For a shower without a basin (a wet room or walk-in shower), BS 7671 Regulation 701.32.4 states there is no Zone 2 — instead an increased Zone 1 is provided. Zone 1 extends 1.2m horizontally from the centre point of the fixed water outlet on the wall or ceiling, from the finished floor up to the higher of 2.25m or the highest fixed shower head. Zone 0 is the floor area up to 0.1m above the floor, with the same horizontal extent as Zone 1. Above the Zone 1 height is outside the zones. (This contrasts with a bath or shower-basin layout, where Zone 1 is bounded by the basin and a separate Zone 2 extends 0.6m beyond it.) These dimensions are illustrated in BS 7671 Figure 701.1.',
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
            BS 7671:2018+A4:2026
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
          Section 701 applies to the electrical installation in locations containing a fixed bath or
          shower and to the surrounding zones. Per Regulation 701.1, it does not apply to emergency
          facilities such as emergency showers used in industrial areas or laboratories.
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
          BS 7671 defines the zones in a bathroom or shower room. The zones are measured from the
          bath, shower basin, or (for showers without a basin) the fixed water outlet. Zone
          dimensions are illustrated in Figures 701.1 (plan) and 701.2 (elevation) of BS 7671.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 sm:p-6 my-6">
          <h3 className="font-bold text-white text-base mb-4">
            Zone Requirements at a Glance (Section 701)
          </h3>
          <div className="space-y-2.5">
            <div className="grid grid-cols-3 gap-2 px-1 text-[11px] uppercase tracking-wide text-white/50 font-semibold">
              <span>Zone</span>
              <span>Min. IP rating</span>
              <span>Permitted supply</span>
            </div>
            <div className="grid grid-cols-3 gap-2 items-center p-3 rounded-xl bg-red-900/30 border border-red-700/40 text-white text-sm">
              <span className="font-semibold">Zone 0</span>
              <span>IPX7</span>
              <span>SELV ≤ 12V AC / 30V DC</span>
            </div>
            <div className="grid grid-cols-3 gap-2 items-center p-3 rounded-xl bg-orange-900/30 border border-orange-700/40 text-white text-sm">
              <span className="font-semibold">Zone 1</span>
              <span>IPX4 (IPX5 water jets)</span>
              <span>LV with 30mA RCD; SELV ≤ 25V AC / 60V DC</span>
            </div>
            <div className="grid grid-cols-3 gap-2 items-center p-3 rounded-xl bg-yellow-900/30 border border-yellow-700/40 text-white text-sm">
              <span className="font-semibold">Zone 2</span>
              <span>IPX4 (IPX5 water jets)</span>
              <span>LV with 30mA RCD; shaver / SELV sockets</span>
            </div>
            <div className="grid grid-cols-3 gap-2 items-center p-3 rounded-xl bg-green-900/30 border border-green-700/40 text-white text-sm">
              <span className="font-semibold">Outside zones</span>
              <span>None from S.701</span>
              <span>LV with 30mA RCD; sockets &gt; 2.5m from Zone 1</span>
            </div>
          </div>
          <p className="text-white/50 text-xs mt-4">
            IP minimums per Reg 701.512.2; 30mA RCD additional protection per Reg 701.411.3.3;
            Zone 0/switch SELV limits per Reg 701.512.3; Zone 1 SELV/PELV equipment limit per Reg
            701.55.
          </p>
        </div>
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
              Above the bath or shower basin, bounded by the finished floor and the higher of 2.25m
              or the highest fixed shower head. Horizontally it extends to the plane circumscribing
              the basin, or 1.2m from the centre of the fixed water outlet for showers without a
              basin (in which case there is no Zone 2). Equipment must be at least IPX4 and only
              fixed, permanently connected current-using equipment suitable for the zone is
              permitted. SELV up to 25V AC rms or 60V ripple-free DC is allowed with the source
              outside Zones 0, 1, and 2.
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
              Beyond the zones and above the Zone 1/2 height. Normal installation rules apply,
              subject to the requirement that all circuits serving the location have 30mA RCD
              additional protection. Socket outlets may be installed here provided they are more
              than 2.5m horizontally from the boundary of Zone 1. Switchgear, accessories, and
              general equipment are permitted.
            </p>
          </div>
        </div>
        <p>
          The ceiling above a bath is classified as outside the zones provided it is above the Zone
          1 height (the higher of 2.25m or the highest fixed shower head). A luminaire on a ceiling
          higher than that boundary is outside the zones — but the same fitting falls within Zone 1
          or 2 if the ceiling is lower, and must then meet the IPX4 minimum. See our{' '}
          <SEOInternalLink href="/tools/ip-rating-guide">IP rating guide</SEOInternalLink> for
          decoding the IP code when selecting bathroom fittings.
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
          The second digit of an IP code describes protection against water. The relevant codes for
          bathroom work decode as follows:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 sm:p-6 my-4">
          <div className="space-y-2.5">
            <div className="grid grid-cols-[auto_1fr] gap-3 px-1 text-[11px] uppercase tracking-wide text-white/50 font-semibold">
              <span>Code</span>
              <span>Water protection (second digit)</span>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-3 items-center p-3 rounded-xl bg-blue-900/30 border border-blue-700/40 text-white text-sm">
              <span className="font-semibold w-14">IPX4</span>
              <span>Splashing water from any direction (Zones 1 and 2 minimum)</span>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-3 items-center p-3 rounded-xl bg-blue-900/30 border border-blue-700/40 text-white text-sm">
              <span className="font-semibold w-14">IPX5</span>
              <span>Low-pressure water jets from any direction (where jets used for cleaning)</span>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-3 items-center p-3 rounded-xl bg-blue-900/30 border border-blue-700/40 text-white text-sm">
              <span className="font-semibold w-14">IPX7</span>
              <span>Temporary immersion (Zone 0 minimum)</span>
            </div>
          </div>
          <p className="text-white/50 text-xs mt-4">
            IP codes are defined in BS EN 60529; an &ldquo;X&rdquo; means the solid-object digit is
            not specified.
          </p>
        </div>
        <p>
          The IP rating must be maintained after installation — this means cable entries, mounting
          screws, and enclosure seals must all be intact. A luminaire rated IPX4 at the factory
          loses its rating if the installer drills an unsealed cable entry. The suitability of
          equipment for its location in terms of IP rating is itself an item inspectors verify under
          Regulation 701.512.2.
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
                All final circuits of the location comply with the requirements for automatic
                disconnection of supply according to Regulation 411.3.2 (fault protection).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                All final circuits of the location have additional protection by an RCD in
                accordance with Regulation 415.1.1 (rated residual operating current not exceeding
                30mA).
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
          The minimum cross-sectional area depends on what the conductor connects (Section 544). A
          supplementary bonding conductor between two extraneous-conductive-parts must be at least
          2.5mm² where sheathed or mechanically protected, or 4mm² where not (Regulation 544.2.3). A
          conductor connecting an exposed-conductive-part to an extraneous-conductive-part must be
          at least half the cross-sectional area of the relevant circuit protective conductor, again
          subject to a 4mm² minimum where mechanical protection is absent (Regulation 544.2.2).
          Always verify the main bonding and earth fault loop impedance before deciding to omit
          supplementary bonding.
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
                <strong>Zone 0</strong>: no switchgear or accessories may be installed. The only
                exceptions throughout Section 701 are switches and controls incorporated in fixed
                current-using equipment suitable for that zone, and insulating pull cords of
                cord-operated switches.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 1</strong>: only switches of SELV circuits supplied at a nominal voltage
                not exceeding 12V AC rms or 30V ripple-free DC may be installed, with the safety
                source located outside Zones 0, 1 and 2 (Regulation 701.512.3). Switches that are an
                integral part of fixed equipment suitable for the zone remain permitted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 2</strong>: switchgear, accessories incorporating switches and
                socket-outlets must not be installed, with two exceptions in Regulation 701.512.3 —
                switches and socket-outlets of SELV circuits (safety source outside Zones 0, 1 and
                2), and shaver supply units complying with BS EN 61558-2-5. Switches that are an
                integral part of fixed equipment suitable for the zone remain permitted.
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
          Socket outlets are not permitted in Zones 0, 1, or 2. Regulation 701.512.3 further
          prohibits socket-outlets within a distance of 2.5m measured horizontally from the boundary
          of Zone 1. A socket-outlet may therefore only be installed beyond that 2.5m line, and must
          have 30mA RCD additional protection.
        </p>
        <p>
          In most domestic bathrooms, this 2.5m clearance cannot be achieved, so socket outlets are
          not installed. The exceptions permitted in Zone 2 or outside the zones are:
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
          installation. At 230V, the design current is simply the rated power divided by the
          voltage, so a typical 8.5–11kW shower draws roughly 37–48A. The circuit must comply with
          both the general requirements of BS 7671 and the specific requirements of Section 701.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 sm:p-6 my-4">
          <h3 className="font-bold text-white text-base mb-4">
            Indicative Shower Loads at 230V
          </h3>
          <div className="space-y-2.5">
            <div className="grid grid-cols-3 gap-2 px-1 text-[11px] uppercase tracking-wide text-white/50 font-semibold">
              <span>Rating</span>
              <span>Approx. current</span>
              <span>Typical device</span>
            </div>
            <div className="grid grid-cols-3 gap-2 items-center p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm">
              <span className="font-semibold">8.5 kW</span>
              <span>~37 A</span>
              <span>40 A</span>
            </div>
            <div className="grid grid-cols-3 gap-2 items-center p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm">
              <span className="font-semibold">9.5 kW</span>
              <span>~41 A</span>
              <span>45 A</span>
            </div>
            <div className="grid grid-cols-3 gap-2 items-center p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm">
              <span className="font-semibold">10.5 kW</span>
              <span>~46 A</span>
              <span>50 A</span>
            </div>
            <div className="grid grid-cols-3 gap-2 items-center p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm">
              <span className="font-semibold">11.0 kW</span>
              <span>~48 A</span>
              <span>50 A</span>
            </div>
          </div>
          <p className="text-white/50 text-xs mt-4">
            Indicative only. The protective device and cable size must be calculated for the actual
            installation method, length and grouping, and verified against the manufacturer&rsquo;s
            instructions and BS 7671 Appendix 4 current-carrying capacities.
          </p>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuit</strong>: an electric shower must be on its own dedicated
                circuit from the consumer unit. Cable is commonly 10mm² for shorter runs and 16mm²
                where length, grouping or thermal insulation reduce the effective current-carrying
                capacity — always size it from the calculation rather than a rule of thumb. See our{' '}
                <SEOInternalLink href="/guides/electric-shower-installation">
                  electric shower installation guide
                </SEOInternalLink>{' '}
                for worked sizing.
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
          description="Use Elec-Mate's cable sizing calculator to determine the correct cable size for electric shower circuits, accounting for installation method, grouping…"
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
                <strong>Continuity</strong> (Regulation 643.2) — confirm the continuity of any
                supplementary bonding conductors and protective conductors. Where supplementary
                bonding is relied upon, the resistance between simultaneously accessible
                exposed- and extraneous-conductive-parts must be low enough that the touch voltage
                stays within safe limits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD operation</strong> (Regulation 643.8) — the 30mA RCDs providing
                additional protection on bathroom circuits must operate within the required times.
                Verification is by visual inspection and testing of effective automatic
                disconnection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance</strong> (Regulation 643.3.2, Table 64) — a 500V DC
                test, minimum 1.0 MΩ for circuits up to 500V. Pay attention to moisture in bathroom
                environments; test when the room is dry.
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
          description="Elec-Mate's digital certificates include bathroom-specific fields and zone diagrams. Complete your EIC or Minor Works on your phone immediately after…"
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
      description="Complete guide to Section 701 of BS 7671 — bathroom zones 0, 1, 2, IP ratings, supplementary bonding (701.415.2), RCD protection, SELV…"
      datePublished="2026-03-27"
      dateModified="2026-06-10"
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
      answerBox={{
        question: 'What are the electrical zones in a bathroom (BS 7671 Section 701)?',
        answer:
          'BS 7671 Section 701 divides a room with a bath or shower into Zone 0 (inside the bath/basin), Zone 1 (above it to 2.25 m) and Zone 2 (0.6 m beyond Zone 1). Equipment must meet a minimum IP rating for its zone — IPX7 in Zone 0, IPX4 in Zones 1 and 2 (IPX5 where water jets are used) per Reg 701.512.2. All circuits serving the location need 30 mA RCD additional protection (Reg 701.411.3.3), and supplementary equipotential bonding (Reg 701.415.2) is required unless the conditions for omitting it are met. Socket-outlets are prohibited within 2.5 m horizontally of the Zone 1 boundary (shaver units to BS EN 61558-2-5 and SELV sockets excepted) per Reg 701.512.3.',
      }}
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
