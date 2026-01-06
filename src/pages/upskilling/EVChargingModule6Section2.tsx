import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "evcharging-m6s2-check1",
    question: "What is the minimum burial depth for SWA cables under a driveway?",
    options: ["300mm", "450mm", "600mm", "750mm"],
    correctIndex: 2,
    explanation: "SWA cables should be buried at a minimum depth of 600mm (750mm under driveways is often recommended). Warning tape should be installed 150mm above the cable."
  },
  {
    id: "evcharging-m6s2-check2",
    question: "What is the maximum voltage drop allowed for EV charging circuits?",
    options: ["3%", "4%", "5%", "6%"],
    correctIndex: 2,
    explanation: "BS 7671 allows a maximum 5% voltage drop from the origin of the installation. For a 230V supply, this is 11.5V maximum."
  },
  {
    id: "evcharging-m6s2-check3",
    question: "What torque setting is typically required for a 6mm² conductor in a terminal block?",
    options: ["1.2 Nm", "2.5 Nm", "4.0 Nm", "6.0 Nm"],
    correctIndex: 1,
    explanation: "6mm² conductors typically require 2.5 Nm torque in standard terminal blocks. Always verify with the manufacturer's specifications."
  }
];

const faqs = [
  {
    question: "What happens if my voltage drop calculation exceeds 5%?",
    answer: "Increase cable size to reduce voltage drop. Consider splitting long runs with intermediate distribution points. For existing installations, check actual voltage under load - calculations include safety margins."
  },
  {
    question: "Can I use standard Twin & Earth cable for EV charging outdoors?",
    answer: "No, Twin & Earth lacks mechanical protection for outdoor use. Use SWA cable with appropriate environmental rating. Indoor routing of T&E is acceptable with proper protection."
  },
  {
    question: "How do I connect the SWA armour to earth?",
    answer: "Use a CW (Cable Wire) gland with integral earth connection, or connect armour to a separate earth terminal. Ensure continuity throughout the cable run and test resistance."
  },
  {
    question: "What's the maximum length for an EV charging circuit?",
    answer: "No specific limit, but voltage drop constrains practical length. Typically 50-80m for 6mm² cable depending on load. Consider sub-distribution for longer runs."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A 22kW three-phase EV charger requires a 40m cable run in underground ducting. Which cable selection is most appropriate?",
  options: [
    "6mm² 4-core Twin & Earth in conduit",
    "10mm² 4-core SWA with CW glands",
    "4mm² flexible cable in trunking",
    "16mm² single-core cables in separate ducts"
  ],
  correctAnswer: 1,
  explanation: "10mm² 4-core SWA provides adequate current capacity (57A > 32A per phase), mechanical protection for underground installation, and proper earth continuity via the steel wire armour."
  }
];

