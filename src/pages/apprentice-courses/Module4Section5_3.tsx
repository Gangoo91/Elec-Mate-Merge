import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Terminating Twin & Earth, Singles, and Flex - Module 4.5.3 | Level 2 Electrical Course";
const DESCRIPTION = "Master safe cable termination techniques for Twin & Earth, single-core, and flexible cables. Learn preparation, stripping, dressing, and testing procedures according to BS 7671.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "Why must the CPC in T&E be sleeved before termination?",
    options: ["For appearance", "For identification and safety requirements", "To reduce resistance"],
    correctIndex: 1,
    explanation: "BS 7671 requires the CPC to be clearly identified with green/yellow sleeving to prevent confusion and ensure safety during maintenance."
  },
  {
    id: 2,
    question: "What is the main purpose of a ferrule on a flexible conductor?",
    options: ["To improve appearance", "To prevent fine strands from spreading", "To increase conductivity"],
    correctIndex: 1,
    explanation: "Ferrules prevent fine strands from spreading when inserted into terminals, ensuring reliable connection and preventing loose strands."
  },
  {
    id: 3,
    question: "What test confirms that a conductor is firmly secured in a terminal?",
    options: ["Visual inspection", "Tug test", "Continuity test"],
    correctIndex: 1,
    explanation: "A gentle tug test verifies mechanical security of the connection, ensuring the conductor cannot be pulled out of the terminal."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does the 'Earth' in Twin & Earth refer to?",
    options: ["The earth clamp", "The CPC conductor", "The outer sheath", "A grounding rod"],
    correctAnswer: 1,
    explanation: "The 'Earth' refers to the Circuit Protective Conductor (CPC) that provides the earth connection for safety."
  },
  {
    id: 2,
    question: "True or False: The CPC in T&E can be left unsleeved if it is clearly identifiable.",
    options: ["True", "False", "Only in domestic installations", "Only if marked with tape"],
    correctAnswer: 1,
    explanation: "False – BS 7671 requires the CPC to be sleeved with green/yellow identification regardless of how identifiable it appears."
  },
  {
    id: 3,
    question: "What accessory prevents fine strands of a flexible conductor from spreading?",
    options: ["Cable tie", "Ferrule", "Gland", "Crimp"],
    correctAnswer: 1,
    explanation: "Ferrules are fitted to the ends of stranded conductors to keep the strands together and ensure reliable termination."
  },
  {
    id: 4,
    question: "What is the recommended way to check if a conductor is securely connected?",
    options: ["Visual inspection only", "Tug test", "Continuity test only", "Resistance measurement"],
    correctAnswer: 1,
    explanation: "A gentle tug test confirms mechanical security, ensuring the conductor is properly gripped by the terminal."
  },
  {
    id: 5,
    question: "Which BS standard covers requirements for secure and safe terminations?",
    options: ["BS 5839", "BS 7671", "BS EN 50172", "BS 5266"],
    correctAnswer: 1,
    explanation: "BS 7671 (IET Wiring Regulations) specifies requirements for electrical terminations to ensure safety and reliability."
  },
  {
    id: 6,
    question: "Why should insulation be just inside the terminal?",
    options: ["To improve appearance", "To ensure good electrical contact without exposed copper", "To reduce heat generation", "To comply with colour coding"],
    correctAnswer: 1,
    explanation: "Insulation just inside the terminal ensures full electrical contact while preventing exposed copper that could cause short circuits."
  },
  {
    id: 7,
    question: "Give one reason for using IP-rated glands on terminations.",
    options: ["To improve cable appearance", "To protect against moisture ingress and maintain IP rating", "To reduce installation time", "To increase conductor capacity"],
    correctAnswer: 1,
    explanation: "IP-rated glands protect against moisture ingress, maintaining the enclosure's environmental protection rating."
  },
  {
    id: 8,
    question: "Name one common error to avoid when terminating cables.",
    options: ["Using the correct ferrule size", "Over-tightening terminals, damaging the conductor", "Following manufacturer instructions", "Testing connections properly"],
    correctAnswer: 1,
    explanation: "Over-tightening can damage conductors and terminals, leading to poor connections and potential failure."
  }
];

