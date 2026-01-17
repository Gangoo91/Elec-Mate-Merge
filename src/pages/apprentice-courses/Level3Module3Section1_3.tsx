import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Measurement Instruments - Level 3 Module 3 Section 1.3";
const DESCRIPTION = "Master the use of multimeters, clamp meters, insulation resistance testers and other essential electrical measurement instruments.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "When measuring voltage in a live circuit, how should the meter be connected?",
    options: [
      "In series with the load",
      "In parallel across the component",
      "With the circuit isolated",
      "Through a current transformer"
    ],
    correctIndex: 1,
    explanation: "Voltmeters must be connected in parallel (across the component) to measure potential difference. The meter's high internal resistance ensures minimal current flows through it, so it doesn't significantly affect the circuit."
  },
  {
    id: "check-2",
    question: "What is the main advantage of a clamp meter over a standard multimeter for current measurement?",
    options: [
      "Higher accuracy",
      "Lower cost",
      "No need to break the circuit",
      "Can measure higher voltages"
    ],
    correctIndex: 2,
    explanation: "Clamp meters measure current inductively by clamping around a conductor - the circuit doesn't need to be broken. This is safer and more convenient for measuring current in live circuits, though accuracy may be slightly lower than in-line measurement."
  },
  {
    id: "check-3",
    question: "What test voltage is typically used for insulation resistance testing on 230V circuits?",
    options: [
      "50V DC",
      "230V AC",
      "500V DC",
      "1000V DC"
    ],
    correctIndex: 2,
    explanation: "500V DC is the standard test voltage for 230V circuits. The test voltage must stress the insulation to reveal weaknesses. Higher voltage circuits require higher test voltages - 1000V DC for 400V circuits. Always use DC as AC can charge capacitance."
  },
  {
    id: "check-4",
    question: "Before using a voltage indicator, what must you do?",
    options: [
      "Check the battery level",
      "Prove it on a known live source, test, then re-prove",
      "Replace the fuses",
      "Calibrate against a reference"
    ],
    correctIndex: 1,
    explanation: "The proving sequence (prove-test-prove) is essential for safe isolation. Prove the indicator works on a known live source, test your circuit, then re-prove it still works. This confirms the indicator hasn't failed between tests, which could give a false 'dead' reading."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does CAT III 600V on a multimeter indicate?",
    options: [
      "The meter can measure up to 600V only",
      "The meter is safe for use on distribution-level circuits up to 600V",
      "The meter's accuracy category",
      "The meter's warranty coverage"
    ],
    correctAnswer: 1,
    explanation: "CAT ratings indicate measurement category for safety. CAT III is for distribution-level measurements (consumer units, fixed wiring). The voltage rating shows the maximum safe voltage. CAT III 600V is suitable for most UK installation work."
  },
  {
    id: 2,
    question: "When measuring current with a multimeter (not clamp meter), how must it be connected?",
    options: ["In parallel", "In series", "Across the supply", "Between live and earth"],
    correctAnswer: 1,
    explanation: "To measure current, the meter must be in series with the circuit so all current flows through it. The meter's low internal resistance (when in current mode) allows current to pass with minimal voltage drop. Never connect a current range across a voltage source."
  },
  {
    id: 3,
    question: "What minimum insulation resistance is acceptable for a new installation tested at 500V DC?",
    options: ["0.5 megohms", "1 megohm", "2 megohms", "10 megohms"],
    correctAnswer: 1,
    explanation: "The minimum acceptable insulation resistance is 1 megohm (1M ohm). New installations typically read much higher (hundreds of megohms). Readings below 2M ohms warrant investigation even if passing. Deterioration over time is normal but readings should remain well above 1M ohm."
  },
  {
    id: 4,
    question: "A true RMS meter is important for measuring:",
    options: [
      "DC voltages only",
      "Non-sinusoidal AC waveforms accurately",
      "Very high voltages",
      "Insulation resistance"
    ],
    correctAnswer: 1,
    explanation: "True RMS meters accurately measure non-sinusoidal waveforms (like those from variable speed drives, LED dimmers, or switched-mode power supplies). Average-responding meters assume a pure sine wave and give incorrect readings for distorted waveforms."
  },
  {
    id: 5,
    question: "What type of instrument would you use to measure earth electrode resistance?",
    options: ["Standard multimeter", "Insulation resistance tester", "Earth electrode tester", "Clamp meter"],
    correctAnswer: 2,
    explanation: "Earth electrode resistance requires a dedicated earth electrode tester using the fall-of-potential method with test spikes. Standard instruments cannot measure the resistance between an electrode and general mass of earth. Some advanced clamp meters can measure without disconnection."
  },
  {
    id: 6,
    question: "What precaution must be taken before insulation resistance testing?",
    options: [
      "Ensure the circuit is live",
      "Disconnect or protect sensitive electronic equipment",
      "Connect the earth lead first",
      "Set the meter to AC"
    ],
    correctAnswer: 1,
    explanation: "Insulation testers apply high DC voltage (500V or more) which can damage sensitive electronics, PIRs, dimmers, and electronic controllers. These must be disconnected or protected before testing. Also ensure circuits are isolated and discharged."
  },
  {
    id: 7,
    question: "When testing loop impedance, what does the instrument actually measure?",
    options: [
      "Just the cable resistance",
      "The complete fault loop including external impedance",
      "Only the earth conductor",
      "The transformer winding resistance"
    ],
    correctAnswer: 1,
    explanation: "Loop impedance testers measure the complete earth fault loop - from the point of test, through the earth path, transformer, and back through the line conductor. This includes Ze (external) plus R1+R2 (circuit conductors). The total determines disconnection time."
  },
  {
    id: 8,
    question: "Why might a digital multimeter give unstable readings when measuring resistance in-circuit?",
    options: [
      "The battery is low",
      "Parallel paths are affecting the measurement",
      "The probes are damaged",
      "The circuit is too cold"
    ],
    correctAnswer: 1,
    explanation: "In-circuit resistance measurements can be affected by parallel paths through other components, or by semiconductor junctions. The measured value may be lower than the actual component resistance. For accurate readings, isolate the component or disconnect at least one end."
  },
  {
    id: 9,
    question: "What does a prospective fault current (PFC) tester measure?",
    options: [
      "The current that flows during normal operation",
      "The maximum current that would flow during a fault",
      "The leakage current to earth",
      "The neutral current"
    ],
    correctAnswer: 1,
    explanation: "PFC testers measure the maximum fault current that could flow if a short circuit occurred at that point. This is essential for ensuring protective devices can safely interrupt the fault. PFC must not exceed the rated breaking capacity of MCBs and fuses."
  },
  {
    id: 10,
    question: "Which measurement requires the circuit to be energised?",
    options: [
      "Insulation resistance",
      "Continuity",
      "Earth loop impedance",
      "Earth electrode resistance"
    ],
    correctAnswer: 2,
    explanation: "Earth loop impedance testing requires the circuit to be live as the tester creates a controlled fault to measure the loop. Insulation and continuity tests are done with the circuit isolated. Earth electrode testing uses the tester's own power source."
  }
];

