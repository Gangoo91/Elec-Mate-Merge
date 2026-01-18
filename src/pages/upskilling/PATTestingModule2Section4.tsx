import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Class III: Extra-Low Voltage and SELV - PAT Testing Module 2 Section 4";
const DESCRIPTION = "Learn about Class III equipment and Safety Extra-Low Voltage (SELV) systems, including voltage limits, applications, and testing requirements.";

const quickCheckQuestions = [
  {
    id: "m2s4-check1",
    question: "What is the maximum voltage for SELV systems under normal conditions?",
    options: [
      "25V AC or 60V DC",
      "50V AC or 120V DC",
      "12V AC or 30V DC",
      "100V AC or 150V DC"
    ],
    correctIndex: 1,
    explanation: "SELV systems are limited to 50V AC or 120V DC under normal conditions to ensure safety through low voltage."
  },
  {
    id: "m2s4-check2",
    question: "What is the key requirement for Class III equipment power supplies?",
    options: [
      "They must be earthed",
      "They must be double insulated",
      "They must provide electrical separation from mains",
      "They must have RCD protection"
    ],
    correctIndex: 2,
    explanation: "Class III equipment must be supplied from sources with electrical separation from mains, typically through safety transformers."
  },
  {
    id: "m2s4-check3",
    question: "Why do Class III appliances require minimal PAT testing?",
    options: [
      "They are too small to test",
      "The low voltage makes them inherently safe",
      "They have built-in protection",
      "They are only used occasionally"
    ],
    correctIndex: 1,
    explanation: "The extra-low voltage in Class III equipment makes electric shock unlikely under normal conditions, reducing testing requirements."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the maximum voltage for SELV systems under normal conditions?",
    options: [
      "25V AC or 60V DC",
      "50V AC or 120V DC",
      "12V AC or 30V DC",
      "100V AC or 150V DC"
    ],
    correctAnswer: 1,
    explanation: "SELV systems are limited to 50V AC or 120V DC under normal conditions to ensure safety through low voltage."
  },
  {
    id: 2,
    question: "What does 'SELV' stand for?",
    options: [
      "Special Extra-Low Voltage",
      "Standard Electronic Low Voltage",
      "Safety Extra-Low Voltage",
      "Secure Equipment Low Voltage"
    ],
    correctAnswer: 2,
    explanation: "SELV stands for Safety Extra-Low Voltage, indicating a system designed for safety through voltage limitation."
  },
  {
    id: 3,
    question: "What is the key requirement for Class III equipment power supplies?",
    options: [
      "They must be earthed",
      "They must be double insulated",
      "They must provide electrical separation from mains",
      "They must have RCD protection"
    ],
    correctAnswer: 2,
    explanation: "Class III equipment must be supplied from sources with electrical separation from mains, typically through safety transformers."
  },
  {
    id: 4,
    question: "Which symbol indicates Class III equipment?",
    options: [
      "Earth symbol",
      "Square within square",
      "Roman numeral III",
      "Lightning bolt in triangle"
    ],
    correctAnswer: 2,
    explanation: "Class III equipment is marked with the Roman numeral III symbol to indicate extra-low voltage operation."
  },
  {
    id: 5,
    question: "Why do Class III appliances require minimal PAT testing?",
    options: [
      "They are too small to test",
      "The low voltage makes them inherently safe",
      "They have built-in protection",
      "They are only used occasionally"
    ],
    correctAnswer: 1,
    explanation: "The extra-low voltage in Class III equipment makes electric shock unlikely under normal conditions, reducing testing requirements."
  },
  {
    id: 6,
    question: "What type of power source is typically used for SELV systems?",
    options: [
      "Standard mains transformer",
      "Safety transformer with isolation",
      "Autotransformer",
      "Direct mains connection"
    ],
    correctAnswer: 1,
    explanation: "Safety transformers with double insulation between primary and secondary provide the isolation required for SELV systems."
  },
  {
    id: 7,
    question: "Where should a SELV transformer be located for bathroom lighting?",
    options: [
      "Inside the bathroom zone",
      "Outside the bathroom zone",
      "In the bathroom ceiling",
      "Behind the mirror"
    ],
    correctAnswer: 1,
    explanation: "SELV transformers must be located outside bathroom zones to maintain the safety integrity of the system."
  },
  {
    id: 8,
    question: "Which of these is typically Class III equipment?",
    options: [
      "Electric kettle",
      "Desktop computer",
      "Mobile phone charger output",
      "Washing machine"
    ],
    correctAnswer: 2,
    explanation: "Mobile phone charger outputs operate at SELV voltages (typically 5V), making the connected device Class III equipment."
  },
  {
    id: 9,
    question: "What is the main test required for Class III equipment?",
    options: [
      "Earth continuity test",
      "Insulation resistance test",
      "Visual inspection",
      "Flash test"
    ],
    correctAnswer: 2,
    explanation: "Visual inspection is the primary requirement for Class III equipment as electrical tests are typically not required due to the inherent safety of low voltage."
  },
  {
    id: 10,
    question: "Can SELV circuits be connected to earth?",
    options: [
      "Yes, they must be earthed",
      "No, they must be isolated from earth",
      "Only the negative side",
      "Only through a resistor"
    ],
    correctAnswer: 1,
    explanation: "SELV circuits must have no connection to earth to maintain their safety characteristics and isolation from other circuits."
  }
];

