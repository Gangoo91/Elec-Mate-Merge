import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Short-Circuit Withstand - HNC Module 4 Section 2.4";
const DESCRIPTION = "Master the adiabatic equation, let-through energy calculations and protective device coordination for cable fault protection in building services.";

const quickCheckQuestions = [
  {
    id: "adiabatic-purpose",
    question: "What does the adiabatic equation determine for cable protection?",
    options: ["Cable voltage drop", "Minimum cable size to withstand fault current for disconnection time", "Maximum cable length", "Cable grouping factor"],
    correctIndex: 1,
    explanation: "The adiabatic equation S = √(I²t)/k determines the minimum conductor cross-sectional area (S) required to withstand the thermal energy from fault current without damage."
  },
  {
    id: "k-value-meaning",
    question: "What does the 'k' value in the adiabatic equation represent?",
    options: ["Kiloamps of fault current", "Cable thermal constant based on conductor and insulation materials", "Kelvin temperature rise", "Correction factor for ambient"],
    correctIndex: 1,
    explanation: "The k value is a constant that depends on the conductor material (copper/aluminium) and insulation type (PVC/XLPE). It represents the cable's ability to absorb thermal energy."
  },
  {
    id: "i2t-definition",
    question: "What is I²t (let-through energy)?",
    options: ["Current squared times temperature", "Total energy let through by a protective device during fault clearance", "Installation test current", "Impedance squared times time"],
    correctIndex: 1,
    explanation: "I²t is the let-through energy - the thermal stress the protective device allows through to the cable during fault clearance. Lower I²t values mean better cable protection."
  },
  {
    id: "fault-withstand-check",
    question: "For a cable to be adequately protected against fault current, which condition must be satisfied?",
    options: ["I²t ≥ k²S²", "k²S² ≥ I²t", "S ≥ I²t", "k ≥ I²t"],
    correctIndex: 1,
    explanation: "The cable's thermal withstand (k²S²) must be greater than or equal to the let-through energy (I²t) of the protective device. This ensures the cable won't be damaged during a fault."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the adiabatic equation used in cable fault protection?",
    options: [
      "S = I × t",
      "S = √(I²t) / k",
      "S = I² × t × k",
      "S = k × I × t"
    ],
    correctAnswer: 1,
    explanation: "S = √(I²t) / k gives the minimum conductor size (S in mm²) where I is fault current, t is disconnection time, and k is the cable thermal constant."
  },
  {
    id: 2,
    question: "The k value for copper conductors with PVC insulation (70°C) is:",
    options: [
      "76",
      "100",
      "115",
      "143"
    ],
    correctAnswer: 2,
    explanation: "From BS 7671 Table 43.1: k = 115 for copper conductors with 70°C PVC insulation. This is a commonly used value in building services calculations."
  },
  {
    id: 3,
    question: "A 4mm² copper/PVC cable (k=115) has what maximum I²t withstand?",
    options: [
      "460 A²s",
      "2,116 A²s",
      "211,600 A²s",
      "1,840 A²s"
    ],
    correctAnswer: 2,
    explanation: "Maximum I²t = k²S² = 115² × 4² = 13,225 × 16 = 211,600 A²s. This is the thermal energy limit the cable can withstand."
  },
  {
    id: 4,
    question: "Why is fault current highest at the origin of an installation?",
    options: [
      "More protective devices",
      "Lower cable impedance between supply and fault point",
      "Higher voltage at origin",
      "Larger cables are used"
    ],
    correctAnswer: 1,
    explanation: "Fault current is inversely proportional to circuit impedance. At the origin, there's minimal impedance between the supply transformer and fault point, resulting in maximum fault current."
  },
  {
    id: 5,
    question: "What happens to fault withstand time (t) if cable size is doubled?",
    options: [
      "Time doubles",
      "Time halves",
      "Time quadruples",
      "Time remains the same"
    ],
    correctAnswer: 2,
    explanation: "From t = k²S²/I², if S doubles (×2), then S² quadruples (×4). The permissible fault duration increases by a factor of 4 for a given fault current."
  },
  {
    id: 6,
    question: "An MCB has I²t let-through of 50,000 A²s. Which cable sizes are protected? (k=115)",
    options: [
      "1.5mm² and above",
      "2.5mm² and above",
      "4mm² and above",
      "6mm² and above"
    ],
    correctAnswer: 0,
    explanation: "Required S = √(50,000)/115 = 223.6/115 = 1.95mm². Therefore 2.5mm² is the minimum (1.5mm² is marginal at k²S² = 29,756 A²s). In practice, 2.5mm² would be specified."
  },
  {
    id: 7,
    question: "What is 'current limitation' by an MCB?",
    options: [
      "Reducing normal operating current",
      "Tripping before prospective fault current reaches peak",
      "Limiting cable heating during normal use",
      "Reducing voltage drop"
    ],
    correctAnswer: 1,
    explanation: "Current-limiting MCBs trip so quickly that they disconnect before the prospective fault current reaches its peak value. This significantly reduces the I²t let-through energy."
  },
  {
    id: 8,
    question: "Why do XLPE cables have higher k values than PVC?",
    options: [
      "XLPE is more conductive",
      "XLPE can withstand higher temperatures (90°C vs 70°C) before damage",
      "XLPE has lower resistance",
      "XLPE is thinner"
    ],
    correctAnswer: 1,
    explanation: "XLPE insulation can withstand higher temperatures (250°C short-circuit limit vs 160°C for PVC). This allows the conductor to absorb more thermal energy, giving k = 143 for copper/XLPE."
  },
  {
    id: 9,
    question: "At what point in a circuit is fault current verification most critical?",
    options: [
      "At the load",
      "Mid-way along the cable",
      "At the origin (closest to supply)",
      "At the distribution board"
    ],
    correctAnswer: 2,
    explanation: "The highest fault current occurs at the origin where impedance is lowest. If the cable can withstand this maximum fault, it's protected throughout its length."
  },
  {
    id: 10,
    question: "A 6kA fault lasting 0.1s flows through a cable. What is the I²t?",
    options: [
      "600 A²s",
      "60,000 A²s",
      "3,600,000 A²s",
      "360,000 A²s"
    ],
    correctAnswer: 2,
    explanation: "I²t = I² × t = 6000² × 0.1 = 36,000,000 × 0.1 = 3,600,000 A²s. This would require careful verification that cable k²S² exceeds this value."
  }
];

