import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Building Services Coordination - HNC Module 5 Section 1.6";
const DESCRIPTION = "Master MEP coordination for building services: sequencing, interface management, BIM clash detection, coordination drawings, and installation priorities for electrical, mechanical, and plumbing systems.";

const quickCheckQuestions = [
  {
    id: "mep-definition",
    question: "What does MEP stand for in building services coordination?",
    options: ["Main Electrical Panel", "Mechanical, Electrical, and Plumbing", "Maximum Equipment Priority", "Multi-Element Programme"],
    correctIndex: 1,
    explanation: "MEP stands for Mechanical, Electrical, and Plumbing - the three main building services disciplines that must be coordinated to avoid clashes and ensure efficient installation."
  },
  {
    id: "clash-detection",
    question: "What is the primary purpose of BIM clash detection?",
    options: ["To create marketing materials", "To identify conflicts between services before installation", "To calculate material costs", "To design the building structure"],
    correctIndex: 1,
    explanation: "BIM clash detection identifies where different building services (pipes, ducts, cables) would physically occupy the same space, allowing resolution during design rather than costly on-site modifications."
  },
  {
    id: "installation-priority",
    question: "Which service typically has installation priority in ceiling voids?",
    options: ["Electrical containment", "Data cabling", "Drainage (gravity-fed)", "Lighting fixtures"],
    correctIndex: 2,
    explanation: "Drainage and gravity-fed services have priority because they cannot be rerouted easily - they require specific gradients (falls) to function. All other services must work around them."
  },
  {
    id: "coordination-drawing",
    question: "A coordination drawing shows:",
    options: ["Only electrical installations", "All services overlaid with routing agreements", "Building structural details only", "Equipment manufacturer details"],
    correctIndex: 1,
    explanation: "Coordination drawings show all MEP services overlaid on the same drawing with agreed routing, levels, and separation distances. They are the master reference for installation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the typical sequence for MEP installation in a ceiling void?",
    options: [
      "Electrical first, then mechanical, then plumbing",
      "Drainage, then ductwork, then pipework, then electrical",
      "All trades install simultaneously",
      "Plumbing first, then electrical, then mechanical"
    ],
    correctAnswer: 1,
    explanation: "The standard sequence is: 1) Drainage (gravity-fed), 2) Large ductwork, 3) Pipework, 4) Electrical containment, 5) Small services/cabling. This ensures inflexible services are installed first."
  },
  {
    id: 2,
    question: "In BIM clash detection, a 'hard clash' refers to:",
    options: [
      "A difficult negotiation between trades",
      "Physical intersection of two objects",
      "A clash requiring structural changes",
      "Software compatibility issues"
    ],
    correctAnswer: 1,
    explanation: "A hard clash is where two objects physically occupy the same space (e.g., a pipe passing through a duct). Soft clashes relate to clearance, access, or tolerance violations."
  },
  {
    id: 3,
    question: "Why do gravity drainage systems have installation priority?",
    options: [
      "They are most expensive",
      "They cannot be rerouted - require specific gradients",
      "They are installed by the main contractor",
      "Building regulations require it"
    ],
    correctAnswer: 1,
    explanation: "Gravity drainage must maintain specific falls (gradients) to function. Unlike pumped or pressurised systems, the route cannot be altered significantly without affecting performance."
  },
  {
    id: 4,
    question: "What is the purpose of a services coordination meeting?",
    options: [
      "To award subcontracts",
      "To resolve routing conflicts and agree installation sequence",
      "To review health and safety",
      "To approve payment applications"
    ],
    correctAnswer: 1,
    explanation: "Coordination meetings bring all MEP contractors together to resolve clashes, agree routes, confirm installation sequences, and ensure all parties understand the coordination drawings."
  },
  {
    id: 5,
    question: "The minimum clearance typically required for electrical cable tray maintenance access is:",
    options: ["50mm", "100mm", "150mm", "300mm"],
    correctAnswer: 2,
    explanation: "150mm clear space is typically required above cable trays for pulling cables and maintenance access. This 'soft clash' requirement must be coordinated with other services."
  },
  {
    id: 6,
    question: "What does LOD 300 mean in BIM coordination?",
    options: [
      "Level of Detail - basic conceptual model",
      "Level of Development - accurate geometry and quantities",
      "Level of Design - final approved design",
      "Level of Documentation - complete specifications"
    ],
    correctAnswer: 1,
    explanation: "LOD 300 (Level of Development) means model elements are geometrically accurate with specific dimensions and quantities - suitable for coordination and clash detection."
  },
  {
    id: 7,
    question: "When coordinating services in a riser, what principle applies?",
    options: [
      "Largest services go in the centre",
      "Electrical services always go on the left",
      "Services requiring access go to the outside",
      "All services can be positioned anywhere"
    ],
    correctAnswer: 2,
    explanation: "Services requiring regular maintenance access (isolation valves, distribution boards, meters) must be positioned for accessibility, typically towards the riser door opening."
  },
  {
    id: 8,
    question: "A 'soft clash' in BIM coordination typically refers to:",
    options: [
      "Objects that nearly touch",
      "Clearance violations for access or maintenance",
      "Clashes between different software versions",
      "Non-critical aesthetic clashes"
    ],
    correctAnswer: 1,
    explanation: "Soft clashes occur when minimum clearances for access, maintenance, insulation, or operational requirements are violated - the objects don't physically intersect but are too close."
  },
  {
    id: 9,
    question: "What is the purpose of service zone allocation in coordination?",
    options: [
      "To divide the building into contractor areas",
      "To define specific vertical and horizontal zones for each service type",
      "To allocate storage areas for materials",
      "To schedule installation shifts"
    ],
    correctAnswer: 1,
    explanation: "Service zone allocation defines dedicated corridors or layers for each service type (e.g., electrical at high level, pipework at mid-level), preventing ad-hoc routing and clashes."
  },
  {
    id: 10,
    question: "Interface management in MEP coordination ensures:",
    options: [
      "All contractors use the same software",
      "Clear responsibility boundaries between disciplines",
      "Uniform pricing across all trades",
      "Consistent working hours for all trades"
    ],
    correctAnswer: 1,
    explanation: "Interface management defines where one contractor's work ends and another's begins, ensuring no gaps or overlaps in responsibility and clear accountability at connection points."
  },
  {
    id: 11,
    question: "When should BIM clash detection ideally occur?",
    options: [
      "During installation on site",
      "At practical completion",
      "During design development before construction",
      "Only when problems are reported"
    ],
    correctAnswer: 2,
    explanation: "Clash detection should occur during design development (RIBA Stage 4) when changes are cheap to make. Discovering clashes on site causes delays and cost overruns."
  },
  {
    id: 12,
    question: "What colour coding is typically used for electrical services on coordination drawings?",
    options: [
      "Red",
      "Blue",
      "Green",
      "Orange or Yellow"
    ],
    correctAnswer: 3,
    explanation: "Electrical services are typically shown in orange or yellow on coordination drawings. Blue is usually HVAC/ductwork, green is pipework/plumbing, and red is fire services."
  }
];

