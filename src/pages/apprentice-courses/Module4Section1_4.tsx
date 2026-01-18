import { ArrowLeft, ArrowRight, Calendar, Users, Clock, Eye, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    },
    {
      phase: "First Fix Installation",
      description: "Structural electrical work including containment and cable installation",
      activities: "Installing containment systems, routing cables, fixing back boxes, earthing systems, cable pulling",
      timeframe: "40-60% of installation time",
    },
    {
      phase: "Second Fix Installation",
      description: "Connecting accessories and completing the electrical installation",
      activities: "Installing switches, sockets, light fittings, connecting circuits, labelling, initial testing",
      timeframe: "25-35% of installation time",
    },
    {
      phase: "Testing and Commissioning",
      description: "Verification of safety, functionality, and compliance",
      activities: "Full electrical testing, fault rectification, system commissioning, documentation, handover",
      timeframe: "10-15% of installation time",
    },
  ];

  const sequencingPrinciples = [
    {
      principle: "Follow Natural Build Sequence",
      description: "Align electrical work with overall construction programme",
      rationale: "Prevents obstruction, damage, and rework by following logical construction order",
    },
    {
      principle: "Containment Before Cables",
      description: "Complete all containment systems before pulling any cables",
      rationale: "Ensures proper cable support, protection, and compliance with installation standards",
    },
    {
      principle: "High-Level Before Low-Level",
      description: "Complete overhead and high-level work before floor-level installations",
      rationale: "Prevents obstruction of access equipment and protects completed low-level work",
    },
    {
      principle: "Disruptive Tasks in Quiet Periods",
      description: "Schedule noisy or disruptive activities during appropriate times",
      rationale: "Minimises disruption to occupied buildings and maintains good site relations",
    },
  ];

  const coordinationAspects = [
    {
      trade: "Building/Construction",
      activities: "Structural work, masonry, concrete pours, steelwork",
      coordinationNeeds: "Opening schedules, embed requirements, access coordination, protection measures",
    },
    {
      trade: "Plumbing/Mechanical",
      activities: "Pipework installation, heating systems, ventilation, drainage",
      coordinationNeeds: "Route coordination, shared penetrations, equipment connections, controls integration",
    },
    {
      trade: "HVAC Systems",
      activities: "Ductwork, air handling units, controls, ventilation systems",
      coordinationNeeds: "Power supplies, control wiring, shared ceiling space, equipment coordination",
    },
    {
      trade: "Wet Trades (Plastering/Painting)",
      activities: "Wall finishes, decorative work, protective coatings, floor finishes",
      coordinationNeeds: "Protection requirements, access timing, cure periods, final fix timing",
    },
  ];

  const planningTools = [
    {
      tool: "Gantt Charts",
      purpose: "Visual timeline showing task sequences, dependencies, and critical path",
      applications: "Overall project scheduling, resource planning, progress monitoring, dependency tracking",
    },
    {
      tool: "Daily Task Sheets",
      purpose: "Detailed daily work planning and progress tracking for individual teams",
      applications: "Daily work allocation, skill matching, progress recording, issue identification",
    },
    {
      tool: "Work Permits/Risk Assessments",
      purpose: "Safety control for high-risk or restricted activities",
      applications: "Hot work, confined spaces, live electrical work, working at height",
    },
    {
      tool: "Look-Ahead Schedules",
      purpose: "3-6 week forward planning to anticipate needs and issues",
      applications: "Resource planning, material ordering, coordination meetings, problem solving",
    },
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 1
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 4</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 1.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Planning Workflow and Sequencing Tasks
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Master effective workflow planning and task sequencing for electrical installations to maximise efficiency and safety.
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Introduction
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-white/90">
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">In 30 Seconds</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Follow natural build sequence: high-level before low-level work.</li>
                  <li>Coordinate with other trades to prevent clashes and share resources.</li>
                  <li>Use planning tools like Gantt charts and daily task sheets.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
                <p className="font-semibold text-elec-yellow mb-2">Spot it / Use it</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Spot:</strong> Task dependencies, trade clashes, critical path activities.</li>
                  <li><strong>Use:</strong> Logical sequencing, coordination meetings, planning tools.</li>
                  <li><strong>Check:</strong> Dependencies met, resources available, safety requirements.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Learning outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Learning Outcomes
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-sm text-white/90">
              <li>Break down an installation into logical, manageable stages.</li>
              <li>Sequence tasks to maximise efficiency and safety.</li>
              <li>Coordinate with other site activities and trades.</li>
              <li>Identify critical path tasks and dependencies.</li>
              <li>Adapt workflow to address unforeseen issues without compromising safety or quality.</li>
            </ul>
          </section>

          {/* Understanding Workflow */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              <Calendar className="w-5 h-5" /> Understanding Workflow in Electrical Installations
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Electrical installations follow a logical sequence of phases, each with specific activities,
              timeframes, and dependencies. Understanding this workflow is crucial for effective planning.
            </p>

            <div className="space-y-4">
              {workflowPhases.map((phase, i) => (
                <div key={i} className="rounded-lg p-4 border-l-2 border-elec-yellow/50 bg-white/5">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-elec-yellow mb-1">{phase.phase}</p>
                      <p className="text-sm text-white/80 mb-2">{phase.description}</p>
                      <div className="text-xs text-white/70 bg-black/20 p-2 rounded mb-2">
                        <strong>Activities:</strong> {phase.activities}
                      </div>
                      <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                        <strong>Typical timeframe:</strong> {phase.timeframe}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-sm font-medium text-white mb-1">Workflow Success Factors</p>
              <p className="text-xs text-white/70">
                Clear phase boundaries, adequate resources for each phase, proper handover procedures,
                quality gates between phases, and flexibility to adapt to changing conditions.
              </p>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck {...quickChecks[0]} />
          </div>

          {/* Task Sequencing */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              <Clock className="w-5 h-5" /> Task Sequencing Principles
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Effective task sequencing prevents conflicts, reduces rework, and maximises productivity
              by following logical construction principles and maintaining safety.
            </p>

            <div className="space-y-4">
              {sequencingPrinciples.map((principle, i) => (
                <div key={i} className="rounded-lg p-4 border-l-2 border-green-500/50 bg-green-500/5">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-green-400 mb-1">{principle.principle}</p>
                      <p className="text-sm text-white/80 mb-2">{principle.description}</p>
                      <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                        <strong>Rationale:</strong> {principle.rationale}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-sm font-medium text-white mb-1">Sequencing Flexibility</p>
              <p className="text-xs text-white/80">
                While following principles is important, maintain flexibility to adapt to site conditions,
                weather, material availability, and coordination requirements. Always prioritise safety.
              </p>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck {...quickChecks[1]} />
          </div>

          {/* Coordination with Other Trades */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              <Users className="w-5 h-5" /> Coordination with Other Trades
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Successful electrical installations require effective coordination with multiple trades.
              Poor coordination leads to clashes, delays, damage, and cost overruns.
            </p>

            <div className="space-y-4">
              {coordinationAspects.map((aspect, i) => (
                <div key={i} className="rounded-lg p-4 border-l-2 border-purple-500/50 bg-purple-500/5">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-purple-400 mb-1">{aspect.trade}</p>
                      <p className="text-sm text-white/80 mb-2"><strong>Activities:</strong> {aspect.activities}</p>
                      <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                        <strong>Coordination needs:</strong> {aspect.coordinationNeeds}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-sm font-medium text-white mb-1">Coordination Success Factors</p>
              <p className="text-xs text-white/70">
                Regular coordination meetings, shared project schedules, clear communication protocols,
                3D modelling for clash detection, and mutual respect between trades.
              </p>
            </div>
          </section>

          <div className="mb-10">
            <InlineCheck {...quickChecks[2]} />
          </div>

          {/* Planning Tools */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              <CheckCircle className="w-5 h-5" /> Planning Tools and Techniques
            </h2>
            <p className="text-sm text-white/80 mb-4">
              Effective planning requires appropriate tools and techniques to visualise, track, and
              manage complex electrical installation projects.
            </p>

            <div className="space-y-4">
              {planningTools.map((tool, i) => (
                <div key={i} className="rounded-lg p-4 border-l-2 border-orange-500/50 bg-orange-500/5">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-orange-400 mb-1">{tool.tool}</p>
                      <p className="text-sm text-white/80 mb-2">{tool.purpose}</p>
                      <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                        <strong>Applications:</strong> {tool.applications}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-sm font-medium text-white mb-1">Tool Selection Strategy</p>
              <p className="text-xs text-white/70">
                Choose tools appropriate to project complexity, team size, and client requirements.
                Simple projects may only need basic scheduling, while complex projects require sophisticated planning tools.
              </p>
            </div>
          </section>

          {/* Real-world examples */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              <Eye className="w-5 h-5" /> Real-World Examples
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg border-l-2 border-l-red-500">
                <h4 className="font-medium text-white mb-2">Case Study 1: Poor Sequencing Consequences</h4>
                <p className="text-sm text-white/80 mb-3">
                  An electrician installed floor trunking before the concrete pour date was confirmed.
                  During the concrete pour, the trunking was damaged by the concrete contractor's equipment
                  and had to be completely removed and reinstalled, costing an additional £3,000 in labour
                  and materials plus a 2-week project delay.
                </p>
                <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                  <strong>Lesson:</strong> Always confirm sequencing with other trades before proceeding.
                  Floor installations should be coordinated with concrete contractors to ensure proper timing and protection.
                </div>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-lg border-l-2 border-l-red-500">
                <h4 className="font-medium text-white mb-2">Case Study 2: Trade Coordination Failure</h4>
                <p className="text-sm text-white/80 mb-3">
                  A major office refurbishment suffered 6 weeks delay when electrical and HVAC contractors
                  both claimed the same ceiling space. Neither had coordinated routes, resulting in
                  impossible installation conflicts that required complete redesign and rework.
                </p>
                <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                  <strong>Lesson:</strong> 3D coordination and regular trade meetings are essential.
                  The £50,000 delay cost far exceeded the investment needed for proper coordination.
                </div>
              </div>

              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg border-l-2 border-l-green-500">
                <h4 className="font-medium text-white mb-2">Success Story: Effective Workflow Planning</h4>
                <p className="text-sm text-white/80 mb-3">
                  A data centre project used detailed Gantt charts, weekly coordination meetings, and
                  look-ahead scheduling to complete 3 weeks early. Excellent coordination allowed trades
                  to work efficiently without conflicts, materials arrived just-in-time, and quality was excellent.
                </p>
                <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
                  <strong>Result:</strong> Early completion bonus of £100,000, excellent client relationships,
                  and follow-on contracts worth £2M. Good planning pays for itself many times over.
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-white/10 p-4">
                <p className="font-medium text-white mb-1">Can sequencing change once work begins?</p>
                <p className="text-sm text-white/70">
                  Yes – sequencing should be adaptable to changing site conditions, but changes
                  must be properly risk-assessed and communicated to all stakeholders.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 p-4">
                <p className="font-medium text-white mb-1">What happens if critical path tasks are delayed?</p>
                <p className="text-sm text-white/70">
                  The entire project may be delayed unless recovery actions are taken immediately.
                  Critical path delays affect the final completion date directly.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 p-4">
                <p className="font-medium text-white mb-1">Who is responsible for the overall site workflow?</p>
                <p className="text-sm text-white/70">
                  Usually the main contractor or site manager coordinates overall workflow,
                  but electricians must plan their own work within this framework.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 p-4">
                <p className="font-medium text-white mb-1">How far ahead should electrical work be planned?</p>
                <p className="text-sm text-white/70">
                  Detailed planning should extend 3-6 weeks ahead, with outline planning for
                  the entire project duration to identify long-lead items and critical activities.
                </p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-elec-yellow" /> Summary
              </h2>
              <div className="space-y-2 text-sm text-white/80">
                <p>
                  <strong>Workflow planning</strong> is essential for all electrical projects regardless of size.
                  Proper sequencing prevents conflicts, reduces costs, and improves safety outcomes.
                </p>
                <p>
                  <strong>Task sequencing</strong> should follow natural construction logic: high-level before low-level,
                  containment before cables, and coordination with overall building sequence.
                </p>
                <p>
                  <strong>Trade coordination</strong> prevents clashes, equipment damage, and ensures efficient use
                  of shared resources like scaffolding, lifts, and workspace.
                </p>
                <p>
                  <strong>Planning tools</strong> like Gantt charts and daily task sheets provide visual control
                  and help identify critical path activities and dependencies.
                </p>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">Test your knowledge</h2>
            <Quiz questions={quizQuestions} />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-8 border-t border-white/10">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Materials & PPE
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../1-5">
                Next: Work Area Prep
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module4Section1_4;
