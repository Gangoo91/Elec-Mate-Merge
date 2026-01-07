/**
 * Level 3 Module 6 Section 5.4 - Lighting Circuits
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Lighting Circuits - Level 3 Module 6 Section 5.4";
const DESCRIPTION = "Master lighting circuit design to BS 7671. Learn about 1.5mm² cable sizing, 6A protection, loop-in wiring, two-way switching, voltage drop limits of 3%, and emergency lighting requirements.";

const quickCheckQuestions = [
  { id: "check-1", question: "What is the typical protective device rating for a domestic lighting circuit?", options: ["3A", "6A", "10A", "16A"], correctIndex: 1, explanation: "Domestic lighting circuits typically use a 6A MCB or 5A fuse. This provides adequate capacity for approximately 10-12 lighting points while allowing 1.5mm² cable to be used." },
  { id: "check-2", question: "What is the maximum voltage drop permitted for lighting circuits?", options: ["1%", "3%", "5%", "10%"], correctIndex: 1, explanation: "BS 7671 recommends a maximum 3% voltage drop for lighting circuits (6.9V at 230V). This is stricter than the 5% limit for power circuits due to the visual impact of voltage variations on lighting." },
  { id: "check-3", question: "In a loop-in ceiling rose system, where do the switch wire connections return?", options: ["To the consumer unit", "To the ceiling rose", "To a junction box", "To the next light fitting"], correctIndex: 1, explanation: "In loop-in wiring, the switch wire (switch drop) goes down to the switch and returns to the same ceiling rose. The ceiling rose contains all the connections for that light point." },
  { id: "check-4", question: "What is the purpose of a three-plate ceiling rose?", options: ["Connect three lights", "Accommodate loop-in wiring with supply, switch and lamp terminals", "For three-way switching", "To reduce voltage drop"], correctIndex: 1, explanation: "A three-plate ceiling rose has separate terminal blocks for: supply in/out (loop), switch wire, and neutral. This allows loop-in wiring where all connections are made at the rose." }
];

const quizQuestions = [
  { id: 1, question: "A domestic lighting circuit using 1.5mm² cable is typically protected by:", options: ["3A MCB", "6A MCB", "10A MCB", "16A MCB"], correctAnswer: 1, explanation: "6A protection is standard for 1.5mm² lighting circuits. From Table 4D5, 1.5mm² has Iz of 20A (Method C), well exceeding the 6A device rating." },
  { id: 2, question: "How many lighting points can typically be connected to a 6A circuit?", options: ["4-6 points", "8-10 points", "10-12 points", "20+ points"], correctAnswer: 2, explanation: "The IET Guidance Note 1 suggests a maximum of 10-12 lighting points per 6A circuit. This allows approximately 100W per point, totalling up to 1200W (5.2A at 230V)." },
  { id: 3, question: "The mV/A/m value for 1.5mm² cable (Table 4D5) is:", options: ["18", "29", "44", "7.3"], correctAnswer: 1, explanation: "From Table 4D5, 1.5mm² twin and earth cable has a voltage drop of 29 mV/A/m. This is used in the formula VD = (mV/A/m x I x L) / 1000." },
  { id: 4, question: "For a 6A lighting circuit, maximum Zs for Type B MCB is:", options: ["2.19 ohms", "4.38 ohms", "7.28 ohms", "1.37 ohms"], correctAnswer: 2, explanation: "From Table 41.3, maximum Zs for a 6A Type B MCB is 7.28 ohms. This generous value means most lighting circuits easily meet disconnection requirements." },
  { id: 5, question: "Two-way switching allows control of a light from:", options: ["One location only", "Two different locations", "Three different locations", "Any number of locations"], correctAnswer: 1, explanation: "Two-way switching uses two special switches (each with L1 and L2 strappers) to control one light from two different positions, such as top and bottom of stairs." },
  { id: 6, question: "Intermediate switching is used when:", options: ["Only two switch positions are needed", "Three or more switch positions are needed", "Dimming is required", "Emergency lighting is installed"], correctAnswer: 1, explanation: "Intermediate switches are added between two-way switches when control from three or more positions is needed. Each intermediate switch cross-connects the strappers." },
  { id: 7, question: "The voltage drop calculation for a 6A lighting circuit, 15m cable run using 1.5mm², gives:", options: ["1.3V", "2.6V", "3.9V", "5.2V"], correctAnswer: 1, explanation: "VD = (29 x 6 x 15) / 1000 = 2.61V (approximately 2.6V). This is within the 3% limit of 6.9V, so the cable size is acceptable." },
  { id: 8, question: "In junction box wiring, the switch wire connections are made:", options: ["At the ceiling rose", "At a separate junction box", "At the consumer unit", "At the light switch"], correctAnswer: 1, explanation: "Junction box wiring uses a four-terminal junction box for connections. The switch drop runs from the junction box to the switch and back. The ceiling rose is simpler with fewer terminals." },
  { id: 9, question: "Emergency lighting to BS 5266 requires maintained fittings to:", options: ["Only work during power failure", "Operate continuously and during power failure", "Be battery-powered only", "Connect to the main lighting circuit"], correctAnswer: 1, explanation: "Maintained emergency lighting operates continuously as normal lighting but remains illuminated during power failure using internal batteries. Non-maintained lights only illuminate during emergencies." },
  { id: 10, question: "For LED lighting circuits, a key design consideration is:", options: ["Higher cable size always needed", "Electronic driver compatibility with dimming and control systems", "Must use 10A MCBs", "Voltage drop limits don't apply"], correctAnswer: 1, explanation: "LED drivers may have specific requirements for dimming compatibility, inrush current handling, and control systems (DALI, 0-10V). Select MCBs to handle inrush current from electronic drivers." },
  { id: 11, question: "The brown wire in a switch drop cable is used for:", options: ["Neutral throughout", "Switched line (should be marked brown/sleeved)", "Earth", "Supply line only"], correctAnswer: 1, explanation: "In switch wiring, both cores carry line voltage (permanent line down, switched line back). The blue core must be sleeved brown at both ends to show it's a switched line, not neutral." },
  { id: 12, question: "RCD protection for lighting circuits is:", options: ["Always required", "Required in bathrooms and for cables in walls without earthed metallic covering", "Never required", "Only for outdoor lighting"], correctAnswer: 1, explanation: "Lighting circuits in domestic bathrooms require RCD protection. Cables in walls at less than 50mm depth without earthed metallic covering also require RCD protection per Regulation 411.3.4." }
];

const faqs = [
  { question: "How many lights can I have on one circuit?", answer: "IET guidance suggests 10-12 lighting points per 6A circuit. In practice, with LED lighting drawing much less current than older lamps, more fittings could be connected, but it's good practice to split between multiple circuits for resilience and to limit the impact of faults." },
  { question: "Should I use loop-in or junction box wiring?", answer: "Loop-in wiring is more common in modern installations - all connections at the ceiling rose make for simpler cable routes. Junction box wiring keeps the ceiling rose simpler and may be preferred where rose space is limited or for certain light fittings. Both methods are acceptable to BS 7671." },
  { question: "Do I need RCD protection for lighting circuits?", answer: "Yes in certain locations: bathroom lighting requires RCD protection (Zone 1 and 2). Also, cables in walls/partitions at less than 50mm depth require RCD protection unless protected by earthed metallic covering or conduit. Many modern installations use RCD protection throughout." },
  { question: "How do I wire two-way and intermediate switching?", answer: "Two-way switches have common (C), L1 and L2 terminals. Connect permanent line to common at one switch, lamp to common at the other. L1 connects to L1, L2 connects to L2 (strappers). For intermediate, add between the strappers - it cross-connects them to reverse the switching." },
  { question: "What about voltage drop with long lighting cable runs?", answer: "Use VD = (mV/A/m x I x L) / 1000. For 1.5mm² (29 mV/A/m) at 6A over 15m = 2.6V. Maximum is 3% = 6.9V. For longer runs, increase cable size to 2.5mm² (18 mV/A/m) or split into multiple circuits from distribution points closer to the load." }
];

const Level3Module6Section5_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5" asChild>
            <Link to="../level3-module6-section5"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3"><Zap className="h-4 w-4" /><span>Module 6.5.4</span></div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">Lighting Circuits</h1>
          <p className="text-white/80">Design of lighting circuits including wiring methods and switching</p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Cable:</strong> 1.5mm² with 6A protection</li>
              <li><strong>Points:</strong> Maximum 10-12 per circuit</li>
              <li><strong>Voltage drop:</strong> 3% maximum (6.9V)</li>
              <li><strong>Wiring:</strong> Loop-in or junction box methods</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Three-plate ceiling roses, switch drops</li>
              <li><strong>Use:</strong> Domestic and commercial lighting design</li>
              <li><strong>Test:</strong> R1+R2, insulation, polarity check</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {["Design lighting circuits to BS 7671 requirements", "Calculate voltage drop for lighting cables", "Understand loop-in and junction box wiring", "Wire two-way and intermediate switching", "Apply RCD protection requirements to lighting", "Design emergency lighting systems"].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" /><span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">01</span>Lighting Circuit Basics</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Lighting circuits supply fixed luminaires and are typically lower current than socket circuits. The design must consider the number of lighting points, cable routes, switching requirements, and voltage drop limitations.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Standard Lighting Circuit Specification:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Parameter</th><th className="border border-white/10 px-2 py-1 text-left">Typical Value</th><th className="border border-white/10 px-2 py-1 text-left">Notes</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Cable size</td><td className="border border-white/10 px-2 py-1">1.5mm²</td><td className="border border-white/10 px-2 py-1">Twin and earth, flat or round</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Protective device</td><td className="border border-white/10 px-2 py-1">6A MCB (Type B)</td><td className="border border-white/10 px-2 py-1">Or 5A fuse (older installations)</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Lighting points</td><td className="border border-white/10 px-2 py-1">10-12 maximum</td><td className="border border-white/10 px-2 py-1">Per IET Guidance Note 1</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Voltage drop limit</td><td className="border border-white/10 px-2 py-1">3% (6.9V at 230V)</td><td className="border border-white/10 px-2 py-1">Stricter than power circuits</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Maximum Zs (6A Type B)</td><td className="border border-white/10 px-2 py-1">7.28 ohms</td><td className="border border-white/10 px-2 py-1">Usually easily achieved</td></tr>
                </tbody>
              </table>
            </div>
            <p>The 3% voltage drop limit for lighting is stricter than the 5% for other circuits because voltage variations are more noticeable in lighting - affecting brightness and potentially causing flicker with some lamp types.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[0]]} className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">02</span>Wiring Methods</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Two main wiring methods are used for lighting circuits: loop-in at ceiling roses, and junction box wiring. Each has advantages depending on the installation requirements.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Comparison of Wiring Methods:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Feature</th><th className="border border-white/10 px-2 py-1 text-left">Loop-in at Rose</th><th className="border border-white/10 px-2 py-1 text-left">Junction Box</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Connections at</td><td className="border border-white/10 px-2 py-1">Ceiling rose (3-plate)</td><td className="border border-white/10 px-2 py-1">Junction box + simple rose</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Cable to switch</td><td className="border border-white/10 px-2 py-1">From ceiling rose</td><td className="border border-white/10 px-2 py-1">From junction box</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Ceiling rose type</td><td className="border border-white/10 px-2 py-1">Three-plate required</td><td className="border border-white/10 px-2 py-1">Simple two-terminal</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Advantages</td><td className="border border-white/10 px-2 py-1">Simpler cable routes</td><td className="border border-white/10 px-2 py-1">Smaller ceiling roses</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Modern preference</td><td className="border border-white/10 px-2 py-1">Most common</td><td className="border border-white/10 px-2 py-1">Specialist applications</td></tr>
                </tbody>
              </table>
            </div>
            <p>In loop-in wiring, the supply cable loops in and out of each ceiling rose, with the switch wire also connecting at the rose. This keeps all connections accessible at one point.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[1]]} className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">03</span>Switching Arrangements</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Lighting can be controlled from one, two, or more positions using different switch arrangements. Understanding the wiring for each is essential for lighting circuit design.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Switch Types and Applications:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Switch Type</th><th className="border border-white/10 px-2 py-1 text-left">Control Positions</th><th className="border border-white/10 px-2 py-1 text-left">Typical Application</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">One-way (single pole)</td><td className="border border-white/10 px-2 py-1">One position</td><td className="border border-white/10 px-2 py-1">Single room entry point</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Two-way</td><td className="border border-white/10 px-2 py-1">Two positions</td><td className="border border-white/10 px-2 py-1">Stairs, halls with two doors</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Intermediate</td><td className="border border-white/10 px-2 py-1">Three or more positions</td><td className="border border-white/10 px-2 py-1">Long corridors, large rooms</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Dimmer switch</td><td className="border border-white/10 px-2 py-1">Variable brightness</td><td className="border border-white/10 px-2 py-1">Living rooms, dining areas</td></tr>
                </tbody>
              </table>
            </div>
            <p>Two-way switches have three terminals: common (C) and two strappers (L1, L2). The common terminals connect to permanent live and lamp; the strappers connect together between switches. Intermediate switches cross-connect the strappers.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[2]]} className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">04</span>Special Lighting Applications</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Modern lighting design includes LED systems, emergency lighting, and smart lighting controls. Each has specific design requirements beyond basic circuit protection.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Special Lighting Requirements:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Application</th><th className="border border-white/10 px-2 py-1 text-left">Key Considerations</th><th className="border border-white/10 px-2 py-1 text-left">Standards</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">LED lighting</td><td className="border border-white/10 px-2 py-1">Driver compatibility, inrush current, dimming</td><td className="border border-white/10 px-2 py-1">Manufacturer data</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Emergency lighting</td><td className="border border-white/10 px-2 py-1">Maintained/non-maintained, battery duration</td><td className="border border-white/10 px-2 py-1">BS 5266</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Bathroom lighting</td><td className="border border-white/10 px-2 py-1">IP ratings, zones, RCD protection</td><td className="border border-white/10 px-2 py-1">BS 7671 Section 701</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Outdoor lighting</td><td className="border border-white/10 px-2 py-1">IP ratings, isolation, RCD protection</td><td className="border border-white/10 px-2 py-1">BS 7671 Section 714</td></tr>
                </tbody>
              </table>
            </div>
            <p>Emergency lighting must be designed to BS 5266 and tested regularly. Maintained fittings operate continuously and stay lit during power failure; non-maintained fittings only illuminate when normal lighting fails.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[3]]} className="my-8" />

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Practical Guidance</h2>
          <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/30 text-sm text-white space-y-2">
            <p><strong>Design considerations:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Split lighting across multiple circuits for resilience (e.g., ground and first floor on different circuits)</li>
              <li>Consider separate circuits for areas requiring constant lighting (halls, stairs)</li>
              <li>Allow for future load increases when specifying cable sizes</li>
              <li>Ensure switch drops are correctly identified with brown sleeving on blue cores</li>
              <li>Select appropriate IP ratings for luminaires in damp or outdoor locations</li>
            </ul>
            <p className="mt-3"><strong>Voltage drop example:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Circuit: 6A, 1.5mm² cable, 20m total length</li>
              <li>VD = (29 x 6 x 20) / 1000 = 3.48V</li>
              <li>Percentage: 3.48 / 230 x 100 = 1.5%</li>
              <li>Result: Within 3% limit - acceptable</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Reference</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-elec-yellow/90 font-medium mb-2">Lighting Circuit Parameters</p>
              <table className="w-full text-xs">
                <tbody>
                  <tr><td className="py-1 text-white/70">Cable size</td><td className="py-1 text-white">1.5mm² (or 1.0mm² if permitted)</td></tr>
                  <tr><td className="py-1 text-white/70">Protective device</td><td className="py-1 text-white">6A MCB Type B</td></tr>
                  <tr><td className="py-1 text-white/70">Max Zs (6A Type B)</td><td className="py-1 text-white">7.28 ohms</td></tr>
                  <tr><td className="py-1 text-white/70">Voltage drop limit</td><td className="py-1 text-white">3% (6.9V)</td></tr>
                  <tr><td className="py-1 text-white/70">mV/A/m (1.5mm²)</td><td className="py-1 text-white">29</td></tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-elec-yellow/90 font-medium mb-2">Switch Terminal Markings</p>
              <table className="w-full text-xs">
                <tbody>
                  <tr><td className="py-1 text-white/70">One-way</td><td className="py-1 text-white">L (or C) and L1</td></tr>
                  <tr><td className="py-1 text-white/70">Two-way</td><td className="py-1 text-white">C (common), L1, L2</td></tr>
                  <tr><td className="py-1 text-white/70">Intermediate</td><td className="py-1 text-white">L1, L2 (input), L1, L2 (output)</td></tr>
                  <tr><td className="py-1 text-white/70">Strapper wires</td><td className="py-1 text-white">L1 to L1, L2 to L2</td></tr>
                  <tr><td className="py-1 text-white/70">Switch return</td><td className="py-1 text-white">Sleeve blue core brown</td></tr>
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
            <Link to="../level3-module6-section5-3"><ArrowLeft className="w-4 h-4 mr-2" />Previous: Radial Circuits</Link>
          </Button>
          <Button className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90" asChild>
            <Link to="../level3-module6-section6">Next: Design Documentation<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module6Section5_4;
