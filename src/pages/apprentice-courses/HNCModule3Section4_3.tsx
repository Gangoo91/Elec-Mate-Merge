import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Balanced and Unbalanced Loads - HNC Module 3 Section 4.3";
const DESCRIPTION = "Master balanced and unbalanced three-phase load analysis: neutral current calculations, voltage asymmetry effects, load balancing strategies, and distribution board design for building services.";

const quickCheckQuestions = [
  {
    id: "balanced-neutral",
    question: "In a perfectly balanced star-connected three-phase system, what is the neutral current?",
    options: ["Equal to line current", "√3 times line current", "Zero", "Half the line current"],
    correctIndex: 2,
    explanation: "In a balanced star system, the three phase currents are equal in magnitude but displaced by 120°. They sum vectorially to zero, meaning no current flows in the neutral conductor."
  },
  {
    id: "phase-angle",
    question: "What is the phase angle separation between currents in a balanced three-phase system?",
    options: ["90°", "120°", "180°", "60°"],
    correctIndex: 1,
    explanation: "In a balanced three-phase system, each phase is separated by 120° (360° ÷ 3 phases = 120°). This equal angular displacement is what causes the currents to cancel in the neutral."
  },
  {
    id: "unbalance-effect",
    question: "What is the primary effect of significant load unbalance on a three-phase system?",
    options: ["Reduced power factor", "Increased line voltage", "Neutral current flow and voltage asymmetry", "Lower frequency"],
    correctIndex: 2,
    explanation: "Load unbalance causes the phase currents to no longer cancel in the neutral, resulting in neutral current flow. This also creates voltage asymmetry between phases."
  },
  {
    id: "neutral-sizing",
    question: "In commercial buildings with predominantly single-phase non-linear loads, how should the neutral be sized?",
    options: ["Half the phase conductor size", "Equal to phase conductor size", "Up to double the phase conductor size", "Neutral not required"],
    correctIndex: 2,
    explanation: "Non-linear loads (computers, LED drivers) generate triplen harmonics (3rd, 9th, 15th) that add in the neutral rather than cancel. The neutral may need to be oversized, potentially up to 200% of phase size."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What defines a 'balanced' three-phase load?",
    options: [
      "All loads operate at the same power factor",
      "Each phase has equal impedance with the same phase angle",
      "The total power on each phase is exactly 10kW",
      "All loads are connected in delta configuration"
    ],
    correctAnswer: 1,
    explanation: "A balanced load has equal impedance magnitude and identical phase angles on each phase. This results in equal currents displaced by 120°, causing them to cancel in the neutral."
  },
  {
    id: 2,
    question: "A star-connected load has phase currents of IR = 20A, IY = 20A, and IB = 20A, each at their respective phase angles. What is the neutral current?",
    options: ["60A", "34.6A", "20A", "0A"],
    correctAnswer: 3,
    explanation: "With equal currents at 120° phase separation, the phasor sum is zero. IR + IY + IB = 0 when balanced. This is the fundamental principle of balanced three-phase systems."
  },
  {
    id: 3,
    question: "In a star-connected system, if only the red phase carries 30A while yellow and blue carry 0A, what is the neutral current?",
    options: ["0A", "10A", "17.3A", "30A"],
    correctAnswer: 3,
    explanation: "With only one phase loaded, the neutral must carry the full return current. IN = IR = 30A. This is the worst-case unbalance scenario."
  },
  {
    id: 4,
    question: "What is voltage unbalance typically expressed as?",
    options: [
      "The difference between highest and lowest phase voltages",
      "The ratio of negative sequence to positive sequence voltage, as a percentage",
      "The sum of all three phase voltages",
      "The neutral-to-earth voltage"
    ],
    correctAnswer: 1,
    explanation: "Voltage Unbalance Factor (VUF) = (V- / V+) × 100%, where V- is negative sequence and V+ is positive sequence voltage. This is the IEC standard definition."
  },
  {
    id: 5,
    question: "What is the maximum recommended voltage unbalance for most equipment?",
    options: ["1%", "2%", "5%", "10%"],
    correctAnswer: 1,
    explanation: "IEC and BS EN standards recommend keeping voltage unbalance below 2%. Above this, motors experience increased heating, vibration, and reduced efficiency."
  },
  {
    id: 6,
    question: "A distribution board has: Red = 8kW, Yellow = 6kW, Blue = 10kW single-phase loads at unity power factor. What is the current unbalance?",
    options: [
      "Red: 34.8A, Yellow: 26.1A, Blue: 43.5A",
      "All phases: 34.8A",
      "Red: 8A, Yellow: 6A, Blue: 10A",
      "Total: 104.4A across all phases"
    ],
    correctAnswer: 0,
    explanation: "At 230V: IR = 8000/230 = 34.8A, IY = 6000/230 = 26.1A, IB = 10000/230 = 43.5A. The unbalance is 17.4A between highest and lowest loaded phases."
  },
  {
    id: 7,
    question: "Why do triplen harmonics (3rd, 9th, 15th...) add in the neutral rather than cancel?",
    options: [
      "They have higher frequency",
      "They are all in phase with each other across the three phases",
      "They travel faster through copper",
      "They only exist in delta systems"
    ],
    correctAnswer: 1,
    explanation: "Triplen harmonics (multiples of 3) are zero-sequence harmonics. They are in phase across all three phases, so instead of cancelling (like fundamental currents), they add arithmetically in the neutral."
  },
  {
    id: 8,
    question: "What is the recommended practice for balancing single-phase loads across a three-phase distribution board?",
    options: [
      "Connect all lighting to one phase",
      "Distribute loads so each phase carries approximately equal current",
      "Always use delta connection",
      "Install a larger main breaker"
    ],
    correctAnswer: 1,
    explanation: "Single-phase loads should be distributed across all three phases to achieve approximately equal loading. This minimises neutral current and voltage unbalance."
  },
  {
    id: 9,
    question: "A three-phase induction motor is supplied with 3% voltage unbalance. What is the approximate increase in winding temperature rise?",
    options: ["9%", "18%", "27%", "3%"],
    correctAnswer: 1,
    explanation: "Motor heating due to voltage unbalance increases approximately as the square of the unbalance percentage × 2. For 3% unbalance: increase ≈ 2 × 3² = 18%. This is why voltage unbalance must be minimised."
  },
  {
    id: 10,
    question: "In a 100A three-phase distribution board for an office building, what neutral size would be appropriate if heavy non-linear loads are expected?",
    options: ["50A rated (50% of phase)", "100A rated (100% of phase)", "150-200A rated (150-200% of phase)", "No neutral required"],
    correctAnswer: 2,
    explanation: "With significant non-linear loads (IT equipment, LED lighting), triplen harmonics can cause neutral current to exceed phase current. Oversizing to 150-200% of phase rating is prudent practice."
  }
];

