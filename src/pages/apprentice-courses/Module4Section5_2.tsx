import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Installing Lighting Points and Pendants - Module 4.5.2 | Level 2 Electrical Course";
const DESCRIPTION = "Master the installation of lighting points and pendants with correct positioning, secure mounting, safe wiring, and compliance with BS 7671. Learn planning, fixing methods, and testing procedures.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the main purpose of a cord grip on a pendant fitting?",
    options: ["To improve appearance", "To prevent cable strain on terminals", "To reduce electrical resistance"],
    correctIndex: 1,
    explanation: "Cord grips prevent mechanical strain being transferred to electrical terminals, maintaining safe connections and preventing conductor pull-out."
  },
  {
    id: 2,
    question: "Why should pendant heights be at least 2m above floor level in walkways?",
    options: ["For better lighting", "To prevent head contact and ensure safety", "To save energy"],
    correctIndex: 1,
    explanation: "Minimum 2m clearance prevents people from hitting their heads on pendants in circulation areas, ensuring safe passage."
  },
  {
    id: 3,
    question: "In which BS 7671 section are bathroom lighting requirements detailed?",
    options: ["Section 411", "Section 522", "Section 701"],
    correctIndex: 2,
    explanation: "BS 7671 Section 701 covers special installations in locations containing a bath or shower, including lighting requirements and IP ratings."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the role of a ceiling rose in domestic lighting installations?",
    options: ["To supply extra circuit protection", "To provide mechanical support and connection points", "To reduce voltage to the fitting", "To act as a junction for power tools"],
    correctAnswer: 1,
    explanation: "Ceiling roses provide both mechanical support for light fittings and electrical connection points, distributing the load safely to the ceiling structure."
  },
  {
    id: 2,
    question: "True or False: The weight of a pendant fitting should be supported entirely by the electrical cable.",
    options: ["True", "False", "Only for lightweight fittings", "Only if using SWA cable"],
    correctAnswer: 1,
    explanation: "False – mechanical support must be provided separately from the electrical cable to prevent strain on connections and ensure safety."
  },
  {
    id: 3,
    question: "Name two environments where enclosed light fittings are typically required.",
    options: ["Bathrooms and dusty workshops", "Living rooms and bedrooms", "Offices and corridors", "Gardens and patios"],
    correctAnswer: 0,
    explanation: "Bathrooms, dusty workshops, and damp industrial areas require enclosed fittings with appropriate IP ratings for protection."
  },
  {
    id: 4,
    question: "What colour is the live conductor in modern UK lighting circuits?",
    options: ["Blue", "Brown", "Green/yellow", "Black"],
    correctAnswer: 1,
    explanation: "Brown is the live conductor colour in modern UK wiring according to BS 7671 harmonised colours."
  },
  {
    id: 5,
    question: "Which BS 7671 section applies to bathroom lighting installations?",
    options: ["Section 411", "Section 522", "Section 701", "Section 415"],
    correctAnswer: 2,
    explanation: "Section 701 covers special installations in locations containing a bath or shower, including specific lighting requirements."
  },
  {
    id: 6,
    question: "What device prevents the cable from pulling out of a pendant fitting?",
    options: ["Terminal block", "Cord grip or strain relief device", "Junction box", "Circuit breaker"],
    correctAnswer: 1,
    explanation: "Cord grips or strain relief devices prevent mechanical stress from being transferred to electrical connections."
  },
  {
    id: 7,
    question: "Why should pendant lighting be installed at least 2m above floor level in walkways?",
    options: ["To improve light distribution", "To prevent head contact and ensure safe clearance", "To save energy", "To comply with fire regulations"],
    correctAnswer: 1,
    explanation: "Minimum 2m clearance prevents people from hitting their heads on pendants, ensuring safe passage in circulation areas."
  },
  {
    id: 8,
    question: "Give one method for ensuring a pendant hangs centrally over a dining table.",
    options: ["Estimate by eye", "Use a plumb line or laser pointer to check alignment", "Measure from the walls only", "Install without checking"],
    correctAnswer: 1,
    explanation: "Using a plumb line or laser pointer ensures accurate central positioning over furniture for both function and aesthetics."
  }
];

