import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Identification & Labelling - Module 8 Section 2";
const DESCRIPTION = "Learn the requirements for correct circuit identification, conductor marking, warning labels, and documentation for electrical installations.";

const quickCheckQuestions = [
  {
    id: "circuit-identification",
    question: "What does Regulation 514.9.1 require regarding circuit identification?",
    options: [
      "Circuits may be identified verbally",
      "Every circuit should be identified at its origin",
      "Only main circuits need identification",
      "Identification is optional for domestic installations"
    ],
    correctIndex: 1,
    explanation: "Regulation 514.9.1 requires every circuit to be identified at its origin by a suitable arrangement. This enables safe isolation and maintenance."
  },
  {
    id: "neutral-colour",
    question: "Which conductor colour identifies neutral in a single-phase installation?",
    options: [
      "Brown",
      "Black",
      "Blue",
      "Grey"
    ],
    correctIndex: 2,
    explanation: "Under harmonised colours, blue identifies the neutral conductor. Brown is line, and green/yellow stripes identify the protective conductor."
  },
  {
    id: "mixed-colours",
    question: "Where mixed cable colours exist (old and new), what labelling is required?",
    options: [
      "No labelling required",
      "A caution notice warning that old cable colours are present",
      "The old cables must be rewired",
      "Just note in paperwork"
    ],
    correctIndex: 1,
    explanation: "Regulation 514.14.1 requires a warning notice where different cable colour systems are used in the same installation, alerting workers to the mixed colours."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does Regulation 514.9.1 require regarding circuit identification?",
    options: [
      "Circuits may be identified verbally",
      "Every circuit should be identified at its origin",
      "Only main circuits need identification",
      "Identification is optional for domestic installations"
    ],
    correctAnswer: 1,
    explanation: "Regulation 514.9.1 requires every circuit to be identified at its origin by a suitable arrangement. This enables safe isolation and maintenance."
  },
  {
    id: 2,
    question: "Which conductor colour identifies neutral in a single-phase installation?",
    options: [
      "Brown",
      "Black",
      "Blue",
      "Grey"
    ],
    correctAnswer: 2,
    explanation: "Under harmonised colours, blue identifies the neutral conductor. Brown is line, and green/yellow stripes identify the protective conductor."
  },
  {
    id: 3,
    question: "In a three-phase installation, what colour identifies L2?",
    options: [
      "Brown",
      "Black",
      "Grey",
      "Blue"
    ],
    correctAnswer: 1,
    explanation: "Three-phase harmonised colours are: L1 = Brown, L2 = Black, L3 = Grey. Blue is neutral, green/yellow is protective conductor."
  },
  {
    id: 4,
    question: "When must warning labels be provided at the origin of an installation?",
    options: [
      "Only for commercial installations",
      "For all installations - specifying type of earthing, nominal voltage, and for RCD test frequency",
      "Only when specifically requested",
      "Only for three-phase installations"
    ],
    correctAnswer: 1,
    explanation: "Regulations require labels at the origin showing earthing arrangement, nominal voltage/frequency, and RCD test button instructions. Additional labels required for specific situations."
  },
  {
    id: 5,
    question: "What information should a circuit chart at the consumer unit include?",
    options: [
      "Just circuit numbers",
      "Circuit number, description, protective device type and rating",
      "Only the installation address",
      "Manufacturer warranty information"
    ],
    correctAnswer: 1,
    explanation: "Circuit charts should show circuit number, description of what it supplies, protective device type (MCB/RCBO/fuse), rating, and any associated RCD protection."
  },
  {
    id: 6,
    question: "Where mixed cable colours exist (old and new), what labelling is required?",
    options: [
      "No labelling required",
      "A caution notice warning that old cable colours are present",
      "The old cables must be rewired",
      "Just note in paperwork"
    ],
    correctAnswer: 1,
    explanation: "Regulation 514.14.1 requires a warning notice where different cable colour systems are used in the same installation, alerting workers to the mixed colours."
  },
  {
    id: 7,
    question: "What colour must a label warning of voltage be?",
    options: [
      "Any colour",
      "Blue text on white",
      "Black text on yellow background",
      "White text on red"
    ],
    correctAnswer: 2,
    explanation: "Safety labels warning of electrical danger should use black text/symbols on a yellow background, following safety sign standards (BS EN ISO 7010)."
  },
  {
    id: 8,
    question: "Labels should be designed to last:",
    options: [
      "At least 1 year",
      "Until the next inspection",
      "For the expected life of the installation",
      "6 months minimum"
    ],
    correctAnswer: 2,
    explanation: "Regulation 514.1.1 requires labels to be durable and legible for the expected life of the installation. Handwritten labels that fade are not acceptable."
  },
  {
    id: 9,
    question: "What label is required where an RCD is installed?",
    options: [
      "No label required",
      "A notice recommending quarterly test button operation",
      "A label showing RCD price",
      "Only manufacturer's label"
    ],
    correctAnswer: 1,
    explanation: "Regulation 514.12.2 requires a notice at or near the origin advising users to test RCDs quarterly (every 3 months) using the test button."
  },
  {
    id: 10,
    question: "If equipment has more than one supply, what labelling is required?",
    options: [
      "Normal circuit labels only",
      "Warning labels indicating all supply sources at each point of isolation",
      "No special labelling needed",
      "Just a note in the log book"
    ],
    correctAnswer: 1,
    explanation: "Regulation 514.15.1 requires warning labels at points of isolation where equipment may be fed from more than one source. This prevents unsafe isolation attempts."
  }
];

