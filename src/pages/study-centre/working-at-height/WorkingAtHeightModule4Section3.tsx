import {
  ArrowLeft,
  FileText,
  CheckCircle,
  AlertTriangle,
  ShieldAlert,
  LifeBuoy,
  ClipboardList,
  Clock,
  ArrowRight,
  HeartPulse,
  Users,
  BookOpen,
  Wrench,
  Timer,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "wah-m4s3-method-statement",
    question:
      "What is the primary purpose of a method statement for work at height?",
    options: [
      "To provide a legal defence in court after an incident",
      "To describe the safe system of work — the sequence of operations, hazards, controls, and equipment required for the task",
      "To calculate the cost of the work",
      "To satisfy the client's tender requirements",
    ],
    correctIndex: 1,
    explanation:
      "A method statement (safe system of work) describes exactly how the work will be carried out safely. It sets out the step-by-step sequence, identifies hazards at each stage, specifies the controls, lists the equipment required, and defines the competence required of the workers. It is a planning and communication tool, not just a legal document.",
  },
  {
    id: "wah-m4s3-suspension-trauma",
    question:
      "Why is suspension trauma a critical concern in rescue planning for work at height?",
    options: [
      "It only affects workers who are afraid of heights",
      "It causes blood to pool in the legs during harness suspension, potentially leading to unconsciousness within 15-30 minutes and death if rescue is not rapid",
      "It is a minor inconvenience that resolves once the worker is lowered",
      "It only occurs when harnesses are not worn correctly",
    ],
    correctIndex: 1,
    explanation:
      "Suspension trauma (also called harness hang syndrome) occurs when a person is suspended motionless in a harness after a fall. Blood pools in the legs due to the harness straps restricting venous return. Without rescue, the person can lose consciousness within 15-30 minutes and cardiac arrest can follow. This is why rescue plans must ensure rapid rescue — a plan that relies solely on emergency services may not be fast enough.",
  },
  {
    id: "wah-m4s3-rescue-rehearsal",
    question:
      "Why must rescue plans be rehearsed rather than just written down?",
    options: [
      "It provides a training record for the safety file",
      "Because a written plan that has never been practised may fail when needed — rehearsal reveals gaps in equipment, training, timing, and communication",
      "The HSE requires a video of every rescue drill",
      "It gives workers something to do during quiet periods",
    ],
    correctIndex: 1,
    explanation:
      "A rescue plan that exists only on paper may contain assumptions that do not hold in practice — equipment may not reach the casualty, the rescue team may not be able to locate the rescue kit, communication may fail, or the process may take longer than the critical window for suspension trauma. Rehearsal reveals these gaps before a real emergency occurs.",
  },
];

