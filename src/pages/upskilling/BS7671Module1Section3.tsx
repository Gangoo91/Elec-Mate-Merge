import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "bs7671-parts-count",
    question: "How many main Parts are in BS 7671?",
    options: [
      "4 Parts",
      "6 Parts",
      "8 Parts",
      "10 Parts"
    ],
    correctIndex: 2,
    explanation: "BS 7671 has 8 main Parts, from Part 1 (Scope and Fundamental Principles) through Part 8 (Prosumer Electrical Installations)."
  },
  {
    id: "inspection-testing-part",
    question: "Which Part covers inspection and testing?",
    options: [
      "Part 1",
      "Part 6",
      "Part 5",
      "Part 3"
    ],
    correctIndex: 1,
    explanation: "Part 6 covers inspection and testing procedures, including both initial verification and periodic inspection."
  },
  {
    id: "formulas-location",
    question: "Where are formulas and reference tables found in BS 7671?",
    options: [
      "Part 8",
      "Introduction",
      "Appendices",
      "Index"
    ],
    correctIndex: 2,
    explanation: "Appendices contain formulas, reference tables, charts, and other supporting information referenced throughout the regulations."
  }
];

const faqs = [
  {
    question: "Which Part should I focus on first?",
    answer: "Parts 4, 6, and 7 are most frequently referenced in day-to-day work. Part 4 (Protection for Safety) is essential for understanding safety principles, Part 6 for inspection and testing, and Part 7 for special locations."
  },
  {
    question: "What's the numbering system in BS 7671?",
    answer: "The system is hierarchical: Parts (1-8), then Chapters (e.g., 41, 42), then Sections (e.g., 411, 412), then individual Regulations (e.g., 411.3.3). The first digit indicates the Part number."
  },
  {
    question: "Which Appendix has cable current ratings?",
    answer: "Appendix 4 contains current-carrying capacity tables for cables, including installation method factors, grouping factors, and voltage drop calculations. Appendix 3 has time/current characteristics for protective devices."
  },
  {
    question: "How can I navigate BS 7671 faster?",
    answer: "Use the index for topic searches, tab mark frequently used sections, memorise Part numbers and their focus areas, and practice finding specific regulations. Being quick here saves significant time during exams and on-site work."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "Which section would cover marinas and similar locations?",
  options: [
    "Section 701 (Bathrooms)",
    "Section 710 (Medical locations)",
    "Section 708 (Marinas)",
    "Section 721 (Agricultural premises)"
  ],
  correctAnswer: 2,
  explanation: "Section 708 covers marinas and similar locations. Section 701 is bathrooms, 710 is medical locations, and 721 is agricultural premises. These are all in Part 7 - Special Installations or Locations."
  }
];

