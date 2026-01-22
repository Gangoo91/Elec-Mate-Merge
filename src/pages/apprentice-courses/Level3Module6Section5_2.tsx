/**
 * Level 3 Module 6 Section 5.2 - Ring Final Circuits
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Ring Final Circuits - Level 3 Module 6 Section 5.2";
const DESCRIPTION = "Master ring final circuit design for socket outlets. Learn BS 7671 requirements, 2.5mm² cable sizing, 32A protection, floor area limits, spurs, and testing continuity using R1+R2 measurements.";

const quickCheckQuestions = [
  { id: "check-1", question: "What is the maximum floor area served by a ring final circuit in BS 7671?", options: ["50m²", "75m²", "100m²", "No limit specified"], correctIndex: 2, explanation: "BS 7671 Regulation 433.1.204 recommends ring final circuits should serve a floor area not exceeding 100m². Larger areas should be served by additional circuits." },
  { id: "check-2", question: "What cable size is typically used for ring final circuits?", options: ["1.5mm²", "2.5mm²", "4.0mm²", "6.0mm²"], correctIndex: 1, explanation: "Ring final circuits typically use 2.5mm² cable with a 32A protective device. The ring configuration allows smaller cable because current can flow from both ends." },
  { id: "check-3", question: "How many non-fused spurs are permitted from a ring final circuit?", options: ["None", "Equal to socket outlets on ring", "Unlimited", "Maximum of 4"], correctIndex: 1, explanation: "The number of non-fused spurs should not exceed the total number of socket outlets and fixed appliances connected directly to the ring circuit." },
  { id: "check-4", question: "What protective device rating is standard for a 2.5mm² ring final circuit?", options: ["16A", "20A", "32A", "40A"], correctIndex: 2, explanation: "Ring final circuits using 2.5mm² cable are protected by a 32A device. This works because current flows from both ends of the ring, effectively halving the load on each leg." }
];

const quizQuestions = [
  { id: 1, question: "A ring final circuit differs from a radial circuit because:", options: ["It uses larger cable", "It starts and finishes at the same terminals in the consumer unit", "It can only serve lighting", "It requires RCD protection"], correctAnswer: 1, explanation: "A ring circuit starts and returns to the same terminals in the consumer unit, creating a loop. This allows current to flow from both directions to any load point." },
  { id: 2, question: "For a ring final circuit, the R1+R2 value at any socket should be approximately:", options: ["Equal to end-to-end resistance", "One quarter of end-to-end resistance", "Double the end-to-end resistance", "Half the loop resistance"], correctAnswer: 1, explanation: "When the ring is correctly connected, the R1+R2 at the furthest point should be approximately one quarter of the end-to-end resistance (r1+r2)/4." },
  { id: 3, question: "What is the purpose of the ring continuity test?", options: ["To measure cable length", "To verify the ring is continuous and not broken or interconnected", "To check RCD operation", "To measure earth resistance"], correctAnswer: 1, explanation: "The ring continuity test verifies the ring is complete with no breaks, crossed connections, or multiple loops. It uses the figure-of-eight cross-connection method." },
  { id: 4, question: "A fused spur from a ring circuit requires:", options: ["No fuse", "A fused connection unit rated no more than 13A", "A 32A fuse", "A 45A switch"], correctAnswer: 1, explanation: "Fused spurs use a fused connection unit (FCU) typically rated at 13A or less. This allows connection of fixed appliances and permits extending to additional socket outlets." },
  { id: 5, question: "How many socket outlets can be connected to a non-fused spur?", options: ["Unlimited", "One single or one twin socket", "Four sockets", "Six sockets"], correctAnswer: 1, explanation: "A non-fused spur can only supply one single socket outlet, one twin socket outlet, or one fixed appliance. For more outlets, a fused spur is required." },
  { id: 6, question: "The end-to-end resistance test for phase conductors in a ring should give:", options: ["Zero ohms", "The same reading as the neutral conductors", "A higher reading than CPC", "An infinite reading"], correctAnswer: 1, explanation: "Phase and neutral conductors of the same size should give the same end-to-end resistance. Different readings indicate a problem such as a break or wrong connection." },
  { id: 7, question: "BS 7671 specifies that ring final circuits serving socket outlets should:", options: ["Only be used in domestic premises", "Not exceed 100m² floor area", "Use 4mm² cable minimum", "Have RCD protection of 100mA"], correctAnswer: 1, explanation: "Regulation 433.1.204 recommends ring final circuits for socket outlets should serve a floor area not exceeding 100m². This limits the number of outlets and potential load." },
  { id: 8, question: "When testing ring continuity, the CPC end-to-end resistance is typically:", options: ["The same as line conductors", "Higher than line conductors (smaller CPC)", "Lower than line conductors", "Exactly zero"], correctAnswer: 1, explanation: "If using a reduced CPC (e.g., 1.5mm² with 2.5mm² live conductors), the CPC will have higher resistance. With 2.5mm² throughout, readings should be similar." },
  { id: 9, question: "A ring final circuit using 2.5mm² cable can carry:", options: ["32A in each leg simultaneously", "Up to 32A total with load shared between legs", "64A total (32A per leg)", "Only 20A"], correctAnswer: 1, explanation: "The 32A device protects the circuit. Current flows from both ends to any load point, so each cable leg carries less than the total. If the ring breaks, one leg could see full load - hence 32A protection." },
  { id: 10, question: "What creates a 'figure-of-eight' connection during ring testing?", options: ["Wrapping cables around each other", "Cross-connecting L1-N2 and N1-L2 at the board", "Creating a short circuit", "Twisting the test leads"], correctAnswer: 1, explanation: "The figure-of-eight is created by connecting the line conductor from one end to the neutral from the other end (and vice versa) at the consumer unit, then measuring at each socket." },
  { id: 11, question: "Regulation 433.1.204 states that where the load is not known:", options: ["Use radial circuits only", "Assume 100m² maximum floor area per ring", "Use 6mm² cable", "Install 40A protection"], correctAnswer: 1, explanation: "Where the actual load isn't known, BS 7671 recommends designing ring final circuits to serve not more than 100m² floor area to limit potential overload." },
  { id: 12, question: "A break in one leg of a ring final circuit:", options: ["Stops the circuit working entirely", "Creates a radial circuit with potential overload risk", "Has no effect", "Trips the RCD"], correctAnswer: 1, explanation: "If one leg breaks, the circuit becomes a radial. The remaining leg may be overloaded as it carries all the current. This is why ring continuity testing is important." }
];

const faqs = [
  { question: "Why use ring circuits instead of radials?", answer: "Ring circuits allow smaller cable (2.5mm²) to supply a larger load because current flows from both ends. They're traditional in UK domestic installations. Modern practice sometimes favours multiple radial circuits for simpler testing and fault finding." },
  { question: "How do I test ring final circuit continuity?", answer: "Use the three-step method: 1) Measure end-to-end resistance of each conductor (L, N, CPC). 2) Cross-connect L-N conductors (figure-of-eight) and test at each socket. 3) Cross-connect L-CPC and measure R1+R2 at each socket. Results should be consistent and approximately quarter of end-to-end." },
  { question: "Can I have multiple rings from one property?", answer: "Yes. Larger properties typically need multiple ring circuits - for example, one per floor, or separate rings for kitchen/utility areas. Each ring should serve no more than 100m² floor area." },
  { question: "What's the difference between fused and non-fused spurs?", answer: "Non-fused spurs connect directly to the ring with no additional protection - limited to one single/twin socket or one fixed appliance. Fused spurs use a fused connection unit (typically 13A) and can supply multiple sockets or higher-load appliances." },
  { question: "Do ring circuits need RCD protection?", answer: "Socket outlets rated up to 32A in domestic premises require 30mA RCD protection per Regulation 411.3.3. In other locations, socket outlets up to 32A likely to supply portable outdoor equipment also need RCD protection." }
];

const Level3Module6Section5_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5" asChild>
            <Link to="/study-centre/apprentice/level3-module6-section5"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Cable:</strong> 2.5mm² with 32A protection</li>
              <li><strong>Floor area:</strong> Maximum 100m² per ring</li>
              <li><strong>Spurs:</strong> Non-fused limited to 1 outlet each</li>
              <li><strong>Testing:</strong> R1+R2 = (r1+r2)/4 at furthest point</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Socket circuits with both cables at CU</li>
              <li><strong>Use:</strong> Domestic and commercial socket outlets</li>
              <li><strong>Test:</strong> Figure-of-eight continuity method</li>
            </ul>
          </div>
        </div>

        

        

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">01</span>Ring Circuit Principles</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>A ring final circuit starts at the consumer unit, loops around serving socket outlets and fixed appliances, then returns to the same terminals. This creates two parallel paths for current to reach any point on the circuit.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Ring Circuit Characteristics:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Parameter</th><th className="border border-white/10 px-2 py-1 text-left">Typical Specification</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Cable size</td><td className="border border-white/10 px-2 py-1">2.5mm² (live), 1.5mm² or 2.5mm² (CPC)</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Protective device</td><td className="border border-white/10 px-2 py-1">32A MCB or 30A fuse</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Maximum floor area</td><td className="border border-white/10 px-2 py-1">100m² (Regulation 433.1.204)</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Non-fused spurs</td><td className="border border-white/10 px-2 py-1">Number not exceeding outlets on ring</td></tr>
                </tbody>
              </table>
            </div>
            <p>The ring configuration allows 2.5mm² cable to be used with 32A protection because current flows from both directions. At any point, the cable only carries a portion of the total load.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[0]]} className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">02</span>Spur Connections</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Spurs are branches from the ring circuit. They can be non-fused (connected directly) or fused (through a fused connection unit). Understanding the rules for each type is essential for compliant design.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Spur Types and Limitations:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Spur Type</th><th className="border border-white/10 px-2 py-1 text-left">Connection Point</th><th className="border border-white/10 px-2 py-1 text-left">Permitted Load</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Non-fused</td><td className="border border-white/10 px-2 py-1">Socket outlet or junction box</td><td className="border border-white/10 px-2 py-1">One single/twin socket OR one fixed appliance</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Fused (13A FCU)</td><td className="border border-white/10 px-2 py-1">Socket outlet or junction box</td><td className="border border-white/10 px-2 py-1">Unlimited sockets, 1.5mm² cable permitted</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Fused (3A FCU)</td><td className="border border-white/10 px-2 py-1">Socket outlet or junction box</td><td className="border border-white/10 px-2 py-1">Low-power fixed appliances (e.g., clocks)</td></tr>
                </tbody>
              </table>
            </div>
            <p>The total number of non-fused spurs must not exceed the number of socket outlets and fixed appliances connected directly to the ring. This maintains balance and prevents overloading.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[1]]} className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">03</span>Ring Circuit Testing</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Ring continuity testing verifies the circuit is correctly wired as a continuous ring with no breaks or interconnections. The figure-of-eight method is the standard procedure.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Ring Continuity Test Procedure:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Step</th><th className="border border-white/10 px-2 py-1 text-left">Action</th><th className="border border-white/10 px-2 py-1 text-left">Expected Result</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">1</td><td className="border border-white/10 px-2 py-1">Measure end-to-end resistance (L, N, CPC)</td><td className="border border-white/10 px-2 py-1">L and N equal; CPC similar or higher</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">2</td><td className="border border-white/10 px-2 py-1">Cross-connect L1-N2, N1-L2 at board</td><td className="border border-white/10 px-2 py-1">Creates figure-of-eight</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">3</td><td className="border border-white/10 px-2 py-1">Measure L-N at each socket</td><td className="border border-white/10 px-2 py-1">Substantially the same at each point</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">4</td><td className="border border-white/10 px-2 py-1">Cross-connect L1-CPC2, CPC1-L2</td><td className="border border-white/10 px-2 py-1">Second figure-of-eight</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">5</td><td className="border border-white/10 px-2 py-1">Measure L-CPC (R1+R2) at each socket</td><td className="border border-white/10 px-2 py-1">Record highest value for Zs calculation</td></tr>
                </tbody>
              </table>
            </div>
            <p>The R1+R2 reading at the furthest point should be approximately one quarter of the end-to-end resistance. This is because the cross-connection creates two parallel paths to every point on the ring.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[2]]} className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">04</span>Design Considerations</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Designing ring final circuits requires consideration of floor area, load distribution, socket placement, and cable routes. The goal is a balanced circuit that meets BS 7671 requirements.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Design Checklist:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Consideration</th><th className="border border-white/10 px-2 py-1 text-left">Requirement/Guidance</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Floor area</td><td className="border border-white/10 px-2 py-1">Maximum 100m² per ring circuit</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">RCD protection</td><td className="border border-white/10 px-2 py-1">30mA for domestic socket outlets</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Maximum Zs (32A Type B)</td><td className="border border-white/10 px-2 py-1">1.37 ohms at 10°C (Table 41.3)</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Cable route</td><td className="border border-white/10 px-2 py-1">Logical path minimising crossings</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Socket spacing</td><td className="border border-white/10 px-2 py-1">Distribute evenly around ring</td></tr>
                </tbody>
              </table>
            </div>
            <p>In kitchens and utility rooms with high-power appliances, consider separate circuits or fused spurs for items like washing machines, dishwashers and ovens rather than relying solely on 13A plugs.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[3]]} className="my-8" />

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Practical Guidance</h2>
          <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/30 text-sm text-white space-y-2">
            <p><strong>Installation tips:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Label both ends of the ring cable at the consumer unit clearly</li>
              <li>Route the ring in a logical direction (clockwise or counter-clockwise)</li>
              <li>Avoid creating multiple loops or interconnections between rings</li>
              <li>Use junction boxes for spurs rather than loop-in at socket backboxes where space is limited</li>
              <li>Document which sockets are spurs and which are on the main ring</li>
            </ul>
            <p className="mt-3"><strong>Testing tips:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Ensure isolation before disconnecting cables at the consumer unit</li>
              <li>Label cable ends before disconnection to avoid confusion</li>
              <li>Record all three end-to-end readings before cross-connecting</li>
              <li>Readings should be consistent - large variations indicate faults</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Reference</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-elec-yellow/90 font-medium mb-2">Ring Circuit Specifications</p>
              <table className="w-full text-xs">
                <tbody>
                  <tr><td className="py-1 text-white/70">Standard cable</td><td className="py-1 text-white">2.5mm² twin and earth</td></tr>
                  <tr><td className="py-1 text-white/70">Protective device</td><td className="py-1 text-white">32A MCB or 30A fuse</td></tr>
                  <tr><td className="py-1 text-white/70">Maximum floor area</td><td className="py-1 text-white">100m²</td></tr>
                  <tr><td className="py-1 text-white/70">RCD requirement</td><td className="py-1 text-white">30mA (domestic)</td></tr>
                  <tr><td className="py-1 text-white/70">Zs limit (32A Type B)</td><td className="py-1 text-white">1.37 ohms</td></tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-elec-yellow/90 font-medium mb-2">R1+R2 Calculation</p>
              <table className="w-full text-xs">
                <tbody>
                  <tr><td className="py-1 text-white/70">Expected R1+R2</td><td className="py-1 text-white">(r1+r2)/4</td></tr>
                  <tr><td className="py-1 text-white/70">2.5mm² copper</td><td className="py-1 text-white">7.41 milliohms/m</td></tr>
                  <tr><td className="py-1 text-white/70">1.5mm² copper</td><td className="py-1 text-white">12.10 milliohms/m</td></tr>
                  <tr><td className="py-1 text-white/70">Example (30m ring)</td><td className="py-1 text-white">r1+r2 = 30 x (7.41+7.41) = 0.44 ohms</td></tr>
                  <tr><td className="py-1 text-white/70">Max R1+R2</td><td className="py-1 text-white">0.44/4 = 0.11 ohms</td></tr>
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
            <Link to="/study-centre/apprentice/level3-module6-section5-1"><ArrowLeft className="w-4 h-4 mr-2" />Previous: Domestic Circuits</Link>
          </Button>
          <Button className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90" asChild>
            <Link to="/study-centre/apprentice/level3-module6-section5-3">Next: Radial Circuits<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module6Section5_2;
