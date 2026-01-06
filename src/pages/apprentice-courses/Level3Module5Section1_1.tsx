import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Purpose of Inspection and Testing - Level 3 Module 5 Section 1.1";
const DESCRIPTION = "Understanding initial verification vs periodic inspection and their respective purposes in electrical installations under BS 7671.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "When must initial verification be carried out?",
    options: [
      "Only after a fault is reported",
      "Before the installation is energised for the first time",
      "Every 5 years as a routine check",
      "Only for domestic installations"
    ],
    correctIndex: 1,
    explanation: "Initial verification must be completed before a new installation or addition is put into service. This ensures the installation is safe before any current flows through the conductors."
  },
  {
    id: "check-2",
    question: "What is the main purpose of periodic inspection?",
    options: [
      "To certify new installations",
      "To check if the installation still complies with regulations and is safe for continued use",
      "To replace old wiring",
      "To upgrade the consumer unit"
    ],
    correctIndex: 1,
    explanation: "Periodic inspection determines whether an existing installation remains safe for continued use, identifying deterioration, damage, defects, and non-compliances that have developed over time."
  },
  {
    id: "check-3",
    question: "Who is responsible for ensuring initial verification is carried out?",
    options: [
      "The electricity supplier",
      "The client only",
      "The person or organisation carrying out the installation work",
      "The local authority"
    ],
    correctIndex: 2,
    explanation: "The contractor or installer carrying out the work has the duty to verify their installation complies with BS 7671 before it is put into service. This is both a legal and professional responsibility."
  },
  {
    id: "check-4",
    question: "What document is issued after a successful initial verification?",
    options: [
      "Electrical Condition Report (EICR)",
      "Electrical Installation Certificate (EIC)",
      "Minor Works Certificate only",
      "Maintenance Report"
    ],
    correctIndex: 1,
    explanation: "An Electrical Installation Certificate (EIC) is issued after initial verification of a new installation or addition. For smaller additions, a Minor Works Certificate may be appropriate."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What are the two main types of inspection and testing defined in BS 7671?",
    options: [
      "Visual inspection and dead testing",
      "Initial verification and periodic inspection",
      "Continuity testing and insulation testing",
      "Pre-commissioning and commissioning"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Part 6 defines two categories: Initial Verification (Chapter 61) for new or altered installations, and Periodic Inspection and Testing (Chapter 62) for existing installations to assess continued safety."
  },
  {
    id: 2,
    question: "Initial verification must be carried out:",
    options: [
      "After the installation has been in use for 6 months",
      "During construction and on completion before energisation",
      "Only if requested by the client",
      "By the electricity supplier before connection"
    ],
    correctAnswer: 1,
    explanation: "Regulation 610.1 requires initial verification during erection and on completion. Some tests must be done during construction (e.g., checking conductors before concealment), while others are done on completion before energisation."
  },
  {
    id: 3,
    question: "What is the primary purpose of initial verification?",
    options: [
      "To demonstrate the installation to the client",
      "To establish that the installation complies with BS 7671",
      "To satisfy the electricity supplier",
      "To obtain planning permission"
    ],
    correctAnswer: 1,
    explanation: "Initial verification establishes that the installation complies with BS 7671 requirements. This protects persons, property and livestock from electric shock, fire, burns and injury from mechanical movement."
  },
  {
    id: 4,
    question: "When carrying out periodic inspection, which document is issued?",
    options: [
      "Electrical Installation Certificate (EIC)",
      "Building Regulations Compliance Certificate",
      "Electrical Installation Condition Report (EICR)",
      "Minor Electrical Installation Works Certificate"
    ],
    correctAnswer: 2,
    explanation: "Periodic inspection results in an Electrical Installation Condition Report (EICR). This reports on the condition of an existing installation rather than certifying new work as compliant."
  },
  {
    id: 5,
    question: "Which of the following is NOT a reason for periodic inspection?",
    options: [
      "Deterioration due to age",
      "Certification of new circuits",
      "Changes in use of premises",
      "Damage to the installation"
    ],
    correctAnswer: 1,
    explanation: "Periodic inspection assesses existing installations for deterioration, damage, and changes. Certification of new circuits requires initial verification and an EIC or Minor Works Certificate, not periodic inspection."
  },
  {
    id: 6,
    question: "According to BS 7671, what is the recommended maximum interval for periodic inspection of a domestic installation?",
    options: [
      "Every year",
      "Every 3 years",
      "Every 10 years or change of occupancy",
      "Every 25 years"
    ],
    correctAnswer: 2,
    explanation: "Guidance Note 3 recommends periodic inspection of domestic premises every 10 years or at change of occupancy. More frequent inspection may be needed if problems are suspected or conditions are harsh."
  },
  {
    id: 7,
    question: "What percentage of an installation should typically be inspected and tested during periodic inspection?",
    options: [
      "25%",
      "100% of the installation",
      "10% representative sample",
      "Only the consumer unit"
    ],
    correctAnswer: 1,
    explanation: "For a comprehensive EICR, 100% of the installation should be inspected and tested. A representative sample may only be appropriate in specific circumstances, such as large installations with multiple identical circuits."
  },
  {
    id: 8,
    question: "Initial verification includes inspection to verify that equipment:",
    options: [
      "Is the cheapest available option",
      "Is properly selected and erected in accordance with BS 7671",
      "Has been purchased from approved suppliers",
      "Is available for immediate replacement"
    ],
    correctAnswer: 1,
    explanation: "Part 6 requires verification that equipment is properly selected according to the design, correctly erected, not visibly damaged, and suitable for the environmental conditions where installed."
  },
  {
    id: 9,
    question: "What should happen if initial verification reveals a defect?",
    options: [
      "Ignore minor defects and energise",
      "Document and hand over to the client to fix",
      "Rectify the defect before the installation is put into service",
      "Issue a C3 code and proceed"
    ],
    correctAnswer: 2,
    explanation: "Any defects found during initial verification must be rectified before the installation is energised. Unlike periodic inspection where existing defects are reported, initial verification requires compliance before the EIC is issued."
  },
  {
    id: 10,
    question: "The person carrying out initial verification must be:",
    options: [
      "An approved contractor only",
      "Competent to inspect, test, and verify compliance with BS 7671",
      "Employed by the electricity supplier",
      "A building control officer"
    ],
    correctAnswer: 1,
    explanation: "Regulation 610.5 requires that persons carrying out inspection and testing be competent. This means having adequate knowledge, skills, and experience for the type of installation being verified."
  }
];

