import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Overview of Appliance Classes - PAT Testing Module 2 Section 1";
const DESCRIPTION = "Learn about the IEC classification system for electrical equipment, including Class I, II, and III appliances and their protection methods against electric shock.";

const quickCheckQuestions = [
  {
    id: "m2s1-check1",
    question: "What does the IEC classification system primarily categorise?",
    options: [
      "Equipment voltage ratings",
      "Equipment protection methods against electric shock",
      "Equipment power consumption",
      "Equipment manufacturing standards"
    ],
    correctIndex: 1,
    explanation: "The IEC classification system categorises electrical equipment based on the method of protection against electric shock, with Class I, II, and III representing different safety approaches."
  },
  {
    id: "m2s1-check2",
    question: "Which symbol indicates Class II equipment?",
    options: [
      "Earth symbol",
      "Square within a square",
      "Three horizontal lines",
      "Lightning bolt"
    ],
    correctIndex: 1,
    explanation: "Class II equipment is marked with a square within a square symbol, indicating double insulation protection."
  },
  {
    id: "m2s1-check3",
    question: "What is the maximum voltage for Class III equipment?",
    options: [
      "12V",
      "24V",
      "50V AC",
      "110V"
    ],
    correctIndex: 2,
    explanation: "Class III equipment operates at Safety Extra Low Voltage (SELV), which is typically below 50V AC or 120V DC under normal conditions."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does the IEC classification system primarily categorise?",
    options: [
      "Equipment voltage ratings",
      "Equipment protection methods against electric shock",
      "Equipment power consumption",
      "Equipment manufacturing standards"
    ],
    correctAnswer: 1,
    explanation: "The IEC classification system categorises electrical equipment based on the method of protection against electric shock."
  },
  {
    id: 2,
    question: "Which symbol indicates Class II equipment?",
    options: [
      "Earth symbol",
      "Square within a square",
      "Three horizontal lines",
      "Lightning bolt"
    ],
    correctAnswer: 1,
    explanation: "Class II equipment is marked with a square within a square symbol, indicating double insulation protection."
  },
  {
    id: 3,
    question: "What is the maximum voltage for Class III equipment?",
    options: [
      "12V",
      "24V",
      "50V AC",
      "110V"
    ],
    correctAnswer: 2,
    explanation: "Class III equipment operates at Safety Extra Low Voltage (SELV), which is typically below 50V AC or 120V DC under normal conditions."
  },
  {
    id: 4,
    question: "Why is equipment classification important for PAT testing?",
    options: [
      "It determines the colour of test labels",
      "It determines which tests are required and test parameters",
      "It determines how often equipment needs testing",
      "It determines who can perform the testing"
    ],
    correctAnswer: 1,
    explanation: "Equipment classification determines the specific tests required, test parameters, and acceptance criteria for PAT testing."
  },
  {
    id: 5,
    question: "What does 'basic insulation' provide?",
    options: [
      "Protection against direct contact only",
      "Protection against both direct and indirect contact",
      "Protection against overcurrent",
      "Protection against overvoltage"
    ],
    correctAnswer: 0,
    explanation: "Basic insulation provides protection against direct contact with live parts under normal operating conditions."
  },
  {
    id: 6,
    question: "What is the primary protection method for Class I equipment?",
    options: [
      "Double insulation",
      "Basic insulation plus protective earthing",
      "Extra low voltage",
      "Reinforced insulation"
    ],
    correctAnswer: 1,
    explanation: "Class I equipment relies on basic insulation combined with protective earthing for safety."
  },
  {
    id: 7,
    question: "How many cores does a Class I cable typically have?",
    options: [
      "One core",
      "Two cores",
      "Three cores",
      "Four cores"
    ],
    correctAnswer: 2,
    explanation: "Class I equipment has a three-core cable containing live, neutral, and earth conductors."
  },
  {
    id: 8,
    question: "Where should you look for classification markings on equipment?",
    options: [
      "Only on the plug",
      "Only in the user manual",
      "Nameplate, underside, rear, plug, or manual",
      "Only on the power cable"
    ],
    correctAnswer: 2,
    explanation: "Classification markings can be found on the nameplate, underside, rear, plug, cable markings, or in the user manual."
  },
  {
    id: 9,
    question: "What type of insulation does Class II equipment have?",
    options: [
      "Basic insulation only",
      "Basic insulation plus earthing",
      "Double or reinforced insulation",
      "No insulation required"
    ],
    correctAnswer: 2,
    explanation: "Class II equipment has double or reinforced insulation, providing two independent layers of protection."
  },
  {
    id: 10,
    question: "What should you do if classification markings are missing from equipment?",
    options: [
      "Refuse to test the equipment",
      "Assume it is Class III",
      "Examine physical characteristics and apply worst-case testing",
      "Only perform a visual inspection"
    ],
    correctAnswer: 2,
    explanation: "When markings are missing, examine the cable configuration and physical characteristics, then apply worst-case testing requirements."
  }
];

