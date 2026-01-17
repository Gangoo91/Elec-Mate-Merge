import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "BS 7671 Testing Requirements Overview - Inspection & Testing";
const DESCRIPTION = "Comprehensive overview of BS 7671 Part 6 testing requirements, including initial verification, periodic inspection, test sequences, and certification requirements.";

const quickCheckQuestions = [
  {
    id: "part6-coverage",
    question: "Which part of BS 7671 covers inspection and testing requirements?",
    options: ["Part 4", "Part 5", "Part 6", "Part 7"],
    correctIndex: 2,
    explanation: "Part 6 of BS 7671 covers 'Inspection and Testing' including initial verification (Chapter 61) and periodic inspection and testing (Chapter 62)."
  },
  {
    id: "domestic-interval",
    question: "What is the recommended maximum inspection interval for a domestic dwelling?",
    options: ["1 year", "5 years", "10 years", "25 years"],
    correctIndex: 2,
    explanation: "BS 7671 Table 62.1 recommends a maximum interval of 10 years for domestic dwellings (owner-occupied), or 5 years for rented properties."
  },
  {
    id: "dead-tests",
    question: "Which tests must be done before the supply is connected?",
    options: ["RCD tests only", "Earth fault loop tests", "Continuity and insulation resistance tests", "Functional tests"],
    correctIndex: 2,
    explanation: "Dead tests (continuity of protective conductors, insulation resistance, polarity) must be completed before the supply is connected. Live tests follow after."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Regulation 610.1 of BS 7671 requires that every installation shall be:",
    options: ["Inspected once completed", "Tested annually", "Inspected and tested during erection and on completion", "Certified by building control"],
    correctAnswer: 2,
    explanation: "Regulation 610.1 states that every installation shall be inspected and tested during erection and on completion before being put into service."
  },
  {
    id: 2,
    question: "What does Chapter 62 of BS 7671 cover?",
    options: ["Initial verification", "Periodic inspection and testing", "Equipment selection", "Earthing arrangements"],
    correctAnswer: 1,
    explanation: "Chapter 62 covers periodic inspection and testing of existing installations, while Chapter 61 covers initial verification."
  },
  {
    id: 3,
    question: "The recommended inspection interval for an industrial installation is:",
    options: ["1 year", "3 years", "5 years", "10 years"],
    correctAnswer: 1,
    explanation: "Table 62.1 recommends a maximum interval of 3 years for industrial installations."
  },
  {
    id: 4,
    question: "Which document should be issued after initial verification of a new installation?",
    options: ["EICR", "Minor Works Certificate", "Electrical Installation Certificate (EIC)", "PAT Test Certificate"],
    correctAnswer: 2,
    explanation: "An Electrical Installation Certificate (EIC) must be issued after initial verification of a new installation or addition to an existing installation."
  },
  {
    id: 5,
    question: "Visual inspection should be carried out:",
    options: ["After testing", "Before testing", "Only if tests fail", "At random"],
    correctAnswer: 1,
    explanation: "Visual inspection must be carried out before testing, with the installation isolated from the supply."
  },
  {
    id: 6,
    question: "The correct sequence for testing is:",
    options: ["Live tests then dead tests", "Dead tests then live tests", "Tests can be done in any order", "Only dead tests are required"],
    correctAnswer: 1,
    explanation: "Dead tests (continuity, insulation resistance, polarity) must be completed before live tests (earth fault loop, RCD, functional) are carried out."
  },
  {
    id: 7,
    question: "What is the purpose of Guidance Note 3 (GN3)?",
    options: ["To replace BS 7671", "To provide practical guidance on inspection and testing", "To certify electricians", "To define cable sizes"],
    correctAnswer: 1,
    explanation: "GN3 provides practical guidance on implementing Part 6 of BS 7671, including test procedures, equipment requirements, and worked examples."
  },
  {
    id: 8,
    question: "An EICR is required for:",
    options: ["New installations only", "Alterations only", "Periodic inspection of existing installations", "Portable appliances"],
    correctAnswer: 2,
    explanation: "An Electrical Installation Condition Report (EICR) is used for periodic inspection of existing installations to report on their condition."
  },
  {
    id: 9,
    question: "Who must sign an Electrical Installation Certificate?",
    options: ["The client", "Any contractor", "The skilled person who designed, constructed and verified the installation", "A building inspector"],
    correctAnswer: 2,
    explanation: "An EIC must be signed by the skilled persons responsible for design, construction, and inspection & testing of the installation."
  },
  {
    id: 10,
    question: "Swimming pool electrical installations should be inspected at maximum intervals of:",
    options: ["6 months", "1 year", "3 years", "5 years"],
    correctAnswer: 1,
    explanation: "Swimming pools and other special locations require more frequent inspection - typically annually due to the increased risk of electric shock."
  }
];

