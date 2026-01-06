import { ArrowLeft, Clock, AlertTriangle, FileText, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section1_3 = () => {
  useSEO(
    "When Testing Is Required - New Work, Alterations, Faults | Level 2 Electrical",
    "Understanding when electrical testing is legally required for new work, alterations, and fault diagnosis under BS7671 and EAWR"
  );

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "What certificate is required for new electrical installations?",
      options: [
        "Minor Works Certificate",
        "Electrical Installation Certificate (EIC)",
        "Electrical Installation Condition Report (EICR)",
        "Inspection Certificate"
      ],
      correctAnswer: 1,
      explanation: "An Electrical Installation Certificate (EIC) is required for all new electrical installations to confirm they meet BS 7671 standards."
    },
    {
      id: 2,
      question: "What must be carried out before energising any new system?",
      options: [
        "Visual inspection only",
        "Initial verification (inspection and testing)",
        "Periodic inspection",
        "Risk assessment"
      ],
      correctAnswer: 1,
      explanation: "Initial verification, which includes both inspection and testing, must be completed before any new electrical system is energised."
    },
    {
      id: 3,
      question: "What certificate is usually issued for small alterations?",
      options: [
        "Electrical Installation Certificate (EIC)",
        "Electrical Installation Condition Report (EICR)",
        "Minor Works Certificate",
        "Compliance Certificate"
      ],
      correctAnswer: 2,
      explanation: "A Minor Works Certificate is typically issued for small alterations and additions to existing installations."
    },
    {
      id: 4,
      question: "True or False: You can energise an alteration without testing if the original installation was recently tested.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. All alterations must be tested before being energised, regardless of when the original installation was last tested."
    },
    {
      id: 5,
      question: "Give one example of when testing is required for fault diagnosis.",
      options: [
        "Annual maintenance",
        "Tripping RCD",
        "New meter installation",
        "Property sale"
      ],
      correctAnswer: 1,
      explanation: "Testing is required for fault diagnosis when issues like tripping RCDs, flickering lights, or overheating cables occur."
    },
    {
      id: 6,
      question: "How often should domestic dwellings be periodically inspected under BS 7671?",
      options: [
        "Every 5 years",
        "Every 10 years or on change of occupancy",
        "Every 15 years",
        "Only when faults occur"
      ],
      correctAnswer: 1,
      explanation: "Domestic dwellings should be inspected every 10 years or on change of occupancy according to BS 7671."
    },
    {
      id: 7,
      question: "How often should commercial installations be inspected?",
      options: [
        "Every 3 years",
        "Every 5 years (or sooner depending on risk)",
        "Every 10 years",
        "Every 12 years"
      ],
      correctAnswer: 1,
      explanation: "Commercial installations should typically be inspected every 5 years, or more frequently depending on the risk assessment."
    },
    {
      id: 8,
      question: "What is the outcome of a periodic inspection and test?",
      options: [
        "Electrical Installation Certificate (EIC)",
        "Minor Works Certificate",
        "Electrical Installation Condition Report (EICR)",
        "Compliance Report"
      ],
      correctAnswer: 2,
      explanation: "An Electrical Installation Condition Report (EICR) is the outcome of a periodic inspection and test of an existing installation."
    },
    {
      id: 9,
      question: "Why must alterations be tested before being put into service?",
      options: [
        "To comply with insurance requirements",
        "To ensure the new work has not compromised the safety of the installation",
        "To update the electrical drawings",
        "To calculate the electrical load"
      ],
      correctAnswer: 1,
      explanation: "Alterations must be tested to ensure the new work has not compromised the safety of the existing installation."
    },
    {
      id: 10,
      question: "What is the first step before carrying out any electrical testing?",
      options: [
        "Notify the DNO",
        "Safe isolation",
        "Visual inspection",
        "Continuity testing"
      ],
      correctAnswer: 1,
      explanation: "Safe isolation is the first and most critical step before carrying out any electrical testing to ensure safety."
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
              <Clock className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 6.1.3
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            When Testing Is Required (New Work, Alterations, Faults)
          </h1>
          <p className="text-white">
            Understanding when electrical testing is legally required for new work, alterations, and fault diagnosis under BS7671 and EAWR
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
                <li>Testing mandatory for ALL new work before energising - never switch on untested circuits.</li>
                <li>ANY alteration requires testing before use - no exceptions for "small" changes.</li>
                <li>Fault diagnosis testing essential for RCD trips, flickering, overheating symptoms.</li>
                <li>Periodic testing: domestic 10 years, commercial 5 years - issue appropriate certificates always.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> New circuits, socket additions, fault symptoms, certificate expiry dates.</li>
                <li><strong>Use:</strong> Initial verification before energising; test alterations; systematic fault diagnosis; schedule periodic tests.</li>
                <li><strong>Check:</strong> Safe isolation first; correct certificates issued; test instruments calibrated; competent person signs.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white mb-4">
            Electrical testing is not a one-off process. It must be carried out at specific times to ensure installations remain safe, compliant, and functional. Whether it's new work, alterations, or fault diagnosis, testing ensures the system meets legal requirements, protects users from danger, and maintains the integrity of the installation.
          </p>
          <p className="text-base text-white">
            Understanding when testing is required is fundamental to electrical safety. The consequences of energising untested circuits can be catastrophic - from electric shock and fire to equipment damage and legal prosecution. This module covers the four main scenarios requiring electrical testing and the certification requirements for each.
          </p>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Identify when testing is legally required under BS 7671 and EAWR.</li>
            <li>Distinguish between testing for new work, alterations, and faults.</li>
            <li>Understand why certification must accompany all new and modified work.</li>
            <li>Recognise the risks of energising an untested installation.</li>
            <li>Know the certification requirements for different types of electrical work.</li>
            <li>Understand periodic inspection intervals for different property types.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* 1. New Work */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">1. New Work</h3>
            <p className="text-base text-white mb-4">
              All new electrical installations must undergo initial verification before being energised. This is a fundamental safety requirement that protects both users and installers from electrical dangers.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-3">Initial Verification Requirements</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Mandatory Testing Before Energising:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Initial Verification</strong> must be performed before energising a new installation</li>
                          <li>Includes both <strong>inspection</strong> (visual checks) and <strong>testing</strong> (measured checks)</li>
                          <li>Testing ensures correct polarity, insulation resistance, continuity, and protective devices</li>
                          <li>NEVER energise a circuit until all initial verification is complete and satisfactory</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Specific Test Requirements for New Work:</strong></p>
                        <div className="bg-[#121212]/50 p-3 rounded border mb-2">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-white mb-2">Essential Tests (in order):</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li>1. Continuity of protective conductors</li>
                                <li>2. Continuity of ring final circuit conductors</li>
                                <li>3. Insulation resistance</li>
                                <li>4. Polarity</li>
                                <li>5. Earth electrode resistance (if applicable)</li>
                                <li>6. Earth fault loop impedance</li>
                                <li>7. Functional testing (RCDs, switches, etc.)</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-white mb-2">Pass Criteria Examples:</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li>Insulation resistance: ≥1MΩ at 500V DC</li>
                                <li>Continuity: &lt;0.05Ω for protective conductors</li>
                                <li>RCD operation: 1x, 5x rated current</li>
                                <li>Polarity: Correct at all points</li>
                                <li>Earth fault loop: Within limits for protective device</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Certification Requirements:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Electrical Installation Certificate (EIC)</strong> required for all new work</li>
                          <li>Must be signed by competent person who carried out or supervised the work</li>
                          <li>Certificate confirms installation complies with BS 7671 current edition</li>
                          <li>Schedule of items providing detailed test results must be attached</li>
                          <li>Design, construction, inspection, and testing sections must all be completed</li>
                        </ul>
                      </div>

                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded border border-yellow-200 dark:border-yellow-800">
                        <p className="font-medium text-yellow-700 dark:text-elec-yellow mb-2">Critical Safety Point</p>
                        <p className="text-xs sm:text-sm text-white">
                          Energising an untested installation can result in electric shock, fire, or equipment damage. Initial verification is a legal requirement under EAWR and professional duty under BS 7671. The person who energises an untested circuit accepts full legal responsibility for any consequences.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mt-4">
              <p className="font-medium text-blue-700 dark:text-elec-yellow mb-2">Professional Practice Note</p>
              <p className="text-xs sm:text-sm text-white">
                Some installers are tempted to "just switch on quickly to see if it works" - this is extremely dangerous and unprofessional. Proper testing may take time, but it can prevent fires, save lives, and protect your professional reputation. Never compromise on initial verification.
              </p>
            </div>
          </section>

          <InlineCheck
            id="new-work-check"
            question="What is the correct sequence for testing a new installation?"
            options={["Energise first, then test", "Test insulation first, then continuity", "Complete all dead tests before energising", "Test only if problems occur"]}
            correctIndex={2}
            explanation="All dead tests (continuity, insulation, polarity) must be completed before energising. Live tests (earth fault loop impedance, RCD testing) follow after safe energising."
          />
          <Separator className="my-6" />

          {/* 2. Alterations and Additions */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">2. Alterations and Additions</h3>
            <p className="text-base text-white mb-4">
              Any modification to an existing electrical installation requires testing to ensure the alteration has not compromised the safety of the original installation and that the new work meets current standards.
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">Alteration Testing Requirements</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Scope of Testing for Alterations:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li>Any change to an existing system must be tested before being put into service</li>
                          <li><strong>Example:</strong> Adding a socket to an existing ring final circuit requires continuity, polarity, and R1+R2 checks</li>
                          <li>Must verify the alteration has not adversely affected the existing installation</li>
                          <li>Test both the new work AND relevant parts of the existing installation</li>
                          <li>Check that protective device ratings remain appropriate for the modified circuit</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Risk Assessment for Existing Installations:</strong></p>
                        <div className="bg-[#121212]/50 p-3 rounded border mb-2">
                          <p className="text-xs sm:text-sm text-white mb-2">When adding to existing circuits, you must consider:</p>
                          <ul className="text-xs sm:text-sm text-white ml-2 list-disc space-y-1">
                            <li><strong>Age of installation:</strong> Older installations may not meet current standards</li>
                            <li><strong>Condition of existing components:</strong> Deteriorated insulation or damaged conductors</li>
                            <li><strong>Protective device coordination:</strong> Will existing MCBs/RCDs still provide adequate protection?</li>
                            <li><strong>Load implications:</strong> Does the addition exceed the circuit's design capacity?</li>
                            <li><strong>Earthing arrangements:</strong> Are they adequate for the modified installation?</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Certification Decision Matrix:</strong></p>
                        <div className="bg-[#121212]/50 p-3 rounded border mb-2">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-white mb-2">Minor Works Certificate:</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li>• Small alterations and additions</li>
                                <li>• Single circuit modifications</li>
                                <li>• Socket outlets, lighting points</li>
                                <li>• Replacement of accessories</li>
                                <li>• Replacing like-for-like components</li>
                                <li>• Adding to existing circuits (sockets, lights)</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-white mb-2">Full EIC Required:</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li>• New circuits added to existing installation</li>
                                <li>• Consumer unit replacements</li>
                                <li>• Major alterations affecting multiple circuits</li>
                                <li>• Work requiring design calculations</li>
                                <li>• Significant modifications to earthing arrangements</li>
                                <li>• Installation of new distribution boards</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Common Alteration Scenarios:</strong></p>
                        <div className="space-y-2">
                          <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded border">
                            <p className="text-xs sm:text-sm text-white"><strong>Scenario 1:</strong> Adding a socket to existing ring - requires continuity check of ring, polarity verification, and R1+R2 measurement for new section.</p>
                          </div>
                          <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded border">
                            <p className="text-xs sm:text-sm text-white"><strong>Scenario 2:</strong> Installing additional lighting point - requires continuity, polarity, and switch drop verification plus functional testing.</p>
                          </div>
                          <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded border">
                            <p className="text-xs sm:text-sm text-white"><strong>Scenario 3:</strong> Consumer unit replacement - requires full initial verification as it affects the entire installation's protection.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800 mt-4">
              <p className="font-medium text-amber-700 dark:text-amber-400 mb-2">Important Legal Point</p>
              <p className="text-xs sm:text-sm text-white">
                When you alter an existing installation, you become responsible for ensuring that your work does not make the existing installation unsafe. This means testing may reveal pre-existing faults that you must address or formally report.
              </p>
            </div>
          </section>

          <InlineCheck
            id="alteration-scope-check"
            question="Which of the following alterations would require a full EIC rather than a Minor Works Certificate?"
            options={["Adding a socket to existing ring", "Replacing a light switch", "Installing a new consumer unit", "Changing a lamp holder"]}
            correctIndex={2}
            explanation="Installing a new consumer unit is a major alteration affecting multiple circuits and requires a full EIC, not just a Minor Works Certificate."
          />
          <Separator className="my-6" />

          {/* 3. Fault Diagnosis */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">3. Fault Diagnosis</h3>
            <p className="text-base text-white mb-4">
              When electrical systems show signs of faults or abnormal operation, systematic testing is essential to identify the cause and confirm safe remedial action has been taken.
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-amber-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-600 dark:text-amber-400 mb-1">Systematic Fault Diagnosis</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Common Fault Symptoms Requiring Testing:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Tripping RCDs:</strong> May indicate earth leakage, damaged cables, or moisture ingress</li>
                          <li><strong>Flickering lights:</strong> Could suggest loose connections or overloading</li>
                          <li><strong>Overheating cables/accessories:</strong> May indicate overloading or high resistance joints</li>
                          <li><strong>Electric shock from metalwork:</strong> Potential earth fault requiring immediate investigation</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Systematic Testing Approach:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Safe isolation first</strong> - never test live circuits for fault diagnosis</li>
                          <li><strong>Continuity tests:</strong> Check protective conductor integrity and circuit continuity</li>
                          <li><strong>Insulation resistance:</strong> Identify deteriorated insulation or moisture damage</li>
                          <li><strong>Earth fault loop impedance:</strong> Verify protective device operation</li>
                          <li><strong>RCD testing:</strong> Confirm correct operation and sensitivity</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="fault-diagnosis-check"
            question="What should be the FIRST step when investigating a fault that causes an RCD to trip repeatedly?"
            options={["Test the RCD operation", "Check for earth leakage", "Safe isolation of the circuit", "Measure insulation resistance"]}
            correctIndex={2}
            explanation="Safe isolation must always be the first step before any fault diagnosis testing can be carried out safely."
          />
          <Separator className="my-6" />

          {/* 4. Periodic Inspection and Testing */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">4. Periodic Inspection and Testing</h3>
            <p className="text-base text-white mb-4">
              Existing installations deteriorate over time and must be periodically inspected and tested to ensure they remain safe for continued use.
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-1">Periodic Testing Requirements</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-white mb-2"><strong>Testing Intervals by Property Type:</strong></p>
                        <div className="bg-[#121212]/50 p-3 rounded border mb-2">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-white mb-2">Domestic Properties:</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li><strong>Interval:</strong> Every 10 years maximum</li>
                                <li><strong>Change of occupancy:</strong> Before new tenant/owner</li>
                                <li><strong>Insurance requirements:</strong> May require more frequent testing</li>
                                <li><strong>Rental properties:</strong> Every 5 years in some regions</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-white mb-2">Commercial/Industrial:</p>
                              <ul className="text-xs sm:text-sm text-white space-y-1">
                                <li><strong>Standard interval:</strong> Every 5 years maximum</li>
                                <li><strong>High-risk environments:</strong> Annual or more frequent</li>
                                <li><strong>Risk assessment driven:</strong> May require shorter intervals</li>
                                <li><strong>Construction sites:</strong> Every 3 months</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-white mb-2"><strong>Outcome and Reporting:</strong></p>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>EICR:</strong> Electrical Installation Condition Report must be issued</li>
                          <li><strong>Condition codes:</strong> C1 (danger present), C2 (potentially dangerous), C3 (improvement recommended)</li>
                          <li><strong>Recommendations:</strong> Clear guidance on required remedial work</li>
                          <li><strong>Next inspection date:</strong> Must be specified based on condition found</li>
                        </ul>
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
              <strong>The Untested Office Extension</strong>
            </p>
            <p className="text-base text-white">
              A small office had additional sockets installed without testing. Months later, a fault caused an RCD to fail, leaving the sockets live with no protection. Had proper testing been performed at the time of alteration, the wiring fault would have been discovered and corrected, preventing a serious safety hazard. The company faced HSE investigation and substantial remedial costs.
            </p>
          </div>
        </Card>

        {/* Case Study */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" />
            Case Study: The Cost of Cutting Corners
          </h2>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800 mb-4">
            <p className="text-base text-white mb-3">
              <strong>Background:</strong> A retail shop owner hired an unqualified person to add several socket outlets to accommodate new equipment. No testing was performed and no certificates were issued to save time and money.
            </p>
            <p className="text-base text-white mb-3">
              <strong>The Incident:</strong> Six months later, a socket outlet overheated due to a poor connection, causing a fire that destroyed £50,000 worth of stock and forced the business to close for three weeks.
            </p>
            <p className="text-base text-white mb-3">
              <strong>Investigation:</strong> HSE investigation revealed the additional sockets were not properly connected to the ring circuit, creating a high-resistance joint that overheated under load.
            </p>
            <p className="text-base text-white">
              <strong>Consequences:</strong> Shop owner prosecuted under EAWR 1989, fined £15,000, insurance claim rejected due to non-compliance, business reputation severely damaged. Total cost exceeded £100,000 - far more than proper testing would have cost.
            </p>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
            <p className="font-medium text-red-700 dark:text-elec-yellow mb-2">Key Lessons</p>
            <ul className="text-xs sm:text-sm text-white space-y-1">
              <li>• Proper testing would have identified the poor connection before energising</li>
              <li>• Minor Works Certificate would have provided legal documentation</li>
              <li>• Competent person would have made proper connections</li>
              <li>• Cost of compliance is always less than cost of non-compliance</li>
            </ul>
          </div>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-l-elec-yellow pl-4 bg-emerald-50/50 dark:bg-emerald-950/20 py-3">
              <p className="font-medium text-white mb-2">Q: Can I energise just part of a new installation to test it?</p>
              <p className="text-xs sm:text-sm text-white">A: No. Initial verification must be completed on the entire installation before any part is energised. Partial energising can create dangerous conditions and invalidates the testing process.</p>
            </div>
            <div className="border-l-4 border-l-green-500 pl-4 bg-green-50/50 dark:bg-green-950/20 py-3">
              <p className="font-medium text-white mb-2">Q: How small can an alteration be before testing is not required?</p>
              <p className="text-xs sm:text-sm text-white">A: There is no minimum size - ANY alteration to an electrical installation requires testing before use. Even changing a socket outlet requires verification that connections are correct.</p>
            </div>
            <div className="border-l-4 border-l-purple-500 pl-4 bg-purple-50/50 dark:bg-purple-950/20 py-3">
              <p className="font-medium text-white mb-2">Q: What if the client refuses to pay for testing?</p>
              <p className="text-xs sm:text-sm text-white">A: Testing is a legal requirement, not an optional extra. Work cannot be completed without testing. Explain that energising untested circuits makes both you and the client liable for any consequences.</p>
            </div>
            <div className="border-l-4 border-l-amber-500 pl-4 bg-amber-50/50 dark:bg-amber-950/20 py-3">
              <p className="font-medium text-white mb-2">Q: Can I sign a certificate for work I didn't personally test?</p>
              <p className="text-xs sm:text-sm text-white">A: Only if you supervised the testing throughout. You take full legal responsibility for any certificate you sign, so you must be confident the tests were carried out correctly.</p>
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
              <div className="bg-emerald-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="font-medium text-blue-700 dark:text-elec-yellow mb-2">Before Any Testing</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>• Always carry out safe isolation before testing</li>
                  <li>• Verify test instruments are calibrated and functioning</li>
                  <li>• Ensure you are competent for the work being undertaken</li>
                  <li>• Check you have authority to issue certificates</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <p className="font-medium text-green-700 dark:text-green-400 mb-2">Testing Best Practice</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>• For new installations: never energise until all tests are complete</li>
                  <li>• For alterations: test both new work and affected existing circuits</li>
                  <li>• For faults: use systematic approach starting with basic tests</li>
                  <li>• Keep clear records and issue appropriate certificates</li>
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
                <p className="font-medium text-green-700 dark:text-green-400 mb-2">When Testing Required:</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li><strong>New work</strong> = Full inspection + testing → EIC required</li>
                  <li><strong>Alterations/additions</strong> = Test before energising → Minor Works or EIC required</li>
                  <li><strong>Faults</strong> = Test to diagnose safely → Record results and remedial action</li>
                  <li><strong>Periodic inspections</strong> = EICR → every 5 or 10 years depending on premises</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-green-700 dark:text-green-400 mb-2">Key Remember Points:</p>
                <ul className="text-xs sm:text-sm text-white space-y-1">
                  <li>• Safe isolation before all testing</li>
                  <li>• Never energise untested circuits</li>
                  <li>• Issue correct certificate type</li>
                  <li>• Only sign what you've tested</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <p className="text-base text-white">
            Testing is essential whenever new work is installed, when existing circuits are altered, or when faults occur. It confirms the system is safe, compliant, and fit for use. Certificates must always be issued, and periodic inspections are critical to maintaining long-term safety. Remember: safe isolation first, test systematically, and never energise untested circuits.
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
            <Link to="../1-2" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="../1-4" className="flex items-center gap-2">
              Next
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section1_3;