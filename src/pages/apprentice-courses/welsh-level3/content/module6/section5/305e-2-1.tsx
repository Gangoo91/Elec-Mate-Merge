/**
 * Unit 305E · Learning outcome 2 · Criterion 2.1 — How to determine the size and
 * rating of electrical cables (basic single-phase circuits to non-reactive loads)
 *
 * Welsh Level 3 (Building Services Engineering — Electrotechnical Installation),
 * unit 305E Understand How to Install Wiring Systems. Learning outcome 2:
 * understand the industry recognised methods for determining the type, size and
 * rating of electrical cables.
 *
 * Approach: the criterion scope is deliberately narrow — single-phase, resistive
 * loads — so the page spends its depth on the reasoning rather than on more
 * cases. Reg 433.1.1 first, then the Reference Method, then the derate stack,
 * then two worked circuits that differ only in one section of their route, to
 * show how far the answer moves. Every table number, factor and tabulated value
 * is carried across from the published Level 2 cable-sizing lessons.
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
  VideoCard,
} from '@/components/study-centre/learning';
import { VoltageDropDiagram } from '@/components/study-centre/diagrams';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { videos } from '@/data/study-centre/video-library';

const quizQuestions = [
  {
    id: 1,
    question: 'Reg 433.1.1 states the cable-sizing inequality as:',
    options: ['Ib ≤ In ≤ Iz', 'Ib ≤ Iz ≤ In', 'Iz ≤ In ≤ Ib', 'In ≤ Ib ≤ Iz'],
    correctAnswer: 0,
    explanation:
      'Design current sits inside device rating, which sits inside cable capacity. The device must let the design load through without nuisance tripping, and the cable must carry whatever the device lets through until it operates.',
  },
  {
    id: 2,
    question: 'A circuit has Ib = 28 A protected by a 32 A device. The minimum cable Iz must be:',
    options: ['At least 32 A', 'At least 28 A', 'At least 40 A', 'At least 45 A'],
    correctAnswer: 0,
    explanation:
      'Iz is compared against In, not against Ib. Reg 433.1.1 requires Iz to be at least 32 A here. Size to the 28 A and the device could sit on a sustained overload the cable cannot carry.',
  },
  {
    id: 3,
    question: 'Required tabulated It is calculated as:',
    options: [
      'It = In ÷ (Ca × Cg × Ci × Cf)',
      'It = In × Ca × Cg × Ci × Cf',
      'It = Ib ÷ (Ca × Cg)',
      'It = Iz × (Ca + Cg + Ci + Cf)',
    ],
    correctAnswer: 0,
    explanation:
      'The factors sit in the denominator, so dividing by them pushes the required tabulated capacity up. Working the other way, Iz = It × Ca × Cg × Ci × Cf turns a table value into real capacity.',
  },
  {
    id: 4,
    question:
      'Twin and earth clipped direct to a wall surface, free air on one side, no insulation around it. The Reference Method is:',
    options: ['Method C', 'Method A', 'Method B', 'Method 100'],
    correctAnswer: 0,
    explanation:
      'Method C is clipped direct to a non-metallic surface with free air on at least one side, and it gives the most generous column for twin and earth. Method A is conduit in an insulated wall, Method B conduit on a wall, Method 100 twin and earth covered by thermal insulation.',
  },
  {
    id: 5,
    question: 'Ambient temperature of 35 °C around a 70 °C PVC cable gives a Ca of approximately:',
    options: ['0.94', '1.00', '1.05', '0.79'],
    correctAnswer: 0,
    explanation:
      'Table 4B1 gives Ca = 0.94 at 35 °C for 70 °C cable. A hotter ambient leaves less temperature difference to shed heat into, so capacity falls. At 40 °C it is 0.87, at 45 °C 0.79, at 50 °C 0.71.',
  },
  {
    id: 6,
    question: 'A BS 3036 rewireable fuse protects a circuit. The Cf correction factor is:',
    options: ['0.725', '0.94', '0.50', '1.00'],
    correctAnswer: 0,
    explanation:
      'BS 3036 fuses operate at higher multiples of In than modern devices, so the cable carries more sustained current before disconnection. Cf = 0.725 forces an oversized cable, which satisfies I2 ≤ 1.45 × Iz automatically. BS 88, BS EN 60898 and BS EN 61009 devices use Cf = 1.0.',
  },
  {
    id: 7,
    question:
      'A cable runs 2 m in thermal insulation and 23 m clipped direct. Which Reference Method drives the calculation?',
    options: [
      'The in-insulation method, because the worst section governs the whole run',
      'The clipped-direct method, because it is the longest section',
      'A blended average of the two, weighted by length',
      'Whichever gives the larger tabulated It, to keep the cost down',
    ],
    correctAnswer: 0,
    explanation:
      'The cable is one continuous conductor and it is only as good as its hottest point. The section in insulation reaches its limiting temperature long before the clipped-direct section does, so the whole run is sized on that section.',
  },
  {
    id: 8,
    question: 'BS 7671 Appendix 4 contains:',
    options: [
      'Reference Methods, tabulated current-carrying capacities, rating factors and voltage-drop data',
      'The maximum earth fault loop impedance limits for every protective device',
      'The standard circuit arrangements for ring, radial and lighting final circuits',
      'The inspection schedule and test sequence for an initial verification',
    ],
    correctAnswer: 0,
    explanation:
      'Reference Methods sit in Tables 4A1 and 4A2, rating factors in the 4B and 4C tables, tabulated It values in the 4D to 4J tables, and the mV/A/m figures alongside them. Memorise the table numbers, not the values.',
  },
];

export default function Lesson305e_2_1() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Reg 433.1.1 is the whole exercise in one line: Ib ≤ In ≤ Iz. Everything else is working out what Iz actually is in your install conditions.',
          'Tabulated It is a laboratory number. Iz = It × Ca × Cg × Ci × Cf turns it into the real capacity, and required It = In ÷ (Ca × Cg × Ci × Cf) works it the other way.',
          'The worst section of the route sets the Reference Method. Two metres of twin and earth in loft insulation can move a 25 m run by several CSA brackets.',
          'Current-carrying capacity is one gate of several. Voltage drop, thermal dissipation, Zs and the mechanical route all have to clear independently before the design is signed off.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'State the Reg 433.1.1 coordination requirement Ib ≤ In ≤ Iz, and explain what each of the three currents represents on a single-phase circuit.',
          'Select the correct BS 7671 Reference Method for a route, and explain why the most onerous section of the route governs the whole cable.',
          'Apply the Ca, Cg, Ci and Cf rating factors from the Appendix 4 tables, and calculate the required tabulated It from the device rating.',
          'Read Table 4D5 for the chosen Reference Method to pick the smallest compliant CSA, then verify the derated Iz back against In.',
          'Carry the chosen CSA through the remaining checks — voltage drop against Reg 525.202, an I²R thermal sense-check, the Table 41.3 Zs limit, and the mechanical constraints of the route.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Size and rating &mdash; two questions</ContentEyebrow>

      <ConceptBlock
        title="Size and rating are two different questions"
        plainEnglish="“Rating” is what the protective device is set to. “Size” is the conductor cross-section that can live with that setting under your install conditions. The two are chosen together and neither makes sense alone."
        onSite="The device rating tells you what will trip. The cable’s Iz tells you what the conductor can carry without cooking its insulation. Those are different physics and they only meet because Reg 433.1.1 forces them to."
      >
        <p>
          Three currents run through every sizing calculation, and mixing them up is the usual
          error.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Ib, design current.</strong> The load the circuit will actually carry, from the
            rated power or the appliance schedule with diversity where it applies. A 7 kW
            single-phase EV charger gives Ib = 7000 / 230 = 30.43 A, and 30.43 A is what the cable
            calculation uses — not the 32 A device you then fit.
          </li>
          <li>
            <strong>In, rated current of the protective device.</strong> A standard rating chosen so
            that In is not less than Ib — 6, 10, 16, 20, 32, 40 or 50 A on domestic work.
          </li>
          <li>
            <strong>Iz, effective current-carrying capacity.</strong> The tabulated It from Appendix
            4, reduced by every rating factor that applies to your install.
          </li>
        </ul>
        <p>
          The criterion covers a basic single-phase circuit feeding a non-reactive load, which keeps
          power factor and harmonics out of the arithmetic — so the work is the judgement, not the
          maths.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 433.1.1 (Coordination between conductor and overload protective device)"
        clause="The operating characteristics of a device protecting a conductor against overload shall satisfy the following conditions: (a) the rated current or current setting of the protective device (In) is not less than the design current (Ib) of the circuit; and (b) the rated current or current setting of the protective device (In) does not exceed the lowest of the current-carrying capacities (Iz) of any of the conductors of the circuit; and (c) the current (I2) causing effective operation of the protective device does not exceed 1.45 times the lowest of the current-carrying capacities (Iz) of any of the conductors of the circuit."
        meaning="Conditions (a) and (b) give you Ib ≤ In ≤ Iz — the device sits comfortably above the load and comfortably below the cable. Condition (c) is the one people forget: the current that actually operates the device cannot exceed 1.45 times the cable’s Iz. Modern BS EN 60898 MCBs and BS EN 61009 RCBOs satisfy that by design, so you do not check it separately. BS 3036 rewireable fuses do not, which is exactly why Cf = 0.725 exists — it forces a cable large enough that 1.45 × Iz is met automatically."
        cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 43, Regulation 433.1.1."
      />

      <InlineCheck
        id="305e-2-1-check-1"
        question="Why is the inequality Ib ≤ In ≤ Iz rather than Ib ≤ Iz ≤ In?"
        options={[
          'Because the cable is always cheaper to oversize than the protective device',
          'Because In must be at or above Ib so it does not nuisance-trip, and Iz must be at or above In so the cable can carry the trip current until the device operates',
          'Because Iz has to sit between Ib and In to leave headroom for diversity',
          'Because the device rating is fixed and the cable capacity must match it exactly',
        ]}
        correctIndex={1}
        explanation="The order follows the physics: load, then device, then cable. The device has to let the design load through without tripping, and the cable has to survive whatever the device lets through — including an overload — for as long as it takes the device to operate. Put the cable capacity below the device rating and there is a band of current the device tolerates and the cable does not."
      />

      <SectionRule />

      <ContentEyebrow>Reference Method and the rating factors</ContentEyebrow>

      <ConceptBlock
        title="Reference Method — the install decides the column"
        plainEnglish="The same cable has a different capacity depending on how it is installed. Appendix 4 calls that the Reference Method and gives a separate tabulated It column for each one."
        onSite="Survey the route before you size anything. Clipped direct in a loft is Method C. Inside conduit on a wall is Method B. Buried in fibreglass batt is Method 100 or worse. The Method is what picks the column, and the column is most of the answer."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Method A.</strong> Single-core insulated cables in conduit in an insulated wall.
          </li>
          <li>
            <strong>Method B.</strong> Single-core or multi-core cable in conduit on a wooden wall,
            or in an insulated wall where the cable does not touch the insulation.
          </li>
          <li>
            <strong>Method C.</strong> Multi-core cable clipped direct to a non-metallic surface
            with free air on at least one side. The most generous column for twin and earth.
          </li>
          <li>
            <strong>Methods E and F.</strong> Multi-core on perforated tray with plenty of air, and
            single-core in trefoil. Commercial and industrial work.
          </li>
          <li>
            <strong>Methods 100 to 103.</strong> Twin and earth in a stud wall covered by thermal
            insulation, from touching on one side up to completely enclosed. New-build domestic
            reality, and Method 101 can halve the Method C value.
          </li>
        </ul>
        <p>
          Where a run crosses more than one method you size for the most onerous one — the cable is
          a single conductor and reaches its limiting temperature at its hottest point first.
          Methods 100 to 103 already build the insulation derate into their tabulated values, so
          applying Ci on top of them is the most common double-count in the whole calculation.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="The four rating factors"
        plainEnglish="Appendix 4 tabulates It for a perfect world — one circuit, 30 °C ambient air, no insulation touching the cable, a modern protective device. The four factors shrink that ideal down to the capacity you actually have."
        onSite="They are not a safety margin you can choose to apply. Heat from the cable, heat from the cables beside it and heat from the surrounding air all add together inside the insulation, and the tabulated value assumed none of it was happening."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Ca — ambient temperature, Table 4B1.</strong> 30 °C is 1.0. For 70 °C cable, 35
            °C gives 0.94, 40 °C gives 0.87, 45 °C gives 0.79 and 50 °C gives 0.71. Below 30 °C the
            factor is greater than 1 and you get a small uplift.
          </li>
          <li>
            <strong>Cg — grouping, Tables 4C1, 4C2 and 4C5.</strong> Roughly 0.80 for 2 circuits,
            0.70 for 3, 0.65 for 4, 0.57 for 6 and 0.50 for 9. Bunched cables cannot shed heat into
            each other.
          </li>
          <li>
            <strong>Ci — thermal insulation.</strong> Applied through Methods 100 to 103, or through
            the explicit factors under Reg 523.9. Touching insulation on one side is around 0.78;
            completely surrounded is around 0.55.
          </li>
          <li>
            <strong>Cf — BS 3036 fuse.</strong> 0.725 if and only if the protective device is a BS
            3036 rewireable fuse. BS 88, BS EN 60898 and BS EN 61009 devices give Cf = 1.0.
          </li>
        </ul>
        <p>
          All four multiply together in the denominator, so the required tabulated It is In ÷ (Ca ×
          Cg × Ci × Cf), and every factor below 1 pushes you up the CSA ladder. They are not guesses
          — they come from test-rig data on real cables in real configurations. Skipping one because
          the calculation &ldquo;looks fine without it&rdquo; is the mistake that comes back in
          three years as a callback.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="305e-2-1-check-2"
        question="Ca, Cg, Ci and Cf all sit in the denominator of the required-It calculation. Which way do they move the required cable size?"
        options={[
          'Down — derating reduces the required size',
          'No change — the factors cancel out in pairs',
          'It depends on the rating of the protective device',
          'Up — dividing by factors below 1 raises the required tabulated capacity, so the CSA gets bigger',
        ]}
        correctIndex={3}
        explanation="Required It = In ÷ (Ca × Cg × Ci × Cf). Each factor is below 1 in its derating direction, so dividing by the product makes the required tabulated capacity larger, and a larger tabulated capacity means a larger cross-sectional area. Derating always bumps you up the cable-size ladder, never down."
      />

      <SectionRule />

      <ContentEyebrow>Working Appendix 4</ContentEyebrow>

      <ConceptBlock
        title="Reading Appendix 4 without losing an afternoon"
        plainEnglish="Appendix 4 looks impenetrable the first time it is open on the bench. It is three lookups in a fixed order, and knowing the order is the whole trick."
        onSite="Cable type picks the table family. Reference Method picks the column. CSA runs down the rows. Read the value out of the cell — that is the tabulated It in amperes, and there is nothing more to it."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Step one — the table family.</strong> Table 4D5 for PVC twin and earth, 4D2 for
            PVC singles, 4E1 for thermosetting singles.
          </li>
          <li>
            <strong>Step two — the column.</strong> Reference Methods run across the top, with
            sub-columns for two cores loaded and three cores loaded. Tables 4A1 and 4A2 define the
            methods if you need to confirm which one you have.
          </li>
          <li>
            <strong>Step three — the row.</strong> CSA runs down the side. Read across to your
            column and take the tabulated It.
          </li>
          <li>
            <strong>Then the factor tables.</strong> Table 4B1 for Ca, Tables 4C1 to 4C5 for Cg. The
            On-Site Guide carries the same data more compactly, which is why most people use the OSG
            on the van and the full Appendix 4 in the office.
          </li>
        </ul>
        <p>Memorise the table numbers, not the values — the structure outlasts the amendment.</p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Two worked circuits</ContentEyebrow>

      <ConceptBlock
        title="Worked circuit one — 32 A kitchen radial, clipped direct"
        plainEnglish="A new 32 A radial for a kitchen extension. It runs alongside two existing kitchen circuits in a cable basket through the loft, where the summer peak is 35 °C, then twin and earth clipped direct down the wall."
        onSite="This is the standard shape of a domestic sizing question: one ambient derate, one grouping derate, no insulation, a modern device."
      >
        <p>
          <strong>Inputs.</strong> Ib = 32 A at full radial loading. Protective device is a 32 A BS
          EN 60898 Type B MCB, so In = 32 A. Reference Method C, clipped direct with free air on one
          side. Cable is PVC twin and earth, read from Table 4D5.
        </p>
        <p>
          <strong>Factors.</strong> Ambient 35 °C on a 70 °C cable gives Ca = 0.94 from Table 4B1.
          Three circuits grouped clipped direct gives Cg = 0.70 from Table 4C1. No thermal
          insulation, so Ci = 1.00. A modern MCB, so Cf = 1.00.
        </p>
        <p>
          <strong>Required It.</strong> It = 32 ÷ (0.94 × 0.70 × 1.00 × 1.00) = 32 ÷ 0.658 ≈ 48.6 A.
          So we need a tabulated It of at least 48.6 A in the Method C column of Table 4D5.
        </p>
        <p>
          Down the Method C column: 4 mm² at It ≈ 37 A fails, 6 mm² at It ≈ 47 A fails — and only
          just, which is exactly the margin that tempts people to wave it through — and 10 mm² at It
          ≈ 64 A passes.
        </p>
        <p>
          <strong>Verify.</strong> Iz = 64 × 0.94 × 0.70 × 1.00 × 1.00 = 64 × 0.658 ≈ 42.1 A. Check
          the inequality: Ib 32 ≤ In 32 ≤ Iz 42.1. It holds, so 10 mm² twin and earth is the minimum
          compliant CSA. Derated 6 mm² comes out at Iz ≈ 30.9 A, which fails against In = 32 A — the
          maths says no, even though the tabulated 47 A looked close enough.
        </p>
      </ConceptBlock>

      <VideoCard {...videos.circuitDesignSeries} />

      <SectionRule />

      <ConceptBlock
        title="Worked circuit two — the same radial, with 2 m in loft insulation"
        plainEnglish="Change one detail. The first stretch of the run is now buried in 100 mm of loft insulation before the cable pops out and is clipped along the joists. Watch what it does to the answer."
        onSite="Two metres of a 25 m run decides the whole cable. Picture the insulated section as the bottleneck on a motorway — the four clear lanes past it do not help."
      >
        <p>
          <strong>Route.</strong> 25 m total, 230 V single-phase, declared Ze 0.35 Ω. Out of the
          consumer unit into the loft, grouped at the hatch, then 2 m buried in 100 mm of loft
          insulation, then clipped direct to the joists, ambient up to 35 °C.
        </p>
        <p>
          <strong>Method.</strong> The clipped section is Method C. The buried section is Method
          103, totally enclosed in thermal insulation for a length greater than 0.5 m. Method 103
          already carries the insulation derate inside its tabulated values, so Ci is not applied
          again, and the whole 25 m is sized on it.
        </p>
        <p>
          <strong>Factors and required It.</strong> Ca = 0.94 at 35 °C from Table 4B1. Cg = 0.75 for
          the grouped entry, applied conservatively even though the grouping is brief. Combined
          derate 0.94 × 0.75 = 0.705, so It ≥ 32 ÷ 0.705 = 45.39 A in the Method 103 column of Table
          4D5.
        </p>
        <p>
          Down the Method 103 column: 2.5 mm² at around 17.5 A fails, 4 mm² at around 23 A fails, 6
          mm² at around 29 A fails, 10 mm² at around 40 A fails — just — and 16 mm² at around 54 A
          passes, giving Iz = 54 × 0.705 = 38.07 A against In = 32 A.
        </p>
        <p>
          The engineering judgement is what happens next, and it is the part the criterion is really
          testing. Clear a 2 m channel through the insulation, or re-route above the insulation
          line, and the governing method reverts to Method C — at which point the calculation
          resolves back down the ladder. An hour of labour against a cable uplift plus heavier
          glands and terminations. That is a conversation to have with the supervisor before you
          order, not a number to accept.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>The other gates, and sizing up</ContentEyebrow>

      <ConceptBlock
        title="Current-carrying capacity is one gate of several"
        plainEnglish="A cable that clears Reg 433.1.1 can still be the wrong cable. Voltage drop, thermal dissipation, earth fault loop impedance and the physical route each have to clear on their own."
        onSite="Every gate exists because something used to fail when people skipped it. Clearing CCC and stopping there is how you install a circuit that meets the regulations and still does not work properly at the far end."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Voltage drop.</strong> Vd = (mV/A/m × Ib × L) ÷ 1000, against 3 per cent for
            lighting and 5 per cent for other loads under Reg 525.202 and Appendix 4 section 6.4.
            For 16 mm² twin and earth at around 2.8 mV/A/m, (2.8 × 32 × 25) ÷ 1000 = 2.24 V, or 0.97
            per cent of 230 V. On 6 mm² at 7.3 mV/A/m it would be 5.84 V, or 2.54 per cent — so the
            size-up in worked circuit two was driven by capacity, not by voltage drop.
          </li>
          <li>
            <strong>Thermal sense-check.</strong> 16 mm² copper is about 1.15 mΩ/m at 20 °C, so a 50
            m out-and-back loop is about 0.0575 Ω and P = 32² × 0.0575 ≈ 58.9 W. On 6 mm² at about
            3.08 mΩ/m the loop is 0.154 Ω and P ≈ 158 W — the heat density that cooks a cable sat
            inside 100 mm of loft insulation.
          </li>
          <li>
            <strong>Zs.</strong> Table 41.3 gives approximately 1.37 Ω for a 32 A Type B BS EN 60898
            device at 0.4 s, single-phase 230 V. With Ze = 0.35 Ω the budget for R1 + R2 is 1.02 Ω.
            Appendix I gives around 3.36 mΩ/m at 20 °C for 16 mm² with a 6 mm² CPC, or about 4.36
            mΩ/m at the 1.20 multiplier, so 25 m gives about 0.109 Ω and Zs ≈ 0.46 Ω.
          </li>
          <li>
            <strong>Mechanical.</strong> A 16 mm² twin and earth is roughly twice the diameter of a
            6 mm² and will not go into the conduit specified for the smaller cable. Never reduce the
            conductor to fix a mechanical problem — re-size the containment, add a draw point, or
            re-route.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 525.202"
        clause="525.202 The above requirements are deemed to be satisfied if the voltage drop between the origin of the installation (usually the supply terminals) and a socket-outlet or the terminals of fixed current-using equipment does not exceed that stated in Appendix 4, Section 6.4."
        meaning="Two things worth noticing. The drop you are judged on runs from the origin all the way to the outlet or the terminals of the equipment, so on a sub-main plus final circuit you add both legs together &mdash; a final circuit that passes on its own can still fail once the sub-main in front of it is counted. And the limits themselves are not in the regulation: it points you at Appendix 4, so that is the table you open rather than a figure you carry in your head."
        cite="BS 7671 Part 5, Chapter 52, Section 525 — Regulation 525.202"
      />

      <VoltageDropDiagram
        vSupply="230 V"
        vLoad="224.2 V"
        current="32 A"
        length="25 m"
        caption="The supply voltage at the origin, the drop along the run, and the voltage left at the load."
      />

      <InlineCheck
        id="305e-2-1-check-3"
        question="A 25 m radial at Ib = 32 A on 6 mm² twin and earth with mV/A/m = 7.3. What is the voltage drop, and does it clear the 5 per cent limit?"
        options={[
          'Vd = (7.3 × 32 × 25) ÷ 1000 = 5.84 V, which is 2.54 per cent of 230 V — comfortably inside the limit',
          'Vd = 7.3 × 32 = 233.6 V, far over the limit, so the cable fails',
          'Vd = (7.3 × 25) ÷ 1000 = 0.18 V, which is 0.08 per cent of 230 V',
          'Vd = 7.3 × 32 × 25 = 5840 V, over the limit, so size up to 10 mm²',
        ]}
        correctIndex={0}
        explanation="The mV/A/m figure already accounts for the out-and-back loop on a single-phase circuit, so the formula is (mV/A/m × Ib × L) ÷ 1000. That gives 5.84 V here, which as a percentage of 230 V is 2.54 per cent against the 5 per cent non-lighting limit in Appendix 4 section 6.4."
      />

      <SectionRule />

      <ConceptBlock
        title="Sizing up beyond the minimum — a judgement, not a rule"
        plainEnglish="The calculation gives you the smallest compliant cross-section. There are good reasons to take the next size up, and good reasons not to, and a Level 3 answer says which applied."
        onSite="Designers split two ways. The minimalist sizes exactly to the calculation to hold the cost. The defensive designer steps up where the margin is thin or the route is hard to revisit. Both are compliant; one of them saves the callback."
      >
        <p>Reasons to take the next size up:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Thin margin.</strong> The calculation lands within about 10 per cent of the size
            below, so a small change in conditions — one more circuit in the group, a hotter summer
            — pushes it non-compliant.
          </li>
          <li>
            <strong>Changeable route.</strong> A loft that might get insulated, a riser that might
            gain circuits. The Reference Method can move without anyone telling you.
          </li>
          <li>
            <strong>Tight voltage drop, or a likely upgrade.</strong> On a long run, stepping the
            cross-section up fixes capacity and voltage drop in one move — and where the customer
            will probably replace the load with something larger, a small uplift now beats a rewire
            later.
          </li>
        </ul>
        <p>
          Against that sit cost, the difficulty of terminating a larger conductor into standard
          accessories, and the awkwardness of routing it. Whichever way the judgement goes, write
          the reasoning into the design notes.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Adding a circuit to an existing containment without re-deriving Cg for everything in it"
        whatHappens={
          <>
            You add a 32 A radial into a cable basket that already carried three circuits. Your
            cable was sized as a single circuit with Cg = 1, so 6 mm&sup2; looked fine. There are
            now four circuits in that basket, Cg falls to around 0.65, and every cable in there is
            above its real Iz — not just yours. Nothing trips. They run warm, cook each other, and a
            year later there is cracking insulation and intermittent earth faults across all four
            circuits with no obvious cause.
          </>
        }
        doInstead={
          <>
            Before adding any circuit to a shared containment, re-derate the whole group for the new
            total. If the existing cables were sized close to the limit, one more can force every
            cable in the basket to be replaced — which is a finding to raise before you start, not
            after. Planning a separate route for the new circuit is often the cheaper answer.
          </>
        }
      />

      <CommonMistake
        title="Checking the tabulated value against the device rating and stopping there"
        whatHappens={
          <>
            The Appendix 4 lookup is done properly — right table family, right Reference Method
            column, right row — and the tabulated It sits above the device rating, so the CSA is
            written on the drawing and the job moves on. The step that never happens is multiplying
            that tabulated figure back down by the factors that apply to the route. It is the same
            failure whichever way round the calculation is worked: either the factors are never put
            in the denominator to get the required It, or they are, and then the verification is done
            against the tabulated number instead of the derated one. The cable that looked comfortably
            above In is below it once the ambient and the grouping are in, and the margin that tempted
            somebody to wave it through was never a margin at all. Nothing trips, because an
            undersized cable does not announce itself — it simply runs hotter than its insulation was
            designed for, for years.
          </>
        }
        doInstead={
          <>
            Finish the calculation both ways round and make the last line the verification. Work the
            required It from In divided by the product of the factors, pick the smallest CSA whose
            tabulated value clears it, then multiply that tabulated value back by the same factors to
            get Iz and write out Ib &le; In &le; Iz in full with the three numbers in it. If you
            cannot write that line, you have not finished. Treat a CSA that fails by a small margin as
            a fail — the tabulated figure came from a laboratory and the factors are what make it
            describe your loft. And where the derate is what is driving the size up, look at changing
            the install conditions before you change the cable: it is often cheaper to clear the route
            than to buy the next size.
          </>
        }
      />

      <Scenario
        title="Wrexham shower circuit — the loft was insulated after the cable went in"
        situation={
          <>
            You pick up a job in Wrexham to replace a faulty 32 A shower circuit. The previous
            installer ran 6 mm&sup2; twin and earth through the loft over a 25 m route. On Method C
            the 6 mm&sup2; tabulated value of 47 A sits comfortably above In = 32 A, so on paper
            this is a straight swap. Then you open the loft hatch and find the whole ceiling under
            270 mm of mineral wool, with the cable running through the middle of it. The customer
            had the loft insulated last year for the energy saving.
          </>
        }
        whatToDo={
          <>
            The Reference Method changed without anyone recording it. Completely surrounded by
            insulation is Method 101, where Iz is roughly half the Method C value — around 23 A for
            6 mm&sup2;, comfortably below In = 32 A, so the existing cable is now non-compliant
            against Reg 433.1.1. Two routes out: re-route above the insulation and clip direct to
            the joists, which restores Method C and makes the 6 mm&sup2; compliant again, or leave
            the route and up-size to accept the Method 101 derate. The re-route is usually faster
            and cheaper and it stops the cable cooking, so it is the one to propose — and the loft
            insulation goes in the report as the contributing factor either way.
          </>
        }
        whyItMatters={
          <>
            Reference Method is set by the install conditions, not by the design intent. Customers
            upgrade insulation, tenants stack circuits into shared trunking, summer changes the
            ambient. A cable that was compliant on the day it went in can become non-compliant years
            later with nobody touching it, which is a periodic inspection finding. Always re-survey
            before you add to or modify an existing circuit.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'Why is the rating of the MCB not enough on its own?',
            answer:
              'Because the two numbers describe different things. The device rating tells you what current will operate the device. The cable’s Iz tells you what the conductor can carry without exceeding the limiting temperature of its insulation. The rating factors bring the tabulated figure down to the capacity you actually have in a hot loft, in a full basket, wrapped in insulation. Leave them out and you undersize the cable while the MCB sits there perfectly happy.',
          },
          {
            question: 'What is the difference between It and Iz?',
            answer:
              'It is the tabulated current from BS 7671 Appendix 4 — what the cable carries under the standard reference conditions for its Method, which means 30 °C ambient, a single circuit, no thermal insulation and a modern protective device. Iz is what is left after correcting for the actual conditions: Iz = It × Ca × Cg × Ci × Cf. Iz is the number you compare against In to satisfy Reg 433.1.1.',
          },
          {
            question: 'When do I have to apply the grouping factor Cg?',
            answer:
              'Whenever several circuits run together for a meaningful length — bunched in conduit, in trunking, in a basket, or clipped together. They share a thermal envelope and each one’s capacity falls. Tables 4C1 to 4C5 give the factor from the number of circuits and the install method. A single circuit takes no grouping derate, and a very short grouped section at a panel entry is a judgement most designers resolve conservatively by applying the factor anyway.',
          },
          {
            question: 'Why does this criterion limit itself to non-reactive loads?',
            answer:
              'Because a resistive load keeps the arithmetic honest. Design current comes straight from the rated power and the nominal voltage, the current is in phase with the voltage, and the mV/A/m figure in Appendix 4 behaves as tabulated. Bring in motors, discharge lighting or heavy electronic loads and power factor and harmonic content start moving both the design current and the heating in the conductor, which is a different calculation. Get the resistive single-phase case completely solid first — the method does not change, only the inputs do.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Reg 433.1.1 is the headline: Ib ≤ In ≤ Iz, with I2 ≤ 1.45 × Iz handled by design on modern devices and by Cf = 0.725 on BS 3036 fuses.',
          'It is the tabulated laboratory value; Iz is the real one. Iz = It × Ca × Cg × Ci × Cf, and required It = In ÷ (Ca × Cg × Ci × Cf).',
          'The Reference Method picks the Appendix 4 column, and the most onerous section of the route sets the Method for the whole cable.',
          'Methods 100 to 103 already include the insulation derate — applying Ci on top of them double-counts and oversizes the cable.',
          'Worked example: 32 A radial, Ca 0.94, Cg 0.70, Ci and Cf 1.00, required It 48.6 A, Method C, minimum 10 mm² twin and earth at Iz 42.1 A.',
          'Move 2 m of that same run into thermal insulation and Method 103 pushes the answer to 16 mm² — which is an argument for clearing a channel, not just for buying a bigger cable.',
          'Voltage drop is a separate gate: 3 per cent lighting, 5 per cent other, under Reg 525.202 and Appendix 4 section 6.4.',
          'Zs against Table 41.3 and the mechanical route are the last two gates, and a cable that cannot be installed has not been sized.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz
        questions={quizQuestions}
        title="Determining the size and rating of electrical cables"
      />
    </div>
  );
}
