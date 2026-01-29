import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Line and Phase Voltage/Current Relationships - HNC Module 3 Section 4.2";
const DESCRIPTION = "Master the mathematical relationships between line and phase quantities in three-phase systems, including UK supply voltages, vector diagrams, and practical measurements for building services.";

const quickCheckQuestions = [
  {
    id: "star-voltage",
    question: "In a star-connected system, what is the relationship between line voltage (VL) and phase voltage (Vph)?",
    options: ["VL = Vph", "VL = √3 × Vph", "VL = Vph / √3", "VL = 2 × Vph"],
    correctIndex: 1,
    explanation: "In star connection, line voltage is √3 (1.732) times the phase voltage. With UK 230V phase voltage: VL = 1.732 × 230V = 400V."
  },
  {
    id: "delta-current",
    question: "In a delta-connected system, what is the relationship between line current (IL) and phase current (Iph)?",
    options: ["IL = Iph", "IL = √3 × Iph", "IL = Iph / √3", "IL = 3 × Iph"],
    correctIndex: 1,
    explanation: "In delta connection, line current is √3 (1.732) times the phase current. This is the inverse of the star voltage relationship."
  },
  {
    id: "uk-supply",
    question: "What are the standard UK three-phase supply voltages?",
    options: ["380V line, 220V phase", "400V line, 230V phase", "415V line, 240V phase", "440V line, 254V phase"],
    correctIndex: 1,
    explanation: "UK standard supply is 400V between lines and 230V phase-to-neutral (±10% tolerance). This was harmonised with European standards."
  },
  {
    id: "phase-sequence",
    question: "What is the standard phase sequence for UK three-phase supplies?",
    options: ["L1-L3-L2", "L1-L2-L3", "R-Y-B", "A-B-C"],
    correctIndex: 1,
    explanation: "UK standard phase sequence is L1-L2-L3 (formerly R-Y-B or Red-Yellow-Blue). Correct phase sequence is critical for motor rotation direction."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A star-connected load has a phase voltage of 230V. What is the line voltage?",
    options: ["133V", "230V", "400V", "690V"],
    correctAnswer: 2,
    explanation: "VL = √3 × Vph = 1.732 × 230V = 398.4V ≈ 400V"
  },
  {
    id: 2,
    question: "In a delta connection, if the line voltage is 400V, what is the phase voltage?",
    options: ["133V", "230V", "400V", "690V"],
    correctAnswer: 2,
    explanation: "In delta connection, VL = Vph. The line voltage equals the phase voltage, so Vph = 400V."
  },
  {
    id: 3,
    question: "A delta-connected motor draws 15A phase current. What is the line current?",
    options: ["8.7A", "15A", "26A", "45A"],
    correctAnswer: 2,
    explanation: "IL = √3 × Iph = 1.732 × 15A = 26A (rounded)"
  },
  {
    id: 4,
    question: "What is the phase angle between consecutive phases in a three-phase system?",
    options: ["90°", "120°", "180°", "240°"],
    correctAnswer: 1,
    explanation: "Three-phase systems have 120° phase displacement between each phase. This creates the rotating magnetic field essential for motors."
  },
  {
    id: 5,
    question: "A star-connected heater bank draws 40A line current. What is the phase current?",
    options: ["23.1A", "40A", "69.3A", "120A"],
    correctAnswer: 1,
    explanation: "In star connection, IL = Iph. The line current equals the phase current, so Iph = 40A."
  },
  {
    id: 6,
    question: "Why is phase sequence important for three-phase motors?",
    options: [
      "It affects the motor's power factor",
      "It determines the direction of motor rotation",
      "It changes the motor's rated current",
      "It affects the motor's insulation class"
    ],
    correctAnswer: 1,
    explanation: "Phase sequence determines the direction of the rotating magnetic field, which controls motor rotation. Swapping any two phases reverses rotation."
  },
  {
    id: 7,
    question: "A three-phase distribution board is fed at 400V. What voltage appears between a phase and neutral?",
    options: ["133V", "230V", "346V", "400V"],
    correctAnswer: 1,
    explanation: "Vph = VL / √3 = 400V / 1.732 = 230.9V ≈ 230V. This is the UK single-phase supply voltage."
  },
  {
    id: 8,
    question: "For voltage drop calculations in three-phase cables, which voltage is used?",
    options: ["Phase voltage only", "Line voltage only", "Both, depending on the load connection", "Neither - use current only"],
    correctAnswer: 2,
    explanation: "Use phase voltage (230V) for star-connected loads and line voltage (400V) for delta-connected loads in percentage calculations."
  },
  {
    id: 9,
    question: "What instrument is used to determine phase sequence?",
    options: ["Multimeter", "Clamp meter", "Phase rotation meter", "Oscilloscope only"],
    correctAnswer: 2,
    explanation: "A phase rotation meter (phase sequence indicator) determines the rotation direction. It's essential before connecting three-phase motors."
  },
  {
    id: 10,
    question: "In a balanced three-phase system, what current flows in the neutral?",
    options: ["Full phase current", "√3 × phase current", "Zero", "Three times phase current"],
    correctAnswer: 2,
    explanation: "In a balanced system, the three phase currents sum to zero (120° apart). Neutral current only flows when the system is unbalanced."
  }
];

