import React from "react";
import { ArrowLeft, Lightbulb, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "AC vs DC Differences - Level 2 Module 2 Section 4.1";
const DESCRIPTION = "Practical differences between AC and DC for UK electricians: waveforms, polarity, measurement, protection and testing to BS 7671.";

const quickCheckQuestions = [
  {
    id: "ac-dc-direction",
    question: "What is the fundamental difference between AC and DC?",
    options: ["AC has higher voltage", "AC alternates direction; DC flows one way", "AC is safer", "AC has no frequency"],
    correctIndex: 1,
    explanation: "AC reverses direction periodically (50 Hz in UK); DC maintains constant direction."
  },
  {
    id: "rcd-types", 
    question: "Which RCD type is needed where smooth DC components may be present?",
    options: ["Type AC", "Type A", "Type F", "Type B"],
    correctIndex: 3,
    explanation: "Type B RCDs detect smooth DC residual currents per BS 7671 531.3."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In simple terms, what is the key difference between AC and DC?",
    options: [
      "AC flows only one way; DC alternates direction",
      "AC alternates direction; DC flows in one direction",
      "AC has no voltage; DC has voltage",
      "AC is safer than DC in all cases"
    ],
    correctAnswer: 1,
    explanation: "AC reverses direction periodically (at 50 Hz in the UK); DC maintains a constant direction."
  },
  {
    id: 2,
    question: "What is the UK mains frequency?",
    options: ["60 Hz", "50 Hz", "400 Hz", "25 Hz"],
    correctAnswer: 1,
    explanation: "BS EN standards and UK supply specify 50 Hz for public mains."
  },
  {
    id: 3,
    question: "230 V AC (UK nominal) is an RMS value. Approximately what is the peak voltage?",
    options: ["230 V", "253 V", "325 V", "400 V"],
    correctAnswer: 2,
    explanation: "Vp ≈ Vrms × √2 ≈ 230 × 1.414 ≈ 325 V."
  },
  {
    id: 4,
    question: "Which RCD type is most appropriate where smooth DC components may be present?",
    options: ["Type AC", "Type A", "Type F", "Type B"],
    correctAnswer: 3,
    explanation: "Type B RCDs detect smooth DC residual currents; selection must follow BS 7671 (e.g. 531.3)."
  },
  {
    id: 5,
    question: "For a sine wave, Vrms equals which expression (given peak voltage Vp)?",
    options: ["Vp × 2", "Vp / √2", "Vp / 2", "Vp × √2"],
    correctAnswer: 1,
    explanation: "For a pure sinusoid, Vrms = Vp / √2."
  },
  {
    id: 6,
    question: "Why is polarity critical in DC circuits?",
    options: [
      "Because DC has frequency",
      "Because many DC loads (LEDs, electronics) are polarity sensitive",
      "Because DC always has higher voltage",
      "Because DC cannot be switched"
    ],
    correctAnswer: 1,
    explanation: "Reverse DC polarity can damage components or prevent operation."
  },
  {
    id: 7,
    question: "A true-RMS meter is preferred for which measurement?",
    options: [
      "Only steady DC voltage",
      "Non-sinusoidal AC waveforms",
      "Resistance only",
      "Frequency only"
    ],
    correctAnswer: 1,
    explanation: "True-RMS metering yields correct RMS on distorted or non-sinusoidal waveforms."
  },
  {
    id: 8,
    question: "Which statement best describes AC polarity?",
    options: [
      "AC polarity is fixed and must be observed like DC",
      "AC polarity alternates; equipment is marked L/N for safety and function",
      "AC has no polarity and no safety conventions",
      "AC polarity is identical to DC polarity"
    ],
    correctAnswer: 1,
    explanation: "AC alternates but live/neutral conventions are essential for safe design and testing."
  },
  {
    id: 9,
    question: "What UK nominal voltage is used for single-phase AC supplies?",
    options: ["110 V", "400 V", "230 V", "240 V strictly"],
    correctAnswer: 2,
    explanation: "230 V AC nominal (with permitted tolerance)."
  },
  {
    id: 10,
    question: "Which device is most likely damaged by reverse DC polarity?",
    options: ["Resistive heater", "Incandescent lamp", "LED strip", "Induction motor"],
    correctAnswer: 2,
    explanation: "LEDs and many electronic loads are polarity-sensitive."
  }
];

const faqs = [
  {
    question: "Why does 230V sometimes measure closer to 240V?",
    answer: "UK supply tolerance allows ±10% of nominal voltage. Historical 240V supplies are being harmonised to 230V across Europe, but actual voltages may vary within permitted limits."
  },
  {
    question: "Do I need Type A RCD everywhere now?",
    answer: "Not everywhere - it depends on the loads. Type A handles pulsating DC (from many modern appliances), but check manufacturer instructions and BS 7671 requirements for specific installations."
  },
  {
    question: "When do I need a true-RMS meter?",
    answer: "For measuring non-sinusoidal waveforms (variable speed drives, SMPS outputs, inverters). Standard meters may give incorrect readings on distorted waveforms."
  },
  {
    question: "Can AC devices run on DC?",
    answer: "Generally no. AC motors won't start on DC, transformers won't work, and many electronic devices expect AC input. Always check equipment specifications and manufacturer guidance."
  },
  {
    question: "Why does reversing DC polarity break LEDs?",
    answer: "LEDs are diodes - they only conduct in one direction. Reverse polarity blocks current flow (LED won't light) or can cause damage if the reverse voltage exceeds the LED's limits."
  },
  {
    question: "What does the ~ or = symbol mean on nameplates?",
    answer: "~ indicates AC (alternating current), = indicates DC (direct current). These symbols help identify the type of supply the equipment requires or produces."
  }
];

const Module2Section4_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2.4
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="h-8 w-8 text-emerald-400" />
            <div>
              <span className="inline-block bg-emerald-500 text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 2.4.1
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                AC vs DC Differences
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mt-2">
                Practical differences for UK electricians: waveforms, polarity, measurement, protection and testing
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
                <li><strong>AC alternates</strong> at 50 Hz in the UK; DC is one-directional (0 Hz).</li>
                <li><strong>230 V mains</strong> is an RMS value; Vp ≈ Vrms × √2 ≈ 325 V.</li>
                <li><strong>DC polarity</strong> matters; AC uses L/N convention for safety and function.</li>
                <li><strong>RCD selection</strong> depends on waveform (Type AC/A/F/B per BS 7671 531.3).</li>
                <li><strong>Use true-RMS</strong> meters for non-sinusoidal waveforms.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>AC:</strong> Distribution, mains sockets, induction motors.</li>
                <li><strong>DC:</strong> Control panels, LED drivers/tapes, PV/DC rails, EV charger electronics.</li>
                <li><strong>Testing:</strong> Continuity/insulation similar; DC requires polarity and stored energy checks.</li>
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
              <span>Explain AC vs DC in plain terms and identify each on-site</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Relate RMS, peak and frequency to measurements and nameplate ratings</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Recognise polarity sensitivity in DC circuits and AC L/N conventions</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Select appropriate RCD type where DC components may be present</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Apply safe isolation and testing procedures to both AC and DC</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Reference relevant parts of BS 7671 in design and selection</span>
            </li>
          </ul>
        </Card>

        {/* Section 1: Fundamentals */}
        <div className="mb-8">
          <div className="border-l-4 border-emerald-500 bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
              Fundamentals - Direction, Waveform and Frequency
            </h2>
            <div className="space-y-6 text-foreground">
              <p>
                Understanding the fundamental differences between AC and DC is essential for safe electrical work. 
                The key distinction lies in current direction and how this affects electrical behaviour, measurement, and safety.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">Current Direction and Flow</h3>
                  <div className="space-y-3">
                    <div className="bg-card border border-border/30 p-4 rounded-lg">
                      <p className="text-blue-200 text-sm mb-2"><strong>AC (Alternating Current):</strong></p>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-blue-100">
                        <li>Changes direction 100 times per second (50 Hz in UK)</li>
                        <li>Each complete cycle takes 20 milliseconds</li>
                        <li>Current flows from L to N for half cycle, then N to L for other half</li>
                        <li>Zero current occurs twice per cycle at direction changes</li>
                        <li>Represented by sine wave (ideally) with symbols ~</li>
                      </ul>
                    </div>
                    <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
                      <p className="text-slate-200 text-sm mb-2"><strong>DC (Direct Current):</strong></p>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-slate-100">
                        <li>Flows in one direction only (0 Hz - no frequency)</li>
                        <li>Steady voltage level (though may have ripple from rectification)</li>
                        <li>Positive terminal always positive, negative always negative</li>
                        <li>Current magnitude may vary but direction remains constant</li>
                        <li>Represented by flat line with symbols = or +/-</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">RMS, Peak and Average Values</h3>
                  <div className="space-y-3">
                    <p className="text-sm">
                      Understanding these measurements is crucial for proper electrical calculations and safety assessments:
                    </p>
                    <div className="bg-card border border-border/30 p-4 rounded-lg">
                      <ul className="list-disc pl-6 space-y-2 text-sm text-blue-100">
                        <li><strong>RMS (Root Mean Square):</strong> The effective value that produces same heating as equivalent DC</li>
                        <li><strong>Peak Value:</strong> Maximum instantaneous value reached; for sine wave Vp = Vrms × √2</li>
                        <li><strong>Peak-to-Peak:</strong> Total voltage swing from positive to negative peak</li>
                        <li><strong>Average Value:</strong> Mathematical mean; for sine wave = 0.637 × Vp</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">UK Electrical Standards</h3>
                  <div className="space-y-3">
                    <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
                      <ul className="list-disc pl-6 space-y-2 text-sm text-slate-100">
                        <li><strong>Frequency:</strong> 50 Hz ±1% as per BS EN 50160</li>
                        <li><strong>Single-phase:</strong> 230V RMS ±10% (207V to 253V)</li>
                        <li><strong>Three-phase:</strong> 400V RMS between lines</li>
                        <li><strong>Historical note:</strong> Previously 240V/415V, harmonised to European standards</li>
                        <li><strong>Actual voltages:</strong> May still measure closer to 240V due to network headroom</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                  <p className="text-yellow-300">
                    <strong>Worked Example:</strong> UK mains 230V RMS calculation:<br/>
                    • Peak voltage: Vp = 230V × √2 = 230V × 1.414 = 325V<br/>
                    • This explains why insulation tests use 500V+ for low voltage circuits<br/>
                    • Peak-to-peak: 325V × 2 = 650V total swing<br/>
                    • Average value: 325V × 0.637 = 207V (mathematical average of rectified sine)
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">Practical Implications</h3>
                  <div className="space-y-2">
                    <div className="bg-card border border-border/30 p-3 rounded">
                      <p className="text-sm text-blue-100">
                        <strong>Meter readings:</strong> Most AC meters show RMS values. True-RMS essential for distorted waveforms.
                      </p>
                    </div>
                    <div className="bg-card border border-border/30 p-3 rounded">
                      <p className="text-sm text-blue-100">
                        <strong>Component ratings:</strong> AC components rated for RMS values. DC components rated for continuous values.
                      </p>
                    </div>
                    <div className="bg-card border border-border/30 p-3 rounded">
                      <p className="text-sm text-blue-100">
                        <strong>Power calculations:</strong> P = Vrms × Irms × cos φ (AC) vs P = V × I (DC, resistive)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Practical Identification */}
        <div className="mb-8">
          <div className="border-l-4 border-emerald-500 bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
              Practical Identification and Measurement
            </h2>
            <div className="space-y-6 text-foreground">
              <p>
                Rapid, accurate identification of AC vs DC is essential for safety and selecting appropriate test methods. 
                Multiple indicators and measurement techniques ensure correct identification.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">Visual Identification Methods</h3>
                  <div className="space-y-3">
                    <div className="bg-card border border-emerald-500/30 p-4 rounded-lg">
                      <p className="text-emerald-200 text-sm mb-2"><strong>Nameplate Information:</strong></p>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-emerald-100">
                        <li><strong>~ symbol:</strong> Indicates AC supply or output</li>
                        <li><strong>= symbol:</strong> Indicates DC supply or output</li>
                        <li><strong>Frequency rating:</strong> "50Hz" confirms AC; "0Hz" or no frequency = DC</li>
                        <li><strong>Voltage notation:</strong> "230V AC" or "12V DC" explicitly states type</li>
                        <li><strong>Input/output labels:</strong> May show both if conversion equipment</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
                      <p className="text-slate-200 text-sm mb-2"><strong>Connector and Cable Clues:</strong></p>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-slate-100">
                        <li><strong>AC connectors:</strong> Standard BS 1363 plugs, IEC C13/C14, CEE form</li>
                        <li><strong>DC connectors:</strong> Often polarised (keyed), barrel jacks, terminal blocks</li>
                        <li><strong>Cable colours:</strong> AC uses brown/blue/green-yellow; DC often red/black</li>
                        <li><strong>Cable marking:</strong> May indicate voltage type and rating</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">Measurement Techniques</h3>
                  <div className="space-y-3">
                    <div className="bg-card border border-emerald-500/30 p-4 rounded-lg">
                      <p className="text-emerald-200 text-sm mb-2"><strong>Multimeter Testing:</strong></p>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-emerald-100">
                        <li><strong>AC mode (V~):</strong> Will read near zero on pure DC sources</li>
                        <li><strong>DC mode (V=):</strong> Will read near zero on pure AC sources</li>
                        <li><strong>Mixed signals:</strong> Both modes may show readings if DC has ripple</li>
                        <li><strong>Auto-ranging:</strong> Modern meters may automatically detect AC/DC</li>
                        <li><strong>Display stability:</strong> DC readings steady; AC may fluctuate slightly</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
                      <p className="text-slate-200 text-sm mb-2"><strong>Oscilloscope Analysis:</strong></p>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-slate-100">
                        <li><strong>AC waveform:</strong> Sinusoidal, square, or complex periodic pattern</li>
                        <li><strong>DC waveform:</strong> Straight horizontal line (pure DC) or line with ripple</li>
                        <li><strong>Frequency measurement:</strong> AC shows clear frequency; DC shows 0 Hz</li>
                        <li><strong>Distortion analysis:</strong> Reveals harmonics in non-sinusoidal AC</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">Common Installation Locations</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-card border border-emerald-500/30 p-3 rounded">
                      <p className="text-emerald-200 font-medium mb-2">Typical AC Locations:</p>
                      <ul className="list-disc pl-4 space-y-1 text-xs text-emerald-100">
                        <li>Distribution boards and consumer units</li>
                        <li>Socket outlets and lighting circuits</li>
                        <li>Motor control centres</li>
                        <li>Transformer secondary connections</li>
                        <li>Generator outputs</li>
                      </ul>
                    </div>
                    <div className="bg-slate-700/30 border border-slate-600/30 p-3 rounded">
                      <p className="text-slate-200 font-medium mb-2">Typical DC Locations:</p>
                      <ul className="list-disc pl-4 space-y-1 text-xs text-slate-100">
                        <li>LED driver outputs and strips</li>
                        <li>Control panel power supplies</li>
                        <li>PV array and battery connections</li>
                        <li>EV charger DC sections</li>
                        <li>UPS battery compartments</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">Meter Selection and Accuracy</h3>
                  <div className="space-y-3">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                      <p className="text-yellow-300 text-sm mb-2"><strong>True-RMS vs Average-Responding Meters:</strong></p>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-yellow-200">
                        <li><strong>True-RMS:</strong> Accurate for all waveforms including distorted AC from drives/inverters</li>
                        <li><strong>Average-responding:</strong> Only accurate for pure sine waves; may read low on distorted waveforms</li>
                        <li><strong>When to use True-RMS:</strong> Variable speed drives, SMPS outputs, inverters, fluorescent ballasts</li>
                        <li><strong>Typical error:</strong> Average meters can under-read by 10-40% on square waves</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card border border-emerald-500/30 p-3 rounded">
                      <p className="text-sm text-emerald-100">
                        <strong>Safety Note:</strong> Always verify meter category rating (CAT II/III/IV) matches installation voltage levels. 
                        Use appropriate test leads and ensure meter is calibrated for accurate readings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Protection and Testing */}
        <div className="mb-8">
          <div className="border-l-4 border-teal-500 bg-teal-500/10 dark:bg-teal-500/10 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
              Protection and Testing Differences
            </h2>
            <div className="space-y-6 text-foreground">
              <p>
                AC and DC systems require different protective devices and testing approaches. Understanding these differences 
                prevents protection failures and ensures compliance with BS 7671.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-teal-300 mb-3">RCD Type Selection and Operation</h3>
                  <div className="space-y-3">
                    <p className="text-sm">
                      RCD selection is critical where DC components may be present, as incorrect types may fail to operate:
                    </p>
                    <div className="bg-teal-500/10 border border-teal-400/30 p-4 rounded-lg">
                      <ul className="list-disc pl-6 space-y-2 text-sm text-teal-100">
                        <li><strong>Type AC:</strong> Detects pure sinusoidal AC residual current only; basic protection</li>
                        <li><strong>Type A:</strong> AC + pulsating DC (from rectifiers); suitable for most modern appliances</li>
                        <li><strong>Type F:</strong> AC + pulsating DC + higher frequency components from inverters</li>
                        <li><strong>Type B:</strong> All above + smooth DC components (EV chargers, PV systems, drives)</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
                      <p className="text-slate-200 text-sm mb-2"><strong>BS 7671 Requirements (Section 531.3):</strong></p>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-slate-100">
                        <li>Type AC: Basic residential circuits with simple loads</li>
                        <li>Type A: Circuits with single-phase rectified loads</li>
                        <li>Type F: Variable speed drives, UPS systems</li>
                        <li>Type B: EV charging (722), PV installations (712), medical equipment</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-teal-300 mb-3">Earth Fault Protection Differences</h3>
                  <div className="space-y-3">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-teal-500/10 border border-teal-400/30 p-3 rounded">
                        <p className="text-teal-200 font-medium mb-2">AC Earth Fault Protection:</p>
                        <ul className="list-disc pl-4 space-y-1 text-xs text-teal-100">
                          <li>RCD detects imbalance between L and N</li>
                          <li>Zs (earth fault loop impedance) testing</li>
                          <li>Prospective fault current calculations</li>
                          <li>Standard overcurrent protection effective</li>
                        </ul>
                      </div>
                      <div className="bg-slate-700/30 border border-slate-600/30 p-3 rounded">
                        <p className="text-slate-200 font-medium mb-2">DC Earth Fault Protection:</p>
                        <ul className="list-disc pl-4 space-y-1 text-xs text-slate-100">
                          <li>May use residual current monitoring</li>
                          <li>Insulation monitoring systems (IMS)</li>
                          <li>Different fault current characteristics</li>
                          <li>Arc fault protection considerations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-teal-300 mb-3">Testing Procedures and Safety</h3>
                  <div className="space-y-4">
                    <div className="bg-teal-500/10 border border-teal-400/30 p-4 rounded-lg">
                      <p className="text-teal-200 text-sm mb-2"><strong>AC Testing Protocol:</strong></p>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-teal-100">
                        <li><strong>Safe isolation:</strong> Switch off, lock off, test for dead on all poles</li>
                        <li><strong>Insulation resistance:</strong> Standard 500V DC test between conductors and earth</li>
                        <li><strong>Continuity:</strong> Protective conductor and equipotential bonding</li>
                        <li><strong>RCD testing:</strong> ×1, ×5, and ramp testing at rated sensitivity</li>
                        <li><strong>Polarity:</strong> Verify L/N connections, especially at accessories</li>
                        <li><strong>Earth fault loop:</strong> Zs measurement for fault current verification</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
                      <p className="text-slate-200 text-sm mb-2"><strong>DC Testing Protocol:</strong></p>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-slate-100">
                        <li><strong>Safe isolation:</strong> Isolate both poles, discharge stored energy, lock off</li>
                        <li><strong>Polarity verification:</strong> Absolutely critical - use DC voltmeter</li>
                        <li><strong>Insulation resistance:</strong> DC voltage test between poles and to earth</li>
                        <li><strong>Stored energy:</strong> Wait for capacitor discharge per manufacturer instructions</li>
                        <li><strong>Arc flash risk:</strong> Higher than AC at same voltage due to non-zero crossing</li>
                        <li><strong>Isolation verification:</strong> Prove dead with appropriate DC-rated instruments</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-teal-300 mb-3">Instrument Selection</h3>
                  <div className="space-y-3">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                      <p className="text-yellow-300 text-sm mb-2"><strong>Critical Considerations:</strong></p>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-yellow-200">
                        <li><strong>Voltage category:</strong> CAT II (accessories), CAT III (distribution), CAT IV (supply)</li>
                        <li><strong>True-RMS capability:</strong> Essential for harmonic-rich environments</li>
                        <li><strong>DC measurement range:</strong> Ensure adequate for system voltages</li>
                        <li><strong>Safety ratings:</strong> Appropriate for working voltage and environment</li>
                        <li><strong>Calibration status:</strong> Valid calibration for accurate measurements</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Common Mistakes & On-site Checks */}
        <div className="mb-8">
          <div className="border-l-4 border-amber-500 bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
              Common Mistakes and On-site Safety
            </h2>
            <div className="space-y-6 text-foreground">
              <p>
                Avoiding common mistakes when working with AC and DC systems prevents equipment damage, personal injury, 
                and installation failures. Understanding these pitfalls improves both safety and efficiency.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-amber-300 mb-3">Critical Mistakes to Avoid</h3>
                  <div className="space-y-4">
                    <div className="bg-card border border-amber-400/30 p-4 rounded-lg">
                      <p className="text-amber-200 text-sm mb-2"><strong>RCD Type Selection Errors:</strong></p>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-amber-100">
                        <li><strong>Using Type AC with EV chargers:</strong> May not detect smooth DC fault currents</li>
                        <li><strong>Ignoring manufacturer guidance:</strong> Always check equipment RCD requirements</li>
                        <li><strong>Retrofitting without assessment:</strong> Existing RCDs may not suit new loads</li>
                        <li><strong>Cost-driven selection:</strong> Cheaper RCD types may cause nuisance tripping</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
                      <p className="text-slate-200 text-sm mb-2"><strong>Polarity and Connection Errors:</strong></p>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-slate-100">
                        <li><strong>DC polarity reversal:</strong> Can destroy LEDs, electronics, and polarised components</li>
                        <li><strong>AC neutral switching:</strong> Dangerous - always switch live conductor</li>
                        <li><strong>Mixed AC/DC installations:</strong> Poor labelling leads to connection errors</li>
                        <li><strong>Assuming universality:</strong> Not all equipment accepts both AC and DC</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-amber-300 mb-3">Measurement and Testing Errors</h3>
                  <div className="space-y-3">
                    <div className="bg-card border border-amber-400/30 p-4 rounded-lg">
                      <p className="text-amber-200 text-sm mb-2"><strong>Meter Selection Problems:</strong></p>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-amber-100">
                        <li><strong>Average-responding on distorted AC:</strong> Under-reads by 10-40% on non-sinusoidal waveforms</li>
                        <li><strong>Wrong voltage category:</strong> Using CAT II meter on CAT III/IV installations</li>
                        <li><strong>DC measurement on AC setting:</strong> May show zero or incorrect reading</li>
                        <li><strong>Ignoring frequency response:</strong> High-frequency components may not register</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
                      <p className="text-slate-200 text-sm mb-2"><strong>Testing Procedure Errors:</strong></p>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-slate-100">
                        <li><strong>Inadequate discharge time:</strong> DC systems may retain dangerous voltages</li>
                        <li><strong>Single-pole isolation on DC:</strong> Both positive and negative must be isolated</li>
                        <li><strong>Assuming zero energy:</strong> Capacitors can store significant charge</li>
                        <li><strong>Wrong test voltages:</strong> Using AC test methods on DC systems</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-amber-300 mb-3">Systematic Inspection Protocol</h3>
                  <div className="space-y-4">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                      <p className="text-yellow-300 text-sm mb-2"><strong>Pre-Work Safety Checklist:</strong></p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <ul className="list-decimal pl-6 space-y-1 text-sm text-yellow-200">
                          <li><strong>Identify supply type:</strong> Check nameplates for AC/DC symbols</li>
                          <li><strong>Verify voltages:</strong> Confirm supply matches equipment requirements</li>
                          <li><strong>Check protection:</strong> RCD type compatibility with loads</li>
                          <li><strong>Plan isolation:</strong> Both poles for DC, appropriate lockout</li>
                        </ul>
                        <ul className="list-decimal pl-6 space-y-1 text-sm text-yellow-200">
                          <li><strong>Select instruments:</strong> True-RMS, correct CAT rating</li>
                          <li><strong>Review procedures:</strong> Safe isolation and energy discharge</li>
                          <li><strong>Prepare PPE:</strong> Appropriate for voltage and arc flash risk</li>
                          <li><strong>Document findings:</strong> Record all measurements and observations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-amber-300 mb-3">Emergency Response and Troubleshooting</h3>
                  <div className="space-y-3">
                    <div className="bg-card border border-amber-400/30 p-4 rounded-lg">
                      <p className="text-amber-200 text-sm mb-2"><strong>Common Fault Scenarios:</strong></p>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-amber-100">
                        <li><strong>RCD nuisance tripping:</strong> Check for DC components, harmonics, or leakage currents</li>
                        <li><strong>Equipment not functioning:</strong> Verify polarity on DC supplies, L/N on AC</li>
                        <li><strong>Intermittent operation:</strong> May indicate marginal voltage or poor connections</li>
                        <li><strong>Unexpected readings:</strong> Check meter type, waveform distortion, and calibration</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
                      <p className="text-slate-200 text-sm mb-2"><strong>Quick Diagnostic Steps:</strong></p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <p className="text-slate-200 font-medium mb-1">AC Issues:</p>
                          <ul className="list-disc pl-4 space-y-1 text-xs text-slate-100">
                            <li>Check RCD type vs load requirements</li>
                            <li>Verify L/N connections and polarity</li>
                            <li>Measure with true-RMS meter</li>
                            <li>Test RCD operation and sensitivity</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-slate-200 font-medium mb-1">DC Issues:</p>
                          <ul className="list-disc pl-4 space-y-1 text-xs text-slate-100">
                            <li>Verify positive/negative polarity</li>
                            <li>Check for stored energy discharge</li>
                            <li>Measure ripple content if suspected</li>
                            <li>Confirm isolation of both poles</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-amber-300 mb-3">Best Practices Summary</h3>
                  <div className="space-y-2">
                    <div className="bg-card border border-amber-400/30 p-3 rounded">
                      <p className="text-sm text-amber-100">
                        <strong>Always verify:</strong> Supply type, polarity (DC), RCD compatibility, meter accuracy, and safe isolation procedures.
                      </p>
                    </div>
                    <div className="bg-card border border-amber-400/30 p-3 rounded">
                      <p className="text-sm text-amber-100">
                        <strong>Never assume:</strong> Equipment compatibility, universal connections, or that "it worked before" guarantees current safety.
                      </p>
                    </div>
                    <div className="bg-card border border-amber-400/30 p-3 rounded">
                      <p className="text-sm text-amber-100">
                        <strong>When uncertain:</strong> Consult manufacturer instructions, BS 7671, or seek specialist advice rather than guess.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-world Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6">Real-world Examples</h2>
          
          <div className="space-y-6">
            <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
              <h3 className="font-bold text-slate-200 mb-2">Example 1: EV Charger Protection</h3>
              <p className="text-slate-300 text-sm mb-2">Issue: EV charger with power electronics trips Type A RCD unpredictably</p>
              <div className="space-y-1 text-sm text-slate-200">
                <p><strong>Investigation:</strong> Smooth DC residual currents from rectifier/inverter stages</p>
                <p><strong>Solution:</strong> Upgrade to Type B RCD per manufacturer instructions and BS 7671</p>
                <p><strong>Verification:</strong> Check RCD test function, verify proper operation</p>
              </div>
            </div>

            <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
              <h3 className="font-bold text-slate-200 mb-2">Example 2: LED Strip Installation</h3>
              <p className="text-slate-300 text-sm mb-2">Problem: LED strip not working after installation</p>
              <div className="space-y-1 text-sm text-slate-200">
                <p><strong>Check:</strong> Verify DC supply polarity matches LED strip markings</p>
                <p><strong>Resolution:</strong> Reverse polarity connections (+/- correct orientation)</p>
                <p><strong>Testing:</strong> Confirm voltage and current within LED specifications</p>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border/20 pb-4 last:border-b-0">
                <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">AC vs DC — Pocket Guide</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
            <div className="space-y-3">
              <div className="bg-background/20 border border-border/20 p-3 rounded">
                <p className="font-medium text-foreground mb-1">Direction & Symbols</p>
                <p className="text-muted-foreground">AC (~): Alternates at 50Hz | DC (=): One direction, 0Hz</p>
              </div>
              <div className="bg-background/20 border border-border/20 p-3 rounded">
                <p className="font-medium text-foreground mb-1">Typical Uses</p>
                <p className="text-muted-foreground">AC: Mains, motors, distribution | DC: LEDs, controls, PV, EV electronics</p>
              </div>
              <div className="bg-background/20 border border-border/20 p-3 rounded">
                <p className="font-medium text-foreground mb-1">Measurement</p>
                <p className="text-muted-foreground">AC: Vrms (UK 230V, peak ≈325V) | DC: Steady voltage, check polarity</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-background/20 border border-border/20 p-3 rounded">
                <p className="font-medium text-foreground mb-1">Protection (RCD Types)</p>
                <p className="text-muted-foreground">AC/A for standard | Type B for smooth DC components</p>
              </div>
              <div className="bg-background/20 border border-border/20 p-3 rounded">
                <p className="font-medium text-foreground mb-1">Polarity</p>
                <p className="text-muted-foreground">AC: L/N conventions | DC: +/- critical for LEDs/electronics</p>
              </div>
              <div className="bg-background/20 border border-border/20 p-3 rounded">
                <p className="font-medium text-foreground mb-1">Meter Tips</p>
                <p className="text-muted-foreground">True-RMS for distorted waveforms | Verify polarity on DC</p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-emerald-500/10 rounded border border-emerald-500/30">
            <p className="text-xs sm:text-sm text-foreground">
              <strong>Do:</strong> Check RCD type compatibility, verify polarity, use correct meters. 
              <strong>Don't:</strong> Ignore DC components, reverse polarity on sensitive loads.
            </p>
          </div>
        </Card>

        {/* Quiz */}
        <section aria-label="Quiz" className="mb-8">
          <Quiz questions={quizQuestions} title="Check your understanding: AC vs DC Differences" />
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border/20">
          <Button variant="outline" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="..">
              Next
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Module2Section4_1;