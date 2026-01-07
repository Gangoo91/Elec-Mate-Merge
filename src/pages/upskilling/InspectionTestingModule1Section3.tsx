import { ArrowLeft, Wrench, Clock, CheckCircle, AlertTriangle, HelpCircle, ChevronRight, ChevronLeft, Gauge, Settings, Calendar, Shield, Zap, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import UnitsPocketCard from '@/components/apprentice-courses/UnitsPocketCard';
import useSEO from '@/hooks/useSEO';

const TITLE = "Test Equipment and Calibration - Inspection & Testing";
const DESCRIPTION = "Learn about essential test instruments for electrical inspection and testing, including multifunction testers, calibration requirements, and pre-test checks.";

const quickCheckQuestions = [
  {
    question: "What is the recommended maximum calibration interval for multifunction testers?",
    options: ["6 months", "12 months", "24 months", "5 years"],
    correctAnswer: 1,
    explanation: "Most instrument manufacturers and calibration bodies recommend annual (12 month) calibration for multifunction testers used in professional testing."
  },
  {
    question: "What document provides guidance on the selection and use of test equipment?",
    options: ["BS 7671 Part 3", "GS38", "COSHH Regulations", "EAW Regulation 16"],
    correctAnswer: 1,
    explanation: "GS38 (Electrical test equipment for use on low voltage electrical systems) provides HSE guidance on selecting and using test equipment safely."
  },
  {
    question: "Before using a voltage indicator, you should:",
    options: ["Just switch it on", "Prove it works on a known live source, test, then re-prove", "Only test the batteries", "Clean the probes only"],
    correctAnswer: 1,
    explanation: "The prove-test-prove method ensures the voltage indicator is working correctly before and after use, confirming reliable results."
  }
];

const quizQuestions = [
  {
    question: "Which of the following is NOT a function of a typical multifunction tester?",
    options: ["Insulation resistance testing", "Earth fault loop impedance testing", "Thermal imaging", "RCD trip time testing"],
    correctAnswer: 2,
    explanation: "Thermal imaging requires a separate thermal camera. Multifunction testers typically cover continuity, insulation, loop impedance, RCD, and related tests."
  },
  {
    question: "What test voltage is typically used for insulation resistance testing on 230V circuits?",
    options: ["250V DC", "500V DC", "1000V DC", "230V AC"],
    correctAnswer: 1,
    explanation: "For circuits up to 500V, including standard 230V circuits, a 500V DC test voltage is used for insulation resistance testing."
  },
  {
    question: "A calibration certificate should be traceable to:",
    options: ["The manufacturer only", "Any testing laboratory", "National standards (UKAS)", "The installer"],
    correctAnswer: 2,
    explanation: "Calibration should be traceable to national standards through UKAS (United Kingdom Accreditation Service) accredited laboratories."
  },
  {
    question: "What is the purpose of a proving unit?",
    options: ["To charge test equipment", "To provide a known voltage source for testing voltage indicators", "To calibrate multimeters", "To test RCDs"],
    correctAnswer: 1,
    explanation: "A proving unit provides a known voltage (typically 230V or higher) to verify that voltage indicators are functioning correctly."
  },
  {
    question: "GS38 recommends that test probes should have:",
    options: ["Long exposed metal tips", "Maximum 4mm exposed tip with finger guards", "No finger guards required", "Exposed metal only"],
    correctAnswer: 1,
    explanation: "GS38 recommends test probes with a maximum 4mm exposed tip and finger guards to prevent accidental contact with live parts."
  },
  {
    question: "What does CAT III rating on a meter indicate?",
    options: ["It's suitable for low voltage only", "It's suitable for distribution level testing", "It's only for domestic use", "It cannot be used on live circuits"],
    correctAnswer: 1,
    explanation: "CAT III (Category III) indicates suitability for distribution level - fixed installations, distribution boards, and similar."
  },
  {
    question: "Which of these should be checked before using a multifunction tester?",
    options: ["Battery condition only", "Lead condition and battery", "Nothing - just switch it on", "Calibration date, battery, lead condition, and zero check"],
    correctAnswer: 3,
    explanation: "Pre-use checks should include calibration validity, battery condition, test lead condition, and appropriate zeroing where applicable."
  },
  {
    question: "The uncertainty of a measurement refers to:",
    options: ["The tester being broken", "The range of values within which the true value lies", "The tester needing calibration", "The wrong test being selected"],
    correctAnswer: 1,
    explanation: "Measurement uncertainty is the range within which the true value probably lies. All measurements have some uncertainty which must be considered."
  },
  {
    question: "When should you NOT use a multifunction tester?",
    options: ["In dry conditions", "When it's within calibration", "When leads are damaged", "When batteries are fully charged"],
    correctAnswer: 2,
    explanation: "Damaged test leads can give incorrect readings and pose a safety hazard. Never use equipment with damaged leads."
  },
  {
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
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* iOS-style Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center h-[56px] px-4 max-w-4xl mx-auto">
          <Button variant="ios-ghost" size="ios-small" asChild className="gap-1">
            <Link to="../module1">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Module 1</span>
            </Link>
          </Button>
          <span className="flex-1 text-center text-[17px] font-semibold text-white">Section 3</span>
          <div className="w-[60px]" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20">
            <Wrench className="h-7 w-7 text-elec-yellow" />
          </div>
          <span className="text-[11px] font-medium text-elec-yellow uppercase tracking-wide">
            Module 1 • Section 3
          </span>
        </div>
        <h1 className="text-[34px] leading-[41px] font-bold text-white tracking-tight mb-3">
          Test Equipment and Calibration
        </h1>
        <p className="text-[17px] text-white/70 leading-relaxed">
          Understanding the instruments used for electrical testing, their capabilities, calibration requirements, and proper use.
        </p>
      </section>

      {/* In 30 Seconds */}
      <section className="px-4 pb-6 max-w-4xl mx-auto">
        <Card variant="ios-elevated" className="border-elec-yellow/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-[17px] font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-elec-yellow" />
              In 30 Seconds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Modern multifunction testers combine all required tests in one instrument</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Annual calibration by UKAS accredited laboratories ensures accuracy</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
              <p className="text-[15px] text-white/80">Pre-test checks including prove-test-prove are essential for reliable results</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Learning Outcomes */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <h2 className="text-[22px] font-semibold text-white mb-4">Learning Outcomes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Identify essential test instruments for I&T",
            "Understand multifunction tester capabilities",
            "Explain calibration requirements and intervals",
            "Describe pre-test instrument checks",
            "Understand instrument accuracy requirements",
            "Select appropriate instruments for specific tests"
          ].map((outcome, i) => (
            <Card key={i} variant="ios" className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-elec-yellow/10 flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-elec-yellow" />
                </div>
                <p className="text-[15px] text-white/80">{outcome}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Content Section 01 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">01</span>
          <h2 className="text-[22px] font-semibold text-white">Essential Test Instruments</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              Electrical inspection and testing requires specific instruments capable of performing all tests required by BS 7671. The main instruments are:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <Gauge className="h-6 w-6 text-elec-yellow mb-2" />
                <p className="text-white font-semibold">Multifunction Tester</p>
                <p className="text-[13px] text-white/60 mt-1">The primary instrument - combines continuity, insulation, loop impedance, RCD, and other tests</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <Zap className="h-6 w-6 text-elec-yellow mb-2" />
                <p className="text-white font-semibold">Voltage Indicator</p>
                <p className="text-[13px] text-white/60 mt-1">Two-pole tester for safe isolation verification - essential safety equipment</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <Activity className="h-6 w-6 text-elec-yellow mb-2" />
                <p className="text-white font-semibold">Insulation Resistance Tester</p>
                <p className="text-[13px] text-white/60 mt-1">Dedicated high-voltage DC tester for insulation testing (often part of MFT)</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <Settings className="h-6 w-6 text-elec-yellow mb-2" />
                <p className="text-white font-semibold">Proving Unit</p>
                <p className="text-[13px] text-white/60 mt-1">Provides known voltage source to verify voltage indicators work correctly</p>
              </div>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Additional Useful Instruments</h3>
            <ul className="space-y-2 ml-4">
              <li>• <strong className="text-white">Clamp meter:</strong> For measuring current without disconnecting conductors</li>
              <li>• <strong className="text-white">Socket tester:</strong> Quick check for polarity and basic faults (not a substitute for proper testing)</li>
              <li>• <strong className="text-white">Phase rotation meter:</strong> For three-phase installations</li>
              <li>• <strong className="text-white">Earth electrode tester:</strong> For TT systems requiring earth electrode testing</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* Content Section 02 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">02</span>
          <h2 className="text-[22px] font-semibold text-white">Multifunction Testers</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              The <strong className="text-white">multifunction tester (MFT)</strong> is the essential tool for electrical testing. Modern MFTs combine all required tests in one portable instrument.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Standard MFT Capabilities</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-[14px]">
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

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Popular Manufacturers</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white/5 rounded-xl p-3 border border-white/10 text-center">
                <p className="text-white font-semibold">Megger</p>
                <p className="text-[12px] text-white/50">MFT series</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/10 text-center">
                <p className="text-white font-semibold">Fluke</p>
                <p className="text-[12px] text-white/50">1660 series</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/10 text-center">
                <p className="text-white font-semibold">Metrel</p>
                <p className="text-[12px] text-white/50">Eurotest series</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/10 text-center">
                <p className="text-white font-semibold">Kewtech</p>
                <p className="text-[12px] text-white/50">KT series</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* InlineCheck 1 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <InlineCheck question={quickCheckQuestions[0]} />
      </section>

      {/* Content Section 03 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">03</span>
          <h2 className="text-[22px] font-semibold text-white">Calibration Requirements</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              Calibration ensures test instruments provide accurate, reliable readings. Without proper calibration, test results cannot be trusted.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Why Calibration Matters</h3>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Ensures measurements are accurate and reliable</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Provides traceability to national standards</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Demonstrates compliance with quality standards</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Protects against liability from incorrect results</span>
              </li>
            </ul>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">UKAS Accreditation</h3>
            <p>
              <strong className="text-white">UKAS</strong> (United Kingdom Accreditation Service) is the national accreditation body. UKAS accredited calibration provides:
            </p>
            <ul className="space-y-2 ml-4 mt-2">
              <li>• Traceable measurements to national standards</li>
              <li>• Known measurement uncertainty</li>
              <li>• Internationally recognised certification</li>
              <li>• Independent verification of calibration laboratory competence</li>
            </ul>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Calibration Intervals</h3>
            <div className="bg-elec-yellow/10 rounded-xl p-4 border border-elec-yellow/20">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-elec-yellow" />
                <div>
                  <p className="text-white font-semibold">Recommended: 12 months</p>
                  <p className="text-[14px] text-white/80">More frequent if heavily used, damaged, or readings suspected to be incorrect</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Content Section 04 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">04</span>
          <h2 className="text-[22px] font-semibold text-white">Pre-Test Checks</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              Before using any test instrument, pre-test checks ensure the equipment is safe and will provide accurate results.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Pre-Test Checklist</h3>
            <ol className="space-y-3 ml-4">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-[13px] font-bold flex-shrink-0">1</span>
                <span><strong className="text-white">Check calibration date</strong> - Verify certificate is current</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-[13px] font-bold flex-shrink-0">2</span>
                <span><strong className="text-white">Inspect test leads</strong> - Check for damage, cracked insulation, secure connections</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-[13px] font-bold flex-shrink-0">3</span>
                <span><strong className="text-white">Check battery level</strong> - Ensure adequate charge for testing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-[13px] font-bold flex-shrink-0">4</span>
                <span><strong className="text-white">Zero/null test leads</strong> - On continuity range, short leads and check zero</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-[13px] font-bold flex-shrink-0">5</span>
                <span><strong className="text-white">Check instrument function</strong> - Verify all required tests are working</span>
              </li>
            </ol>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Prove-Test-Prove for Voltage Indicators</h3>
            <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Critical Safety Procedure</p>
                  <ol className="text-[14px] text-white/80 mt-2 space-y-1">
                    <li>1. <strong>PROVE</strong> the indicator works on a known live source (proving unit)</li>
                    <li>2. <strong>TEST</strong> the circuit to confirm dead</li>
                    <li>3. <strong>PROVE</strong> the indicator still works on the known live source</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* InlineCheck 2 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <InlineCheck question={quickCheckQuestions[1]} />
      </section>

      {/* Content Section 05 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">05</span>
          <h2 className="text-[22px] font-semibold text-white">Accuracy and Uncertainty</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              All measurements have some degree of <strong className="text-white">uncertainty</strong> - the range within which the true value lies. Understanding this is important when comparing results to limits.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Measurement Uncertainty</h3>
            <p>
              When a tester displays 0.45Ω for a loop impedance, the true value might be anywhere within a range (e.g., 0.42Ω to 0.48Ω) depending on the instrument's accuracy specification.
            </p>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10 mt-4">
              <p className="text-white font-semibold mb-2">Example: Comparing to Maximum Zs</p>
              <p className="text-white/80">
                If the maximum Zs for a circuit is 1.44Ω and your reading is 1.40Ω, you need to consider uncertainty. With ±5% accuracy, the true value could be up to 1.47Ω - potentially exceeding the limit.
              </p>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">The 80% Rule</h3>
            <p>
              GN3 recommends using <strong className="text-elec-yellow">80% of the maximum permitted value</strong> as the comparison point during testing. This provides a safety margin for:
            </p>
            <ul className="space-y-2 ml-4 mt-2">
              <li>• Instrument accuracy/uncertainty</li>
              <li>• Temperature variations affecting conductor resistance</li>
              <li>• Changes over time as connections age</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* Content Section 06 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[48px] font-bold text-elec-yellow/20">06</span>
          <h2 className="text-[22px] font-semibold text-white">Instrument Selection</h2>
        </div>
        <Card variant="ios" className="p-5">
          <div className="space-y-4 text-[15px] text-white/80 leading-relaxed">
            <p>
              Selecting the right instrument for the task involves matching capabilities to requirements and ensuring safety.
            </p>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">Safety Categories (CAT Ratings)</h3>
            <div className="space-y-3">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-elec-yellow font-semibold">CAT IV - Utility Origin</p>
                <p className="text-[14px] text-white/80">Connection between utility and service entrance. Highest transient overvoltages.</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-elec-yellow font-semibold">CAT III - Distribution</p>
                <p className="text-[14px] text-white/80">Fixed installation distribution boards. Suitable for most electrical testing work.</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-elec-yellow font-semibold">CAT II - Local Level</p>
                <p className="text-[14px] text-white/80">Appliance level, portable equipment. Lower transient energy.</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-elec-yellow font-semibold">CAT I - Protected Electronic</p>
                <p className="text-[14px] text-white/80">Signal level electronics. Not suitable for mains voltage testing.</p>
              </div>
            </div>

            <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20 mt-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <p className="text-white/80">
                  For electrical installation testing, use instruments rated <strong className="text-white">CAT III 300V minimum</strong>, preferably <strong className="text-white">CAT III 600V or CAT IV 300V</strong> for consumer unit and origin testing.
                </p>
              </div>
            </div>

            <h3 className="text-[17px] font-semibold text-white mt-6 mb-3">GS38 Requirements</h3>
            <p>
              HSE Guidance Note GS38 specifies requirements for test equipment:
            </p>
            <ul className="space-y-2 ml-4 mt-2">
              <li>• Test probes with maximum <strong className="text-white">4mm exposed tip</strong></li>
              <li>• Finger guards to prevent accidental contact</li>
              <li>• Fused test leads where appropriate</li>
              <li>• Suitable insulation for working voltages</li>
              <li>• Clear markings and ratings</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* InlineCheck 3 */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <InlineCheck question={quickCheckQuestions[2]} />
      </section>

      {/* Practical Guidance */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <Card variant="ios-elevated" className="border-elec-yellow/20">
          <CardHeader>
            <CardTitle className="text-[17px] font-semibold flex items-center gap-2">
              <Wrench className="h-5 w-5 text-elec-yellow" />
              Practical Guidance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-white font-semibold mb-2">Equipment Care</h4>
              <ul className="space-y-2 text-[15px] text-white/80">
                <li>• Store instruments in protective cases when not in use</li>
                <li>• Keep test leads neatly coiled to prevent damage</li>
                <li>• Avoid dropping or subjecting to mechanical shock</li>
                <li>• Keep clean and dry - avoid exposure to moisture</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Common Issues</h4>
              <ul className="space-y-2 text-[15px] text-white/80">
                <li>• Low batteries causing inaccurate readings</li>
                <li>• Damaged test lead insulation creating hazards</li>
                <li>• Out-of-date calibration invalidating results</li>
                <li>• Wrong test lead resistance not nulled on continuity</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Best Practice</h4>
              <ul className="space-y-2 text-[15px] text-white/80">
                <li>• Always prove-test-prove when checking for dead</li>
                <li>• Record the instrument serial number on test sheets</li>
                <li>• Keep calibration certificates readily available</li>
                <li>• Have backup equipment available for critical work</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQs */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <h2 className="text-[22px] font-semibold text-white mb-4 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Card key={i} variant="ios" className="p-4">
              <h3 className="text-[17px] font-semibold text-white mb-2">{faq.question}</h3>
              <p className="text-[15px] text-white/70 leading-relaxed">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Reference Card */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <UnitsPocketCard
          title="Test Equipment Reference"
          items={referenceItems}
        />
      </section>

      {/* Quiz */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <Quiz
          questions={quizQuestions}
          title="Section 3 Quiz"
          description="Test your knowledge of test equipment and calibration"
        />
      </section>

      {/* Navigation */}
      <footer className="px-4 pb-safe pt-6 max-w-4xl mx-auto border-t border-white/10">
        <div className="flex gap-3">
          <Button variant="ios-secondary" size="ios-default" className="flex-1" asChild>
            <Link to="../section2">
              <ChevronLeft className="h-5 w-5 mr-1" />
              Previous
            </Link>
          </Button>
          <Button variant="ios-primary" size="ios-default" className="flex-1" asChild>
            <Link to="../section4">
              Next
              <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default InspectionTestingModule1Section3;
