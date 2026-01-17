import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "trunking-function",
    question: "What's a primary function of cable trunking in installations?",
    options: ["Increase cable current capacity", "Provide mechanical protection, organisation, and aesthetic appearance", "Reduce installation costs only", "Improve cable insulation properties"],
    correctIndex: 1,
    explanation: "Cable trunking serves multiple functions: mechanical protection against damage, organised cable management, aesthetic appearance, and ease of maintenance access."
  },
  {
    id: "high-impact-material",
    question: "Which material is most suitable for high-impact environments?",
    options: ["PVC trunking", "Aluminium conduit", "Steel trunking or conduit", "Plastic cable trays"],
    correctIndex: 2,
    explanation: "Steel trunking or conduit provides the highest impact resistance and mechanical protection, making it ideal for industrial environments with heavy machinery or high-impact risks."
  },
  {
    id: "metal-earthing",
    question: "Why must metal containment systems be earthed?",
    options: ["To improve cable performance", "To prevent electric shock if containment becomes live due to fault", "To reduce EMI only", "To comply with aesthetic requirements"],
    correctIndex: 1,
    explanation: "Metal containment must be earthed to prevent electric shock hazards if the containment becomes live due to cable insulation failure or fault conditions."
  }
];

const faqs = [
  {
    question: "How often should containment be supported?",
    answer: "Support intervals depend on type and load: light trunking 1-1.5m, heavy trunking 0.75-1m, cable trays 1.5-2m, conduit 1-1.5m. Always follow manufacturer specifications."
  },
  {
    question: "When is fire-rated containment required?",
    answer: "Fire-rated containment is required for safety-critical circuits including fire alarms, emergency lighting, smoke control systems, and escape route circuits to maintain operation during fire conditions."
  },
  {
    question: "What's the difference between cable tray and cable ladder?",
    answer: "Cable trays have a solid or perforated base for supporting cables. Cable ladders have rungs like a ladder, providing better ventilation and are suited for heavier cable loads in plant rooms."
  },
  {
    question: "How do I maintain earth continuity across containment joints?",
    answer: "Use bonding straps, earth continuity conductors, or ensure mechanical connections provide reliable electrical continuity. Test continuity and document results."
  }
];

const quizQuestion = {
  question: "When is fire-rated containment necessary?",
  options: [
    "In all electrical installations",
    "Only in domestic properties",
    "For safety circuits, escape routes, and fire-fighting systems where circuit integrity must be maintained during fire",
    "Only in outdoor installations"
  ],
  correctAnswer: 2,
  explanation: "Fire-rated containment is required for safety-critical circuits including fire alarms, emergency lighting, smoke control systems, and escape route lighting to maintain operation during fire conditions."
};

