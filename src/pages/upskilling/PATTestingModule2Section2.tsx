import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Class I: Protective Earthing Explained - PAT Testing Module 2 Section 2";
const DESCRIPTION = "Understand Class I equipment and protective earthing, including how earth continuity works, testing requirements, and common failures in earthed appliances.";

const quickCheckQuestions = [
  {
    id: "m2s2-check1",
    question: "What is the primary safety mechanism in Class I equipment?",
    options: [
      "Double insulation",
      "Basic insulation plus protective earthing",
      "Extra low voltage",
      "Reinforced insulation"
    ],
    correctIndex: 1,
    explanation: "Class I equipment relies on basic insulation for normal protection, with protective earthing providing safety in case the basic insulation fails."
  },
  {
    id: "m2s2-check2",
    question: "What is the maximum acceptable earth continuity resistance for most Class I appliances?",
    options: [
      "0.05 ohms",
      "0.1 ohms",
      "1.0 ohms",
      "2.0 ohms"
    ],
    correctIndex: 1,
    explanation: "The maximum earth continuity resistance is typically 0.1 ohms for Class I appliances, ensuring effective fault current flow for rapid disconnection."
  },
  {
    id: "m2s2-check3",
    question: "What happens if the earth connection fails in Class I equipment?",
    options: [
      "The equipment stops working immediately",
      "The equipment continues working but becomes potentially dangerous",
      "The fuse blows automatically",
      "The insulation resistance increases"
    ],
    correctIndex: 1,
    explanation: "If the earth connection fails, Class I equipment may continue to operate normally, but if a fault develops, the metal casing could become live and dangerous."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the primary safety mechanism in Class I equipment?",
    options: [
      "Double insulation",
      "Basic insulation plus protective earthing",
      "Extra low voltage",
      "Reinforced insulation"
    ],
    correctAnswer: 1,
    explanation: "Class I equipment relies on basic insulation for normal protection, with protective earthing providing safety in case the basic insulation fails."
  },
  {
    id: 2,
    question: "What is the maximum acceptable earth continuity resistance for most Class I appliances?",
    options: [
      "0.05 ohms",
      "0.1 ohms",
      "1.0 ohms",
      "2.0 ohms"
    ],
    correctAnswer: 1,
    explanation: "The maximum earth continuity resistance is typically 0.1 ohms for Class I appliances."
  },
  {
    id: 3,
    question: "Why must Class I equipment have a three-core cable?",
    options: [
      "For higher power rating",
      "To provide live, neutral, and earth conductors",
      "For better insulation",
      "To meet manufacturing standards"
    ],
    correctAnswer: 1,
    explanation: "Class I equipment requires three-core cables to provide live, neutral, and earth conductors, with the earth being essential for safety."
  },
  {
    id: 4,
    question: "What happens if the earth connection fails in Class I equipment?",
    options: [
      "The equipment stops working immediately",
      "The equipment continues working but becomes potentially dangerous",
      "The fuse blows automatically",
      "The insulation resistance increases"
    ],
    correctAnswer: 1,
    explanation: "If the earth connection fails, Class I equipment may continue to operate normally, but becomes dangerous if a fault develops."
  },
  {
    id: 5,
    question: "Which test is most critical for Class I equipment safety?",
    options: [
      "Insulation resistance test only",
      "Earth continuity test only",
      "Both earth continuity and insulation resistance tests",
      "Functional test only"
    ],
    correctAnswer: 2,
    explanation: "Both tests are critical: earth continuity ensures the safety path works, while insulation resistance confirms the basic insulation is intact."
  },
  {
    id: 6,
    question: "What test current is typically applied during earth continuity testing?",
    options: [
      "1A or 5A",
      "10A or 25A",
      "100A or 200A",
      "500mA or 1A"
    ],
    correctAnswer: 1,
    explanation: "Earth continuity testing typically uses a test current of 10A or 25A to measure the resistance accurately."
  },
  {
    id: 7,
    question: "Which of these is NOT a common cause of earth path failure?",
    options: [
      "Broken earth conductor in cable",
      "Corrosion at earth connections",
      "Normal wear and tear",
      "Excessive cable length"
    ],
    correctAnswer: 3,
    explanation: "Excessive cable length is not a failure but may require adjusted limits. Common failures include broken conductors, loose connections, and corrosion."
  },
  {
    id: 8,
    question: "What type of equipment typically requires Class I protection?",
    options: [
      "Mobile phone chargers",
      "Electric drills and power tools",
      "Battery-powered devices",
      "All plastic-cased equipment"
    ],
    correctAnswer: 1,
    explanation: "Power tools with metal cases, kettles, and industrial equipment commonly use Class I protection with protective earthing."
  },
  {
    id: 9,
    question: "How does protective earthing prevent electric shock?",
    options: [
      "By increasing insulation thickness",
      "By creating a low-impedance path for fault current to trip protective devices",
      "By reducing the supply voltage",
      "By isolating the user from the equipment"
    ],
    correctAnswer: 1,
    explanation: "Protective earthing creates a low-impedance path for fault current, enabling rapid automatic disconnection before shock can occur."
  },
  {
    id: 10,
    question: "What symbol identifies Class I equipment?",
    options: [
      "Square within a square",
      "Roman numeral III",
      "Earth symbol",
      "Lightning bolt in triangle"
    ],
    correctAnswer: 2,
    explanation: "Class I equipment is identified by the earth symbol, indicating it requires connection to protective earth."
  }
];

