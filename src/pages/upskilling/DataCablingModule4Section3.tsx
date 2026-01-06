import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "datacabling-m4s3-check1",
    question: "What fire resistance must penetration sealing maintain in a 60-minute fire wall?",
    options: ["30 minutes", "60 minutes", "90 minutes", "120 minutes"],
    correctIndex: 1,
    explanation: "Penetration sealing must maintain the same fire resistance rating as the element being penetrated - 60 minutes for 60-minute walls."
  },
  {
    id: "datacabling-m4s3-check2",
    question: "What is the maximum percentage of penetration area that cables can occupy?",
    options: ["40%", "50%", "60%", "75%"],
    correctIndex: 2,
    explanation: "Cables should not exceed 60% of the penetration opening area to allow proper intumescent material expansion and effective sealing during a fire."
  },
  {
    id: "datacabling-m4s3-check3",
    question: "Which standard covers fire resistance tests for service penetrations?",
    options: ["BS EN 13501-1", "BS EN 1366-3", "BS 476-20", "BS 9999"],
    correctIndex: 1,
    explanation: "BS EN 1366-3 is the specific standard for fire resistance tests for service installations, including penetration sealing systems."
  }
];

const faqs = [
  {
    question: "What are the three criteria for fire resistance (EI)?",
    answer: "E = Integrity (no flames or hot gases pass through), I = Insulation (temperature rise limited on unexposed face), and the time in minutes they must be maintained (e.g., EI 60 = 60 minutes of both integrity and insulation)."
  },
  {
    question: "When should I use intumescent pillows vs blocks?",
    answer: "Pillows are ideal for cable bundles with quick installation and easy reconfiguration. Blocks provide higher structural integrity for large openings and horizontal installations requiring better load-bearing capability."
  },
  {
    question: "How often should fire-stopping be inspected?",
    answer: "Monthly visual inspection by building occupier, annual detailed inspection by competent person, and five-year professional assessment by FIRAS-approved inspector. Also inspect after any cable additions or modifications."
  },
  {
    question: "What is FIRAS certification?",
    answer: "FIRAS is an installer registration scheme for fire-stopping contractors. It ensures installers are trained, competent, and their work is regularly inspected. FIRAS-certified installations provide documented quality assurance and warranty compliance."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A hospital requires a new data cable route through a 90-minute fire-rated wall separating an escape route. What must you ensure?",
  options: [
    "Use standard fire putty which is easy to apply",
    "Use BS EN 1366-3 tested system maintaining 90-minute EI rating with proper documentation",
    "Route cables around the wall to avoid penetration entirely",
    "Use any intumescent material as they're all fire-rated"
  ],
  correctAnswer: 1,
  explanation: "The penetration must use a system tested to BS EN 1366-3 that maintains the full 90-minute fire resistance rating. Documentation must include installation certificate, material specifications, and be added to the building's fire safety records."
  }
];