const faqs = [
  {
    question: "Why is √3 (1.732) so important in three-phase calculations?",
    answer: "√3 arises from the 120° phase displacement between phases. When you calculate the vector sum or difference of two phasors 120° apart, the magnitude is √3 times the individual phasor. This is why VL = √3 × Vph in star and IL = √3 × Iph in delta connections."
  },
  {
    question: "How do I remember which relationship applies to star and which to delta?",
    answer: "Remember: 'Star Spreads Voltage' - in star, voltage spreads across phase and line (VL = √3 × Vph), while current stays the same (IL = Iph). Delta is the opposite: voltage stays the same (VL = Vph), current spreads (IL = √3 × Iph)."
  },
  {
    question: "What happens if I connect a 230V rated motor to 400V line voltage?",
    answer: "The motor would receive 1.73 times its rated voltage, likely causing immediate damage from excessive current and overheating. Always check if equipment is rated for line voltage (400V) or phase voltage (230V) connection."
  },
  {
    question: "Why does the UK use 400V/230V instead of 415V/240V?",
    answer: "European voltage harmonisation in 1995 changed the UK nominal voltage from 415V/240V to 400V/230V. However, the tolerance bands (+10%/-6%) mean actual voltages overlap, so most equipment designed for either voltage range works fine."
  },
  {
    question: "How do I measure phase voltage if there's no neutral available?",
    answer: "Without a neutral reference, you can only measure line-to-line voltages directly. To calculate phase voltage: Vph = VL ÷ √3. Alternatively, use a temporary artificial neutral point with three equal resistors in star."
  },
  {
    question: "What causes neutral current in a three-phase system?",
    answer: "Neutral current results from unbalanced loading - when the three phase currents are not equal. The neutral carries the vector sum of the unbalanced currents. In buildings with many single-phase loads, neutral sizing is critical."
  }
];

