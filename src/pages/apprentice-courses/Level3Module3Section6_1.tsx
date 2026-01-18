/**
 * Level 3 Module 3 Section 6.1 - Conductor Resistance
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
const TITLE = "Conductor Resistance - Level 3 Module 3 Section 6.1";
const DESCRIPTION = "Master conductor resistance calculations for electrical installations. Learn about resistivity, factors affecting resistance, and how to calculate resistance from cable dimensions.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the resistivity of copper at 20 degrees C?",
    options: [
      "1.72 x 10^-8 ohm metres",
      "2.82 x 10^-8 ohm metres",
      "17.2 ohm metres",
      "28.2 ohm metres"
    ],
    correctIndex: 0,
    explanation: "Copper has a resistivity of 1.72 x 10^-8 ohm metres at 20 degrees C. This very low value is why copper is the most common conductor material. Aluminium has a slightly higher resistivity of 2.82 x 10^-8 ohm metres."
  },
  {
    id: "check-2",
    question: "If you double the length of a conductor, what happens to its resistance?",
    options: [
      "It halves",
      "It doubles",
      "It stays the same",
      "It quadruples"
    ],
    correctIndex: 1,
    explanation: "Resistance is directly proportional to length. Using R = rho x L / A, if length doubles (2L), resistance doubles (2R). Think of it as electrons having twice as far to travel through the material."
  },
  {
    id: "check-3",
    question: "If you double the cross-sectional area of a conductor, what happens to its resistance?",
    options: [
      "It halves",
      "It doubles",
      "It stays the same",
      "It quadruples"
    ],
    correctIndex: 0,
    explanation: "Resistance is inversely proportional to cross-sectional area. Using R = rho x L / A, if area doubles (2A), resistance halves (R/2). Think of it as electrons having more paths available to flow through."
  },
  {
    id: "check-4",
    question: "Which has lower resistance: a 1.5mm squared cable or a 2.5mm squared cable of the same length and material?",
    options: [
      "The 1.5mm squared cable",
      "The 2.5mm squared cable",
      "They have the same resistance",
      "Cannot be determined"
    ],
    correctIndex: 1,
    explanation: "The 2.5mm squared cable has lower resistance because it has a larger cross-sectional area. Resistance is inversely proportional to area, so larger conductors have lower resistance for the same length and material."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "The formula for conductor resistance is:",
    options: [
      "R = rho x A / L",
      "R = rho x L / A",
      "R = L x A / rho",
      "R = rho x L x A"
    ],
    correctAnswer: 1,
    explanation: "R = rho x L / A where R is resistance (ohms), rho is resistivity (ohm metres), L is length (metres), and A is cross-sectional area (square metres). Resistance increases with length and decreases with area."
  },
  {
    id: 2,
    question: "The SI unit of resistivity is:",
    options: [
      "Ohms per metre",
      "Ohm metres",
      "Ohms per square metre",
      "Ohms"
    ],
    correctAnswer: 1,
    explanation: "Resistivity is measured in ohm metres. From R = rho x L / A, rearranging gives rho = R x A / L. The units are ohms x square metres / metres = ohm metres."
  },
  {
    id: 3,
    question: "A 10 metre length of 2.5mm squared copper cable has approximately what resistance at 20 degrees C?",
    options: [
      "0.069 ohms",
      "0.69 ohms",
      "6.9 ohms",
      "0.0069 ohms"
    ],
    correctAnswer: 0,
    explanation: "R = rho x L / A = (1.72 x 10^-8 x 10) / (2.5 x 10^-6) = 0.069 ohms. Note the conversion of mm squared to m squared (divide by 10^6)."
  },
  {
    id: 4,
    question: "Why does aluminium require larger conductor sizes than copper for the same current?",
    options: [
      "Aluminium is cheaper",
      "Aluminium has higher resistivity (about 1.6 times copper)",
      "Aluminium is heavier",
      "Aluminium is more flexible"
    ],
    correctAnswer: 1,
    explanation: "Aluminium has a resistivity of 2.82 x 10^-8 ohm metres compared to copper's 1.72 x 10^-8. This is about 1.6 times higher, so aluminium conductors need to be about 1.6 times the cross-sectional area for equivalent resistance."
  },
  {
    id: 5,
    question: "In cable tables, resistance values are typically given in:",
    options: [
      "Ohms per kilometre",
      "Milliohms per metre",
      "Microohms per metre",
      "Ohms per metre"
    ],
    correctAnswer: 1,
    explanation: "Cable tables commonly express resistance as milliohms per metre (mOhms/m) for practical cable lengths. Appendix 4 of BS 7671 uses mV/A/m values which incorporate resistance. The IET On-Site Guide Table I1 gives R1+R2 values in milliohms per metre."
  },
  {
    id: 6,
    question: "What effect does increasing temperature have on conductor resistance?",
    options: [
      "Resistance decreases",
      "Resistance increases",
      "No effect",
      "Depends on the material"
    ],
    correctAnswer: 1,
    explanation: "For metallic conductors like copper and aluminium, resistance increases with temperature. This is because atomic vibrations increase with temperature, impeding electron flow. The temperature coefficient of copper is approximately +0.004 per degree C."
  },
  {
    id: 7,
    question: "The resistance of a conductor at temperature T can be calculated using:",
    options: [
      "Rt = R20 x (1 + alpha x (T - 20))",
      "Rt = R20 / (1 + alpha x (T - 20))",
      "Rt = R20 + alpha x T",
      "Rt = R20 - alpha x (T - 20)"
    ],
    correctAnswer: 0,
    explanation: "Rt = R20 x (1 + alpha x (T - 20)) where Rt is resistance at temperature T, R20 is resistance at 20 degrees C, and alpha is the temperature coefficient. For copper, alpha is approximately 0.004 per degree C."
  },
  {
    id: 8,
    question: "The IET On-Site Guide Table I1 provides resistance values for:",
    options: [
      "Line conductors only",
      "Neutral conductors only",
      "R1+R2 (line plus circuit protective conductor)",
      "Earth electrode resistance"
    ],
    correctAnswer: 2,
    explanation: "Table I1 in the IET On-Site Guide provides combined R1+R2 values in milliohms per metre for common cable combinations. This is useful for calculating earth fault loop impedance."
  },
  {
    id: 9,
    question: "A stranded conductor has slightly higher resistance than a solid conductor of the same cross-sectional area because:",
    options: [
      "Stranded conductors are longer",
      "Air gaps between strands reduce effective area",
      "The stranding process damages the copper",
      "Stranded conductors use inferior copper"
    ],
    correctAnswer: 1,
    explanation: "The small air gaps between individual strands slightly reduce the effective conducting cross-sectional area. However, the difference is minimal and stranded conductors are preferred for flexibility and ease of installation."
  },
  {
    id: 10,
    question: "When calculating circuit resistance for earth fault loop impedance, why multiply by a factor of 1.2?",
    options: [
      "To account for measurement uncertainty",
      "To account for conductor resistance increase at operating temperature",
      "BS 7671 requires this safety margin",
      "To account for connection resistance"
    ],
    correctAnswer: 1,
    explanation: "The 1.2 factor accounts for the increase in conductor resistance at maximum operating temperature (typically 70 degrees C for thermoplastic) compared to the 20 degrees C values used in tables. Regulation 522.1.5 refers to this."
  },
  {
    id: 11,
    question: "The resistance of 100m of 1.5mm squared / 1.0mm squared twin and earth cable (R1+R2) is approximately:",
    options: [
      "0.3 ohms",
      "3 ohms",
      "30 ohms",
      "0.03 ohms"
    ],
    correctAnswer: 1,
    explanation: "From IET On-Site Guide Table I1, R1+R2 for 1.5/1.0mm squared cable is approximately 30.2 milliohms per metre. For 100m: 30.2 x 100 / 1000 = 3.02 ohms (approximately 3 ohms)."
  },
  {
    id: 12,
    question: "Why is the CPC often smaller than the line conductor in twin and earth cable?",
    options: [
      "To save copper and reduce cost",
      "The CPC only carries fault current, not continuous load current",
      "Smaller CPCs are easier to terminate",
      "BS 7671 does not allow equal sized CPCs"
    ],
    correctAnswer: 1,
    explanation: "The CPC only carries fault current for short durations, not continuous load current. Therefore it can be smaller, reducing cable cost and weight. However, it must be large enough to carry prospective fault current for the disconnection time required."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Why is resistivity measured in ohm metres?",
    answer: "Resistivity (rho) represents the resistance of a unit cube of material (1m x 1m x 1m). The formula R = rho x L / A can be rearranged to rho = R x A / L. The units are ohms x square metres / metres = ohm metres. This standardised unit allows comparison between different materials regardless of conductor dimensions."
  },
  {
    question: "How do I convert between mm squared and m squared for calculations?",
    answer: "To convert mm squared to m squared, divide by 1,000,000 (10^6). For example, 2.5mm squared = 2.5 x 10^-6 m squared. This is a common source of calculation errors - remember that 1mm = 0.001m, so 1mm squared = 0.000001 m squared."
  },
  {
    question: "Why do we need to know conductor resistance for circuit design?",
    answer: "Conductor resistance is essential for: calculating voltage drop (to ensure adequate voltage at the load), determining earth fault loop impedance (to verify protective device operation), calculating cable heating (I squared R losses), and designing circuit protection. BS 7671 sets maximum values for these parameters."
  },
  {
    question: "What is the difference between resistance and impedance?",
    answer: "Resistance opposes DC current flow and is caused by the physical properties of the conductor. Impedance is the total opposition to AC current flow and includes resistance plus reactance (from inductance and capacitance). For most low voltage installations, reactance is negligible and impedance approximately equals resistance."
  },
  {
    question: "How does cable construction affect resistance?",
    answer: "Solid conductors have slightly lower resistance than stranded due to no air gaps. Class 5 (flexible) conductors have more strands and slightly higher resistance than Class 2 (stranded). The conductor material (copper vs aluminium), purity, and any coating (tinning) also affect resistance."
  },
  {
    question: "What resistance values should I use for calculations - 20 degrees C or operating temperature?",
    answer: "Use 20 degrees C values from tables for initial selection. Then apply a temperature correction factor (typically 1.2 for thermoplastic at 70 degrees C) when verifying earth fault loop impedance to ensure compliance at operating temperature. BS 7671 Table 4A2 and Regulation 522.1.5 provide guidance."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module3Section6_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* STICKY HEADER */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section6">
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
            <span>Module 3.6.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Conductor Resistance
          </h1>
          <p className="text-white/80">
            Understanding and calculating resistance in electrical conductors
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Formula:</strong> R = rho x L / A (resistance = resistivity x length / area)</li>
              <li><strong>Copper:</strong> Resistivity = 1.72 x 10^-8 ohm metres</li>
              <li><strong>Temperature:</strong> Resistance increases with temperature</li>
              <li><strong>Tables:</strong> Use IET On-Site Guide Table I1 for R1+R2 values</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Cable sizes (1.5, 2.5, 4, 6mm squared)</li>
              <li><strong>Use:</strong> Table I1 for circuit resistance calculations</li>
              <li><strong>Apply:</strong> Multiply by 1.2 for operating temperature correction</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the concept of resistivity and its units",
              "Calculate conductor resistance from physical dimensions",
              "Apply the resistance formula R = rho x L / A",
              "Understand how temperature affects conductor resistance",
              "Use published tables for resistance values",
              "Apply temperature correction factors for calculations"
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
            Resistivity and the Resistance Formula
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every material has an inherent opposition to current flow called resistivity (symbol: rho). Resistivity is a property of the material itself, independent of the conductor's dimensions. The actual resistance of a conductor depends on three factors: the material's resistivity, the conductor's length, and its cross-sectional area.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-white mb-3">The Resistance Formula:</p>
              <p className="text-2xl text-white font-mono text-center mb-4">R = rho x L / A</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-elec-yellow/80 mb-1">Where:</p>
                  <ul className="text-white/80 space-y-1">
                    <li>R = Resistance (ohms)</li>
                    <li>rho = Resistivity (ohm metres)</li>
                    <li>L = Length (metres)</li>
                    <li>A = Cross-sectional area (square metres)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-elec-yellow/80 mb-1">Key Points:</p>
                  <ul className="text-white/80 space-y-1">
                    <li>Longer conductors = higher resistance</li>
                    <li>Larger area = lower resistance</li>
                    <li>Convert mm squared to m squared (divide by 10^6)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10 my-6">
              <p className="text-sm font-medium text-white mb-2">Common Conductor Material Resistivities (at 20 degrees C):</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-elec-yellow/80">Material</th>
                      <th className="text-left py-2 text-elec-yellow/80">Resistivity (ohm metres)</th>
                      <th className="text-left py-2 text-elec-yellow/80">Relative to Copper</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/5">
                      <td className="py-2">Copper</td>
                      <td className="py-2">1.72 x 10^-8</td>
                      <td className="py-2">1.00</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Aluminium</td>
                      <td className="py-2">2.82 x 10^-8</td>
                      <td className="py-2">1.64</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Silver</td>
                      <td className="py-2">1.59 x 10^-8</td>
                      <td className="py-2">0.92</td>
                    </tr>
                    <tr>
                      <td className="py-2">Gold</td>
                      <td className="py-2">2.44 x 10^-8</td>
                      <td className="py-2">1.42</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Why Copper?</strong> Silver has lower resistivity but is too expensive. Copper offers the best balance of conductivity, cost, and workability. Aluminium is used where weight savings justify the larger conductor size required.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Factors Affecting Conductor Resistance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding how each factor affects resistance is crucial for cable selection and circuit calculations. The resistance formula shows that resistance is directly proportional to length and resistivity, and inversely proportional to cross-sectional area.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-green-400 mb-2">Length Effect</p>
                <p className="text-xs text-white/80 mb-2">Resistance is directly proportional to length:</p>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>Double the length = double the resistance</li>
                  <li>Half the length = half the resistance</li>
                  <li>Electrons travel further, encountering more atomic collisions</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-blue-400 mb-2">Area Effect</p>
                <p className="text-xs text-white/80 mb-2">Resistance is inversely proportional to area:</p>
                <ul className="text-xs text-white/70 space-y-1">
                  <li>Double the area = half the resistance</li>
                  <li>Half the area = double the resistance</li>
                  <li>More pathways available for electron flow</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Worked Example: Calculating Conductor Resistance</p>
              <p className="text-xs text-white/90 mb-2">Calculate the resistance of 25 metres of 4mm squared copper cable at 20 degrees C.</p>
              <div className="text-xs text-white/80 space-y-2 font-mono">
                <p><strong>Given:</strong></p>
                <p className="ml-4">L = 25 m</p>
                <p className="ml-4">A = 4 mm squared = 4 x 10^-6 m squared</p>
                <p className="ml-4">rho (copper) = 1.72 x 10^-8 ohm metres</p>
                <p className="mt-2"><strong>Calculate:</strong></p>
                <p className="ml-4">R = rho x L / A</p>
                <p className="ml-4">R = (1.72 x 10^-8 x 25) / (4 x 10^-6)</p>
                <p className="ml-4">R = 4.3 x 10^-7 / 4 x 10^-6</p>
                <p className="ml-4">R = 0.1075 ohms</p>
                <p className="text-green-400 mt-2">The conductor resistance is approximately 0.108 ohms (108 milliohms)</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Practical Note:</strong> In practice, we rarely calculate from first principles. Tables in BS 7671 Appendix 4 and the IET On-Site Guide provide resistance values for common cable types and sizes.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Temperature Effects on Resistance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              For metallic conductors, resistance increases with temperature. As temperature rises, atoms vibrate more vigorously, creating more collisions with flowing electrons and increasing resistance. This is important because cables operating at their rated current will be hotter than ambient temperature.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-white mb-3">Temperature Correction Formula:</p>
              <p className="text-xl text-white font-mono text-center mb-4">Rt = R20 x (1 + alpha x (T - 20))</p>
              <div className="text-sm text-white/80">
                <p>Where:</p>
                <ul className="ml-4 mt-1 space-y-1">
                  <li>Rt = Resistance at temperature T</li>
                  <li>R20 = Resistance at 20 degrees C</li>
                  <li>alpha = Temperature coefficient (0.004 per degree C for copper)</li>
                  <li>T = Operating temperature in degrees C</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10 my-6">
              <p className="text-sm font-medium text-white mb-2">Temperature Correction Factors:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-elec-yellow/80">Insulation Type</th>
                      <th className="text-left py-2 text-elec-yellow/80">Max Operating Temp</th>
                      <th className="text-left py-2 text-elec-yellow/80">Correction Factor</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/5">
                      <td className="py-2">Thermoplastic (PVC) 70 degrees C</td>
                      <td className="py-2">70 degrees C</td>
                      <td className="py-2">1.20</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Thermosetting (XLPE) 90 degrees C</td>
                      <td className="py-2">90 degrees C</td>
                      <td className="py-2">1.28</td>
                    </tr>
                    <tr>
                      <td className="py-2">Mineral insulated 70 degrees C</td>
                      <td className="py-2">70 degrees C</td>
                      <td className="py-2">1.20</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 my-6">
              <p className="text-sm font-medium text-red-400 mb-2">Important for Earth Fault Loop Impedance</p>
              <p className="text-xs text-white/90">
                When calculating Zs (earth fault loop impedance) to verify protective device operation, measured or calculated values at 20 degrees C must be multiplied by the temperature correction factor. BS 7671 Regulation 522.1.5 refers to this requirement. A circuit that appears to comply at 20 degrees C may not comply at operating temperature.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical Application:</strong> When using a low resistance ohmmeter to measure circuit resistance, readings are taken at ambient temperature (approximately 20 degrees C). Multiply by 1.2 for PVC-insulated cables to determine worst-case resistance at operating temperature.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Using Published Resistance Tables
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              For practical circuit design and verification, published tables provide resistance values for common cable types. The IET On-Site Guide Table I1 is particularly useful, giving combined R1+R2 values (line plus circuit protective conductor) in milliohms per metre.
            </p>

            <div className="p-4 rounded-lg bg-transparent border border-white/10 my-6">
              <p className="text-sm font-medium text-white mb-2">Sample R1+R2 Values from IET On-Site Guide Table I1:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-elec-yellow/80">Line (mm sq)</th>
                      <th className="text-left py-2 text-elec-yellow/80">CPC (mm sq)</th>
                      <th className="text-left py-2 text-elec-yellow/80">R1+R2 (mOhms/m)</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/5">
                      <td className="py-2">1.5</td>
                      <td className="py-2">1.0</td>
                      <td className="py-2">30.2</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">2.5</td>
                      <td className="py-2">1.5</td>
                      <td className="py-2">19.51</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">4.0</td>
                      <td className="py-2">1.5</td>
                      <td className="py-2">16.71</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">6.0</td>
                      <td className="py-2">2.5</td>
                      <td className="py-2">10.49</td>
                    </tr>
                    <tr>
                      <td className="py-2">10.0</td>
                      <td className="py-2">4.0</td>
                      <td className="py-2">6.44</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Values at 20 degrees C for copper conductors</p>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Worked Example: Circuit Resistance Calculation</p>
              <p className="text-xs text-white/90 mb-2">Calculate R1+R2 for a 20m circuit using 2.5/1.5mm squared cable, corrected for operating temperature.</p>
              <div className="text-xs text-white/80 space-y-2 font-mono">
                <p><strong>Step 1:</strong> Find R1+R2 from Table I1</p>
                <p className="ml-4">R1+R2 = 19.51 mOhms/m for 2.5/1.5mm squared</p>
                <p className="mt-2"><strong>Step 2:</strong> Calculate for circuit length</p>
                <p className="ml-4">R1+R2 = 19.51 x 20 = 390.2 mOhms = 0.39 ohms</p>
                <p className="mt-2"><strong>Step 3:</strong> Apply temperature correction (x1.2 for PVC at 70 degrees C)</p>
                <p className="ml-4">R1+R2 (corrected) = 0.39 x 1.2 = 0.47 ohms</p>
                <p className="text-green-400 mt-2">The circuit resistance at operating temperature is 0.47 ohms</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Remember:</strong> Table values are at 20 degrees C. Always apply the temperature correction factor when calculating earth fault loop impedance for protective device verification.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Calculating Circuit Resistance</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use Table I1 for R1+R2 values - saves calculation time</li>
                <li>Measure actual cable length on site - don't estimate</li>
                <li>Include cable in containment systems (longer than direct routes)</li>
                <li>Apply 1.2 correction factor for PVC at operating temperature</li>
                <li>Round up, not down, for safety margin</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Measuring Resistance</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ensure circuit is isolated and proved dead</li>
                <li>Use calibrated low resistance ohmmeter</li>
                <li>Note ambient temperature at time of test</li>
                <li>Apply temperature correction for operating conditions</li>
                <li>Compare measured values with calculated design values</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Unit conversion errors</strong> - mm squared to m squared requires dividing by 10^6</li>
                <li><strong>Forgetting temperature correction</strong> - measured values are at ambient, not operating temperature</li>
                <li><strong>Using wrong table column</strong> - ensure correct conductor combination</li>
                <li><strong>Cable route length</strong> - actual route is often longer than direct distance</li>
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
                <p className="font-medium text-white mb-1">Key Formulae</p>
                <ul className="space-y-0.5">
                  <li>R = rho x L / A</li>
                  <li>Rt = R20 x (1 + alpha x (T - 20))</li>
                  <li>Copper rho = 1.72 x 10^-8 ohm m</li>
                  <li>Copper alpha = 0.004 per degree C</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Temperature Factors</p>
                <ul className="space-y-0.5">
                  <li>PVC 70 degrees C: x1.20</li>
                  <li>XLPE 90 degrees C: x1.28</li>
                  <li>Table I1 values at 20 degrees C</li>
                  <li>Always apply correction for Zs</li>
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
            <Link to="/study-centre/apprentice/level3-module3-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section6-2">
              Next: Resistance and Voltage Drop
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module3Section6_1;
