import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Identifying and Rectifying Defects - Module 4.6.5 | Level 2 Electrical Course";
const DESCRIPTION = "Learn systematic approaches to identify and correct electrical installation defects. Master fault-finding techniques and safe rectification procedures for BS 7671 compliance.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "Name one type of mechanical defect and one wiring defect.",
    options: ["Loose fixings and incorrect terminations", "Overloading and moisture", "Wrong cable size and polarity errors", "Poor containment and design errors"],
    correctIndex: 0,
    explanation: "Mechanical defects include loose fixings, damaged accessories, and poor containment support. Wiring defects include incorrect terminations, polarity errors, and broken CPC connections."
  },
  {
    id: 2,
    question: "Why must all rectification work be re-tested?",
    options: ["To comply with regulations", "To confirm the defect has been properly corrected and safety restored", "To satisfy the client", "To complete documentation"],
    correctIndex: 1,
    explanation: "Re-testing after rectification ensures that the defect has been properly corrected, safety has been restored, and the installation still complies with BS 7671 requirements."
  },
  {
    id: 3,
    question: "What regulation places a duty to maintain safe electrical systems?",
    options: ["BS 7671", "Electricity at Work Regulations 1989", "Building Regulations", "Health and Safety at Work Act"],
    correctIndex: 1,
    explanation: "The Electricity at Work Regulations 1989 place a statutory duty to maintain electrical systems in a safe condition and prevent danger from electrical installations."
  }
];

