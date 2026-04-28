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
  AmendmentBadge,
  RegBadge,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm7s1-zone-definitions',
    question:
      'A homeowner has a 1700 mm long rectangular bath against a wall. You are designing the lighting. Where does Zone 1 end and Zone 2 begin in BS 7671 terms?',
    options: [
      'Zone 1 is the inside of the bath; Zone 2 starts immediately above the rim and extends 1.2 m horizontally',
      'Zone 1 extends from the rim of the bath upwards to a height of 2.25 m above the finished floor level (and across the full footprint of the bath); Zone 2 then extends a further 0.6 m horizontally outwards from Zone 1, up to the same 2.25 m height',
      'Zone 1 is 0.6 m around the bath at floor level; Zone 2 sits above it',
      'There are no zones in domestic bathrooms — only in commercial pools',
    ],
    correctIndex: 1,
    explanation:
      'Reg 701.32 defines the zones. Zone 0 is the interior volume of the bath / shower basin. Zone 1 is bounded by Zone 0, the floor, and the horizontal plane 2.25 m above the finished floor level (or above the lowest fixed shower head where higher). Zone 2 extends 0.6 m horizontally outwards from Zone 1 and up to the same 2.25 m height. Above 2.25 m is unzoned and treated as a normal location.',
  },
  {
    id: 'm7s1-ip-zone1',
    question:
      'A wall-mounted luminaire is being fitted directly above the shower head, well within Zone 1. What is the minimum IP rating required by BS 7671?',
    options: [
      'IPX2 — protection against dripping water at 15 degrees',
      'IPX4 — protection against splashing water from any direction',
      'IPX5 — protection against jets of water',
      'IPX7 — protection against temporary immersion',
    ],
    correctIndex: 1,
    explanation:
      'Section 701 sets minimum IP ratings by zone. Zone 0 (inside the bath) requires IPX7 (immersion). Zone 1 (above the bath / shower up to 2.25 m) requires IPX4 (splashing). Zone 2 also requires IPX4. Where water jets are used for cleaning (commercial showers, public facilities), IPX5 is required throughout zones 1 and 2. The rating is a minimum — fitting higher (IPX5, IPX7) is always permitted.',
  },
  {
    id: 'm7s1-supplementary-bonding-omission',
    question:
      'You are testing an existing domestic bathroom. There is no supplementary bonding strap between the radiator and the bath taps. Under what conditions can supplementary bonding be omitted, per Reg 701.415.2?',
    options: [
      'Whenever the bathroom has been built since the 17th edition',
      'When ALL THREE of the following are true: every circuit in the bathroom meets its disconnection time per Reg 411.3.2; every circuit has 30 mA RCD additional protection; and all extraneous-conductive-parts in the location are bonded back to the MET via main protective bonding',
      'When the bathroom has at least one 30 mA RCD',
      'When the bath is plastic',
    ],
    correctIndex: 1,
    explanation:
      'Reg 701.415.2 lists three conditions and ALL THREE must be satisfied: (i) Reg 411.3.2 disconnection times met, (ii) every circuit in the bathroom has 30 mA RCD additional protection, (iii) all extraneous-conductive-parts in the location are reliably connected by main protective bonding (Reg 411.3.1.2) to the MET. Miss any one — supplementary bonding goes back in, sized per Reg 544.2 (4 mm² minimum unprotected, 2.5 mm² minimum protected).',
  },
  {
    id: 'm7s1-411-3-4-bathroom',
    question:
      'You are installing four IP65 LED downlights in a domestic bathroom ceiling, all clearly outside Zone 2. Under BS 7671:2018+A4:2026, do they need 30 mA RCD additional protection?',
    options: [
      "No — they're outside the bathroom zones, so Section 701 doesn't apply",
      'Yes — Reg 411.3.4 (new in A4) mandates 30 mA RCD additional protection on every AC final circuit supplying luminaires in domestic premises, and that overrides the zone argument',
      'Only if the homeowner has small children',
      'Only if the supply is TT',
    ],
    correctIndex: 1,
    explanation:
      "Two separate rules push the same conclusion. (1) Reg 411.3.4, new in A4, requires 30 mA RCD additional protection on AC final circuits supplying luminaires in domestic premises — full stop, every dwelling, every luminaire circuit. (2) Reg 701.411.3.3 separately requires 30 mA RCD additional protection on every low-voltage circuit serving a location containing a bath or shower. Either reg alone makes it mandatory; the bathroom-zones argument can't override either.",
  },
  {
    id: 'm7s1-pool-zone0-selv',
    question:
      'You are designing underwater lighting for a private swimming pool. The luminaires sit inside the pool, fully submerged. What voltage and source requirements apply per Section 702?',
    options: [
      '230 V AC with a 30 mA RCD',
      'SELV at 12 V AC RMS or 30 V DC ripple-free maximum, with the safety isolating source located OUTSIDE zones 0 and 1',
      'PELV at 50 V AC',
      'FELV at any voltage as long as the casing is metal',
    ],
    correctIndex: 1,
    explanation:
      'Reg 702.410.3.4.1 / 702.55 limits Zone 0 of a swimming pool (the volume containing the water) to SELV at a NOMINAL voltage not exceeding 12 V AC RMS or 30 V DC ripple-free — half the voltage of the general SELV upper limit, because the pool environment is wet, immersed and shared with bathers. The safety isolating transformer (BS EN 61558-2-6) MUST be installed outside zones 0 and 1, with the SELV cabling brought into Zone 0 only as the supply to the luminaire itself.',
  },
  {
    id: 'm7s1-sauna-section-703',
    question:
      'A hotel is fitting a small electric sauna heater in a treatment room. Which Section of BS 7671 applies, and what additional-protection requirement is mandatory on every sauna circuit?',
    options: [
      'Section 701 — IPX4 throughout',
      'Section 702 — SELV at 12 V',
      'Section 703 — sauna and sauna-heater locations: every low-voltage circuit serving the sauna location must have 30 mA RCD additional protection (Reg 703.411.3.3), and equipment must be selected for the temperatures of each sauna zone (zones 1, 2, 3)',
      'Section 704 — construction sites',
    ],
    correctIndex: 2,
    explanation:
      'Section 703 covers rooms and cabins containing sauna heaters. Reg 703.411.3.3 mandates 30 mA RCD additional protection on every circuit in the sauna location. Section 703 defines three temperature zones around the heater (zones 1, 2 and 3) — equipment must be rated for the maximum air temperature it will see. Wiring within the sauna room is restricted to that needed to supply equipment within the room.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which option correctly maps the IP rating to each bathroom zone under Section 701 of BS 7671?',
    options: [
      'Zone 0: IPX4. Zone 1: IPX4. Zone 2: IPX2.',
      'Zone 0: IPX7. Zone 1: IPX4. Zone 2: IPX4.',
      'Zone 0: IP65. Zone 1: IP44. Zone 2: IP20.',
      'Zone 0: IPX5. Zone 1: IPX5. Zone 2: IPX5.',
    ],
    correctAnswer: 1,
    explanation:
      'Section 701 minimums: Zone 0 IPX7 (immersion, because it is inside the bath / shower basin), Zone 1 IPX4 (splashing), Zone 2 IPX4 (splashing). Where water jets are used for cleaning, the requirement uplifts to IPX5 throughout zones 1 and 2. The rating is a floor — higher IP is always permitted.',
  },
  {
    id: 2,
    question:
      'Reg 701.415.2 allows supplementary equipotential bonding to be omitted from a bathroom only when three conditions are met. Which option lists them correctly?',
    options: [
      'A 30 mA RCD on the bathroom lighting circuit, a Type B MCB and a CPC of 1.5 mm squared',
      'All circuits in the location meet their Reg 411.3.2 disconnection times; all circuits have 30 mA RCD additional protection; all extraneous-conductive-parts are connected by main protective bonding to the MET',
      'The bath is plastic, the floor is tiled and the walls are painted',
      'The dwelling is post-2018, has a metal CU and a Type AC RCD',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 701.415.2 sets out three cumulative conditions. All three must be true; missing any one means supplementary bonding stays in the design. Even with bonding omitted, main protective bonding to the MET (Reg 411.3.1.2) is unaffected — supplementary bonding is the layer that may be removed, not the main bonding layer.',
  },
  {
    id: 3,
    question:
      'A 1980s flat is being modernised. The bathroom currently has a non-RCD-protected lighting circuit and a non-RCD-protected immersion-heater circuit. Both share the same dwelling consumer unit. Under BS 7671:2018+A4:2026, what is the minimum design change required to comply with Section 701 and Reg 411.3.4?',
    options: [
      'Add a single 100 mA time-delayed RCD at the origin and leave the circuits as-is',
      'Provide 30 mA RCD additional protection (RCBO or RCD) on every circuit serving the bathroom, including lighting; under Reg 411.3.4 the lighting circuit additionally needs 30 mA cover wherever it runs in the dwelling, and Reg 701.411.3.3 requires 30 mA on every circuit in the location',
      'Move all circuits to a separate sub-board fed via Type AC RCD',
      'Replace the bath with a shower and the rules no longer apply',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 701.411.3.3 requires 30 mA RCD additional protection on every low-voltage circuit serving a location containing a bath or shower — that includes the immersion-heater circuit. Reg 411.3.4 (A4) independently mandates 30 mA cover on every AC final circuit supplying luminaires in domestic premises. The cleanest way to deliver both is per-circuit RCBOs at the consumer unit. A single 100 mA time-delayed RCD at the origin is selectivity / discrimination, not additional protection — 30 mA is the threshold.',
  },
  {
    id: 4,
    question: 'Which item of equipment is permitted directly within Zone 1 of a domestic bathroom?',
    options: [
      'A standard 13 A BS 1363 socket-outlet',
      'A general-purpose 230 V double socket-outlet',
      'A fixed water heater, a fixed luminaire or a fixed ventilation fan, where IP rated to at least IPX4 and protected by 30 mA RCD additional protection — provided the equipment is suitable for use in the zone per Section 701',
      'Anything plug-in, as long as the lead is at least 2 m long',
    ],
    correctAnswer: 2,
    explanation:
      'Zone 1 permits fixed equipment such as luminaires, water heaters and ventilation fans, suitable for use in a wet zone, IPX4 minimum, with 30 mA RCD additional protection. Standard socket-outlets (BS 1363) are not permitted in Zones 0, 1 or 2 (Reg 701.512.3) — the only socket permitted within the zones is a SELV socket or a shaver supply unit complying with BS EN 61558-2-5, and the latter must be located at least 0.6 m from a bath / shower, which in practice puts it outside Zone 2.',
  },
  {
    id: 5,
    question:
      'Section 702 (swimming pools) defines its own zones — these are NOT identical to Section 701. Which option correctly summarises Section 702 Zone 0 and Zone 1?',
    options: [
      'Zone 0 is 0.6 m around the pool; Zone 1 is anywhere in the pool building',
      'Zone 0 is the volume containing the water (the basin); Zone 1 extends 2 m horizontally outwards from the rim, and 2.5 m vertically upwards from any walkable surface within Zone 1',
      'Zone 0 is the changing rooms; Zone 1 is the spectator gallery',
      'Section 702 has no zones — it just requires IPX4 throughout',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 702.32 defines the swimming-pool zones. Zone 0 is the interior of the basin, including any niches and steps in the pool wall. Zone 1 extends 2 m horizontally from the rim of the pool and 2.5 m vertically upwards from any walkable surface within that zone. Zone 2 then extends a further 1.5 m horizontally beyond Zone 1. The geometry is genuinely different from a bathroom — do NOT apply Section 701 numbers to a pool job.',
  },
  {
    id: 6,
    question:
      'A new bathroom installation is being certified on EIC. Which combination of cert entries demonstrates Section 701 compliance?',
    options: [
      'Tick "supplementary bonding present" only and move on',
      'Tick "supplementary bonding present" OR record its omission against Reg 701.415.2 conditions; record IP rating per zone for each item of equipment; record 30 mA RCD operating times for every circuit serving the location; record main protective bonding continuity to the MET',
      'Record the bathroom postcode and floor area only',
      'A note in the EIC comments box is sufficient — schedule entries are optional',
    ],
    correctAnswer: 1,
    explanation:
      'The EIC schedule of inspection and schedule of test results both have to reflect the Section 701 design. If supplementary bonding is omitted, the omission needs an explicit note tied to Reg 701.415.2 (with the three conditions evidenced). RCD operating times at IΔn and 5IΔn evidence Reg 701.411.3.3 (and Reg 411.3.4 for luminaire circuits). IP ratings are recorded per item of equipment. Main protective bonding continuity is the third leg under Reg 411.3.1.2.',
  },
  {
    id: 7,
    question:
      'A holiday cottage has a freestanding bath in the middle of a 4 m by 3 m bathroom — no wall against any of the long sides. How does this affect the zones?',
    options: [
      'There are no zones because the bath is freestanding',
      'Zone 1 is the volume above the bath up to 2.25 m; Zone 2 wraps around the WHOLE bath as a 0.6 m horizontal band — every accessible side of the bath gets its own Zone 2',
      'Only the side facing the door is zoned',
      'The room is treated as one big Zone 1',
    ],
    correctAnswer: 1,
    explanation:
      'Section 701 zones are defined by the bath / shower geometry, not by walls. A freestanding bath has Zone 2 wrapping all the way around its perimeter — every side that an occupant could splash water from. This catches more equipment than the wall-against-bath case, and is the typical reason a luxury bathroom design needs to push sockets, switches and decorative wall lights further from the bath than the customer expects.',
  },
  {
    id: 8,
    question:
      'Which one of the following installations would be coded C2 (potentially dangerous) on an EICR of a domestic bathroom?',
    options: [
      'A 13 A BS 1363 socket-outlet inside Zone 2 — there is no permitted exception for a standard socket within a bathroom zone, and the absence of zone-appropriate protection is a real shock-risk',
      'A pendant luminaire mounted at 2.6 m above floor level, well outside any zone',
      'A shaver supply unit BS EN 61558-2-5 fitted at 1.0 m from the bath',
      'A surface-mounted IPX5 ventilation fan in Zone 2',
    ],
    correctAnswer: 0,
    explanation:
      'A standard 13 A BS 1363 socket-outlet inside a bathroom zone is a Reg 701.512.3 contravention with a real shock-risk profile, normally coded C2 on an EICR. A pendant above 2.25 m is outside the zones. A shaver supply unit BS EN 61558-2-5 is permitted (its isolating transformer is the safety measure). A surface IPX5 fan in Zone 2 exceeds the IPX4 minimum and is fine.',
  },
];

const faqItems = [
  {
    question: 'Where exactly is the Zone 1 / Zone 2 boundary if the shower has no tray?',
    answer:
      'Reg 701.32.2 covers the wet-area shower case. Where there is no tray, Zone 1 is taken as the volume bounded by the floor, the walls (or the vertical plane 1.2 m from the fixed shower head if there are no walls within that distance), and a horizontal plane 2.25 m above the finished floor level. Zone 2 is then 0.6 m outside Zone 1. The 1.2 m default is a designer decision: if the customer pulls the rose to a different bracket or wand position, the zones move with it — design for the worst case.',
  },
  {
    question: 'Can I put a 230 V socket-outlet in a bathroom at all in 2026?',
    answer:
      'Reg 701.512.3 prohibits standard 230 V socket-outlets (BS 1363, 16 A IEC 60309 etc.) anywhere in zones 0, 1 or 2. The only outlets permitted within the zones are: SELV outlets to BS EN IEC 60309-2 (where SELV applies); shaver supply units to BS EN 61558-2-5 (which contain a safety isolating transformer). Outside the zones — i.e. more than 0.6 m horizontal from the bath / shower and either above 2.25 m or beyond Zone 2 — a normal RCD-protected 13 A socket can be fitted. In small bathrooms (under approx. 3 m by 2 m), a normal socket outside the zones is often physically impossible — design accordingly.',
  },
  {
    question: 'Does Reg 411.3.4 (A4 luminaire RCD) override the more specific bathroom rules?',
    answer:
      'No — they sit on top of each other. Reg 411.3.4 makes 30 mA RCD additional protection mandatory on every AC final circuit supplying luminaires in a domestic dwelling, full stop. Reg 701.411.3.3 separately requires 30 mA RCD on every low-voltage circuit serving a location containing a bath or shower — that catches non-luminaire circuits too (immersion heater, towel rail, extractor fan, shaver point). In a domestic bathroom the practical answer is the same: every circuit that touches the bathroom is on a 30 mA device. In commercial premises, only Reg 701.411.3.3 applies (Reg 411.3.4 is scoped to domestic).',
  },
  {
    question: 'Why is the SELV limit in pool Zone 0 only 12 V AC, when general SELV is 50 V AC?',
    answer:
      "Reg 702.410.3.4.1 / 702.55 reduces the Zone 0 limit to 12 V AC RMS or 30 V DC ripple-free because pool occupants are simultaneously immersed in a conductive medium and gripping equipment. The body's resistance is dramatically reduced when wet and immersed; the threshold for ventricular fibrillation is far lower. The reduced limit is a body-physiology number, not an electrical-engineering convenience.",
  },
  {
    question: 'Are ceiling-mounted bathroom heaters and towel rails caught by Section 701?',
    answer:
      "Yes. Reg 701.512.2 lists permitted equipment by zone. Fixed water heaters, fixed-connected towel rails, fixed ventilation fans and fixed luminaires can all be installed within Zones 1 and 2 provided they are suitable for the zone (IPX4 minimum, IPX5 where water jets are used) and protected by 30 mA RCD additional protection. The 'fixed' word matters — a plug-in towel rail with a flex through Zone 2 is not the same product, even if it looks similar.",
  },
  {
    question: 'How does Section 703 differ from a normal "hot dry environment" install?',
    answer:
      'Section 703 covers rooms and cabins containing sauna heaters. The location is divided into three sauna-specific zones (zones 1, 2 and 3) by horizontal planes, and equipment in each zone must be rated for the maximum AIR TEMPERATURE the zone will see (e.g. 125 degrees C immediately around the heater). Wiring is restricted to that needed for sauna equipment in the room. Reg 703.411.3.3 mandates 30 mA RCD additional protection on every low-voltage circuit serving the sauna location. The combination of high temperature + skin moisture + close proximity to fixed metalwork is why Section 703 exists at all.',
  },
  {
    question:
      'A customer wants underwater lighting in a hot tub on a domestic decking. Section 702 or Section 701?',
    answer:
      'Section 702 also covers basins for general use of which the water has a depth of greater than 0.3 m and which are intended to be occupied by people during use — so a fixed hot tub falls under Section 702, not Section 701. The pool-zone geometry, the 12 V AC SELV-in-Zone-0 limit and the requirement to keep safety-isolating sources outside Zone 1 all apply.',
  },
  {
    question:
      'Is RCD additional protection enough on its own — can I drop main bonding in a modern bathroom?',
    answer:
      'No. Reg 701.415.2 only allows omission of SUPPLEMENTARY equipotential bonding within the location. Main protective bonding (Reg 411.3.1.2) of incoming services — gas, water, oil, structural metal — back to the MET is independent and is NOT optional. The supplementary-bonding omission is conditional on main bonding being in place; the two layers are not interchangeable.',
  },
  {
    question: 'A hotel pool refurb — which regs change vs a private pool?',
    answer:
      'Section 702 still applies, but a hotel pool sits in a higher-traffic, ordinary-persons-with-children environment. Specific tightening points: BA1 / BA2 / BA3 occupant categories may apply (untrained / disabled bathers); commercial pools usually require IPX5 in Zones 1 and 2 because cleaning involves water jets; emergency lighting design (BS 5266) overlays Section 702; and the disabled-bather emergency-stop and pool-alarm circuits become safety-related rather than convenience features. The zone geometry is unchanged.',
  },
];

const BS7671Module7Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title:
      'Locations Requiring Additional Precautions — Bathrooms, Pools, Saunas | BS 7671:2018+A4:2026 | Module 7.1',
    description:
      'Section 701 / 702 / 703 of BS 7671:2018+A4:2026 — bathroom and shower zones, pool zones, sauna heaters. IP ratings, RCD additional protection, supplementary equipotential bonding omission, SELV in pool Zone 0.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-7')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 7
          </button>

          <PageHero
            eyebrow="Module 7 · Section 1"
            title="Locations requiring additional precautions (bathrooms, pools)"
            description="How BS 7671:2018+A4:2026 treats wet, immersed and high-touch-current locations — Section 701 (bath / shower), Section 702 (swimming pools), Section 703 (sauna heaters). Zones, IP ratings, RCDs, supplementary bonding omission and the way A4's Reg 411.3.4 layers on top."
            actions={
              <>
                <RegBadge>701.32</RegBadge>
                <RegBadge>701.415.2</RegBadge>
                <RegBadge>702.32</RegBadge>
                <AmendmentBadge regs={['411.3.4']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'Section 701 (bath / shower), Section 702 (pools / hot tubs / fountains) and Section 703 (sauna heaters) are "special locations" — Part 7 layers extra rules on top of Parts 1 to 6.',
              'Bathroom zones (Reg 701.32): Zone 0 = inside the bath / shower basin (IPX7). Zone 1 = above the bath / shower up to 2.25 m above FFL (IPX4). Zone 2 = a 0.6 m horizontal extension of Zone 1 (IPX4).',
              'Reg 701.411.3.3 requires 30 mA RCD additional protection on every low-voltage circuit serving a bathroom. Reg 411.3.4 (A4, new) independently requires it on every domestic luminaire circuit.',
              'Reg 701.415.2 lets supplementary equipotential bonding be OMITTED only if all three conditions are met: disconnection times met, every circuit on a 30 mA RCD, all extraneous-conductive-parts bonded to the MET.',
              'Section 702 pools have their own zones (Reg 702.32) and tighter SELV limits in Zone 0 (12 V AC RMS / 30 V DC ripple-free, source kept OUTSIDE zones 0 and 1).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define Section 701 zones (Zone 0, Zone 1, Zone 2) using Reg 701.32 and apply them correctly to wall-against-bath, freestanding bath, and shower-without-tray cases.',
              'State the minimum IP rating for equipment in each bathroom zone and uplift correctly where water jets are used for cleaning (commercial showers).',
              'List which equipment is permitted in each bathroom zone (luminaires, switches, sockets, transformer-fed gear) and identify common Reg 701.512 contraventions.',
              'Apply Reg 701.415.2 to decide whether supplementary equipotential bonding can be omitted in a domestic bathroom — checking all three conditions evidentially.',
              'Distinguish Section 702 (pool) zones from Section 701 (bath) zones, and apply the 12 V AC / 30 V DC ripple-free SELV limit in pool Zone 0.',
              'State Section 703 (sauna) zone definitions and the Reg 703.411.3.3 RCD requirement.',
              'Layer Reg 411.3.4 (A4 domestic luminaire RCD) on top of Section 701 / 703, recognising that the regs stack rather than override one another.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why "special locations" exist at all</ContentEyebrow>

          <ConceptBlock
            title="Wet, immersed, gripping metal — where the body becomes part of the circuit"
            plainEnglish="The body's resistance drops massively when skin is wet and the person is in physical contact with grounded metal. Touch-current that the user wouldn't even feel in a kitchen can cause ventricular fibrillation in a bathtub or pool."
            onSite="Part 7 isn't decorative — it exists because the threshold for harm is lower in these locations. The general regs assume a person standing on a dry floor in shoes; the special-location regs assume the worst-case body wet and immersed."
          >
            <p>
              Part 7 of BS 7671 covers <strong>special installations or locations</strong> —
              Sections 701 to 753. The thread that links bathrooms, pools, saunas, fountains,
              marinas and construction sites is that the standard touch-current model from Chapter
              41 no longer describes the worst-case occupant. In a bathroom the bather is wet, often
              gripping fixed metal taps and standing on a damp floor. In a pool, occupants are
              immersed in a conductive medium and may be partly out of the water gripping a metal
              grab rail. In a sauna, skin is hot and wet. The reduced body resistance moves the line
              at which electrical injury occurs, so Part 7 layers <em>additional</em> requirements
              on top of the general requirements of Parts 1 to 6.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Section 701 — bathroom zones (Reg 701.32)</ContentEyebrow>

          <ConceptBlock
            title="Zone 0, Zone 1, Zone 2 — the geometry of a bathroom"
            plainEnglish="Zones are defined by the bath / shower geometry, not by walls. They tell you which IP rating, which equipment, and which circuits need what."
            onSite="On a survey: stand in the doorway and visualise the three zones first, then mark them on the plan in pencil before you spec a single luminaire or socket. Most Section 701 contraventions come from kit specified before the zones were drawn."
          >
            <p>
              Reg 701.32 sets the boundaries. <strong>Zone 0</strong> is the interior volume of the
              bath tub or shower basin — the space the water sits in. <strong>Zone 1</strong> is
              bounded by Zone 0, the floor, and the horizontal plane 2.25 m above the finished floor
              level (or above the lowest fixed shower head, whichever is higher), and extends across
              the full footprint of the bath / shower. <strong>Zone 2</strong> extends 0.6 m
              horizontally outwards from Zone 1, up to the same 2.25 m height. Above 2.25 m, and
              beyond the 0.6 m Zone 2 extension, the location is unzoned and treated as a normal
              location — subject still to Reg 701.411.3.3 if the circuit serves equipment within the
              zones.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 701.32 — Classification of zones"
            clause="The locations covered by this section are classified into three zones (0, 1 and 2). Dimensions of the zones are measured taking account of walls, doors, fixed partitions, ceilings and floors when these effectively limit the extent of the location and its zones. The dimensions are given in figures within Section 701."
            meaning="The zones are 3D volumes, not 2D shapes on a plan. A door that's open during use doesn't limit the zone; a fixed partition does. Get this wrong on a freestanding bath and Zone 2 wraps the whole bath, not just one side."
            cite="BS 7671:2018+A4:2026, Reg 701.32 — Classification of zones (Section 701, Part 7)"
          />

          <InlineCheck {...inlineChecks[0]} />

          <ConceptBlock
            title="IP ratings per zone — Reg 701.512.2"
            plainEnglish="Zone 0 needs IPX7 (immersion). Zones 1 and 2 need IPX4 (splashing). Where water jets are used for cleaning, Zones 1 and 2 uplift to IPX5."
            onSite="The IP rating is a minimum. Fitting IPX5 or IP65 in Zone 1 is fine — over-spec'ing IP is never wrong. Under-spec'ing is a Reg 701.512.2 breach and a real EICR observation."
          >
            <p>
              <strong>Zone 0 — IPX7.</strong> Anything inside the bath / shower basin must withstand
              temporary immersion. Underwater bath lights, bath-mounted Jacuzzi pumps. Permitted
              equipment in Zone 0 is restricted (see permitted-equipment block below).
              <strong> Zones 1 and 2 — IPX4.</strong> Splashing protection from any direction.
              Wall-mounted luminaires, fixed extractor fans, fixed water heaters and towel rails.
              <strong> Where water jets are used for cleaning</strong> — typically commercial, gym,
              hotel, swimming-pool changing-room showers — the requirement uplifts to IPX5
              throughout zones 1 and 2 (Reg 701.512.2). The trigger is the cleaning regime, not the
              water flow during normal use.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[1]} />

          <ConceptBlock
            title="Permitted equipment by zone — Reg 701.512"
            plainEnglish="Each zone has a list of what is allowed. Sockets are heavily restricted; only SELV outlets and shaver supply units are permitted within the zones at all."
            onSite="The biggest customer expectation gap is sockets. Customers want a phone-charging point next to the bath. The answer is: outside Zone 2 (i.e. 0.6 m past Zone 1, or above 2.25 m) — a normal RCD-protected 13 A socket is fine. Inside the zones, the only sockets are SELV (BS EN IEC 60309-2) or BS EN 61558-2-5 shaver supply units."
          >
            <p>
              <strong>Zone 0 (inside the bath / shower):</strong> only SELV-supplied equipment to 12
              V AC RMS / 30 V DC ripple-free, IPX7, fixed for use in this zone (Reg 701.55).
              Switches and sockets PROHIBITED.
              <strong> Zone 1 (above the bath up to 2.25 m):</strong> fixed luminaires, water
              heaters, ventilation fans, towel rails, electric showers, whirlpool units — IPX4,
              suitable for the zone, on a 30 mA RCD. Switches PROHIBITED unless SELV (cord-pull
              switches outside the zones are the usual answer). Sockets PROHIBITED except SELV /
              shaver.
              <strong> Zone 2 (0.6 m horizontal beyond Zone 1, up to 2.25 m):</strong> as Zone 1
              plus shaver supply units to BS EN 61558-2-5, located at least 0.6 m horizontally from
              Zone 1. Standard sockets are still PROHIBITED in Zone 2 — but the wall surface just
              beyond Zone 2 is unzoned and a normal socket is permitted there.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>
            RCD additional protection — Reg 701.411.3.3 + Reg 411.3.4 (A4)
          </ContentEyebrow>

          <ConceptBlock
            title="Two regs, one practical answer — every circuit serving a domestic bathroom is on a 30 mA RCD"
            plainEnglish="Reg 701.411.3.3 says every circuit in a bathroom location needs 30 mA RCD additional protection. Reg 411.3.4 (A4) says every domestic luminaire circuit needs 30 mA RCD additional protection. Stacked together, the practical bathroom answer is universal 30 mA cover."
            onSite="On the design side this is simplest delivered as RCBOs at the consumer unit — one per circuit, each integrating its own 30 mA element. Twin-RCD split-load CUs work but tend to nuisance-trip and cluster more circuits onto one device, which becomes painful when the householder boils a kettle and the towel rail trips."
          >
            <p>
              Reg 701.411.3.3 reads (in essence): "Additional protection by an RCD with a rated
              residual operating current not exceeding 30 mA shall be provided for all low-voltage
              circuits of the location." That catches every circuit serving the bathroom — lighting,
              immersion heater, electric shower, towel rail, extractor fan, shaver point. Reg
              411.3.4 (new in A4, in force 15 April 2026) layers on top by requiring the same 30 mA
              cover on every AC final circuit supplying luminaires within ANY domestic premises.
              There's no exemption from either: a documented risk assessment under Reg 411.3.3 only
              ever touched non-domestic socket-outlet circuits and was never available for bathroom
              or domestic-luminaire circuits.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 701.411.3.3 — Additional protection"
            clause="In addition to the requirements of Regulation 411.3.3, additional protection shall be provided for all low-voltage circuits of the location, by the use of one or more residual current devices (RCDs) having the characteristics specified in Regulation 415.1.1."
            meaning="Every circuit in the bathroom location — not just sockets — has 30 mA RCD additional protection. The lighting, immersion heater, fan and towel rail are all in scope. Reg 415.1.1 sets the characteristics: residual operating current not exceeding 30 mA, operating in not more than the time stated for the device type at 5 IΔn."
            cite="BS 7671:2018+A4:2026, Reg 701.411.3.3 (Section 701)"
          />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Supplementary equipotential bonding — Reg 701.415.2</ContentEyebrow>

          <ConceptBlock
            title="When can supplementary bonding be omitted? Three conditions, all required"
            plainEnglish="Supplementary bonding ties together every accessible exposed-conductive-part and extraneous-conductive-part inside the bathroom so the touch voltage between them stays low even during a fault. Reg 701.415.2 lets you omit it only if all three conditions hold."
            onSite="The 17th edition forced supplementary bonding on every bathroom job. The 18th edition (and now A4:2026) lets you omit it — but the burden is on the designer to evidence all three conditions on the EIC. If you can't tick all three, the bonding stays in."
          >
            <p>
              The three conditions of Reg 701.415.2:
              <strong> (i)</strong> all final circuits of the location comply with the disconnection
              times specified in Reg 411.3.2;
              <strong> (ii)</strong> all final circuits of the location have additional protection
              by an RCD with rated residual operating current not exceeding 30 mA per Reg 415.1.1;
              <strong> (iii)</strong> all extraneous-conductive-parts of the location are
              effectively connected to the protective equipotential bonding by main protective
              bonding conductors complying with Reg 411.3.1.2 — bonded all the way back to the MET.
              If any one of the three is not satisfied, supplementary bonding within the location is
              required, sized per Reg 415.2.1 and Reg 544.2 (4 mm² minimum where mechanical
              protection is not provided, 2.5 mm² minimum where it is).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 701.415.2 — Supplementary equipotential bonding"
            clause="Local supplementary equipotential bonding according to Regulation 415.2 shall be established connecting the terminals of the protective conductor of each circuit supplying Class I and Class II equipment to the accessible extraneous-conductive-parts within a room containing a bath or shower including the following: (i) metallic pipes supplying services and metallic waste pipes, (ii) metallic central heating pipes and air conditioning systems, (iii) accessible metallic structural parts of the building. Supplementary equipotential bonding may be omitted where all of the following conditions are fulfilled: (i) all final circuits of the location comply with the requirements for automatic disconnection according to Regulation 411.3.2, (ii) all final circuits of the location have additional protection by means of an RCD according to Regulation 415.1.1, and (iii) all extraneous-conductive-parts of the location are effectively connected to the protective equipotential bonding according to Regulation 411.3.1.2."
            meaning="Three conditions, every one required. Two of three is not enough. Omission must be evidenced on the cert — usually as a positive statement against each condition in the comments. If even one circuit in the bathroom isn't on a 30 mA RCD, supplementary bonding is back in."
            cite="BS 7671:2018+A4:2026, Reg 701.415.2 (Section 701)"
          />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Section 702 — swimming pools, fountains, hot tubs</ContentEyebrow>

          <ConceptBlock
            title="Pool zones (Reg 702.32) — different geometry from a bathroom"
            plainEnglish="Section 702 covers pools, hot tubs and fountains. Its zones are NOT the same as Section 701 — the geometry is bigger, the SELV limits are tighter, and the safety-isolating source has to live outside the zones."
            onSite="If you only ever do bathrooms, do not assume Section 701 numbers transfer to a hot tub on decking. Read Section 702 fresh — the 0.6 m bathroom Zone 2 becomes 1.5 m beyond a 2 m Zone 1 in pools, and Zone 0's voltage limit drops from 50 V SELV to 12 V SELV."
          >
            <p>
              Reg 702.32 defines the pool zones. <strong>Zone 0</strong> is the interior of the
              basin (including any niches, steps and recesses in the pool wall).{' '}
              <strong>Zone 1</strong> extends 2 m horizontally outwards from the rim of the pool and
              2.5 m vertically upwards from any walkable surface within Zone 1.{' '}
              <strong>Zone 2</strong> is a further 1.5 m horizontal extension beyond Zone 1, up to
              the same 2.5 m vertical height. Section 702 also applies to "basins for general use of
              which the water has a depth greater than 0.3 m" — which catches private hot tubs,
              plunge pools and inflatable spas where water depth exceeds 30 cm.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 702.32 — Classification of zones"
            clause="Locations covered by Section 702 are classified into three zones — 0, 1 and 2. The dimensions of the zones are measured taking account of walls and fixed partitions where these effectively limit the extent of the zone."
            meaning="Pool zones are bigger than bathroom zones because pool occupants spend longer immersed and travel further while wet. The 2 m horizontal Zone 1 catches ladders, grab rails and the immediate edge walking surface; Zone 2 catches the wider deck."
            cite="BS 7671:2018+A4:2026, Reg 702.32 (Section 702)"
          />

          <ConceptBlock
            title="SELV at 12 V AC in pool Zone 0 — and the safety isolating source lives OUTSIDE Zones 0 and 1"
            plainEnglish="The body's electrical resistance is dramatically lower when immersed in water. So Zone 0 of a pool drops the SELV limit from 50 V (general) to 12 V AC RMS / 30 V DC ripple-free."
            onSite="The 12 V transformer feeding underwater pool lights is not an electrician's choice — it is a Section 702 mandate. The transformer has to physically sit outside Zones 0 and 1 (typically in a plant room) with its 12 V output cabled into Zone 0. Putting the transformer in Zone 1 is a Reg 702.55 contravention and a real shock-risk."
          >
            <p>
              Reg 702.410.3.4.1 / 702.55 sets the Zone 0 SELV limit. The <em>nominal</em> voltage
              must not exceed 12 V AC RMS or 30 V DC ripple-free. The safety isolating source
              (transformer to BS EN 61558-2-6) must be located outside Zones 0 and 1. Zone 1
              equipment is permitted at higher voltages but with strict equipment lists, IPX5
              minimum and 30 mA RCD additional protection. Zone 2 permits more equipment again with
              similar IP and RCD requirements. The pattern is the same as a bathroom — but with
              bigger zones and tighter Zone 0 voltage.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <ConceptBlock
            title="Equipotential bonding around a pool — Reg 702.415.2"
            plainEnglish="Pools require supplementary equipotential bonding linking all extraneous-conductive-parts in zones 0, 1 and 2 to the protective conductors of exposed-conductive-parts of equipment in those zones."
            onSite="Reinforcement bars in the concrete pool deck, metal pool ladders, grab rails, dive boards, the pool basin's metal coping and the pool plant pipework all become extraneous-conductive-parts and must be brought into the equipotential zone. This is a much bigger bonding job than a bathroom — there's no Reg 701.415.2-style omission for pools. Always design for full supplementary bonding on a pool."
          >
            <p>
              Reg 702.415.2 — supplementary equipotential bonding around the pool — is mandatory. It
              is NOT subject to a 701.415.2-style omission, because the consequence of touch
              potential between two metal items in a pool location (one earthy, one elevated by
              fault) is materially different from a bathroom. The bonding must be installed before
              the deck is poured / tiled, with continuity tested back to the MET as part of the
              initial verification.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Section 703 — sauna heaters</ContentEyebrow>

          <ConceptBlock
            title="Three sauna zones, defined by air temperature"
            plainEnglish="Section 703 splits the sauna room into three zones (1, 2, 3) by air temperature. Equipment in each zone has to be rated for the maximum air temperature it'll see."
            onSite="The most-failed equipment selection on a sauna job is the wiring system in zones nearest the heater. PVC-insulated cables soften and degrade above 70 degrees C; silicon-insulated or mineral-insulated cable is the typical answer in zones 1 and 2. The sauna manufacturer's installation manual specifies the temperature class — the BS 7671 zones tell you where each class is required."
          >
            <p>
              Section 703 covers rooms and cabins containing sauna heaters. Reg 703.32 defines three
              zones by horizontal planes around the heater: <strong>Zone 1</strong> is the volume
              immediately around the heater (highest air temperature), <strong>Zone 2</strong> is
              the upper part of the cabin, <strong>Zone 3</strong> is the lower part. Equipment in
              each zone must be temperature-rated to the maximum air temperature of that zone.
              Wiring within the cabin is restricted to that needed to supply equipment within the
              cabin (Reg 703.521.1).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 703.411.3.3 — Additional protection"
            clause="Additional protection shall be provided for all circuits of the sauna by the use of one or more residual current devices (RCDs) with a rated residual operating current not exceeding 30 mA, except for circuits supplying the sauna heater itself, where the manufacturer's installation instructions explicitly preclude the use of RCD protection."
            meaning="Every circuit in the sauna gets a 30 mA RCD. The narrow exception is sauna-heater circuits where the manufacturer's instructions explicitly preclude RCD protection — typically a high-leakage element. That exception is on the manufacturer, not the designer; you record it and reference the manual on the cert."
            cite="BS 7671:2018+A4:2026, Reg 703.411.3.3 (Section 703)"
          />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Common bathroom installation patterns</ContentEyebrow>

          <ConceptBlock
            title="Five staples — extractor fan, shaver point, electric shower, towel rail, downlights"
            plainEnglish="Most domestic bathroom certs cover the same five items. Each has its own zone-and-rating story."
            onSite="Walk a new bathroom design with this checklist before you wire anything: which zone is the extractor fan in? Where is the shaver point relative to Zone 2? Is the shower's pull-cord switch outside the zones? Is the towel rail's flex outlet outside Zone 2? Are the downlights IPX4 minimum? Are all five circuits on 30 mA RCDs?"
          >
            <p>
              <strong>Extractor fan.</strong> Typically Zone 1 or Zone 2 ceiling-mounted — IPX4
              minimum, fixed, on a 30 mA RCD. The isolator switch must be outside Zone 2 or be a
              cord-pull. Many fans have integrated 12 V SELV variants with the transformer in the
              loft — this lets the fan itself sit anywhere up to Zone 0 (with the transformer
              outside the zones).
              <strong> Shaver point.</strong> BS EN 61558-2-5 shaver supply unit, located in Zone 2
              at least 0.6 m horizontally from Zone 1 (i.e. on the back wall, away from the bath),
              or beyond Zone 2 entirely. Built-in safety isolating transformer.
              <strong> Electric shower.</strong> Hard-wired through a flex outlet plate in Zone 1,
              fed by a dedicated 30 mA RCD or RCBO at the consumer unit, isolator pull-cord outside
              Zone 2, IPX4 minimum.
              <strong> Towel rail.</strong> Hard-wired or fed via fused connection unit (NOT a 13 A
              plug) outside Zone 2 — the flex enters the zones via a flex outlet plate. IPX4
              minimum.
              <strong> Downlights.</strong> IPX4 minimum within Zones 1 and 2 (so practically IP65
              LED downlights are universal). Reg 411.3.4 means the lighting circuit needs 30 mA RCD
              cover regardless of zone.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Specifying IPX2 (or IP20) downlights in Zone 1"
            whatHappens="A client's chosen 'feature' downlight has only IP20 / IPX2 rating in its data sheet. Designer fits in Zone 1 because it 'looks the same' as IP65. First steam-heavy shower causes water ingress at the lamp; subsequent EICR observation (typically C2 — potentially dangerous because the equipment is inside the splash zone with inadequate enclosure)."
            doInstead="Read the IP rating on the data sheet before approving the spec. Zone 1 and Zone 2 require IPX4 minimum (Reg 701.512.2). Where water jets are used for cleaning (commercial), IPX5 minimum. Decorative bathroom luminaire ranges with cluster of three / four ratings — pick the IPX4 or IPX5 model, not the IP20 lookalike."
          />

          <CommonMistake
            title="Installing supplementary bonding when not needed (because 'we always have')"
            whatHappens="Every metal pipe in the bathroom gets a 4 mm² strap to a Reg 415.2.1 bond bar — even though the property has full main protective bonding to the MET, every bathroom circuit on a 30 mA RCD, and every circuit meeting Reg 411.3.2 disconnection times. The bonding isn't dangerous, but it's untidy, expensive and gives the customer the impression the installer doesn't know the regs have moved on."
            doInstead="Check Reg 701.415.2 properly. If all three conditions are met, the supplementary bonding can be omitted — record the omission on the cert with a positive statement against each of the three conditions. If any one condition fails, supplementary bonding is in. The point is to make a designed decision and evidence it, not to default-fit out of habit (or default-omit out of laziness)."
          />

          <CommonMistake
            title="Treating a domestic bathroom luminaire circuit as exempt from Reg 411.3.4 because 'it's already covered by 701.411.3.3'"
            whatHappens="Designer assumes Reg 411.3.4 (A4 luminaire RCD) is covered by Reg 701.411.3.3 in a bathroom and therefore the rest of the dwelling lighting can stay non-RCD. The bathroom is fine; the rest of the dwelling lighting is not — Reg 411.3.4 is unconditional within domestic premises and is not bounded to the bathroom."
            doInstead="Read the two regs separately. Reg 701.411.3.3 says: every circuit serving a bathroom location is on a 30 mA RCD. Reg 411.3.4 says: every domestic luminaire circuit is on a 30 mA RCD — anywhere in the dwelling, bathroom or not. The bathroom regulation does not limit the scope of 411.3.4; it tightens it locally. Default to RCBOs at the consumer unit for every circuit in a new dwelling."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="1980s family bathroom modernisation — supplementary bonding decision under A4"
            situation="Three-bed semi, 1985 build. Existing CU is a 17th-edition split-load with a single 30 mA RCD on the socket bus and no RCD on the lighting / immersion buses. Customer is replacing the bath suite, retiling and adding LED downlights, an extractor fan and a heated towel rail. Existing supplementary bonding straps connect the bath taps, the radiator and the immersion-heater pipework."
            whatToDo="Two routes. Route A — keep supplementary bonding, leave the rest of the CU as-is. Result: the new lighting circuit fails Reg 411.3.4 (no 30 mA RCD on a domestic luminaire circuit). The new towel rail / extractor circuit fails Reg 701.411.3.3 (no 30 mA RCD on a bathroom circuit). Both require remediation regardless of whether bonding stays. Route B — replace the consumer unit with a fully-RCBO (or dual-RCD) board, every circuit on 30 mA cover. This satisfies Reg 411.3.4, Reg 701.411.3.3 and conditions (i) and (ii) of Reg 701.415.2. If the property's main protective bonding to gas / water is intact and tested back to the MET, condition (iii) is also met — supplementary bonding can be omitted on the cert with a positive statement against each condition. Route B is the right answer in 2026; route A is a stack of compliance failures."
            whyItMatters="Customers see 'supplementary bonding' as the sticky-out-bit they don't understand. The actual cost decision is the consumer unit: a CU swap unlocks Reg 411.3.4, Reg 701.411.3.3 AND the option to omit supplementary bonding. Selling the CU swap as 'A4 compliance' is a cleaner conversation than 'I'm taking your bonding straps off' — and it lifts the rest of the dwelling to current edition simultaneously."
          />

          <Scenario
            title="Hotel pool refurb — Section 702 + occupant categories + commercial wash-down"
            situation="Mid-size leisure-centre pool. 25 m main pool, separate 5 m kids' pool, jacuzzi alcove. Existing underwater lighting is 230 V (legacy 1990s install). Refurb includes new LED underwater lights, new pool plant, new disabled-access hoist, new wash-down regime where the pool deck and surrounds are jet-washed nightly. Disabled bathers in BA2 / BA3 categories."
            whatToDo="Underwater lighting: rip out the 230 V kit. Under Reg 702.410.3.4.1 / 702.55, Zone 0 is SELV at 12 V AC RMS / 30 V DC ripple-free, with the safety isolating transformer (BS EN 61558-2-6) located outside Zones 0 and 1 — typically in the pool plant room, with the 12 V supply cabled to each underwater luminaire. IP rating throughout zones 1 and 2: uplift to IPX5 because of the nightly jet-wash cleaning regime (Reg 701-style logic, Section 702 equivalent). Equipotential bonding around the deck: full Reg 702.415.2 bonding of all extraneous-conductive-parts (rebar, ladders, grab rails, plant pipework) — there is no 701.415.2-style omission for pools. Disabled-bather equipment: hoist circuit on dedicated 30 mA RCD; emergency-stop circuit hardwired to BS EN 60204-1 standards; pool-alarm circuit may need to be Cat 3 SIL-rated depending on the risk assessment. Public-area design: keep all switches / sockets out of Zones 0, 1 and 2 entirely — typically meaning the wet-side of the pool hall has no general-purpose sockets at all, and any cleaning equipment is fed from sockets in the dry-side corridor."
            whyItMatters="Section 702 has no equivalent of the Reg 701.415.2 supplementary-bonding omission. There is no shortcut — the bonding is in, the SELV transformer is outside Zones 0 and 1, the underwater lights are 12 V max, and the IP uplift to IPX5 is mandatory because of the jet-wash. The combination of regs, occupant categories (BA2 / BA3) and the commercial wash-down regime makes a hotel pool a fundamentally different design conversation from a private pool — and a far cry from the bathroom regs that an electrician's daily work most often encounters."
          />

          <SectionRule />

          <ContentEyebrow>Designer's quick reference</ContentEyebrow>

          <ConceptBlock
            title="Bathroom / pool / sauna decision matrix"
            plainEnglish="A four-step walk-through that picks the right Section, the right zones, the right IP and the right RCD strategy for any wet location."
            onSite="(1) Which Section? Bath / shower / wet room = 701. Pool / hot tub / fountain / depth greater than 0.3 m occupied basin = 702. Sauna heater room = 703. (2) Map the zones first, before any equipment. Section 701 zones up to 2.25 m; Section 702 zones up to 2.5 m; Section 703 zones by air temperature. (3) IP minimum per zone: 701 Zone 0 IPX7, Zones 1 and 2 IPX4 (uplift to IPX5 if water-jet cleaning). 702 Zones 1 and 2 IPX5 typically. (4) RCD strategy: every domestic dwelling now gets 30 mA RCBO per circuit by default (Reg 411.3.4 + Reg 701.411.3.3 + Reg 703.411.3.3 + Reg 411.3.3 sockets) — there's almost no design where you wouldn't."
          >
            <p>
              The decision matrix gets you from "what location is this?" to "specced and ready to
              install" without missing a Part 7 reg. For typical UK domestic on TN-C-S in 2026: full
              RCBO consumer unit, IPX4 minimum throughout bathroom zones, supplementary bonding
              omission evidenced against the three Reg 701.415.2 conditions, and luminaires plus
              extractor plus shaver point plus electric shower plus towel rail all selected and
              located against their zone. For commercial pools: full Reg 702.415.2 supplementary
              bonding mandatory, 12 V SELV underwater, IPX5 throughout wet zones, isolating
              transformers outside zones 0 and 1.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'Section 701 covers bath / shower locations. Reg 701.32 zones: Zone 0 (inside the basin, IPX7), Zone 1 (above the bath / shower up to 2.25 m, IPX4), Zone 2 (a 0.6 m horizontal extension of Zone 1, IPX4). Above 2.25 m and beyond Zone 2 is unzoned.',
              'Reg 701.411.3.3 mandates 30 mA RCD additional protection on every low-voltage circuit serving the bathroom. Reg 411.3.4 (A4) independently mandates the same on every domestic luminaire circuit. The two regs stack.',
              'Reg 701.415.2 lets supplementary equipotential bonding be OMITTED only when all three conditions hold: disconnection times met, 30 mA RCDs on every circuit, all extraneous-conductive-parts bonded to the MET. Two of three is not enough.',
              'Section 702 (pools) uses different zone geometry (Reg 702.32) and tighter SELV limits in Zone 0 (12 V AC RMS / 30 V DC ripple-free, source outside Zones 0 and 1). Reg 702.415.2 bonding has no omission route.',
              'Section 703 (sauna heaters) uses temperature-defined zones (1, 2, 3). Reg 703.411.3.3 mandates 30 mA RCD additional protection on every circuit, narrow exception only where the heater manufacturer explicitly precludes RCD protection.',
              'Designer default for 2026 domestic: full RCBO consumer unit (one 30 mA RCBO per circuit), IPX4 minimum for bathroom equipment, supplementary bonding omission documented against the Reg 701.415.2 conditions on the EIC.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-7')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 7
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-7-section-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                7.2 Electric vehicle charging (Part 722)
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module7Section1;
