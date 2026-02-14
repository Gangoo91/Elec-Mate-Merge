import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Droplets,
  ShieldCheck,
  Calculator,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Cable,
  Activity,
} from 'lucide-react';

export default function BathroomElectricalRegsPage() {
  return (
    <GuideTemplate
      title="Bathroom Electrical Regulations UK | BS 7671 Zones"
      description="Complete guide to bathroom electrical regulations under BS 7671 Part 7 Section 701. Bathroom zones (0, 1, 2, outside zones), IP ratings, supplementary bonding, RCD protection, SELV requirements, shaver sockets, extractor fans, shower circuits, and underfloor heating."
      datePublished="2025-04-20"
      dateModified="2026-02-14"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        {
          label: 'Bathroom Electrical Regulations',
          href: '/guides/bathroom-electrical-regulations',
        },
      ]}
      tocItems={[
        { id: 'overview', label: 'Overview' },
        { id: 'bathroom-zones', label: 'Bathroom Zones Explained' },
        { id: 'ip-ratings', label: 'IP Ratings per Zone' },
        { id: 'supplementary-bonding', label: 'Supplementary Bonding' },
        { id: 'rcd-protection', label: 'RCD Protection' },
        { id: 'selv', label: 'SELV Requirements' },
        { id: 'what-goes-where', label: 'What Can Go Where' },
        { id: 'shower-circuits', label: 'Shower Circuits' },
        { id: 'underfloor-heating', label: 'Underfloor Heating' },
        { id: 'how-to', label: 'Step-by-Step Inspection' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="Regulations Guide"
      badgeIcon={Droplets}
      heroTitle={
        <>
          Bathroom Electrical Regulations UK
          <br />
          <span className="text-yellow-400">BS 7671 Zones, IP Ratings & Requirements</span>
        </>
      }
      heroSubtitle="Bathrooms are one of the highest-risk environments for electrical installations. BS 7671 Part 7 Section 701 sets out specific requirements for bathroom zones, IP ratings, RCD protection, supplementary bonding, and SELV circuits. This guide explains every requirement in practical terms."
      readingTime={16}
      keyTakeaways={[
        'BS 7671 divides bathrooms into Zone 0 (inside the bath/shower), Zone 1 (above the bath/shower to 2.25m), Zone 2 (0.6m beyond Zone 1), and the area outside zones — each with specific requirements for equipment and IP ratings.',
        'All circuits in bathrooms must be protected by a 30mA RCD — there are no exceptions. This applies to lighting, extractor fans, shower circuits, underfloor heating, and any other electrical equipment.',
        'Supplementary bonding is no longer automatically required in bathrooms since the 17th Edition, provided all circuits are RCD-protected and the main protective bonding is confirmed as satisfactory.',
        'Only SELV (Safety Extra-Low Voltage) at 12V or below is permitted in Zone 0. In Zone 1, equipment must be rated at least IPX4 and only SELV or equipment specifically designed for the zone is permitted.',
        'Electric showers draw 8,000-10,500W (35-46A) and require dedicated circuits with appropriate cable sizing, typically 10mm² for runs up to 25m — always calculate voltage drop for the specific installation.',
      ]}
      sections={[
        {
          id: 'overview',
          heading: 'Bathroom Electrical Regulations — Overview',
          content: (
            <>
              <p>
                Bathrooms present a unique set of electrical hazards. The combination of water,
                steam, wet skin (which has significantly lower resistance than dry skin), bare feet
                on conductive surfaces, and earthed metallic pipes and fittings creates conditions
                where even a small fault current can cause a fatal electric shock. BS 7671 Part 7
                Section 701 addresses these hazards by imposing strict requirements on what
                electrical equipment can be installed, where it can be placed, and how it must be
                protected.
              </p>
              <p>
                The regulations apply to any room containing a bath or shower — this includes
                en-suite bathrooms, wet rooms, shower rooms, and any other room where a bath or
                shower is installed. They also apply to shower cubicles in bedrooms (increasingly
                common in hotel-style conversions) and to swimming pool shower areas. The key
                principle is that the closer electrical equipment is to the water source, the higher
                the protection requirements.
              </p>
              <p>
                For electricians, bathroom work is some of the most regulation-intensive domestic
                electrical work. An{' '}
                <SEOInternalLink href="/guides/eicr-certificate">EICR inspection</SEOInternalLink>{' '}
                of a property always requires careful assessment of the bathroom installation, and
                new bathroom circuits require detailed design consideration.
              </p>
            </>
          ),
        },
        {
          id: 'bathroom-zones',
          heading: 'Bathroom Zones Explained (BS 7671 Section 701)',
          content: (
            <>
              <p>
                BS 7671 divides the bathroom into distinct zones based on the proximity to the bath
                or shower. Each zone has specific requirements for the type of equipment that can be
                installed and the minimum IP (Ingress Protection) rating required.
              </p>
              <div className="space-y-4 my-6">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-yellow-400 text-2xl mb-1">Zone 0</h3>
                  <h4 className="font-bold text-white mb-3">Inside the Bath or Shower Basin</h4>
                  <p className="text-white text-sm leading-relaxed">
                    Zone 0 is the interior of the bath or shower tray — the space that can contain
                    water. Only fixed equipment specifically designed for use in this zone is
                    permitted. The equipment must be rated at least IPX7 (protected against
                    temporary immersion) and must operate at SELV (Safety Extra-Low Voltage) not
                    exceeding 12V AC or 30V ripple-free DC. The SELV source (transformer) must be
                    located outside Zones 0, 1, and 2. In practice, very few items are installed in
                    Zone 0 — underwater lighting in whirlpool baths is the most common example.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-2xl mb-1">Zone 1</h3>
                  <h4 className="font-bold text-white mb-3">
                    Above the Bath/Shower to 2.25m Height
                  </h4>
                  <p className="text-white text-sm leading-relaxed">
                    Zone 1 extends from the finished floor level (or the top of the bath rim/shower
                    tray) up to a height of 2.25 metres above the floor, directly above the bath or
                    shower tray. Equipment in this zone must be rated at least IPX4 (protected
                    against splashing water from all directions). Only fixed equipment suitable for
                    the conditions is permitted — this includes electric showers (which are
                    specifically designed for Zone 1), instantaneous water heaters, and whirlpool
                    units. Switches are not permitted in Zone 1 (except as integral parts of fixed
                    equipment like shower pull-cord switches that are part of the shower unit). SELV
                    at a maximum of 25V AC is permitted, with the SELV source located outside Zones
                    0, 1, and 2.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-yellow-400 text-2xl mb-1">Zone 2</h3>
                  <h4 className="font-bold text-white mb-3">0.6m Beyond Zone 1</h4>
                  <p className="text-white text-sm leading-relaxed">
                    Zone 2 extends 0.6 metres horizontally beyond Zone 1 and up to 2.25 metres above
                    the floor. It also includes the area above Zone 1 between 2.25m and 3.0m above
                    the floor, directly above the bath or shower. Equipment in Zone 2 must be rated
                    at least IPX4 (IPX5 where water jets are used for cleaning purposes).
                    Luminaires, fans, heaters, and shaver sockets to BS EN 61558-2-5 (with an
                    isolating transformer) are permitted in Zone 2, provided they have the required
                    IP rating.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-yellow-400 text-2xl mb-1">Outside Zones</h3>
                  <h4 className="font-bold text-white mb-3">Beyond Zone 2</h4>
                  <p className="text-white text-sm leading-relaxed">
                    The area outside the defined zones is subject to the general requirements of BS
                    7671 rather than the specific bathroom zone requirements. Standard switches,
                    socket outlets, and equipment can be installed here, subject to the general
                    regulations. However, 30mA RCD protection is still mandatory for all circuits in
                    the bathroom, including those serving equipment outside the zones. Socket
                    outlets (other than shaver sockets) are permitted outside the zones, provided
                    they are at least 3 metres from the boundary of Zone 1.
                  </p>
                </div>
              </div>
              <p>
                For shower cubicles without a tray (walk-in showers and wet rooms), Zone 1 extends
                to 1.2 metres from the shower head fixing point measured horizontally. The zone
                dimensions are the same regardless of whether there is a physical enclosure — a
                shower curtain does not define the zone boundary.
              </p>
            </>
          ),
        },
        {
          id: 'ip-ratings',
          heading: 'IP Ratings Required per Zone',
          content: (
            <>
              <p>
                The Ingress Protection (IP) rating system classifies the degree of protection
                provided by electrical enclosures against the entry of solid objects and water. In
                bathroom installations, the water protection rating (the second digit) is the
                critical factor.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Minimum IP Ratings by Zone</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">Zone 0</h4>
                      <p className="text-white text-sm">Inside the bath/shower basin</p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">IPX7</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                    <div>
                      <h4 className="font-bold text-white">Zone 1</h4>
                      <p className="text-white text-sm">Above bath/shower to 2.25m</p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">IPX4</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">Zone 2</h4>
                      <p className="text-white text-sm">0.6m beyond Zone 1</p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">IPX4</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">Outside Zones</h4>
                      <p className="text-white text-sm">Beyond Zone 2</p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">IPX0 (general)</span>
                  </div>
                </div>
              </div>
              <p>
                IPX4 means the equipment is protected against splashing water from all directions.
                IPX7 means the equipment is protected against temporary immersion in water (up to 1
                metre depth for 30 minutes). Where water jets are used for cleaning (such as in
                commercial or communal bathrooms), IPX5 (protected against water jets from all
                directions) is required in Zones 1 and 2.
              </p>
              <p>
                Elec-Mate's{' '}
                <SEOInternalLink href="/guides/eicr-certificate">EICR form</SEOInternalLink>{' '}
                includes fields for recording the IP ratings of equipment installed in each bathroom
                zone, ensuring nothing is missed during inspection.
              </p>
            </>
          ),
        },
        {
          id: 'supplementary-bonding',
          heading: 'Supplementary Bonding — When Is It Needed?',
          content: (
            <>
              <p>
                Supplementary bonding in bathrooms has been one of the most debated topics in UK
                electrical work since the introduction of the 17th Edition (BS 7671:2008). The
                position has evolved through successive editions and amendments, and the current
                requirements under the 18th Edition are as follows.
              </p>
              <p>
                <strong className="text-white">The rule since the 17th Edition:</strong>{' '}
                Supplementary bonding in a bathroom is not required provided that all of the
                following conditions are met:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        All circuits in the bathroom are protected by 30mA RCD
                      </strong>{' '}
                      — This means every circuit, without exception, must have 30mA RCD protection.
                      If even one circuit lacks RCD protection, supplementary bonding is required
                      for the entire bathroom.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        Main protective bonding is confirmed as satisfactory
                      </strong>{' '}
                      — The main bonding conductors to incoming services (water, gas) must be
                      present, correctly sized, and have adequate continuity. This must be verified
                      by testing, not just visual inspection.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">
                        All extraneous conductive parts are effectively connected to the protective
                        equipotential bonding
                      </strong>{' '}
                      — This means the metallic pipework, radiators, and any other extraneous
                      conductive parts in the bathroom are connected back to the main earth via the
                      bonding system.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                If all three conditions are met, supplementary bonding is not required. If any
                condition is not met — for example, if there is a circuit without RCD protection, if
                the main bonding is inadequate or absent, or if there are extraneous conductive
                parts not connected to the bonding system — then supplementary bonding must be
                installed.
              </p>
              <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5 my-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-2">
                      Practical Point for EICR Inspections
                    </h4>
                    <p className="text-white text-sm leading-relaxed">
                      During an EICR, if supplementary bonding is absent in a bathroom, you must
                      verify all three conditions before concluding that it is not required. If you
                      cannot confirm all three conditions (for example, if you cannot verify the
                      main bonding or if a circuit lacks RCD protection), the absence of
                      supplementary bonding should be recorded as an observation or deficiency.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'rcd-protection',
          heading: 'RCD Protection — 30mA Mandatory',
          content: (
            <>
              <p>
                BS 7671 Regulation 701.411.3.3 requires that all circuits in a bathroom location
                must be protected by a 30mA RCD. This requirement is absolute — there are no
                exceptions based on the zone, the type of equipment, or the circuit rating. It
                applies to:
              </p>
              <ul className="space-y-2 my-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Lighting circuits</strong> — All bathroom
                    lighting, whether in Zone 1, Zone 2, or outside the zones.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Extractor fan circuits</strong> — Whether the fan
                    is supplied from the lighting circuit or has a dedicated circuit.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Shower circuits</strong> — Electric showers
                    drawing up to 46A on a dedicated circuit.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Heated towel rail circuits</strong> — Whether
                    permanently wired or supplied from a fused connection unit.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">
                    <strong className="text-white">Underfloor heating circuits</strong> — Electric
                    underfloor heating elements beneath the bathroom floor.
                  </span>
                </li>
              </ul>
              <p>
                The RCD can be provided by an RCBO protecting the individual circuit, or by an RCD
                protecting a group of circuits (as in a split-load consumer unit). In either case,
                the rated residual operating current must not exceed 30mA and the device must be
                Type AC minimum (Type A is preferred for circuits with electronic equipment).
              </p>
            </>
          ),
        },
        {
          id: 'selv',
          heading: 'SELV Requirements for Zones 0 and 1',
          content: (
            <>
              <p>
                SELV (Safety Extra-Low Voltage) is used in bathrooms to reduce the risk of electric
                shock in the most hazardous zones. SELV operates at voltages that are considered
                non-lethal — 12V AC or 30V ripple-free DC maximum in Zone 0, and 25V AC or 60V
                ripple-free DC in Zone 1.
              </p>
              <p>
                The key feature of a SELV system is that the low-voltage supply is derived from a
                safety isolating transformer that provides galvanic separation between the mains
                supply and the SELV circuit. The SELV transformer must be located outside Zones 0,
                1, and 2 — typically in the ceiling void above the bathroom or in an adjacent room.
                The SELV circuit must not be earthed (if it were earthed, it would become PELV
                rather than SELV, and the safety benefit would be reduced).
              </p>
              <p>
                Common applications of SELV in bathrooms include LED downlights (12V LED drivers
                located outside the zones, with low-voltage cabling to the luminaires in Zone 1),
                shaver lights with integral SELV transformers in Zone 2, and underwater lighting in
                whirlpool baths (12V SELV in Zone 0).
              </p>
              <p>
                It is important to distinguish between SELV and simple low-voltage supplies. A USB
                charger integrated into a shaver socket, for example, provides 5V DC — but unless
                the supply is via a safety isolating transformer with the required separations, it
                is not SELV and must not be installed in Zones 0 or 1.
              </p>
            </>
          ),
        },
        {
          id: 'what-goes-where',
          heading: 'What Can Be Installed Where — Zone by Zone',
          content: (
            <>
              <p>
                Understanding what equipment can be installed in each zone is essential for both new
                installations and EICR inspections. The following is a practical summary of the most
                common bathroom equipment and where it is permitted.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Equipment Permitted by Zone</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <h4 className="font-bold text-yellow-400 mb-2">
                      Shaver Socket (BS EN 61558-2-5)
                    </h4>
                    <p className="text-white text-sm leading-relaxed">
                      Permitted in Zone 2 and outside zones. Not permitted in Zone 0 or Zone 1. Must
                      incorporate an isolating transformer. Standard 13A socket outlets are not
                      permitted in any zone and should be at least 3m from the boundary of Zone 1.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <h4 className="font-bold text-yellow-400 mb-2">Electric Shower</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Permitted in Zone 1 — electric showers are specifically designed for
                      installation in this zone. The unit must be IPX4 rated. The pull-cord switch
                      (if separate from the unit) must be outside Zone 1 — typically on the ceiling
                      or on a wall outside the zones. The supply cable enters the shower unit and
                      does not pass through Zone 0.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <h4 className="font-bold text-yellow-400 mb-2">Extractor Fan</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Permitted in Zone 1 (if rated IPX4 or higher) and Zone 2 (if rated IPX4 or
                      higher). Many bathroom extractor fans are designed for Zone 1 installation.
                      The fan switch must be outside Zone 1 — a pull-cord on the ceiling is a common
                      solution, or a wall switch outside the zones.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <h4 className="font-bold text-yellow-400 mb-2">Light Fittings</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Permitted in Zone 1 (if rated IPX4 and suitable for the zone), Zone 2 (if
                      rated IPX4), and outside zones (general IP rating). IP-rated LED downlights
                      are the most common Zone 1 lighting solution. The light switch must be outside
                      Zone 1 — a pull-cord or a switch outside the bathroom door.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <h4 className="font-bold text-yellow-400 mb-2">Heated Towel Rail</h4>
                    <p className="text-white text-sm leading-relaxed">
                      If electric, permitted in Zone 2 and outside zones with appropriate IP rating.
                      Not permitted in Zone 0 or Zone 1 unless specifically designed and rated for
                      the zone. Most electric towel rails are installed outside Zone 2 or at the
                      edge of Zone 2. The connection should be via a fused connection unit located
                      outside the zones.
                    </p>
                  </div>
                </div>
              </div>
              <SEOAppBridge
                title="EICR and EIC Forms for Bathroom Installations"
                description="Elec-Mate's EICR and EIC certificate forms include bathroom-specific fields — zone identification, IP ratings, supplementary bonding status, RCD protection, and SELV circuit documentation. The AI regulations lookup explains zone requirements as you inspect."
                icon={FileText}
              />
            </>
          ),
        },
        {
          id: 'shower-circuits',
          heading: 'Electric Shower Circuits',
          content: (
            <>
              <p>
                Electric showers are one of the most demanding domestic circuits, drawing
                significant power from the supply. The most common ratings are:
              </p>
              <div className="grid sm:grid-cols-3 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-yellow-400 text-2xl mb-1">8.5 kW</h3>
                  <h4 className="font-bold text-white mb-3">37A at 230V</h4>
                  <p className="text-white text-sm leading-relaxed">
                    Entry-level shower. Requires a 40A circuit with 6mm² cable for short runs (up to
                    approximately 18m) or 10mm² for longer runs. Adequate flow rate for most users.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-2xl mb-1">9.5 kW</h3>
                  <h4 className="font-bold text-white mb-3">41A at 230V</h4>
                  <p className="text-white text-sm leading-relaxed">
                    Most popular domestic shower. Requires a 45A circuit with 10mm² cable. Good flow
                    rate and temperature for year-round use. The most commonly specified size.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-yellow-400 text-2xl mb-1">10.5 kW</h3>
                  <h4 className="font-bold text-white mb-3">46A at 230V</h4>
                  <p className="text-white text-sm leading-relaxed">
                    High-output shower. Requires a 50A circuit with 10mm² cable (short runs) or
                    16mm² for longer runs. Best flow rate and temperature performance but demands a
                    robust supply.
                  </p>
                </div>
              </div>
              <p>
                Every electric shower circuit must have a dedicated circuit from the consumer unit —
                it must not share a circuit with any other equipment. The circuit must be protected
                by a 30mA RCD (as required for all bathroom circuits) and an appropriately rated
                overcurrent protective device. A double-pole isolator switch must be provided,
                typically a 45A or 50A ceiling-mounted pull-cord switch. The switch must be
                accessible to the user and located outside Zone 1.
              </p>
              <p>
                Cable sizing is critical —{' '}
                <SEOInternalLink href="/calculators/voltage-drop">voltage drop</SEOInternalLink>{' '}
                must be calculated for the specific cable length and installation method. A 10.5 kW
                shower on a long cable run can easily exceed the 5% voltage drop limit if the cable
                is undersized. Use the{' '}
                <SEOInternalLink href="/calculators/cable-sizing">
                  cable sizing calculator
                </SEOInternalLink>{' '}
                to verify.
              </p>
            </>
          ),
        },
        {
          id: 'underfloor-heating',
          heading: 'Electric Underfloor Heating in Bathrooms',
          content: (
            <>
              <p>
                Electric underfloor heating (UFH) is increasingly popular in bathrooms, providing
                comfortable warmth underfoot on cold tiles. From a regulations perspective, electric
                UFH in bathrooms requires careful consideration.
              </p>
              <p>
                The heating element (cable mat or loose cable) is installed beneath the floor
                finish, typically embedded in tile adhesive or a self-levelling compound. The
                element is connected to a thermostat/controller, which may be located in or outside
                the bathroom. The entire system must be protected by a 30mA RCD (as required for all
                bathroom circuits).
              </p>
              <p>
                BS 7671 Regulation 701.753 requires that electric heating systems embedded in the
                floor of a bathroom must have either a metallic grid connected to the protective
                conductor of the heating circuit (to provide earth fault detection) or be covered by
                the overall RCD protection of the bathroom circuits. Most modern UFH systems
                designed for bathrooms include a metallic earth screen within the heating mat that
                serves this purpose.
              </p>
              <p>
                The thermostat should include a floor sensor (embedded in the screed alongside the
                heating element) to prevent overheating. The thermostat location must comply with
                the zone requirements — if in the bathroom, it must be outside Zone 2 and have an
                appropriate IP rating. Many installers locate the thermostat just outside the
                bathroom door for convenience and compliance.
              </p>
              <p>
                An insulation resistance test of the heating element should be carried out before
                and after installation of the floor finish, to identify any damage to the element
                during the tiling process. The results should be recorded on the{' '}
                <SEOInternalLink href="/guides/eic-certificate">
                  Electrical Installation Certificate
                </SEOInternalLink>
                .
              </p>
            </>
          ),
        },
      ]}
      howToHeading="How to Inspect a Bathroom Installation — Step-by-Step"
      howToDescription="A step-by-step guide to inspecting the electrical installation in a bathroom during an EICR or when certifying new work."
      howToSteps={[
        {
          name: 'Identify the bathroom zones',
          text: 'Measure and identify Zone 0 (inside the bath/shower), Zone 1 (above the bath/shower to 2.25m from floor level), Zone 2 (0.6m beyond Zone 1 horizontally and the area between 2.25m and 3.0m above the bath/shower), and the area outside zones. For walk-in showers without trays, Zone 1 extends 1.2m from the shower head fixing point. Record the zone layout.',
        },
        {
          name: 'Check all equipment IP ratings',
          text: 'Verify that every piece of electrical equipment in the bathroom has an IP rating appropriate for its zone. Zone 0 requires IPX7, Zone 1 and 2 require IPX4 minimum. Check luminaires, extractor fans, shaver sockets, shower units, and any other fixed equipment. Record the IP ratings on the EICR schedule.',
        },
        {
          name: 'Verify RCD protection for all circuits',
          text: 'Confirm that every circuit serving the bathroom is protected by a 30mA RCD. Test each RCD for correct operation — the test button and instrument test (at rated current and 5x rated current). Record the RCD type, rating, and measured operating times.',
        },
        {
          name: 'Assess supplementary bonding',
          text: 'Check whether supplementary bonding is installed. If it is not, verify that all three conditions for omitting it are met: all circuits RCD-protected, main bonding satisfactory, and all extraneous conductive parts connected to the bonding system. If supplementary bonding is present, check continuity and connections.',
        },
        {
          name: 'Test all circuits',
          text: 'Carry out the full testing sequence for each bathroom circuit: continuity of protective conductors, insulation resistance, polarity, earth fault loop impedance (Zs), and prospective fault current. For shower circuits, verify cable sizing against the load current and measured voltage drop.',
        },
        {
          name: 'Record and report',
          text: 'Document all findings on the EICR or EIC, including zone identification, IP ratings, RCD test results, bonding status, and any observations or deficiencies. Use the appropriate observation codes for any non-compliances found.',
        },
      ]}
      faqs={[
        {
          question: 'Can I install a standard 13A socket outlet in a bathroom?',
          answer:
            'Standard 13A socket outlets should not be installed in bathroom zones (0, 1, or 2). In the area outside the zones, a 13A socket outlet is technically permitted under BS 7671, but only if it is at least 3 metres from the boundary of Zone 1. In most domestic bathrooms, this distance requirement effectively rules out 13A sockets entirely — the room is simply not large enough. The only type of socket outlet routinely installed in bathrooms is a shaver socket complying with BS EN 61558-2-5, which incorporates an isolating transformer. These are permitted in Zone 2 and outside the zones. For EV shavers, electric toothbrushes, and similar appliances, a shaver socket is the appropriate solution.',
        },
        {
          question: 'Is supplementary bonding still required in bathrooms?',
          answer:
            "Supplementary bonding is not automatically required in bathrooms since the 17th Edition of BS 7671. However, it can only be omitted if three conditions are met: all circuits in the bathroom are protected by a 30mA RCD, the main protective bonding is confirmed as satisfactory (by testing, not just visual inspection), and all extraneous conductive parts are effectively connected to the protective equipotential bonding. If any of these conditions cannot be confirmed, supplementary bonding must be installed. In practice, during an EICR of an older property, it is common to find that the main bonding is absent or inadequate — in which case supplementary bonding is required unless the main bonding is brought up to standard. Elec-Mate's EICR form guides you through the supplementary bonding assessment with prompts for each condition.",
        },
        {
          question: 'What IP rating do I need for a bathroom light fitting?',
          answer:
            'The IP rating required depends on the zone where the light fitting is installed. In Zone 1 (directly above the bath or shower up to 2.25m from the floor), the minimum rating is IPX4 (protected against splashing water from all directions). In Zone 2 (0.6m beyond Zone 1), the minimum is also IPX4. Outside the zones, there is no specific IP requirement beyond the general regulations, but many electricians specify IPX4 throughout the bathroom as good practice — steam and condensation affect the entire room, not just the defined zones. For Zone 1 ceiling-mounted downlights, IP65 is the most commonly available rating and is more than adequate. Ensure the IP rating is clearly marked on the luminaire and that any seals or gaskets are correctly fitted during installation.',
        },
        {
          question: 'Can I install an extractor fan in Zone 1?',
          answer:
            "Yes, an extractor fan can be installed in Zone 1 provided it is rated at least IPX4 and is suitable for installation in that zone. Many bathroom extractor fans are specifically designed for Zone 1 installation — check the manufacturer's data to confirm. The fan switch, however, must not be in Zone 1. The most common switching arrangements are a pull-cord switch mounted on the ceiling outside Zone 1, a wall switch located outside the bathroom, or connection to the lighting circuit via a timer relay so the fan operates automatically when the light is switched on and continues running for a set period after the light is switched off. The fan must be on a circuit protected by a 30mA RCD.",
        },
        {
          question: 'What cable size is needed for a 9.5kW electric shower?',
          answer:
            "A 9.5 kW electric shower draws approximately 41A at 230V. The minimum cable size depends on the installation method and cable run length. For PVC twin-and-earth cable (6242Y) clipped direct to a surface, 10mm² is the standard choice for most domestic installations — it can carry 64A (clipped direct, reference method C) and provides adequate voltage drop margin for cable runs up to approximately 25-30 metres. For cable runs in insulation, derating factors apply and the effective current-carrying capacity is reduced. Always calculate the voltage drop for the specific run length — a 9.5 kW shower at 41A on a long cable run can easily exceed the 5% limit. Elec-Mate's cable sizing calculator handles all derating factors and voltage drop calculations automatically.",
        },
        {
          question: 'Do bathroom regulations apply to a downstairs WC?',
          answer:
            'The special requirements of BS 7671 Section 701 apply to rooms containing a bath or shower. A standard downstairs WC (containing only a toilet and basin, with no bath or shower) is not a "location containing a bath or shower" and therefore the specific zone requirements, supplementary bonding considerations, and bathroom-specific regulations do not apply. Standard domestic wiring regulations apply instead. However, if a shower cubicle is installed in a WC — even a small enclosure — the room becomes a "location containing a shower" and the full Section 701 requirements apply, including zones, IP ratings, and mandatory 30mA RCD protection for all circuits. The presence or absence of a bath or shower is the determining factor, not the name of the room.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/eicr-certificate',
          title: 'EICR Certificate',
          description: 'How to complete an EICR — including bathroom-specific requirements.',
          icon: FileText,
          category: 'Certification',
        },
        {
          href: '/guides/eic-certificate',
          title: 'EIC Certificate',
          description: 'Electrical Installation Certificate for new bathroom circuits.',
          icon: FileText,
          category: 'Certification',
        },
        {
          href: '/calculators/cable-sizing',
          title: 'Cable Sizing Calculator',
          description: 'Calculate correct cable sizes for shower circuits.',
          icon: Calculator,
          category: 'Calculator',
        },
        {
          href: '/calculators/voltage-drop',
          title: 'Voltage Drop Calculator',
          description: 'Verify voltage drop on shower circuits and long cable runs.',
          icon: Activity,
          category: 'Calculator',
        },
        {
          href: '/guides/earthing-arrangements',
          title: 'Earthing Arrangements',
          description: 'Understanding earthing — essential for bonding decisions.',
          icon: Cable,
          category: 'Guide',
        },
        {
          href: '/guides/rcd-testing',
          title: 'RCD Testing Guide',
          description: 'How to test RCDs correctly — mandatory for all bathroom circuits.',
          icon: ShieldCheck,
          category: 'Guide',
        },
      ]}
      ctaHeading="Inspect and Certify Bathrooms With Confidence"
      ctaSubheading="EICR and EIC forms with bathroom-specific fields, IP rating guidance, cable sizing calculator, and AI regulations lookup — all in Elec-Mate. 7-day free trial, cancel anytime."
    />
  );
}
