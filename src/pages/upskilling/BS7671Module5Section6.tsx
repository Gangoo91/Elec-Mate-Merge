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
    id: 'm5s6-ip-second-digit',
    question:
      'A flush-mounted socket-outlet is being installed on an external garden wall, exposed to driving rain but not submersion. What is the minimum IP rating that meets the external influences rule for this location?',
    options: [
      'IP20 — internal-grade is acceptable behind a weatherproof flap',
      'IP44 — protection against solid foreign objects greater than or equal to 1 mm and splashing water from any direction',
      'IPX7 — only protection against temporary immersion is appropriate outdoors',
      'IP00 — IP rating is not relevant to fixed wiring accessories',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 60529 codes ingress protection as IPxy. First digit 0-6 covers solid foreign objects; second digit 0-9 covers water. Outdoor accessories exposed to weather are external influence AD4 (splashes) and require a minimum IP44 — solids greater than or equal to 1 mm and splashing water from any direction. IPX7 is for temporary immersion (bath zone 0). IP20 is internal-only. Always cross-check against Reg 522.1 and the relevant special-location section.',
  },
  {
    id: 'm5s6-ik-impact',
    question:
      'A distribution board is being installed in a busy plant room where mechanical impact (trolleys, ladders, dropped tools) is foreseeable. The specification calls for an IK rating equivalent to 20 J impact energy. Which IK code is required?',
    options: ['IK02 — 0.2 J', 'IK06 — 1 J', 'IK08 — 5 J', 'IK10 — 20 J'],
    correctIndex: 3,
    explanation:
      'BS EN 50102 grades impact resistance from IK00 (no protection) to IK10 (20 J). Each step represents an increasing impact energy delivered by a defined hammer at a defined drop height. IK10 is the highest standard rating and matches a 5 kg mass dropped 400 mm. Plant rooms, car parks and industrial spaces routinely specify IK08-IK10. Reg 522.6 makes this selection a design step, not an afterthought.',
  },
  {
    id: 'm5s6-zone-1-bath',
    question:
      "In a domestic bathroom, an electric shower is fitted directly above the bath within zone 1. What is the minimum IP rating BS 7671 Section 701 requires for the shower's enclosure?",
    options: [
      'IP20 — zone 1 is dry once the shower is off',
      'IPX4 — protection against splashing water from any direction',
      'IPX5 — protection against water jets',
      'IPX7 — protection against temporary immersion',
    ],
    correctIndex: 1,
    explanation:
      'Section 701 sets minimum IP ratings by zone. Zone 0 (inside the bath / shower basin) is IPX7. Zone 1 (above the bath up to 2.25 m) is IPX4. Zone 2 (0.6 m horizontally beyond zone 1) is also IPX4. Outside the zones, normal indoor IP applies. Where water jets are used for cleaning (commercial showers, public swimming pools) the rating goes up to IPX5.',
  },
  {
    id: 'm5s6-fp-cable-emergency',
    question:
      'An emergency lighting circuit feeding maintained luminaires on an escape route is being designed under BS 5266-1. Which type of cable should be selected to meet Reg 527.1 fire-resistant requirements?',
    options: [
      'Standard PVC twin-and-earth — adequate behind plasterboard',
      'LSF (Low Smoke and Fume) PVC — adequate because smoke is reduced',
      'A fire-resistant cable to BS EN 50200 class PH 30, PH 60 or PH 120 (FP200, FP400, MICC) — selected to maintain circuit integrity for the duration the safety service must operate',
      'SWA cable with PVC bedding and outer sheath',
    ],
    correctIndex: 2,
    explanation:
      'Reg 527.1.1 requires safety services and circuits with fire-resistant function (emergency lighting per BS 5266, fire alarms per BS 5839, fire-fighter lifts) to use cables that maintain circuit integrity during a fire for the time required by the safety service. BS EN 50200 PH classes (PH 30, PH 60, PH 120) define the minutes of integrity. FP200 and FP400 (Prysmian) and MICC (mineral-insulated) are common selections. LSF is about smoke, not integrity — different specification.',
  },
  {
    id: 'm5s6-fire-stopping',
    question:
      'A 100 mm diameter cable bundle penetrates a 60-minute fire-rated compartment wall. What does Reg 527.2 require?',
    options: [
      'Nothing — cables on cable tray are exempt',
      'A label warning of the fire risk on each side',
      'The penetration must be sealed to maintain the fire rating of the element being penetrated, using a system tested to the same fire-rating standard (intumescent collar, mineral wool batt, fire-rated putty pads)',
      'The cable must be over-sleeved with heat-shrink tubing',
    ],
    correctIndex: 2,
    explanation:
      'Reg 527.2 (sealing of wiring system penetrations) requires that any wiring system passing through an element of building construction (wall, floor, ceiling) which has a specified fire resistance rating must be sealed to maintain that rating. The sealing system must be tested to the same standard (BS EN 1366-3 / BS 476-20). Intumescent collars on plastic conduit, mineral wool batts on cable trays and fire-rated putty pads around cable bundles are typical. Unsealed penetrations are a building-control failure and a documented EICR observation.',
  },
  {
    id: 'm5s6-lszh-vs-lsf',
    question:
      'A specification calls for "halogen-free, low smoke" cable in an underground railway station. Which acronym describes the correct cable type and why does it matter?',
    options: [
      'LSF — Low Smoke and Fume; halogen content is acceptable below 50%',
      'LSZH (Low Smoke Zero Halogen) — produces little smoke and emits no halogen acid gases when burning, critical in confined evacuation routes where toxic smoke would block escape',
      'PVC — modern PVC compounds are inherently halogen-free',
      'XLPE — cross-linked polyethylene is the same as LSZH',
    ],
    correctIndex: 1,
    explanation:
      'LSZH (also written LS0H) is the correct specification for confined evacuation routes — Tube stations, tunnels, hospitals, ships. PVC contains chlorine; when it burns it releases hydrogen chloride which forms hydrochloric acid in moist airways. LSF is a marketing term — typically reduced halogen but not zero, and the standard is not as tightly defined. For BS 7671, the choice is governed by Section 422 (fire risk) and the project specification — get the right acronym on the order or the wrong cable will arrive.',
  },
  {
    id: 'm5s6-uv-outdoor',
    question:
      'A grey PVC SWA cable is being run on the south-facing external wall of a commercial building, fully exposed to direct sunlight. The contractor argues "PVC is fine outdoors". What does BS 7671 actually require?',
    options: [
      'Nothing — all PVC cables are UV-stable by default',
      'Reg 522.11.1 covers solar radiation — the cable selected must be suitable for the level of exposure or be protected from direct sunlight (UV-stable sheath, sun shield, conduit). Standard PVC is not UV-stable and will craze and crack within a few years',
      'UV exposure is only relevant in tropical climates',
      'The cable must be replaced annually as part of planned maintenance',
    ],
    correctIndex: 1,
    explanation:
      'Reg 522.11.1 requires the wiring system to be selected and erected so that no damage is caused by solar radiation or other sources of radiation that may have to be withstood. Standard PVC sheaths discolour, harden and crack under UV. The fix is either a UV-stable sheath compound (specifically rated for outdoor exposure), galvanised conduit / SWA armour as the primary mechanical and UV barrier, or installation behind cladding / under cover. A weathered cable on an EICR is typically C2 once the sheath is compromised.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under BS EN 60529, what does the second numeral of an IP code describe, and which value indicates protection against temporary immersion?',
    options: [
      'Solid foreign objects; 6 indicates dust-tight',
      'Water; IPX7 indicates protection against temporary immersion in water at defined depth and time',
      'Mechanical impact; IPX9 indicates the highest impact energy',
      'Corrosive substances; IPX5 indicates resistance to acid',
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 60529 IP code: first digit (0-6) is solid foreign objects (6 = dust-tight); second digit (0-9) is water (0 = no protection, 4 = splashing, 5 = jets, 6 = powerful jets, 7 = temporary immersion, 8 = continuous submersion, 9 = high-pressure / high-temperature water jets). Mechanical impact is a separate code — IK00 to IK10 per BS EN 50102 — and is not part of the IP rating.',
  },
  {
    id: 2,
    question: 'IK10 per BS EN 50102 corresponds to which impact energy?',
    options: ['1 J', '5 J', '10 J', '20 J'],
    correctAnswer: 3,
    explanation:
      'BS EN 50102 IK rating ladder: IK00 (no protection), IK01 (0.15 J), IK02 (0.2 J), IK03 (0.35 J), IK04 (0.5 J), IK05 (0.7 J), IK06 (1 J), IK07 (2 J), IK08 (5 J), IK09 (10 J), IK10 (20 J). IK10 is the highest standard grade and is delivered by a 5 kg mass dropped 400 mm onto the enclosure. Plant rooms, car parks and industrial environments commonly specify IK08-IK10.',
  },
  {
    id: 3,
    question:
      'Which BS 7671 regulation is the head reference for selecting equipment based on the external influences present at the location of the installation?',
    options: ['Reg 522.1', 'Reg 411.3.1', 'Reg 543.1.1', 'Reg 643.3'],
    correctAnswer: 0,
    explanation:
      'Reg 522.1 is the headline external-influences regulation in Chapter 52. It requires that the wiring system be selected and erected having regard to the external influences to which it may be subjected, and references Appendix 5 for the AD / AE / AG codes (water, dust, mechanical impact). 411.3.1 is shock protection; 543.1.1 is CPC sizing; 643.3 is initial verification.',
  },
  {
    id: 4,
    question:
      'A bathroom has an extractor fan installed in the ceiling directly above the bath. What zone is it in, and what is the minimum IP rating?',
    options: [
      'Outside the zones — IP20 is acceptable',
      'Zone 2 — IPX4 minimum',
      'Zone 1 — IPX4 minimum',
      'Zone 0 — IPX7 minimum',
    ],
    correctAnswer: 2,
    explanation:
      'Section 701 zones a bathroom by horizontal distance and vertical extent above the bath / shower. Zone 0 is the interior of the bath / shower basin (IPX7). Zone 1 extends from the floor of the bath / shower up to 2.25 m above it, occupying the volume directly above the bath / basin (IPX4 minimum). Zone 2 extends 0.6 m horizontally outwards from zone 1, also up to 2.25 m (IPX4). The ceiling above a bath, below 2.25 m, is zone 1.',
  },
  {
    id: 5,
    question:
      'Which regulation requires that a wiring system passing through a fire-rated building element be sealed to maintain the fire rating?',
    options: ['Reg 411.3.3', 'Reg 522.6', 'Reg 527.2', 'Reg 543.7'],
    correctAnswer: 2,
    explanation:
      'Reg 527.2 (sealing of wiring system penetrations) is the specific clause: where a wiring system passes through a building element with a specified fire resistance, the penetration must be sealed by a system tested to the same fire-rating standard. Reg 522.6 is mechanical impact; Reg 543.7 is high-protective-conductor-current circuits; Reg 411.3.3 is socket-outlet RCD additional protection.',
  },
  {
    id: 6,
    question:
      'When must fire-resistant cables (e.g. FP200, FP400, MICC) be used in preference to standard cables?',
    options: [
      'On every domestic final circuit as standard installation practice',
      'Only where the cable is buried directly in wall plaster',
      'Only on three-phase distribution and sub-main circuits',
      'On safety services with a fire-resistant function, per Reg 527.1',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 527.1.1 requires safety services and other circuits with a fire-resistant function to be wired in cable that maintains circuit integrity in fire. The integrity duration (PH 30, PH 60, PH 120 per BS EN 50200) is determined by the safety service standard — BS 5266-1 for emergency lighting, BS 5839-1 for fire alarms, the relevant lift standard for fire-fighter lifts. Standard PVC, even LSF, is not equivalent.',
  },
  {
    id: 7,
    question:
      'A standard grey PVC cable is installed externally on a south-facing wall and discoloured / cracked within 18 months. Which BS 7671 regulation has been breached?',
    options: [
      'Reg 522.11.1 — solar radiation external influence (AN)',
      'Reg 411.3.4 — luminaire RCD additional protection',
      'Reg 543.2 — selection of protective conductor types',
      'Reg 643.7.2 — insulation resistance testing',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 522.11.1 covers external influence AN (solar radiation): the wiring system must be selected and erected so that no damage is caused by solar radiation or other relevant radiation. UV-induced sheath crazing is exactly this failure mode. The fix is a UV-stable sheath compound, mechanical protection (conduit, SWA armour), or relocation away from direct sunlight. Reg 522.10 covers corrosive substances — different external influence.',
  },
  {
    id: 8,
    question:
      'A specification states "all cables in escape routes shall be LSZH". What is the engineering justification for this selection?',
    options: [
      'LSZH cable is cheaper to buy and install than equivalent PVC cable',
      'LSZH cable is inherently fire-resistant, equivalent to an FP-rated cable',
      'LSZH gives minimal smoke and no halogen acid gas, preserving escape-route visibility',
      'LSZH cable is a mandatory regulatory requirement on every UK installation',
    ],
    correctAnswer: 2,
    explanation:
      'LSZH (Low Smoke Zero Halogen) is a sheath / insulation specification, not a fire-resistance specification. It addresses smoke obscuration and toxic / corrosive gas emission in fire — both critical on escape routes. PVC contains chlorine; when it burns it releases HCl gas which forms hydrochloric acid on contact with moisture (lungs, eyes, electronics). LSZH is required on Tube stations, tunnels, ships, hospitals, data centres. It is NOT a substitute for FP-equivalent cables where Reg 527.1 demands circuit integrity.',
  },
];

const faqItems = [
  {
    question: 'How do I look up the IP rating an external influence corresponds to?',
    answer:
      'Appendix 5 of BS 7671 lists the AD / AE / AG codes (water, foreign bodies, mechanical impact) used to describe environments. Each code maps to a recommended minimum IP and IK rating. For example AD4 (splashes) maps to IPX4; AD7 (immersion) maps to IPX7. The OSG (On-Site Guide) and IET Guidance Note 1 also tabulate typical UK locations against IP requirements. For special locations, the relevant Part 7 section (701 bathrooms, 702 swimming pools, 711 exhibitions, etc.) sets the binding minima.',
  },
  {
    question: 'Is IK10 required on every distribution board?',
    answer:
      'No. IK rating is selected per Reg 522.6 — mechanical impact severity — based on the location. A domestic CU in a hallway cupboard is typically IK07 (2 J) or IK08 (5 J). A plant-room, warehouse or car-park board is typically IK08-IK10 because the impact risk (trolleys, ladders, vehicles, dropped tools) is foreseeable. Industrial and outdoor enclosures default to IK10. Specifying IK10 everywhere is over-engineering on small jobs and under-engineering nowhere — it just adds cost on installations where IK07 would meet the regs.',
  },
  {
    question: 'Can I use a Henley block in a fire compartment wall without sealing it?',
    answer:
      'No. Reg 527.2 applies to any wiring system penetration through a fire-rated element, regardless of accessory type. The seal must restore the fire integrity of the element to the rating originally specified for that wall / floor. Intumescent putty pads, mineral wool batts compressed around the cable, or proprietary fire-rated cable transit boxes are the standard solutions. The same rule applies to plastic conduit, trunking and cable tray penetrations — every opening, every time. Building Control will check this on completion.',
  },
  {
    question: 'When is FP400 specified instead of FP200?',
    answer:
      'FP200 and FP400 (Prysmian) are both fire-resistant cables to BS EN 50200, but FP400 has a more robust outer sheath (LSZH thermosetting) and is rated to higher PH classes by default. Specification is project-led: FP400 (or MICC) is typical on critical safety services in tall buildings post-Grenfell, complex evacuation routes, fire-fighter lifts and life-safety systems where 90-120 minute integrity is mandated. FP200 remains common on smaller commercial / domestic emergency lighting and fire-alarm circuits where 30-60 minute PH class is sufficient.',
  },
  {
    question: 'Does standard SWA satisfy Reg 522.6 mechanical impact?',
    answer:
      "SWA (steel-wire armour to BS 5467 / BS 6346) provides excellent mechanical protection by virtue of its galvanised steel-wire layer between the bedding and the outer sheath. For most plant-room, outdoor and industrial routing, SWA satisfies Reg 522.6. However, SWA armour is the cable's mechanical protection — the enclosure / accessory it terminates into must have its own appropriate IK rating. Don't over-rely on the cable to protect a flimsy plastic gland-plate: chain-of-protection thinking applies.",
  },
  {
    question: 'Are all bathroom accessories required to be IP-rated, even outside the zones?',
    answer:
      'No. Section 701 only mandates IP minima within zones 0, 1 and 2. Outside the zones (3+ in old terminology), normal indoor IP applies — typically IP20. However, splash-back from the basin, condensation, and the realistic life of the property mean designers often specify IP44 throughout the bathroom as good practice rather than as a regulatory minimum. Always treat the zones as the legal floor and the design-intent IP as the practical specification.',
  },
  {
    question: 'Why is "IPX7" sometimes written instead of "IP67"?',
    answer:
      "When the first digit is not specified or not relevant, BS EN 60529 allows it to be replaced with X. So IPX7 means \"no first-digit value declared, second digit 7 (temporary immersion)\". This is common on equipment originally rated for water but where the manufacturer hasn't formally tested for solid foreign objects. For BS 7671 zone compliance, IPX7 is acceptable in zone 0 because the zone's defining hazard is water, not particles. Always check the manufacturer's declaration — some products are dual-rated (IP67 / IP68) and some are not.",
  },
  {
    question: 'What is the EICR observation code for a fire-stopping failure?',
    answer:
      "A penetration through a fire-rated wall that has been opened up (e.g. for a new cable run) and not properly re-sealed compromises the building's fire compartmentation. GN3 typically codes this C2 (potentially dangerous) on an EICR — the failure does not immediately threaten electrical safety, but it allows fire to spread through the building, defeating the architect's compartmentation design. Severe cases (large unsealed penetrations through escape-route walls) approach C1. The fix is straightforward: seal the penetration with a tested system and document it.",
  },
  {
    question: 'How do outdoor enclosures cope with internal condensation?',
    answer:
      "A sealed outdoor enclosure with a high IP rating still experiences temperature swings — sun-warmed daytime air carrying water vapour cools overnight and condenses on the cooler internal surfaces. Best practice: specify enclosures with breather / drain valves (e.g. Roxtec, Spelsberg), include a small heater on circuits where condensation would damage equipment, and orient the enclosure so any moisture drains rather than pools. Reg 522.3 (presence of water) and Reg 522.5 (foreign solid bodies and dust) apply alongside the IP rating — IP66 alone doesn't solve internal condensation.",
  },
];

const BS7671Module5Section6 = () => {
  const navigate = useNavigate();

  useSEO({
    title:
      'Environmental protection — IP, IK and fire resistance | BS 7671:2018+A4:2026 | Module 5.6',
    description:
      'How BS 7671 selects equipment for the environment — IP ratings (BS EN 60529), IK ratings (BS EN 50102), bathroom zones (Section 701), fire-resistant cables (Reg 527.1), fire stopping (Reg 527.2) and outdoor enclosure specification.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../bs7671-module-5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 6"
            title="Environmental protection — IP, IK and fire resistance"
            description="Selecting equipment and wiring systems for the environment. IP ratings (BS EN 60529), IK ratings (BS EN 50102), bathroom zoning, fire-resistant cables for safety services, fire stopping at compartmentation, and outdoor / harsh-environment enclosures."
            actions={
              <>
                <RegBadge>522.1</RegBadge>
                <RegBadge>527.1</RegBadge>
                <RegBadge>522.6</RegBadge>
                <AmendmentBadge regs={['527.1']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'IP rating (BS EN 60529) describes ingress: first digit 0-6 (solid foreign objects), second digit 0-9 (water). Always selected against the external influence at the location (Reg 522.1).',
              'IK rating (BS EN 50102) describes mechanical impact resistance: IK00 (none) up to IK10 (20 J). Reg 522.6 makes IK selection a design step, not an afterthought.',
              'Reg 527.1 mandates fire-resistant cables for safety services and circuits with fire-resistant function — emergency lighting (BS 5266), fire alarms (BS 5839), fire-fighter lifts. Reg 527.2 mandates sealing of penetrations through fire-rated building elements.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Decode any IP rating and pick the correct minimum for indoor, outdoor, wet and dusty locations under Reg 522.1.',
              'Decode any IK rating and select the correct mechanical impact rating per Reg 522.6 — domestic, plant room, industrial, car park.',
              'Apply Section 701 bathroom zoning correctly — IPX7 in zone 0, IPX4 in zones 1 and 2 — and recognise where zone boundaries fall.',
              'Specify fire-resistant cables (FP200, FP400, MICC) under Reg 527.1 for emergency lighting and fire-alarm circuits, picking the right PH integrity class for the safety service.',
              'Apply Reg 527.2 to penetrations through compartment walls and floors — intumescent collars, mineral wool batts, fire-rated putty pads — and recognise C2 EICR observations for unsealed penetrations.',
              'Distinguish LSF (Low Smoke and Fume) from LSZH (Low Smoke Zero Halogen) and choose the right specification for confined evacuation routes.',
              'Specify outdoor enclosures correctly: UV-stable sheath, condensation control, IK against impact, IP against water — and how the four interact.',
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>External influences — the head reg</ContentEyebrow>

          <ConceptBlock
            title="Reg 522.1 — selecting for the environment, not the catalogue"
            plainEnglish="Every piece of equipment and every wiring system must be chosen for the environment it sits in. Water, dust, mechanical impact, sunlight, corrosive vapours — each is a separate external influence with a separate code in Appendix 5."
            onSite="The reg pushes a discipline: walk the location, identify the AD / AE / AG codes that apply, and only THEN open the catalogue. Specifying IP20 indoor accessories on a south-facing external wall isn't a paperwork miss — it's a design failure."
          >
            <p>
              Reg 522.1 reads:{' '}
              <em>
                The wiring system shall be selected and erected having regard to the external
                influences to which it may be subjected.
              </em>{' '}
              Appendix 5 of BS 7671 tabulates the AA (ambient temperature), AB (humidity), AC
              (altitude), AD (water), AE (foreign solid bodies), AF (corrosive substances), AG
              (mechanical impact), AH (vibration), AK (flora), AL (fauna), AM (electromagnetic), AN
              (solar radiation), AP (seismic), AQ (lightning) and AR (movement of air) codes. Each
              maps to recommended IP, IK, ambient-temperature and corrosion-resistance minima.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 522.1 — External influences (general)"
            clause="The wiring system shall be selected and erected having regard to the external influences to which it may be subjected. The wiring system shall be such that no harm is caused, by external influences, to persons, livestock or property, or to the operation of the wiring system itself."
            meaning="The duty is on the designer to identify the influences AND on the installer to install equipment matched to them. A specification that ignores the external influences of the location is non-compliant before a single cable is run."
            cite="BS 7671:2018+A4:2026, Reg 522.1 (Chapter 52 — Selection and erection of wiring systems)"
          />

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>IP ratings — BS EN 60529</ContentEyebrow>

          <ConceptBlock
            title="Decoding the IP code"
            plainEnglish="IPxy: x is solid foreign objects (0 none, 6 dust-tight); y is water (0 none, 4 splash, 5 jets, 6 powerful jets, 7 immersion, 8 continuous submersion, 9 high-pressure / high-temperature jets)."
            onSite="The two digits are independent. IPX4 is splash-proof but says nothing about dust. IP65 means dust-tight AND jet-proof. Where one axis isn't certified, manufacturers write X — IPX7 means the first digit isn't formally tested or declared."
          >
            <p>
              BS EN 60529 grades the protection an enclosure provides against (a) solid foreign
              objects entering and (b) water entering. The full table for the second digit:
              <strong> 0</strong> none, <strong>1</strong> vertical drips, <strong>2</strong> drips
              at up to 15 degrees, <strong>3</strong> spraying water at up to 60 degrees,{' '}
              <strong>4</strong> splashing from any direction, <strong>5</strong> water jets,{' '}
              <strong>6</strong> powerful water jets, <strong>7</strong> temporary immersion (up to
              1 m for up to 30 minutes), <strong>8</strong> continuous submersion (depth and
              duration declared by the manufacturer), <strong>9</strong> high-pressure /
              high-temperature water jets (used in food and dairy washdown environments).
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Choosing IP for indoor, outdoor, wet and dusty environments"
            plainEnglish="Indoor dry: IP20-IP30. Outdoor protected (under cover): IP44. Outdoor exposed: IP54-IP65. Bathroom zone 0: IPX7. Industrial washdown: IP66/IP67."
            onSite="The trap is splitting the difference. An IP44 socket on a balcony is fine for splash but not for direct rain over years; under cover it's right, fully exposed it's underspecified. Spec the worst-case environment, not the average."
          >
            <p>
              Domestic outdoor accessories (garden socket-outlets, external lights) typically need
              IP44 minimum where weatherproof flaps are part of the assembly, IP55-IP65 where fully
              exposed. Industrial and food-production environments needing washdown go to IP66 /
              IP69K. Submersible fittings (pond pumps, swimming-pool fixtures) need IP68 to the
              depth and duration declared. Always cross-check the manufacturer's IP claim against
              the BS EN 60529 test routine — some lower-end products quote IP ratings without
              independent certification.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>IK ratings — BS EN 50102</ContentEyebrow>

          <ConceptBlock
            title="The IK ladder — IK00 to IK10"
            plainEnglish="IK rates how much impact energy (in joules) the enclosure can take before failing. IK00 is no protection. IK10 is 20 J — the highest standard grade."
            onSite="Plant rooms, car parks, warehouses, schools — all are environments where an IK10 enclosure is appropriate. Domestic CUs in a hall cupboard typically meet IK07 (2 J). The rating is on the enclosure itself; cable mechanical protection is separate (Reg 522.6)."
          >
            <p>
              BS EN 50102 IK ladder: <strong>IK00</strong> no protection, <strong>IK01</strong> 0.15
              J, <strong>IK02</strong> 0.2 J, <strong>IK03</strong> 0.35 J, <strong>IK04</strong>{' '}
              0.5 J, <strong>IK05</strong> 0.7 J, <strong>IK06</strong> 1 J, <strong>IK07</strong> 2
              J, <strong>IK08</strong> 5 J, <strong>IK09</strong> 10 J, <strong>IK10</strong> 20 J.
              The test is a defined hammer (mass, head shape) dropped from a defined height,
              delivered to the most vulnerable face of the enclosure. Some specifications now refer
              to non-standard IK11 (50 J) for car-park and external-pillar use — that grade is not
              part of the published standard.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 522.6 — Mechanical impact"
            clause="The wiring system shall be selected and erected so as to minimise the risk of damage from any mechanical impact, including stresses arising during installation, use or maintenance of the installation."
            meaning="Mechanical impact protection isn't optional. The choice is between IK rating of the enclosure, mechanical protection of the cable (SWA armour, conduit, capping), or routing away from impact zones — and the regulation expects this choice to be a recorded design decision."
            cite="BS 7671:2018+A4:2026, Reg 522.6 (Chapter 52)"
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Special locations — bathroom zoning (Section 701)</ContentEyebrow>

          <ConceptBlock
            title="Section 701 — zones and the IP minima they trigger"
            plainEnglish="Section 701 splits a bathroom into zones 0, 1 and 2 and assigns minimum IP ratings to each. Zone 0 is inside the bath / shower basin (IPX7). Zone 1 is the volume directly above (IPX4). Zone 2 extends 0.6 m horizontally outwards (IPX4)."
            onSite="The most-tested point: an extractor fan in the ceiling above a bath is in zone 1 if the ceiling is below 2.25 m — IPX4 minimum. A pendant light above the same bath is also zone 1 — IPX4 and 30 mA RCD. Above 2.25 m or outside the 0.6 m horizontal limit, you're outside the zones and normal indoor IP (IP20+) applies."
          >
            <p>
              Zone 0 is the interior of the bath, basin or shower tray — water everywhere, hence
              IPX7 (immersion). Zone 1 is the volume bounded by the upper edge of zone 0 and the
              horizontal plane 2.25 m above the floor (or, where the showerhead is fixed higher than
              2.25 m, by the showerhead's height). Zone 2 is the volume bounded by zone 1's outer
              surface and a parallel surface 0.6 m horizontally outward — also up to 2.25 m.
              Equipment in zones 1 and 2 needs IPX4 minimum; where water jets are used for cleaning,
              IPX5. Outside the zones, normal indoor IP applies but Section 701 still demands 30 mA
              RCD additional protection on every circuit serving the location.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Fire-resistant cables — Reg 527.1</ContentEyebrow>

          <ConceptBlock
            title="When fire-resistant cable is mandatory"
            plainEnglish="Safety services — emergency lighting, fire alarms, fire-fighter lifts, smoke-control fans — must keep operating during a fire for the duration the standard demands. Standard PVC cables fail in minutes; fire-resistant cables (FP200, FP400, MICC) maintain integrity for 30, 60, 90 or 120 minutes per BS EN 50200 PH classes."
            onSite="The PH class is set by the safety service standard, not by Reg 527.1. BS 5266-1 (emergency lighting) and BS 5839-1 (fire alarms) tell you whether 30, 60 or 120 minutes is needed. Reg 527.1 binds you to choosing a cable that meets that integrity class."
          >
            <p>
              Reg 527.1.1 requires that{' '}
              <em>
                safety services and circuits with a fire-resistant function shall be selected and
                erected so as to maintain circuit integrity for a period of time as required by the
                relevant standard for the function concerned.
              </em>{' '}
              The integrity class is declared by the cable manufacturer to BS EN 50200 (small
              cables) or BS 8434 / BS 8491 (larger sizes). FP200 (Prysmian, mineral fire-resistant
              insulation) covers small power and signal applications; FP400 has a more robust LSZH
              outer sheath; MICC (mineral-insulated copper-clad) is the heritage solution still used
              on the most demanding fire-fighter and life-safety circuits.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 527.1.1 — Fire-resistant wiring systems"
            clause="A wiring system providing electrical supply to a safety service or other circuit having a fire-resistant function shall be selected and erected so as to maintain circuit integrity for the period of time appropriate to the function during a fire."
            meaning="The duty is non-negotiable on safety services. The cable, the supports (steel cable cleats / clips, NOT plastic), the terminations and the gland-plates must all be tested to maintain integrity for the same duration. Plastic cable ties on a fire-alarm cable melt in minutes — they fail Reg 527.1 even if the cable itself is FP200."
            cite="BS 7671:2018+A4:2026, Reg 527.1.1 (Chapter 52)"
          />

          <ConceptBlock
            title="LSF vs LSZH — getting the acronym right"
            plainEnglish="LSF (Low Smoke and Fume) reduces smoke. LSZH (Low Smoke Zero Halogen) reduces smoke AND eliminates halogen acid gases. Confined evacuation routes (Tube, tunnels, ships, hospitals) need LSZH; standard escape routes can specify LSF; standard PVC is acceptable elsewhere."
            onSite="Get the acronym right on the order or you'll end up with the wrong cable on a £100k job. LSF is loosely defined and varies by manufacturer; LSZH is tightly specified. For BS 7671, the choice is governed by Section 422 (fire risk) and the project specification. LSZH is NOT inherently fire-resistant — it's about smoke and gas, not integrity."
          >
            <p>
              PVC contains chlorine. When it burns, it releases hydrogen chloride which forms
              hydrochloric acid in moist airways, eyes and mucous membranes. In a confined
              evacuation route — Tube station, tunnel, ship's corridor, hospital ward — that gas
              cloud blocks escape and damages equipment. LSZH (also written LS0H) cables use
              halogen-free polymers (typically thermosetting EVA or polyolefin compounds) that
              produce minimal smoke and no halogen acid gas in fire. They cost more, are stiffer and
              have lower flexibility — but on the right job, they're not optional.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Fire stopping — Reg 527.2</ContentEyebrow>

          <ConceptBlock
            title="Penetrations through fire compartments"
            plainEnglish="Every penetration through a fire-rated wall, floor or ceiling must be sealed to maintain the rating. Intumescent collars on plastic conduit, mineral wool batts on cable trays, fire-rated putty pads around bundles."
            onSite="The rule covers every opening — power, data, services, drainage, anything. Building Control will check at handover. An unsealed penetration is a documented C2 on the EICR — and a building-control failure that can hold up occupation."
          >
            <p>
              Reg 527.2 reads:{' '}
              <em>
                Where a wiring system passes through elements of building construction such as
                floors, walls, roofs, ceilings, partitions or cavity barriers, the openings
                remaining after passage of the wiring system shall be sealed according to the degree
                of fire resistance prescribed for the respective element of building construction.
              </em>{' '}
              Tested systems include intumescent collars (Hilti, Promat, Rockwool), proprietary
              firestop bricks, mineral wool batts with intumescent ablative coating, and fire-rated
              cable transit boxes (Roxtec). The seal must be tested to BS EN 1366-3 / BS 476-20 to
              the same fire-resistance time as the element penetrated.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 527.2.1 — Sealing of wiring system penetrations"
            clause="Where a wiring system passes through elements of building construction such as floors, walls, roofs, ceilings, partitions or cavity barriers, the openings remaining after passage of the wiring system shall be sealed according to the degree of fire resistance prescribed for the respective element of building construction (if any) before penetration."
            meaning="The phrase 'before penetration' is key — the seal restores the rating that existed before the cable went through. A 60-minute compartment wall stays a 60-minute compartment wall after the cable passes through. Tested system, certified installer, recorded on the cert."
            cite="BS 7671:2018+A4:2026, Reg 527.2.1 (Chapter 52)"
          />

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Other external influences</ContentEyebrow>

          <ConceptBlock
            title="Reg 522.10 — corrosive or polluting substances"
            plainEnglish="Where corrosive vapours, acids, alkalis or salts are present (chemical plants, dairies, swimming-pool plant rooms, coastal installations), wiring system materials must be chosen to resist them — stainless steel armour, halogen-free sheath, sealed glands."
            onSite="Coastal car parks corrode galvanised steel and standard SWA glands within a couple of seasons. Spec stainless 316 conduit and brass / stainless glands. Swimming-pool plant rooms have chlorine vapour — same rule. The catalogue 'industrial' grade is not the same as 'corrosion-resistant'."
          />

          <ConceptBlock
            title="UV / solar radiation — Reg 522.11"
            plainEnglish="Standard PVC sheath crazes and cracks under direct sunlight within 2-5 years. UV-stable PVC, XLPE, and SWA armour with UV-stable bedding all resist UV; bare PVC doesn't."
            onSite="The classic failure: grey PVC SWA on a south-facing wall with no shade. Within 18-24 months the bedding cracks, water tracks down the armour, eventually you get an L-E fault. Either spec UV-stable cable, route under cover, or sleeve in galvanised conduit. Inspect annually."
          >
            <p>
              Reg 522.11.1 covers solar radiation as one of the recognised external influences (AN).
              The wiring system must be selected so that no damage is caused — the obvious fix is
              selecting a sheath compound rated for outdoor UV exposure. SWA armour provides
              mechanical protection but the bedding underneath must still be UV-stable on fully
              exposed runs. Conduit (galvanised steel, GRP, polyamide UV-stable) is the cleanest
              mitigation where cable selection is constrained.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Outdoor enclosures — IP, IK, UV and condensation"
            plainEnglish="An outdoor enclosure must defeat four threats simultaneously: water ingress (IP), impact (IK), UV (sheath material), and condensation (breathers / heaters). Spec one without the others and the enclosure fails."
            onSite="A common mistake: spec IP66 polyester pillar but ignore condensation. Sun-warmed daytime air carrying moisture cools overnight; vapour condenses on internal surfaces; corrosion follows. Fit a breather valve (Spelsberg, Roxtec) and, on circuits where condensation would damage equipment, a small thermostatically-controlled internal heater."
          >
            <p>
              The four-threat checklist for any outdoor enclosure: <strong>IP rating</strong> (at
              least IP44 covered, IP65 exposed, IP66/IP67 in jet-washdown and submerged positions);{' '}
              <strong>IK rating</strong> (IK08-IK10 in plant rooms, car parks and public-access
              locations); <strong>UV stability</strong> (polyester GRP, UV-stable polycarbonate,
              marine-grade stainless steel); <strong>condensation control</strong> (breather / drain
              valves, internal heaters where required by Reg 522.3 / 522.4 and equipment
              manufacturer guidance).
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Specifying IP20 indoor accessories on an outdoor circuit"
            whatHappens="A garage extension is fitted with internal-grade IP20 sockets on the external face of the building, behind a translucent plastic flap. Within 12 months water ingress causes nuisance RCD trips; within 24 months the L-E insulation fails and the breaker locks out. EICR observation C2."
            doInstead="Outdoor accessories must be IP44 minimum where covered, IP55-IP65 where exposed. Specify weatherproof outdoor-grade socket-outlets (BS EN 60309 industrial connectors or BS 1363-2 UK 13 A weatherproof) with hinged covers and proper external glanding. Reg 522.1 / Reg 522.3 (water) require the selection to match the AD code at the location."
          />

          <CommonMistake
            title="No fire stopping at compartmentation penetrations"
            whatHappens="A new comms-room cable run passes through three fire-rated compartment walls in an office block. The installing contractor drills the holes, runs the cables, makes off the terminations — and never seals the penetrations. Building Control walks the building at handover and refuses sign-off. The remedial cost (intumescent collars, mineral wool batts, certified firestop survey) is added on top of the original work."
            doInstead="Reg 527.2 requires every penetration through a fire-rated element to be sealed with a tested system to the same fire-resistance time as the element. Plan firestopping into the cable schedule — note the compartmentation lines on the drawing, specify the firestop product (Hilti CP 644, Promat AESTUVER, Rockwool Firestop Sleeve) per opening size, and book a certified installer to seal them. Photograph each seal and include the photos on the cert."
          />

          <CommonMistake
            title="Undersized impact rating on a plant room enclosure"
            whatHappens="A standard polycarbonate domestic-style consumer unit (IK07, 2 J) is fitted in an industrial plant room as a 'sub-distribution board'. Within months a dropped tool cracks the cover; within a year a passing trolley breaks the door hinge; eventually the unit is damaged enough that exposed busbars are accessible. Major C1 / dangerous condition."
            doInstead="Plant rooms, car parks and industrial spaces need IK08 (5 J) minimum, IK10 (20 J) for high-impact zones. Specify a metal-clad IK10 distribution board with steel door and lock — Schneider Acti9 industrial, Hager VML, ABB SR / SREN ranges. The cost difference over a domestic-style CU is small relative to the installation, the lifetime resilience is significant, and Reg 522.6 expects the choice to be deliberate."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Wet bathroom socket request"
            situation="A customer in a 1980s house wants a 'shaver socket' fitted on the wall above the basin in their en-suite, approximately 1.2 m above floor level. The basin is in the same room as the shower cubicle, with the socket position approximately 0.8 m horizontally from the nearest edge of the shower. The existing radial circuit is 2.5 mm² T&E on a Type B 16 A MCB without RCD protection."
            whatToDo="(1) Map the zones: the proposed socket position is within zone 2 (within 0.6 m horizontal of zone 1) — Section 701 minimum IPX4. A standard BS EN 61558-2-5 shaver socket-outlet (with isolating transformer) is the correct accessory — it satisfies the special requirements of Section 701 for shaver supplies and provides IPX4. (2) The circuit needs 30 mA RCD additional protection — Reg 411.3.3 (sockets) and Reg 701.411.3.3 (location-specific reinforcement). Fit a 16 A 30 mA RCBO at the consumer unit, OR replace the MCB with an RCBO. (3) Confirm Zs at the socket position is within Type B 16 A limits (max ~2.73 Ω corrected). (4) Cert the work on a Minor Works (MEIWC) noting the new RCBO, the IPX4 accessory, and the zone classification on the supplementary information."
            whyItMatters="Shaver sockets are a niche accessory that exists specifically to satisfy Section 701: the integral isolating transformer means the user can plug a Class I shaver into a wet location without breaching SELV / PELV thinking. Fitting a standard 13 A socket in zone 2 — even on RCD — would breach 701.512.3, and an inspector would code C2. Get the right accessory, get the IP rating right, and the install is straightforward."
          />

          <Scenario
            title="Plant room cabinet IP / IK specification"
            situation="A new commercial gym is being fitted out. The plant room houses three air-source heat pumps, a hot-water cylinder, and a dedicated 100 A TP+N sub-board feeding the gym kit upstairs. The room is unheated, occasionally damp from cylinder bleed-off, and in regular use by maintenance staff with ladders, trolleys and tool kits. The architect's spec calls for 'industrial-grade enclosure' with no further detail."
            whatToDo="Define the external influences explicitly: AD3 (water spray — occasional damp), AE5 (light dust — coil cleaning), AG3 (mechanical impact — high, due to ladders / trolleys), AB5 (low ambient — unheated). Specify the sub-board enclosure as: IP55 minimum (water spray + dust), IK10 minimum (20 J impact), metal-clad with steel door and lock, breather valve to manage condensation, internal mounting plate with DIN-rail. Schneider Prisma iPM, Hager Univers N, ABB SR 9000-series all meet these requirements. Add a small enclosure heater (50-100 W thermostatically controlled) if any of the contained equipment's manufacturer guidance flags condensation as a concern. Document the IP / IK selection on the EIC supplementary information."
            whyItMatters="The architect's brief is high-level; the electrician's design has to translate it to BS EN 60529 / BS EN 50102 numbers. Reg 522.1 makes the external-influences analysis a designer responsibility — not a contractor 'pick something off the shelf' decision. A good cert documents the analysis and the selection alongside the test results, demonstrating competent design."
          />

          <SectionRule />

          <ContentEyebrow>Designer's quick reference</ContentEyebrow>

          <ConceptBlock
            title="Picking IP and IK for any location"
            plainEnglish="Walk a five-step decision: (1) What's the water hazard? (2) What's the dust / particulate hazard? (3) What's the impact hazard? (4) What's the UV / corrosive / temperature exposure? (5) What's the special-location override (Sections 701-753)?"
            onSite="(1) Water: dry indoor IPX0; splash IPX4; jets IPX5; immersion IPX7. (2) Dust: clean office IP2X; dusty workshop IP5X; dust-tight industrial IP6X. (3) Impact: domestic / office IK07; plant room IK08; public access / industrial IK10. (4) UV: outdoor exposed = UV-stable sheath OR conduit; corrosive = stainless armour / halogen-free; high temperature = appropriate compound (rubber EPR, silicone). (5) Special location: Section 701 bathrooms IPX4-IPX7; Section 702 swimming pools IPX5 / IPX8; Section 711 exhibitions / shows IP4X; Section 740 fairgrounds / amusement parks IP44 minimum."
          >
            <p>
              The decision tree gets you from environment to specification in seconds. For a typical
              UK domestic refurbishment: IP20 indoor, IP44 outdoor under cover, IP55+ outdoor
              exposed, IPX4 in bathroom zones 1-2, IPX7 in zone 0. For commercial: same indoor
              logic, IK08-IK10 on accessible boards, fire-resistant cable on every safety service,
              fire stopping at every compartmentation penetration. Document the AD / AE / AG codes
              against the location on the design log — that's the audit trail Reg 522.1 expects.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>Worked example — emergency lighting refurbishment</ContentEyebrow>

          <ConceptBlock
            title="From safety-service requirement to compliant cable specification"
            plainEnglish="A 12-luminaire maintained emergency lighting system on a commercial escape route. BS 5266-1 dictates the integrity duration. Reg 527.1 binds you to a cable that meets it. Reg 527.2 binds you to seal every fire-compartment penetration."
            onSite="Eight steps from the BS 5266 brief to the cert entries that demonstrate compliance — written before the install, not reconstructed afterwards."
          >
            <p>
              <strong>1. Safety service requirement.</strong> BS 5266-1 specifies maintained
              emergency lighting on the escape route with 60-minute autonomy and PH 30 minimum cable
              integrity (some commercial occupancies require PH 60 — check the fire strategy).{' '}
              <strong>2. Cable selection.</strong> FP200 Gold (Prysmian) or equivalent to BS EN
              50200 PH 30 — 1.5 mm² for the lighting circuit, sized against Ib and Iz per Appendix
              4. <strong>3. Support specification.</strong> Steel cable cleats / clips every 300 mm
              horizontal, 400 mm vertical (Reg 522.8) — NOT plastic cable ties; they melt in fire
              and the cable falls in the early stages, defeating the integrity class.{' '}
              <strong>4. Routing.</strong> Avoid routing through high-fire-load rooms (boiler rooms,
              plant rooms) where possible; where unavoidable, use the highest PH class and shortest
              run. <strong>5. Compartment penetrations.</strong> Identify each fire-rated wall /
              floor crossing on the drawing; specify the firestop product (e.g. Hilti CP 658
              firestop collar around plastic conduit, mineral wool batt around cable tray openings);
              book a certified installer; photograph each seal with a labelled ticket.{' '}
              <strong>6. Termination.</strong> Brass / stainless glands rated for the cable type,
              with proper torque per manufacturer; gland-plate IP rating matched to the luminaire's
              environmental rating. <strong>7. Testing.</strong> Continuity, IR (segregated from
              main lighting on the IR test), polarity, Zs, RCD operation; plus the BS 5266
              commissioning test of full 3-hour discharge with photometric verification at
              completion. <strong>8. Cert entries.</strong> EIC schedule of test results: cable type
              FP200 Gold, integrity PH 30, all penetrations sealed and recorded, supplementary
              photographic record of firestopping installations, commissioning certificate per BS
              5266-1.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'Reg 522.1 is the head reg for external-influence selection. Walk the location, identify the AD / AE / AG codes (Appendix 5), and only then specify the equipment.',
              'IP rating (BS EN 60529): first digit 0-6 (solid foreign objects), second digit 0-9 (water). IPX4 = splash; IPX5 = jets; IPX7 = immersion.',
              'IK rating (BS EN 50102): IK00-IK10. Domestic IK07 (2 J), plant room IK08-IK10 (5-20 J). Reg 522.6 makes IK selection a documented design step.',
              'Section 701 bathroom zoning: zone 0 IPX7, zones 1 and 2 IPX4. Plus 30 mA RCD additional protection on every circuit serving the location.',
              'Reg 527.1 — fire-resistant cables (FP200, FP400, MICC) for safety services and fire-resistant circuits; PH integrity class set by the safety-service standard (BS 5266 / BS 5839).',
              'Reg 527.2 — every penetration through a fire-rated building element must be sealed with a tested system to the same fire-resistance time. Unsealed penetrations are typically C2 on the EICR.',
              'LSF reduces smoke; LSZH reduces smoke AND eliminates halogen acid gas — required on confined evacuation routes (Tube, tunnels, ships, hospitals, data centres).',
              'Outdoor enclosures need four-axis specification: IP (water), IK (impact), UV (sheath / material), and condensation control (breathers, heaters). Spec one without the others and the enclosure fails.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 5
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 6 — Inspection, Testing &amp; Certification
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module5Section6;