const faqs = [
  {
    question: "Why do I need to 'prove-test-prove' before working on circuits?",
    answer: "This sequence confirms your voltage indicator is working correctly. Prove it on a known live source before testing, then re-prove after testing that your circuit is dead. If the indicator has failed (flat battery, damaged leads, internal fault), you'd get a false 'dead' reading - potentially lethal. The re-prove catches failures that occurred during testing."
  },
  {
    question: "Can I use my multimeter for all electrical testing?",
    answer: "No. While multimeters are versatile, specific tests require dedicated instruments. Insulation resistance testing needs high voltage capability. RCD testing requires calibrated trip current injection. Loop impedance and PFC testing need specialist instruments. Using the wrong instrument gives meaningless results or could be dangerous."
  },
  {
    question: "What's the difference between CAT II, CAT III and CAT IV ratings?",
    answer: "CAT ratings indicate where an instrument can be safely used. CAT II is for plug-in equipment and outlets. CAT III is for distribution (consumer units, sub-mains, fixed wiring). CAT IV is for origin of supply (service heads, meters). Higher categories require greater transient protection as fault energy is higher closer to the source."
  },
  {
    question: "My insulation resistance reading keeps climbing - which value do I record?",
    answer: "Record the stable reading after the initial charging current subsides - typically after about a minute. Long cable runs with high capacitance take longer to stabilise. The reading should be steady or slowly climbing. A steadily falling reading suggests moisture ingress or contamination and warrants investigation."
  },
  {
    question: "Why do some clamp meters not work on VFD circuits?",
    answer: "Variable frequency drives produce non-sinusoidal current waveforms with high harmonic content. Average-responding clamp meters give inaccurate readings. Use a true RMS clamp meter for VFD circuits. Also note that VFDs can produce common-mode currents - clamp around all conductors together to measure leakage only."
  }
];

