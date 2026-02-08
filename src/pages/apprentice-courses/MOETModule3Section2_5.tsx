import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Motor Maintenance and Testing - MOET Module 3 Section 2.5";
const DESCRIPTION = "Comprehensive guide to motor maintenance and testing for electrical maintenance technicians: preventive maintenance schedules, insulation resistance testing, vibration analysis, thermographic surveys, bearing maintenance, motor testing procedures and fault diagnosis under ST1426.";

const quickCheckQuestions = [
  {
    id: "ir-test",
    question: "What is the minimum acceptable insulation resistance value for a low-voltage motor at operating temperature?",
    options: [
      "0.5 megohms",
      "1 megohm per kV of rated voltage, with a minimum of 1 megohm",
      "10 megohms",
      "100 kilohms"
    ],
    correctIndex: 1,
    explanation: "IEEE 43 recommends a minimum insulation resistance of 1 megohm per kV of rated voltage, with an absolute minimum of 1 megohm for low-voltage motors. For a 400 V motor, the minimum would therefore be 1 megohm. Values below this indicate deteriorated insulation requiring investigation. Trending values over time is more useful than single readings."
  },
  {
    id: "vibration-causes",
    question: "Which of the following is the most common cause of excessive vibration in an electric motor?",
    options: [
      "Electrical supply imbalance",
      "Misalignment between motor and driven equipment",
      "Incorrect paint colour",
      "Ambient temperature"
    ],
    correctIndex: 1,
    explanation: "Misalignment between the motor shaft and the driven equipment (pump, fan, gearbox) is the single most common cause of excessive vibration. Angular and parallel misalignment both cause characteristic vibration signatures. Laser alignment tools are used to achieve the tight tolerances required — typically within 0.05 mm."
  },
  {
    id: "bearing-grease",
    question: "What is the consequence of over-greasing a motor bearing?",
    options: [
      "The motor runs more quietly",
      "Excess grease generates heat, increases friction and can damage the bearing seal, leading to premature failure",
      "The bearing lasts longer",
      "There is no consequence"
    ],
    correctIndex: 1,
    explanation: "Over-greasing is a very common maintenance error. Excess grease generates heat through internal friction (churning), raises the bearing operating temperature, can damage the bearing seal allowing contaminants to enter, and in sealed bearings can cause the grease to break down. Always follow the manufacturer's specified grease quantity and re-greasing interval. A grease relief valve or calculated fill volume prevents over-greasing."
  },
  {
    id: "thermography",
    question: "What can an infrared thermographic survey reveal about motor condition?",
    options: [
      "The motor's efficiency rating",
      "Hot spots indicating bearing wear, winding faults, loose connections or cooling problems",
      "The motor's power factor",
      "The motor's age"
    ],
    correctIndex: 1,
    explanation: "Infrared thermography reveals temperature distribution across the motor, identifying hot spots that indicate developing faults: bearing overheating (early wear), winding hot spots (turn-to-turn faults), connection overheating (loose or corroded terminals), cooling blockages (blocked ventilation), and uneven frame temperature (rotor eccentricity). Thermography is non-contact and can be performed on running motors."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The purpose of a preventive maintenance programme for motors is:",
    options: [
      "To replace motors at fixed intervals regardless of condition",
      "To detect and correct developing faults before they cause unplanned failure, extending motor life and reducing downtime",
      "To satisfy insurance requirements only",
      "To keep maintenance technicians busy"
    ],
    correctAnswer: 1,
    explanation: "Preventive maintenance aims to detect developing faults early through scheduled inspections, testing and condition monitoring. This allows planned intervention before catastrophic failure, reducing unplanned downtime, extending motor life, and lowering overall maintenance costs. The alternative — run-to-failure — results in unexpected breakdowns, production losses and often more expensive emergency repairs."
  },
  {
    id: 2,
    question: "When performing an insulation resistance test on a motor, the test voltage for a 400 V rated motor should be:",
    options: [
      "230 V DC",
      "500 V DC",
      "1,000 V DC",
      "5,000 V DC"
    ],
    correctAnswer: 1,
    explanation: "For motors rated up to 1,000 V, the standard insulation resistance test voltage is 500 V DC. Higher test voltages (1,000 V or 2,500 V) are used for higher-voltage motors. Using too high a test voltage on a low-voltage motor can stress or damage the insulation. BS 7671 and IEEE 43 both specify appropriate test voltages for different motor ratings."
  },
  {
    id: 3,
    question: "A polarisation index (PI) test involves:",
    options: [
      "Measuring the supply voltage polarity",
      "Taking insulation resistance readings at 1 minute and 10 minutes and calculating the ratio",
      "Checking the motor rotation direction",
      "Measuring the magnetic field polarity"
    ],
    correctAnswer: 1,
    explanation: "The polarisation index is the ratio of the 10-minute insulation resistance reading to the 1-minute reading (PI = R10/R1). For healthy insulation, the PI should be greater than 2.0. A PI below 1.5 indicates contaminated or deteriorated insulation. The PI test is more informative than a single IR reading because it reveals the condition of the insulation bulk, not just its surface."
  },
  {
    id: 4,
    question: "Winding resistance measurement on a three-phase motor is used to detect:",
    options: [
      "Earth faults only",
      "Imbalance between phases indicating shorted turns, poor connections or winding damage",
      "The motor speed",
      "Supply voltage problems"
    ],
    correctAnswer: 1,
    explanation: "Winding resistance measurement compares the resistance of each phase winding. In a healthy motor, all three phases should have equal resistance within 1-2%. Significant imbalance indicates shorted turns (lower resistance on the affected phase), poor connections (higher resistance), or winding damage. A low-resistance ohmmeter (micro-ohmmeter) is used for accurate measurement."
  },
  {
    id: 5,
    question: "Motor bearing condition can be assessed using:",
    options: [
      "Visual inspection only",
      "Vibration analysis, temperature monitoring, ultrasonic testing and oil/grease analysis",
      "Insulation resistance testing",
      "Supply current measurement only"
    ],
    correctAnswer: 1,
    explanation: "Bearing condition is assessed using multiple techniques: vibration analysis (characteristic frequencies for each bearing fault type); temperature monitoring (thermography or contact probes); ultrasonic testing (detects high-frequency signals from bearing defects); and lubricant analysis (particles in grease or oil indicating wear). Using multiple techniques provides a more reliable assessment than any single method."
  },
  {
    id: 6,
    question: "The correct procedure before performing any maintenance on a motor is:",
    options: [
      "Switch off at the local isolator",
      "Carry out safe isolation: isolate, lock off, prove dead, and display warning notices",
      "Ask a colleague to watch the switch",
      "Just be careful"
    ],
    correctAnswer: 1,
    explanation: "Safe isolation is mandatory before any motor maintenance. The full procedure is: identify the correct supply; isolate at the appropriate point (MCC, local isolator or both); lock off with a personal padlock; prove dead at the motor terminals using a GS38-compliant voltage indicator tested before and after use; and display warning notices. This applies to all motor maintenance, including mechanical tasks on the driven equipment."
  },
  {
    id: 7,
    question: "Surge comparison testing on motor windings is used to detect:",
    options: [
      "Earth faults",
      "Turn-to-turn insulation faults that are not detected by standard IR testing",
      "Bearing wear",
      "Shaft alignment"
    ],
    correctAnswer: 1,
    explanation: "Surge comparison testing applies a high-frequency voltage pulse simultaneously to two windings and compares the reflected waveforms. If the windings are identical, the waveforms overlay perfectly. Turn-to-turn faults cause a difference in the waveforms (phase shift and amplitude change). This test detects developing inter-turn faults that standard 500 V insulation resistance testing cannot find."
  },
  {
    id: 8,
    question: "Motor current signature analysis (MCSA) can detect:",
    options: [
      "Only electrical supply problems",
      "Rotor bar defects, bearing faults, air gap eccentricity and mechanical load problems — all while the motor is running",
      "Only stator winding faults",
      "Only alignment problems"
    ],
    correctAnswer: 1,
    explanation: "Motor current signature analysis examines the frequency spectrum of the motor supply current while the motor is running under normal load. Specific fault types produce characteristic sidebands around the supply frequency: broken rotor bars, bearing defects, air gap eccentricity, and mechanical load variations. MCSA is a powerful non-intrusive online condition monitoring technique."
  },
  {
    id: 9,
    question: "How often should motor bearings typically be re-greased?",
    options: [
      "Every week",
      "According to the manufacturer's schedule, typically every 2,000-8,000 operating hours depending on size and speed",
      "Once per year regardless of run hours",
      "Only when the bearing makes noise"
    ],
    correctAnswer: 1,
    explanation: "Re-greasing intervals depend on bearing size, type, speed, temperature and environment. Typical intervals range from 2,000 to 8,000 operating hours. The manufacturer's data sheet provides the specific interval and grease quantity. Both under-greasing and over-greasing cause premature bearing failure. Automatic grease dispensers can improve reliability for critical motors."
  },
  {
    id: 10,
    question: "A motor draws significantly higher current on one phase than the other two. The most likely cause is:",
    options: [
      "Supply voltage imbalance",
      "All of the options listed could cause this symptom, but a stator winding fault (shorted turns) on that phase is the most likely motor-related cause",
      "A faulty ammeter",
      "Normal operation"
    ],
    correctAnswer: 1,
    explanation: "While supply voltage imbalance can cause current imbalance, a significant difference on one phase suggests a motor fault — most likely shorted turns in the stator winding on that phase. The reduced impedance of the shorted turns draws more current. However, always check the supply voltage balance first (using the NEMA standard: a 1% voltage imbalance can cause up to 6-10% current imbalance)."
  },
  {
    id: 11,
    question: "The dielectric absorption ratio (DAR) is:",
    options: [
      "The ratio of absorbed current to leakage current",
      "The ratio of the 60-second insulation resistance reading to the 30-second reading",
      "The ratio of DC resistance to AC impedance",
      "The ratio of stator resistance to rotor resistance"
    ],
    correctAnswer: 1,
    explanation: "The dielectric absorption ratio is R60/R30 — the 60-second insulation resistance reading divided by the 30-second reading. For healthy insulation, the DAR should be greater than 1.25. A DAR close to 1.0 indicates that the insulation is contaminated with moisture or conducting particles, as there is no dielectric absorption effect. The DAR is a quicker alternative to the full 10-minute PI test."
  },
  {
    id: 12,
    question: "When trending motor insulation resistance values over time, the most important indicator is:",
    options: [
      "The absolute value at each test",
      "The rate and direction of change — a steadily declining trend indicates deteriorating insulation requiring investigation",
      "The test voltage used",
      "The ambient temperature at the time of test"
    ],
    correctAnswer: 1,
    explanation: "While absolute values are important (below 1 megohm requires action), the trend over time is the most valuable indicator. A steadily declining trend — even if individual readings are still above minimum — indicates deteriorating insulation and allows planned maintenance before failure. All readings should be temperature-corrected to a common reference temperature (typically 40 degrees C) for valid comparison."
  }
];

