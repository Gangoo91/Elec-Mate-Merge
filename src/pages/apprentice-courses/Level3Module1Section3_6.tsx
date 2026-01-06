/**
 * Level 3 Module 1 Section 3.6 - RCDs and Protection Systems in Practice
 *
 * Covers: RCD types, operation, testing, coordination, and practical applications
 * Following Level3ContentTemplate.tsx design pattern
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
const TITLE = "RCDs and Protection Systems - Level 3 Module 1 Section 3.6";
const DESCRIPTION = "Learn about Residual Current Devices (RCDs), their operation principles, types, testing requirements, and coordination with other protective devices.";

// ============================================
// INLINE CHECK QUESTIONS (4 per page)
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What does an RCD actually detect?",
    options: [
      "Overcurrent (too much current flowing)",
      "An imbalance between line and neutral currents",
      "Voltage too high or too low",
      "Temperature of the cable"
    ],
    correctIndex: 1,
    explanation: "An RCD compares the current flowing in the line conductor with the current returning in the neutral. If they're not equal, current must be leaking to earth (possibly through a person). The RCD detects this imbalance and disconnects."
  },
  {
    id: "check-2",
    question: "A 30mA RCD must trip within what time when tested at its rated current?",
    options: [
      "300ms (0.3 seconds)",
      "200ms (0.2 seconds)",
      "40ms (0.04 seconds)",
      "1 second"
    ],
    correctIndex: 0,
    explanation: "At rated residual current (30mA), an RCD must trip within 300ms. However, at 5 times rated current (150mA), it must trip within 40ms. The faster tripping at higher fault currents provides better protection during more severe faults."
  },
  {
    id: "check-3",
    question: "Why might a 30mA RCD trip when there's no fault?",
    options: [
      "It's broken",
      "Normal earth leakage from equipment (filters, long cable runs) can accumulate to trip level",
      "The electricity is too powerful",
      "30mA RCDs always nuisance trip"
    ],
    correctIndex: 1,
    explanation: "Electronic equipment often has intentional earth leakage through RFI filters. Long cable runs have capacitive leakage. Multiple circuits on one RCD can accumulate enough leakage to approach the trip threshold. Circuit design must account for this."
  },
  {
    id: "check-4",
    question: "What is the purpose of an RCBO compared to a standard RCD?",
    options: [
      "It only provides overcurrent protection",
      "It combines RCD protection with MCB overcurrent protection in one device",
      "It has a higher earth leakage rating",
      "It's only used for three-phase systems"
    ],
    correctIndex: 1,
    explanation: "An RCBO (Residual Current Breaker with Overcurrent protection) combines an RCD and MCB in a single device. This provides both earth fault protection AND overcurrent/short-circuit protection, offering individual circuit protection without affecting other circuits."
  }
];

// ============================================
// QUIZ QUESTIONS (12 questions)
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What does RCD stand for?",
    options: [
      "Regulated Current Device",
      "Residual Current Device",
      "Resistance Control Device",
      "Reactive Current Detector"
    ],
    correctAnswer: 1,
    explanation: "RCD stands for Residual Current Device. 'Residual' refers to the residual (remaining) current that should be zero if all current leaving via line returns via neutral. Any residual current indicates earth leakage."
  },
  {
    id: 2,
    question: "At what current level must a 30mA RCD trip within 40ms?",
    options: [
      "30mA",
      "15mA",
      "150mA (5 x rated)",
      "300mA"
    ],
    correctAnswer: 2,
    explanation: "An RCD must trip within 40ms when tested at 5 times its rated residual current (5 x 30mA = 150mA). This ensures fast disconnection during more severe faults. The 300ms limit applies at rated current (30mA)."
  },
  {
    id: 3,
    question: "What type of RCD is required for circuits that may have DC components in the earth fault current?",
    options: [
      "Type AC",
      "Type A",
      "Type B",
      "Type S"
    ],
    correctAnswer: 2,
    explanation: "Type B RCDs detect AC, pulsating DC, and smooth DC residual currents. They're required where DC fault currents might occur, such as circuits supplying certain EV chargers, inverters, or variable speed drives. Type A only detects AC and pulsating DC."
  },
  {
    id: 4,
    question: "How often should the integral test button on an RCD be operated?",
    options: [
      "Never",
      "Annually by a qualified person only",
      "Quarterly (every 3 months) by the user",
      "Only when there's a fault"
    ],
    correctAnswer: 2,
    explanation: "RCD test buttons should be operated quarterly (every 3 months) by the user. This verifies the mechanical trip mechanism is working. It doesn't test the trip current or time - that requires proper test instruments - but confirms the device can physically disconnect."
  },
  {
    id: 5,
    question: "What is a time-delayed RCD (Type S) used for?",
    options: [
      "To trip faster than standard RCDs",
      "To provide discrimination, allowing downstream RCDs to trip first",
      "To increase the trip current",
      "For outdoor use only"
    ],
    correctAnswer: 1,
    explanation: "Type S (time-delayed or selective) RCDs have a built-in delay allowing downstream instantaneous RCDs to trip first. This provides discrimination - only the affected circuit trips, not the entire installation. They're typically rated at 100mA or 300mA."
  },
  {
    id: 6,
    question: "What rating RCD provides additional protection against electric shock?",
    options: [
      "100mA",
      "300mA",
      "30mA or less",
      "500mA"
    ],
    correctAnswer: 2,
    explanation: "30mA (or lower) RCDs provide additional protection against electric shock by limiting the earth fault current duration and magnitude. BS 7671 requires 30mA RCDs for circuits where the risk of direct contact shock is highest (socket outlets, outdoor circuits, bathrooms)."
  },
  {
    id: 7,
    question: "Why don't RCDs protect against line-to-neutral faults?",
    options: [
      "They're not designed properly",
      "Because the current flowing out equals current returning - no imbalance detected",
      "They need three-phase supply for that",
      "RCDs do protect against line-to-neutral faults"
    ],
    correctAnswer: 1,
    explanation: "RCDs detect imbalance between line and neutral currents. In a line-to-neutral fault, current flows out on line and returns on neutral - they're equal, so no imbalance exists. Overcurrent devices (MCBs, fuses) protect against these faults."
  },
  {
    id: 8,
    question: "What happens to an RCD if the neutral is lost (broken)?",
    options: [
      "It trips immediately",
      "Nothing, it continues working normally",
      "It cannot detect earth faults as there's no return path to compare",
      "It becomes more sensitive"
    ],
    correctAnswer: 2,
    explanation: "If the neutral is lost, the RCD has no return current to compare against the line current. It cannot detect earth faults because it can't measure the imbalance. This is why broken neutrals are dangerous - protection is lost."
  },
  {
    id: 9,
    question: "During an instrument test, an RCD trips at 22mA. Is this acceptable?",
    options: [
      "No, it's tripping too low",
      "Yes, it must trip between 50% and 100% of rated current (15mA-30mA for a 30mA RCD)",
      "No, it should only trip at exactly 30mA",
      "Yes, but only for Type B RCDs"
    ],
    correctAnswer: 1,
    explanation: "RCDs must trip between 50% and 100% of their rated residual current. For a 30mA RCD, this means it must trip somewhere between 15mA and 30mA. Tripping at 22mA is within this range and indicates correct operation."
  },
  {
    id: 10,
    question: "What does an RCCB protect against?",
    options: [
      "Overcurrent only",
      "Earth faults only (no overcurrent protection)",
      "Short circuits only",
      "Voltage fluctuations"
    ],
    correctAnswer: 1,
    explanation: "An RCCB (Residual Current Circuit Breaker) provides earth fault protection only. It does NOT provide overcurrent protection. It must be used in conjunction with an MCB or fuse for complete circuit protection. RCBOs combine both functions."
  },
  {
    id: 11,
    question: "A 100mA RCD at the origin is being bypassed by an earth fault on a circuit with a 30mA RCD. What's happening?",
    options: [
      "Normal operation - 30mA trips, 100mA doesn't",
      "The 100mA RCD is faulty",
      "The fault current is between 30mA and 100mA, so only the 30mA trips",
      "Both should trip simultaneously"
    ],
    correctAnswer: 2,
    explanation: "If the fault current is, say, 50mA - this exceeds the 30mA threshold (trips) but is below the 100mA threshold (doesn't trip). This is normal discrimination. For better discrimination, use a time-delayed (Type S) RCD at the origin."
  },
  {
    id: 12,
    question: "What test should be performed on an RCD to verify it trips at the correct current level?",
    options: [
      "Pressing the test button only",
      "An instrument test applying a measured current and checking trip time",
      "Insulation resistance test",
      "Earth loop impedance test only"
    ],
    correctAnswer: 1,
    explanation: "Instrument testing applies known currents (typically 50%, 100%, and 500% of rated) and measures trip times. This verifies the RCD trips at the correct current and within required times. The test button only checks mechanical function, not calibration."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Can an RCD protect against all electric shocks?",
    answer: "No. RCDs protect against earth faults (current flowing to earth through your body). They don't protect if you touch live and neutral simultaneously (e.g., both pins of a plug) because no current flows to earth. Basic precautions (insulation, barriers, safe isolation) remain essential."
  },
  {
    question: "Why does my RCD trip when I switch on certain appliances?",
    answer: "Some appliances (especially those with motors, heating elements, or electronic controls) have inrush currents or filter capacitors that cause a brief earth leakage spike on switch-on. If this exceeds 30mA, the RCD trips. Solutions include RCDs with surge delay (but not time-delayed Type S for shock protection), separate circuits, or checking for actual faults."
  },
  {
    question: "What's the difference between an RCD and an RCBO?",
    answer: "An RCD (or RCCB) provides only earth fault protection - it needs a separate MCB for overcurrent protection. An RCBO combines both functions in one device. Using RCBOs for individual circuits provides better discrimination (one faulty circuit doesn't trip others) but costs more than split-load boards with shared RCDs."
  },
  {
    question: "Do RCDs need replacing after a certain time?",
    answer: "RCDs don't have a defined lifespan, but they should be tested regularly and replaced if they fail tests or show signs of damage. Mechanical wear from repeated tripping can eventually cause failure. Some manufacturers recommend replacement after 10-20 years. Always replace if test button operation becomes stiff or unreliable."
  },
  {
    question: "Why do some circuits not require RCD protection?",
    answer: "BS 7671 allows certain circuits to omit RCD protection where the risk is assessed as low (e.g., fixed equipment in non-domestic premises with skilled users) or where disconnection could cause greater danger (fire detection, emergency lighting - though these may still have RCD protection). The vast majority of circuits now require RCD protection."
  },
  {
    question: "Can I replace a 30mA RCD with a 100mA to stop nuisance tripping?",
    answer: "Generally no - if the circuit requires 30mA protection (most socket outlets, outdoor circuits), a 100mA won't meet regulations. The solution is to identify and fix the cause of nuisance tripping, not reduce protection. You may need to split circuits onto separate RCDs or identify faulty equipment."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module1Section3_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* ========================================
          STICKY HEADER
          ======================================== */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module1-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* ========================================
          MAIN ARTICLE CONTENT
          ======================================== */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* ----------------------------------------
            HEADER
            ---------------------------------------- */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1 Section 3.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            RCDs and Protection Systems
          </h1>
          <p className="text-white/80">
            How residual current devices protect against electric shock and when to use them
          </p>
        </header>

        {/* ----------------------------------------
            QUICK SUMMARY BOXES
            ---------------------------------------- */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Detection:</strong> RCDs sense imbalance between line and neutral (earth leakage)</li>
              <li><strong>30mA:</strong> Provides additional shock protection - required for most circuits</li>
              <li><strong>Types:</strong> AC (basic), A (pulsating DC), B (smooth DC), S (time-delayed)</li>
              <li><strong>Testing:</strong> Button quarterly, instrument test at inspection</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> RCDs in consumer units, test buttons, rating labels</li>
              <li><strong>Test:</strong> Press test button, use RCD tester at inspection</li>
              <li><strong>Know:</strong> What type (AC/A/B), what rating (30/100/300mA)</li>
              <li><strong>Check:</strong> Trip time and current during formal testing</li>
            </ul>
          </div>
        </div>

        {/* ----------------------------------------
            LEARNING OUTCOMES
            ---------------------------------------- */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand how RCDs detect earth faults",
              "Identify different RCD types and their applications",
              "Know testing requirements and interpret results",
              "Apply BS 7671 requirements for RCD protection",
              "Troubleshoot nuisance tripping issues",
              "Coordinate RCDs for discrimination"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ----------------------------------------
            CONTENT SECTION 01
            ---------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            How RCDs Work
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An RCD continuously compares the current flowing out through the line conductor with the current returning through the neutral. In a healthy circuit, these should be equal - all current that goes out comes back. If they're not equal, current must be leaking somewhere - possibly through a person to earth.
            </p>
            <p>
              The RCD contains a current transformer (toroidal core) through which both line and neutral pass. If currents are equal, the magnetic fields cancel out and no current flows in the sensing coil. If there's an imbalance (residual current), a voltage is induced that triggers the trip mechanism.
            </p>

            <div className="my-6 p-4 rounded bg-white/5 border-l-2 border-elec-yellow">
              <p className="text-sm font-medium text-elec-yellow mb-2">The Principle</p>
              <ul className="text-sm text-white/90 space-y-1">
                <li><strong>Normal:</strong> 10A flows out on line, 10A returns on neutral = 0 residual = no trip</li>
                <li><strong>Fault:</strong> 10A flows out on line, 9.97A returns on neutral = 30mA to earth = TRIP</li>
                <li>The 30mA leaking to earth could be through a faulty appliance - or through a person</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-400 mb-2">What RCDs Don't Protect Against:</p>
              <ul className="text-sm text-white/90 space-y-1">
                <li>Line-to-neutral faults (overcurrent, but no earth leakage)</li>
                <li>Touching both line and neutral simultaneously</li>
                <li>Overloading (too much current - but balanced)</li>
                <li>Short circuits between line and neutral</li>
              </ul>
              <p className="text-sm text-white/90 mt-2">
                This is why RCDs must work alongside MCBs/fuses for complete protection.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> RCDs detect earth leakage, not overcurrent. They provide additional protection against shock, not replacement for other protective measures.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ----------------------------------------
            CONTENT SECTION 02
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            RCD Types and Ratings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              RCDs come in different types designed to detect different waveforms of residual current. As electrical loads become more complex (electronic drives, EV chargers), the type of RCD matters more than ever.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Type AC</p>
                <p className="text-sm text-white/90">
                  Detects sinusoidal AC residual currents only. The most basic type. Not suitable for circuits with electronic equipment that might produce pulsating DC fault currents.
                </p>
              </div>
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Type A</p>
                <p className="text-sm text-white/90">
                  Detects sinusoidal AC AND pulsating DC residual currents. Required for circuits with electronic equipment (computers, dimmers, EV chargers using certain topologies). Most common in modern installations.
                </p>
              </div>
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Type B</p>
                <p className="text-sm text-white/90">
                  Detects AC, pulsating DC, AND smooth DC residual currents. Required for three-phase equipment with DC components (certain EV chargers, inverters, variable speed drives).
                </p>
              </div>
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Type S (or Time-Delayed)</p>
                <p className="text-sm text-white/90">
                  Has a built-in delay (typically 40ms minimum at 5x rated). Used upstream to provide discrimination - allows downstream instantaneous RCDs to trip first.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded bg-white/5">
              <p className="text-sm font-medium text-white mb-2">Common Ratings</p>
              <div className="grid grid-cols-3 gap-4 text-sm text-white/90">
                <div>
                  <p className="font-medium text-elec-yellow">30mA</p>
                  <p>Additional shock protection. Required for socket outlets, outdoors, bathrooms, etc.</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">100mA</p>
                  <p>Fire protection. Used for circuits where 30mA isn't required.</p>
                </div>
                <div>
                  <p className="font-medium text-elec-yellow">300mA</p>
                  <p>Fire protection at origin. Often time-delayed for discrimination.</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Trade Tip:</strong> When specifying RCDs for EV charger circuits, check the charger manufacturer's requirements. Many Mode 3 chargers require Type A or Type B RCDs due to the DC components in their charging electronics.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ----------------------------------------
            CONTENT SECTION 03
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Testing RCDs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              RCDs must be tested regularly to ensure they work when needed. There are two types of testing: the user test (pushing the button) and the instrument test (measuring trip current and time).
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Test Button (User Test)</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Should be operated quarterly (every 3 months)</li>
                  <li>Simulates an earth fault by passing current through a resistor</li>
                  <li>Confirms the mechanical trip mechanism works</li>
                  <li>Does NOT verify the actual trip current or timing</li>
                  <li>If it doesn't trip, stop using and replace immediately</li>
                </ul>
              </div>

              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Instrument Test (Formal Test)</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Performed at initial verification and periodic inspection</li>
                  <li>Tests at various percentages of rated current (typically 50%, 100%, 500%)</li>
                  <li>Measures actual trip time in milliseconds</li>
                  <li>Verifies RCD trips within required times at each current level</li>
                  <li>Should test both positive and negative half-cycles</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-elec-yellow mb-3">Trip Time Requirements (30mA RCD)</p>
              <div className="grid grid-cols-3 gap-4 text-sm text-white">
                <div>
                  <p className="font-medium">At 50% (15mA)</p>
                  <p>Should NOT trip</p>
                </div>
                <div>
                  <p className="font-medium">At 100% (30mA)</p>
                  <p>Maximum 300ms</p>
                </div>
                <div>
                  <p className="font-medium">At 500% (150mA)</p>
                  <p>Maximum 40ms</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> Testing creates an actual earth fault. Warn the user that connected equipment will lose power. Ensure nothing critical (computers, life support) is running. Reset the RCD after each test.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ----------------------------------------
            CONTENT SECTION 04
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            RCD Coordination and Nuisance Tripping
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Good circuit design ensures that only the affected circuit trips during a fault (discrimination), and minimises nuisance tripping from normal equipment operation. Poor design causes widespread outages and frustrated users who may then bypass protection.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Achieving Discrimination</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Use RCBOs for individual circuits</li>
                  <li>Time-delayed (Type S) RCD at origin</li>
                  <li>Different ratings (30mA downstream, 100mA upstream)</li>
                  <li>Split-load boards with multiple RCDs</li>
                </ul>
              </div>
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Causes of Nuisance Tripping</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Too many circuits on one RCD (cumulative leakage)</li>
                  <li>Long cable runs (capacitive leakage)</li>
                  <li>Equipment with RFI filters (intentional leakage)</li>
                  <li>Moisture ingress in outdoor equipment</li>
                  <li>Ageing appliances with degraded insulation</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded bg-white/5 border-l-2 border-elec-yellow">
              <p className="text-sm font-medium text-elec-yellow mb-2">Solving Nuisance Tripping</p>
              <ul className="text-sm text-white/90 space-y-1">
                <li><strong>Split circuits</strong> - divide load across multiple RCDs</li>
                <li><strong>Use RCBOs</strong> - each circuit has individual protection</li>
                <li><strong>Find faulty equipment</strong> - disconnect items one by one to identify leaky appliances</li>
                <li><strong>Check for moisture</strong> - outdoor accessories, underground cables</li>
                <li><strong>Don't increase rating</strong> - 30mA is required where specified, use correct solutions</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-400 mb-2">Never Do This:</p>
              <p className="text-sm text-white/90">
                Never bypass an RCD or replace a 30mA with a higher rating to "solve" nuisance tripping. This removes vital protection. Find and fix the actual cause. If users are bypassing RCDs, there's a design problem that needs addressing properly.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Trade Example:</strong> A kitchen circuits trips randomly. Investigation shows the dishwasher, washing machine, and fridge are all on one RCD. Each has a small filter capacitor causing 3-5mA leakage. Combined, they're near the trip threshold. Moving to individual RCBOs or splitting across two RCDs solves the problem without reducing protection.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* ----------------------------------------
            BS 7671 REQUIREMENTS
            ---------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">BS 7671 RCD Requirements</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p className="text-sm">
              BS 7671 specifies where 30mA RCD protection is required for additional protection against electric shock. The requirements have expanded in recent editions.
            </p>

            <div className="my-6 p-4 rounded bg-white/5">
              <p className="text-sm font-medium text-elec-yellow mb-2">30mA RCD Required For:</p>
              <ul className="text-sm text-white/90 space-y-1">
                <li>Socket outlets rated up to 32A in domestic premises</li>
                <li>Socket outlets rated up to 32A in all other premises (with limited exceptions)</li>
                <li>Cables installed less than 50mm from the wall surface without mechanical protection</li>
                <li>Cables installed in walls at any depth without mechanical protection or within prescribed zones</li>
                <li>Mobile equipment used outdoors rated up to 32A</li>
                <li>Circuits in locations with increased shock risk (bathrooms, swimming pools)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------
            PRACTICAL GUIDANCE
            ---------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Specifying RCDs</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Consider cumulative earth leakage - total all equipment on the circuit</li>
                <li>Allow margin (typically design for 30% of trip current max)</li>
                <li>Consider Type A minimum for electronic loads</li>
                <li>Check EV charger requirements (often Type A or Type B)</li>
                <li>Plan for discrimination with upstream protection</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Testing Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Warn user - equipment will lose power</li>
                <li>2. Note RCD type, rating, and manufacturer</li>
                <li>3. Test at 50% rated current - should NOT trip</li>
                <li>4. Test at 100% rated current - record trip time</li>
                <li>5. Test at 500% rated current (if tester allows) - record trip time</li>
                <li>6. Test ramp function if available - find actual trip current</li>
                <li>7. Reset RCD and verify all circuits restored</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Warning Signs</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Won't reset</strong> - fault on circuit, or RCD itself faulty</li>
                <li><strong>Trips on test button but not instrument test</strong> - may be faulty</li>
                <li><strong>Trips at less than 50%</strong> - may be over-sensitive (check manufacturer specs)</li>
                <li><strong>Doesn't trip at 100%</strong> - definitely faulty, replace immediately</li>
                <li><strong>Trips too slowly</strong> - may be faulty or wrong type specified</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------
            FAQs
            ---------------------------------------- */}
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

        {/* ----------------------------------------
            QUICK REFERENCE
            ---------------------------------------- */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - RCDs</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Types</p>
                <ul className="space-y-0.5">
                  <li>AC = Sinusoidal AC only</li>
                  <li>A = AC + pulsating DC</li>
                  <li>B = AC + pulsating + smooth DC</li>
                  <li>S = Time-delayed (selective)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">30mA Trip Times</p>
                <ul className="space-y-0.5">
                  <li>At 30mA: Max 300ms</li>
                  <li>At 150mA: Max 40ms</li>
                  <li>At 15mA: Should NOT trip</li>
                  <li>Test button: Quarterly</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------
            QUIZ
            ---------------------------------------- */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* ----------------------------------------
            NAVIGATION
            ---------------------------------------- */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module1-section3-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: GS38 Test Equipment
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module1-section4">
              Next: Section 4
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section3_6;
