import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Units and Measurement - MOET Module 2 Section 1.4";
const DESCRIPTION = "Comprehensive guide to SI units, derived electrical units, prefixes, measurement accuracy, precision, instrument resolution, calibration, and measurement uncertainty for electrical maintenance technicians per BS 7671:2018+A3:2024.";

const quickCheckQuestions = [
  {
    id: "si-base-units",
    question: "Which of the following is an SI base unit (not a derived unit)?",
    options: [
      "Volt",
      "Ohm",
      "Ampere",
      "Watt"
    ],
    correctIndex: 2,
    explanation: "The ampere is one of the seven SI base units. Volts, ohms, and watts are all derived units — they are defined in terms of base units. The volt = kg.m².s-3.A-1, the ohm = kg.m².s-3.A-2, and the watt = kg.m².s-3. The ampere is the base unit from which all other electrical units are derived."
  },
  {
    id: "prefix-conversion",
    question: "Convert 4700 ohms to kilohms:",
    options: [
      "0.47 kilohms",
      "4.7 kilohms",
      "47 kilohms",
      "470 kilohms"
    ],
    correctIndex: 1,
    explanation: "To convert from base units to kilounits, divide by 1000 (or 10^3). So 4700 ohms / 1000 = 4.7 kilohms (4.7 k-ohms). This is a common value for a resistor. On a multimeter, the display might show '4.70 k' on the kilohms range."
  },
  {
    id: "accuracy-precision",
    question: "A multimeter consistently reads 232 V when the true voltage is 230 V. This instrument is:",
    options: [
      "Accurate but not precise",
      "Precise but not accurate",
      "Both accurate and precise",
      "Neither accurate nor precise"
    ],
    correctIndex: 1,
    explanation: "The instrument is precise (it consistently gives the same reading — 232 V every time) but not accurate (the reading is consistently 2 V above the true value). This type of error is called a systematic error or bias. It can often be corrected by calibration. If the instrument gave random readings scattered around 230 V, it would be accurate (on average) but not precise."
  },
  {
    id: "calibration",
    question: "How often should portable electrical test instruments typically be calibrated?",
    options: [
      "Every month",
      "Every 6 months",
      "Annually (every 12 months)",
      "Every 5 years"
    ],
    correctIndex: 2,
    explanation: "The general industry recommendation is annual calibration for portable electrical test instruments. However, the actual interval depends on the frequency of use, the environment, and the criticality of the measurements. GS38 requires that voltage indicators are proved against a known source before and after each use — this is an additional check, not a replacement for formal calibration."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The seven SI base units include all of the following EXCEPT:",
    options: [
      "Metre (length)",
      "Kilogram (mass)",
      "Volt (voltage)",
      "Kelvin (temperature)"
    ],
    correctAnswer: 2,
    explanation: "The seven SI base units are: metre (length), kilogram (mass), second (time), ampere (electric current), kelvin (thermodynamic temperature), mole (amount of substance), and candela (luminous intensity). The volt is a derived unit, defined as kg.m².s-3.A-1."
  },
  {
    id: 2,
    question: "The SI derived unit for electrical resistance (ohm) is equivalent to:",
    options: [
      "Volt per ampere (V/A)",
      "Ampere per volt (A/V)",
      "Watt per ampere (W/A)",
      "Joule per coulomb (J/C)"
    ],
    correctAnswer: 0,
    explanation: "One ohm is defined as the resistance across which one volt produces a current of one ampere. Therefore ohm = V/A. The siemens (unit of conductance) is the reciprocal: S = A/V. The joule per coulomb is the definition of the volt, and the watt per ampere is also the volt (since W = VA, then W/A = V)."
  },
  {
    id: 3,
    question: "The prefix 'mega' (M) represents a factor of:",
    options: [
      "One thousand (10^3)",
      "One million (10^6)",
      "One billion (10^9)",
      "One thousandth (10^-3)"
    ],
    correctAnswer: 1,
    explanation: "Mega (M) = 10^6 = 1,000,000 (one million). In electrical maintenance, megaohms (M-ohm) are used for insulation resistance measurements. A typical healthy circuit should have an insulation resistance of at least 1 M-ohm (1,000,000 ohms) per BS 7671."
  },
  {
    id: 4,
    question: "An insulation resistance reading of 0.5 M-ohms is equivalent to:",
    options: [
      "500 ohms",
      "5000 ohms",
      "50,000 ohms",
      "500,000 ohms"
    ],
    correctAnswer: 3,
    explanation: "0.5 M-ohms = 0.5 x 1,000,000 = 500,000 ohms (500 k-ohms). This reading is below the minimum 1 M-ohm required by BS 7671 for a 230 V circuit, indicating insulation deterioration that requires investigation. The circuit should be coded C1 (danger present) or C2 (potentially dangerous) on an EICR."
  },
  {
    id: 5,
    question: "A multimeter has a resolution of 0.1 V on its 600 V range. This means:",
    options: [
      "It is accurate to 0.1 V",
      "The smallest change in voltage it can detect and display is 0.1 V",
      "It can measure a maximum of 0.1 V",
      "It has an accuracy of 0.1%"
    ],
    correctAnswer: 1,
    explanation: "Resolution is the smallest increment that an instrument can display or detect. A resolution of 0.1 V means the display changes in steps of 0.1 V (e.g., 230.0 V, 230.1 V, 230.2 V). Resolution is NOT the same as accuracy — the displayed value may still be inaccurate by more than 0.1 V due to measurement uncertainty."
  },
  {
    id: 6,
    question: "The correct SI unit for electrical charge is the:",
    options: [
      "Ampere",
      "Coulomb",
      "Electron-volt",
      "Farad"
    ],
    correctAnswer: 1,
    explanation: "The coulomb (C) is the SI unit of electric charge. One coulomb is the charge transferred when one ampere flows for one second (Q = It). The ampere is the unit of current (rate of charge flow), the electron-volt is a unit of energy used in particle physics, and the farad is the unit of capacitance."
  },
  {
    id: 7,
    question: "When recording test results on a BS 7671 schedule of test results, the earth fault loop impedance (Zs) should be recorded in:",
    options: [
      "Milliohms",
      "Ohms",
      "Kilohms",
      "Megaohms"
    ],
    correctAnswer: 1,
    explanation: "Earth fault loop impedance (Zs) is recorded in ohms on the schedule of test results. Typical values range from 0.1 ohm to several ohms depending on the circuit. Using the wrong unit (e.g., recording 0.8 ohms as 800 milliohms without stating 'milliohms') could cause confusion and may invalidate the test record."
  },
  {
    id: 8,
    question: "What is the difference between accuracy and precision in measurement?",
    options: [
      "They mean the same thing",
      "Accuracy is how close to the true value; precision is how repeatable the readings are",
      "Precision is how close to the true value; accuracy is how repeatable the readings are",
      "Accuracy relates to digital instruments; precision relates to analogue instruments"
    ],
    correctAnswer: 1,
    explanation: "Accuracy describes how close a measurement is to the true (actual) value. Precision describes how repeatable or consistent the measurements are — how close repeated readings are to each other. An instrument can be precise (consistent readings) but inaccurate (consistently wrong), or accurate on average but imprecise (scattered readings that average near the true value)."
  },
  {
    id: 9,
    question: "A continuity reading of 0.15 ohms would more appropriately be expressed as:",
    options: [
      "15 milliohms",
      "150 milliohms",
      "1500 milliohms",
      "0.15 kilohms"
    ],
    correctAnswer: 1,
    explanation: "0.15 ohms = 150 milliohms (0.15 x 1000 = 150 m-ohms). Using milliohms for small resistance values provides better clarity and avoids confusion with decimal points. Many modern test instruments display continuity readings in milliohms automatically when the value is below 1 ohm."
  },
  {
    id: 10,
    question: "Calibration traceability means that:",
    options: [
      "The instrument has a serial number",
      "Each calibration is traceable through an unbroken chain of comparisons to a national standard",
      "The calibration certificate includes the technician's name",
      "The instrument was calibrated by the manufacturer"
    ],
    correctAnswer: 1,
    explanation: "Calibration traceability means that the reference standard used to calibrate your instrument has itself been calibrated against a higher-level standard, which in turn has been calibrated against a national standard (maintained by NPL in the UK). This unbroken chain of comparisons ensures that all measurements can be related back to the fundamental SI definitions with known uncertainty."
  },
  {
    id: 11,
    question: "The prefix 'pico' (p) represents:",
    options: [
      "10^-3 (one thousandth)",
      "10^-6 (one millionth)",
      "10^-9 (one billionth)",
      "10^-12 (one trillionth)"
    ],
    correctAnswer: 3,
    explanation: "Pico (p) = 10^-12. While not commonly used in general electrical maintenance, picofarads (pF) are used for very small capacitances in electronic circuits and for cable capacitance measurements. For comparison: pico (10^-12), nano (10^-9), micro (10^-6), milli (10^-3)."
  },
  {
    id: 12,
    question: "A test instrument specification states accuracy as '± 1.5% rdg + 3 digits'. When measuring 200.0 V, the measurement uncertainty is approximately:",
    options: [
      "± 1.5 V",
      "± 3.0 V",
      "± 3.3 V",
      "± 6.0 V"
    ],
    correctAnswer: 2,
    explanation: "The '± 1.5% rdg' part: 1.5% of 200.0 = 3.0 V. The '+ 3 digits' part: 3 x the smallest digit (0.1 V resolution) = 0.3 V. Total uncertainty: ± (3.0 + 0.3) = ± 3.3 V. This means the true voltage lies between 196.7 V and 203.3 V. Understanding instrument specifications is essential for interpreting whether test results meet BS 7671 requirements."
  }
];

