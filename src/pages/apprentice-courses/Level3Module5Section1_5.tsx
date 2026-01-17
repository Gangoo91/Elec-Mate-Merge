import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Documentation and Certification Requirements - Level 3 Module 5 Section 1.5";
const DESCRIPTION = "Understanding the documentation and certification requirements for inspection and testing under BS 7671, including EIC, EICR, and schedules.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What documentation is required after initial verification of a new installation?",
    options: [
      "EICR only",
      "EIC with Schedule of Inspections and Schedule of Test Results",
      "A verbal report to the client",
      "Building control certificate only"
    ],
    correctIndex: 1,
    explanation: "Initial verification requires an Electrical Installation Certificate (EIC) accompanied by a Schedule of Inspections and a Schedule of Test Results. These documents together provide complete evidence of compliance."
  },
  {
    id: "check-2",
    question: "How long should electrical certificates and test records be retained?",
    options: [
      "1 year",
      "5 years",
      "For the life of the installation",
      "Until the next inspection"
    ],
    correctIndex: 2,
    explanation: "Certificates and test records should be retained for the life of the installation. They provide evidence of the installation condition at various points in time and are essential for future work, inspections, and any legal proceedings."
  },
  {
    id: "check-3",
    question: "When is a Minor Electrical Installation Works Certificate appropriate?",
    options: [
      "For any electrical work",
      "For additions that do not include a new circuit",
      "Only for industrial installations",
      "When the full EIC is too expensive"
    ],
    correctIndex: 1,
    explanation: "A Minor Works Certificate is appropriate for minor additions or alterations that do not include a new circuit - for example, adding a socket outlet to an existing circuit. New circuits require a full EIC."
  },
  {
    id: "check-4",
    question: "Who must sign the Electrical Installation Certificate?",
    options: [
      "Only the client",
      "The designer, installer, and person responsible for inspection and testing",
      "Only the installer",
      "The building control officer"
    ],
    correctIndex: 1,
    explanation: "The EIC requires signatures from the designer (if different from installer), the installer (or contractor's representative), and the person responsible for inspection and testing. Each signature confirms responsibility for their element."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the purpose of the Schedule of Inspections?",
    options: [
      "To list materials used in the installation",
      "To provide evidence that visual inspection has been completed",
      "To calculate the cost of the work",
      "To identify the client's requirements"
    ],
    correctAnswer: 1,
    explanation: "The Schedule of Inspections provides systematic evidence that all required inspection items have been checked. It uses tick boxes or similar to confirm each item has been verified during the inspection process."
  },
  {
    id: 2,
    question: "What information must be recorded on the Schedule of Test Results?",
    options: [
      "Only circuit numbers",
      "Test values including continuity, IR, Zs, RCD times, and circuit details",
      "Only failed tests",
      "A summary of the installation"
    ],
    correctAnswer: 1,
    explanation: "The Schedule of Test Results records all test values for each circuit: continuity (R1+R2), insulation resistance, earth fault loop impedance, RCD trip times, and details of the protective devices and cables used."
  },
  {
    id: 3,
    question: "An EICR is issued following:",
    options: [
      "Initial verification of a new installation",
      "Periodic inspection and testing of an existing installation",
      "Minor additions to an installation",
      "Design of a new installation"
    ],
    correctAnswer: 1,
    explanation: "An Electrical Installation Condition Report (EICR) is issued following periodic inspection and testing of an existing installation. It reports on the condition found and uses classification codes to identify any deficiencies."
  },
  {
    id: 4,
    question: "The condition codes used on an EICR are:",
    options: [
      "A, B, C, D",
      "C1, C2, C3, FI",
      "Pass, Fail, Warning",
      "Green, Amber, Red"
    ],
    correctAnswer: 1,
    explanation: "The EICR uses classification codes: C1 (danger present - immediate action required), C2 (potentially dangerous - urgent remedial action required), C3 (improvement recommended), and FI (further investigation required)."
  },
  {
    id: 5,
    question: "Who should receive a copy of the completed electrical certificate?",
    options: [
      "Only the contractor",
      "The person ordering the work and anyone else required by regulations",
      "Only building control",
      "No copies are required"
    ],
    correctAnswer: 1,
    explanation: "The person ordering the work must receive the original or a copy of the certificate. For notifiable work under Part P, a copy must also go to building control. The contractor should retain a copy for their records."
  },
  {
    id: 6,
    question: "What determines whether a Minor Works Certificate or full EIC is required?",
    options: [
      "The cost of the work",
      "Whether the work involves a new circuit",
      "The client's preference",
      "The size of the building"
    ],
    correctAnswer: 1,
    explanation: "The key distinction is whether a new circuit is involved. New circuits require a full EIC with complete schedules. Minor additions to existing circuits (like adding a socket) can use a Minor Works Certificate."
  },
  {
    id: 7,
    question: "The Schedule of Test Results must include:",
    options: [
      "Only readings that failed",
      "All test readings including those that passed",
      "A general summary only",
      "Only insulation resistance values"
    ],
    correctAnswer: 1,
    explanation: "All test readings must be recorded, whether they pass or fail. This provides a complete record of the installation condition, allows comparison with future tests, and demonstrates the testing was comprehensive."
  },
  {
    id: 8,
    question: "On an EIC, what does the installation details section record?",
    options: [
      "The cost of materials",
      "Supply characteristics, earthing arrangements, and main protective devices",
      "The client's telephone number",
      "Weather conditions during testing"
    ],
    correctAnswer: 1,
    explanation: "The installation details section records supply characteristics (voltage, frequency, fault level), earthing arrangement (TN-C-S, TN-S, TT), maximum demand, and details of the main protective devices and earthing."
  },
  {
    id: 9,
    question: "If notifiable work is carried out under Part P, where must notification be sent?",
    options: [
      "The Health and Safety Executive",
      "The local authority building control or through a competent person scheme",
      "The electricity supplier only",
      "No notification is required"
    ],
    correctAnswer: 1,
    explanation: "Notifiable work under Part P must be notified to local authority building control, either directly with inspection, or through a registered competent person scheme which provides self-certification."
  },
  {
    id: 10,
    question: "What should be done with previous test records when carrying out periodic inspection?",
    options: [
      "Ignore them completely",
      "Destroy them after the new inspection",
      "Compare with current results to identify deterioration",
      "Return them to the original installer"
    ],
    correctAnswer: 2,
    explanation: "Previous test records should be obtained if available and compared with current results. This comparison helps identify deterioration over time and provides context for the current condition assessment."
  }
];

