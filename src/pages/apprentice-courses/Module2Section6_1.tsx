import useSEO from "@/hooks/useSEO";
import { ArrowLeft, Zap, Calculator, Gauge, Plug, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { PowerQuickCalc } from "@/components/apprentice-courses/PowerQuickCalc";
import { FormulaList } from "@/components/apprentice-courses/FormulaList";

const quizQuestions = [
  {
    id: 1,
    question: "Which formula defines electrical power in a circuit?",
    options: ["P = V / I", "P = V × I", "P = V + I", "P = V − I"],
    correctAnswer: 1,
    explanation: "Power is the rate of energy transfer. In simple form, P = V × I (watts).",
  },
  {
    id: 2,
    question: "A 230 V kettle draws 10 A. Approximately what is its power?",
    options: ["230 W", "2.3 kW", "23 kW", "0.23 kW"],
    correctAnswer: 1,
    explanation: "P = V × I = 230 × 10 = 2300 W = 2.3 kW.",
  },
  {
    id: 3,
    question: "For AC, which statement is true about power factor (pf)?",
    options: [
      "pf only affects current, not power",
      "Real power P = V × I × pf",
      "pf is always 1",
      "pf only applies to DC",
    ],
    correctAnswer: 1,
    explanation: "In AC, real power P (kW) = voltage × current × power factor.",
  },
  {
    id: 4,
    question: "What power is dissipated as heat in a 10 Ω resistor with 5 A flowing?",
    options: ["25 W", "50 W", "100 W", "250 W"],
    correctAnswer: 3,
    explanation: "Using P = I²R = 5² × 10 = 25 × 10 = 250 W.",
  },
  {
    id: 5,
    question: "A 2 kW heater on 230 V draws about…",
    options: ["0.87 A", "8.7 A", "87 A", "0.087 A"],
    correctAnswer: 1,
    explanation: "I ≈ P / V = 2000 / 230 ≈ 8.7 A.",
  },
  {
    id: 6,
    question: "In a 3-phase 400 V system, a motor draws 10 A at pf = 0.8. What is the approximate real power?",
    options: ["2.3 kW", "4.0 kW", "5.5 kW", "6.9 kW"],
    correctAnswer: 2,
    explanation: "P ≈ √3 × 400 × 10 × 0.8 ≈ 5.5 kW.",
  },
  {
    id: 7,
    question: "A 1.5 kW heater runs for 4 hours. At 28 p/kWh, what's the cost?",
    options: ["£0.42", "£1.12", "£1.68", "£4.20"],
    correctAnswer: 2,
    explanation: "Energy = 1.5 × 4 = 6 kWh; Cost = 6 × £0.28 = £1.68.",
  },
  {
    id: 8,
    question: "230 V is applied across a 115 Ω resistor. Approximately what power is dissipated?",
    options: ["115 W", "230 W", "460 W", "920 W"],
    correctAnswer: 2,
    explanation: "P = V²/R = 230² / 115 ≈ 52900 / 115 ≈ 460 W.",
  },
];

const Module2Section6_1: React.FC = () => {
  useSEO(
    "Electrical Power (Watts) – Module 2 (2.6.1)",
    "Plain-English guide to electrical power in watts: P=VI, AC/DC, power factor, UK examples, simple calculations and BS 7671 context."
  );

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Electrical Power (Watts) – Module 2 (2.6.1)",
    description:
      "Plain-English guide to electrical power in watts: P=VI, AC/DC, power factor, UK examples, simple calculations and BS 7671 context.",
    articleSection: "Electrical Fundamentals",
    inLanguage: "en-GB",
    isAccessibleForFree: true,
  };

  const faqs = [
    { q: "What is a watt?", a: "A watt (W) is a unit of power – the rate of using or producing energy. 1 W = 1 joule per second." },
    { q: "Do AC and DC use the same formula?", a: "Yes, P = V × I, but for AC you use RMS values and include power factor: P = V × I × pf." },
    { q: "What’s kW vs kWh?", a: "kW is power (rate). kWh is energy used over time. A 2 kW heater running for 1 hour uses 2 kWh." },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2.6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <Zap className="w-6 h-6 text-emerald-400" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/5">Section 2.6.1</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">What is Electrical Power? (Watts Explained)</h1>
          <p className="text-muted-foreground">A practical, BS 7671-aligned guide to watts, kW and kWh with simple examples you can use on site.</p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Power is how fast energy is used or produced. More watts = more energy per second.</li>
                <li>P = V × I. For AC, use RMS values and include power factor (pf).</li>
                <li>kW is thousands of watts; kWh is energy over time (used for billing).</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Nameplates show W or kW. High W usually means higher current on 230 V.</li>
                <li><strong>Use:</strong> Estimate I ≈ P / V to sanity‑check cable size and protective device.</li>
                <li><strong>Check:</strong> For motors/LED drivers, consider power factor and inrush.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Explain the watt (W) and distinguish power (kW) from energy (kWh).</li>
            <li>Calculate power using P = V × I, P = I²R and P = V² / R.</li>
            <li>Apply AC real power with power factor: P = V × I × pf (RMS).</li>
            <li>Estimate current from known power and voltage to inform basic design checks.</li>
            <li>Evaluate simple energy use and running cost from kWh and tariff.</li>
            <li>Relate decisions to BS 7671 guidance on maximum demand, cable sizing and protection.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Key formulas */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-2 flex items-center gap-2"><Calculator className="w-5 h-5 text-emerald-400" /> Key formulas</h3>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
              <div className="rounded-lg p-3 sm:p-4 bg-card border border-border/30">
                <p className="font-medium mb-2">General</p>
                <FormulaList
                  items={[
                    { text: "P = V × I" },
                    { text: "1 kW = 1000 W" },
                    { text: "Energy (kWh) = kW × time (h)" },
                  ]}
                />
              </div>
              <div className="rounded-lg p-4 bg-card border border-amber-400/30">
                <p className="font-medium mb-2">With resistance</p>
                <FormulaList
                  items={[
                    { text: "P = I²R" },
                    { text: "P = V² / R" },
                  ]}
                />
                <p className="text-xs text-muted-foreground mt-2">Heaters are near unity pf; motors/LED drivers may not be.</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground"><strong>AC note:</strong> For single‑phase AC, real power P (kW) = V (V) × I (A) × pf ÷ 1000 using RMS values.</p>
          </section>

          <InlineCheck
            id="ic-power-formulas"
            question="Which formula gives power from voltage and resistance in a resistive circuit?"
            options={["P = V × I", "P = V² / R", "P = I² / V", "P = R / V"]}
            correctIndex={1}
            explanation="When resistance is known, use P = V² / R (or P = I²R if current is known)."
          />
          <Separator className="my-6" />

          {/* AC power and power factor */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-2 flex items-center gap-2"><Gauge className="w-5 h-5 text-emerald-400" /> AC power and power factor (quick view)</h3>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
              <li>Use RMS values for V and I. Real power P (kW) = V × I × pf ÷ 1000.</li>
              <li>Apparent power S (kVA) = V × I ÷ 1000; S ≥ P when pf &lt; 1.</li>
              <li>Heaters have pf ≈ 1; motors and LED drivers may have pf 0.6–0.95.</li>
            </ul>
          </section>

          <InlineCheck
            id="ic-ac-pf"
            question="For the same real power on AC, lowering power factor does what to current?"
            options={["Decreases current", "No change", "Increases current", "Makes current zero"]}
            correctIndex={2}
            explanation="P = V × I × pf, so if pf decreases, I must increase for the same P."
          />

          {/* Try it: Quick calculator */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-2">Try it: Quick calculator</h3>
            <p className="text-sm text-muted-foreground mb-3">Estimate power or current quickly for single‑phase or three‑phase (uses RMS values and pf).</p>
            <PowerQuickCalc />
          </section>
          <Separator className="my-6" />

          {/* Three‑phase basics */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-2">Three‑phase basics (UK 400/230 V)</h3>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
              <li>Typical LV: 400/230 V, 50 Hz. Line‑to‑line V<sub>L</sub> = 400 V; line‑to‑neutral V<sub>Ph</sub> = 230 V.</li>
              <li>Balanced load real power: P(kW) ≈ √3 × V<sub>L</sub>(V) × I(A) × pf ÷ 1000.</li>
              <li>Apparent power: S(kVA) ≈ √3 × V<sub>L</sub> × I ÷ 1000.</li>
              <li>Per‑phase currents are equal when loads are balanced.</li>
            </ul>
            <p className="mt-2 text-sm text-muted-foreground"><strong>Example:</strong> 400 V 3φ motor, 16 A, pf 0.9 → P ≈ 1.732 × 400 × 16 × 0.9 ≈ 9.98 kW.</p>
          </section>
          <Separator className="my-6" />

          {/* Worked examples */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-2">Worked examples</h3>
            <ul className="space-y-4 text-xs sm:text-sm text-foreground">
              <li className="rounded-lg p-3 sm:p-4 bg-card border border-border/20">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <p className="font-medium">Kettle current</p>
                    <p><strong>Given:</strong> P = 2.3 kW on 230 V. <strong>Find I</strong></p>
                    <p><strong>I ≈ P/V</strong> = 2300 / 230 ≈ 10 A. Choose cable/device to suit and allow diversity where applicable.</p>
                  </div>
                </div>
              </li>
              <li className="rounded-lg p-3 sm:p-4 bg-card border border-border/20">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                  <div>
                    <p className="font-medium">Motor real power</p>
                    <p><strong>Given:</strong> V = 230 V, I = 8 A, pf = 0.8. <strong>Find P</strong></p>
                    <p><strong>P = V × I × pf</strong> = 230 × 8 × 0.8 ≈ 1472 W ≈ 1.47 kW.</p>
                  </div>
                </div>
              </li>
              <li className="rounded-lg p-3 sm:p-4 bg-card border border-border/20">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                  <div>
                    <p className="font-medium">Heat loss in a resistor</p>
                    <p><strong>Given:</strong> I = 5 A through 10 Ω. <strong>Find P(loss)</strong></p>
                    <p><strong>P = I²R</strong> = 25 × 10 = 250 W of heat at the component – check rating and cooling.</p>
                  </div>
                </div>
              </li>
            </ul>
          </section>
          <Separator className="my-6" />

          {/* UK household examples */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-2">Everyday UK examples (typical)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-muted-foreground">
                  <tr>
                    <th className="py-2 pr-4">Appliance</th>
                    <th className="py-2 pr-4">Power</th>
                    <th className="py-2 pr-4">Approx. Current @ 230 V</th>
                  </tr>
                </thead>
                <tbody className="text-foreground">
                  <tr className="border-t border-border/20">
                    <td className="py-2 pr-4">Kettle</td>
                    <td className="py-2 pr-4">2.0–3.0 kW</td>
                    <td className="py-2 pr-4">8.7–13 A</td>
                  </tr>
                  <tr className="border-t border-border/20">
                    <td className="py-2 pr-4">Fan heater</td>
                    <td className="py-2 pr-4">2.0 kW</td>
                    <td className="py-2 pr-4">≈ 8.7 A</td>
                  </tr>
                  <tr className="border-t border-border/20">
                    <td className="py-2 pr-4">Microwave</td>
                    <td className="py-2 pr-4">0.8–1.2 kW</td>
                    <td className="py-2 pr-4">3.5–5.2 A</td>
                  </tr>
                  <tr className="border-t border-border/20">
                    <td className="py-2 pr-4">LED lamp</td>
                    <td className="py-2 pr-4">5–12 W</td>
                    <td className="py-2 pr-4">0.02–0.05 A</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3">Always verify nameplate ratings. Consider start currents and power factor for motors and electronic supplies.</p>
          </section>
          <Separator className="my-6" />

          {/* Energy and running cost */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-2">Energy and running cost</h3>
            <div className="space-y-2 text-xs sm:text-sm text-foreground">
              <p><strong>Energy (kWh)</strong> = kW × time (h). Cost ≈ kWh × tariff.</p>
              <p><strong>Example:</strong> A 2 kW heater for 3 h/day over 5 days → 2 × 3 × 5 = 30 kWh. At 30 p/kWh ≈ £9.00. Tariffs vary—check your supplier.</p>
              <p><strong>Tip:</strong> For intermittent loads, consider duty cycle when estimating energy.</p>
            </div>
          </section>
          <Separator className="my-6" />

          {/* Safety & BS 7671 context */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-2 flex items-center gap-2"><Plug className="w-5 h-5 text-emerald-400" /> Safety and BS 7671 context (guidance)</h3>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
              <li>Higher power often means higher current: check cable sizing, voltage drop and Zs after design changes (Appendix 4 guidance).</li>
              <li>Assess maximum demand/diversity (Part 3) and protective device selection (Part 4).</li>
              <li>Document and test in line with Part 6 inspection and testing requirements.</li>
            </ul>
            <div className="flex items-start gap-3 bg-background/20 border-l-4 border-emerald-500 p-4 rounded mt-4" role="alert">
              <AlertTriangle className="w-5 h-5 text-emerald-400 mt-0.5" />
              <p className="text-foreground text-sm">Isolate, lock‑off and prove dead before work. Follow manufacturer instructions and BS 7671.</p>
            </div>
          </section>
          <Separator className="my-6" />

          {/* Common mistakes */}
          <section>
            <h3 className="font-medium text-foreground mb-2">Common mistakes (avoid)</h3>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
              <li>Confusing power (kW) with energy (kWh) when estimating running costs.</li>
              <li>Ignoring power factor on AC motors/drives—current will be higher than P/V when pf &lt; 1.</li>
              <li>Using nameplate input power as output power for motors; check efficiency and pf.</li>
              <li>Overlooking cable sizing, volt drop and protective device coordination when power increases.</li>
            </ul>
          </section>
        </Card>

        {/* Power Quick Reference Pocket Guide */}
        <Card className="mb-8 p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-400" />
            Power Quick Reference (Pocket Guide)
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {/* Quick Formulas */}
            <div className="space-y-4">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3">Essential Formulas</h3>
                <div className="space-y-2 text-xs sm:text-sm text-foreground">
                  <p><strong>Basic:</strong> P = V × I</p>
                  <p><strong>Resistive:</strong> P = I²R = V²/R</p>
                  <p><strong>AC Real:</strong> P = V × I × pf</p>
                  <p><strong>3-Phase:</strong> P = √3 × VL × IL × pf</p>
                  <p><strong>Current Est:</strong> I ≈ P/V (single-phase)</p>
                </div>
              </div>
              <div className="bg-card border border-border/30 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3">Typical Power Factors</h3>
                <div className="space-y-1 text-xs sm:text-sm text-foreground">
                  <p>Resistive heaters: ~1.0</p>
                  <p>Incandescent lamps: ~1.0</p>
                  <p>LED drivers: 0.9-0.95</p>
                  <p>Fluorescent: 0.85-0.95</p>
                  <p>Small motors: 0.6-0.8</p>
                  <p>Large motors: 0.8-0.9</p>
                </div>
              </div>
            </div>
            
            {/* Quick Reference Tables */}
            <div className="space-y-4">
              <div className="bg-card border border-emerald-500/30 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3">Typical UK Appliances</h3>
                <div className="space-y-1 text-xs sm:text-sm text-foreground">
                  <p>Kettle: 2-3kW (~13A)</p>
                  <p>Electric shower: 7-10kW (~43A)</p>
                  <p>Cooker: 6-13kW (~55A)</p>
                  <p>Storage heater: 2-3kW (~13A)</p>
                  <p>Immersion: 3kW (~13A)</p>
                  <p>Washing machine: 2-3kW (~13A)</p>
                </div>
              </div>
              <div className="bg-card border border-amber-400/30 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3">Quick Checks</h3>
                <div className="space-y-1 text-xs sm:text-sm text-foreground">
                  <p>1kW ≈ 4.3A @ 230V</p>
                  <p>Motor start ≈ 5-8× run current</p>
                  <p>Diversity factor: 0.4-0.8</p>
                  <p>LED efficiency: ~100 lm/W</p>
                  <p>Heat pump COP: 2.5-4.0</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Enhanced Real-world Scenarios */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            Real-World Power Scenarios
          </h2>
          <div className="space-y-6">
            {/* Scenario 1: Kitchen Upgrade */}
            <div className="border border-border/20 rounded-lg p-4 bg-emerald-500/5">
              <h3 className="font-semibold text-foreground mb-3">Scenario 1: Kitchen Upgrade - Load Assessment</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-foreground mb-2">Client Request:</p>
                  <ul className="list-disc pl-6 space-y-1 text-foreground">
                    <li>Replace 30A cooker with induction hob (7.2kW) + separate oven (3kW)</li>
                    <li>Add coffee machine (1.5kW) and sous vide (1kW)</li>
                    <li>Existing ring main already serves kettle (3kW), microwave (1kW)</li>
                    <li>Will the existing 40A cooker circuit cope?</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">Power Analysis:</p>
                  <ul className="list-disc pl-6 space-y-1 text-foreground">
                    <li>Total appliance power: 7.2 + 3 + 1.5 + 1 = 12.7kW</li>
                    <li>Current if all on: 12,700W ÷ 230V = 55A</li>
                    <li>With diversity (0.7): 55A × 0.7 = 38.5A</li>
                    <li>40A MCB suitable, but consider usage patterns</li>
                  </ul>
                </div>
              </div>
              <div className="mt-3 p-3 bg-card border border-emerald-500/30 rounded text-sm">
                <p className="font-medium text-emerald-400 mb-1">Solution:</p>
                <p className="text-foreground">40A circuit adequate with diversity, but recommend separate 20A circuit for new appliances to avoid overloading and provide flexibility.</p>
              </div>
            </div>

            {/* Scenario 2: Workshop Motor */}
            <div className="border border-border/20 rounded-lg p-4 bg-card">
              <h3 className="font-semibold text-foreground mb-3">Scenario 2: Workshop Motor - Starting Issues</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-foreground mb-2">Problem:</p>
                  <ul className="list-disc pl-6 space-y-1 text-foreground">
                    <li>3-phase 5.5kW motor won't start reliably</li>
                    <li>Lights dim severely when starting attempted</li>
                    <li>50A MCB sometimes trips on start</li>
                    <li>Motor nameplate: 11A, pf 0.8, 1450 rpm</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">Analysis:</p>
                  <ul className="list-disc pl-6 space-y-1 text-foreground">
                    <li>Running current: 11A per phase ✓</li>
                    <li>Starting current: ~6 × 11A = 66A per phase</li>
                    <li>Suggests excessive voltage drop or weak supply</li>
                    <li>Need to check supply impedance and cable sizing</li>
                  </ul>
                </div>
              </div>
              <div className="mt-3 p-3 bg-card border border-border/30 rounded text-sm">
                <p className="font-medium text-emerald-400 mb-1">Solution:</p>
                <p className="text-foreground">Install soft-starter to limit starting current to 2-3× full load, or check if supply cable needs upgrading. Consider star-delta starter for fixed loads.</p>
              </div>
            </div>

            {/* Scenario 3: LED Retrofit */}
            <div className="border border-border/20 rounded-lg p-4 bg-emerald-500/5">
              <h3 className="font-semibold text-foreground mb-3">Scenario 3: Office LED Retrofit - Power Savings</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-foreground mb-2">Current Setup:</p>
                  <ul className="list-disc pl-6 space-y-1 text-foreground">
                    <li>100× 58W fluorescent fittings + ballasts</li>
                    <li>Total load: ~70W per fitting = 7kW</li>
                    <li>Operating 12 hours/day, 250 days/year</li>
                    <li>Current circuit loading: 7000W ÷ 230V = 30A</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">LED Retrofit:</p>
                  <ul className="list-disc pl-6 space-y-1 text-foreground">
                    <li>100× 28W LED fittings (same light output)</li>
                    <li>Total load: 28W × 100 = 2.8kW</li>
                    <li>Circuit loading: 2800W ÷ 230V = 12A</li>
                    <li>Power reduction: 60% saving</li>
                  </ul>
                </div>
              </div>
              <div className="mt-3 p-3 bg-card border border-emerald-500/30 rounded text-sm">
                <p className="font-medium text-emerald-400 mb-1">Benefits:</p>
                <p className="text-foreground">Annual saving: 4.2kW × 3000h × £0.30/kWh = £3,780. Reduced circuit loading allows future expansion without rewiring.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Real‑world scenario */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Power Factor in Practice</h2>
          <div className="space-y-3 text-xs sm:text-sm text-foreground">
            <p><strong>Job:</strong> Fit a 2 kW panel heater and a small 0.75 kW single‑phase extractor (pf 0.8) in a utility room.</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Estimate currents:</strong> Heater I ≈ 2000/230 ≈ 8.7 A. Fan input P ≈ 750/eff. If efficiency ≈ 0.85, input ≈ 882 W → I ≈ 882/(230×0.8) ≈ 4.8 A.</li>
              <li><strong>Demand:</strong> Consider simultaneity—heater and fan may run together → ≈ 13.5 A. Apply diversity as appropriate to the circuit design (BS 7671 Part 3 guidance).</li>
              <li><strong>Cable/device:</strong> Select protective device and cable per Appendix 4 (current‑carrying capacity, volt drop, installation method). Check Zs and disconnection times.</li>
              <li><strong>Energy/cost:</strong> Heater 2 kW for 4 h/day over 5 days → 40 kWh. At 28 p/kWh ≈ £11.20/week (illustrative).</li>
              <li><strong>Documentation:</strong> Test, record and update schedules in line with Part 6.</li>
            </ol>
          </div>
        </Card>

        {/* FAQ */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <ul className="space-y-3 text-xs sm:text-sm text-foreground">
            {faqs.map((f, i) => (
              <li key={i} className="rounded-lg p-3 sm:p-4 bg-card border border-border/20">
                <p className="font-medium mb-1">{f.q}</p>
                <p className="text-muted-foreground">{f.a}</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Summary</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Power (W/kW) is the rate of energy use; energy (kWh) is power over time.</li>
            <li>Core formulas: P = V × I, P = I²R, P = V²/R; for AC include power factor.</li>
            <li>Estimate current from power to support quick cable and device checks.</li>
            <li>Relate selections to BS 7671: maximum demand, cable sizing, protection and verification.</li>
          </ul>
          <div className="mt-4">
            <h3 className="font-medium text-foreground mb-2">Quick checklist</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-foreground">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" /> Identify power (W/kW) on the nameplate and estimate current (I ≈ P/V).</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" /> For AC motors/drivers, check power factor and starting current.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" /> Confirm cable sizing, voltage drop and protective device ratings.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" /> Re‑test and record to BS 7671 after modifications.</li>
            </ul>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-16 p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Quick check quiz</h2>
          <Quiz questions={quizQuestions} title="Electrical Power (Watts)" />
        </Card>

        {/* Structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </main>
    </div>
  );
};

export default Module2Section6_1;
