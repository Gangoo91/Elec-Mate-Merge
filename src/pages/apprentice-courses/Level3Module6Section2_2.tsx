/**
 * Level 3 Module 6 Section 2.2 - Cable Sizing and Voltage Drop Calculations
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Cable Sizing and Voltage Drop Calculations - Level 3 Module 6 Section 2.2";
const DESCRIPTION = "Master the cable sizing process using BS 7671 Appendix 4, including design current, correction factors, tabulated current, and voltage drop verification with worked examples.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the correct order of currents in the cable sizing equation?",
    options: [
      "It >= In >= Ib",
      "Ib <= In <= Iz",
      "Iz <= In <= Ib",
      "In <= Ib <= It"
    ],
    correctIndex: 1,
    explanation: "The fundamental cable sizing relationship is Ib <= In <= Iz, where Ib is design current, In is protective device rating, and Iz is cable current-carrying capacity. The design current must not exceed device rating, which must not exceed cable capacity."
  },
  {
    id: "check-2",
    question: "What is the maximum permitted voltage drop for a 230V lighting circuit according to BS 7671?",
    options: [
      "11.5V (5%)",
      "6.9V (3%)",
      "9.2V (4%)",
      "2.3V (1%)"
    ],
    correctIndex: 1,
    explanation: "BS 7671 recommends maximum 3% voltage drop from origin to current-using equipment for lighting circuits, which is 6.9V on a 230V supply. This tighter limit prevents visible flicker and dimming with sensitive lighting loads."
  },
  {
    id: "check-3",
    question: "If Ca = 0.87, Cg = 0.65, and Ci = 1.0, what is the overall correction factor?",
    options: [
      "2.52",
      "0.57",
      "1.52",
      "0.22"
    ],
    correctIndex: 1,
    explanation: "Correction factors multiply together: 0.87 x 0.65 x 1.0 = 0.5655, approximately 0.57. This means the cable's tabulated current capacity must be divided by 0.57 (or multiplied by 1/0.57 = 1.75) to find the required tabulated value It."
  },
  {
    id: "check-4",
    question: "A cable has tabulated mV/A/m value of 7.3 for 2.5mm². A 25m run carrying 20A has voltage drop of:",
    options: [
      "3.65V",
      "36.5V",
      "0.365V",
      "365V"
    ],
    correctIndex: 0,
    explanation: "Voltage drop = (mV/A/m x Ib x L) / 1000 = (7.3 x 20 x 25) / 1000 = 3.65V. The formula divides by 1000 because the table values are in millivolts. This 3.65V drop is 1.6% on a 230V circuit, well within limits."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does Ib represent in cable sizing calculations?",
    options: [
      "The breaking capacity of the protective device",
      "The design current of the circuit under normal load conditions",
      "The insulation class of the cable",
      "The bonding conductor current"
    ],
    correctAnswer: 1,
    explanation: "Ib is the design current - the maximum current expected to flow in the circuit under normal operating conditions. For a fixed appliance, it's calculated from power rating. For socket circuits, it's typically assumed as the protective device rating."
  },
  {
    id: 2,
    question: "A 9kW shower on a 230V supply has a design current (Ib) of:",
    options: [
      "39.1A",
      "27.6A",
      "45.0A",
      "9.0A"
    ],
    correctAnswer: 0,
    explanation: "Ib = P / V = 9000 / 230 = 39.1A. This is the current that will flow when the shower is operating at full power. The cable and protective device must be sized to accommodate this current continuously."
  },
  {
    id: 3,
    question: "BS 7671 Appendix 4 Table 4D5 provides current-carrying capacities for:",
    options: [
      "Single-core cables in water",
      "Multicore thermoplastic insulated cables",
      "Aluminium conductors only",
      "Underground cables only"
    ],
    correctAnswer: 1,
    explanation: "Table 4D5 covers multicore thermoplastic (PVC) insulated cables - the most common type in domestic and light commercial installations (Twin and Earth). Different tables cover different cable types, installation methods, and conductor materials."
  },
  {
    id: 4,
    question: "A circuit design shows: Ib = 28A, In = 32A, cable clipped direct with It = 40A. Is this correct?",
    options: [
      "No - Ib exceeds In",
      "No - In exceeds Iz (which equals It here)",
      "Yes - Ib <= In <= Iz relationship is satisfied",
      "Cannot be determined without cable length"
    ],
    correctAnswer: 2,
    explanation: "With no correction factors, Iz = It = 40A. The relationship Ib (28A) <= In (32A) <= Iz (40A) is satisfied. The cable can carry more than the protective device rating, which can carry more than the design current. This is correct."
  },
  {
    id: 5,
    question: "Why must correction factor Ca be applied for cables in high ambient temperature areas?",
    options: [
      "Hot cables are more dangerous to touch",
      "Higher ambient temperature reduces the temperature difference available for heat dissipation",
      "Building regulations require it",
      "It only applies to outdoor installations"
    ],
    correctAnswer: 1,
    explanation: "Cable current capacity is based on allowing the conductor to reach its maximum operating temperature (70°C for PVC). Higher ambient temperature means less temperature rise is available before reaching this limit, so current capacity must be reduced via Ca factor."
  },
  {
    id: 6,
    question: "The correction factor Ci for cables enclosed in thermal insulation for less than 100mm is:",
    options: [
      "0.5",
      "0.75",
      "0.89",
      "1.0"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 Table 52.2 shows Ci = 0.89 for cables passing through thermal insulation for 100mm or less. Longer lengths in insulation require Ci = 0.5. The factor accounts for reduced heat dissipation when insulation surrounds the cable."
  },
  {
    id: 7,
    question: "What is the maximum voltage drop permitted from the origin to the furthest point for a power circuit?",
    options: [
      "3% (6.9V at 230V)",
      "4% (9.2V at 230V) when supply is from public network",
      "5% (11.5V at 230V)",
      "10% (23V at 230V)"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 Appendix 12 recommends maximum 5% voltage drop for power circuits (11.5V at 230V) from the origin of the installation. Within private installations, an additional 0.5% for supply is typical, allowing the full 5% for the installation."
  },
  {
    id: 8,
    question: "To calculate required tabulated current (It), the formula is:",
    options: [
      "It = Ib x Ca x Cg x Ci",
      "It = In / (Ca x Cg x Ci)",
      "It = Ib / (Ca x Cg x Ci)",
      "It = In x Ca x Cg x Ci"
    ],
    correctAnswer: 1,
    explanation: "It = In / (Ca x Cg x Ci). The required tabulated current is found by dividing the protective device rating by the product of all correction factors. This gives the minimum current rating to select from the tables, ensuring Iz >= In after applying corrections."
  },
  {
    id: 9,
    question: "A 30m cable run using 4mm² T+E (7.3 mV/A/m) carries 25A. The voltage drop is:",
    options: [
      "2.19V",
      "5.48V",
      "21.9V",
      "54.75V"
    ],
    correctAnswer: 1,
    explanation: "Voltage drop = (mV/A/m x Ib x L) / 1000 = (7.3 x 25 x 30) / 1000 = 5.475V, approximately 5.48V. This is 2.4% of 230V, which is within the 5% limit for power circuits but would need checking if total circuit voltage drop approached the limit."
  },
  {
    id: 10,
    question: "When cable sizing results in voltage drop marginally exceeding limits, what solutions are available?",
    options: [
      "Ignore it - voltage drop limits are only recommendations",
      "Increase cable size to reduce voltage drop",
      "Add more correction factors",
      "Reduce the length of the circuit"
    ],
    correctAnswer: 1,
    explanation: "Increasing cable size reduces voltage drop because larger cables have lower resistance per metre (lower mV/A/m values). Other solutions include splitting into multiple circuits, relocating the distribution board nearer to loads, or accepting reduced performance if within practical limits."
  },
  {
    id: 11,
    question: "A ring final circuit uses 2.5mm² cable with 32A protection. The cable has It = 27A clipped direct. With grouping factor 0.65 and all other factors as 1.0, is the cable acceptable?",
    options: [
      "Yes - ring circuits share current between two paths",
      "No - It (27A) is less than In (32A)",
      "Yes - voltage drop will be acceptable",
      "Cannot determine without ambient temperature"
    ],
    correctAnswer: 0,
    explanation: "Ring final circuits are a special case. With two paths sharing current, each leg carries about half the total current. BS 7671 permits 2.5mm² with 32A protection specifically for ring circuits, as each leg effectively sees up to 20A in worst-case load distribution."
  },
  {
    id: 12,
    question: "What reference method should be used for cables in conduit on a wall surface?",
    options: [
      "Reference Method A - enclosed in conduit in thermally insulating wall",
      "Reference Method B - enclosed in conduit on wall or ceiling",
      "Reference Method C - clipped direct",
      "Reference Method D - in ground"
    ],
    correctAnswer: 1,
    explanation: "Reference Method B covers cables enclosed in conduit or trunking on a wall or ceiling surface. Method A is for conduit in thermally insulating walls. Method C is for cables clipped directly to surfaces. Each method has different current-carrying capacity values due to different heat dissipation."
  }
];

const faqs = [
  {
    question: "Do I need to apply correction factors to the voltage drop calculation?",
    answer: "No - voltage drop calculations use the actual design current (Ib) and cable length. Correction factors affect current-carrying capacity, not voltage drop. However, if you increased cable size due to correction factors, you would use the mV/A/m value for that larger cable in voltage drop calculations."
  },
  {
    question: "What if multiple correction factors apply - do I use the worst one or multiply them?",
    answer: "Multiply all applicable correction factors together. For example, if Ca = 0.87 (ambient temp), Cg = 0.70 (grouping), and Ci = 0.89 (thermal insulation), the combined factor is 0.87 x 0.70 x 0.89 = 0.54. The required It = In / 0.54, significantly larger than without corrections."
  },
  {
    question: "How do I size cables for motor circuits where starting current exceeds running current?",
    answer: "Size for the running current (design current), not starting current. Motors are allowed inrush current for short periods - BS 7671 permits up to 6x running current for direct-on-line starts. Protective devices must be selected to not trip on start but still protect the cable."
  },
  {
    question: "Can I use a larger protective device if my cable sizing is marginal?",
    answer: "Only if the cable can handle it (Iz >= In) and the circuit application permits. Socket circuits must use 32A maximum, some appliance circuits have specific ratings. Increasing device rating increases fault energy let-through, which may affect cable protection per the adiabatic equation."
  },
  {
    question: "What cable sizing approach do I use for circuits with variable load?",
    answer: "Size for the maximum expected demand (design current Ib), considering any diversity that can be justified. For socket circuits, assume full protective device rating. For known loads, calculate from actual power. For intermittent loads, consider duty cycle if manufacturer data allows reduced sizing."
  },
  {
    question: "How do I handle voltage drop for three-phase circuits?",
    answer: "Use three-phase mV/A/m values from appropriate tables (different from single-phase values). For balanced loads: VD = (mV/A/m x Ib x L) / 1000. Remember that three-phase voltage drop limits are the same percentage but applied to 400V (giving 20V for 5%, or 12V for 3% lighting)."
  }
];

const Level3Module6Section2_2 = () => {
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
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cable Sizing and Voltage Drop Calculations
          </h1>
          <p className="text-white/80">
            Applying BS 7671 Appendix 4 methodology for cable selection
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Key relationship:</strong> Ib &lt;= In &lt;= Iz</li>
              <li><strong>Calculate:</strong> It = In / (Ca x Cg x Ci)</li>
              <li><strong>Voltage drop:</strong> VD = (mV/A/m x Ib x L) / 1000</li>
              <li><strong>Limits:</strong> 3% lighting, 5% power</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">BS 7671 Appendix 4 Tables</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>4B1:</strong> Ca - ambient temperature</li>
              <li><strong>4C1-4C6:</strong> Cg - grouping factors</li>
              <li><strong>4D5:</strong> PVC multicore capacities</li>
              <li><strong>4D5B:</strong> Voltage drop values</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate design current from load characteristics",
              "Apply correction factors for installation conditions",
              "Determine minimum cable size from Appendix 4 tables",
              "Calculate voltage drop and verify against limits",
              "Select appropriate reference methods",
              "Complete worked cable sizing calculations"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The Cable Sizing Process */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Cable Sizing Process
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable sizing follows a systematic process to ensure the cable can safely carry the required current under the specific installation conditions, while maintaining voltage within acceptable limits. The fundamental requirement is that the cable's current-carrying capacity (Iz) must equal or exceed the protective device rating (In), which must equal or exceed the design current (Ib).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Cable Sizing Steps:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Step 1:</strong> Determine design current Ib from the load</li>
                <li><strong>Step 2:</strong> Select protective device rating In (where In &gt;= Ib)</li>
                <li><strong>Step 3:</strong> Identify installation conditions and correction factors</li>
                <li><strong>Step 4:</strong> Calculate required tabulated current It = In / (Ca x Cg x Ci)</li>
                <li><strong>Step 5:</strong> Select cable from tables where tabulated value &gt;= It</li>
                <li><strong>Step 6:</strong> Verify voltage drop is within limits</li>
                <li><strong>Step 7:</strong> Verify cable is protected against fault current (adiabatic check)</li>
              </ul>
            </div>

            <p>
              The relationship Ib &lt;= In &lt;= Iz must always be satisfied. After applying correction factors, the cable's actual capacity (Iz) equals the tabulated capacity (It) multiplied by the correction factors. The design ensures that even under adverse conditions, the cable can safely carry the current without exceeding its maximum operating temperature.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key Formula:</strong> It = In / (Ca x Cg x Ci). This gives the minimum tabulated current-carrying capacity required. Select a cable from the tables with a value equal to or greater than this calculated It.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Correction Factors */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Correction Factors Explained
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correction factors account for installation conditions that reduce cable current-carrying capacity. The tabulated values in BS 7671 assume specific reference conditions - when actual conditions are worse, correction factors reduce the effective capacity. The main factors are ambient temperature (Ca), grouping (Cg), and thermal insulation (Ci).
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ca - Ambient Temperature</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Tables assume 30 degrees C ambient</li>
                  <li>Higher temps = lower Ca</li>
                  <li>35 degrees C: Ca = 0.94</li>
                  <li>40 degrees C: Ca = 0.87</li>
                  <li>45 degrees C: Ca = 0.79</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cg - Grouping</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Multiple cables share heat</li>
                  <li>2 circuits: Cg = 0.80</li>
                  <li>3 circuits: Cg = 0.70</li>
                  <li>4 circuits: Cg = 0.65</li>
                  <li>6 circuits: Cg = 0.57</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ci - Thermal Insulation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Insulation traps heat</li>
                  <li>Touch only: Ci = 1.0</li>
                  <li>Up to 100mm: Ci = 0.89</li>
                  <li>100-200mm: Ci = 0.81</li>
                  <li>Surrounded: Ci = 0.5</li>
                </ul>
              </div>
            </div>

            <p>
              All applicable factors multiply together. A cable in a hot plant room (Ca = 0.87) grouped with 3 other circuits (Cg = 0.70) passing through 50mm of insulation (Ci = 0.89) has overall factor = 0.87 x 0.70 x 0.89 = 0.54. The required It = In / 0.54, nearly double what would be needed without corrections.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Worked Example:</strong> A 32A circuit in 40 degrees C (Ca = 0.87) grouped with 2 others (Cg = 0.80), no insulation (Ci = 1.0). It = 32 / (0.87 x 0.80 x 1.0) = 32 / 0.696 = 46.0A. Select a cable rated at least 46A from the appropriate table.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03: Voltage Drop Calculations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Voltage Drop Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every cable has resistance, and current flowing through resistance causes voltage drop (V = IR). This means the voltage at the load is lower than at the source. BS 7671 limits voltage drop to ensure equipment operates correctly and efficiently. Lighting is particularly sensitive to voltage drop, hence the tighter 3% limit.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Voltage Drop Limits (BS 7671 Appendix 12):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Lighting circuits:</strong> Maximum 3% = 6.9V on 230V supply</li>
                <li><strong>Other circuits:</strong> Maximum 5% = 11.5V on 230V supply</li>
                <li><strong>Total from public supply:</strong> 5% for low voltage installations</li>
                <li><strong>Three-phase:</strong> Same percentages apply to 400V (12V for 3%, 20V for 5%)</li>
              </ul>
            </div>

            <p>
              The voltage drop formula uses tabulated mV/A/m values from Appendix 4 tables. These values give the voltage drop in millivolts for each ampere of current flowing through each metre of cable. For single-phase circuits: VD = (mV/A/m x Ib x L) / 1000, where L is the one-way cable length.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The mV/A/m values already account for the return path in single-phase circuits (they're for the complete circuit, not just one conductor). For three-phase circuits, use the three-phase mV/A/m values which are typically lower.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Complete Worked Example */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Complete Worked Example
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Let's work through a complete cable sizing calculation for a real circuit. Consider a 7.2kW electric shower located 18m from the consumer unit. The cable runs clipped direct to a joist, grouped with one other cable, in a loft space where ambient temperature reaches 35 degrees C.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Step-by-Step Calculation:</p>
              <ul className="text-sm text-white space-y-2">
                <li><strong>Step 1:</strong> Ib = P / V = 7200 / 230 = 31.3A</li>
                <li><strong>Step 2:</strong> Select In = 32A MCB (next standard rating above Ib)</li>
                <li><strong>Step 3:</strong> Identify factors: Ca = 0.94 (35C), Cg = 0.80 (2 circuits), Ci = 1.0</li>
                <li><strong>Step 4:</strong> It = 32 / (0.94 x 0.80 x 1.0) = 32 / 0.752 = 42.6A</li>
                <li><strong>Step 5:</strong> From Table 4D5, Method C: 6mm² T+E = 46A (greater than 42.6A required)</li>
                <li><strong>Step 6:</strong> Voltage drop: From Table 4D5B, 6mm² = 7.3 mV/A/m</li>
                <li><strong>VD calculation:</strong> VD = (7.3 x 31.3 x 18) / 1000 = 4.11V = 1.8% (within 5% limit)</li>
              </ul>
            </div>

            <p>
              The calculation shows that 6mm² Twin and Earth is suitable for this 7.2kW shower circuit. The cable capacity after applying correction factors (46 x 0.752 = 34.6A) exceeds the protective device rating of 32A. The voltage drop of 1.8% is well within the 5% limit for power circuits.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Verification:</strong> Check Ib (31.3A) &lt;= In (32A) &lt;= Iz (34.6A). Confirmed. If the circuit was longer, or if there were more correction factors, a larger cable might be needed to stay within voltage drop limits even if current capacity was acceptable.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Cable Sizes and Typical Uses</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1.5mm²:</strong> Lighting circuits (6-10A), signal cables</li>
                <li><strong>2.5mm²:</strong> Ring finals, 20A radials, general socket circuits</li>
                <li><strong>4mm²:</strong> 32A radials, immersion heaters, high-power appliances</li>
                <li><strong>6mm²:</strong> Electric showers (up to 9kW), cooker circuits (with 10mm² tails)</li>
                <li><strong>10mm²:</strong> Large cookers, high-power equipment, sub-main cables</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Drop Solutions</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Increase cable size - lower resistance reduces voltage drop proportionally</li>
                <li>Relocate distribution board closer to main loads</li>
                <li>Split long runs into multiple circuits from different locations</li>
                <li>For lighting, consider 2.5mm² if 1.5mm² gives marginal voltage drop</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Forgetting grouping factors</strong> - Common cause of undersized cables</li>
                <li><strong>Using wrong table</strong> - Ensure table matches cable type and installation method</li>
                <li><strong>Ignoring thermal insulation</strong> - Cables in lofts often pass through insulation</li>
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
                <p className="font-medium text-white mb-1">Cable Sizing Formulas</p>
                <ul className="space-y-0.5">
                  <li>Ib = P / V (design current)</li>
                  <li>It = In / (Ca x Cg x Ci)</li>
                  <li>Iz = It x Ca x Cg x Ci</li>
                  <li>VD = (mV/A/m x Ib x L) / 1000</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Voltage Drop Limits</p>
                <ul className="space-y-0.5">
                  <li>Lighting: 3% (6.9V at 230V)</li>
                  <li>Power: 5% (11.5V at 230V)</li>
                  <li>3-phase lighting: 12V at 400V</li>
                  <li>3-phase power: 20V at 400V</li>
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
            <Link to="/study-centre/apprentice/level3-module6-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section2-3">
              Next: Earth Fault Loop Impedance
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module6Section2_2;
