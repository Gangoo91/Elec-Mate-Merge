import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "datacabling-m4s2-check1",
    question: "What is the minimum separation between data and mains power cables in shared trunking?",
    options: ["10mm", "25mm", "50mm", "100mm"],
    correctIndex: 1,
    explanation: "BS 7671 requires a minimum 25mm separation between data and mains power cables, or use of a metallic barrier to prevent electromagnetic interference."
  },
  {
    id: "datacabling-m4s2-check2",
    question: "What is the minimum bend radius for Cat6 cable during installation?",
    options: ["2× cable diameter", "4× cable diameter", "8× cable diameter", "10× cable diameter"],
    correctIndex: 2,
    explanation: "During installation (under tension), Cat6 cable requires 8× cable diameter bend radius. Once installed and at rest, this reduces to 4× cable diameter."
  },
  {
    id: "datacabling-m4s2-check3",
    question: "What is the maximum pulling tension for Cat6 4-pair cable?",
    options: ["50N (11 lbs)", "80N (18 lbs)", "110N (25 lbs)", "150N (34 lbs)"],
    correctIndex: 2,
    explanation: "Cat6 cable has a maximum pulling tension of 110N (25 lbs). During normal installation, never exceed 50% of this (55N) to prevent damage to the twisted pairs."
  }
];

const faqs = [
  {
    question: "Why is cable separation from fluorescent lights important?",
    answer: "Fluorescent lights generate significant electromagnetic interference that can degrade data signal quality. Maintain at least 150mm separation, and if cables must cross, do so at 90 degrees only."
  },
  {
    question: "What happens if I violate bend radius requirements?",
    answer: "Excessive bending damages internal conductors, alters pair geometry, and increases crosstalk. This causes signal degradation, failed certification tests, and unreliable network performance."
  },
  {
    question: "How do temperature extremes affect cable installation?",
    answer: "Cold temperatures make cables brittle and prone to cracking. Hot temperatures increase flexibility but cause thermal expansion. Install at 15-25°C and allow for thermal movement in the completed installation."
  },
  {
    question: "What's the difference between EMC zones 0, 1, and 2?",
    answer: "Zone 0 is clean (computer rooms) - standard UTP acceptable. Zone 1 is light industrial - may need FTP and increased separation. Zone 2 is heavy industrial - requires STP cables, screened containment, and comprehensive bonding."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "You're installing Cat6 cables in a manufacturing environment with fluorescent lighting, motor control cables, and variable frequency drives. What approach should you take?",
  options: [
    "Use standard UTP with normal separation distances",
    "Install screened containment, use FTP/STP cables, maintain increased separation distances",
    "Route cables through the same trunking as power for convenience",
    "Only use fibre optic cables throughout"
  ],
  correctAnswer: 1,
  explanation: "Manufacturing environments (Zone 2) require screened containment, FTP or STP cables, and increased separation distances from interference sources. Comprehensive bonding is also essential for EMC compliance."
  }
];

