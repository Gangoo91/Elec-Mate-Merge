import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Power Factor Correction - HNC Module 7 Section 5.2";
const DESCRIPTION = "Master power factor correction for industrial installations: reactive power fundamentals, capacitor bank sizing, automatic PFC systems, detuned reactors for harmonic environments, and installation requirements per BS 7671.";

const quickCheckQuestions = [
  {
    id: "reactive-power",
    question: "What is reactive power (kVAr)?",
    options: ["Power consumed by resistive loads", "Power oscillating between source and inductive/capacitive loads", "Power lost as heat in cables", "The total power supplied by the utility"],
    correctIndex: 1,
    explanation: "Reactive power (kVAr) represents energy that oscillates between the source and reactive components (inductors and capacitors). It does no useful work but is essential for establishing magnetic and electric fields in AC circuits."
  },
  {
    id: "pf-calculation",
    question: "An installation draws 150 kW at 0.75 power factor lagging. What is the apparent power (kVA)?",
    options: ["112.5 kVA", "150 kVA", "175 kVA", "200 kVA"],
    correctIndex: 3,
    explanation: "Apparent power S = P / pf = 150 / 0.75 = 200 kVA. This demonstrates why poor power factor increases the apparent power demand on the supply system."
  },
  {
    id: "capacitor-sizing",
    question: "To correct power factor from 0.8 to 0.95 for a 100 kW load, which value is closest to the required kVAr?",
    options: ["25 kVAr", "42 kVAr", "55 kVAr", "75 kVAr"],
    correctIndex: 1,
    explanation: "kVAr = P × (tan φ₁ - tan φ₂) = 100 × (tan 36.87° - tan 18.19°) = 100 × (0.75 - 0.329) = 42.1 kVAr. This calculation is fundamental to capacitor bank sizing."
  },
  {
    id: "detuned-reactor",
    question: "Why are detuned reactors used with capacitor banks in harmonic-rich environments?",
    options: ["To increase the capacitor voltage rating", "To prevent harmonic resonance and capacitor damage", "To reduce the physical size of capacitors", "To eliminate the need for protection devices"],
    correctIndex: 1,
    explanation: "Detuned reactors shift the resonant frequency of the capacitor bank below the lowest significant harmonic (typically 189 Hz for 7% detuning), preventing dangerous harmonic amplification and protecting capacitors from overload."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the relationship between power factor (pf), real power (P), and apparent power (S)?",
    options: [
      "pf = S / P",
      "pf = P / S",
      "pf = P × S",
      "pf = P - S"
    ],
    correctAnswer: 1,
    explanation: "Power factor is the ratio of real power (kW) to apparent power (kVA): pf = P / S = cos φ. This dimensionless ratio ranges from 0 to 1, with 1 being unity power factor."
  },
  {
    id: 2,
    question: "A factory has a maximum demand of 500 kVA at 0.7 pf lagging. What is the reactive power demand?",
    options: ["250 kVAr", "350 kVAr", "357 kVAr", "500 kVAr"],
    correctAnswer: 2,
    explanation: "Q = S × sin φ. First find φ from cos φ = 0.7, so φ = 45.57°, sin φ = 0.714. Therefore Q = 500 × 0.714 = 357 kVAr."
  },
  {
    id: 3,
    question: "What is the main financial benefit of power factor correction for industrial consumers?",
    options: [
      "Reduced lighting costs",
      "Lower reactive power charges and maximum demand penalties",
      "Cheaper electricity unit rates",
      "Reduced maintenance costs"
    ],
    correctAnswer: 1,
    explanation: "Electricity suppliers charge penalties for poor power factor (typically below 0.95) through reactive power charges (kVAr) and increased maximum demand charges (kVA). PFC reduces both."
  },
  {
    id: 4,
    question: "An installation requires 80 kVAr of correction. Which capacitor bank configuration would be most suitable for varying loads?",
    options: [
      "Single 80 kVAr fixed capacitor",
      "Two 40 kVAr fixed capacitors",
      "Automatic PFC with 8 × 10 kVAr stages",
      "One 100 kVAr capacitor with reduced voltage"
    ],
    correctAnswer: 2,
    explanation: "Automatic PFC with multiple stages (8 × 10 kVAr = 80 kVAr) provides stepped correction matching the varying reactive power demand, preventing over-correction which would cause leading power factor."
  },
  {
    id: 5,
    question: "What is the typical target power factor for UK industrial installations?",
    options: ["0.85 lagging", "0.90 lagging", "0.95 lagging or better", "Unity (1.0)"],
    correctAnswer: 2,
    explanation: "UK electricity suppliers typically require 0.95 lagging or better to avoid reactive power charges. Correcting beyond 0.98 is often not cost-effective and risks leading power factor at light loads."
  },
  {
    id: 6,
    question: "A 7% detuned reactor is used with a PFC capacitor bank. At what frequency is the system tuned?",
    options: ["50 Hz", "150 Hz", "189 Hz", "250 Hz"],
    correctAnswer: 2,
    explanation: "7% detuning means the resonant frequency fr = 50 / √0.07 = 50 / 0.265 = 189 Hz. This is below the 5th harmonic (250 Hz), preventing resonance with common harmonics."
  },
  {
    id: 7,
    question: "Which BS standard specifically covers capacitor installations for power factor correction?",
    options: ["BS 7671", "BS EN 61921", "BS EN 60831", "Both BS EN 61921 and BS EN 60831"],
    correctAnswer: 3,
    explanation: "BS EN 61921 covers capacitor installation design and application, while BS EN 60831 specifies capacitor construction and testing. Both are essential references for PFC installations."
  },
  {
    id: 8,
    question: "What protection device is essential for capacitor bank installations?",
    options: [
      "RCD only",
      "HRC fuses or MCCBs rated for capacitor switching duty",
      "Standard MCBs",
      "Earth leakage relay only"
    ],
    correctAnswer: 1,
    explanation: "HRC fuses or MCCBs with adequate breaking capacity and rated for capacitor switching duty are essential. Standard MCBs may not handle capacitor inrush currents (up to 200× rated current) safely."
  },
  {
    id: 9,
    question: "An automatic PFC controller measures which parameters to determine capacitor switching?",
    options: [
      "Voltage only",
      "Current and power factor",
      "Temperature only",
      "Frequency only"
    ],
    correctAnswer: 1,
    explanation: "Automatic PFC controllers measure load current via CT and system voltage to calculate the power factor continuously. They then switch capacitor stages in/out to maintain the target power factor."
  },
  {
    id: 10,
    question: "What is the minimum safe discharge time for capacitors before maintenance work?",
    options: ["30 seconds", "1 minute", "3 minutes (or 5 minutes per BS 7671)", "10 minutes"],
    correctAnswer: 2,
    explanation: "BS 7671 requires capacitors to discharge to 50V or less within 5 minutes (3 minutes per some manufacturer specifications). Discharge resistors are mandatory to ensure safe voltage decay."
  },
  {
    id: 11,
    question: "What happens if capacitors are switched in when not required (over-correction)?",
    options: [
      "Nothing, excess capacitance is beneficial",
      "Leading power factor causing voltage rise and potential utility penalties",
      "Capacitors automatically disconnect",
      "Power factor improves further"
    ],
    correctAnswer: 1,
    explanation: "Over-correction causes leading power factor, which raises system voltage and can attract utility penalties. It may also cause resonance issues. Automatic PFC prevents this by matching correction to demand."
  },
  {
    id: 12,
    question: "Calculate the kVAr required to correct a 200 kW load from 0.75 to 0.95 power factor.",
    options: [
      "85 kVAr",
      "111 kVAr",
      "132 kVAr",
      "150 kVAr"
    ],
    correctAnswer: 1,
    explanation: "kVAr = P × (tan φ₁ - tan φ₂). At pf 0.75: φ₁ = 41.41°, tan φ₁ = 0.882. At pf 0.95: φ₂ = 18.19°, tan φ₂ = 0.329. kVAr = 200 × (0.882 - 0.329) = 200 × 0.553 = 110.6 kVAr ≈ 111 kVAr."
  }
];

