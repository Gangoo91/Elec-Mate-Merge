import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Preparing Design Drawings and Schematics - Level 3 Module 6 Section 5.1";
const DESCRIPTION = "Creating professional electrical design drawings, schematic diagrams, and layout plans using BS EN 60617 symbols and industry-standard conventions.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What standard defines the graphical symbols used in electrical drawings in the UK?",
    options: [
      "BS 1363",
      "BS EN 60617 (graphical symbols for diagrams)",
      "BS 7671",
      "BS 5839"
    ],
    correctIndex: 1,
    explanation: "BS EN 60617 is the standard that defines graphical symbols for use in electrical diagrams. These symbols are internationally recognised and ensure consistency across the industry. BS 7671 references these symbols but doesn't define them."
  },
  {
    id: "check-2",
    question: "What is the main purpose of a single-line diagram (SLD)?",
    options: [
      "To show the physical layout of equipment",
      "To show the electrical relationship between components using simplified notation",
      "To provide cable routing information",
      "To show only the lighting circuits"
    ],
    correctIndex: 1,
    explanation: "A single-line diagram (also called one-line diagram) shows the electrical flow and relationship between major components using a single line to represent conductors, regardless of the number of phases. It provides an overview of the power distribution without physical layout details."
  },
  {
    id: "check-3",
    question: "When drawing a circuit diagram for a final circuit, what essential information should be included?",
    options: [
      "Just the cable route",
      "Circuit reference, protective device rating, cable size, circuit length, and connected load",
      "Only the socket outlet positions",
      "The manufacturer's name only"
    ],
    correctIndex: 1,
    explanation: "A complete circuit diagram should include all information needed for installation and verification: circuit reference number, protective device type and rating, cable type and size, circuit length for volt drop calculations, and the total connected load or current demand."
  },
  {
    id: "check-4",
    question: "What type of drawing shows the physical layout of electrical equipment within a building?",
    options: [
      "Schematic diagram",
      "Single-line diagram",
      "Layout or floor plan drawing",
      "Block diagram"
    ],
    correctIndex: 2,
    explanation: "Layout or floor plan drawings show the physical position of electrical equipment within the building structure. They are typically overlaid on architectural plans and show socket outlets, light fittings, distribution boards, cable routes, and other equipment in their actual locations."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does a dashed line typically represent on an electrical installation drawing?",
    options: [
      "A live conductor",
      "A concealed or hidden cable route",
      "A protective conductor",
      "A temporary connection"
    ],
    correctAnswer: 1,
    explanation: "Dashed or dotted lines typically indicate concealed elements - cables installed in walls, floors, or above ceilings where they won't be visible in the finished building. Solid lines indicate surface-mounted or visible elements."
  },
  {
    id: 2,
    question: "What information should appear in the title block of an electrical drawing?",
    options: [
      "Just the drawing number",
      "Project name, drawing title, scale, date, revision, drawn by, checked by, and drawing number",
      "Only the client's name",
      "The cable specification only"
    ],
    correctAnswer: 1,
    explanation: "The title block provides essential administrative information: project identification, drawing title describing its content, scale, date of issue, revision history, who prepared and checked it, and a unique drawing number. This enables proper document control and reference."
  },
  {
    id: 3,
    question: "Why is it important to use standard symbols rather than creating custom symbols?",
    options: [
      "Standard symbols look better",
      "Standard symbols are understood by all trades and enable accurate interpretation without confusion",
      "Custom symbols are more expensive to produce",
      "Regulations prohibit custom symbols"
    ],
    correctAnswer: 1,
    explanation: "Standard symbols to BS EN 60617 are universally understood by electricians, other trades, inspectors, and clients. Using non-standard symbols can cause misinterpretation, installation errors, and delays while people try to understand unfamiliar notation."
  },
  {
    id: 4,
    question: "What does 'drawing to scale' mean and why is it important?",
    options: [
      "Making the drawing look professional",
      "Ensuring elements are proportionally sized so measurements can be taken from the drawing",
      "Using the largest paper size available",
      "Including a scale bar for decoration"
    ],
    correctAnswer: 1,
    explanation: "A scaled drawing maintains proportional relationships between elements. If drawn at 1:50 scale, 1mm on the drawing represents 50mm in reality. This allows cable lengths to be estimated, clearances to be verified, and positions to be accurately set out on site."
  },
  {
    id: 5,
    question: "What is the purpose of a wiring diagram as distinct from a circuit diagram?",
    options: [
      "They are identical",
      "A wiring diagram shows physical connections between terminals rather than the electrical principle",
      "Wiring diagrams are only used for three-phase circuits",
      "Wiring diagrams are informal sketches"
    ],
    correctAnswer: 1,
    explanation: "Wiring diagrams show how conductors physically connect to equipment terminals, enabling assembly and maintenance. Circuit diagrams show the electrical principle of operation. Both may be needed: the circuit diagram to understand function, the wiring diagram to make connections."
  },
  {
    id: 6,
    question: "A drawing is marked as 'For Construction'. What does this status indicate?",
    options: [
      "It is a preliminary sketch only",
      "The drawing has been approved and work may proceed using this information",
      "It needs to be checked before use",
      "It is for client presentation only"
    ],
    correctAnswer: 1,
    explanation: "A 'For Construction' or 'Issued for Construction' status indicates the drawing has been through appropriate review and approval processes and may be used for actual installation work. Earlier statuses like 'Draft' or 'For Comment' indicate documents not yet approved for construction use."
  },
  {
    id: 7,
    question: "What is the purpose of cross-referencing between drawings?",
    options: [
      "To make the drawing set look professional",
      "To enable users to find related information on other drawings without searching the entire set",
      "It is only required for large projects",
      "To identify the original designer"
    ],
    correctAnswer: 1,
    explanation: "Cross-referencing enables efficient navigation of drawing sets. A floor plan might reference 'See Drawing E-401 for distribution board details' rather than repeating information. This reduces duplication, ensures consistency, and helps users locate all relevant information."
  },
  {
    id: 8,
    question: "What type of diagram would show the internal connections of a motor starter?",
    options: [
      "Site layout plan",
      "Schematic or wiring diagram",
      "Single-line diagram",
      "Floor plan"
    ],
    correctAnswer: 1,
    explanation: "Schematic or wiring diagrams show internal connections within equipment. A motor starter schematic would show contactors, overloads, control circuits, and their interconnections. The single-line diagram would simply show 'motor starter' as a single block symbol."
  },
  {
    id: 9,
    question: "When revising a drawing, what procedure should be followed?",
    options: [
      "Simply save over the old version",
      "Increment the revision letter/number, cloud the changes, update the revision history, and re-issue",
      "Create a completely new drawing number",
      "Only change the date"
    ],
    correctAnswer: 1,
    explanation: "Proper revision control requires incrementing the revision indicator (A to B, or 1 to 2), clouding or otherwise marking changed areas, recording the change description in the revision history, updating the date, and formally re-issuing. This provides audit trail and prevents use of superseded information."
  },
  {
    id: 10,
    question: "What scale is typically used for detailed electrical drawings showing internal distribution board arrangements?",
    options: [
      "1:500",
      "1:10 or 1:20",
      "1:100",
      "Not to scale"
    ],
    correctAnswer: 1,
    explanation: "Detail drawings showing internal arrangements of equipment (distribution board internals, control panel layouts) typically use larger scales like 1:10 or 1:20 to show sufficient detail. Floor plans might use 1:50 or 1:100, while site plans might use 1:200 or 1:500."
  },
  {
    id: 11,
    question: "What does 'NTS' on a drawing indicate?",
    options: [
      "New Technical Standard",
      "Not To Scale - measurements should not be taken from the drawing",
      "National Testing Service",
      "No Technical Symbols"
    ],
    correctAnswer: 1,
    explanation: "NTS means 'Not To Scale'. This indicates the drawing is for general arrangement or diagrammatic purposes only - elements may not be proportionally sized and measurements should not be scaled from the drawing. Actual dimensions should be obtained from dimensions shown or field measurement."
  },
  {
    id: 12,
    question: "Why should As-Built drawings be prepared after installation is complete?",
    options: [
      "To satisfy the architect",
      "To record actual installed conditions which may differ from design drawings",
      "They are optional documentation",
      "To practice drawing skills"
    ],
    correctAnswer: 1,
    explanation: "As-Built drawings record what was actually installed, which often differs from design intent due to site conditions, variations, and practical adjustments. They are essential for future maintenance, alterations, and fault finding. They form part of the O&M manual and health and safety file."
  }
];

