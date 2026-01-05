import { ArrowLeft, Zap, AlertTriangle, FileText, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section3_1 = () => {
  useSEO(
    "Introduction to Test Instruments - Level 2 Electrical Installation",
    "Multimeter, IR tester, and continuity tester fundamentals for electrical testing"
  );

  // Quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "Which instrument measures AC and DC voltage?",
      options: [
        "Continuity tester",
        "IR tester",
        "Multimeter",
        "Insulation tester"
      ],
      correctAnswer: 2,
      explanation: "A multimeter is designed to measure AC and DC voltage, along with current and resistance."
    },
    {
      id: 2,
      question: "What unit is insulation resistance measured in?",
      options: [
        "Ohms",
        "Megaohms",
        "Volts",
        "Amperes"
      ],
      correctAnswer: 1,
      explanation: "Insulation resistance is measured in megaohms (MΩ) due to the high resistance values involved."
    },
    {
      id: 3,
      question: "Before using an IR tester, what must you do?",
      options: [
        "Switch circuit on",
        "Disconnect and isolate circuit",
        "Reduce test voltage",
        "Connect all equipment"
      ],
      correctAnswer: 1,
      explanation: "The circuit must be disconnected and isolated before IR testing to prevent damage to equipment and ensure safety."
    },
    {
      id: 4,
      question: "A continuity test shows 0 Ω. What does this mean?",
      options: [
        "Circuit is broken",
        "Good continuity",
        "High resistance fault",
        "Insulation failure"
      ],
      correctAnswer: 1,
      explanation: "A reading of 0 Ω (or very close to 0) indicates good continuity with no breaks in the circuit."
    },
    {
      id: 5,
      question: "What is the typical insulation resistance value required by BS 7671 for new installations?",
      options: [
        "0.5 MΩ",
        "1 MΩ",
        "10 MΩ",
        "100 MΩ"
      ],
      correctAnswer: 1,
      explanation: "BS 7671 requires a minimum insulation resistance of 1 MΩ for new installations."
    },
    {
      id: 6,
      question: "Why should instruments comply with GS38?",
      options: [
        "To save battery life",
        "To ensure safety",
        "To improve insulation resistance",
        "To reduce testing time"
      ],
      correctAnswer: 1,
      explanation: "GS38 compliance ensures safety through requirements like shrouded probes and fused leads."
    },
    {
      id: 7,
      question: "Which instrument is used to verify polarity at a socket outlet?",
      options: [
        "Multimeter",
        "Continuity tester",
        "IR tester",
        "Earth loop tester"
      ],
      correctAnswer: 0,
      explanation: "A multimeter can measure voltage and verify polarity at socket outlets."
    },
    {
      id: 8,
      question: "What happens if you fail to zero a continuity tester?",
      options: [
        "Nothing changes",
        "Results will include lead resistance",
        "The tester will not work",
        "Battery life is reduced"
      ],
      correctAnswer: 1,
      explanation: "Failing to zero the continuity tester means the lead resistance will be included in the results, affecting accuracy."
    },
    {
      id: 9,
      question: "Which test instrument applies high DC voltage to a circuit?",
      options: [
        "Continuity tester",
        "Multimeter",
        "Insulation resistance tester",
        "Current clamp"
      ],
      correctAnswer: 2,
      explanation: "The insulation resistance tester applies high DC voltage (250V, 500V, or 1000V) to test insulation quality."
    },
    {
      id: 10,
      question: "Why is it important to use the correct range on a multimeter?",
      options: [
        "To make the numbers look smaller",
        "To protect the meter and get accurate readings",
        "To avoid checking resistance",
        "To save battery power"
      ],
      correctAnswer: 1,
      explanation: "Using the correct range protects the meter from damage and ensures accurate, readable measurements."
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
              Back to Section 6.3
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
              <Zap className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 6.3.1
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Introduction to Test Instruments
          </h1>
          <p className="text-muted-foreground">
            Multimeter, IR tester, and continuity tester fundamentals for electrical testing
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-foreground" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-4 bg-background border border-border/30">
              <p className="font-medium mb-3">In 30 seconds</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Instrument selection: right tool for the test required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>GS38 compliance: shrouded probes, fused leads, calibration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Range setting: appropriate measurement range selected</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Safety procedures: isolation, disconnection, PPE</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-4 bg-emerald-950/30 border border-emerald-700/40">
              <p className="font-medium mb-3">Spot it / Use it</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Spot:</strong> Wrong instrument, non-compliant probes, incorrect range, no calibration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Use:</strong> Multimeter for voltage/current; IR tester for insulation; continuity for paths</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span><strong>Check:</strong> Calibration certificates; GS38 markings; proper isolation procedures</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <p className="text-base text-foreground mb-4">
            Electrical installation work relies on precise measurement and verification to ensure systems are safe, compliant, and functional. Test instruments are the foundation of this process, enabling electricians to check voltage, resistance, insulation quality, and continuity of circuits.
          </p>
          <p className="text-base text-foreground">
            In this subsection, we will introduce three key instruments: the Multimeter, Insulation Resistance (IR) Tester, and the Continuity Tester. These tools form the basis of electrical testing for apprentices and practicing electricians.
          </p>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <p className="text-base text-foreground mb-4">By the end of this subsection, you will be able to:</p>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
            <li>Describe the purpose of a multimeter, IR tester, and continuity tester.</li>
            <li>Identify the main parts and functions of each instrument.</li>
            <li>Understand when to use each tool during installation and testing.</li>
            <li>Recognise the safety precautions associated with these instruments.</li>
            <li>Perform basic setup and use of the instruments with confidence.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content / Learning</h2>

          {/* 1. Multimeter */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">1. Multimeter</h3>
            <p className="text-base text-foreground mb-4">
              The multimeter is the most versatile electrical test instrument, capable of measuring multiple electrical parameters essential for installation and maintenance work.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-emerald-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-emerald-400 dark:text-emerald-400 mb-3">Multimeter Fundamentals</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Primary Purpose:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Measures voltage (AC and DC) for live/dead circuit verification</li>
                          <li>Checks resistance of conductors and components</li>
                          <li>Measures current flow in electrical circuits</li>
                          <li>Verifies polarity and phase relationships</li>
                          <li>Provides basic electrical fault diagnosis capabilities</li>
                          <li>Tests diodes, transistors, and basic semiconductor components</li>
                          <li>Measures frequency in AC circuits for motor and equipment checks</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Types and Advanced Features:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Digital Multimeter (DMM) – preferred for accuracy and ease of reading</li>
                          <li>Analogue Multimeter – useful for trending measurements and rapid changes</li>
                          <li>True RMS capability for accurate AC measurements with distorted waveforms</li>
                          <li>Auto-ranging function for simplified operation and reduced errors</li>
                          <li>Data logging and connectivity features for trend analysis</li>
                          <li>Min/Max recording for capturing intermittent faults</li>
                          <li>Relative measurement mode for comparative readings</li>
                          <li>Temperature measurement capability with thermocouple probes</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Detailed Functions and Applications:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Voltage testing: Live/dead verification, supply quality checks, load voltage measurement</li>
                          <li>Resistance measurement: Conductor integrity, heating element checks, motor winding resistance</li>
                          <li>Current measurement: Load current verification, earth leakage detection, circuit loading</li>
                          <li>Diode testing: Semiconductor junction checks, LED polarity verification</li>
                          <li>Frequency measurement: Motor supply frequency, inverter output checks</li>
                          <li>Capacitance measurement: Motor start capacitor checks, power factor correction</li>
                          <li>dB measurement: Signal level testing in communication systems</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Safety Considerations and Limitations:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>CAT rating must match or exceed system voltage and category</li>
                          <li>Current measurement requires breaking circuit or using clamp attachment</li>
                          <li>Input impedance affects readings in high-impedance circuits</li>
                          <li>AC coupling can affect DC measurements if not properly configured</li>
                          <li>Lead resistance becomes significant in low-resistance measurements</li>
                          <li>Environmental conditions affect accuracy (temperature, humidity, EMI)</li>
                          <li>Battery condition critical for accuracy - regular checking essential</li>
                        </ul>
                      </div>

                      <div className="bg-emerald-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                        <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Critical Limitation</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Multimeters are NOT suitable for insulation resistance checks as they cannot apply the high voltages (250V-1000V) required for proper insulation testing. Maximum test voltage is typically only 3-9V DC.
                        </p>
                      </div>

                      <div className="bg-emerald-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800 mt-3">
                        <p className="font-medium text-blue-700 dark:text-emerald-400 mb-2">Practical Application Tips</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Always start measurements on the highest range to protect the instrument, then step down for better resolution. Use the hold function to freeze readings in difficult-to-reach locations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="multimeter-check"
            question="What instrument would you use to measure current in a live circuit?"
            options={["Continuity tester", "IR tester", "Multimeter", "Insulation tester"]}
            correctIndex={2}
            explanation="A multimeter is the appropriate instrument for measuring current in live circuits, with proper safety precautions."
          />
          <Separator className="my-6" />

          {/* 2. Insulation Resistance (IR) Tester */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">2. Insulation Resistance (IR) Tester</h3>
            <p className="text-base text-foreground mb-4">
              The IR tester is a specialised instrument designed to assess the quality and integrity of electrical insulation by applying high DC voltage and measuring the resulting resistance.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 dark:text-emerald-400 mb-3">IR Tester Operation and Applications</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Operating Principle and Theory:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Applies high DC voltage (typically 250V, 500V, or 1000V) to stress insulation</li>
                          <li>Measures resulting current flow through insulation to calculate resistance</li>
                          <li>Good insulation produces minimal current flow (high resistance in megaohms)</li>
                          <li>Damaged or deteriorated insulation allows increased current flow</li>
                          <li>Test voltage selection based on circuit nominal voltage and insulation class</li>
                          <li>Polarisation index testing reveals insulation condition over time</li>
                          <li>Dielectric absorption ratio provides additional insulation assessment</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Test Voltage Selection Criteria:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>250V DC: For circuits up to and including 50V (extra-low voltage)</li>
                          <li>500V DC: For circuits between 50V and 500V (low voltage installations)</li>
                          <li>1000V DC: For circuits between 500V and 1000V (high voltage systems)</li>
                          <li>Higher voltages (2500V, 5000V): For HV equipment and cable testing</li>
                          <li>Equipment voltage rating determines minimum test voltage required</li>
                          <li>Environmental conditions may require higher test voltages</li>
                          <li>Manufacturer specifications override standard test voltages</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Expected Values and Interpretation:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                           <li>New installations: typically &gt;10 MΩ at test voltage</li>
                           <li>BS 7671 minimum requirement: 1 MΩ for new low voltage installations</li>
                           <li>Existing installations: &gt;1 MΩ generally acceptable, investigate if &lt;0.5 MΩ</li>
                          <li>Temperature coefficient: readings increase by ~13% per 10°C decrease</li>
                          <li>Humidity effects: high humidity reduces insulation resistance readings</li>
                          <li>Cable length effects: longer cables show proportionally lower readings</li>
                          <li>Trending more important than absolute values for maintenance</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Advanced Testing Techniques:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Polarisation Index (PI): 10-minute reading divided by 1-minute reading</li>
                          <li>Dielectric Absorption Ratio (DAR): 1-minute reading divided by 30-second reading</li>
                          <li>Step voltage testing: progressive voltage increase to identify weakness</li>
                          <li>Ramp testing: continuous voltage increase to breakdown point</li>
                          <li>Time-resistance testing: monitoring resistance change over time</li>
                          <li>Guard terminal use: eliminates surface leakage effects</li>
                          <li>Temperature correction: adjusting readings to standard temperature</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Critical Applications and Procedures:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Pre-energisation testing: mandatory before connecting new circuits</li>
                          <li>Periodic inspection testing: 5-year intervals for domestic, shorter for commercial</li>
                          <li>Fault investigation: identifying location and extent of insulation damage</li>
                          <li>Cable acceptance testing: manufacturer's tests before installation</li>
                          <li>Maintenance scheduling: trending results to predict failure</li>
                          <li>Post-repair verification: confirming insulation restoration after work</li>
                          <li>Environmental assessment: testing under various conditions</li>
                        </ul>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-200 dark:border-purple-800">
                        <p className="font-medium text-purple-700 dark:text-emerald-400 mb-2">Critical Safety Protocol</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Always ensure complete circuit isolation and disconnection before IR testing. Remove all electronic equipment, LED lamps, RCD devices, and surge protectors. High test voltages WILL damage sensitive equipment.
                        </p>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-200 dark:border-purple-800 mt-3">
                        <p className="font-medium text-purple-700 dark:text-emerald-400 mb-2">Environmental Considerations</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Temperature and humidity significantly affect readings. Test in consistent conditions where possible, and apply temperature correction factors when comparing historical data.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ir-tester-check"
            question="What does a reading of 0.1 Ω on a continuity tester indicate?"
            options={["Circuit is broken", "Good continuity - very low resistance", "High resistance fault", "Insulation failure"]}
            correctIndex={1}
            explanation="A reading of 0.1 Ω indicates very good continuity with minimal resistance in the circuit path."
          />
          <Separator className="my-6" />

          {/* 3. Continuity Tester */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-4">3. Continuity Tester</h3>
            <p className="text-base text-foreground mb-4">
              The continuity tester verifies that electrical conductors form complete, unbroken paths with minimal resistance, essential for proper circuit operation and safety systems.
            </p>
            
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3">Continuity Testing Principles</p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Operating Method and Technology:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Passes small, safe DC current (typically 200mA max) through circuit</li>
                          <li>Measures and displays total resistance of the complete path</li>
                          <li>Four-wire measurement technique eliminates lead resistance errors</li>
                          <li>Low resistance readings confirm good electrical continuity</li>
                          <li>High or infinite resistance indicates breaks, poor connections, or corrosion</li>
                          <li>Audible indication provides immediate feedback during testing</li>
                          <li>Digital display shows precise resistance values for documentation</li>
                          <li>Auto-ranging optimises measurement resolution automatically</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Essential Applications and Methods:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Ring final circuit testing: R1+R2 method for end-to-end resistance</li>
                          <li>Radial circuit verification: ensuring continuous paths to all points</li>
                          <li>Protective conductor testing: verifying earthing system integrity</li>
                          <li>Equipotential bonding verification: main and supplementary bonding</li>
                          <li>Cable fault location: identifying breaks or high-resistance joints</li>
                          <li>Motor winding continuity: checking for open circuits in windings</li>
                          <li>Control circuit verification: ensuring switching and signalling paths</li>
                          <li>Heating element testing: confirming element integrity before energisation</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Expected Values and Standards:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Excellent continuity: resistance below 0.1 Ω for short runs</li>
                          <li>Good continuity: resistance typically below 0.5 Ω for most circuits</li>
                          <li>Ring final circuits: R1+R2 values specific to cable type and length</li>
                          <li>Protective conductors: values depend on conductor size and installation method</li>
                          <li>Bonding connections: typically below 0.05 Ω for effective bonding</li>
                          <li>Cable per metre: manufacturer's data provides reference values</li>
                          <li>Temperature effects: resistance increases with conductor temperature</li>
                          <li>Connection quality: sudden resistance increases indicate poor joints</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Advanced Testing Techniques:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Cross-bonding verification: ensuring proper connection sequences</li>
                          <li>Earth electrode resistance: specialized earth testing requirements</li>
                          <li>Fault loop impedance preparation: continuity forms basis for Ze+R1+R2</li>
                          <li>Millivolt drop testing: high-current method for very low resistances</li>
                          <li>Kelvin (4-wire) method: eliminating lead resistance in critical measurements</li>
                          <li>Micro-ohm testing: precision measurement for high-current applications</li>
                          <li>Contact resistance testing: switch and connector performance evaluation</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-base text-foreground mb-2"><strong>Common Issues and Troubleshooting:</strong></p>
                        <ul className="text-xs sm:text-sm text-foreground ml-4 list-disc space-y-1">
                          <li>Lead resistance compensation: zeroing procedure eliminates measurement errors</li>
                          <li>Contact resistance effects: clean connections essential for accurate readings</li>
                          <li>Parallel path effects: may give false low readings in complex circuits</li>
                          <li>Inductive effects: can affect readings in circuits with large inductances</li>
                          <li>Temperature drift: warm conductors show higher resistance values</li>
                          <li>Probe contact pressure: consistent pressure required for repeatable results</li>
                          <li>Battery condition: low battery affects measurement accuracy and range</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Calibration and Accuracy</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Always zero the continuity tester before each series of measurements to eliminate lead resistance. Use short, low-resistance test leads and maintain good contact pressure for accurate results.
                        </p>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800 mt-3">
                        <p className="font-medium text-green-700 dark:text-green-400 mb-2">Professional Practice</p>
                        <p className="text-xs sm:text-sm text-foreground">
                          Document all continuity readings methodically. Unexpected high readings often indicate installation defects that must be investigated and rectified before energisation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ir-safety-check"
            question="Why must sensitive equipment be disconnected before using an IR tester?"
            options={["To save battery", "High voltage can damage sensitive equipment", "To get faster results", "To reduce test time"]}
            correctIndex={1}
            explanation="IR testers apply high DC voltages (250V-1000V) that can damage sensitive electronic equipment, so it must be disconnected before testing."
          />

        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Practical Guidance</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Core Testing Procedures</h3>
              <ul className="list-disc pl-6 space-y-2 text-base text-foreground">
                <li>Always confirm instruments are GS38 compliant (shrouded probes, fused leads, current limitation)</li>
                <li>Check calibration certificates before use — faulty readings may lead to unsafe conclusions</li>
                <li>For multimeters: start on the highest range, then step down for optimal resolution</li>
                <li>For IR testers: ensure all sensitive equipment is completely disconnected before testing</li>
                <li>For continuity testers: zero the instrument before each test series to eliminate lead errors</li>
                <li>Always use appropriate PPE and follow safe isolation procedures</li>
                <li>Test instrument functionality using known good sources before and after testing</li>
              </ul>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-3">Advanced Instrument Selection & Setup</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-foreground mb-2">Multimeter Applications:</p>
                  <ul className="text-xs sm:text-sm text-foreground list-disc pl-4 space-y-1">
                    <li>AC/DC voltage measurements for supply verification</li>
                    <li>Current measurement using clamp-on adapters for safety</li>
                    <li>Resistance checks for heating elements and motor windings</li>
                    <li>Frequency measurement for inverter and motor drive testing</li>
                    <li>Diode testing for rectifier and power supply diagnostics</li>
                    <li>Temperature measurement with appropriate probe accessories</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">IR Tester Protocols:</p>
                  <ul className="text-xs sm:text-sm text-foreground list-disc pl-4 space-y-1">
                    <li>Voltage selection based on equipment nominal voltage</li>
                    <li>Complete isolation verification before connection</li>
                    <li>Equipment disconnection: electronics, RCDs, surge protectors</li>
                    <li>Environmental condition recording for result interpretation</li>
                    <li>Progressive voltage testing for equipment characterisation</li>
                    <li>Guard terminal use for accurate cable testing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-3">Professional Testing Techniques</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-foreground mb-2">Continuity Testing Methods:</p>
                  <ul className="text-xs sm:text-sm text-foreground list-disc pl-4 space-y-1">
                    <li>Ring circuit R1+R2 method for accurate end-to-end values</li>
                    <li>Cross-connection technique for polarity verification</li>
                    <li>Protective conductor testing from main earthing terminal</li>
                    <li>Equipotential bonding verification using milliohm ranges</li>
                    <li>Cable length calculation from resistance measurements</li>
                    <li>Joint resistance assessment for connection quality</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">Advanced Diagnostics:</p>
                  <ul className="text-xs sm:text-sm text-foreground list-disc pl-4 space-y-1">
                    <li>Trending analysis for predictive maintenance planning</li>
                    <li>Comparative testing across similar circuits or phases</li>
                    <li>Load testing using controlled current injection</li>
                    <li>High-current testing for busbar and switchgear connections</li>
                    <li>Micro-ohm measurement for critical power connections</li>
                    <li>Earth electrode specific resistance measurement</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-3">Quality Assurance & Maintenance</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-foreground mb-2">Instrument Maintenance:</p>
                  <ul className="text-xs sm:text-sm text-foreground list-disc pl-4 space-y-1">
                    <li>Annual calibration by accredited laboratories</li>
                    <li>Regular inspection of test leads and probe condition</li>
                    <li>Battery replacement schedules and low-battery procedures</li>
                    <li>Environmental protection during storage and transport</li>
                    <li>Firmware updates for digital instruments with connectivity</li>
                    <li>Physical inspection for damage, wear, and contamination</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">Results Management:</p>
                  <ul className="text-xs sm:text-sm text-foreground list-disc pl-4 space-y-1">
                    <li>Systematic documentation using standard test forms</li>
                    <li>Digital data logging for trend analysis and reporting</li>
                    <li>Cross-verification of critical measurements</li>
                    <li>Environmental condition recording for context</li>
                    <li>Anomaly investigation procedures and escalation</li>
                    <li>Client reporting with clear interpretation and recommendations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
              <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-3">Safety Critical Reminders</h3>
              <ul className="text-xs sm:text-sm text-foreground list-disc pl-4 space-y-1">
                <li>Never exceed instrument CAT ratings - voltage category and maximum voltage must not be exceeded</li>
                <li>Always verify instrument functionality with known sources before and after testing</li>
                <li>IR testing can charge cables and equipment - always discharge safely after testing</li>
                <li>Some continuity testers use sufficient current to operate sensitive relay circuits</li>
                <li>Environmental conditions (temperature, humidity, altitude) affect instrument accuracy</li>
                <li>Battery condition is critical for accuracy - replace according to manufacturer recommendations</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Example</h2>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
            <p className="text-base text-foreground mb-4">
              An apprentice electrician is asked to test a ring final circuit in a new domestic property. First, they use a continuity tester to verify the ring is complete by measuring R1+R2 from the consumer unit to each socket, ensuring readings are consistent and within expected values for the cable type. They then use the IR tester to confirm that insulation resistance between live conductors and earth exceeds 1 MΩ at 500V DC, ensuring no dangerous leakage currents. Finally, they use a multimeter to check voltage at each socket outlet, verifying 230V ±10% and correct polarity before handing over to the client.
            </p>
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4 mt-4">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/40 rounded border-l-4 border-l-amber-500">
                <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">Continuity Testing</p>
                <p className="text-xs sm:text-sm text-foreground">Verified complete ring integrity and correct polarity using systematic R1+R2 method</p>
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900/40 rounded border-l-4 border-l-amber-500">
                <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">Insulation Testing</p>
                <p className="text-xs sm:text-sm text-foreground">Confirmed insulation quality &gt;1 MΩ using 500V DC appropriate for 230V circuit</p>
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900/40 rounded border-l-4 border-l-amber-500">
                <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">Final Verification</p>
                <p className="text-xs sm:text-sm text-foreground">Voltage and polarity confirmation using multimeter before energisation</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-amber-100 dark:bg-amber-900/40 rounded border-l-4 border-l-amber-500">
              <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">Professional Insight</p>
              <p className="text-xs sm:text-sm text-foreground">
                This systematic approach demonstrates how different instruments serve specific purposes in electrical verification. The sequence ensures safety, compliance, and proper circuit operation before handover to the client.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-l-emerald-400 pl-4">
              <p className="font-medium text-foreground mb-1">Q: Can a multimeter test insulation resistance?</p>
              <p className="text-base text-muted-foreground">A: No. A dedicated insulation resistance tester must be used as multimeters cannot apply the high voltages required.</p>
            </div>
            <div className="border-l-4 border-l-emerald-400 pl-4">
              <p className="font-medium text-foreground mb-1">Q: Why do we zero a continuity tester?</p>
              <p className="text-base text-muted-foreground">A: To eliminate lead resistance and ensure accurate results by compensating for the resistance of the test leads themselves.</p>
            </div>
            <div className="border-l-4 border-l-emerald-400 pl-4">
              <p className="font-medium text-foreground mb-1">Q: What's the difference between a continuity tester and a multimeter?</p>
              <p className="text-base text-muted-foreground">A: A continuity tester is specialised for checking unbroken circuits, while a multimeter has broader applications including voltage, resistance, and current measurements.</p>
            </div>
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-8 p-6 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/30">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Pocket Guide – Test Instruments</h2>
          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <span className="text-green-500 font-bold">✅</span>
              <span className="text-base text-foreground">Multimeter = Voltage, current, resistance.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500 font-bold">✅</span>
              <span className="text-base text-foreground">IR Tester = Insulation resistance (MΩ).</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500 font-bold">✅</span>
              <span className="text-base text-foreground">Continuity Tester = Unbroken circuits, bonding, and earthing.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500 font-bold">✅</span>
              <span className="text-base text-foreground">Always check calibration and compliance before use.</span>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6">Recap</h2>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="text-center p-4 rounded-lg bg-emerald-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">
              <Zap className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <p className="font-medium text-blue-700 dark:text-emerald-400 mb-1">Multimeter Versatility</p>
              <p className="text-xs text-foreground">Voltage, current, resistance</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700">
              <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="font-medium text-purple-700 dark:text-emerald-400 mb-1">IR Testing</p>
              <p className="text-xs text-foreground">Insulation quality assessment</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700">
              <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium text-green-700 dark:text-green-300 mb-1">Continuity</p>
              <p className="text-xs text-foreground">Circuit path verification</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700">
              <AlertTriangle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="font-medium text-orange-700 dark:text-emerald-400 mb-1">Safety Standards</p>
              <p className="text-xs text-foreground">GS38 compliance essential</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700">
              <Target className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <p className="font-medium text-indigo-700 dark:text-indigo-300 mb-1">Correct Selection</p>
              <p className="text-xs text-foreground">Right tool for the job</p>
            </div>
          </div>
          <p className="text-base text-foreground mt-6">
            Multimeters measure voltage, current, and resistance. Insulation Resistance Testers measure insulation quality using high DC voltage. Continuity Testers confirm unbroken paths in circuits. Correct tool selection ensures accuracy, safety, and compliance.
          </p>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <Quiz questions={quizQuestions} title="Section 6.3.1 Knowledge Check" />
        </Card>

        {/* Bottom Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-8 border-t border-border/20">
          <Button variant="outline" className="text-muted-foreground hover:text-foreground w-full sm:w-auto" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button variant="outline" className="text-muted-foreground hover:text-foreground w-full sm:w-auto" asChild>
            <Link to="../3-2">
              Next: Subsection 2
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section3_1;