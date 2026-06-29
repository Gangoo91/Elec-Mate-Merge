import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  Pullquote,
} from '@/components/study-centre/learning';
import { EvMountingZones } from '@/components/study-centre/diagrams/renewableGapSvg';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm6s5-ip-rating',
    question:
      'Outdoor 7 kW Mode 3 wallbox on a UK driveway — what minimum IP rating is appropriate?',
    options: [
      'IP20 — a first digit of 2 keeps fingers out, the dominant risk for a wall-mounted outdoor unit',
      'IP54 minimum, IP65 typical — dust-protected with splash or jet-water protection for the outdoor location',
      'IP44 minimum — a second digit of 4 gives full immersion protection, which a driveway unit needs',
      'IP2X is sufficient outdoors if the unit is above 1 m, since rain cannot reach a wallbox at that height',
    ],
    correctIndex: 1,
    explanation:
      'IP rating per BS EN 60529 sets ingress protection. First digit: solid object protection (0-6, where 5 = dust-protected, 6 = dust-tight). Second digit: water protection (0-9, where 4 = splashing, 5 = jets, 6 = powerful jets). UK outdoor domestic wallbox: IP54 acceptable minimum (most domestic wallboxes); IP65 preferred for exposed sites (windward walls, no overhang). Reg 522 external influences — designer determines the appropriate rating based on the actual site exposure. Cert evidence bundle records the wallbox IP rating from manufacturer DoC.',
  },
  {
    id: 'm6s5-ik-rating',
    question:
      'BS EN 62262:2002 +A1:2021 — what does the IK code measure?',
    options: [
      'Protection against ingress of water under pressure, complementing the second digit of the IP code',
      'Protection of enclosures against external mechanical impact — IK00 (none) to IK10 (20 J)',
      'The maximum insulation withstand voltage of the enclosure in kV, i.e. the fault voltage it can contain',
      'The thermal class of the enclosure, rating the maximum continuous operating temperature of the housing',
    ],
    correctIndex: 1,
    explanation:
      'IK code per BS EN 62262 rates mechanical impact protection. IK00 = no protection; IK01-IK06 = increasing low-impact levels; IK07 = 2 J; IK08 = 5 J; IK09 = 10 J; IK10 = 20 J. Outdoor EV wallboxes typically IK08 or IK10 — adequate for driveway / curtilage exposure. Reg 722.551.7.2 references BS EN 62262 for enclosure mechanical impact protection. Some wallboxes have separate IK ratings for the housing vs the connector socket. Cert evidence bundle records the IK rating from manufacturer DoC.',
  },
  {
    id: 'm6s5-mounting-height',
    question:
      'What’s the typical mounting height for the Type 2 socket / connector on a UK domestic wallbox?',
    options: [
      'As low as practical, around 0.5 m, so the cable reaches the vehicle charge port without lifting',
      'Manufacturer-specified, typically 1.0-1.4 m above the standing surface for ergonomics and strain relief',
      'At least 2.5 m, matching the minimum height for outdoor accessories to keep the socket from children',
      'There is no recommended height; the unit goes wherever the cable run from the consumer unit is shortest',
    ],
    correctIndex: 1,
    explanation:
      'Manufacturer instructions are the primary source. Typical UK 2025-26 mounting heights: 1.0-1.4 m above the standing surface. Ergonomic plug-in height for typical adult users (waist height); avoids the customer kneeling to plug in. Cable strain relief: the loose cable hangs in a loop below the wallbox, not pulled tight from the socket. Accessibility: users with reduced mobility may need lower mounting (~0.9 m) per Equality Act considerations on commercial sites; less commonly applied to single-user domestic. Splash protection: keeps the socket above road spray during heavy rain. Cert evidence bundle records the mounting height + manufacturer instruction reference.',
  },
  {
    id: 'm6s5-enclosure-glanding',
    question:
      'Cable entry into the outdoor wallbox enclosure — what is the typical glanding arrangement?',
    options: [
      'Any compression gland fits any cable, so one standard round gland is used for flat T+E or round SWA alike',
      'An IP-rated gland matched to the cable diameter, maintaining the wallbox IP rating at the entry point',
      'A grommet alone is adequate, since the wallbox internal seal maintains the IP rating regardless of the entry',
      'Seal the entry with expanding foam, filling the gap for both the IP seal and mechanical support',
    ],
    correctIndex: 1,
    explanation:
      'Cable glanding is where many outdoor wallbox installs fail. The wallbox’s factory IP rating depends on the cable entries being properly glanded with IP-matching glands. T+E flat cable: needs a flat-profile gland or a converter (some wallbox manufacturers supply round-profile cable internally with a flat-to-round adapter at the wall-side). SWA round profile: standard IP-rated gland matched to cable diameter. Drainage: some wallbox enclosures have a designed drainage path; don’t block it. Manufacturer instructions are explicit — follow them. Cert evidence bundle records the glanding method + photographs.',
  },
];