const faqs = [
  {
    question: "When should fixed capacitors be used instead of automatic PFC?",
    answer: "Fixed capacitors are suitable for constant loads such as large motors running continuously at steady load. They are simpler and cheaper but cannot adapt to varying loads. For installations with fluctuating demand (most industrial sites), automatic PFC with multiple switched stages is preferred to avoid over-correction during light load periods."
  },
  {
    question: "How do I determine if detuned reactors are necessary?",
    answer: "Detuned reactors are essential when total harmonic distortion (THD) exceeds 5%, or when VSD drives, UPS systems, LED lighting, or other non-linear loads represent more than 20% of the connected load. Without detuning, harmonic currents can cause capacitor overheating, premature failure, and dangerous resonance. A power quality survey should be conducted before specifying PFC equipment."
  },
  {
    question: "What maintenance do PFC systems require?",
    answer: "Annual maintenance should include: visual inspection for swelling or leakage, thermal imaging to identify hotspots, capacitance measurement (replace if more than 5% reduction), contactor contact inspection, controller calibration check, discharge resistor verification, and cleaning of ventilation. Capacitors typically have a 10-15 year service life depending on operating conditions."
  },
  {
    question: "Can power factor correction reduce my electricity bills significantly?",
    answer: "Yes, substantial savings are achievable. A factory paying £5,000/year in reactive power charges could eliminate these entirely with PFC. Additionally, by reducing apparent power (kVA), the maximum demand charge also reduces. Payback periods of 1-3 years are typical for industrial PFC installations. The financial case should include avoided capacity charges for future load growth."
  },
  {
    question: "What cable sizing considerations apply to capacitor circuits?",
    answer: "Capacitor cables must be sized for at least 1.5 times the rated capacitor current to account for harmonics, voltage variations, and capacitance tolerance (per BS 7671). Cable voltage drop should not exceed 3% to maintain capacitor effectiveness. Additionally, cables must withstand high inrush currents during switching."
  },
  {
    question: "How does power factor correction affect generator sizing?",
    answer: "Generators must supply the full kVA demand of a load. Improving power factor from 0.75 to 0.95 allows a smaller generator to supply the same kW load. For example, a 100 kW load at 0.75 pf needs a 133 kVA generator, but at 0.95 pf only needs 105 kVA. However, capacitors must be carefully controlled or disconnected when running on generator to prevent voltage regulation issues."
  }
];

