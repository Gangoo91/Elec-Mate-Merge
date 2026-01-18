import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m3s1-check1",
    question: "What is the minimum illumination level for escape route lighting?",
    options: ["0.5 lux", "1 lux", "2 lux", "5 lux"],
    correctIndex: 1,
    explanation: "BS 5266-1 requires minimum 1 lux at floor level along the centre line of escape routes. This is measured on a horizontal plane at floor level."
  },
  {
    id: "emergencylighting-m3s1-check2",
    question: "What is the standard emergency lighting duration for most premises?",
    options: ["1 hour", "2 hours", "3 hours", "4 hours"],
    correctIndex: 2,
    explanation: "3 hours is the standard rated duration for most premises. This provides adequate time for evacuation, fire service operations, and safe shutdown of activities."
  },
  {
    id: "emergencylighting-m3s1-check3",
    question: "When is 1-hour duration acceptable instead of 3 hours?",
    options: ["Small premises only", "When immediate evacuation and reoccupation is possible", "Never acceptable", "During testing only"],
    correctIndex: 1,
    explanation: "1-hour duration is acceptable only when immediate evacuation followed by non-reoccupation is the norm (e.g., some industrial premises), and this is documented in the fire risk assessment."
  }
];

const faqs = [
  {
    question: "Why is 3 hours the standard duration?",
    answer: "3 hours allows for: complete evacuation (even in large/complex buildings), fire service operations (investigation, firefighting), utility isolation and safety checks, and provides margin for battery degradation over time."
  },
  {
    question: "Does battery capacity reduce over time?",
    answer: "Yes, battery capacity typically reduces to 80% of original after 4 years. Systems should be designed with this in mind - specify slightly longer duration or plan for battery replacement at appropriate intervals."
  },
  {
    question: "How is lux measured for verification?",
    answer: "Using a calibrated lux meter held horizontally at floor level. Measurements are taken along the centre line of escape routes and at representative points in open areas. The lowest reading must meet the minimum requirement."
  },
  {
    question: "Do different areas need different durations?",
    answer: "The entire system should operate for the rated duration. However, some areas (like sleeping accommodation) may need maintained operation to provide instant full illumination, not just duration."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A care home with elderly residents requires emergency lighting. What minimum duration should be specified?",
  options: [
    "1 hour (elderly residents)",
    "2 hours (residential use)",
    "3 hours (standard duration)",
    "4 hours (vulnerable occupants)"
  ],
  correctAnswer: 2,
  explanation: "3 hours is the standard requirement regardless of occupant type. The presence of vulnerable occupants may require maintained operation and enhanced illumination levels, but the duration remains 3 hours."
  }
];

const EmergencyLightingModule3Section1 = () => {
  useSEO({
    title: "Illumination Levels and Durations | Emergency Lighting Module 3.1",
    description: "BS 5266-1 minimum lux levels for escape routes, anti-panic areas, and high-risk tasks. Understand 3-hour duration requirements and battery specifications."
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
            <span>Module 3.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Illumination Levels and Durations
          </h1>
          <p className="text-white/80">
            Minimum lux requirements and operating times for BS 5266-1 compliance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Escape routes:</strong> 1 lux minimum</li>
              <li><strong>Anti-panic:</strong> 0.5 lux minimum</li>
              <li><strong>High-risk:</strong> 15 lux or 10% normal</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Duration</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Standard:</strong> 3 hours</li>
              <li><strong>Alternative:</strong> 1 hour (restricted)</li>
              <li><strong>Response:</strong> 50% in 5 seconds</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply correct lux levels for each area type",
              "Specify appropriate duration requirements",
              "Understand response time requirements",
              "Account for battery degradation",
              "Measure illumination for verification",
              "Document compliance with standards"
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
            Illumination Level Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Different areas have different minimum illumination requirements based on their
              function and the activities that must continue during an emergency.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Area Type Levels</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Escape routes:</strong> 1 lux at floor</li>
                  <li><strong>Anti-panic areas:</strong> 0.5 lux at floor</li>
                  <li><strong>High-risk tasks:</strong> 10% of normal</li>
                  <li><strong>High-risk minimum:</strong> 15 lux</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Uniformity:</strong> 40:1 max (escape/panic)</li>
                  <li><strong>Uniformity:</strong> 10:1 max (high-risk)</li>
                  <li><strong>CRI:</strong> Ra 40 minimum</li>
                  <li><strong>Glare:</strong> Limited per BS EN 1838</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">1 lux</p>
                <p className="text-white/90 text-xs">Escape routes</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">0.5 lux</p>
                <p className="text-white/90 text-xs">Anti-panic</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">15 lux</p>
                <p className="text-white/90 text-xs">High-risk min</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Duration Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Emergency lighting must operate for a specified duration to allow safe evacuation
              and enable fire service operations. The standard duration is 3 hours.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">3-Hour Duration</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Standard for all premises</li>
                  <li>Allows complete evacuation</li>
                  <li>Supports fire service operations</li>
                  <li>Covers utility isolation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">1-Hour Duration</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Only where specifically justified</li>
                  <li>Immediate evacuation possible</li>
                  <li>Non-reoccupation after evacuation</li>
                  <li>Must be in fire risk assessment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Response Time Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Emergency lighting must reach operational levels quickly after mains failure.
              Response time requirements vary by area type and lighting category.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Response Standards:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Escape/anti-panic:</strong> 50% output within 5 seconds</li>
                <li><strong>Escape/anti-panic:</strong> 100% output within 60 seconds</li>
                <li><strong>High-risk task:</strong> Full output within 5 seconds</li>
                <li><strong>High-risk preferred:</strong> 0.5 seconds for hazardous areas</li>
              </ul>
            </div>

            <p>
              The two-stage response for escape lighting allows use of fluorescent lamps
              which may need warm-up time. High-risk areas require near-instant response
              for immediate safe shutdown of hazardous processes.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design Considerations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Design for end-of-life battery capacity (80%)</li>
                <li>Use maintained factor in calculations</li>
                <li>Consider lamp lumen depreciation</li>
                <li>Allow margin above minimum requirements</li>
                <li>Verify with measurements after installation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Specification Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1-hour without justification:</strong> — Must be documented in FRA</li>
                <li><strong>Ignoring uniformity:</strong> — 40:1 is critical for safety</li>
                <li><strong>No degradation factor:</strong> — Batteries lose capacity</li>
                <li><strong>Wrong response time:</strong> — High-risk needs 5s max</li>
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
              <p className="font-medium text-white mb-1">Illumination Levels</p>
              <ul className="space-y-0.5">
                <li>Escape routes: 1 lux</li>
                <li>Anti-panic: 0.5 lux</li>
                <li>High-risk: 15 lux / 10%</li>
                <li>Uniformity: 40:1 / 10:1</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Timing</p>
              <ul className="space-y-0.5">
                <li>Duration: 3 hours standard</li>
                <li>Response: 50% in 5 seconds</li>
                <li>Full output: 60 seconds</li>
                <li>High-risk: 5 seconds max</li>
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
            <Link to="/electrician/upskilling/emergency-lighting-module-2-section-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-3-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule3Section1;