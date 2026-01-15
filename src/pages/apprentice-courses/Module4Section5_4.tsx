import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Using Ferrules, Sleeving, Glands, and Crimps - Module 4.5.4 | Level 2 Electrical Course";
const DESCRIPTION = "Master cable termination accessories including ferrules, sleeving, glands, and crimps. Learn proper selection, fitting techniques, and BS 7671 compliance for safe electrical installations.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of a ferrule on a flexible cable?",
    options: ["To provide strain relief", "To prevent strand separation", "To identify the cable", "To protect insulation"],
    correctIndex: 1,
    explanation: "Ferrules prevent fine strands from spreading when inserted into terminals, ensuring reliable connection and preventing loose strands."
  },
  {
    id: 2,
    question: "Name the colour coding for CPC sleeving.",
    options: ["Blue", "Brown", "Green/Yellow", "Black"],
    correctIndex: 2,
    explanation: "BS 7671 requires CPC conductors to be identified with green/yellow sleeving for safety and identification purposes."
  },
  {
    id: 3,
    question: "Why should metallic glands often be earthed?",
    options: ["To improve conductivity", "To prevent them becoming live in a fault", "To reduce installation cost", "To meet colour requirements"],
    correctIndex: 1,
    explanation: "Metallic glands must be earthed to prevent them becoming live during fault conditions, ensuring safety."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the function of a ferrule?",
    options: ["Mechanical strain relief", "Prevent strand separation in flexible conductors", "Provide earth continuity", "Seal against moisture"],
    correctAnswer: 1,
    explanation: "Ferrules prevent fine strands from spreading when inserted into terminals, ensuring reliable connection."
  },
  {
    id: 2,
    question: "True or False: You can reuse a crimp terminal if it looks undamaged.",
    options: ["True", "False", "Only if tested first", "Only for low current applications"],
    correctAnswer: 1,
    explanation: "False – once deformed during crimping, terminals cannot provide secure contact again and must not be reused."
  },
  {
    id: 3,
    question: "Name one type of crimp terminal.",
    options: ["Ring crimp", "Spade crimp", "Butt crimp", "All of the above"],
    correctAnswer: 3,
    explanation: "Ring, spade, and butt crimps are all common types of crimp terminals used for different connection purposes."
  },
  {
    id: 4,
    question: "What rating must an outdoor gland meet to be weatherproof?",
    options: ["IP44", "IP54", "IP65", "IP68"],
    correctAnswer: 3,
    explanation: "IP68 provides protection against dust ingress and continuous immersion in water, suitable for outdoor/wet locations."
  },
  {
    id: 5,
    question: "Why is correct conductor sizing important for ferrules?",
    options: ["To ensure secure mechanical grip and good electrical contact", "To prevent overheating", "To comply with colour coding", "To reduce installation time"],
    correctAnswer: 0,
    explanation: "Correct sizing ensures the ferrule grips the conductor securely and provides good electrical contact without damage."
  },
  {
    id: 6,
    question: "Which type of gland is commonly used for armoured cables?",
    options: ["Plastic gland", "Metallic gland", "Rubber gland", "Composite gland"],
    correctAnswer: 1,
    explanation: "Metallic glands are used with armoured cables to provide mechanical retention and earth continuity through the armour."
  },
  {
    id: 7,
    question: "Give one reason why metallic glands must be earthed.",
    options: ["To prevent it becoming live in a fault", "To improve conductivity", "To reduce installation cost", "To meet colour coding requirements"],
    correctAnswer: 0,
    explanation: "Metallic glands must be earthed to prevent them becoming live during fault conditions, ensuring safety."
  },
  {
    id: 8,
    question: "What tool should always be used for crimping?",
    options: ["Standard pliers", "Wire strippers", "Ratchet crimping tool", "Side cutters"],
    correctAnswer: 2,
    explanation: "Ratchet crimping tools provide the correct compression force and cannot be released until proper crimp is achieved."
  }
];

