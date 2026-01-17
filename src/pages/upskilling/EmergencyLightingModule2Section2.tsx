import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m2s2-check1",
    question: "What is the minimum illumination level for open area (anti-panic) lighting?",
    options: ["0.25 lux", "0.5 lux", "1 lux", "2 lux"],
    correctIndex: 1,
    explanation: "BS 5266-1 requires minimum 0.5 lux horizontal illumination across the open area floor. This is lower than escape route lighting (1 lux) as the primary purpose is preventing panic, not detailed navigation."
  },
  {
    id: "emergencylighting-m2s2-check2",
    question: "Anti-panic lighting applies to open areas exceeding what floor area?",
    options: ["25m²", "40m²", "60m²", "100m²"],
    correctIndex: 2,
    explanation: "Anti-panic (open area) lighting applies to areas exceeding 60m² floor area. Smaller areas are typically covered by escape route lighting. The 60m² threshold is specified in BS 5266-1."
  },
  {
    id: "emergencylighting-m2s2-check3",
    question: "What uniformity ratio applies to open area lighting?",
    options: ["10:1", "20:1", "40:1", "No specific ratio"],
    correctIndex: 2,
    explanation: "The same 40:1 uniformity ratio applies to open area lighting as escape routes. This ensures consistent illumination without excessively dark patches that could cause disorientation."
  }
];

const faqs = [
  {
    question: "What's the difference between anti-panic and escape route lighting?",
    answer: "Escape route lighting (1 lux) illuminates defined exit paths. Anti-panic lighting (0.5 lux) covers large open areas (>60m²) to prevent panic and allow safe movement towards escape routes."
  },
  {
    question: "Do I need both escape route and anti-panic lighting?",
    answer: "Typically yes. A large hall needs anti-panic lighting across the floor area (0.5 lux) plus escape route lighting (1 lux) along defined exit paths. They serve different purposes."
  },
  {
    question: "How do I calculate luminaire spacing for open areas?",
    answer: "Use manufacturer spacing tables or photometric software for 0.5 lux minimum with 40:1 uniformity. Luminaires are typically positioned in a grid pattern based on their light distribution."
  },
  {
    question: "What happens at the boundary between open area and escape route?",
    answer: "The illumination must transition smoothly. Where escape routes pass through open areas, 1 lux must be achieved along the escape path while 0.5 lux covers the general area."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A conference hall of 150m² has emergency lighting installed. What minimum illumination must be achieved across the floor area?",
  options: [
    "0.25 lux (reduced level)",
    "0.5 lux (anti-panic level)",
    "1 lux (escape route level)",
    "No requirement for open areas"
  ],
  correctAnswer: 1,
  explanation: "Areas exceeding 60m² require anti-panic lighting at 0.5 lux minimum. At 150m², this hall qualifies as an open area requiring anti-panic illumination across the entire floor."
  }
];

const EmergencyLightingModule2Section2 = () => {
  useSEO({
    title: "Open Area (Anti-Panic) Lighting | Emergency Lighting Module 2.2",
    description: "Learn about open area anti-panic emergency lighting systems, BS 5266-1 requirements, 0.5 lux illuminance levels, and design for large open spaces."
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
            <Link to="/study-centre/upskilling/emergency-lighting-module-2">
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
            <span>Module 2.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Open Area (Anti-Panic) Lighting
          </h1>
          <p className="text-white/80">
            Preventing panic in large open spaces during emergency evacuation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Level:</strong> 0.5 lux minimum</li>
              <li><strong>Area threshold:</strong> &gt;60m² floor area</li>
              <li><strong>Purpose:</strong> Prevent panic</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Difference</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Anti-panic:</strong> 0.5 lux (open areas)</li>
              <li><strong>Escape route:</strong> 1 lux (defined paths)</li>
              <li><strong>Uniformity:</strong> 40:1 for both</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify when anti-panic lighting is required",
              "Apply the 60m² area threshold",
              "Calculate 0.5 lux coverage",
              "Design luminaire layouts for open areas",
              "Integrate with escape route lighting",
              "Verify uniformity requirements"
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
            Purpose and Application
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Anti-panic (open area) lighting serves a different purpose to escape route lighting.
              It provides general illumination to prevent panic and allow safe movement towards
              visible escape routes in large spaces.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When Required</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Open areas exceeding 60m²</li>
                  <li>Conference halls and auditoriums</li>
                  <li>Exhibition spaces</li>
                  <li>Large retail floors</li>
                  <li>Sports halls and gymnasiums</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Primary Functions</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Prevent panic in darkness</li>
                  <li>Allow visual orientation</li>
                  <li>Enable movement to escape routes</li>
                  <li>Illuminate obstacles</li>
                  <li>Support crowd management</li>
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
            Technical Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 5266-1 specifies requirements for anti-panic lighting that differ from escape
              route lighting due to the different functional purpose.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Illumination</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Minimum:</strong> 0.5 lux horizontal</li>
                  <li><strong>Uniformity:</strong> Maximum 40:1</li>
                  <li><strong>Coverage:</strong> Entire floor area</li>
                  <li><strong>Height:</strong> At floor level</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Performance</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Response:</strong> 50% in 5 seconds</li>
                  <li><strong>Full output:</strong> 60 seconds</li>
                  <li><strong>Duration:</strong> 3 hours minimum</li>
                  <li><strong>Disability glare:</strong> Limited</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">0.5 lux</p>
                <p className="text-white/90 text-xs">Minimum level</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">&gt;60m²</p>
                <p className="text-white/90 text-xs">Area threshold</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">40:1</p>
                <p className="text-white/90 text-xs">Max uniformity</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Design Approach
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Designing anti-panic lighting requires a systematic approach considering area
              geometry, ceiling height, and luminaire distribution.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Design Steps:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Calculate area:</strong> Confirm &gt;60m² requirement</li>
                <li><strong>Grid layout:</strong> Even luminaire distribution</li>
                <li><strong>Spacing:</strong> Use manufacturer photometric data</li>
                <li><strong>Verify uniformity:</strong> Check 40:1 ratio achieved</li>
                <li><strong>Integrate:</strong> Coordinate with escape route lighting</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Layout Planning</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Calculate floor area to confirm 60m² threshold</li>
                <li>Position luminaires in regular grid pattern</li>
                <li>Consider ceiling height for spacing calculations</li>
                <li>Ensure escape routes achieve 1 lux within the space</li>
                <li>Account for furniture and obstructions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Design Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ignoring 60m² threshold:</strong> — Calculate all open areas</li>
                <li><strong>No escape route distinction:</strong> — 1 lux still needed on routes</li>
                <li><strong>Poor uniformity:</strong> — Check dark areas between luminaires</li>
                <li><strong>Ceiling height ignored:</strong> — Affects spacing significantly</li>
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
              <p className="font-medium text-white mb-1">Anti-Panic Requirements</p>
              <ul className="space-y-0.5">
                <li>Area: &gt;60m² floor area</li>
                <li>Illumination: 0.5 lux minimum</li>
                <li>Uniformity: 40:1 maximum</li>
                <li>Duration: 3 hours</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Comparison</p>
              <ul className="space-y-0.5">
                <li>Escape route: 1 lux (defined paths)</li>
                <li>Anti-panic: 0.5 lux (open areas)</li>
                <li>High-risk: 15 lux (task areas)</li>
                <li>All: 40:1 uniformity</li>
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
            <Link to="/study-centre/upskilling/emergency-lighting-module-2-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/emergency-lighting-module-2-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule2Section2;