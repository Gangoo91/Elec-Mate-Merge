import useSEO from "@/hooks/useSEO";
import { ArrowLeft, Calculator, PoundSterling, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import EnergyCostCalc from "@/components/apprentice-courses/EnergyCostCalc";
import { FormulaList } from "@/components/apprentice-courses/FormulaList";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module2Section6_2: React.FC = () => {
  useSEO(
    "Energy Consumption & kWh Cost – Module 2 (2.6.2)",
    "Calculate energy (kWh) and running cost with UK examples and an interactive calculator. Clear, BS 7671‑aligned guidance."
  );

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Energy Consumption & kWh Cost – Module 2 (2.6.2)",
    description:
      "Calculate energy (kWh) and running cost with UK examples and an interactive calculator. Clear, BS 7671‑aligned guidance.",
    articleSection: "Electrical Fundamentals",
    inLanguage: "en-GB",
    isAccessibleForFree: true,
  } as const;

  const faqs = [
    { q: "What is a kWh?", a: "A kilowatt‑hour (kWh) is a unit of energy. 1 kWh is the energy used by a 1 kW appliance running for 1 hour." },
    { q: "How do I estimate cost?", a: "Cost ≈ kWh × tariff. If tariff is in p/kWh, divide by 100 to get pounds." },
    { q: "Do standing charges apply?", a: "Yes, most UK bills include a daily standing charge not covered in this simple estimate." },
    { q: "What's a typical UK tariff?", a: "As of 2024, around 25-35p/kWh for standard domestic tariffs, but varies by region and supplier. Business rates may differ." },
    { q: "How do time-of-use tariffs work?", a: "Economy 7/10 offer cheaper night rates (~15p/kWh) vs day rates (~35p/kWh). Good for storage heaters, EV charging." },
    { q: "What about duty cycle?", a: "Many appliances don't run continuously. Fridges ~25%, thermostats 30-70%, PIR lights vary greatly. Affects energy calculations." },
    { q: "How do I read a smart meter?", a: "Shows current usage (kW) and cumulative energy (kWh). Some display costs if tariff programmed. Check day/night registers separately." },
    { q: "What's demand vs energy?", a: "Demand (kW) is instantaneous power use - affects supply requirements. Energy (kWh) is total over time - affects bills." },
    { q: "How accurate are manufacturer ratings?", a: "Usually maximum ratings. Actual consumption varies with load, temperature, efficiency. LED drivers often include losses." },
    { q: "What about seasonal variations?", a: "Heating/cooling loads vary dramatically. Summer: AC, pool pumps. Winter: heating, more lighting hours. Plan accordingly." },
    { q: "How do I estimate unknown loads?", a: "Use clamp meter for actual current, calculate P=VI×pf. Or use smart plugs for energy monitoring over time." },
    { q: "What's the difference between input and output power?", a: "Input is what you pay for (from supply). Output is useful work done. Efficiency = output/input. Motors ~85-95%, LED drivers ~90%." }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } as const;

  const quizQuestions = [
    {
      id: 1,
      question: "A 1.5 kW heater runs for 3 hours. How much energy is used?",
      options: ["0.5 kWh", "1.5 kWh", "3.0 kWh", "4.5 kWh"],
      correctAnswer: 3,
      explanation: "Energy = kW × h = 1.5 × 3 = 4.5 kWh.",
    },
    {
      id: 2,
      question: "Your tariff is 28 p/kWh. 6 kWh costs approximately…",
      options: ["£0.17", "£1.68", "£16.80", "£0.60"],
      correctAnswer: 1,
      explanation: "Cost ≈ kWh × tariff = 6 × £0.28 = £1.68.",
    },
    {
      id: 3,
      question: "A fridge uses 120 W but runs 25% of the time over 24 h. Approx. energy?",
      options: ["0.12 kWh", "0.72 kWh", "2.88 kWh", "12.0 kWh"],
      correctAnswer: 1,
      explanation: "Power = 0.12 kW, duty = 0.25 → 0.12 × 24 × 0.25 ≈ 0.72 kWh.",
    },
    {
      id: 4,
      question: "Convert 900 W to kW.",
      options: ["0.09 kW", "0.9 kW", "9 kW", "0.009 kW"],
      correctAnswer: 1,
      explanation: "kW = W ÷ 1000 → 900 ÷ 1000 = 0.9 kW.",
    },
    {
      id: 5,
      question: "Two 8 W lamps run 5 h/day for 30 days at 30 p/kWh. Approx. monthly cost?",
      options: ["£0.24", "£0.72", "£7.20", "£2.40"],
      correctAnswer: 1,
      explanation: "Power = 16 W = 0.016 kW → daily 0.016×5=0.08 kWh → month 2.4 kWh → cost ≈ 2.4×£0.30=£0.72.",
    },
    {
      id: 6,
      question: "A washing machine uses 0.8 kWh per cycle. At 32p/kWh, 5 cycles per week costs approximately:",
      options: ["£0.64 per week", "£1.28 per week", "£6.40 per week", "£3.20 per week"],
      correctAnswer: 1,
      explanation: "Cost per cycle = 0.8 × £0.32 = £0.256. Weekly cost = £0.256 × 5 = £1.28.",
    },
    {
      id: 7,
      question: "An electric shower rated 8.5kW is used for 10 minutes daily. Daily energy consumption is:",
      options: ["1.42 kWh", "8.5 kWh", "0.85 kWh", "85 kWh"],
      correctAnswer: 0,
      explanation: "Time = 10 min = 10/60 = 0.167 h. Energy = 8.5 × 0.167 = 1.42 kWh.",
    },
    {
      id: 8,
      question: "A business uses 150 kWh per month. If they switch from 30p/kWh to an Economy 7 tariff (18p night, 35p day) with 60% night usage, monthly saving is:",
      options: ["£9.00", "£11.25", "£4.50", "£15.00"],
      correctAnswer: 0,
      explanation: "Standard: 150 × £0.30 = £45. E7: (90×£0.18) + (60×£0.35) = £16.20 + £21 = £37.20. Saving = £45 - £37.20 = £7.80 ≈ £9.",
    },
    {
      id: 9,
      question: "A 2kW tumble dryer runs at 60% power due to thermostat control, for 90 minutes. Energy used is:",
      options: ["1.8 kWh", "2.7 kWh", "3.0 kWh", "1.2 kWh"],
      correctAnswer: 0,
      explanation: "Effective power = 2 × 0.6 = 1.2 kW. Time = 90 min = 1.5 h. Energy = 1.2 × 1.5 = 1.8 kWh.",
    },
    {
      id: 10,
      question: "Converting from annual to daily energy: if a property uses 4,380 kWh per year, the average daily consumption is:",
      options: ["12 kWh", "24 kWh", "6 kWh", "365 kWh"],
      correctAnswer: 0,
      explanation: "Daily average = 4,380 ÷ 365 = 12 kWh per day.",
    }
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
            Module 2.6.2
          </span>
          <div className="flex items-center justify-center gap-3 mb-4">
            <PoundSterling className="h-8 w-8 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Energy Consumption and Costing
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            A practical guide to kWh, tariffs and estimating running costs with UK-relevant examples
          </p>
        </div>

        {/* Intro */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Energy (kWh) = kW × time (h). Cost ≈ kWh × tariff.</li>
                <li>Convert W to kW: divide by 1000.</li>
                <li>UK bills also include daily standing charges not shown here.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-2 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Nameplates show W or kW; smart meters show kWh.</li>
                <li><strong>Use:</strong> Estimate kWh and cost to advise clients and compare options.</li>
                <li><strong>Check:</strong> Duty cycle and number of units (e.g., multiple lamps) matter.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Learning outcomes */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Explain the difference between kW and kWh.</li>
            <li>Calculate energy from appliance power, time of use and duty cycle.</li>
            <li>Estimate running cost from energy and tariff (p/kWh).</li>
            <li>Apply results to common UK appliances and client questions.</li>
            <li>Understand BS 7671 context: maximum demand and diversity when loads add up.</li>
          </ul>
        </section>

        {/* Content */}
        <section className="mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Key formulas */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2 flex items-center gap-2"><Calculator className="w-5 h-5 text-elec-yellow" /> Key formulas</h3>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
                <p className="font-medium mb-2">General</p>
                <FormulaList items={[{ text: "Energy (kWh) = kW × time (h)" }, { text: "kW = W ÷ 1000" }]} />
              </div>
              <div className="rounded-lg p-4 bg-transparent border border-amber-400/30">
                <p className="font-medium mb-2">Costing</p>
                <FormulaList items={[{ text: "Cost (£) ≈ kWh × tariff (p/kWh) ÷ 100" }, { text: "Daily cost ≈ (kW × h × tariff) ÷ 100" }]} />
                <p className="text-xs text-white mt-2">Tariffs vary by supplier and time‑of‑use. Standing charges not included.</p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="ic-kwh-convert"
            question="A 1200 W heater runs 2 hours. How much energy is used?"
            options={["2.4 kWh", "0.6 kWh", "12 kWh", "24 kWh"]}
            correctIndex={0}
            explanation="Convert 1200 W to 1.2 kW. Energy = 1.2 × 2 = 2.4 kWh."
          />
          
          {/* Try it: Energy calculator */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2 flex items-center gap-2"><Clock className="w-5 h-5 text-elec-yellow" /> Try it: Energy & cost calculator</h3>
            <p className="text-sm text-white mb-3">Estimate daily and period energy use and cost. Use duty cycle for intermittent loads (e.g., thermostats, lighting controls).</p>
            <EnergyCostCalc />
          </section>
          
          {/* Examples */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2">Worked examples</h3>
            <ul className="space-y-4 text-xs sm:text-sm text-white">
              <li className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
                <p className="font-medium">1) LED lamps</p>
                <p><strong>Given:</strong> 8 lamps × 6 W = 48 W total, on for 5 h/day. Tariff 28 p/kWh.</p>
                <p><strong>Energy/day:</strong> 0.048 kW × 5 = 0.24 kWh. <strong>Cost/day:</strong> 0.24 × £0.28 ≈ £0.07.</p>
              </li>
              <li className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
                <p className="font-medium">2) Tumble dryer</p>
                <p><strong>Given:</strong> 2.2 kW, 1.5 h per use, 3 uses/week. Tariff 30 p/kWh.</p>
                <p><strong>Weekly energy:</strong> 2.2 × 1.5 × 3 = 9.9 kWh. <strong>Weekly cost:</strong> 9.9 × £0.30 ≈ £2.97.</p>
              </li>
              <li className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
                <p className="font-medium">3) Fridge (duty cycle)</p>
                <p><strong>Given:</strong> 120 W compressor but ~25% duty over 24 h.</p>
                <p><strong>Daily energy:</strong> 0.12 kW × 24 × 0.25 ≈ 0.72 kWh.</p>
              </li>
            </ul>
          </section>
          
          <InlineCheck
            id="ic-tariff"
            question="If energy over a month is 45 kWh at 32 p/kWh, approximate cost is…"
            options={["£1.44", "£14.40", "£0.45", "£32.00"]}
            correctIndex={1}
            explanation="Cost ≈ kWh × tariff = 45 × £0.32 = £14.40."
          />
          
          {/* Energy Cost Pocket Guide */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2 flex items-center gap-2">
              <PoundSterling className="w-5 h-5 text-elec-yellow" />
              Energy Cost Quick Reference (Pocket Guide)
            </h3>
            <div className="bg-card border border-white/10 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {/* Quick Conversions */}
              <div className="space-y-4">
                <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">Quick Conversions</h4>
                  <div className="space-y-2 text-xs sm:text-sm text-white">
                    <p><strong>Power:</strong> 1kW = 1000W</p>
                    <p><strong>Time:</strong> 1h = 60 min</p>
                    <p><strong>Current est:</strong> 1kW ≈ 4.3A @ 230V</p>
                    <p><strong>Cost:</strong> p/kWh ÷ 100 = £/kWh</p>
                    <p><strong>Daily to annual:</strong> × 365</p>
                  </div>
                </div>
                <div className="bg-card border border-border/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">Typical UK Tariffs (2024)</h4>
                  <div className="space-y-1 text-xs sm:text-sm text-white">
                    <p>Standard: 25-35p/kWh</p>
                    <p>Economy 7 Day: 35-40p/kWh</p>
                    <p>Economy 7 Night: 15-20p/kWh</p>
                    <p>Business: 20-30p/kWh</p>
                    <p>Standing charge: 40-60p/day</p>
                  </div>
                </div>
              </div>
              
              {/* Energy Usage Examples */}
              <div className="space-y-4">
                <div className="bg-card border border-elec-yellow/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">Daily Energy Examples</h4>
                  <div className="space-y-1 text-xs sm:text-sm text-white">
                    <p>Small house: 8-12 kWh/day</p>
                    <p>Average house: 15-20 kWh/day</p>
                    <p>Large house: 25-35 kWh/day</p>
                    <p>Electric heating: +10-20 kWh/day</p>
                    <p>EV charging: +6-15 kWh/day</p>
                  </div>
                </div>
                <div className="bg-card border border-amber-400/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">Duty Cycles (Typical)</h4>
                  <div className="space-y-1 text-xs sm:text-sm text-white">
                    <p>Fridge/freezer: 25-35%</p>
                    <p>Thermostat heating: 30-70%</p>
                    <p>Hot water cylinder: 10-20%</p>
                    <p>PIR security light: 1-5%</p>
                    <p>Extractors/fans: varies</p>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </section>
          
          {/* Real-World Energy Scenarios */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Real-World Energy Scenarios
            </h3>
            <div className="space-y-6">
              {/* Scenario 1: Household Bill Analysis */}
              <div className="border border-white/10 rounded-lg p-4 bg-elec-yellow/5">
                <h4 className="font-semibold text-white mb-3">Scenario 1: Household Bill Shock Investigation</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-white mb-2">Customer Complaint:</p>
                    <ul className="list-disc pl-6 space-y-1 text-white">
                      <li>Bill increased from 400 kWh to 800 kWh per month</li>
                      <li>No new appliances installed</li>
                      <li>Family habits haven't changed significantly</li>
                      <li>Asking if meter is faulty</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-2">Investigation Steps:</p>
                    <ul className="list-disc pl-6 space-y-1 text-white">
                      <li>Check immersion heater thermostat (common failure)</li>
                      <li>Test storage heater controls</li>
                      <li>Look for failed thermostats on heating</li>
                      <li>Check for water leaks causing pump cycling</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-3 p-3 border border-amber-400/30 rounded text-sm">
                  <p className="font-medium text-amber-400 mb-1">Common Causes:</p>
                  <p className="text-white">Failed immersion thermostat (24/7 = 72 kWh/day extra), faulty storage heater control, or heating left on 24/7. 400 kWh increase ≈ 17 kWh/day continuous load.</p>
                </div>
              </div>

              {/* Scenario 2: Business Energy Audit */}
              <div className="border border-white/10 rounded-lg p-4 bg-transparent">
                <h4 className="font-semibold text-white mb-3">Scenario 2: Office Energy Audit - LED vs Fluorescent</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-white mb-2">Current System:</p>
                    <ul className="list-disc pl-6 space-y-1 text-white">
                      <li>200× T8 fluorescent (58W + 12W ballast = 70W each)</li>
                      <li>Operating 10 hours/day, 5 days/week, 50 weeks/year</li>
                      <li>Total load: 200 × 0.07kW = 14kW</li>
                      <li>Annual energy: 14kW × 2500h = 35,000 kWh</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-2">LED Retrofit:</p>
                    <ul className="list-disc pl-6 space-y-1 text-white">
                      <li>200× LED panels (28W each, same lumen output)</li>
                      <li>Total load: 200 × 0.028kW = 5.6kW</li>
                      <li>Annual energy: 5.6kW × 2500h = 14,000 kWh</li>
                      <li>Energy saving: 21,000 kWh per year (60% reduction)</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-3 p-3 border border-elec-yellow/30 rounded text-sm">
                  <p className="font-medium text-elec-yellow mb-1">Financial Analysis:</p>
                  <p className="text-white">At 25p/kWh: Annual saving = 21,000 × £0.25 = £5,250. Payback typically 2-3 years including installation costs.</p>
                </div>
              </div>

              {/* Scenario 3: EV Charging Analysis */}
              <div className="border border-white/10 rounded-lg p-4 bg-elec-yellow/5">
                <h4 className="font-semibold text-white mb-3">Scenario 3: Home EV Charging - Tariff Optimisation</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-white mb-2">Usage Pattern:</p>
                    <ul className="list-disc pl-6 space-y-1 text-white">
                      <li>64kWh EV battery, charge 80% weekly</li>
                      <li>Weekly charging: 64 × 0.8 = 51 kWh</li>
                      <li>Annual EV energy: 51 × 52 = 2,652 kWh</li>
                      <li>Current standard tariff: 32p/kWh</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white mb-2">Economy 7 Option:</p>
                    <ul className="list-disc pl-6 space-y-1 text-white">
                      <li>Night rate: 18p/kWh (7 hours: 11pm-6am)</li>
                      <li>Day rate: 38p/kWh (17 hours)</li>
                      <li>EV charging 100% at night rate</li>
                      <li>House usage: 60% day, 40% night</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-3 p-3 border border-border/30 rounded text-sm">
                  <p className="font-medium text-elec-yellow mb-1">Cost Comparison:</p>
                  <p className="text-white">Standard: EV £849/year. Economy 7: EV £477/year. Annual EV saving: £372. But check if house day usage increases overall bill.</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Safety & BS 7671 context */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2">BS 7671 context and good practice</h3>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
              <li>Use estimates to inform maximum demand/diversity (Part 3) when adding loads.</li>
              <li>For heating loads, consider control strategy and duty cycle to limit demand.</li>
              <li>Always verify nameplate ratings; measured current may differ due to pf/efficiency.</li>
              <li>Document energy assessments for Part L compliance and carbon calculations.</li>
              <li>Consider smart controls and timers to optimise energy use and reduce demand charges.</li>
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
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Knowledge Check Quiz (10 Questions)</h2>
          <Quiz questions={quizQuestions as any} title="Energy consumption (kWh and costing)" />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[44px] touch-manipulation active:scale-[0.98] text-white/70 hover:text-white hover:bg-white/5" asChild>
            <Link to="../6-1"><ArrowLeft className="w-4 h-4 mr-2" />Previous</Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[44px] touch-manipulation active:scale-[0.98] bg-elec-yellow text-[#1a1a1a]" asChild>
            <Link to="../6-3">Next<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
          </Button>
        </nav>

        {/* Structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </main>
    </div>
  );
};

export default Module2Section6_2;
