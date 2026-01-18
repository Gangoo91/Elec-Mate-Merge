import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Low Resistance Measurement Techniques - Module 3 Section 5";
const DESCRIPTION = "Master low-resistance measurement techniques including lead nulling, four-terminal testing, and minimising errors.";

const quickCheckQuestions = [
  {
    id: "test-current",
    question: "Why does BS 7671 specify a 200mA minimum test current?",
    options: [
      "To heat the conductor for thermal testing",
      "To break through oxide layers on connections",
      "To trip the circuit breaker",
      "To magnetise protective devices"
    ],
    correctIndex: 1,
    explanation: "The 200mA test current is specified to break through thin oxide films that naturally form on metal surfaces, revealing the true resistance of the connection."
  },
  {
    id: "lead-nulling",
    question: "Before taking measurements, test leads should be:",
    options: [
      "Connected to mains earth",
      "Extended to maximum length",
      "Shorted together and nulled",
      "Coiled to reduce inductance"
    ],
    correctIndex: 2,
    explanation: "Shorting leads together and nulling subtracts their inherent resistance, ensuring accurate measurements of the circuit under test."
  },
  {
    id: "open-circuit",
    question: "What reading indicates an open circuit (no continuity)?",
    options: ["0.00Ω", "0.50Ω", "1.00Ω", "OL or ∞"],
    correctIndex: 3,
    explanation: "OL (Over Limit) or ∞ (infinity) symbol indicates the resistance is too high to measure - meaning there is no continuous path (open circuit)."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the minimum test current required for continuity testing per BS 7671?",
    options: ["50mA", "100mA", "200mA", "500mA"],
    correctAnswer: 2,
    explanation: "BS 7671 specifies a minimum test current of 200mA for continuity testing to ensure oxide layers are penetrated and true resistance is measured."
  },
  {
    id: 2,
    question: "Why must test leads be nulled before taking measurements?",
    options: [
      "To charge the instrument's battery",
      "To subtract lead resistance from readings",
      "To calibrate the display",
      "To test the fuse"
    ],
    correctAnswer: 1,
    explanation: "Nulling subtracts the inherent resistance of the test leads from all subsequent measurements, ensuring only the circuit resistance is measured."
  },
  {
    id: 3,
    question: "What does a four-terminal (Kelvin) measurement eliminate?",
    options: [
      "Capacitive reactance",
      "Inductive reactance",
      "Lead and contact resistance errors",
      "Temperature effects"
    ],
    correctAnswer: 2,
    explanation: "Four-terminal measurement uses separate current and voltage sensing leads, eliminating lead and contact resistance from the measurement."
  },
  {
    id: 4,
    question: "What would cause an unexpectedly high continuity reading?",
    options: [
      "Short test leads",
      "Corroded or loose connections",
      "Excess test current",
      "Cold conductor temperature"
    ],
    correctAnswer: 1,
    explanation: "Corroded or loose connections add resistance to the circuit, causing higher than expected readings. This could indicate a potentially dangerous connection."
  },
  {
    id: 5,
    question: "Before testing, test leads should be:",
    options: [
      "Extended to full length",
      "Shorted together and nulled",
      "Connected to mains earth",
      "Wound into a coil"
    ],
    correctAnswer: 1,
    explanation: "Test leads should be connected together (shorted) and the instrument nulled to zero to subtract their resistance from subsequent measurements."
  },
  {
    id: 6,
    question: "What resistance value would typically indicate an open circuit?",
    options: ["0.00Ω", "0.50Ω", "1.00Ω", "OL or ∞"],
    correctAnswer: 3,
    explanation: "OL (Over Limit) or ∞ (infinity) indicates an open circuit with no continuous path. Good connections should read in the milliohm to low ohm range."
  },
  {
    id: 7,
    question: "Why does BS 7671 specify a minimum 200mA test current?",
    options: [
      "To heat the conductor",
      "To magnetise the core",
      "To break down oxide layers",
      "To trip protective devices"
    ],
    correctAnswer: 2,
    explanation: "The 200mA current is sufficient to break through thin oxide films on connections, revealing the true resistance of the metallic path."
  },
  {
    id: 8,
    question: "Which affects low-resistance readings most significantly?",
    options: [
      "Ambient humidity",
      "Barometric pressure",
      "Conductor temperature",
      "Time of day"
    ],
    correctAnswer: 2,
    explanation: "Conductor resistance varies with temperature. Copper has a positive temperature coefficient - resistance increases with temperature."
  },
  {
    id: 9,
    question: "What is the typical resolution needed for continuity testing?",
    options: ["1Ω", "0.1Ω", "0.01Ω", "100Ω"],
    correctAnswer: 2,
    explanation: "Continuity tests measure milliohm values. A resolution of 0.01Ω (10mΩ) is typically needed to accurately assess conductor and connection quality."
  },
  {
    id: 10,
    question: "When using a standard 2-wire measurement, lead resistance:",
    options: [
      "Has no effect",
      "Is added to the measured value",
      "Is subtracted automatically",
      "Only affects AC readings"
    ],
    correctAnswer: 1,
    explanation: "In 2-wire measurement, lead resistance is included in the reading. This is why nulling is essential - it compensates for the lead resistance."
  }
];