const Level3Module3Section1_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.1.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Measurement Instruments
          </h1>
          <p className="text-white/80">
            Essential tools for testing, commissioning and fault finding
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Multimeters:</strong> Voltage, current, resistance in one unit</li>
              <li><strong>Clamp meters:</strong> Non-invasive current measurement</li>
              <li><strong>Insulation testers:</strong> High-voltage DC to test insulation integrity</li>
              <li><strong>Safety:</strong> Prove-test-prove before working on circuits</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> CAT rating labels - ensure they match your work</li>
              <li><strong>Use:</strong> Correct instrument for each test type</li>
              <li><strong>Apply:</strong> Record stable readings, note conditions</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select the appropriate instrument for each measurement type",
              "Connect meters correctly for voltage and current measurement",
              "Perform insulation resistance testing safely",
              "Understand CAT ratings and their importance",
              "Use the prove-test-prove sequence correctly",
              "Interpret readings and identify anomalies"
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
            Multimeters - The Versatile Tool
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Digital multimeters (DMMs) are the most commonly used electrical measuring instruments. A quality multimeter can measure AC and DC voltage, AC and DC current, resistance, and often includes additional functions like continuity testing, diode testing, and capacitance measurement.
            </p>
            <p>
              When measuring voltage, connect the meter in parallel across the component or supply. The meter's high internal resistance (typically 10 megohms) means negligible current flows through it. For current measurement, the meter must be in series with the circuit - all current flows through the meter's low-resistance current shunt.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Features to Look For:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>True RMS:</strong> Accurate readings on non-sinusoidal waveforms</li>
                <li><strong>CAT III or IV rated:</strong> Safe for distribution-level work</li>
                <li><strong>Auto-ranging:</strong> Convenient for varying measurement ranges</li>
                <li><strong>Hold function:</strong> Freezes display for awkward readings</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Never connect a meter set to current range across a voltage source - the low resistance will cause a short circuit, potentially destroying the meter and creating a hazard. Always check your range selection before connecting.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Clamp Meters for Current Measurement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Clamp meters measure current by detecting the magnetic field around a conductor - no need to break the circuit. This is safer and more convenient than in-line current measurement, especially for measuring load currents in live circuits during commissioning or fault finding.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">AC Clamp Meters</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Use transformer action to measure AC</li>
                  <li>Cannot measure DC current</li>
                  <li>Generally more affordable</li>
                  <li>Adequate for most installation work</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">DC/AC Clamp Meters</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Use Hall effect sensors</li>
                  <li>Can measure both AC and DC</li>
                  <li>Essential for solar PV, battery systems</li>
                  <li>Require zeroing before use</li>
                </ul>
              </div>
            </div>

            <p>
              For accurate readings, clamp around a single conductor - clamping around a cable containing both line and neutral cancels the magnetic fields, reading near zero. To measure earth leakage, clamp around all circuit conductors together.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Insulation Resistance Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Insulation resistance testing verifies that the insulation between conductors and between conductors and earth is adequate to prevent leakage currents and electric shock. The test uses high DC voltage (typically 500V for 230V circuits) to stress the insulation beyond normal operating conditions.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Testing a ring final circuit before energisation. Connect the insulation tester between live conductors and earth. Apply 500V DC. A reading of 150 megohms indicates excellent insulation. A reading of 0.5 megohms fails - there's likely damaged insulation, moisture, or contamination that must be found and rectified before the circuit can be energised.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Before Testing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Isolate the circuit and lock off</li>
                <li>Disconnect or protect sensitive electronics</li>
                <li>Discharge any capacitance (PIR sensors, etc.)</li>
                <li>Ensure all equipment is disconnected or switched off</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Safe Isolation and Proving
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The prove-test-prove sequence is fundamental to safe working. Before declaring any circuit 'dead', you must verify your test instrument is functioning correctly. A failed instrument showing zero volts when the circuit is actually live has killed electricians.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">1. Prove</p>
                <p className="text-white/90 text-xs">Test on known live source to confirm indicator works</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">2. Test</p>
                <p className="text-white/90 text-xs">Test the circuit you've isolated</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">3. Re-prove</p>
                <p className="text-white/90 text-xs">Confirm indicator still works after testing</p>
              </div>
            </div>

            <p>
              Use a properly rated voltage indicator or proving unit. Test between all combinations: L-N, L-E, N-E, and between phases on three-phase supplies. Remember that capacitance can hold charge after isolation - always treat circuits as live until proven dead.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Pro tip:</strong> Use a dedicated proving unit rather than relying on finding a known live source. Proving units provide a safe, consistent test source and are always available when you need to re-prove.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Testing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always check instrument calibration is current</li>
                <li>Inspect leads for damage before use</li>
                <li>Select appropriate CAT rating for your work</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Recording Results</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Note instrument serial number on test certificates</li>
                <li>Record stable readings, not fluctuating values</li>
                <li>Document test conditions (temperature, humidity) for reference</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using uncalibrated instruments</strong> - Invalid test results could put lives at risk</li>
                <li><strong>Skipping the re-prove step</strong> - Instrument failure during testing would go undetected</li>
                <li><strong>Wrong meter range</strong> - Connecting current range across a voltage source destroys meters</li>
              </ul>
            </div>
          </div>
        </section>

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
                <p className="font-medium text-white mb-1">Instrument Connections</p>
                <ul className="space-y-0.5">
                  <li>Voltage: In parallel</li>
                  <li>Current: In series</li>
                  <li>Resistance: Circuit isolated</li>
                  <li>Insulation: Circuit isolated, 500V DC</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">CAT Ratings</p>
                <ul className="space-y-0.5">
                  <li>CAT II: Plug-in equipment</li>
                  <li>CAT III: Distribution (consumer units)</li>
                  <li>CAT IV: Origin of supply</li>
                  <li>Higher = closer to source = more protection</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section1-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Electrical Quantities
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module3-section1-4">
              Next: Accuracy and Tolerances
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module3Section1_3;