const Module4Section5_4 = () => {
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
              <span className="text-white/60">Section 5.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Using Ferrules, Sleeving, Glands, and Crimps
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master cable termination accessories for secure, reliable, and compliant electrical connections.
            </p>
          </header>

          {/* Quick Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="text-white/80 text-sm leading-relaxed">
              <strong className="text-elec-yellow">Key points:</strong> Cable termination accessories ensure secure, reliable, and compliant connections. Each accessory has specific purposes. Improper selection or installation leads to failures and safety hazards.
            </p>
          </div>

          {/* Section 1: Ferrules */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Ferrules and Their Applications
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Ferrules are essential accessories for terminating stranded flexible conductors safely and securely.</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Ferrule Types</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Uninsulated ferrules:</strong> Bare copper or tinned copper for general use</li>
                  <li>• <strong>Insulated ferrules:</strong> Colour-coded plastic sleeves for identification</li>
                  <li>• <strong>Twin ferrules:</strong> For terminating two conductors in one terminal</li>
                  <li>• <strong>Long ferrules:</strong> Extended support in vibration applications</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Installation Procedure</h4>
                <ol className="space-y-2 text-sm list-decimal list-inside">
                  <li>Strip cable insulation to match ferrule barrel length exactly</li>
                  <li>Check conductor for damage or missing strands</li>
                  <li>Insert conductor fully into ferrule until touching end stop</li>
                  <li>Position ferrule in correct size die of crimping tool</li>
                  <li>Apply crimp ensuring tool ratchet completes full cycle</li>
                  <li>Perform tug test to verify mechanical security</li>
                </ol>
                <p className="text-xs text-white/60 mt-3 p-2 bg-black/20 rounded">Quality check: Properly crimped ferrule should show hexagonal impression with no conductor visible at crimp</p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ferrule-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Section 2: Sleeving */}
          <section className="mb-10 pt-8 border-t border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Sleeving for Identification and Protection
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Sleeving provides insulation and identification for conductors, particularly essential for CPC identification.</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">BS 7671 Colour Coding Requirements</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Green/Yellow:</strong> Circuit Protective Conductor (CPC/Earth) - mandatory</li>
                  <li>• <strong>Blue:</strong> Neutral conductor identification where required</li>
                  <li>• <strong>Brown:</strong> Line conductor identification in control circuits</li>
                  <li>• Other colours for control and instrumentation as specified</li>
                </ul>
                <p className="text-xs text-white/60 mt-3 p-2 bg-black/20 rounded">BS 7671 requirement: CPC in T&E cable must always be sleeved green/yellow before termination</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Installation Requirements</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Must fit snugly over conductor without gaps or loose sections</li>
                  <li>• Extend sufficient length for clear identification at terminations</li>
                  <li>• Heat-shrink sleeving for permanent protection in harsh environments</li>
                  <li>• Self-amalgamating tape for waterproof sealing applications</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="sleeving-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Section 3: Glands */}
          <section className="mb-10 pt-8 border-t border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Glands for Cable Entry and Protection
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Glands secure cables at enclosure entry points, providing mechanical retention and environmental sealing.</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Gland Types</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Metallic glands:</strong> For armoured cables, provide earth continuity</li>
                  <li>• <strong>Plastic glands:</strong> Common for indoor flexible cable terminations</li>
                  <li>• Brass or stainless steel for corrosion resistance</li>
                  <li>• Must be earthed to prevent becoming live during faults</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">IP Rating Requirements</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>IP68:</strong> Complete protection against dust and continuous water immersion</li>
                  <li>• <strong>IP67:</strong> Dust-tight and protected against temporary immersion</li>
                  <li>• <strong>IP54:</strong> Protected against dust and water splashing</li>
                </ul>
                <p className="text-xs text-white/60 mt-3 p-2 bg-black/20 rounded">Installation note: Follow manufacturer torque settings to avoid damage while maintaining IP rating</p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="glands-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Section 4: Crimps */}
          <section className="mb-10 pt-8 border-t border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Crimps and Best Practices
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Crimp Terminal Types</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Ring crimps:</strong> For bolted terminations, secure mechanical connection</li>
                  <li>• <strong>Spade crimps:</strong> For quick-connect terminals, easy disconnection</li>
                  <li>• <strong>Butt crimps:</strong> For joining conductors end-to-end</li>
                  <li>• <strong>Pin crimps:</strong> For insertion into plug and socket connectors</li>
                </ul>
                <p className="text-xs text-white/60 mt-3 p-2 bg-black/20 rounded">Tool requirement: Ratchet crimp tool matched to terminal size ensures proper compression</p>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h4 className="font-medium text-red-400 mb-2">Common Errors to Avoid</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>• Using wrong size accessory for conductor cross-sectional area</li>
                  <li>• Not fully inserting conductor before securing</li>
                  <li>• Over-tightening glands causing damage to insulation</li>
                  <li>• Using pliers instead of proper crimping tools</li>
                  <li>• Failing to earth metallic glands when required</li>
                  <li>• Reusing crimped terminals that have been previously deformed</li>
                </ul>
                <p className="text-xs text-white/60 mt-3 p-2 bg-black/20 rounded">Safety note: Poor terminations are a leading cause of electrical fires and system failures</p>
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
                A machinery installation used flexible cables without ferrules in vibration-heavy conditions. Over time, loose strands worked free from terminals, causing overheating and intermittent tripping.
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                The loose connections created high resistance points, leading to voltage drop and equipment malfunction. Refitting with correctly sized ferrules solved the problem and extended the system's service life significantly.
              </p>
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                <p className="text-green-400 text-sm">
                  <strong>Lesson learned:</strong> Quality termination techniques prevent expensive failures. The rework cost significantly more than doing it correctly initially.
                </p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <h3 className="font-medium text-white mb-2">Summary</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Ferrules, sleeving, glands, and crimps are not optional extras — they are key components in safe and professional electrical installations. Correct sizing, proper tools, and compliance with BS 7671 ensure secure, long-lasting connections.
            </p>
          </div>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Test your knowledge of ferrules, sleeving, glands, and crimps" />

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Terminating Cables
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-5">
                Next: Dressing Cables
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section5_4;