const faqs = [
  {
    question: "Why do low-resistance ohmmeters use high test currents?",
    answer: "Standard multimeters use very small currents which are insufficient to measure milliohm resistances accurately. A 200mA test current generates a measurable voltage drop even across very low resistances, following Ohm's law (V=IR)."
  },
  {
    question: "What is lead nulling and why is it important?",
    answer: "Lead nulling subtracts the resistance of the test leads themselves from the measurement. Test leads typically have 0.01-0.05Ω resistance. Without nulling, this would be added to every reading, causing significant errors when measuring values under 1Ω."
  },
  {
    question: "How does four-terminal (Kelvin) measurement work?",
    answer: "Two terminals carry the test current through the resistance, while two separate terminals measure the voltage drop. Because the voltage-sensing terminals carry almost no current, lead and contact resistances don't affect the measurement."
  },
  {
    question: "What test current should be used for continuity testing?",
    answer: "BS 7671 requires a test current of no less than 200mA. This current is sufficient to break down resistive oxide layers on connections and provide accurate readings of the true metallic resistance."
  },
  {
    question: "How do dirty or corroded connections affect readings?",
    answer: "Oxidation and contamination create a resistive layer on connection surfaces. The 200mA test current helps penetrate light corrosion, but heavy contamination will cause elevated readings. Clean connection points if results seem inconsistent."
  },
  {
    question: "What causes fluctuating readings?",
    answer: "Common causes: poor probe contact, loose connections in the circuit under test, inductive effects on long cable runs, or interference from nearby equipment. Ensure firm probe pressure and re-test for consistent results."
  }
];

