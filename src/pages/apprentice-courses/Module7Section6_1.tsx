import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module7Section6_1 = () => {
  useSEO(
    "Clear and Accurate Recording of Observations and Test Findings - Level 2 Module 7 Section 6.1",
    "Importance of accurate test result documentation and record keeping practices"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "Why is accurate recording of test results legally required?",
      options: ["To save time", "To demonstrate compliance with BS 7671 and safety regulations", "To reduce paperwork", "To impress clients"],
      correctAnswer: 1,
      explanation: "Accurate test records are legal evidence that installations comply with BS 7671 and that safety duties under the Electricity at Work Regulations are being fulfilled."
    },
    {
      id: 2,
      question: "What information must always be recorded during testing?",
      options: ["Just the test results", "Test results, instrument details, environmental conditions, and observations", "Only failed tests", "The electrician's name only"],
      correctAnswer: 1,
      explanation: "Complete documentation requires test results, instrument serial numbers and calibration dates, environmental conditions, any observations, and the tester's details."
    },
    {
      id: 3,
      question: "How should test results be recorded for maximum clarity?",
      options: ["In pencil", "Clearly and legibly in permanent ink or digitally", "On scraps of paper", "Mentally noted"],
      correctAnswer: 1,
      explanation: "Test results must be recorded clearly and legibly using permanent ink or digital systems to ensure they remain readable and cannot be accidentally erased."
    },
    {
      id: 4,
      question: "What should be done if a test result appears unexpected?",
      options: ["Ignore it", "Record it and investigate further", "Change it to expected value", "Skip recording it"],
      correctAnswer: 1,
      explanation: "Unexpected results should always be recorded accurately and investigated further to determine if there's a fault or if the expectation was incorrect."
    },
    {
      id: 5,
      question: "When must test instruments be calibrated?",
      options: ["Never", "Only when they break", "Annually or as per manufacturer's recommendations", "Only before important tests"],
      correctAnswer: 2,
      explanation: "Test instruments must be calibrated annually or according to manufacturer's recommendations to ensure accuracy and validity of test results."
    },
    {
      id: 6,
      question: "What happens if test records are incomplete or inaccurate?",
      options: ["Nothing", "Certificates may be invalid and legal compliance cannot be demonstrated", "Tests are still valid", "Only affects warranty"],
      correctAnswer: 1,
      explanation: "Incomplete or inaccurate records can invalidate certificates and make it impossible to demonstrate legal compliance with electrical safety regulations."
    },
    {
      id: 7,
      question: "True or False: Test records can be amended after signing if mistakes are found.",
      options: ["True", "False"],
      correctAnswer: 0,
      explanation: "True, but amendments must be clearly marked, initialled, and dated. The original entry should remain visible with a single line through any errors."
    },
    {
      id: 8,
      question: "How long should test records be retained?",
      options: ["1 year", "Until the next inspection", "For the life of the installation or as specified by regulations", "6 months"],
      correctAnswer: 2,
      explanation: "Test records should be retained for the life of the installation or as specified by relevant regulations and standards."
    },
    {
      id: 9,
      question: "What environmental conditions should be recorded during testing?",
      options: ["None needed", "Temperature and humidity only", "Temperature, humidity, and any relevant conditions affecting testing", "Only if extreme"],
      correctAnswer: 2,
      explanation: "Environmental conditions that could affect test results should be recorded, including temperature, humidity, and any other relevant factors like dampness or pollution."
    },
    {
      id: 10,
      question: "Who can sign electrical certificates?",
      options: ["Anyone", "Only the person who carried out the testing", "Any qualified electrician", "Building control"],
      correctAnswer: 1,
      explanation: "Only the competent person who actually carried out the testing and inspection can sign the certificate, taking responsibility for the accuracy of the results."
    }
  ];

  const faqs = [
    {
      question: "What is the legal requirement for recording test results?",
      answer: "BS 7671 requires all electrical installations to be provided with appropriate documentation including test results and certificates. The Electricity at Work Regulations 1989 also require evidence that installations have been tested and found safe."
    },
    {
      question: "How long should test records be kept?",
      answer: "Test records should be retained for the life of the installation or as specified by relevant regulations. For domestic installations, this is typically until the next periodic inspection, but original test sheets should be kept permanently."
    },
    {
      question: "Can test results be recorded digitally?",
      answer: "Yes, digital recording is acceptable and often preferred. Many modern test instruments can store and transfer results electronically, reducing transcription errors and improving legibility."
    },
    {
      question: "What should be done if instrument calibration expires during testing?",
      answer: "Testing should stop immediately and the instrument must be recalibrated before continuing. Any results obtained with an out-of-calibration instrument may not be valid and should be repeated."
    },
    {
      question: "Are photographs acceptable as part of test documentation?",
      answer: "Yes, photographs can provide valuable supporting evidence of conditions found, but they supplement rather than replace written records and must comply with data protection requirements."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/10 p-2 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Section 7.6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <BookOpen className="w-4 h-4" />
            <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 7</span>
            <span>Section 6.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Clear and Accurate Recording of Observations and Test Findings
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Importance of accurate test result documentation and record keeping practices
          </p>
        </header>

        {/* In 30 Seconds Summary */}
        <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
          <h2 className="font-semibold text-white mb-2">In 30 Seconds</h2>
          <ul className="text-white/80 space-y-1 text-sm">
            <li>• Clear, legible handwriting or digital entries</li>
            <li>• All measurements recorded to appropriate precision</li>
            <li>• Test instruments calibrated and identified</li>
            <li>• Environmental conditions and observations noted</li>
          </ul>
        </div>

        {/* Section 1 — Legal Requirements and Standards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Legal Requirements and Standards
          </h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>BS 7671 requires that every electrical installation be provided with appropriate documentation. This includes test results, inspection schedules, and certificates that demonstrate compliance with regulations. These records serve as legal evidence that proper testing procedures were followed and installations meet safety standards.</p>
            <p>The Electricity at Work Regulations 1989 place duties on duty holders to maintain electrical systems in a safe condition. Accurate test records are essential evidence that these duties are being fulfilled. Without proper documentation, it becomes impossible to demonstrate due diligence in safety management.</p>
            <p>IET Guidance Note 3 provides detailed requirements for testing and inspection documentation. This includes specific formats for certificates, the information that must be recorded, and the retention periods for different types of records. Non-compliance can result in enforcement action and prosecution.</p>
            <p>Building Regulations Part P requires certain electrical work to be notified and certified. The documentation provided must be clear, accurate, and demonstrate that work has been carried out in accordance with BS 7671. Incomplete or inaccurate records can invalidate building control approval.</p>
          </div>
        </section>

        <InlineCheck
          id="legal-requirements"
          question="Which regulations require accurate test documentation?"
          options={["Only company policies", "BS 7671 and Electricity at Work Regulations 1989", "Just Building Regulations", "No specific requirements"]}
          correctIndex={1}
          explanation="BS 7671 requires appropriate documentation for all installations, and the Electricity at Work Regulations 1989 require evidence that electrical systems are maintained safely."
        />

        {/* Section 2 — Essential Information to Record */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Essential Information to Record
          </h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>All test measurements must be recorded exactly as displayed on instruments, including decimal places and units. Never round values or approximate readings, as even small variations can indicate developing faults that could become dangerous if not detected early.</p>
            <p>Environmental conditions should be noted when they might affect test results. This includes ambient temperature, humidity levels, and any adverse conditions such as dampness, dust, or pollution that could influence readings or create additional safety considerations.</p>
            <p>Test instrument details must be recorded for each test session. This includes instrument type, serial number, calibration date, and next calibration due date. This information is essential for validating test results and demonstrating that appropriate equipment was used.</p>
            <p>Observations of installation conditions, defects found, and corrective actions taken must be documented clearly. Use specific locations (e.g., "Ring main socket in north bedroom"), describe exactly what was found, and record what action was taken to rectify any problems discovered.</p>
          </div>
        </section>

        <InlineCheck
          id="recording-precision"
          question="How should test measurements be recorded?"
          options={["Rounded to nearest whole number", "Approximately", "Exactly as displayed on the instrument", "Only significant failures"]}
          correctIndex={2}
          explanation="Test measurements must be recorded exactly as displayed on instruments, including all decimal places and units, as even small variations can indicate developing problems."
        />

        {/* Section 3 — Documentation Best Practices */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Documentation Best Practices
          </h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>Use permanent ink for all written records, as pencil can fade or be erased accidentally. Handwriting must be clear and legible - if others cannot read your records, they are of little value. Consider using capital letters for critical information such as circuit references and test results.</p>
            <p>Digital recording systems are increasingly common and offer advantages including automatic date/time stamping, reduced transcription errors, and easy storage and retrieval. Many modern test instruments can transfer results directly to smartphones or tablets, eliminating manual copying.</p>
            <p>Develop a systematic approach to documentation. Work through circuits in logical order, complete all required fields before moving to the next test, and use consistent terminology throughout. This reduces the risk of omissions and makes records easier to follow.</p>
            <p>Link all test results to circuit identification numbers from the distribution board and relevant certificate schedules. This ensures results are traceable and can be cross-referenced with installation certificates (EIC) or inspection reports (EICR).</p>
          </div>
        </section>

        <InlineCheck
          id="documentation-tools"
          question="What type of writing implement should be used for permanent records?"
          options={["Pencil for easy corrections", "Permanent ink pen", "Any writing tool", "Markers only"]}
          correctIndex={1}
          explanation="Permanent ink must be used for all written records to ensure they cannot fade or be accidentally erased, maintaining the integrity of the documentation."
        />

        {/* Section 4 — Common Mistakes and Quality Control */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Common Mistakes and Quality Control
          </h2>
          <div className="text-white/80 space-y-4 leading-relaxed">
            <p>Vague or incomplete descriptions are a major problem. Writing "socket not working" provides little useful information. Instead, record specific details: "Socket outlet in bedroom 2: no output voltage measured, loose neutral connection found at socket terminals, connection remade and tested satisfactory."</p>
            <p>Missing signatures, dates, or incomplete test schedules can invalidate entire certificates. Always check that all required information has been completed before leaving site. Returning to complete missing information later can be costly and may compromise the validity of results.</p>
            <p>Amendments to completed records must be handled correctly. Any changes should be made by drawing a single line through the incorrect entry (keeping it visible), writing the correct information alongside, and initialling and dating the amendment. Never use correction fluid or erase original entries.</p>
            <p>Quality control involves checking records before submission. Have another competent person review documentation when possible, as fresh eyes often spot errors or unclear descriptions. Keep backup copies of important records and ensure they are stored securely in compliance with data protection requirements.</p>
          </div>
        </section>

        <InlineCheck
          id="record-amendments"
          question="How should mistakes in completed records be corrected?"
          options={["Use correction fluid", "Cross out with single line, initial and date", "Erase and rewrite", "Start new document"]}
          correctIndex={1}
          explanation="Mistakes should be corrected by crossing out with a single line (keeping original visible), writing the correction alongside, and initialling and dating the amendment."
        />

        {/* Real-World Applications */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Real-World Applications
          </h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-500/50">
              <h4 className="font-semibold text-red-400 mb-3">Poor Practice Example</h4>
              <p className="text-white/80 text-sm mb-4">
                An electrician completing periodic inspection of office building wrote "All circuits tested - satisfactory" without recording specific test values or circuit details. Three months later, a socket outlet failed causing a small fire. When questioned, the electrician could not prove which circuits had been tested or what results were obtained. The inadequate records provided no defence against negligence claims.
              </p>
              <p className="text-white/60 text-xs"><strong>Key Issues:</strong> No specific test results recorded, no circuit identification, no traceability, inadequate evidence of compliance</p>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-500/50">
              <h4 className="font-semibold text-green-400 mb-3">Good Practice Example</h4>
              <p className="text-white/80 text-sm mb-4">
                During a domestic EICR, an electrician discovered a shower circuit with insulation resistance of 0.8 MΩ (below the 1 MΩ minimum). She recorded: "Shower circuit (Board A, Way 3): IR test L-E 0.8 MΩ @500V (below 1.0 MΩ min). Investigation revealed damaged cable in loft space. Cable replaced, circuit retested: IR L-E 150 MΩ, all other tests satisfactory." The detailed record provided clear evidence of the problem found, action taken, and satisfactory retest results.
              </p>
              <p className="text-white/60 text-xs"><strong>Key Strengths:</strong> Specific circuit identification, exact test values, clear description of fault and remedy, retest results recorded</p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-semibold text-white mb-2">{faq.question}</h4>
                <p className="text-sm text-white/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-10">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <h2 className="font-semibold text-white mb-3">Key Takeaways</h2>
            <ul className="text-white/80 space-y-2 text-sm">
              <li>• Accurate documentation is a legal requirement under BS 7671 and the Electricity at Work Regulations</li>
              <li>• Record test measurements exactly as displayed, including all decimal places and units</li>
              <li>• Use permanent ink and clear, legible handwriting for all written records</li>
              <li>• Link all results to circuit references and include instrument calibration details</li>
              <li>• Poor documentation can invalidate certificates and compromise legal compliance</li>
            </ul>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Test Your Knowledge</h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/10 min-h-[48px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 7.6
            </Link>
          </Button>
          <Button
            className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../6-2">
              Next: Reporting Faults
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Module7Section6_1;