const faqs = [
  {
    question: "Can I use handwritten labels?",
    answer: "Handwritten labels are generally not acceptable as they fade and become illegible over time. Labels should be durable, legible, and designed to last the expected life of the installation. Printed labels, engraved labels, or proper label makers should be used."
  },
  {
    question: "What if old colour cables are present?",
    answer: "Where old and new cable colours are used in the same installation, a warning notice must be provided at the origin (Regulation 514.14.1). The notice should warn that different cable colour coding systems exist and care must be taken during work."
  },
  {
    question: "Do I need to label every circuit?",
    answer: "Yes. Regulation 514.9.1 requires every circuit to be identified at its origin. A circuit chart should clearly describe what each circuit supplies, not just 'Circuit 1', 'Circuit 2' etc."
  },
  {
    question: "What labels are required at an earth electrode?",
    answer: "The main earth terminal should be labelled, and earth electrode connections should be marked with a label warning 'Safety Electrical Connection - Do Not Remove' to prevent inadvertent disconnection during other work."
  },
  {
    question: "Are warning labels required for PV installations?",
    answer: "Yes. PV installations require specific warning labels including warnings that parts remain live when isolated from the mains, DC isolation point markings, and warning labels on both DC and AC sides of the inverter."
  },
  {
    question: "What if a circuit description changes?",
    answer: "Labels must be updated to reflect current use. An outdated label could lead to incorrect isolation. If circuit usage changes significantly, the circuit chart should be updated and re-signed by a competent person."
  }
];

