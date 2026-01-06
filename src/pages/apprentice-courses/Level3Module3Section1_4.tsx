import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Accuracy, Tolerances and Errors - Level 3 Module 3 Section 1.4";
const DESCRIPTION = "Understand measurement accuracy, instrument tolerances and sources of error in electrical measurements for reliable testing results.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "A multimeter has an accuracy specification of ±(0.5% + 2 digits). When measuring 100.0V, what is the possible error range?",
    options: [
      "±0.5V only",
      "±0.7V (0.5V plus 0.2V)",
      "±2.5V",
      "±0.05V"
    ],
    correctIndex: 1,
    explanation: "The 0.5% of 100V equals 0.5V, plus 2 digits (0.2V on a display showing 100.0V) gives a total possible error of ±0.7V. The actual voltage could be anywhere from 99.3V to 100.7V."
  },
  {
    id: "check-2",
    question: "What is the difference between accuracy and precision?",
    options: [
      "They mean the same thing",
      "Accuracy is how close to the true value; precision is how repeatable the readings are",
      "Precision is always more important than accuracy",
      "Accuracy only applies to digital meters"
    ],
    correctIndex: 1,
    explanation: "Accuracy describes how close a measurement is to the true value. Precision describes how consistent repeated measurements are. A meter can be precise (consistent readings) but inaccurate (all readings offset from the true value) - this indicates calibration drift."
  },
  {
    id: "check-3",
    question: "When should test instruments be calibrated?",
    options: [
      "Only when they give obviously wrong readings",
      "Never - factory calibration is permanent",
      "Regularly, typically annually, and after any suspected damage",
      "Every time before use"
    ],
    correctIndex: 2,
    explanation: "Instruments should be calibrated regularly (usually annually) to maintain accuracy. Calibration should also be checked after any impact, environmental exposure, or suspected damage. A current calibration certificate is required for valid test results."
  },
  {
    id: "check-4",
    question: "What type of error is caused by connecting a voltmeter that draws significant current from the circuit?",
    options: [
      "Random error",
      "Loading error",
      "Parallax error",
      "Zero error"
    ],
    correctIndex: 1,
    explanation: "Loading error occurs when the measuring instrument affects the circuit being measured. A voltmeter with insufficiently high resistance draws current, causing a voltage drop that makes the reading lower than the true open-circuit voltage. Modern DMMs have very high input impedance to minimise this."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A resistor is marked as 470 ohms ±5%. What is the acceptable resistance range?",
    options: ["446.5 to 493.5 ohms", "465 to 475 ohms", "447 to 493 ohms", "423 to 517 ohms"],
    correctAnswer: 0,
    explanation: "5% of 470 ohms = 23.5 ohms. The tolerance range is 470 ± 23.5 ohms, giving 446.5 to 493.5 ohms. This is why you might measure a '470 ohm' resistor and get 455 ohms - it's within specification."
  },
  {
    id: 2,
    question: "What does 'resolution' mean for a digital meter?",
    options: [
      "The highest voltage it can measure",
      "The smallest change in input it can display",
      "The accuracy of the reading",
      "The speed of measurement"
    ],
    correctAnswer: 1,
    explanation: "Resolution is the smallest change in measured value that the meter can display - determined by the number of digits. A 4-digit meter showing up to 199.9V has a resolution of 0.1V. Resolution is not the same as accuracy - you might display 0.1V changes but still have ±1V accuracy."
  },
  {
    id: 3,
    question: "A clamp meter reads 10.0A on a known 10.5A load. What is the percentage error?",
    options: ["-5%", "-4.76%", "+5%", "+4.76%"],
    correctAnswer: 1,
    explanation: "Percentage error = ((measured - actual) / actual) x 100 = ((10.0 - 10.5) / 10.5) x 100 = -4.76%. The negative sign indicates the meter reads low. This level of error might indicate the meter needs recalibration."
  },
  {
    id: 4,
    question: "What causes random errors in measurements?",
    options: [
      "Incorrect calibration",
      "Variations in environmental conditions, electrical noise, observer variations",
      "Wrong meter range selection",
      "Damaged test leads"
    ],
    correctAnswer: 1,
    explanation: "Random errors are unpredictable variations caused by factors like temperature fluctuations, electrical noise, vibration, or slight variations in how the operator takes readings. They can be minimised by taking multiple readings and averaging."
  },
  {
    id: 5,
    question: "When measuring the resistance of a component in-circuit, the reading is often:",
    options: [
      "Higher than the actual value",
      "Lower than the actual value due to parallel paths",
      "Always accurate",
      "The same as out-of-circuit"
    ],
    correctAnswer: 1,
    explanation: "In-circuit resistance measurements are affected by parallel paths through other components. These parallel resistances reduce the measured value. For accurate component readings, disconnect at least one terminal to isolate the component."
  },
  {
    id: 6,
    question: "What is a systematic error?",
    options: [
      "An error that occurs randomly",
      "An error that affects all readings consistently in the same direction",
      "An error in the system wiring",
      "An error that cancels out over time"
    ],
    correctAnswer: 1,
    explanation: "Systematic errors consistently affect readings in the same way - for example, a meter that always reads 2% high due to calibration drift. Unlike random errors, systematic errors don't cancel out with repeated measurements. Regular calibration detects and corrects systematic errors."
  },
  {
    id: 7,
    question: "Why might a voltage reading be unstable on a digital meter?",
    options: [
      "The meter is broken",
      "Electrical noise, poor connections, or measuring at the resolution limit",
      "The battery is flat",
      "The display is faulty"
    ],
    correctAnswer: 1,
    explanation: "Unstable readings commonly result from electrical noise on the circuit, poor probe contact, or measurements where the variation is near the meter's resolution limit. Averaging or filtering functions can help stabilise readings in noisy environments."
  },
  {
    id: 8,
    question: "What is the purpose of a proving unit for voltage testers?",
    options: [
      "To charge the tester's battery",
      "To provide a known voltage source for verification",
      "To increase the tester's accuracy",
      "To extend the measurement range"
    ],
    correctAnswer: 1,
    explanation: "A proving unit provides a known safe voltage source to verify your voltage tester is working correctly before and after testing for dead. This is essential for the prove-test-prove sequence - you must confirm your tester can detect voltage before relying on a 'dead' reading."
  },
  {
    id: 9,
    question: "When would temperature affect measurement accuracy?",
    options: [
      "Never - instruments are temperature-compensated",
      "Only in freezing conditions",
      "When operating outside the specified temperature range",
      "Only when measuring temperature"
    ],
    correctAnswer: 2,
    explanation: "All instruments have a specified operating temperature range (often 0-40°C). Outside this range, accuracy degrades as electronic components and resistance values change with temperature. Even within range, extreme temperatures may affect readings slightly."
  },
  {
    id: 10,
    question: "A meter with 4000 counts and maximum display of 399.9V has a resolution of:",
    options: ["1V", "0.1V", "0.01V", "4V"],
    correctAnswer: 1,
    explanation: "The resolution is the smallest displayable change. With a maximum display of 399.9V (4 digits), the last digit represents 0.1V. This is the meter's resolution on the 400V range. Other ranges would have different resolutions."
  }
];

