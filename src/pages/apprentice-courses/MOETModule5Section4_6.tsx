import { ArrowLeft, Gauge, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Calibration of Process Instruments - MOET Module 5 Section 4.6";
const DESCRIPTION = "Comprehensive guide to calibration principles, five-point checks, traceability, calibration equipment and documentation for process instruments used in industrial control systems under ST1426.";

const quickCheckQuestions = [
  {
    id: "qc1",
    question: "What is calibration?",
    options: [
      "Replacing a faulty instrument",
      "Comparing an instrument's reading against a known reference standard and adjusting if necessary",
      "Cleaning the instrument",
      "Installing a new instrument"
    ],
    correctIndex: 1,
    explanation: "Calibration compares the instrument under test (IUT) against a traceable reference standard of known accuracy, and adjusts the IUT if the deviation exceeds the acceptable tolerance."
  },
  {
    id: "qc2",
    question: "What does 'traceability' mean in calibration?",
    options: [
      "Being able to trace the instrument's location",
      "An unbroken chain of comparisons linking the instrument to national/international measurement standards",
      "The ability to track who performed the calibration",
      "Having a serial number on the instrument"
    ],
    correctIndex: 1,
    explanation: "Traceability ensures that each calibration reference standard has itself been calibrated against a higher-level standard, ultimately traceable to national standards (e.g. NPL, NIST)."
  },
  {
    id: "qc3",
    question: "What is the typical accuracy ratio between a reference standard and the instrument under test?",
    options: [
      "1:1",
      "2:1",
      "4:1 or better",
      "10:1 minimum"
    ],
    correctIndex: 2,
    explanation: "The 4:1 accuracy ratio (TUR -- Test Uncertainty Ratio) means the reference standard should be at least four times more accurate than the instrument being calibrated."
  },
  {
    id: "qc4",
    question: "What is 'as-found' data in calibration?",
    options: [
      "The data from when the instrument was first manufactured",
      "The readings recorded before any adjustments are made",
      "The data recorded after calibration adjustments",
      "The instrument's nameplate data"
    ],
    correctIndex: 1,
    explanation: "As-found data records the instrument's actual readings at each test point before any adjustments are made. This shows how much the instrument has drifted since its last calibration."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is a five-point calibration check?",
    options: ["Checking five different instruments", "Checking the instrument at 0%, 25%, 50%, 75%, and 100% of range in both ascending and descending directions", "Checking five parameters simultaneously", "A five-minute quick test"],
    correctAnswer: 1,
    explanation: "A five-point check tests the instrument at five evenly spaced points across its range, both ascending (up-scale) and descending (down-scale), to identify linearity errors and hysteresis."
  },
  {
    id: 2,
    question: "What is hysteresis in an instrument?",
    options: ["The instrument drifting over time", "A difference in reading at the same input value depending on whether the input is increasing or decreasing", "The instrument responding too slowly", "The instrument reading fluctuating randomly"],
    correctAnswer: 1,
    explanation: "Hysteresis is the difference in the instrument's output at the same input value when approached from the ascending direction versus the descending direction, caused by friction or elastic effects."
  },
  {
    id: 3,
    question: "What is the purpose of a calibration certificate?",
    options: ["To prove the instrument was purchased legitimately", "To document the as-found and as-left readings, reference standards used, environmental conditions, and traceability", "To calculate the instrument's remaining lifespan", "To authorise the instrument for use in a specific country"],
    correctAnswer: 1,
    explanation: "The calibration certificate provides documented evidence of the calibration including as-found/as-left data, reference standards used (with traceability), environmental conditions, date, and the calibrating technician."
  },
  {
    id: 4,
    question: "A pressure transmitter has a range of 0-10 bar and an accuracy specification of plus/minus 0.25% of span. What is the maximum allowable error?",
    options: ["0.25 bar", "0.025 bar", "0.0025 bar", "2.5 bar"],
    correctAnswer: 1,
    explanation: "0.25% of 10 bar span = 0.025 bar. The instrument reading at any point in the range should not deviate from the true value by more than 0.025 bar."
  },
  {
    id: 5,
    question: "What is a deadweight tester used for?",
    options: ["Testing the weight of instruments", "Generating precise, known pressures for calibrating pressure instruments", "Measuring dead load on structures", "Testing valve actuation force"],
    correctAnswer: 1,
    explanation: "A deadweight tester generates precise pressures by placing calibrated weights on a piston of known area. Pressure = Force/Area. It is a primary standard for pressure calibration."
  },
  {
    id: 6,
    question: "When calibrating a thermocouple, what reference device would you typically use?",
    options: ["A multimeter", "A calibrated dry-block temperature source or liquid bath with a reference PRT (Platinum Resistance Thermometer)", "A standard thermometer from a hardware shop", "An infrared thermometer"],
    correctAnswer: 1,
    explanation: "Calibrated dry-block sources or stirred liquid baths provide stable, known temperatures. A reference PRT provides the traceable temperature measurement against which the thermocouple is compared."
  },
  {
    id: 7,
    question: "What does UKAS accreditation mean for a calibration laboratory?",
    options: ["The lab is university-based", "The lab has been independently assessed and meets ISO/IEC 17025 requirements for competence in calibration", "The lab only calibrates UK-made instruments", "The lab is government-owned"],
    correctAnswer: 1,
    explanation: "UKAS (United Kingdom Accreditation Service) accreditation confirms the laboratory meets the requirements of ISO/IEC 17025, providing confidence in the competence, impartiality, and consistency of their calibration results."
  },
  {
    id: 8,
    question: "What is the recommended calibration interval for critical process instruments?",
    options: ["Only when they fail", "As determined by risk assessment, historical drift data, and the consequences of out-of-tolerance operation", "Exactly once per year for all instruments", "Every five years as standard"],
    correctAnswer: 1,
    explanation: "Calibration intervals should be optimised based on instrument type, historical drift trends, operating conditions, criticality to safety/quality, and the consequences of out-of-tolerance readings."
  },
  {
    id: 9,
    question: "What is a loop calibration?",
    options: ["Calibrating each component separately", "Calibrating the entire measurement loop from sensor through to the displayed/recorded value, including the transmitter, wiring, and receiving instrument", "Calibrating in a circular pattern", "Testing the control loop response"],
    correctAnswer: 1,
    explanation: "Loop calibration tests the entire measurement chain end-to-end, verifying that a known input at the sensor produces the correct reading at the display/recorder/controller, accounting for all components in the loop."
  },
  {
    id: 10,
    question: "What is the difference between calibration and adjustment?",
    options: ["They are the same thing", "Calibration compares readings against a standard; adjustment physically changes the instrument settings to correct errors", "Adjustment is done first, then calibration", "Calibration is only done in laboratories"],
    correctAnswer: 1,
    explanation: "Calibration is the comparison and documentation process. Adjustment is the physical act of changing settings to correct errors. Calibration can be performed without adjustment if the instrument is within tolerance."
  },
  {
    id: 11,
    question: "What environmental conditions most significantly affect calibration accuracy?",
    options: ["Lighting conditions", "Temperature of the reference standard and instrument under test", "The colour of the instrument", "The time of day"],
    correctAnswer: 1,
    explanation: "Temperature is the most significant environmental factor. Both the reference standard and the instrument under test are affected. Calibrations should be performed in controlled conditions (typically 20-23 degrees C) or with corrections applied."
  },
  {
    id: 12,
    question: "Why must digital instruments still be calibrated?",
    options: ["They do not need calibration", "While digital instruments do not suffer mechanical drift, sensors, signal conditioning, and A/D converters can still drift", "Only for regulatory compliance", "Only if they display incorrect units"],
    correctAnswer: 1,
    explanation: "Digital instruments still have analogue sensor elements and signal conditioning that can drift. The sensor/input stage is the primary source of drift and must be periodically checked against traceable standards."
  }
];

const faqs = [
  {
    question: "What is the difference between calibration and adjustment?",
    answer: "Calibration is the process of comparing the instrument against a reference standard and documenting the results. Adjustment is the physical act of changing the instrument's settings to correct any errors found. Calibration can be performed without adjustment -- if the instrument is within tolerance, only the as-found data is recorded. Adjustment is only performed if the instrument is out of tolerance."
  },
  {
    question: "How do I determine the correct calibration interval?",
    answer: "Start with the manufacturer's recommendation and adjust based on: historical drift data (how much the instrument drifts between calibrations), the consequences of out-of-tolerance readings (safety, quality, environmental), operating conditions (vibration, temperature, corrosion), and reliability requirements. Intervals are typically extended if drift is consistently small and shortened if drift approaches tolerance limits."
  },
  {
    question: "What environmental conditions affect calibration accuracy?",
    answer: "Temperature is the most significant factor -- both the reference standard and the instrument under test are affected. Humidity, atmospheric pressure, vibration, and electrical interference can also affect results. Calibrations should be performed in controlled conditions (typically 20-23 degrees C, 40-60% RH) or with corrections applied for environmental deviations."
  },
  {
    question: "Do I need to calibrate digital instruments?",
    answer: "Yes. While digital instruments do not suffer from mechanical drift in the same way as analogue instruments, the sensors, signal conditioning, and A/D converters can still drift. Digital instruments should be calibrated at defined intervals, with the sensor/input stage being the primary source of drift."
  },
  {
    question: "What is the difference between individual instrument calibration and loop calibration?",
    answer: "Individual calibration tests a single instrument in isolation against a reference standard. Loop calibration tests the entire measurement chain from sensor input to final display, verifying that the combined errors of all components in the loop are within the acceptable loop tolerance. Both types are needed for a complete calibration programme."
  }
];

const MOETModule5Section4_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section4">
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
            <span>Module 5.4.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Calibration of Process Instruments
          </h1>
          <p className="text-white/80">
            Principles, procedures, equipment and documentation for instrument calibration
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Calibration:</strong> Compare instrument against traceable reference standard</li>
              <li className="pl-1"><strong>TUR 4:1:</strong> Reference must be 4x more accurate than instrument</li>
              <li className="pl-1"><strong>Five-point check:</strong> 0%, 25%, 50%, 75%, 100% up and down</li>
              <li className="pl-1"><strong>Documentation:</strong> As-found and as-left readings with traceability</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>ISO/IEC 17025:</strong> Laboratory competence standard for calibration</li>
              <li className="pl-1"><strong>UKAS:</strong> UK accreditation body for calibration laboratories</li>
              <li className="pl-1"><strong>Drift monitoring:</strong> As-found data enables interval optimisation</li>
              <li className="pl-1"><strong>Loop calibration:</strong> End-to-end testing of entire measurement chain</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define calibration, traceability, and the test uncertainty ratio (TUR)",
              "Perform a five-point ascending/descending calibration check",
              "Identify common calibration equipment for pressure, temperature, and electrical signals",
              "Record as-found and as-left data and complete calibration documentation",
              "Explain hysteresis, linearity errors, and drift and their impact on measurement accuracy",
              "Determine appropriate calibration intervals based on risk and drift data"
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
            Calibration Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Calibration is the process of comparing an instrument's measurements against a <strong>traceable reference
              standard</strong> of known accuracy, and adjusting the instrument if the deviation exceeds the acceptable
              tolerance. Traceability means an unbroken chain of comparisons linking the working reference instrument
              through higher-level standards to national measurement institutes such as NPL (UK) or NIST (USA).
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Test Uncertainty Ratio (TUR)</p>
              <p className="text-sm text-white mb-3">
                The TUR defines the accuracy relationship between the reference standard and the instrument under test.
                A TUR of 4:1 or better is the widely accepted minimum:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">The reference standard should be at least 4x more accurate than the instrument</li>
                <li className="pl-1">Higher TURs provide greater confidence in the calibration result</li>
                <li className="pl-1">If the TUR cannot be achieved, the measurement uncertainty must be considered carefully</li>
                <li className="pl-1">The TUR requirement drives the selection and maintenance of reference standards</li>
              </ul>
            </div>

            <p>
              Calibration results are documented on a <strong>calibration certificate</strong> which records: the instrument
              identification, the reference standards used (with their calibration due dates), environmental conditions,
              as-found readings, any adjustments made, as-left readings, the pass/fail determination, and the technician's
              signature. This documentation is essential for quality management systems (ISO 9001) and regulatory compliance.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Without traceability, a calibration has no demonstrated validity. Always verify
              that your reference standards are within their calibration due dates before using them.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Five-Point Calibration Check
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A standard calibration procedure tests the instrument at five evenly spaced points across its range:
              <strong> 0%, 25%, 50%, 75%, and 100%</strong>. The input is applied in the ascending direction (0% to 100%),
              then in the descending direction (100% to 0%), recording the instrument's output at each point in both directions.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Three Types of Error Revealed</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Zero error:</strong> An offset that shifts all readings by a constant amount -- corrected by zero adjustment</li>
                <li className="pl-1"><strong>Span error:</strong> The sensitivity is incorrect, causing increasing error at higher readings -- corrected by span adjustment</li>
                <li className="pl-1"><strong>Linearity error:</strong> The relationship between input and output is not a straight line, with varying error across the range -- requires multi-point characterisation</li>
              </ul>
              <p className="text-sm text-white mt-3">
                Comparing ascending and descending readings reveals <strong>hysteresis</strong> -- the lag between readings
                at the same input depending on the direction of approach. Excessive hysteresis indicates mechanical wear,
                friction, or elastic deformation in the sensor.
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example: 4-20 mA Pressure Transmitter (0-10 bar)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Test Point</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Pressure (bar)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Expected Output (mA)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">0%</td><td className="border border-white/10 px-3 py-2">0.0</td><td className="border border-white/10 px-3 py-2">4.00</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">25%</td><td className="border border-white/10 px-3 py-2">2.5</td><td className="border border-white/10 px-3 py-2">8.00</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">50%</td><td className="border border-white/10 px-3 py-2">5.0</td><td className="border border-white/10 px-3 py-2">12.00</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">75%</td><td className="border border-white/10 px-3 py-2">7.5</td><td className="border border-white/10 px-3 py-2">16.00</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">100%</td><td className="border border-white/10 px-3 py-2">10.0</td><td className="border border-white/10 px-3 py-2">20.00</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> Always allow adequate stabilisation time at each test point before recording
              readings. Rushing introduces errors that may appear as linearity problems but are actually measurement artefacts.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Calibration Equipment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The choice of calibration equipment depends on the type of instrument being calibrated. Each measurement
              type (pressure, temperature, electrical) requires specific reference standards and signal sources.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pressure Calibration</h3>
                <p className="text-sm text-white">
                  <strong>Deadweight testers</strong> (primary standards) generate precise pressures using calibrated weights
                  on a piston. Portable pressure calibrators (e.g. Beamex MC6, Fluke 721) provide digital pressure
                  measurement and generation for field use. Hand pumps generate the test pressure while the calibrator
                  measures and displays the reference value.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Temperature Calibration</h3>
                <p className="text-sm text-white">
                  <strong>Dry-block calibrators</strong> provide stable temperatures for sensor testing. <strong>Stirred liquid
                  baths</strong> offer superior uniformity for high-accuracy work. Reference PRTs (Platinum Resistance
                  Thermometers) provide traceable temperature measurement. Millivolt sources can simulate thermocouple
                  signals for testing the transmitter independently of the sensor.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Signal Calibration</h3>
                <p className="text-sm text-white">
                  <strong>Multifunction calibrators</strong> (Beamex, Fluke, Druck) can source and measure voltage (0-10 V),
                  current (4-20 mA), resistance (for RTDs), and frequency signals. <strong>HART communicators</strong>
                  (Emerson 475/Trex) provide digital access to smart transmitters for configuration, calibration, and
                  diagnostics. Documenting calibrators automatically record results and generate certificates.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> Maintenance technicians must be competent in using calibration equipment
              appropriate to the instruments they maintain, and must ensure all reference standards are within their
              calibration due dates.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Loop Calibration and Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Loop calibration</strong> tests the entire measurement chain from the sensor input through to the
              final displayed or recorded value. This verifies that the combined errors of all components (sensor,
              transmitter, wiring, barriers, input card, scaling, display) are within the acceptable loop tolerance.
              It is performed in addition to individual instrument calibrations.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calibration Record Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Instrument identification:</strong> Tag number, serial number, description, location</li>
                <li className="pl-1"><strong>Procedure reference:</strong> Which calibration procedure was followed</li>
                <li className="pl-1"><strong>Reference standards:</strong> Identification, certificate number, calibration due date</li>
                <li className="pl-1"><strong>Environmental conditions:</strong> Temperature, humidity during calibration</li>
                <li className="pl-1"><strong>As-found data:</strong> Readings before any adjustments</li>
                <li className="pl-1"><strong>Adjustments made:</strong> Details of any corrections performed</li>
                <li className="pl-1"><strong>As-left data:</strong> Readings after adjustments</li>
                <li className="pl-1"><strong>Pass/fail determination:</strong> Against stated tolerance</li>
                <li className="pl-1"><strong>Technician and date:</strong> Who performed it and when</li>
              </ul>
            </div>

            <p>
              Computerised Maintenance Management Systems (CMMS) such as SAP PM, Maximo, or dedicated calibration
              management software (Beamex CMX, Fluke DPC/TRACK) automate calibration scheduling, record management,
              and trend analysis. They can automatically generate work orders when calibrations are due, flag
              instruments showing excessive drift, and produce audit-ready reports.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> Always record as-found data before making any adjustments. This data is
              the basis for drift trending and calibration interval optimisation. Without it, you lose valuable
              information about the instrument's long-term behaviour.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Calibration Intervals and Quality Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Calibration intervals balance the risk of using an out-of-tolerance instrument against the cost and
              disruption of frequent calibration. Intervals are initially set based on manufacturer recommendations
              and industry practice, then optimised using historical drift data.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Factors Affecting Calibration Intervals</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Historical drift data:</strong> How much does the instrument drift between calibrations?</li>
                <li className="pl-1"><strong>Criticality:</strong> What are the consequences of out-of-tolerance readings?</li>
                <li className="pl-1"><strong>Operating conditions:</strong> Vibration, temperature extremes, corrosive environments</li>
                <li className="pl-1"><strong>Manufacturer recommendation:</strong> Starting point for interval determination</li>
                <li className="pl-1"><strong>Regulatory requirements:</strong> Some industries mandate specific intervals</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Quality Standards</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Standard</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Scope</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">ISO/IEC 17025</td><td className="border border-white/10 px-3 py-2">Laboratory competence for calibration and testing</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">ISO 9001 (Clause 7.1.5)</td><td className="border border-white/10 px-3 py-2">Monitoring and measuring resource requirements</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">UKAS</td><td className="border border-white/10 px-3 py-2">UK accreditation body for calibration laboratories</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">IEC 60381-1</td><td className="border border-white/10 px-3 py-2">Analogue signal standard (4-20 mA)</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Calibration of process instruments is a core competency for electrical maintenance
              technicians. The principles covered here provide the foundation for the more detailed calibration
              topics in Section 5.5 (Testing and Calibration of Systems).
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
                <p className="font-medium text-white mb-1">Calibration Essentials</p>
                <ul className="space-y-0.5">
                  <li>TUR 4:1 -- reference 4x more accurate than IUT</li>
                  <li>Five-point check -- 0%, 25%, 50%, 75%, 100%</li>
                  <li>As-found data -- before adjustment (reveals drift)</li>
                  <li>As-left data -- after adjustment (proves compliance)</li>
                  <li>Loop calibration -- end-to-end chain verification</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>ISO/IEC 17025 -- laboratory competence</li>
                  <li>UKAS -- UK accreditation service</li>
                  <li>ISO 9001 Clause 7.1.5 -- measurement resources</li>
                  <li>Deadweight tester -- primary pressure standard</li>
                  <li>Reference PRT -- primary temperature standard</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section4-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Distributed Control Systems
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section4">
              Back to Section Overview
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section4_6;
