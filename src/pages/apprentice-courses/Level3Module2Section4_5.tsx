import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, BookOpen, Zap, ClipboardCheck, AlertTriangle, Shield, FileCheck, Award, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useSEO from "@/hooks/useSEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Types
interface QuickCheckQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface FAQ {
  question: string;
  answer: string;
}

// Inline Knowledge Check Component
const InlineCheck = ({ question, options, correctIndex, explanation }: QuickCheckQuestion) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
  };

  return (
    <div className="my-6 p-4 bg-[#242424] rounded-lg border border-[#333]">
      <p className="font-medium text-[#E8FF00] mb-3 flex items-center gap-2">
        <Zap className="h-4 w-4" /> Quick Check
      </p>
      <p className="mb-3 text-gray-200">{question}</p>
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`w-full text-left p-3 rounded border transition-colors ${
              showResult
                ? index === correctIndex
                  ? "border-green-500 bg-green-500/10"
                  : index === selected
                  ? "border-red-500 bg-red-500/10"
                  : "border-[#333] bg-[#1a1a1a]"
                : "border-[#333] bg-[#1a1a1a] hover:border-[#E8FF00]/50"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {showResult && (
        <div className={`mt-3 p-3 rounded ${selected === correctIndex ? "bg-green-500/10" : "bg-red-500/10"}`}>
          <p className="flex items-center gap-2">
            {selected === correctIndex ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
            <span className={selected === correctIndex ? "text-green-500" : "text-red-500"}>
              {selected === correctIndex ? "Correct!" : "Not quite right"}
            </span>
          </p>
          <p className="text-gray-300 mt-2 text-sm">{explanation}</p>
        </div>
      )}
    </div>
  );
};

// Quick check questions throughout content
const quickCheckQuestions: QuickCheckQuestion[] = [
  {
    question: "What is the minimum insulation resistance required for an EV charging circuit at 500V DC test voltage?",
    options: [
      "0.5 MOhm",
      "1.0 MOhm",
      "2.0 MOhm",
      "10 MOhm"
    ],
    correctIndex: 1,
    explanation: "For circuits operating at voltages up to and including 500V AC, including EV charging circuits, the minimum insulation resistance is 1.0 MOhm when tested at 500V DC, as per BS 7671 Table 6A."
  },
  {
    question: "Which type of RCD test must be performed to verify the 30mA RCD protecting an EV charging circuit?",
    options: [
      "Only the x1 (30mA) trip test",
      "x1 and x5 trip tests only",
      "Full range including x1, x5, and ramp tests",
      "RCD testing is not required for EV installations"
    ],
    correctIndex: 2,
    explanation: "Full RCD testing should be performed including x1 (rated current), x5 (5 times rated), and ramp tests to verify correct operation. For Type B RCDs used with EV chargers, additional DC fault testing may be required."
  },
  {
    question: "What documentation must be provided to the customer upon completion of an EV charger installation?",
    options: [
      "Verbal confirmation only",
      "Electrical Installation Certificate (EIC) or Minor Works Certificate",
      "Manufacturer's warranty only",
      "Invoice only"
    ],
    correctIndex: 1,
    explanation: "An Electrical Installation Certificate (EIC) is required for new installations including EV charging points. This documents that the work complies with BS 7671 and includes all test results. Minor Works may be appropriate for additions to existing circuits."
  },
  {
    question: "Why is functional testing of the EV charger important after installation?",
    options: [
      "It is optional and not required",
      "Only to check the display works",
      "To verify the charger operates correctly, communicates with vehicles, and safety features function",
      "To programme the warranty registration"
    ],
    correctIndex: 2,
    explanation: "Functional testing verifies the charger operates correctly with a vehicle, the control pilot communication works, safety features activate properly, and any smart charging features are configured and working."
  }
];

// Quiz questions
const quizQuestions: QuizQuestion[] = [
  {
    question: "According to BS 7671, what is the maximum permitted earth fault loop impedance (Zs) for a Type B 32A MCB protecting an EV charging circuit?",
    options: [
      "0.27 Ohm",
      "0.55 Ohm",
      "1.09 Ohm",
      "1.37 Ohm"
    ],
    correctAnswer: 3,
    explanation: "For a Type B 32A MCB with 0.4s disconnection time (as required for EV charging), the maximum Zs is 1.37 Ohm. This ensures fault current is sufficient to trip the MCB within the required time."
  },
  {
    question: "What is the purpose of continuity testing the protective conductor in an EV charging installation?",
    options: [
      "To check the cable colour is correct",
      "To verify a continuous, low-resistance path for fault current to the earthing system",
      "To measure the cable length",
      "To test the charger electronics"
    ],
    correctAnswer: 1,
    explanation: "Continuity testing verifies there is a continuous, low-resistance protective conductor path from exposed conductive parts back to the earthing system, ensuring fault current can flow to operate protective devices."
  },
  {
    question: "When testing a Type B RCD protecting an EV charger, what additional test capability is required?",
    options: [
      "Higher test voltage",
      "AC and DC residual current fault simulation",
      "Longer test duration",
      "Lower test current"
    ],
    correctAnswer: 1,
    explanation: "Type B RCDs detect both AC and DC residual currents. Testers must be capable of simulating DC fault currents to verify the RCD will trip on DC leakage, which can occur with EV onboard chargers."
  },
  {
    question: "What certification scheme is typically required for installers of EV charging points?",
    options: [
      "No certification required",
      "CompEx certification",
      "OZEV-approved installer accreditation (e.g., NICEIC, NAPIT)",
      "Gas Safe registration"
    ],
    correctAnswer: 2,
    explanation: "For grant-funded domestic installations and to demonstrate competence, installers typically need OZEV (Office for Zero Emission Vehicles) approved certification through bodies like NICEIC, NAPIT, or ELECSA which includes specific EV training."
  },
  {
    question: "What is the required test voltage for insulation resistance testing of an EV charging circuit?",
    options: [
      "250V DC",
      "500V DC",
      "1000V DC",
      "230V AC"
    ],
    correctAnswer: 1,
    explanation: "For circuits with nominal voltage up to 500V (including standard EV charging circuits), insulation resistance testing is performed at 500V DC as specified in BS 7671."
  },
  {
    question: "What should be verified during visual inspection before testing an EV charger installation?",
    options: [
      "Only the charger display",
      "Cable sizing, installation method, protection devices, earthing arrangements",
      "Just the paint colour",
      "Only the meter readings"
    ],
    correctAnswer: 1,
    explanation: "Visual inspection should verify cable sizing is adequate, installation method is appropriate, correct protection devices are fitted (MCB type, RCD type), earthing arrangements comply with BS 7671, and all connections are secure."
  },
  {
    question: "What prospective fault current (PSCC) measurement is required for an EV installation?",
    options: [
      "Only at the consumer unit",
      "At the EV charger location to verify protective device rating is adequate",
      "PSCC testing is not required for EV",
      "Only at the meter"
    ],
    correctAnswer: 1,
    explanation: "Prospective short circuit current must be measured at the EV charger location to verify the protective device has adequate breaking capacity. This ensures the MCB can safely interrupt the maximum possible fault current."
  },
  {
    question: "What is the polarity test checking in an EV charging installation?",
    options: [
      "Battery charging direction",
      "That line, neutral, and protective conductors are correctly connected throughout",
      "The charger output voltage",
      "Vehicle battery polarity"
    ],
    correctAnswer: 1,
    explanation: "Polarity testing verifies that line, neutral, and protective conductors are correctly connected throughout the installation, ensuring single-pole devices are in the line conductor and the installation is safe."
  },
  {
    question: "Which installation certificate is appropriate for a new dedicated EV charging circuit?",
    options: [
      "Minor Electrical Installation Works Certificate only",
      "Electrical Installation Certificate (EIC)",
      "No certificate required",
      "Building regulations certificate only"
    ],
    correctAnswer: 1,
    explanation: "A new dedicated EV charging circuit requires an Electrical Installation Certificate (EIC) as it constitutes new work rather than an addition to an existing circuit. This provides full documentation of design, construction, and test results."
  },
  {
    question: "What must be done if earth fault loop impedance (Zs) exceeds the maximum permitted value?",
    options: [
      "Proceed anyway as it's only guidance",
      "Increase cable size, reduce circuit length, or fit RCD for additional protection",
      "Reduce the MCB rating to 16A",
      "Install a larger earthing electrode"
    ],
    correctAnswer: 1,
    explanation: "If Zs exceeds permitted values, corrective action is needed such as increasing cable CSA (reducing R1+R2), reducing circuit length, or installing an RCD which provides disconnection at lower fault currents than MCBs alone."
  },
  {
    question: "What functional test should verify the EV charger's built-in RCD (if fitted)?",
    options: [
      "No testing needed for built-in RCDs",
      "Press the charger's test button to verify manual trip function",
      "Only test with an RCD tester",
      "Remove and bench test separately"
    ],
    correctAnswer: 1,
    explanation: "The built-in test button should be pressed to verify the charger's integral RCD trips correctly. This tests the mechanical and electronic trip mechanism. Additional instrument testing verifies trip times and current thresholds."
  }
];

// FAQs
const faqs: FAQ[] = [
  {
    question: "Do I need special test equipment for EV charger installations?",
    answer: "Standard multifunction testers can perform most tests, but for Type B RCDs (common with EV chargers), you need a tester capable of DC residual current simulation. Some chargers have integrated Type A RCDs plus DC protection, which may require specific testing approaches. Always check your tester's capabilities against the RCD type installed."
  },
  {
    question: "What certification do I need to install EV chargers?",
    answer: "You need to be a competent electrician with appropriate qualifications (e.g., Level 3 electrical installation). For OZEV grant-funded work and to demonstrate specialist competence, you should hold accreditation from an approved scheme (NICEIC, NAPIT, ELECSA, etc.) that includes EV-specific training modules covering BS 7671 Section 722 requirements."
  },
  {
    question: "Is Building Control notification required for EV charger installation?",
    answer: "Generally, if you're registered with a competent person scheme, you can self-certify the work without separate Building Control notification. If not registered, Building Control notification and inspection may be required. The work must comply with Part P of the Building Regulations in England (equivalent regulations apply elsewhere in UK)."
  },
  {
    question: "What documentation should I provide to the customer?",
    answer: "Provide an Electrical Installation Certificate (EIC) with schedule of test results, user manual and warranty information for the charger, any smart charger app setup instructions, DNO notification confirmation if required, and OZEV grant paperwork if applicable. Keep copies of all documentation for your records."
  },
  {
    question: "How often should EV chargers be inspected and tested?",
    answer: "Commercial/public chargers should follow a maintenance schedule per manufacturer guidance, typically annually. Domestic chargers should be tested as part of periodic inspection (EICR) - recommended every 5 years for domestic or per occupancy change. Regular user testing of the RCD test button is also recommended (monthly)."
  },
  {
    question: "What if the existing earthing system is PME and I'm installing an outdoor charger?",
    answer: "PME supplies require additional protective measures for outdoor EV charging. Options include: installing a separate earth electrode (TT arrangement for the charger), using an approved PME-compliant charger with isolation features, ensuring protective equipotential bonding, and verifying touch voltage limits. Document the earthing arrangement chosen and justify the decision in certification."
  }
];

const Level3Module2Section4_5 = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useSEO(
    "4.5 Testing and Certification - Level 3 EV Charging",
    "Understanding testing procedures, certification requirements, and compliance documentation for EV charging point installations"
  );

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizComplete(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowQuiz(false);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Navigation Breadcrumb */}
      <div className="bg-[#242424] border-b border-[#333]">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 p-3 md:p-4 text-xs md:text-sm text-gray-400">
            <Link to="/apprentice-courses" className="hover:text-[#E8FF00] transition-colors">Courses</Link>
            <span>/</span>
            <Link to="/apprentice-courses/level-3" className="hover:text-[#E8FF00] transition-colors">Level 3</Link>
            <span>/</span>
            <Link to="/apprentice-courses/level-3/module-2" className="hover:text-[#E8FF00] transition-colors">Module 2</Link>
            <span>/</span>
            <Link to="/apprentice-courses/level-3/module-2/section-4" className="hover:text-[#E8FF00] transition-colors">Section 4</Link>
            <span>/</span>
            <span className="text-[#E8FF00]">4.5</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#E8FF00]/20 flex items-center justify-center">
              <ClipboardCheck className="h-6 w-6 text-[#E8FF00]" />
            </div>
            <div>
              <p className="text-[#E8FF00] text-sm font-medium">Section 4.5</p>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Testing and Certification</h1>
            </div>
          </div>
          <p className="text-gray-400 text-lg">
            Understanding testing procedures, certification requirements, and compliance documentation for EV charging point installations.
          </p>
        </div>

        {/* Learning Outcomes */}
        <Card className="p-6 mb-8 bg-[#242424] border-[#333]">
          <h2 className="text-lg font-semibold text-[#E8FF00] mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5" /> Learning Outcomes
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#E8FF00] mt-0.5 flex-shrink-0" />
              <span>Perform initial verification testing for EV charging installations</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#E8FF00] mt-0.5 flex-shrink-0" />
              <span>Understand specific testing requirements for Type A and Type B RCDs</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#E8FF00] mt-0.5 flex-shrink-0" />
              <span>Complete appropriate certification documentation</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#E8FF00] mt-0.5 flex-shrink-0" />
              <span>Identify installer certification and competence requirements</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#E8FF00] mt-0.5 flex-shrink-0" />
              <span>Conduct functional testing of EV charging equipment</span>
            </li>
          </ul>
        </Card>

        {/* Quick Summary */}
        <Card className="p-4 mb-8 bg-[#E8FF00]/10 border-[#E8FF00]/30">
          <h3 className="font-semibold text-[#E8FF00] mb-2">Quick Summary</h3>
          <p className="text-gray-300 text-sm">
            EV charging installations require thorough testing to BS 7671 requirements, with particular attention to earth fault loop impedance, RCD operation, and insulation resistance. Type B RCDs require specialist testing equipment capable of DC fault simulation. Proper certification documents compliance and protects both installer and customer. Installer competence through approved certification schemes ensures quality and enables access to OZEV grant funding.
          </p>
        </Card>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Section 1: Initial Verification Testing */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Ruler className="h-5 w-5 text-[#E8FF00]" />
              Initial Verification Testing
            </h2>

            <div className="space-y-4 text-gray-300">
              <p>
                Before an EV charging installation is energised and handed over, initial verification must be completed in accordance with BS 7671 Chapter 6. This comprises visual inspection followed by testing.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">Visual Inspection</h3>
              <p>
                Visual inspection should be carried out before testing to identify obvious defects and verify compliance:
              </p>

              <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                <h4 className="text-[#E8FF00] font-medium mb-3">Visual Inspection Checklist</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E8FF00] mt-0.5" />
                    <span>Cable type and CSA appropriate for load and installation method</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E8FF00] mt-0.5" />
                    <span>Cable routing secure, protected, and compliant with manufacturer guidance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E8FF00] mt-0.5" />
                    <span>Correct MCB type and rating (typically Type B or C, 32A for 7kW)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E8FF00] mt-0.5" />
                    <span>Appropriate RCD type fitted (Type A minimum, Type B often required)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E8FF00] mt-0.5" />
                    <span>Earthing arrangement correct (TT, TN-S, TN-C-S with PME considerations)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E8FF00] mt-0.5" />
                    <span>Charger securely mounted at correct height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E8FF00] mt-0.5" />
                    <span>Cable connections tight and properly made</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E8FF00] mt-0.5" />
                    <span>IP rating appropriate for location (IP65 minimum outdoor)</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">Testing Sequence</h3>
              <p>
                Tests should be performed in the correct sequence to ensure safety and accuracy:
              </p>

              <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                <h4 className="text-[#E8FF00] font-medium mb-3">Test Sequence (De-energised)</h4>
                <ol className="text-sm space-y-2 list-decimal list-inside">
                  <li><strong>Continuity of protective conductors</strong> - Verify CPC continuous from charger to MET</li>
                  <li><strong>Continuity of ring final circuits</strong> - N/A for dedicated radial EV circuits</li>
                  <li><strong>Insulation resistance</strong> - Minimum 1.0 MOhm at 500V DC</li>
                  <li><strong>Polarity</strong> - Verify L, N, E correctly connected</li>
                </ol>
                <h4 className="text-[#E8FF00] font-medium mb-3 mt-4">Test Sequence (Energised)</h4>
                <ol className="text-sm space-y-2 list-decimal list-inside" start={5}>
                  <li><strong>Earth fault loop impedance (Zs)</strong> - Verify within limits for MCB type/rating</li>
                  <li><strong>Prospective fault current (PSCC)</strong> - Verify protective device breaking capacity adequate</li>
                  <li><strong>RCD operation</strong> - Full test including x1, x5, and ramp tests</li>
                  <li><strong>Functional testing</strong> - Verify charger operates correctly</li>
                </ol>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[0]} />
          </section>

          {/* Section 2: Specific Test Requirements */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#E8FF00]" />
              Specific Test Requirements for EV Installations
            </h2>

            <div className="space-y-4 text-gray-300">
              <h3 className="text-lg font-medium text-white mt-6 mb-3">Earth Fault Loop Impedance (Zs)</h3>
              <p>
                Earth fault loop impedance testing verifies that fault current will be sufficient to operate the protective device within the required disconnection time:
              </p>

              <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                <h4 className="text-[#E8FF00] font-medium mb-2">Maximum Zs Values for EV Circuits</h4>
                <p className="text-sm mb-3">For 0.4s disconnection time (required by Regulation 722.411.4.1):</p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#333]">
                      <th className="text-left py-2">MCB Type</th>
                      <th className="text-left py-2">Rating</th>
                      <th className="text-left py-2">Max Zs (Ohm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#333]">
                      <td className="py-2">Type B</td>
                      <td className="py-2">32A</td>
                      <td className="py-2">1.37</td>
                    </tr>
                    <tr className="border-b border-[#333]">
                      <td className="py-2">Type B</td>
                      <td className="py-2">40A</td>
                      <td className="py-2">1.09</td>
                    </tr>
                    <tr className="border-b border-[#333]">
                      <td className="py-2">Type C</td>
                      <td className="py-2">32A</td>
                      <td className="py-2">0.68</td>
                    </tr>
                    <tr>
                      <td className="py-2">Type C</td>
                      <td className="py-2">40A</td>
                      <td className="py-2">0.55</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-gray-400 mt-2">Values at maximum operating temperature. Apply 0.8 correction factor to values measured at ambient temperature.</p>
              </div>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">RCD Testing</h3>
              <p>
                RCD testing for EV installations requires particular attention due to the RCD types used:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                  <h4 className="text-[#E8FF00] font-medium mb-2">Type A RCD Testing</h4>
                  <ul className="text-sm space-y-1">
                    <li>- x1 test (30mA): Trip within 300ms</li>
                    <li>- x5 test (150mA): Trip within 40ms</li>
                    <li>- Ramp test: Trip between 15-30mA</li>
                    <li>- No-trip test (0.5x): Should not trip</li>
                    <li>- Standard tester adequate</li>
                  </ul>
                </div>
                <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                  <h4 className="text-[#E8FF00] font-medium mb-2">Type B RCD Testing</h4>
                  <ul className="text-sm space-y-1">
                    <li>- All Type A tests required</li>
                    <li>- PLUS DC fault current tests</li>
                    <li>- Smooth DC: 30mA trip test</li>
                    <li>- Mixed AC/DC fault testing</li>
                    <li>- Requires specialist tester with DC capability</li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mt-4">
                <h4 className="text-elec-yellow font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" /> Important: RCD Type Selection
                </h4>
                <p className="text-sm text-gray-300">
                  Many EV chargers include built-in DC leakage protection (6mA DC detection), allowing use of Type A RCD upstream. Always check manufacturer specifications. If the charger does not include DC protection, Type B RCD is required. Document the protection arrangement in the certification.
                </p>
              </div>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">Insulation Resistance Testing</h3>
              <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                <h4 className="text-[#E8FF00] font-medium mb-2">Test Requirements</h4>
                <ul className="text-sm space-y-2">
                  <li><strong>Test Voltage:</strong> 500V DC for circuits up to 500V nominal</li>
                  <li><strong>Minimum Value:</strong> 1.0 MOhm</li>
                  <li><strong>Test Configuration:</strong> L-E, N-E, L-N (with charger isolated)</li>
                  <li><strong>Important:</strong> Disconnect or isolate the EV charger before testing to prevent damage to electronic components</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[1]} />
          </section>

          {/* Section 3: Certification and Documentation */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-[#E8FF00]" />
              Certification and Documentation
            </h2>

            <div className="space-y-4 text-gray-300">
              <p>
                Proper documentation is essential for compliance, safety records, and customer protection. The type of certificate depends on the nature of the work.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">Electrical Installation Certificate (EIC)</h3>
              <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                <h4 className="text-[#E8FF00] font-medium mb-2">When Required</h4>
                <ul className="text-sm space-y-1 mb-3">
                  <li>- New EV charging circuit installation</li>
                  <li>- New consumer unit or distribution board for EV</li>
                  <li>- Significant alterations to existing installation</li>
                </ul>
                <h4 className="text-[#E8FF00] font-medium mb-2">EIC Contents</h4>
                <ul className="text-sm space-y-1">
                  <li>- Details of designer, constructor, and inspector/tester</li>
                  <li>- Installation details and supply characteristics</li>
                  <li>- Particulars of installation (earthing, RCD details)</li>
                  <li>- Schedule of circuit details</li>
                  <li>- Schedule of test results (all measured values)</li>
                  <li>- Declaration of compliance with BS 7671</li>
                </ul>
              </div>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">Minor Electrical Installation Works Certificate</h3>
              <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                <h4 className="text-[#E8FF00] font-medium mb-2">When Appropriate</h4>
                <ul className="text-sm space-y-1 mb-3">
                  <li>- Adding EV charger to existing circuit (rarely appropriate)</li>
                  <li>- Simple modifications to existing EV installation</li>
                  <li>- Note: Most EV installations require full EIC</li>
                </ul>
              </div>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">Additional Documentation</h3>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                  <h4 className="text-[#E8FF00] font-medium mb-2">For All Installations</h4>
                  <ul className="text-sm space-y-1">
                    <li>- EIC or Minor Works Certificate</li>
                    <li>- Charger user manual</li>
                    <li>- Warranty documentation</li>
                    <li>- Smart charger app instructions</li>
                    <li>- Safety information leaflet</li>
                  </ul>
                </div>
                <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                  <h4 className="text-[#E8FF00] font-medium mb-2">Where Applicable</h4>
                  <ul className="text-sm space-y-1">
                    <li>- DNO notification confirmation</li>
                    <li>- OZEV grant claim documentation</li>
                    <li>- Building Control certificate (if not self-certifying)</li>
                    <li>- PME risk assessment documentation</li>
                    <li>- Maximum demand calculations</li>
                  </ul>
                </div>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[2]} />
          </section>

          {/* Section 4: Installer Certification */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-[#E8FF00]" />
              Installer Certification and Competence
            </h2>

            <div className="space-y-4 text-gray-300">
              <p>
                EV charger installation requires demonstrable competence both for regulatory compliance and to access grant funding schemes.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">Competent Person Schemes</h3>
              <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                <h4 className="text-[#E8FF00] font-medium mb-2">OZEV-Approved Certification Bodies</h4>
                <p className="text-sm mb-3">To install grant-funded domestic chargers, membership of an approved scheme is required:</p>
                <ul className="text-sm space-y-2">
                  <li><strong>NICEIC:</strong> Domestic Installer or Approved Contractor with EV module</li>
                  <li><strong>NAPIT:</strong> Domestic Installer scheme with EV training</li>
                  <li><strong>ELECSA:</strong> Approved scheme membership with EV competence</li>
                  <li><strong>BESCA:</strong> Scheme provider for EV installation</li>
                </ul>
              </div>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">Training Requirements</h3>
              <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                <h4 className="text-[#E8FF00] font-medium mb-3">Typical EV Training Covers</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E8FF00] mt-0.5" />
                    <span>BS 7671 Section 722 requirements for EV charging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E8FF00] mt-0.5" />
                    <span>Charging modes and connector types</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E8FF00] mt-0.5" />
                    <span>PME earthing considerations and solutions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E8FF00] mt-0.5" />
                    <span>RCD selection (Type A, Type B, DC detection)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E8FF00] mt-0.5" />
                    <span>Smart charger regulations and configuration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E8FF00] mt-0.5" />
                    <span>Testing requirements specific to EV installations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#E8FF00] mt-0.5" />
                    <span>Grant scheme requirements and documentation</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">Building Regulations Compliance</h3>
              <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                <h4 className="text-[#E8FF00] font-medium mb-2">Part P Requirements (England)</h4>
                <ul className="text-sm space-y-2">
                  <li><strong>Notifiable Work:</strong> New circuits in domestic premises</li>
                  <li><strong>Self-Certification:</strong> Available through competent person schemes</li>
                  <li><strong>Building Control:</strong> Required if not registered with approved scheme</li>
                  <li><strong>Scotland/Wales/NI:</strong> Equivalent regulations apply - check local requirements</li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[3]} />
          </section>

          {/* Practical Test Procedure */}
          <Card className="p-6 bg-[#242424] border-[#333]">
            <h3 className="text-lg font-semibold text-[#E8FF00] mb-4 flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" /> Practical Test Procedure Summary
            </h3>
            <div className="space-y-4 text-gray-300">
              <div>
                <h4 className="font-medium text-white mb-2">Step-by-Step Testing</h4>
                <ol className="text-sm space-y-2 list-decimal list-inside">
                  <li>Complete visual inspection and record any defects</li>
                  <li>Isolate circuit at consumer unit - lock off</li>
                  <li>Disconnect charger from supply cables</li>
                  <li>Test continuity of CPC (R2) - record value</li>
                  <li>Test polarity at charger connection point</li>
                  <li>Test insulation resistance L-E, N-E, L-N (minimum 1 MOhm)</li>
                  <li>Reconnect charger</li>
                  <li>Energise circuit</li>
                  <li>Measure earth fault loop impedance (Zs) at charger</li>
                  <li>Measure prospective fault current (PSCC)</li>
                  <li>Test RCD operation (x1, x5, ramp, test button)</li>
                  <li>Perform functional test with vehicle or test equipment</li>
                  <li>Complete EIC and schedule of test results</li>
                </ol>
              </div>
              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-3 mt-4">
                <p className="text-sm text-elec-yellow font-medium mb-1">Functional Testing Reminder</p>
                <p className="text-xs text-gray-300">
                  After electrical testing, verify the charger powers up correctly, communicates with a vehicle (or use charger test mode), emergency stop functions work, and smart features are configured per customer requirements.
                </p>
              </div>
            </div>
          </Card>

          {/* Common Questions */}
          <Card className="p-6 bg-[#242424] border-[#333]">
            <h3 className="text-lg font-semibold text-[#E8FF00] mb-4">Common Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border-[#333]">
                  <AccordionTrigger className="text-white hover:text-[#E8FF00]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          {/* Quick Reference */}
          <Card className="p-6 bg-[#242424] border-[#333]">
            <h3 className="text-lg font-semibold text-[#E8FF00] mb-4">Quick Reference</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-white mb-2">Key Test Values</h4>
                <ul className="text-gray-400 space-y-1">
                  <li>- IR minimum: 1.0 MOhm at 500V DC</li>
                  <li>- Type B 32A MCB Zs max: 1.37 Ohm</li>
                  <li>- RCD x1 trip: within 300ms</li>
                  <li>- RCD x5 trip: within 40ms</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Documentation Required</h4>
                <ul className="text-gray-400 space-y-1">
                  <li>- EIC for new circuits</li>
                  <li>- Schedule of test results</li>
                  <li>- User documentation</li>
                  <li>- DNO notification (if required)</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Quiz Section */}
          <Card className="p-6 bg-[#242424] border-[#333]">
            {!showQuiz ? (
              <div className="text-center">
                <h3 className="text-lg font-semibold text-[#E8FF00] mb-2">Test Your Knowledge</h3>
                <p className="text-gray-400 mb-4">Ready to test your understanding of EV testing and certification?</p>
                <Button
                  onClick={() => setShowQuiz(true)}
                  className="bg-[#E8FF00] text-black hover:bg-[#E8FF00]/90"
                >
                  Start Quiz ({quizQuestions.length} questions)
                </Button>
              </div>
            ) : quizComplete ? (
              <div className="text-center">
                <h3 className="text-lg font-semibold text-[#E8FF00] mb-2">Quiz Complete!</h3>
                <p className="text-2xl font-bold text-white mb-4">{score}/{quizQuestions.length}</p>
                <p className="text-gray-400 mb-4">
                  {score === quizQuestions.length
                    ? "Excellent! Perfect score!"
                    : score >= quizQuestions.length * 0.8
                    ? "Great work! You have a solid understanding."
                    : score >= quizQuestions.length * 0.6
                    ? "Good effort! Review the sections you missed."
                    : "Keep studying and try again!"}
                </p>
                <Button
                  onClick={restartQuiz}
                  className="bg-[#E8FF00] text-black hover:bg-[#E8FF00]/90"
                >
                  Restart Quiz
                </Button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-[#E8FF00]">Question {currentQuestion + 1}/{quizQuestions.length}</h3>
                  <span className="text-gray-400">Score: {score}</span>
                </div>
                <p className="text-white mb-4">{quizQuestions[currentQuestion].question}</p>
                <div className="space-y-2">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className={`w-full text-left p-3 rounded border transition-colors ${
                        selectedAnswer !== null
                          ? index === quizQuestions[currentQuestion].correctAnswer
                            ? "border-green-500 bg-green-500/10"
                            : index === selectedAnswer
                            ? "border-red-500 bg-red-500/10"
                            : "border-[#333] bg-[#1a1a1a]"
                          : "border-[#333] bg-[#1a1a1a] hover:border-[#E8FF00]/50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {showExplanation && (
                  <div className={`mt-4 p-3 rounded ${selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? "bg-green-500/10" : "bg-red-500/10"}`}>
                    <p className="text-gray-300 text-sm">{quizQuestions[currentQuestion].explanation}</p>
                  </div>
                )}
                {selectedAnswer !== null && (
                  <Button
                    onClick={nextQuestion}
                    className="mt-4 bg-[#E8FF00] text-black hover:bg-[#E8FF00]/90"
                  >
                    {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Results"}
                  </Button>
                )}
              </div>
            )}
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Link
            to="/apprentice-courses/level-3/module-2/section-4/4-4"
            className="flex items-center gap-2 px-4 py-2 bg-[#242424] border border-[#333] rounded hover:bg-[#333] text-white"
          >
            <ArrowLeft className="h-4 w-4" /> 4.4 Smart Charging
          </Link>
          <Link
            to="/apprentice-courses/level-3/module-2/section-4"
            className="flex items-center gap-2 px-4 py-2 bg-[#E8FF00] text-black rounded hover:bg-[#E8FF00]/90"
          >
            Back to Section 4 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Level3Module2Section4_5;