const faqs = [
  {
    question: "Why does a balanced three-phase load have zero neutral current?",
    answer: "In a balanced system, each phase carries equal current but shifted by 120°. When you add three equal vectors at 120° angles, they form a closed triangle and sum to zero. Mathematically: IR∠0° + IY∠-120° + IB∠-240° = 0. This is why the neutral conductor can theoretically be omitted in balanced three-phase systems."
  },
  {
    question: "How do I calculate neutral current for an unbalanced load?",
    answer: "The neutral current equals the phasor sum of the three phase currents: IN = IR + IY + IB (vectorially). For resistive loads at different magnitudes, you can use: IN = √(IR² + IY² + IB² - IR×IY - IY×IB - IB×IR). For complex impedances, full phasor addition accounting for phase angles is required."
  },
  {
    question: "What causes voltage unbalance in building supplies?",
    answer: "Main causes include: unequal single-phase loading between phases, asymmetrical transformer impedances, unbalanced supply from the DNO, single-phase faults on the network, and unequal cable impedances due to different run lengths. In buildings, poor load distribution is the most common cause."
  },
  {
    question: "Why are triplen harmonics a problem in modern buildings?",
    answer: "Non-linear loads like computers, LED drivers, and variable speed drives generate harmonic currents, particularly the 3rd harmonic. Unlike fundamental currents which cancel in the neutral, triplen harmonics (3rd, 9th, 15th) are zero-sequence and add arithmetically. This can cause neutral current to exceed phase current, potentially overloading undersized neutrals."
  },
  {
    question: "How do I balance loads on a distribution board?",
    answer: "List all single-phase loads with their currents. Start with the largest loads and allocate them to different phases. Continue adding loads, always placing the next load on the least-loaded phase. Aim for phase currents within 10-15% of each other. Consider future load growth and ensure similar load types (lighting, small power) are spread across phases."
  },
  {
    question: "Does BS 7671 specify neutral conductor sizing for harmonic loads?",
    answer: "BS 7671 Regulation 523.6.3 requires consideration of harmonic currents when sizing the neutral. Where the third harmonic content exceeds 15%, the neutral should not be smaller than the line conductors. For higher harmonic content (>33%), the neutral may need to be the dominant conductor for current-carrying capacity calculations."
  }
];

