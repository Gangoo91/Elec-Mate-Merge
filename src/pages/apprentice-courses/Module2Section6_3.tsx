import useSEO from "@/hooks/useSEO";
import { ArrowLeft, TrendingUp, Calculator, ThermometerSun, Settings, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

import { Quiz } from "@/components/apprentice-courses/Quiz";
import EfficiencyCalculator from "@/components/apprentice-courses/EfficiencyCalculator";

const Module2Section6_3: React.FC = () => {
  useSEO(
    "Efficiency – why it matters (Module 2, 2.6.3)",
    "Understand electrical efficiency, losses and why it matters. Clear examples, BS 7671 context and an interactive efficiency calculator."
  );

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Efficiency – why it matters (Module 2, 2.6.3)",
    description:
      "Understand electrical efficiency, losses and why it matters. Clear examples, BS 7671 context and an interactive efficiency calculator.",
    articleSection: "Electrical Fundamentals",
    inLanguage: "en-GB",
    isAccessibleForFree: true,
  } as const;

  const faqs = [
    { q: "What is efficiency?", a: "Efficiency (%) = (useful output power ÷ input power) × 100. Losses (heat, sound, vibration) reduce efficiency." },
    { q: "Is efficiency always below 100%?", a: "Yes in real systems. Some input power is lost as heat and other non-useful outputs." },
    { q: "Why does it matter for BS 7671?", a: "Lower efficiency means higher current for the same useful output, which impacts cable sizing, protection and energy costs." },
    { q: "What are typical efficiency values for common equipment?", a: "LED lamps: 80-90%, transformers: 95-98%, motors: 80-95%, power supplies: 85-95%. Higher efficiency usually costs more initially but saves energy." },
    { q: "How does temperature affect efficiency?", a: "Heat generally reduces efficiency in most equipment. Good ventilation and correct ambient conditions help maintain rated efficiency." },
    { q: "Can efficiency be improved after installation?", a: "Limited options: ensure proper ventilation, clean contacts, correct loading, and consider replacing very old equipment with modern efficient alternatives." },
    { q: "What's the difference between efficiency and power factor?", a: "Efficiency is useful output ÷ total input. Power factor relates to AC phase relationships. Both affect current draw but in different ways." },
    { q: "Do voltage variations affect efficiency?", a: "Yes. Equipment typically has optimal efficiency at rated voltage. Under-voltage can reduce efficiency in motors; over-voltage can increase losses in some equipment." }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } as const;

  const quizQuestions = [
    {
      id: 1,
      question: "A motor takes 1200 W and delivers 900 W at the shaft. Efficiency is…",
      options: ["60%", "75%", "85%", "95%"],
      correctAnswer: 1,
      explanation: "η = output / input × 100 = 900/1200 × 100 = 75%.",
    },
    {
      id: 2,
      question: "If efficiency improves from 80% to 90% for same useful output, input power must…",
      options: ["increase", "stay the same", "decrease", "drop to zero"],
      correctAnswer: 2,
      explanation: "For fixed output, input = output/η. Higher η → lower input.",
    },
    {
      id: 3,
      question: "Which is a typical loss that reduces efficiency?",
      options: ["Conduction of useful power", "Heat in windings/cores", "Perfect conversion", "Power factor of 1"],
      correctAnswer: 1,
      explanation: "Heat losses (I²R, core losses) reduce efficiency.",
    },
    {
      id: 4,
      question: "A transformer input is 1.5 kW at 96% efficiency. Approx. output power?",
      options: ["1.44 kW", "1.50 kW", "1.56 kW", "0.96 kW"],
      correctAnswer: 0,
      explanation: "Output ≈ 1.5 × 0.96 = 1.44 kW.",
    },
    {
      id: 5,
      question: "Lower efficiency for same duty usually means…",
      options: ["lower current", "higher current", "no change", "zero current"],
      correctAnswer: 1,
      explanation: "More input power is needed for the same useful output → current increases (single‑phase).",
    },
    {
      id: 6,
      question: "A 40W LED lamp draws 45W from the mains. What is its efficiency?",
      options: ["89%", "95%", "40%", "112%"],
      correctAnswer: 0,
      explanation: "η = 40/45 × 100 = 88.9% ≈ 89%. The driver and lamp combined waste 5W as heat.",
    },
    {
      id: 7,
      question: "Equipment operating at 85% efficiency wastes what percentage as heat?",
      options: ["85%", "15%", "0%", "100%"],
      correctAnswer: 1,
      explanation: "If 85% becomes useful output, then 100% - 85% = 15% is wasted, mostly as heat.",
    },
    {
      id: 8,
      question: "Why might a motor's efficiency drop when heavily loaded?",
      options: ["Motors are always 100% efficient", "Overheating and increased losses", "Lower input power", "Better cooling"],
      correctAnswer: 1,
      explanation: "Overloading increases heating, resistance rises with temperature, and mechanical losses increase.",
    },
    {
      id: 9,
      question: "A power supply is 90% efficient at 100W output. What is the input power?",
      options: ["90W", "111W", "100W", "10W"],
      correctAnswer: 1,
      explanation: "Input = Output ÷ efficiency = 100 ÷ 0.90 = 111W. 11W is lost as heat.",
    },
    {
      id: 10,
      question: "Which installation factor is most likely to reduce equipment efficiency?",
      options: ["Good ventilation", "Correct voltage supply", "Excessive ambient temperature", "Proper terminations"],
      correctAnswer: 2,
      explanation: "High ambient temperature increases internal component temperatures, raising resistance and reducing efficiency.",
    },
  ] as const;

  return (
    <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1 min-h-[44px] touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2.6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-block bg-elec-yellow text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Module 2.6.3
          </span>
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Efficiency - Why it Matters
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            Plain-English efficiency for Level 2: input vs useful output, where losses go, and how it affects current, sizing and costs
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Efficiency tells you how much of the input becomes useful output.</li>
                <li>Losses (mainly heat) mean efficiency is always below 100%.</li>
                <li>Better efficiency → less input power for the same job → lower current and cost.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Motor and transformer datasheets list efficiency.</li>
                <li><strong>Use:</strong> Compare equipment and estimate running cost/current draw.</li>
                <li><strong>Check:</strong> Ventilation/cooling affects efficiency and safety.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Define efficiency and identify common losses (I²R, core losses, friction).</li>
            <li>Calculate efficiency (%) from input and output power.</li>
            <li>Estimate output from known input and efficiency (and vice‑versa).</li>
            <li>Relate efficiency to current draw, heat, cable sizing and BS 7671 considerations.</li>
          </ul>
        </section>

        {/* Content */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Plain-English overview */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2 flex items-center gap-2"><Calculator className="w-5 h-5" /> Plain-English overview</h3>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
                <p className="font-medium mb-2">What is efficiency?</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>How much of the input becomes useful output (heat, light, motion, etc.).</li>
                  <li>Always below 100% because some input becomes heat, vibration or noise.</li>
                  <li>Example: A motor taking 1000 W and delivering 800 W is about 80% efficient.</li>
                </ul>
              </div>
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/30">
                <p className="font-medium mb-2">Why it matters on site</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Lower efficiency → more input power for the same job, so higher current.</li>
                  <li>Higher current affects cable sizing, voltage drop and heat build-up.</li>
                  <li>Better efficiency reduces running cost and can improve reliability.</li>
                </ul>
              </div>
            </div>
            
            {/* Key terminology */}
            <div className="mt-4 p-4 bg-gradient-to-r from-elec-yellow/10 to-indigo-500/10 border border-border/30 rounded-lg">
              <p className="font-medium mb-2 text-blue-700 text-elec-yellow">Key terminology you'll see:</p>
              <ul className="grid md:grid-cols-2 gap-2 text-sm">
                <li><strong>P<sub>in</sub> (or Pin):</strong> Input power - total electrical power consumed</li>
                <li><strong>P<sub>out</sub> (or Pout):</strong> Output power - useful power delivered</li>
                <li><strong>η (eta):</strong> Efficiency symbol in calculations</li>
                <li><strong>Losses:</strong> Wasted power (usually as heat)</li>
              </ul>
            </div>
            
            <p className="mt-3 text-xs text-white">Tip: Good ventilation and correct installation help equipment run cooler and more efficiently.</p>
          </section>

          <InlineCheck
            id="ic-eta"
            question="A tool draws 800 W and outputs 600 W of useful power. Efficiency is…"
            options={["60%", "70%", "75%", "80%"]}
            correctIndex={2}
            explanation="η = 600/800 × 100 = 75%."
          />
          
          {/* Try it: Efficiency calculator */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2 flex items-center gap-2"><Settings className="w-5 h-5" /> Try it: Efficiency calculator</h3>
            <p className="text-sm text-white mb-3">Quickly estimate efficiency from input/output or find expected output from a known efficiency.</p>
            <EfficiencyCalculator />
          </section>

          
          {/* Examples */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2">Worked examples</h3>
            <ul className="space-y-4 text-xs sm:text-sm text-white">
              <li className="rounded-lg p-4 bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/10 border border-border/30">
                <p className="font-medium">Small motor</p>
                <p><strong>Given:</strong> P<sub>in</sub> = 1200 W, η = 85%. <strong>Find P<sub>out</sub></strong></p>
                <p><strong>P<sub>out</sub></strong> ≈ 1200 × 0.85 = 1020 W. <strong>Loss</strong> ≈ 180 W (heat) – ensure ventilation.</p>
              </li>
              <li className="rounded-lg p-4 bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/10 border border-elec-yellow/30">
                <p className="font-medium">Transformer</p>
                <p><strong>Given:</strong> P<sub>in</sub> = 2.0 kW, P<sub>out</sub> = 1.92 kW. <strong>Find η</strong></p>
                <p><strong>η</strong> ≈ 1.92/2.0 × 100 = 96%.</p>
              </li>
              <li className="rounded-lg p-4 bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-400/30">
                <p className="font-medium">LED driver + lamp</p>
                <p><strong>Given:</strong> Driver η = 90%, lamp output 18 W. <strong>Find approx. input</strong></p>
                <p><strong>P<sub>in</sub></strong> ≈ 18 ÷ 0.9 = 20 W (ignoring pf). Higher driver losses mean more heat in fittings.</p>
              </li>
              <li className="rounded-lg p-4 bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-border/30">
                <p className="font-medium">Real-world comparison</p>
                <p><strong>Scenario:</strong> Replace old 80% efficient motor with 90% efficient one for same 5kW output.</p>
                <p><strong>Old input:</strong> 5 ÷ 0.8 = 6.25 kW. <strong>New input:</strong> 5 ÷ 0.9 = 5.56 kW. <strong>Saving:</strong> 0.69 kW (11% reduction).</p>
              </li>
              <li className="rounded-lg p-4 bg-gradient-to-r from-rose-500/10 to-rose-600/10 border border-rose-400/30">
                <p className="font-medium">Energy cost impact</p>
                <p><strong>Scenario:</strong> 100W computer PSU, 85% vs 95% efficiency, 8 hours/day, 250 days/year.</p>
                <p><strong>85% efficient:</strong> 100 ÷ 0.85 = 118W input. <strong>95% efficient:</strong> 100 ÷ 0.95 = 105W input.</p>
                <p><strong>Annual saving:</strong> (118-105) × 8 × 250 ÷ 1000 = 26 kWh/year ≈ £8/year per unit.</p>
              </li>
            </ul>
          </section>

          
          {/* Real-world applications */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2 flex items-center gap-2"><Settings className="w-5 h-5" /> Real-world applications and considerations</h3>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-4 bg-gradient-to-br from-card/10 to-card/5 border border-white/10">
                <p className="font-medium mb-2 text-elec-yellow">Domestic installations</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>LED lamps: 80-90% vs old incandescent 5-10%</li>
                  <li>Boiler circulation pumps: A-rated vs older models</li>
                  <li>Heat pump efficiency (COP): 3-4 times more efficient than direct electric heating</li>
                  <li>Standby power: TVs, chargers, electronics drawing power when "off"</li>
                </ul>
              </div>
              <div className="rounded-lg p-4 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/30">
                <p className="font-medium mb-2 text-elec-yellow text-elec-yellow">Commercial/industrial</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Motor efficiency classes: IE1, IE2, IE3, IE4 (higher = more efficient)</li>
                  <li>Transformers: 95-98% typical, but 2-5% loss on large systems is significant</li>
                  <li>Power factor correction: Reduces current for same useful power</li>
                  <li>Variable speed drives: Can dramatically improve system efficiency</li>
                </ul>
              </div>
            </div>
          </section>

          
          {/* Detailed efficiency concepts */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2">Understanding efficiency in different equipment types</h3>
            
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/10 border border-border/30">
                <h4 className="font-medium mb-2 text-blue-700 text-elec-yellow">Electric Motors</h4>
                <p className="text-sm mb-2">Motor efficiency varies with load, speed, and design quality.</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Efficiency classes:</strong> IE1 (standard), IE2 (high), IE3 (premium), IE4 (super premium)</li>
                  <li><strong>Load dependency:</strong> Most efficient at 75-100% rated load</li>
                  <li><strong>Losses:</strong> Stator copper (I²R), rotor losses, iron losses, friction/windage</li>
                  <li><strong>Impact factors:</strong> Voltage imbalance, harmonics, temperature</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/10 border border-elec-yellow/30">
                <h4 className="font-medium mb-2 text-elec-yellow text-elec-yellow">Transformers</h4>
                <p className="text-sm mb-2">High efficiency devices but losses matter on large installations.</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>No-load losses:</strong> Core losses occur even when unloaded</li>
                  <li><strong>Load losses:</strong> I²R losses in windings increase with loading</li>
                  <li><strong>Typical efficiency:</strong> 95-98% at rated load</li>
                  <li><strong>Best practice:</strong> Size appropriately, avoid prolonged light loading</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-400/30">
                <h4 className="font-medium mb-2 text-amber-700 dark:text-amber-300">Power Electronics</h4>
                <p className="text-sm mb-2">LED drivers, power supplies, inverters - efficiency crucial for heat management.</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Switch-mode supplies:</strong> 80-95% efficiency typical</li>
                  <li><strong>Linear supplies:</strong> Much lower efficiency, mostly heat</li>
                  <li><strong>Heat management:</strong> Poor efficiency = more cooling needed</li>
                  <li><strong>Power factor:</strong> Not the same as efficiency but affects system current</li>
                </ul>
              </div>
            </div>
          </section>

          
          {/* Economic and environmental impact */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2">Economic and environmental considerations</h3>
            
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-lg p-4 bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-400/30">
                <h4 className="font-medium mb-2 text-green-700 dark:text-green-300">Energy costs</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Higher efficiency = lower running costs</li>
                  <li>Efficiency gains compound over equipment lifetime</li>
                  <li>Consider total cost of ownership, not just purchase price</li>
                  <li>Energy prices rising - efficiency becomes more valuable</li>
                </ul>
              </div>
              
              <div className="rounded-lg p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-border/30">
                <h4 className="font-medium mb-2 text-purple-700 text-elec-yellow">Carbon footprint</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Lower energy consumption = reduced carbon emissions</li>
                  <li>UK grid becoming cleaner, but efficiency still matters</li>
                  <li>Building regulations increasingly favour efficiency</li>
                  <li>Client awareness of environmental impact growing</li>
                </ul>
              </div>
            </div>
          </section>

          
          {/* Measurement and testing */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2">Measuring and verifying efficiency</h3>
            
            <div className="rounded-lg p-4 bg-gradient-to-r from-slate-500/10 to-slate-600/10 border border-slate-400/30">
              <p className="text-sm mb-3">While Level 2 electricians don't typically perform detailed efficiency measurements, understanding the concepts helps with:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>Equipment selection:</strong> Compare manufacturer specifications</li>
                <li><strong>Installation verification:</strong> Check equipment operates within design parameters</li>
                <li><strong>Troubleshooting:</strong> Recognize when efficiency has degraded</li>
                <li><strong>Client advice:</strong> Explain energy-saving opportunities</li>
              </ul>
              
              <div className="mt-4 p-3 bg-[#121212]/20 rounded border border-elec-yellow/30">
                <p className="text-sm"><strong>Simple check:</strong> If equipment runs much hotter than expected, efficiency may be poor. Always check ventilation, loading, and supply voltage first.</p>
              </div>
            </div>
          </section>

          
          <InlineCheck
            id="ic-loss"
            question="A device input is 500 W at 80% efficiency. Approx. loss is…"
            options={["100 W", "200 W", "400 W", "0 W"]}
            correctIndex={0}
            explanation="Pout = 500 × 0.8 = 400 W, so Loss = 500 − 400 = 100 W."
          />
          
          {/* Safety & BS 7671 context */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2 flex items-center gap-2"><ThermometerSun className="w-5 h-5" /> BS 7671 context and good practice</h3>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
              <li>Lower efficiency → higher current for same useful output. Verify cable sizing, voltage drop and Zs (Appendix 4 guidance).</li>
              <li>Consider heat build‑up: enclosures and lofts can reduce efficiency further; allow for ventilation and manufacturer instructions.</li>
              <li>Document choices; where motors are involved, note efficiency class where available.</li>
            </ul>
            <div className="flex items-start gap-3 bg-[#121212]/20 border-l-2 border-elec-yellow p-4 rounded mt-4" role="alert">
              <AlertTriangle className="w-5 h-5 text-elec-yellow mt-0.5" />
              <p className="text-white text-sm">Isolate, lock‑off and prove dead before work. Follow manufacturer instructions and BS 7671.</p>
            </div>
          </section>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">FAQs</h2>
          <ul className="space-y-3 text-xs sm:text-sm text-white">
            {faqs.map((f, i) => (
              <li key={i} className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
                <p className="font-medium mb-1">{f.q}</p>
                <p className="text-white">{f.a}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quick check quiz</h2>
          <Quiz questions={quizQuestions as any} title="Efficiency – why it matters" />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] touch-manipulation active:scale-[0.98] text-white/70 hover:text-white hover:bg-white/5" asChild>
            <Link to="../6-2"><ArrowLeft className="w-4 h-4 mr-2" />Previous</Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] touch-manipulation active:scale-[0.98] bg-elec-yellow text-[#1a1a1a]" asChild>
            <Link to="../6-4">Next<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
          </Button>
        </nav>

        {/* Structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </main>
    </div>
  );
};

export default Module2Section6_3;
