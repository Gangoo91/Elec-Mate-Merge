/**
 * Level 3 Module 7 Section 2.3 - Documentation and Record-keeping
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Documentation and Record-keeping - Level 3 Module 7 Section 2.3";
const DESCRIPTION = "Understanding the importance of accurate documentation, electrical certification, and professional record-keeping for electrical installation work.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the primary purpose of an Electrical Installation Certificate (EIC)?",
    options: [
      "To provide a warranty for the installation",
      "To confirm the installation complies with BS 7671 at the time of completion",
      "To prove the electrician is qualified",
      "To satisfy insurance requirements only"
    ],
    correctIndex: 1,
    explanation: "An EIC confirms that a new installation or complete rewire has been designed, constructed, inspected, and tested in accordance with BS 7671. It declares compliance at the time of completion and provides essential safety documentation."
  },
  {
    id: "check-2",
    question: "When should a Minor Electrical Installation Works Certificate (MEIWC) be issued?",
    options: [
      "For any work that takes less than one day",
      "For additions or alterations that don't include a new circuit",
      "Only for DIY work",
      "For emergency call-outs only"
    ],
    correctIndex: 1,
    explanation: "A MEIWC is appropriate for minor work that doesn't involve a new circuit, such as adding a socket to an existing circuit. New circuits, consumer unit changes, and complete installations require a full EIC."
  },
  {
    id: "check-3",
    question: "How long should you retain copies of electrical certificates?",
    options: [
      "1 year",
      "3 years",
      "At least 6 years, preferably longer",
      "They can be discarded after the job is complete"
    ],
    correctIndex: 2,
    explanation: "Certificates should be retained for at least 6 years to cover the limitation period for civil claims. Many schemes require longer retention, and records can be invaluable for future work or if incidents occur."
  },
  {
    id: "check-4",
    question: "What is an Electrical Installation Condition Report (EICR)?",
    options: [
      "A certificate for new installations",
      "A report on the condition of an existing installation",
      "A minor works certificate",
      "An insurance document"
    ],
    correctIndex: 1,
    explanation: "An EICR is a formal report on the condition of an existing installation, identifying any damage, deterioration, defects, or non-compliances. It's required for rental properties and recommended at regular intervals for all installations."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Who is responsible for providing the Electrical Installation Certificate to the client?",
    options: [
      "The manufacturer of the consumer unit",
      "The designer and/or installer who completed the work",
      "Building Control only",
      "The electricity distributor"
    ],
    correctAnswer: 1,
    explanation: "The contractor who designed, installed, and tested the work is responsible for providing the EIC to the client. For Competent Person Scheme work, the scheme also notifies Building Control, but the certificate goes to the client."
  },
  {
    id: 2,
    question: "Schedule of Inspections and Schedule of Test Results must be:",
    options: [
      "Kept by the contractor only",
      "Attached to the EIC or EICR and given to the client",
      "Filed with the HSE",
      "Only completed for commercial work"
    ],
    correctAnswer: 1,
    explanation: "The schedules form part of the certification and must be attached to and issued with the EIC or EICR. They provide the detailed evidence supporting the certificate's conclusions."
  },
  {
    id: 3,
    question: "What coding is used on an EICR to indicate a dangerous condition requiring immediate action?",
    options: [
      "C1 - Danger present",
      "C2 - Potentially dangerous",
      "C3 - Improvement recommended",
      "FI - Further investigation required"
    ],
    correctAnswer: 0,
    explanation: "C1 indicates danger is present - risk of injury exists and immediate remedial action is required. C2 indicates potential danger requiring urgent remedial action. C3 indicates improvement is recommended but not mandatory."
  },
  {
    id: 4,
    question: "For a complete new installation, how many copies of the EIC should typically be produced?",
    options: [
      "One copy for the client only",
      "At least two - one for client, one for contractor records",
      "Only one for the Competent Person Scheme",
      "No copies needed if notified electronically"
    ],
    correctAnswer: 1,
    explanation: "At least two copies should be produced: one for the client (who owns the installation and needs records for future reference) and one for the contractor's records. Schemes may require additional notification copies."
  },
  {
    id: 5,
    question: "What information must be included on an Electrical Installation Certificate?",
    options: [
      "Just the address and date",
      "Details of the installation, design, construction, inspection, and test results",
      "Only the test results",
      "Only the contractor's insurance details"
    ],
    correctAnswer: 1,
    explanation: "An EIC must include: installation address, designer/installer/tester details, description of installation, supply characteristics, inspection and test results schedules, declarations of compliance, and any departures from BS 7671."
  },
  {
    id: 6,
    question: "If an EICR reveals several C2 observations, the installation is classified as:",
    options: [
      "Satisfactory",
      "Unsatisfactory",
      "Not applicable",
      "Pending review"
    ],
    correctAnswer: 1,
    explanation: "If any C1 or C2 observations are recorded, the overall condition is classified as 'Unsatisfactory'. Only installations with no C1 or C2 observations can be classified as 'Satisfactory'."
  },
  {
    id: 7,
    question: "A departure from BS 7671 recorded on an EIC indicates:",
    options: [
      "The work is non-compliant and must be redone",
      "A documented variance where equivalent safety has been achieved another way",
      "The electrician made an error",
      "The certificate is invalid"
    ],
    correctAnswer: 1,
    explanation: "Departures are documented variances from the standard where equivalent or better safety is achieved by an alternative method. BS 7671 allows departures if they don't result in a lesser degree of safety. These must be recorded and justified."
  },
  {
    id: 8,
    question: "Documentation for notifiable work must be provided to the client within:",
    options: [
      "24 hours",
      "7 days",
      "30 days (or as specified by scheme/Building Regs)",
      "No time limit applies"
    ],
    correctAnswer: 2,
    explanation: "Building Regulations and Competent Person Schemes typically require documentation within 30 days of completion. Some schemes require faster notification. Always check your scheme's specific requirements."
  },
  {
    id: 9,
    question: "A Schedule of Inspections for a new installation should verify:",
    options: [
      "Only that cables are correctly sized",
      "All relevant inspection checklist items required by BS 7671",
      "Only the consumer unit installation",
      "Just the RCD protection"
    ],
    correctAnswer: 1,
    explanation: "The Schedule of Inspections covers all relevant items from the BS 7671 checklist applicable to the installation, including cable selection, routing, connections, protective devices, labelling, and accessible for inspection items."
  },
  {
    id: 10,
    question: "Why is accurate documentation particularly important in the electrical industry?",
    options: [
      "It is only needed for large commercial projects",
      "It provides evidence of compliance and protects against future liability claims",
      "It is optional but preferred",
      "It is only required by some Competent Person Schemes"
    ],
    correctAnswer: 1,
    explanation: "Accurate documentation provides evidence of compliance with standards, supports future maintenance and modifications, protects against liability claims, and is required by regulations. It's essential for all electrical work, not just large projects."
  },
  {
    id: 11,
    question: "What should happen to documentation if an existing installation is altered?",
    options: [
      "The original EIC remains valid with no updates",
      "A new EIC or MEIWC should be issued for the alteration, referencing the original",
      "All previous documentation becomes invalid",
      "Only verbal communication is needed"
    ],
    correctAnswer: 1,
    explanation: "Alterations require appropriate certification (EIC for new circuits, MEIWC for minor additions). This documents the new work while the original certification remains valid for unaffected parts of the installation."
  },
  {
    id: 12,
    question: "Test instruments used for certification must be:",
    options: [
      "Any instruments that appear to work correctly",
      "Calibrated and accuracy verified, with records maintained",
      "Only purchased from approved suppliers",
      "Replaced every year regardless of condition"
    ],
    correctAnswer: 1,
    explanation: "Test instruments must be calibrated at appropriate intervals (typically annually) with calibration certificates maintained. Accuracy should also be verified before use. Using uncalibrated instruments invalidates test results."
  }
];

const faqs = [
  {
    question: "What's the difference between an EIC and an EICR?",
    answer: "An EIC (Electrical Installation Certificate) is for new installations or complete rewires - it declares the new work complies with BS 7671. An EICR (Electrical Installation Condition Report) is for existing installations - it reports on their condition and identifies any defects or deterioration."
  },
  {
    question: "Can I issue a Minor Works Certificate for a consumer unit change?",
    answer: "No. Consumer unit replacements require a full EIC because they involve work on the main protective devices and often include circuit modifications. They also constitute notifiable work under Part P and require appropriate certification."
  },
  {
    question: "What if I discover dangerous work done by someone else during an EICR?",
    answer: "You must record it as a C1 observation and inform the client/duty holder immediately, preferably in writing. Your duty of care requires you to make them aware of the danger. Consider making the immediate hazard safe if possible and practical."
  },
  {
    question: "How do I handle documentation when multiple electricians work on an installation?",
    answer: "Typically one contractor takes overall responsibility and issues the certification. Sub-contractors provide their test results and confirm their portions meet requirements. The responsible person verifies all work before signing the certificate."
  },
  {
    question: "What if test results are borderline but just acceptable?",
    answer: "Document the actual values - never round up or estimate. Borderline values may indicate degradation that could become unacceptable. Consider recommending earlier than normal re-inspection intervals and note any concerns in observations."
  },
  {
    question: "Do I need to keep calibration certificates for my test equipment?",
    answer: "Yes. You should maintain calibration certificates and records of instrument verification. If your test results are ever questioned, you'll need to prove your instruments were accurate at the time of testing."
  }
];

const Level3Module7Section2_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>EIC:</strong> For new installations and rewires</li>
              <li><strong>MEIWC:</strong> For minor additions to existing circuits</li>
              <li><strong>EICR:</strong> Condition report for existing installations</li>
              <li><strong>Retention:</strong> Keep records for at least 6 years</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Why Documentation Matters</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Compliance:</strong> Proves work meets standards</li>
              <li><strong>Protection:</strong> Evidence if claims arise</li>
              <li><strong>Future work:</strong> Helps later maintenance</li>
              <li><strong>Legal:</strong> Required by regulations</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01: Electrical Installation Certificate */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Electrical Installation Certificate (EIC)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Electrical Installation Certificate is the primary document for new electrical installations. It provides formal declaration that the installation has been designed, constructed, inspected, and tested in accordance with BS 7671. Every new installation, complete rewire, or installation of new circuits requires an EIC.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">An EIC must include:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Details of the installation address and extent of work covered</li>
                <li>Supply characteristics (voltage, frequency, earthing system)</li>
                <li>Declaration sections for design, construction, and inspection/testing</li>
                <li>Schedule of Inspections - checklist of verified items</li>
                <li>Schedule of Test Results - actual measured values</li>
                <li>Any departures from BS 7671 with justification</li>
              </ul>
            </div>

            <p>
              The certificate has separate declaration sections because design, construction, and testing may be done by different people. Each person signs for the work they're responsible for. For most small installations, one person does all three and signs all sections.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> An EIC is a legal document. Signing it declares the work complies with BS 7671. False certification can result in prosecution and removal from Competent Person Schemes.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Minor Works and Condition Reports */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Minor Works and Condition Reports
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Not all work requires a full EIC. The Minor Electrical Installation Works Certificate (MEIWC) is designed for additions and alterations to existing circuits that don't involve new circuit installation. This streamlined document covers common jobs like adding sockets or lights to existing circuits.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">MEIWC is appropriate for:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Adding socket outlets to an existing circuit</li>
                  <li>Adding lighting points to existing circuit</li>
                  <li>Replacing accessories like switches and sockets</li>
                  <li>Like-for-like equipment replacement</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Full EIC required for:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Installation of new circuits</li>
                  <li>Consumer unit replacement</li>
                  <li>Complete rewires</li>
                  <li>New installations</li>
                </ul>
              </div>
            </div>

            <p>
              The Electrical Installation Condition Report (EICR) is different - it's not a certificate of compliance but a report on an existing installation's condition. It identifies deterioration, damage, defects, and non-compliances, using a coding system to indicate severity.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Since 2020, EICRs are legally required for rental properties in England. Landlords must obtain an EICR before new tenancies and at least every 5 years, with a satisfactory report required.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Record Retention */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Record Retention and Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper record retention protects you professionally and legally. If a claim arises years after completing work, your documentation provides evidence of what was done and that it met standards at the time. Without records, you cannot defend your work.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Records to retain:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Copies of all EICs, MEIWCs, and EICRs issued</li>
                <li>Schedules of inspections and test results</li>
                <li>Photographs of installations (especially hidden work)</li>
                <li>Correspondence with clients about the work</li>
                <li>Instrument calibration certificates</li>
                <li>CPD records and training certificates</li>
              </ul>
            </div>

            <p>
              The limitation period for civil claims is typically 6 years, but this can be extended in some circumstances. Many contractors retain records for longer. Digital storage makes long-term retention practical - scan paper documents and back up securely.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Your Competent Person Scheme may specify minimum retention periods. Check your scheme requirements and treat them as minimums, not targets.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: EICR Coding */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            EICR Coding and Classifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              EICRs use a standardised coding system to classify observations. Understanding these codes is essential for both completing EICRs correctly and interpreting reports from others. The overall condition classification depends on the worst code recorded.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-red-500/30">
                <p className="font-medium text-red-400 mb-1">C1</p>
                <p className="text-white/90 text-xs">Danger present - immediate action required</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-orange-500/30">
                <p className="font-medium text-orange-400 mb-1">C2</p>
                <p className="text-white/90 text-xs">Potentially dangerous - urgent action required</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-yellow-500/30">
                <p className="font-medium text-yellow-400 mb-1">C3</p>
                <p className="text-white/90 text-xs">Improvement recommended</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-blue-500/30">
                <p className="font-medium text-blue-400 mb-1">FI</p>
                <p className="text-white/90 text-xs">Further investigation required</p>
              </div>
            </div>

            <p>
              C1 and C2 observations make the overall classification 'Unsatisfactory'. Only installations with no C1 or C2 items (only C3 or no observations) can be classified as 'Satisfactory'. FI items require follow-up investigation but don't automatically make it unsatisfactory.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> An EICR reveals: one C2 (missing earth on a socket), two C3 items (lack of RCD protection on older circuits, missing circuit chart). The overall classification must be 'Unsatisfactory' due to the C2 observation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Best Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Complete documentation at the time of work, not afterwards from memory</li>
                <li>Record actual test values, not rounded or estimated figures</li>
                <li>Take photographs of key installation details, especially hidden work</li>
                <li>Keep digital backups of all certification in secure storage</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When to Seek Advice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Complex installations with unusual configurations</li>
                <li>When test results are borderline or unexpected</li>
                <li>If you find evidence of previous non-compliant work</li>
                <li>When clients dispute your findings on an EICR</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Documentation Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Incomplete schedules:</strong> All applicable items must be checked</li>
                <li><strong>Missing signatures:</strong> All required declaration sections must be signed</li>
                <li><strong>Incorrect form:</strong> Using MEIWC when EIC is required</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Certificate Selection</p>
                <ul className="space-y-0.5">
                  <li>New circuit = EIC</li>
                  <li>Consumer unit change = EIC</li>
                  <li>Rewire = EIC</li>
                  <li>Socket to existing circuit = MEIWC</li>
                  <li>Condition check = EICR</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">EICR Classification</p>
                <ul className="space-y-0.5">
                  <li>Any C1 or C2 = Unsatisfactory</li>
                  <li>Only C3 or none = Satisfactory</li>
                  <li>FI = Further investigation needed</li>
                  <li>C1 = Immediate danger</li>
                  <li>C2 = Potential danger</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section2-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Codes of Practice
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module7-section2-4">
              Next: Professional Behaviour
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module7Section2_3;