const faqs = [
  {
    question: "What's the difference between initial verification and periodic inspection?",
    answer: "Initial verification is carried out during and after installation of new work to confirm it meets BS 7671 requirements. Periodic inspection examines existing installations to check they remain safe for continued use. Initial verification results in an EIC; periodic inspection results in an EICR."
  },
  {
    question: "Can I use old certification forms?",
    answer: "Certification forms should align with the current edition of BS 7671. While older forms may be legally valid if completed at the time, it's best practice to use current model forms from the IET or your competent person scheme."
  },
  {
    question: "What if the installation predates BS 7671?",
    answer: "Installations don't have to be upgraded to current standards unless they're unsafe. However, any new work or alterations must comply with current requirements. EICR observations should note where the installation differs from current standards."
  },
  {
    question: "Who should retain copies of certificates?",
    answer: "The client/owner should receive the original certificate. The contractor should retain a copy. For competent person scheme work, the scheme operator also retains copies. Records should be kept for at least the next inspection interval."
  },
  {
    question: "What tests are mandatory for initial verification?",
    answer: "BS 7671 requires: continuity of protective conductors, continuity of ring final circuits, insulation resistance, polarity, earth electrode resistance (where applicable), earth fault loop impedance, prospective fault current, RCD operation, and functional testing."
  },
  {
    question: "Can periodic inspection be done without disconnecting the supply?",
    answer: "While some tests require isolation, periodic inspection can often proceed with circuits live if safe to do so. However, insulation resistance testing requires circuits to be isolated. A risk assessment determines the safest approach."
  }
];

const referenceItems = [
  { label: "Part 6", value: "Inspection & Testing" },
  { label: "Chapter 61", value: "Initial Verification" },
  { label: "Chapter 62", value: "Periodic Inspection" },
  { label: "Reg 610.1", value: "Every installation tested" },
  { label: "Reg 631.1", value: "Visual inspection first" },
  { label: "Reg 650.1", value: "Periodic inspection purpose" },
  { label: "GN3", value: "Guidance Note 3" },
  { label: "EIC", value: "New installations" },
  { label: "EICR", value: "Existing installations" },
];

