import { ArrowLeft, Scale, CheckCircle, AlertTriangle, BookOpen, Shield, Users, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "wahr-hierarchy",
    question: "What is the first step in the hierarchy of control for work at height?",
    options: [
      "Use collective fall prevention such as guardrails",
      "Provide personal fall protection equipment",
      "Avoid work at height altogether where possible",
      "Minimise the distance and consequences of a fall"
    ],
    correctIndex: 0,
    explanation: "The Work at Height Regulations 2005 require you to avoid work at height wherever reasonably practicable. This is the first and most important step in the hierarchy of control."
  },
  {
    id: "wahr-schedule5",
    question: "Under Schedule 5 of the Work at Height Regulations, who must inspect a mobile tower before first use on site?",
    options: [
      "The site manager",
      "A competent person",
      "The tower manufacturer",
      "An HSE inspector"
    ],
    correctIndex: 1,
    explanation: "Schedule 5 requires that scaffolding, including mobile towers, must be inspected before first use and after any event likely to have affected stability. Inspections must be carried out by a competent person."
  },
  {
    id: "wahr-reasonably-practicable",
    question: "What does 'so far as is reasonably practicable' mean under the Regulations?",
    options: [
      "You must eliminate every risk completely regardless of cost",
      "You only need to comply if the HSE visits your site",
      "The cost, time, and effort must be weighed against the level of risk",
      "It means the same as 'as far as possible'"
    ],
    correctIndex: 2,
    explanation: "Reasonably practicable means you must weigh the risk against the sacrifice (cost, time, effort) needed to avert it. If the risk is significant, the cost of prevention must be very disproportionate before you can justify not acting."
  }
];

