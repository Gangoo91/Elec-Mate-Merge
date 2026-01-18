import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "BS 7671 Requirements and Part 6 - Level 3 Module 5 Section 1.2";
const DESCRIPTION = "Understanding the regulatory requirements for inspection and testing under BS 7671 Part 6, including Chapter 61 and 62 requirements.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Which part of BS 7671 covers inspection and testing requirements?",
    options: [
      "Part 2 - Definitions",
      "Part 4 - Protection for Safety",
      "Part 6 - Inspection and Testing",
      "Part 7 - Special Installations"
    ],
    correctIndex: 2,
    explanation: "Part 6 of BS 7671 is dedicated entirely to inspection and testing. Chapter 61 covers initial verification while Chapter 62 covers periodic inspection and testing of existing installations."
  },
  {
    id: "check-2",
    question: "What does Regulation 610.1 require before an installation is put into service?",
    options: [
      "Payment in full from the client",
      "Initial verification including inspection and testing",
      "Connection to the electricity supply",
      "Building control sign-off"
    ],
    correctIndex: 1,
    explanation: "Regulation 610.1 states that every electrical installation shall be inspected and tested during erection and on completion before being put into service. This is a fundamental requirement before energisation."
  },
  {
    id: "check-3",
    question: "According to BS 7671, who should carry out inspection and testing?",
    options: [
      "Only NICEIC registered contractors",
      "Skilled persons competent in such work",
      "The electricity supplier",
      "Building control inspectors"
    ],
    correctIndex: 1,
    explanation: "Regulation 610.5 requires inspection and testing to be carried out by skilled persons competent in such work. Competence is key - this means having the knowledge, skills and experience appropriate for the installation type."
  },
  {
    id: "check-4",
    question: "Chapter 62 of BS 7671 deals with:",
    options: [
      "Initial verification of new installations",
      "Selection and erection of equipment",
      "Periodic inspection and testing",
      "Protection against electric shock"
    ],
    correctIndex: 2,
    explanation: "Chapter 62 specifically covers periodic inspection and testing. It sets out requirements for assessing existing installations to determine whether they remain safe for continued use."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the relationship between BS 7671 and the Electricity at Work Regulations 1989?",
    options: [
      "They are identical documents",
      "BS 7671 provides a means of compliance with the Regulations",
      "The Regulations replace BS 7671",
      "They are completely unrelated"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 is not statutory law but provides a means of complying with the Electricity at Work Regulations 1989. Following BS 7671 demonstrates compliance with the legal requirement for electrical systems to be safe."
  },
  {
    id: 2,
    question: "According to Regulation 611.1, inspection shall include verification of:",
    options: [
      "The client's budget for the work",
      "Equipment complies with BS EN and is properly selected and erected",
      "The contractor's insurance documents",
      "Planning permission for the building"
    ],
    correctAnswer: 1,
    explanation: "Regulation 611.1 lists items that inspection must verify, including that equipment complies with applicable British or Harmonised Standards and is properly selected and erected in accordance with BS 7671."
  },
  {
    id: 3,
    question: "The test sequence specified in BS 7671 requires dead tests to be carried out:",
    options: [
      "After live tests",
      "Before any live tests",
      "At the same time as live tests",
      "Only during periodic inspection"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 specifies that dead tests (continuity, insulation resistance, polarity) must be completed before live tests (earth fault loop impedance, RCD testing). This sequence protects the tester and prevents damage to instruments."
  },
  {
    id: 4,
    question: "What does Regulation 612.1 specify regarding test instrument accuracy?",
    options: [
      "Any instrument can be used",
      "Instruments must comply with BS EN 61557",
      "Only analogue meters are acceptable",
      "Accuracy is not specified"
    ],
    correctAnswer: 1,
    explanation: "Regulation 612.1 requires that instruments used for testing comply with the relevant parts of BS EN 61557, ensuring adequate accuracy and safety for the tests being performed."
  },
  {
    id: 5,
    question: "According to Part 6, what documentation must be provided on completion of initial verification?",
    options: [
      "Only a receipt for payment",
      "An Electrical Installation Certificate with schedules",
      "A verbal confirmation only",
      "A photograph of the installation"
    ],
    correctAnswer: 1,
    explanation: "Regulation 631.1 requires an Electrical Installation Certificate to be issued on completion of initial verification. This must include schedules of inspections and test results as evidence of compliance."
  },
  {
    id: 6,
    question: "Regulation 621.1 requires periodic inspection and testing to be carried out:",
    options: [
      "Only when a fault is suspected",
      "At appropriate intervals determined by various factors",
      "Every 12 months without exception",
      "Only on domestic installations"
    ],
    correctAnswer: 1,
    explanation: "Regulation 621.1 specifies that periodic inspection should be carried out at appropriate intervals. The interval depends on factors including installation type, use, external influences, and maintenance frequency."
  },
  {
    id: 7,
    question: "What must be done if inspection and testing reveals a defect that could cause danger?",
    options: [
      "Record it and do nothing",
      "Wait until the next inspection",
      "Inform the person ordering the work immediately",
      "Only mention it in the final report"
    ],
    correctAnswer: 2,
    explanation: "Regulation 634.2 requires that if inspection or testing discovers a defect or omission that could cause immediate danger, the person ordering the work must be informed immediately. Safety takes priority over all other considerations."
  },
  {
    id: 8,
    question: "According to BS 7671, inspection shall precede testing and shall normally be carried out:",
    options: [
      "After the installation is energised",
      "With the supply disconnected",
      "By the client",
      "Only in good weather conditions"
    ],
    correctAnswer: 1,
    explanation: "Regulation 611.2 states that inspection shall precede testing and shall normally be carried out with the supply disconnected. This is essential for safety during the inspection process."
  },
  {
    id: 9,
    question: "What is the purpose of the Schedule of Inspections required by Part 6?",
    options: [
      "To list all materials purchased",
      "To provide evidence that inspection has been carried out",
      "To calculate the cost of work",
      "To identify the next contractor"
    ],
    correctAnswer: 1,
    explanation: "The Schedule of Inspections provides systematic evidence that all required inspection items have been checked. It ensures nothing is overlooked and creates a permanent record of what was verified."
  },
  {
    id: 10,
    question: "Regulation 610.4 allows additions and alterations to be made without inspecting the whole installation, provided:",
    options: [
      "The client signs a waiver",
      "The addition does not impair safety of the existing installation",
      "The work costs less than a set amount",
      "Only one circuit is involved"
    ],
    correctAnswer: 1,
    explanation: "Regulation 610.4 states that when additions or alterations are made, the inspector need not inspect the entire existing installation, provided the addition or alteration does not impair the safety of the existing installation."
  }
];

const faqs = [
  {
    question: "Is BS 7671 a legal requirement?",
    answer: "BS 7671 itself is not law - it is a British Standard. However, the Electricity at Work Regulations 1989 require electrical systems to be safe, and BS 7671 is recognised as the means of demonstrating compliance. Building Regulations Part P also requires domestic electrical work to meet BS 7671 standards."
  },
  {
    question: "What is the difference between Chapter 61 and Chapter 62?",
    answer: "Chapter 61 covers initial verification of new installations, additions, and alterations before they are put into service. Chapter 62 covers periodic inspection and testing of existing installations to assess their continued safety. Each has different documentation requirements."
  },
  {
    question: "How do I know which tests are required by Part 6?",
    answer: "Regulation 612.2 to 612.16 specify the required tests in the order they should be performed. These include continuity, insulation resistance, SELV/PELV separation, polarity, earth fault loop impedance, additional protection (RCD), and functional testing."
  },
  {
    question: "Can I use any test instruments for compliance with BS 7671?",
    answer: "No. Regulation 612.1 requires instruments to comply with BS EN 61557. They must also be calibrated and properly maintained. Using non-compliant instruments means your test results may not be valid for certification purposes."
  },
  {
    question: "What should I do if I find the existing installation does not meet current standards?",
    answer: "During periodic inspection, you report the condition of the installation using classification codes. An existing installation need not comply with current standards unless the non-compliance creates a danger. Your EICR should note observations and recommend appropriate action."
  }
];

const Level3Module5Section1_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
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
            <span>Module 5.1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            BS 7671 Requirements and Part 6
          </h1>
          <p className="text-white/80">
            Understanding the regulatory framework for inspection and testing
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Part 6:</strong> Dedicated to inspection and testing</li>
              <li><strong>Chapter 61:</strong> Initial verification requirements</li>
              <li><strong>Chapter 62:</strong> Periodic inspection requirements</li>
              <li><strong>Chapter 63:</strong> Certification and reporting</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Regulation numbers guide specific requirements</li>
              <li><strong>Use:</strong> Part 6 as your testing reference</li>
              <li><strong>Apply:</strong> Correct test sequence from regulations</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Structure and content of BS 7671 Part 6",
              "Key regulations for initial verification (Chapter 61)",
              "Requirements for periodic inspection (Chapter 62)",
              "Certification requirements (Chapter 63)",
              "Relationship between BS 7671 and statutory regulations",
              "Test instrument requirements and standards"
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
            Understanding Part 6 Structure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Part 6 of BS 7671 is the foundation document for all inspection and testing work. It establishes what must be inspected, what must be tested, how tests should be carried out, and what documentation is required. Understanding this structure is essential for competent practice.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Part 6 is divided into three chapters:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Chapter 61:</strong> Initial Verification - requirements for inspecting and testing new work before energisation</li>
                <li><strong>Chapter 62:</strong> Periodic Inspection and Testing - requirements for assessing existing installations</li>
                <li><strong>Chapter 63:</strong> Certification and Reporting - documentation requirements for both types of inspection</li>
              </ul>
            </div>

            <p>
              Each chapter builds on fundamental principles established in earlier parts of BS 7671. Part 6 cannot be understood in isolation - it references protection measures in Part 4 and installation requirements in Part 5. The tests verify that these requirements have been met.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Part 6 tells you what to do and provides the framework. Guidance Note 3 provides practical guidance on how to do it. Both are essential references.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Chapter 61: Initial Verification Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Chapter 61 sets out the mandatory requirements for initial verification. The key regulation is 610.1 which states that every installation shall be inspected and tested during erection and on completion, before being put into service.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Section 61 Regulations</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>610.1:</strong> When verification is required</li>
                  <li><strong>610.4:</strong> Additions and alterations</li>
                  <li><strong>610.5:</strong> Competence of persons</li>
                  <li><strong>611.1-611.3:</strong> Inspection requirements</li>
                  <li><strong>612.1-612.16:</strong> Testing requirements</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inspection Must Verify</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Equipment complies with BS EN standards</li>
                  <li>Correct selection for conditions</li>
                  <li>Proper erection and connection</li>
                  <li>No visible damage affecting safety</li>
                  <li>Adequate access for operation</li>
                </ul>
              </div>
            </div>

            <p>
              Regulation 612.2 onwards specifies the required tests in the sequence they should be performed. This sequence is critical - dead tests must precede live tests for safety reasons. The regulation numbers correspond to test types: 612.2 (continuity), 612.3 (insulation resistance), and so on.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> When testing a new circuit, you must complete continuity testing (612.2) and insulation resistance testing (612.3) before moving to earth fault loop impedance (612.9). This protects both you and your instruments from potential hazards.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Chapter 62: Periodic Inspection Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Chapter 62 addresses the ongoing need to verify that existing installations remain safe. Electrical installations deteriorate over time due to environmental factors, wear and tear, corrosion, and damage. Periodic inspection identifies these problems before they cause harm.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Chapter 62 requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Regulation 621.1:</strong> Requires inspection at appropriate intervals determined by type of installation, use, and external influences</li>
                <li><strong>Regulation 621.2:</strong> Specifies what periodic inspection must determine - safety for continued use</li>
                <li><strong>Regulation 622.1:</strong> Extent of periodic inspection should be agreed beforehand</li>
                <li><strong>Regulation 622.2:</strong> Specifies items to be covered during periodic inspection</li>
              </ul>
            </div>

            <p>
              Unlike initial verification where 100% compliance is required, periodic inspection assesses the condition of what already exists. The installation may have been compliant when installed to earlier regulations but not meet current standards. This is acceptable provided there is no danger.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Periodic inspection is condition reporting, not certification of compliance. The EICR reports what you find, classifies any defects, and recommends action - it does not certify the installation as fully compliant.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Legal Framework and Statutory Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 is a British Standard, not legislation. However, it has legal standing through its relationship with statutory regulations. Understanding this relationship is important for professional practice and potential liability.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">EAW Regs 1989</p>
                <p className="text-white/90 text-xs">Legal requirement for safe electrical systems at work</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Building Regs Part P</p>
                <p className="text-white/90 text-xs">Requires domestic work to meet BS 7671</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">BS 7671</p>
                <p className="text-white/90 text-xs">Means of demonstrating compliance</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key statutory connections:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Electricity at Work Regulations 1989:</strong> Regulation 4 requires systems to be constructed and maintained to prevent danger. BS 7671 compliance demonstrates this.</li>
                <li><strong>Building Regulations Part P:</strong> Requires electrical work in dwellings to meet BS 7671. Non-notifiable work must still comply.</li>
                <li><strong>Health and Safety at Work Act 1974:</strong> General duty to ensure safety. Electrical compliance is part of this duty.</li>
                <li><strong>Landlord and Tenant Act:</strong> Requires periodic inspection of rental properties (currently 5-year intervals for England).</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> If an electrical fire occurs and investigation reveals the installation was not tested in accordance with BS 7671, the installer may face prosecution under the Electricity at Work Regulations. Following BS 7671 Part 6 provides defence evidence.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Applying Part 6 Requirements</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Keep a copy of BS 7671 accessible during inspection and testing work</li>
                <li>Use the regulation numbers to justify your testing approach</li>
                <li>Follow the test sequence specified in Section 612</li>
                <li>Document any departures from standard procedures with reasons</li>
                <li>Cross-reference with Guidance Note 3 for practical methods</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Test Instrument Requirements</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Instruments must comply with BS EN 61557 (Reg 612.1)</li>
                <li>Maintain calibration records - typically annual calibration</li>
                <li>Check instruments are suitable for the voltage and conditions</li>
                <li>Test leads must comply with GS38 requirements</li>
                <li>Verify instrument accuracy using check boxes where available</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Skipping the sequence</strong> - Dead tests must precede live tests as specified</li>
                <li><strong>Using uncalibrated instruments</strong> - Results are not valid for certification</li>
                <li><strong>Incomplete documentation</strong> - All schedules must be completed fully</li>
                <li><strong>Ignoring Regulation 610.4</strong> - Additions must not impair existing installation safety</li>
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
                <p className="font-medium text-white mb-1">Key Regulation Numbers</p>
                <ul className="space-y-0.5">
                  <li>610.1 - Initial verification requirement</li>
                  <li>610.5 - Competence requirement</li>
                  <li>612.1 - Instrument standards</li>
                  <li>621.1 - Periodic inspection intervals</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Test Sequence (Section 612)</p>
                <ul className="space-y-0.5">
                  <li>612.2 - Continuity</li>
                  <li>612.3 - Insulation resistance</li>
                  <li>612.6 - Polarity</li>
                  <li>612.9 - Earth fault loop impedance</li>
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
            <Link to="/study-centre/apprentice/level3-module5-section1-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Purpose of I&T
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module5-section1-3">
              Next: Test Sequence (GN3)
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module5Section1_2;
