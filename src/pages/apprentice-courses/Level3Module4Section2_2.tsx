/**
 * Level 3 Module 4 Section 2.2 - RCD and Loop Impedance Testers
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "RCD and Loop Impedance Testers - Level 3 Module 4 Section 2.2";
const DESCRIPTION = "Master the use of RCD testers and earth fault loop impedance testers to verify protection systems comply with BS 7671 disconnection time requirements.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "At what multiple of rated residual current must a 30mA RCD trip within 40ms?",
    options: [
      "At exactly 30mA (1x rated current)",
      "At 150mA (5x rated current)",
      "At 300mA (10x rated current)",
      "At 15mA (0.5x rated current)"
    ],
    correctIndex: 1,
    explanation: "BS EN 61008/61009 requires that an RCD must trip within 40ms when tested at 5 times its rated residual current (5 x IR). For a 30mA RCD, this means it must trip within 40ms at 150mA. This ensures fast disconnection for potentially lethal shock currents."
  },
  {
    id: "check-2",
    question: "What is the maximum measured earth fault loop impedance (Zs) for a 32A Type B MCB to achieve 0.4 second disconnection?",
    options: [
      "0.72 ohms",
      "1.15 ohms",
      "1.44 ohms",
      "2.30 ohms"
    ],
    correctIndex: 2,
    explanation: "BS 7671 Table 41.3 gives Zs max for a 32A Type B MCB as 1.44 ohms. This is the maximum value to ensure the MCB trips within 0.4 seconds under fault conditions. Measured values must be below this, accounting for temperature rise (multiply by 0.8 if testing cold circuits)."
  },
  {
    id: "check-3",
    question: "Why should RCD testing be performed at both 0 degrees and 180 degrees phase angle?",
    options: [
      "To test both the line and neutral conductors",
      "To ensure the RCD trips on both positive and negative half-cycles of the waveform",
      "To check for loose connections",
      "BS 7671 requires two tests for compliance"
    ],
    correctIndex: 1,
    explanation: "RCDs should trip on either half-cycle of the AC waveform. Testing at 0 and 180 degrees ensures the RCD operates correctly regardless of where in the cycle a fault occurs. Some RCDs may have slightly different trip times depending on polarity, so both must be within specification."
  },
  {
    id: "check-4",
    question: "A loop impedance tester displays Ze = 0.35 ohms and Zs = 1.05 ohms on a radial circuit. What is the circuit resistance (R1 + R2)?",
    options: [
      "0.35 ohms",
      "0.70 ohms",
      "1.05 ohms",
      "1.40 ohms"
    ],
    correctIndex: 1,
    explanation: "Earth fault loop impedance Zs = Ze + (R1 + R2). Therefore R1 + R2 = Zs - Ze = 1.05 - 0.35 = 0.70 ohms. This relationship is fundamental to understanding loop impedance and allows verification by calculation when Ze and R1+R2 are measured separately."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "An RCD tester is connected at a socket outlet and the test is performed. The measured trip time at rated residual current is 28ms. What does this indicate?",
    options: [
      "The RCD is faulty and must be replaced",
      "The RCD is operating correctly - trip time is within specification",
      "The RCD is too sensitive and may cause nuisance tripping",
      "The test was performed incorrectly"
    ],
    correctAnswer: 1,
    explanation: "BS EN 61008/61009 requires RCDs to trip within 300ms at rated current (IR). A trip time of 28ms is well within this limit and indicates the RCD is operating correctly. Trip times at IR are typically 20-30ms for quality devices. The 40ms limit applies only at 5x IR."
  },
  {
    id: 2,
    question: "When testing loop impedance at the origin of a TN-C-S installation, you measure Ze = 0.18 ohms. What does this value represent?",
    options: [
      "The total fault loop impedance to that point",
      "The external earth fault loop impedance from the transformer to the origin",
      "The resistance of the main earthing conductor",
      "The impedance of the consumer's installation only"
    ],
    correctAnswer: 1,
    explanation: "Ze (external earth fault loop impedance) is measured at the origin with the installation disconnected. It represents the impedance from the source transformer, through the supply cable, and back via the combined neutral/earth (PEN) conductor. Ze should be compared with the value declared by the DNO."
  },
  {
    id: 3,
    question: "A Type A RCD differs from a Type AC RCD in that Type A:",
    options: [
      "Has a faster trip time",
      "Can detect pulsating DC as well as sinusoidal AC residual currents",
      "Has a higher rated residual current",
      "Is only suitable for industrial installations"
    ],
    correctAnswer: 1,
    explanation: "Type A RCDs detect both sinusoidal AC and pulsating DC residual currents. This is important for circuits supplying electronic equipment that may produce DC components in fault currents (e.g., computers, inverters, EV chargers). Type AC only detects pure sinusoidal AC residual current."
  },
  {
    id: 4,
    question: "The measured Zs at a socket outlet is 1.85 ohms. The circuit is protected by a 32A Type B MCB. Is this acceptable for a TN system?",
    options: [
      "Yes - the value is below the BS 7671 maximum of 2.30 ohms",
      "No - the value exceeds the BS 7671 maximum of 1.44 ohms",
      "Cannot determine without knowing the cable size",
      "Yes - but only if an RCD is also fitted"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Table 41.3 specifies maximum Zs for a 32A Type B MCB as 1.44 ohms (for 0.4s disconnection). The measured value of 1.85 ohms exceeds this limit, meaning the MCB may not operate within the required time during a fault. Remedial action is needed - either reduce circuit length, increase cable size, or add RCD protection."
  },
  {
    id: 5,
    question: "Why do loop impedance testers typically display a 'No Trip' or non-trip mode?",
    options: [
      "To test circuits without any protective devices",
      "To allow testing without tripping RCDs or RCBOs",
      "To save battery power during extended testing",
      "For testing SELV circuits"
    ],
    correctAnswer: 1,
    explanation: "No-trip mode uses a very low test current (typically 15mA) that won't trip a 30mA RCD. This allows loop impedance measurement on RCD-protected circuits without repeatedly tripping the device. However, readings may be less accurate than full-current tests, so results should be treated with appropriate margins."
  },
  {
    id: 6,
    question: "What effect does cable temperature have on earth fault loop impedance measurements?",
    options: [
      "None - impedance is not affected by temperature",
      "Cold cables have higher impedance than hot cables",
      "Hot cables have higher impedance than cold cables",
      "Temperature only affects three-phase circuits"
    ],
    correctAnswer: 2,
    explanation: "Conductor resistance increases with temperature (positive temperature coefficient). A cable at 70 degrees C has approximately 20% higher resistance than at 20 degrees C. When testing cold circuits, the measured Zs should be multiplied by 1.2 (or compared against values adjusted by factor 0.8) to estimate worst-case hot conditions."
  },
  {
    id: 7,
    question: "An S-type (time-delayed) RCD is tested at 5x rated residual current. What is the maximum permitted trip time?",
    options: [
      "40ms (same as general type)",
      "150ms",
      "200ms",
      "300ms"
    ],
    correctAnswer: 1,
    explanation: "S-type (selective/time-delayed) RCDs have an intentional delay to allow discrimination with downstream non-delayed RCDs. At 5x IR, an S-type must trip between 50ms and 150ms. This slower response is acceptable upstream where it provides selective coordination, but S-types should not be used where 40ms disconnection is required for shock protection."
  },
  {
    id: 8,
    question: "When measuring prospective fault current (PFC) at a distribution board, what are you actually determining?",
    options: [
      "The maximum current that would flow during a dead short circuit",
      "The normal operating current of the circuits",
      "The earth leakage current",
      "The RCD trip current"
    ],
    correctAnswer: 0,
    explanation: "Prospective fault current (Ipf) is the maximum current that would flow if a dead short circuit occurred at that point. It's determined by the supply voltage and total impedance of the fault path. This value must be compared with the breaking capacity of protective devices to ensure they can safely interrupt a fault without damage."
  },
  {
    id: 9,
    question: "A Type B RCD is required for circuits supplying which type of equipment?",
    options: [
      "Standard lighting and socket circuits",
      "Equipment that may produce smooth DC residual currents (e.g., some EV chargers, VFDs)",
      "Emergency lighting systems",
      "Circuits with high inrush current"
    ],
    correctAnswer: 1,
    explanation: "Type B RCDs detect AC, pulsating DC, and smooth DC residual currents. They're required for equipment that may produce DC fault currents that Type A RCDs cannot detect - including some EV chargers, three-phase inverters, and variable frequency drives. BS 7671 specifies when Type B protection is mandatory."
  },
  {
    id: 10,
    question: "The relationship Zs = Ze + (R1 + R2) assumes which condition?",
    options: [
      "The circuit is three-phase",
      "The protective device is an RCD",
      "The fault is at the far end of the circuit",
      "The circuit has no load connected"
    ],
    correctAnswer: 2,
    explanation: "Zs = Ze + (R1 + R2) gives the loop impedance for a fault at the furthest point of the circuit - the worst case. R1 is the phase conductor resistance and R2 is the CPC resistance from origin to the end of the circuit. Faults closer to the origin would have lower Zs and higher fault currents."
  },
  {
    id: 11,
    question: "What is the purpose of the 'ramp test' function on some RCD testers?",
    options: [
      "To test RCDs at gradually increasing voltages",
      "To determine the exact current at which the RCD trips",
      "To test multiple RCDs simultaneously",
      "To verify RCD wiring is correct"
    ],
    correctAnswer: 1,
    explanation: "A ramp test gradually increases the residual current from zero until the RCD trips, displaying the exact trip current. This verifies the RCD trips within its specified range (typically between 50% and 100% of rated current for a 30mA RCD, it should trip between 15mA and 30mA). It's useful for confirming RCD sensitivity."
  },
  {
    id: 12,
    question: "Why must you check that the test socket is correctly wired before performing loop impedance or RCD tests?",
    options: [
      "Incorrect wiring will damage the test instrument",
      "Reversed polarity or missing earth could give false readings or create hazards",
      "The test will not work on incorrectly wired sockets",
      "BS 7671 requires polarity testing first"
    ],
    correctAnswer: 1,
    explanation: "Loop impedance and RCD testers assume correct socket wiring. Reversed polarity could give misleading readings. A missing earth would make loop impedance testing meaningless and RCD testing dangerous. Most modern testers check wiring first and display warnings, but understanding why this matters is essential."
  }
];

const faqs = [
  {
    question: "Why do I get different Zs readings when testing the same socket multiple times?",
    answer: "Minor variations are normal due to supply voltage fluctuation, contact resistance variations, and measurement uncertainty. Readings should typically be within 5-10% of each other. Larger variations may indicate loose connections, variable supply impedance, or equipment issues. Record the highest reading as the worst case for comparison with maximum permitted values."
  },
  {
    question: "Can I test loop impedance with the circuit loaded?",
    answer: "Yes, but it's not recommended for accurate results. Load current causes voltage drop which can affect readings. For consistent certification results, test with the circuit unloaded or lightly loaded. Some testers compensate for load, but best practice is to test during low-demand periods where possible."
  },
  {
    question: "What does it mean if an RCD trips on the no-trip test current?",
    answer: "If an RCD trips during a no-trip loop impedance test (typically 15mA), it indicates the RCD is overly sensitive or there's existing earth leakage on the circuit that, combined with the test current, exceeds the trip threshold. Investigate for cumulative leakage from equipment or insulation degradation before declaring the RCD faulty."
  },
  {
    question: "Should I use measured Zs or calculated Zs (Ze + R1 + R2) for certification?",
    answer: "Both methods are valid and should give similar results. Measured Zs is a direct test at the point. Calculated Zs from Ze and R1+R2 measurements can be useful when direct measurement isn't possible or to cross-check results. Any significant discrepancy between measured and calculated values indicates an error that needs investigation."
  },
  {
    question: "Why is my loop impedance reading higher at distant sockets?",
    answer: "Loop impedance increases with distance from the origin because you're adding more cable resistance (R1 + R2) to the fixed Ze. This is normal and expected - the reading at the furthest point should be compared with maximum permitted values. Closer sockets should have progressively lower readings."
  },
  {
    question: "How do I test RCDs on a TT system where loop impedance is very high?",
    answer: "RCD testing works the same regardless of earthing system. On TT systems, the RCD is the primary protection because MCBs cannot provide fast enough disconnection due to high Ze. Ensure the RCD trips within required times. Loop impedance testing is less critical for shock protection on TT systems but still needed to confirm earth electrode adequacy."
  }
];

const Level3Module4Section2_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module4-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            RCD and Loop Impedance Testers
          </h1>
          <p className="text-white/80">
            Specialist testers for verifying protective device operation and earthing system adequacy
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>RCD tester:</strong> Verifies trip times at various test currents (IR, 5x IR)</li>
              <li><strong>Loop tester:</strong> Measures Zs to confirm MCB disconnection times</li>
              <li><strong>Ze:</strong> External impedance, measured at origin without installation</li>
              <li><strong>Zs:</strong> Total loop impedance at the point of test</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Use:</strong> No-trip mode on RCD-protected circuits</li>
              <li><strong>Spot:</strong> RCD trip time over 300ms at IR = replace RCD</li>
              <li><strong>Use:</strong> Temperature correction factor 0.8 for cold cables</li>
              <li><strong>Spot:</strong> Zs higher than table value = circuit non-compliant</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the purpose and operation of RCD testers and loop impedance testers",
              "Perform RCD testing at various test currents and interpret results correctly",
              "Measure earth fault loop impedance and compare with BS 7671 maximum values",
              "Distinguish between Ze and Zs measurements and their applications",
              "Recognise different RCD types (AC, A, F, B) and their testing requirements",
              "Apply temperature correction factors to loop impedance measurements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: RCD Testing Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            RCD Testing Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Residual Current Devices (RCDs) provide protection against electric shock by detecting earth leakage current and disconnecting the supply rapidly. An RCD tester verifies that the device operates within the time limits specified in BS EN 61008 (RCCBs) and BS EN 61009 (RCBOs). This testing is essential because an RCD that doesn't trip - or trips too slowly - provides no protection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">RCD Trip Time Requirements (BS EN 61008/61009):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>At rated residual current (IR):</strong> Maximum 300ms (general type), 130-500ms (S-type)</li>
                <li><strong>At 5 x IR:</strong> Maximum 40ms (general type), 50-150ms (S-type)</li>
                <li><strong>At 0.5 x IR:</strong> Device must NOT trip (verifies not over-sensitive)</li>
              </ul>
            </div>

            <p>
              The RCD tester works by injecting a calibrated earth leakage current through the installation's earth path and measuring how long the RCD takes to disconnect. The test current flows from line through the tester, through the earth path, back to neutral at the transformer. The RCD sees this as an imbalance and trips.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Site example:</strong> Testing a bathroom circuit RCD at 1x rated current (30mA), the tester displays 26ms. At 5x (150mA), it displays 18ms. Both results are well within limits, confirming the RCD provides effective shock protection. You also test at 0 degrees and 180 degrees phase angle to confirm operation on both half-cycles.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of RCD by Detection Capability:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Type AC:</strong> Sinusoidal AC only - limited use in modern installations</li>
                <li><strong>Type A:</strong> AC plus pulsating DC - most common for general use</li>
                <li><strong>Type F:</strong> As Type A plus high frequency residual currents</li>
                <li><strong>Type B:</strong> All of above plus smooth DC - required for EV chargers, VFDs</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Always perform the manual test button check as well as instrument testing. The test button simulates an imbalance internally without putting current through the installation. If the button doesn't trip the RCD but the tester does, investigate for internal RCD faults.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Earth Fault Loop Impedance Testing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Earth Fault Loop Impedance Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Earth fault loop impedance (Zs) is the total impedance of the path that fault current takes from the point of fault, through the protective conductor, back to the source transformer. This value determines how much fault current will flow during an earth fault, and therefore how quickly the protective device (MCB/fuse) will operate. Lower impedance means higher fault current and faster disconnection.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Earth Fault Loop Path (TN System):</p>
                <ul className="text-sm text-white space-y-1">
                  <li>1. Phase conductor from transformer to fault</li>
                  <li>2. Fault itself (assumed zero impedance)</li>
                  <li>3. CPC from fault to MET</li>
                  <li>4. Earthing conductor to means of earthing</li>
                  <li>5. Return path (PEN or earth electrode) to source</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Relationships:</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Zs = Ze + (R1 + R2)</strong></li>
                  <li>Ze = External loop impedance</li>
                  <li>R1 = Phase conductor resistance</li>
                  <li>R2 = CPC resistance</li>
                  <li>Fault current If = Uo / Zs</li>
                </ul>
              </div>
            </div>

            <p>
              Loop impedance testers inject a known current (or measure voltage/current relationship) to calculate Zs. Most modern testers offer high-current mode for accurate readings and no-trip mode for use on RCD-protected circuits. The measured value must be compared with maximum values in BS 7671 Table 41.2, 41.3, or 41.4 depending on the protective device type.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Temperature Correction:</p>
              <p className="text-sm text-white/80 mb-2">Measurements taken on cold circuits must be adjusted to account for conductor temperature rise under fault conditions:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Measured Zs x 1.2 should not exceed maximum tabulated Zs</li>
                <li>Or: Measured Zs should not exceed 0.8 x maximum tabulated Zs</li>
                <li>This accounts for approximately 20% increase in resistance from 20C to 70C</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Site example:</strong> Testing a socket circuit protected by a 32A Type B MCB, you measure Zs = 1.10 ohms. BS 7671 Table 41.3 maximum is 1.44 ohms. Applying the 0.8 factor: 1.44 x 0.8 = 1.15 ohms. Your reading of 1.10 ohms is below this, so the circuit is compliant even when cables are hot under maximum load.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Ze Measurement and Verification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Ze Measurement and Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              External earth fault loop impedance (Ze) is measured at the origin of the installation with the main earthing conductor disconnected from the MET. This isolates the supply system impedance from the installation, allowing you to measure just the external portion. Ze is a characteristic of the supply that the DNO should declare, and your measurement verifies this value.
            </p>

            <p>
              Measuring Ze requires working in the vicinity of live parts with the installation earthing disconnected - a potentially hazardous situation. The main switch must be locked off, and safe working practices observed. Some testers can measure Ze without disconnection by using a calculated method, but direct measurement is more accurate.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical Ze Values by Earthing System:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>TN-C-S (PME):</strong> Typically 0.20 - 0.35 ohms (max declared usually 0.35R)</li>
                <li><strong>TN-S:</strong> Typically 0.35 - 0.80 ohms (max declared usually 0.80R)</li>
                <li><strong>TT:</strong> Much higher - depends entirely on earth electrode resistance</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Verify DNO Value</p>
                <p className="text-white/90 text-xs">Measured Ze should not exceed the DNO's declared maximum</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Use for Calculations</p>
                <p className="text-white/90 text-xs">Ze + (R1+R2) should equal measured Zs at circuit end</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Record on Certificate</p>
                <p className="text-white/90 text-xs">Ze is required on both EIC and EICR schedules</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Site example:</strong> The DNO declares Ze maximum of 0.35 ohms for this PME supply. You measure 0.28 ohms - within the declared value. You record this on the EIC. Later, Zs measurements at various points can be verified: if R1+R2 from continuity testing is 0.45 ohms, Zs should be approximately 0.28 + 0.45 = 0.73 ohms.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Ze can vary with supply loading conditions. The value may be lower during off-peak times when the network is lightly loaded. For worst-case assessment, consider measuring during peak demand or using the DNO's declared maximum for calculations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Prospective Fault Current */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Prospective Fault Current Measurement
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Prospective fault current (Ipf or PFC) is the maximum current that would flow during a fault at a given point. It's determined by the supply voltage and the impedance of the fault path. BS 7671 requires that protective devices have adequate breaking capacity to safely interrupt this current. If PFC exceeds breaking capacity, the device could fail catastrophically during a fault.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Two Components of PFC:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Prospective short-circuit current (Isc):</strong> Maximum current during a line-neutral or line-line short circuit. Calculated from phase-neutral loop impedance.</li>
                <li><strong>Prospective earth fault current (Ief):</strong> Maximum current during a line-earth fault. Calculated from earth fault loop impedance (Zs).</li>
                <li>The higher of these two values is the PFC that must not exceed device breaking capacity.</li>
              </ul>
            </div>

            <p>
              Most multifunction testers calculate and display PFC automatically when measuring loop impedance. The value at the origin is typically the highest and must be compared with the main switch/isolator breaking capacity. Values at distribution boards should be compared with MCB/RCBO ratings, though these are usually well within device capabilities for domestic installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Values and Device Ratings:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Domestic origin:</strong> Typically 1-3 kA (varies by supply)</li>
                <li><strong>Commercial/Industrial:</strong> Can exceed 10 kA</li>
                <li><strong>Consumer unit MCBs:</strong> Usually 6 kA or 10 kA breaking capacity</li>
                <li><strong>Industrial MCBs:</strong> 10 kA, 15 kA, or higher available</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Site example:</strong> At a domestic consumer unit, your tester shows PFC of 2.1 kA. The installed MCBs are rated at 6 kA breaking capacity - well above the prospective fault current, so they're suitable. However, if you measured 8 kA at a commercial installation with 6 kA MCBs, this would be a serious non-compliance requiring remediation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Testing Best Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Test at 1x IR, 5x IR, and 0.5x IR (no-trip) to fully characterise performance</li>
                <li>Test at both 0 and 180 degree phase angles for complete verification</li>
                <li>Warn occupants before testing - lights and equipment will go off</li>
                <li>Record all trip times and compare with previous test results where available</li>
                <li>Use the manual test button monthly to verify mechanical operation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Loop Impedance Testing Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use no-trip mode on RCD-protected circuits to avoid repeated tripping</li>
                <li>Take multiple readings and record the highest value</li>
                <li>Apply temperature correction factor (0.8 multiplier) for cold circuit measurements</li>
                <li>Test at the furthest point of each circuit for worst-case Zs</li>
                <li>Verify measured Zs against calculated Ze + (R1+R2) - should be similar</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Faults Detected</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>High Zs reading:</strong> Long circuit runs, undersized cables, poor connections, high Ze</li>
                <li><strong>RCD slow to trip:</strong> Worn mechanism, contamination, approaching end of life</li>
                <li><strong>RCD too sensitive:</strong> May indicate earth leakage on circuit adding to test current</li>
                <li><strong>PFC exceeds device rating:</strong> Inadequate breaking capacity - serious non-compliance</li>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">RCD Trip Times (General Type)</p>
                <ul className="space-y-0.5">
                  <li>At 1x IR: Max 300ms</li>
                  <li>At 5x IR: Max 40ms</li>
                  <li>At 0.5x IR: Must NOT trip</li>
                  <li>S-type at 5x: 50-150ms</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Loop Impedance Key Points</p>
                <ul className="space-y-0.5">
                  <li>Zs = Ze + (R1 + R2)</li>
                  <li>Apply factor 0.8 for cold circuits</li>
                  <li>Compare with BS 7671 Table 41.3</li>
                  <li>32A Type B max Zs = 1.44R</li>
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
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module4-section2-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Multimeters and Testers
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module4-section2-3">
              Next: Clamp Meters and Thermal Imaging
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module4Section2_2;
