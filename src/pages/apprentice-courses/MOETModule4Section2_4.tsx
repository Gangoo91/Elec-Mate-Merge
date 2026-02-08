import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Insulation Resistance Testing - MOET Module 4.2.4";
const DESCRIPTION = "Insulation resistance testing methods, test voltages, equipment selection, interpreting results, BS 7671 minimum values, polarisation index, step voltage testing and condition monitoring for electrical maintenance technicians.";

const quickCheckQuestions = [
  {
    id: "ir-test-voltage",
    question: "For a 400 V three-phase motor circuit, what DC test voltage should be applied during an insulation resistance test to BS 7671?",
    options: [
      "250 V DC",
      "500 V DC",
      "1000 V DC",
      "5000 V DC"
    ],
    correctIndex: 1,
    explanation: "BS 7671 Table 6.1 specifies a 500 V DC test voltage for circuits rated up to 500 V AC. A 400 V three-phase circuit falls within this range. Using too high a test voltage risks damaging insulation, while too low a voltage may not detect deterioration."
  },
  {
    id: "ir-minimum-value",
    question: "What is the minimum acceptable insulation resistance value for a 230 V circuit under BS 7671?",
    options: [
      "0.5 megohms",
      "1.0 megohms",
      "2.0 megohms",
      "10 megohms"
    ],
    correctIndex: 1,
    explanation: "BS 7671 Regulation 612.3 specifies a minimum insulation resistance of 1.0 megohm for circuits rated up to 500 V tested at 500 V DC. While 1.0 megohm is the absolute minimum for compliance, healthy insulation on new installations should read considerably higher — typically 100 megohms or more."
  },
  {
    id: "ir-temperature-effect",
    question: "How does temperature affect insulation resistance readings?",
    options: [
      "Higher temperature increases insulation resistance",
      "Temperature has no effect on insulation resistance",
      "Higher temperature decreases insulation resistance — readings roughly halve for every 10 degrees C rise",
      "Temperature only affects readings above 100 degrees C"
    ],
    correctIndex: 2,
    explanation: "Insulation resistance is inversely proportional to temperature. As a general rule, the reading halves for approximately every 10 degrees C rise. This means a motor tested at 60 degrees C will show significantly lower readings than the same motor at 20 degrees C. When trending, always correct readings to a standard reference temperature (typically 40 degrees C)."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "An insulation resistance tester applies which type of voltage to the circuit under test?",
    options: [
      "AC voltage at mains frequency",
      "DC voltage at a specified level",
      "High-frequency AC voltage",
      "Pulsed voltage"
    ],
    correctAnswer: 1,
    explanation: "Insulation resistance testers apply a smooth DC voltage at a specified level. DC is used because it allows measurement of the true resistive component of the insulation without the effects of capacitive charging that would occur with AC."
  },
  {
    id: 2,
    question: "Before performing an insulation resistance test, which safety precaution is essential?",
    options: [
      "Ensure the circuit is energised at normal operating voltage",
      "Ensure the circuit is safely isolated, proved dead, and all sensitive equipment is disconnected",
      "Ensure the ambient temperature is below 20 degrees C",
      "Ensure all cable connections are loosened"
    ],
    correctAnswer: 1,
    explanation: "The circuit must be safely isolated, proved dead and locked off before testing. All connected equipment that could be damaged by the test voltage (electronic devices, surge protectors, capacitors, LEDs) must be disconnected."
  },
  {
    id: 3,
    question: "The polarisation index (PI) is calculated by dividing:",
    options: [
      "The 1-minute reading by the 30-second reading",
      "The 10-minute reading by the 1-minute reading",
      "The test voltage by the leakage current",
      "The cable length by the insulation resistance"
    ],
    correctAnswer: 1,
    explanation: "The polarisation index is the ratio of the 10-minute insulation resistance reading to the 1-minute reading. Good insulation shows a PI of 2.0 or higher. A PI close to 1.0 indicates contaminated or water-logged insulation."
  },
  {
    id: 4,
    question: "When testing insulation resistance on a three-phase motor, which connections should be tested?",
    options: [
      "Only L1 to earth",
      "L1-E, L2-E, L3-E and phase-to-phase (L1-L2, L2-L3, L1-L3)",
      "Only phase-to-phase",
      "Only the supply cable, not the motor windings"
    ],
    correctAnswer: 1,
    explanation: "A complete test requires testing each phase to earth (L1-E, L2-E, L3-E) and each phase to phase (L1-L2, L2-L3, L1-L3). This identifies insulation breakdown between windings and to the frame."
  },
  {
    id: 5,
    question: "A motor insulation resistance drops from 50 megohms to 2 megohms over six months. This indicates:",
    options: [
      "Normal operation — insulation resistance varies widely",
      "Significant insulation deterioration requiring investigation",
      "The tester is faulty",
      "The motor needs rebalancing"
    ],
    correctAnswer: 1,
    explanation: "A drop from 50 to 2 megohms represents a 96% decrease. While 2 megohms is still above the BS 7671 minimum, the trend shows serious deterioration requiring immediate investigation — possible causes include moisture ingress, contamination or thermal degradation."
  },
  {
    id: 6,
    question: "After completing an insulation resistance test on a long cable run, what must be done?",
    options: [
      "Wait 30 seconds for the reading to stabilise",
      "Safely discharge the stored capacitive charge before touching conductors",
      "Apply a higher test voltage to verify",
      "Record the ambient humidity"
    ],
    correctAnswer: 1,
    explanation: "Long cable runs store significant capacitive charge during testing. This charge must be safely discharged before touching any conductors or reconnecting equipment. Most modern testers have a built-in discharge function."
  },
  {
    id: 7,
    question: "The dielectric absorption ratio (DAR) compares readings taken at:",
    options: [
      "Two different test voltages",
      "60 seconds and 30 seconds into the test",
      "Two different temperatures",
      "Before and after the motor has run"
    ],
    correctAnswer: 1,
    explanation: "The DAR is the 60-second reading divided by the 30-second reading. A DAR of 1.4 or higher indicates good insulation. Below 1.0 suggests contamination. DAR is a quicker alternative to the full polarisation index test."
  },
  {
    id: 8,
    question: "Step voltage testing involves:",
    options: [
      "Increasing the test duration at a fixed voltage",
      "Applying progressively higher test voltages and comparing readings at each step",
      "Testing at different ambient temperatures",
      "Applying the test voltage in pulses"
    ],
    correctAnswer: 1,
    explanation: "Step voltage testing applies increasing DC voltages in steps and compares the insulation resistance at each level. Good insulation shows similar resistance at each step. A significant drop at higher voltages indicates weakness that standard test voltages may not reveal."
  },
  {
    id: 9,
    question: "High ambient temperature and surface moisture cause:",
    options: [
      "Higher insulation resistance readings",
      "Misleadingly low insulation resistance readings",
      "No change in readings",
      "The tester to malfunction"
    ],
    correctAnswer: 1,
    explanation: "High temperature reduces insulation resistance, and surface moisture provides a low-resistance leakage path. Both cause misleadingly low readings. Test at consistent temperature and ensure equipment is dry. Record temperature and humidity for trending."
  },
  {
    id: 10,
    question: "Under BS 7671, the test voltage for SELV circuits (up to 50 V AC) is:",
    options: [
      "250 V DC",
      "500 V DC",
      "1000 V DC",
      "The same as the circuit voltage"
    ],
    correctAnswer: 0,
    explanation: "BS 7671 Table 6.1 specifies a 250 V DC test voltage for SELV and PELV circuits. The minimum acceptable insulation resistance for these circuits is 0.5 megohm."
  },
  {
    id: 11,
    question: "For meaningful trending of motor insulation data, readings should be corrected to:",
    options: [
      "A standard reference temperature, typically 40 degrees C",
      "The highest recorded temperature",
      "0 degrees C",
      "Outdoor ambient temperature"
    ],
    correctAnswer: 0,
    explanation: "Readings should be corrected to a standard reference temperature — typically 40 degrees C for rotating machines (IEEE 43). Without temperature correction, readings taken at different temperatures cannot be meaningfully compared for trend analysis."
  },
  {
    id: 12,
    question: "Under ST1426, insulation resistance testing relates to which competence area?",
    options: [
      "Commercial awareness",
      "Condition monitoring, electrical testing and diagnostic fault-finding",
      "Project planning",
      "Quality management systems"
    ],
    correctAnswer: 1,
    explanation: "ST1426 requires maintenance technicians to understand and apply electrical testing techniques including insulation resistance testing as part of condition monitoring and diagnostic fault-finding skills."
  }
];