const InspectionTestingModule3Section5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/inspection-testing-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Low Resistance Measurement Techniques
          </h1>
          <p className="text-white/80">
            Master accurate low-resistance measurements with proper techniques, lead nulling, and error minimisation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Test Current:</strong> 200mA minimum (BS 7671)</li>
              <li><strong>Resolution:</strong> 0.01Ω (10mΩ) typical</li>
              <li><strong>Lead Nulling:</strong> Essential before every test</li>
              <li><strong>Kelvin Method:</strong> Four-terminal for best accuracy</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> High readings, fluctuating values, OL display</li>
              <li><strong>Use:</strong> Low-resistance ohmmeter, proper probes</li>
              <li><strong>Apply:</strong> All continuity and bonding tests</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand how low-resistance ohmmeters work",
              "Null test leads correctly before testing",
              "Minimise measurement errors",
              "Apply four-terminal (Kelvin) measurement technique",
              "Interpret results and understand readings",
              "Maintain accuracy and verify test equipment"
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

        {/* Section 1: Why Low-Resistance Testing? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Low-Resistance Testing?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Continuity testing measures very small resistances - typically in the <strong>milliohm (mΩ) range</strong>. Standard multimeters cannot accurately measure such low values because they use insufficient test current and lack the necessary resolution.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10">
              <p className="text-sm font-medium text-blue-400 mb-2">Example</p>
              <p className="text-sm text-white">
                A 20m length of 2.5mm² copper conductor has a theoretical resistance of about 0.15Ω. You need equipment that can resolve 0.01Ω to measure this accurately.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: The 200mA Requirement */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The 200mA Requirement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 p-4 rounded-lg bg-elec-yellow/10">
              <p className="text-center text-2xl font-bold text-elec-yellow mb-1">200mA</p>
              <p className="text-center text-xs text-white/60">BS 7671 Minimum Test Current</p>
            </div>

            <p>The 200mA current serves critical purposes:</p>

            <div className="my-6">
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><CheckCircle className="h-4 w-4 text-green-400 inline mr-2" />Breaks through thin oxide films on connections</li>
                <li><CheckCircle className="h-4 w-4 text-green-400 inline mr-2" />Generates measurable voltage across low resistances</li>
                <li><CheckCircle className="h-4 w-4 text-green-400 inline mr-2" />Reveals poor connections that lighter currents might miss</li>
                <li><CheckCircle className="h-4 w-4 text-green-400 inline mr-2" />Provides consistent, repeatable results</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 3: Lead Nulling (Zeroing) */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Lead Nulling (Zeroing)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Test leads have their own resistance (typically 0.01-0.05Ω). Without nulling, this is added to every measurement, causing significant errors on low readings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Nulling Procedure:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold mr-2">1</span>Connect test leads together (short circuit)</li>
                <li><span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold mr-2">2</span>Press the NULL or ZERO button on instrument</li>
                <li><span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold mr-2">3</span>Display should read 0.00Ω</li>
                <li><span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs font-bold mr-2">4</span>All subsequent readings exclude lead resistance</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-amber-500/10">
              <p className="text-sm font-medium text-amber-400 mb-2">Important</p>
              <p className="text-sm text-white">
                Re-null whenever you change test leads or at the start of each test sequence.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Four-Terminal (Kelvin) Measurement */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Four-Terminal (Kelvin) Measurement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              For the most accurate low-resistance measurements, four-terminal (Kelvin) testing eliminates lead and contact resistance entirely.
            </p>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-500/10">
                <p className="text-blue-400 font-semibold mb-2">Current Terminals (C)</p>
                <p className="text-sm text-white/70">Two leads inject the test current through the resistance being measured.</p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10">
                <p className="text-green-400 font-semibold mb-2">Potential Terminals (P)</p>
                <p className="text-sm text-white/70">Two separate leads sense the voltage drop. Since almost no current flows in these leads, their resistance doesn't affect the reading.</p>
              </div>
            </div>

            <p className="text-sm text-white/60">
              Four-terminal measurement is essential when measuring very low resistances (under 1Ω) or when high accuracy is required.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 5: Sources of Error */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Sources of Error
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-red-500/10">
                <p className="text-red-400 font-semibold text-sm">Un-nulled leads</p>
                <p className="text-white/70 text-xs">Lead resistance added to all readings</p>
              </div>
              <div className="p-3 rounded-lg bg-red-500/10">
                <p className="text-red-400 font-semibold text-sm">Poor probe contact</p>
                <p className="text-white/70 text-xs">Adds contact resistance, gives fluctuating readings</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-500/10">
                <p className="text-amber-400 font-semibold text-sm">Temperature variation</p>
                <p className="text-white/70 text-xs">Copper resistance changes ~0.4% per degree C</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-500/10">
                <p className="text-amber-400 font-semibold text-sm">Dirty connections</p>
                <p className="text-white/70 text-xs">Oxide films increase resistance</p>
              </div>
              <div className="p-3 rounded-lg bg-red-500/10">
                <p className="text-red-400 font-semibold text-sm">Loose terminations</p>
                <p className="text-white/70 text-xs">Intermittent contact causes unstable readings</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Interpreting Results */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Interpreting Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 text-white/60">Reading</th>
                    <th className="text-left py-2 text-white/60">Indication</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/5">
                    <td className="py-2 font-mono">0.00 - 0.05Ω</td>
                    <td className="py-2 text-green-400">Excellent - sound connections</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 font-mono">0.05 - 0.50Ω</td>
                    <td className="py-2 text-green-400">Normal for typical circuits</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 font-mono">0.50 - 1.00Ω</td>
                    <td className="py-2 text-amber-400">Acceptable but investigate if unexpected</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 font-mono">{">"}1.00Ω</td>
                    <td className="py-2 text-amber-400">High - check connections</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono">OL / ∞</td>
                    <td className="py-2 text-red-400">Open circuit - no continuity</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-white/60">
              Always compare readings against expected values calculated from conductor length and CSA using tabulated resistance values.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Top Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Firm Probe Pressure:</strong> Press probes firmly to ensure good contact. Light contact adds resistance and causes fluctuating readings</li>
                <li><strong>Wait for Stability:</strong> Allow readings to stabilise before recording. Initial readings may fluctuate as contact settles</li>
                <li><strong>Check Calibration:</strong> Verify instrument calibration periodically. Use a known resistance to check accuracy</li>
                <li>Clean probe tips regularly for reliable contact</li>
                <li>Use appropriate probe length for the job</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Forgetting to null:</strong> Always null before testing sequence</li>
                <li><strong>Testing energised circuits:</strong> Can damage the instrument</li>
                <li><strong>Parallel paths:</strong> Check for alternative paths that could affect readings</li>
                <li><strong>Ignoring battery state:</strong> Low battery affects accuracy</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key References</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>BS 7671:</strong> Regulation 612.2 - Continuity testing</li>
                <li><strong>GN3:</strong> Guidance Note 3 - Inspection and Testing</li>
                <li><strong>Table 5B:</strong> Conductor resistance values at 20 degrees C</li>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Reference Cards */}
        <section className="mb-10">
          <UnitsPocketCard />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Low-Resistance Testing Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Test Requirements</p>
                <ul className="space-y-0.5">
                  <li>Min Test Current: 200mA</li>
                  <li>Typical Resolution: 0.01Ω</li>
                  <li>Lead Nulling: Short → NULL</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Result Guidance</p>
                <ul className="space-y-0.5">
                  <li>Good Connection: {"<"}0.05Ω</li>
                  <li>Open Circuit: OL or ∞</li>
                  <li>High Reading: Investigate!</li>
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
            <Link to="../section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-6">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule3Section5;
