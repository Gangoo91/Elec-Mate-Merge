/**
 * Level 3 Module 6 Section 6.3 - Bill of Quantities
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Bill of Quantities - Level 3 Module 6 Section 6.3";
const DESCRIPTION = "Learn to prepare accurate bills of quantities for electrical installations. Cover material take-offs, labour estimates, pricing structures, and industry-standard measurement methods.";

const quickCheckQuestions = [
  { id: "check-1", question: "What is the primary purpose of a Bill of Quantities (BoQ)?", options: ["To confuse contractors", "To provide a detailed list of materials and quantities for accurate pricing", "To avoid planning", "To increase costs"], correctIndex: 1, explanation: "A Bill of Quantities provides a detailed, measured list of all materials and work items. It enables accurate pricing by contractors and provides a common basis for tender comparison." },
  { id: "check-2", question: "How are cables typically measured in a bill of quantities?", options: ["By weight", "By linear metres including allowances for terminations and waste", "By colour", "By approximate guess"], correctIndex: 1, explanation: "Cables are measured in linear metres. Allowances must be added for terminations, drops, connections at accessories, and a waste factor (typically 5-10%) for cutting and installation losses." },
  { id: "check-3", question: "What does SMM7 stand for in construction measurement?", options: ["Simple Material Method 7", "Standard Method of Measurement 7th Edition", "Specific Material Mandate 7", "Supply Material Manual 7"], correctIndex: 1, explanation: "SMM7 is the Standard Method of Measurement 7th Edition, a reference document that defines how construction work should be measured and described in bills of quantities." },
  { id: "check-4", question: "Why is it important to include preliminary items in a BoQ?", options: ["To increase paperwork", "To cover site setup, supervision, testing and other project-wide costs", "To confuse the client", "They are not important"], correctIndex: 1, explanation: "Preliminaries cover costs that aren't specific to individual work items: site establishment, supervision, testing equipment, temporary power, welfare facilities, and project management." }
];

const quizQuestions = [
  { id: 1, question: "A material take-off involves:", options: ["Removing materials from site", "Measuring and listing all materials needed from the design", "Ordering random quantities", "Estimating without drawings"], correctAnswer: 1, explanation: "A material take-off is the process of measuring and listing all materials required for a project from the design drawings and schedules. It forms the basis of the bill of quantities." },
  { id: 2, question: "Cable containment (trunking/tray) is typically measured in:", options: ["Square metres", "Linear metres including fittings listed separately", "Cubic metres", "Number of pieces only"], correctAnswer: 1, explanation: "Containment is measured in linear metres for straight runs, with fittings (bends, tees, couplers, end caps) listed as separate items with quantities for accurate pricing." },
  { id: 3, question: "Labour-only items in a BoQ might include:", options: ["Cable costs", "Installation, termination, and testing as separate items", "Material delivery", "VAT"], correctAnswer: 1, explanation: "Labour items can be separated to show: installation rates per metre, termination costs per connection, testing hours, and commissioning time. This allows detailed cost analysis." },
  { id: 4, question: "When measuring socket outlets, you should include:", options: ["Just the quantity", "Quantity, type, accessories, backboxes and faceplates", "Only the colour", "Random numbers"], correctAnswer: 1, explanation: "Socket outlet items include: quantity, type (single/double, switched/unswitched), backbox type (metal/plastic, depth), faceplate finish, and any special features (USB, surge protection)." },
  { id: 5, question: "A 5% waste allowance on cables accounts for:", options: ["Theft", "Cutting lengths, termination requirements, and installation losses", "Delivery damage only", "Price increases"], correctAnswer: 1, explanation: "Waste allowance covers: off-cuts from cable drums, lengths lost to terminations, pieces damaged during installation, and working space requirements. 5-10% is typical depending on cable type." },
  { id: 6, question: "Distribution board items in a BoQ should specify:", options: ["Only the price", "Size (ways), type, rating, IP rating, and accessories", "Just the manufacturer", "Only the colour"], correctAnswer: 1, explanation: "DB entries include: number of ways, main switch rating, type (split load, fully loaded), IP rating, incoming cable entry, internal arrangement (MCBs, RCBOs), and mounting method." },
  { id: 7, question: "Provisional sums in a BoQ are used for:", options: ["Work that can be accurately measured", "Work not yet fully defined or specialist items to be determined", "Standard items only", "Completed work"], correctAnswer: 1, explanation: "Provisional sums allow for items that cannot be accurately measured at tender stage - such as specialist equipment to be selected later, builder's work, or contingency allowances." },
  { id: 8, question: "The unit of measurement for luminaires is typically:", options: ["Square metres", "Number (nr) of each type", "Linear metres", "Kilograms"], correctAnswer: 1, explanation: "Luminaires are measured by number (nr) of each type. The description should include: type, lamp details, mounting method, control gear, emergency conversion if applicable." },
  { id: 9, question: "Testing and commissioning in a BoQ should include:", options: ["Nothing", "Initial verification, certification, and commissioning hours", "Only visual checks", "Random testing"], correctAnswer: 1, explanation: "Testing items cover: initial verification per BS 7671, completion of certificates (EIC/MEIWC), commissioning specific systems, and any specialist testing (emergency lighting, fire alarms)." },
  { id: 10, question: "Daywork rates in a BoQ allow for:", options: ["Only planned work", "Work that cannot be measured in advance, charged at agreed rates", "Free work", "Discount pricing"], correctAnswer: 1, explanation: "Daywork provides rates for unforeseen or additional work that arises during the contract. Rates cover labour per hour/day, plant hire, and material mark-ups for varied work." },
  { id: 11, question: "When measuring earthing materials, include:", options: ["Only earth rods", "Conductors, earth rods, clamps, bonding points, and labels", "Just green/yellow tape", "Nothing specific"], correctAnswer: 1, explanation: "Earthing measurements include: main earthing conductor (size, length), earth rods (type, length), clamps and accessories, bonding conductors, equipotential bonding points, and safety labels." },
  { id: 12, question: "Cross-referencing BoQ items to drawings helps:", options: ["Create confusion", "Enable verification, reduce errors, and assist with variations", "Increase paperwork only", "Slow down pricing"], correctAnswer: 1, explanation: "Cross-references between BoQ items and drawing references enable: checking quantities against design, identifying scope gaps, managing variations, and verifying installed work." }
];

const faqs = [
  { question: "Who prepares the bill of quantities?", answer: "BoQs can be prepared by quantity surveyors, estimators, or designers. On smaller projects, the electrical contractor may prepare their own quantities from design information. Larger projects often use specialist quantity surveyors." },
  { question: "What's the difference between a BoQ and a materials schedule?", answer: "A materials schedule lists what materials are needed. A BoQ is more comprehensive - it includes measured quantities, descriptions, unit rates, and totals in a format suitable for competitive tendering and contract administration." },
  { question: "How accurate should a BoQ be?", answer: "BoQs should be as accurate as possible based on available design information. Errors can lead to disputed variations later. Include clear assumptions and provisional sums for items that cannot be accurately measured." },
  { question: "What happens if the BoQ quantities are wrong?", answer: "Under most standard contracts, the contractor is paid for actual work done - BoQ quantities are estimates. Significant variations are re-measured and valued. However, major errors can cause cash flow problems and disputes." },
  { question: "Should I include labour separately from materials?", answer: "This depends on the contract format. Some clients prefer separate labour and material rates for transparency. Others want all-inclusive item rates. The BoQ format should match the contract requirements and client preferences." }
];

const Level3Module6Section6_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5" asChild>
            <Link to="../level3-module6-section6"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3"><Zap className="h-4 w-4" /><span>Module 6.6.3</span></div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">Bill of Quantities</h1>
          <p className="text-white/80">Preparing accurate bills of quantities for electrical installations</p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Detailed list for pricing and ordering</li>
              <li><strong>Measure:</strong> Cables in metres, items numbered</li>
              <li><strong>Include:</strong> Materials, labour, preliminaries</li>
              <li><strong>Allowance:</strong> Add 5-10% for waste</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Itemised project documents</li>
              <li><strong>Use:</strong> Tendering, ordering, cost control</li>
              <li><strong>Verify:</strong> Cross-check with drawings</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {["Perform accurate material take-offs from drawings", "Apply appropriate units of measurement", "Calculate waste and contingency allowances", "Structure a bill of quantities professionally", "Include labour, preliminaries and testing costs", "Cross-reference BoQ items to design documents"].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" /><span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">01</span>Bill of Quantities Purpose</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>A Bill of Quantities (BoQ) provides a comprehensive, measured list of all materials and work required for a project. It enables accurate tendering, cost comparison, and forms the basis for valuing work during the contract.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">BoQ Benefits:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Stakeholder</th><th className="border border-white/10 px-2 py-1 text-left">Benefits</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Client</td><td className="border border-white/10 px-2 py-1">Fair tender comparison, cost control, variation valuation</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Contractor</td><td className="border border-white/10 px-2 py-1">Clear scope, accurate pricing, material ordering</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">QS/Project Manager</td><td className="border border-white/10 px-2 py-1">Progress valuation, cost reporting, change management</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Designer</td><td className="border border-white/10 px-2 py-1">Design verification, specification compliance</td></tr>
                </tbody>
              </table>
            </div>
            <p>A well-prepared BoQ reduces disputes by clearly defining scope and providing agreed rates for valuing changes.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[0]]} className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">02</span>Material Take-Off</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Material take-off is the process of measuring and listing all materials from the design drawings. Accuracy is essential - errors lead to under-pricing or excess material costs.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Units of Measurement:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Item Type</th><th className="border border-white/10 px-2 py-1 text-left">Unit</th><th className="border border-white/10 px-2 py-1 text-left">Notes</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Cables</td><td className="border border-white/10 px-2 py-1">Linear metres (m)</td><td className="border border-white/10 px-2 py-1">Add 5-10% waste allowance</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Containment</td><td className="border border-white/10 px-2 py-1">Linear metres (m)</td><td className="border border-white/10 px-2 py-1">Fittings listed separately (nr)</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Accessories</td><td className="border border-white/10 px-2 py-1">Number (nr)</td><td className="border border-white/10 px-2 py-1">Include backboxes, faceplates</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Distribution boards</td><td className="border border-white/10 px-2 py-1">Number (nr)</td><td className="border border-white/10 px-2 py-1">Full specification per item</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Luminaires</td><td className="border border-white/10 px-2 py-1">Number (nr)</td><td className="border border-white/10 px-2 py-1">By type, include lamps/drivers</td></tr>
                </tbody>
              </table>
            </div>
            <p>Scale drawings accurately and add allowances for vertical drops, connections at equipment, and installation requirements.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[1]]} className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">03</span>BoQ Structure</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>A well-structured BoQ organises items logically, making it easy to price and use for cost control. The structure typically follows the work breakdown or installation sequence.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical BoQ Sections:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Section</th><th className="border border-white/10 px-2 py-1 text-left">Contents</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Preliminaries</td><td className="border border-white/10 px-2 py-1">Site setup, supervision, welfare, testing equipment</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Mains distribution</td><td className="border border-white/10 px-2 py-1">Main switchgear, distribution boards, main cables</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Containment</td><td className="border border-white/10 px-2 py-1">Trunking, tray, conduit, fixings</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Cables</td><td className="border border-white/10 px-2 py-1">By type and size, grouped logically</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Final circuits</td><td className="border border-white/10 px-2 py-1">Accessories, luminaires, equipment connections</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Testing/commissioning</td><td className="border border-white/10 px-2 py-1">Initial verification, certification, commissioning</td></tr>
                </tbody>
              </table>
            </div>
            <p>Each item should have a clear description, unit of measurement, quantity, and space for contractor pricing (rate and total).</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[2]]} className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">04</span>Pricing and Allowances</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Accurate BoQs include appropriate allowances for waste, contingency, and items that cannot be precisely measured at design stage.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Allowances:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Item</th><th className="border border-white/10 px-2 py-1 text-left">Typical Allowance</th><th className="border border-white/10 px-2 py-1 text-left">Purpose</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Cable waste</td><td className="border border-white/10 px-2 py-1">5-10%</td><td className="border border-white/10 px-2 py-1">Cutting, terminations, damage</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Containment waste</td><td className="border border-white/10 px-2 py-1">5%</td><td className="border border-white/10 px-2 py-1">Cutting, fitting adjustments</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Provisional sums</td><td className="border border-white/10 px-2 py-1">As needed</td><td className="border border-white/10 px-2 py-1">Undefined work, specialist items</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Contingency</td><td className="border border-white/10 px-2 py-1">5-10%</td><td className="border border-white/10 px-2 py-1">Unforeseen items, minor changes</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Daywork allowance</td><td className="border border-white/10 px-2 py-1">Provisional sum</td><td className="border border-white/10 px-2 py-1">Varied work at daywork rates</td></tr>
                </tbody>
              </table>
            </div>
            <p>State assumptions clearly. If measurements are approximate or based on incomplete information, note this against the relevant items.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[3]]} className="my-8" />

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Practical Guidance</h2>
          <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/30 text-sm text-white space-y-2">
            <p><strong>Take-off tips:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Work systematically through drawings - use a consistent method</li>
              <li>Scale from drawings accurately or use stated dimensions</li>
              <li>Add allowances for drops, rises, and connections at equipment</li>
              <li>List each cable size and type separately</li>
              <li>Cross-reference items to drawing numbers for verification</li>
            </ul>
            <p className="mt-3"><strong>Example cable calculation:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Horizontal run from drawing: 45m</li>
              <li>Add vertical drop to socket height: +1m per socket x 10 = 10m</li>
              <li>Add termination allowance: +0.3m per end = 0.6m</li>
              <li>Subtotal: 55.6m</li>
              <li>Add 5% waste: 55.6 x 1.05 = 58.4m</li>
              <li>Round up to: 60m (or order drum size)</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Reference</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-elec-yellow/90 font-medium mb-2">Measurement Units</p>
              <table className="w-full text-xs">
                <tbody>
                  <tr><td className="py-1 text-white/70">Cables</td><td className="py-1 text-white">m (linear metres)</td></tr>
                  <tr><td className="py-1 text-white/70">Containment</td><td className="py-1 text-white">m (straight), nr (fittings)</td></tr>
                  <tr><td className="py-1 text-white/70">Accessories</td><td className="py-1 text-white">nr (number)</td></tr>
                  <tr><td className="py-1 text-white/70">Equipment</td><td className="py-1 text-white">nr (each type)</td></tr>
                  <tr><td className="py-1 text-white/70">Labour</td><td className="py-1 text-white">hrs or per item</td></tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-elec-yellow/90 font-medium mb-2">Typical Waste Factors</p>
              <table className="w-full text-xs">
                <tbody>
                  <tr><td className="py-1 text-white/70">Small cables (1.5-2.5mm²)</td><td className="py-1 text-white">10%</td></tr>
                  <tr><td className="py-1 text-white/70">Medium cables (4-16mm²)</td><td className="py-1 text-white">7-8%</td></tr>
                  <tr><td className="py-1 text-white/70">Large cables (25mm²+)</td><td className="py-1 text-white">5%</td></tr>
                  <tr><td className="py-1 text-white/70">Trunking/tray</td><td className="py-1 text-white">5%</td></tr>
                  <tr><td className="py-1 text-white/70">Conduit</td><td className="py-1 text-white">5-7%</td></tr>
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
            <Link to="../level3-module6-section6-2"><ArrowLeft className="w-4 h-4 mr-2" />Previous: Installation Specifications</Link>
          </Button>
          <Button className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90" asChild>
            <Link to="../level3-module6-section6-4">Next: Risk Assessments<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module6Section6_3;
