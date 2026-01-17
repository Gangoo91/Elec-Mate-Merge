/**
 * Level 3 Module 6 Section 6.1 - Design Documentation
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Design Documentation - Level 3 Module 6 Section 6.1";
const DESCRIPTION = "Master electrical design documentation requirements. Learn about design calculations, circuit schedules, schematic diagrams, cable schedules, and BS 7671 compliance documentation for electrical installations.";

const quickCheckQuestions = [
  { id: "check-1", question: "What is the primary purpose of electrical design documentation?", options: ["To increase project cost", "To provide a complete record of design decisions and calculations", "To delay the project", "To confuse the installer"], correctIndex: 1, explanation: "Design documentation provides a complete record of design decisions, calculations, and specifications. It ensures the installation can be built correctly, tested, and maintained throughout its life." },
  { id: "check-2", question: "Which document shows the relationship between circuits and their protective devices?", options: ["Site plan", "Circuit schedule", "Risk assessment", "Method statement"], correctIndex: 1, explanation: "A circuit schedule (also called a distribution board schedule) shows each circuit, its protective device, cable size, load, and the areas/equipment it serves. It's essential for installation and future maintenance." },
  { id: "check-3", question: "What must design calculations demonstrate according to BS 7671?", options: ["That the cheapest option was selected", "That cables are suitably sized, protection is adequate, and disconnection times are met", "That only one cable size is used", "That no RCDs are needed"], correctIndex: 1, explanation: "Design calculations must demonstrate: cables are sized for current-carrying capacity, protection against overload and fault, voltage drop is within limits, and earth fault loop impedance allows required disconnection times." },
  { id: "check-4", question: "When should design documentation be prepared?", options: ["After installation is complete", "Before installation work begins", "Only if the client requests it", "Never"], correctIndex: 1, explanation: "Design documentation should be prepared before installation begins. It guides the installation work, ensures materials are ordered correctly, and provides the basis for testing and certification." }
];

const quizQuestions = [
  { id: 1, question: "A circuit schedule should include:", options: ["Only circuit numbers", "Circuit reference, protective device, cable size, load and areas served", "Just the MCB ratings", "Only the cable lengths"], correctAnswer: 1, explanation: "A comprehensive circuit schedule includes: circuit reference number, description of load, protective device type and rating, cable type and size, design current, and the areas or equipment served." },
  { id: 2, question: "Schematic diagrams are used to show:", options: ["Physical cable routes only", "Electrical connections and circuit arrangements", "Building dimensions", "Material costs"], correctAnswer: 1, explanation: "Schematic diagrams show the electrical arrangement of circuits - how components are connected electrically - without necessarily showing physical locations or cable routes." },
  { id: 3, question: "A cable schedule typically lists:", options: ["Cable routes, sizes, types, lengths and identification", "Only cable colours", "Just the manufacturer", "Only cable costs"], correctAnswer: 0, explanation: "Cable schedules list each cable run with: reference number, from/to locations, cable type and size, length, number of cores, and any special requirements (e.g., fire rated)." },
  { id: 4, question: "Design calculations must verify that:", options: ["Installation will be the cheapest", "Ib <= In <= Iz and Zs meets disconnection requirements", "Only large cables are used", "No testing is needed"], correctAnswer: 1, explanation: "Design calculations verify: design current (Ib) doesn't exceed device rating (In), device rating doesn't exceed cable capacity (Iz), voltage drop is acceptable, and Zs allows disconnection within required time." },
  { id: 5, question: "Block diagrams typically show:", options: ["Detailed wiring connections", "Overview of system layout and main components", "Only earth connections", "Test results"], correctAnswer: 1, explanation: "Block diagrams give an overview of the electrical system showing main components, distribution paths, and relationships between different parts without detailed wiring." },
  { id: 6, question: "BS 7671 Regulation 132.13 requires:", options: ["No documentation", "Design assessment to verify compliance before installation", "Only verbal agreement", "Documentation after completion only"], correctAnswer: 1, explanation: "Regulation 132.13 requires assessment of the characteristics of the installation during design to verify compliance with BS 7671 before installation work proceeds." },
  { id: 7, question: "The maximum demand calculation should be documented showing:", options: ["Random guesses", "Applied diversity factors and resulting total load", "Only the supply capacity", "Cable colours"], correctAnswer: 1, explanation: "Maximum demand documentation shows connected loads, diversity factors applied (with justification), and the calculated maximum demand that determines supply requirements." },
  { id: 8, question: "A single-line diagram shows:", options: ["Three separate lines for each phase", "System overview using single lines to represent three-phase circuits", "Only neutral connections", "Building heating layout"], correctAnswer: 1, explanation: "Single-line (one-line) diagrams simplify representation by using one line to show three-phase circuits, making system overviews clearer while noting phase relationships where needed." },
  { id: 9, question: "Design documentation helps with:", options: ["Hiding information", "Compliance verification, installation guidance, and future maintenance", "Avoiding testing", "Reducing safety"], correctAnswer: 1, explanation: "Good documentation enables: checking BS 7671 compliance, guiding correct installation, supporting initial certification, and providing information for future maintenance and alterations." },
  { id: 10, question: "What should earth fault loop impedance calculations include?", options: ["Only cable colours", "Ze value, R1+R2 values, temperature adjustment, and comparison with Zs limits", "Just the MCB brand", "Building height"], correctAnswer: 1, explanation: "Zs calculations include: external earth fault loop impedance (Ze), calculated R1+R2 for the circuit, temperature adjustment factor (1.2 for copper), and comparison against maximum Zs from Table 41.3." },
  { id: 11, question: "The designer must document protection against:", options: ["Only overload", "Overload, short circuit, and earth fault", "Only earth fault", "Nothing specific"], correctAnswer: 1, explanation: "Protection documentation must cover: overload (In <= Iz), short circuit (device breaking capacity adequate), and earth fault (Zs allows disconnection within required time)." },
  { id: 12, question: "Circuit schedules are typically presented as:", options: ["Lengthy paragraphs", "Tables or spreadsheets with circuit details in rows", "Only verbal descriptions", "Hand-drawn sketches only"], correctAnswer: 1, explanation: "Circuit schedules are best presented in tabular format - each row represents a circuit, columns show the various parameters (device rating, cable size, load, etc.) for easy reference." }
];

const faqs = [
  { question: "What documentation is legally required?", answer: "BS 7671 doesn't specify exact document formats, but requires that design is assessed for compliance (Regulation 132.13). The Electrical Installation Certificate requires details of design to be provided. Good practice includes: calculations, circuit schedules, diagrams, and specifications." },
  { question: "Who is responsible for design documentation?", answer: "The designer is responsible for preparing design documentation. On smaller projects, the installing electrician may also be the designer. On larger projects, there may be a separate electrical design engineer. Whoever certifies the installation confirms the design complies with BS 7671." },
  { question: "How detailed should calculations be?", answer: "Calculations should be detailed enough to verify compliance. For each circuit: load assessment, cable selection with correction factors, voltage drop, and Zs calculation. The level of detail should enable another competent person to check and verify the design." },
  { question: "What happens if design documentation is incomplete?", answer: "Incomplete documentation makes it harder to verify compliance, may lead to installation errors, complicates testing, and causes problems for future alterations. The certifying person must be satisfied the design is compliant - missing documentation makes this difficult." },
  { question: "Should design documentation be kept after completion?", answer: "Yes. Design documentation should be retained as part of the installation records. It's valuable for future alterations, additions, and troubleshooting. The client should receive copies of key documents with the Electrical Installation Certificate." }
];

const Level3Module6Section6_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5" asChild>
            <Link to="/study-centre/apprentice/level3-module6-section6"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3"><Zap className="h-4 w-4" /><span>Module 6.6.1</span></div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">Design Documentation</h1>
          <p className="text-white/80">Preparing comprehensive electrical design documentation</p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Record design decisions and calculations</li>
              <li><strong>Contents:</strong> Calculations, schedules, diagrams</li>
              <li><strong>Timing:</strong> Before installation begins</li>
              <li><strong>Requirement:</strong> BS 7671 Regulation 132.13</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Design folders, calculation sheets</li>
              <li><strong>Use:</strong> Guide installation and certification</li>
              <li><strong>Retain:</strong> For future reference and alterations</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {["Understand the purpose of design documentation", "Prepare circuit schedules and cable schedules", "Create schematic and block diagrams", "Document design calculations per BS 7671", "Organise documentation for compliance verification", "Present designs in professional formats"].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" /><span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">01</span>Purpose of Design Documentation</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Design documentation provides a complete record of the electrical installation design. It demonstrates compliance with BS 7671, guides installation work, and provides essential information for testing, certification, and future maintenance.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Documentation Serves Multiple Purposes:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Stage</th><th className="border border-white/10 px-2 py-1 text-left">Documentation Use</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Design verification</td><td className="border border-white/10 px-2 py-1">Demonstrates BS 7671 compliance before work starts</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Procurement</td><td className="border border-white/10 px-2 py-1">Enables accurate ordering of materials</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Installation</td><td className="border border-white/10 px-2 py-1">Guides installers with clear specifications</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Testing</td><td className="border border-white/10 px-2 py-1">Provides expected values for verification</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Certification</td><td className="border border-white/10 px-2 py-1">Supports completion of EIC documentation</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Maintenance</td><td className="border border-white/10 px-2 py-1">Provides reference for future work</td></tr>
                </tbody>
              </table>
            </div>
            <p>Regulation 132.13 requires that characteristics of the installation are assessed to verify compliance during design - this assessment forms the basis of design documentation.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[0]]} className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">02</span>Design Calculations</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Design calculations form the technical heart of the documentation. They demonstrate that the installation will comply with BS 7671 requirements for protection, cable sizing, and disconnection times.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Calculations to Document:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Calculation</th><th className="border border-white/10 px-2 py-1 text-left">Shows Compliance With</th><th className="border border-white/10 px-2 py-1 text-left">Key Parameters</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Maximum demand</td><td className="border border-white/10 px-2 py-1">Supply capacity</td><td className="border border-white/10 px-2 py-1">Loads, diversity factors, total demand</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Cable sizing</td><td className="border border-white/10 px-2 py-1">Regulation 433</td><td className="border border-white/10 px-2 py-1">Ib, In, Iz, correction factors</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Voltage drop</td><td className="border border-white/10 px-2 py-1">Regulation 525</td><td className="border border-white/10 px-2 py-1">mV/A/m, current, length, percentage</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Earth fault loop impedance</td><td className="border border-white/10 px-2 py-1">Regulation 411</td><td className="border border-white/10 px-2 py-1">Ze, R1+R2, Zs, max Zs from Table 41.3</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Prospective fault current</td><td className="border border-white/10 px-2 py-1">Regulation 434</td><td className="border border-white/10 px-2 py-1">PSCC, device breaking capacity</td></tr>
                </tbody>
              </table>
            </div>
            <p>Calculations should be organised logically - typically by circuit or by distribution board - and presented clearly enough that another competent person can verify them.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[1]]} className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">03</span>Schedules and Tables</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Schedules present design information in tabular format for easy reference. The two most common are circuit schedules and cable schedules.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Circuit Schedule Contents:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Column</th><th className="border border-white/10 px-2 py-1 text-left">Information</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Circuit reference</td><td className="border border-white/10 px-2 py-1">Unique identifier (e.g., DB1/1)</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Description</td><td className="border border-white/10 px-2 py-1">Load type and location served</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Protective device</td><td className="border border-white/10 px-2 py-1">Type and rating (e.g., 32A Type B MCB)</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">RCD</td><td className="border border-white/10 px-2 py-1">Rating and type if applicable</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Cable</td><td className="border border-white/10 px-2 py-1">Type and size (e.g., 2.5mm² T+E)</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Design current</td><td className="border border-white/10 px-2 py-1">Calculated Ib value</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Cable length</td><td className="border border-white/10 px-2 py-1">Route length in metres</td></tr>
                </tbody>
              </table>
            </div>
            <p>Cable schedules focus on physical cable installations, showing routes, lengths, and installation methods. They're particularly useful for procurement and installation planning.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[2]]} className="my-8" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3"><span className="text-elec-yellow/80 text-sm font-normal">04</span>Drawings and Diagrams</h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Different types of drawings serve different purposes. A complete design package typically includes several drawing types.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Drawing Types:</p>
              <table className="w-full text-sm border border-white/10 mb-4">
                <thead className="bg-white/5"><tr><th className="border border-white/10 px-2 py-1 text-left">Drawing Type</th><th className="border border-white/10 px-2 py-1 text-left">Purpose</th><th className="border border-white/10 px-2 py-1 text-left">Shows</th></tr></thead>
                <tbody>
                  <tr><td className="border border-white/10 px-2 py-1">Block diagram</td><td className="border border-white/10 px-2 py-1">System overview</td><td className="border border-white/10 px-2 py-1">Main components and distribution paths</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Single-line diagram</td><td className="border border-white/10 px-2 py-1">Electrical schematic</td><td className="border border-white/10 px-2 py-1">Circuit arrangement simplified</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Schematic diagram</td><td className="border border-white/10 px-2 py-1">Detailed circuits</td><td className="border border-white/10 px-2 py-1">Electrical connections and components</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Layout drawing</td><td className="border border-white/10 px-2 py-1">Physical positions</td><td className="border border-white/10 px-2 py-1">Equipment locations on floor plan</td></tr>
                  <tr><td className="border border-white/10 px-2 py-1">Cable route drawing</td><td className="border border-white/10 px-2 py-1">Installation paths</td><td className="border border-white/10 px-2 py-1">Cable containment routes</td></tr>
                </tbody>
              </table>
            </div>
            <p>Drawings should use standard electrical symbols (BS EN 60617) and include clear legends. They should be dated and revision-controlled to avoid confusion during installation.</p>
          </div>
        </section>
        <InlineCheck questions={[quickCheckQuestions[3]]} className="my-8" />

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Practical Guidance</h2>
          <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/30 text-sm text-white space-y-2">
            <p><strong>Documentation best practices:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Use consistent formatting and numbering throughout all documents</li>
              <li>Include revision dates and version control on all documents</li>
              <li>Cross-reference between calculations, schedules, and drawings</li>
              <li>State assumptions clearly (e.g., assumed Ze value, ambient temperature)</li>
              <li>Keep copies of manufacturer data sheets for specified equipment</li>
            </ul>
            <p className="mt-3"><strong>Document checklist:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Design basis document (scope, standards, assumptions)</li>
              <li>Maximum demand calculation with diversity</li>
              <li>Circuit schedules for all distribution boards</li>
              <li>Cable sizing calculations showing compliance</li>
              <li>Schematic diagrams and layout drawings</li>
              <li>Equipment specifications and data sheets</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Reference</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-elec-yellow/90 font-medium mb-2">Key BS 7671 Regulations</p>
              <table className="w-full text-xs">
                <tbody>
                  <tr><td className="py-1 text-white/70">Design assessment</td><td className="py-1 text-white">Regulation 132.13</td></tr>
                  <tr><td className="py-1 text-white/70">Protection requirements</td><td className="py-1 text-white">Part 4</td></tr>
                  <tr><td className="py-1 text-white/70">Cable selection</td><td className="py-1 text-white">Part 5, Section 52</td></tr>
                  <tr><td className="py-1 text-white/70">Voltage drop</td><td className="py-1 text-white">Regulation 525</td></tr>
                  <tr><td className="py-1 text-white/70">Documentation</td><td className="py-1 text-white">Regulation 514</td></tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-elec-yellow/90 font-medium mb-2">Essential Documents</p>
              <table className="w-full text-xs">
                <tbody>
                  <tr><td className="py-1 text-white/70">Calculations</td><td className="py-1 text-white">Load, cable, Zs, voltage drop</td></tr>
                  <tr><td className="py-1 text-white/70">Schedules</td><td className="py-1 text-white">Circuit, cable, equipment</td></tr>
                  <tr><td className="py-1 text-white/70">Drawings</td><td className="py-1 text-white">Schematic, layout, single-line</td></tr>
                  <tr><td className="py-1 text-white/70">Specifications</td><td className="py-1 text-white">Equipment, materials</td></tr>
                  <tr><td className="py-1 text-white/70">Data sheets</td><td className="py-1 text-white">Manufacturer documentation</td></tr>
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
            <Link to="/study-centre/apprentice/level3-module6-section5-4"><ArrowLeft className="w-4 h-4 mr-2" />Previous: Lighting Circuits</Link>
          </Button>
          <Button className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90" asChild>
            <Link to="/study-centre/apprentice/level3-module6-section6-2">Next: Installation Specifications<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module6Section6_1;