const faqs = [
  {
    question: "Why is the ampere a base unit while the volt and ohm are derived units?",
    answer: "The SI system is built on seven base units from which all other units are derived. The ampere was chosen as the electrical base unit because of its precise physical definition (originally based on the force between two parallel current-carrying conductors, now redefined in terms of the elementary charge). The volt is derived from the ampere and other base units (kg, m, s), and the ohm is derived from the volt and ampere (ohm = V/A). This hierarchy ensures consistency across all measurements."
  },
  {
    question: "What is the difference between resolution and accuracy of a test instrument?",
    answer: "Resolution is the smallest change in measured value that the instrument can detect and display. Accuracy is how close the displayed value is to the true value. An instrument can have high resolution (e.g., display to 0.01 V) but poor accuracy (e.g., ± 2% of reading). Conversely, a low-resolution instrument can still be accurate. For maintenance measurements, you need both adequate resolution and acceptable accuracy to make reliable decisions about circuit safety."
  },
  {
    question: "How do I know which unit to use when recording measurements?",
    answer: "BS 7671 test certificates and schedules of test results specify the units for each measurement. Follow these conventions: continuity (R1+R2) in ohms, insulation resistance in megaohms (M-ohm), earth fault loop impedance (Zs) in ohms, prospective fault current (Ipf) in kA, and RCD operating time in milliseconds (ms). Using the wrong unit or prefix can invalidate the test record and may have serious legal implications."
  },
  {
    question: "What does 'UKAS accredited calibration' mean?",
    answer: "UKAS (United Kingdom Accreditation Service) accredits calibration laboratories to international standard ISO/IEC 17025. A UKAS accredited calibration certificate demonstrates that the calibration was performed by a competent laboratory using traceable reference standards, within a quality management system, and with stated measurement uncertainty. While not legally required for all test instruments, UKAS calibration provides the highest confidence in measurement accuracy and is recommended for instruments used for safety-critical testing."
  },
  {
    question: "Why do we use different test voltages for insulation resistance testing?",
    answer: "BS 7671 Table 6.2 specifies different test voltages depending on the circuit voltage: 250 V DC for SELV and PELV circuits (nominal up to 50 V), 500 V DC for LV circuits up to 500 V (including standard 230 V circuits), and 1000 V DC for circuits above 500 V up to 1000 V. Higher circuit voltages require higher test voltages because the insulation must withstand greater electrical stress in service. Testing at too low a voltage might not detect insulation weakness that would break down at the working voltage."
  }
];

