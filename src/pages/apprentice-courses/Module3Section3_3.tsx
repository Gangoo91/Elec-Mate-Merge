import useSEO from "@/hooks/useSEO";
import {
  ArrowLeft,
  Wrench,
  AlertTriangle,
  Factory,
  Home,
  Shield,
  Building,
  Target,
  Scissors,
  Settings,
  CheckCircle2,
  Zap,
  Hammer,
  Power,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const quickCheckQuestions = [
  {
    id: "insulation-tester",
    question: "What is the purpose of an insulation resistance tester?",
    options: [
      "To measure current flow",
      "To test insulation quality between conductors",
      "To check voltage levels",
    ],
    correctIndex: 1,
    explanation:
      "Insulation resistance testers apply high test voltage (typically 500V DC) to detect insulation breakdown and verify the quality of insulation between conductors and earth.",
  },
  {
    id: "voltage-indicator",
    question: "Which tester is essential for safe isolation procedures?",
    options: [
      "Multimeter",
      "Voltage indicator (two-pole tester)",
      "RCD tester",
    ],
    correctIndex: 1,
    explanation:
      "Voltage indicators are essential for confirming circuits are dead before work begins, forming a critical part of safe isolation procedures.",
  },
  {
    id: "calibration-importance",
    question: "Why must test instruments be calibrated regularly?",
    options: [
      "To make them look professional",
      "To ensure accuracy and compliance",
      "To increase their value",
    ],
    correctIndex: 1,
    explanation:
      "Regular calibration ensures test equipment provides accurate readings, maintaining compliance with testing standards and ensuring reliable results.",
  },
  {
    id: "continuity-test",
    question: "What does a continuity tester check?",
    options: [
      "Voltage levels in circuits",
      "That conductors are continuous without breaks",
      "RCD trip times",
    ],
    correctIndex: 1,
    explanation:
      "Continuity testers verify that conductors provide an unbroken electrical path from one end to the other, essential for earth continuity and ring circuit testing.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Which instrument is used to measure voltage, current, and resistance?",
    options: [
      "Continuity tester",
      "Multimeter",
      "RCD tester",
      "Insulation resistance tester",
    ],
    correctAnswer: 1,
    explanation:
      "Multimeters are versatile instruments capable of measuring voltage, current, and resistance, making them essential for general electrical testing.",
  },
  {
    id: 2,
    question: "What voltage does an insulation resistance tester typically apply for testing?",
    options: [
      "50 V DC",
      "230 V AC",
      "500 V DC",
      "12 V DC",
    ],
    correctAnswer: 2,
    explanation:
      "Insulation resistance testers typically apply 500V DC to test insulation quality, providing sufficient voltage to detect potential breakdown.",
  },
  {
    id: 3,
    question: "True or False: You can perform an insulation resistance test on a live circuit.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation:
      "False. Insulation resistance tests must only be performed on de-energised circuits to prevent equipment damage and ensure safety.",
  },
  {
    id: 4,
    question: "Name one test you can perform with a continuity tester.",
    options: [
      "Voltage measurement",
      "Earth continuity check",
      "RCD trip time",
      "Insulation resistance",
    ],
    correctAnswer: 1,
    explanation:
      "Continuity testers are used for earth continuity checks, ring final circuit testing, and verifying bonding conductor integrity.",
  },
  {
    id: 5,
    question: "Which tester should always be proved before and after use?",
    options: [
      "Voltage indicator",
      "Multimeter",
      "RCD tester",
      "Clamp meter",
    ],
    correctAnswer: 0,
    explanation:
      "Voltage indicators must be proved on a known live source before and after testing to ensure they are working correctly.",
  },
  {
    id: 6,
    question: "What is the main purpose of an RCD tester?",
    options: [
      "Measure resistance of conductors",
      "Measure trip time and trip current",
      "Check cable length",
      "Identify polarity",
    ],
    correctAnswer: 1,
    explanation:
      "RCD testers measure both trip time and trip current to verify that RCDs operate within BS 7671 requirements for protection.",
  },
  {
    id: 7,
    question: "Why is regular calibration important for test equipment?",
    options: [
      "To maintain warranty coverage",
      "To ensure accuracy and compliance with standards",
      "To increase resale value",
      "To reduce testing time",
    ],
    correctAnswer: 1,
    explanation:
      "Regular calibration ensures test equipment provides accurate readings, maintaining compliance with testing standards and ensuring reliable results.",
  },
  {
    id: 8,
    question: "Name one PPE item recommended when testing live circuits.",
    options: [
      "Hard hat",
      "Insulated gloves",
      "High-vis vest",
      "Steel toe boots",
    ],
    correctAnswer: 1,
    explanation:
      "Insulated gloves provide essential protection against electric shock when testing live circuits, along with safety glasses and other appropriate PPE.",
  },
];

const Module3Section3_3: React.FC = () => {
  console.log("Module3Section3_3 component loaded");

  useSEO(
    "Test Equipment for Installation Work (Overview) – Module 3 (3.3.3)",
    "Overview of essential electrical test equipment. Multimeters, insulation testers, continuity testers, voltage indicators and safety practices."
  );

  const faqs = [
    {
      q: "Can a multimeter replace an RCD tester?",
      a: "No — a multimeter cannot measure RCD trip times or currents accurately. Specialist RCD testers are required for compliance testing.",
    },
    {
      q: "Is it safe to carry out insulation resistance tests on live circuits?",
      a: "No — these tests must only be carried out on de-energised circuits to prevent equipment damage and ensure safety.",
    },
    {
      q: "What's the difference between a voltage indicator and a multimeter?",
      a: "A voltage indicator only shows presence/absence of voltage, while a multimeter measures actual voltage values and other parameters.",
    },
    {
      q: "How often should test equipment be calibrated?",
      a: "Typically annually or as specified by the manufacturer, though more frequent calibration may be required for heavily used equipment.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button
            variant="ghost"
            className="text-white hover:text-white active:text-white p-0 -ml-1 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 3.3
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8 text-center">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 mb-4">
            <span className="text-elec-yellow text-sm font-medium">Module 3 - Section 3.3.3</span>
          </div>
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-white/5">
              <Activity className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Test Equipment for Installation Work (Overview Only)
          </h1>
          <p className="text-white/70">
            Essential electrical test equipment for safe, compliant installations and professional testing practices.
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Introduction
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Multimeters: measure voltage, current, resistance for general testing.</li>
                <li>Insulation testers: verify cable insulation quality before energising.</li>
                <li>Continuity testers: check earth paths and ring circuit integrity.</li>
                <li>Voltage indicators: essential for safe isolation confirmation.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Spot:</strong> Digital displays, test leads, range selectors, calibration labels.
                </li>
                <li>
                  <strong>Use:</strong> Right tester for each test - never compromise on safety.
                </li>
                <li>
                  <strong>Check:</strong> Calibration dates, lead condition, battery levels, proving units.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Learning outcomes
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Identify the main types of electrical test equipment used in installations.</li>
            <li>Understand the basic function of each piece of equipment.</li>
            <li>Recognise key safety practices when using electrical testers.</li>
            <li>Appreciate the importance of calibration and correct handling.</li>
          </ul>
        </section>

        {/* Content */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Content
          </h2>

          {/* Multimeter */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Activity className="w-5 h-5" /> Multimeter
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">Universal Measuring Instrument</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-white mb-1">Purpose & Function</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Measures voltage, current, and resistance in circuits</li>
                      <li>Provides accurate readings for troubleshooting</li>
                      <li>Verifies supply conditions and component values</li>
                      <li>Essential for general electrical testing and diagnosis</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Types Available</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Digital multimeters (DMMs) - high accuracy, easy reading</li>
                      <li>Analogue multimeters - less common in modern work</li>
                      <li>Auto-ranging models for simplified operation</li>
                      <li>True RMS meters for accurate AC measurements</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Best Practice</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Select correct range before measurement</li>
                      <li>Confirm leads are in the right input sockets</li>
                      <li>Never measure current on a voltage setting</li>
                      <li>Check polarity for DC measurements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
          <div className="my-6 border-t border-white/10" />

          {/* Insulation Resistance Tester */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" /> Insulation Resistance Tester (Megger)
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">Insulation Quality Testing</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-white mb-1">Purpose & Function</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Tests insulation quality between conductors and earth</li>
                      <li>Applies high test voltage (typically 500V DC)</li>
                      <li>Detects insulation breakdown before energising</li>
                      <li>Verifies cable integrity after installation</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">How It Works</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Generates high DC test voltage internally</li>
                      <li>Measures resistance of insulation path</li>
                      <li>Results typically in megaohms (MO)</li>
                      <li>Higher resistance indicates better insulation</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Best Practice</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Ensure circuit is completely de-energised</li>
                      <li>Disconnect sensitive equipment before testing</li>
                      <li>Check for minimum values per BS 7671</li>
                      <li>Record all test results for certification</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
          <div className="my-6 border-t border-white/10" />

          {/* Continuity and Voltage Testing */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5" /> Continuity & Voltage Testing
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                  <p className="font-medium mb-2">Continuity Tester</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-white mb-1">Purpose</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Checks conductors are continuous end-to-end</li>
                        <li>Verifies no breaks in electrical paths</li>
                        <li>Essential for earth continuity testing</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Applications</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Earth continuity verification</li>
                        <li>Ring final circuit testing</li>
                        <li>Bonding conductor checks</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Best Practice</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Use low-resistance tester for accuracy</li>
                        <li>Zero the leads before testing</li>
                        <li>Check connections are secure</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                  <p className="font-medium mb-2">Voltage Indicator (Two-Pole)</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-white mb-1">Purpose</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Confirms whether circuit is live or dead</li>
                        <li>Essential for safe isolation procedures</li>
                        <li>Simple presence/absence indication</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Applications</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Pre-work safety confirmation</li>
                        <li>Isolation verification</li>
                        <li>Quick voltage presence checks</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-1">Best Practice</p>
                      <ul className="list-disc pl-4 space-y-1 text-white">
                        <li>Always prove before and after use</li>
                        <li>Test on known live source first</li>
                        <li>Replace batteries regularly</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
          <div className="my-6 border-t border-white/10" />

          {/* RCD Tester */}
          <div className="mb-6">
            <h3 className="font-medium text-white mb-3 flex items-center gap-2">
              <Settings className="w-5 h-5" /> RCD Tester
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                <p className="font-medium mb-2">RCD Performance Verification</p>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-white mb-1">Purpose & Function</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Measures RCD trip time and trip current accurately</li>
                      <li>Verifies operation within BS 7671 limits</li>
                      <li>Tests at different current levels for full verification</li>
                      <li>Essential for protection device certification</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Test Parameters</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Trip current measurement (typically 30mA for general use)</li>
                      <li>Trip time at rated current (less than or equal to 300ms for 30mA RCDs)</li>
                      <li>Trip time at 5x rated current (less than or equal to 40ms)</li>
                      <li>No-trip test at 50% rated current</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Best Practice</p>
                    <ul className="list-disc pl-4 space-y-1 text-white">
                      <li>Record all test results for certification</li>
                      <li>Test at rated and 5x rated current</li>
                      <li>Check mechanical operation manually</li>
                      <li>Verify correct phase-earth testing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[3]} />
        </section>

        {/* What this means on site */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            <Building className="w-5 h-5" /> What this means on site
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2">Testing Sequence Planning</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Plan testing sequence before starting installation work</li>
                <li>Ensure all test equipment is calibrated and working</li>
                <li>Coordinate testing with other trades to avoid conflicts</li>
                <li>Allow adequate time for thorough testing and documentation</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
              <p className="font-medium mb-2">Professional Standards</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Testing validates installation quality and compliance</li>
                <li>Proper documentation protects against liability</li>
                <li>Accurate results enable confident energisation</li>
                <li>Regular calibration maintains professional credibility</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Installation Practices */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            <Settings className="w-5 h-5" /> Installation Practices
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                <p className="font-medium mb-2">Equipment Management</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Maintain calibration certificates for all test equipment</li>
                  <li>Inspect leads and probes before each use</li>
                  <li>Store equipment in protective cases to prevent damage</li>
                  <li>Keep backup batteries for battery-powered instruments</li>
                </ul>
              </div>
              <div className="rounded-lg p-4 bg-transparent border border-cyan-400/30">
                <p className="font-medium mb-2">Testing Procedures</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Follow manufacturer instructions for each instrument</li>
                  <li>Record results immediately to prevent errors</li>
                  <li>Double-check unexpected readings with alternative methods</li>
                  <li>Understand test limitations and appropriate applications</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            <AlertTriangle className="w-5 h-5 text-elec-yellow" /> Common Mistakes
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 text-elec-yellow">Dangerous Practices</p>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li><strong>Using uncalibrated equipment</strong> - Inaccurate results, compliance failures</li>
                <li><strong>Testing live circuits with insulation tester</strong> - Equipment damage, safety risk</li>
                <li><strong>Not proving voltage indicators</strong> - False confidence in dead circuits</li>
                <li><strong>Wrong test lead connections</strong> - Meter damage, incorrect readings</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 text-elec-yellow">Quality Issues</p>
              <ul className="list-disc pl-6 space-y-1 text-white">
                <li><strong>Inadequate record keeping</strong> - Compliance problems, traceability issues</li>
                <li><strong>Skipping continuity tests</strong> - Undetected earth faults, safety risks</li>
                <li><strong>Wrong test voltage selection</strong> - Inappropriate stress on insulation</li>
                <li><strong>Ignoring manufacturer guidance</strong> - Incorrect operation, invalid results</li>
              </ul>
            </div>
          </div>
        </section>

        {/* BS 7671 Context */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            <Shield className="w-5 h-5" /> BS 7671 Context
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-4 bg-indigo-500/10 border border-indigo-400/30">
              <p className="font-medium mb-2">Testing Requirements</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Part 6:</strong> Inspection and testing of electrical installations</li>
                <li><strong>Section 610:</strong> Initial verification requirements</li>
                <li><strong>Section 612:</strong> Testing procedures and acceptance criteria</li>
                <li><strong>Appendix 13:</strong> Methods for measuring earth fault loop impedance</li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-violet-500/10 border border-violet-400/30">
              <p className="font-medium mb-2">Compliance Standards</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Minimum insulation resistance values specified</li>
                <li>RCD trip times and currents must meet defined limits</li>
                <li>Continuity tests required for all protective conductors</li>
                <li>Test results must be recorded on appropriate certificates</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real-world Scenario */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            <Factory className="w-5 h-5" /> Real-world Scenario
          </h2>
          <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-slate-400/30">
            <p className="font-medium mb-2">Scenario: Insulation Test Prevents Major Fault</p>
            <p className="text-sm mb-4">
              On a commercial fit-out, an electrician used an insulation resistance tester before energising the lighting circuits.
              The test revealed a damaged cable caused by a screw through the wall, which would have caused a fault if energised.
              The damage was repaired before final connection, avoiding downtime and potential danger.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-green-300 mb-1">Testing Benefits</p>
                <ul className="list-disc pl-4 space-y-1 text-white">
                  <li>Identified hidden damage before energisation</li>
                  <li>Prevented circuit breaker tripping and investigation</li>
                  <li>Avoided potential fire or safety hazard</li>
                  <li>Saved time and cost of fault-finding later</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-elec-yellow mb-1">Professional Practice</p>
                <ul className="list-disc pl-4 space-y-1 text-white">
                  <li>Systematic testing approach identified issue</li>
                  <li>Problem resolved during installation phase</li>
                  <li>Client confidence maintained through quality work</li>
                  <li>Compliance with BS 7671 verification requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">09</span>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index}>
                <p className="font-medium text-white mb-1">{faq.q}</p>
                <p className="text-sm text-white">{faq.a}</p>
                {index < faqs.length - 1 && <div className="mt-4 border-t border-white/10" />}
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">10</span>
            Summary
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <p>
              Test equipment is vital for ensuring installations are safe, compliant, and fault-free. Knowing which tester to use,
              how to operate it correctly, and how to interpret results is a fundamental skill for all electricians.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
                <p className="font-medium text-green-300 mb-2">Key Benefits</p>
                <ul className="list-disc pl-4 space-y-1 text-white">
                  <li>Verifies installation safety before energisation</li>
                  <li>Ensures compliance with BS 7671 requirements</li>
                  <li>Identifies problems early in installation process</li>
                  <li>Provides documentation for professional liability</li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium text-elec-yellow mb-2">Essential Points</p>
                <ul className="list-disc pl-4 space-y-1 text-white">
                  <li>Different testers for different applications</li>
                  <li>Calibration essential for accurate results</li>
                  <li>Safety procedures critical for all testing</li>
                  <li>Proper documentation required for compliance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Apprentice Do's and Don'ts */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">11</span>
            <Target className="w-5 h-5" /> Apprentice Do's and Don'ts
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-lg p-4 bg-transparent border border-green-400/30">
              <p className="font-medium text-green-300 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> DO
              </p>
              <ul className="space-y-2 text-sm text-white">
                <li>Check calibration certificates before testing</li>
                <li>Prove voltage indicators before and after use</li>
                <li>Record all test results immediately</li>
                <li>Use appropriate PPE for live testing</li>
                <li>Ensure circuits are dead before insulation testing</li>
                <li>Follow manufacturer operating instructions</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> DON'T
              </p>
              <ul className="space-y-2 text-sm text-white">
                <li>Use uncalibrated or damaged test equipment</li>
                <li>Test live circuits with insulation testers</li>
                <li>Skip continuity tests to save time</li>
                <li>Trust voltage indicators without proving</li>
                <li>Use wrong test leads or connections</li>
                <li>Ignore manufacturer safety guidelines</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pocket Card Quick Reference */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">12</span>
            Pocket Card Quick Reference
          </h2>
          <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-slate-400/30 text-sm">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium mb-2">Test Equipment Guide</p>
                <ul className="space-y-1">
                  <li><strong>Multimeter:</strong> V, I, R measurements</li>
                  <li><strong>Insulation Tester:</strong> 500V DC test</li>
                  <li><strong>Continuity:</strong> Earth paths, ring circuits</li>
                  <li><strong>Voltage Indicator:</strong> Live/dead confirmation</li>
                  <li><strong>RCD Tester:</strong> Trip time & current</li>
                  <li><strong>Loop Tester:</strong> Earth fault impedance</li>
                </ul>
              </div>
              <div>
                <p className="font-medium mb-2">Safety Reminders</p>
                <ul className="space-y-1">
                  <li>Check calibration dates annually</li>
                  <li>Prove voltage indicators before/after</li>
                  <li>De-energise before insulation testing</li>
                  <li>Record results immediately</li>
                  <li>Use appropriate PPE</li>
                  <li>Follow manufacturer instructions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Key References */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">13</span>
            Key References
          </h2>
          <div className="text-xs sm:text-sm text-white space-y-2">
            <p><strong>BS 7671:</strong> IET Wiring Regulations (18th Edition) - Part 6</p>
            <p><strong>GS38:</strong> Electrical test equipment for use by electricians</p>
            <p><strong>BS EN 61557:</strong> Electrical safety in low voltage distribution systems</p>
            <p><strong>IET Code of Practice:</strong> In-service Inspection and Testing</p>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-elec-yellow/80 text-sm font-normal">14</span>
            Knowledge Check
          </h2>
          <Quiz questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-3">
          <Button variant="outline" className="min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../3-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Common Power Tools
            </Link>
          </Button>
          <Button className="min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../3-4">
              Next: Tool Inspection
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module3Section3_3;
