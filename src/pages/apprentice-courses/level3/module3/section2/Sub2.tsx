/**
 * Module 3 · Section 2 · Subsection 2 — Resistance, resistivity and DC circuits (AC 2.1)
 * Maps to C&G 2365-03 / Unit 302 / LO2 / AC 2.1
 *
 * Layered depth: 2357 Unit 609 ELTK08 / AC 4.4, 4.5, 4.6, 4.7, 4.8
 *   AC 4.4 — "describe what is meant by resistance and resistivity"
 *   AC 4.5/4.6 — "relationship and calculate values of current, voltage, resistance in series and parallel DC circuits"
 *   AC 4.7 — "calculate values of power in parallel and series DC circuits"
 *   AC 4.8 — "what is meant by voltage drop"
 *
 * R = ρL/A, Kirchhoff's voltage and current laws applied to series, parallel and mixed
 * networks, and the volt-drop calc that drives every cable size in BS 7671 Appendix 4.
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import ResistanceCalculator from '@/components/apprentice-courses/ResistanceCalculator';
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
  VideoCard,
} from '@/components/study-centre/learning';
import { SeriesCircuit, ParallelCircuit, MixedCircuit, KirchhoffVoltageLoop } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Resistance, resistivity and DC circuits | Level 3 Module 3.2.2 | Elec-Mate';
const DESCRIPTION =
  'R = ρL/A, Kirchhoff\'s laws on series and parallel networks, power dissipation, and the volt-drop formula behind every BS 7671 Appendix 4 cable size.';

const checks = [
  {
    id: 'l3-m3-2-2-resistivity',
    question:
      'Calculate the resistance of a 50 m, 2.5 mm² copper conductor at 20 °C. (ρ = 1.72 × 10⁻⁸ Ω·m)',
    options: [
      '0.034 Ω',
      '0.344 Ω',
      '0.172 Ω',
      '3.44 Ω',
    ],
    correctIndex: 1,
    explanation:
      'R = ρL/A = (1.72 × 10⁻⁸ × 50) / (2.5 × 10⁻⁶) = (8.6 × 10⁻⁷) / (2.5 × 10⁻⁶) = 0.344 Ω. Note CSA in m², not mm².',
  },
  {
    id: 'l3-m3-2-2-parallel',
    question:
      'Two resistors in parallel: R1 = 6 Ω and R2 = 3 Ω. Total resistance is:',
    options: [
      '4.5 Ω',
      '2 Ω',
      '1.5 Ω',
      '9 Ω',
    ],
    correctIndex: 1,
    explanation:
      'For two resistors in parallel: R = (R1 × R2) / (R1 + R2) = (6 × 3) / (6 + 3) = 18 / 9 = 2 Ω. Always less than the smallest single resistor.',
  },
  {
    id: 'l3-m3-2-2-vdrop',
    question:
      'A 32 A circuit, 6 mm² T&E, 25 m long, mV/A/m = 7.3. Voltage drop is:',
    options: [
      '1.46 V',
      '5.84 V',
      '58.4 V',
      '0.58 V',
    ],
    correctIndex: 1,
    explanation:
      'V_drop = (mV/A/m × I × L) / 1000 = (7.3 × 32 × 25) / 1000 = 5840 / 1000 = 5.84 V. Within the 6.9 V (3 %) limit for a final circuit.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The formula R = ρL/A means resistance:',
    options: [
      'Decreases with length and increases with cross-sectional area',
      'Increases with length and decreases with cross-sectional area',
      'Depends only on the applied voltage, not the conductor itself',
      'Increases with both length and cross-sectional area',
    ],
    correctAnswer: 1,
    explanation:
      'Longer = more resistance (more atoms to collide with). Bigger CSA = less resistance (more parallel paths for electrons).',
  },
  {
    id: 2,
    question:
      'Three 30 Ω resistors in series. Total resistance:',
    options: [
      '60 Ω',
      '10 Ω',
      '90 Ω',
      '30 Ω',
    ],
    correctAnswer: 2,
    explanation: 'In series, resistances add. 30 + 30 + 30 = 90 Ω.',
  },
  {
    id: 3,
    question:
      'Three 30 Ω resistors in parallel. Total resistance:',
    options: [
      '60 Ω',
      '30 Ω',
      '90 Ω',
      '10 Ω',
    ],
    correctAnswer: 3,
    explanation:
      'For n equal parallel resistors: R = R/n = 30/3 = 10 Ω. Or 1/R = 1/30 + 1/30 + 1/30 = 3/30 → R = 10 Ω.',
  },
  {
    id: 4,
    question:
      "Kirchhoff's voltage law states that around any closed loop:",
    options: [
      'The sum of EMFs equals the sum of voltage drops (algebraic sum = 0)',
      'The current is the same at every point in the loop',
      'The voltage across each component is identical',
      'The total resistance equals the sum of the branch conductances',
    ],
    correctAnswer: 0,
    explanation:
      'KVL: ΣV around any closed loop = 0 (or sum of EMF rises = sum of IR drops). It\'s conservation of energy applied to electric circuits.',
  },
  {
    id: 5,
    question:
      "Kirchhoff's current law at a junction states:",
    options: [
      'Voltage at all junctions equals zero',
      'Current in = current out (algebraic sum = 0)',
      'Current rises with voltage',
      'Current splits equally always',
    ],
    correctAnswer: 1,
    explanation:
      'KCL: at any node, ΣI in = ΣI out. Conservation of charge — electrons can\'t pile up indefinitely.',
  },
  {
    id: 6,
    question:
      'A 10 Ω resistor passes 5 A. Power dissipated is:',
    options: [
      '2 W',
      '50 W',
      '250 W',
      '500 W',
    ],
    correctAnswer: 2,
    explanation: 'P = I²R = 25 × 10 = 250 W. Or P = V × I = 50 × 5 = 250 W (V = IR = 50).',
  },
  {
    id: 7,
    question:
      'A 230 V supply across a 23 Ω element. Power dissipated:',
    options: [
      '10 W',
      '230 W',
      '5.3 kW',
      '2.3 kW',
    ],
    correctAnswer: 3,
    explanation:
      'P = V²/R = 230² / 23 = 52 900 / 23 = 2300 W = 2.3 kW. Typical immersion-heater element.',
  },
  {
    id: 8,
    question: 'Voltage drop on a final circuit is limited to:',
    options: [
      '3 % of nominal',
      '5 % of nominal',
      '1 % of nominal',
      'No limit',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 §525 / Appendix 4: 3 % for lighting circuits, 5 % for other circuits, but 3 % is commonly applied to all final circuits as a design limit. From the supply origin: 3 % lighting + 5 % power.',
  },
];

const faqs = [
  {
    question: 'Why does CSA appear in the denominator of R = ρL/A?',
    answer:
      "Because a thicker conductor offers more parallel paths for the electrons. Doubling CSA roughly halves resistance. That's why a 4 mm² has half the per-metre resistance of a 2 mm² of the same material.",
  },
  {
    question: 'Why does parallel resistance always come out smaller than the smallest branch?',
    answer:
      "Because you've added another current path. Whatever resistance R1 had on its own, putting R2 alongside it can only let MORE total current flow, which means LESS effective resistance. Same logic — more paths, less restriction.",
  },
  {
    question: "What's the difference between resistance and resistivity?",
    answer:
      "Resistance (Ω) is the total opposition of a specific component. Resistivity (Ω·m) is a material property — how resistive that material is per unit length per unit CSA. Same copper, but a 1 m piece and a 100 m piece have very different resistance, and the same resistivity.",
  },
  {
    question: 'Why does Appendix 4 use mV/A/m instead of Ω?',
    answer:
      "Because volt drop scales with current AND length together. Manufacturers tabulate mV per amp per metre at 70 °C operating temperature so you can compute drop without calculating R first. Multiply by I × L, divide by 1000 (mV → V), and you have your answer.",
  },
  {
    question: 'Does Kirchhoff\'s law work in AC too?',
    answer:
      "Yes, but you have to use phasors (vectors) instead of plain numbers. Voltages and currents in AC have phase angles, so the 'sum equals zero' includes both magnitudes and angles. Sub 2.5 brings phasors in.",
  },
  {
    question: "Why does my MFT show R1+R2 different at the far end of a long run vs the DB?",
    answer:
      "Because the MFT measures from the test point. R1+R2 from the DB sees the full out-and-back loop. From a socket halfway down, you get just half the run. Always test from the DB or origin so the value matches what your design assumes.",
  },
];

export default function Sub2() {
  useSEO(TITLE, DESCRIPTION);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module3-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 3 · Section 2 · Subsection 2"
            title="Resistance, resistivity and DC circuits"
            description="R = ρL/A. Series and parallel networks. Kirchhoff's laws. The voltage-drop formula behind every Appendix 4 cable size."
            tone="yellow"
          />

          <TLDR
            points={[
              'R = ρL/A — resistance scales with length, inversely with CSA, multiplied by material resistivity.',
              'Series: resistances ADD. Parallel: 1/R = sum of 1/R_n (or for two: R = R1×R2/(R1+R2)).',
              "Kirchhoff: ΣI at any junction = 0 (current law); ΣV around any loop = 0 (voltage law).",
              'Power: P = VI = I²R = V²/R. Heat dissipated in the resistor.',
              'Volt drop = (mV/A/m × I × L) / 1000. Limit 3 % for lighting, 5 % for power; design typically 3 % all-final-circuits.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Calculate conductor resistance from material resistivity, length and CSA.',
              'Calculate equivalent resistance for series, parallel and mixed networks.',
              "Apply Kirchhoff's voltage law and current law to find unknown V or I.",
              'Calculate power dissipation using P = VI = I²R = V²/R.',
              'Calculate voltage drop using BS 7671 Appendix 4 mV/A/m method.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Resistance and resistivity</ContentEyebrow>

          <ConceptBlock
            title="R = ρL/A — three things that decide a conductor's resistance"
            plainEnglish="Resistivity ρ is the material; length L is how much of it; cross-sectional area A is how much room the electrons have. Plug them in and you get the resistance."
            onSite="A 1 mm² copper conductor 100 m long has R ≈ (1.72 × 10⁻⁸ × 100) / (1 × 10⁻⁶) = 1.72 Ω. Halve the length, R halves. Double the CSA, R halves. Swap to aluminium, R rises ~64 %."
          >
            <p>
              <strong>R = ρL/A</strong>
            </p>
            <p>Where:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>R = resistance (Ω)</li>
              <li>ρ = resistivity (Ω·m) — material property</li>
              <li>L = length (m)</li>
              <li>A = cross-sectional area (m² — convert from mm² by × 10⁻⁶)</li>
            </ul>
            <p>
              Watch the units: 2.5 mm² is 2.5 × 10⁻⁶ m². Forget that conversion and your answer is
              a million times wrong.
            </p>
          </ConceptBlock>

          <div className="my-4">
            <ContentEyebrow>Try the calculator</ContentEyebrow>
            <ResistanceCalculator />
          </div>

          <VideoCard
            url={videos.ohmsLaw.url}
            title={videos.ohmsLaw.title}
            channel={videos.ohmsLaw.channel}
            duration={videos.ohmsLaw.duration}
            topic="Ohm's law — the basis of every voltage-drop calc"
            caption={
              <>
                The Engineering Mindset walks Ohm's law and IR drops with worked examples — the
                same V = IR that drives the mV/A/m volt-drop formula in BS 7671 Appendix 4 covered
                later in this Sub.
              </>
            }
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Series and parallel networks</ContentEyebrow>

          <ConceptBlock
            title="Series — same current, voltages add"
            plainEnglish="In a series circuit, the same current flows through every component. The supply voltage divides between them in proportion to their resistance."
          >
            <p>For resistors in series:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Total resistance: R<sub>T</sub> = R₁ + R₂ + R₃ + …</li>
              <li>Same current through every resistor.</li>
              <li>Voltage across each: V<sub>n</sub> = I × R<sub>n</sub>.</li>
              <li>Sum of voltage drops = supply voltage (KVL).</li>
            </ul>
          </ConceptBlock>

          <SeriesCircuit />

          <ConceptBlock
            title="Parallel — same voltage, currents add"
            plainEnglish="In a parallel circuit, every branch sees the full supply voltage. Currents divide between branches in inverse proportion to their resistance."
          >
            <p>For resistors in parallel:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1/R<sub>T</sub> = 1/R₁ + 1/R₂ + 1/R₃ + …</li>
              <li>For two: R<sub>T</sub> = (R₁ × R₂) / (R₁ + R₂)</li>
              <li>Same voltage across every branch.</li>
              <li>Current through each: I<sub>n</sub> = V / R<sub>n</sub>.</li>
              <li>Sum of branch currents = supply current (KCL).</li>
            </ul>
          </ConceptBlock>

          <ParallelCircuit />

          <InlineCheck {...checks[1]} />

          <ConceptBlock
            title="Mixed networks — reduce, then expand"
            plainEnglish="For a mixed series/parallel network, simplify the parallel groups first, then treat the simplified network as series."
          >
            <p>
              Example: R₁ (10 Ω) in series with R₂ (6 Ω) which is in parallel with R₃ (12 Ω).
            </p>
            <p>
              Step 1 — simplify the parallel pair: R₂||R₃ = (6 × 12) / (6 + 12) = 72 / 18 = 4 Ω.
            </p>
            <p>Step 2 — add the series: R<sub>T</sub> = R₁ + 4 = 14 Ω.</p>
            <p>
              Now apply Ohm's Law to find total current. The voltage across the parallel pair is
              I × 4. The current then divides between R₂ and R₃ inversely with their resistance.
            </p>
          </ConceptBlock>

          <MixedCircuit />

          <SectionRule />

          <ContentEyebrow>Kirchhoff\'s laws</ContentEyebrow>

          <ConceptBlock
            title="KCL — junctions don\'t accumulate charge"
            plainEnglish="At any junction (node), the total current flowing in equals the total current flowing out. Electrons can\'t pile up indefinitely."
          >
            <p>
              <strong>Σ I<sub>in</sub> = Σ I<sub>out</sub></strong> (or algebraically: ΣI = 0,
              treating in and out as opposite signs).
            </p>
            <p>
              In a domestic ring final, the load current at any point splits between the two
              directions of the ring inversely with the resistance back to the source. Same KCL
              you\'d apply to any junction.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="KVL — energy is conserved around any loop"
            plainEnglish="Walk around any closed loop in a circuit and the total voltage change must equal zero. EMF rises (battery, transformer) plus IR drops (resistors) sum to nothing."
          >
            <p>
              <strong>Σ V around any closed loop = 0</strong>, or equivalently:{' '}
              <strong>Σ EMF rises = Σ IR drops</strong>.
            </p>
            <p>
              For a 12 V battery driving a series 4 Ω + 8 Ω circuit:
              <br />
              EMF = 12 V; IR drops = 4I + 8I = 12I. Set equal: 12 = 12I → I = 1 A.
              <br />
              V across 4 Ω = 4 V; V across 8 Ω = 8 V. Sum = 12 V = source. KVL satisfied.
            </p>
          </ConceptBlock>

          <KirchhoffVoltageLoop />

          <SectionRule />

          <ContentEyebrow>Power dissipation</ContentEyebrow>

          <ConceptBlock
            title="Three forms of the power equation"
            plainEnglish="P = VI is the basic. Substitute Ohm\'s Law (V = IR) and you get two more forms — useful when you only know two of the three quantities."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>P = V × I</strong> — when you know V and I.</li>
              <li><strong>P = I² × R</strong> — when you know I and R. (e.g. cable losses.)</li>
              <li><strong>P = V² / R</strong> — when you know V and R. (e.g. heater on fixed supply.)</li>
            </ul>
            <p>
              All three give the same answer if you\'ve got consistent values. Use the form whose
              variables you already have.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Voltage drop — Appendix 4</ContentEyebrow>

          <ConceptBlock
            title="The mV/A/m formula"
            plainEnglish="Manufacturers tabulate voltage drop per ampere per metre at 70 °C operation. Multiply by your design current and length, divide by 1000 (mV → V), and you have the volt drop."
          >
            <p>
              <strong>V<sub>drop</sub> = (mV/A/m × I<sub>b</sub> × L) / 1000</strong>
            </p>
            <p>
              Where:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>mV/A/m = from BS 7671 Appendix 4 Tables 4D1–4J4 (depends on cable type and CSA).</li>
              <li>I<sub>b</sub> = design current (A).</li>
              <li>L = length of run (m).</li>
              <li>÷ 1000 = converts mV to V.</li>
            </ul>
            <p>
              Worked example: 6 mm² T&E (mV/A/m = 7.3), 25 m run, 32 A design current.
              <br />
              V<sub>drop</sub> = (7.3 × 32 × 25) / 1000 = 5840 / 1000 = 5.84 V.
              <br />
              Limit at 3 % of 230 V = 6.9 V. 5.84 V &lt; 6.9 V → COMPLIANT.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 525 (Voltage drop in consumers' installations)"
            clause="In the absence of other considerations, in a consumer\'s installation, the voltage drop between the origin of the installation and any point shall not exceed 3 % of the nominal voltage for lighting circuits and 5 % for other uses."
            meaning={
              <>
                3 % of 230 V = 6.9 V for lighting; 5 % = 11.5 V for power. From the origin, not from
                the consumer unit — so add submain drop on big installs. Equipment manufacturers
                may impose tighter limits; comply with whichever is stricter.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 525.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 525.1 (Voltage at terminals)"
            clause="In the absence of any other consideration, under normal service conditions the voltage at the terminals of any fixed current-using equipment shall be greater than the lower limit corresponding to the product standard relevant to the equipment."
            meaning={
              <>
                The 3 %/5 % design limits exist so the equipment terminal voltage never falls
                below what the appliance's product standard allows. Calculate V<sub>drop</sub> end-
                to-end and confirm that V<sub>terminal</sub> = V<sub>nom</sub> − V<sub>drop</sub>
                still sits within the appliance's accepted range, otherwise motors stall, LED
                drivers flicker and contactors chatter.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 525.1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 525.202 (Voltage drop deemed to satisfy)"
            clause="The above requirements are deemed to be satisfied if the voltage drop between the origin of the installation (usually the supply terminals) and a socket-outlet or the terminals of fixed current-using equipment does not exceed that stated in Appendix 4, Section 6.4."
            meaning={
              <>
                The Appendix 4 §6.4 numbers (3 % lighting / 5 % other) are not arbitrary targets
                — they are the deemed-to-satisfy benchmark. Drop in mV/A/m × I × L / 1000
                converts the table value to volts; that's the calc you owe BS 7671 in any
                schedule of tests or design pack.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 525.202; Appendix 4 §6.4."
          />

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <CommonMistake
            title="Forgetting to convert mm² to m² in R = ρL/A"
            whatHappens={
              <>
                Sum says: 100 m of 2.5 mm² copper. R = (1.72 × 10⁻⁸ × 100) / 2.5 = 6.88 × 10⁻⁷ Ω.
                That\'s 0.688 microohms — clearly wrong. The CSA was treated as 2.5, not 2.5 ×
                10⁻⁶.
              </>
            }
            doInstead={
              <>
                Always convert: 1 mm² = 10⁻⁶ m². So 2.5 mm² = 2.5 × 10⁻⁶ m². Re-doing: R = (1.72 ×
                10⁻⁸ × 100) / (2.5 × 10⁻⁶) = 0.688 Ω. That\'s a sensible answer for a 100 m run.
              </>
            }
          />

          <Scenario
            title="Sizing a 6 mm² T&E sub-main with downstream final circuits"
            situation={
              <>
                You\'re feeding a garden room from the main DB. Sub-main is 6 mm² T&E, 30 m run,
                design current 25 A. The garden room sub-DB then feeds two final circuits — a
                lighting circuit at 6 A and a 16 A radial socket. You need to confirm the total
                voltage drop from main DB origin to the furthest socket meets the 5 % power limit.
              </>
            }
            whatToDo={
              <>
                Submain: V_drop = (7.3 × 25 × 30) / 1000 = 5.48 V.
                <br />
                Final 16 A radial in 2.5 mm² T&E (mV/A/m = 18), 15 m: V_drop = (18 × 16 × 15) /
                1000 = 4.32 V.
                <br />
                Total = 5.48 + 4.32 = 9.80 V.
                <br />
                Limit: 5 % × 230 V = 11.5 V. 9.80 V &lt; 11.5 V → COMPLIANT.
                <br />
                But: lighting limit is 3 % = 6.9 V. Sub-main alone is already 5.48 V; lighting
                circuit drop must be &lt; 1.42 V. Check: 1 mm² T&E (mV/A/m = 44), 6 A, 12 m =
                3.17 V → FAILS for lighting.
                <br />
                Solution: increase lighting cable to 1.5 mm² (mV/A/m = 29) → drop = 2.09 V → still
                fails. Either run the lighting back to the main DB, or upgrade the sub-main.
              </>
            }
            whyItMatters={
              <>
                Volt drop accumulates from the supply origin. Two compliant sections in series can
                still fail when summed. Always compute drop end-to-end, separately for the 3 %
                lighting limit and the 5 % power limit.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'R = ρL/A. Convert CSA from mm² to m² (× 10⁻⁶) before plugging in.',
              'Series resistances add; parallel resistances combine to less than the smallest.',
              "KCL: ΣI = 0 at every junction. KVL: ΣV = 0 around every loop.",
              'P = VI = I²R = V²/R. Pick the form whose variables you have.',
              'V_drop = (mV/A/m × I × L) / 1000. 3 % lighting, 5 % other; from supply origin.',
              'Volt drop accumulates — sum sub-main + final circuit and check both limits.',
            ]}
          />

          <Quiz title="Resistance and DC circuits knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section2-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                2.1 Electron theory and conductors
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section2-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.3 Magnetism and EMF generation
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
