import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Test Equipment and Calibration - Inspection & Testing";
const DESCRIPTION = "Learn about essential test instruments for electrical inspection and testing, including multifunction testers, calibration requirements, and pre-test checks.";

const quickCheckQuestions = [
  {
    id: "calibration-interval",
    question: "What is the recommended maximum calibration interval for multifunction testers?",
    options: ["6 months", "12 months", "24 months", "5 years"],
    correctIndex: 1,
    explanation: "Most instrument manufacturers and calibration bodies recommend annual (12 month) calibration for multifunction testers used in professional testing."
  },
  {
    id: "gs38-guidance",
    question: "What document provides guidance on the selection and use of test equipment?",
    options: ["BS 7671 Part 3", "GS38", "COSHH Regulations", "EAW Regulation 16"],
    correctIndex: 1,
    explanation: "GS38 (Electrical test equipment for use on low voltage electrical systems) provides HSE guidance on selecting and using test equipment safely."
  },
  {
    id: "prove-test-prove",
    question: "Before using a voltage indicator, you should:",
    options: ["Just switch it on", "Prove it works on a known live source, test, then re-prove", "Only test the batteries", "Clean the probes only"],
    correctIndex: 1,
    explanation: "The prove-test-prove method ensures the voltage indicator is working correctly before and after use, confirming reliable results."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is NOT a function of a typical multifunction tester?",
    options: ["Insulation resistance testing", "Earth fault loop impedance testing", "Thermal imaging", "RCD trip time testing"],
    correctAnswer: 2,
    explanation: "Thermal imaging requires a separate thermal camera. Multifunction testers typically cover continuity, insulation, loop impedance, RCD, and related tests."
  },
  {
    id: 2,
    question: "What test voltage is typically used for insulation resistance testing on 230V circuits?",
    options: ["250V DC", "500V DC", "1000V DC", "230V AC"],
    correctAnswer: 1,
    explanation: "For circuits up to 500V, including standard 230V circuits, a 500V DC test voltage is used for insulation resistance testing."
  },
  {
    id: 3,
    question: "A calibration certificate should be traceable to:",
    options: ["The manufacturer only", "Any testing laboratory", "National standards (UKAS)", "The installer"],
    correctAnswer: 2,
    explanation: "Calibration should be traceable to national standards through UKAS (United Kingdom Accreditation Service) accredited laboratories."
  },
  {
    id: 4,
    question: "What is the purpose of a proving unit?",
    options: ["To charge test equipment", "To provide a known voltage source for testing voltage indicators", "To calibrate multimeters", "To test RCDs"],
    correctAnswer: 1,
    explanation: "A proving unit provides a known voltage (typically 230V or higher) to verify that voltage indicators are functioning correctly."
  },
  {
    id: 5,
    question: "GS38 recommends that test probes should have:",
    options: ["Long exposed metal tips", "Maximum 4mm exposed tip with finger guards", "No finger guards required", "Exposed metal only"],
    correctAnswer: 1,
    explanation: "GS38 recommends test probes with a maximum 4mm exposed tip and finger guards to prevent accidental contact with live parts."
  },
  {
    id: 6,
    question: "What does CAT III rating on a meter indicate?",
    options: ["It's suitable for low voltage only", "It's suitable for distribution level testing", "It's only for domestic use", "It cannot be used on live circuits"],
    correctAnswer: 1,
    explanation: "CAT III (Category III) indicates suitability for distribution level - fixed installations, distribution boards, and similar."
  },
  {
    id: 7,
    question: "Which of these should be checked before using a multifunction tester?",
    options: ["Battery condition only", "Lead condition and battery", "Nothing - just switch it on", "Calibration date, battery, lead condition, and zero check"],
    correctAnswer: 3,
    explanation: "Pre-use checks should include calibration validity, battery condition, test lead condition, and appropriate zeroing where applicable."
  },
  {
    id: 8,
    question: "The uncertainty of a measurement refers to:",
    options: ["The tester being broken", "The range of values within which the true value lies", "The tester needing calibration", "The wrong test being selected"],
    correctAnswer: 1,
    explanation: "Measurement uncertainty is the range within which the true value probably lies. All measurements have some uncertainty which must be considered."
  },
  {
    id: 9,
    question: "When should you NOT use a multifunction tester?",
    options: ["In dry conditions", "When it's within calibration", "When leads are damaged", "When batteries are fully charged"],
    correctAnswer: 2,
    explanation: "Damaged test leads can give incorrect readings and pose a safety hazard. Never use equipment with damaged leads."
  },
  {
    id: 10,
    question: "What is the minimum IP rating recommended for test equipment used outdoors?",
    options: ["IP00", "IP20", "IP40", "IP54 or higher"],
    correctAnswer: 3,
    explanation: "IP54 or higher provides protection against dust and water splashes, suitable for outdoor or construction site use."
  }
];

