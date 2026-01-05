import { ArrowLeft, Search, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Multimeters: Safe Use and Core Functions – Digital Testing Equipment (Level 2 Module 2 Section 1.5)";
const DESCRIPTION = "Master multimeter operation for safe electrical measurements. Learn voltage, current, resistance testing, AC/DC differences, and True RMS capabilities per BS 7671.";

const quizQuestions = [
  {
    id: 1,
    question: "Which input jacks should you use to measure 150mA current?",
    options: [
      "COM and VΩ jacks",
      "COM and mA jacks", 
      "COM and A jacks",
      "VΩ and A jacks"
    ],
    correctAnswer: 1,
    explanation: "For currents up to 200mA or 400mA (depending on meter), use the COM and mA jacks. The A jack is for higher currents and has different fuse protection."
  },
  {
    id: 2,
    question: "What does the symbol V~ on a multimeter represent?",
    options: [
      "DC voltage",
      "AC voltage",
      "Variable voltage",
      "High voltage"
    ],
    correctAnswer: 1,
    explanation: "V~ represents AC voltage measurement. The wavy line (~) is the universal symbol for alternating current, whilst V⎓ represents DC voltage."
  },
  {
    id: 3,
    question: "Before measuring resistance, you must:",
    options: [
      "Set the meter to the highest range",
      "Isolate and de-energise the circuit",
      "Use the A jack instead of VΩ",
      "Switch to AC mode"
    ],
    correctAnswer: 1,
    explanation: "Always isolate and de-energise the circuit before resistance measurement. Live resistance testing can damage the meter and give false readings."
  },
  {
    id: 4,
    question: "What will happen if you connect a multimeter set to 'A' (current) mode across a 230V supply?",
    options: [
      "You'll get an accurate current reading",
      "The display will show 'OL' (overload)", 
      "The meter's fuse will blow instantly",
      "Nothing will happen"
    ],
    correctAnswer: 2,
    explanation: "Connecting in current mode across a voltage source creates a short circuit through the meter's low-resistance current shunt, blowing the internal fuse immediately."
  },
  {
    id: 5,
    question: "When would you need a True RMS multimeter instead of an average-responding meter?",
    options: [
      "Only for DC measurements",
      "For all AC measurements",
      "When measuring non-sinusoidal waveforms (like from inverters)",
      "When measuring very low voltages"
    ],
    correctAnswer: 2,
    explanation: "True RMS meters are essential for accurate measurement of non-sinusoidal waveforms, common with electronic loads, LED drivers, and inverters."
  },
  {
    id: 6,
    question: "What CAT rating should your multimeter have for work on UK domestic distribution boards?",
    options: [
      "CAT I",
      "CAT II", 
      "CAT III",
      "CAT IV"
    ],
    correctAnswer: 2,
    explanation: "CAT III rating is required for fixed installation work including distribution boards. CAT III 600V or CAT III 1000V provides appropriate safety margins."
  },
  {
    id: 7,
    question: "Your multimeter's continuity function beeps when the resistance is:",
    options: [
      "Exactly zero ohms",
      "Below about 50Ω (depending on meter)",
      "Above 1kΩ",
      "In the megohm range"
    ],
    correctAnswer: 1,
    explanation: "Most multimeters beep for continuity when resistance is below 20-50Ω, indicating a good connection. The exact threshold varies by manufacturer."
  },
  {
    id: 8,
    question: "What symptom indicates your multimeter's current measurement fuse has blown?",
    options: [
      "Display shows 'Err'",
      "Current readings are always zero or 'OL'",
      "Voltage measurements don't work",
      "The meter won't turn on"
    ],
    correctAnswer: 1,
    explanation: "A blown current fuse will cause current measurements to read zero or 'OL' (overload). Voltage and resistance functions will work normally."
  },
  {
    id: 9,
    question: "Why must current measurements be made in series with the circuit?",
    options: [
      "To protect the multimeter",
      "Because all current in a series circuit is the same",
      "To avoid damaging the component being tested",
      "It's just the convention"
    ],
    correctAnswer: 1,
    explanation: "Current is the same throughout a series circuit. To measure the current flowing through a component, the meter must be inserted in series so all current flows through the meter's shunt."
  },
  {
    id: 10,
    question: "When might you choose a clamp meter over a multimeter for current measurement?",
    options: [
      "For very low currents (microamps)",
      "For high currents without breaking the circuit",
      "For DC current only",
      "When you need very precise readings"
    ],
    correctAnswer: 1,
    explanation: "Clamp meters measure current without breaking the circuit, making them ideal for high currents and live testing. However, they're less accurate for small currents."
  }
];

const quickCheckQuestions = [
  {
    id: "multimeter-jacks",
    question: "Which jacks would you use to measure 230V AC across a socket outlet?",
    options: [
      "COM and mA jacks",
      "COM and VΩ jacks",
      "COM and A jacks", 
      "VΩ and A jacks"
    ],
    correctIndex: 1,
    explanation: "For voltage measurements, always use COM (common/negative) and VΩ (volts/ohms/positive) jacks. Current jacks are only for current measurement."
  },
  {
    id: "current-measurement",
    question: "You need to measure 150mA load current. Which jack should the red lead connect to?",
    options: [
      "VΩ jack",
      "mA jack",
      "A jack",
      "COM jack"
    ],
    correctIndex: 1,
    explanation: "For 150mA (0.15A), use the mA jack which typically handles up to 200-400mA. The A jack is for higher currents above this range."
  }
];

const faqs = [
  {
    question: "My multimeter current readings are always zero - what's wrong?",
    answer: "Most likely the internal current fuse has blown. This commonly happens when accidentally connecting in current mode across a voltage source. Check and replace the fuse (usually accessible via a compartment). Always verify meter settings before connecting."
  },
  {
    question: "Should I use auto-ranging or select ranges manually?",
    answer: "Auto-ranging is convenient and reduces errors, but manual ranging gives you more control and faster response. For repetitive measurements or when you know the expected range, manual selection is often quicker and more precise."
  },
  {
    question: "When do I need True RMS instead of average-responding measurement?",
    answer: "True RMS is essential when measuring non-sinusoidal waveforms - common with LED drivers, electronic ballasts, variable speed drives, and inverters. For pure sinusoidal AC (traditional transformers, motors), average-responding meters are adequate."
  },
  {
    question: "How do I test if a circuit is dead before starting work?",
    answer: "Use a voltmeter or voltage indicator to test between all conductors and between each conductor and earth. Test your instrument on a known live source before and after testing to prove it's working correctly. This is fundamental safe isolation procedure."
  },
  {
    question: "Why can't I measure resistance on a live circuit?",
    answer: "Resistance measurement works by passing a small test current through the component. Any external voltage will interfere with this measurement, giving false readings. Additionally, the meter's resistance function can be damaged by external voltages."
  },
  {
    question: "What's the difference between clamp meters and multimeters for current measurement?",
    answer: "Clamp meters measure current without breaking the circuit (using magnetic induction) - safer and quicker for high currents. Multimeters are more accurate for smaller currents but require series insertion. Many situations benefit from having both available."
  },
  {
    question: "What safety rating should my multimeter leads have?",
    answer: "Test leads should match or exceed your working voltage and have appropriate CAT rating. For UK domestic work, CAT III 600V minimum. Look for double-insulated leads with finger guards and proper probe tips. Replace damaged leads immediately."
  },
  {
    question: "Why does my continuity tester beep on some connections but not others?",
    answer: "Continuity testers typically beep below 20-50Ω resistance (varies by meter). Good connections (cables, closed switches) will beep. High resistance connections, corroded joints, or open circuits won't beep - this helps identify poor connections that might cause problems."
  }
];

const Module2Section1_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Search className="h-8 w-8 text-emerald-400" />
            <div>
              <span className="inline-block bg-emerald-500 text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 2.1.5
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Multimeters: Safe Use and Core Functions
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mt-2">
                Master digital multimeter operation for safe electrical measurements and fault diagnosis
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Multimeter:</strong> Measures voltage, current, resistance in one device.</li>
                <li><strong>Digital vs Analogue:</strong> Digital displays are easier to read accurately.</li>
                <li><strong>Input Jacks:</strong> COM, VΩ, mA, A - use correctly to avoid damage.</li>
                <li><strong>AC vs DC:</strong> Wrong setting gives wrong readings.</li>
                <li><strong>Safety First:</strong> Check CAT rating, isolate before resistance tests.</li>
                <li><strong>Professional Tool:</strong> Quality meter lasts entire career.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Every electrical job needs measurement - installation, testing, fault-finding.</li>
                <li><strong>Use:</strong> Voltage testing before work, continuity checks, current measurement, component testing.</li>
                <li><strong>Apply:</strong> Safe isolation verification, BS 7671 testing, fault diagnosis, proving circuits dead.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <p className="text-muted-foreground mb-4">By the end of this section, you'll be able to:</p>
          <ul className="space-y-3 text-foreground">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Distinguish between digital and analogue multimeters and their applications</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Select correct input jacks and understand fusing protection for different measurements</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Differentiate between AC and DC measurements and choose appropriate ranges</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Follow best practice for resistance and continuity testing including circuit isolation</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Implement safe workflow: isolate, prove dead, test, work, test, energise</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Identify appropriate CAT ratings and avoid common measurement mistakes</span>
            </li>
          </ul>
        </Card>

        {/* Section 1: Multimeter Types & Features */}
        <div className="mb-8">
          <div className="border-l-4 border-emerald-500 bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
              Multimeter Types & Features
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                Understanding different multimeter types helps you choose the right tool for electrical work. 
                Modern digital meters offer advantages over older analogue types for most applications.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Digital Multimeters (DMM)</h3>
                  <div className="bg-card border border-border/30 p-4 rounded-lg">
                    <ul className="text-blue-200 space-y-1 text-sm">
                      <li>• <strong>LCD Display:</strong> Clear numerical readings</li>
                      <li>• <strong>High Accuracy:</strong> Typically 0.1% to 0.5%</li>
                      <li>• <strong>Auto-ranging:</strong> Automatically selects best scale</li>
                      <li>• <strong>Overload Protection:</strong> Built-in fuses and circuits</li>
                      <li>• <strong>Multiple Functions:</strong> Min/max, hold, relative</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Analogue Multimeters</h3>
                  <div className="bg-card border border-border/30 p-4 rounded-lg">
                    <ul className="text-orange-200 space-y-1 text-sm">
                      <li>• <strong>Moving Coil Display:</strong> Needle and scale</li>
                      <li>• <strong>Good for Trends:</strong> Shows changing values clearly</li>
                      <li>• <strong>No Battery:</strong> For basic voltage/current (not resistance)</li>
                      <li>• <strong>Less Robust:</strong> Mechanical movement can be damaged</li>
                      <li>• <strong>Reading Accuracy:</strong> Limited by scale resolution</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Key Features to Consider</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card border border-border/30 p-4 rounded-lg">
                    <h4 className="text-emerald-400 font-medium mb-2">Display & Resolution</h4>
                    <ul className="text-purple-200 space-y-1 text-sm">
                      <li>• <strong>3½ digit:</strong> 1999 count (basic)</li>
                      <li>• <strong>4½ digit:</strong> 19,999 count (precise)</li>
                      <li>• <strong>True RMS:</strong> Accurate AC measurement</li>
                    </ul>
                  </div>
                  <div className="bg-card border border-green-400/30 p-4 rounded-lg">
                    <h4 className="text-green-300 font-medium mb-2">Safety Ratings</h4>
                    <ul className="text-green-200 space-y-1 text-sm">
                      <li>• <strong>CAT II:</strong> Appliances, portable equipment</li>
                      <li>• <strong>CAT III:</strong> Fixed installations (preferred)</li>
                      <li>• <strong>CAT IV:</strong> Service entrance, utility level</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Controls & Connections */}
        <div className="mb-8">
          <div className="border-l-4 border-emerald-500 bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
              Controls & Connections
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                Correct use of multimeter controls and input jacks is essential for accurate readings 
                and meter protection. Understanding the layout prevents costly mistakes.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Main Controls</h3>
                  <div className="bg-background/20 p-4 rounded-lg space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Digital Display:</strong> Shows measurement value and units
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Rotary Switch:</strong> Selects function (V, A, Ω) and range
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>Function Buttons:</strong> Hold, min/max, relative, range
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Input Jacks</h3>
                  <div className="bg-background/20 p-4 rounded-lg space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>COM (Common):</strong> Black lead always goes here
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>VΩ:</strong> Red lead for voltage and resistance
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>mA:</strong> Red lead for currents up to 200-400mA
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                      <div>
                        <strong>A:</strong> Red lead for higher currents (typically 10A max)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-emerald-400">Pro Tip: Pre-use Checks</h3>
                <ul className="text-orange-200 space-y-1 text-sm">
                  <li>• Check test lead condition - cracked insulation is dangerous</li>
                  <li>• Verify lead ratings match your working voltage</li>
                  <li>• Test continuity function on a known short circuit</li>
                  <li>• Check battery level - low battery affects accuracy</li>
                  <li>• Ensure correct jack selection before connecting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Measuring Voltage */}
        <div className="mb-8">
          <div className="border-l-4 border-purple-500 bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
              Measuring Voltage
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                Voltage measurement is the most common multimeter function. Always connect in parallel 
                (across) the component or circuit you're testing.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Step-by-Step Voltage Measurement</h3>
                <div className="bg-background/20 p-4 rounded-lg">
                  <ol className="space-y-2 text-sm">
                    <li><strong>1.</strong> Connect black lead to COM jack</li>
                    <li><strong>2.</strong> Connect red lead to VΩ jack</li>
                    <li><strong>3.</strong> Select AC voltage (V~) or DC voltage (V⎓)</li>
                    <li><strong>4.</strong> Choose appropriate range (or use auto-range)</li>
                    <li><strong>5.</strong> Connect probes across (parallel to) the circuit</li>
                    <li><strong>6.</strong> Read display value and note units</li>
                  </ol>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Expected Values</h3>
                  <div className="bg-card border border-border/30 p-4 rounded-lg">
                    <ul className="text-blue-200 space-y-1 text-sm">
                      <li>• <strong>UK Mains:</strong> 230V AC (±10%)</li>
                      <li>• <strong>Car Battery:</strong> 12V DC (charged: 12.6V)</li>
                      <li>• <strong>Three-phase:</strong> 400V AC line-to-line</li>
                      <li>• <strong>Control Systems:</strong> 24V DC common</li>
                      <li>• <strong>Electronics:</strong> 5V, 3.3V DC supplies</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Common Mistakes</h3>
                  <div className="bg-card border border-border/30 p-4 rounded-lg">
                    <ul className="text-red-200 space-y-1 text-sm">
                      <li>• Using DC setting on AC supply (reads low/zero)</li>
                      <li>• Wrong range selection (overload or poor resolution)</li>
                      <li>• Poor probe contact (intermittent readings)</li>
                      <li>• Measuring between wrong points</li>
                      <li>• Forgetting to check meter settings first</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 4: Resistance & Continuity */}
        <div className="mb-8">
          <div className="border-l-4 border-teal-500 bg-teal-500/10 dark:bg-teal-500/10 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
              Resistance & Continuity Testing
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                Resistance and continuity testing requires complete circuit isolation. The meter 
                applies a small test voltage, so any external voltage will give false readings.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Essential Safety Steps</h3>
                <div className="bg-card border border-border/30 p-4 rounded-lg">
                  <ol className="text-red-200 space-y-2 text-sm">
                    <li><strong>1.</strong> Isolate circuit - switch off, lock off, tag out</li>
                    <li><strong>2.</strong> Prove dead - test between all conductors and earth</li>
                    <li><strong>3.</strong> Remove parallel paths - disconnect one end if needed</li>
                    <li><strong>4.</strong> Discharge capacitors - wait for stored energy to dissipate</li>
                    <li><strong>5.</strong> Select resistance function (Ω) or continuity (♪)</li>
                    <li><strong>6.</strong> Connect probes and read result</li>
                  </ol>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Resistance Testing</h3>
                  <div className="bg-card border border-green-400/30 p-4 rounded-lg">
                    <ul className="text-green-200 space-y-1 text-sm">
                      <li>• <strong>Cable Resistance:</strong> Should be very low (mΩ range)</li>
                      <li>• <strong>Heating Elements:</strong> Calculate from P = V²/R</li>
                      <li>• <strong>Insulation:</strong> Should be {'>'}1MΩ (BS 7671)</li>
                      <li>• <strong>Earth Bonds:</strong> Typically {'<'}0.05Ω</li>
                      <li>• <strong>Component Values:</strong> Check against ratings</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Continuity Testing</h3>
                  <div className="bg-card border border-cyan-400/30 p-4 rounded-lg">
                    <ul className="text-cyan-200 space-y-1 text-sm">
                      <li>• <strong>Beep Function:</strong> Sounds below ~50Ω threshold</li>
                      <li>• <strong>Cable Testing:</strong> End-to-end continuity checks</li>
                      <li>• <strong>Switch Testing:</strong> Open/closed operation</li>
                      <li>• <strong>Fuse Testing:</strong> Quick good/blown indication</li>
                      <li>• <strong>Earth Paths:</strong> Verify protective conductor integrity</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Measuring Current */}
        <div className="mb-8">
          <div className="border-l-4 border-red-500 bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">5</span>
              Measuring Current
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                Current measurement requires series insertion - the meter becomes part of the circuit. 
                This is the most dangerous measurement as incorrect connection can create short circuits.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Current Measurement Procedure</h3>
                <div className="bg-background/20 p-4 rounded-lg">
                  <ol className="space-y-2 text-sm">
                    <li><strong>1.</strong> Estimate expected current to choose correct jack</li>
                    <li><strong>2.</strong> Black lead to COM, red lead to mA or A jack</li>
                    <li><strong>3.</strong> Select AC current (A~) or DC current (A⎓)</li>
                    <li><strong>4.</strong> Break circuit and insert meter in series</li>
                    <li><strong>5.</strong> Energise circuit and read current</li>
                    <li><strong>6.</strong> De-energise before removing meter</li>
                  </ol>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Jack Selection</h3>
                  <div className="bg-card border border-border/30 p-4 rounded-lg">
                    <ul className="text-blue-200 space-y-1 text-sm">
                      <li>• <strong>mA Jack:</strong> Up to 200-400mA (fused)</li>
                      <li>• <strong>A Jack:</strong> Higher currents to 10A (may be unfused)</li>
                      <li>• <strong>Fuse Protection:</strong> mA circuit usually has ceramic fuse</li>
                      <li>• <strong>Current Path:</strong> Through internal shunt resistor</li>
                      <li>• <strong>Overload:</strong> Blown fuse = no current readings</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">When to Use Clamp Meter</h3>
                  <div className="bg-card border border-border/30 p-4 rounded-lg">
                    <ul className="text-purple-200 space-y-1 text-sm">
                      <li>• <strong>High Currents:</strong> Above 10A safely</li>
                      <li>• <strong>Live Testing:</strong> No circuit breaking required</li>
                      <li>• <strong>Motor Currents:</strong> Start-up and running values</li>
                      <li>• <strong>Load Surveys:</strong> Quick current measurements</li>
                      <li>• <strong>Limitations:</strong> Less accurate for small currents</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 6: AC vs DC & True RMS */}
        <div className="mb-8">
          <div className="border-l-4 border-cyan-500 bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-cyan-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">6</span>
              AC vs DC & True RMS
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                Understanding AC and DC measurement modes is crucial for accurate readings. 
                True RMS capability becomes essential with modern electronic loads.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">AC Measurement (V~, A~)</h3>
                  <div className="bg-card border border-cyan-400/30 p-4 rounded-lg">
                    <ul className="text-cyan-200 space-y-1 text-sm">
                      <li>• <strong>Symbol:</strong> ~ (sine wave) for alternating</li>
                      <li>• <strong>UK Frequency:</strong> 50Hz (50 cycles per second)</li>
                      <li>• <strong>RMS Values:</strong> Effective heating value</li>
                      <li>• <strong>Applications:</strong> Mains supply, motors, transformers</li>
                      <li>• <strong>Coupling:</strong> AC-coupled input blocks DC component</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">DC Measurement (V⎓, A⎓)</h3>
                  <div className="bg-card border border-border/30 p-4 rounded-lg">
                    <ul className="text-orange-200 space-y-1 text-sm">
                      <li>• <strong>Symbol:</strong> ⎓ (straight lines) for direct</li>
                      <li>• <strong>Constant Value:</strong> Doesn't change polarity</li>
                      <li>• <strong>Polarity Matters:</strong> Shows + or - reading</li>
                      <li>• <strong>Applications:</strong> Batteries, electronics, control systems</li>
                      <li>• <strong>Zero AC:</strong> Will read zero on AC supply</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">True RMS vs Average-Responding</h3>
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                  <div className="text-yellow-200 space-y-2 text-sm">
                    <p><strong>Average-Responding:</strong> Assumes perfect sine wave, accurate for traditional loads</p>
                    <p><strong>True RMS:</strong> Calculates actual heating effect, essential for:</p>
                    <ul className="ml-4 space-y-1">
                      <li>• LED drivers and electronic ballasts</li>
                      <li>• Variable speed drives and inverters</li>
                      <li>• Switch-mode power supplies</li>
                      <li>• Any non-sinusoidal waveform</li>
                    </ul>
                    <p><strong>Result:</strong> Average-responding meters can under-read by 40%+ on electronic loads</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: Safety and Common Mistakes */}
        <div className="mb-8">
          <div className="border-l-4 border-red-600 bg-red-600/10 dark:bg-red-600/10 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">7</span>
              Safety and Common Mistakes
            </h2>
            <div className="space-y-4 text-foreground">
              <div className="bg-red-500/20 border border-red-400/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Critical Safety Mistakes
                </h3>
                <ul className="text-red-200 space-y-2 text-sm">
                  <li>• <strong>Current Mode Across Voltage:</strong> Blows fuse instantly, can cause arc flash</li>
                  <li>• <strong>Wrong CAT Rating:</strong> Meter not rated for installation voltage</li>
                  <li>• <strong>Damaged Test Leads:</strong> Cracked insulation = shock risk</li>
                  <li>• <strong>Live Resistance Testing:</strong> Damages meter, gives false readings</li>
                  <li>• <strong>Wrong AC/DC Setting:</strong> Dangerous assumption about circuit state</li>
                  <li>• <strong>No Proving Unit Check:</strong> Don't assume dead circuit is safe</li>
                </ul>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Before You Measure</h3>
                  <div className="bg-card border border-green-400/30 p-4 rounded-lg">
                    <ul className="text-green-200 space-y-1 text-sm">
                      <li>✓ Check meter CAT rating matches work</li>
                      <li>✓ Inspect test leads for damage</li>
                      <li>✓ Verify meter function on known source</li>
                      <li>✓ Select correct function and range</li>
                      <li>✓ Plan safe probe placement</li>
                      <li>✓ Consider arc flash risks</li>
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Common Reading Errors</h3>
                  <div className="bg-card border border-border/30 p-4 rounded-lg">
                    <ul className="text-blue-200 space-y-1 text-sm">
                      <li>• Ghost voltages on high-impedance inputs</li>
                      <li>• Loading effect on high-resistance circuits</li>
                      <li>• Temperature effects on accuracy</li>
                      <li>• Low battery causing drift</li>
                      <li>• EMI interference in noisy environments</li>
                      <li>• Contact resistance affecting readings</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 8: Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-emerald-400" />
            Multimeter Pocket Guide
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Jack Selection Rules</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• <strong>Voltage/Resistance:</strong> COM + VΩ jacks</li>
                  <li>• <strong>Current ≤400mA:</strong> COM + mA jacks</li>
                  <li>• <strong>Current {'>'}400mA:</strong> COM + A jacks</li>
                  <li>• <strong>Always black to COM</strong></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Symbol Quick Reference</h3>
                <ul className="space-y-1 text-muted-foreground font-mono">
                  <li>• <strong>V~:</strong> AC voltage measurement</li>
                  <li>• <strong>V⎓:</strong> DC voltage measurement</li>
                  <li>• <strong>A~:</strong> AC current measurement</li>
                  <li>• <strong>A⎓:</strong> DC current measurement</li>
                  <li>• <strong>Ω:</strong> Resistance measurement</li>
                  <li>• <strong>♪)))) :</strong> Continuity with beep</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Before You Measure Checklist</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>□ Check meter CAT rating</li>
                  <li>□ Inspect test leads</li>
                  <li>□ Select correct function</li>
                  <li>□ Choose appropriate range</li>
                  <li>□ Verify on known source</li>
                  <li>□ Consider safety first</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-2">Typical UK Values</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• <strong>Domestic supply:</strong> 230V AC ±10%</li>
                  <li>• <strong>Three-phase:</strong> 400V AC line-to-line</li>
                  <li>• <strong>RCD rating:</strong> 30mA typical</li>
                  <li>• <strong>Socket circuit:</strong> 32A max</li>
                  <li>• <strong>Earth resistance:</strong> {'<'}0.05Ω bonds</li>
                  <li>• <strong>Insulation:</strong> {'>'}1MΩ @ 500V</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border/20 pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Quiz Section */}
        <div className="mt-12">
          <Quiz 
            title="Multimeter Safe Use and Functions Quiz"
            questions={quizQuestions}
          />
        </div>
      </div>
    </div>
  );
};

export default Module2Section1_5;