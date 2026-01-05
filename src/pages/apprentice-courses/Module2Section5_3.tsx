import useSEO from "@/hooks/useSEO";
import { ArrowLeft, Thermometer, Ruler, Expand, Gauge, Calculator, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import ResistanceCalculator from "@/components/apprentice-courses/ResistanceCalculator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const TITLE = "Factors Affecting Resistance - Level 2 Module 2 Section 5.3";
const DESCRIPTION = "Learn how length, area, temperature and material affect electrical resistance - with practical examples and BS 7671 guidance.";

const quizQuestions = [
  {
    id: 1,
    question: "Which formula links resistance to length and cross‑sectional area?",
    options: ["R = V/I", "R = ρL/A", "P = VI", "Z = √(R² + X²)"],
    correctAnswer: 1,
    explanation: "Conductor resistance depends on resistivity (ρ), length (L) and cross‑sectional area (A): R = ρL/A.",
  },
  {
    id: 2,
    question: "Doubling the length of a uniform conductor will:",
    options: ["Halve the resistance", "Double the resistance", "Quarter the resistance", "Not change resistance"],
    correctAnswer: 1,
    explanation: "R is directly proportional to L; doubling L doubles R (same ρ and A).",
  },
  {
    id: 3,
    question: "If the cross‑sectional area is doubled (same material and length), resistance will approximately:",
    options: ["Double", "Halve", "Remain the same", "Increase slightly"],
    correctAnswer: 1,
    explanation: "R is inversely proportional to A; increasing A reduces R.",
  },
  {
    id: 4,
    question: "Compared with copper, aluminium has:",
    options: ["Lower resistivity (ρ)", "Similar resistivity (ρ)", "Higher resistivity (ρ)", "Zero resistivity"],
    correctAnswer: 2,
    explanation: "Aluminium's higher ρ gives higher R for the same L and A, so a larger CSA is needed for equal performance.",
  },
  {
    id: 5,
    question: "For most metallic conductors, as temperature rises, resistance tends to:",
    options: ["Decrease", "Increase", "Remain constant", "Become zero"],
    correctAnswer: 1,
    explanation: "Metals usually have a positive temperature coefficient; R increases with temperature.",
  },
  {
    id: 6,
    question: "The temperature coefficient of resistance (α) is used to:",
    options: ["Adjust voltage drop for frequency", "Correct resistance from 20°C to operating temperature", "Size protective devices", "Measure insulation resistance"],
    correctAnswer: 1,
    explanation: "R_T = R_20 × [1 + α(T − 20°C)] is a simple correction often used for metals.",
  },
  {
    id: 7,
    question: "Poor or loose connections typically cause:",
    options: ["Lower resistance and less heat", "Higher local resistance and heating", "No change", "Short‑circuit instantly"],
    correctAnswer: 1,
    explanation: "Contact resistance rises; this can overheat and damage insulation – a safety risk.",
  },
  {
    id: 8,
    question: "Which BS 7671 resources are most useful when considering conductor resistance and voltage drop?",
    options: ["Appendix 4 tables", "Part 7 special locations only", "Inspection schedules only", "Earthing arrangements only"],
    correctAnswer: 0,
    explanation: "Appendix 4 provides conductor resistance and voltage drop information and correction factors.",
  },
  {
    id: 9,
    question: "Which combination gives the LOWEST resistance (same material)?",
    options: ["Short length, small CSA", "Long length, small CSA", "Short length, large CSA", "Long length, large CSA"],
    correctAnswer: 2,
    explanation: "Lower L and higher A minimises R for a given ρ.",
  },
  {
    id: 10,
    question: "Why might a long feeder be upsized in CSA?",
    options: ["To increase resistance and warm the cable", "To reduce voltage drop and heating", "To change colour codes", "To reduce fault current"],
    correctAnswer: 1,
    explanation: "Larger CSA reduces R, helping keep voltage drop and temperature rise within limits.",
  },
];

const Module2Section5_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
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
            <Thermometer className="h-8 w-8 text-emerald-400" />
            <div>
              <span className="inline-block bg-emerald-500 text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">
                Module 2.5.3
              </span>
              <h1 className="text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Factors Affecting Resistance
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mt-2">
                Learn how length, area, temperature and material affect electrical resistance
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
                <li><strong>Formula:</strong> R = ρL/A (resistivity × length ÷ area)</li>
                <li><strong>Length:</strong> Longer runs = higher resistance</li>
                <li><strong>Area:</strong> Thicker cables = lower resistance</li>
                <li><strong>Material:</strong> Copper has lower ρ than aluminium</li>
                <li><strong>Temperature:</strong> Heat increases metal resistance</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Long cable runs, small CSA, hot environments</li>
                <li><strong>Use:</strong> Apply correction factors from Appendix 4</li>
                <li><strong>Apply:</strong> Upsize cables for voltage drop control</li>
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
              <span>State and apply R = ρL/A for simple scenarios</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Explain how length, CSA, material and temperature influence resistance</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Use BS 7671 Appendix 4 data to consider resistance and voltage drop</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Recognise practical issues: joints, terminations and heat rise</span>
            </li>
          </ul>
        </Card>

        {/* Plain English explainer */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">What does the formula mean? (Plain English)</h2>
          <ul className="list-disc pl-6 space-y-2 text-foreground text-sm">
            <li>Think of resistance like traffic on a road. A longer road adds more delay; a wider road lets more cars through.</li>
            <li>Length (L): more length = more resistance.</li>
            <li>Area (A): a bigger cross‑section (thicker cable) = less resistance.</li>
            <li>Material (ρ, "rho"): copper lets current through more easily than aluminium, so it has lower resistivity.</li>
            <li>Temperature (T): hot metal makes it harder for electrons to move, so resistance usually goes up when it's hot.</li>
            <li>The rule of thumb is <strong>R = ρL/A</strong>. Use it to predict what happens if you make a cable longer, thinner or choose a different metal.</li>
          </ul>
        </Card>

        {/* How we calculate (practical method) */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">How we calculate resistance for cables</h2>
          <div className="text-foreground text-sm space-y-3">
            <p>Use the standard constant for the metal and enter the cable length L (metres) and cross‑sectional area A (mm²):</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Copper:</strong> R (Ω) ≈ <strong>0.0172 × L ÷ A</strong></li>
              <li><strong>Aluminium:</strong> R (Ω) ≈ <strong>0.0282 × L ÷ A</strong></li>
              <li>Values are referenced to around 20°C. Use temperature correction if needed.</li>
            </ul>
            <div className="rounded-lg p-3 sm:p-4 bg-card border border-emerald-500/30">
              <h3 className="font-semibold text-emerald-400 mb-1">Quick example</h3>
              <p>30 m of copper, 2.5 mm²: R ≈ 0.0172 × 30 ÷ 2.5 = <strong>0.206 Ω</strong>.</p>
            </div>

            <Collapsible>
              <CollapsibleTrigger className="mt-2 inline-flex text-emerald-400 text-sm underline">Show derivation (SI units)</CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
                  <div className="bg-card border border-slate-400/30 p-4 rounded-lg space-y-1">
                    <h3 className="font-semibold text-slate-300 mb-1">Step 1 – Convert areas</h3>
                    <p>Manufacturers give cable size in mm². The base formula uses m².</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>1 mm² = 1 × 10⁻⁶ m²</li>
                      <li>2.5 mm² → 2.5 × 10⁻⁶ m²</li>
                    </ul>
                  </div>
                  <div className="bg-card border border-slate-400/30 p-4 rounded-lg space-y-1">
                    <h3 className="font-semibold text-slate-300 mb-1">Step 2 – Convert resistivity ρ</h3>
                    <p>We often quote ρ in nΩ·m (nano‑ohm metre). The formula uses Ω·m.</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>1 nΩ·m = 1 × 10⁻⁹ Ω·m</li>
                      <li>Copper ρ ≈ 17.2 nΩ·m → 17.2 × 10⁻⁹ Ω·m</li>
                    </ul>
                  </div>
                  <div className="bg-card border border-slate-400/30 p-4 rounded-lg space-y-1 md:col-span-2">
                    <h3 className="font-semibold text-slate-300 mb-1">Step 3 – Put the values in</h3>
                    <p>R = ρL/A. For L = 30 m and A = 2.5 mm² (2.5 × 10⁻⁶ m²): R ≈ (17.2 × 10⁻⁹ × 30) / (2.5 × 10⁻⁶) ≈ 0.206 Ω.</p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </Card>

        {/* Try it yourself – calculator */}
        <ResistanceCalculator />

        {/* Key Factors */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6">Key Factors</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="bg-card border border-border/30 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold text-emerald-400 mb-1 flex items-center gap-2"><Ruler className="w-4 h-4" /> Length (L)</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Longer conductors have higher resistance (directly proportional).</li>
                <li>Ring circuits or return paths increase effective length of the current path.</li>
                <li>Keep runs short where possible to limit voltage drop and heating.</li>
              </ul>
            </div>
            <div className="bg-card border border-emerald-500/30 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold text-emerald-400 mb-1 flex items-center gap-2"><Expand className="w-4 h-4" /> Cross‑Sectional Area (A)</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Larger CSA reduces resistance (inversely proportional).</li>
                <li>Upsizing feeders can control voltage drop on long runs.</li>
                <li>Avoid nicks/damage that effectively reduce CSA at terminations.</li>
              </ul>
            </div>
            <div className="bg-card border border-amber-400/30 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold text-amber-300 mb-1 flex items-center gap-2"><Gauge className="w-4 h-4" /> Material (Resistivity ρ)</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Copper (ρ ≈ 17.2 nΩ·m) vs Aluminium (ρ ≈ 28.2 nΩ·m) – Al needs larger CSA.</li>
                <li>Stranding doesn't change bulk ρ but affects flexibility and skin effect at higher frequencies.</li>
                <li>Contact resistance at joints depends on surface condition and pressure.</li>
              </ul>
            </div>
            <div className="bg-rose-500/10 border border-rose-400/30 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold text-rose-300 mb-1 flex items-center gap-2"><Thermometer className="w-4 h-4" /> Temperature</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Metals generally have positive temperature coefficient: higher T → higher R.</li>
                <li>Simple correction (approx. for copper): R_T ≈ R_20 × [1 + 0.004 × (T−20°C)].</li>
                <li>Follow cable temperature ratings and installation methods (Appendix 4).</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Practical Notes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6">Practical Notes</h2>
          <ul className="list-disc pl-6 space-y-2 text-foreground">
            <li>Design for acceptable voltage drop and temperature rise using Appendix 4 data.</li>
            <li>Maintain tight, clean connections; poor joints add resistance and heat.</li>
            <li>Avoid bunching/grouping without applying correction factors – heat raises R.</li>
            <li>Use correct lugs and torque; consider bimetallic solutions for Al↔Cu transitions.</li>
          </ul>
        </Card>

        {/* BS 7671 References (guidance) */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6">BS 7671 References (guidance)</h2>
          <ul className="list-disc pl-6 space-y-2 text-foreground">
            <li>Appendix 4 – Conductor resistance, current‑carrying capacity and voltage drop</li>
            <li>Section 525 – Thermal effects and protection against overheating</li>
            <li>Section 526 – Electrical connections (quality of joints/terminations)</li>
          </ul>
        </Card>

        {/* Worked Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6">Worked Examples</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="bg-indigo-500/10 border border-indigo-400/30 p-4 rounded-lg">
              <h3 className="font-semibold text-indigo-300 mb-2 flex items-center gap-2"><Calculator className="w-4 h-4" /> Example 1 – Using constants (copper)</h3>
              <p>Find resistance of 30 m copper, 2.5 mm², at 20°C.</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Use R ≈ 0.0172 × L ÷ A</li>
                <li>R ≈ 0.0172 × 30 ÷ 2.5 = <strong>0.206 Ω</strong></li>
                <li>Longer run or smaller CSA increases R (and voltage drop).</li>
              </ul>
            </div>
            <div className="bg-teal-500/10 border border-teal-400/30 p-4 rounded-lg">
              <h3 className="font-semibold text-teal-300 mb-2 flex items-center gap-2"><Calculator className="w-4 h-4" /> Example 2 – Temperature Correction</h3>
              <p>Same cable operating at 60°C. Approximate α for copper = 0.004 /°C.</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>ΔT = 60 − 20 = 40°C</li>
                <li>R_60 ≈ R_20 × [1 + αΔT] ≈ 0.206 × [1 + 0.004 × 40] ≈ 0.206 × 1.16 ≈ 0.239 Ω</li>
                <li>Higher T increases R, impacting voltage drop and heating.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Common Mistakes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6">Common Mistakes</h2>
          <ul className="list-disc pl-6 space-y-2 text-foreground">
            <li>Ignoring the effect of length on voltage drop in long runs.</li>
            <li>Using too small a CSA causing excessive heating and drop.</li>
            <li>Poorly made joints that create hot spots due to high contact resistance.</li>
            <li>Forgetting temperature rise and grouping factors in design.</li>
          </ul>
        </Card>

        {/* Safety Callout */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6">Safety Callout</h2>
          <div className="flex items-start gap-3 bg-background/20 border-l-4 border-emerald-500 p-4 rounded">
            <AlertTriangle className="w-5 h-5 text-emerald-400 mt-0.5" />
            <p className="text-foreground">
              High resistance joints overheat and can damage insulation or start fires. Always isolate, lock‑off and prove dead
              before tightening or re‑making connections. Follow manufacturer torque data and BS 7671 requirements.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">FAQs</h2>
          <div className="space-y-3 text-foreground text-sm">
            <p><strong>Q:</strong> Do multi‑stranded cables have lower resistance than solid of the same CSA? <br /><span className="opacity-90">A: Bulk resistance is similar for the same CSA and material at 50 Hz. Stranding mainly improves flexibility.</span></p>
            <p><strong>Q:</strong> Does temperature always increase resistance? <br /><span className="opacity-90">A: For most metals, yes. Some devices (NTC thermistors) decrease R with temperature, but fixed wiring design uses metal conductors with positive coefficients.</span></p>
            <p><strong>Q:</strong> How do I limit voltage drop on long runs? <br /><span className="opacity-90">A: Increase CSA, shorten routes, or split loads. Use Appendix 4 tables to verify limits.</span></p>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-20 p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Quick Check Quiz</h2>
          <Quiz questions={quizQuestions} />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button variant="outline" className="flex-1" asChild>
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

export default Module2Section5_3;