import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m5s6-check1",
    question: "Why is documented handover important for installers?",
    options: ["Just a formality", "Protects installer from liability for post-handover maintenance failures", "Only required for large installations", "Only for insurance purposes"],
    correctIndex: 1,
    explanation: "Without documented handover, installers remain liable for maintenance failures that occur after project completion. A signed handover form clearly establishes when responsibility transferred to the client, protecting the installer from expensive re-visits and legal disputes."
  },
  {
    id: "emergencylighting-m5s6-check2",
    question: "What must be included in the handover documentation package?",
    options: ["Just the completion certificate", "Certificates, as-built drawings, logbook, maintenance instructions, and training notes", "Only the electrical installation certificate", "Just the test results"],
    correctIndex: 1,
    explanation: "The complete handover package must include commissioning certificates (BS 5266-1), EIC (BS 7671), as-built layout drawings, emergency lighting logbook, maintenance instructions, user training notes, and contact details for technical support."
  },
  {
    id: "emergencylighting-m5s6-check3",
    question: "What must the installer demonstrate during client training?",
    options: ["Nothing - just hand over documents", "Monthly and annual test procedures, fault indicators, and logbook recording", "Only how to change bulbs", "Just the location of luminaires"],
    correctIndex: 1,
    explanation: "Before leaving site, the installer must demonstrate monthly and annual test procedures, show how to operate test key switches, explain fault indicators, confirm who is responsible for recording tests, and advise on battery replacement intervals."
  }
];

const faqs = [
  {
    question: "Who is responsible for emergency lighting after handover?",
    answer: "The building's Responsible Person, as defined under the Regulatory Reform (Fire Safety) Order 2005. This is typically the building owner, landlord, employer, or designated facilities manager. They are legally responsible for ensuring monthly and annual tests are carried out, results are recorded, and any faults are rectified promptly."
  },
  {
    question: "What should be included in the client's emergency lighting logbook?",
    answer: "The logbook must include: test schedules (monthly and annual), test results with pass/fail status, date and time of each test, name and signature of person carrying out the test, details of any defects found, remedial action taken, and maintenance records including battery replacements."
  },
  {
    question: "How long must handover documentation be kept?",
    answer: "For the life of the installation - handover documentation becomes part of the building's permanent fire safety record. Contractors should retain their own copies for a minimum of six years for professional liability protection. Clients must keep their copies indefinitely."
  },
  {
    question: "Can I provide digital documentation only?",
    answer: "Digital documentation is acceptable and increasingly common. However, best practice is to provide both digital and printed copies. Digital records can be backed up and accessed remotely, while printed copies ensure immediate availability during inspections or emergencies."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A client claims the emergency lighting system failed 6 months after installation. The contractor has no signed handover record. What is the likely outcome?",
    options: [
      "Contractor protected by warranty period",
      "Contractor may be liable for maintenance failures due to no documented handover",
      "Client automatically responsible after installation date",
      "No liability applies to either party"
    ],
    correctAnswer: 1,
    explanation: "Without a signed handover form, installers can be held liable for maintenance failures and compliance breaches that occur after project completion. The handover signature marks the exact moment when legal responsibility transfers to the client."
  }
];