const faqs = [
  {
    question: "Why does equipment classification matter for PAT testing?",
    answer: "Classification determines which electrical tests are required, sets the pass/fail criteria, influences testing frequency, and ensures appropriate test equipment is used. Different classes have different safety mechanisms that require specific testing approaches."
  },
  {
    question: "How can I identify Class I equipment if the marking is missing?",
    answer: "Look for a three-core cable with an earth conductor, check for exposed earthed metal parts, and consider the typical class for that equipment type. You can also check manufacturer specifications or apply worst-case testing requirements."
  },
  {
    question: "What makes Class II equipment different from Class I?",
    answer: "Class II equipment uses double or reinforced insulation instead of protective earthing. It has a two-core cable (no earth) and no earthed metal parts. The symbol is a square within a square."
  },
  {
    question: "Is Class III equipment completely safe to touch?",
    answer: "Class III equipment operates at Safety Extra Low Voltage (below 50V AC), making it inherently safer. However, the power supply unit providing the low voltage still needs appropriate protection and testing."
  },
  {
    question: "Can equipment have characteristics of multiple classes?",
    answer: "Some equipment may incorporate elements of different protection methods. In such cases, identify the primary protection method used and follow the testing requirements for that class, or apply the most stringent testing regime."
  }
];

const PATTestingModule2Section1 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
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
            <span>Module 2 Section 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Overview of Appliance Classes
          </h1>
          <p className="text-white/80">
            Understanding IEC equipment classification for effective PAT testing
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Class I:</strong> Basic insulation + protective earthing</li>
              <li><strong>Class II:</strong> Double or reinforced insulation</li>
              <li><strong>Class III:</strong> Safety Extra Low Voltage (SELV)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Classification symbols on equipment labels</li>
              <li><strong>Use:</strong> Select correct tests based on equipment class</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the IEC classification system for electrical equipment",
              "Identify the three main appliance classes and their safety principles",
              "Recognise classification symbols and markings on equipment",
              "Understand how classification affects PAT testing requirements",
              "Apply classification knowledge to determine test procedures",
              "Handle equipment with missing or unclear markings"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: The IEC Classification System */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The IEC Classification System
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The International Electrotechnical Commission (IEC) has developed a standardised way to classify electrical equipment based on how it protects users from electric shock. This system is used worldwide and forms the basis for testing requirements in PAT procedures.
            </p>
            <p>
              Understanding how electrical equipment is classified is fundamental to effective PAT testing. The classification determines which tests are required, what parameters to measure, and what constitutes a pass or fail result.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why Classification Matters:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Determines which electrical tests are required</li>
                <li>Sets the pass/fail criteria for each test</li>
                <li>Influences testing frequency recommendations</li>
                <li>Helps identify potential safety risks</li>
                <li>Ensures appropriate test equipment is used</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: The Three Equipment Classes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Three Equipment Classes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Class I - Earthed Equipment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Basic insulation plus protective earthing</li>
                  <li>Three-core cable (Live, Neutral, Earth)</li>
                  <li>Metal case connected to earth</li>
                  <li>Requires earth continuity testing</li>
                  <li><strong>Symbol:</strong> Earth symbol</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Class II - Double Insulated</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Double or reinforced insulation</li>
                  <li>Two-core cable (Live and Neutral only)</li>
                  <li>No earthed metal parts</li>
                  <li>Insulation resistance testing required</li>
                  <li><strong>Symbol:</strong> Square within a square</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Class III - Extra Low Voltage</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Safety Extra Low Voltage (SELV)</li>
                  <li>Voltage below 50V AC</li>
                  <li>Isolated supply required</li>
                  <li>Limited testing required</li>
                  <li><strong>Symbol:</strong> Roman numeral III</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Protection Principles Explained */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Protection Principles Explained
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Basic Insulation</p>
              <p className="text-sm text-white mb-2">
                Provides protection against direct contact with live parts under normal operating conditions. This is the fundamental level of protection present in all electrical equipment.
              </p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Prevents touching live conductors</li>
                <li>Materials include plastic, rubber, and enamel</li>
                <li>Must withstand normal operating stress</li>
                <li>Can fail due to damage or deterioration</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Additional Protection Methods</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Protective Earthing:</strong> Creates a low-impedance path for fault current, enabling automatic disconnection</li>
                <li><strong>Double Insulation:</strong> Two independent layers of insulation provide backup if one fails</li>
                <li><strong>Extra Low Voltage:</strong> Voltage so low that contact is inherently safe under normal conditions</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Equipment Identification and Markings */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Equipment Identification and Markings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper identification of equipment class is crucial for determining the correct testing procedure. Manufacturers are required to mark equipment with appropriate symbols and information.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Where to Look for Markings</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Equipment nameplate or rating label</li>
                <li>Underside or rear of equipment</li>
                <li>Plug or cable markings</li>
                <li>User manual or documentation</li>
                <li>Equipment case moulding</li>
                <li>Power supply unit labels</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When Markings Are Missing</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Examine cable configuration (2 or 3 core)</li>
                <li>Check for exposed earthed metal parts</li>
                <li>Consider typical class for equipment type</li>
                <li>Consult manufacturer specifications</li>
                <li>Apply worst-case testing requirements</li>
                <li>Document assumptions made</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 05: Real World Application */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Real World Application
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Case Study: Mixed Equipment in Office Environment</p>
              <div className="text-sm text-white space-y-2">
                <p><strong>Situation:</strong> A PAT tester arrives at an office to test various equipment but notices the computer monitor has no visible class marking, whilst the desktop PC clearly shows a Class I symbol.</p>
                <p><strong>Investigation:</strong> Examining the monitor reveals a 3-core cable with earth conductor, metal case, and typical characteristics of Class I equipment, despite the missing symbol.</p>
                <p><strong>Decision:</strong> The tester correctly classifies the monitor as Class I and performs full earth continuity and insulation resistance testing.</p>
                <p><strong>The Lesson:</strong> Don't rely solely on markings - understand the physical characteristics and safety principles of each class to make informed decisions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Identifying Equipment Class</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always check the rating label first for class symbols</li>
                <li>Count the cores in the supply cable</li>
                <li>Look for earthed metalwork on the equipment</li>
                <li>Consider the typical class for that equipment type</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Before Starting Tests</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Confirm the equipment class before selecting tests</li>
                <li>Set PAT tester to appropriate test parameters</li>
                <li>Check test leads and probe condition</li>
                <li>Ensure equipment is disconnected from supply</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming class from appearance</strong> - always verify with markings or physical examination</li>
                <li><strong>Ignoring missing markings</strong> - investigate thoroughly and document findings</li>
                <li><strong>Using wrong test for class</strong> - earth continuity not required for Class II</li>
                <li><strong>Not checking power supplies</strong> - Class III equipment may have Class I or II power units</li>
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
            <Link to="/electrician/upskilling/pat-testing-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default PATTestingModule2Section1;
