import { ArrowLeft, ArrowRight, FileText, Target, CheckCircle, AlertTriangle, Users, BookOpen, Clipboard, Shield, Calculator, Zap, Gauge, Home, AlertCircle, TrendingUp, Settings, Building2, Lightbulb, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Selecting Suitable Protective Devices (MCBs, RCDs - Intro Only) - Module 5.2.3 | Level 2 Electrical Course";
const DESCRIPTION = "Learn the basics of selecting Miniature Circuit Breakers (MCBs) and Residual Current Devices (RCDs) for electrical installations, covering types, ratings, and BS 7671 compliance.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What do MCBs protect against?",
    options: ["Only overload", "Only short circuits", "Overload and short-circuit faults", "Electric shock"],
    correctIndex: 2,
    explanation: "MCBs protect against both overload and short-circuit faults."
  },
  {
    id: 2,
    question: "What is the typical RCD sensitivity for domestic installations?",
    options: ["10 mA", "30 mA", "100 mA", "300 mA"],
    correctIndex: 1,
    explanation: "30 mA is the typical trip sensitivity for domestic RCD installations."
  },
  {
    id: 3,
    question: "Which MCB type is most commonly used in domestic circuits?",
    options: ["Type A", "Type B", "Type C", "Type D"],
    correctIndex: 1,
    explanation: "Type B MCBs are most commonly used in domestic circuits as they trip at 3-5 times rated current."
  }
];

