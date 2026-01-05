import React from "react";
import { ArrowLeft, Lightbulb, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Sources of AC and DC - Level 2 Module 2 Section 4.2";
const DESCRIPTION = "Comprehensive guide to AC and DC sources for UK electricians: mains, generators, batteries, PV, rectifiers, inverters, UPS, with BS 7671 guidance.";

const quickCheckQuestions = [
  {
    id: "ac-sources",
    question: "Which of these is a true AC source (not converted from DC)?",
    options: ["Battery", "Rectifier output", "Alternator", "PV panel"],
    correctIndex: 2,
    explanation: "Alternators generate AC directly. Batteries are DC, rectifiers convert AC to DC, and PV panels produce DC."
  },
  {
    id: "ups-topology", 
    question: "Which UPS topology provides the best isolation from mains supply issues?",
    options: ["Offline/Standby", "Line-interactive", "Online/Double-conversion", "Passive"],
    correctIndex: 2,
    explanation: "Online (double-conversion) UPS continuously converts AC→DC→AC, providing complete isolation from mains disturbances."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which of the following is a DC source?",
    options: ["Alternator output without rectifier", "Battery", "Mains socket", "Transformer secondary"],
    correctAnswer: 1,
    explanation: "Batteries provide DC; alternators and transformers produce AC unless rectified or inverted."
  },
  {
    id: 2,
    question: "What section of BS 7671 covers generating sets and inverters?",
    options: ["Section 551", "Section 712", "Section 722", "Section 414"],
    correctAnswer: 0,
    explanation: "Section 551 addresses low-voltage generating sets including inverters."
  },
  {
    id: 3,
    question: "Which UPS topology provides continuous conversion (best isolation)?",
    options: ["Offline/Standby", "Line-interactive", "Online/Double-conversion", "Passive"],
    correctAnswer: 2,
    explanation: "Online (double-conversion) UPS continuously rectifies AC to DC and inverts back to AC."
  },
  {
    id: 4,
    question: "After full-wave rectification of 230 V AC (rms), what is the approximate DC peak before smoothing?",
    options: ["230 V", "253 V", "325 V", "460 V"],
    correctAnswer: 2,
    explanation: "Peak ≈ Vrms × √2 ≈ 230 × 1.414 ≈ 325 V (minus diode drops)."
  },
  {
    id: 5,
    question: "A 12 V LED strip draws 2.4 A. What PSU current rating is sensible?",
    options: ["2.5 A (no headroom)", "3 A (≈25% headroom)", "10 A (oversized)", "1 A (undersized)"],
    correctAnswer: 1,
    explanation: "Providing sensible headroom (≈20–30%) is good practice."
  },
  {
    id: 6,
    question: "Which section of BS 7671 is specific to PV systems?",
    options: ["Section 551", "Section 712", "Section 722", "Section 414"],
    correctAnswer: 1,
    explanation: "Section 712 covers photovoltaic power supply systems."
  },
  {
    id: 7,
    question: "Which component converts DC to AC?",
    options: ["Rectifier", "Inverter", "Transformer", "Battery"],
    correctAnswer: 1,
    explanation: "Inverters convert DC into AC."
  },
  {
    id: 8,
    question: "Which symbol denotes AC on equipment labels?",
    options: ["=", "~", "+/-", "≡"],
    correctAnswer: 1,
    explanation: "The tilde ~ marks alternating current. The equals sign = marks direct current."
  },
  {
    id: 9,
    question: "EV charging installations are covered by which BS 7671 section?",
    options: ["Section 551", "Section 712", "Section 722", "Section 560"],
    correctAnswer: 2,
    explanation: "Section 722 covers electric vehicle charging installations."
  },
  {
    id: 10,
    question: "Which device reduces AC ripple after rectification?",
    options: ["Inductor/capacitor filter", "Transformer", "Generator", "Contactor"],
    correctAnswer: 0,
    explanation: "Filters (capacitors/inductors) smooth ripple on DC rails."
  }
];

const faqs = [
  {
    question: "Can I parallel supplies of different types?",
    answer: "Generally no without special control. Different sources (batteries, mains, generators) have different characteristics. Use proper transfer switches or paralleling equipment designed for the specific sources."
  },
  {
    question: "How much headroom should I allow for a PSU?",
    answer: "Typically 20-30% above the continuous load current. This accounts for start-up surges, component tolerances, aging, and ambient temperature effects."
  },
  {
    question: "What level of ripple is acceptable for LEDs/electronics?",
    answer: "Most LED drivers tolerate <5% ripple, but check manufacturer specs. Some electronics require <1% ripple. Poor filtering can cause visible flicker or premature failure."
  },
  {
    question: "Which RCD types are compatible with inverters/EV/PV?",
    answer: "Check manufacturer instructions. Many require Type A or Type B RCDs due to DC components or high-frequency harmonics. Type AC may not provide adequate protection."
  },
  {
    question: "Do batteries require ventilation and temperature management?",
    answer: "Yes, especially lead-acid (hydrogen gas risk) and some Li-ion chemistries. Follow manufacturer guidance on ventilation, temperature limits, and charging profiles."
  },
  {
    question: "Can a transformer provide DC? (Why not?)",
    answer: "No. Transformers only work with changing magnetic fields (AC). For DC output, you need a rectifier after the transformer, or use a DC-DC converter for DC input."
  }
];

const Module2Section4_2 = () => {
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
                Module 2.4.2
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Sources of AC and DC
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mt-2">
                Mains, generators, rectifiers, batteries, PV, inverters and UPS — how to identify, select and work safely
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
                <li><strong>AC sources:</strong> DNO mains, alternators/generators, transformers (AC↔AC only).</li>
                <li><strong>DC sources:</strong> Batteries, rectifiers/SMPS, PV arrays, UPS DC bus, drives.</li>
                <li><strong>Conversion:</strong> Rectifier (AC→DC), inverter (DC→AC); smoothing affects ripple.</li>
                <li><strong>UPS topologies:</strong> Offline, line-interactive, online (double-conversion).</li>
                <li><strong>Selection:</strong> Headroom for surge, derating for temperature, RCD compatibility.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Where:</strong> Plant rooms, switch rooms, UPS rooms, PV isolators, control panels, EV charge points.</li>
                <li><strong>What to do:</strong> Check nameplates, isolation points, RCD notes, discharge times, ventilation and cable sizing.</li>
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
              <span>Identify common AC and DC sources in domestic, commercial and industrial settings</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Explain rectification, inversion and smoothing at a practical level</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Choose suitable supplies with allowance for surge and derating</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Recognise UPS topologies and basic battery management considerations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Reference relevant BS 7671 sections (e.g. 551, 712, 722, 414)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Apply safe isolation and discharge procedures for various source types</span>
            </li>
          </ul>
        </Card>

        {/* Section 1: AC Sources */}
        <div className="mb-8">
          <div className="border-l-4 border-emerald-500 bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
              AC Sources - Mains, Generators and Transformers
            </h2>
            <div className="space-y-6 text-foreground">
              <p>
                AC sources form the foundation of UK electrical infrastructure. Understanding their characteristics, 
                limitations, and applications is essential for safe design and installation work.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">DNO Mains Supply Characteristics</h3>
                  <div className="space-y-3">
                    <div className="bg-card border border-border/30 p-4 rounded-lg">
                      <p className="text-blue-200 text-sm mb-2"><strong>UK Standard Supply Parameters:</strong></p>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-blue-100">
                        <li><strong>Single-phase:</strong> 230V RMS ±10% at 50Hz ±1% (BS EN 50160)</li>
                        <li><strong>Three-phase:</strong> 400V line-to-line, 230V line-to-neutral</li>
                        <li><strong>Harmonics:</strong> Total harmonic distortion typically &lt;5% under normal conditions</li>
                        <li><strong>Earthing:</strong> TN-S, TN-C-S, or TT systems per local DNO arrangements</li>
                        <li><strong>Supply impedance:</strong> Varies by location, affects fault current levels</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
                      <p className="text-slate-200 text-sm mb-2"><strong>Regional Variations and Considerations:</strong></p>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-slate-100">
                        <li><strong>Urban areas:</strong> Generally more stable supply, lower impedance</li>
                        <li><strong>Rural areas:</strong> Higher impedance, voltage variations more common</li>
                        <li><strong>Industrial estates:</strong> May have dedicated substations, better regulation</li>
                        <li><strong>Voltage tolerance:</strong> Equipment must operate across ±10% range</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">Generators and Alternators</h3>
                  <div className="space-y-3">
                    <div className="bg-card border border-border/30 p-4 rounded-lg">
                      <p className="text-blue-200 text-sm mb-2"><strong>Portable and Standby Sets:</strong></p>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-blue-100">
                        <li><strong>AVR (Automatic Voltage Regulation):</strong> Maintains stable output voltage</li>
                        <li><strong>Governor control:</strong> Keeps frequency stable under varying loads</li>
                        <li><strong>Earthing arrangements:</strong> May require separate earth electrode system</li>
                        <li><strong>Changeover systems:</strong> Manual or automatic transfer switches (BS 7671 Section 551)</li>
                        <li><strong>Synchronisation:</strong> Required for parallel operation with mains or other generators</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
                      <p className="text-slate-200 text-sm mb-2"><strong>Installation Requirements:</strong></p>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-slate-100">
                        <li><strong>Ventilation:</strong> Adequate airflow for cooling and exhaust management</li>
                        <li><strong>Fuel supply:</strong> Safe storage and handling per regulations</li>
                        <li><strong>Noise control:</strong> Consider environmental impact and local bylaws</li>
                        <li><strong>Emergency stop:</strong> Accessible shut-down facilities required</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">Transformers and Voltage Conversion</h3>
                  <div className="space-y-3">
                    <div className="bg-card border border-border/30 p-4 rounded-lg">
                      <p className="text-blue-200 text-sm mb-2"><strong>Transformer Principles and Applications:</strong></p>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-blue-100">
                        <li><strong>Step-down transformers:</strong> 400V to 230V, 230V to 110V for tools</li>
                        <li><strong>Isolation transformers:</strong> Provide galvanic separation for safety</li>
                        <li><strong>Auto-transformers:</strong> Single winding, more compact but no isolation</li>
                        <li><strong>Current transformers:</strong> For measurement and protection systems</li>
                        <li><strong>Voltage transformers:</strong> For instrumentation and control circuits</li>
                      </ul>
                    </div>
                    
                    <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
                      <p className="text-slate-200 text-sm mb-2"><strong>Safety and Installation Notes:</strong></p>
                      <ul className="list-disc pl-6 space-y-1 text-sm text-slate-100">
                        <li><strong>Temperature rating:</strong> Consider ambient conditions and loading</li>
                        <li><strong>Overcurrent protection:</strong> Required on both primary and secondary</li>
                        <li><strong>Earth bonding:</strong> Metalwork must be earthed per BS 7671</li>
                        <li><strong>Nameplate data:</strong> Voltage ratios, kVA rating, connection diagrams</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                  <p className="text-yellow-300">
                    <strong>Important Limitation:</strong> Transformers only work with AC - they cannot convert between AC and DC. 
                    For AC→DC conversion, you need rectification. For DC→AC, you need inversion. Transformers rely on 
                    changing magnetic fields which only occur with alternating current.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3">Selection Criteria and Applications</h3>
                  <div className="space-y-2">
                    <div className="bg-card border border-border/30 p-3 rounded">
                      <p className="text-sm text-blue-100">
                        <strong>Mains supply:</strong> First choice for fixed installations, most cost-effective
                      </p>
                    </div>
                    <div className="bg-card border border-border/30 p-3 rounded">
                      <p className="text-sm text-blue-100">
                        <strong>Generators:</strong> Emergency backup, portable power, remote locations
                      </p>
                    </div>
                    <div className="bg-card border border-border/30 p-3 rounded">
                      <p className="text-sm text-blue-100">
                        <strong>Transformers:</strong> Voltage level conversion, safety isolation, impedance matching
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: DC Sources */}
        <div className="mb-8">
          <div className="border-l-4 border-emerald-500 bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
              DC Sources - Batteries, Rectifiers and PV
            </h2>
            <div className="space-y-4 text-foreground">
              <p>
                DC sources provide steady voltage with possible ripple. Understanding their characteristics is essential for proper selection and safety.
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="font-bold">Types of DC sources:</p>
                  <div className="bg-card border border-emerald-500/30 p-4 rounded-lg">
                    <ul className="list-disc pl-6 space-y-1 text-sm text-emerald-200">
                      <li><strong>Batteries:</strong> Lead-acid, Li-ion, NiMH; note capacity (Ah), C-rate, temperature effects</li>
                      <li><strong>Rectifiers/SMPS:</strong> AC→DC conversion; filtered output may have ripple</li>
                      <li><strong>PV arrays:</strong> Solar panels produce DC varying with light/temperature (Section 712)</li>
                      <li><strong>UPS DC bus:</strong> Internal battery-backed DC feeding inverter stages</li>
                      <li><strong>Drive DC rails:</strong> Rectified mains feeding inverter sections in VFDs</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                  <p className="text-yellow-300">
                    <strong>Safety Note:</strong> DC systems can store significant energy in capacitors. 
                    Always discharge before maintenance and observe polarity - reverse connections can damage equipment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Conversion & UPS */}
        <div className="mb-8">
          <div className="border-l-4 border-teal-500 bg-teal-500/10 dark:bg-teal-500/10 p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
              Conversion Pathways and UPS Systems
            </h2>
            <div className="space-y-6 text-foreground">
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-teal-300">AC↔DC Conversion</h3>
                <div className="bg-teal-500/10 border border-teal-400/30 p-4 rounded-lg">
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li><strong>Rectification (AC→DC):</strong> Diode bridges, smoothing filters, expect some ripple</li>
                    <li><strong>Inversion (DC→AC):</strong> Switch-mode electronics create AC from DC</li>
                    <li><strong>Filtering:</strong> Capacitors/inductors reduce ripple but can't eliminate it completely</li>
                    <li><strong>Harmonics:</strong> Power electronics can introduce distortion affecting other equipment</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-teal-300">UPS Topologies</h3>
                
                <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
                  <h4 className="font-bold text-slate-200 mb-2">Offline/Standby UPS</h4>
                  <ul className="space-y-1 text-sm text-slate-200">
                    <li>• Mains normally feeds load directly</li>
                    <li>• Battery/inverter activate on mains failure</li>
                    <li>• Brief transfer time (~5-10ms)</li>
                    <li>• Most economical option</li>
                  </ul>
                </div>

                <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
                  <h4 className="font-bold text-slate-200 mb-2">Line-Interactive UPS</h4>
                  <ul className="space-y-1 text-sm text-slate-200">
                    <li>• Voltage regulation during normal operation</li>
                    <li>• Battery backup for outages</li>
                    <li>• Good for voltage fluctuation areas</li>
                    <li>• Medium cost and complexity</li>
                  </ul>
                </div>

                <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
                  <h4 className="font-bold text-slate-200 mb-2">Online/Double-Conversion UPS</h4>
                  <ul className="space-y-1 text-sm text-slate-200">
                    <li>• Continuous AC→DC→AC conversion</li>
                    <li>• Complete isolation from mains disturbances</li>
                    <li>• Zero transfer time (already on inverter)</li>
                    <li>• Highest cost but best protection</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Selection & On-site Safety */}
        <div className="mb-8">
          <div className="border-l-4 border-amber-500 bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
              Selection Criteria and On-site Safety
            </h2>
            <div className="space-y-6 text-foreground">
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-amber-300">Selection Guidelines</h3>
                <div className="bg-card border border-amber-400/30 p-4 rounded-lg">
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li><strong>Headroom:</strong> 20-30% above continuous load for surge/aging/temperature</li>
                    <li><strong>Environment:</strong> Derate for high temperature, consider IP rating</li>
                    <li><strong>Compatibility:</strong> Check RCD type requirements, earthing arrangements</li>
                    <li><strong>Standards:</strong> Follow manufacturer instructions and relevant BS 7671 sections</li>
                    <li><strong>Maintenance:</strong> Consider access for testing, battery replacement, ventilation</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-amber-300">Isolation and Discharge Procedures</h3>
                
                <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
                  <div className="space-y-2 text-sm text-slate-200">
                    <p><strong>1. AC sources:</strong> Standard isolation, test for dead, lock off procedures</p>
                    <p><strong>2. DC sources:</strong> Isolate both poles, discharge capacitors, verify zero energy</p>
                    <p><strong>3. PV systems:</strong> Follow Section 712 - DC isolators first, wait for discharge</p>
                    <p><strong>4. UPS systems:</strong> Isolate mains, battery, and internal DC before maintenance</p>
                    <p><strong>5. Battery systems:</strong> Consider hydrogen ventilation, use insulated tools</p>
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
              <h3 className="font-bold text-slate-200 mb-2">Example 1: LED PSU Sizing</h3>
              <p className="text-slate-300 text-sm mb-2">Requirement: 12V LED strip drawing 2.4A continuous</p>
              <div className="space-y-1 text-sm text-slate-200">
                <p><strong>Calculation:</strong> 2.4A + 25% headroom = 3.0A minimum PSU rating</p>
                <p><strong>Selection:</strong> Choose 12V, 3A+ PSU with appropriate IP rating</p>
                <p><strong>Checks:</strong> Verify polarity marking, ripple specs, RCD compatibility</p>
                <p><strong>Installation:</strong> Adequate ventilation, accessible for maintenance</p>
              </div>
            </div>

            <div className="bg-card/30 border border-slate-600/30 p-4 rounded-lg">
              <h3 className="font-bold text-slate-200 mb-2">Example 2: Small PV-Hybrid System Isolation</h3>
              <p className="text-slate-300 text-sm mb-2">Task: Safe isolation of PV array with battery storage for maintenance</p>
              <div className="space-y-1 text-sm text-slate-200">
                <p><strong>Step 1:</strong> Isolate DC from PV array (Section 712 procedures)</p>
                <p><strong>Step 2:</strong> Isolate battery DC connections</p>
                <p><strong>Step 3:</strong> Allow capacitor discharge time per manufacturer instructions</p>
                <p><strong>Step 4:</strong> Isolate AC side and prove dead before work</p>
                <p><strong>Step 5:</strong> Test isolation effectiveness with appropriate instruments</p>
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
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Sources & Conversion — Pocket Guide</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
            <div className="space-y-3">
              <div className="bg-background/20 border border-border/20 p-3 rounded">
                <p className="font-medium text-foreground mb-1">AC Sources</p>
                <p className="text-muted-foreground">Mains (DNO) | Generator | Transformer | Inverter (DC→AC)</p>
              </div>
              <div className="bg-background/20 border border-border/20 p-3 rounded">
                <p className="font-medium text-foreground mb-1">DC Sources</p>
                <p className="text-muted-foreground">Battery | Rectifier/SMPS | PV array | UPS DC bus</p>
              </div>
              <div className="bg-background/20 border border-border/20 p-3 rounded">
                <p className="font-medium text-foreground mb-1">Conversion Paths</p>
                <p className="text-muted-foreground">AC →(rectifier)→ DC | DC →(inverter)→ AC</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-background/20 border border-border/20 p-3 rounded">
                <p className="font-medium text-foreground mb-1">UPS Types</p>
                <p className="text-muted-foreground">Offline | Line-interactive | Online (double-conversion)</p>
              </div>
              <div className="bg-background/20 border border-border/20 p-3 rounded">
                <p className="font-medium text-foreground mb-1">Selection Rules</p>
                <p className="text-muted-foreground">20-30% headroom | Derate for temperature | Check RCD compatibility</p>
              </div>
              <div className="bg-background/20 border border-border/20 p-3 rounded">
                <p className="font-medium text-foreground mb-1">Safety Notes</p>
                <p className="text-muted-foreground">Discharge stored energy | Check polarity | Follow Section 712/551/722</p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-emerald-500/10 rounded border border-emerald-500/30">
            <p className="text-xs sm:text-sm text-foreground">
              <strong>Quick Selection:</strong> PSU headroom ~25% | UPS: offline (basic), online (critical loads) | 
              RCD: Check manufacturer notes for Type A/B requirements.
            </p>
          </div>
        </Card>

        {/* Quiz */}
        <section aria-label="Quiz" className="mb-8">
          <Quiz questions={quizQuestions} title="Check your understanding: Sources of AC and DC" />
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

export default Module2Section4_2;