const quizQuestions = [
  {
    question:
      'A customer wants the wallbox mounted on a north-facing wall directly exposed to prevailing weather. What’s the IP / IK consideration?',
    options: [
      'Exposed wall means driving rain and debris — specify IP65 / IK10, or relocate to a sheltered IP54 / IK08 position',
      'A standard IP44 / IK07 wallbox is sufficient anywhere outdoors, since all are factory weatherproofed for the UK',
      'Build a small open-fronted timber canopy so a basic IP20 indoor-rated wallbox can sit in the sheltered pocket',
      'Specify the highest IK rating available but disregard the IP digit, debris impact being the dominant risk',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 522 external influences requires the designer to assess the actual site conditions. Exposed north-facing wall = high water exposure (driving rain), high mechanical risk (wind-blown debris, hail), variable temperature. IP65 / IK10 is the conservative spec for fully-exposed sites. Cheaper alternative: relocate the wallbox to a more sheltered position (under eaves, side wall) where the standard IP54 / IK08 wallbox is adequate — saves the cost of the upgrade. Customer-side considerations: cable routing to the new position; charging convenience. Cert evidence bundle records the IP/IK selection + the site exposure assessment.',
  },
  {
    question:
      'BS EN IEC 61439-7:2023 — which application does it specifically cover for the EV space?',
    options: [
      'The product standard for the individual wallbox itself, replacing BS EN 61851 for a single 7 kW charger',
      'The standard for the EV charging cable and Type 2 connector assembly — plug, lead and vehicle-side coupler',
      'LV switchgear assemblies for specific applications, applying where multiple wallboxes share a charging-station enclosure',
      'The earthing and PEN-fault protection requirements for EV charging, like the open-PEN provisions of Section 722',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN IEC 61439-7:2023 covers low-voltage switchgear and controlgear assemblies for specific applications including EV charging stations. Relevant when multiple charging points are assembled into a single enclosure (e.g. commercial / fleet / public charging hubs). UK 2025-26 single-wallbox domestic install — each wallbox is a factory-built complete unit; 61439-7 typically not invoked directly. Section 722 still applies; the wallbox’s factory conformity (BS EN 61851 + 62196-2 + 62955) is the primary product standard. M7 covers commercial / public charging where 61439-7 becomes directly relevant.',
  },
  {
    question:
      'A wallbox is mounted on an external garage wall, with the cable routed through the wall from the integral CU. What’s the wall penetration consideration?',
    options: [
      'Weather sleeve, exterior drip loop, seal both sides, mechanical protection, and fire-stopping if the wall is fire-rated',
      'Drill the hole sloping upward outside-to-inside so rainwater runs back out, then seal only the internal face with mastic',
      'Use an oversized hole so the cable is never under pressure from the brick, leaving the gap open for ventilation',
      'Route the cable through the existing airbrick to avoid drilling, relying on it for weather and fire separation',
    ],
    correctAnswer: 0,
    explanation:
      'Wall penetration through an external wall has multiple considerations: (1) weather sealing — water can track along cable sheath if the entry isn’t sealed both sides; (2) mechanical protection — sleeve / conduit through hollow walls or thermoplastic blocks; (3) fire separation — if the wall is a fire-rated party wall (typical garage-to-dwelling), the penetration must be fire-stopped and made good per Approved Document B (England) / equivalent; (4) drip loop — the cable should slope downward on the outside before entering the wall to drain water away; (5) gland / seal at the wallbox entry. Cert evidence bundle records the wall penetration method + photographs.',
  },
  {
    question:
      'A customer’s wallbox is to be mounted on a wooden fence panel for ease of cabling. What’s the install consideration?',
    options: [
      'A fence panel is fine if long coach screws reach the horizontal rails, which carry the unit and cable weight',
      'A wooden fence panel is too unstable and combustible — mount on a non-combustible backboard fixed to a post or wall',
      'Mount on the fence but treat the timber with intumescent paint first to give the surface the required fire rating',
      'A fence is acceptable up to 7 kW; only 22 kW units require a masonry or non-combustible backing surface',
    ],
    correctAnswer: 1,
    explanation:
      'Wallbox mounting requires a stable, manufacturer-approved surface. Wooden fence panels typically lack the rigidity and fire performance for direct mounting. Solutions: (1) mount on a masonry wall behind the fence; (2) fix a non-combustible backboard (cement-fibre board, steel-faced panel) to fence posts (solid structural members) and mount the wallbox on the backboard; (3) move to a different location entirely. Manufacturer instructions are typically explicit about backboard requirements. Cert evidence bundle records the mounting method + backboard specification + photographs.',
  },
  {
    question:
      'A wallbox is being installed on a brick wall using the manufacturer-supplied bracket. The fixings supplied are M6 wall plugs. What’s the install practice?',
    options: [
      'Substitute the longest fixings available regardless of wall type, a deeper screw always beating the supplied M6 plug',
      'Drill oversized holes and pack them with filler before inserting the plugs, to grip the screw more firmly in soft brick',
      'Use the supplied or equivalent fixings rated for the wall material — brick plugs in masonry, cavity fixings in plasterboard',
      'Fix only the top two mounting points so the bracket can flex with thermal movement, leaving the lower fixings loose',
    ],
    correctAnswer: 2,
    explanation:
      'Fixings must match the wall material AND the manufacturer’s load specification. Solid brick / dense block: M6-M8 wall plugs as supplied. Plasterboard partition: cavity fixings (toggles, hollow-wall anchors) rated for the wallbox weight including cable load. Hollow concrete block: deeper fixings or through-bolts to a solid backing. Stone / mixed walls: drill carefully, may need resin / chemical fixings for reliable load. Wallbox manufacturer instructions usually specify the fixings or a minimum load rating. Cert evidence bundle records the fixing method + manufacturer reference.',
  },
  {
    question:
      'Where does Section 522 (external influences) interact with the wallbox install?',
    options: [
      'Section 522 applies only to the origin of the installation, not to final circuits such as a wallbox supply',
      'Section 522 governs only cable current-carrying derating, affecting sizing but not the IP or IK rating choice',
      'Section 522 sets external-influence requirements — water, solids, mechanical impact, corrosion, fauna, solar radiation',
      'Section 522 covers documentation and labelling, so its only wallbox interaction is the consumer-unit warning notice',
    ],
    correctAnswer: 2,
    explanation:
      'Section 522 of BS 7671 sets requirements for cables and equipment under external influences: ambient temperature (AA), presence of water (AD), presence of foreign solid bodies (AE), presence of corrosive substances (AF), mechanical stresses (AG), fauna (AL), solar radiation (AN). Outdoor wallbox: each category needs assessment. UK coastal install: corrosive atmosphere (AF code) drives stainless / galvanised hardware; UK rural install: fauna (rodent damage to exposed cabling); UK exposed installs: solar radiation degrades unprotected cable sheath. Cert evidence bundle records the assessment with the relevant Section 522 codes and the mitigations.',
  },
];

const faqs = [
  {
    question: 'Can the wallbox be in direct sun on a south-facing wall?',
    answer:
      'Manufacturer instructions are the primary source. Some wallboxes have explicit operating temperature ranges; direct sun on a south-facing wall in UK summer can reach surface temperatures 40-50°C. Wallboxes typically rated for -25°C to +50°C ambient. Practical UK 2025-26: south-facing wall mounting is acceptable for most wallbox models, but performance derating may apply in hot weather (wallbox throttles itself to protect internal electronics). Customer education: occasional summer throttling is normal and protects the kit. Cert evidence bundle records the wallbox operating temperature range from DoC.',
  },
  {
    question: 'What about coastal installs — sea spray and corrosion?',
    answer:
      'UK coastal sites (within ~1-5 km of coast, prevailing onshore wind) carry chloride-laden air that accelerates corrosion. Considerations: (1) wallbox housing material — manufacturer-specified for coastal use? Some brands have marine-grade variants; (2) cable gland material — stainless steel preferred over plain steel; (3) backboard / fixings — stainless / galvanised; (4) more frequent inspection intervals (annual rather than 5-year EICR for coastal sites). Reg 522 external influences (AF code — corrosive substances) drives the spec. Cert evidence bundle records the coastal site assessment + mitigations.',
  },
  {
    question: 'Is a roof / awning over the wallbox required?',
    answer:
      'Not required if the wallbox IP rating is appropriate for the site exposure. A simple lean-to roof or porch overhang can shift the site exposure from "fully exposed" to "sheltered", potentially allowing a lower IP rating wallbox. UK 2025-26 typical: wallbox IP54-IP65 makes a separate roof unnecessary; customer aesthetic preferences sometimes drive a roof anyway. If a roof is fitted, ensure it doesn’t trap heat (south-facing wallbox under a small roof can overheat in summer) or impede the manufacturer’s required clearances around the wallbox.',
  },
  {
    question: 'What\'s the typical cable route from indoor CU to outdoor wallbox?',
    answer:
      'Common UK 2025-26 routes: (1) through external wall — drill hole with weather-resistant sleeve, drip loop, seal; (2) under floor + up through wall — for ground-floor CU; (3) overhead through loft + down external wall in conduit / SWA — common where CU is on the opposite side of the property. For each route: cable type (T+E indoor, SWA outdoor section), entry/exit sealing, mechanical protection (steel conduit or SWA armour), fire separation if the wall is fire-rated. Cert evidence bundle records the cable route with photographs.',
  },
  {
    question: 'How is the wallbox-to-vehicle cable managed when not in use?',
    answer:
      'Manufacturer-supplied cable holster or hook is the typical UK 2025-26 standard. Tethered wallboxes (cable permanently attached to wallbox): integrated holster on the wallbox itself; cable wound back when not in use. Untethered wallboxes (socket on wallbox): cable lives in the vehicle’s boot; storage handled by customer. Customer education at handover: keep the cable up off wet ground when not connected; don’t allow vehicles to drive over the cable (mechanical damage); inspect cable annually for wear.',
  },
];

export default function RenewableEnergyModule6Section5() {
  const navigate = useNavigate();

  useSEO({
    title: 'Outdoor install — IP, location, mounting | Renewable Energy 6.5 | Elec-Mate',
    description:
      'Outdoor UK 2025-26 wallbox install — IP rating selection (typical IP54 / IP65), IK code per BS EN 62262, mounting height and accessibility, cable routing and wall penetration, fixings, Reg 522 external influences assessment, BS EN 62208 enclosures, BS EN IEC 61439-7 EV assemblies.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 5 · BS 7671:2018+A4:2026 · Reg 522 + 722.551.7.2 + BS EN 62262"
            title="Outdoor install — IP, location, mounting"
            description="The practical physical install of the outdoor wallbox: IP rating per BS EN 60529, IK code per BS EN 62262, mounting height + accessibility, cable routing + wall penetration, Reg 522 external influences assessment, manufacturer instructions integration."
            tone="yellow"
          />

          <TLDR
            points={[
              'IP rating per BS EN 60529 — first digit solid object ingress (5 = dust-protected, 6 = dust-tight); second digit water ingress (4 = splashing, 5 = jets, 6 = powerful jets). UK outdoor wallbox typical: IP54 minimum, IP65 for exposed sites.',
              'IK code per BS EN 62262:2002 +A1:2021 — mechanical impact protection. IK00 = no protection to IK10 = 20 J. Outdoor wallboxes typically IK08 (5 J) or IK10 (20 J).',
              'Reg 522 external influences — designer assesses ambient temperature (AA), water (AD), foreign solid bodies (AE), corrosive substances (AF, coastal sites), mechanical stress (AG), fauna (AL), solar radiation (AN).',
              'Mounting height: manufacturer-specified, typically 1.0-1.4 m above standing surface. Ergonomic plug-in height + cable strain relief + splash protection.',
              'Mounting surface: non-combustible solid backboard (masonry / cement-fibre / steel-faced). NOT directly on wooden fence panels or unstable surfaces. Manufacturer instructions explicit.',
              'Cable entry: IP-rated cable gland matched to cable diameter. T+E flat profile + SWA round profile have different glanding methods. Improper glanding defeats the wallbox’s IP rating.',
              'Wall penetration: weather sleeve / conduit + drip loop on exterior side + seal at both interior and exterior + mechanical protection through hollow walls + fire separation made good if fire-rated wall (per Approved Document B).',
              'BS EN 62208:2011 — empty enclosures for LV switchgear; BS EN IEC 61439-7:2023 — assemblies for specific applications including EV charging stations (relevant for commercial / public, less for single-wallbox domestic).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Select IP rating per BS EN 60529 based on Reg 522 external influences assessment of the actual site exposure.',
              'Select IK rating per BS EN 62262 for mechanical impact protection.',
              'Apply Reg 522 external influences codes (AA, AD, AE, AF, AG, AL, AN) to the outdoor wallbox install assessment.',
              'Choose mounting height per manufacturer instructions, balancing ergonomics, cable strain relief, splash protection and accessibility.',
              'Specify the mounting surface — non-combustible solid backboard; manufacturer-approved fixings rated for the wall material.',
              'Apply IP-rated cable glanding to maintain the wallbox’s factory IP rating at the cable entry.',
              'Plan wall penetration with weather sleeve, drip loop, seal, mechanical protection, and fire separation where applicable.',
              'Document the outdoor install in the cert evidence bundle — IP/IK ratings, mounting method, cable route, photographs.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            The IP rating only protects the wallbox if the install keeps it intact. Wrong glanding defeats the whole enclosure.
          </Pullquote>

          <ContentEyebrow>IP and IK ratings — the physical-protection spec</ContentEyebrow>

          <ConceptBlock
            title="IP rating selection per BS EN 60529"
            plainEnglish="IP (Ingress Protection) rating per BS EN 60529 is a two-digit code. First digit = solid object / dust protection (0-6). Second digit = water protection (0-9). Outdoor wallbox typical: IP54 (dust-protected, splashing water) for sheltered sites; IP65 (dust-tight, water jets) for fully exposed sites."
            onSite="Read the wallbox’s factory IP rating from the manufacturer DoC. The IP rating only holds if the install preserves it — cable entries, mounting orientation, manufacturer instructions all matter. A factory IP65 wallbox with badly-glanded cable entry = effective IP30 or worse."
          >
            <p>IP rating interpretation:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">First digit (solids)</strong> —
                0 = no protection; 4 = wires &gt; 1 mm; 5 = dust-protected
                (limited ingress, no harmful deposit); 6 = dust-tight
              </li>
              <li>
                <strong className="text-white">Second digit (water)</strong> —
                0 = no protection; 4 = splashing from any direction; 5 = jets;
                6 = powerful jets; 7 = temporary immersion; 8 = continuous
                immersion
              </li>
              <li>
                <strong className="text-white">UK outdoor wallbox
                  typical</strong> — IP54 (5+4) for sheltered sites (under
                eaves, side wall); IP65 (6+5) for exposed sites (windward,
                no overhang); IP66 (6+6) for fully exposed marine or
                industrial
              </li>
              <li>
                <strong className="text-white">Where IP rating fails</strong>
                — improper cable glanding, mounting orientation that allows
                water pooling near vents, customer modifications (drilled
                extra holes for cable routing), enclosure damage that
                breaks the seal
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong>
                — records the wallbox’s factory IP rating + the install’s
                cable glanding + photographs showing the entry is properly
                sealed
              </li>
            </ul>
          </ConceptBlock>

          <EvMountingZones caption="Mounting height and location rules for an outdoor chargepoint." />

          <ConceptBlock
            title="IK code per BS EN 62262:2002 +A1:2021"
            plainEnglish="IK code rates the enclosure’s resistance to mechanical impact. IK00 = no protection. IK10 = 20 J impact energy resistance. Outdoor wallbox: typically IK08 (5 J) or IK10 (20 J) — adequate for normal domestic driveway / curtilage."
            onSite="The IK rating matters for vandalism / accidental impact resistance. Driveway sites where vehicles can hit the wallbox: IK10 preferred. Side-of-house sites with no vehicle access: IK08 is fine. Some wallbox brands ship IK08 housing with IK10 protective cover available as accessory."
          >
            <p>IK code level summary:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">IK00-IK06</strong> — no
                protection to 1 J. Not used for outdoor EV
              </li>
              <li>
                <strong className="text-white">IK07</strong> — 2 J. Some
                indoor-mounted wallboxes
              </li>
              <li>
                <strong className="text-white">IK08</strong> — 5 J. Common
                UK 2025-26 outdoor wallbox housing rating
              </li>
              <li>
                <strong className="text-white">IK09</strong> — 10 J
              </li>
              <li>
                <strong className="text-white">IK10</strong> — 20 J. Premium /
                exposed-site wallboxes; some commercial / public charging kit
              </li>
              <li>
                <strong className="text-white">Reg 722.551.7.2</strong>
                cross-references BS EN 62262 for enclosure mechanical impact
                protection; the designer selects the rating appropriate to
                the site
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 522 (external influences) + Reg 722.551.7.2 + BS EN 62208 / BS EN 62262 / BS EN IEC 61439-7"
            clause="Wiring systems shall be selected and erected so as to be suitable for the external influences likely to be encountered (Section 522). Enclosures for EV charging equipment shall provide degrees of protection against external mechanical impacts per BS EN 62262 (IK code) and meet the general requirements of BS EN 62208 for LV switchgear enclosures. For assemblies (e.g. multi-wallbox commercial installs), BS EN IEC 61439-7:2023 covers assemblies for specific applications including EV charging stations."
            meaning="The physical install regulations cluster around external-influences assessment and enclosure standards. UK 2025-26 domestic install: pick a wallbox with appropriate IP/IK; verify the install method preserves these ratings (cable glanding, mounting orientation, manufacturer instructions). Section 522 sets the framework; BS EN 60529 (IP) and BS EN 62262 (IK) supply the test methods; BS EN 62208 covers empty enclosures generally; BS EN IEC 61439-7 covers multi-charger assemblies (commercial / public, M7 scope). Cert evidence bundle records the IP/IK ratings + the install’s preservation of them + the Reg 522 site assessment."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Mounting and physical install</ContentEyebrow>

          <Pullquote>
            Non-combustible backboard, manufacturer fixings, IP-rated glanding. Get these three right and the rest follows.
          </Pullquote>

          <ConceptBlock
            title="Mounting surface and backboard"
            plainEnglish="Wallbox manufacturers specify the mounting surface. Universal standard: non-combustible (masonry, cement-fibre board, steel-faced panel). Direct mounting on wood, plastic, or thin plasterboard is generally not acceptable for fire safety + structural stability + manufacturer warranty."
            onSite="Read the manufacturer install guide first. If the customer’s preferred mounting surface doesn’t qualify, add a non-combustible backboard fixed to the structural members of the wall (studs, masonry). The backboard takes the wallbox; the wall takes the backboard."
          >
            <p>Mounting surface options:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Solid masonry (brick /
                  block)</strong> — direct mounting with manufacturer
                supplied wall plugs. Most common UK 2025-26 domestic site
              </li>
              <li>
                <strong className="text-white">Solid concrete</strong> —
                concrete fixings (sleeve anchors, chemical resin). More
                cost / time than brick
              </li>
              <li>
                <strong className="text-white">Plasterboard partition</strong>
                — cannot mount directly. Cavity fixings inadequate for the
                wallbox load + vibration over time. Solution: cement-fibre
                board backboard fixed to studs; wallbox mounts on the
                board
              </li>
              <li>
                <strong className="text-white">Stud-and-board (timber stud
                  + plasterboard)</strong> — backboard onto studs, then
                wallbox on the backboard. Studs must align with the
                wallbox fixing points
              </li>
              <li>
                <strong className="text-white">External timber / wooden
                  fence</strong> — not acceptable for direct mounting.
                Non-combustible backboard fixed to fence posts (solid
                structural members), wallbox on the backboard. Or relocate
                to a masonry wall
              </li>
              <li>
                <strong className="text-white">Free-standing post</strong>
                — pre-fabricated EV-charging-post enclosures available
                from some manufacturers; concrete base + galvanised steel
                post + wallbox + protective shroud. Common where no wall
                is available
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong>
                — records mounting surface + backboard if used +
                manufacturer-approved fixings + photographs
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Mounting height and accessibility"
            plainEnglish="Manufacturer instructions are the primary source. Typical UK 2025-26 mounting height: 1.0-1.4 m above the standing surface — the Type 2 socket / connector at ergonomic adult chest height. Considerations: ergonomic plug-in; cable strain relief; splash protection; accessibility for users with reduced mobility."
            onSite="Mount at the manufacturer’s recommended height. If installing for a customer with reduced mobility (wheelchair user, limited reach), lower mounting (~0.9 m) makes plug-in easier. For commercial / public sites: Equality Act considerations may require accessible bays with specific mounting heights — covered in M7."
          >
            <p>Mounting height factors:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Ergonomic plug-in</strong> —
                ~1.0-1.3 m for typical adult; user not kneeling or
                stretching
              </li>
              <li>
                <strong className="text-white">Cable strain relief</strong>
                — cable hangs in a loop below the wallbox, not pulled
                straight from the socket. Strain on the Type 2 connector
                shortens its service life
              </li>
              <li>
                <strong className="text-white">Splash protection</strong>
                — socket above road-spray height during heavy rain. ~0.5
                m too low risks dirt + splash
              </li>
              <li>
                <strong className="text-white">Accessibility</strong> —
                reduced mobility users: ~0.9 m. Equality Act applies on
                commercial / public; less commonly applied domestic
              </li>
              <li>
                <strong className="text-white">Cable management</strong> —
                cable holster (tethered wallboxes) at appropriate height
                so the cable doesn’t drag on the ground when stowed
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong>
                — records mounting height + manufacturer instruction
                reference + customer-side accessibility considerations
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Cable routing and wall penetration"
            plainEnglish="The cable route from the indoor CU to the outdoor wallbox is a discrete design exercise. UK 2025-26 typical routes: through external wall; under floor + up; loft + down. Each route has water sealing, mechanical protection, fire separation and aesthetic considerations."
            onSite="Survey the cable route at quote stage. Identify wall penetrations, fire-rated wall crossings, hollow vs solid walls, accessibility for future maintenance. Specify cable type (T+E indoor, SWA outdoor section), conduit/sleeve where needed, gland method at each end."
          >
            <p>Wall penetration practice:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Through external wall</strong>
                — drill correct diameter hole, insert weather sleeve
                (typically grey PVC conduit length ~150 mm), drip-loop the
                cable downward on the exterior side, seal both interior
                and exterior with fire-rated mastic / silicone
              </li>
              <li>
                <strong className="text-white">Drip loop on exterior</strong>
                — cable forms a downward U on the outside before entering
                the wall. Rainwater running along the cable drips off at
                the bottom of the loop, NOT tracking into the wall
              </li>
              <li>
                <strong className="text-white">Fire separation</strong> —
                fire-rated walls (party walls, garage-to-dwelling) need
                fire-rated mastic at the penetration. Approved Document B
                governs the fire performance requirements
              </li>
              <li>
                <strong className="text-white">Mechanical protection</strong>
                — hollow walls: steel sleeve through cavity to prevent
                rodent / accidental damage. Low-density blocks: steel
                conduit. Mechanical impact zones (where ladders / garden
                tools could hit cable): steel conduit
              </li>
              <li>
                <strong className="text-white">Outdoor cable type</strong>
                — 6 mm² SWA typical for the outdoor section; T+E indoor.
                The transition between cable types happens at a junction
                box or at the wallbox itself (some wallboxes accept either
                directly)
              </li>
              <li>
                <strong className="text-white">Glanding at the
                  wallbox</strong> — IP-rated cable gland matched to
                cable diameter. T+E flat cable needs flat-profile gland or
                converter
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Mechanical impact and BS EN IEC 61439-7 assemblies</ContentEyebrow>

          <Pullquote>
            Vehicle strike protection is real on driveway installs. A bollard or kerb costs less than a replacement wallbox + diagnosis.
          </Pullquote>

          <ConceptBlock
            title="Vehicle strike protection on driveway installs"
            plainEnglish="A driveway-mounted wallbox is in real danger from accidental vehicle impact — reversing into the wallbox, mis-parking, contractor vehicles. BS EN 62262 IK10 housing rates the unit to 20 J impact energy — adequate for hand tools / wind-blown debris but NOT a slow-moving vehicle (a 1.5-tonne car at 5 km/h carries ~1,400 J)."
            onSite="Physical barriers are the practical answer where vehicles can reach the wallbox. Common UK 2025-26 solutions: galvanised steel bollard 150-300 mm in front of the wallbox; concrete kerb / parking stop at the parking-bay limit; mount the wallbox on a free-standing pole offset from vehicle approach. Cert evidence bundle records the strike-protection arrangement."
          >
            <p>Strike-protection options:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Steel bollard</strong> — galvanised
                steel, concreted into ground, 0.6-1.0 m above ground. Sized to absorb / deflect vehicle strike. Common UK 2025-26 install where space allows
              </li>
              <li>
                <strong className="text-white">Concrete parking
                  stop / kerb</strong> — pre-cast concrete kerb at parking-bay limit;
                low-cost; defines the parking position so the customer’s wheel hits the kerb before the wallbox
              </li>
              <li>
                <strong className="text-white">Mount offset from vehicle
                  approach</strong> — wallbox on the side wall of the garage rather than the back wall; vehicle can’t roll into it
              </li>
              <li>
                <strong className="text-white">Free-standing pole</strong> —
                pre-fabricated EV charging post on concrete base; steel column protects the wallbox; offset from the parking position
              </li>
              <li>
                <strong className="text-white">Customer education</strong> — at
                handover, demonstrate the parking position relative to the wallbox; recommend a reverse-parking sensor / camera if the vehicle doesn’t have one
              </li>
              <li>
                <strong className="text-white">Cert evidence bundle</strong> —
                records the strike-protection arrangement; photographs show the bollard / kerb / offset
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 522 (external influences) + BS EN 62208 + BS EN IEC 61439-7"
            clause="Wiring systems and electrical equipment shall be suitable for the external influences likely to be encountered. Enclosures shall meet relevant general requirements (BS EN 62208 for empty enclosures). For low-voltage switchgear and controlgear assemblies for specific applications including EV charging stations, BS EN IEC 61439-7:2023 applies."
            meaning="Three layered standards apply to the outdoor wallbox install. Reg 522 sets the regulatory requirement to assess external influences (water, solids, mechanical impact, corrosion, fauna, solar radiation). BS EN 62208 covers empty enclosure general requirements (used as the base standard before EV-specific assembly standards). BS EN IEC 61439-7:2023 covers assemblies for specific applications including EV charging stations — relevant when multiple wallboxes are housed in a single assembly (commercial / public; M7 scope) but referenced for single-wallbox installs too. Cert evidence bundle records the standards stack + the Reg 522 site assessment."
          />

          <SectionRule />

          <Scenario
            title="UK suburban customer — sheltered driveway install"
            situation="Midlands semi-detached, integral garage on the south side of the property, customer wants the wallbox on the external side of the garage wall. The position is sheltered by the garage roof overhang (1 m projection). Site exposure: sheltered. Cable run from interior CU: ~3 m through the integral garage internal wall, no fire-rated wall crossings, internal cable in trunking."
            whatToDo="Reg 522 external influences assessment: AD3 (occasional splashing); AE3 (sized to small/medium objects, no significant solids); AG1 (low mechanical impact, no vehicle access likely). IP rating: IP54 wallbox sufficient (sheltered site). IK rating: IK08 sufficient. Cable: 6 mm² T+E in trunking from CU to internal garage wall; 1 m of 6 mm² SWA through wall to wallbox (mechanical protection + weather sleeve at penetration). Drip loop on external side. IP-rated gland at wallbox entry. Mounting: solid brick wall, manufacturer M6 wall plugs, mounting height 1.2 m to Type 2 socket. Manufacturer-supplied tethered cable on the wallbox. Cert evidence bundle: photographs of mounting + cable entry + drip loop; manufacturer DoC for IP54 / IK08 ratings; Reg 522 site assessment with code references."
            whyItMatters="Bread-and-butter UK 2025-26 sheltered install. The sheltered site allows IP54 / IK08 (cheaper end of the wallbox spec). The integral garage cable route avoids fire-rated wall crossings (no Approved Document B fire separation work needed beyond standard practice). Cert evidence bundle is straightforward. Customer-side considerations met: ergonomic mounting height, cable strain relief, weather protection."
          />

          <Scenario
            title="Fully-exposed coastal install"
            situation="Customer in a Cornish coastal village, ~500 m from the sea. Property is detached with a north-facing wall facing the prevailing wind. No garage; the wallbox must be on the external wall, fully exposed to driving rain + sea-salt-laden air."
            whatToDo="Reg 522 external influences: AD5 (heavy splash + driving rain); AE3-AE4 (foreign solids including salt deposits); AF3 (corrosive substances — coastal chloride); AG2 (medium mechanical risk — wind-blown debris); AN3 (high solar radiation, salt-air UV). Spec: IP65 minimum, IP66 preferred. IK10 housing. Marine-grade or coastal-specified wallbox model (some brands have explicit “coastal” SKUs with corrosion-resistant fasteners and seals). Cable: 6 mm² SWA throughout outdoor section (no T+E exposed). Stainless steel fixings + cable glands. Drip loop + double-seal at wall penetration. Mounting: solid masonry only; cement-fibre backboard if surface is unsuitable. Inspection interval: annual visual + 5-year EICR (more frequent than inland sites). Cert evidence bundle: detailed site exposure assessment per Reg 522 codes; marine-grade kit DoC; mitigations + photographs."
            whyItMatters="Coastal installs are real edge cases in UK 2025-26. The chloride exposure accelerates corrosion of standard kit by 5-10× compared to inland sites. The investment in marine-grade kit + stainless fixings pays back in service life. Cert evidence bundle records the coastal assessment so the next inspector knows why the kit selection looks different from standard inland."
          />

          <CommonMistake
            title="Mounting the wallbox directly on a wooden fence panel"
            whatHappens="Customer asks for the wallbox on a fence next to the driveway because it’s the easiest cable route. Installer mounts it directly on the fence panel using long screws. Six months later, the fence flexes in wind; the wallbox housing cracks at the mounting points; water ingress starts; the customer’s install gets a Code C2 on EICR for compromised IP rating + structural mounting failure."
            doInstead="Wallbox manufacturers explicitly require a non-combustible solid mounting surface. Wooden fence panels flex too much and aren’t fire-rated. Solutions: (1) mount on the masonry wall behind the fence (typical UK driveway has both fence and house wall); (2) fix a cement-fibre backboard to fence POSTS (solid structural members), not panels, then mount the wallbox on the backboard; (3) install a free-standing EV-charging post with concrete base. Cert evidence bundle records the mounting method + photographs."
          />

          <CommonMistake
            title="Skipping the drip loop on the external cable entry"
            whatHappens="Installer drills a wall hole at horizontal level with the wallbox and pushes the cable straight through. No drip loop on the outside. Rain runs along the cable, into the wall hole, and then along the cable inside the wall cavity. Three years later, the customer notices water staining on the interior wall, then a damp patch. Investigation reveals water has been tracking along the cable into the wall, soaked into the insulation, and started causing cosmetic damage to the interior."
            doInstead="ALWAYS form a drip loop on the external side. The cable enters the wall ABOVE its exit point on the wallbox side, forms a downward U-shape on the outside, then enters the wall below the loop. Rainwater runs down the cable, drips off at the bottom of the loop, and never approaches the wall hole. Combine with: weather sleeve through the wall; sealant at both interior and exterior. The drip loop costs nothing extra at install but prevents long-term damp damage. Cert evidence bundle records the cable route + drip loop photograph."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'IP rating per BS EN 60529 selected per Reg 522 external influences assessment. UK 2025-26 outdoor wallbox: IP54 sheltered, IP65 exposed, IP66 marine.',
              'IK code per BS EN 62262 — mechanical impact protection. IK08 (5 J) typical UK outdoor; IK10 (20 J) for driveway / public sites where vehicle / debris impact possible.',
              'Reg 522 external influences codes: AA (ambient temp), AD (water), AE (foreign solids), AF (corrosive — coastal), AG (mechanical), AL (fauna), AN (solar radiation).',
              'Mounting height: manufacturer-specified, typically 1.0-1.4 m to the Type 2 socket. Ergonomic, cable strain relief, splash protection, accessibility.',
              'Mounting surface: non-combustible solid (masonry / cement-fibre board / steel-faced panel). NOT direct on wooden fence panels, plasterboard, or unstable surfaces.',
              'Fixings: manufacturer-supplied or equivalent rated. M6-M8 wall plugs in solid brick; cavity fixings inadequate for wallbox load; chemical resin for stone / mixed walls.',
              'Cable glanding: IP-rated gland matched to cable diameter. T+E flat profile + SWA round profile have different glanding requirements. Improper gland defeats wallbox’s factory IP rating.',
              'Wall penetration: weather sleeve through wall + drip loop on exterior + seal at both sides + fire-rated mastic for fire-rated walls (Approved Document B).',
              'Outdoor cable section: 6 mm² SWA typical (mechanical protection + UV resistance). Indoor section: 6 mm² T+E. Transition at wallbox or junction box.',
              'BS EN 62208 — empty enclosures for LV switchgear. BS EN IEC 61439-7:2023 — multi-wallbox assemblies (commercial / public, M7 scope).',
              'Cert evidence bundle: IP/IK ratings + manufacturer DoC + Reg 522 site assessment + mounting method + cable route + photographs.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 5 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-6-section-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Cable, RCBO & dedicated final circuit
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-6-section-6')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.6 Connector, CP/PP & dynamic load management
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
