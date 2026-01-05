import useSEO from "@/hooks/useSEO";
import { ArrowLeft, SlidersHorizontal, Settings, Lightbulb, Timer, Network, AlertTriangle, BadgePercent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module2Section6_5: React.FC = () => {
  useSEO(
    "Reducing energy waste – smart design & load control (2.6.5)",
    "Level 2 guide to cutting electrical energy waste using smart design, correct sizing, and practical load control aligned with BS 7671."
  );

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Reducing energy waste – smart design & load control (2.6.5)",
    description:
      "Level 2 guide to cutting electrical energy waste using smart design, correct sizing, and practical load control aligned with BS 7671.",
    articleSection: "Electrical Fundamentals",
    inLanguage: "en-GB",
    isAccessibleForFree: true,
  } as const;

  const faqs = [
    { q: "What is the quickest win for reducing waste?", a: "Switch things off when not needed and control run‑time with timers or sensors. Standby adds up." },
    { q: "Does bigger cable always save energy?", a: "A larger CSA can reduce losses on long or high‑load runs, but size must be justified. Follow BS 7671 design steps and manufacturer data." },
    { q: "Do smart plugs and relays help?", a: "Yes. They let you schedule, monitor and verify savings. Ensure they are suitable for the load and installed safely." },
    { q: "Will lowering a thermostat by 1°C save energy?", a: "Yes, heating energy typically falls. Maintain comfort and, for hot water, follow hygiene guidance for safe temperatures." },
    { q: "Do timers alter disconnection times?", a: "No. Timers/relays add control only; protective devices and disconnection times remain as designed in BS 7671." },
    { q: "What paperwork should I leave with the client?", a: "Timings, set‑points, wiring changes and any measured savings so the plan can be maintained and audited." },
    { q: "How do I calculate payback time for efficiency improvements?", a: "Cost of improvement ÷ annual savings = payback years. Include maintenance costs and equipment lifespan in the calculation." },
    { q: "What's the difference between power factor and efficiency?", a: "Efficiency is useful output ÷ total input. Power factor relates to AC phase relationships. Both affect system current but differently." },
    { q: "Can I use any timer with heating systems?", a: "No. Timers must be rated for the load, suitable for the application, and installed according to manufacturer instructions and BS 7671." },
    { q: "How often should I review energy-saving measures?", a: "Check settings quarterly, review savings annually, and adjust for changes in occupancy or equipment. Document any modifications." },
    { q: "What happens if I overload a smart plug?", a: "Risk of overheating, fire, or device failure. Always check current ratings and power requirements before installation." },
    { q: "Are there grants available for energy efficiency improvements?", a: "Various schemes exist for domestic and commercial properties. Check government websites and speak to suppliers about current offers." }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } as const;

  const quizQuestions = [
    {
      id: 1,
      question: "Which practice most reliably cuts standby losses?",
      options: ["Longer cables", "Timers/smart control to switch off", "Higher supply voltage", "Extra bends"],
      correctAnswer: 1,
      explanation: "Scheduling and switching reduce idle energy use.",
    },
    {
      id: 2,
      question: "On a long circuit, which choice can lower heating and voltage drop?",
      options: ["Smaller CSA", "Larger CSA and tidy routing", "More joints", "Ignoring grouping"],
      correctAnswer: 1,
      explanation: "Lower resistance reduces losses; keep workmanship high.",
    },
    {
      id: 3,
      question: "What is a safe way to shorten pump run‑time without affecting protection?",
      options: ["Bridge a protective device", "Use a rated timer/pressure control and keep protective devices as designed", "Remove the fuse", "Undersize the MCB"],
      correctAnswer: 1,
      explanation: "Control devices must be correctly rated; never compromise protection.",
    },
    {
      id: 4,
      question: "Why can improving power factor on a bigger installation save energy at the supply cable?",
      options: ["PF reduces current for the same useful power", "PF makes voltage higher", "PF eliminates all losses", "PF increases harmonic heating"],
      correctAnswer: 0,
      explanation: "Higher PF lowers current → less I²R heating in conductors.",
    },
    {
      id: 5,
      question: "Which is best practice when specifying efficient equipment?",
      options: ["Ignore datasheets", "Check rated efficiency and duty, and follow manufacturer instructions", "Pick the cheapest only", "Rely on trial and error"],
      correctAnswer: 1,
      explanation: "Use manufacturer data and install per instructions and BS 7671.",
    },
    {
      id: 6,
      question: "Grouping cables in insulation affects which design value most directly?",
      options: ["Current‑carrying capacity", "MCB curve type", "Earth electrode resistance", "Nominal voltage"],
      correctAnswer: 0,
      explanation: "Apply correction factors; capacity reduces with grouping/insulation.",
    },
    {
      id: 7,
      question: "When choosing an LED driver to reduce waste, what should you check?",
      options: ["Rated efficiency and standby draw", "Colour of the label", "Only the price", "Ignore thermal limits"],
      correctAnswer: 0,
      explanation: "Higher efficiency and low standby reduce losses; follow thermal guidance.",
    },
    {
      id: 8,
      question: "A DB cover feels hot. What is the first safe check?",
      options: ["Bypass the MCB to reduce heat", "After isolation, verify terminations are torqued to manufacturer values", "Drill random holes in the cover", "Fit a bigger fuse"],
      correctAnswer: 1,
      explanation: "Loose terminations cause hot spots; never compromise protection.",
    },
    {
      id: 9,
      question: "Where does an occupancy sensor usually save the most?",
      options: ["Always‑occupied server room", "Low‑use corridors and stores", "Emergency lighting circuits", "On the main incomer"],
      correctAnswer: 1,
      explanation: "Intermittent‑use areas benefit most from automatic switching.",
    },
    {
      id: 10,
      question: "What's the most important factor when sizing cables for energy efficiency?",
      options: ["Always use the smallest permitted CSA", "Balance voltage drop, current-carrying capacity, and installation costs", "Ignore manufacturer guidance", "Use only armoured cables"],
      correctAnswer: 1,
      explanation: "Consider all factors: voltage drop limits, thermal constraints, and economic considerations for optimal efficiency.",
    },
  ] as const;

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
            <div className="p-2 rounded-lg bg-card">
              <SlidersHorizontal className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">Section 2.6.5</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">Reducing Energy Waste (Smart Design and Load Control)</h1>
          <p className="text-muted-foreground">Practical steps to cut wasted energy: design choices, correct sizing and simple controls that reduce run‑time and heat while staying within BS 7671.</p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Waste shows up as unwanted heat or running when not needed.</li>
                <li>Fix with good design (cable routes/size) and control (timers, sensors, set‑points).</li>
                <li>Document choices; follow manufacturer data and BS 7671.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Warm enclosures, kit left on, compressors short‑cycling, lights on in empty rooms.</li>
                <li><strong>Use:</strong> Efficient equipment, right CSA, good routing and ventilation.</li>
                <li><strong>Control:</strong> Timers, PIR/occupancy, thermostats, smart plugs/relays.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
            <li>Identify common causes of wasted energy and heat on real jobs.</li>
            <li>Apply control strategies to reduce run‑time without compromising safety.</li>
            <li>Select and install efficient equipment following manufacturer guidance.</li>
            <li>Relate choices to BS 7671: current‑carrying capacity, voltage drop, grouping and protection coordination.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Content</h2>

          {/* Design choices */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-2 flex items-center gap-2"><Settings className="w-5 h-5" /> Design choices that cut losses</h3>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
              <li>Choose suitable cable cross‑section for run length and load; avoid unnecessary long routes and tight grouping.</li>
              <li>Keep joints accessible and sound; torque to the manufacturer’s values to avoid hot spots.</li>
              <li>Provide ventilation and consider ambient temperature and insulation (apply correction factors).</li>
              <li>Specify efficient kit (motors, transformers, LED drivers) and check stated efficiency and standby draw.</li>
            </ul>
          </section>

          <InlineCheck
            id="ic-265-route"
            question="A long workshop radial often trips warm under load. Which first action is most likely to help?"
            options={["Reduce CSA to lower cost", "Increase CSA/shorten route and check terminations", "Add more joints", "Ignore if it still works"]}
            correctIndex={1}
            explanation="Lower resistance and good workmanship reduce heating and voltage drop; verify design to BS 7671."
          />
          <Separator className="my-6" />

          {/* Load control */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-2 flex items-center gap-2"><Timer className="w-5 h-5" /> Control strategies (simple wins)</h3>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
              <li>Timers and schedules: water heaters, signage, extract, compressors – run only when needed.</li>
              <li>Occupancy/PIR: lighting and space conditioning in intermittently used areas.</li>
              <li>Set‑points and dead‑bands: avoid short‑cycling; let equipment rest between cycles.</li>
              <li>Smart plugs/relays: measure, switch and verify savings; ensure ratings match the load.</li>
            </ul>
          </section>

          <Separator className="my-6" />

          {/* Examples */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-2 flex items-center gap-2"><Lightbulb className="w-5 h-5" /> Examples you’ll recognise</h3>
            <ul className="space-y-4 text-xs sm:text-sm text-foreground">
              <li className="rounded-lg p-3 sm:p-4 bg-card border border-border/20">
                <p className="font-medium">1) Lighting retrofit</p>
                <p>Replace tired fluorescent fittings with high‑efficiency LED and add occupancy sensors in corridors and stores. Verify illuminance and emergency lighting requirements.</p>
              </li>
              <li className="rounded-lg p-3 sm:p-4 bg-card border border-border/20">
                <p className="font-medium">2) Air compressor control</p>
                <p>Compressor short‑cycles at night. Fit a timer and check for leaks. Reduce run‑time and heat in the plant room. Keep protective devices unchanged.</p>
              </li>
              <li className="rounded-lg p-3 sm:p-4 bg-card border border-border/20">
                <p className="font-medium">3) Home office phantom loads</p>
                <p>Monitors, chargers and printers are warm when idle. Use smart sockets to power down after hours; confirm ratings and earthing continuity.</p>
              </li>
            </ul>
          </section>

          <Separator className="my-6" />

          <InlineCheck
            id="ic-265-smart"
            question="Which is the safest statement about adding a smart relay to control a heater?"
            options={["It replaces protective devices", "It must be correctly rated and installed without altering protection settings", "Any relay will do", "Mount it anywhere"]}
            correctIndex={1}
            explanation="Controls add functionality but do not replace protective devices. Follow ratings and instructions."
          />

          <Separator className="my-6" />

          {/* BS 7671 context */}
          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-2 flex items-center gap-2"><Network className="w-5 h-5" /> BS 7671 context and good practice</h3>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
              <li>Current‑carrying capacity and correction factors (Appendix 4) for ambient, grouping and thermal insulation.</li>
              <li>Voltage drop limits for final circuits; design for performance as well as safety.</li>
              <li>Coordination of protective devices; control gear must not compromise disconnection times.</li>
              <li>Follow manufacturer instructions, maintain access to joints, and document settings/schedules.</li>
            </ul>
            <div className="flex items-start gap-3 bg-background/20 border-l-4 border-emerald-500 p-4 rounded mt-4" role="alert">
              <AlertTriangle className="w-5 h-5 text-emerald-400 mt-0.5" />
              <p className="text-foreground text-sm">Isolate, lock‑off and prove dead before work. Test, label and record changes to controls and timings.</p>
            </div>
          </section>
        </Card>

        {/* Extra content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">More ways to reduce waste (hands‑on)</h2>

          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-2 flex items-center gap-2"><Settings className="w-5 h-5" /> Commissioning and verification</h3>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
              <li>After changes, confirm protective device ratings, RCD type and disconnection times remain compliant.</li>
              <li>Check torque on terminations per manufacturer values; label timers/schedules clearly.</li>
              <li>Record set‑points/run‑times and agree who is responsible for adjustments.</li>
            </ul>
          </section>

          <Separator className="my-6" />

          <section className="mb-6">
            <h3 className="font-medium text-foreground mb-2 flex items-center gap-2"><Lightbulb className="w-5 h-5" /> Common mistakes and quick fixes</h3>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
              <li>Smart plug underrated for heater → replace with correctly rated relay or hard‑wired control per instructions.</li>
              <li>Over‑grouped cables in insulation → re‑route or upsize with correction factors from Appendix 4.</li>
              <li>Short‑cycling refrigeration → widen dead‑band and clear ventilation; maintain door seals.</li>
            </ul>
          </section>

          <Separator className="my-6" />

          <InlineCheck
            id="ic-265-verify"
            question="You’ve added timers to two water heaters. What should you document?"
            options={["Nothing if it works", "Schedules, set‑points, location, ratings and any measured kWh change", "Only the timer brand", "Just tell the client verbally"]}
            correctIndex={1}
            explanation="Good records help maintain savings and demonstrate compliance and competence."
          />

          <Separator className="my-6" />

          <section className="mb-2">
            <h3 className="font-medium text-foreground mb-2 flex items-center gap-2"><BadgePercent className="w-5 h-5" /> Estimating savings quickly</h3>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-foreground">
              <li>Measure baseline kWh for a week, apply one change, then re‑measure for a similar week.</li>
              <li>Convert kWh saved to £ using the unit rate; note any tariff changes and the standing charge separately.</li>
              <li>Prioritise measures with short payback that do not reduce safety or comfort.</li>
            </ul>
          </section>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-8 p-6 bg-gradient-to-br from-emerald-500/10 to-orange-500/10 border-2 border-emerald-500/30">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Timer className="w-5 h-5 text-emerald-400" />
            Energy Waste Reduction - Pocket Guide
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
            <div className="space-y-4">
              <div className="bg-background/50 rounded-lg p-3 border border-border/20">
                <h4 className="font-semibold mb-2 text-emerald-400">Quick Wins</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Switch off standby loads (TVs, chargers, printers)</li>
                  <li>• Install timers on water heaters and lighting</li>
                  <li>• Use occupancy sensors in low-use areas</li>
                  <li>• Lower heating by 1°C (saves ~8% energy)</li>
                  <li>• Replace tungsten with LED lighting</li>
                </ul>
              </div>

              <div className="bg-background/50 rounded-lg p-3 border border-border/20">
                <h4 className="font-semibold mb-2 text-emerald-600">Design Choices</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Size cables for voltage drop, not just current</li>
                  <li>• Minimise cable runs where practical</li>
                  <li>• Ensure good ventilation around equipment</li>
                  <li>• Group cables appropriately with derating</li>
                  <li>• Select high-efficiency equipment</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-background/50 rounded-lg p-3 border border-border/20">
                <h4 className="font-semibold mb-2 text-emerald-400">Smart Control</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Schedule flexible loads for off-peak times</li>
                  <li>• Use thermostats with setback capabilities</li>
                  <li>• Install smart plugs for monitoring and control</li>
                  <li>• Consider building management systems</li>
                  <li>• Implement demand response strategies</li>
                </ul>
              </div>

              <div className="bg-background/50 rounded-lg p-3 border border-border/20">
                <h4 className="font-semibold mb-2 text-red-600">Safety Reminders</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Never bypass protective devices</li>
                  <li>• Check ratings of all control equipment</li>
                  <li>• Maintain proper torque on connections</li>
                  <li>• Follow manufacturer instructions</li>
                  <li>• Document all changes and settings</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQ */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">FAQs</h2>
          <ul className="space-y-3 text-xs sm:text-sm text-foreground">
            {faqs.map((f, i) => (
              <li key={i} className="rounded-lg p-3 sm:p-4 bg-card border border-border/20">
                <p className="font-medium mb-1">{f.q}</p>
                <p className="text-muted-foreground">{f.a}</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Quiz */}
        <Card className="mb-16 p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Quick check quiz</h2>
          <Quiz questions={quizQuestions as any} title="Reducing energy waste" />
        </Card>

        {/* Structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </main>
    </div>
  );
};

export default Module2Section6_5;