const faqs = [
  {
    question: "What is the difference between prospective fault current and let-through current?",
    answer: "Prospective fault current (PSCC) is the theoretical maximum current that would flow if the protective device didn't operate - it depends on supply impedance. Let-through current is the actual peak current that flows before the device trips. Current-limiting devices can significantly reduce let-through below prospective levels."
  },
  {
    question: "When is adiabatic calculation unnecessary?",
    answer: "Adiabatic calculations can be avoided when using manufacturer's I²t data that confirms cable protection, or when cable has been selected using BS 7671 tables that inherently include fault protection for the installation method. However, for high fault levels or long disconnection times, explicit verification is good practice."
  },
  {
    question: "How do I find the I²t let-through of a protective device?",
    answer: "Manufacturer data sheets provide I²t characteristics, often as curves showing I²t vs prospective fault current. For MCBs, the I²t values are typically given at maximum rated fault current. For fuses, I²t varies with prospective current - lower fault currents mean longer clearance times and higher I²t."
  },
  {
    question: "What if my cable fails the adiabatic check?",
    answer: "Options include: 1) Use a larger cable size (increases k²S²), 2) Use a more current-limiting protective device (reduces I²t), 3) Use cable with higher temperature rating like XLPE (higher k value), or 4) Reduce fault level by increasing supply impedance (add impedance or use longer/smaller incoming cable)."
  },
  {
    question: "Does the neutral conductor need fault withstand verification?",
    answer: "Yes, neutral conductors can carry fault current during line-to-neutral faults. For circuits with reduced neutral (e.g., 4-core with reduced neutral), ensure the neutral can withstand the fault energy. Line-to-neutral faults may have lower current than line-to-line faults due to higher loop impedance."
  },
  {
    question: "What k value applies to the CPC (protective conductor)?",
    answer: "The CPC uses different k values from Table 54.3 because it only carries current during faults. For example, copper CPC with PVC insulation: k = 115 (same as line conductor). Steel conduit as CPC has k = 47. The CPC must also satisfy the adiabatic equation for earth fault current."
  }
];

