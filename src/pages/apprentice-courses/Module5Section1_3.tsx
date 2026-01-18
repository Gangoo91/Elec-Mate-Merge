import { ArrowLeft, ArrowRight, CheckCircle, ChevronDown, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";
import { useState } from "react";

const TITLE = "Electrical Symbols and Conventions - Module 5.1.3 | Level 2 Electrical Course";
const DESCRIPTION = "Master electrical symbols from BS 7671 and common site conventions. Learn to interpret lighting, power, switch, and containment symbols for accurate installations.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What does a circle with a cross usually represent?",
    options: ["A socket outlet", "A ceiling light", "A switch", "A distribution board"],
    correctIndex: 1,
    explanation: "A circle with a cross is the standard BS symbol for a ceiling light or luminaire fitting."
  },
  {
    id: 2,
    question: "What must always be checked for site-specific symbols?",
    options: ["The scale", "The legend", "The date", "The title"],
    correctIndex: 1,
    explanation: "The legend must always be checked as symbols may vary between drawings or projects, even when following BS standards."
  },
  {
    id: 3,
    question: "Which regulation defines UK electrical symbols?",
    options: ["BS 7909", "BS 5839", "BS 7671", "BS 6351"],
    correctIndex: 2,
    explanation: "BS 7671 (IET Wiring Regulations) defines the standard electrical symbols used in the UK."
  }
];

