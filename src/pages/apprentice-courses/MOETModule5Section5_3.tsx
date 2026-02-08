import { ArrowLeft, Settings, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Zero, Span and Linearity Adjustments - MOET Module 5 Section 5.3";
const DESCRIPTION = "Practical procedures for adjusting zero, span and linearity of process transmitters and instruments to restore measurement accuracy, including HART sensor trim and output trim functions.";

const quickCheckQuestions = [
  {
    id: "qc1",
    question: "What is a zero adjustment on a transmitter?",
    options: [
      "Setting the output to zero milliamps",
      "Adjusting the output at the low end of the range so it reads correctly at the zero/minimum input",
      "Turning the transmitter off",
      "Removing all calibration data"
    ],
    correctIndex: 1,
    explanation: "Zero adjustment corrects the offset at the bottom of the measurement range, ensuring the output (e.g. 4 mA) is correct when the input is at its minimum value."
  },
  {
    id: "qc2",
    question: "What is a span adjustment?",
    options: [
      "Adjusting the physical length of the sensor",
      "Adjusting the output at the high end of the range so it reads correctly at the maximum input",
      "Changing the measurement units",
      "Adjusting the response time"
    ],
    correctIndex: 1,
    explanation: "Span adjustment corrects the gain/sensitivity so that the output at full scale (e.g. 20 mA) is correct when the input is at its maximum value."
  },
  {
    id: "qc3",
    question: "Why should zero always be adjusted before span?",
    options: [
      "It is quicker",
      "Because zero offset affects the entire range, and adjusting span first would be invalidated when zero is subsequently adjusted",
      "There is no particular reason",
      "Because the zero screw is easier to access"
    ],
    correctIndex: 1,
    explanation: "Zero offset shifts the entire output range. If span is adjusted first, a subsequent zero adjustment would shift the whole curve, invalidating the span setting."
  },
  {
    id: "qc4",
    question: "What is the difference between sensor trim and output trim on a HART transmitter?",
    options: [
      "They are identical functions",
      "Sensor trim corrects the input measurement (A/D conversion); output trim corrects the 4-20 mA output signal (D/A conversion)",
      "Sensor trim is for thermocouples only",
      "Output trim is only available from the manufacturer"
    ],
    correctIndex: 1,
    explanation: "Sensor trim adjusts the transmitter's digital reading of the process variable to match a known reference input. Output trim adjusts the 4-20 mA current output to match the transmitter's digital value. They are independent."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "For a 4-20 mA transmitter with a 0-100 degrees C range, what output should be produced at 0 degrees C?",
    options: ["0 mA", "4.00 mA", "12.00 mA", "20.00 mA"],
    correctAnswer: 1,
    explanation: "At the zero input (0 degrees C), the transmitter should output exactly 4.00 mA, which represents 0% of the measurement range."
  },
  {
    id: 2,
    question: "What does a 'sensor trim' do on a HART transmitter?",
    options: ["Trims the sensor wires to length", "Adjusts the transmitter's sensor reading to match a known reference value, correcting sensor drift", "Changes the sensor type", "Removes the sensor from the transmitter"],
    correctAnswer: 1,
    explanation: "Sensor trim (also called lower/upper sensor trim) adjusts the digital characterisation of the sensor so the transmitter's internal reading matches the known applied input."
  },
  {
    id: 3,
    question: "What is linearity error?",
    options: ["The output signal is too high at all points", "The output deviates from a straight-line relationship between input and output, with the error varying across the range", "The transmitter responds too slowly", "The output signal is noisy"],
    correctAnswer: 1,
    explanation: "Linearity error means the relationship between input and output is not perfectly straight. The error magnitude varies across the range, typically being worst at mid-range."
  },
  {
    id: 4,
    question: "Can linearity errors be corrected by zero and span adjustments alone?",
    options: ["Yes, always", "No -- linearity errors require multi-point characterisation or sensor replacement", "Only if the error is small", "Only on digital transmitters"],
    correctAnswer: 1,
    explanation: "Zero and span adjustments only correct offset and gain errors (straight-line adjustments). Linearity errors (curvature) require multi-point characterisation correction in digital transmitters, or sensor replacement if the sensor itself is non-linear."
  },
  {
    id: 5,
    question: "What is a 'bench calibration' versus an 'in-situ calibration'?",
    options: ["They are performed in the same location", "Bench calibration removes the instrument for testing on a workbench; in-situ calibration tests the instrument installed in the process without removal", "Bench calibration is less accurate", "In-situ calibration cannot use reference standards"],
    correctAnswer: 1,
    explanation: "Bench calibration removes the instrument for precise laboratory-condition testing. In-situ calibration tests the instrument in place, accounting for installation effects but subject to process conditions."
  },
  {
    id: 6,
    question: "When adjusting a pneumatic transmitter, what does the zero spring adjustment do?",
    options: ["Adjusts the output pressure at minimum input", "Controls the damping", "Sets the fail-safe position", "Adjusts the supply pressure"],
    correctAnswer: 0,
    explanation: "On a pneumatic transmitter, the zero spring adjustment sets the output pressure (typically 3 psi / 0.2 bar) at the minimum measurement input."
  },
  {
    id: 7,
    question: "What is the recommended sequence for a full calibration adjustment?",
    options: ["Span first, then zero, then linearity", "Zero first, then span, then re-check zero, iterate until both are within tolerance, then check linearity", "Linearity first, then zero and span", "Any order is acceptable"],
    correctAnswer: 1,
    explanation: "Adjust zero first (offset), then span (gain), then re-check zero (span adjustment may slightly affect zero). Iterate until both are within tolerance. Then check intermediate points for linearity."
  },
  {
    id: 8,
    question: "What does 'rangeability' mean for a transmitter?",
    options: ["The physical distance it can measure", "The ratio of the maximum to minimum span that can be set, indicating the flexibility of the transmitter's configuration", "The number of ranges available", "The distance between the transmitter and the control room"],
    correctAnswer: 1,
    explanation: "Rangeability (turndown ratio) indicates how much the transmitter's span can be reduced from its maximum calibrated span. For example, a 100:1 rangeability on a 0-10 bar sensor means it can be configured for spans as small as 0-0.1 bar."
  },
  {
    id: 9,
    question: "After completing zero and span adjustments, what must you document?",
    options: ["Only the date", "As-found readings, adjustments made, as-left readings, reference standards used, and environmental conditions", "Only the as-left readings", "The cost of the calibration"],
    correctAnswer: 1,
    explanation: "Complete documentation includes as-found (before adjustment), details of adjustments made, as-left (after adjustment), reference standards with traceability, environmental conditions, and the technician's identification."
  },
  {
    id: 10,
    question: "Why is stabilisation time important at each test point during calibration?",
    options: ["It makes the calibration take longer, showing thoroughness", "Sensors need time to reach equilibrium; rushing readings before stabilisation introduces errors that appear as linearity problems", "It is only important for pressure instruments", "Stabilisation is not necessary for digital instruments"],
    correctAnswer: 1,
    explanation: "Physical processes (pressure equalisation, thermal equilibrium) take time. Pressure transmitters need seconds; temperature sensors in dry-block calibrators need several minutes. Readings taken before stabilisation are inaccurate."
  },
  {
    id: 11,
    question: "On a HART transmitter, which trim should be performed first?",
    options: ["Sensor trim, then output trim", "Output trim first (at 4 mA and 20 mA), then sensor trim at reference points", "Either order is acceptable", "Neither -- they are automatic"],
    correctAnswer: 1,
    explanation: "Output trim is performed first to ensure the 4-20 mA output is accurate. Then sensor trim corrects the input reading. This ensures the D/A converter is accurate before the sensor correction is applied."
  },
  {
    id: 12,
    question: "What causes drift in a transmitter's zero and span over time?",
    options: ["Operator interference", "Temperature cycling, vibration, aging of electronic components, mechanical stress on sensor elements, and corrosion", "Only power supply variations", "Drift does not occur in modern transmitters"],
    correctAnswer: 1,
    explanation: "Multiple factors cause drift: thermal stress on electronics and sensors, vibration, component aging, mechanical stress, corrosion, and process conditions. Regular calibration monitors drift trends."
  }
];

const faqs = [
  {
    question: "What if zero and span adjustments interact and I cannot get both within tolerance?",
    answer: "Zero and span can interact, especially on analogue transmitters. The solution is to iterate: adjust zero, then span, then re-check zero. Repeat until both converge within tolerance. If they refuse to converge, the sensor or electronics may be faulty. On HART transmitters, sensor trim and output trim are independent and do not interact."
  },
  {
    question: "Can I perform zero and span adjustments on a smart transmitter without a HART communicator?",
    answer: "Some smart transmitters have local push-button zero and span adjustment. However, for full calibration including sensor trim, output trim, and configuration changes, a HART communicator or equivalent digital tool is required. External zero/span screws may also be present on some models for analogue-style adjustment."
  },
  {
    question: "What causes drift in a transmitter's zero and span?",
    answer: "Drift is caused by: temperature cycling (thermal stress on electronic components and sensors), vibration, aging of electronic components, mechanical stress on sensor elements, corrosion, and process conditions (e.g. chemical attack on wetted parts). Regular calibration monitors drift trends to predict when maintenance is needed."
  },
  {
    question: "How do I correct linearity errors on a digital transmitter?",
    answer: "Many smart transmitters support multi-point characterisation where correction factors are applied at multiple points across the range. The HART communicator's sensor trim function at lower and upper reference points can correct two-point linearity. For more complex non-linearity, some transmitters offer custom characterisation tables. If the sensor itself is damaged, replacement is the only solution."
  },
  {
    question: "What is the effect of over-ranging on zero and span accuracy?",
    answer: "Applying input beyond the transmitter's maximum rated range (over-ranging) can cause permanent deformation of the sensing element, shifting both zero and span. Most pressure transmitters specify a maximum overrange pressure -- exceeding this can cause irreversible damage. After any suspected over-range event, perform a full calibration check."
  }
];

const MOETModule5Section5_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Settings className="h-4 w-4" />
            <span>Module 5.5.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Zero, Span and Linearity Adjustments
          </h1>
          <p className="text-white/80">
            Practical procedures for restoring transmitter measurement accuracy
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Zero:</strong> Offset correction at minimum input (4 mA point)</li>
              <li className="pl-1"><strong>Span:</strong> Gain correction at maximum input (20 mA point)</li>
              <li className="pl-1"><strong>Sequence:</strong> Always adjust zero before span, then iterate</li>
              <li className="pl-1"><strong>Linearity:</strong> Mid-range accuracy requiring multi-point correction</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Sensor trim:</strong> HART function correcting input A/D reading</li>
              <li className="pl-1"><strong>Output trim:</strong> HART function correcting D/A current output</li>
              <li className="pl-1"><strong>Stabilisation:</strong> Allow equilibrium before recording readings</li>
              <li className="pl-1"><strong>Documentation:</strong> Record as-found and as-left data for every adjustment</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain zero, span, and linearity errors and their effects on measurement accuracy",
              "Perform zero and span adjustments in the correct sequence on analogue and digital transmitters",
              "Use HART sensor trim and output trim functions for smart transmitter calibration",
              "Identify and correct linearity errors using multi-point characterisation",
              "Document calibration adjustments with as-found and as-left data",
              "Distinguish between bench and in-situ calibration approaches"
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
            Understanding Zero, Span, and Linearity
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Zero error (offset)</strong> is a constant shift in the output across the entire range.
              If the zero is high, all readings are shifted upwards by the same amount. Zero error is corrected
              by adjusting the transmitter's output at the minimum input so that it reads exactly 4.00 mA
              (or 0.2 bar for pneumatic). This is the first adjustment to make because it affects all
              subsequent readings.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Three Types of Transmitter Error</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Zero error:</strong> Constant offset -- the entire output curve is shifted up or down. Corrected by zero adjustment</li>
                <li className="pl-1"><strong>Span error:</strong> Incorrect gain -- the slope of the output curve is wrong. Output at zero may be correct but full-scale is off. Corrected by span adjustment</li>
                <li className="pl-1"><strong>Linearity error:</strong> The output curve is not straight -- mid-range readings deviate from the ideal. Cannot be corrected by zero/span alone</li>
              </ul>
            </div>

            <p>
              <strong>Span error (gain error)</strong> occurs when the transmitter's sensitivity is incorrect.
              The output at zero may be correct, but the output at full scale is either too high or too low.
              This creates an error that increases with the measured value. Span is adjusted by applying the
              maximum input and adjusting the output to read exactly 20.00 mA (or 1.0 bar). Span adjustment
              should always follow zero adjustment.
            </p>

            <p>
              <strong>Linearity error</strong> is a deviation from the ideal straight-line relationship between
              input and output. The output at zero and full scale may be correct, but mid-range readings are off.
              Linearity error cannot be corrected by zero and span adjustments alone -- it requires multi-point
              characterisation in digital transmitters or replacement of the sensor element if it has developed
              non-linear behaviour.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Zero and span correct two-point errors (offset and gain). Linearity
              is a third, independent error that requires separate assessment at intermediate test points.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            HART Sensor Trim and Output Trim
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Smart transmitters using HART protocol have two independent calibration functions.
              <strong> Sensor trim</strong> adjusts the transmitter's internal digital reading of the process
              variable to match a known applied input. It corrects drift in the sensor and analogue-to-digital
              conversion. The technician applies a known reference (e.g. a precise pressure from a calibrator)
              and uses the HART communicator to tell the transmitter what the true value is.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Sensor Trim (A/D)</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Corrects the input measurement reading</li>
                  <li className="pl-1">Apply known reference input to the sensor</li>
                  <li className="pl-1">Use HART communicator to set the true value</li>
                  <li className="pl-1">Lower and upper sensor trim points</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Output Trim (D/A)</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Corrects the 4-20 mA current output</li>
                  <li className="pl-1">Measure actual output with precision milliamp meter</li>
                  <li className="pl-1">Use HART communicator to adjust output</li>
                  <li className="pl-1">Trim at 4 mA and 20 mA points</li>
                </ul>
              </div>
            </div>

            <p>
              <strong>Output trim (D/A trim)</strong> adjusts the digital-to-analogue converter so the 4-20 mA
              current output accurately represents the transmitter's internal digital value. This corrects drift
              in the output electronics. The technician uses a precision milliamp meter to measure the actual
              output and uses the HART communicator to trim the output to match.
            </p>

            <p>
              On HART transmitters, sensor trim and output trim are independent -- adjusting one does not
              affect the other. This is a significant advantage over analogue transmitters where zero and span
              adjustments can interact. The recommended procedure is: (1) perform output trim first (at 4 mA
              and 20 mA points), (2) then perform sensor trim at the lower and upper reference points.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> On HART transmitters, sensor trim and output trim do not interact.
              This means you do not need to iterate between them as you would with analogue zero and span screws.
              However, always verify at all five test points after completing both trims.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Practical Adjustment Procedure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              For an <strong>analogue transmitter</strong>: (1) Record as-found data at all five test points.
              (2) Apply zero input and adjust the zero screw until the output reads exactly 4.00 mA. (3) Apply
              full-scale input and adjust the span screw until the output reads exactly 20.00 mA. (4) Re-check
              zero -- span adjustment may have shifted it slightly. (5) Iterate between zero and span until both
              are within tolerance. (6) Check all five points for linearity. (7) Record as-left data.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Step-by-Step Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Step</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Analogue Transmitter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">HART Smart Transmitter</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">1</td><td className="border border-white/10 px-3 py-2">Record as-found at 5 points</td><td className="border border-white/10 px-3 py-2">Record as-found at 5 points</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">2</td><td className="border border-white/10 px-3 py-2">Adjust zero screw at 4 mA</td><td className="border border-white/10 px-3 py-2">Output trim at 4 mA and 20 mA</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">3</td><td className="border border-white/10 px-3 py-2">Adjust span screw at 20 mA</td><td className="border border-white/10 px-3 py-2">Lower sensor trim</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">4</td><td className="border border-white/10 px-3 py-2">Re-check zero, iterate</td><td className="border border-white/10 px-3 py-2">Upper sensor trim</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">5</td><td className="border border-white/10 px-3 py-2">Check linearity at 5 points</td><td className="border border-white/10 px-3 py-2">Verify all 5 points, record as-left</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p>
              For a <strong>HART smart transmitter</strong>: (1) Record as-found data at all five test points.
              (2) Perform output trim at 4 mA and 20 mA using a precision milliamp meter. (3) Apply lower
              reference input and perform lower sensor trim. (4) Apply upper reference input and perform upper
              sensor trim. (5) Re-check all five test points and record as-left data. (6) Verify the configuration
              parameters have not been inadvertently changed.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Allow adequate stabilisation time at each test point before taking
              readings. Pressure transmitters need time for pressure to equalise. Temperature sensors need
              several minutes in dry-block calibrators. Rushing creates errors that mimic linearity problems.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Linearity Assessment and Correction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              After zero and span are within tolerance, linearity must be checked at intermediate test points
              (typically 25%, 50%, and 75% of range). The transmitter output at each point is compared to
              the ideal output. For example, at 50% of a 0-10 bar range (5 bar input), the output should
              be exactly 12.00 mA. If it reads 12.15 mA, there is a linearity error of +0.15 mA at mid-range.
            </p>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Linearity Error Correction Methods</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Multi-point characterisation:</strong> Digital transmitters can apply correction factors at multiple points across the range</li>
                <li className="pl-1"><strong>Custom linearisation tables:</strong> Some transmitters accept user-defined input/output tables for complex non-linear sensors</li>
                <li className="pl-1"><strong>Sensor replacement:</strong> If the sensor element itself has developed non-linearity, replacement is the only solution</li>
                <li className="pl-1"><strong>Re-characterisation:</strong> The transmitter manufacturer may need to re-characterise the sensor-transmitter combination</li>
              </ul>
            </div>

            <p>
              Linearity errors can indicate sensor degradation, mechanical damage, or contamination of the
              sensing element. If linearity errors are increasing over successive calibrations (trending
              analysis), this indicates a developing problem that will eventually require sensor replacement.
              Document linearity data at each calibration to enable trend analysis over the instrument's lifetime.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Practical tip:</strong> When performing a five-point calibration check (0%, 25%, 50%,
              75%, 100%), also perform the check in the reverse direction (100% down to 0%) to identify any
              hysteresis error. Hysteresis appears as a difference between upscale and downscale readings at
              the same input point.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Bench vs In-Situ Calibration and Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Bench calibration</strong> removes the instrument from the process for testing on a
              workbench under controlled conditions. This allows precise application of reference inputs,
              controlled environmental conditions, and access to all adjustment points. It is the preferred
              method for high-accuracy work and when the instrument needs repair or extensive adjustment.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>As-found data:</strong> Readings at all test points before any adjustment (reveals drift)</li>
                <li className="pl-1"><strong>Adjustments made:</strong> Details of what was adjusted (zero, span, sensor trim, output trim)</li>
                <li className="pl-1"><strong>As-left data:</strong> Readings at all test points after adjustment (proves compliance)</li>
                <li className="pl-1"><strong>Reference standards:</strong> Identification, certificate numbers, and calibration due dates</li>
                <li className="pl-1"><strong>Environmental conditions:</strong> Temperature, humidity at time of calibration</li>
                <li className="pl-1"><strong>Technician:</strong> Name, signature, and date</li>
              </ul>
            </div>

            <p>
              <strong>In-situ calibration</strong> tests the instrument installed in the process without
              removal. This accounts for installation effects (head pressure, ambient temperature, vibration)
              and avoids the risk of damaging the instrument or process connections during removal and
              reinstallation. However, it is subject to process conditions and may not achieve the same
              accuracy as bench calibration.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> The as-found data is the most valuable element of the calibration record.
              It reveals drift trends, supports calibration interval optimisation, and is essential for
              out-of-tolerance investigations. Never skip recording as-found data, even when a quick adjustment
              is tempting.
            </p>
          </div>
        </section>

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

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Adjustment Fundamentals</p>
                <ul className="space-y-0.5">
                  <li>Zero -- offset correction at minimum input</li>
                  <li>Span -- gain correction at maximum input</li>
                  <li>Sequence -- zero first, then span, then iterate</li>
                  <li>Linearity -- mid-range multi-point check</li>
                  <li>Hysteresis -- upscale vs downscale difference</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">HART Trim Functions</p>
                <ul className="space-y-0.5">
                  <li>Sensor trim -- corrects input A/D reading</li>
                  <li>Output trim -- corrects D/A current output</li>
                  <li>Independent -- trims do not interact</li>
                  <li>Output trim first, then sensor trim</li>
                  <li>Always verify all five test points after trim</li>
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
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section5-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section5-4">
              Next: Functional Testing of Loops
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section5_3;