const Module5Section2_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What do MCBs protect against?",
      options: ["Only overload", "Only short circuits", "Overload and short-circuit faults", "Electric shock"],
      correctAnswer: 2,
      explanation: "MCBs protect against both overload and short-circuit faults."
    },
    {
      id: 2,
      question: "What do RCDs protect against?",
      options: ["Overload", "Short circuits", "Earth leakage currents and electric shock", "Voltage fluctuations"],
      correctAnswer: 2,
      explanation: "RCDs protect against earth leakage currents and reduce the risk of electric shock."
    },
    {
      id: 3,
      question: "What is the typical RCD sensitivity for domestic installations?",
      options: ["10 mA", "30 mA", "100 mA", "300 mA"],
      correctAnswer: 1,
      explanation: "30 mA is the typical trip sensitivity for domestic RCD installations."
    },
    {
      id: 4,
      question: "Which MCB type is most common in domestic circuits?",
      options: ["Type A", "Type B", "Type C", "Type D"],
      correctAnswer: 1,
      explanation: "Type B MCBs are most commonly used in domestic circuits."
    },
    {
      id: 5,
      question: "True or False: An MCB can provide protection against electric shock.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False - MCBs protect against overload and short circuits. RCDs provide shock protection."
    },
    {
      id: 6,
      question: "What BS 7671 regulation requires RCD protection for sockets ≤32 A?",
      options: ["Regulation 411.3.3", "Regulation 433.1", "Regulation 434.1", "Regulation 525.1"],
      correctAnswer: 0,
      explanation: "Regulation 411.3.3 requires RCD protection for sockets ≤32 A in domestic installations."
    },
    {
      id: 7,
      question: "A lighting circuit uses 1.5 mm² cable. What MCB rating would typically be used?",
      options: ["3 A", "6 A", "10 A", "16 A"],
      correctAnswer: 1,
      explanation: "6 A MCB is typically used for lighting circuits with 1.5 mm² cable."
    },
    {
      id: 8,
      question: "Which MCB type would you likely use for industrial machinery?",
      options: ["Type A", "Type B", "Type C", "Type D"],
      correctAnswer: 3,
      explanation: "Type D MCBs are typically used for industrial applications with heavy machinery."
    },
    {
      id: 9,
      question: "How often should RCDs be tested with the built-in test button?",
      options: ["Monthly", "Every 3 months", "Every 6 months", "Annually"],
      correctAnswer: 2,
      explanation: "RCDs should be tested every 6 months using the test button (or as per manufacturer guidance)."
    },
    {
      id: 10,
      question: "Why is it important to coordinate MCB and RCD selection?",
      options: ["To reduce costs", "To ensure protection against both overloads and electric shock without nuisance tripping", "To make installation easier", "To comply with aesthetics"],
      correctAnswer: 1,
      explanation: "Coordination ensures protection against both overloads and electric shock while preventing nuisance tripping."
    }
  ];

  const faqs = [
    {
      question: "What's the difference between MCBs and RCDs?",
      answer: "MCBs protect against overload and short-circuit faults by monitoring current flow. RCDs protect against earth leakage and electric shock by monitoring the balance between live and neutral currents."
    },
    {
      question: "Can I use a Type C MCB on domestic lighting circuits?",
      answer: "It's not recommended. Type C MCBs require higher fault currents to trip (5-10x rated current) which may not operate quickly enough with domestic fault levels. Type B is appropriate for domestic lighting."
    },
    {
      question: "Do I need RCD protection for all circuits?",
      answer: "BS 7671 requires RCD protection for socket outlets ≤32A in domestic installations, outdoor equipment, and circuits in bathrooms. Other circuits may also require RCD protection depending on the installation."
    },
    {
      question: "How do I know if my MCB rating is correct?",
      answer: "The MCB rating must not exceed the cable's current-carrying capacity and must be able to carry the expected load. Check cable tables in BS 7671 and consider installation method and ambient temperature."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <Shield className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 5.2.3
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Selecting Suitable Protective Devices (MCBs, RCDs – Intro Only)
          </h1>
          <p className="text-muted-foreground">
            Learn the basics of selecting Miniature Circuit Breakers (MCBs) and Residual Current Devices (RCDs) for safe electrical installations.
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-foreground" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>MCBs protect against overload and short circuits.</li>
                <li>RCDs protect against earth leakage and electric shock.</li>
                <li>Type B (domestic), Type C (commercial), Type D (industrial).</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> 30mA RCD for domestic sockets ≤32A.</li>
                <li><strong>Use:</strong> BS 7671 Reg 411.3.3 and 433.1.</li>
                <li><strong>Check:</strong> MCB rating matches cable capacity.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <p className="text-base text-foreground">
            Protective devices are essential for safeguarding people, equipment, and cables from overloads, short circuits, and earth faults. Choosing the correct protective device ensures that circuits operate safely and comply with BS 7671 Wiring Regulations. This subsection introduces the basics of selecting Miniature Circuit Breakers (MCBs) and Residual Current Devices (RCDs).
          </p>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Explain the purpose of protective devices.</li>
            <li>Identify when to use MCBs vs RCDs.</li>
            <li>Recognise the different MCB ratings and applications.</li>
            <li>Understand the role of RCDs in shock protection.</li>
            <li>Apply BS 7671 guidance when selecting protective devices.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* Purpose of Protective Devices */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">1. Purpose of Protective Devices</h3>
            <p className="text-base text-foreground mb-4">
              Protective devices serve multiple critical functions in electrical installations:
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-3">Essential Functions of Protective Devices</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Prevent Overheating:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Stop cables and equipment from overheating due to excessive current</li>
                          <li>Prevent fire hazards and equipment damage</li>
                          <li>Maintain safe operating temperatures within design limits</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Automatic Disconnection:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Instantly disconnect supply when overload or fault current occurs</li>
                          <li>Operate without human intervention</li>
                          <li>Isolate faulty circuits to prevent spreading damage</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Electric Shock Protection:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>RCDs detect earth leakage currents</li>
                          <li>Provide additional protection against indirect contact</li>
                          <li>Reduce risk of fatal electric shock incidents</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Key Principle</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Protective devices must operate fast enough to prevent dangerous conditions but not so sensitive as to cause nuisance tripping during normal operation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="protective-devices-purpose-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />
          <Separator className="my-6" />

          {/* Miniature Circuit Breakers */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">2. Miniature Circuit Breakers (MCBs)</h3>
            <p className="text-base text-foreground mb-4">
              MCBs are the most common protective device for protecting against overload and short-circuit faults:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">MCB Characteristics and Applications</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>MCB Operating Principles:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li><strong>Thermal protection:</strong> Bi-metallic strip responds to overload currents</li>
                          <li><strong>Magnetic protection:</strong> Electromagnetic coil responds to short-circuit currents</li>
                          <li><strong>Arc extinction:</strong> SF6 gas or vacuum chamber extinguishes the arc safely</li>
                          <li><strong>Mechanical indication:</strong> Clear ON/OFF position and trip indication</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>MCB Ratings (Amperes):</strong></p>
                        <div className="bg-background/50 p-3 rounded border mb-2">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-foreground mb-2">Common Domestic Ratings:</p>
                              <ul className="text-xs sm:text-sm text-foreground space-y-1">
                                <li><strong>6 A:</strong> Lighting circuits (max 8 points)</li>
                                <li><strong>16 A:</strong> Immersion heaters, small appliances</li>
                                <li><strong>20 A:</strong> Radial socket circuits (max 20m²)</li>
                                <li><strong>32 A:</strong> Ring final circuits, small cookers</li>
                                <li><strong>40 A:</strong> Electric cookers up to 11kW</li>
                                <li><strong>45 A:</strong> Electric showers up to 10.5kW</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-foreground mb-2">Commercial/Industrial:</p>
                              <ul className="text-xs sm:text-sm text-foreground space-y-1">
                                <li><strong>50 A:</strong> Large single-phase loads</li>
                                <li><strong>63 A:</strong> Maximum single-phase MCB rating</li>
                                <li><strong>80-125 A:</strong> Three-phase distribution</li>
                                <li><strong>Breaking capacity:</strong> 6kA, 10kA, or 25kA</li>
                                <li><strong>Coordination:</strong> With upstream devices</li>
                                <li><strong>Selectivity:</strong> Time/current discrimination</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>MCB Types (Trip Characteristics):</strong></p>
                        <div className="space-y-3">
                          <div className="bg-background/30 p-4 rounded border">
                            <p className="font-medium text-foreground mb-2">Type B - Domestic Applications</p>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                                  <li><strong>Trip range:</strong> 3-5x rated current</li>
                                  <li><strong>Magnetic trip:</strong> 3-5 × In (instantaneous)</li>
                                  <li><strong>Thermal trip:</strong> 1.13 × In (within 1 hour)</li>
                                  <li><strong>Applications:</strong> Resistive loads, domestic circuits</li>
                                </ul>
                              </div>
                              <div>
                                <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                                  <li>Lighting circuits (incandescent, LED)</li>
                                  <li>Socket outlets in homes</li>
                                  <li>Immersion heaters</li>
                                  <li>Small domestic appliances</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-background/30 p-4 rounded border">
                            <p className="font-medium text-foreground mb-2">Type C - Light Commercial</p>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                                  <li><strong>Trip range:</strong> 5-10x rated current</li>
                                  <li><strong>Magnetic trip:</strong> 5-10 × In (instantaneous)</li>
                                  <li><strong>Higher immunity:</strong> To inrush currents</li>
                                  <li><strong>Applications:</strong> Inductive loads, small motors</li>
                                </ul>
                              </div>
                              <div>
                                <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                                  <li>Fluorescent lighting with ballasts</li>
                                  <li>Small motors (up to 2-3kW)</li>
                                  <li>Transformers and power supplies</li>
                                  <li>Commercial socket outlets</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-background/30 p-4 rounded border">
                            <p className="font-medium text-foreground mb-2">Type D - Industrial Applications</p>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                                  <li><strong>Trip range:</strong> 10-20x rated current</li>
                                  <li><strong>Magnetic trip:</strong> 10-20 × In (instantaneous)</li>
                                  <li><strong>High inrush tolerance:</strong> For motor starting</li>
                                  <li><strong>Applications:</strong> Large motors, welding</li>
                                </ul>
                              </div>
                              <div>
                                <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                                  <li>Large three-phase motors</li>
                                  <li>Welding equipment</li>
                                  <li>X-ray machines</li>
                                  <li>Heavy industrial machinery</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Advanced MCB Features:</strong></p>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-1">Technical Features</p>
                            <ul className="text-xs text-foreground list-disc ml-4 space-y-1">
                              <li><strong>Breaking capacity:</strong> 6kA (domestic), 10kA/25kA (commercial)</li>
                              <li><strong>Short-circuit rating:</strong> Must exceed prospective fault current</li>
                              <li><strong>Voltage rating:</strong> 230V single-phase, 400V three-phase</li>
                              <li><strong>Temperature coefficient:</strong> -0.5%/°C typically</li>
                              <li><strong>Mechanical life:</strong> 20,000+ operations</li>
                              <li><strong>Electrical life:</strong> 10,000+ operations at rated current</li>
                            </ul>
                          </div>
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-1">Installation Considerations</p>
                            <ul className="text-xs text-foreground list-disc ml-4 space-y-1">
                              <li><strong>Mounting position:</strong> Vertical preferred for optimal cooling</li>
                              <li><strong>Ambient temperature:</strong> Standard rating at 30°C</li>
                              <li><strong>Grouping factors:</strong> Derating required when closely spaced</li>
                              <li><strong>Tightening torque:</strong> Follow manufacturer specifications</li>
                              <li><strong>Phase sequence:</strong> L1, L2, L3 for three-phase applications</li>
                              <li><strong>Neutral switching:</strong> Consider for certain applications</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-emerald-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                        <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Enhanced Selection Criteria</p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li><strong>Load analysis:</strong> Consider starting currents and load profiles</li>
                          <li><strong>Fault level assessment:</strong> Calculate prospective short-circuit current</li>
                          <li><strong>Discrimination study:</strong> Ensure proper selectivity with upstream devices</li>
                          <li><strong>Environmental factors:</strong> Temperature, humidity, mechanical stress</li>
                          <li><strong>Future expansion:</strong> Allow for load growth and circuit additions</li>
                          <li><strong>Maintenance access:</strong> Ensure devices are accessible for testing</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Practical Calculation Example</p>
                        <div className="text-xs sm:text-sm text-foreground space-y-2">
                          <p><strong>Scenario:</strong> Selecting MCB for 2.5mm² cable feeding socket outlets</p>
                          <div className="bg-background/30 p-2 rounded">
                            <p><strong>Step 1:</strong> Cable capacity = 27A (Method C, 70°C cable)</p>
                            <p><strong>Step 2:</strong> Grouping factor = 0.8 (4 cables together)</p>
                            <p><strong>Step 3:</strong> Derated capacity = 27A × 0.8 = 21.6A</p>
                            <p><strong>Step 4:</strong> MCB selection = 20A (next size down)</p>
                            <p><strong>Result:</strong> 20A Type B MCB for radial socket circuit</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="mcb-types-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />
          <Separator className="my-6" />

          {/* Residual Current Devices */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">3. Residual Current Devices (RCDs)</h3>
            <p className="text-base text-foreground mb-4">
              RCDs provide essential protection against earth leakage and electric shock:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-1">RCD Operation and Specifications</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>How RCDs Work:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li><strong>Core balance principle:</strong> Live and neutral conductors pass through a toroidal core</li>
                          <li><strong>Normal operation:</strong> Live and neutral currents are equal and opposite</li>
                          <li><strong>Earth fault detection:</strong> Imbalance creates a secondary current in the detection circuit</li>
                          <li><strong>Trip mechanism:</strong> Detection circuit energises the trip coil to open contacts</li>
                          <li><strong>Independence:</strong> Operates independently of MCBs and other protection</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>RCD Types and Ratings:</strong></p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-2">Sensitivity Ratings</p>
                            <ul className="text-xs sm:text-sm text-foreground space-y-1">
                              <li><strong>10 mA:</strong> Special locations (medical, wet areas)</li>
                              <li><strong>30 mA:</strong> Personal protection (domestic standard)</li>
                              <li><strong>100 mA:</strong> Fire protection in TT earthing systems</li>
                              <li><strong>300 mA:</strong> Fire protection in larger installations</li>
                              <li><strong>500 mA:</strong> Equipment protection only (not personal)</li>
                            </ul>
                          </div>
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-2">RCD Types by Waveform</p>
                            <ul className="text-xs sm:text-sm text-foreground space-y-1">
                              <li><strong>AC Type:</strong> Responds to AC residual currents only</li>
                              <li><strong>A Type:</strong> AC + pulsating DC residual currents</li>
                              <li><strong>B Type:</strong> AC + DC + high-frequency currents</li>
                              <li><strong>F Type:</strong> Mixed frequency applications</li>
                              <li><strong>Selection:</strong> Based on connected equipment</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Operating Time Requirements (BS 7671):</strong></p>
                        <div className="bg-background/50 p-3 rounded border mb-2">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-medium text-foreground mb-1">Standard Operating Times</p>
                              <ul className="text-xs sm:text-sm text-foreground space-y-1">
                                <li><strong>At IΔn:</strong> No trip required (up to 2 hours)</li>
                                <li><strong>At 2 × IΔn:</strong> Trip within 2 seconds</li>
                                <li><strong>At 5 × IΔn:</strong> Trip within 40 ms</li>
                                <li><strong>At 250 mA:</strong> Trip within 40 ms (30mA RCD)</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium text-foreground mb-1">Testing Requirements</p>
                              <ul className="text-xs sm:text-sm text-foreground space-y-1">
                                <li><strong>Functional test:</strong> Monthly using test button</li>
                                <li><strong>Calibration test:</strong> Annually with test equipment</li>
                                <li><strong>Test current:</strong> Half-wave at 50% and 100% IΔn</li>
                                <li><strong>Non-trip test:</strong> At 50% IΔn for 2 seconds</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>RCD Installation Considerations:</strong></p>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-1">Technical Considerations</p>
                            <ul className="text-xs text-foreground list-disc ml-4 space-y-1">
                              <li><strong>Load balancing:</strong> Distribute loads across RCD-protected circuits</li>
                              <li><strong>Neutral integrity:</strong> Ensure neutral continuity in all circuits</li>
                              <li><strong>Earth electrode:</strong> Adequate earth electrode resistance</li>
                              <li><strong>Discrimination:</strong> Time-delayed RCDs for selectivity</li>
                              <li><strong>Immunity:</strong> Consider surge and transient immunity</li>
                              <li><strong>Temperature effects:</strong> Ambient temperature affects sensitivity</li>
                            </ul>
                          </div>
                          <div className="bg-background/50 p-3 rounded border">
                            <p className="font-medium text-foreground mb-1">Common Installation Issues</p>
                            <ul className="text-xs text-foreground list-disc ml-4 space-y-1">
                              <li><strong>Neutral-earth faults:</strong> Check for N-E connections downstream</li>
                              <li><strong>Cable dampness:</strong> Moisture can cause unwanted tripping</li>
                              <li><strong>Equipment leakage:</strong> IT equipment may have high leakage currents</li>
                              <li><strong>Cable routing:</strong> Avoid inductive coupling between circuits</li>
                              <li><strong>Testing access:</strong> Ensure test button is accessible to users</li>
                              <li><strong>Labelling:</strong> Clear identification of RCD-protected circuits</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>RCBO vs RCD + MCB:</strong></p>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                            <p className="font-medium text-green-600 dark:text-green-400 mb-1">RCBOs (Combined Protection)</p>
                            <ul className="text-xs text-foreground list-disc ml-4 space-y-1">
                              <li><strong>Advantages:</strong> Single device, space-saving, individual circuit protection</li>
                              <li><strong>Selectivity:</strong> Fault affects only the faulty circuit</li>
                              <li><strong>Cost:</strong> Higher unit cost but better discrimination</li>
                              <li><strong>Applications:</strong> Critical circuits, commercial installations</li>
                            </ul>
                          </div>
                          <div className="bg-emerald-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                            <p className="font-medium text-emerald-400 dark:text-emerald-400 mb-1">RCD + MCB (Split Protection)</p>
                            <ul className="text-xs text-foreground list-disc ml-4 space-y-1">
                              <li><strong>Advantages:</strong> Lower unit costs, shared RCD protection</li>
                              <li><strong>Disadvantage:</strong> Single RCD fault affects multiple circuits</li>
                              <li><strong>Typical use:</strong> Domestic installations, budget constraints</li>
                              <li><strong>BS 7671:</strong> Split load consumer units common in homes</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded border border-orange-200 dark:border-orange-800">
                        <p className="font-medium text-orange-700 dark:text-emerald-400 mb-2">Nuisance Tripping - Causes and Solutions</p>
                        <div className="grid md:grid-cols-2 gap-3">
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">Common Causes:</p>
                            <ul className="text-xs text-foreground list-disc ml-4 space-y-1">
                              <li>Moisture in cables or accessories</li>
                              <li>Damaged cable insulation</li>
                              <li>High earth leakage from IT equipment</li>
                              <li>Neutral-earth faults in circuits</li>
                              <li>Transient surges from switching</li>
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground mb-1">Solutions:</p>
                            <ul className="text-xs text-foreground list-disc ml-4 space-y-1">
                              <li>Install type A or B RCDs for equipment with DC leakage</li>
                              <li>Use time-delayed RCDs for discrimination</li>
                              <li>Check and repair cable insulation</li>
                              <li>Install surge protection devices (SPDs)</li>
                              <li>Consider higher sensitivity rating if appropriate</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                        <p className="font-medium text-red-700 dark:text-emerald-400 mb-2">Critical Safety Points</p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li><strong>Not a substitute:</strong> RCDs do not protect against overload or short circuits</li>
                          <li><strong>Test regularly:</strong> Monthly testing ensures continued protection</li>
                          <li><strong>Professional testing:</strong> Annual calibration testing required</li>
                          <li><strong>Correct type:</strong> Ensure RCD type matches the connected equipment</li>
                          <li><strong>Backup protection:</strong> Consider split-load or multiple RCDs for reliability</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="rcd-sensitivity-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />
          <Separator className="my-6" />

          {/* Coordinating MCBs and RCDs */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">4. Coordinating MCBs and RCDs</h3>
            <p className="text-base text-foreground mb-4">
              MCBs and RCDs are often used together in consumer units to provide comprehensive protection:
            </p>
            
            <div className="bg-background/50 p-4 rounded-lg border border-border/20 mb-4">
              <div className="space-y-3">
                <p className="text-base text-foreground"><strong>Typical Coordination Examples:</strong></p>
                <ul className="text-xs sm:text-sm text-foreground space-y-2">
                  <li><strong>Socket circuit:</strong> 32A MCB + 30mA RCD (overload + shock protection)</li>
                  <li><strong>Immersion heater:</strong> 16A MCB + 30mA RCD (fixed appliance protection)</li>
                  <li><strong>Lighting circuit:</strong> 6A MCB (RCD optional but recommended)</li>
                  <li><strong>Outdoor supplies:</strong> Appropriate MCB + 30mA RCD (mandatory)</li>
                </ul>
                
                <div className="bg-emerald-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800 mt-4">
                  <p className="font-medium text-blue-700 dark:text-emerald-400 mb-1">Design Principle</p>
                  <p className="text-xs sm:text-sm text-foreground">
                    Each protection type addresses different risks: MCBs for overload/short circuit, RCDs for earth leakage/shock.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* BS 7671 Guidance */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">5. BS 7671 Guidance</h3>
            <p className="text-base text-foreground mb-4">
              Key regulations governing protective device selection:
            </p>
            
            <div className="bg-background/50 p-4 rounded-lg border border-border/20 mb-4">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <p className="font-medium text-foreground mb-2">Core Protection Requirements:</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-2">
                    <li><strong>Regulation 411.3.3:</strong> RCD protection required for sockets ≤32 A (domestic)</li>
                    <li><strong>Regulation 433.1:</strong> MCBs must protect against overloads</li>
                    <li><strong>Regulation 434.1:</strong> Protection against fault currents</li>
                    <li><strong>Regulation 531.2:</strong> Devices must have adequate breaking capacity</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">Selection and Installation:</p>
                  <ul className="text-xs sm:text-sm text-foreground space-y-2">
                    <li><strong>Load compatibility:</strong> Based on load type, environment, and regulations</li>
                    <li><strong>Coordination:</strong> Devices must work together without conflicts</li>
                    <li><strong>Discrimination:</strong> Upstream devices should be selective</li>
                    <li><strong>Future expansion:</strong> Allow for load growth and additions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mb-4">
              <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Key BS 7671 Tables for Device Selection:</p>
              <ul className="text-xs sm:text-sm text-foreground space-y-1">
                <li><strong>Table 41.5:</strong> Maximum disconnection times for shock protection</li>
                <li><strong>Appendix 3:</strong> Current-carrying capacity of cables</li>
                <li><strong>Appendix 4:</strong> Voltage drop calculations</li>
                <li><strong>Section 536:</strong> Co-ordination of protective devices</li>
              </ul>
            </div>
          </section>

          {/* Modern Protective Technologies */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">6. Modern Protective Technologies</h3>
            <p className="text-base text-foreground mb-4">
              Emerging technologies enhance traditional protection methods:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-indigo-500 bg-indigo-500/5">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">6</span>
                  <div className="flex-1">
                    <p className="font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Advanced Protective Devices</p>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-background/30 p-4 rounded border">
                          <p className="font-medium text-foreground mb-2">AFDDs (Arc Fault Detection Devices)</p>
                          <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                            <li><strong>Purpose:</strong> Detect dangerous arcing in circuits</li>
                            <li><strong>Technology:</strong> Analyse current waveform signatures</li>
                            <li><strong>Applications:</strong> Bedrooms, living areas (proposed in Amendment 2)</li>
                            <li><strong>Fire prevention:</strong> Detect series and parallel arc faults</li>
                            <li><strong>Limitations:</strong> Cannot detect all types of electrical fires</li>
                          </ul>
                        </div>
                        
                        <div className="bg-background/30 p-4 rounded border">
                          <p className="font-medium text-foreground mb-2">SPDs (Surge Protection Devices)</p>
                          <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                            <li><strong>Purpose:</strong> Protect against voltage surges</li>
                            <li><strong>Types:</strong> Type 1 (lightning), Type 2 (switching surges)</li>
                            <li><strong>BS 7671:</strong> Required in certain installations (Reg 443.4)</li>
                            <li><strong>Installation:</strong> As close to origin as possible</li>
                            <li><strong>Coordination:</strong> Work with other protective devices</li>
                          </ul>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-background/30 p-4 rounded border">
                          <p className="font-medium text-foreground mb-2">Smart Protection Systems</p>
                          <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                            <li><strong>IoT integration:</strong> Remote monitoring and control</li>
                            <li><strong>Predictive maintenance:</strong> Early warning of device degradation</li>
                            <li><strong>Load management:</strong> Dynamic load balancing capabilities</li>
                            <li><strong>Data logging:</strong> Trip history and performance analysis</li>
                            <li><strong>Communication:</strong> Integration with building management systems</li>
                          </ul>
                        </div>
                        
                        <div className="bg-background/30 p-4 rounded border">
                          <p className="font-medium text-foreground mb-2">Future Developments</p>
                          <ul className="text-xs sm:text-sm text-foreground list-disc ml-4 space-y-1">
                            <li><strong>AI-enhanced protection:</strong> Machine learning for fault prediction</li>
                            <li><strong>Wireless monitoring:</strong> Battery-powered sensing devices</li>
                            <li><strong>Enhanced discrimination:</strong> Improved selectivity algorithms</li>
                            <li><strong>Multi-hazard detection:</strong> Combined arc, surge, and leakage protection</li>
                            <li><strong>Energy efficiency:</strong> Reduced power consumption in standby</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Practical Guidance</h3>
            
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="font-medium text-emerald-400 dark:text-emerald-400 mb-2">Cable and MCB Compatibility</p>
                <ul className="text-xs sm:text-sm text-foreground space-y-1">
                  <li>✅ <strong>Always check:</strong> MCB rating must never exceed cable's current capacity</li>
                  <li>✅ <strong>Consider derating:</strong> Account for installation method and grouping</li>
                  <li>✅ <strong>Temperature effects:</strong> Higher ambient temperatures reduce cable capacity</li>
                  <li>✅ <strong>Future proofing:</strong> Consider potential load increases</li>
                </ul>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-green-200 dark:border-green-800">
                <p className="font-medium text-green-600 dark:text-green-400 mb-2">RCD Testing and Maintenance</p>
                <ul className="text-xs sm:text-sm text-foreground space-y-1">
                  <li>✅ <strong>Regular testing:</strong> Use test button every 6 months minimum</li>
                  <li>✅ <strong>User education:</strong> Ensure occupants know how to test and reset</li>
                  <li>✅ <strong>Professional testing:</strong> Annual calibration checks recommended</li>
                  <li>✅ <strong>Nuisance tripping:</strong> Investigate causes - don't just reset</li>
                </ul>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="font-medium text-purple-600 dark:text-emerald-400 mb-2">Commercial/Industrial Considerations</p>
                <ul className="text-xs sm:text-sm text-foreground space-y-1">
                  <li>✅ <strong>Selectivity:</strong> Consider discrimination between protective devices</li>
                  <li>✅ <strong>Load analysis:</strong> Account for motor starting currents and inrush</li>
                  <li>✅ <strong>Environment:</strong> IP ratings for harsh or dusty conditions</li>
                  <li>✅ <strong>Maintenance access:</strong> Ensure devices are accessible for testing</li>
                </ul>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="font-medium text-orange-600 dark:text-emerald-400 mb-2">When in Doubt</p>
                <ul className="text-xs sm:text-sm text-foreground space-y-1">
                  <li>✅ <strong>BS 7671 tables:</strong> Use current-carrying capacity tables</li>
                  <li>✅ <strong>Manufacturer guidance:</strong> Follow device-specific instructions</li>
                  <li>✅ <strong>Professional advice:</strong> Consult experienced colleagues</li>
                  <li>✅ <strong>Conservative approach:</strong> Err on the side of safety</li>
                </ul>
              </div>
            </div>
          </section>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Example</h2>
          <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-2">The Wrong MCB Type Mistake</p>
                <p className="text-base text-foreground mb-3">
                  <strong>The Scenario:</strong> In a small office installation, an electrician used a Type C MCB on a domestic lighting circuit. This caused nuisance tripping because Type C devices require higher fault currents to operate. The correct choice should have been a Type B MCB suitable for low domestic fault currents.
                </p>
                
                <div className="bg-background/30 p-4 rounded-lg mb-3">
                  <p className="font-medium text-foreground mb-2">The Problem:</p>
                  <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                    <li><strong>Wrong selection:</strong> 6A Type C MCB used for lighting circuit</li>
                    <li><strong>Load characteristics:</strong> Simple resistive loads (LED and fluorescent)</li>
                    <li><strong>Fault levels:</strong> Domestic installation with relatively low fault currents</li>
                    <li><strong>Trip characteristic:</strong> Type C needs 5-10x rated current (30-60A) to trip</li>
                  </ul>
                </div>
                
                <div className="bg-card p-4 rounded-lg mb-3 border border-red-500/20">
                  <p className="font-medium text-red-600 dark:text-emerald-400 mb-2">The Consequences:</p>
                  <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                    <li><strong>Nuisance tripping:</strong> MCB tripped during normal switching operations</li>
                    <li><strong>Slow fault clearance:</strong> Small faults took longer to clear</li>
                    <li><strong>Client complaints:</strong> Lights going off unexpectedly during meetings</li>
                    <li><strong>Delayed project:</strong> Had to revisit and replace all lighting MCBs</li>
                  </ul>
                </div>
                
                <div className="bg-card p-4 rounded-lg border border-green-500/20">
                  <p className="font-medium text-green-600 dark:text-green-400 mb-2">The Solution:</p>
                  <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                    <li><strong>Correct selection:</strong> Replace with 6A Type B MCBs</li>
                    <li><strong>Type B characteristics:</strong> Trips at 3-5x rated current (18-30A)</li>
                    <li><strong>Proper operation:</strong> Suitable for domestic fault levels</li>
                    <li><strong>No more nuisance trips:</strong> Reliable operation under all conditions</li>
                  </ul>
                </div>
                
                <div className="text-xs sm:text-sm text-foreground bg-background/50 p-3 rounded border mt-3">
                  <strong>Key lesson:</strong> MCB type selection must match the installation type and expected fault levels. Type B for domestic, Type C for light commercial, Type D for heavy industrial.
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6">
            <div className="flex items-center gap-3">
              <Clipboard className="w-6 h-6" />
              Pocket Guide – Protective Devices
            </div>
          </h2>
          
          {/* Mobile: Stack vertically, Desktop: 2x2 Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Top Left - MCB Quick Reference */}
            <div className="bg-card p-5 rounded-lg border border-blue-200 dark:border-blue-800 h-full">
              <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-3 text-base">MCB Quick Reference</p>
              <ul className="text-xs sm:text-sm text-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✅</span>
                  <span>MCBs = protect against overload/short circuit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✅</span>
                  <span>Type B (domestic), Type C (commercial), Type D (industrial)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✅</span>
                  <span>Rating must not exceed cable capacity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✅</span>
                  <span>6A lighting, 16A immersion, 32A ring final</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✅</span>
                  <span>Check breaking capacity vs fault current</span>
                </li>
              </ul>
            </div>

            {/* Top Right - BS 7671 Key Regulations */}
            <div className="bg-card p-5 rounded-lg border border-purple-200 dark:border-purple-800 h-full">
              <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-3 text-base">BS 7671 Key Regulations</p>
              <ul className="text-xs sm:text-sm text-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">📋</span>
                  <span>Reg 411.3.3 - RCD protection for sockets ≤32A</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">⚡</span>
                  <span>Reg 433.1 - Overload protection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">🔒</span>
                  <span>Reg 434.1 - Fault current protection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">🎯</span>
                  <span>Match device to load and environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">📐</span>
                  <span>Consider selectivity and discrimination</span>
                </li>
              </ul>
            </div>

            {/* Bottom Left - RCD Quick Reference */}
            <div className="bg-card p-5 rounded-lg border border-green-200 dark:border-green-800 h-full">
              <p className="font-semibold text-green-600 dark:text-green-400 mb-3 text-base">RCD Quick Reference</p>
              <ul className="text-xs sm:text-sm text-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✅</span>
                  <span>RCDs = protect against earth leakage/shock</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✅</span>
                  <span>30mA sensitivity for domestic installations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✅</span>
                  <span>Required for sockets ≤32A (BS 7671)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✅</span>
                  <span>Test every 6 months using test button</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✅</span>
                  <span>Must trip within 40ms at 5 × IΔn</span>
                </li>
              </ul>
            </div>

            {/* Bottom Right - Selection Checklist */}
            <div className="bg-card p-5 rounded-lg border border-orange-200 dark:border-orange-800 h-full">
              <p className="font-semibold text-orange-600 dark:text-emerald-400 mb-3 text-base">Selection Checklist</p>
              <ul className="text-xs sm:text-sm text-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">🔍</span>
                  <span>Match device rating to cable capacity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">⚡</span>
                  <span>Consider load type and characteristics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">🏠</span>
                  <span>Choose correct MCB type for environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">🛡️</span>
                  <span>Apply RCD where required by regulations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">📝</span>
                  <span>Document selections and reasons</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Remember Section */}
          <div className="mt-6 p-4 bg-background/50 rounded-lg border border-border/20">
            <p className="text-xs sm:text-sm text-foreground text-center leading-relaxed">
              <strong>Remember:</strong> MCBs protect cables and equipment, RCDs protect people. 
              Use both together for comprehensive protection in domestic installations.
            </p>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Recap</h2>
          <p className="text-base text-foreground">
            In this subsection, you learned about the role of protective devices in electrical installations. You explored the different types of MCBs and their trip characteristics, the importance of RCDs for shock protection, and the relevant BS 7671 regulations. You also saw practical examples of how to select the right device for the right environment.
          </p>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-l-emerald-500 pl-4">
                <p className="font-medium text-foreground mb-2">Q: {faq.question}</p>
                <p className="text-sm text-muted-foreground">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-border/20">
          <Button variant="outline" asChild>
            <Link to="../2-2" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="../2-4" className="flex items-center gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module5Section2_3;