const InspectionTestingModule1Section2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            BS 7671 Testing Requirements
          </h1>
          <p className="text-white/80">
            A comprehensive overview of Part 6 requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Part 6:</strong> All inspection and testing requirements</li>
              <li><strong>Visual first:</strong> Before any testing begins</li>
              <li><strong>Sequence:</strong> Dead tests before live tests</li>
              <li><strong>Safety:</strong> Correct order prevents injury</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Documents</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>EIC:</strong> New installations</li>
              <li><strong>EICR:</strong> Existing installations</li>
              <li><strong>Minor Works:</strong> Small additions</li>
              <li><strong>GN3:</strong> Practical guidance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand Part 6 of BS 7671",
              "Identify initial verification requirements",
              "Explain periodic inspection requirements",
              "Describe the correct sequence of tests",
              "Understand certification requirements",
              "Apply correct test procedures"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 01: Part 6 Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Part 6 of BS 7671 Overview
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Part 6</strong> of BS 7671 is dedicated entirely to inspection and testing. It provides the requirements for verifying that electrical installations comply with the standard and are safe for use.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Structure of Part 6</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-white mb-1">Chapter 61 - Initial Verification</p>
                  <p className="text-sm text-white/70">Requirements for testing new installations</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Chapter 62 - Periodic Inspection</p>
                  <p className="text-sm text-white/70">Requirements for testing existing installations</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Chapter 63 - Certification & Reporting</p>
                  <p className="text-sm text-white/70">Documentation requirements</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-1">Appendix 6 - Model Forms</p>
                  <p className="text-sm text-white/70">Standard certification templates</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Relationship to Other Parts</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Part 4</strong> - Protection for safety (shock, fire, overcurrent)</li>
                <li><strong>Part 5</strong> - Selection and erection of equipment</li>
                <li><strong>Part 7</strong> - Special installations (additional test requirements)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 02: Initial Verification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Initial Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Initial verification</strong> is required for all new installations, additions, and alterations. It confirms that the installation complies with BS 7671 before being put into service.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 my-6">
              <p className="text-white italic">
                <strong>Regulation 610.1:</strong> "Every installation shall, during erection and on completion before being put into service, be inspected and tested to verify, so far as reasonably practicable, that the requirements of the Regulations have been met."
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When Initial Verification is Required</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>New electrical installations</li>
                <li>Additions to existing installations</li>
                <li>Alterations to existing installations</li>
                <li>After major modifications or repairs</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Extent of Initial Verification</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>New installation:</strong> All tests on all circuits</li>
                <li><strong>Addition:</strong> Tests on new work plus verification existing installation can accommodate it</li>
                <li><strong>Alteration:</strong> Tests on altered work plus verification of non-interference with existing installation</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Periodic Inspection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Periodic Inspection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>Periodic inspection and testing</strong> examines existing installations to confirm they remain safe for continued use. It identifies wear, damage, deterioration, and defects.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 my-6">
              <p className="text-white italic">
                <strong>Regulation 650.1:</strong> "Periodic inspection and testing shall reveal whether an installation is in a satisfactory condition for continued use."
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recommended Maximum Intervals (Table 62.1)</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-white">Installation Type</th>
                      <th className="text-right py-2 text-elec-yellow">Max Interval</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/5">
                      <td className="py-2">Domestic (owner occupied)</td>
                      <td className="text-right text-elec-yellow">10 years</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Domestic (rented/change of tenancy)</td>
                      <td className="text-right text-elec-yellow">5 years</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Commercial</td>
                      <td className="text-right text-elec-yellow">5 years</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Industrial</td>
                      <td className="text-right text-elec-yellow">3 years</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Swimming pools</td>
                      <td className="text-right text-elec-yellow">1 year</td>
                    </tr>
                    <tr>
                      <td className="py-2">Construction sites</td>
                      <td className="text-right text-elec-yellow">3 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-orange-400/90">
              <strong>Note:</strong> These are maximum intervals. Risk assessment may require more frequent inspection. Change of use, building alterations, or environmental factors may reduce appropriate intervals.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 04: Required Tests Sequence */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Required Tests Sequence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Tests must be carried out in the correct sequence for safety reasons. The order ensures that any faults are identified before the installation is energised.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Stage 1: Visual Inspection (Supply Off)</p>
              <p className="text-sm text-white/70 ml-4">Regulation 631.1 requires visual inspection before testing commences.</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Stage 2: Dead Tests (Supply Isolated)</p>
              <ol className="text-sm text-white space-y-2 ml-4">
                <li><span className="text-elec-yellow">1.</span> Continuity of protective conductors (R1+R2)</li>
                <li><span className="text-elec-yellow">2.</span> Continuity of ring final circuit conductors</li>
                <li><span className="text-elec-yellow">3.</span> Insulation resistance</li>
                <li><span className="text-elec-yellow">4.</span> Polarity (can also be live)</li>
              </ol>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Stage 3: Live Tests (Supply Connected)</p>
              <ol className="text-sm text-white space-y-2 ml-4" start={5}>
                <li><span className="text-green-400">5.</span> Earth electrode resistance (where applicable)</li>
                <li><span className="text-green-400">6.</span> Earth fault loop impedance (Ze and Zs)</li>
                <li><span className="text-green-400">7.</span> Prospective fault current</li>
                <li><span className="text-green-400">8.</span> RCD operation (trip time testing)</li>
                <li><span className="text-green-400">9.</span> Functional testing</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Section 05: Certification Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Certification Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Chapter 63 of BS 7671 requires that appropriate certification is provided on completion of initial verification and periodic inspection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Certification</p>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-green-400 mb-1">Electrical Installation Certificate (EIC)</p>
                  <p className="text-sm text-white/70">For new installations or additions/alterations. Confirms compliance with BS 7671. Includes Schedule of Inspections and Schedule of Test Results.</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-400 mb-1">Electrical Installation Condition Report (EICR)</p>
                  <p className="text-sm text-white/70">For periodic inspection of existing installations. Reports on condition rather than confirming compliance. Uses classification codes for observations.</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-orange-400 mb-1">Minor Electrical Installation Works Certificate</p>
                  <p className="text-sm text-white/70">For minor work that doesn't include new circuits. Examples: adding a socket to an existing circuit, replacing a consumer unit like-for-like.</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Who Can Sign Certificates</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>EIC:</strong> Designer, constructor, and person responsible for inspection & testing (may be different people)</li>
                <li><strong>EICR:</strong> The person responsible for the inspection and testing</li>
                <li><strong>Minor Works:</strong> The person carrying out the work</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 06: Guidance Note 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Guidance Note 3 (GN3)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              <strong>IET Guidance Note 3 (GN3)</strong> is an essential companion to BS 7671 Part 6. It provides practical guidance on implementing inspection and testing requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What GN3 Covers</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Detailed test procedures and methods</li>
                <li>Worked examples of test calculations</li>
                <li>Equipment requirements and selection</li>
                <li>Recording and documentation guidance</li>
                <li>Common problems and solutions</li>
                <li>Expanded explanation of BS 7671 requirements</li>
              </ul>
            </div>

            <p className="text-sm text-white/70 italic">
              GN3 does <strong>not</strong> replace or override BS 7671. Where there appears to be conflict, BS 7671 takes precedence. GN3 provides interpretation and practical application guidance.
            </p>

            <div className="my-6 grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-elec-yellow font-semibold text-sm">Chapter 2</p>
                <p className="text-sm text-white/60">Test equipment requirements</p>
              </div>
              <div>
                <p className="text-elec-yellow font-semibold text-sm">Chapter 3</p>
                <p className="text-sm text-white/60">Visual inspection guidance</p>
              </div>
              <div>
                <p className="text-elec-yellow font-semibold text-sm">Chapter 4</p>
                <p className="text-sm text-white/60">Testing methods and procedures</p>
              </div>
              <div>
                <p className="text-elec-yellow font-semibold text-sm">Chapter 5</p>
                <p className="text-sm text-white/60">Certification and reporting</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Applying BS 7671 in Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always have the current edition of BS 7671 available on site</li>
                <li>Use GN3 for detailed test procedure guidance</li>
                <li>Check for amendments that may affect your work</li>
                <li>Reference specific regulations in your documentation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Common Mistakes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Testing in wrong sequence (live tests before dead tests)</li>
                <li>Missing visual inspection items</li>
                <li>Using incorrect certification forms</li>
                <li>Not completing all required tests</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Record all test results, not just pass/fail</li>
                <li>Note any limitations to the inspection</li>
                <li>Document observations even if not defects</li>
                <li>Keep copies of all certification issued</li>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Reference Card */}
        <section className="mb-10">
          <UnitsPocketCard
            title="BS 7671 Part 6 Reference"
            items={referenceItems}
          />
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
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-1/section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-1/section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule1Section2;