const faqs = [
  {
    question: "How often should test equipment be calibrated?",
    answer: "Most manufacturers recommend annual calibration for multifunction testers. However, if the instrument is heavily used, damaged, or you suspect it's reading incorrectly, it should be calibrated sooner. Keep calibration certificates and check dates before each use."
  },
  {
    question: "Can I calibrate my own test equipment?",
    answer: "For professional use, calibration should be performed by a UKAS accredited laboratory or the equipment manufacturer. Self-checking against reference instruments is good practice but doesn't replace formal calibration."
  },
  {
    question: "What's the difference between verification and calibration?",
    answer: "Verification checks that an instrument reads within acceptable limits. Calibration adjusts the instrument to read correctly and provides a certificate of accuracy. Verification can be done in-house; calibration should be done by accredited laboratories."
  },
  {
    question: "Do I need separate instruments for each test?",
    answer: "No - modern multifunction testers combine all required tests in one instrument. However, you may still need a separate voltage indicator (two-pole tester) for safe isolation verification, and possibly a clamp meter for current measurements."
  },
  {
    question: "What should I do if my test equipment fails during a job?",
    answer: "Stop testing immediately. Do not rely on readings from faulty equipment. Either use backup equipment or postpone testing until the equipment is repaired/replaced. Never guess or estimate test results."
  },
  {
    question: "Are budget test instruments acceptable?",
    answer: "Instruments must meet the accuracy requirements for the tests being performed. Budget instruments from reputable manufacturers can be suitable if they meet specifications. Avoid unbranded equipment without proper certification or calibration traceability."
  }
];

const referenceItems = [
  { label: "GS38", value: "HSE guidance on test equipment" },
  { label: "Calibration", value: "12 months typical" },
  { label: "IR test voltage", value: "500V DC for 230V circuits" },
  { label: "CAT III", value: "Distribution level" },
  { label: "CAT IV", value: "Origin/utility level" },
  { label: "Probe exposure", value: "4mm maximum (GS38)" },
  { label: "UKAS", value: "UK Accreditation Service" },
  { label: "Proving unit", value: "Verify voltage indicators" },
  { label: "Continuity test", value: "Low ohms range (<1Ω)" },
];

