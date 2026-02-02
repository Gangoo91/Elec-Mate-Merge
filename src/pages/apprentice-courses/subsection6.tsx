import { ArrowLeft, ArrowRight, Shield, AlertTriangle, TrendingUp, RotateCcw, Flame, Users, AlertCircle, Thermometer, Volume2, Activity, Zap, Settings, FileText, ClipboardList, CheckCircle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Overloads, Short Circuits and Arcing - Module 1.2.2 | Level 2 Electrical Course";
const DESCRIPTION = "Understanding electrical faults including overloads, short circuits, and arcing. BS 7671 fault protection, investigation techniques, and prevention strategies for electrical workers.";

// Inline check questions
const quickCheckQuestions = [
  {
    id: 1,
    question: "What is the primary cause of electrical overloads?",
    options: [
      "Voltage fluctuations",
      "Too much current flowing through a circuit for its designed capacity",
      "Frequency variations",
      "Poor power factor"
    ],
    correctIndex: 1,
    explanation: "Overloads occur when more current flows through a circuit than it's designed to carry, causing excessive heating and potential damage."
  },
  {
    id: 2,
    question: "What is a short circuit fault?",
    options: [
      "A long cable run",
      "Low voltage condition",
      "Direct connection between live conductors or live to earth, bypassing the load",
      "High resistance connection"
    ],
    correctIndex: 2,
    explanation: "A short circuit creates a low-resistance path that bypasses the intended load, causing very high currents to flow."
  },
  {
    id: 3,
    question: "What protection device responds fastest to arc faults?",
    options: [
      "MCB (Miniature Circuit Breaker)",
      "RCD (Residual Current Device)",
      "AFDD (Arc Fault Detection Device)",
      "RCBO (RCD with Overcurrent Protection)"
    ],
    correctIndex: 2,
    explanation: "AFDDs are specifically designed to detect the unique characteristics of arc faults and provide rapid protection."
  },
  {
    id: 4,
    question: "What is the maximum disconnection time for a 32A circuit under BS 7671?",
    options: [
      "0.1 seconds",
      "0.4 seconds",
      "5 seconds",
      "Instantaneous"
    ],
    correctIndex: 1,
    explanation: "BS 7671 requires final circuits up to 32A to disconnect within 0.4 seconds for shock protection."
  }
];

const Section2_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    {
      id: 1,
      question: "What causes an overload in an electrical circuit?",
      options: [
        "Too little current flowing through a circuit",
        "Too much current flowing through a circuit for its rated capacity", 
        "A complete loss of power",
        "Water getting into the circuit"
      ],
      correctAnswer: 1,
      explanation: "An overload occurs when more current flows through a circuit than it's designed to carry, causing excessive heating that can damage cables and start fires."
    },
    {
      id: 2,
      question: "What happens during a short circuit fault?",
      options: [
        "The circuit operates normally",
        "Current flows slowly through the circuit",
        "Live and neutral (or live and earth) connect directly, bypassing the load",
        "The voltage increases gradually"
      ],
      correctAnswer: 2,
      explanation: "A short circuit creates a low-resistance path between conductors, allowing very high currents to flow that can cause fires, explosions, and equipment damage."
    },
    {
      id: 3,
      question: "Which is an early warning sign of cable overloading?",
      options: [
        "The cable feels cold to touch",
        "Warm outlets, cables or switch plates",
        "Bright LED indicator lights",
        "The cable changes colour immediately"
      ],
      correctAnswer: 1,
      explanation: "Warm outlets, cables or switch plates indicate excessive current flow causing resistive heating - a clear sign of overloading that requires immediate attention."
    },
    {
      id: 4,
      question: "How can arcing at terminals be prevented?",
      options: [
        "Use loose connections for flexibility",
        "Ensure all connections are tight and correctly torqued to manufacturer specifications",
        "Apply grease to all connections",
        "Avoid using any tools for connections"
      ],
      correctAnswer: 1,
      explanation: "Proper torque values ensure optimal electrical contact, preventing high resistance connections that lead to arcing, heating, and potential fires."
    },
    {
      id: 5,
      question: "Arc fault detection devices (AFDDs) are required by BS 7671 in which locations?",
      options: [
        "All domestic installations",
        "Only industrial premises",
        "Specific locations with increased fire risk",
        "Never required in the UK"
      ],
      correctAnswer: 2,
      explanation: "BS 7671 requires AFDDs in specific high-risk locations such as sleeping accommodation, escape routes, and areas with combustible materials."
    },
    {
      id: 6,
      question: "What is the typical fault current level in a domestic installation short circuit?",
      options: [
        "1-10 A",
        "100-1000 A",
        "1000-10,000 A",
        "Over 50,000 A"
      ],
      correctAnswer: 2,
      explanation: "Domestic short circuit currents typically range from 1-10 kA (1000-10,000 A), requiring protective devices with adequate breaking capacity."
    },
    {
      id: 7,
      question: "Under EAWR regulations, what must be done after any electrical fault occurs?",
      options: [
        "Reset the protection device immediately",
        "Investigate the cause before re-energising",
        "Replace all cables in the circuit",
        "Increase the protection device rating"
      ],
      correctAnswer: 1,
      explanation: "EAWR requires thorough investigation of any electrical fault to determine and rectify the cause before re-energising to prevent recurrence."
    },
    {
      id: 8,
      question: "What is the primary purpose of discrimination in protective device coordination?",
      options: [
        "To reduce installation costs",
        "To ensure only the protective device closest to the fault operates",
        "To increase fault current levels",
        "To eliminate the need for earthing"
      ],
      correctAnswer: 1,
      explanation: "Discrimination ensures that only the protective device closest to the fault operates, maintaining supply to healthy circuits and minimising disruption."
    }
  ];

  const faqs = [
    {
      question: "How do I calculate the maximum load for a circuit?",
      answer: "Use the cable's current-carrying capacity (Iz) from BS 7671 tables, apply derating factors for installation method, ambient temperature, and grouping. The protective device rating must not exceed the cable's derated capacity."
    },
    {
      question: "What's the difference between an overload and a short circuit?",
      answer: "Overloads involve excessive current (typically 1.5-10 times normal) flowing through the intended circuit path. Short circuits create unintended low-resistance paths with much higher currents (hundreds to thousands of times normal)."
    },
    {
      question: "When should I use Arc Fault Detection Devices (AFDDs)?",
      answer: "BS 7671 Amendment 2 requires AFDDs in specific locations: sleeping accommodation, escape routes, common areas in HMOs, and areas with particular fire risk due to combustible materials or construction."
    },
    {
      question: "How do I investigate an electrical fault safely?",
      answer: "Follow safe isolation procedures, use appropriate test equipment (GS38 compliant), check for obvious signs of damage, measure insulation resistance, continuity, and earth fault loop impedance. Document findings and causes."
    },
    {
      question: "What are the economic impacts of electrical faults?",
      answer: "Costs include equipment replacement, business interruption, emergency callouts, insurance claims, and potential legal liability. Prevention through proper design and maintenance is far more cost-effective than fault rectification."
    }
  ];

  return (
    <div className="bg-background">
      {/* Top header bar */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/80 hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
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
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 2.2
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Overloads, Short Circuits and Arcing
          </h1>
          <p className="text-white/80">
            Understanding electrical faults, their causes, effects, and prevention strategies. BS 7671 fault protection requirements and investigation techniques.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Overloads occur when circuits carry more current than designed, causing heating and potential fires.</li>
                <li>Short circuits create unintended low-resistance paths with dangerously high fault currents.</li>
                <li>Arc faults generate extreme heat and can ignite fires even without overcurrent conditions.</li>
                <li>BS 7671 requires specific protection devices and disconnection times for each fault type.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Warm cables/outlets, tripping MCBs, burning smells, loose connections.</li>
                <li><strong>Use:</strong> Correct cable sizing, proper protective devices, AFDDs where required.</li>
                <li><strong>Check:</strong> Load calculations, fault current capacity, discrimination, connection torques.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Understand the causes, effects, and prevention of electrical overloads, short circuits, and arc faults.</li>
            <li>Apply BS 7671 requirements for fault protection including protective device selection and discrimination.</li>
            <li>Calculate maximum circuit loads and apply diversity factors in electrical design.</li>
            <li>Recognise warning signs of electrical faults and understand investigation procedures.</li>
            <li>Select appropriate protection devices including MCBs, RCDs, and AFDDs for different applications.</li>
            <li>Understand the economic and safety implications of electrical faults in installations.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Overload Faults Section */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Overload Faults - Causes and Prevention</h3>
            <p className="text-base text-foreground mb-4">
              Overload faults occur when electrical circuits carry more current than their designed capacity, leading to excessive heating and potential fire hazards:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-elec-yellow bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">Understanding Overload Conditions</p>
                    <p className="text-base text-foreground mb-2"><strong>Definition:</strong> Current exceeding the circuit's design capacity for sustained periods.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li><strong>Load calculations:</strong> Sum of all connected loads vs cable current-carrying capacity (Iz)</li>
                      <li><strong>Diversity factors:</strong> Applied per BS 7671 to account for simultaneous usage</li>
                      <li><strong>Thermal effects:</strong> I²R heating in cables and connections</li>
                      <li><strong>Protective device coordination:</strong> MCB ratings must not exceed cable capacity</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Common causes in practice:</strong> Real-world overload scenarios.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Multiple high-power appliances on single socket outlet circuits</li>
                      <li>Motor starting inrush currents without soft-start control</li>
                      <li>Undersized cables for actual load requirements</li>
                      <li>Incorrect diversity calculations in design phase</li>
                      <li>Extension leads and adaptors creating additional load points</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Early warning signs:</strong> Recognition and immediate action required.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Warm cables, outlets, or switch plates indicating resistive heating</li>
                      <li>Frequent MCB tripping under normal operation</li>
                      <li>Voltage drop symptoms: dimming lights, reduced motor performance</li>
                      <li>Burning smell from cables or electrical equipment</li>
                      <li>Discoloration of outlet faces or cable insulation</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>BS 7671 requirement:</strong> Cable current-carrying capacity must exceed design current with appropriate derating factors applied
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="overload-check"
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <Separator className="my-6" />

          {/* Short Circuit Faults Section */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Short Circuit Faults - Analysis and Protection</h3>
            <p className="text-base text-foreground mb-4">
              Short circuit faults create dangerous high-current conditions requiring immediate disconnection and thorough investigation:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-1">Short Circuit Characteristics and Protection</p>
                    <p className="text-base text-foreground mb-2"><strong>Fault types:</strong> Different short circuit configurations and their characteristics.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Line-to-line faults: highest current in three-phase systems</li>
                      <li>Line-to-neutral faults: common in single-phase circuits</li>
                      <li>Line-to-earth faults: may involve RCD operation</li>
                      <li>Three-phase faults: maximum possible fault current</li>
                      <li>Earth faults: require effective earthing arrangements</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Fault current calculations:</strong> Determining maximum fault levels for protection.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Source impedance: transformer and supply authority data</li>
                      <li>Cable impedance: R + jX values for fault current paths</li>
                      <li>Earth fault loop impedance (Zs): critical for protection operation</li>
                      <li>Prospective fault current: maximum available at fault point</li>
                      <li>Breaking capacity: protective device must exceed fault current</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Protective device discrimination:</strong> Ensuring selective operation.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Time-current characteristics: upstream/downstream coordination</li>
                      <li>Current discrimination: ensuring only faulted circuit disconnects</li>
                      <li>Time discrimination: delayed operation for selectivity</li>
                      <li>Zone discrimination: definite protection boundaries</li>
                      <li>BS 7671 disconnection times: 0.4s final circuits, 5s distribution</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>EAWR requirement:</strong> Thorough fault investigation required before re-energising any circuit
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="short-circuit-check"
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <Separator className="my-6" />

          {/* Arc Fault Protection Section */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Arc Fault Protection and Detection</h3>
            <p className="text-base text-foreground mb-4">
              Arc faults represent a unique hazard requiring specialised detection and protection methods beyond conventional overcurrent devices:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">Arc Fault Detection and Prevention Technology</p>
                    <p className="text-base text-foreground mb-2"><strong>Arc fault characteristics:</strong> Understanding the unique signatures of electrical arcing.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>High-frequency noise: distinctive electrical signature in kHz range</li>
                      <li>Current waveform distortion: irregular patterns vs normal sinusoidal</li>
                      <li>Temperature generation: localised heating at arc points</li>
                      <li>Light emission: bright flash and UV radiation</li>
                      <li>Acoustic signature: distinctive crackling or buzzing sounds</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>AFDD technology:</strong> Arc Fault Detection Devices per BS 7671 Amendment 2.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Required locations: sleeping accommodation, escape routes, high-risk areas</li>
                      <li>Detection algorithms: distinguishing between harmful and normal arcing</li>
                      <li>Response time: rapid disconnection to prevent fire ignition</li>
                      <li>Installation requirements: specific wiring configurations</li>
                      <li>Testing procedures: regular verification of detection capability</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Prevention strategies:</strong> Eliminating arc fault conditions through proper practice.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Proper connection torques: manufacturer specifications critical</li>
                      <li>Quality terminations: stripping lengths, conductor preparation</li>
                      <li>Environmental protection: preventing moisture and contamination</li>
                      <li>Regular maintenance: thermographic surveys, connection checks</li>
                      <li>Component replacement: worn contacts, damaged insulation</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Key principle:</strong> AFDDs detect dangerous arcing that may not cause overcurrent but can ignite fires
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="afdd-check"
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <Separator className="my-6" />

          {/* Fault Investigation Section */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">Fault Investigation and Documentation</h3>
            <p className="text-base text-foreground mb-4">
              Systematic fault investigation is essential for identifying root causes and preventing recurrence:
            </p>
            
            <div className="space-y-4">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-1">Systematic Fault Investigation Procedures</p>
                    <p className="text-base text-foreground mb-2"><strong>Safe investigation methods:</strong> Ensuring personal safety during fault finding.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Safe isolation: proving dead before investigation</li>
                      <li>GS38 test equipment: appropriate voltage detectors and meters</li>
                      <li>PPE requirements: protection against residual energy</li>
                      <li>Risk assessment: identifying potential hazards</li>
                      <li>Emergency procedures: first aid and fire safety provisions</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Diagnostic techniques:</strong> Systematic approach to fault identification.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Visual inspection: obvious damage, burning, discoloration</li>
                      <li>Insulation resistance testing: identifying insulation breakdown</li>
                      <li>Continuity testing: confirming circuit integrity</li>
                      <li>Earth fault loop impedance: protection effectiveness verification</li>
                      <li>Load testing: confirming circuit capacity and performance</li>
                    </ul>
                    <p className="text-base text-foreground mb-2"><strong>Documentation requirements:</strong> Recording findings for compliance and learning.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 mb-2 list-disc space-y-1">
                      <li>Fault report: symptoms, investigation steps, findings</li>
                      <li>Test results: measured values vs expected/acceptable limits</li>
                      <li>Remedial actions: corrections made to prevent recurrence</li>
                      <li>Lessons learned: sharing knowledge to prevent similar faults</li>
                      <li>Compliance verification: meeting BS 7671 and EAWR requirements</li>
                    </ul>
                    <div className="text-xs sm:text-sm text-foreground bg-background/50 p-2 rounded border">
                      <strong>Legal requirement:</strong> EAWR mandates investigation of all electrical faults before re-energisation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="investigation-check"
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />
        </Card>

        {/* Real-world scenario */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-world scenario</h2>
          <div className="rounded-lg p-5 bg-card border border-border/20">
            <h3 className="font-medium text-foreground mb-3">Commercial Kitchen Fire Investigation</h3>
            <p className="text-base text-foreground mb-4">
              <strong>Scenario:</strong> A fire occurred in a commercial kitchen overnight, damaging equipment worth £50,000. The fire started near the main distribution board supplying cooking equipment.
            </p>
            <p className="text-base text-foreground mb-4">
              <strong>Initial findings:</strong> Fire investigator identified electrical origin. MCBs had tripped, but significant damage occurred before disconnection. No RCD protection on affected circuits.
            </p>
            <p className="text-base text-foreground mb-4">
              <strong>Investigation process:</strong> Electrical contractor conducted systematic fault investigation:
            </p>
            <ul className="text-xs sm:text-sm text-foreground ml-6 mb-4 list-disc space-y-1">
              <li>Safe isolation and visual inspection revealed severely damaged cable terminations</li>
              <li>Several phase terminals in distribution board showed evidence of arcing</li>
              <li>Torque testing of undamaged connections revealed significant under-tightening</li>
              <li>Original installation records showed no torque values recorded</li>
              <li>Load monitoring revealed circuits operating at 90% capacity during peak periods</li>
            </ul>
            <p className="text-base text-foreground mb-4">
              <strong>Root causes identified:</strong> Multiple contributing factors led to the incident:
            </p>
            <ul className="text-xs sm:text-sm text-foreground ml-6 mb-4 list-disc space-y-1">
              <li>Inadequate connection torques during original installation</li>
              <li>No periodic inspection and testing programme</li>
              <li>High loading creating thermal stress on connections</li>
              <li>Lack of AFDD protection in high-risk environment</li>
              <li>Insufficient documentation of installation procedures</li>
            </ul>
            <p className="text-base text-foreground mb-4">
              <strong>Remedial actions:</strong> Comprehensive improvements implemented:
            </p>
            <ul className="text-xs sm:text-sm text-foreground ml-6 mb-4 list-disc space-y-1">
              <li>Complete rewiring with larger cable sizes and proper load distribution</li>
              <li>Installation of AFDDs on all final circuits in kitchen area</li>
              <li>Implementation of annual thermographic surveys</li>
              <li>Staff training on electrical safety and fault recognition</li>
              <li>Documented maintenance procedures with torque verification schedules</li>
            </ul>
            <div className="rounded-lg p-3 bg-card border border-amber-400/30">
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Learning outcome:</strong> This incident demonstrates how multiple minor issues can combine to create major hazards. Regular maintenance, proper installation techniques, and appropriate protection devices are essential for preventing electrical fires.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQ */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-lg p-3 sm:p-4 bg-card border border-border/20">
                <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-white/80">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-8 p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <div className="space-y-3 text-base text-foreground">
            <p>
              Electrical faults - overloads, short circuits, and arc faults - represent significant hazards that can cause fires, equipment damage, and injury even without direct contact with live parts.
            </p>
            <p>
              <strong>Key principles for fault prevention:</strong> Proper design calculations, correct protective device selection, quality installation techniques, and regular maintenance are essential for electrical safety.
            </p>
            <p>
              <strong>BS 7671 compliance:</strong> Modern electrical installations must incorporate appropriate protection devices including AFDDs in high-risk locations, with proper discrimination to ensure selective operation.
            </p>
            <p>
              <strong>Professional responsibility:</strong> Electrical workers must understand fault characteristics, investigation techniques, and prevention strategies to maintain safe installations throughout their service life.
            </p>
          </div>
        </Card>

        {/* Do's and Don'ts */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Do's and Don'ts for apprentices</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-lg p-4 bg-elec-yellow/5 border border-elec-yellow/30">
              <h3 className="font-medium text-elec-yellow dark:text-elec-yellow mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Do's
              </h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-2">
                <li>• Always use manufacturer's specified torque values for connections</li>
                <li>• Apply proper diversity factors when calculating circuit loads</li>
                <li>• Install AFDDs in sleeping accommodation and escape routes</li>
                <li>• Conduct thorough fault investigation before re-energising</li>
                <li>• Document all test results and maintenance activities</li>
                <li>• Use GS38 compliant test equipment for safe fault finding</li>
                <li>• Check cable current-carrying capacity against design loads</li>
                <li>• Verify protective device discrimination and breaking capacity</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-card border border-border/30">
              <h3 className="font-medium text-red-600 dark:text-elec-yellow mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Don'ts
              </h3>
              <ul className="text-xs sm:text-sm text-foreground space-y-2">
                <li>• Never ignore signs of overheating in cables or connections</li>
                <li>• Don't exceed cable current-carrying capacity with protective devices</li>
                <li>• Never reset protective devices without investigating the cause</li>
                <li>• Don't use extension leads as permanent wiring solutions</li>
                <li>• Never work on circuits without proper safe isolation</li>
                <li>• Don't ignore frequent MCB tripping - investigate the cause</li>
                <li>• Never compromise on connection torques to save time</li>
                <li>• Don't overlook the importance of regular maintenance schedules</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Pocket card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Quick reference pocket card</h2>
          <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/20">
            <h3 className="font-medium text-foreground mb-3">Electrical Fault Quick Reference</h3>
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4 text-sm">
              <div>
                <h4 className="font-medium text-foreground mb-2">Overload Signs</h4>
                <ul className="text-white/80 space-y-1">
                  <li>• Warm cables/outlets</li>
                  <li>• MCB tripping</li>
                  <li>• Voltage drop symptoms</li>
                  <li>• Burning smell</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Short Circuit Indicators</h4>
                <ul className="text-white/80 space-y-1">
                  <li>• Instantaneous MCB trip</li>
                  <li>• Sparks/flash at fault point</li>
                  <li>• Burned cable insulation</li>
                  <li>• Equipment damage</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Arc Fault Protection</h4>
                <ul className="text-white/80 space-y-1">
                  <li>• AFDD required locations</li>
                  <li>• Proper connection torques</li>
                  <li>• Regular maintenance</li>
                  <li>• Quality terminations</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-card rounded border border-amber-400/30">
              <p className="text-xs sm:text-sm text-foreground">
                <strong>Emergency action:</strong> Safe isolation → Investigation → Documentation → Remedial action → Test → Re-energise
              </p>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Quiz 
          title="Test Your Knowledge - Overloads, Short Circuits and Arcing" 
          questions={quizQuestions} 
        />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" asChild>
            <Link to="/study-centre/apprentice/level2/module1/section2/2-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Electric Shock and Burns
            </Link>
          </Button>
          <Button asChild>
            <Link to="/study-centre/apprentice/level2/module1/section2/2-3">
              Next: Fire and Explosion Hazards
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Section2_2;