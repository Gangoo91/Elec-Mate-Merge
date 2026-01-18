import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m1s4-check1",
    question: "Which British Standard is the primary code of practice for emergency lighting?",
    options: ["BS 7671", "BS 5266-1", "BS EN 1838", "BS EN 50172"],
    correctIndex: 1,
    explanation: "BS 5266-1 is the UK code of practice for emergency lighting of premises. It incorporates European requirements and provides detailed guidance on design, installation, and maintenance."
  },
  {
    id: "emergencylighting-m1s4-check2",
    question: "What does BS EN 1838 specifically cover?",
    options: ["Installation methods", "Light output and photometric requirements", "Battery specifications", "Testing procedures"],
    correctIndex: 1,
    explanation: "BS EN 1838 'Lighting applications - Emergency lighting' covers photometric requirements including illumination levels, uniformity ratios, and colour rendering. BS 5266-1 references this for technical specifications."
  },
  {
    id: "emergencylighting-m1s4-check3",
    question: "Which standard covers emergency lighting luminaire construction?",
    options: ["BS 5266-1", "BS EN 60598-2-22", "BS EN 1838", "BS 7671"],
    correctIndex: 1,
    explanation: "BS EN 60598-2-22 covers the construction requirements for emergency lighting luminaires, including battery and charging requirements, lamp requirements, and safety aspects."
  }
];

const faqs = [
  {
    question: "How do BS 5266-1 and BS EN 50172 relate?",
    answer: "BS EN 50172 is the European standard for emergency escape lighting. BS 5266-1 incorporates its requirements while adding UK-specific guidance. Following BS 5266-1 automatically meets BS EN 50172."
  },
  {
    question: "Do I need to read all the standards to design emergency lighting?",
    answer: "BS 5266-1 is the primary reference and incorporates requirements from other standards. It references BS EN 1838 for photometric data and BS EN 60598-2-22 for luminaire specifications."
  },
  {
    question: "What's the relationship between BS 5266 parts?",
    answer: "BS 5266-1 covers general requirements, BS 5266-2 covers exit signs, BS 5266-7 covers high-risk task lighting, and BS 5266-8 covers the log book. Part 1 is the core document."
  },
  {
    question: "Which standard covers wiring of emergency lighting?",
    answer: "BS 7671 (IET Wiring Regulations) covers all electrical installation work including emergency lighting circuits. BS 5266-1 references specific BS 7671 requirements for emergency lighting wiring."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "An inspector asks to see your emergency lighting design calculations. Which standard should your photometric calculations reference?",
  options: [
    "BS 5266-1 only",
    "BS 7671",
    "BS EN 1838 (referenced via BS 5266-1)",
    "BS EN 60598-2-22"
  ],
  correctAnswer: 2,
  explanation: "Photometric calculations should reference BS EN 1838 which specifies illumination levels, uniformity ratios, and other lighting requirements. BS 5266-1 references this standard for the technical specifications."
  }
];

const EmergencyLightingModule1Section4 = () => {
  useSEO({
    title: "Overview of BS 5266 and Related Standards | Emergency Lighting Module 1.4",
    description: "Comprehensive understanding of British Standards and regulations governing emergency lighting including BS 5266-1, BS EN 1838, and BS EN 60598-2-22."
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
            <span>Module 1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Overview of BS 5266 and Related Standards
          </h1>
          <p className="text-white/80">
            Understanding the standards framework for emergency lighting
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>BS 5266-1:</strong> Primary UK code of practice</li>
              <li><strong>BS EN 1838:</strong> Photometric requirements</li>
              <li><strong>BS EN 60598:</strong> Luminaire construction</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">BS 5266 Parts</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Part 1:</strong> General requirements</li>
              <li><strong>Part 2:</strong> Exit signs</li>
              <li><strong>Part 8:</strong> Log book requirements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Navigate the BS 5266 standard series",
              "Understand European standard relationships",
              "Reference correct standards for design",
              "Apply photometric requirements from BS EN 1838",
              "Identify luminaire specification standards",
              "Link standards to regulatory requirements"
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
            BS 5266 Series Structure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 5266 is a multi-part British Standard covering all aspects of emergency lighting.
              Understanding the structure helps locate specific requirements efficiently.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key Parts</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Part 1:</strong> Code of practice (primary)</li>
                  <li><strong>Part 2:</strong> Emergency escape lighting</li>
                  <li><strong>Part 7:</strong> High-risk task area lighting</li>
                  <li><strong>Part 8:</strong> Log book specification</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coverage</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Design principles and calculations</li>
                  <li>Installation requirements</li>
                  <li>Testing and maintenance</li>
                  <li>Documentation and records</li>
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
            European Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              European standards (EN) are incorporated into British Standards. Understanding
              these relationships ensures designs meet all requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS EN 1838</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Photometric requirements</li>
                  <li>Illumination levels</li>
                  <li>Uniformity ratios</li>
                  <li>Colour rendering</li>
                  <li>Duration requirements</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS EN 50172</p>
                <ul className="text-sm text-white space-y-1">
                  <li>System requirements</li>
                  <li>Testing schedules</li>
                  <li>Maintenance requirements</li>
                  <li>Documentation</li>
                  <li>Risk categories</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">BS EN 1838</p>
                <p className="text-white/90 text-xs">Photometrics</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">BS EN 50172</p>
                <p className="text-white/90 text-xs">Systems</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">BS EN 60598</p>
                <p className="text-white/90 text-xs">Luminaires</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Equipment and Installation Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Additional standards cover luminaire construction and electrical installation
              requirements to ensure safety and performance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Equipment Standards:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>BS EN 60598-2-22:</strong> Emergency luminaire construction</li>
                <li><strong>BS EN 62034:</strong> Automatic test systems</li>
                <li><strong>BS EN 50171:</strong> Central power supply systems</li>
                <li><strong>BS 7671:</strong> Electrical installation requirements</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Standards Reference Guide</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Design: BS 5266-1 (references BS EN 1838)</li>
                <li>Calculations: BS EN 1838 photometric data</li>
                <li>Luminaires: BS EN 60598-2-22 compliance</li>
                <li>Installation: BS 7671 wiring requirements</li>
                <li>Testing: BS 5266-1 and BS EN 50172</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Standards Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Outdated references:</strong> — Check current versions</li>
                <li><strong>Wrong standard cited:</strong> — BS 5266-1 for design, not BS 7671</li>
                <li><strong>Missing European standards:</strong> — BS EN 1838 for photometrics</li>
                <li><strong>Ignoring parts:</strong> — Part 8 mandatory for log books</li>
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
              <p className="font-medium text-white mb-1">British Standards</p>
              <ul className="space-y-0.5">
                <li>BS 5266-1: Code of practice</li>
                <li>BS 5266-2: Exit signs</li>
                <li>BS 5266-8: Log book</li>
                <li>BS 7671: Wiring Regulations</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">European Standards</p>
              <ul className="space-y-0.5">
                <li>BS EN 1838: Photometrics</li>
                <li>BS EN 50172: Systems</li>
                <li>BS EN 60598-2-22: Luminaires</li>
                <li>BS EN 62034: Auto test</li>
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
            <Link to="/electrician/upskilling/emergency-lighting-module-1-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-2-section-1">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule1Section4;