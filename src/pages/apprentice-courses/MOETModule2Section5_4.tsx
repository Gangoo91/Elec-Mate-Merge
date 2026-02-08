import { ArrowLeft, TestTube, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Test Equipment - MOET Module 2 Section 5.4";
const DESCRIPTION = "Comprehensive guide to electrical test equipment for maintenance technicians: multimeters, clamp meters, insulation resistance testers, loop impedance testers, RCD testers, GS38 compliance and safe testing practices.";

const quickCheckQuestions = [
  {
    id: "multimeter-safety",
    question: "Before using a multimeter to measure voltage on a live circuit, what must you check?",
    options: [
      "Only that the battery is charged",
      "That the meter is set to the correct voltage range (AC or DC), the test leads are in the correct sockets (not the current socket), the probes comply with GS38, and the meter category rating is appropriate for the circuit",
      "That the meter is the most expensive model available",
      "Nothing — modern multimeters are always safe to use"
    ],
    correctIndex: 1,
    explanation: "Before any live voltage measurement: (1) set the meter to the correct function (AC or DC voltage) and an appropriate range (or auto-range); (2) verify the test leads are plugged into the voltage/common sockets — not the current (A) socket, which has a low-impedance path that would create a short-circuit; (3) ensure the probes comply with GS38 (finger guards, limited exposed metal, fused leads); (4) check the meter's CAT rating matches or exceeds the installation category (e.g., CAT III for distribution boards, CAT IV for origin). A test lead in the wrong socket is a common cause of serious injury."
  },
  {
    id: "insulation-resistance",
    question: "What is the minimum acceptable insulation resistance value for a circuit up to 500 V according to BS 7671?",
    options: [
      "0.5 megohms",
      "1 megohm (1 MΩ), tested at 500 V DC — though in practice, healthy installations should read significantly higher",
      "10 megohms",
      "100 ohms"
    ],
    correctIndex: 1,
    explanation: "BS 7671 Table 6A specifies a minimum insulation resistance of 1 MΩ for circuits with a nominal voltage up to 500 V, tested at 500 V DC. For SELV and PELV circuits (up to 50 V), the minimum is 0.5 MΩ tested at 250 V DC. In practice, a new installation should give readings of 50 MΩ or more. Readings between 1 and 2 MΩ, while technically compliant, indicate deteriorating insulation that warrants investigation. Readings below 1 MΩ are non-compliant and the circuit must not be energised until the fault is found and rectified."
  },
  {
    id: "clamp-meter",
    question: "A clamp meter measures current by:",
    options: [
      "Making direct contact with the conductor",
      "Clamping around a single conductor and detecting the magnetic field produced by the current flowing through it — the circuit does not need to be broken",
      "Measuring the voltage drop across a known resistance",
      "Injecting a test current into the circuit"
    ],
    correctIndex: 1,
    explanation: "A clamp meter uses a split-core current transformer (for AC) or a Hall-effect sensor (for AC and DC) that clamps around a single conductor. The magnetic field produced by the current induces a proportional signal in the clamp, which the meter displays as a current reading. The key advantage is that the circuit does not need to be broken — the measurement can be made on a live, operating circuit. Only one conductor must be clamped at a time; clamping around a complete cable (line and neutral together) would give a reading of approximately zero as the magnetic fields cancel."
  },
  {
    id: "proving-unit",
    question: "Why must a voltage indicator be 'proved' before and after use with a proving unit?",
    options: [
      "It is a legal requirement to use a proving unit",
      "Proving before use confirms the indicator is working correctly (it will detect voltage); proving after use confirms it was still working when the 'dead' reading was taken — this eliminates the risk of relying on a faulty indicator that falsely shows 'dead'",
      "The proving unit charges the indicator's battery",
      "A proving unit is only needed for analogue meters"
    ],
    correctIndex: 1,
    explanation: "The prove-test-prove procedure is a fundamental electrical safety practice recommended by GS38 and required by safe working procedures. Before testing for voltage absence, the indicator is proved on a known live source (or proving unit) to confirm it detects voltage. The circuit under test is then tested. After testing, the indicator is proved again on the known source. If the indicator does not respond on the second prove, the 'dead' reading cannot be trusted — the indicator may have failed during the test. A proving unit provides a convenient, portable known-voltage source for this purpose."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The CAT (Category) rating on a multimeter indicates:",
    options: [
      "The country of manufacture",
      "The overvoltage protection category — higher CAT numbers indicate locations closer to the supply origin with higher prospective fault energy, requiring more robust protection",
      "The number of functions the meter has",
      "The battery type required"
    ],
    correctAnswer: 1,
    explanation: "IEC 61010-1 defines four measurement categories: CAT I (protected electronic equipment), CAT II (single-phase socket outlets), CAT III (distribution level — panels, busbars, fixed wiring), CAT IV (origin of installation — supply intake, meter). Higher categories have greater prospective fault energy, so instruments must withstand higher transient voltages. A CAT III 600 V meter can safely measure at distribution level up to 600 V. Always use a meter rated for the measurement category and voltage of the circuit being tested."
  },
  {
    id: 2,
    question: "When performing an insulation resistance test, the circuit under test must be:",
    options: [
      "Energised and under load",
      "Isolated from the supply, with all loads disconnected and all switches closed (to test the fixed wiring), and any electronic equipment or surge protection devices disconnected to prevent damage",
      "Connected to an RCD",
      "Tested with the supply on to check normal operation"
    ],
    correctAnswer: 1,
    explanation: "Insulation resistance testing applies a high DC voltage (250 V, 500 V or 1,000 V depending on the circuit voltage) between conductors and between conductors and earth. The circuit must be isolated from the mains supply and all loads disconnected — electronic equipment, lamps, appliances and SPDs can be damaged by the test voltage. All switches should be closed to include all wiring in the test. Two-way switching circuits need particular attention to ensure all wiring is tested. The megohmmeter applies the test voltage and measures the resulting leakage current to calculate the insulation resistance."
  },
  {
    id: 3,
    question: "A loop impedance tester measures:",
    options: [
      "The resistance of the cable insulation",
      "The total impedance of the earth fault loop path (Zs) — from the point of measurement, through the CPC back to the transformer, and returning via the line conductor — to verify that protective devices will operate within the required disconnection time",
      "The current flowing in the circuit",
      "The voltage at the socket outlet"
    ],
    correctAnswer: 1,
    explanation: "The earth fault loop impedance (Zs) is the total impedance of the complete fault current path: from the point of the fault, through the CPC to the main earthing terminal, through the earthing conductor to the means of earthing, through the supply earth return path to the transformer, and back through the line conductor to the point of the fault. A low Zs value means high fault current, which ensures the protective device (MCB, fuse, RCD) operates quickly enough to meet the disconnection times specified in BS 7671. The loop impedance tester injects a brief test current and measures the resulting voltage drop to calculate Zs."
  },
  {
    id: 4,
    question: "An RCD tester verifies that an RCD:",
    options: [
      "Is correctly wired",
      "Trips within the required time when a fault current of the rated sensitivity (e.g., 30 mA) is applied — tests at 50%, 100% and 500% (5x) of the rated residual current, plus ramp tests",
      "Has the correct voltage rating",
      "Is the correct physical size"
    ],
    correctAnswer: 1,
    explanation: "An RCD tester simulates earth leakage by passing a controlled test current between line and earth through the RCD. Standard tests include: 50% rated current (e.g., 15 mA for a 30 mA RCD) — the RCD must NOT trip; 100% rated current (30 mA) — must trip within 300 ms (or 200 ms for Type S); 5x rated current (150 mA) — must trip within 40 ms (non-delayed types). Additional tests include ramp testing (gradually increasing current to find the exact trip point) and testing on both positive and negative half-cycles. BS 7671 requires these tests during initial verification and periodic inspection."
  },
  {
    id: 5,
    question: "GS38 (HSE Guidance Note) specifies that test probes should have:",
    options: [
      "Long exposed metal tips for deep reach into terminals",
      "Finger barriers (guards), spring-loaded retractable tips with maximum 2-4 mm exposed metal, fused test leads, and clearly marked voltage and current ratings",
      "No metal parts at all",
      "Wooden handles for insulation"
    ],
    correctAnswer: 1,
    explanation: "GS38 'Electrical test equipment for use by electricians' recommends test probes with: finger guards (barriers) to prevent the hand sliding onto live parts; spring-loaded retractable tips exposing a maximum of 2 mm (ideally) to 4 mm of metal; fused test leads (typically 500 mA HRC fuse) to limit the energy released in a short-circuit; and clear markings showing voltage and current ratings. These features significantly reduce the risk of accidental short-circuits (which can cause explosive arc flash) and contact with live parts."
  },
  {
    id: 6,
    question: "A low-resistance ohmmeter (continuity tester) is used to verify:",
    options: [
      "Insulation resistance between conductors",
      "The continuity and resistance of protective conductors (R1+R2), bonding conductors, and ring final circuit conductors — confirming that the earth fault path is complete and has acceptably low resistance",
      "The supply voltage",
      "The current flowing in a circuit"
    ],
    correctAnswer: 1,
    explanation: "The low-resistance ohmmeter measures very small resistances (typically 0.01 to 99.99 ohms) at a test current of at least 200 mA (BS 7671 requirement). It is used for: continuity of protective conductors (R1+R2 at each point); continuity of main and supplementary bonding conductors; ring final circuit testing (end-to-end resistance, cross-connection verification); and continuity of equipotential bonding. The test leads must be zeroed before use (null the lead resistance) to ensure accurate readings."
  },
  {
    id: 7,
    question: "When measuring current with a clamp meter on a single-phase cable, you should clamp around:",
    options: [
      "The entire cable (all conductors together)",
      "A single conductor only (line or neutral) — clamping around both line and neutral together would give a reading of approximately zero because the currents flow in opposite directions and their magnetic fields cancel",
      "The earth conductor only",
      "Two cables at the same time for a combined reading"
    ],
    correctAnswer: 1,
    explanation: "In a single-phase circuit, the current flowing in the line conductor is equal and opposite to the current in the neutral (assuming no earth leakage). Clamping around both conductors together results in the magnetic fields cancelling, giving a reading near zero. To measure the load current, clamp around the line OR neutral conductor only. Note: clamping around all conductors and getting a non-zero reading actually indicates earth leakage current — this is the principle used by some leakage clamp meters for diagnostic purposes."
  },
  {
    id: 8,
    question: "A multifunction tester (MFT) typically combines which tests in a single instrument?",
    options: [
      "Only voltage and current measurement",
      "Continuity (low-resistance ohmmeter), insulation resistance, loop impedance (Zs), RCD testing, and often earth electrode resistance — all the tests required for BS 7671 initial verification and periodic inspection",
      "Only insulation resistance testing",
      "Only RCD testing"
    ],
    correctAnswer: 1,
    explanation: "The multifunction tester (MFT) is the primary test instrument for electrical installation testing to BS 7671. It combines: low-resistance ohmmeter for continuity (at 200 mA minimum); insulation resistance tester (megohmmeter) at 250 V, 500 V and 1,000 V DC; earth fault loop impedance (Zs and Ze); prospective fault current (PSCC/PEFC); RCD testing (trip time and trip current at 50%, 100%, 5x); and often earth electrode resistance. Having all functions in one calibrated instrument ensures consistent, traceable results."
  },
  {
    id: 9,
    question: "Test instruments used for BS 7671 verification must be:",
    options: [
      "The most expensive models available",
      "Calibrated to a traceable standard (typically annually), with current calibration certificates, and compliant with the relevant parts of BS EN 61557 for the specific test function",
      "Brand new — recalibration is not possible",
      "Only manufactured in the UK"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Regulation 643.1 requires that test instruments comply with the relevant parts of BS EN 61557. Instruments must be calibrated at intervals recommended by the manufacturer (typically annually) by a UKAS-accredited laboratory or equivalent. Calibration certificates must be retained and available for inspection. Using an out-of-calibration instrument invalidates all test results taken with it, which could invalidate an entire electrical installation certificate or periodic inspection report."
  },
  {
    id: 10,
    question: "When measuring voltage at a distribution board, the minimum meter CAT rating should be:",
    options: [
      "CAT I",
      "CAT III (distribution level) at the appropriate voltage rating — e.g., CAT III 600 V for a standard UK distribution board",
      "CAT II is always sufficient",
      "The CAT rating does not matter for voltage measurements"
    ],
    correctAnswer: 1,
    explanation: "Distribution boards, consumer units, sub-mains and fixed wiring are CAT III locations. Instruments used at these locations must be rated CAT III at the appropriate voltage (CAT III 300 V minimum for 230 V systems, CAT III 600 V provides additional margin). At the supply origin (meter, service head, main switch), CAT IV is required. Using a meter with an inadequate CAT rating at a location with high prospective fault energy risks explosive failure of the meter if a transient overvoltage occurs — this is a serious safety hazard."
  },
  {
    id: 11,
    question: "A non-contact voltage detector (voltage stick) is used for:",
    options: [
      "Accurate voltage measurement",
      "Quick preliminary detection of the presence or absence of AC voltage on cables and conductors — it does NOT replace a proper voltage indicator for confirming 'dead' before work begins",
      "Measuring insulation resistance",
      "Testing RCD operation"
    ],
    correctAnswer: 1,
    explanation: "Non-contact voltage detectors (NCVDs, 'voltage sticks') detect the electric field around an AC conductor without making contact. They are useful for quick identification of live cables, tracing circuits, and preliminary checks. However, they have significant limitations: they can give false negatives (fail to detect voltage) through screened cables, in metal conduit, or with certain cable configurations. They cannot detect DC. They must NEVER be relied upon as the sole means of confirming a circuit is dead — a proper two-pole voltage indicator (GS38 compliant), proved before and after use, is required."
  },
  {
    id: 12,
    question: "During periodic inspection and testing, the correct sequence of tests is:",
    options: [
      "Any order is acceptable",
      "Continuity of protective conductors first, then insulation resistance, then reconnect the supply for live tests: loop impedance, RCD testing, and prospective fault current",
      "Loop impedance first, then continuity last",
      "Only insulation resistance needs to be tested"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 specifies a logical test sequence: dead tests first (circuit isolated), then live tests (circuit energised). Dead tests: (1) continuity of protective conductors (R1+R2); (2) continuity of ring final circuit conductors; (3) insulation resistance. Then reconnect the supply for live tests: (4) polarity verification; (5) earth fault loop impedance (Zs); (6) prospective fault current (PSCC/PEFC); (7) RCD operation. This sequence ensures safety — the earth path is verified (continuity) and insulation is confirmed before the supply is reconnected for live tests."
  }
];

const faqs = [
  {
    question: "How often should test instruments be calibrated?",
    answer: "Most manufacturers and the IET recommend annual calibration for test instruments used for BS 7671 verification. Calibration must be performed by a UKAS-accredited laboratory or equivalent, and a calibration certificate must be issued showing the instrument's accuracy within specified tolerances. Some instruments may need more frequent calibration if subjected to heavy use, harsh conditions, or if dropped. Always check the calibration due date before using any test instrument — results from an out-of-calibration instrument are invalid."
  },
  {
    question: "Can I use a multimeter instead of a multifunction tester for installation testing?",
    answer: "A standard multimeter cannot perform all the tests required by BS 7671. It lacks the specific test functions (insulation resistance at 500 V DC, low-resistance ohmmeter at 200 mA, loop impedance, RCD testing) and does not comply with BS EN 61557. While a multimeter is useful for general fault-finding, voltage measurement and current measurement, a calibrated multifunction tester (MFT) is required for formal initial verification and periodic inspection testing."
  },
  {
    question: "What should I do if my insulation resistance readings are low but above 1 megohm?",
    answer: "Readings between 1 and 2 MΩ are technically compliant but indicate deteriorating insulation that warrants investigation. Common causes include moisture ingress, aged insulation, heat damage, contamination, or rodent damage to cable sheaths. Record the readings accurately, report the finding, and recommend further investigation or increased inspection frequency. Compare with previous test results if available — a declining trend is more concerning than a single low reading. The circuit is currently safe but should be monitored."
  },
  {
    question: "Why do I need different test instruments when an MFT does everything?",
    answer: "While an MFT covers the BS 7671 verification tests, additional instruments are valuable for maintenance and fault-finding: a clamp meter for measuring load current without breaking circuits; a thermal imaging camera for identifying hot connections and overloaded cables; a power quality analyser for investigating voltage disturbances; a non-contact voltage detector for quick live/dead identification; and a voltage indicator (two-pole tester) for confirming dead before work. Each instrument has a specific role that complements the MFT."
  },
  {
    question: "How do I test a three-phase distribution board safely?",
    answer: "Three-phase testing requires additional care: confirm all three phases plus neutral are isolated and locked off; prove your voltage indicator on a known source; test between all phase combinations (L1-L2, L2-L3, L1-L3, L1-N, L2-N, L3-N, and each to earth) before confirming dead; use instruments rated CAT III 600 V minimum; be aware that 400 V is present between phases even though each phase-to-neutral is 230 V. During live testing (loop impedance, RCD), test each phase circuit individually, being aware of the increased shock risk from higher inter-phase voltages."
  },
  {
    question: "What is the difference between Ze and Zs readings?",
    answer: "Ze (external earth fault loop impedance) is measured at the origin of the installation with the main earthing conductor disconnected — it represents the impedance of the supply earth path external to the installation (distribution network operator's responsibility). Zs (total earth fault loop impedance) is measured at each point in the installation with the installation's earthing system connected — it includes Ze plus the impedance of the circuit's line conductor (R1) and protective conductor (R2). The relationship is Zs = Ze + (R1+R2). Both values must be within the limits specified in BS 7671 for the protective device to disconnect within the required time."
  }
];

const MOETModule2Section5_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <TestTube className="h-4 w-4" />
            <span>Module 2.5.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Test Equipment
          </h1>
          <p className="text-white/80">
            Multimeters, clamp meters, insulation testers and multifunction testers for maintenance work
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>MFT:</strong> Multifunction tester — the core instrument for BS 7671 testing</li>
              <li className="pl-1"><strong>GS38:</strong> Test probe safety — finger guards, limited tip exposure, fused leads</li>
              <li className="pl-1"><strong>CAT rating:</strong> Match the meter category to the measurement location</li>
              <li className="pl-1"><strong>Prove-test-prove:</strong> Always verify your instrument works before and after</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Verification:</strong> Periodic inspection and testing requires calibrated instruments</li>
              <li className="pl-1"><strong>Fault-finding:</strong> Correct use of test equipment locates faults efficiently</li>
              <li className="pl-1"><strong>Safety:</strong> Improper use of test equipment is a major cause of injury</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to testing, inspection and diagnostic skills KSBs</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the key test instruments used for BS 7671 verification and maintenance fault-finding",
              "Understand measurement category (CAT) ratings and select instruments appropriate for the location",
              "Apply the prove-test-prove procedure and GS38 requirements for safe electrical testing",
              "Perform insulation resistance, continuity, loop impedance and RCD tests correctly",
              "Use clamp meters for non-invasive current measurement on live circuits",
              "Maintain test instruments including calibration, lead inspection and safe storage"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Multimeters, Voltage Indicators and Safe Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The multimeter is the most frequently used test instrument in electrical maintenance.
              A digital multimeter (DMM) measures voltage (AC and DC), current, resistance, and often
              additional parameters such as capacitance, frequency and temperature. However, a
              multimeter is one of the most dangerous instruments if used incorrectly — particularly
              when measuring voltage on live circuits.
            </p>
            <p>
              The measurement category (CAT) rating is the most important safety specification on any
              meter. It defines the maximum transient overvoltage the meter can safely withstand at
              each measurement location. Using a meter at a location exceeding its CAT rating risks
              explosive failure during a transient event.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Measurement Categories</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Location</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CAT I</td>
                      <td className="border border-white/10 px-3 py-2">Protected electronic equipment</td>
                      <td className="border border-white/10 px-3 py-2">Signal levels, telecom circuits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CAT II</td>
                      <td className="border border-white/10 px-3 py-2">Single-phase receptacle level</td>
                      <td className="border border-white/10 px-3 py-2">Socket outlets, appliance testing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CAT III</td>
                      <td className="border border-white/10 px-3 py-2">Distribution level</td>
                      <td className="border border-white/10 px-3 py-2">Distribution boards, sub-mains, fixed wiring</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CAT IV</td>
                      <td className="border border-white/10 px-3 py-2">Origin of installation</td>
                      <td className="border border-white/10 px-3 py-2">Service head, meter, main switch</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">GS38 Test Probe Requirements</p>
              <p className="text-sm text-white">
                HSE Guidance Note GS38 specifies that test probes must have finger barriers (guards)
                to prevent the hand sliding onto live parts, spring-loaded retractable tips with a
                maximum of 2-4 mm exposed metal, and fused test leads (typically 500 mA HRC fuse).
                Standard multimeter probes with long exposed tips do NOT comply with GS38 and must
                be replaced with compliant probes or fitted with shrouded adaptors before use on
                electrical installations.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Prove-test-prove:</strong> Before testing for the absence of voltage, prove
              your voltage indicator on a known live source (or proving unit). Test the circuit.
              Prove the indicator again on the known source. If the indicator fails the second prove,
              the "dead" reading cannot be trusted. This three-step procedure is non-negotiable.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Insulation Resistance Testers (Megohmmeters)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The insulation resistance tester (megohmmeter, "megger") applies a high DC voltage
              between conductors (or between conductors and earth) and measures the extremely small
              leakage current that flows through the insulation. The result is expressed in megohms
              (MΩ) — a measure of how effectively the insulation prevents current leakage.
            </p>
            <p>
              This is one of the most important tests in electrical maintenance. Good insulation
              resistance confirms that the cable insulation, accessory insulation and equipment
              insulation are intact and providing effective separation between live conductors and
              earth. Deteriorating insulation is a precursor to earth faults, short-circuits,
              electric shock and fire.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Insulation Resistance Requirements (Table 6A)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Circuit Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Test Voltage (DC)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum IR</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SELV / PELV</td>
                      <td className="border border-white/10 px-3 py-2">250 V</td>
                      <td className="border border-white/10 px-3 py-2">0.5 MΩ</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Up to 500 V (incl. 230 V)</td>
                      <td className="border border-white/10 px-3 py-2">500 V</td>
                      <td className="border border-white/10 px-3 py-2">1.0 MΩ</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Above 500 V</td>
                      <td className="border border-white/10 px-3 py-2">1,000 V</td>
                      <td className="border border-white/10 px-3 py-2">1.0 MΩ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Test Procedure</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Isolate the circuit from the mains supply and verify dead</li>
                  <li className="pl-1">Disconnect all loads, electronic equipment and surge protection devices</li>
                  <li className="pl-1">Close all switches to include all fixed wiring in the test</li>
                  <li className="pl-1">Test between line and neutral (L-N), line and earth (L-E), and neutral and earth (N-E)</li>
                  <li className="pl-1">Record the lowest reading — all must be above the minimum</li>
                  <li className="pl-1">Discharge the cable capacitance safely after testing (the megohmmeter stores charge)</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Warning:</strong> The 500 V DC test voltage can damage electronic equipment,
              LED drivers, SPDs, dimmer switches and other sensitive components. These must be
              disconnected before testing. If in doubt about any connected equipment, disconnect it
              before applying the insulation resistance test.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Clamp Meters and Current Measurement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The clamp meter is an essential diagnostic tool for maintenance technicians. It allows
              current measurement on a live, operating circuit without breaking the circuit or
              disconnecting any conductors. This non-invasive measurement capability makes it
              invaluable for load monitoring, fault diagnosis, and verifying circuit operation.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">AC Current Clamp (CT Type)</h3>
                <p className="text-sm text-white">
                  Uses a split-core current transformer around the conductor. The alternating magnetic
                  field induces a proportional current in the clamp winding. AC-only clamp meters are
                  common and adequate for most maintenance tasks. They measure the RMS (root mean square)
                  current. True-RMS meters provide accurate readings on distorted waveforms (common with
                  electronic loads, VFDs, LED drivers). Average-responding meters may give inaccurate
                  readings on non-sinusoidal currents.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">DC Current Clamp (Hall-Effect)</h3>
                <p className="text-sm text-white">
                  Uses a Hall-effect sensor to detect both AC and DC magnetic fields. More expensive
                  than CT-type clamps but essential for measuring DC circuits (solar PV, battery systems,
                  DC drives). The Hall-effect sensor requires a battery to operate and must be zeroed
                  before each measurement to compensate for residual magnetism in the clamp jaws.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Leakage Clamp Meter</h3>
                <p className="text-sm text-white">
                  A specialised high-sensitivity clamp meter designed to measure very small currents
                  (typically 0.001 to 100 mA). Used for measuring earth leakage current by clamping
                  around all the circuit conductors (line + neutral) together — any current not returning
                  through the neutral is leaking to earth. Invaluable for diagnosing nuisance RCD
                  tripping caused by cumulative leakage from multiple circuits.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> When measuring current in a distribution board, it may
              not be possible to separate individual conductors to clamp around a single one. Many
              clamp meters have a flexible (Rogowski) coil accessory that can be threaded around
              conductors in tight spaces. Alternatively, use a purpose-made current monitoring
              system for permanent or semi-permanent load monitoring.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Multifunction Testers, Loop and RCD Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The multifunction tester (MFT) is the primary instrument for BS 7671 initial verification
              and periodic inspection. It combines all the mandatory test functions in a single,
              calibrated instrument: continuity, insulation resistance, loop impedance, RCD testing,
              and prospective fault current measurement.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MFT Test Functions</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Test</th>
                      <th className="border border-white/10 px-3 py-2 text-left">What It Measures</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Key Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Continuity (R1+R2)</td>
                      <td className="border border-white/10 px-3 py-2">Protective conductor resistance</td>
                      <td className="border border-white/10 px-3 py-2">200 mA minimum test current</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Insulation resistance</td>
                      <td className="border border-white/10 px-3 py-2">Insulation integrity (MΩ)</td>
                      <td className="border border-white/10 px-3 py-2">500 V DC test voltage (up to 500 V circuits)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Loop impedance (Zs)</td>
                      <td className="border border-white/10 px-3 py-2">Earth fault loop impedance</td>
                      <td className="border border-white/10 px-3 py-2">Must be within BS 7671 limits</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PFC / PSCC</td>
                      <td className="border border-white/10 px-3 py-2">Prospective fault current</td>
                      <td className="border border-white/10 px-3 py-2">Must not exceed device breaking capacity</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RCD test</td>
                      <td className="border border-white/10 px-3 py-2">Trip time and sensitivity</td>
                      <td className="border border-white/10 px-3 py-2">Must trip within BS 7671 time limits</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              Loop impedance testing verifies that the earth fault path has sufficiently low impedance
              for the protective device to operate within the required disconnection time. The MFT
              injects a brief test current and measures the resulting voltage drop to calculate the
              impedance. For a 32 A Type B MCB, the maximum Zs at the furthest point of the circuit
              must not exceed 1.37 ohms (BS 7671 Table 41.3). Higher impedance means lower fault
              current, which means slower disconnection — potentially dangerously slow.
            </p>

            <p>
              RCD testing verifies that the residual current device operates at the correct sensitivity
              and within the required time. The MFT passes a controlled test current through the RCD
              between line and earth. Standard tests include 50% of rated current (must NOT trip),
              100% (must trip within 300 ms), and 5&times; rated current (must trip within 40 ms for
              non-delayed types).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Instrument Care, Calibration and Records
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Test instruments are precision measuring devices that require proper care, regular
              calibration, and systematic record-keeping. The accuracy of every test result —
              and the validity of every electrical installation certificate or periodic inspection
              report — depends on the instruments being in good condition and within their
              calibration period.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Instrument Maintenance Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Calibration:</strong> Check calibration date before every use. Arrange annual calibration through a UKAS-accredited laboratory. Retain all calibration certificates.</li>
                <li className="pl-1"><strong>Test leads:</strong> Inspect leads before every use for damage, fraying, cracked insulation, loose connections. Replace damaged leads immediately — never repair them.</li>
                <li className="pl-1"><strong>Probes:</strong> Verify GS38 compliance — finger guards present, tip shrouds intact, fuse in-place and correct rating.</li>
                <li className="pl-1"><strong>Battery:</strong> Check battery condition — low battery can give inaccurate readings. Replace batteries as recommended by the manufacturer.</li>
                <li className="pl-1"><strong>Zeroing:</strong> Zero the continuity function leads before testing (null the lead resistance). Zero the clamp meter before each measurement session.</li>
                <li className="pl-1"><strong>Storage:</strong> Store in the manufacturer's case, clean and dry. Protect from impact, extreme temperatures and moisture.</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Standards for Test Instruments</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>BS EN 61557:</strong> Defines requirements for each type of test instrument used for BS 7671 verification</li>
                <li className="pl-1"><strong>IEC 61010-1:</strong> Safety requirements for electrical equipment for measurement — defines CAT ratings</li>
                <li className="pl-1"><strong>GS38:</strong> HSE guidance on electrical test equipment safety — probe and lead requirements</li>
                <li className="pl-1"><strong>BS 7671 Regulation 643.1:</strong> Requires instruments to comply with BS EN 61557</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Professional practice:</strong> Record the make, model and serial number of
              every test instrument used on each job, along with the calibration due date. This
              information should appear on the electrical installation certificate or condition
              report. If a calibration check later reveals an instrument was out of tolerance,
              all results taken with that instrument during the affected period may need to be
              repeated.
            </p>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

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

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Essential Test Instruments</p>
                <ul className="space-y-0.5">
                  <li>Multifunction tester (MFT) — all BS 7671 tests</li>
                  <li>Two-pole voltage indicator — proving dead</li>
                  <li>Proving unit — prove-test-prove procedure</li>
                  <li>Clamp meter — non-invasive current measurement</li>
                  <li>Non-contact voltage detector — preliminary checks</li>
                  <li>Thermal imaging camera — hot spot detection</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>BS EN 61557 — Test instrument requirements</li>
                  <li>IEC 61010-1 — CAT ratings and safety</li>
                  <li>GS38 — Test probe and lead safety</li>
                  <li>BS 7671 Chapter 64 — Initial verification</li>
                  <li>BS 7671 Chapter 65 — Periodic inspection</li>
                  <li>BS 7671 Table 6A — IR test voltages and limits</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section5-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Power Tools
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2">
              Complete Module 2
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default MOETModule2Section5_4;
