import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Basic Insulation Resistance Testing (Introduction Only) - Module 4.6.3 | Level 2 Electrical Course";
const DESCRIPTION = "Master the fundamentals of insulation resistance testing for electrical installations. Learn principles, procedures, and safety requirements for verifying installation integrity.";

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
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 4</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Basic Insulation Resistance Testing (Introduction Only)
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master the fundamentals of insulation resistance testing to verify installation safety and ensure compliance with BS 7671 requirements
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-white/80">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Insulation resistance testing verifies safety by measuring current leakage prevention</li>
                  <li>Poor insulation can cause electric shock, short circuits, or fire hazards</li>
                  <li>Testing must follow BS 7671 procedures and be carried out by competent persons</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Spot:</strong> Insulation damage, moisture ingress, deterioration signs</li>
                  <li><strong>Use:</strong> Insulation resistance testers, systematic procedures, safety protocols</li>
                  <li><strong>Check:</strong> Minimum values, compliance standards, equipment protection</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Explain what insulation resistance is and why it's critical for electrical safety and system integrity</li>
              <li>Identify when insulation resistance testing should be performed and the regulatory requirements</li>
              <li>Recognise the tools and equipment required for safe and effective insulation resistance testing</li>
              <li>Understand acceptable test values for domestic and commercial installations under BS 7671</li>
              <li>Apply basic safety precautions before and during testing to prevent equipment damage and ensure personnel safety</li>
            </ul>
          </section>

          {/* Understanding Insulation Resistance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Understanding Insulation Resistance Fundamentals
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Insulation resistance testing verifies the integrity of electrical insulation systems, ensuring safe operation and regulatory compliance.</p>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-white mb-2">Insulation Resistance Principles and Measurement</p>
                <p className="text-sm mb-2"><strong>Definition and properties:</strong> The ability of insulating materials to resist current flow.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Measured in megohms (MΩ) representing millions of ohms resistance</li>
                  <li>High resistance values indicate effective insulation integrity</li>
                  <li>Low values suggest insulation deterioration, damage, or contamination</li>
                  <li>Critical for preventing dangerous leakage currents and electrical faults</li>
                </ul>
                <p className="text-sm mb-2"><strong>Safety significance:</strong> Poor insulation creates serious hazards requiring immediate attention.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Electric shock risk from exposed conductive parts becoming live</li>
                  <li>Short circuit potential leading to protective device operation</li>
                  <li>Fire hazards from excessive current leakage and overheating</li>
                  <li>Equipment damage from incorrect current paths and voltage levels</li>
                </ul>
                <div className="text-sm p-2 rounded bg-white/5 border border-white/10">
                  <strong>Critical testing:</strong> Insulation resistance verification is mandatory before circuit energisation
                </div>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="measurement-unit-check"
                question={quickCheckQuestions[0].question}
                options={quickCheckQuestions[0].options}
                correctIndex={quickCheckQuestions[0].correctIndex}
                explanation={quickCheckQuestions[0].explanation}
              />
            </div>
          </section>

          {/* Testing Purpose and Requirements */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Testing Purpose and Regulatory Requirements
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Insulation resistance testing ensures installations meet safety standards and regulatory compliance before energisation.</p>

              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <p className="font-semibold text-white mb-2">Testing Objectives and Regulatory Framework</p>
                <p className="text-sm mb-2"><strong>Fault detection purposes:</strong> Identifying insulation damage before hazards develop.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Detects damage caused during cable installation, pulling, or termination</li>
                  <li>Identifies deterioration from environmental factors over time</li>
                  <li>Reveals contamination from moisture, dust, or chemical exposure</li>
                  <li>Confirms insulation integrity after installation modifications</li>
                </ul>
                <p className="text-sm mb-2"><strong>Compliance verification:</strong> Meeting BS 7671 minimum standards and safety requirements.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Minimum 1 MΩ for most LV systems as required by BS 7671</li>
                  <li>Higher values preferred for enhanced safety margins and reliability</li>
                  <li>Specific requirements for different circuit types and applications</li>
                  <li>Documentation requirements for certification and compliance records</li>
                </ul>
                <div className="text-sm p-2 rounded bg-white/5 border border-white/10">
                  <strong>Preventive approach:</strong> Testing prevents hazards by identifying problems before energisation
                </div>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="testing-timing-check"
                question={quickCheckQuestions[1].question}
                options={quickCheckQuestions[1].options}
                correctIndex={quickCheckQuestions[1].correctIndex}
                explanation={quickCheckQuestions[1].explanation}
              />
            </div>
          </section>

          {/* Testing Procedures */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Systematic Testing Procedures and Safety Protocols
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Following structured procedures ensures accurate results while maintaining safety throughout the testing process.</p>

              <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
                <p className="font-semibold text-white mb-2">Professional Testing Methodology and Equipment Protection</p>
                <p className="text-sm mb-2"><strong>Pre-testing safety procedures:</strong> Essential preparation for safe and accurate testing.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Isolate circuit completely using main switch or appropriate protective device</li>
                  <li>Lock off isolator and apply warning notices to prevent re-energisation</li>
                  <li>Verify isolation using approved voltage indicator and proving unit</li>
                  <li>Identify and protect sensitive equipment from high test voltages</li>
                </ul>
                <p className="text-sm mb-2"><strong>Testing sequence and measurements:</strong> Systematic approach for comprehensive verification.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Line to Neutral (L–N): Tests insulation between live conductors</li>
                  <li>Line to Earth (L–E): Verifies live conductor to earth insulation</li>
                  <li>Neutral to Earth (N–E): Checks neutral conductor earth insulation</li>
                  <li>Select appropriate test voltage: 500V DC for LV, 250V DC for SELV</li>
                </ul>
                <div className="text-sm p-2 rounded bg-white/5 border border-white/10">
                  <strong>Competent person requirement:</strong> Testing must be performed by qualified personnel
                </div>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck
                id="fault-causes-check"
                question={quickCheckQuestions[2].question}
                options={quickCheckQuestions[2].options}
                correctIndex={quickCheckQuestions[2].correctIndex}
                explanation={quickCheckQuestions[2].explanation}
              />
            </div>
          </section>

          {/* Result Interpretation */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Result Interpretation and Common Insulation Faults
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Understanding test results and common fault causes enables effective problem identification and resolution.</p>

              <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50">
                <p className="font-semibold text-white mb-2">Professional Result Analysis and Fault Diagnosis</p>
                <p className="text-sm mb-2"><strong>Acceptable test values:</strong> BS 7671 requirements and industry best practices.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>≥ 1 MΩ: Pass for most LV circuits under BS 7671 requirements</li>
                  <li>Higher values (&gt;10 MΩ): Preferred for enhanced safety and reliability</li>
                  <li>&lt; 1 MΩ: Unsatisfactory - requires investigation and rectification</li>
                  <li>Trending values: Monitor changes over time for preventive maintenance</li>
                </ul>
                <p className="text-sm mb-2"><strong>Environmental degradation factors:</strong> External influences reducing insulation effectiveness.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Moisture ingress in outdoor circuits or damp locations</li>
                  <li>Overheating from overloading causing insulation deterioration</li>
                  <li>Chemical contamination in industrial or aggressive environments</li>
                  <li>UV degradation of outdoor cable insulation materials</li>
                </ul>
                <div className="text-sm p-2 rounded bg-white/5 border border-white/10">
                  <strong>Investigation required:</strong> All low readings must be investigated and corrected
                </div>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Practical Guidance
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-white/10">
                <p className="font-medium text-white mb-2">Required Testing Equipment</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                  <li>Insulation resistance tester with appropriate voltage ranges (250V, 500V, 1000V)</li>
                  <li>Lock-off kit for secure isolation and warning notice placement</li>
                  <li>Approved voltage indicator for isolation verification</li>
                  <li>Proving unit to test voltage indicator operation</li>
                  <li>Equipment labels for marking disconnected sensitive devices</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border border-green-400/30 bg-green-500/5">
                <p className="font-medium text-white mb-2">Professional Testing Best Practices</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                  <li>Always disconnect sensitive equipment before testing to prevent damage</li>
                  <li>Perform testing before accessories are connected for highest accuracy</li>
                  <li>Allow readings to stabilise before recording final values</li>
                  <li>Test in consistent environmental conditions when possible</li>
                  <li>Re-test after making any corrections or repairs</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border border-amber-400/30 bg-amber-500/5">
                <p className="font-medium text-white mb-2">Field Testing Example Scenario</p>
                <p className="text-sm text-white/80 mb-2">
                  <strong>Industrial Lighting Circuit Discovery:</strong> During testing of an industrial lighting circuit, a low insulation resistance reading was obtained. Investigation revealed a cracked conduit fitting allowing water ingress.
                </p>
                <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                  <li>Initial reading: 0.3 MΩ (below 1 MΩ minimum)</li>
                  <li>Action: Systematic investigation of circuit components</li>
                  <li>Discovery: Water ingress through damaged conduit fitting</li>
                  <li>Resolution: Replace fitting, dry cables, re-terminate connections</li>
                  <li>Re-test result: Above 200 MΩ (excellent insulation integrity)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-world Scenario */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Real-world Scenario
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50">
              <p className="font-semibold text-white mb-3">Domestic Rewire Project - Critical Insulation Fault Detection</p>
              <div className="text-white/80 space-y-3 text-sm">
                <p><strong>Situation:</strong> During the final testing phase of a complete domestic rewire, an electrician was performing insulation resistance testing on all newly installed circuits before energisation and certification.</p>
                <p><strong>Discovery:</strong> The upstairs lighting circuit showed an insulation resistance reading of only 0.5 MΩ between line and earth, well below the required 1 MΩ minimum. All other circuits tested satisfactorily with readings above 50 MΩ.</p>
                <p><strong>Investigation:</strong> Systematic testing of individual light points revealed the fault was localised to one section of the circuit. Further investigation found a cable had been pierced by a plasterboard fixing screw during the finishing work.</p>
                <p><strong>Resolution:</strong> The damaged cable section was identified and replaced. Retesting confirmed readings above 100 MΩ throughout the circuit.</p>
                <div className="p-3 rounded bg-green-500/10 border border-green-400/30 mt-3">
                  <p className="font-medium text-white">Key Learning: Insulation resistance testing is essential for detecting hidden damage that visual inspection cannot reveal, preventing dangerous conditions before energisation.</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="font-medium text-white mb-2">Q: {faq.question}</h3>
                  <p className="text-sm text-white/80">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Summary
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-white/80 mb-4">
                Insulation resistance testing is a critical safety verification procedure that measures the effectiveness of electrical insulation systems. High resistance values indicate good insulation integrity, while low values suggest potential hazards requiring immediate investigation and correction.
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg border border-white/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Safety Assurance</h3>
                  <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                    <li>Prevents electric shock hazards</li>
                    <li>Reduces fire risk from leakage</li>
                    <li>Ensures regulatory compliance</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg border border-green-400/30 bg-green-500/5">
                  <h3 className="font-medium text-green-400 mb-2">Technical Excellence</h3>
                  <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                    <li>Systematic testing procedures</li>
                    <li>Accurate result interpretation</li>
                    <li>Equipment protection protocols</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg border border-white/10">
                  <h3 className="font-medium text-elec-yellow mb-2">Quality Outcomes</h3>
                  <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                    <li>Early fault detection</li>
                    <li>Reduced rework costs</li>
                    <li>Enhanced reliability</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Do's and Don'ts */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">11</span>
              Apprentice Do's and Don'ts
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="font-medium text-green-400">Do</h3>
                <ul className="space-y-2 text-sm text-white/80">
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
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-medium text-red-400">Don't</h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    Attempt testing on live circuits - always isolate first
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    Apply test voltage to circuits with connected electronic devices
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    Accept readings below 1 MΩ without proper investigation
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    Energise circuits with unsatisfactory test results
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Knowledge Check */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">12</span>
              Knowledge Check
            </h2>
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../6-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Continuity and Polarity
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../6-4">
                Next: Fixings, Cable Routes & Terminations
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section6_3;
