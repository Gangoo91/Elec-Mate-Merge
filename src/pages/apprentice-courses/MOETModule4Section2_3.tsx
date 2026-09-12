/**
 * MOET · Module 4 · Section 2 · Subsection 3 — Vibration Analysis
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. NOT ST0154 (the "MOET" the course is named after) —
 * ST0154 v1.6 is still live, but its own EPA plan records that the Electrical
 * Technician option "was retired 31/12/2025" and was replaced by ST1426
 * (single discipline) or ST1443 (dual discipline). The course keeps the MOET
 * name because that is what employers and colleges still call the role.
 *
 * KSBs covered, quoted rather than numbered — the published K/S/B
 * numbering is unverified, so never write a code here:
 *   · "Electrical. Common electrical plant, equipment, and systems failure
 *     modes."
 *   · "Electrical. Electrical fault-finding and rectification techniques;
 *     diagnostic equipment."
 *   · "Electrical. Electrical maintenance tools, measurement, and test
 *     equipment application, operation, care and calibration
 *     requirements."
 *
 * ⚠️ Not fixed, flagged instead per the conversion brief: quiz questions 8
 * and 10 have distractor options that read as copy-paste leftovers from
 * other questions in this bank (Q8's wrong options are about transformer
 * losses and ventilation positioning; Q10's wrong options repeat text from
 * Q7 and Q9) — nonsensical against their own question stem, though the
 * marked correct answer for each is right. Preserved byte-identical per the
 * data-fidelity rule; worth a content pass by Andrew.
 *
 * ISO 10816/20816 zone descriptions, bearing defect frequency ratios and
 * P-F interval figures are copied verbatim from the original page and were
 * not independently re-verified against the standard in this pass.
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 *
 * ✎ CONTENT FIX (12 Sep): quiz Q8 and Q10 had broken distractors — Q8's three
 *   wrong options were copy-paste leftovers from unrelated transformer and
 *   switchgear questions, and Q10's first two options were verbatim copies of
 *   Q7's and Q9's correct answers. Both questions were answerable without any
 *   knowledge, since only one option was even on-topic. Rewritten with
 *   plausible distractors (real ISO standards for Q8; real maintenance
 *   intervals for Q10). correctAnswer indices unchanged.
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
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Vibration Analysis - MOET Module 4.2.3';
const DESCRIPTION =
  'Vibration monitoring techniques, measurement parameters, sensor types, frequency analysis, fault identification in rotating machinery, ISO 10816 standards and condition-based maintenance for electrical maintenance technicians.';

const quickCheckQuestions = [
  {
    id: 'vibration-displacement',
    question:
      'Which vibration parameter is most useful for detecting low-frequency faults such as imbalance in rotating machinery?',
    options: [
      'Acceleration (g)',
      'Jerk (rate of change of acceleration)',
      'Displacement (microns peak-to-peak)',
      'Velocity (mm/s RMS)',
    ],
    correctIndex: 3,
    explanation:
      'Velocity (mm/s RMS) is the most commonly used parameter for general vibration severity assessment because it gives equal weighting across a broad frequency range. However, displacement is preferred for very low frequencies (below ~10 Hz) and acceleration for very high frequencies. For overall condition monitoring on standard rotating machinery, velocity is the standard parameter referenced in ISO 10816.',
  },
  {
    id: 'vibration-1x-frequency',
    question:
      'A vibration spectrum shows a dominant peak at 1x the running speed (shaft rotational frequency). The most likely cause is:',
    options: [
      'A bearing outer race defect',
      'A broken rotor bar in the motor',
      'Mass imbalance (unbalance)',
      'Mechanical looseness in the mounting',
    ],
    correctIndex: 2,
    explanation:
      'A dominant 1x peak (once per revolution) is the classic signature of mass imbalance. The unbalanced mass creates a centrifugal force that varies sinusoidally at the shaft rotational frequency. Misalignment typically shows 1x and 2x peaks, bearing faults show at bearing defect frequencies, and looseness shows multiple harmonics.',
  },
  {
    id: 'vibration-sensor-placement',
    question:
      'When mounting an accelerometer on a motor bearing housing, which orientation typically gives the best sensitivity to bearing defects?',
    options: [
      'Radial (perpendicular to the shaft centreline, vertical or horizontal)',
      'Axial (parallel to the shaft centreline) only',
      'At 45 degrees to the shaft in the tangential direction',
      'On the motor frame as far from the bearing as possible',
    ],
    correctIndex: 0,
    explanation:
      'Radial mounting (perpendicular to the shaft) provides the best sensitivity for detecting bearing defects because the impact forces from rolling element defects are transmitted radially through the bearing housing. Both vertical and horizontal radial readings should be taken. Axial readings are important for detecting misalignment and thrust bearing issues.',
  },
  {
    id: 'vibration-iso-10816',
    question:
      'ISO 10816 classifies vibration severity into zones. Which zone indicates that long-term operation is unacceptable and damage may occur?',
    options: [
      'Zone D — vibration severity is sufficient to cause damage',
      'Zone B — acceptable for unrestricted long-term operation',
      'Zone C — restricted long-term operation, remedial action needed',
      'Zone A — newly commissioned machines',
    ],
    correctIndex: 0,
    explanation:
      'ISO 10816 defines four zones: Zone A (new or reconditioned machines), Zone B (acceptable for long-term operation), Zone C (tolerable only for limited periods — remedial action required at next opportunity), and Zone D (severity is sufficient to cause damage — immediate action required). The velocity thresholds depend on the machine class and mounting.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Vibration analysis is classified as which type of maintenance strategy?',
    options: [
      'Reactive (run-to-failure) maintenance',
      'Condition-based predictive maintenance',
      'Fixed-interval time-based maintenance',
      'Breakdown maintenance carried out after failure',
    ],
    correctAnswer: 1,
    explanation:
      'Vibration analysis is a condition-based predictive maintenance technique. Rather than replacing components at fixed time intervals regardless of condition, vibration monitoring detects the actual condition of rotating machinery and enables maintenance to be scheduled when a deterioration trend indicates impending failure.',
  },
  {
    id: 2,
    question: 'The three fundamental vibration parameters are:',
    options: [
      'Frequency, amplitude and wavelength',
      'Speed, torque and power',
      'Displacement, velocity and acceleration',
      'Temperature, pressure and flow',
    ],
    correctAnswer: 2,
    explanation:
      'The three fundamental vibration parameters are displacement (distance moved, in microns), velocity (rate of movement, in mm/s), and acceleration (rate of change of velocity, in g or m/s squared). These are mathematically related — velocity is the time derivative of displacement, and acceleration is the time derivative of velocity.',
  },
  {
    id: 3,
    question: 'A piezoelectric accelerometer works by:',
    options: [
      'Measuring the change in resistance of a strain gauge bonded to the shaft',
      'Detecting the magnetic field produced by the rotating shaft',
      'Counting the number of shaft revolutions using an optical sensor',
      'Generating an electrical charge proportional to the applied force on a piezoelectric crystal',
    ],
    correctAnswer: 3,
    explanation:
      'A piezoelectric accelerometer contains a crystal (typically quartz or ceramic) that generates an electrical charge when subjected to mechanical stress (the piezoelectric effect). A seismic mass inside the sensor applies force to the crystal proportional to the vibration acceleration, producing a charge signal that is converted to a voltage output.',
  },
  {
    id: 4,
    question: 'FFT (Fast Fourier Transform) analysis converts vibration data from:',
    options: [
      'The time domain to the frequency domain',
      'Analogue to digital format',
      'Displacement to velocity',
      'Metric to imperial units',
    ],
    correctAnswer: 0,
    explanation:
      'FFT converts a complex time-domain vibration waveform into its individual frequency components, producing a frequency spectrum. This allows technicians to identify specific fault frequencies — for example, the shaft rotational frequency (imbalance), bearing defect frequencies, and gear mesh frequencies — that would be impossible to distinguish in the raw time waveform.',
  },
  {
    id: 5,
    question:
      'A vibration spectrum showing peaks at 1x, 2x and 3x shaft speed with the 2x component being dominant most likely indicates:',
    options: [
      'Mass imbalance',
      'Angular misalignment',
      'Electrical fault in the motor',
      'Bearing outer race defect',
    ],
    correctAnswer: 1,
    explanation:
      'A dominant 2x peak alongside 1x and 3x harmonics is the classic signature of angular (or face) misalignment. Parallel (offset) misalignment tends to show a dominant 2x peak in the radial direction. Pure imbalance shows primarily 1x only. The presence of multiple harmonics with a dominant 2x is a strong indicator that the coupling or alignment needs attention.',
  },
  {
    id: 6,
    question: 'Bearing defect frequencies (BPFO, BPFI, BSF, FTF) are determined by:',
    options: [
      'The supply frequency and the number of motor poles only',
      'The ambient temperature and the lubricant grade used',
      'The bearing geometry — number of rolling elements, pitch diameter, element diameter and contact angle',
      'The mounting orientation of the accelerometer on the housing',
    ],
    correctAnswer: 2,
    explanation:
      'Bearing defect frequencies are calculated from the bearing geometry: number of balls or rollers, pitch circle diameter, element diameter, contact angle and shaft speed. BPFO (ball pass frequency outer race), BPFI (inner race), BSF (ball spin frequency) and FTF (fundamental train frequency) each indicate defects on specific bearing components.',
  },
  {
    id: 7,
    question:
      'When trending vibration data over time, an exponential increase in vibration level typically indicates:',
    options: [
      'A stable machine operating normally within its acceptable zone',
      'A measurement error caused by a loose accelerometer',
      'Normal warming of the bearings during the first hour of running',
      'Rapid deterioration requiring urgent attention — the machine may be approaching catastrophic failure',
    ],
    correctAnswer: 3,
    explanation:
      'An exponential rise in vibration level indicates the machine has entered the final stage of the P-F curve (potential failure to functional failure). The rate of deterioration is accelerating, and catastrophic failure may be imminent. Immediate action is required — either controlled shutdown for maintenance or continuous monitoring with a defined alarm and trip level.',
  },
  {
    id: 8,
    question:
      'Which ISO standard provides guidance on acceptable vibration severity levels for rotating machinery?',
    options: [
      'ISO 10816 (now superseded by ISO 20816)',
      'ISO 18436 — which certifies condition monitoring personnel, not machine severity',
      'ISO 14224 — which covers reliability and maintenance data collection',
      'ISO 55000 — which covers asset management systems',
    ],
    correctAnswer: 0,
    explanation:
      'ISO 10816 (and its successor ISO 20816) provides vibration severity classification for various types of rotating machinery. It defines velocity thresholds for zones A through D based on machine class, power rating and mounting type. It is the primary reference standard for evaluating whether measured vibration levels are acceptable.',
  },
  {
    id: 9,
    question:
      'An electrical motor running at 1480 RPM on a 50 Hz supply has a slip frequency of 20 RPM. Vibration peaks at exactly 50 Hz with sidebands at slip frequency indicate:',
    options: [
      'A bearing outer race defect requiring lubrication',
      'An electrical fault such as broken rotor bars or uneven air gap',
      'Coupling misalignment between the motor and driven load',
      'Mass imbalance on the motor shaft requiring rebalancing',
    ],
    correctAnswer: 1,
    explanation:
      'Vibration at mains supply frequency (50 Hz) with sidebands spaced at the slip frequency (the difference between synchronous and actual speed) is a classic signature of electrical faults in induction motors. Broken rotor bars, eccentric rotor, and uneven air gap all produce this pattern. The vibration will disappear instantly when power is removed, confirming the electrical origin.',
  },
  {
    id: 10,
    question: 'The P-F interval in condition monitoring refers to:',
    options: [
      'The interval between scheduled preventive maintenance visits on a plant item',
      'The time a machine may continue running after protection detects a fault',
      'The time between a detectable potential failure (P) and the actual functional failure (F)',
      'The period over which a machine degrades from new condition to the end of its design life',
    ],
    correctAnswer: 2,
    explanation:
      'The P-F interval is the time (or operational cycles) between the point at which a failure can first be detected (potential failure P) and the point at which it results in actual breakdown (functional failure F). Vibration monitoring must be carried out at intervals shorter than the P-F interval to ensure deterioration is detected before failure occurs.',
  },
  {
    id: 11,
    question:
      'For baseline vibration measurements on a newly commissioned motor, readings should be taken:',
    options: [
      'The moment the motor is first switched on from cold',
      'Only when the motor is isolated and stationary',
      'During the run-down period after the supply is removed',
      'After the motor has reached stable thermal equilibrium at normal operating load',
    ],
    correctAnswer: 3,
    explanation:
      'Baseline readings should be taken after the machine has reached normal operating temperature and is running at its typical load condition. Thermal expansion affects bearing clearances, alignment and vibration characteristics. Readings taken before thermal stability is reached will not represent the true operating condition and will give misleading baselines.',
  },
  {
    id: 12,
    question: 'Under ST1426, vibration analysis falls within which knowledge and skills area?',
    options: [
      'Condition monitoring and predictive maintenance for maintenance technicians',
      'Initial verification and certification of new installations',
      'Estimating and quoting for electrical installation work',
      'Health and safety law relating to working at height',
    ],
    correctAnswer: 0,
    explanation:
      'ST1426 requires maintenance technicians to understand and apply condition monitoring techniques including vibration analysis as part of their predictive maintenance capabilities. This falls under the knowledge requirements for maintenance strategies and the skills relating to diagnosing and rectifying faults in engineering systems.',
  },
];

const faqs = [
  {
    question: 'Do I need specialist training to carry out vibration analysis?',
    answer:
      'Yes. While basic vibration screening (overall level checks) can be taught relatively quickly, interpreting frequency spectra and diagnosing specific faults requires formal training. The ISO 18436-2 standard defines four categories of vibration analyst competence, from Category I (basic measurements and trending) to Category IV (advanced diagnostics and programme management). Most maintenance technicians should aim for at least Category I or II.',
  },
  {
    question: 'How often should vibration measurements be taken?',
    answer:
      'The measurement interval must be shorter than the P-F interval for the equipment. For general industrial motors and pumps, monthly measurements are typical. Critical equipment may require weekly or continuous online monitoring. The interval should be reduced if trending shows a deterioration pattern. As a rule of thumb, measure at least three times within the expected P-F interval.',
  },
  {
    question: 'Can vibration analysis detect electrical faults in motors?',
    answer:
      'Yes. Electrical faults such as broken rotor bars, uneven air gap, stator winding faults and supply imbalance all produce characteristic vibration signatures. The key diagnostic test is to observe whether the vibration disappears instantly when power is cut — if it does, the source is electrical rather than mechanical. Current signature analysis (CSA) complements vibration analysis for electrical fault detection.',
  },
  {
    question: 'What is the difference between overall vibration level and spectral analysis?',
    answer:
      "Overall vibration level (typically velocity RMS in mm/s) is a single number representing the total vibration energy. It is useful for trending and severity assessment against ISO 10816 limits. Spectral analysis (FFT) breaks down the vibration into individual frequency components, enabling specific faults to be identified. Think of overall level as a patient's temperature (indicates something is wrong) and spectral analysis as the detailed blood test (identifies exactly what is wrong).",
  },
  {
    question: 'What is envelope analysis (demodulation) and when is it used?',
    answer:
      'Envelope analysis is an advanced technique for detecting early-stage bearing faults. Bearing defects produce very high-frequency impacts that excite structural resonances. These impacts are modulated at the bearing defect frequency. Envelope analysis demodulates the high-frequency signal to extract the modulation frequency, revealing bearing defects much earlier than standard spectral analysis. It is particularly useful for low-speed machinery where defect signals are weak.',
  },
];

const MOETModule4Section2_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 4.2 · Subsection 3"
        title="Vibration Analysis"
        backTo="/study-centre/apprentice/m-o-e-t-module4-section2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Monitoring rotating machinery health through vibration measurement and frequency
            analysis.
          </p>

          <TLDR
            points={[
              'What: Measuring machine vibration to detect developing faults.',
              'Parameters: Displacement, velocity and acceleration.',
              'Analysis: FFT converts time waveform to frequency spectrum.',
              'Standard: ISO 10816 / 20816 for severity classification.',
            ]}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Motors:</strong> Imbalance, misalignment, bearing wear, electrical faults.
              </li>
              <li>
                <strong>Drives:</strong> Belt tension, coupling wear, gear mesh defects.
              </li>
              <li>
                <strong>Trending:</strong> P-F curve and condition-based scheduling.
              </li>
              <li>
                <strong>ST1426:</strong> Condition monitoring knowledge requirement.
              </li>
            </ul>
          </ConceptBlock>

          <LearningOutcomes
            outcomes={[
              'Explain the principles of vibration and its three fundamental parameters',
              'Identify common sensor types and correct mounting techniques',
              'Interpret frequency spectra to diagnose imbalance, misalignment and bearing faults',
              'Apply ISO 10816 severity zones to assess machinery condition',
              'Describe the P-F curve and determine appropriate monitoring intervals',
              'Link vibration analysis to ST1426 condition monitoring requirements',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Fundamentals of vibration</ContentEyebrow>

          <ConceptBlock title="Every machine vibrates to some degree">
            <p>
              All rotating machinery vibrates. In a perfectly balanced, perfectly aligned machine
              with flawless bearings, vibration would be negligible. In reality, manufacturing
              tolerances, wear, thermal distortion and process forces mean that every machine
              vibrates to some degree. The goal of vibration analysis is not to eliminate vibration
              but to monitor it, understand what it tells us about the machine&apos;s condition, and
              detect changes that indicate developing faults.
            </p>
            <p>
              Vibration is the oscillatory movement of a body about a reference position. It can be
              described by three fundamental parameters, each of which is most useful in different
              frequency ranges and for different fault types.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The three vibration parameters">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Displacement (microns peak-to-peak):</strong> The actual distance the
                machine moves. Most useful at low frequencies (below ~10 Hz), for example shaft
                displacement measurements on large turbines using proximity probes
              </li>
              <li>
                <strong>Velocity (mm/s RMS):</strong> The rate of movement. This is the standard
                parameter for general machinery condition assessment because it gives approximately
                equal weighting across a broad frequency range (10 Hz to 1000 Hz). ISO 10816 uses
                velocity as the primary severity metric
              </li>
              <li>
                <strong>Acceleration (g or m/s squared):</strong> The rate of change of velocity.
                Emphasises high-frequency vibration and is essential for detecting bearing faults,
                gear mesh problems and impacts that produce high-frequency energy above 1000 Hz
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Frequency and amplitude">
            <p>
              Every vibration signal has two key characteristics: frequency (how fast it oscillates,
              measured in Hz or CPM) and amplitude (how much it moves, measured in the appropriate
              parameter). The frequency tells us what is causing the vibration — for example, a peak
              at shaft speed indicates imbalance, while a peak at a bearing defect frequency
              indicates bearing damage. The amplitude tells us how severe the problem is.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1x shaft speed:</strong> Imbalance — the most common vibration fault
              </li>
              <li>
                <strong>2x shaft speed:</strong> Misalignment, looseness or ovality
              </li>
              <li>
                <strong>Bearing defect frequencies:</strong> Specific to each bearing type and
                geometry
              </li>
              <li>
                <strong>Mains frequency (50 Hz):</strong> Electrical faults in motors
              </li>
              <li>
                <strong>Sub-harmonics (below 1x):</strong> Oil whirl, rubbing, belt faults
              </li>
            </ul>
          </ConceptBlock>

          <p className="text-[13.5px] leading-relaxed text-elec-yellow/90">
            <span className="mr-1.5 font-semibold text-elec-yellow">Key point: </span>A vibration
            reading without knowing the machine&apos;s running speed is almost meaningless. Always
            record the shaft RPM when taking vibration measurements — it is the reference against
            which all frequency analysis is based.
          </p>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Sensors and measurement techniques</ContentEyebrow>

          <ConceptBlock title="Data quality depends on the sensor and its mounting">
            <p>
              The quality of vibration data depends entirely on the sensor, its mounting and the
              measurement setup. The most common sensor for machinery monitoring is the
              piezoelectric accelerometer, which converts mechanical vibration into an electrical
              signal. Understanding sensor selection and mounting is essential for reliable
              condition monitoring.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Sensor types for vibration monitoring">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Sensor type
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Principle
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Typical application
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Piezoelectric accelerometer
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Piezoelectric crystal generates charge proportional to acceleration
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      General machinery monitoring, motors, pumps, fans
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">IEPE / ICP sensor</td>
                    <td className="border border-white/10 px-3 py-2">
                      Integrated electronics provide constant current voltage output
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Portable data collectors, online monitoring systems
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Velocity sensor (electrodynamic)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Coil moving through magnetic field generates voltage
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Low-frequency measurements, legacy installations
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Proximity probe (eddy current)
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Non-contact measurement of shaft displacement
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Large turbines, journal bearings, shaft displacement
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Mounting methods and their effect">
            <p>
              The method of mounting an accelerometer directly affects the usable frequency range.
              The best mounting gives the highest frequency response; poor mounting severely limits
              the data quality.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Stud mount (threaded):</strong> Best — usable to the sensor&apos;s full
                frequency range (typically 10 kHz+). Requires a drilled and tapped hole on the
                bearing housing
              </li>
              <li>
                <strong>Adhesive mount:</strong> Very good — usable to approximately 5-7 kHz. Epoxy
                or cyanoacrylate bonded mounting pad. Suitable for permanent online monitoring
                points
              </li>
              <li>
                <strong>Magnetic mount:</strong> Good — usable to approximately 2-3 kHz. Convenient
                for portable route-based data collection. Must be placed on a flat, clean, ferrous
                surface
              </li>
              <li>
                <strong>Handheld (probe tip):</strong> Poor — usable to approximately 500-1000 Hz
                only. Inconsistent results. Should only be used for quick screening, never for
                spectral analysis or trending
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Measurement points">
            <p>
              Always measure at the bearing housings — this is where vibration from internal forces
              is transmitted to the machine structure. Take readings in three directions: vertical
              radial (V), horizontal radial (H) and axial (A) at each bearing location. Consistent
              measurement points and directions are essential for meaningful trending. Mark the
              exact sensor location on the machine to ensure repeatability.
            </p>
          </ConceptBlock>

          <p className="text-[13.5px] leading-relaxed text-elec-yellow/90">
            <span className="mr-1.5 font-semibold text-elec-yellow">Practical tip: </span>
            Before taking a reading, ensure the magnetic mount surface is clean and free of paint
            flakes, rust or debris. A poor surface contact can reduce the usable frequency range by
            half and introduce measurement errors.
          </p>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Frequency analysis and fault identification</ContentEyebrow>

          <ConceptBlock title="Diagnosing faults without disassembly">
            <p>
              The real power of vibration analysis lies in frequency analysis — the ability to
              decompose a complex vibration signal into its individual frequency components using
              the Fast Fourier Transform (FFT). Each type of mechanical fault produces vibration at
              specific, predictable frequencies related to the machine geometry and running speed.
              By identifying these frequencies in the spectrum, technicians can diagnose the
              specific fault without disassembling the machine.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Fault
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Frequency pattern
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Direction
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Mass imbalance</td>
                    <td className="border border-white/10 px-3 py-2">1x shaft speed, dominant</td>
                    <td className="border border-white/10 px-3 py-2">Radial (V and H similar)</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Parallel misalignment</td>
                    <td className="border border-white/10 px-3 py-2">
                      2x dominant, with 1x and 3x
                    </td>
                    <td className="border border-white/10 px-3 py-2">Radial</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Angular misalignment</td>
                    <td className="border border-white/10 px-3 py-2">
                      1x dominant in axial, 2x in radial
                    </td>
                    <td className="border border-white/10 px-3 py-2">Axial primarily</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Mechanical looseness</td>
                    <td className="border border-white/10 px-3 py-2">
                      Multiple harmonics (1x, 2x, 3x, 4x...)
                    </td>
                    <td className="border border-white/10 px-3 py-2">Radial, often directional</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">
                      Rolling element bearing defect
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      BPFO, BPFI, BSF, FTF with harmonics
                    </td>
                    <td className="border border-white/10 px-3 py-2">Radial</td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2">Electrical (motor)</td>
                    <td className="border border-white/10 px-3 py-2">
                      2x line frequency (100 Hz) with slip sidebands
                    </td>
                    <td className="border border-white/10 px-3 py-2">
                      Radial, disappears on power off
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Bearing defect frequencies">
            <p>
              Rolling element bearings produce vibration at specific frequencies determined by the
              bearing geometry. These frequencies are calculated or obtained from bearing
              manufacturer databases.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BPFO (Ball Pass Frequency Outer race):</strong> Defect on the outer race —
                the most common bearing fault. Typically 3-5 x shaft speed
              </li>
              <li>
                <strong>BPFI (Ball Pass Frequency Inner race):</strong> Defect on the inner race.
                Amplitude modulated at 1x shaft speed because the defect rotates with the shaft
              </li>
              <li>
                <strong>BSF (Ball Spin Frequency):</strong> Defect on a rolling element (ball or
                roller). Often shows at 2x BSF
              </li>
              <li>
                <strong>FTF (Fundamental Train Frequency):</strong> Cage defect. Typically 0.35-0.45
                x shaft speed. Often erratic rather than a clean peak
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Electrical vs mechanical — the power cut test">
            <p>
              To distinguish electrical vibration from mechanical vibration in a motor, observe the
              vibration level at the instant power is disconnected. If the vibration drops
              immediately to near zero, the source is electrical (electromagnetic forces). If it
              decays gradually (coasts down), the source is mechanical. This is one of the most
              valuable diagnostic tests for motor vibration.
            </p>
          </ConceptBlock>

          <p className="text-[13.5px] leading-relaxed text-elec-yellow/90">
            <span className="mr-1.5 font-semibold text-elec-yellow">Remember: </span>A single
            spectrum is a snapshot. Trending spectra over time reveals whether a fault is stable,
            slowly progressing or rapidly deteriorating — this is where the real value of condition
            monitoring lies.
          </p>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>ISO 10816 severity standards and trending</ContentEyebrow>

          <ConceptBlock title="A framework for evaluating vibration severity">
            <p>
              ISO 10816 (now being superseded by ISO 20816) provides a framework for evaluating
              vibration severity on rotating machinery. It classifies machines into groups based on
              type, power and mounting, and defines four vibration severity zones from Zone A
              (excellent) to Zone D (dangerous). Understanding these standards is essential for
              deciding whether a machine requires maintenance action.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Zone
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Description
                    </th>
                    <th className="border border-white/10 px-3 py-2 font-medium text-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium text-white">
                      Zone A
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      New or reconditioned machines — excellent condition
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      No action — record as baseline
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium text-white">
                      Zone B
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Acceptable for unrestricted long-term operation
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Continue normal monitoring
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium text-white">
                      Zone C
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Tolerable only for limited periods
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Plan remedial action at next scheduled outage
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-white/10 px-3 py-2 font-medium text-white">
                      Zone D
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Severity sufficient to cause damage
                    </td>
                    <td className="border border-white/10 px-3 py-2 text-white">
                      Immediate action — risk of catastrophic failure
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="The P-F curve and monitoring intervals">
            <p>
              The P-F (Potential failure to Functional failure) curve is a fundamental concept in
              condition-based maintenance. It describes how a fault develops from the point at which
              it first becomes detectable (P) to the point of actual breakdown (F).
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>P-F interval:</strong> The time between detectable potential failure and
                functional failure. For bearing faults, this is typically weeks to months depending
                on speed, load and lubrication
              </li>
              <li>
                <strong>Monitoring interval:</strong> Must be less than half the P-F interval to
                ensure at least two data points are captured before failure. For monthly route-based
                monitoring, the P-F interval must be at least 2-3 months
              </li>
              <li>
                <strong>Trending:</strong> Plot vibration level against time to establish the
                deterioration rate. A linear increase suggests gradual wear; an exponential increase
                indicates accelerating damage requiring urgent intervention
              </li>
              <li>
                <strong>Alarm and trip levels:</strong> Set alarm levels at Zone B/C boundary
                (investigate) and trip levels at Zone C/D boundary (shut down). These should be
                based on the specific machine&apos;s baseline, not just generic standards
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Baseline measurements">
            <p>
              A meaningful vibration monitoring programme begins with baseline measurements taken
              when the machine is in known good condition — typically after installation, overhaul
              or rebalancing. The baseline includes overall vibration levels and full spectra at all
              measurement points, taken at normal operating load and temperature. All future
              measurements are compared against this baseline.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Online vs route-based monitoring">
            <p>
              Route-based monitoring uses portable data collectors to measure vibration at regular
              intervals (weekly, monthly). Online monitoring uses permanently installed sensors with
              continuous data acquisition. The choice depends on equipment criticality, P-F interval
              and cost. Critical assets with short P-F intervals justify online monitoring;
              non-critical assets are typically route-based.
            </p>
          </ConceptBlock>

          <p className="text-[13.5px] leading-relaxed text-elec-yellow/90">
            <span className="mr-1.5 font-semibold text-elec-yellow">ST1426 link: </span>
            The maintenance technician standard requires knowledge of condition monitoring
            techniques and the ability to interpret monitoring data to plan maintenance activities.
            Understanding vibration severity standards and trending is a core competence for
            predictive maintenance under this standard.
          </p>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Practical application in electrical maintenance</ContentEyebrow>

          <ConceptBlock title="Motors, motor-driven equipment and rotating electrical machines">
            <p>
              For electrical maintenance technicians, vibration analysis is primarily applied to
              electric motors, motor-driven equipment (pumps, fans, compressors) and rotating
              electrical machines such as generators and transformers (where transformer hum
              indicates core or winding issues). Understanding how to integrate vibration monitoring
              into your daily maintenance practice is essential.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Motor vibration checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pre-start check:</strong> Visually inspect mounting bolts, coupling
                alignment marks, and belt tension before energising
              </li>
              <li>
                <strong>Running check:</strong> Use a handheld vibration meter for quick overall
                level screening during routine inspections
              </li>
              <li>
                <strong>Detailed analysis:</strong> Route-based data collection at bearing housings
                (V, H, A at each bearing) using a magnetic-mount accelerometer and data collector
              </li>
              <li>
                <strong>Power cut test:</strong> If motor vibration is elevated, observe the instant
                of power removal to distinguish electrical from mechanical sources
              </li>
              <li>
                <strong>Record keeping:</strong> Log all readings, operating conditions (load,
                speed, temperature) and any observations in the CMMS or maintenance log
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common scenarios for electrical maintenance technicians">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Post-replacement check:</strong> After replacing a motor or coupling, take
                baseline vibration readings to confirm acceptable levels before handover
              </li>
              <li>
                <strong>Complaint investigation:</strong> When operators report unusual noise from a
                motor, vibration analysis can identify the specific fault without disassembly
              </li>
              <li>
                <strong>VSD-driven motors:</strong> Variable speed drive motors may exhibit
                different vibration characteristics at different speeds. Note the running speed at
                the time of measurement and be aware of structural resonance issues
              </li>
              <li>
                <strong>Soft foot check:</strong> Uneven mounting (soft foot) distorts the motor
                frame and affects alignment. Check for soft foot before detailed vibration analysis
                by loosening and tightening each mounting bolt in turn
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Integration with other condition monitoring techniques">
            <p>
              Vibration analysis is most powerful when combined with other condition monitoring
              methods. Together, they provide a comprehensive picture of machinery health.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Thermal imaging:</strong> Confirms hot bearings, coupling misalignment
                heating, and overloaded motors identified by vibration
              </li>
              <li>
                <strong>Oil analysis:</strong> Wear debris analysis confirms bearing and gear
                deterioration trends from vibration data
              </li>
              <li>
                <strong>Motor current analysis:</strong> Current signature analysis (CSA)
                complements vibration for detecting electrical faults in induction motors
              </li>
              <li>
                <strong>Ultrasound:</strong> High-frequency airborne and structure-borne ultrasound
                detects bearing lubrication issues and electrical discharge before vibration changes
                are measurable
              </li>
            </ul>
          </ConceptBlock>

          <p className="text-[13.5px] italic leading-relaxed text-white">
            <span className="mr-1.5 font-semibold not-italic text-white">Note: </span>
            Vibration analysis requires training and practice to develop competence. Start with
            overall level trending and severity assessment, then progressively develop spectral
            analysis skills. The ISO 18436-2 certification pathway provides a structured route from
            basic to advanced analyst competence.
          </p>

          <SectionRule />

          <KeyTakeaways
            title="Vibration parameters"
            points={[
              'Displacement — low frequency (microns p-p).',
              'Velocity — general assessment (mm/s RMS).',
              'Acceleration — high frequency (g).',
              'FFT converts time waveform to spectrum.',
              '1x = imbalance, 2x = misalignment.',
            ]}
          />

          <KeyTakeaways
            title="Key standards"
            points={[
              'ISO 10816 / 20816 — severity zones A to D.',
              'ISO 18436-2 — analyst certification.',
              'P-F interval defines monitoring frequency.',
              'ST1426 — condition monitoring KSBs.',
              'Always record shaft RPM with readings.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section2-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Prev subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Thermal Imaging
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module4-section2-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Insulation Resistance Testing
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule4Section2_3;
