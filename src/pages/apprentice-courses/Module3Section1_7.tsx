import useSEO from "@/hooks/useSEO";
import { ArrowLeft, Cable, Zap, Shield, AlertTriangle, CheckCircle2, Home, Factory, Wrench, Scissors, Settings, Calculator, Router, Smartphone, Target, ThermometerSun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const ScenarioCard = ({ 
  title, 
  scenario, 
  options, 
  correctAnswer, 
  explanation 
}: {
  title: string;
  scenario: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleRevealAnswer = () => {
    setShowAnswer(true);
  };

  const resetScenario = () => {
    setSelectedOption(null);
    setShowAnswer(false);
  };

  return (
    <Card className="p-6 bg-transparent border-white/20">
      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
        <Target className="w-5 h-5 text-elec-yellow" />
        {title}
      </h4>
      <div className="bg-elec-yellow/5/50 dark:bg-elec-yellow/10 p-4 rounded-lg mb-4">
        <p className="text-xs sm:text-sm text-white">{scenario}</p>
      </div>
      
      <div className="space-y-3 mb-4">
        <p className="font-medium text-xs sm:text-sm text-white">Choose the best option:</p>
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(index)}
            disabled={showAnswer}
            className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
              selectedOption === index
                ? showAnswer
                  ? index === correctAnswer
                    ? 'bg-green-500/20 border-green-400/50 text-green-800 dark:text-green-200'
                    : 'bg-red-500/20 border-red-400/50 text-red-800 dark:text-red-200'
                  : 'bg-elec-yellow/20 border-elec-yellow/20 text-blue-800 dark:text-blue-200'
                : showAnswer && index === correctAnswer
                ? 'bg-green-500/20 border-green-400/50 text-green-800 dark:text-green-200'
                : 'bg-white dark:bg-card border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-elec-yellow text-gray-900 dark:text-gray-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                selectedOption === index
                  ? showAnswer
                    ? index === correctAnswer
                      ? 'border-green-400 bg-green-400'
                      : 'border-red-400 bg-red-400'
                    : 'border-elec-yellow bg-elec-yellow'
                  : showAnswer && index === correctAnswer
                  ? 'border-green-400 bg-green-400'
                  : 'border-gray-400 bg-transparent'
              }`}>
                {showAnswer && (
                  <>
                    {index === correctAnswer ? (
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    ) : selectedOption === index ? (
                      <span className="text-white text-xs">✗</span>
                    ) : null}
                  </>
                )}
              </div>
              <span className="text-sm text-black dark:text-white font-medium">{String.fromCharCode(97 + index)}) {option}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        {!showAnswer && selectedOption !== null && (
          <Button onClick={handleRevealAnswer} size="sm" className="bg-elec-yellow hover:bg-blue-700">
            Show Answer
          </Button>
        )}
        {showAnswer && (
          <Button onClick={resetScenario} size="sm" variant="outline">
            Try Again
          </Button>
        )}
      </div>

      {showAnswer && (
        <div className={`mt-4 p-4 rounded-lg border ${
          selectedOption === correctAnswer
            ? 'bg-card border-gray-400/30 text-gray-700 dark:text-gray-300'
            : 'bg-card border-gray-400/30 text-gray-700 dark:text-gray-300'
        }`}>
          <p className="font-medium mb-2">
            {selectedOption === correctAnswer ? '✓ Correct!' : 'ℹ Explanation:'}
          </p>
          <p className="text-sm">{explanation}</p>
        </div>
      )}
    </Card>
  );
};

const quickCheckQuestions = [
  {
    id: "cable-selection",
    question: "What is the most critical factor when selecting cable for underground installation?",
    options: ["Cost", "Mechanical protection", "Colour", "Flexibility"],
    correctIndex: 1,
    explanation: "Mechanical protection is essential for underground cables to prevent damage from soil pressure, digging, and environmental factors."
  },
  {
    id: "temperature-derating",
    question: "Why might you need to upsize a cable when installing over thermal insulation?",
    options: ["For easier installation", "Due to temperature derating effects", "To meet voltage drop requirements", "For mechanical strength"],
    correctIndex: 1,
    explanation: "Thermal insulation reduces a cable's ability to dissipate heat, requiring derating or upsizing to maintain safe current capacity."
  },
  {
    id: "environmental-factors",
    question: "Which environmental factor is most damaging to standard PVC cable sheaths?",
    options: ["Cold temperatures", "UV radiation", "High humidity", "Wind"],
    correctIndex: 1,
    explanation: "UV radiation from sunlight causes PVC degradation, making UV-resistant cables or physical protection necessary for outdoor installations."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which cable type is most suitable for direct burial in domestic gardens?",
    options: ["Twin and Earth", "PVC flex", "Steel Wire Armoured (SWA)", "Cat6 data cable"],
    correctAnswer: 2,
    explanation: "SWA cable provides the mechanical protection required for direct burial applications and meets BS 7671 requirements."
  },
  {
    id: 2,
    question: "When installing cables over thermal insulation, what adjustment is typically required?",
    options: ["Use smaller cable size", "Increase cable size for derating", "Use different colours", "Install faster"],
    correctAnswer: 1,
    explanation: "Thermal insulation reduces heat dissipation, requiring cable derating or upsizing to maintain safe current capacity."
  },
  {
    id: 3,
    question: "What type of cable should be used for a portable appliance connection?",
    options: ["Twin and Earth", "SWA cable", "Flexible cord", "Singles in conduit"],
    correctAnswer: 2,
    explanation: "Portable appliances require flexible cords that can withstand repeated movement without conductor damage."
  },
  {
    id: 4,
    question: "For outdoor installations exposed to sunlight, which cable feature is essential?",
    options: ["High current capacity", "UV resistance", "Low cost", "Bright colours"],
    correctAnswer: 1,
    explanation: "UV resistance prevents degradation of cable sheaths when exposed to sunlight over extended periods."
  },
  {
    id: 5,
    question: "In high-temperature environments, which cable characteristic is most important?",
    options: ["Flexibility", "Heat resistance", "Low impedance", "Small size"],
    correctAnswer: 1,
    explanation: "Heat-resistant insulation maintains integrity and safety at elevated temperatures where standard PVC would fail."
  },
  {
    id: 6,
    question: "Which cable type is required for computer network installations?",
    options: ["Twin and Earth", "Cat6 twisted pair", "Alarm cable", "Speaker wire"],
    correctAnswer: 1,
    explanation: "Cat6 twisted pair cable is specifically designed for high-speed data transmission and network applications."
  },
  {
    id: 7,
    question: "What is the primary consideration when selecting cable for bathroom underfloor heating?",
    options: ["Low cost", "Heat resistance and moisture protection", "Easy installation", "High flexibility"],
    correctAnswer: 1,
    explanation: "Bathroom underfloor heating requires heat-resistant cables with moisture protection for safe, long-term operation."
  },
  {
    id: 8,
    question: "Which installation method requires the highest level of mechanical protection?",
    options: ["Clipped to walls", "In plastic trunking", "Direct burial", "In ceiling voids"],
    correctAnswer: 2,
    explanation: "Direct burial exposes cables to soil pressure, potential digging damage, and environmental hazards requiring maximum protection."
  },
  {
    id: 9,
    question: "When would you select LSZH cable over standard PVC?",
    options: ["For cost savings", "In escape routes and public buildings", "For better flexibility", "For higher current capacity"],
    correctAnswer: 1,
    explanation: "LSZH (Low Smoke Zero Halogen) cables reduce toxic emissions in fires, making them essential for public buildings and escape routes."
  },
  {
    id: 10,
    question: "What factor determines the minimum burial depth for underground cables?",
    options: ["Cable size", "Location and risk of mechanical damage", "Installation cost", "Cable colour"],
    correctAnswer: 1,
    explanation: "Burial depth is determined by the location (gardens vs roads) and potential for mechanical damage from activities above."
  }
];

const scenarios = [
  {
    title: "Scenario 1 – Garden Workshop Supply",
    scenario: "You need to run power to a small timber workshop 15m from the house. The cable will be buried directly in the garden. The load will include lighting and power tools (approx. 20A).",
    options: [
      "Twin and Earth clipped to a fence",
      "Steel Wire Armoured (SWA) cable buried at correct depth",
      "Flexible PVC cord in plastic conduit"
    ],
    correctAnswer: 1,
    explanation: "SWA provides mechanical protection for underground runs, meeting BS 7671 requirements. Twin and Earth is not suitable for direct burial, and flex in conduit would be less durable and non-compliant for fixed outdoor supply."
  },
  {
    title: "Scenario 2 – Loft Lighting Circuit", 
    scenario: "A new lighting circuit is being installed in a domestic loft. The cables will run over insulation material.",
    options: [
      "Standard Twin and Earth",
      "Twin and Earth sized up to allow for derating", 
      "Flexible cord"
    ],
    correctAnswer: 1,
    explanation: "Thermal insulation reduces a cable's ability to dissipate heat, lowering its current capacity. Upsizing ensures compliance with current-carrying requirements. Standard size may overheat, and flexible cord is not permitted for fixed wiring."
  },
  {
    title: "Scenario 3 – Portable Heater in an Office",
    scenario: "You are supplying a 2kW portable heater to be plugged into a socket.",
    options: [
      "PVC insulated flexible cord rated for the load",
      "Twin and Earth cable",
      "Cat6 data cable"
    ],
    correctAnswer: 0,
    explanation: "Portable appliances require flexible cords for movement without damage. T&E is for fixed wiring, and Cat6 is for data, not power."
  },
  {
    title: "Scenario 4 – Outdoor Security Lights on a Wall",
    scenario: "Two LED floodlights are mounted on an external brick wall. The cable run is exposed to sunlight and weather.",
    options: [
      "Standard Twin and Earth cable",
      "UV-resistant cable in suitable conduit or trunking",
      "SWA cable without termination"
    ],
    correctAnswer: 1,
    explanation: "UV light degrades PVC sheathing. Outdoor runs require UV-resistant sheaths or physical protection. SWA could be used but must be properly terminated, which option (c) omits."
  },
  {
    title: "Scenario 5 – High-Temperature Area Above a Commercial Oven",
    scenario: "You need to wire a ventilation fan installed directly above a commercial oven.",
    options: [
      "Standard Twin and Earth cable",
      "Heat-resistant flexible cable (e.g., silicone or high-temp PVC)",
      "SWA cable"
    ],
    correctAnswer: 1,
    explanation: "High temperatures can degrade standard PVC insulation. Heat-resistant cable is necessary. SWA offers mechanical protection but not high-heat tolerance."
  },
  {
    title: "Scenario 6 – Data Network in an Office",
    scenario: "Installing 24 network points for office computers.",
    options: [
      "Cat6 twisted pair cable",
      "Twin and Earth cable", 
      "Alarm cable"
    ],
    correctAnswer: 0,
    explanation: "Data networks require twisted pair cabling for high-speed communication. T&E and alarm cables are not suitable for networking and will not meet performance or compliance requirements."
  },
  {
    title: "Scenario 7 – Underfloor Heating Mat Connection",
    scenario: "Connecting a fixed electric underfloor heating mat in a bathroom.",
    options: [
      "Standard Twin and Earth cable",
      "Heat-resistant cable in suitable containment",
      "Flexible PVC cord"
    ],
    correctAnswer: 1,
    explanation: "Heat-resistant cable is essential to handle prolonged high temperatures from heating mats. PVC flex may soften and degrade over time, and T&E is not designed for continuous high heat in such applications."
  }
];

const Module3Section1_7: React.FC = () => {
  useSEO(
    "Selecting Cables Based on Application and Environment – Module 3 (3.1.7)",
    "Learn to select the correct cables for different applications and environments. Interactive scenarios covering SWA, heat-resistant, UV-resistant cables and more."
  );

  const faqs = [
    { q: "How do I determine the correct cable size for a given load?", a: "Consider the load current, installation method, ambient temperature, grouping factors, and voltage drop requirements. Use BS 7671 tables and apply all relevant derating factors." },
    { q: "When is SWA cable required over standard T&E?", a: "SWA is required for direct burial, high mechanical risk areas, and where enhanced protection is needed. It's essential for underground supplies and industrial environments." },
    { q: "What makes a cable 'heat-resistant' and when is it needed?", a: "Heat-resistant cables use special insulation materials (silicone, XLPE, high-temp PVC) that maintain properties at elevated temperatures. Required near heat sources, in plant rooms, and for heating circuits." },
    { q: "How does thermal insulation affect cable sizing?", a: "Thermal insulation reduces heat dissipation, requiring derating or cable upsizing. The derating factor depends on insulation type and thickness - refer to BS 7671 Appendix 4." },
    { q: "What environmental factors must be considered in cable selection?", a: "Temperature (ambient and operating), UV exposure, moisture, chemicals, mechanical stress, fire requirements, and installation method all influence cable choice." },
    { q: "When should LSZH cables be used instead of PVC?", a: "LSZH cables are required in escape routes, public buildings, transport systems, and areas where people may be trapped during fires to reduce toxic emissions." }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">Section 3.1.7</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">Selecting Cables Based on Application and Environment</h1>
          <p className="text-white">Learn to choose the right cable for every situation through interactive real-world scenarios.</p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Correct cable selection prevents overheating, voltage drop, and fire hazards.</li>
                <li>Consider current capacity, environment, installation method, and protection needs.</li>
                <li>BS 7671 requires cables to meet both electrical and environmental requirements.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Consider temperature, UV exposure, mechanical risk, and installation method.</li>
                <li><strong>Use:</strong> SWA for burial, heat-resistant for high temps, UV-resistant outdoors.</li>
                <li><strong>Check:</strong> Current capacity, derating factors, environmental suitability, compliance.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Apply systematic cable selection principles based on application requirements and environmental conditions.</li>
            <li>Identify when specific cable types (SWA, heat-resistant, UV-resistant) are required for safety and compliance.</li>
            <li>Understand the impact of installation methods and environmental factors on cable performance.</li>
            <li>Select appropriate cables for mechanical protection, temperature resistance, and chemical exposure.</li>
            <li>Apply derating factors for thermal insulation, grouping, and ambient temperature conditions.</li>
            <li>Ensure cable selections meet both electrical performance and regulatory requirements under BS 7671.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Cable Selection Principles</h2>

          {/* Selection Criteria */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2"><Wrench className="w-5 h-5" /> Key Selection Criteria</h3>
            <div className="space-y-4 text-xs sm:text-sm text-white">
              
              <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Electrical Requirements</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Current capacity:</strong> Design current plus derating factors</li>
                    <li><strong>Voltage drop:</strong> Maximum 3% for lighting, 5% for power</li>
                    <li><strong>Short circuit rating:</strong> Withstand fault currents safely</li>
                    <li><strong>Earth loop impedance:</strong> Enable protective device operation</li>
                    <li><strong>Harmonic compatibility:</strong> Consider non-linear loads</li>
                  </ul>
                </div>
                <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                  <p className="font-medium mb-2">Environmental Factors</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Temperature:</strong> Ambient and operating temperature ranges</li>
                    <li><strong>UV exposure:</strong> Sunlight degradation of PVC sheaths</li>
                    <li><strong>Moisture:</strong> Humidity, condensation, direct water contact</li>
                    <li><strong>Chemical exposure:</strong> Oils, acids, cleaning agents</li>
                    <li><strong>Mechanical stress:</strong> Vibration, movement, impact risk</li>
                  </ul>
                </div>
                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Installation Method</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Direct burial:</strong> Requires armoured or protected cables</li>
                    <li><strong>Clipped direct:</strong> Standard installation with air cooling</li>
                    <li><strong>In insulation:</strong> Thermal derating required</li>
                    <li><strong>Enclosed (conduit/trunking):</strong> Grouping factors apply</li>
                    <li><strong>Underground ducts:</strong> Pulling forces and access needs</li>
                  </ul>
                </div>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
                <p className="font-medium mb-3">BS 7671 Selection Requirements:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Section 521:</strong> Types of wiring systems and their applications</li>
                    <li><strong>Section 522:</strong> Selection and erection with respect to external influences</li>
                    <li><strong>Section 523:</strong> Current-carrying capacity and voltage drop</li>
                    <li><strong>Appendix 4:</strong> Current-carrying capacity tables and derating factors</li>
                  </ul>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Table 4A1-4A3:</strong> Installation methods and reference conditions</li>
                    <li><strong>Table 4B1-4B4:</strong> Current-carrying capacity for different cable types</li>
                    <li><strong>Table 4C1-4C6:</strong> Voltage drop calculations and limits</li>
                    <li><strong>Table 4D1A-4D5A:</strong> Derating factors for various conditions</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ic-selection-criteria"
            question="Which BS 7671 section covers selection with respect to external influences?"
            options={["Section 521", "Section 522", "Section 523", "Appendix 4"]}
            correctIndex={1}
            explanation="Section 522 specifically covers selection and erection of wiring systems with respect to external influences including environment and installation conditions."
          />
          <Separator className="my-6" />

          {/* Environmental Classifications */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2"><ThermometerSun className="w-5 h-5" /> Environmental Classifications</h3>
            <div className="space-y-4 text-xs sm:text-sm text-white">
              
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-3">External Influence Classifications (IP Codes)</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium mb-2">Temperature Classifications</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>AA4:</strong> -5°C to +40°C (normal indoor conditions)</li>
                      <li><strong>AA5:</strong> -20°C to +40°C (unheated buildings)</li>
                      <li><strong>AA6:</strong> -5°C to +60°C (boiler rooms, near heat sources)</li>
                      <li><strong>AA7:</strong> -25°C to +55°C (external installations)</li>
                      <li><strong>AA8:</strong> -50°C to +40°C (cold storage, refrigeration)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Moisture Classifications</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>AD1:</strong> Negligible (dry indoor conditions)</li>
                      <li><strong>AD2:</strong> Free-falling drops (slight condensation)</li>
                      <li><strong>AD3:</strong> Spraying water (rain, washing)</li>
                      <li><strong>AD4:</strong> Splashing water (bathrooms, kitchens)</li>
                      <li><strong>AD8:</strong> Submersion (swimming pools, fountains)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Mechanical Impact (AG)</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>AG1:</strong> Light (0.225 J) - domestic/office areas</li>
                    <li><strong>AG2:</strong> Medium (0.5 J) - industrial areas</li>
                    <li><strong>AG3:</strong> High (5.0 J) - areas with heavy machinery</li>
                    <li><strong>Direct burial:</strong> Requires maximum protection</li>
                  </ul>
                </div>
                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Solar Radiation (AN)</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>AN1:</strong> Low (indoor installations)</li>
                    <li><strong>AN2:</strong> Medium (limited outdoor exposure)</li>
                    <li><strong>AN3:</strong> High (direct sunlight exposure)</li>
                    <li><strong>UV protection:</strong> Essential for AN2/AN3</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ic-environmental"
            question="Which environmental classification covers direct sunlight exposure requiring UV protection?"
            options={["AN1", "AN2", "AN3", "AD3"]}
            correctIndex={2}
            explanation="AN3 represents high solar radiation with direct sunlight exposure, requiring UV-resistant cables or protection systems."
          />
          <Separator className="my-6" />
        </Card>

        {/* Interactive Scenarios */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Interactive Cable Selection Scenarios</h2>
          <p className="text-sm text-white mb-6">
            Test your cable selection knowledge with these real-world scenarios. Choose your answer, then reveal the correct solution with detailed explanation.
          </p>
          
          <div className="space-y-6">
            {scenarios.map((scenario, index) => (
              <ScenarioCard key={index} {...scenario} />
            ))}
          </div>
        </Card>

        {/* Quick Knowledge Checks */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quick knowledge checks</h2>
          <div className="space-y-6">
            {quickCheckQuestions.map((q) => (
              <InlineCheck key={q.id} {...q} />
            ))}
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-8 p-6 border border-green-400/30">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Real-world example</h2>
          <div className="text-xs sm:text-sm text-white space-y-3">
            <p><strong>Industrial Food Processing Plant Cable Selection Challenge</strong></p>
            <p>
              An industrial food processing plant required electrical installation across multiple environmental zones, 
              each presenting unique challenges for cable selection. The project highlighted the importance of systematic 
              cable selection based on detailed environmental assessment.
            </p>
            <p><strong>Environmental Challenges Identified:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>High-temperature areas:</strong> Near ovens and steam equipment reaching 85°C ambient</li>
              <li><strong>Wash-down zones:</strong> High-pressure cleaning with chemical detergents</li>
              <li><strong>Cold storage:</strong> Freezer areas operating at -25°C continuously</li>
              <li><strong>External distribution:</strong> Cables exposed to UV radiation and weather</li>
              <li><strong>Mechanical risk areas:</strong> Fork-lift traffic and heavy machinery zones</li>
              <li><strong>Hygiene requirements:</strong> Food-safe materials and easy-clean installations</li>
            </ul>
            <p><strong>Cable Selection Solutions Applied:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>High-temperature zones:</strong> Silicone-insulated cables rated to 150°C with mineral insulation near ovens</li>
              <li><strong>Wash-down areas:</strong> LSZH cables in IP67-rated stainless steel trunking systems</li>
              <li><strong>Cold storage:</strong> Arctic-grade cables maintaining flexibility to -40°C</li>
              <li><strong>External runs:</strong> UV-stabilised SWA cables with additional mechanical protection</li>
              <li><strong>High-risk areas:</strong> Steel-tape armoured cables in heavy-duty galvanised trunking</li>
              <li><strong>Hygiene zones:</strong> Smooth-sheathed cables in sealed, washable containment systems</li>
            </ul>
            <p><strong>Results and Lessons Learned:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Zero cable failures during 3-year operational period despite harsh conditions</li>
              <li>Correct environmental assessment prevented costly cable replacement projects</li>
              <li>Systematic selection approach saved 40% compared to over-specifying throughout</li>
              <li>Detailed documentation enabled efficient maintenance and future modifications</li>
              <li>Compliance with food industry standards achieved without compromising electrical performance</li>
            </ul>
            <p>
              This project demonstrated that systematic cable selection based on accurate environmental assessment 
              delivers reliable, cost-effective installations that meet both electrical and operational requirements.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently asked questions</h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            {faqs.map((faq, index) => (
              <div key={index}>
                <p className="font-medium mb-1">{faq.q}</p>
                <p className="text-white">{faq.a}</p>
                {index < faqs.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 border border-border/30">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Summary</h2>
          <div className="text-xs sm:text-sm text-white space-y-3">
            <p>
              Correct cable selection is fundamental to electrical safety, system reliability, and regulatory compliance. 
              The process requires systematic consideration of electrical, environmental, and installation factors to 
              ensure optimal performance throughout the cable's service life.
            </p>
            <p>Key principles for successful cable selection:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Systematic approach:</strong> Consider all electrical and environmental requirements methodically</li>
              <li><strong>Environmental assessment:</strong> Accurately classify temperature, moisture, UV, and mechanical risks</li>
              <li><strong>Derating factors:</strong> Apply appropriate factors for installation method, grouping, and ambient conditions</li>
              <li><strong>Future-proofing:</strong> Consider potential changes in load, environment, or operational requirements</li>
              <li><strong>Cost-effectiveness:</strong> Balance initial cost against reliability, maintenance, and replacement costs</li>
              <li><strong>Compliance verification:</strong> Ensure selection meets all relevant standards and regulations</li>
              <li><strong>Documentation:</strong> Record selection rationale and environmental assumptions for future reference</li>
            </ul>
            <p>
              By mastering these cable selection principles and practicing with real-world scenarios, electricians can 
              confidently specify the right cable for every application, ensuring safe, reliable, and compliant electrical installations.
            </p>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Test your knowledge</h2>
          <Quiz questions={quizQuestions} title="Cable Selection Knowledge Test" />
        </Card>
      </main>
    </div>
  );
};

export default Module3Section1_7;