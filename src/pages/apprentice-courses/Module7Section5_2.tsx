import { ArrowLeft, Target, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module7Section5_2 = () => {
  useSEO(
    "Checking Instruments for Safety and Accuracy - Level 2 Module 7 Section 5.2",
    "Essential procedures for verifying test equipment safety and accuracy before use"
  );

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "Why is checking test instruments before use essential?",
      options: ["It's required by law", "To ensure they are safe and provide accurate readings", "It saves money", "It looks professional"],
      correctAnswer: 1,
      explanation: "Faulty or poorly maintained instruments can give misleading results, create safety hazards, or expose users to electric shock."
    },
    {
      id: 2,
      question: "What should be inspected during a visual check?",
      options: ["Only the display", "The casing, leads, probes, and fuses", "Just the battery compartment", "Only the test leads"],
      correctAnswer: 1,
      explanation: "A comprehensive visual inspection should cover the instrument casing, test leads, probes, and internal fuses where accessible."
    },
    {
      id: 3,
      question: "Why must leads and probes comply with GS38?",
      options: ["To reduce cost", "To minimise the risk of accidental contact with live parts", "To improve accuracy", "To meet warranty requirements"],
      correctAnswer: 1,
      explanation: "GS38 compliance ensures probe tips are properly shrouded and finger guards are present to prevent accidental contact with live conductors."
    },
    {
      id: 4,
      question: "How can a voltage indicator be proven accurate before use?",
      options: ["Check the battery level", "Test it against a proving unit or known live supply", "Read the instruction manual", "Check the calibration sticker only"],
      correctAnswer: 1,
      explanation: "Testing against a proving unit or known live supply confirms the instrument correctly detects and indicates the presence of voltage."
    },
    {
      id: 5,
      question: "Why should accuracy be checked both before and after isolation?",
      options: ["It's a legal requirement", "To ensure the instrument hasn't failed during the test period", "To waste time", "To impress clients"],
      correctAnswer: 1,
      explanation: "The Prove-Test-Prove procedure ensures the instrument was working correctly before the test and hasn't failed during the testing process."
    },
    {
      id: 6,
      question: "What is the role of calibration in test equipment?",
      options: ["To make instruments look professional", "To ensure results remain within required tolerances", "To increase the price", "To comply with colour coding"],
      correctAnswer: 1,
      explanation: "Calibration ensures instruments provide accurate readings within specified tolerance limits, essential for reliable test results."
    },
    {
      id: 7,
      question: "True or False: Using a CAT II instrument on a distribution board is acceptable.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Distribution boards require CAT III rated instruments as they can safely handle the higher energy transients present at distribution level."
    },
    {
      id: 8,
      question: "What should you do if an instrument fails a safety check?",
      options: ["Continue using it carefully", "Remove it from service and report it immediately", "Fix it yourself", "Use it for non-critical tests only"],
      correctAnswer: 1,
      explanation: "Any instrument that fails safety checks must be immediately removed from service and reported to prevent unsafe use."
    },
    {
      id: 9,
      question: "In the real-world example, what caused the electrician to receive a shock?",
      options: ["Using the wrong voltage rating", "The instrument's internal fuse had blown but wasn't detected", "Poor test lead condition", "Incorrect calibration"],
      correctAnswer: 1,
      explanation: "The voltage indicator's internal fuse had blown months earlier, causing it to fail to register live voltage, but this wasn't detected due to lack of proving checks."
    },
    {
      id: 10,
      question: "How did the apprentice in the second example confirm isolation correctly?",
      options: ["Used a non-contact tester only", "Followed the Prove-Test-Prove procedure with a proving unit", "Checked the switch position", "Asked a colleague to confirm"],
      correctAnswer: 1,
      explanation: "The apprentice properly used a proving unit to verify the voltage indicator worked before testing, confirming the circuit was live, then dead after isolation."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white p-0 text-sm sm:text-base" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 7.5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 rounded-lg ">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs sm:text-sm">
              Section 7.5.2
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Checking Instruments for Safety and Accuracy
          </h1>
          <p className="text-white text-sm sm:text-base">
            Essential procedures for verifying test equipment safety and accuracy before use
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 sm:mb-3">In 30 seconds</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Visual inspection: casing, leads, probes, fuses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Prove functionality with proving unit or known supply</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Check calibration certificates and dates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Verify category rating matches test environment</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/20">
              <p className="font-medium mb-2 sm:mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Spot:</strong> Damaged casings, cut leads, missing shrouds</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Use:</strong> Prove-Test-Prove procedure; correct CAT rating</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Check:</strong> Remove faulty equipment; report immediately</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Introduction</h2>
          <p className="text-sm sm:text-base text-white mb-4">
            Even the best test equipment is only useful if it is safe to use and provides accurate readings. Faulty or poorly maintained instruments can give misleading results, leading to unsafe conclusions, or worse, expose the user to electric shock. For apprentices, learning how to check equipment before use is just as important as learning how to operate it. Instruments must be inspected, proven safe, and verified for accuracy before any testing begins.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Learning Outcomes</h2>
          <p className="text-sm sm:text-base text-white mb-3 sm:mb-4">By the end of this subsection, you should be able to:</p>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Explain why checking instruments is essential for safe electrical work</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Describe the basic safety and accuracy checks to perform before use</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Recognise what to do if an instrument fails inspection</span>
            </li>
          </ul>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Content / Learning</h2>

          {/* Section 1 — Visual Inspection */}
          <section className="mb-6 sm:mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-elec-yellow ">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-elec-yellow dark:text-elec-yellow mb-4 text-base">Visual Inspection and GS38 Compliance</h3>
                  
                  <div className="space-y-4 text-xs sm:text-sm text-white">
                    <p><strong>Instrument casing integrity:</strong> Check for cracks, missing battery covers, damaged displays, or broken selector switches that could expose internal components. Any damage to the casing can compromise both safety and measurement accuracy. Look for signs of impact damage, overheating, or chemical corrosion that might affect the instrument's operation.</p>
                    
                    <p><strong>Test lead condition:</strong> Examine the entire length for cuts, kinks, or damage. Pay special attention to connection points where stress concentrates, particularly at the instrument and probe ends. Damaged insulation can expose conductors, creating shock risks and affecting measurement integrity.</p>
                    
                    <p><strong>GS38 probe compliance:</strong> Probe tips must be shrouded to expose no more than 2mm of conductor. Finger guards and insulated shafts are mandatory for safety. Check that probe shrouds are intact and properly secured — loose or damaged shrouds defeat the safety protection. Ensure probes have appropriate barrier protection to prevent accidental contact with adjacent live conductors.</p>
                    
                    <p><strong>Internal fuse verification:</strong> Where accessible, verify fuses are the correct rating and type as specified by the manufacturer. Blown or incorrect fuses can render safety features ineffective or cause inaccurate readings. Some instruments have multiple fuses for different functions — ensure all are checked and match the required specifications.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="visual-inspection-gs38"
            question="According to GS38, what is the maximum amount of conductor that can be exposed on a probe tip?"
            options={["1mm", "2mm", "4mm", "6mm"]}
            correctIndex={1}
            explanation="GS38 specifies that probe tips must be shrouded to expose no more than 2mm of conductor to minimise the risk of accidental contact with live parts."
          />

          {/* Section 2 — Proving Functionality */}
          <section className="mb-6 sm:mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-green-500 ">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-600 dark:text-green-400 mb-4 text-base">Proving Functionality - The Prove-Test-Prove Method</h3>
                  
                  <div className="space-y-4 text-xs sm:text-sm text-white">
                    <p><strong>Proving units and their importance:</strong> Dedicated devices that generate known voltages to test instrument response. Essential for voltage indicators and non-contact testers. Proving units provide a controlled, safe means of verifying instrument operation without relying on live electrical systems that may themselves be faulty.</p>
                    
                    <p><strong>Known live supply verification:</strong> Using a confirmed live source (like a socket outlet known to be energised) to verify the instrument detects voltage correctly. This method requires certainty that the supply is indeed live — never assume a supply is live without independent verification.</p>
                    
                    <p><strong>The Prove-Test-Prove sequence:</strong> Test the instrument on a known live source, perform the actual isolation test, then retest on the live source to confirm continued operation. This critical safety procedure ensures the instrument was working before testing and hasn't failed during the process. Any instrument that fails the final proving check invalidates all previous test results.</p>
                    
                    <p><strong>Continuity function verification:</strong> Test continuity function using a short test lead or known low-resistance path (such as shorting the test probes) to ensure accurate readings. The instrument should display near-zero resistance, typically less than 0.01Ω, confirming the measurement circuit is functioning correctly.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="prove-test-prove-method"
            question="What is the 'Prove-Test-Prove' procedure designed to achieve?"
            options={[
              "To test three different circuits in sequence",
              "To verify instrument function before and after the actual test",
              "To prove the circuit is safe three times",
              "To check the instrument's battery level"
            ]}
            correctIndex={1}
            explanation="The Prove-Test-Prove procedure verifies the instrument is working correctly before the test, performs the actual test, then confirms the instrument is still working afterwards. This ensures no false readings due to instrument failure."
          />

          {/* Section 3 — Calibration Requirements */}
          <section className="mb-6 sm:mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-amber-500 ">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-amber-600 dark:text-amber-400 mb-4 text-base">Calibration and Accuracy Standards</h3>
                  
                  <div className="space-y-4 text-xs sm:text-sm text-white">
                    <p><strong>Calibration certificates and documentation:</strong> Formal documentation proving the instrument meets accuracy standards within specified tolerance limits. Required for certification work and compliance with quality management systems. Certificates must show traceability to national standards through an unbroken chain of comparisons.</p>
                    
                    <p><strong>Calibration intervals and schedules:</strong> Typically 12 months for precision instruments used in electrical installation testing, though manufacturers may specify different periods based on usage patterns and environmental conditions. Heavy use or harsh environments may require more frequent calibration to maintain accuracy.</p>
                    
                    <p><strong>Tolerance limits and accuracy requirements:</strong> Instruments must read within specified accuracy bands (e.g., ±2% of reading ±2 digits for insulation resistance testers) to be considered reliable for professional use. These tolerances are defined by relevant standards such as BS EN 61557 for installation testers.</p>
                    
                    <p><strong>Calibration failure implications:</strong> Using instruments with expired calibration invalidates test results and may breach professional standards or insurance requirements. In some cases, uncalibrated instruments may still function but their readings cannot be trusted for compliance certification or safety assessments.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="calibration-frequency"
            question="How often should precision test instruments typically be calibrated?"
            options={["Every 6 months", "Annually", "Every 2 years", "Only when they appear inaccurate"]}
            correctIndex={1}
            explanation="Most precision test instruments used for electrical testing should be calibrated annually, though the exact interval may vary based on manufacturer recommendations and usage patterns."
          />

          {/* Section 4 — Safety Category Ratings */}
          <section className="mb-6 sm:mb-8">
            <div className="rounded-lg p-4 sm:p-6 border-l-4 border-l-red-500 ">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-red-600 dark:text-elec-yellow mb-4 text-base">Safety Category Ratings and Energy Withstand</h3>
                  
                  <div className="space-y-4 text-xs sm:text-sm text-white">
                    <p><strong>CAT II - Local level equipment:</strong> Designed for socket outlets, portable appliances, and similar loads. Maximum working voltage 300V to earth. Suitable for final circuit testing but not distribution systems. Limited transient energy withstand capability suitable for loads connected to the fixed installation.</p>
                    
                    <p><strong>CAT III - Distribution level systems:</strong> Required for fixed installations, distribution boards, and feeder circuits. Designed for higher energy transients that can occur in distribution systems. Essential for testing at consumer units, distribution boards, and fixed wiring systems where fault currents and switching transients are higher.</p>
                    
                    <p><strong>CAT IV - Primary supply level:</strong> Designed for overhead lines, underground cables, and service entrance equipment. Highest energy rating for utility supply systems. Required for testing at meter positions, service heads, and external supply systems where maximum fault energy is available.</p>
                    
                    <p><strong>Energy withstand and safety implications:</strong> Using a lower-rated instrument on a higher-energy system creates serious safety risks. Higher categories can safely handle greater transient energies that occur during switching operations, fault conditions, or lightning-induced surges. Insufficient category rating can result in instrument destruction and serious injury to the user.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="category-rating-selection"
            question="Which safety category rating is appropriate for testing at a distribution board?"
            options={["CAT I", "CAT II", "CAT III", "CAT IV"]}
            correctIndex={2}
            explanation="CAT III instruments are required for distribution level testing including distribution boards and fixed installations, as they can safely handle the higher energy transients present at this level."
          />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Practical Guidance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/20">
              <h3 className="font-semibold text-elec-yellow dark:text-elec-yellow mb-2 sm:mb-3">Before Testing</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Visual inspection of all equipment components</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Verify calibration certificates are current</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Check category rating matches test environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Test functionality with proving unit</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-amber-500/20">
              <h3 className="font-semibold text-amber-600 dark:text-amber-400 mb-2 sm:mb-3">During Testing</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Follow Prove-Test-Prove procedure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Handle instruments carefully and safely</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Monitor for unusual readings or behaviour</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Stop immediately if equipment behaves abnormally</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-green-500/20">
              <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2 sm:mb-3">After Testing</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Complete final proving check</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Store instruments safely and securely</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Report any faults or concerns immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Tag faulty equipment clearly out of service</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-World Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Real-World Examples</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-red-500/20">
              <h3 className="font-semibold text-red-600 dark:text-elec-yellow mb-2 sm:mb-3">Case Study: Instrument Failure Leads to Shock</h3>
              <p className="text-xs sm:text-xs sm:text-sm text-white leading-relaxed">
                On a commercial site, an electrician used a voltage indicator that had not been verified on a proving unit. It failed to register live voltage, and he mistakenly believed the circuit was safe. He received an electric shock, fortunately without serious injury. Investigation showed the instrument's internal fuse had blown months earlier, but because no checks were carried out, the fault went unnoticed.
              </p>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-green-500/20">
              <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2 sm:mb-3">Case Study: Proper Procedure Prevents Accident</h3>
              <p className="text-xs sm:text-xs sm:text-sm text-white leading-relaxed">
                In contrast, on another site, an apprentice followed the correct procedure. Before isolation testing, he proved his voltage indicator on a proving unit, confirmed the circuit was live, then rechecked after isolating to confirm it was dead. By doing so, he ensured there was no chance of a false reading. This method provided absolute confidence that the circuit was safe to work on.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">FAQs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h3 className="font-medium text-white mb-1">Why must instruments be checked before use?</h3>
                <p className="text-xs sm:text-sm text-white">To ensure they are safe and provide accurate readings.</p>
              </div>
              <div>
                <h3 className="font-medium text-white mb-1">What should be inspected visually?</h3>
                <p className="text-xs sm:text-sm text-white">The casing, leads, probes, and fuses.</p>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h3 className="font-medium text-white mb-1">How can accuracy be verified?</h3>
                <p className="text-xs sm:text-sm text-white">By testing the instrument against a proving unit or known supply.</p>
              </div>
              <div>
                <h3 className="font-medium text-white mb-1">What should be done if an instrument fails a check?</h3>
                <p className="text-xs sm:text-sm text-white">Remove it from service and report it immediately.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Recap</h2>
          <p className="text-sm sm:text-base text-white leading-relaxed">
            Checking instruments for safety and accuracy is a non-negotiable part of electrical testing. Visual checks confirm the integrity of casings, leads, and probes. Proving units or known supplies confirm instruments display correct readings. Calibration ensures accuracy over time, and instruments must always be category-rated for the system under test. Using unchecked or faulty instruments puts electricians and clients at risk. A disciplined checking routine ensures safe, reliable results every time.
          </p>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <Quiz questions={quizQuestions} title="Test Your Knowledge: Checking Instruments for Safety and Accuracy" />
        </Card>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center pt-4 sm:pt-6 border-t border-white/10">
          <Button variant="outline" className="text-sm" asChild>
            <Link to="../5-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Equipment Selection
            </Link>
          </Button>
          <Button className="text-sm" asChild>
            <Link to="../5-3">
              Next Section
              <span className="ml-2">→</span>
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module7Section5_2;