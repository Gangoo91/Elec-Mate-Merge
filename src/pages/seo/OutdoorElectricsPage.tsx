import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  TreePine,
  ShieldCheck,
  Zap,
  Calculator,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Cable,
  Activity,
  Brain,
} from 'lucide-react';

export default function OutdoorElectricsPage() {
  return (
    <GuideTemplate
      title="Outdoor Electrical Installations UK | Garden & External Wiring"
      description="Complete UK guide to outdoor electrical installations. BS 7671 Section 714, IP ratings (IP44/IP65), RCD protection, SWA and Hi-Tuf cable, burial depths, garden lighting, outdoor sockets, hot tubs, swimming pools, Part P notification, and EV charger outdoor considerations."
      datePublished="2025-06-01"
      dateModified="2026-02-14"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        {
          label: 'Outdoor Electrical Installations',
          href: '/guides/outdoor-electrical-installations',
        },
      ]}
      tocItems={[
        { id: 'overview', label: 'Overview' },
        { id: 'bs7671-section-714', label: 'BS 7671 Section 714' },
        { id: 'ip-ratings', label: 'IP Ratings for Outdoor Use' },
        { id: 'rcd-protection', label: 'RCD Protection Requirements' },
        { id: 'cable-types', label: 'Cable Types — SWA & Hi-Tuf' },
        { id: 'burial-depths', label: 'Cable Burial Depths' },
        { id: 'garden-lighting', label: 'Garden Lighting' },
        { id: 'outdoor-sockets', label: 'Outdoor Sockets' },
        { id: 'hot-tubs', label: 'Hot Tubs & Swimming Pools' },
        { id: 'ev-outdoor', label: 'EV Chargers Outdoors' },
        { id: 'part-p', label: 'Part P Notification' },
        { id: 'how-to', label: 'Step-by-Step Installation' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="Installation Guide"
      badgeIcon={TreePine}
      heroTitle={
        <>
          Outdoor Electrical Installations UK
          <br />
          <span className="text-yellow-400">Garden Wiring, IP Ratings & Cable Selection</span>
        </>
      }
      heroSubtitle="Outdoor electrical work is increasingly common — garden lighting, outdoor sockets, hot tubs, outbuilding supplies, and EV chargers. This guide covers BS 7671 Section 714, IP ratings, RCD protection, SWA cable installation, burial depths, and Part P requirements for every type of outdoor electrical installation."
      readingTime={16}
      keyTakeaways={[
        'All outdoor electrical circuits must be protected by a 30mA RCD — there are no exceptions. This applies to garden lighting, outdoor sockets, outbuilding supplies, hot tub circuits, and any other outdoor electrical equipment.',
        'Outdoor equipment should be rated at least IP44 (protected against solid objects over 1mm and splashing water). IP65 (dust-tight and protected against water jets) is recommended for exposed locations and ground-level installations.',
        'Steel Wire Armoured (SWA) cable is the standard for underground outdoor circuits. It must be buried at a minimum depth of 500mm (600mm under driveways and areas subject to vehicle traffic) with cable covers and route marker tape.',
        'Hot tubs and swimming pools are covered by BS 7671 Sections 702 (swimming pools) and 714 (outdoor installations), with specific zone requirements, IP ratings, and supplementary bonding similar to but more stringent than bathroom regulations.',
        'Most outdoor electrical work is notifiable under Part P of the Building Regulations — including new outdoor circuits, outdoor socket installations, and any wiring to outbuildings, hot tubs, or EV chargers.',
      ]}
      sections={[
        {
          id: 'overview',
          heading: 'Outdoor Electrical Installations — Overview',
          content: (
            <>
              <p>
                Outdoor electrical work presents unique challenges compared to internal
                installations. Equipment is exposed to rain, moisture, temperature extremes, UV
                radiation, physical damage, and in some cases, corrosive soil conditions. The
                combination of electricity and wet outdoor environments creates significant safety
                risks that BS 7671 addresses through specific requirements for outdoor
                installations.
              </p>
              <p>
                The range of outdoor electrical work has expanded significantly in recent years.
                Traditional garden lighting and outdoor sockets have been joined by EV chargers, hot
                tubs, garden rooms and home offices in outbuildings, outdoor kitchens, security
                systems, and decorative landscape lighting. Each has its own requirements and
                considerations.
              </p>
              <p>
                For electricians, outdoor work is a growing revenue stream. Homeowners increasingly
                want to extend their living space outdoors, and every outdoor electrical
                installation requires professional design, installation, testing, and certification.
                Understanding the specific regulations for outdoor installations — particularly
                cable selection, IP ratings, and the Part P notification requirements — is
                essential.
              </p>
            </>
          ),
        },
        {
          id: 'bs7671-section-714',
          heading: 'BS 7671 Part 7 Section 714 — Outdoor Installations',
          content: (
            <>
              <p>
                BS 7671 Section 714 covers "Outdoor Lighting Installations" but its requirements
                apply broadly to all outdoor electrical installations. The section supplements the
                general requirements of BS 7671 with specific provisions for equipment and cabling
                exposed to outdoor conditions.
              </p>
              <p>Key requirements of Section 714 include:</p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Protection against electric shock (714.411)
                      </strong>{' '}
                      — Automatic disconnection of supply with 30mA RCD protection is required for
                      all outdoor circuits. The RCD provides protection against electric shock in
                      conditions where contact resistance is reduced by wet skin, damp ground, and
                      outdoor footwear.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">External influences (714.512)</strong> —
                      Equipment and cables must be suitable for the external influences they will be
                      exposed to — water (AD4 minimum for rain), temperature (AA range for the
                      location), UV radiation, wind, impact, and corrosion.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Cable selection (714.521)</strong> —
                      Cables for outdoor use must be suitable for the environmental conditions.
                      Underground cables must have mechanical protection (SWA or equivalent) and be
                      buried at an appropriate depth. Above-ground cables must be UV-resistant and
                      protected from physical damage.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Isolation and switching (714.537)</strong>{' '}
                      — Outdoor circuits must have a means of isolation accessible from inside the
                      building. This allows the outdoor circuit to be disconnected without going
                      outside — important for emergency situations.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                In addition to Section 714, other Part 7 sections may apply depending on the
                specific installation: Section 702 for swimming pools and paddling pools, Section
                708 for caravans and caravan parks, and Section 722 for{' '}
                <SEOInternalLink href="/guides/ev-charger-installation">
                  EV charging equipment
                </SEOInternalLink>
                .
              </p>
            </>
          ),
        },
        {
          id: 'ip-ratings',
          heading: 'IP Ratings for Outdoor Equipment',
          content: (
            <>
              <p>
                The Ingress Protection (IP) rating determines how well electrical equipment is
                protected against the ingress of solid particles and water. For outdoor
                installations, the water protection rating (the second digit) is critical.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">
                  IP Ratings for Outdoor Installations
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">IP44</h4>
                      <p className="text-white text-sm">
                        Protected against objects over 1mm and splashing water
                      </p>
                    </div>
                    <span className="font-bold text-yellow-400 text-sm">Minimum outdoor</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">IP55</h4>
                      <p className="text-white text-sm">
                        Dust-protected and protected against water jets
                      </p>
                    </div>
                    <span className="font-bold text-yellow-400 text-sm">
                      Good for exposed locations
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                    <div>
                      <h4 className="font-bold text-white">IP65</h4>
                      <p className="text-white text-sm">
                        Dust-tight and protected against water jets
                      </p>
                    </div>
                    <span className="font-bold text-yellow-400 text-sm">Recommended outdoor</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">IP66</h4>
                      <p className="text-white text-sm">
                        Dust-tight and protected against powerful water jets
                      </p>
                    </div>
                    <span className="font-bold text-yellow-400 text-sm">Heavy-duty outdoor</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">IP67/IP68</h4>
                      <p className="text-white text-sm">
                        Dust-tight and protected against immersion
                      </p>
                    </div>
                    <span className="font-bold text-yellow-400 text-sm">
                      In-ground / submersible
                    </span>
                  </div>
                </div>
              </div>
              <p>
                For most outdoor installations, IP65 is the recommended minimum. IP44 is acceptable
                for equipment installed under a covered porch, carport, or overhang where direct
                rain exposure is limited. For equipment at ground level, in locations exposed to
                heavy rain, or subject to washing down, IP66 is preferred. For in-ground
                installations (such as ground-level uplighters), IP67 or IP68 is required.
              </p>
              <p>
                When selecting outdoor equipment, always check that the IP rating is for the
                complete installed unit — not just the enclosure. Cable entry points, gaskets, and
                covers must all maintain the rated IP level when the unit is correctly installed.
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
                All outdoor electrical circuits must be protected by a 30mA RCD. This requirement
                comes from multiple regulations:
              </p>
              <ul className="space-y-2 my-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Regulation 411.3.3</strong> — Requires 30mA RCD
                    protection for all socket outlets rated up to 32A and all circuits supplying
                    mobile equipment intended for outdoor use.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Section 714</strong> — Requires additional
                    protection by RCD (not exceeding 30mA residual operating current) for all
                    outdoor lighting circuits.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Section 722</strong> — Requires 30mA RCD
                    protection (Type A minimum with DC detection, or Type B) for EV charging
                    circuits.
                  </span>
                </li>
              </ul>
              <p>
                The RCD should be located inside the building, in the consumer unit or a
                distribution board, so that it is accessible and protected from the weather.
                Individual RCBOs provide the best discrimination — a fault on the outdoor circuit
                trips only that circuit, not other circuits in the property. Where a group RCD is
                used, the outdoor circuit should not share the RCD with critical indoor circuits
                (such as the freezer or alarm system) to avoid nuisance tripping causing
                inconvenience indoors.
              </p>
              <p>
                For outdoor circuits in wet conditions, consider using a time-delayed RCD (Type S)
                upstream of the 30mA RCD to provide discrimination. This prevents a fault on the
                outdoor circuit from tripping the upstream RCD and disconnecting other circuits.
              </p>
            </>
          ),
        },
        {
          id: 'cable-types',
          heading: 'Cable Types for Outdoor Use — SWA and Hi-Tuf',
          content: (
            <>
              <p>
                The cable type for outdoor installations depends on the installation method —
                underground, surface-mounted on external walls, or overhead. The two most common
                cable types for domestic outdoor circuits are Steel Wire Armoured (SWA) cable and
                Hi-Tuf (PVC-sheathed armoured) cable.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">
                    SWA Cable (Steel Wire Armoured)
                  </h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    SWA is the standard cable for underground outdoor circuits. It consists of
                    copper or aluminium conductors, XLPE or PVC insulation, a layer of steel wire
                    armour providing mechanical protection, and an outer PVC sheath. The steel
                    armour also serves as the circuit protective conductor (CPC) in many
                    installations — though a separate CPC is recommended for domestic circuits.
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    <strong className="text-white">Uses:</strong> Underground runs to outbuildings,
                    garden lighting, outdoor sockets, hot tubs, EV chargers. Available in 2-core,
                    3-core, 4-core, and 5-core configurations. Common sizes for domestic work are
                    2.5mm², 4mm², 6mm², and 10mm².
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">Hi-Tuf Cable</h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    Hi-Tuf (or PVC/SWA/PVC) is a lighter-duty armoured cable suitable for
                    surface-mounted outdoor installations and some buried applications. It has a
                    similar construction to SWA but with a thinner PVC outer sheath. It is easier to
                    handle and terminate than full SWA cable.
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    <strong className="text-white">Uses:</strong> Surface-mounted runs on external
                    walls, short underground runs to garden features. Not suitable for long
                    underground runs or locations subject to significant mechanical damage. Properly
                    rated for outdoor UV exposure.
                  </p>
                </div>
              </div>
              <p>
                Standard PVC twin-and-earth cable (6242Y) is not suitable for outdoor use — it is
                not UV-resistant, has no mechanical protection, and is not rated for direct burial.
                If twin-and-earth must be run externally (for example, a short run from a
                wall-mounted switch to an external light), it must be enclosed in UV-resistant
                conduit or trunking.
              </p>
              <SEOAppBridge
                title="Cable Sizing Calculator for Outdoor Circuits"
                description="Elec-Mate's cable sizing calculator handles outdoor SWA circuits with all relevant derating factors — ground temperature, depth of burial, grouping with other cables, and soil thermal resistivity. Enter the load and cable route details for the correct SWA cable size."
                icon={Calculator}
              />
            </>
          ),
        },
        {
          id: 'burial-depths',
          heading: 'Cable Burial Depths',
          content: (
            <>
              <p>
                The burial depth for underground cables is specified to protect them from accidental
                damage during future excavation work (gardening, landscaping, utility trenching). BS
                7671 and the IET Guidance Note 1 provide the following guidance:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Minimum Cable Burial Depths</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                    <div>
                      <h4 className="font-bold text-white">Garden / landscaped areas</h4>
                      <p className="text-white text-sm">SWA cable in standard garden soil</p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">500mm min</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">Under driveways / paths</h4>
                      <p className="text-white text-sm">Areas subject to vehicle traffic</p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">600mm min</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">Under agricultural land</h4>
                      <p className="text-white text-sm">Areas subject to ploughing</p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">1000mm min</span>
                  </div>
                </div>
              </div>
              <p>
                In addition to the burial depth, the following protection measures are required:
              </p>
              <ul className="space-y-2 my-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Cable covers (tiles)</strong> — Rigid cable
                    covers (typically red or yellow plastic) placed directly over the cable provide
                    a visual and physical warning to anyone excavating in the area.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Route marker tape</strong> — Warning tape
                    (typically yellow with "CAUTION — ELECTRIC CABLE BELOW" text) buried
                    approximately 150-250mm above the cable. Anyone digging will encounter the tape
                    before reaching the cable.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Sand surround</strong> — A bed of fine sand
                    (approximately 50mm) below and above the cable provides a uniform thermal
                    environment and additional mechanical protection. This is good practice for all
                    buried cables.
                  </span>
                </li>
              </ul>
              <p>
                The cable route should be documented and ideally recorded on a plan of the property.
                This helps future contractors and homeowners avoid the cable during excavation work.
              </p>
            </>
          ),
        },
        {
          id: 'garden-lighting',
          heading: 'Garden Lighting',
          content: (
            <>
              <p>
                Garden lighting installations range from simple mains-powered wall lights and
                bollard lights to complex landscape lighting schemes with multiple circuits and
                control systems. The electrical requirements depend on whether the system is mains
                voltage (230V) or extra-low voltage (typically 12V or 24V).
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">
                    Mains Voltage (230V) Garden Lighting
                  </h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    Mains-voltage garden lighting uses standard 230V luminaires rated for outdoor
                    use (minimum IP44, recommended IP65). The circuit requires 30mA RCD protection,
                    and the wiring must use outdoor-rated cable (SWA for underground runs).
                    Luminaires must be UV-resistant, corrosion-resistant, and suitable for the
                    installation environment.
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    <strong className="text-white">Advantages:</strong> Brighter output, longer
                    cable runs without voltage drop issues, wider range of luminaire styles.{' '}
                    <strong className="text-white">Disadvantages:</strong> Higher safety risk,
                    requires professional installation, more expensive cabling (SWA).
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">
                    Extra-Low Voltage (12V/24V) Garden Lighting
                  </h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    ELV garden lighting uses a mains-powered transformer (located indoors or in a
                    weatherproof enclosure outdoors) to supply 12V or 24V to the garden luminaires.
                    The low voltage significantly reduces the electric shock risk, making ELV
                    lighting suitable for areas where people may come into contact with fittings.
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    <strong className="text-white">Advantages:</strong> Safer (reduced shock risk),
                    easier cable installation (low-voltage cable does not need SWA), suitable for
                    water features and in-ground use.{' '}
                    <strong className="text-white">Disadvantages:</strong> Lower output per fitting,
                    voltage drop on long cable runs limits the number of fittings per transformer,
                    transformer adds cost and requires an indoor mains supply.
                  </p>
                </div>
              </div>
              <p>
                Regardless of the voltage, the mains supply to the transformer or the mains-voltage
                lighting circuit requires 30mA RCD protection and appropriate cable sizing. For SWA
                cable runs to garden lighting positions, the{' '}
                <SEOInternalLink href="/calculators/cable-sizing">
                  cable sizing calculator
                </SEOInternalLink>{' '}
                should be used to verify that the cable size is adequate for the load and the cable
                run length.
              </p>
            </>
          ),
        },
        {
          id: 'outdoor-sockets',
          heading: 'Outdoor Socket Outlets',
          content: (
            <>
              <p>
                Outdoor socket outlets are one of the most requested domestic electrical additions.
                They provide a convenient power supply for garden tools, outdoor entertainment
                equipment, Christmas lighting, and general outdoor use. The installation
                requirements are straightforward but must be followed carefully.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Outdoor Socket Requirements</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">IP rating</strong> — Minimum IP44 for
                      wall-mounted sockets under a porch or overhang. IP66 recommended for fully
                      exposed locations. The IP rating must be maintained with the socket cover
                      closed (between uses) and ideally when a plug is inserted.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">RCD protection</strong> — 30mA RCD
                      protection is mandatory for all outdoor socket outlets (BS 7671 Regulation
                      411.3.3). An individual RCBO in the consumer unit is the preferred approach.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Dedicated circuit</strong> — Best practice
                      is to install outdoor sockets on a dedicated circuit from the consumer unit,
                      separate from indoor socket circuits. This prevents an outdoor RCD trip from
                      affecting indoor sockets.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Height and position</strong> — Mount at a
                      convenient height (typically 450mm to 1200mm above ground level) in a location
                      protected from direct rain where possible. Ensure the cable entry is from
                      below or from the back to prevent water tracking into the socket.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                A single outdoor socket can be added from an existing circuit (as a spur) or
                installed on a new dedicated circuit. If adding a spur, ensure the existing circuit
                has adequate spare capacity and that the spur is taken from a suitable point. A new
                dedicated circuit provides better protection and avoids overloading existing
                circuits.
              </p>
            </>
          ),
        },
        {
          id: 'hot-tubs',
          heading: 'Hot Tubs and Swimming Pools',
          content: (
            <>
              <p>
                Hot tubs and swimming pools present some of the highest-risk outdoor electrical
                installations due to the combination of electricity and full-body water immersion.
                BS 7671 Section 702 covers swimming pools and similar installations, while hot tubs
                are covered under a combination of Section 702 and Section 714.
              </p>
              <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5 my-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-2">
                      Hot Tub Electrical Safety — Critical Points
                    </h4>
                    <p className="text-white text-sm leading-relaxed">
                      A hot tub typically draws 13A to 32A depending on the model (2.2 kW to 7 kW).
                      The circuit must be on a dedicated supply from the consumer unit with 30mA RCD
                      protection. The cable must be SWA for the outdoor run, correctly buried with
                      cable covers. An isolator switch must be provided within sight of the hot tub
                      but not within reach of a person using the tub — typically 2-3 metres from the
                      tub. Supplementary bonding of all extraneous conductive parts within 2 metres
                      of the tub is required.
                    </p>
                  </div>
                </div>
              </div>
              <p>
                Swimming pools have zone requirements similar to{' '}
                <SEOInternalLink href="/guides/bathroom-electrical-regulations">
                  bathroom installations
                </SEOInternalLink>{' '}
                but more stringent. Zone 0 (the pool basin), Zone 1 (up to 2m horizontally from the
                pool edge and up to 2.5m above the floor), and Zone 2 (1.5m beyond Zone 1) each have
                specific requirements for IP ratings and permitted equipment. Only SELV at 12V is
                permitted in Zones 0 and 1.
              </p>
              <p>
                Both hot tub and swimming pool installations are notifiable under Part P. A full
                Electrical Installation Certificate (EIC) is required — not a Minor Works
                Certificate — because the installation typically involves a new circuit.
              </p>
              <SEOAppBridge
                title="EIC and Minor Works Certificates for Outdoor Installations"
                description="Elec-Mate's Electrical Installation Certificate and Minor Works Certificate forms cover all outdoor installation requirements — IP ratings, RCD details, SWA cable specifications, and earthing arrangements. Complete everything on site and export a professional PDF."
                icon={FileText}
              />
            </>
          ),
        },
        {
          id: 'ev-outdoor',
          heading: 'EV Charger Outdoor Considerations',
          content: (
            <>
              <p>
                EV chargers are increasingly common outdoor installations. While the general
                requirements are covered in the dedicated{' '}
                <SEOInternalLink href="/guides/ev-charger-installation">
                  EV charger installation guide
                </SEOInternalLink>
                , there are specific outdoor considerations:
              </p>
              <ul className="space-y-2 my-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">IP rating</strong> — Most EV charger wallboxes
                    are rated IP54 or IP65, which is adequate for wall-mounted outdoor installation.
                    Check the manufacturer specification for the specific model.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Cable type</strong> — SWA cable is required for
                    any underground section of the cable route (for example, from the house to a
                    detached garage or a freestanding mounting post). The cable must be buried at
                    the correct depth with cable covers and route marker tape.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Earth rod</strong> — On PME supplies, a separate
                    TT earth electrode is required for the EV circuit (BS 7671 Regulation
                    722.411.4.1). The earth rod is typically installed in the ground near the
                    charger location.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Mounting height</strong> — The charger should be
                    mounted at a height that is accessible for plugging in the vehicle but high
                    enough to avoid damage from the vehicle itself. Manufacturer guidance typically
                    specifies 1.0-1.5m from ground to centre of the unit.
                  </span>
                </li>
              </ul>
              <p>
                For EV chargers mounted on freestanding posts or on detached garages, the SWA cable
                run and earth rod installation represent significant additional work compared to a
                simple wall-mounted installation on the house. The{' '}
                <SEOInternalLink href="/calculators/voltage-drop">
                  voltage drop calculation
                </SEOInternalLink>{' '}
                is critical for longer cable runs — a 32A EV charger on a long SWA cable run can
                easily exceed the 5% voltage drop limit.
              </p>
            </>
          ),
        },
        {
          id: 'part-p',
          heading: 'Part P Notification Requirements',
          content: (
            <>
              <p>
                Most outdoor electrical work is notifiable under{' '}
                <SEOInternalLink href="/guides/part-p-building-regulations">
                  Part P of the Building Regulations
                </SEOInternalLink>
                . The following outdoor installations are notifiable:
              </p>
              <ul className="space-y-2 my-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">New outdoor circuits</strong> — Any new circuit
                    from the consumer unit to outdoor equipment (garden lighting, outdoor sockets,
                    outbuilding supplies, hot tub circuits, EV chargers).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Consumer unit modifications</strong> — Adding a
                    new way to the consumer unit for an outdoor circuit, or replacing the consumer
                    unit to accommodate the new circuit.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Special locations</strong> — Swimming pool and
                    hot tub installations are considered special locations under BS 7671 and are
                    always notifiable.
                  </span>
                </li>
              </ul>
              <p>
                The work must be either self-certified by an electrician registered with a Competent
                Person Scheme or notified to the local authority building control department. A full
                EIC is required for new circuits; a Minor Works Certificate may be used for simpler
                additions (such as adding an outdoor socket as a spur from an existing circuit,
                where no new circuit is being created).
              </p>
              <SEOAppBridge
                title="AI Installation Specialist for Outdoor Wiring"
                description="Elec-Mate's AI Installation Specialist provides guidance on outdoor wiring — cable selection, burial depths, IP ratings, RCD requirements, and earthing arrangements. Ask any question about outdoor electrical installations and get instant, regulation-referenced answers."
                icon={Brain}
              />
            </>
          ),
        },
      ]}
      howToHeading="How to Install an Outdoor Electrical Circuit — Step-by-Step"
      howToDescription="A step-by-step process for installing a typical outdoor electrical circuit (garden socket, outbuilding supply, or garden lighting) using SWA cable."
      howToSteps={[
        {
          name: 'Survey and design the circuit',
          text: 'Assess the outdoor installation — equipment to be supplied, cable route from the consumer unit to the outdoor position, burial depth requirements, and any obstacles (driveways, paths, tree roots, existing services). Design the circuit: calculate the load, select the cable size (accounting for derating factors for buried SWA), verify voltage drop, and select the protective device. Check Part P notification requirements.',
        },
        {
          name: 'Prepare the consumer unit',
          text: 'Install the appropriate protective device in the consumer unit — typically a 30mA RCBO sized for the outdoor circuit. If the consumer unit does not have a spare way, consider whether a small outdoor distribution board or a consumer unit upgrade is required. Ensure adequate supply capacity for the additional outdoor load.',
        },
        {
          name: 'Excavate the cable trench',
          text: 'Dig the cable trench to the required depth — minimum 500mm in garden areas, 600mm under driveways and paths. Check for existing underground services (gas, water, drainage, telecoms) before digging. Use a CAT scanner and plans where available. Lay a bed of fine sand (approximately 50mm) in the bottom of the trench.',
        },
        {
          name: 'Install the SWA cable',
          text: 'Lay the SWA cable in the trench on the sand bed. Do not pull the cable tight around corners — use gentle curves with a minimum bend radius appropriate for the cable size. Place cable covers (tiles) directly over the cable. Backfill with fine sand to approximately 150mm above the cable, then lay route marker tape. Complete the backfill with excavated soil.',
        },
        {
          name: 'Terminate and connect',
          text: 'Terminate the SWA cable at both ends using appropriate SWA glands. At the consumer unit end, strip back the outer sheath, armour, and inner sheath, fit the SWA gland, and connect to the protective device. At the outdoor end, fit the SWA gland to the weatherproof enclosure, socket, or junction box. Connect the equipment and verify correct terminations.',
        },
        {
          name: 'Test, certify, and backfill',
          text: 'Carry out the full testing sequence before backfilling: continuity of protective conductors (including the SWA armour if used as CPC), insulation resistance, polarity, earth fault loop impedance, prospective fault current, and RCD operation. Complete the Electrical Installation Certificate. Backfill the trench and reinstate the surface. Issue the certificate and Part P notification.',
        },
      ]}
      faqs={[
        {
          question: 'Can I use standard twin-and-earth cable for outdoor wiring?',
          answer:
            'Standard PVC twin-and-earth cable (6242Y) is not suitable for outdoor use without additional protection. It is not UV-resistant (the outer sheath will degrade and crack when exposed to sunlight), it has no mechanical protection (the outer sheath is thin and easily damaged), and it is not rated for direct burial in the ground. If you must run twin-and-earth externally — for example, a short run from a switch to a wall-mounted external light — it must be enclosed in UV-resistant conduit or trunking for the entire external section. For underground runs, SWA (Steel Wire Armoured) cable is the correct choice. SWA has a robust outer sheath, steel wire armour for mechanical protection, and is rated for direct burial with appropriate protection measures (cable covers and route marker tape).',
        },
        {
          question: 'What IP rating do I need for an outdoor socket?',
          answer:
            'The minimum IP rating for an outdoor socket outlet is IP44 (protected against objects over 1mm and splashing water from all directions). However, IP44 is only adequate for sockets installed in a sheltered position — under a porch, carport, or overhang where direct rain exposure is limited. For fully exposed positions, IP66 (dust-tight and protected against powerful water jets) is recommended. The IP rating must be maintained when the socket cover is closed between uses. Some outdoor sockets also maintain their IP rating with a plug inserted — look for "IP rated in use" or similar wording. For sockets at low level near the ground, a higher IP rating (IP55 or IP66) is advisable to protect against ground-level water splash and garden debris.',
        },
        {
          question: 'How deep should I bury SWA cable in a garden?',
          answer:
            'SWA cable should be buried at a minimum depth of 500mm (half a metre) in garden and landscaped areas. Under driveways, paths, and any area subject to vehicle traffic, the minimum depth increases to 600mm. Under agricultural land subject to ploughing, the minimum is 1000mm (1 metre). In addition to the correct burial depth, the cable should be laid on a bed of fine sand (approximately 50mm), covered with cable covers (rigid plastic protective tiles), and have route marker tape installed approximately 150-250mm above the cable. The trench should be backfilled with fine sand to above the cable covers before backfilling with excavated soil. These protection measures are not optional — they provide a physical and visual warning to anyone excavating in the area in the future.',
        },
        {
          question: 'Do I need Part P notification for outdoor electrical work?',
          answer:
            'Most outdoor electrical work is notifiable under Part P of the Building Regulations. Specifically, any new circuit from the consumer unit to outdoor equipment is notifiable — this includes garden lighting circuits, outdoor socket circuits, outbuilding supplies, hot tub circuits, and EV charger circuits. Adding a new way to the consumer unit is also notifiable. Work in special locations (swimming pools, hot tubs) is always notifiable. The exception is simple like-for-like replacement of existing outdoor equipment (such as replacing an outdoor light fitting) with no new wiring — this is generally not notifiable. If the work involves a new circuit or significant modification to an existing circuit, it must be either self-certified through a Competent Person Scheme or notified to local authority building control. A full Electrical Installation Certificate (EIC) is required for new circuits.',
        },
        {
          question: 'Can I supply an outbuilding from the house without SWA cable?',
          answer:
            'If the cable route is entirely above ground — for example, surface-mounted on a fence or wall, or run through an overhead catenary — you may be able to use other cable types with appropriate protection and UV resistance. However, for any section of the cable route that is underground (which is the case for the vast majority of outbuilding supplies), SWA cable is required. The cable must have mechanical protection and be suitable for direct burial. In practice, SWA is the standard and recommended cable type for all domestic outbuilding supplies. The alternative of using twin-and-earth in underground conduit is technically possible but more labour-intensive, more expensive, and more prone to water ingress problems than correctly installed SWA cable. The SWA cable must be sized for the load at the outbuilding, with voltage drop calculated for the full cable run length from the consumer unit.',
        },
        {
          question: 'What size SWA cable do I need for an outbuilding?',
          answer:
            "The SWA cable size for an outbuilding supply depends on the total load at the outbuilding and the cable run length. For a simple garden shed with lighting and a socket (10A load, 20-30m cable run), 2.5mm² 3-core SWA is typically adequate. For a garden office or workshop with a small consumer unit, sockets, lighting, and heating (20-30A load, 30-50m cable run), 4mm² or 6mm² 3-core SWA is usually required. For larger outbuildings with high-power equipment (above 30A, longer cable runs), 10mm² or 16mm² may be needed. In every case, calculate the voltage drop for the specific cable length and load — voltage drop is often the limiting factor that determines the cable size, not current-carrying capacity. Elec-Mate's cable sizing calculator handles all the derating factors and voltage drop calculations for buried SWA cable automatically.",
        },
      ]}
      relatedPages={[
        {
          href: '/guides/ev-charger-installation',
          title: 'EV Charger Installation',
          description: 'Complete guide to outdoor EV charger installation.',
          icon: Zap,
          category: 'Guide',
        },
        {
          href: '/calculators/cable-sizing',
          title: 'Cable Sizing Calculator',
          description: 'Size SWA cables for outdoor circuits with correct derating.',
          icon: Calculator,
          category: 'Calculator',
        },
        {
          href: '/calculators/voltage-drop',
          title: 'Voltage Drop Calculator',
          description: 'Verify voltage drop on long outdoor SWA cable runs.',
          icon: Activity,
          category: 'Calculator',
        },
        {
          href: '/guides/earthing-arrangements',
          title: 'Earthing Arrangements',
          description: 'PME vs TT earthing — essential for outdoor installations.',
          icon: Cable,
          category: 'Guide',
        },
        {
          href: '/guides/bathroom-electrical-regulations',
          title: 'Bathroom Electrical Regulations',
          description: 'Similar zone and IP rating principles for wet environments.',
          icon: ShieldCheck,
          category: 'Regulations',
        },
        {
          href: '/guides/part-p-building-regulations',
          title: 'Part P Building Regulations',
          description: 'Notification requirements for outdoor electrical work.',
          icon: FileText,
          category: 'Regulations',
        },
      ]}
      ctaHeading="Install and Certify Outdoor Electrics With Confidence"
      ctaSubheading="Cable sizing calculator, voltage drop verification, EIC and Minor Works certificates, and AI Installation Specialist for outdoor wiring guidance — all in Elec-Mate. 7-day free trial, cancel anytime."
    />
  );
}
