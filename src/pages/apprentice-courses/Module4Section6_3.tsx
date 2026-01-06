import { ArrowLeft, ArrowRight, Zap, Target, CheckCircle, AlertTriangle, Search, TrendingUp, Shield, Activity, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Basic Insulation Resistance Testing (Introduction Only) - Module 4.6.3 | Level 2 Electrical Course";
const DESCRIPTION = "Master the fundamentals of insulation resistance testing for electrical installations. Learn principles, procedures, and safety requirements for verifying installation integrity.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the unit of measurement for insulation resistance?",
    options: ["Ohms", "Megohms (MΩ)", "Volts", "Amperes"],
    correctIndex: 1,
    explanation: "Insulation resistance is measured in megohms (MΩ), which represents millions of ohms. This large unit reflects the very high resistance values expected from good insulation."
  },
  {
    id: 2,
    question: "When should you carry out an insulation resistance test?",
    options: ["Only after faults occur", "Before energising new circuits", "Only on old installations", "During live working"],
    correctIndex: 1,
    explanation: "Insulation resistance testing should be performed before energising new circuits, during periodic inspections, and after alterations to ensure safety and compliance."
  },
  {
    id: 3,
    question: "Name one common cause of low insulation resistance.",
    options: ["High load current", "Moisture ingress", "Correct cable size", "Proper earthing"],
    correctIndex: 1,
    explanation: "Moisture ingress is a common cause of low insulation resistance, as water provides a path for current leakage through insulation materials."
  }
];

