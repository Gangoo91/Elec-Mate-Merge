import { ArrowLeft, Scale, CheckCircle, AlertTriangle, Shield, FileText, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "mh-mhor-hierarchy",
    question: "What is the correct order of the duty hierarchy under the Manual Handling Operations Regulations 1992?",
    options: [
      "Reduce risk, then assess, then avoid, then provide information",
      "Avoid hazardous manual handling, then assess, then reduce risk, then provide information",
      "Assess first, then avoid, then reduce, then inform",
      "Provide information, then assess, then avoid, then reduce"
    ],
    correctIndex: 1,
    explanation: "The MHOR 1992 establishes a clear hierarchy: (1) Avoid hazardous manual handling operations so far as is reasonably practicable (Reg. 4(1)(a)); (2) Assess any hazardous manual handling that cannot be avoided (Reg. 4(1)(b)(i)); (3) Reduce the risk of injury so far as is reasonably practicable (Reg. 4(1)(b)(ii)); (4) Provide information on the weight and heaviest side of loads (Reg. 4(1)(b)(iii))."
  },
  {
    id: "mh-hasawa-section7",
    question: "Under Section 7 of the Health and Safety at Work Act 1974, what is the general duty of an employee?",
    options: [
      "To carry out risk assessments for every task",
      "To take reasonable care for their own health and safety and that of others, and to cooperate with their employer",
      "To refuse all manual handling tasks",
      "To provide personal protective equipment at their own expense"
    ],
    correctIndex: 1,
    explanation: "Section 7 of HASAWA 1974 places a duty on every employee to take reasonable care for their own health and safety and that of other persons who may be affected by their acts or omissions at work. They must also cooperate with their employer so far as is necessary to enable the employer to comply with health and safety duties."
  },
  {
    id: "mh-employer-duty",
    question: "Which of the following is an employer duty under the Manual Handling Operations Regulations 1992?",
    options: [
      "To ban all manual handling from the workplace entirely",
      "To ensure employees never lift more than 15 kg",
      "To avoid hazardous manual handling so far as is reasonably practicable",
      "To provide all employees with back support belts"
    ],
    correctIndex: 2,
    explanation: "Regulation 4(1)(a) requires employers to avoid hazardous manual handling operations so far as is reasonably practicable. This does not mean banning all manual handling — it means finding alternative methods (mechanical aids, redesigning the task, or eliminating the need) wherever it is reasonably practicable to do so. Where avoidance is not possible, the employer must assess and reduce the risk."
  }
];