const faqs = [
  {
    question: "Can the same person sign as designer, installer, and tester on an EIC?",
    answer: "Yes, if the same competent person or organisation was responsible for all three functions, they can sign all three sections. This is common in smaller installations where one electrician designs, installs, and tests the work."
  },
  {
    question: "What is the difference between an EIC and an EICR?",
    answer: "An EIC (Electrical Installation Certificate) certifies new work as compliant with BS 7671. An EICR (Electrical Installation Condition Report) reports the condition of an existing installation without certifying full compliance - it identifies defects and departures using classification codes."
  },
  {
    question: "How detailed must observations be on an EICR?",
    answer: "Observations must be specific enough for the client to understand the issue and its location. Simply stating 'non-compliant wiring' is insufficient. State what the issue is, where it is located, and what classification code applies."
  },
  {
    question: "Do I need to use the model forms from BS 7671?",
    answer: "You do not have to use the exact model forms, but any forms used must contain all the information required by BS 7671. Many contractors use electronic systems or scheme provider forms that meet these requirements in different formats."
  },
  {
    question: "What happens if the client refuses to accept the certificate?",
    answer: "The certificate should still be completed and offered to the client. Keep a record that it was offered and any reasons for refusal. You cannot force a client to accept it, but your duty to produce it has been fulfilled."
  }
];

