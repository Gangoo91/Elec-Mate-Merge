import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Electrical Installation Certificates - Module 8 Section 4";
const DESCRIPTION = "Learn to correctly complete Electrical Installation Certificates (EICs) for new installations and additions, including all required signatures and declarations.";

const quickCheckQuestions = [
  {
    id: "eic-when-required",
    question: "When is an Electrical Installation Certificate (EIC) required?",
    options: [
      "For all electrical work regardless of size",
      "For new installations and additions to existing installations",
      "Only for commercial installations",
      "Only when specifically requested by the client"
    ],
    correctIndex: 1,
    explanation: "An EIC is required for new electrical installations and for additions or alterations to existing installations where new circuits are added. It's a mandatory requirement under BS 7671."
  },
  {
    id: "eic-signatures",
    question: "How many signatures are required on a standard EIC?",
    options: [
      "One - the installer only",
      "Two - installer and client",
      "Three - designer, constructor, inspector/tester",
      "Four - including the DNO"
    ],
    correctIndex: 2,
    explanation: "An EIC requires three signatures: the designer (design responsibility), the constructor (installation responsibility), and the inspector/tester (inspection and testing responsibility)."
  },
  {
    id: "eic-one-person",
    question: "Can one person sign all three parts of an EIC?",
    options: [
      "No - three different people are always required",
      "Yes - if qualified to do all three roles",
      "Only in domestic installations",
      "Only with special permission"
    ],
    correctIndex: 1,
    explanation: "One person can sign all three parts if they are qualified and have personally undertaken the design, construction, and inspection/testing. This is common for smaller jobs by competent electricians."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "When is an Electrical Installation Certificate (EIC) required?",
    options: [
      "For all electrical work regardless of size",
      "For new installations and additions to existing installations",
      "Only for commercial installations",
      "Only when specifically requested by the client"
    ],
    correctAnswer: 1,
    explanation: "An EIC is required for new electrical installations and for additions or alterations to existing installations where new circuits are added. It's a mandatory requirement under BS 7671."
  },
  {
    id: 2,
    question: "How many signatures are required on a standard EIC?",
    options: [
      "One - the installer only",
      "Two - installer and client",
      "Three - designer, constructor, inspector/tester",
      "Four - including the DNO"
    ],
    correctAnswer: 2,
    explanation: "An EIC requires three signatures: the designer (design responsibility), the constructor (installation responsibility), and the inspector/tester (inspection and testing responsibility)."
  },
  {
    id: 3,
    question: "What does the designer's signature on an EIC confirm?",
    options: [
      "They witnessed the installation",
      "The design complies with BS 7671 and the characteristics checked",
      "They will maintain the installation",
      "The installation matches their drawings"
    ],
    correctAnswer: 1,
    explanation: "The designer's signature confirms that the design of the installation complies with BS 7671 and that the characteristics of the supply have been checked and recorded."
  },
  {
    id: 4,
    question: "Can one person sign all three parts of an EIC?",
    options: [
      "No - three different people are always required",
      "Yes - if qualified to do all three roles",
      "Only in domestic installations",
      "Only with special permission"
    ],
    correctAnswer: 1,
    explanation: "One person can sign all three parts if they are qualified and have personally undertaken the design, construction, and inspection/testing. This is common for smaller jobs by competent electricians."
  },
  {
    id: 5,
    question: "What documentation must accompany an EIC?",
    options: [
      "No additional documentation required",
      "Schedule of Inspections and Schedule of Test Results",
      "Only manufacturer's datasheets",
      "Insurance certificate"
    ],
    correctAnswer: 1,
    explanation: "An EIC must be accompanied by a completed Schedule of Inspections (inspection checklist) and Schedule of Test Results (all measured values for each circuit)."
  },
  {
    id: 6,
    question: "The 'extent' section of an EIC describes:",
    options: [
      "The total cable length used",
      "Which parts of the installation are covered by this certificate",
      "The duration of the work",
      "The cost of materials"
    ],
    correctAnswer: 1,
    explanation: "The 'extent and limitations' section describes exactly what work is covered by this certificate, including any parts not inspected/tested due to access limitations."
  },
  {
    id: 7,
    question: "What recommended interval should be stated for a domestic installation?",
    options: [
      "1 year",
      "5 years (or on change of occupancy)",
      "10 years",
      "No interval is stated on an EIC"
    ],
    correctAnswer: 1,
    explanation: "For domestic installations, a 5-year maximum interval (or on change of occupancy) is typically recommended for periodic inspection and testing. This should be stated on the certificate."
  },
  {
    id: 8,
    question: "An EIC for an addition to an existing installation should reference:",
    options: [
      "Only the new circuits added",
      "The whole building's electrical system",
      "Only the consumer unit",
      "Previous certificates"
    ],
    correctAnswer: 0,
    explanation: "The EIC covers only the work carried out (the addition). The extent should clearly state this is for additional circuits only. The existing installation requires its own EICR if inspection is needed."
  },
  {
    id: 9,
    question: "Who should receive the original EIC?",
    options: [
      "The electrical contractor",
      "The local authority",
      "The person ordering the work (client)",
      "The DNO"
    ],
    correctAnswer: 2,
    explanation: "Regulation 632.4 requires the original certificate to be given to the person ordering the work. The contractor should retain a copy. For Building Regulations work, a copy goes to Building Control."
  },
  {
    id: 10,
    question: "If inspection reveals a dangerous condition (C1), can an EIC still be issued?",
    options: [
      "Yes - the defect is noted but certificate issued",
      "No - the dangerous condition must be rectified first",
      "Yes - if the client signs a waiver",
      "No - an EICR must be issued instead"
    ],
    correctAnswer: 1,
    explanation: "An EIC can only be issued when the installation complies with BS 7671. Dangerous conditions must be rectified before the certificate is issued. The installation cannot be certified until safe."
  }
];