const InspectionTestingModule1Section3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Test Equipment and Calibration
          </h1>
          <p className="text-white/80">
            Understanding the instruments used for electrical testing
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>MFT:</strong> Multifunction tester - one instrument for all tests</li>
              <li><strong>Calibration:</strong> Annual by UKAS accredited laboratory</li>
              <li><strong>Pre-checks:</strong> Essential for reliable results</li>
              <li><strong>Prove-test-prove:</strong> Critical safety procedure</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Standards</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>GS38:</strong> HSE test equipment guidance</li>
              <li><strong>CAT III:</strong> Distribution level rating</li>
              <li><strong>4mm max:</strong> Probe tip exposure</li>
              <li><strong>UKAS:</strong> Calibration accreditation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify essential test instruments for I&T",
              "Understand multifunction tester capabilities",
              "Explain calibration requirements and intervals",
              "Describe pre-test instrument checks",
              "Understand instrument accuracy requirements",
              "Select appropriate instruments for specific tests"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01: Essential Test Instruments */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Essential Test Instruments
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical inspection and testing requires specific instruments capable of performing all tests required by BS 7671. The main instruments are:
            </p>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">Multifunction Tester</p>
                <p className="text-sm text-white/70">The primary instrument - combines continuity, insulation, loop impedance, RCD, and other tests</p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">Voltage Indicator</p>
                <p className="text-sm text-white/70">Two-pole tester for safe isolation verification - essential safety equipment</p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">Insulation Resistance Tester</p>
                <p className="text-sm text-white/70">Dedicated high-voltage DC tester for insulation testing (often part of MFT)</p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-1">Proving Unit</p>
                <p className="text-sm text-white/70">Provides known voltage source to verify voltage indicators work correctly</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Additional Useful Instruments</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Clamp meter:</strong> For measuring current without disconnecting conductors</li>
                <li><strong>Socket tester:</strong> Quick check for polarity and basic faults (not a substitute for proper testing)</li>
                <li><strong>Phase rotation meter:</strong> For three-phase installations</li>
                <li><strong>Earth electrode tester:</strong> For TT systems requiring earth electrode testing</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 02: Multifunction Testers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Multifunction Testers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The <strong>multifunction tester (MFT)</strong> is the essential tool for electrical testing. Modern MFTs combine all required tests in one portable instrument.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard MFT Capabilities</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-white">Test</th>
                      <th className="text-right py-2 text-elec-yellow">Typical Range</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/5">
                      <td className="py-2">Continuity (low ohms)</td>
                      <td className="text-right">0.01Ω - 2000Ω</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Insulation resistance</td>
                      <td className="text-right">250V, 500V, 1000V DC</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Earth fault loop impedance</td>
                      <td className="text-right">0.01Ω - 2000Ω</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Prospective fault current</td>
                      <td className="text-right">Up to 20kA typical</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">RCD trip time</td>
                      <td className="text-right">×0.5, ×1, ×5 test currents</td>
                    </tr>
                    <tr>
                      <td className="py-2">Polarity</td>
                      <td className="text-right">Phase rotation check</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Popular Manufacturers</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="text-center">
                  <p className="text-white font-semibold text-sm">Megger</p>
                  <p className="text-xs text-white/50">MFT series</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold text-sm">Fluke</p>
                  <p className="text-xs text-white/50">1660 series</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold text-sm">Metrel</p>
                  <p className="text-xs text-white/50">Eurotest series</p>
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold text-sm">Kewtech</p>
                  <p className="text-xs text-white/50">KT series</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Calibration Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Calibration Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Calibration ensures test instruments provide accurate, reliable readings. Without proper calibration, test results cannot be trusted.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why Calibration Matters</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Ensures measurements are accurate and reliable</li>
                <li>Provides traceability to national standards</li>
                <li>Demonstrates compliance with quality standards</li>
                <li>Protects against liability from incorrect results</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">UKAS Accreditation</p>
              <p className="text-sm text-white/80">
                <strong>UKAS</strong> (United Kingdom Accreditation Service) is the national accreditation body. UKAS accredited calibration provides:
              </p>
              <ul className="text-sm text-white space-y-1 ml-4 mt-2">
                <li>Traceable measurements to national standards</li>
                <li>Known measurement uncertainty</li>
                <li>Internationally recognised certification</li>
                <li>Independent verification of calibration laboratory competence</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 my-6">
              <p className="text-white font-semibold">Recommended: 12 months</p>
              <p className="text-sm text-white/80 mt-1">More frequent if heavily used, damaged, or readings suspected to be incorrect</p>
            </div>
          </div>
        </section>

        {/* Section 04: Pre-Test Checks */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Pre-Test Checks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Before using any test instrument, pre-test checks ensure the equipment is safe and will provide accurate results.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Test Checklist</p>
              <ol className="text-sm text-white space-y-2 ml-4">
                <li><span className="text-elec-yellow">1.</span> <strong>Check calibration date</strong> - Verify certificate is current</li>
                <li><span className="text-elec-yellow">2.</span> <strong>Inspect test leads</strong> - Check for damage, cracked insulation, secure connections</li>
                <li><span className="text-elec-yellow">3.</span> <strong>Check battery level</strong> - Ensure adequate charge for testing</li>
                <li><span className="text-elec-yellow">4.</span> <strong>Zero/null test leads</strong> - On continuity range, short leads and check zero</li>
                <li><span className="text-elec-yellow">5.</span> <strong>Check instrument function</strong> - Verify all required tests are working</li>
              </ol>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 my-6">
              <p className="text-white font-semibold mb-2">Prove-Test-Prove for Voltage Indicators</p>
              <p className="text-sm text-white/80 mb-2">Critical Safety Procedure:</p>
              <ol className="text-sm text-white/80 space-y-1 ml-4">
                <li>1. <strong>PROVE</strong> the indicator works on a known live source (proving unit)</li>
                <li>2. <strong>TEST</strong> the circuit to confirm dead</li>
                <li>3. <strong>PROVE</strong> the indicator still works on the known live source</li>
              </ol>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Accuracy and Uncertainty */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Accuracy and Uncertainty
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              All measurements have some degree of <strong>uncertainty</strong> - the range within which the true value lies. Understanding this is important when comparing results to limits.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Measurement Uncertainty</p>
              <p className="text-sm text-white/80">
                When a tester displays 0.45Ω for a loop impedance, the true value might be anywhere within a range (e.g., 0.42Ω to 0.48Ω) depending on the instrument's accuracy specification.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Example: Comparing to Maximum Zs</p>
              <p className="text-sm text-white/80">
                If the maximum Zs for a circuit is 1.44Ω and your reading is 1.40Ω, you need to consider uncertainty. With ±5% accuracy, the true value could be up to 1.47Ω - potentially exceeding the limit.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The 80% Rule</p>
              <p className="text-sm text-white/80">
                GN3 recommends using <strong className="text-elec-yellow">80% of the maximum permitted value</strong> as the comparison point during testing. This provides a safety margin for:
              </p>
              <ul className="text-sm text-white space-y-1 ml-4 mt-2">
                <li>Instrument accuracy/uncertainty</li>
                <li>Temperature variations affecting conductor resistance</li>
                <li>Changes over time as connections age</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 06: Instrument Selection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Instrument Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting the right instrument for the task involves matching capabilities to requirements and ensuring safety.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Categories (CAT Ratings)</p>
              <div className="space-y-3">
                <div>
                  <p className="text-elec-yellow font-semibold text-sm">CAT IV - Utility Origin</p>
                  <p className="text-sm text-white/70">Connection between utility and service entrance. Highest transient overvoltages.</p>
                </div>
                <div>
                  <p className="text-elec-yellow font-semibold text-sm">CAT III - Distribution</p>
                  <p className="text-sm text-white/70">Fixed installation distribution boards. Suitable for most electrical testing work.</p>
                </div>
                <div>
                  <p className="text-elec-yellow font-semibold text-sm">CAT II - Local Level</p>
                  <p className="text-sm text-white/70">Appliance level, portable equipment. Lower transient energy.</p>
                </div>
                <div>
                  <p className="text-elec-yellow font-semibold text-sm">CAT I - Protected Electronic</p>
                  <p className="text-sm text-white/70">Signal level electronics. Not suitable for mains voltage testing.</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-orange-400/90">
              <strong>Note:</strong> For electrical installation testing, use instruments rated <strong>CAT III 300V minimum</strong>, preferably <strong>CAT III 600V or CAT IV 300V</strong> for consumer unit and origin testing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">GS38 Requirements</p>
              <p className="text-sm text-white/80">HSE Guidance Note GS38 specifies requirements for test equipment:</p>
              <ul className="text-sm text-white space-y-1 ml-4 mt-2">
                <li>Test probes with maximum <strong>4mm exposed tip</strong></li>
                <li>Finger guards to prevent accidental contact</li>
                <li>Fused test leads where appropriate</li>
                <li>Suitable insulation for working voltages</li>
                <li>Clear markings and ratings</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Equipment Care</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Store instruments in protective cases when not in use</li>
                <li>Keep test leads neatly coiled to prevent damage</li>
                <li>Avoid dropping or subjecting to mechanical shock</li>
                <li>Keep clean and dry - avoid exposure to moisture</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Issues</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Low batteries causing inaccurate readings</li>
                <li>Damaged test lead insulation creating hazards</li>
                <li>Out-of-date calibration invalidating results</li>
                <li>Wrong test lead resistance not nulled on continuity</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Best Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always prove-test-prove when checking for dead</li>
                <li>Record the instrument serial number on test sheets</li>
                <li>Keep calibration certificates readily available</li>
                <li>Have backup equipment available for critical work</li>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Reference Card */}
        <section className="mb-10">
          <UnitsPocketCard
            title="Test Equipment Reference"
            items={referenceItems}
          />
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
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-1/section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-1/section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule1Section3;