const faqs = [
  {
    question: "How often should motor insulation resistance be tested?",
    answer: "The frequency depends on the motor's criticality and operating environment. For critical motors, test annually at minimum — many organisations test every six months. For non-critical motors, annual or biennial testing is typical. Motors in harsh environments (damp, dusty, hot, corrosive) should be tested more frequently. The most important thing is to establish a consistent testing schedule so that meaningful trends can be identified."
  },
  {
    question: "Can I perform insulation resistance testing on a motor connected to a VSD?",
    answer: "No — you must disconnect the motor cables from the VSD output terminals before performing insulation resistance testing. The 500 V DC test voltage will damage the VSD's IGBT output stage, varistors and other semiconductor components. Similarly, disconnect any surge protection devices, capacitors or electronic instruments connected to the motor circuit before testing."
  },
  {
    question: "What is the difference between preventive and predictive maintenance?",
    answer: "Preventive maintenance (PM) is time-based or usage-based — tasks are performed at fixed intervals regardless of equipment condition (e.g., re-grease bearings every 4,000 hours). Predictive maintenance (PdM) is condition-based — monitoring techniques (vibration analysis, thermography, oil analysis, MCSA) assess the actual condition and maintenance is performed only when the data indicates a developing fault. PdM avoids unnecessary work while catching problems earlier. Most effective programmes combine both approaches."
  },
  {
    question: "What personal protective equipment is required for motor testing?",
    answer: "PPE requirements depend on the specific test. For insulation resistance testing on an isolated motor: safety boots, appropriate clothing, and insulated gloves (if there is any risk of contact with energised parts). For vibration monitoring or thermography on running motors: all of the above plus hearing protection, eye protection, and awareness of rotating parts — do not wear loose clothing or jewellery. For motor circuit analysis on live systems: arc flash rated PPE appropriate to the incident energy level."
  },
  {
    question: "What causes a motor to run hot?",
    answer: "Common causes of motor overheating include: overload (drawing more current than rated); supply voltage imbalance (causes negative-sequence currents and additional rotor heating); blocked ventilation (dirty filters, obstructed cooling fins); high ambient temperature (above the motor's rated ambient); repeated starting (inrush current heats the windings); single-phasing (loss of one supply phase); and shorted turns in the stator winding. Investigate promptly — prolonged overheating degrades winding insulation and shortens motor life significantly."
  }
];