const faqs = [
  {
    question:
      "Is a method statement the same as a risk assessment?",
    answer:
      "No. A risk assessment identifies the hazards and evaluates the risk. A method statement describes how the work will be carried out safely, incorporating the controls identified in the risk assessment. The risk assessment asks 'what could go wrong and how likely is it?'. The method statement answers 'how will we do the work safely?'. They are complementary documents that work together — the risk assessment informs the method statement. On many sites, they are combined into a single RAMS (Risk Assessment and Method Statement) document.",
  },
  {
    question:
      "Can the emergency services be relied upon as the sole rescue plan?",
    answer:
      "For some low-risk work at height, the emergency services may be the appropriate rescue resource — provided they can access the location quickly enough. However, for any work involving harnesses or where a worker could be suspended after a fall, relying solely on the emergency services is generally not adequate. Suspension trauma can cause unconsciousness within 15-30 minutes, and the emergency services may not arrive within that window. For harness-based work, an on-site assisted rescue capability is normally required.",
  },
  {
    question:
      "How often should rescue plans be rehearsed?",
    answer:
      "There is no single regulation specifying a rehearsal frequency. Best practice is to rehearse the rescue plan before the work begins (particularly for new or unfamiliar tasks), whenever the rescue team changes, whenever the equipment changes, and at regular intervals for ongoing work (typically every 3-6 months). Any near-miss or failed rescue attempt should trigger an immediate review and re-rehearsal of the plan. All rehearsals should be documented.",
  },
  {
    question:
      "What are trauma straps and when should they be used?",
    answer:
      "Trauma straps (also called relief straps or suspension trauma straps) are loops of webbing attached to a harness that allow a suspended person to stand in the straps and push their legs against the harness. This uses the leg muscles to pump blood back towards the heart, slowing the onset of suspension trauma. They should be fitted to every full-body harness used for work at height. Workers must be trained in their use as part of harness training. Trauma straps are a delay measure, not a substitute for rapid rescue.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "Which of the following is NOT typically included in a method statement for work at height?",
    options: [
      "The step-by-step sequence of operations",
      "The hazards identified at each stage and the controls to be applied",
      "The financial cost of the equipment hire",
      "The competence requirements for the workers",
    ],
    correctAnswer: 2,
    explanation:
      "A method statement includes the scope, sequence, hazards, controls, equipment, competence requirements, and emergency procedures. Financial costs are a commercial matter and are not part of the safety method statement.",
  },
  {
    id: 2,
    question:
      "Under which regulation must emergency procedures including rescue be planned for work at height?",
    options: [
      "Construction (Design and Management) Regulations 2015 Regulation 12",
      "Work at Height Regulations 2005 Regulation 4(1)",
      "Management of Health and Safety at Work Regulations 1999 Regulation 5",
      "Personal Protective Equipment at Work Regulations 1992 Regulation 7",
    ],
    correctAnswer: 1,
    explanation:
      "Regulation 4(1) of the Work at Height Regulations 2005 specifically requires that the planning of work at height includes emergency procedures, including rescue. This is a duty placed on the employer or person controlling the work.",
  },
  {
    id: 3,
    question:
      "What are the three types of rescue that a rescue plan should consider?",
    options: [
      "Fast rescue, slow rescue, and no rescue",
      "Self-rescue, assisted rescue, and technical rescue (emergency services or specialist team)",
      "Ground rescue, air rescue, and water rescue",
      "Planned rescue, unplanned rescue, and accidental rescue",
    ],
    correctAnswer: 1,
    explanation:
      "The three types of rescue are: self-rescue (the person rescues themselves using their equipment), assisted rescue (a trained colleague assists using rescue equipment), and technical rescue (specialist rescue teams or emergency services). The rescue plan must identify which type is appropriate and ensure the necessary equipment and training are in place.",
  },
  {
    id: 4,
    question:
      "Suspension trauma can cause unconsciousness within what time frame?",
    options: [
      "5-10 seconds",
      "15-30 minutes",
      "2-4 hours",
      "24 hours",
    ],
    correctAnswer: 1,
    explanation:
      "Suspension trauma can cause unconsciousness within 15-30 minutes of a person being suspended motionless in a harness. In some cases, particularly where the person is injured or has pre-existing conditions, it can occur even faster. This is why rescue must be rapid and why relying solely on emergency services may not be sufficient.",
  },
  {
    id: 5,
    question:
      "What is the purpose of trauma straps fitted to a full-body harness?",
    options: [
      "To make the harness more comfortable during normal work",
      "To allow a suspended person to stand in the straps and use leg muscles to pump blood, delaying suspension trauma",
      "To attach tools to the harness",
      "To extend the length of the harness lanyard",
    ],
    correctAnswer: 1,
    explanation:
      "Trauma straps are loops of webbing that allow a suspended person to stand upright in the straps and use their leg muscles. This pumping action helps push blood back towards the heart, delaying the onset of suspension trauma. They are a delay measure that buys time until rescue arrives — they are not a substitute for rapid rescue.",
  },
  {
    id: 6,
    question:
      "A method statement should be prepared for which of the following?",
    options: [
      "Only work at height exceeding 10 metres",
      "Only work requiring a permit-to-work",
      "All non-trivial work at height tasks",
      "Only work involving scaffolding",
    ],
    correctAnswer: 2,
    explanation:
      "A method statement should be prepared for all non-trivial work at height tasks. While the level of detail should be proportionate to the risk, any task that involves significant hazards, multiple steps, or coordination between trades should have a written method statement. Even relatively simple tasks benefit from a brief method statement that confirms the safe system of work.",
  },
  {
    id: 7,
    question:
      "Which rescue equipment is specifically designed to lower a suspended person to the ground?",
    options: [
      "A scaffold tube",
      "A rescue descent device",
      "A safety helmet",
      "An anemometer",
    ],
    correctAnswer: 1,
    explanation:
      "A rescue descent device is a mechanical device that allows a trained rescuer to lower a suspended person to the ground in a controlled manner. It typically attaches to the casualty's harness and uses a friction-based or ratchet mechanism to provide a controlled descent. Rescue descent devices must be readily accessible and the rescue team must be trained in their use.",
  },
  {
    id: 8,
    question:
      "Why should the rescue plan be integrated into the method statement?",
    options: [
      "To reduce the number of documents on site",
      "Because the rescue plan must be specific to the work being done — the rescue method depends on the equipment, location, and height",
      "Because the HSE requires a single combined document",
      "To save printing costs",
    ],
    correctAnswer: 1,
    explanation:
      "The rescue plan must be specific to the actual work being carried out. The type of rescue, the equipment needed, and the rescue method all depend on the height, the access equipment being used, the location, and the nature of the work. A generic rescue plan that does not relate to the specific task is likely to fail in practice. Integrating it into the method statement ensures the rescue arrangements match the work.",
  },
];