const faqs = [
  {
    question: "How often should insulation resistance testing be carried out on motors?",
    answer: "The frequency depends on criticality, operating environment and age. Critical motors in harsh environments should be tested quarterly; important motors in normal conditions every 6 months; and non-critical motors annually. New installations should be tested at commissioning to establish a baseline."
  },
  {
    question: "Can I test insulation resistance on a VSD-fed motor without disconnecting the drive?",
    answer: "No. The insulation test voltage can damage the electronic components in a variable speed drive. Always disconnect the motor cables from the VSD output terminals before applying the insulation test. Similarly, disconnect surge protection devices, capacitors and electronic instruments."
  },
  {
    question: "What does a spot reading tell me compared to a timed test?",
    answer: "A spot reading (typically at 60 seconds) gives a single resistance value for comparison against minimums and previous readings. Timed tests (DAR at 30/60 seconds, PI at 1/10 minutes) provide additional diagnostic information about moisture contamination and insulation degradation that a spot reading cannot detect."
  },
  {
    question: "Why do insulation resistance readings decrease over time?",
    answer: "All insulation degrades due to thermal ageing, mechanical stress, environmental factors and electrical stress. Regular testing detects when deterioration is accelerating or approaching minimum levels, allowing planned replacement before failure."
  },
  {
    question: "What is the difference between insulation resistance testing and hipot testing?",
    answer: "Insulation resistance testing applies a moderate DC voltage (typically 500 V or 1000 V) and measures resistance — it is non-destructive and used routinely. High-potential (hipot) testing applies much higher voltage (2-3 times rated) to stress-test insulation — it is a destructive-threshold test used at commissioning or after rewinding, not for routine maintenance."
  }
];

