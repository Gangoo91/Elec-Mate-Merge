import { ArrowLeft, Target, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section5_1 = () => {
  useSEO(
    "Purpose of Insulation Resistance Testing - Level 2 Electrical Testing & Inspection",
    "Understanding why insulation resistance testing is necessary for safety and compliance with BS 7671"
  );

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "What is the main purpose of insulation resistance testing?",
      options: ["To measure voltage", "To ensure insulation prevents leakage currents", "To test circuit breakers", "To check cable capacity"],
      correctAnswer: 1,
      explanation: "Insulation resistance testing ensures that the insulation on cables and equipment is sound and prevents dangerous leakage currents."
    },
    {
      id: 2,
      question: "What does a high insulation resistance reading mean?",
      options: ["Insulation is damaged", "Insulation is good and preventing current leakage", "Circuit is overloaded", "Test equipment is faulty"],
      correctAnswer: 1,
      explanation: "A high insulation resistance reading indicates that the insulation is in good condition and effectively preventing current leakage."
    },
    {
      id: 3,
      question: "What does a low reading indicate?",
      options: ["Good insulation", "Insulation has been damaged or is contaminated", "Normal operation", "High voltage"],
      correctAnswer: 1,
      explanation: "A low insulation resistance reading suggests that the insulation has been damaged, contaminated, or is beginning to fail."
    },
    {
      id: 4,
      question: "Which regulation requires electrical systems to be kept safe at all times?",
      options: ["BS 7671", "Electricity at Work Regulations 1989", "Health and Safety at Work Act", "Building Regulations"],
      correctAnswer: 1,
      explanation: "The Electricity at Work Regulations 1989 make it a legal duty to ensure electrical systems are maintained in a safe condition."
    },
    {
      id: 5,
      question: "Which certificate records insulation resistance test results for new installations?",
      options: ["Minor Works Certificate", "Electrical Installation Certificate (EIC)", "EICR", "PAT Certificate"],
      correctAnswer: 1,
      explanation: "The Electrical Installation Certificate (EIC) is used to record test results for new electrical installations."
    },
    {
      id: 6,
      question: "True or False: Insulation resistance testing is optional on minor works.",
      options: ["True", "False", "Only sometimes", "Depends on the client"],
      correctAnswer: 1,
      explanation: "False. Even minor works must undergo insulation resistance testing to prove the system is safe and compliant."
    },
    {
      id: 7,
      question: "What instrument is typically used to carry out the test?",
      options: ["Multimeter", "Insulation resistance tester (megger)", "Oscilloscope", "Clamp meter"],
      correctAnswer: 1,
      explanation: "An insulation resistance tester, commonly called a 'megger', is used to apply high DC voltage and measure resistance."
    },
    {
      id: 8,
      question: "Why must sensitive equipment be disconnected before testing?",
      options: ["To save time", "To avoid damage from high test voltages", "It's not necessary", "To get accurate readings"],
      correctAnswer: 1,
      explanation: "Sensitive electronic equipment must be disconnected because the high test voltages used could damage delicate components."
    },
    {
      id: 9,
      question: "What must an electrician do if a test result is unsatisfactory?",
      options: ["Continue with energising", "Record and ignore", "Do not energise until fault is rectified", "Test again later"],
      correctAnswer: 2,
      explanation: "If test results are unsatisfactory, the circuit must not be energised until the fault has been identified and rectified."
    },
    {
      id: 10,
      question: "In the real-world example, what was the consequence of skipping insulation resistance testing?",
      options: ["Nothing happened", "Moisture caused nuisance tripping and fire", "Client was happy", "Work was completed faster"],
      correctAnswer: 1,
      explanation: "Skipping testing led to moisture ingress causing RCD tripping and eventual fire, plus reputational and financial damage."
    }
  ];

  const faqs = [
    {
      question: "Do you need to test every circuit?",
      answer: "Yes. All new or modified circuits must be tested to prove their safety and compliance with BS 7671."
    },
    {
      question: "Can insulation resistance testing damage equipment?",
      answer: "Yes. Sensitive devices such as dimmers, electronic controls, or IT equipment should be disconnected before the test to prevent damage from high test voltages."
    },
    {
      question: "Is insulation resistance testing required for minor works?",
      answer: "Yes. Even small alterations must be tested to prove the system is safe and meets regulatory requirements."
    },
    {
      question: "What voltage is typically used for insulation resistance testing?",
      answer: "Test voltages are typically 250V DC, 500V DC, or 1000V DC depending on the system voltage and BS 7671 requirements."
    },
    {
      question: "How often should insulation resistance testing be carried out?",
      answer: "Testing is required for all new work, alterations, and during periodic inspections. The frequency of periodic testing depends on the type of installation and environment."
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
              Back to Section 6.5
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
              Section 6.5.1
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Purpose of Insulation Resistance Testing
          </h1>
          <p className="text-white text-sm sm:text-base">
            Understanding why insulation resistance testing is necessary for safety and compliance with BS 7671
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
                  <span>IR testing prevents dangerous leakage currents</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Legal requirement under BS 7671 and EAWR 1989</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>High readings = good insulation, low = damage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Must test before energising any circuit</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/20">
              <p className="font-medium mb-2 sm:mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Spot:</strong> Moisture damage, cable wear, poor installation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Use:</strong> Insulation resistance tester (megger), proper procedures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Check:</strong> Readings meet BS 7671 minimums, record results</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Introduction</h2>
          <p className="text-sm sm:text-base text-white mb-4">
            Insulation resistance (IR) testing is one of the most important checks in electrical installation work. It verifies that the insulation between conductors, and between conductors and earth, is in good condition and able to prevent leakage currents that could cause electric shock or fire. Without this test, defects may remain hidden within the system until they lead to a serious incident.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Learning Outcomes</h2>
          <p className="text-sm sm:text-base text-white mb-3 sm:mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Explain why insulation resistance testing is necessary for safety and compliance</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Describe what the test measures and what different results mean</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Understand how IR testing is linked to BS 7671 and the law</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Recognise the consequences of not carrying out or recording the test</span>
            </li>
          </ul>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Content / Learning</h2>

          {/* 1. Why Insulation Resistance Testing is Essential */}
          <section className="mb-4 sm:mb-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="rounded-lg p-3 sm:p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-2 sm:gap-3 mb-2">
                  <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-2 sm:mb-3 text-sm sm:text-base">Why Insulation Resistance Testing is Essential</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-white mb-2">The Critical Safety Function</h4>
                        <p className="text-xs sm:text-sm text-white">
                          Insulation resistance testing is carried out to ensure that the insulation on cables and equipment is sound. Over time, insulation can deteriorate due to various factors including age, heat, moisture, mechanical damage, chemical contamination, or UV exposure. When insulation breaks down, it creates pathways for current to leak from one conductor to another or to earth, presenting serious hazards.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-white mb-2">Types of Insulation Failure</h4>
                        <ul className="text-xs sm:text-sm text-white space-y-1 pl-4">
                          <li>• <strong>Complete breakdown:</strong> Total failure creating a direct fault path</li>
                          <li>• <strong>Gradual deterioration:</strong> Slow reduction in insulation effectiveness over time</li>
                          <li>• <strong>Moisture ingress:</strong> Water penetration reducing insulation properties</li>
                          <li>• <strong>Mechanical damage:</strong> Physical damage from drilling, crushing, or rodent attack</li>
                          <li>• <strong>Thermal degradation:</strong> Heat damage from overloading or poor connections</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-white mb-2">Consequences of Poor Insulation</h4>
                        <p className="text-xs sm:text-sm text-white mb-2">
                          If insulation resistance is compromised, several dangerous scenarios can occur:
                        </p>
                        <ul className="text-xs sm:text-sm text-white space-y-1 pl-4">
                          <li>• <strong>Electric shock:</strong> Leakage current through damaged insulation can cause fatal electric shock</li>
                          <li>• <strong>Fire risk:</strong> High resistance faults can generate heat, leading to fire</li>
                          <li>• <strong>Equipment damage:</strong> Leakage currents can damage sensitive electronic equipment</li>
                          <li>• <strong>Nuisance tripping:</strong> RCDs may trip frequently due to earth leakage</li>
                          <li>• <strong>Energy waste:</strong> Leakage currents increase energy consumption unnecessarily</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-white mb-2">Prevention Through Testing</h4>
                        <p className="text-xs sm:text-sm text-white">
                          By carrying out this test, electricians can identify faults before energising a circuit and prevent potentially dangerous situations. The test reveals problems that visual inspection alone cannot detect, such as internal cable damage or moisture penetration within junction boxes.
                        </p>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-white">
                        In practice, this means every new installation, as well as any alterations or repairs, must undergo insulation resistance testing before being put into service. This applies to domestic, commercial, and industrial installations without exception.
                      </p>
                      
                      <div className="bg-card border border-elec-yellow/20 rounded p-3">
                        <p className="text-sm font-medium text-blue-700 dark:text-elec-yellow">
                          It is not just a formality — it is a legal requirement under the Electricity at Work Regulations 1989 and a fundamental step in keeping people safe.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="essential-check"
            question="Why is it unsafe to energise a circuit without carrying out insulation resistance testing first?"
            options={["It wastes time", "Hidden insulation faults could cause fire or shock", "It's not required", "Equipment might not work"]}
            correctIndex={1}
            explanation="Without testing, hidden insulation faults could remain undetected, leading to dangerous leakage currents that could cause fire, electric shock, or injury when the circuit is energised."
          />

          {/* 2. What the Test Measures */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">What the Test Measures</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-white mb-2">The Testing Process</h4>
                        <p className="text-xs sm:text-sm text-white">
                          The insulation resistance test applies a high DC voltage, typically 250V, 500V, or 1000V depending on the circuit voltage, from an insulation resistance tester (commonly called a "megger" or "insulation tester"). The instrument measures the resistance to current flow through the insulation material between conductors.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-white mb-2">Understanding the Measurement</h4>
                        <p className="text-xs sm:text-sm text-white">
                          The test measures how effectively the insulation prevents current flow. Perfect insulation would have infinite resistance, but in practice, we look for very high values measured in megaohms (MΩ). The higher the reading, the better the insulation integrity.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-white mb-2">Test Combinations Required</h4>
                        <p className="text-xs sm:text-sm text-white mb-2">
                          For comprehensive testing, several conductor combinations must be tested:
                        </p>
                        <ul className="text-xs sm:text-sm text-white space-y-1 pl-4">
                          <li>• <strong>Line to Neutral:</strong> Tests insulation between live conductors</li>
                          <li>• <strong>Line to Earth:</strong> Tests insulation between live conductor and earth</li>
                          <li>• <strong>Neutral to Earth:</strong> Tests insulation between neutral and earth (where not linked)</li>
                          <li>• <strong>Line to Line:</strong> In three-phase systems, tests between phases</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-white mb-2">Interpreting Results</h4>
                        <div className="bg-card border border-green-500/20 rounded p-3 mb-3">
                          <ul className="text-xs sm:text-sm text-white space-y-1">
                            <li><strong>Good Insulation:</strong> Readings in hundreds of MΩ or higher</li>
                            <li><strong>Acceptable:</strong> Above minimum values specified in BS 7671</li>
                            <li><strong>Poor:</strong> Close to or below minimum acceptable values</li>
                            <li><strong>Failed:</strong> Below minimum values - circuit must not be energised</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-white mb-2">Factors Affecting Readings</h4>
                        <ul className="text-xs sm:text-sm text-white space-y-1 pl-4">
                          <li>• <strong>Temperature:</strong> Higher temperatures generally reduce insulation resistance</li>
                          <li>• <strong>Humidity:</strong> Moisture can significantly lower readings</li>
                          <li>• <strong>Cable length:</strong> Longer cables may show lower readings due to larger surface area</li>
                          <li>• <strong>Connected equipment:</strong> Some devices can provide alternative current paths</li>
                          <li>• <strong>Age of installation:</strong> Older cables may naturally show lower readings</li>
                        </ul>
                      </div>

                      <div className="bg-card border border-green-500/20 rounded p-3">
                        <p className="text-sm font-medium text-green-700 dark:text-green-300">
                          Each test result gives the electrician confidence that the insulation is performing as intended and that energising the circuit will be safe.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="measures-check"
            question="What does a very low insulation resistance reading suggest about the condition of the cable?"
            options={["Cable is in perfect condition", "Insulation is damaged or contaminated", "Test equipment is working", "Voltage is correct"]}
            correctIndex={1}
            explanation="A very low insulation resistance reading indicates that the insulation has been damaged, contaminated with moisture, or is deteriorating and failing to prevent current leakage."
          />

          {/* 3. Link to BS 7671 and Legal Requirements */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-3">Link to BS 7671 and Legal Requirements</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-white mb-2">BS 7671 Requirements</h4>
                        <p className="text-xs sm:text-sm text-white">
                          The requirement to carry out insulation resistance testing is clearly set out in BS 7671 (IET Wiring Regulations). Section 643 specifically covers insulation resistance testing and states that this test shall be applied to verify the insulation of electrical installations.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-white mb-2">When Testing is Required</h4>
                        <ul className="text-xs sm:text-sm text-white space-y-1 pl-4">
                          <li>• <strong>New installations:</strong> All circuits before initial energisation</li>
                          <li>• <strong>Additions:</strong> New circuits added to existing installations</li>
                          <li>• <strong>Alterations:</strong> Modified circuits or significant changes</li>
                          <li>• <strong>Periodic inspections:</strong> Regular testing as part of EICR</li>
                          <li>• <strong>After maintenance:</strong> Following any work that could affect insulation</li>
                          <li>• <strong>Fault investigation:</strong> When investigating electrical problems</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-white mb-2">Documentation Requirements</h4>
                        <p className="text-xs sm:text-sm text-white mb-2">
                          Test results must be recorded on the appropriate certificates as specified in BS 7671:
                        </p>
                        <ul className="text-xs sm:text-sm text-white space-y-1 pl-4">
                          <li>• <strong>Electrical Installation Certificate (EIC):</strong> For new installations and major alterations</li>
                          <li>• <strong>Minor Works Certificate (MWC):</strong> For small additions, alterations, and replacements</li>
                          <li>• <strong>Electrical Installation Condition Report (EICR):</strong> For periodic inspections and condition reports</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-white mb-2">Legal Framework</h4>
                        <div className="bg-card border border-orange-500/20 rounded p-3 mb-3">
                          <p className="text-xs sm:text-sm text-white mb-2"><strong>Electricity at Work Regulations 1989:</strong></p>
                          <ul className="text-xs sm:text-sm text-white space-y-1 pl-4">
                            <li>• Regulation 4: Systems shall be constructed, maintained and worked to prevent danger</li>
                            <li>• Regulation 14: No person shall work on equipment unless suitable precautions are taken</li>
                            <li>• Regulation 29: Defence to prove all reasonable steps were taken</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-white mb-2">Professional Responsibilities</h4>
                        <p className="text-xs sm:text-sm text-white mb-2">
                          Qualified electricians have both professional and legal obligations to:
                        </p>
                        <ul className="text-xs sm:text-sm text-white space-y-1 pl-4">
                          <li>• Carry out all required tests before energising circuits</li>
                          <li>• Record results accurately and legibly</li>
                          <li>• Not energise circuits that fail tests</li>
                          <li>• Investigate and rectify any unsatisfactory results</li>
                          <li>• Provide appropriate certificates to clients</li>
                          <li>• Maintain competence through continuing professional development</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-white mb-2">Duty Holder Responsibilities</h4>
                        <p className="text-xs sm:text-sm text-white mb-2">
                          Under the Electricity at Work Regulations 1989, duty holders (employers, building owners, facility managers) must ensure electrical systems remain safe. This includes:
                        </p>
                        <ul className="text-xs sm:text-sm text-white space-y-1 pl-4">
                          <li>• Appointing competent persons for electrical work</li>
                          <li>• Ensuring proper testing and certification is carried out</li>
                          <li>• Maintaining records of all electrical work</li>
                          <li>• Arranging periodic inspection and testing</li>
                        </ul>
                      </div>

                      <div className="bg-card border border-orange-500/20 rounded p-3">
                        <p className="text-sm font-medium text-orange-700 dark:text-elec-yellow">
                          Carrying out and recording insulation resistance tests is a direct way of proving that these legal duties have been met and demonstrating due diligence in electrical safety.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="legal-check"
            question="Which regulation requires employers and electricians to ensure that electrical systems remain safe at all times?"
            options={["BS 7671", "Electricity at Work Regulations 1989", "Health and Safety at Work Act", "Building Regulations"]}
            correctIndex={1}
            explanation="The Electricity at Work Regulations 1989 place a legal duty on employers and employees to ensure that electrical systems are maintained in a safe condition at all times."
          />

          {/* 4. Consequences of Skipping IR Testing */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-3">Consequences of Skipping IR Testing</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-white mb-2">Immediate Safety Risks</h4>
                        <p className="text-xs sm:text-sm text-white mb-2">
                          If insulation resistance testing is not performed, dangerous faults may remain hidden until they cause serious incidents. These hidden faults can manifest in various ways:
                        </p>
                        <ul className="text-xs sm:text-sm text-white space-y-1 pl-4">
                          <li>• <strong>Electric shock or electrocution:</strong> Compromised insulation can make normally safe surfaces live</li>
                          <li>• <strong>Fire hazards:</strong> High resistance faults generate heat, potentially igniting combustible materials</li>
                          <li>• <strong>Equipment damage:</strong> Leakage currents can destroy expensive electronic equipment</li>
                          <li>• <strong>System instability:</strong> RCDs may trip frequently, causing disruption and inconvenience</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-white mb-2">Real-World Scenarios</h4>
                        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded p-3 mb-3">
                          <p className="text-xs sm:text-sm text-white mb-2"><strong>Water Ingress Example:</strong></p>
                          <p className="text-xs sm:text-sm text-white mb-2">Water penetration into a junction box creates a conductive path to earth. Without prior IR testing, this could cause:</p>
                          <ul className="text-xs sm:text-sm text-white space-y-1 pl-4">
                            <li>• Immediate RCD tripping when energised</li>
                            <li>• Potential electrocution of anyone touching the affected circuit</li>
                            <li>• Arcing and fire if the fault develops further</li>
                          </ul>
                        </div>

                        <div className="bg-card border border-border/30 rounded p-3 mb-3">
                          <p className="text-xs sm:text-sm text-white mb-2"><strong>Mechanical Damage Example:</strong></p>
                          <p className="text-xs sm:text-sm text-white mb-2">A drill bit nicks a cable during installation. Without IR testing:</p>
                          <ul className="text-xs sm:text-sm text-white space-y-1 pl-4">
                            <li>• The damage may not be immediately apparent</li>
                            <li>• Gradual moisture ingress weakens insulation further</li>
                            <li>• Complete breakdown occurs weeks or months later</li>
                            <li>• Potential injury to unsuspecting building occupants</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-white mb-2">Legal and Professional Consequences</h4>
                        <p className="text-xs sm:text-sm text-white mb-2">
                          Beyond immediate safety risks, failing to carry out IR testing constitutes a serious breach of professional and legal standards:
                        </p>
                        <ul className="text-xs sm:text-sm text-white space-y-1 pl-4">
                          <li>• <strong>Criminal prosecution:</strong> Under the Electricity at Work Regulations 1989</li>
                          <li>• <strong>Civil liability:</strong> Compensation claims for injury or property damage</li>
                          <li>• <strong>Invalid insurance:</strong> Insurers may refuse claims for work not compliant with BS 7671</li>
                          <li>• <strong>Professional sanctions:</strong> Disciplinary action by registration bodies</li>
                          <li>• <strong>Loss of competence status:</strong> Removal from approved contractor schemes</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-white mb-2">Business Impact</h4>
                        <ul className="text-xs sm:text-sm text-white space-y-1 pl-4">
                          <li>• <strong>Reputation damage:</strong> Loss of client trust and future work opportunities</li>
                          <li>• <strong>Financial penalties:</strong> Fines, compensation payments, and legal costs</li>
                          <li>• <strong>Increased scrutiny:</strong> Enhanced inspection regimes from enforcement authorities</li>
                          <li>• <strong>Higher insurance premiums:</strong> Increased costs due to claims history</li>
                          <li>• <strong>Remedial work costs:</strong> Expensive emergency callouts and repair work</li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-white mb-2">Case Study Consequences</h4>
                        <div className="bg-card border border-red-500/20 rounded p-3 mb-3">
                          <p className="text-xs sm:text-sm text-white mb-2"><strong>Commercial Office Fire (2019):</strong></p>
                          <p className="text-xs sm:text-sm text-white mb-2">An electrical contractor skipped IR testing during office refurbishment to meet a tight deadline. Six months later:</p>
                          <ul className="text-xs sm:text-sm text-white space-y-1 pl-4">
                            <li>• Fire broke out due to damaged cable in ceiling void</li>
                            <li>• Building evacuated, significant smoke damage</li>
                            <li>• Investigation revealed no test certificates on file</li>
                            <li>• Contractor faced £200,000 compensation claim</li>
                            <li>• Director received 6-month suspended prison sentence</li>
                            <li>• Company removed from major contractor approved lists</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-card border border-red-500/20 rounded p-3">
                        <p className="text-sm font-medium text-red-700 dark:text-elec-yellow">
                          Electricians who neglect this essential test risk not only their own reputation and livelihood but also the safety and lives of those using the installation. There is no acceptable excuse for skipping IR testing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="consequences-check"
            question="What are two possible consequences of not performing insulation resistance testing on an installation?"
            options={["Faster completion and happy clients", "Hidden faults leading to fire/shock and legal prosecution", "Better insulation and lower costs", "Improved performance and reliability"]}
            correctIndex={1}
            explanation="Not performing IR testing can lead to hidden faults causing fire or electric shock, and can result in legal prosecution for failing to meet statutory duties under EAWR 1989."
          />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Practical Guidance</h2>
          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-white">
            <p>
              Always carry out insulation resistance tests before energising a new or modified circuit. Use the correct test instrument and follow the procedure in BS 7671. Sensitive equipment such as electronic devices should be disconnected before testing to avoid damage.
            </p>
            <p>
              Record every result carefully, making sure it is linked to the circuit it relates to. If any readings fall below the acceptable limits set out in the regulations, do not energise until the fault has been identified and rectified.
            </p>
            <div className="bg-card p-3 sm:p-4 rounded-lg border border-border/30">
              <h4 className="font-medium text-white mb-2">Key Testing Points:</h4>
              <ul className="space-y-1 text-xs sm:text-sm">
                <li>• Test between Line-Neutral, Line-Earth, and Neutral-Earth</li>
                <li>• Use appropriate test voltage (250V, 500V, or 1000V DC)</li>
                <li>• Disconnect sensitive equipment before testing</li>
                <li>• Record actual measured values, not just pass/fail</li>
                <li>• Ensure readings meet BS 7671 minimum requirements</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Real-World Example</h2>
          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-white">
            <div className="bg-card p-3 sm:p-4 rounded-lg border border-border/30">
              <h4 className="font-medium text-white mb-2">Commercial Refurbishment Project</h4>
              <p className="text-xs sm:text-sm mb-2 sm:mb-3">
                During a commercial refurbishment, a contractor assumed that new wiring installed by their team was in perfect condition and skipped the insulation resistance tests to save time. Weeks later, when the building was occupied, moisture from a roof leak seeped into a cable joint, lowering the insulation resistance dramatically.
              </p>
              <p className="text-xs sm:text-sm mb-2 sm:mb-3">
                This led to nuisance tripping of protective devices and an eventual small fire in a ceiling void. When the incident was investigated, the absence of recorded test results meant the contractor could not demonstrate compliance. They were forced to pay for retesting and repairs, as well as facing criticism from the client.
              </p>
              <div className="mt-3 sm:mt-4 p-2 sm:p-3 border border-elec-yellow/20 rounded">
                <p className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-elec-yellow">
                  ✅ Lesson: Carrying out and recording insulation resistance tests protects lives, property, and professional credibility.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">FAQs</h2>
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-l-primary/30 pl-3 sm:pl-4">
                <p className="font-medium text-white mb-1 sm:mb-2 text-sm sm:text-base">Q: {faq.question}</p>
                <p className="text-xs sm:text-sm text-white">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Pocket Guide: IR Testing Essentials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="space-y-2">
              <h4 className="font-medium text-white">Before Testing:</h4>
              <ul className="space-y-1 text-white">
                <li>• Disconnect sensitive equipment</li>
                <li>• Check test instrument calibration</li>
                <li>• Ensure circuit is isolated</li>
                <li>• Remove any parallel paths</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-white">Minimum Values (BS 7671):</h4>
              <ul className="space-y-1 text-white">
                <li>• SELV/PELV circuits: ≥0.25 MΩ</li>
                <li>• Up to 500V circuits: ≥1.0 MΩ</li>
                <li>• Above 500V circuits: ≥1.0 MΩ</li>
                <li>• Record actual values measured</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Recap</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-card p-3 sm:p-4 rounded-lg border border-border/30">
              <h4 className="font-medium text-white mb-2">Safety Purpose</h4>
              <p className="text-xs sm:text-xs sm:text-sm text-white">
                Insulation resistance testing ensures that cable and equipment insulation is intact and effective at preventing leakage currents that could cause fire, shock, or injury.
              </p>
            </div>
            <div className="bg-card p-3 sm:p-4 rounded-lg border border-border/30">
              <h4 className="font-medium text-white mb-2">Legal Requirement</h4>
              <p className="text-xs sm:text-xs sm:text-sm text-white">
                It is a requirement of BS 7671 and the Electricity at Work Regulations 1989. Test results must be recorded on appropriate certificates.
              </p>
            </div>
            <div className="bg-card p-3 sm:p-4 rounded-lg border border-border/30">
              <h4 className="font-medium text-white mb-2">Professional Protection</h4>
              <p className="text-xs sm:text-xs sm:text-sm text-white">
                Proper testing and documentation protects electricians from prosecution, invalid insurance claims, and loss of professional reputation.
              </p>
            </div>
            <div className="bg-card p-3 sm:p-4 rounded-lg border border-border/30">
              <h4 className="font-medium text-white mb-2">Hidden Dangers</h4>
              <p className="text-xs sm:text-xs sm:text-sm text-white">
                Without testing, dangerous faults could remain hidden, leading to fire, shock, or injury when circuits are energised.
              </p>
            </div>
          </div>
        </Card>

        <Separator className="my-6 sm:my-8" />

        {/* Quiz */}
        <div className="mb-6 sm:mb-8">
          <Quiz 
            questions={quizQuestions} 
            title="Test Your Knowledge: Purpose of Insulation Resistance Testing"
          />
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-white/10">
          <Button variant="outline" className="w-full sm:w-auto min-h-[44px] touch-manipulation" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.5
            </Link>
          </Button>
          <Button className="w-full sm:w-auto min-h-[44px] touch-manipulation" asChild>
            <Link to="../5-2">
              Next: Test Methods and Procedures
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section5_1;