const Module4Section6_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What does insulation resistance measure?",
      options: [
        "The heat output of a cable",
        "The ability of insulation to resist current flow",
        "Voltage drop in a circuit",
        "Cable bending radius"
      ],
      correctAnswer: 1,
      explanation: "Insulation resistance measures the ability of insulating materials to resist current flow, preventing dangerous leakage currents."
    },
    {
      id: 2,
      question: "True or False: A reading of 0.5 MΩ is acceptable for most LV circuits.",
      options: [
        "True",
        "False",
        "Only for lighting circuits",
        "Only for power circuits"
      ],
      correctAnswer: 1,
      explanation: "False - BS 7671 requires a minimum of 1 MΩ for most LV circuits. A reading of 0.5 MΩ is below this minimum and unsatisfactory."
    },
    {
      id: 3,
      question: "What is the typical test voltage for LV circuits in insulation resistance testing?",
      options: [
        "250 V DC",
        "500 V DC",
        "1000 V DC",
        "230 V AC"
      ],
      correctAnswer: 1,
      explanation: "500 V DC is the typical test voltage for most LV circuits, though 250 V DC is used for SELV or sensitive circuits."
    },
    {
      id: 4,
      question: "Name two points between which you would measure insulation resistance.",
      options: [
        "L–N and L–E",
        "Only L–N",
        "Only L–E",
        "Only N–E"
      ],
      correctAnswer: 0,
      explanation: "Insulation resistance is measured between Line to Neutral (L–N), Line to Earth (L–E), and Neutral to Earth (N–E)."
    },
    {
      id: 5,
      question: "What is the minimum acceptable reading for most LV circuits under BS 7671?",
      options: [
        "0.5 MΩ",
        "1 MΩ",
        "10 MΩ",
        "100 MΩ"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 requires a minimum of 1 MΩ for most LV circuits, though higher values are preferable for better safety margins."
    },
    {
      id: 6,
      question: "Why should sensitive equipment be disconnected before testing?",
      options: [
        "To prevent damage from the high test voltage",
        "To reduce test time",
        "To improve accuracy",
        "For convenience only"
      ],
      correctAnswer: 0,
      explanation: "Sensitive electronic equipment must be disconnected to prevent damage from the high DC test voltage used during insulation resistance testing."
    },
    {
      id: 7,
      question: "What should you do if you get a reading below the minimum value?",
      options: [
        "Continue with installation",
        "Investigate and rectify the fault before re-testing",
        "Lower the test voltage",
        "Accept the reading as borderline"
      ],
      correctAnswer: 1,
      explanation: "Readings below the minimum value indicate a fault that must be investigated and corrected before the installation can be certified."
    },
    {
      id: 8,
      question: "Give one environmental factor that can lower insulation resistance.",
      options: [
        "High ambient temperature",
        "Moisture ingress",
        "Low ambient temperature",
        "Good ventilation"
      ],
      correctAnswer: 1,
      explanation: "Moisture ingress is a major environmental factor that reduces insulation resistance by providing conductive paths through insulation."
    }
  ];

  const faqs = [
    {
      question: "Can insulation resistance testing be done on live circuits?",
      answer: "No — it must be done with the circuit safely isolated. Insulation resistance testing requires high DC voltages that would be dangerous on live circuits and could damage equipment."
    },
    {
      question: "What happens if my readings are just under 1 MΩ?",
      answer: "Investigate and correct faults; under BS 7671, results below the minimum are considered unsatisfactory and must be rectified before the installation can be certified."
    },
    {
      question: "Is it necessary to record insulation resistance values on certificates?",
      answer: "Yes — these values are recorded on the Electrical Installation Certificate or Schedule of Test Results as evidence of compliance with safety standards."
    },
    {
      question: "How often should insulation resistance testing be performed?",
      answer: "Testing should be performed on new installations, during periodic inspections (typically every 5-10 years depending on installation type), and after any alterations or additions."
    },
    {
      question: "What equipment might be damaged by insulation resistance testing?",
      answer: "Electronic equipment such as dimmer switches, electronic timers, computer equipment, and any devices containing semiconductors can be damaged by the high DC test voltage."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Gauge className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 4.6.3
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Basic Insulation Resistance Testing (Introduction Only)
          </h1>
          <p className="text-white">
            Master the fundamentals of insulation resistance testing to verify installation safety and ensure compliance with BS 7671 requirements.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Insulation resistance testing verifies safety by measuring current leakage prevention.</li>
                <li>Poor insulation can cause electric shock, short circuits, or fire hazards.</li>
                <li>Testing must follow BS 7671 procedures and be carried out by competent persons.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Insulation damage, moisture ingress, deterioration signs.</li>
                <li><strong>Use:</strong> Insulation resistance testers, systematic procedures, safety protocols.</li>
                <li><strong>Check:</strong> Minimum values, compliance standards, equipment protection.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Explain what insulation resistance is and why it's critical for electrical safety and system integrity.</li>
            <li>Identify when insulation resistance testing should be performed and the regulatory requirements.</li>
            <li>Recognise the tools and equipment required for safe and effective insulation resistance testing.</li>
            <li>Understand acceptable test values for domestic and commercial installations under BS 7671.</li>
            <li>Apply basic safety precautions before and during testing to prevent equipment damage and ensure personnel safety.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Understanding Insulation Resistance */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Understanding Insulation Resistance Fundamentals</h3>
            <p className="text-base text-white mb-4">
              Insulation resistance testing verifies the integrity of electrical insulation systems, ensuring safe operation and regulatory compliance:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">Insulation Resistance Principles and Measurement</p>
                    <p className="text-base text-white mb-2"><strong>Definition and properties:</strong> The ability of insulating materials to resist current flow.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Measured in megohms (MΩ) representing millions of ohms resistance</li>
                      <li>High resistance values indicate effective insulation integrity</li>
                      <li>Low values suggest insulation deterioration, damage, or contamination</li>
                      <li>Critical for preventing dangerous leakage currents and electrical faults</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Safety significance:</strong> Poor insulation creates serious hazards requiring immediate attention.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Electric shock risk from exposed conductive parts becoming live</li>
                      <li>Short circuit potential leading to protective device operation</li>
                      <li>Fire hazards from excessive current leakage and overheating</li>
                      <li>Equipment damage from incorrect current paths and voltage levels</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Measurement principles:</strong> High voltage DC testing reveals insulation condition.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>DC voltage applied between conductors stresses insulation safely</li>
                      <li>Resulting current flow indicates insulation resistance value</li>
                      <li>Higher test voltages reveal insulation weaknesses more effectively</li>
                      <li>Temperature and humidity conditions affect measurement accuracy</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Critical testing:</strong> Insulation resistance verification is mandatory before circuit energisation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="measurement-unit-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Purpose and Testing Requirements */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Testing Purpose and Regulatory Requirements</h3>
            <p className="text-base text-white mb-4">
              Insulation resistance testing ensures installations meet safety standards and regulatory compliance before energisation:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Testing Objectives and Regulatory Framework</p>
                    <p className="text-base text-white mb-2"><strong>Fault detection purposes:</strong> Identifying insulation damage before hazards develop.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Detects damage caused during cable installation, pulling, or termination</li>
                      <li>Identifies deterioration from environmental factors over time</li>
                      <li>Reveals contamination from moisture, dust, or chemical exposure</li>
                      <li>Confirms insulation integrity after installation modifications</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Compliance verification:</strong> Meeting BS 7671 minimum standards and safety requirements.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Minimum 1 MΩ for most LV systems as required by BS 7671</li>
                      <li>Higher values preferred for enhanced safety margins and reliability</li>
                      <li>Specific requirements for different circuit types and applications</li>
                      <li>Documentation requirements for certification and compliance records</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Testing schedule requirements:</strong> When insulation resistance testing must be performed.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Before energising new circuits for initial verification</li>
                      <li>During periodic inspection and testing cycles</li>
                      <li>After alterations, additions, or repairs to existing installations</li>
                      <li>Following environmental incidents or suspected damage</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Preventive approach:</strong> Testing prevents hazards by identifying problems before energisation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="testing-timing-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Testing Procedure */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Systematic Testing Procedures and Safety Protocols</h3>
            <p className="text-base text-white mb-4">
              Following structured procedures ensures accurate results while maintaining safety throughout the testing process:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-1">Professional Testing Methodology and Equipment Protection</p>
                    <p className="text-base text-white mb-2"><strong>Pre-testing safety procedures:</strong> Essential preparation for safe and accurate testing.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Isolate circuit completely using main switch or appropriate protective device</li>
                      <li>Lock off isolator and apply warning notices to prevent re-energisation</li>
                      <li>Verify isolation using approved voltage indicator and proving unit</li>
                      <li>Identify and protect sensitive equipment from high test voltages</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Equipment protection requirements:</strong> Preventing damage to sensitive devices during testing.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Disconnect electronic devices, dimmers, and timing equipment</li>
                      <li>Remove or link out electronic components vulnerable to DC voltage</li>
                      <li>Protect surge protective devices and electronic accessories</li>
                      <li>Consider temporary connections to maintain circuit continuity</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Testing sequence and measurements:</strong> Systematic approach for comprehensive verification.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Line to Neutral (L–N): Tests insulation between live conductors</li>
                      <li>Line to Earth (L–E): Verifies live conductor to earth insulation</li>
                      <li>Neutral to Earth (N–E): Checks neutral conductor earth insulation</li>
                      <li>Select appropriate test voltage: 500V DC for LV, 250V DC for SELV</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Result recording and analysis:</strong> Proper documentation and interpretation procedures.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Press test button and record stable readings after settling time</li>
                      <li>Compare results against BS 7671 minimum requirements</li>
                      <li>Document all measurements with circuit identification details</li>
                      <li>Note any equipment disconnected or special test conditions</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Competent person requirement:</strong> Testing must be performed by qualified personnel
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="fault-causes-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Result Interpretation and Common Issues */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Result Interpretation and Common Insulation Faults</h3>
            <p className="text-base text-white mb-4">
              Understanding test results and common fault causes enables effective problem identification and resolution:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-amber-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-600 dark:text-amber-400 mb-1">Professional Result Analysis and Fault Diagnosis</p>
                    <p className="text-base text-white mb-2"><strong>Acceptable test values:</strong> BS 7671 requirements and industry best practices.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>≥ 1 MΩ: Pass for most LV circuits under BS 7671 requirements</li>
                      <li>Higher values (&gt;10 MΩ): Preferred for enhanced safety and reliability</li>
                      <li>&lt; 1 MΩ: Unsatisfactory - requires investigation and rectification</li>
                      <li>Trending values: Monitor changes over time for preventive maintenance</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Installation-related fault causes:</strong> Common problems during installation process.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Cable insulation damaged during pulling through conduit or trunking</li>
                      <li>Excessive conductor stripping exposing insulation to contamination</li>
                      <li>Physical damage from sharp edges or inappropriate handling</li>
                      <li>Incorrect storage allowing moisture absorption before installation</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Environmental degradation factors:</strong> External influences reducing insulation effectiveness.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Moisture ingress in outdoor circuits or damp locations</li>
                      <li>Overheating from overloading causing insulation deterioration</li>
                      <li>Chemical contamination in industrial or aggressive environments</li>
                      <li>UV degradation of outdoor cable insulation materials</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Installation quality issues:</strong> Workmanship factors affecting insulation integrity.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Poor termination techniques allowing moisture or contaminant entry</li>
                      <li>Inadequate sealing of cable entries and junction boxes</li>
                      <li>Inappropriate cable selection for environmental conditions</li>
                      <li>Insufficient protection during subsequent building work</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Investigation required:</strong> All low readings must be investigated and corrected
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
          
          {/* Tools and Equipment */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Essential Equipment and Professional Testing Techniques</h3>
            <div className="space-y-4">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium text-white mb-2">Required Testing Equipment</p>
                <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                  <li>Insulation resistance tester with appropriate voltage ranges (250V, 500V, 1000V)</li>
                  <li>Lock-off kit for secure isolation and warning notice placement</li>
                  <li>Approved voltage indicator for isolation verification</li>
                  <li>Proving unit to test voltage indicator operation</li>
                  <li>Insulated test leads rated for high voltage DC testing</li>
                  <li>Equipment labels for marking disconnected sensitive devices</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <p className="font-medium text-white mb-2">Professional Testing Best Practices</p>
                <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                  <li>Always disconnect sensitive equipment before testing to prevent damage</li>
                  <li>Perform testing before accessories are connected for highest accuracy</li>
                  <li>Allow readings to stabilise before recording final values</li>
                  <li>Test in consistent environmental conditions when possible</li>
                  <li>Use systematic approach working through each circuit methodically</li>
                  <li>Re-test after making any corrections or repairs</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                <p className="font-medium text-white mb-2">Field Testing Example Scenario</p>
                <p className="text-xs sm:text-sm text-white mb-2">
                  <strong>Industrial Lighting Circuit Discovery:</strong> During testing of an industrial lighting circuit, a low insulation resistance reading was obtained. Investigation revealed a cracked conduit fitting allowing water ingress, contaminating the cable insulation.
                </p>
                <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                  <li>Initial reading: 0.3 MΩ (below 1 MΩ minimum)</li>
                  <li>Action: Systematic investigation of circuit components</li>
                  <li>Discovery: Water ingress through damaged conduit fitting</li>
                  <li>Resolution: Replace fitting, dry cables, re-terminate connections</li>
                  <li>Re-test result: Above 200 MΩ (excellent insulation integrity)</li>
                </ul>
              </div>
            </div>
          </section>
        </Card>

        {/* What this means on site */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">What this means on site</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <h3 className="font-medium text-white mb-2">Implementation Strategy</h3>
                <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                  <li>Schedule testing before final connection of accessories</li>
                  <li>Ensure competent person availability for testing procedures</li>
                  <li>Prepare equipment protection procedures for sensitive devices</li>
                  <li>Plan systematic testing sequence for efficiency</li>
                </ul>
              </div>
              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <h3 className="font-medium text-white mb-2">Quality Control</h3>
                <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                  <li>Establish minimum acceptable values for project standards</li>
                  <li>Document all test results with circuit identification</li>
                  <li>Investigate any readings below BS 7671 minimums</li>
                  <li>Maintain calibrated test equipment in good condition</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                <h3 className="font-medium text-white mb-2">Risk Management</h3>
                <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                  <li>Never energise circuits with unsatisfactory test results</li>
                  <li>Protect cables during construction to prevent damage</li>
                  <li>Monitor environmental conditions affecting insulation</li>
                  <li>Plan remedial work for any failed test results</li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <h3 className="font-medium text-white mb-2">Documentation Requirements</h3>
                <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                  <li>Record all insulation resistance values on certificates</li>
                  <li>Document equipment disconnected during testing</li>
                  <li>Note environmental conditions during testing</li>
                  <li>Maintain test equipment calibration records</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Installation Practices */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Installation Practices</h2>
          <div className="space-y-6">
            <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
              <h3 className="font-medium text-green-600 dark:text-green-400 mb-3">Best Practice Implementation</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-white mb-2">Pre-Testing Preparation</p>
                  <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                    <li>Plan testing schedule to align with installation stages</li>
                    <li>Identify and catalog sensitive equipment requiring protection</li>
                    <li>Ensure proper test equipment calibration and availability</li>
                    <li>Prepare isolation and lock-off procedures</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Cable Protection Strategy</p>
                  <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                    <li>Handle cables carefully during installation to prevent damage</li>
                    <li>Store cables in dry conditions before installation</li>
                    <li>Protect installed cables from subsequent building work</li>
                    <li>Use appropriate cable types for environmental conditions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
              <h3 className="font-medium text-elec-yellow dark:text-elec-yellow mb-3">Professional Standards</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-white mb-2">Testing Excellence</p>
                  <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                    <li>Follow systematic testing procedures consistently</li>
                    <li>Allow adequate time for thorough testing</li>
                    <li>Record all results immediately and accurately</li>
                    <li>Investigate any unexpected or borderline readings</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Safety Compliance</p>
                  <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                    <li>Ensure only competent persons perform testing</li>
                    <li>Use appropriate PPE during testing procedures</li>
                    <li>Maintain safe working practices throughout</li>
                    <li>Follow manufacturer instructions for test equipment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Common Mistakes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Common Mistakes</h2>
          <div className="space-y-4">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <h3 className="font-medium text-red-600 dark:text-elec-yellow mb-3">Testing Procedure Errors</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-white mb-2">❌ Avoid These Mistakes:</p>
                  <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                    <li>Testing circuits without proper isolation verification</li>
                    <li>Failing to disconnect sensitive electronic equipment</li>
                    <li>Using incorrect test voltages for different circuit types</li>
                    <li>Accepting borderline readings without investigation</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">✅ Do This Instead:</p>
                  <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                    <li>Always isolate and verify before testing</li>
                    <li>Protect all sensitive equipment before applying test voltage</li>
                    <li>Select appropriate test voltage for circuit type</li>
                    <li>Investigate and resolve all questionable readings</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
              <h3 className="font-medium text-amber-600 dark:text-amber-400 mb-3">Equipment and Documentation Errors</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-white mb-2">❌ Poor Practices:</p>
                  <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                    <li>Using uncalibrated or damaged test equipment</li>
                    <li>Poor documentation of test results and conditions</li>
                    <li>Rushing through testing to meet deadlines</li>
                    <li>Not re-testing after making corrections</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">✅ Professional Approach:</p>
                  <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                    <li>Use properly calibrated test equipment</li>
                    <li>Document all results clearly with circuit details</li>
                    <li>Allow adequate time for thorough testing</li>
                    <li>Always verify repairs with re-testing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* BS 7671 Context */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">BS 7671 Context</h2>
          <div className="space-y-4">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
              <h3 className="font-medium text-white mb-2">Regulatory Requirements</h3>
              <ul className="text-xs sm:text-sm text-white space-y-2 list-disc pl-4">
                <li><strong>Part 6:</strong> Inspection and Testing requirements including insulation resistance testing procedures</li>
                <li><strong>Regulation 612.3:</strong> Insulation resistance testing requirements and minimum acceptable values</li>
                <li><strong>Table 61:</strong> Minimum insulation resistance values for different circuit types and voltages</li>
                <li><strong>Regulation 612.3.2:</strong> Test voltage selection criteria for different installation categories</li>
                <li><strong>IET Guidance Note 3:</strong> Detailed procedures and best practices for insulation resistance testing</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
              <h3 className="font-medium text-green-600 dark:text-green-400 mb-2">Testing Standards and Values</h3>
              <ul className="text-xs sm:text-sm text-white space-y-2 list-disc pl-4">
                <li>Minimum 1 MΩ for circuits operating at nominal voltages up to 500V</li>
                <li>Higher values required for installations above 500V nominal voltage</li>
                <li>Test voltage selection: 250V DC for SELV, 500V DC for LV circuits</li>
                <li>Environmental factors affecting acceptable readings and test procedures</li>
                <li>Documentation requirements for test certificates and compliance records</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-world Scenarios */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-world Scenario</h2>
          <div className="space-y-4">
            <div className="rounded-lg p-5 border-l-4 border-l-amber-500 ">
              <h3 className="font-medium text-amber-600 dark:text-amber-400 mb-3">Domestic Rewire Project - Critical Insulation Fault Detection</h3>
              <div className="space-y-3">
                <p className="text-base text-white">
                  <strong>Situation:</strong> During the final testing phase of a complete domestic rewire, an electrician was performing insulation resistance testing on all newly installed circuits before energisation and certification.
                </p>
                <p className="text-base text-white">
                  <strong>Discovery:</strong> The upstairs lighting circuit showed an insulation resistance reading of only 0.5 MΩ between line and earth, well below the required 1 MΩ minimum. All other circuits tested satisfactorily with readings above 50 MΩ.
                </p>
                <p className="text-base text-white">
                  <strong>Investigation:</strong> Systematic testing of individual light points revealed the fault was localized to one section of the circuit. Further investigation found a cable had been pierced by a plasterboard fixing screw during the finishing work.
                </p>
                <p className="text-base text-white">
                  <strong>Resolution:</strong> The damaged cable section was identified and replaced. The affected area was made good, and retesting confirmed readings above 100 MΩ throughout the circuit.
                </p>
                <p className="text-base text-white">
                  <strong>Outcome:</strong> Early detection prevented a serious safety hazard. If the circuit had been energised with the damaged insulation, it could have resulted in electric shock risk or fire hazard. The installation was completed safely and passed all subsequent tests.
                </p>
                <div className="rounded-lg p-3 border border-green-400/30 mt-3">
                  <p className="text-xs sm:text-sm text-white font-medium">
                    💡 Key Learning: Insulation resistance testing is essential for detecting hidden damage that visual inspection cannot reveal, preventing dangerous conditions before energisation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Frequently Asked Questions */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-lg p-4 bg-muted/30 border border-white/10">
                <h3 className="font-medium text-white mb-2">Q: {faq.question}</h3>
                <p className="text-xs sm:text-sm text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Summary</h2>
          <div className="space-y-4">
            <p className="text-base text-white">
              Insulation resistance testing is a critical safety verification procedure that measures the effectiveness of electrical insulation systems. High resistance values indicate good insulation integrity, while low values suggest potential hazards requiring immediate investigation and correction.
            </p>
            
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <h3 className="font-medium text-elec-yellow dark:text-elec-yellow mb-2">Safety Assurance</h3>
                <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                  <li>Prevents electric shock hazards</li>
                  <li>Reduces fire risk from leakage</li>
                  <li>Ensures regulatory compliance</li>
                  <li>Protects equipment integrity</li>
                </ul>
              </div>
              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <h3 className="font-medium text-green-600 dark:text-green-400 mb-2">Technical Excellence</h3>
                <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                  <li>Systematic testing procedures</li>
                  <li>Accurate result interpretation</li>
                  <li>Professional documentation</li>
                  <li>Equipment protection protocols</li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <h3 className="font-medium text-purple-600 dark:text-elec-yellow mb-2">Quality Outcomes</h3>
                <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                  <li>Early fault detection</li>
                  <li>Reduced rework costs</li>
                  <li>Enhanced reliability</li>
                  <li>Professional standards</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Apprentice Do's and Don'ts */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Apprentice Do's and Don'ts</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3">
              <h3 className="font-medium text-green-600 dark:text-green-400">✅ DO</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Always isolate circuits completely and verify isolation before testing
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Disconnect all sensitive electronic equipment before applying test voltage
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Use appropriate test voltages for different circuit types
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Record all test results with proper circuit identification
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Investigate any readings below minimum acceptable values
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium text-red-600 dark:text-elec-yellow">❌ DON'T</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Attempt testing on live circuits - always isolate first
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Apply test voltage to circuits with connected electronic devices
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Accept readings below 1 MΩ without proper investigation
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Use uncalibrated or damaged test equipment
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Energise circuits with unsatisfactory test results
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Pocket Card Quick Reference */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Pocket Card Quick Reference</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
              <h3 className="font-medium text-white mb-3">Testing Procedure Checklist</h3>
              <ul className="text-xs text-white space-y-1 list-disc pl-4">
                <li>✓ Circuit isolated and locked off safely</li>
                <li>✓ Isolation verified with approved voltage indicator</li>
                <li>✓ Sensitive equipment disconnected or protected</li>
                <li>✓ Correct test voltage selected (250V/500V DC)</li>
                <li>✓ Test L–N, L–E, N–E combinations</li>
                <li>✓ Readings ≥1 MΩ (higher preferred)</li>
                <li>✓ Results documented with circuit identification</li>
                <li>✓ Any faults investigated and corrected</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
              <h3 className="font-medium text-green-600 dark:text-green-400 mb-3">Equipment and Values</h3>
              <ul className="text-xs text-white space-y-1 list-disc pl-4">
                <li>📊 Insulation resistance tester (calibrated)</li>
                <li>🔒 Lock-off kit and warning notices</li>
                <li>⚡ Voltage indicator and proving unit</li>
                <li>✅ Minimum: 1 MΩ (BS 7671 requirement)</li>
                <li>⚙️ Test voltage: 500V DC (LV circuits)</li>
                <li>⚙️ Test voltage: 250V DC (SELV circuits)</li>
                <li>🏷️ Equipment protection labels</li>
                <li>📋 Test result recording sheets</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Key References */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Key References</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-white mb-2">Regulatory Standards</h3>
              <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                <li>BS 7671:2018+A2:2022 - Part 6 Inspection and Testing</li>
                <li>IET Guidance Note 3 - Inspection & Testing procedures</li>
                <li>IET On-Site Guide - Testing requirements</li>
                <li>Electricity at Work Regulations 1989</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white mb-2">Technical Guidance</h3>
              <ul className="text-xs sm:text-sm text-white space-y-1 list-disc pl-4">
                <li>City & Guilds 2391 Testing Course Materials</li>
                <li>NICEIC Technical Manual</li>
                <li>ECA Guide to Testing</li>
                <li>Manufacturer test equipment manuals</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Knowledge Check */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Knowledge Check</h2>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between pt-8 border-t border-white/10">
          <Button asChild variant="outline">
            <Link to="../6-2" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="../6-4" className="flex items-center gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section6_3;