import { ArrowLeft, FileText, Zap, CheckCircle, AlertTriangle, BookOpen, Target, Database, FolderOpen, Tag, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fibre Record-Keeping - Fibre Optics Technology";
const DESCRIPTION = "Learn essential documentation practices for fibre optic installations including as-built drawings, test results, labelling standards, and handover documentation requirements.";

const quickCheckQuestions = [
  {
    question: "What is the primary purpose of as-built documentation?",
    options: [
      { text: "To satisfy regulatory requirements only", isCorrect: false },
      { text: "To provide an accurate record of what was actually installed for future maintenance", isCorrect: true },
      { text: "To create marketing materials for the installer", isCorrect: false },
      { text: "To document warranty claims", isCorrect: false }
    ],
    explanation: "As-built documentation records what was actually installed (which may differ from design drawings) so that future technicians can locate, identify, and maintain the infrastructure correctly."
  },
  {
    question: "How long should fibre test results typically be retained?",
    options: [
      { text: "1 year", isCorrect: false },
      { text: "5 years", isCorrect: false },
      { text: "For the lifetime of the installation", isCorrect: true },
      { text: "Until the warranty expires", isCorrect: false }
    ],
    explanation: "Test results should be retained for the entire life of the installation. They serve as baseline data for troubleshooting, proof of compliant installation, and reference for future upgrades or modifications."
  },
  {
    question: "What labelling information must be included at both ends of a fibre cable?",
    options: [
      { text: "Only the cable type", isCorrect: false },
      { text: "Cable ID and destination/origin information", isCorrect: true },
      { text: "Only the date of installation", isCorrect: false },
      { text: "The installer's name only", isCorrect: false }
    ],
    explanation: "Both ends of every cable must be labelled with a unique identifier (cable ID) and destination/origin information so technicians can trace connectivity. Additional useful information includes fibre count and type."
  }
];

const quizQuestions = [
  {
    question: "What should be recorded on an OTDR test result document?",
    options: [
      { text: "Only the pass/fail status", isCorrect: false },
      { text: "Link ID, test date, wavelength, settings, event table, and graphical trace", isCorrect: true },
      { text: "Just the installer's signature", isCorrect: false },
      { text: "Only the total link loss value", isCorrect: false }
    ],
    explanation: "Complete OTDR documentation includes: link identification, test date and technician, wavelength and settings used, event table showing each event with location and loss, and the graphical trace for visual reference."
  },
  {
    question: "What is the difference between design drawings and as-built drawings?",
    options: [
      { text: "They are the same document", isCorrect: false },
      { text: "Design shows intended installation; as-built shows what was actually installed", isCorrect: true },
      { text: "Design is created by the client; as-built by the contractor", isCorrect: false },
      { text: "As-built drawings are simplified versions of design drawings", isCorrect: false }
    ],
    explanation: "Design drawings show the planned installation. As-built drawings are updated versions that reflect what was actually installed, including any changes made during construction due to site conditions or other factors."
  },
  {
    question: "What labelling standard is commonly referenced for structured cabling?",
    options: [
      { text: "ISO 9001", isCorrect: false },
      { text: "TIA-606 (ANSI/TIA-606-C)", isCorrect: true },
      { text: "IEEE 802.3", isCorrect: false },
      { text: "IEC 60793", isCorrect: false }
    ],
    explanation: "ANSI/TIA-606-C provides comprehensive administration standard for telecommunications infrastructure, including labelling requirements for cables, pathways, spaces, and equipment."
  },
  {
    question: "What information should a splice enclosure record contain?",
    options: [
      { text: "Just the enclosure serial number", isCorrect: false },
      { text: "Location, fibre assignments, splice losses, and schematic diagram", isCorrect: true },
      { text: "Only the date it was installed", isCorrect: false },
      { text: "Just the number of splices", isCorrect: false }
    ],
    explanation: "Splice enclosure documentation should include: location (coordinates or reference), cables entering/leaving, fibre-to-fibre splice assignments, measured splice losses, and a schematic showing the layout."
  },
  {
    question: "Why is it important to record the test equipment serial numbers on certification reports?",
    options: [
      { text: "For insurance purposes only", isCorrect: false },
      { text: "To verify equipment was within calibration at time of testing", isCorrect: true },
      { text: "To prove equipment ownership", isCorrect: false },
      { text: "It's not important—only results matter", isCorrect: false }
    ],
    explanation: "Recording equipment serial numbers allows verification that test equipment was properly calibrated at the time of testing. This is essential for test result validity and warranty claims."
  },
  {
    question: "What should be included in handover documentation to the client?",
    options: [
      { text: "Only the final invoice", isCorrect: false },
      { text: "As-built drawings, test results, labelling schedule, warranties, and O&M manuals", isCorrect: true },
      { text: "Just verbal confirmation of completion", isCorrect: false },
      { text: "Only photographs of the installation", isCorrect: false }
    ],
    explanation: "Complete handover documentation includes: as-built drawings, all test results, labelling schedules, material certificates, warranties, operation and maintenance instructions, and any relevant equipment manuals."
  },
  {
    question: "What is a 'labelling schedule' in fibre documentation?",
    options: [
      { text: "A timeline for when to apply labels", isCorrect: false },
      { text: "A comprehensive list of all cable/panel IDs with their locations and assignments", isCorrect: true },
      { text: "A maintenance schedule for label replacement", isCorrect: false },
      { text: "A price list for labelling services", isCorrect: false }
    ],
    explanation: "A labelling schedule is a database or spreadsheet listing every labelled item (cables, ports, panels) with its unique identifier, location, connectivity assignments, and any other relevant attributes."
  },
  {
    question: "How often should fibre infrastructure documentation be reviewed and updated?",
    options: [
      { text: "Never—original documentation is sufficient", isCorrect: false },
      { text: "Only when major changes occur", isCorrect: false },
      { text: "After every change or modification, plus periodic audits", isCorrect: true },
      { text: "Every 10 years", isCorrect: false }
    ],
    explanation: "Documentation must be updated after every change (patches, repairs, additions) to remain accurate. Periodic audits (annually) verify documentation matches physical infrastructure."
  },
  {
    question: "What is the purpose of a Fibre Management System (FMS) database?",
    options: [
      { text: "To manage staff schedules", isCorrect: false },
      { text: "To provide centralised records of all fibre assets, connectivity, and test data", isCorrect: true },
      { text: "To automate billing", isCorrect: false },
      { text: "To monitor live traffic on fibres", isCorrect: false }
    ],
    explanation: "A Fibre Management System provides a centralised database of all fibre assets, including cable routes, splice points, connectivity assignments, test results, and maintenance history for efficient infrastructure management."
  },
  {
    question: "What minimum information should be included on a connector or port label?",
    options: [
      { text: "Just the colour", isCorrect: false },
      { text: "Unique identifier that links to the labelling schedule", isCorrect: true },
      { text: "The installer's initials only", isCorrect: false },
      { text: "The wavelength capacity", isCorrect: false }
    ],
    explanation: "Every connector and port needs a unique identifier (typically following TIA-606 format) that links to the labelling schedule where full details (destination, cable ID, fibre number, etc.) are recorded."
  }
];

const faqs = [
  {
    question: "How detailed do as-built drawings need to be?",
    answer: "As-built drawings should show: cable routes with approximate distances, all pathway elements (trays, conduits, ducts), equipment locations, splice points, patch panel positions, and any significant changes from design. Level of detail should be sufficient for someone unfamiliar with the site to locate any part of the infrastructure."
  },
  {
    question: "What format should test results be stored in?",
    answer: "Test results should be stored in the native format of the test equipment (for maximum detail) plus an exportable format like PDF for sharing. Many OTDR and certifier manufacturers use proprietary formats but can export to PDF. Maintain both for completeness."
  },
  {
    question: "How do I label fibres in a high-density MPO environment?",
    answer: "Use a hierarchical labelling scheme: Panel ID > Cassette/Module ID > Port Number. For example, 'FDP-A1-M03-P12' indicates Floor Distribution Panel A1, Module 3, Port 12. Colour coding can supplement but not replace text labels."
  },
  {
    question: "Should I keep records of failed tests?",
    answer: "Yes—failed test results with subsequent repairs and successful retests document the issue resolution and provide valuable troubleshooting history. This also demonstrates due diligence if problems recur."
  },
  {
    question: "What happens if documentation is lost?",
    answer: "Lost documentation is costly to recreate. Options include: visual survey of infrastructure, tone-tracing to verify connectivity, OTDR characterisation of unknown links, and creating new as-built drawings. This is time-consuming and expensive—prevention (multiple backups, cloud storage) is better."
  },
  {
    question: "Who is responsible for maintaining documentation after handover?",
    answer: "Typically the building owner or their facilities management team. The handover documentation should include procedures for updating records. Some organisations use managed service providers or maintain in-house documentation systems."
  }
];

const FiberOpticsModule7Section4 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/electrical-upskilling/fiber-optics-module-7" className="flex items-center gap-2 text-elec-yellow hover:text-elec-yellow/80 transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Module 7</span>
          </Link>
          <span className="text-white/50 text-sm">Section 4 of 5</span>
        </div>
      </div>

      {/* Title Header */}
      <div className="px-4 pt-8 pb-6 bg-gradient-to-b from-[#1a1a1a] to-[#222]">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-elec-yellow/20 text-elec-yellow text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            MODULE 7 · SECTION 4
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Fibre Record-Keeping
          </h1>
          <p className="text-white/70 text-lg">
            Master the documentation practices that ensure long-term maintainability
          </p>
        </div>
      </div>

      <div className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Quick Summary Boxes */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-[#252525] rounded-lg p-4 border border-white/10">
              <FileText className="w-6 h-6 text-elec-yellow mb-2" />
              <h3 className="text-white font-semibold text-sm mb-1">Documentation</h3>
              <p className="text-white/60 text-xs">As-built drawings, test results, schedules</p>
            </div>
            <div className="bg-[#252525] rounded-lg p-4 border border-white/10">
              <Tag className="w-6 h-6 text-elec-yellow mb-2" />
              <h3 className="text-white font-semibold text-sm mb-1">Labelling</h3>
              <p className="text-white/60 text-xs">Standards-compliant identification</p>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-[#252525] rounded-xl p-6 border border-white/10 mb-10">
            <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-4">
              <Target className="w-5 h-5 text-elec-yellow" />
              Learning Outcomes
            </h2>
            <ul className="space-y-3">
              {[
                "Understand the importance of comprehensive fibre documentation",
                "Create and maintain accurate as-built drawings",
                "Apply standardised labelling practices (TIA-606)",
                "Properly document and store test results",
                "Prepare complete handover documentation packages"
              ].map((outcome, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white/80">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 01: Why Documentation Matters */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Why Documentation Matters
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                Fibre optic infrastructure is a long-term investment, typically expected to serve for 15-25 years or more. Comprehensive documentation ensures that this investment can be effectively maintained, troubleshot, and expanded throughout its lifetime.
              </p>
            </div>

            {/* Benefits of Good Documentation */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Benefits of Comprehensive Documentation</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Faster fault resolution—technicians can locate infrastructure quickly
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Baseline data for comparison when problems occur
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Proof of compliant installation for warranty claims
                  </li>
                </ul>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Planning data for future upgrades and expansions
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Asset management for budgeting and lifecycle planning
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Reduces reliance on individuals who may leave the organisation
                  </li>
                </ul>
              </div>
            </div>

            {/* Cost of Poor Documentation */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                The Cost of Poor Documentation
              </h4>
              <p className="text-white/70 text-sm">
                Without proper records: troubleshooting takes longer (multiplied labour costs), mistakes are more likely (wrong fibres disconnected), upgrades require expensive surveys, and organisations become dependent on "tribal knowledge" that walks out the door when staff leave.
              </p>
            </div>
          </section>

          {/* Section 02: As-Built Documentation */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              As-Built Documentation
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                <strong className="text-white">As-built drawings</strong> record what was actually installed, which often differs from design drawings due to site conditions, changes, or corrections made during installation.
              </p>
            </div>

            {/* As-Built Contents */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-elec-yellow" />
                As-Built Drawing Contents
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">1</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Cable Routes</span>
                    <p className="text-white/60 text-sm">Physical path of each cable with distances and reference points</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">2</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Pathway Infrastructure</span>
                    <p className="text-white/60 text-sm">Cable trays, conduits, ducts, risers, and penetrations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">3</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Equipment Locations</span>
                    <p className="text-white/60 text-sm">Patch panels, splice enclosures, cabinets, and telecommunications rooms</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">4</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Cable Details</span>
                    <p className="text-white/60 text-sm">Cable type, fibre count, manufacturer, and specifications</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-elec-yellow font-bold text-sm">5</span>
                  </div>
                  <div>
                    <span className="text-white font-medium">Fibre Assignments</span>
                    <p className="text-white/60 text-sm">Which fibre connects to which port at each end</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawing Types */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Types of As-Built Drawings</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Drawing Type</th>
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Purpose</th>
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Typical Scale</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Site/Campus Plan</td>
                      <td className="py-2 px-3 text-white/60">Building locations and inter-building routes</td>
                      <td className="py-2 px-3 text-white/60">1:500 to 1:2000</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Floor Plan</td>
                      <td className="py-2 px-3 text-white/60">Cable routes within building floors</td>
                      <td className="py-2 px-3 text-white/60">1:100 to 1:200</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3">Riser Diagram</td>
                      <td className="py-2 px-3 text-white/60">Vertical backbone connectivity</td>
                      <td className="py-2 px-3 text-white/60">Schematic</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">Rack Elevation</td>
                      <td className="py-2 px-3 text-white/60">Equipment positioning in cabinets</td>
                      <td className="py-2 px-3 text-white/60">1:20 or schematic</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inline Check 1 */}
            <InlineCheck
              question={quickCheckQuestions[0].question}
              options={quickCheckQuestions[0].options}
              explanation={quickCheckQuestions[0].explanation}
            />
          </section>

          {/* Section 03: Test Result Documentation */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Test Result Documentation
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                Test results prove that the installation meets specifications and provide baseline data for future troubleshooting. They should be retained for the lifetime of the installation.
              </p>
            </div>

            {/* What to Document */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-elec-yellow" />
                Required Test Documentation
              </h4>
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-4">
                  <h5 className="text-elec-yellow font-medium mb-2">Link Identification</h5>
                  <ul className="text-white/60 text-sm space-y-1">
                    <li>• Unique link/cable identifier</li>
                    <li>• Source and destination locations</li>
                    <li>• Fibre pair or strand number</li>
                  </ul>
                </div>
                <div className="border-b border-white/10 pb-4">
                  <h5 className="text-elec-yellow font-medium mb-2">Test Conditions</h5>
                  <ul className="text-white/60 text-sm space-y-1">
                    <li>• Date and time of test</li>
                    <li>• Technician name/ID</li>
                    <li>• Equipment used (make, model, serial number)</li>
                    <li>• Calibration status of equipment</li>
                    <li>• Wavelength(s) tested</li>
                    <li>• Reference method used</li>
                  </ul>
                </div>
                <div className="border-b border-white/10 pb-4">
                  <h5 className="text-elec-yellow font-medium mb-2">Results</h5>
                  <ul className="text-white/60 text-sm space-y-1">
                    <li>• Measured loss (dB) for each wavelength</li>
                    <li>• Length measurement</li>
                    <li>• Pass/fail status against specified limit</li>
                    <li>• OTDR trace (graphical and event table)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-elec-yellow font-medium mb-2">Additional Information</h5>
                  <ul className="text-white/60 text-sm space-y-1">
                    <li>• Standard/specification tested against</li>
                    <li>• Notes on any anomalies or repairs</li>
                    <li>• Approval signatures if required</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Storage Format */}
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg mb-6">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Database className="w-4 h-4 text-elec-yellow" />
                Test Result Storage
              </h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• <strong className="text-white">Native format:</strong> Manufacturer's format for maximum detail</li>
                <li>• <strong className="text-white">PDF export:</strong> For sharing and long-term accessibility</li>
                <li>• <strong className="text-white">Cloud/server backup:</strong> Protected against loss</li>
                <li>• <strong className="text-white">Organised naming:</strong> Consistent file naming for easy retrieval</li>
              </ul>
            </div>

            {/* Inline Check 2 */}
            <InlineCheck
              question={quickCheckQuestions[1].question}
              options={quickCheckQuestions[1].options}
              explanation={quickCheckQuestions[1].explanation}
            />
          </section>

          {/* Section 04: Labelling Standards */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Labelling Standards and Practices
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                Consistent, standards-compliant labelling enables anyone to identify and trace fibre infrastructure without prior knowledge of the specific installation. <strong className="text-white">TIA-606</strong> is the primary labelling standard for structured cabling.
              </p>
            </div>

            {/* TIA-606 Overview */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-elec-yellow" />
                TIA-606 Administration Standard
              </h4>
              <div className="space-y-4">
                <div className="bg-[#1a1a1a] p-4 rounded-lg">
                  <h5 className="text-elec-yellow font-medium mb-2">Labelling Hierarchy</h5>
                  <div className="font-mono text-sm text-white/70">
                    <p className="mb-1">Building → Floor → Room → Rack → Panel → Port</p>
                    <p className="text-white/50 mt-2">Example: <span className="text-elec-yellow">BLD-A.02.TR-1.R03.FP01.12</span></p>
                    <p className="text-white/50 text-xs">Building A, Floor 2, TR-1, Rack 3, Panel 1, Port 12</p>
                  </div>
                </div>
                <div>
                  <h5 className="text-white font-medium mb-2">What Must Be Labelled</h5>
                  <ul className="text-white/60 text-sm space-y-1">
                    <li>• Every cable (both ends)</li>
                    <li>• Every port/connector</li>
                    <li>• Every patch panel</li>
                    <li>• Every splice enclosure</li>
                    <li>• Telecommunications rooms and spaces</li>
                    <li>• Pathways (trays, conduits) at intervals and changes</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Label Requirements */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Physical Label Requirements</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Durable materials</span>
                    <p className="text-white/60 text-sm">Labels must withstand environment—laminated, UV-resistant where needed</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Legible text</span>
                    <p className="text-white/60 text-sm">Print must be clear, correctly sized for viewing distance</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Consistent format</span>
                    <p className="text-white/60 text-sm">Same labelling scheme used throughout installation</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Secure attachment</span>
                    <p className="text-white/60 text-sm">Labels won't fall off or shift over time</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Colour Coding */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Colour Coding (Optional but Helpful)
              </h4>
              <p className="text-white/70 text-sm mb-2">
                TIA-606 suggests colour coding for visual identification:
              </p>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• <span className="text-orange-400">Orange:</span> Demarcation point</li>
                <li>• <span className="text-green-400">Green:</span> Network connections</li>
                <li>• <span className="text-purple-400">Purple:</span> Common equipment</li>
                <li>• <span className="text-white">White:</span> Building backbone</li>
                <li>• <span className="text-gray-400">Grey:</span> Campus backbone</li>
              </ul>
            </div>

            {/* Inline Check 3 */}
            <InlineCheck
              question={quickCheckQuestions[2].question}
              options={quickCheckQuestions[2].options}
              explanation={quickCheckQuestions[2].explanation}
            />
          </section>

          {/* Section 05: Labelling Schedule */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Creating and Maintaining a Labelling Schedule
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                A <strong className="text-white">labelling schedule</strong> is a database or spreadsheet that provides full details for every labelled item. Physical labels contain abbreviated codes that link to this master record.
              </p>
            </div>

            {/* Schedule Contents */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Labelling Schedule Contents</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Field</th>
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Example</th>
                      <th className="text-left py-2 px-3 text-white/60 font-medium">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3 text-elec-yellow">Cable ID</td>
                      <td className="py-2 px-3">FC-A01-B03-001</td>
                      <td className="py-2 px-3 text-white/60">Unique cable identifier</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3 text-elec-yellow">A-End Location</td>
                      <td className="py-2 px-3">BLD-A, Floor 3, TR-1, Rack 2</td>
                      <td className="py-2 px-3 text-white/60">Source termination</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3 text-elec-yellow">A-End Panel/Port</td>
                      <td className="py-2 px-3">FP01, Ports 1-12</td>
                      <td className="py-2 px-3 text-white/60">Connection points</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3 text-elec-yellow">B-End Location</td>
                      <td className="py-2 px-3">BLD-B, Floor 1, MER, Rack 5</td>
                      <td className="py-2 px-3 text-white/60">Destination termination</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3 text-elec-yellow">B-End Panel/Port</td>
                      <td className="py-2 px-3">FP03, Ports 1-12</td>
                      <td className="py-2 px-3 text-white/60">Connection points</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3 text-elec-yellow">Cable Type</td>
                      <td className="py-2 px-3">OS2, 12-fibre, loose tube</td>
                      <td className="py-2 px-3 text-white/60">Cable specification</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-3 text-elec-yellow">Length</td>
                      <td className="py-2 px-3">285m</td>
                      <td className="py-2 px-3 text-white/60">Installed length</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-elec-yellow">Notes</td>
                      <td className="py-2 px-3">Via external duct route C</td>
                      <td className="py-2 px-3 text-white/60">Additional info</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 06: Handover Documentation */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Handover Documentation Package
            </h2>

            <div className="space-y-4 text-white/80 mb-6">
              <p>
                When an installation is complete, a comprehensive documentation package must be handed over to the client or building owner. This becomes the permanent record for the infrastructure.
              </p>
            </div>

            {/* Handover Contents */}
            <div className="bg-[#252525] rounded-lg p-5 border border-white/10 mb-6">
              <h4 className="font-semibold text-white mb-4">Handover Documentation Contents</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">As-Built Drawings</span>
                    <p className="text-white/60 text-sm">Complete set showing actual installation</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Test Results</span>
                    <p className="text-white/60 text-sm">All certification test results, OTDR traces, and power meter readings</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Labelling Schedule</span>
                    <p className="text-white/60 text-sm">Complete database of all cable and port identifiers</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Material Certificates</span>
                    <p className="text-white/60 text-sm">Manufacturer data sheets, cable specifications, compliance certificates</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">Warranties</span>
                    <p className="text-white/60 text-sm">Product and installation warranties with terms and conditions</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium">O&M Documentation</span>
                    <p className="text-white/60 text-sm">Operation and maintenance instructions, cleaning procedures</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Digital vs Physical */}
            <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 p-4 rounded-r-lg mb-6">
              <h4 className="font-semibold text-white mb-2">Digital Documentation Best Practices</h4>
              <ul className="text-white/70 text-sm space-y-1">
                <li>• Provide documentation in both digital and printed formats</li>
                <li>• Use non-proprietary file formats (PDF, DWG/DXF, Excel) where possible</li>
                <li>• Include native test equipment files for maximum detail</li>
                <li>• Provide on USB drive and via secure file transfer</li>
                <li>• Ensure client has appropriate software to view files</li>
              </ul>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-6">
              <BookOpen className="w-6 h-6 text-elec-yellow" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-[#252525] rounded-lg p-5 border border-white/10">
                  <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-white/70 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Reference Card */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 rounded-xl p-6 border border-elec-yellow/30">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-elec-yellow" />
                Quick Reference: Documentation Checklist
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Drawings</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>□ Site/campus plan</li>
                    <li>□ Floor plans with routes</li>
                    <li>□ Riser diagrams</li>
                    <li>□ Rack elevations</li>
                    <li>□ Splice schematics</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Records</h4>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>□ All test results</li>
                    <li>□ Labelling schedule</li>
                    <li>□ Material certificates</li>
                    <li>□ Warranties</li>
                    <li>□ O&M instructions</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Quiz Section */}
          <section className="mb-12">
            <Quiz
              title="Section 4 Knowledge Check"
              questions={quizQuestions}
              passingScore={80}
            />
          </section>

          {/* Bottom Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-white/10">
            <Link
              to="/electrical-upskilling/fiber-optics-module-7-section-3"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#252525] text-white rounded-lg hover:bg-[#303030] transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous: Troubleshooting Tools
            </Link>
            <Link
              to="/electrical-upskilling/fiber-optics-module-7-section-5"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-elec-yellow text-[#1a1a1a] font-semibold rounded-lg hover:bg-elec-yellow/90 transition-colors min-h-[44px] touch-manipulation active:scale-[0.98]"
            >
              Next: Upgrade Planning
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiberOpticsModule7Section4;
