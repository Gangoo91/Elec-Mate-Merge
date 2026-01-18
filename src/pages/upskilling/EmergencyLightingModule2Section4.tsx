import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m2s4-check1",
    question: "What is the maximum mounting height typically recommended for escape route luminaires?",
    options: ["2 metres", "2.5 metres", "3 metres", "4 metres"],
    correctIndex: 1,
    explanation: "2.5 metres is the typical maximum mounting height for escape route luminaires to ensure effective illumination at floor level. Higher mounting reduces illumination levels at the walking surface."
  },
  {
    id: "emergencylighting-m2s4-check2",
    question: "What width escape route can be served by a single row of luminaires?",
    options: ["Up to 1m", "Up to 2m", "Up to 3m", "Up to 4m"],
    correctIndex: 1,
    explanation: "A single row of centrally mounted luminaires can serve escape routes up to 2m wide. Wider routes require additional rows of luminaires or luminaires on both sides."
  },
  {
    id: "emergencylighting-m2s4-check3",
    question: "At what point must a luminaire always be positioned?",
    options: ["Every 5 metres", "At each fire extinguisher", "Within 2m of each exit", "At each room entrance"],
    correctIndex: 2,
    explanation: "BS 5266-1 requires a luminaire within 2m of each exit and exit sign. This ensures the exit is clearly illuminated and visible during evacuation."
  }
];

const faqs = [
  {
    question: "How do I determine luminaire spacing for a specific route?",
    answer: "Use manufacturer photometric data specific to the luminaire model. Spacing depends on mounting height, light output, and the need to maintain 1 lux minimum with 40:1 uniformity. Typically 4× mounting height for ceiling mounted luminaires."
  },
  {
    question: "Should escape route lighting be maintained or non-maintained?",
    answer: "BS 5266-1 allows either. Maintained is required if normal lighting could be confused with emergency lighting, or in entertainment venues. Non-maintained is acceptable for most commercial premises."
  },
  {
    question: "How do I handle escape routes with low ceilings?",
    answer: "Wall-mounted luminaires may be more effective with low ceilings. Mount at 2-2.5m height. Lower mounting improves floor illumination but may affect uniformity - verify with photometric calculations."
  },
  {
    question: "What about routes with dark coloured floors or walls?",
    answer: "Dark surfaces absorb light rather than reflect it, reducing effective illumination. Reduce luminaire spacing by 20-30% or use higher output luminaires. Always verify with on-site measurements after installation."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "An escape route is 3m wide and 25m long with 2.4m ceiling height. What is the minimum number of luminaire rows required?",
  options: [
    "1 row (central mounting)",
    "2 rows (at edges or staggered)",
    "3 rows (one central, two at edges)",
    "No specific requirement"
  ],
  correctAnswer: 1,
  explanation: "Routes wider than 2m require more than one row of luminaires. A 3m wide route needs at least 2 rows - either mounted along each edge or staggered. A single central row cannot maintain 40:1 uniformity across the full 3m width."
  }
];