const MOETModule4Section2_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">

        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 4.2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Insulation Resistance Testing
          </h1>
          <p className="text-white/80">
            Measuring insulation integrity to detect deterioration before failure occurs
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>What:</strong> DC voltage applied to measure insulation resistance in megohms</li>
              <li className="pl-1"><strong>Test voltages:</strong> 250 V, 500 V, 1000 V or 5000 V DC per circuit rating</li>
              <li className="pl-1"><strong>BS 7671:</strong> Minimum 1.0 megohm for 230/400 V circuits at 500 V DC</li>
              <li className="pl-1"><strong>Trending:</strong> Regular measurements reveal deterioration patterns</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Motors:</strong> Phase-to-earth and phase-to-phase testing</li>
              <li className="pl-1"><strong>Cables:</strong> Conductor-to-earth and conductor-to-conductor</li>
              <li className="pl-1"><strong>Advanced:</strong> PI, DAR and step voltage for deeper diagnosis</li>
              <li className="pl-1"><strong>ST1426:</strong> Electrical testing and diagnostic skills</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the principles of insulation resistance and why it degrades over time",
              "Select the correct test voltage for different circuit ratings to BS 7671",
              "Perform insulation resistance tests safely on motors, cables and switchgear",
              "Interpret spot readings, DAR and polarisation index results",
              "Apply temperature correction for meaningful trending of insulation data",
              "Link insulation testing to ST1426 condition monitoring requirements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Principles of Insulation Resistance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical insulation separates live conductors from earth and from each other. Over time, insulation
              degrades due to thermal ageing, moisture ingress, chemical contamination, mechanical damage and
              electrical stress. Insulation resistance testing measures the ability of the insulation to resist the
              flow of leakage current under a controlled DC test voltage. A decreasing trend in insulation resistance
              is an early warning of impending insulation failure.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why DC Voltage Is Used</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Capacitive charging:</strong> AC voltage causes continuous capacitive charging current that masks the true leakage current. DC allows the capacitive current to decay, revealing the steady-state insulation resistance</li>
                <li className="pl-1"><strong>Three current components:</strong> When DC is applied, the total current consists of capacitive charging current (decays in seconds), absorption current (decays over minutes) and conduction/leakage current (steady state)</li>
                <li className="pl-1"><strong>Non-destructive:</strong> At standard test voltages, DC testing does not damage healthy insulation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Test Voltages and Minimum Values</p>
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
                      <td className="border border-white/10 px-3 py-2">SELV / PELV (up to 50 V AC)</td>
                      <td className="border border-white/10 px-3 py-2">250 V DC</td>
                      <td className="border border-white/10 px-3 py-2">0.5 megohm</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Up to 500 V AC (including 230/400 V)</td>
                      <td className="border border-white/10 px-3 py-2">500 V DC</td>
                      <td className="border border-white/10 px-3 py-2">1.0 megohm</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Above 500 V AC up to 1000 V</td>
                      <td className="border border-white/10 px-3 py-2">1000 V DC</td>
                      <td className="border border-white/10 px-3 py-2">1.0 megohm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The BS 7671 minimum values are absolute minimums — not targets. Healthy new
              insulation should read hundreds of megohms. A reading that has dropped significantly from previous tests
              indicates deterioration requiring investigation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Test Procedure and Safety
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Insulation resistance testing involves applying a potentially dangerous DC voltage to a circuit. Safe
              working procedures must be followed to protect both the tester and the equipment.
            </p>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Safety Precautions</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Isolate:</strong> Safely isolate the circuit, prove dead using a GS38-compliant voltage indicator tested before and after</li>
                <li className="pl-1"><strong>Disconnect:</strong> Remove all electronic equipment, surge protectors, capacitors, LEDs and sensitive instruments</li>
                <li className="pl-1"><strong>Warn:</strong> Post warning signs — high DC voltage is present during testing</li>
                <li className="pl-1"><strong>Discharge:</strong> After testing, discharge stored capacitive energy before touching conductors</li>
                <li className="pl-1"><strong>Record:</strong> Note test voltage, ambient temperature, humidity and reading for each test point</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step-by-Step Test Procedure</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Step 1:</strong> Isolate the circuit and prove dead. Lock off and post warning signs</li>
                <li className="pl-1"><strong>Step 2:</strong> Disconnect sensitive equipment and note what has been disconnected</li>
                <li className="pl-1"><strong>Step 3:</strong> Select the correct test voltage on the insulation tester</li>
                <li className="pl-1"><strong>Step 4:</strong> Connect test leads — line conductor to one terminal, earth to the other</li>
                <li className="pl-1"><strong>Step 5:</strong> Apply test voltage and hold for the required duration (60 s for spot reading, 10 min for PI)</li>
                <li className="pl-1"><strong>Step 6:</strong> Record the reading, then discharge the circuit</li>
                <li className="pl-1"><strong>Step 7:</strong> Repeat for all conductor combinations (L-E, N-E, L-N for single-phase; all phase-earth and phase-phase for three-phase)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Common Mistakes</p>
              <p className="text-sm text-white">
                Forgetting to disconnect electronic equipment is the most common and expensive mistake. A 500 V DC
                test voltage will destroy LED drivers, power supplies, surge protection devices and control
                electronics instantly. Always trace the circuit and identify everything connected before testing.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Advanced Diagnostic Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond the simple spot reading, advanced insulation testing techniques provide deeper diagnostic
              insight. These techniques are particularly valuable for high-value assets such as motors, transformers
              and long cable runs where early detection of deterioration prevents costly unplanned outages.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Dielectric Absorption Ratio (DAR)</h3>
              <p className="text-sm text-white mb-2">
                The DAR compares the 60-second reading with the 30-second reading. In good insulation, the
                absorption current is still decaying at 30 seconds, so the 60-second reading should be noticeably higher.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>DAR above 1.4:</strong> Good insulation</li>
                <li className="pl-1"><strong>DAR 1.0 to 1.4:</strong> Marginal — investigate further</li>
                <li className="pl-1"><strong>DAR below 1.0:</strong> Contaminated or moisture-logged insulation</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Polarisation Index (PI)</h3>
              <p className="text-sm text-white mb-2">
                The PI compares the 10-minute reading with the 1-minute reading, providing a more definitive
                assessment of insulation condition.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>PI above 4.0:</strong> Excellent insulation condition</li>
                <li className="pl-1"><strong>PI 2.0 to 4.0:</strong> Good — acceptable for continued service</li>
                <li className="pl-1"><strong>PI 1.0 to 2.0:</strong> Marginal — plan cleaning, drying out or investigation</li>
                <li className="pl-1"><strong>PI below 1.0:</strong> Poor — insulation is contaminated, wet or severely degraded</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Step Voltage Testing</h3>
              <p className="text-sm text-white mb-2">
                Step voltage testing applies progressively higher DC voltages and compares the insulation resistance
                at each level. This reveals weaknesses that only manifest under higher electrical stress.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Good insulation:</strong> Resistance stays approximately the same at each step</li>
                <li className="pl-1"><strong>Weak insulation:</strong> Resistance drops significantly at higher voltages</li>
                <li className="pl-1"><strong>Application:</strong> Primarily used for HV motors, transformers and cables</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Advanced techniques complement but do not replace basic spot readings and trending.
              The most valuable diagnostic information comes from consistent, regular readings plotted over time.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Trending and Condition-Based Decisions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The true value of insulation resistance testing lies in trending data over time. A single reading
              tells you the current state; a trend tells you the rate of deterioration and helps predict when
              insulation will reach unacceptable levels.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Temperature Correction</p>
              <p className="text-sm text-white mb-2">
                Because insulation resistance varies significantly with temperature, raw readings taken at different
                temperatures cannot be directly compared. Readings must be corrected to a standard reference temperature.
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Reference temperature:</strong> 40 degrees C for rotating machines (IEEE 43)</li>
                <li className="pl-1"><strong>Correction factor:</strong> Multiply reading by the correction factor for the temperature difference</li>
                <li className="pl-1"><strong>Always record:</strong> Winding temperature at time of test for trending purposes</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Trending Indicators</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Gradual decrease: normal ageing — continue monitoring</li>
                  <li className="pl-1">Sudden drop: investigate immediately (moisture, damage)</li>
                  <li className="pl-1">Seasonal variation: condensation — consider anti-condensation heating</li>
                  <li className="pl-1">Approaching minimum: plan replacement or refurbishment</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Action Levels</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Above 100 megohms: excellent — routine monitoring</li>
                  <li className="pl-1">10-100 megohms: good — continue monitoring</li>
                  <li className="pl-1">2-10 megohms: investigate — increase frequency</li>
                  <li className="pl-1">Below 2 megohms: urgent — plan intervention</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Insulation resistance testing is a core electrical testing skill for
              maintenance technicians. Understanding how to interpret results and make condition-based decisions
              maps directly to the ST1426 knowledge and skills requirements for diagnostic fault-finding.
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
                <p className="font-medium text-white mb-1">Test Voltages (BS 7671)</p>
                <ul className="space-y-0.5">
                  <li>SELV/PELV: 250 V DC, min 0.5 megohm</li>
                  <li>Up to 500 V: 500 V DC, min 1.0 megohm</li>
                  <li>500-1000 V: 1000 V DC, min 1.0 megohm</li>
                  <li>Always disconnect sensitive equipment</li>
                  <li>Discharge after testing</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Advanced Techniques</p>
                <ul className="space-y-0.5">
                  <li>DAR: 60 s / 30 s ratio (good above 1.4)</li>
                  <li>PI: 10 min / 1 min ratio (good above 2.0)</li>
                  <li>Step voltage: increasing V, compare IR</li>
                  <li>Temp correction: halves per 10 degrees C</li>
                  <li>Always trend and temperature-correct</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section2-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Vibration Analysis
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module4-section2-5">
              Next: Oil and Fluid Analysis
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule4Section2_4;
