import { ArrowLeft, Calculator, CheckCircle, Zap, Flame, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import { PowerCalculator } from "@/components/apprentice-courses/PowerCalculator";
import useSEO from "@/hooks/useSEO";

const TITLE = "Power calculations (P=VI, I²R, V²/R) - Level 2 Module 2 Section 2.4";
const DESCRIPTION = "Choose the right power formula for real jobs and understand where heat occurs. Level 2 friendly, UK‑focused.";

const quickCheckQuestions = [
  {
    id: "power-formula-selection",
    question: "For V = 230V and I = 13A, power is…",
    options: [
      "2990 W",
      "17.7 W", 
      "243 W",
      "299 kW"
    ],
    correctIndex: 0,
    explanation: "P = V×I = 230×13 = 2990 W (≈ 3kW)"
  },
  {
    id: "heating-calculation",
    question: "Cable heating mainly depends on:",
    options: [
      "I²R",
      "V only",
      "Cable colour",
      "Ambient temperature only"
    ],
    correctIndex: 0,
    explanation: "Heat generated in conductors is proportional to I²R (current squared times resistance)."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A 230V, 8A heater. Power is roughly…",
    options: ["184 W", "1.84 kW", "18.4 kW", "0.034 kW"],
    correctAnswer: 1,
    explanation: "P = V×I = 230×8 ≈ 1840 W = 1.84 kW."
  },
  {
    id: 2,
    question: "Cable I²R heating mainly depends on…",
    options: ["Voltage", "Current and resistance", "Colour", "Frequency only"],
    correctAnswer: 1,
    explanation: "Heating is proportional to I²×R in the conductor/termination."
  },
  {
    id: 3,
    question: "At fixed 230V, which has higher power?",
    options: ["460 Ω load", "920 Ω load", "Both same", "Need current"],
    correctAnswer: 0,
    explanation: "P = V²/R; lower R means higher power at fixed V."
  },
  {
    id: 4,
    question: "Which formula fits: known I and R?",
    options: ["P = VI", "P = I²R", "P = V²/R", "P = V/I"],
    correctAnswer: 1,
    explanation: "Use P = I²R when current and resistance are known."
  },
  {
    id: 5,
    question: "Which action reduces cable heating?",
    options: ["Tighter grouping in insulation", "Higher current on same CSA", "Upsize CSA or shorten run", "Loose terminations"],
    correctAnswer: 2,
    explanation: "Lower resistance and good routes reduce I²R heating."
  },
  {
    id: 6,
    question: "Convert 3000W to kW:",
    options: ["3 kW", "0.3 kW", "30 kW", "300 kW"],
    correctAnswer: 0,
    explanation: "Divide by 1000: 3000W ÷ 1000 = 3 kW."
  },
  {
    id: 7,
    question: "A 17.6Ω element at 230V draws approximately:",
    options: ["13 A", "4 A", "40 A", "1.3 A"],
    correctAnswer: 0,
    explanation: "I = V/R = 230/17.6 ≈ 13 A."
  },
  {
    id: 8,
    question: "Doubling current in a cable increases heating by:",
    options: ["2 times", "4 times", "Same", "Half"],
    correctAnswer: 1,
    explanation: "Heat ∝ I²R, so doubling I gives 4× the heating."
  },
  {
    id: 9,
    question: "Most appropriate formula for appliance nameplate (V and I given):",
    options: ["P = V×I", "P = I²R", "P = V²/R", "All equal"],
    correctAnswer: 0,
    explanation: "Use P = V×I when voltage and current are directly available."
  },
  {
    id: 10,
    question: "A 5kW motor at 400V draws approximately:",
    options: ["12.5 A", "8 A", "20 A", "2 A"],
    correctAnswer: 0,
    explanation: "I = P/V = 5000/400 = 12.5 A (single phase approximation)."
  }
];

const faqs = [
  {
    question: "Why three power formulas?",
    answer: "Start with P = V×I. If voltage is fixed and resistance is known, P = V²/R. If current is known with resistance, P = I²R."
  },
  {
    question: "Does power factor matter here?",
    answer: "At Level 2 we focus on DC/resistive loads. Power factor comes later. Labels and datasheets guide practice."
  },
  {
    question: "Does higher voltage always mean more power?",
    answer: "Only if current stays the same. P depends on both V and I."
  },
  {
    question: "Why does a device feel hot within rating?",
    answer: "All real devices have losses. Ventilation and correct terminations help manage heat."
  }
];

const Module2Section2_4: React.FC = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-8 w-8 text-emerald-400" />
            <div>
              <span className="inline-block bg-emerald-500 text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 2.2.4
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Power calculations (P=VI, I²R, V²/R)
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mt-2">
                Choose the right power formula for real jobs and understand where heat occurs.
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
                <li><strong>Power formulas:</strong> P = V×I (most common), P = I²R (heating), P = V²/R (fixed voltage).</li>
                <li><strong>Choose by knowns:</strong> Use V×I for nameplate data, I²R for cable heating, V²/R for fixed loads.</li>
                <li><strong>Heat relationship:</strong> Power converts to heat—I²R losses cause conductor heating.</li>
                <li><strong>Practical use:</strong> Cable sizing, load calculations, fault diagnosis, component selection.</li>
                <li><strong>Safety focus:</strong> Avoid overheating through proper calculation and component selection.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Appliance nameplates (230V, 13A), heating elements, cable specifications, circuit breakers.</li>
                <li><strong>Use:</strong> Calculate appliance power, assess cable heating, size protective devices, verify ratings.</li>
                <li><strong>Apply:</strong> P=VI for nameplate checks, I²R for cable sizing, V²/R for fixed-voltage loads.</li>
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
              <span>Choose the correct power formula for different scenarios</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Calculate power using P = V×I, P = I²R, and P = V²/R</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Understand where heating occurs in electrical circuits</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Apply power calculations to cable sizing considerations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Compare power consumption of different appliances</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Use the power calculator for quick calculations</span>
            </li>
          </ul>
        </Card>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Understanding Power Formulas */}
        <div className="mb-8">
          <div className="border-l-4 border-emerald-500 bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
              Understanding Power Formulas
            </h2>
            <div className="space-y-6 text-foreground">
              <p className="text-base leading-relaxed">
                <strong>Power</strong> is the rate of energy consumption or conversion. In electrical circuits, 
                power can be calculated using three formulas, each suited to different scenarios.
              </p>
              
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20 shadow-sm">
                <h3 className="font-bold text-foreground mb-6 text-center text-lg">The Three Power Formulas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* P = V × I */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                    <div className="relative bg-card/90 backdrop-blur-sm p-6 rounded-xl border border-border/30 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 text-center">
                       <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-full w-24 h-24 md:w-28 md:h-28 flex items-center justify-center mx-auto mb-4 shadow-lg flex-shrink-0">
                         <div className="text-base md:text-lg font-bold font-mono tracking-tight leading-none text-center whitespace-nowrap">
                           P = V×I
                         </div>
                       </div>
                      <h4 className="font-semibold text-foreground mb-2">Most Common</h4>
                      <p className="text-sm text-muted-foreground mb-3">When you know voltage and current</p>
                      <div className="bg-card rounded-lg p-3">
                        <p className="text-xs text-blue-700 dark:text-emerald-400 font-medium">
                          ✓ Nameplate data<br/>
                          ✓ Meter readings<br/>
                          ✓ Quick estimates
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* P = I²R */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                    <div className="relative bg-card/90 backdrop-blur-sm p-6 rounded-xl border border-border/30 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 text-center">
                       <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-full w-24 h-24 md:w-28 md:h-28 flex items-center justify-center mx-auto mb-4 shadow-lg flex-shrink-0">
                         <div className="text-base md:text-lg font-bold font-mono tracking-tight leading-none text-center whitespace-nowrap">
                           P = I²R
                         </div>
                       </div>
                      <h4 className="font-semibold text-foreground mb-2">For Heating</h4>
                      <p className="text-sm text-muted-foreground mb-3">When you know current and resistance</p>
                      <div className="bg-card rounded-lg p-3">
                        <p className="text-xs text-orange-700 dark:text-emerald-400 font-medium">
                          🔥 Cable losses<br/>
                          🔥 Heat generation<br/>
                          🔥 I²R calculations
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* P = V²/R */}
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                    <div className="relative bg-card/90 backdrop-blur-sm p-6 rounded-xl border border-border/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 text-center">
                       <div className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-full w-24 h-24 md:w-28 md:h-28 flex items-center justify-center mx-auto mb-4 shadow-lg flex-shrink-0">
                         <div className="text-base md:text-lg font-bold font-mono tracking-tight leading-none text-center whitespace-nowrap">
                           P = V²÷R
                         </div>
                       </div>
                      <h4 className="font-semibold text-foreground mb-2">Fixed Voltage</h4>
                      <p className="text-sm text-muted-foreground mb-3">When you know voltage and resistance</p>
                      <div className="bg-card rounded-lg p-3">
                        <p className="text-xs text-purple-700 dark:text-emerald-400 font-medium">
                          ⚡ Heater elements<br/>
                          ⚡ Resistive loads<br/>
                          ⚡ Component sizing
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-gradient-to-r from-emerald-500/20 to-emerald-500/10 border-l-4 border-emerald-500 p-4 rounded-r-lg">
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-500 text-black rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold">!</span>
                    </div>
                    <div>
                      <p className="text-foreground text-sm font-medium mb-1">Key Insight</p>
                      <p className="text-muted-foreground text-sm">
                        All three formulas give the same answer for the same circuit. 
                        Choose based on what values you have available and what you're trying to find.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Process */}
        <div className="mb-8">
          <div className="border-l-4 border-emerald-500 bg-card dark:bg-card p-6 rounded-r-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
              Step-by-Step Calculation Process
            </h2>
            <div className="space-y-4 text-foreground">
              <p className="text-sm text-muted-foreground mb-4">
                Power calculations follow a systematic approach. Master this process and you'll confidently handle any power-related scenario on site.
              </p>
              
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Identify what you know:</strong> voltage, current, or resistance values from nameplates, measurements, or specifications.</li>
                <li><strong>Choose the appropriate formula:</strong> P = V×I, P = I²R, or P = V²/R based on available data.</li>
                <li><strong>Convert units if needed:</strong> ensure consistent units (W, V, A, Ω) - watch for kW, mA, kΩ.</li>
                <li><strong>Calculate and round:</strong> keep appropriate significant figures for practical use.</li>
                <li><strong>Sanity‑check:</strong> does the result make practical sense for the application?</li>
                <li><strong>Apply safety margin:</strong> consider derating factors and safety requirements.</li>
              </ol>
              
              <div className="bg-accent/5 rounded-lg p-4 border border-accent/20 mt-4">
                <h4 className="font-semibold mb-2">Example: Kettle Power Check</h4>
                <p className="text-sm mb-2">A kettle nameplate shows 230V, 8.7A. Find the power:</p>
                <ol className="list-decimal pl-4 space-y-1 text-sm">
                  <li>Known: V = 230V, I = 8.7A (from nameplate)</li>
                  <li>Use P = V × I (we have voltage and current directly)</li>
                  <li>Units check: V and A are already in base units</li>
                  <li>Calculate: P = 230 × 8.7 = 2001W ≈ 2kW</li>
                  <li>Sanity check: 2kW is typical for a domestic kettle ✓</li>
                  <li>Application: This kettle will draw 8.7A, suitable for a 13A socket</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* When to Use Each Formula */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">When to Use Each Formula</h2>
          <div className="space-y-6">
            <div className="grid md:grid-cols-1 gap-6">
              
              {/* P = V × I */}
              <div className="bg-card border-l-4 border-emerald-500 p-4 rounded-r-lg">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">P = V × I</span>
                  Most Common - Use First
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-2">Best for:</p>
                    <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                      <li>Appliance nameplate verification</li>
                      <li>Circuit loading calculations</li>
                      <li>Meter reading analysis</li>
                      <li>Quick power estimates</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2">Example scenario:</p>
                    <p className="text-muted-foreground">
                      "The washing machine shows 230V, 10A on its nameplate. 
                      Is this suitable for a 13A socket circuit?"
                    </p>
                    <p className="text-green-600 text-xs mt-1">
                      P = 230 × 10 = 2.3kW ✓ Well within 13A limit
                    </p>
                  </div>
                </div>
              </div>

              {/* P = I²R */}
              <div className="bg-card border-l-4 border-orange-500 p-4 rounded-r-lg">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">I²R</span>
                  For Heating Analysis
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-2">Best for:</p>
                    <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                      <li>Cable heating calculations</li>
                      <li>Connection losses</li>
                      <li>Voltage drop analysis</li>
                      <li>Component thermal rating</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2">Example scenario:</p>
                    <p className="text-muted-foreground">
                      "A 32A circuit uses 30m of 6mm² cable. 
                      How much power is lost as heat?"
                    </p>
                    <p className="text-orange-600 text-xs mt-1">
                      Cable R = 30m × 3.08mΩ = 92.4mΩ<br/>
                      P = 32² × 0.0924 = 94.6W heating
                    </p>
                  </div>
                </div>
              </div>

              {/* P = V²/R */}
              <div className="bg-card border-l-4 border-purple-500 p-4 rounded-r-lg">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">V²/R</span>
                  For Fixed Voltage Loads
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-2">Best for:</p>
                    <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                      <li>Heating element calculations</li>
                      <li>Resistive load analysis</li>
                      <li>Power vs resistance comparisons</li>
                      <li>Element replacement sizing</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2">Example scenario:</p>
                    <p className="text-muted-foreground">
                      "Customer wants to replace a broken 3kW 
                      immersion heater element. What resistance should it be?"
                    </p>
                    <p className="text-purple-600 text-xs mt-1">
                      R = V²/P = 230²/3000 = 17.6Ω<br/>
                      Order a 17.6Ω element for 230V supply
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Common Mistakes and How to Avoid Them */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Common Mistakes and How to Avoid Them</h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-red-600 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Common Mistakes
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="bg-card border-l-4 border-red-500 p-3 rounded-r">
                    <p className="font-medium text-foreground">Unit confusion</p>
                    <p className="text-muted-foreground">Using kW instead of W, or mA instead of A in calculations</p>
                  </li>
                  <li className="bg-card border-l-4 border-red-500 p-3 rounded-r">
                    <p className="font-medium text-foreground">Wrong formula choice</p>
                    <p className="text-muted-foreground">Using P = V²/R when you don't actually know the resistance</p>
                  </li>
                  <li className="bg-card border-l-4 border-red-500 p-3 rounded-r">
                    <p className="font-medium text-foreground">Ignoring power factor</p>
                    <p className="text-muted-foreground">Applying DC formulas to AC inductive loads without consideration</p>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-green-600 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Best Practices
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="bg-card border-l-4 border-green-500 p-3 rounded-r">
                    <p className="font-medium text-foreground">Always convert to base units first</p>
                    <p className="text-muted-foreground">Convert kW→W, mA→A, kΩ→Ω before calculating</p>
                  </li>
                  <li className="bg-card border-l-4 border-green-500 p-3 rounded-r">
                    <p className="font-medium text-foreground">Double-check your knowns</p>
                    <p className="text-muted-foreground">Verify you actually have reliable values for V, I, or R</p>
                  </li>
                  <li className="bg-card border-l-4 border-green-500 p-3 rounded-r">
                    <p className="font-medium text-foreground">Sanity check results</p>
                    <p className="text-muted-foreground">Does a 100kW kettle make sense? Always verify reasonableness</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Interactive Power Calculator */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Interactive Power Calculator</h2>
          <p className="text-muted-foreground mb-6">
            Practice with this calculator. Enter any two values and it will calculate power using the appropriate formula.
          </p>
          <PowerCalculator />
        </Card>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Units Pocket Card */}
        <UnitsPocketCard />

        {/* Real-World Scenario */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Real-World Scenario</h2>
          <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
            <h3 className="font-semibold text-foreground mb-3">Cable Heating Assessment</h3>
            <p className="text-xs sm:text-sm text-foreground mb-3">
              You're installing a 32A radial circuit using 6mm² T&E cable over a 40m run. The client is concerned 
              about cable heating and wants to understand the power loss.
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Given:</strong> I = 32A, Cable resistance ≈ 3.08mΩ/m, Length = 40m</p>
              <p><strong>Step 1:</strong> Calculate total resistance: R = 3.08 × 40 = 123.2mΩ = 0.1232Ω</p>
              <p><strong>Step 2:</strong> Calculate power loss: P = I²R = 32² × 0.1232 = 126W</p>
              <p><strong>Check:</strong> 126W heating in 40m of 6mm² cable - within acceptable limits ✓</p>
              <p className="text-muted-foreground italic">
                This demonstrates how I²R calculations help assess cable suitability and heating effects.
              </p>
            </div>
          </div>
        </Card>

        {/* Detailed Worked Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Detailed Worked Examples</h2>
          <div className="space-y-6">
            
            {/* Example 1: Kitchen Circuit Loading */}
            <div className="border border-border/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <h3 className="text-lg font-semibold text-foreground">Kitchen Circuit Loading Assessment</h3>
              </div>
              
              <div className="bg-card rounded-lg p-4 mb-4 border border-emerald-500/20">
                <p className="text-xs sm:text-sm text-foreground mb-2">
                  <strong>Scenario:</strong> A client wants to add a dishwasher (2.5kW) to a kitchen ring final circuit 
                  that already has a kettle (2kW), microwave (800W), and toaster (1.2kW). Will the 32A circuit cope?
                </p>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-foreground mb-2">Step 1: Calculate individual currents</p>
                    <ul className="space-y-1 text-muted-foreground pl-4">
                      <li>• Dishwasher: I = P/V = 2500/230 = 10.9A</li>
                      <li>• Kettle: I = P/V = 2000/230 = 8.7A</li>
                      <li>• Microwave: I = P/V = 800/230 = 3.5A</li>
                      <li>• Toaster: I = P/V = 1200/230 = 5.2A</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-2">Step 2: Assess simultaneous use</p>
                    <ul className="space-y-1 text-muted-foreground pl-4">
                      <li>• Worst case: All on = 28.3A</li>
                      <li>• Realistic: Kettle + Dishwasher = 19.6A</li>
                      <li>• Circuit rating: 32A</li>
                      <li>• Outcome: ✓ Circuit adequate</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-card border-l-4 border-green-500 p-3 rounded-r mt-4">
                  <p className="text-foreground text-sm">
                    <strong>Conclusion:</strong> The 32A ring final can handle the additional dishwasher. 
                    Even with simultaneous operation of major appliances, current stays well below circuit capacity.
                  </p>
                </div>
              </div>
            </div>

            {/* Example 2: Immersion Heater Sizing */}
            <div className="border border-border/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <h3 className="text-lg font-semibold text-foreground">Immersion Heater Element Replacement</h3>
              </div>
              
              <div className="bg-card rounded-lg p-4 mb-4 border border-purple-500/20">
                <p className="text-xs sm:text-sm text-foreground mb-2">
                  <strong>Scenario:</strong> A customer's 3kW immersion heater element has failed. They want to upgrade 
                  to a more powerful 4kW element but are concerned about their existing 20A circuit and cable sizing.
                </p>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-foreground mb-2">Original 3kW element:</p>
                    <ul className="space-y-1 text-muted-foreground pl-4">
                      <li>• Current: I = P/V = 3000/230 = 13A</li>
                      <li>• Resistance: R = V²/P = 230²/3000 = 17.6Ω</li>
                      <li>• Circuit: 20A MCB, 2.5mm² cable</li>
                      <li>• Status: ✓ Well within limits</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-2">Proposed 4kW element:</p>
                    <ul className="space-y-1 text-muted-foreground pl-4">
                      <li>• Current: I = P/V = 4000/230 = 17.4A</li>
                      <li>• Resistance: R = V²/P = 230²/4000 = 13.2Ω</li>
                      <li>• Circuit requirement: 20A MCB, 2.5mm²</li>
                      <li>• Status: ✓ Still acceptable</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-card border-l-4 border-orange-500 p-3 rounded-r mt-4">
                  <p className="text-foreground text-sm">
                    <strong>Conclusion:</strong> The upgrade to 4kW is possible with the existing installation. 
                    Current increases to 17.4A, still comfortably within the 20A circuit rating.
                  </p>
                </div>
              </div>
            </div>

            {/* Example 3: Motor Cable Sizing */}
            <div className="border border-border/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <h3 className="text-lg font-semibold text-foreground">Workshop Motor Installation</h3>
              </div>
              
              <div className="bg-card rounded-lg p-4 mb-4 border border-orange-500/20">
                <p className="text-xs sm:text-sm text-foreground mb-2">
                  <strong>Scenario:</strong> Installing a 5kW three-phase motor in a workshop. The cable run is 50m from the 
                  distribution board to the motor starter. Calculate current and assess 6mm² SWA cable heating.
                </p>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-foreground mb-2">Motor calculations:</p>
                    <ul className="space-y-1 text-muted-foreground pl-4">
                      <li>• Power: 5kW (5000W)</li>
                      <li>• Supply: 400V three-phase</li>
                      <li>• Line current: I = P/(√3×V) = 5000/(1.73×400) = 7.2A</li>
                      <li>• With efficiency (≈90%): I = 8A per line</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-2">Cable heating assessment:</p>
                    <ul className="space-y-1 text-muted-foreground pl-4">
                      <li>• 6mm² SWA resistance: ≈3.08mΩ/m</li>
                      <li>• 50m run resistance: R = 50 × 3.08 = 154mΩ</li>
                      <li>• Power loss per core: P = I²R = 8² × 0.154 = 9.9W</li>
                      <li>• Total 3-phase loss: 3 × 9.9 = 29.7W</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-card border-l-4 border-green-500 p-3 rounded-r mt-4">
                  <p className="text-foreground text-sm">
                    <strong>Conclusion:</strong> 6mm² SWA cable is more than adequate. Total power loss is only 29.7W (less than 0.6% of motor power), 
                    resulting in minimal heating and excellent efficiency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Power and Energy Relationship */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Understanding Power vs Energy</h2>
          <div className="space-y-4">
            <p className="text-foreground">
              It's crucial to understand the difference between power (rate of energy use) and energy (total consumption over time). 
              This affects customer bills and installation sizing.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-card border-l-4 border-emerald-500 p-4 rounded-r">
                <h3 className="font-semibold text-foreground mb-3">Power (P) - Instantaneous</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• <strong>Unit:</strong> Watts (W) or Kilowatts (kW)</li>
                  <li>• <strong>What it tells us:</strong> How fast energy is being used right now</li>
                  <li>• <strong>Determines:</strong> Cable sizing, protective device ratings</li>
                  <li>• <strong>Example:</strong> A 3kW kettle draws 3000W while heating</li>
                </ul>
              </div>
              
              <div className="bg-card border-l-4 border-green-500 p-4 rounded-r">
                <h3 className="font-semibold text-foreground mb-3">Energy (E) - Over Time</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• <strong>Unit:</strong> Kilowatt-hours (kWh)</li>
                  <li>• <strong>What it tells us:</strong> Total energy consumed over a period</li>
                  <li>• <strong>Determines:</strong> Electricity bills, environmental impact</li>
                  <li>• <strong>Example:</strong> Kettle on for 0.1 hours = 3kW × 0.1h = 0.3kWh</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
              <h4 className="font-semibold text-foreground mb-2">Practical Example: Cost Comparison</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Two customers ask about running costs:</p>
                <p>• <strong>Customer A:</strong> 3kW immersion heater, 2 hours/day = 6kWh/day</p>
                <p>• <strong>Customer B:</strong> 1kW space heater, 8 hours/day = 8kWh/day</p>
                <p className="text-green-600 mt-2">
                  <strong>Result:</strong> Despite lower power rating, Customer B pays more (higher energy consumption)
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border/20 pb-4 last:border-b-0 last:pb-0">
                <p className="font-semibold text-foreground mb-2">{faq.question}</p>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 bg-none shadow-none">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <p className="text-foreground mb-4">
            Power calculations are essential for safe electrical installations. Choose P = V×I for nameplate verification, 
            P = I²R for heating analysis, and P = V²/R for fixed voltage scenarios. Always consider the practical 
            implications of your calculations.
          </p>
          <p className="text-muted-foreground text-sm">
            Remember: Heat is proportional to I² - small increases in current create large increases in heating!
          </p>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Test Your Understanding: Power Calculations" />

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border/20">
          <Button variant="outline" asChild>
            <Link to=".." className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
          <Button asChild>
            <Link to=".." className="flex items-center gap-2">
              Forward
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: TITLE,
            description: DESCRIPTION,
            inLanguage: "en-GB",
            isAccessibleForFree: true,
          }),
        }}
      />
    </div>
  );
};

export default Module2Section2_4;
