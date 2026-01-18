import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "bs7671-m8s3-check1",
    question: "What is the main focus of BS 7671 Amendment 3 regarding AFDDs?",
    options: [
      "Mandatory for all installations",
      "Recommended for higher risk locations",
      "Removed from requirements",
      "Only for industrial use"
    ],
    correctIndex: 1,
    explanation: "Amendment 3 strengthens recommendations for Arc Fault Detection Devices (AFDDs) in locations with sleeping accommodation, combustible construction materials, or irreplaceable goods."
  },
  {
    id: "bs7671-m8s3-check2",
    question: "What new Part was added to BS 7671 in the 18th Edition?",
    options: ["Part 6", "Part 7", "Part 8 - Prosumer Installations", "Part 9"],
    correctIndex: 2,
    explanation: "Part 8 'Prosumer's Electrical Installations' was added to address installations that generate and/or store energy as well as consuming it (solar PV, batteries, etc.)."
  },
  {
    id: "bs7671-m8s3-check3",
    question: "What enhanced requirement applies to consumer units in domestic premises?",
    options: [
      "Must be IP4X rated",
      "Must be metal-clad or within non-combustible enclosure",
      "Must have glass front",
      "Must be located outside"
    ],
    correctIndex: 1,
    explanation: "Consumer units in domestic premises must be either metal-clad (e.g., steel enclosure) or installed within a non-combustible enclosure to reduce fire risk from arc faults."
  }
];

const faqs = [
  {
    question: "When did Amendment 3 come into effect?",
    answer: "Amendment 3 was published in 2024 with a transition period allowing work to comply with either Amendment 2 or Amendment 3 for a defined period. Always check current transition dates with your registration scheme."
  },
  {
    question: "Are existing installations non-compliant after an amendment?",
    answer: "No. Existing compliant installations remain compliant. Amendments apply to new work and alterations. The general principle is that installations need only comply with requirements in force when the work was done."
  },
  {
    question: "What's driving the changes in BS 7671?",
    answer: "Changes reflect technological advances (EVs, renewables), improved understanding of risks (arc faults, fire), harmonisation with European standards (HD 60364), and lessons from incidents and research."
  },
  {
    question: "How do I stay current with regulation changes?",
    answer: "Join a competent person scheme (NICEIC, NAPIT, etc.), subscribe to IET publications, attend CPD training, and monitor announcements from scheme providers and industry bodies."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A house is being rewired with a new consumer unit. What fire safety requirement applies to the consumer unit?",
  options: [
    "No specific fire requirement",
    "Must be plastic with fire barrier",
    "Must be metal-clad or in non-combustible enclosure",
    "Must have integral fire alarm"
  ],
  correctAnswer: 2,
  explanation: "Domestic consumer units must be metal-clad or installed within a non-combustible enclosure. This requirement was introduced in Amendment 3 to reduce fire risk from arc faults within the unit."
  }
];