const Module4Section5_2 = () => {
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
              <span className="text-white/60">Section 5.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Installing Lighting Points and Pendants
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master the installation of lighting points and pendants, combining functional wiring, safe support, and aesthetic placement according to BS 7671.
            </p>
          </header>

          {/* Quick Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="text-white/80 text-sm leading-relaxed">
              <strong className="text-elec-yellow">Key points:</strong> Position lighting points for even illumination. Use appropriate fixings for ceiling construction and fitting weight. Provide mechanical support separate from electrical connections.
            </p>
          </div>

          {/* Section 1: Planning Location */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Planning Location and Environmental Requirements
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Effective lighting design requires careful planning of position, coverage, and environmental suitability.</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Positioning for Optimal Illumination</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Room lighting:</strong> Centre points provide even distribution unless furniture dictates otherwise</li>
                  <li>• <strong>Task lighting:</strong> Position directly over work surfaces for shadow-free lighting</li>
                  <li>• <strong>Safety clearances:</strong> Minimum 2.0m above floor level in circulation areas</li>
                  <li>• Commercial spaces: 2.2m minimum clearance</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Ceiling Structure and Load Assessment</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Solid concrete:</strong> Direct fixing with suitable anchors and plugs</li>
                  <li>• <strong>Suspended plasterboard:</strong> Locate joists for structural fixings</li>
                  <li>• <strong>Weight limitations:</strong> Standard plasterboard: maximum 5kg per fixing point</li>
                  <li>• Heavy fittings require ceiling hooks or beam attachment</li>
                </ul>
                <p className="text-xs text-white/60 mt-3 p-2 bg-black/20 rounded">Safety requirement: Never rely solely on plasterboard for heavy lighting fixtures</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Environmental and IP Rating Requirements</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Bathroom zones:</strong> IP44 minimum (IP65 in shower areas)</li>
                  <li>• <strong>Kitchen areas:</strong> IP44 recommended near sinks</li>
                  <li>• <strong>External covered:</strong> IP54 minimum for weather protection</li>
                  <li>• <strong>Industrial/workshop:</strong> IP65 for dust and moisture protection</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="planning-location-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Section 2: Lighting Point Types */}
          <section className="mb-10 pt-8 border-t border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Types of Lighting Points and Selection
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Selecting appropriate lighting points and fittings ensures optimal performance, safety, and compliance.</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Ceiling Rose Systems</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Standard ceiling rose:</strong> Most common in domestic, provides connection and strain relief</li>
                  <li>• 5A terminal blocks for lighting circuits</li>
                  <li>• Integral cord grip for pendant support</li>
                  <li>• Heat-resistant construction suitable for lamp heat</li>
                </ul>
                <p className="text-xs text-white/60 mt-3 p-2 bg-black/20 rounded">Installation note: Ceiling roses must be securely fixed to ceiling structure, not just plasterboard</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Pendant Fitting Classifications</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Lightweight:</strong> Up to 2kg, suitable for standard ceiling rose mounting</li>
                  <li>• <strong>Medium weight:</strong> 2-5kg, requires secure ceiling fixing and strain relief</li>
                  <li>• <strong>Heavy duty:</strong> Over 5kg, needs structural support independent of electrical connection</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="lighting-types-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Section 3: Wiring and Installation */}
          <section className="mb-10 pt-8 border-t border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Wiring and Installation Procedures
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>Systematic wiring and installation procedures ensure safety, compliance, and reliable operation.</p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Loop-in Ceiling Rose Wiring</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Permanent live:</strong> Brown conductor from supply to rose and onward</li>
                  <li>• <strong>Switched live:</strong> Brown return from switch to light fitting</li>
                  <li>• <strong>Neutral:</strong> Blue conductor linking through all points</li>
                  <li>• <strong>CPC:</strong> Green/yellow earthing all metalwork</li>
                </ul>
                <p className="text-xs text-white/60 mt-3 p-2 bg-black/20 rounded">Critical check: Verify switching operates correct lighting point before commissioning</p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Pendant Connection and Strain Relief</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Flexible cord:</strong> 3-core 0.75mm² minimum for standard pendants</li>
                  <li>• <strong>Heat-resistant cable:</strong> Required for high-temperature lamp environments</li>
                  <li>• <strong>Cord grip:</strong> Position to clamp outer sheath, not individual conductors</li>
                </ul>
                <p className="text-xs text-white/60 mt-3 p-2 bg-black/20 rounded">Safety principle: Electrical connections must never carry mechanical loads</p>
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
              Testing and Safety Compliance
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Electrical Testing Requirements</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Continuity of protective conductors: verify earth path integrity</li>
                  <li>• Insulation resistance: minimum 1MΩ at 500V DC between conductors</li>
                  <li>• Polarity verification: ensure correct conductor identification</li>
                  <li>• Switch operation verification in all positions</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Bathroom Compliance (Section 701)</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Zone 0: No electrical fittings permitted</li>
                  <li>• Zone 1: IP65, low voltage only (SELV)</li>
                  <li>• Zone 2: IP44 minimum, suitable for bathroom use</li>
                  <li>• Supplementary bonding where required for safety</li>
                </ul>
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
                In a restaurant installation, decorative pendants were fitted without additional ceiling supports. The cable alone carried the load, which over time caused the conductors to pull loose from terminals, leading to flickering lights and a safety risk.
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                Investigation revealed the pendants weighed 3.5kg each, exceeding ceiling rose support capacity. Constant movement from air conditioning caused gradual loosening of electrical connections.
              </p>
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                <p className="text-green-400 text-sm">
                  <strong>Lesson learned:</strong> The restaurant closed for three days while all pendants were reinstalled with independent ceiling hooks. Always assess fitting weight against ceiling capacity and provide mechanical support separate from electrical connections.
                </p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <h3 className="font-medium text-white mb-2">Summary</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Installing lighting points and pendants requires both technical skill and an eye for presentation. Correct positioning for optimal illumination, secure fixing with appropriate mechanical support, safe wiring according to BS 7671, and compliance with environmental regulations ensure installations are safe, functional, and visually pleasing.
            </p>
          </div>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Test your knowledge of installing lighting points and pendants" />

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Mounting Socket Outlets
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../5-3">
                Next: Terminating Cables
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section5_2;
