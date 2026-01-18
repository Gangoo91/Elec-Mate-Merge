import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module7Section5_2 = () => {
  useSEO(
    "Checking Instruments for Safety and Accuracy - Level 2 Module 7 Section 5.2",
    "Essential procedures for verifying test equipment safety and accuracy before use"
  );

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
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Section 5</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Title Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <Search className="w-4 h-4" />
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 7</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 5.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Checking Instruments for Safety and Accuracy
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
              Essential procedures for verifying test equipment safety and accuracy before use
            </p>
          </header>

          {/* In 30 Seconds Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white/80 space-y-1 text-sm">
              <li>• Visual inspection: casing, leads, probes, fuses</li>
              <li>• Prove functionality with proving unit or known supply</li>
              <li>• Check calibration certificates and dates</li>
              <li>• Verify category rating matches test environment</li>
            </ul>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <p className="text-white/80 leading-relaxed">
              Even the best test equipment is only useful if it is safe to use and provides accurate readings. Faulty or poorly maintained instruments can give misleading results, leading to unsafe conclusions, or worse, expose the user to electric shock. For apprentices, learning how to check equipment before use is just as important as learning how to operate it. Instruments must be inspected, proven safe, and verified for accuracy before any testing begins.
            </p>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <p className="text-white/80 mb-4">By the end of this subsection, you should be able to:</p>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">✓</span>
                <span>Explain why checking instruments is essential for safe electrical work</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">✓</span>
                <span>Describe the basic safety and accuracy checks to perform before use</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">✓</span>
                <span>Recognise what to do if an instrument fails inspection</span>
              </li>
            </ul>
          </section>

          {/* Section 1 — Visual Inspection */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Visual Inspection and GS38 Compliance
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-4">
              <div className="space-y-4 text-sm text-white/80">
                <p><strong className="text-white">Instrument casing integrity:</strong> Check for cracks, missing battery covers, damaged displays, or broken selector switches that could expose internal components. Any damage to the casing can compromise both safety and measurement accuracy. Look for signs of impact damage, overheating, or chemical corrosion.</p>

                <p><strong className="text-white">Test lead condition:</strong> Examine the entire length for cuts, kinks, or damage. Pay special attention to connection points where stress concentrates, particularly at the instrument and probe ends. Damaged insulation can expose conductors, creating shock risks.</p>

                <p><strong className="text-white">GS38 probe compliance:</strong> Probe tips must be shrouded to expose no more than 2mm of conductor. Finger guards and insulated shafts are mandatory for safety. Check that probe shrouds are intact and properly secured — loose or damaged shrouds defeat the safety protection.</p>

                <p><strong className="text-white">Internal fuse verification:</strong> Where accessible, verify fuses are the correct rating and type as specified by the manufacturer. Blown or incorrect fuses can render safety features ineffective or cause inaccurate readings.</p>
              </div>
            </div>

            <InlineCheck
              id="visual-inspection-gs38"
              question="According to GS38, what is the maximum amount of conductor that can be exposed on a probe tip?"
              options={["1mm", "2mm", "4mm", "6mm"]}
              correctIndex={1}
              explanation="GS38 specifies that probe tips must be shrouded to expose no more than 2mm of conductor to minimise the risk of accidental contact with live parts."
            />
          </section>

          {/* Section 2 — Proving Functionality */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Proving Functionality - The Prove-Test-Prove Method
            </h2>
            <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50 mb-4">
              <div className="space-y-4 text-sm text-white/80">
                <p><strong className="text-white">Proving units and their importance:</strong> Dedicated devices that generate known voltages to test instrument response. Essential for voltage indicators and non-contact testers. Proving units provide a controlled, safe means of verifying instrument operation without relying on live electrical systems.</p>

                <p><strong className="text-white">Known live supply verification:</strong> Using a confirmed live source to verify the instrument detects voltage correctly. This method requires certainty that the supply is indeed live — never assume a supply is live without independent verification.</p>

                <p><strong className="text-white">The Prove-Test-Prove sequence:</strong> Test the instrument on a known live source, perform the actual isolation test, then retest on the live source to confirm continued operation. This critical safety procedure ensures the instrument was working before testing and hasn't failed during the process.</p>

                <p><strong className="text-white">Continuity function verification:</strong> Test continuity function using a short test lead or known low-resistance path to ensure accurate readings. The instrument should display near-zero resistance, typically less than 0.01Ω, confirming the measurement circuit is functioning correctly.</p>
              </div>
            </div>

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
              explanation="The Prove-Test-Prove procedure verifies the instrument is working correctly before the test, performs the actual test, then confirms the instrument is still working afterwards."
            />
          </section>

          {/* Section 3 — Calibration Requirements */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Calibration and Accuracy Standards
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50 mb-4">
              <div className="space-y-4 text-sm text-white/80">
                <p><strong className="text-white">Calibration certificates and documentation:</strong> Formal documentation proving the instrument meets accuracy standards within specified tolerance limits. Required for certification work and compliance with quality management systems. Certificates must show traceability to national standards.</p>

                <p><strong className="text-white">Calibration intervals and schedules:</strong> Typically 12 months for precision instruments used in electrical installation testing, though manufacturers may specify different periods based on usage patterns. Heavy use or harsh environments may require more frequent calibration.</p>

                <p><strong className="text-white">Tolerance limits and accuracy requirements:</strong> Instruments must read within specified accuracy bands (e.g., ±2% of reading ±2 digits for insulation resistance testers) to be considered reliable for professional use. These tolerances are defined by relevant standards such as BS EN 61557.</p>

                <p><strong className="text-white">Calibration failure implications:</strong> Using instruments with expired calibration invalidates test results and may breach professional standards or insurance requirements. Uncalibrated instruments may still function but their readings cannot be trusted for compliance certification.</p>
              </div>
            </div>

            <InlineCheck
              id="calibration-frequency"
              question="How often should precision test instruments typically be calibrated?"
              options={["Every 6 months", "Annually", "Every 2 years", "Only when they appear inaccurate"]}
              correctIndex={1}
              explanation="Most precision test instruments used for electrical testing should be calibrated annually, though the exact interval may vary based on manufacturer recommendations and usage patterns."
            />
          </section>

          {/* Section 4 — Safety Category Ratings */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Safety Category Ratings and Energy Withstand
            </h2>
            <div className="p-4 rounded-lg bg-red-500/5 border-l-2 border-red-500/50 mb-4">
              <div className="space-y-4 text-sm text-white/80">
                <p><strong className="text-white">CAT II - Local level equipment:</strong> Designed for socket outlets, portable appliances, and similar loads. Maximum working voltage 300V to earth. Suitable for final circuit testing but not distribution systems.</p>

                <p><strong className="text-white">CAT III - Distribution level systems:</strong> Required for fixed installations, distribution boards, and feeder circuits. Designed for higher energy transients that can occur in distribution systems. Essential for testing at consumer units and fixed wiring systems.</p>

                <p><strong className="text-white">CAT IV - Primary supply level:</strong> Designed for overhead lines, underground cables, and service entrance equipment. Highest energy rating for utility supply systems. Required for testing at meter positions and service heads.</p>

                <p><strong className="text-white">Energy withstand and safety implications:</strong> Using a lower-rated instrument on a higher-energy system creates serious safety risks. Higher categories can safely handle greater transient energies during switching operations, fault conditions, or lightning-induced surges.</p>
              </div>
            </div>

            <InlineCheck
              id="category-rating-selection"
              question="Which safety category rating is appropriate for testing at a distribution board?"
              options={["CAT I", "CAT II", "CAT III", "CAT IV"]}
              correctIndex={2}
              explanation="CAT III instruments are required for distribution level testing including distribution boards and fixed installations, as they can safely handle the higher energy transients present at this level."
            />
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Practical Guidance
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h3 className="font-semibold text-elec-yellow mb-3">Before Testing</h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• Visual inspection of all equipment components</li>
                  <li>• Verify calibration certificates are current</li>
                  <li>• Check category rating matches test environment</li>
                  <li>• Test functionality with proving unit</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50">
                <h3 className="font-semibold text-amber-400 mb-3">During Testing</h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• Follow Prove-Test-Prove procedure</li>
                  <li>• Handle instruments carefully and safely</li>
                  <li>• Monitor for unusual readings or behaviour</li>
                  <li>• Stop immediately if equipment behaves abnormally</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <h3 className="font-semibold text-green-400 mb-3">After Testing</h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• Complete final proving check</li>
                  <li>• Store instruments safely and securely</li>
                  <li>• Report any faults or concerns immediately</li>
                  <li>• Tag faulty equipment clearly out of service</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Examples */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Real-World Examples
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-red-500/5 border-l-2 border-red-500/50">
                <h3 className="font-semibold text-red-400 mb-3">Case Study: Instrument Failure Leads to Shock</h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  On a commercial site, an electrician used a voltage indicator that had not been verified on a proving unit. It failed to register live voltage, and he mistakenly believed the circuit was safe. He received an electric shock. Investigation showed the instrument's internal fuse had blown months earlier, but because no checks were carried out, the fault went unnoticed.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <h3 className="font-semibold text-green-400 mb-3">Case Study: Proper Procedure Prevents Accident</h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  On another site, an apprentice followed the correct procedure. Before isolation testing, he proved his voltage indicator on a proving unit, confirmed the circuit was live, then rechecked after isolating to confirm it was dead. By doing so, he ensured there was no chance of a false reading. This method provided absolute confidence that the circuit was safe.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-card/30 border border-white/10">
                  <p className="font-medium text-white mb-2">Why must instruments be checked before use?</p>
                  <p className="text-sm text-white/70">To ensure they are safe and provide accurate readings.</p>
                </div>
                <div className="p-4 rounded-lg bg-card/30 border border-white/10">
                  <p className="font-medium text-white mb-2">What should be inspected visually?</p>
                  <p className="text-sm text-white/70">The casing, leads, probes, and fuses.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-card/30 border border-white/10">
                  <p className="font-medium text-white mb-2">How can accuracy be verified?</p>
                  <p className="text-sm text-white/70">By testing the instrument against a proving unit or known supply.</p>
                </div>
                <div className="p-4 rounded-lg bg-card/30 border border-white/10">
                  <p className="font-medium text-white mb-2">What should be done if an instrument fails a check?</p>
                  <p className="text-sm text-white/70">Remove it from service and report it immediately.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Recap
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-white/80 leading-relaxed">
                Checking instruments for safety and accuracy is a non-negotiable part of electrical testing. Visual checks confirm the integrity of casings, leads, and probes. Proving units or known supplies confirm instruments display correct readings. Calibration ensures accuracy over time, and instruments must always be category-rated for the system under test. Using unchecked or faulty instruments puts electricians and clients at risk. A disciplined checking routine ensures safe, reliable results every time.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={quizQuestions} title="Test Your Knowledge: Checking Instruments for Safety and Accuracy" />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Equipment Selection
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-3">
                Next: GS38 Testing
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module7Section5_2;