const BS7671Module5Section3 = () => {
  useSEO({
    title: "Containment Systems and Mechanical Protection | BS7671 Module 5.3",
    description: "Learn about cable containment systems, mechanical protection requirements, and fixing methods for BS 7671 compliant installations."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Containment Systems and Mechanical Protection
          </h1>
          <p className="text-white/80">
            Physical Protection and Organisation for Cables
          </p>
        </header>

        {/* Quick Summary */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Types:</strong> Trunking, conduit, trays, baskets, ducting</li>
              <li><strong>Purpose:</strong> Protection, organisation, aesthetics</li>
              <li><strong>Metal:</strong> Must be earthed for safety</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Wall-mounted trunking, ceiling trays, conduit runs</li>
              <li><strong>Use:</strong> Match containment to environment</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the role of containment in protecting cables",
              "Identify different containment types and applications",
              "Select appropriate containment for specific environments",
              "Apply BS 7671 requirements for mechanical protection"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Purpose of Containment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Purpose of Containment Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Containment systems serve multiple critical functions: organisation, safety, mechanical protection, and aesthetics, while facilitating maintenance and future modifications.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Primary Functions</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Protection:</strong> Impact, crushing, abrasion</li>
                  <li><strong>Organisation:</strong> Systematic routing, identification</li>
                  <li><strong>Segregation:</strong> Different circuit types separated</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Secondary Benefits</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Safety:</strong> Reduced accidental contact</li>
                  <li><strong>Fire:</strong> Barrier and compartmentalisation</li>
                  <li><strong>Aesthetics:</strong> Neat, professional appearance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Types of Containment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Types of Containment Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different containment types suit specific applications, environments, and installation requirements. Selection depends on protection level, accessibility, and environmental conditions.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Enclosed Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Trunking:</strong> Rectangular channels, easy access via lids</li>
                  <li><strong>Conduit:</strong> Circular tubes, excellent protection</li>
                  <li><strong>Ducting:</strong> Underground/floor systems</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Open Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Cable Trays:</strong> Open mesh, good ventilation</li>
                  <li><strong>Cable Ladders:</strong> Rung design, heavy loads</li>
                  <li><strong>Baskets:</strong> Wire mesh, ceiling installations</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">PVC Trunking</p>
                <p className="text-white/90 text-xs">Offices, commercial</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Steel Conduit</p>
                <p className="text-white/90 text-xs">Industrial, high-impact</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Cable Tray</p>
                <p className="text-white/90 text-xs">Plant rooms, data centres</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Mechanical Protection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Mechanical Protection Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Mechanical protection prevents crush, impact, and abrasion damage throughout the cable's operational life. Requirements vary based on installation location and environmental conditions.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-red-400/80 mb-2">Impact Protection</p>
                <ul className="text-xs space-y-1">
                  <li>Industrial areas</li>
                  <li>Vehicle areas</li>
                  <li>Below 2.5m height</li>
                  <li>Steel containment</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Crush Protection</p>
                <ul className="text-xs space-y-1">
                  <li>Under-floor installations</li>
                  <li>Roadway crossings</li>
                  <li>Heavy machinery areas</li>
                  <li>Reinforced ducting</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-green-400/80 mb-2">Abrasion Protection</p>
                <ul className="text-xs space-y-1">
                  <li>Movement/vibration</li>
                  <li>Rough surfaces</li>
                  <li>Thermal cycling</li>
                  <li>Smooth containment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Fixing and Earthing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Fixing Methods and Earthing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper fixing methods ensure containment remains secure throughout its operational life. Metal systems require earthing for safety compliance.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Support Intervals</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Light trunking:</strong> 1.0-1.5m</li>
                  <li><strong>Heavy trunking:</strong> 0.75-1.0m</li>
                  <li><strong>Cable trays:</strong> 1.5-2.0m</li>
                  <li><strong>Conduit:</strong> 1.0-1.5m depending on size</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Earthing Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>All metallic containment must be earthed</li>
                  <li>Continuous earth path required</li>
                  <li>Bonding straps across joints</li>
                  <li>Connection to main earthing terminal</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Environmental and Fire-Rated */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Environmental and Fire-Rated Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Containment must withstand environmental challenges including moisture, chemicals, UV radiation, and vibration. Fire-rated systems ensure circuit integrity during emergencies.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Selection</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Indoor dry:</strong> Standard PVC trunking</li>
                  <li><strong>Indoor wet:</strong> Sealed PVC, stainless steel</li>
                  <li><strong>Outdoor:</strong> UV-stabilised, galvanised steel</li>
                  <li><strong>Industrial:</strong> Heavy-duty, chemical-resistant</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Fire-Rated Applications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Fire alarm and detection systems</li>
                  <li>Emergency lighting circuits</li>
                  <li>Smoke control and ventilation</li>
                  <li>Critical safety systems</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Real World Scenario */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Real World Scenario
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Factory Production Area Installation</p>
              <p className="text-sm mb-3">
                Running power cables across a busy production area with overhead cranes and vehicle traffic.
              </p>
              <p className="text-sm mb-2">
                <strong>Environment:</strong> High-impact industrial area with potential chemical exposure from production processes.
              </p>
              <p className="text-sm mb-2">
                <strong>Solution:</strong> Heavy-duty galvanised steel trunking (3mm wall), mounted 3m high on structural columns with supports every 1m.
              </p>
              <p className="text-sm">
                <strong>Installation:</strong> Cables clipped at 300mm intervals, trunking earthed via 4mm² earth continuity conductor, joints bonded with copper straps.
              </p>
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

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Containment Types</p>
              <ul className="space-y-0.5">
                <li>Trunking: Offices, commercial</li>
                <li>Conduit: Industrial, high-impact</li>
                <li>Cable Tray: Plant rooms</li>
                <li>Basket: Ceiling installations</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Support Intervals</p>
              <ul className="space-y-0.5">
                <li>Light trunking: 1-1.5m</li>
                <li>Heavy trunking: 0.75-1m</li>
                <li>Cable trays: 1.5-2m</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <section className="mb-10">
          <SingleQuestionQuiz
            question={quizQuestion.question}
            options={quizQuestion.options}
            correctAnswer={quizQuestion.correctAnswer}
            explanation={quizQuestion.explanation}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-5-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-5-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module5Section3;
