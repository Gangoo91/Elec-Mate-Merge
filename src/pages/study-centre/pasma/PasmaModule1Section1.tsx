import { ArrowLeft, Scale, CheckCircle, AlertTriangle, Shield, Users, ClipboardList, Gavel } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "pasma-wahr-hierarchy",
    question: "What is the first step in the WAHR 2005 hierarchy of control for work at height?",
    options: [
      "Avoid work at height altogether where possible",
      "Use collective fall prevention such as guardrails",
      "Provide personal fall protection equipment",
      "Minimise the distance and consequences of a fall"
    ],
    correctIndex: 0,
    explanation: "The Work at Height Regulations 2005 require you to avoid work at height wherever reasonably practicable before considering any other measure. This is the top priority in the three-step hierarchy."
  },
  {
    id: "pasma-hswa-section2",
    question: "Under HSWA 1974 Section 2, who has the primary duty to ensure workplace health and safety?",
    options: [
      "The Health and Safety Executive",
      "The employee carrying out the work",
      "The employer",
      "The local authority"
    ],
    correctIndex: 2,
    explanation: "Section 2 of the Health and Safety at Work etc. Act 1974 places the primary duty on the employer to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all employees."
  },
  {
    id: "pasma-schedule5-interval",
    question: "How often must a mobile tower be inspected under Schedule 5 if it remains erected on site?",
    options: [
      "Every 3 days",
      "Every 5 days",
      "Every 7 days",
      "Every 14 days"
    ],
    correctIndex: 2,
    explanation: "Schedule 5 of the Work at Height Regulations 2005 requires that scaffolding, including mobile towers, must be inspected at intervals not exceeding 7 days if it remains erected on site."
  }
];

const faqs = [
  {
    question: "Do the Work at Height Regulations apply to mobile scaffold towers?",
    answer: "Yes. Mobile scaffold towers are classified as work equipment used for work at height and fall squarely within the scope of the Work at Height Regulations 2005. The Regulations require proper planning, supervision, use of competent persons, and compliance with Schedule 5 inspection requirements for all scaffolding, including mobile towers."
  },
  {
    question: "Is there a minimum height that triggers the Work at Height Regulations?",
    answer: "No. There is no minimum height threshold. The Regulations apply to all work at height where a person could fall a distance liable to cause personal injury, regardless of whether that is half a metre or ten metres. Even stepping onto a single platform board constitutes work at height."
  },
  {
    question: "What is the difference between HSWA 1974 and WAHR 2005?",
    answer: "The Health and Safety at Work etc. Act 1974 is the overarching primary legislation that sets out general duties for employers, employees, and the self-employed across all workplace activities. The Work at Height Regulations 2005 are secondary legislation made under HSWA 1974 and deal specifically with the risks of working at height, including the hierarchy of control and scaffold inspection duties."
  },
  {
    question: "How long must Schedule 5 inspection records be kept?",
    answer: "Inspection records must be kept on site until the work is completed, and then retained for a minimum of 3 months after that. The HSE can request to see these records at any time, and failure to produce them when requested is a criminal offence."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What year did the Work at Height Regulations come into force?",
    options: ["2000", "2003", "2005", "2007"],
    correctAnswer: 2,
    explanation: "The Work at Height Regulations came into force on 6 April 2005 and apply across England, Wales, and Scotland."
  },
  {
    id: 2,
    question: "Which of the following is the CORRECT hierarchy of control under Regulation 6?",
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
    question: "Which HSWA 1974 section places a duty on employees to take reasonable care of themselves and others?",
    options: [
      "Section 2",
      "Section 3",
      "Section 7",
      "Section 8"
    ],
    correctAnswer: 2,
    explanation: "Section 7 of HSWA 1974 requires every employee to take reasonable care for the health and safety of themselves and of other persons who may be affected by their acts or omissions at work."
  },
  {
    id: 4,
    question: "Under Schedule 5, which of the following triggers a mandatory tower inspection?",
    options: [
      "A change of operative using the tower",
      "An event likely to have affected the tower's stability",
      "A tea break lasting more than 30 minutes",
      "A new subcontractor arriving on site"
    ],
    correctAnswer: 1,
    explanation: "Schedule 5 requires inspection after any event likely to have affected the tower's stability, such as severe weather, impact damage, or ground movement."
  },
  {
    id: 5,
    question: "What type of notice can an HSE inspector serve to stop work immediately?",
    options: [
      "Improvement notice",
      "Prohibition notice",
      "Warning notice",
      "Advisory notice"
    ],
    correctAnswer: 1,
    explanation: "A prohibition notice requires that the activity is stopped immediately (or not started) because the inspector believes there is a risk of serious personal injury. An improvement notice allows time to remedy a breach."
  },
  {
    id: 6,
    question: "Under HSWA 1974 Section 8, what is it an offence to do?",
    options: [
      "Work more than 8 hours at height",
      "Refuse to carry out a risk assessment",
      "Intentionally or recklessly interfere with or misuse safety provisions",
      "Fail to display a health and safety poster"
    ],
    correctAnswer: 2,
    explanation: "Section 8 of HSWA 1974 makes it an offence for any person to intentionally or recklessly interfere with or misuse anything provided in the interests of health, safety, or welfare."
  },
  {
    id: 7,
    question: "What does 'reasonably practicable' mean in the context of the Work at Height Regulations?",
    options: [
      "You must eliminate every risk regardless of cost",
      "You only need to act when the HSE tells you to",
      "You must balance the level of risk against the cost of reducing it",
      "You must follow the most expensive control measure available"
    ],
    correctAnswer: 2,
    explanation: "Reasonably practicable requires you to weigh the degree of risk against the sacrifice needed to avert it. If the risk is significant, the cost of prevention must be grossly disproportionate before inaction is justified."
  },
  {
    id: 8,
    question: "Falls from height are the number one cause of what in UK workplaces?",
    options: [
      "Minor injuries",
      "Workplace fatalities",
      "RIDDOR reports",
      "Insurance claims"
    ],
    correctAnswer: 1,
    explanation: "Falls from height remain the single largest cause of workplace fatalities in the United Kingdom, which is why the Work at Height Regulations impose strict duties on all parties involved."
  }
];

