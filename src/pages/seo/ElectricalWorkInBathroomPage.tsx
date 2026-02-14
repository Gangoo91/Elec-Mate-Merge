import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Droplet,
  ShieldCheck,
  AlertTriangle,
  Home,
  FileCheck2,
  ClipboardCheck,
  Search,
  GraduationCap,
  PoundSterling,
  Scale,
  Send,
  Fan,
  Zap,
  Cable,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/house-rewire-guide' },
  { label: 'Bathroom Electrics', href: '/guides/electrical-work-in-bathroom' },
];

const tocItems = [
  { id: 'bathroom-zones', label: 'Bathroom Zones Explained' },
  { id: 'zone-0', label: 'Zone 0: Inside the Bath or Shower' },
  { id: 'zone-1', label: 'Zone 1: Above the Bath or Shower' },
  { id: 'zone-2', label: 'Zone 2: 0.6m from the Bath or Shower' },
  { id: 'outside-zones', label: 'Outside the Zones' },
  { id: 'ip-ratings', label: 'IP Ratings for Each Zone' },
  { id: 'extract-fans', label: 'Bathroom Extract Fans' },
  { id: 'shower-circuits', label: 'Electric Shower Circuits' },
  { id: 'part-p-bathroom', label: 'Part P and Bathroom Work' },
  { id: 'for-electricians', label: 'For Electricians: Bathroom Installations' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'BS 7671 Section 701 divides bathrooms into Zone 0, Zone 1, Zone 2, and an area outside the zones. Each zone has specific requirements for what equipment can be installed and what IP rating is required.',
  'Zone 0 (inside the bath or shower tray) requires IPX7 minimum and only permits SELV (Separated Extra-Low Voltage) equipment rated at 12V maximum.',
  'Zone 1 (above the bath to 2.25m from the floor) requires IPX4 minimum (IPX5 where water jets are used for cleaning) and permits SELV equipment and water heaters (showers, instantaneous heaters).',
  'All electrical work in a bathroom is notifiable under Part P of the Building Regulations (England and Wales), regardless of whether it involves a new circuit.',
  'Elec-Mate guides electricians through bathroom zone requirements, auto-validates IP ratings, and produces the EIC with all bathroom-specific inspection items completed.',
];

const faqs = [
  {
    question: 'Can I have a socket in a bathroom in the UK?',
    answer:
      'Standard 13A socket outlets are not permitted in bathrooms in the UK. BS 7671 Section 701 prohibits socket outlets in Zone 0, Zone 1, and Zone 2. Outside the zones, a standard socket could theoretically be installed, but in practice most domestic bathrooms are too small to have an area outside the zones. The only sockets permitted in bathrooms are shaver supply units complying with BS EN 61558-2-5 (formerly BS 3535). These are double-insulated transformers that provide an isolated supply — they can be installed in Zone 2 or outside the zones. They are commonly seen as dual-voltage (110V/240V) units for electric shavers and toothbrushes. If you need a 13A socket for an appliance in a bathroom, it must be installed outside the bathroom in an adjacent room or hallway.',
  },
  {
    question: 'What IP rating do I need for a bathroom light?',
    answer:
      'The IP rating required depends on which zone the light is in. Zone 0 (inside the bath or shower tray): IPX7 minimum — this zone is rare for light fittings, but underwater lights for whirlpool baths exist. Zone 1 (directly above the bath or shower to 2.25m from the floor): IPX4 minimum. This is where most bathroom ceiling lights are located. An IP44 or IP65 rated fitting is typical. Zone 2 (extending 0.6m horizontally from Zone 1): IPX4 minimum. Mirrors with integrated lights, shaver lights, and wall lights in Zone 2 must be at least IP44. Outside the zones: no specific IP requirement beyond IPX0, but IP44 is recommended as a sensible precaution due to the humid environment. Where water jets are used for cleaning purposes (such as in a commercial or public bathroom), IPX5 is required in Zone 1 and Zone 2.',
  },
  {
    question: 'Do I need Part P notification for bathroom electrical work?',
    answer:
      'Yes. All electrical work in a bathroom (or a room containing a bath or shower) is notifiable under Part P of the Building Regulations in England and Wales, regardless of whether it involves a new circuit. This includes replacing a light fitting, installing an extractor fan, adding a shaver socket, or changing a pull-cord switch. The electrician must either be registered with a competent person scheme (NICEIC, NAPIT, ELECSA) to self-certify the work, or the work must be notified to building control directly. If a homeowner carries out bathroom electrical work themselves, they must notify building control before starting and pay the building control fee (typically £250 to £500). In practice, it is almost always cheaper and safer to hire a registered electrician who can self-certify.',
  },
  {
    question: 'Can I install a pull-cord switch in Zone 1?',
    answer:
      'Yes. Pull-cord switches are specifically permitted in Zone 1, provided they have the required IP rating (IPX4 minimum). A pull-cord ceiling switch is the standard method of controlling bathroom lights in the UK. The cord itself is an insulating material and the switch mechanism is enclosed in a housing rated for the zone. Rocker switches (standard plate switches) are not permitted in Zone 1 or Zone 2 — they must be located outside the zones or outside the bathroom. This is why most bathroom lights are controlled by a pull-cord inside the bathroom or a plate switch on the wall outside the bathroom door.',
  },
  {
    question: 'What size cable do I need for an electric shower?',
    answer:
      "The cable size for an electric shower depends on the shower rating (kW) and the cable run length. For a typical 8.5kW shower, a 6mm twin-and-earth cable is usually adequate for runs up to about 18 metres. For a 9.5kW shower, 10mm cable is typically required. For a 10.5kW or higher-rated shower, 10mm cable is the minimum and 16mm may be needed for longer runs. The circuit must be protected by a suitably rated MCB or RCBO — 40A for a 9.5kW shower on 10mm cable, for example. BS 7671 requires the circuit to be RCD-protected (30mA). The cable must also be sized to account for the installation method, ambient temperature, grouping factors, and thermal insulation — follow the cable sizing procedure in Appendix 4 of BS 7671. Elec-Mate's cable sizing calculator handles all of this automatically.",
  },
  {
    question: 'Do bathroom downlights need to be fire-rated?',
    answer:
      'If the bathroom ceiling is a fire-compartment boundary (which it usually is between a ground floor bathroom and the first floor), the downlights must be fire-rated to maintain the fire resistance of the ceiling. Fire-rated downlights are designed to close and seal in the event of a fire, preventing fire and smoke from spreading through the ceiling void. The downlights must also have the appropriate IP rating for the zone they are in — IP65 is a common choice that covers both Zone 1 and Zone 2 requirements and provides good protection against moisture ingress in a steamy bathroom. Non-fire-rated downlights can compromise the fire compartmentation and may be flagged as a defect on an EICR.',
  },
  {
    question: 'Can I have underfloor heating in a bathroom?',
    answer:
      'Yes. Electric underfloor heating can be installed in a bathroom, and it is increasingly popular in modern bathroom refurbishments. The heating element must have an appropriate IP rating for the zone — IPX7 for Zone 0 (not common), IPX4 for Zone 1 and Zone 2. The heating mat or cable is typically installed beneath the floor tiles and connected to a thermostat. The thermostat should be located outside the zones (usually outside the bathroom or at high level) and the circuit must be RCD-protected. The installation is notifiable under Part P. The heating element should comply with BS EN 60335-2-96 and be installed in accordance with the manufacturer instructions. An EIC is required for the installation.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'Full guide to Part P notification, notifiable vs non-notifiable work, and competent person schemes.',
    icon: Scale,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone with AI board scanning and voice test entry.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/house-rewire-guide',
    title: 'House Rewire Guide',
    description:
      'Full guide to domestic rewiring including bathroom circuits and special locations.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for shower circuits and bathroom installations following BS 7671 Appendix 4.',
    icon: Cable,
    category: 'Calculator',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'Observation Codes Explained',
    description: 'C1, C2, C3, and FI codes with real bathroom-related examples.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description: 'Study for C&G 2391 with structured training including special locations.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'bathroom-zones',
    heading: 'Bathroom Zones Explained',
    content: (
      <>
        <p>
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          Section 701 defines specific zones within a bathroom that determine what electrical
          equipment can be installed and what level of protection is required. These zones exist
          because bathrooms present a higher risk of electric shock — water reduces skin resistance,
          and a person in a bath or shower has a direct path to earth through the water and
          plumbing.
        </p>
        <p>
          The zones are measured from the bath, shower tray, or shower head position. Understanding
          them is essential for any electrician carrying out bathroom installations, and for
          inspectors assessing existing bathroom wiring during an EICR.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <Droplet className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
            <p className="text-white text-sm leading-relaxed">
              <strong>Key principle:</strong> The closer the equipment is to the water source, the
              higher the level of protection required. Zone 0 has the strictest requirements; areas
              outside the zones have the least restrictions.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'zone-0',
    heading: 'Zone 0: Inside the Bath or Shower Tray',
    content: (
      <>
        <p>
          Zone 0 is the interior of the bath tub or shower tray. It is the area that can contain
          water during normal use.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP rating required:</strong> IPX7 minimum (protection against temporary
                immersion in water).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage:</strong> Only SELV (Separated Extra-Low Voltage) at a maximum of
                12V AC or 30V DC is permitted. The SELV source (safety transformer) must be located
                outside Zone 0, Zone 1, and Zone 2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equipment permitted:</strong> Only fixed equipment specifically designed for
                use in this zone — for example, underwater lighting for whirlpool baths. This is
                rare in domestic installations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In practice, Zone 0 in a domestic bathroom is usually empty of electrical equipment. The
          key point is that nothing operating at mains voltage is permitted within the bath or
          shower tray.
        </p>
      </>
    ),
  },
  {
    id: 'zone-1',
    heading: 'Zone 1: Above the Bath or Shower',
    content: (
      <>
        <p>
          Zone 1 extends vertically from the finished floor level (or the top of the bath/shower
          tray) to a height of 2.25 metres above the floor. Horizontally, it covers the area
          directly above the bath or shower tray. For a shower without a tray (such as a wet room),
          Zone 1 extends to 1.2 metres from the shower head fixing point.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP rating required:</strong> IPX4 minimum (protection against splashing
                water from any direction). IPX5 where water jets are used for cleaning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equipment permitted:</strong> SELV equipment, water heaters (electric
                showers, instantaneous water heaters), and whirlpool bath units. Pull-cord switches
                with the appropriate IP rating are permitted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not permitted:</strong> Standard socket outlets, standard plate switches,
                junction boxes, connection units, or any equipment not rated for the zone.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Zone 1 is where most bathroom ceiling lights are located. The light fitting must be rated
          IPX4 minimum — IP44 or IP65 fittings are the standard choices. Electric showers are also
          in Zone 1 and must be connected via a fused connection unit or dedicated circuit with the
          switch located outside the zones.
        </p>
      </>
    ),
  },
  {
    id: 'zone-2',
    heading: 'Zone 2: 0.6m from the Bath or Shower',
    content: (
      <>
        <p>
          Zone 2 extends 0.6 metres horizontally beyond the edge of Zone 1, and vertically from the
          floor to 2.25 metres. It also includes the area above the bath/shower that is above 2.25
          metres but within the horizontal extent of Zone 1 (the ceiling void area directly above
          the bath).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP rating required:</strong> IPX4 minimum (IPX5 where water jets are used
                for cleaning).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equipment permitted:</strong> Everything allowed in Zone 1, plus luminaires,
                shaver supply units (BS EN 61558-2-5), fans, heating appliances, and other fixed
                equipment — all with the appropriate IP rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not permitted:</strong> Standard 13A socket outlets, standard plate
                switches.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Zone 2 is where bathroom mirrors with integrated lighting, shaver sockets, and some
          extractor fans are typically located. The 0.6-metre dimension is measured horizontally
          from the edge of the bath or shower tray — use a tape measure to establish the exact
          boundary.
        </p>
      </>
    ),
  },
  {
    id: 'outside-zones',
    heading: 'Outside the Zones',
    content: (
      <>
        <p>
          The area outside Zone 0, Zone 1, and Zone 2 has fewer restrictions, but bathrooms are
          still considered special locations under BS 7671. The key rules outside the zones:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP rating:</strong> No specific IP requirement (IPX0 is acceptable), but
                IP44 is recommended due to the humid environment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Standard socket outlets:</strong> Technically permitted outside the zones,
                but in practice most domestic bathrooms do not have a large enough area outside the
                zones to accommodate a socket. If installed, the socket must be RCD-protected
                (30mA).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plate switches:</strong> Permitted outside the zones. This is where the
                standard bathroom light switch is located — typically on the wall just outside the
                bathroom door.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In many small UK bathrooms, the entire room falls within Zone 1 and Zone 2, with no area
          "outside the zones." In larger bathrooms, there may be a small area outside the zones —
          typically at the far end of the room from the bath/shower.
        </p>
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Ratings for Each Zone',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-4">IP Rating Quick Reference</h3>
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplet className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>IPX7</strong> — Protection against temporary immersion (up to 1m for 30
                minutes). Required in Zone 0.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplet className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>IPX5</strong> — Protection against water jets from any direction. Required
                in Zone 1 and Zone 2 where water jets are used for cleaning (commercial/public
                bathrooms).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplet className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IPX4</strong> — Protection against splashing water from any direction.
                Minimum requirement for Zone 1 and Zone 2 in domestic bathrooms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplet className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP44</strong> — Protection against solid objects over 1mm and splashing
                water. Common choice for Zone 1 and Zone 2 light fittings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplet className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP65</strong> — Protection against dust ingress and water jets. Often chosen
                for bathroom downlights as it exceeds the minimum IPX4 requirement and provides good
                moisture protection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The IP (Ingress Protection) code consists of two digits. The first digit indicates
          protection against solid objects (0 to 6). The second digit indicates protection against
          water (0 to 9). When an "X" replaces a digit (e.g., IPX4), it means that protection level
          was not tested for — it does not mean zero protection.
        </p>
      </>
    ),
  },
  {
    id: 'extract-fans',
    heading: 'Bathroom Extract Fans',
    content: (
      <>
        <p>
          Building Regulations Approved Document F (Ventilation) requires mechanical extract
          ventilation in bathrooms without an openable window. Even in bathrooms with a window, a
          fan is recommended to control moisture and prevent condensation and mould.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Fan className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum extract rate:</strong> 15 litres per second for intermittent extract
                (bathroom fans switched on and off), or 8 litres per second for continuous extract
                (such as a whole-house MVHR system).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Fan className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone requirements:</strong> A ceiling-mounted fan in Zone 1 must be rated
                IPX4 minimum. A wall-mounted fan in Zone 2 must be rated IPX4 minimum. Most quality
                bathroom fans are rated IP44 or IP45.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Fan className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overrun timer:</strong> Building Regulations require the fan to continue
                running for a minimum of 15 minutes after the light is switched off (or the user
                leaves the room). Most bathroom fans have a built-in adjustable overrun timer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Fan className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wiring:</strong> A standard bathroom fan is wired from the lighting circuit
                using a 3-core and earth cable (for the switched live and permanent live for the
                overrun timer). The fan isolator switch must be accessible but located outside Zone
                1 and Zone 2.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'shower-circuits',
    heading: 'Electric Shower Circuits',
    content: (
      <>
        <p>
          An electric shower requires a dedicated radial circuit from the consumer unit. It is one
          of the highest-rated fixed appliances in a domestic installation, typically drawing 35A to
          48A.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>7.5kW shower:</strong> 6mm T&E cable, 32A MCB/RCBO. Maximum cable run
                approximately 27 metres.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>8.5kW shower:</strong> 6mm T&E cable, 40A MCB/RCBO. Maximum cable run
                approximately 18 metres.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>9.5kW shower:</strong> 10mm T&E cable, 40A MCB/RCBO. Maximum cable run
                approximately 35 metres.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>10.5kW+ shower:</strong> 10mm T&E cable, 45A MCB/RCBO. Check{' '}
                <SEOInternalLink href="/guides/how-to-size-cables-bs-7671">
                  cable sizing
                </SEOInternalLink>{' '}
                for longer runs. May require 16mm cable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The shower circuit must be RCD-protected (30mA) in accordance with BS 7671 Regulation
          701.411.3.3. The shower unit must be connected via a double-pole isolator switch located
          outside Zone 1 and Zone 2 — typically a 45A ceiling pull-cord switch with a neon
          indicator. The cable must be routed to avoid Zone 1 where possible, or if it passes
          through Zone 1, it must be mechanically protected or installed in a conduit.
        </p>
        <p>
          Always check the manufacturer's installation instructions for the specific shower model —
          some high-powered showers (10.8kW and above) require 16mm cable and a 50A protective
          device.
        </p>
      </>
    ),
  },
  {
    id: 'part-p-bathroom',
    heading: 'Part P and Bathroom Electrical Work',
    content: (
      <>
        <p>
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          classifies all electrical work in a bathroom as notifiable, regardless of whether it
          involves a new circuit. This includes:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Installing or replacing a light fitting in the bathroom.</span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Installing or replacing an extractor fan.</span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Installing or replacing an electric shower.</span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Installing or replacing a shaver socket.</span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Installing electric underfloor heating.</span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Adding or modifying any circuit serving the bathroom.</span>
            </li>
          </ul>
        </div>
        <p>
          The electrician must be registered with a competent person scheme to self-certify, or the
          work must be notified to building control directly. An Electrical Installation Certificate
          (EIC) is required for new circuits; a Minor Electrical Installation Works Certificate
          (MEIWC) may be appropriate for like-for-like replacements on existing circuits.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Bathroom Installations Made Simple',
    content: (
      <>
        <p>
          Bathroom electrical work is one of the most common domestic installation tasks, but the
          zone requirements and Part P notification make it more involved than a standard circuit
          installation. Elec-Mate streamlines the process:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Droplet className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Zone Compliance Checker</h4>
                <p className="text-white text-sm leading-relaxed">
                  Select the equipment type and location, and Elec-Mate confirms the IP rating
                  requirement and whether the equipment is permitted in that zone. No more flipping
                  through Section 701 on site.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Bathroom-Specific Certificate Sections
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  The EIC includes all Section 701 inspection items pre-populated: supplementary
                  bonding, IP ratings, SELV sources, RCD protection, and zone identification. Voice
                  entry fills in the test results while you work.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Certify bathroom work on your phone"
          description="Join 430+ UK electricians using Elec-Mate for bathroom installation certificates. Zone compliance checking, voice test entry, instant PDF delivery. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalWorkInBathroomPage() {
  return (
    <GuideTemplate
      title="Electrical Work in Bathroom | Zones & Regulations UK"
      description="Complete guide to electrical work in bathrooms in the UK. Zone 0, Zone 1, Zone 2 explained, IP ratings per zone, what can go where, extract fans, electric shower circuits, and Part P notification requirements."
      datePublished="2025-09-05"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Droplet}
      heroTitle={
        <>
          Electrical Work in Bathrooms:{' '}
          <span className="text-yellow-400">Zones, IP Ratings, and Regulations</span>
        </>
      }
      heroSubtitle="Bathrooms are special locations under BS 7671. Zone 0, Zone 1, and Zone 2 each have different requirements for what equipment can be installed and what IP rating is needed. All bathroom electrical work is notifiable under Part P. This guide explains everything."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Bathroom Electrical Work"
      relatedPages={relatedPages}
      ctaHeading="Handle Bathroom Installations with Confidence"
      ctaSubheading="Zone compliance checking, certificate production, voice test entry, and instant delivery. Join 430+ UK electricians using Elec-Mate. 7-day free trial."
    />
  );
}
