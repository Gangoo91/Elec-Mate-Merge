/**
 * Level 3 Module 4 Section 2.1 - Multimeters, Insulation Testers, Continuity Testers
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Multimeters, Insulation Testers, Continuity Testers - Level 3 Module 4 Section 2.1";
const DESCRIPTION = "Master the use of essential diagnostic instruments including multimeters, insulation resistance testers, and continuity testers for electrical installation testing and fault finding.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What test voltage does BS 7671 specify for insulation resistance testing on circuits rated up to 500V?",
    options: [
      "250V DC",
      "500V DC",
      "1000V DC",
      "The circuit's operating voltage"
    ],
    correctIndex: 1,
    explanation: "BS 7671 requires a test voltage of 500V DC for circuits with a nominal voltage exceeding 50V up to and including 500V. Using the correct test voltage ensures the insulation is stressed appropriately to reveal any weaknesses without damaging healthy insulation."
  },
  {
    id: "check-2",
    question: "When testing continuity of a ring final circuit, what should the end-to-end resistance of the line conductor approximately equal?",
    options: [
      "Exactly zero ohms",
      "The same as the neutral conductor end-to-end resistance",
      "Half the value of the CPC end-to-end resistance",
      "Double the value of the neutral conductor"
    ],
    correctIndex: 1,
    explanation: "In a properly installed ring final circuit using the same size conductors throughout, the line (L) and neutral (N) end-to-end readings should be approximately the same. The CPC may differ if it's a reduced size (e.g., in twin and earth cable where CPC is smaller than L and N)."
  },
  {
    id: "check-3",
    question: "What is the minimum acceptable insulation resistance reading for a new installation tested at 500V DC?",
    options: [
      "0.5 megohms",
      "1.0 megohms",
      "2.0 megohms",
      "5.0 megohms"
    ],
    correctIndex: 1,
    explanation: "BS 7671 specifies a minimum insulation resistance of 1.0 megohms (1 MR) for circuits tested at 500V DC. In practice, new installations typically achieve much higher readings (often 100+ MR). Low readings indicate degraded or damaged insulation requiring investigation."
  },
  {
    id: "check-4",
    question: "Before using a multimeter on a live circuit, what essential check must be performed?",
    options: [
      "Verify the battery level is above 50%",
      "Check the fuse rating matches the circuit",
      "Prove the meter works on a known source before and after testing",
      "Ensure auto-ranging is enabled"
    ],
    correctIndex: 2,
    explanation: "GS 38 requires that voltage indicating devices are proven to work on a known live source before testing, then again after testing (prove-test-prove). This confirms the meter was working correctly throughout the testing process and the results are reliable."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A multimeter used for testing electrical installations must comply with which safety category for testing at the origin of an installation?",
    options: [
      "CAT I",
      "CAT II",
      "CAT III",
      "CAT IV"
    ],
    correctAnswer: 3,
    explanation: "CAT IV rated instruments are required for testing at or near the origin of the installation (meter position, main switch). CAT IV equipment is designed to withstand the highest transient overvoltages that occur at the supply intake. Using lower category instruments risks damage and personal injury."
  },
  {
    id: 2,
    question: "When performing an insulation resistance test between live conductors and earth, what must be done first?",
    options: [
      "Switch the circuit on to check it's working",
      "Isolate the circuit and prove dead",
      "Connect all lamps and appliances",
      "Short out the RCD"
    ],
    correctAnswer: 1,
    explanation: "The circuit must be isolated and proven dead before insulation resistance testing. The test applies up to 500V DC which would damage sensitive electronic equipment and could cause injury if applied to live circuits. Always follow safe isolation procedures including locking off and proving dead."
  },
  {
    id: 3,
    question: "A continuity test on a protective conductor gives a reading of 0.65 ohms. The cable run is 25 metres of 2.5mm squared twin and earth cable. Is this acceptable?",
    options: [
      "No - the reading is far too high",
      "Yes - this is within expected values for this cable length and size",
      "No - continuity readings must always be below 0.1 ohms",
      "Cannot determine without knowing the circuit breaker rating"
    ],
    correctAnswer: 1,
    explanation: "Using resistance tables, 25m of 1.5mm squared CPC (in 2.5mm squared T&E) has approximately 0.3-0.35 ohms resistance. Adding test lead resistance and connection resistance, 0.65 ohms is reasonable. The key is ensuring continuity exists and using the value in earth fault loop impedance calculations."
  },
  {
    id: 4,
    question: "What does an insulation resistance reading that fluctuates between 2 MR and 15 MR indicate?",
    options: [
      "The meter is faulty",
      "Normal variation due to temperature",
      "Moisture ingress or intermittent fault in the insulation",
      "The test leads are damaged"
    ],
    correctAnswer: 2,
    explanation: "Fluctuating insulation resistance readings typically indicate moisture contamination or an intermittent breakdown in the insulation. The moisture or fault path may be affected by the test voltage, causing the reading to vary. This requires investigation to locate and rectify the problem."
  },
  {
    id: 5,
    question: "When testing the continuity of a ring final circuit, the cross-connected readings at each socket should be:",
    options: [
      "Different at each socket",
      "Substantially the same at each socket",
      "Zero at each socket",
      "Higher at sockets furthest from the consumer unit"
    ],
    correctAnswer: 1,
    explanation: "With line and neutral cross-connected at the consumer unit, readings at each socket on the ring should be substantially the same (within 0.05 ohms typically). Readings that differ significantly indicate breaks, interconnections, or spurs - the ring is not continuous or has been modified."
  },
  {
    id: 6,
    question: "Why must electronic equipment such as dimmer switches and PIR sensors be disconnected before insulation resistance testing?",
    options: [
      "They affect the accuracy of the reading",
      "The 500V DC test voltage can damage their electronic components",
      "They will conduct current and give false readings",
      "BS 7671 specifically excludes these from testing"
    ],
    correctAnswer: 1,
    explanation: "The 500V DC test voltage used for insulation resistance testing can destroy sensitive electronic components in devices like dimmers, PIRs, timer switches, and programmable thermostats. These must be disconnected before testing and the circuit retested with them disconnected."
  },
  {
    id: 7,
    question: "A low-resistance ohmmeter used for continuity testing should have a no-load voltage between:",
    options: [
      "1V and 5V DC",
      "4V and 24V DC",
      "50V and 100V DC",
      "230V and 250V AC"
    ],
    correctAnswer: 1,
    explanation: "BS EN 61557 specifies that low-resistance ohmmeters for continuity testing should have a no-load voltage between 4V and 24V DC. This provides sufficient voltage to give reliable readings on low resistances while being safe and unlikely to damage connected equipment."
  },
  {
    id: 8,
    question: "When using a multimeter to measure AC voltage on a TN-C-S supply, what reading would you expect between neutral and earth at the consumer unit?",
    options: [
      "230V",
      "115V",
      "Approximately 0V (a few volts maximum)",
      "400V"
    ],
    correctAnswer: 2,
    explanation: "In a TN-C-S (PME) system, the neutral and earth are connected together at the origin. At the consumer unit, there should be minimal voltage between N and E - typically under 2V. A significant voltage indicates a problem such as a broken PEN conductor or neutral fault."
  },
  {
    id: 9,
    question: "Before taking an insulation resistance reading, the meter display shows 'OL' or infinity. What does this indicate?",
    options: [
      "The test leads are faulty",
      "The circuit has excellent insulation with resistance above the meter's range",
      "The circuit is short-circuited",
      "The meter battery is low"
    ],
    correctAnswer: 1,
    explanation: "An 'OL' (over limit) or infinity reading on an insulation resistance tester indicates the resistance exceeds the meter's measuring range - typically above 200 or 500 megohms. This is actually a good result, indicating excellent insulation with very high resistance to current leakage."
  },
  {
    id: 10,
    question: "The resolution of a low-resistance ohmmeter is 0.01 ohms. What is the lowest resistance it can reliably display?",
    options: [
      "0.001 ohms",
      "0.01 ohms",
      "0.1 ohms",
      "1.0 ohms"
    ],
    correctAnswer: 1,
    explanation: "Resolution is the smallest change the instrument can display. A meter with 0.01 ohm resolution can display readings in increments of 0.01 ohms (e.g., 0.01, 0.02, 0.03). However, accuracy at the lowest readings may be affected by lead resistance and contact resistance."
  },
  {
    id: 11,
    question: "When testing insulation resistance on a circuit with SPDs (Surge Protection Devices) fitted, what precaution must be taken?",
    options: [
      "Test at a higher voltage (1000V DC)",
      "Disconnect the SPDs before testing",
      "Test with the SPDs shorted out",
      "No precautions needed - SPDs are designed for high voltages"
    ],
    correctAnswer: 1,
    explanation: "SPDs contain voltage-sensitive components (MOVs) that will conduct at the 500V DC test voltage, giving false low readings and potentially damaging the SPD. They must be disconnected before insulation resistance testing. Many SPDs are now designed with a disconnect facility for this purpose."
  },
  {
    id: 12,
    question: "After completing insulation resistance testing on a long cable run, what safety precaution should be taken before touching the conductors?",
    options: [
      "Wait 5 minutes for the reading to stabilise",
      "Discharge any stored charge as cables can act as capacitors",
      "Reconnect the circuit breaker first",
      "Test with a multimeter on AC range"
    ],
    correctAnswer: 1,
    explanation: "Long cable runs have significant capacitance and can store charge from the 500V DC test voltage. This stored energy can deliver a significant shock. The cable must be discharged by shorting the conductors together, or by using the instrument's discharge function if fitted."
  }
];

const faqs = [
  {
    question: "Why do my insulation resistance readings vary when I repeat the test?",
    answer: "Minor variations (within 10-20%) are normal due to temperature, humidity, and charge stabilisation effects. However, significant variations or readings that drift downward during the test suggest moisture ingress or deteriorating insulation. If readings fluctuate wildly, check your test leads and connections first. Allow readings to stabilise for at least 60 seconds on larger installations."
  },
  {
    question: "Can I use my multimeter's resistance range for continuity testing instead of a dedicated tester?",
    answer: "While a multimeter's ohms range can detect continuity, it may not comply with BS EN 61557 requirements for installation testing. Dedicated low-resistance ohmmeters provide the specified test current (minimum 200mA) and voltage range (4-24V DC) required for valid continuity measurements. Using a multimeter for fault-finding is acceptable, but formal certification testing should use compliant instruments."
  },
  {
    question: "What's the difference between an insulation resistance test and a continuity test?",
    answer: "These tests measure opposite things. Continuity testing confirms a low-resistance path exists where one should (protective conductors, circuit conductors) - you want low readings close to zero. Insulation resistance testing confirms high resistance exists where no current should flow (between live and earth, between conductors) - you want high readings in megohms. Both are essential for verifying safe installation."
  },
  {
    question: "My insulation resistance reading is acceptable but the RCD keeps tripping. Why?",
    answer: "Insulation resistance testing uses DC voltage, while RCDs detect AC earth leakage. Some insulation defects conduct AC more readily than DC, particularly if moisture is present. Also, cumulative leakage from multiple items (LED drivers, EMC filters, electronic equipment) can exceed 30mA without significantly affecting insulation resistance readings. Individual item testing or an earth leakage clamp meter can identify the culprit."
  },
  {
    question: "How do I test insulation resistance on a circuit with two-way switching?",
    answer: "The test must cover all conductors, including switch wires. With all switches in one position, test between all live conductors connected together and earth. Then reverse switch positions and repeat - this ensures all switch wires are included. For complex switching (intermediate switches), you may need multiple tests with switches in different combinations to cover all conductors."
  },
  {
    question: "What should I do if my continuity reading includes the resistance of my test leads?",
    answer: "All professional instruments should have a lead null/zero function. Connect the test leads together and press the null button - this stores the lead resistance and subtracts it from subsequent readings. If your meter lacks this function, measure the lead resistance (typically 0.2-0.5 ohms for standard leads) and subtract it manually. Always null before testing."
  }
];

const Level3Module4Section2_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section2">
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
            <span>Module 4.2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Multimeters, Insulation Testers, Continuity Testers
          </h1>
          <p className="text-white/80">
            Essential diagnostic instruments for electrical installation testing and verification
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Multimeter:</strong> Measures voltage, current, resistance - general diagnostics</li>
              <li><strong>Insulation tester:</strong> 500V DC test, reading in megohms - minimum 1 MR</li>
              <li><strong>Continuity tester:</strong> Low ohms range, 200mA test current, null leads first</li>
              <li><strong>All instruments:</strong> Must comply with BS EN 61557 for installation testing</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Use:</strong> CAT III/IV rated meters for installation work</li>
              <li><strong>Spot:</strong> IR reading below 2 MR = investigate further</li>
              <li><strong>Use:</strong> Prove-test-prove for all live voltage measurements</li>
              <li><strong>Spot:</strong> Fluctuating readings = moisture or intermittent fault</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select and use appropriate test instruments for different testing requirements",
              "Understand the operating principles of multimeters, insulation testers and continuity testers",
              "Interpret instrument readings and identify abnormal results",
              "Apply correct test procedures for insulation resistance and continuity testing",
              "Recognise instrument limitations and sources of measurement error",
              "Comply with BS 7671 and BS EN 61557 requirements for test instruments"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Digital Multimeters */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Digital Multimeters - The Electrician's Swiss Army Knife
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The digital multimeter (DMM) is the most frequently used instrument in an electrician's toolkit. A quality DMM can measure AC and DC voltage, AC and DC current, resistance, and often includes additional functions like frequency, capacitance, and temperature measurement. However, for installation testing and certification, the multimeter has specific roles where it excels - and others where dedicated instruments are required.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Safety Categories (Overvoltage Categories):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>CAT I:</strong> Electronic equipment, protected circuits - not suitable for installation work</li>
                <li><strong>CAT II:</strong> Single-phase socket outlets, appliance level - domestic socket testing only</li>
                <li><strong>CAT III:</strong> Distribution level, hardwired equipment - consumer unit and distribution boards</li>
                <li><strong>CAT IV:</strong> Origin of installation, utility connection - meter position, main switch, incoming supply</li>
              </ul>
            </div>

            <p>
              For professional electrical installation work, a minimum of CAT III 600V rating is essential, with CAT IV required when working at or near the origin of the installation. The category rating reflects the instrument's ability to withstand transient overvoltages that can occur from lightning strikes, switching surges, and fault conditions. Using an undersized instrument risks catastrophic failure - potentially explosive - when a transient occurs.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Site example:</strong> You're checking voltage at a domestic consumer unit. Although the nominal voltage is 230V, switching transients from the DNO's network can momentarily produce spikes of several thousand volts. Your CAT III 600V meter is designed to safely handle these transients. A cheap CAT II meter might arc over internally, destroying the meter and potentially injuring you.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Multimeter Functions for Electrical Installation Work:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>AC Voltage:</strong> Verifying supply voltage, checking for voltage drop, confirming dead</li>
                <li><strong>DC Voltage:</strong> Testing control circuits, battery systems, solar PV</li>
                <li><strong>Resistance:</strong> General fault-finding, component checking (not for formal continuity tests)</li>
                <li><strong>Continuity beeper:</strong> Quick cable identification, tracing circuits</li>
                <li><strong>Capacitance:</strong> Testing motor capacitors, power factor correction equipment</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>GS 38 Requirement:</strong> HSE Guidance Note GS 38 requires that test instruments and leads used on live systems are suitable for the purpose, properly maintained, and that voltage indicators are proved on a known source before and after testing dead.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Insulation Resistance Testers */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Insulation Resistance Testers - Protecting Against Leakage
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Insulation resistance testing verifies that the electrical insulation is in good condition and will prevent current leakage between conductors and to earth. The test uses a high DC voltage (typically 250V, 500V, or 1000V depending on circuit voltage) and measures the resistance in megohms (MR). A healthy installation should have insulation resistance well into the megohm range - typically 100 MR or more for new work.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Voltages per BS 7671:</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>SELV/PELV (up to 50V):</strong> 250V DC test voltage</li>
                  <li><strong>Up to 500V (typical LV):</strong> 500V DC test voltage</li>
                  <li><strong>Above 500V:</strong> 1000V DC test voltage</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Minimum Acceptable Values:</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Standard circuits:</strong> 1.0 MR minimum</li>
                  <li><strong>Typical new installation:</strong> 100+ MR</li>
                  <li><strong>Older installation:</strong> 2+ MR acceptable</li>
                  <li><strong>Below 2 MR:</strong> Investigate and remediate</li>
                </ul>
              </div>
            </div>

            <p>
              The test is performed with the circuit isolated, lamps removed, and electronic equipment disconnected. Modern insulation testers generate a stabilised DC test voltage regardless of test resistance - the instrument measures how much current leaks through the insulation and calculates resistance using Ohm's Law (R = V/I). The display shows this as megohms.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Test Connections for Complete Testing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Line to Neutral:</strong> Checks insulation between live conductors</li>
                <li><strong>Line to Earth:</strong> Checks insulation from line conductor to protective conductor/enclosures</li>
                <li><strong>Neutral to Earth:</strong> Checks insulation from neutral to protective conductor/enclosures</li>
                <li><strong>All live connected together to Earth:</strong> Efficient method covering all live-to-earth insulation in one test</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Site example:</strong> Testing a kitchen ring main, you get readings of 150 MR L-N, 180 MR L-E, but only 0.8 MR N-E. This indicates good insulation overall but a problem between neutral and earth - possibly a damaged cable where the neutral conductor is making contact with the CPC or metalwork. You need to locate and repair this before the circuit can be certified.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> After testing long cable runs, the cable capacitance may retain a charge. Use the instrument's discharge function or short the conductors together before touching them. The 500V DC can deliver a painful and potentially dangerous shock.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Continuity Testers */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Continuity Testers - Verifying the Protective Path
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Continuity testing confirms that protective conductors, bonding conductors, and circuit conductors provide a continuous low-resistance path. This is critical for safety - the protective conductor must carry fault current to operate the protective device. A break or high resistance in the protective path could mean a fault doesn't trip the MCB, leaving metalwork live and dangerous.
            </p>

            <p>
              BS EN 61557-4 specifies requirements for low-resistance ohmmeters used for continuity testing. The instrument must provide a test current of at least 200mA and have a no-load voltage between 4V and 24V DC. This ensures the test is meaningful - a tiny test current might show continuity through a poor joint that would fail under fault current conditions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Continuity Tests:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Protective conductor continuity (R2):</strong> Measures resistance from consumer unit earth bar to each point on the circuit</li>
                <li><strong>Ring final circuit test:</strong> Verifies the ring is continuous and correctly connected - not broken or interconnected</li>
                <li><strong>Main bonding:</strong> Confirms low resistance path from MET to extraneous-conductive-parts (gas, water pipes)</li>
                <li><strong>Supplementary bonding:</strong> Verifies local bonding in special locations (bathrooms)</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Null Your Leads</p>
                <p className="text-white/90 text-xs">Zero out lead resistance before testing (typically 0.2-0.5R)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Record R2 Values</p>
                <p className="text-white/90 text-xs">Add to Ze to calculate Zs for loop impedance verification</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Check All Points</p>
                <p className="text-white/90 text-xs">Test at every socket, light point, and accessory on the circuit</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Site example:</strong> Testing a radial power circuit, you get R2 values of 0.25R at the first socket, 0.35R at the second, 0.52R at the third, but suddenly 25R at the fourth socket. This massive jump indicates a problem - likely a broken or disconnected CPC between the third and fourth sockets. The fourth socket onwards has no effective earth path.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Continuity readings are affected by temperature. Cables test differently when cold versus when warm from load current. For maximum Zs calculations, use the resistance values adjusted for operating temperature (multiply by 1.2 for PVC cables at 70 degrees C).
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Ring Final Circuit Testing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Ring Final Circuit Testing - A Special Case
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ring final circuits require specific testing procedures to verify the ring is complete and correctly connected. The test confirms that both legs of the ring are continuous, there are no breaks, and no interconnections have been made that would create parallel paths or dead legs. This is arguably the most complex routine test for domestic installations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The Ring Test Procedure (Three-Stage Method):</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Stage 1 - End-to-end readings:</strong> Measure resistance between the two ends of each conductor (L1-L2, N1-N2, CPC1-CPC2). Record values r1, rn, r2.</li>
                <li><strong>Stage 2 - Cross-connection:</strong> At the consumer unit, connect L1 to N2 and N1 to L2 (cross-connect line and neutral).</li>
                <li><strong>Stage 3 - Socket readings:</strong> Test between L and N at each socket. Readings should be substantially equal (r1+rn)/4 throughout the ring.</li>
              </ul>
            </div>

            <p>
              The mathematics behind this is elegant. By cross-connecting at the consumer unit, you create a figure-of-eight configuration. At any point on the ring, you're measuring through two parallel paths that together equal half the total conductor resistance. Any break or modification disrupts this balance, causing readings to differ around the ring.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Interpreting Ring Test Results:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>All readings equal:</strong> Ring is continuous and correctly wired</li>
                <li><strong>Readings that increase then decrease:</strong> Normal pattern around a ring - highest at the electrical midpoint</li>
                <li><strong>One reading significantly different:</strong> Break in ring or spur incorrectly identified as ring socket</li>
                <li><strong>Two groups of different readings:</strong> Possible figure-of-eight error or interconnection</li>
                <li><strong>Reading at one socket equals end-to-end reading:</strong> Break in ring at that point</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Site example:</strong> Testing a ring in a 1970s house extension, you find the L and N end-to-end readings are correct (0.8R each) but the CPC end-to-end reads 4.5R instead of the expected 1.3R. Investigation reveals the ring was extended using twin-core cable with no CPC - a serious defect requiring remediation before the circuit can be certified as compliant.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Test Checks</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check calibration date on instrument - must be within calibration period (typically 12 months)</li>
                <li>Inspect test leads for damage, cracking, or exposed conductors - replace if defective</li>
                <li>Verify fused test leads are fitted with correct fuse ratings (typically 500mA for voltage testing)</li>
                <li>Check battery condition - low batteries affect accuracy, especially on insulation testers</li>
                <li>Null continuity tester leads before use</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Errors to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Testing with equipment connected:</strong> Always disconnect sensitive electronics before insulation testing</li>
                <li><strong>Forgetting to isolate:</strong> Insulation testers apply 500V DC - dangerous on live circuits</li>
                <li><strong>Ignoring fluctuating readings:</strong> Unstable readings indicate a problem requiring investigation</li>
                <li><strong>Not recording values:</strong> Test results must be recorded for certification and comparison</li>
                <li><strong>Using incorrect test voltage:</strong> 500V for standard LV circuits, 250V for SELV/PELV</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Safety Reminders</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Always prove-test-prove:</strong> Verify your voltage tester works before and after testing dead</li>
                <li><strong>Discharge cables after IR testing:</strong> Long cables store charge that can shock you</li>
                <li><strong>Use CAT-rated instruments:</strong> CAT III minimum, CAT IV at the origin of installation</li>
                <li><strong>Replace damaged leads:</strong> Never use test leads with damaged insulation or bent probes</li>
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
                <p className="font-medium text-white mb-1">Test Instrument Requirements</p>
                <ul className="space-y-0.5">
                  <li>Multimeter: CAT III/IV, 600V+ rating</li>
                  <li>Insulation tester: 500V DC, reads to 200 MR+</li>
                  <li>Continuity: 200mA test current, 4-24V DC</li>
                  <li>All: BS EN 61557 compliant for certification</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Values to Remember</p>
                <ul className="space-y-0.5">
                  <li>Minimum IR at 500V = 1.0 MR</li>
                  <li>Typical new installation IR = 100+ MR</li>
                  <li>Ring L and N end-to-end should match</li>
                  <li>Bonding should be less than 0.05R</li>
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
            <Link to="/study-centre/apprentice/level3-module4-section1-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Section 1.5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section2-2">
              Next: RCD and Loop Impedance Testers
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module4Section2_1;
