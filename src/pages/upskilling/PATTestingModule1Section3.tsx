import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Types of Equipment Covered by PAT - PAT Testing Module 1";
const DESCRIPTION = "Learn which equipment types are covered by PAT testing, understand Class I and Class II classifications, and identify what's included and excluded from PAT testing scope.";

const quickCheckQuestions = [
  {
    id: "class-difference",
    question: "What's the difference between Class I and Class II equipment?",
    options: [
      "Class I is newer, Class II is older equipment",
      "Class I relies on earthing for protection, Class II uses double insulation",
      "Class I is portable, Class II is fixed",
      "Class I is low voltage, Class II is high voltage"
    ],
    correctIndex: 1,
    explanation: "Class I equipment relies on earthing for protection and must have earth continuity tested. Class II equipment uses double insulation for protection and typically only needs visual inspection and insulation resistance testing."
  },
  {
    id: "kettle-testing",
    question: "Does a kettle need PAT testing?",
    options: [
      "No, it's a kitchen appliance",
      "Only if it's portable",
      "Yes, it's Class I portable equipment",
      "Only in commercial kitchens"
    ],
    correctIndex: 2,
    explanation: "A kettle is Class I portable equipment that requires both visual inspection and electrical testing (including earth continuity) as part of PAT."
  },
  {
    id: "fixed-equipment",
    question: "Is a wall-mounted air conditioning unit 'portable'?",
    options: [
      "Yes, because it plugs in",
      "No, it's fixed equipment and not covered by PAT",
      "Only if it can be easily removed",
      "Yes, if it's under 18kg"
    ],
    correctIndex: 1,
    explanation: "Wall-mounted air conditioning units are considered fixed equipment and fall outside the scope of PAT testing, even if they have plugs for electrical connection."
  },
  {
    id: "battery-tools",
    question: "Which item is excluded from PAT testing?",
    options: [
      "Desktop computers",
      "Hand-held battery tools with no mains connection",
      "Extension leads",
      "Portable heaters"
    ],
    correctIndex: 1,
    explanation: "Hand-held battery tools with no mains connection (purely battery operated) are excluded from PAT testing as they don't connect to the mains electrical supply."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What's the difference between Class I and Class II equipment?",
    options: [
      "Class I is newer, Class II is older equipment",
      "Class I relies on earthing for protection, Class II uses double insulation",
      "Class I is portable, Class II is fixed",
      "Class I is low voltage, Class II is high voltage"
    ],
    correctAnswer: 1,
    explanation: "Class I equipment relies on earthing for protection and must be tested. Class II equipment uses double insulation and typically only needs visual inspection."
  },
  {
    id: 2,
    question: "Does a kettle need PAT testing?",
    options: [
      "No, it's a kitchen appliance",
      "Only if it's portable",
      "Yes, it's Class I portable equipment",
      "Only in commercial kitchens"
    ],
    correctAnswer: 2,
    explanation: "A kettle is Class I portable equipment that requires both visual inspection and electrical testing as part of PAT."
  },
  {
    id: 3,
    question: "Is a wall-mounted air conditioning unit 'portable'?",
    options: [
      "Yes, because it plugs in",
      "No, it's fixed equipment and not covered by PAT",
      "Only if it can be easily removed",
      "Yes, if it's under 18kg"
    ],
    correctAnswer: 1,
    explanation: "Wall-mounted air conditioning units are considered fixed equipment and fall outside the scope of PAT testing, even if they have plugs."
  },
  {
    id: 4,
    question: "Should laptop chargers be tested?",
    options: [
      "No, they're too small",
      "Only the laptop itself",
      "Yes, chargers are portable equipment",
      "Only if they're damaged"
    ],
    correctAnswer: 2,
    explanation: "Laptop chargers are portable equipment and should be included in PAT testing as they can pose electrical safety risks."
  },
  {
    id: 5,
    question: "Which item is excluded from PAT testing?",
    options: [
      "Desktop computers",
      "Hand-held battery tools with no mains connection",
      "Extension leads",
      "Portable heaters"
    ],
    correctAnswer: 1,
    explanation: "Hand-held battery tools with no mains connection (purely battery operated) are excluded from PAT testing as they don't connect to the mains electrical supply."
  },
  {
    id: 6,
    question: "What symbol indicates Class II (double insulated) equipment?",
    options: [
      "A triangle symbol",
      "A square within a square",
      "A circle with a line",
      "An earth symbol"
    ],
    correctAnswer: 1,
    explanation: "Class II equipment is marked with a square within a square symbol, indicating double insulation protection without requiring an earth connection."
  },
  {
    id: 7,
    question: "Which type of equipment typically requires the most frequent PAT testing?",
    options: [
      "Office computers",
      "Hand-held power tools on construction sites",
      "Double-insulated phone chargers",
      "Fixed-position IT equipment"
    ],
    correctAnswer: 1,
    explanation: "Hand-held power tools on construction sites typically need the most frequent testing (every 3 months) due to harsh conditions and high risk of damage."
  },
  {
    id: 8,
    question: "Is a freestanding vending machine considered portable equipment?",
    options: [
      "No, because it's heavy",
      "Yes, if it has a plug and can be moved",
      "Only if it's on wheels",
      "Never, vending machines are excluded from PAT"
    ],
    correctAnswer: 1,
    explanation: "A freestanding vending machine with a plug is considered portable equipment for PAT purposes, regardless of weight, as it can be moved and connected to different locations."
  },
  {
    id: 9,
    question: "What determines whether equipment is 'portable' for PAT purposes?",
    options: [
      "Weight under 10kg",
      "Whether it can be moved while connected or moved between uses",
      "Having a battery option",
      "Being less than 5 years old"
    ],
    correctAnswer: 1,
    explanation: "Equipment is 'portable' if it can be moved while in operation or moved between different locations for use. Weight alone doesn't determine portability."
  },
  {
    id: 10,
    question: "Which of these requires different PAT testing approaches?",
    options: [
      "A metal-cased kettle vs a plastic kettle",
      "A large printer vs a small printer",
      "Class I equipment vs Class II equipment",
      "New equipment vs old equipment"
    ],
    correctAnswer: 2,
    explanation: "Class I and Class II equipment require different testing approaches. Class I needs earth continuity testing, while Class II (double insulated) doesn't require earth testing."
  }
];

