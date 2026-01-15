import { useState } from "react";
import { ArrowLeft, ArrowRight, Zap, CheckCircle, AlertTriangle, FileText, Target, Wrench, ClipboardCheck, HelpCircle, Lightbulb, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

const Level3Module8Section2_4 = () => {
  useSEO(
    "Testing Procedures Guide - Level 3 Mock Exams & Exam Preparation",
    "Complete guide to testing procedures and sequence for practical assessments - BS 7671 test requirements, instrument selection, and acceptance criteria"
  );

  const [showQuiz, setShowQuiz] = useState(false);

  // Test sequence data based on BS 7671 requirements
  const testSequence = [
    {
      order: 1,
      test: "Continuity of Protective Conductors",
      regulation: "643.2.1",
      instrument: "Low-resistance ohmmeter",
      acceptanceCriteria: "Recorded value consistent with conductor size",
      deadOrLive: "Dead",
      notes: "Include main and supplementary bonding"
    },
    {
      order: 2,
      test: "Continuity of Ring Final Circuit Conductors",
      regulation: "643.2.1",
      instrument: "Low-resistance ohmmeter",
      acceptanceCriteria: "r1, rn, r2 values consistent; cross-connections verified",
      deadOrLive: "Dead",
      notes: "Three-step test method required"
    },
    {
      order: 3,
      test: "Insulation Resistance",
      regulation: "643.3",
      instrument: "Insulation resistance tester",
      acceptanceCriteria: "≥1 MΩ at 500V DC (new installations)",
      deadOrLive: "Dead",
      notes: "Disconnect SPDs and sensitive equipment"
    },
    {
      order: 4,
      test: "SELV/PELV Separation",
      regulation: "643.4",
      instrument: "Insulation resistance tester",
      acceptanceCriteria: "Electrical separation confirmed",
      deadOrLive: "Dead",
      notes: "Only where such circuits exist"
    },
    {
      order: 5,
      test: "Polarity",
      regulation: "643.6",
      instrument: "Low-resistance ohmmeter / Approved voltage indicator",
      acceptanceCriteria: "Correct polarity throughout",
      deadOrLive: "Dead/Live",
      notes: "Can be confirmed during continuity testing"
    },
    {
      order: 6,
      test: "Earth Electrode Resistance",
      regulation: "643.7.2",
      instrument: "Earth electrode tester / EFLI tester",
      acceptanceCriteria: "Value allows disconnection within required time",
      deadOrLive: "Dead (before energisation)",
      notes: "Required for TT systems"
    },
    {
      order: 7,
      test: "Earth Fault Loop Impedance (Zs)",
      regulation: "643.7.3",
      instrument: "EFLI tester",
      acceptanceCriteria: "Measured value ≤ tabulated maximum Zs",
      deadOrLive: "Live",
      notes: "Temperature correction may be required"
    },
    {
      order: 8,
      test: "Prospective Fault Current (Ipf)",
      regulation: "643.7.3.201",
      instrument: "EFLI/PFC tester",
      acceptanceCriteria: "Value ≤ rated breaking capacity of devices",
      deadOrLive: "Live",
      notes: "Record both phase-neutral and phase-earth values"
    },
    {
      order: 9,
      test: "RCD Operation",
      regulation: "643.8",
      instrument: "RCD tester",
      acceptanceCriteria: "Operates within specified time at rated IΔn",
      deadOrLive: "Live",
      notes: "Test at 1×IΔn and 5×IΔn for general RCDs"
    },
    {
      order: 10,
      test: "Functional Testing",
      regulation: "643.10",
      instrument: "Visual / Various",
      acceptanceCriteria: "All equipment operates correctly",
      deadOrLive: "Live",
      notes: "Switches, isolators, controls, interlocks"
    }
  ];

  // Test instruments data
  const testInstruments = [
    {
      instrument: "Low-Resistance Ohmmeter",
      standard: "BS EN 61557-4",
      tests: ["Continuity of protective conductors", "Ring circuit continuity", "Bonding"],
      accuracy: "±2% ±3 digits",
      testCurrent: "≥200 mA at 4-24V",
      keyFeatures: ["Null function for lead resistance", "Auto-ranging", "Data storage"]
    },
    {
      instrument: "Insulation Resistance Tester",
      standard: "BS EN 61557-2",
      tests: ["Insulation resistance", "SELV/PELV verification"],
      accuracy: "±5%",
      testVoltage: "250V, 500V, 1000V DC options",
      keyFeatures: ["Timer function", "Automatic discharge", "Hold function"]
    },
    {
      instrument: "Earth Fault Loop Impedance Tester",
      standard: "BS EN 61557-3",
      tests: ["Earth fault loop impedance (Zs)", "Prospective fault current (Ipf)"],
      accuracy: "±5%",
      testCurrent: "Varies by instrument",
      keyFeatures: ["No-trip testing option", "L-N and L-PE modes", "PFC calculation"]
    },
    {
      instrument: "RCD Tester",
      standard: "BS EN 61557-6",
      tests: ["RCD tripping time", "RCD tripping current"],
      accuracy: "±1 ms timing",
      testCurrents: "½×IΔn, 1×IΔn, 5×IΔn, ramp test",
      keyFeatures: ["0° and 180° testing", "Auto-reclose detection", "S-type RCD testing"]
    },
    {
      instrument: "Earth Electrode Tester",
      standard: "BS EN 61557-5",
      tests: ["Earth electrode resistance (RA)"],
      accuracy: "±5%",
      method: "Fall-of-potential (3-terminal/4-terminal)",
      keyFeatures: ["Interference rejection", "Stakeless option available"]
    }
  ];

  // Common test errors data
  const commonTestErrors = [
    {
      error: "Testing before safe isolation",
      consequence: "Electric shock risk, inaccurate readings",
      prevention: "Always prove dead before dead tests"
    },
    {
      error: "Not nulling test leads",
      consequence: "Lead resistance added to readings",
      prevention: "Null leads at start and check periodically"
    },
    {
      error: "Testing with loads connected",
      consequence: "Incorrect insulation resistance readings",
      prevention: "Disconnect all loads for IR testing"
    },
    {
      error: "Forgetting SPD disconnection",
      consequence: "SPDs damaged by test voltage",
      prevention: "Identify and disconnect all SPDs"
    },
    {
      error: "No temperature correction for Zs",
      consequence: "Marginal values may fail when hot",
      prevention: "Apply 0.8 multiplier to tabulated values"
    },
    {
      error: "Wrong test voltage for IR",
      consequence: "Inadequate or excessive test stress",
      prevention: "Use 500V DC for 230V circuits"
    },
    {
      error: "Testing at wrong RCD phase angle",
      consequence: "Missing worst-case trip time",
      prevention: "Test at both 0° and 180°"
    },
    {
      error: "Not recording all readings",
      consequence: "Incomplete documentation, compliance issues",
      prevention: "Document every test result"
    }
  ];

  // Quiz questions
  const quizQuestions = [
    {
      question: "According to BS 7671, what is the FIRST test that should be performed in the prescribed sequence?",
      options: [
        "Insulation resistance",
        "Earth fault loop impedance",
        "Continuity of protective conductors",
        "RCD operation"
      ],
      correctAnswer: 2,
      explanation: "Continuity of protective conductors (including main and supplementary bonding) is the first test in the prescribed sequence per Regulation 643.2.1. This must be done before the installation is energised."
    },
    {
      question: "What is the minimum acceptable insulation resistance value for a new 230V circuit tested at 500V DC?",
      options: [
        "0.5 MΩ",
        "1.0 MΩ",
        "2.0 MΩ",
        "5.0 MΩ"
      ],
      correctAnswer: 1,
      explanation: "The minimum acceptable insulation resistance for circuits up to 500V is 1.0 MΩ when tested at 500V DC according to BS 7671 Table 64.3."
    },
    {
      question: "What minimum test current must a low-resistance ohmmeter provide for continuity testing?",
      options: [
        "50 mA",
        "100 mA",
        "200 mA",
        "500 mA"
      ],
      correctAnswer: 2,
      explanation: "A low-resistance ohmmeter must produce a test current of at least 200 mA at between 4V and 24V DC as specified in BS EN 61557-4."
    },
    {
      question: "Why must SPDs be disconnected before insulation resistance testing?",
      options: [
        "They will affect the test current",
        "The test voltage may damage them",
        "They will give a false high reading",
        "They interfere with the tester calibration"
      ],
      correctAnswer: 1,
      explanation: "SPDs (Surge Protective Devices) may be damaged by the 500V DC test voltage used for insulation resistance testing. They must be disconnected to prevent damage and to obtain accurate readings."
    },
    {
      question: "When testing RCD operation, what phase angles should be used?",
      options: [
        "0° only",
        "180° only",
        "90° and 270°",
        "0° and 180°"
      ],
      correctAnswer: 3,
      explanation: "RCDs should be tested at both 0° and 180° phase angles to find the worst-case tripping time. The highest recorded value should be used for compliance purposes."
    },
    {
      question: "What correction factor should be applied to tabulated Zs values when comparing with measured values at ambient temperature?",
      options: [
        "Multiply by 1.2",
        "Multiply by 0.8",
        "Divide by 0.8",
        "No correction needed"
      ],
      correctAnswer: 1,
      explanation: "A multiplying factor of 0.8 should be applied to tabulated maximum Zs values (or measured values divided by 0.8) to allow for conductor temperature rise during normal operation."
    },
    {
      question: "What is the three-step method used for in electrical testing?",
      options: [
        "Testing RCD operation",
        "Testing ring final circuit continuity",
        "Measuring earth electrode resistance",
        "Verifying insulation resistance"
      ],
      correctAnswer: 1,
      explanation: "The three-step method (end-to-end testing) is used for testing ring final circuit continuity. It involves measuring r1+rn, r2, and r1+r2 with cross-connections, then verifying at each socket outlet."
    },
    {
      question: "Which test must be completed BEFORE the installation is energised for the first time?",
      options: [
        "RCD operation test",
        "Earth fault loop impedance",
        "Prospective fault current",
        "Earth electrode resistance (for TT systems)"
      ],
      correctAnswer: 3,
      explanation: "For TT systems, earth electrode resistance must be measured before the installation is energised (Regulation 643.7.2) to verify that protective devices can operate within required disconnection times."
    },
    {
      question: "What should be done if a measured Zs value is close to the maximum permitted value?",
      options: [
        "Accept it as it meets the requirement",
        "Apply temperature correction and reassess",
        "Ignore it if the circuit works",
        "Only retest during winter months"
      ],
      correctAnswer: 1,
      explanation: "When measured Zs is close to maximum permitted values, temperature correction must be applied. Conductors will have higher resistance when hot during normal operation, so the measured cold value must be adjusted."
    },
    {
      question: "What is the purpose of the 'null' function on a low-resistance ohmmeter?",
      options: [
        "To reset the instrument to factory settings",
        "To compensate for test lead resistance",
        "To switch between measurement ranges",
        "To store readings for later review"
      ],
      correctAnswer: 1,
      explanation: "The null function compensates for test lead resistance by subtracting it from subsequent measurements. This ensures accurate readings of the actual conductor resistance being tested."
    },
    {
      question: "At what test current should a 30 mA RCD be tested to verify it trips within the maximum permitted time?",
      options: [
        "15 mA (½×IΔn)",
        "30 mA (1×IΔn)",
        "150 mA (5×IΔn)",
        "300 mA (10×IΔn)"
      ],
      correctAnswer: 2,
      explanation: "At the rated residual operating current (1×IΔn = 30 mA), a general Type AC RCD must trip within 300 ms. At 5×IΔn (150 mA), it must trip within 40 ms."
    },
    {
      question: "Why is it important to record BOTH line-neutral and line-earth prospective fault currents?",
      options: [
        "To calculate the average fault current",
        "To verify protective device ratings for all fault types",
        "For insurance documentation purposes",
        "Only line-earth is actually required"
      ],
      correctAnswer: 1,
      explanation: "Both values must be recorded because protective devices must have adequate breaking capacity for all foreseeable fault conditions. The highest prospective fault current must not exceed the rated breaking capacity of the installed devices."
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "Why is the test sequence prescribed by BS 7671 so important?",
      answer: "The prescribed sequence ensures safety and accuracy. Dead tests are performed first (continuity, insulation resistance) while the installation is safely isolated, then live tests (Zs, Ipf, RCD) once preliminary safety is confirmed. This protects both the tester and the installation."
    },
    {
      question: "Can I skip tests if they were done on a previous inspection?",
      answer: "No. For initial verification, all relevant tests must be completed. For periodic inspection, the scope may be agreed with the client, but you cannot simply rely on previous results. Conditions may have changed since the last inspection."
    },
    {
      question: "What should I do if I get unexpected test results?",
      answer: "Never ignore unexpected results. Investigate the cause - check connections, verify the test method, ensure leads are correctly connected, and retest. If results remain unusual, there may be a fault that needs rectification before proceeding."
    },
    {
      question: "How often should test instruments be calibrated?",
      answer: "Test instruments should be calibrated at regular intervals as recommended by the manufacturer, typically annually. Additionally, they should be checked against known values periodically and recalibrated if damaged or suspect."
    },
    {
      question: "Is it acceptable to use a multifunction tester for all tests?",
      answer: "Multifunction testers can perform most required tests and are commonly used. However, ensure the instrument meets the relevant standards (BS EN 61557 series) for each test function and that you understand the correct operation for each test type."
    },
    {
      question: "What documentation is required for test results?",
      answer: "All test results must be recorded on the appropriate schedule (Schedule of Test Results) and included with the Electrical Installation Certificate (EIC) or Minor Electrical Installation Works Certificate (MEIWC). Results should include the circuit details, measured values, and comparison with permitted limits."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Practical Help
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 flex items-center justify-center border border-elec-yellow/20">
              <ClipboardCheck className="w-6 h-6 text-elec-yellow" />
            </div>
            <div>
              <p className="text-sm text-elec-yellow font-medium">Section 2.4</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Testing Procedures Guide</h1>
            </div>
          </div>
          <p className="text-lg text-white/70">
            Master the BS 7671 test sequence, instrument selection, acceptance criteria, and documentation requirements for electrical installation testing.
          </p>
        </div>

        {/* Quick Summary Box */}
        <div className="bg-gradient-to-br from-elec-yellow/10 to-transparent border border-elec-yellow/20 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-elec-yellow" />
            Quick Summary
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-white/80 text-sm"><span className="text-elec-yellow font-medium">Chapter 64:</span> Verification requirements in BS 7671</p>
              <p className="text-white/80 text-sm"><span className="text-elec-yellow font-medium">Guidance Note 3:</span> IET inspection and testing guidance</p>
            </div>
            <div className="space-y-2">
              <p className="text-white/80 text-sm"><span className="text-elec-yellow font-medium">Dead tests first:</span> Continuity, IR, polarity before energising</p>
              <p className="text-white/80 text-sm"><span className="text-elec-yellow font-medium">Live tests:</span> Zs, Ipf, RCD after preliminary verification</p>
            </div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-elec-yellow" />
            Learning Outcomes
          </h2>
          <ul className="space-y-3">
            {[
              "Understand the prescribed BS 7671 test sequence and its importance",
              "Select appropriate test instruments for each verification test",
              "Apply correct test methods and acceptance criteria",
              "Identify common testing errors and how to avoid them",
              "Document test results accurately for certification"
            ].map((outcome, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/80">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 1: The Prescribed Test Sequence */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">1</span>
            <h2 className="text-xl font-bold text-white">The Prescribed Test Sequence</h2>
          </div>

          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-white/80">
              BS 7671 Regulation 643.1 prescribes a specific sequence for initial verification tests. This sequence is designed to ensure that dead tests are completed safely before the installation is energised, and that each test builds upon the results of previous tests. Following this sequence is essential for both safety and accuracy.
            </p>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-amber-400 font-medium mb-1">Critical Safety Point</h4>
                <p className="text-white/70 text-sm">Tests 1-6 in the sequence are 'dead' tests performed with the installation safely isolated. Tests 7-10 are 'live' tests performed with the installation energised. Never attempt live tests until dead tests confirm the installation is safe to energise.</p>
              </div>
            </div>
          </div>

          {/* Test Sequence Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white/10">
                  <th className="border border-white/20 px-3 py-2 text-left text-white text-sm">Order</th>
                  <th className="border border-white/20 px-3 py-2 text-left text-white text-sm">Test</th>
                  <th className="border border-white/20 px-3 py-2 text-left text-white text-sm">Regulation</th>
                  <th className="border border-white/20 px-3 py-2 text-left text-white text-sm">Dead/Live</th>
                </tr>
              </thead>
              <tbody>
                {testSequence.map((test, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white/5" : ""}>
                    <td className="border border-white/20 px-3 py-2 text-elec-yellow font-medium text-sm">{test.order}</td>
                    <td className="border border-white/20 px-3 py-2 text-white/80 text-sm">{test.test}</td>
                    <td className="border border-white/20 px-3 py-2 text-white/60 text-sm">{test.regulation}</td>
                    <td className="border border-white/20 px-3 py-2 text-sm">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${test.deadOrLive === "Dead" ? "bg-green-500/20 text-green-400" : test.deadOrLive === "Live" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                        {test.deadOrLive}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <h4 className="text-white font-medium mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-elec-yellow" />
              Exam Memory Tip
            </h4>
            <p className="text-white/70 text-sm">
              Remember "CIRP-ZPRP" for the main sequence: <strong>C</strong>ontinuity, <strong>I</strong>nsulation <strong>R</strong>esistance, <strong>P</strong>olarity (dead tests), then <strong>Z</strong>s, <strong>P</strong>FC, <strong>R</strong>CD, <strong>P</strong>rove function (live tests). The dead tests come first for safety!
            </p>
          </div>

          <InlineCheck
            question="Why must continuity testing be performed before insulation resistance testing?"
            answer="Continuity testing confirms the integrity of protective conductors before applying the higher test voltage of the insulation resistance test. If continuity was poor, the IR test might not detect faults correctly, and you wouldn't know if protective paths are intact."
          />
        </section>

        {/* Section 2: Test Instruments and Standards */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">2</span>
            <h2 className="text-xl font-bold text-white">Test Instruments and Standards</h2>
          </div>

          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-white/80">
              Test instruments must comply with the BS EN 61557 series of standards to ensure accurate and safe measurements. Each instrument type has specific requirements for test parameters, accuracy, and safety features. Using non-compliant or uncalibrated instruments can lead to invalid results and potential safety issues.
            </p>
          </div>

          {/* Instruments Grid */}
          <div className="space-y-4 mb-6">
            {testInstruments.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-white font-medium">{item.instrument}</h4>
                  <span className="px-2 py-0.5 bg-elec-yellow/20 text-elec-yellow text-xs rounded font-medium">{item.standard}</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-white/50 text-xs mb-1">Tests Performed:</p>
                    <ul className="text-white/70 space-y-0.5">
                      {item.tests.map((test, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-400 mt-1 flex-shrink-0" />
                          {test}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs mb-1">Key Specifications:</p>
                    <ul className="text-white/70 space-y-0.5">
                      <li>Accuracy: {item.accuracy}</li>
                      {item.testCurrent && <li>Test current: {item.testCurrent}</li>}
                      {item.testVoltage && <li>Test voltage: {item.testVoltage}</li>}
                      {item.testCurrents && <li>Test currents: {item.testCurrents}</li>}
                      {item.method && <li>Method: {item.method}</li>}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <FileText className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-blue-400 font-medium mb-1">GS38 Compliance</h4>
                <p className="text-white/70 text-sm">Test leads and probes must comply with Health and Safety Guidance Note GS38. Requirements include fused test leads, shrouded probes with limited exposed tips, and robust insulation. Never use damaged or non-compliant test equipment.</p>
              </div>
            </div>
          </div>

          <InlineCheck
            question="What is the minimum test current required for a continuity tester used for protective conductor testing?"
            answer="A minimum of 200 mA at a voltage between 4V and 24V DC (open circuit) as specified in BS EN 61557-4. This ensures sufficient current to make reliable measurements through connections."
          />
        </section>

        {/* Section 3: Acceptance Criteria and Limits */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">3</span>
            <h2 className="text-xl font-bold text-white">Acceptance Criteria and Limits</h2>
          </div>

          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-white/80">
              Understanding acceptance criteria is crucial for determining whether an installation passes or fails verification. Each test has specific limits defined in BS 7671, and some require correction factors to be applied. Marginal results should always be investigated further.
            </p>
          </div>

          {/* Key Acceptance Criteria */}
          <div className="grid gap-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-elec-yellow font-medium mb-3">Insulation Resistance (Table 64.3)</h4>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white/50 text-xs mb-1">SELV/PELV</p>
                  <p className="text-white font-medium">≥0.5 MΩ</p>
                  <p className="text-white/60 text-xs">at 250V DC</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white/50 text-xs mb-1">Up to 500V</p>
                  <p className="text-white font-medium">≥1.0 MΩ</p>
                  <p className="text-white/60 text-xs">at 500V DC</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white/50 text-xs mb-1">Above 500V</p>
                  <p className="text-white font-medium">≥1.0 MΩ</p>
                  <p className="text-white/60 text-xs">at 1000V DC</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-elec-yellow font-medium mb-3">RCD Tripping Times (Table 41.1)</h4>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white/50 text-xs mb-1">At 1×IΔn (e.g., 30 mA)</p>
                  <p className="text-white font-medium">≤300 ms</p>
                  <p className="text-white/60 text-xs">General Type AC/A RCDs</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-white/50 text-xs mb-1">At 5×IΔn (e.g., 150 mA)</p>
                  <p className="text-white font-medium">≤40 ms</p>
                  <p className="text-white/60 text-xs">General Type AC/A RCDs</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-elec-yellow font-medium mb-3">Earth Fault Loop Impedance (Zs)</h4>
              <div className="space-y-2 text-sm">
                <p className="text-white/80">Maximum values depend on protective device type and rating - refer to Tables 41.2-41.5 in BS 7671.</p>
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                  <p className="text-amber-400 font-medium text-xs mb-1">Temperature Correction Required</p>
                  <p className="text-white/70 text-xs">Measured values at ambient temperature must be compared against tabulated values multiplied by 0.8, OR measured values can be divided by 0.8 then compared to tabulated values.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-green-400 font-medium mb-1">Practical Example - Zs Verification</h4>
                <p className="text-white/70 text-sm">A 32A Type B MCB has a tabulated maximum Zs of 1.37 Ω. With temperature correction: 1.37 × 0.8 = 1.096 Ω. Your measured value of 0.95 Ω is acceptable as it is below 1.096 Ω.</p>
              </div>
            </div>
          </div>

          <InlineCheck
            question="If a measured Zs value is 1.30 Ω for a 32A Type B MCB (tabulated max 1.37 Ω), is this acceptable?"
            answer="No. Although 1.30 Ω is below the tabulated 1.37 Ω, we must apply temperature correction. The corrected limit is 1.37 × 0.8 = 1.096 Ω. The measured value of 1.30 Ω exceeds this, so the circuit fails and requires investigation."
          />
        </section>

        {/* Section 4: Common Errors and Best Practice */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">4</span>
            <h2 className="text-xl font-bold text-white">Common Errors and Best Practice</h2>
          </div>

          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-white/80">
              Testing errors can lead to safety hazards, incorrect certification, and failed assessments. Understanding common mistakes and implementing best practices will help ensure accurate, reliable test results and successful completion of practical assessments.
            </p>
          </div>

          {/* Common Errors Table */}
          <div className="space-y-3 mb-6">
            {commonTestErrors.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-1">{item.error}</h4>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-red-400/80 text-xs mb-0.5">Consequence:</p>
                        <p className="text-white/60">{item.consequence}</p>
                      </div>
                      <div>
                        <p className="text-green-400/80 text-xs mb-0.5">Prevention:</p>
                        <p className="text-white/70">{item.prevention}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Best Practice Checklist */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
            <h4 className="text-white font-medium mb-4 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-elec-yellow" />
              Pre-Testing Best Practice Checklist
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Verify instrument calibration is current",
                "Check test leads for damage and compliance",
                "Null test leads before continuity tests",
                "Identify and disconnect SPDs",
                "Safely isolate and prove dead",
                "Gather circuit information and drawings",
                "Prepare Schedule of Test Results form",
                "Ensure adequate lighting in work area"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded border border-white/30 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                  </div>
                  <span className="text-white/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <InlineCheck
            question="What must you do before performing an insulation resistance test on a circuit containing LED drivers and electronic equipment?"
            answer="Disconnect or isolate all sensitive electronic equipment including LED drivers, dimmers, PIR sensors, and similar devices. The 500V DC test voltage can damage electronic components not designed to withstand it."
          />
        </section>

        {/* Practical Guidance Box */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            Assessment Day Guidance
          </h3>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Before Starting Tests</h4>
              <ul className="space-y-1 text-white/70 text-sm">
                <li>- Thoroughly inspect the installation visually first</li>
                <li>- Plan your test sequence and gather all instruments</li>
                <li>- Check instrument batteries and calibration labels</li>
                <li>- Prepare documentation forms ready for recording</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">During Testing</h4>
              <ul className="space-y-1 text-white/70 text-sm">
                <li>- Follow the prescribed sequence without shortcuts</li>
                <li>- Record ALL readings, even passing values</li>
                <li>- Investigate any unexpected or borderline results</li>
                <li>- Maintain safe isolation until ready for live tests</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Documentation</h4>
              <ul className="space-y-1 text-white/70 text-sm">
                <li>- Complete all fields on the Schedule of Test Results</li>
                <li>- Note instrument serial numbers and calibration dates</li>
                <li>- Record both measured values and acceptance limits</li>
                <li>- Sign and date all certification documents</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-elec-yellow" />
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                <h4 className="text-white font-medium mb-2">{faq.question}</h4>
                <p className="text-white/70 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Reference Box */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Reference - Key Values</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Minimum IR (500V circuits)</span>
                <span className="text-white font-medium">≥1.0 MΩ</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Continuity test current</span>
                <span className="text-white font-medium">≥200 mA</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">RCD trip time (1×IΔn)</span>
                <span className="text-white font-medium">≤300 ms</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">RCD trip time (5×IΔn)</span>
                <span className="text-white font-medium">≤40 ms</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Zs temperature correction</span>
                <span className="text-white font-medium">×0.8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">IR test voltage (230V circuits)</span>
                <span className="text-white font-medium">500V DC</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">R1+R2 ring circuit</span>
                <span className="text-white font-medium">¼(r1+r2)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Main bonding max R</span>
                <span className="text-white font-medium">&lt;0.05 Ω</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Test Your Knowledge</h3>
          {!showQuiz ? (
            <div className="text-center">
              <p className="text-white/70 mb-4">Ready to test your understanding of testing procedures?</p>
              <Button
                onClick={() => setShowQuiz(true)}
                className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90"
              >
                Start Quiz (12 Questions)
              </Button>
            </div>
          ) : (
            <Quiz
              questions={quizQuestions}
              onComplete={() => setShowQuiz(false)}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-white/10">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
            <Link to="../section2-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Safe Isolation Practice
            </Link>
          </Button>
          <Button className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90" asChild>
            <Link to="../section3">
              Next: Exam Tips
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Level3Module8Section2_4;
