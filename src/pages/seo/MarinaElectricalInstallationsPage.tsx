import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Anchor,
  Zap,
  ShieldCheck,
  Search,
  Calculator,
  GraduationCap,
  FileCheck2,
  Cable,
  AlertTriangle,
  Shield,
  PlugZap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Marina Installations', href: '/guides/marina-electrical-installations' },
];

const tocItems = [
  { id: 'overview', label: 'Marina Installations Overview' },
  { id: 'bs7671-section-709', label: 'BS 7671 Section 709 Requirements' },
  { id: 'earthing-arrangements', label: 'Earthing Arrangements for Marinas' },
  { id: 'shore-supply', label: 'Shore Supply and Distribution' },
  { id: 'ip-ratings', label: 'IP Ratings and Environmental Protection' },
  { id: 'rcd-requirements', label: 'RCD Requirements' },
  { id: 'cable-management', label: 'Cable Management and Routing' },
  { id: 'inspection-testing', label: 'Inspection and Testing' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Marina electrical installations are classified as special installations under BS 7671 Section 709, with more stringent requirements than standard domestic or commercial work.',
  'TT earthing is strongly recommended (and often mandatory) for marina installations because PME (TN-C-S) earthing poses unacceptable shock risk in water environments due to the broken PEN conductor danger.',
  'All socket outlets supplying boats must have individual 30mA RCD protection — not shared RCDs — to prevent a fault on one vessel from tripping supplies to multiple vessels.',
  'A minimum IP rating of IP44 is required for all equipment installed on the pontoon or jetty, increasing to IP56 for equipment exposed to wave splash.',
  'Elec-Mate helps electricians complete certificates for special installations, with AI assistance for the specific BS 7671 Section 709 requirements.',
];

const faqs = [
  {
    question: 'What section of BS 7671 covers marina installations?',
    answer:
      'Section 709 of BS 7671:2018+A3:2024 covers marinas and similar locations. It applies to circuits intended to supply pleasure craft or houseboats in marinas, boatyards, and similar locations. The section sets out additional requirements beyond the general rules in Parts 1-6, covering earthing, protective devices, cable management, socket outlets, and environmental protection. Section 709 works alongside the general requirements — it does not replace them. So a marina installation must comply with all the general requirements of BS 7671 plus the additional requirements in Section 709. The section also references BS EN 60309-2 for the type of socket outlets to be used (industrial blue CEE sockets, not domestic 13A sockets) and IEC 60364-7-709 (the international standard from which Section 709 is derived).',
  },
  {
    question: 'Why can you not use PME earthing at a marina?',
    answer:
      'PME (TN-C-S) earthing is not permitted for the supply to boats at a marina. Regulation 709.411.4 states that PME (TN-C-S) earthing must not be used as the means of earthing for the boat supply. The reason is safety: in a PME system, the combined neutral and earth (PEN) conductor carries both the neutral return current and provides the earth reference. If the PEN conductor develops a high-resistance fault or breaks (a "lost neutral" fault), all bonded metalwork — including the hull of a metal-hulled boat — becomes energised. In a water environment, this creates an extreme electric shock and drowning risk. A person in the water between an energised hull and an earthed pontoon could receive a fatal shock. TT earthing with an earth rod provides a local earth reference independent of the supply neutral, eliminating this risk. For the on-shore distribution (the pontoon supply pillars), TT earthing is strongly recommended. Some DNOs will provide a TN-S supply (with a separate earth conductor) for marina applications, which is also acceptable.',
  },
  {
    question: 'What type of socket outlets are required at a marina?',
    answer:
      'Socket outlets for supplying boats must comply with BS EN 60309-2 — these are the blue industrial CEE-type sockets, typically rated at 16A (for smaller craft) or 32A (for larger vessels). Standard 13A BS 1363 domestic sockets must not be used for boat supplies. The CEE sockets must be individually protected by a 30mA RCD (each socket having its own RCD — not shared), and each socket must have overcurrent protection matched to the cable and socket rating. The sockets must be mounted on supply pillars (also called feeder pillars or service pedestals) at a height that protects them from flooding and wave splash — typically at least 1 metre above the highest anticipated water level. Each socket must have a clearly marked isolator, and the supply pillar must be rated to at least IP44 (or IP56 if exposed to wave splash). Some marinas also provide 63A or 125A three-phase supplies for larger vessels — these follow the same principles but with appropriately rated equipment.',
  },
  {
    question: 'How often should a marina electrical installation be inspected?',
    answer:
      'BS 7671 does not specify a fixed inspection interval for marina installations, but Guidance Note 3 (GN3) recommends a maximum interval of 1 year for periodic inspection and testing of marina installations. This is much shorter than the typical 5-year interval for domestic installations, reflecting the harsher environmental conditions (salt water, moisture, UV, mechanical wear) and the higher risk level. In practice, most marina operators carry out annual inspections of the fixed installation (supply pillars, distribution boards, cabling) and visual inspections of the supply cables and connections more frequently — often monthly or even weekly during the busy season. The inspection should be carried out by a qualified electrician with specific knowledge of Section 709 requirements. The EICR form is used, with the observations referencing Section 709 regulations where applicable.',
  },
  {
    question: 'What cable types are suitable for marina installations?',
    answer:
      'Cables used in marina installations must be suitable for the environmental conditions — which typically include moisture, salt spray, UV radiation, and mechanical wear. SWA (Steel Wire Armoured) cable is commonly used for underground and fixed installations on pontoons because it provides mechanical protection and can be run outdoors. For flexible connections (supply cables from the pillar to the boat), H07RN-F (heavy-duty rubber-sheathed flexible cable) is the standard choice — it is UV resistant, oil resistant, and can withstand the constant flexing and movement. PVC-insulated cables (such as standard twin-and-earth or singles in conduit) are generally not suitable for exposed marine environments because PVC degrades under UV exposure and becomes brittle. All cable routes should be designed to prevent water tracking along the cable into equipment, and cable entries into enclosures should use IP-rated glands. Where cables cross joints in floating pontoons, they must have sufficient slack and flexibility to accommodate movement.',
  },
  {
    question: 'What is electric shock drowning and how is it prevented?',
    answer:
      'Electric shock drowning (ESD) occurs when a person in the water experiences electric shock from stray electrical current in the water. Even a small current (as low as 10mA) can cause muscle paralysis in a swimmer, preventing them from staying afloat, leading to drowning. ESD has been documented in marinas, swimming areas near boats, and in freshwater (freshwater has lower conductivity than salt water but still conducts enough to be dangerous). Prevention relies on several measures: using TT earthing (not PME) to prevent neutral current from energising the water, individual RCD protection (30mA) on every boat supply, regular inspection and testing of all marina electrical installations, shore power cables in good condition (no damaged insulation), galvanic isolators or isolation transformers on boats with metal hulls, and clear signage prohibiting swimming near boats connected to shore power. If someone in the water appears to be in distress near a boat or pontoon with electrical connections, do not enter the water — disconnect the electrical supply first, then use a throw line or flotation device.',
  },
  {
    question: 'Do I need special qualifications to work on marina installations?',
    answer:
      'There is no specific separate qualification for marina electrical work, but the electrician must be competent to work on Section 709 installations. In practice, this means: holding the standard domestic/commercial qualifications (18th Edition C&G 2382, inspection and testing C&G 2391), being registered with a competent person scheme (NICEIC, NAPIT, ELECSA), having specific knowledge of BS 7671 Section 709 requirements, and ideally having experience of marine electrical environments. Some training providers offer short courses specifically on marina and boat electrical installations. The IET also publishes guidance on special installations. Because marina work is a special installation, the electrician must understand the specific earthing requirements, the reasons for TT earthing, the IP rating requirements, and the individual RCD protection rules — getting these wrong can have fatal consequences.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/earthing-arrangements-explained',
    title: 'Earthing Arrangements Explained',
    description:
      'TN-S, TN-C-S, and TT earthing — understanding why TT is required for marina installations.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-keeps-tripping',
    title: 'RCD Keeps Tripping',
    description:
      'RCD protection is critical in marinas — understand why RCDs trip and how to diagnose faults.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/earthing-fault-diagnosis',
    title: 'Earthing Fault Diagnosis',
    description:
      'How to find earth faults using insulation resistance testing and the half-split method.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete guide to the 18th Edition IET Wiring Regulations including special installations.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates with AI board scanning — including special installation sections.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description: 'Study for C&G 2391 with structured training covering special installations.',
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
    heading: 'Marina Electrical Installations: Why They Are Different',
    content: (
      <>
        <p>
          Marina electrical installations present a unique combination of hazards that make them
          fundamentally different from standard domestic or commercial work. Water and electricity
          are a lethal combination, and the marine environment adds salt spray, UV exposure,
          mechanical movement, and constant moisture to the mix.
        </p>
        <p>
          BS 7671 recognises this by classifying marinas as special installations under{' '}
          <strong>Section 709</strong>. The requirements in Section 709 are more stringent than the
          general rules — they demand specific earthing arrangements, individual RCD protection,
          higher IP ratings, and specialised cable types.
        </p>
        <p>
          The consequences of getting marina electrical work wrong are severe. Electric shock
          drowning (ESD) — where stray electrical current in the water incapacitates a swimmer — is
          a documented cause of death in marinas worldwide. Every design decision in a marina
          electrical installation must be made with this risk in mind.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Water conducts electricity.</strong> A fault that puts even a few volts into
                the water near a pontoon can incapacitate a person in the water. In freshwater
                marinas, the risk is particularly acute because the human body has lower resistance
                than the surrounding water, so current preferentially flows through the person.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>The environment is hostile to electrical equipment.</strong> Salt spray
                corrodes terminals and enclosures. UV degrades PVC insulation and cable sheaths.
                Pontoon movement stresses cable connections. Condensation forms inside enclosures
                with temperature changes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Boats move.</strong> Supply cables must accommodate tidal movement, wave
                action, and the varying draught of boats as fuel and water tanks are filled and
                emptied. Rigid cable routes are not suitable — flexible, UV-resistant cables are
                essential.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'bs7671-section-709',
    heading: 'BS 7671 Section 709: The Key Requirements',
    content: (
      <>
        <p>
          Section 709 of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          applies to installations in marinas and similar locations for the supply to pleasure craft
          and houseboats. The key regulations are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 709.411.4:</strong> PME (TN-C-S) earthing must not be used as the
                means of earthing for the supply to a boat. TT earthing with an earth rod is the
                standard solution. A TN-S supply is acceptable where available.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 709.531.2:</strong> each socket outlet supplying a boat must be
                individually protected by a 30mA RCD. RCDs must not be shared between socket outlets
                — a fault on one boat must not trip the supply to another.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 709.512.2:</strong> socket outlets must comply with BS EN 60309-2
                (CEE industrial sockets). Standard 13A domestic sockets must not be used for boat
                supplies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 709.512.2:</strong> equipment installed on jetties and pontoons
                must have a minimum protection of IP44. Equipment exposed to wave splash requires
                IP56 or higher.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regulation 709.521:</strong> cables must be selected to withstand the
                environmental conditions including UV, moisture, salt, and mechanical stress.
                H07RN-F flexible cable is standard for exposed locations.
              </span>
            </li>
          </ul>
        </div>
        <p>
          These requirements are in addition to the general rules in Parts 1-6 of BS 7671. The
          electrician must apply both the general and special requirements, and where they conflict,
          the more stringent requirement (Section 709) takes precedence.
        </p>
      </>
    ),
  },
  {
    id: 'earthing-arrangements',
    heading: 'Earthing Arrangements: Why TT Is Essential',
    content: (
      <>
        <p>
          The earthing arrangement is the most critical design decision in a marina electrical
          installation. Getting it wrong can result in fatal electric shock drowning.
        </p>
        <p>
          In a standard PME (TN-C-S) system, the earth terminal at the property is connected to the
          DNO's combined neutral/earth (PEN) conductor. If the PEN conductor breaks, neutral current
          flows through the earth path — and in a marina, that earth path includes the water. This
          puts voltage in the water around the boats, creating a direct electric shock drowning
          hazard.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">TT Earthing (Required)</h3>
            <p className="text-white text-sm leading-relaxed">
              In a TT system, the earth terminal is connected to a local earth electrode (earth rod)
              driven into the ground near the installation. The earth reference is independent of
              the supply neutral. If the PEN conductor breaks on the DNO supply, the local earth is
              unaffected. TT earthing requires RCD protection for fault disconnection because the
              earth fault loop impedance is typically too high for overcurrent devices to operate
              quickly enough. This is why individual 30mA RCDs on each socket outlet are mandatory.
            </p>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">PME (TN-C-S) — Not Permitted</h3>
            <p className="text-white text-sm leading-relaxed">
              PME must not be used for the supply to boats (Regulation 709.411.4). The risk of a
              broken PEN conductor energising the water is unacceptable. Even if the on-shore
              installation receives a PME supply from the DNO, the supply to the boats must be
              converted to TT by installing a local earth rod and disconnecting the earth from the
              PME system for the boat supply circuits. The on-shore distribution (office, workshop,
              chandlery) may remain on PME if the DNO supply is PME.
            </p>
          </div>
        </div>
        <p>
          The earth rod resistance must be measured and recorded. For a TT system with 30mA RCD
          protection, the earth electrode resistance must be low enough to ensure the touch voltage
          does not exceed 50V. With a 30mA RCD, this gives a maximum electrode resistance of
          approximately 1667 ohm (50V / 0.03A). In practice, aim for well below this — 100 ohm or
          less is a good target, and often achievable with a properly installed 1.2m copper-clad
          earth rod in suitable soil.
        </p>
      </>
    ),
  },
  {
    id: 'shore-supply',
    heading: 'Shore Supply and Distribution',
    content: (
      <>
        <p>
          The shore power distribution system takes the incoming electricity supply and distributes
          it to individual berths via supply pillars (also called feeder pillars or service
          pedestals) mounted on the pontoons or jetty.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PlugZap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply pillars.</strong> Each supply pillar typically serves 2-4 berths and
                contains CEE socket outlets (16A and/or 32A), individual MCBs and RCDs for each
                socket, an isolator for each socket, and an energy meter (if required). The pillar
                must be rated to at least IP44 and manufactured from corrosion-resistant materials
                (typically GRP or marine-grade stainless steel).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PlugZap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribution boards.</strong> The main distribution board on shore
                distributes power to sub-mains cables running to each supply pillar. Each sub-main
                should have overcurrent protection and isolation at the main board. The sub-main
                cable must be sized for the maximum demand of the supply pillar, considering{' '}
                <SEOInternalLink href="/tools/voltage-drop-calculator">
                  voltage drop
                </SEOInternalLink>{' '}
                on potentially long cable runs to the end of the pontoon.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PlugZap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket ratings.</strong> Standard provision is 16A single-phase for smaller
                craft (yachts up to approximately 12m) and 32A single-phase for larger vessels. Very
                large vessels may require 63A or 125A three-phase supplies. The socket type must be
                BS EN 60309-2 (CEE blue for single-phase, CEE red for three-phase).
              </span>
            </li>
          </ul>
        </div>
        <p>
          The supply cable from the pillar to the boat is typically provided by the boat owner. It
          must be H07RN-F flexible cable with an appropriate CEE plug and connector, and must be in
          good condition. Marina operators should carry out visual inspections of supply cables and
          refuse to permit the use of damaged cables.
        </p>
        <SEOAppBridge
          title="Design marina distribution with Elec-Mate calculators"
          description="Cable sizing, voltage drop, maximum demand, and prospective fault current — all the calculations you need for marina distribution design, on your phone. Follows BS 7671:2018+A3:2024."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'ip-ratings',
    heading: 'IP Ratings and Environmental Protection',
    content: (
      <>
        <p>
          The marine environment is extremely demanding on electrical equipment. Salt spray, rain,
          wave splash, condensation, UV radiation, and airborne moisture all attack enclosures,
          terminals, and insulation. BS 7671 Section 709 specifies minimum IP ratings for equipment
          based on its location:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP44 minimum</strong> — for equipment on pontoons and jetties. IP44 provides
                protection against solid objects over 1mm and water splashes from all directions.
                This is the minimum for supply pillars, junction boxes, and distribution equipment
                in sheltered locations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IP56 or higher</strong> — for equipment exposed to wave splash or heavy
                rain. IP56 provides protection against dust ingress and powerful water jets. This
                applies to equipment at the outer edges of pontoons or in exposed coastal locations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Corrosion resistance.</strong> All metallic enclosures, fixings, and cable
                management must be marine-grade — stainless steel (Grade 316), GRP (glass-reinforced
                plastic), or similarly corrosion-resistant materials. Standard galvanised steel will
                corrode rapidly in a salt spray environment.
              </span>
            </li>
          </ul>
        </div>
        <p>
          IP ratings must be maintained throughout the life of the installation. An enclosure rated
          IP56 when new becomes IP00 if the gasket fails or a cable gland is not properly tightened.
          Regular inspection of enclosure integrity is part of the annual maintenance regime.
        </p>
        <p>
          Cable glands, stuffing glands, and conduit entries must all maintain the IP rating of the
          enclosure. Unused knockouts and entries must be sealed with IP-rated blanking plugs — not
          tape or silicone sealant, which degrades in UV and salt environments.
        </p>
      </>
    ),
  },
  {
    id: 'rcd-requirements',
    heading: 'RCD Requirements: Individual Protection Is Mandatory',
    content: (
      <>
        <p>
          RCD protection in a marina installation goes beyond the standard domestic requirements.
          Regulation 709.531.2 requires that <strong>each socket outlet</strong> supplying a boat
          must have its own individual 30mA RCD. This is a critical safety requirement — and it
          differs from domestic installations where circuits can share an RCD.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Why individual RCDs?</strong> If one boat develops an earth fault, the RCD
                for that socket trips — disconnecting only the faulty boat. All other boats retain
                their shore power. With shared RCDs, a fault on one boat would trip the power to
                multiple boats, potentially affecting refrigeration, bilge pumps, and safety systems
                on vessels whose electrical systems are fault-free.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD type.</strong> Type A RCDs (detecting sinusoidal AC and pulsating DC
                earth leakage) are the minimum requirement. Type B RCDs may be specified where boats
                have inverters or other equipment that could produce smooth DC earth leakage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing frequency.</strong> RCDs in marina environments should be
                functionally tested (using the test button) monthly and electrically tested (trip
                time and trip current) annually during the periodic inspection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The combination of TT earthing and individual 30mA RCD protection provides the primary
          defence against electric shock and electric shock drowning. Both elements must be in place
          — one without the other significantly reduces the safety margin.
        </p>
        <p>
          RCBOs (combined MCB and RCD in a single device) are an efficient way to provide both
          overcurrent and RCD protection in the limited space available within supply pillars. Each
          socket outlet gets its own RCBO, providing individual 30mA RCD and MCB protection.
        </p>
      </>
    ),
  },
  {
    id: 'cable-management',
    heading: 'Cable Management and Routing',
    content: (
      <>
        <p>
          Cable management in a marina installation must account for the unique environmental and
          mechanical challenges:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Cable className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Fixed Cables on Pontoons</h4>
                <p className="text-white text-sm leading-relaxed">
                  SWA (Steel Wire Armoured) cable or cable in marine-grade conduit/trunking is used
                  for fixed installations on pontoons. Where pontoon sections are joined, cables
                  must cross the joint with sufficient slack and flexibility to accommodate
                  movement. Rigid cable routes that do not allow for movement will stress and
                  eventually fracture the conductors.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <div className="flex items-start gap-4">
              <Cable className="w-6 h-6 text-purple-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Submarine Cables</h4>
                <p className="text-white text-sm leading-relaxed">
                  Where cables run from shore to floating pontoons, they must cross the water. This
                  is typically done using submarine cable or cable in a weighted flexible conduit
                  that lies on the seabed or riverbed. The cable must accommodate tidal movement — a
                  cable that is taut at high tide will be under extreme strain at low tide or vice
                  versa. A drip loop should be provided at each end to prevent water tracking into
                  the enclosures.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Cable className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Supply Cables to Boats</h4>
                <p className="text-white text-sm leading-relaxed">
                  The cable from the supply pillar to the boat is flexible H07RN-F with CEE plugs
                  and connectors. It must not trail in the water — cable management hooks or guides
                  on the pontoon edge help route the cable above the waterline. Damaged supply
                  cables with cracked sheaths, exposed conductors, or corroded pins must not be
                  used. The marina operator should carry out regular visual checks.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          All cable routes should be designed with maintenance access in mind. Cables buried in
          pontoon decking or hidden behind panels must be clearly marked and accessible for
          inspection and testing. The annual EICR will require access to all cables and accessories.
        </p>
      </>
    ),
  },
  {
    id: 'inspection-testing',
    heading: 'Inspection and Testing of Marina Installations',
    content: (
      <>
        <p>
          Marina installations require more frequent inspection and testing than standard
          installations due to the harsh environment and higher risk level. Guidance Note 3 (GN3)
          recommends a maximum interval of <strong>1 year</strong> for periodic inspection.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual EICR.</strong> A full periodic inspection and testing following BS
                7671 Chapter 62, with specific attention to Section 709 requirements. This includes:
                insulation resistance of all circuits, RCD trip time and sensitivity testing, earth
                electrode resistance measurement,{' '}
                <SEOInternalLink href="/guides/earthing-fault-diagnosis">
                  earth fault loop impedance
                </SEOInternalLink>
                , and visual inspection of all enclosures, cable routes, and connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Monthly visual inspection.</strong> Check supply pillars for physical
                damage, water ingress, corrosion, and loose connections. Check supply cables for
                damage. Test RCDs using the test button. Check earth rod connections for corrosion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FileCheck2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>After severe weather.</strong> Storms, flooding, or extreme tides can damage
                cables, enclosures, and connections. A visual inspection after any severe weather
                event is essential.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The EICR for a marina installation should reference Section 709 requirements in the
          observations. Common C1 and C2 observations on marina EICRs include: missing individual
          RCD protection, PME earth used for boat supplies, IP rating compromised by damaged
          enclosures or missing glands, and corroded earth electrode connections.
        </p>
        <p>
          Elec-Mate simplifies marina EICR documentation — record all test results on site using
          voice entry, let the AI flag Section 709 non-compliance, and send the completed EICR to
          the marina operator before you leave.
        </p>
        <SEOAppBridge
          title="Complete marina EICRs on your phone"
          description="Elec-Mate handles special installations including Section 709 marinas. AI board scanner, voice test entry, automatic observation code classification, and instant PDF delivery. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function MarinaElectricalInstallationsPage() {
  return (
    <GuideTemplate
      title="Marina Electrical Installations | BS 7671 Section 709"
      description="Complete guide to marina electrical installations under BS 7671 Section 709. Covers shore supply distribution, TT earthing requirements, individual RCD protection, IP ratings, cable management, and annual inspection requirements."
      datePublished="2025-07-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Special Installation"
      badgeIcon={Anchor}
      heroTitle={
        <>
          Marina Electrical Installations:{' '}
          <span className="text-yellow-400">BS 7671 Section 709 Guide</span>
        </>
      }
      heroSubtitle="Marinas are classified as special installations under BS 7671. TT earthing is mandatory, every socket needs its own 30mA RCD, IP44 minimum on pontoons, and annual inspection is recommended. This guide covers every requirement for electricians working on marina shore power systems."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Marina Electrical Installations"
      relatedPages={relatedPages}
      ctaHeading="Certify Special Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for digital certificates, AI fault diagnosis, and BS 7671 calculators. Handles special installations including marinas. 7-day free trial."
    />
  );
}
