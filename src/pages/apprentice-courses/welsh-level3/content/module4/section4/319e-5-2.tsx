/**
 * Unit 319E · Criterion 5.2 — The operating principles, types, limitations and
 * applications of electrical space and water heating appliances and components.
 *
 * Approach: taught in the criterion&rsquo;s own order. First how electrical heating
 * actually produces heat — I²R in a resistance element, then induction, dielectric
 * and infra-red, then the heat pump, which moves heat instead of making it. Then
 * the water heating and space heating types, then the limitations that bite in
 * service, then the circuits and applications each one lands on.
 *
 * Every technical fact, figure, regulation number and standard reference on this
 * page comes from the existing published teaching in this course on electric
 * heating principles and applications (level3/module3/section6/Sub5.tsx).
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

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
} from '@/components/study-centre/learning';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';

const quizQuestions = [
  {
    id: 1,
    question: 'A resistive heating element converts electrical energy into heat at an efficiency of:',
    options: [
      'Effectively 100% — all the energy in becomes heat',
      'Around 60%, the rest lost as light',
      'Around 85%, the rest lost as friction',
      'Above 100%, because it draws heat from the air',
    ],
    correctAnswer: 0,
    explanation:
      'The I²R losses in a heating element are the whole point of the device. From a useful-output point of view every watt in becomes a watt of heat, so efficiency is effectively 100%.',
  },
  {
    id: 2,
    question: 'The specific heat capacity of water used in heating calculations is:',
    options: ['4186 J/kg·K', '1000 J/kg·K', '2200 J/kg·K', '10 000 J/kg·K'],
    correctAnswer: 0,
    explanation:
      'c for water is 4186 J/(kg·K), used in E = m × c × ΔT. One litre of water is one kilogram, which keeps the arithmetic straightforward on site.',
  },
  {
    id: 3,
    question: 'An induction hob heats the pan by:',
    options: [
      'Electromagnetic induction creating eddy currents in ferromagnetic cookware',
      'A radiant element under the glass glowing red',
      'Microwave energy exciting the water in the food',
      'A gas flame beneath a ceramic plate',
    ],
    correctAnswer: 0,
    explanation:
      'An AC coil under the glass creates an alternating field, the ferromagnetic pan develops eddy currents and heats itself resistively. The pan is the element, the glass stays cool, and the arrangement is 85–90% efficient.',
  },
  {
    id: 4,
    question: 'A heat pump quoted at COP 3.5 delivers:',
    options: [
      '3.5 kW of heat for every 1 kW of electrical input',
      '3.5 times the start-up current of a resistive heater',
      'Water heated to 3.5 times the incoming temperature',
      '3.5% better efficiency than a resistive heater',
    ],
    correctAnswer: 0,
    explanation:
      'COP is heat output divided by electrical input. The extra energy comes from the outside air or the ground. Air-source units typically run COP 3.0–4.5, ground-source higher.',
  },
  {
    id: 5,
    question: 'A 3 kW immersion heater on 230 V draws approximately:',
    options: ['13 A', '7 A', '23 A', '30 A'],
    correctAnswer: 0,
    explanation:
      'I = P / V = 3000 / 230 = 13.04 A. That lands on a dedicated 16 A MCB in 2.5 mm² T&E with a double-pole switch at the cylinder.',
  },
  {
    id: 6,
    question: 'Typical power density for residential electric underfloor heating cable:',
    options: ['100–200 W/m²', '10–50 W/m²', '500 W/m²', '1000 W/m²'],
    correctAnswer: 0,
    explanation:
      '100–200 W/m² is the residential range. Around 100 W/m² for primary heating in a well-insulated room, 150 W/m² where insulation is poorer, 200 W/m² for boost in a bathroom with a cold floor.',
  },
  {
    id: 7,
    question: 'A storage heater stores its energy as:',
    options: [
      'Heat in a high-density ceramic core, charged overnight on an off-peak tariff',
      'Pressurised hot water in an internal sealed tank',
      'Chemical energy in a rechargeable battery pack',
      'Compressed air released slowly through the day',
    ],
    correctAnswer: 0,
    explanation:
      'A brick core is heated overnight on cheap off-peak electricity and releases the heat through the day, with output controlled by a damper or a fan.',
  },
  {
    id: 8,
    question: 'Under Approved Document L1A (Future Homes Standard), new dwellings may not use:',
    options: [
      'Direct-acting electric resistive heating as the primary heat source, with limited exceptions',
      'A heat pump as the primary source of space heating',
      'Underfloor heating fed from a low-temperature heat source',
      'Solar thermal panels supplementing the hot water supply',
    ],
    correctAnswer: 0,
    explanation:
      'From 2025 new dwellings cannot use fossil-fuel heating, and direct-acting electric resistive heating is generally not permitted as primary heat for energy reasons. It stays permitted as supplementary or limited use — towel rails, frost protection.',
  },
];

const faqs = [
  {
    question: 'Why does a heat pump beat resistive heating if resistive is 100% efficient?',
    answer:
      'Because a heat pump is not making the heat, it is moving it. A 1 kW resistive heater gives 1 kW of heat. A 1 kW heat pump gives 3–4 kW of heat, with the extra extracted from outside air or the ground. Same electricity bill, three to four times the heat. That is why the Future Homes Standard pushes heat pumps for new builds.',
  },
  {
    question: 'How do I size an immersion heater for a cylinder?',
    answer:
      'Tank capacity multiplied by specific heat multiplied by temperature rise gives you the energy, then divide by heater power to get the heating time, then allow for standing losses. Most domestic 150 L tanks work on 3 kW for about an hour for a full reheat from cold. Bigger tanks may need 6 kW or two parallel 3 kW heaters.',
  },
  {
    question: 'Is electric storage heating finished?',
    answer:
      'Not yet. It is still useful for properties without gas where a heat-pump retrofit is impractical. New high heat retention units with controllable output and off-peak charging are still going into flats. Less efficient than a heat pump but cheaper to install.',
  },
  {
    question: 'What protective devices does an electric heating circuit need?',
    answer:
      'An MCB sized to the circuit rating plus 30 mA RCD protection per BS 7671 Regulation 411.3.3. Underfloor heating in a bathroom must be supplementary equipotential bonded, and anything outdoors or in a wet area needs IP-rated enclosures. A heat pump also needs a Type B RCD because of the variable-speed inverter inside it.',
  },
];

export default function Lesson319e_5_2() {
  return (
    <div className="space-y-8">
      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        How electrical heating actually produces heat, the space and water heating types you will
        install, what limits each one in service, and the circuit each of them lands on.
      </p>

      <TLDR
        points={[
          'Resistive heating is I²R — every watt of electrical input becomes a watt of heat, so a resistance element is effectively 100% efficient.',
          'Induction, dielectric and infra-red are the other three ways of producing heat electrically, and each lands in a different application.',
          'A heat pump does not make heat, it moves it. COP is heat output divided by electrical input — typically 3.0–4.5 for air-source.',
          'Water heating maths is E = m × c × ΔT with c = 4186 J/(kg·K) for water, and one litre is one kilogram.',
          'The limitations are element failure, limescale, the 10.5 kW practical ceiling on a single-phase shower, and the gap between a quoted COP and a real seasonal figure.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain how a resistance element produces heat and how its construction sets the surface power density it can survive.',
          'Distinguish resistive, induction, dielectric and infra-red heating by their operating principle.',
          'Identify the common electrical water heating and space heating appliance types and state their typical ratings.',
          'Calculate the energy and time to heat a quantity of water, and the current drawn by a heating appliance.',
          'State the limitations of each appliance type and select the correct circuit, protective device and isolation for the application.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>How electrical heating makes heat</ContentEyebrow>

      <ConceptBlock
        title="I²R does all the work — the resistance element as an operating principle"
        plainEnglish="Pass current through a resistive element and all the electrical energy becomes heat. In every other circuit on the job I²R loss is the enemy. In a heating appliance it is the entire output."
        onSite="This is why you can never improve the efficiency of a resistive heater. A 2 kW panel heater and a 2 kW immersion put exactly the same energy into the building. The only question is where that heat goes and how fast."
      >
        <p>
          From a useful-output point of view, resistive heating is effectively 100% efficient. Every
          watt drawn from the supply appears as heat in the element, and from there in the water, the
          air or the floor screed.
        </p>
        <p>
          <strong>What an element is actually made of.</strong> A heating element is a length of
          resistance wire — typically nichrome, an 80% nickel / 20% chromium alloy — packed inside a
          stainless or copper sheath and electrically insulated from that sheath by compressed
          magnesium oxide powder. The wire dissipates I²R as heat; the magnesium oxide transfers
          that heat out to the sheath while keeping the live wire isolated from the case.
        </p>
        <p>
          <strong>Surface power density is the design limit.</strong> The element designer controls
          watts per square centimetre of sheath surface. Too high and the element overheats and
          dies; too low and the unit is physically too big for the job. Typical figures:
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Water immersion.</strong> 5–10 W/cm². Water is an excellent coolant, so the
            element can run hard.
          </li>
          <li>
            <strong>Air heating.</strong> 1–3 W/cm². Air is a poor coolant, so the element runs much
            hotter for the same input.
          </li>
          <li>
            <strong>Underfloor cable in screed.</strong> 0.1–0.5 W/cm². The heat is dissipated
            slowly into the thermal mass of the floor.
          </li>
        </ul>
        <p>
          Exceed the design value and you cook the wire. The element then fails as a localised
          hotspot rather than a clean whole-length burnout — which is why a failed element often
          looks fine from the outside.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="319e-5-2-check-1"
        question="Why does an air-heating element run at a much lower surface power density than an immersion element of the same rating?"
        options={[
          'Because air heating appliances are always lower power than water heating ones',
          'Because the magnesium oxide insulation is omitted in air heaters',
          'Because air is a poor coolant, so the sheath reaches a far higher temperature for the same watts per square centimetre',
          'Because the nichrome alloy used in air heaters has a lower resistance',
        ]}
        correctIndex={2}
        explanation="Water carries heat away from an immersion sheath very effectively, so 5–10 W/cm² is survivable. Air does not, so an air-heating element is designed down to 1–3 W/cm² to keep the sheath temperature under control."
      />

      <ConceptBlock
        title="Induction, dielectric, infra-red and the heat pump — the other operating principles"
        plainEnglish="Not everything electrical heats by pushing current through a resistance. Induction puts the heat in the pan, dielectric puts it inside the food, infra-red puts it straight onto people and surfaces, and a heat pump does not make heat at all — it moves it."
        onSite="Knowing which principle an appliance uses tells you what will go wrong with it. An induction hob with an aluminium pan does nothing at all — that is not a fault, it is the physics."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Induction.</strong> An AC coil under the glass creates an alternating magnetic
            field. A ferromagnetic pan sitting on it develops eddy currents and heats itself
            resistively — the pan is the element. The glass stays cool and the arrangement is 85–90%
            efficient, against roughly 60% for gas or 70% for radiant electric. The catch is the
            cookware: it must be ferromagnetic, so most modern stainless and cast iron work, but
            aluminium and copper do not.
          </li>
          <li>
            <strong>Dielectric.</strong> A high-frequency electric field, typically 2.45 GHz,
            rotates the water dipoles in the food. They flip to follow the field and molecular
            friction generates heat throughout the food rather than just at the surface. Wall-plug
            efficiency is around 50–65%.
          </li>
          <li>
            <strong>Infra-red.</strong> A radiant panel heats people and surfaces directly rather
            than warming the air first. It is around 100% efficient as a resistive heater, but the
            perceived comfort is better than the air temperature suggests. Useful in hard-to-heat
            rooms with high ceilings or poor insulation.
          </li>
        </ul>
        <p>
          <strong>The heat pump is the odd one out.</strong> It runs a refrigeration cycle to take
          low-grade heat from outside air or the ground and lift it to a temperature that is useful
          indoors. The electricity pays for the lifting, not for the heat itself, which is why it is
          the one electrical heating appliance whose heat output can exceed its electrical input.
        </p>
        <p>
          <strong>Coefficient of performance.</strong> COP is heat output divided by electrical
          input. A COP of 3.5 means 1 kW of electricity delivers 3.5 kW of heat. That single number
          is why the Future Homes Standard pushes heat pumps and steers new builds away from
          direct-acting resistive heating.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Air-source heat pump.</strong> Extracts heat from outside air. COP 3.0–4.5 at
            7 °C, dropping at lower outdoor temperatures. The standard new-build fit under the
            Future Homes Standard.
          </li>
          <li>
            <strong>Ground-source heat pump.</strong> Borehole or trench loop. COP 4–5 and above,
            and more stable through winter because the ground temperature moves far less than the
            air. Higher installation cost.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Water heating types</ContentEyebrow>

      <ConceptBlock
        title="Stored and instantaneous — two different jobs, two different sums"
        plainEnglish="A cylinder with an immersion heater stores hot water and reheats it slowly. An instantaneous shower heats water as it flows, so it has to do the same job in seconds instead of hours — which is why it needs such a big circuit."
        onSite="Both calculations come off the same physics. For a cylinder you work in kilowatt-hours over hours. For a shower you work in kilowatts at a flow rate."
      >
        <p>
          <strong>Stored — E = m × c × ΔT.</strong> Energy in joules equals mass in kilograms times
          specific heat times temperature rise. For water, c = 4186 J/(kg·K), and one litre is one
          kilogram.
        </p>
        <p>
          Worked example: a 200 L cylinder from 15 °C to 60 °C on a 3 kW immersion. E = 200 × 4186 ×
          45 = 37 674 000 J = 37.67 MJ = 10.46 kWh. Time = E / P = 10.46 / 3 = 3.49 hours, so 3 h
          29 min. Then add the standing losses through the cylinder jacket, around 0.5 kWh a day for
          a Class A cylinder.
        </p>
        <p>
          <strong>Instantaneous — the same sum per second.</strong> P = flow × c × ΔT, with flow in
          litres per second. To raise 8 L/min, which is 0.133 L/s, by 35 °C takes 0.133 × 4186 × 35
          = 19.5 kW. That is why a real 9–10 kW shower achieves maybe 4–5 L/min at the same
          temperature rise — adequate, but not a torrent.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Immersion heater, 3–6 kW.</strong> Element in a hot water cylinder, on a 16–32 A
            circuit. A 3 kW unit draws I = 3000 / 230 = 13.04 A.
          </li>
          <li>
            <strong>Instantaneous shower, 8–10.5 kW.</strong> Heats water in flow, on a 32–45 A
            dedicated circuit. A 9 kW unit draws 9000 / 230 = 39.1 A, so 6 mm² or 10 mm² on a 40 A
            MCB.
          </li>
          <li>
            <strong>Heat batteries.</strong> Units such as Sunamp and Tepeo store heat for hot water
            in phase-change materials, charged when electricity is cheap and discharged on demand.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 526.1 (Connections)"
        clause="Every connection between conductors or between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection."
        meaning="Heating circuits run at high steady-state current for hours at a time — ideal conditions for a poor termination to overheat. Regulation 526.1 requires the terminal selection to account for current, conductor class and the temperature the terminal actually reaches in service. Immersion-heater flex into a screw terminal is a classic failure point once the terminal heats and the insulation degrades; ferrules or factory-made connectors avoid it."
        cite="Source: BS 7671:2018+A4:2026, Regulation 526.1."
      />

      <SectionRule />

      <ContentEyebrow>Space heating types</ContentEyebrow>

      <ConceptBlock
        title="The resistive space heating family and where each one sits"
        plainEnglish="All of these convert electricity to heat the same way. What separates them is how the heat is stored, how it is released, and how quickly the room responds."
        onSite="The rating tells you the circuit. The release mechanism tells you whether the customer will be happy with it."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Storage heater, 1.7–3.4 kW.</strong> Heats a high-density ceramic brick core
            overnight on an off-peak tariff and releases it through the day, with output controlled
            by a damper or a fan.
          </li>
          <li>
            <strong>High heat retention storage heater.</strong> The modern version — the same heat
            stored in a smaller, better-insulated core with electronic controls. It modulates the
            charge against outside temperature and forecast demand instead of charging a fixed
            nominal kW for the whole window.
          </li>
          <li>
            <strong>Panel heater, 0.5–2 kW.</strong> Convector or radiant. Fast response, no storage.
          </li>
          <li>
            <strong>Underfloor cable, 50–200 W/m².</strong> Embedded in screed or laid under tiles.
          </li>
          <li>
            <strong>Tubular heater, 60–180 W.</strong> Frost protection in lofts and unheated areas.
          </li>
          <li>
            <strong>Infra-red panel.</strong> Radiant output straight to people and surfaces.
          </li>
        </ul>
        <p>
          <strong>Underfloor heating in detail.</strong> Electric underfloor heating comes in three
          formats: loose cable spread by hand at whatever spacing you choose, pre-spaced mats with
          the cable bonded to a mesh, and wet systems heated by a separate boiler or heat pump.
          Cable spacing is what sets the W/m² you actually get, and getting the sensor wrong is what
          brings you back to the job.
        </p>
        <p>
          <strong>Sizing.</strong> The room heat loss gives you the required W/m². Typical values are
          100 W/m² for primary heating in a well-insulated room, 150 W/m² for primary heating where
          the insulation is poorer, and 200 W/m² for boost in a bathroom with a cold floor. Use a
          slightly higher rating than the bare calculation to give an acceptable warm-up time.
        </p>
        <p>
          <strong>Cable spacing.</strong> If the cable is rated at 17 W/m and you want 100 W/m², the
          spacing is 17 / 100 = 0.17 m, so 170 mm centre to centre. Mat manufacturers publish this
          as a chart against W/m² and cable rating. Loose cable lets you mix spacings — closer along
          the cold outside walls, wider in the room interior — for an even floor temperature.
        </p>
        <p>
          <strong>Floor sensor, not air sensor.</strong> The regulating loop on a tiled floor is
          floor-warm-enough, not room-warm-enough. The floor sensor lives inside a conduit poured
          into the screed near the heating cable so it can be replaced if it fails. Air-sensor-only
          thermostats on underfloor heating lead to overheating, scorched floors and cracked
          laminate.
        </p>
        <p>
          <strong>Bathroom installation.</strong> The cable goes in zone 2 or outside it, clear of
          zone 0 and zone 1. Connections are made in a junction box outside the bathroom, or in a
          box with an IP rating suitable for the zone. Check the manufacturer guidance alongside
          BS 7671 Section 701 before setting out.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="319e-5-2-check-2"
        question="An underfloor cable is rated 17 W/m and the design calls for 150 W/m². What is the correct centre-to-centre spacing?"
        options={[
          'About 113 mm',
          'About 170 mm',
          'About 220 mm',
          'About 880 mm',
        ]}
        correctIndex={0}
        explanation="Spacing is cable rating divided by target power density: 17 / 150 = 0.113 m, so roughly 113 mm. The same sum at 100 W/m² gives 170 mm — a higher output means the runs sit closer together."
      />

      <SectionRule />

      <ContentEyebrow>Limitations in service</ContentEyebrow>

      <ConceptBlock
        title="Why elements fail, and why hard water kills immersion heaters early"
        plainEnglish="A heating element does not usually fail because the wire wore out. It fails at a seal, at a corrosion pit, or under a layer of scale that stopped it getting rid of its own heat."
        onSite="Replace the whole element. Trying to repair one is a false economy and you cannot restore the magnesium oxide packing."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Wire-end migration.</strong> The resistance wire migrates through the magnesium
            oxide over thousands of thermal cycles and eventually shorts end to end or to the
            sheath.
          </li>
          <li>
            <strong>Corrosion through the sheath.</strong> Immersion heaters in hard-water areas
            develop scale, then localised pitting under the scale, then perforation and water
            ingress into the element.
          </li>
          <li>
            <strong>Thermal cycling fatigue at the seal.</strong> Where the wire enters the sheath.
            Most immersion heaters fail here first.
          </li>
        </ul>
        <p>
          <strong>Why limescale matters so much.</strong> Calcium carbonate on the element drops
          thermal conductivity sharply. The element then has to run at a higher temperature to put
          the same heat into the water, the effective surface power density relative to the heated
          metal rises, and failure arrives years earlier than it would in a soft-water area.
          Softening the water, or fitting a low-watt-density element — the same 6 kW spread over a
          longer element body — extends life significantly.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="The limits of the supply — why 10.5 kW is the practical ceiling on a shower"
        plainEnglish="You can buy a shower advertised at 12 kW or 15 kW. What you usually cannot do is feed one from a standard UK single-phase domestic supply."
        onSite="Work the current before you work the price. A 10.5 kW shower on 230 V draws 45.7 A, and that is the largest current that sits comfortably on a 50 A MCB and 10 mm² T&E."
      >
        <p>
          Above 10.5 kW you are into 16 mm² SWA or single cable too stiff to terminate in a back
          box, and into split-phase or three-phase domestic supplies, which are rare in the UK. That
          is why the 12 kW and 15 kW instantaneous showers you see on some imports are generally not
          achievable on a standard UK single-phase domestic supply.
        </p>
        <p>
          <strong>Pumped versus unpumped.</strong> A pumped instantaneous shower has a small electric
          impeller boosting flow. For a given electrical power it can deliver more litres at a lower
          temperature rise, or fewer litres at a higher one. Marketing copy obscures this — always
          read the temperature-rise against flow-rate curve on the data sheet for an honest
          comparison.
        </p>
        <p>
          <strong>Derating is part of the limitation.</strong> A 10 mm² cable rated 64 A clipped can
          drop to 50 A where it is buried in 100 mm of rockwool, which forces either a smaller
          protective device or a re-routed run. Check the installation method before you settle on
          the cable size.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Heat pump limitations — the gap between a laboratory COP and a real winter"
        plainEnglish="A manufacturer quotes COP at a single test condition, usually 7 °C outdoor air and 35 °C flow. That is the condition where the unit performs best. What the customer actually pays for is the seasonal figure."
        onSite="If a retrofit quote is built on the headline COP, the running costs in the customer&rsquo;s first winter will not match the promise."
      >
        <p>
          <strong>COP moves with outdoor temperature.</strong> An air-source unit at 7 °C outdoor and
          35 °C flow might give COP 4.0. The same unit at −5 °C outdoor and 50 °C flow drops to
          COP 2.2. Below about −7 °C it may bring in its electric backup heater, which is COP 1.0,
          and defrost cycles every 30–60 minutes in cold damp conditions temporarily reverse the
          cycle and take energy back out of the building.
        </p>
        <p>
          <strong>Flow temperature is everything.</strong> A heat pump feeding underfloor heating at
          35 °C stays above COP 4. The same unit pushed to 65 °C for old microbore radiators often
          falls to COP 2.0 or worse, which makes it barely better than direct resistive heating. UK
          guidance for a compliant air-source retrofit emphasises low-flow-temperature emitter
          sizing — often radiator panels at double the original size — to hold flow temperature
          below 50 °C.
        </p>
        <p>
          <strong>SCOP is the honest number.</strong> Seasonal COP is the weighted average across a
          typical UK heating season and is always lower than the headline COP. ErP bands run A++
          above 4.6, A+ 3.8–4.6, A 3.4–3.8, B 3.1–3.4 and C below that. For an air-source retrofit
          on a typical UK house, expect SCOP 2.8–3.8 in practice; for a new build with proper
          underfloor heating and good fabric, SCOP above 4.0 is achievable. The MCS Heat Emitter
          Guide and the SAP 10.2 calculator are the tools used in formal sizing.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 421.11 (Protection against fire)"
        clause="Persons, livestock and property shall be protected against harmful effects of heat or fire which may be generated or propagated in electrical installations. Manufacturers' instructions shall be taken into account in addition to the requirements of BS 7671."
        meaning="A resistive heating appliance converts all of its electrical energy into heat by definition. Regulation 421.11 puts the duty on you to mount, ventilate and clear the appliance so that heat goes where it is intended and not into combustible building fabric. Underfloor cable buried under thermal insulation breaches 421.11, because the cable cannot dissipate its rated W/m²."
        cite="Source: BS 7671:2018+A4:2026, Regulation 421.11."
      />

      <SectionRule />

      <ContentEyebrow>Applications — the circuit each one lands on</ContentEyebrow>

      <ConceptBlock
        title="From appliance rating to circuit, protection and isolation"
        plainEnglish="Every heating appliance ends up as a current, a cable, a protective device and a means of isolation. Work them in that order and you cannot go far wrong."
        onSite="Heating loads run at close to full current for hours. Treat them as continuous, not intermittent, and never share a circuit with anything else."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Immersion heater.</strong> 3 kW is 13.04 A, so a dedicated 16 A MCB on 2.5 mm²
            T&E with a double-pole switch at the cylinder. Never spur it off a ring final.
          </li>
          <li>
            <strong>Electric shower.</strong> Dedicated radial sized on the appliance, 30 mA RCD per
            Regulation 411.3.3, and a double-pole pull-cord switch — or a fused isolator outside the
            bathroom for a fixed wall-mounted unit. Supplementary equipotential bonding to the
            shower body is required unless main equipotential bonding is verified to meet Regulation
            415.2.
          </li>
          <li>
            <strong>Underfloor heating in a bathroom.</strong> Supplementary equipotential bonding,
            connections outside the room or in an enclosure rated for the zone, and a floor sensor
            in a replaceable conduit.
          </li>
          <li>
            <strong>Outdoor and wet areas.</strong> IP-rated enclosures appropriate to the location.
          </li>
          <li>
            <strong>Heat pump.</strong> Sized on the electrical input, not the heat output, then
            checked against inrush. See the worked scenario below.
          </li>
        </ul>
        <p>
          <strong>Tariff drives the application too.</strong> Economy 7 gives a seven-hour off-peak
          window, typically 00:30 to 07:30 depending on region and supplier, at roughly half the day
          rate. Standard storage heaters charge a brick core at a fixed nominal kW for the whole
          window; high heat retention units modulate against outside temperature and forecast
          demand. Smart tariffs expose half-hourly wholesale pricing to the meter so intelligent
          loads can shift to the cheapest periods, which is the same principle heat batteries and
          smart EV charging work on.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="The Building Regulations 2010 (England) — Approved Document L1A (Future Homes Standard)"
        clause="From 2025, new dwellings shall not use fossil-fuel heating. Primary heat source must be a low-carbon technology (heat pump, district heating, etc.). Direct-acting electric resistive heating is permitted only as supplementary or limited-use (e.g. towel rails, frost protection) — not as primary heat unless specific exemption."
        meaning="The Future Homes Standard ends new gas central heating and effectively also ends direct electric primary heating in new dwellings. Heat pumps dominate new-build heating as a result. Existing housing still allows resistive options for retrofit, but with consequences for the energy rating."
        cite="Source: Approved Document L1A (Future Homes Standard, 2025)."
      />

      <InlineCheck
        id="319e-5-2-check-3"
        question="Why does an air-source heat pump need a Type B RCD rather than a Type A?"
        options={[
          'Because the outdoor unit is exposed to weather',
          'Because the supply is always three-phase',
          'Because the compressor inrush can reach six times the steady-state current',
          'Because the variable-speed inverter inside it can produce smooth DC fault current',
        ]}
        correctIndex={3}
        explanation="The inverter driving the variable-speed compressor is the reason. Inrush is a real issue too, but that is answered with a Type C MCB — the RCD type is decided by the DC fault current the inverter can produce."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Feeding an immersion heater from a fused spur off the ring final"
        whatHappens={
          <>
            A 3 kW immersion is 13 A nominal, so it looks like it will sit happily behind a 13 A
            fuse. The apprentice wires it on a fused spur in 1.5 mm² off the ring. The fuse holds.
            But 13 A continuous on 1.5 mm² — rated 14 A clipped, 9.5 A in conduit, and less again
            with grouping — means the cable runs hot for hours every day and the insulation degrades
            over years.
          </>
        }
        doInstead={
          <>
            An immersion heater gets a dedicated 16 A MCB on a 2.5 mm² T&amp;E radial with a
            double-pole switch at the cylinder. Heating loads are continuous, not intermittent, so
            there is no diversity to lean on. Do not spur immersion heaters off ring finals.
          </>
        }
      />

      <CommonMistake
        title="Quoting a heat pump retrofit on the headline COP"
        whatHappens={
          <>
            The data sheet says COP 4.0 and the quote promises running costs to match. The house has
            its original microbore radiators, so the system needs 65 °C flow to heat the rooms. In
            January the unit is running at COP 2.0 or worse, it is bringing in its backup heater
            below about −7 °C, and it is defrosting every half hour in damp weather. The customer
            compares the bill against the promise.
          </>
        }
        doInstead={
          <>
            Quote against the seasonal figure, not the laboratory one. Expect SCOP 2.8–3.8 on a
            typical UK retrofit. Size the emitters for a low flow temperature — below 50 °C — using
            the MCS Heat Emitter Guide, and tell the customer up front that oversized radiators or
            underfloor heating are what make the running-cost figures real.
          </>
        }
      />

      <Scenario
        title="Sizing the supply for an air-source heat pump in Bridgend"
        situation={
          <>
            A semi-detached house is having a 7 kW air-source heat pump fitted, replacing an old
            electric boiler. The unit is quoted at COP 3.2 at design conditions and needs a
            single-phase 230 V supply. You have to work out the current, the cable, the protective
            device and the RCD before the consumer unit is opened.
          </>
        }
        whatToDo={
          <>
            Work the electrical input first: 7000 / 3.2 = 2188 W, so 2.19 kW. Steady-state current is
            2188 / 230 / 0.95 for power factor = 10.0 A. But the compressor inrush at start can be
            four to six times that — 40 to 60 A briefly — so it needs a Type C MCB. Cable: 2.5 mm²
            T&amp;E at an Iz of around 24 A clipped is adequate for the steady-state current, but
            check volt drop at full demand over the actual run. Protection: a 16 A Type C with a
            30 mA Type B RCD, which is mandatory here because of the variable-speed inverter inside
            the unit. Add an SPD per Section 443. Then read the manufacturer wiring instructions —
            some units call for a 32 A supply so the backup heater can be used.
          </>
        }
        whyItMatters={
          <>
            Heat pumps are the dominant new-build heating technology, so this calculation comes up
            constantly. Sizing on the heat output instead of the electrical input over-specifies the
            circuit; ignoring inrush gives nuisance tripping on a Type B; and fitting the wrong RCD
            type leaves the inverter&rsquo;s DC fault current undetected.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Resistive heating is I²R and the losses are the output — effectively 100% efficient. The element is nichrome wire in a sheath, insulated by compressed magnesium oxide.',
          'Surface power density is the element design limit: 5–10 W/cm² in water, 1–3 W/cm² in air, 0.1–0.5 W/cm² in screed.',
          'Induction heats a ferromagnetic pan by eddy currents at 85–90% efficiency; dielectric rotates water dipoles at 2.45 GHz; infra-red radiates straight to people and surfaces.',
          'A heat pump moves heat rather than making it. COP 3.0–4.5 for air-source, 4–5 and above for ground-source.',
          'Water heating: E = m × c × ΔT with c = 4186 J/(kg·K). A 200 L cylinder from 15 °C to 60 °C on 3 kW takes 10.46 kWh and 3 h 29 min.',
          'Space heating types: storage 1.7–3.4 kW, panel 0.5–2 kW, underfloor 50–200 W/m², tubular 60–180 W for frost protection.',
          'Limitations: elements fail at the seal or under scale; 10.5 kW at 45.7 A is the practical single-phase shower ceiling; quoted COP is not seasonal COP.',
          'Applications: immersion on a dedicated 16 A MCB in 2.5 mm², shower on a dedicated radial with 30 mA RCD per 411.3.3, heat pump on a Type C MCB with a Type B RCD.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz questions={quizQuestions} title="Electrical space and water heating — knowledge check" />
    </div>
  );
}