const EVChargingModule6Section2 = () => {
  useSEO({
    title: "Cable Termination and Routing | EV Charging Module 6.2",
    description: "Master professional cable termination and routing practices for EV charging installations, including voltage drop calculations and BS 7671 compliance."
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
            <Link to="../ev-charging-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 6
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cable Termination and Routing
          </h1>
          <p className="text-white/80">
            Professional cable practices for reliable EV installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Cable:</strong> SWA for external, LSF for commercial</li>
              <li><strong>Voltage drop:</strong> Maximum 5% (11.5V at 230V)</li>
              <li><strong>Burial depth:</strong> Minimum 600mm underground</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> CW glands, cable cleats, route markers</li>
              <li><strong>Use:</strong> Torque wrench, cable calculator, warning tape</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select appropriate cables for EV applications",
              "Calculate voltage drop and derating factors",
              "Implement proper routing and protection",
              "Execute professional termination techniques",
              "Apply correct torque settings",
              "Comply with BS 7671 cable requirements"
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
            Cable Selection and Sizing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct cable selection ensures safe current carrying capacity, appropriate
              mechanical protection, and compliance with voltage drop requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Types</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>6242Y T&E:</strong> Internal dry locations only</li>
                  <li><strong>SWA:</strong> Underground/external installation</li>
                  <li><strong>LSF:</strong> Commercial buildings, escape routes</li>
                  <li><strong>FP200:</strong> Fire survival circuits</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Derating Factors</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Ca (temp):</strong> 0.87 at 40°C ambient</li>
                  <li><strong>Cg (grouping):</strong> 0.80 for 2 circuits</li>
                  <li><strong>Ci (insulation):</strong> 0.78 if surrounded</li>
                  <li><strong>Overall:</strong> Multiply all factors</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Cable Sizes for EV Charging:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>3.7kW (16A single phase):</strong> 2.5mm² minimum</li>
                <li><strong>7.4kW (32A single phase):</strong> 6mm² typical</li>
                <li><strong>22kW (32A three phase):</strong> 6-10mm² depending on length</li>
                <li><strong>Multiple chargers:</strong> 10-16mm² sub-mains</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Voltage Drop Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Voltage drop must not exceed 5% (11.5V at 230V) from the origin of the
              installation to ensure proper charger operation and efficiency.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calculation Method</p>
                <ul className="text-sm text-white space-y-1">
                  <li>VD = mV/A/m × Current × Length / 1000</li>
                  <li>6mm² cable: 7.3 mV/A/m</li>
                  <li>10mm² cable: 4.4 mV/A/m</li>
                  <li>Three-phase: multiply by √3</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example Calculation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>32A charger, 40m run, 6mm² cable</li>
                  <li>VD = 7.3 × 32 × 40 / 1000</li>
                  <li>VD = 9.3V (4.0%)</li>
                  <li>Result: Within 5% limit</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">6mm²</p>
                <p className="text-white/90 text-xs">7.3 mV/A/m</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">10mm²</p>
                <p className="text-white/90 text-xs">4.4 mV/A/m</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">16mm²</p>
                <p className="text-white/90 text-xs">2.8 mV/A/m</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Termination and Routing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professional termination and proper routing ensure long-term reliability
              and maintainability of the EV charging installation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">SWA Termination Steps</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>1.</strong> Strip outer sheath correctly</li>
                  <li><strong>2.</strong> Select correct CW gland size</li>
                  <li><strong>3.</strong> Ensure armour contacts compression ring</li>
                  <li><strong>4.</strong> Apply correct torque to terminals</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Underground Routing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Minimum 600mm burial depth</li>
                  <li>Warning tape 150mm above cable</li>
                  <li>Sand bedding for protection</li>
                  <li>Concrete slab under driveways</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Torque Settings Reference:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>2.5mm²:</strong> 1.2 Nm typical</li>
                <li><strong>6mm²:</strong> 2.5 Nm typical</li>
                <li><strong>10mm²:</strong> 4.0 Nm typical</li>
                <li>Always verify with equipment specifications</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Installation Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Clean, straight cuts on all conductors</li>
                <li>No nicked or damaged copper strands</li>
                <li>Correct strip length (no exposed copper)</li>
                <li>Torque wrench used on all terminations</li>
                <li>Earth continuity verified and recorded</li>
                <li>Cable identification labels applied</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Faults to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Loose terminations:</strong> — cause overheating and failure</li>
                <li><strong>Incorrect gland size:</strong> — compromises IP rating</li>
                <li><strong>Minimum bend radius:</strong> — damages cable insulation</li>
                <li><strong>No warning tape:</strong> — future excavation risk</li>
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
              <p className="font-medium text-white mb-1">Cable Support Intervals</p>
              <ul className="space-y-0.5">
                <li>PVC: 300mm horizontal</li>
                <li>SWA: 600mm horizontal</li>
                <li>Additional at terminations</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Bending Radius</p>
              <ul className="space-y-0.5">
                <li>Single-core: 12× diameter</li>
                <li>Multi-core: 6× diameter</li>
                <li>SWA: 12× overall diameter</li>
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
            <Link to="../ev-charging-module-6-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ev-charging-module-6-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EVChargingModule6Section2;