const faqs = [
  {
    question: "What is the difference between initial verification and periodic inspection?",
    answer: "Initial verification is carried out on new installations or additions before they are energised, confirming compliance with BS 7671 and resulting in an EIC. Periodic inspection assesses existing installations for continued safety, identifying deterioration and defects that have developed over time, resulting in an EICR."
  },
  {
    question: "Can I energise an installation before completing initial verification?",
    answer: "No. BS 7671 Regulation 610.1 requires initial verification to be completed before an installation is put into service. Energising without verification creates serious safety risks and is non-compliant with regulations."
  },
  {
    question: "How often should periodic inspection be carried out?",
    answer: "This depends on the installation type. Domestic installations typically require inspection every 10 years or at change of occupancy. Commercial premises may require inspection every 5 years, while swimming pools and similar special locations may need annual inspection."
  },
  {
    question: "Who can carry out inspection and testing?",
    answer: "Only competent persons can carry out inspection and testing. Competence means having adequate knowledge of electrical installations, the requirements of BS 7671, and the practical skills to carry out tests safely and accurately. This typically requires appropriate qualifications and experience."
  },
  {
    question: "What happens if defects are found during periodic inspection?",
    answer: "Defects are classified using coding (C1, C2, C3, FI). The inspector must inform the client of any dangerous conditions (C1) immediately. All findings are documented on the EICR with recommended remedial actions. Unlike initial verification, the installation may remain in use with appropriate precautions while repairs are planned."
  }
];

