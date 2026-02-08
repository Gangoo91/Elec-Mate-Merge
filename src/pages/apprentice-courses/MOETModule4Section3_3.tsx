import { ArrowLeft, Gauge, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Use of Electrical Test Instruments - MOET Module 4 Section 3.3";
const DESCRIPTION = "Selection and application of test equipment for fault diagnosis including multimeters, insulation resistance testers, clamp meters, oscilloscopes, and GS38 compliance for electrical maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "gs38-requirements",
    question: "Under GS38, which features must a voltage indicator have for safe use on low voltage systems?",
    options: [
      "A backlit display and auto-ranging capability",
      "Fused test leads with finger guards, a maximum tip exposure of 4 mm, and a proving unit or known supply for verification",
      "Bluetooth connectivity for remote monitoring",
      "A CE mark and instruction manual"
    ],
    correctIndex: 1,
    explanation: "GS38 requires voltage indicators to have fused test leads with shrouded connectors, finger guards or barriers on probes limiting exposed tip to 4 mm maximum, and the ability to be proved against a known source before and after use. These features prevent accidental contact with live parts and verify the instrument is functioning correctly."
  },
  {
    id: "insulation-resistance-test",
    question: "When performing an insulation resistance test on a 230 V circuit, the standard test voltage is:",
    options: [
      "230 V DC",
      "500 V DC",
      "1000 V DC",
      "250 V AC"
    ],
    correctIndex: 1,
    explanation: "For circuits rated up to 500 V (which includes standard 230 V single-phase and 400 V three-phase LV systems), BS 7671 Table 6.1 specifies a test voltage of 500 V DC. The minimum acceptable insulation resistance is 1 megohm (1 MΩ), although higher values are expected in healthy installations."
  },
  {
    id: "clamp-meter-use",
    question: "When using a clamp meter to measure current in a three-phase motor circuit, you must clamp around:",
    options: [
      "All three phase conductors together",
      "One individual phase conductor at a time",
      "The earth conductor only",
      "The supply cable including the armour"
    ],
    correctIndex: 1,
    explanation: "To measure the current in a single phase, the clamp must surround only that one conductor. If you clamp around all three phases together in a balanced circuit, the magnetic fields cancel and the reading will be zero (or close to zero). Measuring each phase individually also allows you to detect phase imbalance — a key diagnostic indicator."
  },
  {
    id: "multimeter-selection",
    question: "For fault finding on an industrial control panel operating at 415 V, the minimum CAT rating for your multimeter should be:",
    options: [
      "CAT I — protected electronic equipment",
      "CAT II — single-phase socket outlet level",
      "CAT III — distribution level (fixed installation)",
      "CAT IV — origin of supply"
    ],
    correctIndex: 2,
    explanation: "Industrial control panels are connected to the fixed installation wiring (distribution level), requiring a minimum of CAT III rated instruments. CAT III instruments are designed to withstand the higher prospective fault currents and voltage transients present at distribution level. Using an underrated instrument risks explosive failure during a fault."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The purpose of proving a voltage indicator before and after use (as required by GS38) is to:",
    options: [
      "Calibrate the instrument for the specific voltage",
      "Confirm the instrument is functioning correctly and that a 'dead' reading can be trusted",
      "Charge the internal battery",
      "Reset the instrument to factory settings"
    ],
    correctAnswer: 1,
    explanation: "Proving before use confirms the voltage indicator is working and will detect voltage if present. Proving after use confirms it was still working during the test. Without this verification, a 'dead' reading could be due to a faulty instrument — a potentially fatal error. This is the cornerstone of safe isolation procedure."
  },
  {
    id: 2,
    question: "An insulation resistance reading of 0.5 MΩ on a 230 V circuit indicates:",
    options: [
      "Excellent insulation — well above the minimum",
      "A pass — the circuit meets the minimum requirement",
      "A fail — the insulation resistance is below the minimum 1 MΩ required by BS 7671",
      "The reading is meaningless without a continuity test"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 Table 6.1 requires a minimum insulation resistance of 1 MΩ for circuits tested at 500 V DC. A reading of 0.5 MΩ is below this minimum and indicates degraded insulation that could lead to earth leakage, RCD tripping or eventual breakdown. The circuit should not be energised until the insulation fault is located and rectified."
  },
  {
    id: 3,
    question: "When measuring DC voltage with a multimeter, selecting the AC range will:",
    options: [
      "Give the same reading as the DC range",
      "Give a reading of zero or a misleading reading, potentially missing a DC voltage",
      "Damage the multimeter",
      "Automatically switch to the correct range"
    ],
    correctAnswer: 1,
    explanation: "A multimeter set to AC will not correctly measure DC voltage. True-RMS AC meters may display zero or a misleading low reading when measuring DC. This is a common cause of misdiagnosis — always verify you have selected the correct function (AC or DC) before taking a reading. On a variable speed drive output, for example, the voltage is neither pure AC nor pure DC."
  },
  {
    id: 4,
    question: "A continuity test on a cable shows 0.2 Ω on one core and OL (over limit / open circuit) on another. This indicates:",
    options: [
      "Both cores are healthy",
      "The first core is continuous and the second core has a break (open circuit)",
      "The multimeter needs new batteries",
      "The cable is too long to test"
    ],
    correctAnswer: 1,
    explanation: "A low resistance reading (0.2 Ω) confirms continuity — the conductor is intact. An OL (over-limit) reading means the resistance is effectively infinite, indicating an open circuit — the conductor is broken. This is a definitive diagnosis of a cable fault requiring repair or replacement."
  },
  {
    id: 5,
    question: "Before connecting an insulation resistance tester to a circuit, you must ensure:",
    options: [
      "The circuit is energised so the test is realistic",
      "The circuit is isolated, proved dead, and all sensitive electronic equipment is disconnected",
      "All loads are connected and operating",
      "The ambient temperature is exactly 20°C"
    ],
    correctAnswer: 1,
    explanation: "Insulation resistance testers apply a high DC test voltage (typically 250 V, 500 V, or 1000 V). The circuit must be isolated and proved dead to prevent injury. Sensitive electronic equipment (drives, PLCs, electronic controls, LED drivers) must be disconnected as the test voltage will damage them. Lamps and other loads should also be disconnected to avoid misleading low readings."
  },
  {
    id: 6,
    question: "An earth loop impedance test measures:",
    options: [
      "The resistance of the earth electrode only",
      "The total impedance of the earth fault loop from the point of test back to the supply transformer",
      "The insulation resistance between live conductors and earth",
      "The prospective fault current at the origin of the installation"
    ],
    correctAnswer: 1,
    explanation: "Earth loop impedance (Zs) is the total impedance of the earth fault current path: from the point of test, through the circuit protective conductor, back through the main earthing terminal, the supply company's earth return, and the transformer winding. This value determines whether protective devices will operate within the required disconnection time stated in BS 7671."
  },
  {
    id: 7,
    question: "A true-RMS multimeter is necessary when measuring:",
    options: [
      "Pure DC voltages only",
      "Distorted or non-sinusoidal AC waveforms, such as the output of a variable speed drive",
      "Battery voltage",
      "Continuity on a dead circuit"
    ],
    correctAnswer: 1,
    explanation: "True-RMS meters accurately measure the heating effect of any waveform, including distorted and non-sinusoidal signals. Average-responding meters (cheaper models) only read accurately on pure sine waves. Variable speed drive outputs, electronic lighting loads and switched-mode power supplies produce non-sinusoidal waveforms that require true-RMS measurement."
  },
  {
    id: 8,
    question: "When using a clamp meter on a single-phase circuit, clamping around both the line and neutral conductors together will read:",
    options: [
      "The full load current",
      "Double the load current",
      "Approximately zero (or the earth leakage current if present)",
      "The neutral current only"
    ],
    correctAnswer: 2,
    explanation: "In a healthy single-phase circuit, the current in the line conductor equals the current in the neutral conductor but flows in the opposite direction. When clamped together, the magnetic fields cancel, reading approximately zero. Any reading indicates an imbalance — earth leakage current flowing via the earth conductor. This technique is used to measure leakage current without disconnecting the circuit."
  },
  {
    id: 9,
    question: "The CAT (Category) rating of a test instrument relates to:",
    options: [
      "The accuracy of the instrument",
      "The overvoltage withstand capability appropriate to the measurement location in the installation",
      "The country of manufacture",
      "The warranty period"
    ],
    correctAnswer: 1,
    explanation: "CAT ratings define the transient overvoltage withstand capability. Higher CAT numbers indicate locations closer to the supply source where fault energy is greater: CAT I (protected equipment), CAT II (socket outlets), CAT III (distribution/fixed installation), CAT IV (origin of supply). Using an underrated instrument at a higher category location risks catastrophic failure during a transient event."
  },
  {
    id: 10,
    question: "During insulation resistance testing, a reading that starts high and gradually decreases over 60 seconds suggests:",
    options: [
      "Normal healthy insulation",
      "Moisture absorption in the insulation — the polarisation index indicates deterioration",
      "A short circuit",
      "The tester battery is low"
    ],
    correctAnswer: 1,
    explanation: "Healthy insulation typically shows a reading that stabilises or increases over time as the capacitive charging current diminishes. A reading that starts high but decreases suggests moisture or contamination in the insulation that is gradually providing a conductive path. The ratio of the 10-minute reading to the 1-minute reading (polarisation index) is used to assess insulation condition."
  },
  {
    id: 11,
    question: "A phase rotation meter is used during fault finding to verify:",
    options: [
      "The voltage between phases",
      "The correct phase sequence (L1-L2-L3) at the equipment terminals",
      "The insulation resistance of each phase",
      "The power factor of the load"
    ],
    correctAnswer: 1,
    explanation: "A phase rotation meter confirms the phase sequence at the point of measurement. Correct phase rotation is essential for three-phase motors (determines direction of rotation), three-phase rectifiers, and some electronic equipment. Phase reversal can occur after maintenance work where connections have been disturbed, causing motors to run backwards."
  },
  {
    id: 12,
    question: "When selecting test leads for a multimeter being used at distribution board level, the leads must comply with:",
    options: [
      "GS38 — with fused leads, finger guards and maximum 4 mm exposed tip",
      "BS 1363 — the standard for 13 A plugs",
      "BS EN 60529 — IP ratings for enclosures",
      "No specific standard applies to test leads"
    ],
    correctAnswer: 0,
    explanation: "GS38 (HSE Guidance Note) sets out the requirements for electrical test equipment for use on low voltage systems. Test leads must have fused connectors, finger guards limiting the accessible probe tip to 4 mm maximum, and be in good condition. Non-compliant test leads with long, exposed probes present a serious risk of short circuits and arc flash."
  }
];