const MOETModule3Section2_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 3.2.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Motor Maintenance and Testing
          </h1>
          <p className="text-white/80">
            Preventive maintenance, testing procedures and fault diagnosis for electric motors
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>PM schedules:</strong> Time-based inspections, cleaning and lubrication</li>
              <li className="pl-1"><strong>IR testing:</strong> 500 V DC, minimum 1 megohm, trend over time</li>
              <li className="pl-1"><strong>Vibration:</strong> Detects misalignment, bearing wear, imbalance</li>
              <li className="pl-1"><strong>Thermography:</strong> Non-contact detection of hot spots and cooling issues</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Bearings:</strong> Most common motor failure point — grease correctly</li>
              <li className="pl-1"><strong>PI test:</strong> R10/R1 ratio reveals insulation bulk condition</li>
              <li className="pl-1"><strong>MCSA:</strong> Online detection of rotor faults without stopping</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to plant maintenance and condition monitoring KSBs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Develop a preventive maintenance schedule for electric motors",
              "Perform insulation resistance and polarisation index testing",
              "Interpret vibration analysis data to identify common motor faults",
              "Apply thermographic survey techniques to running motors",
              "Carry out bearing maintenance including correct re-greasing procedures",
              "Use motor current signature analysis for online condition monitoring"
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

        {/* Section 01: Preventive Maintenance Strategy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Preventive Maintenance Strategy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electric motors are the workhorses of industrial and commercial installations. They account for approximately 70% of industrial electricity consumption in the UK, and their reliability directly affects production output, safety and energy efficiency. A structured preventive maintenance programme is essential for maximising motor life and minimising unplanned downtime.
            </p>
            <p>
              Motor failures are rarely sudden — they develop over weeks or months, giving ample opportunity for detection through systematic inspection and testing. The most common failure modes are bearing degradation (approximately 50% of all motor failures), stator winding insulation breakdown (approximately 35%), and rotor faults (approximately 10%). A good maintenance programme addresses all three.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Preventive Maintenance Schedule</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Tasks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Monthly</td>
                      <td className="border border-white/10 px-3 py-2">Visual inspection, check for unusual noise/vibration/smell, check terminal box condition, verify cooling airflow, check mounting bolts</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Quarterly</td>
                      <td className="border border-white/10 px-3 py-2">Measure supply voltage and current (all three phases), check earth continuity, thermographic survey, vibration spot-check</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Annually</td>
                      <td className="border border-white/10 px-3 py-2">Insulation resistance test (500 V DC), winding resistance measurement, full vibration analysis, bearing re-greasing (or per manufacturer schedule), alignment check</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Major overhaul</td>
                      <td className="border border-white/10 px-3 py-2">Strip-down inspection, bearing replacement, rewind assessment, surge comparison test, dynamic balancing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Always perform safe isolation before any motor maintenance. Even mechanical tasks such as coupling alignment require the motor to be isolated, locked off and proved dead — the motor could be started remotely by a PLC or BMS if the supply is not securely isolated.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Insulation Resistance and Winding Tests */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Insulation Resistance and Winding Tests
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Insulation resistance (IR) testing is the most fundamental electrical test for motor condition assessment. It measures the resistance of the winding insulation to earth and between phases, detecting moisture ingress, contamination and insulation deterioration before a catastrophic failure occurs.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Insulation Resistance Testing Procedure</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Isolate and prove dead:</strong> Disconnect the motor from its supply and any connected electronic equipment (VSDs, soft starters, capacitors)</li>
                <li className="pl-1"><strong>Discharge:</strong> Ensure the winding is discharged before connecting the test instrument</li>
                <li className="pl-1"><strong>Connect:</strong> Test each phase winding to earth, and between phases</li>
                <li className="pl-1"><strong>Test voltage:</strong> 500 V DC for motors rated up to 1,000 V; 1,000 V DC for motors rated 1,001-2,500 V; 2,500 V or 5,000 V for higher-voltage motors</li>
                <li className="pl-1"><strong>Duration:</strong> Apply voltage for 1 minute (standard IR reading); extend to 10 minutes for PI test</li>
                <li className="pl-1"><strong>Record:</strong> Note the reading, ambient temperature, humidity and motor temperature</li>
                <li className="pl-1"><strong>Temperature correct:</strong> Correct all readings to a common reference temperature (40 degrees C) for valid trending</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Polarisation Index (PI) and Dielectric Absorption Ratio (DAR)</h3>
              <p className="text-sm text-white mb-3">
                The PI and DAR tests provide deeper insight into insulation condition than a simple IR reading. They measure how the insulation responds over time to the applied DC voltage — healthy insulation shows an increasing resistance as the dielectric absorbs charge, while contaminated insulation shows little change.
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Test</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Formula</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Good</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Investigate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DAR</td>
                      <td className="border border-white/10 px-3 py-2">R60s / R30s</td>
                      <td className="border border-white/10 px-3 py-2">&gt; 1.25</td>
                      <td className="border border-white/10 px-3 py-2">&lt; 1.1</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PI</td>
                      <td className="border border-white/10 px-3 py-2">R10min / R1min</td>
                      <td className="border border-white/10 px-3 py-2">&gt; 2.0</td>
                      <td className="border border-white/10 px-3 py-2">&lt; 1.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Winding Resistance Measurement</h3>
              <p className="text-sm text-white">
                Winding resistance measurement using a micro-ohmmeter compares the DC resistance of each phase winding. In a healthy three-phase motor, all three phases should be within 1-2% of each other. A significantly lower resistance on one phase indicates shorted turns; a higher resistance indicates a poor connection or a partially open winding. This test requires the motor to be isolated and disconnected.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Never perform insulation resistance testing on a motor connected to a VSD, soft starter or any electronic equipment. The 500 V DC test voltage will destroy semiconductor components. Always disconnect the motor cables at the VSD output terminals before testing.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Vibration Analysis and Thermography */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Vibration Analysis and Thermography
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Vibration analysis is the most powerful predictive maintenance tool for rotating machinery. Every motor has a characteristic vibration signature, and changes in this signature reveal developing faults long before they cause failure. Thermographic surveys complement vibration analysis by identifying temperature anomalies that indicate electrical or mechanical problems.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Vibration Fault Signatures</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Fault</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Vibration Characteristic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Imbalance</td>
                      <td className="border border-white/10 px-3 py-2">Dominant at 1x running speed, radial direction</td>
                      <td className="border border-white/10 px-3 py-2">1x RPM</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Misalignment</td>
                      <td className="border border-white/10 px-3 py-2">Dominant at 1x and 2x running speed, axial component</td>
                      <td className="border border-white/10 px-3 py-2">1x, 2x RPM</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Bearing defect</td>
                      <td className="border border-white/10 px-3 py-2">Characteristic bearing frequencies (BPFO, BPFI, BSF)</td>
                      <td className="border border-white/10 px-3 py-2">Bearing-specific</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Looseness</td>
                      <td className="border border-white/10 px-3 py-2">Sub-harmonics and harmonics of running speed</td>
                      <td className="border border-white/10 px-3 py-2">0.5x, 1x, 2x, 3x RPM</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical (rotor)</td>
                      <td className="border border-white/10 px-3 py-2">Sidebands at slip frequency around 1x RPM, disappears when power removed</td>
                      <td className="border border-white/10 px-3 py-2">1x RPM +/- slip</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Infrared Thermography for Motors</h3>
              <p className="text-sm text-white mb-3">
                Thermographic surveys provide a non-contact thermal image of the motor, revealing temperature distribution across the frame, bearings, terminal box and coupling. Surveys should be performed on motors running under normal load conditions for meaningful results.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Bearing hot spots:</strong> One bearing significantly hotter than the other indicates developing wear, over-greasing or lubrication failure</li>
                <li className="pl-1"><strong>Winding hot spots:</strong> Uneven frame temperature may indicate a winding fault or cooling blockage</li>
                <li className="pl-1"><strong>Terminal box:</strong> Hot connections indicate loose or corroded terminations — a fire and failure risk</li>
                <li className="pl-1"><strong>Cooling system:</strong> Blocked fins, dirty filters or failed fans show as elevated frame temperature</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Vibration data is most valuable when trended over time. Establish baseline readings when the motor is known to be in good condition, then compare subsequent readings against this baseline. ISO 10816 provides vibration severity classification for different motor types and sizes.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 04: Bearing Maintenance and Lubrication */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Bearing Maintenance and Lubrication
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Bearing failure is the single most common cause of motor failure, accounting for approximately 50% of all motor breakdowns. Proper lubrication is the most important factor in bearing life — and ironically, incorrect lubrication (particularly over-greasing) is one of the most common maintenance errors. Understanding correct bearing maintenance procedures is essential for every maintenance technician.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Correct Re-greasing Procedure</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Check the datasheet:</strong> Use only the grease type and quantity specified by the motor manufacturer</li>
                <li className="pl-1"><strong>Clean the grease nipple:</strong> Wipe clean before attaching the grease gun to prevent dirt ingress</li>
                <li className="pl-1"><strong>Open the drain plug:</strong> If fitted, open the grease drain plug to allow old grease to escape</li>
                <li className="pl-1"><strong>Add grease slowly:</strong> Use a hand-operated grease gun (not pneumatic) and pump slowly whilst the motor is running</li>
                <li className="pl-1"><strong>Correct quantity:</strong> Add only the specified amount — typically measured in grams, not number of pumps</li>
                <li className="pl-1"><strong>Run and check:</strong> Run the motor for 30 minutes after re-greasing, then check the bearing temperature has returned to normal</li>
                <li className="pl-1"><strong>Close drain:</strong> Close the drain plug after excess grease has been expelled</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Common Lubrication Errors</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Over-greasing:</strong> Forces grease past the bearing seal, generates excessive heat, and accelerates bearing wear — the most common error</li>
                <li className="pl-1"><strong>Wrong grease type:</strong> Mixing incompatible grease types causes the base oil to separate from the thickener, losing lubrication effectiveness</li>
                <li className="pl-1"><strong>Under-greasing:</strong> Metal-to-metal contact causes rapid wear and generates high-frequency noise</li>
                <li className="pl-1"><strong>Contamination:</strong> Dirt or moisture introduced during re-greasing causes abrasive wear</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> For sealed-for-life (2RS) bearings, no re-greasing is required or possible. These bearings must be replaced when they reach end of life, which is determined by operating hours, speed and temperature. Motors with sealed bearings are typically smaller frame sizes (up to approximately IEC 160).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Advanced Testing and Fault Diagnosis */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Advanced Testing and Fault Diagnosis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond basic insulation resistance testing, several advanced techniques allow maintenance technicians to detect specific fault types and assess motor condition more precisely. These techniques are increasingly used in condition-based maintenance programmes for critical motor assets.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Surge Comparison Testing</h3>
              <p className="text-sm text-white">
                Surge comparison testing applies a high-voltage, high-frequency pulse to two windings simultaneously and compares the reflected waveforms on an oscilloscope display. Identical windings produce identical overlapping waveforms. Turn-to-turn insulation faults cause a difference in inductance, resulting in a phase shift and amplitude change between the waveforms. This test detects developing inter-turn faults that standard 500 V insulation resistance testing cannot find — the turn-to-turn voltage stress during normal operation can be far higher than the test voltage between the winding and earth.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Motor Current Signature Analysis (MCSA)</h3>
              <p className="text-sm text-white mb-3">
                MCSA is a powerful online condition monitoring technique that analyses the frequency spectrum of the motor supply current while the motor is running under normal load. It requires no physical contact with the motor — only a current clamp on one supply phase. The technique can detect:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Broken rotor bars:</strong> Sidebands at +/- slip frequency around the supply frequency (50 Hz)</li>
                <li className="pl-1"><strong>Air gap eccentricity:</strong> Characteristic frequency patterns related to rotor slot passing frequency</li>
                <li className="pl-1"><strong>Bearing defects:</strong> Bearing characteristic frequencies modulated onto the supply current</li>
                <li className="pl-1"><strong>Mechanical load faults:</strong> Driven equipment problems (misalignment, gear mesh faults) reflected in the current spectrum</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Systematic Fault Diagnosis</h3>
              <p className="text-sm text-white mb-3">
                When a motor fault is reported, a systematic approach prevents wasted time and missed diagnoses. Work through the following sequence:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1 — Supply:</strong> Check all three phase voltages at the motor terminals; check for voltage imbalance (should be less than 2%)</li>
                <li className="pl-1"><strong>Step 2 — Current:</strong> Measure current on all three phases under load; compare with the nameplate full-load current</li>
                <li className="pl-1"><strong>Step 3 — Insulation:</strong> Isolate and test insulation resistance (all phases to earth, phase to phase)</li>
                <li className="pl-1"><strong>Step 4 — Winding resistance:</strong> Measure and compare all three phase winding resistances</li>
                <li className="pl-1"><strong>Step 5 — Mechanical:</strong> Check alignment, coupling condition, bearing noise and vibration</li>
                <li className="pl-1"><strong>Step 6 — Thermal:</strong> Thermographic survey to identify hot spots and temperature distribution</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians are expected to carry out condition monitoring activities, interpret test results, and make recommendations for corrective action. Understanding these testing techniques and their applications is a core competence requirement.
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
                <p className="font-medium text-white mb-1">Testing Methods</p>
                <ul className="space-y-0.5">
                  <li>IR test: 500 V DC, minimum 1 megohm (LV motors)</li>
                  <li>PI test: R10min / R1min, good if &gt; 2.0</li>
                  <li>DAR test: R60s / R30s, good if &gt; 1.25</li>
                  <li>Winding resistance: all phases within 1-2%</li>
                  <li>Surge comparison: detects turn-to-turn faults</li>
                  <li>MCSA: online detection of rotor and bearing faults</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Maintenance Essentials</p>
                <ul className="space-y-0.5">
                  <li>Safe isolation before all motor maintenance</li>
                  <li>Bearings = 50% of all motor failures</li>
                  <li>Re-grease per manufacturer schedule (2,000-8,000 hrs)</li>
                  <li>Disconnect VSD before insulation testing</li>
                  <li>Trend IR readings over time (temperature-corrected)</li>
                  <li>ISO 10816 vibration severity classification</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section2-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Prev: VSDs and Soft Starters
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module3-section2">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule3Section2_5;