const HNCModule7Section5_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section5">
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
            <span>Module 7.5.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Power Factor Correction
          </h1>
          <p className="text-white/80">
            Reactive power fundamentals, capacitor bank sizing, automatic PFC systems, and harmonic considerations for industrial installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Power factor:</strong> Ratio of real power (kW) to apparent power (kVA)</li>
              <li className="pl-1"><strong>Reactive power:</strong> kVAr - energy oscillating, not doing work</li>
              <li className="pl-1"><strong>Target PF:</strong> 0.95 lagging minimum for UK industrial</li>
              <li className="pl-1"><strong>Correction method:</strong> Capacitor banks (fixed or automatic)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Calculations</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>S = P / pf</strong> (apparent from real power)</li>
              <li className="pl-1"><strong>Q = P × tan φ</strong> (reactive power)</li>
              <li className="pl-1"><strong>kVAr = P × (tan φ₁ - tan φ₂)</strong> (capacitor sizing)</li>
              <li className="pl-1"><strong>I<sub>c</sub> = kVAr × 1000 / (√3 × V)</strong> (capacitor current)</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the power triangle and relationship between P, Q, and S",
              "Calculate reactive power requirements for power factor correction",
              "Size capacitor banks for fixed and automatic PFC applications",
              "Specify detuned reactors for harmonic-rich environments",
              "Apply BS 7671 and BS EN 61921 requirements to PFC installations",
              "Design protection and control systems for capacitor banks"
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

        {/* Section 1: Reactive Power Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Reactive Power Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In AC electrical systems, the relationship between voltage and current determines how
              effectively power is delivered to loads. When current and voltage are in phase, all
              power delivered does useful work. However, inductive loads such as motors, transformers,
              and fluorescent lighting cause current to lag behind voltage, creating reactive power.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Power Triangle</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Real power (P):</strong> Measured in kW - power that does useful work (heating, mechanical output)</li>
                <li className="pl-1"><strong>Reactive power (Q):</strong> Measured in kVAr - power oscillating between source and load, establishing magnetic/electric fields</li>
                <li className="pl-1"><strong>Apparent power (S):</strong> Measured in kVA - the vector sum of P and Q, representing total supply demand</li>
                <li className="pl-1"><strong>Power factor (pf):</strong> Dimensionless ratio P/S = cos φ, where φ is the phase angle between voltage and current</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Triangle Relationships</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Formula</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">S² = P² + Q²</td>
                      <td className="border border-white/10 px-3 py-2">Pythagorean relationship</td>
                      <td className="border border-white/10 px-3 py-2">Finding any power component</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">pf = P / S = cos φ</td>
                      <td className="border border-white/10 px-3 py-2">Power factor definition</td>
                      <td className="border border-white/10 px-3 py-2">Determining phase angle</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">Q = P × tan φ</td>
                      <td className="border border-white/10 px-3 py-2">Reactive from real power</td>
                      <td className="border border-white/10 px-3 py-2">Calculating kVAr demand</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-mono">S = P / pf</td>
                      <td className="border border-white/10 px-3 py-2">Apparent from real power</td>
                      <td className="border border-white/10 px-3 py-2">Supply sizing calculations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Why Power Factor Matters</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Supply capacity:</strong> Poor pf means higher kVA demand for the same kW load</li>
                <li className="pl-1"><strong>Cable sizing:</strong> Current increases as pf decreases (I = P / (√3 × V × pf))</li>
                <li className="pl-1"><strong>Transformer loading:</strong> Transformers are rated in kVA, not kW</li>
                <li className="pl-1"><strong>Utility charges:</strong> Reactive power charges apply below 0.95 pf</li>
                <li className="pl-1"><strong>Voltage regulation:</strong> High reactive current causes increased voltage drop</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Improving power factor from 0.7 to 0.95 reduces apparent power by 26% - equivalent to increasing supply capacity without infrastructure upgrades.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Capacitor Bank Sizing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Capacitor Bank Sizing and Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Capacitors provide leading reactive power that cancels the lagging reactive power
              drawn by inductive loads. Correct sizing ensures the target power factor is achieved
              without over-correction, which would cause leading power factor and potential problems.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fixed Capacitor Banks</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Suitable for constant loads (large motors)</li>
                  <li className="pl-1">Simple, lower cost installation</li>
                  <li className="pl-1">No control equipment required</li>
                  <li className="pl-1">Risk of over-correction at light loads</li>
                  <li className="pl-1">Often installed at motor terminals</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Automatic PFC Banks</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Suited for varying loads (most industrial)</li>
                  <li className="pl-1">Multiple switched capacitor stages</li>
                  <li className="pl-1">Controller maintains target pf</li>
                  <li className="pl-1">Prevents over-correction</li>
                  <li className="pl-1">Typically installed at main switchboard</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Capacitor Sizing Calculation</p>
              <div className="bg-black/30 p-4 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Step 1: Determine existing power factor and target</p>
                <p>Existing pf = 0.75 lagging → φ₁ = cos⁻¹(0.75) = 41.41°</p>
                <p>Target pf = 0.95 lagging → φ₂ = cos⁻¹(0.95) = 18.19°</p>
                <p className="mt-3 text-white/60">Step 2: Calculate tangent values</p>
                <p>tan φ₁ = tan(41.41°) = 0.882</p>
                <p>tan φ₂ = tan(18.19°) = 0.329</p>
                <p className="mt-3 text-white/60">Step 3: Calculate required kVAr per kW of load</p>
                <p>kVAr/kW = tan φ₁ - tan φ₂ = 0.882 - 0.329 = 0.553</p>
                <p className="mt-3 text-white/60">Step 4: Apply to actual load</p>
                <p>For 200 kW load: kVAr = 200 × 0.553 = <span className="text-green-400">110.6 kVAr</span></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Capacitor Bank Ratings</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage Size</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Switching Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5 kVAr</td>
                      <td className="border border-white/10 px-3 py-2">Small commercial, fine control</td>
                      <td className="border border-white/10 px-3 py-2">Contactor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10 kVAr</td>
                      <td className="border border-white/10 px-3 py-2">Light industrial, retail</td>
                      <td className="border border-white/10 px-3 py-2">Contactor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">25 kVAr</td>
                      <td className="border border-white/10 px-3 py-2">Medium industrial</td>
                      <td className="border border-white/10 px-3 py-2">Contactor or thyristor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50 kVAr</td>
                      <td className="border border-white/10 px-3 py-2">Heavy industrial</td>
                      <td className="border border-white/10 px-3 py-2">Contactor or circuit breaker</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">100+ kVAr</td>
                      <td className="border border-white/10 px-3 py-2">Large industrial, substations</td>
                      <td className="border border-white/10 px-3 py-2">Circuit breaker</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Sizing tip:</strong> For automatic PFC, select stage sizes that provide adequate resolution. A 150 kVAr bank might use 6 × 25 kVAr or 5 × 25 kVAr + 5 × 5 kVAr for finer control.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Automatic PFC Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Automatic Power Factor Correction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Automatic PFC systems continuously monitor power factor and switch capacitor stages
              in or out to maintain the target value. This is essential for installations with
              varying loads where fixed correction would cause over-correction during light load periods.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Automatic PFC Components</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Power factor controller:</strong> Microprocessor unit measuring V, I, and calculating pf continuously</li>
                <li className="pl-1"><strong>Current transformer (CT):</strong> Measures load current for pf calculation (typically 5A secondary)</li>
                <li className="pl-1"><strong>Capacitor stages:</strong> Individual capacitor units with contactors for switching</li>
                <li className="pl-1"><strong>Switching contactors:</strong> Special capacitor-duty contactors with pre-insertion resistors</li>
                <li className="pl-1"><strong>Discharge resistors:</strong> Ensure safe voltage decay when capacitors disconnect</li>
                <li className="pl-1"><strong>Protection devices:</strong> HRC fuses or MCCBs rated for capacitor duty</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Controller Operation Sequence</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Step</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Action</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1</td>
                      <td className="border border-white/10 px-3 py-2">Measure voltage and current</td>
                      <td className="border border-white/10 px-3 py-2">Determine load conditions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">Calculate power factor</td>
                      <td className="border border-white/10 px-3 py-2">Compare with target setpoint</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3</td>
                      <td className="border border-white/10 px-3 py-2">Determine correction needed</td>
                      <td className="border border-white/10 px-3 py-2">Calculate kVAr deficit/excess</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">Check discharge time</td>
                      <td className="border border-white/10 px-3 py-2">Ensure capacitor ready for reconnection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2">Switch appropriate stage</td>
                      <td className="border border-white/10 px-3 py-2">Add/remove capacitors</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6</td>
                      <td className="border border-white/10 px-3 py-2">Wait settling time</td>
                      <td className="border border-white/10 px-3 py-2">Allow system to stabilise</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Contactor Switching</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Pre-insertion resistors limit inrush</li>
                  <li className="pl-1">30-60 second minimum off time</li>
                  <li className="pl-1">Lower cost, proven technology</li>
                  <li className="pl-1">Mechanical wear limits life</li>
                  <li className="pl-1">Suitable for most applications</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Thyristor Switching</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Zero-crossing switching eliminates transients</li>
                  <li className="pl-1">Rapid response (&lt;20ms)</li>
                  <li className="pl-1">No mechanical wear</li>
                  <li className="pl-1">Higher cost, requires cooling</li>
                  <li className="pl-1">For fast-changing loads, welders, cranes</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>CT placement:</strong> The current transformer must be installed on the supply side of the PFC connection point, measuring the total load current including any existing correction.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Harmonic Considerations and Detuned Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Harmonic Filters and Detuned Reactors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Modern installations contain significant non-linear loads (VSDs, LED drivers, IT equipment)
              that generate harmonic currents. Standard capacitors can create dangerous resonance with
              system inductance, amplifying harmonics and causing capacitor failure. Detuned reactors
              prevent this by shifting the resonant frequency below harmful harmonics.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Warning: Harmonic Resonance</p>
              <p className="text-sm text-white">
                When system inductance (transformers, cables) resonates with capacitor banks at a harmonic
                frequency, currents at that frequency are amplified dramatically. This causes:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 mt-2">
                <li className="pl-1">Capacitor overheating and premature failure</li>
                <li className="pl-1">Blown fuses and nuisance tripping</li>
                <li className="pl-1">Voltage distortion and equipment malfunction</li>
                <li className="pl-1">Potential fire risk in severe cases</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Detuning Reactor Principles</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Series reactor:</strong> Inductor connected in series with each capacitor stage</li>
                <li className="pl-1"><strong>Detuning factor (p):</strong> Expressed as percentage (typically 7%, 5.67%, or 14%)</li>
                <li className="pl-1"><strong>Resonant frequency:</strong> f<sub>r</sub> = 50 / √p (for 7%: f<sub>r</sub> = 189 Hz)</li>
                <li className="pl-1"><strong>Purpose:</strong> Shift resonance below 5th harmonic (250 Hz) to prevent amplification</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Detuning Factor Selection</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Detuning %</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Resonant Freq.</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5.67%</td>
                      <td className="border border-white/10 px-3 py-2">210 Hz</td>
                      <td className="border border-white/10 px-3 py-2">Low harmonic environments (THD &lt;8%)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7%</td>
                      <td className="border border-white/10 px-3 py-2">189 Hz</td>
                      <td className="border border-white/10 px-3 py-2">Standard industrial (THD 8-15%)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">14%</td>
                      <td className="border border-white/10 px-3 py-2">134 Hz</td>
                      <td className="border border-white/10 px-3 py-2">High harmonic environments (THD &gt;15%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Detuned vs Active Filters</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Detuned Reactors</p>
                  <ul className="text-sm text-white/90 space-y-1">
                    <li>• Prevent resonance only</li>
                    <li>• Do not reduce harmonics</li>
                    <li>• Passive, reliable technology</li>
                    <li>• Lower cost</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Active Harmonic Filters</p>
                  <ul className="text-sm text-white/90 space-y-1">
                    <li>• Actively cancel harmonics</li>
                    <li>• Can provide reactive power</li>
                    <li>• Complex, require maintenance</li>
                    <li>• Higher cost, higher benefit</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Survey first:</strong> Always conduct a power quality survey before specifying PFC equipment. Harmonic levels determine whether standard, detuned, or active solutions are required.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Installation Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Installation Requirements</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Requirements for Capacitor Installations</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Regulation 559.6:</strong> Capacitors must have discharge devices reducing voltage to 50V or less within 5 minutes</li>
                <li className="pl-1"><strong>Regulation 559.7:</strong> Direct connection to motors without intervening switch permitted only with appropriate precautions</li>
                <li className="pl-1"><strong>Cable sizing:</strong> Minimum 1.5 × rated capacitor current (accounting for harmonics and tolerance)</li>
                <li className="pl-1"><strong>Protection:</strong> Suitable for capacitor duty with adequate breaking capacity for inrush currents</li>
                <li className="pl-1"><strong>Isolation:</strong> Capacitors must be capable of isolation for maintenance</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Protection Device Sizing</h3>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Capacitor rated current calculation:</p>
                <p>I<sub>c</sub> = kVAr × 1000 / (√3 × V<sub>L</sub>)</p>
                <p className="mt-2">For 50 kVAr at 400V:</p>
                <p>I<sub>c</sub> = 50,000 / (1.732 × 400) = <span className="text-green-400">72.2 A</span></p>
                <p className="mt-2 text-white/60">Fuse/MCCB rating (1.5 × I<sub>c</sub> minimum):</p>
                <p>I<sub>protection</sub> = 1.5 × 72.2 = <span className="text-green-400">108 A (use 125A)</span></p>
                <p className="mt-2 text-white/60">Cable rating (1.5 × I<sub>c</sub> minimum):</p>
                <p>I<sub>cable</sub> ≥ 108 A → <span className="text-green-400">35mm² minimum</span></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Physical Installation Considerations</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ventilation:</strong> Capacitors generate heat - ensure adequate airflow or forced cooling</li>
                <li className="pl-1"><strong>Ambient temperature:</strong> Derate capacity above 35°C (typically -1% per °C)</li>
                <li className="pl-1"><strong>Clearances:</strong> Maintain manufacturer's specified clearances for heat dissipation</li>
                <li className="pl-1"><strong>Mounting:</strong> Secure mounting to withstand electromagnetic forces during switching</li>
                <li className="pl-1"><strong>Access:</strong> Provide safe access for maintenance and inspection</li>
                <li className="pl-1"><strong>Warning labels:</strong> "Caution: Capacitors - may retain charge after isolation"</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Complete PFC Sizing Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A factory has 300 kW load at 0.72 power factor. Calculate capacitor bank size to achieve 0.95 pf.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given:</p>
                <p>P = 300 kW, pf₁ = 0.72, pf₂ = 0.95 (target)</p>
                <p className="mt-2 text-white/60">Step 1: Find phase angles</p>
                <p>φ₁ = cos⁻¹(0.72) = 43.95°</p>
                <p>φ₂ = cos⁻¹(0.95) = 18.19°</p>
                <p className="mt-2 text-white/60">Step 2: Calculate tangent values</p>
                <p>tan(43.95°) = 0.964</p>
                <p>tan(18.19°) = 0.329</p>
                <p className="mt-2 text-white/60">Step 3: Calculate kVAr required</p>
                <p>kVAr = P × (tan φ₁ - tan φ₂)</p>
                <p>kVAr = 300 × (0.964 - 0.329)</p>
                <p>kVAr = 300 × 0.635 = <span className="text-green-400">190.5 kVAr</span></p>
                <p className="mt-2 text-white/60">Step 4: Select bank configuration</p>
                <p>Option A: 8 × 25 kVAr = 200 kVAr (automatic)</p>
                <p>Option B: 6 × 25 kVAr + 4 × 10 kVAr = 190 kVAr (finer control)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Financial Payback Analysis</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate annual savings and payback for a 200 kVAr PFC installation.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Current situation:</p>
                <p>Max demand: 500 kVA at 0.75 pf → P = 375 kW</p>
                <p>kVA charge: £8/kVA/month × 500 kVA = £4,000/month</p>
                <p>kVAr charge: £0.50/kVAr/month × 331 kVAr = £166/month</p>
                <p className="mt-2 text-white/60">After PFC (200 kVAr correction):</p>
                <p>New pf ≈ 0.95, new kVA = 375/0.95 = 395 kVA</p>
                <p>New kVA charge: £8 × 395 = £3,160/month</p>
                <p>New kVAr: 331 - 200 = 131 kVAr</p>
                <p>New kVAr charge: £0.50 × 131 = £66/month (or zero if &gt;0.95)</p>
                <p className="mt-2 text-white/60">Annual savings:</p>
                <p>kVA saving: (4,000 - 3,160) × 12 = <span className="text-green-400">£10,080</span></p>
                <p>kVAr saving: (166 - 66) × 12 = <span className="text-green-400">£1,200</span></p>
                <p>Total annual saving: <span className="text-green-400">£11,280</span></p>
                <p className="mt-2 text-white/60">Payback (200 kVAr detuned bank ~£15,000 installed):</p>
                <p>Payback = £15,000 / £11,280 = <span className="text-green-400">1.3 years</span></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Motor Individual Correction</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Size a fixed capacitor for a 45 kW motor running at 0.82 pf.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Motor data:</p>
                <p>P = 45 kW, pf = 0.82, target pf = 0.95</p>
                <p className="mt-2 text-white/60">Calculation:</p>
                <p>φ₁ = cos⁻¹(0.82) = 34.92°, tan φ₁ = 0.698</p>
                <p>φ₂ = cos⁻¹(0.95) = 18.19°, tan φ₂ = 0.329</p>
                <p>kVAr = 45 × (0.698 - 0.329) = <span className="text-green-400">16.6 kVAr</span></p>
                <p className="mt-2 text-white/60">Selection:</p>
                <p>Use standard 15 kVAr capacitor (nearest lower value)</p>
                <p className="text-yellow-400">Note: Never exceed motor no-load magnetising current</p>
                <p>or self-excitation can occur during motor run-down</p>
              </div>
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
                <p className="font-medium text-white mb-1">Key Formulae</p>
                <ul className="space-y-0.5 font-mono">
                  <li>S = P / pf (kVA)</li>
                  <li>Q = P × tan φ (kVAr)</li>
                  <li>kVAr = P × (tan φ₁ - tan φ₂)</li>
                  <li>I<sub>c</sub> = kVAr × 1000 / (√3 × V)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Values</p>
                <ul className="space-y-0.5">
                  <li>Target pf: 0.95 lagging (UK)</li>
                  <li>Cable/fuse: 1.5 × I<sub>c</sub> minimum</li>
                  <li>Discharge time: ≤5 minutes to 50V</li>
                  <li>7% detuning: f<sub>r</sub> = 189 Hz</li>
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
            <Link to="../h-n-c-module7-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section5-3">
              Next: Section 5.3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section5_2;