const MOETModule2Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section1">
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
            <Shield className="h-4 w-4" />
            <span>Module 2.1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Units and Measurement
          </h1>
          <p className="text-white/80">
            SI units, instrument accuracy, calibration and measurement practice for maintenance technicians
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>SI system:</strong> 7 base units — ampere is the electrical base unit</li>
              <li className="pl-1"><strong>Prefixes:</strong> pico (10^-12) to mega (10^6) — critical for correct recording</li>
              <li className="pl-1"><strong>Accuracy vs precision:</strong> Closeness to truth vs repeatability of readings</li>
              <li className="pl-1"><strong>Calibration:</strong> Annual for portable instruments, traceable to national standards</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Continuity:</strong> milliohms (m-ohms) for short runs, ohms for circuits</li>
              <li className="pl-1"><strong>Insulation:</strong> Megaohms (M-ohms) — minimum 1 M-ohm per BS 7671</li>
              <li className="pl-1"><strong>RCD trip:</strong> Milliamperes (mA) — typically 30 mA rated</li>
              <li className="pl-1"><strong>ST1426:</strong> Correct measurement and recording of test results</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the seven SI base units and explain why the ampere is the electrical base unit",
              "Define the derived SI units for voltage, resistance, power, energy and charge",
              "Apply SI prefixes correctly from pico to mega in measurement and recording",
              "Distinguish between accuracy, precision, and resolution in test instruments",
              "Explain calibration traceability and its importance for electrical testing",
              "Record measurements with correct units on BS 7671 test certificates"
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

        {/* Section 01: SI Base Units */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The International System of Units (SI)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The International System of Units (SI — from the French 'Systeme International d'Unites') is
              the globally agreed standard for measurement. It is built on seven base units from which all
              other units are derived. Understanding this system is essential for interpreting specifications,
              recording test results, and communicating measurements unambiguously.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Seven SI Base Units</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Quantity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Unit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Symbol</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Relevance to Electrical Work</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Length</td>
                      <td className="border border-white/10 px-3 py-2">Metre</td>
                      <td className="border border-white/10 px-3 py-2">m</td>
                      <td className="border border-white/10 px-3 py-2">Cable lengths, conductor dimensions</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mass</td>
                      <td className="border border-white/10 px-3 py-2">Kilogram</td>
                      <td className="border border-white/10 px-3 py-2">kg</td>
                      <td className="border border-white/10 px-3 py-2">Equipment weight, cable mass per metre</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Time</td>
                      <td className="border border-white/10 px-3 py-2">Second</td>
                      <td className="border border-white/10 px-3 py-2">s</td>
                      <td className="border border-white/10 px-3 py-2">Disconnection times, frequency (Hz = 1/s)</td>
                    </tr>
                    <tr className="bg-elec-yellow/5">
                      <td className="border border-white/10 px-3 py-2 font-medium">Electric current</td>
                      <td className="border border-white/10 px-3 py-2 font-medium">Ampere</td>
                      <td className="border border-white/10 px-3 py-2 font-medium">A</td>
                      <td className="border border-white/10 px-3 py-2 font-medium">The electrical base unit — all electrical derived units stem from this</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Temperature</td>
                      <td className="border border-white/10 px-3 py-2">Kelvin</td>
                      <td className="border border-white/10 px-3 py-2">K</td>
                      <td className="border border-white/10 px-3 py-2">Temperature correction factors, derating</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Amount of substance</td>
                      <td className="border border-white/10 px-3 py-2">Mole</td>
                      <td className="border border-white/10 px-3 py-2">mol</td>
                      <td className="border border-white/10 px-3 py-2">Material science (rarely used directly)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Luminous intensity</td>
                      <td className="border border-white/10 px-3 py-2">Candela</td>
                      <td className="border border-white/10 px-3 py-2">cd</td>
                      <td className="border border-white/10 px-3 py-2">Lighting design and measurement</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Derived Units for Electrical Quantities</p>
              <p className="text-sm text-white mb-3">
                All electrical units except the ampere are derived from combinations of base units:
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Quantity</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Unit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Symbol</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Equivalent</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage</td>
                      <td className="border border-white/10 px-3 py-2">Volt</td>
                      <td className="border border-white/10 px-3 py-2">V</td>
                      <td className="border border-white/10 px-3 py-2">W/A = J/C = kg.m².s-3.A-1</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Resistance</td>
                      <td className="border border-white/10 px-3 py-2">Ohm</td>
                      <td className="border border-white/10 px-3 py-2">ohm</td>
                      <td className="border border-white/10 px-3 py-2">V/A = kg.m².s-3.A-2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power</td>
                      <td className="border border-white/10 px-3 py-2">Watt</td>
                      <td className="border border-white/10 px-3 py-2">W</td>
                      <td className="border border-white/10 px-3 py-2">V.A = J/s = kg.m².s-3</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy</td>
                      <td className="border border-white/10 px-3 py-2">Joule</td>
                      <td className="border border-white/10 px-3 py-2">J</td>
                      <td className="border border-white/10 px-3 py-2">W.s = V.A.s = kg.m².s-2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Charge</td>
                      <td className="border border-white/10 px-3 py-2">Coulomb</td>
                      <td className="border border-white/10 px-3 py-2">C</td>
                      <td className="border border-white/10 px-3 py-2">A.s</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Capacitance</td>
                      <td className="border border-white/10 px-3 py-2">Farad</td>
                      <td className="border border-white/10 px-3 py-2">F</td>
                      <td className="border border-white/10 px-3 py-2">C/V = A².s4.kg-1.m-2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Inductance</td>
                      <td className="border border-white/10 px-3 py-2">Henry</td>
                      <td className="border border-white/10 px-3 py-2">H</td>
                      <td className="border border-white/10 px-3 py-2">V.s/A = kg.m².s-2.A-2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Frequency</td>
                      <td className="border border-white/10 px-3 py-2">Hertz</td>
                      <td className="border border-white/10 px-3 py-2">Hz</td>
                      <td className="border border-white/10 px-3 py-2">s-1 (cycles per second)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Conductance</td>
                      <td className="border border-white/10 px-3 py-2">Siemens</td>
                      <td className="border border-white/10 px-3 py-2">S</td>
                      <td className="border border-white/10 px-3 py-2">A/V = 1/ohm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> While you do not need to memorise the base-unit derivations,
              understanding that electrical units are interconnected helps you verify calculations and
              catch unit errors. For example, knowing that watts = volts x amperes provides an instant
              check: if someone claims a 230 V, 10 A circuit draws 2300 W, you know that is correct
              because V x A = W.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: SI Prefixes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            SI Prefixes and Unit Conversion
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              SI prefixes allow us to express very large or very small quantities in a manageable form.
              In electrical maintenance, you regularly work across a range of magnitudes — from picofarads
              of capacitance to megaohms of insulation resistance. Correct use of prefixes is essential
              to avoid errors that could have serious safety consequences.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Complete SI Prefix Table for Electrical Maintenance</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Prefix</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Symbol</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Electrical Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mega</td>
                      <td className="border border-white/10 px-3 py-2">M</td>
                      <td className="border border-white/10 px-3 py-2">10^6</td>
                      <td className="border border-white/10 px-3 py-2">Insulation resistance: 200 M-ohm</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Kilo</td>
                      <td className="border border-white/10 px-3 py-2">k</td>
                      <td className="border border-white/10 px-3 py-2">10^3</td>
                      <td className="border border-white/10 px-3 py-2">Power: 3 kW, fault current: 16 kA</td>
                    </tr>
                    <tr className="bg-elec-yellow/5">
                      <td className="border border-white/10 px-3 py-2">(Base unit)</td>
                      <td className="border border-white/10 px-3 py-2">—</td>
                      <td className="border border-white/10 px-3 py-2">10^0</td>
                      <td className="border border-white/10 px-3 py-2">230 V, 13 A, 50 Hz</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Milli</td>
                      <td className="border border-white/10 px-3 py-2">m</td>
                      <td className="border border-white/10 px-3 py-2">10^-3</td>
                      <td className="border border-white/10 px-3 py-2">RCD current: 30 mA, trip time: 25 ms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Micro</td>
                      <td className="border border-white/10 px-3 py-2">mu</td>
                      <td className="border border-white/10 px-3 py-2">10^-6</td>
                      <td className="border border-white/10 px-3 py-2">PFC capacitors: 25 muF</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Nano</td>
                      <td className="border border-white/10 px-3 py-2">n</td>
                      <td className="border border-white/10 px-3 py-2">10^-9</td>
                      <td className="border border-white/10 px-3 py-2">Small capacitors: 100 nF</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pico</td>
                      <td className="border border-white/10 px-3 py-2">p</td>
                      <td className="border border-white/10 px-3 py-2">10^-12</td>
                      <td className="border border-white/10 px-3 py-2">Cable capacitance: 100 pF/m</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Unit Conversion Rules</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Moving to a larger prefix:</strong> Divide. Example: 4700 ohms to kilohms = 4700 / 1000 = 4.7 k-ohms</li>
                <li className="pl-1"><strong>Moving to a smaller prefix:</strong> Multiply. Example: 0.03 A to milliamps = 0.03 x 1000 = 30 mA</li>
                <li className="pl-1"><strong>Between prefixes:</strong> Convert to base unit first, then to target prefix. Example: 2200 microfarads to millifarads = 2200 / 1000 = 2.2 mF</li>
                <li className="pl-1"><strong>Key rule:</strong> Each prefix step (e.g., milli to micro) is a factor of 1000</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Warning: Case Sensitivity</p>
              <p className="text-sm text-white">
                SI prefix symbols are case-sensitive. Confusing upper and lower case can change the meaning
                by a factor of one billion: <strong>m</strong> = milli (10^-3) but <strong>M</strong> = mega
                (10^6). Writing 'm-ohm' (milliohm) when you mean 'M-ohm' (megaohm) is a nine-order-of-magnitude
                error. Similarly, <strong>k</strong> = kilo but <strong>K</strong> = kelvin (temperature). Always
                write prefix symbols exactly as defined: k (lower case) for kilo, M (upper case) for mega.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance application:</strong> When recording insulation resistance on an EICR
              schedule of test results, the value is expressed in M-ohms (megaohms). A reading of 200
              M-ohms means 200,000,000 ohms. If you accidentally record it as 200 m-ohms (milliohms =
              0.2 ohms), this would indicate a catastrophic insulation failure. Always check the prefix
              on your instrument display matches what you write on the certificate.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Accuracy, Precision and Resolution */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Accuracy, Precision and Resolution
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When using test instruments, it is important to understand what the readings actually mean
              in terms of confidence. Three key concepts define the quality of a measurement: accuracy,
              precision, and resolution. Confusing these can lead to overconfidence in readings that may
              not be as reliable as they appear.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Accuracy</h3>
                <p className="text-sm text-white">
                  Accuracy describes how close a measurement is to the true (actual) value. An accurate
                  instrument gives readings that are close to reality. Accuracy is limited by systematic
                  errors (bias) which can be reduced by calibration. For a multimeter, accuracy is typically
                  specified as '± X% of reading + Y digits' — for example '± 0.5% rdg + 2 digits'.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Precision (Repeatability)</h3>
                <p className="text-sm text-white">
                  Precision describes how consistent or repeatable measurements are. A precise instrument
                  gives very similar readings when measuring the same quantity multiple times. An instrument
                  can be precise (readings always close together) but inaccurate (readings consistently
                  offset from the true value). Precision is limited by random errors such as electrical
                  noise, temperature fluctuations, and contact resistance.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Resolution</h3>
                <p className="text-sm text-white">
                  Resolution is the smallest change in the measured quantity that the instrument can detect
                  and display. On a digital multimeter, it is determined by the number of counts on the
                  display. A 4000-count meter on the 400 V range has a resolution of 0.1 V. A 6000-count
                  meter on the same range has a resolution of approximately 0.07 V. Higher resolution does
                  not necessarily mean higher accuracy — the extra decimal places may not be meaningful.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Significant Figures in Measurement</p>
              <p className="text-sm text-white mb-3">
                The number of significant figures in a measurement should reflect the accuracy of the
                instrument and the meaningfulness of the reading:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Record only as many figures as the instrument accuracy justifies</li>
                <li className="pl-1">A voltage reading of 231.4 V implies accuracy to 0.1 V — only valid if the instrument specification supports this</li>
                <li className="pl-1">For most maintenance measurements, 3-4 significant figures are appropriate</li>
                <li className="pl-1">When performing calculations with measured values, the result cannot be more accurate than the least accurate input</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> When comparing a measured value against a BS 7671 maximum
              (such as Zs), you must account for instrument accuracy. If the maximum Zs for a circuit
              is 1.37 ohms and your instrument reads 1.30 ohms with an accuracy of ± 5%, the actual
              value could be as high as 1.365 ohms — dangerously close to the limit. BS 7671 Guidance
              Note 3 recommends applying a rule-of-thumb correction to account for this uncertainty.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Calibration and Traceability */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Calibration and Traceability
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Calibration is the process of comparing an instrument's readings against a known reference
              standard and adjusting or documenting any deviation. Without regular calibration, there is
              no assurance that your test results are reliable. Unreliable test results can lead to
              dangerous installations being certified as safe, or safe installations being unnecessarily
              condemned.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Calibration Chain</p>
              <p className="text-sm text-white mb-3">
                Calibration traceability means that every instrument in the measurement chain can be
                traced back to a national standard through an unbroken series of comparisons:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Level 1 — National standard:</strong> Maintained by the National Physical Laboratory (NPL) in the UK. Defines the fundamental SI units with the highest accuracy</li>
                <li className="pl-1"><strong>Level 2 — Reference standard:</strong> Calibrated against the national standard. Held by UKAS-accredited calibration laboratories</li>
                <li className="pl-1"><strong>Level 3 — Working standard:</strong> Calibrated against the reference standard. Used by calibration service providers</li>
                <li className="pl-1"><strong>Level 4 — Your instrument:</strong> Calibrated against the working standard. The calibration certificate records any deviation and uncertainty</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calibration Requirements for Electrical Test Instruments</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Instrument</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Calibration Interval</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Additional Checks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Multifunction tester (MFT)</td>
                      <td className="border border-white/10 px-3 py-2">12 months</td>
                      <td className="border border-white/10 px-3 py-2">Check leads for damage before each use</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Digital multimeter</td>
                      <td className="border border-white/10 px-3 py-2">12 months</td>
                      <td className="border border-white/10 px-3 py-2">Verify against known source periodically</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Voltage indicator (VI)</td>
                      <td className="border border-white/10 px-3 py-2">12 months</td>
                      <td className="border border-white/10 px-3 py-2">Prove before and after each use (GS38)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Clamp meter</td>
                      <td className="border border-white/10 px-3 py-2">12 months</td>
                      <td className="border border-white/10 px-3 py-2">Zero check before each use</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">PAT tester</td>
                      <td className="border border-white/10 px-3 py-2">12 months</td>
                      <td className="border border-white/10 px-3 py-2">Use check box to verify operation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Measurement Uncertainty</p>
              <p className="text-sm text-white">
                Every measurement has an associated uncertainty — a range within which the true value lies.
                Calibration certificates state this as '± X at 95% confidence level'. For a multifunction
                tester measuring loop impedance, the uncertainty might be ± 5%. This means that a reading
                of 1.00 ohm could actually be anywhere between 0.95 and 1.05 ohms. When comparing
                test results against maximum values in BS 7671, you must account for this uncertainty to
                ensure the installation is genuinely safe, not just apparently safe.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance application:</strong> Keep your instruments within their calibration
              date. If an instrument is out of calibration and you use it to certify an installation,
              the results may be challenged legally in the event of an incident. Many employers and
              certification bodies require sight of a current calibration certificate before accepting
              test results. Store calibration certificates securely and check the due date before starting
              any testing work.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05: Practical Measurements in Maintenance */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Common Measurements in Electrical Maintenance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              As a maintenance technician, you will perform a range of electrical measurements during
              inspections, testing, commissioning, and fault-finding. Each measurement has specific
              requirements for instruments, connection methods, test voltages, and units of recording.
              BS 7671 Chapter 6 and Guidance Note 3 provide the authoritative requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Summary of Key Maintenance Measurements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Measurement</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Unit</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Range</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Instrument</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Continuity (R1+R2)</td>
                      <td className="border border-white/10 px-3 py-2">Ohms (or m-ohms)</td>
                      <td className="border border-white/10 px-3 py-2">0.01 to 2.0 ohms</td>
                      <td className="border border-white/10 px-3 py-2">Low-resistance ohmmeter (MFT)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Insulation resistance</td>
                      <td className="border border-white/10 px-3 py-2">M-ohms (megaohms)</td>
                      <td className="border border-white/10 px-3 py-2">1 to 200+ M-ohms</td>
                      <td className="border border-white/10 px-3 py-2">Insulation tester at 500 V DC (MFT)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Earth fault loop impedance (Zs)</td>
                      <td className="border border-white/10 px-3 py-2">Ohms</td>
                      <td className="border border-white/10 px-3 py-2">0.1 to 5.0 ohms</td>
                      <td className="border border-white/10 px-3 py-2">Loop impedance tester (MFT)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Prospective fault current (Ipf)</td>
                      <td className="border border-white/10 px-3 py-2">kA (kiloamperes)</td>
                      <td className="border border-white/10 px-3 py-2">0.5 to 16+ kA</td>
                      <td className="border border-white/10 px-3 py-2">PFC tester (MFT)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">RCD operating time</td>
                      <td className="border border-white/10 px-3 py-2">Milliseconds (ms)</td>
                      <td className="border border-white/10 px-3 py-2">10 to 300 ms</td>
                      <td className="border border-white/10 px-3 py-2">RCD tester (MFT)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Supply voltage</td>
                      <td className="border border-white/10 px-3 py-2">Volts (V)</td>
                      <td className="border border-white/10 px-3 py-2">216 to 253 V (single-phase)</td>
                      <td className="border border-white/10 px-3 py-2">Approved voltage indicator (GS38)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Load current</td>
                      <td className="border border-white/10 px-3 py-2">Amperes (A)</td>
                      <td className="border border-white/10 px-3 py-2">0.5 to 100+ A</td>
                      <td className="border border-white/10 px-3 py-2">Clamp meter or ammeter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recording Results on Test Certificates</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Always use the units specified on the form — do not convert to different prefixes</li>
                <li className="pl-1">Write clearly and unambiguously — a poorly written '4.7' could be read as '47'</li>
                <li className="pl-1">Include the test instrument serial number and calibration date on the certificate</li>
                <li className="pl-1">If a reading exceeds the instrument range, note '&gt;XXX' rather than leaving blank</li>
                <li className="pl-1">Record ambient temperature at the time of testing — this affects loop impedance and resistance readings</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">GS38 — Electrical Test Equipment for Use on Low Voltage</h3>
              <p className="text-sm text-white mb-2">
                GS38 (published by the HSE) provides specific guidance on the selection and use of
                voltage indicators and test equipment for low voltage work:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Voltage indicators must have clearly marked voltage ranges</li>
                <li className="pl-1">Test leads must have finger guards, fused tips, and limited exposed conductor (maximum 4 mm)</li>
                <li className="pl-1">Proving units must provide a voltage within the range of the indicator to confirm correct operation</li>
                <li className="pl-1">The prove-test-prove sequence must be followed every time you prove dead</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Correct measurement technique and accurate recording of test
              results are core competences for the maintenance technician standard. During the end-point
              assessment, you will be expected to demonstrate that you can select appropriate instruments,
              perform measurements safely and accurately, and record results in the correct format with
              the correct units.
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
                <p className="font-medium text-white mb-1">SI Prefixes (Largest to Smallest)</p>
                <ul className="space-y-0.5">
                  <li>Mega (M) = 10^6 — e.g., M-ohm</li>
                  <li>Kilo (k) = 10^3 — e.g., kW, kA</li>
                  <li>Base unit = 10^0 — e.g., V, A, ohm</li>
                  <li>Milli (m) = 10^-3 — e.g., mA, ms</li>
                  <li>Micro (mu) = 10^-6 — e.g., muF</li>
                  <li>Nano (n) = 10^-9 — e.g., nF</li>
                  <li>Pico (p) = 10^-12 — e.g., pF</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key References</p>
                <ul className="space-y-0.5">
                  <li>BS 7671:2018+A3:2024 — Chapter 6, test requirements</li>
                  <li>GS38 — Voltage indicator requirements</li>
                  <li>BS EN 61557 — Electrical safety test instruments</li>
                  <li>ISO/IEC 17025 — Calibration laboratory standard</li>
                  <li>NPL — National Physical Laboratory (UK standards)</li>
                  <li>ST1426 — Measurement and recording KSBs</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section1-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Energy and Efficiency
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module2-section1-5">
              Next: Electrical Symbols and Conventions
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule2Section1_4;