const faqs = [
  {
    question: "How do I identify if equipment is Class I or Class II?",
    answer: "Class II equipment is marked with a square-within-square symbol and has no earth connection in the plug. Class I equipment typically has metal parts that could become live if insulation fails and has an earth connection. If unsure, check the rating plate or manufacturer documentation."
  },
  {
    question: "Does personal equipment brought into work need PAT testing?",
    answer: "Yes, personal equipment used in the workplace (phone chargers, fans, heaters) should be included in PAT testing. Employers remain responsible for electrical safety of all equipment used on their premises, regardless of ownership."
  },
  {
    question: "Are extension leads considered portable equipment?",
    answer: "Yes, extension leads are definitely portable equipment and should be included in PAT testing. They often fail tests due to damage from being moved, trodden on, and repeatedly connected/disconnected. Many consider them high-priority items."
  },
  {
    question: "What about equipment with detachable leads?",
    answer: "Both the equipment and its detachable lead should be tested. The IEC lead (kettle lead/figure-8 lead) is itself portable equipment and should be tested separately. Keep leads with their equipment or test and label them individually."
  },
  {
    question: "Is medical equipment covered by PAT?",
    answer: "Medical equipment has separate, more stringent testing requirements under different regulations. While general workplace PAT principles apply, medical devices typically require specialised testing by qualified biomedical engineers following specific standards."
  },
  {
    question: "Do battery chargers need PAT testing?",
    answer: "Yes, mains-powered battery chargers (for tools, phones, laptops, etc.) are portable equipment requiring PAT testing. The charger connects to mains supply and poses the same risks as other portable equipment. The battery-powered tool itself doesn't need PAT."
  }
];

