import useSEO from "@/hooks/useSEO";
import { ArrowLeft, Battery, Clock, AlertTriangle, Coins, CheckCircle, XCircle, BookOpen, Calculator, Zap, Eye, CircuitBoard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { EnergyCostCalc } from "@/components/apprentice-courses/EnergyCostCalc";

const TITLE = "Energy, kWh and Cost";
const DESCRIPTION = "Understand kWh, convert time and estimate running cost with realistic examples for Level 2 learners in the UK.";

const quickCheckQuestions = [
  {
    id: "power-time-conversion",
    question: "Convert 45 minutes to hours for energy calculations.",
    options: ["0.45 h", "0.75 h", "4.5 h", "45 h"],
    correctIndex: 1,
    explanation: "45 minutes ÷ 60 = 0.75 hours. Always convert to decimal hours for energy calculations."
  },
  {
    id: "energy-calculation",
    question: "A 2 kW heater runs for 30 minutes. Energy used is:",
    options: ["1 kWh", "2 kWh", "0.5 kWh", "4 kWh"],
    correctIndex: 0,
    explanation: "2 kW × 0.5 h = 1 kWh. Remember to convert 30 minutes to 0.5 hours first."
  },
  {
    id: "cost-calculation",
    question: "At 30p per kWh, what does 4 kWh cost (excluding standing charge)?",
    options: ["£0.12", "£1.20", "£12.00", "£4.30"],
    correctIndex: 1,
    explanation: "4 kWh × £0.30 = £1.20. Standing charges are additional daily costs."
  }
];

const Module2Section2_5: React.FC = () => {
  useSEO(TITLE, DESCRIPTION);

  const quizQuestions = [
    { 
      id: 1, 
      question: "A 1 kW heater runs for 2 hours. Energy consumed is:", 
      options: ["0.5 kWh", "1 kWh", "2 kWh", "3 kWh"], 
      correctAnswer: 2, 
      explanation: "Energy = Power × Time. 1 kW × 2 h = 2 kWh." 
    },
    { 
      id: 2, 
      question: "A 500W appliance runs for 3 hours. Energy used is:", 
      options: ["1.5 kWh", "15 kWh", "0.15 kWh", "3.5 kWh"], 
      correctAnswer: 0, 
      explanation: "Convert to kW first: 500W = 0.5 kW. Then: 0.5 kW × 3 h = 1.5 kWh." 
    },
    { 
      id: 3, 
      question: "What's the cost of 4 kWh at 30p per kWh (excluding standing charge)?", 
      options: ["£0.12", "£1.20", "£12", "£0.04"], 
      correctAnswer: 1, 
      explanation: "Cost = Energy × Unit rate. 4 kWh × £0.30 = £1.20." 
    },
    { 
      id: 4, 
      question: "Which change most effectively reduces energy consumption?", 
      options: ["Increasing voltage", "Reducing running time", "Changing wire colour", "Longer cable runs"], 
      correctAnswer: 1, 
      explanation: "Energy = Power × Time. Reducing running time directly reduces energy consumption." 
    },
    { 
      id: 5, 
      question: "Best method for quick energy estimates?", 
      options: ["Pure guesswork", "Power (kW) × Hours", "Hours ÷ Power", "Power (W) × Minutes"], 
      correctAnswer: 1, 
      explanation: "E = P × t. Use Power in kW multiplied by time in hours for kWh." 
    },
    { 
      id: 6, 
      question: "A 3kW immersion heater runs for 1.5 hours. Energy used:", 
      options: ["2 kWh", "4.5 kWh", "1.5 kWh", "3 kWh"], 
      correctAnswer: 1, 
      explanation: "3 kW × 1.5 h = 4.5 kWh." 
    },
    { 
      id: 7, 
      question: "Standing charge on UK electricity bills is:", 
      options: ["Per kWh used", "Fixed daily amount", "Only for businesses", "Included in unit rate"], 
      correctAnswer: 1, 
      explanation: "Standing charge is a fixed daily cost regardless of energy consumption." 
    },
    { 
      id: 8, 
      question: "On Economy 7 tariff, when is electricity typically cheapest?", 
      options: ["Peak hours (4-7 PM)", "Night hours (00:30-07:30)", "Weekends only", "Summer months"], 
      correctAnswer: 1, 
      explanation: "Economy 7 offers cheaper rates during night hours, typically 00:30-07:30." 
    }
  ];

  const faqs = [
    { 
      q: "What exactly is a kilowatt-hour (kWh)?", 
      a: "A kWh is the amount of energy consumed when 1 kilowatt of power is used for 1 hour. It's the standard billing unit for electricity in the UK." 
    },
    { 
      q: "Why do identical appliances have different running costs?", 
      a: "Running costs depend on usage patterns, not just power rating. A 2kW heater used 2 hours daily costs twice as much as one used 1 hour daily." 
    },
    { 
      q: "How much do voltage fluctuations affect energy consumption?", 
      a: "Small voltage variations (±6%) have minimal impact on energy calculations. Usage time and actual power consumption are the dominant factors." 
    },
    { 
      q: "How accurate are energy cost estimates?", 
      a: "Estimates are good for planning and comparisons. For precise figures, use energy monitoring equipment to measure actual consumption patterns." 
    },
    { 
      q: "What's the difference between power and energy?", 
      a: "Power (kW) is the rate of energy use - how fast electricity is consumed. Energy (kWh) is the total amount consumed over time - what you pay for." 
    },
    { 
      q: "How do time-of-use tariffs affect calculations?", 
      a: "Different rates apply at different times. Peak rates can be 2-3 times higher than off-peak. Always check which rate applies when calculating costs." 
    }
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    inLanguage: "en-GB",
    isAccessibleForFree: true,
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 2
            </Link>
          </Button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Page Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Battery className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 2.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">{TITLE}</h1>
          <p className="text-white">Energy is power over time. Calculate kWh and estimate costs for electrical installations and efficiency improvements.</p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <p className="text-sm">
                Energy (kWh) = Power (kW) × Time (hours). Convert watts to kilowatts (÷1000) and minutes to hours (÷60). 
                Multiply kWh by your unit rate (p/kWh) plus standing charge for total cost. Essential for client advice on running costs.
              </p>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <p className="text-sm">
                Check appliance nameplates for power ratings. Time usage patterns (daily/weekly). Apply correct tariff rates 
                (Economy 7, peak/off-peak). Calculate payback periods for energy-efficient upgrades.
              </p>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-white">
            <li>Calculate energy using E = P × t formula</li>
            <li>Convert power and time units accurately</li>
            <li>Estimate electricity costs using UK tariffs</li>
            <li>Apply energy calculations for client advice</li>
            <li>Compare appliance efficiency and running costs</li>
            <li>Use energy monitoring for verification</li>
          </ul>
        </Card>

        {/* Interactive Calculator */}
        <EnergyCostCalc />

        {/* Understanding Energy vs Power */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Understanding Energy vs Power</h2>
          <div className="space-y-4">
            <p className="text-white">
              Energy and power are often confused, but understanding the difference is crucial for accurate calculations and client advice.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card p-4 rounded-lg border border-white/10">
                <h3 className="font-semibold text-white mb-2">Power (kW)</h3>
                <p className="text-sm text-white mb-2">Rate of energy consumption</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• How fast electricity is used</li>
                  <li>• Nameplate rating on appliances</li>
                  <li>• Units: Watts (W) or Kilowatts (kW)</li>
                </ul>
              </div>
              <div className="bg-card p-4 rounded-lg border border-white/10">
                <h3 className="font-semibold text-white mb-2">Energy (kWh)</h3>
                <p className="text-sm text-white mb-2">Total electricity consumed</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Power multiplied by time</li>
                  <li>• What appears on electricity bills</li>
                  <li>• Units: Kilowatt-hours (kWh)</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-[#121212]/20 border-l-4 border-elec-yellow p-4 rounded">
              <p className="text-white text-sm">
                <strong>Key Formula:</strong> Energy (kWh) = Power (kW) × Time (hours)
              </p>
            </div>
          </div>
        </Card>

        {/* Step-by-Step Worked Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Step-by-Step Worked Examples</h2>
          <div className="space-y-6">
            
            {/* Example 1 */}
            <div className="bg-[#121212]/50 p-4 rounded-lg border border-white/10">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <span className="bg-elec-yellow text-black w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Kettle Energy Consumption
              </h3>
              <div className="space-y-3 text-sm">
                <p className="text-white"><strong>Scenario:</strong> Customer asks about the cost of boiling their 2kW kettle 4 times daily.</p>
                <div className="bg-card p-3 rounded border-l-4 border-elec-yellow">
                  <p className="text-white"><strong>Given:</strong> P = 2kW, 4 boils per day, 3 minutes each</p>
                  <p className="text-white"><strong>Step 1:</strong> Convert time: 3 minutes = 3÷60 = 0.05 hours</p>
                  <p className="text-white"><strong>Step 2:</strong> Daily time: 4 × 0.05 = 0.2 hours</p>
                  <p className="text-white"><strong>Step 3:</strong> Daily energy: 2kW × 0.2h = 0.4 kWh</p>
                  <p className="text-elec-yellow"><strong>Result:</strong> 0.4 kWh daily, 12 kWh monthly</p>
                </div>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-[#121212]/50 p-4 rounded-lg border border-white/10">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <span className="bg-elec-yellow text-black w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Immersion Heater Cost Calculation
              </h3>
              <div className="space-y-3 text-sm">
                <p className="text-white"><strong>Scenario:</strong> 3kW immersion heater runs 1.5 hours daily. What's the monthly cost?</p>
                <div className="bg-card p-3 rounded border-l-4 border-elec-yellow">
                  <p className="text-white"><strong>Given:</strong> P = 3kW, t = 1.5h daily, tariff = 30p/kWh</p>
                  <p className="text-white"><strong>Step 1:</strong> Daily energy: 3kW × 1.5h = 4.5 kWh</p>
                  <p className="text-white"><strong>Step 2:</strong> Monthly energy: 4.5 × 30 = 135 kWh</p>
                  <p className="text-white"><strong>Step 3:</strong> Energy cost: 135 × £0.30 = £40.50</p>
                  <p className="text-elec-yellow"><strong>Result:</strong> £40.50 monthly (plus standing charge)</p>
                </div>
              </div>
            </div>

            {/* Example 3 */}
            <div className="bg-[#121212]/50 p-4 rounded-lg border border-white/10">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <span className="bg-elec-yellow text-black w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                Economy 7 Savings Comparison
              </h3>
              <div className="space-y-3 text-sm">
                <p className="text-white"><strong>Scenario:</strong> Storage heater using 6kW for 7 hours (night rate) vs day rate.</p>
                <div className="bg-card p-3 rounded border-l-4 border-elec-yellow">
                  <p className="text-white"><strong>Energy:</strong> 6kW × 7h = 42 kWh daily</p>
                  <p className="text-white"><strong>Night rate:</strong> 42 × £0.20 = £8.40</p>
                  <p className="text-white"><strong>Day rate:</strong> 42 × £0.35 = £14.70</p>
                  <p className="text-elec-yellow"><strong>Savings:</strong> £6.30 daily (£189 monthly) with Economy 7</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* UK Electricity Tariffs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">UK Electricity Tariffs</h2>
          <div className="space-y-4">
            <p className="text-white">Understanding tariff structures is essential for accurate cost calculations and client advice.</p>
            
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-card p-4 rounded-lg border border-white/10">
                <h3 className="font-semibold text-white mb-2">Standard Rate</h3>
                <p className="text-sm text-white mb-2">Single rate 24/7</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• 25-35p/kWh typical</li>
                  <li>• £0.30-0.50 daily standing charge</li>
                  <li>• Most common domestic tariff</li>
                </ul>
              </div>
              <div className="bg-card p-4 rounded-lg border border-white/10">
                <h3 className="font-semibold text-white mb-2">Economy 7</h3>
                <p className="text-sm text-white mb-2">Dual rate tariff</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Night: 15-25p/kWh</li>
                  <li>• Day: 30-40p/kWh</li>
                  <li>• Good for storage heating</li>
                </ul>
              </div>
              <div className="bg-card p-4 rounded-lg border border-white/10">
                <h3 className="font-semibold text-white mb-2">Time of Use</h3>
                <p className="text-sm text-white mb-2">Smart meter required</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Peak: 40-60p/kWh</li>
                  <li>• Off-peak: 10-20p/kWh</li>
                  <li>• Rewards demand shifting</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-[#121212]/20 border-l-4 border-elec-yellow p-4 rounded">
              <p className="text-white text-sm">
                <strong>Billing Formula:</strong> Total Cost = (kWh × unit rate) + (daily standing charge × days)
              </p>
            </div>
          </div>
        </Card>

        <InlineCheck
          id="ic-25-energy"
          question="A 1kW heater runs for 2 hours. Energy consumed is:"
          options={["0.5 kWh", "1 kWh", "2 kWh", "3 kWh"]}
          correctIndex={2}
          explanation="Energy = Power × Time. 1kW × 2h = 2kWh."
        />
        <Separator className="my-6" />

        <InlineCheck
          id="ic-25-cost"
          question="At 30p per kWh, what does 4 kWh cost (excluding standing charge)?"
          options={["£0.12", "£1.20", "£12.00", "£4.30"]}
          correctIndex={1}
          explanation="Cost = Energy × Unit rate. 4 kWh × £0.30 = £1.20."
        />

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Summary</h2>
          <div className="space-y-3 text-xs sm:text-sm text-white">
            <p><strong>Energy Formula Selection:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>E = P × t: Energy (kWh) = Power (kW) × Time (hours)</li>
              <li>Convert watts to kilowatts (÷1000) and minutes to hours (÷60)</li>
              <li>Total cost = (kWh × unit rate) + (standing charge × days)</li>
              <li>Check tariff type: standard, Economy 7, or time-of-use rates</li>
              <li>Document assumptions for professional cost estimates</li>
            </ul>
            <div className="flex items-start gap-3 bg-[#121212]/20 border-l-4 border-elec-yellow p-4 rounded mt-4" role="alert">
              <AlertTriangle className="w-5 h-5 text-elec-yellow mt-0.5" />
              <p className="text-white text-sm">Always verify power ratings from nameplates and consider actual usage patterns for accurate client advice.</p>
            </div>
          </div>
        </Card>

        {/* FAQ */}
        <Card className="my-8 p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">FAQs</h2>
          <ul className="space-y-3 text-xs sm:text-sm text-white">
            {faqs.map((f, i) => (
              <li key={i} className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
                <p className="font-medium mb-1">{f.q}</p>
                <p className="text-white">{f.a}</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Quiz */}
        <Card className="mb-12 p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quick check quiz</h2>
          <Quiz questions={quizQuestions as any} title="Energy, kWh and Cost" />
        </Card>

        {/* Bottom nav */}
        <div className="flex justify-between items-center mb-24">
          <Button asChild variant="outline"><Link to="..">Previous</Link></Button>
          <Button asChild><Link to="..">Next</Link></Button>
        </div>

        {/* Structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      </main>
    </div>
  );
};

export default Module2Section2_5;