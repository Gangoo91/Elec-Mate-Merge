import { ArrowLeft, Eye, AlertTriangle, FileText, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section1_4 = () => {
  useSEO(
    "Difference Between Inspection and Testing | Level 2 Electrical",
    "Understanding the distinct roles of visual inspection and instrumental testing in electrical verification under BS7671"
  );

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "What is inspection in electrical work?",
      options: [
        "Measuring electrical characteristics",
        "A visual check to confirm compliance and workmanship",
        "Testing with instruments",
        "Energising the circuit"
      ],
      correctAnswer: 1,
      explanation: "Inspection is a careful visual check of the installation to ensure compliance with design and BS 7671 standards."
    },
    {
      id: 2,
      question: "Name one example of an inspection task.",
      options: [
        "Measuring insulation resistance",
        "Testing RCD operation",
        "Checking cable routes are in safe zones",
        "Earth fault loop impedance testing"
      ],
      correctAnswer: 2,
      explanation: "Checking that cable routes comply with safe zones is a visual inspection task that doesn't require instruments."
    },
    {
      id: 3,
      question: "What is testing in electrical work?",
      options: [
        "Visual checking of cables",
        "Measuring electrical characteristics using instruments",
        "Looking at protective devices",
        "Checking cable containment"
      ],
      correctAnswer: 1,
      explanation: "Testing involves measuring electrical characteristics using instruments to confirm the installation is electrically safe."
    },
    {
      id: 4,
      question: "Name one example of a test.",
      options: [
        "Checking cable damage",
        "Insulation resistance testing",
        "Verifying cable routes",
        "Checking labels"
      ],
      correctAnswer: 1,
      explanation: "Insulation resistance testing is an instrumental test that measures the electrical integrity between conductors."
    },
    {
      id: 5,
      question: "True or False: Testing can replace the need for inspection.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Testing cannot reveal poor workmanship or construction issues that are visible - both inspection and testing are essential."
    },
    {
      id: 6,
      question: "Why can inspection alone not ensure safety?",
      options: [
        "It takes too long",
        "It cannot detect hidden faults like loose connections or insulation breakdown",
        "It requires expensive equipment",
        "It's not required by regulations"
      ],
      correctAnswer: 1,
      explanation: "Inspection alone cannot detect hidden electrical faults such as loose terminations inside accessories or insulation breakdown."
    },
    {
      id: 7,
      question: "Which BS 7671 document includes inspection checklists?",
      options: [
        "Appendix 3",
        "Appendix 6",
        "Appendix 1",
        "Appendix 9"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 Appendix 6 provides detailed inspection checklists for various types of electrical installations."
    },
    {
      id: 8,
      question: "What certificate records inspection and testing results?",
      options: [
        "Health and Safety Certificate",
        "Electrical Installation Certificate (EIC) or Minor Works Certificate",
        "Building Regulations Certificate",
        "Insurance Certificate"
      ],
      correctAnswer: 1,
      explanation: "Both inspection and testing results are recorded on either an Electrical Installation Certificate (EIC) or Minor Works Certificate."
    },
    {
      id: 9,
      question: "What tool is typically used for continuity testing?",
      options: [
        "Torch and mirror",
        "A multifunction tester or continuity tester",
        "Visual inspection only",
        "Screwdriver"
      ],
      correctAnswer: 1,
      explanation: "Continuity testing requires electrical instruments such as a multifunction tester or dedicated continuity tester."
    },
    {
      id: 10,
      question: "Why must both inspection and testing be completed before energising?",
      options: [
        "To save time",
        "To ensure both visible construction and hidden electrical integrity are safe and compliant",
        "To reduce costs",
        "It's optional"
      ],
      correctAnswer: 1,
      explanation: "Both processes are essential to verify that the installation is properly constructed (inspection) and electrically safe (testing)."
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
              Back to Section 6.1
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
              <Eye className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 6.1.4
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Difference Between Inspection and Testing
          </h1>
          <p className="text-white">
            Understanding the distinct roles of visual inspection and instrumental testing in electrical verification under BS7671
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Inspection = Visual checks of construction, routing, labelling - what you can SEE.</li>
                <li>Testing = Instrumental measurements of electrical characteristics - what you can MEASURE.</li>
                <li>Both essential for compliance - inspection finds visible faults, testing finds hidden ones.</li>
                <li>Never energise based on inspection alone - hidden faults can be deadly.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Damaged cables, incorrect routing, missing labels, loose accessories, poor workmanship.</li>
                <li><strong>Use:</strong> Visual inspection first, then systematic testing; BS 7671 Appendix 6 checklists; both processes before energising.</li>
                <li><strong>Check:</strong> All inspection points covered; test instruments calibrated; results recorded on certificates.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white mb-4">
            In electrical work, the terms inspection and testing are often mentioned together, but they serve very different purposes. Inspection focuses on what can be seen, while testing verifies what cannot be seen — the electrical characteristics. Together, they ensure the system is both correctly constructed and electrically safe.
          </p>
          <p className="text-base text-white">
            Understanding the distinction between these processes is crucial for any electrical worker. Each has specific purposes, methods, and limitations, and both are mandatory under BS 7671 for ensuring compliance and safety before any installation is energised.
          </p>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Define what is meant by inspection and testing.</li>
            <li>Identify the key tasks involved in each process.</li>
            <li>Understand why both are necessary for compliance with BS 7671.</li>
            <li>Recognise situations where visual inspection alone is insufficient.</li>
            <li>Apply correct procedures for combining inspection and testing.</li>
            <li>Use appropriate tools and documentation for each process.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* 1. What is Inspection? */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1. What is Inspection?</h3>
            <p className="text-base text-white mb-4">
              Inspection is a systematic visual examination of an electrical installation to verify that it has been constructed according to the design and complies with BS 7671 requirements. It focuses on aspects that can be observed without the use of electrical test instruments.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-3">Visual Inspection Requirements</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Definition and Purpose:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Definition:</strong> A careful visual check of the installation without energising</li>
                          <li><strong>Purpose:</strong> To ensure compliance with design and BS 7671 standards</li>
                          <li><strong>Timing:</strong> Must be completed before any testing or energising takes place</li>
                          <li><strong>Scope:</strong> Covers all accessible parts of the installation</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Key Inspection Tasks:</strong></p>
                        <div className="bg-[#121212]/50 p-3 rounded border mb-2">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-white mb-2">Cable and Wiring Checks:</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li>• Checking that cables are not damaged</li>
                                <li>• Confirming correct routing (safe zones)</li>
                                <li>• Verifying adequate support and fixing</li>
                                <li>• Checking bend radii are not exceeded</li>
                                <li>• Ensuring proper cable selection for environment</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-white mb-2">Equipment and Accessories:</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li>• Protective devices correctly selected</li>
                                <li>• Accessories properly fixed and undamaged</li>
                                <li>• Correct IP ratings for location</li>
                                <li>• Proper labelling and identification</li>
                                <li>• Adequate access for maintenance</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Inspection Tools and Equipment:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Basic tools:</strong> Torch, mirror, measuring tape, magnifying glass</li>
                          <li><strong>Documentation:</strong> BS 7671 Appendix 6 checklists, installation drawings</li>
                          <li><strong>Safety equipment:</strong> Hard hat, safety glasses, appropriate PPE</li>
                          <li><strong>No electrical instruments</strong> - inspection relies purely on visual observation</li>
                        </ul>
                      </div>

                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded border border-yellow-200 dark:border-yellow-800">
                        <p className="font-medium text-yellow-700 text-elec-yellow mb-2">Key Limitation of Inspection</p>
                        <p className="text-xs sm:text-sm text-white">
                          Visual inspection cannot detect hidden faults such as loose connections inside accessories, degraded insulation, or incorrect internal wiring. This is why testing with instruments is essential to complete the verification process.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-elec-yellow/5 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mt-4">
              <p className="font-medium text-blue-700 text-elec-yellow mb-2">BS 7671 Inspection Requirements</p>
              <p className="text-xs sm:text-sm text-white">
                BS 7671 requires that inspection shall precede testing and shall normally be done with the installation disconnected from the supply. Appendix 6 provides comprehensive inspection schedules for different types of installation.
              </p>
            </div>
          </section>

          <InlineCheck
            id="inspection-purpose-check"
            question="What is the main purpose of electrical inspection?"
            options={["To measure electrical characteristics", "To test protective devices", "To ensure visual compliance with design and BS 7671", "To energise the installation"]}
            correctIndex={2}
            explanation="Inspection is a visual process to ensure the installation complies with the design and BS 7671 standards before any testing or energising takes place."
          />
          <Separator className="my-6" />

          {/* 2. What is Testing? */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2. What is Testing</h3>
            <p className="text-base text-white mb-4">
              Testing involves the measurement of electrical characteristics using calibrated instruments to verify that the installation meets the electrical safety requirements specified in BS 7671. Testing reveals hidden electrical faults that cannot be detected by visual inspection alone.
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-1">Instrumental Testing Requirements</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Definition and Purpose:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Definition:</strong> Measurement of electrical characteristics using calibrated instruments</li>
                          <li><strong>Purpose:</strong> To confirm that the installation is electrically safe and meets BS 7671 requirements</li>
                          <li><strong>Timing:</strong> Follows inspection and must be completed before energising</li>
                          <li><strong>Verification:</strong> Proves the electrical integrity of circuits and protective systems</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Essential Tests and Sequence:</strong></p>
                        <div className="bg-[#121212]/50 p-3 rounded border mb-2">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-white mb-2">Dead Tests (Before Energising):</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li>1. Continuity of protective conductors</li>
                                <li>2. Continuity of ring final circuits</li>
                                <li>3. Insulation resistance testing</li>
                                <li>4. Protection by SELV, PELV or electrical separation</li>
                                <li>5. Protection by barriers or enclosures</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-white mb-2">Live Tests (After Safe Energising):</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li>6. Insulation of floors and walls</li>
                                <li>7. Polarity testing</li>
                                <li>8. Earth electrode resistance</li>
                                <li>9. Earth fault loop impedance</li>
                                <li>10. Additional protection (RCD testing)</li>
                                <li>11. Phase sequence</li>
                                <li>12. Functional testing</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Test Instruments and Equipment:</strong></p>
                        <div className="space-y-2">
                          <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded border">
                            <p className="text-xs sm:text-sm text-white"><strong>Multifunction Tester:</strong> Primary instrument for most tests including continuity, insulation resistance, and earth fault loop impedance.</p>
                          </div>
                          <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded border">
                            <p className="text-xs sm:text-sm text-white"><strong>RCD Tester:</strong> Dedicated instrument for testing residual current devices at various test currents and time delays.</p>
                          </div>
                          <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded border">
                            <p className="text-xs sm:text-sm text-white"><strong>Phase Rotation Indicator:</strong> For three-phase installations to verify correct phase sequence.</p>
                          </div>
                          <div className="bg-amber-100 dark:bg-amber-900/20 p-2 rounded border">
                            <p className="text-xs sm:text-sm text-white"><strong>Calibration:</strong> All test instruments must be calibrated within the specified period to ensure accurate results.</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Typical Test Results and Acceptance Criteria:</strong></p>
                        <div className="bg-[#121212]/50 p-3 rounded border mb-2">
                          <ul className="text-xs sm:text-sm text-white ml-2 list-disc space-y-1">
                            <li><strong>Continuity:</strong> Protective conductors &lt; 0.05Ω, ring circuits within 0.05Ω variation</li>
                            <li><strong>Insulation resistance:</strong> ≥ 1MΩ between live conductors and earth at 500V DC</li>
                            <li><strong>Earth fault loop impedance:</strong> Must not exceed values in BS 7671 tables for protective device operation</li>
                            <li><strong>RCD operation:</strong> Trip within specified time at test currents (½x, 1x, 5x rated)</li>
                            <li><strong>Polarity:</strong> All single-pole devices in line conductor, correct terminal connections</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800 mt-4">
              <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">Critical Safety Point</p>
              <p className="text-xs sm:text-sm text-white">
                Testing must be carried out by competent persons using properly calibrated instruments. Incorrect test procedures or faulty instruments can give false results, potentially leaving dangerous faults undetected.
              </p>
            </div>
          </section>

          <InlineCheck
            id="testing-sequence-check"
            question="When should electrical testing be carried out in relation to inspection?"
            options={["Before inspection", "At the same time as inspection", "After inspection is completed", "Testing is optional"]}
            correctIndex={2}
            explanation="Testing must follow inspection. BS 7671 requires that inspection shall precede testing to ensure the installation is properly constructed before electrical verification begins."
          />
          <Separator className="my-6" />

          {/* 3. Why Both Are Needed */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3. Why Both Are Needed</h3>
            <p className="text-base text-white mb-4">
              Neither inspection nor testing alone provides complete verification of an electrical installation. Each process has specific capabilities and limitations, and both are essential for ensuring comprehensive safety and compliance.
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-amber-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-600 dark:text-amber-400 mb-1">Complementary Verification Processes</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Limitations of Inspection Alone:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Hidden faults:</strong> Cannot detect loose terminations inside accessories or junction boxes</li>
                          <li><strong>Insulation breakdown:</strong> Damaged insulation inside conduits or trunking is not visible</li>
                          <li><strong>Connection integrity:</strong> High resistance joints may look correct but be electrically unsafe</li>
                          <li><strong>Protective device operation:</strong> Cannot verify that MCBs or RCDs will operate correctly under fault conditions</li>
                          <li><strong>Cross-connections:</strong> Incorrect connections between circuits may not be visible</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Limitations of Testing Alone:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Poor workmanship:</strong> Cannot reveal substandard installation practices</li>
                          <li><strong>Design compliance:</strong> Cannot verify compliance with cable routing, spacing, or IP rating requirements</li>
                          <li><strong>Mechanical damage:</strong> May not detect physical damage that could cause future failures</li>
                          <li><strong>Environmental suitability:</strong> Cannot assess if equipment is appropriate for its environment</li>
                          <li><strong>Access and maintenance:</strong> Cannot verify adequate provision for future maintenance</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Combined Verification Benefits:</strong></p>
                        <div className="bg-[#121212]/50 p-3 rounded border mb-2">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-white mb-2">What Inspection Provides:</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li>• Verification of visible construction quality</li>
                                <li>• Compliance with design requirements</li>
                                <li>• Appropriate equipment selection</li>
                                <li>• Correct installation methods</li>
                                <li>• Environmental protection adequacy</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-white mb-2">What Testing Provides:</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li>• Electrical integrity verification</li>
                                <li>• Hidden fault detection</li>
                                <li>• Protective system operation confirmation</li>
                                <li>• Insulation quality assessment</li>
                                <li>• Connection reliability verification</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Real-World Integration Examples:</strong></p>
                        <div className="space-y-2">
                          <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded border">
                            <p className="text-xs sm:text-sm text-white"><strong>Socket Outlet Circuit:</strong> Inspection verifies correct mounting and cable routing. Testing confirms ring continuity and correct polarity.</p>
                          </div>
                          <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded border">
                            <p className="text-xs sm:text-sm text-white"><strong>Consumer Unit:</strong> Inspection checks appropriate MCB ratings and labelling. Testing verifies earth fault loop impedance for each circuit.</p>
                          </div>
                          <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded border">
                            <p className="text-xs sm:text-sm text-white"><strong>Lighting Circuit:</strong> Inspection confirms switch drop routing. Testing verifies continuity and correct switching arrangements.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="both-needed-check"
            question="Why cannot testing alone ensure electrical safety?"
            options={["Testing takes too long", "Testing cannot reveal poor workmanship or construction issues", "Testing is too expensive", "Testing requires special qualifications"]}
            correctIndex={1}
            explanation="Testing alone cannot reveal poor workmanship, incorrect installation methods, or construction issues that are visible to inspection but don't affect electrical measurements."
          />
          <Separator className="my-6" />

          {/* 4. Certification Requirements */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">4. Certification Requirements</h3>
            <p className="text-base text-white mb-4">
              BS 7671 mandates that both inspection and testing results must be documented and certified. This provides legal evidence that the installation has been properly verified and meets safety standards.
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-1">Documentation and Certification</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Mandatory Documentation Requirements:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Initial verification</strong> always requires both inspection and testing</li>
                          <li><strong>Results recording:</strong> All inspection observations and test measurements must be documented</li>
                          <li><strong>Certificate completion:</strong> Both processes contribute to the final certification</li>
                          <li><strong>Schedule of items:</strong> Detailed breakdown of inspection points and test results</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Certificate Types and Applications:</strong></p>
                        <div className="bg-[#121212]/50 p-3 rounded border mb-2">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-white mb-2">Electrical Installation Certificate (EIC):</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li>• New installations</li>
                                <li>• Major alterations</li>
                                <li>• Complete rewiring</li>
                                <li>• Consumer unit replacements</li>
                                <li>• Requires design, construction, inspection AND testing sections</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-white mb-2">Minor Works Certificate:</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li>• Small alterations and additions</li>
                                <li>• Single circuit modifications</li>
                                <li>• Accessory replacements</li>
                                <li>• Socket or lighting point additions</li>
                                <li>• Simplified inspection and testing requirements</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>BS 7671 Inspection and Testing Standards:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Appendix 6:</strong> Provides detailed inspection schedules for different installation types</li>
                          <li><strong>Chapter 61:</strong> Specifies minimum test requirements and procedures</li>
                          <li><strong>Part 6:</strong> Complete inspection and testing requirements for initial verification</li>
                          <li><strong>Model forms:</strong> Standard certificate templates ensure consistent documentation</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Legal and Professional Implications:</strong></p>
                        <div className="bg-[#121212]/50 p-3 rounded border mb-2">
                          <ul className="text-xs sm:text-sm text-white ml-2 list-disc space-y-1">
                            <li><strong>Legal evidence:</strong> Certificates provide proof of compliance for insurance and legal purposes</li>
                            <li><strong>Professional responsibility:</strong> Signing certifies that both inspection and testing were completed correctly</li>
                            <li><strong>Competency requirement:</strong> Only qualified persons can sign certificates</li>
                            <li><strong>Liability:</strong> Certificate signatories accept responsibility for the installation's safety</li>
                            <li><strong>Audit trail:</strong> Documentation enables future maintenance and fault diagnosis</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Real-World Example
          </h2>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-base text-white mb-3">
              <strong>The Hidden Fault</strong>
            </p>
            <p className="text-base text-white">
              An electrician carried out a new installation but skipped the insulation resistance test, relying only on visual checks. The installation looked perfect - all cables were correctly routed in safe zones, accessories were properly fixed, and protective devices were correctly selected. Later, a fault caused frequent tripping of the RCD due to insulation damage hidden inside trunking that occurred during cable installation. Proper testing alongside inspection would have identified the fault before handover, preventing customer inconvenience and expensive remedial work.
            </p>
          </div>
        </Card>

        {/* Case Study */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" />
            Case Study: When Inspection Reveals What Testing Cannot
          </h2>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800 mb-4">
            <p className="text-base text-white mb-3">
              <strong>Background:</strong> A commercial kitchen installation passed all electrical tests with flying colours - continuity, insulation resistance, and earth fault loop impedance were all within acceptable limits.
            </p>
            <p className="text-base text-white mb-3">
              <strong>The Problem:</strong> During inspection, it was discovered that standard PVC cables had been used in areas where temperatures regularly exceeded 60°C, and IP20 rated accessories were installed in areas subject to steam and water spray.
            </p>
            <p className="text-base text-white mb-3">
              <strong>The Discovery:</strong> While the installation was electrically sound, the environmental conditions would cause rapid deterioration of cable insulation and ingress protection failures within months.
            </p>
            <p className="text-base text-white">
              <strong>The Solution:</strong> Inspection identified the need for high-temperature rated cables and IP65 rated accessories - problems that testing alone could never have revealed.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
            <p className="font-medium text-green-700 dark:text-green-400 mb-2">Key Learning Points</p>
            <ul className="text-xs sm:text-sm text-white space-y-1">
              <li>• Electrical testing confirmed circuit integrity but couldn't assess environmental suitability</li>
              <li>• Visual inspection identified inappropriate component selection for the application</li>
              <li>• Both processes were essential for identifying different types of compliance issues</li>
              <li>• Environmental considerations require visual assessment, not electrical measurement</li>
            </ul>
          </div>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-l-elec-yellow pl-4 bg-elec-yellow/5/50 dark:bg-elec-yellow/10 py-3">
              <p className="font-medium text-white mb-2">Q: Can I do inspection and testing at the same time?</p>
              <p className="text-xs sm:text-sm text-white">A: No. BS 7671 requires inspection to be completed before testing begins. Inspection must be done with the installation de-energised, while some tests require the installation to be energised.</p>
            </div>
            <div className="border-l-4 border-l-green-500 pl-4 bg-green-50/50 dark:bg-green-950/20 py-3">
              <p className="font-medium text-white mb-2">Q: What if testing passes but inspection reveals problems?</p>
              <p className="text-xs sm:text-sm text-white">A: The installation must not be energised until all inspection issues are resolved. Both inspection and testing must be satisfactory before certification can be issued.</p>
            </div>
            <div className="border-l-4 border-l-purple-500 pl-4 bg-purple-50/50 dark:bg-purple-950/20 py-3">
              <p className="font-medium text-white mb-2">Q: Who can carry out inspection and testing?</p>
              <p className="text-xs sm:text-sm text-white">A: Only electrically competent persons should carry out inspection and testing. However, the person signing the certificate takes full responsibility for both processes.</p>
            </div>
            <div className="border-l-4 border-l-amber-500 pl-4 bg-amber-50/50 dark:bg-amber-950/20 py-3">
              <p className="font-medium text-white mb-2">Q: What happens if I find a dangerous fault during testing?</p>
              <p className="text-xs sm:text-sm text-white">A: Stop immediately, make the installation safe, and do not proceed until the fault is corrected. Dangerous faults must be addressed before any further testing or energising.</p>
            </div>
          </div>
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-elec-yellow" />
            Practical Guidance
          </h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-elec-yellow/5 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="font-medium text-blue-700 text-elec-yellow mb-2">Inspection Best Practice</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>• Always carry out systematic inspection first, before energising</li>
                  <li>• Use BS 7671 Appendix 6 checklists for comprehensive coverage</li>
                  <li>• Take photographs of any defects found for documentation</li>
                  <li>• Check all accessible parts thoroughly - don't rush the process</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <p className="font-medium text-green-700 dark:text-green-400 mb-2">Testing Best Practice</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>• Follow correct test sequence - dead tests before live tests</li>
                  <li>• Use calibrated instruments and verify operation before use</li>
                  <li>• Record all results clearly on appropriate certificates</li>
                  <li>• Never energise based on inspection alone - testing is essential</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-500" />
            Pocket Guide
          </h2>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-green-700 dark:text-green-400 mb-2">Quick Reference:</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li><strong>Inspection</strong> = Visual (What you see)</li>
                  <li><strong>Testing</strong> = Instrumental (What you measure)</li>
                  <li><strong>Both</strong> must be completed for compliance and safety</li>
                  <li><strong>Certification</strong> requires recording results of both</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-green-700 dark:text-green-400 mb-2">Process Sequence:</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>1. Inspection first (de-energised)</li>
                  <li>2. Resolve any inspection issues</li>
                  <li>3. Testing second (dead then live)</li>
                  <li>4. Certificate completion</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <p className="text-base text-white">
            Inspection confirms correct construction and visible compliance through careful visual examination. Testing verifies the hidden electrical integrity through instrumental measurement. Together, they provide confidence that the system is safe, functional, and compliant with BS 7671. Neither process is complete without the other - inspection reveals what testing cannot see, while testing detects what inspection cannot measure.
          </p>
        </Card>

        {/* Quiz Section */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Knowledge Check
          </h2>
          <Quiz questions={quizQuestions} />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="../1-3" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="../1-5" className="flex items-center gap-2">
              Next
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section1_4;