const PATTestingModule1Section3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/electrician/upskilling/pat-testing-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1 Section 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Types of Equipment Covered by PAT
          </h1>
          <p className="text-white/80">
            Understanding what's in scope and what's excluded from PAT testing
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Class I:</strong> Earthed equipment - requires full testing</li>
              <li><strong>Class II:</strong> Double insulated - visual + insulation test</li>
              <li><strong>Portable:</strong> Can be moved while in use or between uses</li>
              <li><strong>Excluded:</strong> Fixed installations, battery-only tools</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Square-in-square symbol = Class II</li>
              <li><strong>Use:</strong> Check rating plates for classification</li>
              <li><strong>Apply:</strong> Different tests for different classes</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand what 'portable appliance' means in PAT context",
              "Distinguish between Class I and Class II equipment",
              "Identify common equipment types that require PAT testing",
              "Clarify what equipment doesn't need PAT testing",
              "Apply risk-based assessment to equipment categorisation",
              "Recognise equipment classification symbols and markings"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: Equipment Classification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Equipment Classification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Not everything with a plug needs PAT testing — but many things do. Understanding the classification system
              helps you identify which equipment requires testing and what tests to apply.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Class I Equipment</p>
                <p className="text-sm text-white mb-2">Earthed equipment — requires full testing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Relies on earthing for protection</li>
                  <li>Has exposed metal parts</li>
                  <li>Requires earth continuity testing</li>
                  <li>Examples: kettles, toasters, metal-cased drills</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-sm font-medium text-elec-yellow mb-2">Class II Equipment</p>
                <p className="text-sm text-white mb-2">Double insulated — visual + insulation test</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Uses double insulation for protection</li>
                  <li>No exposed metal parts</li>
                  <li>Usually visual inspection + insulation test only</li>
                  <li>Examples: phone chargers, plastic-cased radios</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Class II equipment is marked with a square-within-square symbol (□) and has no earth wire in the plug.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Common Equipment Categories */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Common Equipment Categories
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              PAT testing covers a wide range of portable electrical equipment used in workplaces. Here are the main categories:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">IT Equipment</p>
                <ul className="text-sm text-white space-y-0.5">
                  <li>Desktop computers and monitors</li>
                  <li>Printers and scanners</li>
                  <li>Laptop chargers</li>
                  <li>Network equipment and servers</li>
                  <li>Projectors and tablets</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Power Tools</p>
                <ul className="text-sm text-white space-y-0.5">
                  <li>Power drills and angle grinders</li>
                  <li>Sanders and saws</li>
                  <li>Vacuum cleaners</li>
                  <li>Pressure washers</li>
                  <li>Welding equipment</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Kitchen Appliances</p>
                <ul className="text-sm text-white space-y-0.5">
                  <li>Kettles and coffee machines</li>
                  <li>Microwaves and toasters</li>
                  <li>Fridges and freezers</li>
                  <li>Food processors</li>
                  <li>Water coolers</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Extension Equipment</p>
                <ul className="text-sm text-white space-y-0.5">
                  <li>Extension leads</li>
                  <li>Adapters and power strips</li>
                  <li>RCD units</li>
                  <li>Cable reels</li>
                  <li>Surge protectors</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: What's NOT Covered */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            What's NOT Covered by PAT
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-white mb-2">Excluded Equipment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Fixed electrical installations (part of building wiring)</li>
                  <li>Battery-only equipment (no mains connection)</li>
                  <li>Gas appliances</li>
                  <li>Medical equipment (under different regulations)</li>
                  <li>Equipment under 50V (except in specific environments)</li>
                  <li>Vehicle electrical systems</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">Common Misconceptions</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Hand dryers (usually fixed installation)</li>
                  <li>Ceiling fans (permanent installation)</li>
                  <li>Emergency lighting (building systems)</li>
                  <li>Pure battery tools (no mains charger)</li>
                  <li>Hardwired decorative lighting</li>
                  <li>Fixed CCTV systems</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> Just because something has a plug doesn't make it 'portable' for PAT purposes.
              Fixed equipment that happens to use a plug connection is still considered fixed installation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Equipment Risk Assessment */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Equipment Risk Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Not all equipment carries the same risk. Understanding risk levels helps prioritise testing resources
              and determine appropriate testing frequencies.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-white mb-2">High Risk Equipment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Hand-held power tools</li>
                  <li>Extension leads (especially outdoor)</li>
                  <li>Heating appliances</li>
                  <li>Equipment in wet environments</li>
                  <li>Portable machinery</li>
                </ul>
                <p className="text-xs text-elec-yellow/70 mt-2">Requires frequent testing and careful attention</p>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">Medium Risk Equipment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Kitchen appliances</li>
                  <li>IT equipment in offices</li>
                  <li>Moveable lighting</li>
                  <li>Audio-visual equipment</li>
                  <li>Small household appliances</li>
                </ul>
                <p className="text-xs text-elec-yellow/70 mt-2">Standard testing intervals apply</p>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-2">Lower Risk Equipment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Double insulated items</li>
                  <li>Fixed position IT equipment</li>
                  <li>Equipment in controlled environments</li>
                  <li>Infrequently used appliances</li>
                </ul>
                <p className="text-xs text-elec-yellow/70 mt-2">May require less frequent testing</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 5: Real World Scenario */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Real World Scenario
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Case Study: Hair Salon Equipment Oversight</p>
              <div className="space-y-3 text-sm text-white">
                <p>
                  <strong>Situation:</strong> A hair salon tested dryers, clippers, and extension cords — but missed the washing machine,
                  assuming it was out of scope because it was "too heavy to move."
                </p>
                <p>
                  <strong>The Reality:</strong> The washing machine was portable equipment with a standard plug that should have been
                  included in PAT testing. Weight doesn't determine portability.
                </p>
                <p>
                  <strong>The Lesson:</strong> Equipment weight or movement frequency doesn't determine PAT scope — connection type
                  and workplace use do. If it has a plug and can theoretically be moved, it needs testing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Identifying Equipment</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check rating plates for Class I or Class II symbols</li>
                <li>Look for the square-within-square symbol (Class II)</li>
                <li>Check if the plug has an earth connection (3-pin = likely Class I)</li>
                <li>Consider if equipment could be moved to different locations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Creating Equipment Registers</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Walk through all areas systematically</li>
                <li>Include personal equipment brought into the workplace</li>
                <li>Don't forget detachable leads (test separately)</li>
                <li>Record equipment class and location</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming heavy = fixed</strong> — weight doesn't determine if equipment is portable</li>
                <li><strong>Missing extension leads</strong> — they're high priority items often overlooked</li>
                <li><strong>Forgetting chargers</strong> — laptop and phone chargers need testing too</li>
                <li><strong>Excluding personal items</strong> — everything used at work should be tested</li>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Class I vs Class II</p>
                <ul className="space-y-0.5">
                  <li>Class I: Earthed, metal parts, needs earth test</li>
                  <li>Class II: Double insulated, □ symbol, no earth</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Excluded from PAT</p>
                <ul className="space-y-0.5">
                  <li>Fixed installations</li>
                  <li>Battery-only equipment</li>
                  <li>Medical devices (separate regs)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
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

export default PATTestingModule1Section3;
