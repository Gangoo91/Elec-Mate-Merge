import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Mounting Socket Outlets, Switches, and Spurs - Module 4.5.1 | Level 2 Electrical Course";
const DESCRIPTION = "Master the correct procedures for mounting socket outlets, switches, and spurs. Learn positioning requirements, fixing methods, wiring connections, and testing procedures according to BS 7671 and Building Regulations Part M.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the typical mounting height for socket outlets in new builds according to Part M?",
    options: ["300mm", "450mm", "500mm"],
    correctIndex: 1,
    explanation: "Part M of Building Regulations requires socket outlets to be mounted at 450mm to the bottom edge from finished floor level in new builds for accessibility."
  },
  {
    id: 2,
    question: "Why are grommets fitted to back box cable entries?",
    options: ["For decoration", "To protect cables from sharp edges", "To improve conductivity"],
    correctIndex: 1,
    explanation: "Grommets protect cable insulation from damage caused by sharp edges of the knockout holes in back boxes."
  },
  {
    id: 3,
    question: "What is the correct earth conductor colour in modern UK wiring?",
    options: ["Green/yellow", "Blue", "Brown"],
    correctIndex: 0,
    explanation: "The modern UK standard uses green/yellow sleeving for earth conductors in accordance with BS 7671."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the standard mounting height for socket outlets in a new build under Part M?",
    options: ["300 mm", "450 mm", "500 mm", "600 mm"],
    correctAnswer: 1,
    explanation: "Building Regulations Part M requires socket outlets to be mounted at 450mm to the bottom edge from finished floor level in new builds for accessibility."
  },
  {
    id: 2,
    question: "Which regulation sets out accessibility heights for sockets and switches?",
    options: ["BS 7671", "Building Regulations Part M", "BS 5839", "IET Code of Practice"],
    correctAnswer: 1,
    explanation: "Building Regulations Part M sets out accessibility requirements including mounting heights for electrical accessories."
  },
  {
    id: 3,
    question: "True or False: Switches are generally mounted at 900mm above floor level in new builds.",
    options: ["True", "False", "Only in bathrooms", "Only for commercial buildings"],
    correctAnswer: 1,
    explanation: "False. Switches are generally mounted at 1200mm to the centre from finished floor level in new builds according to Part M."
  },
  {
    id: 4,
    question: "Name two types of back boxes.",
    options: ["Flush-mounted and surface-mounted", "Round and square", "Metal and plastic", "Large and small"],
    correctAnswer: 0,
    explanation: "The main types are flush-mounted (for plastered walls), surface-mounted (for workshops/garages), and dry-lining boxes (for partition walls)."
  },
  {
    id: 5,
    question: "Why are grommets used in back boxes?",
    options: ["For decoration", "To protect cables from sharp edges and prevent insulation damage", "To improve electrical conductivity", "To reduce installation time"],
    correctAnswer: 1,
    explanation: "Grommets protect cables from sharp edges of knockout holes and prevent damage to cable insulation."
  },
  {
    id: 6,
    question: "What is the correct wiring colour for a neutral conductor in modern UK wiring?",
    options: ["Brown", "Blue", "Green/yellow", "Black"],
    correctAnswer: 1,
    explanation: "In modern UK wiring, the neutral conductor is blue in accordance with BS 7671 harmonised colours."
  },
  {
    id: 7,
    question: "What should be done before energising a newly installed socket outlet?",
    options: ["Check it looks neat", "Carry out polarity, continuity, and insulation resistance tests", "Install the faceplate", "Clean the area"],
    correctAnswer: 1,
    explanation: "Testing including polarity, continuity, and insulation resistance tests must be completed before energising any new installation."
  },
  {
    id: 8,
    question: "Give one practical tip to ensure socket outlets are aligned in a row.",
    options: ["Use a tape measure", "Use a laser level or temporarily fit all faceplates before final fixing", "Measure from the ceiling", "Estimate by eye"],
    correctAnswer: 1,
    explanation: "Using a laser level or temporarily fitting all faceplates before final fixing ensures perfect alignment across multiple accessories."
  }
];

