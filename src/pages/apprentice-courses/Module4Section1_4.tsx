import { ArrowLeft, ArrowRight, Calendar, Users, Clock, Eye, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const Module4Section1_4 = () => {
  useSEO(
    "Planning Workflow and Sequencing Tasks | Level 2 Electrical",
    "Learn effective workflow planning and task sequencing for electrical installations to maximise efficiency, safety, and coordination."
  );

  // Quiz (end of page)
  const quizQuestions = [
    {
      id: 1,
      question: "Which of the following best describes 'second fix'?",
      options: ["Installing containment systems", "Routing cables", "Installing sockets and switches", "Reviewing drawings"],
      correctAnswer: 2,
      explanation: "Second fix involves installing and connecting accessories like sockets, switches, and light fittings after first fix containment and cables are in place.",
    },
    {
      id: 2,
      question: "True or False: Workflow planning is only necessary on large commercial jobs.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False – workflow planning applies to all projects regardless of size. Even small domestic jobs benefit from proper sequencing and coordination.",
    },
    {
      id: 3,
      question: "Name one reason to sequence high-level work before low-level work.",
      options: ["It's easier to see", "Prevents obstruction and rework", "Materials cost less", "Reduces testing time"],
      correctAnswer: 1,
      explanation: "High-level work should be done first to prevent obstruction of access and avoid potential damage to completed low-level work.",
    },
    {
      id: 4,
      question: "What is a 'critical path task'?",
      options: ["The most dangerous task", "A task that determines the project completion date", "The most expensive task", "A task requiring special skills"],
      correctAnswer: 1,
      explanation: "Critical path tasks are activities that directly determine the project completion date - any delay in these tasks delays the entire project.",
    },
    {
      id: 5,
      question: "Give one example of a task dependency.",
      options: ["All tasks are independent", "You can't terminate cables until devices are mounted", "Tasks can be done in any order", "Only materials create dependencies"],
      correctAnswer: 1,
      explanation: "You cannot terminate cables until devices are mounted - this is a classic example of task dependency where one task must be completed before another can begin.",
    },
    {
      id: 6,
      question: "Name one planning tool used in electrical installation projects.",
      options: ["Only verbal communication", "Gantt charts or daily task sheets", "No planning tools needed", "Only experience matters"],
      correctAnswer: 1,
      explanation: "Gantt charts, daily task sheets, and work programmes are essential planning tools for managing electrical installation projects effectively.",
    },
    {
      id: 7,
      question: "Why is it risky to work in areas undergoing wet trades?",
      options: ["It's too cold", "Risk of damage from moisture or debris", "It takes longer", "Tools get dirty"],
      correctAnswer: 1,
      explanation: "Working in areas with wet trades (plastering, painting) risks damage to electrical equipment from moisture, chemicals, and debris.",
    },
    {
      id: 8,
      question: "What should be done when workflow changes mid-project?",
      options: ["Ignore the changes", "Risk-assess and communicate changes", "Stop work completely", "Only inform the client"],
      correctAnswer: 1,
      explanation: "Workflow changes must be properly risk-assessed for safety implications and communicated to all relevant parties to maintain coordination.",
    },
  ];

  // Inline knowledge checks
  const quickChecks = [
    {
      id: "workflow-check",
      question: "What is meant by 'first fix' in electrical installation?",
      options: ["Testing the installation", "Installing containment systems and routing cables", "Connecting accessories", "Final inspection"],
      correctIndex: 1,
      explanation: "First fix involves installing containment systems, routing cables, and fixing back boxes - the structural elements before accessories are connected.",
    },
    {
      id: "coordination-check",
      question: "Why is coordination with other trades important?",
      options: ["It's not necessary", "To prevent clashes, damage, and ensure efficient use of shared resources", "Only for large projects", "Just for scheduling"],
      correctIndex: 1,
      explanation: "Coordination prevents trade clashes, equipment damage, ensures efficient use of scaffolding/lifts, and maintains overall project flow.",
    },
    {
      id: "planning-check",
      question: "Name one tool used for project scheduling.",
      options: ["Only experience", "Gantt charts", "No tools needed", "Just verbal communication"],
      correctIndex: 1,
      explanation: "Gantt charts provide visual timelines showing task sequences, dependencies, and critical path activities for effective project scheduling.",
    },
  ];

  const workflowPhases = [
    {
      phase: "Pre-Installation Planning",
      description: "Essential groundwork before any physical installation begins",
      activities: "Site surveys, drawing reviews, material ordering, risk assessments, method statements, permit applications",
      timeframe: "1-3 weeks before start",
      keyOutputs: "Installation programme, material delivery schedule, risk assessments, permits",
      commonIssues: "Incomplete surveys, late material deliveries, missing permits, inadequate risk assessment"
    },
    {
      phase: "First Fix Installation", 
      description: "Structural electrical work including containment and cable installation",
      activities: "Installing containment systems, routing cables, fixing back boxes, earthing systems, cable pulling",
      timeframe: "40-60% of installation time",
      keyOutputs: "Complete containment system, routed cables, earthing network, first fix inspection",
      commonIssues: "Containment clashes, cable damage, inadequate earthing, poor cable management"
    },
    {
      phase: "Second Fix Installation",
      description: "Connecting accessories and completing the electrical installation",
      activities: "Installing switches, sockets, light fittings, connecting circuits, labelling, initial testing",
      timeframe: "25-35% of installation time", 
      keyOutputs: "Functional circuits, connected accessories, circuit labelling, preliminary test results",
      commonIssues: "Damaged accessories, incorrect connections, missing neutrals, labelling errors"
    },
    {
      phase: "Testing and Commissioning",
      description: "Verification of safety, functionality, and compliance",
      activities: "Full electrical testing, fault rectification, system commissioning, documentation, handover",
      timeframe: "10-15% of installation time",
      keyOutputs: "Test certificates, operation manuals, as-built drawings, handover documentation",
      commonIssues: "Test failures, missing documentation, incomplete commissioning, poor handover"
    },
  ];

  const sequencingPrinciples = [
    {
      principle: "Follow Natural Build Sequence",
      description: "Align electrical work with overall construction programme",
      rationale: "Prevents obstruction, damage, and rework by following logical construction order",
      examples: "High-level work before low-level, containment before cables, structure before finishes",
      benefits: "Reduced conflicts, improved access, minimised damage risk, efficient resource use"
    },
    {
      principle: "Containment Before Cables",
      description: "Complete all containment systems before pulling any cables",
      rationale: "Ensures proper cable support, protection, and compliance with installation standards", 
      examples: "All conduit runs complete before cable pulling, trunking lids fitted, cable tray earthed",
      benefits: "Proper cable support, reduced damage risk, easier cable pulling, compliance assured"
    },
    {
      principle: "High-Level Before Low-Level",
      description: "Complete overhead and high-level work before floor-level installations",
      rationale: "Prevents obstruction of access equipment and protects completed low-level work",
      examples: "Ceiling containment before floor boxes, lighting before socket circuits, overhead cables first",
      benefits: "Maintained access, protection of completed work, reduced double-handling of equipment"
    },
    {
      principle: "Disruptive Tasks in Quiet Periods",
      description: "Schedule noisy or disruptive activities during appropriate times",
      rationale: "Minimises disruption to occupied buildings and maintains good site relations",
      examples: "Core drilling out of hours, generator testing during breaks, noisy installations when unoccupied",
      benefits: "Reduced complaints, maintained productivity, better site relationships, compliance with restrictions"
    },
  ];

  const coordinationAspects = [
    {
      trade: "Building/Construction",
      activities: "Structural work, masonry, concrete pours, steelwork",
      coordinationNeeds: "Opening schedules, embed requirements, access coordination, protection measures",
      riskAreas: "Damage to electrical work, missed openings, incorrect embeds, access conflicts",
      bestPractices: "Early engagement, clear specifications, protection protocols, joint inspections"
    },
    {
      trade: "Plumbing/Mechanical",
      activities: "Pipework installation, heating systems, ventilation, drainage",
      coordinationNeeds: "Route coordination, shared penetrations, equipment connections, controls integration",
      riskAreas: "Pipe/cable clashes, water damage to electrical, shared space conflicts, incompatible systems",
      bestPractices: "3D coordination, clash detection, joint routing, shared installation protocols"
    },
    {
      trade: "HVAC Systems",
      activities: "Ductwork, air handling units, controls, ventilation systems",
      coordinationNeeds: "Power supplies, control wiring, shared ceiling space, equipment coordination",
      riskAreas: "Insufficient power provision, control conflicts, space clashes, commissioning dependencies",
      bestPractices: "Integrated design, power schedules, control protocols, joint commissioning"
    },
    {
      trade: "Wet Trades (Plastering/Painting)",
      activities: "Wall finishes, decorative work, protective coatings, floor finishes",
      coordinationNeeds: "Protection requirements, access timing, cure periods, final fix timing",
      riskAreas: "Moisture damage, chemical contamination, finish damage, access prevention",
      bestPractices: "Phased completion, protection measures, timing agreements, quality protocols"
    },
  ];

  const planningTools = [
    {
      tool: "Gantt Charts",
      purpose: "Visual timeline showing task sequences, dependencies, and critical path",
      applications: "Overall project scheduling, resource planning, progress monitoring, dependency tracking",
      advantages: "Clear visual representation, dependency mapping, progress tracking, resource allocation",
      limitations: "Can become complex, requires regular updates, may not show detailed dependencies",
      bestUse: "Project overview, client communication, progress reporting, resource planning"
    },
    {
      tool: "Daily Task Sheets",
      purpose: "Detailed daily work planning and progress tracking for individual teams",
      applications: "Daily work allocation, skill matching, progress recording, issue identification", 
      advantages: "Detailed control, immediate feedback, skill development, accountability",
      limitations: "Daily management overhead, may miss bigger picture, admin intensive",
      bestUse: "Team management, skill development, detailed progress tracking, quality control"
    },
    {
      tool: "Work Permits/Risk Assessments",
      purpose: "Safety control for high-risk or restricted activities",
      applications: "Hot work, confined spaces, live electrical work, working at height",
      advantages: "Safety assurance, legal compliance, risk mitigation, clear procedures",
      limitations: "Administrative burden, can slow progress, requires training",
      bestUse: "High-risk activities, legal compliance, safety culture, accident prevention"
    },
    {
      tool: "Look-Ahead Schedules",
      purpose: "3-6 week forward planning to anticipate needs and issues",
      applications: "Resource planning, material ordering, coordination meetings, problem solving",
      advantages: "Proactive planning, early problem identification, resource optimisation, coordination",
      limitations: "Requires discipline, may change frequently, prediction challenges",
      bestUse: "Resource planning, coordination, problem prevention, efficiency improvement"
    },
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4.1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg ">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
              Section 4.1.4
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Planning Workflow and Sequencing Tasks
          </h1>
          <p className="text-white">
            Master effective workflow planning and task sequencing for electrical installations to maximise efficiency and safety.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Follow natural build sequence: high-level before low-level work.</li>
                <li>Coordinate with other trades to prevent clashes and share resources.</li>
                <li>Use planning tools like Gantt charts and daily task sheets.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-elec-yellow/10 border-l-4 border-l-elec-yellow border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Task dependencies, trade clashes, critical path activities.</li>
                <li><strong>Use:</strong> Logical sequencing, coordination meetings, planning tools.</li>
                <li><strong>Check:</strong> Dependencies met, resources available, safety requirements.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Learning outcomes</h2>
          <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-white">
            <li>Break down an installation into logical, manageable stages.</li>
            <li>Sequence tasks to maximise efficiency and safety.</li>
            <li>Coordinate with other site activities and trades.</li>
            <li>Identify critical path tasks and dependencies.</li>
            <li>Adapt workflow to address unforeseen issues without compromising safety or quality.</li>
          </ul>
        </Card>

        {/* Content */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Content</h2>

          {/* Understanding Workflow */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4">Understanding Workflow in Electrical Installations</h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Electrical installations follow a logical sequence of phases, each with specific activities, 
              timeframes, and dependencies. Understanding this workflow is crucial for effective planning.
            </p>
            
            <div className="space-y-4">
              {workflowPhases.map((phase, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-elec-yellow ">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-elec-yellow dark:text-elec-yellow mb-1">{phase.phase}</p>
                      <p className="text-xs sm:text-sm text-white mb-2">{phase.description}</p>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border mb-2">
                        <strong>Activities:</strong> {phase.activities}
                      </div>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border mb-2">
                        <strong>Typical timeframe:</strong> {phase.timeframe}
                      </div>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border mb-2">
                        <strong>Key outputs:</strong> {phase.keyOutputs}
                      </div>
                      <div className="text-xs text-white bg-[#121212]/30 p-2 rounded border border-red-300 dark:border-red-700">
                        <strong>Common issues:</strong> {phase.commonIssues}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-transparent border border-border/30 rounded-lg">
              <p className="text-sm font-medium text-white mb-1">Workflow Success Factors</p>
              <p className="text-xs text-white">
                Clear phase boundaries, adequate resources for each phase, proper handover procedures, 
                quality gates between phases, and flexibility to adapt to changing conditions.
              </p>
            </div>
          </section>

          <InlineCheck {...quickChecks[0]} />
          <Separator className="my-6" />

          {/* Task Sequencing */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" /> Task Sequencing Principles
            </h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Effective task sequencing prevents conflicts, reduces rework, and maximises productivity 
              by following logical construction principles and maintaining safety.
            </p>
            
            <div className="space-y-4">
              {sequencingPrinciples.map((principle, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-green-600 dark:text-green-400 mb-1">{principle.principle}</p>
                      <p className="text-xs sm:text-sm text-white mb-2">{principle.description}</p>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border mb-2">
                        <strong>Rationale:</strong> {principle.rationale}
                      </div>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border mb-2">
                        <strong>Examples:</strong> {principle.examples}
                      </div>
                      <div className="text-xs text-white bg-[#121212]/30 p-2 rounded border border-green-300 dark:border-green-700">
                        <strong>Benefits:</strong> {principle.benefits}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-transparent border border-green-400/30 rounded-lg">
              <p className="text-sm font-medium text-white mb-1">Sequencing Flexibility</p>
              <p className="text-xs text-white">
                While following principles is important, maintain flexibility to adapt to site conditions, 
                weather, material availability, and coordination requirements. Always prioritise safety.
              </p>
            </div>
          </section>

          <InlineCheck {...quickChecks[1]} />
          <Separator className="my-6" />

          {/* Coordination with Other Trades */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" /> Coordination with Other Trades
            </h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Successful electrical installations require effective coordination with multiple trades. 
              Poor coordination leads to clashes, delays, damage, and cost overruns.
            </p>
            
            <div className="space-y-4">
              {coordinationAspects.map((aspect, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-purple-600 dark:text-elec-yellow mb-1">{aspect.trade}</p>
                      <p className="text-xs sm:text-sm text-white mb-2"><strong>Activities:</strong> {aspect.activities}</p>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border mb-2">
                        <strong>Coordination needs:</strong> {aspect.coordinationNeeds}
                      </div>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border mb-2">
                        <strong>Risk areas:</strong> {aspect.riskAreas}
                      </div>
                      <div className="text-xs text-white bg-[#121212]/30 p-2 rounded border border-purple-300 dark:border-purple-700">
                        <strong>Best practices:</strong> {aspect.bestPractices}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-transparent border border-border/30 rounded-lg">
              <p className="text-sm font-medium text-white mb-1">Coordination Success Factors</p>
              <p className="text-xs text-white">
                Regular coordination meetings, shared project schedules, clear communication protocols, 
                3D modelling for clash detection, and mutual respect between trades.
              </p>
            </div>
          </section>

          <InlineCheck {...quickChecks[2]} />
          <Separator className="my-6" />

          {/* Planning Tools */}
          <section className="mb-6">
            <h3 className="font-medium text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" /> Planning Tools and Techniques
            </h3>
            <p className="text-xs sm:text-sm text-white mb-4">
              Effective planning requires appropriate tools and techniques to visualise, track, and 
              manage complex electrical installation projects.
            </p>
            
            <div className="space-y-4">
              {planningTools.map((tool, i) => (
                <div key={i} className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-orange-600 dark:text-elec-yellow mb-1">{tool.tool}</p>
                      <p className="text-xs sm:text-sm text-white mb-2">{tool.purpose}</p>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border mb-2">
                        <strong>Applications:</strong> {tool.applications}
                      </div>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border mb-2">
                        <strong>Advantages:</strong> {tool.advantages}
                      </div>
                      <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border mb-2">
                        <strong>Limitations:</strong> {tool.limitations}
                      </div>
                      <div className="text-xs text-white bg-[#121212]/30 p-2 rounded border border-orange-300 dark:border-orange-700">
                        <strong>Best use:</strong> {tool.bestUse}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-transparent border border-border/30 rounded-lg">
              <p className="text-sm font-medium text-white mb-1">Tool Selection Strategy</p>
              <p className="text-xs text-white">
                Choose tools appropriate to project complexity, team size, and client requirements. 
                Simple projects may only need basic scheduling, while complex projects require sophisticated planning tools.
              </p>
            </div>
          </section>
        </Card>

        {/* Real-world examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Real-World Examples
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-transparent border border-border/30 rounded-lg border-l-4 border-l-red-500">
              <h4 className="font-medium text-white mb-2">Case Study 1: Poor Sequencing Consequences</h4>
              <p className="text-xs sm:text-sm text-white mb-3">
                An electrician installed floor trunking before the concrete pour date was confirmed. 
                During the concrete pour, the trunking was damaged by the concrete contractor's equipment 
                and had to be completely removed and reinstalled, costing an additional £3,000 in labour 
                and materials plus a 2-week project delay.
              </p>
              <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                <strong>Lesson:</strong> Always confirm sequencing with other trades before proceeding. 
                Floor installations should be coordinated with concrete contractors to ensure proper timing and protection.
              </div>
            </div>

            <div className="p-4 bg-transparent border border-border/30 rounded-lg border-l-4 border-l-red-500">
              <h4 className="font-medium text-white mb-2">Case Study 2: Trade Coordination Failure</h4>
              <p className="text-xs sm:text-sm text-white mb-3">
                A major office refurbishment suffered 6 weeks delay when electrical and HVAC contractors 
                both claimed the same ceiling space. Neither had coordinated routes, resulting in 
                impossible installation conflicts that required complete redesign and rework.
              </p>
              <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                <strong>Lesson:</strong> 3D coordination and regular trade meetings are essential. 
                The £50,000 delay cost far exceeded the investment needed for proper coordination.
              </div>
            </div>

            <div className="p-4 bg-transparent border border-border/30 rounded-lg border-l-4 border-l-red-500">
              <h4 className="font-medium text-white mb-2">Case Study 3: Critical Path Mismanagement</h4>
              <p className="text-xs sm:text-sm text-white mb-3">
                A hospital project was delayed 3 months because electrical testing was on the critical path 
                but insufficient test equipment was allocated. Testing became the bottleneck, preventing 
                handover and costing £500,000 in liquidated damages.
              </p>
              <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                <strong>Lesson:</strong> Critical path activities must have adequate resources and contingency plans. 
                Testing requirements should be planned early with sufficient equipment and personnel.
              </div>
            </div>

            <div className="p-4 bg-transparent border border-green-400/30 rounded-lg border-l-4 border-l-green-500">
              <h4 className="font-medium text-white mb-2">Success Story: Effective Workflow Planning</h4>
              <p className="text-xs sm:text-sm text-white mb-3">
                A data centre project used detailed Gantt charts, weekly coordination meetings, and 
                look-ahead scheduling to complete 3 weeks early. Excellent coordination allowed trades 
                to work efficiently without conflicts, materials arrived just-in-time, and quality was excellent.
              </p>
              <div className="text-xs text-white bg-[#121212]/50 p-2 rounded border">
                <strong>Result:</strong> Early completion bonus of £100,000, excellent client relationships, 
                and follow-on contracts worth £2M. Good planning pays for itself many times over.
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-8 p-6 ">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="text-white space-y-6">
            <div>
              <h4 className="font-medium mb-2">Q: Can sequencing change once work begins?</h4>
              <p className="text-sm text-white/90 mb-2">
                A: Yes – sequencing should be adaptable to changing site conditions, but changes 
                must be properly risk-assessed and communicated to all stakeholders.
              </p>
              <p className="text-xs text-white/80">
                Document all changes, assess safety implications, update all affected parties, 
                and ensure resources remain available for the revised sequence.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Q: What happens if critical path tasks are delayed?</h4>
              <p className="text-sm text-white/90 mb-2">
                A: The entire project may be delayed unless recovery actions are taken immediately. 
                Critical path delays affect the final completion date directly.
              </p>
              <p className="text-xs text-white/80">
                Recovery options include: additional resources, overtime working, parallel working, 
                scope reduction, or accepting the delay with client agreement.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Q: Who is responsible for the overall site workflow?</h4>
              <p className="text-sm text-white/90 mb-2">
                A: Usually the main contractor or site manager coordinates overall workflow, 
                but electricians must plan their own work within this framework.
              </p>
              <p className="text-xs text-white/80">
                Electricians are responsible for their own detailed planning, resource allocation, 
                and coordination with other trades within the overall programme.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Q: How far ahead should electrical work be planned?</h4>
              <p className="text-sm text-white/90 mb-2">
                A: Detailed planning should extend 3-6 weeks ahead, with outline planning for 
                the entire project duration to identify long-lead items and critical activities.
              </p>
              <p className="text-xs text-white/80">
                This allows time for material ordering, resource allocation, coordination, 
                and problem-solving while maintaining detailed control of immediate work.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Q: What should be done when other trades cause electrical delays?</h4>
              <p className="text-sm text-white/90 mb-2">
                A: Document the delay, notify the main contractor immediately, assess recovery options, 
                and maintain clear records for potential claims or programme adjustments.
              </p>
              <p className="text-xs text-white/80">
                Protect your own position while working constructively to find solutions. 
                Early notification allows better recovery planning and maintains project relationships.
              </p>
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Summary</h2>
          <div className="space-y-3">
            <p className="text-xs sm:text-sm text-white">
              <strong>Workflow planning</strong> is essential for all electrical projects regardless of size. 
              Proper sequencing prevents conflicts, reduces costs, and improves safety outcomes.
            </p>
            <p className="text-xs sm:text-sm text-white">
              <strong>Task sequencing</strong> should follow natural construction logic: high-level before low-level, 
              containment before cables, and coordination with overall building sequence.
            </p>
            <p className="text-xs sm:text-sm text-white">
              <strong>Trade coordination</strong> prevents clashes, equipment damage, and ensures efficient use 
              of shared resources like scaffolding, lifts, and workspace.
            </p>
            <p className="text-xs sm:text-sm text-white">
              <strong>Planning tools</strong> like Gantt charts and daily task sheets provide visual control 
              and help identify critical path activities and dependencies.
            </p>
            <p className="text-xs sm:text-sm text-white">
              <strong>Flexibility and communication</strong> are key to adapting to changing conditions while 
              maintaining safety standards and project objectives.
            </p>
          </div>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-8 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link to="../1-3" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous: Materials & PPE
            </Link>
          </Button>
          <Button asChild>
            <Link to="../1-5" className="flex items-center gap-2">
              Next: Health & Safety
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module4Section1_4;