const EmergencyLightingModule2Section4 = () => {
  useSEO({
    title: "Escape Route Lighting Design | Emergency Lighting Module 2.4",
    description: "Design and install escape route lighting to BS 5266-1 including luminaire spacing, mounting heights, route width considerations, and practical installation guidance."
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
            <Link to="/electrician/upskilling/emergency-lighting-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Escape Route Lighting Design
          </h1>
          <p className="text-white/80">
            Practical design and installation guidance for escape route luminaires
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Mounting:</strong> Max 2.5m height typical</li>
              <li><strong>Spacing:</strong> 4× mounting height typical</li>
              <li><strong>Route width:</strong> 2m per luminaire row</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Positions</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Exits:</strong> Within 2m of each exit</li>
              <li><strong>Changes:</strong> At each direction change</li>
              <li><strong>Hazards:</strong> At level changes, steps</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate luminaire spacing for escape routes",
              "Select appropriate mounting heights",
              "Design for different route widths",
              "Position luminaires at critical points",
              "Account for surface reflectances",
              "Verify designs with photometric data"
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
            Luminaire Spacing Principles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct spacing ensures adequate illumination with acceptable uniformity. The goal
              is to maintain 1 lux minimum along the centre line with no point exceeding 40:1
              uniformity ratio.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Spacing Factors</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Mounting height:</strong> Lower = closer spacing</li>
                  <li><strong>Light output:</strong> Higher = wider spacing</li>
                  <li><strong>Beam angle:</strong> Wide = wider spacing</li>
                  <li><strong>Surface colour:</strong> Dark = closer spacing</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Guidelines</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Ceiling mount:</strong> 4× mounting height</li>
                  <li><strong>Wall mount:</strong> 3× mounting height</li>
                  <li><strong>Always verify:</strong> Manufacturer data</li>
                  <li><strong>Dark surfaces:</strong> Reduce by 20-30%</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">2.5m height</p>
                <p className="text-white/90 text-xs">~10m spacing</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">3m height</p>
                <p className="text-white/90 text-xs">~12m spacing</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">4m height</p>
                <p className="text-white/90 text-xs">~16m spacing</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Route Width Considerations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The width of the escape route determines the number of luminaire rows needed.
              Wider routes require additional coverage to maintain uniformity across the full width.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Routes up to 2m Wide</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Single row of luminaires</li>
                  <li>Centrally mounted</li>
                  <li>Standard spacing applies</li>
                  <li>Most common scenario</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Routes over 2m Wide</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Multiple rows required</li>
                  <li>Edge mounting or staggered</li>
                  <li>Each 2m band needs coverage</li>
                  <li>Consider wider beam luminaires</li>
                </ul>
              </div>
            </div>

            <p>
              The central band of the route (50% of width) is the measurement zone for the 1 lux
              minimum requirement. Luminaires must illuminate this central band adequately.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Critical Positioning Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Beyond regular spacing, BS 5266-1 mandates luminaires at specific critical points
              regardless of the calculated spacing interval.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Mandatory Luminaire Positions:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Within 2m of each exit:</strong> Illuminates the exit point</li>
                <li><strong>Within 2m of exit signs:</strong> Ensures sign visibility</li>
                <li><strong>At direction changes &gt;45°:</strong> Highlights route turns</li>
                <li><strong>At each staircase:</strong> Every flight illuminated</li>
                <li><strong>At level changes:</strong> Steps, ramps, thresholds</li>
                <li><strong>At fire equipment:</strong> Extinguishers, call points</li>
                <li><strong>At first aid:</strong> First aid points when required</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design Process</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Survey route - measure length, width, ceiling height</li>
                <li>Note surface colours and finishes</li>
                <li>Mark all mandatory positions (exits, changes, hazards)</li>
                <li>Select luminaire based on mounting height</li>
                <li>Calculate spacing from manufacturer photometric data</li>
                <li>Verify uniformity ratio (max 40:1)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Design Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming all luminaires equal:</strong> — Check specific photometric data</li>
                <li><strong>Ignoring surface colours:</strong> — Dark surfaces need closer spacing</li>
                <li><strong>Missing mandatory positions:</strong> — Exits and signs always need luminaires</li>
                <li><strong>Wide routes with single row:</strong> — Routes &gt;2m need multiple rows</li>
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
              <p className="font-medium text-white mb-1">Spacing Guidelines</p>
              <ul className="space-y-0.5">
                <li>Ceiling: 4× mounting height</li>
                <li>Wall: 3× mounting height</li>
                <li>Route width: 2m per row</li>
                <li>Dark surfaces: -20-30%</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Mandatory Positions</p>
              <ul className="space-y-0.5">
                <li>Within 2m of exits</li>
                <li>Within 2m of exit signs</li>
                <li>At direction changes &gt;45°</li>
                <li>At level changes and stairs</li>
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
            <Link to="/electrician/upskilling/emergency-lighting-module-2-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-2-section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule2Section4;