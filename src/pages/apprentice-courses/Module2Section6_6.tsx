import useSEO from "@/hooks/useSEO";
import { ArrowLeft, Receipt, Activity, Smartphone, AlertTriangle, BarChart3, PlugZap, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import React from "react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module2Section6_6: React.FC = () => {
  useSEO(
    "Real‑life applications: bills, monitoring, smart tech (2.6.6)",
    "Level 2 practical guide to reading bills, monitoring loads and using smart tech to cut costs safely and in line with BS 7671."
  );

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Real‑life applications: bills, monitoring, smart tech (2.6.6)",
    description:
      "Level 2 practical guide to reading bills, monitoring loads and using smart tech to cut costs safely and in line with BS 7671.",
    articleSection: "Electrical Fundamentals",
    inLanguage: "en-GB",
    isAccessibleForFree: true,
  } as const;

  const faqs = [
    { q: "What is a kWh on my bill?", a: "A kilowatt‑hour is one kilowatt used for one hour. It's the unit you pay for." },
    { q: "Why do I pay a standing charge?", a: "It covers fixed costs for supplying electricity, regardless of how much you use." },
    { q: "Are plug‑in energy monitors safe?", a: "Use CE/UKCA‑marked devices within their rating, do not daisy‑chain high loads, and keep ventilation clear." },
    { q: "How do I estimate EV charging cost?", a: "Energy (kWh) × unit rate. On time‑of‑use tariffs, schedule off‑peak to reduce the unit rate." },
    { q: "Can I install a CT clamp anywhere?", a: "Only as per manufacturer instructions on a single live conductor where safe. Never inside equipment you are not competent to access." },
    { q: "Do smart automations work without internet?", a: "Many schedules run locally, but cloud features and remote access may need connectivity. Check the product details." },
    { q: "What's the difference between kW and kWh?", a: "kW is power at an instant (like car speed), kWh is energy over time (like distance travelled). Bills charge for kWh." },
    { q: "How accurate are smart meter readings?", a: "Very accurate for billing purposes. In-home displays may round figures but meter readings are precise." },
    { q: "Can I monitor three-phase supplies safely?", a: "Yes, but requires appropriate equipment and competence. Consider professional installation for permanent monitoring." },
    { q: "What causes high standing charges?", a: "Standing charges cover network costs, meter rental, and supplier overheads. They vary by region and supplier." },
    { q: "Are prepayment meters more expensive?", a: "Unit rates can be higher, but they help with budgeting. Smart prepay meters offer more flexibility than traditional ones." },
    { q: "How do I read an analogue electricity meter?", a: "Read from left to right, note the lower number when the pointer is between two digits. Ignore red dials (these show decimal places)." }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  } as const;

  const quizQuestions = [
    {
      id: 1,
      question: "Which line on a bill directly multiplies with your kWh used?",
      options: ["Standing charge", "Unit rate (p/kWh)", "Meter serial", "VAT rate only"],
      correctAnswer: 1,
      explanation: "Energy cost ≈ kWh × unit rate (plus standing charge and VAT).",
    },
    {
      id: 2,
      question: "A 2 kW heater runs for 3 hours. Rough energy used is…",
      options: ["2 kWh", "3 kWh", "5 kWh", "6 kWh"],
      correctAnswer: 3,
      explanation: "kW × hours: 2 × 3 = 6 kWh.",
    },
    {
      id: 3,
      question: "What is the safest way to monitor a fixed appliance load over time?",
      options: ["Open the CU and clip any CT anywhere", "Use a suitable, rated monitoring device or sub‑meter per manufacturer instructions", "Bypass protective devices", "Insert a random adaptor"],
      correctAnswer: 1,
      explanation: "Use equipment designed for the job and install safely in line with BS 7671 and instructions.",
    },
    {
      id: 4,
      question: "Which smart feature most often saves money for EV charging on time‑of‑use tariffs?",
      options: ["Random start", "Charge immediately at peak", "Scheduled off‑peak charging", "Disable all scheduling"],
      correctAnswer: 2,
      explanation: "Shift energy to cheaper off‑peak periods when safe and permitted.",
    },
    {
      id: 5,
      question: "Which statement about power factor at home is most accurate?",
      options: ["Domestic bills charge reactive energy separately", "PF has no effect on cable heating", "Poor PF can raise current but most domestic bills are based on kWh only", "PF always damages the meter"],
      correctAnswer: 2,
      explanation: "Higher current can increase losses, but domestic billing is usually kWh‑based.",
    },
    {
      id: 6,
      question: "What best verifies a saving after adding controls?",
      options: ["Guessing based on feel", "Compare monitored kWh before and after under similar use", "Feeling the room is cooler", "Changing supplier only"],
      correctAnswer: 1,
      explanation: "Use measured kWh under comparable conditions.",
    },
    {
      id: 7,
      question: "Where should a CT clamp sit for a single‑phase circuit?",
      options: ["Around both live and neutral", "Around the live only as per instructions", "Around the CPC", "On the meter case"],
      correctAnswer: 1,
      explanation: "Clamping both conductors cancels current; follow instructions and safety.",
    },
    {
      id: 8,
      question: "Which is the safest method to monitor a fridge freezer?",
      options: ["Plug‑in monitor rated for the load with good ventilation", "Use a 3‑way adaptor chain", "Remove the earth for less leakage", "Open the compressor housing"],
      correctAnswer: 0,
      explanation: "Use rated equipment; avoid daisy‑chains and never defeat safety features.",
    },
    {
      id: 9,
      question: "Which load is most suitable to shift to off‑peak on a TOU tariff?",
      options: ["Fire alarm", "EV charging", "Emergency lighting test during an emergency", "Life‑safety systems"],
      correctAnswer: 1,
      explanation: "Shift flexible, non‑safety‑critical loads like EV charging.",
    },
    {
      id: 10,
      question: "What information should be recorded when installing energy monitoring equipment?",
      options: ["Nothing - just install and leave", "Equipment ratings, installation location, and initial baseline readings", "Only the brand name", "Just the purchase receipt"],
      correctAnswer: 1,
      explanation: "Proper documentation helps with maintenance, troubleshooting, and demonstrating compliance with regulations.",
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
              <Receipt className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">Section 2.6.6</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">Real‑Life Applications (Energy Bills, Load Monitoring, Smart Tech)</h1>
          <p className="text-white">Turn the ideas into action: understand your bill, measure what matters and use smart control to reduce costs while staying safe.</p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your bill charges per kWh used plus a daily standing charge.</li>
                <li>Monitoring shows where energy goes so you can target savings.</li>
                <li>Smart control shifts or reduces run‑time safely.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> High‑duty heaters, always‑on IT kit, refrigeration cycling too often.</li>
                <li><strong>Use:</strong> Plug monitors, sub‑meters, smart sockets and app dashboards.</li>
                <li><strong>Check:</strong> Ratings, instructions and BS 7671 when installing monitors/relays.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Read key items on a UK electricity bill and relate them to usage.</li>
            <li>Estimate running cost from appliance power and run‑time in plain English.</li>
            <li>Select safe, suitable monitoring methods for common loads.</li>
            <li>Apply smart control to shift or reduce energy use without affecting protection.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Understanding the bill */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2 flex items-center gap-2"><BarChart3 className="w-5 h-5" /> Understanding your bill (plain English)</h3>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
              <li><strong>Unit rate (p/kWh):</strong> what you pay for each kilowatt‑hour used.</li>
              <li><strong>Standing charge:</strong> a daily fee added regardless of usage.</li>
              <li><strong>Time‑of‑use tariffs:</strong> cheaper off‑peak, pricier peak. Shift flexible loads where safe.</li>
              <li><strong>Simple cost idea:</strong> Power in kW × hours used × unit rate. Add standing charge and VAT for the bill total.</li>
            </ul>
          </section>

          <InlineCheck
            id="ic-266-bill"
            question="Which item changes the cost even if you use zero kWh this day?"
            options={["Unit rate", "Standing charge", "Meter serial", "Tariff name only"]}
            correctIndex={1}
            explanation="The standing charge applies per day regardless of usage."
          />
          <Separator className="my-6" />

          {/* Monitoring and verification */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2 flex items-center gap-2"><Activity className="w-5 h-5" /> Monitoring loads</h3>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
              <li><strong>Plug‑in monitors:</strong> Great for portable appliances. Do not exceed the device rating and avoid daisy‑chains.</li>
              <li><strong>Smart meters and IHD:</strong> Whole‑home view; useful trends day‑to‑day.</li>
              <li><strong>Sub‑metering/CT clamps:</strong> For circuits or larger loads. Install per manufacturer guidance and BS 7671.</li>
              <li><strong>Data logging:</strong> Look for overnight baseload and unexpected spikes to find savings.</li>
            </ul>
          </section>

          <Separator className="my-6" />

          {/* Smart control */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2 flex items-center gap-2"><Smartphone className="w-5 h-5" /> Smart tech and automations</h3>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
              <li>Scheduling: water heating, EV charging, signage and HVAC warm‑up where appropriate.</li>
              <li>Occupancy: PIR lighting and setback temperatures in low‑use spaces.</li>
              <li>Safety and ratings first: smart devices must not replace protective devices.</li>
              <li>Verification: compare monitored energy before/after to prove savings.</li>
            </ul>
          </section>

          <Separator className="my-6" />

          {/* Case studies */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2 flex items-center gap-2"><PlugZap className="w-5 h-5" /> Practical examples</h3>
            <ul className="space-y-4 text-xs sm:text-sm text-white">
              <li className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
                <p className="font-medium">1) Household energy audit</p>
                <p>Measure baseload overnight, then switch off/replace always‑on items such as old routers or media boxes. Use smart sockets on office gear to power down after hours.</p>
              </li>
              <li className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
                <p className="font-medium">2) Café refrigeration</p>
                <p>Monitor fridges/freezers for cycling and door‑left‑open alarms. Maintain seals and clear ventilation. Schedule signage lighting separately to reduce peak use.</p>
              </li>
              <li className="rounded-lg p-3 sm:p-4 bg-transparent border border-white/10">
                <p className="font-medium">3) EV charging</p>
                <p>Use the EVSE/app to schedule off‑peak charging. Confirm circuit capacity, RCD type and earthing arrangement meet BS 7671 before use.</p>
              </li>
            </ul>
          </section>

          <Separator className="my-6" />

          <InlineCheck
            id="ic-266-smart"
            question="You add a smart plug to control a 2 kW heater. Which statement is correct?"
            options={["Any plug will do", "Use a device rated for the load and keep protective devices unchanged", "Remove the fuse to save energy", "Cover vents to keep it quiet"]}
            correctIndex={1}
            explanation="Select appropriately rated equipment and do not alter protection or ventilation."
          />

          <Separator className="my-6" />

          {/* BS 7671 context */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2 flex items-center gap-2"><Percent className="w-5 h-5" /> BS 7671 context and good practice</h3>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
              <li>When adding monitoring or smart control, follow manufacturer instructions and maintain disconnection times and protective coordination.</li>
              <li>Consider grouping, ambient temperature and enclosure space for any extra devices installed.</li>
              <li>Keep records of settings, schedules and any measured savings as part of the job documentation.</li>
            </ul>
            <div className="flex items-start gap-3 bg-[#121212]/20 border-l-4 border-elec-yellow p-4 rounded mt-4" role="alert">
              <AlertTriangle className="w-5 h-5 text-elec-yellow mt-0.5" />
              <p className="text-white text-sm">Isolate, lock‑off and prove dead. Never bypass protective devices to attach monitors or controls.</p>
            </div>
          </section>
        </Card>

        {/* Extra content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">More real‑life tips and methods</h2>

          <section className="mb-6">
            <h3 className="font-medium text-white mb-2 flex items-center gap-2"><BarChart3 className="w-5 h-5" /> Bill deep‑dive: tariff notes</h3>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
              <li>Time‑of‑use tariffs favour shifting flexible loads (EV, water heating). Avoid moving safety‑critical loads.</li>
              <li>Unit rate applies to kWh; standing charge applies per day. Budget both.</li>
              <li>Small businesses may see capacity/demand charges; check the contract and avoid avoidable peaks.</li>
            </ul>
          </section>

          <Separator className="my-6" />

          <section className="mb-6">
            <h3 className="font-medium text-white mb-2 flex items-center gap-2"><Activity className="w-5 h-5" /> Monitoring checklist</h3>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
              <li>Choose a method: plug‑in monitor (portable loads), sub‑meter/CT (circuits), smart meter data (whole site).</li>
              <li>Confirm ratings, install per manufacturer, and keep ventilation clear.</li>
              <li>Log at least a week before and after changes; compare similar conditions.</li>
            </ul>
          </section>

          <Separator className="my-6" />

          <InlineCheck
            id="ic-266-ct"
            question="A CT clamp for a single‑phase circuit should be installed…"
            options={["Around both live and neutral together", "On the live only, in the correct direction, per instructions", "On the CPC", "Anywhere inside without isolation"]}
            correctIndex={1}
            explanation="Clamping both conductors cancels the reading. Follow instructions and isolate where required."
          />

          <Separator className="my-6" />

          <section className="mb-6">
            <h3 className="font-medium text-white mb-2 flex items-center gap-2"><Smartphone className="w-5 h-5" /> Smart tech pitfalls and fixes</h3>
            <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
              <li>Underrated adaptors → use appropriately rated devices and avoid daisy‑chains.</li>
              <li>Schedules forgotten → label and review monthly; keep a simple checklist.</li>
              <li>Cloud outage → ensure local fallback or manual control is available.</li>
            </ul>
          </section>
          
          <Separator className="my-6" />

          {/* Additional comprehensive content */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-2">Advanced monitoring and control techniques</h3>
            
            <div className="space-y-4">
              <div className="rounded-lg p-4 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-border/30">
                <h4 className="font-medium mb-2 text-blue-700 dark:text-elec-yellow">Data analysis and interpretation</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Baseload identification:</strong> Measure overnight consumption to find always-on loads</li>
                  <li><strong>Peak demand analysis:</strong> Identify when highest power is used and potential for load shifting</li>
                  <li><strong>Load profiling:</strong> Understand daily, weekly, and seasonal patterns</li>
                  <li><strong>Anomaly detection:</strong> Spot unusual consumption that may indicate faults or inefficiencies</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-elec-yellow/30">
                <h4 className="font-medium mb-2 text-emerald-700 dark:text-elec-yellow">Smart home integration</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Home automation platforms:</strong> Integrate multiple smart devices for coordinated control</li>
                  <li><strong>Voice control:</strong> Use assistants for manual override of automated systems</li>
                  <li><strong>Smartphone apps:</strong> Remote monitoring and control with usage notifications</li>
                  <li><strong>Interoperability:</strong> Ensure devices can communicate using standards like Zigbee or Z-Wave</li>
                </ul>
              </div>

              <div className="rounded-lg p-4 bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-400/30">
                <h4 className="font-medium mb-2 text-amber-700 dark:text-amber-300">Commercial and industrial applications</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Sub-metering strategies:</strong> Department or process-level monitoring for cost allocation</li>
                  <li><strong>Demand response:</strong> Automatic load reduction during peak pricing periods</li>
                  <li><strong>Power quality monitoring:</strong> Track voltage, current, and power factor for equipment health</li>
                  <li><strong>Energy management systems:</strong> Centralised control and reporting for large facilities</li>
                </ul>
              </div>
            </div>
          </section>

          <Separator className="my-6" />

          <section className="mb-2">
            <h3 className="font-medium text-white mb-2">Troubleshooting common monitoring issues</h3>
            
            <div className="rounded-lg p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-border/30">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium mb-2">Common problems:</h5>
                  <ul className="space-y-1 text-xs">
                    <li>• Inaccurate readings from incorrect CT installation</li>
                    <li>• Smart devices losing connectivity</li>
                    <li>• Overloaded monitoring equipment</li>
                    <li>• Data logging gaps or inconsistencies</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium mb-2">Solutions:</h5>
                  <ul className="space-y-1 text-xs">
                    <li>• Follow manufacturer installation instructions precisely</li>
                    <li>• Check WiFi signal strength and network stability</li>
                    <li>• Verify all equipment is within rated parameters</li>
                    <li>• Regular calibration and maintenance checks</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </Card>

        {/* Pocket Guide */}
        <Card className="mb-8 p-6 bg-gradient-to-br from-emerald-500/10 to-orange-500/10 border-2 border-elec-yellow/30">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-elec-yellow" />
            Energy Monitoring & Smart Tech - Pocket Guide
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-sm">
            <div className="space-y-4">
              <div className="bg-[#121212]/50 rounded-lg p-3 border border-white/10">
                <h4 className="font-semibold mb-2 text-elec-yellow">Bill Basics</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Unit rate (p/kWh) × kWh used = energy cost</li>
                  <li>• Standing charge applies daily regardless of use</li>
                  <li>• Time-of-use tariffs: cheaper off-peak rates</li>
                  <li>• VAT added to final total (usually 5% domestic)</li>
                  <li>• Read meter from left to right</li>
                </ul>
              </div>

              <div className="bg-[#121212]/50 rounded-lg p-3 border border-white/10">
                <h4 className="font-semibold mb-2 text-emerald-600">Monitoring Methods</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Plug-in monitors: portable appliances only</li>
                  <li>• CT clamps: single live conductor, correct direction</li>
                  <li>• Smart meters: whole-home consumption data</li>
                  <li>• Sub-meters: circuit or equipment specific</li>
                  <li>• Always check equipment ratings first</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#121212]/50 rounded-lg p-3 border border-white/10">
                <h4 className="font-semibold mb-2 text-elec-yellow">Smart Control</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Schedule flexible loads for off-peak times</li>
                  <li>• Use occupancy sensors for lighting control</li>
                  <li>• Smart plugs for appliance monitoring/control</li>
                  <li>• EV charging: schedule for cheapest rates</li>
                  <li>• Never compromise safety systems</li>
                </ul>
              </div>

              <div className="bg-[#121212]/50 rounded-lg p-3 border border-white/10">
                <h4 className="font-semibold mb-2 text-red-600">Safety Checklist</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Check ratings before installation</li>
                  <li>• Follow manufacturer instructions</li>
                  <li>• Maintain proper isolation procedures</li>
                  <li>• Document all changes and settings</li>
                  <li>• Regular inspection and maintenance</li>
                </ul>
              </div>
            </div>
          </div>
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
          <Quiz questions={quizQuestions as any} title="Real‑life applications" />
        </Card>

        {/* Structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </main>
    </div>
  );
};

export default Module2Section6_6;