const DataCablingModule4Section3 = () => {
  useSEO({
    title: "Fire-Stopping and Penetration Sealing | Data Cabling Module 4.3",
    description: "Learn fire compartmentation principles, intumescent materials, and penetration sealing requirements for data cabling installations."
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
            <Link to="../data-cabling-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fire-Stopping and Penetration Sealing
          </h1>
          <p className="text-white/80">
            Fire protection and building penetration sealing requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Maintain fire compartmentation integrity</li>
              <li><strong>Key rule:</strong> Sealing must match wall/floor fire rating</li>
              <li><strong>Standard:</strong> BS EN 1366-3 for penetration sealing</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Fire-rated walls = penetration sealing required</li>
              <li><strong>Use:</strong> Tested systems, FIRAS installers, proper documentation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand fire compartmentation principles",
              "Select appropriate fire-stopping materials",
              "Install penetration sealing correctly",
              "Meet Building Regulations Part B requirements",
              "Document fire-stopping installations",
              "Maintain fire-stopping throughout building lifecycle"
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
            Fire Compartmentation Principles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building Regulations Part B requires that fire resistance of building elements is not
              compromised by service penetrations. All cable penetrations must be properly sealed to
              maintain compartmentation integrity.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Resistance Criteria</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>E (Integrity):</strong> No passage of flames/hot gases</li>
                  <li><strong>I (Insulation):</strong> Temperature rise limitation</li>
                  <li><strong>R (Load Bearing):</strong> Structural stability</li>
                  <li><strong>S (Smoke):</strong> Smoke leakage limitation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Fire Ratings</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>30 min:</strong> Internal partitions, some floors</li>
                  <li><strong>60 min:</strong> Escape route walls, most floors</li>
                  <li><strong>90 min:</strong> High buildings, structural elements</li>
                  <li><strong>120 min:</strong> Basements, high-risk areas</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">E (Integrity)</p>
                <p className="text-white/90 text-xs">No flame passage</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">I (Insulation)</p>
                <p className="text-white/90 text-xs">Temp controlled</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">S (Smoke)</p>
                <p className="text-white/90 text-xs">Smoke limited</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Intumescent Materials
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Intumescent materials expand when exposed to heat, forming a char that seals
              penetration openings and prevents fire spread. Different forms suit different applications.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow/80 text-sm mb-2">Intumescent Putty</p>
                <ul className="text-xs text-white space-y-0.5">
                  <li>Easy application</li>
                  <li>Good for small penetrations</li>
                  <li>Re-enterable for maintenance</li>
                  <li>Expansion: 3:1 to 7:1</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow/80 text-sm mb-2">Intumescent Pillows</p>
                <ul className="text-xs text-white space-y-0.5">
                  <li>Pre-formed sizes</li>
                  <li>Quick installation</li>
                  <li>Excellent for cable bundles</li>
                  <li>Ratings: 60-120 minutes</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow/80 text-sm mb-2">Intumescent Blocks</p>
                <ul className="text-xs text-white space-y-0.5">
                  <li>High structural integrity</li>
                  <li>Large openings</li>
                  <li>Good load-bearing</li>
                  <li>Ratings: up to 240 minutes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Installation Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professional fire-stopping installation requires systematic approach, proper
              preparation, and adherence to manufacturer specifications for reliable performance.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Installation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Identify fire rating of penetrated element</li>
                  <li>Select appropriate tested system</li>
                  <li>Verify cable type compatibility</li>
                  <li>Clean and prepare surfaces</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Steps</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Install cables maintaining grouping</li>
                  <li>Position intumescent around perimeter</li>
                  <li>Fill all voids completely</li>
                  <li>Install labels and documentation</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Documentation Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Penetration location and dimensions</li>
                <li>Cable types and quantities installed</li>
                <li>Fire-stop materials and system used</li>
                <li>Installation date and installer details</li>
                <li>Test certificates and approvals</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Standards and Certification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fire-stop systems must comply with relevant standards and be installed by
              competent personnel to ensure building safety compliance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Standards:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>BS EN 1366-3:</strong> Fire resistance tests for service penetrations</li>
                <li><strong>BS EN 13501-1:</strong> Fire classification of construction products</li>
                <li><strong>BS 9999:</strong> Fire safety in design and management of buildings</li>
                <li><strong>Building Regs Part B:</strong> Legal fire safety requirements</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">CERTIFIRE Scheme</p>
                <ul className="text-sm text-white space-y-1">
                  <li>BRE Global product certification</li>
                  <li>Regular factory production control</li>
                  <li>Market surveillance testing</li>
                  <li>Recognised by Building Control</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">FIRAS Registration</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Installer registration scheme</li>
                  <li>UKAS accredited inspection</li>
                  <li>Site-specific certificates</li>
                  <li>Warranty compliance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Inspection Schedule</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Monthly:</strong> Visual inspection by building occupier</li>
                <li><strong>Annually:</strong> Detailed inspection by competent person</li>
                <li><strong>5 yearly:</strong> Professional assessment by FIRAS approved inspector</li>
                <li><strong>After changes:</strong> Verify seal integrity after any cable additions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Incomplete filling:</strong> — all voids must be sealed completely</li>
                <li><strong>Wrong materials:</strong> — must be compatible with cable types</li>
                <li><strong>Missing documentation:</strong> — critical for compliance and maintenance</li>
                <li><strong>Exceeding capacity:</strong> — maximum 60% cable fill in penetration</li>
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
              <p className="font-medium text-white mb-1">Fire Resistance Criteria</p>
              <ul className="space-y-0.5">
                <li>E = Integrity (no flames)</li>
                <li>I = Insulation (temp limited)</li>
                <li>EI 60 = 60 min both criteria</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Key Requirements</p>
              <ul className="space-y-0.5">
                <li>Match sealing to wall fire rating</li>
                <li>Maximum 60% cable fill</li>
                <li>BS EN 1366-3 tested systems</li>
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
            <Link to="../data-cabling-module-4-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../data-cabling-module-4-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule4Section3;