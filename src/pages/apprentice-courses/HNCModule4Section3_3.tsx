import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fault Current Calculations - HNC Module 4 Section 3.3";
const DESCRIPTION = "Master fault current calculations for building services: prospective fault current (Ipf), transformer impedance, cable impedance, loop impedance calculations, and verification methods.";

const quickCheckQuestions = [
  {
    id: "ipf-definition",
    question: "What is prospective fault current (Ipf)?",
    options: ["Normal operating current", "Maximum current a cable can carry", "Maximum current that would flow in a fault", "Current at which RCDs operate"],
    correctIndex: 2,
    explanation: "Prospective fault current (Ipf) is the maximum current that would flow if a fault of negligible impedance occurred at a given point. It's essential for selecting protective device breaking capacity."
  },
  {
    id: "transformer-impedance",
    question: "A 500kVA transformer has 5% impedance. What is its approximate fault current at the secondary terminals?",
    options: ["500A", "5kA", "14.4kA", "72kA"],
    correctIndex: 2,
    explanation: "For a 500kVA transformer at 400V: FLC = 500000/(√3×400) = 722A. With 5% impedance, fault current ≈ FLC/0.05 = 722/0.05 = 14,440A ≈ 14.4kA."
  },
  {
    id: "cable-impedance",
    question: "How does cable length affect prospective fault current?",
    options: ["No effect", "Increases Ipf", "Decreases Ipf", "Only affects voltage drop"],
    correctIndex: 2,
    explanation: "Longer cables have higher impedance (both resistance and reactance), which increases total circuit impedance and therefore reduces prospective fault current. This is why Ipf is highest at the transformer."
  },
  {
    id: "zs-calculation",
    question: "If Ze = 0.35Ω and the circuit (R1+R2) = 0.25Ω, what is the earth fault loop impedance Zs?",
    options: ["0.10Ω", "0.60Ω", "0.88Ω", "1.46Ω"],
    correctIndex: 1,
    explanation: "Zs = Ze + (R1+R2) = 0.35 + 0.25 = 0.60Ω. This simple addition applies when calculating total earth fault loop impedance for disconnection time verification."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the formula for calculating prospective fault current at a point in the system?",
    options: [
      "Ipf = V × Z",
      "Ipf = V / Z",
      "Ipf = Z / V",
      "Ipf = V² / Z"
    ],
    correctAnswer: 1,
    explanation: "Ipf = V/Z where V is the system voltage and Z is the total impedance of the fault path from the source to the fault point. Lower impedance means higher fault current."
  },
  {
    id: 2,
    question: "A 1000kVA transformer with 6% impedance supplies a 400V system. What is the prospective fault current at the transformer secondary?",
    options: [
      "10.2kA",
      "16.7kA",
      "24.1kA",
      "28.9kA"
    ],
    correctAnswer: 2,
    explanation: "FLC = 1000000/(√3×400) = 1443A. Fault current = FLC/impedance = 1443/0.06 = 24,050A ≈ 24.1kA. This is the maximum fault level at the transformer terminals."
  },
  {
    id: 3,
    question: "Which factor reduces the prospective fault current most significantly as distance from the transformer increases?",
    options: [
      "Ambient temperature",
      "Cable insulation type",
      "Cable impedance (R + jX)",
      "Installation method"
    ],
    correctAnswer: 2,
    explanation: "Cable impedance, comprising both resistance (R) and reactance (X), is the dominant factor reducing fault current as distance increases. The longer the cable run, the higher the total impedance."
  },
  {
    id: 4,
    question: "When measuring prospective fault current at an installation, which test instruments are used?",
    options: [
      "Insulation resistance tester",
      "Loop impedance tester or prospective fault current meter",
      "Earth electrode resistance tester",
      "Phase rotation indicator"
    ],
    correctAnswer: 1,
    explanation: "Loop impedance testers and dedicated prospective fault current meters measure Ipf directly at the test point. The Ipf reading is essential for verifying protective device breaking capacity."
  },
  {
    id: 5,
    question: "What is the typical Ze value provided by UK DNOs for TN-C-S supplies?",
    options: [
      "0.08Ω maximum",
      "0.35Ω maximum",
      "0.80Ω maximum",
      "21Ω maximum"
    ],
    correctAnswer: 1,
    explanation: "For TN-C-S (PME) supplies, DNOs typically declare a maximum Ze of 0.35Ω. This value should be used in design calculations unless actual measurements indicate a lower value."
  },
  {
    id: 6,
    question: "How is cable impedance per metre typically expressed in BS 7671 tables?",
    options: [
      "Ω/km",
      "mΩ/m",
      "µΩ/m",
      "kΩ/m"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Table 9A and appendices express cable resistance in milliohms per metre (mΩ/m). Values must be converted to ohms for circuit calculations (divide by 1000)."
  },
  {
    id: 7,
    question: "What correction factor should be applied to tabulated cable resistance values for fault calculations?",
    options: [
      "Multiply by 0.8",
      "Multiply by 1.0 (no correction)",
      "Multiply by 1.2 (temperature correction)",
      "Multiply by 1.45"
    ],
    correctAnswer: 2,
    explanation: "Tabulated values are at 20°C. For fault calculations under operating conditions, multiply by 1.2 to account for conductor temperature rise. This factor is conservative for verification purposes."
  },
  {
    id: 8,
    question: "Calculate the earth fault loop impedance for 30m of 2.5mm² T&E cable with Ze = 0.35Ω. (R1+R2 = 14.82mΩ/m)",
    options: [
      "0.44Ω",
      "0.79Ω",
      "0.95Ω",
      "1.14Ω"
    ],
    correctAnswer: 1,
    explanation: "Cable (R1+R2) = 30m × 14.82mΩ/m = 444.6mΩ = 0.445Ω. Zs = Ze + (R1+R2) = 0.35 + 0.445 = 0.795Ω ≈ 0.79Ω at 20°C."
  },
  {
    id: 9,
    question: "Why must the Cmin factor (0.95) be applied in fault current calculations?",
    options: [
      "To account for cable heating",
      "To account for supply voltage tolerance",
      "To account for temperature variations",
      "To provide a safety margin"
    ],
    correctAnswer: 1,
    explanation: "The Cmin factor (typically 0.95) accounts for the -6% tolerance on nominal supply voltage. This ensures disconnection time calculations remain valid even at minimum supply voltage."
  },
  {
    id: 10,
    question: "At what point in a radial distribution system is the prospective fault current typically highest?",
    options: [
      "At the furthest outlet",
      "At the middle of the circuit",
      "At the origin (distribution board)",
      "At any point - it's constant throughout"
    ],
    correctAnswer: 2,
    explanation: "Ipf is highest at the origin where total impedance is lowest. As you move along the circuit, cable impedance adds, increasing total impedance and reducing Ipf. The origin value determines device breaking capacity."
  }
];

const faqs = [
  {
    question: "Why do I need to calculate fault current at different points?",
    answer: "Fault current varies throughout an installation. At the origin (close to supply), fault current is highest - this determines protective device breaking capacity. At the end of circuits, fault current is lowest - this determines whether the protective device can operate fast enough for automatic disconnection. You must verify both: breaking capacity at the origin and disconnection time at the extremity."
  },
  {
    question: "How do I obtain the external earth fault loop impedance (Ze)?",
    answer: "Ze can be: 1) Measured at the installation origin with the main earthing conductor disconnected (requires DNO involvement); 2) Calculated from DNO-provided values (typically 0.35Ω max for TN-C-S, 0.8Ω max for TN-S); 3) Measured at the origin with main switch off and supply on, though this includes some installation impedance. For design purposes, use the DNO maximum declared value."
  },
  {
    question: "What's the difference between phase-phase and phase-earth fault calculations?",
    answer: "Phase-phase (line-line) fault current is typically higher as it involves two phase conductors with lower total impedance. Phase-earth fault current is lower due to the protective conductor impedance. For breaking capacity, use the highest fault current (usually phase-phase at the origin). For disconnection time, use earth fault current at the circuit extremity."
  },
  {
    question: "Why is transformer impedance given as a percentage?",
    answer: "Percentage impedance (%Z) is a convenient way to express transformer impedance relative to its rating. A 5% impedance transformer will produce 1/0.05 = 20 times its full-load current if a bolted fault occurs at its terminals. This standardised method allows quick fault level estimation: Fault current = Full load current / (%Z/100)."
  },
  {
    question: "How do I account for parallel transformer operation?",
    answer: "When transformers operate in parallel, total fault current is the sum of individual contributions (if equal rating and impedance) or calculated from combined impedance. For n identical transformers: combined impedance = individual impedance/n, so fault current is approximately n times the single transformer fault current. This significantly increases fault levels and may require uprated protective devices."
  },
  {
    question: "What software tools are available for fault calculations?",
    answer: "Common tools include: Amtech ProDesign, Trimble (Cymap), ETAP, PowerCalc, and manufacturer-specific software (Schneider Ecodial, ABB DOC). These handle complex networks with multiple sources, parallel cables, motor contributions, and varying fault positions. For simple radial systems, manual calculation or spreadsheets are adequate."
  }
];

const HNCModule4Section3_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fault Current Calculations
          </h1>
          <p className="text-white/80">
            Calculating prospective fault current, impedances, and verifying protection adequacy
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Ipf = V/Z:</strong> Fault current from system impedance</li>
              <li className="pl-1"><strong>Transformer:</strong> Fault ≈ FLC / %impedance</li>
              <li className="pl-1"><strong>Zs = Ze + (R1+R2):</strong> Earth fault loop</li>
              <li className="pl-1"><strong>If = Uo/Zs:</strong> Earth fault current</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Origin:</strong> Highest Ipf - breaking capacity</li>
              <li className="pl-1"><strong>Circuit end:</strong> Lowest If - disconnection time</li>
              <li className="pl-1"><strong>Sub-distribution:</strong> Reduced Ipf by cable Z</li>
              <li className="pl-1"><strong>Verification:</strong> Test vs calculated values</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate prospective fault current from transformer data",
              "Determine fault current reduction along cable runs",
              "Apply the earth fault loop impedance formula",
              "Use BS 7671 tables for cable impedance values",
              "Apply correction factors for temperature and voltage",
              "Verify protective device adequacy using calculated values"
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

        {/* Section 1: Prospective Fault Current */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Prospective Fault Current (Ipf)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Prospective fault current is the maximum current that would flow if a short-circuit
              of negligible impedance occurred at a given point. It determines the required
              breaking capacity of protective devices.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fundamental Formula</p>
              <p className="font-mono text-center text-lg mb-2">Ipf = V / Z<sub>total</sub></p>
              <p className="text-xs text-white/70 text-center">Where V is system voltage and Z is total impedance to fault point</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Components of Total Impedance</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Component</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Symbol</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Values</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Supply network</td>
                      <td className="border border-white/10 px-3 py-2">Zs(supply)</td>
                      <td className="border border-white/10 px-3 py-2">Very low (infinite busbar assumption)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Transformer</td>
                      <td className="border border-white/10 px-3 py-2">ZT</td>
                      <td className="border border-white/10 px-3 py-2">4-6% of transformer rating</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cables</td>
                      <td className="border border-white/10 px-3 py-2">Zc</td>
                      <td className="border border-white/10 px-3 py-2">Depends on length, size, type</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Switchgear</td>
                      <td className="border border-white/10 px-3 py-2">Zsw</td>
                      <td className="border border-white/10 px-3 py-2">Usually negligible</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Three-Phase Fault</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Highest fault current magnitude</li>
                  <li className="pl-1">Symmetrical fault - balanced currents</li>
                  <li className="pl-1">Ipf = VL / (√3 × Zph)</li>
                  <li className="pl-1">Determines device breaking capacity</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Single-Phase Fault</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Phase-to-earth or phase-to-neutral</li>
                  <li className="pl-1">Lower current than three-phase</li>
                  <li className="pl-1">If = Uo / Zs</li>
                  <li className="pl-1">Determines disconnection time</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design rule:</strong> Protective device breaking capacity must exceed Ipf at the point of installation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Transformer Impedance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Transformer Impedance and Fault Level
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The transformer is typically the dominant impedance limiting fault current.
              Percentage impedance (%Z) provides a convenient method for fault level estimation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Transformer Fault Current Formula</p>
              <p className="font-mono text-center text-lg mb-2">I<sub>fault</sub> = I<sub>FL</sub> / (%Z / 100)</p>
              <p className="text-xs text-white/70 text-center mt-2">
                Where I<sub>FL</sub> = kVA / (√3 × V<sub>L</sub>) for three-phase transformers
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Transformer Fault Levels (400V Secondary)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">%Z</th>
                      <th className="border border-white/10 px-3 py-2 text-left">FLC</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Fault Current</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100kVA</td>
                      <td className="border border-white/10 px-3 py-2">4%</td>
                      <td className="border border-white/10 px-3 py-2">144A</td>
                      <td className="border border-white/10 px-3 py-2">3.6kA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">250kVA</td>
                      <td className="border border-white/10 px-3 py-2">4%</td>
                      <td className="border border-white/10 px-3 py-2">361A</td>
                      <td className="border border-white/10 px-3 py-2">9kA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">500kVA</td>
                      <td className="border border-white/10 px-3 py-2">5%</td>
                      <td className="border border-white/10 px-3 py-2">722A</td>
                      <td className="border border-white/10 px-3 py-2">14.4kA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1000kVA</td>
                      <td className="border border-white/10 px-3 py-2">6%</td>
                      <td className="border border-white/10 px-3 py-2">1443A</td>
                      <td className="border border-white/10 px-3 py-2">24kA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2000kVA</td>
                      <td className="border border-white/10 px-3 py-2">6%</td>
                      <td className="border border-white/10 px-3 py-2">2887A</td>
                      <td className="border border-white/10 px-3 py-2">48kA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Converting %Z to Ohms:</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Z<sub>T</sub> (Ω) = (%Z / 100) × (V²<sub>L</sub> / S)</p>
                <p className="mt-2 text-white/70">Where S is transformer rating in VA and V<sub>L</sub> is line voltage</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> These are approximate values. Actual fault levels depend on supply network impedance and transformer exact characteristics.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Cable Impedance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Cable Impedance and Fault Level Reduction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable impedance comprises resistance (R) and reactance (X). As fault current flows
              through cables, voltage drop reduces available voltage and impedance limits current.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Resistance Values (Copper at 20°C)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Size (mm²)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">R (mΩ/m)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">R1+R2 for T&E*</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1.5</td>
                      <td className="border border-white/10 px-3 py-2">12.1</td>
                      <td className="border border-white/10 px-3 py-2">24.2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2.5</td>
                      <td className="border border-white/10 px-3 py-2">7.41</td>
                      <td className="border border-white/10 px-3 py-2">14.82</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4.0</td>
                      <td className="border border-white/10 px-3 py-2">4.61</td>
                      <td className="border border-white/10 px-3 py-2">9.22</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6.0</td>
                      <td className="border border-white/10 px-3 py-2">3.08</td>
                      <td className="border border-white/10 px-3 py-2">6.16</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10.0</td>
                      <td className="border border-white/10 px-3 py-2">1.83</td>
                      <td className="border border-white/10 px-3 py-2">3.66</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">16.0</td>
                      <td className="border border-white/10 px-3 py-2">1.15</td>
                      <td className="border border-white/10 px-3 py-2">2.30</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/70 mt-2">*R1+R2 values assume CPC is same size as line conductor</p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calculating Cable Impedance</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Resistance:</strong> R = r × L (mΩ/m × metres)</li>
                <li className="pl-1"><strong>Reactance:</strong> X ≈ 0.08 mΩ/m for small cables (often ignored)</li>
                <li className="pl-1"><strong>Impedance:</strong> Z = √(R² + X²) ≈ R for small cables</li>
                <li className="pl-1"><strong>Temperature:</strong> Multiply by 1.2 for operating temperature</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fault Current Along a Cable</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>At origin: Ipf = 15kA (from transformer)</p>
                <p className="mt-2">After 50m of 25mm² cable:</p>
                <p>Cable Z = 50m × 0.727mΩ/m × 2 = 72.7mΩ = 0.073Ω</p>
                <p className="mt-2">New fault level (approx):</p>
                <p>Ipf(reduced) ≈ 230 / (230/15000 + 0.073) = <strong>~12kA</strong></p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Fault current reduces rapidly along cable runs. This is beneficial for downstream device selection but must be verified for disconnection times.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Loop Impedance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Earth Fault Loop Impedance (Zs)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Earth fault loop impedance determines the fault current that flows during an earth fault.
              This current must be sufficient to operate the protective device within the required time.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Loop Impedance Formula</p>
              <p className="font-mono text-center text-lg mb-2">Zs = Ze + (R1 + R2)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 mt-3">
                <li className="pl-1"><strong>Ze:</strong> External earth fault loop impedance</li>
                <li className="pl-1"><strong>R1:</strong> Resistance of phase conductor</li>
                <li className="pl-1"><strong>R2:</strong> Resistance of protective conductor (CPC)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DNO Declared Ze Values</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Maximum Ze</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TN-C-S (PME)</td>
                      <td className="border border-white/10 px-3 py-2">0.35Ω</td>
                      <td className="border border-white/10 px-3 py-2">Most common UK supply</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TN-S</td>
                      <td className="border border-white/10 px-3 py-2">0.80Ω</td>
                      <td className="border border-white/10 px-3 py-2">Separate earth conductor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">TT</td>
                      <td className="border border-white/10 px-3 py-2">21Ω (typical RA)</td>
                      <td className="border border-white/10 px-3 py-2">Depends on electrode</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Verification Process</p>
              <div className="p-4 rounded-lg bg-white/5">
                <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                  <li className="pl-1"><strong>Calculate Zs:</strong> Zs = Ze + (R1+R2) from design data</li>
                  <li className="pl-1"><strong>Apply factor:</strong> Zs(operating) = Zs × 1.2 (temperature)</li>
                  <li className="pl-1"><strong>Check against limit:</strong> Compare with BS 7671 Table 41.2-41.4</li>
                  <li className="pl-1"><strong>Verify disconnection:</strong> Ensure Zs ≤ maximum for device</li>
                  <li className="pl-1"><strong>Test on site:</strong> Measured Zs must be ≤ calculated value</li>
                </ol>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maximum Zs for 0.4s Disconnection (230V, TN)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Device</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Rating (A)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Max Zs (Ω)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type B MCB</td>
                      <td className="border border-white/10 px-3 py-2">6</td>
                      <td className="border border-white/10 px-3 py-2">7.67</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type B MCB</td>
                      <td className="border border-white/10 px-3 py-2">16</td>
                      <td className="border border-white/10 px-3 py-2">2.87</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type B MCB</td>
                      <td className="border border-white/10 px-3 py-2">32</td>
                      <td className="border border-white/10 px-3 py-2">1.44</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type C MCB</td>
                      <td className="border border-white/10 px-3 py-2">16</td>
                      <td className="border border-white/10 px-3 py-2">1.44</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type C MCB</td>
                      <td className="border border-white/10 px-3 py-2">32</td>
                      <td className="border border-white/10 px-3 py-2">0.72</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Important:</strong> If calculated Zs exceeds the maximum value, use RCD protection (≤30mA for additional protection) or increase conductor sizes.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Transformer Fault Level</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> Calculate the prospective fault current at the secondary terminals of a 800kVA, 11kV/400V transformer with 5.5% impedance.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Calculate full load current</p>
                <p>I<sub>FL</sub> = S / (√3 × V<sub>L</sub>)</p>
                <p>I<sub>FL</sub> = 800,000 / (1.732 × 400) = <strong>1155A</strong></p>
                <p className="mt-2">Step 2: Calculate fault current</p>
                <p>I<sub>fault</sub> = I<sub>FL</sub> / (%Z / 100)</p>
                <p>I<sub>fault</sub> = 1155 / 0.055 = <strong>21kA</strong></p>
                <p className="mt-2 text-green-400">→ Switchgear must have minimum 25kA rating</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Zs Calculation and Verification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 20A Type B MCB protects 25m of 2.5mm² T&E cable. Ze = 0.35Ω. Verify protection is adequate.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Calculate circuit impedance</p>
                <p>R1+R2 = 25m × 14.82 mΩ/m = 370.5 mΩ = <strong>0.371Ω</strong></p>
                <p className="mt-2">Step 2: Calculate total Zs</p>
                <p>Zs = Ze + (R1+R2) = 0.35 + 0.371 = <strong>0.721Ω</strong></p>
                <p className="mt-2">Step 3: Apply temperature factor</p>
                <p>Zs(operating) = 0.721 × 1.2 = <strong>0.865Ω</strong></p>
                <p className="mt-2">Step 4: Check against maximum</p>
                <p>From Table 41.3: Max Zs for 20A Type B = 2.30Ω</p>
                <p className="mt-2">0.865Ω &lt; 2.30Ω <span className="text-green-400">✓ Protection adequate</span></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Sub-Distribution Fault Level</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A sub-board is fed by 30m of 35mm² SWA from a main board where Ipf = 18kA. Calculate Ipf at the sub-board.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Step 1: Source impedance at main board</p>
                <p>Z<sub>source</sub> = V / Ipf = 230 / 18000 = <strong>0.0128Ω</strong></p>
                <p className="mt-2">Step 2: Cable impedance (35mm² copper ≈ 0.524 mΩ/m)</p>
                <p>Z<sub>cable</sub> = 30m × 0.524 × 2 = 31.44 mΩ = <strong>0.0314Ω</strong></p>
                <p className="mt-2">Step 3: Total impedance</p>
                <p>Z<sub>total</sub> = 0.0128 + 0.0314 = <strong>0.0442Ω</strong></p>
                <p className="mt-2">Step 4: Fault current at sub-board</p>
                <p>Ipf = 230 / 0.0442 = <strong>5.2kA</strong></p>
                <p className="mt-2 text-white/60">→ 6kA MCBs adequate at sub-board</p>
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
                <li className="pl-1"><strong>Ipf = V/Z</strong> — Prospective fault current</li>
                <li className="pl-1"><strong>I<sub>fault</sub> = FLC / (%Z/100)</strong> — Transformer fault</li>
                <li className="pl-1"><strong>Zs = Ze + (R1+R2)</strong> — Loop impedance</li>
                <li className="pl-1"><strong>If = Uo/Zs</strong> — Earth fault current</li>
                <li className="pl-1"><strong>Zs × 1.2</strong> — Temperature correction</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">TN-C-S Ze maximum: <strong>0.35Ω</strong></li>
                <li className="pl-1">TN-S Ze maximum: <strong>0.80Ω</strong></li>
                <li className="pl-1">Temperature factor: <strong>×1.2</strong></li>
                <li className="pl-1">Cmin voltage factor: <strong>0.95</strong></li>
                <li className="pl-1">2.5mm² R1+R2: <strong>14.82 mΩ/m</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Forgetting factor of 2</strong> — R1+R2 includes both conductors</li>
                <li className="pl-1"><strong>Wrong units</strong> — Convert mΩ/m to Ω for calculations</li>
                <li className="pl-1"><strong>Ignoring temperature</strong> — Use 1.2 factor for verification</li>
                <li className="pl-1"><strong>Using measured Ze for design</strong> — Use DNO declared values</li>
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
                <p className="font-medium text-white mb-1">Fault Current Sources</p>
                <ul className="space-y-0.5">
                  <li>Transformer: FLC / (%Z/100)</li>
                  <li>Cable reduces Ipf with distance</li>
                  <li>Origin: highest Ipf (breaking)</li>
                  <li>End: lowest If (disconnection)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Loop Impedance (Zs)</p>
                <ul className="space-y-0.5">
                  <li>Zs = Ze + (R1+R2)</li>
                  <li>TN-C-S: Ze ≤ 0.35Ω</li>
                  <li>Verify: Zs × 1.2 ≤ max</li>
                  <li>If = 230/Zs for fault current</li>
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
            <Link to="../h-n-c-module4-section3-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Protective Device Selection
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section3-4">
              Next: Discrimination and Coordination
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section3_3;
