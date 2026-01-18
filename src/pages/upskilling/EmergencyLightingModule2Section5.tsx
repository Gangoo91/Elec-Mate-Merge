import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m2s5-check1",
    question: "What is the minimum viewing distance for a 100mm high exit sign?",
    options: ["10 metres", "20 metres", "30 metres", "40 metres"],
    correctIndex: 2,
    explanation: "The viewing distance formula is approximately 200× letter height. For 100mm (0.1m) × 200 = 20m. However, BS 5266-7 specifies 30m maximum for internally illuminated signs of this size due to practical visibility factors."
  },
  {
    id: "emergencylighting-m2s5-check2",
    question: "Which standard defines the green 'running man' pictogram for exit signs?",
    options: ["BS 5266-1", "BS 7671", "ISO 7010", "BS EN 1838"],
    correctIndex: 2,
    explanation: "ISO 7010 specifies safety sign graphical symbols including the green 'running man' pictogram used on emergency exit signs. BS 5266-7 references ISO 7010 for sign design requirements."
  },
  {
    id: "emergencylighting-m2s5-check3",
    question: "What is the minimum luminance for an internally illuminated exit sign?",
    options: ["1 cd/m²", "2 cd/m²", "5 cd/m²", "10 cd/m²"],
    correctIndex: 1,
    explanation: "BS 5266-7 requires minimum 2 cd/m² luminance for the white or green portions of internally illuminated exit signs. This ensures visibility in smoky or partially lit conditions."
  }
];

const faqs = [
  {
    question: "Should exit signs be internally or externally illuminated?",
    answer: "Internally illuminated signs are preferred as they remain visible during power failure without needing a separate luminaire. Externally illuminated signs require a dedicated luminaire within 2m and are more prone to shadowing."
  },
  {
    question: "When is a directional arrow required on exit signs?",
    answer: "Directional arrows are required when the exit is not directly ahead or when clarification is needed. Arrow direction should indicate the actual direction of travel, not simply point at the exit door if that would be misleading."
  },
  {
    question: "Can text-only exit signs still be used?",
    answer: "While older text-only 'EXIT' signs may still exist in some buildings, BS 5266-7 now requires the ISO 7010 graphical 'running man' pictogram. Text can supplement but not replace the pictogram for new installations."
  },
  {
    question: "How often should exit signs be checked?",
    answer: "Daily visual checks should confirm all signs are lit and undamaged. Monthly functional tests verify operation on battery. Annual full-duration tests confirm 3-hour operation. All tests must be recorded in the log book."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A corridor has exit doors at each end, 45m apart. What is the maximum height for exit signs to ensure they can be seen from the centre?",
  options: [
    "80mm height (16m viewing distance)",
    "100mm height (20m viewing distance)",
    "150mm height (30m viewing distance)",
    "200mm height (40m viewing distance)"
  ],
  correctAnswer: 2,
  explanation: "From the centre, each sign must be visible from approximately 22.5m. A 150mm sign provides a viewing distance of around 30m, which comfortably covers the required 22.5m with margin for practical factors."
  }
];

