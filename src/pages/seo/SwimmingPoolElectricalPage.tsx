import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Droplet,
  Shield,
  BookOpen,
  Zap,
  AlertTriangle,
  Brain,
  GraduationCap,
  Calculator,
  FileCheck2,
  ClipboardCheck,
  Sun,
  Waves,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Regulations', href: '/guides/bs-7671-18th-edition-guide' },
  { label: 'Swimming Pool Regs', href: '/guides/swimming-pool-electrical-regulations' },
];

const tocItems = [
  { id: 'introduction', label: 'Introduction to Section 702' },
  { id: 'zone-system', label: 'Zone System Explained' },
  { id: 'zone-0', label: 'Zone 0 Requirements' },
  { id: 'zone-1', label: 'Zone 1 Requirements' },
  { id: 'zone-2', label: 'Zone 2 Requirements' },
  { id: 'selv-requirements', label: 'SELV Requirements' },
  { id: 'bonding', label: 'Supplementary Bonding' },
  { id: 'ip-ratings', label: 'IP Ratings Per Zone' },
  { id: 'hot-tubs', label: 'Hot Tubs and Paddling Pools' },
  { id: 'inspection', label: 'Inspection and Testing' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Section 702 of BS 7671 applies to swimming pools, paddling pools, hot tubs, fountains, and their surrounding zones — any location with a basin intended for immersion or wading.',
  'Zone 0 (inside the pool) permits only SELV at 12 V AC or 30 V DC. Equipment must be rated IPX8. The safety source must be located outside Zones 0 and 1.',
  'Supplementary equipotential bonding is mandatory — all extraneous conductive parts in Zones 0, 1, and 2 must be bonded together and to the protective conductor.',
  'Hot tubs installed outdoors follow Section 702 zones, and the electrical supply must not use PME earthing if outdoors — a TT system or separate earth electrode is required.',
  'Elec-Mate AI regulations lookup gives instant answers on Section 702 requirements, and the EICR certificate app handles swimming pool inspections with all the zone-specific fields.',
];

const faqs = [
  {
    question: 'Does Section 702 apply to domestic hot tubs?',
    answer:
      'Yes. Section 702 applies to all locations containing a basin designed for immersion or wading, which includes domestic hot tubs, swim spas, and paddling pools. The zone dimensions for hot tubs are the same as for swimming pools — Zone 0 is the interior of the tub, Zone 1 extends 2 m from the edge, and Zone 2 extends a further 1.5 m. The electrical supply to an outdoor hot tub must not use PME (TN-C-S) earthing because of the risk of a broken PEN conductor — a TT earthing system with a separate earth electrode or a confirmed TN-S supply is required. The supply circuit must be protected by a 30 mA RCD and must include a means of isolation within sight of the hot tub. An IP-rated rotary isolator mounted on a post or wall is the standard solution. Indoor hot tubs in a purpose-built room follow the same Section 702 zone requirements.',
  },
  {
    question: 'What is SELV and why is it required in Zone 0?',
    answer:
      'SELV stands for Separated Extra-Low Voltage. It is a protective measure where the voltage is limited to a maximum of 12 V AC or 30 V DC, and the circuit is electrically separated from all other circuits and from earth. The separation is achieved by a safety isolating transformer complying with BS EN 61558-2-6. In Zone 0 (inside the pool basin), the body is fully immersed in water, skin resistance is at its lowest, and there is no possibility of escape. At these voltages, even with zero skin resistance, the current flowing through the body cannot reach a dangerous level. This is why SELV is the only acceptable form of electrical supply in Zone 0. The safety source (transformer) must be located outside Zones 0 and 1 to prevent it from being exposed to water.',
  },
  {
    question: 'What IP rating is required for each swimming pool zone?',
    answer:
      'Zone 0 requires IPX8 — protection against continuous immersion in water under conditions specified by the manufacturer. In practice, this means only equipment specifically designed for permanent underwater use. Zone 1 requires a minimum of IPX4 (protection against splashing water from any direction), or IPX5 if water jets are used for cleaning purposes (common in commercial pools). Zone 2 also requires a minimum of IPX4. These IP ratings must be maintained after installation, which means that cable entries, junction boxes, and enclosure seals must all achieve the required rating. During inspection and testing, the electrician should visually check that all IP ratings are maintained and that no damage, corrosion, or degraded seals have compromised the protection.',
  },
  {
    question: 'Is supplementary bonding always required for swimming pools?',
    answer:
      'Yes. Regulation 702.415.2 requires supplementary equipotential bonding in all swimming pool locations. All extraneous conductive parts within Zones 0, 1, and 2 must be connected together and to the protective conductor of every circuit serving those zones. This includes metallic pool structures, ladders, handrails, diving boards, water pipes, heating pipes, reinforcing steel in the pool surround (if accessible), and any other metallic components. The bonding conductor must be at least 4 mm squared copper. The purpose is to ensure that if a fault occurs, all metallic parts rise to the same potential simultaneously, preventing a potential difference that could drive current through a person in contact with two different metallic surfaces. This bonding is in addition to any main protective bonding at the consumer unit.',
  },
  {
    question: 'Can I install a socket outlet near a swimming pool?',
    answer:
      'Socket outlets are not permitted in Zone 0 or Zone 1. In Zone 2, socket outlets are only permitted if they are protected by one of the following measures: a 30 mA RCD, SELV, or electrical separation. Outside Zone 2, standard installation rules apply, but good practice is to ensure all socket outlets in the vicinity of a swimming pool are RCD-protected. For outdoor swimming pools, any socket outlets must also have appropriate IP ratings for the outdoor environment (typically IP66). The key principle is to keep mains voltage as far as possible from the water and to ensure that any electrical supply that does serve the pool area has robust fault protection.',
  },
  {
    question: 'What earthing system should be used for an outdoor swimming pool?',
    answer:
      'PME (TN-C-S) earthing must not be used for outdoor swimming pool installations. This is because a broken PEN conductor in a PME system can cause the exposed and extraneous conductive parts to rise to a dangerous potential relative to true earth. Since people in and around a swimming pool are often barefoot on wet ground (which provides a low-impedance path to true earth), the risk is unacceptable. The preferred options are a TT earthing system with a separate earth electrode, or a confirmed TN-S supply from the distribution network operator. If the existing property supply is TN-C-S (PME), the pool circuit must be provided with its own earth electrode and effectively operated as a TT system for that circuit. The earth electrode resistance must be low enough to ensure the 30 mA RCD operates within the required disconnection time.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/special-locations-part-7-bs-7671',
    title: 'Special Locations Part 7 Guide',
    description:
      'Complete overview of every Part 7 special location — bathrooms, saunas, construction sites, farms, and more.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/garden-lighting-regulations',
    title: 'Garden Lighting Regulations',
    description:
      'Outdoor electrical regulations including IP ratings, SWA cable, and RCD protection for garden installations.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/guides/earthing-arrangements-explained',
    title: 'Earthing Arrangements Explained',
    description:
      'TN-S, TN-C-S, and TT earthing systems explained — critical knowledge for pool installations.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/residual-current-monitoring',
    title: 'Residual Current Monitoring',
    description:
      'RCM systems and residual current device types — essential for pool and wet environment protection.',
    icon: Shield,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete EICR inspections including special location assessments on your phone with Elec-Mate.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/18th-edition',
    title: '18th Edition Course',
    description:
      'Study Section 702 in detail with structured training modules and practice exam questions.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'introduction',
    heading: 'Introduction to Section 702 of BS 7671',
    content: (
      <>
        <p>
          Section 702 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          covers the electrical requirements for swimming pools, paddling pools, and other basins
          designed for immersion or wading. It also applies to the areas immediately surrounding the
          pool — the splash zones and changing areas.
        </p>
        <p>
          Swimming pools represent one of the highest-risk electrical environments. A person
          immersed in water has dramatically reduced skin resistance, water provides an excellent
          conductive path, and escape from an electric shock may be impossible if the person is in
          the pool. Even a small fault current that would be harmless on dry land can be lethal in a
          swimming pool environment.
        </p>
        <p>
          Section 702 applies to both indoor and outdoor pools, domestic and commercial
          installations, permanent and temporary structures. It also covers hot tubs, swim spas,
          hydrotherapy pools, paddling pools, and decorative water features with basins. The
          regulations work alongside the{' '}
          <SEOInternalLink href="/guides/special-locations-part-7-bs-7671">
            general Part 7 framework
          </SEOInternalLink>{' '}
          and the general requirements of Parts 1 to 6.
        </p>
        <p>
          For electricians, Section 702 is a critical exam topic for both the C&G 2382 (18th
          Edition) and C&G 2391 (Inspection and Testing) qualifications. On site, getting the zones,
          IP ratings, and SELV requirements right is essential for a safe installation.
        </p>
      </>
    ),
  },
  {
    id: 'zone-system',
    heading: 'The Zone System for Swimming Pools',
    content: (
      <>
        <p>
          Section 702 divides the area in and around a swimming pool into three zones. Each zone has
          specific requirements for equipment type, IP rating, wiring method, and protective
          measures. The zones are defined by physical dimensions measured from the pool basin.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Waves className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 0</strong> — the interior volume of the pool basin itself. This
                includes the bottom and sides of the pool, up to the rim or overflow edge.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Waves className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 1</strong> — extends 2.0 m horizontally from the rim of the pool basin
                and 2.5 m vertically from the finished floor level or the highest point of any
                accessible surface from which a person could reach into the pool.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Waves className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Zone 2</strong> — extends a further 1.5 m horizontally beyond Zone 1.
                Vertically, Zone 2 extends to the same height as Zone 1 (2.5 m from floor level).
              </span>
            </li>
          </ul>
        </div>
        <p>
          These dimensions are measured from the finished floor level in indoor pools and from the
          finished ground level in outdoor pools. For pools with irregular shapes, the zones follow
          the contour of the pool edge. Where walls, partitions, or fixed barriers prevent direct
          access from the pool area to adjacent rooms, the zones do not extend through the barriers
          — but only if the barriers are permanent and provide effective separation.
        </p>
        <SEOInternalLink href="/guides/consumer-unit-regulations-uk">
          Consumer unit regulations
        </SEOInternalLink>{' '}
        require that circuits serving swimming pool zones are properly identified and protected at
        the distribution board.
      </>
    ),
  },
  {
    id: 'zone-0',
    heading: 'Zone 0: Inside the Pool Basin',
    content: (
      <>
        <p>
          Zone 0 is the most restrictive zone. It covers the interior volume of the pool basin — the
          area where water is present and where a person may be fully immersed.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Only SELV is permitted</strong> — at a maximum of 12 V AC or 30 V DC. The
                safety source (isolating transformer) must be located outside Zones 0 and 1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equipment must be rated IPX8</strong> — protected against the effects of
                continuous immersion in water under conditions specified by the manufacturer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Only fixed equipment specifically designed for use in Zone 0</strong> is
                permitted. This includes underwater pool lights, fountain pumps, and similar
                purpose-built equipment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No socket outlets, switches, or junction boxes</strong> are permitted in
                Zone 0.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Underwater pool lighting is the most common electrical equipment in Zone 0. These
          luminaires must be rated IPX8, supplied by SELV at 12 V, and the transformer must be
          located at least 2 m from the pool edge (outside Zone 1). The cable from the transformer
          to the luminaire must be continuous without joints inside Zones 0 or 1.
        </p>
      </>
    ),
  },
  {
    id: 'zone-1',
    heading: 'Zone 1: The Immediate Surround',
    content: (
      <>
        <p>
          Zone 1 extends 2 m horizontally from the pool edge and 2.5 m vertically from the floor.
          This is the splash zone — where water splashing, wet feet, and wet skin are expected.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>SELV at 12 V AC or 30 V DC only</strong> — the same voltage restriction as
                Zone 0. Mains voltage equipment is not permitted.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equipment must be rated IPX4 minimum</strong> — protected against water
                splashing from any direction. IPX5 required where water jets are used for cleaning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>No socket outlets or switches</strong> (other than SELV) are permitted in
                Zone 1.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Current-using equipment</strong> such as pool filtration pumps, heat pumps,
                and cover motors may be installed in Zone 1 only if specifically designed for this
                purpose and protected by SELV.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In practice, most pool equipment (pumps, filters, heaters, chlorinators) is installed in a
          plant room outside Zone 1. If a plant room is located within 2 m of the pool edge but is
          separated by a permanent wall with no direct opening to the pool area, it may be
          considered outside Zone 1 — but the electrician must assess whether the barrier provides
          genuine separation.
        </p>
      </>
    ),
  },
  {
    id: 'zone-2',
    heading: 'Zone 2: The Extended Area',
    content: (
      <>
        <p>
          Zone 2 extends a further 1.5 m beyond Zone 1, giving a total distance of 3.5 m from the
          pool edge. This zone provides a buffer between the high-restriction pool area and the
          normal installation rules.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket outlets are permitted</strong> but must be protected by a 30 mA RCD,
                SELV, or electrical separation. In practice, 30 mA RCD protection is the most common
                approach.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Equipment must be rated IPX4 minimum.</strong> For outdoor pools, the
                outdoor environment may require a higher IP rating (e.g., IP65 or IP66) based on the
                general installation requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switches, luminaires, and other equipment</strong> are permitted provided
                they meet the IP rating requirements and are protected appropriately.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Beyond Zone 2, the standard installation rules apply — but good practice is to ensure all
          circuits in the general pool area remain RCD-protected.
        </p>
      </>
    ),
  },
  {
    id: 'selv-requirements',
    heading: 'SELV Requirements for Swimming Pools',
    content: (
      <>
        <p>
          Separated Extra-Low Voltage (SELV) is the primary protective measure for swimming pool
          Zones 0 and 1. SELV limits the voltage to a maximum of 12 V AC or 30 V DC and provides
          electrical separation from all other circuits.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The safety source</strong> must be a safety isolating transformer complying
                with BS EN 61558-2-6. Standard transformers are not acceptable — the construction of
                a safety isolating transformer provides reinforced insulation between primary and
                secondary windings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The transformer must be located outside Zones 0 and 1</strong> — at least 2
                m from the pool edge. It can be in Zone 2 or outside the zones entirely.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SELV circuits must not be connected to earth</strong> — this is the
                distinction between SELV and PELV (Protective Extra-Low Voltage). In swimming pool
                applications, only SELV is permitted in Zones 0 and 1 because PELV is connected to
                earth and could conduct fault current through the pool water.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The SELV circuit wiring</strong> must be physically separated from all other
                circuits. This means separate conduit, trunking, or cable routes — not bundled with
                mains cables.
              </span>
            </li>
          </ul>
        </div>
        <p>
          At 12 V AC, even with the body fully immersed in water and skin resistance effectively
          zero, the current flowing through the body cannot reach levels that would cause
          ventricular fibrillation. This is the fundamental safety principle behind the SELV
          requirement.
        </p>
      </>
    ),
  },
  {
    id: 'bonding',
    heading: 'Supplementary Equipotential Bonding',
    content: (
      <>
        <p>
          Supplementary equipotential bonding is mandatory for all swimming pool installations under
          Regulation 702.415.2. This is one of the few locations in BS 7671 where supplementary
          bonding cannot be omitted regardless of the main protective bonding arrangement.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>All extraneous conductive parts within Zones 0, 1, and 2</strong> must be
                bonded. This includes: metallic pool shell or liner, pool ladders and handrails,
                diving boards, starting blocks, water inlet and outlet pipes, heating pipes, drain
                pipes, reinforcing steel in the pool surround (if accessible or likely to become
                accessible), metallic window frames, and door frames.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>The bonding conductor</strong> must be at least 4 mm squared copper and must
                be connected to the protective conductor of every circuit serving Zones 0, 1, and 2.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bonding connections</strong> must be accessible for inspection and testing.
                Connections buried in concrete are not acceptable unless they use a proven
                corrosion-resistant method and are documented.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The purpose of supplementary bonding in a pool environment is to ensure that all metallic
          parts in and around the pool are at the same electrical potential. If a fault occurs, no
          potential difference can exist between any two surfaces that a person might touch
          simultaneously — eliminating the possibility of current flow through the body.
        </p>
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Ratings Per Zone: Summary Table',
    content: (
      <>
        <p>
          The IP (Ingress Protection) rating defines the level of protection an enclosure provides
          against the intrusion of water. For swimming pool installations, the required IP ratings
          increase as you get closer to the water.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 overflow-x-auto">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 pr-4 font-bold">Zone</th>
                <th className="text-left py-3 pr-4 font-bold">Minimum IP Rating</th>
                <th className="text-left py-3 font-bold">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="py-3 pr-4 font-semibold">Zone 0</td>
                <td className="py-3 pr-4">IPX8</td>
                <td className="py-3 text-white">
                  Continuous immersion. Equipment must be designed for permanent underwater use.
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 pr-4 font-semibold">Zone 1</td>
                <td className="py-3 pr-4">IPX4 (IPX5 with jets)</td>
                <td className="py-3 text-white">
                  Protection against splashing. IPX5 required where water jets are used for
                  cleaning.
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold">Zone 2</td>
                <td className="py-3 pr-4">IPX4</td>
                <td className="py-3 text-white">
                  Protection against splashing. Higher rating may be needed for outdoor pools.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The second digit of the IP rating indicates water protection: X4 = splashing, X5 = water
          jets, X7 = temporary immersion, X8 = continuous immersion. The "X" in the first position
          means the solid object protection is not specified — in practice, most pool equipment will
          have a full IP rating (e.g., IP68 for underwater lights).
        </p>
        <p>
          During an{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR inspection</SEOInternalLink> of a
          swimming pool installation, the electrician must verify that all equipment IP ratings are
          appropriate for their zone and that the ratings have not been compromised by damage,
          corrosion, or degraded seals.
        </p>
      </>
    ),
  },
  {
    id: 'hot-tubs',
    heading: 'Hot Tubs and Paddling Pools',
    content: (
      <>
        <p>
          Hot tubs have become increasingly popular in domestic gardens, and every electrician needs
          to know how Section 702 applies to them. A hot tub is classified the same as a swimming
          pool under BS 7671 — the same zone system applies.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplet className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Outdoor hot tubs must not use PME earthing.</strong> If the property supply
                is TN-C-S (PME), the hot tub circuit must be provided with a separate TT earthing
                system — its own earth electrode and a 30 mA RCD. This is because a broken PEN
                conductor could make the hot tub shell live relative to true earth, and a person
                standing on wet ground while touching the tub could receive a fatal shock.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplet className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>A local isolator must be provided</strong> within sight of the hot tub but
                outside Zone 1 (more than 2 m from the edge). An IP-rated rotary isolator on a post
                is the standard solution.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplet className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable routing</strong> — the supply cable from the consumer unit to the hot
                tub typically uses SWA cable buried at a minimum depth of 0.5 m with cable route
                markers. The cable must be sized for the full load of the hot tub heater and pump.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Inflatable paddling pools with no electrical equipment do not require a Section 702
          assessment. However, if a permanent or semi-permanent paddling pool has electrically
          powered pumps, heaters, or lighting, Section 702 applies in full.
        </p>
        <SEOAppBridge
          title="Look up hot tub electrical requirements"
          description="Not sure about earthing, zone dimensions, or IP ratings for a hot tub installation? Ask Elec-Mate AI and get the exact regulation reference with practical guidance — on site, in seconds."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'inspection',
    heading: 'Inspection and Testing of Swimming Pool Installations',
    content: (
      <>
        <p>
          Swimming pool installations require careful periodic inspection and testing. The
          recommended EICR interval for a swimming pool is typically 1 year for commercial pools and
          3 years for domestic pools, though the inspector should assess based on the condition and
          usage.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Visual inspection</strong> — check all equipment IP ratings are maintained,
                no corrosion or damage to enclosures, bonding connections are intact and accessible,
                warning labels are in place, and cable routes are undamaged.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuity of supplementary bonding</strong> — test the resistance of the
                supplementary bonding between all extraneous conductive parts. The maximum
                resistance depends on the touch voltage limit and the characteristics of the
                protective device, but typically should not exceed 0.05 ohms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD testing</strong> — verify that all RCDs protecting pool circuits operate
                within the required time at their rated residual current. Test at both 1x and 5x
                rated current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance</strong> — test the insulation resistance of all
                circuits. Pay particular attention to cables in damp environments, as moisture
                ingress can degrade insulation over time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth electrode resistance</strong> — if a TT system is used (as required
                for outdoor pools with PME supply), test the earth electrode resistance to ensure
                the RCD will operate within the required disconnection time.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The EICR for a swimming pool installation should specifically note whether supplementary
          bonding is present and satisfactory, whether SELV sources are correctly installed, and
          whether equipment IP ratings are maintained. Any degradation should be recorded as a C2 or
          C3{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            observation code
          </SEOInternalLink>{' '}
          depending on the severity.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Swimming Pool Work Made Easier',
    content: (
      <>
        <p>
          Swimming pool electrical work demands precise knowledge of Section 702 — the zone
          dimensions, IP ratings, SELV requirements, bonding obligations, and earthing restrictions.
          Getting any of these wrong can create a life-threatening installation.
        </p>
        <p>
          Whether you are installing a new pool circuit, connecting a hot tub, or carrying out a
          periodic inspection, Elec-Mate gives you instant access to the regulations you need.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Regulations Lookup</h4>
                <p className="text-white text-sm leading-relaxed">
                  "What IP rating is needed in swimming pool Zone 1?" — ask any Section 702 question
                  and get the exact regulation number, requirement, and practical guidance. Works
                  offline once loaded.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EICR Certificate App</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete EICR inspections on swimming pool installations with all the
                  special-location-specific fields. Record zone assessments, bonding test results,
                  and IP rating checks — all from your phone.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Size the SWA cable for a hot tub or pool pump circuit with the Elec-Mate{' '}
                  <SEOInternalLink href="/guides/cable-sizing-calculator-bs-7671">
                    cable sizing calculator
                  </SEOInternalLink>
                  . Enter the load, cable length, installation method, and get the correct cable
                  size with voltage drop and thermal checks.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete swimming pool inspections on your phone"
          description="EICR certificates, AI regulations lookup, and professional calculators — all built for UK electricians. Handle Section 702 installations with confidence. 7-day free trial."
          icon={Droplet}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SwimmingPoolElectricalPage() {
  return (
    <GuideTemplate
      title="Swimming Pool Electrical Regulations | BS 7671 Section 702"
      description="Complete guide to swimming pool electrical regulations under BS 7671 Section 702. Zone 0, 1, 2 requirements, IP ratings, SELV, supplementary bonding, hot tub wiring, and inspection procedures for UK electricians."
      datePublished="2025-04-20"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Regulations Guide"
      badgeIcon={Droplet}
      heroTitle={
        <>
          Swimming Pool Electrical Regulations:{' '}
          <span className="text-yellow-400">BS 7671 Section 702 Explained</span>
        </>
      }
      heroSubtitle="Swimming pools are one of the highest-risk electrical environments. Section 702 of BS 7671 defines zones, IP ratings, SELV requirements, and mandatory supplementary bonding. This guide covers every requirement — including hot tubs, paddling pools, and outdoor installations."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Swimming Pool Electrical Regulations"
      relatedPages={relatedPages}
      ctaHeading="Look Up Pool Regulations Instantly"
      ctaSubheading="Elec-Mate AI regulations lookup covers every Section 702 requirement — zones, IP ratings, SELV, bonding, and earthing. Ask a question, get the regulation. 7-day free trial."
    />
  );
}