export default function PasmaModule1Section1() {
  useSEO({
    title: "Work at Height Regs & HSWA 1974 | PASMA Module 1.1",
    description: "Work at Height Regulations 2005 hierarchy of control, HSWA 1974 Sections 2, 3, 7 and 8, Schedule 5 inspection requirements, employer and employee duties, HSE enforcement powers.",
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
            <Link to="../pasma-module-1">
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
            Work at Height Regulations & HSWA 1974
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The primary legislation governing work at height in Great Britain and the overarching duties under the Health and Safety at Work etc. Act 1974
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Hierarchy:</strong> Avoid &rarr; Prevent &rarr; Mitigate falls</li>
              <li><strong>HSWA 1974:</strong> Employer &amp; employee duties</li>
              <li><strong>Schedule 5:</strong> Inspect towers before use and every 7 days</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Before:</strong> Plan work, assess risks, select equipment</li>
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
              "Explain the WAHR 2005 hierarchy of control",
              "Describe HSWA 1974 Sections 2, 3, 7 and 8",
              "Understand Schedule 5 inspection requirements",
              "Define 'reasonably practicable' in practice",
              "Identify employer and employee duties",
              "Know the enforcement powers of the HSE"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: What Are the Work at Height Regulations 2005? */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            What Are the Work at Height Regulations 2005?
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Work at Height Regulations 2005 (WAHR) came into force on 6 April 2005 and apply across
                England, Wales, and Scotland. They replaced a patchwork of older legislation &mdash; including
                parts of the Construction (Health, Safety and Welfare) Regulations 1996 &mdash; and consolidated
                all work-at-height duties into a single, clear framework.
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
                others. This means principal contractors, facilities managers, and site supervisors all have
                duties under WAHR, not just the person physically working at height.
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

              <p>
                Importantly, the Regulations apply to all work at height where there is a risk of a fall
                liable to cause personal injury. This includes work from ladders, stepladders, scaffolding,
                mobile towers, roofs, fragile surfaces, and any other elevated position.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02: The Hierarchy of Control */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            The Hierarchy of Control (Regulation 6)
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

        {/* Section 03: HSWA 1974 Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            HSWA 1974 Overview
          </h2>
          <div className="border-l-2 border-teal-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Health and Safety at Work etc. Act 1974 (HSWA) is the primary piece of legislation
                covering occupational health and safety in Great Britain. It is an enabling Act, meaning
                it provides the framework under which more specific regulations &mdash; including the
                Work at Height Regulations 2005 &mdash; are made.
              </p>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-elec-yellow mb-3">Key Sections for Tower Work</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-white">Section 2 &mdash; Employer&rsquo;s General Duties</p>
                    <p className="text-sm text-white/80">Every employer must ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all employees. This includes providing safe systems of work, safe equipment, adequate training, and a safe working environment.</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Section 3 &mdash; Duty to Non-Employees</p>
                    <p className="text-sm text-white/80">Employers and the self-employed must conduct their undertaking in such a way as to ensure, so far as is reasonably practicable, that persons not in their employment are not exposed to risks to their health or safety. This covers members of the public, visitors, and other contractors on site.</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Section 7 &mdash; Employee Duties</p>
                    <p className="text-sm text-white/80">Every employee must take reasonable care for the health and safety of themselves and of other persons who may be affected by their acts or omissions at work. They must also co-operate with their employer on health and safety matters.</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Section 8 &mdash; Interference with Safety Provisions</p>
                    <p className="text-sm text-white/80">No person shall intentionally or recklessly interfere with or misuse anything provided in the interests of health, safety, or welfare. Removing guardrails from a tower or disabling a safety device are examples of Section 8 offences.</p>
                  </div>
                </div>
              </div>

              <p>
                HSWA 1974 applies to all workplaces, not just construction sites. Whether you are erecting
                a tower in a factory, warehouse, school, or office building, the Act&rsquo;s duties apply
                in full.
              </p>
            </div>
          </div>
        </section>

        {/* Section 04: Employer & Employee Responsibilities */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Employer &amp; Employee Responsibilities
          </h2>
          <div className="border-l-2 border-red-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Both HSWA 1974 and the Work at Height Regulations place distinct duties on employers and
                employees. Both parties must fulfil their respective obligations to ensure work at height
                is carried out safely. Failure by either party can lead to enforcement action, prosecution,
                and serious consequences.
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
                      <span>Report any condition that makes them unfit for height work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Follow the method statement and risk assessment</span>
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
                  Under Section 3 of HSWA 1974, you must also protect others who may be affected by
                  your work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Schedule 5 Scaffold Inspection Requirements */}
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
                  <p><strong className="text-white">2. After substantial alteration</strong> &mdash; Any change to the tower configuration, such as adding or removing height, requires a fresh inspection.</p>
                  <p><strong className="text-white">3. After adverse events</strong> &mdash; Any event likely to have affected stability or structural integrity (e.g. storm, impact, subsidence) triggers an inspection.</p>
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
                a minimum of <strong>3 months</strong> after that. The HSE can request to see these records
                at any time. Failure to produce records when requested is an offence.
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

        {/* Section 06: Enforcement & Penalties */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Enforcement &amp; Penalties
          </h2>
          <div className="border-l-2 border-elec-yellow/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The Health and Safety Executive (HSE) is the primary enforcement body for health and safety
                legislation in Great Britain. HSE inspectors have extensive powers to enter premises, examine
                work activities, and take enforcement action where breaches are found.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Gavel className="h-5 w-5 text-elec-yellow" />
                  <p className="text-sm font-medium text-elec-yellow">HSE Enforcement Powers</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-amber-400">Improvement Notice</p>
                    <p className="text-sm text-white/80">Issued when the inspector believes a legal provision is being contravened. Specifies the breach and sets a time limit (minimum 21 days) for the duty holder to remedy it.</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-400">Prohibition Notice</p>
                    <p className="text-sm text-white/80">Issued when the inspector believes there is a risk of serious personal injury. Requires the activity to be stopped immediately. Can be served even if no legal breach has yet occurred.</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-400">Prosecution</p>
                    <p className="text-sm text-white/80">For serious breaches, the HSE can prosecute individuals and organisations in the criminal courts. Fines are unlimited in the Crown Court, and individuals can face imprisonment for the most serious offences.</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">The Human Cost</p>
                </div>
                <p className="text-sm text-white/80">
                  Falls from height remain the <strong>number one cause of workplace fatalities</strong> in
                  the United Kingdom. In the construction sector alone, falls from height account for
                  approximately 50% of all fatal injuries. This is precisely why the HSE takes work at
                  height enforcement so seriously and why penalties can be severe.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Penalties for Organisations</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Unlimited fines in the Crown Court</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Sentencing guidelines consider turnover</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Publicity orders naming the offender</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Remediation orders requiring corrective action</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Penalties for Individuals</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Unlimited fines</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Imprisonment (up to 2 years for most offences)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Disqualification as a company director</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Personal criminal record</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Practical Application */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">07</span>
            Practical Application
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding the law is only useful if you can apply it on site. Here is a practical
                breakdown of what the legislation means for your day-to-day work with mobile scaffold
                towers.
              </p>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-teal-400 mb-2">Before Tower Work</p>
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
                      <span>Verify ground conditions can support the tower</span>
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
                  <p className="text-sm font-medium text-amber-400 mb-2">During Tower Work</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Supervise the assembly and use of the tower</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Inspect before each shift and after any incident</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Monitor weather conditions throughout the day</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Ensure only authorised persons access the platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Report and address any defects immediately</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                      <span>Maintain inspection records in writing</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="h-5 w-5 text-cyan-400" />
                  <p className="text-sm font-medium text-cyan-400">Documentation Needed on Site</p>
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
                    <span>Tower inspection records (Schedule 5 compliant)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>PASMA certificates for all tower users and assemblers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Manufacturer&rsquo;s instruction manual on site</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
                    <span>Rescue plan documentation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-elec-yellow/10 border border-elec-yellow/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-elec-yellow">Reasonably Practicable in Practice:</strong> The
                  burden of proof sits with the duty holder. If prosecuted, you must demonstrate that it
                  was not reasonably practicable to do more than you did. The HSE does not have to prove
                  that it was reasonably practicable &mdash; you must prove that it was not. Always
                  document your decisions and the rationale behind them.
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
            <Link to="../pasma-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../pasma-module-1-section-2">
              Next: EN 1004:2020 &amp; BS 1139-6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}