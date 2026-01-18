import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m1s2-check1",
    question: "Which location always requires emergency lighting under BS 5266-1?",
    options: ["Private offices", "Exit routes and doors", "Storage cupboards", "Car parks"],
    correctIndex: 1,
    explanation: "Exit routes and final exit doors always require emergency lighting to ensure safe evacuation. Other areas depend on the fire risk assessment and building use."
  },
  {
    id: "emergencylighting-m1s2-check2",
    question: "Emergency lighting must be provided at changes of direction exceeding what angle?",
    options: ["30 degrees", "45 degrees", "60 degrees", "90 degrees"],
    correctIndex: 1,
    explanation: "BS 5266-1 requires emergency lighting at all changes of direction exceeding 45 degrees along escape routes. This ensures occupants can clearly see the route ahead."
  },
  {
    id: "emergencylighting-m1s2-check3",
    question: "At what maximum spacing should emergency luminaires be placed on escape routes up to 2m wide?",
    options: ["Manufacturer specification only", "Based on 1 lux calculation", "Every 15 metres", "Every 5 metres"],
    correctIndex: 1,
    explanation: "Luminaire spacing is determined by photometric calculations to achieve minimum 1 lux at floor level. Manufacturer data provides mounting height and spacing to achieve required illumination."
  }
];

const faqs = [
  {
    question: "Do toilets always need emergency lighting?",
    answer: "Toilets exceeding 8m² floor area require emergency lighting under BS 5266-1. Smaller toilets may still need lighting if identified by the fire risk assessment or if they're used by disabled persons."
  },
  {
    question: "Is emergency lighting required outside buildings?",
    answer: "External emergency lighting is required immediately outside final exits to illuminate the area to a place of safety. This typically means lighting the immediate exit area and any external escape routes."
  },
  {
    question: "What about lift cars - do they need emergency lighting?",
    answer: "Yes, lift cars require emergency lighting to allow occupants to safely exit if the lift stops between floors. This is a BS 5266-1 requirement for all passenger lifts."
  },
  {
    question: "How do I determine locations for high-risk task lighting?",
    answer: "High-risk task areas are identified by the fire risk assessment - locations where sudden loss of lighting could cause danger. Examples include operating machinery, chemical handling, or working at height."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A warehouse has a staircase width of 1.5m with a 90-degree turn. How many emergency luminaires are needed at the turn?",
  options: [
    "None - stairs don't need emergency lighting",
    "One luminaire positioned to illuminate the turn",
    "Two luminaires minimum for uniformity",
    "Based only on lux calculation"
  ],
  correctAnswer: 1,
  explanation: "Changes of direction exceeding 45 degrees require emergency lighting. A single well-positioned luminaire can illuminate a 90-degree turn on a 1.5m wide staircase, subject to achieving the required 1 lux minimum."
  }
];

const EmergencyLightingModule1Section2 = () => {
  useSEO({
    title: "Locations Where Emergency Lights are Required | Emergency Lighting Module 1.2",
    description: "Learn about mandatory locations for emergency lighting installation, BS 5266 requirements, escape routes, and specific area classifications."
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
            <Link to="/electrician/upskilling/emergency-lighting-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 1
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Locations Where Emergency Lights are Required
          </h1>
          <p className="text-white/80">
            Understanding mandatory installation locations and BS 5266 requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Exit routes:</strong> Always required</li>
              <li><strong>Direction change:</strong> &gt;45° needs lighting</li>
              <li><strong>Large toilets:</strong> &gt;8m² floor area</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Locations</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Stairs:</strong> Each flight illuminated</li>
              <li><strong>Lift cars:</strong> All passenger lifts</li>
              <li><strong>External:</strong> Immediately outside exits</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify mandatory emergency lighting locations",
              "Apply BS 5266-1 location requirements",
              "Understand escape route lighting rules",
              "Recognise special area requirements",
              "Determine external lighting needs",
              "Position luminaires at direction changes"
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
            Escape Route Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Escape routes form the backbone of emergency lighting design. BS 5266-1 specifies
              precise requirements for illuminating the path from any point in the building to
              a place of ultimate safety.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mandatory Locations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>All defined escape routes</li>
                  <li>Final exit doors</li>
                  <li>Intersections and junctions</li>
                  <li>Changes of direction &gt;45°</li>
                  <li>Changes of floor level</li>
                  <li>Staircases (each flight)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Signage Locations</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Near each exit sign (within 2m)</li>
                  <li>At escape route doors</li>
                  <li>Direction changes</li>
                  <li>Accessible escape routes</li>
                  <li>Refuge points</li>
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
            Direction Changes and Level Changes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Changes of direction and floor level present increased risk during evacuation.
              Emergency lighting must be positioned to clearly reveal these hazards.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Direction Changes</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>&gt;45° change:</strong> Luminaire required</li>
                  <li><strong>T-junctions:</strong> Illuminate all routes</li>
                  <li><strong>Corridors:</strong> At each turn</li>
                  <li><strong>Open plan:</strong> Define escape path</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Level Changes</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Stairs:</strong> Each flight separately</li>
                  <li><strong>Ramps:</strong> Full length illuminated</li>
                  <li><strong>Steps:</strong> Single steps highlighted</li>
                  <li><strong>Landings:</strong> All intermediate landings</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">&gt;45°</p>
                <p className="text-white/90 text-xs">Direction threshold</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Each Flight</p>
                <p className="text-white/90 text-xs">Stair coverage</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">2m Max</p>
                <p className="text-white/90 text-xs">Exit sign distance</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Special Area Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Certain areas have specific requirements beyond standard escape route lighting.
              These include sanitary facilities, plant rooms, and areas with special risks.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Areas Requiring Emergency Lighting:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Toilets &gt;8m²:</strong> Or windowless toilets</li>
                <li><strong>Lift cars:</strong> All passenger lifts</li>
                <li><strong>Moving walkways:</strong> Where installed</li>
                <li><strong>Covered car parks:</strong> Escape routes within</li>
                <li><strong>First aid rooms:</strong> All designated rooms</li>
                <li><strong>Motor generator rooms:</strong> And switchgear rooms</li>
                <li><strong>Control rooms:</strong> Building management/fire control</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Survey Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Walk all escape routes from furthest point to final exit</li>
                <li>Mark all direction changes exceeding 45 degrees</li>
                <li>Identify all staircases and note number of flights</li>
                <li>Measure toilet floor areas (8m² threshold)</li>
                <li>Note external route requirements outside exits</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Survey Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Missing direction changes:</strong> — Check all corridors systematically</li>
                <li><strong>Forgetting externals:</strong> — Always include area outside final exits</li>
                <li><strong>Lift cars omitted:</strong> — All passenger lifts need lighting</li>
                <li><strong>Toilet areas estimated:</strong> — Measure accurately against 8m² threshold</li>
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
              <p className="font-medium text-white mb-1">Always Required</p>
              <ul className="space-y-0.5">
                <li>Escape routes</li>
                <li>Final exits</li>
                <li>Exit signs (within 2m)</li>
                <li>Stairs (each flight)</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Conditional Requirements</p>
              <ul className="space-y-0.5">
                <li>Toilets: &gt;8m² floor area</li>
                <li>Direction change: &gt;45°</li>
                <li>External: To place of safety</li>
                <li>High-risk: Per risk assessment</li>
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
            <Link to="/electrician/upskilling/emergency-lighting-module-1-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-1-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule1Section2;