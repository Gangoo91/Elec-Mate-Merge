import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m3s2-check1",
    question: "What is the 'central band' for escape route illumination measurement?",
    options: ["The entire route width", "25% of route width", "50% of route width", "75% of route width"],
    correctIndex: 2,
    explanation: "The central band is 50% of the route width, centred on the route. This is where the 1 lux minimum must be achieved. Areas outside this band need adequate illumination but are not the primary measurement zone."
  },
  {
    id: "emergencylighting-m3s2-check2",
    question: "At what angle of direction change must a luminaire be positioned?",
    options: ["Any turn", "Greater than 30°", "Greater than 45°", "Greater than 90° only"],
    correctIndex: 2,
    explanation: "BS 5266-1 requires a luminaire at direction changes greater than 45°. This ensures the change in direction is clearly visible and occupants don't miss a turn during evacuation."
  },
  {
    id: "emergencylighting-m3s2-check3",
    question: "What is the coverage rule for escape route width and luminaire rows?",
    options: ["1 row per metre", "1 row per 2 metres", "1 row per 3 metres", "1 row per 4 metres"],
    correctIndex: 1,
    explanation: "One row of centrally mounted luminaires can cover routes up to 2m wide. Routes wider than 2m require additional rows to maintain illumination across the full central band width."
  }
];

const faqs = [
  {
    question: "What happens if an escape route is exactly 2m wide?",
    answer: "A single central row of luminaires is sufficient for routes up to and including 2m wide, provided the photometric data confirms adequate coverage across the 1m central band (50% of 2m)."
  },
  {
    question: "Do corridors with rooms off them need luminaires at each door?",
    answer: "Not necessarily at every door. Luminaires are required where rooms discharge onto escape routes (i.e., where the escape route starts for that room's occupants). Regular room doors along a corridor don't each need a luminaire."
  },
  {
    question: "How do I handle T-junctions and crossroads?",
    answer: "These are direction changes greater than 45° and require luminaires. Position a luminaire to illuminate the junction clearly, showing all possible directions. Exit signs should indicate the correct evacuation direction."
  },
  {
    question: "What about curved corridors?",
    answer: "Treat gradual curves as straight routes for spacing purposes. Sharp curves (equivalent to >45° direction change over a short distance) need additional luminaires at the curve to maintain visibility."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "An escape route is 2.5m wide and 40m long with two 90° turns. How many luminaire rows are required along the straight sections?",
  options: [
    "1 row (central mounting)",
    "2 rows (edge or staggered)",
    "3 rows (both edges plus centre)",
    "Depends on ceiling height only"
  ],
  correctAnswer: 1,
  explanation: "At 2.5m wide, the route exceeds the 2m maximum for single-row coverage. Two rows are required - typically mounted along each edge or staggered - to cover the 1.25m central band adequately."
  }
];

const EmergencyLightingModule3Section2 = () => {
  useSEO({
    title: "Escape Route Coverage Rules | Emergency Lighting Module 3.2",
    description: "Coverage principles, placement rules, and integration requirements for compliant escape route lighting systems to BS 5266-1."
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
            <Link to="/electrician/upskilling/emergency-lighting-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Escape Route Coverage Rules
          </h1>
          <p className="text-white/80">
            Placement principles and coverage requirements for compliant installations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Central band:</strong> 50% of route width</li>
              <li><strong>Row coverage:</strong> 2m max per row</li>
              <li><strong>Direction change:</strong> &gt;45° needs luminaire</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Positions</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Exits:</strong> Within 2m</li>
              <li><strong>Exit signs:</strong> Within 2m</li>
              <li><strong>Stairs:</strong> Every flight</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply the central band rule",
              "Calculate row requirements for wide routes",
              "Position luminaires at direction changes",
              "Identify mandatory luminaire positions",
              "Plan coverage for complex routes",
              "Integrate with exit signage"
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
            The Central Band Rule
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The central band is the primary measurement zone for escape route illumination.
              It represents the typical walking path and must achieve minimum 1 lux.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Central Band Definition</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Width:</strong> 50% of route width</li>
                  <li><strong>Position:</strong> Centred on route</li>
                  <li><strong>Example:</strong> 2m route = 1m band</li>
                  <li><strong>Measurement:</strong> At floor level</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coverage Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>1 row:</strong> Routes up to 2m wide</li>
                  <li><strong>2 rows:</strong> Routes 2-4m wide</li>
                  <li><strong>Additional:</strong> Each 2m band</li>
                  <li><strong>Uniformity:</strong> 40:1 maximum</li>
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
            Direction Changes and Junctions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Changes in direction are critical points where visibility must be maintained.
              Luminaires are required at significant turns to prevent occupants missing the
              correct evacuation route.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Mandatory Positions at Route Changes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>&gt;45° direction change:</strong> Luminaire required at turn</li>
                <li><strong>T-junctions:</strong> Luminaire to illuminate all directions</li>
                <li><strong>Crossroads:</strong> Luminaire at intersection point</li>
                <li><strong>Sharp curves:</strong> Treat as direction changes</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">45°+</p>
                <p className="text-white/90 text-xs">Turn requires light</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">90°</p>
                <p className="text-white/90 text-xs">Standard corner</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">T/X</p>
                <p className="text-white/90 text-xs">Junctions</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Mandatory Luminaire Positions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 5266-1 specifies locations where luminaires must be positioned regardless
              of spacing calculations. These ensure critical points are always illuminated.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Always Required</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Within 2m of each exit</li>
                  <li>Within 2m of exit signs</li>
                  <li>At each staircase (per flight)</li>
                  <li>At level changes (steps, ramps)</li>
                  <li>At fire-fighting equipment</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Where Required</p>
                <ul className="text-sm text-white space-y-1">
                  <li>At call points (fire alarms)</li>
                  <li>At first aid points</li>
                  <li>At direction changes &gt;45°</li>
                  <li>At intersections/junctions</li>
                  <li>Outside and near final exits</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Route Survey Process</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Walk all escape routes and mark on plan</li>
                <li>Measure route widths and ceiling heights</li>
                <li>Mark all mandatory positions</li>
                <li>Identify direction changes &gt;45°</li>
                <li>Note exit sign locations</li>
                <li>Calculate luminaire spacing between mandatory points</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Coverage Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wide routes single row:</strong> — Routes &gt;2m need multiple rows</li>
                <li><strong>Missing exit signs:</strong> — Every sign needs luminaire within 2m</li>
                <li><strong>Ignoring corners:</strong> — All &gt;45° turns need coverage</li>
                <li><strong>Forgetting stairs:</strong> — Every flight needs illumination</li>
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
              <p className="font-medium text-white mb-1">Coverage Rules</p>
              <ul className="space-y-0.5">
                <li>Central band: 50% width</li>
                <li>1 row: up to 2m wide</li>
                <li>2 rows: 2-4m wide</li>
                <li>&gt;45° turn: luminaire</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Mandatory Positions</p>
              <ul className="space-y-0.5">
                <li>Within 2m of exits</li>
                <li>Within 2m of signs</li>
                <li>Every stair flight</li>
                <li>At level changes</li>
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
            <Link to="/electrician/upskilling/emergency-lighting-module-3-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-3-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule3Section2;