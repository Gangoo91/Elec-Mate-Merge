/**
 * Level 3 Module 4 Section 2.4 - Safe Use, Calibration and Limitations of Instruments
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Safe Use, Calibration and Limitations of Instruments - Level 3 Module 4 Section 2.4";
const DESCRIPTION = "Understand proper instrument handling, calibration requirements, accuracy specifications, and inherent limitations of test equipment to ensure safe and reliable measurements.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "How often should test instruments used for certification work typically be calibrated?",
    options: [
      "Every 5 years",
      "Only when they appear to give incorrect readings",
      "Annually (12 months)",
      "After every 100 uses"
    ],
    correctIndex: 2,
    explanation: "BS 7671 and BS EN 61557 require instruments used for certification to be within valid calibration. The industry standard is annual (12 month) calibration intervals. Some manufacturers and schemes accept longer intervals for low-use instruments, but 12 months is the widely accepted default."
  },
  {
    id: "check-2",
    question: "What does GS 38 require regarding voltage indicating devices before testing dead?",
    options: [
      "They must be less than 6 months old",
      "They must be proved on a known live source before and after testing",
      "They must be connected to a proving unit permanently",
      "They must display exactly 230V on a known source"
    ],
    correctIndex: 1,
    explanation: "HSE Guidance Note GS 38 requires 'prove-test-prove' methodology. The voltage indicator must be proven working on a known live source BEFORE testing the circuit dead, then proven again AFTER testing to confirm it was working throughout. This guards against undetected meter failure giving false 'dead' readings."
  },
  {
    id: "check-3",
    question: "An instrument has an accuracy specification of plus or minus 2% plus or minus 3 digits. When displaying 100.0 ohms, what is the possible range of actual values?",
    options: [
      "98.0 to 102.0 ohms",
      "97.7 to 102.3 ohms",
      "99.7 to 100.3 ohms",
      "95.0 to 105.0 ohms"
    ],
    correctIndex: 1,
    explanation: "Accuracy has two components: percentage of reading PLUS digit uncertainty. 2% of 100 = 2 ohms. Plus or minus 3 digits on a 0.1 resolution display = plus or minus 0.3 ohms. Total accuracy is plus or minus 2.3 ohms, giving a range of 97.7 to 102.3 ohms. Understanding this prevents over-reliance on displayed precision."
  },
  {
    id: "check-4",
    question: "Before using test leads on a live circuit, what should be checked according to GS 38?",
    options: [
      "The leads are the correct colour",
      "The leads have fingerguards and limited exposed probe tips, and are undamaged",
      "The leads are made of copper",
      "The leads are at least 2 metres long"
    ],
    correctIndex: 1,
    explanation: "GS 38 specifies that test leads should have finger guards, limited probe tip exposure (typically 4mm maximum), shrouded connectors, and fuses in at least one lead for voltage measurement. Before each use, check for damage, cracking, or deterioration of insulation. Damaged leads must be replaced, not repaired."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the purpose of instrument calibration?",
    options: [
      "To make the instrument look new",
      "To verify the instrument reads accurately and to adjust if necessary",
      "To reset the instrument to factory settings",
      "To update the instrument's firmware"
    ],
    correctAnswer: 1,
    explanation: "Calibration compares the instrument's readings against a traceable reference standard and records any deviation. If within specification, a calibration certificate is issued. If out of specification, the instrument may be adjusted, recalibrated, or failed. This ensures measurements are accurate and traceable to national standards."
  },
  {
    id: 2,
    question: "What does 'traceable calibration' mean?",
    options: [
      "The instrument can be tracked via GPS",
      "The calibration can be traced back to national or international measurement standards",
      "The instrument has a serial number",
      "The calibration was done by the manufacturer"
    ],
    correctAnswer: 1,
    explanation: "Traceable calibration means the reference standards used to calibrate your instrument have themselves been calibrated against higher-level standards, ultimately traceable to national standards (like NPL in the UK or NIST in the USA). This chain of traceability ensures your measurements are reliable and legally defensible."
  },
  {
    id: 3,
    question: "An insulation resistance tester displays 2.5 MR when testing a good circuit. The instrument accuracy is plus or minus 3% plus or minus 5 digits at 0.01 MR resolution. What is the measurement uncertainty?",
    options: [
      "Plus or minus 0.075 MR",
      "Plus or minus 0.125 MR",
      "Plus or minus 0.05 MR",
      "Plus or minus 5 MR"
    ],
    correctAnswer: 1,
    explanation: "3% of 2.5 MR = 0.075 MR. Plus 5 digits at 0.01 resolution = 0.05 MR. Total uncertainty = 0.075 + 0.05 = 0.125 MR. So the actual value could be 2.375 to 2.625 MR. This uncertainty becomes more significant when readings are close to minimum acceptable values."
  },
  {
    id: 4,
    question: "Why should you null the test leads on a continuity tester before taking measurements?",
    options: [
      "To charge the battery",
      "To subtract the lead resistance from subsequent readings",
      "To reset the display",
      "BS 7671 requires it as a formal test"
    ],
    correctAnswer: 1,
    explanation: "Test lead resistance (typically 0.2-0.5 ohms) adds to every measurement. Nulling stores this value and subtracts it from readings, giving the true circuit resistance. Without nulling, you're measuring circuit plus leads. For accurate R1+R2 values used in Zs calculations, nulled readings are essential."
  },
  {
    id: 5,
    question: "What is the primary safety concern when using an insulation resistance tester?",
    options: [
      "The display may be difficult to read",
      "The test voltage (250V-1000V DC) can cause shock and damage equipment",
      "The instrument is heavy",
      "The battery may run out during testing"
    ],
    correctAnswer: 1,
    explanation: "Insulation testers apply high DC voltage (typically 500V for LV circuits) that can shock users, damage sensitive electronic equipment, and may store charge in cables after testing. Circuits must be isolated and proven dead, equipment disconnected, and cables discharged after testing. Never apply to live circuits."
  },
  {
    id: 6,
    question: "What should you do if you discover your test instrument's calibration has expired during a job?",
    options: [
      "Continue using it - the readings are probably still accurate",
      "Adjust readings by 10% to compensate",
      "Stop certification work until the instrument is recalibrated or replaced",
      "Make a note on the certificate and continue"
    ],
    correctAnswer: 2,
    explanation: "Test results from an out-of-calibration instrument are not valid for certification purposes. You cannot know if readings are accurate without valid calibration. Stop work, obtain a calibrated instrument, and repeat any tests done with the expired unit. Recording invalid results on certificates is professionally and legally problematic."
  },
  {
    id: 7,
    question: "What does the CAT rating on a multimeter indicate?",
    options: [
      "The country where it was manufactured",
      "The overvoltage category indicating transient protection level",
      "The type of batteries required",
      "The warranty category"
    ],
    correctAnswer: 1,
    explanation: "CAT (Category) ratings indicate the instrument's ability to withstand transient overvoltages. Higher categories (CAT III, CAT IV) provide more protection. CAT IV is required at the origin of installation where transients are most severe. Using an underrated instrument risks catastrophic failure during voltage spikes."
  },
  {
    id: 8,
    question: "A loop impedance tester has a specified accuracy of plus or minus 3% of reading plus 0.02 ohms. Why is the fixed offset (0.02 ohms) more significant at lower readings?",
    options: [
      "It isn't - the percentage is always more important",
      "Because 0.02 ohms represents a larger proportion of a small reading",
      "The instrument works differently at low readings",
      "Lower readings are always more accurate"
    ],
    correctAnswer: 1,
    explanation: "At a reading of 0.20 ohms: 3% = 0.006 ohms, plus 0.02 = 0.026 ohms total (13% relative error). At 2.0 ohms: 3% = 0.06 ohms, plus 0.02 = 0.08 ohms total (4% relative error). The fixed offset has proportionally more impact on small readings, making percentage accuracy better at higher values."
  },
  {
    id: 9,
    question: "Why might an RCD tester give different trip times when tested at different times of day?",
    options: [
      "RCDs perform differently depending on the time",
      "Variations in supply voltage affect test current and thus trip time",
      "The tester's battery weakens throughout the day",
      "Temperature changes in the building"
    ],
    correctAnswer: 1,
    explanation: "Supply voltage variations affect the test current magnitude. Lower voltage means less test current, potentially resulting in longer trip times. Most testers display actual test current or account for voltage variations, but significant voltage changes (especially on rural supplies) can affect results. Note supply voltage when testing."
  },
  {
    id: 10,
    question: "What is the limitation of using a socket tester (plug-in tester) for fault finding?",
    options: [
      "They are not accurate enough",
      "They only detect specific wiring faults and may miss high-resistance connections or insulation degradation",
      "They are too expensive",
      "They require calibration monthly"
    ],
    correctAnswer: 1,
    explanation: "Socket testers detect gross wiring errors (reversed polarity, missing earth, crossed connections) through voltage presence tests. They cannot measure resistance values, test insulation, or detect deteriorating connections. A socket showing 'correct' on a plug-in tester may still have dangerous high-resistance joints. They're a quick check, not a comprehensive test."
  },
  {
    id: 11,
    question: "What precautions should be taken when storing test instruments?",
    options: [
      "Store in direct sunlight to keep batteries charged",
      "Store in a cool, dry place, remove batteries if storing long-term, and protect from physical damage",
      "Keep batteries installed at all times",
      "Store in the vehicle permanently"
    ],
    correctAnswer: 1,
    explanation: "Instruments should be stored in protective cases, in moderate temperature and humidity. For long-term storage, remove batteries to prevent leakage damage. Avoid extreme temperatures (vehicle storage in summer/winter) that can damage LCD displays, batteries, and electronic components. Keep test leads coiled to prevent damage."
  },
  {
    id: 12,
    question: "What should you do if a test instrument is dropped or subjected to physical shock?",
    options: [
      "Continue using it if the display still works",
      "Verify functionality with known values and consider recalibration before relying on results",
      "Discard it immediately",
      "Only use it for non-critical tests"
    ],
    correctAnswer: 1,
    explanation: "Physical shock can affect calibration, damage internal components, or cause intermittent faults. After any significant impact, test against known values (test box, known resistances) to verify operation. For certification work, consider recalibration to confirm accuracy. If results seem unusual, the damage may have affected readings."
  }
];

const faqs = [
  {
    question: "What's the difference between calibration and verification?",
    answer: "Calibration compares instrument readings against traceable standards and documents the deviation (with or without adjustment). Verification is a simpler check against known values to confirm the instrument is working within expected limits. Calibration provides a certificate with measured deviations; verification confirms operation but doesn't provide traceable documentation. Full calibration is required for certification work."
  },
  {
    question: "Can I calibrate my own instruments?",
    answer: "For personal reassurance, you can check instruments against known values. However, for certification purposes, calibration must be performed by an accredited laboratory (typically UKAS accredited in the UK) with traceable reference standards. Self-checks don't provide the documentation trail required for professional certification work."
  },
  {
    question: "Why do some instruments have multiple accuracy specifications?",
    answer: "Accuracy varies with measurement range, type (AC/DC), and function. An instrument might be plus or minus 1% on one range but plus or minus 3% on another, or more accurate for voltage than resistance. Always check the specification for the specific function and range you're using. The specification also typically includes a digit count that adds to the percentage error."
  },
  {
    question: "How do I know if my test leads comply with GS 38?",
    answer: "GS 38 compliant leads have: finger guards/barriers, limited exposed probe tips (4mm typical), shrouded connectors, fuses in at least one lead (for voltage testing), and flexible well-insulated cables. Look for GS 38 marking or equivalent. Many instrument manufacturers supply compliant leads as standard with professional equipment."
  },
  {
    question: "What should I do if I get unexpected or inconsistent readings?",
    answer: "First, check the basics: correct function selected, proper connections, nulled leads, sufficient battery, within calibration. Try a different test point or known reference. If problems persist, the circuit may have an intermittent fault - or the instrument may be malfunctioning. Verify with another instrument if available. Don't record readings you don't trust."
  },
  {
    question: "Are electronic proving units acceptable under GS 38?",
    answer: "Yes, electronic proving units are specifically designed to provide a known voltage for prove-test-prove procedures. They must provide sufficient voltage to prove the indicator's full functionality (typically matching or exceeding the circuit voltage being tested). Battery-powered proving units are convenient for site work but must be regularly tested themselves."
  }
];

const Level3Module4Section2_4 = () => {
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
            <span>Module 4.2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Safe Use, Calibration and Limitations
          </h1>
          <p className="text-white/80">
            Ensuring instrument safety, accuracy, and understanding measurement limitations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Calibration:</strong> Annual (12 month) for certification work</li>
              <li><strong>GS 38:</strong> Prove-test-prove, suitable leads, finger guards</li>
              <li><strong>Accuracy:</strong> Percentage plus digits - both contribute to error</li>
              <li><strong>CAT rating:</strong> Match to measurement location (CAT IV at origin)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Expired calibration sticker = stop certification work</li>
              <li><strong>Spot:</strong> Damaged leads = replace before use</li>
              <li><strong>Use:</strong> Known reference to verify before relying on results</li>
              <li><strong>Use:</strong> Null leads before continuity testing</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply safe working practices when using electrical test instruments",
              "Understand calibration requirements and the importance of traceability",
              "Interpret accuracy specifications and understand measurement uncertainty",
              "Recognise instrument limitations and their impact on test results",
              "Implement GS 38 requirements for voltage testing equipment",
              "Properly maintain and store test instruments for reliable operation"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Safe Use of Instruments */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Safe Use of Test Instruments
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Test instruments are essential tools, but they also present hazards if misused. Understanding safe operating practices protects both you and the equipment under test. HSE Guidance Note GS 38 provides specific requirements for electrical test equipment used on or near live systems, and compliance is essential for professional work.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">GS 38 Key Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Prove-test-prove:</strong> Verify voltage indicator works on known source before AND after testing dead</li>
                <li><strong>Test leads:</strong> Finger guards, limited tip exposure, shrouded connectors, fused where appropriate</li>
                <li><strong>Suitable rating:</strong> CAT rating appropriate for the location of use</li>
                <li><strong>Good condition:</strong> No damaged insulation, secure connections, readable display</li>
              </ul>
            </div>

            <p>
              The prove-test-prove methodology is critical when confirming circuits are dead before work. If your voltage indicator fails silently (displays nothing on a live circuit), you might assume a live circuit is dead - with potentially fatal consequences. By proving the indicator before and after, you confirm it was functioning throughout the test period.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Site example:</strong> You're about to work on a circuit that should be dead. You prove your voltage indicator on a known live source - it shows 235V, beeps, and illuminates as expected. You test the circuit to be worked on - no indication. You prove again on the known source - confirmed working. Now you can be confident the circuit is actually dead, not that your meter has failed.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safe Use Practices:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Select correct function:</strong> Wrong function selection can damage the instrument or give false readings</li>
                <li><strong>Check battery:</strong> Low batteries affect accuracy and may cause erratic operation</li>
                <li><strong>Inspect before use:</strong> Check for physical damage, display clarity, lead condition</li>
                <li><strong>Use appropriate PPE:</strong> Insulated gloves for some live testing situations</li>
                <li><strong>Discharge after IR testing:</strong> Long cables store charge from 500V DC tests</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> No test result is worth risking your safety. If equipment appears damaged, readings don't make sense, or conditions are unusual, stop and investigate before proceeding. Trust your instincts and training.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Calibration Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Calibration Requirements and Traceability
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Calibration is the process of comparing instrument readings against known reference standards and documenting the results. For certification work, instruments must be within their calibration validity period, and that calibration must be traceable to national standards. This ensures your measurements are accurate and legally defensible.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Calibration Matters:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Instruments drift over time and with use</li>
                  <li>Components age and change characteristics</li>
                  <li>Physical impacts affect accuracy</li>
                  <li>Environmental exposure causes degradation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calibration Evidence:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Certificate with unique number and date</li>
                  <li>Reference to standards used</li>
                  <li>Measured deviations recorded</li>
                  <li>Sticker or label on instrument</li>
                </ul>
              </div>
            </div>

            <p>
              The calibration interval for most test instruments used in electrical installation work is 12 months. This is an industry standard based on typical drift rates and use patterns. Some manufacturer warranty conditions, scheme requirements, or risk assessments may specify different intervals, but annual calibration is the default expectation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Traceability Chain:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Your instrument:</strong> Calibrated against laboratory working standards</li>
                <li><strong>Laboratory standards:</strong> Calibrated against reference standards</li>
                <li><strong>Reference standards:</strong> Calibrated against national standards (NPL in UK)</li>
                <li><strong>National standards:</strong> Maintained to international definitions</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Site example:</strong> During an audit, you're asked to demonstrate your instruments are calibrated. You produce certificates showing each instrument was calibrated within the last 12 months by a UKAS-accredited laboratory. The certificates reference the standards used and show measured deviations. This documentation proves your test results are traceable and reliable.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Calibration doesn't guarantee accuracy - it documents the instrument's performance against standards at a specific time. An instrument can go out of calibration the day after being tested. Treat calibration as a baseline confirmation, not a guarantee.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Understanding Accuracy Specifications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Understanding Accuracy and Measurement Uncertainty
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every measurement has uncertainty - no instrument gives a perfect reading. Understanding accuracy specifications helps you interpret results appropriately and avoid over-confidence in displayed values. Most specifications include both a percentage of reading AND a fixed number of digits, both contributing to total uncertainty.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Reading Accuracy Specifications:</p>
              <p className="text-sm text-white/80 mb-3">Example: plus or minus 2% of reading plus or minus 3 digits</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Percentage:</strong> Scales with the reading - larger readings have larger absolute error</li>
                <li><strong>Digits:</strong> Fixed error based on display resolution - more significant at low readings</li>
                <li><strong>Combined:</strong> Add both for total uncertainty range</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Example at 100R</p>
                <p className="text-white/90 text-xs">2% = 2R, 3 digits = 0.3R, Total = plus or minus 2.3R</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Example at 1.0R</p>
                <p className="text-white/90 text-xs">2% = 0.02R, 3 digits = 0.03R, Total = plus or minus 0.05R (5%!)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Conclusion</p>
                <p className="text-white/90 text-xs">Relative accuracy is worse at lower readings due to digit error</p>
              </div>
            </div>

            <p>
              This has practical implications. When measuring low-value resistances (continuity, loop impedance), the digit uncertainty becomes proportionally more significant. A reading of 0.15 ohms with plus or minus 0.03 ohm digit error means actual value could be 0.12 to 0.18 ohms - a 20% uncertainty. At 1.5 ohms, the same digit error is only 2% relative uncertainty.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Practical Implications:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Borderline readings:</strong> If measured Zs is close to the maximum, uncertainty matters</li>
                <li><strong>Comparing readings:</strong> Small differences may be within measurement uncertainty</li>
                <li><strong>Recording results:</strong> Don't imply more precision than the instrument can provide</li>
                <li><strong>Using margins:</strong> The 0.8 multiplier for Zs accounts partly for measurement uncertainty</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Site example:</strong> Your loop impedance tester shows Zs = 1.40 ohms on a circuit with maximum of 1.44 ohms. With plus or minus 3% plus 0.02 ohm accuracy, actual Zs could be 1.34 to 1.46 ohms. The circuit might actually be non-compliant. When readings are this close to limits, consider investigating further or applying additional margin.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Instrument Limitations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Instrument Limitations and Environmental Factors
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every test instrument has limitations beyond simple accuracy. Understanding these helps you use instruments appropriately, interpret results correctly, and recognise when conditions may affect measurements. No instrument is perfect in all conditions, and awareness of limitations prevents errors in diagnosis and certification.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Instrument Limitations:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Measurement range:</strong> Instruments have minimum and maximum readings. Outside this range, readings may be inaccurate or impossible.</li>
                <li><strong>Frequency response:</strong> Some meters are calibrated for 50/60Hz only and may give errors on distorted waveforms or other frequencies.</li>
                <li><strong>True RMS vs average:</strong> Average-responding meters give errors on non-sinusoidal waveforms. True RMS meters handle distorted waveforms correctly.</li>
                <li><strong>Input impedance:</strong> Low input impedance can load sensitive circuits, affecting readings (particularly for voltage measurement).</li>
              </ul>
            </div>

            <p>
              Environmental factors also affect measurements. Temperature affects both the instrument and the circuit under test. Humidity can influence insulation resistance readings. Electromagnetic interference from nearby equipment can affect sensitive measurements. Being aware of these factors helps explain unexpected results.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Temperature:</strong> LCD displays may fade in extreme cold; accuracy may drift outside specified range (typically 18-28 degrees C)</li>
                <li><strong>Humidity:</strong> High humidity can cause surface leakage affecting IR readings; condensation damages instruments</li>
                <li><strong>Electromagnetic interference:</strong> High current conductors or VFDs nearby can affect readings</li>
                <li><strong>Supply voltage variation:</strong> Affects RCD test current and loop impedance readings</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Site example:</strong> You're measuring insulation resistance in a damp basement. Readings are lower than expected - around 5 MR instead of typical 100+ MR. Before condemning the installation, consider that humidity is affecting the measurement. Dry conditions might give very different results. Note the conditions in your report and consider retesting in different conditions if practical.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Instrument specifications assume ideal conditions. Real-world measurements may be affected by factors outside these conditions. When results seem unusual, consider whether environmental or circuit conditions might be influencing the reading before drawing conclusions.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Use Checks</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify calibration date is current - check sticker and certificate</li>
                <li>Inspect leads for damage - cracks, exposed conductors, loose connections</li>
                <li>Check battery level - low batteries affect accuracy</li>
                <li>Test against known reference - verify instrument is reading correctly</li>
                <li>Null leads on continuity tester - subtract lead resistance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Maintaining Instrument Accuracy</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Store in protective case when not in use</li>
                <li>Avoid extreme temperatures and humidity</li>
                <li>Remove batteries for long-term storage</li>
                <li>Handle carefully - avoid drops and impacts</li>
                <li>Clean contacts and probes regularly</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">When to Question Results</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Readings don't make sense:</strong> Unusually high or low for the circuit type</li>
                <li><strong>Inconsistent results:</strong> Different readings each time on the same point</li>
                <li><strong>Results conflict:</strong> Calculated and measured values don't match</li>
                <li><strong>Environmental factors:</strong> Extreme conditions that might affect accuracy</li>
                <li><strong>Physical damage:</strong> Instrument has been dropped or damaged</li>
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
                <p className="font-medium text-white mb-1">Pre-Test Checklist</p>
                <ul className="space-y-0.5">
                  <li>Calibration current (within 12 months)</li>
                  <li>Leads undamaged with finger guards</li>
                  <li>Battery adequate</li>
                  <li>Prove-test-prove for voltage testing</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">CAT Ratings</p>
                <ul className="space-y-0.5">
                  <li>CAT I: Protected electronic circuits</li>
                  <li>CAT II: Socket outlets, appliances</li>
                  <li>CAT III: Distribution boards</li>
                  <li>CAT IV: Origin of installation</li>
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
            <Link to="../level3-module4-section2-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Clamp Meters and Thermal Imaging
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module4-section3">
              Next: Section 3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module4Section2_4;
