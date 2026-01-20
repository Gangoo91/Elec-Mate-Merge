import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Wiring Methods & Protection - Fire Alarm Module 4 Section 4";
const DESCRIPTION = "Learn about cable routing, segregation, mechanical protection and fixings to prevent premature collapse per BS 5839-1 and BS 7671.";

const quickCheckQuestions = [
  {
    id: "segregation-purpose",
    question: "Segregation reduces:",
    options: [
      "Cable cost",
      "EMC interference and fault risk",
      "Colour choice",
      "Fire rating requirements"
    ],
    correctIndex: 1,
    explanation: "Segregation from LV power and other services helps avoid interference and faults."
  },
  {
    id: "fixings-requirement",
    question: "Fixings must:",
    options: [
      "Be plastic where hidden",
      "Resist premature collapse in fire conditions",
      "Be optional",
      "Use cable ties only"
    ],
    correctIndex: 1,
    explanation: "Use metal fixings/supports to prevent collapse (BS 7671 Reg 521.10.202)."
  },
  {
    id: "penetrations",
    question: "Penetrations should be:",
    options: [
      "Left open",
      "Sealed with appropriate fire-stopping systems",
      "Covered with tape",
      "Ignored"
    ],
    correctIndex: 1,
    explanation: "Maintain fire compartmentation; use approved sealing systems."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Segregation reduces:",
    options: ["Cable cost", "EMC interference and fault risk", "Colour choice", "Fire rating requirements"],
    correctAnswer: 1,
    explanation: "Segregation from LV power and other services helps avoid interference and faults."
  },
  {
    id: 2,
    question: "Fixings must:",
    options: ["Be plastic where hidden", "Resist premature collapse in fire conditions", "Be optional", "Use cable ties only"],
    correctAnswer: 1,
    explanation: "Use metal fixings/supports to prevent collapse (BS 7671 Reg 521.10.202)."
  },
  {
    id: 3,
    question: "Penetrations should be:",
    options: ["Left open", "Sealed with appropriate fire-stopping systems", "Covered with tape", "Ignored"],
    correctAnswer: 1,
    explanation: "Maintain fire compartmentation; use approved sealing systems."
  },
  {
    id: 4,
    question: "The minimum segregation distance between fire alarm cables and 230V power cables should be:",
    options: ["No separation needed", "As per manufacturer guidance, typically 300mm or use physical barrier", "Exactly 50mm always", "1 metre minimum"],
    correctAnswer: 1,
    explanation: "Follow manufacturer recommendations; typically 300mm separation or use screening/barriers to prevent EMC issues and reduce fault risk."
  },
  {
    id: 5,
    question: "Fire-resisting cable support spacing should typically not exceed:",
    options: ["No limit", "Manufacturer recommendations, commonly 300-400mm for horizontal runs", "1 metre", "2 metres"],
    correctAnswer: 1,
    explanation: "Close support spacing maintains cable position and prevents premature collapse in fire; follow manufacturer data sheets."
  },
  {
    id: 6,
    question: "Cables passing through fire compartment walls must:",
    options: ["Be left with gaps around them", "Be firestopped with tested systems maintaining compartmentation", "Use expanding foam only", "Be bundled tightly"],
    correctAnswer: 1,
    explanation: "Use proprietary firestopping systems tested to maintain the fire resistance rating of the compartment boundary."
  },
  {
    id: 7,
    question: "When installing cables in ceiling voids, consider:",
    options: ["Hiding them behind insulation", "Accessibility for testing/maintenance and protection from building trades", "Installing without support", "Using domestic cable"],
    correctAnswer: 1,
    explanation: "Plan routes for access, protect from damage by other trades, and maintain proper support and separation."
  },
  {
    id: 8,
    question: "Vertical cable runs should be supported to prevent:",
    options: ["The cable looking untidy", "Mechanical stress and cable sheath damage under its own weight", "People seeing them", "Improved performance"],
    correctAnswer: 1,
    explanation: "Adequate vertical support prevents cable weight causing sheath damage, core breakage or joint failure over time."
  },
  {
    id: 9,
    question: "Where crossing LV power, you should:",
    options: ["Tape together", "Cross at right angles and maintain separation", "Twist around each other", "Share the same conduit without separation"],
    correctAnswer: 1,
    explanation: "Reduce coupling and maintain segregation."
  },
  {
    id: 10,
    question: "Containment choice should consider:",
    options: ["Only colour", "Environment, fire performance and EMC", "Cheapest cost", "What is in stock"],
    correctAnswer: 1,
    explanation: "Select appropriate materials and construction."
  }
];

const faqs = [
  {
    question: "Can I use plastic clips under metal trunking lids?",
    answer: "No - plastic clips cannot be the sole support. Use metallic clips or ensure the trunking lid provides adequate support."
  },
  {
    question: "How far should fire alarm cables be from LV power?",
    answer: "Typically 300mm in free air, or use physical barriers/screening. Follow manufacturer guidance for specific requirements."
  },
  {
    question: "Do I need to seal small gaps around cables?",
    answer: "Yes - all penetrations through fire compartment boundaries must be sealed with appropriate firestopping systems."
  },
  {
    question: "What documentation is needed for firestopping?",
    answer: "Record location, materials used, fire rating and photograph before covering. Include in handover documentation."
  },
  {
    question: "Can I use cable ties for support?",
    answer: "Metallic cable ties can be acceptable as part of a support system, but check manufacturer guidance and fire rating requirements."
  },
  {
    question: "How do I coordinate with other trades?",
    answer: "Agree cable routes early, mark containment as fire alarm, and inspect before ceiling closure. Document any deviations."
  }
];