const Module4Section5_1 = () => {
  useSEO(TITLE, DESCRIPTION);

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
              Back to Section 5
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
              <span className="text-white/60">Section 5.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Mounting Socket Outlets, Switches, and Spurs
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master the fundamental skills for installing electrical accessories safely and correctly, ensuring compliance with BS 7671 and Building Regulations Part M.
            </p>
          </header>

          {/* Quick Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="text-white/80 text-sm leading-relaxed">
              <strong className="text-elec-yellow">Key points:</strong> Set out from consistent reference points. Use correct spacing (conduit 1.2-1.5m, trunking 0.9-1.2m). Check for obstructions and mark centre lines for alignment.
            </p>
          </div>

          {/* Section 1: Regulatory Requirements */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Regulatory Requirements and Standard Heights
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>BS 7671 and Building Regulations Part M establish mounting heights for accessibility and safety compliance.</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Building Regulations Part M Requirements</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Socket outlet heights:</strong> 450mm to bottom edge from finished floor level in new builds</li>
                  <li>• <strong>Switch heights:</strong> 1200mm to centre from finished floor level for accessibility</li>
                  <li>• Kitchen worktop sockets: 150mm above work surface minimum</li>
                  <li>• Bathroom zones: specific height restrictions for safety zones</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">BS 7671 Safety and Installation Requirements</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Safe zones for cable routes: Accessories must be positioned to maintain safe cable routes</li>
                  <li>• IP ratings appropriate for location (bathrooms, kitchens, outdoor)</li>
                  <li>• RCD protection requirements for socket outlet circuits</li>
                  <li>• Ring final circuits: maximum 100m² floor area coverage</li>
                </ul>
                <p className="text-xs text-white/60 mt-3 p-2 bg-black/20 rounded">Key regulation: 522.6.202 - cables concealed in walls require RCD protection</p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="regulatory-requirements-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Section 2: Box Selection */}
          <section className="mb-10 pt-8 border-t border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Box Selection and Fixing Methods
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Selecting appropriate back boxes and fixing methods ensures secure, long-lasting installations.</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Back Box Types and Applications</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Flush-mounted boxes:</strong> For plastered walls in domestic and commercial applications</li>
                  <li>• <strong>Surface-mounted boxes:</strong> Workshops, garages, temporary installations</li>
                  <li>• <strong>Dry-lining boxes:</strong> Plasterboard partition walls without solid backing</li>
                </ul>
                <p className="text-xs text-white/60 mt-3 p-2 bg-black/20 rounded">Depth selection: 25mm minimum for single accessories, 35mm for doubles</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Wall Construction and Fixing Selection</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Solid masonry:</strong> Brown plugs (size 6) for brick, grey plugs (size 8) for concrete</li>
                  <li>• <strong>Hollow construction:</strong> Spring toggles for plasterboard, expanding anchors for cavity walls</li>
                  <li>• Metal stud grab fixings for commercial partitions</li>
                </ul>
                <p className="text-xs text-white/60 mt-3 p-2 bg-black/20 rounded">Load consideration: Single sockets require 25kg pull-out resistance minimum</p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="box-selection-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Section 3: Installation Procedures */}
          <section className="mb-10 pt-8 border-t border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Installation Procedures and Wiring
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Systematic installation and wiring procedures ensure safety, compliance, and professional results.</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Cable Preparation and Stripping</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Twin and earth: remove outer sheath 25mm, inner conductors 12mm</li>
                  <li>• Apply green/yellow sleeving to bare earth conductors</li>
                  <li>• Ensure earth continuity through all accessories</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">BS 7671 Harmonised Colours (post-2004)</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Live (Line):</strong> Brown conductor to L terminal</li>
                  <li>• <strong>Neutral:</strong> Blue conductor to N terminal</li>
                  <li>• <strong>Earth:</strong> Green/yellow sleeved conductor to E or ⏚ terminal</li>
                </ul>
                <p className="text-xs text-white/60 mt-3 p-2 bg-black/20 rounded">Critical check: Verify polarity before energising - L and N must not be reversed</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Spur Connections and Protection</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Unfused spur:</strong> Maximum one single or one double socket per spur</li>
                  <li>• <strong>Fused spur:</strong> 13A fuse maximum, FCU must be accessible</li>
                  <li>• Total number of spurs must not exceed socket outlets on ring</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="wiring-procedures-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Section 4: Testing */}
          <section className="mb-10 pt-8 border-t border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Testing and Quality Control
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Comprehensive testing ensures safety, compliance, and reliable operation before the installation is energised.</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Test Sequence (BS 7671 Part 6)</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Continuity of protective conductors (R1+R2 test)</li>
                  <li>• Continuity of ring final circuit conductors</li>
                  <li>• Insulation resistance testing at 500V DC</li>
                  <li>• Polarity verification using continuity tester</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Acceptable Test Values</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Insulation resistance:</strong> minimum 1MΩ at 500V DC</li>
                  <li>• <strong>Earth continuity:</strong> typically 0.05-1.38Ω for domestic circuits</li>
                  <li>• <strong>Ring circuit:</strong> ±0.05Ω difference maximum end-to-end</li>
                </ul>
                <p className="text-xs text-white/60 mt-3 p-2 bg-black/20 rounded">Critical requirement: No test may be omitted - all must pass before energising</p>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10 pt-8 border-t border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                During a school refurbishment project, the electrical contractor installed socket outlets at standard 300mm height to match existing installations. However, the building control officer noted that the new extension was subject to Part M accessibility requirements and required 450mm mounting height.
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                The contractor had to relocate all socket outlets in the new areas, requiring new back boxes, cable extensions, and making good of the original holes. The rework delayed the project by two weeks and doubled the labour costs.
              </p>
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                <p className="text-green-400 text-sm">
                  <strong>Lesson learned:</strong> Always verify which regulations apply to specific areas of a project. Check Part M compliance requirements during the design phase and confirm mounting heights with building control before installation begins.
                </p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <h3 className="font-medium text-white mb-2">Summary</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Mounting socket outlets, switches, and spurs requires careful planning, adherence to regulations, and precise execution. Correct heights according to Part M, secure fixings appropriate to wall construction, neat wiring with proper connections, and thorough testing ensure the installation is safe, compliant, and professional.
            </p>
          </div>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Test your knowledge of mounting socket outlets, switches, and spurs" />

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Section 5
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-2">
                Next: Installing Lighting Points
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section5_1;
