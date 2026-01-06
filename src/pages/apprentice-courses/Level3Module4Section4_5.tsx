/**
 * Level 3 Module 4 Section 4.5 - Functional and Operational Testing
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Functional and Operational Testing - Level 3 Module 4 Section 4.5";
const DESCRIPTION = "Learn comprehensive functional testing methods for RCDs, switches, controls, and assemblies per BS 7671:2018, including test procedures and acceptance criteria.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the maximum permitted disconnection time for a 30mA RCD when tested at its rated residual operating current?",
    options: [
      "40ms",
      "150ms",
      "200ms",
      "300ms"
    ],
    correctIndex: 3,
    explanation: "BS 7671 requires RCDs to disconnect within 300ms when tested at their rated residual operating current (IOn). For a 30mA RCD, this means testing at 30mA must result in disconnection within 300ms. Testing at 5 x IOn (150mA) must give disconnection within 40ms."
  },
  {
    id: "check-2",
    question: "Why must RCDs be tested using a dedicated RCD tester rather than just pressing the test button?",
    options: [
      "The test button does not work on most RCDs",
      "The test button only verifies the mechanical operation, not the trip time or sensitivity",
      "RCD testers are required by law",
      "The test button can damage the RCD"
    ],
    correctIndex: 1,
    explanation: "The integral test button confirms the RCD mechanism operates but does not verify the actual trip time or sensitivity to real fault currents. An RCD tester injects precise test currents and measures exact disconnection time, providing quantitative evidence that the RCD meets BS 7671 requirements."
  },
  {
    id: "check-3",
    question: "When testing a Type AC RCD at 50% of rated residual current (15mA for a 30mA device), what should happen?",
    options: [
      "The RCD must trip within 300ms",
      "The RCD must trip within 40ms",
      "The RCD should NOT trip",
      "The RCD must trip within 150ms"
    ],
    correctIndex: 2,
    explanation: "RCDs are designed NOT to operate at 50% of rated residual current. This prevents nuisance tripping from normal minor earth leakage. At 50% (15mA for a 30mA RCD), the device should remain closed. This confirms the RCD has correct sensitivity and is not oversensitive."
  },
  {
    id: "check-4",
    question: "What functional testing is required for interlocking systems and safety devices?",
    options: [
      "Only visual inspection is required",
      "Testing is not required if the system has a CE mark",
      "Verify the interlock operates correctly and prevents dangerous conditions",
      "Functional testing is only required for industrial installations"
    ],
    correctIndex: 2,
    explanation: "BS 7671 Regulation 643.7.1 requires functional testing of assemblies, including interlocks and safety devices. This means physically testing that interlocks prevent access to live parts when engaged, and that safety devices operate as intended. Visual inspection alone is not sufficient."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A 30mA Type A RCD trips at 25mA during testing. Is this acceptable?",
    options: [
      "No - it is too sensitive and may cause nuisance tripping",
      "Yes - it trips between 50% and 100% of rated current as required",
      "No - it should only trip at exactly 30mA",
      "Yes - all RCDs should trip at the lowest possible current"
    ],
    correctAnswer: 1,
    explanation: "RCDs must trip at some value between 50% (15mA) and 100% (30mA) of rated residual operating current. Tripping at 25mA is within this range and acceptable. It means the RCD is correctly sensitive - not too sensitive (would trip below 15mA) and not insensitive (would not trip at 30mA)."
  },
  {
    id: 2,
    question: "When testing an RCD protecting socket circuits, what test current sequence is typically used?",
    options: [
      "Only test at rated current",
      "50% (no trip), 100% (trip within 300ms), 5x rated (trip within 40ms)",
      "Random currents until trip occurs",
      "Only the 5x rated current test"
    ],
    correctAnswer: 1,
    explanation: "The standard test sequence is: 50% of IOn (should not trip), 100% of IOn (must trip within 300ms), and 5x IOn (must trip within 40ms). For additional protection RCDs, a further test at IOn verifies trip within 40ms. This confirms both sensitivity limits and speed of operation."
  },
  {
    id: 3,
    question: "What does the 5x rated current test (e.g., 150mA for a 30mA RCD) verify?",
    options: [
      "That the RCD will not trip during normal operation",
      "That the RCD provides fast disconnection for personal protection in direct contact scenarios",
      "The mechanical durability of the RCD",
      "The RCD breaking capacity"
    ],
    correctAnswer: 1,
    explanation: "The 5x IOn test (150mA for 30mA RCD) must achieve disconnection within 40ms. This fast trip time is essential for additional protection against direct contact with live parts - limiting the shock duration to a level that prevents ventricular fibrillation in most cases."
  },
  {
    id: 4,
    question: "An RCD protecting a circuit used for medical equipment fails the 5x test, tripping in 65ms instead of 40ms. What action is required?",
    options: [
      "Accept the result - 65ms is close enough",
      "Record as a fail - the RCD must be replaced as it does not meet BS 7671 requirements",
      "Adjust the RCD sensitivity",
      "Repeat the test with a different instrument"
    ],
    correctAnswer: 1,
    explanation: "65ms exceeds the maximum 40ms required for the 5x IOn test. The RCD fails to meet BS 7671 requirements for additional protection and must be replaced. This is not a borderline case - the device is operating outside its specification and cannot provide the required level of protection."
  },
  {
    id: 5,
    question: "During functional testing of a two-way lighting circuit, what should be verified?",
    options: [
      "Only that the light illuminates",
      "That the light can be controlled from both switch positions and operates correctly",
      "That the cable colours are correct",
      "That the circuit has RCD protection"
    ],
    correctAnswer: 1,
    explanation: "Functional testing of a two-way lighting circuit verifies that the light can be switched on and off from both switch locations, and that both switches function correctly in all positions. This confirms correct wiring and switch operation - not just that the light works from one switch."
  },
  {
    id: 6,
    question: "What functional test is required for an isolator marked 'Fireman's Switch'?",
    options: [
      "Confirm it is painted red",
      "Verify it isolates the circuit and is accessible, correctly labelled, and operates in the ON-OFF direction specified",
      "Test insulation resistance only",
      "No functional test required if it has the correct label"
    ],
    correctAnswer: 1,
    explanation: "Fireman's switches (for discharge lighting, PV systems, etc.) must be functionally tested to verify: correct operation, correct ON-OFF positions per regulations, proper labelling, accessibility, and that they effectively isolate the intended circuit. This is a safety-critical control requiring thorough verification."
  },
  {
    id: 7,
    question: "When testing an RCBO (combined RCD/MCB), what tests are required?",
    options: [
      "Only RCD tests",
      "Only overcurrent tests",
      "Both RCD function tests and verification of overcurrent protection coordination",
      "Only the test button operation"
    ],
    correctAnswer: 2,
    explanation: "An RCBO combines RCD and overcurrent protection, so both functions require verification. RCD tests verify residual current sensitivity and trip times. The MCB function is verified through earth fault loop impedance testing to confirm adequate fault current for disconnection time."
  },
  {
    id: 8,
    question: "What is the purpose of testing the RCD using both positive and negative half-cycle test currents?",
    options: [
      "To average the results for accuracy",
      "To verify the RCD operates correctly on both half-cycles of AC fault current",
      "To prevent damage to the RCD",
      "This test is only required for Type B RCDs"
    ],
    correctAnswer: 1,
    explanation: "AC fault current alternates between positive and negative half-cycles. Testing on both half-cycles verifies the RCD triggers correctly regardless of which half-cycle the fault occurs on. Some testers offer 0 degree and 180 degree phase angle tests for this purpose. This is particularly important for Type AC RCDs."
  },
  {
    id: 9,
    question: "During commissioning, a dimmer switch does not dim smoothly - it flickers at certain positions. What does functional testing reveal?",
    options: [
      "This is normal for dimmer switches",
      "A possible fault with the dimmer, incompatible lamp, or wiring issue requiring investigation",
      "The dimmer needs calibration by the manufacturer",
      "The circuit is overloaded"
    ],
    correctAnswer: 1,
    explanation: "Smooth dimming throughout the range indicates correct operation. Flickering suggests: an incompatible lamp type (e.g., non-dimmable LED), minimum load not met, dimmer fault, or wiring issue. Functional testing identifies such problems for correction before handover."
  },
  {
    id: 10,
    question: "What functional testing applies to a consumer unit with integral test button on each RCBO?",
    options: [
      "The integral test button test replaces all other RCD testing",
      "Press each test button to verify mechanical operation, then perform instrument tests for trip times",
      "Only the main switch test button needs testing",
      "Integral test buttons only need testing during periodic inspection"
    ],
    correctAnswer: 1,
    explanation: "Integral test buttons verify mechanical operation - that the mechanism trips when activated. Instrument tests remain necessary to verify actual trip times and current sensitivity meet BS 7671 requirements. Both tests are required for thorough functional verification."
  },
  {
    id: 11,
    question: "A time delay RCD (Type S or selective) protecting a sub-distribution board is tested. What additional trip time applies?",
    options: [
      "Must still trip within 40ms at 5x IOn",
      "Must trip within 150ms at IOn, and 50ms at 5x IOn for Type S",
      "No time limit applies to delayed RCDs",
      "Must trip within 1 second at all test currents"
    ],
    correctAnswer: 1,
    explanation: "Type S (selective/time-delayed) RCDs have longer permitted trip times to allow discrimination with downstream standard RCDs. At IOn they must trip within 130-500ms, and at 5x IOn within 40-150ms. This delay allows downstream 30mA RCDs to trip first, preventing entire installation shutdown."
  },
  {
    id: 12,
    question: "When testing an EV charging installation, what specific functional tests are required for the charging equipment?",
    options: [
      "Only RCD testing of the supply circuit",
      "Verification of the EV charger's integral RCD (if Type B), control pilot operation, and connection verification systems",
      "Only testing the charge cable continuity",
      "Functional tests are the responsibility of the EV manufacturer only"
    ],
    correctAnswer: 1,
    explanation: "EV charging installations require functional testing of: the circuit RCD (often Type B or Type A with 6mA DC detection), the charger's control pilot functionality, earth continuity monitoring, and any charge connector locking mechanisms. BS 7671 Section 722 contains specific requirements."
  }
];

const faqs = [
  {
    question: "Why is functional testing performed after all other tests?",
    answer: "Functional testing is performed last because the installation must be safe and correctly wired before energising. Dead tests (continuity, insulation resistance, polarity) confirm the installation is safe to energise. Only then can live functional tests verify that devices and systems operate correctly. This sequence protects both the tester and the installation."
  },
  {
    question: "Can I use the RCD test button instead of an RCD tester for certification?",
    answer: "No. The test button confirms mechanical operation only - it does not measure trip time or actual operating current. For certification (EIC or EICR), you must use a calibrated RCD tester that measures disconnection time at specified test currents. The test button test is additional to, not a replacement for, instrument testing."
  },
  {
    question: "What if an RCD trips faster than required?",
    answer: "Tripping faster than required is generally acceptable - it indicates the RCD is providing enhanced protection. However, if an RCD trips at very low currents (below 50% of rated) or extremely quickly at rated current, this may indicate oversensitivity that could cause nuisance tripping. Balance between protection and practicality is needed."
  },
  {
    question: "Do I need to test every RCD at every test point?",
    answer: "Each RCD should be tested at its load side terminals or at a representative outlet it protects. Testing at multiple points protected by the same RCD will give identical results for the RCD performance itself. For initial verification, one full test sequence per RCD is sufficient. For fault-finding, testing at specific points may help isolate problems."
  },
  {
    question: "What functional tests apply to emergency lighting?",
    answer: "Emergency lighting requires functional testing per BS 5266 including: simulated mains failure to verify changeover to battery, duration test (full rated duration), lamp operation checks, and verification of all luminaires illuminate. These are specialist tests beyond standard BS 7671 requirements but essential for life safety systems."
  },
  {
    question: "How do I functionally test an installation with multiple RCDs in series (discrimination)?",
    answer: "When RCDs are in series (e.g., main RCD with downstream RCBOs), test each RCD individually with upstream RCDs locked open or confirmed as time-delayed. For discrimination verification, apply fault current downstream and confirm only the nearest RCD trips. BS 7671 discrimination requirements may need manufacturer data for verification."
  }
];

const Level3Module4Section4_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module4-section4">
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
            <span>Module 4.4.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Functional and Operational Testing
          </h1>
          <p className="text-white/80">
            Verifying correct operation of RCDs, controls, and system functions
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>RCD at IOn:</strong> Must trip within 300ms</li>
              <li><strong>RCD at 5x IOn:</strong> Must trip within 40ms</li>
              <li><strong>RCD at 50% IOn:</strong> Must NOT trip</li>
              <li><strong>Assemblies:</strong> Verify interlocks and controls operate correctly</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Slow RCD = needs replacement</li>
              <li><strong>Spot:</strong> Trips at 50% = oversensitive</li>
              <li><strong>Use:</strong> Test button for mechanical check only</li>
              <li><strong>Use:</strong> RCD tester for times and values</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Perform comprehensive RCD testing per BS 7671 requirements",
              "Understand RCD trip time requirements at different test currents",
              "Test switches, controls, and interlocking systems correctly",
              "Verify correct operation of protective and safety devices",
              "Interpret functional test results and identify faults",
              "Document functional testing for certification"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: RCD Testing Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            RCD Testing Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              RCD (Residual Current Device) testing is a critical component of functional testing. RCDs provide both fault protection and, for 30mA devices, additional protection against direct contact. BS 7671 specifies precise test currents and maximum disconnection times that must be verified using a dedicated RCD tester.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">BS 7671 RCD test requirements for general Type AC and Type A devices:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>50% of IOn (e.g., 15mA for 30mA RCD):</strong> Device must NOT trip - confirms not oversensitive</li>
                <li><strong>100% of IOn (e.g., 30mA):</strong> Must trip within 300ms - confirms correct operating current</li>
                <li><strong>5x IOn (e.g., 150mA for 30mA RCD):</strong> Must trip within 40ms - confirms fast operation for additional protection</li>
              </ul>
            </div>

            <p>
              For RCDs providing additional protection (typically 30mA devices protecting socket circuits), BS 7671 Regulation 415.1.1 requires disconnection within 40ms at 5x rated residual current. This fast disconnection limits shock duration to levels generally considered safe for healthy adults.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The integral test button verifies mechanical operation only. It does not confirm trip time or actual operating current. Instrument testing is mandatory for certification and provides quantitative results.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: RCD Test Procedure */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            RCD Test Procedure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              RCD testing requires a calibrated RCD tester that can apply precise test currents and measure disconnection time accurately. The tester should comply with BS EN 61557-6. Tests are performed with the installation energised and RCD in normal service condition.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Test Sequence</p>
                <ul className="text-sm text-white space-y-1">
                  <li>1. Connect tester to protected circuit outlet</li>
                  <li>2. Select 50% test - confirm NO trip</li>
                  <li>3. Reset RCD if tripped (fault indication)</li>
                  <li>4. Select 100% test - record trip time</li>
                  <li>5. Reset RCD after trip</li>
                  <li>6. Select 5x test - record trip time</li>
                  <li>7. Reset RCD and verify operation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Additional Considerations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Test on positive and negative half-cycles</li>
                  <li>Record the worst (longest) trip time</li>
                  <li>Check integral test button operates</li>
                  <li>For RCBOs, verify MCB function via Zs test</li>
                  <li>Note RCD type (AC, A, F, or B)</li>
                  <li>Verify RCD rating matches circuit requirements</li>
                </ul>
              </div>
            </div>

            <p>
              When testing RCDs at 5x rated current, ensure the test is brief to avoid nuisance damage to the RCD. Most testers limit test duration automatically. If an RCD fails any test, it must be replaced - there is no adjustment or repair possible.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Testing a 30mA Type A RCD protecting kitchen sockets. At 15mA (50%) - no trip (pass). At 30mA (100%) - trips in 28ms (pass, under 300ms). At 150mA (5x) - trips in 12ms (pass, well under 40ms). All results recorded and RCD confirmed compliant.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Testing Assemblies and Controls */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Testing Assemblies and Controls
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Functional testing extends beyond RCDs to include all controls, interlocks, and assemblies. BS 7671 Regulation 643.7 requires verification that assemblies are correctly selected and erected, and that all protective devices, monitoring devices, and interlocks operate correctly.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Items requiring functional testing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Switching devices:</strong> All switches operate correctly in both positions</li>
                <li><strong>Interlocks:</strong> Mechanical and electrical interlocks prevent dangerous access</li>
                <li><strong>Emergency stops:</strong> E-stop buttons function and latch correctly</li>
                <li><strong>Control circuits:</strong> Control systems operate as designed</li>
                <li><strong>Safety devices:</strong> Door interlocks, limit switches, safety guards</li>
                <li><strong>Indicating devices:</strong> Pilot lamps, ammeters, voltmeters function correctly</li>
              </ul>
            </div>

            <p>
              For each item, verify it operates correctly under normal conditions and achieves its intended safety function. Document the tests performed and results obtained. If any device does not operate correctly, investigate and rectify before proceeding.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Functional testing of interlocks is particularly important. An interlock that does not function correctly could allow access to live parts while the installation is energised - a potentially fatal situation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 04: Special Equipment Functional Tests */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Special Equipment and Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Certain installations have specific functional testing requirements beyond standard BS 7671 provisions. These include fire alarm systems, emergency lighting, EV charging, and specialist equipment. While detailed requirements may be in other standards, basic functional verification is part of electrical installation commissioning.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">EV Charging</p>
                <p className="text-white/90 text-xs">Test RCD (Type B or A with DC detection), control pilot, earth monitoring, connection locking</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Solar PV</p>
                <p className="text-white/90 text-xs">Verify isolator operation, DC polarity, inverter function, G98/G99 compliance settings</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Lighting Controls</p>
                <p className="text-white/90 text-xs">Test dimmers, PIR sensors, photocells, time switches, and DALI/DMX systems</p>
              </div>
            </div>

            <p>
              For complex systems, refer to relevant standards (BS 5839 for fire alarms, BS 5266 for emergency lighting, BS 7671 Section 722 for EVs). The electrician may perform basic functional verification, with specialist commissioning by the equipment supplier for detailed system testing.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Commissioning an EV charge point. Functional tests include: RCD trip time at all test currents, control pilot signal verification, earth continuity monitoring light/indicator, cable lock operation, and charge session start/stop. Record all results on commissioning documentation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Testing Best Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Warn building occupants before testing - circuits will momentarily disconnect</li>
                <li>Ensure any sensitive equipment is saved/protected before RCD trips</li>
                <li>Test on both positive and negative half-cycles for complete verification</li>
                <li>Record the longest (worst case) trip time measured</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Documenting Results</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Record RCD type, rating, and location for each tested device</li>
                <li>Document trip times at each test current (50%, 100%, 5x)</li>
                <li>Note whether the 50% test caused a trip (this is a fail condition)</li>
                <li>Confirm integral test button operates on each RCD</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Relying on test button only</strong> - Instrument testing is mandatory for certification</li>
                <li><strong>Not testing at 5x current</strong> - This critical test verifies additional protection</li>
                <li><strong>Ignoring marginal results</strong> - A trip at 290ms passes but indicates ageing RCD</li>
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
                <p className="font-medium text-white mb-1">30mA RCD Test Values</p>
                <ul className="space-y-0.5">
                  <li>15mA (50%): Must NOT trip</li>
                  <li>30mA (100%): Trip within 300ms</li>
                  <li>150mA (5x): Trip within 40ms</li>
                  <li>Test button: Mechanical check only</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Regulations</p>
                <ul className="space-y-0.5">
                  <li>643.7.1 - Functional testing assemblies</li>
                  <li>415.1.1 - Additional protection requirements</li>
                  <li>531.2 - RCD selection and types</li>
                  <li>Table 3.1 - RCD operating times</li>
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
            <Link to="../level3-module4-section4-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Earth Fault Loop Impedance Testing
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module4-section5">
              Next: Section 5 - Safe Isolation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module4Section4_5;
