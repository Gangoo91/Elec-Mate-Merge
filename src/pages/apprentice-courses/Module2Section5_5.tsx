import useSEO from "@/hooks/useSEO";
import { ArrowLeft, TrendingDown, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import VoltageDropCalculator from "@/components/apprentice-courses/VoltageDropCalculator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import React from "react";

const quizQuestions = [
  {
    id: 1,
    question: "Which formula estimates voltage drop in a circuit leg?",
    options: ["Vd = I × R", "Vd = V/I", "Vd = P × I", "Vd = R/A"],
    correctAnswer: 0,
    explanation: "Voltage drop is current multiplied by the circuit resistance along the path: Vd = I × R.",
  },
  {
    id: 2,
    question: "For the same load current, increasing cable CSA will…",
    options: ["Increase voltage drop", "Reduce voltage drop", "Not change voltage drop", "Always trip the MCB"],
    correctAnswer: 1,
    explanation: "Larger CSA lowers resistance, so Vd = I × R becomes smaller.",
  },
  {
    id: 3,
    question: "Typical design limits for voltage drop (BS 7671 Appendix 4 guidance) are:",
    options: ["10% lighting, 10% others", "3% lighting, 5% others", "1% lighting, 1% others", "No guidance provided"],
    correctAnswer: 1,
    explanation: "Commonly used values are 3% for lighting and 5% for other final circuits – always verify with Appendix 4.",
  },
  {
    id: 4,
    question: "When estimating voltage drop, the length used should be:",
    options: ["One‑way length only", "The total path length (out and back)", "Length of CPC only", "It doesn't matter"],
    correctAnswer: 1,
    explanation: "Use the full current path. For a radial, that's out and back; for rings, use the effective current path length.",
  },
  {
    id: 5,
    question: "Using mV/A/m from Appendix 4, the method is:",
    options: ["Vd = I × L / 1000", "Vd = (mV/A/m × I × L) / 1000", "Vd = mV × R", "Vd = L / A"],
    correctAnswer: 1,
    explanation: "Multiply the tabulated mV per amp per metre by current and length, then divide by 1000 to convert to volts.",
  },
  {
    id: 6,
    question: "Higher temperature generally affects cable resistance by:",
    options: ["Decreasing it", "Increasing it", "No effect", "Making it unstable"],
    correctAnswer: 1,
    explanation: "Most cable materials have positive temperature coefficients, meaning resistance increases with temperature.",
  },
  {
    id: 7,
    question: "For a 100A load over 80m, which factor most reduces voltage drop?",
    options: ["Shorter route", "Larger CSA", "Lower current", "All equally effective"],
    correctAnswer: 1,
    explanation: "Doubling CSA halves resistance and voltage drop. Route and current changes may be less practical.",
  },
  {
    id: 8,
    question: "BS 7671 Appendix 4 mV/A/m values assume:",
    options: ["Any temperature", "70°C conductor", "20°C conductor", "Maximum operating temperature"],
    correctAnswer: 2,
    explanation: "Appendix 4 tabulated values are at 20°C reference temperature.",
  },
  {
    id: 9,
    question: "Ring final circuits for voltage drop calculations use:",
    options: ["Total ring length", "Half ring length", "Longest path", "Average path length"],
    correctAnswer: 1,
    explanation: "For rings, use effective length which is typically half the total ring length.",
  },
  {
    id: 10,
    question: "Voltage drop is critical because it can cause:",
    options: ["Equipment underperformance", "Motor starting problems", "Inefficient heating", "All of the above"],
    correctAnswer: 3,
    explanation: "Excessive voltage drop affects all electrical equipment performance, efficiency, and starting characteristics.",
  },
];

const faqs = [
  {
    q: "What's the difference between the two calculation methods?",
    a: "Method A (Vd = I × R) uses calculated resistance. Method B uses Appendix 4 mV/A/m tables which account for installation specifics – this is preferred for design."
  },
  {
    q: "Why are there different limits for lighting vs other circuits?",
    a: "Lighting is more sensitive to voltage variations. Lower voltage affects lamp life and light output more noticeably than most other equipment."
  },
  {
    q: "How do I handle three-phase calculations?",
    a: "For balanced three-phase loads, use line current and multiply the single-phase voltage drop by √3. For unbalanced loads, calculate each line separately."
  },
  {
    q: "What if my cable type isn't in Appendix 4?",
    a: "Use manufacturer data for mV/A/m values, or calculate from conductor resistance per km. Always verify with manufacturer specifications."
  },
  {
    q: "Do I need to consider temperature correction?",
    a: "Appendix 4 values are at 20°C. For significantly different operating temperatures, apply temperature correction factors or use manufacturer data."
  },
  {
    q: "What about grouping and other correction factors?",
    a: "Voltage drop tables in Appendix 4 don't include grouping corrections. These primarily affect current rating, not voltage drop calculations."
  }
];

const Module2Section5_5: React.FC = () => {
  useSEO(
    "Resistance and Voltage Drop – Module 2 (2.5.5)",
    "Level 2 guide to resistance and voltage drop: methods, limits and simple worked examples aligned with BS 7671."
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
            <TrendingDown className="h-8 w-8 text-elec-yellow" />
            <div>
              <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 2.5.5
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Resistance and Voltage Drop
              </h1>
              <p className="text-xl text-white max-w-3xl mt-2">
                Methods, limits and simple worked examples aligned with BS 7671
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
                <li><strong>Voltage drop:</strong> Lost voltage in cable resistance</li>
                <li><strong>Method A:</strong> Vd = I × R (using resistance)</li>
                <li><strong>Method B:</strong> Use mV/A/m tables from Appendix 4</li>
                <li><strong>Limits:</strong> ≈3% lighting, ≈5% other final circuits</li>
                <li><strong>Solutions:</strong> Shorter runs, larger CSA</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Long runs, small CSA, high current</li>
                <li><strong>Use:</strong> Appendix 4 tables for design method</li>
                <li><strong>Apply:</strong> Check %Vd against design limits</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <div className="space-y-3">
            {[
              "Understand what voltage drop is and why it matters for electrical installations",
              "Read and use BS 7671 Appendix 4 mV/A/m tables correctly",
              "Calculate voltage drop using the formula: Vd = (mV/A/m × I × L) ÷ 1000", 
              "Apply correct design limits: 3% for lighting, 5% for other circuits",
              "Determine cable sizes that meet voltage drop requirements",
              "Solve real-world voltage drop problems for different cable types and installations",
              "Identify when cables need upsizing to meet BS 7671 requirements"
            ].map((goal, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <p className="text-white">{goal}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Core content - How to estimate voltage drop */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">How to estimate voltage drop</h2>
          <div className="text-white text-sm space-y-4">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
              <h3 className="font-semibold mb-1 flex items-center gap-2"><TrendingDown className="w-4 h-4"/> Method A – Using resistance</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Find the circuit resistance R (use R ≈ 0.0172 × L ÷ A for copper, 0.0282 for aluminium).</li>
                <li>Use the total path length for current (out and back for a radial).</li>
                <li>Voltage drop: <strong>Vd ≈ I × R</strong>. Percentage: <strong>%Vd ≈ (Vd / 230) × 100</strong>.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <h3 className="font-semibold mb-1 flex items-center gap-2"><CheckCircle className="w-4 h-4"/> Method B – Using tables (mV/A/m)</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Appendix 4 gives <strong>mV/A/m</strong> values for cables and installation methods.</li>
                <li>Formula: <strong>Vd (V) = (mV/A/m × I × L) ÷ 1000</strong>.</li>
                <li>Use the correct table for the cable type and installation method. This is the preferred design method.</li>
              </ul>
            </div>
            <div className="text-xs text-white">Always verify against Appendix 4. Consider temperature, grouping and supply characteristics where relevant.</div>
          </div>
        </Card>

        {/* Simple Apprentice Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">For Apprentices: How to work out voltage drop (dead simple)</h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
              <h3 className="font-semibold text-elec-yellow mb-2">Think of it like a water pipe:</h3>
              <p>Water loses pressure as it flows through a long, narrow pipe. Electricity loses voltage as it flows through a long, thin cable. We call this lost voltage "voltage drop".</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card border border-elec-yellow/30 p-4 rounded-lg">
                <h3 className="font-semibold text-elec-yellow mb-2">What you need to know:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>How far?</strong> Length of cable run (metres)</li>
                  <li><strong>How much current?</strong> Amps the circuit will carry</li>
                  <li><strong>What cable?</strong> Size and type you're using</li>
                  <li><strong>How installed?</strong> Clipped direct, in conduit, buried, etc.</li>
                </ul>
              </div>
              
              <div className="bg-card border border-border/30 p-4 rounded-lg">
                <h3 className="font-semibold text-elec-yellow mb-2">The limits:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Lighting circuits:</strong> Maximum 3% voltage drop</li>
                  <li><strong>Socket circuits:</strong> Maximum 5% voltage drop</li>
                  <li><strong>At 230V:</strong> 3% = 6.9V, 5% = 11.5V</li>
                </ul>
              </div>
            </div>

            <div className="bg-card border border-amber-400/30 p-4 rounded-lg">
              <h3 className="font-semibold text-amber-300 mb-2">Quick example - Kitchen socket circuit:</h3>
              <div className="grid md:grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="font-medium mb-1">What we have:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>20 metre cable run to kitchen</li>
                    <li>20 amp load (kettle, toaster, etc.)</li>
                    <li>2.5mm² T&E cable, clipped direct</li>
                    <li>Socket circuit (5% limit = 11.5V max)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">What we do:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Look up 2.5mm² T&E clipped: <strong>18 mV/A/m</strong></li>
                    <li>Cable length out and back: <strong>40m total</strong></li>
                    <li>Calculate: (18 × 20 × 40) ÷ 1000 = <strong>14.4V</strong></li>
                    <li><strong>FAIL!</strong> 14.4V &gt; 11.5V limit. Need 4mm² cable.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Method B - The Tables (What apprentices actually use) */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Method B: Using the tables (BS 7671 Appendix 4)</h2>
          <p className="text-xs sm:text-sm text-white mb-4">This is what you'll actually use on site. The tables give you "mV/A/m" values - millivolts per amp per metre.</p>
          
          <div className="space-y-6">
            <div className="bg-card border border-white/10 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-3">Common Cable Types - mV/A/m Values</h3>
              
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-medium text-elec-yellow mb-2">Twin & Earth (T&E) - Clipped Direct</h4>
                  <div className="bg-[#121212] rounded p-3 text-xs">
                    <div className="grid grid-cols-2 gap-2 font-medium mb-2 border-b pb-1">
                      <span>Cable Size</span>
                      <span>mV/A/m</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2"><span>1.0mm²</span><span>44</span></div>
                    <div className="grid grid-cols-2 gap-2"><span>1.5mm²</span><span>29</span></div>
                    <div className="grid grid-cols-2 gap-2 bg-elec-yellow/20"><span>2.5mm²</span><span>18</span></div>
                    <div className="grid grid-cols-2 gap-2"><span>4.0mm²</span><span>11</span></div>
                    <div className="grid grid-cols-2 gap-2"><span>6.0mm²</span><span>7.3</span></div>
                    <div className="grid grid-cols-2 gap-2"><span>10mm²</span><span>4.4</span></div>
                    <div className="grid grid-cols-2 gap-2"><span>16mm²</span><span>2.8</span></div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-elec-yellow mb-2">SWA Cable - Clipped Direct/Tray</h4>
                  <div className="bg-[#121212] rounded p-3 text-xs">
                    <div className="grid grid-cols-2 gap-2 font-medium mb-2 border-b pb-1">
                      <span>Cable Size</span>
                      <span>mV/A/m</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2"><span>1.5mm²</span><span>29</span></div>
                    <div className="grid grid-cols-2 gap-2"><span>2.5mm²</span><span>18</span></div>
                    <div className="grid grid-cols-2 gap-2"><span>4.0mm²</span><span>11</span></div>
                    <div className="grid grid-cols-2 gap-2"><span>6.0mm²</span><span>7.3</span></div>
                    <div className="grid grid-cols-2 gap-2 bg-elec-yellow/20"><span>10mm²</span><span>4.4</span></div>
                    <div className="grid grid-cols-2 gap-2"><span>16mm²</span><span>2.8</span></div>
                    <div className="grid grid-cols-2 gap-2"><span>25mm²</span><span>1.8</span></div>
                    <div className="grid grid-cols-2 gap-2"><span>35mm²</span><span>1.3</span></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border/30 p-4 rounded-lg">
              <h3 className="font-semibold text-elec-yellow mb-2">How to use these tables:</h3>
              <ol className="list-decimal pl-6 space-y-1 text-sm">
                <li><strong>Find your cable</strong> in the correct table (type and installation method)</li>
                <li><strong>Look up the mV/A/m value</strong> for your cable size</li>
                <li><strong>Use this formula:</strong> Voltage drop = (mV/A/m × Current × Length) ÷ 1000</li>
                <li><strong>Remember:</strong> Length = total path (out and back for radials)</li>
                <li><strong>Check the limit:</strong> 3% for lighting (6.9V), 5% for others (11.5V)</li>
              </ol>
            </div>
            
            <div className="bg-card border border-elec-yellow/30 p-4 rounded-lg">
              <h3 className="font-semibold text-elec-yellow mb-2">Worked example using the table:</h3>
              <div className="text-sm">
                <p className="mb-2"><strong>Job:</strong> 30m run to shed, 16A load, using 2.5mm² T&E clipped direct</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Step by step:</p>
                    <ol className="list-decimal pl-6 space-y-1">
                      <li>From table: 2.5mm² T&E = <strong>18 mV/A/m</strong></li>
                      <li>Total length: 30m × 2 = <strong>60m</strong></li>
                      <li>Current: <strong>16A</strong></li>
                      <li>Calculate: (18 × 16 × 60) ÷ 1000 = <strong>17.28V</strong></li>
                    </ol>
                  </div>
                  <div>
                    <p className="font-medium">Result:</p>
                    <p>17.28V is 7.5% of 230V</p>
                    <p className="text-elec-yellow font-semibold">FAILS - exceeds 5% limit!</p>
                    <p className="text-elec-yellow">Solution: Use 4mm² cable (11 mV/A/m) = 10.56V = 4.6% ✓</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>


        {/* Voltage drop in plain English */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Voltage drop in plain English</h2>
          <ul className="list-disc pl-6 space-y-2 text-white text-sm">
            <li>Electricity needs a push (voltage). Cables resist a little, so some push is lost on the way – that's voltage drop.</li>
            <li>Longer and thinner cables lose more; shorter and thicker lose less.</li>
            <li>We keep the loss small so equipment still gets close to 230 V at the terminals.</li>
          </ul>
        </Card>

        {/* Enhanced Voltage Drop Calculator */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <VoltageDropCalculator />
        </Card>

        {/* What this means on site */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">What this means on site</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="bg-card border border-amber-400/30 p-4 rounded-lg">
              <h3 className="font-semibold text-amber-300 mb-2">Design Stage</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Check voltage drop before ordering cables</li>
                <li>Plan efficient routes to minimise length</li>
                <li>Consider future load increases</li>
                <li>Use Appendix 4 tables for accuracy</li>
                <li>Document calculations for building control</li>
              </ul>
            </div>
            <div className="bg-rose-500/10 border border-rose-400/30 p-4 rounded-lg">
              <h3 className="font-semibold text-rose-300 mb-2">Installation</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Avoid unnecessary cable loops and detours</li>
                <li>Keep high-current cables cool</li>
                <li>Plan ahead for testing and certification</li>
                <li>Document actual lengths for records</li>
                <li>Consider voltage drop when positioning distribution boards</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Advanced Topics */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Advanced considerations</h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-4 bg-indigo-500/10 border border-indigo-400/30">
              <h3 className="font-semibold text-indigo-300 mb-2">Temperature effects</h3>
              <p>Cable resistance increases with temperature. High ambient temperatures or poor ventilation increase resistance and voltage drop. Use temperature correction factors when operating conditions differ significantly from 20°C.</p>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <h3 className="font-semibold text-elec-yellow mb-2">Ring circuits</h3>
              <p>For ring final circuits, current divides around both legs. Use effective length (typically half the total ring length) for voltage drop calculations. The load position affects the actual voltage drop.</p>
            </div>
            <div className="rounded-lg p-4 bg-teal-500/10 border border-teal-400/30">
              <h3 className="font-semibold text-teal-300 mb-2">Motor starting</h3>
              <p>Motor starting currents are typically 6-8 times full load current. This can cause significant temporary voltage drop affecting other equipment. Consider starting methods and dedicated feeders for large motors.</p>
            </div>
          </div>
        </Card>

        {/* Practical Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Step-by-step examples</h2>
          <div className="space-y-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
              <h3 className="font-semibold mb-2">Example 1: Kitchen socket circuit</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium mb-1">Given:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Route length: 25m</li>
                    <li>Load current: 20A</li>
                    <li>Cable: 2.5mm² T&E, clipped direct</li>
                    <li>Circuit type: Socket (5% limit)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Calculation:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>mV/A/m = 18 (from Appendix 4)</li>
                    <li>Total length = 25 × 2 = 50m</li>
                    <li>Vd = (18 × 20 × 50) ÷ 1000 = 18V</li>
                    <li>%Vd = (18 ÷ 230) × 100 = 7.8%</li>
                  </ul>
                  <p className="font-semibold text-elec-yellow mt-2">Result: FAILS - exceeds 5% limit</p>
                  <p className="text-xs mt-1">Solution: Use 4mm² cable (11 mV/A/m) → 4.8% ✓</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
              <h3 className="font-semibold mb-2">Example 2: Lighting circuit</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium mb-1">Given:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Route length: 40m</li>
                    <li>Load current: 8A</li>
                    <li>Cable: 1.5mm² T&E, in conduit</li>
                    <li>Circuit type: Lighting (3% limit)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Calculation:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>mV/A/m = 29 (from Appendix 4)</li>
                    <li>Total length = 40 × 2 = 80m</li>
                    <li>Vd = (29 × 8 × 80) ÷ 1000 = 18.6V</li>
                    <li>%Vd = (18.6 ÷ 230) × 100 = 8.1%</li>
                  </ul>
                  <p className="font-semibold text-elec-yellow mt-2">Result: FAILS - exceeds 3% limit</p>
                  <p className="text-xs mt-1">Solution: Use 2.5mm² cable (18 mV/A/m) → 5.0% ✓</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
              <h3 className="font-semibold mb-2">Example 3: Industrial feeder</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium mb-1">Given:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Route length: 60m</li>
                    <li>Load current: 80A</li>
                    <li>Cable: 25mm² XLPE SWA, in tray</li>
                    <li>Circuit type: Feeder (5% limit)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-1">Calculation:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>mV/A/m = 1.8 (from Appendix 4)</li>
                    <li>Total length = 60 × 2 = 120m</li>
                    <li>Vd = (1.8 × 80 × 120) ÷ 1000 = 17.3V</li>
                    <li>%Vd = (17.3 ÷ 230) × 100 = 7.5%</li>
                  </ul>
                  <p className="font-semibold text-elec-yellow mt-2">Result: FAILS - exceeds 5% limit</p>
                  <p className="text-xs mt-1">Solution: Use 35mm² cable (1.3 mV/A/m) → 5.4% Still high - consider 50mm²</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Practice Tasks */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practice tasks</h2>
          <div className="space-y-4 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
              <p className="font-medium">Task 1: Office lighting circuit</p>
              <p>Calculate voltage drop for: 35m run, 1.5mm² T&E clipped direct, 6A load, lighting circuit.</p>
              <Collapsible>
                <CollapsibleTrigger className="mt-2 inline-flex text-elec-yellow text-sm underline">Show solution</CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <p>mV/A/m = 29, Total length = 70m, Vd = (29 × 6 × 70) ÷ 1000 = 12.18V, %Vd = 5.3% - FAILS (&gt;3%). Need 2.5mm².</p>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
              <p className="font-medium">Task 2: Workshop socket</p>
              <p>Calculate for: 20m run, 4mm² SWA clipped direct, 25A load, socket circuit.</p>
              <Collapsible>
                <CollapsibleTrigger className="mt-2 inline-flex text-elec-yellow text-sm underline">Show solution</CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <p>mV/A/m = 11, Total length = 40m, Vd = (11 × 25 × 40) ÷ 1000 = 11V, %Vd = 4.8% - PASSES (≤5%).</p>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
              <p className="font-medium">Task 3: Submain feeder</p>
              <p>60m run, 16mm² XLPE in tray, 80A load. What's the voltage drop percentage?</p>
              <Collapsible>
                <CollapsibleTrigger className="mt-2 inline-flex text-elec-yellow text-sm underline">Show solution</CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <p>mV/A/m = 2.8, Total length = 120m, Vd = (2.8 × 80 × 120) ÷ 1000 = 26.9V, %Vd = 11.7% - Excessive for final circuits.</p>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
              <p className="font-medium">Task 4: Ring final circuit</p>
              <p>Ring circuit with 30m total length, 2.5mm² T&E, 20A balanced load at midpoint. Calculate voltage drop.</p>
              <Collapsible>
                <CollapsibleTrigger className="mt-2 inline-flex text-elec-yellow text-sm underline">Show solution</CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <p>For balanced load at midpoint, effective length = 30/4 = 7.5m. Current per leg = 10A. Vd = (18 × 10 × 15) ÷ 1000 = 2.7V, %Vd = 1.2% - PASSES.</p>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </Card>

        {/* Design checklist */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">6-step design checklist</h2>
          <ol className="list-decimal pl-6 space-y-2 text-white text-sm">
            <li><strong>Determine load:</strong> Calculate design current including diversity factors</li>
            <li><strong>Measure route:</strong> Use total path length (out and back for radials)</li>
            <li><strong>Select cable:</strong> Choose appropriate type for environment and installation method</li>
            <li><strong>Find mV/A/m:</strong> Use correct Appendix 4 table for cable and method</li>
            <li><strong>Calculate Vd:</strong> Apply formula and check percentage against limits</li>
            <li><strong>Document:</strong> Record calculations and upsize cable if necessary</li>
          </ol>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Pocket Guide: Voltage Drop Essentials</h2>
          <div className="grid md:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm text-white">
            <div className="bg-card border border-white/10 p-4 rounded-lg">
              <h3 className="font-semibold text-elec-yellow mb-2">Quick Limits</h3>
              <ul className="space-y-1">
                <li>• Lighting: 3%</li>
                <li>• Power: 5%</li>
                <li>• Motors: 2.5% (starting)</li>
                <li>• Total: 5% max</li>
              </ul>
            </div>
            <div className="bg-card border border-elec-yellow/30 p-4 rounded-lg">
              <h3 className="font-semibold text-elec-yellow mb-2">Common CSAs</h3>
              <ul className="space-y-1">
                <li>• 1.5mm²: Lighting</li>
                <li>• 2.5mm²: Sockets</li>
                <li>• 4mm²: Cooker radials</li>
                <li>• 6mm²: Small feeders</li>
                <li>• 10mm²: Ring final</li>
              </ul>
            </div>
            <div className="bg-card border border-border/30 p-4 rounded-lg">
              <h3 className="font-semibold text-elec-yellow mb-2">Quick Fixes</h3>
              <ul className="space-y-1">
                <li>• Upsize cable CSA</li>
                <li>• Shorten route</li>
                <li>• Split high loads</li>
                <li>• Use copper not aluminium</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* FAQ Section */}
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
              <h3 className="font-semibold text-elec-yellow mb-2">Key takeaways</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Voltage drop reduces equipment performance and efficiency</li>
                <li>Use Appendix 4 mV/A/m tables for design calculations</li>
                <li>Typical limits: 3% lighting, 5% other final circuits</li>
                <li>Calculate using total path length (out and back)</li>
                <li>Consider temperature, installation method, and future loads</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-elec-yellow mb-2">Design workflow</h3>
              <ol className="list-decimal pl-6 space-y-1">
                <li>Determine load current and route length</li>
                <li>Select appropriate cable type and installation method</li>
                <li>Find mV/A/m value from Appendix 4</li>
                <li>Calculate: Vd = (mV/A/m × I × L) ÷ 1000</li>
                <li>Check percentage against design limits</li>
                <li>Upsize if necessary and document design</li>
              </ol>
            </div>
          </div>
        </Card>

        {/* Comprehensive Quiz */}
        <Card className="mb-20 p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Knowledge Check Quiz (10 Questions)</h2>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Bottom nav */}
        <div className="flex items-center justify-start mt-6">
          <Button variant="outline" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2.5
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Module2Section5_5;