const faqs = [
  {
    question: "Do I need to carry all of these test instruments on every job?",
    answer: "Not necessarily, but you should carry a core set for fault diagnosis: a GS38-compliant voltage indicator (two-pole tester), a multimeter (CAT III rated minimum), and an insulation resistance tester. A clamp meter is also highly useful and compact enough to carry routinely. Specialist instruments such as oscilloscopes, power quality analysers and thermal cameras are typically kept at the workshop and brought to site when needed."
  },
  {
    question: "How often should my test instruments be calibrated?",
    answer: "Industry best practice is annual calibration by an accredited laboratory (UKAS or equivalent). BS 7671 requires instruments used for verification testing to be calibrated. For fault-finding instruments used daily, some organisations calibrate every six months. Between calibrations, check instruments against a known reference regularly. Always check the calibration date before using an instrument for testing."
  },
  {
    question: "Can I use a non-contact voltage indicator (volt stick) instead of a two-pole tester for proving dead?",
    answer: "Non-contact voltage indicators (NCVIs) can give false readings — both false positives (indicating voltage when none is present) and false negatives (failing to detect voltage that is present). GS38 and HSG85 are clear that a two-pole voltage indicator tested before and after use is the only reliable method for proving dead. NCVIs may be used as an additional precaution but must never be relied upon as the sole means of verification."
  },
  {
    question: "What is the difference between a megohmmeter and a standard multimeter's resistance range for insulation testing?",
    answer: "A megohmmeter (insulation resistance tester) applies a controlled high DC voltage (typically 250 V, 500 V or 1000 V) and measures the resulting leakage current to calculate insulation resistance in megohms. A standard multimeter's resistance range uses a very low test voltage (typically less than 1 V) and cannot detect insulation weaknesses that only manifest at higher voltages. Only a megohmmeter can provide meaningful insulation resistance measurements."
  },
  {
    question: "Why do I need to understand CAT ratings? My company provides the instruments.",
    answer: "Even if your employer provides instruments, you have a personal duty under the Electricity at Work Regulations 1989 to take precautions against electrical danger. Using an instrument rated below the category of the measurement point is a hazard that you should be able to recognise and refuse. Understanding CAT ratings also helps you select the correct instrument when you have a choice, and ensures you do not use a CAT II rated workshop multimeter on a CAT III distribution board."
  },
  {
    question: "How does test instrument selection relate to ST1426?",
    answer: "ST1426 requires maintenance technicians to select and use appropriate test equipment for diagnostic purposes. This includes understanding the capabilities and limitations of different instruments, selecting the correct instrument for the measurement, interpreting readings accurately, and maintaining instruments in safe, calibrated condition. These competences are assessed in both the knowledge test and practical assessment elements of the End Point Assessment."
  }
];

