/**
 * Module 3 · Section 3 · Sub 3 — Minimum current carrying capacity
 * City & Guilds 2365-02 → Unit 203 → LO3 → AC 3.3
 *   AC 3.3 — "Determine minimum current carrying capacity of live conductors
 *             for given installation conditions"
 *
 * The calc-heavy Sub of the section. Reference Methods, derating factors,
 * Ib ≤ In ≤ Iz inequality (Reg 433.1.1), worked example with grouping +
 * ambient. Cross-refs Sub1 (circuit shapes), Sub2 (wiring system / Method),
 * Sub6 (enclosure fill grouping consequences).
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import SimpleCableSizer from '@/components/apprentice-courses/SimpleCableSizer';
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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Minimum current carrying capacity | Level 2 Module 3.3.3 (AC 3.3) | Elec-Mate';
const DESCRIPTION =
  'Reference Methods, Ca / Cg / Ci / Cf correction factors, the Ib ≤ In ≤ Iz inequality (Reg 433.1.1) and a full worked cable-sizing example to BS 7671 Appendix 4.';

const checks = [
  {
    id: 'inequality-check',
    question:
      'Reg 433.1.1 states the cable sizing inequality as:',
    options: [
      'Ib ≤ Iz ≤ In',
      'Iz ≤ In ≤ Ib',
      'In ≤ Ib ≤ Iz',
      'Ib ≤ In ≤ Iz',
    ],
    correctIndex: 3,
    explanation:
      'Ib ≤ In ≤ Iz. Design current Ib must be ≤ device rating In, and device rating must be ≤ cable Iz (after all derating). Get the order wrong and either the cable cooks or the protective device never trips.',
  },
  {
    id: 'derate-direction-check',
    question:
      'Cg, Ca, Ci and Cf are all correction factors that go in the denominator of the required-It calculation. Which way do they push the required tabulated cable size?',
    options: [
      'The Managers and Professionals test',
      'Up — derating increases required size',
      'Inspect and clean connector end-faces',
      'Poor workmanship and vibration',
    ],
    correctIndex: 1,
    explanation:
      'Required It = In / (Ca × Cg × Ci × Cf). All four factors are <1 in their derating direction, so dividing by them makes the required tabulated capacity bigger — meaning a bigger CSA. Derating bumps you up the cable-size ladder.',
  },
  {
    id: 'reference-method-check',
    question:
      'Two T&E cables clipped directly to a wall surface, with no other cables touching, no insulation around them. Which Reference Method?',
    options: [
      'Method 100',
      'Method C',
      'Method A',
      'Method B',
    ],
    correctIndex: 1,
    explanation:
      'Method C — clipped direct to a non-metallic wall, in free air. Best heat dissipation of the typical concealed methods, so the highest tabulated It values. Method A is conduit in insulated wall; Method 100 is T&E in thermal insulation.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A circuit has design current Ib = 28 A, protective device In = 32 A. The minimum cable Iz (after all derating) must be:',
    options: [
      '≥ 28 A',
      '≥ 32 A',
      '≥ 40 A',
      '≥ 45 A',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 433.1.1: Ib ≤ In ≤ Iz. Iz must be at least 32 A (the In value), not 28 A (the Ib value). Otherwise the device might never trip on a small overload because the cable is the weak link.',
  },
  {
    id: 2,
    question:
      'A T&E circuit clipped direct on a wall surface with no insulation around it sits at:',
    options: [
      'Reference Method 100 (in thermal insulation)',
      'Reference Method A',
      'Reference Method C',
      'Reference Method B',
    ],
    correctAnswer: 2,
    explanation:
      'Method C — clipped direct, free air on at least one side. Read tabulated It values from Table 4D5 (PVC T&E sheathed) column for Method C. Method 100 applies when the cable is wrapped in or covered by thermal insulation.',
  },
  {
    id: 3,
    question:
      'Group of 4 circuits run together, all PVC T&E, clipped direct (Method C). The grouping correction factor Cg from Table 4C1 is approximately:',
    options: [
      '0.85',
      '1.0 (no correction)',
      '0.50',
      '0.65',
    ],
    correctAnswer: 3,
    explanation:
      'Table 4C1 — 4 grouped multicore cables clipped direct, Cg ≈ 0.65. Add more cables and the factor falls further. The cables can’t shed heat into each other, so each one’s Iz drops.',
  },
  {
    id: 4,
    question:
      'Ambient temperature 35°C around 70°C PVC cable. The Ca correction (from Table 4B1) is approximately:',
    options: [
      '0.94',
      '1.00',
      '1.05',
      '0.79',
    ],
    correctAnswer: 0,
    explanation:
      'Ca for 35°C ambient with 70°C PVC ≈ 0.94. Hotter ambient = less ΔT available between cable and surroundings = less heat the cable can shed = lower Iz. Below 30°C ambient, Ca > 1 (no derating, slight up-rating).',
  },
  {
    id: 5,
    question:
      'A BS 3036 rewireable fuse protects a circuit. The Cf correction factor for the cable is:',
    options: [
      '0.94',
      '0.725',
      '0.50',
      '1.00',
    ],
    correctAnswer: 1,
    explanation:
      'BS 3036 fuses fuse at higher multiples of In than modern devices, so the cable sees more sustained current before disconnection. Cf = 0.725 derates the cable to keep it safe. Modern BS 88 / BS EN 60898 / RCBO devices: Cf = 1.0, no derate.',
  },
  {
    id: 6,
    question:
      'Required It (the tabulated current the cable must have) is calculated by:',
    options: [
      'It = In × Ca × Cg × Ci × Cf',
      'It = Ib ÷ (Ca × Cg)',
      'It = In ÷ (Ca × Cg × Ci × Cf)',
      'It = Iz × (Ca + Cg + Ci + Cf)',
    ],
    correctAnswer: 2,
    explanation:
      'It = In / (Ca × Cg × Ci × Cf). The In sits on top because the cable’s tabulated capacity has to handle the rated device current after the install conditions have eaten into it. All four factors multiply together in the denominator.',
  },
  {
    id: 7,
    question:
      'A cable is run for part of its length through thermal insulation in a stud wall (Reference Method 100), and the rest clipped direct (Method C). When sizing the cable you use:',
    options: [
      'The most favourable method (Method C)',
      'Method A always',
      'The average of the two methods',
      'The most onerous method (Method 100)',
    ],
    correctAnswer: 3,
    explanation:
      'Always size for the most onerous (worst) Reference Method along the run. The cable’s Iz is set by the worst point — the bit in thermal insulation can’t shed heat as well as the bit clipped direct, so the whole cable sizes against Method 100.',
  },
  {
    id: 8,
    question:
      'BS 7671 Appendix 4 contains:',
    options: [
      'Tabulated current-carrying capacities, voltage drop tables, Reference Methods and correction factors',
      'The employer must review and update the first aid needs assessment to reflect the new hazard',
      'Each must be connected to the same earthing system, individually, in groups or collectively (Reg 411.3.1.1).',
      'The solvent vapours are flammable and can cause narcotic effects in poorly ventilated areas',
    ],
    correctAnswer: 0,
    explanation:
      'Appendix 4 is the cable-sizer’s bible. Tables 4A1 onwards define Reference Methods. Tables 4B1 onwards give correction factors (Ca, Cg, Ci). Tables 4D, 4E etc give tabulated It values. Tables 4Ab onwards give mV/A/m for voltage drop. All in one appendix.',
  },
];

const faqs = [
  {
    question: "Why isn’t the rated current of the MCB enough — why do I need all these factors?",
    answer:
      "The MCB rating tells you what’ll trip the device. The cable’s Iz tells you what current it can carry without overheating its insulation. They’re different physics. The factors (Ca, Cg, Ci, Cf) shrink the cable’s manufacturer-tabulated It value down to its real-world Iz in the install conditions you’ve got. Without them you’d undersize the cable on a hot day in a busy trunking — same MCB, same load, same fire risk.",
  },
  {
    question: "What’s the difference between It and Iz?",
    answer:
      "It is the tabulated current — what BS 7671 Appendix 4 says the cable can carry under the standard reference conditions for its Method (30°C ambient, single circuit, no insulation, modern device). Iz is the effective current after derating for the actual conditions: Iz = It × Ca × Cg × Ci × Cf. Iz is what you compare against In to satisfy 433.1.1.",
  },
  {
    question: "When do I have to derate for grouping (Cg)?",
    answer:
      "Whenever multiple circuits run together for any meaningful length — bunched in conduit, in trunking, in cable basket, on a tray, clipped together. The cables share a thermal envelope and each one’s Iz drops. Table 4C1 / 4C5 give the factor based on number of circuits and install method. A single circuit on its own = no Cg derate.",
  },
  {
    question: "What’s Ci about — why does insulation matter?",
    answer:
      "Thermal insulation around a cable is a thermal blanket — it stops the cable shedding heat to the air. Same load current heats the conductor more before equilibrium. Reg 523 / Method 100 covers cables embedded in thermal insulation; Ci is the multiplier on tabulated values. A cable wrapped on all sides in insulation can lose 50% of its Iz — that’s why you spot it in the survey before sizing.",
  },
  {
    question: "I see ‘Method 100’ a lot in modern installs — what is it?",
    answer:
      "Method 100 is for T&E cable in a stud wall covered by thermal insulation, touching the insulation on at least one side. It came in to recognise that modern wall-build (Celotex / Kingspan rigid foam, mineral wool batts) really does sit against the cable in countless domestic installs. Tables 4D5 (PVC T&E) include columns for Method 100 specifically — the values are noticeably lower than Method C clipped direct.",
  },
  {
    question: "Does voltage drop matter at this stage, or is that a separate calculation?",
    answer:
      "Voltage drop is a separate check after CCC. Step 1 — pick a cable that satisfies 433.1.1 (Ib ≤ In ≤ Iz) using Appendix 4 It values + derates. Step 2 — calculate voltage drop from the mV/A/m tables for that CSA over the actual route length, and check it’s within the 3% (lighting) / 5% (other) limits in Section 525 / Appendix 12. If voltage drop fails you go up another CSA step and redo step 1.",
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 3 · Subsection 3"
            title="Minimum current carrying capacity"
            description="Every cable has a current limit. Real-world derating brings that limit down. Skip this calc and the cable’s the next thing on fire — and the device that should have tripped doesn’t."
            tone="emerald"
          />

          <TLDR
            points={[
              'Reg 433.1.1 sets the inequality every circuit must satisfy: Ib ≤ In ≤ Iz.',
              'It (tabulated) → Iz (effective) by multiplying by all four correction factors: Iz = It × Ca × Cg × Ci × Cf.',
              'Worked example: 32 A radial, 3 grouped circuits, 35°C ambient, Method C T&E — needs 10 mm² to satisfy 433.1.1.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the cable-sizing inequality from Reg 433.1.1: Ib ≤ In ≤ Iz.',
              'Identify the BS 7671 Reference Method for a given install (Method A through F, plus Method 100 for thermal insulation).',
              'Apply Ca (ambient), Cg (grouping), Ci (insulation) and Cf (BS 3036 derate) factors from Appendix 4 tables.',
              'Calculate required It from In and the correction factors.',
              'Read the correct tabulated It value from Table 4D5 (PVC T&E) for the chosen Reference Method.',
              'Work a full cable-sizing example end-to-end and select the smallest compliant CSA.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The headline rule — Reg 433.1.1</ContentEyebrow>

          <ConceptBlock
            title="Ib ≤ In ≤ Iz — the inequality every circuit must satisfy"
            plainEnglish="Design current must fit inside device rating, which must fit inside cable capacity. Three numbers, one ladder, no skipping rungs."
            onSite="The whole point of cable sizing is to find an Iz that beats In comfortably, with In big enough to handle Ib. If the inequality holds, the cable’s safe AND the device protects it. If it fails at any stage, you’ve either got a cable that overheats or a device that never trips."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ib (design current)</strong> — the actual load the circuit will carry,
                in amperes. Calculated from kW, kVA or appliance schedule with diversity if applicable.
              </li>
              <li>
                <strong>In (rated current of device)</strong> — the standard MCB / RCBO / fuse
                rating chosen, e.g. 6, 10, 16, 20, 32, 40, 50 A.
              </li>
              <li>
                <strong>Iz (effective cable capacity)</strong> — the cable’s tabulated It (from
                Appendix 4) reduced by ALL the correction factors that apply to your install.
              </li>
            </ul>
            <p>
              Plus there’s a sub-clause: <strong>I2 ≤ 1.45 × Iz</strong>, where I2 is the current
              that causes effective operation of the device. For BS EN 60898 / BS EN 61009 RCBOs
              this is built-in to the standard — you don’t check it separately. For BS 3036
              rewireable fuses you DO have to check it (which is exactly why Cf for BS 3036 is
              0.725 — it forces an oversized cable that satisfies 1.45 × Iz automatically).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 433.1.1"
            clause="The operating characteristics of a device protecting a conductor against overload shall satisfy the following conditions: (a) the rated current or current setting of the protective device (In) is not less than the design current (Ib) of the circuit; and (b) the rated current or current setting of the protective device (In) does not exceed the lowest of the current-carrying capacities (Iz) of any of the conductors of the circuit; and (c) the current (I2) causing effective operation of the protective device does not exceed 1.45 times the lowest of the current-carrying capacities (Iz) of any of the conductors of the circuit."
            meaning={
              <>
                Translation: device rating sits comfortably above the load AND below the cable
                capacity. Plus the device’s actual trip current can’t exceed 1.45 × cable Iz.
                Modern MCBs and RCBOs handle the 1.45 limit by design — only old BS 3036 fuses
                force you to derate the cable to comply (that’s the Cf = 0.725 in the next section).
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 433.1.1."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Reference Methods — how the cable installs</ContentEyebrow>

          <ConceptBlock
            title="Same cable, different installs, different Iz"
            plainEnglish="A 6 mm² T&E in free air dissipates heat brilliantly. The same cable buried in loft insulation barely sheds any. Appendix 4 calls this difference the Reference Method, and gives a separate It column for each."
            onSite="Survey the route before sizing. Concealed in plaster? Method C-ish (Tables 4D5 col 6). Clipped direct in a loft? Method C cleanly. Buried in fibreglass batt insulation? Method 100. Inside conduit chased into a wall? Method B. The Method changes the It column you read."
          >
            <p>The methods you’ll meet most:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Method A</strong> — single-core insulated cables in conduit in an
                insulated wall.
              </li>
              <li>
                <strong>Method B</strong> — single-core or multi-core cable in conduit on a
                wooden wall (or in insulated wall but cable not touching insulation).
              </li>
              <li>
                <strong>Method C</strong> — multicore cable clipped direct to a non-metallic
                wall, free air at least one side. The most generous Iz column for T&E.
              </li>
              <li>
                <strong>Method E / F</strong> — multicore on perforated tray (plenty of air),
                single-core in trefoil — used in commercial and industrial installs.
              </li>
              <li>
                <strong>Method 100</strong> — T&E in stud wall covered by thermal insulation on
                at least one side. New-build domestic reality. Iz noticeably lower than Method C.
              </li>
              <li>
                <strong>Method 101</strong> — completely surrounded by thermal insulation. Worst
                case — Iz can be half the Method C value.
              </li>
            </ul>
            <p>
              <strong>Pick the worst</strong>: if a cable run passes through different methods
              (say, Method C in the loft, Method 100 through a stud wall), you size for the
              worst (Method 100). The whole cable is one continuous conductor and it’s only as
              good as its hottest point.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Correction factors — Ca, Cg, Ci, Cf</ContentEyebrow>

          <ConceptBlock
            title="Four numbers that bite into your tabulated It"
            plainEnglish="The Appendix 4 It values assume a perfect world — 30°C ambient, single circuit, no insulation around the cable, modern protective device. The four C-factors shrink that ideal It down to the real-world Iz."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ca (ambient temperature)</strong> — Table 4B1. 30°C = 1.0. 35°C = 0.94 for
                70°C PVC. 40°C = 0.87. 45°C = 0.79. Below 30°C the factor is &gt;1 (small uplift).
              </li>
              <li>
                <strong>Cg (grouping)</strong> — Tables 4C1 / 4C2 / 4C5. 2 circuits ≈ 0.80, 3 ≈ 0.70,
                4 ≈ 0.65, 6 ≈ 0.57, 9 ≈ 0.50. Bunched cables can’t shed heat to each other.
              </li>
              <li>
                <strong>Ci (thermal insulation)</strong> — applied via Method 100/101 or
                Reg 523.9 explicit factors. Touching insulation one side ≈ 0.78; surrounded
                ≈ 0.55.
              </li>
              <li>
                <strong>Cf (BS 3036 fuse)</strong> — 0.725 if and only if the protective device
                is a BS 3036 rewireable fuse. Modern devices (BS 88, BS EN 60898 MCB, BS EN
                61009 RCBO): Cf = 1.0.
              </li>
            </ul>
            <p>
              <strong>The required tabulated It</strong> is then:
            </p>
            <p className="font-mono bg-white/[0.04] border border-white/[0.08] rounded-lg p-3 text-[13px]">
              It (required) = In ÷ (Ca × Cg × Ci × Cf)
            </p>
            <p>
              That’s the It column value you need to find or beat in the Appendix 4 table for
              your chosen Reference Method. The CSA whose tabulated It first equals or exceeds
              this number is your minimum compliant size.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Why correction factors aren’t optional"
            plainEnglish="Apprentices sometimes treat the C-factors as ‘nice to have’ adjustments. They’re not — they’re the difference between a cable running at its rated temperature and a cable slowly cooking inside a wall."
            onSite="The Appendix 4 It value is for ONE cable in 30°C still air with no insulation and a modern MCB. Real installs almost never look like that. Skip the derate and the cable will run hotter than its insulation rating — not enough to trip anything, just enough to slowly degrade the PVC over a few years until you get intermittent earth faults that nobody can find."
          >
            <p>
              The factors aren’t a safety margin you can choose to apply — they’re a statement of
              physics. Heat from one cable plus heat from the cables next to it plus heat from the
              ambient air all add together inside the insulation. The cable manufacturer sets the
              tabulated It on the assumption that none of those additions are happening. The
              moment any of them ARE happening, the It is too high and the cable will run hotter
              than its rating.
            </p>
            <p>
              The correction factors aren’t guesses either — they come from decades of test-rig
              data on real cables in real configurations. A Cg of 0.65 for four grouped cables
              isn’t arbitrary; it’s what BSI tested. Trusting the factor is trusting the test
              result. Skipping it because the calc “looks fine without it” is the apprentice
              mistake that comes back in three years as a callback.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reading Appendix 4 — what to look up first"
            plainEnglish="Appendix 4 is intimidating on first open — eight pages of tables, dense headings, columns labelled with letters and numbers. The trick is knowing which table to open first and ignoring the rest until you need it."
            onSite="Practical order: (1) Decide the cable type — that picks the table family (4D5 for PVC T&E, 4D2 for PVC singles, 4E1 for thermosetting singles, etc.). (2) Decide the Reference Method — that picks the COLUMN in your table. (3) Read DOWN the column to find the tabulated It. Then go to Table 4B1 for Ca, 4C1/4C2 for Cg, and you’ve got your inputs."
          >
            <p>
              Each table is structured the same way. CSA goes down the rows. Reference Methods go
              across the columns (with sub-columns for 2-core loaded vs 3-core loaded). The
              numbers in the cells are tabulated It values in amperes. There’s nothing more to it
              than that — once you’ve got your cable type and Method, it’s a single lookup.
            </p>
            <p>
              The first time you do it on paper it takes ten minutes because you’re flipping
              between Table 4A2 (to confirm the Method), Table 4D5 (for the It value), Table 4B1
              (for Ca) and Table 4C1 (for Cg). After ten or twenty cable sizings you’ll know which
              table is which without flipping. Memorise table numbers, not values — the values
              change with each amendment, the table structure doesn’t.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Worked example — 32 A radial in a real install</ContentEyebrow>

          <ConceptBlock
            title="Kitchen 32 A radial: 3 circuits grouped, 35°C ambient, T&E clipped direct"
            plainEnglish="A real cable-sizing exercise from kitchen survey to compliant CSA. The same recipe works for every circuit in the install."
            onSite="You’re wiring a kitchen extension. New 32 A radial socket circuit will run alongside two existing kitchen circuits in the same cable basket through the loft (warm — say 35°C peak). T&E clipped direct on the wall on the way down. What’s the smallest compliant CSA?"
          >
            <p>
              <strong>Step 1 — gather the inputs.</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Design current Ib ≈ 32 A (full radial loading, worst case).</li>
              <li>Protective device chosen: 32 A BS EN 60898 Type B MCB → In = 32 A.</li>
              <li>Reference Method: C (T&E clipped direct, free air one side).</li>
              <li>Cable type: PVC T&E (6242Y) — read from Table 4D5.</li>
            </ul>

            <p>
              <strong>Step 2 — derive the correction factors.</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ambient 35°C, 70°C PVC → Ca ≈ <strong>0.94</strong> (Table 4B1).</li>
              <li>3 circuits grouped clipped direct → Cg ≈ <strong>0.70</strong> (Table 4C1).</li>
              <li>No thermal insulation around the cable → Ci = <strong>1.00</strong>.</li>
              <li>Modern MCB (BS EN 60898) → Cf = <strong>1.00</strong>.</li>
            </ul>

            <p>
              <strong>Step 3 — calculate the required tabulated It.</strong>
            </p>
            <p className="font-mono bg-white/[0.04] border border-white/[0.08] rounded-lg p-3 text-[13px]">
              It = In ÷ (Ca × Cg × Ci × Cf){'\n'}
              It = 32 ÷ (0.94 × 0.70 × 1.00 × 1.00){'\n'}
              It = 32 ÷ 0.658{'\n'}
              It ≈ <strong>48.6 A</strong>
            </p>
            <p>
              So we need a tabulated It ≥ 48.6 A in the Method C column of Table 4D5.
            </p>

            <p>
              <strong>Step 4 — pick the cable.</strong> From Table 4D5 (PVC T&E, Method C, 2 cores
              loaded):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>4 mm² → It ≈ 37 A → fails (37 &lt; 48.6).</li>
              <li>6 mm² → It ≈ 47 A → fails (47 &lt; 48.6).</li>
              <li>10 mm² → It ≈ 64 A → <strong>passes</strong> (64 ≥ 48.6). ✓</li>
            </ul>

            <p>
              <strong>Step 5 — verify Iz against In (the 433.1.1 check).</strong>
            </p>
            <p className="font-mono bg-white/[0.04] border border-white/[0.08] rounded-lg p-3 text-[13px]">
              Iz = It × Ca × Cg × Ci × Cf{'\n'}
              Iz = 64 × 0.94 × 0.70 × 1.00 × 1.00{'\n'}
              Iz = 64 × 0.658{'\n'}
              Iz ≈ <strong>42.1 A</strong>{'\n\n'}
              Check: Ib (32) ≤ In (32) ≤ Iz (42.1)  ✓
            </p>
            <p className="text-[12.5px] text-white/70 italic">
              Note — Iz here is the install-corrected current capacity (the tabulated 64 A from
              Step 4 multiplied through by Ca × Cg × Ci × Cf = 64 × 0.658 = 42.1 A). The
              tabulated 64 A figure is what the cable can carry under the BS 7671 reference
              conditions; the 42.1 A figure is what it can carry in this circuit&rsquo;s actual
              install conditions, and that is the number the inequality compares against In.
            </p>
            <p>
              The inequality holds — 10 mm² T&E is the minimum compliant CSA. 6 mm² would have
              been close enough to tempt some installers, but the maths says no — derated 6 mm²
              comes out at Iz ≈ 30.9 A, which fails the In = 32 A check.
            </p>

            <p>
              <strong>Step 6 — move on to voltage drop.</strong> Now check Vd at the chosen 10 mm²
              against the route length using the mV/A/m table for 10 mm² T&E. If voltage drop
              fails (over a long run), you’d step up to 16 mm² and re-do steps 4 and 5. We covered
              voltage drop properly in Module 2 §3.4.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="When to size up — defensive design"
            plainEnglish="The CCC calc gives you the MINIMUM compliant CSA. There are good reasons to choose the next size up — and good reasons not to."
            onSite="Designers split into two camps. The minimalist sizes exactly to the calc to keep cost down. The defensive designer sizes one step up if the calc lands close to the limit, the install conditions might tighten in future, or the customer is the type who keeps adding circuits. Both approaches are compliant. The defensive approach is what saves you the callback."
          >
            <p>
              Reasons to size up one step from the calc minimum:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                The calc lands within ~10% of the next size down — small changes in install
                conditions (extra grouping, hotter ambient) could push it non-compliant.
              </li>
              <li>
                The route passes through changeable conditions — a loft that might get insulated,
                a riser that might get extra circuits added.
              </li>
              <li>
                The voltage-drop check is going to be tight on a long run — sizing up the CSA
                fixes both Iz and Vd at once.
              </li>
              <li>
                The circuit is for kit the customer is likely to upgrade (EV charger, shower,
                cooker) — small CSA bump now beats a full rewire later.
              </li>
            </ul>
            <p>
              Reasons NOT to size up: cost, terminating bigger CSA into existing accessories
              (10 mm² won’t fit a standard socket terminal), and the cable just being physically
              harder to route. Sizing up is a judgement call, not an automatic rule. Document the
              reasoning in your design notes so the next person on the install knows why.
            </p>
          </ConceptBlock>

          <SimpleCableSizer />

          <SectionRule />

          <ContentEyebrow>Where it bites you on site</ContentEyebrow>

          <CommonMistake
            title="Forgetting Cg when bunching new circuits with existing in a basket"
            whatHappens={
              <>
                You add a new 32 A radial into a cable basket that already had three circuits
                running through it. The new cable’s sized for a single-circuit install (Cg = 1),
                so 6 mm² T&E looks fine on its own. But now there are FOUR circuits in the
                basket, Cg is 0.65, and every cable in there is over its real Iz. The new cable
                doesn’t trip immediately — it heats up, slowly cooks the others around it, and a
                year later you’ve got insulation cracking and intermittent earth faults across
                all four circuits.
              </>
            }
            doInstead={
              <>
                Before adding any circuit to a shared containment, look at every cable already
                there. Re-derate the lot for the new total grouping count. If the existing cables
                were sized at the limit, adding a fifth circuit might force every cable in the
                basket to be replaced. Better to spec a separate route for the new circuit, or
                accept that you’re committing to a basket re-pull.
              </>
            }
          />

          <Scenario
            title="Loft full of insulation — surveyor missed the Method 100 derate"
            situation={
              <>
                You pick up a job to replace a faulty 32 A shower circuit. The previous installer
                ran 6 mm² T&E through the loft, route length 25 m. The 6 mm² Method C value
                (47 A) looks comfortably above the In = 32 A. Job seems straightforward. You open
                the loft hatch and find the entire ceiling is now covered in 270 mm of mineral
                wool insulation — the cable runs through the middle of it, completely surrounded.
                Customer added the loft insulation last year for energy efficiency.
              </>
            }
            whatToDo={
              <>
                Reference Method changed without anyone telling you. Surrounded by insulation =
                Method 101 — Iz roughly halved from Method C. 6 mm² Method 101 ≈ 23 A, which is
                comfortably below In = 32 A. The 6 mm² is now non-compliant against 433.1.1.
                Two options. (1) Re-route the cable above the insulation, on the joists, clipped
                direct — back to Method C, 6 mm² compliant again. (2) Up-size to 10 or 16 mm²
                and accept the Method 101 derate. Option 1 is usually cheaper and faster, plus
                it stops the cable cooking. Either way, write the loft insulation install up as
                a contributing factor in the report.
              </>
            }
            whyItMatters={
              <>
                Reference Method is set by the install conditions, not the design intent. Customers
                upgrade insulation, fit-out tenants stack new circuits in shared trunking, summer
                heat changes ambient. A cable that was compliant at install can become
                non-compliant later — and that’s a periodic-inspection finding (C2 if loaded above
                Iz, C1 if showing thermal damage). Always re-survey before adding to or modifying
                an existing circuit.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Appendix 4 (Current-carrying capacity and voltage drop) — paraphrased"
            clause="Appendix 4 sets out reference methods of installation, tabulated current-carrying capacities (It values) for each conductor type and reference method, and rating factors for ambient temperature (Ca), grouping (Cg), thermal insulation (Ci), and use of BS 3036 fuses (Cf). The effective current-carrying capacity (Iz) of a conductor is given by Iz = It × Ca × Cg × Ci × Cf."
            meaning={
              <>
                Appendix 4 is the canonical source for everything in this Sub. Reference Methods
                are defined in Tables 4A1–4A2; correction factors in Tables 4B–4C; tabulated It
                values in Tables 4D–4J. You don’t have to memorise the numbers — you need to know
                the recipe and where to look. Paraphrased from the appendix introduction; verify
                exact wording in the published BS 7671 Appendix 4 text.
              </>
            }
            cite="Source: paraphrased from BS 7671:2018+A4:2026 — Appendix 4 introduction."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reg 433.1.1: Ib ≤ In ≤ Iz. Get the inequality right and the cable is protected; get it wrong and either it cooks or the device never trips.',
              'It (tabulated, ideal conditions) → Iz (effective, real conditions) via Iz = It × Ca × Cg × Ci × Cf.',
              'Reference Method depends on install (clipped direct = Method C; in conduit on wall = Method B; in thermal insulation = Method 100/101).',
              'Required It = In ÷ (Ca × Cg × Ci × Cf). Find the smallest CSA whose tabulated It in the right column ≥ required It.',
              'Worked example: 32 A radial, Ca=0.94, Cg=0.70, Ci=Cf=1 → required It=48.6 A → minimum CSA 10 mm² T&E (Method C).',
              'BS 3036 rewireable fuse forces Cf=0.725 — modern MCBs / RCBOs use Cf=1.00.',
              'Always size for the worst Reference Method along the run — the cable is only as good as its hottest point.',
              'Voltage drop is a separate check after CCC — both have to pass before the design is signed off.',
            ]}
          />

          <Quiz title="Current-carrying capacity — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section3/3-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Wiring systems for different environments
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section3/3-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Protective device applications
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
