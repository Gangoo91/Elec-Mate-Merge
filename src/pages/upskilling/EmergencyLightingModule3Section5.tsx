import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m3s5-check1",
    question: "What must emergency lighting layout drawings show?",
    options: ["Wiring details only", "Luminaire positions and types", "Building structural details", "Fire alarm positions only"],
    correctIndex: 1,
    explanation: "Emergency lighting layout drawings must show luminaire positions, types (maintained/non-maintained), exit sign locations, and coverage areas. They form part of the compliance documentation."
  },
  {
    id: "emergencylighting-m3s5-check2",
    question: "What symbol standard is commonly used for emergency lighting drawings?",
    options: ["BS 7671", "BS EN 60617", "ISO 9001", "BS 5266-1 annex"],
    correctIndex: 1,
    explanation: "BS EN 60617 provides standard graphical symbols for electrical diagrams. BS 5266-1 includes emergency lighting specific symbols in its annexes for use on layout drawings."
  },
  {
    id: "emergencylighting-m3s5-check3",
    question: "What type of drawing shows the installed system after completion?",
    options: ["Design drawing", "Schematic drawing", "As-built drawing", "Proposal drawing"],
    correctIndex: 2,
    explanation: "As-built drawings record the actual installed system, reflecting any changes made during installation. These are essential for maintenance and future modifications."
  }
];

const faqs = [
  {
    question: "What scale should emergency lighting drawings be?",
    answer: "1:100 or 1:200 is typical for floor plans, allowing clear identification of luminaire positions. Larger scales (1:50) may be needed for complex areas. The scale must be clearly stated on the drawing."
  },
  {
    question: "Do I need separate drawings for emergency and normal lighting?",
    answer: "Emergency lighting should have dedicated drawings or clearly distinguished layers on combined drawings. This aids maintenance, testing, and compliance verification. Separate drawings are preferred for complex installations."
  },
  {
    question: "What information goes in the drawing legend?",
    answer: "Symbol definitions, luminaire types and models, maintained/non-maintained status, wiring type, circuit references, and any site-specific annotations. Include drawing revision history."
  },
  {
    question: "How often should as-built drawings be updated?",
    answer: "After any modification to the system - added luminaires, relocated units, changed luminaire types, or circuit alterations. Keep revision history and ensure current drawings are available on site."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A fire officer requests emergency lighting documentation. What drawing must be available on site?",
  options: [
    "Original design proposal only",
    "Current as-built layout drawing",
    "Manufacturer product sheets",
    "Building structural plans"
  ],
  correctAnswer: 1,
  explanation: "Current as-built drawings showing the installed system must be available for inspection. These should reflect any modifications and be part of the log book documentation."
  }
];

const EmergencyLightingModule3Section5 = () => {
  useSEO({
    title: "Layout Drawings and Documentation | Emergency Lighting Module 3.5",
    description: "Create and interpret emergency lighting layout drawings for compliance, installation guidance, and fire safety documentation using standard symbols."
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Layout Drawings and Documentation
          </h1>
          <p className="text-white/80">
            Creating and interpreting emergency lighting drawings for compliance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Symbols:</strong> BS EN 60617 standard</li>
              <li><strong>Scale:</strong> 1:100 or 1:200 typical</li>
              <li><strong>As-built:</strong> Reflects actual installation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Documentation</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Design:</strong> Initial proposal</li>
              <li><strong>Installation:</strong> Working drawings</li>
              <li><strong>Completion:</strong> As-built records</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Interpret emergency lighting symbols",
              "Create compliant layout drawings",
              "Distinguish drawing types and purposes",
              "Maintain as-built documentation",
              "Use appropriate scales and legends",
              "Present drawings for inspection"
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
            Drawing Content Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Emergency lighting layout drawings must provide sufficient information for
              installation, verification, and ongoing maintenance of the system.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Information</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Luminaire positions and types</li>
                  <li>Exit sign locations</li>
                  <li>Maintained/non-maintained status</li>
                  <li>Circuit references</li>
                  <li>Escape routes shown</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Supporting Information</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Drawing scale and orientation</li>
                  <li>Symbol legend</li>
                  <li>Revision history</li>
                  <li>Designer/checker details</li>
                  <li>Project reference</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Standard Symbols
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Using standardised symbols ensures drawings can be understood by all
              stakeholders - installers, maintenance personnel, and inspectors.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Symbol Elements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Circle with arrow:</strong> Self-contained luminaire with direction</li>
                <li><strong>Rectangle:</strong> Exit sign (with M for maintained)</li>
                <li><strong>M designation:</strong> Maintained operation</li>
                <li><strong>NM designation:</strong> Non-maintained operation</li>
                <li><strong>Circuit number:</strong> Reference to specific circuit</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">BS EN 60617</p>
                <p className="text-white/90 text-xs">General symbols</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">BS 5266</p>
                <p className="text-white/90 text-xs">EL specific</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Legend</p>
                <p className="text-white/90 text-xs">Site specific</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Drawing Types and Stages
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different drawing types serve different purposes through the project
              lifecycle. Understanding each type ensures appropriate documentation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Project Stages</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Proposal:</strong> Initial design concept</li>
                  <li><strong>Detailed design:</strong> Full specification</li>
                  <li><strong>Installation:</strong> Working drawings</li>
                  <li><strong>As-built:</strong> Final installed system</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">As-Built Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Reflects actual installation</li>
                  <li>Updated for any changes</li>
                  <li>Part of log book</li>
                  <li>Available for inspection</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Drawing Best Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use consistent symbols throughout</li>
                <li>Include comprehensive legend</li>
                <li>Show escape routes clearly</li>
                <li>Mark maintained vs non-maintained</li>
                <li>Reference to circuit schedules</li>
                <li>Maintain revision control</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Drawing Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Missing legend:</strong> — Symbols must be defined</li>
                <li><strong>Outdated drawings:</strong> — Must reflect current installation</li>
                <li><strong>No scale:</strong> — Essential for interpretation</li>
                <li><strong>Missing revision history:</strong> — Track all changes</li>
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
              <p className="font-medium text-white mb-1">Drawing Content</p>
              <ul className="space-y-0.5">
                <li>Luminaire positions</li>
                <li>Exit sign locations</li>
                <li>M/NM designation</li>
                <li>Circuit references</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Standards</p>
              <ul className="space-y-0.5">
                <li>BS EN 60617: Symbols</li>
                <li>Scale: 1:100/1:200</li>
                <li>Legend required</li>
                <li>Revision history</li>
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
            <Link to="/electrician/upskilling/emergency-lighting-module-3-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-3-section-6">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule3Section5;