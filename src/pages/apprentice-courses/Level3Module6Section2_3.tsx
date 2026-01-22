/**
 * Level 3 Module 6 Section 2.3 - Earth Fault Loop Impedance and Disconnection Times
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Earth Fault Loop Impedance and Disconnection Times - Level 3 Module 6 Section 2.3";
const DESCRIPTION = "Master earth fault loop impedance calculations, disconnection time requirements, and Zs verification for automatic disconnection of supply protection per BS 7671.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What does earth fault loop impedance (Zs) represent?",
    options: [
      "The resistance of the earth electrode only",
      "The total impedance of the fault current path from source through the fault and back",
      "The impedance of the circuit protective conductor only",
      "The resistance of the main earthing terminal"
    ],
    correctIndex: 1,
    explanation: "Zs is the total impedance of the complete earth fault loop - from the source (transformer), through the phase conductor, through the fault, through the CPC, and back to the source via the neutral/earth. This impedance determines fault current magnitude and hence disconnection time."
  },
  {
    id: "check-2",
    question: "For a 32A Type B MCB protecting a socket circuit in a TN system, the maximum Zs at design stage is:",
    options: [
      "1.44 ohms",
      "1.15 ohms (using 0.8 correction factor)",
      "0.72 ohms",
      "2.30 ohms"
    ],
    correctIndex: 1,
    explanation: "From BS 7671 Table 41.3, maximum Zs for 32A Type B is 1.44 ohms at 0.4s. Applying the 80% rule for design (accounting for conductor temperature rise during fault), the design maximum is 1.44 x 0.8 = 1.15 ohms. Measured values at normal temperature must not exceed this."
  },
  {
    id: "check-3",
    question: "The formula Zs = Ze + (R1 + R2) calculates earth fault loop impedance where:",
    options: [
      "R1 is earth resistance and R2 is neutral resistance",
      "R1 is line conductor resistance and R2 is CPC resistance for the circuit",
      "R1 and R2 are resistances of two different circuits",
      "R1 is cable resistance and R2 is device resistance"
    ],
    correctIndex: 1,
    explanation: "Zs = Ze + (R1 + R2) where Ze is external earth fault loop impedance (from supply), R1 is the resistance of the line conductor from DB to fault point, and R2 is the resistance of the CPC over the same length. (R1 + R2) values are tabulated per metre of cable."
  },
  {
    id: "check-4",
    question: "What is the maximum disconnection time for a 230V socket circuit in a TN system?",
    options: [
      "5 seconds",
      "0.4 seconds",
      "1 second",
      "0.2 seconds"
    ],
    correctIndex: 1,
    explanation: "BS 7671 Table 41.1 requires 0.4 second maximum disconnection time for final circuits up to 63A at 230V in TN systems. This limits the duration of shock to a tolerable level. Distribution circuits can have 5 second disconnection time under specific conditions."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the relationship between earth fault loop impedance and fault current?",
    options: [
      "Higher Zs gives higher fault current",
      "Lower Zs gives higher fault current (If = Uo/Zs)",
      "Zs and fault current are unrelated",
      "Fault current equals Zs divided by voltage"
    ],
    correctAnswer: 1,
    explanation: "Fault current If = Uo/Zs (Ohm's Law). Lower impedance means higher fault current, which causes the protective device to operate faster. This is why maximum Zs values are specified - to ensure sufficient fault current for rapid disconnection."
  },
  {
    id: 2,
    question: "Ze for a TN-C-S (PME) supply should not exceed:",
    options: [
      "0.80 ohms",
      "0.35 ohms",
      "21 ohms",
      "1.44 ohms"
    ],
    correctAnswer: 1,
    explanation: "ESQCR specifies maximum Ze of 0.35 ohms for TN-C-S (PME) supplies. This low value reflects the combined neutral-earth path in the supply. For design purposes, use 0.35 ohms if the actual measured value is not available."
  },
  {
    id: 3,
    question: "A circuit has Ze = 0.25 ohms and cable length 25m. If (R1+R2)/m = 0.028 ohms/m, what is Zs?",
    options: [
      "0.95 ohms",
      "0.53 ohms",
      "1.20 ohms",
      "0.70 ohms"
    ],
    correctAnswer: 0,
    explanation: "Zs = Ze + (R1+R2) = 0.25 + (0.028 x 25) = 0.25 + 0.70 = 0.95 ohms. This calculated Zs must be compared against the maximum permitted for the protective device to verify the circuit will disconnect within the required time."
  },
  {
    id: 4,
    question: "Why is the 0.8 factor applied to tabulated maximum Zs values for design?",
    options: [
      "To add a safety margin for measurement accuracy",
      "To account for conductor resistance increase when hot during a fault",
      "Because MCBs only trip at 80% of rated current",
      "To allow for voltage fluctuations"
    ],
    correctAnswer: 1,
    explanation: "During a fault, conductor temperature rises rapidly, increasing resistance and hence Zs. The 0.8 factor accounts for this - values measured when cables are cold (normal testing conditions) will be higher during an actual fault. The factor ensures disconnection still occurs in the required time."
  },
  {
    id: 5,
    question: "A Type C MCB requires higher fault current to trip in 0.4s compared to Type B because:",
    options: [
      "Type C MCBs are lower quality",
      "Type C magnetic trip operates at 5-10x In versus 3-5x In for Type B",
      "Type C MCBs have higher breaking capacity",
      "Type B MCBs cannot be used for socket circuits"
    ],
    correctAnswer: 1,
    explanation: "Type C MCBs have magnetic trip at 5-10 times rated current (In), versus 3-5x for Type B. This means Type C requires higher fault current (lower Zs) to achieve instantaneous magnetic tripping. Type C is used for inductive loads with higher inrush currents."
  },
  {
    id: 6,
    question: "If calculated Zs exceeds the maximum permitted value, what solutions are available?",
    options: [
      "Accept it - the values are only guidance",
      "Use larger cable (lower R1+R2), shorter route, or add RCD protection",
      "Change the cable colour",
      "Increase the protective device rating"
    ],
    correctAnswer: 1,
    explanation: "Options include: larger cable (lower resistance per metre), shorter cable route, using a lower-rated protective device (higher Zs permitted), or adding RCD protection (RCDs trip on milliamps, not dependent on Zs for operation). RCD protection is often the practical solution."
  },
  {
    id: 7,
    question: "What is the maximum disconnection time for a distribution circuit in a TN system?",
    options: [
      "0.4 seconds",
      "0.2 seconds",
      "5 seconds",
      "1 second"
    ],
    correctAnswer: 2,
    explanation: "Distribution circuits (feeding distribution boards rather than final equipment) are permitted 5 second disconnection time under BS 7671 Regulation 411.3.2.3. However, this only applies where the circuit supplies equipment in an area of equipotential bonding."
  },
  {
    id: 8,
    question: "For a TT system, why is RCD protection essential for earth fault protection?",
    options: [
      "Building regulations require it",
      "High earth electrode resistance limits fault current below MCB trip thresholds",
      "MCBs don't work in TT systems",
      "RCDs are cheaper in TT installations"
    ],
    correctAnswer: 1,
    explanation: "In TT systems, earth electrode resistance (Ra) is typically tens of ohms, giving Zs values that produce very low fault currents - often below MCB trip thresholds. A 30mA RCD provides fault protection as it trips on earth leakage current, independent of total Zs."
  },
  {
    id: 9,
    question: "The (R1+R2) value for 2.5mm² T+E cable with 1.5mm² CPC is approximately:",
    options: [
      "7.41 mohms/m",
      "19.51 mohms/m",
      "14.82 mohms/m",
      "28.0 mohms/m"
    ],
    correctAnswer: 1,
    explanation: "From BS 7671 Table I1: 2.5mm² conductor = 7.41 mohms/m, 1.5mm² CPC = 12.10 mohms/m. Total (R1+R2) = 7.41 + 12.10 = 19.51 mohms/m or 0.01951 ohms/m. These values are at 20°C; actual values vary with temperature."
  },
  {
    id: 10,
    question: "When is supplementary equipotential bonding required as an alternative to meeting Zs requirements?",
    options: [
      "Never - Zs must always be met",
      "In bathrooms and similar locations where touch voltage must be limited",
      "Only in commercial installations",
      "Only for three-phase circuits"
    ],
    correctAnswer: 1,
    explanation: "In locations of increased shock risk (bathrooms, swimming pools), supplementary bonding can be used instead of meeting Zs requirements. The bonding limits touch voltage even if Zs is high. BS 7671 specifies bonding resistance limits for this approach."
  },
  {
    id: 11,
    question: "A socket circuit has calculated Zs of 0.98 ohms. With 32A Type B MCB (max Zs = 1.44 ohms at 0.4s), is this acceptable?",
    options: [
      "Yes - 0.98 is less than 1.44 ohms",
      "No - must apply 0.8 factor, so max design Zs is 1.15 ohms, and 0.98 is acceptable",
      "No - 0.98 exceeds 0.8 x 1.44 = 1.15, not acceptable",
      "Cannot determine without knowing cable length"
    ],
    correctAnswer: 1,
    explanation: "Applying the 0.8 factor: max design Zs = 1.44 x 0.8 = 1.15 ohms. Calculated Zs of 0.98 ohms is less than 1.15 ohms, so the circuit is acceptable. The circuit will disconnect within 0.4 seconds as required."
  },
  {
    id: 12,
    question: "For a circuit protected by a 30mA RCD, what is the maximum Zs requirement?",
    options: [
      "The same as for the MCB rating",
      "RCDs don't have Zs requirements - they operate on earth leakage current",
      "1667 ohms (50V / 30mA)",
      "Both B and C - RCD limits touch voltage while MCB Zs still applies for overcurrent"
    ],
    correctAnswer: 3,
    explanation: "RCDs provide earth fault protection independent of Zs by detecting current imbalance. However, the associated MCB still provides overcurrent protection, and its Zs requirements ensure adequate fault current for cable thermal protection. The RCD ensures rapid disconnection while MCB protects the cable."
  }
];

const faqs = [
  {
    question: "Why do measured Zs values sometimes exceed calculated values?",
    answer: "Measured values include actual conductor resistance (affected by temperature), contact resistances at terminations, and any additional impedance in the circuit. Calculations use theoretical values. If measured exceeds calculated, check for loose connections, damaged conductors, or incorrect cable installed."
  },
  {
    question: "Can I use RCD protection instead of meeting Zs requirements?",
    answer: "A 30mA RCD provides fault protection by limiting touch voltage duration, effectively bypassing Zs concerns for shock protection. However, the circuit must still have adequate fault current for the adiabatic equation (cable protection). RCD protection is a valid alternative for meeting disconnection time requirements."
  },
  {
    question: "How do I verify Zs for a circuit at design stage?",
    answer: "Calculate Zs = Ze + (R1+R2) where Ze is from DNO data (or measured), and (R1+R2) is calculated from cable length and tabulated resistance values. Apply the 0.8 factor for design. Compare result against maximum values from BS 7671 Tables 41.2-41.4 for the chosen protective device."
  },
  {
    question: "What is the difference between Zs and Ze?",
    answer: "Ze is external earth fault loop impedance - the part of the loop outside your installation (DNO supply). Zs is the total loop impedance including your circuit conductors. Zs = Ze + (R1+R2) where (R1+R2) is the resistance of your circuit's line and CPC conductors."
  },
  {
    question: "Why are Type D MCB maximum Zs values lower than Type B?",
    answer: "Type D MCBs require higher fault current (10-20x In) for magnetic trip operation. Higher fault current requires lower Zs (If = Uo/Zs). Type D is used for very high inrush loads like transformers and welding equipment, but requires lower circuit impedance."
  },
  {
    question: "How does conductor temperature affect Zs during a fault?",
    answer: "Conductor resistance increases by approximately 0.4% per degree C rise. During a fault, conductors heat rapidly. A conductor at 70°C has about 20% higher resistance than at 20°C. This is why the 0.8 multiplier is applied to maximum Zs values for design purposes."
  }
];

const Level3Module6Section2_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Zs formula:</strong> Zs = Ze + (R1 + R2)</li>
              <li><strong>Fault current:</strong> If = Uo / Zs</li>
              <li><strong>Design factor:</strong> Apply 0.8 to max Zs</li>
              <li><strong>Final circuits:</strong> 0.4s max at 230V TN</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Typical Maximum Zs (Type B)</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>6A:</strong> 7.67 ohms (design: 6.13)</li>
              <li><strong>16A:</strong> 2.87 ohms (design: 2.30)</li>
              <li><strong>32A:</strong> 1.44 ohms (design: 1.15)</li>
              <li><strong>40A:</strong> 1.15 ohms (design: 0.92)</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01: Understanding the Earth Fault Loop */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding the Earth Fault Loop
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When an earth fault occurs, current flows from the source (transformer), through the line conductor, through the fault, through the circuit protective conductor (CPC), and back to the source via the earthing system. The total impedance of this path is the earth fault loop impedance, Zs. This impedance determines how much fault current flows, and hence how quickly the protective device operates.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Components of the Earth Fault Loop:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ze:</strong> External loop impedance - transformer winding, supply cable, and DNO earthing</li>
                <li><strong>R1:</strong> Resistance of the line conductor from distribution board to fault point</li>
                <li><strong>R2:</strong> Resistance of the CPC from fault point back to distribution board</li>
                <li><strong>Total:</strong> Zs = Ze + (R1 + R2)</li>
              </ul>
            </div>

            <p>
              Higher Zs means lower fault current (If = Uo/Zs, where Uo is nominal voltage 230V). Lower fault current means slower protective device operation. BS 7671 specifies maximum Zs values for each protective device type and rating to ensure disconnection within required times.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key Principle:</strong> Lower Zs = higher fault current = faster disconnection. The design must ensure Zs is low enough for the protective device to operate within 0.4 seconds for final circuits or 5 seconds for distribution circuits.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Disconnection Time Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Disconnection Time Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 specifies maximum disconnection times to limit the duration of electric shock. For TN systems at 230V, final circuits must disconnect within 0.4 seconds. This time limit comes from research into human tolerance to electric shock - longer exposure at fault voltages causes physiological harm.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">TN Systems (230V)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Final circuits up to 63A: 0.4s</li>
                  <li>Distribution circuits: 5s (with conditions)</li>
                  <li>Based on touch voltage 230V</li>
                  <li>Maximum Zs from Table 41.2-41.4</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">TT Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Disconnection by RCD typically</li>
                  <li>Ra x Ia must not exceed 50V</li>
                  <li>High Ra limits fault current</li>
                  <li>MCBs rarely achieve required times</li>
                </ul>
              </div>
            </div>

            <p>
              The 5-second allowance for distribution circuits applies only where the circuit feeds equipment within the main equipotential zone. If the distribution circuit extends outside this zone (e.g., to a remote building), the 0.4-second requirement applies throughout.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A 32A Type B MCB requires fault current of at least 160A (5 x In) for magnetic trip operation. At 230V, this needs Zs of 230/160 = 1.44 ohms maximum. The published table value is exactly 1.44 ohms.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 03: Calculating Zs for Design */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Calculating Zs for Design
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              At design stage, Zs is calculated using the formula Zs = Ze + (R1 + R2). The external impedance Ze is obtained from the DNO or measured at the installation origin. The (R1 + R2) value is calculated from cable length and tabulated resistance values per metre from BS 7671 Appendix I, Table I1.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Design Calculation Example:</p>
              <ul className="text-sm text-white space-y-2">
                <li><strong>Circuit:</strong> 32A socket radial, 2.5mm² T+E with 1.5mm² CPC</li>
                <li><strong>Length:</strong> 35m from consumer unit</li>
                <li><strong>Ze:</strong> 0.35 ohms (TN-C-S supply)</li>
                <li><strong>(R1+R2)/m:</strong> 7.41 + 12.10 = 19.51 mohms/m = 0.01951 ohms/m</li>
                <li><strong>(R1+R2):</strong> 0.01951 x 35 = 0.68 ohms</li>
                <li><strong>Zs:</strong> 0.35 + 0.68 = 1.03 ohms</li>
                <li><strong>Max design Zs:</strong> 1.44 x 0.8 = 1.15 ohms</li>
                <li><strong>Result:</strong> 1.03 &lt; 1.15 - ACCEPTABLE</li>
              </ul>
            </div>

            <p>
              The 0.8 factor is applied because tabulated resistance values are at 20 degrees C, but during a fault, conductors heat up rapidly. Hot conductors have higher resistance, increasing Zs. The 0.8 factor provides margin for this temperature rise, ensuring the circuit still disconnects in time during an actual fault.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Temperature Factor:</strong> Conductor resistance increases approximately 0.4% per degree C. At maximum operating temperature (70 degrees C for PVC), resistance is about 20% higher than at 20 degrees C. The 0.8 factor accounts for this.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: When Zs Exceeds Limits */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Solutions When Zs Exceeds Limits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When calculated Zs exceeds the maximum permitted value, the design must be modified. Several solutions are available, each with different cost and practicality implications. The goal is to ensure the protective device can disconnect the circuit within the required time.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Increase Cable Size</p>
                <p className="text-white/90 text-xs">Lower R1+R2 per metre reduces total Zs</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Shorten Route</p>
                <p className="text-white/90 text-xs">Less length means lower R1+R2 total</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Add RCD Protection</p>
                <p className="text-white/90 text-xs">RCD provides ADS independent of Zs</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Lower Device Rating</p>
                <p className="text-white/90 text-xs">Lower In = higher permitted Zs</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Use Type B not C</p>
                <p className="text-white/90 text-xs">Type B has higher Zs limits</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Relocate DB</p>
                <p className="text-white/90 text-xs">Position board nearer to loads</p>
              </div>
            </div>

            <p>
              RCD protection is often the most practical solution. A 30mA RCD provides earth fault protection by detecting current imbalance, independent of Zs. The circuit must still have adequate fault current for the adiabatic equation (to protect the cable from overheating during faults), but the RCD handles the shock protection requirement.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Design Tip:</strong> For long circuits or those with high Ze, design with RCD protection from the start. BS 7671 now requires RCD protection for most socket circuits anyway, so this often aligns with other requirements.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common (R1+R2) Values at 20 degrees C</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1.5/1.0mm²:</strong> 30.20 mohms/m (typical lighting)</li>
                <li><strong>2.5/1.5mm²:</strong> 19.51 mohms/m (ring final, 20A radial)</li>
                <li><strong>4.0/1.5mm²:</strong> 16.71 mohms/m (immersion heaters)</li>
                <li><strong>6.0/2.5mm²:</strong> 10.49 mohms/m (showers)</li>
                <li><strong>10/4mm²:</strong> 6.44 mohms/m (cookers)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Ze Design Values</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>TN-S:</strong> 0.80 ohms maximum (use if unknown)</li>
                <li><strong>TN-C-S (PME):</strong> 0.35 ohms maximum</li>
                <li><strong>TT:</strong> Variable - depends on electrode, typically 21 ohms + Ra</li>
                <li>Always use measured value if available (usually lower)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Forgetting the 0.8 factor</strong> - Design must use reduced Zs limits</li>
                <li><strong>Using wrong CPC size</strong> - T+E has reduced CPC, check actual size</li>
                <li><strong>Ignoring Ze changes</strong> - DNO networks change, verify periodically</li>
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Key Formulas</p>
                <ul className="space-y-0.5">
                  <li>Zs = Ze + (R1 + R2)</li>
                  <li>If = Uo / Zs</li>
                  <li>Design Zs max = Table value x 0.8</li>
                  <li>(R1+R2) = (r1+r2)/m x length</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Disconnection Times</p>
                <ul className="space-y-0.5">
                  <li>Final circuits TN: 0.4s</li>
                  <li>Distribution TN: 5s (with conditions)</li>
                  <li>TT with RCD: 0.2s for 30mA</li>
                  <li>Additional protection: 40ms for 30mA</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section2-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Cable Sizing
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section2-4">
              Next: RCD Requirements
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module6Section2_3;
