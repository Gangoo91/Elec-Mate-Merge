import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m3s3-check1",
    question: "What information does photometric data provide?",
    options: ["Battery capacity only", "Light distribution and intensity patterns", "Wiring requirements", "Testing schedules"],
    correctIndex: 1,
    explanation: "Photometric data shows how light is distributed from a luminaire - intensity at various angles, beam patterns, and illumination at different distances. This is essential for spacing calculations."
  },
  {
    id: "emergencylighting-m3s3-check2",
    question: "What is a typical spacing-to-mounting-height ratio for escape route luminaires?",
    options: ["1:1", "2:1", "4:1", "8:1"],
    correctIndex: 2,
    explanation: "A typical spacing-to-mounting-height (S/MH) ratio is 4:1 for ceiling mounted escape route luminaires. For example, at 2.5m height, spacing would be approximately 10m (4 × 2.5m)."
  },
  {
    id: "emergencylighting-m3s3-check3",
    question: "What is the maximum recommended mounting height for standard escape route luminaires?",
    options: ["2 metres", "2.5 metres", "3 metres", "4 metres"],
    correctIndex: 1,
    explanation: "2.5 metres is typically the maximum recommended mounting height for standard escape route luminaires. Higher mounting reduces floor-level illumination and requires higher output or closer spacing."
  }
];

const faqs = [
  {
    question: "Where do I find photometric data for luminaires?",
    answer: "Manufacturer datasheets, IES/LDT files for design software, or manufacturer technical support. Reputable manufacturers provide detailed photometric data including polar diagrams, isolux plots, and spacing tables."
  },
  {
    question: "Can I use general rules instead of photometric data?",
    answer: "General rules (like 4× mounting height spacing) provide initial guidance only. Actual design should use manufacturer-specific photometric data to ensure compliance with illumination and uniformity requirements."
  },
  {
    question: "How do mounting height and spacing relate?",
    answer: "Higher mounting generally allows wider spacing but reduces floor-level illumination. The relationship varies by luminaire type. Always use manufacturer spacing tables that specify spacing for different mounting heights."
  },
  {
    question: "What if ceiling height exceeds luminaire specifications?",
    answer: "Use luminaires designed for higher mounting (often higher lumen output), reduce spacing below typical ratios, or consider wall mounting at lower height. Never exceed manufacturer's specified maximum mounting height."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A luminaire has a maximum S/MH ratio of 3.5:1. At 3m mounting height, what is the maximum luminaire spacing?",
  options: [
    "7.5m (3 × 2.5)",
    "10.5m (3 × 3.5)",
    "12m (3 × 4)",
    "15m (3 × 5)"
  ],
  correctAnswer: 1,
  explanation: "Spacing = Mounting Height × S/MH ratio = 3m × 3.5 = 10.5m maximum spacing. This ensures adequate illumination and uniformity along the escape route."
  }
];

const EmergencyLightingModule3Section3 = () => {
  useSEO({
    title: "Mounting Heights and Photometric Data | Emergency Lighting Module 3.3",
    description: "Light distribution, spacing tables, and beam selection for compliant emergency lighting installations using photometric data and manufacturer specifications."
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
            <span>Module 3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Mounting Heights and Photometric Data
          </h1>
          <p className="text-white/80">
            Light distribution, spacing calculations, and beam selection
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>S/MH ratio:</strong> Typically 4:1</li>
              <li><strong>Max height:</strong> 2.5m typical</li>
              <li><strong>Photometrics:</strong> Manufacturer data</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Data Sources</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>IES/LDT files:</strong> Design software</li>
              <li><strong>Spacing tables:</strong> Datasheets</li>
              <li><strong>Polar diagrams:</strong> Distribution pattern</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Interpret photometric data",
              "Calculate spacing from S/MH ratios",
              "Select appropriate mounting heights",
              "Use manufacturer spacing tables",
              "Understand beam patterns and types",
              "Apply data to design calculations"
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
            Understanding Photometric Data
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Photometric data describes how a luminaire distributes light. This information
              is essential for calculating spacing and verifying that designs meet illumination
              requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of Photometric Data</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Polar diagrams:</strong> Light intensity vs angle</li>
                  <li><strong>Isolux plots:</strong> Illumination contours</li>
                  <li><strong>Spacing tables:</strong> S/MH ratios</li>
                  <li><strong>IES/LDT files:</strong> Software format</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Parameters</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Luminous flux:</strong> Total light output (lumens)</li>
                  <li><strong>Beam angle:</strong> Spread of light</li>
                  <li><strong>S/MH ratio:</strong> Spacing to height ratio</li>
                  <li><strong>Maintained factor:</strong> Light loss over time</li>
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
            Spacing-to-Mounting-Height Ratio
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The S/MH ratio is the primary tool for calculating luminaire spacing. It relates
              maximum spacing to mounting height while maintaining required illumination.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical S/MH Ratios:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wide beam escape:</strong> 4:1 typical</li>
                <li><strong>Standard escape:</strong> 3.5:1 typical</li>
                <li><strong>Narrow beam:</strong> 2:1 to 3:1</li>
                <li><strong>Wall mounted:</strong> 3:1 typical</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">2.5m height</p>
                <p className="text-white/90 text-xs">~10m spacing (4:1)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">3m height</p>
                <p className="text-white/90 text-xs">~12m spacing (4:1)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">4m height</p>
                <p className="text-white/90 text-xs">~14m spacing (3.5:1)</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Mounting Height Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Mounting height affects both illumination level and uniformity. Lower mounting
              provides higher floor-level illumination but may require more luminaires.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Heights</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Ceiling:</strong> 2.4-3m typical</li>
                  <li><strong>Maximum:</strong> 2.5m for standard</li>
                  <li><strong>Wall mount:</strong> 2-2.5m above floor</li>
                  <li><strong>High ceiling:</strong> Requires special luminaires</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Height Considerations</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Lower:</strong> Better floor illumination</li>
                  <li><strong>Higher:</strong> Wider coverage area</li>
                  <li><strong>Trade-off:</strong> Illumination vs spacing</li>
                  <li><strong>Check:</strong> Manufacturer limits</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Design Calculation Steps</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Measure ceiling height and determine mounting height</li>
                <li>Select luminaire appropriate for mounting height</li>
                <li>Find S/MH ratio from manufacturer data</li>
                <li>Calculate maximum spacing: Height × S/MH ratio</li>
                <li>Verify with photometric software if available</li>
                <li>Apply maintained factors for realistic values</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Calculation Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Generic ratios:</strong> — Use specific manufacturer data</li>
                <li><strong>Ignoring limits:</strong> — Check maximum mounting height</li>
                <li><strong>No maintained factor:</strong> — Light output reduces over time</li>
                <li><strong>Surface reflectance:</strong> — Dark surfaces reduce effectiveness</li>
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
              <p className="font-medium text-white mb-1">S/MH Ratios</p>
              <ul className="space-y-0.5">
                <li>Wide beam: ~4:1</li>
                <li>Standard: ~3.5:1</li>
                <li>Narrow beam: 2-3:1</li>
                <li>Wall mount: ~3:1</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Mounting Heights</p>
              <ul className="space-y-0.5">
                <li>Typical: 2.4-3m</li>
                <li>Standard max: 2.5m</li>
                <li>Wall: 2-2.5m</li>
                <li>High: Special units</li>
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
            <Link to="/electrician/upskilling/emergency-lighting-module-3-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-3-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule3Section3;