const faqs = [
  {
    question: "Can I issue an EIC if I didn't do the design?",
    answer: "The EIC requires separate signatures for design, construction, and inspection. If you didn't design it, the designer should sign their section. If design information isn't available, you may need to assess and take design responsibility before signing."
  },
  {
    question: "What's the difference between EIC and Minor Works Certificate?",
    answer: "An EIC is for new installations, additions, or alterations that include new circuits. A Minor Works Certificate is for work that doesn't add new circuits - such as adding a socket to an existing circuit or replacing a consumer unit."
  },
  {
    question: "How long should I keep copies of certificates?",
    answer: "Contractors should retain copies of certificates for the recommended inspection interval (e.g., 5 years for domestic) as a minimum. Many recommend keeping them for at least 10 years or longer for professional indemnity purposes."
  },
  {
    question: "Does an EIC need to be issued for notifiable work?",
    answer: "Yes. For work notifiable under Building Regulations Part P, an EIC is required and a copy must be provided to Building Control (either directly or via a competent person scheme). The EIC demonstrates compliance."
  },
  {
    question: "What if I find issues with the existing installation during an addition?",
    answer: "Note limitations on the EIC that it covers only the new work. Advise the client in writing about any observed issues with the existing installation and recommend an EICR. Do not try to certify work you haven't done."
  },
  {
    question: "Can an apprentice sign an EIC?",
    answer: "Only someone competent (qualified and experienced) to undertake the work can sign. An apprentice under supervision would not typically sign - the supervising electrician would sign. The signature confirms competence and responsibility."
  }
];

