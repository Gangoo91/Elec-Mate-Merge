import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Module6Section4_5 = () => {
  useSEO(
    "Recording Results and Actions Required - Level 2 Electrical Testing & Inspection",
    "Documentation, record-keeping, and actions for continuity and polarity test results"
  );

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
              Back to Section 6.4
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
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 6</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.4.5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Recording Results and Actions Required
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Documentation, record-keeping, and actions for continuity and polarity test results
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="text-white/90 text-sm leading-relaxed mb-3">
              <strong className="text-elec-yellow">In 30 seconds:</strong> All test results must be recorded accurately on EIC, MWC, or EICR certificates. Record actual measurements, not just pass/fail. Poor records = legal risk and safety hazards.
            </p>
            <ul className="text-white/80 text-sm space-y-1">
              <li>• <strong>Spot:</strong> Missing records, illegible writing, incomplete data</li>
              <li>• <strong>Use:</strong> BS 7671 Appendix 6 schedules, digital test software</li>
              <li>• <strong>Check:</strong> All measurements recorded, signatures present, copies filed</li>
            </ul>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <div className="text-white/80 space-y-3 leading-relaxed">
              <p className="text-white/70 mb-4">By the end of this subsection, learners will be able to:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                  <span>Explain the importance of recording test results</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                  <span>Identify where results are documented (certificates and schedules)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                  <span>Record continuity and polarity readings accurately</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                  <span>Decide what actions are required based on results</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                  <span>Understand the legal and professional importance of record-keeping</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Introduction
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Testing is only useful if results are accurately recorded and acted upon. Documenting continuity and polarity test results provides evidence of compliance with BS 7671, supports future maintenance, and highlights issues that require corrective action.
              </p>
              <p>
                This subsection explains how to record results, interpret them, and determine what actions are needed when faults or anomalies are found.
              </p>
            </div>
          </section>

          {/* Importance of Recording */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Importance of Recording
            </h2>
            <div className="text-white/80 space-y-6 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Legal and Regulatory Compliance</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>BS 7671 Requirements:</strong> Regulation 632.1 mandates adequate information for operation, inspection, testing, and maintenance</li>
                  <li>• <strong>EAWR 1989 Obligations:</strong> Regulation 4(2) requires duty holders to maintain systems in safe condition with documented evidence</li>
                  <li>• <strong>CDM Regulations 2015:</strong> Require health and safety information for future work</li>
                  <li>• <strong>Building Regulations Part P:</strong> Requires electrical work certification by competent persons</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Professional and Commercial Protection</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Insurance Requirements:</strong> Insurers require documented proof of proper testing for claims</li>
                  <li>• <strong>Liability Protection:</strong> Detailed records provide evidence of due diligence in legal proceedings</li>
                  <li>• <strong>Warranty Validation:</strong> Manufacturers may void warranties without proper installation certificates</li>
                  <li>• <strong>Contract Compliance:</strong> Many commercial contracts specify testing and certification requirements</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Operational and Maintenance Benefits</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Future Reference:</strong> Baseline readings help diagnose developing faults during periodic inspections</li>
                  <li>• <strong>Maintenance Planning:</strong> Historical data enables predictive maintenance strategies</li>
                  <li>• <strong>Fault Diagnosis:</strong> Previous test results aid in identifying changes and deterioration</li>
                  <li>• <strong>Asset Management:</strong> Test records form part of electrical asset registers</li>
                </ul>
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

          {/* Where Results Are Recorded */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Where Results Are Recorded
            </h2>
            <div className="text-white/80 space-y-6 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Primary Certification Documents</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Electrical Installation Certificate (EIC):</strong> For new installations, complete rewires, and major alterations</li>
                  <li>• <strong>Minor Works Certificate (MWC):</strong> For additions, alterations, and replacements not covered by EIC</li>
                  <li>• <strong>Electrical Installation Condition Report (EICR):</strong> For periodic inspections of existing installations</li>
                  <li>• <strong>Periodic Inspection Report:</strong> Specific format for rental properties under Electrical Safety Standards</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Test Result Schedules and Appendices</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Schedule of Test Results:</strong> Detailed measurements for each circuit (R1, R2, R1+R2, ring circuit continuity)</li>
                  <li>• <strong>Schedule of Items Inspected:</strong> Visual inspection findings and observations</li>
                  <li>• <strong>Schedule of Circuit Details:</strong> Circuit references, cable types, protection devices</li>
                  <li>• <strong>BS 7671 Appendix 6 Templates:</strong> Standardised formats ensuring industry consistency</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Digital and Supporting Documentation</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Test Instrument Memory:</strong> Modern testers can store thousands of results with circuit references</li>
                  <li>• <strong>Certification Software:</strong> Professional packages like Amtech, Fluke DMS, or Megger software</li>
                  <li>• <strong>Cloud Storage:</strong> Secure backup and client access through online portals</li>
                  <li>• <strong>Photographic Evidence:</strong> Digital images of test setups, meter readings, and installation details</li>
                </ul>
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

          {/* How to Record Correctly */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              How to Record Correctly
            </h2>
            <div className="text-white/80 space-y-6 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Data Accuracy and Precision</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Measured Values:</strong> Record actual ohmic readings to appropriate decimal places (e.g., R1+R2 = 0.45Ω, not 0.5Ω)</li>
                  <li>• <strong>Units and Symbols:</strong> Always include correct units (Ω, V, A, mA) and standard electrical symbols</li>
                  <li>• <strong>Range Selection:</strong> Use appropriate test instrument ranges for maximum accuracy</li>
                  <li>• <strong>Null Readings:</strong> Record zero readings as "0.00" not "NIL" or "-" to show test was performed</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Documentation Standards</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Legibility:</strong> Use block capitals for names and addresses, clear numerical entries</li>
                  <li>• <strong>Permanent Ink:</strong> Black or blue ink only, no pencil or erasable ink</li>
                  <li>• <strong>Circuit References:</strong> Match circuit labels in distribution board exactly</li>
                  <li>• <strong>Signatures:</strong> Full signatures not initials, with printed name underneath</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Digital Recording Best Practices</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Backup Systems:</strong> Multiple storage locations, cloud synchronisation</li>
                  <li>• <strong>Data Validation:</strong> Built-in range checking and error detection</li>
                  <li>• <strong>Traceability:</strong> Audit trails showing who entered data and when</li>
                  <li>• <strong>Export Formats:</strong> PDF generation for client copies, CSV for data analysis</li>
                </ul>
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

          {/* Actions Required */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Actions Required
            </h2>
            <div className="text-white/80 space-y-6 leading-relaxed">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <h3 className="font-medium text-green-400 mb-3">Satisfactory Results (Compliant)</h3>
                <ul className="text-sm space-y-2">
                  <li>• Mark as satisfactory - record results meet BS 7671 requirements</li>
                  <li>• Complete certification and issue appropriate certificates</li>
                  <li>• Provide copies of all test documentation to client</li>
                  <li>• Store master copies for recommended retention period</li>
                  <li>• Safe to energise and hand over to client</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <h3 className="font-medium text-orange-400 mb-3">Minor Deviations (Investigation Required)</h3>
                <ul className="text-sm space-y-2">
                  <li>• Repeat testing with different instrument or method</li>
                  <li>• Check all connections are properly made and tight</li>
                  <li>• Confirm expected values are correctly calculated</li>
                  <li>• Account for ambient temperature effects on resistance</li>
                  <li>• Document investigation process and conclusions</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h3 className="font-medium text-red-400 mb-3">Non-Compliance (Rectification Required)</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>Do Not Energise</strong> until faults rectified</li>
                  <li>• Identify root cause (loose connection, damaged cable, etc.)</li>
                  <li>• Implement necessary repairs</li>
                  <li>• Repeat all affected tests to confirm compliance</li>
                  <li>• Update certificates with corrected results</li>
                </ul>
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

          {/* Consequences of Poor Record-Keeping */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Consequences of Poor Record-Keeping
            </h2>
            <div className="text-white/80 space-y-6 leading-relaxed">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h3 className="font-medium text-red-400 mb-3">Legal and Regulatory Consequences</h3>
                <ul className="text-sm space-y-2">
                  <li>• <strong>EAWR 1989 Prosecution:</strong> Fines up to £20,000 and imprisonment for serious breaches</li>
                  <li>• <strong>HSE Enforcement:</strong> Prohibition notices stopping work until compliance achieved</li>
                  <li>• <strong>Professional Misconduct:</strong> Disciplinary action by professional bodies and trade associations</li>
                  <li>• <strong>Court Evidence:</strong> Inability to defend against liability claims without proper records</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-medium text-white mb-3">Financial and Commercial Impact</h3>
                <ul className="text-sm space-y-2">
                  <li>• Insurance claims rejected due to lack of compliance evidence</li>
                  <li>• Unlimited liability for injury and property damage</li>
                  <li>• Complete installation retesting at contractor's expense</li>
                  <li>• Contract penalties and breach of contract claims</li>
                  <li>• Reputation damage affecting future work opportunities</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Practical Guidance
            </h2>
            <div className="text-white/80 space-y-3 leading-relaxed">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                <span>Use the test schedule templates in BS 7671 Appendix 6</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                <span>Keep copies of all results for handover to the client</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                <span>Double-check figures before submission</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                <span>Record remedial actions taken, not just the faults</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-elec-yellow flex-shrink-0 mt-1" />
                <span>Never falsify results — accuracy is a legal requirement</span>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-white font-medium mb-3">Commercial Office Building - Record-Keeping Crisis</p>
              <div className="text-white/80 text-sm space-y-3 leading-relaxed">
                <p>
                  A major electrical contractor was working on a 15-storey commercial office building with over 200 circuits. During the rush to complete the project on time, junior electricians failed to properly record continuity and polarity test results for several floors of the installation. They noted "satisfactory" on certificates without recording actual measured values.
                </p>
                <p>
                  Three months after handover, a serious earth fault occurred on the 8th floor, causing a complete power outage and potential fire risk. The building's insurance company demanded to see all test records as part of their investigation.
                </p>
                <p className="font-medium text-amber-400">When proper records couldn't be provided:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Insurance claim was initially rejected</li>
                  <li>• HSE investigation found inadequate record-keeping violated EAWR 1989</li>
                  <li>• Contractor faced £50,000 fine and prosecution</li>
                  <li>• Had to retest the entire installation at their own cost (£25,000)</li>
                  <li>• Lost the client relationship and three other pending contracts</li>
                </ul>
                <p className="font-medium text-white mt-3">
                  Outcome: Total cost exceeded £150,000, plus severe reputational damage. The company now uses digital test instruments with mandatory data logging and random audits of all test records.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border border-white/10 rounded-lg px-4 bg-white/5"
                >
                  <AccordionTrigger className="text-white hover:text-elec-yellow text-left text-sm py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 text-sm pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Key Takeaways */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">11</span>
              Key Takeaways
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <h3 className="font-medium text-elec-yellow mb-2 text-sm">Legal Requirements</h3>
                <ul className="text-white/70 text-xs space-y-1">
                  <li>• BS 7671 compliance evidence</li>
                  <li>• EAWR 1989 obligations</li>
                  <li>• Legal certification requirements</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <h3 className="font-medium text-green-400 mb-2 text-sm">Documentation Types</h3>
                <ul className="text-white/70 text-xs space-y-1">
                  <li>• EIC for new installations</li>
                  <li>• MWC for alterations</li>
                  <li>• EICR for inspections</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <h3 className="font-medium text-blue-400 mb-2 text-sm">Recording Standards</h3>
                <ul className="text-white/70 text-xs space-y-1">
                  <li>• Actual measured values</li>
                  <li>• Clear, legible entries</li>
                  <li>• Complete documentation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h3 className="font-medium text-red-400 mb-2 text-sm">Consequences</h3>
                <ul className="text-white/70 text-xs space-y-1">
                  <li>• Legal prosecution risk</li>
                  <li>• Safety hazards</li>
                  <li>• Reputational damage</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quiz */}
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
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../4-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Common Faults
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                Back to Section 6.4
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section4_5;