const Level3Module5Section1_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.1.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Documentation and Certification Requirements
          </h1>
          <p className="text-white/80">
            Understanding the required documentation for inspection and testing
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>EIC:</strong> For new installations and alterations</li>
              <li><strong>Minor Works:</strong> For additions not involving new circuits</li>
              <li><strong>EICR:</strong> For periodic inspection condition reports</li>
              <li><strong>Schedules:</strong> Inspection and test results documentation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Correct certificate for the type of work</li>
              <li><strong>Use:</strong> Complete schedules with all test results</li>
              <li><strong>Apply:</strong> Classification codes on EICRs</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "When to use EIC, Minor Works, or EICR",
              "How to complete the Schedule of Inspections",
              "Recording test results correctly",
              "Classification codes for EICRs (C1, C2, C3, FI)",
              "Building Regulations Part P notification",
              "Record retention requirements"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Types of Electrical Certificates
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Chapter 63 specifies the documentation required after inspection and testing. Using the correct certificate is not optional - each serves a specific purpose and provides specific assurances to the recipient.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Certificate types and their uses:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Electrical Installation Certificate (EIC):</strong> For new installations, alterations, and additions involving new circuits. Certifies compliance with BS 7671.</li>
                <li><strong>Minor Electrical Installation Works Certificate:</strong> For minor additions or alterations that do not include a new circuit. Simpler format but still certifies compliance.</li>
                <li><strong>Electrical Installation Condition Report (EICR):</strong> For periodic inspection of existing installations. Reports condition rather than certifying compliance.</li>
              </ul>
            </div>

            <p>
              Each certificate must be accompanied by appropriate schedules. The EIC requires both a Schedule of Inspections and Schedule of Test Results. The EICR requires a Schedule of Inspections, Schedule of Test Results, and observation sections for recording defects.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The certificate is legal evidence of the work done. Incomplete, inaccurate, or missing certificates can result in prosecution, civil liability, and professional disciplinary action.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Completing the EIC
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Electrical Installation Certificate has multiple sections that must all be completed correctly. Each section serves a specific purpose and requires specific information.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Part 1: Details of the Installation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Address and description of premises</li>
                  <li>Extent and limitations of inspection</li>
                  <li>Supply characteristics (voltage, frequency)</li>
                  <li>Earthing arrangements (TN-C-S, TN-S, TT)</li>
                  <li>Main protective device details</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Signature Sections</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Designer declaration and signature</li>
                  <li>Constructor/installer declaration and signature</li>
                  <li>Inspector and tester declaration and signature</li>
                  <li>Each party takes responsibility for their work</li>
                  <li>Same person can sign multiple sections if applicable</li>
                </ul>
              </div>
            </div>

            <p>
              The certificate should clearly state any extent and limitations. If you could not inspect behind a fixed board, or access was restricted, this must be noted. The certificate only covers what was actually inspected and tested.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Installing a new consumer unit and rewire requires a full EIC. The designer section confirms the design meets BS 7671. The installer section confirms correct construction. The tester section confirms inspection and testing verified compliance. All schedules are completed with full details.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            The EICR and Classification Codes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Electrical Installation Condition Report differs from the EIC in that it reports on condition rather than certifying compliance. Defects and non-compliances are recorded using classification codes that indicate the severity and urgency of remedial action.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Classification codes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>C1 - Danger Present:</strong> Risk of injury exists. Immediate remedial action required. The inspector should notify the client immediately and consider making safe before leaving.</li>
                <li><strong>C2 - Potentially Dangerous:</strong> Urgent remedial action required. The defect may result in danger under certain conditions.</li>
                <li><strong>C3 - Improvement Recommended:</strong> Not compliant with current standards but not immediately dangerous. Improvement would enhance safety.</li>
                <li><strong>FI - Further Investigation:</strong> Cannot determine condition without further investigation beyond the scope of this inspection.</li>
              </ul>
            </div>

            <p>
              Each observation must state what the issue is, where it is located (circuit, location in property), and what classification applies. The overall assessment states whether the installation is satisfactory or unsatisfactory for continued use.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> A C1 finding means immediate danger. You have a duty to inform the duty holder immediately and may need to make the situation safe before leaving site. This takes priority over completing the report.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Schedules and Record Keeping
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The schedules are where the detail lives. They provide the evidence that inspection and testing was thorough and comprehensive. Incomplete schedules undermine the entire certificate.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Schedule of Inspections</p>
                <p className="text-white/90 text-xs">Tick-box confirmation of visual inspection items</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Test Results</p>
                <p className="text-white/90 text-xs">All measured values for every circuit</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Circuit Details</p>
                <p className="text-white/90 text-xs">Cable sizes, lengths, protective devices</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Record retention:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Retain all certificates for the life of the installation</li>
                <li>Provide copies to the person ordering the work</li>
                <li>Notify building control for Part P notifiable work</li>
                <li>Keep instrument calibration records for traceability</li>
                <li>Previous test records enable comparison of deterioration</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> When carrying out periodic inspection, request previous EICR and test schedules. Compare current insulation resistance values with previous. A drop from 200 megohms to 50 megohms, while still acceptable, indicates deterioration that should be monitored.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Completing Certificates</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Complete all sections - leave nothing blank without explanation</li>
                <li>Use N/A only where genuinely not applicable</li>
                <li>State extent and limitations clearly</li>
                <li>Ensure all signatures are obtained before issue</li>
                <li>Check schedule entries match the certificate details</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">For Part P Notification</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Identify whether work is notifiable (new circuits in bathrooms, kitchens, outdoors, etc.)</li>
                <li>Notify through competent person scheme or local authority</li>
                <li>Building control notification certificate required for non-scheme work</li>
                <li>Keep evidence of notification with your records</li>
                <li>Client receives Building Regulations Compliance Certificate</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Incomplete schedules</strong> - Every circuit must have full test results</li>
                <li><strong>Wrong certificate type</strong> - New circuits need EIC not Minor Works</li>
                <li><strong>Missing signatures</strong> - All required signatures must be present</li>
                <li><strong>Vague observations</strong> - State exactly what and where on EICRs</li>
              </ul>
            </div>
          </div>
        </section>

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

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Certificate Selection</p>
                <ul className="space-y-0.5">
                  <li>New circuits = Full EIC</li>
                  <li>Addition to existing circuit = Minor Works</li>
                  <li>Condition check = EICR</li>
                  <li>Consumer unit change = EIC</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">EICR Codes</p>
                <ul className="space-y-0.5">
                  <li>C1 = Danger present - immediate action</li>
                  <li>C2 = Potentially dangerous - urgent</li>
                  <li>C3 = Improvement recommended</li>
                  <li>FI = Further investigation required</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section1-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Safety Precautions
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section2">
              Next: Section 2 - Inspection
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module5Section1_5;
