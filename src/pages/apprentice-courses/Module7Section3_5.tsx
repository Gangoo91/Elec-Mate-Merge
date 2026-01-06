import { ArrowLeft, ArrowRight, Users, Target, CheckCircle, AlertTriangle, FileText, MessageSquare, Wrench, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Understanding User Complaints - Module 7.3.5 | Level 2 Electrical Course";
const DESCRIPTION = "Using user complaints as early indicators of electrical faults and implementing effective investigation procedures.";

// Inline check questions
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
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white p-0 text-sm sm:text-base" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <div className="p-2 rounded-lg w-fit">
              <Users className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow w-fit">
              Section 7.3.5
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Understanding User Complaints
          </h1>
          <p className="text-white text-sm sm:text-base">
            Using user complaints as early indicators of electrical faults and implementing effective investigation procedures.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>User complaints provide early warning of developing electrical faults.</li>
                <li>Proper investigation of complaints prevents minor issues becoming dangerous.</li>
                <li>Systematic questioning reveals patterns that guide effective fault diagnosis.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
              <p className="font-medium mb-2">Spot it / Use it / Check</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Patterns in reports (trips with appliances, flicker on load, smells).</li>
                <li><strong>Use:</strong> Systematic questioning, thermal imaging, load monitoring.</li>
                <li><strong>Check:</strong> Circuit loading, connections, earth continuity, insulation.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Recognise the value of user complaints as early indicators of developing electrical faults.</li>
            <li>Apply systematic questioning techniques to gather comprehensive fault information from users.</li>
            <li>Identify patterns in user reports that indicate specific types of electrical problems.</li>
            <li>Prioritise investigation activities based on safety implications of reported symptoms.</li>
            <li>Implement effective communication strategies for gathering and responding to electrical fault reports.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content / Learning</h2>

          {/* Value of User Complaints */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Recognising the Value of User Complaints</h3>
            <p className="text-base text-white mb-4">
              User complaints represent one of the most valuable sources of information for early electrical fault detection. Users often notice subtle changes in electrical system behaviour that precede serious failures:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Early Warning System</p>
                    <p className="text-base text-white mb-2"><strong>Sensitivity to change:</strong> Users notice subtle variations in normal electrical behaviour.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Lights dimming slightly when appliances start (indicating voltage drop)</li>
                      <li>Increased sensitivity of RCD devices (suggesting developing earth leakage)</li>
                      <li>Appliances running warmer or noisier than usual (overloading or poor connections)</li>
                      <li>Intermittent operation of electrical equipment (loose connections developing)</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Pattern recognition:</strong> Multiple complaints revealing systematic problems.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Similar complaints from multiple users indicating widespread issues</li>
                      <li>Complaints following specific trigger events (weather, load changes)</li>
                      <li>Progressive complaints showing fault development over time</li>
                      <li>Location-specific patterns indicating localised problems</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Safety implications:</strong> Complaints often indicate developing dangerous conditions.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Reports of 'tingles' indicating earth fault development</li>
                      <li>Burning smells suggesting overheating and fire risk</li>
                      <li>Tripping patterns indicating insulation deterioration</li>
                      <li>Flickering lights suggesting loose connections and arcing risk</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-white bg-[#121212]/50 p-2 rounded border">
                      <strong>Key principle:</strong> Every electrical complaint should be investigated - minor symptoms often indicate major developing problems
                    </div>
                  </div>
                </div>
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
          <Separator className="my-6" />

          {/* Systematic Investigation */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Systematic Investigation of User Reports</h3>
            <p className="text-base text-white mb-4">
              Effective investigation of user complaints requires systematic questioning and documentation to extract maximum diagnostic value from reported symptoms:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">Essential Information Gathering</p>
                    <p className="text-base text-white mb-2"><strong>What specifically is the problem:</strong> Detailed description of observed symptoms.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Exact nature of the fault (flickering, tripping, shocks, smells, sounds)</li>
                      <li>Severity and duration of symptoms</li>
                      <li>Which circuits, equipment, or areas are affected</li>
                      <li>Any visible damage or unusual appearances</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>When does it occur:</strong> Timing patterns and frequency of problems.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Time of day, day of week, or seasonal patterns</li>
                      <li>Correlation with weather conditions (rain, cold, humidity)</li>
                      <li>Frequency of occurrence (continuous, intermittent, one-off)</li>
                      <li>Duration of individual fault episodes</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Under what conditions:</strong> Circumstances triggering or affecting the fault.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Load conditions when problems occur (which appliances in use)</li>
                      <li>Environmental factors (temperature, humidity, vibration)</li>
                      <li>Operational states (startup, steady operation, shutdown)</li>
                      <li>Triggering events or activities that precede the fault</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Where exactly:</strong> Precise location and extent of the problem.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>Specific rooms, floors, or areas affected</li>
                      <li>Individual circuits, sockets, or equipment involved</li>
                      <li>Extent of the problem (single point or widespread)</li>
                      <li>Relationship to other electrical installations</li>
                    </ul>
                  </div>
                </div>
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
          <Separator className="my-6" />

          {/* Common Complaint Patterns */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Recognising Common Complaint Patterns</h3>
            <p className="text-base text-white mb-4">
              Different types of electrical faults produce characteristic patterns of user complaints that help guide investigation priorities and testing approaches:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-1">Diagnostic Complaint Patterns</p>
                    <p className="text-base text-white mb-2"><strong>Voltage drop indicators:</strong> Complaints suggesting supply or connection problems.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>"Lights dim when the kettle/washing machine starts" - circuit overloading</li>
                      <li>"Equipment runs slower than usual" - sustained voltage drop</li>
                      <li>"Lights flicker during windy weather" - overhead supply problems</li>
                      <li>"Everything seems less bright lately" - neutral or supply connection issues</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Earth fault development:</strong> Complaints indicating insulation deterioration.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>"RCD trips when it rains" - water ingress causing earth leakage</li>
                      <li>"Slight tingle from washing machine" - developing earth fault</li>
                      <li>"Tripping more frequently lately" - progressive insulation failure</li>
                      <li>"Trips when vacuum cleaner used" - specific equipment earth fault</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Connection deterioration:</strong> Complaints indicating loose or corroded connections.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>"Switch/socket getting warm" - high resistance connection heating</li>
                      <li>"Crackling sounds from electrical panels" - arcing at connections</li>
                      <li>"Intermittent power loss" - loose connections causing poor contact</li>
                      <li>"Burning smell but can't see source" - concealed connection overheating</li>
                    </ul>
                    <p className="text-base text-white mb-2"><strong>Overloading symptoms:</strong> Complaints indicating excessive circuit loading.</p>
                    <ul className="text-xs sm:text-sm text-white ml-4 mb-2 list-disc space-y-1">
                      <li>"Circuit breaker trips when using multiple appliances" - circuit overload</li>
                      <li>"Extension leads getting hot" - excessive current through inadequate cables</li>
                      <li>"Can't use everything at once anymore" - increased load beyond design</li>
                      <li>"Fuses blow regularly" - sustained overloading of circuits</li>
                    </ul>
                  </div>
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
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="font-medium text-white mb-3">Communication Techniques</h3>
              <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
                <li>Use open-ended questions to encourage detailed descriptions</li>
                <li>Ask for demonstrations or recreating conditions if safe to do so</li>
                <li>Translate technical language to user-friendly terms</li>
                <li>Document exact user words - they may contain important clues</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-white mb-3">Follow-up Actions</h3>
              <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
                <li>Prioritise complaints indicating safety risks (shocks, burning smells)</li>
                <li>Schedule investigations based on fault severity and safety implications</li>
                <li>Follow-up questions reveal patterns that guide effective testing</li>
                <li>Always close the loop - inform users of findings and actions taken</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-World Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-World Examples</h2>
          
          <div className="space-y-6">
            <div className="rounded-lg p-4 border border-white/10 ">
              <h3 className="font-medium text-white mb-2">Case Study: Office Computer Problems</h3>
              <p className="text-xs sm:text-sm text-white mb-2">
                <strong>Complaints:</strong> Multiple office workers reported computers randomly restarting, particularly during morning startup periods.
              </p>
              <p className="text-xs sm:text-sm text-white mb-2">
                <strong>Investigation:</strong> Pattern analysis revealed problems coincided with high heating load startup and specific workstation clusters.
              </p>
              <p className="text-xs sm:text-sm text-white mb-2">
                <strong>Findings:</strong> Loose neutral connections in distribution board caused voltage variations affecting sensitive electronic equipment.
              </p>
              <p className="text-xs sm:text-sm text-white">
                <strong>Resolution:</strong> Re-termination of all neutral connections eliminated voltage variations and computer problems.
              </p>
            </div>

            <div className="rounded-lg p-4 border border-white/10 ">
              <h3 className="font-medium text-white mb-2">Case Study: Residential Tripping Issues</h3>
              <p className="text-xs sm:text-sm text-white mb-2">
                <strong>Complaints:</strong> Homeowner reported RCD tripping "only when it rains" and "slight tingles" from washing machine.
              </p>
              <p className="text-xs sm:text-sm text-white mb-2">
                <strong>Investigation:</strong> Weather correlation suggested water ingress, while shock reports indicated earth fault development.
              </p>
              <p className="text-xs sm:text-sm text-white mb-2">
                <strong>Findings:</strong> Damaged cable in external wall allowed water penetration, creating earth leakage path to washing machine circuit.
              </p>
              <p className="text-xs sm:text-sm text-white">
                <strong>Resolution:</strong> Cable replacement and improved weatherproofing eliminated both tripping and shock hazard.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-medium text-white mb-2">{faq.question}</h3>
                <p className="text-sm text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
              <CheckCircle className="w-5 h-5 text-green-500 mb-2" />
              <p className="font-medium text-sm mb-1">Early Warning Value</p>
              <p className="text-xs text-white">User complaints provide early detection of developing electrical faults before they become dangerous.</p>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
              <MessageSquare className="w-5 h-5 text-elec-yellow mb-2" />
              <p className="font-medium text-sm mb-1">Systematic Investigation</p>
              <p className="text-xs text-white">Comprehensive questioning about what, when, where, and under what conditions reveals diagnostic patterns.</p>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
              <Target className="w-5 h-5 text-elec-yellow mb-2" />
              <p className="font-medium text-sm mb-1">Safety Priority</p>
              <p className="text-xs text-white">Complaints about shocks, burning smells, or progressive symptoms require immediate priority investigation.</p>
            </div>
          </div>
        </Card>

        {/* Knowledge Check */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Knowledge Check</h2>
          <Quiz questions={quizQuestions} title="Understanding User Complaints Quiz" />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Button variant="outline" className="flex-1 sm:flex-none" asChild>
            <Link to="../module7-section3-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Buzzing, Arcing & Sparking
            </Link>
          </Button>
          <Button className="flex-1 sm:flex-none" asChild>
            <Link to="../module7-section3-6">
              Next: Section 3.6
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module7Section3_5;