const Module4Section6_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "Which of the following is a common insulation defect?",
      options: [
        "Loose fixing",
        "Damaged sheathing",
        "Wrong accessory type",
        "Overloading"
      ],
      correctAnswer: 1,
      explanation: "Damaged sheathing is a common insulation defect that can expose conductors and create safety hazards including electric shock and short circuit risks."
    },
    {
      id: 2,
      question: "True or False: Defects that don't affect safety can be left uncorrected.",
      options: [
        "True",
        "False",
        "Only minor defects",
        "Only cosmetic issues"
      ],
      correctAnswer: 1,
      explanation: "False - all defects must be rectified before energisation to ensure long-term safety, compliance, and professional standards, regardless of their immediate impact."
    },
    {
      id: 3,
      question: "What is the first step before rectifying a wiring defect?",
      options: [
        "Test the circuit",
        "Isolate and lock off the circuit",
        "Document the defect",
        "Gather replacement parts"
      ],
      correctAnswer: 1,
      explanation: "The first step is always to isolate and lock off the circuit to ensure safe working conditions before beginning any rectification work."
    },
    {
      id: 4,
      question: "Name two tools that may assist in defect identification.",
      options: [
        "Hammer and chisel",
        "Continuity tester and insulation resistance tester",
        "Tape measure and pencil",
        "Drill and screwdriver"
      ],
      correctAnswer: 1,
      explanation: "Continuity testers and insulation resistance testers are essential tools for identifying electrical defects through systematic testing of circuit integrity and insulation properties."
    },
    {
      id: 5,
      question: "Which regulation requires installations to be maintained in a safe condition?",
      options: [
        "BS 7671",
        "Electricity at Work Regulations 1989",
        "BS EN 61439",
        "Building Regulations Part M"
      ],
      correctAnswer: 1,
      explanation: "The Electricity at Work Regulations 1989 place a statutory duty on employers and employees to maintain electrical systems in a safe condition."
    },
    {
      id: 6,
      question: "Why should replacement cables cover the full damaged section?",
      options: [
        "To save money",
        "To ensure reliability and avoid unsafe splices",
        "To improve appearance",
        "To reduce installation time"
      ],
      correctAnswer: 1,
      explanation: "Replacing the full damaged section ensures reliability and avoids potentially unsafe splices that could create future failure points or safety hazards."
    },
    {
      id: 7,
      question: "What is one way to prevent recurrence of polarity defects?",
      options: [
        "Use different cable colours",
        "Double-check conductor connections before final fix",
        "Install additional protection",
        "Use higher rated components"
      ],
      correctAnswer: 1,
      explanation: "Double-checking conductor connections before final fixing helps prevent polarity errors by ensuring line, neutral, and earth connections are correctly identified and terminated."
    },
    {
      id: 8,
      question: "Why should you address only one fault at a time during rectification?",
      options: [
        "To save time",
        "To confirm each fault is resolved before moving on",
        "To reduce costs",
        "To satisfy regulations"
      ],
      correctAnswer: 1,
      explanation: "Addressing one fault at a time allows you to confirm each issue is properly resolved and re-tested before moving to the next, ensuring systematic and thorough fault correction."
    },
    {
      id: 9,
      question: "Give one reason why photographs should be taken before and after defect correction.",
      options: [
        "For training purposes",
        "To provide a clear record and proof of corrective action",
        "For insurance claims",
        "To show the client"
      ],
      correctAnswer: 1,
      explanation: "Photographs provide clear documentation of the defect and its correction, creating a permanent record for certification purposes and demonstrating professional standards."
    },
    {
      id: 10,
      question: "True or False: Minor cosmetic defects (like a crooked switch) never need rectification.",
      options: [
        "True",
        "False",
        "Only if the client complains",
        "Only on commercial jobs"
      ],
      correctAnswer: 1,
      explanation: "False - cosmetic defects still need rectification as they affect client satisfaction, indicate poor workmanship, and reflect on professional standards."
    }
  ];

  const faqs = [
    {
      question: "Can defects be ignored if they don't affect immediate circuit operation?",
      answer: "No — all defects must be rectified before energisation to ensure long-term safety and compliance. Even minor defects can develop into serious problems over time."
    },
    {
      question: "Do minor cosmetic issues count as defects?",
      answer: "Yes, if they affect client satisfaction or indicate poor workmanship (e.g., crooked accessories). Professional standards require all aspects of the installation to be completed properly."
    },
    {
      question: "What should I do if I can't locate the cause of a fault?",
      answer: "Escalate to a supervisor or use advanced test methods (e.g., insulation fault location). Don't guess or ignore difficult faults - they often indicate serious underlying problems."
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
              Back to Section 6
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
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 4</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Identifying and Rectifying Defects
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master systematic approaches to identify and correct electrical installation defects before energisation.
            </p>
          </header>

          {/* Quick Summary */}
          <section className="mb-10">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow text-sm mb-2">In 30 Seconds</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                  <li>No electrical installation is perfect on the first attempt.</li>
                  <li>Defects can appear during installation or be revealed during inspection and testing.</li>
                  <li>Identifying and correcting defects is vital before energisation for BS 7671 compliance.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow text-sm mb-2">Spot it / Use it</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                  <li><strong>Spot:</strong> Loose connections, damaged cables, incorrect terminations.</li>
                  <li><strong>Use:</strong> Systematic checking, test instruments, safe correction methods.</li>
                  <li><strong>Check:</strong> Visual inspection, functional tests, operational verification.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <ul className="text-white/80 space-y-2 list-disc pl-6">
              <li>Recognise common electrical installation defects.</li>
              <li>Apply systematic inspection and testing methods to identify faults.</li>
              <li>Safely rectify defects without causing further issues.</li>
              <li>Record corrective actions as part of site documentation.</li>
              <li>Apply preventative measures to reduce recurrence of defects.</li>
            </ul>
          </section>

          {/* Types of Defects */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Types of Defects
            </h2>
            <p className="text-white/80 mb-4">
              Understanding common defect categories helps with systematic identification and correction:
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-red-500/5 border-l-2 border-red-500/50">
                <p className="font-medium text-red-400 text-sm mb-2">Mechanical Defects</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                  <li>Loose fixings on accessories or containment systems</li>
                  <li>Damaged accessories with cracks or missing parts</li>
                  <li>Poor containment support with inadequate bracket spacing</li>
                  <li>Misaligned or poorly fitted components</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-orange-400 text-sm mb-2">Wiring Defects</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                  <li>Incorrect terminations with wrong polarity or loose connections</li>
                  <li>Polarity errors affecting safety and equipment operation</li>
                  <li>Broken CPC connections compromising earth continuity</li>
                  <li>Inadequate conductor lengths or poor stripping</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-purple-400 text-sm mb-2">Insulation Defects</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                  <li>Damaged sheathing exposing inner conductors</li>
                  <li>Nicks in insulation from poor handling or sharp edges</li>
                  <li>Moisture ingress in damp or wet locations</li>
                  <li>Contamination from building materials or chemicals</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
                <p className="font-medium text-blue-400 text-sm mb-2">Design/Installation Errors</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                  <li>Wrong cable size for the intended load or circuit length</li>
                  <li>Overloading of circuits beyond their designed capacity</li>
                  <li>Incorrect accessory type for the environment or application</li>
                  <li>Non-compliance with BS 7671 requirements</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="defect-types-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* How to Identify Defects */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              How to Identify Defects
            </h2>
            <p className="text-white/80 mb-4">
              Systematic defect identification combines visual inspection with functional testing:
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-elec-yellow text-sm mb-2">Visual Inspection</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                  <li>Check for visible issues such as exposed copper conductors</li>
                  <li>Look for missing grommets or protective sleeves</li>
                  <li>Inspect for physical damage to cables or accessories</li>
                  <li>Verify correct component selection and installation</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <p className="font-medium text-green-400 text-sm mb-2">Basic Functional Tests</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                  <li>Polarity testing to confirm correct connections</li>
                  <li>Continuity testing for earth and circuit paths</li>
                  <li>Insulation resistance testing to identify insulation breakdown</li>
                  <li>RCD testing where applicable</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
                <p className="font-medium text-blue-400 text-sm mb-2">Operational Checks</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                  <li>Test switching operations and control functions</li>
                  <li>Verify accessories and circuits function correctly</li>
                  <li>Check for abnormal heating or noise</li>
                  <li>Confirm protective device coordination</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-3 rounded bg-white/5 border border-white/10">
              <p className="text-sm text-white/70">
                <strong className="text-white">Customer feedback:</strong> Clients may notice practical defects such as misaligned fittings or operational issues
              </p>
            </div>
          </section>

          <InlineCheck
            id="retesting-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Systematic Fault-Finding */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Systematic Fault-Finding
            </h2>
            <p className="text-white/80 mb-4">
              Methodical approach ensures all defects are identified and addressed efficiently:
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <p className="font-medium text-green-400 text-sm mb-2">Work Methodically</p>
                <p className="text-sm text-white/80 mb-2">Start at the origin of supply and progress circuit by circuit:</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                  <li>Begin at the consumer unit or distribution board</li>
                  <li>Follow each circuit from origin to final outlets</li>
                  <li>Check junction boxes and connection points systematically</li>
                  <li>Don't skip sections even if they appear correct</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/5 border-l-2 border-blue-500/50">
                <p className="font-medium text-blue-400 text-sm mb-2">Use Drawings and Schedules</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                  <li>Refer to circuit diagrams to trace connections</li>
                  <li>Use cable schedules to verify cable types and routes</li>
                  <li>Check installation drawings for compliance with design</li>
                  <li>Update documentation with any changes found</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-purple-400 text-sm mb-2">Record All Observations</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                  <li>Note location and nature of each defect found</li>
                  <li>Record test results and measurements</li>
                  <li>Photograph defects for clear documentation</li>
                  <li>Maintain records for sign-off and certification</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="regulations-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Rectification of Defects */}
          <section className="mb-10 mt-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Rectification of Defects
            </h2>
            <p className="text-white/80 mb-4">
              Safe and effective correction of identified defects:
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-red-500/5 border-l-2 border-red-500/50">
                <p className="font-medium text-red-400 text-sm mb-2">Safety First</p>
                <p className="text-sm text-white/80 mb-2">Always isolate the affected circuit before beginning work:</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                  <li>Switch off and lock off the circuit at the consumer unit</li>
                  <li>Test the circuit is dead using approved voltage indicator</li>
                  <li>Apply warning notices to prevent inadvertent re-energisation</li>
                  <li>Use appropriate PPE for the work being undertaken</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-orange-400 text-sm mb-2">Correction Techniques</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                  <li>Correct loose terminations by re-stripping and re-securing conductors</li>
                  <li>Replace damaged cables or accessories rather than attempting unsafe repairs</li>
                  <li>Apply correct protective measures (e.g., IP-rated glands in wet areas)</li>
                  <li>Ensure proper cable support and containment throughout the circuit</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-500/5 border-l-2 border-green-500/50">
                <p className="font-medium text-green-400 text-sm mb-2">Verification</p>
                <p className="text-sm text-white/80 mb-2">Re-test all corrected work to confirm compliance:</p>
                <ul className="text-sm text-white/80 space-y-1 list-disc pl-4">
                  <li>Repeat relevant tests after each correction</li>
                  <li>Verify continuity and insulation resistance meet requirements</li>
                  <li>Check polarity and earth fault loop impedance</li>
                  <li>Test RCD operation where applicable</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Practical Guidance
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white text-sm mb-2">Safety Procedures</p>
                <ul className="text-sm text-white/70 space-y-1 list-disc pl-4">
                  <li>Always isolate and lock off circuits before rectifying defects</li>
                  <li>Photograph defects before and after rectification to maintain a clear record</li>
                  <li>Keep spare accessories and replacement cable lengths on hand to minimise delays</li>
                  <li>When replacing damaged cable, always replace the full section — do not splice unless an appropriate enclosure and connectors are used</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-medium text-white text-sm mb-2">Documentation</p>
                <ul className="text-sm text-white/70 space-y-1 list-disc pl-4">
                  <li>Document rectification on the Electrical Installation Certificate to demonstrate compliance</li>
                  <li>Record the nature of each defect and the corrective action taken</li>
                  <li>Include test results before and after correction</li>
                  <li>Maintain photographic evidence for quality assurance</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="font-medium text-white mb-2">Commercial Fit-Out Defect</p>
              <p className="text-sm text-white/80 mb-3">
                During a commercial fit-out, an insulation resistance test showed a low reading on a power circuit. Investigation revealed that a cable had been damaged by a sharp edge when pulled through trunking without a grommet. The damaged section was replaced, retested, and passed. The incident highlighted the importance of correct mechanical protection during installation.
              </p>
              <div className="p-3 rounded bg-elec-yellow/10 border-l-2 border-elec-yellow/50">
                <p className="text-sm text-white/80">
                  <strong className="text-elec-yellow">Key Learning:</strong> This example demonstrates how a single oversight (missing grommet) can cause significant defects that require complete cable replacement. Prevention through proper installation techniques is always more cost-effective than rectification.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="font-medium text-white mb-1">{faq.question}</p>
                  <p className="text-sm text-white/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Pocket Guide – Identifying & Rectifying Defects
            </h2>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-white/80">Isolate and prove dead before fault-finding.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-white/80">Inspect for mechanical damage: cracked accessories, missing fixings.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-white/80">Check wiring: correct terminations, no exposed copper, polarity correct.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-white/80">Test continuity, insulation resistance, and polarity after corrections.</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-white/80">Replace damaged cables/accessories — never "make do".</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-white/80">Record defect and corrective action for certification.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-white/80">Re-test after every repair.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span className="text-white/80">Prevent recurrence: double-check, use proper tools, and follow BS 7671.</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">10</span>
              Recap – What You've Learned
            </h2>
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    <div>
                      <p className="font-medium text-white text-sm">Defect Recognition</p>
                      <p className="text-xs text-white/70">You can now identify common mechanical, wiring, insulation, and design defects.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-elec-yellow/20 text-elec-yellow rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <div>
                      <p className="font-medium text-white text-sm">Identification Methods</p>
                      <p className="text-xs text-white/70">You understand how to apply visual checks and tests to spot faults.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    <div>
                      <p className="font-medium text-white text-sm">Fault-Finding Skills</p>
                      <p className="text-xs text-white/70">You know how to systematically fault-find and rectify issues.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    <div>
                      <p className="font-medium text-white text-sm">Safe Rectification</p>
                      <p className="text-xs text-white/70">You can ensure corrective work is documented, retested, and compliant.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                    <div>
                      <p className="font-medium text-white text-sm">Prevention Strategies</p>
                      <p className="text-xs text-white/70">You've learned preventative strategies to avoid repeat defects.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center text-xs font-bold">6</span>
                    <div>
                      <p className="font-medium text-white text-sm">Professional Standards</p>
                      <p className="text-xs text-white/70">You ensure installations are safe, professional, and inspection-ready.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 rounded bg-elec-yellow/10 border-l-2 border-elec-yellow/50">
                <p className="text-sm text-white/80">
                  <strong className="text-elec-yellow">Key Compliance Point:</strong> All defects must be identified and rectified before energisation. This ensures compliance with BS 7671, prevents safety hazards, and maintains professional installation standards.
                </p>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} />

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-8">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../6-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Checking Fixings
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../6-6">
                Next: Recording Results
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section6_5;
