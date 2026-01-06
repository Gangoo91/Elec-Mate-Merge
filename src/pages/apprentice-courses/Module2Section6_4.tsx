import useSEO from "@/hooks/useSEO";
import { ArrowLeft, ThermometerSun, Plug, Settings, AlertTriangle, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module2Section6_4: React.FC = () => {
  useSEO(
    "Losses in electrical systems – Module 2 (2.6.4)",
    "Understand heat and load losses, why they occur, and how to reduce them. Level 2 friendly with BS 7671 context and examples."
  );

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Losses in electrical systems – Module 2 (2.6.4)",
    description:
      "Understand heat and load losses, why they occur, and how to reduce them. Level 2 friendly with BS 7671 context and examples.",
    articleSection: "Electrical Fundamentals",
    inLanguage: "en-GB",
    isAccessibleForFree: true,
  } as const;

  const faqs = [
    { q: "What are electrical losses?", a: "Energy that does not become the intended output – usually wasted as heat in cables, equipment or connections." },
    { q: "Do all systems have losses?", a: "Yes. Good design and installation keep them small and safe." },
    { q: "Does voltage drop mean wasted energy?", a: "Some energy is lost as heat along the run; BS 7671 limits voltage drop to protect performance and safety." },
    { q: "How do I know if losses are excessive?", a: "Look for: warm cables under normal load, discoloured terminations, humming transformers, higher than expected energy bills, frequent protective device operation." },
    { q: "What's the most common cause of high losses in domestic installations?", a: "Undersized cables for long runs (especially to outbuildings), loose connections, and old inefficient equipment like tungsten lamps and motors." },
    { q: "Can grouping cables increase losses?", a: "Yes. Grouped cables run hotter, increasing resistance and losses. BS 7671 requires derating factors to account for this." },
    { q: "How does ambient temperature affect losses?", a: "Higher ambient temperature increases conductor resistance, leading to higher losses. This is why cables have current ratings based on reference conditions." },
    { q: "Are harmonics related to losses?", a: "Yes. Harmonic currents from electronic loads increase heating in neutral conductors and transformers, requiring special consideration in design." }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } as const;

  const quizQuestions = [
    {
      id: 1,
      question: "Which most commonly creates heat loss in cables?",
      options: ["Magnetism only", "Current flowing through resistance", "Perfect conduction", "Cooling fans"],
      correctAnswer: 1,
      explanation: "All real conductors have resistance; current through resistance produces heat.",
    },
    {
      id: 2,
      question: "A long circuit is close to voltage drop limits. What design change best reduces losses?",
      options: ["Smaller cable size", "Longer route", "Larger cable size", "More bends"],
      correctAnswer: 2,
      explanation: "A larger conductor reduces resistance, loss and voltage drop.",
    },
    {
      id: 3,
      question: "Loose terminations mainly cause…",
      options: ["Less heat", "Localised overheating and damage", "Lower current", "Perfect efficiency"],
      correctAnswer: 1,
      explanation: "Poor contact area raises resistance at the joint, creating heat and risk.",
    },
    {
      id: 4,
      question: "Why can poor power factor increase losses in a supply cable?",
      options: ["It always reduces current", "It increases current for the same useful output", "It makes voltage higher", "It stops heating"],
      correctAnswer: 1,
      explanation: "Lower power factor means more current for the same useful power, so more heating in conductors.",
    },
    {
      id: 5,
      question: "Which practice helps reduce standby (phantom) losses?",
      options: ["Leave devices on 24/7", "Use smart sockets/timers", "Use longer cables", "Reduce ventilation"],
      correctAnswer: 1,
      explanation: "Switching supplies off when unused cuts wasted energy.",
    },
    {
      id: 6,
      question: "Cable losses are proportional to which factor?",
      options: ["Voltage", "Current squared (I²)", "Power factor", "Frequency"],
      correctAnswer: 1,
      explanation: "Cable heating follows I²R - doubling current quadruples the losses.",
    },
    {
      id: 7,
      question: "What happens to cable resistance as temperature increases?",
      options: ["It decreases", "It stays constant", "It increases", "It becomes zero"],
      correctAnswer: 2,
      explanation: "Higher temperature increases resistance in copper and aluminium conductors, creating more losses.",
    },
    {
      id: 8,
      question: "Which connection method typically has the lowest losses?",
      options: ["Twisted wires", "Properly torqued screw terminals", "Wire nuts", "Loose push-fit connectors"],
      correctAnswer: 1,
      explanation: "Properly made screw terminals provide good contact area and low resistance when correctly torqued.",
    },
    {
      id: 9,
      question: "Transformer losses are typically highest when…",
      options: ["Fully loaded", "Lightly loaded", "At rated load", "When switched off"],
      correctAnswer: 0,
      explanation: "Core losses are constant, but copper losses (I²R) increase with loading. Total losses peak at full load.",
    },
    {
      id: 10,
      question: "Which installation factor most increases cable losses?",
      options: ["Good ventilation", "Correct cable size", "High ambient temperature and grouping", "Proper termination"],
      correctAnswer: 2,
      explanation: "High ambient temperature and cable grouping both increase operating temperature, which increases resistance and losses.",
    },
  ] as const;

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
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
            <div className="p-2 rounded-lg ">
              <ThermometerSun className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">Section 2.6.4</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">Losses in electrical systems (heat and load)</h1>
          <p className="text-white">Where energy goes when it is not doing useful work, how to spot problem areas, and practical ways to keep losses low.</p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Losses are unavoidable, but good design and installation minimise them.</li>
                <li>Most unwanted loss shows up as heat in cables, transformers, motors and terminations.</li>
                <li>Lower losses mean cooler kit, better performance and lower energy bills.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Warm cables, discoloured terminations, humming transformers, devices warm when idle.</li>
                <li><strong>Use:</strong> Choose suitable cable sizes, routes and efficient equipment.</li>
                <li><strong>Check:</strong> Torque settings, grouping, ambient temperature and ventilation.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Identify common sources of electrical losses and their signs.</li>
            <li>Explain why long runs, small conductors and loose terminations increase heating.</li>
            <li>Relate losses to current draw, voltage drop, equipment life and energy cost.</li>
            <li>Apply BS 7671 context: current‑carrying capacity, voltage drop limits and connection quality.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Types of loss (plain English) */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2 flex items-center gap-2"><Plug className="w-5 h-5" /> Common losses you will see</h3>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
              <li><strong>Cable heating:</strong> All cables have some resistance. More current and longer runs mean more heat and voltage drop.</li>
              <li><strong>Loose/dirty terminations:</strong> Poor contact area increases local heating and risk of damage or fire.</li>
              <li><strong>Transformer and motor losses:</strong> Heat in windings and magnetic parts; motors also have mechanical losses.</li>
              <li><strong>Electronics and drivers:</strong> Power supplies waste some energy as heat; many draw small power even when “off”.</li>
              <li><strong>Parasitic (standby) loads:</strong> Devices left on or on standby use energy continuously.</li>
              <li><strong>Power factor issues:</strong> Poor power factor means higher current for the same useful output, adding heating in cables.</li>
              <li><strong>Environment and installation:</strong> High ambient temperature, tight grouping and insulation reduce heat dissipation.</li>
            </ul>
          </section>

          <InlineCheck
            id="ic-loss-type"
            question="Which situation is most likely to increase heating in a final circuit?"
            options={["Cool ambient and short run", "Tightly grouped long run with small CSA", "Clean, tight terminations", "Ventilated trunking with spare space"]}
            correctIndex={1}
            explanation="Long runs, small cross‑section and grouping raise conductor temperature and voltage drop."
          />
          <Separator className="my-6" />

          {/* Reducing losses */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2 flex items-center gap-2"><Settings className="w-5 h-5" /> Practical ways to reduce losses</h3>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
              <li>Use suitable cable size for run length and load; avoid unnecessary long routes.</li>
              <li>Follow torque settings; keep terminations clean and well‑made.</li>
              <li>Allow for ambient temperature, grouping and insulation (derating as required).</li>
              <li>Select efficient equipment (motors, transformers, LED drivers) and consider power factor on larger systems.</li>
              <li>Control standby loads with timers/smart sockets; switch off when not needed.</li>
              <li>Provide ventilation and keep enclosures within manufacturer temperature limits.</li>
            </ul>
          </section>

          <Separator className="my-6" />

          {/* Examples */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2">Worked examples (conceptual)</h3>
            <ul className="space-y-4 text-xs sm:text-sm text-white">
              <li className="rounded-lg p-4 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-border/30">
                <p className="font-medium">Long garden supply</p>
                <p>A small cable over a long distance feeds outdoor sockets. Users report warm cable and dim lights under load. Upgrading cable size and route reduces heating and voltage drop.</p>
              </li>
              <li className="rounded-lg p-4 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-elec-yellow/30">
                <p className="font-medium">Loose connection at a spur</p>
                <p>Brown discolouration is seen on a terminal. Re‑make the joint to the correct torque and check adjacent connections for damage or heat marks.</p>
              </li>
              <li className="rounded-lg p-4 bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-400/30">
                <p className="font-medium">Standby loads in a small office</p>
                <p>Printers, screens and chargers are left on 24/7. Fitting smart sockets and timers cuts wasted energy and heat build‑up overnight.</p>
              </li>
              <li className="rounded-lg p-4 bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-border/30">
                <p className="font-medium">Overloaded ring main</p>
                <p><strong>Scenario:</strong> 2.5mm² ring main serving kitchen with multiple high-power appliances. Cable runs warm, frequent MCB trips.</p>
                <p><strong>Solution:</strong> Split load across additional radial circuits, upgrade to larger CSA where needed, check connection integrity.</p>
              </li>
              <li className="rounded-lg p-4 bg-gradient-to-r from-rose-500/10 to-rose-600/10 border border-rose-400/30">
                <p className="font-medium">Industrial motor installation</p>
                <p><strong>Problem:</strong> 15kW motor cable runs very warm, high energy bills, motor performance poor.</p>
                <p><strong>Analysis:</strong> 50m run using 6mm² cable. Cable losses ≈ 3% voltage drop, motor efficiency drops, higher current drawn.</p>
                <p><strong>Solution:</strong> Upgrade to 10mm² cable reduces voltage drop to 1.8%, cooler operation, better motor performance.</p>
              </li>
            </ul>
          </section>

          <Separator className="my-6" />

          {/* Environmental and installation factors */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2">Environmental factors affecting losses</h3>
            
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-lg p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-border/30">
                <h4 className="font-medium mb-2 text-orange-700 dark:text-elec-yellow">Temperature effects</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Higher ambient temperature = higher conductor resistance</li>
                  <li>Grouping cables reduces heat dissipation</li>
                  <li>Thermal insulation traps heat around cables</li>
                  <li>Poor ventilation in enclosures increases component temperatures</li>
                  <li>Solar heating on outdoor installations</li>
                </ul>
              </div>
              
              <div className="rounded-lg p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-border/30">
                <h4 className="font-medium mb-2 text-purple-700 dark:text-elec-yellow">Installation quality</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Cable routing: unnecessary bends and length increase resistance</li>
                  <li>Termination quality: proper torque and clean connections essential</li>
                  <li>Cable support: mechanical stress can damage conductors</li>
                  <li>Protection from moisture and corrosion</li>
                  <li>Correct cable selection for environment and load</li>
                </ul>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          {/* Cost and energy impact */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2">Economic impact of losses</h3>
            
            <div className="rounded-lg p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/30">
              <p className="text-sm mb-3">Understanding the financial impact helps justify better design and installation practices:</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#121212]/50 rounded p-3 border border-white/10">
                  <h5 className="font-medium mb-2">Direct costs</h5>
                  <ul className="text-xs space-y-1">
                    <li>• Higher energy bills from wasted power</li>
                    <li>• Larger cable sizes needed for voltage drop</li>
                    <li>• Enhanced cooling/ventilation requirements</li>
                    <li>• More frequent maintenance and replacement</li>
                  </ul>
                </div>
                
                <div className="bg-[#121212]/50 rounded p-3 border border-white/10">
                  <h5 className="font-medium mb-2">Hidden costs</h5>
                  <ul className="text-xs space-y-1">
                    <li>• Reduced equipment lifespan from overheating</li>
                    <li>• Lost productivity from equipment downtime</li>
                    <li>• Insurance claims from overheating incidents</li>
                    <li>• Regulatory compliance issues</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          {/* Troubleshooting losses */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2">Identifying and troubleshooting excessive losses</h3>
            
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-gradient-to-r from-emerald-500/10 to-amber-500/10 border border-elec-yellow/30">
                <h4 className="font-medium mb-2 text-yellow-700 dark:text-yellow-300">Warning signs to look for</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Cables warm to touch under normal load</li>
                    <li>Discoloured or damaged cable insulation</li>
                    <li>Brown or black marks around terminations</li>
                    <li>Unusual smells (overheating insulation)</li>
                  </ul>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Equipment running hotter than expected</li>
                    <li>Frequent protective device operation</li>
                    <li>Voltage readings lower than expected</li>
                    <li>Higher than expected energy consumption</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-lg p-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-border/30">
                <h4 className="font-medium mb-2 text-blue-700 dark:text-elec-yellow">Investigation approach</h4>
                <ol className="list-decimal pl-6 space-y-1 text-sm">
                  <li><strong>Visual inspection:</strong> Look for signs of overheating, damage, poor workmanship</li>
                  <li><strong>Thermal imaging:</strong> Identify hot spots in cables, connections, equipment</li>
                  <li><strong>Electrical measurements:</strong> Check voltage drop, current imbalance, resistance values</li>
                  <li><strong>Load analysis:</strong> Verify actual vs designed loading, identify phantom loads</li>
                  <li><strong>Environmental check:</strong> Ambient temperature, ventilation, cable grouping</li>
                </ol>
              </div>
            </div>
          </section>
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2 flex items-center gap-2"><Settings className="w-5 h-5" /> Advanced loss reduction strategies</h3>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
              <div className="rounded-lg p-4 bg-gradient-to-br from-card/10 to-card/5 border border-white/10">
                <p className="font-medium mb-2 text-elec-yellow">Design stage considerations</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Calculate voltage drop early in design process</li>
                  <li>Consider cable routes: avoid unnecessary length</li>
                  <li>Use voltage drop calculators for complex installations</li>
                  <li>Plan for load growth - don't design to absolute limits</li>
                  <li>Consider higher voltage distributions for long runs</li>
                </ul>
              </div>
              <div className="rounded-lg p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-elec-yellow/30">
                <p className="font-medium mb-2 text-emerald-700 dark:text-elec-yellow">Installation best practices</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Use calibrated torque tools for terminations</li>
                  <li>Allow adequate spacing between grouped cables</li>
                  <li>Ensure good ventilation in enclosures and cable ways</li>
                  <li>Use proper cable supports to prevent mechanical stress</li>
                  <li>Regular inspection and maintenance of connections</li>
                </ul>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          {/* Quantifying losses */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2">Quantifying losses - practical examples</h3>
            <div className="rounded-lg p-4 bg-gradient-to-r from-slate-500/10 to-slate-600/10 border border-slate-400/30">
              <p className="font-medium mb-3">Cable loss calculation example</p>
              <p className="mb-2"><strong>Scenario:</strong> 25A load, 30m run, 4mm² T&E cable (resistance ≈ 4.6mΩ/m)</p>
              <p className="mb-2"><strong>Cable resistance:</strong> 30m × 4.6mΩ/m × 2 (live + neutral) = 0.276Ω</p>
              <p className="mb-2"><strong>Power loss:</strong> I²R = 25² × 0.276 = 173W</p>
              <p className="mb-2"><strong>Voltage drop:</strong> IR = 25 × 0.276 = 6.9V (3% at 230V)</p>
              <p className="text-amber-700 dark:text-amber-300"><strong>Impact:</strong> 173W constant heat generation, reduced performance at load end.</p>
            </div>
          </section>

          <Separator className="my-6" />

          <InlineCheck
            id="ic-volt-drop"
            question="For a long final circuit with noticeable voltage drop, the best first step is to…"
            options={["Reduce cable CSA", "Increase cable CSA or shorten the run", "Add more bends", "Ignore it if devices still work"]}
            correctIndex={1}
            explanation="Bigger conductors or shorter runs reduce resistance and losses; always check BS 7671 voltage drop limits."
          />

          <Separator className="my-6" />

          {/* Safety & BS 7671 context */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2 flex items-center gap-2"><Gauge className="w-5 h-5" /> BS 7671 context and good practice</h3>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
              <li>Current‑carrying capacity and correction factors: Appendix 4 (ambient, grouping, thermal insulation).</li>
              <li>Voltage drop limits for final circuits: follow BS 7671 guidance to protect performance and safety.</li>
              <li>Connections: workmanship and accessibility matter; poor joints are a common source of overheating.</li>
            </ul>
            <div className="flex items-start gap-3 bg-[#121212]/20 border-l-4 border-elec-yellow p-4 rounded mt-4" role="alert">
              <AlertTriangle className="w-5 h-5 text-elec-yellow mt-0.5" />
              <p className="text-white text-sm">Isolate, lock‑off and prove dead before work. Follow manufacturer instructions and BS 7671.</p>
            </div>
          </section>
        </Card>

        {/* FAQ */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
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
        <Card className="mb-16 p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Quick check quiz</h2>
          <Quiz questions={quizQuestions as any} title="Losses in electrical systems" />
        </Card>

        {/* Structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </main>
    </div>
  );
};

export default Module2Section6_4;