const HNCModule4Section2_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section2">
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
            <span>Module 4.2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Short-Circuit Withstand
          </h1>
          <p className="text-white/80">
            Ensuring cables can safely withstand fault currents until protective devices operate
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Adiabatic equation:</strong> S = √(I²t) / k</li>
              <li className="pl-1"><strong>k²S² ≥ I²t:</strong> Cable must withstand device let-through</li>
              <li className="pl-1"><strong>k values:</strong> Cu/PVC = 115, Cu/XLPE = 143</li>
              <li className="pl-1"><strong>I²t:</strong> Thermal energy from fault current × time</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>High fault levels:</strong> Near main switchboards</li>
              <li className="pl-1"><strong>Motor circuits:</strong> High inrush currents</li>
              <li className="pl-1"><strong>Sub-mains:</strong> Short cables, high PSCC</li>
              <li className="pl-1"><strong>MCCBs/fuses:</strong> Different I²t characteristics</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply the adiabatic equation to verify cable fault protection",
              "Use k values from BS 7671 for different conductor and insulation types",
              "Calculate cable thermal withstand (k²S²)",
              "Understand I²t let-through energy from protective devices",
              "Verify protective device coordination with cable size",
              "Determine minimum cable sizes for given fault levels"
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

        {/* Section 1: The Adiabatic Equation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Adiabatic Equation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              During a fault, massive current flows through the cable for a short time before the
              protective device operates. This current causes rapid heating. The adiabatic equation
              ensures the cable won't be damaged before the fault is cleared.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Adiabatic Equation</p>
              <div className="bg-black/30 p-4 rounded text-center">
                <p className="font-mono text-xl mb-2">S = √(I²t) / k</p>
                <p className="text-sm text-white/70">Or rearranged: k²S² ≥ I²t</p>
              </div>
              <div className="mt-3 text-sm text-white/80 grid sm:grid-cols-2 gap-2">
                <div>
                  <p><strong>S</strong> = conductor cross-sectional area (mm²)</p>
                  <p><strong>I</strong> = fault current (A)</p>
                </div>
                <div>
                  <p><strong>t</strong> = disconnection time (s)</p>
                  <p><strong>k</strong> = cable thermal constant</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why 'Adiabatic'?</p>
              <p className="text-sm text-white">
                The term 'adiabatic' means no heat transfer. During a very short fault (typically &lt;5 seconds),
                the heating is so rapid that heat doesn't have time to dissipate from the conductor -
                it's all absorbed by the conductor itself. This is the worst-case thermal scenario.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Regulation 434.5.2</p>
              <p className="text-sm text-white italic">
                "The characteristics of protective devices protecting a conductor against fault current
                shall be such that the energy let through (I²t) does not exceed that which the conductor
                can withstand (k²S²)."
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Simple rule:</strong> Cable withstand (k²S²) must be greater than device let-through (I²t).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: k Values and Thermal Constants */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            k Values and Thermal Constants
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The k value depends on the conductor material and insulation type. It represents the
              cable's thermal capacity - higher k values indicate better ability to absorb fault energy
              without damage.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">k Values from BS 7671 Table 43.1</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Conductor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Insulation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">k Value</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Max Temp (°C)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Copper</td>
                      <td className="border border-white/10 px-3 py-2">PVC 70°C</td>
                      <td className="border border-white/10 px-3 py-2 font-medium">115</td>
                      <td className="border border-white/10 px-3 py-2">160</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Copper</td>
                      <td className="border border-white/10 px-3 py-2">XLPE 90°C</td>
                      <td className="border border-white/10 px-3 py-2 font-medium text-green-400">143</td>
                      <td className="border border-white/10 px-3 py-2">250</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Copper</td>
                      <td className="border border-white/10 px-3 py-2">Rubber 60°C</td>
                      <td className="border border-white/10 px-3 py-2">100</td>
                      <td className="border border-white/10 px-3 py-2">200</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Copper</td>
                      <td className="border border-white/10 px-3 py-2">Mineral (bare)</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">135</td>
                      <td className="border border-white/10 px-3 py-2">250</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Aluminium</td>
                      <td className="border border-white/10 px-3 py-2">PVC 70°C</td>
                      <td className="border border-white/10 px-3 py-2 text-orange-400">76</td>
                      <td className="border border-white/10 px-3 py-2">160</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Aluminium</td>
                      <td className="border border-white/10 px-3 py-2">XLPE 90°C</td>
                      <td className="border border-white/10 px-3 py-2">94</td>
                      <td className="border border-white/10 px-3 py-2">250</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calculating k²S²</p>
              <p className="text-sm text-white mb-2">
                The cable's fault energy withstand is k²S². Here are examples for common sizes (Cu/PVC, k=115):
              </p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <ul className="text-white space-y-1">
                    <li>1.5mm²: 115² × 1.5² = <strong>29,756 A²s</strong></li>
                    <li>2.5mm²: 115² × 2.5² = <strong>82,656 A²s</strong></li>
                    <li>4mm²: 115² × 4² = <strong>211,600 A²s</strong></li>
                  </ul>
                </div>
                <div>
                  <ul className="text-white space-y-1">
                    <li>6mm²: 115² × 6² = <strong>476,100 A²s</strong></li>
                    <li>10mm²: 115² × 10² = <strong>1,322,500 A²s</strong></li>
                    <li>16mm²: 115² × 16² = <strong>3,385,600 A²s</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>XLPE advantage:</strong> With k = 143 vs PVC k = 115, XLPE cables have ~55% higher fault withstand capacity for the same conductor size.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Let-Through Energy (I²t) */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Let-Through Energy (I²t)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The let-through energy I²t is the thermal stress the protective device allows the cable
              to experience during fault clearance. It depends on the fault current level and how
              quickly the device operates.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">I²t Calculation</p>
              <div className="bg-black/30 p-3 rounded text-center font-mono text-lg">
                <p>I²t = I² × t</p>
              </div>
              <p className="text-xs text-white/60 mt-2 text-center">Where I = RMS fault current (A) and t = disconnection time (s)</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical I²t Values by Device Type</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Device</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical I²t (A²s)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Min Cable (Cu/PVC)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCB Type B</td>
                      <td className="border border-white/10 px-3 py-2">16A</td>
                      <td className="border border-white/10 px-3 py-2">15,000</td>
                      <td className="border border-white/10 px-3 py-2">1.5mm²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCB Type B</td>
                      <td className="border border-white/10 px-3 py-2">32A</td>
                      <td className="border border-white/10 px-3 py-2">35,000</td>
                      <td className="border border-white/10 px-3 py-2">2.5mm²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCB Type C</td>
                      <td className="border border-white/10 px-3 py-2">32A</td>
                      <td className="border border-white/10 px-3 py-2">50,000</td>
                      <td className="border border-white/10 px-3 py-2">2.5mm²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BS 88 Fuse</td>
                      <td className="border border-white/10 px-3 py-2">32A</td>
                      <td className="border border-white/10 px-3 py-2">8,000</td>
                      <td className="border border-white/10 px-3 py-2">1.5mm²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCCB</td>
                      <td className="border border-white/10 px-3 py-2">63A</td>
                      <td className="border border-white/10 px-3 py-2">150,000</td>
                      <td className="border border-white/10 px-3 py-2">4mm²</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">MCCB</td>
                      <td className="border border-white/10 px-3 py-2">100A</td>
                      <td className="border border-white/10 px-3 py-2">300,000</td>
                      <td className="border border-white/10 px-3 py-2">6mm²</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Current-Limiting Devices</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Trip before peak current reached</li>
                  <li className="pl-1">Significantly reduce I²t let-through</li>
                  <li className="pl-1">BS 88 HRC fuses are excellent limiters</li>
                  <li className="pl-1">Some MCCBs have current-limiting features</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Factors Affecting I²t</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Higher PSCC = faster operation = lower I²t</li>
                  <li className="pl-1">Lower PSCC = slower operation = higher I²t</li>
                  <li className="pl-1">Device type (fuse vs MCB vs MCCB)</li>
                  <li className="pl-1">Device manufacturer and model</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Note:</strong> I²t values vary with prospective fault current. Always check manufacturer data for the actual installation PSCC.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Protective Device Coordination */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Protective Device Coordination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              For complete protection, the cable's thermal withstand must exceed the protective device's
              let-through energy at all possible fault levels. This is verified using the k²S² ≥ I²t check.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Verification Process</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1">Determine the prospective short-circuit current (PSCC) at the circuit origin</li>
                <li className="pl-1">Find the protective device I²t at this PSCC from manufacturer data</li>
                <li className="pl-1">Calculate cable k²S² using conductor size and k value</li>
                <li className="pl-1">Verify that k²S² ≥ I²t</li>
                <li className="pl-1">If not satisfied, increase cable size or use more current-limiting device</li>
              </ol>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example Verification</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Circuit: 32A MCB Type B protecting 4mm² Cu/PVC cable</p>
                <p>PSCC at origin: 6kA</p>
                <p className="mt-2">MCB I²t at 6kA (from data): 35,000 A²s</p>
                <p className="mt-2">Cable k²S² = 115² × 4² = <strong>211,600 A²s</strong></p>
                <p className="mt-2">Check: 211,600 ≥ 35,000</p>
                <p className="text-green-400">✓ Cable adequately protected</p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <p className="text-sm font-medium text-orange-400 mb-2">High Fault Level Warning</p>
              <p className="text-sm text-white">
                Near main switchboards, PSCC can exceed 20kA. At these levels:
              </p>
              <ul className="text-sm text-white mt-2 space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">I²t values increase significantly</li>
                <li className="pl-1">Small cables may not be adequately protected</li>
                <li className="pl-1">Use current-limiting fuses (BS 88) where possible</li>
                <li className="pl-1">Verify coordination carefully for sub-main cables</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maximum Disconnection Time Check</p>
              <p className="text-sm text-white mb-2">
                Alternatively, calculate the maximum time the cable can withstand a given fault current:
              </p>
              <div className="bg-black/30 p-3 rounded text-center font-mono">
                <p>t<sub>max</sub> = k²S² / I²</p>
              </div>
              <p className="text-xs text-white/60 mt-2">
                The protective device must operate within this time at the given fault current.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Using XLPE cables (k=143) instead of PVC (k=115) provides approximately 55% more fault withstand margin.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Minimum Cable Size for MCB</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An MCB has I²t = 45,000 A²s. What is the minimum Cu/PVC cable size?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Using S = √(I²t) / k</p>
                <p>S = √(45,000) / 115</p>
                <p>S = 212.1 / 115 = <strong>1.84mm²</strong></p>
                <p className="mt-2">Next standard size up: <strong>2.5mm²</strong></p>
                <p className="mt-2 text-white/60">Verify: k²S² = 115² × 2.5² = 82,656 A²s</p>
                <p className="text-green-400">82,656 ≥ 45,000 ✓</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Maximum Fault Time</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 6mm² Cu/XLPE cable experiences a 5kA fault. What is the maximum permissible disconnection time?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>k for Cu/XLPE = 143</p>
                <p>k²S² = 143² × 6² = 20,449 × 36 = <strong>736,164 A²s</strong></p>
                <p className="mt-2">t = k²S² / I²</p>
                <p>t = 736,164 / 5000²</p>
                <p>t = 736,164 / 25,000,000</p>
                <p>t = <strong>0.029s (29ms)</strong></p>
                <p className="mt-2 text-white/60">→ Protective device must clear within 29ms at 5kA</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Sub-Main Verification</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> 100A MCCB protects 25mm² Cu/PVC sub-main. PSCC = 15kA. I²t from data = 800,000 A²s. Is cable protected?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Cable k²S² = 115² × 25² = 13,225 × 625</p>
                <p>k²S² = <strong>8,265,625 A²s</strong></p>
                <p className="mt-2">Check: 8,265,625 ≥ 800,000</p>
                <p className="text-green-400">✓ Cable adequately protected (10× margin)</p>
                <p className="mt-2 text-white/60">Note: Large margin allows for higher PSCC or different MCCB</p>
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
                <li className="pl-1"><strong>S = √(I²t) / k</strong> — Minimum cable size</li>
                <li className="pl-1"><strong>k²S² ≥ I²t</strong> — Protection verification</li>
                <li className="pl-1"><strong>t = k²S² / I²</strong> — Maximum disconnection time</li>
                <li className="pl-1"><strong>I²t = I² × t</strong> — Let-through energy</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key k Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Copper/PVC: k = <strong>115</strong></li>
                <li className="pl-1">Copper/XLPE: k = <strong>143</strong></li>
                <li className="pl-1">Aluminium/PVC: k = <strong>76</strong></li>
                <li className="pl-1">Steel conduit (as CPC): k = <strong>47</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Wrong k value:</strong> Must match actual conductor and insulation</li>
                <li className="pl-1"><strong>Ignoring PSCC variation:</strong> I²t changes with fault level</li>
                <li className="pl-1"><strong>Forgetting the CPC:</strong> Protective conductor also needs verification</li>
                <li className="pl-1"><strong>Using peak current:</strong> Use RMS fault current in calculations</li>
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
                <p className="font-medium text-white mb-1">The Adiabatic Equation</p>
                <ul className="space-y-0.5">
                  <li>S = √(I²t) / k for minimum size</li>
                  <li>k²S² ≥ I²t for protection check</li>
                  <li>t = k²S² / I² for max time</li>
                  <li>Higher k = better withstand</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Quick k²S² (Cu/PVC k=115)</p>
                <ul className="space-y-0.5">
                  <li>1.5mm²: ~30,000 A²s</li>
                  <li>2.5mm²: ~83,000 A²s</li>
                  <li>4mm²: ~212,000 A²s</li>
                  <li>6mm²: ~476,000 A²s</li>
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
            <Link to="../h-n-c-module4-section2-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Prev: Thermal Constraints
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section2-5">
              Next: Cable Types and Selection
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section2_4;
