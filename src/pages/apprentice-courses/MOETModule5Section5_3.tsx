/**
 * MOET · Module 5 · Section 5 · Subsection 3 — Zero, Span and Linearity
 * Adjustments
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
 * original page; structure, shell and reading measure rebuilt. The original
 * placed its four InlineCheck questions out of numeric order (0, 3, 2, 1)
 * because each pairs with the section it follows — that pairing is preserved
 * here rather than renumbered.
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

const TITLE = 'Zero, Span and Linearity Adjustments - MOET Module 5 Section 5.3';
const DESCRIPTION =
  'Practical procedures for adjusting zero, span and linearity of process transmitters and instruments to restore measurement accuracy, including HART sensor trim and output trim functions.';

const quickCheckQuestions = [
  {
    id: 'qc1',
    question: 'What is a zero adjustment on a transmitter?',
    options: [
      'Adjusting the output at the low end of the range so it reads correctly at the zero/minimum input',
      'Adjusting the gain so the output is correct at the maximum input',
      'Correcting the curvature of the output across the mid-range',
      'Resetting the transmitter to its factory default configuration',
    ],
    correctIndex: 0,
    explanation:
      'Zero adjustment corrects the offset at the bottom of the measurement range, ensuring the output (e.g. 4 mA) is correct when the input is at its minimum value.',
  },
  {
    id: 'qc2',
    question: 'What is a span adjustment?',
    options: [
      'Adjusting the offset so the output is correct at the minimum input',
      'Adjusting the output at the high end of the range so it reads correctly at the maximum input',
      'Adding correction factors at intermediate points across the range',
      'Setting the time delay before the output responds to a change',
    ],
    correctIndex: 1,
    explanation:
      'Span adjustment corrects the gain/sensitivity so that the output at full scale (e.g. 20 mA) is correct when the input is at its maximum value.',
  },
  {
    id: 'qc3',
    question: 'Why should zero always be adjusted before span?',
    options: [
      'Because span adjustment is more time-consuming and should be left until last',
      'Because the span screw is physically harder to access than the zero screw',
      'Because zero offset affects the entire range, and adjusting span first would be invalidated when zero is subsequently adjusted',
      'Because the manufacturer void the warranty if span is adjusted first',
    ],
    correctIndex: 2,
    explanation:
      'Zero offset shifts the entire output range. If span is adjusted first, a subsequent zero adjustment would shift the whole curve, invalidating the span setting.',
  },
  {
    id: 'qc4',
    question: 'What is the difference between sensor trim and output trim on a HART transmitter?',
    options: [
      'Sensor trim corrects the 4-20 mA output; output trim corrects the digital reading of the input',
      'Both perform the same correction but at different temperatures',
      'Sensor trim is for pressure devices; output trim is for temperature devices',
      'Sensor trim corrects the input measurement (A/D conversion); output trim corrects the 4-20 mA output signal (D/A conversion)',
    ],
    correctIndex: 3,
    explanation:
      "Sensor trim adjusts the transmitter's digital reading of the process variable to match a known reference input. Output trim adjusts the 4-20 mA current output to match the transmitter's digital value. They are independent.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'For a 4-20 mA transmitter with a 0-100 degrees C range, what output should be produced at 0 degrees C?',
    options: ['0 mA', '4.00 mA', '12.00 mA', '20.00 mA'],
    correctAnswer: 1,
    explanation:
      'At the zero input (0 degrees C), the transmitter should output exactly 4.00 mA, which represents 0% of the measurement range.',
  },
  {
    id: 2,
    question: "What does a 'sensor trim' do on a HART transmitter?",
    options: [
      'Adjusts the 4-20 mA current output to match a precision milliamp meter',
      "Resets the transmitter's range to its default upper and lower values",
      "Adjusts the transmitter's sensor reading to match a known reference value, correcting sensor drift",
      'Applies a fixed damping value to smooth the output signal',
    ],
    correctAnswer: 2,
    explanation:
      "Sensor trim (also called lower/upper sensor trim) adjusts the digital characterisation of the sensor so the transmitter's internal reading matches the known applied input.",
  },
  {
    id: 3,
    question: 'What is linearity error?',
    options: [
      'A constant offset that shifts the entire output curve up or down',
      'An incorrect gain that makes the full-scale output too high or low',
      'A difference between the upscale and downscale readings at the same point',
      'The output deviates from a straight-line relationship between input and output, with the error varying across the range',
    ],
    correctAnswer: 3,
    explanation:
      'Linearity error means the relationship between input and output is not perfectly straight. The error magnitude varies across the range, typically being worst at mid-range.',
  },
  {
    id: 4,
    question: 'Can linearity errors be corrected by zero and span adjustments alone?',
    options: [
      'No -- linearity errors require multi-point characterisation or sensor replacement',
      'Yes -- adjusting zero corrects any curvature in the output',
      'Yes -- adjusting span removes mid-range deviation entirely',
      'Yes -- iterating zero and span will always flatten the error',
    ],
    correctAnswer: 0,
    explanation:
      'Zero and span adjustments only correct offset and gain errors (straight-line adjustments). Linearity errors (curvature) require multi-point characterisation correction in digital transmitters, or sensor replacement if the sensor itself is non-linear.',
  },
  {
    id: 5,
    question: "What is a 'bench calibration' versus an 'in-situ calibration'?",
    options: [
      'Bench calibration is done by the manufacturer; in-situ calibration is done by the end user',
      'Bench calibration removes the instrument for testing on a workbench; in-situ calibration tests the instrument installed in the process without removal',
      'Bench calibration uses digital tools; in-situ calibration uses only analogue screws',
      'Bench calibration checks zero only; in-situ calibration checks span only',
    ],
    correctAnswer: 1,
    explanation:
      'Bench calibration removes the instrument for precise laboratory-condition testing. In-situ calibration tests the instrument in place, accounting for installation effects but subject to process conditions.',
  },
  {
    id: 6,
    question: 'When adjusting a pneumatic transmitter, what does the zero spring adjustment do?',
    options: [
      'Sets the output pressure at the maximum measurement input',
      'Corrects the curvature of the output across the mid-range',
      'Adjusts the output pressure at minimum input',
      'Increases the speed at which the output responds to change',
    ],
    correctAnswer: 2,
    explanation:
      'On a pneumatic transmitter, the zero spring adjustment sets the output pressure (typically 3 psi / 0.2 bar) at the minimum measurement input.',
  },
  {
    id: 7,
    question: 'What is the recommended sequence for a full calibration adjustment?',
    options: [
      'Span first, then zero, with no need to re-check either afterwards',
      'Check linearity first, then adjust zero and span together in one step',
      'Adjust only whichever of zero or span is furthest out of tolerance',
      'Zero first, then span, then re-check zero, iterate until both are within tolerance, then check linearity',
    ],
    correctAnswer: 3,
    explanation:
      'Adjust zero first (offset), then span (gain), then re-check zero (span adjustment may slightly affect zero). Iterate until both are within tolerance. Then check intermediate points for linearity.',
  },
  {
    id: 8,
    question: "What does 'rangeability' mean for a transmitter?",
    options: [
      "The ratio of the maximum to minimum span that can be set, indicating the flexibility of the transmitter's configuration",
      'The maximum process pressure the sensor can withstand before damage',
      'The distance over which a wireless transmitter can send its signal',
      'The number of test points used during a five-point calibration check',
    ],
    correctAnswer: 0,
    explanation:
      "Rangeability (turndown ratio) indicates how much the transmitter's span can be reduced from its maximum calibrated span. For example, a 100:1 rangeability on a 0-10 bar sensor means it can be configured for spans as small as 0-0.1 bar.",
  },
  {
    id: 9,
    question: 'After completing zero and span adjustments, what must you document?',
    options: [
      'Only the final as-left readings, since the as-found data is no longer relevant',
      'As-found readings, adjustments made, as-left readings, reference standards used, and environmental conditions',
      'Only the serial number of the HART communicator used for the work',
      'Only the date and the technician name, with readings kept verbally',
    ],
    correctAnswer: 1,
    explanation:
      "Complete documentation includes as-found (before adjustment), details of adjustments made, as-left (after adjustment), reference standards with traceability, environmental conditions, and the technician's identification.",
  },
  {
    id: 10,
    question: 'Why is stabilisation time important at each test point during calibration?',
    options: [
      'It allows the HART communicator to download the new configuration',
      'It prevents the reference standard from drifting out of calibration',
      'Sensors need time to reach equilibrium; rushing readings before stabilisation introduces errors that appear as linearity problems',
      'It gives the output electronics time to warm up to operating temperature',
    ],
    correctAnswer: 2,
    explanation:
      'Physical processes (pressure equalisation, thermal equilibrium) take time. Pressure transmitters need seconds; temperature sensors in dry-block calibrators need several minutes. Readings taken before stabilisation are inaccurate.',
  },
  {
    id: 11,
    question: 'On a HART transmitter, which trim should be performed first?',
    options: [
      'Sensor trim first, because the output trim depends on the sensor reading',
      'Either order, because the two trims always interact and must be iterated',
      'Neither -- HART transmitters do not require trimming, only re-ranging',
      'Output trim first (at 4 mA and 20 mA), then sensor trim at reference points',
    ],
    correctAnswer: 3,
    explanation:
      'Output trim is performed first to ensure the 4-20 mA output is accurate. Then sensor trim corrects the input reading. This ensures the D/A converter is accurate before the sensor correction is applied.',
  },
  {
    id: 12,
    question: "What causes drift in a transmitter's zero and span over time?",
    options: [
      'Temperature cycling, vibration, aging of electronic components, mechanical stress on sensor elements, and corrosion',
      'A correctly calibrated transmitter that has simply not been used recently',
      'The use of a HART communicator to read the output during normal service',
      'Documenting the as-found and as-left readings at each calibration',
    ],
    correctAnswer: 0,
    explanation:
      'Multiple factors cause drift: thermal stress on electronics and sensors, vibration, component aging, mechanical stress, corrosion, and process conditions. Regular calibration monitors drift trends.',
  },
];

const faqs = [
  {
    question: 'What if zero and span adjustments interact and I cannot get both within tolerance?',
    answer:
      'Zero and span can interact, especially on analogue transmitters. The solution is to iterate: adjust zero, then span, then re-check zero. Repeat until both converge within tolerance. If they refuse to converge, the sensor or electronics may be faulty. On HART transmitters, sensor trim and output trim are independent and do not interact.',
  },
  {
    question:
      'Can I perform zero and span adjustments on a smart transmitter without a HART communicator?',
    answer:
      'Some smart transmitters have local push-button zero and span adjustment. However, for full calibration including sensor trim, output trim, and configuration changes, a HART communicator or equivalent digital tool is required. External zero/span screws may also be present on some models for analogue-style adjustment.',
  },
  {
    question: "What causes drift in a transmitter's zero and span?",
    answer:
      'Drift is caused by: temperature cycling (thermal stress on electronic components and sensors), vibration, aging of electronic components, mechanical stress on sensor elements, corrosion, and process conditions (e.g. chemical attack on wetted parts). Regular calibration monitors drift trends to predict when maintenance is needed.',
  },
  {
    question: 'How do I correct linearity errors on a digital transmitter?',
    answer:
      "Many smart transmitters support multi-point characterisation where correction factors are applied at multiple points across the range. The HART communicator's sensor trim function at lower and upper reference points can correct two-point linearity. For more complex non-linearity, some transmitters offer custom characterisation tables. If the sensor itself is damaged, replacement is the only solution.",
  },
  {
    question: 'What is the effect of over-ranging on zero and span accuracy?',
    answer:
      "Applying input beyond the transmitter's maximum rated range (over-ranging) can cause permanent deformation of the sensing element, shifting both zero and span. Most pressure transmitters specify a maximum overrange pressure -- exceeding this can cause irreversible damage. After any suspected over-range event, perform a full calibration check.",
  },
];

const MOETModule5Section5_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.5 · Subsection 3"
        title="Zero, Span and Linearity Adjustments"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section5"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Practical procedures for restoring transmitter measurement accuracy.
          </p>

          <TLDR
            points={[
              'Zero: offset correction at minimum input (4 mA point).',
              'Span: gain correction at maximum input (20 mA point).',
              'Sequence: always adjust zero before span, then iterate.',
              'Linearity: mid-range accuracy requiring multi-point correction.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain zero, span, and linearity errors and their effects on measurement accuracy',
              'Perform zero and span adjustments in the correct sequence on analogue and digital transmitters',
              'Use HART sensor trim and output trim functions for smart transmitter calibration',
              'Identify and correct linearity errors using multi-point characterisation',
              'Document calibration adjustments with as-found and as-left data',
              'Distinguish between bench and in-situ calibration approaches',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Maintenance technician context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sensor trim:</strong> the HART function correcting the input A/D reading.
              </li>
              <li>
                <strong>Output trim:</strong> the HART function correcting the D/A current output.
              </li>
              <li>
                <strong>Stabilisation:</strong> allow equilibrium before recording readings.
              </li>
              <li>
                <strong>Documentation:</strong> record as-found and as-left data for every
                adjustment.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Understanding zero, span and linearity</ContentEyebrow>

          <ConceptBlock
            title="Understanding zero, span, and linearity"
            onSite="Zero and span correct two-point errors (offset and gain). Linearity is a third, independent error that requires separate assessment at intermediate test points."
          >
            <p>
              <strong>Zero error (offset)</strong> is a constant shift in the output across the
              entire range. If the zero is high, all readings are shifted upwards by the same
              amount. Zero error is corrected by adjusting the transmitter&apos;s output at the
              minimum input so that it reads exactly 4.00 mA (or 0.2 bar for pneumatic). This is the
              first adjustment to make because it affects all subsequent readings.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Three types of transmitter error">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Zero error:</strong> constant offset -- the entire output curve is shifted
                up or down. Corrected by zero adjustment.
              </li>
              <li>
                <strong>Span error:</strong> incorrect gain -- the slope of the output curve is
                wrong. Output at zero may be correct but full-scale is off. Corrected by span
                adjustment.
              </li>
              <li>
                <strong>Linearity error:</strong> the output curve is not straight -- mid-range
                readings deviate from the ideal. Cannot be corrected by zero/span alone.
              </li>
            </ul>
            <p>
              <strong>Span error (gain error)</strong> occurs when the transmitter&apos;s
              sensitivity is incorrect. The output at zero may be correct, but the output at full
              scale is either too high or too low. This creates an error that increases with the
              measured value. Span is adjusted by applying the maximum input and adjusting the
              output to read exactly 20.00 mA (or 1.0 bar). Span adjustment should always follow
              zero adjustment.
            </p>
            <p>
              <strong>Linearity error</strong> is a deviation from the ideal straight-line
              relationship between input and output. The output at zero and full scale may be
              correct, but mid-range readings are off. Linearity error cannot be corrected by zero
              and span adjustments alone -- it requires multi-point characterisation in digital
              transmitters or replacement of the sensor element if it has developed non-linear
              behaviour.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>HART sensor trim and output trim</ContentEyebrow>

          <ConceptBlock
            title="HART sensor trim and output trim"
            onSite="On HART transmitters, sensor trim and output trim do not interact. This means you do not need to iterate between them as you would with analogue zero and span screws. However, always verify at all five test points after completing both trims."
          >
            <p>
              Smart transmitters using HART protocol have two independent calibration functions.{' '}
              <strong>Sensor trim</strong> adjusts the transmitter&apos;s internal digital reading
              of the process variable to match a known applied input. It corrects drift in the
              sensor and analogue-to-digital conversion. The technician applies a known reference
              (e.g. a precise pressure from a calibrator) and uses the HART communicator to tell the
              transmitter what the true value is.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Sensor trim (A/D)">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Corrects the input measurement reading.</li>
              <li>Apply known reference input to the sensor.</li>
              <li>Use HART communicator to set the true value.</li>
              <li>Lower and upper sensor trim points.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Output trim (D/A)">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Corrects the 4-20 mA current output.</li>
              <li>Measure actual output with precision milliamp meter.</li>
              <li>Use HART communicator to adjust output.</li>
              <li>Trim at 4 mA and 20 mA points.</li>
            </ul>
            <p>
              <strong>Output trim (D/A trim)</strong> adjusts the digital-to-analogue converter so
              the 4-20 mA current output accurately represents the transmitter&apos;s internal
              digital value. This corrects drift in the output electronics. The technician uses a
              precision milliamp meter to measure the actual output and uses the HART communicator
              to trim the output to match.
            </p>
            <p>
              On HART transmitters, sensor trim and output trim are independent -- adjusting one
              does not affect the other. This is a significant advantage over analogue transmitters
              where zero and span adjustments can interact. The recommended procedure is: (1)
              perform output trim first (at 4 mA and 20 mA points), (2) then perform sensor trim at
              the lower and upper reference points.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Practical adjustment procedure</ContentEyebrow>

          <ConceptBlock
            title="Practical adjustment procedure"
            onSite="Allow adequate stabilisation time at each test point before taking readings. Pressure transmitters need time for pressure to equalise. Temperature sensors need several minutes in dry-block calibrators. Rushing creates errors that mimic linearity problems."
          >
            <p>
              For an <strong>analogue transmitter</strong>: (1) Record as-found data at all five
              test points. (2) Apply zero input and adjust the zero screw until the output reads
              exactly 4.00 mA. (3) Apply full-scale input and adjust the span screw until the output
              reads exactly 20.00 mA. (4) Re-check zero -- span adjustment may have shifted it
              slightly. (5) Iterate between zero and span until both are within tolerance. (6) Check
              all five points for linearity. (7) Record as-left data.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Step-by-step comparison">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Step</th>
                    <th className="py-2 pr-4 font-medium text-white">Analogue transmitter</th>
                    <th className="py-2 font-medium text-white">HART smart transmitter</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">1</td>
                    <td className="py-2 pr-4">Record as-found at 5 points</td>
                    <td className="py-2">Record as-found at 5 points</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">2</td>
                    <td className="py-2 pr-4">Adjust zero screw at 4 mA</td>
                    <td className="py-2">Output trim at 4 mA and 20 mA</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">3</td>
                    <td className="py-2 pr-4">Adjust span screw at 20 mA</td>
                    <td className="py-2">Lower sensor trim</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">4</td>
                    <td className="py-2 pr-4">Re-check zero, iterate</td>
                    <td className="py-2">Upper sensor trim</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">5</td>
                    <td className="py-2 pr-4">Check linearity at 5 points</td>
                    <td className="py-2">Verify all 5 points, record as-left</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              For a <strong>HART smart transmitter</strong>: (1) Record as-found data at all five
              test points. (2) Perform output trim at 4 mA and 20 mA using a precision milliamp
              meter. (3) Apply lower reference input and perform lower sensor trim. (4) Apply upper
              reference input and perform upper sensor trim. (5) Re-check all five test points and
              record as-left data. (6) Verify the configuration parameters have not been
              inadvertently changed.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Linearity assessment and correction</ContentEyebrow>

          <ConceptBlock
            title="Linearity assessment and correction"
            onSite="When performing a five-point calibration check (0%, 25%, 50%, 75%, 100%), also perform the check in the reverse direction (100% down to 0%) to identify any hysteresis error. Hysteresis appears as a difference between upscale and downscale readings at the same input point."
          >
            <p>
              After zero and span are within tolerance, linearity must be checked at intermediate
              test points (typically 25%, 50%, and 75% of range). The transmitter output at each
              point is compared to the ideal output. For example, at 50% of a 0-10 bar range (5 bar
              input), the output should be exactly 12.00 mA. If it reads 12.15 mA, there is a
              linearity error of +0.15 mA at mid-range.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Linearity error correction methods">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Multi-point characterisation:</strong> digital transmitters can apply
                correction factors at multiple points across the range.
              </li>
              <li>
                <strong>Custom linearisation tables:</strong> some transmitters accept user-defined
                input/output tables for complex non-linear sensors.
              </li>
              <li>
                <strong>Sensor replacement:</strong> if the sensor element itself has developed
                non-linearity, replacement is the only solution.
              </li>
              <li>
                <strong>Re-characterisation:</strong> the transmitter manufacturer may need to
                re-characterise the sensor-transmitter combination.
              </li>
            </ul>
            <p>
              Linearity errors can indicate sensor degradation, mechanical damage, or contamination
              of the sensing element. If linearity errors are increasing over successive
              calibrations (trending analysis), this indicates a developing problem that will
              eventually require sensor replacement. Document linearity data at each calibration to
              enable trend analysis over the instrument&apos;s lifetime.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Bench vs in-situ calibration and documentation</ContentEyebrow>

          <ConceptBlock
            title="Bench vs in-situ calibration and documentation"
            onSite="The as-found data is the most valuable element of the calibration record. It reveals drift trends, supports calibration interval optimisation, and is essential for out-of-tolerance investigations. Never skip recording as-found data, even when a quick adjustment is tempting."
          >
            <p>
              <strong>Bench calibration</strong> removes the instrument from the process for testing
              on a workbench under controlled conditions. This allows precise application of
              reference inputs, controlled environmental conditions, and access to all adjustment
              points. It is the preferred method for high-accuracy work and when the instrument
              needs repair or extensive adjustment.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Documentation requirements">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>As-found data:</strong> readings at all test points before any adjustment
                (reveals drift).
              </li>
              <li>
                <strong>Adjustments made:</strong> details of what was adjusted (zero, span, sensor
                trim, output trim).
              </li>
              <li>
                <strong>As-left data:</strong> readings at all test points after adjustment (proves
                compliance).
              </li>
              <li>
                <strong>Reference standards:</strong> identification, certificate numbers, and
                calibration due dates.
              </li>
              <li>
                <strong>Environmental conditions:</strong> temperature, humidity at time of
                calibration.
              </li>
              <li>
                <strong>Technician:</strong> name, signature, and date.
              </li>
            </ul>
            <p>
              <strong>In-situ calibration</strong> tests the instrument installed in the process
              without removal. This accounts for installation effects (head pressure, ambient
              temperature, vibration) and avoids the risk of damaging the instrument or process
              connections during removal and reinstallation. However, it is subject to process
              conditions and may not achieve the same accuracy as bench calibration.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Adjustment fundamentals: zero is the offset correction at minimum input; span is the gain correction at maximum input; the sequence is zero first, then span, then iterate; linearity is a mid-range multi-point check; hysteresis is the upscale vs downscale difference.',
              'HART trim functions: sensor trim corrects the input A/D reading; output trim corrects the D/A current output; the two are independent and do not interact; output trim is performed first, then sensor trim; always verify all five test points after trim.',
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
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section5-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Test Instruments for Control Systems
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section5-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Functional Testing of Loops
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section5_3;