const Module5Section1_3 = () => {
  useSEO(TITLE, DESCRIPTION);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const quizQuestions = [
    {
      id: 1,
      question: "Why are symbols used in electrical drawings?",
      options: [
        "To make drawings look professional",
        "To communicate clearly and avoid clutter",
        "To save ink when printing",
        "To confuse other trades"
      ],
      correctAnswer: 1,
      explanation: "Symbols provide clear communication while reducing clutter on drawings, making them easier to read and interpret."
    },
    {
      id: 2,
      question: "What does a circle with a cross represent?",
      options: [
        "A socket outlet",
        "A ceiling light",
        "A switch",
        "A junction box"
      ],
      correctAnswer: 1,
      explanation: "A circle with a cross is the standard symbol for a ceiling light or luminaire."
    },
    {
      id: 3,
      question: "Which regulation defines UK electrical symbols?",
      options: [
        "BS 7909",
        "BS 5839",
        "BS 7671",
        "BS 6351"
      ],
      correctAnswer: 2,
      explanation: "BS 7671 (IET Wiring Regulations) defines the standard electrical symbols used in the UK."
    },
    {
      id: 4,
      question: "True or False: Site-specific symbols are never used.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False. Site-specific symbols may be used to clarify particular installations, which is why checking the legend is essential."
    },
    {
      id: 5,
      question: "What does 'S' in a square usually mean?",
      options: [
        "Socket",
        "Switch",
        "Supply",
        "Safety device"
      ],
      correctAnswer: 1,
      explanation: "'S' in a square is the standard symbol for a switch."
    },
    {
      id: 6,
      question: "Why must the legend always be checked?",
      options: [
        "It's a legal requirement",
        "Symbols may differ between projects",
        "To waste time",
        "It's not necessary"
      ],
      correctAnswer: 1,
      explanation: "Symbols may vary between projects or include site-specific variations, making the legend essential for accurate interpretation."
    },
    {
      id: 7,
      question: "Give one example of a power symbol.",
      options: [
        "Circle with cross",
        "Double circle for socket outlet",
        "S in a square",
        "Single line"
      ],
      correctAnswer: 1,
      explanation: "A double circle represents a socket outlet, which is a power symbol."
    },
    {
      id: 8,
      question: "What happens if a symbol is misinterpreted?",
      options: [
        "Nothing serious",
        "Wrong installation, delays, and rework",
        "The drawing is automatically updated",
        "Other trades will fix it"
      ],
      correctAnswer: 1,
      explanation: "Misinterpreting symbols leads to incorrect installations, causing delays, waste, and requiring costly rework."
    },
    {
      id: 9,
      question: "Which category of symbols represents trunking or conduit?",
      options: [
        "Lighting",
        "Power",
        "Containment",
        "Switches"
      ],
      correctAnswer: 2,
      explanation: "Containment symbols represent trunking, conduit, and other cable management systems."
    },
    {
      id: 10,
      question: "Who should you ask if you don't recognise a symbol?",
      options: [
        "Another apprentice",
        "The client",
        "The supervisor or site manager",
        "Nobody, just guess"
      ],
      correctAnswer: 2,
      explanation: "Always ask your supervisor or site manager when you don't recognise a symbol to ensure correct installation."
    }
  ];

  const faqs = [
    {
      question: "Are all electrical symbols the same across different projects?",
      answer: "Most follow BS 7671 standards, but there can be variations. Always check the legend and symbol key for each set of drawings as different designers may use slight variations or additional symbols."
    },
    {
      question: "What should I do if I don't recognise a symbol?",
      answer: "Never guess. Always ask your supervisor or check the drawing legend. Keep BS 7671 reference materials accessible for quick symbol verification."
    },
    {
      question: "How do I differentiate between similar symbols?",
      answer: "Pay attention to small details like the number of circles, lines, or additional markings. When in doubt, refer to the legend or ask for clarification."
    },
    {
      question: "Can symbols be modified for specific installations?",
      answer: "Yes, site-specific symbols may be used for unique installations or equipment. These must be clearly explained in the drawing legend."
    },
    {
      question: "What happens if I install based on wrong symbol interpretation?",
      answer: "Wrong installation leads to delays, material waste, costly rework, and potentially compromised safety and compliance. Always verify unclear symbols."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 5</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 5.1.3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Electrical Symbols and Conventions
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master electrical symbols from BS 7671 and common site conventions for accurate installation work.
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="list-disc pl-5 space-y-1 text-white/80 text-sm">
                  <li>Electrical drawings use standardised symbols from BS 7671 to communicate clearly.</li>
                  <li>Main categories include lighting, power, switches, and containment symbols.</li>
                  <li>Always check site legends for project-specific variations.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-5 space-y-1 text-white/80 text-sm">
                  <li><strong>Spot:</strong> Circle with cross (lights), double circle (sockets), S in square (switches).</li>
                  <li><strong>Use:</strong> Legend to verify symbols, BS 7671 for standard meanings.</li>
                  <li><strong>Check:</strong> Site-specific symbols, containment routes, symbol variations.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-white/80">
              <li>Recognise standard electrical symbols from BS 7671.</li>
              <li>Interpret common site conventions used in electrical drawings.</li>
              <li>Differentiate between symbol types for wiring, containment, and accessories.</li>
              <li>Apply knowledge of symbols to read and implement installation drawings.</li>
            </ul>
          </section>

          {/* Purpose of Symbols */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Purpose of Symbols
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Electrical symbols serve essential communication functions in technical drawings:
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-3">Communication and Clarity</p>

                <p className="mb-2"><strong className="text-white">Universal understanding:</strong> Symbols provide a standardised language.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Clear communication across all electrical trades</li>
                  <li>Reduces misunderstandings and installation errors</li>
                  <li>Maintains consistency across different projects</li>
                  <li>Enables quick recognition of electrical components</li>
                </ul>

                <p className="mb-2"><strong className="text-white">Drawing efficiency:</strong> Symbols reduce clutter and improve readability.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Avoids lengthy text descriptions</li>
                  <li>Keeps drawings clean and professional</li>
                  <li>Allows more information in less space</li>
                  <li>Makes complex installations easier to understand</li>
                </ul>

                <p className="text-sm text-white/60 mt-3">
                  <strong>Key principle:</strong> Symbols are the universal language of electrical engineering
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="symbols-purpose-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <div className="border-t border-white/10 my-8" />

          {/* Categories of Symbols */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Categories of Symbols
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Electrical symbols are organised into main categories for different system components:
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-3">Main Symbol Categories</p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="mb-2"><strong className="text-white">Lighting symbols:</strong></p>
                    <ul className="text-sm ml-4 mb-2 list-disc space-y-1">
                      <li>Circle with cross = ceiling light</li>
                      <li>Pendant symbols for hanging lights</li>
                      <li>Emergency lighting indicators</li>
                      <li>Spotlight and downlight variations</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2"><strong className="text-white">Power symbols:</strong></p>
                    <ul className="text-sm ml-4 mb-2 list-disc space-y-1">
                      <li>Double circle = socket outlet</li>
                      <li>Switched socket variations</li>
                      <li>Special purpose outlets (cooker, shower)</li>
                      <li>Industrial socket symbols</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2"><strong className="text-white">Switch symbols:</strong></p>
                    <ul className="text-sm ml-4 mb-2 list-disc space-y-1">
                      <li>"S" in a square = switch</li>
                      <li>Multi-way switch indicators</li>
                      <li>Dimmer switch symbols</li>
                      <li>PIR and sensor switches</li>
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2"><strong className="text-white">Containment symbols:</strong></p>
                    <ul className="text-sm ml-4 mb-2 list-disc space-y-1">
                      <li>Lines with marks = trunking/conduit</li>
                      <li>Cable tray indicators</li>
                      <li>Underground cable routes</li>
                      <li>Cable ladder and basket tray</li>
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-white/60 mt-3">
                  <strong>Remember:</strong> Each category has multiple variations - always check the legend
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="symbols-categories-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <div className="border-t border-white/10 my-8" />

          {/* BS 7671 Standards */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              BS 7671 Standards
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                All electrical symbols must comply with BS 7671 for consistency and safety:
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-3">Regulatory Compliance</p>

                <p className="mb-2"><strong className="text-white">BS 7671 requirements:</strong> Standard symbols for all UK installations.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>All drawings must use approved BS 7671 symbols</li>
                  <li>Ensures consistency across the electrical industry</li>
                  <li>Maintains safety standards and reduces errors</li>
                  <li>Provides legal compliance for installations</li>
                </ul>

                <p className="mb-2"><strong className="text-white">Professional standards:</strong> Using correct symbols demonstrates competence.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Shows understanding of electrical standards</li>
                  <li>Builds confidence with clients and supervisors</li>
                  <li>Prevents installation errors and disputes</li>
                  <li>Meets professional certification requirements</li>
                </ul>

                <p className="text-sm text-white/60 mt-3">
                  <strong>Important:</strong> Stay updated with BS 7671 amendments and symbol changes
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="bs7671-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <div className="border-t border-white/10 my-8" />

          {/* Common Site Conventions */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Common Site Conventions
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                While following BS standards, sites may use variations for specific requirements:
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-white mb-3">Site-Specific Adaptations</p>

                <p className="mb-2"><strong className="text-white">Adapted symbols:</strong> Sites may modify symbols for clarity.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Arrows for cable run directions</li>
                  <li>Numbers for circuit identification</li>
                  <li>Shading for different electrical zones</li>
                  <li>Special symbols for unique equipment</li>
                </ul>

                <p className="mb-2"><strong className="text-white">Legend provision:</strong> Every drawing must include comprehensive legends.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Explains all symbols used on the drawing</li>
                  <li>Defines abbreviations and reference codes</li>
                  <li>Shows any site-specific variations</li>
                  <li>Must be checked before starting work</li>
                </ul>

                <p className="text-sm text-white/60 mt-3">
                  <strong>Golden rule:</strong> Always check the legend first - never assume symbol meanings
                </p>
              </div>
            </div>
          </section>

          <div className="border-t border-white/10 my-8" />

          {/* Errors and Misinterpretation */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Errors and Misinterpretation
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Understanding common errors helps prevent costly installation mistakes:
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-red-500/50">
                <p className="font-medium text-white mb-3">Common Errors and Prevention</p>

                <p className="mb-2"><strong className="text-white">Symbol interpretation errors:</strong> Common mistakes and their consequences.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Not checking legends causes costly mistakes</li>
                  <li>Mixing up similar symbols (lighting vs. power)</li>
                  <li>Assuming symbols without verification</li>
                  <li>Using outdated symbol references</li>
                </ul>

                <p className="mb-2"><strong className="text-white">Prevention strategies:</strong> Avoiding symbol-related errors.</p>
                <ul className="text-sm ml-4 mb-3 list-disc space-y-1">
                  <li>Always double-check unfamiliar symbols</li>
                  <li>Keep BS 7671 reference materials accessible</li>
                  <li>Ask supervisors when uncertain</li>
                  <li>Cross-reference with specifications</li>
                </ul>

                <p className="text-sm text-white/60 mt-3">
                  <strong>Consequences:</strong> Wrong installation, delays, material waste, and costly rework
                </p>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Real-World Example
            </h2>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-white/80">
                  <p className="font-medium text-white mb-2">Office Refurbishment Symbol Mix-up</p>
                  <p className="text-sm mb-3">
                    An apprentice misread a lighting symbol and installed a pendant luminaire instead of a recessed
                    downlight in a suspended ceiling. The error wasn't discovered until the ceiling tiles were fitted.
                    This required:
                  </p>
                  <ul className="text-sm list-disc ml-4 space-y-1 mb-3">
                    <li>Removing and replacing the incorrect luminaire</li>
                    <li>Cutting new ceiling tile openings</li>
                    <li>Additional cable work for the recessed fitting</li>
                    <li>Two days of delays affecting other trades</li>
                  </ul>
                  <p className="text-sm font-medium text-white">
                    This £300 mistake could have been avoided by checking the legend and confirming the symbol
                    interpretation with the supervisor.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-white/10 rounded-lg overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-4 text-left min-h-[48px] touch-manipulation active:bg-white/5"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-medium text-white pr-4">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-white/60 flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4 text-white/70 text-sm border-t border-white/10 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Pocket Guide */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Pocket Guide
            </h2>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="grid md:grid-cols-2 gap-4 text-sm text-white/80">
                <div className="space-y-2">
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Always refer to BS 7671 standards</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Memorise common lighting, socket, and switch symbols</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Double-check site-specific legends</span>
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>When unsure, confirm before installing</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Keep symbol reference charts handy</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Ask supervisors about unfamiliar symbols</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Recap
            </h2>
            <div className="text-white/80 space-y-4">
              <p>In this subsection, you learned:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Why symbols and conventions matter for clear communication</li>
                <li>The main symbol categories: lighting, power, switches, and containment</li>
                <li>The importance of BS 7671 compliance and checking legends</li>
                <li>How errors occur when symbols are misinterpreted</li>
                <li>Prevention strategies for accurate symbol interpretation</li>
              </ul>
              <p className="mt-4 font-medium text-elec-yellow">
                Accurate symbol interpretation ensures safe, compliant, and efficient electrical installations.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <div className="mb-10">
            <Quiz
              title="Symbols and Conventions Quiz"
              questions={quizQuestions}
            />
          </div>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-2">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-4">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module5Section1_3;
