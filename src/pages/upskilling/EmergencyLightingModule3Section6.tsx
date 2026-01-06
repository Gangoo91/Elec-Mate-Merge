import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m3s6-check1",
    question: "What type of file is used to import luminaire data into lighting design software?",
    options: [".PDF", ".IES or .LDT", ".CAD", ".BIM"],
    correctIndex: 1,
    explanation: "IES (Illuminating Engineering Society) and LDT (EULUMDAT) files contain photometric data that lighting design software uses to calculate illumination levels and uniformity."
  },
  {
    id: "emergencylighting-m3s6-check2",
    question: "What does DIALux calculate for emergency lighting design?",
    options: ["Battery capacity only", "Lux levels and uniformity", "Cable sizes", "Fire ratings"],
    correctIndex: 1,
    explanation: "DIALux and similar software calculate lux levels at working planes, uniformity ratios, and can produce isolux diagrams. This verifies compliance with BS 5266-1 illumination requirements."
  },
  {
    id: "emergencylighting-m3s6-check3",
    question: "What should you verify after software calculations?",
    options: ["Software version only", "Results against BS 5266-1 requirements", "Computer specifications", "Internet connection"],
    correctIndex: 1,
    explanation: "Software calculations must be verified against BS 5266-1 requirements - minimum lux levels (1 lux escape, 0.5 lux anti-panic), uniformity ratios (40:1), and mandatory luminaire positions."
  }
];

const faqs = [
  {
    question: "Is lighting design software mandatory for emergency lighting?",
    answer: "Not mandatory, but highly recommended for complex installations. Software provides documented calculations, isolux diagrams, and uniformity verification. Simple installations may use manufacturer spacing tables."
  },
  {
    question: "Which software is commonly used for emergency lighting design?",
    answer: "DIALux and Relux are popular free options. AGi32 and Lighting Reality are commercial alternatives. Many manufacturers also provide proprietary design tools for their products."
  },
  {
    question: "How accurate are software calculations?",
    answer: "Accuracy depends on correct input data - accurate room dimensions, surface reflectances, and valid photometric files. Results should be verified with on-site measurements after installation."
  },
  {
    question: "Can I use spreadsheets for calculations?",
    answer: "Simple calculations (spacing, lux levels) can use spreadsheets or manual methods. However, software provides better visualisation, easier uniformity checking, and more comprehensive documentation."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A designer needs to verify that a proposed emergency lighting layout achieves 40:1 uniformity. What is the best approach?",
  options: [
    "Visual estimation from the drawing",
    "Lighting design software calculation",
    "Counting luminaires",
    "Measuring after installation only"
  ],
  correctAnswer: 1,
  explanation: "Lighting design software calculates uniformity ratios across the defined area, identifying any points that exceed the 40:1 maximum. This allows design adjustments before installation."
  }
];

const EmergencyLightingModule3Section6 = () => {
  useSEO({
    title: "Software and Calculation Tools | Emergency Lighting Module 3.6",
    description: "Use DIALux, Relux, and other lighting design software for emergency lighting calculations, lux plotting, and compliance verification."
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
            <Link to="../emergency-lighting-module-3">
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
            <span>Module 3.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Software and Calculation Tools
          </h1>
          <p className="text-white/80">
            Modern design tools for professional emergency lighting calculations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>DIALux/Relux:</strong> Free design software</li>
              <li><strong>IES/LDT:</strong> Photometric data files</li>
              <li><strong>Output:</strong> Lux levels, uniformity</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Benefits</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Accuracy:</strong> Calculated verification</li>
              <li><strong>Visualisation:</strong> Isolux diagrams</li>
              <li><strong>Documentation:</strong> Compliance evidence</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Use lighting design software",
              "Import photometric data files",
              "Create room models",
              "Interpret calculation results",
              "Verify compliance requirements",
              "Generate design documentation"
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
            Lighting Design Software
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Lighting design software provides accurate calculations of illumination
              levels and uniformity, essential for verifying emergency lighting compliance.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Popular Options</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>DIALux:</strong> Free, widely used</li>
                  <li><strong>Relux:</strong> Free alternative</li>
                  <li><strong>AGi32:</strong> Commercial option</li>
                  <li><strong>Manufacturer tools:</strong> Product-specific</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Features</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Room geometry modelling</li>
                  <li>Photometric calculations</li>
                  <li>Uniformity analysis</li>
                  <li>Report generation</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">DIALux</p>
                <p className="text-white/90 text-xs">Industry standard</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Relux</p>
                <p className="text-white/90 text-xs">Free alternative</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">AGi32</p>
                <p className="text-white/90 text-xs">Advanced features</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Photometric Data Import
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Accurate calculations require manufacturer photometric data. This data
              describes how each luminaire distributes light.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">File Types:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>IES (.ies):</strong> North American format, widely supported</li>
                <li><strong>EULUMDAT (.ldt):</strong> European format</li>
                <li><strong>Content:</strong> Intensity distribution, luminous flux, dimensions</li>
                <li><strong>Source:</strong> Manufacturer websites, product databases</li>
              </ul>
            </div>

            <p>
              Using actual photometric files rather than generic data ensures calculations
              reflect real luminaire performance. Always use data for the specific model
              being installed.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Verification Against Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Software calculations must be checked against BS 5266-1 requirements.
              The software shows results, but the designer must verify compliance.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Check Points</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Minimum lux:</strong> 1 lux escape routes</li>
                  <li><strong>Anti-panic:</strong> 0.5 lux minimum</li>
                  <li><strong>Uniformity:</strong> 40:1 maximum ratio</li>
                  <li><strong>Mandatory positions:</strong> 2m from exits</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Output Review</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Isolux diagrams (contour plots)</li>
                  <li>Point-by-point calculations</li>
                  <li>Minimum/maximum values</li>
                  <li>Uniformity ratio display</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Software Workflow</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Create room geometry from floor plans</li>
                <li>Set surface reflectances (floors, walls, ceilings)</li>
                <li>Import photometric files for selected luminaires</li>
                <li>Place luminaires at calculated positions</li>
                <li>Define calculation plane (floor level)</li>
                <li>Run calculation and review results</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Software Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong photometric file:</strong> — Use exact model being installed</li>
                <li><strong>Unrealistic reflectances:</strong> — Dark surfaces absorb more light</li>
                <li><strong>Missing maintained factor:</strong> — Account for light loss over time</li>
                <li><strong>Wrong calculation plane:</strong> — Must be at floor level</li>
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
              <p className="font-medium text-white mb-1">Software Options</p>
              <ul className="space-y-0.5">
                <li>DIALux: Free, standard</li>
                <li>Relux: Free alternative</li>
                <li>AGi32: Commercial</li>
                <li>IES/LDT: Data files</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Verification</p>
              <ul className="space-y-0.5">
                <li>1 lux escape minimum</li>
                <li>0.5 lux anti-panic</li>
                <li>40:1 uniformity</li>
                <li>Floor level plane</li>
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
            <Link to="../emergency-lighting-module-3-section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../emergency-lighting-module-4-section-1">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule3Section6;