const MOETModule4Section3_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section3">
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
            <Gauge className="h-4 w-4" />
            <span>Module 4.3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Use of Electrical Test Instruments
          </h1>
          <p className="text-white/80">
            Selection and application of test equipment for accurate and safe fault diagnosis
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>GS38:</strong> Two-pole tester with fused leads, 4 mm max tip, prove before/after</li>
              <li className="pl-1"><strong>Multimeter:</strong> CAT III minimum for distribution level, true-RMS for non-sinusoidal</li>
              <li className="pl-1"><strong>Insulation tester:</strong> 500 V DC for LV circuits, minimum 1 MΩ pass</li>
              <li className="pl-1"><strong>Clamp meter:</strong> Individual conductors for current, both together for leakage</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Technician Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Calibration:</strong> Annual minimum, check date before use</li>
              <li className="pl-1"><strong>CAT ratings:</strong> Match instrument to measurement location</li>
              <li className="pl-1"><strong>Lead condition:</strong> Inspect test leads before every use</li>
              <li className="pl-1"><strong>ST1426:</strong> Instrument selection and use assessed at EPA</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select appropriate test instruments for specific fault-finding tasks",
              "Apply GS38 requirements for safe use of voltage indicators",
              "Carry out insulation resistance, continuity and voltage measurements correctly",
              "Interpret test readings accurately and identify abnormal results",
              "Understand CAT ratings and their importance for personal safety",
              "Maintain and verify test instruments in accordance with industry standards"
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
            Voltage Indicators and GS38 Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The voltage indicator — commonly called a two-pole tester or volt stick (though the latter is a distinct device) — is the most safety-critical instrument a maintenance technician uses. Its primary purpose is proving dead: confirming that a circuit is not energised before work begins. An incorrect reading from this instrument can be fatal, which is why HSE Guidance Note GS38 sets out specific requirements for its construction and use.
            </p>
            <p>
              GS38 applies to all electrical test equipment used on low voltage systems (up to 1000 V AC / 1500 V DC). However, its requirements for voltage indicators are particularly stringent because of the life-safety implications. Every maintenance technician must understand and comply with GS38 — it is not optional guidance, and non-compliance is routinely cited in HSE enforcement actions following electrical incidents.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">GS38 Requirements for Voltage Indicators</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Test leads:</strong> Fused at the instrument end (typically 500 mA HRC fuse) with shrouded connectors that prevent accidental contact</li>
                <li className="pl-1"><strong>Probe tips:</strong> Maximum 4 mm of exposed conductive tip, with finger guards or barriers to prevent the user's fingers sliding onto the tip</li>
                <li className="pl-1"><strong>Lead length:</strong> As short as practicable, with substantial insulation and no damage or exposed conductors</li>
                <li className="pl-1"><strong>Proving:</strong> The instrument must be proved on a known live source (or proving unit) immediately before and after use to confirm it is functioning</li>
                <li className="pl-1"><strong>Condition:</strong> Inspect the instrument and leads before every use — cracked cases, damaged leads, corroded probes or low battery indicators all warrant withdrawal from service</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">The Prove-Test-Prove Sequence</p>
              <p className="text-sm text-white">
                The prove-test-prove sequence is non-negotiable. Before testing a circuit for the absence of voltage: (1) prove the voltage indicator on a known live source — it must indicate voltage; (2) test the circuit that should be dead — it should show no voltage; (3) prove the indicator again on the known source — it must still indicate voltage. If the indicator fails to detect voltage on the proving source at either stage, the instrument is faulty and the 'dead' reading cannot be trusted.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Two-Pole vs Non-Contact Voltage Indicators</p>
              <p className="text-sm text-white">
                A two-pole voltage indicator (such as a Fluke T6, Megger TPT420 or Martindale VT28) makes direct contact with conductors and provides a reliable measurement. A non-contact voltage indicator (NCVI or "volt stick") detects the electric field around a conductor without making contact. NCVIs are useful as an initial screening tool but are subject to false readings caused by induced voltages, capacitive coupling, screened cables and dead-front equipment. GS38 is clear: NCVIs must never be used as the sole means of proving dead.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Many experienced technicians have been seriously injured by trusting a non-contact voltage indicator that gave a false "dead" reading. Always confirm with a two-pole tester using the prove-test-prove sequence. This takes less than a minute and could save your life.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Multimeters and CAT Ratings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The digital multimeter is the most versatile diagnostic tool in the maintenance technician's kit. It can measure voltage (AC and DC), current, resistance, continuity, and — on more advanced models — capacitance, frequency, temperature and diode forward voltage. However, the multimeter is only as good as the user's understanding of its capabilities, limitations and safe operating parameters.
            </p>
            <p>
              Selecting the correct multimeter for a task involves more than just choosing the right measurement function. The instrument's CAT rating, accuracy, resolution and true-RMS capability all affect whether the reading you obtain is meaningful and whether using the instrument is safe. Understanding these parameters is essential for effective and safe fault diagnosis.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">CAT Ratings Explained</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Category</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Location</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Examples</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CAT I</td>
                      <td className="border border-white/10 px-3 py-2">Protected electronic equipment</td>
                      <td className="border border-white/10 px-3 py-2">Signal-level electronics, telecoms circuits, low-energy components</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CAT II</td>
                      <td className="border border-white/10 px-3 py-2">Single-phase socket outlet level</td>
                      <td className="border border-white/10 px-3 py-2">Appliance testing, socket outlets, portable equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CAT III</td>
                      <td className="border border-white/10 px-3 py-2">Distribution level (fixed installation)</td>
                      <td className="border border-white/10 px-3 py-2">Distribution boards, motor control centres, fixed wiring, industrial panels</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CAT IV</td>
                      <td className="border border-white/10 px-3 py-2">Origin of supply</td>
                      <td className="border border-white/10 px-3 py-2">Service heads, electricity meters, main switchgear, outdoor cables</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              The CAT rating defines the transient overvoltage withstand capability of the instrument. Closer to the supply source, the available fault energy is higher and voltage transients are more severe. A CAT III instrument at distribution board level can safely withstand the transient impulses that occur during a fault at that location. A CAT II instrument in the same location may fail catastrophically — potentially exploding in the user's hand — because it was not designed for that level of fault energy.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">True-RMS vs Average-Responding Meters</p>
              <p className="text-sm text-white mb-3">
                This distinction is critical for modern electrical systems. Average-responding meters are calibrated for pure sine waves only. If the waveform is distorted — as it is with variable speed drives, LED lighting, electronic ballasts and switched-mode power supplies — an average-responding meter will give an inaccurate reading.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>True-RMS:</strong> Calculates the actual heating effect of the waveform regardless of its shape — always accurate</li>
                <li className="pl-1"><strong>Average-responding:</strong> Measures the average value and multiplies by 1.11 (the form factor of a pure sine wave) — only accurate on pure sine waves</li>
                <li className="pl-1"><strong>Practical impact:</strong> An average-responding meter may under-read by 10 to 40 percent on distorted waveforms, potentially leading to incorrect diagnosis or dangerous underestimation of current</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Recommendation:</strong> For general maintenance fault finding, invest in a good quality CAT III or CAT IV rated true-RMS multimeter from a reputable manufacturer. It will give accurate readings in all situations and provide the safety margin needed for distribution-level work.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Insulation Resistance Testing for Fault Diagnosis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Insulation resistance testing is one of the most important diagnostic techniques for identifying degraded or failed insulation in cables, motors, transformers and other equipment. The test applies a controlled DC voltage and measures the leakage current through the insulation, expressing the result in megohms (MΩ). It can detect insulation problems long before they cause a fault, and is essential for diagnosing earth faults, RCD tripping and insulation breakdown.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Voltages and Minimum Values (BS 7671 Table 6.1)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Circuit Nominal Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Test Voltage (DC)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum Insulation Resistance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">SELV and PELV</td>
                      <td className="border border-white/10 px-3 py-2">250 V</td>
                      <td className="border border-white/10 px-3 py-2">0.5 MΩ</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Up to 500 V (including 230/400 V)</td>
                      <td className="border border-white/10 px-3 py-2">500 V</td>
                      <td className="border border-white/10 px-3 py-2">1.0 MΩ</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Above 500 V</td>
                      <td className="border border-white/10 px-3 py-2">1000 V</td>
                      <td className="border border-white/10 px-3 py-2">1.0 MΩ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              In practice, healthy insulation on a new installation typically reads in the hundreds of megohms or even gigohms. A reading at or near the 1 MΩ minimum is cause for investigation, even though it technically passes. When fault finding, the insulation resistance test is invaluable for locating earth faults, identifying water-damaged cables, and detecting insulation breakdown in motor windings.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Diagnostic Insulation Testing Techniques</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Phase-to-earth:</strong> Tests the insulation between each live conductor and the circuit protective conductor — locates earth faults</li>
                <li className="pl-1"><strong>Phase-to-phase:</strong> Tests insulation between live conductors — detects inter-phase insulation breakdown</li>
                <li className="pl-1"><strong>Phase-to-neutral:</strong> Tests insulation between line and neutral — useful for identifying faults in twin-and-earth cables</li>
                <li className="pl-1"><strong>Sectional testing:</strong> Isolate sections of the circuit progressively to narrow down the location of a fault — disconnect at junction boxes, accessories or distribution boards</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Protecting Sensitive Equipment</p>
              <p className="text-sm text-white">
                Before applying the insulation resistance test voltage, disconnect all electronic equipment that could be damaged by the 500 V DC test signal. This includes: variable speed drives, PLCs and their I/O modules, electronic relays, LED drivers, dimmer switches, RCDs with electronic components, smoke detectors, data and communications equipment. Failure to disconnect these devices will damage them and produce misleading test results.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Always discharge the circuit after an insulation resistance test. The test charges the cable capacitance to the test voltage, and this stored energy can deliver a significant shock if the conductors are touched immediately after testing. Most modern insulation testers have an automatic discharge function, but verify the voltage has dropped to zero before touching any conductors.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Clamp Meters, Oscilloscopes and Specialist Instruments
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond the core instruments, maintenance technicians have access to a range of specialist tools that provide diagnostic information impossible to obtain with a standard multimeter. The clamp meter, oscilloscope, power quality analyser, thermal imaging camera and cable locator each fill a specific diagnostic niche. Understanding when and how to use these instruments significantly expands your fault-finding capability.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Clamp Meters</p>
              <p className="text-sm text-white mb-3">
                The clamp meter measures current without breaking the circuit — the jaws clamp around a conductor and measure the magnetic field produced by the current flow. This makes it invaluable for live diagnostics where disconnecting the circuit would remove the fault condition.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Individual phase current:</strong> Clamp around one conductor to measure load current — compare phases to detect imbalance</li>
                <li className="pl-1"><strong>Earth leakage:</strong> Clamp around line and neutral together — any reading indicates leakage current to earth</li>
                <li className="pl-1"><strong>Motor starting current:</strong> Use the inrush/peak function to capture the starting current surge</li>
                <li className="pl-1"><strong>Harmonic current:</strong> True-RMS clamp meters with harmonic analysis can identify non-linear loads causing neutral overloading</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Oscilloscopes</p>
              <p className="text-sm text-white mb-3">
                For diagnosing waveform-related faults, nothing replaces an oscilloscope. While a multimeter gives you a single number (the RMS value), an oscilloscope shows you the complete waveform — its shape, timing, distortion, noise and transients. Portable digital storage oscilloscopes (DSOs) are now compact and affordable enough for field use.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>VSD output waveforms:</strong> Verify PWM switching patterns and identify misfiring IGBTs</li>
                <li className="pl-1"><strong>Voltage transients:</strong> Capture and measure voltage spikes that cause equipment malfunction</li>
                <li className="pl-1"><strong>Control signals:</strong> Analyse 4-20 mA loops, 0-10 V signals, and communication bus waveforms</li>
                <li className="pl-1"><strong>Timing analysis:</strong> Measure the timing of relay operations, sensor responses and sequential controls</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Power Quality Analysers</h3>
                <p className="text-sm text-white">
                  These instruments measure and record voltage, current, power, power factor, harmonics and transients over time. They are essential for diagnosing intermittent supply problems, harmonic distortion, voltage sags and swells, and power factor issues. Data logging capability allows them to capture events that occur only occasionally.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Thermal Imaging Cameras</h3>
                <p className="text-sm text-white">
                  Infrared cameras detect temperature differences across surfaces, identifying hot spots caused by loose connections, overloaded conductors, failing components and poor insulation. They can survey an entire distribution board in seconds without any physical contact or isolation, making them exceptionally efficient for preventive diagnostics.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> When using any test instrument, record the measurement conditions as well as the result. A motor current of 15 A is meaningless without context — what was the rated current, what load was the motor driving, what was the supply voltage? Always record the conditions alongside the reading.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Instrument Care, Calibration and Record Keeping
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Test instruments are precision measurement devices that require proper care and regular calibration to maintain accuracy and safety. An out-of-calibration instrument can give readings that are significantly wrong — leading to incorrect diagnoses, missed hazards and potentially dangerous decisions. Instrument management is not administrative overhead; it is a fundamental safety and quality requirement.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calibration Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Frequency:</strong> Annual calibration is the industry standard minimum. Instruments used heavily or in harsh environments may need more frequent calibration</li>
                <li className="pl-1"><strong>Standards:</strong> Calibration should be traceable to national standards (UKAS accreditation in the UK)</li>
                <li className="pl-1"><strong>Records:</strong> Maintain calibration certificates showing the date of calibration, the reference standards used, and the results (including any corrections applied)</li>
                <li className="pl-1"><strong>Labelling:</strong> Each instrument should carry a label showing the calibration date and the next due date</li>
                <li className="pl-1"><strong>Out-of-tolerance:</strong> If an instrument is found to be out of tolerance at calibration, all measurements taken since the last valid calibration may need to be reviewed</li>
              </ul>
            </div>

            <p>
              Between calibrations, regularly check your instruments against a known reference. A proving unit for voltage indicators, a decade resistance box for ohmmeters, and a known reference voltage for multimeters all provide quick confidence checks. Before every use, inspect the instrument and leads for physical damage, check the battery condition, and verify the calibration date.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recording Test Results</p>
              <p className="text-sm text-white mb-3">
                Every diagnostic measurement should be recorded contemporaneously — at the time it is taken, not from memory afterwards. Include:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">The measurement taken (what was being measured and where)</li>
                <li className="pl-1">The instrument used (make, model, serial number, calibration date)</li>
                <li className="pl-1">The reading obtained (with units)</li>
                <li className="pl-1">The expected or normal value for comparison</li>
                <li className="pl-1">The conditions at the time (load, temperature, humidity)</li>
                <li className="pl-1">Your interpretation of the result</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Well-maintained instruments and thorough record keeping are hallmarks of a professional maintenance technician. They demonstrate competence, support quality assurance, and provide evidence of compliance with BS 7671, the Electricity at Work Regulations 1989 and the ST1426 standard.
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
                <p className="font-medium text-white mb-1">Core Diagnostic Instruments</p>
                <ul className="space-y-0.5">
                  <li>Voltage indicator — GS38, prove-test-prove</li>
                  <li>Multimeter — CAT III+, true-RMS for non-sinusoidal</li>
                  <li>Insulation tester — 500 V DC for LV, min 1 MΩ</li>
                  <li>Clamp meter — individual conductors for current</li>
                  <li>Oscilloscope — waveform analysis, transients</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>GS38 — Test equipment requirements</li>
                  <li>BS 7671 Table 6.1 — IR test voltages and minima</li>
                  <li>BS EN 61010 — Safety of test instruments</li>
                  <li>EAWR 1989 Reg 14 — Live working controls</li>
                  <li>ST1426 — Instrument selection KSBs</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section3-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back: Systematic Diagnostic Approach
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section3-4">
              Next: Motor and Drive Faults
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule4Section3_3;