const faqs = [
  {
    question: "Why is earth continuity testing so important for Class I equipment?",
    answer: "Earth continuity is the primary backup protection in Class I equipment. If basic insulation fails, the earth path carries fault current to trip the protective device rapidly. Without a good earth connection, the metal case could become live and remain so, creating a serious shock hazard."
  },
  {
    question: "Can Class I equipment work without an earth connection?",
    answer: "Yes, Class I equipment will typically continue to operate normally without an earth connection. However, this makes it extremely dangerous because if an insulation fault occurs, there is no protection against electric shock. This is why earth continuity testing is essential."
  },
  {
    question: "What is the difference between earth continuity and insulation resistance tests?",
    answer: "Earth continuity tests verify the protective earth path is intact with low resistance. Insulation resistance tests verify the basic insulation between live parts and accessible metalwork is intact. Both are needed for complete Class I equipment safety verification."
  },
  {
    question: "How often should Class I equipment be PAT tested?",
    answer: "Testing frequency depends on the environment and use. High-risk environments like construction sites may need 3-monthly testing, whilst office equipment might be tested annually. The IET Code of Practice provides guidance based on equipment type and environment."
  },
  {
    question: "What should I do if earth continuity fails but the equipment looks fine?",
    answer: "Never use equipment with failed earth continuity. Investigate the cause - it could be a broken internal conductor, loose connection in the plug, or corroded terminals. The equipment should be repaired and retested before returning to service."
  }
];

