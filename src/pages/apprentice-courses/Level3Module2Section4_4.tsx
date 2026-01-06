import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, BookOpen, Zap, Clock, AlertTriangle, Settings, BarChart3, Wifi, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useSEO from "@/hooks/useSEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Types
interface QuickCheckQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface FAQ {
  question: string;
  answer: string;
}

// Inline Knowledge Check Component
const InlineCheck = ({ question, options, correctIndex, explanation }: QuickCheckQuestion) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
    setShowResult(true);
  };

  return (
    <div className="my-6 p-4 bg-[#242424] rounded-lg border border-[#333]">
      <p className="font-medium text-[#E8FF00] mb-3 flex items-center gap-2">
        <Zap className="h-4 w-4" /> Quick Check
      </p>
      <p className="mb-3 text-gray-200">{question}</p>
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`w-full text-left p-3 rounded border transition-colors ${
              showResult
                ? index === correctIndex
                  ? "border-green-500 bg-green-500/10"
                  : index === selected
                  ? "border-red-500 bg-red-500/10"
                  : "border-[#333] bg-[#1a1a1a]"
                : "border-[#333] bg-[#1a1a1a] hover:border-[#E8FF00]/50"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {showResult && (
        <div className={`mt-3 p-3 rounded ${selected === correctIndex ? "bg-green-500/10" : "bg-red-500/10"}`}>
          <p className="flex items-center gap-2">
            {selected === correctIndex ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
            <span className={selected === correctIndex ? "text-green-500" : "text-red-500"}>
              {selected === correctIndex ? "Correct!" : "Not quite right"}
            </span>
          </p>
          <p className="text-gray-300 mt-2 text-sm">{explanation}</p>
        </div>
      )}
    </div>
  );
};

// Quick check questions throughout content
const quickCheckQuestions: QuickCheckQuestion[] = [
  {
    question: "What is the primary purpose of smart charging?",
    options: [
      "To charge vehicles faster than normal",
      "To optimise charging based on grid conditions and user needs",
      "To provide only DC charging",
      "To eliminate the need for earthing"
    ],
    correctIndex: 1,
    explanation: "Smart charging optimises the charging process based on various factors including grid demand, electricity tariffs, renewable energy availability, and user requirements, rather than simply charging at maximum rate."
  },
  {
    question: "What does dynamic load management primarily prevent?",
    options: [
      "Battery degradation",
      "Exceeding the available supply capacity",
      "Communication failures",
      "Connector wear"
    ],
    correctIndex: 1,
    explanation: "Dynamic load management continuously monitors the total electrical load and adjusts EV charging power to prevent the combined demand from exceeding the available supply capacity, avoiding overloads and nuisance tripping."
  },
  {
    question: "Which communication protocol is commonly used between EV and charger for smart charging?",
    options: [
      "Bluetooth only",
      "ISO 15118 / OCPP",
      "Infrared",
      "Radio frequency"
    ],
    correctIndex: 1,
    explanation: "ISO 15118 enables communication between EV and charger (including Plug & Charge), while OCPP (Open Charge Point Protocol) handles communication between chargers and back-end management systems for smart charging functionality."
  },
  {
    question: "What is Time-of-Use (ToU) tariff optimisation in smart charging?",
    options: [
      "Charging only during daytime",
      "Scheduling charging during lower-cost electricity periods",
      "Using only solar power",
      "Charging at maximum speed"
    ],
    correctIndex: 1,
    explanation: "Time-of-Use tariff optimisation schedules EV charging to coincide with off-peak electricity periods (typically overnight), reducing costs for the user while also helping to balance grid demand."
  }
];

// Quiz questions
const quizQuestions: QuizQuestion[] = [
  {
    question: "What is the main function of an Energy Management System (EMS) in EV charging installations?",
    options: [
      "To provide DC power conversion",
      "To coordinate charging loads with other building loads and supply capacity",
      "To replace the need for RCDs",
      "To measure battery capacity only"
    ],
    correctAnswer: 1,
    explanation: "An Energy Management System coordinates EV charging with other building electrical loads, monitors supply capacity, and manages charging schedules to optimise energy use and prevent overloading."
  },
  {
    question: "Dynamic load management differs from static load management in that it:",
    options: [
      "Never changes the charging current",
      "Continuously adjusts charging power based on real-time load monitoring",
      "Only works with Mode 3 charging",
      "Requires three-phase supply only"
    ],
    correctAnswer: 1,
    explanation: "Dynamic load management continuously monitors actual loads and adjusts charging power in real-time, whereas static load management allocates a fixed maximum power regardless of other actual loads."
  },
  {
    question: "OCPP (Open Charge Point Protocol) is primarily used for:",
    options: [
      "Communication between EV and charger",
      "Communication between charger and back-end management systems",
      "DC fast charging only",
      "Battery management"
    ],
    correctAnswer: 1,
    explanation: "OCPP is an open communication protocol used between charging stations and central management systems (back-end), enabling remote monitoring, control, and smart charging features."
  },
  {
    question: "What is 'vehicle-to-grid' (V2G) technology?",
    options: [
      "Charging EVs from solar panels",
      "Bi-directional power flow allowing EVs to export energy back to the grid",
      "One-way fast charging",
      "Wireless EV charging"
    ],
    correctAnswer: 1,
    explanation: "Vehicle-to-Grid (V2G) enables bi-directional power flow, allowing EVs not only to charge from the grid but also to discharge stored energy back to the grid or building when needed, supporting grid stability."
  },
  {
    question: "What CT (Current Transformer) sensors are typically used for in smart EV charging systems?",
    options: [
      "To measure battery voltage",
      "To monitor real-time current flow for load management",
      "To provide earth fault protection",
      "To convert AC to DC"
    ],
    correctAnswer: 1,
    explanation: "CT sensors are installed on incoming supply cables to monitor real-time current flow. This data enables dynamic load management by showing available capacity and triggering charging adjustments."
  },
  {
    question: "What is 'solar diversion' in the context of EV charging?",
    options: [
      "Using solar panels to power street lights",
      "Directing excess PV generation to EV charging rather than grid export",
      "Shading solar panels with EV ports",
      "Solar-powered EV displays"
    ],
    correctAnswer: 1,
    explanation: "Solar diversion prioritises using excess PV generation for EV charging rather than exporting to the grid, maximising self-consumption and reducing electricity costs."
  },
  {
    question: "According to BS 7671 Regulation 722.311, what must be considered when multiple EV charging points share supply?",
    options: [
      "Only the fastest charger counts",
      "Diversity factors and maximum demand assessment",
      "Each charger must have its own meter",
      "Only Mode 4 chargers can share supplies"
    ],
    correctAnswer: 1,
    explanation: "Regulation 722.311 requires assessment of maximum demand considering diversity factors when multiple charging points share a supply, as not all vehicles charge simultaneously at full power."
  },
  {
    question: "What is the typical communication method for home smart chargers to receive grid signals?",
    options: [
      "Physical cables only",
      "Wi-Fi or cellular connectivity to cloud services",
      "Infrared signals",
      "Radio broadcast"
    ],
    correctAnswer: 1,
    explanation: "Home smart chargers typically connect via Wi-Fi or cellular networks to cloud-based services, enabling them to receive grid signals, tariff information, and user preferences for optimised charging schedules."
  },
  {
    question: "What does 'scheduled charging' allow EV owners to do?",
    options: [
      "Charge immediately at maximum power",
      "Set specific times for charging to start and complete",
      "Bypass safety protection",
      "Use public chargers only"
    ],
    correctAnswer: 1,
    explanation: "Scheduled charging allows users to set departure times and preferred charging windows, enabling the system to charge during optimal periods (e.g., off-peak tariffs) while ensuring the vehicle is ready when needed."
  },
  {
    question: "In a commercial installation with multiple EV chargers, what is 'first-in-first-out' (FIFO) priority?",
    options: [
      "The newest charger gets priority",
      "Vehicles that plugged in first receive charging priority",
      "Only the first charger in a row works",
      "Emergency vehicles get priority"
    ],
    correctAnswer: 1,
    explanation: "FIFO priority ensures that when load management reduces available power, vehicles that connected first maintain their charging allocation, while later arrivals may receive reduced power or be queued."
  },
  {
    question: "What is the primary benefit of integrating EV charging with building energy management?",
    options: [
      "Eliminating the need for electrical protection",
      "Optimising total energy use and preventing demand peaks",
      "Increasing charging speed indefinitely",
      "Avoiding the need for electrical installation"
    ],
    correctAnswer: 1,
    explanation: "Integrating EV charging with building energy management allows coordinated control of all loads, preventing demand peaks that could exceed supply capacity or incur penalty charges, while optimising overall energy efficiency."
  }
];

// FAQs
const faqs: FAQ[] = [
  {
    question: "Do I need a smart charger for home EV charging?",
    answer: "Smart chargers are now required for new domestic installations under the Electric Vehicles (Smart Charge Points) Regulations 2021. They must be capable of responding to grid signals, scheduling charging off-peak, and random delay at installation to prevent grid strain. This also enables you to benefit from cheaper off-peak electricity tariffs."
  },
  {
    question: "How does dynamic load management protect my electrical installation?",
    answer: "Dynamic load management uses CT sensors to monitor your total electrical consumption in real-time. When other loads in the property increase (cooking, heating, etc.), the system automatically reduces EV charging power to prevent the total demand exceeding your supply capacity. This prevents overloading circuits and nuisance tripping of protective devices."
  },
  {
    question: "What is OCPP and why does it matter for commercial installations?",
    answer: "OCPP (Open Charge Point Protocol) is an open standard for communication between EV chargers and management systems. For commercial installations, OCPP-compliant chargers can work with any compatible back-end system, avoiding vendor lock-in. It enables remote monitoring, billing, user authentication, and smart charging features across multiple charger brands."
  },
  {
    question: "Can smart charging really reduce my electricity costs?",
    answer: "Yes, significantly. By scheduling charging during off-peak periods (typically 00:00-05:00), costs can be reduced by 50% or more compared to peak rates. Smart chargers can also integrate with solar PV to maximise self-consumption of free generated electricity. Some energy suppliers offer specific EV tariffs with very low overnight rates."
  },
  {
    question: "What is Vehicle-to-Grid (V2G) and is it available now?",
    answer: "V2G allows EVs to discharge stored energy back to the grid or building. This is emerging technology with limited availability in the UK currently. It requires compatible vehicles, bi-directional chargers, and appropriate agreements with energy suppliers. When mature, V2G could provide grid balancing services and generate income for EV owners."
  },
  {
    question: "How do I size a commercial installation with multiple EV chargers?",
    answer: "You cannot simply add up all charger ratings. BS 7671 Regulation 722.311 requires maximum demand assessment using appropriate diversity factors. For example, 10 x 7kW chargers might have only 40-60% diversity applied. Load management systems can further reduce required supply capacity by dynamically sharing available power between chargers based on actual usage."
  }
];

const Level3Module2Section4_4 = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useSEO(
    "4.4 Smart Charging and Load Management - Level 3 EV Charging",
    "Understanding smart charging technologies, load management systems, OCPP protocols, and energy optimisation for EV charging installations"
  );

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizComplete(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowQuiz(false);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Navigation Breadcrumb */}
      <div className="bg-[#242424] border-b border-[#333]">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 p-3 md:p-4 text-xs md:text-sm text-gray-400">
            <Link to="/apprentice-courses" className="hover:text-[#E8FF00] transition-colors">Courses</Link>
            <span>/</span>
            <Link to="/apprentice-courses/level-3" className="hover:text-[#E8FF00] transition-colors">Level 3</Link>
            <span>/</span>
            <Link to="/apprentice-courses/level-3/module-2" className="hover:text-[#E8FF00] transition-colors">Module 2</Link>
            <span>/</span>
            <Link to="/apprentice-courses/level-3/module-2/section-4" className="hover:text-[#E8FF00] transition-colors">Section 4</Link>
            <span>/</span>
            <span className="text-[#E8FF00]">4.4</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-[#E8FF00]/20 flex items-center justify-center">
              <Wifi className="h-6 w-6 text-[#E8FF00]" />
            </div>
            <div>
              <p className="text-[#E8FF00] text-sm font-medium">Section 4.4</p>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Smart Charging and Load Management</h1>
            </div>
          </div>
          <p className="text-gray-400 text-lg">
            Understanding smart charging technologies, load management systems, communication protocols, and energy optimisation for EV charging installations.
          </p>
        </div>

        {/* Learning Outcomes */}
        <Card className="p-6 mb-8 bg-[#242424] border-[#333]">
          <h2 className="text-lg font-semibold text-[#E8FF00] mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5" /> Learning Outcomes
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#E8FF00] mt-0.5 flex-shrink-0" />
              <span>Explain the principles and benefits of smart charging technology</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#E8FF00] mt-0.5 flex-shrink-0" />
              <span>Describe static and dynamic load management systems</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#E8FF00] mt-0.5 flex-shrink-0" />
              <span>Understand communication protocols including OCPP and ISO 15118</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#E8FF00] mt-0.5 flex-shrink-0" />
              <span>Apply diversity factors for multiple EV charging installations</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#E8FF00] mt-0.5 flex-shrink-0" />
              <span>Identify emerging technologies including V2G and solar integration</span>
            </li>
          </ul>
        </Card>

        {/* Quick Summary */}
        <Card className="p-4 mb-8 bg-[#E8FF00]/10 border-[#E8FF00]/30">
          <h3 className="font-semibold text-[#E8FF00] mb-2">Quick Summary</h3>
          <p className="text-gray-300 text-sm">
            Smart charging goes beyond simply supplying power to an EV - it optimises when, how fast, and from what source vehicles are charged. Load management prevents overloading by coordinating EV charging with other electrical loads. These technologies are essential for enabling widespread EV adoption without requiring costly infrastructure upgrades, while also reducing costs for users through off-peak charging and maximising use of renewable energy.
          </p>
        </Card>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Section 1: Smart Charging Fundamentals */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 text-[#E8FF00]" />
              Smart Charging Fundamentals
            </h2>

            <div className="space-y-4 text-gray-300">
              <p>
                Smart charging refers to EV charging systems that can communicate, adapt, and optimise the charging process based on various inputs. Unlike 'dumb' chargers that simply deliver maximum power whenever plugged in, smart chargers can:
              </p>

              <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                <h4 className="text-[#E8FF00] font-medium mb-3">Key Smart Charging Capabilities</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-[#E8FF00] mt-0.5" />
                    <span><strong>Scheduled Charging:</strong> Delay charging to start at user-defined times (e.g., when off-peak tariffs begin)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BarChart3 className="h-4 w-4 text-[#E8FF00] mt-0.5" />
                    <span><strong>Power Modulation:</strong> Adjust charging rate up or down based on grid signals or local conditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Wifi className="h-4 w-4 text-[#E8FF00] mt-0.5" />
                    <span><strong>Remote Monitoring:</strong> Report status, energy consumption, and faults to management systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-[#E8FF00] mt-0.5" />
                    <span><strong>Grid Response:</strong> React to grid operator signals during periods of high demand or low generation</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">UK Smart Charger Regulations</h3>
              <p>
                The Electric Vehicles (Smart Charge Points) Regulations 2021 mandate that all new domestic and workplace chargers sold in the UK must be smart chargers. Key requirements include:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                  <h4 className="text-[#E8FF00] font-medium mb-2">Mandatory Features</h4>
                  <ul className="text-sm space-y-1">
                    <li>- Off-peak default charging (not 8am-11am or 4pm-10pm)</li>
                    <li>- Randomised delay of up to 10 minutes on installation</li>
                    <li>- Ability to respond to demand-side response signals</li>
                    <li>- User-configurable charging schedules</li>
                    <li>- Measuring and recording energy consumption</li>
                  </ul>
                </div>
                <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                  <h4 className="text-[#E8FF00] font-medium mb-2">Purpose</h4>
                  <ul className="text-sm space-y-1">
                    <li>- Prevent grid overload from simultaneous charging</li>
                    <li>- Shift demand to off-peak periods</li>
                    <li>- Enable future smart grid integration</li>
                    <li>- Reduce need for grid reinforcement</li>
                    <li>- Lower costs for consumers</li>
                  </ul>
                </div>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[0]} />
          </section>

          {/* Section 2: Load Management Systems */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#E8FF00]" />
              Load Management Systems
            </h2>

            <div className="space-y-4 text-gray-300">
              <p>
                Load management is crucial for EV installations, particularly where supply capacity is limited or where multiple chargers are installed. Without load management, the combined demand from EV charging and other loads could exceed the available supply, causing overloads and nuisance tripping.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">Static Load Management</h3>
              <p>
                The simplest form of load management allocates a fixed maximum power to EV charging, regardless of other loads:
              </p>

              <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                <h4 className="text-[#E8FF00] font-medium mb-2">Example: Static Allocation</h4>
                <p className="text-sm mb-2">A property has 100A single-phase supply with estimated maximum demand of 60A for other loads:</p>
                <ul className="text-sm space-y-1">
                  <li>- Available for EV: 100A - 60A = 40A</li>
                  <li>- Static allocation: EV charger limited to 32A (7.4kW)</li>
                  <li>- Charger always limited to 32A even if other loads are minimal</li>
                </ul>
                <p className="text-sm mt-2 text-elec-yellow">Limitation: Doesn't utilise full capacity when other loads are low</p>
              </div>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">Dynamic Load Management</h3>
              <p>
                Dynamic systems continuously monitor actual loads and adjust EV charging in real-time:
              </p>

              <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                <h4 className="text-[#E8FF00] font-medium mb-2">Dynamic Load Management Components</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#E8FF00]">CT Sensors:</span>
                    <span>Current transformers installed on incoming supply to monitor real-time consumption</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E8FF00]">Controller:</span>
                    <span>Processes CT data and calculates available capacity for EV charging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E8FF00]">Communication:</span>
                    <span>Signals to charger to adjust power output (typically via Modbus, REST API, or proprietary protocols)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#242424] p-4 rounded-lg border border-[#333] mt-4">
                <h4 className="text-[#E8FF00] font-medium mb-2">Dynamic Operation Example</h4>
                <p className="text-sm mb-2">Same 100A supply:</p>
                <ul className="text-sm space-y-1">
                  <li>- 6am: Other loads 20A, EV charges at 32A (maximum)</li>
                  <li>- 7am: Electric shower on (40A), EV reduces to 32A</li>
                  <li>- 7:30am: Shower + cooker (65A total), EV reduces to 16A</li>
                  <li>- 8am: Morning peak (75A other loads), EV pauses or minimal charge</li>
                  <li>- 10am: Loads drop to 15A, EV resumes at 32A</li>
                </ul>
                <p className="text-sm mt-2 text-green-400">Benefit: Maximises charging while preventing overload</p>
              </div>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">Multiple Charger Load Sharing</h3>
              <p>
                For installations with multiple EV chargers, load management can share available capacity:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                  <h4 className="text-[#E8FF00] font-medium mb-2">Equal Sharing</h4>
                  <p className="text-sm mb-2">Available power divided equally between active chargers:</p>
                  <ul className="text-sm space-y-1">
                    <li>- 22kW available, 2 vehicles: 11kW each</li>
                    <li>- 22kW available, 4 vehicles: 5.5kW each</li>
                    <li>- Fair but may not suit all scenarios</li>
                  </ul>
                </div>
                <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                  <h4 className="text-[#E8FF00] font-medium mb-2">Priority-Based Sharing</h4>
                  <p className="text-sm mb-2">Power allocated based on rules:</p>
                  <ul className="text-sm space-y-1">
                    <li>- FIFO: First connected gets priority</li>
                    <li>- State of Charge: Low battery gets priority</li>
                    <li>- Departure time: Urgent needs prioritised</li>
                    <li>- User status: VIP/premium allocation</li>
                  </ul>
                </div>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[1]} />
          </section>

          {/* Section 3: Communication Protocols */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Wifi className="h-5 w-5 text-[#E8FF00]" />
              Communication Protocols
            </h2>

            <div className="space-y-4 text-gray-300">
              <p>
                Smart charging relies on standardised communication protocols to enable interoperability between different components and vendors.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">OCPP (Open Charge Point Protocol)</h3>
              <p>
                OCPP is the leading open protocol for communication between EV charging stations and central management systems:
              </p>

              <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                <h4 className="text-[#E8FF00] font-medium mb-3">OCPP Key Features</h4>
                <ul className="text-sm space-y-2">
                  <li><strong>Open Standard:</strong> Vendor-neutral, avoiding lock-in to proprietary systems</li>
                  <li><strong>Remote Management:</strong> Start/stop charging, update firmware, configure settings</li>
                  <li><strong>Smart Charging Profiles:</strong> Set charging schedules and power limits remotely</li>
                  <li><strong>Transactions:</strong> Authorisation, metering data, billing information</li>
                  <li><strong>Diagnostics:</strong> Status reporting, fault notifications, logs</li>
                </ul>
                <div className="mt-3 pt-3 border-t border-[#333]">
                  <p className="text-sm"><strong>Current Versions:</strong></p>
                  <ul className="text-sm mt-1">
                    <li>- OCPP 1.6 (SOAP/JSON): Widely deployed, mature features</li>
                    <li>- OCPP 2.0.1: Enhanced security, device management, ISO 15118 support</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">ISO 15118 (Vehicle-to-Grid Communication)</h3>
              <p>
                ISO 15118 defines communication between the EV and charging station, enabling advanced features:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                  <h4 className="text-[#E8FF00] font-medium mb-2">Plug & Charge</h4>
                  <ul className="text-sm space-y-1">
                    <li>- Automatic authentication when cable connected</li>
                    <li>- No RFID cards or apps required</li>
                    <li>- Secure certificate-based identification</li>
                    <li>- Seamless user experience</li>
                  </ul>
                </div>
                <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                  <h4 className="text-[#E8FF00] font-medium mb-2">Smart Charging Support</h4>
                  <ul className="text-sm space-y-1">
                    <li>- EV communicates battery state and needs</li>
                    <li>- Charger provides grid/pricing information</li>
                    <li>- Negotiated charging profiles</li>
                    <li>- V2G/V2H capability support</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">Other Communication Standards</h3>
              <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                <ul className="text-sm space-y-3">
                  <li>
                    <strong className="text-[#E8FF00]">Modbus:</strong> Industrial protocol often used for local load management between CT sensors, controllers, and chargers. Simple, reliable, widely supported.
                  </li>
                  <li>
                    <strong className="text-[#E8FF00]">OpenADR:</strong> Protocol for demand response signals from grid operators. Enables chargers to respond to grid stress events.
                  </li>
                  <li>
                    <strong className="text-[#E8FF00]">MQTT:</strong> Lightweight messaging protocol used for IoT devices including some smart charger integrations.
                  </li>
                  <li>
                    <strong className="text-[#E8FF00]">REST APIs:</strong> Web-based interfaces for cloud connectivity and third-party integrations.
                  </li>
                </ul>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[2]} />
          </section>

          {/* Section 4: Energy Optimisation */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-[#E8FF00]" />
              Energy Optimisation and Integration
            </h2>

            <div className="space-y-4 text-gray-300">
              <p>
                Smart charging enables various energy optimisation strategies that reduce costs and environmental impact.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">Time-of-Use Tariff Optimisation</h3>
              <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                <h4 className="text-[#E8FF00] font-medium mb-2">Off-Peak Charging Benefits</h4>
                <ul className="text-sm space-y-2">
                  <li><strong>Economy 7/10:</strong> Overnight rates typically 5-8p/kWh vs 25-35p/kWh peak</li>
                  <li><strong>EV-Specific Tariffs:</strong> Some suppliers offer 5p/kWh overnight for EVs</li>
                  <li><strong>Agile Tariffs:</strong> Half-hourly pricing, smart chargers can chase lowest prices</li>
                  <li><strong>Example Savings:</strong> 7.4kW charger running 8 hours overnight at 5p vs 30p = savings of approx. 14.80 per night</li>
                </ul>
              </div>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">Solar PV Integration</h3>
              <p>
                Integrating EV charging with solar PV maximises self-consumption of generated electricity:
              </p>

              <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                <h4 className="text-[#E8FF00] font-medium mb-3">Solar Diversion Strategies</h4>
                <ul className="text-sm space-y-2">
                  <li>
                    <strong>Excess Only:</strong> EV charges only when PV generation exceeds other consumption. May result in slow/interrupted charging but uses 100% solar.
                  </li>
                  <li>
                    <strong>Boosted Solar:</strong> Minimum charging rate maintained with grid top-up, increased when solar available. Better for ensuring adequate charge.
                  </li>
                  <li>
                    <strong>Scheduled + Solar:</strong> Daytime solar charging when available, overnight off-peak charging to complete. Balances solar use and reliability.
                  </li>
                </ul>
              </div>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">Vehicle-to-Grid (V2G) and Vehicle-to-Home (V2H)</h3>
              <p>
                Bi-directional charging enables EVs to become mobile energy storage assets:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                  <h4 className="text-[#E8FF00] font-medium mb-2">V2G (Vehicle-to-Grid)</h4>
                  <ul className="text-sm space-y-1">
                    <li>- EV exports power to grid during peak demand</li>
                    <li>- Provides grid balancing services</li>
                    <li>- Potential revenue from grid services</li>
                    <li>- Requires compatible vehicle and charger</li>
                    <li>- DNO agreement typically required</li>
                  </ul>
                </div>
                <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                  <h4 className="text-[#E8FF00] font-medium mb-2">V2H (Vehicle-to-Home)</h4>
                  <ul className="text-sm space-y-1">
                    <li>- EV powers home during outages</li>
                    <li>- Reduces peak demand charges</li>
                    <li>- Stores cheap overnight energy for daytime use</li>
                    <li>- Simpler than V2G (no grid interaction)</li>
                    <li>- Growing availability in UK market</li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 mt-4">
                <h4 className="text-elec-yellow font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" /> V2G/V2H Considerations
                </h4>
                <ul className="text-sm space-y-1 text-gray-300">
                  <li>- Battery warranty implications - check manufacturer terms</li>
                  <li>- Additional cycles may affect battery longevity</li>
                  <li>- Not all EVs support bi-directional charging</li>
                  <li>- Requires DC bi-directional charger or compatible AC system</li>
                  <li>- G99 application may be required for grid export</li>
                </ul>
              </div>

              <h3 className="text-lg font-medium text-white mt-6 mb-3">Diversity and Maximum Demand</h3>
              <p>
                BS 7671 Regulation 722.311 requires proper assessment of maximum demand for EV installations:
              </p>

              <div className="bg-[#242424] p-4 rounded-lg border border-[#333]">
                <h4 className="text-[#E8FF00] font-medium mb-2">Applying Diversity Factors</h4>
                <p className="text-sm mb-3">Not all chargers operate simultaneously at full power. Typical diversity allowances:</p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#333]">
                      <th className="text-left py-2">Number of Chargers</th>
                      <th className="text-left py-2">Diversity Factor</th>
                      <th className="text-left py-2">Example (7kW chargers)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#333]">
                      <td className="py-2">1-2</td>
                      <td className="py-2">100%</td>
                      <td className="py-2">2 x 7kW = 14kW</td>
                    </tr>
                    <tr className="border-b border-[#333]">
                      <td className="py-2">3-4</td>
                      <td className="py-2">80%</td>
                      <td className="py-2">4 x 7kW x 0.8 = 22.4kW</td>
                    </tr>
                    <tr className="border-b border-[#333]">
                      <td className="py-2">5-10</td>
                      <td className="py-2">60%</td>
                      <td className="py-2">10 x 7kW x 0.6 = 42kW</td>
                    </tr>
                    <tr>
                      <td className="py-2">11+</td>
                      <td className="py-2">40-50%</td>
                      <td className="py-2">20 x 7kW x 0.45 = 63kW</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-gray-400 mt-2">Note: Actual diversity depends on usage patterns. Load management systems can guarantee lower maximum demand.</p>
              </div>
            </div>

            <InlineCheck {...quickCheckQuestions[3]} />
          </section>

          {/* Practical Guidance */}
          <Card className="p-6 bg-[#242424] border-[#333]">
            <h3 className="text-lg font-semibold text-[#E8FF00] mb-4 flex items-center gap-2">
              <Home className="h-5 w-5" /> Practical Installation Guidance
            </h3>
            <div className="space-y-4 text-gray-300">
              <div>
                <h4 className="font-medium text-white mb-2">Domestic Smart Charger Setup</h4>
                <ul className="text-sm space-y-1">
                  <li>1. Install charger with Wi-Fi connectivity to household router</li>
                  <li>2. Configure app with user's electricity tariff (off-peak periods)</li>
                  <li>3. Set default charging schedule to off-peak hours</li>
                  <li>4. If PV present, configure solar diversion settings if supported</li>
                  <li>5. If dynamic load management required, install CT on main incoming supply</li>
                  <li>6. Test scheduled charging and load management operation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Commercial Load Management</h4>
                <ul className="text-sm space-y-1">
                  <li>1. Assess total available capacity and other loads</li>
                  <li>2. Select OCPP-compliant chargers for flexibility</li>
                  <li>3. Install CTs on incoming supply for dynamic monitoring</li>
                  <li>4. Configure Energy Management System with power limits</li>
                  <li>5. Set up user authentication and billing if required</li>
                  <li>6. Test load sharing between multiple active chargers</li>
                  <li>7. Document maximum demand calculations for compliance</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Common Questions */}
          <Card className="p-6 bg-[#242424] border-[#333]">
            <h3 className="text-lg font-semibold text-[#E8FF00] mb-4">Common Questions (FAQs)</h3>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border-[#333]">
                  <AccordionTrigger className="text-white hover:text-[#E8FF00]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          {/* Quick Reference */}
          <Card className="p-6 bg-[#242424] border-[#333]">
            <h3 className="text-lg font-semibold text-[#E8FF00] mb-4">Quick Reference</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-white mb-2">Key Regulations</h4>
                <ul className="text-gray-400 space-y-1">
                  <li>- EV Smart Charge Point Regs 2021</li>
                  <li>- BS 7671 Regulation 722.311 (demand)</li>
                  <li>- OCPP 1.6/2.0.1 for commercial</li>
                  <li>- ISO 15118 for Plug & Charge</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Key Benefits</h4>
                <ul className="text-gray-400 space-y-1">
                  <li>- 50%+ cost savings with off-peak charging</li>
                  <li>- Prevent overloads with load management</li>
                  <li>- Maximise solar self-consumption</li>
                  <li>- Future-proof for V2G services</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Quiz Section */}
          <Card className="p-6 bg-[#242424] border-[#333]">
            {!showQuiz ? (
              <div className="text-center">
                <h3 className="text-lg font-semibold text-[#E8FF00] mb-2">Test Your Knowledge</h3>
                <p className="text-gray-400 mb-4">Ready to test your understanding of smart charging and load management?</p>
                <Button
                  onClick={() => setShowQuiz(true)}
                  className="bg-[#E8FF00] text-black hover:bg-[#E8FF00]/90"
                >
                  Start Quiz ({quizQuestions.length} questions)
                </Button>
              </div>
            ) : quizComplete ? (
              <div className="text-center">
                <h3 className="text-lg font-semibold text-[#E8FF00] mb-2">Quiz Complete!</h3>
                <p className="text-2xl font-bold text-white mb-4">{score}/{quizQuestions.length}</p>
                <p className="text-gray-400 mb-4">
                  {score === quizQuestions.length
                    ? "Excellent! Perfect score!"
                    : score >= quizQuestions.length * 0.8
                    ? "Great work! You have a solid understanding."
                    : score >= quizQuestions.length * 0.6
                    ? "Good effort! Review the sections you missed."
                    : "Keep studying and try again!"}
                </p>
                <Button
                  onClick={restartQuiz}
                  className="bg-[#E8FF00] text-black hover:bg-[#E8FF00]/90"
                >
                  Restart Quiz
                </Button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-[#E8FF00]">Question {currentQuestion + 1}/{quizQuestions.length}</h3>
                  <span className="text-gray-400">Score: {score}</span>
                </div>
                <p className="text-white mb-4">{quizQuestions[currentQuestion].question}</p>
                <div className="space-y-2">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className={`w-full text-left p-3 rounded border transition-colors ${
                        selectedAnswer !== null
                          ? index === quizQuestions[currentQuestion].correctAnswer
                            ? "border-green-500 bg-green-500/10"
                            : index === selectedAnswer
                            ? "border-red-500 bg-red-500/10"
                            : "border-[#333] bg-[#1a1a1a]"
                          : "border-[#333] bg-[#1a1a1a] hover:border-[#E8FF00]/50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {showExplanation && (
                  <div className={`mt-4 p-3 rounded ${selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? "bg-green-500/10" : "bg-red-500/10"}`}>
                    <p className="text-gray-300 text-sm">{quizQuestions[currentQuestion].explanation}</p>
                  </div>
                )}
                {selectedAnswer !== null && (
                  <Button
                    onClick={nextQuestion}
                    className="mt-4 bg-[#E8FF00] text-black hover:bg-[#E8FF00]/90"
                  >
                    {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "See Results"}
                  </Button>
                )}
              </div>
            )}
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Link
            to="/apprentice-courses/level-3/module-2/section-4/4-3"
            className="flex items-center gap-2 px-4 py-2 bg-[#242424] border border-[#333] rounded hover:bg-[#333] text-white"
          >
            <ArrowLeft className="h-4 w-4" /> 4.3 Installation Requirements
          </Link>
          <Link
            to="/apprentice-courses/level-3/module-2/section-4/4-5"
            className="flex items-center gap-2 px-4 py-2 bg-[#E8FF00] text-black rounded hover:bg-[#E8FF00]/90"
          >
            4.5 Testing and Certification <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Level3Module2Section4_4;