const HNCModule3Section4_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Line and Phase Voltage/Current Relationships
          </h1>
          <p className="text-white/80">
            Mathematical relationships between line and phase quantities in star and delta configurations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Star:</strong> V<sub>L</sub> = √3 × V<sub>ph</sub>, I<sub>L</sub> = I<sub>ph</sub></li>
              <li className="pl-1"><strong>Delta:</strong> V<sub>L</sub> = V<sub>ph</sub>, I<sub>L</sub> = √3 × I<sub>ph</sub></li>
              <li className="pl-1"><strong>UK supply:</strong> 400V line, 230V phase</li>
              <li className="pl-1"><strong>Phase angle:</strong> 120° between phases</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Distribution:</strong> 400V between phases at DB</li>
              <li className="pl-1"><strong>Single-phase:</strong> 230V phase-to-neutral loads</li>
              <li className="pl-1"><strong>Motors:</strong> Phase sequence determines rotation</li>
              <li className="pl-1"><strong>Cable sizing:</strong> Consider connection type</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply voltage and current relationships for star connections",
              "Apply voltage and current relationships for delta connections",
              "Understand UK three-phase supply voltages and tolerances",
              "Interpret vector diagrams showing phase relationships",
              "Determine and verify phase sequence (L1, L2, L3)",
              "Measure line and phase quantities correctly",
              "Calculate voltage drop in three-phase cables",
              "Understand distribution board voltage configurations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Star Connection Relationships */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Star (Wye) Connection Relationships
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In a star connection, the three windings or loads share a common neutral point. Current flows
              from each line through the phase winding to neutral, making line and phase currents identical.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Star Connection Formulae</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-black/30 text-center">
                  <p className="font-bold text-elec-yellow text-lg mb-1">V<sub>L</sub> = √3 × V<sub>ph</sub></p>
                  <p className="text-white/70 text-xs">Line voltage is √3 times phase voltage</p>
                </div>
                <div className="p-3 rounded bg-black/30 text-center">
                  <p className="font-bold text-elec-yellow text-lg mb-1">I<sub>L</sub> = I<sub>ph</sub></p>
                  <p className="text-white/70 text-xs">Line current equals phase current</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key characteristics of star connection:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Neutral point available for single-phase loads</li>
                <li className="pl-1">Two voltage levels available: line (400V) and phase (230V)</li>
                <li className="pl-1">Phase windings subjected to lower voltage (V<sub>L</sub> ÷ √3)</li>
                <li className="pl-1">Most common for distribution systems</li>
                <li className="pl-1">Neutral carries unbalanced current only</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Star Connection Vector Diagram</p>
              <div className="p-4 rounded-lg bg-black/30">
                <pre className="text-xs sm:text-sm text-white/90 font-mono whitespace-pre overflow-x-auto">
{`                    V_L1 (0°)
                       ↑
                       |
                       |  V_ph
                       |
            ─ ─ ─ ─ ─ ─●─ ─ ─ ─ ─ ─
                      N│
                      /│\\
                     / │ \\
                    /  │  \\
                   /   │   \\
              V_L3    V_ph   V_L2
             (240°)        (120°)

    Line voltages (V_L) are √3 larger
    and 30° displaced from phase voltages`}
                </pre>
              </div>
              <p className="text-xs text-white/60 mt-2">
                The three phase voltages are 120° apart. Line voltage is measured between any two phases
                and leads the corresponding phase voltage by 30°.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Memory aid:</strong> In STAR, the current STAYS the same (I<sub>L</sub> = I<sub>ph</sub>),
              while voltage SPREADS (V<sub>L</sub> = √3 × V<sub>ph</sub>).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Delta Connection Relationships */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Delta (Mesh) Connection Relationships
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In a delta connection, windings are connected end-to-end forming a closed triangle.
              Each winding is connected directly across two lines, so phase voltage equals line voltage.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Delta Connection Formulae</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-black/30 text-center">
                  <p className="font-bold text-elec-yellow text-lg mb-1">V<sub>L</sub> = V<sub>ph</sub></p>
                  <p className="text-white/70 text-xs">Line voltage equals phase voltage</p>
                </div>
                <div className="p-3 rounded bg-black/30 text-center">
                  <p className="font-bold text-elec-yellow text-lg mb-1">I<sub>L</sub> = √3 × I<sub>ph</sub></p>
                  <p className="text-white/70 text-xs">Line current is √3 times phase current</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key characteristics of delta connection:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">No neutral point available</li>
                <li className="pl-1">Only one voltage level (line voltage)</li>
                <li className="pl-1">Phase windings subjected to full line voltage</li>
                <li className="pl-1">Common for motors and transformers</li>
                <li className="pl-1">Can operate with one phase open (reduced capacity)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Delta Connection Vector Diagram</p>
              <div className="p-4 rounded-lg bg-black/30">
                <pre className="text-xs sm:text-sm text-white/90 font-mono whitespace-pre overflow-x-auto">
{`                    L1
                     ●
                    /│\\
                   / │ \\
             V_ph/  │  \\V_ph
                /   │   \\
               /    │I_L1\\
          L3  ●─────┼─────● L2
                 V_ph

    I_L1 = I_ph(L1-L2) - I_ph(L3-L1)

    Line currents are √3 larger
    and 30° displaced from phase currents`}
                </pre>
              </div>
              <p className="text-xs text-white/60 mt-2">
                In delta, line current is the vector difference of two phase currents.
                This gives I<sub>L</sub> = √3 × I<sub>ph</sub>.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Memory aid:</strong> In DELTA, the voltage is DIRECT (V<sub>L</sub> = V<sub>ph</sub>),
              while current DIVIDES from the lines (I<sub>L</sub> = √3 × I<sub>ph</sub>).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: UK Supply Voltages */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            UK Supply: 400V Line, 230V Phase
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The UK public low voltage supply is a four-wire star-connected system.
              This provides both three-phase 400V for large loads and single-phase 230V for domestic and light commercial use.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">UK Supply Voltage Standards</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Measurement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Nominal</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Tolerance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Line voltage (L-L)</td>
                      <td className="border border-white/10 px-3 py-2">400V</td>
                      <td className="border border-white/10 px-3 py-2">±10%</td>
                      <td className="border border-white/10 px-3 py-2">360V - 440V</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phase voltage (L-N)</td>
                      <td className="border border-white/10 px-3 py-2">230V</td>
                      <td className="border border-white/10 px-3 py-2">+10% / -6%</td>
                      <td className="border border-white/10 px-3 py-2">216V - 253V</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Frequency</td>
                      <td className="border border-white/10 px-3 py-2">50Hz</td>
                      <td className="border border-white/10 px-3 py-2">±1%</td>
                      <td className="border border-white/10 px-3 py-2">49.5Hz - 50.5Hz</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Relationship Verification</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>V<sub>L</sub> = √3 × V<sub>ph</sub></p>
                <p className="mt-2">400V = 1.732 × 230V</p>
                <p>400V = 398.4V ✓</p>
                <p className="mt-2 text-white/60">The small difference (1.6V) is within tolerance</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Historical context:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Pre-1995:</strong> UK used 415V/240V (higher than continent)</li>
                <li className="pl-1"><strong>1995 harmonisation:</strong> Changed to 400V/230V nominal</li>
                <li className="pl-1"><strong>Overlap:</strong> Tolerance bands mean 240V still within range</li>
                <li className="pl-1"><strong>Equipment:</strong> Most rated for 220-240V or 380-415V works fine</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical note:</strong> Despite harmonisation, UK supply voltages often measure around 240V phase due to the +10% tolerance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Vector Diagrams */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Vector Diagrams Showing Relationships
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Vector (phasor) diagrams are essential for understanding three-phase relationships.
              They show both magnitude and phase angle of voltages and currents.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Three-Phase Voltage Phasors</p>
              <div className="p-4 rounded-lg bg-black/30">
                <pre className="text-xs sm:text-sm text-white/90 font-mono whitespace-pre overflow-x-auto">
{`                     V_L1 (Reference 0°)
                         ↑
                         │
                         │
                         │
    V_L3 (240°) ←────────┼────────→
                         │
                        ╱ ╲
                       ╱   ╲
                      ╱     ╲
                     ↙       ↘
               V_L2 (120°)

    Rotation: Anti-clockwise (positive sequence)
    Phase separation: 120°
    Period: 20ms (at 50Hz)`}
                </pre>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key vector diagram principles:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Length:</strong> Represents magnitude (voltage or current)</li>
                <li className="pl-1"><strong>Angle:</strong> Represents phase relationship</li>
                <li className="pl-1"><strong>Rotation:</strong> Anti-clockwise for positive sequence</li>
                <li className="pl-1"><strong>Reference:</strong> Usually L1 at 0° (horizontal right)</li>
                <li className="pl-1"><strong>Addition:</strong> Head-to-tail for series voltages</li>
                <li className="pl-1"><strong>Subtraction:</strong> Reverse direction then add</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Deriving √3 from Vector Diagrams</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Line voltage V<sub>L1-L2</sub> = V<sub>L1</sub> - V<sub>L2</sub></p>
                <p className="mt-2">Using cosine rule for 120° angle:</p>
                <p>|V<sub>L</sub>|² = |V<sub>ph</sub>|² + |V<sub>ph</sub>|² - 2|V<sub>ph</sub>|²cos(120°)</p>
                <p>|V<sub>L</sub>|² = 2|V<sub>ph</sub>|² - 2|V<sub>ph</sub>|²(-0.5)</p>
                <p>|V<sub>L</sub>|² = 2|V<sub>ph</sub>|² + |V<sub>ph</sub>|² = 3|V<sub>ph</sub>|²</p>
                <p className="mt-2">Therefore: |V<sub>L</sub>| = √3 × |V<sub>ph</sub>|</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Exam tip:</strong> Practice drawing vector diagrams - they help visualise and solve three-phase problems.
            </p>
          </div>
        </section>

        {/* Section 5: Phase Sequence */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Phase Sequence (L1, L2, L3)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Phase sequence describes the order in which the three phases reach their maximum positive values.
              This is critical for rotating machinery and must be verified before connection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Phase Sequence Naming</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Phase 1</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Phase 2</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Phase 3</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UK Modern</td>
                      <td className="border border-white/10 px-3 py-2">L1 (Brown)</td>
                      <td className="border border-white/10 px-3 py-2">L2 (Black)</td>
                      <td className="border border-white/10 px-3 py-2">L3 (Grey)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">UK Old</td>
                      <td className="border border-white/10 px-3 py-2">R (Red)</td>
                      <td className="border border-white/10 px-3 py-2">Y (Yellow)</td>
                      <td className="border border-white/10 px-3 py-2">B (Blue)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">International</td>
                      <td className="border border-white/10 px-3 py-2">A / U</td>
                      <td className="border border-white/10 px-3 py-2">B / V</td>
                      <td className="border border-white/10 px-3 py-2">C / W</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Positive Sequence (L1-L2-L3)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Standard UK supply sequence</li>
                  <li className="pl-1">Motors rotate in designed direction</li>
                  <li className="pl-1">Also called ABC or forward sequence</li>
                  <li className="pl-1">Anti-clockwise phasor rotation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Negative Sequence (L1-L3-L2)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Reversed sequence</li>
                  <li className="pl-1">Motors rotate in reverse direction</li>
                  <li className="pl-1">Also called ACB or reverse sequence</li>
                  <li className="pl-1">Swap any two phases to reverse</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-300 mb-2">Critical Applications</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Motors:</strong> Wrong sequence reverses rotation (dangerous for pumps, fans)</li>
                <li className="pl-1"><strong>Lifts:</strong> Phase sequence relays prevent reverse operation</li>
                <li className="pl-1"><strong>Compressors:</strong> Reverse rotation can damage scroll compressors</li>
                <li className="pl-1"><strong>Generators:</strong> Must match grid sequence for synchronisation</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Always verify:</strong> Use a phase rotation meter before connecting three-phase motors.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 6: Measuring Line and Phase Quantities */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Measuring Line and Phase Quantities
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Accurate measurement of three-phase quantities requires understanding what you're measuring
              and where to connect test equipment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Measurements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Measurement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Connection</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Expected (UK)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Line voltage V<sub>L1-L2</sub></td>
                      <td className="border border-white/10 px-3 py-2">L1 to L2</td>
                      <td className="border border-white/10 px-3 py-2">400V ±10%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Line voltage V<sub>L2-L3</sub></td>
                      <td className="border border-white/10 px-3 py-2">L2 to L3</td>
                      <td className="border border-white/10 px-3 py-2">400V ±10%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Line voltage V<sub>L3-L1</sub></td>
                      <td className="border border-white/10 px-3 py-2">L3 to L1</td>
                      <td className="border border-white/10 px-3 py-2">400V ±10%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phase voltage V<sub>L1-N</sub></td>
                      <td className="border border-white/10 px-3 py-2">L1 to N</td>
                      <td className="border border-white/10 px-3 py-2">230V +10%/-6%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phase voltage V<sub>L2-N</sub></td>
                      <td className="border border-white/10 px-3 py-2">L2 to N</td>
                      <td className="border border-white/10 px-3 py-2">230V +10%/-6%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phase voltage V<sub>L3-N</sub></td>
                      <td className="border border-white/10 px-3 py-2">L3 to N</td>
                      <td className="border border-white/10 px-3 py-2">230V +10%/-6%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Current Measurements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Line current:</strong> Clamp meter around any line conductor</li>
                <li className="pl-1"><strong>Neutral current:</strong> Clamp meter around neutral (ideally zero if balanced)</li>
                <li className="pl-1"><strong>Phase current (delta):</strong> I<sub>ph</sub> = I<sub>L</sub> ÷ √3 (calculated)</li>
                <li className="pl-1"><strong>Balance check:</strong> All three line currents should be within 10%</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Equipment Required</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-1">Voltage</p>
                  <ul className="text-white/80 space-y-0.5">
                    <li>• True RMS multimeter (CAT III 600V min)</li>
                    <li>• Three-phase voltage tester</li>
                    <li>• Power quality analyser</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-1">Current</p>
                  <ul className="text-white/80 space-y-0.5">
                    <li>• Clamp meter (true RMS)</li>
                    <li>• Three-phase clamp meter</li>
                    <li>• Flexible current probes</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Safety:</strong> Always use test equipment rated for the voltage and prospective fault current of the system.
            </p>
          </div>
        </section>

        {/* Section 7: Voltage Drop in Three-Phase Cables */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Voltage Drop in Three-Phase Cables
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Three-phase voltage drop calculations differ from single-phase due to the √3 factor
              and the need to consider both star and delta connected loads.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Three-Phase Voltage Drop Formula</p>
              <div className="p-3 rounded bg-black/30 text-center">
                <p className="font-bold text-elec-yellow text-lg mb-1">V<sub>d</sub> = √3 × I<sub>L</sub> × L × (r cos φ + x sin φ)</p>
                <p className="text-white/70 text-xs mt-2">Or simplified: V<sub>d</sub> = √3 × I<sub>L</sub> × L × z</p>
              </div>
              <div className="text-xs text-white/70 mt-3 space-y-1">
                <p>Where: I<sub>L</sub> = line current, L = length (m), r = resistance (Ω/m), x = reactance (Ω/m)</p>
                <p>z = impedance per metre from BS 7671 tables (mV/A/m)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Using BS 7671 Tables (Method 1)</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Voltage drop = (mV/A/m) × I<sub>b</sub> × L / 1000</p>
                <p className="mt-2 text-white/60">Tables give values for three-phase directly</p>
                <p className="mt-2">Example: 4mm² Cu, 25A, 30m, 29 mV/A/m (3-phase)</p>
                <p>V<sub>d</sub> = 29 × 25 × 30 / 1000 = <strong>21.75V</strong></p>
                <p className="mt-2">As percentage of 400V: 21.75/400 × 100 = <strong>5.4%</strong></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maximum Voltage Drop Limits (BS 7671)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Circuit Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Lighting</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Other</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Public supply</td>
                      <td className="border border-white/10 px-3 py-2">3% (6.9V at 230V)</td>
                      <td className="border border-white/10 px-3 py-2">5% (11.5V at 230V)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Private supply</td>
                      <td className="border border-white/10 px-3 py-2">6%</td>
                      <td className="border border-white/10 px-3 py-2">8%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-white/70">Three-phase (400V)</td>
                      <td className="border border-white/10 px-3 py-2 text-white/70">12V max</td>
                      <td className="border border-white/10 px-3 py-2 text-white/70">20V max</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Important considerations:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Three-phase V<sub>d</sub> calculated as line-to-line voltage drop</li>
                <li className="pl-1">For star loads, phase V<sub>d</sub> = line V<sub>d</sub> ÷ √3</li>
                <li className="pl-1">Motor starting current (5-8× F.L.C.) causes temporary increased V<sub>d</sub></li>
                <li className="pl-1">Long sub-main runs may require larger cable for voltage drop</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Check voltage drop at both maximum load and motor starting conditions.
            </p>
          </div>
        </section>

        {/* Section 8: Building Services Distribution Board Voltages */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Building Services: Distribution Board Voltages
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Three-phase distribution boards in commercial and industrial buildings provide both line
              and phase voltages for different load types.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Distribution Board Configuration</p>
              <div className="p-4 rounded-lg bg-black/30">
                <pre className="text-xs sm:text-sm text-white/90 font-mono whitespace-pre overflow-x-auto">
{`    DNO Supply (400V 3-phase + N)
              │
              ▼
    ┌─────────────────────┐
    │   Main Switchboard  │
    │    400V 3-phase     │
    └─────────────────────┘
              │
     ┌────────┼────────┐
     │        │        │
     ▼        ▼        ▼
  ┌─────┐  ┌─────┐  ┌─────┐
  │ DB1 │  │ DB2 │  │ DB3 │
  │400V │  │400V │  │400V │
  └─────┘  └─────┘  └─────┘
     │        │        │
   3-ph     1-ph     1-ph
  Motors  Lighting  Sockets
  (400V)   (230V)   (230V)`}
                </pre>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load Types and Voltages</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Load Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Connection</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small motors (&lt;2.2kW)</td>
                      <td className="border border-white/10 px-3 py-2">230V</td>
                      <td className="border border-white/10 px-3 py-2">Single-phase (L-N)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Large motors (&gt;2.2kW)</td>
                      <td className="border border-white/10 px-3 py-2">400V</td>
                      <td className="border border-white/10 px-3 py-2">Three-phase (L-L)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lighting</td>
                      <td className="border border-white/10 px-3 py-2">230V</td>
                      <td className="border border-white/10 px-3 py-2">Single-phase (L-N)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Socket outlets</td>
                      <td className="border border-white/10 px-3 py-2">230V</td>
                      <td className="border border-white/10 px-3 py-2">Single-phase (L-N)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3-phase heaters</td>
                      <td className="border border-white/10 px-3 py-2">400V</td>
                      <td className="border border-white/10 px-3 py-2">Delta or Star</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">HVAC chillers</td>
                      <td className="border border-white/10 px-3 py-2">400V</td>
                      <td className="border border-white/10 px-3 py-2">Three-phase</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Phase Balancing</p>
              <p className="text-sm text-white mb-3">
                Single-phase loads should be distributed evenly across the three phases to minimise neutral current
                and voltage unbalance.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Example - Office floor 45kW lighting load:</p>
                <p className="mt-2">L1: 15kW (65A) - West wing</p>
                <p>L2: 15kW (65A) - Central area</p>
                <p>L3: 15kW (65A) - East wing</p>
                <p className="mt-2 text-green-400">✓ Balanced - Neutral current ≈ 0A</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Unbalance effects:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Neutral current:</strong> Unbalanced phases cause neutral current flow</li>
                <li className="pl-1"><strong>Voltage unbalance:</strong> Lightly loaded phases rise in voltage</li>
                <li className="pl-1"><strong>Motor heating:</strong> Unbalanced supply causes rotor heating</li>
                <li className="pl-1"><strong>Maximum unbalance:</strong> Should not exceed 2% for sensitive equipment</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> When adding single-phase loads, check existing phase loadings and add to the least loaded phase.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Star Connection Calculations</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A star-connected heater bank has each phase rated at 230V, 10A.
                Calculate the line voltage and total power.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given: V<sub>ph</sub> = 230V, I<sub>ph</sub> = 10A (star connection)</p>
                <p className="mt-2">Line voltage:</p>
                <p>V<sub>L</sub> = √3 × V<sub>ph</sub> = 1.732 × 230 = <strong>398V ≈ 400V</strong></p>
                <p className="mt-2">Line current (star: I<sub>L</sub> = I<sub>ph</sub>):</p>
                <p>I<sub>L</sub> = <strong>10A</strong></p>
                <p className="mt-2">Total power:</p>
                <p>P = √3 × V<sub>L</sub> × I<sub>L</sub> = 1.732 × 400 × 10 = <strong>6928W ≈ 6.9kW</strong></p>
                <p className="mt-2 text-white/60">Or: P = 3 × V<sub>ph</sub> × I<sub>ph</sub> = 3 × 230 × 10 = 6900W ✓</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Delta Connection Calculations</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A delta-connected motor draws 30A line current at 400V.
                Calculate the phase current and power (pf = 0.85).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given: I<sub>L</sub> = 30A, V<sub>L</sub> = 400V, pf = 0.85 (delta)</p>
                <p className="mt-2">Phase voltage (delta: V<sub>ph</sub> = V<sub>L</sub>):</p>
                <p>V<sub>ph</sub> = <strong>400V</strong></p>
                <p className="mt-2">Phase current:</p>
                <p>I<sub>ph</sub> = I<sub>L</sub> / √3 = 30 / 1.732 = <strong>17.3A</strong></p>
                <p className="mt-2">Total power:</p>
                <p>P = √3 × V<sub>L</sub> × I<sub>L</sub> × pf</p>
                <p>P = 1.732 × 400 × 30 × 0.85 = <strong>17.6kW</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Voltage Drop Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 15kW (pf 0.85) three-phase load is supplied by 50m of 6mm² cable.
                Calculate line current and voltage drop. Table value: 6.4 mV/A/m (three-phase).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Line current:</p>
                <p>I<sub>L</sub> = P / (√3 × V<sub>L</sub> × pf) = 15000 / (1.732 × 400 × 0.85)</p>
                <p>I<sub>L</sub> = 15000 / 588.9 = <strong>25.5A</strong></p>
                <p className="mt-2">Voltage drop:</p>
                <p>V<sub>d</sub> = (mV/A/m × I<sub>b</sub> × L) / 1000</p>
                <p>V<sub>d</sub> = (6.4 × 25.5 × 50) / 1000 = <strong>8.16V</strong></p>
                <p className="mt-2">As percentage: (8.16 / 400) × 100 = <strong>2.04%</strong></p>
                <p className="mt-2 text-green-400">✓ Within 5% limit</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Phase Balance Check</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A three-phase DB shows: L1 = 45A, L2 = 52A, L3 = 48A.
                Calculate the neutral current and percentage unbalance.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Average current: (45 + 52 + 48) / 3 = <strong>48.3A</strong></p>
                <p className="mt-2">Maximum deviation: 52 - 48.3 = 3.7A</p>
                <p>Percentage unbalance: (3.7 / 48.3) × 100 = <strong>7.7%</strong></p>
                <p className="mt-2">Approximate neutral current (simplified):</p>
                <p>I<sub>N</sub> ≈ max difference = 52 - 45 = <strong>~7A</strong></p>
                <p className="mt-2 text-orange-300">⚠ High unbalance - redistribute loads</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulae</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Star:</strong> V<sub>L</sub> = √3 × V<sub>ph</sub>, I<sub>L</sub> = I<sub>ph</sub></li>
                <li className="pl-1"><strong>Delta:</strong> V<sub>L</sub> = V<sub>ph</sub>, I<sub>L</sub> = √3 × I<sub>ph</sub></li>
                <li className="pl-1"><strong>Power:</strong> P = √3 × V<sub>L</sub> × I<sub>L</sub> × cos φ</li>
                <li className="pl-1"><strong>V drop:</strong> V<sub>d</sub> = mV/A/m × I × L / 1000</li>
                <li className="pl-1"><strong>√3 = 1.732</strong> (memorise this)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">UK line voltage: <strong>400V</strong></li>
                <li className="pl-1">UK phase voltage: <strong>230V</strong></li>
                <li className="pl-1">Phase angle: <strong>120°</strong> apart</li>
                <li className="pl-1">Sequence: <strong>L1-L2-L3</strong> (positive)</li>
                <li className="pl-1">√3 factor: <strong>1.732</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Wrong formula:</strong> Applying star formula to delta or vice versa</li>
                <li className="pl-1"><strong>Voltage confusion:</strong> Using 230V when 400V is needed (or vice versa)</li>
                <li className="pl-1"><strong>Forgetting pf:</strong> Motor calculations need power factor</li>
                <li className="pl-1"><strong>Phase sequence:</strong> Not checking before motor connection</li>
                <li className="pl-1"><strong>V<sub>d</sub> reference:</strong> Using wrong voltage for percentage calculation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Star Connection</p>
                <ul className="space-y-0.5">
                  <li>V<sub>L</sub> = √3 × V<sub>ph</sub> = 1.732 × V<sub>ph</sub></li>
                  <li>I<sub>L</sub> = I<sub>ph</sub></li>
                  <li>Neutral available</li>
                  <li>Two voltage levels (400V/230V)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Delta Connection</p>
                <ul className="space-y-0.5">
                  <li>V<sub>L</sub> = V<sub>ph</sub></li>
                  <li>I<sub>L</sub> = √3 × I<sub>ph</sub> = 1.732 × I<sub>ph</sub></li>
                  <li>No neutral</li>
                  <li>Single voltage level (400V)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section4-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Star and Delta Configurations
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section4-3">
              Next: Three-Phase Power Calculations
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section4_2;
