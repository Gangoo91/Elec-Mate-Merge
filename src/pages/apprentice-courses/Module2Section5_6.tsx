import useSEO from "@/hooks/useSEO";
import { ArrowLeft, AlertTriangle, Thermometer, Wrench, Plug, TrendingDown, CheckCircle, Calculator, Zap, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import React from "react";

const quizQuestions = [
  {
    id: 1,
    question: "A lighting circuit at the end of a long corridor is noticeably dimmer than at the consumer unit. What's the most likely cause?",
    options: ["Faulty lamps", "Excessive voltage drop due to cable resistance", "RCD tripping", "Phase imbalance"],
    correctAnswer: 1,
    explanation: "Long cable runs with high resistance cause voltage drop, reducing voltage at the load end and making lights appear dimmer."
  },
  {
    id: 2,
    question: "You find a socket outlet that's warm to touch and has slight discolouration. What should you do first?",
    options: ["Ignore it if it's working", "Isolate immediately and investigate", "Reduce the load", "Replace the socket"],
    correctAnswer: 1,
    explanation: "Warm outlets with discolouration indicate overheating, often from loose connections. Isolate immediately for safety before investigating."
  },
  {
    id: 3,
    question: "An EV charger keeps derating from 32A to 16A during charging. The most likely cause is:",
    options: ["Faulty charger", "Voltage drop on the supply cable", "Wrong MCB size", "Earth fault"],
    correctAnswer: 1,
    explanation: "EV chargers monitor supply voltage. Excessive voltage drop under load causes automatic derating to maintain safe operation."
  },
  {
    id: 4,
    question: "A motor circuit has high Zs readings. This could cause:",
    options: ["Faster protection", "Slower fault disconnection", "Better motor performance", "No effect"],
    correctAnswer: 1,
    explanation: "High Zs reduces fault current, potentially causing protective devices to operate more slowly or not at all."
  },
  {
    id: 5,
    question: "When checking for overheating, the best method is:",
    options: ["Visual inspection only", "Touch test", "Thermal imaging under load", "Multimeter readings"],
    correctAnswer: 2,
    explanation: "Thermal imaging under load reveals hot spots that may not be visible or safely touchable, providing accurate temperature data."
  },
  {
    id: 6,
    question: "A 50m cable run to a workshop keeps tripping the MCB when high-current tools are used. Best solution:",
    options: ["Larger MCB", "RCD instead of MCB", "Larger cable CSA or shorter route", "Lower current tools only"],
    correctAnswer: 2,
    explanation: "Voltage drop causes higher current draw. Larger CSA or shorter route reduces resistance and voltage drop."
  },
  {
    id: 7,
    question: "Loose terminations cause heating because:",
    options: ["More current flows", "Contact resistance increases, causing I²R losses", "Voltage increases", "Insulation breaks down"],
    correctAnswer: 1,
    explanation: "Loose connections create high contact resistance. Power loss = I²R, so higher resistance with same current creates more heat."
  },
  {
    id: 8,
    question: "Signs of thermal damage to cables include:",
    options: ["Bright copper conductors", "Soft or brittle insulation", "Increased flexibility", "Better conductivity"],
    correctAnswer: 1,
    explanation: "Heat damages insulation, making it either soft and deformable or hard and brittle, both indicating thermal stress."
  },
  {
    id: 9,
    question: "A cable installed in a hot environment (40°C ambient) carries the same current as one at 20°C. What happens to its resistance?",
    options: ["Resistance decreases", "Resistance increases", "No change in resistance", "Depends on cable type only"],
    correctAnswer: 1,
    explanation: "Cable resistance increases with temperature. At 40°C, copper resistance is about 8% higher than at 20°C, requiring derating calculations."
  },
  {
    id: 10,
    question: "Multiple cables are grouped in a conduit, causing higher temperatures. This affects:",
    options: ["Only the cable current rating", "Both resistance and current rating", "Only the insulation colour", "Nothing significant"],
    correctAnswer: 1,
    explanation: "Higher temperatures increase cable resistance AND reduce current-carrying capacity. Both effects must be considered in design calculations."
  }
];

const faqs = [
  {
    q: "How do I know if voltage drop is causing problems?",
    a: "Look for dim lighting at circuit ends, motors that struggle to start, equipment showing undervoltage alarms, or protective devices nuisance tripping. Measure voltage under load at the problem location."
  },
  {
    q: "What's the quickest way to check for overheating?",
    a: "Use thermal imaging under normal load conditions. Look for hot spots at terminations, joints, and along cable runs. Compare temperatures between phases and similar circuits."
  },
  {
    q: "When should I upsize a cable?",
    a: "When voltage drop exceeds design limits (3% lighting, 5% others), when you see signs of overheating, or when installing higher-power equipment on existing circuits."
  },
  {
    q: "How often should terminations be checked?",
    a: "Check during installation, initial testing, and periodic inspection. High-current circuits and outdoor installations may need more frequent checks due to thermal cycling."
  },
  {
    q: "What's the difference between voltage drop and power loss?",
    a: "Voltage drop is the voltage lost along the cable (affects equipment operation). Power loss is energy wasted as heat in the cable (affects running costs and heating)."
  },
  {
    q: "Can I just increase the MCB size to stop tripping?",
    a: "No! The MCB protects the cable. If it's tripping due to voltage drop, you need to fix the voltage drop, not increase protection. Wrong MCB size creates fire risk."
  }
];

const Module2Section5_6: React.FC = () => {
  useSEO(
    "Real-World Impacts of Resistance – Module 2 (2.5.6)",
    "Comprehensive guide to identifying and solving resistance-related problems: overheating, voltage drop, equipment failures, and BS 7671 compliance solutions."
  );

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2.5
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-8 w-8 text-elec-yellow" />
            <div>
              <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 2.5.6
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Real-World Impacts of Resistance
              </h1>
              <p className="text-xl text-white max-w-3xl mt-2">
                Identifying and solving resistance problems: overheating, voltage drop, and equipment failures
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Real problems:</strong> Overheating, dim lights, equipment failures</li>
                <li><strong>Root cause:</strong> Excessive resistance in cables and connections</li>
                <li><strong>Effects:</strong> Safety risks, energy waste, equipment damage</li>
                <li><strong>Solutions:</strong> Proper sizing, good connections, regular checks</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Warm outlets, dim lights, nuisance tripping</li>
                <li><strong>Use:</strong> Thermal imaging, voltage measurements, torque checks</li>
                <li><strong>Apply:</strong> Cable sizing, connection quality, design limits</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Objectives */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <div className="space-y-3">
            {[
              "Identify signs of excessive resistance and overheating in electrical installations",
              "Understand the relationship between resistance, voltage drop, and equipment performance",
              "Diagnose common resistance-related problems using appropriate test methods",
              "Apply practical solutions to reduce resistance and improve system performance",
              "Recognise the safety implications of poor connections and high resistance",
              "Use thermal imaging and electrical testing to locate resistance problems",
              "Implement preventive measures to avoid resistance-related failures"
            ].map((goal, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <p className="text-white">{goal}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* The Problem: What Goes Wrong */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">The Problem: What Goes Wrong</h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <h3 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2"><Thermometer className="w-4 h-4"/> Overheating Issues</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Loose connections create high contact resistance → I²R heating</li>
                <li>Undersized cables carrying high currents heat up excessively</li>
                <li>Poor ventilation and cable grouping increase temperatures</li>
                <li>Thermal cycling loosens connections over time</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
              <h3 className="font-semibold text-amber-300 mb-2 flex items-center gap-2"><TrendingDown className="w-4 h-4"/> Voltage Drop Problems</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Long cable runs with small CSA cause excessive voltage drop</li>
                <li>Equipment operates below rated voltage → poor performance</li>
                <li>Motors draw higher current when voltage is low</li>
                <li>LED drivers and electronic equipment may malfunction</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <h3 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2"><Zap className="w-4 h-4"/> Protection Issues</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>High resistance increases Zs → slower fault disconnection</li>
                <li>Undervoltage causes nuisance tripping of sensitive loads</li>
                <li>Arc fault conditions more likely with poor connections</li>
                <li>RCD sensitivity may be affected by voltage variations</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Comprehensive Real-World Scenarios */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Comprehensive Real-World Scenarios</h2>
          
          <div className="space-y-6">
            {/* Scenario 1: Office Building */}
            <div className="border border-elec-yellow/30 rounded-lg p-4 bg-elec-yellow/5">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Eye className="w-4 h-4 text-elec-yellow"/>
                Scenario 1: Office Building - Dim Corridor Lighting
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-2">The Problem:</p>
                  <ul className="list-disc pl-6 space-y-1 text-white">
                    <li>Staff complain about dim lighting at the far end of a 60m corridor</li>
                    <li>LED fittings are flickering intermittently</li>
                    <li>Some LED drivers are shutting down randomly</li>
                    <li>Energy costs seem higher than expected</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Investigation:</p>
                  <ul className="list-disc pl-6 space-y-1 text-white">
                    <li>Circuit: 60m run, 1.5mm² T&E, 8A lighting load</li>
                    <li>Voltage at origin: 230V</li>
                    <li>Voltage at far end under load: 210V</li>
                    <li>Voltage drop: 20V = 8.7% (exceeds 3% limit)</li>
                  </ul>
                </div>
              </div>
              <Collapsible>
                <CollapsibleTrigger className="mt-3 inline-flex text-elec-yellow text-sm underline">Show solution & calculation</CollapsibleTrigger>
                <CollapsibleContent className="mt-3 p-3 border border-elec-yellow/30 rounded text-sm">
                  <p className="font-medium mb-2">Solution Analysis:</p>
                  <div className="space-y-2">
                    <p><strong>Current calculation:</strong> mV/A/m = 29 for 1.5mm² T&E</p>
                    <p><strong>Voltage drop:</strong> (29 × 8 × 120) ÷ 1000 = 27.8V = 12.1%</p>
                    <p><strong>Fix:</strong> Upgrade to 2.5mm² (18 mV/A/m) → (18 × 8 × 120) ÷ 1000 = 17.3V = 7.5%</p>
                    <p><strong>Better fix:</strong> Upgrade to 4mm² (11 mV/A/m) → (11 × 8 × 120) ÷ 1000 = 10.6V = 4.6% ✓</p>
                    <p className="text-elec-yellow font-medium">Result: Proper lighting levels restored, no more driver shutdowns</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Scenario 2: Industrial Workshop */}
            <div className="border border-border/30 rounded-lg p-4 bg-transparent">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-elec-yellow"/>
                Scenario 2: Industrial Workshop - Motor Starting Problems
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-2">The Problem:</p>
                  <ul className="list-disc pl-6 space-y-1 text-white">
                    <li>3-phase motor (5.5kW) won't start reliably</li>
                    <li>Motor draws excessive current and overheats</li>
                    <li>MCB trips during starting attempts</li>
                    <li>Other equipment dims when motor tries to start</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Investigation:</p>
                  <ul className="list-disc pl-6 space-y-1 text-white">
                    <li>Supply cable: 80m SWA, 4mm² per core</li>
                    <li>Normal running current: 11A per phase</li>
                    <li>Starting current: 66A (6 × full load)</li>
                    <li>Voltage at motor during start: 180V (22% drop!)</li>
                  </ul>
                </div>
              </div>
              <Collapsible>
                <CollapsibleTrigger className="mt-3 inline-flex text-elec-yellow text-sm underline">Show solution & calculation</CollapsibleTrigger>
                <CollapsibleContent className="mt-3 p-3 border border-elec-yellow/30 rounded text-sm">
                  <p className="font-medium mb-2">Solution Analysis:</p>
                  <div className="space-y-2">
                    <p><strong>Starting voltage drop:</strong> 4mm² SWA = 11 mV/A/m</p>
                    <p><strong>Calculation:</strong> (11 × 66 × 160) ÷ 1000 = 116V drop per phase!</p>
                    <p><strong>Available voltage:</strong> 230V - 116V = 114V (50% of rated!)</p>
                    <p><strong>Fix:</strong> Upgrade to 16mm² SWA (2.8 mV/A/m)</p>
                    <p><strong>New drop:</strong> (2.8 × 66 × 160) ÷ 1000 = 29.6V drop</p>
                    <p><strong>New voltage:</strong> 230V - 29.6V = 200.4V (87% - acceptable)</p>
                    <p className="text-elec-yellow font-medium">Result: Motor starts reliably, no more nuisance tripping</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Scenario 3: Residential EV Charging */}
            <div className="border border-elec-yellow/30 rounded-lg p-4 bg-elec-yellow/5">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Plug className="w-4 h-4 text-elec-yellow"/>
                Scenario 3: Residential - EV Charger Issues
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-2">The Problem:</p>
                  <ul className="list-disc pl-6 space-y-1 text-white">
                    <li>New 7kW EV charger keeps derating to 3.5kW</li>
                    <li>Charging takes twice as long as expected</li>
                    <li>House lights dim when charging starts</li>
                    <li>Charger shows "supply voltage low" warnings</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Investigation:</p>
                  <ul className="list-disc pl-6 space-y-1 text-white">
                    <li>Supply to garage: 40m 6mm² SWA buried</li>
                    <li>Charger rated at 32A single phase</li>
                    <li>Voltage at house CU: 240V</li>
                    <li>Voltage at charger under 32A load: 218V</li>
                  </ul>
                </div>
              </div>
              <Collapsible>
                <CollapsibleTrigger className="mt-3 inline-flex text-elec-yellow text-sm underline">Show solution & calculation</CollapsibleTrigger>
                <CollapsibleContent className="mt-3 p-3 border border-elec-yellow/30 rounded text-sm">
                  <p className="font-medium mb-2">Solution Analysis:</p>
                  <div className="space-y-2">
                    <p><strong>Current setup:</strong> 6mm² SWA buried = 7.8 mV/A/m</p>
                    <p><strong>Voltage drop:</strong> (7.8 × 32 × 80) ÷ 1000 = 20V drop</p>
                    <p><strong>Percentage:</strong> 20V ÷ 240V = 8.3% (exceeds 5% limit)</p>
                    <p><strong>Charger derates:</strong> Below 220V to protect itself</p>
                    <p><strong>Fix:</strong> Upgrade to 10mm² SWA (4.7 mV/A/m)</p>
                    <p><strong>New drop:</strong> (4.7 × 32 × 80) ÷ 1000 = 12V drop</p>
                    <p><strong>New voltage:</strong> 240V - 12V = 228V (5% - acceptable)</p>
                    <p className="text-elec-yellow font-medium">Result: Full 7kW charging restored, no more derating</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Scenario 4: Overheating Connections */}
            <div className="border border-border/30 rounded-lg p-4 bg-transparent">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-elec-yellow"/>
                Scenario 4: Commercial Kitchen - Dangerous Overheating
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-white mb-2">The Problem:</p>
                  <ul className="list-disc pl-6 space-y-1 text-white">
                    <li>Burning smell from electrical panel</li>
                    <li>Socket outlet plate is hot to touch</li>
                    <li>Discolouration around terminals</li>
                    <li>Intermittent power loss to equipment</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Investigation:</p>
                  <ul className="list-disc pl-6 space-y-1 text-white">
                    <li>Circuit: 32A radial to commercial ovens</li>
                    <li>Load current: 28A continuous</li>
                    <li>Thermal imaging: 95°C at connection point</li>
                    <li>Resistance test: High resistance at loose terminal</li>
                  </ul>
                </div>
              </div>
              <Collapsible>
                <CollapsibleTrigger className="mt-3 inline-flex text-elec-yellow text-sm underline">Show solution & safety action</CollapsibleTrigger>
                <CollapsibleContent className="mt-3 p-3 border border-border/30 rounded text-sm">
                  <p className="font-medium mb-2 text-elec-yellow">IMMEDIATE DANGER - ISOLATE SUPPLY</p>
                  <div className="space-y-2">
                    <p><strong>Problem:</strong> Loose terminal has contact resistance ~0.01Ω</p>
                    <p><strong>Power loss:</strong> P = I²R = 28² × 0.01 = 7.8W of heat at connection</p>
                    <p><strong>Temperature rise:</strong> Enough to damage insulation and create fire risk</p>
                    <p><strong>Immediate action:</strong> Isolate circuit, lock off, investigate safely</p>
                    <p><strong>Solution:</strong> Replace damaged components, re-terminate to correct torque</p>
                    <p><strong>Prevention:</strong> Regular thermal surveys, torque checking schedule</p>
                    <p className="text-elec-yellow font-medium">Result: Fire risk eliminated, equipment operates safely</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </Card>

        {/* Diagnostic Techniques */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Diagnostic Techniques</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="bg-card border border-border/30 p-4 rounded-lg">
              <h3 className="font-semibold text-elec-yellow mb-2">Visual Inspection</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Look for:</strong> Discolouration, burning marks, melted plastic</li>
                <li><strong>Check:</strong> Terminal tightness, cable entry points</li>
                <li><strong>Identify:</strong> Oversized fuses, temporary connections</li>
                <li><strong>Document:</strong> Take photos before and after repairs</li>
              </ul>
            </div>
            <div className="bg-card border border-amber-400/30 p-4 rounded-lg">
              <h3 className="font-semibold text-amber-300 mb-2">Thermal Imaging</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Under load:</strong> Take images during normal operation</li>
                <li><strong>Compare:</strong> Similar circuits and phases</li>
                <li><strong>Hotspots:</strong> Look for &gt;10°C temperature differences</li>
                <li><strong>Regular:</strong> Schedule surveys for critical circuits</li>
              </ul>
            </div>
            <div className="bg-card border border-elec-yellow/30 p-4 rounded-lg">
              <h3 className="font-semibold text-elec-yellow mb-2">Electrical Testing</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Voltage drop:</strong> Measure at load under normal current</li>
                <li><strong>Zs testing:</strong> Check earth fault loop impedance</li>
                <li><strong>IR testing:</strong> Look for insulation degradation</li>
                <li><strong>Current measurement:</strong> Check for overloading</li>
              </ul>
            </div>
            <div className="bg-card border border-border/30 p-4 rounded-lg">
              <h3 className="font-semibold text-elec-yellow mb-2">Connection Testing</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Torque check:</strong> Use calibrated torque tools</li>
                <li><strong>Pull test:</strong> Verify mechanical integrity</li>
                <li><strong>Contact resistance:</strong> Measure across connections</li>
                <li><strong>Retighten:</strong> Follow manufacturer specifications</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quick Knowledge Check */}
        <InlineCheck
          question="A socket outlet shows 85°C on a thermal camera during normal 25A operation. What should you do FIRST?"
          options={["Replace the socket", "Reduce the load", "Isolate immediately and investigate", "Call the manufacturer"]}
          correctAnswer={2}
          explanation="Overheating (normal should be <60°C) indicates a serious problem, often loose connections. Safety first: isolate immediately to prevent fire risk, then investigate the root cause."
        />

        {/* Troubleshooting Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Step-by-Step Troubleshooting Guide</h2>
          
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="bg-card border border-white/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Problem: Equipment Operating Below Par</h3>
              <ol className="list-decimal pl-6 space-y-1">
                <li><strong>Check voltage:</strong> Measure at equipment terminals under load</li>
                <li><strong>Calculate drop:</strong> Compare with supply voltage</li>
                <li><strong>Identify cause:</strong> Long run, small cable, or poor connections</li>
                <li><strong>Verify current:</strong> Is the load what you expect?</li>
                <li><strong>Check connections:</strong> All tight and in good condition?</li>
                <li><strong>Consider solutions:</strong> Larger cable, shorter route, or reduced load</li>
              </ol>
            </div>
            
            <div className="bg-card border border-white/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Problem: Overheating Components</h3>
              <ol className="list-decimal pl-6 space-y-1">
                <li><strong>ISOLATE IMMEDIATELY:</strong> Safety first - dangerous temperatures</li>
                <li><strong>Thermal survey:</strong> Identify all hot spots when safe to do so</li>
                <li><strong>Check connections:</strong> Retorque all terminations</li>
                <li><strong>Inspect damage:</strong> Replace heat-damaged components</li>
                <li><strong>Test IR and Zs:</strong> Verify system integrity</li>
                <li><strong>Monitor closely:</strong> Check temperatures after repairs</li>
              </ol>
            </div>
            
            <div className="bg-card border border-white/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Problem: Nuisance Tripping</h3>
              <ol className="list-decimal pl-6 space-y-1">
                <li><strong>Check voltage drop:</strong> High drop can cause high starting currents</li>
                <li><strong>Verify MCB rating:</strong> Correct for cable and load?</li>
                <li><strong>Measure Zs:</strong> High resistance can affect protection</li>
                <li><strong>Check load diversity:</strong> Multiple loads starting together?</li>
                <li><strong>Consider type:</strong> MCB characteristics (B, C, D types)</li>
                <li><strong>Review installation:</strong> Any changes since last working?</li>
              </ol>
            </div>
          </div>
        </Card>

        {/* Solutions and Prevention */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Solutions and Prevention</h2>
          <div className="grid md:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm text-white">
            <div className="bg-card border border-elec-yellow/30 p-4 rounded-lg">
              <h3 className="font-semibold text-elec-yellow mb-2">Design Solutions</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use voltage drop calculations in design</li>
                <li>Keep cable runs as short as practical</li>
                <li>Size cables for future load increases</li>
                <li>Use copper instead of aluminium where possible</li>
                <li>Consider sub-mains for distant loads</li>
              </ul>
            </div>
            <div className="bg-card border border-border/30 p-4 rounded-lg">
              <h3 className="font-semibold text-elec-yellow mb-2">Installation Quality</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use correct termination techniques</li>
                <li>Apply manufacturer torque settings</li>
                <li>Use appropriate cable glands and entries</li>
                <li>Avoid mechanical stress on connections</li>
                <li>Provide adequate ventilation</li>
              </ul>
            </div>
            <div className="bg-card border border-amber-400/30 p-4 rounded-lg">
              <h3 className="font-semibold text-amber-300 mb-2">Maintenance Program</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Regular thermal imaging surveys</li>
                <li>Periodic connection torque checks</li>
                <li>Monitor load growth and voltage levels</li>
                <li>Keep records of modifications</li>
                <li>Train staff to spot warning signs</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Industry Case Studies */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Industry Case Studies</h2>
          
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="border border-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Manufacturing: Production Line Downtime</h3>
              <p><strong>Issue:</strong> Critical production machinery kept shutting down unexpectedly, costing £1000s per hour.</p>
              <p><strong>Investigation:</strong> Voltage drop on 100m feeder during high-demand periods caused control systems to reset.</p>
              <p><strong>Solution:</strong> Upgraded 16mm² to 35mm² cable, reducing voltage drop from 8% to 3%.</p>
              <p><strong>Result:</strong> Zero unplanned shutdowns, improved product quality, investment paid back in 6 months.</p>
            </div>
            
            <div className="border border-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Healthcare: Operating Theatre Safety</h3>
              <p><strong>Issue:</strong> Critical medical equipment showing power quality alarms during operations.</p>
              <p><strong>Investigation:</strong> Aging connections in IT supply system creating voltage variations.</p>
              <p><strong>Solution:</strong> Complete re-termination program with silver-plated connections and regular thermal monitoring.</p>
              <p><strong>Result:</strong> Rock-solid power quality, patient safety maintained, regulatory compliance achieved.</p>
            </div>
            
            <div className="border border-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Retail: Energy Cost Reduction</h3>
              <p><strong>Issue:</strong> High electricity bills and frequent lamp replacements in large retail space.</p>
              <p><strong>Investigation:</strong> Poor power factor and voltage drop causing inefficient operation of lighting and HVAC.</p>
              <p><strong>Solution:</strong> Power factor correction, cable upgrades, and LED conversion with proper voltage levels.</p>
              <p><strong>Result:</strong> 25% reduction in energy costs, 80% reduction in maintenance, better customer experience.</p>
            </div>
          </div>
        </Card>

        {/* BS 7671 Compliance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">BS 7671 Compliance Requirements</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="bg-card border border-white/10 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Key Regulations</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Section 525:</strong> Voltage drop limits and calculations</li>
                <li><strong>Section 526:</strong> Electrical connections quality</li>
                <li><strong>Section 421:</strong> Protection against fire</li>
                <li><strong>Section 422:</strong> Protection against thermal effects</li>
                <li><strong>Appendix 4:</strong> Voltage drop calculation methods</li>
              </ul>
            </div>
            <div className="bg-card border border-amber-400/30 p-4 rounded-lg">
              <h3 className="font-semibold text-amber-300 mb-2">Testing Requirements</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Earth fault loop impedance (Zs) verification</li>
                <li>Insulation resistance testing</li>
                <li>Voltage drop measurements under load</li>
                <li>Polarity and continuity checks</li>
                <li>Documentation of all test results</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Practice Exercises */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practice Exercises</h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
              <p className="font-medium">Exercise 1: School Extension - Voltage Drop Analysis</p>
              <p>New classroom block 45m from main panel. 20A lighting load, using 2.5mm² T&E clipped direct. Calculate voltage drop and determine if acceptable for lighting circuit.</p>
              <Collapsible>
                <CollapsibleTrigger className="mt-2 inline-flex text-elec-yellow text-sm underline">Show solution</CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <p>mV/A/m = 18, Length = 90m total, Vd = (18 × 20 × 90) ÷ 1000 = 32.4V = 14.1%. FAILS - needs 4mm² minimum.</p>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
              <p className="font-medium">Exercise 2: Overheating Investigation</p>
              <p>Socket outlet reads 85°C on thermal camera, serving 25A load. Normal temperature should be &lt;60°C. What's the most likely cause and solution?</p>
              <Collapsible>
                <CollapsibleTrigger className="mt-2 inline-flex text-elec-yellow text-sm underline">Show solution</CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <p>Likely cause: Loose connection creating contact resistance. Solution: Isolate, check/retighten all connections, replace any heat-damaged components, retest.</p>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
              <p className="font-medium">Exercise 3: Motor Starting Problem</p>
              <p>15kW motor won't start on 70m cable run. Starting current 90A, cable is 10mm² SWA. Calculate starting voltage and suggest solutions.</p>
              <Collapsible>
                <CollapsibleTrigger className="mt-2 inline-flex text-elec-yellow text-sm underline">Show solution</CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <p>Vd = (4.4 × 90 × 140) ÷ 1000 = 55.4V. Starting voltage = 175V (24% drop). Solutions: 25mm² cable, star-delta starter, or soft starter.</p>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Collapsible key={i}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left hover:bg-[#121212]/20 rounded-lg border border-white/10 transition-colors">
                  <span className="font-medium text-white">{faq.q}</span>
                  <TrendingDown className="w-4 h-4 text-white" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 p-3 text-xs sm:text-sm text-white bg-card/50 rounded-lg border border-border/10">
                  {faq.a}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Summary</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div>
              <h3 className="font-semibold text-elec-yellow mb-2">Key Problems</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Overheating from poor connections and undersized cables</li>
                <li>Voltage drop causing equipment malfunction</li>
                <li>Energy waste and increased operating costs</li>
                <li>Safety risks from thermal damage</li>
                <li>Protection system failures</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-elec-yellow mb-2">Best Practices</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Calculate voltage drop at design stage</li>
                <li>Use proper connection techniques and torque settings</li>
                <li>Regular thermal imaging and maintenance</li>
                <li>Size cables for current and future needs</li>
                <li>Maintain detailed records and test results</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Comprehensive Quiz */}
        <Card className="mb-20 p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Knowledge Check Quiz (10 Questions)</h2>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Another InlineCheck */}
        <InlineCheck
          question="An EV charger keeps derating from 32A to 16A. The most likely cause is:"
          options={["Faulty charger electronics", "Excessive voltage drop on supply cable", "Wrong type of MCB", "RCD sensitivity issue"]}
          correctAnswer={1}
          explanation="EV chargers monitor supply voltage continuously. Excessive voltage drop under high load causes the charger to automatically derate to maintain safe operation and comply with voltage standards."
        />

        {/* Bottom nav */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5" asChild>
            <Link to="../5-5"><ArrowLeft className="w-4 h-4 mr-2" />Previous</Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a]" asChild>
            <Link to="../6-1">Next<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
          </Button>
        </nav>
      </div>
    </div>
  );
};

export default Module2Section5_6;