const Level3Module5Section1_1 = () => {
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
            <Link to="../level3-module5-section1">
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
            <span>Module 5.1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Purpose of Inspection and Testing
          </h1>
          <p className="text-white/80">
            Understanding initial verification and periodic inspection requirements
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Initial verification:</strong> Done on new work before energisation</li>
              <li><strong>Periodic inspection:</strong> Done on existing installations to check safety</li>
              <li><strong>EIC:</strong> Certificate for new installations</li>
              <li><strong>EICR:</strong> Condition report for existing installations</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> New circuits or installations requiring EIC</li>
              <li><strong>Use:</strong> Correct certification for the type of work</li>
              <li><strong>Apply:</strong> Full test sequence before energisation</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "The purpose and requirements of initial verification",
              "When and why periodic inspection is needed",
              "Key differences between EIC and EICR documentation",
              "Legal responsibilities for inspection and testing",
              "Recommended intervals for periodic inspection",
              "Competence requirements for carrying out testing"
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
            Why Inspection and Testing Matters
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical inspection and testing is not merely a bureaucratic requirement - it is the process that confirms an installation will not kill or injure anyone. Every connection, every protective device, and every circuit must work as designed. Testing proves that theory matches reality.
            </p>
            <p>
              BS 7671 Part 6 establishes two distinct categories: <strong>Initial Verification</strong> for new work, and <strong>Periodic Inspection and Testing</strong> for existing installations. Each serves a different purpose but both aim to protect people from electric shock, fire, and burns.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The fundamental purposes are:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Confirming that the installation is safe to energise</li>
                <li>Verifying compliance with the design and BS 7671</li>
                <li>Identifying defects, damage, and deterioration</li>
                <li>Providing documented evidence of condition</li>
                <li>Protecting the installer from future liability claims</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> An untested installation is an unknown risk. Testing transforms assumptions into certainty.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Initial Verification Explained
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Initial verification is carried out on new installations, additions to existing installations, and alterations. The key word is "initial" - this is the first comprehensive check before the installation is put into service.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When Required</p>
                <ul className="text-sm text-white space-y-1">
                  <li>New complete installations</li>
                  <li>Additions to existing installations</li>
                  <li>Alterations to existing installations</li>
                  <li>After replacement of protective devices</li>
                  <li>Change of use affecting electrical safety</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">What It Establishes</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Equipment is correctly selected</li>
                  <li>Installation matches the design</li>
                  <li>Workmanship is satisfactory</li>
                  <li>No visible damage or defects</li>
                  <li>Compliance with BS 7671</li>
                </ul>
              </div>
            </div>

            <p>
              Initial verification comprises both inspection (visual examination) and testing (using instruments). Some inspection must be done during construction - for example, verifying continuity of concealed conductors before walls are plastered. Other tests are performed on completion.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A new extension with lighting and socket outlets requires initial verification. You must inspect and test the new circuits before they are connected to the existing consumer unit. The result is an EIC covering the new work, referencing any existing installation limitations noted.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Periodic Inspection and Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Periodic inspection assesses existing installations to determine whether they remain safe for continued use. Unlike initial verification which confirms compliance of new work, periodic inspection identifies deterioration, damage, and defects that have developed over time.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Reasons for periodic inspection include:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Age:</strong> Components deteriorate - insulation degrades, connections loosen, corrosion occurs</li>
                <li><strong>Wear and tear:</strong> Normal use causes mechanical wear on switches, sockets, and accessories</li>
                <li><strong>Environmental factors:</strong> Moisture, heat, vibration, and contamination affect installations</li>
                <li><strong>Overloading:</strong> Increased electrical loads may exceed original design capacity</li>
                <li><strong>Damage:</strong> DIY work, rodent damage, building alterations</li>
                <li><strong>Change of use:</strong> Different occupancy or activity may create new risks</li>
                <li><strong>Change of occupancy:</strong> New tenants or owners need to know the installation condition</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> An installation that was compliant when new may no longer be safe after years of service. Periodic inspection reveals the hidden dangers that visual observation alone cannot detect.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Certification and Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The type of certification issued depends on the type of work and inspection carried out. Using the correct document is essential - it provides legal evidence of the work done and the installation condition.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">EIC</p>
                <p className="text-white/90 text-xs">For new installations and substantial alterations</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Minor Works</p>
                <p className="text-white/90 text-xs">For small additions not involving new circuits</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">EICR</p>
                <p className="text-white/90 text-xs">For condition reporting on existing installations</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key documentation differences:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>EIC:</strong> Confirms new work complies with BS 7671 - must be 100% compliant</li>
                <li><strong>Minor Works:</strong> For additions like extra sockets or lighting points</li>
                <li><strong>EICR:</strong> Reports condition and identifies departures from current standards</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> When inspecting a 30-year-old installation, you issue an EICR. This reports the current condition and may note that the installation does not meet current standards (as it was built to earlier regulations). This is different from an EIC which certifies new work as fully compliant.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Carrying Out Initial Verification</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Start inspection during construction - check concealed work before covering</li>
                <li>Obtain design information before beginning work</li>
                <li>Use calibrated test instruments compliant with GS38</li>
                <li>Complete all tests before energising any circuits</li>
                <li>Rectify all defects before issuing certification</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Carrying Out Periodic Inspection</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Agree the extent and limitations with the client beforehand</li>
                <li>Obtain previous test records if available for comparison</li>
                <li>Assess whether 100% or sampling is appropriate</li>
                <li>Report dangerous conditions immediately to the duty holder</li>
                <li>Recommend a date for the next inspection</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Energising before testing</strong> - Creates serious safety risks and is non-compliant</li>
                <li><strong>Using wrong certification</strong> - EIC for new work, EICR for existing installations</li>
                <li><strong>Incomplete records</strong> - All test results must be recorded and retained</li>
                <li><strong>Testing without safe isolation</strong> - Risk of electric shock during dead tests</li>
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
                <p className="font-medium text-white mb-1">Initial Verification</p>
                <ul className="space-y-0.5">
                  <li>New work and alterations</li>
                  <li>Before energisation</li>
                  <li>Results in EIC or Minor Works</li>
                  <li>Must achieve 100% compliance</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Periodic Inspection</p>
                <ul className="space-y-0.5">
                  <li>Existing installations</li>
                  <li>At recommended intervals</li>
                  <li>Results in EICR</li>
                  <li>Reports condition with coding</li>
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
            <Link to="../level3-module5-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module5-section1-2">
              Next: BS 7671 Requirements
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module5Section1_1;