const faqs = [
  {
    question: "How often should I get my test instruments calibrated?",
    answer: "Most instruments require annual calibration for compliance and insurance purposes. However, calibration should also be done after any suspected damage, significant environmental exposure, or if readings seem questionable. Keep calibration certificates as they're required for valid test documentation."
  },
  {
    question: "My two meters give different readings - which one is correct?",
    answer: "Neither may be exactly correct - both have tolerances. If the readings are within both instruments' combined accuracy specifications, they're both potentially valid. For critical measurements, use a recently calibrated instrument. If readings differ significantly, one may need recalibration."
  },
  {
    question: "Does the accuracy specification apply to all ranges?",
    answer: "Not necessarily. Accuracy often varies with range - many meters are most accurate in the middle of their range and less accurate at extremes. Check the manufacturer's specifications for accuracy at different ranges. Generally, select a range where your reading falls in the upper portion for best accuracy."
  },
  {
    question: "Why do insulation resistance readings vary so much?",
    answer: "Insulation resistance is affected by temperature, humidity, contamination, and measurement time. Readings typically increase over time as capacitance charges. Hot, humid conditions reduce readings. For comparable results, standardise test conditions and timing. A polarisation index test (10-minute vs 1-minute ratio) can reveal insulation condition trends."
  },
  {
    question: "What's the difference between error and uncertainty?",
    answer: "Error is the difference between a measured value and the true value - it can only be known if you have a reference standard. Uncertainty is the range within which the true value is expected to lie, accounting for all known sources of error. Properly calibrated instruments come with uncertainty statements for each range."
  }
];