const EmergencyLightingModule5Section6 = () => {
  useSEO({
    title: "Client Handover Procedure | Emergency Lighting Module 5.6",
    description: "Emergency lighting client handover procedures, documentation requirements, training demonstrations, and responsibility transfer under Fire Safety Order 2005."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Client Handover Procedure
          </h1>
          <p className="text-white/80">
            Documentation, training, and responsibility transfer for emergency lighting systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Handover:</strong> Formal transfer of responsibility</li>
              <li><strong>Documentation:</strong> Certificates, drawings, logbook</li>
              <li><strong>Protection:</strong> Signed form protects installer</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Handover Package</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Certificates:</strong> BS 5266-1, BS 7671</li>
              <li><strong>Drawings:</strong> As-built layouts</li>
              <li><strong>Logbook:</strong> With initial test results</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the purpose of formal handover",
              "Prepare complete documentation packages",
              "Conduct effective client training",
              "Transfer responsibility correctly",
              "Protect against future liability",
              "Ensure ongoing compliance"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Purpose of the Handover
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Once an emergency lighting system has been designed, installed, inspected, tested,
              and certified, it must be formally handed over to the client. The handover process
              ensures the building's Responsible Person understands the system, its maintenance
              schedule, and their legal duties under the Regulatory Reform (Fire Safety) Order 2005.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">A Successful Handover Ensures:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>The client fully understands how the system operates</li>
                <li>All compliance documents are received and signed for</li>
                <li>The building remains legally compliant after the contractor departs</li>
                <li>Maintenance can continue seamlessly without gaps in responsibility</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Knowledge</p>
                <p className="text-white/90 text-xs">Client understands system</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Documentation</p>
                <p className="text-white/90 text-xs">Complete package</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Transfer</p>
                <p className="text-white/90 text-xs">Clear responsibility</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Handover Documentation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              All certification, drawings, instructions, and records must be compiled and handed
              to the client in both digital and printed formats. The following must be included
              in the handover package:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Certificates</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Commissioning:</strong> BS 5266-1 Annex G</li>
                  <li><strong>EIC:</strong> BS 7671 wiring compliance</li>
                  <li><strong>Design Declaration:</strong> If applicable</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Supporting Documents</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>As-built drawings:</strong> Luminaire positions</li>
                  <li><strong>Logbook:</strong> Initial test results</li>
                  <li><strong>Maintenance guide:</strong> Procedures</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Complete Handover Package:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Commissioning certificates:</strong> BS 5266-1 Annex G completion certificate</li>
                <li><strong>Electrical Installation Certificate:</strong> BS 7671 covering wiring and circuit integrity</li>
                <li><strong>As-built layout drawings:</strong> Luminaire positions, circuit routes, emergency zones</li>
                <li><strong>Emergency lighting logbook:</strong> Recorded commissioning tests and blank future entries</li>
                <li><strong>Maintenance instructions:</strong> Battery replacement intervals, cleaning procedures</li>
                <li><strong>User training notes:</strong> Testing procedures, fault indicators, system operation</li>
                <li><strong>Contact details:</strong> Technical support, warranty claims, emergency call-outs</li>
              </ul>
            </div>

            <p>
              Provide the client with a clearly labelled folder or binder containing all documentation.
              Include a checklist on the front page listing each document with tick boxes. This
              demonstrates professionalism and ensures nothing is missed.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Client Training and Demonstration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Before leaving site, the installer or commissioning engineer must conduct a practical
              demonstration and training session with the client. This ensures the Responsible Person
              can maintain the system correctly and comply with their legal obligations.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Training Must Cover:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Demonstrate how to carry out monthly and annual tests</li>
                <li>Show how to operate any test key switches or monitoring systems</li>
                <li>Explain how to recognise fault indicators or charging lights</li>
                <li>Confirm who is responsible for recording tests in the logbook</li>
                <li>Advise on battery replacement intervals and general maintenance</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Training Checklist:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Walk through escape routes, pointing out luminaire coverage</li>
                <li>Demonstrate monthly functional test procedure</li>
                <li>Show annual 3-hour duration test process</li>
                <li>Explain logbook entries and record-keeping</li>
                <li>Identify fault indicators and charging status lights</li>
                <li>Provide emergency contact details for technical support</li>
              </ul>
            </div>

            <p>
              Consider recording a short video during the training session showing test procedures
              and system operation. This provides the client with a permanent reference and
              demonstrates your professionalism.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Sign-Off and Responsibility Transfer
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The handover form signature marks the exact moment when legal responsibility for
              maintenance and testing transfers from the installer to the client's Responsible Person.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">At the Point of Handover:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Installer provides:</strong> Complete documentation package</li>
                <li><strong>Client acknowledges:</strong> Signs form confirming receipt and understanding</li>
                <li><strong>Responsibility transfers:</strong> Legal obligation moves to client under Fire Safety Order</li>
                <li><strong>Installer retains:</strong> Signed copy for minimum six years</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Handover Form Must Include:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Project details: Address, client name, installation date</li>
                <li>List of all documents provided</li>
                <li>Confirmation of training provided</li>
                <li>Client signature, name, and date</li>
                <li>Installer signature, company details, and date</li>
                <li>Statement confirming transfer of responsibility</li>
              </ul>
            </div>

            <p>
              Without a signed handover form, installers can be held liable for maintenance failures
              and compliance breaches that occur months or years after project completion. Always
              obtain written acknowledgement of handover.
            </p>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Handover Best Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Schedule dedicated handover meeting (do not rush)</li>
                <li>Provide documentation in both digital and printed formats</li>
                <li>Use a structured checklist to ensure nothing is missed</li>
                <li>Record training demonstration on video for client reference</li>
                <li>Obtain signed acknowledgement before leaving site</li>
                <li>Retain your copy for minimum six years</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Handover Failures</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>No signed form:</strong> Installer remains liable for future failures</li>
                <li><strong>Incomplete package:</strong> Missing certificates or drawings</li>
                <li><strong>No training:</strong> Client cannot maintain system correctly</li>
                <li><strong>No record retention:</strong> Cannot prove handover occurred</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Handover Package</p>
              <ul className="space-y-0.5">
                <li>Commissioning certificate</li>
                <li>EIC (BS 7671)</li>
                <li>As-built drawings</li>
                <li>Logbook with test results</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Sign-Off Requirements</p>
              <ul className="space-y-0.5">
                <li>Client signature and date</li>
                <li>Installer signature and company</li>
                <li>Document checklist confirmed</li>
                <li>Retain copy 6+ years</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/emergency-lighting-module-5-section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/emergency-lighting-module-6">
              Complete Module 5
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule5Section6;