const faqs = [
  {
    question: "What is the role of the MEP coordinator?",
    answer: "The MEP coordinator manages the interface between mechanical, electrical, and plumbing contractors. They run coordination meetings, maintain the combined services model, manage clash detection, produce coordination drawings, and ensure all parties follow the agreed installation sequence. On large projects, this is often a dedicated role; on smaller projects, it may be part of the M&E contractor's responsibilities."
  },
  {
    question: "How are coordination clashes typically resolved?",
    answer: "Clashes are resolved through a hierarchy: 1) Gravity services (drainage) have priority - reroute everything else. 2) Large ductwork is difficult to reroute - adjust smaller services. 3) Structural penetrations are fixed - services must fit. 4) Aesthetic requirements (ceiling heights) constrain vertical space. 5) Remaining conflicts are resolved by negotiation at coordination meetings, typically with the latest installer making adjustments."
  },
  {
    question: "What information should be on a coordination drawing?",
    answer: "Coordination drawings should show: all services with agreed routes, levels (typically as offsets from finished floor level), service zone boundaries, penetration locations through structure, clearances maintained, interface points between contractors, installation sequence notes, and cross-references to specification clauses. They should be signed off by all relevant trades."
  },
  {
    question: "Why can't all services be coordinated using 2D drawings alone?",
    answer: "Complex buildings have services running at multiple levels and crossing in three dimensions. 2D drawings show plan or section views but cannot easily represent all interactions. BIM allows all services to be modelled in 3D, with automated clash detection finding conflicts that would be missed on 2D overlays. This is especially important in congested areas like plant rooms and risers."
  },
  {
    question: "What happens when a clash is discovered during installation?",
    answer: "On-site clashes require immediate resolution through the site coordination process. Options include: rerouting one service, adjusting levels, creating new penetrations, or redesigning sections. All changes must be recorded on as-built drawings. On-site clashes are expensive - they cause delays, rework, and may require removing installed work. This is why pre-construction coordination is so important."
  },
  {
    question: "How does building handover relate to coordination?",
    answer: "At handover, the coordination drawings become as-built records showing actual installed positions. O&M manuals must reference these for future maintenance access. Poor coordination during construction leads to services installed in non-coordinated positions, making future maintenance difficult and increasing building operational costs."
  }
];

