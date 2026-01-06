/**
 * Level 3 Module 4 Section 4.4 - Earth Fault Loop Impedance Testing
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Earth Fault Loop Impedance Testing - Level 3 Module 4 Section 4.4";
const DESCRIPTION = "Understand earth fault loop impedance (EFLI/Zs) testing methods, BS 7671 maximum values, and how to verify automatic disconnection of supply for electrical safety.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the earth fault loop and why is it important?",
    options: [
      "The loop that earth current travels through for normal operation",
      "The complete circuit path fault current takes from the line conductor through the fault to earth and back to the supply",
      "The connection between the consumer unit and the earth electrode",
      "The resistance of the main earthing terminal"
    ],
    correctIndex: 1,
    explanation: "The earth fault loop is the complete circuit through which fault current flows: from the supply transformer, through the line conductor, through the fault, through the earth path (CPC, main earth, external earth), and back to the transformer. Its impedance determines fault current magnitude and therefore disconnection time."
  },
  {
    id: "check-2",
    question: "Why must the measured Zs value be compared to 80% of the maximum tabulated value in BS 7671?",
    options: [
      "To account for instrument accuracy only",
      "To allow for increased conductor resistance when cables are at operating temperature",
      "To provide a safety margin for RCD operation",
      "To account for voltage fluctuations"
    ],
    correctIndex: 1,
    explanation: "BS 7671 tabulated Zs values assume conductors at maximum operating temperature. When testing, conductors are usually cooler, giving lower readings. The 80% rule (0.8 multiplier) ensures that when the circuit heats up under load, the actual Zs will still be within safe limits."
  },
  {
    id: "check-3",
    question: "A socket circuit protected by a 32A Type B MCB shows Zs of 1.05 ohms. The maximum tabulated value is 1.37 ohms. Is this acceptable?",
    options: [
      "Yes - 1.05 is less than 1.37",
      "No - 1.05 exceeds 80% of 1.37 (which is 1.10 ohms)",
      "Yes - any reading under 1.37 passes",
      "No - socket circuits require lower Zs"
    ],
    correctIndex: 0,
    explanation: "80% of 1.37 ohms = 1.10 ohms. The measured value of 1.05 ohms is less than 1.10 ohms, so it passes the 80% rule. This ensures even when the cables heat up to operating temperature, the Zs will still be below the maximum 1.37 ohms required for 0.4 second disconnection."
  },
  {
    id: "check-4",
    question: "What two components make up the earth fault loop impedance (Zs)?",
    options: [
      "R1 and R2",
      "Ze and (R1+R2)",
      "Line and neutral resistance",
      "CPC resistance and main bonding resistance"
    ],
    correctIndex: 1,
    explanation: "Zs = Ze + (R1+R2). Ze is the external earth fault loop impedance (supply side), and (R1+R2) is the circuit impedance (line conductor R1 plus CPC resistance R2). The total Zs determines the fault current available to trip the protective device."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "You measure Ze at the origin as 0.35 ohms and R1+R2 on a circuit as 0.65 ohms. What is the calculated Zs for that circuit?",
    options: [
      "0.35 ohms",
      "0.65 ohms",
      "1.00 ohms",
      "0.30 ohms"
    ],
    correctAnswer: 2,
    explanation: "Zs = Ze + (R1+R2) = 0.35 + 0.65 = 1.00 ohms. This calculated value can be used when live testing is not possible or practical. It can also verify live Zs measurements - they should be similar."
  },
  {
    id: 2,
    question: "A lighting circuit protected by a 6A Type B MCB requires a maximum Zs of 7.67 ohms (from BS 7671). Using the 80% rule, what is the maximum acceptable measured value?",
    options: [
      "7.67 ohms",
      "6.14 ohms",
      "9.59 ohms",
      "5.00 ohms"
    ],
    correctAnswer: 1,
    explanation: "Maximum measured Zs = 0.8 x 7.67 = 6.14 ohms. The measured value must be at or below this to account for increased resistance when conductors reach operating temperature."
  },
  {
    id: 3,
    question: "What is the purpose of earth fault loop impedance testing?",
    options: [
      "To verify the insulation resistance of the circuit",
      "To confirm that sufficient fault current can flow to operate the protective device within the required disconnection time",
      "To measure the current-carrying capacity of the cable",
      "To test the operation of the RCD"
    ],
    correctAnswer: 1,
    explanation: "EFLI testing verifies automatic disconnection of supply (ADS). If Zs is too high, fault current will be too low to trip the MCB/fuse quickly enough. BS 7671 Table 41.3 specifies maximum Zs values to achieve 0.4s (for socket circuits) or 5s (for fixed equipment) disconnection times."
  },
  {
    id: 4,
    question: "During EFLI testing, the loop tester displays a reading but the RCD trips. What does this indicate?",
    options: [
      "The instrument is faulty",
      "The installation has a serious earth fault",
      "The test is normal - loop testers inject current that can trip RCDs",
      "The RCD is faulty and should be replaced"
    ],
    correctAnswer: 2,
    explanation: "Loop impedance testers inject a test current that creates an imbalance between line and neutral. RCDs detect this imbalance and trip. Many modern loop testers have a 'non-trip' or 'no-trip' mode that uses a lower test current to avoid tripping 30mA RCDs, though this may reduce accuracy."
  },
  {
    id: 5,
    question: "What is the maximum permitted Zs for a Type B 32A MCB to achieve 0.4 second disconnection time?",
    options: [
      "0.86 ohms",
      "1.15 ohms",
      "1.37 ohms",
      "1.50 ohms"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 Table 41.3 gives 1.37 ohms for a 32A Type B MCB at 0.4s. This is derived from Zs = Uo/(5 x In) for Type B, where Uo = 230V and In = 32A. 230/(5 x 32) = 1.44 ohms, adjusted for 5% supply tolerance gives approximately 1.37 ohms."
  },
  {
    id: 6,
    question: "Why is the external earth fault loop impedance (Ze) measured at the origin with the main switch open?",
    options: [
      "To prevent damage to the meter",
      "To measure only the supply-side impedance without the installation contributing",
      "Because the test cannot be done with the installation energised",
      "To comply with safe isolation procedures"
    ],
    correctAnswer: 1,
    explanation: "Opening the main switch (or disconnecting the installation earthing conductor) isolates the installation earth path. This ensures the Ze measurement reflects only the supply-side impedance - from transformer, through supply cables, and external earth return. This value should be compared against DNO declared values."
  },
  {
    id: 7,
    question: "A circuit shows a measured Zs of 0.95 ohms, but Ze + (R1+R2) calculated from individual measurements gives 0.80 ohms. What might explain this discrepancy?",
    options: [
      "The continuity test was performed with cold cables",
      "The supply voltage was low during the loop test",
      "The loop tester has higher internal resistance",
      "All of these factors could contribute"
    ],
    correctAnswer: 3,
    explanation: "Discrepancies between measured and calculated Zs can result from: temperature differences (loop test with warm cables vs cold continuity test), supply voltage variations affecting calculation, instrument tolerances, and differences in test current levels. Small discrepancies are normal; large ones require investigation."
  },
  {
    id: 8,
    question: "What additional protection requirement does BS 7671 specify for socket circuits where the Zs exceeds maximum values for overcurrent protection alone?",
    options: [
      "Increased cable size",
      "RCD protection with maximum 30mA and 40ms trip time",
      "Double-pole isolation",
      "Enhanced main bonding"
    ],
    correctAnswer: 1,
    explanation: "Where Zs is too high for the MCB to achieve 0.4s disconnection, 30mA RCD protection can provide ADS instead. The RCD must disconnect within 40ms at 5 times rated residual current (i.e., 150mA for a 30mA RCD). This is verified by RCD testing, not loop testing."
  },
  {
    id: 9,
    question: "When testing Zs at the furthest point of a radial circuit, why is this location chosen?",
    options: [
      "It is the most accessible point",
      "The impedance is highest at the end, representing the worst case for fault disconnection",
      "The protective device is located there",
      "BS 7671 specifically requires testing at the end only"
    ],
    correctAnswer: 1,
    explanation: "The furthest point has the longest cable run, therefore the highest R1+R2, therefore the highest Zs. If the Zs at the furthest point meets requirements, all points closer to the origin will have lower (better) Zs values. Testing here confirms the whole circuit complies."
  },
  {
    id: 10,
    question: "What is prospective fault current (Ipf) and how is it related to Zs?",
    options: [
      "Ipf = Zs x Uo",
      "Ipf = Uo / Zs",
      "Ipf is unrelated to Zs",
      "Ipf = Zs + R1 + R2"
    ],
    correctAnswer: 1,
    explanation: "Prospective fault current Ipf = Uo / Zs (using Ohm's Law). Lower Zs means higher fault current. For example, Zs of 0.5 ohms gives Ipf = 230/0.5 = 460A. This fault current must be high enough to trip the protective device quickly, but within the device's breaking capacity."
  },
  {
    id: 11,
    question: "During initial verification, you find Ze is 0.80 ohms - the maximum declared by the DNO is 0.35 ohms. What action should be taken?",
    options: [
      "Accept the reading as a pass since it is below 1.0 ohm",
      "Report to the DNO as the external earth impedance is higher than declared",
      "Increase the main earthing conductor size",
      "Install additional earth electrodes"
    ],
    correctAnswer: 1,
    explanation: "If measured Ze significantly exceeds the DNO's declared value, the supply may be faulty or conditions may have changed. Report to the DNO for investigation. High Ze affects all circuits and cannot be corrected within the installation - it is a supply-side issue."
  },
  {
    id: 12,
    question: "For a TT system with an earth electrode, what additional protection is always required regardless of Zs values?",
    options: [
      "MCB protection",
      "RCD protection with rated residual operating current not exceeding 30mA for socket circuits",
      "Additional earthing",
      "Surge protection"
    ],
    correctAnswer: 1,
    explanation: "TT systems typically have high earth electrode resistance (RA), making Zs too high for MCBs to provide ADS. RCD protection is therefore required. BS 7671 Regulation 411.5.2 requires the product of RA and RCD operating current (IA) to be less than or equal to 50V: RA x IA is less than or equal to 50V."
  }
];

const faqs = [
  {
    question: "What is the difference between Ze and Zs?",
    answer: "Ze (external earth fault loop impedance) is the impedance of the supply side only - from transformer winding, through supply cables, and the external earth return path. Zs (total earth fault loop impedance) includes Ze plus the circuit impedance (R1+R2). Zs = Ze + (R1+R2). Ze is measured at the origin; Zs is measured at circuit outlets."
  },
  {
    question: "Why do some loop testers give different readings to others?",
    answer: "Loop testers vary in test current, measurement method, and accuracy. Higher test currents generally give more accurate readings. 'No-trip' testers using lower currents may be less accurate. Instrument tolerances, lead resistance, and supply voltage variations also affect readings. For certification, use instruments meeting BS EN 61557 with known accuracy."
  },
  {
    question: "Can I use the calculated Zs instead of measuring it?",
    answer: "Yes, calculated Zs (Ze + R1+R2) is acceptable where live testing is impractical or unsafe. However, measured Zs is preferred as it confirms the actual earth fault path under real conditions. Calculated values should be similar to measured values - significant differences indicate a problem requiring investigation."
  },
  {
    question: "What if Zs exceeds the maximum but the circuit has RCD protection?",
    answer: "If the circuit has 30mA RCD protection meeting BS 7671 requirements, the RCD provides ADS even if Zs is too high for the MCB alone. However, the Zs must still be low enough that the RCD can detect the fault - typically RA must meet the 50V touch voltage limit: RA x IA is less than or equal to 50V."
  },
  {
    question: "How does supply voltage affect loop impedance readings?",
    answer: "Loop testers calculate impedance from voltage and current measurements. If supply voltage is low, readings may appear higher than actual. Some testers compensate for voltage; others require manual correction. Always note supply voltage during testing. UK nominal is 230V but can legitimately vary from 216V to 253V (-6% to +10%)."
  },
  {
    question: "Why is the 80% rule (or 0.8 multiplier) applied?",
    answer: "BS 7671 tabulated maximum Zs values assume conductors at their maximum operating temperature (70 degrees Celsius for most thermoplastic insulation). When testing, cables are typically at ambient temperature, showing lower resistance. Applying the 0.8 multiplier ensures measured values account for the increase when cables heat up under load."
  }
];

const Level3Module4Section4_4 = () => {
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
            <Link to="../level3-module4-section4">
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
            <span>Module 4.4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Earth Fault Loop Impedance Testing
          </h1>
          <p className="text-white/80">
            Verifying automatic disconnection of supply through Zs measurement
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Formula:</strong> Zs = Ze + (R1+R2)</li>
              <li><strong>Purpose:</strong> Verify ADS - protective device trips in time</li>
              <li><strong>Rule:</strong> Measured Zs must be under 80% of max table value</li>
              <li><strong>Test at:</strong> Furthest point of each circuit</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> High Zs = slow disconnection = danger</li>
              <li><strong>Spot:</strong> Ze higher than declared = DNO issue</li>
              <li><strong>Use:</strong> 0.8 multiplier for temperature compensation</li>
              <li><strong>Use:</strong> Calculate Ipf = 230/Zs</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the components of the earth fault loop and their significance",
              "Measure Ze at the origin and Zs at circuit endpoints correctly",
              "Apply the 80% rule for temperature correction",
              "Interpret results against BS 7671 maximum values for different devices",
              "Calculate prospective fault current from loop impedance",
              "Understand the relationship between Zs and protective device operation"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Understanding the Earth Fault Loop */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding the Earth Fault Loop
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The earth fault loop is the complete circuit path that fault current takes during an earth fault. When a live conductor contacts an earthed part, current flows from the supply transformer, through the line conductor to the fault, through the protective conductor back to the main earthing terminal, through the external earth return (method depends on earthing system), and back to the transformer neutral-earth connection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Components of the earth fault loop:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ze (external):</strong> Supply transformer winding, distributor cables, external earth path back to transformer</li>
                <li><strong>R1:</strong> Line conductor resistance from origin to fault point</li>
                <li><strong>R2:</strong> Circuit protective conductor (CPC) resistance from fault point back to origin</li>
                <li><strong>Zs (total):</strong> Ze + R1 + R2 - the complete loop impedance</li>
              </ul>
            </div>

            <p>
              The total impedance Zs determines how much fault current flows (Ipf = Uo/Zs). This fault current must be high enough to operate the protective device within the required disconnection time - 0.4 seconds for socket circuits and 5 seconds for fixed equipment in TN systems.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Lower Zs = higher fault current = faster disconnection. If Zs is too high, the fault current may not be enough to trip the MCB quickly, leaving dangerous touch voltages present for too long.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Test Methods */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Testing Methods and Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Earth fault loop impedance can be determined by direct measurement using a loop impedance tester, or calculated from the sum of Ze and (R1+R2) measured separately. Both methods are acceptable, though direct measurement is preferred as it tests the actual fault path under near-fault conditions.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ze Measurement (at origin)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Disconnect installation earthing from MET</li>
                  <li>Or open main switch and test L-E</li>
                  <li>Test between line and earth at origin</li>
                  <li>Compare with DNO declared Ze value</li>
                  <li>Typical UK TN-C-S: 0.2 to 0.35 ohms</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Zs Measurement (at outlets)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Test at furthest point of each circuit</li>
                  <li>Plug-in tester for socket outlets</li>
                  <li>Probe test for fixed equipment points</li>
                  <li>Use no-trip mode if RCD-protected</li>
                  <li>Record and compare with maximum values</li>
                </ul>
              </div>
            </div>

            <p>
              For circuits protected by RCDs, loop testers may trip the RCD during measurement. Use an instrument with no-trip mode, or temporarily bypass the RCD for testing (with appropriate precautions and immediate reinstatement). Alternatively, calculate Zs from Ze + (R1+R2).
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Testing a ring final circuit protected by a 32A Type B MCB. Maximum Zs from BS 7671 Table 41.3 is 1.37 ohms. Applying the 80% rule: maximum measured = 0.8 x 1.37 = 1.10 ohms. You measure 0.95 ohms at the furthest socket. This passes because 0.95 is less than 1.10.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 03: Maximum Values and the 80% Rule */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Maximum Zs Values and Temperature Correction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Table 41.3 provides maximum earth fault loop impedance values for overcurrent protective devices to achieve the required disconnection times. These values are calculated assuming conductors at maximum operating temperature (typically 70 degrees Celsius for thermoplastic insulation).
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common maximum Zs values (Type B MCBs, 0.4s):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>6A Type B:</strong> 7.67 ohms (measured max: 6.14 ohms)</li>
                <li><strong>10A Type B:</strong> 4.60 ohms (measured max: 3.68 ohms)</li>
                <li><strong>16A Type B:</strong> 2.87 ohms (measured max: 2.30 ohms)</li>
                <li><strong>20A Type B:</strong> 2.30 ohms (measured max: 1.84 ohms)</li>
                <li><strong>32A Type B:</strong> 1.37 ohms (measured max: 1.10 ohms)</li>
              </ul>
            </div>

            <p>
              The 80% rule compensates for temperature. At ambient temperature during testing, conductors have lower resistance than when at full operating temperature. Multiplying the tabulated maximum by 0.8 gives the maximum acceptable measured value, ensuring the circuit remains compliant when hot.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The 80% rule (0.8 multiplier) applies to the tabulated BS 7671 values. Measured Zs must be equal to or less than (maximum tabulated Zs x 0.8). This is often simplified to: measured value must be 80% or less of the table value.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Interpreting Results and Fault Finding */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Interpreting Results and Troubleshooting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              EFLI test results must be evaluated against acceptance criteria and investigated if unexpected. High Zs can result from various causes, each requiring different remedial action. Comparing calculated Zs (Ze + R1+R2) with measured Zs helps identify where problems lie.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">High Ze</p>
                <p className="text-white/90 text-xs">Supply-side issue - report to DNO. Cannot be resolved within installation.</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">High R1</p>
                <p className="text-white/90 text-xs">Long cable run or undersized line conductor. May need cable upgrade.</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">High R2</p>
                <p className="text-white/90 text-xs">Undersized CPC, poor terminations, or long CPC run. Check connections.</p>
              </div>
            </div>

            <p>
              If measured Zs significantly exceeds calculated Zs (Ze + R1+R2), this indicates additional resistance in the fault loop - possibly poor connections, corroded terminations, or a parallel earth path affecting measurement. Investigate before certifying.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> You calculate Zs as 0.80 ohms (Ze=0.30, R1+R2=0.50), but measure 1.20 ohms at the socket. The 0.40 ohm difference suggests a high-resistance connection somewhere in the circuit. Check all terminations, particularly at junction boxes and the socket itself.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Test Preparation</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify instrument calibration and condition of test leads</li>
                <li>Note the supply voltage - some instruments require manual compensation</li>
                <li>Identify if circuits have RCD protection - prepare for no-trip testing</li>
                <li>Have BS 7671 maximum Zs values to hand for the protective devices installed</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During Testing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Test at the furthest point of each circuit - this is the worst case</li>
                <li>For ring circuits, test at several points to identify any high-resistance sections</li>
                <li>Compare measured values with calculated values to verify consistency</li>
                <li>Note any supply voltage variations which may affect readings</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Forgetting the 80% rule</strong> - Do not compare measured values directly to table values</li>
                <li><strong>Not testing at the furthest point</strong> - The longest run has the highest Zs</li>
                <li><strong>Ignoring discrepancies</strong> - If measured differs significantly from calculated, investigate</li>
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
                <p className="font-medium text-white mb-1">Max Zs (Type B, 0.4s, with 80% rule)</p>
                <ul className="space-y-0.5">
                  <li>6A: 7.67 ohms (measured: 6.14 ohms max)</li>
                  <li>16A: 2.87 ohms (measured: 2.30 ohms max)</li>
                  <li>32A: 1.37 ohms (measured: 1.10 ohms max)</li>
                  <li>40A: 1.09 ohms (measured: 0.87 ohms max)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Formulas</p>
                <ul className="space-y-0.5">
                  <li>Zs = Ze + (R1+R2)</li>
                  <li>Ipf = Uo / Zs (230 / Zs)</li>
                  <li>Measured max = 0.8 x Table Zs</li>
                  <li>Typical TN-C-S Ze: 0.2 to 0.35 ohms</li>
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
            <Link to="../level3-module4-section4-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Polarity Checks
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module4-section4-5">
              Next: Functional and Operational Testing
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module4Section4_4;
