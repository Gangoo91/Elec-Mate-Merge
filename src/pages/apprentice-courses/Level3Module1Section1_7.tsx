import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, Clock, Users, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Level3Module1Section1_7 = () => {
  useSEO(
    "Employer vs Employee Responsibilities Under Health & Safety Law - Level 3 Module 1 Section 1.7",
    "Understanding the legal duties of employers and employees under HASAWA 1974 - who is responsible for what in workplace safety"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "Under HASAWA Section 2, which of the following is an employer's duty?",
      options: [
        "Pay for employees' personal clothing",
        "Provide safe plant and systems of work",
        "Provide company vehicles for all staff",
        "Pay for employee gym memberships"
      ],
      correctAnswer: 1,
      explanation: "HASAWA Section 2 requires employers to provide and maintain plant and systems of work that are, so far as is reasonably practicable, safe and without risks to health."
    },
    {
      id: 2,
      question: "At what employee threshold must an employer have a WRITTEN health and safety policy?",
      options: [
        "1 or more employees",
        "5 or more employees",
        "10 or more employees",
        "25 or more employees"
      ],
      correctAnswer: 1,
      explanation: "Under HASAWA, employers with 5 or more employees must have a written health and safety policy that is communicated to all staff. Smaller employers must still have a policy, just not necessarily written."
    },
    {
      id: 3,
      question: "Under HASAWA Section 7, what is an employee's duty?",
      options: [
        "Write risk assessments for their tasks",
        "Take reasonable care for themselves and others",
        "Provide their own safety equipment",
        "Hire safety consultants"
      ],
      correctAnswer: 1,
      explanation: "Section 7 places a duty on employees to take reasonable care for their own health and safety and that of others who may be affected by their acts or omissions at work."
    },
    {
      id: 4,
      question: "What does HASAWA Section 8 prohibit employees from doing?",
      options: [
        "Working overtime",
        "Taking rest breaks",
        "Interfering with or misusing safety equipment",
        "Asking questions about safety"
      ],
      correctAnswer: 2,
      explanation: "Section 8 makes it an offence for any person to intentionally or recklessly interfere with or misuse anything provided in the interests of health, safety, or welfare - such as fire extinguishers, guards, or PPE."
    },
    {
      id: 5,
      question: "What is the maximum fine an employer can face for serious HASAWA breaches in Crown Court?",
      options: [
        "£5,000",
        "£20,000",
        "£50,000",
        "Unlimited"
      ],
      correctAnswer: 3,
      explanation: "For serious breaches tried in Crown Court, there is no limit on fines. Recent cases have seen fines of several million pounds. In cases of gross negligence, individuals can also face imprisonment."
    },
    {
      id: 6,
      question: "Which of the following is an employee's duty under health and safety law?",
      options: [
        "Conduct fire risk assessments",
        "Report hazards and defects to their employer",
        "Purchase their own PPE",
        "Write the company safety policy"
      ],
      correctAnswer: 1,
      explanation: "Employees have an implied duty to report hazards and defects they identify. Employers are responsible for risk assessments, providing PPE, and writing safety policies."
    },
    {
      id: 7,
      question: "What type of notice can the HSE issue to immediately stop dangerous work?",
      options: [
        "Improvement Notice",
        "Prohibition Notice",
        "Warning Notice",
        "Advisory Notice"
      ],
      correctAnswer: 1,
      explanation: "A Prohibition Notice is issued when there is risk of serious personal injury and requires dangerous activities to stop immediately until the risk is eliminated. An Improvement Notice allows time to fix issues."
    },
    {
      id: 8,
      question: "An employee who deliberately fails to use provided PPE can face:",
      options: [
        "No consequences - it's their choice",
        "Verbal warning only",
        "Disciplinary action and potential personal prosecution",
        "A reduction in pay"
      ],
      correctAnswer: 2,
      explanation: "Employees who fail to use provided PPE can face disciplinary action from their employer and, in serious cases, personal prosecution under HASAWA Sections 7 and 8."
    },
    {
      id: 9,
      question: "What must employers do regarding consultation with employees on safety matters?",
      options: [
        "Nothing - it's optional",
        "Only consult with managers",
        "Consult with employees or their safety representatives",
        "Only consult after accidents occur"
      ],
      correctAnswer: 2,
      explanation: "Employers have a legal duty to consult with employees or their safety representatives on matters affecting their health and safety - this includes changes to work processes and safety training."
    },
    {
      id: 10,
      question: "Can employees be personally prosecuted for health and safety breaches?",
      options: [
        "No, only employers can be prosecuted",
        "Yes, under HASAWA Sections 7 and 8",
        "Only if they are managers",
        "Only after multiple written warnings"
      ],
      correctAnswer: 1,
      explanation: "Employees can be personally prosecuted under HASAWA for breaching their duties under Sections 7 and 8, with potential fines and even imprisonment for serious offences."
    },
    {
      id: 11,
      question: "What happens if an employer fails to conduct risk assessments and an accident occurs?",
      options: [
        "Nothing if the injury was minor",
        "HSE prosecution, unlimited fines, and potential imprisonment",
        "Just an informal warning",
        "A small fixed penalty"
      ],
      correctAnswer: 1,
      explanation: "Failure to conduct risk assessments is a serious breach. If an accident occurs, employers can face HSE prosecution with unlimited fines and, where gross negligence is proven, imprisonment of responsible individuals."
    },
    {
      id: 12,
      question: "Under HASAWA, who has the PRIMARY duty for workplace safety?",
      options: [
        "Employees",
        "Employers",
        "The HSE",
        "Insurance companies"
      ],
      correctAnswer: 1,
      explanation: "While employees have important duties, employers carry the PRIMARY responsibility for workplace safety under Section 2 of HASAWA - they must ensure, so far as reasonably practicable, the health, safety and welfare of all employees."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* STICKY HEADER */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link
            to="/study-centre/apprentice/level3-module1-section1"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white active:text-elec-yellow text-sm sm:text-base min-h-[44px] touch-manipulation transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Back to Section 1</span>
          </Link>
          <span className="inline-flex items-center justify-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-elec-yellow/10 text-elec-yellow text-xs sm:text-sm font-medium">
            1.7
          </span>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto space-y-8 sm:space-y-12">

          {/* HEADER */}
          <header className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-elec-yellow/10 text-elec-yellow text-sm font-medium">
              <Users className="w-4 h-4" />
              Section 1.7
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
              Employer vs Employee Responsibilities
            </h1>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">
              Understanding the legal duties of employers and employees under HASAWA 1974
            </p>
          </header>

          {/* QUICK SUMMARY BOX */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-elec-yellow" />
                <h3 className="font-semibold text-white">In 30 Seconds</h3>
              </div>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">*</span>
                  Employers: safe systems, training, PPE, risk assessments
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">*</span>
                  Employees: take care, cooperate, report hazards, use PPE
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">*</span>
                  Both parties share responsibility for workplace safety
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">*</span>
                  Both can face prosecution for serious breaches
                </li>
              </ul>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
              <div className="flex items-center gap-2 mb-3">
                <Scale className="w-5 h-5 text-elec-yellow" />
                <h3 className="font-semibold text-white">Spot it / Use it</h3>
              </div>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">*</span>
                  <strong className="text-white">Spot:</strong> Missing PPE, untrained workers, ignored hazards
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">*</span>
                  <strong className="text-white">Use:</strong> Safety policies, training records, risk assessments
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">*</span>
                  <strong className="text-white">Check:</strong> Who is responsible? Are duties being met?
                </li>
              </ul>
            </div>
          </div>

          {/* LEARNING OUTCOMES */}
          <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-elec-yellow" />
              Learning Outcomes
            </h2>
            <p className="text-white/70 mb-4 text-sm sm:text-base">By the end of this section, you will be able to:</p>
            <ul className="space-y-3">
              {[
                "Identify the key employer duties under HASAWA Section 2",
                "Explain employee responsibilities under HASAWA Sections 7 and 8",
                "Understand how employer and employee duties work together",
                "Recognise the consequences of breaching H&S law for both parties",
                "Describe the types of enforcement action the HSE can take",
                "Apply shared responsibility principles in practical situations"
              ].map((outcome, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm sm:text-base">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SECTION 01: Employer Duties */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-lg">
                01
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Employer Duties (HASAWA Section 2)</h2>
            </div>
            <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Section 2 of HASAWA places a <strong className="text-white">general duty</strong> on employers to ensure, so far as is reasonably practicable, the health, safety, and welfare at work of all their employees. This is the cornerstone of workplace safety law.
              </p>

              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">Key Phrase: "So far as is reasonably practicable"</h4>
                <p className="text-white/80 text-sm">
                  This doesn't mean "do everything possible regardless of cost". It means employers must weigh the risk against the cost, time, and effort of measures to eliminate it. Where risks are high, almost any cost is justified. Where risks are low, proportionate measures are expected.
                </p>
              </div>

              <div className="space-y-4 mt-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Safe plant and systems of work</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Provide and maintain machinery, equipment, tools, and working procedures that are safe. For electricians, this includes test instruments, power tools, safe isolation procedures, and permit-to-work systems.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Safe handling, storage, and transport of substances</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Ensure safety when using, handling, storing, and transporting articles and substances. This covers everything from chemicals and solvents to heavy equipment and materials.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Information, instruction, training, and supervision</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Provide whatever information, instruction, training, and supervision is necessary. This includes induction training, ongoing safety training, and competent supervision - especially important for apprentices and less experienced workers.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Safe workplace with adequate access and egress</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Maintain the workplace in safe condition, including the means of getting in and out. Fire exits, walkways, working areas, and access routes must be kept clear and safe.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Adequate welfare facilities</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Provide a safe working environment with adequate welfare facilities - toilets, washing facilities, drinking water, rest areas, and first aid provisions.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <h4 className="font-semibold text-amber-400 mb-2">Risk Assessments</h4>
                  <p className="text-white/80 text-sm">
                    Under the Management of H&S at Work Regulations 1999, employers must conduct suitable and sufficient risk assessments and implement appropriate controls.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <h4 className="font-semibold text-blue-400 mb-2">Written Safety Policy</h4>
                  <p className="text-white/80 text-sm">
                    Employers with 5 or more employees must have a written H&S policy that is communicated to all staff and reviewed regularly.
                  </p>
                </div>
              </div>
            </div>

            <InlineCheck
              id="employer-duties-check"
              question="Which of the following is a key employer duty under HASAWA Section 2?"
              options={[
                "Provide personal transport for employees",
                "Ensure safe plant and systems of work",
                "Pay for employee meals",
                "Provide entertainment facilities"
              ]}
              correctIndex={1}
              explanation="HASAWA Section 2 requires employers to provide and maintain plant and systems of work that are, so far as is reasonably practicable, safe and without risks to health."
            />
          </section>

          {/* SECTION 02: Employee Duties */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-lg">
                02
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Employee Duties (HASAWA Sections 7 & 8)</h2>
            </div>
            <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                While employers carry the primary responsibility, HASAWA also places <strong className="text-white">important duties on employees</strong>. These recognise that employees have a vital role in maintaining safe workplaces - safety isn't something that's done TO you, it's something you actively participate in.
              </p>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <h4 className="font-semibold text-green-400 mb-2">Section 7 - Duty to Take Reasonable Care</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  Every employee while at work has a duty to take <strong className="text-white">reasonable care</strong> for the health and safety of themselves AND of other persons who may be affected by their acts or omissions at work. Your actions on site affect everyone around you.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <h4 className="font-semibold text-blue-400 mb-2">Section 7 - Duty to Cooperate</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  Employees must <strong className="text-white">cooperate with their employer</strong> so far as is necessary to enable the employer to comply with their legal duties. This means following safety rules, attending training, and participating in safety procedures.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-400 mb-1">Section 8 - Not to Interfere</h4>
                    <p className="text-white/80 text-sm">
                      No person shall <strong className="text-white">intentionally or recklessly interfere with or misuse</strong> anything provided in the interests of health, safety, or welfare. This includes fire extinguishers, safety guards, warning signs, PPE, and emergency equipment. Tampering with safety equipment is a criminal offence.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                <h4 className="font-semibold text-white">Additional Employee Duties:</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">*</span>
                    <strong className="text-white">Report hazards and defects:</strong> Promptly report dangers, defective equipment, and unsafe conditions to your employer or supervisor
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">*</span>
                    <strong className="text-white">Use equipment as trained:</strong> Only use equipment in accordance with the training and instructions provided
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">*</span>
                    <strong className="text-white">Wear provided PPE:</strong> Use personal protective equipment correctly and report any damage or defects
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow">*</span>
                    <strong className="text-white">Follow safe working procedures:</strong> Adhere to established safety procedures, method statements, and permits
                  </li>
                </ul>
              </div>
            </div>

            <InlineCheck
              id="employee-duties-check"
              question="Under HASAWA Section 8, what is specifically prohibited?"
              options={[
                "Working overtime without authorisation",
                "Taking lunch breaks during working hours",
                "Interfering with or misusing safety equipment",
                "Reporting hazards to supervisors"
              ]}
              correctIndex={2}
              explanation="Section 8 makes it an offence to intentionally or recklessly interfere with or misuse anything provided in the interests of health, safety, or welfare - such as disabling guards, tampering with fire equipment, or misusing PPE."
            />
          </section>

          {/* SECTION 03: Shared Responsibility */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-lg">
                03
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Shared Responsibility and Cooperation</h2>
            </div>
            <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Workplace safety is most effective when employers and employees <strong className="text-white">work together</strong>. The law creates interlocking duties that require cooperation from both parties - neither can achieve safety alone.
              </p>

              <div className="p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-2">The Safety Partnership</h4>
                <p className="text-white/80 text-sm">
                  Think of it like this: Employers provide the framework - policies, training, equipment, and resources. Employees bring it to life - following procedures, reporting problems, and maintaining awareness. A positive safety culture requires commitment from everyone.
                </p>
              </div>

              <div className="space-y-4 mt-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Communication</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Employers must consult with employees on safety matters. Employees must communicate hazards and concerns upward. Two-way communication ensures problems are identified and resolved quickly - before accidents happen.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Risk Assessment Participation</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    While employers are responsible for conducting risk assessments, employees often have the best practical knowledge of hazards in their work. Their input is valuable and should be actively sought.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Training Effectiveness</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Employers must provide adequate training, but employees must engage with it, apply what they learn, and ask questions when unclear. Training only works when both parties commit to it.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-semibold text-white mb-2">PPE Usage</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Employers must provide suitable PPE free of charge, maintain it, and train employees in its use. Employees must wear it correctly, store it properly, and report any damage or defects. Both have duties.
                  </p>
                </div>
              </div>
            </div>

            <InlineCheck
              id="cooperation-check"
              question="Why is cooperation between employers and employees essential for workplace safety?"
              options={[
                "It reduces paperwork requirements",
                "The law creates interlocking duties requiring both parties to fulfil their responsibilities",
                "It makes HSE inspections easier to pass",
                "It reduces training costs"
              ]}
              correctIndex={1}
              explanation="The law creates interlocking duties for employers and employees. Effective safety requires both parties to fulfil their responsibilities and work together - employers provide the framework, employees make it work."
            />
          </section>

          {/* SECTION 04: Consequences of Breach */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-lg">
                04
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Consequences of Breach - For Both Parties</h2>
            </div>
            <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10 space-y-4">
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Both employers and employees can face <strong className="text-white">serious consequences</strong> for breaching health and safety law. The severity of penalties reflects the importance society places on workplace safety.
              </p>

              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <h4 className="font-semibold text-red-400 mb-3">Consequences for Employers</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">*</span>
                    <strong className="text-white">HSE Prosecution:</strong> The HSE can prosecute employers (and individual directors/managers) for breaches
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">*</span>
                    <strong className="text-white">Unlimited Fines:</strong> For serious offences in Crown Court, fines are unlimited - recent cases have reached millions of pounds
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">*</span>
                    <strong className="text-white">Imprisonment:</strong> For gross negligence causing death, individuals can face corporate manslaughter charges and prison sentences
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">*</span>
                    <strong className="text-white">Prohibition Notices:</strong> HSE can immediately stop dangerous work until risks are eliminated
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">*</span>
                    <strong className="text-white">Improvement Notices:</strong> Require specific safety improvements within a set timeframe
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <h4 className="font-semibold text-amber-400 mb-3">Consequences for Employees</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">*</span>
                    <strong className="text-white">Disciplinary Action:</strong> Warnings, final warnings, or dismissal for safety breaches
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">*</span>
                    <strong className="text-white">Personal Prosecution:</strong> Employees can be prosecuted under HASAWA Sections 7 and 8
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">*</span>
                    <strong className="text-white">Fines:</strong> Personal fines for breaching safety duties can be substantial
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">*</span>
                    <strong className="text-white">Imprisonment:</strong> For serious offences, employees can face prison sentences
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">*</span>
                    <strong className="text-white">Summary Dismissal:</strong> Gross misconduct related to safety can result in immediate dismissal
                  </li>
                </ul>
              </div>
            </div>

            <InlineCheck
              id="consequences-check"
              question="Can employees be personally prosecuted for breaching health and safety law?"
              options={[
                "No, only employers can be prosecuted",
                "Yes, under HASAWA Sections 7 and 8",
                "Only if they are managers or supervisors",
                "Only after receiving a written warning first"
              ]}
              correctIndex={1}
              explanation="Employees can be personally prosecuted under HASAWA for breaching their duties under Sections 7 and 8. This can result in personal fines and, for serious offences, imprisonment."
            />
          </section>

          {/* REAL-WORLD EXAMPLE */}
          <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-red-500/10 border border-amber-500/20">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="font-semibold text-white">Real-World Case: Shared Responsibility Failure</h3>
            </div>
            <div className="space-y-3 text-sm text-white/80">
              <p>
                <strong className="text-white">The Situation:</strong> An electrical contractor was working on a commercial installation. The employer had provided arc flash PPE but had not enforced its use or provided proper training on when it was required. The employee, an experienced electrician, knew PPE was available but chose not to wear it for a "quick" fault-finding task on live equipment.
              </p>
              <p>
                <strong className="text-white">The Incident:</strong> An arc flash occurred during fault-finding, causing serious burns to the electrician's hands and face. The investigation revealed multiple failures by BOTH parties.
              </p>
              <p>
                <strong className="text-white">The Consequences:</strong> The employer was prosecuted for failing to provide adequate training and supervision, and for not enforcing PPE use - they received a fine of £180,000. The employee was ALSO prosecuted under Section 7 for failing to take reasonable care - he received a personal fine of £5,000. Both faced consequences.
              </p>
              <p>
                <strong className="text-white">The Lesson:</strong> Safety responsibilities are shared. The employer should have ensured training was adequate and PPE use was enforced. The employee should have worn available PPE and not taken shortcuts with live working. When either party fails, the consequences affect everyone.
              </p>
            </div>
          </div>

          {/* PRACTICAL GUIDANCE */}
          <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Practical Guidance</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-3">For Employers - Key Actions</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Conduct and regularly review risk assessments
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Provide comprehensive safety training
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Supply appropriate PPE and maintain it
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Establish clear hazard reporting procedures
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Consult with employees on safety matters
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Maintain written safety policy (5+ staff)
                  </li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-semibold text-elec-yellow mb-3">For Employees - Key Actions</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Follow all safety procedures and instructions
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Wear provided PPE correctly at all times
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Report hazards and near-misses promptly
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Attend and engage with safety training
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Never interfere with safety equipment
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    Cooperate with your employer on safety
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <details className="group">
                <summary className="cursor-pointer font-medium text-white hover:text-elec-yellow active:text-elec-yellow transition-all touch-manipulation flex items-center justify-between">
                  <span>Can I refuse to work if I believe it's unsafe?</span>
                  <span className="text-elec-yellow group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="mt-2 text-white/70 text-sm pl-4 border-l-2 border-elec-yellow/30">
                  Yes, you have the right to refuse work you reasonably believe poses serious and imminent danger. Report your concerns to your employer immediately. The Employment Rights Act 1996 protects employees from dismissal or detriment for raising genuine safety concerns.
                </p>
              </details>
              <details className="group">
                <summary className="cursor-pointer font-medium text-white hover:text-elec-yellow active:text-elec-yellow transition-all touch-manipulation flex items-center justify-between">
                  <span>Who is responsible if I'm injured due to a faulty tool?</span>
                  <span className="text-elec-yellow group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="mt-2 text-white/70 text-sm pl-4 border-l-2 border-elec-yellow/30">
                  The employer has a duty to provide safe equipment. However, if you noticed the fault and continued using the tool without reporting it, you may share some responsibility. Always report defective equipment immediately and do not use it.
                </p>
              </details>
              <details className="group">
                <summary className="cursor-pointer font-medium text-white hover:text-elec-yellow active:text-elec-yellow transition-all touch-manipulation flex items-center justify-between">
                  <span>What if my employer doesn't provide adequate PPE?</span>
                  <span className="text-elec-yellow group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="mt-2 text-white/70 text-sm pl-4 border-l-2 border-elec-yellow/30">
                  Employers must provide suitable PPE free of charge. If they don't, raise it with them in writing, contact your safety representative, or report to the HSE. You should not work in situations requiring PPE if it hasn't been provided.
                </p>
              </details>
              <details className="group">
                <summary className="cursor-pointer font-medium text-white hover:text-elec-yellow active:text-elec-yellow transition-all touch-manipulation flex items-center justify-between">
                  <span>Can I be sacked for raising safety concerns?</span>
                  <span className="text-elec-yellow group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="mt-2 text-white/70 text-sm pl-4 border-l-2 border-elec-yellow/30">
                  Dismissing an employee for raising genuine health and safety concerns is automatically unfair dismissal. Whistleblowing legislation provides additional protection. However, concerns must be genuine and raised appropriately - not as an excuse to avoid work.
                </p>
              </details>
              <details className="group">
                <summary className="cursor-pointer font-medium text-white hover:text-elec-yellow active:text-elec-yellow transition-all touch-manipulation flex items-center justify-between">
                  <span>What's the difference between an Improvement Notice and Prohibition Notice?</span>
                  <span className="text-elec-yellow group-open:rotate-180 transition-transform">+</span>
                </summary>
                <p className="mt-2 text-white/70 text-sm pl-4 border-l-2 border-elec-yellow/30">
                  An Improvement Notice gives time to fix a problem - typically 21 days. A Prohibition Notice stops dangerous work immediately until the risk is eliminated. Prohibition Notices are used when there is risk of serious personal injury.
                </p>
              </details>
            </div>
          </div>

          {/* QUICK REFERENCE / POCKET GUIDE */}
          <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/20">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Pocket Guide - Employer & Employee Duties</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold text-elec-yellow">Employer Must:</h4>
                <ul className="space-y-1 text-white/80">
                  <li>* Provide safe plant and systems</li>
                  <li>* Ensure safe substance handling</li>
                  <li>* Give information, training, supervision</li>
                  <li>* Maintain safe workplace</li>
                  <li>* Conduct risk assessments</li>
                  <li>* Written policy (5+ staff)</li>
                  <li>* Consult with employees</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-elec-yellow">Employee Must:</h4>
                <ul className="space-y-1 text-white/80">
                  <li>* Take reasonable care (S.7)</li>
                  <li>* Cooperate with employer (S.7)</li>
                  <li>* Not interfere with safety kit (S.8)</li>
                  <li>* Report hazards and defects</li>
                  <li>* Use equipment as trained</li>
                  <li>* Wear provided PPE</li>
                  <li>* Follow safety procedures</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-[#1a1a1a] border border-white/10">
              <p className="text-white/80 text-sm text-center">
                <strong className="text-elec-yellow">Remember:</strong> Workplace safety is a partnership - employers provide the framework, employees make it work. Both can face prosecution for failures!
              </p>
            </div>
          </div>

          {/* QUIZ */}
          <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-white/10">
            <Quiz questions={quizQuestions} />
          </div>

          {/* NAVIGATION */}
          <nav className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
            <Link
              to="/study-centre/apprentice/level3-module1-section1"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-[0.98] min-h-[48px] touch-manipulation transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Section 1
            </Link>
            <Link
              to="/study-centre/apprentice/level3-module1-section2"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-elec-yellow text-[#1a1a1a] font-medium hover:bg-elec-yellow/90 active:scale-[0.98] min-h-[48px] touch-manipulation transition-all"
            >
              Next: Section 2
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>

        </div>
      </article>
    </div>
  );
};

export default Level3Module1Section1_7;