const InspectionTestingModule8Section4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../module-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 8
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
            <span>Module 8 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Electrical Installation Certificates
          </h1>
          <p className="text-white/80">
            Complete and issue EICs correctly for new installations and additions
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>When:</strong> New installations and additions</li>
              <li><strong>Signatures:</strong> Designer, Constructor, Inspector/Tester</li>
              <li><strong>Accompany:</strong> Schedule of Inspections + Test Results</li>
              <li><strong>Original:</strong> Goes to person ordering work</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Points</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>One person:</strong> Can sign all 3 if qualified</li>
              <li><strong>Domestic:</strong> 5 years retest interval</li>
              <li><strong>Extent:</strong> Describe exactly what's covered</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand when an EIC is required",
              "Complete all sections of the certificate correctly",
              "Identify who can sign which parts",
              "Apply correct declaration statements",
              "Differentiate between EIC and other certificates",
              "Determine recommended retest intervals"
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

        {/* Section 1: When to Use an EIC */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            When to Use an EIC
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An Electrical Installation Certificate is required when new circuits are created or new installations are completed:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">EIC Required For</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Complete new electrical installations</li>
                <li>Additions to existing installations (new circuits)</li>
                <li>Alterations that include new circuits</li>
                <li>Work notifiable under Building Regulations</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The EIC confirms the installation complies with BS 7671 at the time of completion.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: The Three Signatures */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Three Signatures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An EIC requires three signatures, each confirming different responsibilities:
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">1. Designer</p>
                <p className="text-sm text-white/80">Confirms the design complies with BS 7671, supply characteristics are checked and recorded.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">2. Constructor</p>
                <p className="text-sm text-white/80">Confirms the installation has been constructed in accordance with BS 7671, using suitable materials.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">3. Inspector/Tester</p>
                <p className="text-sm text-white/80">Confirms inspection and testing has been carried out, results are attached, and installation is safe.</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> One competent person can sign all three parts if they personally undertook all three roles.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Certificate Sections */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Certificate Sections
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The EIC has several sections that must be completed fully:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Sections</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Details:</strong> Address, description, extent and limitations</li>
                <li><strong>Supply:</strong> Type (TN-S, TN-C-S, TT), voltage, PSCC, Ze</li>
                <li><strong>Installation:</strong> Type of wiring, earthing arrangements</li>
                <li><strong>Signatures:</strong> All three with dates</li>
                <li><strong>Recommendation:</strong> Next inspection date</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Extent and Limitations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Extent and Limitations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The 'extent and limitations' section is crucial - it defines exactly what the certificate covers:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What to Include</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Specific description of work covered</li>
                <li>Circuit numbers or distribution boards included</li>
                <li>Any areas that could not be inspected</li>
                <li>Any items agreed as exclusions</li>
              </ul>
            </div>

            <p className="text-sm text-amber-400/80">
              <strong>Important:</strong> Never certify work you haven't done or inspected. If the existing installation has issues, note this separately and recommend an EICR.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Recommended Inspection Intervals */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Recommended Inspection Intervals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The EIC should state a recommended maximum interval before the next periodic inspection:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Intervals</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="p-2 rounded bg-transparent">
                  <p className="text-white/90">Domestic</p>
                  <p className="text-elec-yellow">5 years / change of occupancy</p>
                </div>
                <div className="p-2 rounded bg-transparent">
                  <p className="text-white/90">Commercial</p>
                  <p className="text-elec-yellow">5 years</p>
                </div>
                <div className="p-2 rounded bg-transparent">
                  <p className="text-white/90">Industrial</p>
                  <p className="text-elec-yellow">3 years</p>
                </div>
                <div className="p-2 rounded bg-transparent">
                  <p className="text-white/90">Swimming pools</p>
                  <p className="text-elec-yellow">1 year</p>
                </div>
                <div className="p-2 rounded bg-transparent">
                  <p className="text-white/90">Construction sites</p>
                  <p className="text-elec-yellow">3 months</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Distribution and Retention */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Distribution and Retention
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct distribution of the certificate is a regulatory requirement:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Distribution Requirements</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Original:</strong> To the person ordering the work (client)</li>
                <li><strong>Copy:</strong> Retained by the contractor</li>
                <li><strong>Building Control:</strong> Copy if notifiable work</li>
                <li><strong>Scheme Provider:</strong> If registered with competent person scheme</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Good Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use model forms from BS 7671 appendix or equivalent</li>
                <li>Don't leave blanks - use N/A where not applicable</li>
                <li>Check all sections before issuing</li>
                <li>Keep copies for the recommended retention period</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Complete certificates promptly - don't leave until later</li>
                <li>Ensure all test results are accurately transferred</li>
                <li>State limitations clearly in the extent section</li>
                <li>Include installation address and reference details</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Back-dating</strong> - sign and date when work is actually complete</li>
                <li><strong>Missing schedules</strong> - EIC requires both inspection and test schedules</li>
                <li><strong>Vague extent</strong> - be specific about what's covered</li>
                <li><strong>Wrong certificate</strong> - EIC is for new circuits, Minor Works for additions to existing circuits</li>
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

        {/* Reference Cards */}
        <section className="mb-10">
          <UnitsPocketCard />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">EIC Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Signatures Required</p>
                <ul className="space-y-0.5">
                  <li>Designer - design compliance</li>
                  <li>Constructor - build compliance</li>
                  <li>Inspector/Tester - test results</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Retest Intervals</p>
                <ul className="space-y-0.5">
                  <li>Domestic = 5 years max</li>
                  <li>Commercial = 5 years</li>
                  <li>Industrial = 3 years</li>
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
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-8/section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-8/section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule8Section4;
