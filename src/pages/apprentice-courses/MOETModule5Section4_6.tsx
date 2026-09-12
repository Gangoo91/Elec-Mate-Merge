/**
 * MOET · Module 5 · Section 4 · Subsection 6 — Calibration of Process
 * Instruments
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here. The conversion brief for this course does not list a Module 5
 * KSB set, so only a statement that already appears verbatim in the brief's
 * verified lists for other modules — and that genuinely fits this page's
 * content — is used here.
 *   Knowledge  · "Electrical. Electrical maintenance tools, measurement, and
 *                 test equipment application, operation, care and
 *                 calibration requirements."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt. This is the
 * last subsection of Section 5.4, so the "next" nav card returns to the
 * section overview, matching the original page's own navigation choice.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Calibration of Process Instruments - MOET Module 5 Section 4.6';
const DESCRIPTION =
  'Comprehensive guide to calibration principles, five-point checks, traceability, calibration equipment and documentation for process instruments used in industrial control systems under ST1426.';

const quickCheckQuestions = [
  {
    id: 'qc1',
    question: 'What is calibration?',
    options: [
      "Comparing an instrument's reading against a known reference standard and adjusting if necessary",
      "Cleaning and lubricating an instrument's moving parts at fixed intervals",
      'Replacing an instrument once it reaches the end of its service life',
      "Recording an instrument's serial number and location in an asset register",
    ],
    correctIndex: 0,
    explanation:
      'Calibration compares the instrument under test (IUT) against a traceable reference standard of known accuracy, and adjusts the IUT if the deviation exceeds the acceptable tolerance.',
  },
  {
    id: 'qc2',
    question: "What does 'traceability' mean in calibration?",
    options: [
      'A record of every technician who has handled the instrument',
      'An unbroken chain of comparisons linking the instrument to national/international measurement standards',
      'The ability to locate an instrument anywhere on site using a tag',
      'A log of all the readings an instrument has taken in service',
    ],
    correctIndex: 1,
    explanation:
      'Traceability ensures that each calibration reference standard has itself been calibrated against a higher-level standard, ultimately traceable to national standards (e.g. NPL, NIST).',
  },
  {
    id: 'qc3',
    question:
      'What is the typical accuracy ratio between a reference standard and the instrument under test?',
    options: ['1:1', '10:1 minimum', '4:1 or better', '2:1'],
    correctIndex: 2,
    explanation:
      'The 4:1 accuracy ratio (TUR -- Test Uncertainty Ratio) means the reference standard should be at least four times more accurate than the instrument being calibrated.',
  },
  {
    id: 'qc4',
    question: "What is 'as-found' data in calibration?",
    options: [
      "The instrument's nameplate data",
      'The data recorded after calibration adjustments',
      'The data from when the instrument was first manufactured',
      'The readings recorded before any adjustments are made',
    ],
    correctIndex: 3,
    explanation:
      "As-found data records the instrument's actual readings at each test point before any adjustments are made. This shows how much the instrument has drifted since its last calibration.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is a five-point calibration check?',
    options: [
      'Checking the instrument with five different reference standards in turn',
      'Checking the instrument at 0%, 25%, 50%, 75%, and 100% of range in both ascending and descending directions',
      'Repeating the same reading five times to confirm repeatability only',
      'Calibrating the instrument once every five years as a fixed interval',
    ],
    correctAnswer: 1,
    explanation:
      'A five-point check tests the instrument at five evenly spaced points across its range, both ascending (up-scale) and descending (down-scale), to identify linearity errors and hysteresis.',
  },
  {
    id: 2,
    question: 'What is hysteresis in an instrument?',
    options: [
      'The smallest change in input that produces a detectable change in output',
      'A steady shift in the reading over time away from the true value',
      'A difference in reading at the same input value depending on whether the input is increasing or decreasing',
      'The largest deviation of the reading from a straight-line relationship across the range',
    ],
    correctAnswer: 2,
    explanation:
      "Hysteresis is the difference in the instrument's output at the same input value when approached from the ascending direction versus the descending direction, caused by friction or elastic effects.",
  },
  {
    id: 3,
    question: 'What is the purpose of a calibration certificate?',
    options: [
      'To set the calibration interval for the next scheduled check',
      'To record the purchase price and warranty period of the instrument',
      'To list the spare parts needed to service the instrument',
      'To document the as-found and as-left readings, reference standards used, environmental conditions, and traceability',
    ],
    correctAnswer: 3,
    explanation:
      'The calibration certificate provides documented evidence of the calibration including as-found/as-left data, reference standards used (with traceability), environmental conditions, date, and the calibrating technician.',
  },
  {
    id: 4,
    question:
      'A pressure transmitter has a range of 0-10 bar and an accuracy specification of plus/minus 0.25% of span. What is the maximum allowable error?',
    options: ['0.025 bar', '0.25 bar', '0.0025 bar', '2.5 bar'],
    correctAnswer: 0,
    explanation:
      '0.25% of 10 bar span = 0.025 bar. The instrument reading at any point in the range should not deviate from the true value by more than 0.025 bar.',
  },
  {
    id: 5,
    question: 'What is a deadweight tester used for?',
    options: [
      'Generating precise, known temperatures for calibrating thermocouples',
      'Generating precise, known pressures for calibrating pressure instruments',
      'Measuring the weight of an instrument to check for internal corrosion',
      'Simulating a 4-20 mA signal for calibrating loop receivers',
    ],
    correctAnswer: 1,
    explanation:
      'A deadweight tester generates precise pressures by placing calibrated weights on a piston of known area. Pressure = Force/Area. It is a primary standard for pressure calibration.',
  },
  {
    id: 6,
    question: 'When calibrating a thermocouple, what reference device would you typically use?',
    options: [
      'A deadweight tester loaded with calibrated weights on a piston',
      'A standard multimeter set to read millivolts at room temperature',
      'A calibrated dry-block temperature source or liquid bath with a reference PRT (Platinum Resistance Thermometer)',
      'A loop calibrator injecting a known 4-20 mA current signal',
    ],
    correctAnswer: 2,
    explanation:
      'Calibrated dry-block sources or stirred liquid baths provide stable, known temperatures. A reference PRT provides the traceable temperature measurement against which the thermocouple is compared.',
  },
  {
    id: 7,
    question: 'What does UKAS accreditation mean for a calibration laboratory?',
    options: [
      'The lab is owned and operated directly by the National Physical Laboratory',
      'The lab is permitted to set its own calibration tolerances without limit',
      'The lab is exempt from having its own reference standards calibrated',
      'The lab has been independently assessed and meets ISO/IEC 17025 requirements for competence in calibration',
    ],
    correctAnswer: 3,
    explanation:
      'UKAS (United Kingdom Accreditation Service) accreditation confirms the laboratory meets the requirements of ISO/IEC 17025, providing confidence in the competence, impartiality, and consistency of their calibration results.',
  },
  {
    id: 8,
    question: 'What is the recommended calibration interval for critical process instruments?',
    options: [
      'As determined by risk assessment, historical drift data, and the consequences of out-of-tolerance operation',
      'Exactly five years for every instrument regardless of its duty',
      'Only when the instrument first gives an obviously wrong reading',
      'Once on installation, after which no further calibration is needed',
    ],
    correctAnswer: 0,
    explanation:
      'Calibration intervals should be optimised based on instrument type, historical drift trends, operating conditions, criticality to safety/quality, and the consequences of out-of-tolerance readings.',
  },
  {
    id: 9,
    question: 'What is a loop calibration?',
    options: [
      'Calibrating only the sensor in isolation on the bench before installation',
      'Calibrating the entire measurement loop from sensor through to the displayed/recorded value, including the transmitter, wiring, and receiving instrument',
      'Repeatedly cycling the input around the loop to check for hysteresis only',
      'Calibrating just the receiving instrument while ignoring the transmitter',
    ],
    correctAnswer: 1,
    explanation:
      'Loop calibration tests the entire measurement chain end-to-end, verifying that a known input at the sensor produces the correct reading at the display/recorder/controller, accounting for all components in the loop.',
  },
  {
    id: 10,
    question: 'What is the difference between calibration and adjustment?',
    options: [
      'Calibration changes the instrument settings; adjustment only compares readings against a standard',
      'They are two names for exactly the same activity and are interchangeable',
      'Calibration compares readings against a standard; adjustment physically changes the instrument settings to correct errors',
      'Calibration is done in the field; adjustment can only be done in a laboratory',
    ],
    correctAnswer: 2,
    explanation:
      'Calibration is the comparison and documentation process. Adjustment is the physical act of changing settings to correct errors. Calibration can be performed without adjustment if the instrument is within tolerance.',
  },
  {
    id: 11,
    question: 'What environmental conditions most significantly affect calibration accuracy?',
    options: [
      'The colour of the lighting in the calibration room',
      'The time of day at which the calibration is carried out',
      'The age of the calibration certificate currently on file',
      'Temperature of the reference standard and instrument under test',
    ],
    correctAnswer: 3,
    explanation:
      'Temperature is the most significant environmental factor. Both the reference standard and the instrument under test are affected. Calibrations should be performed in controlled conditions (typically 20-23 degrees C) or with corrections applied.',
  },
  {
    id: 12,
    question: 'Why must digital instruments still be calibrated?',
    options: [
      'While digital instruments do not suffer mechanical drift, sensors, signal conditioning, and A/D converters can still drift',
      'Because the digital display gradually fades and becomes harder to read over time',
      'Because the firmware must be re-flashed at every calibration to stay accurate',
      'Because digital signals are far more susceptible to electrical noise than analogue ones',
    ],
    correctAnswer: 0,
    explanation:
      'Digital instruments still have analogue sensor elements and signal conditioning that can drift. The sensor/input stage is the primary source of drift and must be periodically checked against traceable standards.',
  },
];

const faqs = [
  {
    question: 'What is the difference between calibration and adjustment?',
    answer:
      "Calibration is the process of comparing the instrument against a reference standard and documenting the results. Adjustment is the physical act of changing the instrument's settings to correct any errors found. Calibration can be performed without adjustment -- if the instrument is within tolerance, only the as-found data is recorded. Adjustment is only performed if the instrument is out of tolerance.",
  },
  {
    question: 'How do I determine the correct calibration interval?',
    answer:
      "Start with the manufacturer's recommendation and adjust based on: historical drift data (how much the instrument drifts between calibrations), the consequences of out-of-tolerance readings (safety, quality, environmental), operating conditions (vibration, temperature, corrosion), and reliability requirements. Intervals are typically extended if drift is consistently small and shortened if drift approaches tolerance limits.",
  },
  {
    question: 'What environmental conditions affect calibration accuracy?',
    answer:
      'Temperature is the most significant factor -- both the reference standard and the instrument under test are affected. Humidity, atmospheric pressure, vibration, and electrical interference can also affect results. Calibrations should be performed in controlled conditions (typically 20-23 degrees C, 40-60% RH) or with corrections applied for environmental deviations.',
  },
  {
    question: 'Do I need to calibrate digital instruments?',
    answer:
      'Yes. While digital instruments do not suffer from mechanical drift in the same way as analogue instruments, the sensors, signal conditioning, and A/D converters can still drift. Digital instruments should be calibrated at defined intervals, with the sensor/input stage being the primary source of drift.',
  },
  {
    question:
      'What is the difference between individual instrument calibration and loop calibration?',
    answer:
      'Individual calibration tests a single instrument in isolation against a reference standard. Loop calibration tests the entire measurement chain from sensor input to final display, verifying that the combined errors of all components in the loop are within the acceptable loop tolerance. Both types are needed for a complete calibration programme.',
  },
];

const MOETModule5Section4_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.4 · Subsection 6"
        title="Calibration of Process Instruments"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Principles, procedures, equipment and documentation for instrument calibration.
          </p>

          <TLDR
            points={[
              'Calibration: compare the instrument against a traceable reference standard.',
              'TUR 4:1: the reference must be at least 4x more accurate than the instrument.',
              'Five-point check: 0%, 25%, 50%, 75%, 100% up and down.',
              'Documentation: as-found and as-left readings with traceability.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define calibration, traceability, and the test uncertainty ratio (TUR)',
              'Perform a five-point ascending/descending calibration check',
              'Identify common calibration equipment for pressure, temperature, and electrical signals',
              'Record as-found and as-left data and complete calibration documentation',
              'Explain hysteresis, linearity errors, and drift and their impact on measurement accuracy',
              'Determine appropriate calibration intervals based on risk and drift data',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>ISO/IEC 17025:</strong> the laboratory competence standard for calibration.
              </li>
              <li>
                <strong>UKAS:</strong> the UK accreditation body for calibration laboratories.
              </li>
              <li>
                <strong>Drift monitoring:</strong> as-found data enables interval optimisation.
              </li>
              <li>
                <strong>Loop calibration:</strong> end-to-end testing of the entire measurement
                chain.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Calibration fundamentals</ContentEyebrow>

          <ConceptBlock
            title="Calibration fundamentals"
            onSite="Without traceability, a calibration has no demonstrated validity. Always verify that your reference standards are within their calibration due dates before using them."
          >
            <p>
              Calibration is the process of comparing an instrument&apos;s measurements against a{' '}
              <strong>traceable reference standard</strong> of known accuracy, and adjusting the
              instrument if the deviation exceeds the acceptable tolerance. Traceability means an
              unbroken chain of comparisons linking the working reference instrument through
              higher-level standards to national measurement institutes such as NPL (UK) or NIST
              (USA).
            </p>
          </ConceptBlock>

          <ConceptBlock title="The Test Uncertainty Ratio (TUR)">
            <p>
              The TUR defines the accuracy relationship between the reference standard and the
              instrument under test. A TUR of 4:1 or better is the widely accepted minimum:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                The reference standard should be at least 4x more accurate than the instrument.
              </li>
              <li>Higher TURs provide greater confidence in the calibration result.</li>
              <li>
                If the TUR cannot be achieved, the measurement uncertainty must be considered
                carefully.
              </li>
              <li>
                The TUR requirement drives the selection and maintenance of reference standards.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Documenting the result">
            <p>
              Calibration results are documented on a <strong>calibration certificate</strong> which
              records: the instrument identification, the reference standards used (with their
              calibration due dates), environmental conditions, as-found readings, any adjustments
              made, as-left readings, the pass/fail determination, and the technician&apos;s
              signature. This documentation is essential for quality management systems (ISO 9001)
              and regulatory compliance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>The five-point calibration check</ContentEyebrow>

          <ConceptBlock title="The five-point calibration check">
            <p>
              A standard calibration procedure tests the instrument at five evenly spaced points
              across its range: <strong>0%, 25%, 50%, 75%, and 100%</strong>. The input is applied
              in the ascending direction (0% to 100%), then in the descending direction (100% to
              0%), recording the instrument&apos;s output at each point in both directions.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Three types of error revealed">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Zero error:</strong> an offset that shifts all readings by a constant amount
                -- corrected by zero adjustment.
              </li>
              <li>
                <strong>Span error:</strong> the sensitivity is incorrect, causing increasing error
                at higher readings -- corrected by span adjustment.
              </li>
              <li>
                <strong>Linearity error:</strong> the relationship between input and output is not a
                straight line, with varying error across the range -- requires multi-point
                characterisation.
              </li>
            </ul>
            <p>
              Comparing ascending and descending readings reveals <strong>hysteresis</strong> -- the
              lag between readings at the same input depending on the direction of approach.
              Excessive hysteresis indicates mechanical wear, friction, or elastic deformation in
              the sensor.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Example: 4-20 mA pressure transmitter (0-10 bar)"
            onSite="Always allow adequate stabilisation time at each test point before recording readings. Rushing introduces errors that may appear as linearity problems but are actually measurement artefacts."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Test point</th>
                    <th className="py-2 pr-4 font-medium text-white">Pressure (bar)</th>
                    <th className="py-2 font-medium text-white">Expected output (mA)</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">0%</td>
                    <td className="py-2 pr-4">0.0</td>
                    <td className="py-2">4.00</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">25%</td>
                    <td className="py-2 pr-4">2.5</td>
                    <td className="py-2">8.00</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">50%</td>
                    <td className="py-2 pr-4">5.0</td>
                    <td className="py-2">12.00</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">75%</td>
                    <td className="py-2 pr-4">7.5</td>
                    <td className="py-2">16.00</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">100%</td>
                    <td className="py-2 pr-4">10.0</td>
                    <td className="py-2">20.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Calibration equipment</ContentEyebrow>

          <ConceptBlock
            title="Calibration equipment"
            onSite="Maintenance technicians must be competent in using calibration equipment appropriate to the instruments they maintain, and must ensure all reference standards are within their calibration due dates."
          >
            <p>
              The choice of calibration equipment depends on the type of instrument being
              calibrated. Each measurement type (pressure, temperature, electrical) requires
              specific reference standards and signal sources.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Pressure calibration">
            <p>
              <strong>Deadweight testers</strong> (primary standards) generate precise pressures
              using calibrated weights on a piston. Portable pressure calibrators (e.g. Beamex MC6,
              Fluke 721) provide digital pressure measurement and generation for field use. Hand
              pumps generate the test pressure while the calibrator measures and displays the
              reference value.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Temperature calibration">
            <p>
              <strong>Dry-block calibrators</strong> provide stable temperatures for sensor testing.{' '}
              <strong>Stirred liquid baths</strong> offer superior uniformity for high-accuracy
              work. Reference PRTs (Platinum Resistance Thermometers) provide traceable temperature
              measurement. Millivolt sources can simulate thermocouple signals for testing the
              transmitter independently of the sensor.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Electrical signal calibration">
            <p>
              <strong>Multifunction calibrators</strong> (Beamex, Fluke, Druck) can source and
              measure voltage (0-10 V), current (4-20 mA), resistance (for RTDs), and frequency
              signals. <strong>HART communicators</strong> (Emerson 475/Trex) provide digital access
              to smart transmitters for configuration, calibration, and diagnostics. Documenting
              calibrators automatically record results and generate certificates.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Loop calibration and documentation</ContentEyebrow>

          <ConceptBlock
            title="Loop calibration and documentation"
            onSite="Always record as-found data before making any adjustments. This data is the basis for drift trending and calibration interval optimisation. Without it, you lose valuable information about the instrument's long-term behaviour."
          >
            <p>
              <strong>Loop calibration</strong> tests the entire measurement chain from the sensor
              input through to the final displayed or recorded value. This verifies that the
              combined errors of all components (sensor, transmitter, wiring, barriers, input card,
              scaling, display) are within the acceptable loop tolerance. It is performed in
              addition to individual instrument calibrations.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Calibration record requirements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Instrument identification:</strong> tag number, serial number, description,
                location.
              </li>
              <li>
                <strong>Procedure reference:</strong> which calibration procedure was followed.
              </li>
              <li>
                <strong>Reference standards:</strong> identification, certificate number,
                calibration due date.
              </li>
              <li>
                <strong>Environmental conditions:</strong> temperature, humidity during calibration.
              </li>
              <li>
                <strong>As-found data:</strong> readings before any adjustments.
              </li>
              <li>
                <strong>Adjustments made:</strong> details of any corrections performed.
              </li>
              <li>
                <strong>As-left data:</strong> readings after adjustments.
              </li>
              <li>
                <strong>Pass/fail determination:</strong> against stated tolerance.
              </li>
              <li>
                <strong>Technician and date:</strong> who performed it and when.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Computerised calibration management">
            <p>
              Computerised Maintenance Management Systems (CMMS) such as SAP PM, Maximo, or
              dedicated calibration management software (Beamex CMX, Fluke DPC/TRACK) automate
              calibration scheduling, record management, and trend analysis. They can automatically
              generate work orders when calibrations are due, flag instruments showing excessive
              drift, and produce audit-ready reports.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Calibration intervals and quality standards</ContentEyebrow>

          <ConceptBlock
            title="Calibration intervals and quality standards"
            onSite="Calibration of process instruments is a core competency for electrical maintenance technicians. The principles covered here provide the foundation for the more detailed calibration topics in Section 5.5 (Testing and Calibration of Systems)."
          >
            <p>
              Calibration intervals balance the risk of using an out-of-tolerance instrument against
              the cost and disruption of frequent calibration. Intervals are initially set based on
              manufacturer recommendations and industry practice, then optimised using historical
              drift data.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Factors affecting calibration intervals">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Historical drift data:</strong> how much does the instrument drift between
                calibrations?
              </li>
              <li>
                <strong>Criticality:</strong> what are the consequences of out-of-tolerance
                readings?
              </li>
              <li>
                <strong>Operating conditions:</strong> vibration, temperature extremes, corrosive
                environments.
              </li>
              <li>
                <strong>Manufacturer recommendation:</strong> starting point for interval
                determination.
              </li>
              <li>
                <strong>Regulatory requirements:</strong> some industries mandate specific
                intervals.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Key quality standards">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Standard</th>
                    <th className="py-2 font-medium text-white">Scope</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">ISO/IEC 17025</td>
                    <td className="py-2">Laboratory competence for calibration and testing</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">ISO 9001 (Clause 7.1.5)</td>
                    <td className="py-2">Monitoring and measuring resource requirements</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">UKAS</td>
                    <td className="py-2">UK accreditation body for calibration laboratories</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">IEC 60381-1</td>
                    <td className="py-2">Analogue signal standard (4-20 mA)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="A pressure transmitter that passes calibration but reads wrong on the plant"

            situation={
              <>
                <p>
                  A 0–10 bar transmitter is removed, bench-calibrated against a reference, and
                  passes at every point. Refitted, it reads about 0.4 bar high against a local gauge
                  on the same tapping.
                </p>

                <p>
                  The instrument is on a steam line, mounted below the tapping point with an impulse
                  line and a syphon.
                </p>
              </>
            }

            whatToDo={
              <>
                <p>
                  Accept that a bench calibration only proves the instrument. It says nothing about
                  how the instrument is installed, and installation is where this fault lives.
                </p>

                <p>
                  Work out the static head. A transmitter mounted below its tapping sees the weight
                  of the liquid column in the impulse line as an offset — a filled syphon roughly 4
                  m below the tapping adds about 0.4 bar of water head, which matches the error
                  exactly.
                </p>

                <p>
                  Confirm by venting the impulse line to atmosphere at the transmitter and checking
                  it reads zero. If it does, the instrument is good and the offset is
                  installation-related.
                </p>

                <p>
                  Correct it by applying a zero elevation or suppression at the transmitter, and
                  record that you have done so. Do not simply re-zero and move on without a note —
                  the next person to bench-calibrate it will find it reads 0.4 bar low and "correct"
                  your correction.
                </p>
              </>
            }

            whyItMatters={
              <p>
                Calibration and installed accuracy are two different things, and the gap between
                them is where most "the instrument is faulty" jobs actually sit. The transmitter in
                this case was never wrong. Knowing that a liquid column in an impulse line is a real
                pressure the instrument is entitled to report turns a repeat-swap cycle into a
                single documented offset — and documenting it is what stops the cycle starting
                again.
              </p>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'TUR 4:1 -- the reference standard should be at least 4x more accurate than the instrument under test.',
              'Five-point check -- 0%, 25%, 50%, 75%, 100%, both ascending and descending.',
              'As-found data is recorded before adjustment (it reveals drift); as-left data is recorded after adjustment (it proves compliance).',
              'Loop calibration verifies the entire measurement chain end-to-end.',
              'ISO/IEC 17025 sets laboratory competence; UKAS is the UK accreditation service; ISO 9001 Clause 7.1.5 covers measurement resources.',
              'A deadweight tester is the primary pressure standard; a reference PRT is the primary temperature standard.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section4-5')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Distributed Control Systems
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Back to section <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Process Control and Instrumentation
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section4_6;
