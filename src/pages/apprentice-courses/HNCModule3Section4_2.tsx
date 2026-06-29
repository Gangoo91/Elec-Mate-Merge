/**
 * Module 3 · Section 4 · Subsection 2 — Line and Phase Voltage/Current Relationships
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   The &radic;3 factor in three-phase systems — line vs phase voltage and current
 *   in star and delta, BS EN 50160 supply tolerances, vector diagrams, and three-phase
 *   voltage-drop arithmetic for BSE distribution design.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Line and Phase Voltage/Current Relationships - HNC Module 3 Section 4.2';
const DESCRIPTION =
  'Master the mathematical relationships between line and phase quantities in three-phase systems, including UK supply voltages, vector diagrams, and practical measurements for building services.';

const quickCheckQuestions = [
  {
    id: 'star-voltage',
    question:
      'In a star-connected system, what is the relationship between line voltage (VL) and phase voltage (Vph)?',
    options: [
      'VL = Vph',
      'VL = Vph / √3',
      'VL = √3 × Vph',
      'VL = 2 × Vph',
    ],
    correctIndex: 2,
    explanation:
      'In star connection, line voltage is √3 (1.732) times the phase voltage. With UK 230V phase voltage: VL = 1.732 × 230V = 400V.',
  },
  {
    id: 'delta-current',
    question:
      'In a delta-connected system, what is the relationship between line current (IL) and phase current (Iph)?',
    options: [
      'IL = 3 × Iph',
      'IL = √3 × Iph',
      'IL = Iph / √3',
      'IL = Iph',
    ],
    correctIndex: 1,
    explanation:
      'In delta connection, line current is √3 (1.732) times the phase current. This is the inverse of the star voltage relationship.',
  },
  {
    id: 'uk-supply',
    question: 'What are the standard UK three-phase supply voltages?',
    options: [
      '380V line, 220V phase',
      '440V line, 254V phase',
      '415V line, 240V phase',
      '400V line, 230V phase',
    ],
    correctIndex: 3,
    explanation:
      'UK standard supply is 400V between lines and 230V phase-to-neutral (±10% tolerance). This was harmonised with European standards.',
  },
  {
    id: 'phase-sequence',
    question: 'What is the standard phase sequence for UK three-phase supplies?',
    options: [
      'L1-L3-L2',
      'R-Y-B',
      'L1-L2-L3',
      'A-B-C',
    ],
    correctIndex: 2,
    explanation:
      'UK standard phase sequence is L1-L2-L3 (formerly R-Y-B or Red-Yellow-Blue). Correct phase sequence is critical for motor rotation direction.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A star-connected load has a phase voltage of 230V. What is the line voltage?',
    options: [
      '133V',
      '400V',
      '230V',
      '690V',
    ],
    correctAnswer: 1,
    explanation: 'VL = √3 × Vph = 1.732 × 230V = 398.4V ≈ 400V',
  },
  {
    id: 2,
    question: 'In a delta connection, if the line voltage is 400V, what is the phase voltage?',
    options: [
      '690V',
      '133V',
      '400V',
      '230V',
    ],
    correctAnswer: 2,
    explanation:
      'In delta connection, VL = Vph. The line voltage equals the phase voltage, so Vph = 400V.',
  },
  {
    id: 3,
    question: 'A delta-connected motor draws 15A phase current. What is the line current?',
    options: [
      '15A',
      '8.7A',
      '45A',
      '26A',
    ],
    correctAnswer: 3,
    explanation: 'IL = √3 × Iph = 1.732 × 15A = 26A (rounded)',
  },
  {
    id: 4,
    question: 'What is the phase angle between consecutive phases in a three-phase system?',
    options: [
      '120°',
      '90°',
      '180°',
      '240°',
    ],
    correctAnswer: 0,
    explanation:
      'Three-phase systems have 120° phase displacement between each phase. This creates the rotating magnetic field essential for motors.',
  },
  {
    id: 5,
    question: 'A star-connected heater bank draws 40A line current. What is the phase current?',
    options: [
      '23.1A',
      '40A',
      '120A',
      '69.3A',
    ],
    correctAnswer: 1,
    explanation:
      'In star connection, IL = Iph. The line current equals the phase current, so Iph = 40A.',
  },
  {
    id: 6,
    question: 'Why is phase sequence important for three-phase motors?',
    options: [
      "It affects the motor's power factor",
      "It changes the motor's rated current",
      'It determines the direction of motor rotation',
      "It affects the motor's insulation class",
    ],
    correctAnswer: 2,
    explanation:
      'Phase sequence determines the direction of the rotating magnetic field, which controls motor rotation. Swapping any two phases reverses rotation.',
  },
  {
    id: 7,
    question:
      'A three-phase distribution board is fed at 400V. What voltage appears between a phase and neutral?',
    options: [
      '133V',
      '400V',
      '346V',
      '230V',
    ],
    correctAnswer: 3,
    explanation:
      'Vph = VL / √3 = 400V / 1.732 = 230.9V ≈ 230V. This is the UK single-phase supply voltage.',
  },
  {
    id: 8,
    question: 'For percentage voltage drop in three-phase circuits, which nominal voltage is used as the base?',
    options: [
      'The relevant nominal voltage for the load connection (230V or 400V)',
      'Always 230V regardless of the load connection',
      'Always 400V regardless of the load connection',
      'The measured supply voltage at the time of testing',
    ],
    correctAnswer: 0,
    explanation:
      'Use phase voltage (230V) for star-connected loads and line voltage (400V) for delta-connected loads in percentage calculations.',
  },
  {
    id: 9,
    question: 'What instrument is used to determine phase sequence?',
    options: [
      'Multimeter',
      'Phase rotation meter',
      'Clamp meter',
      'Oscilloscope only',
    ],
    correctAnswer: 1,
    explanation:
      "A phase rotation meter (phase sequence indicator) determines the rotation direction. It's essential before connecting three-phase motors.",
  },
  {
    id: 10,
    question: 'In a balanced three-phase system, what current flows in the neutral?',
    options: [
      'Full phase current',
      '√3 × phase current',
      'Zero',
      'Three times phase current',
    ],
    correctAnswer: 2,
    explanation:
      'In a balanced system, the three phase currents sum to zero (120° apart). Neutral current only flows when the system is unbalanced.',
  },
];

const faqs = [
  {
    question: 'Why is √3 (1.732) so important in three-phase calculations?',
    answer:
      '√3 arises from the 120° phase displacement between phases. When you calculate the vector sum or difference of two phasors 120° apart, the magnitude is √3 times the individual phasor. This is why VL = √3 × Vph in star and IL = √3 × Iph in delta connections.',
  },
  {
    question: 'How do I remember which relationship applies to star and which to delta?',
    answer:
      "Remember: 'Star Spreads Voltage' - in star, voltage spreads across phase and line (VL = √3 × Vph), while current stays the same (IL = Iph). Delta is the opposite: voltage stays the same (VL = Vph), current spreads (IL = √3 × Iph).",
  },
  {
    question: 'What happens if I connect a 230V rated motor to 400V line voltage?',
    answer:
      'The motor would receive 1.73 times its rated voltage, likely causing immediate damage from excessive current and overheating. Always check if equipment is rated for line voltage (400V) or phase voltage (230V) connection.',
  },
  {
    question: 'Why does the UK use 400V/230V instead of 415V/240V?',
    answer:
      'European voltage harmonisation in 1995 changed the UK nominal voltage from 415V/240V to 400V/230V. However, the tolerance bands (+10%/-6%) mean actual voltages overlap, so most equipment designed for either voltage range works fine.',
  },
  {
    question: "How do I measure phase voltage if there's no neutral available?",
    answer:
      'Without a neutral reference, you can only measure line-to-line voltages directly. To calculate phase voltage: Vph = VL ÷ √3. Alternatively, use a temporary artificial neutral point with three equal resistors in star.',
  },
  {
    question: 'What causes neutral current in a three-phase system?',
    answer:
      'Neutral current results from unbalanced loading - when the three phase currents are not equal. The neutral carries the vector sum of the unbalanced currents. In buildings with many single-phase loads, neutral sizing is critical.',
  },
];

const HNCModule3Section4_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 4 · Subsection 2"
            title="Line and Phase Voltage/Current Relationships"
            description="Mathematical relationships between line and phase quantities in star and delta configurations"
            tone="purple"
          />

          <TLDR
            points={[
              'You apply &radic;3 = 1.732 in every three-phase calculation — line voltage 400 V derives from 230 V phase voltage in a star secondary, and three-phase power adds the &radic;3 factor.',
              'You measure phase voltages (line-to-neutral) for single-phase loads and line voltages (line-to-line) for three-phase loads &mdash; never confuse the two on test sheets.',
              'You design to BS EN 50160 supply tolerances of 230 V +10 % / &minus;6 % (216&ndash;253 V) and account for them in voltage-drop budgets.',
              'You verify L1-L2-L3 phase sequence on every new three-phase circuit before motor energisation — a sequence indicator catches misconnection before mechanical damage.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 525.202 (Voltage drop)"
            clause="The above requirements are deemed to be satisfied if the voltage drop between the origin of the installation (usually the supply terminals) and a socket-outlet or the terminals of fixed current-using equipment does not exceed that stated in Appendix 4, Section 6.4."
            meaning={
              <>
                Voltage drop in three-phase circuits uses the formula V&#x1d05; = &radic;3
                &times; I &times; (R cos&phi; + X sin&phi;) &times; L &mdash; the &radic;3
                comes from the line-to-line measurement convention. As BSE designer you
                evidence compliance with Appendix 4 Section 6.4 limits (3 % for lighting,
                5 % for other uses on single-phase; 5 % cumulative on three-phase distribution
                + final). This calculation is your second-largest reason to know the &radic;3
                factor (the first being three-phase power).
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Reg 525.202 + Appendix 4 &sect;6.4; BS EN 50160 (supply voltage characteristics)"
          />

          <LearningOutcomes
            outcomes={[
              'Apply voltage and current relationships for star connections',
              'Apply voltage and current relationships for delta connections',
              'Understand UK three-phase supply voltages and tolerances',
              'Interpret vector diagrams showing phase relationships',
              'Determine and verify phase sequence (L1, L2, L3)',
              'Measure line and phase quantities correctly',
              'Calculate voltage drop in three-phase cables',
              'Understand distribution board voltage configurations',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="In 30 seconds"
            plainEnglish="Star spreads voltage by √3 (current the same); delta spreads current by √3 (voltage the same). UK supply: 400V line / 230V phase."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Star:</strong> V<sub>L</sub> = √3 × V<sub>ph</sub>, I<sub>L</sub> = I<sub>ph</sub></li>
              <li><strong>Delta:</strong> V<sub>L</sub> = V<sub>ph</sub>, I<sub>L</sub> = √3 × I<sub>ph</sub></li>
              <li><strong>UK supply:</strong> 400V line, 230V phase</li>
              <li><strong>Phase angle:</strong> 120° between phases</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Distribution:</strong> 400V between phases at DB</li>
              <li><strong>Single-phase:</strong> 230V phase-to-neutral loads</li>
              <li><strong>Motors:</strong> Phase sequence determines rotation</li>
              <li><strong>Cable sizing:</strong> Consider connection type</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Star (Wye) Connection Relationships">
            <p>
              In a star connection, the three windings or loads share a common neutral point.
              Current flows from each line through the phase winding to neutral, making line and
              phase currents identical.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Star Connection Formulae</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>V<sub>L</sub> = √3 × V<sub>ph</sub>:</strong> Line voltage is √3 times phase voltage</li>
              <li><strong>I<sub>L</sub> = I<sub>ph</sub>:</strong> Line current equals phase current</li>
            </ul>
            <p className="text-sm font-medium text-white">Key characteristics of star connection:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Neutral point available for single-phase loads</li>
              <li>Two voltage levels available: line (400V) and phase (230V)</li>
              <li>Phase windings subjected to lower voltage (V<sub>L</sub> ÷ √3)</li>
              <li>Most common for distribution systems</li>
              <li>Neutral carries unbalanced current only</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Star Connection Vector Diagram</p>
            <p>
              The three phase voltages are 120° apart. Line voltage is measured between any two
              phases and leads the corresponding phase voltage by 30°.
            </p>
            <p className="text-sm text-elec-yellow/70">
              <strong>Memory aid:</strong> In STAR, the current STAYS the same (I<sub>L</sub> = I
              <sub>ph</sub>), while voltage SPREADS (V<sub>L</sub> = √3 × V<sub>ph</sub>).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Delta (Mesh) Connection Relationships">
            <p>
              In a delta connection, windings are connected end-to-end forming a closed triangle.
              Each winding is connected directly across two lines, so phase voltage equals line
              voltage.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Delta Connection Formulae</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>V<sub>L</sub> = V<sub>ph</sub>:</strong> Line voltage equals phase voltage</li>
              <li><strong>I<sub>L</sub> = √3 × I<sub>ph</sub>:</strong> Line current is √3 times phase current</li>
            </ul>
            <p className="text-sm font-medium text-white">Key characteristics of delta connection:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>No neutral point available</li>
              <li>Only one voltage level (line voltage)</li>
              <li>Phase windings subjected to full line voltage</li>
              <li>Common for motors and transformers</li>
              <li>Can operate with one phase open (reduced capacity)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Delta Connection Vector Diagram</p>
            <p>
              In delta, line current is the vector difference of two phase currents. This gives I
              <sub>L</sub> = √3 × I<sub>ph</sub>.
            </p>
            <p className="text-sm text-elec-yellow/70">
              <strong>Memory aid:</strong> In DELTA, the voltage is DIRECT (V<sub>L</sub> = V
              <sub>ph</sub>), while current DIVIDES from the lines (I<sub>L</sub> = √3 × I
              <sub>ph</sub>).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="UK Supply: 400V Line, 230V Phase">
            <p>
              The UK public low voltage supply is a four-wire star-connected system. This provides
              both three-phase 400V for large loads and single-phase 230V for domestic and light
              commercial use.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">UK Supply Voltage Standards</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Line voltage (L-L):</strong> Nominal 400V, ±10% tolerance, range 360V - 440V</li>
              <li><strong>Phase voltage (L-N):</strong> Nominal 230V, +10% / -6% tolerance, range 216V - 253V</li>
              <li><strong>Frequency:</strong> Nominal 50Hz, ±1% tolerance, range 49.5Hz - 50.5Hz</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Voltage Relationship Verification</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>V<sub>L</sub> = √3 × V<sub>ph</sub></li>
              <li>400V = 1.732 × 230V</li>
              <li>400V = 398.4V ✓</li>
              <li>The small difference (1.6V) is within tolerance</li>
            </ul>
            <p className="text-sm font-medium text-white">Historical context:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Pre-1995:</strong> UK used 415V/240V (higher than continent)</li>
              <li><strong>1995 harmonisation:</strong> Changed to 400V/230V nominal</li>
              <li><strong>Overlap:</strong> Tolerance bands mean 240V still within range</li>
              <li><strong>Equipment:</strong> Most rated for 220-240V or 380-415V works fine</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Practical note:</strong> Despite harmonisation, UK supply voltages often
              measure around 240V phase due to the +10% tolerance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Vector Diagrams Showing Relationships">
            <p>
              Vector (phasor) diagrams are essential for understanding three-phase relationships.
              They show both magnitude and phase angle of voltages and currents.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Three-Phase Voltage Phasors</p>
            <p>
              Three-phase voltages with V_L1 at reference 0°, V_L2 at 120°, V_L3 at 240°.
              Rotation: anti-clockwise (positive sequence). Phase separation: 120°. Period: 20ms (at 50Hz).
            </p>
            <p className="text-sm font-medium text-white">Key vector diagram principles:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Length:</strong> Represents magnitude (voltage or current)</li>
              <li><strong>Angle:</strong> Represents phase relationship</li>
              <li><strong>Rotation:</strong> Anti-clockwise for positive sequence</li>
              <li><strong>Reference:</strong> Usually L1 at 0° (horizontal right)</li>
              <li><strong>Addition:</strong> Head-to-tail for series voltages</li>
              <li><strong>Subtraction:</strong> Reverse direction then add</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Deriving √3 from Vector Diagrams</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Line voltage V<sub>L1-L2</sub> = V<sub>L1</sub> - V<sub>L2</sub></li>
              <li>Using cosine rule for 120° angle:</li>
              <li>|V<sub>L</sub>|² = |V<sub>ph</sub>|² + |V<sub>ph</sub>|² - 2|V<sub>ph</sub>|²cos(120°)</li>
              <li>|V<sub>L</sub>|² = 2|V<sub>ph</sub>|² - 2|V<sub>ph</sub>|²(-0.5)</li>
              <li>|V<sub>L</sub>|² = 2|V<sub>ph</sub>|² + |V<sub>ph</sub>|² = 3|V<sub>ph</sub>|²</li>
              <li>Therefore: |V<sub>L</sub>| = √3 × |V<sub>ph</sub>|</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Exam tip:</strong> Practice drawing vector diagrams - they help visualise and
              solve three-phase problems.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Phase Sequence (L1, L2, L3)">
            <p>
              Phase sequence describes the order in which the three phases reach their maximum
              positive values. This is critical for rotating machinery and must be verified before
              connection.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Phase Sequence Naming</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>UK Modern:</strong> L1 (Brown), L2 (Black), L3 (Grey)</li>
              <li><strong>UK Old:</strong> R (Red), Y (Yellow), B (Blue)</li>
              <li><strong>International:</strong> A / U, B / V, C / W</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Positive Sequence (L1-L2-L3)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Standard UK supply sequence</li>
              <li>Motors rotate in designed direction</li>
              <li>Also called ABC or forward sequence</li>
              <li>Anti-clockwise phasor rotation</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Negative Sequence (L1-L3-L2)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Reversed sequence</li>
              <li>Motors rotate in reverse direction</li>
              <li>Also called ACB or reverse sequence</li>
              <li>Swap any two phases to reverse</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Critical Applications</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Motors:</strong> Wrong sequence reverses rotation (dangerous for pumps, fans)</li>
              <li><strong>Lifts:</strong> Phase sequence relays prevent reverse operation</li>
              <li><strong>Compressors:</strong> Reverse rotation can damage scroll compressors</li>
              <li><strong>Generators:</strong> Must match grid sequence for synchronisation</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Always verify:</strong> Use a phase rotation meter before connecting
              three-phase motors.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Measuring Line and Phase Quantities">
            <p>
              Accurate measurement of three-phase quantities requires understanding what you're
              measuring and where to connect test equipment.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Voltage Measurements</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Line voltage V<sub>L1-L2</sub>:</strong> L1 to L2 — Expected 400V ±10%</li>
              <li><strong>Line voltage V<sub>L2-L3</sub>:</strong> L2 to L3 — Expected 400V ±10%</li>
              <li><strong>Line voltage V<sub>L3-L1</sub>:</strong> L3 to L1 — Expected 400V ±10%</li>
              <li><strong>Phase voltage V<sub>L1-N</sub>:</strong> L1 to N — Expected 230V +10%/-6%</li>
              <li><strong>Phase voltage V<sub>L2-N</sub>:</strong> L2 to N — Expected 230V +10%/-6%</li>
              <li><strong>Phase voltage V<sub>L3-N</sub>:</strong> L3 to N — Expected 230V +10%/-6%</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Current Measurements</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Line current:</strong> Clamp meter around any line conductor</li>
              <li><strong>Neutral current:</strong> Clamp meter around neutral (ideally zero if balanced)</li>
              <li><strong>Phase current (delta):</strong> I<sub>ph</sub> = I<sub>L</sub> ÷ √3 (calculated)</li>
              <li><strong>Balance check:</strong> All three line currents should be within 10%</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Test Equipment Required</p>
            <p className="text-sm font-medium text-white">Voltage</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>True RMS multimeter (CAT III 600V min)</li>
              <li>Three-phase voltage tester</li>
              <li>Power quality analyser</li>
            </ul>
            <p className="text-sm font-medium text-white">Current</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Clamp meter (true RMS)</li>
              <li>Three-phase clamp meter</li>
              <li>Flexible current probes</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Safety:</strong> Always use test equipment rated for the voltage and
              prospective fault current of the system.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Voltage Drop in Three-Phase Cables">
            <p>
              Three-phase voltage drop calculations differ from single-phase due to the √3 factor
              and the need to consider both star and delta connected loads.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Three-Phase Voltage Drop Formula</p>
            <p>
              V<sub>d</sub> = √3 × I<sub>L</sub> × L × (r cos φ + x sin φ) — Or simplified: V<sub>d</sub> = √3 × I<sub>L</sub> × L × z
            </p>
            <p>
              Where: I<sub>L</sub> = line current, L = length (m), r = resistance (Ω/m), x =
              reactance (Ω/m). z = impedance per metre from BS 7671 tables (mV/A/m).
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Using BS 7671 Tables (Method 1)</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Voltage drop = (mV/A/m) × I<sub>b</sub> × L / 1000</li>
              <li>Tables give values for three-phase directly</li>
              <li>Example: 4mm² Cu, 25A, 30m, 29 mV/A/m (3-phase)</li>
              <li>V<sub>d</sub> = 29 × 25 × 30 / 1000 = <strong>21.75V</strong></li>
              <li>As percentage of 400V: 21.75/400 × 100 = <strong>5.4%</strong></li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">
              Maximum Voltage Drop Limits (BS 7671)
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Public supply:</strong> Lighting 3% (6.9V at 230V) — Other 5% (11.5V at 230V)</li>
              <li><strong>Private supply:</strong> Lighting 6% — Other 8%</li>
              <li><strong>Three-phase (400V):</strong> Lighting 12V max — Other 20V max</li>
            </ul>
            <p className="text-sm font-medium text-white">Important considerations:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Three-phase V<sub>d</sub> calculated as line-to-line voltage drop</li>
              <li>For star loads, phase V<sub>d</sub> = line V<sub>d</sub> ÷ √3</li>
              <li>Motor starting current (5-8× F.L.C.) causes temporary increased V<sub>d</sub></li>
              <li>Long sub-main runs may require larger cable for voltage drop</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Check voltage drop at both maximum load and motor
              starting conditions.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Building Services: Distribution Board Voltages">
            <p>
              Three-phase distribution boards in commercial and industrial buildings provide both
              line and phase voltages for different load types.
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">
              Typical Distribution Board Configuration
            </p>
            <p>
              DNO Supply (400V 3-phase + N) → Main Switchboard (400V 3-phase) → DB1, DB2, DB3 each
              feeding 3-ph motors (400V), 1-ph lighting (230V), 1-ph sockets (230V).
            </p>
            <p className="text-sm font-medium text-elec-yellow/80">Load Types and Voltages</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Small motors (&lt;2.2kW):</strong> 230V — Single-phase (L-N)</li>
              <li><strong>Large motors (&gt;2.2kW):</strong> 400V — Three-phase (L-L)</li>
              <li><strong>Lighting:</strong> 230V — Single-phase (L-N)</li>
              <li><strong>Socket outlets:</strong> 230V — Single-phase (L-N)</li>
              <li><strong>3-phase heaters:</strong> 400V — Delta or Star</li>
              <li><strong>HVAC chillers:</strong> 400V — Three-phase</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Phase Balancing</p>
            <p>
              Single-phase loads should be distributed evenly across the three phases to minimise
              neutral current and voltage unbalance.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Example - Office floor 45kW lighting load:</li>
              <li>L1: 15kW (65A) - West wing</li>
              <li>L2: 15kW (65A) - Central area</li>
              <li>L3: 15kW (65A) - East wing</li>
              <li>✓ Balanced - Neutral current ≈ 0A</li>
            </ul>
            <p className="text-sm font-medium text-white">Unbalance effects:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Neutral current:</strong> Unbalanced phases cause neutral current flow</li>
              <li><strong>Voltage unbalance:</strong> Lightly loaded phases rise in voltage</li>
              <li><strong>Motor heating:</strong> Unbalanced supply causes rotor heating</li>
              <li><strong>Maximum unbalance:</strong> Should not exceed 2% for sensitive equipment</li>
            </ul>
            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> When adding single-phase loads, check existing phase
              loadings and add to the least loaded phase.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">Example 1: Star Connection Calculations</p>
            <p>
              <strong>Question:</strong> A star-connected heater bank has each phase rated at
              230V, 10A. Calculate the line voltage and total power.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Given: V<sub>ph</sub> = 230V, I<sub>ph</sub> = 10A (star connection)</li>
              <li>Line voltage:</li>
              <li>V<sub>L</sub> = √3 × V<sub>ph</sub> = 1.732 × 230 = <strong>398V ≈ 400V</strong></li>
              <li>Line current (star: I<sub>L</sub> = I<sub>ph</sub>):</li>
              <li>I<sub>L</sub> = <strong>10A</strong></li>
              <li>Total power:</li>
              <li>P = √3 × V<sub>L</sub> × I<sub>L</sub> = 1.732 × 400 × 10 = <strong>6928W ≈ 6.9kW</strong></li>
              <li>Or: P = 3 × V<sub>ph</sub> × I<sub>ph</sub> = 3 × 230 × 10 = 6900W ✓</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 2: Delta Connection Calculations</p>
            <p>
              <strong>Question:</strong> A delta-connected motor draws 30A line current at 400V.
              Calculate the phase current and power (pf = 0.85).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Given: I<sub>L</sub> = 30A, V<sub>L</sub> = 400V, pf = 0.85 (delta)</li>
              <li>Phase voltage (delta: V<sub>ph</sub> = V<sub>L</sub>):</li>
              <li>V<sub>ph</sub> = <strong>400V</strong></li>
              <li>Phase current:</li>
              <li>I<sub>ph</sub> = I<sub>L</sub> / √3 = 30 / 1.732 = <strong>17.3A</strong></li>
              <li>Total power:</li>
              <li>P = √3 × V<sub>L</sub> × I<sub>L</sub> × pf</li>
              <li>P = 1.732 × 400 × 30 × 0.85 = <strong>17.6kW</strong></li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 3: Voltage Drop Calculation</p>
            <p>
              <strong>Question:</strong> A 15kW (pf 0.85) three-phase load is supplied by 50m of
              6mm² cable. Calculate line current and voltage drop. Table value: 6.4 mV/A/m
              (three-phase).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Line current:</li>
              <li>I<sub>L</sub> = P / (√3 × V<sub>L</sub> × pf) = 15000 / (1.732 × 400 × 0.85)</li>
              <li>I<sub>L</sub> = 15000 / 588.9 = <strong>25.5A</strong></li>
              <li>Voltage drop:</li>
              <li>V<sub>d</sub> = (mV/A/m × I<sub>b</sub> × L) / 1000</li>
              <li>V<sub>d</sub> = (6.4 × 25.5 × 50) / 1000 = <strong>8.16V</strong></li>
              <li>As percentage: (8.16 / 400) × 100 = <strong>2.04%</strong></li>
              <li>✓ Within 5% limit</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Example 4: Phase Balance Check</p>
            <p>
              <strong>Question:</strong> A three-phase DB shows: L1 = 45A, L2 = 52A, L3 = 48A.
              Calculate the neutral current and percentage unbalance.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Average current: (45 + 52 + 48) / 3 = <strong>48.3A</strong></li>
              <li>Maximum deviation: 52 - 48.3 = 3.7A</li>
              <li>Percentage unbalance: (3.7 / 48.3) × 100 = <strong>7.7%</strong></li>
              <li>Approximate neutral current (simplified):</li>
              <li>I<sub>N</sub> ≈ max difference = 52 - 45 = <strong>~7A</strong></li>
              <li>⚠ High unbalance - redistribute loads</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">Essential Formulae</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Star:</strong> V<sub>L</sub> = √3 × V<sub>ph</sub>, I<sub>L</sub> = I<sub>ph</sub></li>
              <li><strong>Delta:</strong> V<sub>L</sub> = V<sub>ph</sub>, I<sub>L</sub> = √3 × I<sub>ph</sub></li>
              <li><strong>Power:</strong> P = √3 × V<sub>L</sub> × I<sub>L</sub> × cos φ</li>
              <li><strong>V drop:</strong> V<sub>d</sub> = mV/A/m × I × L / 1000</li>
              <li><strong>√3 = 1.732</strong> (memorise this)</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Key Values to Remember</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>UK line voltage: <strong>400V</strong></li>
              <li>UK phase voltage: <strong>230V</strong></li>
              <li>Phase angle: <strong>120°</strong> apart</li>
              <li>Sequence: <strong>L1-L2-L3</strong> (positive)</li>
              <li>√3 factor: <strong>1.732</strong></li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common line/phase mistakes"
            whatHappens={
              <>
                Wrong formula — applying star formula to delta or vice versa. Voltage confusion —
                using 230V when 400V is needed (or vice versa). Forgetting power factor in motor
                calculations. Not checking phase sequence before motor connection. Using the
                wrong reference voltage when calculating percentage voltage drop.
              </>
            }
            doInstead={
              <>
                Identify connection type first, then apply correct formula. Match equipment
                voltage rating to supply (line vs phase). Always include cos φ in motor power.
                Verify sequence with a phase rotation meter before energising motors. Use the
                appropriate nominal voltage (230V or 400V) as the percentage base.
              </>
            }
          />

          <SectionRule />

          <Scenario
            title="Long submain run &mdash; voltage drop on a remote plantroom feed"
            situation={
              <>
                A 90 m three-phase submain feeds a roof plantroom MCC carrying 120 A
                continuous. The cable is 70 mm&sup2; XLPE/SWA copper with mV/A/m of 0.65
                (from BS 7671 Appendix 4 Table 4D2B). The site origin is at the LV
                switchroom; cumulative voltage drop budget for distribution + final is
                5 %.
              </>
            }
            whatToDo={
              <>
                Apply Vd = (mV/A/m &times; I &times; L) / 1000 = (0.65 &times; 120 &times;
                90) / 1000 = 7.02 V three-phase. Express as a percentage: 7.02 / 400 &times;
                100 = 1.76 %. Acceptable for the distribution leg (leaves 3.24 % for the
                final circuits). If the load was 200 A the drop would be 11.7 V (2.92 %)
                and you would consider upgrading to 95 mm&sup2; — always evidence the
                calculation in the design submission against Appendix 4 &sect;6.4.
              </>
            }
            whyItMatters={
              <>
                Voltage drop above the BS 7671 limits causes equipment to misoperate
                (motors run hot, lighting flickers under inrush, electronics trip on
                undervoltage) and breaches Appendix 4. Underspec&rsquo;d submains are
                expensive to retrofit because the conduit/tray runs are typically
                installed first and concealed.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Star: V&#x2097; = &radic;3 &times; V&#x209a; and I&#x2097; = I&#x209a;. UK 400 V line / 230 V phase.',
              'Delta: V&#x2097; = V&#x209a; and I&#x2097; = &radic;3 &times; I&#x209a;. Used for motor running and TX primaries.',
              '&radic;3 = 1.732 — appears in three-phase voltage, current, power and voltage-drop calculations.',
              'BS EN 50160: UK supply 230 V +10 % / &minus;6 % (216&ndash;253 V) and 400 V three-phase line correspondingly.',
              'BS 7671 Appendix 4 voltage-drop limits: 3 % for lighting, 5 % for other uses (single-phase); 5 % cumulative on three-phase distribution + final.',
              'Three-phase voltage drop: V&#x1d05; = &radic;3 &times; I &times; (R cos&phi; + X sin&phi;) &times; L &mdash; or simplified using mV/A/m tables.',
              'Phase sequence verification (sequence indicator) is mandatory before motor energisation — wrong rotation can damage pumps, fans, lifts.',
              'Phase voltage = line-to-neutral; line voltage = line-to-line — confusing the two is the commonest exam-board error and a real-site safety issue.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section4-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Star and Delta Configurations
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section4-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Three-Phase Power Calculations
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section4_2;