const DataCablingModule4Section2 = () => {
  useSEO({
    title: "Cable Separation and Bend Radius | Data Cabling Module 4.2",
    description: "Understand cable separation requirements, bend radius specifications, and installation stress limits for professional data cabling."
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
            <Link to="../data-cabling-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 4
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Cable Separation and Bend Radius
          </h1>
          <p className="text-white/80">
            Installation guidelines and physical constraints
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Separation:</strong> 25mm from mains, 150mm from fluorescents</li>
              <li><strong>Bend radius:</strong> 4× at rest, 8× during installation</li>
              <li><strong>Tension:</strong> 110N max for Cat6, use 50% max normally</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Sharp bends and cables alongside power = problems</li>
              <li><strong>Use:</strong> EMC zoning to determine cable and containment type</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply correct separation distances by interference source",
              "Calculate bend radius for copper and fibre cables",
              "Understand pulling tension limits",
              "Implement EMC zone requirements",
              "Manage thermal effects on cables",
              "Avoid common installation errors"
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
            Cable Separation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electromagnetic compatibility requires careful separation of data cables from power
              sources and other interference sources. These requirements ensure reliable data
              transmission and compliance with performance standards.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Separation by Interference Source:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Mains power (230V):</strong> 25mm or metallic barrier</li>
                <li><strong>High voltage (&gt;1kV):</strong> 300mm minimum</li>
                <li><strong>Fluorescent lighting:</strong> 150mm, cross at 90° only</li>
                <li><strong>Motor control cables:</strong> 200mm minimum</li>
                <li><strong>Radio transmitters:</strong> 1m minimum, screened installation</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">230V Mains</p>
                <p className="text-white/90 text-xs">25mm or barrier</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Fluorescent</p>
                <p className="text-white/90 text-xs">150mm separation</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Motors</p>
                <p className="text-white/90 text-xs">200mm separation</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Bend Radius Specifications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Each cable type has specific bend radius requirements to prevent damage to internal
              conductors and maintain performance characteristics. Requirements differ between
              installation (under tension) and installed (at rest) conditions.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Copper Cables (At Rest)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Cat5e/Cat6 UTP:</strong> 4× cable diameter</li>
                  <li><strong>Cat6a UTP:</strong> 6× cable diameter</li>
                  <li><strong>Cat6a STP:</strong> 8× cable diameter</li>
                  <li><strong>During installation:</strong> 8× minimum all types</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fibre Optic Cables</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Single mode:</strong> 20× cable diameter</li>
                  <li><strong>Multimode:</strong> 15× cable diameter</li>
                  <li><strong>Armoured fibre:</strong> 25× cable diameter</li>
                  <li><strong>Under tension:</strong> 30× minimum</li>
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
            Installation Stress Limits
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding and respecting pulling tension limits and support spacing requirements
              is critical for maintaining cable integrity during and after installation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maximum Pulling Tensions</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Cat5e/Cat6:</strong> 110N (25 lbs)</li>
                  <li><strong>Cat6a:</strong> 180N (40 lbs)</li>
                  <li><strong>Fibre 2-core:</strong> 270N (60 lbs)</li>
                  <li><strong>Fibre 12-core:</strong> 600N (135 lbs)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Support Spacing</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Copper horizontal:</strong> 1.5m maximum</li>
                  <li><strong>Copper vertical:</strong> 1.0m maximum</li>
                  <li><strong>Fibre horizontal:</strong> 1.0m maximum</li>
                  <li><strong>Fibre vertical:</strong> 0.5m maximum</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Installation Guidelines:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Never exceed 50% of maximum rated tension during normal installation</li>
                <li>Use cable lubricant for long pulls</li>
                <li>Monitor tension with force gauges for long runs</li>
                <li>Support within 300mm of equipment connections</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            EMC Zone Design
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective EMC design requires understanding of interference sources and implementing
              appropriate zoning strategies to maintain signal integrity.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow/80 text-sm mb-2">Zone 0 - Clean</p>
                <ul className="text-xs text-white space-y-0.5">
                  <li>Computer rooms, data centres</li>
                  <li>Standard containment OK</li>
                  <li>UTP cables suitable</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow/80 text-sm mb-2">Zone 1 - Light Industrial</p>
                <ul className="text-xs text-white space-y-0.5">
                  <li>Offices with equipment</li>
                  <li>Increased separation</li>
                  <li>Consider FTP cables</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-elec-yellow/80 text-sm mb-2">Zone 2 - Heavy Industrial</p>
                <ul className="text-xs text-white space-y-0.5">
                  <li>Manufacturing environments</li>
                  <li>Screened containment</li>
                  <li>STP cables required</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Pulling Techniques</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use pulling socks or tape for secure attachment</li>
                <li>Always install pull strings for future use</li>
                <li>Use approved cable lubricant for long runs</li>
                <li>Coordinate team: one puller, one feeder minimum</li>
                <li>Stop immediately if resistance increases unexpectedly</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Running alongside power:</strong> — violates separation requirements</li>
                <li><strong>Sharp bends:</strong> — damages conductors and degrades performance</li>
                <li><strong>Excessive tension:</strong> — stretches conductors and damages jacket</li>
                <li><strong>Ignoring temperature:</strong> — cables brittle when cold, expansion when hot</li>
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
              <p className="font-medium text-white mb-1">Separation Distances</p>
              <ul className="space-y-0.5">
                <li>Mains 230V: 25mm or barrier</li>
                <li>Fluorescent: 150mm, 90° crossing</li>
                <li>Motors: 200mm minimum</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Bend Radius (Cat6)</p>
              <ul className="space-y-0.5">
                <li>At rest: 4× cable diameter</li>
                <li>During install: 8× cable diameter</li>
                <li>Max tension: 110N (use 55N normal)</li>
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
            <Link to="../data-cabling-module-4-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../data-cabling-module-4-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default DataCablingModule4Section2;