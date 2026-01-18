import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Class II: Double Insulation Principles - PAT Testing Module 2 Section 3";
const DESCRIPTION = "Learn about Class II equipment and double insulation principles, including how double-insulated equipment is constructed, identified, and tested.";

const quickCheckQuestions = [
  {
    id: "m2s3-check1",
    question: "What is the primary safety mechanism in Class II equipment?",
    options: [
      "Protective earthing",
      "Double or reinforced insulation",
      "Extra low voltage",
      "Current limiting circuits"
    ],
    correctIndex: 1,
    explanation: "Class II equipment relies on double or reinforced insulation as its primary safety mechanism, eliminating the need for protective earthing."
  },
  {
    id: "m2s3-check2",
    question: "How many conductors does a Class II appliance cable typically have?",
    options: [
      "One conductor",
      "Two conductors (L, N)",
      "Three conductors (L, N, E)",
      "Four conductors"
    ],
    correctIndex: 1,
    explanation: "Class II appliances typically use two-core cables with only live (L) and neutral (N) conductors, as they don't require an earth connection."
  },
  {
    id: "m2s3-check3",
    question: "Which test is NOT typically required for Class II equipment?",
    options: [
      "Insulation resistance test",
      "Earth continuity test",
      "Functional test",
      "Visual inspection"
    ],
    correctIndex: 1,
    explanation: "Earth continuity tests are not required for Class II equipment as they have no accessible earthed parts and don't rely on protective earthing."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary safety mechanism in Class II equipment?",
    options: [
      "Protective earthing",
      "Double or reinforced insulation",
      "Extra low voltage",
      "Current limiting circuits"
    ],
    correctAnswer: 1,
    explanation: "Class II equipment relies on double or reinforced insulation as its primary safety mechanism, eliminating the need for protective earthing."
  },
  {
    id: 2,
    question: "How many conductors does a Class II appliance cable typically have?",
    options: [
      "One conductor",
      "Two conductors (L, N)",
      "Three conductors (L, N, E)",
      "Four conductors"
    ],
    correctAnswer: 1,
    explanation: "Class II appliances typically use two-core cables with only live (L) and neutral (N) conductors, as they don't require an earth connection."
  },
  {
    id: 3,
    question: "What does 'basic insulation' protect against in Class II equipment?",
    options: [
      "Overcurrent",
      "Direct contact with live parts",
      "Electromagnetic interference",
      "Moisture ingress"
    ],
    correctAnswer: 1,
    explanation: "Basic insulation in Class II equipment protects against direct contact with live parts during normal operation."
  },
  {
    id: 4,
    question: "What is the purpose of 'supplementary insulation' in Class II equipment?",
    options: [
      "To improve energy efficiency",
      "To reduce electromagnetic emissions",
      "To provide independent protection if basic insulation fails",
      "To meet colour coding requirements"
    ],
    correctAnswer: 2,
    explanation: "Supplementary insulation provides independent protection against electric shock if the basic insulation fails, creating a double barrier."
  },
  {
    id: 5,
    question: "Which test is NOT typically required for Class II equipment?",
    options: [
      "Insulation resistance test",
      "Earth continuity test",
      "Functional test",
      "Visual inspection"
    ],
    correctAnswer: 1,
    explanation: "Earth continuity tests are not required for Class II equipment as they have no accessible earthed parts and don't rely on protective earthing."
  },
  {
    id: 6,
    question: "What symbol identifies Class II equipment?",
    options: [
      "Earth symbol",
      "Square within a square",
      "Roman numeral III",
      "Lightning bolt in triangle"
    ],
    correctAnswer: 1,
    explanation: "Class II equipment is identified by a square within a square symbol, indicating double insulation protection."
  },
  {
    id: 7,
    question: "What is reinforced insulation?",
    options: [
      "Extra thick basic insulation",
      "A single insulation system equivalent to double insulation",
      "Insulation with metal reinforcement",
      "Insulation that includes earthing"
    ],
    correctAnswer: 1,
    explanation: "Reinforced insulation is a single insulation system that provides the same level of protection as double insulation through enhanced materials and construction."
  },
  {
    id: 8,
    question: "What is the minimum insulation resistance for Class II equipment?",
    options: [
      "0.5 megohms",
      "1 megohm",
      "2 megohms",
      "5 megohms"
    ],
    correctAnswer: 2,
    explanation: "The minimum insulation resistance for Class II equipment is typically 2 megohms when tested at 500V DC."
  },
  {
    id: 9,
    question: "Which of these is typically Class II equipment?",
    options: [
      "Electric kettle",
      "Hair dryer",
      "Desktop computer",
      "Washing machine"
    ],
    correctAnswer: 1,
    explanation: "Hair dryers are typically Class II equipment with plastic construction and double insulation, requiring no earth connection."
  },
  {
    id: 10,
    question: "Why is visual inspection particularly important for Class II equipment?",
    options: [
      "To check the earth connection",
      "To verify insulation integrity as safety depends on it",
      "To identify the manufacturer",
      "To read the voltage rating"
    ],
    correctAnswer: 1,
    explanation: "Visual inspection is critical for Class II equipment because safety depends entirely on insulation integrity - any damage to the insulation could compromise safety."
  }
];

