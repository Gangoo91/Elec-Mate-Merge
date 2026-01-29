import { ArrowLeft, Zap, CheckCircle, Layers, Users, AlertTriangle, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Interface Coordination - HNC Module 8 Section 6.3";
const DESCRIPTION = "Master interface coordination for building services: MEP coordination, BIM clash detection, ceiling void coordination, services priority rules, installation sequencing, design team meetings, RFIs, and contractor coordination procedures.";

const quickCheckQuestions = [
  {
    id: "bim-clash-detection",
    question: "What is the primary purpose of 3D clash detection in BIM coordination?",
    options: ["To create construction drawings", "To identify spatial conflicts between building services before installation", "To calculate material quantities", "To schedule labour resources"],
    correctIndex: 1,
    explanation: "3D clash detection in BIM coordination identifies spatial conflicts (clashes) between different building services elements before physical installation begins. This prevents costly rework, delays, and installation problems on site by resolving coordination issues during the design phase."
  },
  {
    id: "services-priority",
    question: "In a typical services priority hierarchy, which system generally takes precedence in spatial allocation?",
    options: ["Electrical containment", "Ventilation ductwork", "Gravity drainage", "Data cabling"],
    correctIndex: 2,
    explanation: "Gravity drainage systems typically take highest priority in spatial allocation because they require specific gradients (falls) to function correctly and cannot be easily rerouted. Pressurised systems like water, electrical, and ventilation have more flexibility in routing."
  },
  {
    id: "rfi-purpose",
    question: "What is the primary purpose of a Request for Information (RFI) in the construction process?",
    options: ["To order materials from suppliers", "To formally seek clarification on design information or resolve discrepancies", "To approve completed work", "To schedule site inspections"],
    correctIndex: 1,
    explanation: "An RFI (Request for Information) is a formal document used to seek clarification on design information, resolve discrepancies between drawings or specifications, or request missing information from the design team. RFIs create an auditable record of design decisions and changes."
  },
  {
    id: "coordination-meetings",
    question: "What is the typical frequency for MEP coordination meetings during the active installation phase?",
    options: ["Monthly", "Weekly", "Daily", "Bi-annually"],
    correctIndex: 1,
    explanation: "During active installation phases, MEP coordination meetings are typically held weekly. This frequency allows timely resolution of coordination issues, progress monitoring, and adjustment of installation sequences whilst maintaining project momentum."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does MEP stand for in building services coordination?",
    options: [
      "Main Electrical Panel",
      "Mechanical, Electrical, and Plumbing",
      "Multi-Element Protocol",
      "Managed Engineering Project"
    ],
    correctAnswer: 1,
    explanation: "MEP stands for Mechanical, Electrical, and Plumbing - the three primary building services disciplines that must be coordinated during design and construction to ensure systems work together effectively."
  },
  {
    id: 2,
    question: "Which BIM Level of Detail (LOD) is typically required for detailed clash detection during construction coordination?",
    options: ["LOD 100", "LOD 200", "LOD 300/350", "LOD 500"],
    correctAnswer: 2,
    explanation: "LOD 300/350 provides sufficient geometric detail for accurate clash detection, including specific element sizes, connection points, and routing details. LOD 100/200 are too schematic, whilst LOD 500 is as-built information."
  },
  {
    id: 3,
    question: "In ceiling void coordination, what is the typical minimum clear zone required above electrical cable tray for cable installation and maintenance?",
    options: ["50mm", "100mm", "150mm", "250mm"],
    correctAnswer: 2,
    explanation: "A minimum clear zone of 150mm is typically required above cable tray to allow for cable installation, manipulation of cables during termination, and future maintenance access. This zone must be free of other services."
  },
  {
    id: 4,
    question: "What type of clash is identified when two building elements occupy the same space?",
    options: ["Soft clash", "Hard clash", "Workflow clash", "Clearance clash"],
    correctAnswer: 1,
    explanation: "A hard clash occurs when two solid elements physically occupy the same space (e.g., a duct passing through a structural beam). These must be resolved as they represent impossible physical conditions."
  },
  {
    id: 5,
    question: "What document establishes the hierarchy and responsibilities for resolving coordination issues on a project?",
    options: ["Building Regulations Part P", "BIM Execution Plan (BEP)", "Method Statement", "Risk Assessment"],
    correctAnswer: 1,
    explanation: "The BIM Execution Plan (BEP) establishes protocols for model coordination, clash detection procedures, meeting schedules, and responsibilities for resolving coordination issues throughout the project."
  },
  {
    id: 6,
    question: "When services must cross in a ceiling void, what is the general rule for which service passes over the other?",
    options: [
      "Larger services always pass over smaller ones",
      "Electrical always passes over mechanical",
      "The service installed first takes priority",
      "Services requiring least flexibility in routing pass below"
    ],
    correctAnswer: 3,
    explanation: "Services with least routing flexibility (e.g., gravity drainage, large ductwork) generally route at lower levels, whilst more flexible services (e.g., smaller pipes, cables) route above and around them."
  },
  {
    id: 7,
    question: "What is a 'soft clash' in BIM coordination?",
    options: [
      "Two elements physically intersecting",
      "An element violating required clearance or access zones",
      "A scheduling conflict between trades",
      "Missing information in the model"
    ],
    correctAnswer: 1,
    explanation: "A soft clash occurs when an element violates required clearance zones, access requirements, or maintenance space - not a physical intersection but a situation that would prevent proper installation, operation, or maintenance."
  },
  {
    id: 8,
    question: "During a design coordination meeting, who typically chairs the meeting and leads clash resolution?",
    options: [
      "The electrical subcontractor",
      "The building owner",
      "The MEP coordinator or BIM manager",
      "The architect"
    ],
    correctAnswer: 2,
    explanation: "The MEP coordinator or BIM manager typically chairs coordination meetings, as they have oversight of all services disciplines and are responsible for facilitating clash resolution between the various trade contractors."
  },
  {
    id: 9,
    question: "What is the typical response timeframe expected for priority RFIs during active construction?",
    options: ["24 hours", "3-5 working days", "2 weeks", "1 month"],
    correctAnswer: 1,
    explanation: "Priority RFIs typically require response within 3-5 working days to prevent work stoppages. Critical RFIs affecting immediate work may require faster turnaround, whilst routine queries may allow longer response times."
  },
  {
    id: 10,
    question: "In installation sequencing, which electrical work typically precedes final fix activities?",
    options: [
      "Socket outlet installation",
      "Luminaire installation",
      "First fix cabling and containment",
      "Final testing and commissioning"
    ],
    correctAnswer: 2,
    explanation: "First fix activities (cabling, containment, back boxes) must be completed before wall finishes. Second fix (accessories, luminaires) and final connections occur after decorations, followed by testing and commissioning."
  },
  {
    id: 11,
    question: "What documentation should be reviewed before attending a design coordination meeting?",
    options: [
      "Only the meeting agenda",
      "Latest clash reports, updated drawings, and outstanding RFI responses",
      "Only the project programme",
      "Health and safety documentation"
    ],
    correctAnswer: 1,
    explanation: "Effective participation in coordination meetings requires reviewing latest clash detection reports, current drawing revisions, outstanding RFIs, previous meeting minutes, and any technical submissions affecting coordination."
  },
  {
    id: 12,
    question: "What is a coordination drawing (sometimes called a combined services drawing)?",
    options: [
      "A drawing showing only electrical services",
      "A drawing overlaying all services to show spatial relationships and routing",
      "A drawing showing structural elements only",
      "A drawing showing architectural finishes"
    ],
    correctAnswer: 1,
    explanation: "A coordination drawing overlays all building services (mechanical, electrical, plumbing, fire protection) on a single drawing to show spatial relationships, identify potential conflicts, and establish agreed routing for all systems."
  }
];

const faqs = [
  {
    question: "What is the difference between 2D and 3D coordination?",
    answer: "Traditional 2D coordination involves overlaying plan drawings from different disciplines to identify conflicts - this only shows horizontal clashes and can miss vertical conflicts. 3D BIM coordination creates federated models containing all services in three dimensions, enabling automated clash detection of both horizontal and vertical conflicts, accurate quantity extraction, and visualisation of complex intersections. 3D coordination is now standard for major projects and significantly reduces site conflicts."
  },
  {
    question: "How should electrical contractors prepare for coordination meetings?",
    answer: "Electrical contractors should prepare by: reviewing the latest federated model and clash reports, updating their own model with current design information, preparing a list of outstanding coordination issues, reviewing responses to RFIs, checking programme dates against their installation sequence, and bringing technical documentation for items requiring spatial coordination (e.g., switchgear dimensions, cable bending radii). Always attend with decision-making authority or clear communication back to decision-makers."
  },
  {
    question: "What happens when a clash cannot be resolved within the ceiling void?",
    answer: "When services cannot fit within the allocated ceiling void, options include: lowering the ceiling to increase void depth (requires architect approval and affects room heights), boxing out services below ceiling level (visual and spatial impact), rerouting services through alternative paths (may increase runs and costs), or using smaller alternative equipment where available. All solutions require formal approval through the design team and may generate variation orders if outside original scope."
  },
  {
    question: "How are coordination issues prioritised for resolution?",
    answer: "Coordination issues are typically prioritised based on: impact on the construction programme (issues affecting imminent work take priority), safety implications, cost of rework if not resolved, number of trades affected, and complexity of resolution. Critical path activities always take precedence. A formal clash resolution priority matrix should be established in the BIM Execution Plan to ensure consistent decision-making."
  },
  {
    question: "What role does the principal contractor play in MEP coordination?",
    answer: "The principal contractor is responsible for overall project coordination, including: establishing coordination meeting schedules, providing the coordination procedure and protocols, maintaining the master programme, facilitating resolution of inter-trade conflicts, ensuring adequate time and resources for coordination activities, and making final decisions when trades cannot agree. They also ensure coordination outputs are properly documented and distributed."
  },
  {
    question: "When should coordination activities begin on a project?",
    answer: "Coordination should begin during design development, not wait until construction. Early coordination (RIBA Stage 3-4) identifies major routing conflicts and allows design modifications before tender. Detailed coordination continues through construction, with formal clash detection runs at key milestones. The earlier coordination issues are identified, the lower the cost of resolution. Waiting until site installation to coordinate is the most expensive approach."
  }
];

const HNCModule8Section6_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 8.6.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Interface Coordination
          </h1>
          <p className="text-white/80">
            MEP coordination, BIM clash detection, ceiling void coordination, installation sequencing, and design team collaboration
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>MEP coordination:</strong> Integrating mechanical, electrical, and plumbing services</li>
              <li className="pl-1"><strong>Clash detection:</strong> Identifying spatial conflicts before installation</li>
              <li className="pl-1"><strong>Services priority:</strong> Gravity drainage &gt; ductwork &gt; pipes &gt; cables</li>
              <li className="pl-1"><strong>RFIs:</strong> Formal requests for design clarification</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Coordination Activities</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BIM models:</strong> Federated 3D coordination at LOD 300+</li>
              <li className="pl-1"><strong>Coordination meetings:</strong> Weekly during active installation</li>
              <li className="pl-1"><strong>Ceiling voids:</strong> Zoned allocation with access requirements</li>
              <li className="pl-1"><strong>Sequencing:</strong> First fix → second fix → commissioning</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand MEP coordination principles and stakeholder roles",
              "Apply BIM coordination and 3D clash detection techniques",
              "Coordinate services within ceiling voids using priority rules",
              "Develop effective installation sequencing strategies",
              "Participate effectively in design coordination meetings",
              "Manage RFIs and contractor coordination procedures"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: MEP Coordination Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            MEP Coordination Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              MEP (Mechanical, Electrical, and Plumbing) coordination is the process of integrating all building
              services systems to ensure they can be installed and operated without spatial conflicts. Effective
              coordination prevents costly rework, delays, and compromised system performance.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key coordination stakeholders:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>MEP Coordinator/BIM Manager:</strong> Leads coordination process, manages federated models, chairs meetings</li>
                <li className="pl-1"><strong>Design consultants:</strong> M&amp;E engineers, architects providing design intent and resolving technical queries</li>
                <li className="pl-1"><strong>Trade contractors:</strong> Responsible for detailed design and installation of their systems</li>
                <li className="pl-1"><strong>Principal contractor:</strong> Overall responsibility for coordination, programme, and conflict resolution</li>
                <li className="pl-1"><strong>Client/Employer:</strong> Approves changes affecting cost, programme, or design</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MEP Coordination Workflow</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Stage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Activities</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Outputs</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Design Development</td>
                      <td className="border border-white/10 px-3 py-2">Initial routing studies, spatial allocation</td>
                      <td className="border border-white/10 px-3 py-2">Coordination strategy, zone allocations</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Technical Design</td>
                      <td className="border border-white/10 px-3 py-2">Detailed routing, equipment positioning</td>
                      <td className="border border-white/10 px-3 py-2">Coordinated BIM model, clash reports</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pre-Construction</td>
                      <td className="border border-white/10 px-3 py-2">Contractor input, clash resolution</td>
                      <td className="border border-white/10 px-3 py-2">Installation drawings, sequences</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Construction</td>
                      <td className="border border-white/10 px-3 py-2">Ongoing coordination, site verification</td>
                      <td className="border border-white/10 px-3 py-2">As-built records, commissioning data</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Benefits of Effective Coordination</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Reduced rework and abortive costs</li>
                  <li className="pl-1">Minimised programme delays</li>
                  <li className="pl-1">Improved buildability and access</li>
                  <li className="pl-1">Better system performance</li>
                  <li className="pl-1">Clearer installation sequences</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Coordination Challenges</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Late design changes</li>
                  <li className="pl-1">Insufficient ceiling void depth</li>
                  <li className="pl-1">Missing or outdated information</li>
                  <li className="pl-1">Conflicting programme requirements</li>
                  <li className="pl-1">Unclear responsibility boundaries</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> The cost of resolving coordination issues increases exponentially as the project
              progresses. Issues identified during design cost significantly less to resolve than those found during installation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: BIM Coordination and Clash Detection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            BIM Coordination and Clash Detection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building Information Modelling (BIM) has transformed MEP coordination by enabling 3D spatial
              coordination and automated clash detection. Federated models combine individual discipline
              models to identify conflicts that would be difficult to spot in 2D drawings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Clash Detection Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Clash Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Resolution Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-red-400 font-medium">Hard Clash</td>
                      <td className="border border-white/10 px-3 py-2">Physical intersection of solid elements</td>
                      <td className="border border-white/10 px-3 py-2">Duct passing through steel beam</td>
                      <td className="border border-white/10 px-3 py-2">Must resolve - impossible condition</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-orange-400 font-medium">Soft Clash</td>
                      <td className="border border-white/10 px-3 py-2">Violation of clearance zones</td>
                      <td className="border border-white/10 px-3 py-2">Cable tray within access zone of valve</td>
                      <td className="border border-white/10 px-3 py-2">High - affects operation/maintenance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400 font-medium">Workflow Clash</td>
                      <td className="border border-white/10 px-3 py-2">Installation sequence conflict</td>
                      <td className="border border-white/10 px-3 py-2">Access blocked by earlier installation</td>
                      <td className="border border-white/10 px-3 py-2">Medium - affects programme</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-blue-400 font-medium">Clearance Clash</td>
                      <td className="border border-white/10 px-3 py-2">Insufficient space for installation</td>
                      <td className="border border-white/10 px-3 py-2">Cable bending radius compromised</td>
                      <td className="border border-white/10 px-3 py-2">High - affects installation quality</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BIM Level of Development (LOD) for Coordination</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">LOD</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Content</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Suitable For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LOD 200</td>
                      <td className="border border-white/10 px-3 py-2">Approximate geometry, generic placeholders</td>
                      <td className="border border-white/10 px-3 py-2">Early spatial studies</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LOD 300</td>
                      <td className="border border-white/10 px-3 py-2">Accurate geometry, specific element sizes</td>
                      <td className="border border-white/10 px-3 py-2">Design coordination</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LOD 350</td>
                      <td className="border border-white/10 px-3 py-2">LOD 300 + interfaces and supports</td>
                      <td className="border border-white/10 px-3 py-2">Construction coordination</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LOD 400</td>
                      <td className="border border-white/10 px-3 py-2">Fabrication-ready detail</td>
                      <td className="border border-white/10 px-3 py-2">Prefabrication, detailed sequencing</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Clash Detection Workflow</p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Model federation:</strong> Combine all discipline models into single coordination model</li>
                <li className="pl-1"><strong>Define clash rules:</strong> Set tolerance values and element groupings to test</li>
                <li className="pl-1"><strong>Run clash detection:</strong> Execute automated clash tests (Navisworks, Solibri, etc.)</li>
                <li className="pl-1"><strong>Review and classify:</strong> Filter false positives, categorise by severity and responsibility</li>
                <li className="pl-1"><strong>Assign resolution:</strong> Allocate clashes to responsible parties with target dates</li>
                <li className="pl-1"><strong>Track to closure:</strong> Monitor resolution progress, verify fixes in updated models</li>
              </ol>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Elements to Model</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Switchgear and distribution boards</li>
                  <li className="pl-1">Cable tray, ladder, and trunking</li>
                  <li className="pl-1">Large cable runs (&gt;50mm diameter)</li>
                  <li className="pl-1">Busbar systems</li>
                  <li className="pl-1">Lighting and power outlets (zone level)</li>
                  <li className="pl-1">Major equipment (transformers, UPS)</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Clash Tolerances</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Hard clash detection: 0mm tolerance</li>
                  <li className="pl-1">Insulation allowance: 25-50mm</li>
                  <li className="pl-1">Access clearance: 150-300mm</li>
                  <li className="pl-1">Maintenance zones: per equipment spec</li>
                  <li className="pl-1">Cable bending radii: 6-12× diameter</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>BIM coordination tip:</strong> Run clash detection at regular intervals (typically weekly during design
              development) rather than waiting for complete models. This identifies issues early when they are easier to resolve.
            </p>
          </div>
        </section>

        {/* Section 3: Ceiling Void Coordination */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Ceiling Void Coordination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Ceiling voids are typically the most congested areas for building services, requiring careful
              coordination to ensure all systems fit whilst maintaining access for installation and maintenance.
              A structured approach to zone allocation and services priority is essential.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Services Priority Hierarchy (Typical)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Priority</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Service Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Position</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-red-400 font-medium">1 - Highest</td>
                      <td className="border border-white/10 px-3 py-2">Gravity drainage</td>
                      <td className="border border-white/10 px-3 py-2">Lowest level</td>
                      <td className="border border-white/10 px-3 py-2">Requires falls, cannot be pressurised</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-orange-400 font-medium">2</td>
                      <td className="border border-white/10 px-3 py-2">Large ductwork</td>
                      <td className="border border-white/10 px-3 py-2">Lower-middle</td>
                      <td className="border border-white/10 px-3 py-2">Large cross-section, limited flexibility</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-yellow-400 font-medium">3</td>
                      <td className="border border-white/10 px-3 py-2">Fire sprinklers</td>
                      <td className="border border-white/10 px-3 py-2">Middle</td>
                      <td className="border border-white/10 px-3 py-2">Head positions fixed, some flexibility</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-green-400 font-medium">4</td>
                      <td className="border border-white/10 px-3 py-2">Pipework (LTHW, CHW)</td>
                      <td className="border border-white/10 px-3 py-2">Middle-upper</td>
                      <td className="border border-white/10 px-3 py-2">Pressurised, moderate flexibility</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-blue-400 font-medium">5</td>
                      <td className="border border-white/10 px-3 py-2">Cable containment</td>
                      <td className="border border-white/10 px-3 py-2">Upper level</td>
                      <td className="border border-white/10 px-3 py-2">High flexibility, small cross-section</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-purple-400 font-medium">6</td>
                      <td className="border border-white/10 px-3 py-2">Data/comms cabling</td>
                      <td className="border border-white/10 px-3 py-2">Highest level</td>
                      <td className="border border-white/10 px-3 py-2">Most flexible, smallest elements</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Ceiling Void Zone Allocation</p>
              <div className="font-mono text-xs text-white/90 space-y-1">
                <p>━━━━━━━━━━━━━━━━━━━━━━━ Structural soffit</p>
                <p>│ Zone 1: Structure &amp; fire protection (150mm+)</p>
                <p>├─────────────────────────────────────────</p>
                <p>│ Zone 2: Large ductwork (300-600mm)</p>
                <p>├─────────────────────────────────────────</p>
                <p>│ Zone 3: Pipework &amp; small ducts (150-200mm)</p>
                <p>├─────────────────────────────────────────</p>
                <p>│ Zone 4: Cable containment (100-200mm)</p>
                <p>├─────────────────────────────────────────</p>
                <p>│ Zone 5: Lighting &amp; ceiling grid (100mm)</p>
                <p>━━━━━━━━━━━━━━━━━━━━━━━ Ceiling level</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Electrical Void Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">150mm clear above cable tray for cabling</li>
                  <li className="pl-1">Segregation between power and data</li>
                  <li className="pl-1">Access for cable pulling and changes</li>
                  <li className="pl-1">Support spacing per manufacturer spec</li>
                  <li className="pl-1">Fire stopping at compartment boundaries</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Crossing Rules</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Services cross at 90° where possible</li>
                  <li className="pl-1">Lower priority services divert around higher</li>
                  <li className="pl-1">Maintain access to valves and junction boxes</li>
                  <li className="pl-1">Avoid crossing directly above access panels</li>
                  <li className="pl-1">Document all agreed crossing points</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Common Ceiling Void Coordination Failures</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Insufficient void depth:</strong> Services cannot fit - requires ceiling lowering or rerouting</li>
                <li className="pl-1"><strong>Blocked access:</strong> Maintenance items inaccessible after installation</li>
                <li className="pl-1"><strong>Fire stopping conflicts:</strong> Services routed through fire compartment boundaries without planned penetrations</li>
                <li className="pl-1"><strong>Lighting clashes:</strong> Luminaire positions conflict with ductwork or sprinklers</li>
                <li className="pl-1"><strong>Support clashes:</strong> Multiple trades fixing to same structural elements</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Coordination tip:</strong> Always verify the actual structural soffit level on site before finalising
              ceiling void coordination - design drawings may show nominal levels that differ from as-built conditions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Installation Sequencing and Design Team Coordination */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Installation Sequencing and Design Team Coordination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Successful building services installation requires careful sequencing to ensure trades can work
              efficiently without blocking each other's access or reworking installed systems. Design team
              coordination through formal meetings and RFI processes ensures information flows effectively.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Electrical Installation Sequence</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Phase</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Activities</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Dependencies</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">1. First Fix</td>
                      <td className="border border-white/10 px-3 py-2">Containment, back boxes, cabling to points</td>
                      <td className="border border-white/10 px-3 py-2">Structural completion, wall framing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">2. Equipment Install</td>
                      <td className="border border-white/10 px-3 py-2">Distribution boards, switchgear, major plant</td>
                      <td className="border border-white/10 px-3 py-2">First fix complete, plant room ready</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">3. Second Fix</td>
                      <td className="border border-white/10 px-3 py-2">Accessories, luminaires, final connections</td>
                      <td className="border border-white/10 px-3 py-2">Wall finishes, ceiling grid installed</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">4. Testing</td>
                      <td className="border border-white/10 px-3 py-2">Dead testing, live testing, commissioning</td>
                      <td className="border border-white/10 px-3 py-2">Second fix complete, power available</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 font-medium">5. Integration</td>
                      <td className="border border-white/10 px-3 py-2">BMS integration, systems commissioning</td>
                      <td className="border border-white/10 px-3 py-2">All M&amp;E systems operational</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-400 mb-2">Design Coordination Meetings</p>
                  <p className="text-sm text-white mb-3">
                    Regular coordination meetings bring together all stakeholders to review progress, resolve
                    clashes, and agree installation sequences. Effective meetings require preparation and follow-up.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-white mb-1">Pre-Meeting Preparation:</p>
                      <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-4">
                        <li>Review latest clash detection report</li>
                        <li>Update your discipline model</li>
                        <li>Prepare list of outstanding issues</li>
                        <li>Review previous meeting actions</li>
                        <li>Check RFI responses received</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white mb-1">Meeting Outputs:</p>
                      <ul className="text-xs text-white/80 space-y-0.5 list-disc list-outside ml-4">
                        <li>Documented clash resolutions</li>
                        <li>Action items with owners and dates</li>
                        <li>Agreed design changes</li>
                        <li>Updated coordination drawings</li>
                        <li>Next meeting date and agenda</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Request for Information (RFI) Process</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">RFI Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Purpose</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Response Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Clarification</td>
                      <td className="border border-white/10 px-3 py-2">Unclear specification or drawing detail</td>
                      <td className="border border-white/10 px-3 py-2">3-5 working days</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Discrepancy</td>
                      <td className="border border-white/10 px-3 py-2">Conflict between drawings or specifications</td>
                      <td className="border border-white/10 px-3 py-2">3-5 working days</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Missing Information</td>
                      <td className="border border-white/10 px-3 py-2">Information required but not provided</td>
                      <td className="border border-white/10 px-3 py-2">5-10 working days</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Design Change</td>
                      <td className="border border-white/10 px-3 py-2">Proposed change to design intent</td>
                      <td className="border border-white/10 px-3 py-2">10+ working days</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Critical/Urgent</td>
                      <td className="border border-white/10 px-3 py-2">Issue blocking imminent work</td>
                      <td className="border border-white/10 px-3 py-2">24-48 hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-2">RFI Best Practice</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1"><strong>Be specific:</strong> Reference exact drawing numbers, specification clauses, and locations</li>
                    <li className="pl-1"><strong>Include context:</strong> Explain why the information is needed and impact of delay</li>
                    <li className="pl-1"><strong>Propose solutions:</strong> Where possible, suggest potential resolutions for consideration</li>
                    <li className="pl-1"><strong>Attach evidence:</strong> Include marked-up drawings, photographs, or clash reports</li>
                    <li className="pl-1"><strong>Track responses:</strong> Log all RFIs and chase overdue responses systematically</li>
                    <li className="pl-1"><strong>Update drawings:</strong> Ensure RFI responses are incorporated into working drawings</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Trade Coordination Interfaces</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Structural - fixings, penetrations, loads</li>
                  <li className="pl-1">Mechanical - power supplies, controls</li>
                  <li className="pl-1">Plumbing - pump power, controls wiring</li>
                  <li className="pl-1">Fire - alarm, suppression interfaces</li>
                  <li className="pl-1">Security - access control, CCTV power</li>
                  <li className="pl-1">Lifts - power supply, controls</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Contractor Coordination Procedures</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Weekly coordination meetings</li>
                  <li className="pl-1">3-week look-ahead programmes</li>
                  <li className="pl-1">Daily site coordination briefings</li>
                  <li className="pl-1">Formal hand-over of completed areas</li>
                  <li className="pl-1">Shared coordination drawings</li>
                  <li className="pl-1">Access and isolation protocols</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-orange-400 mb-2">Programme Coordination Risks</p>
                  <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                    <li className="pl-1"><strong>Delayed information:</strong> RFI responses arriving after work window has passed</li>
                    <li className="pl-1"><strong>Access conflicts:</strong> Multiple trades requiring same area simultaneously</li>
                    <li className="pl-1"><strong>Late design changes:</strong> Changes after installation has commenced</li>
                    <li className="pl-1"><strong>Resource clashes:</strong> Insufficient labour to meet programme requirements</li>
                    <li className="pl-1"><strong>Material delays:</strong> Long-lead items not ordered in time</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key success factor:</strong> Proactive coordination - identifying and resolving issues before they
              impact the programme - is far more effective than reactive problem-solving after delays occur.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Resolving a Ceiling Void Clash</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> A 400×300mm supply air duct and a 150mm cable tray both require routing
                through a corridor ceiling void with only 500mm clear height. The duct must maintain level for
                downstream connections.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Available void height: 500mm</p>
                <p>Duct height: 300mm + 25mm insulation = 325mm</p>
                <p>Cable tray: 150mm (including cables and clearance above)</p>
                <p>Total if stacked: 325mm + 150mm = 475mm</p>
                <p className="mt-2 text-white/60">Analysis:</p>
                <p>- Duct cannot move down (requires level routing)</p>
                <p>- Cable tray can route above duct at crossings</p>
                <p>- At crossing points, cables run in tray above duct</p>
                <p>- Parallel runs have duct below, tray to side/above</p>
                <p className="mt-2 text-green-400">Solution: Cable tray routes above duct at 475mm from ceiling,</p>
                <p className="text-green-400">drops to normal level either side of duct run.</p>
                <p className="mt-2 text-white/60">Remaining clearance: 500mm - 475mm = 25mm (acceptable)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: RFI for Specification Discrepancy</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> The electrical specification calls for IP65-rated luminaires in a plant room,
                but the lighting schedule shows IP20-rated fittings. Clarification is required before ordering.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-elec-yellow">RFI Content Structure:</p>
                <p className="mt-2"><strong>Reference:</strong> Spec Section 21.3.4 vs Drawing E-401 Schedule</p>
                <p><strong>Location:</strong> Plant Room PR-01, Ground Floor</p>
                <p><strong>Issue:</strong> Specification clause 21.3.4 requires IP65 minimum</p>
                <p>for plant room luminaires. Drawing E-401 lighting schedule</p>
                <p>item LUM-07 shows Manufacturer X Model ABC rated IP20.</p>
                <p className="mt-2"><strong>Impact:</strong> Luminaire order required by [date] to meet</p>
                <p>programme. IP rating affects cost and lead time.</p>
                <p className="mt-2"><strong>Proposed Resolution Options:</strong></p>
                <p>1. Confirm IP65 - recommend Model DEF (4 week lead)</p>
                <p>2. Revise spec to permit IP20 in this location</p>
                <p className="mt-2 text-green-400">Response Required By: [date - 5 days before order deadline]</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Installation Sequence Planning</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Plan the electrical installation sequence for an office floor where the
                ceiling contractor, mechanical contractor, and sprinkler contractor are all working concurrently.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-elec-yellow">Coordination Requirements:</p>
                <p className="mt-2">Week 1-2: Zone A - First fix coordination</p>
                <p>- Day 1-2: Sprinkler mains at high level (Priority 1)</p>
                <p>- Day 2-4: Ductwork installation (Priority 2)</p>
                <p>- Day 3-5: Cable containment above duct (Priority 3)</p>
                <p>- Day 5-7: First fix cabling to points</p>
                <p className="mt-2">Week 3: Zone A - Ceiling close-up preparation</p>
                <p>- Photographic record of above-ceiling work</p>
                <p>- Inspection and sign-off by all trades</p>
                <p>- Fire stopping completion</p>
                <p className="mt-2">Week 4: Zone A - Second fix</p>
                <p>- Ceiling grid installation (ceiling contractor)</p>
                <p>- Luminaire installation (electrical)</p>
                <p>- Diffuser installation (mechanical)</p>
                <p>- Sprinkler heads (sprinkler contractor)</p>
                <p className="mt-2 text-green-400">Key Interface: All above-ceiling work must complete before</p>
                <p className="text-green-400">ceiling grid. Daily coordination briefing at 07:30.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Coordination Meeting Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Latest clash detection report reviewed and responses prepared</li>
                <li className="pl-1">Updated BIM model submitted to coordination folder</li>
                <li className="pl-1">Outstanding RFI status checked and chased if overdue</li>
                <li className="pl-1">Previous meeting actions completed or update prepared</li>
                <li className="pl-1">Three-week look-ahead programme reviewed for conflicts</li>
                <li className="pl-1">Technical submissions status updated</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Coordination Documents</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>BIM Execution Plan (BEP):</strong> Coordination protocols and responsibilities</li>
                <li className="pl-1"><strong>Coordination drawings:</strong> Agreed routing and spatial allocation</li>
                <li className="pl-1"><strong>Clash detection reports:</strong> Outstanding issues and resolutions</li>
                <li className="pl-1"><strong>RFI log:</strong> Questions raised and responses received</li>
                <li className="pl-1"><strong>Meeting minutes:</strong> Decisions made and actions assigned</li>
                <li className="pl-1"><strong>Installation sequence:</strong> Agreed order of work between trades</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Coordination Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Proceeding without coordination:</strong> Installing without reviewing latest clash reports</li>
                <li className="pl-1"><strong>Verbal agreements only:</strong> All coordination decisions must be documented</li>
                <li className="pl-1"><strong>Ignoring soft clashes:</strong> Access and maintenance requirements are critical</li>
                <li className="pl-1"><strong>Late model updates:</strong> Coordination relies on current information</li>
                <li className="pl-1"><strong>Missing interfaces:</strong> Failing to coordinate with all affected trades</li>
                <li className="pl-1"><strong>Programme optimism:</strong> Underestimating time for coordination resolution</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Services Priority (High to Low)</p>
                <ul className="space-y-0.5">
                  <li>1. Gravity drainage (requires falls)</li>
                  <li>2. Large ductwork (limited flexibility)</li>
                  <li>3. Fire sprinklers (fixed head positions)</li>
                  <li>4. Pipework - LTHW, CHW (pressurised)</li>
                  <li>5. Cable containment (high flexibility)</li>
                  <li>6. Data cabling (most flexible)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Clash Types</p>
                <ul className="space-y-0.5">
                  <li>Hard clash - physical intersection (must resolve)</li>
                  <li>Soft clash - clearance violation</li>
                  <li>Workflow clash - sequence conflict</li>
                  <li>Clearance clash - installation space issue</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section6-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Plant Room Design
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section6-4">
              Next: Commissioning Procedures
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section6_3;