const faqs = [
  {
    question: "What is the difference between the MHOR 1992 and the Health and Safety at Work Act 1974?",
    answer: "The Health and Safety at Work Act 1974 is primary legislation — it establishes the overarching legal framework for all workplace health and safety in Great Britain and sets general duties on employers and employees. The Manual Handling Operations Regulations 1992 are secondary legislation (regulations) made under the Act — they provide specific, detailed requirements for the particular hazard of manual handling. The MHOR 1992 sits within the framework of HASAWA 1974, and a breach of either can result in criminal prosecution."
  },
  {
    question: "Can an employee refuse to carry out a manual handling task they consider dangerous?",
    answer: "Yes. Under Section 7 of HASAWA 1974, employees have a duty to take reasonable care for their own health and safety. If an employee reasonably believes that a manual handling task poses a serious risk of injury — for example, if no risk assessment has been carried out, the load is clearly too heavy for one person, or the working conditions are unsafe — they have the right to raise their concerns and refuse the task. Employers cannot lawfully discipline an employee for raising a genuine health and safety concern. The employee should report their concern to their supervisor, site manager, or health and safety representative."
  },
  {
    question: "Do the Manual Handling Operations Regulations apply to self-employed workers?",
    answer: "Yes. The MHOR 1992 apply to self-employed workers in relation to their own safety and the safety of others who may be affected by their work. A self-employed electrician must apply the same hierarchy — avoid, assess, reduce, inform — to their own manual handling tasks. They must also cooperate with any duty holders on multi-contractor sites where manual handling operations are coordinated."
  },
  {
    question: "What happens if an employer fails to comply with the Manual Handling Operations Regulations?",
    answer: "Failure to comply with the MHOR 1992 is a criminal offence under the Health and Safety at Work Act 1974. The HSE or local authority can issue Improvement Notices (requiring action within a set timeframe), Prohibition Notices (immediately stopping an activity), or prosecute the employer. Penalties include unlimited fines for organisations and up to two years imprisonment for individuals. In addition, injured workers may pursue civil claims for compensation. The HSE also applies the Fee for Intervention (FFI) scheme, charging duty holders for the time spent investigating material breaches."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "The Manual Handling Operations Regulations 1992 are an example of:",
    options: [
      "Primary legislation (an Act of Parliament)",
      "Secondary legislation (regulations made under HASAWA 1974)",
      "An Approved Code of Practice",
      "HSE guidance"
    ],
    correctAnswer: 1,
    explanation: "The MHOR 1992 are secondary legislation — regulations (a Statutory Instrument) made under the Health and Safety at Work Act 1974. They provide specific, legally binding requirements for managing manual handling risks."
  },
  {
    id: 2,
    question: "Which Regulation of the MHOR 1992 requires employers to avoid hazardous manual handling so far as is reasonably practicable?",
    options: [
      "Regulation 2",
      "Regulation 3",
      "Regulation 4(1)(a)",
      "Regulation 5"
    ],
    correctAnswer: 2,
    explanation: "Regulation 4(1)(a) of the MHOR 1992 requires each employer to avoid the need for their employees to undertake any manual handling operations at work which involve a risk of their being injured, so far as is reasonably practicable."
  },
  {
    id: 3,
    question: "Under Section 2 of the Health and Safety at Work Act 1974, what is the general duty of an employer?",
    options: [
      "To eliminate all workplace risks completely",
      "To ensure, so far as is reasonably practicable, the health, safety, and welfare of employees",
      "To carry out a risk assessment once a year",
      "To provide personal protective equipment for every task"
    ],
    correctAnswer: 1,
    explanation: "Section 2(1) of HASAWA 1974 places a general duty on every employer to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all their employees. This overarching duty encompasses all workplace hazards, including manual handling."
  },
  {
    id: 4,
    question: "The Management of Health and Safety at Work Regulations 1999 require employers to:",
    options: [
      "Only assess risks when a manual handling injury occurs",
      "Carry out a suitable and sufficient assessment of all workplace risks",
      "Only assess manual handling risks for loads over 25 kg",
      "Delegate all risk assessment to employees"
    ],
    correctAnswer: 1,
    explanation: "Regulation 3 of the Management of Health and Safety at Work Regulations 1999 requires every employer to carry out a suitable and sufficient assessment of the risks to the health and safety of their employees, and of any other person who may be affected. This includes all manual handling risks, regardless of load weight."
  },
  {
    id: 5,
    question: "Which of the following is an employee duty under the MHOR 1992 and HASAWA 1974?",
    options: [
      "To carry out formal risk assessments for every task",
      "To use equipment provided and follow safe systems of work",
      "To purchase their own manual handling equipment",
      "To never handle any load weighing more than 20 kg"
    ],
    correctAnswer: 1,
    explanation: "Employees have a duty under Regulation 5 of the MHOR 1992 to make full and proper use of any system of work provided by their employer. Under Section 7 of HASAWA 1974, they must take reasonable care for their own safety, cooperate with their employer, and use equipment in accordance with training."
  },
  {
    id: 6,
    question: "The correct hierarchy of duties under the MHOR 1992 is:",
    options: [
      "Assess > Avoid > Reduce > Inform",
      "Inform > Assess > Reduce > Avoid",
      "Avoid > Assess > Reduce > Inform",
      "Reduce > Avoid > Inform > Assess"
    ],
    correctAnswer: 2,
    explanation: "The MHOR 1992 establishes a clear hierarchy: (1) Avoid hazardous manual handling where reasonably practicable; (2) Assess any hazardous manual handling that cannot be avoided; (3) Reduce the risk of injury so far as is reasonably practicable; (4) Provide general indications and precise information on the weight and centre of gravity of loads."
  },
  {
    id: 7,
    question: "Under Regulation 4(1)(b)(iii) of the MHOR 1992, employers must provide employees with:",
    options: [
      "Free gym membership to improve fitness",
      "General indications and, where reasonably practicable, precise information on the weight of loads and the heaviest side of loads with an off-centre centre of gravity",
      "A written guarantee that no manual handling will be required",
      "Mechanical aids for every manual handling task"
    ],
    correctAnswer: 1,
    explanation: "Regulation 4(1)(b)(iii) requires employers to provide employees with general indications and, where it is reasonably practicable to do so, precise information on the weight of each load and the heaviest side of any load whose centre of gravity is not positioned centrally. This enables workers to plan lifts and use appropriate techniques."
  },
  {
    id: 8,
    question: "Section 7 of the Health and Safety at Work Act 1974 places a duty on:",
    options: [
      "Employers only",
      "The Health and Safety Executive",
      "Every employee at work",
      "Building designers and architects"
    ],
    correctAnswer: 2,
    explanation: "Section 7 of HASAWA 1974 places a duty on every employee at work. They must (a) take reasonable care for their own health and safety and that of others who may be affected by their acts or omissions, and (b) cooperate with their employer or any other person so far as is necessary to enable compliance with health and safety requirements."
  }
];