const FireAlarmModule4Section4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/fire-alarm-course/module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Wiring Methods & Protection
          </h1>
          <p className="text-white/80">
            Cable routing, segregation, fixings and fire compartment penetrations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Segregation:</strong> 300mm from LV power or use barrier</li>
              <li><strong>Fixings:</strong> Metallic, not plastic alone (Reg 521.10.202)</li>
              <li><strong>Penetrations:</strong> Firestop all compartment boundaries</li>
              <li><strong>Spacing:</strong> 300-400mm typical horizontal support</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Plastic clips on escape routes = non-compliant</li>
              <li><strong>Use:</strong> Cross power cables at right angles</li>
              <li><strong>Apply:</strong> Photograph firestopping before covering</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply correct segregation distances from power cables and other services",
              "Select appropriate fixings and supports for fire alarm cables",
              "Maintain fire compartmentation with correct penetration sealing",
              "Route cables for accessibility and protection from damage",
              "Coordinate with BS 7671 requirements for wiring systems",
              "Document and photograph installation for handover records"
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

        {/* Section 01: Segregation Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Segregation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fire alarm cables must be segregated from power cables to prevent electromagnetic interference (EMC) and reduce fault risk.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Separation Distances</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Typically 300mm from LV power cables in free air</li>
                  <li>Use physical barrier (metallic) if closer separation needed</li>
                  <li>Screened cables reduce required separation</li>
                  <li>Follow manufacturer guidance for specific requirements</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Crossing Power Cables</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Cross at right angles to minimise coupling</li>
                  <li>Maintain minimum separation at crossing point</li>
                  <li>Consider additional screening if parallel runs unavoidable</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Cable Fixings and Supports */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cable Fixings and Supports
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 Regulation 521.10.202 requires fire alarm cables to be supported so they do not prematurely collapse in fire conditions.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Key Requirement:</p>
              <p className="text-sm text-white">
                Use metallic fixings and supports at intervals specified by the manufacturer. Plastic clips alone are not acceptable for fire alarm cables on escape routes.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Acceptable Methods:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Metal cable clips with metallic fixings to structure</li>
                <li>Cable basket/tray with metallic supports</li>
                <li>Metal conduit or trunking</li>
                <li>Metallic cable ties at appropriate intervals</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Support Spacing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Support Spacing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Support spacing must maintain cable position and prevent sagging or damage. Follow manufacturer recommendations.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Horizontal Runs</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Typically 300-400mm maximum spacing for FP cables</li>
                  <li>Closer spacing near changes of direction</li>
                  <li>Support immediately before and after entries/exits</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Vertical Runs</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Support to prevent cable weight causing damage</li>
                  <li>Use cleats or saddles at appropriate intervals</li>
                  <li>Consider thermal expansion for long vertical drops</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Fire Compartment Penetrations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Fire Compartment Penetrations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cables passing through fire-resisting walls and floors must be sealed to maintain compartmentation. This is a life safety requirement.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm text-white">
                <strong>Critical:</strong> Use tested and certified firestopping systems. Expanding foam alone is rarely adequate. Maintain the fire resistance rating of the element being penetrated.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Firestopping Methods:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Intumescent sealants and mastics</li>
                <li>Proprietary cable transits and sleeves</li>
                <li>Fire-resistant pillows and wraps</li>
                <li>Mortar or cement-based fillers for larger openings</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Route Planning */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Route Planning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Plan cable routes to protect cables from damage and allow future access for testing and maintenance.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Route Considerations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Avoid areas of mechanical damage risk</li>
                  <li>Keep clear of heat sources and hot pipes</li>
                  <li>Plan for maintenance access</li>
                  <li>Consider coordination with other services</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ceiling Voids</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Protect from building trades during construction</li>
                  <li>Route above access panels where possible</li>
                  <li>Maintain segregation in shared voids</li>
                  <li>Label routes for future identification</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Containment Selection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Containment Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Select containment systems appropriate to the environment, fire performance requirements and EMC considerations.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Metallic Containment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Provides mechanical protection and EMC screening</li>
                  <li>Steel trunking, conduit or cable basket</li>
                  <li>Bond to earth for screening effectiveness</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Environmental Considerations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Stainless steel or coated in corrosive environments</li>
                  <li>IP rating for external or wet locations</li>
                  <li>Fire-rated containment for enhanced circuits</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Designing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Plan routes to avoid segregation conflicts with other services</li>
                <li>Specify firestopping requirements on drawings</li>
                <li>Allow for access hatches above critical equipment</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Photograph all firestopping works before they are covered up</li>
                <li>Label cable routes at regular intervals and at penetration points</li>
                <li>Keep a record of segregation distances and containment types used</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Using plastic clips as sole support</strong> - for fire alarm cables on escape routes</li>
                <li><strong>Leaving cable penetrations unsealed</strong> - or using inadequate firestopping materials</li>
                <li><strong>Running fire alarm cables in shared containment</strong> - with power cables without proper segregation</li>
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

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Segregation</p>
                <ul className="space-y-0.5">
                  <li>300mm from LV power typical</li>
                  <li>Cross at right angles</li>
                  <li>Use barriers if closer</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Fixings</p>
                <ul className="space-y-0.5">
                  <li>Metallic, not plastic alone</li>
                  <li>300-400mm horizontal spacing</li>
                  <li>Support vertical runs adequately</li>
                  <li>Firestop all penetrations</li>
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
            <Link to="../section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default FireAlarmModule4Section4;