const faqs = [
  {
    question: "What software should I use for electrical drawings?",
    answer: "AutoCAD is the industry standard for 2D CAD work, with AutoCAD Electrical providing electrical-specific tools. Revit is increasingly used for BIM projects. For smaller projects, software like ElectricalOM, Amtech, or even properly formatted Excel templates for schedules may be appropriate. The choice depends on project size, client requirements, and coordination needs with other disciplines."
  },
  {
    question: "How detailed should my drawings be?",
    answer: "Drawings should contain sufficient information for installation without verbal clarification. Consider: can an electrician who hasn't seen the site install from these drawings? Include cable routes, sizes, circuit references, equipment positions, connection details, and any critical dimensions. Too little detail causes site queries; too much clutters the drawing and obscures important information."
  },
  {
    question: "What's the difference between schematic and wiring diagrams?",
    answer: "Schematic diagrams show the electrical principle of operation - how the circuit functions - using standard symbols. Wiring diagrams show the physical connections between terminals - how to actually wire the equipment. Both may be needed: the schematic to understand the circuit logic, the wiring diagram to make the connections correctly."
  },
  {
    question: "How do I handle design changes during a project?",
    answer: "Follow formal revision procedures: increment the revision indicator, mark changed areas with revision clouds, record the change in the revision history block, update the date, and re-issue formally. Ensure superseded drawings are removed from use. For significant changes, an RFI (Request for Information) or formal variation process may be required."
  },
  {
    question: "Should drawings be issued in paper or digital format?",
    answer: "This depends on client preference and project requirements. Digital formats (PDF for viewing, DWG for CAD users) are increasingly standard, enabling easy distribution and reducing printing costs. Some contracts still require paper copies for site use and archives. BIM projects typically use digital models with drawings extracted as needed."
  },
  {
    question: "What makes a good electrical drawing?",
    answer: "A good drawing is clear, accurate, and complete. Use appropriate line weights (thicker for emphasis), consistent symbols to standards, logical layout with adequate spacing, complete title block and revision history, proper cross-referencing, and notes explaining non-standard items. The test is whether someone unfamiliar with the project can use it correctly."
  }
];

