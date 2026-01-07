/**
 * Level 3 Module 3 Section 5.4 - Power Factor Correction
 *
 * Design pattern: Level3ContentTemplate.tsx
 * Dark theme with elec-yellow accent
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Power Factor Correction - Level 3 Module 3 Section 5.4";
const DESCRIPTION = "Master power factor correction techniques for electrical installations. Learn about the power triangle, capacitor sizing, and economic benefits of power factor improvement.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the power factor of a purely resistive circuit?",
    options: [
      "0",
      "0.5",
      "0.85",
      "1 (unity)"
    ],
    correctIndex: 3,
    explanation: "In a purely resistive circuit, current and voltage are in phase (no phase shift). The power factor is cos 0 degrees = 1, known as unity power factor. No reactive power is present."
  },
  {
    id: "check-2",
    question: "A 230V 4kW motor has a power factor of 0.4. What current does it draw?",
    options: [
      "17.4 A",
      "43.5 A",
      "92 A",
      "4 A"
    ],
    correctIndex: 1,
    explanation: "Current = Power / (Voltage x Power Factor) = 4000 / (230 x 0.4) = 43.5 A. The poor power factor causes the motor to draw 2.5 times more current than it would at unity power factor (17.4 A)."
  },
  {
    id: "check-3",
    question: "How does a capacitor correct power factor in an inductive circuit?",
    options: [
      "By increasing the resistance",
      "By generating leading reactive power that cancels lagging reactive power",
      "By reducing the voltage",
      "By increasing the frequency"
    ],
    correctIndex: 1,
    explanation: "Capacitors draw leading current (current leads voltage by 90 degrees). This leading reactive power (kVAr) cancels out the lagging reactive power from inductive loads, reducing total reactive power and improving power factor."
  },
  {
    id: "check-4",
    question: "Why is power factor typically corrected to 0.95 rather than unity (1.0)?",
    options: [
      "Unity power factor is impossible to achieve",
      "Correcting to unity risks leading power factor if load varies, which is also penalised",
      "0.95 is the maximum achievable",
      "Capacitors cannot achieve unity"
    ],
    correctIndex: 1,
    explanation: "If load varies (as it usually does), capacitors sized for unity at full load will over-correct at partial load, causing a leading power factor. Leading power factor is also chargeable by distribution network operators. A target of 0.95 provides margin for load variation."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "In the power triangle, apparent power (kVA) represents:",
    options: [
      "The useful power doing work",
      "The combination of true power and reactive power",
      "The power lost as heat",
      "The power stored in capacitors only"
    ],
    correctAnswer: 1,
    explanation: "Apparent power (kVA) is the vector sum of true power (kW) and reactive power (kVAr). It represents the total power the supply must provide, even though only the true power component does useful work."
  },
  {
    id: 2,
    question: "The formula for power factor is:",
    options: [
      "PF = kVA / kW",
      "PF = kW / kVA",
      "PF = kVAr / kW",
      "PF = kW x kVA"
    ],
    correctAnswer: 1,
    explanation: "Power factor = True Power / Apparent Power = kW / kVA. This can also be expressed as cos theta, where theta is the phase angle between current and voltage."
  },
  {
    id: 3,
    question: "A circuit has 4 kW true power and 10 kVA apparent power. What is the power factor?",
    options: [
      "0.25",
      "0.4",
      "2.5",
      "40"
    ],
    correctAnswer: 1,
    explanation: "Power factor = kW / kVA = 4 / 10 = 0.4. This is a poor power factor, meaning significant reactive power is present (drawing more current than necessary for the actual work done)."
  },
  {
    id: 4,
    question: "What is kVAr?",
    options: [
      "Kilovolt-amperes reactive - the unit of reactive power",
      "Kilovolts apparent rating",
      "Kilowatt-ampere ratio",
      "Kinetic volt-ampere resistance"
    ],
    correctAnswer: 0,
    explanation: "kVAr (kilovolt-amperes reactive) is the unit of reactive power - the power that flows back and forth between source and reactive components (inductors, capacitors) without doing useful work."
  },
  {
    id: 5,
    question: "Industrial users are often charged based on kVA rather than kW because:",
    options: [
      "kVA is easier to measure",
      "Poor power factor increases current demand, requiring larger infrastructure",
      "kVA is always greater than kW",
      "It discourages use of resistive loads"
    ],
    correctAnswer: 1,
    explanation: "Poor power factor means higher current for the same real power, requiring larger cables, transformers, and switchgear. Distribution network operators recover these infrastructure costs by charging on kVA (which includes reactive power) rather than just kW."
  },
  {
    id: 6,
    question: "A fluorescent luminaire contains a capacitor primarily for:",
    options: [
      "Starting the lamp",
      "Improving power factor",
      "Reducing flicker",
      "Increasing brightness"
    ],
    correctAnswer: 1,
    explanation: "The choke/ballast in a fluorescent luminaire is inductive, causing lagging power factor. The capacitor connected across line and neutral provides power factor correction. The lamp still works without it but draws slightly more current."
  },
  {
    id: 7,
    question: "For the equation true power = V x I x cos theta, cos theta represents:",
    options: [
      "The current",
      "The voltage",
      "The power factor",
      "The phase angle in radians"
    ],
    correctAnswer: 2,
    explanation: "Cos theta (where theta is the phase angle between voltage and current) equals the power factor. This formula shows that true power depends on voltage, current, AND how well they are aligned in phase."
  },
  {
    id: 8,
    question: "Power factor correction capacitors in large installations are often:",
    options: [
      "Fixed value only",
      "Automatically switched in banks to match varying load",
      "Connected in series with the load",
      "Rated in kW"
    ],
    correctAnswer: 1,
    explanation: "Automatic power factor correction (APFC) units use monitoring technology to switch capacitor banks in and out as load varies. This maintains optimal power factor without over-correction at light load. Banks are typically in multiples of 50 kVAr."
  },
  {
    id: 9,
    question: "What happens if too much capacitance is added for power factor correction?",
    options: [
      "Nothing - excess capacitance is harmless",
      "The power factor becomes leading, which can also attract penalties",
      "The voltage increases dangerously",
      "The capacitors explode"
    ],
    correctAnswer: 1,
    explanation: "Over-correction creates a leading power factor (current leads voltage). Leading power factor can cause voltage rise and is also subject to charges from distribution network operators. Target 0.95 lagging to avoid this."
  },
  {
    id: 10,
    question: "The phase angle of a circuit with power factor 0.85 is approximately:",
    options: [
      "15 degrees",
      "32 degrees",
      "45 degrees",
      "85 degrees"
    ],
    correctAnswer: 1,
    explanation: "Phase angle = cos^-1 (power factor) = cos^-1 (0.85) = 31.79 degrees, approximately 32 degrees. The current lags (inductive) or leads (capacitive) the voltage by this angle."
  },
  {
    id: 11,
    question: "Which of these would have the best (closest to unity) power factor?",
    options: [
      "Unloaded induction motor",
      "Fully loaded induction motor",
      "Electric kettle",
      "Fluorescent lamp without capacitor"
    ],
    correctAnswer: 2,
    explanation: "An electric kettle is a purely resistive load with unity power factor (1.0). Motors have poor power factor especially unloaded. Fluorescent lamps without correction capacitors have lagging power factor due to the inductive ballast."
  },
  {
    id: 12,
    question: "Reducing reactive power through power factor correction also:",
    options: [
      "Increases energy consumption",
      "Reduces voltage drop and system losses",
      "Increases current flow",
      "Requires larger cables"
    ],
    correctAnswer: 1,
    explanation: "Better power factor means less current for the same real power. Less current means reduced voltage drop in cables (I x R losses) and reduced heating losses (I squared R). This improves efficiency and may allow smaller cables."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "What is a typical power factor for industrial installations?",
    answer: "Uncorrected industrial installations typically have power factors between 0.7 and 0.85 due to motor loads. With correction, target 0.95 or higher. Domestic installations are usually better (0.9+) as they have more resistive loads (heating, lighting) and fewer motors."
  },
  {
    question: "How do I calculate the capacitor size needed for power factor correction?",
    answer: "Draw a power triangle showing current power factor angle and target angle. The difference in reactive power (kVAr) between these is what the capacitor must supply. Then calculate capacitor current (Ic = kVAr x 1000 / V), capacitive reactance (Xc = V / Ic), and finally capacitance (C = 1 / 2 x pi x f x Xc)."
  },
  {
    question: "Where should power factor correction capacitors be installed?",
    answer: "Options include: at individual loads (best correction but more expensive), at distribution boards (group correction), or at the main intake (bulk correction, cheapest but least effective for reducing losses within the installation). Large installations often use a combination."
  },
  {
    question: "Can power factor correction reduce my electricity bills?",
    answer: "For commercial/industrial tariffs that charge for maximum demand in kVA or apply reactive power penalties, yes - significantly. Domestic users on simple kWh tariffs see less direct saving, but reduced cable losses still save some energy. The main benefit for domestic is reduced loading on cables and equipment."
  },
  {
    question: "Why do motors have poor power factor, especially when unloaded?",
    answer: "Motors need magnetic flux to operate, which requires reactive (magnetising) current even with no mechanical load. At full load, real power (doing work) increases but reactive power stays similar, so the ratio (power factor) improves. Off-load, the motor draws mostly reactive current."
  },
  {
    question: "What is the difference between static and automatic power factor correction?",
    answer: "Static correction uses fixed capacitors sized for a specific load - simple but can over-correct at light load. Automatic correction uses controllers that switch capacitor banks in/out based on measured power factor, maintaining optimal correction as load varies. Automatic is more expensive but more effective for varying loads."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module3Section5_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* STICKY HEADER */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module3-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* MAIN ARTICLE CONTENT */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* HEADER */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.5.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Power Factor Correction
          </h1>
          <p className="text-white/80">
            Improving electrical efficiency through reactive power management
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Power Factor:</strong> Ratio of true power (kW) to apparent power (kVA)</li>
              <li><strong>Poor PF:</strong> Inductive loads cause current to lag voltage</li>
              <li><strong>Correction:</strong> Capacitors provide leading current to cancel lag</li>
              <li><strong>Target:</strong> 0.95 (not unity, to allow for load variation)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Capacitors in luminaires, capacitor banks at switchboards</li>
              <li><strong>Use:</strong> Power triangle to calculate correction requirements</li>
              <li><strong>Apply:</strong> Select capacitor kVAr rating to improve PF to 0.95</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the relationship between true, reactive and apparent power",
              "Calculate power factor from circuit measurements",
              "Understand the economic and technical impacts of poor power factor",
              "Use the power triangle for power factor correction calculations",
              "Size capacitors for power factor improvement",
              "Distinguish between static and automatic correction systems"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* CONTENT SECTION 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Power Triangle
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In DC circuits, power is simply voltage multiplied by current (P = V x I). In AC circuits with reactive components, the relationship becomes more complex. The power triangle helps visualise the three types of power present in AC circuits.
            </p>

            <div className="my-6 p-4 rounded-lg bg-transparent border border-white/10">
              <p className="text-sm font-medium text-white mb-3">The Three Types of Power:</p>
              <div className="space-y-3">
                <div className="p-3 rounded bg-green-500/10 border border-green-500/20">
                  <p className="text-sm font-medium text-green-400">True Power (P) - measured in kW</p>
                  <p className="text-xs text-white/80 mt-1">The actual power doing useful work - powering motors, creating heat, producing light. This is what you pay for in kWh on domestic bills.</p>
                </div>
                <div className="p-3 rounded bg-blue-500/10 border border-blue-500/20">
                  <p className="text-sm font-medium text-blue-400">Reactive Power (Q) - measured in kVAr</p>
                  <p className="text-xs text-white/80 mt-1">Power flowing back and forth between source and reactive components (inductors, capacitors). Does no useful work but must be supplied by the source.</p>
                </div>
                <div className="p-3 rounded bg-yellow-500/10 border border-yellow-500/20">
                  <p className="text-sm font-medium text-yellow-400">Apparent Power (S) - measured in kVA</p>
                  <p className="text-xs text-white/80 mt-1">The vector sum of true and reactive power. This is what the supply system must provide - it determines cable sizes, transformer ratings, and infrastructure requirements.</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Power Triangle Relationship:</p>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
                <p className="text-sm text-white font-mono text-center mb-2">S squared = P squared + Q squared</p>
                <p className="text-sm text-white font-mono text-center mb-2">kVA squared = kW squared + kVAr squared</p>
                <p className="text-xs text-white/70 text-center mt-2">The apparent power is the hypotenuse of a right triangle with true power and reactive power as the other sides.</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key Relationship:</strong> Power factor = True Power / Apparent Power = kW / kVA = cos theta (where theta is the phase angle between voltage and current)
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Causes and Effects of Poor Power Factor
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Most electrical loads in commercial and industrial installations are inductive - motors, transformers, fluorescent lighting ballasts, and induction heating. These inductive loads cause current to lag behind voltage, resulting in a lagging power factor less than unity.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Causes of Poor Power Factor</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Induction motors (especially lightly loaded)</li>
                  <li>Transformers on light load</li>
                  <li>Inductive ballasts in discharge lighting</li>
                  <li>Welding equipment</li>
                  <li>Induction furnaces</li>
                  <li>Variable speed drives (older types)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Effects of Poor Power Factor</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Higher current for same real power</li>
                  <li>Increased cable and equipment sizing</li>
                  <li>Greater voltage drop in cables</li>
                  <li>Higher I squared R losses (heat)</li>
                  <li>Reduced system capacity</li>
                  <li>Power factor penalties on bills</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 my-6">
              <p className="text-sm font-medium text-red-400 mb-2">Worked Example: Current Increase Due to Poor Power Factor</p>
              <p className="text-xs text-white/90 mb-2">A 4 kW motor on 230V supply:</p>
              <div className="text-xs text-white/80 space-y-1 font-mono">
                <p>At unity PF (1.0): I = 4000 / (230 x 1.0) = 17.4 A</p>
                <p>At PF of 0.4: I = 4000 / (230 x 0.4) = 43.5 A</p>
                <p className="text-red-400 mt-2">Poor power factor increases current by 250%!</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Economic Impact:</strong> Distribution network operators charge industrial customers based on kVA demand rather than kW, or apply reactive power charges. Poor power factor directly increases electricity costs and may require investment in larger cables and equipment.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Power Factor Correction Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Power factor correction works by adding capacitive reactive power to cancel out inductive reactive power. Since capacitors cause current to lead voltage (opposite to inductors), they counteract the lagging effect of inductive loads. The most common correction method uses static capacitors.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Correction Methods:</p>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-transparent border border-white/10">
                  <p className="text-sm font-medium text-white">Individual Correction</p>
                  <p className="text-xs text-white/70 mt-1">Capacitors installed at each piece of equipment (e.g., motor terminals). Best correction but most expensive. Reduces losses in all downstream cables.</p>
                </div>
                <div className="p-3 rounded-lg bg-transparent border border-white/10">
                  <p className="text-sm font-medium text-white">Group Correction</p>
                  <p className="text-xs text-white/70 mt-1">Capacitors at distribution boards serving groups of loads. Moderate cost and effectiveness. Common in commercial installations.</p>
                </div>
                <div className="p-3 rounded-lg bg-transparent border border-white/10">
                  <p className="text-sm font-medium text-white">Bulk Correction</p>
                  <p className="text-xs text-white/70 mt-1">Capacitor bank at main intake. Lowest cost but only reduces reactive power from the supply perspective - internal losses unchanged.</p>
                </div>
                <div className="p-3 rounded-lg bg-transparent border border-white/10">
                  <p className="text-sm font-medium text-white">Automatic Power Factor Correction (APFC)</p>
                  <p className="text-xs text-white/70 mt-1">Controller monitors power factor and switches capacitor banks (typically 50 kVAr steps) in and out automatically. Maintains optimal correction as load varies.</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fluorescent Luminaire Correction</p>
              <p className="text-xs text-white/90">
                Fluorescent luminaires typically include a capacitor connected between line and neutral for power factor correction. The inductive choke/ballast causes lagging power factor; the parallel capacitor corrects this. Without the capacitor, the luminaire still works but draws slightly more current. When replacing luminaires, ensure correction capacitors are included.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> Correction is typically to 0.95 rather than unity. If the load reduces, fixed capacitors may over-correct, creating a leading power factor which is also penalised. Automatic systems avoid this by adjusting capacitance to match actual load.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Calculating Capacitor Size
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              To size a power factor correction capacitor, we need to determine how much reactive power (kVAr) must be cancelled. The power triangle provides the method - we calculate the reactive power at current and target power factors, and the difference is the capacitor rating required.
            </p>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Worked Example: Capacitor Sizing</p>
              <p className="text-xs text-white/90 mb-2">A 230V, 4kW motor has power factor 0.4. Calculate the capacitor needed to improve PF to 0.85.</p>
              <div className="text-xs text-white/80 space-y-2 font-mono">
                <p><strong>Step 1:</strong> Find original apparent power and reactive power</p>
                <p className="ml-4">S = P / PF = 4 / 0.4 = 10 kVA</p>
                <p className="ml-4">Angle = cos^-1 (0.4) = 66.4 degrees</p>
                <p className="ml-4">Q = S x sin(66.4) = 10 x 0.917 = 9.17 kVAr</p>

                <p className="mt-3"><strong>Step 2:</strong> Find target reactive power at PF 0.85</p>
                <p className="ml-4">New angle = cos^-1 (0.85) = 31.8 degrees</p>
                <p className="ml-4">New S = 4 / 0.85 = 4.7 kVA</p>
                <p className="ml-4">New Q = 4.7 x sin(31.8) = 2.48 kVAr</p>

                <p className="mt-3"><strong>Step 3:</strong> Required capacitor kVAr</p>
                <p className="ml-4">Qc = 9.17 - 2.48 = 6.69 kVAr (approximately 6.6 kVAr)</p>

                <p className="mt-3"><strong>Step 4:</strong> Calculate capacitor value (if required)</p>
                <p className="ml-4">Ic = Qc x 1000 / V = 6600 / 230 = 28.7 A</p>
                <p className="ml-4">Xc = V / Ic = 230 / 28.7 = 8.01 ohms</p>
                <p className="ml-4">C = 1 / (2 x pi x f x Xc) = 1 / (2 x 3.14 x 50 x 8.01) = 398 microfarads</p>

                <p className="text-green-400 mt-3">A 398 microfarad (or nearest standard value 400 microfarad) capacitor is required.</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">50 kVAr</p>
                <p className="text-white/90 text-xs">Typical bank step</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">0.95</p>
                <p className="text-white/90 text-xs">Target PF</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">440V</p>
                <p className="text-white/90 text-xs">Common 3-phase rating</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Practical Note:</strong> In practice, capacitors are selected from standard kVAr ratings. For three-phase correction, the total kVAr is divided across the phases. Always verify that correction capacitors are rated for the system voltage and frequency.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* PRACTICAL GUIDANCE */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Assessing Power Factor</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use a power factor meter or power analyser to measure actual PF</li>
                <li>Check electricity bills for kVA demand or reactive power charges</li>
                <li>Calculate from simultaneous V, I, and W measurements if needed</li>
                <li>Measure at different load conditions - PF varies with load</li>
                <li>Identify major inductive loads (motors, transformers)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing Correction Equipment</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ensure capacitors are rated for system voltage and frequency</li>
                <li>Provide adequate ventilation - capacitors generate some heat</li>
                <li>Include discharge resistors (safety requirement)</li>
                <li>Use appropriate protection (HRC fuses or MCBs)</li>
                <li>Consider harmonic distortion - may need detuned capacitors</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Over-correction</strong> - Leading PF is also penalised; target 0.95 not 1.0</li>
                <li><strong>Fixed correction on variable loads</strong> - May over-correct at light load</li>
                <li><strong>Ignoring harmonics</strong> - Can damage capacitors; use detuned types</li>
                <li><strong>Wrong voltage rating</strong> - Capacitors rated for wrong voltage fail quickly</li>
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

        <hr className="border-white/5 my-12" />

        {/* QUICK REFERENCE */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent border border-elec-yellow/20">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Power Triangle</p>
                <ul className="space-y-0.5">
                  <li>True Power (kW) = V x I x cos theta</li>
                  <li>Reactive Power (kVAr) = V x I x sin theta</li>
                  <li>Apparent Power (kVA) = V x I</li>
                  <li>Power Factor = kW / kVA = cos theta</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Correction Guidelines</p>
                <ul className="space-y-0.5">
                  <li>Target PF: 0.95 lagging</li>
                  <li>Capacitor kVAr = Original kVAr - Target kVAr</li>
                  <li>C = 1 / (2 x pi x f x Xc)</li>
                  <li>APFC for variable loads</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* QUIZ */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* NAVIGATION */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module3-section5-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Energy Consumption
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module3-section6">
              Next: Conductors and Cables
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module3Section5_4;
