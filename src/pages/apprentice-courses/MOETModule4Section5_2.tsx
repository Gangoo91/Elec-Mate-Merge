import { ArrowLeft, Link2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Continuity Testing - MOET Module 4.5.2";
const DESCRIPTION = "Comprehensive guide to continuity testing in electrical maintenance: protective conductor continuity, ring final circuit testing, R1+R2 measurements, instrument selection and procedures in accordance with BS 7671.";

const quickCheckQuestions = [
  {
    id: "cont-purpose",
    question: "What is the primary purpose of protective conductor continuity testing?",
    options: [
      "To verify the insulation between conductors",
      "To confirm that the circuit protective conductor (CPC) provides a continuous, low-resistance path for fault current to flow back to the source, ensuring protective devices operate within the required disconnection time",
      "To measure the voltage drop across the circuit",
      "To check the current-carrying capacity of the cable"
    ],
    correctIndex: 1,
    explanation: "Protective conductor continuity testing confirms that the CPC provides a continuous, low-resistance earth fault path from every point in the circuit back to the source. This is essential for safety — if a line-to-earth fault occurs, the fault current must be sufficient to operate the protective device (MCB, fuse, or RCD) within the maximum disconnection time specified by BS 7671."
  },
  {
    id: "cont-r1r2",
    question: "What does the R1+R2 measurement represent?",
    options: [
      "The total resistance of two separate circuits added together",
      "The combined resistance of the line conductor (R1) and the circuit protective conductor (R2) measured end-to-end from the distribution board to the furthest point of the circuit",
      "The resistance of two earth rods in parallel",
      "The resistance of the neutral and earth conductors"
    ],
    correctIndex: 1,
    explanation: "R1+R2 is the combined resistance of the line conductor (R1) and the circuit protective conductor (R2) measured from the distribution board to the furthest point of the circuit. This value is added to the external earth fault loop impedance (Ze) to give the total earth fault loop impedance (Zs) at the furthest point: Zs = Ze + (R1+R2). This determines whether the protective device will operate within the required disconnection time."
  },
  {
    id: "cont-ring-test",
    question: "Why is a specific three-step test procedure required for ring final circuits?",
    options: [
      "Because ring circuits are more expensive to install",
      "To verify that the ring is continuous (no breaks), that cross-connections have not been made, and to obtain accurate R1+R2 values at each socket outlet",
      "Because ring circuits use thicker cable than radial circuits",
      "To measure the voltage at each socket outlet"
    ],
    correctIndex: 1,
    explanation: "The three-step ring final circuit test verifies: (1) that each conductor forms a continuous ring with no breaks, (2) that no interconnections or spurs have been incorrectly wired into the ring, and (3) the R1+R2 value at each socket outlet. A broken ring would still supply power to all sockets but would mean that the full load could pass through a single leg of the ring, potentially overloading that cable."
  },
  {
    id: "cont-instrument",
    question: "What type of instrument is used for continuity testing, and what test current does BS 7671 require?",
    options: [
      "An insulation resistance tester at 500 V d.c.",
      "A low-resistance ohmmeter capable of delivering a test current of not less than 200 mA from a no-load voltage between 4 V and 24 V d.c.",
      "A clamp meter measuring in amps",
      "A multimeter set to the a.c. voltage range"
    ],
    correctIndex: 1,
    explanation: "BS 7671 requires continuity testing to be performed using a low-resistance ohmmeter that delivers a test current of not less than 200 mA. The no-load voltage of the instrument must be between 4 V and 24 V d.c. This relatively high test current ensures that the instrument can detect high-resistance joints and poor connections that a lower test current might miss."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Continuity of circuit protective conductors should be tested:",
    options: [
      "Only during the initial installation",
      "During initial verification and at each subsequent periodic inspection, as well as after any repair or modification to the circuit",
      "Only if a fault is suspected",
      "Only on circuits above 32 A"
    ],
    correctAnswer: 1,
    explanation: "Continuity testing is required during initial verification (before the installation is first energised), at each periodic inspection (EICR), and after any repair or modification that may have affected the protective conductor. Regular testing ensures that connections remain sound and that no deterioration has occurred."
  },
  {
    id: 2,
    question: "When performing a continuity test, the circuit must be:",
    options: [
      "Energised at normal supply voltage",
      "De-energised, isolated, and proved dead before connecting the test instrument",
      "Connected to a temporary 110 V supply",
      "Tested while under normal load conditions"
    ],
    correctAnswer: 1,
    explanation: "All continuity testing must be carried out on de-energised circuits. The circuit must be isolated, locked off, and proved dead using the prove-test-prove procedure before connecting the low-resistance ohmmeter. Testing on live circuits would damage the instrument and endanger the technician."
  },
  {
    id: 3,
    question: "A continuity test on a protective conductor gives a reading of 0.5 Ω. The technician should:",
    options: [
      "Reject the circuit immediately",
      "Consider the reading in context — compare it against the expected value based on cable size, length, and conductor material to determine if it is within acceptable limits",
      "Multiply the reading by two to get the true value",
      "Record it as satisfactory without further consideration"
    ],
    correctAnswer: 1,
    explanation: "A continuity reading must be evaluated in context. The expected resistance depends on the cable size (cross-sectional area), length, and conductor material (copper or aluminium). Published resistance tables in BS 7671 and the IET On-Site Guide provide the resistance per metre for each conductor size. If the measured value significantly exceeds the expected value, this indicates a poor connection, damaged conductor, or incorrect cable size."
  },
  {
    id: 4,
    question: "During a ring final circuit continuity test, the technician measures the end-to-end resistance of the line conductor ring (L-L) as 0.8 Ω and the CPC ring (E-E) as 1.2 Ω. What would be the expected reading at the mid-point socket outlet after cross-connecting?",
    options: [
      "2.0 Ω",
      "Approximately 0.5 Ω (one quarter of the sum of L-L and E-E readings)",
      "0.8 Ω",
      "1.2 Ω"
    ],
    correctAnswer: 1,
    explanation: "After cross-connecting line to CPC at the distribution board, the reading at the approximate mid-point of the ring should be close to one quarter of the sum of the individual end-to-end readings: (0.8 + 1.2) / 4 = 0.5 Ω. This is because at the mid-point, you are measuring two parallel paths of equal resistance. This value represents the R1+R2 at the furthest point of the ring."
  },
  {
    id: 5,
    question: "What does a significantly higher-than-expected continuity reading indicate?",
    options: [
      "The cable is too short",
      "A high-resistance joint, loose connection, damaged conductor, or incorrect cable size in the circuit",
      "The test instrument battery is fully charged",
      "The circuit is correctly installed"
    ],
    correctAnswer: 1,
    explanation: "A reading significantly higher than the expected value (calculated from cable size and route length) indicates a problem: a high-resistance joint (poor termination), a loose connection (insufficient torque on a terminal), a damaged conductor (reduced cross-sectional area), or the use of a smaller cable size than specified. All of these conditions must be investigated and rectified."
  },
  {
    id: 6,
    question: "Before taking continuity measurements, the test leads should be:",
    options: [
      "Connected to the supply for calibration",
      "Nulled (zeroed) by short-circuiting them together and subtracting the lead resistance from subsequent readings",
      "Replaced with new leads before every test",
      "Tested at 500 V d.c. to check their insulation"
    ],
    correctAnswer: 1,
    explanation: "Test lead resistance can be significant — typically 0.01 to 0.05 Ω — and must be subtracted from readings to obtain accurate circuit resistance values. Most modern instruments have a null function that stores the lead resistance and automatically subtracts it. If the instrument does not have this function, the lead resistance must be measured and manually subtracted from each reading."
  },
  {
    id: 7,
    question: "In a TT earthing system, continuity testing of the circuit protective conductor:",
    options: [
      "Is not required because the earth electrode provides the return path",
      "Is still essential to verify a continuous path from each point in the circuit to the main earthing terminal, even though the return path to the source is via the earth",
      "Should be carried out at 1000 V d.c.",
      "Only needs to be done on circuits protected by RCDs"
    ],
    correctAnswer: 1,
    explanation: "In a TT system, continuity of the CPC from each point in the circuit to the main earthing terminal is still essential. The CPC must provide a low-resistance path to the earth electrode. While the earth fault return path is through the mass of earth (and Ze is typically much higher than in TN systems), the CPC within the installation must still be continuous for the RCD to detect the fault current."
  },
  {
    id: 8,
    question: "When testing the continuity of main and supplementary bonding conductors, the test verifies:",
    options: [
      "That the bonding conductor has sufficient insulation",
      "That there is a continuous, low-resistance connection between the main earthing terminal and each extraneous-conductive-part (gas, water, structural steelwork)",
      "That the bonding conductor can carry the full load current",
      "That the bonding conductor is the correct colour"
    ],
    correctAnswer: 1,
    explanation: "Bonding conductor continuity testing verifies that a continuous, low-resistance connection exists between the main earthing terminal and each extraneous-conductive-part that could introduce a potential from outside the electrical installation. This includes incoming gas and water pipes, structural steelwork, and other metallic services. The test ensures that these parts are maintained at or near earth potential to prevent dangerous touch voltages."
  },
  {
    id: 9,
    question: "A ring final circuit test reveals that the end-to-end resistance of the neutral ring is significantly different from the line ring, despite both being the same size cable. This suggests:",
    options: [
      "Normal variation that can be ignored",
      "A possible break in the neutral ring, an interconnection, or the neutral being connected to a different ring — further investigation is required",
      "The neutral cable is a different material",
      "The test instrument is faulty"
    ],
    correctAnswer: 1,
    explanation: "For a correctly wired ring using twin and earth cable, the line and neutral conductors are the same size and follow the same route, so their end-to-end resistances should be very similar (within measurement tolerance). A significant difference indicates a problem: a break in the ring, an interconnection with another circuit, or incorrect wiring. The circuit must be investigated before being returned to service."
  },
  {
    id: 10,
    question: "The R1+R2 value obtained from continuity testing is used to:",
    options: [
      "Calculate the cable voltage drop",
      "Determine the earth fault loop impedance at the furthest point of the circuit (Zs = Ze + R1+R2) and verify that the protective device will disconnect within the required time",
      "Select the correct fuse rating",
      "Calculate the power consumed by the circuit"
    ],
    correctAnswer: 1,
    explanation: "The R1+R2 value is added to the external earth fault loop impedance (Ze) to calculate the total earth fault loop impedance (Zs) at the furthest point of the circuit. This Zs value must not exceed the maximum permitted for the protective device type and rating, ensuring that sufficient fault current flows to operate the device within the disconnection time specified by BS 7671 (0.4 s for socket outlet circuits, 5 s for fixed equipment circuits in TN systems)."
  },
  {
    id: 11,
    question: "When testing a long cable run, the technician cannot reach both ends simultaneously. An acceptable method is:",
    options: [
      "Estimate the resistance based on the cable specification",
      "Use a temporary link (a known, measured length of conductor) at the far end to join the line and CPC, then test from the near end — recording and subtracting the link resistance",
      "Test only one conductor and double the result",
      "Use a higher test voltage to overcome the distance"
    ],
    correctAnswer: 1,
    explanation: "When both ends of a cable cannot be accessed simultaneously, a temporary link of known resistance can be connected at the far end to bridge between the line conductor and the CPC. The technician then tests from the near end. The measured value includes the link resistance, which must be subtracted to obtain the true R1+R2. This method is commonly used for long cable runs in large buildings."
  },
  {
    id: 12,
    question: "Why is the minimum test current of 200 mA specified for continuity testing?",
    options: [
      "To save battery power in the test instrument",
      "Because a lower test current may not detect high-resistance joints or poor connections that would be significant under fault conditions",
      "To match the typical RCD operating current",
      "Because 200 mA is the standard for all electrical tests"
    ],
    correctAnswer: 1,
    explanation: "A minimum test current of 200 mA is specified because high-resistance joints and poor connections may appear to have acceptable resistance when tested at very low currents, but their resistance increases significantly under the higher currents that flow during a fault. The 200 mA minimum ensures that such defective connections are detected during testing rather than causing a failure under fault conditions."
  }
];

const faqs = [
  {
    question: "What is the difference between continuity testing and insulation resistance testing?",
    answer: "Continuity testing checks that conductors that should be connected do provide a low-resistance path (e.g., the CPC from a socket outlet back to the distribution board). Insulation resistance testing checks that conductors that should be separated are adequately insulated from each other (e.g., line to earth). They are complementary tests — continuity confirms connection where needed; insulation resistance confirms separation where needed."
  },
  {
    question: "Can I use a standard multimeter for continuity testing?",
    answer: "A standard multimeter's continuity or resistance range may not deliver the minimum 200 mA test current required by BS 7671. While it can give an indication of continuity, it should not be used for formal testing and certification. A dedicated low-resistance ohmmeter (or multifunction tester with a dedicated continuity range) that meets BS EN 61557 is required for compliance with BS 7671."
  },
  {
    question: "What are acceptable continuity values?",
    answer: "There is no single 'acceptable' value — it depends on the cable size and length. For example, 1.0 mm² copper has a resistance of approximately 18.1 mΩ/m, so a 20 m run of 1.0 mm² cable would have a conductor resistance of approximately 0.36 Ω. The measured R1+R2 should be consistent with the expected value from published tables. Values significantly higher than expected indicate a problem."
  },
  {
    question: "Do I need to test every socket outlet on a ring final circuit?",
    answer: "Yes. After cross-connecting at the distribution board, every socket outlet on the ring must be tested. The readings should follow a predictable pattern: low values near the distribution board, rising to a maximum at the approximate mid-point of the ring, then falling again. An unexpectedly high or low reading at any socket indicates a wiring error, break, or interconnection that requires investigation."
  },
  {
    question: "How does conductor temperature affect continuity readings?",
    answer: "Conductor resistance increases with temperature — copper has a positive temperature coefficient of approximately 0.004 per °C. For most practical purposes in installation testing, ambient temperature variations have a relatively small effect on continuity readings. However, if testing a circuit that has been carrying load and the conductors are warm, the readings may be slightly higher than the published values, which are based on 20°C. For formal purposes, the temperature should be recorded."
  }
];

const MOETModule4Section5_2 = () => {
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
            <Link2 className="h-4 w-4" />
            <span>Module 4.5.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Continuity Testing
          </h1>
          <p className="text-white/80">
            Protective conductor continuity, ring final circuit testing, and R1+R2 measurements for electrical maintenance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Purpose:</strong> Verify low-resistance earth fault paths for protective device operation</li>
              <li className="pl-1"><strong>Instrument:</strong> Low-resistance ohmmeter, minimum 200 mA test current</li>
              <li className="pl-1"><strong>R1+R2:</strong> Combined line and CPC resistance, used to calculate Zs</li>
              <li className="pl-1"><strong>Ring circuits:</strong> Three-step test to verify continuity and correct wiring</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>When to test:</strong> Initial verification, periodic inspection, after repairs or modifications</li>
              <li className="pl-1"><strong>Critical for safety:</strong> Disconnection time depends on low-impedance fault path</li>
              <li className="pl-1"><strong>Common faults:</strong> Loose terminals, broken conductors, incorrect wiring</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to testing, verification, and fault diagnosis competencies</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain why continuity of protective conductors is essential for electrical safety",
              "Select and verify the correct test instrument for continuity testing",
              "Perform R1+R2 measurements on radial circuits and interpret the results",
              "Conduct the three-step ring final circuit continuity test procedure",
              "Test bonding conductors and interpret results against expected values",
              "Use R1+R2 values to calculate earth fault loop impedance (Zs) and verify disconnection times"
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
            Why Continuity Testing Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The safety of an electrical installation depends fundamentally on the integrity of its protective conductors. When a fault occurs — a line conductor contacting an earthed metal enclosure, for example — the fault current must flow through the circuit protective conductor (CPC) back to the source with sufficiently low impedance to operate the protective device (MCB, fuse, or RCD) within the maximum disconnection time specified by BS 7671. If the CPC is broken, has a high-resistance joint, or is missing entirely, the protective device may not operate, leaving exposed metalwork at a dangerous voltage.
            </p>
            <p>
              Continuity testing verifies that this critical fault current path is intact and has sufficiently low resistance. It is one of the most fundamental tests in electrical installation work, yet it is also one of the tests most commonly performed inadequately. A cursory "buzz test" with a basic multimeter may confirm that a connection exists, but it may not reveal a high-resistance joint that would impede fault current flow. BS 7671 therefore requires the use of a low-resistance ohmmeter delivering a minimum test current of 200 mA to ensure reliable detection of defective connections.
            </p>
            <p>
              For maintenance technicians, continuity testing is not limited to new installations. Every time a circuit is modified, extended, or repaired, the continuity of the protective conductors must be re-verified. Connections that were sound at installation can deteriorate over time due to thermal cycling, vibration, corrosion, or mechanical disturbance. Periodic inspection (EICR) includes continuity testing to detect such deterioration before it compromises safety.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Consequences of Failed Continuity</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Continuity Problem</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Safety Consequence</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Broken CPC</td>
                      <td className="border border-white/10 px-3 py-2">No earth fault path — exposed metalwork remains live during a fault until manually disconnected</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">High-resistance joint in CPC</td>
                      <td className="border border-white/10 px-3 py-2">Reduced fault current — protective device operates slowly or not at all, prolonging danger</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Missing bonding conductor</td>
                      <td className="border border-white/10 px-3 py-2">Extraneous metalwork not at earth potential — risk of electric shock from simultaneous contact</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Broken ring final circuit</td>
                      <td className="border border-white/10 px-3 py-2">Full load on one leg of the ring — cable overheating, increased fire risk, higher Zs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">A Preventable Incident</p>
              <p className="text-sm text-white">
                A common scenario in maintenance: a technician replaces a socket outlet and fails to reconnect the earth conductor securely. The circuit appears to work normally — lights and appliances function. However, if a line-to-earth fault occurs on an appliance connected to that socket, the fault current cannot return via the CPC, the MCB does not trip, and the metal casing of the appliance remains at 230 V. This is why continuity testing after every intervention is not optional — it is a safety-critical verification step.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Test Instruments and Preparation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The accuracy and reliability of continuity testing depends on using the correct instrument, properly prepared. BS 7671 and BS EN 61557 specify the requirements for instruments used in continuity testing, and understanding these requirements is essential for both practical competence and the ST1426 end-point assessment.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Instrument Requirements</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>Type:</strong> Low-resistance ohmmeter (often part of a multifunction installation tester)</li>
                  <li className="pl-1"><strong>Test current:</strong> Not less than 200 mA (as required by BS 7671)</li>
                  <li className="pl-1"><strong>No-load voltage:</strong> Between 4 V and 24 V d.c.</li>
                  <li className="pl-1"><strong>Resolution:</strong> Capable of measuring to 0.01 Ω for accurate readings on short runs</li>
                  <li className="pl-1"><strong>Compliance:</strong> Must comply with BS EN 61557-4 for resistance of earth connection and equipotential bonding</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Lead Nulling (Zeroing)</h3>
                <p className="text-sm text-white">
                  Test leads have their own resistance, which must be accounted for. Before taking measurements, short-circuit the test leads together and either use the instrument's null function to store the lead resistance (it will then be automatically subtracted from subsequent readings) or record the lead resistance and manually subtract it from each measurement. For long test leads (which may be needed in large buildings), the lead resistance can be significant — failing to account for it introduces a systematic error into every reading.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Test Preparation</h3>
                <p className="text-sm text-white">
                  Before testing, the circuit must be isolated, locked off, and proved dead. Disconnect the circuit from the distribution board to avoid parallel paths through other circuits or the earthing system that would give misleadingly low readings. Check that the instrument battery is adequate (low battery affects the test current and accuracy). Verify the instrument is within its calibration date. Have the circuit schedule and cable specification to hand so that measured values can be compared against expected values.
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
            R1+R2 Testing of Radial Circuits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              For radial circuits (those with a single cable run from the distribution board to the furthest point), the R1+R2 test is straightforward. The objective is to measure the combined resistance of the line conductor (R1) and the circuit protective conductor (R2) from the distribution board to the furthest point of the circuit. This value is then used to calculate the earth fault loop impedance at the furthest point.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Method 1 — Long Lead Method</h3>
              <p className="text-sm text-white mb-2">
                Connect a long test lead between the line conductor and the CPC at the furthest point of the circuit. At the distribution board, connect the instrument between the line conductor and CPC of the same circuit. The reading gives the R1+R2 directly (minus any lead resistance if the long lead is used as part of the measurement circuit).
              </p>
              <p className="text-sm text-white">
                This method is practical when the furthest point is accessible but may be inconvenient in large installations where the cable run is long and the route is not easily traced.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Method 2 — Temporary Link at Far End</h3>
              <p className="text-sm text-white mb-2">
                Place a temporary link (a short piece of conductor with known resistance) between the line and CPC at the furthest point. Measure from the distribution board end between the line conductor and CPC. The reading is R1+R2 plus the resistance of the link. Subtract the link resistance to obtain the true R1+R2.
              </p>
              <p className="text-sm text-white">
                This method requires two visits to the far end (to connect and disconnect the link) but avoids trailing long test leads through the building. It is particularly useful for circuits with concealed wiring.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Expected Values</h3>
              <p className="text-sm text-white mb-2">
                The expected R1+R2 value can be calculated from published conductor resistance tables:
              </p>
              <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                <li className="pl-1">1.0 mm² copper: R1 = 18.1 mΩ/m, R2 (1.0 mm² CPC) = 18.1 mΩ/m → R1+R2 = 36.2 mΩ/m</li>
                <li className="pl-1">2.5 mm² copper: R1 = 7.41 mΩ/m, R2 (1.5 mm² CPC) = 12.1 mΩ/m → R1+R2 = 19.51 mΩ/m</li>
                <li className="pl-1">4.0 mm² copper: R1 = 4.61 mΩ/m, R2 (1.5 mm² CPC) = 12.1 mΩ/m → R1+R2 = 16.71 mΩ/m</li>
              </ul>
              <p className="text-sm text-white mt-2">
                Multiply by the cable length in metres to get the expected R1+R2. Measured values should be close to the calculated value — significant deviations indicate a problem.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Ring Final Circuit Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ring final circuits require a specific three-step test procedure that goes beyond simple continuity verification. The test must confirm that each conductor forms a continuous ring, that no cross-connections or spurs have been incorrectly wired, and that the R1+R2 at every socket outlet is within acceptable limits. This is one of the most complex tests in electrical installation work and is frequently performed incorrectly.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 1 — End-to-End Resistance</h3>
                <p className="text-sm text-white">
                  At the distribution board, identify and separate both ends of each conductor (line, neutral, CPC). Measure the end-to-end resistance of each ring: L1 to L2, N1 to N2, E1 to E2. The line and neutral readings should be very similar (same size conductor, same route). The CPC reading may differ if it is a different size (e.g., 1.5 mm² CPC in a 2.5 mm² twin-and-earth cable). These readings confirm that each conductor forms a continuous ring and provide the baseline values for the subsequent steps.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 2 — Cross-Connection and Socket Testing (L-N)</h3>
                <p className="text-sm text-white">
                  Cross-connect the line conductors: connect L1 to N2 and N1 to L2 at the distribution board. Then measure between line and neutral at each socket outlet. The readings should be approximately equal at every socket — each being approximately one quarter of the sum of the individual end-to-end readings from Step 1. If a reading is substantially higher than expected, it indicates a break in the ring or an incorrectly wired spur. If a reading is substantially lower, it may indicate an interconnection with another circuit.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step 3 — Cross-Connection and Socket Testing (L-CPC)</h3>
                <p className="text-sm text-white">
                  Now cross-connect the line and CPC: connect L1 to E2 and E1 to L2 at the distribution board. Measure between line and CPC at each socket outlet. The reading at each socket gives the R1+R2 value for that point. The highest reading (typically at the mid-point of the ring) is the value recorded on the Schedule of Test Results as the R1+R2 for the ring circuit. As with Step 2, all readings should follow a predictable pattern — deviations indicate wiring errors.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Common Ring Circuit Faults Detected by This Test</p>
              <p className="text-sm text-white">
                The three-step test detects: broken rings (one or more conductors not forming a continuous loop), cross-connections (conductors from different rings connected together), figure-of-eight wiring (where the ring crosses over itself), and spurs incorrectly connected as part of the ring. These faults may not be apparent from visual inspection alone and would not be detected by a simple end-to-end continuity test.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Bonding Conductor Testing and Calculating Zs
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond circuit protective conductors, continuity testing extends to the bonding system — the main bonding conductors that connect extraneous-conductive-parts (gas pipes, water pipes, structural steelwork) to the main earthing terminal, and any supplementary bonding conductors in special locations. These conductors do not carry load current under normal conditions but are critical for maintaining equipotential conditions that prevent dangerous touch voltages.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Main Bonding Conductor Testing</p>
              <p className="text-sm text-white">
                Test the continuity between the main earthing terminal and each bonding connection point (gas meter, water meter, structural steel). The reading should be very low — typically less than 0.05 Ω for a short run of 10 mm² or 16 mm² bonding conductor. Higher readings indicate a poor connection at the bonding clamp or the main earthing terminal. Check that bonding clamps are of the correct type (BS 951), are tight, and are in good condition with no corrosion.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Using R1+R2 to Calculate Zs</h3>
              <p className="text-sm text-white mb-2">
                The R1+R2 value obtained from continuity testing is one of the two components of the earth fault loop impedance at the furthest point of the circuit:
              </p>
              <p className="text-sm text-white font-mono bg-white/5 p-2 rounded my-2">
                Zs = Ze + (R1+R2)
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ze:</strong> External earth fault loop impedance (measured at the origin of the installation with the main earth disconnected)</li>
                <li className="pl-1"><strong>R1+R2:</strong> From continuity testing (at the furthest point of the circuit)</li>
                <li className="pl-1"><strong>Zs:</strong> Must not exceed the maximum value published in BS 7671 for the protective device type and rating</li>
              </ul>
              <p className="text-sm text-white mt-2">
                Note: Published R1+R2 values are at 20°C. Under fault conditions, conductor temperature rises significantly, increasing resistance. BS 7671 accounts for this by applying a correction factor. The measured Zs during a live test should not exceed 80% of the maximum tabulated value to account for this temperature effect and supply impedance variations.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>ST1426 link:</strong> The ability to perform continuity testing, interpret results, and use them to verify protective device disconnection times is a core competency for the maintenance technician standard. You must demonstrate not just the practical skill of testing but also the understanding of why the test is done and how the results relate to the safety of the installation.
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
                <p className="font-medium text-white mb-1">Continuity Test Procedure</p>
                <ul className="space-y-0.5">
                  <li>1. Isolate, lock off, prove dead</li>
                  <li>2. Disconnect circuit from DB</li>
                  <li>3. Null test leads (zero lead resistance)</li>
                  <li>4. Test CPC end-to-end or R1+R2</li>
                  <li>5. Compare against expected values</li>
                  <li>6. Record results on Schedule of Test Results</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Ring Final Circuit Steps</p>
                <ul className="space-y-0.5">
                  <li>Step 1: End-to-end L-L, N-N, E-E</li>
                  <li>Step 2: Cross-connect L-N, test each socket</li>
                  <li>Step 3: Cross-connect L-E, test each socket</li>
                  <li>All readings should follow predictable pattern</li>
                  <li>Maximum R1+R2 at mid-point of ring</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section5-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Insulation Resistance Testing
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section5-3">
              Next: Earth Fault Loop Impedance Testing
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule4Section5_2;