const EmergencyLightingModule2Section5 = () => {
  useSEO({
    title: "Emergency Exit Signs | Emergency Lighting Module 2.5",
    description: "Design and install emergency exit signs to BS 5266-7 and ISO 7010 including sign sizing, viewing distances, illumination requirements, and placement guidance."
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
            <span>Module 2.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Emergency Exit Signs
          </h1>
          <p className="text-white/80">
            Sign design, sizing, illumination and placement requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Standard:</strong> ISO 7010 'running man'</li>
              <li><strong>Viewing:</strong> ~200× letter height</li>
              <li><strong>Luminance:</strong> 2 cd/m² minimum</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Types</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Internal:</strong> Self-illuminated (preferred)</li>
              <li><strong>External:</strong> Requires luminaire within 2m</li>
              <li><strong>Direction:</strong> Arrows where needed</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Select appropriate exit sign sizes",
              "Calculate viewing distances",
              "Understand illumination requirements",
              "Position signs for maximum visibility",
              "Apply ISO 7010 graphical standards",
              "Integrate signs with escape lighting"
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
            Sign Design Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Emergency exit signs must comply with ISO 7010 which standardises the green
              'running man' pictogram. This ensures universal recognition regardless of
              language or literacy.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">ISO 7010 Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Pictogram:</strong> Running man toward exit</li>
                  <li><strong>Colours:</strong> Green background, white figure</li>
                  <li><strong>Direction:</strong> Arrow if not directly ahead</li>
                  <li><strong>Contrast:</strong> High contrast for visibility</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sign Elements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Graphical symbol (mandatory)</li>
                  <li>Directional arrow (where needed)</li>
                  <li>Supplementary text (optional)</li>
                  <li>Safety colour (green/white)</li>
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
            Sign Sizing and Viewing Distance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Sign size must match the required viewing distance. The relationship between
              sign height and viewing distance ensures occupants can read signs from any
              point on the escape route.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Size Guidelines</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>80mm:</strong> Up to 16m viewing</li>
                  <li><strong>100mm:</strong> Up to 20m viewing</li>
                  <li><strong>150mm:</strong> Up to 30m viewing</li>
                  <li><strong>200mm:</strong> Up to 40m viewing</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Formula</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>External lit:</strong> d = h × 100</li>
                  <li><strong>Internal lit:</strong> d = h × 200</li>
                  <li>d = viewing distance (m)</li>
                  <li>h = sign height (m)</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">100mm</p>
                <p className="text-white/90 text-xs">Standard corridors</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">150mm</p>
                <p className="text-white/90 text-xs">Open areas</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">200mm</p>
                <p className="text-white/90 text-xs">Large spaces</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Illumination Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Exit signs must be illuminated during both normal operation and emergency
              conditions. BS 5266-7 specifies luminance and uniformity requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Illumination Standards:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Minimum luminance:</strong> 2 cd/m² (white/green areas)</li>
                <li><strong>Contrast ratio:</strong> At least 5:1 (symbol to background)</li>
                <li><strong>Uniformity:</strong> No visible dark spots or hot spots</li>
                <li><strong>Duration:</strong> 3 hours minimum on battery</li>
                <li><strong>Response:</strong> Immediate on mains failure</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Internal Illumination</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Self-contained light source</li>
                  <li>Preferred for new installations</li>
                  <li>Independent of area lighting</li>
                  <li>Better smoke penetration</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">External Illumination</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Separate luminaire required</li>
                  <li>Luminaire within 2m of sign</li>
                  <li>Avoid shadowing</li>
                  <li>Lower viewing distance factor</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Sign Placement</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Above or adjacent to each exit door</li>
                <li>Visible from any point on escape route</li>
                <li>At direction changes on routes</li>
                <li>Mount height 2-2.5m typical</li>
                <li>Not obscured by doors when open</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Sign Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong arrow direction:</strong> — Arrow must show travel direction</li>
                <li><strong>Sign too small:</strong> — Calculate viewing distance requirements</li>
                <li><strong>Obscured by fixtures:</strong> — Clear sightlines from all points</li>
                <li><strong>No luminaire for external:</strong> — Must be within 2m</li>
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
              <p className="font-medium text-white mb-1">Sign Sizes</p>
              <ul className="space-y-0.5">
                <li>80mm: 16m viewing</li>
                <li>100mm: 20m viewing</li>
                <li>150mm: 30m viewing</li>
                <li>200mm: 40m viewing</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Requirements</p>
              <ul className="space-y-0.5">
                <li>Luminance: 2 cd/m² min</li>
                <li>Contrast: 5:1 minimum</li>
                <li>Duration: 3 hours</li>
                <li>Standard: ISO 7010</li>
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
            <Link to="/electrician/upskilling/emergency-lighting-module-2-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-2-section-6">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule2Section5;