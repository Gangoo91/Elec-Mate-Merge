/**
 * Level 3 Module 2 Section 4.1 - EV Charging Modes (1-4)
 * Understanding the four modes of electric vehicle charging defined by IEC 61851
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
const TITLE = "EV Charging Modes 1-4 - Level 3 Module 2 Section 4.1";
const DESCRIPTION = "Understanding the four modes of electric vehicle charging as defined by IEC 61851, from domestic socket charging to DC rapid charging.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What type of charging does Mode 1 refer to?",
    options: [
      "DC rapid charging",
      "Slow AC charging from a standard domestic socket without protection",
      "AC charging with dedicated EVSE",
      "High-power three-phase charging"
    ],
    correctIndex: 1,
    explanation: "Mode 1 is slow AC charging from a standard socket without any dedicated EV safety features. It's not permitted for public use in the UK and is generally discouraged for domestic use due to the lack of in-cable control and protection device (IC-CPD). Maximum current is typically limited to 10A."
  },
  {
    id: "check-2",
    question: "What is the key safety feature that distinguishes Mode 2 from Mode 1 charging?",
    options: [
      "Higher charging speed",
      "An In-Cable Control and Protection Device (IC-CPD)",
      "DC power conversion",
      "Three-phase supply"
    ],
    correctIndex: 1,
    explanation: "Mode 2 includes an IC-CPD (In-Cable Control and Protection Device) - the 'brick' in the charging cable. This provides earth monitoring, overcurrent protection, and control pilot communication with the vehicle. It makes Mode 2 significantly safer than Mode 1 for domestic socket charging."
  },
  {
    id: "check-3",
    question: "What is Mode 3 charging?",
    options: [
      "Charging from a standard socket",
      "DC rapid charging",
      "AC charging via dedicated EVSE (wallbox)",
      "Emergency trickle charging"
    ],
    correctIndex: 2,
    explanation: "Mode 3 is AC charging through a dedicated Electric Vehicle Supply Equipment (EVSE), commonly known as a wallbox or charging point. It provides permanent installation, higher power (typically 7kW single-phase or 22kW three-phase), and integrated safety features including RCD protection and control pilot communication."
  },
  {
    id: "check-4",
    question: "What distinguishes Mode 4 from other charging modes?",
    options: [
      "It uses standard domestic sockets",
      "It provides DC power directly to the vehicle battery",
      "It's limited to 3kW maximum",
      "It doesn't require communication with the vehicle"
    ],
    correctIndex: 1,
    explanation: "Mode 4 is DC rapid charging where the charger converts AC to DC and supplies DC power directly to the vehicle's battery, bypassing the vehicle's onboard charger. This enables much higher charging speeds (50-350kW+) but requires expensive off-board charging equipment and is typically used at public charging stations."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "Which EV charging mode is NOT permitted for public use in the UK?",
    options: [
      "Mode 1",
      "Mode 2",
      "Mode 3",
      "Mode 4"
    ],
    correctAnswer: 0,
    explanation: "Mode 1 (direct connection to standard socket without protection device) is not permitted for public charging in the UK due to safety concerns. The lack of earth monitoring and control pilot communication makes it unsuitable for uncontrolled public environments."
  },
  {
    id: 2,
    question: "What is the maximum current typically available from Mode 2 charging in the UK?",
    options: [
      "6A",
      "10A (2.3kW at 230V)",
      "32A (7.4kW at 230V)",
      "100A"
    ],
    correctAnswer: 1,
    explanation: "Mode 2 charging via UK domestic socket is typically limited to 10A (approximately 2.3kW at 230V) or sometimes 13A with appropriate IC-CPD settings. This provides 'granny charging' suitable for overnight top-ups but not rapid charging. The socket and circuit protection must support the selected current."
  },
  {
    id: 3,
    question: "What does 'EVSE' stand for?",
    options: [
      "Electric Vehicle Safety Equipment",
      "Electric Vehicle Supply Equipment",
      "Energy Vehicle System Electronics",
      "Electronic Vehicle Supply Enclosure"
    ],
    correctAnswer: 1,
    explanation: "EVSE stands for Electric Vehicle Supply Equipment. It refers to the charging infrastructure that supplies electricity to EVs, including wallboxes, public charging posts, and rapid chargers. The EVSE manages the charging session, communicates with the vehicle, and provides safety functions."
  },
  {
    id: 4,
    question: "What is the control pilot signal used for in Mode 2 and Mode 3 charging?",
    options: [
      "To measure the vehicle's speed",
      "For communication between the EVSE and vehicle to manage charging safely",
      "To display charging status on the dashboard only",
      "To lock the vehicle doors"
    ],
    correctAnswer: 1,
    explanation: "The control pilot (CP) is a PWM signal that enables communication between the EVSE and vehicle. It indicates available current, confirms the vehicle is connected and ready, verifies earth continuity, and allows the vehicle to request charging to start. This communication is essential for safe, controlled charging."
  },
  {
    id: 5,
    question: "Which charging mode provides the fastest charging speeds?",
    options: [
      "Mode 1",
      "Mode 2",
      "Mode 3",
      "Mode 4"
    ],
    correctAnswer: 3,
    explanation: "Mode 4 (DC rapid charging) provides the fastest charging speeds, typically 50kW to 350kW+. The external charger handles AC to DC conversion and can supply much higher power than vehicle onboard chargers. Mode 4 can add 100+ miles of range in 20-30 minutes depending on the charger and vehicle capability."
  },
  {
    id: 6,
    question: "What typical power output does a single-phase Mode 3 home charger provide?",
    options: [
      "2.3kW",
      "7kW (7.4kW at 32A)",
      "22kW",
      "50kW"
    ],
    correctAnswer: 1,
    explanation: "Single-phase Mode 3 home chargers typically provide 7kW (actually 7.36kW at 32A, 230V). This is the most common domestic installation, providing a full overnight charge for most EVs. Three-phase installations can provide up to 22kW but require three-phase supply and are less common in UK homes."
  },
  {
    id: 7,
    question: "What is 'granny charging'?",
    options: [
      "Charging specifically for elderly drivers",
      "Slow charging via Mode 1 or Mode 2 using a standard domestic socket",
      "Charging while driving slowly",
      "A premium fast-charging service"
    ],
    correctAnswer: 1,
    explanation: "'Granny charging' is the colloquial term for slow charging via a standard domestic socket (Mode 1 or Mode 2). The name reflects the slow pace - typically adding only 6-10 miles of range per hour. It's useful for emergency or occasional use but not ideal for daily charging due to speed and socket wear concerns."
  },
  {
    id: 8,
    question: "Why is Mode 1 charging considered less safe than Mode 2?",
    options: [
      "Mode 1 uses higher voltage",
      "Mode 1 lacks earth monitoring and in-cable protection",
      "Mode 1 generates more heat",
      "Mode 1 is faster and harder to control"
    ],
    correctAnswer: 1,
    explanation: "Mode 1 lacks the IC-CPD that Mode 2 provides. Without this device, there's no earth monitoring, no thermal protection in the cable, no overcurrent protection beyond the socket's MCB, and no control pilot communication. This means faults may not be detected before becoming dangerous."
  },
  {
    id: 9,
    question: "What is the approximate range of charging power for Mode 4 DC rapid chargers?",
    options: [
      "3-7kW",
      "7-22kW",
      "50-350kW or more",
      "Under 3kW only"
    ],
    correctAnswer: 2,
    explanation: "Mode 4 DC rapid chargers range from around 50kW (standard rapid) to 150kW+ (ultra-rapid) and up to 350kW or more for the latest high-power charging networks. Power delivery depends on both the charger capability and the vehicle's acceptance rate, which varies by model and battery state."
  },
  {
    id: 10,
    question: "Which standard defines the four EV charging modes?",
    options: [
      "BS 7671",
      "IEC 61851",
      "G98/G99",
      "Part P"
    ],
    correctAnswer: 1,
    explanation: "IEC 61851 is the international standard that defines the four EV charging modes and related requirements for EV conductive charging systems. BS 7671 covers general electrical installation (including EVSE), while G98/G99 addresses grid connection. Part P covers building regulations for electrical work."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Can I charge my EV from a normal 13A socket?",
    answer: "Yes, but only with a Mode 2 cable with IC-CPD, and it's not recommended for regular use. Standard sockets aren't designed for prolonged high current draw and may overheat. It's suitable for occasional or emergency use, providing about 6-10 miles of range per hour. For regular charging, a dedicated Mode 3 charger is much better."
  },
  {
    question: "What's the difference between a 7kW and 22kW charger for home use?",
    answer: "A 7kW charger uses single-phase supply (standard in UK homes) and typically provides a full charge overnight. A 22kW charger requires three-phase supply, which most UK homes don't have. For domestic use, 7kW is usually sufficient and more cost-effective to install. The 22kW option is more relevant for workplaces or homes with three-phase supply."
  },
  {
    question: "Why can't I use Mode 4 (DC) charging at home?",
    answer: "Mode 4 chargers require industrial-scale power supplies, typically 100A+ three-phase connections, sophisticated power electronics, and cooling systems. The equipment costs tens of thousands of pounds and the electrical supply upgrade would be prohibitively expensive. They're designed for commercial/public locations where multiple vehicles justify the investment."
  },
  {
    question: "What does the 'brick' in my EV charging cable do?",
    answer: "The 'brick' is the IC-CPD (In-Cable Control and Protection Device) required for Mode 2 charging. It monitors earth connection, provides overcurrent and thermal protection, communicates with the vehicle via control pilot, and includes an RCD function. It's the key safety device that makes Mode 2 safer than Mode 1."
  },
  {
    question: "How do I know what charging mode my charger uses?",
    answer: "Home wallboxes are Mode 3 (dedicated EVSE with permanent wiring). The cable that comes with your EV for plugging into sockets is Mode 2 (has the IC-CPD box). Public AC chargers are Mode 3. Public rapid chargers with attached cables are Mode 4 (DC). Mode 1 equipment is rarely seen as it's not recommended or permitted for public use."
  },
  {
    question: "Does faster charging damage the battery?",
    answer: "Frequent high-power DC charging (Mode 4) can accelerate battery degradation compared to slower AC charging, but modern EVs manage this well through thermal management. For daily use, Mode 3 home charging at 7kW is gentler on the battery. Use DC rapid charging when needed for longer journeys, but regular moderate charging is best for battery longevity."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section4_1 = () => {
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
            <Link to="/study-centre/apprentice/level3-module2-section4">
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
            <span>Module 2.4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            EV Charging Modes (1-4)
          </h1>
          <p className="text-white/80">
            Understanding the four standardised modes of electric vehicle charging
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Mode 1:</strong> Standard socket, no protection - NOT permitted publicly in UK</li>
              <li><strong>Mode 2:</strong> Standard socket WITH IC-CPD protection device</li>
              <li><strong>Mode 3:</strong> Dedicated EVSE (wallbox) - most common home installation</li>
              <li><strong>Mode 4:</strong> DC rapid charging - public/commercial only</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> IC-CPD 'brick' on Mode 2 cables, wallbox for Mode 3</li>
              <li><strong>Use:</strong> Mode 3 for daily home charging at 7kW</li>
              <li><strong>Apply:</strong> IEC 61851 defines all charging mode requirements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "The four charging modes defined by IEC 61851",
              "Safety features of each charging mode",
              "Typical power levels and charging speeds",
              "When each mode is appropriate to use",
              "The role of the control pilot signal",
              "UK regulations affecting charging mode selection"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Content Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Mode 1 - Basic Socket Connection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Mode 1 is the most basic form of EV charging: connecting the vehicle directly to a standard domestic socket without any dedicated EV protection or control. While technically possible, Mode 1 is NOT permitted for public charging in the UK and is strongly discouraged for home use.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Mode 1 characteristics:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Direct connection to standard 230V domestic socket</li>
                <li>No In-Cable Control and Protection Device (IC-CPD)</li>
                <li>No control pilot communication with vehicle</li>
                <li>Typically limited to 10A (2.3kW) or less</li>
                <li>Relies solely on socket's MCB for overcurrent protection</li>
              </ul>
            </div>

            <p>
              The safety concerns with Mode 1 are significant: no earth continuity monitoring, no protection against socket overheating, and no way for the vehicle to verify safe connection before drawing current. A fault in the earth path would not be detected until it's potentially too late.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Mode 1 equipment is rarely seen in the UK market. Always verify charging cables include an IC-CPD for Mode 2 operation when socket charging is required.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Content Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Mode 2 - Socket Charging with IC-CPD
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Mode 2 adds critical safety features to socket-based charging through the IC-CPD - the 'brick' or control box integrated into the charging cable. This device makes socket charging significantly safer, though still slower than dedicated EVSE.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">IC-CPD Functions</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Earth continuity monitoring</li>
                  <li>Residual current device (RCD) protection</li>
                  <li>Overcurrent protection</li>
                  <li>Thermal monitoring and protection</li>
                  <li>Control pilot communication with vehicle</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mode 2 Limitations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Limited to socket's current rating (typically 10-13A)</li>
                  <li>Slow charging: 6-10 miles range per hour</li>
                  <li>Socket wear from extended high-current use</li>
                  <li>Portable device may be damaged or lost</li>
                  <li>Not suitable as primary daily charging</li>
                </ul>
              </div>
            </div>

            <p>
              Mode 2 is the charging cable typically supplied with EVs. It's suitable for occasional use, emergency charging, or when visiting locations without dedicated charging. For regular daily charging, Mode 3 is preferred.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Content Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Mode 3 - Dedicated EVSE (Wallbox)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Mode 3 is the standard for home and workplace EV charging. A permanently installed wallbox provides dedicated supply, higher power, integrated safety features, and often smart functionality. This is what electricians will most commonly install.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Mode 3 characteristics:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Single-phase:</strong> Typically 7kW (32A at 230V) - standard UK home installation</li>
                <li><strong>Three-phase:</strong> Up to 22kW (32A at 400V) - requires three-phase supply</li>
                <li><strong>Integrated safety:</strong> RCD, overcurrent protection, earth monitoring built into EVSE</li>
                <li><strong>Control pilot:</strong> Continuous communication with vehicle during charging</li>
                <li><strong>Smart features:</strong> Often includes scheduling, load management, energy monitoring</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A typical home installation is a 7kW Mode 3 wallbox on a dedicated 32A circuit. This provides a full charge overnight for most EVs - around 25-30 miles of range per hour of charging.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Content Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Mode 4 - DC Rapid Charging
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Mode 4 provides DC power directly to the vehicle's battery, bypassing the vehicle's onboard charger. This enables much higher charging power - from 50kW to over 350kW - dramatically reducing charging time. Mode 4 is found at public rapid charging stations.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Rapid (50kW)</p>
                <p className="text-white/90 text-xs">~100 miles in 30-40 minutes</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Ultra-rapid (150kW)</p>
                <p className="text-white/90 text-xs">~100 miles in 10-15 minutes</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">High-power (350kW)</p>
                <p className="text-white/90 text-xs">~100 miles in under 10 minutes</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Mode 4 considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Charging speed limited by vehicle's acceptance rate, not just charger power</li>
                <li>Speed reduces as battery fills (particularly above 80% SoC)</li>
                <li>Cold batteries charge more slowly until warmed</li>
                <li>Frequent DC charging may accelerate battery degradation slightly</li>
                <li>Higher cost per kWh than home charging</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Mode 4 chargers are complex, expensive installations requiring industrial power supplies. Electricians working on DC chargers need specialist training beyond standard EV charging certification.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Advising Customers</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Mode 3 (7kW wallbox) is the recommended home charging solution</li>
                <li>Mode 2 is for occasional/emergency use only, not daily charging</li>
                <li>Explain charging times based on vehicle battery size and charger power</li>
                <li>Discuss smart charging features for tariff optimisation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing Mode 3 Equipment</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Dedicated circuit with appropriate protection (typically 40A MCB, 30mA RCD)</li>
                <li>Consider supply capacity - may need DNO application for upgrades</li>
                <li>Follow manufacturer installation requirements precisely</li>
                <li>Ensure proper earthing arrangements per BS 7671</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Installing Mode 1 connections</strong> - not permitted and unsafe</li>
                <li><strong>Undersizing supply</strong> - consider whole installation capacity, not just charger</li>
                <li><strong>Ignoring PME earthing restrictions</strong> - may require earth electrode</li>
                <li><strong>Forgetting DNO notification</strong> - required for EV charger installations</li>
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
                <p className="font-medium text-white mb-1">Charging Modes Summary</p>
                <ul className="space-y-0.5">
                  <li>Mode 1: Standard socket, no protection (not permitted)</li>
                  <li>Mode 2: Standard socket + IC-CPD (emergency use)</li>
                  <li>Mode 3: Dedicated EVSE/wallbox (recommended)</li>
                  <li>Mode 4: DC rapid charging (public/commercial)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Typical Power Levels</p>
                <ul className="space-y-0.5">
                  <li>Mode 2: 2.3kW (10A socket)</li>
                  <li>Mode 3 single-phase: 7kW (32A)</li>
                  <li>Mode 3 three-phase: 22kW</li>
                  <li>Mode 4: 50-350kW+</li>
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
            <Link to="/study-centre/apprentice/level3-module2-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section4-2">
              Next: Charger Types and Connectors
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section4_1;