const faqs = [
  {
    question: "What makes SELV different from other low voltage systems?",
    answer: "SELV (Safety Extra-Low Voltage) specifically requires electrical separation from mains and earth. The low voltage alone is not enough - the system must be isolated through safety transformers or equivalent means to prevent any connection to higher voltages."
  },
  {
    question: "Do I need to PAT test laptop chargers?",
    answer: "The charger itself (the mains-connected unit) may need testing as it could be Class I or II depending on design. However, the laptop and its low-voltage cable are Class III and require only visual inspection. Always check the charger's classification markings."
  },
  {
    question: "Why are battery-powered devices considered Class III?",
    answer: "Battery-powered devices operate at extra-low voltage and have complete electrical separation from mains supply (when not charging). This makes them inherently safe from mains-voltage electric shock, meeting Class III requirements."
  },
  {
    question: "Can Class III equipment be used in bathrooms?",
    answer: "Yes, Class III equipment is ideal for bathrooms and other wet locations because the low voltage reduces shock risk. However, the SELV source (transformer) must be located outside the bathroom zones, with only the low-voltage circuit entering the bathroom."
  },
  {
    question: "What happens if a SELV transformer fails?",
    answer: "Safety transformers are designed so that if they fail, the secondary voltage cannot rise above SELV limits. However, the SELV source should be inspected regularly and replaced if damaged. The connected Class III equipment would stop working but should not become dangerous."
  }
];