const BS7671Module8Section3 = () => {
  useSEO({
    title: "Amendment 3 Highlights | BS7671 Module 8.3",
    description: "Understand the latest BS 7671 Amendment 3 changes including AFDD recommendations, prosumer installations, and enhanced fire safety requirements."
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
            <Link to="/electrician/upskilling/bs7671-module-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 8
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 8.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Amendment 3 Highlights
          </h1>
          <p className="text-white/80">
            Latest updates and enhanced requirements in BS 7671
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>AFDDs:</strong> Stronger recommendations for fire-risk areas</li>
              <li><strong>Part 8:</strong> Prosumer installations formalised</li>
              <li><strong>Consumer units:</strong> Metal-clad requirement</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> All new installations and alterations</li>
              <li><strong>Use:</strong> Check current edition, apply latest requirements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Key changes in Amendment 3",
              "Enhanced AFDD recommendations",
              "Prosumer installation requirements (Part 8)",
              "Consumer unit fire safety",
              "SPD requirements evolution",
              "Transition period and compliance"
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
            Arc Fault Detection Devices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Amendment 3 significantly strengthens recommendations for Arc Fault Detection
              Devices (AFDDs). These detect dangerous arc faults that can cause fires but
              won't trip conventional overcurrent or RCD protection.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recommended Locations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Sleeping accommodation (bedrooms)</li>
                  <li>Premises with combustible construction</li>
                  <li>Locations with irreplaceable goods</li>
                  <li>Higher fire risk environments</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">How AFDDs Work</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Monitor for characteristic arc signatures</li>
                  <li>Detect series and parallel arc faults</li>
                  <li>Disconnect before fire develops</li>
                  <li>Work alongside RCD and MCB protection</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Series Arc</p>
                <p className="text-white/90 text-xs">Loose connection</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Parallel Arc</p>
                <p className="text-white/90 text-xs">Insulation breakdown</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Ground Arc</p>
                <p className="text-white/90 text-xs">To earth fault</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Prosumer Installations (Part 8)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Part 8 formalises requirements for installations that generate and/or store
              electrical energy in addition to consuming it from the public supply.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Prosumer Scope Includes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Solar PV installations</li>
                <li>Battery energy storage systems</li>
                <li>Small wind turbines</li>
                <li>Vehicle-to-Grid (V2G) systems</li>
                <li>Combined generation and storage</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Part 8 Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Labelling:</strong> Warning of multiple energy sources</li>
                <li><strong>Isolation:</strong> Means to disconnect all sources</li>
                <li><strong>Protection:</strong> Type B RCD where DC faults possible</li>
                <li><strong>Grid interface:</strong> G98/G99 compliance</li>
              </ul>
            </div>

            <p>
              Part 8 brings together scattered requirements and provides a dedicated
              framework for the growing number of domestic and commercial energy systems.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Consumer Unit Fire Safety
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Enhanced fire safety requirements for consumer units in domestic premises
              reflect the risk of fire from arc faults within the unit itself.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Compliance Options</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Metal-clad:</strong> Steel or similar enclosure</li>
                  <li><strong>Non-combustible enclosure:</strong> Surrounding cabinet</li>
                  <li>Must contain any fire within unit</li>
                  <li>Applies to new and replacement units</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Why This Matters</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Plastic units can ignite and spread fire</li>
                  <li>Consumer units often in cupboards</li>
                  <li>Arc faults may not trip protection</li>
                  <li>Fire spread risk in domestic settings</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Installation Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Metal units provide inherent containment</li>
                <li>Non-combustible enclosures must be properly specified</li>
                <li>Fire barriers may be needed for cable entries</li>
                <li>Combination with AFDD provides enhanced protection</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Other Key Changes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Amendment 3 includes various other updates reflecting technological changes
              and improved understanding of electrical safety.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">SPD Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Strengthened requirements</li>
                  <li>More locations now covered</li>
                  <li>Type 2 minimum in many cases</li>
                  <li>Coordination with overcurrent protection</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">EV Charging Updates</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Part 722 refinements</li>
                  <li>PME supply clarity</li>
                  <li>Earthing requirements</li>
                  <li>Load management systems</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Documentation Changes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Updated model forms in Appendix 6</li>
                <li>Additional inspection items</li>
                <li>EICR coding clarifications</li>
                <li>Prosumer-specific schedules</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Transition and Compliance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When new amendments are published, transition periods allow the industry
              to adapt. Understanding transition requirements is essential for compliance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">General Principles:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>New installations must comply with current edition</li>
                <li>Transition period allows either old or new compliance</li>
                <li>After transition, only new requirements apply</li>
                <li>Existing compliant installations remain valid</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Staying Current:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Monitor scheme provider announcements</li>
                <li>Attend CPD training on changes</li>
                <li>Update reference materials</li>
                <li>Review processes and documentation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Amendment 3 Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Consider AFDD for sleeping areas and fire risk locations</li>
                <li>Use metal-clad consumer units in domestic premises</li>
                <li>Apply Part 8 requirements to prosumer installations</li>
                <li>Check SPD requirements for new installations</li>
                <li>Update documentation to latest model forms</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Outdated edition:</strong> — Using superseded requirements</li>
                <li><strong>Missing AFDD consideration:</strong> — Not discussing with client</li>
                <li><strong>Plastic consumer units:</strong> — Non-compliant in domestic</li>
                <li><strong>Old forms:</strong> — Using outdated certificates</li>
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
              <p className="font-medium text-white mb-1">Key Changes</p>
              <ul className="space-y-0.5">
                <li>AFDD: Stronger recommendations</li>
                <li>Part 8: Prosumer installations</li>
                <li>CU: Metal-clad for domestic</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Resources</p>
              <ul className="space-y-0.5">
                <li>IET Wiring Regulations</li>
                <li>Scheme provider updates</li>
                <li>CPD training courses</li>
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
            <Link to="/study-centre/upskilling/bs7671-module-8-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-course">
              Complete Course
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module8Section3;