const Module4Section5_3 = () => {
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
              <span className="text-white/60">Section 5.3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Terminating Twin & Earth, Singles, and Flex
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master safe cable termination techniques for reliable connections and compliance with BS 7671.
            </p>
          </header>

          {/* Quick Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="text-white/80 text-sm leading-relaxed">
              <strong className="text-elec-yellow">Key points:</strong> Proper cable termination prevents loose connections and electrical faults. Different cable types require specific preparation and termination techniques. Poor terminations are a leading cause of electrical failures and fire hazards.
            </p>
          </div>

          {/* Section 1: Cable Types */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Understanding Cable Types and Applications
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Different cable types require specific termination techniques to ensure safety, reliability, and compliance.</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Twin & Earth (T&E) Cable Construction</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Primary applications:</strong> Fixed wiring in domestic and commercial installations</li>
                  <li>• Two insulated conductors: Live (brown) and Neutral (blue)</li>
                  <li>• Bare CPC (Circuit Protective Conductor) for earthing</li>
                  <li>• Common sizes: 1.0mm², 1.5mm², 2.5mm², 4.0mm², 6.0mm², 10.0mm²</li>
                </ul>
                <p className="text-xs text-white/60 mt-3 p-2 bg-black/20 rounded">Critical requirement: CPC must always be sleeved green/yellow before termination</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Single-Core Cable Systems</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Applications:</strong> Conduit and trunking installations</li>
                  <li>• Individual colour identification for each conductor function</li>
                  <li>• Easier pulling through conduit and complex routes</li>
                  <li>• Better heat dissipation in trunking systems</li>
                </ul>
                <p className="text-xs text-white/60 mt-3 p-2 bg-black/20 rounded">Installation requirement: Must be installed in appropriate containment for mechanical protection</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Flexible Cables (Flex)</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Construction:</strong> Stranded copper conductors for flexibility and movement</li>
                  <li>• Portable appliances, lighting pendants, industrial equipment</li>
                  <li>• Class 5 stranding for maximum flexibility</li>
                  <li>• Heat-resistant and oil-resistant variants available</li>
                </ul>
                <p className="text-xs text-white/60 mt-3 p-2 bg-black/20 rounded">Termination rule: Always use ferrules or twist strands to prevent spreading in terminals</p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="cable-types-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Section 2: Cable Preparation */}
          <section className="mb-10 pt-8 border-t border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Cable Preparation and Stripping Techniques
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Proper preparation is essential for reliable terminations and prevents damage to conductors.</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Measuring and Cutting Procedures</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Allow sufficient slack: minimum 150mm at accessories</li>
                  <li>• Account for cable entry point to terminal distance</li>
                  <li>• Plan for proper cable dressing within enclosures</li>
                  <li>• Sharp cable cutters for clean cuts without crushing</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Stripping Procedures for T&E</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Score sheath lightly with knife, avoiding inner insulation</li>
                  <li>• Strip 25-30mm of outer sheath for standard accessories</li>
                  <li>• Remove inner insulation: 12-15mm for most terminals</li>
                  <li>• Apply green/yellow sleeving to CPC before connection</li>
                </ul>
                <p className="text-xs text-white/60 mt-3 p-2 bg-black/20 rounded">Quality check: Inspect stripped conductors for nicks or damaged strands before terminating</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Flexible Cable Preparation</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Strip outer sheath without cutting into inner insulation</li>
                  <li>• Twist individual conductor strands together tightly</li>
                  <li>• Apply ferrules to prevent strand separation in terminals</li>
                  <li>• Ensure cord grip will secure the sheath, not individual conductors</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="cable-preparation-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Section 3: Termination Techniques */}
          <section className="mb-10 pt-8 border-t border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Termination Techniques and Best Practices
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Professional termination techniques ensure electrical and mechanical integrity for safe, reliable operation.</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Twin & Earth Termination</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Live (brown):</strong> Connect to L terminal, ensure full insertion</li>
                  <li>• <strong>Neutral (blue):</strong> Connect to N terminal with secure tightening</li>
                  <li>• <strong>CPC (green/yellow sleeved):</strong> Connect to earth terminal</li>
                  <li>• Verify no bare copper visible outside terminals</li>
                </ul>
                <p className="text-xs text-white/60 mt-3 p-2 bg-black/20 rounded">Critical check: Insulation should be just inside terminal with no exposed copper</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Terminal Tightening Specifications</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Use manufacturer's specified torque settings where provided</li>
                  <li>• Tighten firmly but avoid over-tightening which damages conductors</li>
                  <li>• Check adjacent terminals haven't loosened during tightening</li>
                  <li>• Perform gentle tug test to verify mechanical security</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Flexible Cable with Ferrules</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Select correct ferrule size for conductor cross-section</li>
                  <li>• Insert twisted strands fully into ferrule sleeve</li>
                  <li>• Crimp using appropriate tool to manufacturer specification</li>
                  <li>• Verify all strands are secured and none protruding</li>
                </ul>
                <p className="text-xs text-white/60 mt-3 p-2 bg-black/20 rounded">Safety principle: Strain relief must support cable mechanically, not electrically</p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="termination-techniques-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Section 4: Testing */}
          <section className="mb-10 pt-8 border-t border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Testing and Quality Assurance
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Mechanical Security Testing</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Apply gentle pulling force to each conductor at termination</li>
                  <li>• Conductor should not move or withdraw from terminal</li>
                  <li>• No bare copper visible outside terminals</li>
                  <li>• CPC correctly sleeved with green/yellow identification</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Electrical Verification</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Test CPC continuity end-to-end</li>
                  <li>• Verify low resistance path through all connections</li>
                  <li>• Confirm correct polarity at all termination points</li>
                  <li>• Check no cross-connections between different circuits</li>
                </ul>
                <p className="text-xs text-white/60 mt-3 p-2 bg-black/20 rounded">Critical safety check: Polarity errors can create dangerous conditions - verify before energising</p>
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
                On a commercial lighting installation, flex cables were terminated without ferrules. Over time, vibration caused the fine strands to loosen, leading to arcing, intermittent faults, and damage to the terminals.
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                Investigation revealed several pendant lights had developed high-resistance connections due to strand separation. This caused voltage drop, reduced light output, and heat generation that could have led to fire.
              </p>
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                <p className="text-green-400 text-sm">
                  <strong>Lesson learned:</strong> The rework took three days and cost significantly more than doing it correctly initially. Always use ferrules on stranded conductors and never rely on twisted strands alone.
                </p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <h3 className="font-medium text-white mb-2">Summary</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Correctly terminating Twin & Earth, single-core, and flexible cables is fundamental to electrical safety and reliability. Good terminations combine mechanical strength, electrical integrity, and compliance with BS 7671, ensuring safe operation for the lifetime of the installation.
            </p>
          </div>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Test your knowledge of terminating cables" />

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Installing Lighting Points
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-4">
                Next: Ferrules, Sleeving, Glands
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section5_3;