const faqs = [
  {
    question: "Do the Work at Height Regulations apply to mobile scaffold towers?",
    answer: "Yes. Mobile scaffold towers are classified as work equipment used for work at height and fall squarely within the scope of the Work at Height Regulations 2005. The Regulations require proper planning, supervision, use of competent persons, and compliance with Schedule 5 inspection requirements for all scaffolding, including mobile towers."
  },
  {
    question: "What height triggers the Work at Height Regulations?",
    answer: "There is no minimum height threshold. The Regulations apply to all work at height where a person could fall a distance liable to cause personal injury, regardless of whether that is 1 metre or 10 metres. Even stepping onto a single platform board is work at height."
  },
  {
    question: "Who is responsible for ensuring work at height is safe?",
    answer: "The employer has the primary duty to ensure work at height is properly planned, appropriately supervised, and carried out by competent persons using suitable equipment. However, employees and the self-employed also have duties to report hazards, use equipment correctly, and follow systems of work."
  },
  {
    question: "How often must a mobile tower be inspected under Schedule 5?",
    answer: "A mobile tower must be inspected by a competent person before first use on a site, after any substantial alteration, after any event likely to have affected its stability (such as severe weather), and at regular intervals not exceeding 7 days if it remains erected. Each inspection must be recorded in writing."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What year were the current Work at Height Regulations introduced?",
    options: ["2000", "2005", "2010", "2015"],
    correctAnswer: 1,
    explanation: "The Work at Height Regulations were introduced in 2005 and remain the primary legislation governing work at height in England, Wales, and Scotland."
  },
  {
    id: 2,
    question: "Which of the following is the CORRECT hierarchy of control for work at height?",
    options: [
      "Prevent falls, avoid height, mitigate consequences",
      "Avoid height, prevent falls, mitigate consequences",
      "Mitigate consequences, avoid height, prevent falls",
      "Use PPE, prevent falls, avoid height"
    ],
    correctAnswer: 1,
    explanation: "The correct hierarchy is: (1) Avoid work at height, (2) Prevent falls using collective protection, (3) Mitigate the distance and consequences of a fall."
  },
  {
    id: 3,
    question: "Under Schedule 5, how frequently must a mobile tower be inspected if it remains erected?",
    options: [
      "Every 3 days",
      "Every 7 days",
      "Every 14 days",
      "Every 28 days"
    ],
    correctAnswer: 1,
    explanation: "Schedule 5 requires inspections at intervals not exceeding 7 days for scaffolding that remains erected, in addition to inspections before first use and after any event that may have affected stability."
  },
  {
    id: 4,
    question: "What does 'reasonably practicable' mean in the context of the Regulations?",
    options: [
      "You must do everything technically possible regardless of cost",
      "You can ignore risks if they seem unlikely",
      "You must balance the level of risk against the cost of reducing it",
      "You only need to act if the HSE issues an improvement notice"
    ],
    correctAnswer: 2,
    explanation: "Reasonably practicable requires weighing the degree of risk against the sacrifice needed to avert it. If the risk is high, the cost must be grossly disproportionate before inaction is justified."
  },
  {
    id: 5,
    question: "Who has the primary duty under the Work at Height Regulations to plan and organise work at height?",
    options: [
      "The employee carrying out the work",
      "The HSE",
      "The employer",
      "The equipment manufacturer"
    ],
    correctAnswer: 2,
    explanation: "The employer bears the primary duty to ensure that work at height is properly planned, appropriately supervised, and carried out in a safe manner by competent persons."
  },
  {
    id: 6,
    question: "A mobile tower is blown over by strong winds overnight. What must happen before it can be used again?",
    options: [
      "It can be used immediately if visually undamaged",
      "A competent person must inspect it before use",
      "The manufacturer must approve its continued use",
      "It must be replaced with a new tower"
    ],
    correctAnswer: 1,
    explanation: "Schedule 5 requires inspection by a competent person after any event likely to have affected stability. Wind damage constitutes such an event and a full inspection must be completed and recorded before the tower is used again."
  },
  {
    id: 7,
    question: "Which of the following is NOT part of the employer's duties under Regulation 4?",
    options: [
      "Ensuring work at height is properly planned",
      "Providing appropriate supervision",
      "Personally carrying out all work at height",
      "Using competent persons for work at height"
    ],
    correctAnswer: 2,
    explanation: "Employers must plan, supervise, and ensure competent persons carry out the work. They are not required to personally perform the work themselves."
  },
  {
    id: 8,
    question: "Under the Regulations, what constitutes 'work at height'?",
    options: [
      "Only work above 2 metres",
      "Only work on scaffolding or ladders",
      "Any work where a person could fall and injure themselves",
      "Only work on construction sites"
    ],
    correctAnswer: 2,
    explanation: "Work at height means any work where a person could fall a distance liable to cause personal injury. There is no minimum height, and it applies in any workplace, not just construction."
  }
];