const Level3Module6Section5_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>BS EN 60617:</strong> Standard symbols for electrical diagrams</li>
              <li><strong>Drawing Types:</strong> Layout, schematic, wiring, single-line</li>
              <li><strong>Title Block:</strong> Essential project and revision information</li>
              <li><strong>Scale:</strong> Enables measurements from drawings</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Missing title blocks, non-standard symbols, no scales</li>
              <li><strong>Use:</strong> Consistent line weights and symbol conventions</li>
              <li><strong>Apply:</strong> Revision control with clouding and history</li>
            </ul>
          </div>
        </div>

        

        

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Types of Electrical Drawings
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical design documentation typically comprises several types of drawings, each serving a specific purpose. Understanding when to use each type - and what information each should contain - is fundamental to producing professional documentation.
            </p>

            <div className="grid gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Layout / Floor Plan Drawings</p>
                <p className="text-sm text-white/90 mb-2">
                  Show the physical position of electrical equipment overlaid on the building plan. These are what electricians use on site to position equipment and route cables.
                </p>
                <ul className="text-sm text-white/80 space-y-1 ml-4">
                  <li>Socket outlet positions and types</li>
                  <li>Lighting positions and switch relationships</li>
                  <li>Distribution board locations</li>
                  <li>Cable routes (surface/concealed)</li>
                  <li>References to associated schedules and details</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Single-Line Diagrams (SLD)</p>
                <p className="text-sm text-white/90 mb-2">
                  Show the power distribution from supply to final circuits using simplified notation. Each circuit is shown as a single line regardless of the number of conductors.
                </p>
                <ul className="text-sm text-white/80 space-y-1 ml-4">
                  <li>Incoming supply arrangement</li>
                  <li>Main and sub-distribution boards</li>
                  <li>Protective device types and ratings</li>
                  <li>Cable sizes and circuit references</li>
                  <li>Metering and switching arrangements</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Schematic Diagrams</p>
                <p className="text-sm text-white/90 mb-2">
                  Show the electrical principle of operation using standard symbols. Used for control circuits, interlocking arrangements, and complex switching.
                </p>
                <ul className="text-sm text-white/80 space-y-1 ml-4">
                  <li>Control circuit logic</li>
                  <li>Interlocking sequences</li>
                  <li>Emergency stop arrangements</li>
                  <li>Timer and sensor connections</li>
                  <li>Functional relationships between components</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Wiring Diagrams</p>
                <p className="text-sm text-white/90 mb-2">
                  Show the physical connections between terminals. Used for panel building, maintenance, and fault finding.
                </p>
                <ul className="text-sm text-white/80 space-y-1 ml-4">
                  <li>Terminal identification</li>
                  <li>Conductor colours and numbers</li>
                  <li>Connection order and method</li>
                  <li>Cable entry positions</li>
                  <li>Internal component layout</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Standard Symbols and Conventions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical drawings use standardised symbols defined in BS EN 60617. Using these consistently ensures drawings are understood by all parties - electricians, other trades, inspectors, and clients - without ambiguity.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Common Symbol Categories:</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Accessories</p>
                  <ul className="text-white/90 space-y-1">
                    <li>Socket outlets (single, double, switched)</li>
                    <li>Switches (1-gang, 2-gang, dimmer)</li>
                    <li>Fused connection units</li>
                    <li>Data and communication outlets</li>
                  </ul>
                </div>
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Lighting</p>
                  <ul className="text-white/90 space-y-1">
                    <li>Luminaires (various types)</li>
                    <li>Emergency luminaires</li>
                    <li>Lighting control devices</li>
                    <li>PIR and occupancy sensors</li>
                  </ul>
                </div>
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Distribution</p>
                  <ul className="text-white/90 space-y-1">
                    <li>Consumer units and distribution boards</li>
                    <li>MCBs, RCBOs, RCDs</li>
                    <li>Isolators and switches</li>
                    <li>Transformers</li>
                  </ul>
                </div>
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Systems</p>
                  <ul className="text-white/90 space-y-1">
                    <li>Fire alarm devices</li>
                    <li>Security and access control</li>
                    <li>CCTV cameras</li>
                    <li>Energy monitoring points</li>
                  </ul>
                </div>
              </div>
            </div>

            <p>
              Line conventions are equally important: solid lines for visible or surface elements, dashed lines for concealed elements, different line weights to distinguish between different cable sizes or importance levels, and consistent use of colour where colour printing is available.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> If you must use a non-standard symbol, include a clear legend explaining its meaning. Non-standard symbols should be the exception, not the rule.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Drawing Content and Information
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The purpose of a drawing is to communicate design intent accurately. Every drawing should contain sufficient information for its intended purpose, without unnecessary clutter that obscures important details.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Essential Drawing Elements:</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Title Block (Required)</p>
                  <ul className="text-white/90 space-y-1">
                    <li>Project name and address</li>
                    <li>Drawing title describing content</li>
                    <li>Unique drawing number</li>
                    <li>Revision status and date</li>
                    <li>Drawn by / Checked by initials</li>
                    <li>Company details</li>
                  </ul>
                </div>
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Technical Information</p>
                  <ul className="text-white/90 space-y-1">
                    <li>Scale (or NTS if not to scale)</li>
                    <li>North point (for site/floor plans)</li>
                    <li>Legend of symbols used</li>
                    <li>General notes and specifications</li>
                    <li>Cross-references to other drawings</li>
                    <li>Grid references if applicable</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Circuit Information to Include:</p>
              <ul className="text-sm text-white/90 space-y-1 ml-4">
                <li>Circuit reference number matching the distribution board schedule</li>
                <li>Protective device type and rating (e.g., 32A Type B RCBO)</li>
                <li>Cable type, size, and installation method (e.g., 2.5mm T&E in wall)</li>
                <li>Circuit design current and actual cable capacity</li>
                <li>Connected load and diversity applied</li>
                <li>Route length for voltage drop verification</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A lighting circuit might be labelled: "Cct L1/1 - Ground Floor Lighting - 6A Type B MCB - 1.5mm T&E - Design Current 4.8A - Route Length 28m"
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Drawing Management and Revision Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper drawing management ensures the correct version is always used. On a construction project, using superseded drawings can result in incorrect installation, abortive work, and potentially dangerous outcomes.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-white mb-3">Document Control Principles:</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Drawing Status</p>
                  <ul className="text-white/90 space-y-1">
                    <li><strong>Preliminary/Draft:</strong> For comment only, not for construction</li>
                    <li><strong>For Approval:</strong> Issued for formal review</li>
                    <li><strong>For Construction:</strong> Approved for installation work</li>
                    <li><strong>As-Built:</strong> Records actual installed conditions</li>
                  </ul>
                </div>
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-1">Revision Process</p>
                  <ul className="text-white/90 space-y-1">
                    <li>Increment revision (A to B, P1 to P2)</li>
                    <li>Cloud changed areas to highlight</li>
                    <li>Update revision history block</li>
                    <li>Update date and issue formally</li>
                    <li>Withdraw superseded drawings</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Revision History Example:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2 pr-4 text-white/80">Rev</th>
                      <th className="text-left py-2 pr-4 text-white/80">Date</th>
                      <th className="text-left py-2 pr-4 text-white/80">Description</th>
                      <th className="text-left py-2 text-white/80">By</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/90">
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4 font-mono">P1</td>
                      <td className="py-2 pr-4">01/03/25</td>
                      <td className="py-2 pr-4">Preliminary issue for comment</td>
                      <td className="py-2">JB</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 pr-4 font-mono">A</td>
                      <td className="py-2 pr-4">15/03/25</td>
                      <td className="py-2 pr-4">First issue for construction</td>
                      <td className="py-2">JB</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono">B</td>
                      <td className="py-2 pr-4">22/04/25</td>
                      <td className="py-2 pr-4">Added socket outlets to reception area</td>
                      <td className="py-2">JB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Every drawing on site should be verified as current before use. Establish a procedure for replacing superseded drawings and ensure all team members understand the importance of using only current revisions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Creating Layout Drawings</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Obtain current architectural backgrounds in CAD format</li>
                <li>Establish layers for different systems (lighting, power, data, fire alarm)</li>
                <li>Position equipment at appropriate heights and clearances</li>
                <li>Show switch-to-luminaire relationships clearly</li>
                <li>Reference circuit numbers from the distribution board schedule</li>
                <li>Include cable routes where critical or non-obvious</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Developing Single-Line Diagrams</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Start from the incoming supply and work downstream</li>
                <li>Group circuits by distribution board or area</li>
                <li>Include all protective devices with ratings</li>
                <li>Show cable sizes and circuit references</li>
                <li>Indicate metering and monitoring points</li>
                <li>Note any special features (changeover switches, SPDs)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Missing title blocks</strong> - Drawings without identification cannot be controlled</li>
                <li><strong>Non-standard symbols</strong> - Creates confusion and misinterpretation</li>
                <li><strong>No revision control</strong> - Old versions remain in circulation</li>
                <li><strong>Overcrowded drawings</strong> - Too much information obscures important details</li>
                <li><strong>Missing cross-references</strong> - Users cannot find related information</li>
                <li><strong>Inconsistent notation</strong> - Different conventions on different drawings</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Drawing Types</p>
                <ul className="space-y-0.5">
                  <li>Layout - Physical positions on floor plan</li>
                  <li>SLD - Power distribution overview</li>
                  <li>Schematic - Electrical principles</li>
                  <li>Wiring - Physical terminal connections</li>
                  <li>As-Built - Actual installed conditions</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>BS EN 60617 - Graphical symbols</li>
                  <li>BS 8888 - Technical drawing practice</li>
                  <li>PAS 1192 - BIM documentation</li>
                  <li>BS 7671 - References to symbols in Appendix</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module6-section5-5-2">
              Next: Cable Schedules
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module6Section5_1;
