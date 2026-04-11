import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  Lightbulb,
  AlertTriangle,
  ShieldCheck,
  Zap,
  Home,
  ClipboardCheck,
  PoundSterling,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/guides' },
  { label: 'External Lighting Installation', href: '/external-lighting-installation' },
];

const tocItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'cable-requirements', label: 'Cable Requirements' },
  { id: 'ip-ratings', label: 'IP Ratings for Outdoor Fittings' },
  { id: 'rcd-protection', label: 'RCD Protection' },
  { id: 'underground-cables', label: 'Underground Cable Installations' },
  { id: 'controls', label: 'PIR, Dusk-to-Dawn & Smart Controls' },
  { id: 'planning', label: 'Planning Permission & Party Walls' },
  { id: 'light-pollution', label: 'Light Pollution Considerations' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'All external luminaires must have a minimum IP (Ingress Protection) rating of IP44. Fittings located where they may be directly exposed to water jets, hoses, or flooding require IP65 or higher.',
  'All outdoor socket outlet circuits and lighting circuits must be protected by a 30mA RCD under Regulation 411.3.3 of BS 7671. This is non-negotiable regardless of the circuit length or location.',
  'Underground cables must be SWA (Steel Wire Armoured) cable laid at the correct depth (600 mm under vehicular areas, 500 mm under non-vehicular areas) or standard cable in rigid conduit. Route markers and cable tiles must be used.',
  'External lighting typically does not require planning permission, but floodlights or other obtrusive lighting attached to listed buildings, in conservation areas, or exceeding certain heights may require consent.',
  'Party wall considerations and boundary disputes can arise from external lighting directed at or across a neighbouring property. Light spillage onto adjacent properties should be minimised and directed downward.',
];

