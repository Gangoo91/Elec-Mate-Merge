import { ArrowLeft, Target, CheckCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section4_5 = () => {
  useSEO(
    "Recording Results and Actions Required - Level 2 Electrical Testing & Inspection",
    "Documentation, record-keeping, and actions for continuity and polarity test results"
  );


  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "Why are test results recorded?",
      options: ["Company policy", "To provide evidence of compliance and ensure safety", "Customer satisfaction", "Insurance requirements"],
      correctAnswer: 1,
      explanation: "Test results provide evidence of compliance with BS 7671 and ensure safety through proper documentation."
    },
    {
      id: 2,
      question: "Which certificate is used for new installations?",
      options: ["Minor Works Certificate", "Electrical Installation Certificate (EIC)", "EICR", "Test Certificate"],
      correctAnswer: 1,
      explanation: "The Electrical Installation Certificate (EIC) is the correct certificate for new electrical installations."
    },
    {
      id: 3,
      question: "What certificate is used for small alterations?",
      options: ["EIC", "Minor Works Certificate", "EICR", "Inspection Report"],
      correctAnswer: 1,
      explanation: "The Minor Works Certificate is used for small alterations and additions to existing installations."
    },
    {
      id: 4,
      question: "Which report is used for periodic inspections?",
      options: ["EIC", "Minor Works Certificate", "Electrical Installation Condition Report (EICR)", "PAT Report"],
      correctAnswer: 2,
      explanation: "The Electrical Installation Condition Report (EICR) is used for periodic inspections of existing installations."
    },
    {
      id: 5,
      question: "Where can sample test result schedules be found?",
      options: ["BS 7671 Appendix 5", "BS 7671 Appendix 6", "IET Guidance Note 2", "BS 7909"],
      correctAnswer: 1,
      explanation: "BS 7671 Appendix 6 contains sample test result schedules and certification formats."
    },
    {
      id: 6,
      question: "True or False: Minor works do not require recorded results.",
      options: ["True", "False", "Only sometimes", "Depends on voltage"],
      correctAnswer: 1,
      explanation: "False. All electrical work, including minor works, must have recorded test results for compliance."
    },
    {
      id: 7,
      question: "What should be done if a polarity test fails?",
      options: ["Continue with installation", "Rectify the fault before energising", "Note for later", "Test again"],
      correctAnswer: 1,
      explanation: "Any polarity faults must be rectified before the circuit is energised to prevent safety hazards."
    },
    {
      id: 8,
      question: "What must be recorded for continuity tests?",
      options: ["Pass/fail only", "Measured resistance values (e.g., R1+R2)", "Approximate values", "Visual confirmation"],
      correctAnswer: 1,
      explanation: "Actual measured resistance values must be recorded, including specific readings like R1+R2 for earth fault loop paths."
    },
    {
      id: 9,
      question: "Who signs off test records?",
      options: ["The client", "The competent person carrying out/supervising the tests", "The site manager", "Any qualified electrician"],
      correctAnswer: 1,
      explanation: "The competent person who carried out or supervised the testing must sign off the test records."
    },
    {
      id: 10,
      question: "In the real-world example, what happened due to missing records?",
      options: ["Nothing serious", "The contractor had to retest circuits and lost reputation", "Client was satisfied", "Work was accepted anyway"],
      correctAnswer: 1,
      explanation: "Missing records resulted in costly retesting and reputational damage when compliance could not be proven."
    }
  ];

  const faqs = [
    {
      question: "Can results be recorded digitally instead of on paper?",
      answer: "Yes, digital recording is acceptable provided the results follow BS 7671 formats and are stored securely with appropriate backup systems. Many modern test instruments can export results directly to certification software."
    },
    {
      question: "Do minor works require results to be recorded?",
      answer: "Yes, all electrical work must have recorded test results. Even minor works require proper documentation on a Minor Works Certificate with relevant test results to demonstrate compliance."
    },
    {
      question: "Who is responsible for signing off test records?",
      answer: "The competent person carrying out or supervising the testing is responsible for signing off test records. This person must have appropriate qualifications and experience to verify the work meets BS 7671 requirements."
    },
    {
      question: "How long should test records be kept?",
      answer: "Test records should be kept for the life of the installation plus any relevant warranty periods. Copies should be provided to the client, and the contractor should retain records for potential liability claims."
    },
    {
      question: "What happens if I make an error on test records?",
      answer: "Any errors should be clearly crossed out and corrected, with the person making the correction initialling and dating the change. Never use correction fluid or erasers - transparency and traceability are essential."
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
              Back to Section 6.4
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
              <FileText className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 6.4.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Recording Results and Actions Required
          </h1>
          <p className="text-white">
            Documentation, record-keeping, and actions for continuity and polarity test results
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-8 p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-white" />
            <h2 className="text-lg sm:text-xl font-semibold text-white">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-3">In 30 seconds</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>All test results must be recorded accurately</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>EIC for new work, MWC for alterations, EICR for inspections</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Record actual measurements, not just pass/fail</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Poor records = legal risk and safety hazards</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/20">
              <p className="font-medium mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Spot:</strong> Missing records, illegible writing, incomplete data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Use:</strong> BS 7671 Appendix 6 schedules, digital test software</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Check:</strong> All measurements recorded, signatures present, copies filed</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <p className="text-base text-white mb-4">
            Testing is only useful if results are accurately recorded and acted upon. Documenting continuity and polarity test results provides evidence of compliance with BS 7671, supports future maintenance, and highlights issues that require corrective action.
          </p>
          <p className="text-base text-white">
            This subsection explains how to record results, interpret them, and determine what actions are needed when faults or anomalies are found.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning Outcomes</h2>
          <p className="text-base text-white mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="space-y-3 text-base text-white">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Explain the importance of recording test results</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Identify where results are documented (certificates and schedules)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Record continuity and polarity readings accurately</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Decide what actions are required based on results</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Understand the legal and professional importance of record-keeping</span>
            </li>
          </ul>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* 1. Importance of Recording */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-3">Importance of Recording</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-white mb-2">Legal and Regulatory Compliance</h4>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>BS 7671 Requirements:</strong> Regulation 632.1 mandates that adequate information shall be provided to enable competent persons to operate, inspect, test, and maintain the electrical installation</li>
                          <li><strong>EAWR 1989 Obligations:</strong> Regulation 4(2) requires duty holders to maintain systems in a safe condition, requiring documented evidence</li>
                          <li><strong>CDM Regulations 2015:</strong> Require health and safety information to be provided for future work on the installation</li>
                          <li><strong>Building Regulations Part P:</strong> Requires electrical work to be certified by competent persons with proper documentation</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Professional and Commercial Protection</h4>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Insurance Requirements:</strong> Insurers require documented proof of proper testing for claims related to electrical faults</li>
                          <li><strong>Liability Protection:</strong> Detailed records provide evidence of due diligence in legal proceedings</li>
                          <li><strong>Warranty Validation:</strong> Manufacturers may void warranties without proper installation certificates</li>
                          <li><strong>Contract Compliance:</strong> Many commercial contracts specify testing and certification requirements</li>
                          <li><strong>Quality Assurance:</strong> Records demonstrate professional competence and attention to detail</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Operational and Maintenance Benefits</h4>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Future Reference:</strong> Baseline readings help diagnose developing faults during periodic inspections</li>
                          <li><strong>Maintenance Planning:</strong> Historical data enables predictive maintenance strategies</li>
                          <li><strong>Fault Diagnosis:</strong> Previous test results aid in identifying changes and deterioration</li>
                          <li><strong>System Understanding:</strong> Comprehensive records help future electricians understand circuit arrangements</li>
                          <li><strong>Asset Management:</strong> Test records form part of electrical asset registers for facilities management</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Safety and Risk Management</h4>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Hazard Identification:</strong> Recorded anomalies alert future workers to potential risks</li>
                          <li><strong>Safe Working:</strong> Test results inform risk assessments for maintenance work</li>
                          <li><strong>Emergency Response:</strong> Clear records aid emergency services understanding system layout</li>
                          <li><strong>Public Safety:</strong> Proper documentation protects building occupants and visitors</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="importance-check"
            question="What is the primary legal reason for recording test results?"
            options={["Company policy", "Evidence of BS 7671 compliance", "Customer satisfaction"]}
            correctIndex={1}
            explanation="Recording test results provides essential evidence of compliance with BS 7671 and forms part of legal certification requirements under EAWR 1989."
          />

          {/* 2. Where Results Are Recorded */}
          <section className="mb-6">
            <div className="space-y-6">
                <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Where Results Are Recorded</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-white mb-2">Primary Certification Documents</h4>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Electrical Installation Certificate (EIC):</strong> Used for new installations, complete rewires, and major alterations. Must include all relevant schedules and test results</li>
                          <li><strong>Minor Works Certificate (MWC):</strong> For additions, alterations, and replacements not covered by EIC. Limited scope but still requires essential test results</li>
                          <li><strong>Electrical Installation Condition Report (EICR):</strong> For periodic inspections of existing installations. Records current condition and test results</li>
                          <li><strong>Periodic Inspection Report:</strong> Specific format for rental properties under Electrical Safety Standards regulations</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Test Result Schedules and Appendices</h4>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Schedule of Test Results:</strong> Detailed measurements for each circuit including R1, R2, R1+R2, ring circuit continuity</li>
                          <li><strong>Schedule of Items Inspected:</strong> Visual inspection findings and observations</li>
                          <li><strong>Schedule of Circuit Details:</strong> Circuit references, cable types, protection devices, and design currents</li>
                          <li><strong>BS 7671 Appendix 6 Templates:</strong> Standardised formats ensuring consistency across the industry</li>
                          <li><strong>Departures from BS 7671:</strong> Any design decisions that deviate from standard requirements</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Digital and Supporting Documentation</h4>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Test Instrument Memory:</strong> Modern multifunction testers can store thousands of results with circuit references</li>
                          <li><strong>Certification Software:</strong> Professional packages like Amtech, Fluke DMS, or Megger MFT1835 software</li>
                          <li><strong>Cloud Storage Systems:</strong> Secure backup and client access to certificates through online portals</li>
                          <li><strong>Mobile Apps:</strong> Field data collection tools that sync with office systems</li>
                          <li><strong>Site Logbooks:</strong> Temporary records during testing, signed and dated daily entries</li>
                          <li><strong>Photographic Evidence:</strong> Digital images of test setups, meter readings, and installation details</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Regulatory and Compliance Records</h4>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Building Control Submissions:</strong> Copies for local authority Part P compliance</li>
                          <li><strong>Competent Person Scheme Records:</strong> NICEIC, NAPIT, ECA, or other scheme provider databases</li>
                          <li><strong>Insurance Documentation:</strong> Professional indemnity and public liability certificate copies</li>
                          <li><strong>Calibration Certificates:</strong> Test instrument calibration records proving accuracy of measurements</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="documentation-check"
            question="Which document is used for small alterations to existing installations?"
            options={["EIC", "Minor Works Certificate", "EICR"]}
            correctIndex={1}
            explanation="The Minor Works Certificate is specifically designed for small alterations and additions to existing electrical installations."
          />

          {/* 3. How to Record Correctly */}
          <section className="mb-6">
            <div className="space-y-6">
                <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-3">How to Record Correctly</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-white mb-2">Data Accuracy and Precision</h4>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Measured Values:</strong> Record actual ohmic readings to appropriate decimal places (e.g., R1+R2 = 0.45Ω, not 0.5Ω)</li>
                          <li><strong>Units and Symbols:</strong> Always include correct units (Ω, V, A, mA) and use standard electrical symbols</li>
                          <li><strong>Range Selection:</strong> Use appropriate test instrument ranges for maximum accuracy</li>
                          <li><strong>Temperature Correction:</strong> Apply correction factors for ambient temperature variations where required</li>
                          <li><strong>Null Readings:</strong> Record zero readings as "0.00" not "NIL" or "-" to show test was performed</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Documentation Standards</h4>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Legibility:</strong> Use block capitals for names and addresses, clear numerical entries</li>
                          <li><strong>Permanent Ink:</strong> Black or blue ink only, no pencil or erasable ink</li>
                          <li><strong>Circuit References:</strong> Match circuit labels in distribution board exactly</li>
                          <li><strong>Date Formats:</strong> Use DD/MM/YYYY format consistently throughout documentation</li>
                          <li><strong>Signatures:</strong> Full signatures not initials, with printed name underneath</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Test Information Requirements</h4>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Test Conditions:</strong> Record ambient temperature, humidity if extreme conditions affect readings</li>
                          <li><strong>Instrument Details:</strong> Model number, serial number, calibration due date for each test instrument</li>
                          <li><strong>Test Method:</strong> Note if alternative test methods used (e.g., long lead compensation)</li>
                          <li><strong>Limitations:</strong> Record any areas not tested with justification (e.g., live circuits)</li>
                          <li><strong>Variations:</strong> Note any deviations from standard test procedures</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Digital Recording Best Practices</h4>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Backup Systems:</strong> Multiple storage locations, cloud synchronisation</li>
                          <li><strong>Data Validation:</strong> Built-in range checking and error detection</li>
                          <li><strong>Traceability:</strong> Audit trails showing who entered data and when</li>
                          <li><strong>Template Use:</strong> Standardised forms ensuring all required fields completed</li>
                          <li><strong>Export Formats:</strong> PDF generation for client copies, CSV for data analysis</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="recording-check"
            question="How should continuity test results be recorded?"
            options={["Pass/fail only", "Measured ohmic values (e.g., R1+R2)", "Approximate readings"]}
            correctIndex={1}
            explanation="Continuity test results must include the actual measured resistance values in ohms, such as R1+R2 readings for earth fault loop impedance calculations."
          />

          {/* 4. Actions Required */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-3">Actions Required</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-white mb-2">Satisfactory Results (Compliant)</h4>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Mark as Satisfactory:</strong> Record results meet BS 7671 requirements</li>
                          <li><strong>Complete Certification:</strong> Sign and issue appropriate certificates</li>
                          <li><strong>Client Handover:</strong> Provide copies of all test documentation</li>
                          <li><strong>Archive Records:</strong> Store master copies for recommended retention period</li>
                          <li><strong>System Energisation:</strong> Safe to energise and hand over to client</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Minor Deviations (Investigation Required)</h4>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Repeat Testing:</strong> Verify readings with different instrument or method</li>
                          <li><strong>Check Connections:</strong> Ensure all connections are properly made and tight</li>
                          <li><strong>Review Calculations:</strong> Confirm expected values are correctly calculated</li>
                          <li><strong>Consider Temperature:</strong> Account for ambient temperature effects on resistance</li>
                          <li><strong>Assess Acceptability:</strong> Determine if readings are within acceptable tolerances</li>
                          <li><strong>Document Findings:</strong> Record investigation process and conclusions</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Non-Compliance (Rectification Required)</h4>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Do Not Energise:</strong> Prevent connection to supply until faults rectified</li>
                          <li><strong>Identify Root Cause:</strong> Determine source of fault (loose connection, damaged cable, etc.)</li>
                          <li><strong>Implement Repairs:</strong> Carry out necessary remedial work</li>
                          <li><strong>Retest Circuits:</strong> Repeat all affected tests to confirm compliance</li>
                          <li><strong>Update Documentation:</strong> Amend certificates with corrected results</li>
                          <li><strong>Client Communication:</strong> Explain findings and remedial actions taken</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Communication and Escalation</h4>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Immediate Notification:</strong> Inform supervisor/site manager of any serious faults</li>
                          <li><strong>Client Briefing:</strong> Explain test results and any required actions</li>
                          <li><strong>Safety Warnings:</strong> Issue clear warnings about dangerous conditions</li>
                          <li><strong>Written Reports:</strong> Provide detailed written reports of significant findings</li>
                          <li><strong>Follow-up Actions:</strong> Schedule retesting after remedial work completed</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="actions-check"
            question="What should be done if test results show non-compliance?"
            options={["Continue with installation", "Do not energise until rectified", "Note for future reference"]}
            correctIndex={1}
            explanation="Any non-compliance must be rectified before the circuit is energised. This is a fundamental safety requirement to prevent hazards."
          />

          {/* 5. Consequences of Poor Record-Keeping */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 dark:text-elec-yellow mb-3">Consequences of Poor Record-Keeping</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-white mb-2">Legal and Regulatory Consequences</h4>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>EAWR 1989 Prosecution:</strong> Fines up to £20,000 and imprisonment for serious breaches</li>
                          <li><strong>HSE Enforcement:</strong> Prohibition notices stopping work until compliance achieved</li>
                          <li><strong>Corporate Manslaughter:</strong> Potential charges if poor records contribute to fatalities</li>
                          <li><strong>Building Regulations Breach:</strong> Local authority enforcement action for Part P non-compliance</li>
                          <li><strong>Professional Misconduct:</strong> Disciplinary action by professional bodies and trade associations</li>
                          <li><strong>Court Evidence:</strong> Inability to defend against liability claims without proper records</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Financial and Commercial Impact</h4>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Insurance Voidance:</strong> Professional indemnity and public liability claims rejected</li>
                          <li><strong>Compensation Claims:</strong> Unlimited liability for injury and property damage</li>
                          <li><strong>Retesting Costs:</strong> Complete installation retesting at contractor's expense</li>
                          <li><strong>Contract Penalties:</strong> Late completion fees and breach of contract claims</li>
                          <li><strong>Loss of Business:</strong> Reputation damage affecting future work opportunities</li>
                          <li><strong>Increased Premiums:</strong> Higher insurance costs following claims or incidents</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Safety and Operational Risks</h4>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Undetected Faults:</strong> Hidden defects that could cause fire or electrocution</li>
                          <li><strong>Maintenance Failures:</strong> Inability to plan preventive maintenance effectively</li>
                          <li><strong>Emergency Response:</strong> Delayed fault finding during power outages or incidents</li>
                          <li><strong>System Modifications:</strong> Dangerous alterations due to unknown circuit arrangements</li>
                          <li><strong>Compliance Drift:</strong> Gradual deterioration without baseline measurements for comparison</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-white mb-2">Professional and Reputational Damage</h4>
                        <ul className="text-xs sm:text-sm text-white ml-4 list-disc space-y-1">
                          <li><strong>Industry Standing:</strong> Loss of credibility within electrical contracting community</li>
                          <li><strong>Scheme Membership:</strong> Expulsion from competent person schemes (NICEIC, NAPIT, etc.)</li>
                          <li><strong>Client Trust:</strong> Damaged relationships with existing and potential customers</li>
                          <li><strong>Staff Morale:</strong> Impact on team confidence and professional pride</li>
                          <li><strong>Market Position:</strong> Competitive disadvantage when tendering for quality-focused contracts</li>
                        </ul>
                      </div>
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
          <ul className="space-y-3 text-base text-white">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Use the test schedule templates in BS 7671 Appendix 6</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Keep copies of all results for handover to the client</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Double-check figures before submission</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Record remedial actions taken, not just the faults</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Never falsify results — accuracy is a legal requirement</span>
            </li>
          </ul>
        </Card>


        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Example</h2>
          <div className="rounded-lg p-4 bg-transparent border border-amber-500/20">
            <p className="text-base text-white mb-4">
              <strong>Commercial Office Building - Record-Keeping Crisis:</strong>
            </p>
            <p className="text-base text-white mb-4">
              A major electrical contractor was working on a 15-storey commercial office building with over 200 circuits. During the rush to complete the project on time, junior electricians failed to properly record continuity and polarity test results for several floors of the installation. They noted "satisfactory" on certificates without recording actual measured values.
            </p>
            <p className="text-base text-white mb-4">
              Three months after handover, a serious earth fault occurred on the 8th floor, causing a complete power outage and potential fire risk. The building's insurance company demanded to see all test records as part of their investigation. When the contractor couldn't provide actual measured values, only tick-box entries, several critical issues emerged:
            </p>
            <ul className="text-base text-white mb-4 ml-4 list-disc space-y-2">
              <li>Insurance claim was initially rejected due to lack of compliance evidence</li>
              <li>HSE investigation found inadequate record-keeping violated EAWR 1989</li>
              <li>The contractor faced a £50,000 fine and prosecution</li>
              <li>They had to retest the entire installation at their own cost (£25,000)</li>
              <li>Lost the client relationship and three other pending contracts</li>
              <li>Faced civil litigation from tenants who lost business during the outage</li>
            </ul>
            <p className="text-base text-white">
              <strong>Outcome:</strong> Total cost exceeded £150,000, plus severe reputational damage. Proper recording with actual measured values would have provided legal protection and proven due diligence. The company now uses digital test instruments with mandatory data logging and random audits of all test records.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                <p className="font-medium text-white mb-2">Q: {faq.question}</p>
                <p className="text-white">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Pocket Guide (Key Takeaways)</h2>
          <div className="grid md:grid-cols-1 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-base text-white">Record all continuity and polarity results on EIC, MWC, or EICR</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-base text-white">Use BS 7671 Appendix 6 schedules</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-base text-white">Note measured values and "satisfactory/unsatisfactory" for polarity</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-base text-white">Record remedial actions as well as results</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-base text-white">Accurate records = compliance, safety, professionalism</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/20">
              <h3 className="font-semibold text-elec-yellow dark:text-elec-yellow mb-3">Legal Requirements</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>BS 7671 compliance evidence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>EAWR 1989 obligations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Legal certification requirements</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-transparent border border-green-500/20">
              <h3 className="font-semibold text-green-600 dark:text-green-400 mb-3">Documentation Types</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>EIC for new installations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>MWC for alterations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>EICR for inspections</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-orange-500/20">
              <h3 className="font-semibold text-orange-600 dark:text-elec-yellow mb-3">Recording Standards</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Actual measured values</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Clear, legible entries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Complete documentation</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-red-500/20">
              <h3 className="font-semibold text-red-600 dark:text-elec-yellow mb-3">Consequences</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Legal prosecution risk</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Safety hazards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Reputational damage</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quiz (10 Questions)</h2>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="module6-section4/4" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous: Polarity Testing
            </Link>
          </Button>
          <Button asChild>
            <Link to=".." className="flex items-center gap-2">
              Next: Section 6.5
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section4_5;