const HNCModule3Section4_3 = () => {
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
            <span>Module 3.4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Balanced and Unbalanced Loads
          </h1>
          <p className="text-white/80">
            Understanding load distribution, neutral current flow, and the effects of asymmetrical loading in three-phase systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Balanced:</strong> Equal impedance per phase, currents cancel in neutral</li>
              <li className="pl-1"><strong>Unbalanced:</strong> Unequal loading causes neutral current flow</li>
              <li className="pl-1"><strong>Effects:</strong> Voltage asymmetry, equipment overheating</li>
              <li className="pl-1"><strong>Harmonics:</strong> Triplen harmonics add in neutral</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>DB design:</strong> Distribute single-phase loads across phases</li>
              <li className="pl-1"><strong>Neutral sizing:</strong> Consider harmonic content from IT loads</li>
              <li className="pl-1"><strong>Motor protection:</strong> Voltage unbalance limits critical</li>
              <li className="pl-1"><strong>Maximum VUF:</strong> Keep below 2% for equipment protection</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define balanced and unbalanced three-phase loads",
              "Explain why neutral current is zero in balanced star systems",
              "Calculate neutral current for unbalanced resistive loads",
              "Understand voltage unbalance and its effects on equipment",
              "Apply load balancing strategies to distribution boards",
              "Size neutral conductors accounting for harmonic currents"
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

        {/* Section 1: Balanced Loads */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Balanced Three-Phase Loads
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A balanced three-phase load is one where each phase has identical impedance - both in
              magnitude and phase angle. This creates equal currents in each phase, displaced by 120°,
              which is the ideal operating condition for three-phase systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Characteristics of a balanced load:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Z<sub>R</sub> = Z<sub>Y</sub> = Z<sub>B</sub> (equal impedances)</li>
                <li className="pl-1">I<sub>R</sub> = I<sub>Y</sub> = I<sub>B</sub> (equal current magnitudes)</li>
                <li className="pl-1">Phase currents displaced by exactly 120°</li>
                <li className="pl-1">Power delivered equally by each phase: P<sub>phase</sub> = P<sub>total</sub>/3</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Examples of Balanced Loads</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Three-phase motors:</strong> Symmetrical windings draw balanced current</li>
                <li className="pl-1"><strong>Three-phase heaters:</strong> Equal resistance elements on each phase</li>
                <li className="pl-1"><strong>Balanced transformer banks:</strong> Equal loading on each winding</li>
                <li className="pl-1"><strong>Three-phase rectifiers:</strong> Symmetrical conversion circuits</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Three-phase motors and industrial equipment are designed as balanced loads.
              Single-phase loads connected to three-phase systems inherently create unbalance.
            </p>
          </div>
        </section>

        {/* Section 2: Neutral Current in Balanced Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Neutral Current in Balanced Star Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In a star-connected balanced load, the neutral current is zero. This is because the
              three phase currents, being equal in magnitude but displaced by 120°, sum vectorially
              to zero.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mathematical Proof</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>For balanced currents with magnitude I:</p>
                <p className="mt-2">I<sub>R</sub> = I∠0°</p>
                <p>I<sub>Y</sub> = I∠-120°</p>
                <p>I<sub>B</sub> = I∠-240° (or I∠+120°)</p>
                <p className="mt-2">Neutral current I<sub>N</sub> = I<sub>R</sub> + I<sub>Y</sub> + I<sub>B</sub></p>
                <p className="mt-2">Converting to rectangular form:</p>
                <p>I<sub>R</sub> = I + j0</p>
                <p>I<sub>Y</sub> = -0.5I - j0.866I</p>
                <p>I<sub>B</sub> = -0.5I + j0.866I</p>
                <p className="mt-2">Sum = (I - 0.5I - 0.5I) + j(0 - 0.866I + 0.866I)</p>
                <p><strong>I<sub>N</sub> = 0 + j0 = 0A</strong></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Phasor Diagram Visualisation</p>
              <div className="p-4 rounded bg-black/30 text-sm text-white/90">
                <p>Imagine three arrows of equal length, starting from the same point:</p>
                <ul className="mt-2 space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">I<sub>R</sub> pointing at 0° (horizontal right)</li>
                  <li className="pl-1">I<sub>Y</sub> pointing at -120° (down and left)</li>
                  <li className="pl-1">I<sub>B</sub> pointing at -240° (up and left)</li>
                </ul>
                <p className="mt-2">These three vectors form a closed equilateral triangle when placed head-to-tail,
                returning to the starting point - hence their sum is zero.</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical implication:</strong> In a perfectly balanced four-wire system, the neutral
              carries no current. This is why three-phase motors (balanced loads) often don't require a neutral connection.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Unbalanced Loads */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Unbalanced Loads - Unequal Phase Loading
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An unbalanced load occurs when the three phases do not carry equal currents. This is
              common in building services where numerous single-phase loads are connected to a
              three-phase supply. The degree of unbalance affects system efficiency and equipment performance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common causes of unbalance in buildings:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Single-phase loads distributed unevenly across phases</li>
                <li className="pl-1">Large single-phase equipment (lifts, air conditioning units)</li>
                <li className="pl-1">Varying occupancy patterns (one floor heavily loaded)</li>
                <li className="pl-1">Single-phase faults or open conductors</li>
                <li className="pl-1">Poor initial load scheduling during design</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Unbalance</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Current unbalance</td>
                      <td className="border border-white/10 px-3 py-2">Different current magnitudes per phase</td>
                      <td className="border border-white/10 px-3 py-2">R=30A, Y=25A, B=35A</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage unbalance</td>
                      <td className="border border-white/10 px-3 py-2">Different voltage magnitudes per phase</td>
                      <td className="border border-white/10 px-3 py-2">V<sub>R</sub>=235V, V<sub>Y</sub>=228V, V<sub>B</sub>=232V</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phase angle unbalance</td>
                      <td className="border border-white/10 px-3 py-2">Deviation from 120° separation</td>
                      <td className="border border-white/10 px-3 py-2">Angles: 0°, -118°, -243°</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Single-phasing</td>
                      <td className="border border-white/10 px-3 py-2">Loss of one phase (extreme unbalance)</td>
                      <td className="border border-white/10 px-3 py-2">Blown fuse, open conductor</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design target:</strong> In building services, aim to keep phase currents within 10-15% of each
              other. This minimises neutral current and maintains acceptable voltage balance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Calculating Neutral Current */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Calculating Neutral Current with Unbalance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When loads are unbalanced, the phase currents no longer cancel in the neutral. The neutral
              current must be calculated using phasor addition. For resistive loads at unity power factor,
              simplified formulas can be used.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">General Formula (Phasor Addition)</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>I<sub>N</sub> = I<sub>R</sub> + I<sub>Y</sub> + I<sub>B</sub></strong> (vector sum)</p>
                <p className="mt-2">For resistive loads (unity pf) at different magnitudes:</p>
                <p className="mt-2 text-elec-yellow"><strong>I<sub>N</sub> = √(I<sub>R</sub>² + I<sub>Y</sub>² + I<sub>B</sub>² - I<sub>R</sub>·I<sub>Y</sub> - I<sub>Y</sub>·I<sub>B</sub> - I<sub>B</sub>·I<sub>R</sub>)</strong></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Special Cases</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Scenario</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Neutral Current</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Balanced (I<sub>R</sub>=I<sub>Y</sub>=I<sub>B</sub>=I)</td>
                      <td className="border border-white/10 px-3 py-2">I<sub>N</sub> = 0</td>
                      <td className="border border-white/10 px-3 py-2">Currents cancel</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">One phase loaded (I, 0, 0)</td>
                      <td className="border border-white/10 px-3 py-2">I<sub>N</sub> = I</td>
                      <td className="border border-white/10 px-3 py-2">Full current returns via neutral</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Two phases equally loaded (I, I, 0)</td>
                      <td className="border border-white/10 px-3 py-2">I<sub>N</sub> = I</td>
                      <td className="border border-white/10 px-3 py-2">Equal to single phase current</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Two phases, one double (2I, I, 0)</td>
                      <td className="border border-white/10 px-3 py-2">I<sub>N</sub> = √3 × I</td>
                      <td className="border border-white/10 px-3 py-2">Neutral exceeds smaller phase</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Example: Unbalanced Resistive Load</h3>
              <p className="text-sm text-white mb-2">
                <strong>Problem:</strong> A distribution board has: Red = 40A, Yellow = 30A, Blue = 25A (all resistive loads). Calculate neutral current.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using: I<sub>N</sub> = √(I<sub>R</sub>² + I<sub>Y</sub>² + I<sub>B</sub>² - I<sub>R</sub>·I<sub>Y</sub> - I<sub>Y</sub>·I<sub>B</sub> - I<sub>B</sub>·I<sub>R</sub>)</p>
                <p className="mt-2">I<sub>N</sub> = √(40² + 30² + 25² - 40×30 - 30×25 - 25×40)</p>
                <p>I<sub>N</sub> = √(1600 + 900 + 625 - 1200 - 750 - 1000)</p>
                <p>I<sub>N</sub> = √(3125 - 2950)</p>
                <p>I<sub>N</sub> = √175 = <strong>13.2A</strong></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key insight:</strong> Even with a 15A difference between highest and lowest phase currents,
              the neutral only carries 13.2A. The neutral current is always less than the arithmetic sum.
            </p>
          </div>
        </section>

        {/* Section 5: Effects of Unbalance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Effects of Unbalance: Voltage Asymmetry and Overheating
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Load unbalance creates several problems that affect equipment performance, energy efficiency,
              and system reliability. Understanding these effects is essential for proper system design.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Unbalance Factor (VUF)</p>
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm text-white mb-2">
                  Voltage unbalance is measured using symmetrical components:
                </p>
                <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                  <p><strong>VUF = (V<sub>negative</sub> / V<sub>positive</sub>) × 100%</strong></p>
                  <p className="mt-2 text-white/60">Simplified approximation:</p>
                  <p>VUF ≈ (V<sub>max</sub> - V<sub>min</sub>) / V<sub>avg</sub> × 100%</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Effects on Three-Phase Equipment</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effect of Unbalance</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Consequence</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Induction motors</td>
                      <td className="border border-white/10 px-3 py-2">Negative sequence currents, increased heating</td>
                      <td className="border border-white/10 px-3 py-2">Reduced life, derating required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transformers</td>
                      <td className="border border-white/10 px-3 py-2">Unequal phase loading</td>
                      <td className="border border-white/10 px-3 py-2">Hotspots, reduced capacity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VSDs/Inverters</td>
                      <td className="border border-white/10 px-3 py-2">Increased DC bus ripple</td>
                      <td className="border border-white/10 px-3 py-2">Capacitor stress, harmonics</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Generators</td>
                      <td className="border border-white/10 px-3 py-2">Rotor heating, vibration</td>
                      <td className="border border-white/10 px-3 py-2">Output derating required</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Motor Heating Due to Voltage Unbalance</p>
              <div className="text-sm text-white/90">
                <p>The temperature rise in motors increases approximately as:</p>
                <p className="font-mono mt-2 text-center">ΔT<sub>increase</sub> ≈ 2 × (% voltage unbalance)²</p>
                <p className="mt-2">For example:</p>
                <ul className="mt-1 space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">2% VUF → ~8% temperature increase</li>
                  <li className="pl-1">3% VUF → ~18% temperature increase</li>
                  <li className="pl-1">5% VUF → ~50% temperature increase</li>
                </ul>
                <p className="mt-2 text-red-300"><strong>NEMA MG1:</strong> Motors should be derated if voltage unbalance exceeds 1%.</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Other consequences of unbalance:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Neutral overheating:</strong> Undersized neutrals may overheat with unbalanced loads</li>
                <li className="pl-1"><strong>Increased losses:</strong> I²R losses increase with unbalanced currents</li>
                <li className="pl-1"><strong>Nuisance tripping:</strong> Protection devices may trip on unbalanced faults</li>
                <li className="pl-1"><strong>Reduced power factor:</strong> Negative sequence power appears as reactive power</li>
                <li className="pl-1"><strong>Equipment malfunction:</strong> Sensitive electronics may malfunction</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Standard limits:</strong> BS EN 50160 specifies that voltage unbalance should not exceed 2%
              under normal operating conditions. Many equipment manufacturers specify stricter limits.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: Load Balancing Strategies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Load Balancing Strategies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective load balancing is achieved during the design phase and maintained through
              proper distribution board scheduling. The goal is to minimise the current difference
              between phases.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Phase Strategies</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Load scheduling:</strong> Allocate single-phase loads evenly across phases during design</li>
                <li className="pl-1"><strong>Grouping similar loads:</strong> Distribute lighting circuits across all three phases</li>
                <li className="pl-1"><strong>Large load placement:</strong> Connect large single-phase loads to least loaded phase</li>
                <li className="pl-1"><strong>Future capacity:</strong> Allow spare ways on each phase for future loads</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Load Balancing Procedure</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1">List all single-phase loads with their design currents</li>
                <li className="pl-1">Sort loads from largest to smallest</li>
                <li className="pl-1">Allocate largest load to any phase (e.g., Red)</li>
                <li className="pl-1">Allocate second largest to different phase (e.g., Yellow)</li>
                <li className="pl-1">Continue allocating each load to the phase with lowest total</li>
                <li className="pl-1">Check final balance - aim for within 10-15% variation</li>
                <li className="pl-1">Adjust allocation if necessary by swapping similar-sized loads</li>
              </ol>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operational Strategies</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Monitoring:</strong> Regular current measurements on each phase</li>
                <li className="pl-1"><strong>Load transfer:</strong> Move circuits between phases if unbalance develops</li>
                <li className="pl-1"><strong>Static VAR compensators:</strong> Electronic balancing for critical loads</li>
                <li className="pl-1"><strong>Active filters:</strong> Power electronic compensation systems</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Example: DB Load Schedule</h3>
              <p className="text-sm text-white mb-2">
                <strong>Problem:</strong> Allocate these loads across three phases: 20A, 15A, 12A, 10A, 8A, 6A, 5A, 4A
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step-by-step allocation:</p>
                <p className="mt-2">Start with empty phases: R=0, Y=0, B=0</p>
                <p className="mt-2">Add 20A → R=20, Y=0, B=0</p>
                <p>Add 15A → R=20, Y=15, B=0</p>
                <p>Add 12A → R=20, Y=15, B=12</p>
                <p>Add 10A → R=20, Y=15, B=22 (B was lowest)</p>
                <p>Add 8A → R=20, Y=23, B=22 (Y was lowest)</p>
                <p>Add 6A → R=26, Y=23, B=22 (R was lowest)</p>
                <p>Add 5A → R=26, Y=23, B=27 (B was lowest)</p>
                <p>Add 4A → R=26, Y=27, B=27 (Y was lowest)</p>
                <p className="mt-2"><strong>Final: R=26A, Y=27A, B=27A</strong></p>
                <p className="text-green-400 mt-1">Excellent balance: only 1A variation (3.7%)</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> In existing installations, use a clamp meter to measure phase
              currents during peak load. If unbalance exceeds 15%, consider relocating circuits.
            </p>
          </div>
        </section>

        {/* Section 7: Single-Phase Loads on Three-Phase Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Single-Phase Loads on Three-Phase Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Most building loads are single-phase - lighting, socket outlets, small equipment.
              Connecting these to a three-phase system requires careful consideration of load
              distribution and neutral conductor sizing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Connection Options</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Connection</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Use Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phase-to-Neutral</td>
                      <td className="border border-white/10 px-3 py-2">230V</td>
                      <td className="border border-white/10 px-3 py-2">Standard single-phase loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Phase-to-Phase</td>
                      <td className="border border-white/10 px-3 py-2">400V</td>
                      <td className="border border-white/10 px-3 py-2">Single-phase 400V loads (rare)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Neutral Problem</p>
              <p className="text-sm text-white">
                When single-phase loads are connected phase-to-neutral, the neutral must carry the
                return current. With unbalanced loading, significant neutral current flows. With
                non-linear loads, the neutral can carry more current than any phase.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Harmonic Content in Modern Buildings</p>
              <p className="text-sm text-white mb-2">
                Non-linear loads (computers, LED drivers, electronic equipment) generate harmonic currents:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Fundamental (50Hz):</strong> Cancels in balanced neutral</li>
                <li className="pl-1"><strong>3rd harmonic (150Hz):</strong> Adds arithmetically in neutral</li>
                <li className="pl-1"><strong>5th, 7th:</strong> Cancel like fundamental (positive/negative sequence)</li>
                <li className="pl-1"><strong>9th, 15th:</strong> Add in neutral (triplen harmonics)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="text-sm font-medium text-amber-400 mb-2">Triplen Harmonic Warning</p>
              <p className="text-sm text-white/90">
                In an office building with computers on each phase drawing equal fundamental current
                but 50% third harmonic content, the neutral current from triplen harmonics alone
                equals 1.5× the phase fundamental current. Combined with any unbalance, the neutral
                can significantly exceed phase current.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Modern practice:</strong> For buildings with significant IT loads or LED lighting,
              consider the neutral as a current-carrying conductor and size it at least equal to,
              or larger than, the phase conductors.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 8: Building Services Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Building Services: DB Load Distribution and Neutral Sizing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Practical application of load balancing principles in building services requires
              systematic distribution board design and appropriate neutral conductor sizing
              based on expected load characteristics.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Distribution Board Design Principles</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Separate essential and non-essential loads</li>
                <li className="pl-1">Group similar load types (lighting, small power, mechanical)</li>
                <li className="pl-1">Balance phases within each DB and across the installation</li>
                <li className="pl-1">Allow 20-25% spare capacity for future loads</li>
                <li className="pl-1">Consider metering requirements per circuit/phase</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Neutral Sizing Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Third Harmonic Content</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Neutral Sizing</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reference</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0 - 15%</td>
                      <td className="border border-white/10 px-3 py-2">Based on phase size (can be reduced)</td>
                      <td className="border border-white/10 px-3 py-2">523.6.3</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">15 - 33%</td>
                      <td className="border border-white/10 px-3 py-2">Neutral = phase conductor size</td>
                      <td className="border border-white/10 px-3 py-2">523.6.3</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&gt;33%</td>
                      <td className="border border-white/10 px-3 py-2">Neutral is sizing conductor (may exceed phase)</td>
                      <td className="border border-white/10 px-3 py-2">523.6.3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Building Load Characteristics</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Building Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical THD</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Neutral Recommendation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Industrial (motors)</td>
                      <td className="border border-white/10 px-3 py-2">&lt;15%</td>
                      <td className="border border-white/10 px-3 py-2">50-100% of phase</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Residential</td>
                      <td className="border border-white/10 px-3 py-2">15-25%</td>
                      <td className="border border-white/10 px-3 py-2">100% of phase</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Commercial office</td>
                      <td className="border border-white/10 px-3 py-2">25-40%</td>
                      <td className="border border-white/10 px-3 py-2">100-150% of phase</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data centre</td>
                      <td className="border border-white/10 px-3 py-2">&gt;40%</td>
                      <td className="border border-white/10 px-3 py-2">150-200% of phase</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Worked Example: Office DB Design</h3>
              <p className="text-sm text-white mb-2">
                <strong>Problem:</strong> Design a distribution board for a 500m² open-plan office.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Load Assessment:</p>
                <p>Lighting: 500m² × 12W/m² = 6kW → 26A at 230V</p>
                <p>Small power: 500m² × 25W/m² = 12.5kW → 54A at 230V</p>
                <p className="mt-2 text-white/60">Distribution (balanced):</p>
                <p>Lighting: 3 × 10A circuits (one per phase)</p>
                <p>Small power: 6 × 32A ring finals (2 per phase)</p>
                <p className="mt-2 text-white/60">Phase allocation:</p>
                <p>R: 1×10A lighting + 2×32A rings = ~26A design</p>
                <p>Y: 1×10A lighting + 2×32A rings = ~26A design</p>
                <p>B: 1×10A lighting + 2×32A rings = ~26A design</p>
                <p className="mt-2 text-white/60">Neutral sizing:</p>
                <p>IT-heavy office → expect ~30% THD</p>
                <p>Neutral sized equal to phase: 100A rated</p>
                <p className="text-elec-yellow mt-1">Consider 150% (150A) if high IT density expected</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Document the load schedule showing phase allocation,
              expected diversity, and harmonic content assumptions. This aids future modifications
              and troubleshooting.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Additional Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Neutral Current Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Problem:</strong> A four-wire star system supplies loads of 50A on Red, 40A on Yellow, and 30A on Blue (all resistive). Calculate the neutral current.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using: I<sub>N</sub> = √(I<sub>R</sub>² + I<sub>Y</sub>² + I<sub>B</sub>² - I<sub>R</sub>·I<sub>Y</sub> - I<sub>Y</sub>·I<sub>B</sub> - I<sub>B</sub>·I<sub>R</sub>)</p>
                <p className="mt-2">I<sub>N</sub> = √(50² + 40² + 30² - 50×40 - 40×30 - 30×50)</p>
                <p>I<sub>N</sub> = √(2500 + 1600 + 900 - 2000 - 1200 - 1500)</p>
                <p>I<sub>N</sub> = √(5000 - 4700) = √300</p>
                <p className="mt-2"><strong>I<sub>N</sub> = 17.3A</strong></p>
                <p className="mt-2 text-white/60">The neutral carries 17.3A despite a 20A difference between max and min phase currents.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Voltage Unbalance Factor</h3>
              <p className="text-sm text-white mb-2">
                <strong>Problem:</strong> Measured phase voltages are V<sub>R</sub> = 238V, V<sub>Y</sub> = 232V, V<sub>B</sub> = 235V. Calculate the approximate VUF.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>V<sub>max</sub> = 238V, V<sub>min</sub> = 232V</p>
                <p>V<sub>avg</sub> = (238 + 232 + 235) / 3 = 235V</p>
                <p className="mt-2">VUF ≈ (V<sub>max</sub> - V<sub>min</sub>) / V<sub>avg</sub> × 100%</p>
                <p>VUF ≈ (238 - 232) / 235 × 100%</p>
                <p><strong>VUF ≈ 2.55%</strong></p>
                <p className="mt-2 text-amber-400">⚠ Exceeds 2% limit - investigate cause and consider remedial action</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Motor Derating for Unbalance</h3>
              <p className="text-sm text-white mb-2">
                <strong>Problem:</strong> A 30kW motor operates with 2.5% voltage unbalance. What is the recommended output derating?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>From NEMA MG1 derating factors:</p>
                <p>At 2.5% VUF → derating factor ≈ 0.925</p>
                <p className="mt-2">Derated output = 30kW × 0.925 = <strong>27.75kW</strong></p>
                <p className="mt-2 text-white/60">Alternative: temperature rise increases by approximately:</p>
                <p>ΔT<sub>increase</sub> ≈ 2 × (2.5)² = 12.5%</p>
                <p className="mt-2 text-white/60">Either reduce load to 27.75kW or accept higher operating temperature.</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Neutral current (balanced):</strong> I<sub>N</sub> = 0</li>
                <li className="pl-1"><strong>Neutral current (resistive unbalance):</strong> I<sub>N</sub> = √(I<sub>R</sub>² + I<sub>Y</sub>² + I<sub>B</sub>² - I<sub>R</sub>I<sub>Y</sub> - I<sub>Y</sub>I<sub>B</sub> - I<sub>B</sub>I<sub>R</sub>)</li>
                <li className="pl-1"><strong>Single-phase only:</strong> I<sub>N</sub> = I<sub>phase</sub></li>
                <li className="pl-1"><strong>VUF (approx):</strong> (V<sub>max</sub> - V<sub>min</sub>) / V<sub>avg</sub> × 100%</li>
                <li className="pl-1"><strong>Motor temperature rise:</strong> ΔT ≈ 2 × (%VUF)²</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Phase separation: <strong>120°</strong></li>
                <li className="pl-1">Maximum VUF (BS EN 50160): <strong>2%</strong></li>
                <li className="pl-1">Motor derating threshold: <strong>1% VUF</strong></li>
                <li className="pl-1">Target phase balance: <strong>within 10-15%</strong></li>
                <li className="pl-1">Third harmonic threshold for neutral sizing: <strong>15%, 33%</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Adding currents arithmetically:</strong> Neutral ≠ I<sub>R</sub> + I<sub>Y</sub> + I<sub>B</sub> (must use phasors)</li>
                <li className="pl-1"><strong>Assuming zero neutral:</strong> Only true for perfectly balanced loads</li>
                <li className="pl-1"><strong>Undersizing neutrals:</strong> Harmonic loads may require oversized neutral</li>
                <li className="pl-1"><strong>Ignoring unbalance effects:</strong> Motors derate significantly with VUF</li>
                <li className="pl-1"><strong>Poor load scheduling:</strong> Design-stage balance prevents operational issues</li>
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
                <p className="font-medium text-white mb-1">Balanced Load Properties</p>
                <ul className="space-y-0.5">
                  <li>Equal impedance: Z<sub>R</sub> = Z<sub>Y</sub> = Z<sub>B</sub></li>
                  <li>Equal currents at 120° separation</li>
                  <li>Neutral current = 0</li>
                  <li>Equal power per phase</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Unbalance Limits</p>
                <ul className="space-y-0.5">
                  <li>Voltage unbalance: max 2%</li>
                  <li>Phase current variation: target &lt;15%</li>
                  <li>Motor derating: above 1% VUF</li>
                  <li>Harmonic neutral: may exceed phase current</li>
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
            <Link to="../h-n-c-module3-section4-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Line and Phase Relationships
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section4-4">
              Next: Three-Phase Power Calculations
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section4_3;
