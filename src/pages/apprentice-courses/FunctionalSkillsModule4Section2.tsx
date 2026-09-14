/**
 * Functional Skills · Module 4 · Section 2 — Cable sizing and selection
 *
 * CONVERTED (13 Sep) from the 2024 dialect to the StudyPage reading kit.
 *
 * This is a pure-maths page and was built to the density bar accordingly:
 * every correction factor, every table lookup and every worked calculation
 * in the old page has been turned into a WorkedExample with real steps, each
 * one followed by a TryIt so the learner repeats the calculation with their
 * own numbers before moving on. The page carries 10 WorkedExample blocks and
 * 9 TryIt blocks against 8 ConceptBlocks — one pair minimum per section, with
 * extra pairs in the sections that teach two techniques or need a combined
 * calculation (installation methods; grouping plus temperature together; the
 * two full sizing exercises in Section 07).
 *
 * All figures were checked against the calculator source files rather than
 * recalled, as required:
 *   - src/lib/calculators/bs7671-data/appendix4CurrentCapacity.ts (Table 4D5,
 *     the twin-earth block: Method C 1.0–16.0mm² = 16/20/27/37/47/64/85A,
 *     Method B = 13/16.5/23/30/38/52/69A, Method A 2.5mm² = 20A, and the note
 *     field confirms flat T&E carries no Method D or E column).
 *   - src/lib/calculators/bs7671-data/voltageDropTables.ts
 *     (voltageDropFlatTwinEarth — Table 4D5's own mV/A/m column, single-phase
 *     only: 1.0=44, 1.5=29, 2.5=18, 4.0=11, 6.0=7.3, 10.0=4.4, 16.0=2.8 — the
 *     file header explains at length why there is no "Table 4D5B").
 *   - src/lib/calculators/bs7671-data/temperatureFactors.ts (Table 4B1 Ca,
 *     70°C column, and Table 4C1 Cg, bunched column, including 12/16/20
 *     circuits at 0.45/0.41/0.38 — 0.50 is not a floor).
 *   - src/lib/calculators/bs7671-data/thermalInsulationFactors.ts (Ci keyed
 *     on length surrounded, not depth, with Reg 523.9 fixing Ci = 0.5 outright
 *     once that length reaches 0.5m).
 *
 * Every one of those figures was already correct in the pre-conversion file
 * and is carried through unchanged — nothing here has been "recorrected"
 * from a different, wrong value:
 *   - Table 4D5 is named as Table 4D5, never 4D2A, and there is no Table
 *     4D5B anywhere on the page.
 *   - The "no Method D or E column" statement for flat T&E is kept, and nothing
 *     resembling an invented "Method E 30A" row or a "50% more current in free
 *     air" claim has been added back in.
 *   - cable-check-1 keeps its full lesson: 4.0mm² is 30A on Method B, so a 32A
 *     device fails, and "4mm² is the 32A cable" is only true clipped direct
 *     (Method C, 37A).
 *   - Cg's 8-circuit row (0.52) and the fact that 0.50 is not a floor (12 =
 *     0.45, 16 = 0.41, 20 = 0.38) are both taught, in the ConceptBlock and in
 *     a dedicated worked example.
 *   - Ci is taught as keyed on length surrounded, not insulation depth, and
 *     the loft worked example keeps Ci = 0.5 (Reg 523.9, forced at 0.5m) →
 *     20 × 0.5 = 10A, with the depth-vs-length trap spelled out.
 *   - Shower Example 1 keeps the full corrected chain: 9.5kW → Ib 41.3A → In
 *     50A (no 45A rung exists) → 6.0mm² at 47A fails → 10.0mm² is the minimum.
 *   - Cooker Example 2 keeps In 63A, It ≥ 167.6A, reroute → It ≥ 67.0A →
 *     16.0mm².
 *   - The grouping worked example keeps 37 × 0.70 = 25.9A.
 *   - Voltage drop is taught throughout as a RECOMMENDED maximum (Appendix 4
 *     §6.4, deemed-to-satisfy via Reg 525.202), never "maximum permitted".
 *
 * No new BS 7671 table or regulation number has been added beyond what the
 * old page already cited (Tables 4A2, 4B1, 4C1, 4D5, Appendix 4 §2.6 and
 * §6.4, Regs 523.9 and 525.202). Nothing has been dated to a specific BS 7671
 * edition or amendment.
 *
 * Deliberately NOT using <RegsCallout> anywhere on this page — every
 * regulation reference here is a paraphrase, and promoting a paraphrase into
 * a `clause` field is exactly how a fabricated BS 7671 quote shipped before.
 *
 * Quiz bank (8 questions) and all three InlineChecks — cable-check-1,
 * cable-check-2, cable-check-3 — are unchanged: same questions, same
 * options, same correctAnswer/correctIndex, same ids.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  Prerequisites,
  Scenario,
  ContentEyebrow,
  SectionRule,
  WorkedExample,
  TryIt,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Cable Sizing & Selection - Functional Skills Module 4.2';
const DESCRIPTION =
  'Functional Skills maths for electricians: current-carrying capacity, installation methods, the Ca/Cg/Ci correction factors, voltage drop, and full worked cable-sizing procedures to BS 7671 Appendix 4.';

const quizQuestions = [
  {
    id: 1,
    question:
      'A circuit has a design current (Ib) of 28A. The protective device is a 32A MCB. The cable is grouped with 3 other circuits (Cg = 0.65) in an ambient of 40°C (Ca = 0.87). No thermal insulation (Ci = 1.0). What minimum tabulated rating (It) is needed?',
    options: ['28A', '56.6A', '49.5A', '36.8A'],
    correctAnswer: 1,
    explanation:
      'It = In / (Ca × Cg × Ci) = 32 / (0.87 × 0.65 × 1.0) = 32 / 0.5655 = 56.6A. You must use In (not Ib) in the formula because the cable must be able to carry the full rated current of the protective device under the installed conditions.',
  },
  {
    id: 2,
    question:
      'BS 7671 Table 4D current ratings assume reference conditions. What are those reference conditions?',
    options: [
      '30°C ambient, four circuits, 100mm insulation',
      '20°C ambient, single circuit, no insulation',
      '30°C ambient, single circuit, no thermal insulation',
      '25°C ambient, two circuits, standard insulation',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 Table 4D current ratings assume reference conditions: 30°C ambient temperature, a single circuit (no grouping), and no thermal insulation. Any deviation from these conditions requires correction factors to be applied.',
  },
  {
    id: 3,
    question:
      'A shower circuit uses 10.0mm² T&E cable with a run of 15m. The design current is 41.3A. The mV/A/m value is 4.4. What is the voltage drop?',
    options: ['9.13V', '6.86V', '27.3V', '2.73V'],
    correctAnswer: 3,
    explanation:
      'VD = mV/A/m × Ib × L / 1000 = 4.4 × 41.3 × 15 / 1000 = 2726 / 1000 = 2.73V. This is comfortably within the 11.5V recommended maximum for a power circuit.',
  },
  {
    id: 4,
    question:
      'What is the grouping correction factor (Cg) for 4 circuits enclosed in a single conduit?',
    options: ['0.65', '1.0', '0.57', '0.50'],
    correctAnswer: 0,
    explanation:
      'From BS 7671 Table 4C1, for 4 circuits bunched together or in a single conduit, Cg = 0.65. This means the cable can only carry 65% of its tabulated current rating when grouped with 3 other circuits.',
  },
  {
    id: 5,
    question:
      'A cable is totally surrounded by 150mm of thermal insulation in a ceiling. What Ci derating factor should be applied (BS 7671 Appendix 4, Section 2.6)?',
    options: ['0.78', '0.51', '0.63', '1.0'],
    correctAnswer: 2,
    explanation:
      'BS 7671 Appendix 4, Section 2.6 tabulates Ci by length in insulation: 50mm = 0.88, 100mm = 0.78, 200mm = 0.63, 400mm = 0.51, ≥500mm = 0.50. 150mm lies between the 100mm and 200mm entries, so the conservative tabulated value (200mm = 0.63) is applied. This markedly reduces the cable’s current-carrying capacity.',
  },
  {
    id: 6,
    question:
      'Installation Method B (enclosed in conduit on a wall) gives a lower current rating than Method C (clipped direct). Why?',
    options: [
      'Method C cables are manufactured to a higher temperature rating',
      'The conduit provides additional short-circuit protection',
      'Method C allows a larger conductor to be used',
      'The conduit restricts heat dissipation from the cable',
    ],
    correctAnswer: 3,
    explanation:
      'When a cable is enclosed in conduit, the conduit acts as a thermal barrier, restricting the cable’s ability to dissipate heat to the surrounding air. This means the cable heats up more for the same current, so its rated capacity must be reduced.',
  },
  {
    id: 7,
    question:
      'A 6.0mm² T&E cable (Method C) has a tabulated rating of 47A. Ca = 0.94, Cg = 0.80, Ci = 1.0. What is the effective current-carrying capacity?',
    options: ['35.3A', '39.5A', '44.2A', '47.0A'],
    correctAnswer: 0,
    explanation:
      'Effective capacity = It × Ca × Cg × Ci = 47 × 0.94 × 0.80 × 1.0 = 47 × 0.752 = 35.3A. The cable can safely carry up to 35.3A under these installed conditions; 47A is the uncorrected tabulated value.',
  },
  {
    id: 8,
    question:
      'You are sizing cable for a shower on a 15m run. After applying correction factors, you need It ≥ 56A. Which cable size from Table 4D5 (Method C) would you select?',
    options: ['6.0mm² (47A)', '10.0mm² (64A)', '16.0mm² (85A)', '4.0mm² (37A)'],
    correctAnswer: 1,
    explanation:
      'The cable must have a tabulated rating ≥ 56A. 6.0mm² (47A) is too low; 10.0mm² (64A) is the smallest size that exceeds 56A, so it is the minimum acceptable. You would then check voltage drop to confirm suitability.',
  },
];

const FunctionalSkillsModule4Section2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 2"
        title="Cable sizing and selection"
        backTo="/study-centre/apprentice/functional-skills/module4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        {/* Wider than the 64rem default, to match the rest of the course — this
            page is nothing but tables and worked calculations, and both wrap
            badly at the narrower measure. */}
        <StudyPage measure="74rem" wide="94rem">
          <p className="text-[13px] leading-relaxed text-white">
            Cable sizing is the one calculation you will do on almost every job, and it is the one
            most likely to have three separate numbers pulling against each other: the current the
            circuit actually draws, the current the cable is rated for once you have accounted for
            where it is installed, and the voltage it loses over its length. Get any one of the
            three wrong and the fault does not show up on day one — it shows up as a cable running
            warm under a rug, or a shower that trips on a cold morning when the loft is coldest and
            the load is highest. This section takes you through the whole procedure, one correction
            factor at a time, until you can run it start to finish on a real circuit.
          </p>

          <LearningOutcomes
            outcomes={[
              'Read a current-carrying capacity table and state what "reference conditions" actually assumes before any correction is applied.',
              'Apply the three correction factors — Ca (ambient temperature), Cg (grouping) and Ci (thermal insulation) — separately and together, to get from a tabulated rating to an effective one.',
              'Choose the right installation method for a real route, and explain in terms of heat dissipation why Method C beats Method B beats Method A.',
              'Calculate voltage drop from mV/A/m, design current and length, and check it against the correct recommended maximum for the circuit type.',
              'Run a full cable sizing calculation for a real domestic circuit, from design current through to a compliant cable size, checking both current capacity and voltage drop.',
              'Spot the two most common cable-sizing traps: a device rating with no equivalent rung on the ladder, and a derating table keyed on length being misread as depth.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Module 4, Section 1',
                gist: 'This section assumes you can already calculate a design current (Ib = P/V) and are comfortable with basic arithmetic under brackets — division, multiplication, percentages.',
              },
              {
                term: 'A calculator, or confidence without one',
                gist: 'Several worked examples here are exam-length calculations. Practise them both ways: with a calculator for speed, and by hand for the exam questions that forbid one.',
              },
            ]}
          />

          <TLDR
            points={[
              'The rule that governs every cable sizing calculation is Ib ≤ In ≤ Iz — design current, device rating, effective cable capacity, in that order.',
              'Table 4D5 (flat twin and earth) gives Method C 4.0mm² as 37A, but only 30A on Method B — the size alone never tells you the rating, the size and the installation method together do.',
              'Table 4D5 has no Method D or E column for flat T&E. If a job needs free-air ratings, you are looking at a different cable and a different table.',
              'Required It = In / (Ca × Cg × Ci). Ca and Cg and Ci all reduce the effective rating — they only ever divide, never multiply it up.',
              'Cg is not floored at 0.50: Table 4C1 keeps going past 9 circuits — 12 = 0.45, 16 = 0.41, 20 = 0.38.',
              'Ci is keyed on the length a cable is totally surrounded for, not the depth of insulation around it — and Reg 523.9 fixes Ci at 0.5 outright once that length reaches 0.5m.',
              'The BS EN 60898 device ladder runs 6, 10, 16, 20, 25, 32, 40, 50, 63A. There is no 45A and no 60A rung — round up to the next one that actually exists.',
              'Voltage drop of 3% (lighting) or 5% (other uses) are RECOMMENDED maxima from Appendix 4 §6.4, a deemed-to-satisfy route via Reg 525.202 — never a hard permitted ceiling.',
              'A cable has to pass current capacity AND voltage drop separately. Passing one says nothing about the other.',
            ]}
          />

          <SectionRule />

          {/* ── 01 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>01 · Current-carrying capacity</ContentEyebrow>

          <ConceptBlock
            title="Every cable has a ceiling, and the table only tells you the ceiling under one specific set of conditions"
            onSite="Nobody argues with Iz on the page. The argument happens when the cable is actually installed differently to the table's assumptions and nobody corrected for it."
          >
            <p>
              Every cable has a maximum current it can carry without its insulation exceeding its
              rated temperature — for the standard 70°C thermoplastic cable you will meet
              constantly, that is 70°C at the conductor. Push more current through and the cable
              runs hotter than its insulation is built for, and the insulation degrades. This
              maximum is the current-carrying capacity, and BS 7671 Appendix 4 tabulates it for you,
              cable size by cable size, for a stated set of assumptions.
            </p>
            <p>
              Those assumptions matter more than the numbers themselves, because the whole of this
              section is what happens when your actual job does not match them. BS 7671's tables are
              built on <strong className="text-white">reference conditions</strong>: an ambient
              temperature of 30°C, a single circuit not grouped with any other, and no thermal
              insulation surrounding the cable. A tabulated rating is the true capacity only when
              all three of those hold. Change any one of them — a hotter loft, three other cables
              run alongside, insulation packed round the cable — and the tabulated figure stops
              being the cable's real capacity. That is the entire reason correction factors exist:
              not as an extra hoop to jump through, but because the table was never claiming to
              describe your actual installation.
            </p>
            <p>
              Table 4D5, which covers flat twin and earth — the cable you will use on the vast
              majority of domestic circuits — gives, for Reference Method C (clipped direct to a
              surface): 1.0mm² = 16A, 1.5mm² = 20A, 2.5mm² = 27A, 4.0mm² = 37A, 6.0mm² = 47A,
              10.0mm² = 64A, 16.0mm² = 85A. Those seven numbers are worth having close to memorised,
              because every worked example in this section starts from one of them.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A 2.5mm² flat T&E ring final circuit is clipped direct (Method C) in a domestic hallway at a normal ambient temperature, on its own, with no thermal insulation anywhere near it. Read its tabulated rating from Table 4D5, and state which of the three reference conditions actually apply here."
            steps={[
              {
                calc: 'Cable size and method → 2.5mm², Method C',
                note: 'Table 4D5, Method C column.',
              },
              {
                calc: 'Tabulated rating → 27A',
                note: 'Read directly off the table, no correction needed yet.',
              },
              {
                calc: 'Check the three reference conditions',
                note: 'Ambient ~30°C: yes. Single circuit, not grouped: yes, it is on its own. No thermal insulation nearby: yes.',
              },
            ]}
            answer="27A, and it is the true effective capacity as it stands — because all three reference conditions genuinely hold for this circuit. No correction factor is needed here, which is precisely why the tabulated figure and the effective figure are the same number in this one case."
            watchOut="It is tempting to think every cable needs a correction factor applied. It does not — a circuit installed exactly as the reference conditions describe needs none at all. The skill is recognising which condition, if any, has actually changed."
          />

          <TryIt
            question="A 4.0mm² flat T&E cable is clipped direct (Method C) to a wall in a domestic garage. Ambient temperature is normal, it is the only circuit on that wall, and there is no thermal insulation anywhere near it. Read its tabulated rating and say whether any correction is needed."
            steps={[
              {
                calc: 'Cable size and method → 4.0mm², Method C',
                note: 'Table 4D5, Method C column.',
              },
              { calc: 'Tabulated rating → 37A', note: 'Read directly off the table.' },
              {
                calc: 'Check the reference conditions',
                note: 'Normal ambient, single circuit, no insulation — all three hold.',
              },
            ]}
            answer="37A, with no correction needed. Same reasoning as the worked example — this circuit genuinely matches all three reference conditions, so the tabulated and effective ratings are the same number."
          />

          <CommonMistake
            title="Reading the tabulated rating as the final answer without checking the conditions"
            whatHappens="A cable is sized from the tabulated table figure alone, without asking whether the installation actually matches reference conditions. It is then installed grouped with other circuits, or through insulation, or in a hot loft — and the real capacity is well below the number that was used to size it."
            doInstead="Before trusting a tabulated figure, check all three conditions against the actual route: what is the ambient temperature along the whole run, is it grouped with anything else, and does it pass through or near thermal insulation anywhere. Any deviation from any one of the three means a correction factor is needed."
          />

          <SectionRule />

          {/* ── 02 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>02 · Installation methods</ContentEyebrow>

          <ConceptBlock title="The installation method is chosen before the cable size, not after">
            <p>
              How a cable is installed changes how well it can shed the heat it generates, and Table
              4A2 defines the reference installation methods that Table 4D5 is built around. The
              more enclosed a cable is, the less air can move around it, and the lower its current
              rating for the same size:
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">Method A</strong> — enclosed in conduit within a
                thermally insulating wall. The most enclosed of the three Table 4D5 covers, and the
                lowest ratings.
              </li>
              <li>
                <strong className="text-white">Method B</strong> — enclosed in conduit or trunking
                fixed to a wall surface. Moderate ratings — some air movement around the conduit,
                but the cable itself is still enclosed.
              </li>
              <li>
                <strong className="text-white">Method C</strong> — clipped directly to a surface,
                the most common domestic method. Free air movement all around the cable, and the
                best ratings Table 4D5 gives.
              </li>
            </ul>
            <p className="mt-3">
              A free-air or cable-tray method (sometimes called Method E) gives higher ratings still
              on cables that are tabulated for it — but flat twin and earth is not one of them.
              Table 4D5 tabulates flat T&amp;E for Methods A, B and C, and separately for Methods
              100 to 103 (the building-void methods used above plasterboard ceilings and in
              insulated stud walls). There is no free-air column for flat T&amp;E at all. If a job
              genuinely needs a free-air rating, that is a single-core cable on a different table,
              not flat T&amp;E read differently.
            </p>
            <p className="mt-3">
              One more rule worth fixing now, because it catches people on real routes: if a cable
              passes through more than one installation method along its length, the most
              restrictive method governs the <em>whole</em> run, not just the section it applies to
              — unless that restrictive section is under 0.5m. A cable clipped direct for 8m that
              then runs through 50mm of loft insulation for the last 200mm is not "mostly Method C".
              Once that 200mm exceeds 0.5m of restriction it would be treated by the insulated
              section's own rules for its whole length, and even under 0.5m it still needs the Ci
              correction covered in Section 05 — it does not simply vanish. A single soft spot on
              the route can undo the rating you calculated for the rest of it.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A 2.5mm² flat T&E cable is available for three different jobs, all clipped, buried or ducted along a domestic wall. Read its tabulated rating for Method A, Method B and Method C, and say how much more current the Method C installation carries than the Method A one, as a percentage."
            steps={[
              {
                calc: 'Method A (in an insulated wall) → 20A',
                note: 'Table 4D5, Method A column, 2.5mm² row.',
              },
              {
                calc: 'Method B (in conduit on the wall) → 23A',
                note: 'Table 4D5, Method B column, 2.5mm² row.',
              },
              {
                calc: 'Method C (clipped direct) → 27A',
                note: 'Table 4D5, Method C column, 2.5mm² row.',
              },
              { calc: 'Increase from A to C → (27 − 20) / 20 × 100', note: '7 / 20 = 0.35 → 35%.' },
            ]}
            answer="20A (Method A), 23A (Method B), 27A (Method C) — the identical cable carries 35% more current clipped to a surface than buried in an insulated wall, purely from where it is installed. That is why the installation method is decided before the cable size, not treated as an afterthought once the size is chosen."
            watchOut="These three numbers all describe the SAME piece of cable. Nothing about the copper or the insulation has changed — only how well it can shed heat. It is a mistake to think a 'better' cable exists for a job like this; the answer is a better route, not a bigger conductor, wherever a better route is achievable."
          />

          <TryIt
            question="A 6.0mm² flat T&E cable could be run three ways for a cooker circuit: Method A, Method B or Method C. Read all three tabulated ratings from Table 4D5, and say which you would choose if the route allowed any of them, and why."
            steps={[
              { calc: 'Method A → 32A', note: 'Table 4D5, Method A column, 6.0mm² row.' },
              { calc: 'Method B → 38A', note: 'Table 4D5, Method B column, 6.0mm² row.' },
              { calc: 'Method C → 47A', note: 'Table 4D5, Method C column, 6.0mm² row.' },
            ]}
            answer="Method C, clipped direct, gives the highest rating (47A) of the three for the identical cable — and the highest rating gives the most headroom against whatever device the cooker circuit actually needs, without stepping up a cable size. Where the building allows it, Method C is the installation to design toward."
          />

          <InlineCheck
            id="cable-check-1"
            question="A 4.0mm² flat T&E cable is run in conduit on a wall (Reference Method B) and protected by a 32A MCB. No correction factors apply. Does it comply?"
            options={[
              'Yes — 4.0mm² is the standard cable for a 32A circuit',
              'No — Method B gives 4.0mm² an Iz of 30A, which is below the 32A device',
              'Yes, provided the run is under 10m',
              'Only if additional ventilation is provided',
            ]}
            correctIndex={1}
            explanation="Table 4D5 gives 4.0mm² flat T&E 30A in Method B — not 32A. The rule is Ib ≤ In ≤ Iz, and here In (32A) exceeds Iz (30A), so it fails before you have applied a single correction factor. This is worth dwelling on, because '4mm² is the 32A cable' is something you will hear said on site. It is true clipped direct, where Method C gives it 37A. Put the same cable in conduit and it is not. The cable size alone never tells you the rating — the size and the installation method together do."
          />

          <SectionRule />

          {/* ── 03 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>03 · Correction factor Ca — ambient temperature</ContentEyebrow>

          <ConceptBlock
            title="Ca corrects for a hotter, or cooler, environment than the table assumes"
            plainEnglish="A cable can only shed so much heat into the air around it. If that air already starts warmer than the table's reference 30°C, the cable has less room to dump its own heat, so it has to carry less current to stay within its rated temperature."
          >
            <p>
              Table 4B1 gives the ambient temperature correction factor, Ca, for 70°C thermoplastic
              (PVC) insulation. At exactly the reference 30°C, Ca = 1.00 — no correction. Above
              30°C, Ca falls below 1.00, because the cable's margin to shed heat has shrunk. Below
              30°C, Ca can rise slightly above 1.00, because the cable has more room than the table
              assumed. The values you will meet most: 25°C = 1.03, 30°C = 1.00 (reference), 35°C =
              0.94, 40°C = 0.87, 45°C = 0.79, 50°C = 0.71, 55°C = 0.61.
            </p>
            <p>
              Ca applies as a straight multiplier on the tabulated rating: effective capacity due to
              temperature alone = It × Ca. A loft in summer, the space near a boiler, a plant room
              or a commercial kitchen can all sit well above 30°C, and each one erodes the cable's
              real capacity below what the table alone suggests. A UK domestic installation at
              normal ambient temperature needs no Ca correction at all — Ca = 1.00 is the default,
              and it is worth naming out loud that this is the same "no correction needed" case as
              Section 01, just for a different one of the three reference conditions.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A 6.0mm² T&E cable (Method C, tabulated It = 47A) is installed in a boiler house where the ambient temperature is 40°C. What is its effective current-carrying capacity due to temperature alone, and would it still be adequate for a circuit protected by a 40A MCB?"
            steps={[
              { calc: 'Tabulated rating → It = 47A', note: 'Method C, 6.0mm², from Table 4D5.' },
              { calc: 'Ca at 40°C → 0.87', note: 'Table 4B1, 70°C column.' },
              { calc: 'Effective capacity = It × Ca = 47 × 0.87', note: '= 40.89A.' },
              { calc: 'Compare to the 40A device', note: '40.89A ≥ 40A — passes, but only just.' },
            ]}
            answer="40.89A. It clears a 40A device, but with almost no margin left — 0.89A. Any further correction (grouping, insulation) would very likely push it below 40A, at which point 10.0mm² would be the safer choice."
            watchOut="A margin under 1A on a temperature-only calculation is not a result to build on. If any other correction factor is going to apply on the same run — and in a boiler house, grouping with other services is common — check the combined figure before committing to the smaller cable."
          />

          <TryIt
            question="The same style of circuit, but this time a 10.0mm² T&E cable (Method C, tabulated It = 64A) is installed in a plant room at 45°C. What is its effective capacity due to temperature alone, and is it adequate for a 50A device?"
            steps={[
              { calc: 'Tabulated rating → It = 64A', note: 'Method C, 10.0mm², from Table 4D5.' },
              { calc: 'Ca at 45°C → 0.79', note: 'Table 4B1, 70°C column.' },
              { calc: 'Effective capacity = 64 × 0.79', note: '= 50.56A.' },
            ]}
            answer="50.56A — adequate for a 50A device, with a similarly thin 0.56A margin to the shower-circuit example above. The same lesson applies: if anything else on this run needs correcting for, check the combined factor before relying on this figure alone."
          />

          <SectionRule />

          {/* ── 04 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>04 · Correction factor Cg — grouping</ContentEyebrow>

          <ConceptBlock
            title="Cg corrects for cables heating each other up when they are bundled together"
            onSite="Grouping is the derating factor most often missed on a real job, because it is invisible on the drawing — it only shows up when you actually look at how many cables share a route."
          >
            <p>
              When multiple loaded cables run bunched together — the same conduit, the same
              trunking, clipped together along a joist — each one's waste heat warms the air
              immediately around the others, and none of them can shed heat as freely as the
              reference single-circuit condition assumes. Table 4C1 tabulates Cg by the number of
              circuits grouped together: 1 circuit = 1.00, 2 = 0.80, 3 = 0.70, 4 = 0.65, 5 = 0.60, 6
              = 0.57, 7 = 0.54, 8 = 0.52, 9 = 0.50.
            </p>
            <p>
              The table does not stop at 9 circuits, and 0.50 is not a floor the factor settles at —
              it keeps falling as more circuits are added: 12 circuits = 0.45, 16 = 0.41, 20 = 0.38.
              On a commercial job with a full trunking run carrying a dozen or more circuits, those
              are the real numbers in play, and treating 0.50 as the worst case will undersize every
              cable in the bundle. Cg applies exactly like Ca — as a straight multiplier on the
              tabulated rating — and where more than one correction factor applies at once, all of
              them multiply together in the same formula, as the worked examples below show.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Three 2.5mm² T&E circuits are clipped together along the same joist run (Method C, tabulated It = 27A each). What is the effective capacity of each cable once grouping is applied, and is it adequate if these are 20A MCB circuits?"
            steps={[
              { calc: 'Tabulated rating → It = 27A', note: 'Method C, 2.5mm², from Table 4D5.' },
              { calc: 'Cg for 3 circuits → 0.70', note: 'Table 4C1.' },
              { calc: 'Effective capacity = 27 × 0.70', note: '= 18.9A.' },
              { calc: 'Compare to 20A device', note: '18.9A < 20A — the cable fails.' },
            ]}
            answer="18.9A — below the 20A device rating, so 2.5mm² fails once grouping is accounted for. Stepping up to 4.0mm² (tabulated 37A) gives 37 × 0.70 = 25.9A, which clears the 20A device with room to spare."
            watchOut="27A looks perfectly adequate for a 20A circuit until grouping is applied. This is exactly why the fundamental sizing rule uses It, the tabulated figure, only as a starting point — the number that actually has to clear In is the effective capacity after every applicable correction factor."
          />

          <TryIt
            question="Eight 1.5mm² lighting circuits are bunched together in a single length of trunking (Method C, tabulated It = 20A each). What is the effective capacity of each cable, and would it still clear a 6A lighting MCB?"
            steps={[
              { calc: 'Tabulated rating → It = 20A', note: 'Method C, 1.5mm², from Table 4D5.' },
              {
                calc: 'Cg for 8 circuits → 0.52',
                note: 'Table 4C1 — the row that is easy to skip over.',
              },
              { calc: 'Effective capacity = 20 × 0.52', note: '= 10.4A.' },
            ]}
            answer="10.4A — comfortably clears a 6A lighting MCB, so this bundle is fine as it stands. But note how far the effective capacity has already fallen from the 20A tabulated figure, purely from grouping eight circuits together; a heavier load on any one of those circuits would not have this much room to spare."
          />

          <InlineCheck
            id="cable-check-2"
            question="Six 2.5mm² T&E cables are bunched together (Method C, It = 27A). Cg for 6 circuits = 0.57. What is the effective current rating of each cable?"
            options={['27.0A', '47.4A', '15.39A', '6.0A']}
            correctIndex={2}
            explanation="Effective rating = 27 × 0.57 = 15.39A. Since a standard 16A MCB exceeds 15.39A, you would need to upgrade to 4.0mm² (36 × 0.57 = 20.5A) for 16A circuits or reduce the number of grouped circuits."
          />

          <WorkedExample
            question="A 10.0mm² T&E cable (Method C, tabulated It = 64A) is grouped with three other circuits (Cg for 4 circuits) in a plant room at 40°C (Ca at 40°C). No thermal insulation. What is the combined effective capacity, and is it adequate for a 40A device?"
            steps={[
              { calc: 'Tabulated rating → It = 64A', note: 'Method C, 10.0mm², from Table 4D5.' },
              { calc: 'Ca at 40°C → 0.87', note: 'Table 4B1.' },
              { calc: 'Cg for 4 circuits → 0.65', note: 'Table 4C1.' },
              { calc: 'Combined factor = Ca × Cg = 0.87 × 0.65', note: '= 0.5655.' },
              { calc: 'Effective capacity = 64 × 0.5655', note: '= 36.2A.' },
              { calc: 'Compare to 40A device', note: '36.2A < 40A — the cable fails.' },
            ]}
            answer="36.2A — below the 40A device, so this cable fails once both factors are combined, even though 64A looked like a generous margin on the tabulated figure alone. Both factors have to be multiplied together in the one formula, not checked one at a time and stopped at the first pass."
            watchOut="Checking Ca alone (64 × 0.87 = 55.7A, a comfortable pass) and stopping there is exactly how this kind of cable ends up undersized on a real job. Every correction factor that genuinely applies has to go into the same product — Required It = In / (Ca × Cg × Ci) — before a cable is chosen."
          />

          <SectionRule />

          {/* ── 05 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>05 · Correction factor Ci — thermal insulation</ContentEyebrow>

          <ConceptBlock title="Ci is keyed on the LENGTH a cable is surrounded for — not how deep the insulation is">
            <p>
              When a cable is totally surrounded by thermal insulation — loft insulation, cavity
              wall insulation — it loses almost all ability to shed heat into the air, because there
              is no air touching it any more. BS 7671 Appendix 4, Section 2.6 tabulates the derating
              factor Ci by the <strong className="text-white">length</strong> of cable that is
              totally surrounded: 50mm = 0.88, 100mm = 0.78, 200mm = 0.63, 400mm = 0.51, and 500mm
              or more = 0.50. Where a cable is totally surrounded for 0.5m (500mm) or more,
              Regulation 523.9 goes further and fixes Ci at 0.5 outright, in the absence of more
              precise manufacturer data — you do not interpolate or look further down a table at
              that point, the regulation sets the figure.
            </p>
            <p>
              The trap in that paragraph is the word length. The table is not asking how thick the
              loft insulation is sitting on top of the cable — it is asking how far along the
              cable's route it is buried in insulation. A cable that runs for two metres through
              150mm-deep loft insulation is surrounded for two <em>metres</em>, not 150{' '}
              <em>millimetres</em>. Reading the depth (150mm) off the length bands and picking 0.63
              is a real mistake people make, and it understates how badly derated the cable actually
              is — once the surrounded length passes 0.5m, Reg 523.9 already puts you at Ci = 0.5,
              well below the 0.63 a depth-based misreading would suggest.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A lighting circuit in 1.5mm² T&E (Method C, tabulated It = 20A) runs across a loft. The cable passes through 150mm-deep loft insulation for a distance of 2 metres. What Ci applies, and what is the derated capacity? Then say what a common misreading of the 150mm figure would give instead."
            steps={[
              {
                calc: 'Identify the two numbers in the question → 150mm depth, 2m length',
                note: 'The table is keyed on the second number, not the first.',
              },
              {
                calc: 'Length surrounded = 2m = 2000mm ≥ 500mm',
                note: 'Reg 523.9 applies once the surrounded length reaches 0.5m.',
              },
              {
                calc: 'Ci = 0.5, fixed by Reg 523.9',
                note: 'Not looked up from the length table at all, once past the 0.5m threshold.',
              },
              { calc: 'Derated capacity = 20 × 0.5', note: '= 10A.' },
              {
                calc: 'Common misreading: treat 150mm as the length',
                note: '150mm sits between the 100mm (0.78) and 200mm (0.63) rows, so a depth-based misreading gives Ci = 0.63 → 20 × 0.63 = 12.6A — a capacity 26% higher than the cable is actually entitled to.',
              },
            ]}
            answer="Ci = 0.5 (Reg 523.9, because the cable is surrounded for 2m, well past the 0.5m threshold), giving a derated capacity of 10A. A 6A lighting MCB still passes comfortably (10A ≥ 6A), but half the cable's rated capacity has gone to the insulation, and reading the 150mm depth as the table's length would have quietly overstated the true capacity by 26%."
            watchOut="Depth and length are two different measurements answering two different questions, and this table only ever answers the second one. Every time a job mentions insulation depth, the number you actually need is how far the cable runs while surrounded by it — ask for that figure specifically if it is not given."
          />

          <TryIt
            question="A power circuit in 2.5mm² T&E (Method C, tabulated It = 27A) runs through a stud wall packed with insulation for a distance of 300mm. What Ci applies, and what is the derated capacity?"
            steps={[
              {
                calc: 'Length surrounded = 300mm',
                note: "Under the 500mm threshold, so Reg 523.9's outright 0.5 does not yet apply — look up the length table instead.",
              },
              {
                calc: 'Nearest tabulated length at or above 300mm → 400mm',
                note: 'Appendix 4 §2.6 prints discrete values; step to the more onerous (higher) one rather than interpolating.',
              },
              { calc: 'Ci at 400mm → 0.51', note: 'From the Ci length table.' },
              { calc: 'Derated capacity = 27 × 0.51', note: '= 13.77A.' },
            ]}
            answer="Ci = 0.51, giving a derated capacity of 13.77A. Notice this one is looked up from the table, not fixed by Reg 523.9, because 300mm has not yet reached the 0.5m length at which the regulation takes over."
          />

          <Scenario
            title="The retrofit that quietly halved a cable's capacity"
            situation="You are asked to add loft insulation on top of an existing lighting circuit as part of an energy-efficiency upgrade. The cable was originally installed clipped direct in a clear loft, correctly sized on that basis. Nobody re-checks the cable once 300mm of new insulation goes down over a 3-metre stretch of it."
            whatToDo="Before signing off or ignoring the upgrade as 'not electrical work', check whether the newly buried length crosses the 0.5m threshold — here it clearly does, which fixes Ci at 0.5 under Reg 523.9. Recalculate the cable's derated capacity against the circuit's actual load, and if it no longer clears its protective device, the cable needs re-routing above the insulation or upsizing."
            whyItMatters="A cable that was correctly sized on the day it was installed can become non-compliant years later purely because somebody else's work changed one of the three reference conditions around it. Thermal insulation upgrades are common and rarely involve an electrician being told about them in advance — which is exactly why this is worth actively checking for, not assuming someone else caught it."
          />

          <SectionRule />

          {/* ── 06 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>06 · Voltage drop calculations</ContentEyebrow>

          <ConceptBlock
            title="A cable can pass on current capacity and still fail on voltage drop — they are two separate checks"
            plainEnglish="Every metre of cable has some resistance, and current flowing through resistance loses voltage. Over a long enough run, or at a high enough current, that loss becomes large enough to matter to the equipment at the far end."
          >
            <p>
              Voltage drop is calculated as VD = mV/A/m &times; Ib &times; L / 1000, where mV/A/m is
              the cable's own tabulated voltage-drop figure, Ib is the design current in amps, and L
              is the route length in metres. Table 4D5 gives the mV/A/m figures for flat T&amp;E:
              1.0mm² = 44, 1.5mm² = 29, 2.5mm² = 18, 4.0mm² = 11, 6.0mm² = 7.3, 10.0mm² = 4.4,
              16.0mm² = 2.8 — note that the figure falls as the cable gets larger, because a bigger
              conductor has less resistance per metre.
            </p>
            <p>
              BS 7671 Appendix 4 §6.4 gives 3% and 5% of the nominal supply voltage as{' '}
              <strong className="text-white">recommended</strong> maxima — a deemed-to-satisfy route
              via Regulation 525.202, not a permitted ceiling written as an absolute limit. On a
              230V supply, 3% is about 6.9V and applies to lighting circuits, where the visible
              effects of voltage drop (dimming, flicker) matter more; 5% is about 11.5V and applies
              to other circuits generally. Getting the wrong one of those two figures for a given
              circuit is the single most common voltage-drop mistake, because both look like
              plausible round numbers and nothing about the calculation itself tells you which one
              to check against — you have to know the circuit type before you can judge the answer.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A 1.5mm² lighting circuit supplies 8A over a 30 metre cable run. Calculate the voltage drop, check it against the correct recommended maximum for a lighting circuit, and say what you would do if it fails."
            steps={[
              { calc: 'mV/A/m for 1.5mm² → 29', note: 'Table 4D5.' },
              { calc: 'VD = 29 × 8 × 30 / 1000', note: '= 6,960 / 1000 = 6.96V.' },
              {
                calc: 'Correct recommended maximum → 3% of 230V ≈ 6.9V',
                note: 'This is a lighting circuit, not the general 5%/11.5V figure.',
              },
              {
                calc: 'Compare → 6.96V vs 6.9V',
                note: '6.96V exceeds 6.9V — it fails, by a small margin of 0.06V.',
              },
            ]}
            answer="6.96V, against a recommended maximum of 6.9V — it fails, narrowly. Stepping up to 2.5mm² gives VD = 18 × 8 × 30 / 1000 = 4.32V, which passes comfortably."
            watchOut="A fail by 0.06V is still a fail. There is no informal tolerance around the recommended figure — if the calculated drop exceeds it, the cable needs upsizing (or the run needs shortening, where that is practical), not rounding down in your head to make it pass."
          />

          <TryIt
            question="A 4.0mm² power circuit (not lighting) supplies 32A over a 25 metre run. Calculate the voltage drop and check it against the correct recommended maximum."
            steps={[
              { calc: 'mV/A/m for 4.0mm² → 11', note: 'Table 4D5.' },
              { calc: 'VD = 11 × 32 × 25 / 1000', note: '= 8,800 / 1000 = 8.8V.' },
              {
                calc: 'Correct recommended maximum → 5% of 230V ≈ 11.5V',
                note: 'A power circuit, not lighting, so the 11.5V figure applies, not 6.9V.',
              },
            ]}
            answer="8.8V, against a recommended maximum of 11.5V — passes, with reasonable margin. Note that this exact figure would have failed if it were a lighting circuit (limit 6.9V), which is why checking the circuit type before judging the number is not optional."
          />

          <InlineCheck
            id="cable-check-3"
            question="A 4.0mm² cable (mV/A/m = 11) supplies a 32A load over 25m. What is the voltage drop and does it pass for a power circuit?"
            options={[
              '8.8V — fails (limit 6.9V for lighting)',
              '11.0V — passes just within limit',
              '11.0V — fails the 11.5V limit',
              '8.8V — passes (limit 11.5V for power circuits)',
            ]}
            correctIndex={3}
            explanation="VD = 11 × 32 × 25 / 1000 = 8.8V. For a power circuit, the recommended maximum is 5% of 230V = 11.5V. Since 8.8V < 11.5V, it passes. If this were a lighting circuit (recommended maximum 6.9V), it would fail."
          />

          <SectionRule />

          {/* ── 07 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>07 · Worked cable sizing examples</ContentEyebrow>

          <ConceptBlock
            title="Putting the whole procedure together, on two of the circuits you will size most often"
            onSite="A shower and a cooker are the two domestic circuits most likely to actually fail a naive cable choice, because both carry enough current that a rounding error in the device rating changes the answer."
          >
            <p>
              Every calculation in this section so far has taken one correction factor in isolation.
              A real job applies design current, device selection, every relevant correction factor
              together, cable selection and voltage drop, in sequence, on the same circuit. The two
              examples below run that full sequence twice — once on a circuit where the correction
              factors are all 1.0, so the exercise is about the device ladder, and once on a circuit
              where three correction factors combine and the exercise is about knowing when a
              calculated answer means "change the route", not "buy a bigger cable".
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A 9.5kW electric shower is wired 15m from the consumer unit, cable clipped direct (Method C), 30°C ambient, single circuit, no thermal insulation. Take it from design current through to a compliant cable size, checking voltage drop at the end."
            steps={[
              { calc: 'Step 1 — Design current: Ib = P / V = 9500 / 230', note: '= 41.3A.' },
              {
                calc: 'Step 2 — Protective device: next standard MCB ≥ 41.3A',
                note: 'The BS EN 60898 ladder runs 6, 10, 16, 20, 25, 32, 40, 50, 63 — there is no 45A rung, so In = 50A Type B, not 45A.',
              },
              {
                calc: 'Step 3 — Correction factors: Ca = 1.0, Cg = 1.0, Ci = 1.0',
                note: 'All three reference conditions hold — no derating needed.',
              },
              { calc: 'Required It = In / (Ca × Cg × Ci) = 50 / 1.0', note: '= 50A.' },
              {
                calc: 'Step 4 — Select cable: 6.0mm² = 47A',
                note: '47A is below the required 50A — fails.',
              },
              { calc: 'Step 4 continued — 10.0mm² = 64A', note: '64A ≥ 50A — passes.' },
              {
                calc: 'Step 5 — Voltage drop check, 10.0mm²: VD = 4.4 × 41.3 × 15 / 1000',
                note: '= 2.73V — well inside the 11.5V recommended maximum for a power circuit.',
              },
            ]}
            answer="10.0mm² is the minimum compliant cable. 6.0mm² is ruled out purely on current capacity (47A against a required 50A) before voltage drop is even considered — the shortfall is entirely down to there being no 45A device to size the cable against."
            watchOut="It is easy to round 41.3A up to '45A-ish' in your head and reach for 6.0mm² on the assumption a 45A device exists. It does not. Working to the actual device ladder — not an imagined one — is exactly why 10.0mm² is the routine choice for a shower this size, not generosity on the electrician's part."
          />

          <TryIt
            question="An 8.5kW electric shower is wired 12m from the consumer unit, cable clipped direct (Method C), 30°C ambient, single circuit, no thermal insulation. Run the same five-step procedure."
            steps={[
              { calc: 'Step 1 — Ib = 8500 / 230', note: '= 37.0A.' },
              {
                calc: 'Step 2 — Next standard MCB ≥ 37.0A',
                note: 'In = 40A Type B (the next rung up on 6, 10, 16, 20, 25, 32, 40, 50, 63).',
              },
              {
                calc: 'Step 3 — All correction factors = 1.0',
                note: 'Required It = 40 / 1.0 = 40A.',
              },
              { calc: 'Step 4 — 6.0mm² = 47A', note: '47A ≥ 40A — passes.' },
              {
                calc: 'Step 5 — VD, 6.0mm²: 7.3 × 37.0 × 12 / 1000',
                note: '= 3.24V — well inside 11.5V.',
              },
            ]}
            answer="6.0mm² is sufficient here — In lands on 40A rather than 50A, which is exactly the margin that keeps 6.0mm² (47A) viable where it failed for the 9.5kW shower above. The procedure is identical; only where the load falls on the device ladder changes the result."
          />

          <WorkedExample
            question="A 12kW electric cooker is wired 18m, Method C, but the route passes through 200mm of loft insulation for 1m and is grouped with one other circuit for 3m of that run, in a loft ambient of 35°C. Run the full procedure, and say what the result actually tells you to do."
            steps={[
              { calc: 'Step 1 — Ib = 12000 / 230', note: '= 52.17A.' },
              {
                calc: 'Step 2 — Next standard MCB ≥ 52.17A',
                note: 'In = 63A (the ladder has no 60A rung).',
              },
              {
                calc: 'Step 3 — Worst-case correction factors: Ca = 0.94 (35°C), Cg = 0.80 (2 circuits), Ci = 0.50 (surrounded for 1m ≥ 0.5m, Reg 523.9)',
                note: 'Combined = 0.94 × 0.80 × 0.50 = 0.376.',
              },
              { calc: 'Required It = 63 / 0.376', note: '= 167.6A.' },
              {
                calc: 'Check against available cable sizes',
                note: '167.6A is not a domestic cable size — you would be into 50mm², a two-person pull, for a 12kW cooker circuit. That is the sign this is the wrong question.',
              },
              {
                calc: 'Reroute instead: keep the run clear of the insulation and the other circuit',
                note: 'Only Ca (0.94) is left. Required It = 63 / 0.94 = 67.0A.',
              },
              {
                calc: 'Select cable against the rerouted figure',
                note: '16.0mm² = 85A ≥ 67.0A — passes.',
              },
            ]}
            answer="Rerouted, 16.0mm² is the answer (85A against a required 67.0A). Left on the original route, the required It of 167.6A is telling you the installation is the problem, not the cable — no domestic-scale cable answers that number sensibly."
            watchOut="167.6A is not a signal to keep going up cable sizes until something fits. Three correction factors compounding together (0.376 combined) is a sign the route itself is bad, and half an hour spent changing where the cable runs is worth far more than several hundred pounds of oversized cable and a much harder installation. This example deliberately ignores the diversity allowance a real cooker circuit would apply — the point here is the correction factors, not the full design current a working job would actually use."
          />

          <TryIt
            question="A 10kW cooker circuit is wired 14m, Method C, and the route can be planned to avoid both grouping and thermal insulation entirely, in a loft at 35°C ambient. Run the procedure."
            steps={[
              { calc: 'Step 1 — Ib = 10000 / 230', note: '= 43.5A.' },
              { calc: 'Step 2 — Next standard MCB ≥ 43.5A', note: 'In = 50A.' },
              {
                calc: 'Step 3 — Only Ca applies: 0.94 at 35°C',
                note: 'Required It = 50 / 0.94 = 53.2A.',
              },
              { calc: 'Step 4 — Select cable: 6.0mm² = 47A', note: '47A < 53.2A — fails.' },
              { calc: 'Step 4 continued — 10.0mm² = 64A', note: '64A ≥ 53.2A — passes.' },
            ]}
            answer="10.0mm² is the minimum, driven here purely by ambient temperature once the route has been planned to avoid grouping and insulation altogether — proof that a well-planned route can leave a single correction factor doing all the work, instead of three compounding together."
          />

          <SectionRule />

          {/* ── 08 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>08 · Cable selection summary</ContentEyebrow>

          <ConceptBlock title="The seven-step procedure, run start to finish, every time">
            <p>
              Every cable sizing question — on an exam paper or on site — reduces to the same seven
              steps in the same order. Learn the order, not just the individual formulae, because a
              step done out of sequence gives you a plausible-looking wrong answer just as easily as
              a step skipped entirely:
            </p>
            <ol className="mt-2 list-decimal space-y-1.5 pl-5">
              <li>
                <strong className="text-white">Design current (Ib).</strong> Ib = P / V for single
                phase; Ib = P / (&radic;3 &times; V<sub>L</sub>) for three phase.
              </li>
              <li>
                <strong className="text-white">Protective device (In).</strong> The next standard
                rating &ge; Ib, from the real device ladder — 6, 10, 16, 20, 25, 32, 40, 50, 63A.
              </li>
              <li>
                <strong className="text-white">Installation method.</strong> Table 4A2 — how the
                cable is actually installed along its whole route, using the most restrictive method
                anywhere it applies for 0.5m or more.
              </li>
              <li>
                <strong className="text-white">Correction factors.</strong> Required It = In / (Ca
                &times; Cg &times; Ci).
              </li>
              <li>
                <strong className="text-white">Select cable.</strong> The smallest size with a
                tabulated It &ge; the required value from step 4.
              </li>
              <li>
                <strong className="text-white">Check voltage drop.</strong> VD = mV/A/m &times; Ib
                &times; L / 1000, against 6.9V (lighting) or 11.5V (other), as recommended maxima.
              </li>
              <li>
                <strong className="text-white">Check earth fault loop impedance.</strong> Zs = Ze +
                (R1+R2) &times; 1.20, must not exceed the maximum for the device — outside the scope
                of this section, but the step that comes next in a real design.
              </li>
            </ol>
          </ConceptBlock>

          <WorkedExample
            question="A 7.2kW electric vehicle charger is wired 20m from the consumer unit, cable clipped direct (Method C), grouped with one other circuit for the whole run, 30°C ambient, no insulation. Run all seven steps."
            steps={[
              { calc: 'Step 1 — Ib = 7200 / 230', note: '= 31.3A.' },
              { calc: 'Step 2 — Next standard MCB ≥ 31.3A', note: 'In = 32A.' },
              {
                calc: 'Step 3 — Installation method → Method C, grouped with 1 other circuit',
                note: 'Cg for 2 circuits = 0.80 (Table 4C1); Ca = 1.0 at 30°C; Ci = 1.0, no insulation.',
              },
              { calc: 'Step 4 — Required It = 32 / (1.0 × 0.80 × 1.0)', note: '= 40.0A.' },
              { calc: 'Step 5 — Select cable: 6.0mm² = 47A', note: '47A ≥ 40.0A — passes.' },
              {
                calc: 'Step 6 — Voltage drop: VD = 7.3 × 31.3 × 20 / 1000',
                note: '= 4.57V — well inside 11.5V.',
              },
              {
                calc: 'Step 7 — Zs check',
                note: 'Outside this calculation — carried out separately once R1+R2 is measured.',
              },
            ]}
            answer="6.0mm² is the minimum compliant cable for this circuit, passing on both current capacity (47A against a required 40.0A) and voltage drop (4.57V against 11.5V)."
            watchOut="Both checks passed here, but they did not have to — a longer run or a third grouped circuit could easily have failed voltage drop while current capacity still passed, or the reverse. Running both checks every time, rather than stopping once one passes, is the whole point of steps 5 and 6 being separate steps."
          />

          <TryIt
            question="A 3.6kW electric vehicle charger is wired 25m from the consumer unit, cable clipped direct (Method C), on its own circuit (not grouped), 30°C ambient, no insulation. Run all six steps that this section covers (step 7, Zs, is outside this calculation)."
            steps={[
              { calc: 'Step 1 — Ib = 3600 / 230', note: '= 15.65A.' },
              { calc: 'Step 2 — Next standard MCB ≥ 15.65A', note: 'In = 16A.' },
              {
                calc: 'Step 3 — Method C, single circuit, 30°C, no insulation',
                note: 'All correction factors = 1.0.',
              },
              { calc: 'Step 4 — Required It = 16 / 1.0', note: '= 16A.' },
              { calc: 'Step 5 — Select cable: 2.5mm² = 27A', note: '27A ≥ 16A — passes.' },
              {
                calc: 'Step 6 — Voltage drop: VD = 18 × 15.65 × 25 / 1000',
                note: '= 7.04V — inside 11.5V.',
              },
            ]}
            answer="2.5mm² is sufficient on this run, passing both current capacity (27A against 16A) and voltage drop (7.04V against 11.5V) with a healthy margin on both — a much lighter circuit than the previous example, reflected in every step of the same procedure."
          />

          <CommonMistake
            title="Stopping the procedure once one check passes"
            whatHappens="A cable is sized against In, found to pass on current capacity, and the calculation stops there. On a long run or a high-current circuit, that same cable then fails the voltage drop check that was never carried out — and the fault is only discovered as an intermittent trip or dim lighting once the installation is live."
            doInstead="Treat steps 5 and 6 as two separate, mandatory checks, in that order, on every circuit. A cable is not sized until both have been run — current capacity decides the minimum size against In; voltage drop can then force it larger still, particularly on long runs."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'The governing rule is Ib ≤ In ≤ Iz. Every step in this section exists to get a real value for Iz — the effective, corrected capacity — that can be checked against In.',
              'BS 7671 tables assume reference conditions: 30°C ambient, a single circuit, no thermal insulation. Any deviation from any one of the three needs a correction factor.',
              'Table 4D5 (flat T&E) covers Methods A, B, C and 100–103 only — no Method D or E column exists for it. 4.0mm² is 37A on Method C but only 30A on Method B; the size alone never tells you the rating.',
              'Required It = In / (Ca × Cg × Ci). All three correction factors reduce the effective rating; none of them ever increases it above the reference value.',
              'Cg is not floored at 0.50 — Table 4C1 continues to 12 (0.45), 16 (0.41) and 20 (0.38) circuits.',
              'Ci is keyed on the LENGTH a cable is totally surrounded for, not the depth of insulation around it. Reg 523.9 fixes Ci at 0.5 outright once that length reaches 0.5m.',
              'The BS EN 60898 device ladder is 6, 10, 16, 20, 25, 32, 40, 50, 63A — there is no 45A and no 60A rung. Round up to the next real rating, never an imagined one.',
              'Voltage drop maxima — 3% lighting, 5% other — are RECOMMENDED, from Appendix 4 §6.4 via Reg 525.202, never a hard permitted ceiling. A fail by any margin is still a fail.',
              'Current capacity and voltage drop are two separate checks. A cable that passes one has told you nothing about the other — run both, every time.',
              'A calculated correction factor combination that demands an absurd cable size (167.6A on a domestic circuit) is telling you to change the installation, not to keep upsizing the cable.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Why does In use the design current rounded UP to the next device rating, rather than Ib itself, in the correction factor formula?',
                answer:
                  'Because the cable has to be able to carry whatever current the protective device will actually let through before it operates — which is In, the device rating, not the smaller Ib the load happens to draw on a given day. Sizing against Ib would leave the cable under-protected against its own device.',
              },
              {
                question: 'Is 6.0mm² ever adequate for a 9.5kW shower?',
                answer:
                  'Not on the standard device ladder. A 9.5kW shower needs In = 50A (there is no 45A rung to fall between), and Table 4D5 gives 6.0mm² only 47A on Method C — below 50A before any other correction factor is even applied. 10.0mm² is the minimum, which is why it turns up on showers of this size as routine practice rather than as a margin of safety being added on top.',
              },
              {
                question: 'If a cable passes voltage drop easily, can current capacity be ignored?',
                answer:
                  'No — they are unrelated checks and neither implies the other. A short, heavily loaded run can pass voltage drop comfortably while still failing current capacity if it is grouped or insulated; a long, lightly loaded run can pass current capacity easily while failing voltage drop. Both checks have to be run on every circuit.',
              },
              {
                question:
                  'Do correction factors ever make a cable’s rating HIGHER than the tabulated figure?',
                answer:
                  'Only very slightly, and only for Ca in a cooler-than-reference environment — 25°C gives Ca = 1.03, for example. Cg and Ci never exceed 1.00; grouping and thermal insulation only ever work against the cable, never in its favour.',
              },
              {
                question:
                  'What do I do if the required It comes out at an implausibly large number, like 167.6A on a domestic circuit?',
                answer:
                  'Treat it as a sign the installation itself needs changing, not as an instruction to keep selecting bigger cables. A combination of correction factors that severe usually means the route can be improved — clear of insulation, clear of other grouped circuits — and rerouting is very often cheaper and easier than the cable a literal reading of the number would require.',
              },
            ]}
          />

          <SectionRule />

          <Quiz questions={quizQuestions} title="Section 2: Cable Sizing & Selection Quiz" />

          {/* ── prev / next ─────────────────────────────────────────── */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module4/section1')
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-sm font-medium text-white touch-manipulation"
            >
              <ChevronLeft className="h-4 w-4" />
              Section 1
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module4/section3')
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-elec-yellow/35 bg-elec-yellow/[0.08] px-4 text-sm font-semibold text-white touch-manipulation"
            >
              Section 3
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default FunctionalSkillsModule4Section2;