const faqs = [
  {
    question: 'Does external lighting need to be on a separate circuit?',
    answer:
      'BS 7671 does not mandate a separate circuit for external lighting, but best practice — and the approach taken by most electricians — is to provide a dedicated external lighting circuit. This simplifies fault finding, allows the external lighting to be controlled independently, and avoids volt drop issues on long cable runs. The circuit must be protected by a 30mA RCD under Regulation 411.3.3, regardless of whether it is shared with internal circuits.',
  },
  {
    question: 'What cable should I use for outdoor lighting?',
    answer:
      'For surface-mounted outdoor cable runs, armoured SWA cable (steel wire armoured) or twin and earth run in UV-resistant conduit are both acceptable. For underground runs, SWA cable is strongly preferred and should be buried at the correct depth (600 mm under vehicular traffic areas, 500 mm under gardens and paths). Standard twin and earth cable must never be buried directly in the ground without additional mechanical protection such as rigid conduit and duct. Cable route markers should be installed every metre.',
  },
  {
    question: 'What IP rating is required for outdoor luminaires?',
    answer:
      'BS 7671 and BS EN 60529 specify ingress protection ratings for outdoor electrical equipment. The minimum for outdoor luminaires is IP44 (protected against solid objects over 1mm and water splashing from any direction). For fittings in exposed locations, near hosepipes or water features, IP65 or IP66 is recommended. For underground or submerged fittings (such as path lighting set into the ground), IP67 or IP68 is required.',
  },
  {
    question: 'Do I need planning permission for external lighting?',
    answer:
      'Most domestic external lighting is permitted development and does not require planning permission. However, planning consent may be required if: the property is a listed building; the property is in a conservation area and the light fitting is on the principal elevation or a roof; the installation involves significant structural work; or the fitting exceeds certain heights. In all cases, the local planning authority is the definitive source. Commercial premises have different permitted development rights and external lighting for car parks, security, or advertising is more likely to need consent.',
  },
  {
    question: 'Does an external lighting installation need a certificate?',
    answer:
      'Yes. Any new circuit or modification to an existing circuit (including adding a new external lighting circuit) must be certified under Building Regulations Part P. A registered competent person can self-certify the work using a Minor Works Certificate (for additions to an existing circuit) or an Electrical Installation Certificate (for a new circuit). The certificate must be issued to the homeowner and notified to the local authority either directly by the competent person scheme or via a building notice.',
  },
  {
    question:
      'Can I install external lighting on a socket outlet circuit for a garden shed or outbuilding?',
    answer:
      "You can supply an outbuilding (shed, garage, summerhouse) from the main dwelling's consumer unit, but the supply cable must be suitable for the run — SWA underground cable for buried runs, or twin and earth in conduit for surface runs. The outbuilding supply should be protected by a 30mA RCD at the consumer unit and ideally by a separate RCD or RCBO at a small consumer unit in the outbuilding itself. The work must be notified and certified under Part P.",
  },
  {
    question: "What are the rules about light spillage onto a neighbour's property?",
    answer:
      "There is no specific statute governing light spillage from domestic lighting onto neighbouring properties, but the common law of nuisance may apply if lighting materially interferes with a neighbour's enjoyment of their property. The Chartered Institution of Building Services Engineers (CIBSE) and the Institution of Lighting Professionals (ILP) publish guidance on obtrusive light limits. Practically, fittings should be directed downward and inward, and PIR sensors should be set to minimise unnecessary illumination. Floodlights aimed across a boundary are a common source of neighbour disputes.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/led-lighting-upgrade',
    title: 'LED Lighting Upgrade',
    description: 'Replacing fluorescent and halogen lights with LED — retrofit options and costs.',
    icon: Lightbulb,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-protection-explained',
    title: 'RCD Protection Explained',
    description: 'How RCDs work, where they are required, and how to test them.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord electrical inspection requirements and compliance deadlines.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'Electrical Certificate App',
    description: 'Complete electrical certificates on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/emergency-lighting-installation',
    title: 'Emergency Lighting Installation',
    description: 'BS 5266 emergency lighting design, installation, and certification.',
    icon: AlertTriangle,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'External Lighting Installation: Overview',
    content: (
      <>
        <p>
          External lighting installation covers any electrical lighting fitted outside the thermal
          envelope of a building — garden lights, security floodlights, porch lights, pathway
          lighting, driveway lighting, and lighting for outbuildings. Unlike internal lighting,
          outdoor installations must contend with moisture, temperature extremes, UV exposure, and
          the risk of physical damage.
        </p>
        <p>
          In the UK, all external lighting work on new circuits must be carried out by a registered
          competent person and notified under Building Regulations Part P. The technical standard is{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (the IET Wiring Regulations). Key requirements for outdoor installations include
          appropriate IP ratings, mandatory RCD protection, and suitable cable types and
          installation methods.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building Regulations Part P</strong> — new circuits in domestic premises
                must be notified to the local authority. Registered competent persons (NICEIC,
                NAPIT, ELECSA) can self-certify and notify automatically. Non-registered persons
                must submit a building notice and have the work inspected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 compliance</strong> — all wiring must comply with the 18th Edition
                of the IET Wiring Regulations. Special location requirements (Section 714 for
                outdoor lighting installations) and general requirements for RCD protection, cable
                selection, and earthing all apply.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cable-requirements',
    heading: 'Cable Requirements for Outdoor Installations',
    content: (
      <>
        <p>
          Cable selection for external lighting is governed by the installation method, exposure to
          mechanical damage, UV radiation, temperature, and moisture. BS 7671 Section 522 covers
          cable selection for external conditions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surface-mounted above-ground runs</strong> — twin and earth (6242Y) in
                UV-stabilised conduit (grey PVC or black HDPE) is acceptable for above-ground
                external runs provided the conduit is adequately secured and protected from
                mechanical damage. SY (steel wire braided) flex or SWA cable can be used without
                conduit. All conduit must be UV-resistant — standard white conduit degrades rapidly
                outdoors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underground direct burial</strong> — SWA (Steel Wire Armoured) cable is the
                standard choice for direct burial. The steel wire armour provides mechanical
                protection against accidental damage from digging. The cable must be buried at the
                correct depth and route markers installed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Underground in conduit</strong> — standard twin and earth cable in a rigid
                HDPE duct or conduit is acceptable underground, provided the conduit provides
                adequate mechanical protection. This method is easier to pull through if cable
                replacement is needed in future.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Volt drop</strong> — long external cable runs to outbuildings or garden
                lights must be designed to limit volt drop to 3% (for lighting circuits) under BS
                7671. For long runs, upsizing the cable conductor cross-section is often necessary.
                Calculate the run length and load before selecting cable size.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Ratings for Outdoor Fittings',
    content: (
      <>
        <p>
          IP (Ingress Protection) ratings are defined in BS EN 60529. The rating consists of two
          digits: the first indicates protection against solid particle ingress, the second
          indicates protection against liquid ingress. For outdoor electrical fittings in the UK,
          the minimum acceptable rating is IP44.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP44</strong> — protected against solid objects over 1mm and water splashing
                from any direction. Minimum for general outdoor use on walls and ceilings. Suitable
                for porch lights, wall lanterns, and garden fittings in sheltered positions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP65</strong> — dust tight and protected against water jets from any
                direction. Recommended for exposed fittings, security floodlights, and any fitting
                likely to be cleaned with a hose or subject to driving rain. Most quality outdoor
                floodlights are rated IP65.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP67 / IP68</strong> — dust tight and protected against temporary or
                prolonged immersion in water. Required for in-ground path lights, pond lighting, and
                any fitting set into paving or grass where water pooling can occur.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IK rating</strong> — the IK rating (BS EN 62262) indicates resistance to
                mechanical impact. For fittings in vulnerable locations (low-mounted lights, car
                park bollards), specify IK08 (5 joule) or higher in addition to the appropriate IP
                rating.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection for External Lighting',
    content: (
      <>
        <p>
          Regulation 411.3.3 of BS 7671 requires 30mA RCD protection for all socket outlet circuits
          rated up to 32A. For external lighting circuits, Regulation 411.3.4 and the general
          additional protection requirements in Section 411 mean that 30mA RCD protection is
          effectively mandatory for all outdoor circuits.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Why RCDs are essential outdoors</strong> — outdoor environments increase the
                risk of insulation damage (from UV degradation, mechanical damage, rodent attack, or
                moisture ingress), which can create lethal shock hazards. A 30mA RCD will trip in
                the event of a leakage current exceeding 30mA, providing life-saving protection
                before a fatal shock can occur.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCBO protection</strong> — where the external lighting is on a dedicated
                circuit, an RCBO (combined RCD and MCB) provides the most elegant solution: the
                circuit is individually protected for both overload and earth leakage without
                affecting other circuits if the RCBO trips. RCBOs are strongly preferred over a
                shared RCD protecting multiple circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nuisance tripping</strong> — outdoor circuits with long cable runs, multiple
                fittings, or LED drivers with capacitive filters can have significant leakage
                currents that cause nuisance RCD tripping. Where nuisance tripping is a problem,
                investigate the root cause (cable insulation quality, LED driver quality) rather
                than increasing the RCD trip threshold.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'underground-cables',
    heading: 'Underground Cable Installations',
    content: (
      <>
        <p>
          Underground cable runs to garden outbuildings, gate motors, pond pumps, and remote
          lighting columns require careful planning and correct installation methods to ensure
          long-term safety and reliability.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Depth requirements</strong> — under non-vehicular areas (gardens, paths,
                flower beds): minimum 500mm depth. Under vehicular areas (driveways, car parks):
                minimum 600mm depth. Under roads: consult local authority, typically 750mm minimum.
                Shallower burial is only acceptable if additional mechanical protection (concrete
                cover, steel channel, or duct) is provided.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Route markers and cable tiles</strong> — yellow plastic cable warning tiles
                must be placed 150mm above the cable, and cable route markers should be installed
                every metre and at changes of direction. A cable route plan must be provided to the
                property owner and retained in the installation documentation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Joints</strong> — joints in underground cables must be made in purpose-made
                gel-filled or resin-filled underground joint kits. Standard junction boxes are not
                suitable for direct burial. Where possible, avoid joints in underground sections
                altogether by using a single cable length from supply to luminaire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Before you dig</strong> — always check for buried services before
                excavating. Use a cable avoidance tool (CAT) and signal generator (Genny) and
                contact Dial Before You Dig (0800 96 93 66) or use the online plans request service
                for utility company records.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'controls',
    heading: 'PIR Sensors, Dusk-to-Dawn Controls & Smart Systems',
    content: (
      <>
        <p>
          External lighting controls serve two purposes: energy efficiency (avoiding lights burning
          unnecessarily during daylight or when no one is present) and security (ensuring detection
          zones are well-lit when activity occurs). BS 7671 has no specific requirements for control
          types, but energy efficiency regulations and planning conditions may specify particular
          approaches.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>PIR (Passive Infrared) sensors</strong> — detect heat from moving bodies and
                switch the light on for a preset period. Detection range and angle are adjustable on
                most commercial sensors. Sensitivity, hold time, and lux threshold (to prevent
                triggering in daylight) must be correctly set. PIRs can be integral to the luminaire
                or separate wall-mounted units.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dusk-to-dawn (photocell) controls</strong> — a photocell (photoelectric
                switch) switches the light on at dusk and off at dawn automatically. Suitable for
                security and amenity lighting that must be on throughout the night. Can be combined
                with a PIR for dim-and-bright operation: constant low-level illumination switching
                to full output on detection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Timer controls</strong> — programmable timers allow precise control of
                operating hours. Useful for decorative lighting, entrance lighting, or areas where
                security lighting operating throughout the night is undesirable. Astro timers (which
                automatically adjust to sunrise/sunset times) are preferred over fixed timers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart lighting systems</strong> — Wi-Fi, Zigbee, or Z-Wave controlled
                outdoor fittings allow app or voice control, scheduling, and remote monitoring.
                Philips Hue, LIFX, and similar systems are popular for domestic installations. The
                wiring and circuit requirements are identical to standard fittings; the intelligence
                is in the driver or a separate controller.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'planning',
    heading: 'Planning Permission & Party Wall Considerations',
    content: (
      <>
        <p>
          Most domestic external lighting is permitted development and does not require planning
          permission. However, there are exceptions that electricians should be aware of when
          advising clients.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Listed buildings</strong> — any external alteration to a listed building,
                including adding light fittings, requires listed building consent. This applies even
                to minor changes such as replacing a wall-mounted lantern. Advise clients to contact
                their local planning authority before installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Conservation areas</strong> — properties in conservation areas have reduced
                permitted development rights. External lighting on the principal elevation or roof
                slopes fronting a highway may require planning consent. Again, clients should check
                with the local planning authority.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial premises</strong> — external lighting for car parks, security,
                signage, or advertising at commercial premises is more likely to require planning
                permission, particularly if it will operate at night or could affect neighbours. A
                lighting design report (including lux spill calculations) is commonly required as
                part of a planning application.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Party Wall Act 1996</strong> — if external lighting requires structural work
                on or near a party wall (shared boundary wall), the Party Wall Act may require
                service of a party wall notice on the adjoining owner. Electrical installation alone
                rarely triggers the Act, but coring through a party wall or fixing a bracket to a
                party wall might.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'light-pollution',
    heading: 'Light Pollution Considerations',
    content: (
      <>
        <p>
          Light pollution from poorly designed external lighting is a growing concern in the UK. The
          Institution of Lighting Professionals (ILP) and the CIBSE publish guidance on obtrusive
          light, and local planning authorities increasingly include lighting conditions in planning
          approvals.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Direct upward light</strong> — avoid fittings that direct light upward into
                the sky. Full-cutoff luminaires (those which direct all light downward and forward)
                minimise sky glow and are recommended by the ILP for all external installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Glare</strong> — fittings must not create uncomfortable glare for road
                users, pedestrians, or neighbours. Choose fittings with appropriate glare control
                and position them to avoid direct lines of sight into adjacent properties or public
                areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Light spillage onto neighbours</strong> — use PIR sensors and dusk-to-dawn
                controls to limit operating hours. Direct fittings inward and downward. Avoid
                placing floodlights on gable ends where they will illuminate adjacent gardens. The
                common law of nuisance may be invoked by neighbours if lighting causes a material
                interference with their enjoyment of their property.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: External Lighting Work',
    content: (
      <>
        <p>
          External lighting installation is a common domestic and commercial job. New-build
          developments, garden renovation projects, EV charger installations (which often require
          complementary security lighting), and commercial security upgrades all generate external
          lighting work throughout the year.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificate on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certificate app
                  </SEOInternalLink>{' '}
                  to issue an Electrical Installation Certificate or Minor Works Certificate for
                  external lighting work on site. PDF delivered to the client instantly — no paper
                  forms, no scanning, no delays.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Typical Costs (2026)</h4>
                <p className="text-white text-sm leading-relaxed">
                  Wall-mounted security light with PIR (supply and fit): £80–£200. Underground cable
                  to garden outbuilding (10m run, SWA, including consumer unit in outbuilding):
                  £400–£800. Full garden lighting scheme with path lights, feature lighting, and
                  dusk-to-dawn control: £800–£2,500 depending on scope. Always quote separately for
                  cable laying, certificate, and notifiable work fees.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Certify external lighting installations with Elec-Mate"
          description="Join 1,000+ UK electricians using Elec-Mate to issue Electrical Installation Certificates and Minor Works Certificates on site. Instant PDF export and automatic notification to competent person schemes. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ExternalLightingInstallationPage() {
  return (
    <GuideTemplate
      title="External Lighting Installation UK | Outdoor Electrical Wiring Guide"
      description="Complete UK guide to external lighting installation. Cable requirements, IP ratings (IP44 minimum), RCD protection, underground SWA cable depth, PIR and dusk-to-dawn controls, planning permission, light pollution, and certification under Part P."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Lightbulb}
      heroTitle={
        <>
          External Lighting Installation UK:{' '}
          <span className="text-yellow-400">Outdoor Electrical Wiring Guide</span>
        </>
      }
      heroSubtitle="Everything electricians need to know about outdoor lighting installation — cable selection, IP ratings, mandatory RCD protection, underground burial depths, PIR and photocell controls, planning permission considerations, and Part P certification."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About External Lighting Installation"
      relatedPages={relatedPages}
      ctaHeading="Certify External Lighting Work on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for on-site Electrical Installation Certificates and Minor Works Certificates. Instant PDF export, automatic competent person scheme notification. 7-day free trial, cancel anytime."
    />
  );
}