export default function IpafModule1Section1() {
  useSEO({
    title: "Work at Height Regulations 2005 | IPAF Module 1.1",
    description: "Hierarchy of control, duty to plan and supervise, Schedule 5 scaffolding inspection requirements, employer and employee duties under the Work at Height Regulations 2005.",
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
            <Link to="../ipaf-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-500/20 border border-elec-yellow/30 mb-4">
            <Scale className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 mb-3 mx-auto">
            <span className="text-elec-yellow text-xs font-semibold">MODULE 1 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Work at Height Regulations 2005
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The primary legislation governing work at height in Great Britain, including the hierarchy of control and scaffold inspection duties
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Hierarchy:</strong> Avoid &rarr; Prevent &rarr; Mitigate falls</li>
              <li><strong>Duty:</strong> Plan, supervise, use competent persons</li>
              <li><strong>Schedule 5:</strong> Inspect towers before use and every 7 days</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Before:</strong> Plan the work, assess risks, select equipment</li>
              <li><strong>During:</strong> Supervise, inspect, record findings</li>
              <li><strong>Always:</strong> Use competent persons for assembly and inspection</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the hierarchy of control for work at height",
              "Describe employer and employee duties under the Regulations",
              "Understand Schedule 5 inspection requirements for scaffolding",
              "Define what 'reasonably practicable' means in practice",
              "Identify when risk assessments are required for tower work",
              "Understand the duty to plan and organise work at height"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Are the Work at Height Regulations?
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Work at Height Regulations 2005 (WAHR) came into force on 6 April 2005 and apply across
                England, Wales, and Scotland. They replaced a patchwork of older legislation and consolidated
                all work-at-height duties into a single, clear framework. The Regulations apply to all work
                at height where there is a risk of a fall liable to cause personal injury.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Key Definition:</strong> "Work at height" means work
                  in any place where, if precautions were not taken, a person could fall a distance liable to
                  cause personal injury. There is <strong>no minimum height</strong> &mdash; even stepping
                  onto a single platform board constitutes work at height.
                </p>
              </div>

              <p>
                The Regulations apply to employers, the self-employed, and anyone who controls the work of
                others. This means that principal contractors, facilities managers, and site supervisors all
                have duties under WAHR, not just the person physically working at height.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The Regulations Cover:</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>All industries and workplaces, not just construction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Work above ground level, below ground level (e.g. near a pit), and at ground level where a fall hazard exists</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Access and egress to a place of work at height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Organisation, planning, and supervision of work at height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Selection and use of work equipment for work at height</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Inspection of work equipment used at height, including mobile scaffold towers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Hierarchy of Control */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Hierarchy of Control
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Regulation 6 establishes a strict hierarchy of control that must be followed when planning
                any work at height. This hierarchy is the cornerstone of the Regulations and dictates the
                approach you must take before any work at height begins.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">The Three-Step Hierarchy</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-sm font-medium text-green-400">Avoid</p>
                      <p className="text-sm text-white/80">Avoid work at height altogether where it is reasonably practicable to do so. Can the task be done from ground level? Can equipment be lowered for maintenance?</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-sm font-medium text-blue-400">Prevent</p>
                      <p className="text-sm text-white/80">Where work at height cannot be avoided, use work equipment or other measures to prevent falls. This includes guardrails, mobile scaffold towers with full edge protection, and MEWPs.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-sm font-medium text-amber-400">Mitigate</p>
                      <p className="text-sm text-white/80">Where the risk of a fall cannot be eliminated, minimise the distance and consequences of a fall. This includes safety nets, airbags, and personal fall arrest systems.</p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                This hierarchy is not optional. You must work through each step in order and only move to
                the next when the previous step is not reasonably practicable. Using a harness (Step 3)
                when a mobile tower with guardrails (Step 2) could have been used is a breach of the
                Regulations.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">Examples of Avoiding Height</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Assembling components at ground level then lifting into position</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Using extendable tools to reach high areas from ground level</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Designing buildings with ground-level maintenance access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Lowering light fittings on winch systems for re-lamping</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-400 mb-2">Examples of Preventing Falls</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Mobile scaffold towers with guardrails and toe boards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Fixed scaffolding with edge protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Mobile elevating work platforms (MEWPs)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Permanent guardrail systems on flat roofs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Duty to Plan, Supervise, and Use Competent Persons */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Duty to Plan, Supervise & Use Competent Persons
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Regulation 4 places three fundamental duties on employers and those who control work at
                height. These duties apply to every instance of work at height, no matter how short the
                duration or how low the height.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Regulation 4 &mdash; The Three Duties</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-teal-400">1. Properly Planned</p>
                    <p className="text-sm text-white/80">Every activity involving work at height must be properly planned, including selecting the right equipment, identifying hazards, assessing risks, planning the sequence of work, and establishing emergency and rescue procedures.</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-teal-400">2. Appropriately Supervised</p>
                    <p className="text-sm text-white/80">The degree of supervision must match the level of risk and the competence of those carrying out the work. Trainees and less experienced workers require closer supervision.</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-teal-400">3. Carried Out by Competent Persons</p>
                    <p className="text-sm text-white/80">Anyone involved in work at height must be competent, meaning they have the training, knowledge, experience, and practical ability to carry out the task safely. For mobile towers, this typically means holding a valid PASMA certificate.</p>
                  </div>
                </div>
              </div>

              <p>
                Planning must be proportionate to the complexity and risk of the task. A simple task using
                a low-level platform may need only a brief risk assessment and method statement, whereas
                assembling a complex tower in an exposed location requires detailed planning covering
                ground conditions, wind loads, access routes, and emergency procedures.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Planning Checklist for Tower Work:</strong>
                </p>
                <ul className="text-sm text-white/80 space-y-1 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>What is the task and how long will it take?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>What height is needed and what are the access/egress arrangements?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Is the ground firm, level, and capable of supporting the tower loads?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Are there overhead hazards such as power lines or beams?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>What are the weather conditions and wind exposure?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Who will assemble, inspect, and dismantle the tower?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>What rescue plan exists if someone is injured at height?</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Employer vs Employee Duties */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Employer & Employee Duties
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Work at Height Regulations place distinct duties on employers and employees. Both
                parties must fulfil their respective obligations to ensure work at height is carried out
                safely. Failure by either party can lead to enforcement action, prosecution, and serious
                consequences.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-5 w-5 text-blue-400" />
                    <p className="text-sm font-medium text-blue-400">Employer Duties</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Ensure all work at height is properly planned and organised</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Provide appropriate training and ensure competence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Select suitable work equipment following the hierarchy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Ensure equipment is properly maintained and inspected</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Carry out and act upon risk assessments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Provide adequate supervision proportionate to risk</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Establish emergency and rescue procedures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Ensure the workplace is safe and without risks to health</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-medium text-green-400">Employee Duties</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Follow the systems of work established by the employer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Use work equipment correctly and as trained</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Report any hazards or defects in equipment immediately</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Not misuse or interfere with safety equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Co-operate with the employer on health and safety matters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Attend and engage with training provided</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Report any condition that makes them unfit to work at height</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Follow the method statement and risk assessment for the task</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">Self-Employed Persons</p>
                </div>
                <p className="text-sm text-white/80">
                  If you are self-employed, you have the same duties as both an employer and an employee.
                  You must plan, supervise, and carry out your own work at height safely. You must also
                  ensure you are competent and that your equipment is suitable and properly inspected.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Schedule 5 Inspection Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Schedule 5: Scaffold Inspection Requirements
          </h2>
          <div className="border-l-2 border-cyan-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Schedule 5 of the Work at Height Regulations sets out specific inspection requirements for
                scaffolding, which includes mobile scaffold towers. These requirements are in addition to
                the general duty to maintain and inspect work equipment. Non-compliance with Schedule 5 is
                a criminal offence.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">When Must a Tower Be Inspected?</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-white">1. Before first use on site</strong> &mdash; Every time a tower is erected on a new site or in a new location, it must be inspected before anyone works from it.</p>
                  <p><strong className="text-white">2. After substantial alteration</strong> &mdash; Any change to the tower configuration, such as adding height or relocating, requires a fresh inspection.</p>
                  <p><strong className="text-white">3. After adverse events</strong> &mdash; Any event likely to have affected the tower's stability or structural integrity (e.g. storm, impact, subsidence) triggers an inspection.</p>
                  <p><strong className="text-white">4. At regular intervals</strong> &mdash; If the tower remains erected, it must be inspected at intervals not exceeding 7 days.</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">What Must the Inspection Record Include?</p>
                </div>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Name and address of the person for whom the inspection was carried out</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Location and description of the scaffold (including the type of tower)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Date and time of the inspection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Details of any matter identified that could give rise to risk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Details of any action taken as a result of the inspection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Details of any further action considered necessary</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Name and position of the person carrying out the inspection</span>
                  </li>
                </ul>
              </div>

              <p>
                Inspection records must be kept on site until the work is completed, and then retained for
                a minimum of 3 months after that. The HSE can request to see these records at any time.
                Failure to produce records when requested is an offence.
              </p>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-red-400 mb-2">Common Compliance Failures</p>
                <ul className="text-sm text-white/80 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>No written inspection records kept on site</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Inspections not carried out by a competent person</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Tower used after modification without re-inspection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>7-day inspection intervals exceeded</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Defects identified but not rectified before continued use</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Risk Assessment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Risk Assessment Requirements
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Regulation 3 requires that every employer must ensure that a suitable and sufficient risk
                assessment is carried out for all work at height activities. The risk assessment must
                identify the hazards, evaluate the risks, and determine what control measures are needed.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Five-Step Risk Assessment for Tower Work</p>
                <div className="space-y-2 text-sm text-white/80">
                  <p><strong className="text-elec-yellow">Step 1:</strong> Identify the hazards &mdash; ground conditions, overhead obstructions, weather, proximity to traffic or pedestrians, electrical hazards.</p>
                  <p><strong className="text-elec-yellow">Step 2:</strong> Decide who might be harmed &mdash; tower users, passers-by, other workers in the area.</p>
                  <p><strong className="text-elec-yellow">Step 3:</strong> Evaluate the risks &mdash; consider likelihood and severity, determine if existing controls are adequate.</p>
                  <p><strong className="text-elec-yellow">Step 4:</strong> Record findings &mdash; document the hazards, who is at risk, and what controls are in place.</p>
                  <p><strong className="text-elec-yellow">Step 5:</strong> Review and update &mdash; review the assessment regularly and whenever conditions change.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Common Tower Hazards</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Unstable or soft ground causing sinking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Overhead power lines or building services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Wind exposure exceeding safe limits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Vehicle or pedestrian movements nearby</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Uneven or sloping ground surfaces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Manual handling during assembly</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Typical Control Measures</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Base plates and sole boards on soft ground</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Exclusion zones around overhead hazards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Wind speed monitoring with anemometer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Barriers and signage to protect from traffic</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Adjustable legs for uneven ground</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Team lifts and mechanical aids for components</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Reasonably Practicable */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            What Does "Reasonably Practicable" Mean?
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Many duties under the Work at Height Regulations are qualified by the phrase "so far as
                is reasonably practicable." This is a legal test that has been defined by case law over
                many decades and is central to understanding your obligations.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Legal Test:</strong> You must weigh the degree of
                  risk on one side against the sacrifice needed to avert it (in terms of money, time, and
                  trouble) on the other. If the risk is significant, the cost of prevention must be
                  <strong> grossly disproportionate</strong> to the risk before you can justify not taking action.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-400 mb-2">Reasonably Practicable &mdash; YES</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Using a tower instead of a ladder for a 3-hour task</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Providing PASMA training for regular tower users</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Using outriggers on a tower near its maximum height</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Moving the tower rather than over-reaching</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">NOT Reasonably Practicable</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Claiming training is too expensive for a busy workforce</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Skipping inspections because the tower "looks fine"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Using a ladder because tower assembly "takes too long"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Ignoring wind warnings because the job is nearly finished</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                The burden of proof sits with the duty holder. If prosecuted, you must demonstrate that
                it was not reasonably practicable to do more than you did. The HSE does not have to prove
                that it was reasonably practicable &mdash; you must prove that it was not.
              </p>
            </div>
          </div>
        </section>

        {/* Section 08: Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">08</span>
            Practical On-Site Guidance
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="h-5 w-5 text-teal-400" />
                    <p className="text-sm font-medium text-teal-400">Before Starting Tower Work</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Complete a site-specific risk assessment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Check the competence of all personnel involved</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Verify the ground conditions can support the tower</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Confirm the tower is suitable for the task and location</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Check for overhead obstructions and services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Ensure rescue procedures are in place</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <ClipboardList className="h-5 w-5 text-amber-400" />
                    <p className="text-sm font-medium text-amber-400">Documentation You Need</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Risk assessment for the specific task</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Method statement covering assembly and use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Tower inspection records (Schedule 5)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>PASMA certificates for all tower users</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Manufacturer's instruction manual on site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Rescue plan documentation</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <p className="text-sm font-medium text-orange-400">HSE Enforcement</p>
                </div>
                <p className="text-sm text-white/80">
                  The HSE takes work at height very seriously. Falls from height remain the single largest
                  cause of workplace fatalities in the UK. Inspectors have the power to issue improvement
                  notices, prohibition notices (stopping work immediately), and prosecute for serious
                  breaches. Fines for work-at-height offences can be unlimited, and individuals can face
                  imprisonment for the most serious cases.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Section 1 Knowledge Check"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ipaf-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../ipaf-module-1-section-2">
              Next: HSWA 1974 & CDM 2015
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
