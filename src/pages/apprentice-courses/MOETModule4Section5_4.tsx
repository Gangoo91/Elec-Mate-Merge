import { ArrowLeft, ToggleRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Functional Testing - MOET Module 4.5.4";
const DESCRIPTION = "Comprehensive guide to functional testing in electrical maintenance: RCD testing, switchgear operation, interlocks, control systems, emergency systems, and performance verification in accordance with BS 7671.";

const quickCheckQuestions = [
  {
    id: "func-purpose",
    question: "What is the purpose of functional testing in electrical maintenance?",
    options: [
      "To measure the resistance of circuit conductors",
      "To verify that all equipment, protective devices, and control systems operate correctly as intended under normal and fault conditions",
      "To test the insulation between conductors",
      "To calculate the prospective fault current"
    ],
    correctIndex: 1,
    explanation: "Functional testing verifies that equipment and systems perform their intended function correctly. This goes beyond electrical parameter testing (resistance, impedance) to confirm that devices actually operate: RCDs trip at the correct current, interlocks prevent dangerous actions, emergency stops function, changeover switches operate, and control sequences execute properly."
  },
  {
    id: "func-rcd-test",
    question: "When conducting a functional test on a 30 mA Type AC RCD, the device must trip within which time at rated residual current (IΔn)?",
    options: [
      "40 ms",
      "300 ms (0.3 seconds)",
      "1 second",
      "5 seconds"
    ],
    correctIndex: 1,
    explanation: "BS 7671 requires a Type AC general-purpose RCD to trip within 300 ms when tested at its rated residual operating current (IΔn). At 5 × IΔn (150 mA for a 30 mA device), it must trip within 40 ms. These test times verify that the device provides adequate protection against electric shock within the physiological time limits for ventricular fibrillation."
  },
  {
    id: "func-rcd-button",
    question: "What is the purpose of the integral test button on an RCD?",
    options: [
      "It performs the same test as a calibrated RCD test instrument",
      "It verifies the mechanical operation of the trip mechanism only — it does not verify the sensitivity of the device and cannot replace instrument testing",
      "It tests the insulation resistance of the circuit",
      "It permanently disables the RCD for maintenance"
    ],
    correctIndex: 1,
    explanation: "The integral test button creates an artificial imbalance within the device to verify that the trip mechanism operates mechanically. However, it does not test the actual sensitivity of the toroidal current transformer or the full tripping circuit at the rated residual current. Instrument testing with a calibrated RCD tester at the specific trip current and time is required for full verification. The test button is for periodic user checks between formal instrument tests."
  },
  {
    id: "func-interlock",
    question: "Why is functional testing of electrical interlocks particularly important after maintenance work?",
    options: [
      "Because interlocks are purely decorative features",
      "Because interlocks are safety devices that prevent dangerous operations (such as opening a panel while energised), and any maintenance work may have inadvertently defeated, bypassed, or misadjusted them",
      "Because interlocks need lubricating after every maintenance visit",
      "Because BS 7671 requires interlocks to be tested every week"
    ],
    correctIndex: 1,
    explanation: "Electrical interlocks are safety-critical devices designed to prevent dangerous operations — for example, preventing a switchgear panel from being opened while the circuit is energised, or preventing a motor from starting while a guard is removed. During maintenance, interlocks may be temporarily bypassed, disturbed, or reassembled incorrectly. Functional testing after maintenance confirms that all interlocks have been correctly restored and operate as intended."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A 30 mA RCD tested at 50% of its rated residual current (15 mA) should:",
    options: [
      "Trip within 300 ms",
      "Not trip — the device should not operate at 50% of IΔn, confirming it will not nuisance-trip under normal leakage conditions",
      "Trip within 40 ms",
      "Trip within 5 seconds"
    ],
    correctAnswer: 1,
    explanation: "When tested at 50% of IΔn (15 mA for a 30 mA device), the RCD should NOT trip. This test confirms that the device will not nuisance-trip due to normal standing leakage currents on the circuit. If the RCD does trip at 50% IΔn, it may be oversensitive — potentially causing operational problems — or the circuit may have excessive standing leakage current."
  },
  {
    id: 2,
    question: "The full RCD test sequence specified by BS 7671 includes testing at:",
    options: [
      "Only the rated residual current (IΔn)",
      "50% IΔn (should not trip), 100% IΔn (must trip within 300 ms), and 5× IΔn (must trip within 40 ms)",
      "Only at 5× IΔn",
      "At 10 mA intervals from 0 to 100 mA"
    ],
    correctAnswer: 1,
    explanation: "The full RCD test sequence verifies the complete operating characteristic: at 50% IΔn the device should not trip (confirming it won't nuisance-trip), at 100% IΔn it must trip within 300 ms (confirming basic protection), and at 5× IΔn it must trip within 40 ms (confirming fast disconnection for higher fault currents). For Type S (time-delayed) RCDs, the time limits are different."
  },
  {
    id: 3,
    question: "When functionally testing a circuit breaker, the technician should verify:",
    options: [
      "Only that it can be switched off",
      "That it trips freely (opens under all conditions regardless of the handle position), that the operating mechanism is smooth without sticking or excessive force, and that the contacts make and break cleanly",
      "Only that the rating label is still readable",
      "That it has been painted recently"
    ],
    correctAnswer: 1,
    explanation: "Functional testing of circuit breakers verifies free tripping (the breaker must open even if the handle is held in the on position — this confirms the trip-free mechanism works), smooth mechanical operation (no sticking, excessive friction, or corroded mechanism), and clean contact operation (no arcing damage, welded contacts, or contact bounce). Any abnormality indicates the breaker requires maintenance or replacement."
  },
  {
    id: 4,
    question: "Functional testing of an emergency lighting system should verify:",
    options: [
      "Only that the lights are the correct colour",
      "That luminaires illuminate upon mains failure, achieve the required illumination level, and maintain illumination for the rated duration (typically 1 or 3 hours)",
      "Only that the battery is fully charged",
      "Only that the charging indicator is on"
    ],
    correctAnswer: 1,
    explanation: "Emergency lighting functional testing must verify that luminaires switch on when the mains supply is interrupted (automatic changeover), that they achieve the required illumination level on the escape routes, and that the battery-powered illumination is maintained for the full rated duration. BS 5266-1 specifies the testing requirements, including monthly brief functional tests and annual full-duration discharge tests."
  },
  {
    id: 5,
    question: "After functional testing of a fire alarm system, the technician must:",
    options: [
      "Leave the system in test mode overnight",
      "Restore the system to its normal operational state, confirm all zones are active and monitoring, and notify the alarm receiving centre (ARC) that testing is complete",
      "Disconnect the system until the next scheduled test",
      "Replace all detector heads"
    ],
    correctAnswer: 1,
    explanation: "After testing, the fire alarm system must be fully restored to its normal operational state with all zones active and monitoring. The alarm receiving centre (ARC) must be notified that testing is complete so that alarms are no longer treated as test signals. Failure to restore the system leaves the building without fire detection and alarm capability — a potentially life-threatening situation."
  },
  {
    id: 6,
    question: "A Type S (time-delayed) RCD is designed to:",
    options: [
      "Trip faster than a standard RCD",
      "Provide discrimination with a downstream non-delayed RCD by incorporating an intentional time delay, allowing the downstream device to trip first for faults on its circuits",
      "Replace the need for MCBs in the circuit",
      "Provide surge protection for electronic equipment"
    ],
    correctAnswer: 1,
    explanation: "A Type S RCD has an intentional time delay (typically 130-500 ms at IΔn) that allows a downstream non-delayed RCD to trip first for faults on circuits protected by both devices. This provides discrimination — only the RCD closest to the fault operates, maintaining supply to unaffected circuits. The Type S RCD provides backup protection if the downstream device fails to operate."
  },
  {
    id: 7,
    question: "Functional testing of a contactor or relay should include:",
    options: [
      "Only visual inspection of the enclosure",
      "Verification of correct pick-up (energise) and drop-out (de-energise) operation, contact condition, coil operation, and correct response to control signals",
      "Only measuring the coil resistance",
      "Only checking that the nameplate data is correct"
    ],
    correctAnswer: 1,
    explanation: "Functional testing of contactors and relays should verify: that the device picks up (energises) and drops out (de-energises) reliably in response to control signals, that the operating mechanism moves smoothly, that contacts are in acceptable condition (no excessive pitting, welding, or wear), and that the device performs its intended control function within the wider circuit."
  },
  {
    id: 8,
    question: "When testing the emergency stop function of a machine, the technician should verify:",
    options: [
      "That the emergency stop button is the correct colour only",
      "That pressing the emergency stop immediately de-energises all hazardous motion, that the stop is maintained (latched) until manually reset, and that the machine cannot restart until the stop is released and a deliberate start action is taken",
      "That the emergency stop can be overridden by the operator",
      "That the emergency stop disconnects only the control circuit"
    ],
    correctAnswer: 1,
    explanation: "Emergency stop testing must verify: immediate de-energisation of all hazardous motion and energy sources when activated, maintained (latched) stop condition that requires manual reset, and prevention of automatic restart when the stop is released — a deliberate start action must be required. These requirements are specified in BS EN 60204-1 for machine safety and are critical for preventing injury."
  },
  {
    id: 9,
    question: "A changeover switch (manual or automatic transfer switch) should be functionally tested to verify:",
    options: [
      "Only that the handle moves freely",
      "That it correctly transfers the load between sources, that the make-before-break or break-before-make sequence is correct for the application, and that mechanical and electrical interlocks prevent paralleling of sources",
      "Only that it has the correct IP rating",
      "Only that it is correctly labelled"
    ],
    correctAnswer: 1,
    explanation: "Changeover switch testing must verify correct transfer operation between sources, the correct switching sequence (break-before-make for independent sources to prevent paralleling, unless specifically designed for closed transition), and that all interlocks function to prevent simultaneous connection of both sources. For automatic transfer switches, the automatic sensing, transfer, and retransfer functions must all be verified."
  },
  {
    id: 10,
    question: "The functional test of a voltage-operated ELCB (now largely obsolete) differs from an RCD test because:",
    options: [
      "There is no difference",
      "An ELCB detects voltage on the earthing conductor rather than current imbalance, so the test method and acceptance criteria are different from those for current-operated RCDs",
      "ELCBs do not require testing",
      "ELCBs are tested at higher currents than RCDs"
    ],
    correctAnswer: 1,
    explanation: "Voltage-operated ELCBs (Earth Leakage Circuit Breakers) detect a voltage rise on the earthing conductor rather than current imbalance between line and neutral. They require a different test method — the test instrument applies a voltage between the ELCB earth terminal and a separate earth reference. While largely superseded by current-operated RCDs, ELCBs are still encountered in older installations during periodic inspection."
  },
  {
    id: 11,
    question: "When functionally testing a building management system (BMS) control sequence, the technician should:",
    options: [
      "Only check that the BMS screen displays correctly",
      "Simulate the control conditions (setpoints, alarm triggers, timer events) and verify that the system responds with the correct output actions in the correct sequence and within the specified time parameters",
      "Only verify that the BMS is connected to the network",
      "Only check that the power supply to the BMS is present"
    ],
    correctAnswer: 1,
    explanation: "Functional testing of BMS control sequences requires simulating the input conditions and verifying the outputs. This includes testing setpoint responses (does the system start and stop equipment at the correct thresholds?), alarm triggers (do alarms activate and notify correctly?), timer events (do scheduled operations occur at the correct times?), and fail-safe conditions (does the system respond safely to sensor failures or communication losses?)."
  },
  {
    id: 12,
    question: "After completing all functional tests, the results should be:",
    options: [
      "Stored only in the technician's memory",
      "Documented on the appropriate test schedule or commissioning record, including the test conditions, measured values, pass/fail assessment, and any observations or recommendations",
      "Reported verbally to the supervisor only",
      "Recorded only if a fault was found"
    ],
    correctAnswer: 1,
    explanation: "All functional test results must be formally documented on the appropriate schedule or commissioning record. The documentation should include the specific test performed, the conditions under which it was tested, the measured values or observed responses, a clear pass/fail assessment against the acceptance criteria, and any observations or recommendations for follow-up. This documentation forms part of the overall test and commissioning record."
  }
];

const faqs = [
  {
    question: "How often should RCDs be functionally tested?",
    answer: "BS 7671 recommends that RCDs be tested using the integral test button at quarterly intervals by the user. Full instrument testing (at 50%, 100%, and 5× IΔn) should be carried out during periodic inspection (EICR) at the intervals appropriate to the installation type. For critical applications (medical locations, construction sites), more frequent instrument testing may be specified. The test button check takes seconds and should be encouraged as part of the user's routine."
  },
  {
    question: "What is the difference between functional testing and commissioning?",
    answer: "Functional testing verifies that individual devices and systems operate correctly as intended — it is a component-level or system-level verification. Commissioning is the broader process of bringing a complete installation or system into operational service, which includes functional testing but also encompasses performance testing, load testing, environmental testing, documentation, and handover. Functional testing is one element of the commissioning process."
  },
  {
    question: "Can functional tests be carried out by apprentices?",
    answer: "Under the ST1426 standard, apprentices should develop competence in functional testing under appropriate supervision. Simple functional tests (test button operation, visual verification of indicator lights) can be carried out by apprentices with minimal supervision. More complex tests (RCD instrument testing, protection coordination verification, emergency system testing) require closer supervision and should only be carried out independently once competence has been demonstrated and assessed."
  },
  {
    question: "What should I do if a functional test reveals a fault?",
    answer: "If a functional test reveals a fault, the equipment or system must not be placed into service (or must be taken out of service if already operational) until the fault is rectified. Document the fault, its symptoms, and any immediate actions taken. Investigate the root cause — a failed functional test may indicate a component failure, incorrect installation, or a design deficiency. After rectification, re-test to confirm correct operation before returning to service."
  },
  {
    question: "Are functional tests required for every maintenance visit?",
    answer: "Not every functional test is required at every maintenance visit — it depends on the scope of work and the maintenance schedule. However, any protective device or safety system that has been disturbed, isolated, or worked on during the maintenance visit must be functionally tested before the equipment is returned to service. Additionally, periodic maintenance schedules should include scheduled functional testing at defined intervals for all safety-critical devices."
  }
];

const MOETModule4Section5_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section5">
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
            <ToggleRight className="h-4 w-4" />
            <span>Module 4.5.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Functional Testing
          </h1>
          <p className="text-white/80">
            Verifying correct operation of protective devices, control systems, interlocks, and emergency systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Purpose:</strong> Verify that devices and systems operate as intended</li>
              <li className="pl-1"><strong>RCDs:</strong> Test at 50%, 100%, and 5x IΔn with calibrated instrument</li>
              <li className="pl-1"><strong>Interlocks:</strong> Verify all safety interlocks function after maintenance</li>
              <li className="pl-1"><strong>Emergency:</strong> Test emergency stops, lighting, and fire alarm systems</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Safety-critical:</strong> Functional testing proves protective devices will operate when needed</li>
              <li className="pl-1"><strong>Post-maintenance:</strong> Always test devices that have been disturbed during work</li>
              <li className="pl-1"><strong>Documentation:</strong> Record all functional test results on appropriate schedules</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to testing, commissioning, and safety system competencies</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the purpose and scope of functional testing in electrical maintenance",
              "Conduct the full RCD test sequence (50%, 100%, 5x IΔn) using a calibrated instrument",
              "Functionally test circuit breakers, contactors, and switchgear operating mechanisms",
              "Verify interlock operation on switchgear, machine guards, and access panels",
              "Test emergency systems including emergency stops, emergency lighting, and fire alarms",
              "Document functional test results on appropriate schedules and commissioning records"
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

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Role of Functional Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Functional testing bridges the gap between electrical parameter testing and real-world operation. While insulation resistance, continuity, and earth fault loop impedance tests verify the electrical integrity of the installation, they do not confirm that equipment actually works as intended. A circuit breaker may have perfect continuity through its contacts and acceptable insulation, yet its trip mechanism may be seized due to corrosion or lack of use. An RCD may pass a visual inspection yet have a degraded toroidal transformer that prevents it from detecting earth leakage current. Only functional testing reveals these operational deficiencies.
            </p>
            <p>
              For maintenance technicians, functional testing is particularly important because it is the final verification before equipment is returned to service. After any maintenance intervention — whether a planned service, a repair, or a modification — the functional test confirms that all protective devices, safety systems, and control functions are operating correctly. Returning equipment to service without this verification is one of the most common causes of maintenance-induced failures.
            </p>
            <p>
              BS 7671 Part 6 requires functional testing as part of both initial verification and periodic inspection. The scope includes RCDs, circuit breakers (trip-free mechanism), interlocks, switchgear operating mechanisms, and any other device where correct operation is essential for safety. Beyond BS 7671, functional testing of fire alarm systems (BS 5839-1), emergency lighting (BS 5266-1), and machine safety systems (BS EN 60204-1) is required by their respective standards.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Functional Testing Scope</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Device/System</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What Functional Testing Verifies</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RCDs</td>
                      <td className="border border-white/10 px-3 py-2">Trip sensitivity, trip time, non-trip at 50% IΔn</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Circuit breakers</td>
                      <td className="border border-white/10 px-3 py-2">Trip-free operation, smooth mechanism, contact condition</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Interlocks</td>
                      <td className="border border-white/10 px-3 py-2">Prevention of dangerous operations, correct sequencing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Emergency stops</td>
                      <td className="border border-white/10 px-3 py-2">Immediate de-energisation, latching, anti-restart</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Emergency lighting</td>
                      <td className="border border-white/10 px-3 py-2">Changeover, illumination level, battery duration</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The Hidden Risk</p>
              <p className="text-sm text-white">
                Protective devices that are never functionally tested can develop latent faults that only become apparent when the device is called upon to operate during a real fault. By then, it is too late — the device that should have protected against electric shock, fire, or injury has failed silently. Functional testing is the only way to detect these hidden deficiencies before they have real consequences.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            RCD Testing — The Full Test Sequence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Residual current devices (RCDs) are among the most important protective devices in modern electrical installations, providing protection against electric shock from earth faults that may not generate sufficient current to operate overcurrent devices. However, an RCD that does not operate at the correct current or within the correct time provides a false sense of security. Comprehensive functional testing using a calibrated RCD test instrument is essential.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Test 1 — No-Trip Test (50% IΔn)</h3>
                <p className="text-sm text-white">
                  Apply a test current equal to 50% of the rated residual operating current (e.g., 15 mA for a 30 mA RCD). The RCD should NOT trip. This test confirms that the device will not nuisance-trip under normal leakage conditions. If the RCD trips at 50% IΔn, it may be oversensitive (indicating a fault in the device) or the circuit may have excessive standing leakage current that is combining with the test current to exceed the trip threshold.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Test 2 — Trip Test (100% IΔn)</h3>
                <p className="text-sm text-white">
                  Apply a test current equal to the rated residual operating current (e.g., 30 mA). The RCD must trip within 300 ms for a Type AC or Type A non-delayed device. Record the actual trip time. If the device does not trip or takes longer than 300 ms, it is defective and must be replaced. This test should be performed on both positive and negative half-cycles of the supply waveform (the instrument typically has a selection for this) to verify operation on both polarities.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Test 3 — Fast Trip Test (5× IΔn)</h3>
                <p className="text-sm text-white">
                  Apply a test current equal to five times the rated residual operating current (e.g., 150 mA for a 30 mA device). The RCD must trip within 40 ms. This test verifies fast disconnection under higher fault current conditions, which is critical for protection against electric shock at the let-through energy levels that can cause ventricular fibrillation.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Type S (Time-Delayed) RCDs</p>
              <p className="text-sm text-white">
                Type S RCDs have an intentional time delay for discrimination with downstream non-delayed RCDs. At IΔn, a Type S must trip between 130 ms and 500 ms (not within 300 ms like a standard RCD). At 5× IΔn, it must trip between 50 ms and 200 ms. These wider time windows reflect the intentional delay. The test instrument must be set to the correct RCD type to apply the appropriate acceptance criteria.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Switchgear and Circuit Breaker Functional Tests
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Circuit breakers and switchgear are mechanical devices with moving parts, springs, latches, and contacts. Over time, these mechanisms can deteriorate: springs lose tension, lubricant dries out, contacts pit and corrode, and pivots seize. A circuit breaker that cannot be operated manually, or whose trip mechanism is seized, provides no protection despite appearing to be in good condition from the outside. Functional testing exercises the mechanism and reveals these hidden deficiencies.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Circuit Breaker Functional Test Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Manual operation:</strong> Open and close the breaker several times. The mechanism should be smooth, positive, and require consistent force. Stiff, sticky, or inconsistent operation indicates mechanical deterioration.</li>
                <li className="pl-1"><strong>Trip-free mechanism:</strong> With the breaker in the on position, attempt to trip it using the test button or trip coil while holding the handle in the on position. The breaker must trip regardless — this is the trip-free requirement that prevents the operator from overriding the protection.</li>
                <li className="pl-1"><strong>Contact condition:</strong> For withdrawable breakers, inspect the contacts for pitting, discolouration, or deposits. For moulded case breakers, operate the breaker several times to exercise the contacts.</li>
                <li className="pl-1"><strong>Auxiliary contacts:</strong> Verify that any auxiliary contacts (for status indication, interlocking, or alarm purposes) operate correctly and in synchronisation with the main contacts.</li>
                <li className="pl-1"><strong>Racking mechanism:</strong> For withdrawable breakers, verify that the racking mechanism operates smoothly and that the shutters operate correctly in all positions (connected, test, disconnected).</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Contactor and Relay Testing</h3>
              <p className="text-sm text-white">
                Contactors and relays should be tested for correct pick-up and drop-out by energising and de-energising the coil. Listen for clean, positive operation — chattering or buzzing indicates problems with the coil, the magnetic circuit, or the contact springs. For contactors, check that the main contacts are not welded (a common failure mode that prevents the contactor from opening). For relays, verify correct changeover operation and check that the contact rating is appropriate for the load being switched.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Interlocks and Safety Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical interlocks are safety devices that enforce safe operating sequences by preventing dangerous operations — such as opening an energised switchgear compartment, starting a machine with a guard removed, or paralleling two unsynchronised power sources. They are one of the most important barriers in the Swiss cheese model of safety, and their correct operation after maintenance is critical.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Switchgear Interlocks</h3>
                <p className="text-sm text-white">
                  Switchgear typically incorporates multiple interlocks: the panel door cannot be opened with the breaker closed, the breaker cannot be closed with the panel door open, the breaker cannot be racked in or out with the breaker closed, and earthing devices cannot be applied with the breaker closed. Each interlock must be tested individually by attempting the prevented action and confirming that the interlock blocks it. Never assume an interlock works because it worked previously — mechanical interlocks can be defeated by wear, corrosion, or incorrect reassembly.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Emergency Stop Testing</h3>
                <p className="text-sm text-white mb-2">
                  Emergency stop testing must verify the complete functional chain:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Pressing the emergency stop immediately de-energises all hazardous motion and energy</li>
                  <li className="pl-1">The stop is latched — it remains in the stopped condition until manually reset</li>
                  <li className="pl-1">Resetting the emergency stop does not automatically restart the machine</li>
                  <li className="pl-1">A separate, deliberate start action is required after reset</li>
                  <li className="pl-1">All emergency stops on the machine/system perform identically</li>
                  <li className="pl-1">Emergency stop wiring is monitored for open-circuit faults (fail-safe design)</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Guard Interlocks</h3>
                <p className="text-sm text-white">
                  Machine guard interlocks prevent the machine from operating when a guard is open and, for some applications, prevent the guard from being opened while the machine is running (guard locking). Test by attempting to start the machine with the guard open (it should not start), opening the guard while running (the machine should stop), and attempting to defeat the interlock by manipulating the guard or switch (it should resist defeat). BS EN 14119 specifies the requirements for guard interlocks.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Emergency Lighting and Fire Alarm Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Emergency lighting and fire alarm systems are life-safety systems that must function reliably when called upon — typically during a power failure or fire, which are precisely the conditions under which other systems are failing. Functional testing of these systems is not optional; it is a legal requirement under the Regulatory Reform (Fire Safety) Order 2005 and the associated British Standards.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Emergency Lighting Test Schedule (BS 5266-1)</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Monthly (brief test):</strong> Simulate mains failure and verify that all emergency luminaires illuminate. Duration is typically sufficient to verify operation (a few minutes). Check for failed lamps, damaged fittings, and obstruction of light output. Reset and verify correct recharging.</li>
                <li className="pl-1"><strong>Annually (full duration):</strong> Discharge the batteries for the full rated duration (1 hour or 3 hours depending on the system design). Verify that illumination is maintained throughout and that light levels remain adequate on escape routes. Record the performance and replace any luminaires that fail to maintain illumination for the full duration.</li>
                <li className="pl-1"><strong>After any modification:</strong> Re-test affected luminaires and verify that escape route illumination is still adequate. Changes to building layout, furniture, or partitions may affect emergency lighting coverage.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Alarm Testing (BS 5839-1)</h3>
              <p className="text-sm text-white mb-2">
                Fire alarm functional testing includes:
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Weekly:</strong> Activate a different call point each week to verify the complete alarm chain — call point to panel to sounders. Rotate through all call points over the course of the testing cycle.</li>
                <li className="pl-1"><strong>Quarterly/annually:</strong> Test detector operation using appropriate test devices (smoke generators, heat sources). Verify cause-and-effect programming (specific detectors trigger specific outputs). Test auxiliary functions (door holders, damper controls, lift recall, ARC transmission).</li>
                <li className="pl-1"><strong>Before and after:</strong> Always notify the alarm receiving centre (ARC) and building occupants before testing. Always restore the system and confirm normal operation afterwards.</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>ST1426 link:</strong> Functional testing of protective devices and safety systems is a core competency for the maintenance technician standard. The ability to conduct these tests correctly, interpret the results, and take appropriate action when tests fail is directly assessed in the end-point assessment. Building your practical experience in functional testing during your apprenticeship is essential.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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
                <p className="font-medium text-white mb-1">RCD Test Sequence (30 mA)</p>
                <ul className="space-y-0.5">
                  <li>50% IΔn (15 mA): should NOT trip</li>
                  <li>100% IΔn (30 mA): must trip within 300 ms</li>
                  <li>5× IΔn (150 mA): must trip within 40 ms</li>
                  <li>Test on both half-cycles (+ve and -ve)</li>
                  <li>Type S: 130-500 ms at IΔn, 50-200 ms at 5×</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Emergency System Tests</p>
                <ul className="space-y-0.5">
                  <li>Emergency lighting: monthly brief, annual full duration</li>
                  <li>Fire alarm: weekly call point, quarterly detectors</li>
                  <li>Emergency stops: immediate stop, latching, anti-restart</li>
                  <li>Always notify ARC before fire alarm tests</li>
                  <li>Always restore systems after testing</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section5-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Earth Fault Loop Impedance Testing
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section5-5">
              Next: Test Documentation and Certification
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule4Section5_4;