export default function ManualHandlingModule1Section2() {
  useSEO({
    title: "The Legal Framework | Manual Handling Module 1.2",
    description: "MHOR 1992, HASAWA 1974, Management Regulations 1999, employer and employee duties, and the hierarchy of control for manual handling.",
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
            <Link to="../manual-handling-module-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30 mb-4">
            <Scale className="h-7 w-7 text-emerald-500" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-500 text-xs font-semibold">MODULE 1 &middot; SECTION 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The Legal Framework
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            The regulations, duties, and hierarchy of control that govern manual handling in UK workplaces
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-500 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Key regs:</strong> MHOR 1992, HASAWA 1974, Management Regs 1999</li>
              <li><strong>Hierarchy:</strong> Avoid &rarr; Assess &rarr; Reduce &rarr; Inform</li>
              <li><strong>Employer:</strong> Must avoid, assess, and reduce MH risks</li>
              <li><strong>Employee:</strong> Must use equipment provided, follow training, report problems</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">Key Regulations</p>
            <ul className="text-base text-white space-y-1.5">
              <li><strong>Reg 4(1)(a):</strong> Avoid hazardous MH where practicable</li>
              <li><strong>Reg 4(1)(b)(i):</strong> Assess unavoidable MH operations</li>
              <li><strong>Reg 4(1)(b)(ii):</strong> Reduce risk of injury SFAIRP</li>
              <li><strong>Reg 4(1)(b)(iii):</strong> Provide weight and load information</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Identify the key legislation governing manual handling in UK workplaces",
              "Describe the hierarchy of duties under the MHOR 1992 (Regulations 2-5)",
              "Explain the general duties under the Health and Safety at Work Act 1974",
              "Outline the role of the Management of Health and Safety at Work Regulations 1999",
              "Distinguish between employer duties and employee duties for manual handling",
              "Explain the meaning of 'so far as is reasonably practicable' (SFAIRP)"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-500/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* MHOR 1992 Hierarchy Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">&mdash;</span>
            MHOR 1992 Hierarchy of Duties
          </h2>
          <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
            <p className="text-sm text-white/60 mb-6 text-center">The regulations establish a clear hierarchy that must be followed in order</p>

            <div className="max-w-md mx-auto space-y-3">
              {/* Step 1: Avoid */}
              <div className="bg-emerald-500/20 border-2 border-emerald-500/50 rounded-xl p-4 text-center">
                <p className="text-xs font-bold text-emerald-400 mb-1">STEP 1 &mdash; REGULATION 4(1)(a)</p>
                <p className="text-sm font-semibold text-white">AVOID</p>
                <p className="text-xs text-white/60 mt-1">Avoid hazardous manual handling operations so far as is reasonably practicable</p>
                <p className="text-[10px] text-white/40 mt-0.5">Use mechanical aids, redesign the task, eliminate the need to handle the load</p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-emerald-500/30" />
              </div>

              {/* Step 2: Assess */}
              <div className="bg-blue-500/15 border-2 border-blue-500/40 rounded-xl p-4 text-center">
                <p className="text-xs font-bold text-blue-400 mb-1">STEP 2 &mdash; REGULATION 4(1)(b)(i)</p>
                <p className="text-sm font-semibold text-white">ASSESS</p>
                <p className="text-xs text-white/60 mt-1">Make a suitable and sufficient assessment of any remaining hazardous operations</p>
                <p className="text-[10px] text-white/40 mt-0.5">Use the TILE framework: Task, Individual, Load, Environment</p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-blue-500/30" />
              </div>

              {/* Step 3: Reduce */}
              <div className="bg-amber-500/15 border-2 border-amber-500/40 rounded-xl p-4 text-center">
                <p className="text-xs font-bold text-amber-400 mb-1">STEP 3 &mdash; REGULATION 4(1)(b)(ii)</p>
                <p className="text-sm font-semibold text-white">REDUCE</p>
                <p className="text-xs text-white/60 mt-1">Take appropriate steps to reduce the risk of injury to the lowest level reasonably practicable</p>
                <p className="text-[10px] text-white/40 mt-0.5">Reduce load weight, improve posture, provide training, use team lifts, modify the task</p>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-0.5 h-6 bg-amber-500/30" />
              </div>

              {/* Step 4: Inform */}
              <div className="bg-purple-500/15 border-2 border-purple-500/40 rounded-xl p-4 text-center">
                <p className="text-xs font-bold text-purple-400 mb-1">STEP 4 &mdash; REGULATION 4(1)(b)(iii)</p>
                <p className="text-sm font-semibold text-white">INFORM</p>
                <p className="text-xs text-white/60 mt-1">Provide general indications and, where practicable, precise information on load weight and centre of gravity</p>
                <p className="text-[10px] text-white/40 mt-0.5">Label loads, brief workers, mark heaviest side of asymmetric loads</p>
              </div>
            </div>

            <p className="text-center text-white/40 text-xs mt-4">
              Each step must be fully considered before moving to the next &mdash; avoidance takes priority over assessment, which takes priority over reduction
            </p>
          </div>
        </section>

        {/* Section 01: Manual Handling Operations Regulations 1992 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">01</span>
            Manual Handling Operations Regulations 1992
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Manual Handling Operations Regulations 1992</strong> (MHOR 1992, as amended
                2002) are the principal regulations governing manual handling in all UK workplaces. They
                were made under the Health and Safety at Work Act 1974 and implement European Council
                Directive 90/269/EEC. The regulations apply to <strong>all employers, employees, and
                self-employed persons</strong> across every industry.
              </p>

              <p>
                The core of the regulations is contained in <strong>Regulations 2 through 5</strong>,
                which establish definitions, duties on employers, the assessment process, and duties
                on employees.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Key Regulations</p>
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <div>
                    <p className="text-white font-medium">Regulation 2 &mdash; Interpretation (Definitions)</p>
                    <p>Defines key terms including &ldquo;manual handling operations&rdquo; (transporting
                      or supporting a load by hand or bodily force), &ldquo;load&rdquo; (any discrete
                      movable object, including a person and an animal), and &ldquo;injury&rdquo;
                      (injury to any part of the body, not limited to the back). These definitions
                      establish the scope of the regulations.</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Regulation 3 &mdash; Disapplication of Regulations</p>
                    <p>Provides limited exemptions. The regulations do not apply to or in relation to
                      the master or crew of a sea-going ship. In all other workplaces and industries,
                      the regulations apply in full.</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Regulation 4 &mdash; Duties of Employers</p>
                    <p>The central provision. Establishes the four-step hierarchy that employers must
                      follow: (a) avoid hazardous manual handling so far as is reasonably practicable;
                      (b)(i) where avoidance is not possible, assess the risk; (b)(ii) take appropriate
                      steps to reduce the risk; (b)(iii) provide information on load weight and
                      characteristics. Regulation 4(2) requires employers to review assessments when
                      there is reason to suspect they are no longer valid.</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Regulation 5 &mdash; Duties of Employees</p>
                    <p>Requires each employee, while at work, to make full and proper use of any system
                      of work provided for their use by their employer in compliance with Regulation 4.
                      This means employees must follow safe systems of work, use mechanical aids when
                      provided, apply correct lifting techniques, and cooperate with their employer.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Schedule 1 &mdash; Factors for Assessment</p>
                <p className="text-sm text-white/80 leading-relaxed mb-3">
                  Schedule 1 of the MHOR 1992 lists the factors that must be considered when carrying
                  out a manual handling assessment. These form the basis of the TILE framework:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-emerald-400 font-semibold text-xs mb-1">The Task</p>
                    <p className="text-white/80 text-xs">Does it involve holding or manipulating loads at a distance from the trunk? Twisting, stooping, or reaching upwards? Large vertical movement? Long carrying distances? Strenuous pushing or pulling? Repetitive handling? Insufficient rest or recovery?</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-emerald-400 font-semibold text-xs mb-1">The Individual</p>
                    <p className="text-white/80 text-xs">Does the task require unusual strength or height? Does it create a hazard for those with a health problem or physical limitation? Does it require special knowledge or training? Is the individual pregnant, recovering from injury, or experiencing fatigue?</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-emerald-400 font-semibold text-xs mb-1">The Load</p>
                    <p className="text-white/80 text-xs">Is it heavy, bulky, difficult to grasp, unstable, or with contents likely to shift? Is it sharp, hot, or otherwise potentially damaging? Is the heaviest side not readily identifiable?</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-emerald-400 font-semibold text-xs mb-1">The Environment</p>
                    <p className="text-white/80 text-xs">Are there space constraints? Is the floor uneven, slippery, or unstable? Are there variations in floor level or working surface? Are temperature, humidity, or ventilation unsuitable? Are lighting conditions poor?</p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Reasonably Practicable</p>
                </div>
                <p className="text-sm text-white/80">
                  The phrase <strong className="text-white">&ldquo;so far as is reasonably
                  practicable&rdquo;</strong> (SFAIRP) appears throughout the regulations and is
                  crucial to understanding how the duties work. It means that the employer must weigh
                  the risk of injury against the sacrifice (in cost, time, and effort) needed to
                  eliminate or reduce that risk. If the risk is significant and the measures to
                  prevent it are reasonable and proportionate, those measures must be implemented. The
                  burden of proof is on the employer to show that it was not reasonably practicable
                  to do more.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Health and Safety at Work Act 1974 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">02</span>
            Health and Safety at Work Act 1974
          </h2>
          <div className="border-l-2 border-blue-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Health and Safety at Work etc. Act 1974</strong> (HASAWA) is the primary
                legislation governing all workplace health and safety in England, Wales, and Scotland.
                It is the foundation upon which the MHOR 1992 and all other health and safety
                regulations are built. Two sections are particularly relevant to manual handling.
              </p>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-400 mb-3">Key Sections</p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[60px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">S.2</span>
                    <div>
                      <p className="text-white font-medium">General duty to employees</p>
                      <p>Every employer must ensure, so far as is reasonably practicable, the health,
                        safety, and welfare at work of all their employees. In the context of manual
                        handling, this includes providing safe systems of work, safe plant and equipment,
                        adequate information, instruction, training, and supervision, and a working
                        environment that is safe and without risks to health.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="flex items-center justify-center min-w-[60px] h-7 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex-shrink-0">S.7</span>
                    <div>
                      <p className="text-white font-medium">Duties of employees</p>
                      <p>Every employee must: (a) take reasonable care for their own health and safety
                        and that of other persons who may be affected by their acts or omissions at
                        work; and (b) cooperate with their employer so far as is necessary to enable
                        the employer to comply with any duty or requirement imposed on them by health
                        and safety law. For manual handling, this means following safe lifting
                        procedures, using mechanical aids when available, reporting hazards and
                        injuries, and not taking unnecessary risks.</p>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The Act also creates duties on <strong>self-employed persons</strong> (Section 3),
                requires employers to prepare a written health and safety policy where they employ five
                or more people (Section 2(3)), and makes it a criminal offence to fail to comply with
                any duty under the Act or regulations made under it (Section 33). Penalties include
                unlimited fines and up to two years&rsquo; imprisonment.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">What Section 2 Means for Manual Handling</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Safe systems of work:</strong> Employers must establish and enforce safe manual handling procedures, including method statements and risk assessments for specific tasks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Safe equipment:</strong> Employers must provide suitable mechanical aids (trolleys, hoists, cable rollers, lifting equipment) to reduce manual handling where practicable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Information and training:</strong> Employers must provide adequate manual handling training, including proper lifting techniques and the use of mechanical aids</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Safe working environment:</strong> The workplace must be maintained so that manual handling can be carried out safely &mdash; clear walkways, good lighting, non-slip floors</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Management Regulations 1999 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">03</span>
            Management of Health &amp; Safety at Work Regulations 1999
          </h2>
          <div className="border-l-2 border-purple-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The <strong>Management of Health and Safety at Work Regulations 1999</strong>
                (commonly called the &ldquo;Management Regulations&rdquo;) provide the general
                framework for risk management in all workplaces. They work alongside the MHOR 1992
                and require employers to take a systematic approach to identifying and controlling
                risks, including those from manual handling.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-5 w-5 text-purple-400" />
                  <p className="text-sm font-medium text-purple-400">Key Requirements</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Regulation 3 &mdash; Risk Assessment:</strong> Every employer must carry out a suitable and sufficient assessment of the risks to the health and safety of their employees and of anyone else affected by their undertaking. For manual handling, this means assessing every task that involves a risk of injury.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Regulation 4 &mdash; Principles of Prevention:</strong> Employers must implement preventive measures based on the general principles of prevention &mdash; avoiding risks, combating risks at source, adapting work to the individual, and giving priority to collective protective measures.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Regulation 5 &mdash; Health and Safety Arrangements:</strong> Employers must have effective arrangements in place for planning, organisation, control, monitoring, and review of preventive and protective measures.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Regulation 10 &mdash; Information for Employees:</strong> Employers must provide employees with comprehensible and relevant information on the risks to their health and safety, and on the preventive and protective measures in place.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Regulation 13 &mdash; Capabilities and Training:</strong> Employers must take into account the capabilities of employees when entrusting tasks to them, and provide adequate health and safety training, including training on manual handling techniques and the use of mechanical aids.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span><strong className="text-white">Regulation 16 &mdash; Risk Assessment for New or Expectant Mothers:</strong> Where an employer employs women of childbearing age and the work could pose a risk to a new or expectant mother, the risk assessment must include specific assessment of manual handling risks.</span>
                  </li>
                </ul>
              </div>

              <p>
                The Management Regulations provide the overarching risk assessment framework within
                which the specific manual handling assessment required by MHOR 1992 Regulation 4 sits.
                In practice, a manual handling risk assessment will satisfy both the requirements of
                MHOR 1992 Regulation 4(1)(b)(i) and the general risk assessment requirements of
                Management Regulations 1999 Regulation 3, provided it is suitable and sufficient.
              </p>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">Practical point:</strong> The five-step risk
                  assessment process recommended by the HSE (identify hazards, decide who might be
                  harmed, evaluate risks, record findings, review and update) applies to manual handling
                  just as it does to all other workplace hazards. The TILE framework (covered in
                  Section 3) provides the structured approach for evaluating manual handling risks
                  specifically.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Employer and Employee Duties */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">04</span>
            Employer and Employee Duties
          </h2>
          <div className="border-l-2 border-amber-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The legal framework places clear and specific duties on both employers and employees.
                Health and safety is a shared responsibility &mdash; employers must create safe
                systems and employees must follow them.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-emerald-400" />
                    <p className="text-emerald-400 font-semibold text-sm">Employer Duties</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Avoid hazardous manual handling where reasonably practicable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Assess any unavoidable hazardous manual handling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Reduce the risk of injury to the lowest reasonably practicable level</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Provide information on load weight and characteristics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Provide suitable mechanical handling aids</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Provide adequate training and instruction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span>Review assessments when conditions change</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-blue-400" />
                    <p className="text-blue-400 font-semibold text-sm">Employee Duties</p>
                  </div>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Use equipment and mechanical aids provided by the employer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Follow safe systems of work and lifting procedures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Apply manual handling training in practice</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Report hazards, near misses, and injuries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Report any health conditions that may affect handling capacity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Take reasonable care for own and others&rsquo; safety</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <span>Cooperate with the employer on health and safety</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <p className="text-sm font-medium text-red-400">Important</p>
                </div>
                <p className="text-sm text-white/80">
                  Both employers and employees can face criminal prosecution for breaching health and
                  safety law. An employee who deliberately ignores safe manual handling procedures,
                  refuses to use mechanical aids that have been provided, or takes unnecessary risks
                  can be personally prosecuted under Section 7 of HASAWA 1974. The employer
                  remains responsible for providing the safe system of work, but the employee is
                  equally responsible for following it.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Enforcement &amp; Penalties</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-emerald-400 font-semibold text-xs mb-1">Improvement Notice</p>
                    <p className="text-white/70 text-xs">Requires the duty holder to remedy a contravention within a specified timeframe. Failure to comply is a criminal offence.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-emerald-400 font-semibold text-xs mb-1">Prohibition Notice</p>
                    <p className="text-white/70 text-xs">Immediately stops a work activity that poses a risk of serious personal injury. Takes effect immediately or on a specified date.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-red-400 font-semibold text-xs mb-1">Prosecution</p>
                    <p className="text-white/70 text-xs">Unlimited fines for organisations. Up to 2 years&rsquo; imprisonment and unlimited fines for individuals.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-red-400 font-semibold text-xs mb-1">Fee for Intervention (FFI)</p>
                    <p className="text-white/70 text-xs">HSE charges &pound;163/hour for all time spent investigating a material breach of health and safety law.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 05: Practical Application — What This Means for Electricians */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">05</span>
            Practical Application for Electricians
          </h2>
          <div className="border-l-2 border-emerald-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Understanding the legal framework is essential, but it must be translated into
                practical, everyday action on site. For electricians, this means applying the
                hierarchy of duties to every manual handling task encountered during a working day.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Applying the Hierarchy on Site</p>
                <div className="space-y-3 text-sm text-white/80">
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                    <p className="text-emerald-400 text-xs font-bold mb-1">1. AVOID</p>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Have cable drums delivered to the point of use, not the car park</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Use a cable winch or pulling machine instead of manual pulling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span>Specify pre-wired modular assemblies to reduce on-site handling</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-blue-400 text-xs font-bold mb-1">2. ASSESS</p>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Check the weight and characteristics of loads before handling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Survey the route &mdash; check for obstacles, slopes, stairs, narrow passages</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>Consider whether a team lift or mechanical aid is needed</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                    <p className="text-amber-400 text-xs font-bold mb-1">3. REDUCE</p>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Break loads into smaller, lighter components where possible</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Use trolleys, sack trucks, and cable rollers to reduce carrying</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                        <span>Arrange team lifts with clear communication and a designated leader</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                    <p className="text-purple-400 text-xs font-bold mb-1">4. INFORM</p>
                    <ul className="space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Label heavy items with their weight and heaviest side</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Brief the team on the lift plan before starting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                        <span>Share risk assessment findings with all affected workers</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">Remember:</strong> The hierarchy is not optional
                  &mdash; it is a legal requirement. You must first consider whether the manual handling
                  task can be avoided entirely before assessing how to do it more safely. Many
                  electricians habitually carry loads that could easily be moved with a trolley, or
                  manually pull cables that could be drawn with a cable winch. Challenging
                  &ldquo;the way it&rsquo;s always been done&rdquo; is an important part of compliance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Summary */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-500/80 text-sm font-normal">06</span>
            Section Summary
          </h2>
          <div className="border-l-2 border-green-500/50 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                This section has provided a comprehensive overview of the legal framework governing
                manual handling in UK workplaces. The key points to remember are:
              </p>

              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">MHOR 1992:</strong> The principal regulations &mdash; Regs 2&ndash;5 establish definitions, employer duties (avoid, assess, reduce, inform), and employee duties</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">HASAWA 1974:</strong> Sections 2 and 7 establish the overarching duties on employers and employees respectively</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Management Regs 1999:</strong> Require suitable and sufficient risk assessment and the application of preventive principles</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Hierarchy:</strong> Avoid &rarr; Assess &rarr; Reduce &rarr; Inform must be followed in order</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Employer duties:</strong> Avoid hazardous MH, assess, reduce risk, provide mechanical aids, train workers, provide load information</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Employee duties:</strong> Use equipment provided, follow training, report problems, cooperate with employer</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-white">Enforcement:</strong> Unlimited fines, imprisonment, improvement and prohibition notices</span>
                </li>
              </ul>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-500">Next:</strong> In Section 3, we will examine
                  the manual handling risk assessment process in detail &mdash; the TILE framework,
                  the five-step process, and the HSE Manual Handling Assessment Charts (MAC) tool.
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
          title="Section 2 Knowledge Check"
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
            <Link to="../manual-handling-module-1-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: What Is Manual Handling?
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../manual-handling-module-1-section-3">
              Next: Risk Assessment
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