const faqs = [
  {
    question: "Why doesn't Class II equipment need an earth connection?",
    answer: "Class II equipment uses double or reinforced insulation instead of protective earthing. Two independent insulation barriers protect against shock, so even if one fails, the other maintains safety. This design philosophy eliminates the need for earth connections."
  },
  {
    question: "How do I identify Class II equipment?",
    answer: "Look for the square within a square symbol on the equipment label. Also check for a two-core cable (no earth conductor), plastic construction, and no accessible metalwork connected to internal components."
  },
  {
    question: "Can Class II equipment have metal parts?",
    answer: "Yes, but any metal parts must be completely isolated from live parts by double or reinforced insulation. The metal cannot be connected to earth and must not be capable of becoming live under any fault condition."
  },
  {
    question: "What happens if a Class II appliance fails insulation resistance testing?",
    answer: "The equipment should be removed from service immediately. Failed insulation indicates the double insulation barrier may be compromised. Investigate for damage, moisture ingress, or material degradation. The equipment usually needs repair or replacement."
  },
  {
    question: "Is Class II equipment safer than Class I?",
    answer: "Neither class is inherently safer - they use different approaches to achieve safety. Class I relies on earthing, Class II on insulation. Both are equally safe when properly maintained. Class II may be preferred in some environments where earth connections are unreliable."
  }
];