const PATTestingModule2Section4 = () => {
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
            <span>Module 2 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Class III: Extra-Low Voltage and SELV
          </h1>
          <p className="text-white/80">
            Understanding safety through voltage limitation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Voltage:</strong> 50V AC or 120V DC maximum</li>
              <li><strong>Protection:</strong> Inherent safety through low voltage</li>
              <li><strong>Symbol:</strong> Roman numeral III</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Battery-powered, transformer-fed, III symbol</li>
              <li><strong>Use:</strong> Visual inspection only (minimal testing)</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define Class III equipment and SELV system principles",
              "Understand voltage limits and safety requirements",
              "Identify common applications of Class III equipment",
              "Recognise the role of safety transformers and isolation",
              "Understand why Class III requires minimal PAT testing",
              "Apply appropriate safety considerations for SELV"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What is Class III Equipment? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is Class III Equipment?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Class III equipment represents the safest category of electrical appliances, using extra-low voltage to minimise the risk of electric shock. These devices operate at voltages so low that under normal conditions, contact with live parts is not dangerous.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Definition</p>
              <p className="text-sm text-white">
                Class III equipment is designed to operate from Safety Extra-Low Voltage (SELV) sources and has no internal voltages higher than the SELV limits. Protection against electric shock relies on the supply voltage being limited to extra-low voltage.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Essential Characteristics:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Extra-low voltage operation (50V AC or less)</li>
                <li>SELV power supply required</li>
                <li>No internal voltage generation above SELV</li>
                <li>Marked with Roman numeral III</li>
                <li>Often battery-powered or transformer-fed</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Safety Principle:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Low voltage prevents dangerous shock</li>
                <li>Inherently safe through design</li>
                <li>No reliance on user behaviour</li>
                <li>Minimal protective measures needed</li>
                <li>Suitable for wet or conductive environments</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: SELV Systems */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Safety Extra-Low Voltage (SELV) Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              SELV systems provide the power source for Class III equipment and must meet specific requirements to maintain safety through voltage limitation.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Voltage Limits</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>AC:</strong> 50V RMS maximum</li>
                  <li><strong>DC:</strong> 120V ripple-free maximum</li>
                  <li><strong>Pulsating DC:</strong> 140V peak maximum</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Source Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Safety transformer (BS EN 61558)</li>
                  <li>Motor generator with equivalent isolation</li>
                  <li>Battery systems</li>
                  <li>Electronic power supply with isolation</li>
                  <li>Independent source from earth</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Isolation Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>No connection to earth</li>
                  <li>No connection to other circuits</li>
                  <li>Electrical separation from mains</li>
                  <li>Independent of protective conductors</li>
                  <li>Double insulation from higher voltages</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Common Applications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Common Class III Applications
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Portable Devices</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Mobile phones</li>
                  <li>Tablets</li>
                  <li>Cordless tools</li>
                  <li>Torches</li>
                  <li>Portable radios</li>
                  <li>Digital cameras</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Control Systems</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Door entry systems</li>
                  <li>Security keypads</li>
                  <li>Thermostat controls</li>
                  <li>Remote controls</li>
                  <li>Sensor networks</li>
                  <li>Building automation</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Safety Applications</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Bathroom equipment</li>
                  <li>Pool/spa equipment</li>
                  <li>Medical devices</li>
                  <li>Emergency lighting</li>
                  <li>Safety systems</li>
                  <li>Toys and games</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Specialised Equipment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Laboratory instruments</li>
                  <li>Educational equipment</li>
                  <li>Communication devices</li>
                  <li>Automotive electronics</li>
                  <li>Marine equipment</li>
                  <li>Agricultural sensors</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Safety Transformers */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Safety Transformers and Power Supplies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The power supply for Class III equipment is critical to maintaining SELV conditions and ensuring continued safety through voltage limitation.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Safety Transformer Requirements</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Double Insulation:</strong> Primary and secondary windings separated by double insulation equivalent to Class II</li>
                <li><strong>No Earth Connection:</strong> Secondary circuit must have no connection to earth or other circuits</li>
                <li><strong>Voltage Limitation:</strong> Output voltage limited by design, not just by loading</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Considerations</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Cable Separation:</strong> SELV circuits must be physically separated from higher voltage circuits</li>
                <li><strong>Marking and Identification:</strong> SELV circuits should be clearly identified and marked</li>
                <li><strong>Access and Maintenance:</strong> Design should prevent accidental connection to higher voltage circuits</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: PAT Testing Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            PAT Testing for Class III Equipment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Minimal Testing Requirements</p>
              <p className="text-sm text-white mb-2">
                Class III equipment requires the least PAT testing of all classes because the low voltage makes electric shock unlikely under normal conditions.
              </p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Visual inspection (primary requirement)</li>
                <li>Functional testing where appropriate</li>
                <li>Verification of SELV supply (if applicable)</li>
                <li>No electrical safety tests typically required</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Visual Inspection Focus</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Physical damage to equipment</li>
                <li>Power supply/charger condition</li>
                <li>Cable and connector integrity</li>
                <li>Appropriate voltage markings</li>
                <li>Evidence of overheating</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Documentation Requirements</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Record equipment identification</li>
                <li>Note SELV supply details</li>
                <li>Document any damage found</li>
                <li>Functional test results</li>
                <li>Next test due date</li>
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
              <p className="text-elec-yellow text-sm font-medium mb-2">Case Study: Bathroom Mirror Light SELV System</p>
              <div className="text-sm text-white space-y-2">
                <p><strong>Situation:</strong> A hotel bathroom features LED mirror lighting supplied from a 12V transformer. During refurbishment, an electrician discovers the transformer is installed within the bathroom zone rather than outside.</p>
                <p><strong>Investigation:</strong> Although the LED lights are Class III and operate safely at 12V, the transformer supplying them is not suitable for bathroom installation and could create a safety risk.</p>
                <p><strong>The Issue:</strong> The SELV source (transformer) must be located outside bathroom zones to maintain the safety integrity of the system.</p>
                <p><strong>The Solution:</strong> The transformer was relocated outside the bathroom with appropriate cable routing to maintain separation between SELV and mains circuits.</p>
                <p><strong>The Lesson:</strong> Class III equipment safety depends not just on the equipment itself, but on the entire SELV system including the source and installation methods.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Testing Class III Equipment</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Confirm equipment is Class III before testing</li>
                <li>Focus on visual inspection as primary test</li>
                <li>Check the power supply/transformer separately</li>
                <li>Verify correct voltage ratings and markings</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Consider the Complete System</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>The SELV source may require testing as Class I or II</li>
                <li>Check cable separation from mains circuits</li>
                <li>Verify transformer location is appropriate</li>
                <li>Ensure no unauthorised modifications</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ignoring the power supply</strong> - the charger/transformer may need full testing</li>
                <li><strong>Assuming all low voltage is SELV</strong> - SELV requires specific isolation</li>
                <li><strong>Skipping visual inspection</strong> - still essential for Class III</li>
                <li><strong>Not checking installation</strong> - transformer location and cable routing matter</li>
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
            <Link to="../section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default PATTestingModule2Section4;