const PATTestingModule2Section2 = () => {
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
            <span>Module 2 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Class I: Protective Earthing Explained
          </h1>
          <p className="text-white/80">
            Understanding earthed equipment and earth continuity testing
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Protection:</strong> Basic insulation + earth path</li>
              <li><strong>Cable:</strong> Three-core (L, N, E)</li>
              <li><strong>Earth limit:</strong> 0.1 ohms maximum</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Metal case, 3-pin plug, earth symbol</li>
              <li><strong>Use:</strong> Earth continuity + insulation tests required</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Define Class I equipment and its safety characteristics",
              "Explain how protective earthing prevents electric shock",
              "Understand earth continuity requirements and testing",
              "Identify common Class I appliances and their features",
              "Recognise limitations and potential failures of earthing",
              "Apply appropriate PAT testing procedures for Class I"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What is Class I Equipment? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What is Class I Equipment?
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Class I equipment represents the most common type of electrical appliance found in workplaces and homes. These appliances rely on a dual protection system: basic insulation for normal operation and protective earthing as a safety backup.
            </p>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Definition</p>
              <p className="text-sm text-white">
                Class I equipment has basic insulation and accessible conductive parts are connected to a protective earthing conductor as a means of protection against electric shock in case of failure of the basic insulation.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Essential Characteristics:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Basic insulation around live parts</li>
                <li>Exposed metalwork earthed</li>
                <li>Three-core supply cable (Live, Neutral, Earth)</li>
                <li>Earth continuity path essential for safety</li>
                <li>Marked with earth symbol</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Protection Principle:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Normal operation: basic insulation protects</li>
                <li>Fault condition: earth path carries fault current</li>
                <li>High fault current trips protective device</li>
                <li>Rapid disconnection prevents shock</li>
                <li>Two levels of protection working together</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: How Protective Earthing Works */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            How Protective Earthing Works
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Protective earthing creates a deliberately low-impedance path for fault current, ensuring automatic disconnection occurs quickly enough to prevent dangerous shock.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Normal Operation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Basic insulation prevents contact with live parts</li>
                  <li>No current flows in earth conductor</li>
                  <li>Metal case remains at earth potential</li>
                  <li>Equipment operates safely</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Fault Condition</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Live conductor contacts metal case (insulation failure)</li>
                  <li>Current flows through earth path</li>
                  <li>Fault current rises rapidly due to low impedance</li>
                  <li>Protective device operation imminent</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Safety Action</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Fuse blows or circuit breaker trips</li>
                  <li>Supply disconnected rapidly (within 0.4s typically)</li>
                  <li>Dangerous condition eliminated</li>
                  <li>User protected from shock</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Earth Continuity Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Earth Continuity Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The earth continuity path must have sufficiently low resistance to ensure effective fault current flow. PAT testing verifies this critical safety parameter.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Resistance Limits</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Standard Equipment:</strong> Maximum 0.1 ohms (covers most Class I appliances)</li>
                <li><strong>Heating Appliances:</strong> Maximum 0.1 ohms + 0.02 ohms per metre of cable</li>
                <li><strong>IT Equipment:</strong> Maximum 0.1 ohms (same as standard)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Process</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Step 1:</strong> Disconnect equipment from supply and remove any removable parts</li>
                <li><strong>Step 2:</strong> Connect test leads between earth pin and accessible earthed metalwork</li>
                <li><strong>Step 3:</strong> Apply test current (typically 10A or 25A) and measure resistance</li>
                <li><strong>Step 4:</strong> Compare result against appropriate limit for equipment type</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Common Class I Equipment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Common Class I Equipment Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Power Tools</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Electric drills</li>
                  <li>Angle grinders</li>
                  <li>Circular saws</li>
                  <li>Sanders</li>
                  <li>Welding equipment</li>
                  <li>Compressors</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Kitchen Equipment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Electric kettles</li>
                  <li>Microwave ovens</li>
                  <li>Food processors</li>
                  <li>Electric ovens</li>
                  <li>Dishwashers</li>
                  <li>Refrigerators</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Office Equipment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Desktop computers</li>
                  <li>Laser printers</li>
                  <li>Photocopiers</li>
                  <li>Projectors</li>
                  <li>Laminating machines</li>
                  <li>Shredders</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="text-elec-yellow text-sm font-medium mb-2">Industrial Equipment</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Motor drives</li>
                  <li>Machine tools</li>
                  <li>Heating equipment</li>
                  <li>Pumps</li>
                  <li>Ventilation fans</li>
                  <li>Control panels</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 05: Potential Failures and Limitations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Potential Failures and Limitations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding how earthing protection can fail helps PAT testers identify potential problems and emphasises the importance of regular testing.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Earth Path Failures</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Broken earth conductor in cable</li>
                <li>Loose earth connections in plug</li>
                <li>Corrosion at earth connections</li>
                <li>Missing earth conductor (incorrect wiring)</li>
                <li>High resistance joints</li>
                <li>Damage during maintenance or repair</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Limitations</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Depends on supply earthing system quality</li>
                <li>Earth path resistance affects disconnection time</li>
                <li>May not protect against all shock scenarios</li>
                <li>Requires proper installation and maintenance</li>
                <li>Can be compromised by building modifications</li>
                <li>Environmental factors affect performance</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-elec-yellow text-sm font-medium mb-2">Why Regular Testing Matters</p>
              <p className="text-sm text-white">
                Earth continuity can deteriorate over time due to mechanical stress, corrosion, and general wear. Regular PAT testing identifies these degradations before they compromise safety, ensuring the protective earthing system remains effective throughout the equipment's life.
              </p>
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
              <p className="text-elec-yellow text-sm font-medium mb-2">Case Study: Workshop Drill Earth Failure</p>
              <div className="text-sm text-white space-y-2">
                <p><strong>Situation:</strong> During routine PAT testing, a workshop drill shows earth continuity of 2.5 ohms, well above the 0.1 ohm limit. The drill appears to function normally and shows no visible damage.</p>
                <p><strong>Investigation:</strong> Further inspection reveals the earth conductor has broken inside the cable near the plug due to repeated flexing, but the other conductors remain intact.</p>
                <p><strong>The Risk:</strong> If an insulation fault developed, the metal drill case could become live at mains voltage with no protective disconnection occurring.</p>
                <p><strong>The Action:</strong> The drill was immediately removed from service and the cable replaced, restoring earth continuity to 0.05 ohms.</p>
                <p><strong>The Lesson:</strong> Equipment can appear and function normally whilst having dangerous earth path failures - only PAT testing reveals these hidden hazards.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Testing Class I Equipment</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always perform earth continuity test first</li>
                <li>Use appropriate test current (10A or 25A)</li>
                <li>Test to all accessible earthed metalwork</li>
                <li>Move the cable during testing to check for intermittent faults</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Interpreting Results</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Results below 0.1 ohms - PASS (for most equipment)</li>
                <li>Results above limit - FAIL and investigate</li>
                <li>Borderline results - check connections and retest</li>
                <li>Document all readings for comparison over time</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Skipping earth test for working equipment</strong> - equipment can function with broken earth</li>
                <li><strong>Only testing earth pin</strong> - test to actual earthed metalwork</li>
                <li><strong>Ignoring borderline results</strong> - investigate any readings close to the limit</li>
                <li><strong>Not flexing cables during test</strong> - intermittent faults may not show</li>
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
            <Link to="../section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default PATTestingModule2Section2;