const PATTestingModule2Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/pat-testing-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Class II: Double Insulation Principles
          </h1>
          <p className="text-white/80">
            Understanding double-insulated equipment and its testing requirements
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Protection:</strong> Double or reinforced insulation</li>
              <li><strong>Cable:</strong> Two-core (L, N only)</li>
              <li><strong>Symbol:</strong> Square within a square</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> No earth pin, plastic case, double-square symbol</li>
              <li><strong>Use:</strong> Insulation resistance test only (no earth test)</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define Class II equipment and its double insulation principles",
              "Distinguish between basic, supplementary, and reinforced insulation",
              "Identify Class II markings and symbols on equipment",
              "Understand construction requirements for double insulation",
              "Recognise common types of Class II appliances",
              "Apply appropriate PAT testing procedures for Class II"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What is Class II Equipment? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is Class II Equipment?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Class II equipment offers an alternative approach to electrical safety through double or reinforced insulation rather than protective earthing. This design philosophy eliminates the need for earth connections whilst maintaining equivalent safety levels.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Definition</p>
              <p className="text-sm text-white">
                Class II equipment has double insulation or reinforced insulation and no provision for protective earthing. Protection against electric shock does not rely upon basic insulation only, but upon an additional safety precaution such as double insulation or reinforced insulation.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Essential Characteristics:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Double or reinforced insulation system</li>
                <li>Two-core supply cable (Live and Neutral only)</li>
                <li>No accessible earthed metalwork</li>
                <li>Square-within-square symbol</li>
                <li>Independent protection layers</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Safety Principle:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Basic insulation provides primary protection</li>
                <li>Supplementary insulation acts as backup</li>
                <li>Two independent barriers prevent shock</li>
                <li>Failure of one barrier still maintains safety</li>
                <li>No reliance on external earthing system</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Double Insulation Construction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Double Insulation Construction
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Double insulation consists of two independent insulation systems that work together to provide comprehensive protection against electric shock.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Basic Insulation</p>
                <p className="text-sm text-white mb-2">Primary protection layer:</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Directly applied to live parts</li>
                  <li>Prevents direct contact during normal use</li>
                  <li>Wire insulation and component housings</li>
                  <li>Must withstand working voltage</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Supplementary Insulation</p>
                <p className="text-sm text-white mb-2">Secondary protection layer:</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Independent of basic insulation</li>
                  <li>Provides protection if basic fails</li>
                  <li>Additional barriers and spacing</li>
                  <li>Must meet separate requirements</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Reinforced Insulation</p>
                <p className="text-sm text-white mb-2">Alternative single system:</p>
                <ul className="text-sm text-white space-y-1 ml-4">
                  <li>Single insulation system</li>
                  <li>Equivalent to double insulation</li>
                  <li>Enhanced materials and construction</li>
                  <li>Same safety level as double</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Construction Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Construction Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Material Requirements</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Insulation Materials:</strong> Must resist electrical, thermal, and mechanical stress throughout equipment life</li>
                <li><strong>Clearances and Creepage:</strong> Minimum distances through air and over surfaces between live parts and accessible surfaces</li>
                <li><strong>Barrier Integrity:</strong> Physical barriers must prevent direct access to live parts even with tool assistance</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Design Constraints</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>No Earthed Metal Parts:</strong> Accessible metalwork must not be connected to earth or capable of becoming live</li>
                <li><strong>Metal Enclosures:</strong> If metal cases are used, they must be completely enclosed by insulating material</li>
                <li><strong>Cable Entry:</strong> Two-core cables only, with proper strain relief and insulation coordination</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 04: Common Class II Equipment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Common Class II Equipment Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Portable Tools</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Hair dryers</li>
                  <li>Electric shavers</li>
                  <li>Small drills</li>
                  <li>Soldering irons</li>
                  <li>Hot air guns</li>
                  <li>Jigsaws</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Household Items</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Table lamps</li>
                  <li>Electric blankets</li>
                  <li>Radios</li>
                  <li>CD/DVD players</li>
                  <li>Small TVs</li>
                  <li>Phone chargers</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">IT Equipment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Laptop computers</li>
                  <li>Tablet chargers</li>
                  <li>Portable speakers</li>
                  <li>External hard drives</li>
                  <li>Wi-Fi routers</li>
                  <li>LED monitors</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Specialist Equipment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Medical devices</li>
                  <li>Audio equipment</li>
                  <li>Laboratory instruments</li>
                  <li>Educational equipment</li>
                  <li>Measurement tools</li>
                  <li>Control equipment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: PAT Testing Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            PAT Testing Requirements for Class II
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Class II equipment has specific testing requirements that differ from Class I equipment due to the absence of earthed parts and reliance on insulation for protection.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Required Tests</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Visual inspection (critical for insulation assessment)</li>
                <li>Insulation resistance test (between live parts and accessible surfaces)</li>
                <li>Functional test (where appropriate)</li>
                <li>Protective conductor current test (if any earthed parts present)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Tests NOT Required</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Earth continuity test (no earth connection)</li>
                <li>Earth leakage current test (typically)</li>
                <li>Polarity test (no earth reference)</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Insulation Resistance Test Parameters</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Test Voltage:</strong> 500V DC</li>
                <li><strong>Minimum Resistance:</strong> 2 megohms (BS 7671)</li>
                <li><strong>Test Duration:</strong> Typically 1 minute</li>
                <li><strong>Between:</strong> Live parts and accessible surfaces</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 06: Real World Application */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Real World Application
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Case Study: Office Desk Lamp Insulation Failure</p>
              <div className="text-sm text-white space-y-2">
                <p><strong>Situation:</strong> During routine PAT testing, a Class II desk lamp shows an insulation resistance of 0.8 megohms, below the required 2 megohms minimum. The lamp appears undamaged and functions normally.</p>
                <p><strong>Investigation:</strong> Visual inspection reveals the plastic housing has a small crack near the base where the cable enters, potentially compromising the supplementary insulation barrier.</p>
                <p><strong>The Risk:</strong> With compromised double insulation, the lamp no longer meets Class II safety requirements and could present a shock hazard if the basic insulation also fails.</p>
                <p><strong>The Action:</strong> The lamp was immediately removed from service and replaced. The failed unit was examined further, revealing moisture ingress through the crack had affected insulation properties.</p>
                <p><strong>The Lesson:</strong> Class II equipment safety depends entirely on insulation integrity. Small physical damage can compromise the double insulation system, making thorough visual inspection and insulation testing crucial.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Testing Class II Equipment</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Confirm equipment is Class II before selecting tests</li>
                <li>Skip earth continuity test - not required</li>
                <li>Focus on visual inspection and insulation resistance</li>
                <li>Test between live parts and any accessible surfaces</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Visual Inspection Focus Areas</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check plastic enclosure for cracks or damage</li>
                <li>Examine cable entry points for strain</li>
                <li>Look for signs of overheating or discolouration</li>
                <li>Verify double-square symbol is present</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Performing earth continuity test</strong> - wastes time and may give misleading results</li>
                <li><strong>Assuming all plastic equipment is Class II</strong> - always verify with symbols</li>
                <li><strong>Ignoring small cracks in housings</strong> - can compromise insulation integrity</li>
                <li><strong>Not checking cable condition</strong> - damaged cable insulation affects safety</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
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

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default PATTestingModule2Section3;