const BS7671Module1Section3 = () => {
  useSEO({
    title: "Structure of BS 7671 | BS7671 Module 1.3",
    description: "Master the structure of BS 7671 including Parts, Chapters, Sections, Appendices, and efficient navigation techniques."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/bs7671-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Structure of BS 7671
          </h1>
          <p className="text-white/80">
            Understanding Parts, Chapters, Sections, and Appendices
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>8 Parts:</strong> From fundamentals to prosumer installations</li>
              <li><strong>Chapters:</strong> Specific principles within each Part</li>
              <li><strong>Appendices:</strong> Formulas, tables, and reference data</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> First digit = Part number (411 = Part 4)</li>
              <li><strong>Use:</strong> Index, tabs, and bookmarks for fast navigation</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the overall structure of BS 7671",
              "Learn what's in each Part and Chapter",
              "Recognise the role of Appendices and their content",
              "Develop confidence navigating efficiently during work and exams"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Structure Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Structure Overview
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 follows a logical hierarchy designed to take you from fundamental
              principles through to specific application requirements. Understanding this
              structure is essential for efficient navigation.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-elec-yellow mb-3">Hierarchical Structure</p>
              <div className="space-y-2 text-sm text-white/90">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-elec-yellow rounded-full flex-shrink-0"></span>
                  <span><strong>Parts 1–8:</strong> Core requirements, definitions, design, safety, inspection</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-elec-yellow rounded-full flex-shrink-0 ml-0.5"></span>
                  <span><strong>Chapters:</strong> Narrow down specific principles within Parts</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0 ml-0.5"></span>
                  <span><strong>Sections:</strong> Drill further into specific application detail</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-elec-yellow rounded-full flex-shrink-0 ml-0.5"></span>
                  <span><strong>Appendices:</strong> Formulas, charts, tables, reference material</span>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">Numbering System</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>Parts: 1, 2, 3, 4, 5, 6, 7, 8</li>
                  <li>Chapters: 11, 12, 13... within each Part</li>
                  <li>Sections: 110, 120, 130... within Chapters</li>
                  <li>Regulations: 110.1, 110.2... within Sections</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-white mb-2">Reference Format</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li>Full reference: 411.3.3</li>
                  <li>Part 4, Chapter 41, Section 411.3, Reg 3</li>
                  <li>Quick reference: Reg 411.3.3</li>
                  <li>Cross-references throughout</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: The 8 Parts */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The 8 Parts of BS 7671
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <div className="flex items-start gap-3">
                  <span className="bg-elec-yellow text-[#1a1a1a] rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0">1</span>
                  <div>
                    <p className="font-medium text-white">Part 1 - Scope, Object and Fundamental Principles</p>
                    <p className="text-sm text-white/70">Application boundaries, safety objectives, design principles</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <div className="flex items-start gap-3">
                  <span className="bg-elec-yellow text-[#1a1a1a] rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0">2</span>
                  <div>
                    <p className="font-medium text-white">Part 2 - Definitions</p>
                    <p className="text-sm text-white/70">Technical terminology and definitions used throughout</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <div className="flex items-start gap-3">
                  <span className="bg-elec-yellow text-[#1a1a1a] rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0">3</span>
                  <div>
                    <p className="font-medium text-white">Part 3 - Assessment of General Characteristics</p>
                    <p className="text-sm text-white/70">Installation assessment, external influences, compatibility</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-start gap-3">
                  <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0">4</span>
                  <div>
                    <p className="font-medium text-white">Part 4 - Protection for Safety (Critical)</p>
                    <p className="text-sm text-white/70">Shock, thermal, overcurrent, voltage disturbance protection</p>
                    <p className="text-xs text-red-400 mt-1">Most referenced for safety requirements</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <div className="flex items-start gap-3">
                  <span className="bg-elec-yellow text-[#1a1a1a] rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0">5</span>
                  <div>
                    <p className="font-medium text-white">Part 5 - Selection and Erection of Equipment</p>
                    <p className="text-sm text-white/70">Wiring systems, earthing, equipment selection, installation methods</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-start gap-3">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0">6</span>
                  <div>
                    <p className="font-medium text-white">Part 6 - Inspection and Testing (Essential)</p>
                    <p className="text-sm text-white/70">Initial verification, periodic inspection, certification</p>
                    <p className="text-xs text-blue-400 mt-1">Essential for all testing work</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <div className="flex items-start gap-3">
                  <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0">7</span>
                  <div>
                    <p className="font-medium text-white">Part 7 - Special Installations or Locations</p>
                    <p className="text-sm text-white/70">Bathrooms (701), Construction sites (704), Marinas (708), Medical (710)</p>
                    <p className="text-xs text-orange-400 mt-1">Additional requirements for challenging environments</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-start gap-3">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs flex-shrink-0">8</span>
                  <div>
                    <p className="font-medium text-white">Part 8 - Prosumer Electrical Installations (New)</p>
                    <p className="text-sm text-white/70">EV charging, energy storage, microgeneration, smart grids</p>
                    <p className="text-xs text-green-400 mt-1">Modern energy systems and future technologies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Appendices */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Appendices - Your Reference Toolkit
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The appendices contain essential reference material that supports the main
              regulations. These are your go-to resources for calculations, tables, and
              technical data.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 my-6">
              <div className="p-3 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow text-sm mb-1">Appendix 1</p>
                <p className="text-sm text-white">British Standards</p>
                <p className="text-xs text-white/60">Referenced standards and compliance requirements</p>
              </div>
              <div className="p-3 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow text-sm mb-1">Appendix 2</p>
                <p className="text-sm text-white">Statutory Regulations</p>
                <p className="text-xs text-white/60">Legal framework and H&S regulations</p>
              </div>
              <div className="p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <p className="font-medium text-elec-yellow text-sm mb-1">Appendix 3</p>
                <p className="text-sm text-white">Time/Current Characteristics</p>
                <p className="text-xs text-elec-yellow">MCB/fuse curves - commonly used!</p>
              </div>
              <div className="p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <p className="font-medium text-elec-yellow text-sm mb-1">Appendix 4</p>
                <p className="text-sm text-white">Current-carrying Capacity</p>
                <p className="text-xs text-elec-yellow">Cable ratings - essential for design!</p>
              </div>
              <div className="p-3 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow text-sm mb-1">Appendix 5</p>
                <p className="text-sm text-white">External Influences</p>
                <p className="text-xs text-white/60">IP ratings, temperature, environmental codes</p>
              </div>
              <div className="p-3 rounded-lg bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow text-sm mb-1">Appendices 6-15</p>
                <p className="text-sm text-white">Additional References</p>
                <p className="text-xs text-white/60">Forms, energy efficiency, harmonics, guidance</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Navigation Tips */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Navigation Tips
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-sm font-medium text-green-400 mb-2">Professional Navigation Strategy</p>
              <p className="text-sm text-white/90">
                Use the index, bookmarks, and tabbing to move between Parts and Appendices
                effectively. During exams or on-site problem solving, being quick here is a major advantage.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Tools</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Index:</strong> Alphabetical topic listing with regulation refs</li>
                  <li><strong>Contents:</strong> Hierarchical structure overview</li>
                  <li><strong>Cross-references:</strong> Links between related regulations</li>
                  <li><strong>Page headers:</strong> Show current Part and Chapter</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Quick Access Methods</p>
                <ul className="text-sm text-white space-y-2 ml-4">
                  <li><strong>Tab marking:</strong> Physical tabs for frequent sections</li>
                  <li><strong>Bookmarks:</strong> Mark key regulation numbers</li>
                  <li><strong>Memorisation:</strong> Learn Part numbers and focus areas</li>
                  <li><strong>Practice:</strong> Time yourself finding regulations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Real World Scenario */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Real World Scenario
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-elec-yellow mb-3">Swimming Pool Circuit EICR</p>
              <div className="space-y-2 text-sm text-white/90">
                <p>
                  <strong>Situation:</strong> During an EICR, an engineer must check compliance
                  for a swimming pool circuit with additional bonding and enhanced RCD protection.
                </p>
                <p>
                  <strong>Efficient Process:</strong>
                </p>
                <ol className="text-sm text-white/80 space-y-1 ml-4 list-decimal">
                  <li>Check contents - Part 7 for special locations</li>
                  <li>Navigate to Section 702 - Swimming pools</li>
                  <li>Cross-reference to Part 4 for basic protection</li>
                  <li>Use Appendix 3 to verify RCD characteristics</li>
                  <li>Complete assessment and document findings</li>
                </ol>
                <p>
                  <strong>Result:</strong> What could take 30 minutes of searching is done in 5 minutes,
                  allowing more time for practical testing.
                </p>
              </div>
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
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Key Parts</p>
              <ul className="space-y-0.5 text-white/80">
                <li>Part 4 - Protection for Safety</li>
                <li>Part 6 - Inspection and Testing</li>
                <li>Part 7 - Special Locations</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Key Appendices</p>
              <ul className="space-y-0.5 text-white/80">
                <li>App 3 - Time/Current Curves</li>
                <li>App 4 - Cable Current Ratings</li>
                <li>App 5 - External Influences</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-10">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-1-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/bs7671-module-1-section-4">
              Next: Amendment 2 Highlights
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module1Section3;