const HNCModule5Section1_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section1">
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
            <span>Module 5.1.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Building Services Coordination
          </h1>
          <p className="text-white/80">
            MEP sequencing, interface management, clash detection, and installation priorities for complex building services
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>MEP:</strong> Mechanical, Electrical, and Plumbing coordination</li>
              <li className="pl-1"><strong>Clash detection:</strong> BIM identifies conflicts before installation</li>
              <li className="pl-1"><strong>Priority rule:</strong> Gravity services first, then large ducts, then rest</li>
              <li className="pl-1"><strong>Coordination drawings:</strong> Master reference for all trades</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Service zones:</strong> Dedicated layers for each trade</li>
              <li className="pl-1"><strong>Interface points:</strong> Clear handover between disciplines</li>
              <li className="pl-1"><strong>Access clearances:</strong> 150mm minimum for maintenance</li>
              <li className="pl-1"><strong>Riser planning:</strong> Accessibility for isolation and meters</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the MEP coordination process and its importance",
              "Apply BIM clash detection to identify service conflicts",
              "Determine correct installation sequencing for multiple trades",
              "Interpret and produce coordination drawings",
              "Manage interfaces between building services disciplines",
              "Apply service priority rules in ceiling voids and risers"
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
              Building services coordination is the process of ensuring that mechanical, electrical, and plumbing
              (MEP) systems can be installed without physical conflicts, while maintaining required access for
              operation and maintenance. Poor coordination is one of the largest causes of construction delays
              and cost overruns in modern buildings.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The MEP coordination challenge:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Multiple disciplines:</strong> Electrical, HVAC, plumbing, fire, data, security all compete for space</li>
                <li className="pl-1"><strong>Limited zones:</strong> Ceiling voids, risers, and service corridors have finite space</li>
                <li className="pl-1"><strong>Different contractors:</strong> Each trade designs independently then must integrate</li>
                <li className="pl-1"><strong>Timing conflicts:</strong> Installation sequences must be carefully planned</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Building Services in a Commercial Building</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Discipline</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Services</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Space Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Mechanical</td>
                      <td className="border border-white/10 px-3 py-2">Ductwork, pipework, plant</td>
                      <td className="border border-white/10 px-3 py-2">Largest - up to 600mm ducts</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Electrical</td>
                      <td className="border border-white/10 px-3 py-2">Containment, busbar, lighting</td>
                      <td className="border border-white/10 px-3 py-2">Medium - typically 50-150mm trays</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Plumbing</td>
                      <td className="border border-white/10 px-3 py-2">Drainage, water, gas</td>
                      <td className="border border-white/10 px-3 py-2">Variable - drainage needs falls</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire</td>
                      <td className="border border-white/10 px-3 py-2">Sprinklers, detection, alarms</td>
                      <td className="border border-white/10 px-3 py-2">Sprinkler heads need ceiling access</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data/Comms</td>
                      <td className="border border-white/10 px-3 py-2">Structured cabling, containment</td>
                      <td className="border border-white/10 px-3 py-2">Separation from power required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Security</td>
                      <td className="border border-white/10 px-3 py-2">CCTV, access control cabling</td>
                      <td className="border border-white/10 px-3 py-2">Small - typically shares data routes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key principle:</strong> Coordination is not about finding space for services - it's about ensuring all services can be installed, operated, and maintained throughout the building's life.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: BIM Clash Detection */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            BIM Clash Detection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building Information Modelling (BIM) has revolutionised services coordination. By creating 3D digital
              models of all services, software can automatically detect where elements would physically clash,
              allowing resolution during design rather than expensive on-site modifications.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Hard Clashes</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Physical intersection of objects</li>
                  <li className="pl-1">Pipe passing through ductwork</li>
                  <li className="pl-1">Cable tray through structural beam</li>
                  <li className="pl-1">Must be resolved - cannot install</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Soft Clashes</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Clearance or tolerance violations</li>
                  <li className="pl-1">Insufficient maintenance access</li>
                  <li className="pl-1">Insulation thickness conflicts</li>
                  <li className="pl-1">Important for long-term operation</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BIM Level of Development (LOD) for Coordination</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">LOD</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Suitable For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LOD 100</td>
                      <td className="border border-white/10 px-3 py-2">Conceptual - approximate location</td>
                      <td className="border border-white/10 px-3 py-2">Early feasibility studies</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LOD 200</td>
                      <td className="border border-white/10 px-3 py-2">Approximate geometry and size</td>
                      <td className="border border-white/10 px-3 py-2">Scheme design spatial planning</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LOD 300</td>
                      <td className="border border-white/10 px-3 py-2">Accurate geometry and quantities</td>
                      <td className="border border-white/10 px-3 py-2">Clash detection and coordination</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LOD 350</td>
                      <td className="border border-white/10 px-3 py-2">Includes interface connections</td>
                      <td className="border border-white/10 px-3 py-2">Detailed coordination</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LOD 400</td>
                      <td className="border border-white/10 px-3 py-2">Fabrication detail</td>
                      <td className="border border-white/10 px-3 py-2">Manufacture and installation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Common Clash Detection Errors to Avoid</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Running detection at wrong LOD - false clashes from inaccurate models</li>
                <li className="pl-1">Ignoring soft clashes - causes maintenance problems later</li>
                <li className="pl-1">Not including insulation thickness in model</li>
                <li className="pl-1">Missing structural penetration sleeves and builders work</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Run clash detection weekly during detailed design. Resolve all hard clashes before issuing for construction.
            </p>
          </div>
        </section>

        {/* Section 3: Installation Sequencing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Installation Sequencing and Priorities
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Installation sequence is critical for efficient MEP coordination. The fundamental rule is that
              inflexible services must be installed first, with more flexible services working around them.
              Getting the sequence wrong leads to costly rework and delays.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Ceiling Void Installation Sequence</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Drainage (gravity-fed)</strong> - Cannot be rerouted, requires specific falls</li>
                <li className="pl-1"><strong>Large ductwork (main supply/extract)</strong> - Inflexible due to size</li>
                <li className="pl-1"><strong>Sprinkler mains and branches</strong> - Needs ceiling penetration positions</li>
                <li className="pl-1"><strong>Pipework (heating/chilled water)</strong> - Can route around fixed services</li>
                <li className="pl-1"><strong>Electrical containment (main trays)</strong> - Flexible routing possible</li>
                <li className="pl-1"><strong>Small ductwork (FCU connections)</strong> - Final HVAC connections</li>
                <li className="pl-1"><strong>Data/comms containment</strong> - Needs separation from power</li>
                <li className="pl-1"><strong>Final fix (cables, sensors, diffusers)</strong> - After ceiling grid</li>
              </ol>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Service Priority Rules</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Priority</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Service Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1 (Highest)</td>
                      <td className="border border-white/10 px-3 py-2">Gravity drainage</td>
                      <td className="border border-white/10 px-3 py-2">Fixed falls - cannot be rerouted</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">Large ductwork (&gt;400mm)</td>
                      <td className="border border-white/10 px-3 py-2">Size makes rerouting impractical</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3</td>
                      <td className="border border-white/10 px-3 py-2">Sprinkler systems</td>
                      <td className="border border-white/10 px-3 py-2">Fixed head positions to ceiling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">Pipework</td>
                      <td className="border border-white/10 px-3 py-2">Some flexibility with offsets</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2">Electrical containment</td>
                      <td className="border border-white/10 px-3 py-2">Highly flexible routing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">6 (Lowest)</td>
                      <td className="border border-white/10 px-3 py-2">Data/security cabling</td>
                      <td className="border border-white/10 px-3 py-2">Most flexible - last to install</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Real-World Example: Hospital Corridor</p>
              <div className="p-3 rounded bg-white/5">
                <p className="text-sm text-white/80 mb-2">
                  A hospital corridor has 600mm ceiling void depth. Services required:
                </p>
                <ul className="text-sm text-white space-y-1">
                  <li>100mm soil pipe with 1:40 fall (100mm + fall = ~150mm zone)</li>
                  <li>400mm x 300mm supply duct</li>
                  <li>Sprinkler pipework (50mm diameter)</li>
                  <li>Medical gas pipework (22mm copper)</li>
                  <li>Electrical containment (150mm tray)</li>
                  <li>Data cabling (basket tray)</li>
                </ul>
                <p className="text-sm text-white/80 mt-2">
                  <strong>Solution:</strong> Soil pipe at highest level (for fall), duct below, sprinkler/pipework mid-level, electrical low level with data below. Cross-overs coordinated at specific points.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The contractor who installs last often makes the most adjustments. Ensure your installation slot in the programme reflects your service priority.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Coordination Drawings and Interface Management */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Coordination Drawings and Interface Management
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Coordination drawings are the definitive record of agreed service routes. They combine all MEP
              services on single drawings showing how conflicts have been resolved. Interface management ensures
              clear responsibility boundaries between contractors at connection points.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coordination Drawing Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Combined plans:</strong> All services overlaid with clear identification</li>
                <li className="pl-1"><strong>Service levels:</strong> Heights shown as offsets from FFL (e.g., +2850 to soffit)</li>
                <li className="pl-1"><strong>Cross-sections:</strong> Critical congested areas shown in section</li>
                <li className="pl-1"><strong>Colour coding:</strong> Orange = electrical, blue = HVAC, green = pipework, red = fire</li>
                <li className="pl-1"><strong>Service zones:</strong> Defined corridors for each service type</li>
                <li className="pl-1"><strong>Sign-off boxes:</strong> All relevant trades to approve</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Service Zone Allocation Example</p>
              <div className="font-mono text-xs text-white/90 bg-black/30 p-3 rounded">
                <p>Ceiling void depth: 600mm (FFL +3000 to structure +3600)</p>
                <p className="mt-2">Zone allocation (from structure down):</p>
                <p>+3600 to +3450: Drainage zone (150mm)</p>
                <p>+3450 to +3150: Ductwork zone (300mm)</p>
                <p>+3150 to +3050: Pipework zone (100mm)</p>
                <p>+3050 to +3000: Electrical/data zone (50mm + ceiling)</p>
                <p className="mt-2 text-elec-yellow/80">Cross-overs only at designated points</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Interface Management Matrix</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Interface Point</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Responsibility A</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Responsibility B</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">FCU electrical connection</td>
                      <td className="border border-white/10 px-3 py-2">Electrical: cable to isolator</td>
                      <td className="border border-white/10 px-3 py-2">Mechanical: isolator to FCU</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Distribution board supply</td>
                      <td className="border border-white/10 px-3 py-2">Electrical: supply cable</td>
                      <td className="border border-white/10 px-3 py-2">Mechanical: builder's work box</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Fire alarm detector</td>
                      <td className="border border-white/10 px-3 py-2">Fire: detector and cable</td>
                      <td className="border border-white/10 px-3 py-2">Ceiling: access provision</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BMS sensor</td>
                      <td className="border border-white/10 px-3 py-2">Controls: sensor and cable</td>
                      <td className="border border-white/10 px-3 py-2">Mechanical: duct penetration</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Coordination Meeting Process</p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Review:</strong> Examine clash report from latest BIM coordination</li>
                <li className="pl-1"><strong>Resolve:</strong> Agree solutions for each clash with responsible party</li>
                <li className="pl-1"><strong>Update:</strong> All parties update their models to reflect agreements</li>
                <li className="pl-1"><strong>Verify:</strong> Re-run clash detection to confirm resolution</li>
                <li className="pl-1"><strong>Issue:</strong> Publish updated coordination drawings</li>
                <li className="pl-1"><strong>Record:</strong> Document decisions in meeting minutes</li>
              </ol>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Documentation tip:</strong> All coordination decisions must be recorded. If it's not documented, it didn't happen - and will likely cause disputes later.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Ceiling Void Clash Resolution</h3>
              <p className="text-sm text-white mb-2">
                <strong>Problem:</strong> A 450mm supply duct clashes with a 150mm electrical cable tray at the same level (+3200).
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Priority assessment:</p>
                <p>- Ductwork: Priority 2 (large, inflexible)</p>
                <p>- Cable tray: Priority 5 (flexible routing)</p>
                <p className="mt-2">Resolution:</p>
                <p>1. Duct maintains level at +3200</p>
                <p>2. Cable tray drops to +3050 for 2m either side of crossing</p>
                <p>3. Transition pieces at drop points</p>
                <p className="mt-2 text-green-400">Result: Electrical contractor makes adjustment</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Riser Coordination</h3>
              <p className="text-sm text-white mb-2">
                <strong>Problem:</strong> 2m x 1.5m electrical riser must accommodate main cables, distribution boards, and metering.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Access requirements:</p>
                <p>- Distribution boards: 750mm clear working space (BS 7671)</p>
                <p>- Meters: visible and accessible from door</p>
                <p>- Main cables: pulling access at each floor</p>
                <p className="mt-2">Layout solution:</p>
                <p>- Boards on wall opposite door (access from doorway)</p>
                <p>- Meters adjacent to door on side wall</p>
                <p>- Cable ladder on wall beside boards</p>
                <p>- Fire stopping at each floor penetration</p>
                <p className="mt-2 text-green-400">Key: Accessibility drives layout, not just space</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Plant Room Installation Sequence</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Plan installation sequence for a basement plant room with chillers, pumps, switchgear, and controls.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Week 1-2: Builder's work complete (plinths, penetrations)</p>
                <p>Week 3-4: Major plant delivery (chillers, AHUs)</p>
                <p>Week 5-6: Pipework first fix (headers, main runs)</p>
                <p>Week 7-8: Ductwork connections to plant</p>
                <p>Week 9-10: Electrical containment and main cables</p>
                <p>Week 11-12: Switchgear installation and terminations</p>
                <p>Week 13-14: Controls wiring and BMS</p>
                <p>Week 15-16: Commissioning preparation</p>
                <p className="mt-2 text-elec-yellow/80">Critical: Switchgear energised before mechanical commissioning</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Coordination Checklist for Electrical Contractors</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Attend all coordination meetings - decisions made without you affect you</li>
                <li className="pl-1">Provide accurate 3D models at correct LOD for clash detection</li>
                <li className="pl-1">Include cable tray with cables, not empty containment</li>
                <li className="pl-1">Show 150mm access clearance above containment</li>
                <li className="pl-1">Mark distribution board locations early - they drive containment routes</li>
                <li className="pl-1">Coordinate ceiling penetrations with ceiling contractor</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Maintenance access clearance: <strong>150mm minimum</strong></li>
                <li className="pl-1">Working space at distribution boards: <strong>750mm</strong></li>
                <li className="pl-1">BIM LOD for coordination: <strong>LOD 300 minimum</strong></li>
                <li className="pl-1">Drainage fall: <strong>1:40 to 1:80</strong> (25-12.5mm per metre)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Not attending coordination meetings</strong> - Decisions are made; your work gets rerouted</li>
                <li className="pl-1"><strong>Installing before coordination is complete</strong> - Expensive rework</li>
                <li className="pl-1"><strong>Ignoring soft clashes</strong> - Creates maintenance problems for building life</li>
                <li className="pl-1"><strong>Not documenting changes</strong> - Leads to payment disputes and as-built errors</li>
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
                <p className="font-medium text-white mb-1">Installation Priority Order</p>
                <ul className="space-y-0.5">
                  <li>1. Gravity drainage (fixed falls)</li>
                  <li>2. Large ductwork (&gt;400mm)</li>
                  <li>3. Sprinkler systems</li>
                  <li>4. Pipework (heating/cooling)</li>
                  <li>5. Electrical containment</li>
                  <li>6. Data/comms cabling</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Coordination Drawing Colours</p>
                <ul className="space-y-0.5">
                  <li>Orange/Yellow - Electrical services</li>
                  <li>Blue - HVAC/ductwork</li>
                  <li>Green - Pipework/plumbing</li>
                  <li>Red - Fire services</li>
                  <li>Purple - Data/communications</li>
                  <li>Grey - Structure reference</li>
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
            <Link to="../h-n-c-module5-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module5-section1-7">
              Next: Quality Management
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule5Section1_6;
