import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Understanding User Complaints - Module 7.3.5 | Level 2 Electrical Course";
const DESCRIPTION = "Using user complaints as early indicators of electrical faults and implementing effective investigation procedures.";

const quickCheckQuestions = [
  {
    id: 1,
    question: "Why are user complaints valuable for fault diagnosis?",
    options: ["They are usually incorrect", "They provide early warning of developing faults", "They waste time", "They are legally required"],
    correctIndex: 1,
    explanation: "User complaints often identify developing electrical problems before they become dangerous, providing valuable early warning signs."
  },
  {
    id: 2,
    question: "What should you do when a user reports 'lights flickering when the kettle is used'?",
    options: ["Ignore as normal", "Investigate voltage drop and circuit loading", "Tell them to use less appliances", "Replace the kettle"],
    correctIndex: 1,
    explanation: "This indicates potential voltage drop due to overloading or poor connections, requiring circuit investigation."
  },
  {
    id: 3,
    question: "What type of information should you gather from user complaints?",
    options: ["When, what, where, and under what conditions", "Only the specific fault", "Just when it happens", "Only who reported it"],
    correctIndex: 0,
    explanation: "Comprehensive information about timing, conditions, location, and circumstances helps identify patterns and guide effective testing."
  }
];

const Module7Section3_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What makes user complaints valuable for electrical fault diagnosis?",
      options: [
        "They are always accurate",
        "They provide early warning of developing problems",
        "They replace the need for testing",
        "They are legally binding"
      ],
      correctAnswer: 1,
      explanation: "User complaints often identify electrical problems in their early stages, before they become dangerous or cause major failures."
    },
    {
      id: 2,
      question: "What does 'lights dim when appliances start' typically indicate?",
      options: [
        "Faulty appliances only",
        "Voltage drop due to overloading or poor connections",
        "Normal operation",
        "Meter reading errors"
      ],
      correctAnswer: 1,
      explanation: "Dimming lights during appliance startup indicates voltage drop caused by circuit overloading or high-resistance connections."
    },
    {
      id: 3,
      question: "How should you respond to reports of 'electric shocks from appliances'?",
      options: [
        "Advise user to ignore minor shocks",
        "Immediate isolation and urgent investigation",
        "Schedule routine maintenance",
        "Replace the appliance only"
      ],
      correctAnswer: 1,
      explanation: "Electric shock reports require immediate isolation and urgent investigation as they indicate serious earth fault or insulation failure."
    },
    {
      id: 4,
      question: "What pattern might 'tripping only during rain' suggest?",
      options: [
        "Normal weather sensitivity",
        "Water ingress causing earth faults",
        "Increased electrical demand",
        "Temperature effects only"
      ],
      correctAnswer: 1,
      explanation: "Rain-related tripping typically indicates water ingress into electrical equipment causing earth leakage faults."
    },
    {
      id: 5,
      question: "Why is documenting user complaints important?",
      options: [
        "Legal requirements only",
        "Identifies patterns and guides investigation priorities",
        "Insurance purposes",
        "Customer relations"
      ],
      correctAnswer: 1,
      explanation: "Documenting complaints helps identify recurring patterns, prioritise investigations, and track fault development over time."
    },
    {
      id: 6,
      question: "What should you ask about intermittent electrical problems?",
      options: [
        "Only when they occur",
        "Timing, conditions, frequency, and triggering events",
        "Just the symptoms",
        "Only the location"
      ],
      correctAnswer: 1,
      explanation: "Comprehensive information about intermittent faults helps identify patterns and conditions that trigger the problems."
    },
    {
      id: 7,
      question: "How can user complaints help prioritise maintenance work?",
      options: [
        "They can't help with prioritisation",
        "Identify safety-critical issues requiring immediate attention",
        "Only for scheduling convenience",
        "Based on user preferences"
      ],
      correctAnswer: 1,
      explanation: "User complaints help identify potentially dangerous conditions that require immediate attention versus routine maintenance items."
    },
    {
      id: 8,
      question: "What does 'burning smell but can't find source' require?",
      options: [
        "Wait for the source to become obvious",
        "Systematic investigation with thermal imaging",
        "Increase ventilation only",
        "Schedule routine inspection"
      ],
      correctAnswer: 1,
      explanation: "Burning smells without obvious sources require systematic thermal investigation to prevent potential fire hazards."
    },
    {
      id: 9,
      question: "Why should user complaints be taken seriously even if seemingly minor?",
      options: [
        "To keep customers happy only",
        "Minor symptoms often indicate developing serious faults",
        "For insurance purposes",
        "They're usually exaggerated"
      ],
      correctAnswer: 1,
      explanation: "Minor electrical symptoms often indicate the early stages of faults that can develop into serious safety hazards."
    },
    {
      id: 10,
      question: "In the office example, what did user complaints about computer resets reveal?",
      options: [
        "Faulty computers",
        "Voltage variations due to loose neutral connections",
        "Network problems",
        "User error"
      ],
      correctAnswer: 1,
      explanation: "The computer reset complaints led to discovery of loose neutral connections causing voltage variations that affected sensitive equipment."
    }
  ];

  const faqs = [
    {
      question: "How can you encourage users to report electrical problems promptly?",
      answer: "Create clear reporting procedures, emphasise that no problem is too minor, provide multiple reporting methods (phone, email, app), and always follow up to show that reports are taken seriously."
    },
    {
      question: "What should you do when user descriptions don't match your technical findings?",
      answer: "Remember that users describe symptoms they observe, not technical causes. Use their observations as clues to guide your investigation, and explain your findings in terms they can understand."
    },
    {
      question: "How can recurring user complaints help identify systemic problems?",
      answer: "Track complaint patterns over time and locations. Multiple similar complaints may indicate design issues, installation problems, or environmental factors affecting multiple circuits or areas."
    },
    {
      question: "Should you investigate complaints about 'slight tingles' from equipment?",
      answer: "Absolutely. Any sensation of electric shock, no matter how minor, indicates a potential earth fault or insulation failure that could become dangerous. These require immediate investigation."
    },
    {
      question: "How do you handle complaints about electrical problems that you cannot reproduce?",
      answer: "Intermittent faults are common and serious. Gather detailed information about conditions when problems occur, use data logging equipment, and perform comprehensive testing even if problems aren't currently evident."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Section 3</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Title Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 7</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 3.5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Understanding User Complaints
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
              Using user complaints as early indicators of electrical faults and implementing effective investigation procedures.
            </p>
          </header>

          {/* In 30 Seconds Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <p className="font-medium text-elec-yellow mb-2">In 30 Seconds</p>
            <ul className="text-white/80 space-y-1 text-sm list-disc pl-4">
              <li>User complaints provide early warning of developing electrical faults.</li>
              <li>Proper investigation of complaints prevents minor issues becoming dangerous.</li>
              <li>Systematic questioning reveals patterns that guide effective fault diagnosis.</li>
            </ul>
          </div>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <ul className="text-white/80 space-y-2 text-sm list-disc pl-4">
              <li>Recognise the value of user complaints as early indicators of developing electrical faults.</li>
              <li>Apply systematic questioning techniques to gather comprehensive fault information from users.</li>
              <li>Identify patterns in user reports that indicate specific types of electrical problems.</li>
              <li>Prioritise investigation activities based on safety implications of reported symptoms.</li>
              <li>Implement effective communication strategies for gathering and responding to electrical fault reports.</li>
            </ul>
          </section>

          {/* Value of User Complaints */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Recognising the Value of User Complaints
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                User complaints represent one of the most valuable sources of information for early electrical fault detection. Users often notice subtle changes in electrical system behaviour that precede serious failures.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Early Warning System</p>
                <p className="text-sm mb-2"><strong className="text-white">Sensitivity to change:</strong> Users notice subtle variations in normal electrical behaviour.</p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li>Lights dimming slightly when appliances start (indicating voltage drop)</li>
                  <li>Increased sensitivity of RCD devices (suggesting developing earth leakage)</li>
                  <li>Appliances running warmer or noisier than usual (overloading or poor connections)</li>
                  <li>Intermittent operation of electrical equipment (loose connections developing)</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                <p className="font-medium text-white mb-2">Pattern Recognition</p>
                <p className="text-sm mb-2">Multiple complaints revealing systematic problems:</p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li>Similar complaints from multiple users indicating widespread issues</li>
                  <li>Complaints following specific trigger events (weather, load changes)</li>
                  <li>Progressive complaints showing fault development over time</li>
                  <li>Location-specific patterns indicating localised problems</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-amber-500/50">
                <p className="font-medium text-white mb-2">Safety Implications</p>
                <p className="text-sm mb-2">Complaints often indicate developing dangerous conditions:</p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li>Reports of 'tingles' indicating earth fault development</li>
                  <li>Burning smells suggesting overheating and fire risk</li>
                  <li>Tripping patterns indicating insulation deterioration</li>
                  <li>Flickering lights suggesting loose connections and arcing risk</li>
                </ul>
              </div>

              <div className="p-3 rounded bg-white/5 text-sm">
                <strong className="text-white">Key principle:</strong> Every electrical complaint should be investigated - minor symptoms often indicate major developing problems.
              </div>
            </div>
          </section>

          <InlineCheck
            id="user-complaints-value-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          {/* Systematic Investigation */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Systematic Investigation of User Reports
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Effective investigation of user complaints requires systematic questioning and documentation to extract maximum diagnostic value from reported symptoms.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">What Specifically is the Problem</p>
                <p className="text-sm mb-2">Detailed description of observed symptoms:</p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li>Exact nature of the fault (flickering, tripping, shocks, smells, sounds)</li>
                  <li>Severity and duration of symptoms</li>
                  <li>Which circuits, equipment, or areas are affected</li>
                  <li>Any visible damage or unusual appearances</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                <p className="font-medium text-white mb-2">When Does It Occur</p>
                <p className="text-sm mb-2">Timing patterns and frequency of problems:</p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li>Time of day, day of week, or seasonal patterns</li>
                  <li>Correlation with weather conditions (rain, cold, humidity)</li>
                  <li>Frequency of occurrence (continuous, intermittent, one-off)</li>
                  <li>Duration of individual fault episodes</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Under What Conditions</p>
                <p className="text-sm mb-2">Circumstances triggering or affecting the fault:</p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li>Load conditions when problems occur (which appliances in use)</li>
                  <li>Environmental factors (temperature, humidity, vibration)</li>
                  <li>Operational states (startup, steady operation, shutdown)</li>
                  <li>Triggering events or activities that precede the fault</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-teal-500/50">
                <p className="font-medium text-white mb-2">Where Exactly</p>
                <p className="text-sm mb-2">Precise location and extent of the problem:</p>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li>Specific rooms, floors, or areas affected</li>
                  <li>Individual circuits, sockets, or equipment involved</li>
                  <li>Extent of the problem (single point or widespread)</li>
                  <li>Relationship to other electrical installations</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="investigation-techniques-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          {/* Common Complaint Patterns */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Recognising Common Complaint Patterns
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Different types of electrical faults produce characteristic patterns of user complaints that help guide investigation priorities and testing approaches.
              </p>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-white/5">
                  <p className="font-medium text-elec-yellow text-sm mb-2">Voltage Drop Indicators</p>
                  <ul className="text-xs list-disc pl-4 space-y-1">
                    <li>"Lights dim when the kettle/washing machine starts" - circuit overloading</li>
                    <li>"Equipment runs slower than usual" - sustained voltage drop</li>
                    <li>"Lights flicker during windy weather" - overhead supply problems</li>
                    <li>"Everything seems less bright lately" - neutral or supply connection issues</li>
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-white/5">
                  <p className="font-medium text-blue-400 text-sm mb-2">Earth Fault Development</p>
                  <ul className="text-xs list-disc pl-4 space-y-1">
                    <li>"RCD trips when it rains" - water ingress causing earth leakage</li>
                    <li>"Slight tingle from washing machine" - developing earth fault</li>
                    <li>"Tripping more frequently lately" - progressive insulation failure</li>
                    <li>"Trips when vacuum cleaner used" - specific equipment earth fault</li>
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-white/5">
                  <p className="font-medium text-orange-400 text-sm mb-2">Connection Deterioration</p>
                  <ul className="text-xs list-disc pl-4 space-y-1">
                    <li>"Switch/socket getting warm" - high resistance connection heating</li>
                    <li>"Crackling sounds from electrical panels" - arcing at connections</li>
                    <li>"Intermittent power loss" - loose connections causing poor contact</li>
                    <li>"Burning smell but can't see source" - concealed connection overheating</li>
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-white/5">
                  <p className="font-medium text-purple-400 text-sm mb-2">Overloading Symptoms</p>
                  <ul className="text-xs list-disc pl-4 space-y-1">
                    <li>"Circuit breaker trips when using multiple appliances" - circuit overload</li>
                    <li>"Extension leads getting hot" - excessive current through inadequate cables</li>
                    <li>"Can't use everything at once anymore" - increased load beyond design</li>
                    <li>"Fuses blow regularly" - sustained overloading of circuits</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="complaint-patterns-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          {/* Practical Guidance */}
          <section className="mb-10 mt-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Practical Guidance
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Communication Techniques</p>
                <ul className="text-sm list-disc pl-4 space-y-1 text-white/80">
                  <li>Use open-ended questions to encourage detailed descriptions</li>
                  <li>Ask for demonstrations or recreating conditions if safe to do so</li>
                  <li>Translate technical language to user-friendly terms</li>
                  <li>Document exact user words - they may contain important clues</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Follow-up Actions</p>
                <ul className="text-sm list-disc pl-4 space-y-1 text-white/80">
                  <li>Prioritise complaints indicating safety risks (shocks, burning smells)</li>
                  <li>Schedule investigations based on fault severity and safety implications</li>
                  <li>Follow-up questions reveal patterns that guide effective testing</li>
                  <li>Always close the loop - inform users of findings and actions taken</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Examples */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Real-World Examples
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Office Computer Problems</p>
                <p className="text-white/80 text-sm mb-2">
                  <strong className="text-elec-yellow">Complaints:</strong> Multiple office workers reported computers randomly restarting, particularly during morning startup periods.
                </p>
                <p className="text-white/80 text-sm mb-2">
                  <strong className="text-orange-400">Investigation:</strong> Pattern analysis revealed problems coincided with high heating load startup and specific workstation clusters.
                </p>
                <p className="text-white/80 text-sm mb-2">
                  <strong className="text-green-400">Findings:</strong> Loose neutral connections in distribution board caused voltage variations affecting sensitive electronic equipment.
                </p>
                <p className="text-white/80 text-sm">
                  <strong className="text-purple-400">Resolution:</strong> Re-termination of all neutral connections eliminated voltage variations and computer problems.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                <p className="font-medium text-white mb-2">Residential Tripping Issues</p>
                <p className="text-white/80 text-sm mb-2">
                  <strong className="text-elec-yellow">Complaints:</strong> Homeowner reported RCD tripping "only when it rains" and "slight tingles" from washing machine.
                </p>
                <p className="text-white/80 text-sm mb-2">
                  <strong className="text-orange-400">Investigation:</strong> Weather correlation suggested water ingress, while shock reports indicated earth fault development.
                </p>
                <p className="text-white/80 text-sm mb-2">
                  <strong className="text-green-400">Findings:</strong> Damaged cable in external wall allowed water penetration, creating earth leakage path to washing machine circuit.
                </p>
                <p className="text-white/80 text-sm">
                  <strong className="text-purple-400">Resolution:</strong> Cable replacement and improved weatherproofing eliminated both tripping and shock hazard.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-white/10 pb-4 last:border-b-0">
                  <p className="font-medium text-white mb-2">{faq.question}</p>
                  <p className="text-white/70 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Recap
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-white/5">
                <p className="font-medium text-green-400 text-sm mb-1">Early Warning Value</p>
                <p className="text-xs text-white/70">User complaints provide early detection of developing electrical faults before they become dangerous.</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="font-medium text-elec-yellow text-sm mb-1">Systematic Investigation</p>
                <p className="text-xs text-white/70">Comprehensive questioning about what, when, where, and under what conditions reveals diagnostic patterns.</p>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <p className="font-medium text-amber-400 text-sm mb-1">Safety Priority</p>
                <p className="text-xs text-white/70">Complaints about shocks, burning smells, or progressive symptoms require immediate priority investigation.</p>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={quizQuestions} title="Understanding User Complaints Quiz" />
          </section>

          {/* Navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full sm:w-auto text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../3-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back: Buzzing, Arcing & Sparking
              </Link>
            </Button>
            <Button
              className="w-full sm:w-auto bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                Complete Section 3
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module7Section3_5;
