/**
 * Level 3 Module 6 Section 5.3 - Radial Circuits
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Radial Circuits - Level 3 Module 6 Section 5.3";
const DESCRIPTION = "Master radial circuit design for socket outlets and fixed equipment. Learn BS 7671 requirements for 20A and 32A radial circuits, cable sizing, floor area limits, and when to use radials over ring circuits.";

const quickCheckQuestions = [
  { id: "check-1", question: "What cable size is required for a 32A radial circuit?", options: ["1.5mm²", "2.5mm²", "4.0mm²", "6.0mm²"], correctIndex: 2, explanation: "A 32A radial circuit requires 4.0mm² cable to provide adequate current-carrying capacity. Unlike ring circuits, radials carry all current through a single path." },
  { id: "check-2", question: "What is the maximum floor area for a 20A radial circuit?", options: ["20m²", "50m²", "75m²", "100m²"], correctIndex: 1, explanation: "BS 7671 recommends a 20A radial circuit using 2.5mm² cable should serve a floor area not exceeding 50m². For larger areas, use a 32A radial or ring circuit." },
  { id: "check-3", question: "How does a radial circuit differ from a ring circuit?", options: ["Uses larger cable", "Starts and ends at consumer unit", "Has single cable path from source to loads", "Always uses RCD protection"], correctIndex: 2, explanation: "A radial circuit has a single cable path from the consumer unit to the loads. It doesn't return to the consumer unit like a ring circuit does." },
  { id: "check-4", question: "What is an advantage of radial circuits over ring circuits?", options: ["Use less copper", "Simpler fault finding and testing", "Higher current capacity", "No RCD required"], correctIndex: 1, explanation: "Radial circuits are simpler to test and easier for fault finding. There's no need for ring continuity testing, and breaks are immediately apparent." }
];

const quizQuestions = [
  { id: 1, question: "A 20A radial circuit typically uses:", options: ["1.5mm² cable", "2.5mm² cable", "4.0mm² cable", "6.0mm² cable"], correctAnswer: 1, explanation: "A 20A radial circuit uses 2.5mm² cable. This provides adequate current-carrying capacity for the 20A protective device with appropriate installation methods." },
  { id: 2, question: "The maximum floor area for a 32A radial circuit is:", options: ["50m²", "75m²", "100m²", "No limit specified"], correctAnswer: 1, explanation: "BS 7671 recommends a 32A radial circuit using 4.0mm² cable should serve a floor area not exceeding 75m². This is less than the 100m² for a ring circuit." },
  { id: 3, question: "For a dedicated appliance circuit (e.g., cooker), a radial circuit is preferred because:", options: ["It uses less cable", "The load is concentrated at one point, not distributed", "Ring circuits are not allowed", "It's easier to test"], correctAnswer: 1, explanation: "Dedicated circuits serve single high-power appliances at one location. A radial is simpler and more efficient than running a ring to a single point." },
  { id: 4, question: "Maximum Zs for a 20A Type B MCB at conductor operating temperature is:", options: ["0.69 ohms", "1.37 ohms", "2.19 ohms", "2.87 ohms"], correctAnswer: 2, explanation: "From Table 41.3, maximum Zs for a 20A Type B MCB is 2.19 ohms. This must be verified at operating temperature (apply 1.2 multiplier to measured values at 10°C)." },
  { id: 5, question: "When might you choose a radial circuit over a ring circuit?", options: ["Always for socket outlets", "For smaller areas or where fault-finding simplicity is important", "Only for lighting", "Never - rings are always better"], correctAnswer: 1, explanation: "Radials are often chosen for smaller floor areas, dedicated appliance circuits, or where simpler testing and fault-finding is desired. Modern practice increasingly favours multiple radials." },
  { id: 6, question: "A radial circuit serving socket outlets in a domestic kitchen should have:", options: ["No RCD protection", "30mA RCD protection", "100mA RCD protection", "Time-delayed RCD only"], correctAnswer: 1, explanation: "Socket outlets up to 32A in domestic premises require 30mA RCD protection per Regulation 411.3.3. This applies to both radial and ring circuits." },
  { id: 7, question: "The cable from the consumer unit in a radial circuit must be sized for:", options: ["Half the protective device rating", "The full protective device rating", "Double the expected load", "The number of sockets"], correctAnswer: 1, explanation: "In a radial circuit, all current flows through a single cable path. The cable must be sized for the full protective device rating, ensuring Ib <= In <= Iz." },
  { id: 8, question: "For a 20A radial using 2.5mm² cable (Method C), Iz from Table 4D5 is:", options: ["20A", "24A", "27A", "32A"], correctAnswer: 2, explanation: "From Table 4D5 (reference method C - clipped direct), 2.5mm² twin cable has Iz of 27A. This exceeds the 20A device rating, satisfying In <= Iz." },
  { id: 9, question: "Spurs from a radial circuit:", options: ["Are not permitted", "Follow the same rules as ring circuit spurs", "Must be fused regardless of load", "Can serve unlimited sockets"], correctAnswer: 1, explanation: "Spurs from radial circuits follow similar principles to ring circuits. Non-fused spurs are limited to single/twin sockets; fused spurs can serve more." },
  { id: 10, question: "Testing a radial circuit is simpler than a ring because:", options: ["No resistance measurements needed", "Continuity test confirms complete path without figure-of-eight", "RCD testing is not required", "Insulation resistance is lower"], correctAnswer: 1, explanation: "Radial circuits require straightforward end-to-end continuity testing. There's no need for the figure-of-eight cross-connection test used for rings." },
  { id: 11, question: "For a 32A radial using 4.0mm² cable (Method C), Iz from Table 4D5 is:", options: ["30A", "32A", "37A", "40A"], correctAnswer: 2, explanation: "From Table 4D5 (reference method C), 4.0mm² twin cable has Iz of 37A. This exceeds the 32A device rating, satisfying In <= Iz." },
  { id: 12, question: "Multiple radial circuits instead of one ring circuit offers:", options: ["Less copper usage", "Better discrimination - fault affects only one circuit", "Lower maximum demand", "Simpler consumer unit"], correctAnswer: 1, explanation: "Multiple radials provide better selectivity. A fault trips only the affected circuit, leaving others operational. This improves resilience compared to a single large ring." }
];

const faqs = [
  { question: "When should I use a radial circuit instead of a ring?", answer: "Use radial circuits for: smaller floor areas (under 50m² for 20A, under 75m² for 32A), dedicated appliance circuits, areas where fault-finding simplicity is important, and when installing multiple smaller circuits rather than one large ring." },
  { question: "Can I use 2.5mm² cable for a 32A radial circuit?", answer: "No. A 32A radial requires 4.0mm² cable because all current flows through a single path. In a ring circuit, 2.5mm² works because current splits between two paths. Always check Table 4D1A-4D5 for your installation method." },
  { question: "How do I test a radial circuit?", answer: "Radial testing is simpler than ring testing: 1) Continuity of protective conductors (R1+R2), 2) Insulation resistance between conductors and to earth, 3) Earth fault loop impedance (Zs), 4) RCD operation if fitted. No figure-of-eight test needed." },
  { question: "Are multiple radials more expensive than one ring?", answer: "Multiple radials may use more cable but offer benefits: easier fault finding, better discrimination (faults affect only one circuit), simpler testing, and potentially better load distribution. The slight cost increase often provides better long-term value." },
  { question: "What about voltage drop in long radial circuits?", answer: "Voltage drop is more significant in radials than rings because current doesn't split. Calculate using VD = (mV/A/m x I x L) / 1000. For longer runs, you may need to increase cable size or split into shorter radial circuits." }
];

const Level3Module6Section5_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5" asChild>
            <Link to="/study-centre/apprentice/level3-module6-section5"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3"><Zap className="h-4 w-4" /><span>Module 6.5.3</span></div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">Radial Circuits</h1>
          <p className="text-white/80">Design and application of radial circuits for socket outlets and equipment</p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>20A radial:</strong> 2.5mm², max 50m² floor area</li>
              <li><strong>32A radial:</strong> 4.0mm², max 75m² floor area</li>
              <li><strong>Advantage:</strong> Simpler testing and fault finding</li>
              <li><strong>Use for:</strong> Dedicated circuits, smaller areas</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Single cable from CU to loads</li>
              <li><strong>Use:</strong> Cooker circuits, workshop areas</li>
              <li><strong>Design:</strong> Modern alternative to large rings</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {["Design 20A and 32A radial circuits to BS 7671", "Select appropriate cable sizes for radial circuits", "Apply floor area recommendations from the regulations", "Compare advantages of radials versus ring circuits", "Calculate Zs and voltage drop for radial circuits", "Test radial circuits correctly"].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" /><span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">01</span>Radial Circuit Fundamentals</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>A radial circuit provides a single cable path from the consumer unit to all points of use. Unlike a ring circuit, it does not return to the origin. This means all current flows through one cable, requiring appropriate sizing.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Radial Circuit Specifications (BS 7671):</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Circuit Type</th><th className="border border-white/10 px-2 py-1 text-left">Protective Device</th><th className="border border-white/10 px-2 py-1 text-left">Minimum Cable</th><th className="border border-white/10 px-2 py-1 text-left">Max Floor Area</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">20A radial</td><td className="border border-white/10 px-2 py-1">20A MCB or fuse</td><td className="border border-white/10 px-2 py-1">2.5mm²</td><td className="border border-white/10 px-2 py-1">50m²</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">32A radial</td><td className="border border-white/10 px-2 py-1">32A MCB or fuse</td><td className="border border-white/10 px-2 py-1">4.0mm²</td><td className="border border-white/10 px-2 py-1">75m²</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Dedicated circuit</td><td className="border border-white/10 px-2 py-1">As per load</td><td className="border border-white/10 px-2 py-1">As per load</td><td className="border border-white/10 px-2 py-1">N/A</td></tr>
                </tbody>
              </table>
            </div>
            <p>The key difference from ring circuits is that radials cannot use the reduced cable size benefit. A 32A radial needs 4.0mm² cable, whereas a 32A ring can use 2.5mm² because current splits between two paths.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[0]]} className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">02</span>Cable Sizing for Radials</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Cable selection for radial circuits follows the standard process: design current must not exceed device rating, which must not exceed cable current-carrying capacity. The cable carries full circuit current throughout its length.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Current-Carrying Capacity (Table 4D5, Method C):</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Cable Size</th><th className="border border-white/10 px-2 py-1 text-left">Iz (Method C)</th><th className="border border-white/10 px-2 py-1 text-left">Suitable For</th><th className="border border-white/10 px-2 py-1 text-left">mV/A/m</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">1.5mm²</td><td className="border border-white/10 px-2 py-1">20A</td><td className="border border-white/10 px-2 py-1">16A circuits</td><td className="border border-white/10 px-2 py-1">29</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">2.5mm²</td><td className="border border-white/10 px-2 py-1">27A</td><td className="border border-white/10 px-2 py-1">20A radials</td><td className="border border-white/10 px-2 py-1">18</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">4.0mm²</td><td className="border border-white/10 px-2 py-1">37A</td><td className="border border-white/10 px-2 py-1">32A radials</td><td className="border border-white/10 px-2 py-1">11</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">6.0mm²</td><td className="border border-white/10 px-2 py-1">47A</td><td className="border border-white/10 px-2 py-1">40A circuits</td><td className="border border-white/10 px-2 py-1">7.3</td></tr>
                </tbody>
              </table>
            </div>
            <p>Remember to apply correction factors for grouping (Cg), ambient temperature (Ca), and thermal insulation (Ci) as needed. The derated Iz must still exceed In.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[1]]} className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">03</span>Radial vs Ring Circuits</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Understanding when to use radial versus ring circuits is essential for efficient design. Each has advantages depending on the application.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Comparison of Circuit Types:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Factor</th><th className="border border-white/10 px-2 py-1 text-left">Radial Circuit</th><th className="border border-white/10 px-2 py-1 text-left">Ring Circuit</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Cable size (32A)</td><td className="border border-white/10 px-2 py-1">4.0mm² required</td><td className="border border-white/10 px-2 py-1">2.5mm² acceptable</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Floor area (32A)</td><td className="border border-white/10 px-2 py-1">75m² maximum</td><td className="border border-white/10 px-2 py-1">100m² maximum</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Testing complexity</td><td className="border border-white/10 px-2 py-1">Simple continuity</td><td className="border border-white/10 px-2 py-1">Figure-of-eight method</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Fault finding</td><td className="border border-white/10 px-2 py-1">Straightforward</td><td className="border border-white/10 px-2 py-1">More complex</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Best application</td><td className="border border-white/10 px-2 py-1">Dedicated loads, smaller areas</td><td className="border border-white/10 px-2 py-1">Distributed loads, larger areas</td></tr>
                </tbody>
              </table>
            </div>
            <p>Modern design practice increasingly favours multiple radial circuits over single large ring circuits. This provides better discrimination, simpler testing, and easier extension or modification.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[2]]} className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">04</span>Dedicated Radial Circuits</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Dedicated circuits serve single high-power appliances. These are almost always radial circuits because the load is at one location - there's no benefit to a ring configuration.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Dedicated Circuits:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Appliance</th><th className="border border-white/10 px-2 py-1 text-left">Typical Rating</th><th className="border border-white/10 px-2 py-1 text-left">Circuit Design</th><th className="border border-white/10 px-2 py-1 text-left">Cable Size</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Electric cooker</td><td className="border border-white/10 px-2 py-1">Up to 13.8kW</td><td className="border border-white/10 px-2 py-1">32A or 40A radial</td><td className="border border-white/10 px-2 py-1">6.0mm²</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Electric shower</td><td className="border border-white/10 px-2 py-1">9-10.5kW</td><td className="border border-white/10 px-2 py-1">40A or 45A radial</td><td className="border border-white/10 px-2 py-1">6.0mm² or 10mm²</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Immersion heater</td><td className="border border-white/10 px-2 py-1">3kW</td><td className="border border-white/10 px-2 py-1">16A radial</td><td className="border border-white/10 px-2 py-1">2.5mm²</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Storage heater</td><td className="border border-white/10 px-2 py-1">2-3.4kW each</td><td className="border border-white/10 px-2 py-1">20A radial (per heater or pair)</td><td className="border border-white/10 px-2 py-1">2.5mm²</td></tr>
                </tbody>
              </table>
            </div>
            <p>For cooker circuits, diversity can be applied per Table A1 of the On-Site Guide. The first 10A is taken at 100%, the remainder at 30%, plus 5A if a socket outlet is included in the cooker control unit.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[3]]} className="my-8" />

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Practical Guidance</h2>
          <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/30 text-sm text-white space-y-2">
            <p><strong>Design considerations:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>For areas over 50m², consider a 32A radial or ring circuit</li>
              <li>Multiple 20A radials often provide better resilience than one large circuit</li>
              <li>Position consumer unit to minimise cable runs and voltage drop</li>
              <li>Consider future load growth when selecting circuit type</li>
              <li>Document circuit design decisions for future reference</li>
            </ul>
            <p className="mt-3"><strong>Voltage drop consideration:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Radials have higher voltage drop than rings for same cable size</li>
              <li>For 20A radial using 2.5mm²: mV/A/m = 18</li>
              <li>Example: 20A x 25m = VD = (18 x 20 x 25)/1000 = 9V (3.9%)</li>
              <li>Keep within 5% limit for socket circuits (11.5V at 230V)</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Reference</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-elec-yellow/90 font-medium mb-2">Radial Circuit Limits</p>
              <table className="w-full text-xs">
                <tbody>
                  <tr><td className="py-1 text-white/70">20A radial cable</td><td className="py-1 text-white">2.5mm² minimum</td></tr>
                  <tr><td className="py-1 text-white/70">20A floor area</td><td className="py-1 text-white">50m² maximum</td></tr>
                  <tr><td className="py-1 text-white/70">32A radial cable</td><td className="py-1 text-white">4.0mm² minimum</td></tr>
                  <tr><td className="py-1 text-white/70">32A floor area</td><td className="py-1 text-white">75m² maximum</td></tr>
                  <tr><td className="py-1 text-white/70">RCD protection</td><td className="py-1 text-white">30mA (domestic sockets)</td></tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-elec-yellow/90 font-medium mb-2">Maximum Zs Values (Type B MCB)</p>
              <table className="w-full text-xs">
                <tbody>
                  <tr><td className="py-1 text-white/70">16A Type B</td><td className="py-1 text-white">2.73 ohms</td></tr>
                  <tr><td className="py-1 text-white/70">20A Type B</td><td className="py-1 text-white">2.19 ohms</td></tr>
                  <tr><td className="py-1 text-white/70">32A Type B</td><td className="py-1 text-white">1.37 ohms</td></tr>
                  <tr><td className="py-1 text-white/70">40A Type B</td><td className="py-1 text-white">1.09 ohms</td></tr>
                  <tr><td className="py-1 text-white/70">Temperature multiplier</td><td className="py-1 text-white">x 0.8 for measured values</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <Quiz questions={quizQuestions} />

        <section className="mt-12 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group p-3 rounded-lg bg-white/5 text-sm">
                <summary className="cursor-pointer text-white font-medium">{faq.question}</summary>
                <p className="mt-2 text-white/70">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <nav className="flex flex-col sm:flex-row gap-4 justify-between pt-8 border-t border-white/10">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/5" asChild>
            <Link to="/study-centre/apprentice/level3-module6-section5-2"><ArrowLeft className="w-4 h-4 mr-2" />Previous: Ring Final Circuits</Link>
          </Button>
          <Button className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90" asChild>
            <Link to="/study-centre/apprentice/level3-module6-section5-4">Next: Lighting Circuits<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module6Section5_3;
