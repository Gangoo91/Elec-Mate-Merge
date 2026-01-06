import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m2s1-check1",
    question: "What is the minimum illumination level required for escape route lighting?",
    options: ["0.5 lux", "1 lux", "2 lux", "5 lux"],
    correctIndex: 1,
    explanation: "BS 5266-1 requires minimum 1 lux at floor level along the centre line of escape routes. This ensures occupants can see their way clearly during evacuation."
  },
  {
    id: "emergencylighting-m2s1-check2",
    question: "What is the maximum uniformity ratio allowed for escape route lighting?",
    options: ["10:1", "20:1", "40:1", "60:1"],
    correctIndex: 2,
    explanation: "The maximum uniformity ratio is 40:1 (maximum to minimum illumination). This prevents dark spots along escape routes that could cause trips or falls."
  },
  {
    id: "emergencylighting-m2s1-check3",
    question: "What percentage of required illumination must be achieved within 5 seconds?",
    options: ["25%", "50%", "75%", "100%"],
    correctIndex: 1,
    explanation: "50% of required illumination must be achieved within 5 seconds of mains failure. Full illumination (100%) must be reached within 60 seconds."
  }
];

const faqs = [
  {
    question: "What width escape routes require escape route lighting?",
    answer: "All defined escape routes require lighting regardless of width. Routes up to 2m wide require 1 lux minimum along the centre line. Wider routes may need additional luminaires to maintain uniformity."
  },
  {
    question: "How do I calculate luminaire spacing for escape routes?",
    answer: "Spacing is determined by manufacturer photometric data to achieve 1 lux minimum with 40:1 uniformity. Typically, spacing is 4× mounting height for most LED emergency luminaires."
  },
  {
    question: "Do escape routes need illuminated exit signs as well as luminaires?",
    answer: "Yes, escape route lighting provides illumination while exit signs provide wayfinding. Both are required under BS 5266-1. Exit signs must be visible from any point on the escape route."
  },
  {
    question: "What about externally illuminated signs vs internally illuminated?",
    answer: "Internally illuminated signs are preferred as they remain visible during power failure without additional lighting. Externally illuminated signs need a dedicated luminaire within 2m."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "An escape route is 1.8m wide. What illumination level must be achieved along the centre line?",
  options: [
    "0.5 lux (anti-panic level)",
    "1 lux (escape route level)",
    "2 lux (enhanced level)",
    "15 lux (high-risk task level)"
  ],
  correctAnswer: 1,
  explanation: "Escape routes up to 2m wide require minimum 1 lux at floor level along the centre line. The width doesn't change the illumination requirement - it affects spacing and uniformity calculations."
  }
];

const EmergencyLightingModule2Section1 = () => {
  useSEO({
    title: "Emergency Escape Lighting | Emergency Lighting Module 2.1",
    description: "Learn about emergency escape lighting systems, BS 5266-1 requirements, illuminance levels, spacing calculations, and exit route lighting design."
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
            <Link to="../emergency-lighting-module-2">
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
            <span>Module 2.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Emergency Escape Lighting
          </h1>
          <p className="text-white/80">
            Exit route and escape path lighting requirements for safe evacuation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Level:</strong> 1 lux minimum at floor</li>
              <li><strong>Uniformity:</strong> Maximum 40:1 ratio</li>
              <li><strong>Response:</strong> 50% in 5 seconds</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Route Coverage</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Centre line:</strong> 1 lux measured</li>
              <li><strong>Width:</strong> Up to 2m per luminaire row</li>
              <li><strong>Duration:</strong> 3 hours minimum</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Design escape route lighting to BS 5266-1",
              "Calculate luminaire spacing and uniformity",
              "Position luminaires at critical points",
              "Understand response time requirements",
              "Integrate with exit signage",
              "Verify compliance with lux meter"
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
            Illumination Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Escape route lighting must provide sufficient illumination for safe evacuation.
              BS 5266-1 specifies minimum levels measured at floor level along the route centre.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Illumination Levels</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Centre line:</strong> 1 lux minimum</li>
                  <li><strong>Band width:</strong> 50% of route width</li>
                  <li><strong>Uniformity:</strong> Max 40:1 ratio</li>
                  <li><strong>CRI:</strong> Minimum Ra 40</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Response Times</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>5 seconds:</strong> 50% illumination</li>
                  <li><strong>60 seconds:</strong> 100% illumination</li>
                  <li><strong>Duration:</strong> 3 hours minimum</li>
                  <li><strong>Activation:</strong> Automatic on mains fail</li>
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
            Luminaire Positioning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct positioning ensures adequate illumination and uniformity. Luminaires must
              be placed at specific locations to highlight hazards and exits.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mandatory Positions</p>
                <ul className="text-sm text-white space-y-1">
                  <li>At or near each exit door</li>
                  <li>Near exit signs (within 2m)</li>
                  <li>At direction changes &gt;45°</li>
                  <li>At each staircase (every flight)</li>
                  <li>At level changes (steps, ramps)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Spacing Guidance</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Typically 4× mounting height</li>
                  <li>Check manufacturer data</li>
                  <li>Verify with photometric calculation</li>
                  <li>Consider obstructions</li>
                  <li>Account for surface reflectances</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">1 lux</p>
                <p className="text-white/90 text-xs">Minimum level</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">40:1</p>
                <p className="text-white/90 text-xs">Max uniformity</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">3 hours</p>
                <p className="text-white/90 text-xs">Duration</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Verification and Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              After installation, escape route lighting must be verified to confirm it meets
              BS 5266-1 requirements. This includes lux measurements and uniformity checks.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Verification Steps:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Lux meter:</strong> Calibrated, measuring at floor level</li>
                <li><strong>Centre line:</strong> 1 lux minimum confirmed</li>
                <li><strong>Dark spots:</strong> No areas below 0.5 lux</li>
                <li><strong>Response time:</strong> 50% within 5 seconds verified</li>
                <li><strong>Duration:</strong> Full 3-hour test annually</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Walk escape routes and mark luminaire positions</li>
                <li>Use manufacturer photometric data for spacing</li>
                <li>Position within 2m of each exit sign</li>
                <li>Cover direction changes and level changes</li>
                <li>Calculate uniformity ratio (max 40:1)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Design Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Spacing too wide:</strong> — Verify with manufacturer data</li>
                <li><strong>Dark spots at corners:</strong> — Add luminaire at direction changes</li>
                <li><strong>Signs not illuminated:</strong> — Position within 2m of signs</li>
                <li><strong>Assuming walls reflect:</strong> — Dark surfaces need more luminaires</li>
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
              <p className="font-medium text-white mb-1">Illumination Requirements</p>
              <ul className="space-y-0.5">
                <li>Centre line: 1 lux minimum</li>
                <li>Uniformity: 40:1 maximum</li>
                <li>CRI: Ra 40 minimum</li>
                <li>Band: 50% route width</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Response Requirements</p>
              <ul className="space-y-0.5">
                <li>5 seconds: 50% output</li>
                <li>60 seconds: 100% output</li>
                <li>Duration: 3 hours</li>
                <li>Testing: Monthly + annual</li>
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
            <Link to="../emergency-lighting-module-1-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../emergency-lighting-module-2-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule2Section1;