import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const RenewableEnergyModule2Section6 = () => {
  useSEO({
    title: "Single-Line Diagrams & Component Flow | Solar PV",
    description: "Creating and interpreting solar PV system diagrams for clear technical communication."
  });

  const quizQuestions = [
    {
      question: "What is the standard direction for power flow in SLDs?",
      options: ["Right to left, bottom to top", "Left to right, top to bottom", "Top to bottom only", "No standard direction"],
      correctAnswer: 1,
      explanation: "Standard convention shows power flow left to right, top to bottom in single-line diagrams."
    },
    {
      question: "What symbol standard is used for electrical SLDs?",
      options: ["ISO 9001", "IEC 60617", "BS 7671", "IEEE 315 only"],
      correctAnswer: 1,
      explanation: "IEC 60617 provides the international standard electrical symbols used in SLDs."
    },
    {
      question: "What must all components in an SLD include?",
      options: ["Photos only", "Manufacturer names only", "Ratings and identifications", "Installation dates"],
      correctAnswer: 2,
      explanation: "All components must be clearly labelled with ratings and identifications."
    },
    {
      question: "What is the typical energy flow sequence after the PV array?",
      options: ["AC isolator, then inverter", "DC isolator, then inverter", "Generation meter first", "Distribution board first"],
      correctAnswer: 1,
      explanation: "Energy flows from PV array through DC isolator, then to the inverter for DC-AC conversion."
    },
    {
      question: "What documentation standard covers grid-connected PV requirements?",
      options: ["IEC 60617", "IEC 62446", "BS 5839", "ISO 14001"],
      correctAnswer: 1,
      explanation: "IEC 62446 covers grid-connected PV systems documentation requirements."
    },
    {
      question: "What type of meter records electricity sent to the grid?",
      options: ["Generation meter", "Import meter", "Export meter", "Smart meter only"],
      correctAnswer: 2,
      explanation: "The export meter specifically records electricity sent to the grid."
    },
    {
      question: "What line weight indicates power conductors in SLDs?",
      options: ["Thin lines", "Thick lines", "Dashed lines", "Dotted lines"],
      correctAnswer: 1,
      explanation: "Thick lines indicate power conductors, while thin lines show control circuits in SLDs."
    },
    {
      question: "What must professional SLDs include for document control?",
      options: ["Designer photo", "Colour coding only", "Title blocks with revision control", "Manufacturer logos"],
      correctAnswer: 2,
      explanation: "Professional SLDs require title blocks with project information, drawing numbers, and revision control."
    },
    {
      question: "What design software is industry-standard for professional SLDs?",
      options: ["Microsoft Paint", "AutoCAD Electrical", "PowerPoint", "Basic calculator"],
      correctAnswer: 1,
      explanation: "AutoCAD Electrical is industry-standard professional software for schematic design."
    },
    {
      question: "What is the purpose of as-built drawings?",
      options: ["Marketing materials", "Pre-construction planning", "Final installation records", "Warranty claims only"],
      correctAnswer: 2,
      explanation: "As-built drawings record the final installation, including any deviations from original design."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Minimal Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
          <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10 -ml-2" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 pb-24">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-elec-yellow/10 mb-4">
            <Zap className="w-6 h-6 text-elec-yellow" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Single-Line Diagrams &amp; Component Flow
          </h1>
          <p className="text-white/60 text-sm sm:text-base">
            Technical Documentation for PV Systems
          </p>
        </div>

        {/* Quick Summary */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <div className="text-elec-yellow text-xs font-medium uppercase tracking-wide mb-1">Symbol Standard</div>
            <div className="text-white font-semibold">IEC 60617</div>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <div className="text-elec-yellow text-xs font-medium uppercase tracking-wide mb-1">Documentation</div>
            <div className="text-white font-semibold">IEC 62446</div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-8 p-4 rounded-lg bg-white/5 border border-white/10">
          <h2 className="text-white font-semibold mb-3">Learning Outcomes</h2>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span className="text-white/80 text-sm">Read and produce standard single-line diagrams (SLDs)</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span className="text-white/80 text-sm">Trace component-level energy flows through PV systems</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <span className="text-white/80 text-sm">Communicate effectively with installation teams using technical diagrams</span>
            </div>
          </div>
        </div>

        {/* Section 01 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            PV System Symbols &amp; Conventions
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Schematics are a PV designer&apos;s blueprint. SLDs make your design buildable and inspectable - they are your project&apos;s technical language.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Standard PV Symbols</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Solar panel:</strong> Rectangle with diagonal lines</li>
                  <li>• <strong className="text-white">Inverter:</strong> Rectangle with AC/DC notation</li>
                  <li>• <strong className="text-white">DC isolator:</strong> Switch with DC marking</li>
                  <li>• <strong className="text-white">AC isolator:</strong> Switch with AC marking</li>
                  <li>• <strong className="text-white">Meter:</strong> Circle with M or kWh</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Drawing Conventions</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Power flow:</strong> Left to right, top to bottom</li>
                  <li>• <strong className="text-white">Line types:</strong> Thick for power, thin for control</li>
                  <li>• <strong className="text-white">Labels:</strong> Ratings and identifications</li>
                  <li>• <strong className="text-white">References:</strong> Grid refs for complex drawings</li>
                  <li>• <strong className="text-white">Standards:</strong> IEC 60617 symbols</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck
          question="What symbol standard is used for electrical SLDs?"
          options={["ISO 9001", "IEC 60617", "BS 7671"]}
          correctIndex={1}
          explanation="IEC 60617 provides the international standard electrical symbols used in single-line diagrams."
        />

        {/* Section 02 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Component Placement &amp; Energy Flow
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Understanding the energy flow sequence helps create logical, easy-to-follow diagrams.
            </p>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="text-white font-medium mb-3">Typical Energy Flow Sequence:</h4>
              <div className="space-y-2 text-sm">
                <p><strong className="text-elec-yellow">1.</strong> PV Array - Solar panels generate DC electricity</p>
                <p><strong className="text-elec-yellow">2.</strong> DC Isolator - Safety isolation near array</p>
                <p><strong className="text-elec-yellow">3.</strong> Inverter - DC to AC conversion</p>
                <p><strong className="text-elec-yellow">4.</strong> AC Isolator - AC side safety isolation</p>
                <p><strong className="text-elec-yellow">5.</strong> Generation Meter - Measures PV output</p>
                <p><strong className="text-elec-yellow">6.</strong> Distribution Board - Protection and distribution</p>
                <p><strong className="text-elec-yellow">7.</strong> Loads/Export - Building consumption or grid</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Key Placement Considerations:</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong className="text-white">Inverter location:</strong> Accessible, ventilated, protected</li>
                <li>• <strong className="text-white">Meter placement:</strong> DNO accessible location</li>
                <li>• <strong className="text-white">Isolator positioning:</strong> Visible for emergency use</li>
                <li>• <strong className="text-white">Cable routes:</strong> Shortest paths with protection</li>
              </ul>
            </div>
          </div>
        </div>

        <InlineCheck
          question="What is the typical energy flow sequence after the PV array?"
          options={["AC isolator, then inverter", "DC isolator, then inverter", "Generation meter first"]}
          correctIndex={1}
          explanation="Energy flows from PV array through DC isolator, then to the inverter for DC-AC conversion."
        />

        {/* Section 03 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Metering &amp; Monitoring Systems
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Proper metering configuration is essential for system monitoring and grid compliance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Metering Configuration</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Generation meter:</strong> Total PV output</li>
                  <li>• <strong className="text-white">Export meter:</strong> Grid export</li>
                  <li>• <strong className="text-white">Import meter:</strong> Standard consumption</li>
                  <li>• <strong className="text-white">Net metering:</strong> Bidirectional</li>
                  <li>• <strong className="text-white">Smart meters:</strong> Remote reading</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Monitoring Systems</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong className="text-white">Inverter monitoring:</strong> Built-in logging</li>
                  <li>• <strong className="text-white">String monitoring:</strong> Individual strings</li>
                  <li>• <strong className="text-white">Panel-level:</strong> Optimiser systems</li>
                  <li>• <strong className="text-white">Weather:</strong> Irradiance/temperature</li>
                  <li>• <strong className="text-white">Remote access:</strong> Cloud platforms</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Section 04 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Design Software &amp; Tools
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Professional design tools ensure accurate, compliant documentation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Professional Software</h4>
                <ul className="text-sm space-y-1">
                  <li>• AutoCAD Electrical</li>
                  <li>• EPLAN</li>
                  <li>• PVsyst</li>
                  <li>• Aurora Solar</li>
                  <li>• SolarEdge Designer</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Documentation Required</h4>
                <ul className="text-sm space-y-1">
                  <li>• Single-line diagrams</li>
                  <li>• Wiring diagrams</li>
                  <li>• Layout drawings</li>
                  <li>• Equipment schedules</li>
                  <li>• Cable schedules</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Quality Assurance</h4>
                <ul className="text-sm space-y-1">
                  <li>• Design reviews</li>
                  <li>• Standards compliance</li>
                  <li>• Version control</li>
                  <li>• As-built drawings</li>
                  <li>• Client communication</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <InlineCheck
          question="What design software is industry-standard for professional SLDs?"
          options={["Microsoft Paint", "AutoCAD Electrical", "PowerPoint"]}
          correctIndex={1}
          explanation="AutoCAD Electrical is industry-standard professional software for schematic design."
        />

        {/* Section 05 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Documentation Standards &amp; Compliance
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <p>
              Compliance with documentation standards is essential for DNO approval and MCS certification.
            </p>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Key Standards:</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong className="text-white">IEC 61730:</strong> PV module safety qualification</li>
                <li>• <strong className="text-white">IEC 62446:</strong> Grid-connected PV documentation</li>
                <li>• <strong className="text-white">BS 7909:</strong> Temporary electrical systems</li>
                <li>• <strong className="text-white">MCS standards:</strong> Microgeneration certification</li>
                <li>• <strong className="text-white">DNO requirements:</strong> Network operator specifications</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h4 className="text-white font-medium mb-2">Professional Presentation:</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong className="text-white">Title blocks:</strong> Project info, drawing number, revision</li>
                <li>• <strong className="text-white">Drawing standards:</strong> Consistent line weights, text sizes</li>
                <li>• <strong className="text-white">Cross-references:</strong> Links to other drawings</li>
                <li>• <strong className="text-white">Approval signatures:</strong> Engineer and checker</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 06 */}
        <div className="mb-8 mt-8">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Common Mistakes &amp; Best Practices
          </h2>
          <div className="space-y-4 text-white/80 leading-relaxed">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <h4 className="text-white font-medium mb-2">Best Practices</h4>
                <ul className="text-sm space-y-1">
                  <li>• Clear labelling on every component</li>
                  <li>• Consistent scaling throughout</li>
                  <li>• Logical flow direction</li>
                  <li>• Legend with symbol definitions</li>
                  <li>• Rating information shown</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <h4 className="text-red-400 font-medium mb-2">Common Mistakes</h4>
                <ul className="text-sm space-y-1">
                  <li>• Missing isolators</li>
                  <li>• Incorrect symbols</li>
                  <li>• Incomplete labelling</li>
                  <li>• Scale inconsistency</li>
                  <li>• Unclear connections</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Commercial Case Study */}
        <div className="mb-8 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
          <h3 className="text-white font-semibold mb-3">Case Study: 100kW Commercial Installation</h3>
          <div className="text-white/80 text-sm space-y-2">
            <p>
              A factory rooftop installation with 250 x 400W panels, 4 x 25kW string inverters, and complex AC distribution requires detailed SLD documentation for DNO approval.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="p-3 rounded bg-white/5">
                <h4 className="text-white font-medium mb-2">DC Side Details:</h4>
                <ul className="space-y-1">
                  <li>• 62 strings of 4 panels (248 total)</li>
                  <li>• String voltage: 148V VMP, 180V VOC</li>
                  <li>• 4 combiner boxes with DC isolation</li>
                  <li>• SPDs at each inverter</li>
                </ul>
              </div>
              <div className="p-3 rounded bg-white/5">
                <h4 className="text-white font-medium mb-2">AC Side Details:</h4>
                <ul className="space-y-1">
                  <li>• 4 x 25kW three-phase inverters</li>
                  <li>• Individual AC isolators per inverter</li>
                  <li>• Generation meter and export limit</li>
                  <li>• Integration with existing switchgear</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">Why are single-line diagrams important?</h4>
              <p className="text-white/70 text-sm">SLDs provide a simplified representation of the electrical system, making it easier to understand power flow, identify components, and plan maintenance. They are required for DNO approval and MCS certification.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">What is the difference between an SLD and a wiring diagram?</h4>
              <p className="text-white/70 text-sm">An SLD shows the system overview using single lines for multi-conductor connections, focusing on component relationships. Wiring diagrams show detailed connections including all conductors, terminals, and physical routing.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">What should as-built drawings include?</h4>
              <p className="text-white/70 text-sm">As-built drawings record the final installation including any deviations from the original design, actual cable routes, component locations, and any field modifications made during installation.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">How detailed should legends be?</h4>
              <p className="text-white/70 text-sm">Legends should define all symbols used, explain abbreviations, and include notes on drawing conventions. Anyone reading the drawing should be able to understand it without prior knowledge of your specific practices.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">When do I need a chartered engineer to sign off drawings?</h4>
              <p className="text-white/70 text-sm">Large commercial installations (typically over 50kWp), complex systems, and projects requiring structural modifications usually need chartered engineer sign-off. Requirements vary by DNO and local authority.</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <h4 className="text-white font-medium mb-2">What revision control is needed?</h4>
              <p className="text-white/70 text-sm">Every revision should have a unique number, date, description of changes, and approval signatures. Maintain a revision history table on the drawing and archive superseded versions for traceability.</p>
            </div>
          </div>
        </div>

        {/* Quiz */}
        <div className="mb-8">
          <Quiz
            title="Section 6 Quiz: Single-Line Diagrams"
            questions={quizQuestions}
            passingScore={70}
          />
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-white/10">
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10" asChild>
            <Link to="../section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold" asChild>
            <Link to="/electrician/upskilling/renewable-energy-module-2">
              Complete Module 2
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule2Section6;