const InspectionTestingModule8Section2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-8">
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
            <span>Module 8 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Identification & Labelling
          </h1>
          <p className="text-white/80">
            Ensure proper identification of circuits, conductors, and equipment with clear, durable labelling
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Requirement:</strong> Every circuit identified at origin (Reg 514.9.1)</li>
              <li><strong>Durability:</strong> Labels must last life of installation</li>
              <li><strong>Warnings:</strong> RCDs, mixed colours, multiple supplies</li>
              <li><strong>Colours:</strong> L=Brown, N=Blue, CPC=Green/Yellow</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Labels Required</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Origin:</strong> Earthing type, voltage, RCD notice</li>
              <li><strong>Earth:</strong> "Safety Electrical Connection"</li>
              <li><strong>Warning:</strong> Black on yellow background</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand circuit identification requirements",
              "Apply correct conductor colour coding",
              "Label protective devices appropriately",
              "Identify isolation point labelling needs",
              "Create clear circuit charts and schedules",
              "Apply warning and safety labels correctly"
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

        {/* Section 1: Circuit Identification Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Circuit Identification Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regulation 514.9.1 requires every circuit to be arranged so it can be identified. Clear identification enables safe isolation and helps with maintenance and fault finding.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Circuit Chart Requirements</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Unique circuit number or reference</li>
                <li>Clear description (e.g., "Kitchen Sockets" not just "Circuit 3")</li>
                <li>Protective device type and rating</li>
                <li>Associated RCD protection if applicable</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Circuit charts should be located at the distribution board and kept up to date whenever changes are made.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Conductor Colour Identification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Conductor Colour Identification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Table 51 specifies harmonised cable colours. These must be verified during inspection:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Single-Phase</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-amber-700 border border-white/20"></span>
                    Brown - Line (L)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-blue-600 border border-white/20"></span>
                    Blue - Neutral (N)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-gradient-to-r from-green-500 via-yellow-400 to-green-500 border border-white/20"></span>
                    Green/Yellow - CPC
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Three-Phase</p>
                <ul className="text-sm text-white space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-amber-700 border border-white/20"></span>
                    Brown - L1
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-gray-900 border border-white/20"></span>
                    Black - L2
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-gray-500 border border-white/20"></span>
                    Grey - L3
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Old UK colours (red/yellow/blue for 3-phase, red/black for single-phase) are still found in existing installations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Required Warning Labels */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Required Warning Labels
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 requires specific warning labels in various situations:
            </p>

            <div className="my-6 space-y-4">
              <div className="p-3 rounded bg-transparent border border-amber-500/30">
                <p className="text-sm font-medium text-amber-400 mb-2">At Origin (Reg 514.12.1)</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>Type of earthing arrangement</li>
                  <li>Nominal voltage and frequency</li>
                  <li>RCD test button notice (quarterly testing)</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-amber-500/30">
                <p className="text-sm font-medium text-amber-400 mb-2">Mixed Colours (Reg 514.14.1)</p>
                <p className="text-sm text-white/80">"CAUTION - This installation has wiring colours to two versions of BS 7671. Great care should be taken before undertaking extension, alteration, or repair."</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-amber-500/30">
                <p className="text-sm font-medium text-amber-400 mb-2">Multiple Supplies (Reg 514.15.1)</p>
                <p className="text-sm text-white/80">"WARNING - This installation has more than one source of supply. Isolate all supplies before working."</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Earth Connection Labels */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Earth Connection Labels
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Critical earthing connections must be permanently labelled to prevent accidental disconnection:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Locations Requiring Labels</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Main earthing terminal</li>
                <li>Earth electrode connections</li>
                <li>Main equipotential bonding connections</li>
                <li>Supplementary bonding connections</li>
              </ul>
            </div>

            <div className="p-3 rounded bg-transparent border border-green-500/30 text-center">
              <p className="text-sm font-medium text-green-400">"Safety Electrical Connection - Do Not Remove"</p>
            </div>
          </div>
        </section>

        {/* Section 5: Label Durability Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Label Durability Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Regulation 514.1.1 requires labels to remain legible for the expected life of the installation. Consider:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Acceptable Label Types</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Engraved labels on metal or plastic</li>
                  <li>Industrial label printer output</li>
                  <li>Properly secured adhesive labels (quality type)</li>
                  <li>Traffic sign grade labels for outdoors</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Not Acceptable</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Handwritten labels</li>
                  <li>Masking tape with pen</li>
                  <li>Paper labels that will deteriorate</li>
                  <li>Labels that can be easily removed</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Verification During Inspection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Verification During Inspection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              During inspection, verify all required labels are present and correct:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inspection Checklist</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Circuit chart present and accurate</li>
                <li>All circuits correctly identified</li>
                <li>Required warning labels fitted</li>
                <li>Earth connection labels in place</li>
                <li>Labels are legible and durable</li>
                <li>Protective device ratings visible</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Missing or illegible labels should be recorded as observations with appropriate C-codes.
            </p>
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
                <li>Carry common warning labels in your kit for immediate replacement</li>
                <li>Invest in a proper label printer for durable, professional results</li>
                <li>Always verify circuit labels match actual circuit use</li>
                <li>Update labels whenever circuit use changes</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Verification Tips</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Don't assume existing labels are correct - verify each circuit</li>
                <li>Check label durability - will it last?</li>
                <li>Ensure warning labels are visible without opening enclosures</li>
                <li>Photograph missing or illegible labels as evidence</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using handwritten labels</strong> — they fade and become illegible</li>
                <li><strong>Not updating labels</strong> — when circuit use changes</li>
                <li><strong>Missing warning labels</strong> — for RCDs, mixed colours, multiple supplies</li>
                <li><strong>Poor descriptions</strong> — "Circuit 3" instead of "Kitchen Sockets"</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Cable Colours Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Single-Phase</p>
                <ul className="space-y-0.5">
                  <li>Line (L) = Brown</li>
                  <li>Neutral (N) = Blue</li>
                  <li>CPC = Green/Yellow</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Three-Phase</p>
                <ul className="space-y-0.5">
                  <li>L1 = Brown</li>
                  <li>L2 = Black</li>
                  <li>L3 = Grey</li>
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
            <Link to="/study-centre/upskilling/inspection-testing/module-8/section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-8/section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule8Section2;
