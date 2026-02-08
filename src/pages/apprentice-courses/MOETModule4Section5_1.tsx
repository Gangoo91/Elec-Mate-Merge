import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Insulation Resistance Testing - MOET Module 4.5.1";
const DESCRIPTION = "Comprehensive guide to insulation resistance testing in electrical maintenance: test principles, instrument selection, test procedures, interpreting results, and trending for condition-based maintenance in accordance with BS 7671.";

const quickCheckQuestions = [
  {
    id: "ir-test-purpose",
    question: "What is the primary purpose of insulation resistance testing?",
    options: [
      "To measure the resistance of the cable conductor",
      "To verify that the insulation between live conductors and between live conductors and earth is adequate to prevent leakage current and short circuits",
      "To check the continuity of the circuit protective conductor",
      "To measure the prospective fault current at each point"
    ],
    correctIndex: 1,
    explanation: "Insulation resistance testing verifies that the insulation between live conductors (line-neutral) and between live conductors and earth (line-earth, neutral-earth) is sufficiently high to prevent dangerous leakage current and short circuits. Degraded insulation is a common precursor to electrical faults, fires, and electric shock incidents."
  },
  {
    id: "ir-test-voltage",
    question: "For a 230 V single-phase circuit, what test voltage should be applied when conducting an insulation resistance test in accordance with BS 7671?",
    options: [
      "250 V d.c.",
      "500 V d.c.",
      "1000 V d.c.",
      "230 V a.c."
    ],
    correctIndex: 1,
    explanation: "BS 7671 Table 6.3 specifies that for circuits with a nominal voltage above 50 V up to and including 500 V (which includes standard 230 V single-phase and 400 V three-phase circuits), the test voltage is 500 V d.c. and the minimum acceptable insulation resistance is 1 MΩ. The test uses d.c. rather than a.c. to avoid capacitive effects."
  },
  {
    id: "ir-test-disconnections",
    question: "Before conducting an insulation resistance test, which of the following must be disconnected from the circuit?",
    options: [
      "Only lighting fixtures",
      "All electronic equipment, surge protective devices (SPDs), and any equipment that could be damaged by the test voltage",
      "Only equipment rated above 1 kW",
      "Nothing — the test can be conducted with all equipment connected"
    ],
    correctIndex: 1,
    explanation: "Electronic equipment (computers, PLCs, variable speed drives), surge protective devices (SPDs), dimmer switches, and other sensitive components must be disconnected before applying the insulation resistance test voltage, as the 500 V d.c. test voltage can damage or destroy them. Lamps should also be removed or disconnected to avoid giving a misleadingly low reading."
  },
  {
    id: "ir-test-trending",
    question: "Why is trending of insulation resistance values over time more valuable than a single test reading?",
    options: [
      "Because a single reading is always inaccurate",
      "Because trending reveals the rate of insulation degradation, allowing deterioration to be identified and addressed before values fall below the minimum acceptable level",
      "Because BS 7671 requires at least five test readings for each circuit",
      "Because trending makes the test report look more professional"
    ],
    correctIndex: 1,
    explanation: "While a single insulation resistance reading confirms whether the insulation currently meets the minimum standard, trending over multiple test cycles reveals the rate of deterioration. A circuit with a reading of 5 MΩ that was 200 MΩ two years ago is declining rapidly and requires investigation, even though it still exceeds the 1 MΩ minimum. Trending supports condition-based maintenance by enabling proactive intervention."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Insulation resistance is measured in:",
    options: [
      "Ohms (Ω)",
      "Megohms (MΩ)",
      "Milliohms (mΩ)",
      "Amps (A)"
    ],
    correctAnswer: 1,
    explanation: "Insulation resistance is measured in megohms (MΩ) because healthy insulation has a very high resistance — typically tens or hundreds of megohms for new installations. The minimum acceptable value under BS 7671 for standard circuits is 1 MΩ, which is one million ohms."
  },
  {
    id: 2,
    question: "According to BS 7671 Table 6.3, the minimum acceptable insulation resistance for a 230 V circuit tested at 500 V d.c. is:",
    options: [
      "0.5 MΩ",
      "1 MΩ",
      "2 MΩ",
      "10 MΩ"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Table 6.3 specifies a minimum insulation resistance of 1 MΩ for circuits with a nominal voltage exceeding 50 V up to and including 500 V when tested at 500 V d.c. While 1 MΩ is the minimum pass value, readings this low warrant further investigation as they indicate significant insulation degradation."
  },
  {
    id: 3,
    question: "Which type of voltage is used for insulation resistance testing?",
    options: [
      "Alternating current (a.c.) at the supply frequency",
      "Direct current (d.c.) at the specified test voltage",
      "Either a.c. or d.c. — the choice does not matter",
      "Pulsed d.c. at high frequency"
    ],
    correctAnswer: 1,
    explanation: "Insulation resistance tests use d.c. test voltages. This is because a.c. would cause capacitive current flow through the cable capacitance, giving misleadingly low resistance readings. D.c. provides a true measure of the resistive component of the insulation, which is what determines whether the insulation is adequate."
  },
  {
    id: 4,
    question: "Before conducting an insulation resistance test on a motor circuit, the maintenance technician should:",
    options: [
      "Run the motor at full speed to warm the insulation",
      "Isolate the circuit, lock off, prove dead, disconnect the motor and any electronic drive equipment, then conduct the test",
      "Test with the motor running to get a realistic reading",
      "Only test the cable, not the motor windings"
    ],
    correctAnswer: 1,
    explanation: "The circuit must be isolated, locked off, and proved dead before testing. The motor should be disconnected from any electronic drive (VSD/VFD) as the test voltage will damage electronic components. The insulation resistance of the cable and motor windings can then be tested separately, which helps to localise any insulation weakness."
  },
  {
    id: 5,
    question: "A circuit that reads 0.5 MΩ during an insulation resistance test at 500 V d.c. should be classified as:",
    options: [
      "Satisfactory — it is above zero",
      "Unsatisfactory — it is below the minimum acceptable value of 1 MΩ and requires investigation",
      "Marginal — retest in six months",
      "Cannot be determined without knowing the circuit length"
    ],
    correctAnswer: 1,
    explanation: "A reading of 0.5 MΩ is below the minimum acceptable value of 1 MΩ specified in BS 7671 and is therefore unsatisfactory. The circuit should not be returned to service until the cause of the low insulation resistance has been identified and rectified. Common causes include moisture ingress, damaged insulation, or contamination."
  },
  {
    id: 6,
    question: "What effect does temperature have on insulation resistance readings?",
    options: [
      "Temperature has no effect on insulation resistance",
      "Higher temperatures generally cause lower insulation resistance readings, and this must be considered when comparing readings taken at different times",
      "Higher temperatures always increase insulation resistance",
      "Only extreme temperatures below freezing affect the readings"
    ],
    correctAnswer: 1,
    explanation: "Insulation resistance decreases as temperature increases — approximately halving for every 10°C rise above 20°C. This is important when comparing readings taken at different times of year or under different operating conditions. For accurate trending, readings should be corrected to a standard reference temperature (usually 20°C) or the temperature at the time of testing should be recorded."
  },
  {
    id: 7,
    question: "The three standard insulation resistance test configurations for a single-phase circuit are:",
    options: [
      "Line to neutral, line to earth, neutral to earth",
      "Line to line, earth to earth, neutral to neutral",
      "Phase to phase only",
      "Line to earth only"
    ],
    correctAnswer: 0,
    explanation: "For a single-phase circuit, insulation resistance is tested between line and neutral (L-N), line and earth (L-E), and neutral and earth (N-E). Each test checks a different insulation barrier. For three-phase circuits, additional tests between phases (L1-L2, L2-L3, L1-L3) are also required, as well as each phase to neutral and each phase to earth."
  },
  {
    id: 8,
    question: "After completing an insulation resistance test, the technician should:",
    options: [
      "Immediately reconnect and energise the circuit",
      "Discharge any stored capacitive charge by shorting the conductors together before reconnecting equipment or touching conductors",
      "Leave the circuit disconnected overnight to allow the charge to dissipate naturally",
      "Apply a higher test voltage to verify the result"
    ],
    correctAnswer: 1,
    explanation: "After an insulation resistance test, the cable capacitance retains a charge at the test voltage (up to 1000 V for some tests). This stored charge can deliver a painful or dangerous shock. The charge must be safely discharged by shorting the conductors together through the test instrument's discharge function or by connecting them together before anyone touches the conductors or reconnects equipment."
  },
  {
    id: 9,
    question: "Which environmental condition most commonly causes reduced insulation resistance in an otherwise healthy installation?",
    options: [
      "High ambient light levels",
      "Moisture — from condensation, water ingress, or high humidity",
      "Low ambient temperature",
      "Electromagnetic interference from nearby equipment"
    ],
    correctAnswer: 1,
    explanation: "Moisture is the most common environmental cause of reduced insulation resistance. Condensation in distribution boards, water ingress through damaged cable glands or enclosure seals, and high humidity in poorly ventilated spaces all reduce insulation resistance. Drying out the installation and rectifying the moisture source typically restores the insulation resistance to acceptable levels."
  },
  {
    id: 10,
    question: "An insulation resistance test instrument must be verified before use. The standard method is:",
    options: [
      "Plugging it into a mains socket to check the display",
      "Testing with leads open-circuited (should read infinity/overrange) and short-circuited (should read approximately zero), and checking the battery condition",
      "Comparing its reading with another technician's instrument",
      "Checking the calibration sticker date only"
    ],
    correctAnswer: 1,
    explanation: "Before use, the instrument should be verified by testing with the leads open-circuited (the reading should be infinity or overrange, confirming the instrument can detect high resistance) and short-circuited (the reading should be approximately zero, confirming the leads and connections are sound). Battery condition should also be checked. This does not replace periodic calibration but confirms the instrument is functioning correctly for the test session."
  },
  {
    id: 11,
    question: "For SELV (Separated Extra-Low Voltage) circuits operating at 25 V, the test voltage and minimum insulation resistance specified by BS 7671 are:",
    options: [
      "500 V d.c. and 1 MΩ",
      "250 V d.c. and 0.5 MΩ",
      "1000 V d.c. and 2 MΩ",
      "100 V d.c. and 0.25 MΩ"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Table 6.3 specifies that for SELV and PELV circuits (nominal voltage not exceeding 50 V), the test voltage is 250 V d.c. and the minimum acceptable insulation resistance is 0.5 MΩ. The lower test voltage protects the insulation of circuits designed for extra-low voltage operation."
  },
  {
    id: 12,
    question: "When testing a large installation with many circuits, an initial test of all circuits together reads 0.8 MΩ. The correct next step is:",
    options: [
      "Record 0.8 MΩ as the overall result and move on",
      "Test each circuit individually to identify which circuit(s) have low insulation resistance, as the overall reading is the parallel combination of all circuits",
      "Increase the test voltage to 1000 V to get a higher reading",
      "Report the installation as unsafe and recommend complete rewiring"
    ],
    correctAnswer: 1,
    explanation: "When testing multiple circuits in parallel, the overall reading is the parallel combination of all individual circuit resistances and will always be lower than the lowest individual reading. An overall reading below 1 MΩ indicates that one or more circuits have low insulation resistance. Each circuit must be tested individually to identify the specific circuit(s) requiring attention. The faulty circuit may read well below 1 MΩ while all others are satisfactory."
  }
];

const faqs = [
  {
    question: "How often should insulation resistance testing be carried out?",
    answer: "BS 7671 does not mandate specific intervals — it depends on the type of installation, its environment, and the duty holder's risk assessment. For commercial and industrial installations, testing as part of an EICR is typically recommended every 1-5 years depending on the installation type. Critical installations (hospitals, process plant) may require more frequent testing. For maintenance purposes, insulation resistance testing should also be carried out after any repair, modification, or suspected fault."
  },
  {
    question: "Can insulation resistance testing damage equipment?",
    answer: "Yes — the d.c. test voltage (250 V, 500 V, or 1000 V depending on the circuit) can damage sensitive electronic equipment including computers, PLCs, variable speed drives, LED drivers, surge protective devices, and dimmer switches. All such equipment must be disconnected before testing. Lamps (especially LEDs and CFLs) should also be removed or disconnected to avoid damage and to prevent misleadingly low readings."
  },
  {
    question: "What causes a sudden drop in insulation resistance?",
    answer: "A sudden significant drop typically indicates a specific event rather than gradual degradation: water ingress following rainfall or a leak, physical damage to a cable (e.g., from drilling or rodent activity), contamination from chemical spills or industrial processes, or a fault developing in equipment connected to the circuit. The cause should be investigated promptly, as a rapid decline may precede a complete insulation failure."
  },
  {
    question: "Is 1 MΩ actually a good insulation resistance reading?",
    answer: "While 1 MΩ is the minimum acceptable value under BS 7671, it is not a 'good' reading. New, healthy installations typically exhibit insulation resistance values of 200 MΩ or more. A reading of 1 MΩ indicates significant insulation degradation and, while it technically passes, it warrants investigation into the cause and monitoring for further decline. The IET Guidance Note 3 recommends that any reading below 2 MΩ should prompt further investigation."
  },
  {
    question: "How does cable length affect insulation resistance?",
    answer: "Insulation resistance is inversely proportional to cable length — longer cables have lower insulation resistance because there is more insulation surface area through which leakage current can flow. The 1 MΩ minimum in BS 7671 applies to the whole circuit. For very long cable runs, the measured insulation resistance of a healthy circuit may be lower than expected. This is a physical property, not a fault, but should be documented and understood when trending results."
  }
];

const MOETModule4Section5_1 = () => {
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
            <Zap className="h-4 w-4" />
            <span>Module 4.5.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Insulation Resistance Testing
          </h1>
          <p className="text-white/80">
            Principles, procedures, and interpretation of insulation resistance testing for electrical maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Purpose:</strong> Verify insulation integrity between conductors and earth</li>
              <li className="pl-1"><strong>Test voltage:</strong> 250 V, 500 V, or 1000 V d.c. depending on circuit voltage</li>
              <li className="pl-1"><strong>Minimum value:</strong> 1 MΩ for standard 230/400 V circuits (BS 7671)</li>
              <li className="pl-1"><strong>Trending:</strong> Track values over time to detect deterioration before failure</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>When to test:</strong> After repairs, modifications, suspected faults, and periodic inspections</li>
              <li className="pl-1"><strong>Precautions:</strong> Isolate, prove dead, disconnect sensitive electronics</li>
              <li className="pl-1"><strong>Common causes of low IR:</strong> Moisture, damaged insulation, contamination, age</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to testing, inspection, and diagnostic competencies</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the principles of insulation resistance testing and why d.c. test voltages are used",
              "Select the correct test voltage and minimum acceptable value for different circuit types",
              "Describe the preparation steps required before conducting insulation resistance tests",
              "Conduct insulation resistance tests between the three standard configurations (L-N, L-E, N-E)",
              "Interpret test results and identify common causes of low insulation resistance",
              "Apply trending techniques to support condition-based maintenance strategies"
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
            Principles of Insulation Resistance Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every electrical conductor is surrounded by insulating material — whether it is the PVC sheath of a cable, the varnish on a motor winding, or the ceramic body of a busbar support. This insulation serves a critical safety function: it prevents current from flowing through unintended paths, which could result in short circuits, earth faults, electric shock, or fire. Insulation resistance testing measures how effectively this insulation is performing its function.
            </p>
            <p>
              The test works by applying a known d.c. voltage across the insulation and measuring the resulting leakage current. Using Ohm's law (R = V/I), the instrument calculates the insulation resistance. High resistance (measured in megohms) indicates healthy insulation with minimal leakage; low resistance indicates degraded insulation that allows significant leakage current. The test uses d.c. rather than a.c. because cables have inherent capacitance, and a.c. would cause capacitive current flow that is not related to insulation quality, giving misleadingly low readings.
            </p>
            <p>
              Insulation does not fail suddenly in most cases — it degrades gradually over time due to thermal ageing, mechanical stress, chemical exposure, moisture, and ultraviolet radiation. By the time insulation resistance has fallen to the minimum acceptable level, significant degradation has already occurred. This is why trending — tracking insulation resistance values over time — is far more valuable than single readings. A declining trend indicates active deterioration that requires investigation, even if the current reading still exceeds the minimum.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Table 6.3 — Test Voltages and Minimum Values</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Circuit Nominal Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Test Voltage (d.c.)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum IR</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SELV and PELV (up to 50 V)</td>
                      <td className="border border-white/10 px-3 py-2">250 V d.c.</td>
                      <td className="border border-white/10 px-3 py-2">0.5 MΩ</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Up to and including 500 V (excl. SELV/PELV)</td>
                      <td className="border border-white/10 px-3 py-2">500 V d.c.</td>
                      <td className="border border-white/10 px-3 py-2">1 MΩ</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Above 500 V</td>
                      <td className="border border-white/10 px-3 py-2">1000 V d.c.</td>
                      <td className="border border-white/10 px-3 py-2">1 MΩ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Safety Warning</p>
              <p className="text-sm text-white">
                Insulation resistance testing applies voltages of up to 1000 V d.c. to the circuit under test. The circuit must be fully isolated, locked off, and proved dead before testing. All persons must be kept clear of exposed conductors during the test. After testing, the stored capacitive charge must be safely discharged before anyone touches the conductors or equipment is reconnected.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Preparation and Pre-Test Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Thorough preparation is essential for obtaining accurate insulation resistance readings and for ensuring the safety of the technician and the integrity of connected equipment. Inadequate preparation is the most common cause of misleading results and equipment damage during insulation resistance testing.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 1 — Safe Isolation</h3>
                <p className="text-sm text-white">
                  Isolate the circuit or installation to be tested using an appropriate isolation device. Apply a lock and warning notice. Prove dead at the point of work using a voltage indicator that has been proved on a known live source (prove-test-prove procedure). Insulation resistance testing must never be carried out on live circuits — the test instrument readings will be meaningless, and the instrument may be damaged.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 2 — Disconnect Sensitive Equipment</h3>
                <p className="text-sm text-white mb-2">
                  Before applying the test voltage, disconnect or isolate all equipment that could be damaged by the d.c. test voltage:
                </p>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Electronic equipment: computers, servers, PLCs, control systems, BMS controllers</li>
                  <li className="pl-1">Variable speed drives (VSDs) and soft starters</li>
                  <li className="pl-1">Surge protective devices (SPDs) — these will conduct at the test voltage</li>
                  <li className="pl-1">LED drivers and electronic ballasts</li>
                  <li className="pl-1">Dimmer switches and electronic timers</li>
                  <li className="pl-1">Capacitors (will charge during the test and may give misleading readings)</li>
                  <li className="pl-1">Lamps — remove or disconnect to avoid affecting readings</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 3 — Prepare the Circuit</h3>
                <p className="text-sm text-white">
                  Ensure all switches, circuit breakers, and fused switches in the circuit under test are in the closed (on) position so that the test voltage reaches all parts of the circuit. For lighting circuits, switches should be on and lamps removed. For socket outlet circuits, ensure any switched sockets are on. The aim is to test the maximum extent of the circuit wiring in a single test. Record the ambient temperature, as this affects the insulation resistance value and is needed for accurate trending.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 4 — Verify the Test Instrument</h3>
                <p className="text-sm text-white">
                  Before testing, verify the insulation resistance test instrument: check battery condition (low battery gives inaccurate readings), test with leads open-circuited (should read infinity/overrange), and test with leads short-circuited (should read approximately zero). Confirm the instrument is within its calibration date. Select the correct test voltage range for the circuit under test.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Test Configurations and Procedure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Insulation resistance is tested between each combination of conductors to check every insulation barrier in the circuit. The specific test configurations depend on the circuit type. For a single-phase circuit, three tests are required; for a three-phase circuit, the number increases to account for all phase-to-phase combinations. Each test checks a different potential fault path.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Single-Phase Test Configurations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Line to Neutral (L-N):</strong> Tests the insulation between the line and neutral conductors. A low reading indicates a potential short-circuit path between the two current-carrying conductors.</li>
                <li className="pl-1"><strong>Line to Earth (L-E):</strong> Tests the insulation between the line conductor and the circuit protective conductor (earth). A low reading indicates a potential earth fault path that could cause RCD tripping or, in TN systems, overcurrent protection operation.</li>
                <li className="pl-1"><strong>Neutral to Earth (N-E):</strong> Tests the insulation between the neutral conductor and earth. A low reading here may indicate a neutral-earth fault that can cause circulating currents, electromagnetic interference, and RCD nuisance tripping.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Three-Phase Test Configurations</p>
              <p className="text-sm text-white mb-2">
                For three-phase circuits, the following additional tests between phases are required:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">L1 to L2, L2 to L3, L1 to L3 (phase-to-phase insulation)</li>
                <li className="pl-1">L1 to N, L2 to N, L3 to N (each phase to neutral)</li>
                <li className="pl-1">L1 to E, L2 to E, L3 to E (each phase to earth)</li>
                <li className="pl-1">N to E (neutral to earth)</li>
              </ul>
              <p className="text-sm text-white mt-2">
                This gives a total of ten tests for a complete three-phase assessment. Each reading must be recorded individually on the Schedule of Test Results.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Conducting the Test</h3>
              <p className="text-sm text-white">
                Connect the test leads to the appropriate conductors at the distribution board or origin of the circuit. Apply the test voltage and hold until the reading stabilises — this typically takes 10-30 seconds for short circuits but may take longer for circuits with significant capacitance (long cable runs, motor windings). Record the stabilised reading. If the reading does not stabilise and continues to decrease, this may indicate moisture absorption (polarisation index testing may be appropriate for motor windings). After each test, discharge the stored capacitive charge before moving the test leads.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Interpreting Results and Common Causes of Low Readings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Interpreting insulation resistance results requires more than simply comparing the reading to the minimum acceptable value. A competent technician considers the reading in context: the age and type of the installation, previous readings (trends), the environmental conditions, the length of the circuit, and the type of equipment connected. A reading of 5 MΩ on a 50-year-old installation with long cable runs may be acceptable, while the same reading on a new installation would indicate a serious problem.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Causes of Low Insulation Resistance</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Moisture ingress:</strong> Water in cable joints, junction boxes, or distribution boards. Often caused by failed glands, cracked enclosures, or condensation in unheated spaces</li>
                <li className="pl-1"><strong>Physical damage:</strong> Cable insulation damaged by nails, screws, rodent activity, or mechanical impact. May be localised and difficult to detect visually</li>
                <li className="pl-1"><strong>Thermal degradation:</strong> Insulation aged by sustained overheating — from overloaded cables, poor ventilation, or thermal insulation covering cables not rated for it</li>
                <li className="pl-1"><strong>Chemical contamination:</strong> Oil, solvents, or industrial chemicals that break down insulation materials. Common in industrial environments</li>
                <li className="pl-1"><strong>Age-related deterioration:</strong> Natural ageing of insulation materials, particularly in older installations with rubber or lead-sheathed cables</li>
                <li className="pl-1"><strong>Connected equipment:</strong> Faulty equipment or equipment not disconnected before testing can give misleadingly low readings</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Fault Localisation Techniques</h3>
              <p className="text-sm text-white">
                When an insulation resistance test reveals a low reading, the next step is to localise the fault. Start by disconnecting all equipment and accessories from the circuit and retesting the cable alone. If the cable alone reads satisfactorily, the fault is in a connected device. If the cable reading is still low, progressively disconnect the circuit at accessible junction points and retest each section individually. This halving technique narrows down the fault location efficiently. For long cable runs where access is limited, specialist cable fault location equipment (time-domain reflectometers or surge generators) may be required.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Interpreting Parallel Circuit Readings</p>
              <p className="text-sm text-white">
                When multiple circuits are tested simultaneously (e.g., testing all circuits from a distribution board together), the overall reading is the parallel combination of all individual circuit resistances. This will always be lower than the lowest individual circuit resistance. An overall reading of 2 MΩ from ten circuits in parallel means the average individual circuit resistance is approximately 20 MΩ — probably satisfactory. However, one circuit at 0.5 MΩ among nine at 200 MΩ would give an overall reading of approximately 0.5 MΩ. Individual circuit testing is essential when the overall reading is below the minimum.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Trending and Condition-Based Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The true power of insulation resistance testing in a maintenance context lies not in individual pass/fail assessments but in the systematic trending of results over time. A single reading tells you the condition at one moment; a trend tells you the rate of degradation and enables prediction of when intervention will be needed. This transforms insulation resistance testing from a reactive verification into a proactive condition monitoring tool.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Building a Trending Programme</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Consistent methodology:</strong> Test at the same points, using the same test voltage, with the same preparation procedure each time to ensure readings are comparable</li>
                <li className="pl-1"><strong>Temperature correction:</strong> Record the ambient and conductor temperature at each test. Apply correction factors when comparing readings taken at different temperatures (IR approximately halves for each 10°C rise)</li>
                <li className="pl-1"><strong>Regular intervals:</strong> Establish a testing schedule appropriate to the criticality and age of the installation. More frequent testing for critical circuits and older installations</li>
                <li className="pl-1"><strong>Alert thresholds:</strong> Set intervention thresholds above the minimum acceptable value. For example, investigate when IR drops below 5 MΩ rather than waiting for it to reach 1 MΩ</li>
                <li className="pl-1"><strong>Graphical presentation:</strong> Plot IR values against time for each circuit. A declining trend line is a clear visual indicator of deterioration</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Polarisation Index Testing</h3>
              <p className="text-sm text-white">
                For motor windings and transformers, the polarisation index (PI) test provides additional diagnostic information beyond a standard insulation resistance reading. The PI is the ratio of the insulation resistance at 10 minutes to the resistance at 1 minute (PI = R10min / R1min). In healthy insulation, the resistance increases over time as the dielectric absorption effect reduces the leakage current. A PI of 2.0 or above generally indicates good insulation condition. A PI close to 1.0 suggests contamination or moisture saturation. This test is particularly valuable for assessing the condition of large rotating machines where a single resistance reading may not tell the full story.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>ST1426 link:</strong> The maintenance technician standard requires competence in condition monitoring and predictive maintenance techniques. Insulation resistance trending is a foundational skill in this area, demonstrating your ability to move beyond reactive fault-finding to proactive condition-based maintenance.
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
                <p className="font-medium text-white mb-1">Test Procedure Summary</p>
                <ul className="space-y-0.5">
                  <li>1. Isolate, lock off, prove dead</li>
                  <li>2. Disconnect sensitive equipment and SPDs</li>
                  <li>3. Close all switches in the circuit</li>
                  <li>4. Verify test instrument (open/short/battery)</li>
                  <li>5. Test L-N, L-E, N-E (and phase-phase for 3-phase)</li>
                  <li>6. Record readings, discharge, reconnect</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Values (BS 7671)</p>
                <ul className="space-y-0.5">
                  <li>SELV/PELV: 250 V d.c., minimum 0.5 MΩ</li>
                  <li>Up to 500 V: 500 V d.c., minimum 1 MΩ</li>
                  <li>Above 500 V: 1000 V d.c., minimum 1 MΩ</li>
                  <li>New installation typical: 200+ MΩ</li>
                  <li>Investigate below: 2 MΩ (IET GN3)</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section5-2">
              Next: Continuity Testing
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule4Section5_1;