export default function WorkingAtHeightModule4Section3() {
  useSEO({
    title: "Method Statements & Rescue Plans | Working at Height Module 4.3",
    description:
      "Method statement content for work at height, rescue plan requirements under WAH Regs 2005, self-rescue, assisted rescue, technical rescue, suspension trauma, and rescue equipment.",
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-400/20 border border-amber-500/30 mb-4">
            <FileText className="h-7 w-7 text-amber-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3 mx-auto">
            <span className="text-amber-500 text-xs font-semibold">
              MODULE 4 &middot; SECTION 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Method Statements &amp; Rescue Plans
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Safe systems of work documentation, rescue plan requirements,
            suspension trauma, rescue types and equipment, and the integration of
            rescue planning into the work at height process
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50">
            <p className="text-amber-400 text-base font-medium mb-2">
              In 30 Seconds
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong>Method statement:</strong> step-by-step safe system of
                  work
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong>Rescue plan:</strong> required by Reg 4(1), must exist
                  before work starts
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong>Suspension trauma:</strong> unconsciousness in 15&ndash;30
                  minutes
                </span>
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-amber-500/5 border-l-2 border-amber-500/50">
            <p className="text-amber-400/90 text-base font-medium mb-2">
              On Site
            </p>
            <ul className="text-base text-white space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong>Before:</strong> write method statement, prepare rescue
                  plan, rehearse
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong>During:</strong> follow the sequence, rescue kit ready
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                <span>
                  <strong>After:</strong> review, record, update for next task
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">
            Learning Outcomes
          </h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Describe the content and purpose of a method statement for WAH",
              "Explain when a method statement is required",
              "State the legal requirement for rescue planning under Reg 4(1)",
              "Distinguish between self-rescue, assisted rescue, and technical rescue",
              "Explain the critical time window for suspension trauma",
              "Identify rescue equipment and describe the importance of rehearsal",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-amber-500/70 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Is a Method Statement? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">01</span>
            What Is a Method Statement?
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A method statement &mdash; also known as a{" "}
                <strong>safe system of work (SSOW)</strong> &mdash; is a document that
                describes exactly how a work activity will be carried out safely. For
                work at height, it translates the findings of the risk assessment into
                a practical, step-by-step plan that workers can follow on site.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-amber-400">Key Point:</strong> A method
                  statement is not a risk assessment. The risk assessment identifies
                  what could go wrong and how likely it is. The method statement
                  describes how the work will be done safely, incorporating the
                  controls identified in the risk assessment. Together they form the
                  RAMS (Risk Assessment and Method Statement) package.
                </p>
              </div>

              <p>
                A well-written method statement for work at height serves three
                critical functions. First, it forces the planner to think through every
                step of the task and identify the hazards at each stage. Second, it
                provides a clear reference for workers on site so they know exactly
                what is expected. Third, it provides evidence that the work was
                planned &mdash; which is a legal requirement under the WAH Regulations.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Method Statement Content
                  </p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    <strong className="text-white">Scope:</strong> A clear
                    description of the work to be done, the location, and the
                    boundaries of the task. What is included and, importantly, what
                    is not included.
                  </p>
                  <p>
                    <strong className="text-white">Sequence of operations:</strong>{" "}
                    The step-by-step order in which the work will be carried out. This
                    includes setting up access equipment, carrying out the work task
                    itself, and dismantling/removing equipment after completion.
                  </p>
                  <p>
                    <strong className="text-white">
                      Hazards and controls at each stage:
                    </strong>{" "}
                    For each step in the sequence, the specific hazards that exist and
                    the specific controls that will be applied. This is where the risk
                    assessment findings are translated into practical actions.
                  </p>
                  <p>
                    <strong className="text-white">Equipment required:</strong> All
                    access equipment, PPE, tools, and materials needed for the task.
                    Include specific requirements such as harness type, lanyard
                    length, scaffold configuration, or MEWP specification.
                  </p>
                  <p>
                    <strong className="text-white">
                      Competence requirements:
                    </strong>{" "}
                    The qualifications, training, and experience required for each role
                    in the task. For example, PASMA trained for scaffold towers, IPAF
                    licensed for MEWPs, harness training for fall arrest systems.
                  </p>
                  <p>
                    <strong className="text-white">Emergency procedures:</strong>{" "}
                    The rescue plan, first aid arrangements, emergency contact numbers,
                    and evacuation route. This section should reference or include the
                    full rescue plan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: When Are Method Statements Needed? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">02</span>
            When Are Method Statements Needed?
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A method statement should be prepared for{" "}
                <strong>all non-trivial work at height tasks</strong>. The level of
                detail should be proportionate to the risk &mdash; a complex scaffold
                erection will require a far more detailed method statement than a
                short-duration task on a podium step.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Tasks Requiring a Method Statement
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Any work at height involving scaffolding, MEWPs, or rope access
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Work near leading edges, openings, or fragile surfaces
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Any task requiring a harness or fall arrest system
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Roof work of any type (flat, pitched, or industrial)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Tasks requiring coordination between multiple trades
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Work near overhead power lines or other environmental hazards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Any task lasting more than 30 minutes at height
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                For routine, low-risk tasks (such as a brief ladder task by a
                competent worker in a controlled environment), a verbal briefing based
                on the risk assessment may be sufficient. However, even for these tasks,
                having a standard method statement that covers the typical risks and
                controls is good practice.
              </p>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Warning</p>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  A generic, &ldquo;one-size-fits-all&rdquo; method statement that is
                  not specific to the actual task, location, and conditions is of
                  limited value. The HSE has criticised organisations that produce
                  thick packs of generic RAMS that nobody reads. A method statement
                  must be specific to the work being done and must be communicated to
                  the workers before the task begins.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Rescue Plan Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">03</span>
            Rescue Plan Requirements
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>Regulation 4(1) of the Work at Height Regulations 2005</strong>{" "}
                requires that the planning of work at height includes{" "}
                <strong>emergency procedures, including rescue</strong>. This is not a
                recommendation &mdash; it is a legal duty. A rescue plan must be in
                place before any person goes to height. It must not be improvised
                after an incident has occurred.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Legal Requirement
                  </p>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  WAH Regs 2005 Regulation 4(1): <em>&ldquo;Every employer shall
                  ensure that work at height is &mdash; (a) properly planned; (b)
                  appropriately supervised; and (c) carried out in a manner which is
                  so far as is reasonably practicable safe; and that its planning
                  includes selection of work equipment&hellip; and planning for
                  emergencies and rescue.&rdquo;</em>
                </p>
              </div>

              <p>
                The rescue plan must be specific to the work being carried out. A
                generic rescue plan that says &ldquo;call 999&rdquo; is not adequate
                for work where a person could be suspended in a harness. The plan must
                identify the type of rescue that will be used, the equipment available,
                the trained personnel on site, and the expected time from alarm to
                rescue.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  What the Rescue Plan Must Address
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      What type of rescue is appropriate (self, assisted, or
                      technical)?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      What rescue equipment is needed and where is it located?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Who on site is trained to carry out the rescue?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      How will the alarm be raised? (radio, phone, shout, horn)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      How long will rescue take from alarm to ground level?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      What first aid provision is available? Who is the first aider?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      How will the emergency services access the location?
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Types of Rescue */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">04</span>
            Types of Rescue
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Rescue plans for work at height must consider three types of rescue.
                The appropriate type depends on the nature of the work, the height
                involved, the equipment being used, and the availability of trained
                rescue personnel on site.
              </p>

              <div className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-semibold text-green-400">
                      Type 1: Self-Rescue
                    </p>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed mb-2">
                    The person rescues themselves using their own equipment and
                    training. This is the fastest form of rescue and is appropriate
                    where the person is conscious, uninjured, and has the equipment
                    and training to get themselves to a safe position.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Climbing back onto a scaffold platform after a slip
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Using a personal rescue device to lower yourself after a fall
                        into a harness
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Deploying trauma straps while awaiting further assistance
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <LifeBuoy className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-semibold text-blue-400">
                      Type 2: Assisted Rescue
                    </p>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed mb-2">
                    A trained colleague or rescue team on site carries out the rescue
                    using dedicated rescue equipment. This is appropriate where the
                    person is unable to self-rescue (injured, unconscious, or
                    disoriented) but a trained rescuer is available on site.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        A colleague uses a rescue pole to bring a suspended person to
                        a platform
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Operating a rescue descent device to lower the casualty
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Using a MEWP to reach and retrieve a suspended person
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <HeartPulse className="h-5 w-5 text-purple-400" />
                    <p className="text-sm font-semibold text-purple-400">
                      Type 3: Technical Rescue
                    </p>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed mb-2">
                    The emergency services or a specialist rescue team carry out the
                    rescue. This is the last resort and is appropriate where on-site
                    resources are insufficient, the situation is complex, or the
                    casualty requires immediate medical intervention.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Fire and rescue service technical rescue teams
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Specialist rope access rescue teams
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>
                        Air ambulance (for remote locations or complex casualties)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Warning</p>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  Relying solely on Type 3 (emergency services) for work where a
                  person could be suspended in a harness is generally not adequate.
                  Average emergency service response time in urban areas is 7&ndash;15
                  minutes, and in rural areas it can be 20&ndash;30 minutes or more.
                  Suspension trauma can cause unconsciousness within 15&ndash;30
                  minutes. For harness-based work, on-site assisted rescue capability
                  is normally essential.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Suspension Trauma */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">05</span>
            Suspension Trauma
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Suspension trauma (also called <strong>harness hang syndrome</strong>
                or <strong>orthostatic intolerance</strong>) is a potentially fatal
                condition that occurs when a person is suspended motionless in a
                harness after a fall. It is one of the most critical factors in rescue
                planning for any work at height that involves harnesses or fall arrest
                systems.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <HeartPulse className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Critical Time Window
                  </p>
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  <p>
                    When a person is suspended in a harness, the leg straps compress
                    the veins in the legs, restricting blood flow back to the heart.
                    Blood pools in the lower limbs. The heart receives less blood with
                    each beat, reducing blood pressure and oxygen delivery to the
                    brain.
                  </p>
                  <p>
                    <strong className="text-white">Within 5&ndash;10 minutes:</strong>{" "}
                    The person may begin to feel dizzy, nauseous, and breathless.
                    Vision may blur and cognitive function begins to deteriorate.
                  </p>
                  <p>
                    <strong className="text-white">Within 15&ndash;30 minutes:</strong>{" "}
                    The person may lose consciousness due to insufficient blood supply
                    to the brain. Once unconscious, they cannot deploy trauma straps
                    or assist in their own rescue.
                  </p>
                  <p>
                    <strong className="text-white">Beyond 30 minutes:</strong>{" "}
                    Cardiac arrest and death can occur. Even if the person is rescued
                    alive, a sudden release from the harness can cause &ldquo;rescue
                    death&rdquo; &mdash; a flood of pooled, deoxygenated blood
                    returning to the heart, which can trigger fatal cardiac arrhythmia.
                  </p>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-amber-400">Key Point:</strong> After rescue,
                  a person who has been suspended for any significant period must{" "}
                  <strong>not</strong> be laid flat on their back immediately. They
                  should be placed in a seated or semi-recumbent position (the &ldquo;W
                  position&rdquo; &mdash; knees raised) and monitored until medical
                  professionals arrive. Laying them flat can cause the pooled blood to
                  return to the heart too quickly, risking cardiac arrest.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  Factors That Accelerate Suspension Trauma
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Unconsciousness from the fall (unable to move legs)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Injuries that prevent movement (broken limbs)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Cold weather (blood vessels constrict, worsening pooling)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Dehydration or existing cardiovascular conditions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Poor harness fit (tight straps increase compression)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Rescue Equipment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">06</span>
            Rescue Equipment
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The rescue plan must specify the rescue equipment that will be
                available on site and confirm that the rescue team is trained in its
                use. Equipment must be readily accessible &mdash; a rescue device
                locked in a store room 200 metres from the work area is not readily
                accessible.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Rescue Equipment Types
                  </p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <p>
                    <strong className="text-white">
                      Rescue descent devices:
                    </strong>{" "}
                    Mechanical devices that provide controlled lowering of a casualty
                    to the ground. They typically attach to the casualty&rsquo;s harness
                    dorsal attachment point and use a friction-based or ratchet mechanism
                    to control the descent speed. The rescuer operates from above or
                    from ground level depending on the device type.
                  </p>
                  <p>
                    <strong className="text-white">Trauma straps:</strong> Loops of
                    webbing that attach to the harness and allow the suspended person
                    to stand in them, using leg muscle movement to pump blood back
                    towards the heart. They delay the onset of suspension trauma but
                    are not a substitute for rescue. Every harness should have trauma
                    straps fitted.
                  </p>
                  <p>
                    <strong className="text-white">Rescue poles:</strong> Telescopic
                    poles that can reach a suspended person and either connect to their
                    harness for positioning or provide a means to bring them within
                    reach of a rescue platform. Used where the casualty is out of direct
                    arm&rsquo;s reach.
                  </p>
                  <p>
                    <strong className="text-white">Lowering systems:</strong>{" "}
                    Rope-based systems with braking devices that allow a rescuer to
                    lower a casualty in a controlled manner. These may be pre-rigged
                    (set up before work begins) or deployed during the rescue.
                  </p>
                  <p>
                    <strong className="text-white">Rescue stretchers:</strong> For
                    casualties with potential spinal or serious injuries, a rescue
                    stretcher allows the person to be lowered horizontally. These are
                    typically used by specialist rescue teams or emergency services.
                  </p>
                </div>
              </div>

              <p>
                All rescue equipment must be inspected before each use, maintained in
                accordance with the manufacturer&rsquo;s instructions, and subjected
                to periodic thorough examination. Rescue equipment that is defective,
                damaged, or past its inspection date must not be used.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Practice Drills and Rehearsal */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">07</span>
            Practice Drills &amp; Rehearsal
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                A rescue plan that has never been practised is an untested theory. It
                may contain assumptions that do not hold in reality &mdash; the
                equipment may not reach the casualty, the rescue team may not know
                where the kit is stored, the process may take longer than the critical
                window for suspension trauma, or the communication chain may fail under
                pressure.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-white leading-relaxed">
                  <strong className="text-amber-400">Key Point:</strong> Rescue plans
                  must be rehearsed, not just written. A drill does not need to involve
                  dropping a person from height &mdash; it can use a weighted dummy or
                  a volunteer in a harness at low level. The purpose is to test the
                  process: raising the alarm, locating the equipment, reaching the
                  casualty, and completing the rescue within the required time.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  What Rescue Drills Should Test
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Can the alarm be raised quickly and clearly?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Can the rescue team locate and deploy the equipment within 5
                      minutes?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Can the casualty be reached from the rescue position?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Can the rescue be completed within 15 minutes (before suspension
                      trauma becomes critical)?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Does every team member know their role?
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Is the post-rescue care (W-position, first aid) understood?
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                Document every drill: the date, the scenario, the participants, the
                time taken, any problems identified, and the corrective actions. If a
                drill reveals a problem (such as the rescue taking too long), the plan
                must be revised and the drill repeated until the process works within
                the required time.
              </p>
            </div>
          </div>
        </section>

        {/* Section 08: Rescue Plan Decision Tree */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">08</span>
            Rescue Plan Decision Tree
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The following decision tree helps determine the appropriate type of
                rescue for a given work at height scenario. Use this during the
                planning stage to ensure the rescue plan matches the work.
              </p>

              {/* Rescue Plan Decision Tree Diagram */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                    <LifeBuoy className="h-4 w-4 text-amber-400" />
                    <span className="text-amber-400 text-xs font-semibold uppercase tracking-wide">
                      Rescue Decision Tree
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Question 1 */}
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 sm:p-4 text-center">
                    <p className="text-sm font-semibold text-amber-400 mb-1">
                      Person has fallen / is in distress
                    </p>
                    <p className="text-xs text-white/70">
                      Is the person conscious and able to move?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Yes branch */}
                    <div className="space-y-3">
                      <div className="text-center">
                        <span className="text-xs text-green-400 font-semibold">
                          YES
                        </span>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                        <p className="text-sm font-semibold text-green-400 mb-1">
                          Can they self-rescue?
                        </p>
                        <p className="text-xs text-white/70">
                          Do they have the equipment and training to reach safety
                          unassisted?
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-2 text-center">
                          <p className="text-xs text-green-400 font-semibold mb-1">
                            YES
                          </p>
                          <p className="text-xs text-white/70">
                            Guide self-rescue. Monitor until safe.
                          </p>
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2 text-center">
                          <p className="text-xs text-blue-400 font-semibold mb-1">
                            NO
                          </p>
                          <p className="text-xs text-white/70">
                            Deploy assisted rescue team &amp; equipment.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* No branch */}
                    <div className="space-y-3">
                      <div className="text-center">
                        <span className="text-xs text-red-400 font-semibold">
                          NO
                        </span>
                      </div>
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                        <p className="text-sm font-semibold text-red-400 mb-1">
                          Is assisted rescue available on site?
                        </p>
                        <p className="text-xs text-white/70">
                          Trained rescuer + rescue equipment within reach?
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2 text-center">
                          <p className="text-xs text-blue-400 font-semibold mb-1">
                            YES
                          </p>
                          <p className="text-xs text-white/70">
                            Deploy assisted rescue immediately.
                          </p>
                        </div>
                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-2 text-center">
                          <p className="text-xs text-purple-400 font-semibold mb-1">
                            NO
                          </p>
                          <p className="text-xs text-white/70">
                            Call emergency services (999). Monitor casualty.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Always box */}
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 sm:p-4 text-center mt-4">
                    <p className="text-sm font-semibold text-red-400 mb-1">
                      In ALL cases:
                    </p>
                    <p className="text-xs text-white/70">
                      Call 999 if any doubt. After rescue: W-position (knees raised),
                      do NOT lay flat. Monitor breathing. Await paramedics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 09: Integration of Rescue Plan into Method Statement */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-amber-500/80 text-sm font-normal">09</span>
            Integrating Rescue into the Method Statement
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The rescue plan should not be a separate, standalone document that is
                filed away from the method statement. It should be{" "}
                <strong>integrated into the method statement</strong> as the emergency
                procedures section. This ensures that the rescue arrangements are
                specific to the actual work being carried out and are reviewed every
                time the method statement is briefed to the workforce.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">
                  How to Integrate the Rescue Plan
                </p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Include the rescue plan as Section X of the method statement
                      (typically the last section before sign-off)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Reference the specific equipment being used for the task and how
                      rescue would work with that equipment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Name the rescue-trained personnel who will be on site during the
                      work
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Specify the location of rescue equipment relative to the work
                      area
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Include emergency contact numbers and the nearest A&amp;E
                      location
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>
                      Record the date of the last rescue drill and any issues identified
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                When the method statement is briefed to the workforce, the rescue plan
                section must be covered explicitly. Workers must be asked to confirm
                that they understand the rescue procedure, know where the equipment is,
                and know how to raise the alarm. This is not optional &mdash; it is part
                of the legal requirement to plan for emergencies.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="pb-4 border-b border-white/5 last:border-0"
              >
                <h3 className="text-sm font-medium text-white mb-1">
                  {faq.question}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-4-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Prev: Permit-to-Work Systems
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-amber-500 text-[#1a1a1a] hover:bg-amber-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../working-at-height-module-4-section-4">
              Next: Weather, Environment &amp; Site Conditions
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