const Level3Module3Section1_4 = () => {
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
            <Link to="../level3-module3-section1">
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
            <span>Module 3.1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Accuracy, Tolerances and Errors
          </h1>
          <p className="text-white/80">
            Understanding measurement reliability and sources of error
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Accuracy:</strong> How close to the true value</li>
              <li><strong>Precision:</strong> How repeatable the readings are</li>
              <li><strong>Resolution:</strong> Smallest displayable change</li>
              <li><strong>Tolerance:</strong> Acceptable variation from nominal value</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Accuracy specs on meters, tolerance bands on components</li>
              <li><strong>Use:</strong> Allow for tolerances in pass/fail decisions</li>
              <li><strong>Apply:</strong> Take multiple readings to reduce random error</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Distinguish between accuracy, precision and resolution",
              "Interpret meter accuracy specifications",
              "Understand component tolerance markings",
              "Identify sources of measurement error",
              "Apply appropriate techniques to minimise errors",
              "Know when calibration is required"
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
            Understanding Accuracy Specifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Meter accuracy is typically specified as a percentage of reading plus a number of digits (or counts). For example, ±(0.5% + 2 digits) means the reading could be off by 0.5% of the displayed value, plus or minus the value of 2 in the last digit position.
            </p>
            <p>
              This two-part specification reflects the reality that errors have different sources. The percentage error scales with the measured value (gain error), while the digits error remains constant regardless of reading (offset error). Both must be considered for the total possible error.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Accuracy vs Resolution vs Precision:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Resolution:</strong> Smallest change the display can show (e.g., 0.1V)</li>
                <li><strong>Accuracy:</strong> How close the reading is to the true value</li>
                <li><strong>Precision:</strong> How consistent repeated readings are</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> High resolution doesn't mean high accuracy. A meter might display 230.00V (0.01V resolution) but only be accurate to ±2V. The extra digits can mislead if you don't check the accuracy specification.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Component Tolerances
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical components are manufactured to specified tolerances. A 1k ohm resistor with ±5% tolerance could actually measure anywhere from 950 to 1050 ohms. Understanding tolerances explains why measured values often differ from marked values - and why circuits are designed with margin.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Resistor Tolerances</p>
                <ul className="text-sm text-white space-y-1">
                  <li>±1% - Precision (brown band)</li>
                  <li>±2% - Precision (red band)</li>
                  <li>±5% - Standard (gold band)</li>
                  <li>±10% - Standard (silver band)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Tolerance</p>
                <ul className="text-sm text-white space-y-1">
                  <li>UK mains: 230V +10% / -6%</li>
                  <li>Upper limit: 253V</li>
                  <li>Lower limit: 216V</li>
                  <li>Equipment must work across this range</li>
                </ul>
              </div>
            </div>

            <p>
              When troubleshooting, remember that components within tolerance are not faulty. A resistor measuring 5% from its marked value is working correctly. Only values outside the specified tolerance indicate a problem.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Sources of Measurement Error
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Measurement errors fall into two categories: systematic errors that consistently affect readings in the same direction, and random errors that cause unpredictable variations. Understanding error sources helps you minimise them and interpret results correctly.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Measuring loop impedance on a hot day, your readings are consistently higher than expected. This is a systematic error - temperature increases conductor resistance. All readings are affected the same way. Compare against BS 7671 values that include temperature correction factors.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Error Sources:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Loading effect:</strong> Meter affects circuit being measured</li>
                <li><strong>Lead resistance:</strong> Test leads add to resistance measurements</li>
                <li><strong>Temperature:</strong> Affects both components and instruments</li>
                <li><strong>Electrical noise:</strong> Causes fluctuating readings</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Minimising Errors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Good measurement practice minimises errors. Select the right instrument, use it correctly, account for known error sources, and maintain regular calibration. When results are critical, take multiple readings and consider whether errors could affect pass/fail decisions.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Before Testing</p>
                <p className="text-white/90 text-xs">Check calibration, zero meters, inspect leads</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">During Testing</p>
                <p className="text-white/90 text-xs">Correct connections, suitable range, stable readings</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">After Testing</p>
                <p className="text-white/90 text-xs">Consider tolerances, verify questionable results</p>
              </div>
            </div>

            <p>
              For borderline pass/fail results, consider the combined uncertainties of your measurement and the specification tolerance. If a loop impedance reading is very close to the maximum allowed, take multiple readings, check temperature conditions, and consider whether measurement uncertainty could push the actual value over the limit.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Pro tip:</strong> Zero your resistance meter with leads connected before measuring low resistances. This compensates for lead resistance, which could otherwise add significant error to readings below a few ohms.
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
                <li>Select a range where your reading is in the upper half for best accuracy</li>
                <li>Allow readings to stabilise before recording</li>
                <li>Note ambient temperature for temperature-sensitive measurements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Interpreting Results</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Consider measurement uncertainty near pass/fail boundaries</li>
                <li>Allow for component tolerances when comparing expected vs measured values</li>
                <li>Multiple readings help identify random errors</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming high resolution means high accuracy</strong> - A 4-digit display doesn't guarantee 4-digit accuracy</li>
                <li><strong>Ignoring lead resistance</strong> - Significant error source for low-resistance measurements</li>
                <li><strong>Using expired calibration</strong> - Results may be invalid for certification purposes</li>
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
                <p className="font-medium text-white mb-1">Error Types</p>
                <ul className="space-y-0.5">
                  <li>Systematic: Consistent offset, calibration drift</li>
                  <li>Random: Unpredictable variations, noise</li>
                  <li>Loading: Meter affects circuit</li>
                  <li>Lead resistance: Adds to R readings</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Tolerance Bands (Resistors)</p>
                <ul className="space-y-0.5">
                  <li>Brown: ±1%</li>
                  <li>Red: ±2%</li>
                  <li>Gold: ±5%</li>
                  <li>Silver: ±10%</li>
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
            <Link to="../level3-module3-section1-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Measurement Instruments
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module3-section1-5">
              Next: SI Units and Conversions
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module3Section1_4;
